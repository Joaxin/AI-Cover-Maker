// src/utils/htmlExporter.ts
// 单文件自包含 HTML 导出：克隆画布 DOM + 内联同源样式表，CSS 动画原样保留（零第三方依赖）

const EDITOR_DECORATIONS = ['.sel-outline', '.resize-handle', '.rot-handle', '.lock-badge', '.guide-line']
const EDITOR_CLASSES = ['cursor-move', 'locked-el']

function collectSameOriginCss(): { css: string; skipped: number } {
  const chunks: string[] = []
  let skipped = 0
  for (const sheet of Array.from(document.styleSheets)) {
    try {
      const rules = (sheet as CSSStyleSheet).cssRules
      if (rules) for (const rule of Array.from(rules)) chunks.push(rule.cssText)
    } catch {
      /* 跨域样式表无法读取规则，计入 skipped 由调用方出声 */
      skipped++
    }
  }
  // CSS 内容里出现 </style 会提前截断导出文件，浏览器宽容写法（大写/转义引号）也要盖到
  const css = chunks.join('\n').replace(/<\/style/gi, '<\\/style')
  return { css, skipped }
}

function buildStageClone(node: HTMLElement, width: number, height: number): HTMLElement {
  const clone = node.cloneNode(true) as HTMLElement
  for (const sel of EDITOR_DECORATIONS) {
    clone.querySelectorAll(sel).forEach((n) => n.remove())
  }
  clone.querySelectorAll(EDITOR_CLASSES.map((c) => `.${c}`).join(',')).forEach((n) => {
    EDITOR_CLASSES.forEach((c) => n.classList.remove(c))
  })
  clone.style.position = 'absolute'
  clone.style.inset = '0'
  clone.style.width = `${width}px`
  clone.style.height = `${height}px`
  clone.style.overflow = 'hidden'
  return clone
}

async function toDataUrl(src: string): Promise<string> {
  const blob = await (await fetch(src)).blob()
  return await new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(blob)
  })
}

// blob: 随页面失效、同源路径换目录打开即失效 —— 不内联导出文件就会缺图
function isLocalResource(url: string) {
  if (url.startsWith('blob:')) return true
  if (url.startsWith('data:')) return false
  return url.startsWith('/') || url.startsWith(location.origin)
}

async function inlineLocalImages(root: HTMLElement): Promise<number> {
  const tasks: Array<Promise<void>> = []
  let failed = 0
  const fail = () => { failed++ }
  for (const img of Array.from(root.querySelectorAll('img'))) {
    const src = img.getAttribute('src') || ''
    if (!isLocalResource(src)) continue
    tasks.push(toDataUrl(src).then((d) => img.setAttribute('src', d))
      .catch((err) => { fail(); console.warn('图片内联失败，导出文件可能缺图:', src, err) }))
  }
  for (const el of Array.from(root.querySelectorAll<HTMLElement>('[style]'))) {
    const bg = el.style.backgroundImage
    const match = bg ? /url\((.*?)\)/.exec(bg) : null
    const url = match ? match[1].replace(/^["']|["']$/g, '') : ''
    if (!url || !isLocalResource(url)) continue
    tasks.push(toDataUrl(url).then((d) => { el.style.backgroundImage = bg.replace(url, d) })
      .catch((err) => { fail(); console.warn('背景图内联失败，导出文件可能缺图:', url, err) }))
  }
  await Promise.all(tasks)
  return failed
}

export interface HtmlExportStats { skippedStylesheets: number; failedImages: number }

function buildHtmlDoc(clone: HTMLElement, width: number, height: number, title: string, failedImages: number): { doc: string; stats: HtmlExportStats } {
  const { css, skipped } = collectSameOriginCss()
  const safeTitle = title.replace(/[<>&]/g, '')
  const doc = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${safeTitle}</title>
<style>${css}</style>
<style>
html,body{margin:0;min-height:100%;background:#0b0c0e}
body{display:flex;align-items:center;justify-content:center;min-height:100vh;overflow:auto}
#stage{position:relative;flex:0 0 auto;width:${width}px;height:${height}px;transform-origin:center center;box-shadow:0 24px 80px rgba(0,0,0,.55)}
</style>
</head>
<body>
<div id="stage">${clone.outerHTML}</div>
<script>
(function(){
  var W=${width},H=${height},stage=document.getElementById('stage');
  function fit(){
    var s=Math.min((window.innerWidth-48)/W,(window.innerHeight-48)/H);
    stage.style.transform='scale('+s+')';
  }
  window.addEventListener('resize',fit);fit();
})();
</script>
</body>
</html>`
  return { doc, stats: { skippedStylesheets: skipped, failedImages } }
}

export interface HtmlExportOptions {
  width: number
  height: number
  title?: string
}

export async function exportHtml(node: HTMLElement, filename: string, options: HtmlExportOptions): Promise<HtmlExportStats | null> {
  try {
    const clone = buildStageClone(node, options.width, options.height)
    const failedImages = await inlineLocalImages(clone)
    const { doc, stats } = buildHtmlDoc(clone, options.width, options.height, options.title || filename, failedImages)
    const blob = new Blob([doc], { type: 'text/html;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.download = filename.replace(/\.[^.]+$/, '') + `-${options.width}x${options.height}.html`
    link.href = url
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    setTimeout(() => URL.revokeObjectURL(url), 2000)
    return stats
  } catch (err) {
    console.error('HTML 导出失败:', err)
    alert('HTML 导出失败，请查看控制台')
    return null
  }
}

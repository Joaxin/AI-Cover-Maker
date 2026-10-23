// src/utils/exporter.ts
import { domToPng, domToJpeg } from 'modern-screenshot'

export interface ExportOptions {
  format: 'png' | 'jpeg'
  quality: number
  width: number
  height: number
  /** 高清倍率：输出像素 = 设计尺寸 × scale */
  scale?: number
  backgroundColor?: string
}

// 覆盖 modern-screenshot 内置的透明 1x1 默认占位：取不到的图必须显眼，不能伪装成设计的一部分
const MISSING_IMAGE_PLACEHOLDER = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23e2e8f0"/><g stroke="%23dc2626" stroke-width="16" opacity="0.22"><path d="M-20 320 L320 -20 M60 320 L400 -20 M140 320 L400 60 M-20 240 L240 -20" /></g><text x="200" y="158" font-family="Helvetica, Arial, sans-serif" font-size="22" font-weight="700" fill="%2364748b" text-anchor="middle">IMAGE MISSING</text></svg>'

export async function exportCover(node: HTMLElement, filename: string, options: ExportOptions) {
  const scale = options.scale && options.scale > 0 ? options.scale : 1
  try {
    // 等待字体（含粗体字重）加载完成，确保导出与画布一致
    try { if ((document as any).fonts?.ready) await (document as any).fonts.ready } catch { /* ignore */ }

    const config = {
      width: options.width,   // 设计真实尺寸，与 Canvas Zoom 无关
      height: options.height,
      scale,                  // 高清倍率：输出 = width*scale × height*scale
      backgroundColor: options.backgroundColor || '#ffffff',
      quality: options.quality,
      // debug 下库会 warn 出取不到的具体 URL
      debug: import.meta.env.DEV,
      fetch: { placeholderImage: MISSING_IMAGE_PLACEHOLDER }
    }
    const dataUrl = options.format === 'jpeg'
      ? await domToJpeg(node, config)
      : await domToPng(node, config)

    const link = document.createElement('a')
    const ext = options.format === 'jpeg' ? 'jpg' : 'png'
    link.download = filename.replace(/\.[^.]+$/, '') + `-${options.width * scale}x${options.height * scale}.${ext}`
    link.href = dataUrl
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    // 顺带返回 dataUrl：调用方可拿它缩一张 toast 拇指图（makeThumb），不影响下载本身
    return dataUrl
  } catch (err) {
    // 不弹浏览器 alert（阻塞式、黑话「查看控制台」）：抛给调用方，由界面用人话提示；批量导出靠它统计失败行
    console.error('导出失败:', err)
    throw err
  }
}
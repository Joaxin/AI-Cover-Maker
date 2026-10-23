// src/composables/useClonePrompt.ts
// 「AI 复刻同款」提示词卡：chips/意图 → 复制提示词（大图 src 折成占位符）→ 导入时回灌原图。
// 依赖注入 displayTemplate：提示词始终描述"画布当前呈现"的那份已解析模板。
import { ref, type Ref } from 'vue'
import type { ResolvedTemplate, Template } from '@/types/types'
import { CONTRACT_HEADER } from '../utils/importContract'
import { flashToast } from '../utils/flashToast'
import { imgPlaceholder } from '../utils/imgPlaceholder'

export interface ClonePromptApi {
  cloneIntent: Ref<string>
  cloneCopied: Ref<boolean>
  cloneSrcFolded: Ref<number>
  cloneWarn: Ref<string>
  copyClonePrompt: () => Promise<void>
  restoreFoldedSrc: (data: any) => string[]
}

const CLONE_INTENT_DEFAULT = '只换文案与主题，版式/字号/坐标/配色一律不动'

export const CLONE_PRESETS: { chip: string; text: string }[] = [
  { chip: '🎨 美化版式', text: '美化当前页面：元素 id、数量与所有文案一律不动；只优化视觉层级——拉大主标题与次要文字的字号对比、统一留白与对齐、加强色彩对比与呼应。优先通过改 tokens 颜色值和 presets 配色实现，其次才微调坐标/字号。' },
  { chip: '✒️ 重写文案', text: '版式、坐标、字号、配色全部保持不变；只把各 text 元素的文案重写得更犀利、更有趣味。每条长度不超过原文（防止撑破文本盒），元素 id 与数量不动。' },
  { chip: '🌈 换配色', text: '所有文案与版式不动；按本页主题把 tokens 颜色 default 与 presets 四套配色整体换成新的风格（如清晨清爽 / 深夜暗色 / 复古印刷 / 极简白），保持文字与底色的对比度可读。' },
]

export function useClonePrompt(deps: { displayTemplate: Ref<ResolvedTemplate | null> }): ClonePromptApi & { buildClonePrompt: () => string } {
  const cloneIntent = ref(CLONE_INTENT_DEFAULT)
  const cloneCopied = ref(false)
  const cloneSrcFolded = ref(0)
  const cloneWarn = ref('')

  function buildClonePrompt(): string {
    const t = deps.displayTemplate.value
    if (!t) return ''
    const tpl = JSON.parse(JSON.stringify(t))
    let folded = 0
    for (const e of tpl.elements ?? []) {
      if (typeof e?.src === 'string' && e.src.length > 300) { e.src = `{{IMG:${e.id}}}`; folded++ }
    }
    cloneSrcFolded.value = folded
    const intent = cloneIntent.value.trim() || CLONE_INTENT_DEFAULT
    return [
      '下面是我画布工具的一个 Design JSON 模板。请「复刻同款」：保持它的版式与结构，换内容后输出一个同类目的新模板 JSON。',
      '',
      `修改要求：${intent}`,
      '',
      '硬性约束（违反任意一条都会导致导入失败）：',
      `1. 第一行原样输出 ${CONTRACT_HEADER}，第二行起只输出一个 JSON 对象，不要 markdown 代码围栏、不要任何解释文字。`,
      '2. 顶层 id（仅限字母、数字、- _ .）和 name 换成新的。',
      '3. elements 数量与每个元素的 id 不得增删改；坐标、尺寸、字号、颜色等未被明确要求修改的字段一律原样保留。',
      folded ? '4. 形如 "{{IMG:元素id}}" 的 src 是占位符，请原样回抄，不要改写、展开或编造 data URI。' : '4. 图片 src 不得改写或截断。',
      '',
      '模板 JSON：',
      JSON.stringify(tpl, null, 2),
    ].join('\n')
  }

  async function copyClonePrompt() {
    const text = buildClonePrompt()
    if (!text) return
    try {
      await navigator.clipboard.writeText(text)
      cloneCopied.value = true
      setTimeout(() => cloneCopied.value = false, 2000)
    } catch (err) {
      console.error('复制失败', err)
      flashToast('⚠️ 复制失败：浏览器拒绝了剪贴板，请手动选中内容复制')
    }
  }

  /** 把 {{IMG:元素id}} 占位符按当前（导入前的）displayTemplate 回灌成原图，返回找不到的 id。
   *  找不到时不留原字符串：{{IMG:id}} 会被浏览器当相对 URL 加载 → 必然裂图，
   *  换成灰虚线占位图（导出体检能认出这种指纹并提醒补图），至少看得懂、可行动。 */
  function restoreFoldedSrc(data: any): string[] {
    const srcs = new Map((deps.displayTemplate.value?.elements || []).map(e => [e.id, (e as any).src] as const))
    const missing: string[] = []
    for (const e of Array.isArray(data?.elements) ? data.elements : []) {
      if (!e || typeof e.src !== 'string') continue
      const m = e.src.match(/^\{\{\s*IMG:\s*(.+?)\s*\}\}$/)
      if (!m) continue
      const orig = srcs.get(m[1])
      if (typeof orig === 'string' && orig) e.src = orig
      else {
        e.src = imgPlaceholder(Number(e.width), Number(e.height), Number(e.borderRadius), '原图缺失')
        missing.push(m[1])
      }
    }
    return missing
  }

  return { cloneIntent, cloneCopied, cloneSrcFolded, cloneWarn, buildClonePrompt, copyClonePrompt, restoreFoldedSrc }
}

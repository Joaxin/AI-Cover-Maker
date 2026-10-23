// src/utils/fontRegistry.ts
// 字体选择器的单一数据源：短标签 + 完整 stack + 归类。
// 模板 tokens.fonts.*.options 里作者自定义的串不在此表内，由 classifyFont 现场归类兜底。

export type FontCategoryId = 'template' | 'sans' | 'serif' | 'mono' | 'decor' | 'other'

export interface FontOption { label: string; stack: string }
export interface FontGroup { id: FontCategoryId; label: string; fonts: FontOption[] }

export const FONT_CATEGORIES: { id: FontCategoryId; label: string }[] = [
  { id: 'template', label: '模板推荐' },
  { id: 'sans', label: '无衬线 · 黑体' },
  { id: 'serif', label: '衬线 · 宋体' },
  { id: 'mono', label: '等宽 · 技术感' },
  { id: 'decor', label: '手写 · 装饰' },
  { id: 'other', label: '其他' }
]

export const FONT_REGISTRY: (FontOption & { category: FontCategoryId })[] = [
  { label: '系统默认', stack: 'system-ui', category: 'sans' },
  { label: 'Helvetica / Arial', stack: 'Helvetica, Arial, sans-serif', category: 'sans' },
  { label: 'Inter', stack: 'Inter, sans-serif', category: 'sans' },
  { label: '苹方', stack: "'PingFang SC'", category: 'sans' },
  { label: '微软雅黑', stack: "'Microsoft YaHei'", category: 'sans' },
  { label: '黑体', stack: 'SimHei', category: 'sans' },
  { label: 'Impact 重黑标题', stack: 'Impact, sans-serif', category: 'sans' },

  { label: 'Georgia', stack: 'Georgia', category: 'serif' },
  { label: 'Times New Roman', stack: "'Times New Roman'", category: 'serif' },
  { label: 'Didot 时尚衬线', stack: 'Didot, Bodoni MT, Georgia, serif', category: 'serif' },
  { label: '宋体', stack: 'Songti SC, SimSun, serif', category: 'serif' },

  { label: 'Courier 等宽', stack: 'Courier New, monospace', category: 'mono' },
  { label: '打字机（手绘随笔）', stack: 'Courier New, Georgia, monospace', category: 'mono' },

  { label: '楷体', stack: 'STKaiti', category: 'decor' },
  { label: 'Comic Sans', stack: 'Comic Sans MS, Impact, sans-serif', category: 'decor' },
  { label: 'Comic Sans（手写）', stack: 'Comic Sans MS, cursive', category: 'decor' }
]

const MONO = /courier|monospace|consolas|menlo|monaco|jetbrains|ibm plex mono|sf mono/i
const DECOR = /comic|kai|楷|cursive|handwrit|brush|marker|script(?![a-z])|li(?![a-z])|隶|seal/i
const SANS = /sans-serif|hei|黑|gothic|pingfang|yahei|苹方|helvetica|arial|inter|impact|verdana|segoe|roboto|system-ui/i
const SERIF_TOKENS = /song|宋|ming|明|didot|bodoni|georgia|times|garamond|playfair|serif|songti/i

export function classifyFont(stack: string): FontCategoryId {
  // "sans-serif" 里含子串 "serif"，必须先摘掉再判断衬线
  const bare = String(stack || '').replace(/sans-serif/gi, '')
  if (MONO.test(stack)) return 'mono'
  if (DECOR.test(stack)) return 'decor'
  if (SERIF_TOKENS.test(bare)) return 'serif'
  if (SANS.test(stack)) return 'sans'
  return 'other'
}

/** 取 stack 的首个族名做显示标签，并剥掉引号 */
function familyLabel(stack: string): string {
  const first = String(stack || '').split(',')[0]?.trim() || stack
  return first.replace(/^['"]|['"]$/g, '')
}

/**
 * 供字体下拉使用：模板声明的选项（preferred）置顶为「模板推荐」，其余按归类分组。
 * 当前值若不在任何列表中会被兜底插入，保证 select 不会显示为空白。
 * 下拉的 value 始终是完整 stack，只有 label 被简化。
 */
export function buildFontGroups(currentStack?: string | null, preferredStacks?: unknown): FontGroup[] {
  const entries = FONT_REGISTRY.map(f => ({ ...f }))
  const current = String(currentStack || '').trim()
  const preferred = Array.isArray(preferredStacks)
    ? preferredStacks.map(p => String(p).trim()).filter(Boolean)
    : []

  const templateFonts = preferred.map(stack => ({
    label: familyLabel(stack),
    stack,
    category: 'template' as FontCategoryId
  }))
  const templateSet = new Set(preferred)
  const rest = entries.filter(e => !templateSet.has(e.stack))

  if (current && !preferred.includes(current) && !rest.some(e => e.stack === current)) {
    rest.unshift({
      label: `${familyLabel(current)}（当前）`,
      stack: current,
      category: classifyFont(current)
    })
  }

  const all = [...templateFonts, ...rest]
  return FONT_CATEGORIES
    .map(c => ({ id: c.id, label: c.label, fonts: all.filter(e => e.category === c.id).map(({ label, stack }) => ({ label, stack })) }))
    .filter(g => g.fonts.length > 0)
}

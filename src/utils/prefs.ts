// 显示偏好的唯一持久层：一个 localStorage 键，读写都容错（禁用存储时仅本次会话生效）
import type { PalettePreset } from '@/types/types'
export type TileSize = 'sm' | 'md' | 'lg'
export type SidebarSize = 'sm' | 'md' | 'lg'
export type PrefFlag = 'expandAll' | 'groupAccordion' | 'guides' | 'rulers' | 'grid' | 'animPaused'
export type GridStyle = 'line' | 'dot'
/** 0 = 跟随标尺主刻度；其余为固定导出像素间距 */
export type GridStep = 0 | 10 | 20 | 50 | 100
type ExportFormat = 'png' | 'jpeg' | 'html'
export type ExportScale = 1 | 2 | 3
/** 记住的切比例算法：'' = 每次都弹框询问 */
export type RatioAlgoPref = '' | 'expand' | 'crop' | 'scale'
const RATIO_ALGO_VALUES: RatioAlgoPref[] = ['', 'expand', 'crop', 'scale']

export type Prefs = {
  tile: TileSize
  sidebar: SidebarSize
  expandAll: boolean
  /** 模板库大类手风琴：展开一个大类时折叠其他；与 expandAll（内层分类）不是同一级 */
  groupAccordion: boolean
  /** 画布中线（非吸附线）是否常驻显示 */
  guides: boolean
  rulers: boolean
  grid: boolean
  gridStep: GridStep
  gridStyle: GridStyle
  animPaused: boolean
  exportFormat: ExportFormat
  exportQuality: number
  /** 图片导出倍率：1x=设计尺寸，2x/3x=高清放大（HTML 导出不受影响） */
  exportScale: ExportScale
  /** 应用内隐藏的内置模板 id（只影响列表显示，不删代码文件） */
  hiddenTemplates: string[]
  /** 记住的切比例算法：'' = 每次弹框询问；非空则直接套用不弹框 */
  ratioAlgo: RatioAlgoPref
  /** 收藏的模板 id：侧栏置顶「📌 收藏」分区，常用风格不必每次重走分类树 */
  stars: string[]
  /** 用户自存配色变体，按模板 id 分组：刷新不丢，仅存在于本机 prefs 键里 */
  palettes: Record<string, PalettePreset[]>
}

const KEY = 'cover-maker.prefs'
const LEGACY_TILE_KEY = 'cover-maker.tile-size'
const SIZE_VALUES: TileSize[] = ['sm', 'md', 'lg']
const FORMAT_VALUES: ExportFormat[] = ['png', 'jpeg', 'html']
const GRID_STYLE_VALUES: GridStyle[] = ['line', 'dot']
const GRID_STEP_VALUES: GridStep[] = [0, 10, 20, 50, 100]

export const DEFAULT_PREFS: Prefs = {
  tile: 'md', sidebar: 'md',
  expandAll: false, groupAccordion: false, guides: false, rulers: false,
  grid: false, gridStep: 0, gridStyle: 'line',
  animPaused: false,
  exportFormat: 'png', exportQuality: 0.92, exportScale: 1,
  hiddenTemplates: [], ratioAlgo: '',
  stars: [], palettes: {}
}

function pick<T extends string>(v: unknown, ok: T[], fallback: T): T {
  return typeof v === 'string' && (ok as string[]).includes(v) ? (v as T) : fallback
}
function flag(v: unknown, fallback: boolean): boolean {
  return typeof v === 'boolean' ? v : fallback
}
const strList = (v: unknown): string[] =>
  Array.isArray(v) ? [...new Set((v as unknown[]).filter((x): x is string => typeof x === 'string'))] : []
/** 用户变体只认 { name: string, colors: { 字符串: 字符串 } } 这一种形状，其余整条丢弃 */
function sanitizePalettes(v: unknown): Record<string, PalettePreset[]> {
  if (!v || typeof v !== 'object' || Array.isArray(v)) return {}
  const out: Record<string, PalettePreset[]> = {}
  for (const [tplId, list] of Object.entries(v as Record<string, unknown>)) {
    if (!Array.isArray(list)) continue
    const ok = (list as unknown[]).flatMap((p): PalettePreset[] => {
      if (!p || typeof p !== 'object') return []
      const { name, colors } = p as Record<string, unknown>
      if (typeof name !== 'string' || !colors || typeof colors !== 'object' || Array.isArray(colors)) return []
      const clean: Record<string, string> = {}
      for (const [k, c] of Object.entries(colors as Record<string, unknown>)) {
        if (typeof c === 'string') clean[k] = c
      }
      return Object.keys(clean).length ? [{ name, colors: clean }] : []
    })
    if (ok.length) out[tplId] = ok
  }
  return out
}

export function loadPrefs(): Prefs {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) {
      const legacy = localStorage.getItem(LEGACY_TILE_KEY)
      if (legacy) localStorage.removeItem(LEGACY_TILE_KEY)
      return { ...DEFAULT_PREFS, tile: pick(legacy, SIZE_VALUES, DEFAULT_PREFS.tile) }
    }
    const p = JSON.parse(raw)
    return {
      tile: pick(p.tile, SIZE_VALUES, DEFAULT_PREFS.tile),
      sidebar: pick(p.sidebar, SIZE_VALUES, DEFAULT_PREFS.sidebar),
      expandAll: flag(p.expandAll, DEFAULT_PREFS.expandAll),
      groupAccordion: flag(p.groupAccordion, DEFAULT_PREFS.groupAccordion),
      guides: flag(p.guides, DEFAULT_PREFS.guides),
      rulers: flag(p.rulers, DEFAULT_PREFS.rulers),
      grid: flag(p.grid, DEFAULT_PREFS.grid),
      gridStep: GRID_STEP_VALUES.includes(p.gridStep) ? (p.gridStep as GridStep) : DEFAULT_PREFS.gridStep,
      gridStyle: pick(p.gridStyle, GRID_STYLE_VALUES, DEFAULT_PREFS.gridStyle),
      animPaused: flag(p.animPaused, DEFAULT_PREFS.animPaused),
      exportFormat: pick(p.exportFormat, FORMAT_VALUES, DEFAULT_PREFS.exportFormat),
      exportQuality: typeof p.exportQuality === 'number' ? Math.min(1, Math.max(0.1, p.exportQuality)) : DEFAULT_PREFS.exportQuality,
      exportScale: ([1, 2, 3] as number[]).includes(p.exportScale) ? (p.exportScale as ExportScale) : DEFAULT_PREFS.exportScale,
      hiddenTemplates: strList(p.hiddenTemplates),
      ratioAlgo: pick(p.ratioAlgo, RATIO_ALGO_VALUES, DEFAULT_PREFS.ratioAlgo),
      stars: strList(p.stars),
      palettes: sanitizePalettes(p.palettes)
    }
  } catch {
    return { ...DEFAULT_PREFS }
  }
}

// 写盘失败时出声的出口。7 个调用点里只有 1 个检查了返回值，与其让每处都记得处理，
// 不如在这里统一兜一次：注册钩子后，首次失败自动提示，写通过一次再复位（下次真失败还会响）。
let failHook: ((msg: string) => void) | null = null
let warnedOnce = false

/** 注册 prefs 写盘失败时的一次性告警回调（传 toast 之类） */
export function setPrefsFailHook(fn: (msg: string) => void) { failHook = fn }

export function savePrefs(patch: Partial<Prefs>): boolean {
  try {
    localStorage.setItem(KEY, JSON.stringify({ ...loadPrefs(), ...patch }))
    warnedOnce = false
    return true
  } catch {
    /* 隐私模式/禁用存储/超出配额：内存里的 prefs 仍然生效，但关页面就丢，得出声 */
    if (!warnedOnce) {
      warnedOnce = true
      failHook?.('⚠️ 界面偏好没能存到本机（浏览器存储不可用或已满），本次关掉页面后设置会丢')
    }
    return false
  }
}

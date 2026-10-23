// src/utils/userTemplates.ts
// 「另存为我的模板」与「编辑自动暂存」的本地存储层 + 模板烘焙（把 seed/overrides 固化成静态值）。
// 全程零后端：两个 localStorage 键，读写都容错。
import type { Template, UserOverrides } from '@/types/types'
import { resolveTemplate } from '../core/engine/resolver'

const LIB_KEY = 'cover-maker.userTemplates'
const SAVE_KEY = 'cover-maker.autosave'
/**
 * 「我的模板」整串读不出来时的落难备份键：原始 JSON 原样挪到这里再返回空库。
 * 不挪的话，用户下一次「另存为我的模板」会用 [新模板] 覆盖 LIB_KEY，原始数据就真没了。
 */
const CORRUPT_KEY = 'cover-maker.userTemplates.corrupt'
/** 我的模板列表上限：每张缩略图是内联 jpeg，防手滑存爆 5MB 配额 */
export const USER_TPL_LIMIT = 30

// ===== 烘焙：把用户的编辑写回一份静态 Template =====
// tokens/presets 原样保留（「我的模板」仍可一键换色换字体）；只有被改过的部分烙成字面量：
// token 改动 → 写进对应 default；元素级改动 → 覆盖到原元素上（$t 引用被顶掉）；$random 烙成当前种子结果（所见即所得）
export function bakeTemplate(tpl: Template, seed: number | string, overrides?: UserOverrides): Template {
  const cloned: any = JSON.parse(JSON.stringify(tpl))
  const r: any = resolveTemplate(tpl, seed, overrides)
  const ov = overrides || {}

  // ① Token：当前生效值成为新 default，label/options 不动
  for (const [path, val] of Object.entries(ov.tokens || {})) {
    const [grp, key] = path.split('.')
    if (grp && key && cloned.tokens?.[grp]?.[key]) cloned.tokens[grp][key].default = val
  }

  const resolvedById: Record<string, any> = {}
  for (const e of r.elements || []) resolvedById[e.id] = e

  const merge = (el: any, o: Record<string, any>) => {
    for (const [k, v] of Object.entries(o)) {
      if (k === 'textShadow' || k === 'boxShadow' || k === 'locked') continue
      if (k === 'position' && v && typeof v === 'object') {
        if (v.x !== undefined) el.x = v.x
        if (v.y !== undefined) el.y = v.y
      } else if (k === 'size' && v && typeof v === 'object' && v.scale) {
        if (typeof el.width === 'number' && typeof el.height === 'number') { el.width *= v.scale; el.height *= v.scale }
        else { const fin = resolvedById[el.id]; if (fin) { el.width = fin.width; el.height = fin.height } }
      } else if (k === 'color') {
        if (el.type === 'shape') el.fill = v; else el.color = v
      } else el[k] = v
    }
  }
  // $random 描述符烙成当前解析值；$t 引用保持不动（继续吃 tokens，配色面板可用）
  const bakeRandom = (el: any, fin: any) => {
    if (!fin) return
    for (const k of Object.keys(el)) {
      const v = el[k]
      if (Array.isArray(v)) {
        v.forEach((item: any, i: number) => { if (item && typeof item === 'object' && '$random' in item) v[i] = fin[k]?.[i] })
      } else if (v && typeof v === 'object') {
        if ('$random' in v) el[k] = fin[k]
        else if (!('$t' in v)) bakeRandom(v, fin[k])
      }
    }
  }
  const roundGeo = (el: any) => {
    for (const k of ['x', 'y', 'width', 'height', 'rotation', 'opacity', 'fontSize', 'letterSpacing', 'borderRadius', 'zIndex'])
      if (typeof el[k] === 'number') el[k] = Math.round(el[k] * 100) / 100
    return el
  }

  const deleted = new Set(ov.deleted || [])
  const baked: any[] = (cloned.elements || []).filter((e: any) => !deleted.has(e.id)).map((el: any) => {
    merge(el, ov.elements?.[el.id] || {})
    const fin = resolvedById[el.id]
    bakeRandom(el, fin)
    if (fin && fin.zIndex !== undefined) el.zIndex = fin.zIndex
    delete el.locked  // 锁定是编辑会话状态，不烙进源模板
    return roundGeo(el)
  })
  for (const a of (ov.added || [])) {
    const rest: any = { ...a }
    delete rest.locked
    baked.push(roundGeo(rest))
  }
  bakeRandom(cloned.canvas, r.canvas)

  return {
    schemaVersion: 1,
    id: cloned.id,
    name: cloned.name,
    category: cloned.category,
    version: '1.0.0',
    tags: ['我的模板'],
    thumbnail: cloned.thumbnail,
    canvas: cloned.canvas,
    ...(cloned.tokens ? { tokens: cloned.tokens } : {}),
    ...(cloned.presets ? { presets: cloned.presets } : {}),
    elements: baked
  }
}

// ===== 我的模板库 =====
/** 上次读取失败的原因；由 takeUserTemplatesLoadError() 取走，取走即清空 */
let lastLoadError: string | null = null

/** 取走（并清空）上次读库失败的原因，正常时为 null。启动后调用一次即可 */
export function takeUserTemplatesLoadError(): string | null {
  const e = lastLoadError
  lastLoadError = null
  return e
}

/** 损坏备份还在不在；返回值是备份串长度（字节数近似），没有则 null。供 UI 提示「有东西可捞」 */
export function peekCorruptBackup(): number | null {
  try {
    const raw = localStorage.getItem(CORRUPT_KEY)
    return raw ? raw.length : null
  } catch { return null }
}

/** 取出并删除损坏备份的原始串，供「导出备份文件」用 */
export function takeCorruptBackup(): string | null {
  try {
    const raw = localStorage.getItem(CORRUPT_KEY)
    if (!raw) return null
    localStorage.removeItem(CORRUPT_KEY)
    return raw
  } catch { return null }
}

export function loadUserTemplates(): Template[] {
  let raw: string | null = null
  try {
    raw = localStorage.getItem(LIB_KEY)
    if (!raw) return []
    const arr = JSON.parse(raw)
    if (!Array.isArray(arr)) {
      lastLoadError = '「我的模板」存的数据不是列表格式'
      return []
    }
    // 单条脏数据在这里被逐条剔除，不会连坐——所以整库消失只可能是整串解析失败
    return arr.filter((t: any) => t && typeof t.id === 'string' && typeof t.name === 'string'
      && typeof t.canvas === 'object' && Array.isArray(t.elements))
  } catch {
    // 整串坏了（写入被截断 / 被别的程序改坏）：先挪进备份键，再返回空库，避免下一次保存覆盖掉
    if (raw) {
      try { localStorage.setItem(CORRUPT_KEY, raw) } catch { /* 备份也写不下就只留提示 */ }
    }
    lastLoadError = '「我的模板」读取失败（本机存储里的数据损坏）'
    return []
  }
}

/** 写盘结果：ok=已保存（msg 可能是预警）；失败时 ok=false 且 msg 是原因 */
export function saveUserTemplates(list: Template[]): { ok: boolean; msg: string | null } {
  try {
    const json = JSON.stringify(list)
    localStorage.setItem(LIB_KEY, json)
    // 5MB 配额撞墙前先出声，给用户留出「导出 JSON 备份 + 删几个」的窗口
    if (json.length > 3.2 * 1024 * 1024) return { ok: true, msg: 'ℹ️ 「我的模板」已接近浏览器存储上限，建议用「全部导出」备份后删掉不用的' }
    return { ok: true, msg: null }
  } catch {
    return { ok: false, msg: '本地存储写入失败（可能超出浏览器配额，试试删除部分「我的模板」或用「全部导出」备份）' }
  }
}

export function uniqueUserId(base: string, taken: Set<string>): string {
  if (!taken.has(base)) return base
  let n = 2
  while (taken.has(`${base}-${n}`)) n++
  return `${base}-${n}`
}

// ===== 编辑自动暂存（草稿箱）：刷新后可一键恢复未导出的改动；按模板 id 各存一份，互不覆盖 =====
const AUTOSAVE_LIMIT = 12
export interface Autosave {
  tpl: Template
  seed: number | string
  overrides: UserOverrides
  at: number
}

export function hasEdits(overrides?: UserOverrides): boolean {
  const o = overrides || {}
  return !!(Object.keys(o.elements || {}).length || o.added?.length || o.deleted?.length
    || o.order?.length || o.locked?.length || Object.keys(o.tokens || {}).length)
}

export function loadAutosaves(): Autosave[] {
  try {
    const raw = localStorage.getItem(SAVE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    // 兼容旧单份格式（{} 而非 []）：当作一条草稿读入
    const list: Autosave[] = Array.isArray(parsed) ? parsed : [parsed]
    return list
      .filter(a => a && typeof a === 'object' && a.tpl && Array.isArray(a.tpl.elements) && hasEdits(a.overrides))
      .sort((a, b) => (b.at || 0) - (a.at || 0))
      .slice(0, AUTOSAVE_LIMIT)
  } catch { return [] }
}

/** null=成功，字符串=失败原因（草稿含大图超出配额时要出声，不能静默失效） */
export function writeAutosave(a: Autosave): string | null {
  const rest = loadAutosaves().filter(x => x.tpl.id !== a.tpl.id)
  try { localStorage.setItem(SAVE_KEY, JSON.stringify([a, ...rest].slice(0, AUTOSAVE_LIMIT))); return null }
  catch { return '⚠️ 草稿过大（上传图片？），未能自动暂存，关页面前记得导出或另存' }
}

/** 不带 id = 清空全部草稿；带 id = 只丢该模板那一份 */
export function clearAutosave(tplId?: string) {
  try {
    if (!tplId) localStorage.removeItem(SAVE_KEY)
    else localStorage.setItem(SAVE_KEY, JSON.stringify(loadAutosaves().filter(x => x.tpl.id !== tplId)))
  } catch { /* ignore */ }
}

// src/utils/templateIO.ts
import type { Template } from '@/types/types'
import { stripContractHeader } from './importContract'

const SAFE_KEY = /^[A-Za-z_$][A-Za-z0-9_$]*$/

function emitKey(k: string): string {
  return SAFE_KEY.test(k) ? k : JSON.stringify(k)
}

/** 递归输出 TS 对象字面量。字符串一律用 JSON.stringify，保证引号/反斜杠/换行都能原样还原。 */
function emitTs(v: any, ind: string): string {
  if (v === null || typeof v === 'number' || typeof v === 'boolean') return JSON.stringify(v)
  if (typeof v === 'string') return JSON.stringify(v)
  if (Array.isArray(v)) {
    if (!v.length) return '[]'
    return '[\n' + v.map(x => `${ind}  ${emitTs(x, ind + '  ')}`).join(',\n') + `\n${ind}]`
  }
  if (typeof v === 'object') {
    const entries = Object.entries(v).filter(([, val]) => val !== undefined)
    if (!entries.length) return '{}'
    return '{\n' + entries.map(([k, val]) => `${ind}  ${emitKey(k)}: ${emitTs(val, ind + '  ')}`).join(',\n') + `\n${ind}}`
  }
  return 'undefined'
}

export function serializeTemplateToTs(tpl: Template): string {
  const varName = `${tpl.category}Templates`
  const header = `// Auto-generated template: ${tpl.name} (${tpl.id})\nimport type { Template } from '@/types/types'\n\n`
  return `${header}export const ${varName}: Template[] = [\n${emitTs(tpl, '  ')}\n]\n\nexport default ${varName}\n`
}

export function downloadTextFile(filename: string, content: string) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

const ELEMENT_TYPES = new Set(['text', 'image', 'shape', 'overlay'])
const SHAPE_KINDS = new Set(['rect', 'circle', 'line'])
const NUM_FIELDS = ['x', 'y', 'width', 'height', 'rotation', 'fontSize', 'letterSpacing', 'lineHeight', 'opacity', 'zIndex', 'borderRadius']

function isPos(n: number) { return Number.isFinite(n) && n > 0 }

/** 结构校验：把会让渲染器崩掉或画不出来的问题一次性列全。 */
export function validateTemplateShape(obj: any): string[] {
  const errs: string[] = []
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return ['根节点必须是模板对象']
  if (typeof obj.id !== 'string' || !obj.id.trim()) errs.push('缺少字符串字段 id')
  else if (!/^[A-Za-z0-9][A-Za-z0-9_.-]*$/.test(obj.id)) errs.push(`id「${obj.id}」只能由字母、数字、- _ . 组成`)
  if (typeof obj.name !== 'string' || !obj.name.trim()) errs.push('缺少字符串字段 name（模板列表与导出文件名会用到）')
  if (typeof obj.category !== 'string' || !obj.category.trim()) errs.push('缺少 category（决定归类到哪个大类）')
  const c = obj.canvas
  if (!c || typeof c !== 'object') errs.push('缺少 canvas：没有画布尺寸无法渲染')
  else {
    const w = c.defaultWidth ?? c.virtualWidth, h = c.defaultHeight ?? c.virtualHeight
    if (!isPos(Number(w)) || !isPos(Number(h))) errs.push('canvas.defaultWidth/virtualWidth 与 defaultHeight/virtualHeight 必须是正数')
  }
  if (!Array.isArray(obj.elements)) errs.push('elements 必须是数组')
  else {
    if (!obj.elements.length) errs.push('elements 为空：模板至少需要一个元素')
    const seen = new Set<string>()
    obj.elements.forEach((e: any, i: number) => {
      const at = `elements[${i}]`
      if (!e || typeof e !== 'object') { errs.push(`${at} 不是对象`); return }
      if (typeof e.id !== 'string' || !e.id.trim()) errs.push(`${at} 缺少字符串 id（无法选中/导出）`)
      else if (seen.has(e.id)) errs.push(`${at} 的 id「${e.id}」重复`)
      else seen.add(e.id)
      if (typeof e.type !== 'string' || !ELEMENT_TYPES.has(e.type)) errs.push(`${at} 的 type「${e.type}」不在支持范围：${[...ELEMENT_TYPES].join('/')}`)
      else if (e.type === 'text' && typeof e.content !== 'string') errs.push(`${at} 是 text 但缺 content 字符串`)
      else if (e.type === 'shape' && e.shapeKind !== undefined && !SHAPE_KINDS.has(e.shapeKind)) errs.push(`${at} 的 shapeKind「${e.shapeKind}」不在支持范围：${[...SHAPE_KINDS].join('/')}`)
      else if (e.type === 'image' && typeof e.src !== 'string') errs.push(`${at} 是 image 但缺 src`)
      for (const f of NUM_FIELDS) {
        const v = e[f]
        if (v !== undefined && (typeof v !== 'number' || !Number.isFinite(v))) errs.push(`${at}.${f} 必须是数字，当前是 ${JSON.stringify(v)}`)
      }
    })
  }
  if (obj.tokens !== undefined) {
    if (typeof obj.tokens !== 'object' || obj.tokens === null) errs.push('tokens 必须是对象')
    else for (const [g, defs] of Object.entries(obj.tokens as Record<string, unknown>)) {
      if (!defs || typeof defs !== 'object') { errs.push(`tokens.${g} 必须是「键 → { label, default }」的字典`); continue }
      for (const [k, d] of Object.entries(defs as Record<string, unknown>)) {
        if (!d || typeof d !== 'object' || typeof (d as any).default === 'undefined') errs.push(`tokens.${g}.${k} 缺少 default`)
      }
    }
  }
  if (obj.presets !== undefined) {
    if (!Array.isArray(obj.presets)) errs.push('presets 必须是数组')
    else obj.presets.forEach((p: any, i: number) => {
      if (!p || typeof p !== 'object' || typeof p.name !== 'string') { errs.push(`presets[${i}] 需要 name`); return }
      if (!p.colors || typeof p.colors !== 'object') errs.push(`presets[${i}]（${p.name}）缺少 colors`)
    })
  }
  return errs
}

function normalizeImportBody(text: string): { json?: string; error?: string } {
  const { body, error } = stripContractHeader(text)
  if (error) return { error }
  // AI 常见不合规：包一层 ```json 围栏，属于确定性噪音，本地剥掉再解析
  const trimmed = body.trim()
  return { json: trimmed.startsWith('```') ? trimmed.replace(/^```[a-zA-Z]*\s*\n?/, '').replace(/\n?```\s*$/, '') : trimmed }
}

export function parseTemplateJson(text: string): { success: true; data: Template } | { success: false; errors: string[] } {
  const { json, error } = normalizeImportBody(text)
  if (error) return { success: false, errors: [error] }
  let obj: any
  try {
    obj = JSON.parse(json!)
  } catch (e: any) {
    return { success: false, errors: [e?.message || 'JSON 解析失败'] }
  }
  const errors = validateTemplateShape(obj)
  if (errors.length) return { success: false, errors }
  return { success: true, data: obj as Template }
}

/** 批量导入：接受单个模板对象或模板数组（批量变体的产出形态），逐份校验、错误带序号定位。 */
export function parseTemplateBatch(text: string): { success: true; data: Template[] } | { success: false; errors: string[] } {
  const { json, error } = normalizeImportBody(text)
  if (error) return { success: false, errors: [error] }
  let obj: any
  try {
    obj = JSON.parse(json!)
  } catch (e: any) {
    return { success: false, errors: [e?.message || 'JSON 解析失败'] }
  }
  const list = Array.isArray(obj) ? obj : [obj]
  if (!list.length) return { success: false, errors: ['数组为空：至少需要一个模板'] }
  const all: Template[] = []
  const errors: string[] = []
  list.forEach((item, i) => {
    const errs = validateTemplateShape(item).map(e => list.length > 1 ? `第 ${i + 1} 份：${e}` : e)
    if (errs.length) errors.push(...errs)
    else all.push(item as Template)
  })
  const seen = new Set<string>()
  for (const t of all) {
    if (seen.has(t.id)) errors.push(`模板 id「${t.id}」在批次内重复，请让每份 id 唯一`)
    seen.add(t.id)
  }
  if (errors.length) return { success: false, errors }
  return { success: true, data: all }
}

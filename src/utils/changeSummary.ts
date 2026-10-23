// src/utils/changeSummary.ts
// 把编辑器的 UserOverrides 翻译成"去源文件手改"的指引清单（只读推导，不写盘）
import type { Template, UserOverrides } from '@/types/types'

export type ChangeKind = 'field' | 'delete' | 'add' | 'order' | 'token'

export interface ChangeItem {
  kind: ChangeKind
  label: string
  detail: string
  code?: string
  locate?: string   // 源文件中的定位锚点（搜索词）
}

export const fmt = (v: unknown): string => {
  let s: string
  try { s = typeof v === 'string' ? JSON.stringify(v) : JSON.stringify(v) } catch { s = String(v) }
  if (s === undefined) s = String(v)
  if (s.startsWith('"data:image')) return `${s.slice(0, 55)}…"（内嵌图片，共 ${s.length} 字符）`
  return s.length > 200 ? s.slice(0, 197) + '…' : s
}

function elPreview(e: any): string {
  if (!e) return ''
  if (e.type === 'text') {
    const c = String(e.content ?? '').split('\n')[0]
    return `text · "${c.length > 18 ? c.slice(0, 18) + '…' : c}"`
  }
  if (e.type === 'image') {
    const s = String(e.src ?? '')
    const seed = s.match(/seed\/([^/]+)/)?.[1]
    return s.startsWith('data:') ? 'image · 内嵌SVG装饰' : `image · ${seed || s.slice(0, 24)}`
  }
  if (e.type === 'shape') return `shape · ${e.shapeKind || '?'}`
  return e.type || '?'
}

export function buildChangeSummary(tpl: Template | null, overrides: UserOverrides): ChangeItem[] {
  if (!tpl) return []
  const items: ChangeItem[] = []
  const els = new Map(tpl.elements.map(e => [e.id, e as any]))
  const addedList = (overrides.added || []).map((a: any) => ({ ...a }))
  const addedIds = new Set(addedList.map(a => a.id))
  const deleted = (overrides.deleted || []).filter(id => !addedIds.has(id))
  const deletedSet = new Set(deleted)
  const patches = overrides.elements || {}

  // 1) 字段级修改（新增元素的 patch 合并进其代码块展示）
  for (const [id, patch] of Object.entries(patches)) {
    if (!patch || typeof patch !== 'object') continue
    if (addedIds.has(id)) {
      const target = addedList.find(a => a.id === id)
      if (target) Object.assign(target, patch)
      continue
    }
    const orig = els.get(id)
    if (!orig || deletedSet.has(id)) continue
    const diffs: string[] = []
    for (const [key, val] of Object.entries(patch)) {
      if (key === 'locked') continue
      if (JSON.stringify(orig[key]) === JSON.stringify(val)) continue
      const wasToken = orig[key] && typeof orig[key] === 'object' && '$t' in orig[key]
      const wasRandom = orig[key] && typeof orig[key] === 'object' && '$random' in orig[key]
      let line = `${key}: ${fmt(orig[key])} → ${fmt(val)}`
      if (wasToken || wasRandom) line += ' ⚠ 源码此处是 $t/$random 引用，替换字面量会失去换色/随机能力，建议改为调整 tokens 默认值或 presets'
      diffs.push(line)
    }
    if (diffs.length) items.push({
      kind: 'field',
      label: `元素「${id}」（${elPreview(orig)}）`,
      detail: diffs.join('\n    '),
      locate: `id: '${id}'`
    })
  }

  // 2) 删除
  for (const id of deleted) {
    items.push({
      kind: 'delete',
      label: `删除元素「${id}」（${elPreview(els.get(id))}）`,
      detail: '在 elements 数组中删除该元素对象（整个 { ... } 一行）',
      locate: `id: '${id}'`
    })
  }

  // 3) 新增（复制/粘贴元素），给出可粘贴代码块
  for (const a of addedList) {
    items.push({
      kind: 'add',
      label: `新增元素「${a.id}」（${elPreview(a)}）`,
      detail: '将下面对象粘贴进 elements 数组末尾。\n    注意：其中颜色/坐标是已解析的具体值，需要换色能力时可手动改回 { $t: \'colors.xx\' }。\n    id 可简化为易读名（如 "' + String(a.content || '').slice(0, 6) + '-copy"），保持全局唯一即可',
      code: JSON.stringify(a, null, 2)
    })
  }

  // 4) 图层顺序
  if (overrides.order && overrides.order.length) {
    const cur = tpl.elements.filter(e => !deletedSet.has(e.id)).map(e => e.id)
    const next = overrides.order.filter(id => (cur.includes(id) || addedIds.has(id)))
    const sameCur = cur.filter(id => next.includes(id))
    if (next.length && JSON.stringify(sameCur) !== JSON.stringify(next.filter(id => sameCur.includes(id)))) {
      const seq = next.filter(id => sameCur.includes(id) || addedIds.has(id))
        .map(id => { const e = els.get(id) || addedList.find(a => a.id === id); return `${id}(zIndex ${(e as any)?.zIndex ?? '?'})` })
      items.push({ kind: 'order', label: '图层顺序调整', detail: `编辑器中从后到前的顺序为 ${seq.join(' < ')}，请按此调整各元素 zIndex 数值（数值大者在上）` })
    }
  }

  // 5) Token（换色 / 换字体 / 预设）
  for (const [path, val] of Object.entries(overrides.tokens || {})) {
    const [group, key] = path.split('.')
    const def = ((tpl.tokens as any) || {})[group]?.[key]
    if (!def || JSON.stringify(def.default) === JSON.stringify(val)) continue
    items.push({
      kind: 'token',
      label: `Token ${path}${def.label ? `（${def.label}）` : ''}`,
      detail: `default: ${fmt(def.default)} → ${fmt(val)}。\n    若属常用配色，建议同步改 presets 里对应预设的 colors.${key}，或新增一组 preset「${typeof val === 'string' ? val : ''}」`,
      locate: `tokens 或 presets`
    })
  }

  return items
}

export function summaryCounts(items: ChangeItem[]) {
  const c = { field: 0, delete: 0, add: 0, order: 0, token: 0 }
  items.forEach(it => c[it.kind]++)
  const parts: string[] = []
  if (c.field) parts.push(`${c.field} 处字段修改`)
  if (c.delete) parts.push(`删除 ${c.delete} 个`)
  if (c.add) parts.push(`新增 ${c.add} 个`)
  if (c.order) parts.push('图层换序')
  if (c.token) parts.push(`${c.token} 项 Token`)
  return parts.join(' · ')
}

export function summaryToText(tpl: Template, file: string | null, items: ChangeItem[]): string {
  const head = [
    `# 模板改动摘要：${tpl.name}（${tpl.id}）`,
    `# 共 ${items.length} 组改动：${summaryCounts(items)}`,
    `# 源文件：${file || '（导入的草稿模板，无内置源文件，可用「复制 JSON」整体导出）'}`,
    ''
  ]
  return head.concat(items.map((it, i) => {
    let s = `${i + 1}. ${it.label}：\n${it.detail}`
    if (it.locate) s += `\n   ▸ 定位：在源文件搜索 ${it.locate}`
    if (it.code) s += '\n' + it.code
    return s
  })).join('\n\n')
}

// src/core/engine/resolver.ts
import { createPRNG, hashStringToSeed } from './prng'
import type { Template, RandomDescriptor, ResolvedTemplate, TokenRef, UserOverrides, CanvasElement, TemplateCanvas } from '@/types/types'

function isRandomDescriptor(obj: unknown): obj is RandomDescriptor & { $random: any } {
  return typeof obj === 'object' && obj !== null && '$random' in obj
}
function isTokenRef(obj: unknown): obj is TokenRef {
  return typeof obj === 'object' && obj !== null && '$t' in obj && typeof (obj as any).$t === 'string'
}
function getNestedValue(obj: any, path: string) {
  return path.split('.').reduce((acc, key) => acc?.[key], obj)
}

function resolveTokensAndRefs(val: unknown, tokens: Record<string, any>, prng: () => number): unknown {
  if (val === null || val === undefined) return val
  if (isTokenRef(val)) {
    const resolved = getNestedValue(tokens, val.$t)
    if (resolved === undefined) {
      console.warn(`[resolver] Token 路径 "${val.$t}" 缺失，回退默认值`)
      return undefined
    }
    return resolved
  }
  if (isRandomDescriptor(val)) {
    const desc = val.$random
    switch (desc.type) {
      case 'range': {
        const min = desc.min, max = desc.max, step = desc.step || 1
        const raw = min + prng() * (max - min)
        const stepsCount = Math.round((raw - min) / step)
        return Number(Math.min(max, Math.max(min, min + stepsCount * step)).toFixed(4))
      }
      case 'choice': {
        const idx = Math.floor(prng() * desc.options.length)
        return resolveTokensAndRefs(desc.options[idx], tokens, prng)
      }
      case 'color': {
        const idx = Math.floor(prng() * desc.palette.length)
        return desc.palette[idx]
      }
    }
  }
  if (Array.isArray(val)) return val.map((item) => resolveTokensAndRefs(item, tokens, prng))
  if (typeof val === 'object') {
    const res: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(val as Record<string, unknown>)) {
      res[k] = resolveTokensAndRefs(v, tokens, prng)
    }
    return res
  }
  return val
}

function applyOverrides(el: any, overrides: Record<string, any> | undefined): any {
  if (!overrides) return el
  const res = { ...el }
  for (const [k, v] of Object.entries(overrides)) {
    if (k === 'position' && typeof v === 'object' && v !== null) {
      if (v.x !== undefined) res.x = v.x
      if (v.y !== undefined) res.y = v.y
    } else if (k === 'size' && typeof v === 'object' && v !== null) {
      const scale = v.scale || 1
      res.width = (res.width || 0) * scale
      res.height = (res.height || 0) * scale
    } else if (k === 'color') {
      if (res.type === 'shape') res.fill = v
      else if (res.type === 'text') res.color = v
    } else {
      res[k] = v
    }
  }
  return res
}

export function resolveTemplate(template: Template, seed: number | string, overrides?: UserOverrides): ResolvedTemplate {
  const numericSeed = typeof seed === 'string' ? hashStringToSeed(seed) : seed
  const prng = createPRNG(numericSeed)
  const cloned = JSON.parse(JSON.stringify(template))

  // ① Tokens 表 (default + overrides.tokens)
  const tokens: Record<string, any> = { colors: {}, fonts: {} }
  if (cloned.tokens?.colors) {
    for (const [k, v] of Object.entries(cloned.tokens.colors)) tokens.colors[k] = (v as any).default
  }
  if (cloned.tokens?.fonts) {
    for (const [k, v] of Object.entries(cloned.tokens.fonts)) tokens.fonts[k] = (v as any).default
  }
  if (overrides?.tokens) {
    for (const [path, val] of Object.entries(overrides.tokens)) {
      const keys = path.split('.')
      if (keys.length === 2 && tokens[keys[0]]) tokens[keys[0]][keys[1]] = val
    }
  }

  // ② 结构性 Overrides
  const deleted = new Set(overrides?.deleted || [])
  const lockedSet = new Set(overrides?.locked || [])
  const order = overrides?.order
  // added 是复制出来的"已解析字面量"，不含 $random/$t，不会扰动 PRNG 序列
  const added = (overrides?.added || []).map((a: any) => JSON.parse(JSON.stringify(a)))

  // 先剔除已删除元素，再追加新增元素，保证剩余元素 $random 消耗顺序稳定
  const pipeline = [...cloned.elements, ...added].filter((e: any) => !deleted.has(e.id))

  const resolvedCanvas = resolveTokensAndRefs(cloned.canvas, tokens, prng) as TemplateCanvas

  // ③ 解析 $t/$random + 元素级覆盖 + 锁定标记
  const resolvedElements = pipeline.map((el: CanvasElement) => {
    let resolvedEl = resolveTokensAndRefs(el, tokens, prng) as any
    if (overrides?.elements?.[el.id]) {
      resolvedEl = applyOverrides(resolvedEl, overrides.elements[el.id])
    }
    // rotation 域唯一收口：模板存量 270/180 等一律归一到滑杆域 [-180,180)，CSS 旋转等价，渲染/导出/滑杆同口径
    if (typeof resolvedEl.rotation === 'number' && Number.isFinite(resolvedEl.rotation)) {
      resolvedEl.rotation = ((resolvedEl.rotation + 180) % 360 + 360) % 360 - 180
    }
    if (lockedSet.has(el.id)) resolvedEl.locked = true
    return resolvedEl
  })

  // ④ 图层顺序：order 数组索引即 zIndex
  if (order && order.length) {
    resolvedElements.forEach((el: any) => {
      const idx = order.indexOf(el.id)
      el.zIndex = idx >= 0 ? idx : (el.zIndex || 0)
    })
  }

  // ⑤ 扁平化映射（兼容 Renderer 字段）
  const finalElements = resolvedElements.map((el: any) => {
    const mapped: any = { ...el }
    if (el.type === 'text') {
      if (el.shadow) mapped.textShadow = `${el.shadow.offsetX}px ${el.shadow.offsetY}px ${el.shadow.blur}px ${el.shadow.color}`
    } else if (el.type === 'shape') {
      if (el.shadow) mapped.boxShadow = `${el.shadow.offsetX}px ${el.shadow.offsetY}px ${el.shadow.blur}px ${el.shadow.color}`
    }
    return mapped
  })

  return { ...cloned, canvas: resolvedCanvas as any, elements: finalElements } as ResolvedTemplate
}
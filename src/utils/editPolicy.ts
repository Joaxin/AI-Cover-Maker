import type { ElementType, EditableValue, ControlDescriptor } from '@/types/types'

const FONT_WHITELIST = ["system-ui", "Arial", "Georgia", "'Courier New'", "'Times New Roman'", "'PingFang SC'", "'Microsoft YaHei'", "STKaiti", "SimHei", "SimSun"]

export const DEFAULT_POLICY: Record<ElementType, Record<string, ControlDescriptor | boolean>> = {
  text: { content: true, fontFamily: { type: 'select', options: FONT_WHITELIST }, fontSize: { type: 'range', min: 16, max: 160 }, textAlign: { type: 'select', options: ['left', 'center', 'right'] }, position: { type: 'drag', bounds: 'canvas' } },
  image: { src: { type: 'upload' }, position: { type: 'drag', bounds: 'canvas' }, size: { type: 'scale', min: 0.5, max: 1.5 } },
  shape: {},
  overlay: {}
}

// 词汇表限制
const VOCABULARY: Record<ElementType, Set<string>> = {
  text: new Set(['content', 'fontFamily', 'fontSize', 'color', 'textAlign', 'opacity', 'position']),
  image: new Set(['src', 'position', 'size', 'opacity']),
  shape: new Set(['color', 'position', 'opacity']),
  overlay: new Set(['opacity'])
}

export function getPolicy(type: ElementType, editable?: EditableValue): Record<string, ControlDescriptor | boolean> {
  const base = { ...DEFAULT_POLICY[type] }
  if (editable === false) return {}
  if (editable === true || editable === undefined) return base
  if (typeof editable === 'object') {
    const merged = { ...base, ...editable }
    // 过滤掉不在词汇表中的 key
    const vocab = VOCABULARY[type]
    for (const k of Object.keys(merged)) {
      if (!vocab.has(k)) delete merged[k]
    }
    return merged
  }
  return base
}

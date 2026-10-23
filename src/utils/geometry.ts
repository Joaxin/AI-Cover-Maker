// src/utils/geometry.ts
// 元素几何单一真源：锚点表 + 旋转视觉包围盒。App（对齐/分布）与 TemplateRenderer（吸附/幽灵）共用，防两处口径漂移。
export const ANCHOR_MAP: Record<string, [number, number]> = {
  'top-left': [0, 0], 'top-center': [-0.5, 0], 'top-right': [-1, 0],
  'center-left': [0, -0.5], 'center-center': [-0.5, -0.5], 'center-right': [-1, -0.5],
  'bottom-left': [0, -1], 'bottom-center': [-0.5, -1], 'bottom-right': [-1, -1]
}
// 元素「视觉包围盒」（原生坐标，已含 rotation）：rotation 是绕盒心的视觉 transform，
// 故包围盒 = 以盒心为中心、半宽高按 |cos|/|sin| 混合外扩。未旋转时退化为布局盒。
export function rotAABB(el: any) {
  const [mx, my] = ANCHOR_MAP[el.anchor || 'top-left']
  const w = Number(el.width) || 0, h = Number(el.height) || 0
  const tlx = (Number(el.x) || 0) + w * mx, tly = (Number(el.y) || 0) + h * my
  const cx = tlx + w / 2, cy = tly + h / 2
  const rad = (Number(el.rotation) || 0) * Math.PI / 180
  const c = Math.abs(Math.cos(rad)), s = Math.abs(Math.sin(rad))
  const hw = (w * c + h * s) / 2, hh = (w * s + h * c) / 2
  return { left: cx - hw, right: cx + hw, top: cy - hh, bottom: cy + hh, cx, cy }
}

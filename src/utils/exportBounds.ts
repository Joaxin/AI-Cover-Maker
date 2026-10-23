// src/utils/exportBounds.ts
// 导出尺寸的硬边界：一处定义、两路共用（自定义尺寸入口 + 导入入口），并给导出像素缓冲兜底。
//
// 为什么需要它：
//   浏览器 <canvas> 实际容量约 16384×16384、面积 ~268MP，但 RGBA 每像素 4 字节，
//   512MB 上下就开始爆（OOM / RangeError / 静默失败）。两个老漏洞都指向它：
//   ① 自定义尺寸入口虽拦了设计尺寸上限，但导出缓冲 = 宽×高×scale²，
//      40MP 设计 ×3x = 360MP ≈ 1.4GB，照崩 —— 必须把 scale 一起算进来；
//   ②「导入」路径直接拿模板自带的 canvas 尺寸设 designSize，完全绕过上限守卫。

/** 设计尺寸单边硬上限（px）——超过就按等比压回 */
export const MAX_SIDE = 8000
/** 设计尺寸面积硬上限（px²）= 40MP——覆盖常见 4K 封面留足余量 */
export const MAX_AREA = 40_000_000
/** 导出像素缓冲硬上限（px²）= 120MP ≈ 480MB RGBA，压在浏览器实际崩点之下 */
export const MAX_EXPORT_PIXELS = 120_000_000

/** 把任意设计尺寸压回 MAX_SIDE / MAX_AREA 内（等比缩放，尽量保住比例）；返回是否被压过 */
export function clampDesignSize(w: number, h: number): { w: number; h: number; clamped: boolean } {
  let cw = Math.max(1, Math.round(Number(w) || 0))
  let ch = Math.max(1, Math.round(Number(h) || 0))
  if (!cw || !ch) return { w: 1, h: 1, clamped: true }
  let clamped = false
  if (cw > MAX_SIDE || ch > MAX_SIDE) {
    const k = MAX_SIDE / Math.max(cw, ch)
    cw = Math.max(1, Math.floor(cw * k))
    ch = Math.max(1, Math.floor(ch * k))
    clamped = true
  }
  if (cw * ch > MAX_AREA) {
    const k = Math.sqrt(MAX_AREA / (cw * ch))
    cw = Math.max(1, Math.floor(cw * k))
    ch = Math.max(1, Math.floor(ch * k))
    clamped = true
  }
  return { w: cw, h: ch, clamped }
}

/** 导出倍率兜底：保证 宽×scale × 高×scale ≤ MAX_EXPORT_PIXELS；越界不报错，压到不超界并标记 */
export function clampExportScale(w: number, h: number, scale: number): { scale: number; clamped: boolean } {
  const s = Number.isFinite(scale) && (scale as number) > 0 ? (scale as number) : 1
  const base = Math.max(1, Math.round(Number(w) || 0)) * Math.max(1, Math.round(Number(h) || 0))
  if (base <= 0) return { scale: s, clamped: false }
  const maxS = Math.sqrt(MAX_EXPORT_PIXELS / base)
  const safe = Math.max(1, Math.min(s, Math.floor(maxS * 100) / 100))
  return { scale: safe, clamped: safe < s }
}

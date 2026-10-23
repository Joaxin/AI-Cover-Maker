// src/utils/imgPlaceholder.ts
// 灰虚线占位图：图片坑位（文字槽转图）与 {{IMG:id}} 回灌失败共用同一视觉语言。
// data URI 可直接进 image 元素的 src；stroke-dasharray="12 9" 是指纹，
// preexportScan 靠它识别「还是占位图」（# 一律 %23，勿改指纹）。
/** 中灰底 + 虚线框 + 用途文字的 SVG data URI；w/h 像素，r 圆角，label 最多 18 字 */
export function imgPlaceholder(w: number, h: number, r: number, label: string): string {
  const W = Number.isFinite(w) && w > 24 ? Math.round(w) : 300
  const H = Number.isFinite(h) && h > 24 ? Math.round(h) : 300
  const R = Number.isFinite(r) && r >= 0 ? Math.round(r) : 0
  const esc = String(label).slice(0, 18).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  const fs = Math.max(16, Math.min(48, Math.round(Math.min(W, H) * 0.13)))
  const box = `<rect x="2" y="2" width="${W - 4}" height="${H - 4}" rx="${R}"`
  const inner = `${box} fill="%239aa3af" fill-opacity="0.28"/><rect x="2" y="2" width="${W - 4}" height="${H - 4}" rx="${R}" fill="none" stroke="%236b7280" stroke-opacity="0.7" stroke-width="3" stroke-dasharray="12 9"/>` +
    `<text x="${W / 2}" y="${H / 2 + fs * 0.35}" font-family="system-ui,Segoe UI,sans-serif" font-size="${fs}" fill="%234b5563" text-anchor="middle">${esc}</text>`
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${inner}</svg>`
}

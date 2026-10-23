// src/core/templates/_fx/trend.ts
// 当红趋势批的公共素材函数与字体常量：各分类的 trend-* 模板从这里 import。
// 本目录不含模板定义，import.meta.glob 扫到也会因缺少 id/elements 而忽略。
// 注：grain / tape 在两个原始文件里实现略有差异（噪点频率、胶带透明度），保留两套以免迁移后外观变化，
//     质感批的版本统一加 Soft 后缀。
import type { CanvasElement } from '@/types/types'

export const SANS = 'Helvetica, Arial, sans-serif'

export const HEI = '"PingFang SC", "Microsoft YaHei", "Hiragino Sans GB", sans-serif'

export const SONG = 'Songti SC, SimSun, serif'

export const MONO = 'Consolas, Menlo, "Courier New", monospace'

export const IMPACT = 'Impact, "Arial Black", Haettenschweiler, sans-serif'

export function seeded(seed: number) { let x = seed; return () => (x = (x * 1103515245 + 12345) & 0x7fffffff) }

/** 噪点：feTurbulence 生成的模拟胶片颗粒，走 overlay 的 background 而非 shape.fill */
export function grain(size = 260, seed = 7, alpha = 0.55) {
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" seed="${seed}" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter><rect width="${size}" height="${size}" filter="url(%23n)" opacity="${alpha}"/></svg>`
}

/** 噪点颗粒（feTurbulence），只走 overlay 的 background */
export function grainSoft(size = 280, seed = 7, alpha = 0.6) {
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" seed="${seed}" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter><rect width="${size}" height="${size}" filter="url(%23n)" opacity="${alpha}"/></svg>`
}

/** 网点：halftone 圆点阵，颜色参数化跟随 token */
export function halftone(w: number, h: number, r: number, gap: number, fill: string) {
  let s = ''
  for (let y = gap / 2; y < h; y += gap) {
    for (let x = gap / 2; x < w; x += gap) s += `<circle cx='${x}' cy='${y}' r='${r}' fill='${fill}'/>`
  }
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${s}</svg>`
}

/** 手绘下划线：波浪 + 抖动，给"人味"趋势用 */
export function scribble(w: number, h: number, stroke: string, waves = 7) {
  const step = w / waves
  let d = `M0 ${h * 0.6}`
  for (let i = 0; i < waves; i++) d += ` Q ${(i + 0.5) * step} ${i % 2 ? h * 0.95 : h * 0.15} ${(i + 1) * step} ${h * 0.6}`
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><path d='${d}' fill='none' stroke='${stroke}' stroke-width='${Math.max(3, h / 6)}' stroke-linecap='round'/></svg>`
}

/** 五角星贴纸 */
export function star(size: number, fill: string) {
  const pts = Array.from({ length: 10 }, (_, i) => {
    const a = -Math.PI / 2 + (Math.PI * i) / 5
    const r = i % 2 ? size * 0.22 : size * 0.5
    return `${(size / 2 + Math.cos(a) * r).toFixed(1)},${(size / 2 + Math.sin(a) * r).toFixed(1)}`
  }).join(' ')
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><polygon points='${pts}' fill='${fill}'/></svg>`
}

/** 胶带条：斜切矩形 + 两端锯齿 */
export function tape(w: number, h: number, fill: string) {
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><path d='M6 0 L${w - 6} 0 ${w} ${h * 0.35} ${w - 8} ${h} 8 ${h} 0 ${h * 0.3} Z' fill='${fill}' opacity='0.82'/></svg>`
}

/** 胶带条：半透明斜切矩形 */
export function tapeSoft(w: number, h: number, fill: string) {
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><path d='M6 0 L${w - 6} 0 ${w} ${h * 0.35} ${w - 8} ${h} 8 ${h} 0 ${h * 0.3} Z' fill='${fill}' opacity='0.7'/></svg>`
}

/** 70s 落日：圆 + 横向切口，切口用底色保证与背景同色可换 */
export function sunDisc(size: number, fill: string, gapFill: string, bars = 6) {
  let s = `<circle cx='${size / 2}' cy='${size / 2}' r='${size / 2}' fill='${fill}'/>`
  for (let i = 0; i < bars; i++) {
    const y = size * (0.5 + (i * 0.5) / bars)
    const h = 3 + i * 3.2
    s += `<rect x='0' y='${y.toFixed(1)}' width='${size}' height='${h.toFixed(1)}' fill='${gapFill}'/>`
  }
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">${s}</svg>`
}

/** 星点 + 四角星闪：夜空底图的质感层 */
export function starfield(w: number, h: number, n: number, fill: string, seed = 21) {
  const rnd = seeded(seed); let s = ''
  for (let i = 0; i < n; i++) {
    const x = rnd() % w, y = rnd() % (h * 0.72), r = 1 + rnd() % 3
    s += `<circle cx='${x}' cy='${y}' r='${r}' fill='${fill}' opacity='${0.3 + (rnd() % 60) / 100}'/>`
  }
  for (let i = 0; i < 5; i++) {
    const x = 40 + rnd() % (w - 80), y = 40 + rnd() % (h * 0.5), r = 8 + rnd() % 10
    s += `<path d='M${x} ${y - r} Q ${x + r * 0.18} ${y - r * 0.18} ${x + r} ${y} Q ${x + r * 0.18} ${y + r * 0.18} ${x} ${y + r} Q ${x - r * 0.18} ${y + r * 0.18} ${x - r} ${y} Q ${x - r * 0.18} ${y - r * 0.18} ${x} ${y - r} Z' fill='${fill}' opacity='0.85'/>`
  }
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${s}</svg>`
}

/** 撕纸边：一行锯齿，翻转后可当作上下两条撕口 */
export function tornEdge(w: number, h: number, fill: string, teeth = 26) {
  const step = w / teeth
  let d = `M0 ${h}`
  for (let i = 0; i < teeth; i++) d += ` L${(i * step + step / 2).toFixed(1)} ${(i % 2 ? h * 0.18 : h * 0.72).toFixed(1)} L${((i + 1) * step).toFixed(1)} ${h}`
  d += ` L${w} ${h} Z`
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><path d='${d}' fill='${fill}'/></svg>`
}

export const SERIF = 'Didot, "Bodoni MT", Georgia, serif'

/** 柔光团：一圈圈同心圆由大到小叠出来，等价于径向渐变但跟随 token 换色 */
export function aura(prefix: string, cx: number, cy: number, maxR: number, token: string, steps = 6): CanvasElement[] {
  return Array.from({ length: steps }, (_, i) => {
    const r = maxR * (1 - i * 0.145)
    return {
      id: `${prefix}-${i}`, type: 'shape', shapeKind: 'circle',
      x: cx - r, y: cy - r, width: r * 2, height: r * 2,
      fill: { $t: token } as any, opacity: 0.05 + i * 0.03, zIndex: 1
    } as CanvasElement
  })
}

/** 撕纸片：不规则多边形，可填色可描边 */
export function scrap(w: number, h: number, fill: string, seed = 5) {
  const rnd = seeded(seed)
  const pts = [[0, h * 0.18], [w * 0.26, 0], [w * 0.72, h * 0.06], [w, h * 0.22], [w * 0.94, h * 0.78], [w * 0.62, h], [w * 0.2, h * 0.92], [0.02 * w, h * 0.55]]
  // pts 已是绝对坐标（w/h 已乘入），这里只叠加 ±7px 抖动；此前误写成 x*w/y*h 双重缩放，
  // 导致多边形顶点远超 viewBox、撕片在画布上完全不可见（缩略图与实渲染对不上的根因）。
  const j = pts.map(([x, y]) => `${(x + (rnd() % 14 - 7)).toFixed(1)},${(y + (rnd() % 14 - 7)).toFixed(1)}`).join(' ')
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><polygon points='${j}' fill='${fill}'/></svg>`
}

/** 半圆：整圆被底色矩形盖住一半，用来做 Bauhaus 拱形 */
export function arch(w: number, h: number, fill: string) {
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><path d='M0 ${h} A ${w / 2} ${h} 0 0 1 ${w} ${h} Z' fill='${fill}'/></svg>`
}

/** 三角形：几何构成里唯一的尖角 */
export function triangle(w: number, h: number, fill: string) {
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><polygon points='0,${h} ${w},${h} ${w / 2},0' fill='${fill}'/></svg>`
}

/** 云团：三个圆并排，做超现实里的漂浮物 */
export function cloud(w: number, h: number, fill: string) {
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><g fill='${fill}'><ellipse cx='${w * 0.3}' cy='${h * 0.62}' rx='${w * 0.28}' ry='${h * 0.32}'/><ellipse cx='${w * 0.52}' cy='${h * 0.42}' rx='${w * 0.24}' ry='${h * 0.4}'/><ellipse cx='${w * 0.72}' cy='${h * 0.64}' rx='${w * 0.24}' ry='${h * 0.28}'/><rect x='${w * 0.28}' y='${h * 0.6}' width='${w * 0.46}' height='${h * 0.34}'/></g></svg>`
}

/** 胶片齿孔：一列圆角方孔 */
export function perforations(w: number, h: number, n: number, fill: string) {
  const step = h / n
  let s = ''
  for (let i = 0; i < n; i++) s += `<rect x='${(w * 0.25).toFixed(1)}' y='${(i * step + step * 0.28).toFixed(1)}' width='${(w * 0.5).toFixed(1)}' height='${(step * 0.44).toFixed(1)}' rx='${(step * 0.2).toFixed(1)}' fill='${fill}'/>`
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${s}</svg>`
}

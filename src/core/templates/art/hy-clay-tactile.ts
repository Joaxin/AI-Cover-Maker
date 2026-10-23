// src/core/templates/art/hy-clay-tactile.ts —— 软陶研习 Clay Tactile（1:1）
// 2026 当红 Clay / Soft Tactile 3D：低饱和粉彩底 + 多枚有机软陶形体（闭合 Catmull-Rom 贝塞尔）
// + 顶部高光 / 底部暗面 / 接触阴影。HY 标记：id / 导出名 / tags 带 hy，kicker 嵌入「NO.HY-03」。
import type { Template } from '@/types/types'
import { HEI, MONO, SANS, SONG, SERIF, grain } from '../_fx/trend'
import { seeded01, svgUri } from '../_fx/common'

const W = '%23FFFFFF'

/** 闭合 Catmull-Rom → 贝塞尔，给软陶一枚圆润不规则轮廓 */
function smoothClosed(pts: number[][]) {
  const n = pts.length
  let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n]
    const c1x = p1[0] + (p2[0] - p0[0]) / 6, c1y = p1[1] + (p2[1] - p0[1]) / 6
    const c2x = p2[0] - (p3[0] - p1[0]) / 6, c2y = p2[1] - (p3[1] - p1[1]) / 6
    d += ` C${c1x.toFixed(1)} ${c1y.toFixed(1)} ${c2x.toFixed(1)} ${c2y.toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`
  }
  return `${d} Z`
}
/** 有机软陶：上宽下窄的饱满形态，半透明填充 + 白色玻璃描边 + 顶部高光 + 内暗面 */
function blob(w: number, h: number, fill: string, seed = 3, lobes = 8) {
  const rnd = seeded01(seed)
  const cx = w / 2, cy = h / 2
  const pts: number[][] = []
  for (let i = 0; i < lobes; i++) {
    const a = -Math.PI / 2 + (Math.PI * 2 * i) / lobes
    const taper = 0.5 + 0.5 * (1 - Math.sin(a)) / 2
    const j = 0.84 + rnd() * 0.3
    pts.push([cx + Math.cos(a) * (w / 2) * taper * j, cy + Math.sin(a) * (h / 2) * j])
  }
  const inner = pts.map(([x, y]) => [cx + (x - cx) * 0.62, cy + (y - cy) * 0.6])
  const hi = `M${cx.toFixed(1)} ${(cy - h * 0.32).toFixed(1)} Q ${(cx + w * 0.16).toFixed(1)} ${(cy - h * 0.42).toFixed(1)} ${cx.toFixed(1)} ${(cy - h * 0.2).toFixed(1)}`
  return svgUri(
    `<path d='${smoothClosed(pts)}' fill='${fill}' stroke='${W}' stroke-opacity='0.4' stroke-width='3'/>` +
    `<path d='${smoothClosed(inner)}' fill='${W}' fill-opacity='0.24'/>` +
    `<path d='${hi}' fill='none' stroke='${W}' stroke-opacity='0.5' stroke-width='3' stroke-linecap='round'/>`,
    w, h
  )
}

export const hyClayTactileTemplates: Template[] = [
  {
    id: 'hy-clay-tactile', name: '软陶研习', version: '1.0.0', category: 'art',
    tags: ['hy', 'art', 'clay', 'soft tactile', '3d', 'pastel', '1:1'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23FBF3EE"/><circle cx="50" cy="42" r="32" fill="%23E8A0B4" opacity="0.85"/><circle cx="38" cy="32" r="9" fill="%23FFFFFF" opacity="0.5"/><path d="M30 60 C26 68 36 72 42 66 C48 72 56 68 52 60 C48 70 32 72 30 60 Z" fill="%239FC5B8" opacity="0.8"/><circle cx="74" cy="68" r="12" fill="%23EFA96B" opacity="0.8"/></svg>',
    tokens: {
      colors: {
        bg: { label: '底色', default: '#FBF3EE', options: ['#FBF3EE', '#F4F7F2', '#FBF4E9', '#EEF1F5'] },
        clayA: { label: '陶土一', default: '#E8A0B4', options: ['#E8A0B4', '#9FC5B8', '#EFA96B', '#B9A3DC'] },
        clayB: { label: '陶土二', default: '#9FC5B8', options: ['#9FC5B8', '#C3DCD1', '#F6C99B', '#D3C4EC'] },
        clayC: { label: '陶土三', default: '#EFA96B', options: ['#EFA96B', '#E08A7A', '#A9B7E0', '#C4B5FD'] },
        ink: { label: '文字', default: '#5A3A40', options: ['#5A3A40', '#3A4A44', '#5A4326', '#3E3A52'] }
      },
      fonts: { heading: { label: '标题', default: HEI, options: [HEI, SONG, SERIF] }, mono: { label: '小字', default: MONO, options: [MONO, SANS] } }
    },
    presets: [
      { name: '陶土粉', colors: { bg: '#FBF3EE', clayA: '#E8A0B4', clayB: '#9FC5B8', clayC: '#EFA96B', ink: '#5A3A40' } },
      { name: '抹茶', colors: { bg: '#F4F7F2', clayA: '#9FC5B8', clayB: '#C3DCD1', clayC: '#F6C99B', ink: '#3A4A44' } },
      { name: '榛果', colors: { bg: '#FBF4E9', clayA: '#EFA96B', clayB: '#E08A7A', clayC: '#A9B7E0', ink: '#5A4326' } },
      { name: '灰蓝', colors: { bg: '#EEF1F5', clayA: '#B9A3DC', clayB: '#D3C4EC', clayC: '#C4B5FD', ink: '#3E3A52' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1080, defaultWidth: 1080, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'cl-top', type: 'overlay', x: 0, y: 0, width: 1080, height: 1080, background: 'linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 70%)', zIndex: 2 },
      // —— 主形体 + 接触阴影 ——
      { id: 'cl-shadow-main', type: 'shape', shapeKind: 'rect', borderRadius: 45, x: 360, y: 660, width: 420, height: 90, fill: { $t: 'colors.ink' }, opacity: 0.10, zIndex: 3 },
      { id: 'cl-main', type: 'image', src: blob(520, 560, '%23E8A0B4', 3), x: 300, y: 180, width: 520, height: 560, rotation: -8, zIndex: 4, animation: { name: 'float', duration: 9000, iterationCount: 'infinite', easing: 'ease-in-out' }, editable: { position: true, size: { type: 'scale' } } },
      // —— 小形体 ——
      { id: 'cl-shadow-1', type: 'shape', shapeKind: 'rect', borderRadius: 30, x: 150, y: 820, width: 250, height: 60, fill: { $t: 'colors.ink' }, opacity: 0.10, zIndex: 3 },
      { id: 'cl-1', group: 'cl-', type: 'image', src: blob(260, 280, '%239FC5B8', 11), x: 130, y: 600, width: 260, height: 280, rotation: 18, zIndex: 5, animation: { name: 'drift', duration: 11000, delay: 500, iterationCount: 'infinite', easing: 'ease-in-out' }, editable: { position: true, size: { type: 'scale' } } },
      { id: 'cl-shadow-2', type: 'shape', shapeKind: 'rect', borderRadius: 28, x: 740, y: 760, width: 240, height: 56, fill: { $t: 'colors.ink' }, opacity: 0.10, zIndex: 3 },
      { id: 'cl-2', group: 'cl-', type: 'image', src: blob(240, 260, '%23EFA96B', 19), x: 700, y: 540, width: 240, height: 260, rotation: -22, zIndex: 6, animation: { name: 'float', duration: 9600, delay: 1100, iterationCount: 'infinite', easing: 'ease-in-out' }, editable: { position: true, size: { type: 'scale' } } },
      { id: 'cl-3', group: 'cl-', type: 'image', src: blob(200, 220, '%23E8A0B4', 27), x: 540, y: 760, width: 200, height: 220, rotation: 10, zIndex: 6, animation: { name: 'drift', duration: 8200, delay: 300, iterationCount: 'infinite', easing: 'ease-in-out' }, editable: { position: true, size: { type: 'scale' } } },
      { id: 'cl-4', group: 'cl-', type: 'image', src: blob(180, 200, '%239FC5B8', 35), x: 120, y: 300, width: 180, height: 200, rotation: -28, zIndex: 5, animation: { name: 'float', duration: 10000, delay: 800, iterationCount: 'infinite', easing: 'ease-in-out' }, editable: { position: true, size: { type: 'scale' } } },
      // —— 文字 ——
      { id: 'cl-kicker', type: 'text', content: 'CLAY STUDY NO.HY-03', fontFamily: { $t: 'fonts.mono' }, fontSize: 22, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.72, letterSpacing: 8, x: 96, y: 120, width: 700, height: 32, zIndex: 8, animation: { name: 'fadeIn', duration: 800 } },
      { id: 'cl-title', type: 'text', content: '软陶\n研习', fontFamily: { $t: 'fonts.heading' }, fontSize: 78, fontWeight: '700', color: { $t: 'colors.ink' }, letterSpacing: 4, lineHeight: 1.18, x: 96, y: 820, width: 760, height: 200, zIndex: 8, animation: { name: 'fadeInUp', duration: 900, delay: 200 }, editable: { content: true, fontSize: { type: 'range', min: 62, max: 92 } } },
      { id: 'cl-sub', type: 'text', content: '把柔软，捏成一种态度。', fontFamily: { $t: 'fonts.heading' }, fontSize: 28, color: { $t: 'colors.ink' }, opacity: 0.8, letterSpacing: 3, lineHeight: 1.4, x: 96, y: 1020, width: 700, height: 44, zIndex: 8, animation: { name: 'rise', duration: 800, delay: 440 }, editable: { content: true } },
      { id: 'cl-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1080, background: `url("${grain(300, 5, 0.55)}")`, opacity: 0.05, mixBlendMode: 'multiply', zIndex: 20 }
    ]
  }
]

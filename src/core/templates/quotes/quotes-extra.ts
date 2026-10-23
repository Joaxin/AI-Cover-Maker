// src/core/templates/quotes/quotes-extra.ts
// 金句语录扩展模板：排版海报/夜色窗边/手账纸页/剪报/竖排古诗/聚光演讲/俳句/霓虹/字幕卡/日签
import type { Template } from '@/types/types'
import { seededInt } from '../_fx/common'

const seeded = seededInt

// ---------- 纸纹 / 墙纹 / 星空（透明 SVG，叠在 backgroundColor token 上）----------

function ruledLines(w: number, h: number, gap = 68, stroke = 'rgba(30,41,59,0.13)', startY = 180) {
  let s = ''
  for (let y = startY; y < h; y += gap) s += `<line x1="0" y1="${y}" x2="${w}" y2="${y}" stroke="${stroke}" stroke-width="1.5"/>`
  return 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '">' + s + '</svg>'
}
function brickWall(w: number, h: number, stroke = 'rgba(255,255,255,0.055)') {
  const bw = 132, bh = 46
  let s = ''
  for (let y = 0, row = 0; y < h; y += bh, row++) {
    s += `<line x1="0" y1="${y}" x2="${w}" y2="${y}" stroke="${stroke}" stroke-width="2"/>`
    for (let x = row % 2 === 0 ? 0 : bw / 2; x < w; x += bw) s += `<line x1="${x}" y1="${y}" x2="${x}" y2="${y + bh}" stroke="${stroke}" stroke-width="2"/>`
  }
  return 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '">' + s + '</svg>'
}
function starDots(w: number, h: number, n = 70, seed = 20260919) {
  const rnd = seeded(seed)
  let s = ''
  for (let i = 0; i < n; i++) s += `<circle cx="${rnd() % w}" cy="${rnd() % h}" r="${rnd() % 100 < 85 ? 1.4 : 2.6}" fill="rgba(232,236,248,0.5)" opacity="${0.2 + (rnd() % 55) / 100}"/>`
  return 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '">' + s + '</svg>'
}
function paperSpeck(w: number, h: number, n = 60, seed = 31, fill = 'rgba(38,34,28,0.10)') {
  const rnd = seeded(seed)
  let s = ''
  for (let i = 0; i < n; i++) s += `<circle cx="${rnd() % w}" cy="${rnd() % h}" r="${1 + rnd() % 3}" fill="${fill}"/>`
  return 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '">' + s + '</svg>'
}
function spotCone(w: number, h: number, color = '255,255,255') {
  return 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '"><defs><linearGradient id="cone" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="rgba(' + color + ',0.4)"/><stop offset="100%" stop-color="rgba(' + color + ',0)"/></linearGradient></defs><path d="M' + (w / 2 - 40) + ' 0 L' + (w / 2 + 40) + ' 0 L' + (w * 0.86) + ' ' + h + ' L' + (w * 0.14) + ' ' + h + ' Z" fill="url(%23cone)"/><ellipse cx="' + w / 2 + '" cy="' + (h - 30) + '" rx="' + (w * 0.36) + '" ry="60" fill="rgba(' + color + ',0.10)"/></svg>'
}

// ---------- 原创小插画 ----------
const MOON = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="220" height="220" viewBox="0 0 220 220"><path d="M150 14 A102 102 0 1 0 150 206 A126 126 0 0 1 150 14 Z" fill="%23fde68a"/><circle cx="112" cy="66" r="7" fill="%23eab308" opacity="0.35"/><circle cx="86" cy="128" r="10" fill="%23eab308" opacity="0.3"/></svg>'
const SUN = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180"><circle cx="90" cy="90" r="34" fill="%23f59e0b"/><g stroke="%23f59e0b" stroke-width="7" stroke-linecap="round">' + Array.from({ length: 8 }, (_, i) => { const a = (Math.PI * i) / 4; return `<line x1="${(90 + Math.cos(a) * 48).toFixed(0)}" y1="${(90 + Math.sin(a) * 48).toFixed(0)}" x2="${(90 + Math.cos(a) * 66).toFixed(0)}" y2="${(90 + Math.sin(a) * 66).toFixed(0)}"/>` }).join('') + '</g></svg>'
const COFFEE = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="190" viewBox="0 0 200 190"><path d="M18 78 h118 v52 a40 40 0 0 1 -40 40 h-38 a40 40 0 0 1 -40 -40 Z" fill="%23ea580c"/><path d="M136 92 h22 a24 24 0 0 1 0 48 h-26" fill="none" stroke="%23ea580c" stroke-width="10"/><rect x="4" y="172" width="150" height="10" rx="5" fill="%239a3412"/><g stroke="%23c2913f" stroke-width="6" stroke-linecap="round" fill="none" opacity="0.75"><path d="M52 52 q10 -14 0 -28 q-10 -14 0 -24"/><path d="M86 52 q10 -14 0 -28 q-10 -14 0 -24"/><path d="M120 52 q10 -14 0 -28 q-10 -14 0 -24"/></g></svg>'
const LEAF = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="140" height="160" viewBox="0 0 140 160"><path d="M118 12 C 40 30, 12 84, 24 148 C 96 138, 128 82, 118 12 Z" fill="%237fa37a"/><path d="M34 140 C 62 108, 86 70, 110 26" stroke="%23f6f7f2" stroke-width="5" fill="none" opacity="0.7"/></svg>'
const MIC = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="330" viewBox="0 0 120 330"><rect x="52" y="60" width="16" height="220" rx="8" fill="%23292524"/><ellipse cx="60" cy="300" rx="44" ry="12" fill="%23292524"/><circle cx="60" cy="42" r="30" fill="%2344403c"/><circle cx="60" cy="42" r="30" fill="none" stroke="%23fbbf24" stroke-width="3" opacity="0.55"/></svg>'

// ---------- 可复用字体 / tokens ----------
const SERIF = 'Georgia, Didot, serif'
const SONG = 'Songti SC, SimSun, serif'
const SANS = 'Helvetica, Arial, sans-serif'
const HAND = 'STKaiti, KaiTi, serif'
const MONO = 'Consolas, Menlo, "Courier New", monospace'
const QUOTE_COLORS = (labels: [string, string, string], def: { bg: string; primary: string; accent: string }, opts: { bg: string[]; primary: string[]; accent: string[] }) => ({
  bg: { label: labels[0], default: def.bg, options: opts.bg },
  primary: { label: labels[1], default: def.primary, options: opts.primary },
  accent: { label: labels[2], default: def.accent, options: opts.accent }
})

export const quotesExtraTemplates: Template[] = [
  // 1. 纯字体海报金句（4:5）
  {
    id: 'quote-typography-poster', name: '纯字体海报金句 (4:5)', version: '1.0.0', category: 'quotes', tags: ['quotes', 'typography', 'poster', 'minimal', '4:5'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="125" viewBox="0 0 100 125"><rect width="100" height="125" fill="%23faf7f0"/><text x="8" y="46" font-size="42" font-family="Georgia,serif" fill="%23e11d48" opacity="0.35">%22</text><rect x="14" y="52" width="56" height="6" fill="%23141414"/><rect x="14" y="64" width="40" height="6" fill="%23e11d48"/><rect x="14" y="76" width="50" height="6" fill="%23141414"/></svg>',
    tokens: {
      colors: QUOTE_COLORS(['纸色', '墨色', '眼色'], { bg: '#FAF7F0', primary: '#141414', accent: '#E11D48' }, {
        bg: ['#FAF7F0', '#FFFFFF', '#F4EFEA', '#101014'],
        primary: ['#141414', '#1C1917', '#292524', '#FAFAFA'],
        accent: ['#E11D48', '#0D9488', '#D97706', '#6366F1']
      }),
      fonts: { heading: { label: '金句字体', default: SERIF, options: [SERIF, SONG, SANS] } }
    },
    presets: [
      { name: '米纸红字', colors: { bg: '#FAF7F0', primary: '#141414', accent: '#E11D48' } },
      { name: '纯白青眼', colors: { bg: '#FFFFFF', primary: '#1C1917', accent: '#0D9488' } },
      { name: '暖棕琥珀', colors: { bg: '#F4EFEA', primary: '#292524', accent: '#D97706' } },
      { name: '黑纸靛光', colors: { bg: '#101014', primary: '#FAFAFA', accent: '#6366F1' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'tp-giant-quote', type: 'text', content: '“', fontFamily: { $t: 'fonts.heading' }, fontSize: 520, fontWeight: '900', color: { $t: 'colors.accent' }, opacity: 0.14, x: 40, y: 20, width: 520, height: 500, zIndex: 1 },
      { id: 'tp-kicker', type: 'text', content: '每日金句 · QUOTE OF THE DAY', fontFamily: SANS, fontSize: 24, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 6, x: 108, y: 150, width: 700, height: 32, zIndex: 4, editable: { content: true } },
      { id: 'tp-l1', type: 'text', content: '生活不会总是', fontFamily: { $t: 'fonts.heading' }, fontSize: 96, fontWeight: '700', color: { $t: 'colors.primary' }, letterSpacing: 2, x: 108, y: 340, width: 860, height: 116, zIndex: 3, animation: { name: 'fadeInUp', duration: 750 }, editable: { content: true, fontSize: { type: 'range', min: 64, max: 116 }, position: true } },
      { id: 'tp-l2', type: 'text', content: '如你所愿，', fontFamily: { $t: 'fonts.heading' }, fontSize: 96, fontWeight: '900', color: { $t: 'colors.accent' }, letterSpacing: 2, x: 108, y: 468, width: 860, height: 116, zIndex: 3, animation: { name: 'inkReveal', duration: 1000, delay: 300 }, editable: { content: true, fontSize: { type: 'range', min: 64, max: 116 }, position: true } },
      { id: 'tp-underline', type: 'shape', shapeKind: 'rect', x: 110, y: 596, width: 420, height: 12, fill: { $t: 'colors.accent' }, opacity: 0.35, zIndex: 3, animation: { name: 'slideInLeft', duration: 700, delay: 700 } },
      { id: 'tp-l3', type: 'text', content: '但总会好于', fontFamily: { $t: 'fonts.heading' }, fontSize: 96, fontWeight: '700', color: { $t: 'colors.primary' }, letterSpacing: 2, x: 108, y: 648, width: 860, height: 116, zIndex: 3, animation: { name: 'fadeInUp', duration: 750, delay: 500 }, editable: { content: true, fontSize: { type: 'range', min: 64, max: 116 }, position: true } },
      { id: 'tp-l4', type: 'text', content: '你的想象。', fontFamily: { $t: 'fonts.heading' }, fontSize: 96, fontWeight: '900', color: { $t: 'colors.primary' }, letterSpacing: 2, x: 108, y: 776, width: 860, height: 116, zIndex: 3, animation: { name: 'fadeInUp', duration: 750, delay: 700 }, editable: { content: true, fontSize: { type: 'range', min: 64, max: 116 }, position: true } },
      { id: 'tp-rule', type: 'shape', shapeKind: 'rect', x: 110, y: 1030, width: 130, height: 5, fill: { $t: 'colors.accent' }, zIndex: 4 },
      { id: 'tp-attr', type: 'text', content: '—— 摘自《局外人》读书笔记', fontFamily: SANS, fontSize: 30, fontWeight: '500', color: { $t: 'colors.primary' }, opacity: 0.55, letterSpacing: 2, x: 108, y: 1062, width: 700, height: 42, zIndex: 4, editable: { content: true } },
      { id: 'tp-corner', type: 'shape', shapeKind: 'rect', x: 946, y: 1196, width: 64, height: 64, border: { color: { $t: 'colors.accent' }, width: 4 }, zIndex: 4 }
    ]
  },
  // 2. 深夜窗边语录（9:16）
  {
    id: 'quote-night-window', name: '深夜窗边语录 (9:16)', version: '1.0.0', category: 'quotes', tags: ['quotes', 'night', 'window', 'poem', '9:16'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="72" height="128" viewBox="0 0 72 128"><rect width="72" height="128" fill="%230b1026"/><path d="M56 10 A13 13 0 1 0 56 36 A16 16 0 0 1 56 10 Z" fill="%23fde68a"/><rect x="14" y="46" width="44" height="52" fill="none" stroke="%23e8ecf8" stroke-width="2"/><line x1="36" y1="46" x2="36" y2="98" stroke="%23e8ecf8" stroke-width="1.5"/><circle cx="20" cy="18" r="1.5" fill="%23e8ecf8"/></svg>',
    tokens: {
      colors: QUOTE_COLORS(['夜空', '窗光', '月金'], { bg: '#0B1026', primary: '#E8ECF8', accent: '#FDE68A' }, {
        bg: ['#0B1026', '#141024', '#051620', '#000000'],
        primary: ['#E8ECF8', '#F5F3FF', '#D9F99D', '#FFFFFF'],
        accent: ['#FDE68A', '#93C5FD', '#F9A8D4', '#6EE7B7']
      }),
      fonts: { heading: { label: '金句字体', default: SONG, options: [SONG, SERIF, HAND] } }
    },
    presets: [
      { name: '午夜蓝月', colors: { bg: '#0B1026', primary: '#E8ECF8', accent: '#FDE68A' } },
      { name: '墨紫星灯', colors: { bg: '#141024', primary: '#F5F3FF', accent: '#93C5FD' } },
      { name: '深海萤火', colors: { bg: '#051620', primary: '#D9F99D', accent: '#6EE7B7' } },
      { name: '纯夜樱粉', colors: { bg: '#000000', primary: '#FFFFFF', accent: '#F9A8D4' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1920, defaultWidth: 1080, defaultHeight: 1920, backgroundColor: { $t: 'colors.bg' }, backgroundImage: starDots(1080, 1920) },
    elements: [
      { id: 'nw-kicker', type: 'text', content: '深夜书房 · Nº 21', fontFamily: MONO, fontSize: 26, fontWeight: '600', color: { $t: 'colors.primary' }, opacity: 0.5, letterSpacing: 4, x: 90, y: 110, width: 500, height: 34, zIndex: 4, editable: { content: true } },
      { id: 'nw-moon', type: 'image', src: MOON, x: 740, y: 150, width: 220, height: 220, zIndex: 3, animation: { name: 'float', duration: 5200, iterationCount: 'infinite' } },
      { id: 'nw-star-1', type: 'text', content: '✦', fontFamily: SANS, fontSize: 34, color: { $t: 'colors.primary' }, opacity: 0.8, x: 620, y: 120, width: 44, height: 44, zIndex: 3, animation: { name: 'twinkle', duration: 2400, iterationCount: 'infinite' } },
      { id: 'nw-star-2', type: 'text', content: '✦', fontFamily: SANS, fontSize: 26, color: { $t: 'colors.accent' }, x: 200, y: 300, width: 36, height: 36, zIndex: 3, animation: { name: 'twinkle', duration: 2900, delay: 700, iterationCount: 'infinite' } },
      { id: 'nw-star-3', type: 'text', content: '✦', fontFamily: SANS, fontSize: 22, color: { $t: 'colors.primary' }, opacity: 0.7, x: 900, y: 470, width: 30, height: 30, zIndex: 3, animation: { name: 'twinkle', duration: 2100, delay: 400, iterationCount: 'infinite' } },
      { id: 'nw-frame', type: 'shape', shapeKind: 'rect', x: 110, y: 620, width: 860, height: 900, border: { color: 'rgba(232,236,248,0.3)', width: 10 }, zIndex: 4 },
      { id: 'nw-mullion-v', type: 'shape', shapeKind: 'rect', x: 535, y: 620, width: 10, height: 900, fill: 'rgba(232,236,248,0.3)', zIndex: 4 },
      { id: 'nw-mullion-h', type: 'shape', shapeKind: 'rect', x: 110, y: 1065, width: 860, height: 10, fill: 'rgba(232,236,248,0.3)', zIndex: 4 },
      { id: 'nw-glare-1', type: 'shape', shapeKind: 'rect', x: 250, y: 560, width: 26, height: 520, fill: 'rgba(255,255,255,0.06)', rotation: 32, zIndex: 5 },
      { id: 'nw-glare-2', type: 'shape', shapeKind: 'rect', x: 330, y: 560, width: 12, height: 520, fill: 'rgba(255,255,255,0.05)', rotation: 32, zIndex: 5 },
      { id: 'nw-q1', type: 'text', content: '黑夜给了我黑色的眼睛', fontFamily: { $t: 'fonts.heading' }, fontSize: 58, fontWeight: '700', color: { $t: 'colors.primary' }, textAlign: 'center', letterSpacing: 4, x: 150, y: 780, width: 780, height: 84, zIndex: 6, animation: { name: 'fadeInUp', duration: 900 }, editable: { content: true, fontSize: { type: 'range', min: 40, max: 72 }, position: true } },
      { id: 'nw-q2', type: 'text', content: '我却用它寻找光明', fontFamily: { $t: 'fonts.heading' }, fontSize: 58, fontWeight: '900', color: { $t: 'colors.accent' }, textAlign: 'center', letterSpacing: 4, x: 150, y: 1140, width: 780, height: 84, zIndex: 6, animation: { name: 'fadeInUp', duration: 900, delay: 400 }, editable: { content: true, fontSize: { type: 'range', min: 40, max: 72 }, position: true } },
      { id: 'nw-attr', type: 'text', content: '—— 顾城《一代人》', fontFamily: SANS, fontSize: 28, fontWeight: '500', color: { $t: 'colors.primary' }, opacity: 0.6, textAlign: 'center', letterSpacing: 3, x: 150, y: 1260, width: 780, height: 40, zIndex: 6, editable: { content: true } },
      { id: 'nw-scrim', type: 'overlay', background: 'linear-gradient(to top, rgba(11,16,38,0.92) 0%, rgba(11,16,38,0) 34%)', x: 0, y: 0, width: 1080, height: 1920, zIndex: 7 },
      { id: 'nw-bottom', type: 'text', content: 'NIGHT READING · 凌晨两点十七分', fontFamily: SANS, fontSize: 22, fontWeight: '600', color: { $t: 'colors.primary' }, opacity: 0.4, textAlign: 'center', letterSpacing: 8, x: 140, y: 1720, width: 800, height: 30, zIndex: 8 }
    ]
  },
  // 3. 手账纸页摘录（1:1）
  {
    id: 'quote-notebook-page', name: '手账纸页摘录 (1:1)', version: '1.0.0', category: 'quotes', tags: ['quotes', 'notebook', 'journal', 'handwriting', '1:1'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23fffdf6"/><line x1="0" y1="34" x2="100" y2="34" stroke="%231e293b" stroke-width="1" opacity="0.15"/><line x1="0" y1="50" x2="100" y2="50" stroke="%231e293b" stroke-width="1" opacity="0.15"/><line x1="0" y1="66" x2="100" y2="66" stroke="%231e293b" stroke-width="1" opacity="0.15"/><line x1="14" y1="0" x2="14" y2="100" stroke="%23dc2626" stroke-width="1.5" opacity="0.5"/><rect x="26" y="6" width="26" height="8" fill="%23dc2626" opacity="0.25" transform="rotate(-6 39 10)"/></svg>',
    tokens: {
      colors: QUOTE_COLORS(['纸色', '墨水', '页边红'], { bg: '#FFFDF6', primary: '#1E293B', accent: '#DC2626' }, {
        bg: ['#FFFDF6', '#FBFAF3', '#F7F3E8', '#EFF3EC'],
        primary: ['#1E293B', '#292524', '#1F3A5F', '#3F3F46'],
        accent: ['#DC2626', '#0D9488', '#7C3AED', '#D97706']
      }),
      fonts: { hand: { label: '手写字体', default: HAND, options: [HAND, SONG, SERIF] } }
    },
    presets: [
      { name: '蓝黑墨水', colors: { bg: '#FFFDF6', primary: '#1E293B', accent: '#DC2626' } },
      { name: '碳素棕墨', colors: { bg: '#FBFAF3', primary: '#292524', accent: '#D97706' } },
      { name: '钢笔幽紫', colors: { bg: '#F7F3E8', primary: '#1F3A5F', accent: '#7C3AED' } },
      { name: '茶渍青墨', colors: { bg: '#EFF3EC', primary: '#3F3F46', accent: '#0D9488' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1080, defaultWidth: 1080, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' }, backgroundImage: ruledLines(1080, 1080) },
    elements: [
      { id: 'nb-margin', type: 'shape', shapeKind: 'rect', x: 150, y: 0, width: 4, height: 1080, fill: { $t: 'colors.accent' }, opacity: 0.45, zIndex: 2 },
      { id: 'nb-hole-1', group: 'nb-hole-', type: 'shape', shapeKind: 'circle', x: 50, y: 170, width: 44, height: 44, fill: 'rgba(15,23,42,0.10)', zIndex: 2 },
      { id: 'nb-hole-2', group: 'nb-hole-', type: 'shape', shapeKind: 'circle', x: 50, y: 500, width: 44, height: 44, fill: 'rgba(15,23,42,0.10)', zIndex: 2 },
      { id: 'nb-hole-3', group: 'nb-hole-', type: 'shape', shapeKind: 'circle', x: 50, y: 830, width: 44, height: 44, fill: 'rgba(15,23,42,0.10)', zIndex: 2 },
      { id: 'nb-tape-top', type: 'shape', shapeKind: 'rect', x: 230, y: 34, width: 250, height: 62, fill: { $t: 'colors.accent' }, opacity: 0.22, rotation: -6, zIndex: 6 },
      { id: 'nb-tape-bottom', type: 'shape', shapeKind: 'rect', x: 690, y: 986, width: 230, height: 58, fill: { $t: 'colors.accent' }, opacity: 0.2, rotation: 8, zIndex: 6 },
      { id: 'nb-header', type: 'text', content: '摘抄 · No.07', fontFamily: { $t: 'fonts.hand' }, fontSize: 42, fontWeight: '700', color: { $t: 'colors.primary' }, opacity: 0.75, letterSpacing: 2, x: 200, y: 92, width: 500, height: 56, zIndex: 4, editable: { content: true } },
      { id: 'nb-sun', type: 'image', src: SUN, x: 870, y: 70, width: 130, height: 130, zIndex: 4, animation: { name: 'spinSlow', duration: 26000, iterationCount: 'infinite', easing: 'linear' } },
      { id: 'nb-q1', type: 'text', content: '把每一天都活成一次日出，', fontFamily: { $t: 'fonts.hand' }, fontSize: 58, fontWeight: '700', color: { $t: 'colors.primary' }, letterSpacing: 2, x: 200, y: 330, width: 800, height: 78, zIndex: 4, animation: { name: 'inkReveal', duration: 1200 }, editable: { content: true, fontSize: { type: 'range', min: 40, max: 72 }, position: true } },
      { id: 'nb-q2', type: 'text', content: '日历就成了庆典。', fontFamily: { $t: 'fonts.hand' }, fontSize: 58, fontWeight: '900', color: { $t: 'colors.primary' }, letterSpacing: 2, x: 200, y: 458, width: 640, height: 78, zIndex: 4, animation: { name: 'inkReveal', duration: 1200, delay: 450 }, editable: { content: true, fontSize: { type: 'range', min: 40, max: 72 }, position: true } },
      { id: 'nb-underline', type: 'shape', shapeKind: 'rect', x: 204, y: 556, width: 430, height: 8, fill: { $t: 'colors.accent' }, opacity: 0.65, rotation: -1, zIndex: 4, animation: { name: 'slideInLeft', duration: 700, delay: 850 } },
      { id: 'nb-attr', type: 'text', content: '—— 佚名 · 手抄于 2026 的春天', fontFamily: { $t: 'fonts.hand' }, fontSize: 30, fontWeight: '500', color: { $t: 'colors.primary' }, opacity: 0.55, x: 430, y: 700, width: 560, height: 44, textAlign: 'right', zIndex: 4, editable: { content: true } },
      { id: 'nb-page', type: 'text', content: 'P.23', fontFamily: MONO, fontSize: 24, fontWeight: '600', color: { $t: 'colors.primary' }, opacity: 0.4, x: 200, y: 900, width: 90, height: 30, zIndex: 4 }
    ]
  },
  // 4. 报纸剪报金句（4:5）
  {
    id: 'quote-newspaper-clipping', name: '报纸剪报金句 (4:5)', version: '1.0.0', category: 'quotes', tags: ['quotes', 'newspaper', 'clipping', 'vintage', '4:5'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="125" viewBox="0 0 100 125"><rect width="100" height="125" fill="%23f3ede0"/><rect x="12" y="10" width="76" height="5" fill="%2326221c"/><rect x="20" y="20" width="60" height="3" fill="%2326221c" opacity="0.5"/><rect x="14" y="56" width="74" height="38" fill="%23fbf7ec" stroke="%2326221c" stroke-width="1" stroke-dasharray="3 3" transform="rotate(-2 51 75)"/><circle cx="51" cy="56" r="3.5" fill="%23a83232"/></svg>',
    tokens: {
      colors: QUOTE_COLORS(['旧纸', '铅字', '批注红'], { bg: '#F3EDE0', primary: '#26221C', accent: '#A83232' }, {
        bg: ['#F3EDE0', '#EDE6D6', '#F6F2E8', '#E9E4D8'],
        primary: ['#26221C', '#1C1917', '#292524', '#3F3F46'],
        accent: ['#A83232', '#1D4ED8', '#047857', '#B45309']
      }),
      fonts: { heading: { label: '金句字体', default: SONG, options: [SONG, SERIF, HAND] } }
    },
    presets: [
      { name: '旧纸铅字', colors: { bg: '#F3EDE0', primary: '#26221C', accent: '#A83232' } },
      { name: '钢笔蓝时评', colors: { bg: '#EDE6D6', primary: '#1C1917', accent: '#1D4ED8' } },
      { name: '绿栏夜读', colors: { bg: '#F6F2E8', primary: '#292524', accent: '#047857' } },
      { name: '赭栏旧刊', colors: { bg: '#E9E4D8', primary: '#3F3F46', accent: '#B45309' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' }, backgroundImage: paperSpeck(1080, 1350) },
    elements: [
      { id: 'nc-masthead', type: 'text', content: '晨 读 周 报 · 副 刊', fontFamily: { $t: 'fonts.heading' }, fontSize: 44, fontWeight: '900', color: { $t: 'colors.primary' }, textAlign: 'center', letterSpacing: 6, x: 70, y: 56, width: 940, height: 58, zIndex: 3, animation: { name: 'fadeInDown', duration: 800 }, editable: { content: true } },
      { id: 'nc-rule-1', type: 'shape', shapeKind: 'rect', x: 70, y: 128, width: 940, height: 4, fill: { $t: 'colors.primary' }, opacity: 0.8, zIndex: 3 },
      { id: 'nc-rule-2', type: 'shape', shapeKind: 'rect', x: 70, y: 140, width: 940, height: 1.5, fill: { $t: 'colors.primary' }, opacity: 0.8, zIndex: 3 },
      { id: 'nc-date', type: 'text', content: '2026 年 9 月 19 日 · 第 2,113 期 · 每逢周六出刊', fontFamily: MONO, fontSize: 20, fontWeight: '600', color: { $t: 'colors.primary' }, opacity: 0.45, textAlign: 'center', letterSpacing: 2, x: 70, y: 152, width: 940, height: 28, zIndex: 3, editable: { content: true } },
      ...Array.from({ length: 5 }, (_, i) => ({ id: 'nc-tex-l' + i, type: 'shape' as const, shapeKind: 'rect' as const, x: 70, y: 214 + i * 30, width: [430, 405, 430, 380, 300][i], height: 9, fill: { $t: 'colors.primary' }, opacity: 0.14, group: 'tex-l', zIndex: 2 })),
      ...Array.from({ length: 5 }, (_, i) => ({ id: 'nc-tex-r' + i, type: 'shape' as const, shapeKind: 'rect' as const, x: 590, y: 214 + i * 30, width: [420, 430, 390, 430, 260][i], height: 9, fill: { $t: 'colors.primary' }, opacity: 0.14, group: 'tex-r', zIndex: 2 })),
      { id: 'nc-headline', type: 'text', content: '今天，想记住的一句话', fontFamily: { $t: 'fonts.heading' }, fontSize: 62, fontWeight: '900', color: { $t: 'colors.primary' }, x: 84, y: 420, width: 920, height: 84, zIndex: 3, animation: { name: 'rise', duration: 850, delay: 250 }, editable: { content: true, fontSize: { type: 'range', min: 44, max: 78 }, position: true } },
      { id: 'nc-card-shadow', type: 'shape', shapeKind: 'rect', x: 128, y: 588, width: 830, height: 400, fill: 'rgba(38,34,28,0.20)', rotation: -1.5, zIndex: 3 },
      { id: 'nc-card', type: 'shape', shapeKind: 'rect', x: 112, y: 568, width: 830, height: 400, fill: '#FBF7EC', border: { color: { $t: 'colors.primary' }, width: 2, style: 'dashed' }, rotation: -1.5, zIndex: 4 },
      { id: 'nc-pin', type: 'shape', shapeKind: 'circle', x: 500, y: 548, width: 38, height: 38, fill: { $t: 'colors.accent' }, zIndex: 6 },
      { id: 'nc-pin-hi', type: 'shape', shapeKind: 'circle', x: 508, y: 556, width: 12, height: 12, fill: 'rgba(255,255,255,0.55)', zIndex: 7 },
      { id: 'nc-clip-tag', type: 'text', content: 'CLIPPED · 已收藏', fontFamily: MONO, fontSize: 18, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 2, rotation: -1.5, x: 150, y: 600, width: 240, height: 26, zIndex: 5 },
      { id: 'nc-quote', type: 'text', content: '“记忆里最亮的那盏灯，\n其实是别人顺手为你开过门。”', fontFamily: { $t: 'fonts.heading' }, fontSize: 46, fontWeight: '700', color: { $t: 'colors.primary' }, textAlign: 'center', lineHeight: 1.6, rotation: -1.5, x: 170, y: 660, width: 720, height: 190, zIndex: 5, animation: { name: 'fadeInUp', duration: 800, delay: 450 }, editable: { content: true, fontSize: { type: 'range', min: 34, max: 58 }, position: true } },
      { id: 'nc-attr', type: 'text', content: '—— 三联书店留言墙', fontFamily: { $t: 'fonts.heading' }, fontSize: 28, fontWeight: '500', color: { $t: 'colors.primary' }, opacity: 0.6, textAlign: 'right', rotation: -1.5, x: 520, y: 886, width: 380, height: 40, zIndex: 5, editable: { content: true } },
      ...Array.from({ length: 4 }, (_, i) => ({ id: 'nc-tex-b' + i, type: 'shape' as const, shapeKind: 'rect' as const, x: 70, y: 1034 + i * 30, width: [940, 910, 940, 620][i], height: 9, fill: { $t: 'colors.primary' }, opacity: 0.12, group: 'tex-b', zIndex: 2 })),
      { id: 'nc-footer', type: 'text', content: 'EDITED BY 晨读小组 · 副刊第 09 版', fontFamily: MONO, fontSize: 18, fontWeight: '600', color: { $t: 'colors.primary' }, opacity: 0.4, letterSpacing: 2, x: 70, y: 1252, width: 600, height: 24, zIndex: 3 }
    ]
  },
  // 5. 竖排古诗卡片（1:1）
  {
    id: 'quote-poetry-vertical', name: '竖排古诗卡片 (1:1)', version: '1.0.0', category: 'quotes', tags: ['quotes', 'poem', 'vertical', 'chinese', '1:1'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23f5f1e6"/><rect x="7" y="7" width="86" height="86" fill="none" stroke="%232b2620" stroke-width="1.2"/><rect x="70" y="18" width="5" height="46" fill="%232b2620"/><rect x="58" y="18" width="5" height="30" fill="%232b2620" opacity="0.75"/><rect x="46" y="18" width="5" height="46" fill="%232b2620" opacity="0.75"/><circle cx="22" cy="76" r="6" fill="%23b03a2e"/></svg>',
    tokens: {
      colors: QUOTE_COLORS(['宣纸', '烟墨', '朱印'], { bg: '#F5F1E6', primary: '#2B2620', accent: '#B03A2E' }, {
        bg: ['#F5F1E6', '#F8F4EA', '#EFEADC', '#F3EEE3'],
        primary: ['#2B2620', '#1C1917', '#334155', '#3F3F46'],
        accent: ['#B03A2E', '#1E40AF', '#065F46', '#9333EA']
      }),
      fonts: { heading: { label: '诗句字体', default: SONG, options: [SONG, SERIF, HAND] } }
    },
    presets: [
      { name: '宣纸朱印', colors: { bg: '#F5F1E6', primary: '#2B2620', accent: '#B03A2E' } },
      { name: '澄心堂蓝', colors: { bg: '#F8F4EA', primary: '#334155', accent: '#1E40AF' } },
      { name: '艾绿斋', colors: { bg: '#EFEADC', primary: '#1C1917', accent: '#065F46' } },
      { name: '紫霜笺', colors: { bg: '#F3EEE3', primary: '#3F3F46', accent: '#9333EA' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1080, defaultWidth: 1080, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' }, backgroundImage: paperSpeck(1080, 1080, 40, 7, 'rgba(43,38,32,0.07)') },
    elements: [
      { id: 'pv-ghost', type: 'text', content: '詩', fontFamily: { $t: 'fonts.heading' }, fontSize: 560, fontWeight: '900', color: { $t: 'colors.primary' }, opacity: 0.05, textAlign: 'center', x: 260, y: 220, width: 560, height: 580, zIndex: 1 },
      { id: 'pv-frame-out', type: 'shape', shapeKind: 'rect', x: 64, y: 64, width: 952, height: 952, border: { color: { $t: 'colors.primary' }, width: 3 }, opacity: 0.7, zIndex: 2 },
      { id: 'pv-frame-in', type: 'shape', shapeKind: 'rect', x: 88, y: 88, width: 904, height: 904, border: { color: { $t: 'colors.primary' }, width: 1.5 }, opacity: 0.35, zIndex: 2 },
      { id: 'pv-kicker', type: 'text', content: '古诗词 · 句签', fontFamily: { $t: 'fonts.heading' }, fontSize: 24, fontWeight: '600', color: { $t: 'colors.primary' }, opacity: 0.5, letterSpacing: 6, x: 130, y: 120, width: 300, height: 32, zIndex: 4 },
      { id: 'pv-col-1', type: 'text', content: '回\n首\n向\n来\n萧\n瑟\n处', fontFamily: { $t: 'fonts.heading' }, fontSize: 62, fontWeight: '900', color: { $t: 'colors.primary' }, textAlign: 'center', lineHeight: 1.18, x: 830, y: 180, width: 110, height: 530, zIndex: 4, animation: { name: 'inkReveal', duration: 1100 }, editable: { content: true, fontSize: { type: 'range', min: 44, max: 76 }, position: true } },
      { id: 'pv-col-2', type: 'text', content: '归\n去', fontFamily: { $t: 'fonts.heading' }, fontSize: 62, fontWeight: '900', color: { $t: 'colors.accent' }, textAlign: 'center', lineHeight: 1.18, x: 686, y: 180, width: 110, height: 160, zIndex: 4, animation: { name: 'inkReveal', duration: 1100, delay: 400 }, editable: { content: true, fontSize: { type: 'range', min: 44, max: 76 }, position: true } },
      { id: 'pv-col-3', type: 'text', content: '也\n无\n风\n雨\n也\n无\n晴', fontFamily: { $t: 'fonts.heading' }, fontSize: 62, fontWeight: '700', color: { $t: 'colors.primary' }, textAlign: 'center', lineHeight: 1.18, x: 542, y: 180, width: 110, height: 530, zIndex: 4, animation: { name: 'inkReveal', duration: 1100, delay: 750 }, editable: { content: true, fontSize: { type: 'range', min: 44, max: 76 }, position: true } },
      { id: 'pv-seal', type: 'shape', shapeKind: 'circle', x: 158, y: 782, width: 92, height: 92, fill: { $t: 'colors.accent' }, zIndex: 4 },
      { id: 'pv-seal-text', type: 'text', content: '集\n句', fontFamily: { $t: 'fonts.heading' }, fontSize: 28, fontWeight: '900', color: '#FFFFFF', textAlign: 'center', lineHeight: 1.2, x: 158, y: 800, width: 92, height: 66, zIndex: 5 },
      { id: 'pv-attr', type: 'text', content: '宋 · 苏轼《定风波》', fontFamily: { $t: 'fonts.heading' }, fontSize: 28, fontWeight: '500', color: { $t: 'colors.primary' }, opacity: 0.6, letterSpacing: 3, x: 158, y: 898, width: 400, height: 38, zIndex: 4, editable: { content: true } }
    ]
  },
  // 6. 演讲金句聚光（16:9）
  {
    id: 'quote-spotlight-stage', name: '演讲金句聚光 (16:9)', version: '1.0.0', category: 'quotes', tags: ['quotes', 'keynote', 'stage', 'spotlight', '16:9'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="90" viewBox="0 0 160 90"><rect width="160" height="90" fill="%230c0a09"/><path d="M74 0 L86 0 L112 70 L48 70 Z" fill="%23ffffff" opacity="0.08"/><rect x="30" y="34" width="100" height="7" fill="%23fafafa"/><rect x="46" y="47" width="68" height="7" fill="%23fbbf24"/><ellipse cx="80" cy="78" rx="34" ry="5" fill="%23ffffff" opacity="0.06"/></svg>',
    tokens: {
      colors: QUOTE_COLORS(['暗场', '白光', '金句黄'], { bg: '#0C0A09', primary: '#FAFAFA', accent: '#FBBF24' }, {
        bg: ['#0C0A09', '#000000', '#0B1120', '#1A1204'],
        primary: ['#FAFAFA', '#F5F5F4', '#E2E8F0', '#FEF9C3'],
        accent: ['#FBBF24', '#38BDF8', '#F472B6', '#4ADE80']
      }),
      fonts: { heading: { label: '金句字体', default: SANS, options: [SANS, SERIF, SONG] } }
    },
    presets: [
      { name: '鎏金舞台', colors: { bg: '#0C0A09', primary: '#FAFAFA', accent: '#FBBF24' } },
      { name: '极夜纯黑', colors: { bg: '#000000', primary: '#F5F5F4', accent: '#F472B6' } },
      { name: '深海蓝调', colors: { bg: '#0B1120', primary: '#E2E8F0', accent: '#38BDF8' } },
      { name: '夜话暖绿', colors: { bg: '#1A1204', primary: '#FEF9C3', accent: '#4ADE80' } }
    ],
    canvas: { virtualWidth: 1920, virtualHeight: 1080, defaultWidth: 1920, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'sl-cone', type: 'image', src: spotCone(1920, 1080), x: 0, y: 0, width: 1920, height: 1080, zIndex: 2, animation: { name: 'fadeIn', duration: 1200 } },
      { id: 'sl-floor', type: 'shape', shapeKind: 'rect', x: 0, y: 930, width: 1920, height: 150, fill: 'rgba(255,255,255,0.05)', zIndex: 2 },
      { id: 'sl-floor-line', type: 'shape', shapeKind: 'rect', x: 0, y: 928, width: 1920, height: 2, fill: 'rgba(255,255,255,0.14)', zIndex: 3 },
      { id: 'sl-mic', type: 'image', src: MIC, x: 1620, y: 620, width: 110, height: 300, zIndex: 3 },
      { id: 'sl-arc-1', type: 'shape', shapeKind: 'circle', x: 1560, y: 560, width: 240, height: 240, border: { color: 'rgba(255,255,255,0.10)', width: 2 }, zIndex: 3 },
      { id: 'sl-arc-2', type: 'shape', shapeKind: 'circle', x: 1520, y: 520, width: 320, height: 320, border: { color: 'rgba(255,255,255,0.06)', width: 2 }, zIndex: 3 },
      { id: 'sl-kicker', type: 'text', content: '主题演讲 · KEYNOTE NOTES', fontFamily: MONO, fontSize: 26, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 6, x: 150, y: 130, width: 700, height: 36, zIndex: 4, editable: { content: true } },
      { id: 'sl-dust-1', type: 'text', content: '✦', fontFamily: SANS, fontSize: 22, color: 'rgba(255,255,255,0.35)', x: 760, y: 260, width: 30, height: 30, zIndex: 4, animation: { name: 'twinkle', duration: 2600, iterationCount: 'infinite' } },
      { id: 'sl-dust-2', type: 'text', content: '✦', fontFamily: SANS, fontSize: 16, color: 'rgba(255,255,255,0.3)', x: 1140, y: 360, width: 24, height: 24, zIndex: 4, animation: { name: 'twinkle', duration: 3100, delay: 800, iterationCount: 'infinite' } },
      { id: 'sl-q1', type: 'text', content: '掌声会停，', fontFamily: { $t: 'fonts.heading' }, fontSize: 92, fontWeight: '700', color: { $t: 'colors.primary' }, textAlign: 'center', letterSpacing: 6, x: 460, y: 400, width: 1000, height: 120, zIndex: 4, animation: { name: 'fadeIn', duration: 900, delay: 400 }, editable: { content: true, fontSize: { type: 'range', min: 60, max: 120 }, position: true } },
      { id: 'sl-q2', type: 'text', content: '但问题不会。', fontFamily: { $t: 'fonts.heading' }, fontSize: 92, fontWeight: '900', color: { $t: 'colors.accent' }, textAlign: 'center', letterSpacing: 6, x: 460, y: 536, width: 1000, height: 120, zIndex: 4, animation: { name: 'glow', duration: 2600, delay: 900, iterationCount: 'infinite' }, editable: { content: true, fontSize: { type: 'range', min: 60, max: 120 }, position: true } },
      { id: 'sl-attr', type: 'text', content: '—— 一场内部分享会的开场白', fontFamily: SANS, fontSize: 28, fontWeight: '500', color: 'rgba(250,250,250,0.55)', textAlign: 'center', letterSpacing: 3, x: 460, y: 690, width: 1000, height: 40, zIndex: 4, editable: { content: true } }
    ]
  },
  // 7. 俳句留白小卡（1:1）
  {
    id: 'quote-haiku-minimal', name: '俳句留白小卡 (1:1)', version: '1.0.0', category: 'quotes', tags: ['quotes', 'haiku', 'minimal', 'zen', '1:1'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23fbfbf8"/><rect x="38" y="22" width="24" height="1.5" fill="%233f3f46" opacity="0.4"/><rect x="26" y="42" width="48" height="4" fill="%233f3f46"/><rect x="32" y="52" width="36" height="4" fill="%233f3f46" opacity="0.75"/><rect x="36" y="62" width="28" height="4" fill="%233f3f46" opacity="0.55"/><circle cx="50" cy="78" r="2.5" fill="%237fa37a"/></svg>',
    tokens: {
      colors: QUOTE_COLORS(['素纸', '淡墨', '苔绿'], { bg: '#FBFBF8', primary: '#3F3F46', accent: '#7FA37A' }, {
        bg: ['#FBFBF8', '#FFFFFF', '#F6F5F0', '#F0F4F2'],
        primary: ['#3F3F46', '#1C1917', '#334155', '#292524'],
        accent: ['#7FA37A', '#B45309', '#0E7490', '#9F1239']
      }),
      fonts: { heading: { label: '俳句字体', default: SONG, options: [SONG, HAND, SERIF] } }
    },
    presets: [
      { name: '素纸苔绿', colors: { bg: '#FBFBF8', primary: '#3F3F46', accent: '#7FA37A' } },
      { name: '纯白褐金', colors: { bg: '#FFFFFF', primary: '#292524', accent: '#B45309' } },
      { name: '米灰海青', colors: { bg: '#F6F5F0', primary: '#334155', accent: '#0E7490' } },
      { name: '霜绿胭脂', colors: { bg: '#F0F4F2', primary: '#1C1917', accent: '#9F1239' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1080, defaultWidth: 1080, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'hk-kicker', type: 'text', content: '俳句 · HAIKU', fontFamily: MONO, fontSize: 20, fontWeight: '600', color: { $t: 'colors.primary' }, opacity: 0.4, letterSpacing: 6, x: 88, y: 88, width: 300, height: 28, zIndex: 3, editable: { content: true } },
      { id: 'hk-rule-top', type: 'shape', shapeKind: 'rect', x: 480, y: 250, width: 120, height: 2, fill: { $t: 'colors.primary' }, opacity: 0.35, zIndex: 3 },
      { id: 'hk-quote', type: 'text', content: '古池塘\n青蛙跃入\n水之声', fontFamily: { $t: 'fonts.heading' }, fontSize: 46, fontWeight: '700', color: { $t: 'colors.primary' }, textAlign: 'center', lineHeight: 2.15, letterSpacing: 8, x: 240, y: 330, width: 600, height: 300, zIndex: 3, animation: { name: 'inkReveal', duration: 1400 }, editable: { content: true, fontSize: { type: 'range', min: 34, max: 60 }, position: true } },
      { id: 'hk-dot', type: 'shape', shapeKind: 'circle', x: 533, y: 690, width: 14, height: 14, fill: { $t: 'colors.accent' }, zIndex: 3, animation: { name: 'pulse', duration: 3400, iterationCount: 'infinite' } },
      { id: 'hk-leaf', type: 'image', src: LEAF, x: 800, y: 720, width: 104, height: 118, zIndex: 3, animation: { name: 'float', duration: 5600, iterationCount: 'infinite' }, editable: { position: true, size: { type: 'scale' } } },
      { id: 'hk-attr', type: 'text', content: '松尾芭蕉 · 贞享二年春', fontFamily: SANS, fontSize: 22, fontWeight: '500', color: { $t: 'colors.primary' }, opacity: 0.45, textAlign: 'center', letterSpacing: 4, x: 340, y: 766, width: 400, height: 32, zIndex: 3, editable: { content: true, position: true } },
      { id: 'hk-rule-bottom', type: 'shape', shapeKind: 'rect', x: 480, y: 900, width: 120, height: 2, fill: { $t: 'colors.primary' }, opacity: 0.35, zIndex: 3 }
    ]
  },
  // 8. 霓虹灯语录（9:16）
  {
    id: 'quote-neon-sign', name: '霓虹灯语录 (9:16)', version: '1.0.0', category: 'quotes', tags: ['quotes', 'neon', 'night', 'sign', '9:16'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="72" height="128" viewBox="0 0 72 128"><rect width="72" height="128" fill="%23141018"/><g stroke="%23ffffff" stroke-width="0.6" opacity="0.06"><line x1="0" y1="30" x2="72" y2="30"/><line x1="0" y1="60" x2="72" y2="60"/><line x1="0" y1="90" x2="72" y2="90"/></g><rect x="10" y="36" width="52" height="42" rx="8" fill="none" stroke="%23ff5fa2" stroke-width="2"/><rect x="18" y="50" width="36" height="4" fill="%23ff5fa2"/><rect x="22" y="60" width="28" height="4" fill="%23ff5fa2" opacity="0.7"/></svg>',
    tokens: {
      colors: QUOTE_COLORS(['夜墙', '灯下白', '霓虹粉'], { bg: '#141018', primary: '#F1F0F5', accent: '#FF5FA2' }, {
        bg: ['#141018', '#0B0E14', '#170A12', '#050505'],
        primary: ['#F1F0F5', '#FFFFFF', '#E0F2FE', '#FEF9C3'],
        accent: ['#FF5FA2', '#22D3EE', '#A3E635', '#FB7185']
      }),
      fonts: { heading: { label: '金句字体', default: SANS, options: [SANS, SONG, SERIF] } }
    },
    presets: [
      { name: '霓虹粉夜', colors: { bg: '#141018', primary: '#F1F0F5', accent: '#FF5FA2' } },
      { name: '青色电子夜', colors: { bg: '#0B0E14', primary: '#E0F2FE', accent: '#22D3EE' } },
      { name: '酸绿后巷', colors: { bg: '#170A12', primary: '#FEF9C3', accent: '#A3E635' } },
      { name: '纯夜珊瑚', colors: { bg: '#050505', primary: '#FFFFFF', accent: '#FB7185' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1920, defaultWidth: 1080, defaultHeight: 1920, backgroundColor: { $t: 'colors.bg' }, backgroundImage: brickWall(1080, 1920) },
    elements: [
      { id: 'ne-wire-l', type: 'shape', shapeKind: 'rect', x: 320, y: 190, width: 4, height: 200, fill: 'rgba(255,255,255,0.18)', zIndex: 3 },
      { id: 'ne-wire-r', type: 'shape', shapeKind: 'rect', x: 756, y: 190, width: 4, height: 200, fill: 'rgba(255,255,255,0.18)', zIndex: 3 },
      { id: 'ne-mount-l', type: 'shape', shapeKind: 'rect', x: 300, y: 168, width: 44, height: 26, fill: 'rgba(255,255,255,0.12)', zIndex: 3 },
      { id: 'ne-mount-r', type: 'shape', shapeKind: 'rect', x: 736, y: 168, width: 44, height: 26, fill: 'rgba(255,255,255,0.12)', zIndex: 3 },
      { id: 'ne-frame', type: 'shape', shapeKind: 'rect', x: 110, y: 380, width: 860, height: 660, borderRadius: 28, border: { color: { $t: 'colors.accent' }, width: 5 }, zIndex: 4, animation: { name: 'glow', duration: 2800, iterationCount: 'infinite' } },
      { id: 'ne-glow-halo', type: 'overlay', background: 'radial-gradient(closest-side, rgba(255,95,162,0.16), rgba(255,95,162,0))', x: 150, y: 420, width: 780, height: 580, zIndex: 2 },
      { id: 'ne-q1', type: 'text', content: '心若没有栖息的地方', fontFamily: { $t: 'fonts.heading' }, fontSize: 68, fontWeight: '900', color: { $t: 'colors.accent' }, textAlign: 'center', letterSpacing: 6, x: 170, y: 520, width: 740, height: 90, zIndex: 5, shadow: { color: 'rgba(255,95,162,0.85)', blur: 26, offsetX: 0, offsetY: 0 }, animation: { name: 'fadeIn', duration: 900 }, editable: { content: true, fontSize: { type: 'range', min: 48, max: 84 }, position: true } },
      { id: 'ne-q2', type: 'text', content: '到哪里都是在流浪', fontFamily: { $t: 'fonts.heading' }, fontSize: 68, fontWeight: '900', color: { $t: 'colors.accent' }, textAlign: 'center', letterSpacing: 6, x: 170, y: 660, width: 740, height: 90, zIndex: 5, shadow: { color: 'rgba(255,95,162,0.85)', blur: 26, offsetX: 0, offsetY: 0 }, animation: { name: 'fadeIn', duration: 900, delay: 400 }, editable: { content: true, fontSize: { type: 'range', min: 48, max: 84 }, position: true } },
      { id: 'ne-attr', type: 'text', content: '—— 三毛', fontFamily: SANS, fontSize: 30, fontWeight: '600', color: { $t: 'colors.primary' }, opacity: 0.85, textAlign: 'center', letterSpacing: 4, x: 170, y: 800, width: 740, height: 42, zIndex: 5, animation: { name: 'blink', duration: 3200, iterationCount: 'infinite' }, editable: { content: true } },
      { id: 'ne-en', type: 'text', content: 'HOME IS WHERE THE HEART IS', fontFamily: SANS, fontSize: 24, fontWeight: '700', color: { $t: 'colors.primary' }, opacity: 0.55, textAlign: 'center', letterSpacing: 8, x: 140, y: 1140, width: 800, height: 34, zIndex: 4, editable: { content: true } },
      { id: 'ne-spark-1', type: 'text', content: '✦', fontFamily: SANS, fontSize: 26, color: { $t: 'colors.primary' }, opacity: 0.4, x: 130, y: 340, width: 34, height: 34, zIndex: 4, animation: { name: 'twinkle', duration: 2600, iterationCount: 'infinite' } },
      { id: 'ne-cord', type: 'shape', shapeKind: 'rect', x: 536, y: 1040, width: 8, height: 620, fill: 'rgba(255,255,255,0.10)', zIndex: 2 },
      { id: 'ne-socket', type: 'shape', shapeKind: 'rect', x: 500, y: 1660, width: 80, height: 54, borderRadius: 10, fill: 'rgba(255,255,255,0.10)', zIndex: 3 },
      { id: 'ne-kicker', type: 'text', content: 'NEON QUOTE BAR · 深夜营业', fontFamily: MONO, fontSize: 22, fontWeight: '600', color: { $t: 'colors.primary' }, opacity: 0.35, letterSpacing: 5, x: 140, y: 1800, width: 800, height: 30, textAlign: 'center', zIndex: 4 }
    ]
  },
  // 9. 电影台词字幕卡（16:9）
  {
    id: 'quote-film-strip-quote', name: '电影台词字幕卡 (16:9)', version: '1.0.0', category: 'quotes', tags: ['quotes', 'film', 'subtitle', 'movie', '16:9'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="90" viewBox="0 0 160 90"><rect width="160" height="90" fill="%23000000"/><rect y="0" width="160" height="10" fill="%23000000"/><rect x="16" y="14" width="128" height="62" fill="%2337362e"/><rect x="40" y="70" width="80" height="6" fill="%23ffd43b"/><rect x="52" y="80" width="56" height="3" fill="%23ffffff" opacity="0.5"/></svg>',
    tokens: {
      colors: QUOTE_COLORS(['暗场', '字幕白', '台词黄'], { bg: '#000000', primary: '#FFFFFF', accent: '#FFD43B' }, {
        bg: ['#000000', '#0A0A0C', '#101418', '#0C0A09'],
        primary: ['#FFFFFF', '#F5F5F4', '#E2E8F0', '#FEF9C3'],
        accent: ['#FFD43B', '#7DD3FC', '#86EFAC', '#F9A8D4']
      }),
      fonts: { subtitle: { label: '字幕字体', default: SANS, options: [SANS, SONG, SERIF] } }
    },
    presets: [
      { name: '经典黄字幕', colors: { bg: '#000000', primary: '#FFFFFF', accent: '#FFD43B' } },
      { name: '冷调蓝字幕', colors: { bg: '#0A0A0C', primary: '#F5F5F4', accent: '#7DD3FC' } },
      { name: '胶片夜绿', colors: { bg: '#101418', primary: '#E2E8F0', accent: '#86EFAC' } },
      { name: '柔粉爱情片', colors: { bg: '#0C0A09', primary: '#FEF9C3', accent: '#F9A8D4' } }
    ],
    canvas: { virtualWidth: 1920, virtualHeight: 1080, defaultWidth: 1920, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'fs-photo', type: 'image', src: '/images/photo/film-still-quiet-morning-1920x1080.jpg', objectFit: 'cover', x: 0, y: 0, width: 1920, height: 1080, zIndex: 1, editable: { src: { type: 'upload' }, position: true } },
      { id: 'fs-scrim', type: 'overlay', background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.12) 42%, rgba(0,0,0,0) 60%)', x: 0, y: 0, width: 1920, height: 1080, zIndex: 2 },
      { id: 'fs-bar-top', type: 'shape', shapeKind: 'rect', x: 0, y: 0, width: 1920, height: 68, fill: 'rgba(0,0,0,0.9)', zIndex: 3 },
      { id: 'fs-bar-bottom', type: 'shape', shapeKind: 'rect', x: 0, y: 1012, width: 1920, height: 68, fill: 'rgba(0,0,0,0.9)', zIndex: 3 },
      { id: 'fs-title', type: 'text', content: '片名 ·《夏日细语》', fontFamily: { $t: 'fonts.subtitle' }, fontSize: 28, fontWeight: '700', color: { $t: 'colors.primary' }, opacity: 0.85, letterSpacing: 3, x: 110, y: 120, width: 500, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'fs-rec', type: 'text', content: '● REC', fontFamily: MONO, fontSize: 22, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 2, x: 1500, y: 126, width: 120, height: 30, zIndex: 4, animation: { name: 'blink', duration: 1800, iterationCount: 'infinite' } },
      { id: 'fs-timecode', type: 'text', content: '01:24:37', fontFamily: MONO, fontSize: 26, fontWeight: '600', color: { $t: 'colors.primary' }, opacity: 0.5, letterSpacing: 2, x: 1650, y: 124, width: 160, height: 34, textAlign: 'right', zIndex: 4 },
      { id: 'fs-sub-zh', type: 'text', content: '猜来猜去，人生终究还是得自己做决定。', fontFamily: { $t: 'fonts.subtitle' }, fontSize: 48, fontWeight: '700', color: { $t: 'colors.accent' }, textAlign: 'center', letterSpacing: 2, x: 210, y: 812, width: 1500, height: 68, zIndex: 5, shadow: { color: 'rgba(0,0,0,0.9)', blur: 8, offsetX: 0, offsetY: 2 }, animation: { name: 'fadeInUp', duration: 800, delay: 400 }, editable: { content: true, fontSize: { type: 'range', min: 34, max: 62 }, position: true } },
      { id: 'fs-sub-en', type: 'text', content: 'Guess as you may, you must decide your own life.', fontFamily: SANS, fontSize: 26, fontWeight: '500', color: 'rgba(255,255,255,0.72)', textAlign: 'center', x: 210, y: 894, width: 1500, height: 40, zIndex: 5, animation: { name: 'fadeInUp', duration: 800, delay: 650 }, editable: { content: true } },
      { id: 'fs-attr', type: 'text', content: '—— 台词手记 · Nº 064', fontFamily: MONO, fontSize: 20, fontWeight: '600', color: 'rgba(255,255,255,0.45)', letterSpacing: 2, x: 110, y: 952, width: 400, height: 28, zIndex: 5, editable: { content: true } }
    ]
  },
  // 10. 早安日签（4:5）
  {
    id: 'quote-morning-card', name: '早安日签 (4:5)', version: '1.0.0', category: 'quotes', tags: ['quotes', 'daily', 'morning', 'calendar', '4:5'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="125" viewBox="0 0 100 125"><rect width="100" height="125" fill="%23fff7ed"/><rect x="8" y="8" width="84" height="109" fill="none" stroke="%23f97316" stroke-width="1.5" stroke-dasharray="4 3"/><text x="34" y="52" font-size="26" font-family="Georgia,serif" fill="%2344403c">19</text><circle cx="80" cy="22" r="7" fill="%23f59e0b"/><rect x="26" y="82" width="48" height="4" fill="%2344403c" opacity="0.6"/><rect x="34" y="90" width="32" height="4" fill="%23f97316"/></svg>',
    tokens: {
      colors: QUOTE_COLORS(['晨纸', '咖啡墨', '日出橙'], { bg: '#FFF7ED', primary: '#44403C', accent: '#F97316' }, {
        bg: ['#FFF7ED', '#FFFBEB', '#FEF2F2', '#F0FDFA'],
        primary: ['#44403C', '#292524', '#1C1917', '#134E4A'],
        accent: ['#F97316', '#DC2626', '#0D9488', '#CA8A04']
      }),
      fonts: { heading: { label: '金句字体', default: HAND, options: [HAND, SONG, SANS] } }
    },
    presets: [
      { name: '晨光暖橙', colors: { bg: '#FFF7ED', primary: '#44403C', accent: '#F97316' } },
      { name: '奶黄早晨', colors: { bg: '#FFFBEB', primary: '#292524', accent: '#CA8A04' } },
      { name: '微醺桃红', colors: { bg: '#FEF2F2', primary: '#1C1917', accent: '#DC2626' } },
      { name: '薄荷青晨', colors: { bg: '#F0FDFA', primary: '#134E4A', accent: '#0D9488' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'mc-frame', type: 'shape', shapeKind: 'rect', x: 56, y: 56, width: 968, height: 1238, border: { color: { $t: 'colors.accent' }, width: 3, style: 'dashed' }, opacity: 0.55, zIndex: 2 },
      { id: 'mc-kicker', type: 'text', content: '日签 · DAILY QUOTE', fontFamily: SANS, fontSize: 24, fontWeight: '700', color: { $t: 'colors.accent' }, textAlign: 'center', letterSpacing: 8, x: 240, y: 122, width: 600, height: 34, zIndex: 4, editable: { content: true } },
      { id: 'mc-sun', type: 'image', src: SUN, x: 830, y: 100, width: 140, height: 140, zIndex: 3, animation: { name: 'spinSlow', duration: 30000, iterationCount: 'infinite', easing: 'linear' } },
      { id: 'mc-date', type: 'text', content: '19', fontFamily: SERIF, fontSize: 220, fontWeight: '900', color: { $t: 'colors.primary' }, textAlign: 'center', x: 290, y: 176, width: 500, height: 240, zIndex: 4, animation: { name: 'zoomIn', duration: 700 }, editable: { content: true, fontSize: { type: 'range', min: 150, max: 280 }, position: true } },
      { id: 'mc-month', type: 'text', content: '九月 · 周六', fontFamily: { $t: 'fonts.heading' }, fontSize: 36, fontWeight: '700', color: { $t: 'colors.primary' }, opacity: 0.7, textAlign: 'center', letterSpacing: 6, x: 340, y: 428, width: 400, height: 48, zIndex: 4, editable: { content: true } },
      { id: 'mc-week', type: 'text', content: '日 一 二 三 四 五 六', fontFamily: MONO, fontSize: 26, fontWeight: '600', color: { $t: 'colors.primary' }, opacity: 0.4, textAlign: 'center', letterSpacing: 8, x: 300, y: 512, width: 480, height: 36, zIndex: 4 },
      { id: 'mc-week-hi', type: 'shape', shapeKind: 'circle', x: 712, y: 504, width: 52, height: 52, border: { color: { $t: 'colors.accent' }, width: 3 }, zIndex: 5 },
      { id: 'mc-quote', type: 'text', content: '把日子过成习惯，\n把习惯过成运气。', fontFamily: { $t: 'fonts.heading' }, fontSize: 58, fontWeight: '700', color: { $t: 'colors.primary' }, textAlign: 'center', lineHeight: 1.75, letterSpacing: 4, x: 170, y: 640, width: 740, height: 220, zIndex: 4, animation: { name: 'inkReveal', duration: 1300, delay: 300 }, editable: { content: true, fontSize: { type: 'range', min: 42, max: 74 }, position: true } },
      { id: 'mc-underline', type: 'shape', shapeKind: 'rect', x: 490, y: 892, width: 100, height: 6, fill: { $t: 'colors.accent' }, zIndex: 4, animation: { name: 'slideInLeft', duration: 700, delay: 800 } },
      { id: 'mc-attr', type: 'text', content: '—— 早安 · 连续记录第 262 天', fontFamily: SANS, fontSize: 26, fontWeight: '500', color: { $t: 'colors.primary' }, opacity: 0.5, textAlign: 'center', letterSpacing: 2, x: 290, y: 930, width: 500, height: 36, zIndex: 4, editable: { content: true } },
      { id: 'mc-coffee', type: 'image', src: COFFEE, x: 130, y: 1080, width: 150, height: 142, zIndex: 3, animation: { name: 'float', duration: 5200, iterationCount: 'infinite' } },
      { id: 'mc-gm', type: 'text', content: 'GOOD MORNING', fontFamily: MONO, fontSize: 18, fontWeight: '700', color: { $t: 'colors.primary' }, opacity: 0.35, letterSpacing: 6, x: 700, y: 1196, width: 280, height: 26, textAlign: 'right', zIndex: 4 }
    ]
  }
]

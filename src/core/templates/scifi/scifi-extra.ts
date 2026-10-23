// src/core/templates/scifi/scifi-extra.ts
// 科幻风扩展模板：深空底纹/扫描线/HUD 几何时 + tokens/presets（可一键换配色）
import type { Template } from '@/types/types'
import { seededInt } from '../_fx/common'

const seeded = seededInt

// ---------- 背景生成（透明 SVG，叠在 backgroundColor token 上）----------

function spaceBg(w: number, h: number, stars = 150, starFill = 'rgba(255,255,255,0.55)') {
  let s = ''
  const rnd = seeded(20260918)
  for (let i = 0; i < stars; i++) { const px = rnd() % w, py = rnd() % h, r = rnd() % 100 < 90 ? 1.2 : 2.4; s += `<circle cx="${px}" cy="${py}" r="${r}" fill="${starFill}" opacity="${0.25 + (rnd() % 60) / 100}"/>` }
  for (let y = 0; y <= h; y += 6) s += `<line x1="0" y1="${y}" x2="${w}" y2="${y}" stroke="rgba(255,255,255,0.022)" stroke-width="1"/>`
  return 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '">' + s + '</svg>'
}
function gridFloor(w: number, h: number, gap = 64, stroke = 'rgba(34,211,238,0.10)') {
  let s = ''
  for (let x = 0; x <= w; x += gap) s += `<line x1="${x}" y1="0" x2="${x}" y2="${h}"/>`
  for (let y = 0; y <= h; y += gap) s += `<line x1="0" y1="${y}" x2="${w}" y2="${y}"/>`
  return 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '"><g stroke="' + stroke + '" stroke-width="1">' + s + '</g></svg>'
}
function rays(w: number, h: number, cx: number, cy: number, n = 24, color = 'rgba(220,38,38,0.14)') {
  let s = ''
  const R = Math.max(w, h) * 1.5
  for (let i = 0; i < n; i++) { const a = (i * 2 * Math.PI) / n; s += `<path d="M${cx} ${cy} L${(cx + Math.cos(a) * R).toFixed(1)} ${(cy + Math.sin(a) * R).toFixed(1)} L${(cx + Math.cos(a + Math.PI / n) * R).toFixed(1)} ${(cy + Math.sin(a + Math.PI / n) * R).toFixed(1)} Z" fill="${color}"/>` }
  return 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '">' + s + '</svg>'
}
function hazardStripes(w: number, h: number, band = 52, color = 'rgba(239,68,68,0.10)') {
  return 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '"><defs><pattern id="hz" width="' + band + '" height="' + band + '" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="' + band / 2 + '" height="' + band + '" fill="' + color + '"/></pattern></defs><rect width="' + w + '" height="' + h + '" fill="url(%23hz)"/></svg>'
}
function neuralBg(w: number, h: number, n = 26) {
  const rnd = seeded(777)
  const pts = Array.from({ length: n }, () => [60 + rnd() % (w - 120), 60 + rnd() % (h - 120)] as const)
  let lines = '', dots = ''
  pts.forEach((p, i) => pts.forEach((q, j) => {
    if (j <= i) return
    const d = Math.hypot(p[0] - q[0], p[1] - q[1])
    if (d < Math.min(w, h) * 0.22) lines += `<line x1="${p[0]}" y1="${p[1]}" x2="${q[0]}" y2="${q[1]}" stroke="rgba(232,121,249,0.13)" stroke-width="1.2"/>`
  }))
  pts.forEach(p => { dots += `<circle cx="${p[0]}" cy="${p[1]}" r="3.4" fill="rgba(232,121,249,0.5)"/>` })
  return 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '">' + lines + dots + '</svg>'
}

// ---------- 原创科幻插画（固定配色）----------
const ROCKET = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="220" height="420" viewBox="0 0 220 420"><path d="M110 10 C 150 70, 158 150, 152 260 H68 C 62 150, 70 70, 110 10 Z" fill="%23e5e7eb" stroke="%231f2937" stroke-width="6" stroke-linejoin="round"/><path d="M68 260 L38 330 L76 300 Z" fill="%23dc2626" stroke="%231f2937" stroke-width="5" stroke-linejoin="round"/><path d="M152 260 L182 330 L144 300 Z" fill="%23dc2626" stroke="%231f2937" stroke-width="5" stroke-linejoin="round"/><rect x="90" y="260" width="40" height="52" fill="%23dc2626" stroke="%231f2937" stroke-width="5"/><circle cx="110" cy="150" r="26" fill="%2338bdf8" stroke="%231f2937" stroke-width="6"/><path d="M96 312 C 100 356, 110 380, 110 404 C 110 380, 120 356, 124 312 Z" fill="%23fbbf24" opacity="0.9"/><line x1="110" y1="228" x2="110" y2="252" stroke="%231f2937" stroke-width="5"/></svg>'
const TRI_WARN = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="184" viewBox="0 0 200 184"><path d="M100 12 L192 168 H8 Z" fill="%23fbbf24" stroke="%23111827" stroke-width="9" stroke-linejoin="round"/><rect x="91" y="62" width="18" height="56" rx="8" fill="%23111827"/><circle cx="100" cy="140" r="11" fill="%23111827"/></svg>'
const ANTENNA = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="260" height="300" viewBox="0 0 260 300"><path d="M130 300 V120" stroke="%2394a3b8" stroke-width="8"/><path d="M60 120 A80 80 0 0 1 200 120" fill="none" stroke="%23a3e635" stroke-width="8" stroke-linecap="round"/><path d="M84 96 A56 56 0 0 1 176 96" fill="none" stroke="%23a3e635" stroke-width="6" stroke-linecap="round" opacity="0.7"/><path d="M106 74 A32 32 0 0 1 154 74" fill="none" stroke="%23a3e635" stroke-width="5" stroke-linecap="round" opacity="0.5"/><circle cx="130" cy="120" r="14" fill="%23a3e635"/><path d="M96 300 h68" stroke="%2394a3b8" stroke-width="10" stroke-linecap="round"/></svg>'
const SKYLINE = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="640" viewBox="0 0 1080 640"><g fill="%230b0614" stroke="%2322d3ee" stroke-width="2">' + Array.from({ length: 12 }, (_, i) => { const bw = 60 + (i * 37) % 70, bh = 140 + (i * 97) % 420, bx = i * 90 + (i * 31) % 24; return `<rect x="${bx}" y="${640 - bh}" width="${bw}" height="${bh}"/>` }).join('') + '</g><g>' + Array.from({ length: 12 }, (_, i) => { const bw = 60 + (i * 37) % 70, bh = 140 + (i * 97) % 420, bx = i * 90 + (i * 31) % 24; let s = ''; for (let wy = 640 - bh + 24; wy < 620; wy += 34) for (let wx = bx + 10; wx < bx + bw - 14; wx += 24) s += `<rect x="${wx}" y="${wy}" width="8" height="12" fill="${(wx * wy) % 7 === 0 ? '%23f0abfc' : '%23fde047'}" opacity="0.85"/>`; return s }).join('') + '</g><line x1="0" y1="638" x2="1080" y2="638" stroke="%23f0abfc" stroke-width="4" opacity="0.5"/></svg>'
const SPARK4 = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"><path d="M40 4 L47 33 L76 40 L47 47 L40 76 L33 47 L4 40 L33 33 Z" fill="%23ffffff" opacity="0.9"/></svg>'

// ---------- 可复用字体 ----------
const MONO = 'Consolas, Menlo, "Courier New", monospace'
const TECH = 'Helvetica, Arial, sans-serif'
const SCIFI_COLORS = (labels: [string, string, string], def: { bg: string; primary: string; accent: string }, opts: { bg: string[]; primary: string[]; accent: string[] }) => ({
  bg: { label: labels[0], default: def.bg, options: opts.bg },
  primary: { label: labels[1], default: def.primary, options: opts.primary },
  accent: { label: labels[2], default: def.accent, options: opts.accent }
})

export const scifiExtraTemplates: Template[] = [
  // 1. 星舰 HUD 仪表盘
  {
    id: 'scifi-ship-hud', name: '星舰HUD仪表盘 (16:9)', version: '1.0.0', category: 'scifi', tags: ['scifi', 'hud', 'starship', 'dashboard', '16:9'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="178" height="100" viewBox="0 0 178 100"><rect width="178" height="100" fill="%23050b18"/><g stroke="%2322d3ee" stroke-width="2" fill="none"><path d="M10 10 h20 M10 10 v20 M168 10 h-20 M168 10 v20 M10 90 h20 M10 90 v-20 M168 90 h-20 M168 90 v-20"/><circle cx="89" cy="50" r="24" stroke-dasharray="4 6"/></g><circle cx="120" cy="38" r="9" fill="%237dd3fc"/></svg>',
    tokens: {
      colors: SCIFI_COLORS(['深空', '主色', '仪表'], { bg: '#050B18', primary: '#7DD3FC', accent: '#22D3EE' }, {
        bg: ['#050B18', '#0A0F1E', '#0F172A', '#031210'],
        primary: ['#7DD3FC', '#E0F2FE', '#BAE6FD', '#D9F99D', '#FECDD3'],
        accent: ['#22D3EE', '#38BDF8', '#A3E635', '#FB7185']
      }),
      fonts: { mono: { label: '仪表字体', default: MONO, options: [MONO, TECH] }, heading: { label: '标题字体', default: TECH, options: [TECH, MONO] } }
    },
    presets: [
      { name: '曲率蓝青', colors: { bg: '#050B18', primary: '#7DD3FC', accent: '#22D3EE' } },
      { name: '异星青柠', colors: { bg: '#031210', primary: '#D9F99D', accent: '#A3E635' } },
      { name: '警报绯红', colors: { bg: '#0A0F1E', primary: '#FECDD3', accent: '#FB7185' } },
      { name: '深空素白', colors: { bg: '#0F172A', primary: '#E0F2FE', accent: '#38BDF8' } }
    ],
    canvas: { virtualWidth: 1920, virtualHeight: 1080, defaultWidth: 1920, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' }, backgroundImage: spaceBg(1920, 1080, 170) },
    elements: [
      { id: 'hud-tl-h', type: 'shape', shapeKind: 'line', x: 80, y: 80, width: 150, height: 4, fill: { $t: 'colors.primary' }, zIndex: 4 },
      { id: 'hud-tl-v', type: 'shape', shapeKind: 'rect', x: 80, y: 80, width: 4, height: 150, fill: { $t: 'colors.primary' }, zIndex: 4 },
      { id: 'hud-tr-h', type: 'shape', shapeKind: 'line', x: 1690, y: 80, width: 150, height: 4, fill: { $t: 'colors.primary' }, zIndex: 4 },
      { id: 'hud-tr-v', type: 'shape', shapeKind: 'rect', x: 1836, y: 80, width: 4, height: 150, fill: { $t: 'colors.primary' }, zIndex: 4 },
      { id: 'hud-bl-h', type: 'shape', shapeKind: 'line', x: 80, y: 996, width: 150, height: 4, fill: { $t: 'colors.primary' }, zIndex: 4 },
      { id: 'hud-bl-v', type: 'shape', shapeKind: 'rect', x: 80, y: 850, width: 4, height: 150, fill: { $t: 'colors.primary' }, zIndex: 4 },
      { id: 'hud-br-h', type: 'shape', shapeKind: 'line', x: 1690, y: 996, width: 150, height: 4, fill: { $t: 'colors.primary' }, zIndex: 4 },
      { id: 'hud-br-v', type: 'shape', shapeKind: 'rect', x: 1836, y: 850, width: 4, height: 150, fill: { $t: 'colors.primary' }, zIndex: 4 },
      { id: 'ring-outer', type: 'shape', shapeKind: 'circle', x: 660, y: 280, width: 520, height: 520, border: { color: { $t: 'colors.accent' }, width: 3, style: 'dashed' }, zIndex: 2, animation: { name: 'spinSlow', duration: 24000, iterationCount: 'infinite', easing: 'linear' } },
      { id: 'ring-inner', type: 'shape', shapeKind: 'circle', x: 770, y: 390, width: 300, height: 300, border: { color: { $t: 'colors.primary' }, width: 2 }, opacity: 0.6, zIndex: 2 },
      { id: 'target-planet', type: 'shape', shapeKind: 'circle', x: 838, y: 458, width: 164, height: 164, fill: { $t: 'colors.primary' }, opacity: 0.85, zIndex: 3, animation: { name: 'glow', duration: 3200, iterationCount: 'infinite' } },
      { id: 'target-shadow', type: 'shape', shapeKind: 'circle', x: 900, y: 470, width: 150, height: 150, fill: 'rgba(0,0,0,0.55)', zIndex: 3 },
      { id: 'cross-h', type: 'shape', shapeKind: 'line', x: 620, y: 539, width: 680, height: 2, fill: { $t: 'colors.accent' }, opacity: 0.5, zIndex: 3 },
      { id: 'cross-v', type: 'shape', shapeKind: 'rect', x: 919, y: 240, width: 2, height: 600, fill: { $t: 'colors.accent' }, opacity: 0.5, zIndex: 3 },
      { id: 'title', type: 'text', content: '星舰 · 远征七号', fontFamily: { $t: 'fonts.heading' }, fontSize: 72, fontWeight: '900', color: { $t: 'colors.primary' }, letterSpacing: 6, x: 134, y: 250, width: 640, height: 100, zIndex: 4, animation: { name: 'slideInLeft', duration: 800 }, editable: { content: true, fontSize: { type: 'range', min: 52, max: 92 }, position: true } },
      { id: 'title-en', type: 'text', content: 'ISV EXPEDITION VII · ORBIT SCAN', fontFamily: { $t: 'fonts.mono' }, fontSize: 24, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 4, x: 134, y: 350, width: 660, height: 38, zIndex: 4, editable: { content: true } },
      { id: 'tele-h', type: 'text', content: 'TELEMETRY // 实时遥测', fontFamily: { $t: 'fonts.mono' }, fontSize: 22, fontWeight: '700', color: { $t: 'colors.primary' }, opacity: 0.6, letterSpacing: 2, x: 134, y: 470, width: 400, height: 32, zIndex: 4 },
      { id: 'tele-1', type: 'text', content: 'VELOCITY  ··· 0.42c', fontFamily: { $t: 'fonts.mono' }, fontSize: 26, color: { $t: 'colors.primary' }, x: 134, y: 520, width: 420, height: 38, zIndex: 4, editable: { content: true } },
      { id: 'tele-2', type: 'text', content: 'DISTANCE  ··· 4.2 LY', fontFamily: { $t: 'fonts.mono' }, fontSize: 26, color: { $t: 'colors.primary' }, x: 134, y: 566, width: 420, height: 38, zIndex: 4, editable: { content: true } },
      { id: 'tele-3', type: 'text', content: 'HEADING   ··· TAW 118°', fontFamily: { $t: 'fonts.mono' }, fontSize: 26, color: { $t: 'colors.primary' }, x: 134, y: 612, width: 420, height: 38, zIndex: 4, editable: { content: true } },
      { id: 'tele-4', type: 'text', content: 'CREW      ··· 1,204', fontFamily: { $t: 'fonts.mono' }, fontSize: 26, color: { $t: 'colors.primary' }, x: 134, y: 658, width: 420, height: 38, zIndex: 4, editable: { content: true } },
      { id: 'scan-bar', type: 'shape', shapeKind: 'line', x: 80, y: 780, width: 1760, height: 3, fill: { $t: 'colors.accent' }, opacity: 0.5, zIndex: 4, animation: { name: 'shimmer', duration: 3600, iterationCount: 'infinite' } },
      { id: 'status', type: 'text', content: '● SYSTEMS NOMINAL · 聚变堆输出稳定', fontFamily: { $t: 'fonts.mono' }, fontSize: 26, fontWeight: '700', color: { $t: 'colors.accent' }, x: 134, y: 860, width: 640, height: 38, zIndex: 4, animation: { name: 'blink', duration: 2200, iterationCount: 'infinite' }, editable: { content: true } },
      { id: 'coord', type: 'text', content: 'RA 14h 29m 42.9s / DEC -62° 40′ 46″', fontFamily: { $t: 'fonts.mono' }, fontSize: 24, color: { $t: 'colors.primary' }, opacity: 0.55, textAlign: 'right', x: 1180, y: 880, width: 660, height: 34, zIndex: 4 }
    ]
  },

  // 2. 全息投影发布会
  {
    id: 'scifi-hologram-launch', name: '全息投影发布会 (4:5)', version: '1.0.0', category: 'scifi', tags: ['scifi', 'hologram', 'launch', 'product', '4:5'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="125" viewBox="0 0 100 125"><rect width="100" height="125" fill="%230a0f1e"/><ellipse cx="50" cy="96" rx="30" ry="8" fill="none" stroke="%2338bdf8" stroke-width="2"/><path d="M35 92 L44 40 h12 L65 92" fill="%2338bdf8" opacity="0.25"/><rect x="30" y="20" width="40" height="10" fill="%23e0f2fe"/></svg>',
    tokens: {
      colors: SCIFI_COLORS(['展台', '主色', '全息'], { bg: '#0A0F1E', primary: '#E0F2FE', accent: '#38BDF8' }, {
        bg: ['#0A0F1E', '#020617', '#0F172A', '#111018'],
        primary: ['#E0F2FE', '#F8FAFC', '#CFFAFE', '#EDE9FE'],
        accent: ['#38BDF8', '#22D3EE', '#A78BFA', '#34D399']
      }),
      fonts: { mono: { label: '代码字体', default: MONO, options: [MONO, TECH] }, heading: { label: '标题字体', default: TECH, options: [TECH, MONO] } }
    },
    presets: [
      { name: '发布会蓝', colors: { bg: '#0A0F1E', primary: '#E0F2FE', accent: '#38BDF8' } },
      { name: '量子紫罗兰', colors: { bg: '#111018', primary: '#EDE9FE', accent: '#A78BFA' } },
      { name: '翡翠光域', colors: { bg: '#020617', primary: '#CFFAFE', accent: '#34D399' } },
      { name: '石墨冷光', colors: { bg: '#0F172A', primary: '#F8FAFC', accent: '#22D3EE' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' }, backgroundImage: spaceBg(1080, 1350, 90) },
    elements: [
      { id: 'date-badge', type: 'shape', shapeKind: 'rect', x: 390, y: 90, width: 300, height: 54, border: { color: { $t: 'colors.accent' }, width: 2 }, borderRadius: 27, zIndex: 3 },
      { id: 'date-text', type: 'text', content: '2026.10.24 · 全球直播', fontFamily: { $t: 'fonts.mono' }, fontSize: 24, fontWeight: '700', color: { $t: 'colors.accent' }, textAlign: 'center', x: 390, y: 104, width: 300, height: 30, zIndex: 4, editable: { content: true } },
      { id: 'title', type: 'text', content: '重新定义计算', fontFamily: { $t: 'fonts.heading' }, fontSize: 120, fontWeight: '900', color: { $t: 'colors.primary' }, letterSpacing: 8, textAlign: 'center', x: 90, y: 200, width: 900, height: 150, zIndex: 3, animation: { name: 'fadeInDown', duration: 800 }, editable: { content: true, fontSize: { type: 'range', min: 80, max: 140 }, position: true } },
      { id: 'title-sub', type: 'text', content: 'QUANTUM CORE · 第 9 代全息引擎', fontFamily: { $t: 'fonts.mono' }, fontSize: 28, color: { $t: 'colors.accent' }, letterSpacing: 4, textAlign: 'center', x: 190, y: 356, width: 700, height: 40, zIndex: 3, editable: { content: true } },
      { id: 'holo-ring-1', type: 'shape', shapeKind: 'circle', x: 290, y: 620, width: 500, height: 500, border: { color: { $t: 'colors.accent' }, width: 2, style: 'dashed' }, opacity: 0.5, zIndex: 2, animation: { name: 'ripple', duration: 3200, iterationCount: 'infinite' } },
      { id: 'holo-ring-2', type: 'shape', shapeKind: 'circle', x: 390, y: 720, width: 300, height: 300, border: { color: { $t: 'colors.primary' }, width: 2 }, opacity: 0.35, zIndex: 2, animation: { name: 'ripple', duration: 3200, delay: 800, iterationCount: 'infinite' } },
      { id: 'holo-panel', type: 'shape', shapeKind: 'rect', x: 430, y: 640, width: 220, height: 340, fill: 'rgba(56,189,248,0.14)', border: { color: { $t: 'colors.accent' }, width: 2 }, rotation: -2, zIndex: 3, animation: { name: 'float', duration: 5200, iterationCount: 'infinite' } },
      { id: 'holo-lines', type: 'text', content: '01100101\n11010\n01\n110010\n0110\n10011\n0110', fontFamily: { $t: 'fonts.mono' }, fontSize: 24, color: { $t: 'colors.accent' }, lineHeight: 1.5, rotation: -2, x: 452, y: 664, width: 180, height: 300, zIndex: 4 },
      { id: 'pedestal', type: 'shape', shapeKind: 'rect', x: 240, y: 1040, width: 600, height: 26, fill: { $t: 'colors.accent' }, opacity: 0.8, borderRadius: 13, zIndex: 3, animation: { name: 'glow', duration: 3000, iterationCount: 'infinite' } },
      { id: 'spec-1', group: 'spec-', type: 'shape', shapeKind: 'rect', x: 90, y: 1110, width: 280, height: 130, fill: 'rgba(255,255,255,0.05)', border: { color: 'rgba(255,255,255,0.14)', width: 1 }, borderRadius: 12, zIndex: 2 },
      { id: 'spec-1t', type: 'text', content: '算力\n128 QFLOPS', fontFamily: { $t: 'fonts.mono' }, fontSize: 26, fontWeight: '700', color: { $t: 'colors.primary' }, lineHeight: 1.5, textAlign: 'center', x: 90, y: 1132, width: 280, height: 90, zIndex: 3, editable: { content: true } },
      { id: 'spec-2', group: 'spec-', type: 'shape', shapeKind: 'rect', x: 400, y: 1110, width: 280, height: 130, fill: 'rgba(255,255,255,0.05)', border: { color: 'rgba(255,255,255,0.14)', width: 1 }, borderRadius: 12, zIndex: 2 },
      { id: 'spec-2t', type: 'text', content: '能效\n提升 47×', fontFamily: { $t: 'fonts.mono' }, fontSize: 26, fontWeight: '700', color: { $t: 'colors.primary' }, lineHeight: 1.5, textAlign: 'center', x: 400, y: 1132, width: 280, height: 90, zIndex: 3, editable: { content: true } },
      { id: 'spec-3', group: 'spec-', type: 'shape', shapeKind: 'rect', x: 710, y: 1110, width: 280, height: 130, fill: 'rgba(255,255,255,0.05)', border: { color: 'rgba(255,255,255,0.14)', width: 1 }, borderRadius: 12, zIndex: 2 },
      { id: 'spec-3t', type: 'text', content: '体积\n仅 9 cm³', fontFamily: { $t: 'fonts.mono' }, fontSize: 26, fontWeight: '700', color: { $t: 'colors.primary' }, lineHeight: 1.5, textAlign: 'center', x: 710, y: 1132, width: 280, height: 90, zIndex: 3, editable: { content: true } },
      { id: 'spark-a', group: 'spark-a', type: 'image', src: SPARK4, objectFit: 'contain', x: 150, y: 560, width: 44, height: 44, zIndex: 4, animation: { name: 'twinkle', duration: 2600, iterationCount: 'infinite' } },
      { id: 'spark-b', group: 'spark-b', type: 'image', src: SPARK4, objectFit: 'contain', x: 890, y: 500, width: 56, height: 56, zIndex: 4, animation: { name: 'twinkle', duration: 3200, delay: 700, iterationCount: 'infinite' } },
      { id: 'spark-c', type: 'image', src: SPARK4, objectFit: 'contain', x: 820, y: 900, width: 36, height: 36, zIndex: 4, animation: { name: 'sparkle', duration: 2800, delay: 400, iterationCount: 'infinite' } }
    ]
  },

  // 3. 外星信号接收
  {
    id: 'scifi-signal', name: '外星信号接收 (1:1)', version: '1.0.0', category: 'scifi', tags: ['scifi', 'signal', 'radio', 'alien', '1:1'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23030712"/><g fill="%23a3e635"><rect x="20" y="42" width="6" height="16"/><rect x="32" y="30" width="6" height="40"/><rect x="44" y="20" width="6" height="60"/><rect x="56" y="34" width="6" height="32"/><rect x="68" y="44" width="6" height="12"/></g></svg>',
    tokens: {
      colors: SCIFI_COLORS(['背景', '主色', '信号'], { bg: '#030712', primary: '#F9FAFB', accent: '#A3E635' }, {
        bg: ['#030712', '#0A0F1E', '#050505', '#041B14'],
        primary: ['#F9FAFB', '#E5E7EB', '#D9F99D', '#BAE6FD', '#FEF3C7'],
        accent: ['#A3E635', '#22D3EE', '#FB7185', '#FDE047']
      }),
      fonts: { mono: { label: '终端字体', default: MONO, options: [MONO, TECH] } }
    },
    presets: [
      { name: '青柠截获', colors: { bg: '#030712', primary: '#F9FAFB', accent: '#A3E635' } },
      { name: '深海监听', colors: { bg: '#0A0F1E', primary: '#BAE6FD', accent: '#22D3EE' } },
      { name: '琥珀警报', colors: { bg: '#050505', primary: '#FEF3C7', accent: '#FDE047' } },
      { name: '异星绯红', colors: { bg: '#041B14', primary: '#D9F99D', accent: '#FB7185' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1080, defaultWidth: 1080, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' }, backgroundImage: spaceBg(1080, 1080, 120) },
    elements: [
      { id: 'wave-ring-1', type: 'shape', shapeKind: 'circle', x: 240, y: 240, width: 600, height: 600, border: { color: { $t: 'colors.accent' }, width: 2 }, opacity: 0.35, zIndex: 1, animation: { name: 'ripple', duration: 3600, iterationCount: 'infinite' } },
      { id: 'wave-ring-2', type: 'shape', shapeKind: 'circle', x: 140, y: 140, width: 800, height: 800, border: { color: { $t: 'colors.accent' }, width: 2, style: 'dashed' }, opacity: 0.25, zIndex: 1, animation: { name: 'spinSlow', duration: 30000, iterationCount: 'infinite', easing: 'linear' } },
      { id: 'kicker', type: 'text', content: 'FAST RADIO BURST · 编号 FRB 20260918A', fontFamily: { $t: 'fonts.mono' }, fontSize: 24, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 3, x: 120, y: 120, width: 700, height: 36, zIndex: 4, editable: { content: true } },
      { id: 'title', type: 'text', content: '我们听到了', fontFamily: 'STKaiti, KaiTi, serif', fontSize: 110, fontWeight: '900', color: { $t: 'colors.primary' }, letterSpacing: 10, x: 120, y: 170, width: 840, height: 150, zIndex: 4, animation: { name: 'inkReveal', duration: 1200 }, editable: { content: true, fontSize: { type: 'range', min: 70, max: 130 }, position: true } },
      { id: 'b1', group: 'b', type: 'shape', shapeKind: 'rect', x: 120, y: 480, width: 22, height: 60, fill: { $t: 'colors.accent' }, borderRadius: 11, zIndex: 3, animation: { name: 'pulse', duration: 1400, iterationCount: 'infinite' } },
      { id: 'b2', group: 'b', type: 'shape', shapeKind: 'rect', x: 178, y: 430, width: 22, height: 160, fill: { $t: 'colors.accent' }, borderRadius: 11, zIndex: 3, animation: { name: 'pulse', duration: 1400, delay: 120, iterationCount: 'infinite' } },
      { id: 'b3', group: 'b', type: 'shape', shapeKind: 'rect', x: 236, y: 380, width: 22, height: 260, fill: { $t: 'colors.accent' }, borderRadius: 11, zIndex: 3, animation: { name: 'pulse', duration: 1400, delay: 240, iterationCount: 'infinite' } },
      { id: 'b4', group: 'b', type: 'shape', shapeKind: 'rect', x: 294, y: 450, width: 22, height: 120, fill: { $t: 'colors.accent' }, borderRadius: 11, zIndex: 3, animation: { name: 'pulse', duration: 1400, delay: 360, iterationCount: 'infinite' } },
      { id: 'b5', group: 'b', type: 'shape', shapeKind: 'rect', x: 352, y: 350, width: 22, height: 320, fill: { $t: 'colors.primary' }, borderRadius: 11, zIndex: 3, animation: { name: 'pulse', duration: 1400, delay: 480, iterationCount: 'infinite' } },
      { id: 'b6', group: 'b', type: 'shape', shapeKind: 'rect', x: 410, y: 420, width: 22, height: 180, fill: { $t: 'colors.accent' }, borderRadius: 11, zIndex: 3, animation: { name: 'pulse', duration: 1400, delay: 600, iterationCount: 'infinite' } },
      { id: 'b7', group: 'b', type: 'shape', shapeKind: 'rect', x: 468, y: 380, width: 22, height: 260, fill: { $t: 'colors.accent' }, borderRadius: 11, zIndex: 3, animation: { name: 'pulse', duration: 1400, delay: 720, iterationCount: 'infinite' } },
      { id: 'b8', group: 'b', type: 'shape', shapeKind: 'rect', x: 526, y: 460, width: 22, height: 100, fill: { $t: 'colors.accent' }, borderRadius: 11, zIndex: 3, animation: { name: 'pulse', duration: 1400, delay: 840, iterationCount: 'infinite' } },
      { id: 'b9', group: 'b', type: 'shape', shapeKind: 'rect', x: 584, y: 400, width: 22, height: 220, fill: { $t: 'colors.primary' }, borderRadius: 11, zIndex: 3, animation: { name: 'pulse', duration: 1400, delay: 960, iterationCount: 'infinite' } },
      { id: 'b10', group: 'b', type: 'shape', shapeKind: 'rect', x: 642, y: 450, width: 22, height: 120, fill: { $t: 'colors.accent' }, borderRadius: 11, zIndex: 3, animation: { name: 'pulse', duration: 1400, delay: 1080, iterationCount: 'infinite' } },
      { id: 'b11', group: 'b', type: 'shape', shapeKind: 'rect', x: 700, y: 410, width: 22, height: 200, fill: { $t: 'colors.accent' }, borderRadius: 11, zIndex: 3, animation: { name: 'pulse', duration: 1400, delay: 1200, iterationCount: 'infinite' } },
      { id: 'b12', group: 'b', type: 'shape', shapeKind: 'rect', x: 758, y: 470, width: 22, height: 80, fill: { $t: 'colors.accent' }, borderRadius: 11, zIndex: 3, animation: { name: 'pulse', duration: 1400, delay: 1320, iterationCount: 'infinite' } },
      { id: 'antenna', type: 'image', src: ANTENNA, objectFit: 'contain', x: 820, y: 620, width: 210, height: 240, zIndex: 4 },
      { id: 'detected', type: 'text', content: '■ SIGNAL DETECTED · 置信度 99.7%', fontFamily: { $t: 'fonts.mono' }, fontSize: 30, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 2, x: 120, y: 780, width: 680, height: 42, zIndex: 4, animation: { name: 'blink', duration: 1800, iterationCount: 'infinite' }, editable: { content: true } },
      { id: 'coords', type: 'text', content: '来源坐标：RA 05h 34m 31.94s · DEC +22° 00′ 52.2″\n重复周期：16 天 · 与任意已知天体不吻合', fontFamily: { $t: 'fonts.mono' }, fontSize: 26, color: { $t: 'colors.primary' }, lineHeight: 1.7, opacity: 0.75, x: 120, y: 860, width: 800, height: 100, zIndex: 4, editable: { content: true } },
      { id: 'footer', type: 'text', content: '— 500 米口径球面射电望远镜 · 观测档案 —', fontFamily: { $t: 'fonts.mono' }, fontSize: 22, color: { $t: 'colors.primary' }, opacity: 0.45, textAlign: 'center', x: 190, y: 990, width: 700, height: 32, zIndex: 4 }
    ]
  },

  // 4. 赛博霓虹都市
  {
    id: 'scifi-cyber-city', name: '赛博霓虹都市 (9:16)', version: '1.0.0', category: 'scifi', tags: ['scifi', 'cyberpunk', 'neon', 'city', '9:16'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="178" viewBox="0 0 100 178"><rect width="100" height="178" fill="%230b0614"/><g fill="%230b0614" stroke="%2322d3ee" stroke-width="1"><rect x="10" y="110" width="16" height="60"/><rect x="32" y="92" width="20" height="78"/><rect x="58" y="118" width="14" height="52"/><rect x="76" y="100" width="16" height="70"/></g><g fill="%23fde047"><rect x="36" y="100" width="3" height="4"/><rect x="44" y="112" width="3" height="4"/><rect x="80" y="108" width="3" height="4"/></g><line x1="14" y1="40" x2="70" y2="40" stroke="%23f0abfc" stroke-width="4"/></svg>',
    tokens: {
      colors: SCIFI_COLORS(['夜色', '霓光', '灯管'], { bg: '#0B0614', primary: '#F0ABFC', accent: '#22D3EE' }, {
        bg: ['#0B0614', '#020617', '#0D021A', '#17060B'],
        primary: ['#F0ABFC', '#67E8F9', '#D8B4FE', '#FDBA74'],
        accent: ['#22D3EE', '#F0ABFC', '#A855F7', '#F97316']
      }),
      fonts: { mono: { label: '等宽', default: MONO, options: [MONO, TECH] }, heading: { label: '标题', default: TECH, options: [TECH, MONO, 'STKaiti, KaiTi, serif'] } }
    },
    presets: [
      { name: '霓虹品红', colors: { bg: '#0B0614', primary: '#F0ABFC', accent: '#22D3EE' } },
      { name: '午夜青蓝', colors: { bg: '#020617', primary: '#67E8F9', accent: '#F0ABFC' } },
      { name: '酸性紫', colors: { bg: '#0D021A', primary: '#D8B4FE', accent: '#A855F7' } },
      { name: '熔橙信号', colors: { bg: '#17060B', primary: '#FDBA74', accent: '#F97316' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1920, defaultWidth: 1080, defaultHeight: 1920, backgroundColor: { $t: 'colors.bg' }, backgroundImage: spaceBg(1080, 1920, 130) },
    elements: [
      { id: 'frame', type: 'shape', shapeKind: 'rect', x: 44, y: 44, width: 992, height: 1832, border: { color: { $t: 'colors.primary' }, width: 2, style: 'dashed' }, opacity: 0.35, zIndex: 2 },
      { id: 'kicker', type: 'text', content: 'NEO-CITY 新沪 · 2 0 8 7', fontFamily: { $t: 'fonts.mono' }, fontSize: 28, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 8, textAlign: 'center', x: 140, y: 130, width: 800, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'title', type: 'text', content: '霓虹夜行录', fontFamily: { $t: 'fonts.heading' }, fontSize: 148, fontWeight: '900', color: { $t: 'colors.primary' }, letterSpacing: 14, textAlign: 'center', x: 90, y: 210, width: 900, height: 170, zIndex: 4, animation: { name: 'glow', duration: 4000, iterationCount: 'infinite' }, editable: { content: true, fontSize: { type: 'range', min: 100, max: 170 }, position: true } },
      { id: 'subtitle', type: 'text', content: 'A NIGHT WALK THROUGH THE ELECTRIC RAIN', fontFamily: { $t: 'fonts.mono' }, fontSize: 26, color: { $t: 'colors.primary' }, letterSpacing: 4, opacity: 0.6, textAlign: 'center', x: 140, y: 400, width: 800, height: 38, zIndex: 4, editable: { content: true } },
      { id: 'sign-l', type: 'shape', shapeKind: 'rect', x: 100, y: 520, width: 118, height: 430, fill: 'rgba(240,171,252,0.06)', border: { color: { $t: 'colors.accent' }, width: 2 }, borderRadius: 8, zIndex: 3 },
      { id: 'sign-l-text', type: 'text', content: '電\n脳\n街', fontFamily: { $t: 'fonts.heading' }, fontSize: 62, fontWeight: '700', color: { $t: 'colors.primary' }, lineHeight: 1.25, textAlign: 'center', x: 118, y: 548, width: 82, height: 370, zIndex: 4, animation: { name: 'blink', duration: 3200, iterationCount: 'infinite' } },
      { id: 'sign-r', type: 'shape', shapeKind: 'rect', x: 862, y: 520, width: 118, height: 430, fill: 'rgba(34,211,238,0.06)', border: { color: { $t: 'colors.accent' }, width: 2 }, borderRadius: 8, zIndex: 3 },
      { id: 'sign-r-text', type: 'text', content: '居\n酒\n場', fontFamily: { $t: 'fonts.heading' }, fontSize: 62, fontWeight: '700', color: { $t: 'colors.accent' }, lineHeight: 1.25, textAlign: 'center', x: 880, y: 548, width: 82, height: 370, zIndex: 4 },
      { id: 'scan', type: 'shape', shapeKind: 'line', x: 60, y: 1010, width: 960, height: 3, fill: { $t: 'colors.accent' }, opacity: 0.6, zIndex: 3, animation: { name: 'shimmer', duration: 3000, iterationCount: 'infinite' } },
      { id: 'note', type: 'text', content: '凌晨两点，雨里的 40,211 块广告屏\n同时把影子投在积水路面上', fontFamily: { $t: 'fonts.heading' }, fontSize: 40, color: { $t: 'colors.primary' }, lineHeight: 1.6, textAlign: 'center', x: 170, y: 1060, width: 740, height: 140, zIndex: 4, animation: { name: 'fadeInUp', duration: 900, delay: 300 }, editable: { content: true } },
      { id: 'online', type: 'text', content: '▮ SYSTEM ONLINE · SECTOR-09 仍在营业', fontFamily: { $t: 'fonts.mono' }, fontSize: 24, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 2, textAlign: 'center', x: 190, y: 1230, width: 700, height: 34, zIndex: 5, animation: { name: 'blink', duration: 2200, iterationCount: 'infinite' }, editable: { content: true } },
      { id: 'skyline', type: 'image', src: SKYLINE, objectFit: 'contain', x: 0, y: 1280, width: 1080, height: 640, zIndex: 3, editable: { position: true, size: { type: 'scale', min: 0.7, max: 1.4 } } },
      { id: 'spark-a', group: 'spark-a', type: 'image', src: SPARK4, objectFit: 'contain', x: 250, y: 250, width: 40, height: 40, zIndex: 5, animation: { name: 'twinkle', duration: 2400, iterationCount: 'infinite' } },
      { id: 'spark-b', group: 'spark-b', type: 'image', src: SPARK4, objectFit: 'contain', x: 800, y: 470, width: 30, height: 30, zIndex: 5, animation: { name: 'twinkle', duration: 3100, delay: 500, iterationCount: 'infinite' } },
      { id: 'footer', type: 'text', content: 'SECTION 09 // 深夜采样 · ISO 12800 · f/1.4', fontFamily: { $t: 'fonts.mono' }, fontSize: 22, color: { $t: 'colors.primary' }, opacity: 0.5, textAlign: 'center', x: 190, y: 1806, width: 700, height: 32, zIndex: 6, editable: { content: true } }
    ]
  },

  // 5. 星球勘探档案卡
  {
    id: 'scifi-planet-dossier', name: '星球勘探档案卡 (1:1)', version: '1.0.0', category: 'scifi', tags: ['scifi', 'planet', 'dossier', 'survey', '1:1'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%2304070f"/><circle cx="66" cy="40" r="18" fill="%23fb923c"/><circle cx="72" cy="44" r="16" fill="%2304070f" opacity="0.55"/><ellipse cx="66" cy="40" rx="28" ry="9" fill="none" stroke="%23e2e8f0" stroke-width="1.5" opacity="0.6"/><g stroke="%23e2e8f0" stroke-width="2"><line x1="12" y1="70" x2="52" y2="70"/><line x1="12" y1="78" x2="42" y2="78"/><line x1="12" y1="86" x2="48" y2="86"/></g></svg>',
    tokens: {
      colors: SCIFI_COLORS(['深空', '档案', '星球'], { bg: '#04070F', primary: '#E2E8F0', accent: '#FB923C' }, {
        bg: ['#04070F', '#06121E', '#04120B', '#0D0718'],
        primary: ['#E2E8F0', '#DBEAFE', '#DCFCE7', '#EDE9FE'],
        accent: ['#FB923C', '#38BDF8', '#34D399', '#A78BFA']
      }),
      fonts: { mono: { label: '数据', default: MONO, options: [MONO, TECH] }, heading: { label: '名称', default: TECH, options: [TECH, MONO] } }
    },
    presets: [
      { name: '赭岩勘探', colors: { bg: '#04070F', primary: '#E2E8F0', accent: '#FB923C' } },
      { name: '冰卫勘测', colors: { bg: '#06121E', primary: '#DBEAFE', accent: '#38BDF8' } },
      { name: '苔原取样', colors: { bg: '#04120B', primary: '#DCFCE7', accent: '#34D399' } },
      { name: '紫晶测绘', colors: { bg: '#0D0718', primary: '#EDE9FE', accent: '#A78BFA' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1080, defaultWidth: 1080, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' }, backgroundImage: spaceBg(1080, 1080, 110) },
    elements: [
      { id: 'doc-no', type: 'text', content: 'SURVEY DOSSIER · NO.047', fontFamily: { $t: 'fonts.mono' }, fontSize: 24, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 4, x: 90, y: 86, width: 500, height: 34, zIndex: 4, editable: { content: true } },
      { id: 'doc-line', type: 'shape', shapeKind: 'line', x: 90, y: 134, width: 900, height: 2, fill: { $t: 'colors.primary' }, opacity: 0.3, zIndex: 3 },
      { id: 'title', type: 'text', content: 'Kepler-442b', fontFamily: { $t: 'fonts.heading' }, fontSize: 96, fontWeight: '900', color: { $t: 'colors.primary' }, letterSpacing: 2, x: 90, y: 168, width: 640, height: 120, zIndex: 4, animation: { name: 'slideInLeft', duration: 800 }, editable: { content: true, fontSize: { type: 'range', min: 64, max: 120 }, position: true } },
      { id: 'subtitle', type: 'text', content: '红色黄昏 · 稀薄大气 · 无地表液态水', fontFamily: { $t: 'fonts.mono' }, fontSize: 28, color: { $t: 'colors.primary' }, opacity: 0.7, x: 90, y: 296, width: 600, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'orbit', type: 'shape', shapeKind: 'circle', x: 552, y: 330, width: 470, height: 470, border: { color: { $t: 'colors.primary' }, width: 2, style: 'dashed' }, opacity: 0.4, zIndex: 2, animation: { name: 'spinSlow', duration: 30000, iterationCount: 'infinite', easing: 'linear' } },
      { id: 'planet', type: 'shape', shapeKind: 'circle', x: 628, y: 406, width: 318, height: 318, fill: { $t: 'colors.accent' }, zIndex: 3, animation: { name: 'glow', duration: 4200, iterationCount: 'infinite' } },
      { id: 'planet-shadow', type: 'shape', shapeKind: 'circle', x: 700, y: 424, width: 300, height: 300, fill: 'rgba(0,0,0,0.62)', zIndex: 3 },
      { id: 'moon', type: 'shape', shapeKind: 'circle', x: 996, y: 546, width: 26, height: 26, fill: { $t: 'colors.primary' }, opacity: 0.85, zIndex: 4, animation: { name: 'float', duration: 5600, iterationCount: 'infinite' } },
      { id: 'idx-h', type: 'text', content: 'PLANETARY INDEX // 基础参数', fontFamily: { $t: 'fonts.mono' }, fontSize: 22, fontWeight: '700', color: { $t: 'colors.primary' }, opacity: 0.5, letterSpacing: 2, x: 90, y: 600, width: 420, height: 32, zIndex: 4 },
      { id: 'row-1', type: 'text', content: '直径   ··· 1.34 × 地球', fontFamily: { $t: 'fonts.mono' }, fontSize: 30, color: { $t: 'colors.primary' }, x: 90, y: 652, width: 460, height: 44, zIndex: 4, editable: { content: true } },
      { id: 'row-2', type: 'text', content: '重力   ··· 1.28 g', fontFamily: { $t: 'fonts.mono' }, fontSize: 30, color: { $t: 'colors.primary' }, x: 90, y: 706, width: 460, height: 44, zIndex: 4, editable: { content: true } },
      { id: 'row-3', type: 'text', content: '均温   ··· -38 °C', fontFamily: { $t: 'fonts.mono' }, fontSize: 30, color: { $t: 'colors.primary' }, x: 90, y: 760, width: 460, height: 44, zIndex: 4, editable: { content: true } },
      { id: 'row-4', type: 'text', content: '大气   ··· CO₂ 95% · N₂ 4%', fontFamily: { $t: 'fonts.mono' }, fontSize: 30, color: { $t: 'colors.primary' }, x: 90, y: 814, width: 480, height: 44, zIndex: 4, editable: { content: true } },
      { id: 'scan', type: 'shape', shapeKind: 'line', x: 90, y: 890, width: 460, height: 3, fill: { $t: 'colors.accent' }, opacity: 0.6, zIndex: 3, animation: { name: 'shimmer', duration: 2800, iterationCount: 'infinite' } },
      { id: 'verdict', type: 'text', content: '勘探结论：具备密封穹顶定居条件（评级 B+）', fontFamily: { $t: 'fonts.heading' }, fontSize: 32, fontWeight: '700', color: { $t: 'colors.accent' }, x: 90, y: 916, width: 760, height: 44, zIndex: 4, animation: { name: 'fadeInUp', duration: 900, delay: 500 }, editable: { content: true } },
      { id: 'footer', type: 'text', content: '— 第七勘探舰队 · 自动归档 · 未经载人复核 —', fontFamily: { $t: 'fonts.mono' }, fontSize: 22, color: { $t: 'colors.primary' }, opacity: 0.45, textAlign: 'center', x: 190, y: 990, width: 700, height: 32, zIndex: 4 }
    ]
  },

  // 6. 时空虫洞漩涡
  {
    id: 'scifi-wormhole', name: '时空虫洞漩涡 (9:16)', version: '1.0.0', category: 'scifi', tags: ['scifi', 'wormhole', 'space', 'portal', '9:16'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="178" viewBox="0 0 100 178"><rect width="100" height="178" fill="%23020617"/><circle cx="50" cy="80" r="34" fill="none" stroke="%23818cf8" stroke-width="2" opacity="0.5"/><circle cx="50" cy="80" r="22" fill="none" stroke="%23c4b5fd" stroke-width="1.5" stroke-dasharray="3 5"/><circle cx="50" cy="80" r="10" fill="%23000" stroke="%23c4b5fd" stroke-width="1.5"/><g fill="%23c4b5fd"><rect x="22" y="132" width="56" height="3"/><rect x="30" y="142" width="40" height="3"/></g></svg>',
    tokens: {
      colors: SCIFI_COLORS(['视界外', '光尘', '涡环'], { bg: '#020617', primary: '#C4B5FD', accent: '#818CF8' }, {
        bg: ['#020617', '#031210', '#160507', '#0D021A'],
        primary: ['#C4B5FD', '#93C5FD', '#99F6E4', '#FECACA'],
        accent: ['#818CF8', '#3B82F6', '#14B8A6', '#EF4444']
      }),
      fonts: { mono: { label: '读数', default: MONO, options: [MONO, TECH] }, heading: { label: '标题', default: TECH, options: [TECH, 'STKaiti, KaiTi, serif'] } }
    },
    presets: [
      { name: '紫涡', colors: { bg: '#020617', primary: '#C4B5FD', accent: '#818CF8' } },
      { name: '蓝移', colors: { bg: '#020617', primary: '#93C5FD', accent: '#3B82F6' } },
      { name: '青洞', colors: { bg: '#031210', primary: '#99F6E4', accent: '#14B8A6' } },
      { name: '赤环', colors: { bg: '#160507', primary: '#FECACA', accent: '#EF4444' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1920, defaultWidth: 1080, defaultHeight: 1920, backgroundColor: { $t: 'colors.bg' }, backgroundImage: spaceBg(1080, 1920, 150) },
    elements: [
      { id: 'ring-1', group: 'ring-', type: 'shape', shapeKind: 'circle', x: 90, y: 350, width: 900, height: 900, border: { color: { $t: 'colors.accent' }, width: 2, style: 'dashed' }, opacity: 0.35, zIndex: 1, animation: { name: 'spinSlow', duration: 40000, iterationCount: 'infinite', easing: 'linear' } },
      { id: 'ring-2', group: 'ring-', type: 'shape', shapeKind: 'circle', x: 190, y: 450, width: 700, height: 700, border: { color: { $t: 'colors.primary' }, width: 3 }, opacity: 0.3, zIndex: 1, animation: { name: 'ripple', duration: 4800, iterationCount: 'infinite' } },
      { id: 'ring-3', group: 'ring-', type: 'shape', shapeKind: 'circle', x: 280, y: 540, width: 520, height: 520, border: { color: { $t: 'colors.accent' }, width: 3, style: 'dashed' }, opacity: 0.55, zIndex: 2, animation: { name: 'spinSlow', duration: 26000, iterationCount: 'infinite' } },
      { id: 'ring-4', group: 'ring-', type: 'shape', shapeKind: 'circle', x: 360, y: 620, width: 360, height: 360, border: { color: { $t: 'colors.primary' }, width: 2 }, opacity: 0.5, zIndex: 2 },
      { id: 'ring-5', group: 'ring-', type: 'shape', shapeKind: 'circle', x: 430, y: 690, width: 220, height: 220, border: { color: { $t: 'colors.accent' }, width: 4 }, opacity: 0.8, zIndex: 2, animation: { name: 'pulse', duration: 3200, iterationCount: 'infinite' } },
      { id: 'throat', type: 'shape', shapeKind: 'circle', x: 460, y: 720, width: 160, height: 160, fill: '#000000', border: { color: { $t: 'colors.primary' }, width: 3 }, zIndex: 3, animation: { name: 'glow', duration: 4400, iterationCount: 'infinite' } },
      { id: 'spark-a', group: 'spark-a', type: 'image', src: SPARK4, objectFit: 'contain', x: 180, y: 300, width: 44, height: 44, zIndex: 4, animation: { name: 'twinkle', duration: 2600, iterationCount: 'infinite' } },
      { id: 'spark-b', group: 'spark-b', type: 'image', src: SPARK4, objectFit: 'contain', x: 860, y: 640, width: 34, height: 34, zIndex: 4, animation: { name: 'twinkle', duration: 3400, delay: 600, iterationCount: 'infinite' } },
      { id: 'spark-c', type: 'image', src: SPARK4, objectFit: 'contain', x: 760, y: 220, width: 26, height: 26, zIndex: 4, animation: { name: 'twinkle', duration: 2200, delay: 1100, iterationCount: 'infinite' } },
      { id: 'kicker', type: 'text', content: 'TRANSIT LOG · 视界历 2149.6', fontFamily: { $t: 'fonts.mono' }, fontSize: 28, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 6, textAlign: 'center', x: 190, y: 156, width: 700, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'title', type: 'text', content: '穿越虫洞', fontFamily: { $t: 'fonts.heading' }, fontSize: 136, fontWeight: '900', color: { $t: 'colors.primary' }, letterSpacing: 18, textAlign: 'center', x: 90, y: 1290, width: 900, height: 160, zIndex: 4, animation: { name: 'rise', duration: 1200 }, editable: { content: true, fontSize: { type: 'range', min: 96, max: 160 }, position: true } },
      { id: 'subtitle', type: 'text', content: '爱因斯坦-罗森桥 · 喉部半径 4.2 km · 双向稳定', fontFamily: { $t: 'fonts.mono' }, fontSize: 28, color: { $t: 'colors.primary' }, opacity: 0.7, textAlign: 'center', x: 140, y: 1466, width: 800, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'chip-1', group: 'chip-', type: 'shape', shapeKind: 'rect', x: 118, y: 1560, width: 260, height: 92, border: { color: { $t: 'colors.primary' }, width: 2 }, borderRadius: 12, opacity: 0.55, zIndex: 3, animation: { name: 'zoomIn', duration: 500, delay: 300 } },
      { id: 'chip-1t', type: 'text', content: '时间膨胀\n6.7 ×', fontFamily: { $t: 'fonts.mono' }, fontSize: 26, fontWeight: '700', color: { $t: 'colors.primary' }, lineHeight: 1.4, textAlign: 'center', x: 118, y: 1574, width: 260, height: 66, zIndex: 4, editable: { content: true } },
      { id: 'chip-2', group: 'chip-', type: 'shape', shapeKind: 'rect', x: 410, y: 1560, width: 260, height: 92, border: { color: { $t: 'colors.primary' }, width: 2 }, borderRadius: 12, opacity: 0.55, zIndex: 3, animation: { name: 'zoomIn', duration: 500, delay: 500 } },
      { id: 'chip-2t', type: 'text', content: '潮汐力\n0.03 g', fontFamily: { $t: 'fonts.mono' }, fontSize: 26, fontWeight: '700', color: { $t: 'colors.primary' }, lineHeight: 1.4, textAlign: 'center', x: 410, y: 1574, width: 260, height: 66, zIndex: 4, editable: { content: true } },
      { id: 'chip-3', group: 'chip-', type: 'shape', shapeKind: 'rect', x: 702, y: 1560, width: 260, height: 92, border: { color: { $t: 'colors.primary' }, width: 2 }, borderRadius: 12, opacity: 0.55, zIndex: 3, animation: { name: 'zoomIn', duration: 500, delay: 700 } },
      { id: 'chip-3t', type: 'text', content: '霍金辐射\n< 阈值', fontFamily: { $t: 'fonts.mono' }, fontSize: 26, fontWeight: '700', color: { $t: 'colors.primary' }, lineHeight: 1.4, textAlign: 'center', x: 702, y: 1574, width: 260, height: 66, zIndex: 4, editable: { content: true } },
      { id: 'footer', type: 'text', content: 'KERR 度规 · 可穿越性评估：通过 · 请勿逆向航行', fontFamily: { $t: 'fonts.mono' }, fontSize: 22, color: { $t: 'colors.primary' }, opacity: 0.45, textAlign: 'center', x: 190, y: 1760, width: 700, height: 32, zIndex: 4 }
    ]
  },

  // 7. 复古太空海报 Pulp Sci-Fi
  {
    id: 'scifi-retro-pulp', name: '复古太空海报 (4:5)', version: '1.0.0', category: 'scifi', tags: ['scifi', 'retro', 'pulp', 'poster', '4:5'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="142" height="178" viewBox="0 0 142 178"><rect width="142" height="178" fill="%23f3e3c0"/><g stroke="%23b91c1c" stroke-width="1" opacity="0.3"><line x1="71" y1="60" x2="0" y2="0"/><line x1="71" y1="60" x2="142" y2="10"/><line x1="71" y1="60" x2="10" y2="178"/><line x1="71" y1="60" x2="140" y2="160"/></g><path d="M71 78 C 80 92,82 110,80 130 H62 C 60 110,62 92,71 78 Z" fill="%23e5e7eb" stroke="%231f2937" stroke-width="2"/><circle cx="71" cy="102" r="5" fill="%2338bdf8" stroke="%231f2937" stroke-width="1.5"/><line x1="20" y1="30" x2="122" y2="30" stroke="%231e3a8a" stroke-width="4"/></svg>',
    tokens: {
      colors: SCIFI_COLORS(['旧纸', '油墨红', '藏青'], { bg: '#F3E3C0', primary: '#B91C1C', accent: '#1E3A8A' }, {
        bg: ['#F3E3C0', '#E5E7EB', '#FDE8C8', '#1F2937'],
        primary: ['#B91C1C', '#1F2937', '#C2410C', '#F59E0B'],
        accent: ['#1E3A8A', '#B91C1C', '#7C2D12', '#EF4444']
      }),
      fonts: { mono: { label: '小字', default: 'Georgia, "Times New Roman", serif', options: ['Georgia, "Times New Roman", serif', MONO, TECH] }, heading: { label: '刊头', default: 'Impact, "Arial Black", sans-serif', options: ['Impact, "Arial Black", sans-serif', TECH, 'STKaiti, KaiTi, serif'] } }
    },
    presets: [
      { name: '黄金时代', colors: { bg: '#F3E3C0', primary: '#B91C1C', accent: '#1E3A8A' } },
      { name: '白银时代', colors: { bg: '#E5E7EB', primary: '#1F2937', accent: '#B91C1C' } },
      { name: '橙汁冒险', colors: { bg: '#FDE8C8', primary: '#C2410C', accent: '#7C2D12' } },
      { name: '午夜特刊', colors: { bg: '#1F2937', primary: '#F59E0B', accent: '#EF4444' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' }, backgroundImage: rays(1080, 1350, 540, 430, 28, 'rgba(185,28,28,0.10)') },
    elements: [
      { id: 'mast-top', type: 'shape', shapeKind: 'line', x: 90, y: 96, width: 900, height: 4, fill: { $t: 'colors.accent' }, zIndex: 3 },
      { id: 'masthead', type: 'text', content: 'ASTOUNDING TALES OF THE SPACE AGE · 星尘故事会 VOL.12', fontFamily: { $t: 'fonts.mono' }, fontSize: 24, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 2, textAlign: 'center', x: 90, y: 108, width: 900, height: 36, zIndex: 4, editable: { content: true } },
      { id: 'mast-bot', type: 'shape', shapeKind: 'line', x: 90, y: 156, width: 900, height: 4, fill: { $t: 'colors.accent' }, zIndex: 3 },
      { id: 'price', type: 'shape', shapeKind: 'rect', x: 872, y: 186, width: 118, height: 60, fill: 'rgba(30,58,138,0.08)', border: { color: { $t: 'colors.accent' }, width: 2 }, zIndex: 4 },
      { id: 'price-t', type: 'text', content: '25¢', fontFamily: { $t: 'fonts.mono' }, fontSize: 30, fontWeight: '700', color: { $t: 'colors.accent' }, textAlign: 'center', x: 872, y: 198, width: 118, height: 38, zIndex: 5 },
      { id: 'title-shadow', type: 'text', content: '飞向仙女座', fontFamily: { $t: 'fonts.heading' }, fontSize: 172, fontWeight: '900', color: 'rgba(30,58,138,0.30)', letterSpacing: 10, textAlign: 'center', x: 88, y: 236, width: 916, height: 190, zIndex: 3 },
      { id: 'title', type: 'text', content: '飞向仙女座', fontFamily: { $t: 'fonts.heading' }, fontSize: 172, fontWeight: '900', color: { $t: 'colors.primary' }, letterSpacing: 10, textAlign: 'center', x: 80, y: 228, width: 916, height: 190, zIndex: 4, animation: { name: 'zoomIn', duration: 900 }, editable: { content: true, fontSize: { type: 'range', min: 120, max: 190 }, position: true } },
      { id: 'tagline', type: 'text', content: '—— 一个被无线电广播预言的世纪 ——', fontFamily: { $t: 'fonts.mono' }, fontSize: 34, color: { $t: 'colors.accent' }, textAlign: 'center', x: 190, y: 436, width: 700, height: 48, zIndex: 4, editable: { content: true } },
      { id: 'orbit', type: 'shape', shapeKind: 'circle', x: 108, y: 200, width: 130, height: 130, border: { color: { $t: 'colors.accent' }, width: 2, style: 'dashed' }, opacity: 0.55, zIndex: 2, animation: { name: 'spinSlow', duration: 26000, iterationCount: 'infinite', easing: 'linear' } },
      { id: 'moon-s', type: 'shape', shapeKind: 'circle', x: 150, y: 242, width: 46, height: 46, fill: { $t: 'colors.accent' }, opacity: 0.8, zIndex: 3 },
      { id: 'rocket', type: 'image', src: ROCKET, objectFit: 'contain', x: 430, y: 540, width: 220, height: 420, zIndex: 4, animation: { name: 'float', duration: 5600, iterationCount: 'infinite' }, editable: { src: { type: 'upload' }, position: true, size: { type: 'scale', min: 0.6, max: 1.6 } } },
      { id: 'star-dot-1', group: 'star-dot-', type: 'shape', shapeKind: 'circle', x: 250, y: 640, width: 12, height: 12, fill: { $t: 'colors.primary' }, opacity: 0.6, zIndex: 3, animation: { name: 'twinkle', duration: 2800, iterationCount: 'infinite' } },
      { id: 'star-dot-2', group: 'star-dot-', type: 'shape', shapeKind: 'circle', x: 820, y: 560, width: 10, height: 10, fill: { $t: 'colors.accent' }, opacity: 0.6, zIndex: 3, animation: { name: 'twinkle', duration: 3600, delay: 700, iterationCount: 'infinite' } },
      { id: 'star-dot-3', group: 'star-dot-', type: 'shape', shapeKind: 'circle', x: 700, y: 940, width: 14, height: 14, fill: { $t: 'colors.primary' }, opacity: 0.5, zIndex: 3, animation: { name: 'twinkle', duration: 2400, delay: 1200, iterationCount: 'infinite' } },
      { id: 'horizon', type: 'shape', shapeKind: 'rect', x: 0, y: 1150, width: 1080, height: 200, fill: 'rgba(30,58,138,0.14)', zIndex: 2 },
      { id: 'horizon-line', type: 'shape', shapeKind: 'line', x: 0, y: 1150, width: 1080, height: 3, fill: { $t: 'colors.accent' }, opacity: 0.7, zIndex: 3 },
      { id: 'blurb', type: 'text', content: '本期：《火星电报》《硅基之梦》《绕月第七圈》', fontFamily: { $t: 'fonts.mono' }, fontSize: 32, fontWeight: '700', color: { $t: 'colors.primary' }, textAlign: 'center', x: 140, y: 1188, width: 800, height: 44, zIndex: 4, animation: { name: 'fadeInUp', duration: 900, delay: 400 }, editable: { content: true } },
      { id: 'footer', type: 'text', content: 'Illustration · 手绘星际 · 1 9 5 4 · 全宇宙售价 25 美分', fontFamily: { $t: 'fonts.mono' }, fontSize: 24, color: { $t: 'colors.accent' }, opacity: 0.65, textAlign: 'center', x: 190, y: 1256, width: 700, height: 36, zIndex: 4, editable: { content: true } }
    ]
  },

  // 8. AI 神经网格
  {
    id: 'scifi-neural-grid', name: 'AI神经网格 (1:1)', version: '1.0.0', category: 'scifi', tags: ['scifi', 'ai', 'neural', 'network', '1:1'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%230d021a"/><g stroke="%23e9d5ff" stroke-width="1" opacity="0.5"><line x1="50" y1="50" x2="20" y2="24"/><line x1="50" y1="50" x2="82" y2="30"/><line x1="50" y1="50" x2="26" y2="80"/><line x1="50" y1="50" x2="78" y2="76"/></g><circle cx="50" cy="50" r="12" fill="%23a855f7"/><g fill="%23e9d5ff"><circle cx="20" cy="24" r="4"/><circle cx="82" cy="30" r="4"/><circle cx="26" cy="80" r="4"/><circle cx="78" cy="76" r="4"/></g></svg>',
    tokens: {
      colors: SCIFI_COLORS(['暗房', '信号', '核'], { bg: '#0D021A', primary: '#E9D5FF', accent: '#A855F7' }, {
        bg: ['#0D021A', '#020617', '#031210', '#150507'],
        primary: ['#E9D5FF', '#BAE6FD', '#BBF7D0', '#FECDD3'],
        accent: ['#A855F7', '#6366F1', '#10B981', '#F43F5E']
      }),
      fonts: { mono: { label: '指标', default: MONO, options: [MONO, TECH] }, heading: { label: '标题', default: TECH, options: [TECH, MONO] } }
    },
    presets: [
      { name: '紫罗兰核', colors: { bg: '#0D021A', primary: '#E9D5FF', accent: '#A855F7' } },
      { name: '靛蓝深潜', colors: { bg: '#020617', primary: '#BAE6FD', accent: '#6366F1' } },
      { name: '翡翠推理', colors: { bg: '#031210', primary: '#BBF7D0', accent: '#10B981' } },
      { name: '品红幻觉', colors: { bg: '#150507', primary: '#FECDD3', accent: '#F43F5E' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1080, defaultWidth: 1080, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' }, backgroundImage: neuralBg(1080, 1080, 30) },
    elements: [
      { id: 'kicker', type: 'text', content: 'MODEL POSTMORTEM · 第 IX 层解剖', fontFamily: { $t: 'fonts.mono' }, fontSize: 26, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 6, x: 90, y: 90, width: 740, height: 42, zIndex: 4, editable: { content: true } },
      { id: 'title', type: 'text', content: '涌现从何而来', fontFamily: { $t: 'fonts.heading' }, fontSize: 92, fontWeight: '900', color: { $t: 'colors.primary' }, letterSpacing: 6, x: 90, y: 140, width: 760, height: 120, zIndex: 4, animation: { name: 'inkReveal', duration: 1100 }, editable: { content: true, fontSize: { type: 'range', min: 64, max: 110 }, position: true } },
      { id: 'halo', type: 'shape', shapeKind: 'circle', x: 340, y: 390, width: 400, height: 400, border: { color: { $t: 'colors.accent' }, width: 2, style: 'dashed' }, opacity: 0.5, zIndex: 2, animation: { name: 'spinSlow', duration: 32000, iterationCount: 'infinite', easing: 'linear' } },
      { id: 'ripple-ring', type: 'shape', shapeKind: 'circle', x: 410, y: 460, width: 260, height: 260, border: { color: { $t: 'colors.primary' }, width: 2 }, opacity: 0.4, zIndex: 2, animation: { name: 'ripple', duration: 4200, iterationCount: 'infinite' } },
      { id: 'core', type: 'shape', shapeKind: 'circle', x: 480, y: 530, width: 120, height: 120, fill: { $t: 'colors.accent' }, zIndex: 3, animation: { name: 'glow', duration: 3000, iterationCount: 'infinite' } },
      { id: 'core-t', type: 'text', content: 'LATENT\nSPACE', fontFamily: { $t: 'fonts.mono' }, fontSize: 20, fontWeight: '700', color: { $t: 'colors.bg' }, lineHeight: 1.3, textAlign: 'center', x: 480, y: 560, width: 120, height: 60, zIndex: 4 },
      { id: 'link-1', type: 'shape', shapeKind: 'line', x: 240, y: 470, width: 260, height: 3, fill: { $t: 'colors.primary' }, opacity: 0.35, rotation: 24, zIndex: 2 },
      { id: 'link-2', type: 'shape', shapeKind: 'line', x: 580, y: 600, width: 280, height: 3, fill: { $t: 'colors.primary' }, opacity: 0.35, rotation: -18, zIndex: 2 },
      { id: 'node-1', group: 'node-', type: 'shape', shapeKind: 'circle', x: 196, y: 400, width: 56, height: 56, fill: { $t: 'colors.primary' }, opacity: 0.9, zIndex: 3, animation: { name: 'zoomIn', duration: 450, delay: 300 } },
      { id: 'node-2', group: 'node-', type: 'shape', shapeKind: 'circle', x: 828, y: 486, width: 56, height: 56, fill: { $t: 'colors.primary' }, opacity: 0.9, zIndex: 3, animation: { name: 'zoomIn', duration: 450, delay: 500 } },
      { id: 'node-3', group: 'node-', type: 'shape', shapeKind: 'circle', x: 320, y: 800, width: 48, height: 48, fill: { $t: 'colors.accent' }, opacity: 0.85, zIndex: 3, animation: { name: 'zoomIn', duration: 450, delay: 700 } },
      { id: 'node-4', group: 'node-', type: 'shape', shapeKind: 'circle', x: 700, y: 830, width: 48, height: 48, fill: { $t: 'colors.accent' }, opacity: 0.85, zIndex: 3, animation: { name: 'zoomIn', duration: 450, delay: 900 } },
      { id: 'm-h', type: 'text', content: 'METRICS // 体检单', fontFamily: { $t: 'fonts.mono' }, fontSize: 22, fontWeight: '700', color: { $t: 'colors.primary' }, opacity: 0.5, letterSpacing: 2, x: 90, y: 890, width: 400, height: 32, zIndex: 4 },
      { id: 'm-1', type: 'text', content: '参数量 1.75T · 上下文 1M', fontFamily: { $t: 'fonts.mono' }, fontSize: 28, color: { $t: 'colors.primary' }, x: 90, y: 932, width: 560, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'm-2', type: 'text', content: '幻觉率 0.4% · 训练 3.2e25 FLOPs', fontFamily: { $t: 'fonts.mono' }, fontSize: 28, color: { $t: 'colors.primary' }, x: 90, y: 978, width: 620, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'spark-a', group: 'spark-a', type: 'image', src: SPARK4, objectFit: 'contain', x: 890, y: 150, width: 40, height: 40, zIndex: 4, animation: { name: 'twinkle', duration: 2800, iterationCount: 'infinite' } },
      { id: 'spark-b', group: 'spark-b', type: 'image', src: SPARK4, objectFit: 'contain', x: 960, y: 700, width: 28, height: 28, zIndex: 4, animation: { name: 'twinkle', duration: 3600, delay: 800, iterationCount: 'infinite' } },
      { id: 'blink-tag', type: 'text', content: '▮ THINKING… 权重仍在做梦', fontFamily: { $t: 'fonts.mono' }, fontSize: 24, fontWeight: '700', color: { $t: 'colors.accent' }, textAlign: 'right', x: 610, y: 984, width: 380, height: 34, zIndex: 4, animation: { name: 'blink', duration: 2000, iterationCount: 'infinite' }, editable: { content: true } }
    ]
  },

  // 9. 深空警告禁区
  {
    id: 'scifi-space-hazard', name: '深空警告禁区 (16:9)', version: '1.0.0', category: 'scifi', tags: ['scifi', 'hazard', 'warning', 'restricted', '16:9'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="178" height="100" viewBox="0 0 178 100"><rect width="178" height="100" fill="%230a0a0a"/><g stroke="%23ef4444" stroke-width="1" opacity="0.25"><line x1="0" y1="20" x2="20" y2="0"/><line x1="0" y1="60" x2="60" y2="0"/><line x1="0" y1="100" x2="100" y2="0"/><line x1="40" y1="100" x2="140" y2="0"/><line x1="100" y1="100" x2="178" y2="22"/><line x1="160" y1="100" x2="178" y2="82"/></g><rect x="14" y="14" width="150" height="72" fill="none" stroke="%23ef4444" stroke-width="2" stroke-dasharray="6 6"/><path d="M89 30 L108 62 H70 Z" fill="%23fbbf24"/><rect x="86" y="40" width="5" height="12" fill="%23111827"/></svg>',
    tokens: {
      colors: SCIFI_COLORS(['漆黑', '警示文', '危险'], { bg: '#0A0A0A', primary: '#FCA5A5', accent: '#EF4444' }, {
        bg: ['#0A0A0A', '#0B1120', '#150A05', '#04120B'],
        primary: ['#FCA5A5', '#FDE68A', '#FDBA74', '#A7F3D0'],
        accent: ['#EF4444', '#F59E0B', '#F97316', '#10B981']
      }),
      fonts: { mono: { label: '终端', default: MONO, options: [MONO, TECH] }, heading: { label: '标题', default: TECH, options: [TECH, MONO] } }
    },
    presets: [
      { name: '赤色警戒', colors: { bg: '#0A0A0A', primary: '#FCA5A5', accent: '#EF4444' } },
      { name: '琥珀辐射', colors: { bg: '#0B1120', primary: '#FDE68A', accent: '#F59E0B' } },
      { name: '熔岩封锁', colors: { bg: '#150A05', primary: '#FDBA74', accent: '#F97316' } },
      { name: '生绿隔离', colors: { bg: '#04120B', primary: '#A7F3D0', accent: '#10B981' } }
    ],
    canvas: { virtualWidth: 1920, virtualHeight: 1080, defaultWidth: 1920, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' }, backgroundImage: hazardStripes(1920, 1080, 60, 'rgba(239,68,68,0.09)') },
    elements: [
      { id: 'warn-frame', type: 'shape', shapeKind: 'rect', x: 120, y: 100, width: 1680, height: 880, border: { color: { $t: 'colors.accent' }, width: 6, style: 'dashed' }, opacity: 0.85, zIndex: 4, animation: { name: 'pulse', duration: 2400, iterationCount: 'infinite' } },
      { id: 'inner-frame', type: 'shape', shapeKind: 'rect', x: 156, y: 136, width: 1608, height: 808, border: { color: { $t: 'colors.primary' }, width: 2 }, opacity: 0.3, zIndex: 3 },
      { id: 'tri', type: 'image', src: TRI_WARN, objectFit: 'contain', x: 250, y: 300, width: 260, height: 240, zIndex: 4, animation: { name: 'heartbeat', duration: 1800, iterationCount: 'infinite' } },
      { id: 'restricted', type: 'text', content: 'RESTRICTED AREA', fontFamily: { $t: 'fonts.heading' }, fontSize: 40, fontWeight: '900', color: { $t: 'colors.accent' }, letterSpacing: 18, x: 640, y: 226, width: 1000, height: 56, zIndex: 4, animation: { name: 'shimmer', duration: 3000, iterationCount: 'infinite' }, editable: { content: true } },
      { id: 'title', type: 'text', content: '禁区 · 卡戎轨道', fontFamily: { $t: 'fonts.heading' }, fontSize: 128, fontWeight: '900', color: { $t: 'colors.primary' }, letterSpacing: 8, x: 640, y: 300, width: 1100, height: 160, zIndex: 4, animation: { name: 'slideInRight', duration: 800 }, editable: { content: true, fontSize: { type: 'range', min: 90, max: 150 }, position: true } },
      { id: 'subtitle', type: 'text', content: 'CHARON ORBIT KMZ-7 · 引力碎片带 · 平均每年吞掉 1.4 艘货船', fontFamily: { $t: 'fonts.mono' }, fontSize: 30, color: { $t: 'colors.primary' }, opacity: 0.75, x: 640, y: 478, width: 1100, height: 44, zIndex: 4, editable: { content: true } },
      { id: 'term-h', type: 'text', content: '▮ INBOUND TRANSMISSION // 拦截公告', fontFamily: { $t: 'fonts.mono' }, fontSize: 24, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 2, x: 640, y: 570, width: 640, height: 34, zIndex: 4 },
      { id: 'term-1', type: 'text', content: '> 所有飞船立即停止接近，改拉格朗日航线。', fontFamily: { $t: 'fonts.mono' }, fontSize: 28, color: { $t: 'colors.primary' }, x: 640, y: 618, width: 1120, height: 40, zIndex: 4, animation: { name: 'fadeIn', duration: 600, delay: 400 }, editable: { content: true } },
      { id: 'term-2', type: 'text', content: '> 本区域无救援窗口。失联即宣告注销。', fontFamily: { $t: 'fonts.mono' }, fontSize: 28, color: { $t: 'colors.primary' }, x: 640, y: 664, width: 1120, height: 40, zIndex: 4, animation: { name: 'fadeIn', duration: 600, delay: 700 }, editable: { content: true } },
      { id: 'term-3', type: 'text', content: '> 坐标已广播：RA 17h 45m / SGR A* 外缘 0.3 pc ▮', fontFamily: { $t: 'fonts.mono' }, fontSize: 28, color: { $t: 'colors.primary' }, x: 640, y: 710, width: 1120, height: 40, zIndex: 4, animation: { name: 'fadeIn', duration: 600, delay: 1000 }, editable: { content: true } },
      { id: 'authority', type: 'text', content: '签发：泛太阳系航运管理局 · 效力等同物理定律', fontFamily: { $t: 'fonts.mono' }, fontSize: 24, color: { $t: 'colors.primary' }, opacity: 0.5, x: 640, y: 830, width: 900, height: 34, zIndex: 4, editable: { content: true } },
      { id: 'clearance', type: 'shape', shapeKind: 'rect', x: 250, y: 620, width: 260, height: 96, fill: 'rgba(239,68,68,0.08)', border: { color: { $t: 'colors.accent' }, width: 2 }, zIndex: 3 },
      { id: 'clearance-t', type: 'text', content: '通行许可\n无 · NEVER', fontFamily: { $t: 'fonts.mono' }, fontSize: 28, fontWeight: '700', color: { $t: 'colors.accent' }, lineHeight: 1.4, textAlign: 'center', x: 250, y: 634, width: 260, height: 70, zIndex: 4, editable: { content: true } },
      { id: 'blink', type: 'text', content: '◉ REC · 违例影像已存档', fontFamily: { $t: 'fonts.mono' }, fontSize: 24, fontWeight: '700', color: { $t: 'colors.primary' }, opacity: 0.7, textAlign: 'right', x: 1360, y: 900, width: 380, height: 34, zIndex: 4, animation: { name: 'blink', duration: 1600, iterationCount: 'infinite' } }
    ]
  },

  // 10. 戴森球工程简报
  {
    id: 'scifi-dyson-brief', name: '戴森球工程简报 (16:9)', version: '1.0.0', category: 'scifi', tags: ['scifi', 'dyson', 'engineering', 'briefing', '16:9'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="178" height="100" viewBox="0 0 178 100"><rect width="178" height="100" fill="%23030712"/><circle cx="52" cy="50" r="18" fill="%23f59e0b"/><circle cx="52" cy="50" r="28" fill="none" stroke="%23fde68a" stroke-width="1.5" stroke-dasharray="4 5"/><rect x="94" y="30" width="66" height="8" fill="%231f2937"/><rect x="94" y="30" width="40" height="8" fill="%23fde68a"/><rect x="94" y="48" width="66" height="3" fill="%23334155"/><rect x="94" y="58" width="50" height="3" fill="%23334155"/><rect x="94" y="68" width="58" height="3" fill="%23334155"/></svg>',
    tokens: {
      colors: SCIFI_COLORS(['轨道夜', '简报', '恒星'], { bg: '#030712', primary: '#FDE68A', accent: '#F59E0B' }, {
        bg: ['#030712', '#0A0F1E', '#120603', '#050B18'],
        primary: ['#FDE68A', '#FED7AA', '#FEF9C3', '#E0F2FE'],
        accent: ['#F59E0B', '#EF4444', '#FB923C', '#38BDF8']
      }),
      fonts: { mono: { label: '数据', default: MONO, options: [MONO, TECH] }, heading: { label: '标题', default: TECH, options: [TECH, MONO] } }
    },
    presets: [
      { name: '恒金简报', colors: { bg: '#030712', primary: '#FDE68A', accent: '#F59E0B' } },
      { name: '红巨时代', colors: { bg: '#120603', primary: '#FED7AA', accent: '#EF4444' } },
      { name: '白矮余晖', colors: { bg: '#050B18', primary: '#E0F2FE', accent: '#38BDF8' } },
      { name: '琥珀进度', colors: { bg: '#0A0F1E', primary: '#FEF9C3', accent: '#FB923C' } }
    ],
    canvas: { virtualWidth: 1920, virtualHeight: 1080, defaultWidth: 1920, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' }, backgroundImage: spaceBg(1920, 1080, 160) },
    elements: [
      { id: 'kicker', type: 'text', content: 'MEGAPROJECT BRIEFING · 卡尔达肖夫 II 型进度', fontFamily: { $t: 'fonts.mono' }, fontSize: 26, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 5, x: 130, y: 110, width: 900, height: 38, zIndex: 4, editable: { content: true } },
      { id: 'title', type: 'text', content: '戴森球计划 · 阶段 III', fontFamily: { $t: 'fonts.heading' }, fontSize: 110, fontWeight: '900', color: { $t: 'colors.primary' }, letterSpacing: 4, x: 130, y: 164, width: 1340, height: 152, zIndex: 4, animation: { name: 'fadeInUp', duration: 900 }, editable: { content: true, fontSize: { type: 'range', min: 80, max: 130 }, position: true } },
      { id: 'sun-halo', type: 'shape', shapeKind: 'circle', x: 1420, y: 200, width: 420, height: 420, fill: 'rgba(245,158,11,0.12)', zIndex: 1, animation: { name: 'ripple', duration: 5200, iterationCount: 'infinite' } },
      { id: 'sun', type: 'shape', shapeKind: 'circle', x: 1520, y: 300, width: 220, height: 220, fill: { $t: 'colors.accent' }, zIndex: 2, animation: { name: 'pulse', duration: 3600, iterationCount: 'infinite' } },
      { id: 'sun-shade', type: 'shape', shapeKind: 'circle', x: 1560, y: 318, width: 200, height: 200, fill: 'rgba(0,0,0,0.45)', zIndex: 2 },
      { id: 'shell', type: 'shape', shapeKind: 'circle', x: 1390, y: 170, width: 480, height: 480, border: { color: { $t: 'colors.primary' }, width: 3, style: 'dashed' }, opacity: 0.6, zIndex: 3, animation: { name: 'spinSlow', duration: 36000, iterationCount: 'infinite', easing: 'linear' } },
      { id: 'panel', type: 'shape', shapeKind: 'rect', x: 130, y: 380, width: 1180, height: 560, fill: 'rgba(255,255,255,0.03)', border: { color: { $t: 'colors.primary' }, width: 1 }, opacity: 0.9, borderRadius: 16, zIndex: 2 },
      { id: 'sec-h', type: 'text', content: 'ASSEMBLY // 节点阵列组装', fontFamily: { $t: 'fonts.mono' }, fontSize: 24, fontWeight: '700', color: { $t: 'colors.primary' }, opacity: 0.55, letterSpacing: 2, x: 180, y: 420, width: 600, height: 34, zIndex: 4 },
      { id: 'prog-h', type: 'text', content: '整体完成度', fontFamily: { $t: 'fonts.mono' }, fontSize: 30, color: { $t: 'colors.primary' }, x: 180, y: 480, width: 300, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'prog-pct', type: 'text', content: '68.4%', fontFamily: { $t: 'fonts.heading' }, fontSize: 44, fontWeight: '900', color: { $t: 'colors.accent' }, textAlign: 'right', x: 960, y: 470, width: 300, height: 52, zIndex: 4, editable: { content: true } },
      { id: 'track', type: 'shape', shapeKind: 'rect', x: 180, y: 540, width: 1080, height: 22, fill: 'rgba(255,255,255,0.08)', borderRadius: 11, zIndex: 3 },
      { id: 'fill', type: 'shape', shapeKind: 'rect', x: 180, y: 540, width: 738, height: 22, fill: { $t: 'colors.accent' }, borderRadius: 11, zIndex: 3, animation: { name: 'slideInLeft', duration: 1100 } },
      { id: 'stat-1', group: 'stat-', type: 'shape', shapeKind: 'rect', x: 180, y: 620, width: 340, height: 130, fill: 'rgba(255,255,255,0.04)', border: { color: { $t: 'colors.primary' }, width: 1 }, borderRadius: 12, zIndex: 3, animation: { name: 'zoomIn', duration: 500, delay: 400 } },
      { id: 'stat-1t', type: 'text', content: '捕获功率\n3.84e26 W', fontFamily: { $t: 'fonts.mono' }, fontSize: 28, fontWeight: '700', color: { $t: 'colors.primary' }, lineHeight: 1.5, textAlign: 'center', x: 180, y: 644, width: 340, height: 84, zIndex: 4, editable: { content: true } },
      { id: 'stat-2', group: 'stat-', type: 'shape', shapeKind: 'rect', x: 550, y: 620, width: 340, height: 130, fill: 'rgba(255,255,255,0.04)', border: { color: { $t: 'colors.primary' }, width: 1 }, borderRadius: 12, zIndex: 3, animation: { name: 'zoomIn', duration: 500, delay: 600 } },
      { id: 'stat-2t', type: 'text', content: '组装节点\n412 亿 / 600 亿', fontFamily: { $t: 'fonts.mono' }, fontSize: 28, fontWeight: '700', color: { $t: 'colors.primary' }, lineHeight: 1.5, textAlign: 'center', x: 550, y: 644, width: 340, height: 84, zIndex: 4, editable: { content: true } },
      { id: 'stat-3', group: 'stat-', type: 'shape', shapeKind: 'rect', x: 920, y: 620, width: 340, height: 130, fill: 'rgba(255,255,255,0.04)', border: { color: { $t: 'colors.primary' }, width: 1 }, borderRadius: 12, zIndex: 3, animation: { name: 'zoomIn', duration: 500, delay: 800 } },
      { id: 'stat-3t', type: 'text', content: '工期剩余\n217 年', fontFamily: { $t: 'fonts.mono' }, fontSize: 28, fontWeight: '700', color: { $t: 'colors.primary' }, lineHeight: 1.5, textAlign: 'center', x: 920, y: 644, width: 340, height: 84, zIndex: 4, editable: { content: true } },
      { id: 'note', type: 'text', content: '备注：水星已拆完。请勿向董事会追问原材料来源。', fontFamily: { $t: 'fonts.mono' }, fontSize: 26, color: { $t: 'colors.primary' }, opacity: 0.6, x: 180, y: 800, width: 1000, height: 36, zIndex: 4, editable: { content: true } },
      { id: 'footer', type: 'text', content: 'PAN-SOLAR BUILD AUTHORITY · 内部资料 · 泄密者投放日冕', fontFamily: { $t: 'fonts.mono' }, fontSize: 22, color: { $t: 'colors.primary' }, opacity: 0.4, x: 130, y: 960, width: 900, height: 32, zIndex: 4 }
    ]
  }
]

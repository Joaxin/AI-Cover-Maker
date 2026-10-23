// 二次元批 · acg-extra：11 个原创模板（16:9×3 / 9:16×3 / 4:5×3 / 1:1×2）
// 规格：bg/primary/accent 色板 tokens + fonts.heading + 每模板 4 组预设；装饰全部原创 SVG data-uri；占位图 Lorem Picsum
import type { Template } from '@/types/types'
import { seeded01, svgUriNoVb } from '../_fx/common'

const seeded = seeded01

const svgUri = svgUriNoVb

const KAITI = 'STKaiti, KaiTi, serif'
const SONG = 'Songti SC, SimSun, serif'
const SERIF = 'Georgia, "Times New Roman", serif'
const SANS = 'Helvetica, Arial, sans-serif'
const MONO = 'Consolas, Menlo, "Courier New", monospace'

const ACG_COLORS = (labels: [string, string, string], defs: [string, string, string], opts: string[][]) => ({
  bg: { label: labels[0], default: defs[0], options: opts[0] },
  primary: { label: labels[1], default: defs[1], options: opts[1] },
  accent: { label: labels[2], default: defs[2], options: opts[2] }
})

// 落日圆盘（条纹切割）
function sunUri(): string {
  let stripes = ''
  for (let i = 0; i < 6; i++) stripes += `<rect x="0" y="${215 + i * 30}" width="400" height="${5 + i * 4}" fill="%23151034" opacity="0.88"/>`
  return svgUri(`<defs><linearGradient id="sg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="%23fde68a"/><stop offset="100%" stop-color="%23fb7185"/></linearGradient></defs><circle cx="200" cy="200" r="200" fill="url(%23sg)"/>${stripes}`, 400, 400)
}
// 透视网格地面
function gridFloorUri(): string {
  const ls: string[] = []
  for (let i = 0; i <= 16; i++) ls.push(`<line x1="${960 + (i - 8) * 40}" y1="0" x2="${960 + (i - 8) * 260}" y2="420" stroke="%23f472b6" stroke-width="2" opacity="0.5"/>`)
  let y = 10
  for (let i = 0; i < 7; i++) { if (y > 414) break; ls.push(`<line x1="0" y1="${y.toFixed(1)}" x2="1920" y2="${y.toFixed(1)}" stroke="%23f472b6" stroke-width="2" opacity="0.45"/>`); y = y * 1.9 + 10 }
  return svgUri(ls.join(''), 1920, 420)
}
// 城市剪影 + 亮窗
function skylineUri(): string {
  const rnd = seeded(86); let x = 0; let inner = ''
  while (x < 1920) {
    const w = 60 + rnd() * 120; const h = 50 + rnd() * 130
    inner += `<rect x="${x.toFixed(0)}" y="${(220 - h).toFixed(0)}" width="${(w - 8).toFixed(0)}" height="${h.toFixed(0)}" fill="%230b0618"/>`
    const wins = Math.floor(h / 46)
    for (let k = 0; k < wins; k++) if (rnd() > 0.55) inner += `<rect x="${(x + 14 + (k % 2) * Math.max(8, w / 2 - 20)).toFixed(0)}" y="${(220 - h + 16 + k * 34).toFixed(0)}" width="10" height="14" fill="%23fcd34d" opacity="${(0.5 + rnd() * 0.45).toFixed(2)}"/>`
    x += w
  }
  return svgUri(inner, 1920, 220)
}
// HUD 圆环
function ringHudUri(): string {
  const c = 310; const p: string[] = []
  p.push(`<circle cx="${c}" cy="${c}" r="298" fill="none" stroke="%237dd3fc" stroke-width="2" stroke-dasharray="14 10" opacity="0.75"/>`)
  p.push(`<circle cx="${c}" cy="${c}" r="236" fill="none" stroke="%237dd3fc" stroke-width="1.5" opacity="0.5"/>`)
  for (let i = 0; i < 36; i++) {
    const a = (i * 10 * Math.PI) / 180; const r1 = i % 3 === 0 ? 250 : 266
    p.push(`<line x1="${(c + r1 * Math.cos(a)).toFixed(1)}" y1="${(c + r1 * Math.sin(a)).toFixed(1)}" x2="${(c + 292 * Math.cos(a)).toFixed(1)}" y2="${(c + 292 * Math.sin(a)).toFixed(1)}" stroke="%237dd3fc" stroke-width="${i % 3 === 0 ? 3 : 1.5}" opacity="0.65"/>`)
  }
  const tri = (rot: number) => Array.from({ length: 3 }, (_, i) => { const a = ((rot + i * 120) * Math.PI) / 180; return `${(c + 150 * Math.cos(a)).toFixed(1)},${(c + 150 * Math.sin(a)).toFixed(1)}` }).join(' ')
  p.push(`<polygon points="${tri(-90)}" fill="none" stroke="%23facc15" stroke-width="2.5" opacity="0.85"/><polygon points="${tri(-30)}" fill="none" stroke="%23facc15" stroke-width="2.5" opacity="0.85"/>`)
  p.push(`<circle cx="${c}" cy="${c}" r="10" fill="%23facc15" opacity="0.9"/>`)
  return svgUri(p.join(''), 620, 620)
}
// 警示斜纹条
function hazardUri(): string {
  let lines = ''
  for (let x = -34; x < 1920; x += 46) lines += `<line x1="${x}" y1="34" x2="${x + 34}" y2="0" stroke="%23facc15" stroke-width="13"/>`
  return svgUri(`<rect width="1920" height="34" fill="%230a0f14"/>${lines}`, 1920, 34)
}

export const acgExtraTemplates: Template[] = [
  // 1. 复古都会黄昏（16:9）
  {
    id: 'acg-citypop-dusk', name: '复古都会黄昏', version: '1.0.0', category: 'acg',
    tags: ['acg', 'citypop', 'retro', 'neon', '16:9'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%231a103c"/><circle cx="50" cy="38" r="18" fill="%23fb7185"/><rect x="32" y="38" width="36" height="2" fill="%231a103c"/><rect x="30" y="44" width="40" height="3" fill="%231a103c"/><line x1="10" y1="70" x2="90" y2="70" stroke="%23f472b6" stroke-width="1.5"/><line x1="50" y1="60" x2="30" y2="92" stroke="%23f472b6" stroke-width="1"/><line x1="50" y1="60" x2="70" y2="92" stroke="%23f472b6" stroke-width="1"/><rect x="18" y="52" width="8" height="8" fill="%230b0618"/><rect x="74" y="50" width="10" height="10" fill="%230b0618"/></svg>',
    tokens: {
      colors: ACG_COLORS(['夜幕', '霓虹字', '落日粉'], ['#1A103C', '#F9E3F7', '#F472B6'],
        [['#1A103C', '#241455', '#0F172A', '#2A1233'], ['#F9E3F7', '#FEF3C7', '#E0E7FF', '#FFE4E6'], ['#F472B6', '#FB7185', '#FDBA74', '#22D3EE']]),
      fonts: { heading: { label: '标题字体', default: KAITI, options: [KAITI, SONG, SANS, SERIF] } }
    },
    presets: [
      { name: '霓虹夜航', colors: { bg: '#1A103C', primary: '#F9E3F7', accent: '#F472B6' } },
      { name: '蜜橙末班', colors: { bg: '#241455', primary: '#FEF3C7', accent: '#FDBA74' } },
      { name: '靛蓝车站', colors: { bg: '#0F172A', primary: '#E0E7FF', accent: '#22D3EE' } },
      { name: '粉雾归途', colors: { bg: '#2A1233', primary: '#FFE4E6', accent: '#FB7185' } }
    ],
    canvas: { virtualWidth: 1920, virtualHeight: 1080, defaultWidth: 1920, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'cd-sky', type: 'overlay', background: 'linear-gradient(180deg, rgba(16,10,40,0.1) 0%, rgba(120,40,120,0.18) 46%, rgba(244,114,182,0.30) 66%, rgba(251,146,60,0.42) 100%)', x: 0, y: 0, width: 1920, height: 1080, zIndex: 1 },
      { id: 'cd-grid', type: 'image', src: gridFloorUri(), objectFit: 'contain', objectPosition: 'center 100%', x: 0, y: 0, width: 1920, height: 1080, zIndex: 2 },
      { id: 'cd-sun', type: 'image', src: sunUri(), objectFit: 'contain', x: 1240, y: 130, width: 460, height: 460, zIndex: 2, animation: { name: 'glow', duration: 3400, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'cd-skyline', type: 'image', src: skylineUri(), objectFit: 'contain', objectPosition: 'center 51.16%', x: 0, y: 0, width: 1920, height: 1080, opacity: 0.95, zIndex: 2 },
      ...Array.from({ length: 16 }, (_, i) => { const r = seeded(i * 13 + 3); const x = 100 + r() * 1700; const y = 60 + r() * 400; const s = 5 + r() * 6
        return { id: `cd-star-${i}`, type: 'shape', shapeKind: 'circle', x, y, width: s, height: s, fill: { $t: 'colors.primary' }, opacity: 0.35 + r() * 0.4, zIndex: 2, animation: { name: 'twinkle', duration: 2200 + i * 260, delay: i * 180, iterationCount: 'infinite' } } }) as any,
      { id: 'cd-kicker', type: 'text', content: 'CITY POP · NIGHT DRIFT', fontFamily: MONO, fontSize: 26, color: { $t: 'colors.accent' }, letterSpacing: 8, x: 150, y: 190, width: 760, height: 36, zIndex: 4, editable: { content: true } },
      { id: 'cd-title', type: 'text', content: '午夜公休', fontFamily: { $t: 'fonts.heading' }, fontSize: 150, fontWeight: '900', color: { $t: 'colors.primary' }, letterSpacing: 8, x: 140, y: 250, width: 920, height: 200, zIndex: 4, shadow: { color: 'rgba(244,114,182,0.55)', blur: 34, offsetX: 0, offsetY: 6 }, animation: { name: 'rise', duration: 1000 }, editable: { content: true, fontSize: { type: 'range', min: 90, max: 190 }, position: true } },
      { id: 'cd-sub', type: 'text', content: 'Midnight Holiday · 末班车还有五分钟', fontFamily: SANS, fontStyle: 'italic', fontSize: 30, color: { $t: 'colors.primary' }, opacity: 0.75, x: 148, y: 472, width: 840, height: 46, zIndex: 4, animation: { name: 'fadeIn', duration: 900, delay: 600 }, editable: { content: true, fontSize: { type: 'range', min: 22, max: 44 }, position: true } },
      { id: 'cd-line', type: 'shape', shapeKind: 'rect', x: 150, y: 545, width: 120, height: 5, fill: { $t: 'colors.accent' }, zIndex: 4 },
      { id: 'cd-photo-frame', type: 'shape', shapeKind: 'rect', x: 142, y: 632, width: 436, height: 316, fill: 'transparent', border: { color: { $t: 'colors.primary' }, width: 2, style: 'solid' }, borderRadius: 6, rotation: -3, zIndex: 4 },
      { id: 'cd-photo', type: 'image', src: '/images/photo/neon-alley-400x280.jpg', objectFit: 'cover', x: 160, y: 650, width: 400, height: 280, rotation: -3, zIndex: 4, editable: { src: { type: 'upload' }, position: true, size: { type: 'scale' } } },
      { id: 'cd-foot', type: 'text', content: 'BPM 118 · 2026.09 · SIDE A', fontFamily: MONO, fontSize: 22, color: { $t: 'colors.primary' }, opacity: 0.45, textAlign: 'right', x: 1280, y: 990, width: 500, height: 30, zIndex: 4 }
    ]
  },
  // 2. 活动应援票根（16:9）
  {
    id: 'acg-event-ticket', name: '活动应援票根', version: '1.0.0', category: 'acg',
    tags: ['acg', 'ticket', 'event', 'fan', '16:9'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23f6f3ec"/><rect x="8" y="24" width="84" height="52" rx="5" fill="%23fff"/><rect x="8" y="24" width="6" height="52" fill="%23e11d48"/><line x1="66" y1="24" x2="66" y2="76" stroke="%231f2937" stroke-width="1" stroke-dasharray="3 3"/><rect x="18" y="34" width="34" height="6" fill="%231f2937"/><rect x="18" y="46" width="24" height="4" fill="%231f2937" opacity="0.5"/><rect x="72" y="34" width="14" height="34" fill="%231f2937" opacity="0.15"/></svg>',
    tokens: {
      colors: ACG_COLORS(['票纸', '油墨', '应援红'], ['#F6F3EC', '#1F2937', '#E11D48'],
        [['#F6F3EC', '#FAFAF9', '#F1F5F9', '#FFF7ED'], ['#1F2937', '#111827', '#1E293B', '#292524'], ['#E11D48', '#2563EB', '#7C3AED', '#059669']]),
      fonts: { heading: { label: '标题字体', default: SONG, options: [SONG, SANS, KAITI, MONO] } }
    },
    presets: [
      { name: '红组应援', colors: { bg: '#F6F3EC', primary: '#1F2937', accent: '#E11D48' } },
      { name: '蓝组应援', colors: { bg: '#F1F5F9', primary: '#111827', accent: '#2563EB' } },
      { name: '紫组应援', colors: { bg: '#FAFAF9', primary: '#1E293B', accent: '#7C3AED' } },
      { name: '绿组应援', colors: { bg: '#FFF7ED', primary: '#292524', accent: '#059669' } }
    ],
    canvas: { virtualWidth: 1920, virtualHeight: 1080, defaultWidth: 1920, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'et-card', type: 'shape', shapeKind: 'rect', x: 170, y: 170, width: 1580, height: 740, fill: '#FFFFFF', borderRadius: 26, shadow: { color: 'rgba(31,41,55,0.16)', blur: 28, offsetX: 0, offsetY: 14 }, zIndex: 2, animation: { name: 'fadeInUp', duration: 800 } },
      { id: 'et-side', type: 'shape', shapeKind: 'rect', x: 170, y: 170, width: 70, height: 740, fill: { $t: 'colors.accent' }, borderRadius: 26, zIndex: 3 },
      { id: 'et-perf-line', type: 'shape', shapeKind: 'rect', x: 1222, y: 200, width: 2, height: 680, fill: 'transparent', border: { color: 'rgba(31,41,55,0.35)', width: 2, style: 'dashed' }, group: 'perf', zIndex: 3 },
      ...Array.from({ length: 11 }, (_, i) => ({ id: `et-perf-${i}`, type: 'shape', shapeKind: 'circle', x: 1214, y: 170 + i * 68, width: 18, height: 18, fill: { $t: 'colors.bg' }, group: 'perf', zIndex: 4 })) as any,
      { id: 'et-kicker', type: 'text', content: 'ANIME FEST 2026 · 应援公演', fontFamily: MONO, fontSize: 26, color: { $t: 'colors.accent' }, letterSpacing: 5, x: 300, y: 250, width: 700, height: 36, zIndex: 4, editable: { content: true } },
      { id: 'et-title', type: 'text', content: '深夜魔法使 二周年 LIVE', fontFamily: { $t: 'fonts.heading' }, fontSize: 74, fontWeight: '900', color: { $t: 'colors.primary' }, x: 300, y: 302, width: 900, height: 112, zIndex: 4, animation: { name: 'fadeInUp', duration: 800, delay: 200 }, editable: { content: true, fontSize: { type: 'range', min: 52, max: 96 }, position: true } },
      { id: 'et-sub', type: 'text', content: '2nd ANNIVERSARY — 应援棒海岸，一起点亮安可', fontFamily: SONG, fontSize: 28, color: { $t: 'colors.primary' }, opacity: 0.65, x: 302, y: 436, width: 860, height: 44, zIndex: 4, editable: { content: true, fontSize: { type: 'range', min: 20, max: 40 }, position: true } },
      { id: 'et-lb-time', type: 'text', content: '时间 TIME', fontFamily: MONO, fontSize: 20, color: { $t: 'colors.primary' }, opacity: 0.5, letterSpacing: 3, x: 300, y: 542, width: 130, height: 28, zIndex: 4 },
      { id: 'et-vl-time', type: 'text', content: '2026.12.24 THU 19:00', fontFamily: MONO, fontSize: 30, color: { $t: 'colors.primary' }, x: 448, y: 534, width: 520, height: 42, zIndex: 4, editable: { content: true } },
      { id: 'et-rule1', type: 'shape', shapeKind: 'rect', x: 300, y: 600, width: 860, height: 1, fill: { $t: 'colors.primary' }, opacity: 0.14, zIndex: 4 },
      { id: 'et-lb-venue', type: 'text', content: '场地 VENUE', fontFamily: MONO, fontSize: 20, color: { $t: 'colors.primary' }, opacity: 0.5, letterSpacing: 3, x: 300, y: 630, width: 143, height: 28, zIndex: 4 },
      { id: 'et-vl-venue', type: 'text', content: '海幕大厅 · 主 Hall A', fontFamily: SONG, fontSize: 30, color: { $t: 'colors.primary' }, x: 448, y: 622, width: 520, height: 42, zIndex: 4, editable: { content: true } },
      { id: 'et-rule2', type: 'shape', shapeKind: 'rect', x: 300, y: 688, width: 860, height: 1, fill: { $t: 'colors.primary' }, opacity: 0.14, zIndex: 4 },
      { id: 'et-lb-gate', type: 'text', content: '检票 GATE', fontFamily: MONO, fontSize: 20, color: { $t: 'colors.primary' }, opacity: 0.5, letterSpacing: 3, x: 300, y: 718, width: 130, height: 28, zIndex: 4 },
      { id: 'et-vl-gate', type: 'text', content: '3 号口 · 应援席专用', fontFamily: SONG, fontSize: 30, color: { $t: 'colors.primary' }, x: 448, y: 710, width: 520, height: 42, zIndex: 4, editable: { content: true } },
      { id: 'et-note', type: 'text', content: '凭此券入场 · 应援无限', fontFamily: KAITI, fontSize: 24, color: { $t: 'colors.primary' }, opacity: 0.45, x: 300, y: 812, width: 500, height: 34, zIndex: 4, editable: { content: true } },
      { id: 'et-stub-kicker', type: 'text', content: '副券 STUB', fontFamily: MONO, fontSize: 24, color: { $t: 'colors.primary' }, opacity: 0.5, letterSpacing: 6, x: 1300, y: 252, width: 220, height: 32, zIndex: 4 },
      { id: 'et-stub-seat', type: 'text', content: 'A12-07', fontFamily: MONO, fontSize: 66, fontWeight: '700', color: { $t: 'colors.primary' }, letterSpacing: 4, x: 1300, y: 296, width: 400, height: 84, zIndex: 4, editable: { content: true } },
      { id: 'et-stub-no', type: 'text', content: 'No. 0224 / 0888', fontFamily: MONO, fontSize: 22, color: { $t: 'colors.primary' }, opacity: 0.5, x: 1300, y: 400, width: 320, height: 30, zIndex: 4, editable: { content: true } },
      { id: 'et-stub-name', type: 'text', content: '深夜魔法使 应援委员会', fontFamily: KAITI, fontSize: 26, color: { $t: 'colors.accent' }, x: 1300, y: 462, width: 400, height: 38, zIndex: 4, editable: { content: true } },
      ...Array.from({ length: 24 }, (_, i) => { const r = seeded(i * 31 + 7); const w = 3 + Math.floor(r() * 7)
        return { id: `et-bar-${i}`, type: 'shape', shapeKind: 'rect', x: 1300 + i * 17, y: 700, width: w, height: 92, fill: { $t: 'colors.primary' }, opacity: 0.85, zIndex: 4 } }) as any,
      { id: 'et-stamp', type: 'shape', shapeKind: 'circle', x: 1530, y: 520, width: 128, height: 128, fill: 'transparent', border: { color: { $t: 'colors.accent' }, width: 3, style: 'solid' }, rotation: -12, zIndex: 4, animation: { name: 'pulse', duration: 2600, iterationCount: 'infinite' } },
      { id: 'et-stamp-t', type: 'text', content: '当選', fontFamily: KAITI, fontSize: 40, fontWeight: '700', color: { $t: 'colors.accent' }, textAlign: 'center', rotation: -12, x: 1530, y: 560, width: 128, height: 50, zIndex: 5 }
    ]
  },
  // 3. 机甲启动界面（16:9）
  {
    id: 'acg-mecha-boot', name: '机甲启动界面', version: '1.0.0', category: 'acg',
    tags: ['acg', 'mecha', 'hud', 'sci-fi', '16:9'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%230a0f14"/><circle cx="68" cy="50" r="22" fill="none" stroke="%237dd3fc" stroke-width="1.5" stroke-dasharray="4 3"/><polygon points="68,36 78,56 58,56" fill="none" stroke="%23facc15" stroke-width="1.5"/><rect x="10" y="20" width="38" height="5" fill="%237dd3fc"/><rect x="10" y="30" width="26" height="3" fill="%237dd3fc" opacity="0.5"/><rect x="10" y="62" width="34" height="4" fill="%237dd3fc" opacity="0.3"/><rect x="10" y="70" width="40" height="6" fill="%23facc15" opacity="0.8"/></svg>',
    tokens: {
      colors: ACG_COLORS(['深空驾驶舱', '屏幕青', '警戒黄'], ['#0A0F14', '#7DD3FC', '#FACC15'],
        [['#0A0F14', '#0F172A', '#0B1220', '#111827'], ['#7DD3FC', '#A5F3FC', '#93C5FD', '#E0F2FE'], ['#FACC15', '#FB923C', '#F472B6', '#4ADE80']]),
      fonts: { heading: { label: '标题字体', default: SANS, options: [SANS, MONO, SONG, KAITI] } }
    },
    presets: [
      { name: '标准青黄', colors: { bg: '#0A0F14', primary: '#7DD3FC', accent: '#FACC15' } },
      { name: '夜航冰蓝', colors: { bg: '#0F172A', primary: '#A5F3FC', accent: '#FB923C' } },
      { name: '红警模式', colors: { bg: '#0B1220', primary: '#93C5FD', accent: '#F472B6' } },
      { name: '同步绿', colors: { bg: '#111827', primary: '#E0F2FE', accent: '#4ADE80' } }
    ],
    canvas: { virtualWidth: 1920, virtualHeight: 1080, defaultWidth: 1920, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'mb-scan', type: 'overlay', background: 'repeating-linear-gradient(0deg, rgba(125,211,252,0.05) 0px, rgba(125,211,252,0.05) 2px, transparent 2px, transparent 6px)', x: 0, y: 0, width: 1920, height: 1080, zIndex: 1 },
      { id: 'mb-hazard-top', type: 'image', src: hazardUri(), objectFit: 'contain', objectPosition: 'center 0%', x: 0, y: 0, width: 1920, height: 1080, opacity: 0.85, zIndex: 2 },
      { id: 'mb-hazard-bottom', type: 'image', src: hazardUri(), objectFit: 'contain', objectPosition: 'center 100%', x: 0, y: 0, width: 1920, height: 1080, opacity: 0.85, zIndex: 2 },
      ...Array.from([{ x: 60, y: 70, hx: 1, hy: 1 }, { x: 1770, y: 70, hx: -1, hy: 1 }, { x: 60, y: 950, hx: 1, hy: -1 }, { x: 1770, y: 950, hx: -1, hy: -1 }], (c, i) => [
        { id: `mb-corh-${i}`, type: 'shape', shapeKind: 'rect', x: c.hx > 0 ? c.x : c.x - 90 + 6, y: c.hy > 0 ? c.y : c.y - 6, width: 90, height: 6, fill: { $t: 'colors.primary' }, opacity: 0.9, zIndex: 2 },
        { id: `mb-corv-${i}`, type: 'shape', shapeKind: 'rect', x: c.hx > 0 ? c.x : c.x - 6, y: c.hy > 0 ? c.y : c.y - 90 + 6, width: 6, height: 90, fill: { $t: 'colors.primary' }, opacity: 0.9, zIndex: 2 }
      ]).flat() as any,
      { id: 'mb-ring', type: 'image', src: ringHudUri(), objectFit: 'contain', x: 1150, y: 210, width: 620, height: 620, zIndex: 2, animation: { name: 'spinSlow', duration: 26000, iterationCount: 'infinite', easing: 'linear' } },
      { id: 'mb-core', type: 'shape', shapeKind: 'circle', x: 1330, y: 390, width: 260, height: 260, fill: { $t: 'colors.accent' }, opacity: 0.12, zIndex: 2 },
      { id: 'mb-core-t', type: 'text', content: 'SYNC\n100%', fontFamily: MONO, fontSize: 34, fontWeight: '700', color: { $t: 'colors.accent' }, textAlign: 'center', lineHeight: 1.4, x: 1330, y: 468, width: 260, height: 100, zIndex: 3, animation: { name: 'fadeIn', duration: 900, delay: 800 } },
      { id: 'mb-kicker', type: 'text', content: 'UNIT-07 // BOOT SEQUENCE', fontFamily: MONO, fontSize: 24, color: { $t: 'colors.accent' }, letterSpacing: 6, x: 140, y: 150, width: 700, height: 34, zIndex: 3, editable: { content: true } },
      { id: 'mb-title', type: 'text', content: '同调 · 启动', fontFamily: { $t: 'fonts.heading' }, fontSize: 120, fontWeight: '900', color: { $t: 'colors.primary' }, letterSpacing: 14, x: 140, y: 210, width: 880, height: 160, zIndex: 3, animation: { name: 'slideInLeft', duration: 800 }, editable: { content: true, fontSize: { type: 'range', min: 70, max: 150 }, position: true } },
      { id: 'mb-sub', type: 'text', content: 'SYSTEM SYNCHRONIZATION // 精神链接稳定', fontFamily: MONO, fontSize: 26, color: { $t: 'colors.primary' }, opacity: 0.65, x: 140, y: 398, width: 860, height: 40, zIndex: 3, editable: { content: true } },
      { id: 'mb-track', type: 'shape', shapeKind: 'rect', x: 140, y: 480, width: 740, height: 24, fill: 'rgba(125,211,252,0.15)', borderRadius: 12, zIndex: 3 },
      { id: 'mb-fill', type: 'shape', shapeKind: 'rect', x: 144, y: 484, width: 692, height: 16, fill: { $t: 'colors.primary' }, borderRadius: 8, zIndex: 4, animation: { name: 'slideInLeft', duration: 1200, delay: 400 } },
      { id: 'mb-pct', type: 'text', content: '94.6%', fontFamily: MONO, fontSize: 22, color: { $t: 'colors.accent' }, x: 900, y: 476, width: 120, height: 30, zIndex: 3 },
      ...Array.from(['THRUST', 'ARMOR', 'RADAR', 'CORE', 'PILOT'], (k, i) => [
        { id: `mb-k-${i}`, type: 'text', content: k, fontFamily: MONO, fontSize: 20, color: { $t: 'colors.primary' }, opacity: 0.5, letterSpacing: 2, x: 140, y: 556 + i * 52, width: 150, height: 28, zIndex: 3 },
        { id: `mb-v-${i}`, type: 'text', content: `${80 + ((i * 37) % 19)}.${(i * 7) % 10}%`, fontFamily: MONO, fontSize: 24, color: { $t: 'colors.primary' }, x: 330, y: 552 + i * 52, width: 140, height: 32, zIndex: 3 },
        { id: `mb-r-${i}`, type: 'shape', shapeKind: 'rect', x: 140, y: 592 + i * 52, width: 740, height: 1, fill: { $t: 'colors.primary' }, opacity: 0.12, zIndex: 3 }
      ]).flat() as any,
      { id: 'mb-warn-bg', type: 'shape', shapeKind: 'rect', x: 140, y: 858, width: 470, height: 56, fill: 'rgba(250,204,21,0.10)', border: { color: { $t: 'colors.accent' }, width: 2, style: 'solid' }, borderRadius: 6, zIndex: 3, animation: { name: 'blink', duration: 1600, iterationCount: 'infinite' } },
      { id: 'mb-warn', type: 'text', content: '⚠ WARNING : 灵能负载过高', fontFamily: MONO, fontSize: 24, color: { $t: 'colors.accent' }, x: 166, y: 870, width: 430, height: 32, zIndex: 4, editable: { content: true } },
      { id: 'mb-coord', type: 'text', content: '34.7°N 135.5°E · ALT 0 m', fontFamily: MONO, fontSize: 20, color: { $t: 'colors.primary' }, opacity: 0.4, textAlign: 'right', x: 1380, y: 966, width: 420, height: 28, zIndex: 3 }
    ]
  },
  // 4. 动画 KEY VISUAL（9:16）
  {
    id: 'acg-key-visual', name: '动画KEY VISUAL', version: '1.0.0', category: 'acg',
    tags: ['acg', 'anime', 'poster', 'key visual', '9:16'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%230b1b3a"/><circle cx="50" cy="30" r="12" fill="%23fbbf24"/><line x1="50" y1="30" x2="20" y2="0" stroke="%23fbbf24" stroke-width="1" opacity="0.3"/><line x1="50" y1="30" x2="80" y2="0" stroke="%23fbbf24" stroke-width="1" opacity="0.3"/><rect x="34" y="44" width="32" height="26" fill="%23fff" opacity="0.85"/><path d="M0 90 Q25 74 50 88 T100 84 V100 H0 Z" fill="%23071227"/><rect x="18" y="60" width="52" height="6" fill="%23f8fafc"/></svg>',
    tokens: {
      colors: ACG_COLORS(['深夜幕', '月光白', '星辉金'], ['#0B1B3A', '#F8FAFC', '#FBBF24'],
        [['#0B1B3A', '#2E1065', '#0C4A6E', '#111827'], ['#F8FAFC', '#F5F3FF', '#ECFEFF', '#F9FAFB'], ['#FBBF24', '#F0ABFC', '#22D3EE', '#A5B4FC']]),
      fonts: { heading: { label: '标题字体', default: KAITI, options: [KAITI, SONG, SERIF, SANS] } }
    },
    presets: [
      { name: '星夜金辉', colors: { bg: '#0B1B3A', primary: '#F8FAFC', accent: '#FBBF24' } },
      { name: '暮紫幻梦', colors: { bg: '#2E1065', primary: '#F5F3FF', accent: '#F0ABFC' } },
      { name: '海渊星蓝', colors: { bg: '#0C4A6E', primary: '#ECFEFF', accent: '#22D3EE' } },
      { name: '墨夜远光', colors: { bg: '#111827', primary: '#F9FAFB', accent: '#A5B4FC' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1920, defaultWidth: 1080, defaultHeight: 1920, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'kv-rays', type: 'image', objectFit: 'contain', objectPosition: 'center 0%', src: (() => { let rays = ''
          for (let i = 0; i <= 12; i++) { const x = 40 + i * 90; rays += `<polygon points="540,220 ${x},0 ${x + 34},0" fill="%23fbbf24" opacity="${i % 2 ? 0.06 : 0.10}"/>` }
          return svgUri(rays, 1080, 900) })(), x: 0, y: 0, width: 1080, height: 1920, zIndex: 1 },
      { id: 'kv-halo', type: 'shape', shapeKind: 'circle', x: 310, y: 150, width: 460, height: 460, fill: { $t: 'colors.accent' }, opacity: 0.14, zIndex: 1 },
      { id: 'kv-moon', type: 'shape', shapeKind: 'circle', x: 380, y: 220, width: 320, height: 320, fill: { $t: 'colors.accent' }, opacity: 0.92, zIndex: 2, shadow: { color: 'rgba(251,191,36,0.45)', blur: 46, offsetX: 0, offsetY: 0 }, animation: { name: 'glow', duration: 4200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      ...Array.from({ length: 10 }, (_, i) => { const r = seeded(i * 17 + 5); const x = 40 + r() * 1000; const y = 60 + r() * 820; const s = 6 + r() * 8
        return { id: `kv-sp-${i}`, type: 'shape', shapeKind: 'circle', x, y, width: s, height: s, fill: { $t: 'colors.primary' }, opacity: 0.4 + r() * 0.5, zIndex: 2, animation: { name: 'twinkle', duration: 2400 + i * 300, delay: i * 220, iterationCount: 'infinite' } } }) as any,
      { id: 'kv-hills', type: 'image', objectFit: 'contain', objectPosition: 'center 69.75%', src: svgUri(`<path d="M0 190 Q270 60 540 160 T1080 120 V300 H0 Z" fill="%23071227" opacity="0.9"/><path d="M0 230 Q300 130 620 210 T1080 190 V300 H0 Z" fill="%23050c1c"/>`, 1080, 300), x: 0, y: 0, width: 1080, height: 1920, zIndex: 2 },
      { id: 'kv-photo', type: 'image', src: '/images/photo/anime-hero-560x780.jpg', objectFit: 'cover', x: 260, y: 540, width: 560, height: 700, rotation: -4, borderRadius: 14, zIndex: 3, shadow: { color: 'rgba(2,6,23,0.55)', blur: 34, offsetX: 0, offsetY: 14 }, editable: { src: { type: 'upload' }, position: true, size: { type: 'scale' } } },
      { id: 'kv-photo-edge', type: 'shape', shapeKind: 'rect', x: 248, y: 528, width: 584, height: 724, fill: 'transparent', border: { color: { $t: 'colors.primary' }, width: 3, style: 'solid' }, rotation: -4, zIndex: 3 },
      { id: 'kv-kicker', type: 'text', content: '2026 WINTER · 剧场版', fontFamily: MONO, fontSize: 28, color: { $t: 'colors.accent' }, letterSpacing: 8, textAlign: 'center', x: 140, y: 1330, width: 800, height: 40, zIndex: 4, animation: { name: 'fadeIn', duration: 800, delay: 300 }, editable: { content: true } },
      { id: 'kv-title', type: 'text', content: '星海彼方的你', fontFamily: { $t: 'fonts.heading' }, fontSize: 116, fontWeight: '900', color: { $t: 'colors.primary' }, letterSpacing: 6, rotation: -4, x: 60, y: 1400, width: 960, height: 160, zIndex: 4, shadow: { color: 'rgba(251,191,36,0.35)', blur: 28, offsetX: 0, offsetY: 6 }, animation: { name: 'rise', duration: 1000 }, editable: { content: true, fontSize: { type: 'range', min: 70, max: 140 }, position: true } },
      { id: 'kv-sub', type: 'text', content: 'You, Across the Star Sea', fontFamily: SERIF, fontStyle: 'italic', fontSize: 36, color: { $t: 'colors.primary' }, opacity: 0.8, letterSpacing: 3, textAlign: 'center', x: 140, y: 1586, width: 800, height: 50, zIndex: 4, animation: { name: 'fadeInUp', duration: 900, delay: 500 }, editable: { content: true, fontSize: { type: 'range', min: 26, max: 52 }, position: true } },
      { id: 'kv-badge', type: 'shape', shapeKind: 'rect', x: 340, y: 1690, width: 400, height: 60, fill: { $t: 'colors.accent' }, borderRadius: 30, zIndex: 4, animation: { name: 'pulse', duration: 2800, iterationCount: 'infinite' } },
      { id: 'kv-badge-t', type: 'text', content: 'ON AIR 2026.12.24', fontFamily: MONO, fontSize: 26, fontWeight: '700', color: { $t: 'colors.bg' }, textAlign: 'center', x: 340, y: 1704, width: 400, height: 34, zIndex: 5, editable: { content: true } },
      { id: 'kv-foot', type: 'text', content: '© 星海制作委员会 · 冬番企划', fontFamily: MONO, fontSize: 20, color: { $t: 'colors.primary' }, opacity: 0.35, textAlign: 'center', x: 140, y: 1816, width: 800, height: 28, zIndex: 4 }
    ]
  },
  // 5. 应援棒海（9:16）
  {
    id: 'acg-penlight', name: '应援棒海', version: '1.0.0', category: 'acg',
    tags: ['acg', 'live', 'penlight', 'concert', '9:16'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%2312101f"/><rect x="20" y="14" width="60" height="6" fill="%23f472b6"/><circle cx="28" cy="66" r="6" fill="%23f472b6"/><circle cx="50" cy="62" r="6" fill="%2360a5fa"/><circle cx="72" cy="66" r="6" fill="%23fbbf24"/><rect x="26" y="72" width="4" height="14" fill="%23e5e7eb"/><rect x="48" y="68" width="4" height="18" fill="%23e5e7eb"/><rect x="70" y="72" width="4" height="14" fill="%23e5e7eb"/></svg>',
    tokens: {
      colors: {
        ...ACG_COLORS(['暗场', '灯海白', '应援粉'], ['#12101F', '#FFF1F7', '#F472B6'],
          [['#12101F', '#0B1021', '#1A1033', '#0F172A'], ['#FFF1F7', '#EFF6FF', '#FEFCE8', '#F0FDF4'], ['#F472B6', '#60A5FA', '#FBBF24', '#34D399']]),
        'glow-b': { label: '应援二色', default: '#60A5FA', options: ['#60A5FA', '#A78BFA', '#F472B6', '#22D3EE'] },
        'glow-c': { label: '应援三色', default: '#FBBF24', options: ['#FBBF24', '#F472B6', '#A78BFA', '#FDE047'] },
        'glow-d': { label: '应援四色', default: '#34D399', options: ['#34D399', '#22D3EE', '#FB923C', '#A78BFA'] }
      },
      fonts: { heading: { label: '标题字体', default: KAITI, options: [KAITI, SANS, SONG, SERIF] } }
    },
    presets: [
      { name: '粉光海', colors: { bg: '#12101F', primary: '#FFF1F7', accent: '#F472B6', 'glow-b': '#60A5FA', 'glow-c': '#FBBF24', 'glow-d': '#34D399' } },
      { name: '蓝光海', colors: { bg: '#0B1021', primary: '#EFF6FF', accent: '#60A5FA', 'glow-b': '#A78BFA', 'glow-c': '#F472B6', 'glow-d': '#22D3EE' } },
      { name: '金光海', colors: { bg: '#1A1033', primary: '#FEFCE8', accent: '#FBBF24', 'glow-b': '#F472B6', 'glow-c': '#A78BFA', 'glow-d': '#FB923C' } },
      { name: '绿光海', colors: { bg: '#0F172A', primary: '#F0FDF4', accent: '#34D399', 'glow-b': '#A78BFA', 'glow-c': '#FDE047', 'glow-d': '#22D3EE' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1920, defaultWidth: 1080, defaultHeight: 1920, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'pl-glow', type: 'overlay', background: 'radial-gradient(65% 19.17% at 50% 100%, rgba(244,114,182,0.28) 0%, rgba(244,114,182,0) 70%)', x: 0, y: 0, width: 1080, height: 1920, zIndex: 1 },
      { id: 'pl-spot-l', type: 'image', objectFit: 'fill', src: svgUri('<polygon points="120,0 420,900 260,900" fill="%23ffffff" opacity="0.07"/>', 480, 900), x: 40, y: 60, width: 480, height: 900, zIndex: 1 },
      { id: 'pl-spot-r', type: 'image', objectFit: 'fill', src: svgUri('<polygon points="360,0 220,900 60,900" fill="%23ffffff" opacity="0.07"/>', 480, 900), x: 560, y: 60, width: 480, height: 900, zIndex: 1 },
      { id: 'pl-stage', type: 'shape', shapeKind: 'rect', x: 180, y: 170, width: 720, height: 12, fill: { $t: 'colors.accent' }, opacity: 0.85, zIndex: 2 },
      { id: 'pl-encore', type: 'text', content: 'ENCORE', fontFamily: SANS, fontSize: 64, fontWeight: '900', color: { $t: 'colors.primary' }, letterSpacing: 22, textAlign: 'center', opacity: 0.9, x: 140, y: 220, width: 800, height: 84, zIndex: 2, animation: { name: 'shimmer', duration: 3000, iterationCount: 'infinite' } },
      { id: 'pl-kicker', type: 'text', content: 'SUMMER LIVE · 全 28 曲', fontFamily: MONO, fontSize: 26, color: { $t: 'colors.accent' }, letterSpacing: 6, textAlign: 'center', x: 140, y: 400, width: 800, height: 36, zIndex: 3, editable: { content: true } },
      { id: 'pl-title', type: 'text', content: '一起的光海', fontFamily: { $t: 'fonts.heading' }, fontSize: 122, fontWeight: '900', color: { $t: 'colors.primary' }, letterSpacing: 8, textAlign: 'center', x: 60, y: 470, width: 960, height: 170, zIndex: 3, shadow: { color: 'rgba(244,114,182,0.5)', blur: 34, offsetX: 0, offsetY: 6 }, animation: { name: 'rise', duration: 950 }, editable: { content: true, fontSize: { type: 'range', min: 80, max: 150 }, position: true } },
      { id: 'pl-sub', type: 'text', content: 'ONE FOR ALL — 2026.08.15 大巨蛋', fontFamily: SANS, fontSize: 32, color: { $t: 'colors.primary' }, opacity: 0.75, letterSpacing: 2, textAlign: 'center', x: 140, y: 680, width: 800, height: 44, zIndex: 3, animation: { name: 'fadeIn', duration: 900, delay: 500 }, editable: { content: true, fontSize: { type: 'range', min: 24, max: 46 }, position: true } },
      { id: 'pl-lineup', type: 'text', content: 'MIO · RIN · AKARI · NOA · YUI', fontFamily: MONO, fontSize: 24, color: { $t: 'colors.accent' }, letterSpacing: 4, textAlign: 'center', x: 140, y: 810, width: 800, height: 34, zIndex: 3, animation: { name: 'fadeInUp', duration: 800, delay: 800 }, editable: { content: true } },
      ...Array.from({ length: 21 }, (_, i) => { const row = Math.floor(i / 7); const col = i % 7; const head = 64 + row * 22
          const glows = ['colors.accent', 'colors.glow-b', 'colors.accent', 'colors.glow-c', 'colors.glow-d', 'colors.glow-b']
          const x = 42 + col * 146 + row * 14; const y = 1180 + row * 210
          return [
            { id: `pl-head-${i}`, type: 'shape', shapeKind: 'circle', x, y, width: head, height: head, fill: { $t: glows[(i * 2 + row) % glows.length] }, zIndex: 2 + row, animation: { name: 'float', duration: 2600 + (i % 5) * 500, delay: (i % 7) * 160, iterationCount: 'infinite', easing: 'ease-in-out' } },
            { id: `pl-handle-${i}`, type: 'shape', shapeKind: 'rect', x: x + head / 2 - 7, y: y + head - 6, width: 14, height: 110 + row * 14, fill: '#FFFFFF', opacity: 0.72, borderRadius: 7, zIndex: 2 + row }
          ] }).flat() as any,
      ...Array.from({ length: 8 }, (_, i) => { const r = seeded(i * 23 + 11); const x = 60 + r() * 950; const y = 980 + r() * 240
        return { id: `pl-heart-${i}`, type: 'shape', shapeKind: 'circle', x, y, width: 8 + r() * 8, height: 8 + r() * 8, fill: { $t: 'colors.accent' }, opacity: 0.5 + r() * 0.4, zIndex: 4, animation: { name: 'twinkle', duration: 2200 + i * 280, delay: i * 240, iterationCount: 'infinite' } } }) as any,
      { id: 'pl-foot', type: 'text', content: 'PENLIGHT OCEAN / 全场一起', fontFamily: MONO, fontSize: 22, color: { $t: 'colors.primary' }, opacity: 0.4, textAlign: 'center', x: 140, y: 1830, width: 800, height: 30, zIndex: 4 }
    ]
  },
  // 6. 波子汽水之夏（4:5）
  {
    id: 'acg-ramune-summer', name: '波子汽水之夏', version: '1.0.0', category: 'acg',
    tags: ['acg', 'summer', 'ramune', 'fresh', '4:5'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23effbff"/><rect x="42" y="22" width="18" height="40" rx="7" fill="%2338bdf8" opacity="0.35" stroke="%230c4a6e"/><circle cx="51" cy="34" r="5" fill="%23fff" stroke="%230c4a6e" stroke-width="1"/><rect x="47" y="14" width="8" height="7" fill="%230c4a6e"/><circle cx="30" cy="60" r="3" fill="%2338bdf8" opacity="0.5"/><circle cx="72" cy="52" r="4" fill="%2338bdf8" opacity="0.4"/><path d="M0 84 Q25 76 50 84 T100 82 V100 H0 Z" fill="%2338bdf8" opacity="0.4"/></svg>',
    tokens: {
      colors: ACG_COLORS(['汽水天', '深海墨', '波子蓝'], ['#EFFBFF', '#0C4A6E', '#38BDF8'],
        [['#EFFBFF', '#FEF2F2', '#F0FDF4', '#FFFBEB'], ['#0C4A6E', '#7F1D1D', '#365314', '#78350F'], ['#38BDF8', '#F87171', '#A3E635', '#FBBF24']]),
      fonts: { heading: { label: '标题字体', default: KAITI, options: [KAITI, SONG, SANS, SERIF] } }
    },
    presets: [
      { name: '汽水蓝', colors: { bg: '#EFFBFF', primary: '#0C4A6E', accent: '#38BDF8' } },
      { name: '西瓜红', colors: { bg: '#FEF2F2', primary: '#7F1D1D', accent: '#F87171' } },
      { name: '抹茶绿', colors: { bg: '#F0FDF4', primary: '#365314', accent: '#A3E635' } },
      { name: '夕照橙', colors: { bg: '#FFFBEB', primary: '#78350F', accent: '#FBBF24' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'rm-sea', type: 'overlay', background: 'linear-gradient(180deg, rgba(56,189,248,0) 0%, rgba(56,189,248,0) 75.56%, rgba(56,189,248,0.22) 100%)', x: 0, y: 0, width: 1080, height: 1350, zIndex: 1 },
      { id: 'rm-wave', type: 'image', objectFit: 'contain', objectPosition: 'center 100%', src: svgUri('<path d="M0 60 Q135 20 270 56 T540 52 T810 60 T1080 48 V120 H0 Z" fill="%2338bdf8" opacity="0.35"/><path d="M0 86 Q160 52 330 82 T660 78 T1080 84 V120 H0 Z" fill="%230ea5e9" opacity="0.3"/>', 1080, 120), x: 0, y: 0, width: 1080, height: 1350, zIndex: 2 },
      { id: 'rm-cork', type: 'shape', shapeKind: 'rect', x: 498, y: 176, width: 84, height: 34, fill: { $t: 'colors.accent' }, borderRadius: 10, zIndex: 3 },
      { id: 'rm-neck', type: 'shape', shapeKind: 'rect', x: 505, y: 206, width: 70, height: 66, fill: { $t: 'colors.accent' }, opacity: 0.32, border: { color: { $t: 'colors.primary' }, width: 3, style: 'solid' }, borderRadius: 8, zIndex: 3 },
      { id: 'rm-bottle', type: 'shape', shapeKind: 'rect', x: 428, y: 268, width: 224, height: 400, fill: { $t: 'colors.accent' }, opacity: 0.22, border: { color: { $t: 'colors.primary' }, width: 3, style: 'solid' }, borderRadius: 52, zIndex: 3 },
      { id: 'rm-marble', type: 'shape', shapeKind: 'circle', x: 500, y: 320, width: 80, height: 80, fill: '#FFFFFF', opacity: 0.92, border: { color: { $t: 'colors.primary' }, width: 2, style: 'solid' }, zIndex: 4, shadow: { color: 'rgba(12,74,110,0.25)', blur: 12, offsetX: 0, offsetY: 4 } },
      { id: 'rm-shine', type: 'shape', shapeKind: 'rect', x: 458, y: 300, width: 14, height: 250, fill: '#FFFFFF', opacity: 0.55, borderRadius: 7, zIndex: 4 },
      ...Array.from({ length: 10 }, (_, i) => { const r = seeded(i * 29 + 3); const s = 14 + r() * 26; const side = i % 2 ? 1 : -1; const x = 540 + side * (150 + r() * 240); const y = 300 + r() * 480
        return { id: `rm-bub-${i}`, type: 'shape', shapeKind: 'circle', x, y, width: s, height: s, fill: { $t: 'colors.accent' }, opacity: 0.28 + r() * 0.3, zIndex: 2, animation: { name: 'rise', duration: 3200 + i * 420, delay: i * 300, iterationCount: 'infinite', easing: 'ease-in-out' } } }) as any,
      { id: 'rm-fish', type: 'image', objectFit: 'contain', src: svgUri('<ellipse cx="34" cy="30" rx="24" ry="14" fill="%23fb923c"/><polygon points="58,30 78,18 76,42" fill="%23f97316"/><circle cx="24" cy="27" r="3" fill="%23431407"/><path d="M30 16 Q34 6 42 12" stroke="%23fdba74" stroke-width="4" fill="none"/>', 90, 60), x: 810, y: 300, width: 120, height: 80, zIndex: 3, animation: { name: 'drift', duration: 9000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'rm-kicker', type: 'text', content: 'SUMMER LIMITED · 夏 No.03', fontFamily: MONO, fontSize: 24, color: { $t: 'colors.accent' }, letterSpacing: 5, x: 120, y: 742, width: 500, height: 34, zIndex: 4, editable: { content: true } },
      { id: 'rm-title', type: 'text', content: '夏日限定', fontFamily: { $t: 'fonts.heading' }, fontSize: 124, fontWeight: '900', color: { $t: 'colors.primary' }, letterSpacing: 10, x: 108, y: 790, width: 860, height: 170, zIndex: 4, animation: { name: 'inkReveal', duration: 1100 }, editable: { content: true, fontSize: { type: 'range', min: 80, max: 160 }, position: true } },
      { id: 'rm-sub', type: 'text', content: 'Ramune · Sea Breeze · 傍晚六点的海风', fontFamily: SANS, fontStyle: 'italic', fontSize: 30, color: { $t: 'colors.primary' }, opacity: 0.7, x: 116, y: 978, width: 720, height: 44, zIndex: 4, animation: { name: 'fadeIn', duration: 900, delay: 600 }, editable: { content: true, fontSize: { type: 'range', min: 22, max: 42 }, position: true } },
      { id: 'rm-photo', type: 'image', src: '/images/photo/summer-sea-440x280.jpg', objectFit: 'cover', x: 116, y: 1050, width: 440, height: 230, rotation: -3, borderRadius: 10, zIndex: 4, shadow: { color: 'rgba(12,74,110,0.25)', blur: 20, offsetX: 0, offsetY: 8 }, editable: { src: { type: 'upload' }, position: true, size: { type: 'scale' } } },
      { id: 'rm-date', type: 'text', content: '2026.08.15 / 晴 · 34℃', fontFamily: MONO, fontSize: 22, color: { $t: 'colors.primary' }, opacity: 0.5, textAlign: 'right', x: 640, y: 1240, width: 320, height: 30, zIndex: 4, editable: { content: true } }
    ]
  },
  // 7. 角色设定卡（4:5）
  {
    id: 'acg-buster-sheet', name: '角色设定卡', version: '1.0.0', category: 'acg',
    tags: ['acg', 'buster', 'character', 'profile', '4:5'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23f6f4ee"/><rect x="10" y="10" width="80" height="80" rx="4" fill="%23fff" stroke="%23ec4899"/><rect x="10" y="10" width="80" height="5" fill="%23ec4899"/><rect x="16" y="22" width="26" height="32" fill="%23ec4899" opacity="0.25"/><rect x="48" y="24" width="30" height="6" fill="%2326262b"/><rect x="48" y="34" width="18" height="3" fill="%2326262b" opacity="0.5"/><rect x="16" y="62" width="68" height="3" fill="%2326262b" opacity="0.2"/><rect x="16" y="70" width="68" height="3" fill="%2326262b" opacity="0.2"/><rect x="16" y="78" width="44" height="3" fill="%2326262b" opacity="0.2"/></svg>',
    tokens: {
      colors: ACG_COLORS(['档案纸', '笔触黑', '档案粉'], ['#F6F4EE', '#26262B', '#EC4899'],
        [['#F6F4EE', '#F5F7FA', '#FFF7ED', '#F0FDF4'], ['#26262B', '#111827', '#292524', '#1E293B'], ['#EC4899', '#3B82F6', '#F59E0B', '#10B981']]),
      fonts: { heading: { label: '标题字体', default: KAITI, options: [KAITI, SONG, SANS, SERIF] } }
    },
    presets: [
      { name: '档案粉', colors: { bg: '#F6F4EE', primary: '#26262B', accent: '#EC4899' } },
      { name: '档案蓝', colors: { bg: '#F5F7FA', primary: '#111827', accent: '#3B82F6' } },
      { name: '档案橙', colors: { bg: '#FFF7ED', primary: '#292524', accent: '#F59E0B' } },
      { name: '档案绿', colors: { bg: '#F0FDF4', primary: '#1E293B', accent: '#10B981' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'bs-card', type: 'shape', shapeKind: 'rect', x: 80, y: 80, width: 920, height: 1190, fill: '#FFFFFF', borderRadius: 18, border: { color: { $t: 'colors.accent' }, width: 2, style: 'dashed' }, shadow: { color: 'rgba(38,38,43,0.12)', blur: 26, offsetX: 0, offsetY: 10 }, zIndex: 1 },
      { id: 'bs-band', type: 'shape', shapeKind: 'rect', x: 80, y: 80, width: 920, height: 10, fill: { $t: 'colors.accent' }, borderRadius: 5, zIndex: 2 },
      { id: 'bs-kicker', type: 'text', content: 'CHARACTER SHEET · 角色设定', fontFamily: MONO, fontSize: 24, color: { $t: 'colors.accent' }, letterSpacing: 5, x: 130, y: 122, width: 560, height: 34, zIndex: 3, editable: { content: true } },
      { id: 'bs-photo', type: 'image', src: '/images/photo/anime-character-380x480.jpg', objectFit: 'cover', x: 130, y: 190, width: 380, height: 480, borderRadius: 10, zIndex: 3, editable: { src: { type: 'upload' }, position: true, size: { type: 'scale' } } },
      { id: 'bs-photo-corner', type: 'shape', shapeKind: 'rect', x: 118, y: 178, width: 404, height: 504, fill: 'transparent', border: { color: { $t: 'colors.primary' }, width: 2, style: 'solid' }, zIndex: 4 },
      { id: 'bs-name', type: 'text', content: '星野 あかり', fontFamily: { $t: 'fonts.heading' }, fontSize: 84, fontWeight: '900', color: { $t: 'colors.primary' }, x: 560, y: 206, width: 420, height: 110, zIndex: 3, animation: { name: 'fadeInUp', duration: 800 }, editable: { content: true, fontSize: { type: 'range', min: 50, max: 104 }, position: true } },
      { id: 'bs-name-en', type: 'text', content: 'HOSHINO AKARI', fontFamily: MONO, fontSize: 22, color: { $t: 'colors.primary' }, opacity: 0.5, letterSpacing: 3, x: 562, y: 324, width: 400, height: 30, zIndex: 3, editable: { content: true } },
      { id: 'bs-role', type: 'text', content: '照明担当 / 队长 / 夜行性', fontFamily: SONG, fontSize: 28, color: { $t: 'colors.accent' }, x: 562, y: 372, width: 400, height: 40, zIndex: 3, editable: { content: true } },
      { id: 'bs-lb-1', type: 'text', content: '生日 BIRTH', fontFamily: MONO, fontSize: 20, color: { $t: 'colors.primary' }, opacity: 0.55, letterSpacing: 2, x: 130, y: 736, width: 150, height: 28, zIndex: 3 },
      { id: 'bs-vl-1', type: 'text', content: '4 月 1 日 · 白羊座', fontFamily: SONG, fontSize: 28, color: { $t: 'colors.primary' }, x: 300, y: 728, width: 560, height: 42, zIndex: 3, editable: { content: true } },
      { id: 'bs-r-1', group: 'bs-r-', type: 'shape', shapeKind: 'rect', x: 130, y: 790, width: 820, height: 1, fill: { $t: 'colors.primary' }, opacity: 0.14, zIndex: 3 },
      { id: 'bs-lb-2', type: 'text', content: '身高 HEIGHT', fontFamily: MONO, fontSize: 20, color: { $t: 'colors.primary' }, opacity: 0.55, letterSpacing: 2, x: 130, y: 812, width: 150, height: 28, zIndex: 3 },
      { id: 'bs-vl-2', type: 'text', content: '158 cm（踮脚 161）', fontFamily: SONG, fontSize: 28, color: { $t: 'colors.primary' }, x: 300, y: 804, width: 560, height: 42, zIndex: 3, editable: { content: true } },
      { id: 'bs-r-2', group: 'bs-r-', type: 'shape', shapeKind: 'rect', x: 130, y: 866, width: 820, height: 1, fill: { $t: 'colors.primary' }, opacity: 0.14, zIndex: 3 },
      { id: 'bs-lb-3', type: 'text', content: '喜好 LIKE', fontFamily: MONO, fontSize: 20, color: { $t: 'colors.primary' }, opacity: 0.55, letterSpacing: 2, x: 130, y: 888, width: 150, height: 28, zIndex: 3 },
      { id: 'bs-vl-3', type: 'text', content: '天象观测 · 胶片相机 · 波子汽水', fontFamily: SONG, fontSize: 28, color: { $t: 'colors.primary' }, x: 300, y: 880, width: 620, height: 42, zIndex: 3, editable: { content: true } },
      { id: 'bs-r-3', group: 'bs-r-', type: 'shape', shapeKind: 'rect', x: 130, y: 942, width: 820, height: 1, fill: { $t: 'colors.primary' }, opacity: 0.14, zIndex: 3 },
      { id: 'bs-lb-4', type: 'text', content: '声优 CV', fontFamily: MONO, fontSize: 20, color: { $t: 'colors.primary' }, opacity: 0.55, letterSpacing: 2, x: 130, y: 964, width: 150, height: 28, zIndex: 3 },
      { id: 'bs-vl-4', type: 'text', content: '山根 舞（新人）', fontFamily: SONG, fontSize: 28, color: { $t: 'colors.primary' }, x: 300, y: 956, width: 560, height: 42, zIndex: 3, editable: { content: true } },
      { id: 'bs-quote-bg', type: 'shape', shapeKind: 'rect', x: 130, y: 1030, width: 820, height: 120, fill: { $t: 'colors.accent' }, opacity: 0.08, borderRadius: 12, zIndex: 3 },
      { id: 'bs-quote', type: 'text', content: '「光是暗的地方，先准备好的那个人。」', fontFamily: KAITI, fontSize: 32, color: { $t: 'colors.primary' }, x: 160, y: 1064, width: 760, height: 52, zIndex: 4, animation: { name: 'fadeIn', duration: 900, delay: 500 }, editable: { content: true } },
      ...Array.from(['#光害防治', '#夜行者', '#队长味'], (t, i) => [
        { id: `bs-pill-${i}`, type: 'shape', shapeKind: 'rect', x: 130 + i * 220, y: 1176, width: 200, height: 48, fill: { $t: 'colors.accent' }, opacity: 0.14, borderRadius: 24, zIndex: 3 },
        { id: `bs-pill-t-${i}`, type: 'text', content: t, fontFamily: MONO, fontSize: 22, color: { $t: 'colors.accent' }, textAlign: 'center', x: 130 + i * 220, y: 1186, width: 200, height: 30, zIndex: 4 }
      ]).flat() as any,
      { id: 'bs-stamp', type: 'shape', shapeKind: 'circle', x: 790, y: 500, width: 150, height: 150, fill: 'transparent', border: { color: { $t: 'colors.accent' }, width: 3, style: 'solid' }, rotation: -12, zIndex: 4, animation: { name: 'pulse', duration: 2800, iterationCount: 'infinite' } },
      { id: 'bs-stamp-t', type: 'text', content: '设定\n确认', fontFamily: KAITI, fontSize: 34, fontWeight: '700', color: { $t: 'colors.accent' }, textAlign: 'center', lineHeight: 1.3, rotation: -12, x: 790, y: 530, width: 150, height: 92, zIndex: 5 },
      { id: 'bs-foot', type: 'text', content: 'NO. BSR-026 / 机密等级 B', fontFamily: MONO, fontSize: 20, color: { $t: 'colors.primary' }, opacity: 0.45, textAlign: 'right', x: 620, y: 1240, width: 360, height: 28, zIndex: 3 }
    ]
  },
  // 8. 动画小店暖帘（4:5）
  {
    id: 'acg-noren-shop', name: '动画小店暖帘', version: '1.0.0', category: 'acg',
    tags: ['acg', 'izakaya', 'noren', 'shop', '4:5'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23faf5ea"/><rect x="8" y="14" width="84" height="5" fill="%233f2e22"/><rect x="12" y="19" width="17" height="26" fill="%23c2410c"/><rect x="33" y="19" width="17" height="26" fill="%23c2410c"/><rect x="54" y="19" width="17" height="26" fill="%23c2410c"/><rect x="75" y="19" width="17" height="26" fill="%23c2410c"/><rect x="14" y="56" width="44" height="30" rx="3" fill="%233b3530"/><rect x="20" y="62" width="30" height="3" fill="%23fdf6e3"/><rect x="20" y="70" width="22" height="3" fill="%23fdf6e3" opacity="0.7"/><rect x="70" y="50" width="16" height="22" rx="8" fill="%23c2410c"/></svg>',
    tokens: {
      colors: {
        ...ACG_COLORS(['米纸', '老木', '柿染'], ['#FAF5EA', '#3F2E22', '#C2410C'],
          [['#FAF5EA', '#F5F5F4', '#EFF6FF', '#F7FEE7'], ['#3F2E22', '#1C1917', '#1E3A8A', '#292524'], ['#C2410C', '#DC2626', '#1D4ED8', '#0F766E']]),
        chalk: { label: '粉笔字', default: '#FDF6E3', options: ['#FDF6E3', '#F5F5F4', '#DBEAFE', '#ECFCCB'] },
        hot: { label: '限定色', default: '#FBBF24', options: ['#FBBF24', '#FCD34D', '#FDE047', '#86EFAC'] }
      },
      fonts: { heading: { label: '标题字体', default: KAITI, options: [KAITI, SONG, SERIF, SANS] } }
    },
    presets: [
      { name: '柿染暖冬', colors: { bg: '#FAF5EA', primary: '#3F2E22', accent: '#C2410C', chalk: '#FDF6E3', hot: '#FBBF24' } },
      { name: '朱漆祭典', colors: { bg: '#F5F5F4', primary: '#1C1917', accent: '#DC2626', chalk: '#F5F5F4', hot: '#FCD34D' } },
      { name: '蓝染深夜', colors: { bg: '#EFF6FF', primary: '#1E3A8A', accent: '#1D4ED8', chalk: '#DBEAFE', hot: '#FDE047' } },
      { name: '青越屋台', colors: { bg: '#F7FEE7', primary: '#292524', accent: '#0F766E', chalk: '#ECFCCB', hot: '#86EFAC' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'ns-beam', type: 'shape', shapeKind: 'rect', x: 60, y: 92, width: 960, height: 22, fill: { $t: 'colors.primary' }, borderRadius: 6, zIndex: 2 },
      ...Array.from(['小', '店', '欢', '迎'], (ch, i) => [
        { id: `ns-panel-${i}`, type: 'shape', shapeKind: 'rect', x: 96 + i * 234, y: 114, width: 214, height: 300, fill: { $t: 'colors.accent' }, opacity: 0.95, zIndex: 3, animation: { name: 'swing', duration: 5200 + i * 600, delay: i * 220, iterationCount: 'infinite', easing: 'ease-in-out' } },
        { id: `ns-panel-t-${i}`, type: 'text', content: ch, fontFamily: KAITI, fontSize: 96, fontWeight: '700', color: '#FFFFFF', textAlign: 'center', x: 96 + i * 234, y: 200, width: 214, height: 120, zIndex: 4 }
      ]).flat() as any,
      { id: 'ns-rope', type: 'shape', shapeKind: 'rect', x: 966, y: 114, width: 6, height: 70, fill: { $t: 'colors.primary' }, zIndex: 3 },
      { id: 'ns-lantern', type: 'shape', shapeKind: 'rect', x: 896, y: 180, width: 146, height: 190, fill: { $t: 'colors.accent' }, borderRadius: 72, zIndex: 3, animation: { name: 'swing', duration: 4600, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'ns-lantern-rib1', type: 'shape', shapeKind: 'rect', x: 900, y: 228, width: 138, height: 3, fill: { $t: 'colors.primary' }, opacity: 0.35, zIndex: 4 },
      { id: 'ns-lantern-rib2', type: 'shape', shapeKind: 'rect', x: 900, y: 276, width: 138, height: 3, fill: { $t: 'colors.primary' }, opacity: 0.35, zIndex: 4 },
      { id: 'ns-lantern-t', type: 'text', content: '夜', fontFamily: KAITI, fontSize: 66, fontWeight: '700', color: '#FFFFFF', textAlign: 'center', x: 896, y: 236, width: 146, height: 84, zIndex: 5 },
      { id: 'ns-board', type: 'shape', shapeKind: 'rect', x: 100, y: 520, width: 540, height: 400, fill: { $t: 'colors.primary' }, borderRadius: 14, border: { color: 'rgba(255,255,255,0.28)', width: 3, style: 'solid' }, zIndex: 2, shadow: { color: 'rgba(63,46,34,0.25)', blur: 22, offsetX: 0, offsetY: 10 } },
      { id: 'ns-board-title', type: 'text', content: '本日菜单', fontFamily: KAITI, fontSize: 40, fontWeight: '700', color: { $t: 'colors.chalk' }, x: 132, y: 548, width: 300, height: 54, zIndex: 3, animation: { name: 'fadeIn', duration: 800 }, editable: { content: true } },
      { id: 'ns-i1', type: 'text', content: '波子汽水 ……… ¥12', fontFamily: MONO, fontSize: 26, color: { $t: 'colors.chalk' }, opacity: 0.92, x: 132, y: 636, width: 440, height: 38, zIndex: 3, editable: { content: true } },
      { id: 'ns-i2', type: 'text', content: '玉子烧 · 两份 … ¥18', fontFamily: MONO, fontSize: 26, color: { $t: 'colors.chalk' }, opacity: 0.92, x: 132, y: 700, width: 440, height: 38, zIndex: 3, editable: { content: true } },
      { id: 'ns-i3', type: 'text', content: '今日的主菜 …… ¥28', fontFamily: MONO, fontSize: 26, color: { $t: 'colors.chalk' }, opacity: 0.92, x: 132, y: 764, width: 440, height: 38, zIndex: 3, editable: { content: true } },
      { id: 'ns-i4', type: 'text', content: '限定 · 与番剧同名套餐 ¥66', fontFamily: MONO, fontSize: 24, color: { $t: 'colors.hot' }, x: 132, y: 832, width: 460, height: 36, zIndex: 3, editable: { content: true } },
      { id: 'ns-photo', type: 'image', src: '/images/photo/izakaya-plate-340x250.jpg', objectFit: 'cover', x: 680, y: 560, width: 320, height: 240, rotation: 3, borderRadius: 12, zIndex: 2, shadow: { color: 'rgba(63,46,34,0.28)', blur: 20, offsetX: 0, offsetY: 8 }, editable: { src: { type: 'upload' }, position: true, size: { type: 'scale' } } },
      { id: 'ns-photo-tag', type: 'shape', shapeKind: 'rect', x: 700, y: 770, width: 140, height: 40, fill: { $t: 'colors.accent' }, borderRadius: 20, rotation: 3, zIndex: 3 },
      { id: 'ns-photo-tag-t', type: 'text', content: '实拍', fontFamily: KAITI, fontSize: 22, color: '#FFFFFF', textAlign: 'center', rotation: 3, x: 700, y: 778, width: 140, height: 26, zIndex: 4 },
      { id: 'ns-title', type: 'text', content: '今晚，吃点什么？', fontFamily: { $t: 'fonts.heading' }, fontSize: 78, fontWeight: '900', color: { $t: 'colors.primary' }, letterSpacing: 4, x: 100, y: 990, width: 880, height: 110, zIndex: 3, animation: { name: 'rise', duration: 900 }, editable: { content: true, fontSize: { type: 'range', min: 52, max: 96 }, position: true } },
      { id: 'ns-sub', type: 'text', content: 'OPEN 17:00 — 23:00 · 定休日：星期三', fontFamily: MONO, fontSize: 26, color: { $t: 'colors.primary' }, opacity: 0.65, letterSpacing: 2, x: 104, y: 1124, width: 620, height: 38, zIndex: 3, animation: { name: 'fadeIn', duration: 800, delay: 500 }, editable: { content: true } },
      { id: 'ns-foot', type: 'text', content: 'のれん / 暖帘小铺', fontFamily: KAITI, fontSize: 24, color: { $t: 'colors.accent' }, textAlign: 'right', x: 680, y: 1258, width: 320, height: 34, zIndex: 3 }
    ]
  },
  // 9. 漫速线封面（1:1）
  {
    id: 'acg-speedlines', name: '漫速线封面', version: '1.0.0', category: 'acg',
    tags: ['acg', 'manga', 'speedlines', 'impact', '1:1'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23fff7ed"/><g stroke="%23111827" stroke-width="1.5" opacity="0.55"><line x1="50" y1="44" x2="6" y2="6"/><line x1="50" y1="44" x2="94" y2="8"/><line x1="50" y1="44" x2="4" y2="70"/><line x1="50" y1="44" x2="96" y2="66"/><line x1="50" y1="44" x2="50" y2="0"/><line x1="50" y1="44" x2="20" y2="2"/></g><circle cx="50" cy="44" r="18" fill="%23ef4444"/><circle cx="50" cy="44" r="12" fill="%23fff7ed"/><rect x="0" y="78" width="100" height="22" fill="%23111827"/><rect x="10" y="84" width="50" height="8" fill="%23fff7ed"/></svg>',
    tokens: {
      colors: ACG_COLORS(['纸白', '墨线', '冲击红'], ['#FFF7ED', '#111827', '#EF4444'],
        [['#FFF7ED', '#FAFAF9', '#FEF2F2', '#F8FAFC'], ['#111827', '#1C1917', '#0F172A', '#292524'], ['#EF4444', '#F97316', '#8B5CF6', '#0EA5E9']]),
      fonts: { heading: { label: '标题字体', default: KAITI, options: [KAITI, SANS, SONG, SERIF] } }
    },
    presets: [
      { name: '周刊红', colors: { bg: '#FFF7ED', primary: '#111827', accent: '#EF4444' } },
      { name: '冲击橙', colors: { bg: '#FAFAF9', primary: '#1C1917', accent: '#F97316' } },
      { name: '决战紫', colors: { bg: '#FEF2F2', primary: '#0F172A', accent: '#8B5CF6' } },
      { name: '热血蓝', colors: { bg: '#F8FAFC', primary: '#292524', accent: '#0EA5E9' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1080, defaultWidth: 1080, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'sl-lines', type: 'image', objectFit: 'fill', src: (() => { const rnd = seeded(5); let ln = ''
          for (let i = 0; i < 60; i++) { const a = (i / 60) * Math.PI * 2 + rnd() * 0.04; const r1 = 190 + rnd() * 70; const w = 1.5 + rnd() * 5
            ln += `<line x1="${(540 + r1 * Math.cos(a)).toFixed(1)}" y1="${(540 + r1 * Math.sin(a)).toFixed(1)}" x2="${(540 + 950 * Math.cos(a)).toFixed(1)}" y2="${(540 + 950 * Math.sin(a)).toFixed(1)}" stroke="%23111827" stroke-width="${w.toFixed(1)}" opacity="${(0.26 + rnd() * 0.4).toFixed(2)}"/>` }
          return svgUri(ln, 1080, 1080) })(), x: 0, y: 0, width: 1080, height: 1080, zIndex: 1 },
      { id: 'sl-burst', type: 'image', objectFit: 'fill', src: (() => { const pts = Array.from({ length: 20 }, (_, i) => { const a = ((i * 18 - 90) * Math.PI) / 180; const r = i % 2 ? 140 : 270; return `${(540 + r * Math.cos(a)).toFixed(1)},${(540 + r * Math.sin(a)).toFixed(1)}` }).join(' ')
          return svgUri(`<polygon points="${pts}" fill="%23ef4444"/>`, 1080, 1080) })(), x: 0, y: 0, width: 1080, height: 1080, zIndex: 2, animation: { name: 'zoomIn', duration: 700 } },
      { id: 'sl-boom', type: 'text', content: '大·爆·炸', fontFamily: { $t: 'fonts.heading' }, fontSize: 96, fontWeight: '900', color: '#FFFFFF', letterSpacing: 2, rotation: -8, textAlign: 'center', x: 240, y: 480, width: 600, height: 120, zIndex: 3, animation: { name: 'heartbeat', duration: 2400, iterationCount: 'infinite' }, editable: { content: true, fontSize: { type: 'range', min: 60, max: 130 }, position: true } },
      { id: 'sl-kicker', type: 'text', content: 'SHONEN WEEKLY · 週刊', fontFamily: MONO, fontSize: 24, color: { $t: 'colors.primary' }, opacity: 0.65, letterSpacing: 6, x: 90, y: 80, width: 520, height: 32, zIndex: 3, editable: { content: true } },
      { id: 'sl-ep', type: 'text', content: '第 12 话', fontFamily: KAITI, fontSize: 34, fontWeight: '700', color: { $t: 'colors.primary' }, x: 880, y: 76, width: 130, height: 120, rotation: 90, zIndex: 3, editable: { content: true } },
      ...Array.from({ length: 40 }, (_, i) => { const col = i % 10; const row = Math.floor(i / 10)
        return { id: `sl-dot-${i}`, type: 'shape', shapeKind: 'circle', x: 636 + col * 30, y: 150 + row * 30, width: 8, height: 8, fill: { $t: 'colors.primary' }, opacity: 0.22, zIndex: 2 } }) as any,
      { id: 'sl-band', type: 'shape', shapeKind: 'rect', x: 0, y: 840, width: 1080, height: 240, fill: { $t: 'colors.primary' }, zIndex: 3 },
      { id: 'sl-band-line', type: 'shape', shapeKind: 'rect', x: 0, y: 840, width: 1080, height: 6, fill: { $t: 'colors.accent' }, zIndex: 4 },
      { id: 'sl-title', type: 'text', content: '这周的追番记录', fontFamily: { $t: 'fonts.heading' }, fontSize: 76, fontWeight: '900', color: { $t: 'colors.bg' }, letterSpacing: 6, x: 90, y: 890, width: 700, height: 100, zIndex: 4, animation: { name: 'slideInLeft', duration: 700, delay: 300 }, editable: { content: true, fontSize: { type: 'range', min: 48, max: 96 }, position: true } },
      { id: 'sl-sub', type: 'text', content: 'EP.12 — 决战前夜 · 全彩页', fontFamily: MONO, fontSize: 26, color: { $t: 'colors.bg' }, opacity: 0.75, letterSpacing: 3, x: 92, y: 1002, width: 560, height: 36, zIndex: 4, editable: { content: true } },
      { id: 'sl-price', type: 'shape', shapeKind: 'circle', x: 880, y: 920, width: 120, height: 120, fill: { $t: 'colors.accent' }, zIndex: 5, animation: { name: 'pulse', duration: 2600, iterationCount: 'infinite' } },
      { id: 'sl-price-t', type: 'text', content: '¥15', fontFamily: MONO, fontSize: 36, fontWeight: '700', color: '#FFFFFF', textAlign: 'center', x: 880, y: 958, width: 120, height: 44, zIndex: 6 }
    ]
  },
  // 10. 魔阵卡（1:1）
  {
    id: 'acg-magic-circle', name: '魔阵卡', version: '1.0.0', category: 'acg',
    tags: ['acg', 'magic', 'grimoire', 'rune', '1:1'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%230e0b24"/><circle cx="50" cy="50" r="36" fill="none" stroke="%23a78bfa" stroke-width="1.5" stroke-dasharray="4 3"/><circle cx="50" cy="50" r="26" fill="none" stroke="%23a78bfa" stroke-width="1"/><polygon points="50,26 71,62 29,62" fill="none" stroke="%23a78bfa" stroke-width="1.2"/><polygon points="50,74 29,38 71,38" fill="none" stroke="%23a78bfa" stroke-width="1.2"/><circle cx="50" cy="50" r="6" fill="%23a78bfa" opacity="0.5"/></svg>',
    tokens: {
      colors: ACG_COLORS(['禁书页', '咒文光', '法阵紫'], ['#0E0B24', '#E9D5FF', '#A78BFA'],
        [['#0E0B24', '#0B1220', '#1A0B2E', '#042F2E'], ['#E9D5FF', '#C7D2FE', '#F5D0FE', '#99F6E4'], ['#A78BFA', '#38BDF8', '#E879F9', '#34D399']]),
      fonts: { heading: { label: '标题字体', default: SERIF, options: [SERIF, SONG, KAITI, SANS] } }
    },
    presets: [
      { name: '紫界禁书', colors: { bg: '#0E0B24', primary: '#E9D5FF', accent: '#A78BFA' } },
      { name: '苍蓝典页', colors: { bg: '#0B1220', primary: '#C7D2FE', accent: '#38BDF8' } },
      { name: '绯红魔導', colors: { bg: '#1A0B2E', primary: '#F5D0FE', accent: '#E879F9' } },
      { name: '翡翠秘约', colors: { bg: '#042F2E', primary: '#99F6E4', accent: '#34D399' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1080, defaultWidth: 1080, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'mc-ring', type: 'image', objectFit: 'contain', src: (() => { const c = 450; const p: string[] = []
          p.push('<circle cx="450" cy="450" r="440" fill="none" stroke="%23a78bfa" stroke-width="3" stroke-dasharray="18 12" opacity="0.85"/>')
          p.push('<circle cx="450" cy="450" r="416" fill="none" stroke="%23a78bfa" stroke-width="1.5" opacity="0.6"/>')
          for (let i = 0; i < 60; i++) { const a = (i * 6 * Math.PI) / 180; p.push(`<line x1="${(c + 372 * Math.cos(a)).toFixed(1)}" y1="${(c + 372 * Math.sin(a)).toFixed(1)}" x2="${(c + 410 * Math.cos(a)).toFixed(1)}" y2="${(c + 410 * Math.sin(a)).toFixed(1)}" stroke="%23a78bfa" stroke-width="${i % 5 ? 1.5 : 4}" opacity="0.7"/>`) }
          for (let i = 0; i < 12; i++) { const a = (i * 30 * Math.PI) / 180; const x = c + 392 * Math.cos(a); const y = c + 392 * Math.sin(a); p.push(`<rect x="${(x - 8).toFixed(1)}" y="${(y - 8).toFixed(1)}" width="16" height="16" fill="%23a78bfa" opacity="0.75" transform="rotate(${i * 30} ${x.toFixed(1)} ${y.toFixed(1)})"/>`) }
          p.push('<circle cx="450" cy="450" r="300" fill="none" stroke="%23a78bfa" stroke-width="2" opacity="0.75"/>')
          const tri = (rot: number) => Array.from({ length: 3 }, (_, i) => { const a = ((rot + i * 120) * Math.PI) / 180; return `${(c + 300 * Math.cos(a)).toFixed(1)},${(c + 300 * Math.sin(a)).toFixed(1)}` }).join(' ')
          p.push(`<polygon points="${tri(-90)}" fill="%23a78bfa" fill-opacity="0.06" stroke="%23a78bfa" stroke-width="2.5"/>`)
          p.push(`<polygon points="${tri(-30)}" fill="%23a78bfa" fill-opacity="0.06" stroke="%23a78bfa" stroke-width="2.5"/>`)
          p.push('<circle cx="450" cy="450" r="150" fill="none" stroke="%23a78bfa" stroke-width="1.5" stroke-dasharray="6 8" opacity="0.7"/>')
          return svgUri(p.join(''), 900, 900) })(), x: 90, y: 90, width: 900, height: 900, zIndex: 1, animation: { name: 'spinSlow', duration: 42000, iterationCount: 'infinite', easing: 'linear' } },
      { id: 'mc-glow', type: 'shape', shapeKind: 'circle', x: 330, y: 330, width: 420, height: 420, fill: { $t: 'colors.accent' }, opacity: 0.12, zIndex: 1, animation: { name: 'pulse', duration: 3600, iterationCount: 'infinite' } },
      ...Array.from({ length: 14 }, (_, i) => { const r = seeded(i * 31 + 9); const a = r() * Math.PI * 2; const rad = 200 + r() * 280; const x = 540 + rad * Math.cos(a); const y = 540 + rad * Math.sin(a); const s = 5 + r() * 9
        return { id: `mc-sp-${i}`, type: 'shape', shapeKind: 'circle', x, y, width: s, height: s, fill: { $t: 'colors.primary' }, opacity: 0.35 + r() * 0.5, zIndex: 2, animation: { name: 'twinkle', duration: 2000 + i * 240, delay: i * 190, iterationCount: 'infinite' } } }) as any,
      { id: 'mc-kicker', type: 'text', content: 'GRIMOIRE · 第 VII 页', fontFamily: MONO, fontSize: 24, color: { $t: 'colors.accent' }, letterSpacing: 8, textAlign: 'center', x: 240, y: 130, width: 600, height: 34, zIndex: 3, editable: { content: true } },
      { id: 'mc-title', type: 'text', content: '禁忌咒文', fontFamily: { $t: 'fonts.heading' }, fontSize: 132, fontWeight: '700', color: { $t: 'colors.primary' }, letterSpacing: 18, textAlign: 'center', x: 140, y: 440, width: 800, height: 180, zIndex: 3, shadow: { color: 'rgba(167,139,250,0.55)', blur: 40, offsetX: 0, offsetY: 0 }, animation: { name: 'inkReveal', duration: 1200 }, editable: { content: true, fontSize: { type: 'range', min: 80, max: 170 }, position: true } },
      { id: 'mc-sub', type: 'text', content: 'Incantation of the Forgotten Page', fontFamily: SERIF, fontStyle: 'italic', fontSize: 30, color: { $t: 'colors.accent' }, letterSpacing: 2, textAlign: 'center', x: 190, y: 640, width: 700, height: 44, zIndex: 3, animation: { name: 'fadeIn', duration: 900, delay: 700 }, editable: { content: true, fontSize: { type: 'range', min: 22, max: 44 }, position: true } },
      { id: 'mc-formula', type: 'text', content: '∮ E·dA = q / ε₀   ·   RANK S · LVL.99', fontFamily: MONO, fontSize: 22, color: { $t: 'colors.primary' }, opacity: 0.5, letterSpacing: 2, textAlign: 'center', x: 240, y: 830, width: 600, height: 32, zIndex: 3, editable: { content: true } },
      { id: 'mc-seal', type: 'shape', shapeKind: 'circle', x: 472, y: 900, width: 136, height: 136, fill: 'transparent', border: { color: { $t: 'colors.accent' }, width: 2, style: 'dashed' }, zIndex: 3, animation: { name: 'spinSlow', duration: 30000, iterationCount: 'infinite', easing: 'linear' } },
      { id: 'mc-seal-t', type: 'text', content: '封印中', fontFamily: KAITI, fontSize: 30, fontWeight: '700', color: { $t: 'colors.accent' }, textAlign: 'center', x: 472, y: 946, width: 136, height: 44, zIndex: 4 },
      { id: 'mc-corner1', group: 'mc-corner', type: 'shape', shapeKind: 'rect', x: 60, y: 60, width: 26, height: 26, fill: { $t: 'colors.accent' }, opacity: 0.8, rotation: 45, zIndex: 3, animation: { name: 'sparkle', duration: 2800, iterationCount: 'infinite' } },
      { id: 'mc-corner2', group: 'mc-corner', type: 'shape', shapeKind: 'rect', x: 994, y: 60, width: 26, height: 26, fill: { $t: 'colors.accent' }, opacity: 0.8, rotation: 45, zIndex: 3, animation: { name: 'sparkle', duration: 2800, delay: 700, iterationCount: 'infinite' } },
      { id: 'mc-corner3', group: 'mc-corner', type: 'shape', shapeKind: 'rect', x: 60, y: 994, width: 26, height: 26, fill: { $t: 'colors.accent' }, opacity: 0.8, rotation: 45, zIndex: 3, animation: { name: 'sparkle', duration: 2800, delay: 1400, iterationCount: 'infinite' } },
      { id: 'mc-corner4', group: 'mc-corner', type: 'shape', shapeKind: 'rect', x: 994, y: 994, width: 26, height: 26, fill: { $t: 'colors.accent' }, opacity: 0.8, rotation: 45, zIndex: 3, animation: { name: 'sparkle', duration: 2800, delay: 2100, iterationCount: 'infinite' } }
    ]
  },
  // 11. 少女心网点页（9:16）
  {
    id: 'acg-shoujo-tone', name: '少女心网点页', version: '1.0.0', category: 'acg',
    tags: ['acg', 'shoujo', 'screentone', 'romance', '9:16'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23fdf2f8"/><rect x="8" y="8" width="84" height="84" fill="none" stroke="%23500724" stroke-width="1.5"/><g fill="%23f472b6" opacity="0.5"><circle cx="30" cy="30" r="2"/><circle cx="42" cy="30" r="2"/><circle cx="54" cy="30" r="2"/><circle cx="36" cy="40" r="2"/><circle cx="48" cy="40" r="2"/><circle cx="60" cy="40" r="2"/></g><circle cx="66" cy="22" r="9" fill="%23fff" stroke="%23500724"/><rect x="20" y="60" width="48" height="8" fill="%23500724"/><circle cx="24" cy="80" r="5" fill="%23f472b6"/></svg>',
    tokens: {
      colors: ACG_COLORS(['柔粉纸', '深莓墨', '蔷薇色'], ['#FDF2F8', '#500724', '#F472B6'],
        [['#FDF2F8', '#EFF6FF', '#FEFCE8', '#F5F3FF'], ['#500724', '#1E1B4B', '#713F12', '#312E81'], ['#F472B6', '#818CF8', '#FACC15', '#C084FC']]),
      fonts: { heading: { label: '标题字体', default: KAITI, options: [KAITI, SONG, SERIF, SANS] } }
    },
    presets: [
      { name: '桃色初恋', colors: { bg: '#FDF2F8', primary: '#500724', accent: '#F472B6' } },
      { name: '蓝色初恋', colors: { bg: '#EFF6FF', primary: '#1E1B4B', accent: '#818CF8' } },
      { name: '奶油午后', colors: { bg: '#FEFCE8', primary: '#713F12', accent: '#FACC15' } },
      { name: '紫罗兰夜', colors: { bg: '#F5F3FF', primary: '#312E81', accent: '#C084FC' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1920, defaultWidth: 1080, defaultHeight: 1920, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'sj-tone', type: 'image', objectFit: 'fill', src: (() => { let dots = ''
          for (let row = 0; row < 22; row++) for (let col = 0; col < 46; col++) dots += `<circle cx="${col * 26 + (row % 2) * 13}" cy="${row * 26}" r="4.2" fill="%23f472b6" opacity="0.32"/>`
          return svgUri(dots, 1200, 570) })(), x: -40, y: 640, width: 1160, height: 550, rotation: -7, zIndex: 1 },
      { id: 'sj-frame-outer', type: 'shape', shapeKind: 'rect', x: 60, y: 60, width: 960, height: 1800, fill: 'transparent', border: { color: { $t: 'colors.primary' }, width: 3, style: 'solid' }, zIndex: 4 },
      { id: 'sj-frame-inner', type: 'shape', shapeKind: 'rect', x: 82, y: 82, width: 916, height: 1756, fill: 'transparent', border: { color: { $t: 'colors.accent' }, width: 1.5, style: 'dashed' }, zIndex: 4 },
      { id: 'sj-photo', type: 'image', src: '/images/photo/shoujo-sketch-520x640.jpg', objectFit: 'cover', x: 280, y: 300, width: 520, height: 640, borderRadius: 260, zIndex: 2, shadow: { color: 'rgba(80,7,36,0.22)', blur: 28, offsetX: 0, offsetY: 10 }, editable: { src: { type: 'upload' }, position: true, size: { type: 'scale' } } },
      { id: 'sj-photo-ring', type: 'shape', shapeKind: 'rect', x: 262, y: 282, width: 556, height: 676, fill: 'transparent', border: { color: { $t: 'colors.primary' }, width: 2.5, style: 'solid' }, borderRadius: 278, zIndex: 3 },
      { id: 'sj-bubble', type: 'shape', shapeKind: 'circle', x: 730, y: 190, width: 240, height: 240, fill: '#FFFFFF', border: { color: { $t: 'colors.primary' }, width: 3, style: 'solid' }, zIndex: 3, animation: { name: 'float', duration: 4200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'sj-bubble-t', type: 'text', content: '喜欢！', fontFamily: KAITI, fontSize: 52, fontWeight: '900', color: { $t: 'colors.primary' }, textAlign: 'center', rotation: 8, x: 730, y: 280, width: 240, height: 66, zIndex: 4, editable: { content: true } },
      { id: 'sj-bubble-dot', type: 'shape', shapeKind: 'circle', x: 700, y: 420, width: 26, height: 26, fill: '#FFFFFF', border: { color: { $t: 'colors.primary' }, width: 2.5, style: 'solid' }, zIndex: 3 },
      ...Array.from({ length: 3 }, (_, i) => ({ id: `sj-flower-${i}`, type: 'image', objectFit: 'contain', src: svgUri('<circle cx="30" cy="18" r="11" fill="%23f472b6"/><circle cx="44" cy="28" r="11" fill="%23f9a8d4"/><circle cx="16" cy="28" r="11" fill="%23f9a8d4"/><circle cx="24" cy="42" r="11" fill="%23f472b6"/><circle cx="36" cy="42" r="11" fill="%23fb7185"/><circle cx="30" cy="30" r="7" fill="%23fff7ed"/>', 60, 56), x: [120, 900, 150][i], y: [1560, 1620, 700][i], width: 92, height: 86, zIndex: 3, animation: { name: 'twinkle', duration: 3200 + i * 600, delay: i * 500, iterationCount: 'infinite' } })) as any,
      { id: 'sj-title-hl', type: 'shape', shapeKind: 'rect', x: 116, y: 1060, width: 848, height: 190, fill: { $t: 'colors.accent' }, opacity: 0.16, zIndex: 2 },
      { id: 'sj-title', type: 'text', content: '「喜欢」藏进\n网点里', fontFamily: { $t: 'fonts.heading' }, fontSize: 96, fontWeight: '900', color: { $t: 'colors.primary' }, lineHeight: 1.35, x: 140, y: 1080, width: 800, height: 270, zIndex: 3, animation: { name: 'fadeInUp', duration: 900 }, editable: { content: true, fontSize: { type: 'range', min: 60, max: 120 }, position: true } },
      { id: 'sj-sub', type: 'text', content: 'Screentone of First Love · 第 1 话', fontFamily: MONO, fontSize: 26, color: { $t: 'colors.accent' }, letterSpacing: 3, textAlign: 'center', x: 140, y: 1408, width: 800, height: 38, zIndex: 3, animation: { name: 'fadeIn', duration: 800, delay: 500 }, editable: { content: true } },
      { id: 'sj-side', type: 'text', content: 'SPECIAL FEATURE', fontFamily: MONO, fontSize: 22, color: { $t: 'colors.primary' }, opacity: 0.4, letterSpacing: 8, rotation: -90, x: 26, y: 880, width: 350, height: 30, zIndex: 3 },
      { id: 'sj-foot', type: 'text', content: '少女 COMIC · 2026 年 10 月号 · 定价 ¥18', fontFamily: SONG, fontSize: 24, color: { $t: 'colors.primary' }, opacity: 0.55, textAlign: 'center', x: 140, y: 1770, width: 800, height: 34, zIndex: 3, editable: { content: true } }
    ]
  }
]

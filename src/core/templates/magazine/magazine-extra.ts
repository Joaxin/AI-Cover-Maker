// src/core/templates/magazine/magazine-extra.ts
// 杂志风扩展模板：刊头/coverline/条码/半调网点等版式元素，照片一律 Lorem Picsum 占位
import type { Template } from '@/types/types'
import { seededInt } from '../_fx/common'

const seeded = seededInt

// ---------- 背景纹理（透明 SVG，叠在 backgroundColor token 上）----------

function halftone(w: number, h: number, fill = 'rgba(23,24,28,0.06)', r = 2.6, gap = 26) {
  return 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '"><defs><pattern id="ht" width="' + gap + '" height="' + gap + '" patternUnits="userSpaceOnUse"><circle cx="' + gap / 2 + '" cy="' + gap / 2 + '" r="' + r + '" fill="' + fill + '"/></pattern></defs><rect width="' + w + '" height="' + h + '" fill="url(%23ht)"/></svg>'
}
function paperGrid(w: number, h: number, gap = 90, stroke = 'rgba(31,36,48,0.07)') {
  let s = ''
  for (let x = gap; x < w; x += gap) s += `<line x1="${x}" y1="0" x2="${x}" y2="${h}" stroke="${stroke}" stroke-width="1"/>`
  for (let y = gap; y < h; y += gap) s += `<line x1="0" y1="${y}" x2="${w}" y2="${y}" stroke="${stroke}" stroke-width="1"/>`
  return 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '">' + s + '</svg>'
}
function barcode(w: number, h: number, fill = '%23ffffff', seed = 42) {
  const rnd = seeded(seed)
  let bars = '', x = 6
  while (x < w - 10) { const bw = 2 + rnd() % 6; bars += `<rect x="${x}" y="0" width="${bw}" height="${h}" fill="${fill}"/>`; x += bw + 2 + rnd() % 4 }
  return 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '">' + bars + '</svg>'
}
function filmSprocket(w: number, h: number, holeFill: string, tapeColor: string) {
  let s = `<rect x="${w / 2 - 36}" y="0" width="72" height="${h}" fill="${tapeColor}"/>`
  for (let y = 14; y < h - 30; y += 68) s += `<rect x="${w / 2 - 20}" y="${y}" width="40" height="34" rx="10" fill="${holeFill}"/>`
  return 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '">' + s + '</svg>'
}
function starPts(cx: number, cy: number, R: number, r: number, n = 5) {
  const p: string[] = []
  for (let i = 0; i < n * 2; i++) { const rad = i % 2 === 0 ? R : r; const a = (Math.PI * i) / n - Math.PI / 2; p.push((cx + Math.cos(a) * rad).toFixed(1) + ',' + (cy + Math.sin(a) * rad).toFixed(1)) }
  return p.join(' ')
}
function starburst(size: number, fill: string, stroke: string) {
  return 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="' + size + '" height="' + size + '" viewBox="0 0 100 100"><polygon points="' + starPts(50, 50, 48, 32, 12) + '" fill="' + fill + '" stroke="' + stroke + '" stroke-width="2.5" stroke-linejoin="round"/></svg>'
}
function lineChart(w: number, h: number, stroke: string, seed = 99) {
  const rnd = seeded(seed)
  const pts = Array.from({ length: 9 }, (_, i) => `${(i * w / 8).toFixed(1)},${(18 + rnd() % (h - 36)).toFixed(1)}`).join(' ')
  return 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '"><polyline points="' + pts + '" fill="none" stroke="' + stroke + '" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="' + w + '" cy="' + pts.split(' ').pop()!.split(',')[1] + '" r="6" fill="' + stroke + '"/></svg>'
}

// ---------- 原创插画 ----------
const GUITARIST = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="220" height="300" viewBox="0 0 220 300"><circle cx="96" cy="48" r="26" fill="%23f8fafc"/><path d="M72 74 Q96 60 122 76 L134 156 Q100 170 64 156 Z" fill="%23f8fafc"/><path d="M126 92 L188 148" stroke="%23f8fafc" stroke-width="11" stroke-linecap="round"/><ellipse cx="148" cy="216" rx="52" ry="46" fill="%23fbbf24"/><ellipse cx="148" cy="216" rx="13" ry="12" fill="%231f2937"/><line x1="176" y1="188" x2="214" y2="120" stroke="%23f8fafc" stroke-width="8" stroke-linecap="round"/><path d="M74 160 L52 292 M116 162 L136 292" stroke="%23f8fafc" stroke-width="14" stroke-linecap="round"/></svg>'

// ---------- 可复用字体 / tokens ----------
const SERIF = 'Didot, Georgia, "Times New Roman", serif'
const SONG = 'Songti SC, SimSun, serif'
const SANS = 'Helvetica, Arial, sans-serif'
const IMPACT = 'Impact, "Arial Black", sans-serif'
const MAG_COLORS = (labels: [string, string, string], def: { bg: string; primary: string; accent: string }, opts: { bg: string[]; primary: string[]; accent: string[] }) => ({
  bg: { label: labels[0], default: def.bg, options: opts.bg },
  primary: { label: labels[1], default: def.primary, options: opts.primary },
  accent: { label: labels[2], default: def.accent, options: opts.accent }
})

export const magazineExtraTemplates: Template[] = [
  // 1. 时尚大刊封面（4:5）
  {
    id: 'mag-fashion-cover', name: '时尚大刊封面 (4:5)', version: '1.0.0', category: 'magazine', tags: ['magazine', 'fashion', 'editorial', 'cover', '4:5'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="125" viewBox="0 0 100 125"><rect width="100" height="125" fill="%230e0e12"/><rect x="18" y="24" width="64" height="86" fill="%23334155"/><rect x="14" y="10" width="72" height="8" fill="%23ffffff"/><circle cx="82" cy="34" r="8" fill="none" stroke="%23d9a441" stroke-width="2.5"/></svg>',
    tokens: {
      colors: MAG_COLORS(['底色', '刊头', '强调'], { bg: '#0E0E12', primary: '#FFFFFF', accent: '#D9A441' }, {
        bg: ['#0E0E12', '#1C1917', '#0F1D1A', '#221528'],
        primary: ['#FFFFFF', '#F5F0E6', '#FDE68A', '#E7E5E4'],
        accent: ['#D9A441', '#E11D48', '#34D399', '#C4B5FD']
      }),
      fonts: { heading: { label: '刊头字体', default: SERIF, options: [SERIF, SONG, 'Playfair Display, serif'] } }
    },
    presets: [
      { name: '琥珀夜色', colors: { bg: '#0E0E12', primary: '#FFFFFF', accent: '#D9A441' } },
      { name: '朱红摩登', colors: { bg: '#221528', primary: '#F5F0E6', accent: '#E11D48' } },
      { name: '松林墨绿', colors: { bg: '#0F1D1A', primary: '#FDE68A', accent: '#34D399' } },
      { name: '奶油黑金', colors: { bg: '#1C1917', primary: '#E7E5E4', accent: '#C4B5FD' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'fashion-photo', type: 'image', src: '/images/photo/lumiere-cover-1080x1350.jpg', objectFit: 'cover', x: 0, y: 0, width: 1080, height: 1350, zIndex: 1, editable: { src: { type: 'upload' }, position: true } },
      { id: 'fashion-scrim-top', type: 'overlay', background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 22%)', x: 0, y: 0, width: 1080, height: 1350, zIndex: 2 },
      { id: 'fashion-scrim-bottom', type: 'overlay', background: 'linear-gradient(to top, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0) 38%)', x: 0, y: 0, width: 1080, height: 1350, zIndex: 2 },
      { id: 'fashion-masthead', type: 'text', content: 'LUMIÈRE', fontFamily: { $t: 'fonts.heading' }, fontSize: 150, fontWeight: '900', color: { $t: 'colors.primary' }, textAlign: 'center', letterSpacing: 14, x: 40, y: 48, width: 1000, height: 170, zIndex: 4, animation: { name: 'fadeInDown', duration: 900 }, editable: { content: true, fontSize: { type: 'range', min: 96, max: 190 }, position: true } },
      { id: 'fashion-issue', type: 'text', content: 'ISSUE Nº 42 · 时装之秋', fontFamily: SANS, fontSize: 26, fontWeight: '600', color: { $t: 'colors.accent' }, textAlign: 'center', letterSpacing: 4, x: 40, y: 232, width: 1000, height: 34, zIndex: 4, animation: { name: 'fadeIn', duration: 800, delay: 350 }, editable: { content: true } },
      { id: 'fashion-line-left', type: 'text', content: '金秋色彩\n米兰现场直击', fontFamily: { $t: 'fonts.heading' }, fontSize: 46, fontWeight: '800', color: 'rgba(255,255,255,0.94)', lineHeight: 1.45, x: 70, y: 540, width: 430, height: 150, zIndex: 4, shadow: { color: 'rgba(0,0,0,0.55)', blur: 12, offsetX: 0, offsetY: 4 }, animation: { name: 'slideInLeft', duration: 800, delay: 500 }, editable: { content: true, position: true } },
      { id: 'fashion-line-right', type: 'text', content: '十位设计师\n的年度问答', fontFamily: { $t: 'fonts.heading' }, fontSize: 40, fontWeight: '700', color: 'rgba(255,255,255,0.88)', textAlign: 'right', lineHeight: 1.45, x: 600, y: 620, width: 410, height: 130, zIndex: 4, shadow: { color: 'rgba(0,0,0,0.5)', blur: 10, offsetX: 0, offsetY: 3 }, animation: { name: 'slideInRight', duration: 800, delay: 650 }, editable: { content: true, position: true } },
      { id: 'fashion-badge-ring', type: 'shape', shapeKind: 'circle', x: 872, y: 300, width: 148, height: 148, border: { color: { $t: 'colors.accent' }, width: 5 }, zIndex: 4, animation: { name: 'pulse', duration: 2600, iterationCount: 'infinite' } },
      { id: 'fashion-badge-text', type: 'text', content: '新刊', fontFamily: { $t: 'fonts.heading' }, fontSize: 44, fontWeight: '900', color: { $t: 'colors.accent' }, textAlign: 'center', x: 872, y: 350, width: 148, height: 56, zIndex: 4, editable: { content: true } },
      { id: 'fashion-title', type: 'text', content: '风尚志', fontFamily: { $t: 'fonts.heading' }, fontSize: 120, fontWeight: '900', color: { $t: 'colors.primary' }, letterSpacing: 10, x: 80, y: 1030, width: 700, height: 130, zIndex: 4, shadow: { color: 'rgba(0,0,0,0.6)', blur: 16, offsetX: 0, offsetY: 5 }, animation: { name: 'rise', duration: 900, delay: 300 }, editable: { content: true, fontSize: { type: 'range', min: 80, max: 150 }, position: true } },
      { id: 'fashion-subtitle', type: 'text', content: 'AUTUMN EDIT · 潮流季刊', fontFamily: SANS, fontSize: 28, fontWeight: '600', color: { $t: 'colors.accent' }, letterSpacing: 5, x: 88, y: 1172, width: 640, height: 36, zIndex: 4, editable: { content: true } },
      { id: 'fashion-barcode', type: 'image', src: barcode(170, 46, '%23ffffff'), x: 828, y: 1266, width: 170, height: 46, zIndex: 4 }
    ]
  },
  // 2. 日系极简杂志（1:1）
  {
    id: 'mag-japan-minimal', name: '日系极简杂志 (1:1)', version: '1.0.0', category: 'magazine', tags: ['magazine', 'japan', 'minimal', 'zen', '1:1'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23f4f1e8"/><rect x="52" y="30" width="30" height="40" fill="%23b6a68d"/><rect x="14" y="16" width="44" height="5" fill="%231f2430"/><rect x="14" y="62" width="8" height="8" fill="%23b0413e"/></svg>',
    tokens: {
      colors: MAG_COLORS(['纸色', '墨色', '朱印'], { bg: '#F4F1E8', primary: '#1F2430', accent: '#B0413E' }, {
        bg: ['#F4F1E8', '#EDEDE6', '#E9E4D8', '#F6F1E7'],
        primary: ['#1F2430', '#2F2A24', '#374151', '#1C1917'],
        accent: ['#B0413E', '#5B7B5E', '#3E5C76', '#B45309']
      }),
      fonts: { heading: { label: '刊头字体', default: SONG, options: [SONG, SERIF, SANS] } }
    },
    presets: [
      { name: '和纸朱印', colors: { bg: '#F4F1E8', primary: '#1F2430', accent: '#B0413E' } },
      { name: '苔庭雨后', colors: { bg: '#EDEDE6', primary: '#374151', accent: '#5B7B5E' } },
      { name: '藍染暮色', colors: { bg: '#E9E4D8', primary: '#1C1917', accent: '#3E5C76' } },
      { name: '琥珀茶汤', colors: { bg: '#F6F1E7', primary: '#2F2A24', accent: '#B45309' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1080, defaultWidth: 1080, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' }, backgroundImage: paperGrid(1080, 1080) },
    elements: [
      { id: 'jp-rule-top', type: 'shape', shapeKind: 'rect', x: 90, y: 80, width: 900, height: 3, fill: { $t: 'colors.primary' }, opacity: 0.85, zIndex: 3 },
      { id: 'jp-masthead', type: 'text', content: '小さな生活誌', fontFamily: { $t: 'fonts.heading' }, fontSize: 72, fontWeight: '900', color: { $t: 'colors.primary' }, letterSpacing: 6, x: 90, y: 112, width: 700, height: 96, zIndex: 4, animation: { name: 'inkReveal', duration: 1100 }, editable: { content: true, fontSize: { type: 'range', min: 48, max: 96 }, position: true } },
      { id: 'jp-masthead-en', type: 'text', content: 'A MINIMAL LIFE REVIEW · Nº 12', fontFamily: SANS, fontSize: 22, fontWeight: '600', color: { $t: 'colors.primary' }, opacity: 0.55, letterSpacing: 6, x: 94, y: 220, width: 640, height: 30, zIndex: 4, editable: { content: true } },
      { id: 'jp-photo', type: 'image', src: '/images/photo/japan-still-life-620x780.jpg', objectFit: 'cover', x: 520, y: 310, width: 470, height: 590, zIndex: 2, animation: { name: 'fadeIn', duration: 1000, delay: 250 }, editable: { src: { type: 'upload' }, position: true, size: { type: 'scale', min: 0.6, max: 1.3 } } },
      { id: 'jp-vertical', type: 'text', content: '余\n白\n之\n美', fontFamily: { $t: 'fonts.heading' }, fontSize: 56, fontWeight: '900', color: { $t: 'colors.primary' }, textAlign: 'center', lineHeight: 1.28, x: 108, y: 330, width: 96, height: 300, zIndex: 4, animation: { name: 'inkReveal', duration: 1400, delay: 400 }, editable: { content: true, fontSize: { type: 'range', min: 40, max: 72 }, position: true } },
      { id: 'jp-seal', type: 'shape', shapeKind: 'rect', x: 132, y: 690, width: 30, height: 30, fill: { $t: 'colors.accent' }, zIndex: 4, animation: { name: 'pulse', duration: 3000, iterationCount: 'infinite' } },
      { id: 'jp-caption', type: 'text', content: '間のある風景 · 特集内页', fontFamily: SANS, fontSize: 26, fontWeight: '500', color: { $t: 'colors.primary' }, opacity: 0.65, letterSpacing: 2, x: 520, y: 920, width: 470, height: 34, zIndex: 4, editable: { content: true } },
      { id: 'jp-issue', type: 'text', content: '六月号 / 定価 1,200円', fontFamily: SANS, fontSize: 24, fontWeight: '500', color: { $t: 'colors.primary' }, opacity: 0.65, letterSpacing: 2, x: 110, y: 920, width: 340, height: 32, zIndex: 4, editable: { content: true } },
      { id: 'jp-rule-bottom', type: 'shape', shapeKind: 'rect', x: 90, y: 992, width: 900, height: 2, fill: { $t: 'colors.primary' }, opacity: 0.28, zIndex: 3 }
    ]
  },
  // 3. 新闻周刊（4:5）
  {
    id: 'mag-news-weekly', name: '新闻周刊 (4:5)', version: '1.0.0', category: 'magazine', tags: ['magazine', 'news', 'weekly', 'journal', '4:5'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="125" viewBox="0 0 100 125"><rect width="100" height="125" fill="%23f5f2e9"/><rect width="100" height="16" fill="%23c8102e"/><rect x="12" y="26" width="76" height="46" fill="%2394a3b8"/><rect x="12" y="80" width="60" height="7" fill="%2317181c"/><rect x="12" y="94" width="44" height="4" fill="%2317181c" opacity="0.5"/></svg>',
    tokens: {
      colors: MAG_COLORS(['纸色', '墨色', '刊红'], { bg: '#F5F2E9', primary: '#17181C', accent: '#C8102E' }, {
        bg: ['#F5F2E9', '#F8F6F0', '#EFEDE4', '#F1EEE6'],
        primary: ['#17181C', '#111827', '#292524', '#1E293B'],
        accent: ['#C8102E', '#1D4ED8', '#047857', '#B45309']
      }),
      fonts: { heading: { label: '刊头字体', default: SONG, options: [SONG, SERIF, SANS] } }
    },
    presets: [
      { name: '经典刊红', colors: { bg: '#F5F2E9', primary: '#17181C', accent: '#C8102E' } },
      { name: '深蓝社论', colors: { bg: '#F8F6F0', primary: '#1E293B', accent: '#1D4ED8' } },
      { name: '翡翠观察', colors: { bg: '#EFEDE4', primary: '#292524', accent: '#047857' } },
      { name: '赭石现场', colors: { bg: '#F1EEE6', primary: '#111827', accent: '#B45309' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' }, backgroundImage: halftone(1080, 1350, 'rgba(23,24,28,0.05)') },
    elements: [
      { id: 'news-band', type: 'shape', shapeKind: 'rect', x: 0, y: 0, width: 1080, height: 148, fill: { $t: 'colors.accent' }, zIndex: 2 },
      { id: 'news-masthead', type: 'text', content: '新 聞 週 刊', fontFamily: { $t: 'fonts.heading' }, fontSize: 84, fontWeight: '900', color: '#FFFFFF', textAlign: 'center', letterSpacing: 8, x: 40, y: 22, width: 1000, height: 96, zIndex: 3, animation: { name: 'fadeInDown', duration: 800 }, editable: { content: true, fontSize: { type: 'range', min: 56, max: 110 } } },
      { id: 'news-sub', type: 'text', content: 'THE WEEKLY PULSE · 深度报道', fontFamily: SANS, fontSize: 22, fontWeight: '700', color: 'rgba(255,255,255,0.85)', textAlign: 'center', letterSpacing: 5, x: 40, y: 108, width: 1000, height: 28, zIndex: 3 },
      { id: 'news-date', type: 'text', content: '2026年9月19日 · 第 48 期 · 定价 ¥12', fontFamily: SANS, fontSize: 26, fontWeight: '500', color: { $t: 'colors.primary' }, opacity: 0.65, letterSpacing: 2, textAlign: 'center', x: 40, y: 166, width: 1000, height: 34, zIndex: 4, editable: { content: true } },
      { id: 'news-photo', type: 'image', src: '/images/photo/news-city-report-880x620.jpg', objectFit: 'cover', x: 100, y: 226, width: 880, height: 620, zIndex: 2, animation: { name: 'fadeIn', duration: 900, delay: 200 }, editable: { src: { type: 'upload' }, position: true } },
      { id: 'news-frame', type: 'shape', shapeKind: 'rect', x: 100, y: 226, width: 880, height: 620, border: { color: { $t: 'colors.primary' }, width: 5 }, zIndex: 3 },
      { id: 'news-photo-cap', type: 'text', content: '图：记者现场发回报道', fontFamily: SANS, fontSize: 22, fontWeight: '400', color: { $t: 'colors.primary' }, opacity: 0.55, x: 100, y: 852, width: 500, height: 28, zIndex: 4 },
      { id: 'news-headline', type: 'text', content: '城市与水的一场长跑', fontFamily: { $t: 'fonts.heading' }, fontSize: 78, fontWeight: '900', color: { $t: 'colors.primary' }, x: 100, y: 894, width: 900, height: 100, zIndex: 4, animation: { name: 'rise', duration: 850, delay: 350 }, editable: { content: true, fontSize: { type: 'range', min: 52, max: 96 }, position: true } },
      { id: 'news-rule', type: 'shape', shapeKind: 'rect', x: 100, y: 1008, width: 190, height: 6, fill: { $t: 'colors.accent' }, zIndex: 4 },
      { id: 'news-line-1', type: 'text', content: '· 水价改革的地方账本', fontFamily: { $t: 'fonts.heading' }, fontSize: 32, fontWeight: '700', color: { $t: 'colors.primary' }, x: 100, y: 1038, width: 800, height: 42, zIndex: 4, animation: { name: 'fadeInUp', duration: 700, delay: 550 }, editable: { content: true } },
      { id: 'news-line-2', type: 'text', content: '· 三家上市公司受访实录', fontFamily: { $t: 'fonts.heading' }, fontSize: 32, fontWeight: '700', color: { $t: 'colors.primary' }, x: 100, y: 1094, width: 800, height: 42, zIndex: 4, animation: { name: 'fadeInUp', duration: 700, delay: 700 }, editable: { content: true } },
      { id: 'news-line-3', type: 'text', content: '· 教育“双减”之后的一年', fontFamily: { $t: 'fonts.heading' }, fontSize: 32, fontWeight: '700', color: { $t: 'colors.primary' }, x: 100, y: 1150, width: 800, height: 42, zIndex: 4, animation: { name: 'fadeInUp', duration: 700, delay: 850 }, editable: { content: true } },
      { id: 'news-barcode', type: 'image', src: barcode(150, 44, '%2317181c', 7), x: 838, y: 1268, width: 150, height: 44, zIndex: 4 }
    ]
  },
  // 4. 音乐现场志（9:16）
  {
    id: 'mag-music-live', name: '音乐现场志 (9:16)', version: '1.0.0', category: 'magazine', tags: ['magazine', 'music', 'live', 'concert', '9:16'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="72" height="128" viewBox="0 0 72 128"><rect width="72" height="128" fill="%230b0510"/><rect x="10" y="18" width="52" height="62" fill="%2352528b"/><rect x="10" y="88" width="44" height="6" fill="%23ffffff"/><rect x="10" y="98" width="30" height="5" fill="%23ff3ec8"/><circle cx="60" cy="14" r="3" fill="%23fde047"/></svg>',
    tokens: {
      colors: MAG_COLORS(['舞台夜色', '字色', '霓虹'], { bg: '#0B0510', primary: '#FFFFFF', accent: '#FF3EC8' }, {
        bg: ['#0B0510', '#120318', '#020617', '#1A0B2E'],
        primary: ['#FFFFFF', '#F5F3FF', '#ECFEFF', '#FEF9C3'],
        accent: ['#FF3EC8', '#A78BFA', '#22D3EE', '#FACC15']
      }),
      fonts: { heading: { label: '刊头字体', default: SONG, options: [SONG, SERIF, SANS] }, display: { label: '标语字体', default: IMPACT, options: [IMPACT, SANS] } }
    },
    presets: [
      { name: '霓虹粉紫', colors: { bg: '#0B0510', primary: '#FFFFFF', accent: '#FF3EC8' } },
      { name: '电子青蓝', colors: { bg: '#020617', primary: '#ECFEFF', accent: '#22D3EE' } },
      { name: '暗房紫罗兰', colors: { bg: '#1A0B2E', primary: '#F5F3FF', accent: '#A78BFA' } },
      { name: '黄金年代', colors: { bg: '#120318', primary: '#FEF9C3', accent: '#FACC15' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1920, defaultWidth: 1080, defaultHeight: 1920, backgroundColor: { $t: 'colors.bg' }, backgroundImage: halftone(1080, 1920, 'rgba(255,255,255,0.045)', 2.2, 30) },
    elements: [
      { id: 'music-photo', type: 'image', src: '/images/photo/concert-crowd-stage-1080x1240.jpg', objectFit: 'cover', x: 0, y: 0, width: 1080, height: 1240, zIndex: 1, editable: { src: { type: 'upload' }, position: true } },
      { id: 'music-scrim', type: 'overlay', background: 'linear-gradient(to top, rgba(11,5,16,0.96) 34%, rgba(11,5,16,0) 62%)', x: 0, y: 0, width: 1080, height: 1920, zIndex: 2 },
      { id: 'music-side-text', type: 'text', content: 'T\nO\nU\nR', fontFamily: { $t: 'fonts.display' }, fontSize: 46, fontWeight: '900', color: { $t: 'colors.accent' }, textAlign: 'center', lineHeight: 1.2, x: 990, y: 200, width: 66, height: 260, zIndex: 3, animation: { name: 'fadeIn', duration: 900, delay: 500 }, editable: { content: true } },
      { id: 'music-star-1', type: 'text', content: '✦', fontFamily: SANS, fontSize: 40, color: '#FDE047', x: 880, y: 120, width: 50, height: 50, zIndex: 3, animation: { name: 'twinkle', duration: 2200, iterationCount: 'infinite' } },
      { id: 'music-star-2', type: 'text', content: '✦', fontFamily: SANS, fontSize: 28, color: { $t: 'colors.accent' }, x: 958, y: 1296, width: 40, height: 40, zIndex: 3, animation: { name: 'twinkle', duration: 2600, delay: 600, iterationCount: 'infinite' } },
      { id: 'music-masthead', type: 'text', content: 'LIVE! 现场志', fontFamily: SANS, fontSize: 30, fontWeight: '800', color: 'rgba(255,255,255,0.8)', letterSpacing: 6, x: 70, y: 62, width: 640, height: 40, zIndex: 4 },
      { id: 'music-title', type: 'text', content: '回声合唱团', fontFamily: { $t: 'fonts.heading' }, fontSize: 138, fontWeight: '900', color: { $t: 'colors.primary' }, letterSpacing: 6, x: 62, y: 1290, width: 960, height: 156, zIndex: 4, animation: { name: 'rise', duration: 900 }, editable: { content: true, fontSize: { type: 'range', min: 96, max: 168 }, position: true } },
      { id: 'music-subtitle', type: 'text', content: '2026 巡回演唱会 · 安可场', fontFamily: { $t: 'fonts.heading' }, fontSize: 52, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 3, x: 68, y: 1466, width: 900, height: 68, zIndex: 4, animation: { name: 'fadeInUp', duration: 800, delay: 400 }, editable: { content: true } },
      { id: 'music-setlist', type: 'text', content: 'SETLIST  01.逆光  02.回声  03.夜航\n04.纸飞机  05.暴雨将至  06.归于海', fontFamily: 'Consolas, Menlo, "Courier New", monospace', fontSize: 30, fontWeight: '600', color: 'rgba(255,255,255,0.72)', lineHeight: 1.7, x: 70, y: 1560, width: 900, height: 110, zIndex: 4, editable: { content: true } },
      { id: 'music-guitarist', type: 'image', src: GUITARIST, x: 760, y: 1520, width: 200, height: 273, zIndex: 4 },
      { id: 'music-soldout', type: 'text', content: 'SOLD OUT', fontFamily: { $t: 'fonts.display' }, fontSize: 58, fontWeight: '900', color: { $t: 'colors.accent' }, letterSpacing: 4, rotation: -8, x: 65, y: 1730, width: 360, height: 70, zIndex: 4, animation: { name: 'zoomIn', duration: 600, delay: 900 } },
      { id: 'music-barcode', type: 'image', src: barcode(170, 44, '%23ffffff', 21), x: 830, y: 1840, width: 170, height: 44, zIndex: 4 }
    ]
  },
  // 5. 科技月刊（16:9）
  {
    id: 'mag-tech-monthly', name: '科技月刊 (16:9)', version: '1.0.0', category: 'magazine', tags: ['magazine', 'tech', 'monthly', 'horizontal', '16:9'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="90" viewBox="0 0 160 90"><rect width="160" height="90" fill="%230a0f1c"/><rect x="80" y="12" width="68" height="66" fill="%23334155"/><rect x="10" y="16" width="56" height="6" fill="%23e8edf7"/><rect x="10" y="30" width="44" height="8" fill="%233b82f6"/><rect x="10" y="62" width="60" height="4" fill="%233b82f6" opacity="0.5"/><rect x="10" y="70" width="42" height="4" fill="%23e8edf7" opacity="0.35"/></svg>',
    tokens: {
      colors: MAG_COLORS(['深空底', '字色', '信号蓝'], { bg: '#0A0F1C', primary: '#E8EDF7', accent: '#3B82F6' }, {
        bg: ['#0A0F1C', '#050505', '#0B1120', '#08212B'],
        primary: ['#E8EDF7', '#F8FAFC', '#DBEAFE', '#D9F99D'],
        accent: ['#3B82F6', '#22D3EE', '#A3E635', '#FB7185']
      }),
      fonts: { heading: { label: '刊头字体', default: SANS, options: [SANS, SERIF, 'Consolas, Menlo, "Courier New", monospace'] } }
    },
    presets: [
      { name: '信号蓝', colors: { bg: '#0A0F1C', primary: '#E8EDF7', accent: '#3B82F6' } },
      { name: '量子青', colors: { bg: '#08212B', primary: '#DBEAFE', accent: '#22D3EE' } },
      { name: '培养绿', colors: { bg: '#0B1120', primary: '#D9F99D', accent: '#A3E635' } },
      { name: '故障粉', colors: { bg: '#050505', primary: '#F8FAFC', accent: '#FB7185' } }
    ],
    canvas: { virtualWidth: 1920, virtualHeight: 1080, defaultWidth: 1920, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' }, backgroundImage: paperGrid(1920, 1080, 96, 'rgba(59,130,246,0.09)') },
    elements: [
      { id: 'tech-photo', type: 'image', src: '/images/photo/tech-lab-server-860x880.jpg', objectFit: 'cover', x: 950, y: 110, width: 860, height: 860, zIndex: 2, animation: { name: 'fadeIn', duration: 900 }, editable: { src: { type: 'upload' }, position: true } },
      { id: 'tech-photo-frame', type: 'shape', shapeKind: 'rect', x: 950, y: 110, width: 860, height: 860, border: { color: { $t: 'colors.accent' }, width: 4 }, zIndex: 3 },
      { id: 'tech-tick-tr', type: 'shape', shapeKind: 'rect', x: 1810, y: 70, width: 60, height: 6, fill: { $t: 'colors.accent' }, zIndex: 3 },
      { id: 'tech-tick-tr-v', type: 'shape', shapeKind: 'rect', x: 1864, y: 70, width: 6, height: 60, fill: { $t: 'colors.accent' }, zIndex: 3 },
      { id: 'tech-masthead', type: 'text', content: 'TECH·WAVE 科技浪', fontFamily: { $t: 'fonts.heading' }, fontSize: 46, fontWeight: '900', color: { $t: 'colors.primary' }, letterSpacing: 4, x: 110, y: 96, width: 700, height: 60, zIndex: 4, animation: { name: 'slideInLeft', duration: 700 }, editable: { content: true } },
      { id: 'tech-issue', type: 'text', content: 'SEP 2026 · Nº 9 · 算力经济专刊', fontFamily: 'Consolas, Menlo, "Courier New", monospace', fontSize: 24, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 3, x: 114, y: 168, width: 640, height: 32, zIndex: 4, editable: { content: true } },
      { id: 'tech-title', type: 'text', content: 'AI 原生\n时代', fontFamily: { $t: 'fonts.heading' }, fontSize: 124, fontWeight: '900', color: { $t: 'colors.primary' }, lineHeight: 1.16, letterSpacing: 2, x: 108, y: 250, width: 760, height: 320, zIndex: 4, animation: { name: 'rise', duration: 900, delay: 250 }, editable: { content: true, fontSize: { type: 'range', min: 88, max: 150 }, position: true } },
      { id: 'tech-subtitle', type: 'text', content: '当模型成为基础设施，产品从哪里生长', fontFamily: { $t: 'fonts.heading' }, fontSize: 34, fontWeight: '500', color: { $t: 'colors.primary' }, opacity: 0.75, x: 112, y: 590, width: 700, height: 48, zIndex: 4, animation: { name: 'fadeInUp', duration: 800, delay: 500 }, editable: { content: true } },
      { id: 'tech-kpi-1-label', type: 'text', content: '算力成本下降 68%', fontFamily: 'Consolas, Menlo, "Courier New", monospace', fontSize: 24, fontWeight: '700', color: { $t: 'colors.primary' }, opacity: 0.8, letterSpacing: 1, x: 114, y: 690, width: 560, height: 30, zIndex: 4, editable: { content: true } },
      { id: 'tech-kpi-1-track', type: 'shape', shapeKind: 'rect', x: 114, y: 728, width: 640, height: 14, fill: 'rgba(255,255,255,0.08)', borderRadius: 7, zIndex: 4 },
      { id: 'tech-kpi-1-fill', type: 'shape', shapeKind: 'rect', x: 114, y: 728, width: 435, height: 14, fill: { $t: 'colors.accent' }, borderRadius: 7, zIndex: 4, animation: { name: 'slideInLeft', duration: 900, delay: 600 } },
      { id: 'tech-kpi-2-label', type: 'text', content: '开源模型占比 41%', fontFamily: 'Consolas, Menlo, "Courier New", monospace', fontSize: 24, fontWeight: '700', color: { $t: 'colors.primary' }, opacity: 0.8, letterSpacing: 1, x: 114, y: 782, width: 560, height: 30, zIndex: 4, editable: { content: true } },
      { id: 'tech-kpi-2-track', type: 'shape', shapeKind: 'rect', x: 114, y: 820, width: 640, height: 14, fill: 'rgba(255,255,255,0.08)', borderRadius: 7, zIndex: 4 },
      { id: 'tech-kpi-2-fill', type: 'shape', shapeKind: 'rect', x: 114, y: 820, width: 262, height: 14, fill: { $t: 'colors.accent' }, opacity: 0.75, borderRadius: 7, zIndex: 4, animation: { name: 'slideInLeft', duration: 900, delay: 750 } },
      { id: 'tech-cta', type: 'text', content: 'P.24  封面故事：一座超大规模集群的十二小时', fontFamily: { $t: 'fonts.heading' }, fontSize: 26, fontWeight: '600', color: { $t: 'colors.accent' }, letterSpacing: 1, x: 112, y: 920, width: 800, height: 36, zIndex: 4, editable: { content: true } }
    ]
  },
  // 6. 美食杂志（1:1）
  {
    id: 'mag-food-gourmet', name: '美食杂志 (1:1)', version: '1.0.0', category: 'magazine', tags: ['magazine', 'food', 'gourmet', 'recipe', '1:1'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23fbf3e4"/><rect x="30" y="30" width="40" height="40" fill="%23b6896a"/><rect x="30" y="30" width="40" height="40" fill="none" stroke="%233d2b1f" stroke-width="2.5"/><rect x="14" y="40" width="12" height="2.5" fill="%23c2410c"/><rect x="74" y="56" width="12" height="2.5" fill="%23c2410c"/><rect x="34" y="12" width="32" height="5" fill="%233d2b1f"/></svg>',
    tokens: {
      colors: MAG_COLORS(['奶纸', '可可', '辣橙'], { bg: '#FBF3E4', primary: '#3D2B1F', accent: '#C2410C' }, {
        bg: ['#FBF3E4', '#FDF6EC', '#F5EBDD', '#FAF0DE'],
        primary: ['#3D2B1F', '#1C1917', '#44403C', '#292524'],
        accent: ['#C2410C', '#B91C1C', '#65A30D', '#0E7490']
      }),
      fonts: { heading: { label: '刊头字体', default: SERIF, options: [SERIF, SONG, SANS] } }
    },
    presets: [
      { name: '焦糖辣橙', colors: { bg: '#FBF3E4', primary: '#3D2B1F', accent: '#C2410C' } },
      { name: '番茄罗勒', colors: { bg: '#FDF6EC', primary: '#1C1917', accent: '#65A30D' } },
      { name: '海盐蓝调', colors: { bg: '#F5EBDD', primary: '#44403C', accent: '#0E7490' } },
      { name: '红酒黑醋', colors: { bg: '#FAF0DE', primary: '#292524', accent: '#B91C1C' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1080, defaultWidth: 1080, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' }, backgroundImage: halftone(1080, 1080, 'rgba(61,43,31,0.05)', 2.2, 28) },
    elements: [
      { id: 'food-frame', type: 'shape', shapeKind: 'rect', x: 40, y: 40, width: 1000, height: 1000, border: { color: { $t: 'colors.primary' }, width: 3, style: 'solid' }, opacity: 0.45, zIndex: 2 },
      { id: 'food-masthead', type: 'text', content: '食 誌', fontFamily: { $t: 'fonts.heading' }, fontSize: 92, fontWeight: '900', color: { $t: 'colors.primary' }, textAlign: 'center', letterSpacing: 12, x: 140, y: 76, width: 800, height: 116, zIndex: 4, animation: { name: 'inkReveal', duration: 1000 }, editable: { content: true, fontSize: { type: 'range', min: 64, max: 120 } } },
      { id: 'food-masthead-en', type: 'text', content: 'GOURMONTHLY · Nº 8 · 夏味增刊', fontFamily: SANS, fontSize: 24, fontWeight: '700', color: { $t: 'colors.accent' }, textAlign: 'center', letterSpacing: 6, x: 140, y: 202, width: 800, height: 32, zIndex: 4, editable: { content: true } },
      { id: 'food-photo', type: 'image', src: '/images/photo/gourmet-plate-dish-520x520.jpg', objectFit: 'cover', x: 280, y: 268, width: 520, height: 520, zIndex: 3, animation: { name: 'zoomIn', duration: 900, delay: 250 }, editable: { src: { type: 'upload' }, position: true, size: { type: 'scale', min: 0.7, max: 1.2 } } },
      { id: 'food-photo-frame', type: 'shape', shapeKind: 'rect', x: 280, y: 268, width: 520, height: 520, border: { color: { $t: 'colors.primary' }, width: 6 }, zIndex: 4 },
      { id: 'food-tick-1', group: 'food-tick-', type: 'shape', shapeKind: 'rect', x: 268, y: 256, width: 22, height: 22, fill: { $t: 'colors.accent' }, zIndex: 5 },
      { id: 'food-tick-2', group: 'food-tick-', type: 'shape', shapeKind: 'rect', x: 790, y: 256, width: 22, height: 22, fill: { $t: 'colors.accent' }, zIndex: 5 },
      { id: 'food-tick-3', group: 'food-tick-', type: 'shape', shapeKind: 'rect', x: 268, y: 778, width: 22, height: 22, fill: { $t: 'colors.accent' }, zIndex: 5 },
      { id: 'food-tick-4', group: 'food-tick-', type: 'shape', shapeKind: 'rect', x: 790, y: 778, width: 22, height: 22, fill: { $t: 'colors.accent' }, zIndex: 5 },
      { id: 'food-callout-l1', type: 'text', content: '时令食材', fontFamily: { $t: 'fonts.heading' }, fontSize: 30, fontWeight: '700', color: { $t: 'colors.primary' }, textAlign: 'right', x: 44, y: 322, width: 152, height: 38, zIndex: 4, animation: { name: 'slideInLeft', duration: 700, delay: 550 }, editable: { content: true } },
      { id: 'food-callout-l1-line', type: 'shape', shapeKind: 'rect', x: 204, y: 340, width: 72, height: 3, fill: { $t: 'colors.accent' }, zIndex: 4 },
      { id: 'food-callout-l2', type: 'text', content: '主厨手记', fontFamily: { $t: 'fonts.heading' }, fontSize: 30, fontWeight: '700', color: { $t: 'colors.primary' }, textAlign: 'right', x: 44, y: 660, width: 152, height: 38, zIndex: 4, animation: { name: 'slideInLeft', duration: 700, delay: 700 }, editable: { content: true } },
      { id: 'food-callout-l2-line', type: 'shape', shapeKind: 'rect', x: 204, y: 678, width: 72, height: 3, fill: { $t: 'colors.accent' }, zIndex: 4 },
      { id: 'food-callout-r1', type: 'text', content: '风味地图', fontFamily: { $t: 'fonts.heading' }, fontSize: 30, fontWeight: '700', color: { $t: 'colors.primary' }, x: 886, y: 322, width: 152, height: 38, zIndex: 4, animation: { name: 'slideInRight', duration: 700, delay: 550 }, editable: { content: true } },
      { id: 'food-callout-r1-line', type: 'shape', shapeKind: 'rect', x: 806, y: 340, width: 72, height: 3, fill: { $t: 'colors.accent' }, zIndex: 4 },
      { id: 'food-callout-r2', type: 'text', content: '限定菜单', fontFamily: { $t: 'fonts.heading' }, fontSize: 30, fontWeight: '700', color: { $t: 'colors.primary' }, x: 886, y: 660, width: 152, height: 38, zIndex: 4, animation: { name: 'slideInRight', duration: 700, delay: 700 }, editable: { content: true } },
      { id: 'food-callout-r2-line', type: 'shape', shapeKind: 'rect', x: 806, y: 678, width: 72, height: 3, fill: { $t: 'colors.accent' }, zIndex: 4 },
      { id: 'food-title', type: 'text', content: '一桌菜里的四季', fontFamily: { $t: 'fonts.heading' }, fontSize: 66, fontWeight: '900', color: { $t: 'colors.primary' }, textAlign: 'center', letterSpacing: 6, x: 90, y: 848, width: 900, height: 88, zIndex: 4, animation: { name: 'rise', duration: 850, delay: 400 }, editable: { content: true, fontSize: { type: 'range', min: 44, max: 84 }, position: true } },
      { id: 'food-subtitle', type: 'text', content: '从菜场到餐桌的 36 个灵感', fontFamily: SANS, fontSize: 28, fontWeight: '500', color: { $t: 'colors.accent' }, textAlign: 'center', letterSpacing: 4, x: 90, y: 944, width: 900, height: 38, zIndex: 4, editable: { content: true } },
      { id: 'food-barcode', type: 'image', src: barcode(140, 40, '%233d2b1f', 33), x: 470, y: 998, width: 140, height: 40, zIndex: 4 }
    ]
  },
  // 7. 财经周刊（4:5）
  {
    id: 'mag-finance-review', name: '财经周刊 (4:5)', version: '1.0.0', category: 'magazine', tags: ['magazine', 'finance', 'business', 'weekly', '4:5'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="125" viewBox="0 0 100 125"><rect width="100" height="125" fill="%23ffffff"/><rect width="100" height="16" fill="%230f172a"/><rect x="8" y="24" width="60" height="7" fill="%230f172a"/><rect x="8" y="40" width="8" height="16" fill="%230f172a" opacity="0.25"/><rect x="22" y="34" width="8" height="22" fill="%230f172a" opacity="0.25"/><rect x="36" y="28" width="8" height="28" fill="%23b91c1c"/><rect x="8" y="66" width="84" height="38" fill="%23cbd5e1"/><rect x="8" y="110" width="50" height="4" fill="%230f172a" opacity="0.4"/></svg>',
    tokens: {
      colors: MAG_COLORS(['纸白', '藏青', '市涨红'], { bg: '#FFFFFF', primary: '#0F172A', accent: '#B91C1C' }, {
        bg: ['#FFFFFF', '#F8FAFC', '#FDFCF5', '#F1F5F9'],
        primary: ['#0F172A', '#111827', '#1E293B', '#3F3F46'],
        accent: ['#B91C1C', '#047857', '#B45309', '#4338CA']
      }),
      fonts: { heading: { label: '刊头字体', default: SONG, options: [SONG, SERIF, SANS] } }
    },
    presets: [
      { name: '藏青涨红', colors: { bg: '#FFFFFF', primary: '#0F172A', accent: '#B91C1C' } },
      { name: '石墨松绿', colors: { bg: '#F8FAFC', primary: '#111827', accent: '#047857' } },
      { name: '赭石简报', colors: { bg: '#FDFCF5', primary: '#3F3F46', accent: '#B45309' } },
      { name: '靛蓝评论', colors: { bg: '#F1F5F9', primary: '#1E293B', accent: '#4338CA' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' }, backgroundImage: paperGrid(1080, 1350, 108, 'rgba(15,23,42,0.045)') },
    elements: [
      { id: 'fin-band', type: 'shape', shapeKind: 'rect', x: 0, y: 0, width: 1080, height: 150, fill: { $t: 'colors.primary' }, zIndex: 2 },
      { id: 'fin-masthead', type: 'text', content: '財 智 週 刊', fontFamily: { $t: 'fonts.heading' }, fontSize: 64, fontWeight: '900', color: '#FFFFFF', textAlign: 'center', letterSpacing: 10, x: 40, y: 22, width: 1000, height: 88, zIndex: 3, animation: { name: 'fadeInDown', duration: 800 }, editable: { content: true, fontSize: { type: 'range', min: 54, max: 100 } } },
      { id: 'fin-band-sub', type: 'text', content: 'FINANCE REVIEW · 第 37 期 · 2026.09.19', fontFamily: SANS, fontSize: 24, fontWeight: '600', color: 'rgba(255,255,255,0.72)', textAlign: 'center', letterSpacing: 5, x: 40, y: 110, width: 1000, height: 28, zIndex: 3 },
      { id: 'fin-headline', type: 'text', content: '资产再配置的一年', fontFamily: { $t: 'fonts.heading' }, fontSize: 82, fontWeight: '900', color: { $t: 'colors.primary' }, letterSpacing: 2, x: 84, y: 196, width: 920, height: 110, zIndex: 4, animation: { name: 'rise', duration: 850, delay: 200 }, editable: { content: true, fontSize: { type: 'range', min: 56, max: 104 }, position: true } },
      { id: 'fin-subtitle', type: 'text', content: '后货币时代的全球资金流向', fontFamily: { $t: 'fonts.heading' }, fontSize: 34, fontWeight: '500', color: { $t: 'colors.primary' }, opacity: 0.65, letterSpacing: 2, x: 84, y: 314, width: 800, height: 46, zIndex: 4, editable: { content: true } },
      { id: 'fin-rule', type: 'shape', shapeKind: 'rect', x: 84, y: 382, width: 190, height: 7, fill: { $t: 'colors.accent' }, zIndex: 4 },
      { id: 'fin-line-1', type: 'text', content: '· 降息周期下的存款搬家实录', fontFamily: { $t: 'fonts.heading' }, fontSize: 30, fontWeight: '600', color: { $t: 'colors.primary' }, x: 84, y: 414, width: 820, height: 40, zIndex: 4, animation: { name: 'fadeInUp', duration: 650, delay: 500 }, editable: { content: true } },
      { id: 'fin-line-2', type: 'text', content: '· 十位基金经理的三季度持仓', fontFamily: { $t: 'fonts.heading' }, fontSize: 30, fontWeight: '600', color: { $t: 'colors.primary' }, x: 84, y: 468, width: 820, height: 40, zIndex: 4, animation: { name: 'fadeInUp', duration: 650, delay: 620 }, editable: { content: true } },
      { id: 'fin-line-3', type: 'text', content: '· 楼市新政满月：成交曲线调查', fontFamily: { $t: 'fonts.heading' }, fontSize: 30, fontWeight: '600', color: { $t: 'colors.primary' }, x: 84, y: 522, width: 820, height: 40, zIndex: 4, animation: { name: 'fadeInUp', duration: 650, delay: 740 }, editable: { content: true } },
      { id: 'fin-photo', type: 'image', src: '/images/photo/finance-markets-floor-620x430.jpg', objectFit: 'cover', x: 80, y: 606, width: 620, height: 430, zIndex: 2, animation: { name: 'fadeIn', duration: 900, delay: 300 }, editable: { src: { type: 'upload' }, position: true } },
      { id: 'fin-photo-frame', type: 'shape', shapeKind: 'rect', x: 80, y: 606, width: 620, height: 430, border: { color: { $t: 'colors.primary' }, width: 4 }, zIndex: 3 },
      { id: 'fin-stat-card', type: 'shape', shapeKind: 'rect', x: 730, y: 606, width: 270, height: 430, fill: { $t: 'colors.primary' }, zIndex: 2 },
      { id: 'fin-stat-num', type: 'text', content: '7.2%', fontFamily: SERIF, fontSize: 82, fontWeight: '900', color: { $t: 'colors.accent' }, x: 746, y: 646, width: 242, height: 100, zIndex: 4, animation: { name: 'heartbeat', duration: 2600, iterationCount: 'infinite' }, editable: { content: true, fontSize: { type: 'range', min: 60, max: 110 } } },
      { id: 'fin-stat-label', type: 'text', content: '三季度 GDP 增速预期', fontFamily: SANS, fontSize: 24, fontWeight: '600', color: 'rgba(255,255,255,0.85)', x: 756, y: 766, width: 220, height: 64, zIndex: 4, editable: { content: true } },
      { id: 'fin-mini-1', group: 'fin-mini-', type: 'shape', shapeKind: 'rect', x: 766, y: 900, width: 44, height: 60, fill: 'rgba(255,255,255,0.35)', zIndex: 4 },
      { id: 'fin-mini-2', group: 'fin-mini-', type: 'shape', shapeKind: 'rect', x: 836, y: 870, width: 44, height: 90, fill: 'rgba(255,255,255,0.6)', zIndex: 4 },
      { id: 'fin-mini-3', group: 'fin-mini-', type: 'shape', shapeKind: 'rect', x: 906, y: 830, width: 44, height: 130, fill: { $t: 'colors.accent' }, zIndex: 4 },
      { id: 'fin-chart', type: 'image', src: lineChart(300, 90, '%23b91cbc', 5), x: 756, y: 966, width: 190, height: 57, zIndex: 4 },
      { id: 'fin-teaser', type: 'text', content: 'P.16 特别报道：利率曲线之下', fontFamily: SANS, fontSize: 30, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 1, x: 84, y: 1088, width: 620, height: 36, zIndex: 4, editable: { content: true } },
      { id: 'fin-barcode', type: 'image', src: barcode(160, 44, '%230f172a', 11), x: 840, y: 1256, width: 160, height: 44, zIndex: 4 }
    ]
  },
  // 8. 电影特刊（16:9）
  {
    id: 'mag-cinema-special', name: '电影特刊 (16:9)', version: '1.0.0', category: 'magazine', tags: ['magazine', 'cinema', 'film', 'movie', '16:9'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="90" viewBox="0 0 160 90"><rect width="160" height="90" fill="%23000000"/><rect x="46" y="16" width="68" height="44" fill="%23403422"/><rect x="46" y="16" width="68" height="44" fill="none" stroke="%23f5e6c8" stroke-width="2"/><rect x="8" y="0" width="6" height="6" fill="%23f5e6c8"/><rect x="8" y="14" width="6" height="6" fill="%23f5e6c8"/><rect x="8" y="28" width="6" height="6" fill="%23f5e6c8"/><rect x="146" y="0" width="6" height="6" fill="%23f5e6c8"/><rect x="146" y="14" width="6" height="6" fill="%23f5e6c8"/><rect x="146" y="28" width="6" height="6" fill="%23f5e6c8"/><rect x="58" y="68" width="44" height="5" fill="%23f5e6c8"/></svg>',
    tokens: {
      colors: MAG_COLORS(['暗场黑', '香槟金', '首映红'], { bg: '#000000', primary: '#F5E6C8', accent: '#E11D48' }, {
        bg: ['#000000', '#0A0A0A', '#0C0A14', '#05050F'],
        primary: ['#F5E6C8', '#FDF6E3', '#E7D8B8', '#FDE68A'],
        accent: ['#E11D48', '#DC2626', '#D97706', '#7C3AED']
      }),
      fonts: { heading: { label: '刊头字体', default: SERIF, options: [SERIF, SONG, SANS] } }
    },
    presets: [
      { name: '香槟首映', colors: { bg: '#000000', primary: '#F5E6C8', accent: '#E11D48' } },
      { name: '午夜场紫', colors: { bg: '#0C0A14', primary: '#E7D8B8', accent: '#7C3AED' } },
      { name: '霓虹红灯区', colors: { bg: '#05050F', primary: '#FDE68A', accent: '#DC2626' } },
      { name: '奶油旧戏院', colors: { bg: '#0A0A0A', primary: '#FDF6E3', accent: '#D97706' } }
    ],
    canvas: { virtualWidth: 1920, virtualHeight: 1080, defaultWidth: 1920, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'cinema-sprocket-l', type: 'image', src: filmSprocket(70, 1080, '%230a0a0a', 'rgba(245,230,200,0.16)'), x: 14, y: 0, width: 70, height: 1080, zIndex: 3 },
      { id: 'cinema-sprocket-r', type: 'image', src: filmSprocket(70, 1080, '%230a0a0a', 'rgba(245,230,200,0.16)'), x: 1836, y: 0, width: 70, height: 1080, zIndex: 3 },
      { id: 'cinema-top-rule', type: 'shape', shapeKind: 'rect', x: 130, y: 58, width: 1660, height: 2, fill: { $t: 'colors.primary' }, opacity: 0.4, zIndex: 4 },
      { id: 'cinema-masthead', type: 'text', content: 'CINÉ·幕 年度特刊', fontFamily: { $t: 'fonts.heading' }, fontSize: 54, fontWeight: '900', color: { $t: 'colors.primary' }, letterSpacing: 8, x: 130, y: 84, width: 760, height: 74, zIndex: 4, animation: { name: 'fadeIn', duration: 800 }, editable: { content: true, fontSize: { type: 'range', min: 36, max: 72 } } },
      { id: 'cinema-issue', type: 'text', content: 'FILM SPECIAL ISSUE Nº 7 · 双周刊', fontFamily: 'Consolas, Menlo, "Courier New", monospace', fontSize: 22, fontWeight: '600', color: 'rgba(245,230,200,0.55)', letterSpacing: 4, x: 134, y: 166, width: 620, height: 30, zIndex: 4 },
      { id: 'cinema-tag', type: 'shape', shapeKind: 'rect', x: 1490, y: 92, width: 280, height: 62, fill: { $t: 'colors.accent' }, rotation: -4, zIndex: 4, animation: { name: 'zoomIn', duration: 600, delay: 700 } },
      { id: 'cinema-tag-text', type: 'text', content: 'NOW SHOWING', fontFamily: SANS, fontSize: 30, fontWeight: '800', color: '#FFFFFF', textAlign: 'center', letterSpacing: 3, rotation: -4, x: 1490, y: 108, width: 280, height: 36, zIndex: 5 },
      { id: 'cinema-photo', type: 'image', src: '/images/photo/cinema-still-frame-1120x640.jpg', objectFit: 'cover', x: 400, y: 240, width: 1120, height: 630, zIndex: 2, animation: { name: 'fadeIn', duration: 1000 }, editable: { src: { type: 'upload' }, position: true } },
      { id: 'cinema-photo-frame', type: 'shape', shapeKind: 'rect', x: 400, y: 240, width: 1120, height: 630, border: { color: { $t: 'colors.primary' }, width: 4 }, zIndex: 3 },
      { id: 'cinema-kicker-l', type: 'text', content: '十佳\n榜单\n揭晓', fontFamily: { $t: 'fonts.heading' }, fontSize: 40, fontWeight: '900', color: { $t: 'colors.primary' }, textAlign: 'center', lineHeight: 1.4, x: 170, y: 420, width: 130, height: 200, zIndex: 4, animation: { name: 'slideInLeft', duration: 800, delay: 400 }, editable: { content: true } },
      { id: 'cinema-kicker-r', type: 'text', content: '导演\n访谈\n全集', fontFamily: { $t: 'fonts.heading' }, fontSize: 40, fontWeight: '900', color: 'rgba(245,230,200,0.75)', textAlign: 'center', lineHeight: 1.4, x: 1620, y: 420, width: 130, height: 200, zIndex: 4, animation: { name: 'slideInRight', duration: 800, delay: 400 }, editable: { content: true } },
      { id: 'cinema-title', type: 'text', content: '年度十佳影片榜', fontFamily: { $t: 'fonts.heading' }, fontSize: 80, fontWeight: '900', color: { $t: 'colors.primary' }, textAlign: 'center', letterSpacing: 10, x: 300, y: 902, width: 1320, height: 100, zIndex: 4, animation: { name: 'rise', duration: 900, delay: 250 }, editable: { content: true, fontSize: { type: 'range', min: 56, max: 100 }, position: true } },
      { id: 'cinema-stars', type: 'text', content: '★ ★ ★ ★ ☆', fontFamily: SANS, fontSize: 36, fontWeight: '400', color: { $t: 'colors.accent' }, textAlign: 'center', letterSpacing: 10, x: 300, y: 1006, width: 1320, height: 48, zIndex: 4, animation: { name: 'twinkle', duration: 2800, iterationCount: 'infinite' } }
    ]
  },
  // 9. 文艺 MOOK（4:5）
  {
    id: 'mag-mook-essay', name: '文艺 MOOK (4:5)', version: '1.0.0', category: 'magazine', tags: ['magazine', 'mook', 'essay', 'literary', '4:5'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="125" viewBox="0 0 100 125"><rect width="100" height="125" fill="%23f6f1e7"/><rect x="6" y="6" width="88" height="113" fill="none" stroke="%232f2a24" stroke-width="1.5"/><rect x="16" y="24" width="42" height="52" fill="%23b8ad97"/><rect x="70" y="24" width="9" height="36" fill="%232f2a24"/><circle cx="24" cy="94" r="7" fill="%233e5c76"/></svg>',
    tokens: {
      colors: MAG_COLORS(['米纸', '暖墨', '黛青'], { bg: '#F6F1E7', primary: '#2F2A24', accent: '#3E5C76' }, {
        bg: ['#F6F1E7', '#F3EFE3', '#EFE9DB', '#F7F3EA'],
        primary: ['#2F2A24', '#1F2937', '#3F3F46', '#292524'],
        accent: ['#3E5C76', '#A95C48', '#5B7B5E', '#8B5CF6']
      }),
      fonts: { heading: { label: '刊头字体', default: SONG, options: [SONG, SERIF, SANS] } }
    },
    presets: [
      { name: '米纸黛青', colors: { bg: '#F6F1E7', primary: '#2F2A24', accent: '#3E5C76' } },
      { name: '陶土赭红', colors: { bg: '#F3EFE3', primary: '#3F3F46', accent: '#A95C48' } },
      { name: '茶山松绿', colors: { bg: '#EFE9DB', primary: '#1F2937', accent: '#5B7B5E' } },
      { name: '暮山紫', colors: { bg: '#F7F3EA', primary: '#292524', accent: '#8B5CF6' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' }, backgroundImage: halftone(1080, 1350, 'rgba(47,42,36,0.04)', 1.8, 34) },
    elements: [
      { id: 'mook-frame', type: 'shape', shapeKind: 'rect', x: 56, y: 56, width: 968, height: 1238, border: { color: { $t: 'colors.primary' }, width: 2 }, opacity: 0.55, zIndex: 2 },
      { id: 'mook-masthead', type: 'text', content: 'MOOK · 故事', fontFamily: { $t: 'fonts.heading' }, fontSize: 44, fontWeight: '900', color: { $t: 'colors.primary' }, letterSpacing: 6, x: 116, y: 108, width: 560, height: 58, zIndex: 4, animation: { name: 'fadeIn', duration: 800 }, editable: { content: true } },
      { id: 'mook-issue', type: 'text', content: '第 五 辑 · 慢下来的日子', fontFamily: { $t: 'fonts.heading' }, fontSize: 26, fontWeight: '500', color: { $t: 'colors.primary' }, opacity: 0.6, letterSpacing: 3, x: 116, y: 176, width: 560, height: 34, zIndex: 4, editable: { content: true } },
      { id: 'mook-title-vertical', type: 'text', content: '一\n页\n山\n水', fontFamily: { $t: 'fonts.heading' }, fontSize: 92, fontWeight: '900', color: { $t: 'colors.primary' }, textAlign: 'center', lineHeight: 1.18, x: 856, y: 250, width: 120, height: 480, zIndex: 4, animation: { name: 'inkReveal', duration: 1500, delay: 300 }, editable: { content: true, fontSize: { type: 'range', min: 64, max: 110 }, position: true } },
      { id: 'mook-photo', type: 'image', src: '/images/photo/essay-window-tea-morning-560x660.jpg', objectFit: 'cover', x: 112, y: 260, width: 560, height: 660, zIndex: 3, animation: { name: 'fadeIn', duration: 1000, delay: 200 }, editable: { src: { type: 'upload' }, position: true, size: { type: 'scale', min: 0.7, max: 1.2 } } },
      { id: 'mook-photo-frame', type: 'shape', shapeKind: 'rect', x: 112, y: 260, width: 560, height: 660, border: { color: { $t: 'colors.primary' }, width: 3 }, zIndex: 4 },
      { id: 'mook-photo-cap', type: 'text', content: '摄影 · 窗边的两小时', fontFamily: SANS, fontSize: 22, fontWeight: '500', color: { $t: 'colors.primary' }, opacity: 0.55, letterSpacing: 2, x: 116, y: 936, width: 460, height: 30, zIndex: 4, editable: { content: true } },
      { id: 'mook-intro', type: 'text', content: '这一辑，我们想\n谈谈“慢”：\n一壶茶凉掉的时间，\n一趟不赶点的\n绿皮火车，\n和一封写了三遍的信。', fontFamily: { $t: 'fonts.heading' }, fontSize: 24, fontWeight: '500', color: { $t: 'colors.primary' }, opacity: 0.85, lineHeight: 1.9, x: 700, y: 790, width: 276, height: 280, zIndex: 4, animation: { name: 'fadeInUp', duration: 900, delay: 650 }, editable: { content: true, position: true } },
      { id: 'mook-seal', type: 'shape', shapeKind: 'circle', x: 116, y: 1064, width: 96, height: 96, fill: { $t: 'colors.accent' }, zIndex: 4, animation: { name: 'pulse', duration: 3200, iterationCount: 'infinite' } },
      { id: 'mook-seal-text', type: 'text', content: '印', fontFamily: { $t: 'fonts.heading' }, fontSize: 46, fontWeight: '900', color: '#FFFFFF', textAlign: 'center', x: 116, y: 1088, width: 96, height: 56, zIndex: 5 },
      { id: 'mook-toc', type: 'text', content: '本辑目录  01 山行记 / 02 煮茶志 / 03 旧车站', fontFamily: SANS, fontSize: 24, fontWeight: '500', color: { $t: 'colors.primary' }, opacity: 0.6, letterSpacing: 2, x: 252, y: 1096, width: 640, height: 32, zIndex: 4, editable: { content: true } },
      { id: 'mook-price', type: 'text', content: '定价 ¥ 48', fontFamily: { $t: 'fonts.heading' }, fontSize: 26, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 3, x: 252, y: 1144, width: 300, height: 34, zIndex: 4, editable: { content: true } }
    ]
  },
  // 10. 复古波普志（9:16）
  {
    id: 'mag-pop-retro', name: '复古波普志 (9:16)', version: '1.0.0', category: 'magazine', tags: ['magazine', 'pop', 'retro', 'bold', '9:16'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="72" height="128" viewBox="0 0 72 128"><rect width="72" height="128" fill="%232563eb"/><rect y="30" width="72" height="9" fill="%23ff4757" transform="rotate(-4 36 34)"/><rect x="12" y="46" width="48" height="52" fill="%23fff8e7" stroke="%23000000" stroke-width="2"/><circle cx="58" cy="20" r="9" fill="%23ffd93d" stroke="%23000000" stroke-width="1.5"/><rect x="12" y="106" width="30" height="5" fill="%23fff8e7"/></svg>',
    tokens: {
      colors: MAG_COLORS(['钴蓝底', '奶油白', '波普红'], { bg: '#2563EB', primary: '#FFF8E7', accent: '#FF4757' }, {
        bg: ['#2563EB', '#1D4ED8', '#0E7490', '#4338CA'],
        primary: ['#FFF8E7', '#FFFFFF', '#FDE68A', '#ECFEFF'],
        accent: ['#FF4757', '#FFD93D', '#F97316', '#22D3EE']
      }),
      fonts: { display: { label: '刊名字体', default: IMPACT, options: [IMPACT, SANS, SERIF] } }
    },
    presets: [
      { name: '钴蓝波普', colors: { bg: '#2563EB', primary: '#FFF8E7', accent: '#FF4757' } },
      { name: '柠檬汽水', colors: { bg: '#1D4ED8', primary: '#FDE68A', accent: '#FFD93D' } },
      { name: '橘调复古', colors: { bg: '#0E7490', primary: '#FFFFFF', accent: '#F97316' } },
      { name: '电光紫夜', colors: { bg: '#4338CA', primary: '#ECFEFF', accent: '#22D3EE' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1920, defaultWidth: 1080, defaultHeight: 1920, backgroundColor: { $t: 'colors.bg' }, backgroundImage: halftone(1080, 1920, 'rgba(255,255,255,0.09)', 3.2, 30) },
    elements: [
      { id: 'pop-masthead', type: 'text', content: 'POP!', fontFamily: { $t: 'fonts.display' }, fontSize: 230, fontWeight: '900', color: { $t: 'colors.primary' }, textAlign: 'center', letterSpacing: 6, x: 40, y: 70, width: 1000, height: 250, zIndex: 4, shadow: { color: 'rgba(0,0,0,0.45)', blur: 0, offsetX: 12, offsetY: 12 }, animation: { name: 'zoomIn', duration: 700 }, editable: { content: true, fontSize: { type: 'range', min: 150, max: 300 } } },
      { id: 'pop-banner', type: 'shape', shapeKind: 'rect', x: -40, y: 350, width: 1160, height: 76, fill: { $t: 'colors.accent' }, rotation: -4, zIndex: 3 },
      { id: 'pop-banner-text', type: 'text', content: 'NEW ISSUE · 潮流创刊号 · HOT', fontFamily: SANS, fontSize: 34, fontWeight: '800', color: '#FFFFFF', textAlign: 'center', letterSpacing: 6, rotation: -4, x: 60, y: 368, width: 960, height: 44, zIndex: 4, animation: { name: 'slideInLeft', duration: 800, delay: 350 }, editable: { content: true } },
      { id: 'pop-photo-shadow', type: 'shape', shapeKind: 'rect', x: 140, y: 492, width: 800, height: 860, fill: 'rgba(0,0,0,0.35)', zIndex: 3 },
      { id: 'pop-photo', type: 'image', src: '/images/photo/pop-retro-portrait-800x860.jpg', objectFit: 'cover', x: 120, y: 470, width: 800, height: 860, zIndex: 4, animation: { name: 'fadeInUp', duration: 850, delay: 200 }, editable: { src: { type: 'upload' }, position: true } },
      { id: 'pop-photo-frame', type: 'shape', shapeKind: 'rect', x: 120, y: 470, width: 800, height: 860, border: { color: '#FFFFFF', width: 12 }, zIndex: 5 },
      { id: 'pop-starburst', type: 'image', src: starburst(250, '%23ffd93d', '%23000000'), x: 760, y: 1200, width: 250, height: 250, zIndex: 6, animation: { name: 'spinSlow', duration: 14000, iterationCount: 'infinite', easing: 'linear' } },
      { id: 'pop-burst-text', type: 'text', content: '¥18', fontFamily: { $t: 'fonts.display' }, fontSize: 68, fontWeight: '900', color: '#111827', textAlign: 'center', x: 795, y: 1285, width: 180, height: 80, zIndex: 7, editable: { content: true } },
      { id: 'pop-spark-1', type: 'text', content: '✱', fontFamily: SANS, fontSize: 56, color: { $t: 'colors.primary' }, x: 70, y: 430, width: 66, height: 66, zIndex: 5, animation: { name: 'twinkle', duration: 2000, iterationCount: 'infinite' } },
      { id: 'pop-spark-2', type: 'text', content: '✱', fontFamily: SANS, fontSize: 40, color: { $t: 'colors.accent' }, x: 960, y: 470, width: 50, height: 50, zIndex: 5, animation: { name: 'twinkle', duration: 2400, delay: 500, iterationCount: 'infinite' } },
      { id: 'pop-headline', type: 'text', content: '潮流尖端的 12 个瞬间', fontFamily: { $t: 'fonts.display' }, fontSize: 76, fontWeight: '900', color: { $t: 'colors.primary' }, textAlign: 'center', letterSpacing: 3, x: 60, y: 1452, width: 960, height: 96, zIndex: 4, shadow: { color: 'rgba(0,0,0,0.4)', blur: 0, offsetX: 8, offsetY: 8 }, animation: { name: 'bounce', duration: 1400, delay: 600 }, editable: { content: true, fontSize: { type: 'range', min: 52, max: 96 } } },
      { id: 'pop-subtitle', type: 'text', content: 'POP CULTURE MONTHLY · Nº 15', fontFamily: SANS, fontSize: 30, fontWeight: '700', color: { $t: 'colors.accent' }, textAlign: 'center', letterSpacing: 8, x: 60, y: 1568, width: 960, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'pop-limited', type: 'text', content: '限时增刊 · 随刊附赠贴纸', fontFamily: SANS, fontSize: 26, fontWeight: '600', color: 'rgba(255,248,231,0.8)', textAlign: 'center', letterSpacing: 4, x: 60, y: 1626, width: 960, height: 36, zIndex: 4, animation: { name: 'blink', duration: 1600, iterationCount: 'infinite' }, editable: { content: true } },
      { id: 'pop-barcode', type: 'image', src: barcode(200, 52, '%23ffffff', 55), x: 440, y: 1800, width: 200, height: 52, zIndex: 4 }
    ]
  }
]

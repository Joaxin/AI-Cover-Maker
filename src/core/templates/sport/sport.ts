// src/core/templates/sport/sport.ts
// 运动·健身 6 个模板：马拉松号码布 / 健身房课表 / 配速数据卡 / 晨间瑜伽 / 赛事对阵 / 骑行路书
// 装饰为原创内联 SVG；实拍占位图用 Lorem Picsum（带 seed）
import type { Template } from '@/types/types'
import { seededInt } from '../_fx/common'

const seeded = seededInt

const SANS = 'Helvetica, Arial, sans-serif'
const SONG = 'Songti SC, SimSun, serif'
const MONO = 'Consolas, Menlo, "Courier New", monospace'
const IMPACT = 'Impact, "Arial Black", sans-serif'
const YAHEI = '"Microsoft YaHei", "PingFang SC", sans-serif'
const SERIF = 'Didot, Bodoni MT, Georgia, serif'

/** 斜向条纹（动感背景），颜色与不透明度独立可控 */
function stripes(w: number, h: number, band: number, fill: string) {
  let s = ''
  for (let x = -h; x < w + h; x += band * 2) s += `<polygon points='${x},${h} ${x + band},${h} ${x + band + h},0 ${x + h},0'/>`
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><g fill='${fill}' fill-opacity='0.12'>${s}</g></svg>`
}

/** 折线海拔/配速曲线（原创，含面积渐变） */
function profileLine(w: number, h: number, stroke: string, seed = 88, n = 22) {
  const rnd = seeded(seed); const pts: string[] = []
  for (let i = 0; i <= n; i++) {
    const px = Math.round((i / n) * w)
    const py = Math.round(h * 0.62 - Math.sin(i / n * Math.PI) * h * 0.3 - (rnd() % Math.round(h * 0.12)))
    pts.push(`${px},${py}`)
  }
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><polygon points='0,${h} ${pts.join(' ')} ${w},${h}' fill='${stroke}' fill-opacity='0.14'/><polyline points='${pts.join(' ')}' fill='none' stroke='${stroke}' stroke-width='5' stroke-linejoin='round' stroke-linecap='round'/><circle cx='${pts[0].split(',')[0]}' cy='${pts[0].split(',')[1]}' r='8' fill='${stroke}'/><circle cx='${pts[n].split(',')[0]}' cy='${pts[n].split(',')[1]}' r='8' fill='${stroke}'/></svg>`
}

/** 柱状图（周训练量） */
function bars(w: number, h: number, fill: string, seed = 12, n = 14) {
  const rnd = seeded(seed); const gap = 8; const bw = (w - gap * (n - 1)) / n; let r = ''
  for (let i = 0; i < n; i++) { const bh = Math.round(h * (0.24 + (rnd() % 70) / 100)); r += `<rect x='${Math.round(i * (bw + gap))}' y='${h - bh}' width='${Math.round(bw)}' height='${bh}' rx='3'/>` }
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><g fill='${fill}'>${r}</g></svg>`
}

/** 路线图（折线 + 起终点），seed 控制走向 */
function routePath(w: number, h: number, stroke: string, seed = 55) {
  const rnd = seeded(seed); const pts: string[] = []
  for (let i = 0; i < 9; i++) pts.push(`${Math.round(40 + (i / 8) * (w - 80))},${Math.round(h * 0.2 + (rnd() % Math.round(h * 0.6)))}`)
  const dots = pts.map(p => `<circle cx='${p.split(',')[0]}' cy='${p.split(',')[1]}' r='6' fill='${stroke}' fill-opacity='0.5'/>`).join('')
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" fill='none'><rect x='0' y='0' width='${w}' height='${h}' stroke='${stroke}' stroke-opacity='0.18' stroke-width='2'/><polyline points='${pts.join(' ')}' stroke='${stroke}' stroke-width='7' stroke-linejoin='round' stroke-linecap='round' stroke-dasharray='2 0'/>${dots}<circle cx='${pts[0].split(',')[0]}' cy='${pts[0].split(',')[1]}' r='16' fill='${stroke}'/><circle cx='${pts[8].split(',')[0]}' cy='${pts[8].split(',')[1]}' r='16' fill='none' stroke='${stroke}' stroke-width='6'/></svg>`
}

// ===== 原创贴图 =====
// 秒表
const STOPWATCH = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="240" height="260" viewBox="0 0 240 260"><rect x="98" y="6" width="44" height="20" rx="6" fill="%23111827"/><circle cx="120" cy="150" r="98" fill="none" stroke="%23111827" stroke-width="12"/><path d="M120 150 L172 106" stroke="%23DC2626" stroke-width="10" stroke-linecap="round"/><circle cx="120" cy="150" r="10" fill="%23DC2626"/><g stroke="%23111827" stroke-width="6" stroke-linecap="round" opacity="0.6"><path d="M120 76v14M186 150h-14M54 150h14M166 104l-10 10"/></g></svg>'
// 哑铃
const DUMBBELL = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="320" height="160" viewBox="0 0 320 160"><rect x="12" y="34" width="26" height="92" rx="6" fill="%23111827"/><rect x="46" y="52" width="22" height="56" rx="5" fill="%23111827"/><rect x="68" y="70" width="184" height="20" rx="10" fill="%2394A3B8"/><rect x="252" y="52" width="22" height="56" rx="5" fill="%23111827"/><rect x="282" y="34" width="26" height="92" rx="6" fill="%23111827"/></svg>'
// 篮球
const BALL = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 240 240"><circle cx="120" cy="120" r="112" fill="%23EA580C"/><g stroke="%23111827" stroke-width="8" fill="none"><path d="M8 120h224M120 8v224"/><path d="M40 40c50 46 50 114 0 160M200 40c-50 46-50 114 0 160"/></g></svg>'
// 瑜伽剪影（打坐）
const YOGA = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="260" viewBox="0 0 300 260"><circle cx="150" cy="52" r="30" fill="%232F3A22"/><path d="M150 86c34 0 54 26 58 62l10 56h-136l10-56c4-36 24-62 58-62z" fill="%232F3A22"/><path d="M62 232c30-26 146-26 176 0 12 10-4 18-24 12-28-8-100-8-128 0-20 6-36-2-24-12z" fill="%232F3A22" opacity="0.75"/></svg>'
// 跑鞋侧影
const SNEAKER = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="320" height="180" viewBox="0 0 320 180"><path d="M18 118c0-24 10-40 24-52 14-12 22-8 30 6l14 24 96-8c40-4 74 6 100 24 16 12 20 30 6 40l-252 0c-12 0-18-16-18-34z" fill="%23111827"/><path d="M18 148h274c14 0 20 8 20 16H22c-6 0-8-8-4-16z" fill="%23DC2626"/><g stroke="%23F8FAFC" stroke-width="6" stroke-linecap="round" opacity="0.85"><path d="M96 84l22 18M118 70l26 20M142 60l28 22"/></g></svg>'
// 奖牌
const MEDAL = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="240" viewBox="0 0 200 240"><path d="M56 8l44 74-32 22L24 30z" fill="%23DC2626"/><path d="M144 8l32 88-44 16L88 8z" fill="%237F1D1D"/><circle cx="100" cy="160" r="66" fill="%23E8B04B"/><circle cx="100" cy="160" r="50" fill="none" stroke="%23B45309" stroke-width="5"/><path d="M100 128l9 22 24 2-18 16 5 24-20-13-20 13 5-24-18-16 24-2z" fill="%23B45309"/></svg>'
// 心电图线
function ecg(w: number, h: number, stroke: string, beats = 6) {
  let d = `M0 ${h / 2}`; const step = w / beats
  for (let i = 0; i < beats; i++) {
    const x = i * step
    d += ` L${x + step * 0.34} ${h / 2} L${x + step * 0.4} ${h * 0.78} L${x + step * 0.48} ${h * 0.14} L${x + step * 0.56} ${h * 0.9} L${x + step * 0.64} ${h / 2} L${x + step} ${h / 2}`
  }
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><path d='${d}' fill='none' stroke='${stroke}' stroke-width='5' stroke-linejoin='round' stroke-linecap='round'/></svg>`
}

export const sportTemplates: Template[] = [
  // 1. 马拉松号码布海报（4:5）
  {
    id: 'sport-marathon-bib', name: '马拉松号码布', version: '1.0.0', category: 'sport',
    tags: ['sport', 'marathon', 'running', 'race', 'bib', '4:5'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="125" viewBox="0 0 100 125"><rect width="100" height="125" fill="%23F3F4F6"/><rect x="10" y="24" width="80" height="58" rx="4" fill="%23FFFFFF" stroke="%23DC2626" stroke-width="3"/><text x="50" y="64" font-family="Impact, sans-serif" font-size="26" font-weight="700" fill="%23111827" text-anchor="middle">2049</text><rect x="16" y="14" width="26" height="4" fill="%23111827" opacity="0.5"/><rect x="16" y="92" width="44" height="5" fill="%23DC2626"/><rect x="16" y="102" width="30" height="4" fill="%23111827" opacity="0.35"/></svg>',
    tokens: {
      colors: {
        bg: { label: '底色', default: '#F3F4F6', options: ['#F3F4F6', '#0F172A', '#E7F5EC', '#FDF4E3'] },
        ink: { label: '主墨', default: '#111827', options: ['#111827', '#F8FAFC', '#14231B', '#3F2A1D'] },
        accent: { label: '赛事红', default: '#DC2626', options: ['#DC2626', '#F59E0B', '#0EA5E9', '#16A34A'] },
        soft: { label: '纸白', default: '#FFFFFF', options: ['#FFFFFF', '#F8FAFC', '#FEF9C3', '#ECFCCB', '#1E293B', '#FFFBEB', '#F7FEF9'] }
      },
      fonts: {
        heading: { label: '号码字体', default: IMPACT, options: [IMPACT, SANS, '"Arial Black", sans-serif', '"Microsoft YaHei", sans-serif'] },
        body: { label: '正文字体', default: SANS, options: [SANS, MONO, YAHEI] }
      }
    },
    presets: [
      { name: '荧光红白', colors: { bg: '#F3F4F6', ink: '#111827', accent: '#DC2626', soft: '#FFFFFF' } },
      { name: '夜跑蓝黑', colors: { bg: '#0F172A', ink: '#F8FAFC', accent: '#0EA5E9', soft: '#1E293B' } },
      { name: '越野橙土', colors: { bg: '#FDF4E3', ink: '#3F2A1D', accent: '#F59E0B', soft: '#FFFBEB' } },
      { name: '公园绿跑', colors: { bg: '#E7F5EC', ink: '#14231B', accent: '#16A34A', soft: '#F7FEF9' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'mb-stripes', type: 'image', src: stripes(1080, 1350, 90, '%23DC2626'), x: 0, y: 0, width: 1080, height: 1350, objectFit: 'fill', opacity: 0.5, zIndex: 1 },
      { id: 'mb-top-band', type: 'shape', shapeKind: 'rect', x: 0, y: 0, width: 1080, height: 108, fill: { $t: 'colors.ink' }, zIndex: 3 },
      { id: 'mb-event', type: 'text', content: '2026 江海国际马拉松 · JIANGHAI MARATHON', fontFamily: { $t: 'fonts.body' }, fontSize: 30, fontWeight: '700', color: { $t: 'colors.soft' }, letterSpacing: 3, textAlign: 'center', x: 60, y: 34, width: 960, height: 42, zIndex: 4, editable: { content: true } },
      { id: 'mb-bib', type: 'shape', shapeKind: 'rect', x: 90, y: 168, width: 900, height: 540, fill: { $t: 'colors.soft' }, borderRadius: 12, zIndex: 3, shadow: { offsetX: 0, offsetY: 12, blur: 28, color: 'rgba(0,0,0,0.18)' } },
      { id: 'mb-bib-border', type: 'shape', shapeKind: 'rect', x: 90, y: 168, width: 900, height: 540, fill: 'rgba(0,0,0,0)', border: { color: { $t: 'colors.accent' } as any, width: 10, style: 'solid' as const }, borderRadius: 12, zIndex: 4 },
      { id: 'mb-holes', type: 'shape', shapeKind: 'circle', x: 126, y: 200, width: 26, height: 26, fill: { $t: 'colors.bg' }, zIndex: 5 },
      { id: 'mb-holes2', type: 'shape', shapeKind: 'circle', x: 928, y: 200, width: 26, height: 26, fill: { $t: 'colors.bg' }, zIndex: 5 },
      { id: 'mb-bib-top', type: 'text', content: 'START　08:00　·　A 区', fontFamily: MONO, fontSize: 24, color: { $t: 'colors.ink' }, opacity: 0.62, letterSpacing: 2, x: 168, y: 208, width: 560, height: 32, zIndex: 5 },
      { id: 'mb-num', type: 'text', content: '2049', fontFamily: { $t: 'fonts.heading' }, fontSize: 300, fontWeight: '900', color: { $t: 'colors.ink' }, letterSpacing: 6, textAlign: 'center', lineHeight: 1, x: 130, y: 268, width: 820, height: 320, zIndex: 5, animation: { name: 'zoomIn', duration: 800 }, editable: { content: true, fontSize: { type: 'range', min: 180, max: 360 }, position: true } },
      { id: 'mb-name', type: 'text', content: '姓名 NAME：陈 驰', fontFamily: { $t: 'fonts.body' }, fontSize: 34, fontWeight: '700', color: { $t: 'colors.ink' }, letterSpacing: 2, x: 168, y: 612, width: 500, height: 44, zIndex: 5, editable: { content: true } },
      { id: 'mb-flag', type: 'text', content: 'CHN', fontFamily: MONO, fontSize: 30, fontWeight: '700', color: { $t: 'colors.accent' }, textAlign: 'right', x: 780, y: 614, width: 140, height: 40, zIndex: 5 },
      { id: 'mb-mid', type: 'text', content: '全 程 42.195 KM', fontFamily: { $t: 'fonts.heading' }, fontSize: 76, fontWeight: '800', color: { $t: 'colors.accent' }, letterSpacing: 4, textAlign: 'center', x: 90, y: 762, width: 900, height: 104, zIndex: 3, animation: { name: 'rise', duration: 700 }, editable: { content: true, fontSize: { type: 'range', min: 52, max: 104 } } },
      { id: 'mb-date', type: 'text', content: '2026.11.08（周日）　发令枪 · 江海体育场南广场', fontFamily: { $t: 'fonts.body' }, fontSize: 32, color: { $t: 'colors.ink' }, opacity: 0.85, letterSpacing: 1, textAlign: 'center', x: 90, y: 892, width: 900, height: 44, zIndex: 3, editable: { content: true, position: true } },
      { id: 'mb-chart', type: 'image', src: ecg(900, 120, '%23DC2626'), x: 90, y: 954, width: 900, height: 120, objectFit: 'fill', opacity: 0.75, zIndex: 3 },
      { id: 'mb-stats', type: 'text', content: '报名 32,000 人　·　补给 21 站　·　关门 6h15m', fontFamily: MONO, fontSize: 26, color: { $t: 'colors.ink' }, opacity: 0.66, letterSpacing: 1, textAlign: 'center', x: 90, y: 1104, width: 900, height: 36, zIndex: 3 },
      { id: 'mb-medal', type: 'image', src: MEDAL, x: 848, y: 1150, width: 130, height: 156, zIndex: 3, animation: { name: 'swing', duration: 3200, iterationCount: 'infinite' }, editable: { position: true, size: { type: 'scale' } } },
      { id: 'mb-sponsor', type: 'text', content: '主赞助：NORTHWIND SPORTS　·　官方计时 CHRONOTAG', fontFamily: { $t: 'fonts.body' }, fontSize: 22, color: { $t: 'colors.ink' }, opacity: 0.5, letterSpacing: 2, x: 90, y: 1178, width: 720, height: 30, zIndex: 3, editable: { content: true } },
      { id: 'mb-bottom', type: 'shape', shapeKind: 'rect', x: 0, y: 1272, width: 1080, height: 78, fill: { $t: 'colors.ink' }, zIndex: 3 },
      { id: 'mb-bottom-t', type: 'text', content: 'RUN THE CITY　·　# 用一场马拉松打开一座城', fontFamily: { $t: 'fonts.body' }, fontSize: 26, fontWeight: '700', color: { $t: 'colors.soft' }, letterSpacing: 4, textAlign: 'center', x: 60, y: 1294, width: 960, height: 36, zIndex: 4 }
    ]
  },

  // 2. 健身房周课表（1:1）
  {
    id: 'sport-gym-timetable', name: '健身房周课表', version: '1.0.0', category: 'sport',
    tags: ['sport', 'gym', 'timetable', 'class', 'schedule', '1:1'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23111827"/><rect x="10" y="12" width="52" height="7" fill="%23A3E635"/><rect x="10" y="28" width="80" height="1" fill="%23F8FAFC" opacity="0.3"/><rect x="10" y="36" width="24" height="5" fill="%23F8FAFC" opacity="0.5"/><rect x="44" y="36" width="24" height="5" fill="%23F8FAFC" opacity="0.25"/><rect x="10" y="50" width="24" height="5" fill="%23F8FAFC" opacity="0.5"/><rect x="44" y="50" width="18" height="5" fill="%23DC2626" opacity="0.7"/><rect x="10" y="64" width="24" height="5" fill="%23F8FAFC" opacity="0.5"/><rect x="44" y="64" width="22" height="5" fill="%23F8FAFC" opacity="0.25"/></svg>',
    tokens: {
      colors: {
        bg: { label: '夜场底', default: '#111827', options: ['#111827', '#0B1120', '#1C1917', '#F9FAFB'] },
        ink: { label: '文字', default: '#F8FAFC', options: ['#F8FAFC', '#FFFFFF', '#E5E7EB', '#111827', '#FAFAFA'] },
        lime: { label: '能量绿', default: '#A3E635', options: ['#A3E635', '#4ADE80', '#22D3EE', '#FACC15', '#8B5CF6', '#16A34A'] },
        hot: { label: '高强度', default: '#DC2626', options: ['#DC2626', '#F97316', '#EC4899', '#8B5CF6'] }
      },
      fonts: { heading: { label: '标题字体', default: IMPACT, options: [IMPACT, SANS, YAHEI, SERIF] } }
    },
    presets: [
      { name: '黑场荧光绿', colors: { bg: '#111827', ink: '#F8FAFC', lime: '#A3E635', hot: '#DC2626' } },
      { name: '深海蓝调', colors: { bg: '#0B1120', ink: '#E5E7EB', lime: '#22D3EE', hot: '#F97316' } },
      { name: '紫电团课', colors: { bg: '#1C1917', ink: '#FAFAFA', lime: '#8B5CF6', hot: '#EC4899' } },
      { name: '日场白盒', colors: { bg: '#F9FAFB', ink: '#111827', lime: '#16A34A', hot: '#DC2626' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1080, defaultWidth: 1080, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'gt-glow', type: 'overlay', x: -200, y: -260, width: 900, height: 700, background: 'radial-gradient(50% 50% at 50% 50%, rgba(163,230,53,0.22) 0%, rgba(0,0,0,0) 70%)', zIndex: 1 },
      { id: 'gt-bars', type: 'image', src: bars(1080, 180, '%23A3E635'), x: 0, y: 900, width: 1080, height: 180, objectFit: 'fill', opacity: 0.18, zIndex: 1 },
      { id: 'gt-kicker', type: 'text', content: 'WEEKLY CLASS SCHEDULE', fontFamily: MONO, fontSize: 20, color: { $t: 'colors.lime' }, letterSpacing: 6, x: 80, y: 62, width: 620, height: 32, zIndex: 3, animation: { name: 'slideInLeft', duration: 700 } },
      { id: 'gt-title', type: 'text', content: '本周团课表', fontFamily: { $t: 'fonts.heading' }, fontSize: 96, fontWeight: '800', color: { $t: 'colors.ink' }, letterSpacing: 2, x: 80, y: 100, width: 760, height: 122, zIndex: 3, animation: { name: 'fadeInUp', duration: 800 }, editable: { content: true, fontSize: { type: 'range', min: 66, max: 124 } } },
      { id: 'gt-dumbbell', type: 'image', src: DUMBBELL, x: 800, y: 96, width: 210, height: 105, zIndex: 3, editable: { position: true, size: { type: 'scale' } } },
      { id: 'gt-week', type: 'text', content: '09.21 MON — 09.27 SUN　·　教练：Leo / Mia / 阿哲', fontFamily: { $t: 'fonts.heading' }, fontSize: 24, color: { $t: 'colors.ink' }, opacity: 0.6, x: 80, y: 236, width: 760, height: 34, zIndex: 3, editable: { content: true } },
      { id: 'gt-head-rule', type: 'shape', shapeKind: 'line', x: 80, y: 292, width: 920, height: 3, fill: { $t: 'colors.lime' }, zIndex: 3 },
      { id: 'gt-h1', type: 'text', content: '时间', fontFamily: { $t: 'fonts.heading' }, fontSize: 24, fontWeight: '700', color: { $t: 'colors.lime' }, letterSpacing: 2, x: 80, y: 306, width: 120, height: 32, zIndex: 3 },
      { id: 'gt-h2', type: 'text', content: '课程', fontFamily: { $t: 'fonts.heading' }, fontSize: 24, fontWeight: '700', color: { $t: 'colors.lime' }, letterSpacing: 2, x: 240, y: 306, width: 200, height: 32, zIndex: 3 },
      { id: 'gt-h3', type: 'text', content: '强度', fontFamily: { $t: 'fonts.heading' }, fontSize: 24, fontWeight: '700', color: { $t: 'colors.lime' }, x: 640, y: 306, width: 120, height: 32, zIndex: 3 },
      { id: 'gt-h4', type: 'text', content: '教室 / 余位', fontFamily: { $t: 'fonts.heading' }, fontSize: 24, fontWeight: '700', color: { $t: 'colors.lime' }, textAlign: 'right', x: 760, y: 306, width: 240, height: 32, zIndex: 3 },
      ...[['周一 07:00', '燃动动感单车', 'HIGH', 'A 厅 · 4'], ['周二 12:30', '午间功能性力量', 'MED', 'B 厅 · 9'], ['周三 19:00', '流瑜伽 Vinyasa', 'LOW', 'C 厅 · 2'], ['周四 20:00', '搏击有氧 BOXING', 'HIGH', 'A 厅 · 6'], ['周六 10:00', '壶铃循环训练', 'MED', 'B 厅 · 12'], ['周日 09:30', '拉伸与呼吸', 'LOW', 'C 厅 · 满']].map((r, i) => ([
        { id: `gt-row-${i}`, type: 'shape' as const, shapeKind: 'rect' as const, x: 76, y: 350 + i * 88, width: 928, height: 74, fill: { $t: 'colors.ink' } as any, opacity: i % 2 ? 0.04 : 0.08, borderRadius: 8, zIndex: 2 },
        { id: `gt-t-${i}`, type: 'text' as const, content: r[0], fontFamily: MONO as any, fontSize: 24, color: { $t: 'colors.ink' } as any, opacity: 0.9, x: 96, y: 366 + i * 88, width: 210, height: 34, zIndex: 3, animation: { name: 'fadeIn' as const, duration: 500, delay: 200 + i * 90 } as any, editable: { content: true } as any },
        { id: `gt-c-${i}`, type: 'text' as const, content: r[1], fontFamily: { $t: 'fonts.heading' } as any, fontSize: 30, fontWeight: '700' as any, color: { $t: 'colors.ink' } as any, x: 300, y: 362 + i * 88, width: 320, height: 42, zIndex: 3, editable: { content: true } as any },
        { id: `gt-l-${i}`, type: 'text' as const, content: r[2], fontFamily: MONO as any, fontSize: 20, fontWeight: '700' as any, color: r[2] === 'HIGH' ? { $t: 'colors.hot' } as any : { $t: 'colors.lime' } as any, x: 640, y: 370 + i * 88, width: 110, height: 30, zIndex: 3 },
        { id: `gt-r-${i}`, type: 'text' as const, content: r[3], fontFamily: MONO as any, fontSize: 24, color: { $t: 'colors.ink' } as any, opacity: 0.75, textAlign: 'right' as any, x: 700, y: 368 + i * 88, width: 290, height: 34, zIndex: 3, editable: { content: true } as any }
      ])).flat() as any,
      { id: 'gt-foot', type: 'text', content: '团课需提前 2 小时在小程序预约 · 取消不晚于开课前 30 分钟', fontFamily: { $t: 'fonts.heading' }, fontSize: 20, color: { $t: 'colors.ink' }, opacity: 0.55, letterSpacing: 1, x: 80, y: 902, width: 700, height: 30, zIndex: 3, editable: { content: true } },
      { id: 'gt-qr', type: 'image', src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 150 150">' + Array.from({ length: 100 }, (_, i) => (i * 7 + (i % 10) * 13) % 5 < 2 ? `<rect x='${(i % 10) * 15}' y='${Math.floor(i / 10) * 15}' width='15' height='15' fill='%23F8FAFC'/>` : '').join('') + '</svg>', x: 862, y: 880, width: 140, height: 140, opacity: 0.85, zIndex: 3 },
      { id: 'gt-qr-t', type: 'text', content: '扫码约课', fontFamily: { $t: 'fonts.heading' }, fontSize: 20, color: { $t: 'colors.ink' }, opacity: 0.6, textAlign: 'center', x: 862, y: 1024, width: 140, height: 26, zIndex: 3 }
    ]
  },

  // 3. 配速数据卡（16:9）
  {
    id: 'sport-run-split', name: '跑步配速数据卡', version: '1.0.0', category: 'sport',
    tags: ['sport', 'running', 'data', 'pace', 'split', '16:9'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="90" viewBox="0 0 160 90"><rect width="160" height="90" fill="%230B1120"/><polyline points="10,70 40,44 64,56 96,24 122,36 150,14" fill="none" stroke="%2322D3EE" stroke-width="3"/><rect x="10" y="78" width="40" height="4" fill="%2322D3EE" opacity="0.6"/><rect x="100" y="78" width="50" height="4" fill="%23F8FAFC" opacity="0.3"/></svg>',
    tokens: {
      colors: {
        bg: { label: '深色底', default: '#0B1120', options: ['#0B1120', '#111827', '#0F172A', '#F8FAFC'] },
        ink: { label: '数据白', default: '#F8FAFC', options: ['#F8FAFC', '#E2E8F0', '#111827', '#0F172A', '#F9FAFB', '#FEF3C7'] },
        cyan: { label: '曲线青', default: '#22D3EE', options: ['#22D3EE', '#A3E635', '#F59E0B', '#8B5CF6'] },
        dim: { label: '分隔灰', default: '#334155', options: ['#334155', '#94A3B8', '#CBD5E1', '#1E293B', '#4B5563'] }
      },
      fonts: { mono: { label: '数据字体', default: MONO, options: [MONO, SANS, '"Courier New", Georgia, monospace'] } }
    },
    presets: [
      { name: '午夜青蓝', colors: { bg: '#0B1120', ink: '#F8FAFC', cyan: '#22D3EE', dim: '#334155' } },
      { name: '碳黑柠绿', colors: { bg: '#111827', ink: '#F9FAFB', cyan: '#A3E635', dim: '#4B5563' } },
      { name: '落日橙调', colors: { bg: '#0F172A', ink: '#FEF3C7', cyan: '#F59E0B', dim: '#334155' } },
      { name: '纸面白模', colors: { bg: '#F8FAFC', ink: '#0F172A', cyan: '#8B5CF6', dim: '#CBD5E1' } }
    ],
    canvas: { virtualWidth: 1920, virtualHeight: 1080, defaultWidth: 1920, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'rs-grid-h', type: 'image', src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1920 1080">' + Array.from({ length: 9 }, (_, i) => `<line x1='0' y1='${110 * (i + 1)}' x2='1920' y2='${110 * (i + 1)}' stroke='%2394A3B8' stroke-opacity='0.12' stroke-width='2'/>`).join('') + '</svg>', x: 0, y: 0, width: 1920, height: 1080, objectFit: 'fill', zIndex: 1 },
      { id: 'rs-kicker', type: 'text', content: 'MORNING RUN · 09.20 SUN', fontFamily: { $t: 'fonts.mono' }, fontSize: 26, color: { $t: 'colors.cyan' }, letterSpacing: 6, x: 100, y: 76, width: 700, height: 36, zIndex: 3, animation: { name: 'fadeIn', duration: 600 } },
      { id: 'rs-title', type: 'text', content: '10.24 KM', fontFamily: { $t: 'fonts.mono' }, fontSize: 160, fontWeight: '700', color: { $t: 'colors.ink' }, letterSpacing: -2, x: 100, y: 116, width: 1000, height: 190, zIndex: 3, animation: { name: 'rise', duration: 800 }, editable: { content: true, fontSize: { type: 'range', min: 110, max: 210 }, position: true } },
      { id: 'rs-unit', type: 'text', content: '总距离　DISTANCE', fontFamily: { $t: 'fonts.mono' }, fontSize: 24, color: { $t: 'colors.dim' }, letterSpacing: 3, x: 100, y: 316, width: 400, height: 32, zIndex: 3 },
      { id: 'rs-chart', type: 'image', src: profileLine(1720, 360, '%2322D3EE', 88), x: 100, y: 388, width: 1720, height: 360, objectFit: 'fill', zIndex: 2, animation: { name: 'fadeIn', duration: 900, delay: 200 } },
      { id: 'rs-chart-axis', type: 'text', content: '配速 PACE（越低越快）', fontFamily: { $t: 'fonts.mono' }, fontSize: 20, color: { $t: 'colors.dim' }, letterSpacing: 2, x: 100, y: 756, width: 400, height: 28, zIndex: 3 },
      ...[['均配 05:12', 'AVG'], ['最快 04:38', 'KM 7'], ['最慢 06:04', 'KM 1'], ['爬升 68 m', 'ELEV'], ['心率 148', 'BPM']].map((r, i) => ([
        { id: `rs-st-${i}`, type: 'text' as const, content: r[0], fontFamily: { $t: 'fonts.mono' } as any, fontSize: 34, fontWeight: '700' as any, color: { $t: 'colors.ink' } as any, x: 100 + i * 350, y: 826, width: 330, height: 46, zIndex: 3, animation: { name: 'fadeInUp' as const, duration: 600, delay: 400 + i * 90 } as any, editable: { content: true } as any },
        { id: `rs-sl-${i}`, type: 'text' as const, content: r[1], fontFamily: { $t: 'fonts.mono' } as any, fontSize: 20, color: { $t: 'colors.cyan' } as any, letterSpacing: 3, opacity: 0.85, x: 102 + i * 350, y: 878, width: 300, height: 28, zIndex: 3 },
        { id: `rs-sb-${i}`, type: 'shape' as const, shapeKind: 'line' as const, x: 100 + i * 350, y: 918, width: 220, height: 2, fill: { $t: 'colors.dim' } as any, zIndex: 3 }
      ])).flat() as any,
      { id: 'rs-sneaker', type: 'image', src: SNEAKER, x: 1560, y: 96, width: 260, height: 146, opacity: 0.9, zIndex: 3, editable: { position: true, size: { type: 'scale' } } },
      { id: 'rs-watch', type: 'image', src: STOPWATCH, x: 1640, y: 254, width: 150, height: 162, opacity: 0.5, zIndex: 3 },
      { id: 'rs-foot', type: 'text', content: 'SHANGHAI · BUND RIVERSIDE　·　18℃ 微风　·　Recorded by WatchPro S3', fontFamily: { $t: 'fonts.mono' }, fontSize: 22, color: { $t: 'colors.dim' }, letterSpacing: 2, x: 100, y: 972, width: 1200, height: 30, zIndex: 3, editable: { content: true } }
    ]
  },

  // 4. 晨间瑜伽打卡（9:16）
  {
    id: 'sport-yoga-morning', name: '晨间瑜伽打卡', version: '1.0.0', category: 'sport',
    tags: ['sport', 'yoga', 'morning', 'wellness', 'checkin', '9:16'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="142" viewBox="0 0 80 142"><rect width="80" height="142" fill="%23FBF3E4"/><circle cx="40" cy="34" r="16" fill="%23F59E0B" opacity="0.5"/><circle cx="40" cy="62" r="7" fill="%232F3A22"/><path d="M22 96c6-16 30-16 36 0l4 14H18z" fill="%232F3A22"/><rect x="14" y="116" width="52" height="4" rx="2" fill="%232F3A22" opacity="0.35"/></svg>',
    tokens: {
      colors: {
        bg: { label: '晨光底', default: '#FBF3E4', options: ['#FBF3E4', '#F1F5ED', '#FDECEC', '#EEF3F8'] },
        ink: { label: '墨绿字', default: '#2F3A22', options: ['#2F3A22', '#3F2A1D', '#334155', '#14231B', '#5B2330', '#1E293B'] },
        sun: { label: '日出橙', default: '#F59E0B', options: ['#F59E0B', '#FB7185', '#86EFAC', '#93C5FD'] },
        mat: { label: '瑜伽垫', default: '#A3B18A', options: ['#A3B18A', '#D6A2AD', '#94A3B8', '#D9BFA0', '#7C9885'] }
      },
      fonts: { heading: { label: '标题字体', default: SERIF, options: [SERIF, SONG, SANS, 'Georgia, serif'] } }
    },
    presets: [
      { name: '晨光麦野', colors: { bg: '#FBF3E4', ink: '#2F3A22', sun: '#F59E0B', mat: '#A3B18A' } },
      { name: '玫瑰呼气', colors: { bg: '#FDECEC', ink: '#5B2330', sun: '#FB7185', mat: '#D6A2AD' } },
      { name: '桉叶青松', colors: { bg: '#F1F5ED', ink: '#14231B', sun: '#86EFAC', mat: '#7C9885' } },
      { name: '海盐晨雾', colors: { bg: '#EEF3F8', ink: '#1E293B', sun: '#93C5FD', mat: '#94A3B8' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1920, defaultWidth: 1080, defaultHeight: 1920, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'ym-photo', type: 'image', src: '/images/photo/yoga-morning-window-1080x900.jpg', objectFit: 'cover', x: 0, y: 0, width: 1080, height: 860, zIndex: 1, editable: { src: { type: 'upload' } } },
      { id: 'ym-scrim', type: 'overlay', x: 0, y: 520, width: 1080, height: 340, background: 'linear-gradient(180deg, rgba(251,243,228,0) 0%, rgba(251,243,228,0.96) 100%)', zIndex: 2 },
      { id: 'ym-sun', type: 'shape', shapeKind: 'circle', x: 790, y: 118, width: 190, height: 190, fill: { $t: 'colors.sun' }, opacity: 0.85, zIndex: 3, animation: { name: 'glow', duration: 3600, iterationCount: 'infinite' } },
      { id: 'ym-day', type: 'text', content: 'DAY 07 / 21', fontFamily: MONO, fontSize: 26, fontWeight: '700', color: { $t: 'colors.ink' }, letterSpacing: 4, x: 90, y: 726, width: 420, height: 36, zIndex: 4 },
      { id: 'ym-title', type: 'text', content: '晨间\n三十分钟', fontFamily: { $t: 'fonts.heading' }, fontSize: 118, fontWeight: '700', color: { $t: 'colors.ink' }, lineHeight: 1.16, x: 90, y: 780, width: 900, height: 300, zIndex: 4, animation: { name: 'fadeInUp', duration: 900 }, editable: { content: true, fontSize: { type: 'range', min: 84, max: 150 }, position: true } },
      { id: 'ym-sub', type: 'text', content: '醒身体，而不是醒闹钟。', fontFamily: SONG, fontSize: 36, color: { $t: 'colors.ink' }, opacity: 0.75, letterSpacing: 2, x: 90, y: 1104, width: 700, height: 50, zIndex: 4, editable: { content: true } },
      { id: 'ym-rule', type: 'shape', shapeKind: 'line', x: 90, y: 1184, width: 900, height: 2, fill: { $t: 'colors.ink' }, opacity: 0.25, zIndex: 4 },
      ...['拜日式 A × 5　唤醒脊柱', '战士二式　髋部打开', '三角扭转　侧腰延展', '仰卧束角　呼吸 4-7-8'].map((s, i) => (
        { id: `ym-li-${i}`, type: 'text' as const, content: (i + 1) + '　' + s, fontFamily: SONG as any, fontSize: 32, color: { $t: 'colors.ink' } as any, opacity: 0.88 - i * 0.05, x: 92, y: 1218 + i * 74, width: 760, height: 46, zIndex: 4, animation: { name: 'slideInLeft' as const, duration: 700, delay: 300 + i * 120 }, editable: { content: true } as any }
      )),
      ...[0, 1, 2, 3].map(i => (
        { id: `ym-dot-${i}`, type: 'shape' as const, shapeKind: 'circle' as const, x: 920, y: 1228 + i * 74, width: 26, height: 26, fill: i < 3 ? { $t: 'colors.sun' } as any : 'rgba(0,0,0,0)' as any, border: i < 3 ? undefined as any : { color: { $t: 'colors.ink' } as any, width: 2, style: 'solid' as any } as any, opacity: 0.9, zIndex: 4 }
      )),
      { id: 'ym-fig', type: 'image', src: YOGA, x: 720, y: 1520, width: 280, height: 243, opacity: 0.9, zIndex: 4, animation: { name: 'float', duration: 5200, iterationCount: 'infinite' }, editable: { position: true, size: { type: 'scale' } } },
      { id: 'ym-mat', type: 'shape', shapeKind: 'rect', x: 700, y: 1764, width: 320, height: 14, fill: { $t: 'colors.mat' }, opacity: 0.7, borderRadius: 8, zIndex: 3 },
      { id: 'ym-coach', type: 'text', content: '跟练 · Mia　｜　06:30　｜　客厅地毯即可', fontFamily: MONO, fontSize: 24, color: { $t: 'colors.ink' }, opacity: 0.6, letterSpacing: 1, x: 90, y: 1660, width: 600, height: 34, zIndex: 4, editable: { content: true } },
      { id: 'ym-foot', type: 'text', content: '21 DAYS MORNING YOGA　·　09.20 — 10.10', fontFamily: MONO, fontSize: 22, color: { $t: 'colors.sun' }, letterSpacing: 2, x: 90, y: 1754, width: 608, height: 30, zIndex: 4 }
    ]
  },

  // 5. 赛事对阵预告（4:5）
  {
    id: 'sport-match-vs', name: '赛事对阵预告', version: '1.0.0', category: 'sport',
    tags: ['sport', 'basketball', 'match', 'vs', 'poster', '4:5'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="125" viewBox="0 0 100 125"><rect width="100" height="125" fill="%230F172A"/><polygon points="0,0 46,0 30,125 0,125" fill="%23DC2626" opacity="0.8"/><polygon points="100,0 100,125 62,125 78,0" fill="%231D4ED8" opacity="0.85"/><text x="50" y="70" font-family="Impact, sans-serif" font-size="22" fill="%23FACC15" text-anchor="middle">VS</text></svg>',
    tokens: {
      colors: {
        bg: { label: '球场夜', default: '#0F172A', options: ['#0F172A', '#111827', '#1C1917', '#0B1120'] },
        home: { label: '主队红', default: '#DC2626', options: ['#DC2626', '#EA580C', '#B91C1C', '#DB2777'] },
        away: { label: '客队蓝', default: '#1D4ED8', options: ['#1D4ED8', '#0891B2', '#4F46E5', '#166534'] },
        gold: { label: '冠军金', default: '#FACC15', options: ['#FACC15', '#F59E0B', '#F8FAFC', '#F472B6'] }
      },
      fonts: { heading: { label: '标题字体', default: IMPACT, options: [IMPACT, SANS, '"Arial Black", sans-serif', YAHEI] } }
    },
    presets: [
      { name: '红蓝经典', colors: { bg: '#0F172A', home: '#DC2626', away: '#1D4ED8', gold: '#FACC15' } },
      { name: '橙青对抗', colors: { bg: '#111827', home: '#EA580C', away: '#0891B2', gold: '#F8FAFC' } },
      { name: '粉紫德比', colors: { bg: '#1C1917', home: '#DB2777', away: '#4F46E5', gold: '#F472B6' } },
      { name: '森林城市赛', colors: { bg: '#0B1120', home: '#B91C1C', away: '#166534', gold: '#FACC15' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'mv-home', type: 'shape', shapeKind: 'rect', x: -60, y: 0, width: 520, height: 1350, fill: { $t: 'colors.home' }, rotation: 8, opacity: 0.9, zIndex: 1 },
      { id: 'mv-away', type: 'shape', shapeKind: 'rect', x: 640, y: 0, width: 520, height: 1350, fill: { $t: 'colors.away' }, rotation: 8, opacity: 0.9, zIndex: 1 },
      { id: 'mv-stripes', type: 'image', src: stripes(1080, 1350, 70, '%23FFFFFF'), x: 0, y: 0, width: 1080, height: 1350, objectFit: 'fill', zIndex: 2 },
      { id: 'mv-scrim', type: 'overlay', x: 0, y: 0, width: 1080, height: 1350, background: 'linear-gradient(180deg, rgba(15,23,42,0.55) 0%, rgba(15,23,42,0.9) 62%, rgba(15,23,42,0.98) 100%)', zIndex: 3 },
      { id: 'mv-league', type: 'text', content: 'CITY BASKETBALL LEAGUE · 季后赛半决赛', fontFamily: { $t: 'fonts.heading' }, fontSize: 30, fontWeight: '700', color: { $t: 'colors.gold' }, letterSpacing: 5, textAlign: 'center', x: 90, y: 96, width: 900, height: 42, zIndex: 5, animation: { name: 'fadeIn', duration: 700 } },
      { id: 'mv-round', type: 'text', content: 'GAME 5　·　SEMI-FINAL', fontFamily: MONO, fontSize: 24, color: { $t: 'colors.gold' }, opacity: 0.8, letterSpacing: 4, textAlign: 'center', x: 90, y: 152, width: 900, height: 34, zIndex: 5 },
      { id: 'mv-home-name', type: 'text', content: '江北\n闪电', fontFamily: { $t: 'fonts.heading' }, fontSize: 118, fontWeight: '800', color: '#FFFFFF', lineHeight: 1.12, textAlign: 'left', x: 88, y: 320, width: 420, height: 280, zIndex: 5, animation: { name: 'slideInLeft', duration: 800 }, editable: { content: true, fontSize: { type: 'range', min: 80, max: 150 }, position: true } },
      { id: 'mv-away-name', type: 'text', content: '南海\n潮涌', fontFamily: { $t: 'fonts.heading' }, fontSize: 118, fontWeight: '800', color: '#FFFFFF', lineHeight: 1.12, textAlign: 'right', x: 572, y: 320, width: 420, height: 280, zIndex: 5, animation: { name: 'slideInRight', duration: 800 }, editable: { content: true, fontSize: { type: 'range', min: 80, max: 150 }, position: true } },
      { id: 'mv-vs-ring', type: 'shape', shapeKind: 'circle', x: 424, y: 396, width: 232, height: 232, fill: { $t: 'colors.bg' }, opacity: 0.9, zIndex: 5, animation: { name: 'pulse', duration: 2200, iterationCount: 'infinite' } },
      { id: 'mv-vs', type: 'text', content: 'VS', fontFamily: { $t: 'fonts.heading' }, fontSize: 132, fontWeight: '900', color: { $t: 'colors.gold' }, letterSpacing: 2, textAlign: 'center', x: 424, y: 440, width: 232, height: 150, zIndex: 6, animation: { name: 'zoomIn', duration: 700, delay: 300 }, editable: { content: true, fontSize: { type: 'range', min: 90, max: 170 } } },
      { id: 'mv-ball', type: 'image', src: BALL, x: 872, y: 138, width: 148, height: 148, rotation: -14, zIndex: 6, animation: { name: 'spinSlow', duration: 9000, iterationCount: 'infinite' }, editable: { position: true, size: { type: 'scale' } } },
      { id: 'mv-rec-home', type: 'text', content: '常规赛 24 胜 8 负　·　场均 96.4', fontFamily: MONO, fontSize: 24, color: '#FFFFFF', opacity: 0.8, x: 90, y: 636, width: 420, height: 34, zIndex: 5, editable: { content: true } },
      { id: 'mv-rec-away', type: 'text', content: '常规赛 22 胜 10 负　·　场均 92.1', fontFamily: MONO, fontSize: 24, color: '#FFFFFF', opacity: 0.8, textAlign: 'right', x: 570, y: 636, width: 420, height: 34, zIndex: 5, editable: { content: true } },
      { id: 'mv-divider', type: 'shape', shapeKind: 'line', x: 90, y: 726, width: 900, height: 4, fill: { $t: 'colors.gold' }, opacity: 0.7, zIndex: 5 },
      { id: 'mv-key', type: 'text', content: '看 点', fontFamily: { $t: 'fonts.heading' }, fontSize: 40, fontWeight: '800', color: { $t: 'colors.gold' }, letterSpacing: 8, x: 90, y: 762, width: 300, height: 52, zIndex: 5 },
      ...['闪电后场双人组 vs 潮涌禁区三塔', '主队快攻联盟第 1，客队防守效率第 2', '近 5 次交手 3 : 2，场均分差 3.4 分'].map((s, i) => (
        { id: `mv-key-${i}`, type: 'text' as const, content: '◆　' + s, fontFamily: YAHEI as any, fontSize: 28, color: '#FFFFFF' as any, opacity: 0.88, x: 92, y: 830 + i * 58, width: 900, height: 42, zIndex: 5, animation: { name: 'fadeInUp' as const, duration: 600, delay: 500 + i * 130 }, editable: { content: true } as any }
      )),
      { id: 'mv-when-box', type: 'shape', shapeKind: 'rect', x: 90, y: 1032, width: 900, height: 150, fill: 'rgba(0,0,0,0.5)', borderRadius: 12, zIndex: 5 },
      { id: 'mv-when', type: 'text', content: '09.26（周五）19:35　·　江北体育馆', fontFamily: { $t: 'fonts.heading' }, fontSize: 46, fontWeight: '700', color: '#FFFFFF', letterSpacing: 2, textAlign: 'center', x: 110, y: 1062, width: 860, height: 60, zIndex: 6, animation: { name: 'rise', duration: 700, delay: 700 }, editable: { content: true, fontSize: { type: 'range', min: 32, max: 60 }, position: true } },
      { id: 'mv-ticket', type: 'text', content: '门票 ¥ 80 / 120 / 200　·　官方直播 19:20 开启', fontFamily: MONO, fontSize: 26, color: { $t: 'colors.gold' }, textAlign: 'center', x: 110, y: 1130, width: 860, height: 36, zIndex: 6, editable: { content: true } },
      { id: 'mv-bottom', type: 'shape', shapeKind: 'rect', x: 0, y: 1268, width: 1080, height: 82, fill: { $t: 'colors.gold' }, zIndex: 5 },
      { id: 'mv-bottom-t', type: 'text', content: 'CBL PLAYOFFS · BE THERE　·　# 一晚定生死', fontFamily: { $t: 'fonts.heading' }, fontSize: 30, fontWeight: '800', color: { $t: 'colors.bg' }, letterSpacing: 4, textAlign: 'center', x: 60, y: 1290, width: 960, height: 40, zIndex: 6, editable: { content: true } }
    ]
  },

  // 6. 骑行路书（1:1）
  {
    id: 'sport-cycling-route', name: '骑行路书', version: '1.0.0', category: 'sport',
    tags: ['sport', 'cycling', 'route', 'elevation', 'guide', '1:1'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23F0F4EA"/><polyline points="12,72 30,40 48,58 66,26 88,50" fill="none" stroke="%23166534" stroke-width="4" stroke-linejoin="round"/><circle cx="12" cy="72" r="5" fill="%23166534"/><circle cx="88" cy="50" r="6" fill="none" stroke="%23DC2626" stroke-width="3"/><rect x="12" y="84" width="40" height="4" fill="%23166534" opacity="0.5"/></svg>',
    tokens: {
      colors: {
        bg: { label: '地图纸', default: '#F0F4EA', options: ['#F0F4EA', '#F5F1E8', '#EAF2F6', '#FBF3E4', '#111827'] },
        ink: { label: '等高线墨', default: '#1F2A24', options: ['#1F2A24', '#14231B', '#111827', '#3F2A1D', '#0F172A', '#F8FAFC'] },
        route: { label: '路线绿', default: '#166534', options: ['#166534', '#0F766E', '#B45309', '#DC2626', '#A3E635'] },
        flag: { label: '终点红', default: '#DC2626', options: ['#DC2626', '#EA580C', '#7C3AED', '#0EA5E9'] }
      },
      fonts: { heading: { label: '标题字体', default: SANS, options: [SANS, MONO, SERIF, 'Songti SC, SimSun, serif'] } }
    },
    presets: [
      { name: '青山绿道', colors: { bg: '#F0F4EA', ink: '#1F2A24', route: '#166534', flag: '#DC2626' } },
      { name: '海岸蓝调', colors: { bg: '#EAF2F6', ink: '#0F172A', route: '#0F766E', flag: '#EA580C' } },
      { name: '秋日柏油', colors: { bg: '#F5F1E8', ink: '#3F2A1D', route: '#B45309', flag: '#7C3AED' } },
      { name: '夜骑反光', colors: { bg: '#111827', ink: '#F8FAFC', route: '#A3E635', flag: '#0EA5E9' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1080, defaultWidth: 1080, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'cr-contour', type: 'image', src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1080" viewBox="0 0 1080 1080">' + Array.from({ length: 9 }, (_, i) => `<ellipse cx='${520 + i * 12}' cy='${500 + i * 8}' rx='${120 + i * 62}' ry='${80 + i * 44}' fill='none' stroke='%231F2A24' stroke-opacity='0.09' stroke-width='2'/>`).join('') + '</svg>', x: 0, y: 0, width: 1080, height: 1080, objectFit: 'fill', zIndex: 1 },
      { id: 'cr-head', type: 'text', content: 'ROUTE BOOK · 路 书', fontFamily: { $t: 'fonts.heading' }, fontSize: 28, fontWeight: '700', color: { $t: 'colors.route' }, letterSpacing: 6, x: 90, y: 74, width: 620, height: 38, zIndex: 4 },
      { id: 'cr-title', type: 'text', content: '环太湖西岸', fontFamily: { $t: 'fonts.heading' }, fontSize: 96, fontWeight: '800', color: { $t: 'colors.ink' }, letterSpacing: 2, x: 86, y: 116, width: 760, height: 120, zIndex: 4, animation: { name: 'fadeInDown', duration: 800 }, editable: { content: true, fontSize: { type: 'range', min: 64, max: 124 } } },
      { id: 'cr-no', type: 'text', content: 'NO. 07 / 12 · 09.20 SAT', fontFamily: MONO, fontSize: 24, color: { $t: 'colors.ink' }, opacity: 0.6, letterSpacing: 2, textAlign: 'right', x: 430, y: 74, width: 380, height: 34, zIndex: 4, editable: { content: true } },
      { id: 'cr-map', type: 'shape', shapeKind: 'rect', x: 86, y: 264, width: 908, height: 424, fill: 'rgba(0,0,0,0.03)', borderRadius: 6, border: { color: { $t: 'colors.ink' } as any, width: 2, style: 'solid' as const }, opacity: 0.9, zIndex: 2 },
      { id: 'cr-route', type: 'image', src: routePath(908, 424, '%23166534', 55), x: 86, y: 264, width: 908, height: 424, objectFit: 'fill', zIndex: 3, animation: { name: 'fadeIn', duration: 1000 } },
      { id: 'cr-pin-a', type: 'text', content: '起点 · 渔人码头 07:30', fontFamily: { $t: 'fonts.heading' }, fontSize: 22, fontWeight: '700', color: { $t: 'colors.route' }, x: 120, y: 616, width: 320, height: 30, zIndex: 4, editable: { content: true } },
      { id: 'cr-pin-b', type: 'text', content: '终点 · 鼋头渊闸 14:10', fontFamily: { $t: 'fonts.heading' }, fontSize: 22, fontWeight: '700', color: { $t: 'colors.flag' }, textAlign: 'right', x: 640, y: 300, width: 320, height: 30, zIndex: 4, editable: { content: true } },
      { id: 'cr-elev-l', type: 'text', content: 'ELEVATION 海拔剖面', fontFamily: MONO, fontSize: 20, color: { $t: 'colors.ink' }, opacity: 0.55, letterSpacing: 2, x: 88, y: 716, width: 380, height: 28, zIndex: 4 },
      { id: 'cr-elev', type: 'image', src: profileLine(908, 168, '%23166534', 41), x: 86, y: 748, width: 908, height: 168, objectFit: 'fill', zIndex: 3 },
      { id: 'cr-rule', type: 'shape', shapeKind: 'line', x: 86, y: 944, width: 908, height: 2, fill: { $t: 'colors.ink' }, opacity: 0.25, zIndex: 4 },
      ...[['距离', '128.6 km'], ['爬升', '842 m'], ['均速', '26.4 km/h'], ['补给', '4 站'], ['路面', '98% 柏油']].map((r, i) => ([
        { id: `cr-k-${i}`, type: 'text' as const, content: r[1], fontFamily: { $t: 'fonts.heading' } as any, fontSize: 34, fontWeight: '800' as any, color: { $t: 'colors.ink' } as any, x: 88 + i * 182, y: 968, width: 170, height: 44, zIndex: 4, animation: { name: 'fadeInUp' as const, duration: 600, delay: 300 + i * 100 } as any, editable: { content: true } as any },
        { id: `cr-kl-${i}`, type: 'text' as const, content: r[0], fontFamily: { $t: 'fonts.heading' } as any, fontSize: 20, color: { $t: 'colors.route' } as any, letterSpacing: 2, opacity: 0.9, x: 90 + i * 182, y: 1014, width: 160, height: 28, zIndex: 4 }
      ])).flat() as any,
      { id: 'cr-badge', type: 'shape', shapeKind: 'circle', x: 830, y: 96, width: 156, height: 156, fill: { $t: 'colors.flag' }, zIndex: 4, animation: { name: 'heartbeat', duration: 2600, iterationCount: 'infinite' } },
      { id: 'cr-badge-t', type: 'text', content: '中级\n爬升', fontFamily: { $t: 'fonts.heading' }, fontSize: 32, fontWeight: '800', color: '#FFFFFF', textAlign: 'center', lineHeight: 1.24, x: 830, y: 128, width: 156, height: 92, zIndex: 5, editable: { content: true } }
    ]
  }
]

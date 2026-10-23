// src/core/templates/emotional/emotional-music.ts
// 情绪分类补批 · 音乐·演出 6 个模板：音乐节阵容海报 / 专辑封面 / 演出票根 / 深夜歌单 / 巡演日程 / 歌词卡带
// 装饰为原创内联 SVG；实拍占位图用 Lorem Picsum（带 seed）
import type { Template } from '@/types/types'
import { seededInt } from '../_fx/common'

const seeded = seededInt

const SANS = 'Helvetica, Arial, sans-serif'
const SONG = 'Songti SC, SimSun, serif'
const SERIF = 'Didot, Georgia, "Times New Roman", serif'
const MONO = 'Consolas, Menlo, "Courier New", monospace'
const KAI = 'STKaiti, KaiTi, serif'
const YAHEI = '"Microsoft YaHei", "PingFang SC", sans-serif'
const IMPACT = 'Impact, Haettenschweiler, "Arial Black", sans-serif'

/** 星点 / 现场彩屑 */
function confetti(w: number, h: number, n = 90, seed = 13, fill = 'rgba(248,250,252,0.75)') {
  const rnd = seeded(seed); let c = ''
  for (let i = 0; i < n; i++) {
    const x = rnd() % w; const y = rnd() % h; const s = 2 + rnd() % 5
    c += rnd() % 3 === 0
      ? `<rect x='${x}' y='${y}' width='${s * 2}' height='${s}' transform='rotate(${rnd() % 90} ${x} ${y})' fill='${fill}'/>`
      : `<circle cx='${x}' cy='${y}' r='${s / 2}' fill='${fill}'/>`
  }
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" opacity="0.7">${c}</svg>`
}

/** 均衡器条（底部声压带） */
function eqBars(w: number, h: number, fill: string, seed = 5, bars = 30) {
  const rnd = seeded(seed); const step = w / bars; let r = ''
  for (let i = 0; i < bars; i++) {
    const bh = Math.round(h * (0.18 + (rnd() % 80) / 100))
    r += `<rect x='${Math.round(i * step + step * 0.22)}' y='${h - bh}' width='${Math.round(step * 0.56)}' height='${bh}'/>`
  }
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><g fill='${fill}'>${r}</g></svg>`
}

/** 声波线（正弦叠加） */
function soundWave(w: number, h: number, stroke: string, seed = 3) {
  const rnd = seeded(seed); const amp = h / 2; const phase = rnd() % 7; let d = `M0 ${amp}`
  for (let x = 1; x <= w; x += 6) {
    const y = amp + Math.sin((x / 34) + phase) * amp * 0.55 * Math.sin(x / 260) + Math.sin(x / 9 + phase) * 4
    d += ` L${x} ${Math.round(y)}`
  }
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" fill="none"><path d='${d}' stroke='${stroke}' stroke-width='4' stroke-linecap='round' stroke-linejoin='round'/></svg>`
}

/** 条码 */
function barcode(w: number, h: number, fill: string, seed = 17) {
  const rnd = seeded(seed); let bars = ''; let x = 0
  while (x < w - 6) { const bw = 1 + rnd() % 5; bars += `<rect x='${x}' y='0' width='${bw}' height='${h}'/>`; x += bw + 2 + rnd() % 3 }
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><g fill='${fill}'>${bars}</g></svg>`
}

// ===== 原创贴图 =====
// 黑胶唱片
const VINYL = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="320" height="320" viewBox="0 0 320 320"><circle cx="160" cy="160" r="154" fill="%23111318"/><g fill="none" stroke="%232C3240" stroke-width="2"><circle cx="160" cy="160" r="142"/><circle cx="160" cy="160" r="128"/><circle cx="160" cy="160" r="114"/><circle cx="160" cy="160" r="100"/><circle cx="160" cy="160" r="86"/></g><circle cx="160" cy="160" r="62" fill="%23C9A227"/><circle cx="160" cy="160" r="62" fill="none" stroke="%23111318" stroke-width="2" stroke-opacity="0.4"/><circle cx="160" cy="160" r="9" fill="%23111318"/><path d="M52 92a150 150 0 0 1 96-46" fill="none" stroke="%23FFFFFF" stroke-opacity="0.14" stroke-width="10"/></svg>'
// 卡带
const CASSETTE = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="360" height="230" viewBox="0 0 360 230"><rect x="6" y="6" width="348" height="218" rx="16" fill="%231F2430"/><rect x="6" y="6" width="348" height="218" rx="16" fill="none" stroke="%23000000" stroke-opacity="0.35" stroke-width="3"/><rect x="34" y="30" width="292" height="92" rx="8" fill="%23F3EFE0"/><rect x="52" y="48" width="180" height="9" rx="4" fill="%23C2410C"/><rect x="52" y="66" width="132" height="9" rx="4" fill="%231F2430" opacity="0.55"/><rect x="52" y="84" width="206" height="7" rx="3" fill="%231F2430" opacity="0.3"/><g><circle cx="128" cy="168" r="30" fill="%230E1116" stroke="%23F3EFE0" stroke-opacity="0.4" stroke-width="3"/><circle cx="232" cy="168" r="30" fill="%230E1116" stroke="%23F3EFE0" stroke-opacity="0.4" stroke-width="3"/><circle cx="128" cy="168" r="10" fill="%23C9A227"/><circle cx="232" cy="168" r="10" fill="%23C9A227"/><path d="M158 168h44" stroke="%230E1116" stroke-width="9"/></g></svg>'
// 话筒
const MIC = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="180" height="280" viewBox="0 0 180 280"><rect x="58" y="16" width="64" height="120" rx="32" fill="%23C9A227"/><g stroke="%23111318" stroke-opacity="0.45" stroke-width="4"><path d="M66 46h48M66 66h48M66 86h48M66 106h48"/></g><path d="M36 108a54 54 0 0 0 108 0" fill="none" stroke="%23F3EFE0" stroke-width="11" stroke-linecap="round"/><path d="M90 162v58" stroke="%23F3EFE0" stroke-width="11"/><path d="M52 250h76" stroke="%23F3EFE0" stroke-width="12" stroke-linecap="round"/></svg>'
// 耳机
const HEADPHONE = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="240" height="230" viewBox="0 0 240 230"><path d="M36 140v-26a84 84 0 0 1 168 0v26" fill="none" stroke="%23F3EFE0" stroke-width="14" stroke-linecap="round"/><rect x="14" y="128" width="52" height="82" rx="24" fill="%23C2410C"/><rect x="174" y="128" width="52" height="82" rx="24" fill="%23C2410C"/><rect x="28" y="146" width="24" height="46" rx="12" fill="%23F3EFE0" opacity="0.35"/></svg>'
// 音符
const NOTE = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><path d="M78 150V32l84-16v112" fill="none" stroke="%23C9A227" stroke-width="11" stroke-linecap="round"/><ellipse cx="52" cy="152" rx="30" ry="23" fill="%23C9A227"/><ellipse cx="136" cy="132" rx="28" ry="21" fill="%23C9A227"/></svg>'

export const emotionalMusicTemplates: Template[] = [
  // 1. 音乐节阵容海报（4:5）
  {
    id: 'emotional-music-lineup', name: '音乐节阵容海报', version: '1.0.0', category: 'emotional',
    tags: ['emotional', 'music', 'festival', 'lineup', 'poster', '4:5'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="125" viewBox="0 0 100 125"><rect width="100" height="125" fill="%23171029"/><rect x="16" y="20" width="68" height="9" fill="%23F8FAFC"/><rect x="24" y="34" width="52" height="9" fill="%23F97316"/><rect x="18" y="56" width="64" height="4" fill="%23F8FAFC" opacity="0.6"/><rect x="26" y="64" width="48" height="4" fill="%23F8FAFC" opacity="0.4"/><rect x="20" y="72" width="60" height="4" fill="%23F8FAFC" opacity="0.25"/><rect x="14" y="94" width="72" height="12" fill="%237C3AED" opacity="0.7"/></svg>',
    tokens: {
      colors: {
        bg: { label: '夜空底', default: '#171029', options: ['#171029', '#0B1B2B', '#1A0F1E', '#08140F'] },
        hot: { label: '主视觉', default: '#F97316', options: ['#F97316', '#22D3EE', '#F472B6', '#A3E635'] },
        cool: { label: '辅助光', default: '#7C3AED', options: ['#7C3AED', '#818CF8', '#0EA5E9', '#DB2777', '#A78BFA', '#22D3EE'] },
        text: { label: '海报字', default: '#F8FAFC', options: ['#F8FAFC', '#FDF6E3', '#ECFCCB', '#E2E8F0', '#F1F5F9'] }
      },
      fonts: {
        heading: { label: '标题字体', default: YAHEI, options: [YAHEI, SONG, SERIF, SANS] },
        body: { label: '信息字体', default: MONO, options: [MONO, SANS, SERIF, KAI] }
      }
    },
    presets: [
      { name: '落日橙紫', colors: { bg: '#171029', hot: '#F97316', cool: '#7C3AED', text: '#F8FAFC' } },
      { name: '深海靛蓝', colors: { bg: '#0B1B2B', hot: '#22D3EE', cool: '#818CF8', text: '#F1F5F9' } },
      { name: '玫红夜色', colors: { bg: '#1A0F1E', hot: '#F472B6', cool: '#A78BFA', text: '#FDF6E3' } },
      { name: '荧光绿潮', colors: { bg: '#08140F', hot: '#A3E635', cool: '#22D3EE', text: '#ECFCCB' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'fl-glow', type: 'overlay', background: 'radial-gradient(ellipse at 50% 108%, rgba(249,115,22,0.42) 0%, rgba(249,115,22,0) 58%), radial-gradient(ellipse at 12% 8%, rgba(124,58,237,0.40) 0%, rgba(124,58,237,0) 52%)', x: 0, y: 0, width: 1080, height: 1350, zIndex: 1 },
      { id: 'fl-confetti', type: 'image', src: confetti(1080, 1350, 110, 17, 'rgba(248,250,252,0.7)'), x: 0, y: 0, width: 1080, height: 1350, objectFit: 'fill', zIndex: 2, animation: { name: 'drift', duration: 11000, iterationCount: 'infinite' } },
      { id: 'fl-frame', type: 'shape', shapeKind: 'rect', x: 42, y: 42, width: 996, height: 1266, fill: 'rgba(0,0,0,0)', border: { color: { $t: 'colors.text' } as any, width: 2, style: 'solid' as const }, opacity: 0.28, zIndex: 4 },
      { id: 'fl-kicker', type: 'text', content: 'THE 3RD SUNSET WAVE FESTIVAL', fontFamily: { $t: 'fonts.body' }, fontSize: 26, fontWeight: '700', color: { $t: 'colors.hot' }, letterSpacing: 8, textAlign: 'center', x: 92, y: 104, width: 896, height: 34, zIndex: 5, animation: { name: 'fadeIn', duration: 700 } },
      { id: 'fl-title', type: 'text', content: '落日浪\n音 乐 节', fontFamily: { $t: 'fonts.heading' }, fontSize: 158, fontWeight: '900', color: { $t: 'colors.text' }, lineHeight: 1.14, textAlign: 'center', x: 72, y: 150, width: 936, height: 400, zIndex: 5, animation: { name: 'rise', duration: 1000 }, editable: { content: true, fontSize: { type: 'range', min: 110, max: 190 }, position: true } },
      { id: 'fl-en', type: 'text', content: 'SUNSET  WAVE', fontFamily: IMPACT, fontSize: 64, color: { $t: 'colors.cool' }, letterSpacing: 14, textAlign: 'center', x: 120, y: 566, width: 840, height: 76, zIndex: 5, animation: { name: 'fadeInUp', duration: 800, delay: 250 }, editable: { content: true } },
      { id: 'fl-rule', type: 'shape', shapeKind: 'line', x: 280, y: 668, width: 520, height: 3, fill: { $t: 'colors.hot' }, zIndex: 5, animation: { name: 'slideInLeft', duration: 700, delay: 320 } },
      ...[['新 裤 子'], ['万能青年旅店'], ['告 五 人']].map((r, i) => (
        { id: `fl-head-${i}`, type: 'text' as const, content: r[0], fontFamily: { $t: 'fonts.heading' } as any, fontSize: 68, fontWeight: '800' as any, color: { $t: 'colors.text' } as any, letterSpacing: 4, textAlign: 'center' as any, x: 92, y: 690 + i * 82, width: 896, height: 78, zIndex: 5, animation: { name: 'fadeInUp' as const, duration: 650, delay: 380 + i * 120 } as any, editable: { content: true } as any }
      )),
      { id: 'fl-tier2', type: 'text', content: '房东的猫 · 回春丹 · 康姆士 · 橘子海\n椅子乐团 · 旅行团 · 声音玩具 · 五条人', fontFamily: { $t: 'fonts.heading' }, fontSize: 34, fontWeight: '600', color: { $t: 'colors.hot' }, lineHeight: 1.62, textAlign: 'center', x: 120, y: 950, width: 840, height: 116, zIndex: 5, animation: { name: 'fadeIn', duration: 800, delay: 760 }, editable: { content: true, position: true } },
      { id: 'fl-tier3', type: 'text', content: '刺猬 / 木玛 / 海朋森 / 生命之饼 / 左小祖咒 / 二手玫瑰 / 重塑雕像的权利 / 大波浪 / 秘密后院 / 时光胶囊 / 白水 / 黑撒', fontFamily: { $t: 'fonts.body' }, fontSize: 23, color: { $t: 'colors.text' }, opacity: 0.62, lineHeight: 1.72, textAlign: 'center', x: 110, y: 1078, width: 860, height: 96, zIndex: 5, editable: { content: true } },
      { id: 'fl-eq', type: 'image', src: eqBars(900, 62, '%23F97316', 9, 34), x: 90, y: 1188, width: 900, height: 62, objectFit: 'fill', opacity: 0.85, zIndex: 5, animation: { name: 'pulse', duration: 2200, iterationCount: 'infinite' } },
      { id: 'fl-date', type: 'shape', shapeKind: 'rect', x: 92, y: 1268, width: 286, height: 58, fill: { $t: 'colors.hot' }, borderRadius: 6, zIndex: 6 },
      { id: 'fl-date-t', type: 'text', content: '09.20 — 09.22', fontFamily: { $t: 'fonts.body' }, fontSize: 30, fontWeight: '800', color: { $t: 'colors.bg' }, letterSpacing: 2, textAlign: 'center', x: 92, y: 1280, width: 286, height: 36, zIndex: 7, editable: { content: true } },
      { id: 'fl-venue', type: 'text', content: '海口 · 假日海滩 · 16:00 开场', fontFamily: { $t: 'fonts.heading' }, fontSize: 27, color: { $t: 'colors.text' }, opacity: 0.85, x: 410, y: 1282, width: 400, height: 34, zIndex: 6, editable: { content: true } },
      { id: 'fl-price', type: 'text', content: '三日通票 ¥ 480', fontFamily: { $t: 'fonts.body' }, fontSize: 27, fontWeight: '700', color: { $t: 'colors.cool' }, textAlign: 'right', x: 760, y: 1282, width: 228, height: 34, zIndex: 6, editable: { content: true } },
      { id: 'fl-mic', type: 'image', src: MIC, x: 890, y: 116, width: 104, height: 162, opacity: 0.95, rotation: 14, zIndex: 6, animation: { name: 'swing', duration: 4200, iterationCount: 'infinite' }, editable: { position: true, size: { type: 'scale' } } }
    ]
  },

  // 2. 专辑封面（1:1）
  {
    id: 'emotional-music-album', name: '专辑封面', version: '1.0.0', category: 'emotional',
    tags: ['emotional', 'music', 'album', 'vinyl', 'cover', '1:1'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%230E1116"/><circle cx="72" cy="34" r="26" fill="%23161A22" stroke="%232C3240"/><circle cx="72" cy="34" r="8" fill="%23C9A227"/><rect x="12" y="48" width="42" height="9" fill="%23F5F2E8"/><rect x="12" y="62" width="28" height="4" fill="%23C9A227"/><rect x="12" y="76" width="52" height="3" fill="%23F5F2E8" opacity="0.3"/></svg>',
    tokens: {
      colors: {
        bg: { label: '封套底', default: '#0E1116', options: ['#0E1116', '#141B2A', '#1B1410', '#10100E', '#F5F2E8'] },
        text: { label: '套面字', default: '#F5F2E8', options: ['#F5F2E8', '#FFFFFF', '#FDF6E3', '#E2E8F0', '#14181F'] },
        accent: { label: '中心标金', default: '#C9A227', options: ['#C9A227', '#B08D3E', '#7DD3FC', '#F97316', '#C2410C'] },
        dim: { label: '暗部', default: '#2C3240', options: ['#2C3240', '#3F3F46', '#4B5563', '#57534E', '#D6D3D1'] }
      },
      fonts: { heading: { label: '标题字体', default: SERIF, options: [SERIF, SONG, SANS, KAI] } }
    },
    presets: [
      { name: '黑金母带', colors: { bg: '#0E1116', text: '#F5F2E8', accent: '#C9A227', dim: '#2C3240' } },
      { name: '午夜蓝调', colors: { bg: '#141B2A', text: '#E2E8F0', accent: '#7DD3FC', dim: '#3F3F46' } },
      { name: '棕褐旧声', colors: { bg: '#1B1410', text: '#FDF6E3', accent: '#B08D3E', dim: '#57534E' } },
      { name: '素白极简', colors: { bg: '#F5F2E8', text: '#14181F', accent: '#C2410C', dim: '#D6D3D1' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1080, defaultWidth: 1080, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'ac-vignette', type: 'overlay', background: 'radial-gradient(circle at 76% 34%, rgba(201,162,39,0.16) 0%, rgba(0,0,0,0) 46%)', x: 0, y: 0, width: 1080, height: 1080, zIndex: 1 },
      { id: 'ac-vinyl', type: 'image', src: VINYL, x: 596, y: 96, width: 520, height: 520, zIndex: 3, animation: { name: 'spinSlow', duration: 22000, iterationCount: 'infinite' }, editable: { position: true, size: { type: 'scale' } } },
      { id: 'ac-groove', type: 'shape', shapeKind: 'circle', x: 132, y: 132, width: 816, height: 816, fill: 'rgba(0,0,0,0)', border: { color: { $t: 'colors.dim' } as any, width: 2, style: 'solid' as const }, opacity: 0.5, zIndex: 2 },
      { id: 'ac-kicker', type: 'text', content: 'SECOND ALBUM · 第二张录音室专辑', fontFamily: MONO, fontSize: 22, color: { $t: 'colors.text' }, opacity: 0.6, letterSpacing: 5, x: 96, y: 156, width: 560, height: 30, zIndex: 5 },
      { id: 'ac-title', type: 'text', content: '潮 汐', fontFamily: { $t: 'fonts.heading' }, fontSize: 236, fontWeight: '700', color: { $t: 'colors.text' }, x: 96, y: 322, width: 640, height: 260, zIndex: 5, animation: { name: 'inkReveal', duration: 1300 }, editable: { content: true, fontSize: { type: 'range', min: 160, max: 280 }, position: true } },
      { id: 'ac-en', type: 'text', content: 'T I D E S', fontFamily: IMPACT, fontSize: 46, color: { $t: 'colors.accent' }, letterSpacing: 8, x: 96, y: 596, width: 520, height: 56, zIndex: 5, editable: { content: true } },
      { id: 'ac-rule', type: 'shape', shapeKind: 'line', x: 104, y: 686, width: 872, height: 3, fill: { $t: 'colors.accent' }, opacity: 0.85, zIndex: 5 },
      { id: 'ac-artist', type: 'text', content: '林 声  LIN SHENG', fontFamily: { $t: 'fonts.heading' }, fontSize: 40, fontWeight: '700', color: { $t: 'colors.text' }, x: 96, y: 712, width: 520, height: 48, zIndex: 5, editable: { content: true } },
      { id: 'ac-tracks', type: 'text', content: 'A1 潮汐　A2 晚风　A3 海的三种形状　A4 无岸\nB1 归途　B2 雾中灯塔　B3 长夜　B4 汐退之后', fontFamily: MONO, fontSize: 25, color: { $t: 'colors.text' }, lineHeight: 1.85, x: 96, y: 792, width: 872, height: 120, zIndex: 5, editable: { content: true } },
      { id: 'ac-stereo', type: 'shape', shapeKind: 'rect', x: 104, y: 944, width: 250, height: 54, fill: 'rgba(0,0,0,0)', border: { color: { $t: 'colors.text' } as any, width: 2, style: 'solid' as const }, opacity: 0.7, zIndex: 5 },
      { id: 'ac-stereo-t', type: 'text', content: 'STEREO · 33⅓', fontFamily: MONO, fontSize: 24, fontWeight: '700', color: { $t: 'colors.text' }, letterSpacing: 2, textAlign: 'center', x: 96, y: 956, width: 250, height: 30, zIndex: 6 },
      { id: 'ac-cat', type: 'text', content: 'CAT. LS-026　·　℗ 2026 潮汐唱片　·　_SIDE A 21′48″_', fontFamily: MONO, fontSize: 18, color: { $t: 'colors.text' }, opacity: 0.55, letterSpacing: 1, textAlign: 'right', x: 400, y: 960, width: 576, height: 28, zIndex: 6 },
      { id: 'ac-note', type: 'image', src: NOTE, x: 856, y: 706, width: 120, height: 120, opacity: 0.9, rotation: 12, zIndex: 5, animation: { name: 'float', duration: 5600, iterationCount: 'infinite' }, editable: { position: true, size: { type: 'scale' } } }
    ]
  },

  // 3. 演出票根（16:9）
  {
    id: 'emotional-music-ticket', name: '演出票根', version: '1.0.0', category: 'emotional',
    tags: ['emotional', 'music', 'ticket', 'concert', 'stub', '16:9'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="90" viewBox="0 0 160 90"><rect width="160" height="90" fill="%2312101E"/><rect x="12" y="20" width="136" height="50" fill="%23F5F2E8"/><rect x="12" y="20" width="136" height="5" fill="%23C2410C"/><rect x="104" y="20" width="2" height="50" fill="%2312101E" opacity="0.3"/><rect x="22" y="34" width="54" height="7" fill="%2312101E"/><rect x="22" y="48" width="40" height="4" fill="%2312101E" opacity="0.4"/><rect x="114" y="52" width="26" height="10" fill="%2312101E"/></svg>',
    tokens: {
      colors: {
        bg: { label: '夜色底', default: '#12101E', options: ['#12101E', '#0B1B2B', '#1B1410', '#10100E', '#1A0F1E'] },
        paper: { label: '票面纸', default: '#F5F2E8', options: ['#F5F2E8', '#FFFFFF', '#FDF6E3', '#EEF2E6', '#EEF2F6', '#F3E7D3'] },
        ink: { label: '印刷墨', default: '#12101E', options: ['#12101E', '#111827', '#3F2A1D', '#14231B', '#0B1B2B', '#1A0F1E'] },
        neon: { label: '舞台色', default: '#C2410C', options: ['#C2410C', '#7C3AED', '#0F766E', '#B23A2E'] }
      },
      fonts: {
        heading: { label: '标题字体', default: SONG, options: [SONG, YAHEI, SERIF, KAI] },
        body: { label: '票面字体', default: MONO, options: [MONO, SANS, SERIF, YAHEI] }
      }
    },
    presets: [
      { name: '旧纸暖橙', colors: { bg: '#12101E', paper: '#F5F2E8', ink: '#12101E', neon: '#C2410C' } },
      { name: '冷调靛蓝', colors: { bg: '#0B1B2B', paper: '#EEF2F6', ink: '#0B1B2B', neon: '#0F766E' } },
      { name: '紫电夜场', colors: { bg: '#1A0F1E', paper: '#FDF6E3', ink: '#1A0F1E', neon: '#7C3AED' } },
      { name: '赭石复刻', colors: { bg: '#1B1410', paper: '#F3E7D3', ink: '#3F2A1D', neon: '#B23A2E' } }
    ],
    canvas: { virtualWidth: 1920, virtualHeight: 1080, defaultWidth: 1920, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'ts-spot', type: 'overlay', background: 'radial-gradient(ellipse at 20% 0%, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 48%), radial-gradient(ellipse at 84% 100%, rgba(194,65,12,0.20) 0%, rgba(194,65,12,0) 52%)', x: 0, y: 0, width: 1920, height: 1080, zIndex: 1 },
      { id: 'ts-shadow', type: 'shape', shapeKind: 'rect', x: 176, y: 188, width: 1600, height: 720, fill: { $t: 'colors.ink' }, opacity: 0.35, rotation: -2, zIndex: 2 },
      { id: 'ts-paper', type: 'shape', shapeKind: 'rect', x: 150, y: 166, width: 1620, height: 748, fill: { $t: 'colors.paper' }, borderRadius: 10, zIndex: 3 },
      { id: 'ts-headband', type: 'shape', shapeKind: 'rect', x: 150, y: 166, width: 1620, height: 92, fill: { $t: 'colors.neon' }, borderRadius: 0, zIndex: 4 },
      ...Array.from({ length: 11 }, (_, i) => ({ id: `ts-perf-${i}`, type: 'shape' as const, shapeKind: 'circle' as const, x: 1258, y: 196 + i * 64, width: 18, height: 18, fill: { $t: 'colors.bg' } as any, opacity: 0.9, group: 'perf', zIndex: 6 })),
      { id: 'ts-band-t', type: 'text', content: 'ADMIT ONE · 单场票 · 对号入座', fontFamily: { $t: 'fonts.body' }, fontSize: 28, fontWeight: '800', color: { $t: 'colors.paper' }, letterSpacing: 7, x: 206, y: 194, width: 900, height: 38, zIndex: 5 },
      { id: 'ts-band-r', type: 'text', content: 'NO. SW26-0920-0417', fontFamily: { $t: 'fonts.body' }, fontSize: 26, fontWeight: '700', color: { $t: 'colors.paper' }, opacity: 0.9, letterSpacing: 3, textAlign: 'right', x: 1120, y: 196, width: 600, height: 34, zIndex: 5, editable: { content: true } },
      { id: 'ts-kicker', type: 'text', content: 'SUNSET WAVE LIVE 2026', fontFamily: { $t: 'fonts.body' }, fontSize: 24, fontWeight: '700', color: { $t: 'colors.neon' }, letterSpacing: 6, x: 206, y: 302, width: 700, height: 32, zIndex: 5 },
      { id: 'ts-title', type: 'text', content: '落日浪音乐节\n海口场 · 万能青年旅店', fontFamily: { $t: 'fonts.heading' }, fontSize: 74, fontWeight: '800', color: { $t: 'colors.ink' }, lineHeight: 1.24, x: 202, y: 342, width: 1000, height: 220, zIndex: 5, animation: { name: 'fadeInUp', duration: 900 }, editable: { content: true, fontSize: { type: 'range', min: 52, max: 92 }, position: true } },
      { id: 'ts-rule', type: 'shape', shapeKind: 'line', x: 206, y: 590, width: 1000, height: 3, fill: { $t: 'colors.ink' }, opacity: 0.7, zIndex: 5 },
      ...[['TIME 时间', '09.20 SUN 19:30'], ['VENUE 场地', '海口假日海滩 主舞台'], ['GATE 入口', 'B 口 · 无障碍通道东侧']].map((f, i) => ([
        { id: `ts-f-l-${i}`, type: 'text' as const, content: f[0], fontFamily: { $t: 'fonts.body' } as any, fontSize: 21, color: { $t: 'colors.ink' } as any, opacity: 0.5, letterSpacing: 4, x: 206 + i * 340, y: 622, width: 300, height: 28, zIndex: 5 },
        { id: `ts-f-v-${i}`, type: 'text' as const, content: f[1], fontFamily: { $t: 'fonts.heading' } as any, fontSize: 32, fontWeight: '700' as any, color: { $t: 'colors.ink' } as any, x: 204 + i * 340, y: 656, width: 320, height: 44, zIndex: 5, animation: { name: 'fadeInUp' as const, duration: 600, delay: 300 + i * 120 } as any, editable: { content: true } as any }
      ])).flat() as any,
      { id: 'ts-seats', type: 'text', content: 'A 区　·　12 排　·　08 号', fontFamily: { $t: 'fonts.heading' }, fontSize: 44, fontWeight: '800', color: { $t: 'colors.neon' }, x: 204, y: 750, width: 720, height: 58, zIndex: 5, editable: { content: true, size: { type: 'scale' } } },
      { id: 'ts-terms', type: 'text', content: '开场后入场请配合检票　·　场内禁止航拍器　·　本票不记名、遗失不补、副券撕下无效', fontFamily: { $t: 'fonts.body' }, fontSize: 20, color: { $t: 'colors.ink' }, opacity: 0.55, letterSpacing: 1, x: 206, y: 830, width: 1000, height: 28, zIndex: 5, editable: { content: true } },
      { id: 'ts-wave', type: 'image', src: soundWave(560, 96, '%23C2410C', 4), x: 1290, y: 300, width: 440, height: 96, objectFit: 'fill', opacity: 0.8, zIndex: 5 },
      { id: 'ts-mic', type: 'image', src: MIC, x: 1320, y: 414, width: 100, height: 156, opacity: 0.9, zIndex: 5, editable: { position: true, size: { type: 'scale' } } },
      { id: 'ts-price', type: 'text', content: '¥ 480', fontFamily: { $t: 'fonts.heading' }, fontSize: 84, fontWeight: '800', color: { $t: 'colors.ink' }, x: 1466, y: 424, width: 250, height: 100, zIndex: 5, editable: { content: true, size: { type: 'scale' } } },
      { id: 'ts-eq', type: 'image', src: eqBars(440, 70, '%2312101E', 7, 22), x: 1290, y: 606, width: 440, height: 70, objectFit: 'fill', opacity: 0.5, zIndex: 5 },
      { id: 'ts-barcode', type: 'image', src: barcode(440, 118, '%2312101E', 31), x: 1290, y: 706, width: 440, height: 118, objectFit: 'fill', zIndex: 5 },
      { id: 'ts-barcode-t', type: 'text', content: 'SW26 · 0920 · 12/08 · A', fontFamily: { $t: 'fonts.body' }, fontSize: 21, color: { $t: 'colors.ink' }, opacity: 0.6, letterSpacing: 3, textAlign: 'center', x: 1290, y: 832, width: 440, height: 28, zIndex: 5 }
    ]
  },

  // 4. 深夜歌单（9:16）
  {
    id: 'emotional-music-night-playlist', name: '深夜歌单', version: '1.0.0', category: 'emotional',
    tags: ['emotional', 'music', 'playlist', 'night', '9:16'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="142" viewBox="0 0 80 142"><rect width="80" height="142" fill="%230B1020"/><circle cx="62" cy="20" r="9" fill="%23E8B04B"/><rect x="12" y="34" width="42" height="6" fill="%23F1F5F9"/><rect x="14" y="56" width="52" height="40" fill="%2322304A"/><rect x="12" y="106" width="52" height="4" fill="%23F1F5F9" opacity="0.5"/><rect x="12" y="116" width="36" height="4" fill="%23F1F5F9" opacity="0.3"/></svg>',
    tokens: {
      colors: {
        bg: { label: '深夜底', default: '#0B1020', options: ['#0B1020', '#12101E', '#08140F', '#1A1014'] },
        text: { label: '主文字', default: '#F1F5F9', options: ['#F1F5F9', '#FDF6E3', '#E2E8F0', '#ECFCCB'] },
        accent: { label: '月亮黄', default: '#E8B04B', options: ['#E8B04B', '#7DD3FC', '#F472B6', '#A3E635'] },
        deep: { label: '暗部蓝', default: '#22304A', options: ['#22304A', '#3B2E52', '#1F2937', '#2A3B34', '#3A2328'] }
      },
      fonts: { heading: { label: '标题字体', default: SONG, options: [SONG, KAI, SERIF, YAHEI] } }
    },
    presets: [
      { name: '月白风清', colors: { bg: '#0B1020', text: '#F1F5F9', accent: '#E8B04B', deep: '#22304A' } },
      { name: '紫夜霓虹', colors: { bg: '#12101E', text: '#E2E8F0', accent: '#7DD3FC', deep: '#3B2E52' } },
      { name: '雨林夜色', colors: { bg: '#08140F', text: '#ECFCCB', accent: '#A3E635', deep: '#2A3B34' } },
      { name: '玫瑰凌晨', colors: { bg: '#1A1014', text: '#FDF6E3', accent: '#F472B6', deep: '#3A2328' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1920, defaultWidth: 1080, defaultHeight: 1920, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'np-glow', type: 'overlay', background: 'radial-gradient(ellipse at 78% 6%, rgba(232,176,75,0.22) 0%, rgba(232,176,75,0) 40%), radial-gradient(ellipse at 20% 96%, rgba(34,48,74,0.85) 0%, rgba(34,48,74,0) 58%)', x: 0, y: 0, width: 1080, height: 1920, zIndex: 1 },
      { id: 'np-stars', type: 'image', src: confetti(1080, 700, 70, 23, 'rgba(241,245,249,0.65)'), x: 0, y: 0, width: 1080, height: 700, objectFit: 'fill', zIndex: 2, animation: { name: 'twinkle', duration: 6000, iterationCount: 'infinite' } },
      { id: 'np-moon', type: 'shape', shapeKind: 'circle', x: 852, y: 96, width: 108, height: 108, fill: { $t: 'colors.accent' }, opacity: 0.92, zIndex: 3, animation: { name: 'glow', duration: 4200, iterationCount: 'infinite' } },
      { id: 'np-moon-cut', type: 'shape', shapeKind: 'circle', x: 812, y: 76, width: 96, height: 96, fill: { $t: 'colors.bg' }, zIndex: 4 },
      { id: 'np-kicker', type: 'text', content: 'MIDNIGHT PLAYLIST · 深 夜 歌 单', fontFamily: MONO, fontSize: 24, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 6, x: 90, y: 128, width: 700, height: 32, zIndex: 5, animation: { name: 'fadeIn', duration: 700 } },
      { id: 'np-title', type: 'text', content: '失眠的人\n请戴上耳机', fontFamily: { $t: 'fonts.heading' }, fontSize: 96, fontWeight: '800', color: { $t: 'colors.text' }, lineHeight: 1.2, x: 90, y: 180, width: 720, height: 260, zIndex: 5, animation: { name: 'rise', duration: 950 }, editable: { content: true, fontSize: { type: 'range', min: 68, max: 122 }, position: true } },
      { id: 'np-sub', type: 'text', content: '03:07 AM　·　48 SONGS　·　连续播放第 4 晚', fontFamily: MONO, fontSize: 24, color: { $t: 'colors.text' }, opacity: 0.6, letterSpacing: 3, x: 90, y: 456, width: 700, height: 32, zIndex: 5, editable: { content: true } },
      { id: 'np-photo', type: 'image', src: '/images/photo/rainy-window-midnight-city-900x640.jpg', objectFit: 'cover', borderRadius: 20, x: 90, y: 528, width: 900, height: 560, zIndex: 5, editable: { src: { type: 'upload' }, position: true } },
      { id: 'np-photo-scrim', type: 'overlay', background: 'linear-gradient(180deg, rgba(11,16,32,0) 48%, rgba(11,16,32,0.82) 100%)', borderRadius: 20, x: 90, y: 528, width: 900, height: 560, zIndex: 6 },
      { id: 'np-now', type: 'text', content: '正在播放 · 告五人《在这座城市遗失了你》', fontFamily: { $t: 'fonts.heading' }, fontSize: 30, color: { $t: 'colors.text' }, x: 122, y: 966, width: 700, height: 40, zIndex: 7, editable: { content: true } },
      { id: 'np-bar-bg', type: 'shape', shapeKind: 'rect', x: 122, y: 1028, width: 836, height: 6, fill: { $t: 'colors.text' }, opacity: 0.22, borderRadius: 3, zIndex: 7 },
      { id: 'np-bar-fg', type: 'shape', shapeKind: 'rect', x: 122, y: 1028, width: 322, height: 6, fill: { $t: 'colors.accent' }, borderRadius: 3, zIndex: 8, animation: { name: 'slideInLeft', duration: 1200, delay: 400 } },
      { id: 'np-time-l', type: 'text', content: '01:24', fontFamily: MONO, fontSize: 20, color: { $t: 'colors.text' }, opacity: 0.6, x: 122, y: 1046, width: 100, height: 26, zIndex: 7 },
      { id: 'np-time-r', type: 'text', content: '-03:12', fontFamily: MONO, fontSize: 20, color: { $t: 'colors.text' }, opacity: 0.6, textAlign: 'right', x: 858, y: 1046, width: 100, height: 26, zIndex: 7 },
      { id: 'np-wave', type: 'image', src: soundWave(900, 110, '%23E8B04B', 6), x: 90, y: 1116, width: 900, height: 110, objectFit: 'fill', opacity: 0.55, zIndex: 5, animation: { name: 'pulse', duration: 2600, iterationCount: 'infinite' } },
      { id: 'np-list-head', type: 'text', content: 'NEXT UP · 即 将 播 放', fontFamily: MONO, fontSize: 22, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 5, x: 90, y: 1272, width: 500, height: 30, zIndex: 5 },
      ...[['05', '雾都情人', '陈绮贞', '4:12'], ['06', '夜空中最亮的星', '逃跑计划', '3:58'], ['07', '漠河舞厅', '柳爽', '4:30'], ['08', '城市的脸', '声音玩具', '6:04'], ['09', '晚安', '颜人中', '3:41']].map((r, i) => ([
        { id: `np-n-${i}`, type: 'text' as const, content: r[0], fontFamily: MONO as any, fontSize: 22, color: { $t: 'colors.text' } as any, opacity: 0.45, x: 90, y: 1320 + i * 84, width: 70, height: 30, zIndex: 5 },
        { id: `np-t-${i}`, type: 'text' as const, content: r[1], fontFamily: { $t: 'fonts.heading' } as any, fontSize: 34, fontWeight: '600' as any, color: { $t: 'colors.text' } as any, x: 170, y: 1314 + i * 84, width: 470, height: 44, zIndex: 5, animation: { name: 'fadeInUp' as const, duration: 600, delay: 260 + i * 90 } as any, editable: { content: true } as any },
        { id: `np-a-${i}`, type: 'text' as const, content: r[2], fontFamily: { $t: 'fonts.heading' } as any, fontSize: 24, color: { $t: 'colors.text' } as any, opacity: 0.55, x: 646, y: 1322 + i * 84, width: 240, height: 32, zIndex: 5, editable: { content: true } as any },
        { id: `np-d-${i}`, type: 'text' as const, content: r[3], fontFamily: MONO as any, fontSize: 23, color: { $t: 'colors.accent' } as any, opacity: 0.85, textAlign: 'right' as any, x: 876, y: 1320 + i * 84, width: 114, height: 32, zIndex: 5, editable: { content: true } as any },
        { id: `np-r-${i}`, type: 'shape' as const, shapeKind: 'line' as const, x: 90, y: 1382 + i * 84, width: 900, height: 1, fill: { $t: 'colors.text' } as any, opacity: 0.14, zIndex: 5 }
      ])).flat() as any,
      { id: 'np-foot', type: 'text', content: '定时关闭 30 分钟　·　已为你降低低频', fontFamily: { $t: 'fonts.heading' }, fontSize: 24, color: { $t: 'colors.accent' }, letterSpacing: 2, textAlign: 'center', x: 90, y: 1770, width: 900, height: 32, zIndex: 5, editable: { content: true } },
      { id: 'np-headphone', type: 'image', src: HEADPHONE, x: 828, y: 1664, width: 168, height: 161, opacity: 0.9, zIndex: 5, animation: { name: 'float', duration: 5400, iterationCount: 'infinite' }, editable: { position: true, size: { type: 'scale' } } }
    ]
  },

  // 5. 巡演日程（4:5）
  {
    id: 'emotional-music-tour-dates', name: '巡演日程', version: '1.0.0', category: 'emotional',
    tags: ['emotional', 'music', 'tour', 'dates', 'live', '4:5'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="125" viewBox="0 0 100 125"><rect width="100" height="125" fill="%23F5F2E8"/><rect x="12" y="14" width="60" height="8" fill="%2312101E"/><path d="M18 40c20 6 8 22 28 28s6 22 30 24" fill="none" stroke="%23C2410C" stroke-width="3" stroke-dasharray="6 5"/><circle cx="18" cy="40" r="4" fill="%23C2410C"/><circle cx="46" cy="68" r="4" fill="%23C2410C"/><circle cx="76" cy="92" r="4" fill="%2312101E"/><rect x="12" y="104" width="72" height="4" fill="%2312101E" opacity="0.25"/></svg>',
    tokens: {
      colors: {
        paper: { label: '海报纸', default: '#F5F2E8', options: ['#F5F2E8', '#FFFFFF', '#EEF2E6', '#F7EAE4'] },
        ink: { label: '印刷黑', default: '#12101E', options: ['#12101E', '#111827', '#14231B', '#3F2A1D'] },
        route: { label: '路线红', default: '#C2410C', options: ['#C2410C', '#B23A2E', '#1D6FA5', '#166534'] },
        soft: { label: '辅助灰', default: '#8A8577', options: ['#8A8577', '#94A3B8', '#A3B18A', '#B7A99A'] }
      },
      fonts: { heading: { label: '标题字体', default: SONG, options: [SONG, SERIF, YAHEI, KAI] } }
    },
    presets: [
      { name: '米纸赭红', colors: { paper: '#F5F2E8', ink: '#12101E', route: '#C2410C', soft: '#8A8577' } },
      { name: '雪白藏青', colors: { paper: '#FFFFFF', ink: '#111827', route: '#1D6FA5', soft: '#94A3B8' } },
      { name: '草原青墨', colors: { paper: '#EEF2E6', ink: '#14231B', route: '#166534', soft: '#A3B18A' } },
      { name: '旧粉棕调', colors: { paper: '#F7EAE4', ink: '#3F2A1D', route: '#B23A2E', soft: '#B7A99A' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.paper' } },
    elements: [
      { id: 'tour-grain', type: 'image', src: confetti(1080, 1350, 120, 41, 'rgba(18,16,30,0.18)'), x: 0, y: 0, width: 1080, height: 1350, objectFit: 'fill', zIndex: 1 },
      { id: 'tour-frame', type: 'shape', shapeKind: 'rect', x: 46, y: 46, width: 988, height: 1258, fill: 'rgba(0,0,0,0)', border: { color: { $t: 'colors.ink' } as any, width: 3, style: 'solid' as const }, zIndex: 4 },
      { id: 'tour-kicker', type: 'text', content: 'ON TOUR 2026 · 秋 季 巡 演', fontFamily: MONO, fontSize: 25, fontWeight: '700', color: { $t: 'colors.route' }, letterSpacing: 8, x: 92, y: 106, width: 700, height: 34, zIndex: 5 },
      { id: 'tour-title', type: 'text', content: '潮汐\n巡回演出表', fontFamily: { $t: 'fonts.heading' }, fontSize: 120, fontWeight: '800', color: { $t: 'colors.ink' }, lineHeight: 1.16, x: 92, y: 150, width: 640, height: 320, zIndex: 5, animation: { name: 'inkReveal', duration: 1200 }, editable: { content: true, fontSize: { type: 'range', min: 84, max: 148 }, position: true } },
      { id: 'tour-artist', type: 'text', content: '林 声 与 潮 汐 乐 队', fontFamily: { $t: 'fonts.heading' }, fontSize: 40, fontWeight: '700', color: { $t: 'colors.route' }, letterSpacing: 6, x: 92, y: 494, width: 620, height: 52, zIndex: 5, editable: { content: true } },
      { id: 'tour-note', type: 'text', content: '六城剧场巡演 · 全席位对号入座 · 演出时长约 110 分钟（含返场 3 首）', fontFamily: { $t: 'fonts.heading' }, fontSize: 25, color: { $t: 'colors.soft' }, lineHeight: 1.6, x: 92, y: 560, width: 620, height: 80, zIndex: 5, editable: { content: true } },
      { id: 'tour-route', type: 'image', src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="260" height="420" viewBox="0 0 260 420" fill="none"><path d="M40 386C104 350 16 300 76 254S214 214 168 156 60 96 118 40" stroke="%23C2410C" stroke-width="6" stroke-dasharray="18 16" stroke-linecap="round"/><circle cx="40" cy="386" r="12" fill="%23C2410C"/><circle cx="76" cy="254" r="10" fill="%2312101E"/><circle cx="168" cy="156" r="10" fill="%2312101E"/><circle cx="118" cy="40" r="12" fill="%23C2410C"/></svg>', x: 744, y: 150, width: 260, height: 420, objectFit: 'fill', zIndex: 4 },
      { id: 'tour-rule', type: 'shape', shapeKind: 'line', x: 92, y: 672, width: 896, height: 4, fill: { $t: 'colors.ink' }, zIndex: 5 },
      ...[['10.11', '上 海', '梅赛德斯奔驰文化中心', '售罄', true], ['10.18', '杭 州', '大剧院 · 紫金厅', '余票少量', false], ['10.25', '成 都', '城市音乐厅', '预售中', false], ['11.08', '武 汉', 'Cdca 戏院', '预售中', false], ['11.15', '西 安', '音乐厅 · 交响厅', '余票充足', false], ['11.29', '北 京', '星光现场 · 收官场', '加场', false]].map((r, i) => ([
        { id: `tour-city-${i}`, type: 'text' as const, content: r[1], fontFamily: { $t: 'fonts.heading' } as any, fontSize: 52, fontWeight: '800' as any, color: { $t: 'colors.ink' } as any, letterSpacing: 3, x: 92, y: 700 + i * 100, width: 240, height: 60, zIndex: 5, animation: { name: 'fadeInUp' as const, duration: 620, delay: 200 + i * 90 } as any, editable: { content: true } as any },
        { id: `tour-date-${i}`, type: 'text' as const, content: r[0], fontFamily: MONO as any, fontSize: 26, fontWeight: '700' as any, color: { $t: 'colors.route' } as any, x: 92, y: 762 + i * 100, width: 180, height: 30, zIndex: 5 },
        { id: `tour-venue-${i}`, type: 'text' as const, content: r[2], fontFamily: { $t: 'fonts.heading' } as any, fontSize: 26, color: { $t: 'colors.soft' } as any, x: 350, y: 716 + i * 100, width: 420, height: 36, zIndex: 5, editable: { content: true } as any },
        { id: `tour-tag-${i}`, type: 'shape' as const, shapeKind: 'rect' as const, x: 812, y: 710 + i * 100, width: 176, height: 48, fill: r[4] ? ({ $t: 'colors.ink' } as any) : 'rgba(0,0,0,0)', border: { color: { $t: 'colors.route' } as any, width: 2, style: 'solid' as const }, opacity: 1, zIndex: 5 },
        { id: `tour-tag-t-${i}`, type: 'text' as const, content: r[3], fontFamily: { $t: 'fonts.heading' } as any, fontSize: 25, fontWeight: '700' as any, color: r[4] ? ({ $t: 'colors.paper' } as any) : ({ $t: 'colors.route' } as any), textAlign: 'center' as any, x: 812, y: 720 + i * 100, width: 176, height: 32, zIndex: 6, editable: { content: true } as any }
      ])).flat() as any,
      { id: 'tour-tickets', type: 'text', content: '大麦 / 秀动 / 乐队官方商店　·　每单限购 4 张　·　儿童凭票入场', fontFamily: { $t: 'fonts.heading' }, fontSize: 24, color: { $t: 'colors.ink' }, opacity: 0.7, textAlign: 'center', x: 92, y: 1236, width: 896, height: 32, zIndex: 5, editable: { content: true } },
      { id: 'tour-org', type: 'text', content: '主办：潮汐唱片　·　巡演路由：@声音旅行', fontFamily: MONO, fontSize: 21, color: { $t: 'colors.soft' }, letterSpacing: 2, textAlign: 'center', x: 92, y: 1276, width: 896, height: 28, zIndex: 5 }
    ]
  },

  // 6. 歌词卡带（1:1）
  {
    id: 'emotional-music-cassette-lyric', name: '歌词卡带', version: '1.0.0', category: 'emotional',
    tags: ['emotional', 'music', 'cassette', 'lyrics', 'retro', '1:1'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23EFE7D6"/><rect x="12" y="30" width="76" height="46" rx="6" fill="%231F2430"/><rect x="20" y="38" width="60" height="20" fill="%23F3EFE0"/><rect x="26" y="44" width="34" height="4" fill="%23C2410C"/><circle cx="38" cy="66" r="6" fill="%230E1116"/><circle cx="62" cy="66" r="6" fill="%230E1116"/><rect x="16" y="14" width="40" height="5" fill="%231F2430" opacity="0.7"/></svg>',
    tokens: {
      colors: {
        shell: { label: '卡带壳', default: '#1F2430', options: ['#1F2430', '#0E1116', '#232019', '#12231C', '#E7E5E4'] },
        label: { label: '标签纸', default: '#F3EFE0', options: ['#F3EFE0', '#FFFFFF', '#FBF3DE', '#EAF1EC'] },
        ink: { label: '手写字', default: '#1F2430', options: ['#1F2430', '#111827', '#3F2A1D', '#14231B', '#14181F'] },
        accent: { label: '侧标橙', default: '#C2410C', options: ['#C2410C', '#0F766E', '#7C3AED', '#B23A2E'] }
      },
      fonts: { heading: { label: '手写体', default: KAI, options: [KAI, SONG, SERIF, YAHEI] } }
    },
    presets: [
      { name: '旧卡带橙', colors: { shell: '#1F2430', label: '#F3EFE0', ink: '#1F2430', accent: '#C2410C' } },
      { name: '石墨青调', colors: { shell: '#0E1116', label: '#EAF1EC', ink: '#111827', accent: '#0F766E' } },
      { name: '复古紫罗兰', colors: { shell: '#232019', label: '#FBF3DE', ink: '#3F2A1D', accent: '#7C3AED' } },
      { name: '素白卡带', colors: { shell: '#E7E5E4', label: '#FFFFFF', ink: '#14181F', accent: '#B23A2E' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1080, defaultWidth: 1080, defaultHeight: 1080, backgroundColor: { $t: 'colors.label' } },
    elements: [
      { id: 'cs-grain', type: 'image', src: confetti(1080, 1080, 130, 61, 'rgba(31,36,48,0.16)'), x: 0, y: 0, width: 1080, height: 1080, objectFit: 'fill', zIndex: 1 },
      { id: 'cs-cassette', type: 'image', src: CASSETTE, x: 220, y: 96, width: 640, height: 409, zIndex: 3, animation: { name: 'float', duration: 6200, iterationCount: 'infinite' }, editable: { position: true, size: { type: 'scale' } } },
      { id: 'cs-side', type: 'text', content: 'SIDE A　·　04:12', fontFamily: MONO, fontSize: 26, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 6, x: 92, y: 548, width: 400, height: 34, zIndex: 5 },
      { id: 'cs-title', type: 'text', content: '在这座城市\n遗失了你', fontFamily: { $t: 'fonts.heading' }, fontSize: 96, fontWeight: '700', color: { $t: 'colors.ink' }, lineHeight: 1.2, x: 92, y: 590, width: 904, height: 250, zIndex: 5, animation: { name: 'inkReveal', duration: 1200 }, editable: { content: true, fontSize: { type: 'range', min: 68, max: 122 }, position: true } },
      { id: 'cs-rule', type: 'shape', shapeKind: 'line', x: 92, y: 862, width: 896, height: 3, fill: { $t: 'colors.ink' }, opacity: 0.7, zIndex: 5 },
      { id: 'cs-lyric', type: 'text', content: '我把钥匙留在第七层的窗台，\n风替你翻过那一页歌词。\n后来每一首歌都像你 ——\n唱到副歌，我才敢闭眼。', fontFamily: { $t: 'fonts.heading' }, fontSize: 32, color: { $t: 'colors.ink' }, opacity: 0.86, lineHeight: 1.45, x: 92, y: 886, width: 640, height: 178, zIndex: 5, editable: { content: true, position: true } },
      { id: 'cs-credit', type: 'text', content: '词曲：林声 · 编曲：潮汐乐队\n录制：2026.09.19 凌晨 · 家中客厅', fontFamily: MONO, fontSize: 20, color: { $t: 'colors.ink' }, opacity: 0.55, lineHeight: 1.7, textAlign: 'right', x: 688, y: 902, width: 300, height: 96, zIndex: 5, editable: { content: true } },
      { id: 'cs-wave', type: 'image', src: soundWave(300, 64, '%23C2410C', 11), x: 736, y: 1006, width: 252, height: 54, objectFit: 'fill', opacity: 0.8, zIndex: 5 },
      { id: 'cs-scar', type: 'shape', shapeKind: 'rect', x: 92, y: 96, width: 300, height: 12, fill: { $t: 'colors.accent' }, opacity: 0.5, rotation: -6, zIndex: 2 },
      { id: 'cs-tape', type: 'shape', shapeKind: 'rect', x: 848, y: 60, width: 150, height: 44, fill: { $t: 'colors.accent' }, opacity: 0.35, rotation: 24, zIndex: 4 }
    ]
  }
]

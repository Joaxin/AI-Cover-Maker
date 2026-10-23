// src/core/templates/nature/nature-travel.ts
// 自然风补批 · 旅行·户外 6 个模板：护照盖章页 / 山路行程路书 / 明信片 / 登机牌 / 露营清单 / 海岛浮潜日志
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

/** 等高线（旅行地图底纹），颜色由调用方给 */
function contour(w: number, h: number, stroke: string, seed = 24, n = 10) {
  const rnd = seeded(seed); let p = ''
  for (let i = 0; i < n; i++) {
    const cx = 120 + (rnd() % Math.max(1, w - 240)); const cy = 120 + (rnd() % Math.max(1, h - 240))
    for (let k = 1; k <= 4; k++) p += `<ellipse cx='${Math.round(cx)}' cy='${Math.round(cy)}' rx='${k * (34 + i * 5)}' ry='${k * (22 + i * 4)}'/>`
  }
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><g fill='none' stroke='${stroke}' stroke-opacity='0.16' stroke-width='2'>${p}</g></svg>`
}

/** 虚线航线（含起终标点） */
function flightPath(w: number, h: number, stroke: string) {
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" fill='none'><path d='M20 ${h - 24} Q ${w * 0.42} 6 ${w - 26} ${h * 0.42}' stroke='${stroke}' stroke-width='5' stroke-dasharray='16 14' stroke-linecap='round'/><circle cx='20' cy='${h - 24}' r='11' fill='${stroke}'/><circle cx='${w - 26}' cy='${h * 0.42}' r='13' stroke='${stroke}' stroke-width='6'/></svg>`
}

/** 山峦剪影层 */
function ridge(w: number, h: number, fill: string, seed = 9) {
  const rnd = seeded(seed); let pts = `0,${h}`; const steps = 9
  for (let i = 0; i <= steps; i++) pts += ` ${Math.round((i / steps) * w)},${Math.round(h - (rnd() % Math.round(h * 0.78)) - h * 0.1)}`
  pts += ` ${w},${h}`
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><polygon points='${pts}' fill='${fill}'/></svg>`
}

/** 圆章（护照戳 / 营地章），文字用百分号编码避免 data URI 编码风险 */
function roundStamp(size: number, stroke: string, topText: string, bottomText: string) {
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><g fill='none' stroke='${stroke}'><circle cx='${size / 2}' cy='${size / 2}' r='${size / 2 - 6}' stroke-width='6'/><circle cx='${size / 2}' cy='${size / 2}' r='${size / 2 - 22}' stroke-width='2'/></g><text x='${size / 2}' y='${size * 0.3}' font-family='Helvetica, Arial, sans-serif' font-size='${size * 0.1}' font-weight='700' letter-spacing='3' fill='${stroke}' text-anchor='middle'>${topText}</text><text x='${size / 2}' y='${size * 0.58}' font-family='Songti SC, serif' font-size='${size * 0.17}' font-weight='700' fill='${stroke}' text-anchor='middle'>${bottomText}</text><text x='${size / 2}' y='${size * 0.76}' font-family='Helvetica, Arial, sans-serif' font-size='${size * 0.08}' letter-spacing='2' fill='${stroke}' text-anchor='middle'>2026.09.20</text></svg>`
}

/** 条码 */
function barcode(w: number, h: number, fill: string, seed = 17) {
  const rnd = seeded(seed); let bars = ''; let x = 0
  while (x < w - 6) { const bw = 1 + rnd() % 5; bars += `<rect x='${x}' y='0' width='${bw}' height='${h}'/>`; x += bw + 2 + rnd() % 3 }
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><g fill='${fill}'>${bars}</g></svg>`
}

// ===== 原创贴图 =====
// 纸飞机
const PLANE = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="280" height="200" viewBox="0 0 280 200"><polygon points="12,88 268,10 158,190 122,116" fill="%23F8FAFC" stroke="%231F2A24" stroke-width="5" stroke-linejoin="round"/><polygon points="12,88 268,10 122,116" fill="%23DCE6DA"/><path d="M122 116 L158 190 L140 122" fill="%23B9C7BB" stroke="%231F2A24" stroke-width="4"/></svg>'
// 指南针
const COMPASS = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="220" height="220" viewBox="0 0 220 220"><circle cx="110" cy="110" r="100" fill="none" stroke="%231F2A24" stroke-width="6"/><circle cx="110" cy="110" r="82" fill="none" stroke="%231F2A24" stroke-width="2" stroke-dasharray="4 8"/><polygon points="110,44 128,110 110,126 92,110" fill="%23B23A2E"/><polygon points="110,176 92,110 110,94 128,110" fill="%231F2A24"/><circle cx="110" cy="110" r="9" fill="%23F8FAFC" stroke="%231F2A24" stroke-width="4"/></svg>'
// 帐篷
const TENT = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="320" height="220" viewBox="0 0 320 220"><polygon points="160,16 306,204 14,204" fill="%23D97706"/><polygon points="160,16 232,204 88,204" fill="%23F59E0B" opacity="0.55"/><path d="M160 60 L160 204" stroke="%237C2D12" stroke-width="5"/><polygon points="160,120 196,204 124,204" fill="%237C2D12"/><path d="M300 204 h-286" stroke="%231F2A24" stroke-width="6" stroke-linecap="round"/></svg>'
// 棕榈岛
const ISLAND = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="320" height="260" viewBox="0 0 320 260"><ellipse cx="160" cy="226" rx="140" ry="26" fill="%23F5E6C8"/><path d="M150 214c-6-52 4-92 26-124" fill="none" stroke="%237C4A23" stroke-width="12" stroke-linecap="round"/><g fill="%232F7D5B"><path d="M176 90c-32-24-64-22-84 4 30-4 54 2 74 18z"/><path d="M176 90c34-20 66-14 84 14-30-8-56-6-76 6z"/><path d="M176 90c-6-36 10-60 40-70-16 22-20 46-14 68z"/><path d="M176 96c14 30 42 42 74 36-26-14-48-24-62-42z"/></g><ellipse cx="160" cy="226" rx="140" ry="10" fill="none" stroke="%230EA5E9" stroke-opacity="0.4" stroke-width="4"/></svg>'
// 潜水面镜
const SNORKEL = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="280" height="180" viewBox="0 0 280 180"><path d="M40 52h200a24 24 0 0 1 24 24v28a24 24 0 0 1-24 24H40a24 24 0 0 1-24-24V76a24 24 0 0 1 24-24z" fill="none" stroke="%230F172A" stroke-width="9"/><rect x="52" y="66" width="176" height="48" rx="18" fill="%237DD3FC" opacity="0.55"/><path d="M240 66c26 4 26 46 0 50" fill="none" stroke="%230F172A" stroke-width="9"/><path d="M56 52V28h34v24" fill="none" stroke="%23DC2626" stroke-width="9" stroke-linecap="round"/></svg>'

export const natureTravelTemplates: Template[] = [
  // 1. 护照盖章页（4:5）
  {
    id: 'nature-travel-passport', name: '护照盖章页', version: '1.0.0', category: 'travel',
    tags: ['nature', 'travel', 'passport', 'stamp', 'journey', '4:5'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="125" viewBox="0 0 100 125"><rect width="100" height="125" fill="%23F2EFE4"/><rect x="10" y="10" width="80" height="105" fill="%23FBF8EF" stroke="%23B08D3E"/><circle cx="66" cy="40" r="17" fill="none" stroke="%23B23A2E" stroke-width="3"/><circle cx="36" cy="66" r="14" fill="none" stroke="%231E3A5F" stroke-width="3"/><rect x="18" y="92" width="52" height="4" fill="%231F2A24" opacity="0.35"/></svg>',
    tokens: {
      colors: {
        paper: { label: '内页纸', default: '#F2EFE4', options: ['#F2EFE4', '#EAF1EA', '#F6E8E6', '#E9EFF5'] },
        ink: { label: '印刷墨', default: '#1F2A24', options: ['#1F2A24', '#14231B', '#111827', '#3F2A1D'] },
        stampA: { label: '戳记红', default: '#B23A2E', options: ['#B23A2E', '#1E3A5F', '#166534', '#7C3AED', '#0F766E', '#B45309'] },
        stampB: { label: '戳记蓝', default: '#1E3A5F', options: ['#1E3A5F', '#0F766E', '#B45309', '#4C1D95', '#7C2D12', '#0EA5E9'] },
        gold: { label: '烫金线', default: '#B08D3E', options: ['#B08D3E', '#C9A227', '#8A5A2B', '#A3B18A'] }
      },
      fonts: { heading: { label: '标题字体', default: SONG, options: [SONG, SERIF, KAI, SANS] } }
    },
    presets: [
      { name: '米纸双戳', colors: { paper: '#F2EFE4', ink: '#1F2A24', stampA: '#B23A2E', stampB: '#1E3A5F', gold: '#B08D3E' } },
      { name: '雪线青蓝', colors: { paper: '#E9EFF5', ink: '#14231B', stampA: '#0F766E', stampB: '#1E3A5F', gold: '#8A5A2B' } },
      { name: '秋叶赭色', colors: { paper: '#F6E8E6', ink: '#3F2A1D', stampA: '#B45309', stampB: '#7C2D12', gold: '#C9A227' } },
      { name: '海岛薄荷', colors: { paper: '#EAF1EA', ink: '#14231B', stampA: '#166534', stampB: '#0EA5E9', gold: '#A3B18A' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.paper' } },
    elements: [
      { id: 'tp-frame', type: 'shape', shapeKind: 'rect', x: 46, y: 46, width: 988, height: 1258, fill: 'rgba(0,0,0,0)', border: { color: { $t: 'colors.gold' } as any, width: 3, style: 'solid' as const }, zIndex: 4 },
      { id: 'tp-contour', type: 'image', src: contour(988, 1258, '%231F2A24', 24), x: 46, y: 46, width: 988, height: 1258, objectFit: 'fill', zIndex: 1 },
      { id: 'tp-hair', type: 'shape', shapeKind: 'rect', x: 46, y: 46, width: 988, height: 1258, fill: 'rgba(0,0,0,0)', border: { color: { $t: 'colors.ink' } as any, width: 1, style: 'solid' as const }, opacity: 0.3, zIndex: 4 },
      { id: 'tp-kicker', type: 'text', content: 'TRAVEL RECORD · 行 程 记', fontFamily: MONO, fontSize: 24, color: { $t: 'colors.ink' }, opacity: 0.65, letterSpacing: 6, x: 96, y: 96, width: 600, height: 34, zIndex: 5 },
      { id: 'tp-title', type: 'text', content: '横断山脉\n纵贯线', fontFamily: { $t: 'fonts.heading' }, fontSize: 110, fontWeight: '800', color: { $t: 'colors.ink' }, lineHeight: 1.18, x: 96, y: 140, width: 640, height: 300, zIndex: 5, animation: { name: 'inkReveal', duration: 1100 }, editable: { content: true, fontSize: { type: 'range', min: 76, max: 148 }, position: true } },
      { id: 'tp-route', type: 'text', content: '成都 → 康定 → 理塘 → 德钦 → 雨崩', fontFamily: { $t: 'fonts.heading' }, fontSize: 30, color: { $t: 'colors.stampB' }, letterSpacing: 1, x: 96, y: 466, width: 680, height: 42, zIndex: 5, editable: { content: true } },
      { id: 'tp-stamp-a', type: 'image', src: roundStamp(300, '%23B23A2E', 'SICHUAN', '%E7%90%86%E5%A1%98'), x: 700, y: 132, width: 300, height: 300, rotation: -14, opacity: 0.88, zIndex: 6, animation: { name: 'zoomIn', duration: 700 }, editable: { position: true, size: { type: 'scale' } } },
      { id: 'tp-stamp-b', type: 'image', src: roundStamp(244, '%231E3A5F', 'YUNNAN', '%E5%BE%B7%E6%AC%BD'), x: 108, y: 556, width: 244, height: 244, rotation: 9, opacity: 0.82, zIndex: 6, editable: { position: true, size: { type: 'scale' } } },
      { id: 'tp-plane', type: 'image', src: PLANE, x: 640, y: 520, width: 244, height: 174, rotation: -8, opacity: 0.9, zIndex: 5, animation: { name: 'drift', duration: 6000, iterationCount: 'infinite' }, editable: { position: true, size: { type: 'scale' } } },
      { id: 'tp-path', type: 'image', src: flightPath(360, 200, '%231F2A24'), x: 470, y: 560, width: 360, height: 200, objectFit: 'fill', opacity: 0.55, zIndex: 4 },
      { id: 'tp-col-l', type: 'shape', shapeKind: 'line', x: 96, y: 830, width: 888, height: 2, fill: { $t: 'colors.ink' }, opacity: 0.3, zIndex: 5 },
      ...[['DAY 01', '成都 → 康定', '2 350 m 折多山垭口'], ['DAY 04', '康定 → 理塘', '4 014 m 海子山'], ['DAY 07', '理塘 → 德钦', '1 800 m 怒江七十二拐'], ['DAY 10', '德钦 → 雨崩', '3 050 m 笑农大本营']].map((r, i) => ([
        { id: `tp-d-${i}`, type: 'text' as const, content: r[0], fontFamily: MONO as any, fontSize: 22, fontWeight: '700' as any, color: { $t: 'colors.stampA' } as any, opacity: 0.9, x: 96, y: 856 + i * 88, width: 130, height: 30, zIndex: 5 },
        { id: `tp-t-${i}`, type: 'text' as const, content: r[1], fontFamily: { $t: 'fonts.heading' } as any, fontSize: 34, fontWeight: '700' as any, color: { $t: 'colors.ink' } as any, x: 240, y: 848 + i * 88, width: 400, height: 44, zIndex: 5, animation: { name: 'fadeInUp' as const, duration: 600, delay: 200 + i * 110 } as any, editable: { content: true } as any },
        { id: `tp-m-${i}`, type: 'text' as const, content: r[2], fontFamily: MONO as any, fontSize: 22, color: { $t: 'colors.ink' } as any, opacity: 0.62, textAlign: 'right' as any, x: 620, y: 856 + i * 88, width: 366, height: 32, zIndex: 5, editable: { content: true } as any },
        { id: `tp-r-${i}`, type: 'shape' as const, shapeKind: 'line' as const, x: 96, y: 906 + i * 88, width: 890, height: 1, fill: { $t: 'colors.ink' } as any, opacity: 0.14, zIndex: 5 }
      ])).flat() as any,
      { id: 'tp-note', type: 'text', content: '徒步 68 km　·　累计爬升 4 120 m　·　最高宿营 3 800 m', fontFamily: { $t: 'fonts.heading' }, fontSize: 26, color: { $t: 'colors.stampB' }, letterSpacing: 1, x: 96, y: 1224, width: 740, height: 34, zIndex: 5, editable: { content: true } },
      { id: 'tp-sign', type: 'text', content: '— 阿 哲', fontFamily: KAI, fontSize: 40, color: { $t: 'colors.stampA' }, opacity: 0.85, textAlign: 'right', x: 780, y: 1200, width: 200, height: 52, zIndex: 5, animation: { name: 'fadeIn', duration: 800, delay: 900 } }
    ]
  },

  // 2. 山路行程路书（9:16）
  {
    id: 'nature-travel-itinerary', name: '山路行程路书', version: '1.0.0', category: 'travel',
    tags: ['nature', 'travel', 'roadtrip', 'itinerary', 'mountain', '9:16'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="142" viewBox="0 0 80 142"><rect width="80" height="142" fill="%231F2A24"/><polygon points="0,74 22,42 40,66 58,30 80,60 80,142 0,142" fill="%233E5C47"/><path d="M40 142 C 30 110 50 96 40 74" stroke="%23E8B04B" stroke-width="3" fill="none" stroke-dasharray="6 5"/><rect x="10" y="10" width="34" height="6" fill="%23F8FAFC" opacity="0.8"/></svg>',
    tokens: {
      colors: {
        bg: { label: '夜色山谷', default: '#1F2A24', options: ['#1F2A24', '#14231B', '#101820', '#2A1B16'] },
        ridge: { label: '山脊', default: '#3E5C47', options: ['#3E5C47', '#2F5D50', '#4B5563', '#5C4033'] },
        road: { label: '公路黄', default: '#E8B04B', options: ['#E8B04B', '#F59E0B', '#FACC15', '#7DD3A0'] },
        mist: { label: '云雾白', default: '#F8FAFC', options: ['#F8FAFC', '#EEF2E6', '#FDF6E3', '#E2E8F0'] }
      },
      fonts: { heading: { label: '标题字体', default: SONG, options: [SONG, YAHEI, SERIF, KAI] } }
    },
    presets: [
      { name: '夜山公路', colors: { bg: '#1F2A24', ridge: '#3E5C47', road: '#E8B04B', mist: '#F8FAFC' } },
      { name: '雪峰冷雾', colors: { bg: '#101820', ridge: '#4B5563', road: '#FACC15', mist: '#E2E8F0' } },
      { name: '秋林落叶', colors: { bg: '#2A1B16', ridge: '#5C4033', road: '#F59E0B', mist: '#FDF6E3' } },
      { name: '青稞田埂', colors: { bg: '#14231B', ridge: '#2F5D50', road: '#7DD3A0', mist: '#EEF2E6' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1920, defaultWidth: 1080, defaultHeight: 1920, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'ti-ridge-far', type: 'image', src: ridge(1080, 620, '%233E5C47', 9), x: 0, y: 0, width: 1080, height: 1920, objectFit: 'contain', objectPosition: 'center 53.85%', opacity: 0.55, zIndex: 1 },
      { id: 'ti-ridge-near', type: 'image', src: ridge(1080, 740, '%2314231B', 31), x: 0, y: 0, width: 1080, height: 1920, objectFit: 'contain', objectPosition: 'center 100%', opacity: 0.92, zIndex: 2 },
      { id: 'ti-moon', type: 'shape', shapeKind: 'circle', x: 812, y: 132, width: 128, height: 128, fill: { $t: 'colors.mist' }, opacity: 0.9, zIndex: 2, animation: { name: 'twinkle', duration: 5200, iterationCount: 'infinite' } },
      { id: 'ti-star1', type: 'shape', shapeKind: 'circle', x: 172, y: 214, width: 12, height: 12, fill: { $t: 'colors.mist' }, zIndex: 2, animation: { name: 'twinkle', duration: 2600, iterationCount: 'infinite' } },
      { id: 'ti-star2', type: 'shape', shapeKind: 'circle', x: 388, y: 128, width: 9, height: 9, fill: { $t: 'colors.mist' }, zIndex: 2, animation: { name: 'twinkle', duration: 3400, delay: 600, iterationCount: 'infinite' } },
      { id: 'ti-road', type: 'image', src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1920" viewBox="0 0 1080 1920" fill="none"><path d="M540 1920 C 470 1660 690 1500 520 1300 C 400 1160 610 1080 540 980" stroke="%23E8B04B" stroke-width="10" stroke-dasharray="30 26" stroke-linecap="round" opacity="0.9"/></svg>', x: 0, y: 0, width: 1080, height: 1920, objectFit: 'fill', zIndex: 3 },
      { id: 'ti-kicker', type: 'text', content: 'SELF-DRIVE ROADBOOK · 自 驾 路 书', fontFamily: MONO, fontSize: 24, color: { $t: 'colors.road' }, letterSpacing: 5, x: 90, y: 130, width: 700, height: 34, zIndex: 5, animation: { name: 'fadeIn', duration: 700 } },
      { id: 'ti-title', type: 'text', content: '怒江\n峡谷\n七日', fontFamily: { $t: 'fonts.heading' }, fontSize: 148, fontWeight: '800', color: { $t: 'colors.mist' }, lineHeight: 1.1, x: 90, y: 186, width: 640, height: 520, zIndex: 5, animation: { name: 'fadeInUp', duration: 900 }, editable: { content: true, fontSize: { type: 'range', min: 104, max: 190 }, position: true } },
      { id: 'ti-en', type: 'text', content: 'NU JANG GORGE · 09.14 — 09.20', fontFamily: MONO, fontSize: 24, color: { $t: 'colors.mist' }, opacity: 0.6, letterSpacing: 3, x: 90, y: 726, width: 640, height: 32, zIndex: 5 },
      { id: 'ti-card', type: 'shape', shapeKind: 'rect', x: 76, y: 812, width: 928, height: 856, fill: 'rgba(248,250,252,0.06)', borderRadius: 18, border: { color: { $t: 'colors.mist' } as any, width: 2, style: 'solid' as const }, opacity: 0.5, zIndex: 4 },
      ...[['D1', '六库 → 老姆登', '142 km · 4h', '住教堂民宿'], ['D2', '老姆登 → 福贡', '96 km · 3h', '石月亮观景台'], ['D3', '福贡 → 贡山', '130 km · 4h', '怒江第一湾'], ['D4', '贡山 → 丙中洛', '45 km · 1.5h', '桃花岛'], ['D5', '丙中洛环线', '68 km · 徒步', '重丁寺 → 秋那桶'], ['D6', '秋那桶 → 独龙江', '110 km · 5h', '隧道观景'], ['D7', '独龙江 → 六库', '236 km · 6h', '返程']].map((r, i) => ([
        { id: `ti-d-${i}`, type: 'text' as const, content: r[0], fontFamily: MONO as any, fontSize: 24, fontWeight: '700' as any, color: { $t: 'colors.road' } as any, x: 108, y: 850 + i * 112, width: 76, height: 34, zIndex: 5, animation: { name: 'slideInLeft' as const, duration: 600, delay: 200 + i * 90 } as any },
        { id: `ti-t-${i}`, type: 'text' as const, content: r[1], fontFamily: { $t: 'fonts.heading' } as any, fontSize: 34, fontWeight: '700' as any, color: { $t: 'colors.mist' } as any, x: 196, y: 842 + i * 112, width: 440, height: 44, zIndex: 5, editable: { content: true } as any },
        { id: `ti-m-${i}`, type: 'text' as const, content: r[2], fontFamily: MONO as any, fontSize: 21, color: { $t: 'colors.mist' } as any, opacity: 0.6, x: 198, y: 888 + i * 112, width: 400, height: 28, zIndex: 5, editable: { content: true } as any },
        { id: `ti-n-${i}`, type: 'text' as const, content: r[3], fontFamily: { $t: 'fonts.heading' } as any, fontSize: 22, color: { $t: 'colors.road' } as any, opacity: 0.85, textAlign: 'right' as any, x: 640, y: 862 + i * 112, width: 336, height: 32, zIndex: 5, editable: { content: true } as any },
        { id: `ti-r-${i}`, type: 'shape' as const, shapeKind: 'line' as const, x: 108, y: 934 + i * 112, width: 870, height: 1, fill: { $t: 'colors.mist' } as any, opacity: 0.18, zIndex: 5 }
      ])).flat() as any,
      { id: 'ti-foot', type: 'text', content: '加油站在福贡 · 全程无高速 · 落石段请鸣笛', fontFamily: { $t: 'fonts.heading' }, fontSize: 24, color: { $t: 'colors.road' }, opacity: 0.85, letterSpacing: 1, textAlign: 'center', x: 108, y: 1720, width: 880, height: 34, zIndex: 5, editable: { content: true } },
      { id: 'ti-compass', type: 'image', src: COMPASS, x: 856, y: 96, width: 148, height: 148, opacity: 0.85, zIndex: 5, animation: { name: 'spinSlow', duration: 16000, iterationCount: 'infinite' }, editable: { position: true, size: { type: 'scale' } } }
    ]
  },

  // 3. 风景明信片（1:1）
  {
    id: 'nature-travel-postcard', name: '风景明信片', version: '1.0.0', category: 'travel',
    tags: ['nature', 'travel', 'postcard', 'photo', 'lake', '1:1'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23F6F3EA"/><rect x="8" y="8" width="84" height="52" fill="%237DD3FC" opacity="0.6"/><polygon points="8,60 32,30 52,52 72,24 92,56 92,60" fill="%232F5D50"/><rect x="8" y="68" width="44" height="4" fill="%231F2A24" opacity="0.4"/><rect x="8" y="78" width="30" height="4" fill="%231F2A24" opacity="0.25"/><rect x="66" y="14" width="22" height="16" fill="none" stroke="%23B23A2E" stroke-dasharray="3 2"/></svg>',
    tokens: {
      colors: {
        paper: { label: '卡纸', default: '#F6F3EA', options: ['#F6F3EA', '#FFFFFF', '#FDF6E3', '#EEF2E6'] },
        ink: { label: '手写墨', default: '#1F2A24', options: ['#1F2A24', '#111827', '#3F2A1D', '#14231B'] },
        sky: { label: '湖天蓝', default: '#7DD3FC', options: ['#7DD3FC', '#A5F3FC', '#FBCFE8', '#D9F99D'] },
        stamp: { label: '邮戳红', default: '#B23A2E', options: ['#B23A2E', '#1E3A5F', '#166534', '#B45309'] }
      },
      fonts: { heading: { label: '手写体', default: KAI, options: [KAI, SONG, SERIF, SANS] } }
    },
    presets: [
      { name: '湖蓝夏日', colors: { paper: '#F6F3EA', ink: '#1F2A24', sky: '#7DD3FC', stamp: '#B23A2E' } },
      { name: '雪岭青白', colors: { paper: '#FFFFFF', ink: '#14231B', sky: '#A5F3FC', stamp: '#1E3A5F' } },
      { name: '晚霞粉调', colors: { paper: '#FDF6E3', ink: '#3F2A1D', sky: '#FBCFE8', stamp: '#B45309' } },
      { name: '草原新绿', colors: { paper: '#EEF2E6', ink: '#1F2A24', sky: '#D9F99D', stamp: '#166534' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1080, defaultWidth: 1080, defaultHeight: 1080, backgroundColor: { $t: 'colors.paper' } },
    elements: [
      { id: 'pc-card', type: 'shape', shapeKind: 'rect', x: 40, y: 40, width: 1000, height: 1000, fill: { $t: 'colors.paper' }, borderRadius: 6, border: { color: { $t: 'colors.ink' } as any, width: 2, style: 'solid' as const }, opacity: 0.96, zIndex: 2, shadow: { offsetX: 0, offsetY: 10, blur: 22, color: 'rgba(31,42,36,0.18)' } },
      { id: 'pc-photo', type: 'image', src: '/images/photo/lake-mountain-postcard-940x560.jpg', objectFit: 'cover', x: 74, y: 74, width: 932, height: 520, zIndex: 3, editable: { src: { type: 'upload' }, position: true } },
      { id: 'pc-photo-tape-l', type: 'shape', shapeKind: 'rect', x: 56, y: 56, width: 150, height: 40, fill: { $t: 'colors.sky' }, opacity: 0.65, rotation: -42, zIndex: 6 },
      { id: 'pc-photo-tape-r', type: 'shape', shapeKind: 'rect', x: 874, y: 56, width: 150, height: 40, fill: { $t: 'colors.sky' }, opacity: 0.65, rotation: 42, zIndex: 6 },
      { id: 'pc-divider', type: 'shape', shapeKind: 'rect', x: 560, y: 640, width: 2, height: 340, fill: { $t: 'colors.ink' }, opacity: 0.35, zIndex: 5 },
      { id: 'pc-greeting', type: 'text', content: '一切安好，风很大', fontFamily: { $t: 'fonts.heading' }, fontSize: 44, color: { $t: 'colors.ink' }, x: 86, y: 636, width: 460, height: 132, zIndex: 5, animation: { name: 'inkReveal', duration: 1100 }, editable: { content: true, fontSize: { type: 'range', min: 30, max: 62 } } },
      { id: 'pc-body', type: 'text', content: '湖面在六点开始起雾，\n船停在原地没有动。\n我把鞋脱在水里，\n想着回去要不要辞职。', fontFamily: { $t: 'fonts.heading' }, fontSize: 30, color: { $t: 'colors.ink' }, opacity: 0.78, lineHeight: 1.7, x: 88, y: 768, width: 440, height: 210, zIndex: 5, editable: { content: true, position: true } },
      { id: 'pc-sign', type: 'text', content: '—— 九月二十日 于 泸沽湖', fontFamily: { $t: 'fonts.heading' }, fontSize: 26, color: { $t: 'colors.stamp' }, opacity: 0.9, textAlign: 'right', x: 120, y: 986, width: 400, height: 36, zIndex: 5, editable: { content: true } },
      { id: 'pc-stamp-box', type: 'shape', shapeKind: 'rect', x: 800, y: 648, width: 190, height: 150, fill: 'rgba(0,0,0,0)', border: { color: { $t: 'colors.ink' } as any, width: 2, style: 'dashed' as const }, opacity: 0.55, zIndex: 5 },
      { id: 'pc-stamp-art', type: 'image', src: roundStamp(150, '%23B23A2E', 'POST', '%E6%B8%8A%E6%B9%96'), x: 818, y: 656, width: 154, height: 154, opacity: 0.9, rotation: -6, zIndex: 6, animation: { name: 'zoomIn', duration: 700, delay: 400 } },
      ...[0, 1, 2].map(i => (
        { id: `pc-line-${i}`, type: 'shape' as const, shapeKind: 'line' as const, x: 600, y: 856 + i * 52, width: 390, height: 2, fill: { $t: 'colors.ink' } as any, opacity: 0.22, zIndex: 5 }
      )),
      { id: 'pc-to', type: 'text', content: 'TO：给还没出发的人', fontFamily: { $t: 'fonts.heading' }, fontSize: 26, color: { $t: 'colors.ink' }, opacity: 0.7, x: 600, y: 800, width: 380, height: 36, zIndex: 5, editable: { content: true } },
      { id: 'pc-postmark', type: 'text', content: 'LUOUGU LAKE · YUNNAN · 674100', fontFamily: MONO, fontSize: 20, color: { $t: 'colors.ink' }, opacity: 0.55, letterSpacing: 2, textAlign: 'center', x: 596, y: 1000, width: 400, height: 28, zIndex: 5 }
    ]
  },

  // 4. 云端登机牌（16:9）
  {
    id: 'nature-travel-boarding-pass', name: '云端登机牌', version: '1.0.0', category: 'travel',
    tags: ['nature', 'travel', 'boarding', 'flight', 'ticket', '16:9'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="90" viewBox="0 0 160 90"><rect width="160" height="90" fill="%230B1B2B"/><rect x="12" y="16" width="136" height="58" fill="%23F7F4EA"/><rect x="12" y="16" width="136" height="5" fill="%231D6FA5"/><rect x="104" y="16" width="2" height="58" fill="%230B1B2B" opacity="0.35"/><rect x="22" y="30" width="46" height="7" fill="%2312212F"/><rect x="22" y="44" width="62" height="4" fill="%2312212F" opacity="0.4"/><rect x="112" y="60" width="28" height="8" fill="%2312212F"/></svg>',
    tokens: {
      colors: {
        bg: { label: '底色', default: '#0B1B2B', options: ['#0B1B2B', '#14231B', '#1F1209', '#18181B'] },
        card: { label: '票面', default: '#F7F4EA', options: ['#F7F4EA', '#FFFFFF', '#FDF6E3', '#EEF2E6'] },
        ink: { label: '印刷墨', default: '#12212F', options: ['#12212F', '#111827', '#3F2A1D', '#14231B'] },
        accent: { label: '航程色', default: '#1D6FA5', options: ['#1D6FA5', '#B08D3E', '#0F766E', '#B23A2E'] }
      },
      fonts: {
        heading: { label: '标题字体', default: SONG, options: [SONG, SANS, SERIF, YAHEI] },
        body: { label: '票面字体', default: MONO, options: [MONO, SANS, SERIF, YAHEI] }
      }
    },
    presets: [
      { name: '夜航藏蓝', colors: { bg: '#0B1B2B', card: '#F7F4EA', ink: '#12212F', accent: '#1D6FA5' } },
      { name: '高原赭金', colors: { bg: '#1F1209', card: '#FDF6E3', ink: '#3F2A1D', accent: '#B08D3E' } },
      { name: '松林墨绿', colors: { bg: '#14231B', card: '#EEF2E6', ink: '#14231B', accent: '#0F766E' } },
      { name: '极简石墨', colors: { bg: '#18181B', card: '#FFFFFF', ink: '#111827', accent: '#B23A2E' } }
    ],
    canvas: { virtualWidth: 1920, virtualHeight: 1080, defaultWidth: 1920, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'bp-clouds', type: 'overlay', background: 'radial-gradient(circle at 18% 12%, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 42%), radial-gradient(circle at 86% 88%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 38%)', x: 0, y: 0, width: 1920, height: 1080, zIndex: 1 },
      { id: 'bp-card', type: 'shape', shapeKind: 'rect', x: 100, y: 96, width: 1720, height: 888, fill: { $t: 'colors.card' }, borderRadius: 14, zIndex: 2, shadow: { offsetX: 0, offsetY: 16, blur: 34, color: 'rgba(0,0,0,0.35)' } },
      { id: 'bp-topband', type: 'shape', shapeKind: 'rect', x: 100, y: 96, width: 1720, height: 16, fill: { $t: 'colors.accent' }, borderRadius: 0, zIndex: 3 },
      ...Array.from({ length: 13 }, (_, i) => ({ id: `bp-perf-${i}`, type: 'shape' as const, shapeKind: 'circle' as const, x: 1330, y: 128 + i * 66, width: 16, height: 16, fill: { $t: 'colors.bg' } as any, opacity: 0.85, group: 'perf', zIndex: 4 })),
      { id: 'bp-kicker', type: 'text', content: 'BOARDING PASS · 登 机 牌', fontFamily: { $t: 'fonts.body' }, fontSize: 24, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 7, x: 160, y: 156, width: 700, height: 36, zIndex: 5, animation: { name: 'fadeIn', duration: 700 } },
      { id: 'bp-title', type: 'text', content: '天府 → 贡嘎', fontFamily: { $t: 'fonts.heading' }, fontSize: 76, fontWeight: '800', color: { $t: 'colors.ink' }, x: 156, y: 202, width: 900, height: 108, zIndex: 5, editable: { content: true, fontSize: { type: 'range', min: 54, max: 96 }, position: true } },
      { id: 'bp-code-from', type: 'text', content: 'CTU', fontFamily: { $t: 'fonts.heading' }, fontSize: 132, fontWeight: '800', color: { $t: 'colors.ink' }, letterSpacing: 2, x: 160, y: 352, width: 340, height: 150, zIndex: 5, animation: { name: 'slideInLeft', duration: 800 } },
      { id: 'bp-code-from-l', type: 'text', content: 'CHENGDU TIANFU · 成都天府', fontFamily: { $t: 'fonts.body' }, fontSize: 20, color: { $t: 'colors.ink' }, opacity: 0.55, letterSpacing: 2, x: 160, y: 506, width: 380, height: 28, zIndex: 5, editable: { content: true } },
      { id: 'bp-plane', type: 'image', src: PLANE, x: 596, y: 380, width: 232, height: 166, opacity: 0.92, zIndex: 5, animation: { name: 'drift', duration: 5600, iterationCount: 'infinite' }, editable: { position: true, size: { type: 'scale' } } },
      { id: 'bp-code-to', type: 'text', content: 'LXA', fontFamily: { $t: 'fonts.heading' }, fontSize: 132, fontWeight: '800', color: { $t: 'colors.accent' }, letterSpacing: 2, x: 872, y: 352, width: 340, height: 150, zIndex: 5, animation: { name: 'slideInRight', duration: 800, delay: 150 } },
      { id: 'bp-code-to-l', type: 'text', content: 'LHASA GONGGAR · 拉萨贡嘎', fontFamily: { $t: 'fonts.body' }, fontSize: 20, color: { $t: 'colors.ink' }, opacity: 0.55, letterSpacing: 2, x: 872, y: 506, width: 380, height: 28, zIndex: 5, editable: { content: true } },
      { id: 'bp-rule', type: 'shape', shapeKind: 'line', x: 160, y: 576, width: 1110, height: 3, fill: { $t: 'colors.ink' }, opacity: 0.75, zIndex: 5 },
      ...[['PASSENGER 旅客', '陈 嘉 树'], ['FLIGHT 航班', 'BP 317'], ['DATE 日期', '09.20'], ['GATE 登机口', 'C12'], ['SEAT 座位', '03A'], ['ZONE 区域', 'Z2']].map((f, i) => ([
        { id: `bp-f-l-${i}`, type: 'text' as const, content: f[0], fontFamily: { $t: 'fonts.body' } as any, fontSize: 20, color: { $t: 'colors.ink' } as any, opacity: 0.5, letterSpacing: 3, x: 160 + (i % 3) * 386, y: 610 + Math.floor(i / 3) * 148, width: 340, height: 28, zIndex: 5 },
        { id: `bp-f-v-${i}`, type: 'text' as const, content: f[1], fontFamily: { $t: 'fonts.heading' } as any, fontSize: 46, fontWeight: '700' as any, color: { $t: 'colors.ink' } as any, x: 158 + (i % 3) * 386, y: 644 + Math.floor(i / 3) * 148, width: 340, height: 60, zIndex: 5, animation: { name: 'fadeInUp' as const, duration: 600, delay: 260 + i * 80 } as any, editable: { content: true } as any }
      ])).flat() as any,
      { id: 'bp-note', type: 'text', content: '登机结束前 15 分钟截止 · 手提行李 ≤ 8 kg · 高原段请慢起身', fontFamily: { $t: 'fonts.body' }, fontSize: 24, color: { $t: 'colors.accent' }, letterSpacing: 1, x: 160, y: 912, width: 1100, height: 32, zIndex: 5, editable: { content: true } },
      { id: 'bp-stub-k', type: 'text', content: 'STUB / 存 根', fontFamily: { $t: 'fonts.body' }, fontSize: 24, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 5, x: 1386, y: 158, width: 400, height: 30, zIndex: 5 },
      { id: 'bp-seat-label', type: 'text', content: 'SEAT', fontFamily: { $t: 'fonts.body' }, fontSize: 20, color: { $t: 'colors.ink' }, opacity: 0.55, letterSpacing: 4, x: 1386, y: 226, width: 200, height: 28, zIndex: 5 },
      { id: 'bp-seat-value', type: 'text', content: '03A', fontFamily: { $t: 'fonts.heading' }, fontSize: 104, fontWeight: '800', color: { $t: 'colors.ink' }, x: 1386, y: 254, width: 400, height: 116, zIndex: 5, animation: { name: 'zoomIn', duration: 700, delay: 400 }, editable: { content: true, size: { type: 'scale' } } },
      { id: 'bp-stub-gate', type: 'text', content: 'GATE C12　·　07:45', fontFamily: { $t: 'fonts.body' }, fontSize: 30, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 2, x: 1386, y: 396, width: 400, height: 36, zIndex: 5, editable: { content: true } },
      { id: 'bp-stub-seq', type: 'text', content: 'SEQ 0042　·　商务舱', fontFamily: { $t: 'fonts.body' }, fontSize: 24, color: { $t: 'colors.ink' }, opacity: 0.68, letterSpacing: 2, x: 1386, y: 446, width: 400, height: 32, zIndex: 5, editable: { content: true } },
      { id: 'bp-iris', type: 'shape', shapeKind: 'circle', x: 1386, y: 520, width: 380, height: 380, fill: 'rgba(0,0,0,0)', border: { color: { $t: 'colors.accent' } as any, width: 3, style: 'dashed' as const }, opacity: 0.55, zIndex: 5 },
      { id: 'bp-iris-t', type: 'text', content: 'WELCOME\nABOARD', fontFamily: { $t: 'fonts.body' }, fontSize: 30, fontWeight: '700', color: { $t: 'colors.accent' }, textAlign: 'center', lineHeight: 1.3, letterSpacing: 3, x: 1446, y: 654, width: 260, height: 90, zIndex: 6 },
      { id: 'bp-barcode', type: 'image', src: barcode(420, 108, '%2312212F', 23), x: 1386, y: 862, width: 420, height: 108, objectFit: 'fill', opacity: 0.9, zIndex: 5 },
      { id: 'bp-barcode-t', type: 'text', content: 'BP317 · 0920 · CTU-LXA · 0042', fontFamily: { $t: 'fonts.body' }, fontSize: 20, color: { $t: 'colors.ink' }, opacity: 0.6, letterSpacing: 2, textAlign: 'center', x: 1386, y: 926, width: 420, height: 26, zIndex: 5 }
    ]
  },

  // 5. 露营装备清单（4:5）
  {
    id: 'nature-travel-camp-checklist', name: '露营装备清单', version: '1.0.0', category: 'travel',
    tags: ['nature', 'travel', 'camping', 'checklist', 'gear', '4:5'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="125" viewBox="0 0 100 125"><rect width="100" height="125" fill="%23EEF2E6"/><rect x="10" y="12" width="80" height="101" fill="%23FBF9F0"/><polygon points="50,26 74,52 26,52" fill="%23D97706"/><rect x="20" y="62" width="42" height="4" fill="%231F2A24" opacity="0.5"/><rect x="20" y="74" width="34" height="4" fill="%231F2A24" opacity="0.35"/><rect x="20" y="86" width="46" height="4" fill="%231F2A24" opacity="0.25"/></svg>',
    tokens: {
      colors: {
        bg: { label: '草地底', default: '#EEF2E6', options: ['#EEF2E6', '#F3EEE3', '#E7EEF2', '#F2E9E6', '#14231B'] },
        paper: { label: '清单纸', default: '#FBF9F0', options: ['#FBF9F0', '#FFFFFF', '#FDF6E3', '#F1F5F0'] },
        ink: { label: '签字墨', default: '#1F2A24', options: ['#1F2A24', '#111827', '#3F2A1D', '#14231B'] },
        camp: { label: '营地橙', default: '#D97706', options: ['#D97706', '#166534', '#B23A2E', '#1D6FA5'] }
      },
      fonts: { heading: { label: '标题字体', default: YAHEI, options: [YAHEI, SONG, KAI, SANS] } }
    },
    presets: [
      { name: '秋日营地', colors: { bg: '#EEF2E6', paper: '#FBF9F0', ink: '#1F2A24', camp: '#D97706' } },
      { name: '松针墨绿', colors: { bg: '#14231B', paper: '#F1F5F0', ink: '#14231B', camp: '#166534' } },
      { name: '湖畔清晨', colors: { bg: '#E7EEF2', paper: '#FFFFFF', ink: '#111827', camp: '#1D6FA5' } },
      { name: '篝火赭红', colors: { bg: '#F2E9E6', paper: '#FDF6E3', ink: '#3F2A1D', camp: '#B23A2E' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'cg-paper', type: 'shape', shapeKind: 'rect', x: 62, y: 62, width: 956, height: 1226, fill: { $t: 'colors.paper' }, borderRadius: 4, zIndex: 2, shadow: { offsetX: 0, offsetY: 12, blur: 26, color: 'rgba(31,42,36,0.16)' } },
      { id: 'cg-edge', type: 'shape', shapeKind: 'rect', x: 62, y: 62, width: 956, height: 1226, fill: 'rgba(0,0,0,0)', border: { color: { $t: 'colors.ink' } as any, width: 2, style: 'solid' as const }, opacity: 0.22, zIndex: 3 },
      { id: 'cg-margin', type: 'shape', shapeKind: 'rect', x: 148, y: 62, width: 2, height: 1226, fill: { $t: 'colors.camp' }, opacity: 0.28, zIndex: 3 },
      { id: 'cg-kicker', type: 'text', content: 'CAMP GEAR LIST · 装 备 清 单', fontFamily: MONO, fontSize: 22, fontWeight: '700', color: { $t: 'colors.camp' }, letterSpacing: 5, x: 110, y: 116, width: 640, height: 32, zIndex: 5, animation: { name: 'fadeIn', duration: 700 } },
      { id: 'cg-title', type: 'text', content: '海拔 3 420 m\n两日营地', fontFamily: { $t: 'fonts.heading' }, fontSize: 78, fontWeight: '800', color: { $t: 'colors.ink' }, lineHeight: 1.2, x: 110, y: 158, width: 640, height: 216, zIndex: 5, animation: { name: 'fadeInUp', duration: 900 }, editable: { content: true, fontSize: { type: 'range', min: 56, max: 96 }, position: true } },
      { id: 'cg-tent', type: 'image', src: TENT, x: 744, y: 138, width: 244, height: 168, opacity: 0.95, zIndex: 5, animation: { name: 'float', duration: 5200, iterationCount: 'infinite' }, editable: { position: true, size: { type: 'scale' } } },
      { id: 'cg-meta', type: 'text', content: '2026.09.20 — 09.21　·　四人两晚　·　折多山后侧河谷', fontFamily: MONO, fontSize: 22, color: { $t: 'colors.ink' }, opacity: 0.6, letterSpacing: 1, x: 110, y: 392, width: 860, height: 30, zIndex: 5, editable: { content: true } },
      { id: 'cg-head-rule', type: 'shape', shapeKind: 'line', x: 110, y: 444, width: 860, height: 3, fill: { $t: 'colors.ink' }, opacity: 0.8, zIndex: 5 },
      { id: 'cg-head-l', type: 'text', content: 'ITEM / 品类', fontFamily: MONO, fontSize: 22, color: { $t: 'colors.ink' }, opacity: 0.45, letterSpacing: 3, x: 186, y: 458, width: 300, height: 26, zIndex: 5 },
      { id: 'cg-head-n', type: 'text', content: 'NOTE', fontFamily: MONO, fontSize: 22, color: { $t: 'colors.ink' }, opacity: 0.45, letterSpacing: 3, x: 596, y: 458, width: 240, height: 26, zIndex: 5 },
      { id: 'cg-head-q', type: 'text', content: 'QTY', fontFamily: MONO, fontSize: 22, color: { $t: 'colors.ink' }, opacity: 0.45, letterSpacing: 3, textAlign: 'right', x: 828, y: 458, width: 82, height: 26, zIndex: 5 },
      ...[['金字塔帐篷 + 地布', '抗风 8 级', '1', true], ['-10℃ 羽绒睡袋', '女款一件加长', '2', true], ['气炉 + 扁气罐', '余量 1 罐', '2', true], ['钛锅套装', '1.2 L + 折叠碗', '1', false], ['头灯 + 备用电池', '夜行用', '4', true], ['蛋槽防潮垫', 'R 值 3.4', '4', false], ['炉具挡风板', '河谷风大', '1', true], ['急救包 + 氧气罐', '高反备用', '1', true]].map((r, i) => ([
        { id: `cg-box-${i}`, type: 'shape' as const, shapeKind: 'rect' as const, x: 148, y: 506 + i * 92, width: 34, height: 34, fill: 'rgba(0,0,0,0)', border: { color: { $t: 'colors.ink' } as any, width: 3, style: 'solid' as const }, opacity: 0.75, zIndex: 5 },
        { id: `cg-tick-${i}`, type: 'text' as const, content: r[3] ? '✓' : '', fontFamily: SANS as any, fontSize: 40, fontWeight: '800' as any, color: { $t: 'colors.camp' } as any, textAlign: 'center' as any, x: 142, y: 496 + i * 92, width: 48, height: 48, zIndex: 6, animation: { name: 'zoomIn' as const, duration: 400, delay: 420 + i * 70 } as any },
        { id: `cg-item-${i}`, type: 'text' as const, content: r[0] as string, fontFamily: { $t: 'fonts.heading' } as any, fontSize: 33, fontWeight: '600' as any, color: { $t: 'colors.ink' } as any, opacity: r[3] ? 1 : 0.55, x: 200, y: 502 + i * 92, width: 380, height: 42, zIndex: 5, editable: { content: true } as any },
        { id: `cg-note-${i}`, type: 'text' as const, content: r[1] as string, fontFamily: MONO as any, fontSize: 22, color: { $t: 'colors.ink' } as any, opacity: 0.55, x: 596, y: 510 + i * 92, width: 236, height: 28, zIndex: 5, editable: { content: true } as any },
        { id: `cg-qty-${i}`, type: 'text' as const, content: '× ' + (r[2] as string), fontFamily: MONO as any, fontSize: 27, fontWeight: '700' as any, color: { $t: 'colors.camp' } as any, textAlign: 'right' as any, x: 826, y: 506 + i * 92, width: 84, height: 34, zIndex: 5, editable: { content: true } as any },
        { id: `cg-rule-${i}`, type: 'shape' as const, shapeKind: 'line' as const, x: 148, y: 560 + i * 92, width: 762, height: 1, fill: { $t: 'colors.ink' } as any, opacity: 0.14, zIndex: 5 }
      ])).flat() as any,
      { id: 'cg-progress-l', type: 'text', content: '已装包 7 / 8 件　·　总重 21.4 kg', fontFamily: { $t: 'fonts.heading' }, fontSize: 27, fontWeight: '700', color: { $t: 'colors.ink' }, x: 200, y: 1210, width: 520, height: 34, zIndex: 5, editable: { content: true } },
      { id: 'cg-bar-bg', type: 'shape', shapeKind: 'rect', x: 200, y: 1254, width: 560, height: 12, fill: { $t: 'colors.ink' }, opacity: 0.14, borderRadius: 6, zIndex: 5 },
      { id: 'cg-bar-fg', type: 'shape', shapeKind: 'rect', x: 200, y: 1254, width: 490, height: 12, fill: { $t: 'colors.camp' }, borderRadius: 6, zIndex: 6, animation: { name: 'slideInLeft', duration: 900, delay: 500 } },
      { id: 'cg-seal', type: 'shape', shapeKind: 'rect', x: 780, y: 1198, width: 190, height: 76, fill: { $t: 'colors.camp' }, opacity: 0.14, rotation: -8, zIndex: 5 },
      { id: 'cg-seal-t', type: 'text', content: '已 核 验', fontFamily: { $t: 'fonts.heading' }, fontSize: 40, fontWeight: '800', color: { $t: 'colors.camp' }, textAlign: 'center', letterSpacing: 6, x: 780, y: 1210, width: 190, height: 50, zIndex: 6, rotation: -8, animation: { name: 'zoomIn', duration: 600, delay: 900 }, editable: { content: true } },
      { id: 'cg-foot', type: 'text', content: '出发前再称一次：单人背包 ≤ 12 kg，垃圾全部带走', fontFamily: { $t: 'fonts.heading' }, fontSize: 22, color: { $t: 'colors.camp' }, letterSpacing: 1, x: 110, y: 1290, width: 860, height: 30, zIndex: 5, editable: { content: true } }
    ]
  },

  // 6. 海岛浮潜日志（1:1）
  {
    id: 'nature-travel-snorkel-log', name: '海岛浮潜日志', version: '1.0.0', category: 'travel',
    tags: ['nature', 'travel', 'island', 'snorkel', 'ocean', '1:1'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23F1F5F0"/><rect x="0" y="0" width="100" height="48" fill="%230E7490"/><path d="M0 30c14-8 22 8 36 0s22 8 36 0 20 6 28 2" fill="none" stroke="%23A5F3FC" stroke-width="3"/><rect x="12" y="58" width="44" height="6" fill="%231F2A24" opacity="0.6"/><rect x="12" y="70" width="30" height="4" fill="%231F2A24" opacity="0.35"/><circle cx="80" cy="66" r="10" fill="none" stroke="%23F97316" stroke-width="3"/></svg>',
    tokens: {
      colors: {
        foam: { label: '浪花白', default: '#F1F5F0', options: ['#F1F5F0', '#FFFFFF', '#EAF4F7', '#FBF7EC', '#F1F5F9', '#EEF5EE'] },
        ink: { label: '日志墨', default: '#123039', options: ['#123039', '#111827', '#0F172A', '#1F2A24'] },
        sea: { label: '海水蓝', default: '#0E7490', options: ['#0E7490', '#1D6FA5', '#166534', '#4C1D95'] },
        coral: { label: '珊瑚橙', default: '#F97316', options: ['#F97316', '#B23A2E', '#B08D3E', '#DB2777'] }
      },
      fonts: { heading: { label: '标题字体', default: SERIF, options: [SERIF, SONG, SANS, YAHEI] } }
    },
    presets: [
      { name: '热带潟湖', colors: { foam: '#EAF4F7', ink: '#123039', sea: '#0E7490', coral: '#F97316' } },
      { name: '深海靛蓝', colors: { foam: '#F1F5F9', ink: '#0F172A', sea: '#1D6FA5', coral: '#B08D3E' } },
      { name: '海草绿意', colors: { foam: '#EEF5EE', ink: '#1F2A24', sea: '#166534', coral: '#DB2777' } },
      { name: '白沙日落', colors: { foam: '#FBF7EC', ink: '#123039', sea: '#0E7490', coral: '#B23A2E' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1080, defaultWidth: 1080, defaultHeight: 1080, backgroundColor: { $t: 'colors.foam' } },
    elements: [
      { id: 'sl-photo', type: 'image', src: '/images/photo/coral-reef-snorkel-day-1080x470.jpg', objectFit: 'cover', x: 0, y: 0, width: 1080, height: 470, zIndex: 2, editable: { src: { type: 'upload' }, position: true } },
      { id: 'sl-scrim', type: 'overlay', background: 'linear-gradient(180deg, rgba(18,48,57,0.28) 0%, rgba(18,48,57,0.02) 42%, rgba(241,245,240,0.92) 100%)', x: 0, y: 0, width: 1080, height: 500, zIndex: 3 },
      { id: 'sl-waves', type: 'image', src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="120" viewBox="0 0 1080 120" fill="none"><path d="M0 72c60-26 108 26 172 0s110 26 174 0 110 26 174 0 110 26 174 0 112 26 172 4 104 14 104 14" stroke="%230E7490" stroke-opacity="0.45" stroke-width="6"/><path d="M0 100c60-26 108 26 172 0s110 26 174 0 110 26 174 0 110 26 174 0 112 26 172 4 104 14 104 14" stroke="%23F97316" stroke-opacity="0.3" stroke-width="5"/></svg>', x: 0, y: 430, width: 1080, height: 120, objectFit: 'fill', zIndex: 4, animation: { name: 'drift', duration: 9000, iterationCount: 'infinite' } },
      { id: 'sl-island', type: 'image', src: ISLAND, x: 764, y: 42, width: 250, height: 203, opacity: 0.96, zIndex: 5, animation: { name: 'float', duration: 6000, iterationCount: 'infinite' }, editable: { position: true, size: { type: 'scale' } } },
      { id: 'sl-kicker', type: 'text', content: 'SNORKEL LOG · 珊 瑚 礁 观 察', fontFamily: MONO, fontSize: 24, fontWeight: '700', color: { $t: 'colors.foam' }, letterSpacing: 6, x: 92, y: 62, width: 640, height: 32, zIndex: 5, animation: { name: 'fadeIn', duration: 700 } },
      { id: 'sl-title', type: 'text', content: '离岛七日\n浮潜日志', fontFamily: { $t: 'fonts.heading' }, fontSize: 82, fontWeight: '700', color: { $t: 'colors.foam' }, lineHeight: 1.22, x: 92, y: 108, width: 660, height: 232, zIndex: 5, animation: { name: 'rise', duration: 950 }, editable: { content: true, fontSize: { type: 'range', min: 58, max: 104 }, position: true } },
      { id: 'sl-place', type: 'text', content: '船潜 12 分钟 · 北纬 16° 外礁 · 水温 27℃', fontFamily: SANS, fontSize: 24, color: { $t: 'colors.foam' }, opacity: 0.85, letterSpacing: 2, x: 92, y: 356, width: 660, height: 32, zIndex: 5, editable: { content: true } },
      { id: 'sl-head', type: 'text', content: 'DIVE LOG · 下 水 记 录', fontFamily: MONO, fontSize: 22, fontWeight: '700', color: { $t: 'colors.sea' }, letterSpacing: 5, x: 92, y: 552, width: 520, height: 30, zIndex: 5 },
      { id: 'sl-snorkel', type: 'image', src: SNORKEL, x: 812, y: 540, width: 196, height: 126, opacity: 0.95, rotation: -6, zIndex: 5, editable: { position: true, size: { type: 'scale' } } },
      { id: 'sl-rule-top', type: 'shape', shapeKind: 'line', x: 92, y: 596, width: 690, height: 3, fill: { $t: 'colors.sea' }, opacity: 0.85, zIndex: 5 },
      ...[['08:40', '5.2 m', '能见度 18 m', '海龟一对，缓慢下潜'], ['11:15', '3.6 m', '能见度 25 m', '鹿角珊瑚群，白化边'], ['15:30', '6.8 m', '能见度 12 m', '礁鲨幼体 ×2，退流'], ['18:05', '2.4 m', '能见度 20 m', '夜潜前标记浮标位']].map((r, i) => ([
        { id: `sl-t-${i}`, type: 'text' as const, content: r[0], fontFamily: MONO as any, fontSize: 28, fontWeight: '700' as any, color: { $t: 'colors.coral' } as any, x: 92, y: 622 + i * 96, width: 130, height: 36, zIndex: 5, animation: { name: 'slideInLeft' as const, duration: 600, delay: 200 + i * 110 } as any, editable: { content: true } as any },
        { id: `sl-d-${i}`, type: 'text' as const, content: r[1], fontFamily: { $t: 'fonts.heading' } as any, fontSize: 32, fontWeight: '700' as any, color: { $t: 'colors.ink' } as any, x: 236, y: 618 + i * 96, width: 150, height: 42, zIndex: 5, editable: { content: true } as any },
        { id: `sl-v-${i}`, type: 'text' as const, content: r[2], fontFamily: MONO as any, fontSize: 22, color: { $t: 'colors.ink' } as any, opacity: 0.6, x: 400, y: 626 + i * 96, width: 220, height: 30, zIndex: 5, editable: { content: true } as any },
        { id: `sl-n-${i}`, type: 'text' as const, content: r[3], fontFamily: SONG as any, fontSize: 27, color: { $t: 'colors.ink' } as any, x: 636, y: 620 + i * 96, width: 356, height: 38, zIndex: 5, editable: { content: true } as any },
        { id: `sl-r-${i}`, type: 'shape' as const, shapeKind: 'line' as const, x: 92, y: 692 + i * 96, width: 900, height: 1, fill: { $t: 'colors.ink' } as any, opacity: 0.16, zIndex: 5 }
      ])).flat() as any,
      { id: 'sl-note', type: 'text', content: '今日总结：西南侧流急，勿单独越过浮标；珊瑚触碰即拍照离开。', fontFamily: SONG, fontSize: 26, color: { $t: 'colors.sea' }, letterSpacing: 1, x: 92, y: 990, width: 900, height: 34, zIndex: 5, editable: { content: true } },
      { id: 'sl-page', type: 'text', content: 'LOG 03 / 07', fontFamily: MONO, fontSize: 22, color: { $t: 'colors.ink' }, opacity: 0.45, letterSpacing: 4, x: 772, y: 1030, width: 220, height: 28, zIndex: 5 }
    ]
  }
]

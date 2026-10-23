// src/core/templates/food/food.ts
// 美食·餐饮 6 个模板：黑板菜单 / 深夜食堂 / 手冲小票 / 外卖横幅 / 甜品马卡龙 / 茶饮点单
// 装饰全部为原创内联 SVG；实拍占位图用 Lorem Picsum（带 seed，可复现）
import type { Template } from '@/types/types'
import { seededInt } from '../_fx/common'

const seeded = seededInt

const SANS = 'Helvetica, Arial, sans-serif'
const SONG = 'Songti SC, SimSun, serif'
const SERIF = 'Didot, Bodoni MT, Georgia, serif'
const KAI = 'STKaiti, KaiTi, serif'
const MONO = 'Consolas, Menlo, "Courier New", monospace'
const IMPACT = 'Impact, "Arial Black", sans-serif'

/** 木纹（横向纤维），低对比，用于托底而不与换色预设冲突 */
function woodGrain(w: number, h: number, line = '%23000000', seed = 31) {
  const rnd = seeded(seed); let paths = ''
  for (let i = 0; i < 26; i++) {
    const y = Math.round(rnd() % h); const amp = 2 + rnd() % 6
    let d = `M0 ${y}`
    for (let x = 0; x <= w; x += 60) d += ` Q ${x + 30} ${y + (x % 120 === 0 ? amp : -amp)} ${x + 60} ${y}`
    paths += `<path d='${d}' fill='none' stroke='${line}' stroke-width='${1 + rnd() % 2}' stroke-opacity='0.14'/>`
  }
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${paths}</svg>`
}

/** 粉笔灰散点，用于黑板类模板的质感 */
function chalkDust(w: number, h: number, n = 52, seed = 77, fill = 'rgba(243,238,227,0.16)') {
  const rnd = seeded(seed); let c = ''
  for (let i = 0; i < n; i++) c += `<circle cx='${rnd() % w}' cy='${rnd() % h}' r='${1 + rnd() % 4}' fill='${fill}'/>`
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${c}</svg>`
}

/** 半调网点（外卖横幅用），纯色参数化以便跟随 token */
function halftone(w: number, h: number, step: number, r: number, fill: string) {
  let dots = ''
  for (let y = step / 2; y < h; y += step) for (let x = step / 2; x < w; x += step) dots += `<circle cx='${x}' cy='${y}' r='${r}' fill='${fill}'/>`
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${dots}</svg>`
}

// ===== 原创贴图 =====
// 俯拍餐盘 + 刀叉
const PLATE = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><circle cx="150" cy="150" r="120" fill="none" stroke="%23F3EEE3" stroke-width="5" opacity="0.9"/><circle cx="150" cy="150" r="92" fill="none" stroke="%23F3EEE3" stroke-width="2" opacity="0.55"/><g stroke="%23F3EEE3" stroke-width="5" stroke-linecap="round" fill="none" opacity="0.9"><path d="M22 96v34M32 96v34M42 96v34M32 130v74"/><path d="M268 96c-12 0-18 12-18 26s6 20 18 20v62"/></g></svg>'
// 拉面碗 + 热气
const RAMEN = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="320" height="260" viewBox="0 0 320 260"><path d="M28 118h264c0 66-52 116-132 116S28 184 28 118Z" fill="%23B23A2E"/><path d="M28 118h264v16H28z" fill="%23F3EEE3" opacity="0.85"/><path d="M46 150h228" stroke="%23F3EEE3" stroke-width="4" opacity="0.35"/><ellipse cx="160" cy="112" rx="126" ry="20" fill="%23F5D7A1"/><g stroke="%23F3EEE3" stroke-width="6" stroke-linecap="round" fill="none" opacity="0.9"><path d="M116 92c8-16 20-16 28 0M170 88c8-16 20-16 28 0"/><path d="M104 74c10-22 26-22 36 0M180 70c10-22 26-22 36 0"/></g></svg>'
// 手冲壶 + 滤杯
const POUR = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="240" viewBox="0 0 300 240"><path d="M40 150h96v34a48 48 0 0 1-96 0z" fill="%23111827"/><path d="M56 86l104-4-16 60H72z" fill="%23E7E5E4"/><g stroke="%23111827" stroke-width="7" fill="none" stroke-linecap="round"><path d="M120 196v22M88 218h64"/><path d="M146 168c40-8 58 14 58 40"/></g><path d="M96 116h44" stroke="%23B45309" stroke-width="6"/><g stroke="%2394A3B8" stroke-width="3" opacity="0.7"><path d="M170 44c10-14 22-14 32 0M186 26c10-14 22-14 32 0"/></g></svg>'
// 马卡龙叠放
const MACARON = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="280" height="200" viewBox="0 0 280 200"><g><ellipse cx="80" cy="150" rx="62" ry="30" fill="%23FBCFE8"/><rect x="18" y="140" width="124" height="16" fill="%23F9A8D4"/><ellipse cx="80" cy="134" rx="62" ry="28" fill="%23FDF2F8"/><ellipse cx="196" cy="96" rx="58" ry="28" fill="%23BBF7D0"/><rect x="138" y="86" width="116" height="15" fill="%2386EFAC"/><ellipse cx="196" cy="72" rx="58" ry="26" fill="%23ECFCCB"/><ellipse cx="196" cy="72" rx="26" ry="9" fill="%23FEF9C3" opacity="0.8"/></g></svg>'
// 茶杯 + 茶叶
const TEACUP = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="260" height="240" viewBox="0 0 260 240"><path d="M34 92h150v44a75 75 0 0 1-150 0z" fill="%23F7F3E8"/><path d="M34 92h150v12H34z" fill="%23D6C7A1"/><ellipse cx="109" cy="98" rx="75" ry="14" fill="%23C9A227" opacity="0.55"/><path d="M186 106c34 0 34 46 0 46" fill="none" stroke="%23F7F3E8" stroke-width="10"/><path d="M30 196h160c0 14-36 22-80 22s-80-8-80-22z" fill="%23E7E5E4"/><g fill="%233F6212"><path d="M214 40c-18 6-22 26-6 38 14-8 18-26 6-38z"/><path d="M232 62c-14 4-16 20-4 28 10-6 12-20 4-28z"/></g></svg>'
// 暖帘（竖条布帘）
const NOREN = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200"><rect x="0" y="0" width="400" height="14" rx="7" fill="%236B3F22"/><g fill="%23B23A2E"><rect x="18" y="14" width="84" height="176"/><rect x="118" y="14" width="84" height="176"/><rect x="218" y="14" width="84" height="176"/><rect x="318" y="14" width="66" height="176"/></g><g fill="%23F3EEE3" opacity="0.9"><rect x="18" y="14" width="84" height="6"/><rect x="118" y="14" width="84" height="6"/><rect x="218" y="14" width="84" height="6"/></g></svg>'
// 圆形印章（招牌）
const SEAL = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><circle cx="100" cy="100" r="88" fill="none" stroke="%23B23A2E" stroke-width="7"/><circle cx="100" cy="100" r="70" fill="none" stroke="%23B23A2E" stroke-width="2"/><text x="100" y="118" font-family="Songti SC, serif" font-size="58" font-weight="700" fill="%23B23A2E" text-anchor="middle">%E6%8B%9B%E7%89%8C</text></svg>'
// 撕裂票根齿孔（只画缺口，不铺底色，避免盖住下层小票纸）
function receiptEdge(w: number, h: number, notch = '%23111827') {
  let n = ''
  for (let y = 24; y < h - 12; y += 22) n += `<rect x='${w - 10}' y='${y}' width='10' height='11' fill='${notch}' fill-opacity='0.18'/>`
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${n}</svg>`
}

export const foodTemplates: Template[] = [
  // 1. 黑板粉笔菜单（4:5）
  {
    id: 'food-blackboard-menu', name: '黑板粉笔菜单', version: '1.0.0', category: 'food',
    tags: ['food', 'menu', 'blackboard', 'chalk', 'cafe', '4:5'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="125" viewBox="0 0 100 125"><rect width="100" height="125" fill="%231F2A24"/><rect x="6" y="6" width="88" height="113" fill="none" stroke="%238A5A2B" stroke-width="8"/><text x="50" y="34" font-family="serif" font-size="15" fill="%23F3EEE3" text-anchor="middle">MENU</text><rect x="18" y="48" width="40" height="4" fill="%23F3EEE3" opacity="0.7"/><rect x="66" y="48" width="16" height="4" fill="%23E8B04B"/><rect x="18" y="62" width="34" height="4" fill="%23F3EEE3" opacity="0.5"/><rect x="66" y="62" width="16" height="4" fill="%23E8B04B"/><rect x="18" y="76" width="44" height="4" fill="%23F3EEE3" opacity="0.4"/></svg>',
    tokens: {
      colors: {
        board: { label: '板面', default: '#1F2A24', options: ['#1F2A24', '#182230', '#2A1B16', '#111827'] },
        chalk: { label: '粉笔字', default: '#F3EEE3', options: ['#F3EEE3', '#FFFFFF', '#E7F0E8', '#FDE9C8', '#EAF2FF'] },
        accent: { label: '高亮黄', default: '#E8B04B', options: ['#E8B04B', '#F472B6', '#7DD3A0', '#60A5FA'] },
        frame: { label: '木框', default: '#8A5A2B', options: ['#8A5A2B', '#5C3A1E', '#B08D3E', '#3F3F46'] }
      },
      fonts: {
        heading: { label: '标题字体', default: KAI, options: [KAI, SONG, 'Comic Sans MS, cursive', SERIF] },
        body: { label: '正文字体', default: SANS, options: [SANS, MONO, SONG] }
      }
    },
    presets: [
      { name: '墨绿黑板', colors: { board: '#1F2A24', chalk: '#F3EEE3', accent: '#E8B04B', frame: '#8A5A2B' } },
      { name: '午夜靛蓝', colors: { board: '#182230', chalk: '#EAF2FF', accent: '#7DD3A0', frame: '#3F3F46' } },
      { name: '焦糖深棕', colors: { board: '#2A1B16', chalk: '#FDE9C8', accent: '#F472B6', frame: '#B08D3E' } },
      { name: '纯黑橱窗', colors: { board: '#111827', chalk: '#FFFFFF', accent: '#60A5FA', frame: '#5C3A1E' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.board' } },
    elements: [
      { id: 'bm-frame-o', type: 'shape', shapeKind: 'rect', x: 0, y: 0, width: 1080, height: 1350, fill: 'rgba(0,0,0,0)', border: { color: { $t: 'colors.frame' } as any, width: 34, style: 'solid' as const }, zIndex: 5 },
      { id: 'bm-frame-i', type: 'shape', shapeKind: 'rect', x: 30, y: 30, width: 1020, height: 1290, fill: 'rgba(0,0,0,0)', border: { color: { $t: 'colors.chalk' } as any, width: 2, style: 'solid' as const }, opacity: 0.35, zIndex: 5 },
      { id: 'bm-grain', type: 'image', src: woodGrain(1012, 1282), x: 34, y: 34, width: 1012, height: 1282, objectFit: 'fill', opacity: 0.6, zIndex: 1 },
      { id: 'bm-dust', type: 'image', src: chalkDust(1012, 496), x: 34, y: 820, width: 1012, height: 496, objectFit: 'fill', zIndex: 1 },
      { id: 'bm-eyebrow', type: 'text', content: 'TODAY · 今 日 供 餐', fontFamily: { $t: 'fonts.body' }, fontSize: 26, fontWeight: '600', color: { $t: 'colors.accent' }, letterSpacing: 8, textAlign: 'center', x: 240, y: 92, width: 600, height: 34, zIndex: 6, animation: { name: 'fadeIn', duration: 700 } },
      { id: 'bm-title', type: 'text', content: '手 写 菜 单', fontFamily: { $t: 'fonts.heading' }, fontSize: 104, fontWeight: '700', color: { $t: 'colors.chalk' }, letterSpacing: 10, textAlign: 'center', x: 140, y: 138, width: 800, height: 128, zIndex: 6, animation: { name: 'inkReveal', duration: 1100 }, editable: { content: true, fontSize: { type: 'range', min: 72, max: 132 }, position: true } },
      { id: 'bm-rule-l', type: 'shape', shapeKind: 'line', x: 180, y: 292, width: 250, height: 3, fill: { $t: 'colors.chalk' }, opacity: 0.5, zIndex: 6 },
      { id: 'bm-rule-r', type: 'shape', shapeKind: 'line', x: 650, y: 292, width: 250, height: 3, fill: { $t: 'colors.chalk' }, opacity: 0.5, zIndex: 6 },
      { id: 'bm-diamond', type: 'shape', shapeKind: 'rect', x: 522, y: 278, width: 26, height: 26, fill: 'rgba(0,0,0,0)', border: { color: { $t: 'colors.accent' } as any, width: 3, style: 'solid' as const }, rotation: 45, zIndex: 6 },
      { id: 'bm-seal', type: 'image', src: SEAL, x: 838, y: 128, width: 150, height: 150, opacity: 0.92, rotation: 12, zIndex: 6, editable: { position: true, size: { type: 'scale' } } },
      ...[['松露蘑菇意面', 'Tagliatelle', '88'], ['慢炖牛颊', 'Braised Beef Cheek', '128'], ['海盐焦糖布丁', 'Crème Caramel', '38'], ['烟熏鸭胸沙拉', 'Smoked Duck', '62'], ['手冲单品咖啡', 'Pour Over', '42']].map((r, i) => ([
        { id: `bm-n-${i}`, type: 'text' as const, content: r[0], fontFamily: { $t: 'fonts.heading' } as any, fontSize: 42, fontWeight: '600' as any, color: { $t: 'colors.chalk' } as any, x: 150, y: 356 + i * 116, width: 470, height: 52, zIndex: 6, animation: { name: 'fadeInUp' as const, duration: 600, delay: 200 + i * 90 }, editable: { content: true } as any },
        { id: `bm-e-${i}`, type: 'text' as const, content: r[1], fontFamily: { $t: 'fonts.body' } as any, fontSize: 22, color: { $t: 'colors.chalk' } as any, opacity: 0.55, letterSpacing: 1.5, x: 152, y: 410 + i * 116, width: 470, height: 28, zIndex: 6, editable: { content: true } as any },
        { id: `bm-d-${i}`, type: 'text' as const, content: '· · · · · · · · · · · ·', fontFamily: SANS, fontSize: 26, color: { $t: 'colors.chalk' } as any, opacity: 0.3, x: 560, y: 366 + i * 116, width: 300, height: 40, zIndex: 6 },
        { id: `bm-p-${i}`, type: 'text' as const, content: '¥ ' + r[2], fontFamily: { $t: 'fonts.body' } as any, fontSize: 44, fontWeight: '700' as any, color: { $t: 'colors.accent' } as any, textAlign: 'right' as const, x: 830, y: 358 + i * 116, width: 120, height: 52, zIndex: 6, editable: { content: true } as any }
      ])).flat(),
      { id: 'bm-plate', type: 'image', src: PLATE, x: 828, y: 856, width: 190, height: 190, opacity: 0.22, zIndex: 2 },
      { id: 'bm-note', type: 'text', content: '* 每日 11:00 – 14:00 供应 · 佐餐面包免费续', fontFamily: { $t: 'fonts.heading' }, fontSize: 30, color: { $t: 'colors.chalk' }, opacity: 0.72, textAlign: 'center', x: 120, y: 992, width: 840, height: 44, zIndex: 6, editable: { content: true, position: true } },
      { id: 'bm-bottom-rule', type: 'shape', shapeKind: 'rect', x: 150, y: 1064, width: 780, height: 1, fill: { $t: 'colors.chalk' }, opacity: 0.3, zIndex: 6 },
      { id: 'bm-brand', type: 'text', content: 'TRATTORIA DEL MONDO · EST. 2014', fontFamily: MONO, fontSize: 22, color: { $t: 'colors.chalk' }, opacity: 0.45, letterSpacing: 4, textAlign: 'center', x: 160, y: 1096, width: 760, height: 30, zIndex: 6, editable: { content: true } },
      { id: 'bm-hours', type: 'text', content: 'WED – SUN　11:00 / 14:00　·　17:30 / 22:00', fontFamily: MONO, fontSize: 20, color: { $t: 'colors.accent' }, opacity: 0.75, letterSpacing: 3, textAlign: 'center', x: 160, y: 1150, width: 760, height: 28, zIndex: 6 }
    ]
  },

  // 2. 深夜食堂暖帘（9:16）
  {
    id: 'food-izakaya-night', name: '深夜食堂暖帘', version: '1.0.0', category: 'food',
    tags: ['food', 'izakaya', 'ramen', 'night', 'japan', '9:16'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="142" viewBox="0 0 80 142"><rect width="80" height="142" fill="%23141019"/><rect x="8" y="10" width="64" height="30" fill="%23B23A2E"/><rect x="14" y="16" width="8" height="18" fill="%23F3EEE3" opacity="0.85"/><rect x="30" y="16" width="8" height="18" fill="%23F3EEE3" opacity="0.85"/><rect x="46" y="16" width="8" height="18" fill="%23F3EEE3" opacity="0.85"/><ellipse cx="40" cy="86" rx="24" ry="8" fill="%23E8B04B" opacity="0.8"/><rect x="20" y="108" width="40" height="4" fill="%23F3EEE3" opacity="0.6"/><rect x="26" y="118" width="28" height="3" fill="%23F3EEE3" opacity="0.35"/></svg>',
    tokens: {
      colors: {
        bg: { label: '夜色底', default: '#141019', options: ['#141019', '#0B1120', '#1A1208', '#200A0E'] },
        noren: { label: '暖帘红', default: '#B23A2E', options: ['#B23A2E', '#7C2D12', '#1E3A5F', '#3F6212', '#9F1239'] },
        lantern: { label: '灯笼橙', default: '#E8B04B', options: ['#E8B04B', '#F97316', '#EF4444', '#FDE68A', '#FBCFE8'] },
        paper: { label: '字色', default: '#F3EEE3', options: ['#F3EEE3', '#FFFFFF', '#FDE9C8', '#E2E8F0'] }
      },
      fonts: { heading: { label: '标题字体', default: SONG, options: [SONG, KAI, SERIF, IMPACT] } }
    },
    presets: [
      { name: '赤提灯', colors: { bg: '#141019', noren: '#B23A2E', lantern: '#E8B04B', paper: '#F3EEE3' } },
      { name: '藏蓝居酒屋', colors: { bg: '#0B1120', noren: '#1E3A5F', lantern: '#FDE68A', paper: '#FFFFFF' } },
      { name: '焦茶烧鸟', colors: { bg: '#1A1208', noren: '#7C2D12', lantern: '#F97316', paper: '#FDE9C8' } },
      { name: '梅酒夜', colors: { bg: '#200A0E', noren: '#9F1239', lantern: '#FBCFE8', paper: '#FFFFFF' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1920, defaultWidth: 1080, defaultHeight: 1920, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'iz-vignette', type: 'overlay', x: 0, y: 0, width: 1080, height: 1920, background: 'radial-gradient(120% 70% at 50% 26%, rgba(232,176,75,0.24) 0%, rgba(0,0,0,0) 60%)', zIndex: 1 },
      { id: 'iz-noren', type: 'image', src: NOREN, x: 190, y: 92, width: 700, height: 350, zIndex: 4, animation: { name: 'swing', duration: 2600, iterationCount: 'infinite' }, editable: { position: true, size: { type: 'scale' } } },
      { id: 'iz-lamp-l', type: 'shape', shapeKind: 'circle', x: 96, y: 150, width: 118, height: 152, fill: { $t: 'colors.lantern' }, opacity: 0.9, borderRadius: 999, zIndex: 3, animation: { name: 'glow', duration: 2800, iterationCount: 'infinite' } },
      { id: 'iz-lamp-r', type: 'shape', shapeKind: 'circle', x: 866, y: 150, width: 118, height: 152, fill: { $t: 'colors.lantern' }, opacity: 0.9, borderRadius: 999, zIndex: 3, animation: { name: 'glow', duration: 3200, delay: 400, iterationCount: 'infinite' } },
      { id: 'iz-lamp-txt-l', type: 'text', content: '酒', fontFamily: { $t: 'fonts.heading' }, fontSize: 76, fontWeight: '700', color: { $t: 'colors.bg' }, textAlign: 'center', x: 96, y: 186, width: 118, height: 88, zIndex: 5 },
      { id: 'iz-lamp-txt-r', type: 'text', content: '食', fontFamily: { $t: 'fonts.heading' }, fontSize: 76, fontWeight: '700', color: { $t: 'colors.bg' }, textAlign: 'center', x: 866, y: 186, width: 118, height: 88, zIndex: 5 },
      { id: 'iz-title', type: 'text', content: '深 夜 食 堂', fontFamily: { $t: 'fonts.heading' }, fontSize: 150, fontWeight: '800', color: { $t: 'colors.paper' }, letterSpacing: 16, textAlign: 'center', lineHeight: 1.2, x: 100, y: 520, width: 880, height: 320, zIndex: 4, animation: { name: 'inkReveal', duration: 1200 }, editable: { content: true, fontSize: { type: 'range', min: 104, max: 190 }, position: true } },
      { id: 'iz-sub', type: 'text', content: '—— 一 碗 熱 麪 ，治 癒 整 個 夜 晚 ——', fontFamily: { $t: 'fonts.heading' }, fontSize: 34, color: { $t: 'colors.lantern' }, letterSpacing: 3, textAlign: 'center', x: 120, y: 872, width: 840, height: 44, zIndex: 4, editable: { content: true } },
      { id: 'iz-bowl', type: 'image', src: RAMEN, x: 340, y: 940, width: 400, height: 325, zIndex: 4, animation: { name: 'float', duration: 4200, iterationCount: 'infinite' }, editable: { position: true, size: { type: 'scale' } } },
      { id: 'iz-menu-box', type: 'shape', shapeKind: 'rect', x: 150, y: 1300, width: 780, height: 372, fill: 'rgba(0,0,0,0)', border: { color: { $t: 'colors.paper' } as any, width: 2, style: 'dashed' as const }, opacity: 0.42, zIndex: 3 },
      { id: 'iz-menu-title', type: 'text', content: '本 夜 配 料', fontFamily: { $t: 'fonts.heading' }, fontSize: 40, fontWeight: '700', color: { $t: 'colors.lantern' }, letterSpacing: 6, x: 190, y: 1330, width: 700, height: 50, zIndex: 4 },
      ...['豚骨白汤 · 18 小时慢熬', '炙烤叉烧 · 厚切 6 片', '味玉 · 半熟溏心', '手打细面 · 可选硬度'].map((s, i) => (
        { id: `iz-li-${i}`, type: 'text' as const, content: '◦　' + s, fontFamily: { $t: 'fonts.heading' } as any, fontSize: 32, color: { $t: 'colors.paper' } as any, opacity: 0.88 - i * 0.06, x: 190, y: 1396 + i * 60, width: 700, height: 44, zIndex: 4, animation: { name: 'fadeInUp' as const, duration: 600, delay: 400 + i * 120 }, editable: { content: true } as any }
      )),
      { id: 'iz-foot', type: 'text', content: '营业至凌晨三点 · 欢迎空腹而来', fontFamily: { $t: 'fonts.heading' }, fontSize: 28, color: { $t: 'colors.paper' }, opacity: 0.6, letterSpacing: 2, textAlign: 'center', x: 140, y: 1720, width: 800, height: 38, zIndex: 4, editable: { content: true } },
      { id: 'iz-en', type: 'text', content: 'MIDNIGHT DINER · RAMEN & SAKE · SINCE 1987', fontFamily: MONO, fontSize: 20, color: { $t: 'colors.lantern' }, opacity: 0.7, letterSpacing: 4, textAlign: 'center', x: 140, y: 1790, width: 800, height: 28, zIndex: 4 }
    ]
  },

  // 3. 手冲咖啡小票（1:1）
  {
    id: 'food-brew-receipt', name: '手冲咖啡小票', version: '1.0.0', category: 'food',
    tags: ['food', 'coffee', 'receipt', 'pour-over', 'specialty', '1:1'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23F5F1E8"/><rect x="24" y="10" width="52" height="80" fill="%23FFFDF7" stroke="%23D6C7A1"/><rect x="32" y="20" width="36" height="4" fill="%23111827" opacity="0.7"/><rect x="32" y="30" width="24" height="3" fill="%23111827" opacity="0.35"/><rect x="32" y="38" width="30" height="3" fill="%23111827" opacity="0.35"/><rect x="32" y="60" width="36" height="3" fill="%23B45309" opacity="0.6"/><rect x="32" y="70" width="20" height="3" fill="%23111827" opacity="0.3"/></svg>',
    tokens: {
      colors: {
        bg: { label: '桌面', default: '#F5F1E8', options: ['#F5F1E8', '#E7E5E4', '#EDE3D5', '#1C1917'] },
        paper: { label: '纸色', default: '#FFFDF7', options: ['#FFFDF7', '#FFFFFF', '#FEF3C7', '#F1F5F9', '#FEFCE8', '#F5F1E8'] },
        ink: { label: '打印墨', default: '#1C1917', options: ['#1C1917', '#3F3F46', '#78350F', '#0F172A'] },
        accent: { label: '烘焙棕', default: '#B45309', options: ['#B45309', '#7C2D12', '#166534', '#0EA5E9'] }
      },
      fonts: { mono: { label: '小票字体', default: MONO, options: [MONO, SANS, '"Courier New", Georgia, monospace'] } }
    },
    presets: [
      { name: '奶油纸棕', colors: { bg: '#F5F1E8', paper: '#FFFDF7', ink: '#1C1917', accent: '#B45309' } },
      { name: '水泥灰台', colors: { bg: '#E7E5E4', paper: '#FFFFFF', ink: '#3F3F46', accent: '#7C2D12' } },
      { name: '抹茶拿铁', colors: { bg: '#EDE3D5', paper: '#FEFCE8', ink: '#1C1917', accent: '#166534' } },
      { name: '暗夜黑卡', colors: { bg: '#1C1917', paper: '#F5F1E8', ink: '#1C1917', accent: '#0EA5E9' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1080, defaultWidth: 1080, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'br-shadow', type: 'shape', shapeKind: 'rect', x: 226, y: 74, width: 628, height: 934, fill: 'rgba(0,0,0,0.16)', borderRadius: 6, rotation: 2.4, zIndex: 1, shadow: { offsetX: 0, offsetY: 14, blur: 26, color: 'rgba(0,0,0,0.22)' } },
      { id: 'br-paper', type: 'shape', shapeKind: 'rect', x: 222, y: 66, width: 628, height: 948, fill: { $t: 'colors.paper' }, borderRadius: 4, rotation: -1.2, zIndex: 2 },
      { id: 'br-edge', type: 'image', src: receiptEdge(628, 948, '%231C1917'), x: 222, y: 66, width: 628, height: 948, objectFit: 'fill', rotation: -1.2, zIndex: 3 },
      { id: 'br-shop', type: 'text', content: 'LIGHT YEARS COFFEE ROASTERS', fontFamily: { $t: 'fonts.mono' }, fontSize: 26, fontWeight: '700', color: { $t: 'colors.ink' }, letterSpacing: 2, textAlign: 'center', x: 260, y: 104, width: 552, height: 32, zIndex: 4, editable: { content: true } },
      { id: 'br-addr', type: 'text', content: '上海市徐汇区永嘉路 12 号　021-6400-0012', fontFamily: { $t: 'fonts.mono' }, fontSize: 19, color: { $t: 'colors.ink' }, opacity: 0.6, textAlign: 'center', x: 260, y: 140, width: 552, height: 26, zIndex: 4 },
      { id: 'br-rule1', type: 'shape', shapeKind: 'line', x: 262, y: 182, width: 548, height: 2, fill: { $t: 'colors.ink' }, opacity: 0.45, zIndex: 4 },
      { id: 'br-no', type: 'text', content: 'NO. 0 0 4 2 7　　2026-09-20　08:41', fontFamily: { $t: 'fonts.mono' }, fontSize: 19, color: { $t: 'colors.accent' }, letterSpacing: 1, textAlign: 'center', x: 260, y: 196, width: 552, height: 26, zIndex: 4, editable: { content: true } },
      { id: 'br-pour', type: 'image', src: POUR, x: 400, y: 232, width: 272, height: 218, opacity: 0.9, zIndex: 4 },
      { id: 'br-item-title', type: 'text', content: 'HAND DRIP / 手 冲', fontFamily: { $t: 'fonts.mono' }, fontSize: 22, fontWeight: '700', color: { $t: 'colors.ink' }, letterSpacing: 3, textAlign: 'center', x: 260, y: 466, width: 552, height: 30, zIndex: 4 },
      ...[['埃塞俄比亚 古吉 罕贝拉', 'HAMBELA · NAT', '45'], ['哥伦比亚 薇拉 粉波旁', 'PINK BOURBON · WS', '52'], ['巴拿马 翡翠 瑰夏', 'GEISHA · WASHED', '88']].map((r, i) => ([
        { id: `br-in-${i}`, type: 'text' as const, content: r[0], fontFamily: SONG as any, fontSize: 27, color: { $t: 'colors.ink' } as any, x: 268, y: 510 + i * 66, width: 380, height: 36, zIndex: 4, animation: { name: 'fadeIn' as const, duration: 500, delay: 200 + i * 120 }, editable: { content: true } as any },
        { id: `br-ie-${i}`, type: 'text' as const, content: r[1], fontFamily: { $t: 'fonts.mono' } as any, fontSize: 15, color: { $t: 'colors.ink' } as any, opacity: 0.5, x: 270, y: 542 + i * 66, width: 380, height: 22, zIndex: 4 },
        { id: `br-ip-${i}`, type: 'text' as const, content: r[2], fontFamily: { $t: 'fonts.mono' } as any, fontSize: 27, fontWeight: '700' as any, color: { $t: 'colors.accent' } as any, textAlign: 'right' as any, x: 660, y: 510 + i * 66, width: 150, height: 36, zIndex: 4, editable: { content: true } as any }
      ])).flat(),
      { id: 'br-rule2', type: 'shape', shapeKind: 'line', x: 262, y: 726, width: 548, height: 2, fill: { $t: 'colors.ink' }, opacity: 0.35, zIndex: 4 },
      { id: 'br-total-l', type: 'text', content: 'TOTAL 合计（含服务费）', fontFamily: { $t: 'fonts.mono' }, fontSize: 22, color: { $t: 'colors.ink' }, x: 268, y: 744, width: 360, height: 32, zIndex: 4 },
      { id: 'br-total-v', type: 'text', content: '¥ 185.00', fontFamily: { $t: 'fonts.mono' }, fontSize: 34, fontWeight: '700', color: { $t: 'colors.accent' }, textAlign: 'right', x: 620, y: 738, width: 190, height: 44, zIndex: 4, editable: { content: true, fontSize: { type: 'range', min: 26, max: 46 } } },
      { id: 'br-taste', type: 'text', content: '风味：茉莉 · 白桃 · 焦糖余韵', fontFamily: SONG, fontSize: 22, color: { $t: 'colors.ink' }, opacity: 0.72, textAlign: 'center', x: 260, y: 800, width: 552, height: 30, zIndex: 4, editable: { content: true } },
      { id: 'br-barcode', type: 'image', src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="420" height="80" viewBox="0 0 420 80">' + Array.from({ length: 60 }, (_, i) => `<rect x='${i * 7}' y='0' width='${1 + (i * 13) % 4}' height='80' fill='%231C1917'/>`).join('') + '</svg>', x: 330, y: 856, width: 420, height: 80, opacity: 0.85, zIndex: 4 },
      { id: 'br-thanks', type: 'text', content: 'THANK YOU · 请于一小时内饮用最佳', fontFamily: { $t: 'fonts.mono' }, fontSize: 17, color: { $t: 'colors.ink' }, opacity: 0.55, letterSpacing: 1, textAlign: 'center', x: 260, y: 952, width: 552, height: 24, zIndex: 4 }
    ]
  },

  // 4. 外卖满减横幅（16:9）
  {
    id: 'food-delivery-strip', name: '外卖满减横幅', version: '1.0.0', category: 'food',
    tags: ['food', 'delivery', 'promo', 'banner', '16:9'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="90" viewBox="0 0 160 90"><rect width="160" height="90" fill="%23DC2626"/><circle cx="126" cy="46" r="26" fill="%23FDE68A"/><rect x="14" y="20" width="66" height="9" fill="%23FFF7ED"/><rect x="14" y="36" width="44" height="16" fill="%23FDE68A"/><rect x="14" y="60" width="70" height="5" fill="%23FFF7ED" opacity="0.7"/></svg>',
    tokens: {
      colors: {
        bg: { label: '主底', default: '#DC2626', options: ['#DC2626', '#EA580C', '#B91C1C', '#166534', '#BE123C'] },
        paper: { label: '亮字', default: '#FFF7ED', options: ['#FFF7ED', '#FFFFFF', '#FEF9C3', '#F5F5F4', '#FFFBEB', '#F0FDF4', '#FFF1F2'] },
        hot: { label: '强调黄', default: '#FDE047', options: ['#FDE047', '#FB923C', '#FBCFE8', '#FFFFFF', '#BEF264'] },
        deep: { label: '压暗色', default: '#7F1D1D', options: ['#7F1D1D', '#9A3412', '#14532D', '#450A0A', '#4C0519'] }
      },
      fonts: { heading: { label: '标题字体', default: IMPACT, options: [IMPACT, '"Microsoft YaHei", sans-serif', SONG, SANS] } }
    },
    presets: [
      { name: '麻辣红金', colors: { bg: '#DC2626', paper: '#FFF7ED', hot: '#FDE047', deep: '#7F1D1D' } },
      { name: '橙意满满', colors: { bg: '#EA580C', paper: '#FFFBEB', hot: '#FFFFFF', deep: '#9A3412' } },
      { name: '轻食绿意', colors: { bg: '#166534', paper: '#F0FDF4', hot: '#BEF264', deep: '#14532D' } },
      { name: '莓果粉调', colors: { bg: '#BE123C', paper: '#FFF1F2', hot: '#FBCFE8', deep: '#4C0519' } }
    ],
    canvas: { virtualWidth: 1920, virtualHeight: 1080, defaultWidth: 1920, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'dv-halftone', type: 'image', src: halftone(740, 1080, 46, 7, '%23FFFFFF'), x: 1180, y: 0, width: 740, height: 1080, objectFit: 'fill', opacity: 0.18, zIndex: 1 },
      { id: 'dv-arc', type: 'shape', shapeKind: 'circle', x: 1240, y: 120, width: 840, height: 840, fill: { $t: 'colors.deep' }, opacity: 0.42, zIndex: 1 },
      { id: 'dv-arc-in', type: 'shape', shapeKind: 'circle', x: 1330, y: 210, width: 660, height: 660, fill: { $t: 'colors.hot' }, opacity: 0.95, zIndex: 2, animation: { name: 'pulse', duration: 2400, iterationCount: 'infinite' } },
      { id: 'dv-badge', type: 'text', content: '限时 3 天', fontFamily: { $t: 'fonts.heading' }, fontSize: 54, fontWeight: '800', color: { $t: 'colors.bg' }, letterSpacing: 2, textAlign: 'center', x: 1420, y: 430, width: 480, height: 70, zIndex: 4, editable: { content: true, position: true } },
      { id: 'dv-off', type: 'text', content: '满 30\n减 15', fontFamily: { $t: 'fonts.heading' }, fontSize: 116, fontWeight: '900', color: { $t: 'colors.bg' }, lineHeight: 1.06, textAlign: 'center', x: 1400, y: 496, width: 520, height: 260, zIndex: 4, animation: { name: 'zoomIn', duration: 800 }, editable: { content: true, fontSize: { type: 'range', min: 80, max: 150 }, position: true } },
      { id: 'dv-kicker', type: 'text', content: 'NEW ARRIVAL · 新店开业', fontFamily: SANS, fontSize: 30, fontWeight: '700', color: { $t: 'colors.hot' }, letterSpacing: 8, x: 120, y: 168, width: 700, height: 40, zIndex: 3, animation: { name: 'slideInLeft', duration: 700 } },
      { id: 'dv-title', type: 'text', content: '今夜吃点\n好的', fontFamily: { $t: 'fonts.heading' }, fontSize: 168, fontWeight: '900', color: { $t: 'colors.paper' }, lineHeight: 1.08, x: 110, y: 216, width: 900, height: 400, zIndex: 3, animation: { name: 'fadeInUp', duration: 800 }, editable: { content: true, fontSize: { type: 'range', min: 116, max: 210 }, position: true } },
      { id: 'dv-sub', type: 'text', content: '下单即送手作酸梅汤一份 · 全城 30 分钟送达', fontFamily: SANS, fontSize: 34, color: { $t: 'colors.paper' }, opacity: 0.9, x: 118, y: 640, width: 940, height: 46, zIndex: 3, editable: { content: true } },
      { id: 'dv-tiers', type: 'shape', shapeKind: 'rect', x: 118, y: 720, width: 880, height: 116, fill: 'rgba(0,0,0,0.22)', borderRadius: 14, zIndex: 3 },
      ...[['满20减6', '满45减14', '满88减30', '满158减66']].map(r => r.map((s, i) => (
        { id: `dv-t-${i}`, type: 'text' as const, content: s, fontFamily: SANS as any, fontSize: 34, fontWeight: '700' as any, color: { $t: 'colors.hot' } as any, textAlign: 'center' as any, x: 128 + i * 218, y: 752, width: 206, height: 48, zIndex: 4, editable: { content: true } as any }
      ))).flat(),
      ...[1, 2, 3].map(i => (
        { id: `dv-sep-${i}`, type: 'shape' as const, shapeKind: 'rect' as const, x: 118 + i * 218, y: 742, width: 2, height: 72, fill: { $t: 'colors.paper' } as any, opacity: 0.28, zIndex: 4 }
      )),
      { id: 'dv-cta', type: 'shape', shapeKind: 'rect', x: 118, y: 872, width: 420, height: 92, fill: { $t: 'colors.paper' }, borderRadius: 46, zIndex: 3, animation: { name: 'rise', duration: 700, delay: 400 } },
      { id: 'dv-cta-t', type: 'text', content: '立即领取 →', fontFamily: SANS, fontSize: 38, fontWeight: '800', color: { $t: 'colors.bg' }, textAlign: 'center', x: 118, y: 894, width: 420, height: 50, zIndex: 5, editable: { content: true } },
      { id: 'dv-note', type: 'text', content: '活动最终解释权归本店所有 · 有效期至 2026.09.30', fontFamily: SANS, fontSize: 22, color: { $t: 'colors.paper' }, opacity: 0.62, x: 580, y: 908, width: 560, height: 30, zIndex: 5, editable: { content: true } }
    ]
  },

  // 5. 甜品马卡龙周卡（4:5）
  {
    id: 'food-dessert-week', name: '甜品马卡龙周卡', version: '1.0.0', category: 'food',
    tags: ['food', 'dessert', 'macaron', 'pastry', 'pastel', '4:5'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="125" viewBox="0 0 100 125"><rect width="100" height="125" fill="%23FDF2F8"/><rect x="10" y="12" width="80" height="46" rx="6" fill="%23FBCFE8" opacity="0.7"/><ellipse cx="42" cy="80" rx="22" ry="9" fill="%2386EFAC"/><rect x="20" y="72" width="44" height="7" fill="%23BBF7D0"/><ellipse cx="42" cy="68" rx="22" ry="9" fill="%23ECFCCB"/><rect x="62" y="98" width="28" height="4" fill="%239D174D" opacity="0.5"/></svg>',
    tokens: {
      colors: {
        bg: { label: '奶油底', default: '#FDF2F8', options: ['#FDF2F8', '#FEF9E7', '#EFF6FF', '#F5F3FF', '#F7FAF2'] },
        ink: { label: '字色', default: '#6B21A8', options: ['#6B21A8', '#9D174D', '#1E3A5F', '#3F2A1D', '#3F6212', '#7C2D12'] },
        pink: { label: '主粉', default: '#F9A8D4', options: ['#F9A8D4', '#FBCFE8', '#FDBA74', '#C4B5FD', '#D9F99D'] },
        mint: { label: '点缀绿', default: '#86EFAC', options: ['#86EFAC', '#BBF7D0', '#FDE68A', '#A5F3FC'] }
      },
      fonts: { heading: { label: '标题字体', default: SERIF, options: [SERIF, SONG, SANS, 'Comic Sans MS, cursive'] } }
    },
    presets: [
      { name: '莓果奶油', colors: { bg: '#FDF2F8', ink: '#9D174D', pink: '#F9A8D4', mint: '#BBF7D0' } },
      { name: '抹茶奶霜', colors: { bg: '#F7FAF2', ink: '#3F6212', pink: '#D9F99D', mint: '#86EFAC' } },
      { name: '海盐蓝莓', colors: { bg: '#EFF6FF', ink: '#1E3A5F', pink: '#C4B5FD', mint: '#A5F3FC' } },
      { name: '焦糖布丁', colors: { bg: '#FEF9E7', ink: '#7C2D12', pink: '#FDBA74', mint: '#FDE68A' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'ds-blob1', type: 'shape', shapeKind: 'circle', x: -120, y: -80, width: 460, height: 460, fill: { $t: 'colors.pink' }, opacity: 0.5, zIndex: 1 },
      { id: 'ds-blob2', type: 'shape', shapeKind: 'circle', x: 780, y: 980, width: 520, height: 520, fill: { $t: 'colors.mint' }, opacity: 0.42, zIndex: 1 },
      { id: 'ds-photo', type: 'image', src: '/images/photo/dessert-macaroon-900x620.jpg', objectFit: 'cover', x: 90, y: 90, width: 900, height: 560, borderRadius: 280, zIndex: 2, editable: { src: { type: 'upload' }, position: true } },
      { id: 'ds-photo-ring', type: 'shape', shapeKind: 'rect', x: 90, y: 90, width: 900, height: 560, fill: 'rgba(0,0,0,0)', border: { color: { $t: 'colors.pink' } as any, width: 8, style: 'solid' as const }, borderRadius: 280, zIndex: 3 },
      { id: 'ds-week', type: 'text', content: 'DESSERT OF THE WEEK', fontFamily: SANS, fontSize: 24, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.7, letterSpacing: 6, textAlign: 'center', x: 140, y: 682, width: 800, height: 32, zIndex: 4 },
      { id: 'ds-title', type: 'text', content: '樱花白桃\n马卡龙', fontFamily: { $t: 'fonts.heading' }, fontSize: 96, fontWeight: '700', color: { $t: 'colors.ink' }, lineHeight: 1.2, textAlign: 'center', x: 140, y: 722, width: 800, height: 240, zIndex: 4, animation: { name: 'fadeInUp', duration: 900 }, editable: { content: true, fontSize: { type: 'range', min: 68, max: 124 }, position: true } },
      { id: 'ds-macaron', type: 'image', src: MACARON, x: 810, y: 700, width: 230, height: 164, rotation: -10, zIndex: 5, animation: { name: 'float', duration: 4000, iterationCount: 'infinite' }, editable: { position: true, size: { type: 'scale' } } },
      { id: 'ds-desc', type: 'text', content: '杏仁蛋白霜饼身 · 白桃果酱夹心 · 盐渍樱花粉', fontFamily: SONG, fontSize: 27, color: { $t: 'colors.ink' }, opacity: 0.76, lineHeight: 1.6, textAlign: 'center', x: 130, y: 984, width: 820, height: 62, zIndex: 4, editable: { content: true } },
      { id: 'ds-price-pill', type: 'shape', shapeKind: 'rect', x: 370, y: 1074, width: 340, height: 90, fill: { $t: 'colors.ink' }, borderRadius: 45, zIndex: 4 },
      { id: 'ds-price', type: 'text', content: '¥ 28 / 颗', fontFamily: { $t: 'fonts.heading' }, fontSize: 42, fontWeight: '700', color: { $t: 'colors.bg' }, textAlign: 'center', x: 370, y: 1096, width: 340, height: 50, zIndex: 5, editable: { content: true } },
      { id: 'ds-rule-l', type: 'shape', shapeKind: 'line', x: 120, y: 1214, width: 220, height: 2, fill: { $t: 'colors.ink' }, opacity: 0.35, zIndex: 4 },
      { id: 'ds-rule-r', type: 'shape', shapeKind: 'line', x: 740, y: 1214, width: 220, height: 2, fill: { $t: 'colors.ink' }, opacity: 0.35, zIndex: 4 },
      { id: 'ds-shop', type: 'text', content: 'MAISON SUCRÉE · 每日 10:00 限量 60 颗', fontFamily: SANS, fontSize: 22, color: { $t: 'colors.ink' }, opacity: 0.66, letterSpacing: 2, textAlign: 'center', x: 200, y: 1194, width: 680, height: 32, zIndex: 4, editable: { content: true } },
      { id: 'ds-dot1', type: 'shape', shapeKind: 'circle', x: 150, y: 760, width: 22, height: 22, fill: { $t: 'colors.mint' }, zIndex: 3, animation: { name: 'twinkle', duration: 2600, iterationCount: 'infinite' } },
      { id: 'ds-dot2', type: 'shape', shapeKind: 'circle', x: 916, y: 928, width: 16, height: 16, fill: { $t: 'colors.pink' }, zIndex: 3, animation: { name: 'twinkle', duration: 3200, delay: 500, iterationCount: 'infinite' } }
    ]
  },

  // 6. 茶饮点单卡（1:1）
  {
    id: 'food-tea-order', name: '茶饮点单卡', version: '1.0.0', category: 'food',
    tags: ['food', 'tea', 'drink', 'order', 'menu', '1:1'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23F7F3E8"/><path d="M22 34h40v14a20 20 0 0 1-40 0z" fill="%233F6212" opacity="0.8"/><rect x="22" y="32" width="40" height="5" fill="%23C9A227"/><rect x="18" y="66" width="48" height="4" rx="2" fill="%233F6212" opacity="0.4"/><rect x="66" y="20" width="20" height="4" fill="%233F6212" opacity="0.3"/><rect x="66" y="28" width="14" height="4" fill="%233F6212" opacity="0.2"/></svg>',
    tokens: {
      colors: {
        bg: { label: '米纸', default: '#F7F3E8', options: ['#F7F3E8', '#F0F5EC', '#FBF6EE', '#EAF3F5', '#14231B'] },
        ink: { label: '茶墨', default: '#2F3A22', options: ['#2F3A22', '#1C1917', '#14231B', '#3F2A1D', '#14343B', '#F0F5EC'] },
        leaf: { label: '茶叶绿', default: '#3F6212', options: ['#3F6212', '#166534', '#0F766E', '#B45309', '#86EFAC'] },
        gold: { label: '汤色', default: '#C9A227', options: ['#C9A227', '#D97706', '#B23A2E', '#65A30D', '#B45309', '#E8B04B'] }
      },
      fonts: { heading: { label: '标题字体', default: SONG, options: [SONG, KAI, SERIF, SANS] } }
    },
    presets: [
      { name: '米纸茶绿', colors: { bg: '#F7F3E8', ink: '#2F3A22', leaf: '#3F6212', gold: '#C9A227' } },
      { name: '青瓷冷泡', colors: { bg: '#EAF3F5', ink: '#14343B', leaf: '#0F766E', gold: '#B45309' } },
      { name: '焙茶焦褐', colors: { bg: '#FBF6EE', ink: '#3F2A1D', leaf: '#B45309', gold: '#D97706' } },
      { name: '暗夜茶室', colors: { bg: '#14231B', ink: '#F0F5EC', leaf: '#86EFAC', gold: '#E8B04B' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1080, defaultWidth: 1080, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'to-frame', type: 'shape', shapeKind: 'rect', x: 40, y: 40, width: 1000, height: 1000, fill: 'rgba(0,0,0,0)', border: { color: { $t: 'colors.leaf' } as any, width: 2, style: 'solid' as const }, opacity: 0.5, zIndex: 4 },
      { id: 'to-frame2', type: 'shape', shapeKind: 'rect', x: 54, y: 54, width: 972, height: 972, fill: 'rgba(0,0,0,0)', border: { color: { $t: 'colors.gold' } as any, width: 1, style: 'solid' as const }, opacity: 0.45, zIndex: 4 },
      { id: 'to-title', type: 'text', content: '今日点单', fontFamily: { $t: 'fonts.heading' }, fontSize: 92, fontWeight: '800', color: { $t: 'colors.ink' }, letterSpacing: 12, x: 100, y: 92, width: 560, height: 118, zIndex: 5, animation: { name: 'inkReveal', duration: 1000 }, editable: { content: true, fontSize: { type: 'range', min: 64, max: 116 } } },
      { id: 'to-en', type: 'text', content: 'TEA\nLIST', fontFamily: SANS, fontSize: 30, fontWeight: '700', color: { $t: 'colors.leaf' }, opacity: 0.75, letterSpacing: 3, lineHeight: 1.15, x: 820, y: 100, width: 160, height: 92, zIndex: 5 },
      { id: 'to-cup', type: 'image', src: TEACUP, x: 780, y: 224, width: 230, height: 212, zIndex: 5, animation: { name: 'float', duration: 4600, iterationCount: 'infinite' }, editable: { position: true, size: { type: 'scale' } } },
      { id: 'to-rule', type: 'shape', shapeKind: 'line', x: 100, y: 232, width: 620, height: 3, fill: { $t: 'colors.ink' }, opacity: 0.75, zIndex: 5 },
      ...[['龙井春芽', '热 · 少糖', '26'], ['桂花乌龙', '冷 · 三分糖', '28'], ['陈皮普洱', '热 · 原味', '32'], ['茉莉奶白', '冷 · 去冰', '30'], ['陈年白茶', '热 · 壶泡', '68']].map((r, i) => ([
        { id: `to-box-${i}`, type: 'shape' as const, shapeKind: 'rect' as const, x: 104, y: 268 + i * 124, width: 34, height: 34, fill: 'rgba(0,0,0,0)' as any, border: { color: { $t: 'colors.ink' } as any, width: 2, style: 'solid' as any } as any, opacity: 0.7, zIndex: 5 },
        { id: `to-tick-${i}`, type: 'text' as const, content: i === 1 ? '✓' : '', fontFamily: SANS as any, fontSize: 34, fontWeight: '700' as any, color: { $t: 'colors.gold' } as any, x: 100, y: 260 + i * 124, width: 44, height: 44, zIndex: 6, animation: { name: 'zoomIn' as const, duration: 500, delay: 600 + i * 80 } as any, editable: { content: true } as any },
        { id: `to-n-${i}`, type: 'text' as const, content: r[0], fontFamily: { $t: 'fonts.heading' } as any, fontSize: 42, fontWeight: '700' as any, color: { $t: 'colors.ink' } as any, x: 164, y: 260 + i * 124, width: 320, height: 52, zIndex: 5, editable: { content: true } as any },
        { id: `to-o-${i}`, type: 'text' as const, content: r[1], fontFamily: SANS as any, fontSize: 22, color: { $t: 'colors.ink' } as any, opacity: 0.58, x: 166, y: 312 + i * 124, width: 320, height: 28, zIndex: 5, editable: { content: true } as any },
        { id: `to-p-${i}`, type: 'text' as const, content: '¥' + r[2], fontFamily: SONG as any, fontSize: 38, fontWeight: '700' as any, color: { $t: 'colors.leaf' } as any, textAlign: 'right' as any, x: 500, y: 262 + i * 124, width: 130, height: 48, zIndex: 5, editable: { content: true } as any },
        { id: `to-u-${i}`, type: 'shape' as const, shapeKind: 'line' as const, x: 104, y: 366 + i * 124, width: 530, height: 1, fill: { $t: 'colors.ink' } as any, opacity: 0.18, zIndex: 5 }
      ])).flat(),
      { id: 'to-total-box', type: 'shape', shapeKind: 'rect', x: 670, y: 470, width: 320, height: 420, fill: { $t: 'colors.leaf' }, opacity: 0.08, zIndex: 4 },
      { id: 'to-total-l', type: 'text', content: '合 计', fontFamily: { $t: 'fonts.heading' }, fontSize: 34, color: { $t: 'colors.ink' }, letterSpacing: 6, textAlign: 'center', x: 670, y: 500, width: 320, height: 44, zIndex: 5 },
      { id: 'to-total-v', type: 'text', content: '¥ 28', fontFamily: { $t: 'fonts.heading' }, fontSize: 78, fontWeight: '800', color: { $t: 'colors.gold' }, textAlign: 'center', x: 670, y: 556, width: 320, height: 100, zIndex: 5, animation: { name: 'pulse', duration: 2200, delay: 900, iterationCount: 'infinite' }, editable: { content: true, fontSize: { type: 'range', min: 52, max: 104 } } },
      { id: 'to-sugar', type: 'text', content: '糖度　无糖 / 三分 / 五分 / 全糖\n冰量　去冰 / 少冰 / 正常', fontFamily: SANS, fontSize: 22, color: { $t: 'colors.ink' }, opacity: 0.66, lineHeight: 1.75, textAlign: 'center', x: 670, y: 686, width: 320, height: 96, zIndex: 5, editable: { content: true } },
      { id: 'to-foot', type: 'text', content: '出示此卡至柜台 · 第二杯半价', fontFamily: { $t: 'fonts.heading' }, fontSize: 28, color: { $t: 'colors.ink' }, opacity: 0.8, letterSpacing: 2, textAlign: 'center', x: 600, y: 940, width: 420, height: 38, zIndex: 5, editable: { content: true, position: true } }
    ]
  }
]

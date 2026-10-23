// src/core/templates/festival/festival.ts
// 节日·节气 6 个模板：春节开门红 / 中秋月圆 / 二十四节气竖卡 / 圣诞市集横幅 / 生日蛋糕日签 / 跨年倒计时
// 覆盖比例：9:16、1:1、3:4、2.35:1（公众号头图）、4:5、2.35:1
// 装饰全部为原创内联 SVG（不含中文路径，中文一律走 text 元素以便换字换色）
import type { Template } from '@/types/types'
import { seededInt } from '../_fx/common'

const seeded = seededInt

const SANS = 'Helvetica, Arial, sans-serif'
const HEI = '"PingFang SC", "Microsoft YaHei", "Hiragino Sans GB", sans-serif'
const SONG = 'Songti SC, SimSun, serif'
const KAI = 'STKaiti, KaiTi, serif'
const SERIF = 'Didot, Bodoni MT, Georgia, serif'
const MONO = 'Consolas, Menlo, "Courier New", monospace'
const IMPACT = 'Impact, "Arial Black", sans-serif'

/** 散金点：低透明度碎点，给红底/夜底加质感，不铺底所以不抢换色 */
function confetti(w: number, h: number, n = 60, seed = 41, fill = 'rgba(247,208,116,0.5)') {
  const rnd = seeded(seed); let s = ''
  for (let i = 0; i < n; i++) {
    const x = rnd() % w; const y = rnd() % h; const sz = 3 + rnd() % 7; const rot = rnd() % 90
    s += rnd() % 3 === 0
      ? `<circle cx='${x}' cy='${y}' r='${2 + rnd() % 4}' fill='${fill}'/>`
      : `<rect x='${x}' y='${y}' width='${sz}' height='${Math.max(2, sz / 3)}' fill='${fill}' transform='rotate(${rot} ${x} ${y})'/>`
  }
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${s}</svg>`
}

/** 烟花放射线：只画线，颜色参数化以便跟随 token */
function burst(cx: number, cy: number, r: number, rays = 24, stroke = '%23F3C969', seed = 13) {
  const rnd = seeded(seed); let g = ''
  for (let i = 0; i < rays; i++) {
    const a = (Math.PI * 2 * i) / rays + (rnd() % 10) / 60
    const inner = r * (0.34 + (rnd() % 20) / 100); const outer = r * (0.72 + (rnd() % 26) / 100)
    g += `<line x1='${(cx + Math.cos(a) * inner).toFixed(1)}' y1='${(cy + Math.sin(a) * inner).toFixed(1)}' x2='${(cx + Math.cos(a) * outer).toFixed(1)}' y2='${(cy + Math.sin(a) * outer).toFixed(1)}' stroke='${stroke}' stroke-width='${1 + rnd() % 3}' stroke-linecap='round'/>`
    g += `<circle cx='${(cx + Math.cos(a) * outer * 1.06).toFixed(1)}' cy='${(cy + Math.sin(a) * outer * 1.06).toFixed(1)}' r='${1 + rnd() % 3}' fill='${stroke}'/>`
  }
  return g
}

// ===== 原创贴图 =====
// 宫灯：球身 + 上下盖 + 长穗
const LANTERN = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="300" viewBox="0 0 200 300"><rect x="86" y="4" width="28" height="12" rx="4" fill="%23E7B10A"/><ellipse cx="100" cy="96" rx="76" ry="62" fill="%23C2410C"/><g fill="none" stroke="%23F3C969" stroke-width="4" opacity="0.85"><ellipse cx="100" cy="96" rx="30" ry="62"/><ellipse cx="100" cy="96" rx="56" ry="62"/><path d="M24 96h152"/></g><rect x="74" y="152" width="52" height="14" rx="5" fill="%23E7B10A"/><g stroke="%23F3C969" stroke-width="4"><path d="M88 166v46M100 166v58M112 166v46"/></g><rect x="82" y="212" width="36" height="8" rx="4" fill="%23C2410C"/></svg>'
// 祥云：三组卷云勾线
const CLOUD = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="130" viewBox="0 0 300 130"><g fill="none" stroke="%23F3C969" stroke-width="5" stroke-linecap="round" opacity="0.9"><path d="M12 96c22-4 26-32 50-30 16 2 18 16 32 14 20-4 20-32 42-30 22 2 22 26 40 26 16 0 20-12 34-12 12 0 18 8 26 10"/><path d="M40 118c18-3 26-14 44-12 14 2 20 10 34 8"/><path d="M170 40c14-2 18-14 32-12 10 2 12 10 24 8"/></g></svg>'
// 中国结：菱形盘长结 + 双流苏
const KNOT = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="220" height="280" viewBox="0 0 220 280"><g fill="none" stroke="%23F3C969" stroke-width="7"><path d="M110 18l74 74-74 74-74-74z"/><path d="M110 48l44 44-44 44-44-44z"/><path d="M36 92h148M110 18v148"/></g><rect x="96" y="166" width="28" height="18" rx="6" fill="%23E7B10A"/><g stroke="%23C2410C" stroke-width="6" stroke-linecap="round"><path d="M92 190v62M110 190v78M128 190v62"/></g></svg>'
// 圆月：月盘 + 环形山 + 外圈月晕
const MOON = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><circle cx="200" cy="200" r="186" fill="none" stroke="%23FBF6E7" stroke-width="2" opacity="0.3"/><circle cx="200" cy="200" r="150" fill="%23FBF6E7"/><g fill="%23E3D6BA" opacity="0.75"><circle cx="152" cy="158" r="26"/><circle cx="242" cy="196" r="16"/><circle cx="176" cy="252" r="21"/><circle cx="248" cy="128" r="10"/></g></svg>'
// 玉兔剪影：立耳 + 团身 + 桂枝
const RABBIT = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="260" height="200" viewBox="0 0 260 200"><g fill="%23F3EEE3"><path d="M96 96c-6-30-4-58 6-74 12 16 16 46 14 70z"/><path d="M126 92c-2-32 6-56 22-68 2 22-6 50-14 68z"/><ellipse cx="140" cy="130" rx="78" ry="58"/><circle cx="196" cy="106" r="34"/><path d="M224 96c16-4 24 4 22 14-10 4-20 0-22-14z"/><circle cx="66" cy="150" r="18"/></g><g stroke="%23E7B10A" stroke-width="5" fill="none"><path d="M212 128c20 10 32 6 40-6"/><path d="M228 130c-6-10-4-18 4-24M240 134c-4-12 0-20 8-26"/></g></svg>'
// 桂枝：叶 + 四瓣小花
const OSMANTHUS = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="320" height="200" viewBox="0 0 320 200"><path d="M8 188C86 150 176 118 306 20" fill="none" stroke="%23C2410C" stroke-width="6" stroke-linecap="round"/><g fill="%234D7C0F" opacity="0.9"><path d="M74 150c-16-24-6-46 16-52 8 24 2 44-16 52z"/><path d="M150 116c-14-24-2-46 20-50 6 24-4 42-20 50z"/><path d="M222 74c-12-24 2-44 24-46 2 24-8 40-24 46z"/></g><g fill="%23E7B10A"><circle cx="108" cy="118" r="7"/><circle cx="122" cy="128" r="7"/><circle cx="112" cy="140" r="7"/><circle cx="98" cy="130" r="7"/><circle cx="188" cy="80" r="6"/><circle cx="200" cy="90" r="6"/><circle cx="190" cy="100" r="6"/><circle cx="178" cy="90" r="6"/></g></svg>'
// 麦穗（节气·秋收）
const WHEAT = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="220" height="320" viewBox="0 0 220 320"><path d="M110 316V150" stroke="%23A3752C" stroke-width="7" stroke-linecap="round"/><g fill="%23E7B10A"><g stroke="%23C2410C" stroke-width="3"><path d="M110 150c-30-10-38-34-30-56 24 4 34 26 30 56z"/><path d="M110 150c30-10 38-34 30-56-24 4-34 26-30 56z"/><path d="M110 190c-30-10-38-34-30-56 24 4 34 26 30 56z"/><path d="M110 190c30-10 38-34 30-56-24 4-34 26-30 56z"/><path d="M110 232c-28-10-36-32-28-54 22 4 32 26 28 54z"/><path d="M110 232c28-10 36-32 28-54-22 4-32 26-28 54z"/><path d="M110 112c-16-14-16-36 0-52 14 16 14 38 0 52z"/></g></g></svg>'
// 落叶 pair（节气·秋分）
const LEAF = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="260" height="180" viewBox="0 0 260 180"><g><path d="M40 140C20 92 48 34 112 22c22 60-6 110-72 118z" fill="%23C2410C" opacity="0.92"/><path d="M44 136 108 28" stroke="%237C2D12" stroke-width="4" fill="none"/><path d="M62 118l30-12M76 96l28-12M90 72l26-12" stroke="%237C2D12" stroke-width="3" fill="none"/></g><g transform="translate(118 34) rotate(126)"><path d="M40 140C20 92 48 34 112 22c22 60-6 110-72 118z" fill="%23E7B10A" opacity="0.9"/><path d="M44 136 108 28" stroke="%23A3752C" stroke-width="4" fill="none"/></g></svg>'
// 三层蛋糕 + 蜡烛
const CAKE = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="340" height="300" viewBox="0 0 340 300"><g><rect x="162" y="46" width="12" height="40" fill="%23F3EEE3"/><path d="M168 30c8 8 8 16 0 20-8-4-8-12 0-20z" fill="%23E7B10A"/><rect x="120" y="86" width="100" height="52" rx="10" fill="%23FBCFE8"/><path d="M120 100c18 12 82 12 100 0v-8a10 10 0 0 0-10-10H130a10 10 0 0 0-10 10z" fill="%23FBF6E7"/><rect x="82" y="138" width="176" height="62" rx="12" fill="%23FDE9B8"/><path d="M82 156c26 14 162 14 176 0v-6a12 12 0 0 0-12-12H94a12 12 0 0 0-12 12z" fill="%23F3EEE3"/><rect x="40" y="200" width="260" height="70" rx="14" fill="%23C2410C"/><path d="M40 224c40 18 218 18 260 0v-10a14 14 0 0 0-14-14H54a14 14 0 0 0-14 14z" fill="%23FBF6E7"/><g fill="%23E7B10A"><circle cx="96" cy="252" r="7"/><circle cx="170" cy="258" r="7"/><circle cx="244" cy="252" r="7"/></g></g></svg>'
// 礼盒 + 蝴蝶结（圣诞市集）
const GIFT = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="260" viewBox="0 0 300 260"><rect x="34" y="98" width="232" height="150" rx="10" fill="%23166534"/><rect x="22" y="66" width="256" height="46" rx="10" fill="%2315803D"/><rect x="130" y="66" width="40" height="182" fill="%23E7B10A"/><g fill="%23E7B10A"><path d="M150 62c-24-4-44-16-40-32 14-6 32 8 40 24 8-16 26-30 40-24 4 16-16 28-40 32z"/><circle cx="150" cy="58" r="12"/></g><g fill="%23FBF6E7" opacity="0.85"><circle cx="70" cy="150" r="9"/><circle cx="230" cy="192" r="9"/><circle cx="204" cy="136" r="6"/></g></svg>'
// 圣诞松枝 + 红果
const PINE = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="150" viewBox="0 0 300 150"><path d="M6 132C80 110 190 68 294 16" fill="none" stroke="%23166534" stroke-width="6" stroke-linecap="round"/><g stroke="%2315803D" stroke-width="7" stroke-linecap="round"><path d="M40 124l-6-30M52 120l16-24M86 110l-8-28M100 106l18-22M136 96l-8-28M150 92l18-22M188 80l-8-26M202 76l18-20M240 60l-8-24M252 56l16-18"/></g><g fill="%23B91C1C"><circle cx="70" cy="132" r="10"/><circle cx="124" cy="118" r="9"/><circle cx="176" cy="100" r="10"/><circle cx="228" cy="80" r="9"/></g></svg>'

export const festivalTemplates: Template[] = [
  // 1. 春节开门红海报（9:16）
  {
    id: 'festival-spring-open', name: '春节开门红海报', version: '1.0.0', category: 'festival',
    tags: ['festival', '春节', '新年', '促销', '9:16'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="90" height="160" viewBox="0 0 90 160"><rect width="90" height="160" fill="%239E1B1B"/><rect x="8" y="8" width="74" height="144" fill="none" stroke="%23F3C969" stroke-width="2"/><circle cx="22" cy="34" r="10" fill="%23C2410C"/><rect x="26" y="60" width="40" height="8" fill="%23FBF3E7"/><rect x="26" y="76" width="30" height="8" fill="%23F3C969"/><circle cx="66" cy="126" r="12" fill="%23F3C969"/></svg>',
    tokens: {
      colors: {
        bg: { label: '宫墙红', default: '#9E1B1B', options: ['#9E1B1B', '#7F1D1D', '#B91C1C', '#1C1917', '#431407'] },
        gold: { label: '烫金', default: '#F3C969', options: ['#F3C969', '#E7B10A', '#D4A24C', '#FDE68A'] },
        paper: { label: '宣白', default: '#FBF3E7', options: ['#FBF3E7', '#FFFFFF', '#FDF6E3', '#F5E6C8'] },
        ink: { label: '浓墨', default: '#2B1A10', options: ['#2B1A10', '#1C1917', '#431407', '#0F172A'] }
      },
      fonts: {
        heading: { label: '标题字体', default: SONG, options: [SONG, KAI, HEI] },
        sub: { label: '正文字体', default: HEI, options: [HEI, SANS, SERIF, MONO] }
      }
    },
    presets: [
      { name: '宫墙红金', colors: { bg: '#9E1B1B', gold: '#F3C969', paper: '#FBF3E7', ink: '#2B1A10' } },
      { name: '深宫暗朱', colors: { bg: '#7F1D1D', gold: '#E7B10A', paper: '#FDF6E3', ink: '#1C1917' } },
      { name: '墨黑烫金', colors: { bg: '#1C1917', gold: '#FDE68A', paper: '#FBF3E7', ink: '#431407' } },
      { name: '砖红米金', colors: { bg: '#B91C1C', gold: '#D4A24C', paper: '#F5E6C8', ink: '#0F172A' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1920, defaultWidth: 1080, defaultHeight: 1920, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'so-frame', type: 'shape', shapeKind: 'rect', x: 54, y: 54, width: 972, height: 1812, fill: 'transparent', border: { color: { $t: 'colors.gold' }, width: 3, style: 'solid' }, zIndex: 1 },
      { id: 'so-frame-in', type: 'shape', shapeKind: 'rect', x: 72, y: 72, width: 936, height: 1776, fill: 'transparent', border: { color: { $t: 'colors.gold' }, width: 1, style: 'solid' }, opacity: 0.6, zIndex: 1 },
      { id: 'so-dust', type: 'image', src: confetti(972, 1812, 70, 41, 'rgba(243,201,105,0.45)'), x: 54, y: 54, width: 972, height: 1812, objectFit: 'fill', zIndex: 2 },
      { id: 'so-cloud-t', type: 'image', src: CLOUD, x: 108, y: 120, width: 300, height: 130, opacity: 0.85, zIndex: 3 },
      { id: 'so-cloud-b', type: 'image', src: CLOUD, x: 672, y: 1660, width: 300, height: 130, rotation: 180, opacity: 0.8, zIndex: 3 },
      { id: 'so-lantern-l', type: 'image', src: LANTERN, x: 96, y: 168, width: 170, height: 255, zIndex: 4, animation: { name: 'swing', duration: 6200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'so-lantern-r', type: 'image', src: LANTERN, x: 814, y: 232, width: 140, height: 210, rotation: 5, zIndex: 4, animation: { name: 'swing', duration: 7400, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'so-knot', type: 'image', src: KNOT, x: 872, y: 560, width: 130, height: 166, opacity: 0.9, zIndex: 4 },
      { id: 'so-year', type: 'text', content: '丙 午 年 · 新 春', fontFamily: { $t: 'fonts.sub' }, fontSize: 30, fontWeight: '500', color: { $t: 'colors.gold' }, letterSpacing: 6, textAlign: 'center', x: 240, y: 566, width: 600, height: 42, zIndex: 5, animation: { name: 'fadeIn', duration: 700, delay: 200 }, editable: { content: true } },
      { id: 'so-rule-t', type: 'shape', shapeKind: 'rect', x: 300, y: 636, width: 480, height: 2, fill: { $t: 'colors.gold' }, opacity: 0.7, zIndex: 5 },
      { id: 'so-title', type: 'text', content: '开 门 红', fontFamily: { $t: 'fonts.heading' }, fontSize: 168, fontWeight: '900', color: { $t: 'colors.paper' }, letterSpacing: 12, textAlign: 'center', x: 120, y: 700, width: 840, height: 200, zIndex: 5, animation: { name: 'inkReveal', duration: 1400 }, editable: { content: true, fontSize: { type: 'range', min: 110, max: 210 }, position: true } },
      { id: 'so-title-en', type: 'text', content: 'SPRING GRAND OPENING', fontFamily: { $t: 'fonts.sub' }, fontSize: 24, fontWeight: '700', color: { $t: 'colors.gold' }, letterSpacing: 10, textAlign: 'center', x: 200, y: 936, width: 680, height: 34, zIndex: 5, editable: { content: true } },
      { id: 'so-promo', type: 'text', content: '全场 5 折起', fontFamily: { $t: 'fonts.heading' }, fontSize: 96, fontWeight: '900', color: { $t: 'colors.gold' }, textAlign: 'center', x: 160, y: 1058, width: 760, height: 116, zIndex: 5, animation: { name: 'zoomIn', duration: 900, delay: 700 }, editable: { content: true, fontSize: { type: 'range', min: 64, max: 128 } } },
      { id: 'so-promo-sub', type: 'text', content: '正月初一至初七 · 进店即送开运福袋', fontFamily: { $t: 'fonts.sub' }, fontSize: 34, color: { $t: 'colors.paper' }, opacity: 0.9, textAlign: 'center', x: 140, y: 1198, width: 800, height: 48, zIndex: 5, editable: { content: true } },
      { id: 'so-seal', type: 'shape', shapeKind: 'rect', x: 700, y: 1300, width: 172, height: 172, fill: { $t: 'colors.gold' }, borderRadius: 16, rotation: -7, zIndex: 5, shadow: { offsetX: 0, offsetY: 8, blur: 18, color: 'rgba(0,0,0,0.28)' } },
      { id: 'so-seal-text', type: 'text', content: '福', fontFamily: { $t: 'fonts.heading' }, fontSize: 118, fontWeight: '900', color: { $t: 'colors.ink' }, textAlign: 'center', rotation: -7, x: 700, y: 1322, width: 172, height: 130, zIndex: 6, editable: { content: true } },
      { id: 'so-info', type: 'text', content: '除夕 18:00 闭店　·　初二 09:00 照常营业', fontFamily: { $t: 'fonts.sub' }, fontSize: 26, color: { $t: 'colors.paper' }, opacity: 0.72, textAlign: 'center', x: 130, y: 1500, width: 820, height: 38, zIndex: 6, editable: { content: true } },
      { id: 'so-footer', type: 'text', content: 'LANGFANG · 百年老宅 12 号　010-8800-1288', fontFamily: { $t: 'fonts.sub' }, fontSize: 22, color: { $t: 'colors.gold' }, opacity: 0.8, letterSpacing: 3, textAlign: 'center', x: 150, y: 1560, width: 780, height: 32, zIndex: 6 }
    ]
  },

  // 2. 中秋月圆礼盒（1:1）
  {
    id: 'festival-moon-gift', name: '中秋月圆夜礼盒', version: '1.0.0', category: 'festival',
    tags: ['festival', '中秋', '月圆', '礼盒', '1:1'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23101B33"/><circle cx="70" cy="30" r="18" fill="%23FBF6E7"/><circle cx="64" cy="26" r="3" fill="%23E3D6BA"/><path d="M12 78c14-6 24-2 34 2" stroke="%23E7B10A" stroke-width="3" fill="none"/><rect x="16" y="60" width="26" height="18" fill="%23F3EEE3" opacity="0.9"/></svg>',
    tokens: {
      colors: {
        bg: { label: '夜色', default: '#101B33', options: ['#101B33', '#0B1220', '#1E2A44', '#3B2A1A', '#1C1917'] },
        moon: { label: '月白', default: '#FBF6E7', options: ['#FBF6E7', '#FFFFFF', '#FDE9B8', '#F5E6C8'] },
        text: { label: '主文字', default: '#F3EEE3', options: ['#F3EEE3', '#FBF6E7', '#E7D8B9', '#FFFFFF'] },
        accent: { label: '桂金', default: '#E7B10A', options: ['#E7B10A', '#D4A24C', '#C2410C', '#F3C969'] }
      },
      fonts: {
        heading: { label: '标题字体', default: KAI, options: [KAI, SONG, HEI] },
        sub: { label: '正文字体', default: SANS, options: [SANS, HEI, SERIF, MONO] }
      }
    },
    presets: [
      { name: '夜阑月白', colors: { bg: '#101B33', moon: '#FBF6E7', text: '#F3EEE3', accent: '#E7B10A' } },
      { name: '墨蓝银桂', colors: { bg: '#0B1220', moon: '#FFFFFF', text: '#FFFFFF', accent: '#D4A24C' } },
      { name: '大地桂棕', colors: { bg: '#3B2A1A', moon: '#FDE9B8', text: '#E7D8B9', accent: '#C2410C' } },
      { name: '深紫流银', colors: { bg: '#1E2A44', moon: '#F5E6C8', text: '#FBF6E7', accent: '#F3C969' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1080, defaultWidth: 1080, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'mg-stars', type: 'image', src: confetti(1080, 1080, 54, 88, 'rgba(251,246,231,0.5)'), x: 0, y: 0, width: 1080, height: 1080, objectFit: 'fill', zIndex: 1 },
      { id: 'mg-moon', type: 'image', src: MOON, x: 618, y: 96, width: 372, height: 372, zIndex: 2, animation: { name: 'glow', duration: 4200, iterationCount: 'infinite' } },
      { id: 'mg-halo', type: 'shape', shapeKind: 'circle', x: 592, y: 70, width: 424, height: 424, fill: 'transparent', border: { color: { $t: 'colors.moon' }, width: 1, style: 'solid' }, opacity: 0.3, zIndex: 2 },
      { id: 'mg-osmanthus', type: 'image', src: OSMANTHUS, x: 40, y: 60, width: 320, height: 200, opacity: 0.95, zIndex: 3 },
      { id: 'mg-osmanthus-b', type: 'image', src: OSMANTHUS, x: 720, y: 864, width: 300, height: 188, rotation: 168, opacity: 0.8, zIndex: 3 },
      { id: 'mg-rabbit', type: 'image', src: RABBIT, x: 640, y: 470, width: 280, height: 215, zIndex: 3, animation: { name: 'float', duration: 5200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'mg-title', type: 'text', content: '月 圆', fontFamily: { $t: 'fonts.heading' }, fontSize: 158, fontWeight: '700', color: { $t: 'colors.text' }, letterSpacing: 16, x: 98, y: 348, width: 560, height: 180, zIndex: 4, animation: { name: 'inkReveal', duration: 1500 }, editable: { content: true, fontSize: { type: 'range', min: 100, max: 200 }, position: true } },
      { id: 'mg-title-sub', type: 'text', content: 'MID-AUTUMN FESTIVAL', fontFamily: { $t: 'fonts.sub' }, fontSize: 22, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 8, x: 98, y: 552, width: 520, height: 32, zIndex: 4, editable: { content: true } },
      { id: 'mg-rule', type: 'shape', shapeKind: 'rect', x: 98, y: 606, width: 300, height: 2, fill: { $t: 'colors.accent' }, opacity: 0.75, zIndex: 4 },
      { id: 'mg-desc', type: 'text', content: '桂香浮盏，玉盘当空。\n把想念装进盒里，寄给同看一轮月的人。', fontFamily: { $t: 'fonts.heading' }, fontSize: 34, color: { $t: 'colors.text' }, opacity: 0.88, lineHeight: 1.75, x: 98, y: 648, width: 560, height: 150, zIndex: 4, animation: { name: 'rise', duration: 900, delay: 500 }, editable: { content: true } },
      { id: 'mg-box', type: 'shape', shapeKind: 'rect', x: 98, y: 848, width: 530, height: 118, fill: 'transparent', border: { color: { $t: 'colors.accent' }, width: 2, style: 'dashed' }, borderRadius: 8, zIndex: 4 },
      { id: 'mg-box-l', type: 'text', content: '礼盒预售价　¥ 368　/　双黄白莲 8 件', fontFamily: { $t: 'fonts.sub' }, fontSize: 28, color: { $t: 'colors.accent' }, textAlign: 'center', x: 118, y: 884, width: 490, height: 44, zIndex: 5, editable: { content: true } },
      { id: 'mg-date', type: 'text', content: '农历八月十五　·　09 月 25 日　·　限量 500 盒', fontFamily: { $t: 'fonts.sub' }, fontSize: 24, color: { $t: 'colors.text' }, opacity: 0.66, x: 98, y: 998, width: 620, height: 34, zIndex: 5, editable: { content: true } },
      { id: 'mg-side', type: 'text', content: '同 心 制 果', fontFamily: { $t: 'fonts.heading' }, fontSize: 26, color: { $t: 'colors.text' }, opacity: 0.55, letterSpacing: 10, x: 906, y: 700, width: 40, height: 260, zIndex: 5 }
    ]
  },

  // 3. 二十四节气·秋分竖卡（3:4）
  {
    id: 'festival-solar-term', name: '二十四节气秋分竖卡', version: '1.0.0', category: 'festival',
    tags: ['festival', '节气', '秋分', '东方', '3:4'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="90" height="120" viewBox="0 0 90 120"><rect width="90" height="120" fill="%23F3EEE3"/><rect x="10" y="10" width="70" height="100" fill="none" stroke="%238A7B63" stroke-width="1"/><rect x="34" y="26" width="22" height="22" fill="%232B2B2B" opacity="0.85"/><rect x="34" y="56" width="22" height="22" fill="%232B2B2B" opacity="0.85"/><rect x="60" y="88" width="14" height="14" fill="%23C2410C"/><path d="M16 100h28" stroke="%238A7B63" stroke-width="2"/></svg>',
    tokens: {
      colors: {
        bg: { label: '卡纸', default: '#F3EEE3', options: ['#F3EEE3', '#FBF6E7', '#F5F1E8', '#EDE3D5', '#FFFFFF'] },
        ink: { label: '墨色', default: '#2B2B2B', options: ['#2B2B2B', '#1C1917', '#3B2A1A', '#0F172A'] },
        accent: { label: '秋朱', default: '#C2410C', options: ['#C2410C', '#B91C1C', '#7C2D12', '#A3752C'] },
        faint: { label: '淡赭', default: '#8A7B63', options: ['#8A7B63', '#A8A29E', '#78716C', '#57534E'] }
      },
      fonts: {
        heading: { label: '节气字体', default: SONG, options: [SONG, KAI, HEI] },
        sub: { label: '正文字体', default: HEI, options: [HEI, SANS, SERIF, MONO] }
      }
    },
    presets: [
      { name: '米纸赭秋', colors: { bg: '#F3EEE3', ink: '#2B2B2B', accent: '#C2410C', faint: '#8A7B63' } },
      { name: '宣白深墨', colors: { bg: '#FFFFFF', ink: '#1C1917', accent: '#B91C1C', faint: '#78716C' } },
      { name: '暖褐土金', colors: { bg: '#EDE3D5', ink: '#3B2A1A', accent: '#A3752C', faint: '#57534E' } },
      { name: '淡青霜白', colors: { bg: '#F5F1E8', ink: '#0F172A', accent: '#7C2D12', faint: '#A8A29E' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1440, defaultWidth: 1080, defaultHeight: 1440, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'st-frame', type: 'shape', shapeKind: 'rect', x: 66, y: 66, width: 948, height: 1308, fill: 'transparent', border: { color: { $t: 'colors.faint' }, width: 1, style: 'solid' }, opacity: 0.65, zIndex: 1 },
      { id: 'st-grain', type: 'image', src: confetti(948, 1308, 46, 21, 'rgba(138,123,99,0.16)'), x: 66, y: 66, width: 948, height: 1308, objectFit: 'fill', zIndex: 2 },
      { id: 'st-top-rule', type: 'shape', shapeKind: 'rect', x: 66, y: 150, width: 948, height: 1, fill: { $t: 'colors.faint' }, opacity: 0.45, zIndex: 3 },
      { id: 'st-kicker', type: 'text', content: '廿 四 节 气 · 第 十 六 个', fontFamily: { $t: 'fonts.sub' }, fontSize: 24, color: { $t: 'colors.faint' }, letterSpacing: 6, x: 110, y: 106, width: 500, height: 34, zIndex: 4, editable: { content: true } },
      { id: 'st-no', type: 'text', content: 'NO.16', fontFamily: { $t: 'fonts.sub' }, fontSize: 22, color: { $t: 'colors.faint' }, letterSpacing: 2, textAlign: 'right', x: 700, y: 108, width: 268, height: 32, zIndex: 4 },
      { id: 'st-c1', type: 'text', content: '秋', fontFamily: { $t: 'fonts.heading' }, fontSize: 186, fontWeight: '700', color: { $t: 'colors.ink' }, textAlign: 'center', x: 120, y: 268, width: 220, height: 214, zIndex: 4, animation: { name: 'inkReveal', duration: 1300 }, editable: { content: true, fontSize: { type: 'range', min: 130, max: 240 } } },
      { id: 'st-c2', type: 'text', content: '分', fontFamily: { $t: 'fonts.heading' }, fontSize: 186, fontWeight: '700', color: { $t: 'colors.ink' }, textAlign: 'center', x: 120, y: 486, width: 220, height: 214, zIndex: 4, animation: { name: 'inkReveal', duration: 1300, delay: 320 }, editable: { content: true, fontSize: { type: 'range', min: 130, max: 240 } } },
      { id: 'st-seal', type: 'shape', shapeKind: 'rect', x: 150, y: 730, width: 128, height: 128, fill: { $t: 'colors.accent' }, borderRadius: 10, rotation: -4, zIndex: 4 },
      { id: 'st-seal-text', type: 'text', content: '秋', fontFamily: { $t: 'fonts.heading' }, fontSize: 88, fontWeight: '700', color: { $t: 'colors.bg' }, textAlign: 'center', rotation: -4, x: 150, y: 748, width: 128, height: 96, zIndex: 5, editable: { content: true } },
      { id: 'st-wheat', type: 'image', src: WHEAT, x: 828, y: 250, width: 190, height: 276, zIndex: 4, animation: { name: 'wobble', duration: 7600, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-leaf', type: 'image', src: LEAF, x: 660, y: 1080, width: 250, height: 174, rotation: -8, opacity: 0.95, zIndex: 4, editable: { position: true, size: { type: 'scale' } } },
      { id: 'st-en', type: 'text', content: 'AUTUMNAL EQUINOX', fontFamily: { $t: 'fonts.sub' }, fontSize: 26, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 8, x: 390, y: 300, width: 450, height: 36, zIndex: 4, editable: { content: true } },
      { id: 'st-poem', type: 'text', content: '暑退秋澄，风清露冷。\n昼夜自此均分，万物各得其平。', fontFamily: { $t: 'fonts.heading' }, fontSize: 34, color: { $t: 'colors.ink' }, opacity: 0.9, lineHeight: 1.85, x: 390, y: 366, width: 500, height: 170, zIndex: 4, animation: { name: 'fadeInUp', duration: 900, delay: 500 }, editable: { content: true } },
      { id: 'st-hou-title', type: 'text', content: '一候　鹰乃祭鸟', fontFamily: { $t: 'fonts.sub' }, fontSize: 27, color: { $t: 'colors.ink' }, opacity: 0.78, x: 390, y: 638, width: 420, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'st-hou-2', type: 'text', content: '二候　天地始肃', fontFamily: { $t: 'fonts.sub' }, fontSize: 27, color: { $t: 'colors.ink' }, opacity: 0.78, x: 390, y: 690, width: 420, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'st-hou-3', type: 'text', content: '三候　禾乃登', fontFamily: { $t: 'fonts.sub' }, fontSize: 27, color: { $t: 'colors.ink' }, opacity: 0.78, x: 390, y: 742, width: 420, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'st-hou-rule', type: 'shape', shapeKind: 'rect', x: 390, y: 604, width: 240, height: 2, fill: { $t: 'colors.accent' }, opacity: 0.8, zIndex: 4 },
      { id: 'st-date', type: 'text', content: '09 月 23 日　·　农历八月初二　·　太阳黄经 180°', fontFamily: { $t: 'fonts.sub' }, fontSize: 24, color: { $t: 'colors.faint' }, x: 110, y: 1244, width: 700, height: 34, zIndex: 4, editable: { content: true } },
      { id: 'st-sign', type: 'text', content: '时序手帖', fontFamily: { $t: 'fonts.heading' }, fontSize: 24, color: { $t: 'colors.faint' }, letterSpacing: 8, textAlign: 'right', x: 740, y: 1244, width: 228, height: 34, zIndex: 4 }
    ]
  },

  // 4. 圣诞手作市集横幅（2.35:1 公众号头图）
  {
    id: 'festival-xmas-market', name: '圣诞手作市集横幅', version: '1.0.0', category: 'festival',
    tags: ['festival', '圣诞', '市集', '横幅', '2.35:1', '公众号'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="68" viewBox="0 0 160 68"><rect width="160" height="68" fill="%230E2A22"/><path d="M6 14c18-4 30-8 44-14" stroke="%2315803D" stroke-width="4" fill="none"/><rect x="120" y="26" width="28" height="24" fill="%23166534"/><rect x="130" y="20" width="8" height="36" fill="%23E7B10A"/><rect x="12" y="22" width="60" height="8" fill="%23FBF6E7"/><rect x="12" y="38" width="40" height="6" fill="%23B91C1C"/></svg>',
    tokens: {
      colors: {
        bg: { label: '松夜', default: '#0E2A22', options: ['#0E2A22', '#14532D', '#1C1917', '#132A4A', '#3B1D1D'] },
        cream: { label: '奶油白', default: '#FBF6E7', options: ['#FBF6E7', '#FFFFFF', '#F5E6C8', '#FDF6E3'] },
        red: { label: '圣诞红', default: '#B91C1C', options: ['#B91C1C', '#DC2626', '#C2410C', '#991B1B'] },
        gold: { label: '烛金', default: '#E7B10A', options: ['#E7B10A', '#F3C969', '#D4A24C', '#FDE68A'] }
      },
      fonts: {
        heading: { label: '标题字体', default: HEI, options: [HEI, SONG, KAI, SERIF] },
        sub: { label: '正文字体', default: SANS, options: [SANS, HEI, SERIF, MONO] }
      }
    },
    presets: [
      { name: '松夜红金', colors: { bg: '#0E2A22', cream: '#FBF6E7', red: '#B91C1C', gold: '#E7B10A' } },
      { name: '冷杉白雪', colors: { bg: '#14532D', cream: '#FFFFFF', red: '#DC2626', gold: '#F3C969' } },
      { name: '暗夜琥珀', colors: { bg: '#1C1917', cream: '#F5E6C8', red: '#C2410C', gold: '#D4A24C' } },
      { name: '靛蓝夜礼', colors: { bg: '#132A4A', cream: '#FDF6E3', red: '#991B1B', gold: '#FDE68A' } }
    ],
    canvas: { virtualWidth: 1800, virtualHeight: 766, defaultWidth: 1800, defaultHeight: 766, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'xm-frame', type: 'shape', shapeKind: 'rect', x: 30, y: 30, width: 1740, height: 706, fill: 'transparent', border: { color: { $t: 'colors.gold' }, width: 2, style: 'solid' }, opacity: 0.55, zIndex: 1 },
      { id: 'xm-snow', type: 'image', src: confetti(1740, 706, 96, 57, 'rgba(251,246,231,0.6)'), x: 30, y: 30, width: 1740, height: 706, objectFit: 'fill', zIndex: 2 },
      { id: 'xm-pine-tl', type: 'image', src: PINE, x: 60, y: 34, width: 340, height: 170, zIndex: 3 },
      { id: 'xm-pine-br', type: 'image', src: PINE, x: 1400, y: 562, width: 340, height: 170, rotation: 180, zIndex: 3 },
      { id: 'xm-gift', type: 'image', src: GIFT, x: 1330, y: 232, width: 300, height: 260, zIndex: 3, animation: { name: 'float', duration: 5400, iterationCount: 'infinite', easing: 'ease-in-out' }, editable: { position: true, size: { type: 'scale' } } },
      { id: 'xm-kicker', type: 'text', content: 'MERRY CHRISTMAS · VOL.05', fontFamily: { $t: 'fonts.sub' }, fontSize: 26, fontWeight: '700', color: { $t: 'colors.gold' }, letterSpacing: 12, x: 132, y: 186, width: 800, height: 36, zIndex: 4, editable: { content: true } },
      { id: 'xm-title', type: 'text', content: '圣诞手作市集', fontFamily: { $t: 'fonts.heading' }, fontSize: 112, fontWeight: '900', color: { $t: 'colors.cream' }, letterSpacing: 4, x: 128, y: 236, width: 1080, height: 132, zIndex: 4, animation: { name: 'slideInLeft', duration: 800 }, editable: { content: true, fontSize: { type: 'range', min: 76, max: 140 }, position: true } },
      { id: 'xm-desc', type: 'text', content: '松枝、热红酒与 42 个手作摊位，在钟楼广场点亮冬夜。', fontFamily: { $t: 'fonts.sub' }, fontSize: 32, color: { $t: 'colors.cream' }, opacity: 0.85, x: 134, y: 392, width: 1060, height: 46, zIndex: 4, editable: { content: true } },
      { id: 'xm-rule', type: 'shape', shapeKind: 'rect', x: 134, y: 466, width: 260, height: 2, fill: { $t: 'colors.gold' }, zIndex: 4 },
      { id: 'xm-date', type: 'text', content: '12 月 24 - 25 日　11:00 - 21:00', fontFamily: { $t: 'fonts.sub' }, fontSize: 32, fontWeight: '700', color: { $t: 'colors.gold' }, x: 134, y: 500, width: 800, height: 46, zIndex: 4, editable: { content: true } },
      { id: 'xm-addr', type: 'text', content: '老城区 钟楼广场 B 区　·　免费入场', fontFamily: { $t: 'fonts.sub' }, fontSize: 26, color: { $t: 'colors.cream' }, opacity: 0.7, x: 134, y: 560, width: 800, height: 38, zIndex: 4, editable: { content: true } },
      { id: 'xm-cta', type: 'shape', shapeKind: 'rect', x: 1330, y: 540, width: 340, height: 84, fill: { $t: 'colors.red' }, borderRadius: 42, zIndex: 4, shadow: { offsetX: 0, offsetY: 8, blur: 20, color: 'rgba(0,0,0,0.3)' } },
      { id: 'xm-cta-text', type: 'text', content: '预约摊位', fontFamily: { $t: 'fonts.heading' }, fontSize: 34, fontWeight: '700', color: { $t: 'colors.cream' }, letterSpacing: 6, textAlign: 'center', x: 1330, y: 560, width: 340, height: 46, zIndex: 5, editable: { content: true } }
    ]
  },

  // 5. 生日蛋糕日签（4:5）
  {
    id: 'festival-birthday-cake', name: '生日蛋糕日签', version: '1.0.0', category: 'festival',
    tags: ['festival', '生日', '蛋糕', '纪念', '4:5'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="90" height="112" viewBox="0 0 90 112"><rect width="90" height="112" fill="%23FDF2F8"/><rect x="26" y="60" width="38" height="10" fill="%23DB2777" opacity="0.8"/><rect x="20" y="70" width="50" height="16" fill="%23FBCFE8"/><rect x="43" y="46" width="4" height="14" fill="%23FDE68A"/><text x="45" y="38" font-size="20" text-anchor="middle" fill="%23DB2777" font-family="Impact">3</text></svg>',
    tokens: {
      colors: {
        bg: { label: '奶油底', default: '#FDF2F8', options: ['#FDF2F8', '#FFF7ED', '#ECFCCB', '#F0F9FF', '#F5F1E8'] },
        primary: { label: '主色', default: '#DB2777', options: ['#DB2777', '#C2410C', '#65A30D', '#0284C7', '#7C3AED'] },
        accent: { label: '糖霜', default: '#FBCFE8', options: ['#FBCFE8', '#FDE68A', '#D9F99D', '#BAE6FD', '#DDD6FE'] },
        ink: { label: '字色', default: '#3F3F46', options: ['#3F3F46', '#1C1917', '#78350F', '#0F172A'] }
      },
      fonts: {
        heading: { label: '标题字体', default: HEI, options: [HEI, SONG, SANS, IMPACT] },
        sub: { label: '正文字体', default: SANS, options: [SANS, HEI, SERIF, KAI] }
      }
    },
    presets: [
      { name: '蜜桃粉糖', colors: { bg: '#FDF2F8', primary: '#DB2777', accent: '#FBCFE8', ink: '#3F3F46' } },
      { name: '焦糖奶油', colors: { bg: '#FFF7ED', primary: '#C2410C', accent: '#FDE68A', ink: '#78350F' } },
      { name: '抹茶奶白', colors: { bg: '#ECFCCB', primary: '#65A30D', accent: '#D9F99D', ink: '#1C1917' } },
      { name: '天蓝汽水', colors: { bg: '#F0F9FF', primary: '#0284C7', accent: '#BAE6FD', ink: '#0F172A' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'bc-blob', type: 'shape', shapeKind: 'circle', x: 210, y: 170, width: 660, height: 660, fill: { $t: 'colors.accent' }, opacity: 0.55, zIndex: 1, animation: { name: 'pulse', duration: 5200, iterationCount: 'infinite' } },
      { id: 'bc-confetti', type: 'image', src: confetti(1080, 1350, 82, 63, 'rgba(219,39,119,0.28)'), x: 0, y: 0, width: 1080, height: 1350, objectFit: 'fill', zIndex: 2 },
      { id: 'bc-kicker', type: 'text', content: 'HAPPY BIRTHDAY TO YOU', fontFamily: { $t: 'fonts.sub' }, fontSize: 26, fontWeight: '700', color: { $t: 'colors.primary' }, letterSpacing: 10, textAlign: 'center', x: 180, y: 214, width: 720, height: 36, zIndex: 3, editable: { content: true } },
      { id: 'bc-age', type: 'text', content: '3', fontFamily: { $t: 'fonts.heading' }, fontSize: 300, fontWeight: '900', color: { $t: 'colors.ink' }, textAlign: 'center', x: 300, y: 240, width: 480, height: 320, zIndex: 3, animation: { name: 'zoomIn', duration: 900 }, editable: { content: true, fontSize: { type: 'range', min: 180, max: 380 } } },
      { id: 'bc-age-unit', type: 'text', content: '岁', fontFamily: { $t: 'fonts.heading' }, fontSize: 56, fontWeight: '700', color: { $t: 'colors.primary' }, x: 700, y: 430, width: 90, height: 74, zIndex: 4, editable: { content: true } },
      { id: 'bc-cake', type: 'image', src: CAKE, x: 370, y: 560, width: 340, height: 300, zIndex: 4, animation: { name: 'float', duration: 5600, iterationCount: 'infinite', easing: 'ease-in-out' }, editable: { position: true, size: { type: 'scale' } } },
      { id: 'bc-name', type: 'text', content: '小 满', fontFamily: { $t: 'fonts.heading' }, fontSize: 92, fontWeight: '900', color: { $t: 'colors.ink' }, letterSpacing: 8, textAlign: 'center', x: 200, y: 902, width: 680, height: 110, zIndex: 4, editable: { content: true, fontSize: { type: 'range', min: 60, max: 120 } } },
      { id: 'bc-rule-l', type: 'shape', shapeKind: 'rect', x: 240, y: 1052, width: 240, height: 2, fill: { $t: 'colors.primary' }, opacity: 0.5, zIndex: 4 },
      { id: 'bc-rule-r', type: 'shape', shapeKind: 'rect', x: 600, y: 1052, width: 240, height: 2, fill: { $t: 'colors.primary' }, opacity: 0.5, zIndex: 4 },
      { id: 'bc-wish', type: 'text', content: '愿你三冬暖，愿你春不寒。\n愿你天黑有灯，下雨有伞。', fontFamily: { $t: 'fonts.sub' }, fontSize: 34, color: { $t: 'colors.ink' }, opacity: 0.82, lineHeight: 1.7, textAlign: 'center', x: 200, y: 1078, width: 680, height: 120, zIndex: 4, animation: { name: 'rise', duration: 900, delay: 400 }, editable: { content: true } },
      { id: 'bc-date', type: 'text', content: '2026 年 9 月 21 日　·　第 3 次绕日旅行', fontFamily: { $t: 'fonts.sub' }, fontSize: 24, color: { $t: 'colors.primary' }, letterSpacing: 2, textAlign: 'center', x: 200, y: 1230, width: 680, height: 34, zIndex: 4, editable: { content: true } },
      { id: 'bc-sign', type: 'text', content: 'from. 爱你的家人', fontFamily: { $t: 'fonts.sub' }, fontSize: 22, color: { $t: 'colors.ink' }, opacity: 0.55, textAlign: 'center', x: 200, y: 1278, width: 680, height: 30, zIndex: 4 }
    ]
  },

  // 6. 跨年倒计时横幅（2.35:1 公众号头图）
  {
    id: 'festival-countdown-ny', name: '跨年烟花倒计时', version: '1.0.0', category: 'festival',
    tags: ['festival', '跨年', '元旦', '烟花', '2.35:1', '公众号'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="68" viewBox="0 0 160 68"><rect width="160" height="68" fill="%23080B1A"/><g stroke="%23FDE68A" stroke-width="1.6"><path d="M28 12v10M23 17h10M24 13l8 8M32 13l-8 8"/></g><g stroke="%23F472B6" stroke-width="1.6"><path d="M132 40v10M127 45h10"/></g><text x="80" y="48" font-size="26" text-anchor="middle" fill="%23F8FAFC" font-family="Impact">26</text></svg>',
    tokens: {
      colors: {
        bg: { label: '午夜蓝', default: '#080B1A', options: ['#080B1A', '#111827', '#1E1B4B', '#0B1220', '#1C1917'] },
        text: { label: '主文字', default: '#F8FAFC', options: ['#F8FAFC', '#FFFFFF', '#FDF6E3', '#E7E5E4'] },
        gold: { label: '烟花金', default: '#FDE68A', options: ['#FDE68A', '#E7B10A', '#F3C969', '#FB923C'] },
        neon: { label: '霓虹', default: '#F472B6', options: ['#F472B6', '#22D3EE', '#A3E635', '#FB7185'] }
      },
      fonts: {
        number: { label: '数字字体', default: IMPACT, options: [IMPACT, SERIF, MONO, SANS] },
        heading: { label: '标题字体', default: HEI, options: [HEI, SONG, KAI] },
        sub: { label: '正文字体', default: SANS, options: [SANS, HEI, MONO] }
      }
    },
    presets: [
      { name: '午夜金霓', colors: { bg: '#080B1A', text: '#F8FAFC', gold: '#FDE68A', neon: '#F472B6' } },
      { name: '石墨暖橙', colors: { bg: '#111827', text: '#FFFFFF', gold: '#FB923C', neon: '#22D3EE' } },
      { name: '靛紫青芒', colors: { bg: '#1E1B4B', text: '#FDF6E3', gold: '#F3C969', neon: '#A3E635' } },
      { name: '纯黑玫红', colors: { bg: '#1C1917', text: '#E7E5E4', gold: '#E7B10A', neon: '#FB7185' } }
    ],
    canvas: { virtualWidth: 1800, virtualHeight: 766, defaultWidth: 1800, defaultHeight: 766, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'ny-fw-l', type: 'image', src: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="620" height="620" viewBox="0 0 620 620">${burst(310, 310, 300, 26, '%23FDE68A', 7)}</svg>`, x: 40, y: 30, width: 620, height: 620, zIndex: 1, opacity: 0.9, animation: { name: 'twinkle', duration: 3200, iterationCount: 'infinite' } },
      { id: 'ny-fw-r', type: 'image', src: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="520" height="520" viewBox="0 0 520 520">${burst(260, 260, 250, 22, '%23F472B6', 29)}</svg>`, x: 1300, y: 120, width: 460, height: 460, zIndex: 1, opacity: 0.8, animation: { name: 'sparkle', duration: 4100, iterationCount: 'infinite' } },
      { id: 'ny-fw-s', type: 'image', src: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300">${burst(150, 150, 140, 16, '%23F8FAFC', 53)}</svg>`, x: 640, y: 40, width: 260, height: 260, zIndex: 1, opacity: 0.5, animation: { name: 'twinkle', duration: 2600, iterationCount: 'infinite', delay: 700 } },
      { id: 'ny-sparkle', type: 'image', src: confetti(1740, 706, 70, 91, 'rgba(253,230,138,0.55)'), x: 30, y: 30, width: 1740, height: 706, objectFit: 'fill', zIndex: 2 },
      { id: 'ny-year', type: 'text', content: '2026', fontFamily: { $t: 'fonts.number' }, fontSize: 300, fontWeight: '400', color: { $t: 'colors.text' }, letterSpacing: 10, textAlign: 'center', x: 300, y: 176, width: 1200, height: 320, zIndex: 3, animation: { name: 'zoomIn', duration: 1100 }, editable: { content: true, fontSize: { type: 'range', min: 200, max: 380 } } },
      { id: 'ny-hair-l', type: 'shape', shapeKind: 'rect', x: 320, y: 536, width: 420, height: 2, fill: { $t: 'colors.gold' }, opacity: 0.75, zIndex: 3 },
      { id: 'ny-hair-r', type: 'shape', shapeKind: 'rect', x: 1060, y: 536, width: 420, height: 2, fill: { $t: 'colors.gold' }, opacity: 0.75, zIndex: 3 },
      { id: 'ny-dot-l', type: 'shape', shapeKind: 'circle', x: 758, y: 528, width: 16, height: 16, fill: { $t: 'colors.neon' }, zIndex: 3 },
      { id: 'ny-dot-r', type: 'shape', shapeKind: 'circle', x: 1026, y: 528, width: 16, height: 16, fill: { $t: 'colors.neon' }, zIndex: 3 },
      { id: 'ny-title', type: 'text', content: '新 年 快 乐', fontFamily: { $t: 'fonts.heading' }, fontSize: 68, fontWeight: '900', color: { $t: 'colors.gold' }, letterSpacing: 16, textAlign: 'center', x: 400, y: 572, width: 1000, height: 86, zIndex: 3, animation: { name: 'fadeInUp', duration: 800, delay: 600 }, editable: { content: true, fontSize: { type: 'range', min: 48, max: 92 } } },
      { id: 'ny-sub', type: 'text', content: '所有旧故事都在此清算，所有新冒险从零点开始。', fontFamily: { $t: 'fonts.sub' }, fontSize: 28, color: { $t: 'colors.text' }, opacity: 0.78, textAlign: 'center', x: 400, y: 670, width: 1000, height: 40, zIndex: 3, editable: { content: true } },
      { id: 'ny-count', type: 'text', content: 'COUNTDOWN · 23 : 59 : 59', fontFamily: { $t: 'fonts.sub' }, fontSize: 24, fontWeight: '700', color: { $t: 'colors.neon' }, letterSpacing: 6, x: 60, y: 686, width: 520, height: 34, zIndex: 3, editable: { content: true } },
      { id: 'ny-brand', type: 'text', content: 'NIGHT WATCH 03　·　城市天台观测站', fontFamily: { $t: 'fonts.sub' }, fontSize: 22, color: { $t: 'colors.text' }, opacity: 0.5, letterSpacing: 2, textAlign: 'right', x: 1220, y: 688, width: 520, height: 34, zIndex: 3 }
    ]
  }
]

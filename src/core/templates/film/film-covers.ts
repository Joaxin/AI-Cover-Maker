// src/core/templates/film/film-covers.ts —— 影视·剧集大类第一批（6 个 · 5 种比例）
// 口径：解说封面 / 安利卡 / 片单清单 / 台词海报 / 分集速看 / 避雷差评；颜色全走 token，每个 4 套预设。
// 与已存在的 quote-film-strip-quote（暗场字幕卡）、mag-cinema-special（黑金电影特刊）刻意错开：
// 这里以「纸面场刊 + 播放器 UI + 清单台账」为视觉母题，不用黑金胶片齿孔那一套。
import type { Template } from '@/types/types'
import { HEI, SONG, IMPACT, MONO, SANS, SERIF } from '../_fx/trend'
import { dotsBg, hatchBg } from '../knowledge/_decor'
import { svgUri } from '../_fx/common'

// 评分星排：n 颗星，前 filled 颗实心（颜色写死在 data URI 里，故只用于浅底）
function starRow(w: number, h: number, n: number, filled: number, fill: string, empty: string) {
  const step = w / n, r = Math.min(step, h) * 0.46
  let s = ''
  for (let i = 0; i < n; i++) {
    const cx = step * i + step / 2, cy = h / 2
    const pts = Array.from({ length: 10 }, (_, k) => {
      const a = -Math.PI / 2 + (Math.PI * k) / 5
      const rr = k % 2 ? r * 0.44 : r
      return `${(cx + Math.cos(a) * rr).toFixed(1)},${(cy + Math.sin(a) * rr).toFixed(1)}`
    }).join(' ')
    s += `<polygon points="${pts}" fill="${i < filled ? fill : empty}"/>`
  }
  return svgUri(s, w, h)
}

// 警告斜条（剧透预警条用）：平行四边形斜纹，颜色走 rgba 故不吃 token 预算
function hazard(w: number, h: number, fill: string, step = 56) {
  let s = ''
  for (let x = -h - step; x < w + step; x += step) s += `<path d="M${x} ${h} L${x + h} 0 L${x + h + step * 0.44} 0 L${x + step * 0.44} ${h} Z"/>`
  return svgUri(`<g fill="${fill}" opacity="0.45">${s}</g>`, w, h)
}

// 片单行工厂：编号 + 片名 + 元信息 + 类型胶囊 + 分隔线（9:16 清单用，保证 5 行几何完全一致）
function listRow(y: number, no: string, name: string, meta: string, genre: string, delay: number): any[] {
  return [
    { id: `wl-n${no}`, type: 'text', content: no, fontFamily: IMPACT, fontSize: 64, color: { $t: 'colors.accent' }, x: 72, y: y + 8, width: 130, height: 90, zIndex: 4, editable: { content: true } },
    { id: `wl-t${no}`, type: 'text', content: name, fontFamily: HEI, fontSize: 46, fontWeight: 700, color: { $t: 'colors.ink' }, x: 210, y: y + 4, width: 560, height: 66, zIndex: 4, editable: { content: true } },
    { id: `wl-m${no}`, type: 'text', content: meta, fontFamily: HEI, fontSize: 30, color: { $t: 'colors.dim' }, x: 210, y: y + 82, width: 580, height: 46, zIndex: 4, editable: { content: true } },
    { id: `wl-g${no}`, type: 'shape', shapeKind: 'rect', x: 812, y: y + 20, width: 196, height: 64, borderRadius: 999, border: { width: 3, color: { $t: 'colors.accent' } }, zIndex: 4, animation: { name: 'slideInRight', duration: 460, delay } },
    { id: `wl-gt${no}`, type: 'text', content: genre, fontFamily: HEI, fontSize: 26, fontWeight: 700, color: { $t: 'colors.accent' }, textAlign: 'center', x: 812, y: y + 34, width: 196, height: 40, zIndex: 5, editable: { content: true } },
    { id: `wl-r${no}`, type: 'shape', shapeKind: 'rect', x: 72, y: y + 160, width: 936, height: 3, fill: { $t: 'colors.dim' }, opacity: 0.32, zIndex: 3 }
  ]
}

export const filmTemplates: Template[] = [
  // 1. 影视解说封面 —— 纸面场刊 + 三行递进大字 + 剧照虚位 + 「深度」印章
  {
    id: 'film-recap-cover', name: '影视解说深度封面', version: '1.0.0', category: 'film',
    tags: ['film', 'recap', 'commentary', '16:9'],
    thumbnail: svgUri('<rect width="160" height="90" fill="%23F2EDE3"/><rect x="12" y="10" width="30" height="3.4" rx="1.7" fill="%23C8442B"/><text x="12" y="24" font-family="Consolas,monospace" font-size="6" fill="%238A7D6B" letter-spacing="1">DEEP</text><rect x="12" y="30" width="74" height="9" rx="1.5" fill="%231A1714"/><rect x="12" y="43" width="66" height="12" rx="1.5" fill="%231A1714"/><rect x="12" y="59" width="82" height="17" rx="1.5" fill="%23C8442B"/><rect x="98" y="26" width="50" height="44" rx="2" fill="none" stroke="%231A1714" stroke-width="1.4" stroke-dasharray="4 3"/><rect x="106" y="34" width="34" height="3" rx="1.5" fill="%231A1714" opacity="0.35"/><rect x="122" y="74" width="30" height="9" rx="4.5" fill="%23C8442B"/><circle cx="88" cy="76" r="10" fill="none" stroke="%23C8442B" stroke-width="2"/><text x="88" y="79" font-family="Songti SC,serif" font-size="9" fill="%23C8442B" text-anchor="middle">深</text>', 160, 90),
    tokens: {
      colors: {
        bg: { label: '纸色', default: '#F2EDE3', options: ['#F2EDE3', '#14131A', '#E4EDE9', '#E9EDF5'] },
        ink: { label: '主文字', default: '#1A1714', options: ['#1A1714', '#F5EFE2', '#14302A', '#16233F'] },
        accent: { label: '印章色', default: '#C8442B', options: ['#C8442B', '#D9A441', '#1F7A63', '#2E5AA8'] },
        dim: { label: '弱文字', default: '#8A7D6B', options: ['#8A7D6B', '#8B8899', '#6E8A83', '#7A869C'] }
      },
      fonts: { heading: { label: '标题字体', default: HEI, options: [HEI, SONG] } }
    },
    presets: [
      { name: '旧纸红印', colors: { bg: '#F2EDE3', ink: '#1A1714', accent: '#C8442B', dim: '#8A7D6B' } },
      { name: '夜场金字', colors: { bg: '#14131A', ink: '#F5EFE2', accent: '#D9A441', dim: '#8B8899' } },
      { name: '冷杉青', colors: { bg: '#E4EDE9', ink: '#14302A', accent: '#1F7A63', dim: '#6E8A83' } },
      { name: '墨蓝白', colors: { bg: '#E9EDF5', ink: '#16233F', accent: '#2E5AA8', dim: '#7A869C' } }
    ],
    canvas: { virtualWidth: 1920, virtualHeight: 1080, defaultWidth: 1920, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'rc-dots', type: 'image', src: dotsBg(1920, 1080, 54, 'rgba(127,127,127,0.14)'), x: 0, y: 0, width: 1920, height: 1080, objectFit: 'fill', zIndex: 1 },
      { id: 'rc-rule', type: 'shape', shapeKind: 'rect', x: 120, y: 60, width: 110, height: 8, borderRadius: 999, fill: { $t: 'colors.accent' }, zIndex: 3 },
      { id: 'rc-kicker', type: 'text', content: '深度解说 · 第 12 期', fontFamily: MONO, fontSize: 30, letterSpacing: 6, color: { $t: 'colors.dim' }, x: 120, y: 96, width: 760, height: 46, zIndex: 4, editable: { content: true } },
      { id: 'rc-t1', type: 'text', content: '三集弃剧的人说它烂', fontFamily: { $t: 'fonts.heading' }, fontSize: 76, fontWeight: 900, color: { $t: 'colors.ink' }, letterSpacing: 2, x: 120, y: 180, width: 980, height: 112, zIndex: 4, animation: { name: 'fadeInUp', duration: 480 }, editable: { content: true, fontSize: { type: 'range', min: 52, max: 104 } } },
      { id: 'rc-t2', type: 'text', content: '十集追平的人改口', fontFamily: { $t: 'fonts.heading' }, fontSize: 100, fontWeight: 900, color: { $t: 'colors.ink' }, letterSpacing: 2, x: 120, y: 300, width: 980, height: 140, zIndex: 4, animation: { name: 'fadeInUp', duration: 480, delay: 130 }, editable: { content: true } },
      { id: 'rc-t3', type: 'text', content: '它凭什么翻盘', fontFamily: { $t: 'fonts.heading' }, fontSize: 132, fontWeight: 900, color: { $t: 'colors.accent' }, letterSpacing: 3, lineHeight: 1.1, x: 120, y: 464, width: 980, height: 176, zIndex: 4, animation: { name: 'fadeInUp', duration: 520, delay: 260 }, editable: { content: true, fontSize: { type: 'range', min: 90, max: 160 } } },
      { id: 'rc-sub', type: 'text', content: '《江河日下》48 集全解 · 一刀未剪版', fontFamily: HEI, fontSize: 40, color: { $t: 'colors.ink' }, opacity: 0.88, x: 120, y: 660, width: 900, height: 66, zIndex: 4, editable: { content: true } },
      { id: 'rc-meta', type: 'text', content: '文案 8200 字 · 拉片 3 遍 · 参考资料 26 页', fontFamily: MONO, fontSize: 26, color: { $t: 'colors.dim' }, x: 120, y: 980, width: 900, height: 44, zIndex: 4, editable: { content: true } },
      { id: 'rc-slot', type: 'shape', shapeKind: 'rect', x: 1150, y: 180, width: 620, height: 640, borderRadius: 18, border: { width: 5, style: 'dashed', color: { $t: 'colors.ink' } }, opacity: 0.85, zIndex: 3 },
      { id: 'rc-slot-in', type: 'shape', shapeKind: 'rect', x: 1174, y: 204, width: 572, height: 592, borderRadius: 10, border: { width: 2, color: { $t: 'colors.ink' } }, opacity: 0.3, zIndex: 3 },
      { id: 'rc-slot-tip', type: 'text', content: '剧照虚位 · 拖图即换', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.dim' }, textAlign: 'center', x: 1150, y: 470, width: 620, height: 44, zIndex: 4, editable: { content: true } },
      { id: 'rc-slot-cap', type: 'text', content: '正片 03:12 处 · 全剧最狠的一帧', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.ink' }, opacity: 0.8, textAlign: 'center', x: 1150, y: 560, width: 620, height: 44, zIndex: 4, editable: { content: true } },
      { id: 'rc-lens', type: 'shape', shapeKind: 'circle', x: 1640, y: 660, width: 180, height: 180, border: { width: 6, color: { $t: 'colors.accent' } }, zIndex: 4, animation: { name: 'float', duration: 4200, iterationCount: 'infinite' } },
      { id: 'rc-dur', type: 'shape', shapeKind: 'rect', x: 1500, y: 96, width: 270, height: 64, borderRadius: 999, fill: { $t: 'colors.accent' }, zIndex: 4 },
      { id: 'rc-dur-t', type: 'text', content: '42:07', fontFamily: MONO, fontSize: 30, fontWeight: 700, color: { $t: 'colors.bg' }, textAlign: 'center', x: 1500, y: 112, width: 270, height: 44, zIndex: 5, editable: { content: true } },
      { id: 'rc-seal', type: 'shape', shapeKind: 'circle', x: 870, y: 700, width: 250, height: 250, border: { width: 10, color: { $t: 'colors.accent' } }, rotation: -12, zIndex: 6, animation: { name: 'zoomIn', duration: 420, delay: 340 } },
      { id: 'rc-seal-t', type: 'text', content: '深度', fontFamily: SONG, fontSize: 84, fontWeight: 700, color: { $t: 'colors.accent' }, textAlign: 'center', rotation: -12, x: 870, y: 762, width: 250, height: 120, zIndex: 7, editable: { content: true } },
      { id: 'rc-seal-s', type: 'text', content: 'DEEP DIVE', fontFamily: MONO, fontSize: 26, letterSpacing: 4, color: { $t: 'colors.accent' }, textAlign: 'center', rotation: -12, x: 870, y: 862, width: 250, height: 40, zIndex: 7 },
      { id: 'rc-arrow', type: 'text', content: '→', fontFamily: SANS, fontSize: 92, fontWeight: 700, color: { $t: 'colors.accent' }, x: 1030, y: 520, width: 100, height: 130, zIndex: 5, animation: { name: 'wobble', duration: 1600, iterationCount: 'infinite' } }
    ]
  },

  // 2. 追剧安利卡 —— 五星 + 一句话判词 + 剧名档期卡（浅底，与 6 号避雷卡成对）
  {
    id: 'film-binge-rec', name: '追剧安利五星卡', version: '1.0.0', category: 'film',
    tags: ['film', 'recommend', 'series', 'rating', '4:5'],
    thumbnail: svgUri('<rect width="160" height="200" fill="%23FFF3E2"/><rect x="10" y="10" width="140" height="180" rx="6" fill="none" stroke="%232A1B12" stroke-width="1" opacity="0.3"/><text x="14" y="30" font-family="Consolas,monospace" font-size="6" fill="%23A68B72">BINGE LOG</text><text x="14" y="52" font-family="Arial Black,sans-serif" font-size="14" fill="%23E8A317">★★★★★</text><text x="104" y="56" font-family="Impact,sans-serif" font-size="26" fill="%232A1B12">9.4</text><rect x="14" y="66" width="96" height="10" rx="2" fill="%232A1B12"/><rect x="14" y="82" width="80" height="10" rx="2" fill="%23F2542D"/><rect x="14" y="108" width="132" height="52" rx="6" fill="%232A1B12"/><rect x="22" y="120" width="60" height="8" rx="2" fill="%23FFF3E2"/><rect x="22" y="134" width="92" height="5" rx="2" fill="%23FFF3E2" opacity="0.55"/><rect x="96" y="118" width="42" height="14" rx="7" fill="none" stroke="%23FFF3E2" stroke-width="1"/><g fill="none" stroke="%23F2542D" stroke-width="1.2"><rect x="14" y="170" width="40" height="13" rx="6.5"/><rect x="60" y="170" width="40" height="13" rx="6.5"/><rect x="106" y="170" width="40" height="13" rx="6.5"/></g>', 160, 200),
    tokens: {
      colors: {
        bg: { label: '纸底', default: '#FFF3E2', options: ['#FFF3E2', '#FDE7EF', '#E9F3EC', '#EAEFFA'] },
        ink: { label: '主文字', default: '#2A1B12', options: ['#2A1B12', '#3A1420', '#14301F', '#16213B'] },
        accent: { label: '安利色', default: '#F2542D', options: ['#F2542D', '#E8447A', '#189A6C', '#3B6BD8'] },
        dim: { label: '弱文字', default: '#A68B72', options: ['#A68B72', '#B08A99', '#7C9488', '#8391AE'] }
      },
      fonts: { heading: { label: '判词字体', default: HEI, options: [HEI, SERIF] } }
    },
    presets: [
      { name: '奶油橘子', colors: { bg: '#FFF3E2', ink: '#2A1B12', accent: '#F2542D', dim: '#A68B72' } },
      { name: '蜜桃气泡', colors: { bg: '#FDE7EF', ink: '#3A1420', accent: '#E8447A', dim: '#B08A99' } },
      { name: '薄荷青柠', colors: { bg: '#E9F3EC', ink: '#14301F', accent: '#189A6C', dim: '#7C9488' } },
      { name: '海盐柠檬', colors: { bg: '#EAEFFA', ink: '#16213B', accent: '#3B6BD8', dim: '#8391AE' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'br-dots', type: 'image', src: dotsBg(1080, 1350, 52, 'rgba(0,0,0,0.05)'), x: 0, y: 0, width: 1080, height: 1350, objectFit: 'fill', zIndex: 1 },
      { id: 'br-frame', type: 'shape', shapeKind: 'rect', x: 64, y: 64, width: 952, height: 1222, borderRadius: 24, border: { width: 3, style: 'dashed', color: { $t: 'colors.ink' } }, opacity: 0.28, zIndex: 2 },
      { id: 'br-kicker', type: 'text', content: '追剧档案 · BINGE LOG Nº 07', fontFamily: MONO, fontSize: 26, letterSpacing: 5, color: { $t: 'colors.dim' }, x: 112, y: 118, width: 856, height: 44, zIndex: 4, animation: { name: 'fadeIn', duration: 460 }, editable: { content: true } },
      { id: 'br-stars', type: 'image', src: starRow(470, 96, 5, 5, '%23E8A317', 'rgba(0,0,0,0.12)'), x: 112, y: 250, width: 470, height: 96, objectFit: 'fill', zIndex: 4, animation: { name: 'twinkle', duration: 2800, iterationCount: 'infinite' } },
      { id: 'br-score', type: 'text', content: '9.4', fontFamily: IMPACT, fontSize: 170, color: { $t: 'colors.ink' }, x: 640, y: 204, width: 280, height: 240, zIndex: 4, animation: { name: 'zoomIn', duration: 460 }, editable: { content: true, fontSize: { type: 'range', min: 110, max: 210 } } },
      { id: 'br-score-unit', type: 'text', content: '/10', fontFamily: IMPACT, fontSize: 46, color: { $t: 'colors.accent' }, x: 930, y: 330, width: 86, height: 66, zIndex: 4, editable: { content: true } },
      { id: 'br-v1', type: 'text', content: '连追 24 集零弃剧', fontFamily: { $t: 'fonts.heading' }, fontSize: 92, fontWeight: 900, color: { $t: 'colors.ink' }, x: 112, y: 444, width: 856, height: 132, zIndex: 4, animation: { name: 'slideInLeft', duration: 520, delay: 120 }, editable: { content: true, fontSize: { type: 'range', min: 60, max: 108 } } },
      { id: 'br-v2', type: 'text', content: '今年最狠的下饭剧', fontFamily: { $t: 'fonts.heading' }, fontSize: 92, fontWeight: 900, color: { $t: 'colors.accent' }, x: 112, y: 584, width: 856, height: 132, zIndex: 4, animation: { name: 'slideInLeft', duration: 520, delay: 240 }, editable: { content: true } },
      { id: 'br-card', type: 'shape', shapeKind: 'rect', x: 112, y: 760, width: 856, height: 280, borderRadius: 20, fill: { $t: 'colors.ink' }, zIndex: 3, animation: { name: 'rise', duration: 560, delay: 320 } },
      { id: 'br-label', type: 'text', content: '剧名', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.bg' }, opacity: 0.72, x: 152, y: 796, width: 200, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'br-drama', type: 'text', content: '《长安的荔枝》', fontFamily: { $t: 'fonts.heading' }, fontSize: 72, fontWeight: 900, color: { $t: 'colors.bg' }, x: 152, y: 840, width: 580, height: 104, zIndex: 4, editable: { content: true } },
      { id: 'br-badge', type: 'shape', shapeKind: 'rect', x: 700, y: 800, width: 228, height: 76, borderRadius: 999, border: { width: 3, color: { $t: 'colors.bg' } }, zIndex: 4 },
      { id: 'br-badge-t', type: 'text', content: '五星安利', fontFamily: HEI, fontSize: 34, fontWeight: 700, color: { $t: 'colors.bg' }, textAlign: 'center', x: 700, y: 818, width: 228, height: 48, zIndex: 5, editable: { content: true } },
      { id: 'br-sched', type: 'text', content: '每晚 20:00 · 共 24 集 · 已更新至第 18 集', fontFamily: MONO, fontSize: 34, color: { $t: 'colors.bg' }, opacity: 0.85, x: 152, y: 960, width: 792, height: 50, zIndex: 4, editable: { content: true } },
      { id: 'br-tag1', group: 'br-tag', type: 'shape', shapeKind: 'rect', x: 112, y: 1092, width: 220, height: 68, borderRadius: 999, border: { width: 3, color: { $t: 'colors.accent' } }, zIndex: 4 },
      { id: 'br-tag1-t', type: 'text', content: '节奏飞快', fontFamily: HEI, fontSize: 34, color: { $t: 'colors.accent' }, textAlign: 'center', x: 112, y: 1108, width: 220, height: 48, zIndex: 5, editable: { content: true } },
      { id: 'br-tag2', group: 'br-tag', type: 'shape', shapeKind: 'rect', x: 352, y: 1092, width: 220, height: 68, borderRadius: 999, border: { width: 3, color: { $t: 'colors.accent' } }, zIndex: 4 },
      { id: 'br-tag2-t', type: 'text', content: '零注水', fontFamily: HEI, fontSize: 34, color: { $t: 'colors.accent' }, textAlign: 'center', x: 352, y: 1108, width: 220, height: 48, zIndex: 5, editable: { content: true } },
      { id: 'br-tag3', group: 'br-tag', type: 'shape', shapeKind: 'rect', x: 592, y: 1092, width: 220, height: 68, borderRadius: 999, border: { width: 3, color: { $t: 'colors.accent' } }, zIndex: 4 },
      { id: 'br-tag3-t', type: 'text', content: '全员演技', fontFamily: HEI, fontSize: 34, color: { $t: 'colors.accent' }, textAlign: 'center', x: 592, y: 1108, width: 220, height: 48, zIndex: 5, editable: { content: true } },
      { id: 'br-handle', type: 'text', content: '自来水 · 非商务 · 看完记得回来谢我', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.dim' }, x: 112, y: 1200, width: 856, height: 44, zIndex: 4, editable: { content: true } }
    ]
  },

  // 3. 补番片单清单 —— 5 行编号片单 + 类型胶囊 + CTA（9:16 竖刷）
  {
    id: 'film-watchlist', name: '补番片单清单', version: '1.0.0', category: 'film',
    tags: ['film', 'watchlist', 'list', '9:16'],
    thumbnail: svgUri('<rect width="160" height="284" fill="%231B2A6B"/><text x="12" y="20" font-family="Consolas,monospace" font-size="5.4" fill="%238E9BC7" letter-spacing="0.8">PERSONAL LIST 2026</text><rect x="12" y="28" width="58" height="11" rx="1.5" fill="%23F7F2E7"/><rect x="12" y="44" width="80" height="14" rx="1.5" fill="%23F7F2E7"/><rect x="12" y="66" width="30" height="3" rx="1.5" fill="%23F5C518"/><g><rect x="12" y="82" width="136" height="0.9" fill="%238E9BC7" opacity="0.4"/><text x="12" y="98" font-family="Impact,sans-serif" font-size="12" fill="%23F5C518">01</text><rect x="30" y="89" width="60" height="7" rx="1.5" fill="%23F7F2E7"/><rect x="30" y="99" width="40" height="4" rx="1" fill="%238E9BC7"/><rect x="118" y="88" width="30" height="12" rx="6" fill="none" stroke="%23F5C518" stroke-width="0.9"/></g><g><rect x="12" y="116" width="136" height="0.9" fill="%238E9BC7" opacity="0.4"/><text x="12" y="132" font-family="Impact,sans-serif" font-size="12" fill="%23F5C518">02</text><rect x="30" y="123" width="52" height="7" rx="1.5" fill="%23F7F2E7"/><rect x="30" y="133" width="44" height="4" rx="1" fill="%238E9BC7"/><rect x="118" y="122" width="30" height="12" rx="6" fill="none" stroke="%23F5C518" stroke-width="0.9"/></g><g><rect x="12" y="150" width="136" height="0.9" fill="%238E9BC7" opacity="0.4"/><text x="12" y="166" font-family="Impact,sans-serif" font-size="12" fill="%23F5C518">03</text><rect x="30" y="157" width="64" height="7" rx="1.5" fill="%23F7F2E7"/><rect x="30" y="167" width="38" height="4" rx="1" fill="%238E9BC7"/><rect x="118" y="156" width="30" height="12" rx="6" fill="none" stroke="%23F5C518" stroke-width="0.9"/></g><g><rect x="12" y="184" width="136" height="0.9" fill="%238E9BC7" opacity="0.4"/><text x="12" y="200" font-family="Impact,sans-serif" font-size="12" fill="%23F5C518">04</text><rect x="30" y="191" width="56" height="7" rx="1.5" fill="%23F7F2E7" opacity="0.7"/><rect x="118" y="190" width="30" height="12" rx="6" fill="none" stroke="%23F5C518" stroke-width="0.9"/></g><g><rect x="12" y="218" width="136" height="0.9" fill="%238E9BC7" opacity="0.4"/><text x="12" y="234" font-family="Impact,sans-serif" font-size="12" fill="%23F5C518">05</text><rect x="30" y="225" width="60" height="7" rx="1.5" fill="%23F7F2E7" opacity="0.7"/><rect x="118" y="224" width="30" height="12" rx="6" fill="none" stroke="%23F5C518" stroke-width="0.9"/></g><rect x="12" y="252" width="72" height="18" rx="9" fill="%23F5C518"/><rect x="124" y="248" width="24" height="24" rx="12" fill="none" stroke="%23F5C518" stroke-width="1.4"/>', 160, 284),
    tokens: {
      colors: {
        bg: { label: '底色', default: '#1B2A6B', options: ['#1B2A6B', '#12403A', '#5A1A2E', '#2A2118'] },
        ink: { label: '主文字', default: '#F7F2E7', options: ['#F7F2E7', '#EAF7F1', '#FBEAF0', '#F5EFE2'] },
        accent: { label: '强调色', default: '#F5C518', options: ['#F5C518', '#7BD88F', '#FF7A5C', '#D9A441'] },
        dim: { label: '弱文字', default: '#8E9BC7', options: ['#8E9BC7', '#7FB8A8', '#D39AAA', '#B0A290'] }
      },
      fonts: { heading: { label: '大标题字体', default: HEI, options: [HEI, IMPACT] } }
    },
    presets: [
      { name: '钴蓝黄', colors: { bg: '#1B2A6B', ink: '#F7F2E7', accent: '#F5C518', dim: '#8E9BC7' } },
      { name: '墨绿翠', colors: { bg: '#12403A', ink: '#EAF7F1', accent: '#7BD88F', dim: '#7FB8A8' } },
      { name: '酒红橘', colors: { bg: '#5A1A2E', ink: '#FBEAF0', accent: '#FF7A5C', dim: '#D39AAA' } },
      { name: '炭褐金', colors: { bg: '#2A2118', ink: '#F5EFE2', accent: '#D9A441', dim: '#B0A290' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1920, defaultWidth: 1080, defaultHeight: 1920, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'wl-dots', type: 'image', src: dotsBg(1080, 1920, 60, 'rgba(255,255,255,0.08)'), x: 0, y: 0, width: 1080, height: 1920, objectFit: 'fill', zIndex: 1 },
      { id: 'wl-kicker', type: 'text', content: 'PERSONAL LIST · 2026 春季补番', fontFamily: MONO, fontSize: 22, letterSpacing: 6, color: { $t: 'colors.dim' }, x: 72, y: 96, width: 936, height: 38, zIndex: 4, editable: { content: true } },
      { id: 'wl-blink', type: 'shape', shapeKind: 'rect', x: 966, y: 100, width: 42, height: 42, borderRadius: 8, fill: { $t: 'colors.accent' }, zIndex: 4, animation: { name: 'blink', duration: 1500, iterationCount: 'infinite' } },
      { id: 'wl-title', type: 'text', content: '这 5 部\n别再漏看', fontFamily: { $t: 'fonts.heading' }, fontSize: 120, fontWeight: 900, color: { $t: 'colors.ink' }, lineHeight: 1.16, x: 72, y: 150, width: 936, height: 310, zIndex: 4, animation: { name: 'zoomIn', duration: 520 }, editable: { content: true, fontSize: { type: 'range', min: 84, max: 140 } } },
      { id: 'wl-rule', type: 'shape', shapeKind: 'rect', x: 72, y: 470, width: 140, height: 9, borderRadius: 999, fill: { $t: 'colors.accent' }, zIndex: 4 },
      { id: 'wl-sub', type: 'text', content: '按这个顺序补，踩不了雷', fontFamily: HEI, fontSize: 34, color: { $t: 'colors.accent' }, letterSpacing: 2, x: 72, y: 506, width: 936, height: 56, zIndex: 4, animation: { name: 'fadeInUp', duration: 520, delay: 200 }, editable: { content: true } },
      ...listRow(600, '01', '《雾港回声》', '英剧 · 6 集 · 冷到骨头里', '悬疑', 0),
      ...listRow(810, '02', '《深夜编辑台》', '韩剧 · 12 集 · 笑着笑着就哭了', '职场', 120),
      ...listRow(1020, '03', '《第七号陪审员》', '美剧 · 8 集 · 庭审戏全程无尿点', '律政', 240),
      ...listRow(1230, '04', '《向北的风》', '国产剧 · 24 集 · 慢热，但后劲大', '年代', 360),
      ...listRow(1440, '05', '《零号病人》', '日剧 · 10 集 · 短得不够看', '科幻', 480),
      { id: 'wl-foot', type: 'text', content: '顺序按“能不能熬夜”排的，不服来辩', fontFamily: HEI, fontSize: 30, color: { $t: 'colors.ink' }, opacity: 0.85, x: 72, y: 1660, width: 936, height: 46, zIndex: 4, editable: { content: true } },
      { id: 'wl-cta', type: 'shape', shapeKind: 'rect', x: 72, y: 1736, width: 430, height: 92, borderRadius: 999, fill: { $t: 'colors.accent' }, zIndex: 4 },
      { id: 'wl-cta-t', type: 'text', content: '截图带走 · 每周五更', fontFamily: HEI, fontSize: 34, fontWeight: 700, color: { $t: 'colors.bg' }, textAlign: 'center', x: 72, y: 1760, width: 430, height: 48, zIndex: 5, editable: { content: true } },
      { id: 'wl-total', type: 'shape', shapeKind: 'circle', x: 808, y: 1690, width: 200, height: 200, border: { width: 6, color: { $t: 'colors.accent' } }, zIndex: 4, animation: { name: 'pulse', duration: 2600, iterationCount: 'infinite' } },
      { id: 'wl-total-t', type: 'text', content: '32 部', fontFamily: IMPACT, fontSize: 64, color: { $t: 'colors.accent' }, textAlign: 'center', x: 808, y: 1770, width: 200, height: 92, zIndex: 5, editable: { content: true } }
    ]
  },

  // 4. 电影台词海报 —— 中英双语 + 出处 + 大留白（3:4，纸质印刷感，不走暗场字幕那套）
  {
    id: 'film-quote-poster', name: '电影台词海报', version: '1.0.0', category: 'film',
    tags: ['film', 'quote', 'poster', 'bilingual', '3:4'],
    thumbnail: svgUri('<rect width="160" height="213" fill="%23F1EADD"/><text x="20" y="52" font-family="Songti SC,serif" font-size="34" fill="%231E1B16" opacity="0.18">「</text><text x="14" y="24" font-family="Consolas,monospace" font-size="5" fill="%238C857A" letter-spacing="1.4">LINE NO.07</text><rect x="70" y="32" width="20" height="1.6" fill="%23B4472F"/><rect x="30" y="66" width="100" height="7" rx="1.5" fill="%231E1B16"/><rect x="42" y="80" width="76" height="7" rx="1.5" fill="%231E1B16"/><rect x="40" y="100" width="80" height="3.4" rx="1" fill="%238C857A"/><rect x="52" y="108" width="56" height="3.4" rx="1" fill="%238C857A"/><text x="80" y="130" font-family="Songti SC,serif" font-size="7" fill="%23B4472F" text-anchor="middle">——《夏日借阅处》</text><rect x="36" y="144" width="88" height="0.9" fill="%238C857A" opacity="0.6"/><rect x="42" y="160" width="76" height="9" rx="1.5" fill="%231E1B16"/><rect x="50" y="176" width="60" height="4" rx="1" fill="%238C857A"/><text x="140" y="188" font-family="Songti SC,serif" font-size="30" fill="%231E1B16" opacity="0.16" text-anchor="end">」</text><rect x="40" y="196" width="80" height="0.9" fill="%238C857A" opacity="0.5"/>', 160, 213),
    tokens: {
      colors: {
        bg: { label: '纸色', default: '#F1EADD', options: ['#F1EADD', '#E4EBE8', '#EDE5EE', '#14161B'] },
        ink: { label: '主文字', default: '#1E1B16', options: ['#1E1B16', '#1C332E', '#2E2338', '#EFE9DC'] },
        accent: { label: '强调色', default: '#B4472F', options: ['#B4472F', '#2F7A6A', '#7A4E9B', '#D9A441'] },
        dim: { label: '弱文字', default: '#8C857A', options: ['#8C857A', '#7B8F89', '#8E8297', '#8A8E99'] }
      },
      fonts: { quote: { label: '台词字体', default: SONG, options: [SONG, SERIF, HEI] } }
    },
    presets: [
      { name: '旧信纸', colors: { bg: '#F1EADD', ink: '#1E1B16', accent: '#B4472F', dim: '#8C857A' } },
      { name: '雾青', colors: { bg: '#E4EBE8', ink: '#1C332E', accent: '#2F7A6A', dim: '#7B8F89' } },
      { name: '藕荷', colors: { bg: '#EDE5EE', ink: '#2E2338', accent: '#7A4E9B', dim: '#8E8297' } },
      { name: '夜航蓝', colors: { bg: '#14161B', ink: '#EFE9DC', accent: '#D9A441', dim: '#8A8E99' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1440, defaultWidth: 1080, defaultHeight: 1440, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'qt-dots', type: 'image', src: dotsBg(1080, 1440, 56, 'rgba(127,127,127,0.12)'), x: 0, y: 0, width: 1080, height: 1440, objectFit: 'fill', zIndex: 1 },
      { id: 'qt-mark', type: 'text', content: '「', fontFamily: SERIF, fontSize: 260, color: { $t: 'colors.dim' }, opacity: 0.22, x: 96, y: 170, width: 300, height: 372, zIndex: 2, animation: { name: 'drift', duration: 7000, iterationCount: 'infinite' } },
      { id: 'qt-mark2', type: 'text', content: '」', fontFamily: SERIF, fontSize: 260, color: { $t: 'colors.dim' }, opacity: 0.22, textAlign: 'right', x: 724, y: 940, width: 300, height: 372, zIndex: 2 },
      { id: 'qt-kicker', type: 'text', content: '台词手抄 · LINE Nº 07', fontFamily: MONO, fontSize: 26, letterSpacing: 8, color: { $t: 'colors.dim' }, textAlign: 'center', x: 110, y: 176, width: 860, height: 44, zIndex: 4, editable: { content: true } },
      { id: 'qt-rule', type: 'shape', shapeKind: 'rect', x: 490, y: 250, width: 100, height: 4, fill: { $t: 'colors.accent' }, zIndex: 4, animation: { name: 'fadeIn', duration: 600, delay: 200 } },
      { id: 'qt-zh', type: 'text', content: '别急着长大，\n大人也没什么了不起。', fontFamily: { $t: 'fonts.quote' }, fontSize: 68, fontWeight: 700, color: { $t: 'colors.ink' }, textAlign: 'center', lineHeight: 1.62, letterSpacing: 2, x: 110, y: 330, width: 860, height: 240, zIndex: 4, animation: { name: 'inkReveal', duration: 1200 }, editable: { content: true, fontSize: { type: 'range', min: 46, max: 84 } } },
      { id: 'qt-en', type: 'text', content: "Don't hurry up.\nGrown-ups are nothing special.", fontFamily: SANS, fontStyle: 'italic', fontSize: 34, color: { $t: 'colors.dim' }, textAlign: 'center', lineHeight: 1.5, x: 110, y: 600, width: 860, height: 115, zIndex: 4, animation: { name: 'fadeInUp', duration: 620, delay: 520 }, editable: { content: true } },
      { id: 'qt-src', type: 'text', content: '——《夏日借阅处》· 第 1 幕', fontFamily: HEI, fontSize: 30, color: { $t: 'colors.accent' }, textAlign: 'center', letterSpacing: 2, x: 110, y: 760, width: 860, height: 46, zIndex: 4, editable: { content: true } },
      { id: 'qt-note', type: 'text', content: '那天最后一排有个女生哭了，\n整场的呼吸都被这句话按住。', fontFamily: { $t: 'fonts.quote' }, fontSize: 26, color: { $t: 'colors.dim' }, textAlign: 'center', lineHeight: 1.7, x: 110, y: 866, width: 860, height: 150, zIndex: 4, editable: { content: true } },
      { id: 'qt-film', type: 'text', content: '《夏日借阅处》', fontFamily: { $t: 'fonts.quote' }, fontSize: 60, fontWeight: 900, color: { $t: 'colors.ink' }, textAlign: 'center', letterSpacing: 4, x: 110, y: 1060, width: 860, height: 90, zIndex: 4, animation: { name: 'rise', duration: 620, delay: 300 }, editable: { content: true, fontSize: { type: 'range', min: 40, max: 76 } } },
      { id: 'qt-meta', type: 'text', content: '2025 · 剧情 · 118 分钟 · 安静到发疼', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.dim' }, textAlign: 'center', letterSpacing: 3, x: 110, y: 1170, width: 860, height: 44, zIndex: 4, editable: { content: true } },
      { id: 'qt-rule2', type: 'shape', shapeKind: 'rect', x: 110, y: 1250, width: 860, height: 3, fill: { $t: 'colors.dim' }, opacity: 0.5, zIndex: 4 },
      { id: 'qt-foot', type: 'text', content: '抄于 2026.03.14 · 散场后的便利店', fontFamily: MONO, fontSize: 26, letterSpacing: 3, color: { $t: 'colors.dim' }, textAlign: 'center', x: 110, y: 1290, width: 860, height: 44, zIndex: 4, editable: { content: true } }
    ]
  },

  // 5. 分集速看进度卡 —— 进度条 + 剧透预警条 + 评分（1:1 播放器 UI）
  {
    id: 'film-episode-recap', name: '分集速看进度卡', version: '1.0.0', category: 'film',
    tags: ['film', 'episode', 'recap', 'progress', '1:1'],
    thumbnail: svgUri('<rect width="160" height="160" fill="%23EDEEF0"/><rect x="9" y="9" width="142" height="142" rx="6" fill="none" stroke="%236E737D" stroke-width="0.9" stroke-dasharray="3 2" opacity="0.6"/><text x="16" y="26" font-family="Consolas,monospace" font-size="6" fill="%232F6BFF">EP.07</text><circle cx="140" cy="22" r="4" fill="%232F6BFF"/><rect x="16" y="34" width="70" height="10" rx="2" fill="%2315171C"/><rect x="16" y="52" width="110" height="4" rx="2" fill="%2315171C" opacity="0.35"/><rect x="16" y="60" width="96" height="4" rx="2" fill="%2315171C" opacity="0.28"/><rect x="16" y="76" width="128" height="5" rx="2.5" fill="%2315171C" opacity="0.14"/><rect x="16" y="76" width="56" height="5" rx="2.5" fill="%232F6BFF"/><circle cx="72" cy="78.5" r="5.4" fill="%232F6BFF"/><rect x="16" y="90" width="128" height="20" rx="3" fill="%23F5C518"/><rect x="24" y="97" width="70" height="6" rx="1.5" fill="%2315171C" opacity="0.75"/><text x="16" y="132" font-family="Impact,sans-serif" font-size="24" fill="%2315171C">8.4</text><text x="112" y="130" font-family="Arial Black,sans-serif" font-size="11" fill="%23E8A317">★★★★☆</text><rect x="60" y="140" width="84" height="3" rx="1.5" fill="%236E737D" opacity="0.5"/>', 160, 160),
    tokens: {
      colors: {
        bg: { label: '屏幕底', default: '#EDEEF0', options: ['#EDEEF0', '#F1EFF8', '#E9F1EC', '#F7EFE7'] },
        ink: { label: '主文字', default: '#15171C', options: ['#15171C', '#1E1A2E', '#14281E', '#2A1A10'] },
        accent: { label: '进度色', default: '#2F6BFF', options: ['#2F6BFF', '#7C3AED', '#14805A', '#D9480F'] },
        warn: { label: '预警条', default: '#F5C518', options: ['#F5C518', '#FFD166', '#E9C46A', '#F7B32B'] },
        dim: { label: '弱文字', default: '#6E737D', options: ['#6E737D', '#767091', '#6D8878', '#96806E'] }
      },
      fonts: { heading: { label: '标题字体', default: HEI, options: [HEI, IMPACT] } }
    },
    presets: [
      { name: '待机灰', colors: { bg: '#EDEEF0', ink: '#15171C', accent: '#2F6BFF', warn: '#F5C518', dim: '#6E737D' } },
      { name: '冷紫', colors: { bg: '#F1EFF8', ink: '#1E1A2E', accent: '#7C3AED', warn: '#FFD166', dim: '#767091' } },
      { name: '苔绿', colors: { bg: '#E9F1EC', ink: '#14281E', accent: '#14805A', warn: '#E9C46A', dim: '#6D8878' } },
      { name: '落日橙', colors: { bg: '#F7EFE7', ink: '#2A1A10', accent: '#D9480F', warn: '#F7B32B', dim: '#96806E' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1080, defaultWidth: 1080, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'ep-dots', type: 'image', src: dotsBg(1080, 1080, 50, 'rgba(0,0,0,0.05)'), x: 0, y: 0, width: 1080, height: 1080, objectFit: 'fill', zIndex: 1 },
      { id: 'ep-frame', type: 'shape', shapeKind: 'rect', x: 64, y: 64, width: 952, height: 952, borderRadius: 20, border: { width: 3, style: 'dashed', color: { $t: 'colors.dim' } }, opacity: 0.55, zIndex: 2 },
      { id: 'ep-kicker', type: 'text', content: 'EP.07 · 三分钟速看', fontFamily: MONO, fontSize: 26, letterSpacing: 6, color: { $t: 'colors.accent' }, x: 112, y: 110, width: 700, height: 42, zIndex: 4, editable: { content: true } },
      { id: 'ep-live', type: 'shape', shapeKind: 'circle', x: 936, y: 110, width: 32, height: 32, fill: { $t: 'colors.accent' }, zIndex: 4, animation: { name: 'blink', duration: 1400, iterationCount: 'infinite' } },
      { id: 'ep-title', type: 'text', content: '《暗涌》第 7 集', fontFamily: { $t: 'fonts.heading' }, fontSize: 72, fontWeight: 900, color: { $t: 'colors.ink' }, x: 112, y: 160, width: 800, height: 104, zIndex: 4, animation: { name: 'fadeInUp', duration: 480 }, editable: { content: true, fontSize: { type: 'range', min: 48, max: 88 } } },
      { id: 'ep-rule', type: 'shape', shapeKind: 'rect', x: 112, y: 286, width: 120, height: 7, borderRadius: 999, fill: { $t: 'colors.accent' }, zIndex: 4 },
      { id: 'ep-points', type: 'text', content: '· 开场第一分钟，卧底身份就漏了\n· 反派那场哭戏，比主角真十倍\n· 结尾那通电话，留到第 8 集', fontFamily: HEI, fontSize: 36, color: { $t: 'colors.ink' }, lineHeight: 1.55, x: 112, y: 316, width: 800, height: 180, zIndex: 4, editable: { content: true } },
      { id: 'ep-track', type: 'shape', shapeKind: 'rect', x: 112, y: 540, width: 856, height: 16, borderRadius: 999, fill: 'rgba(0,0,0,0.12)', zIndex: 4 },
      { id: 'ep-played', type: 'shape', shapeKind: 'rect', x: 112, y: 540, width: 390, height: 16, borderRadius: 999, fill: { $t: 'colors.accent' }, zIndex: 5, animation: { name: 'slideInLeft', duration: 620 } },
      { id: 'ep-head', type: 'shape', shapeKind: 'circle', x: 478, y: 524, width: 48, height: 48, fill: { $t: 'colors.accent' }, zIndex: 6, animation: { name: 'pulse', duration: 2200, iterationCount: 'infinite' } },
      { id: 'ep-time-a', type: 'text', content: '12:48', fontFamily: MONO, fontSize: 30, color: { $t: 'colors.dim' }, x: 112, y: 584, width: 200, height: 44, zIndex: 4, editable: { content: true } },
      { id: 'ep-time-b', type: 'text', content: '45:00', fontFamily: MONO, fontSize: 30, color: { $t: 'colors.dim' }, textAlign: 'right', x: 620, y: 584, width: 348, height: 44, zIndex: 4, editable: { content: true } },
      { id: 'ep-warn', type: 'shape', shapeKind: 'rect', x: 112, y: 666, width: 856, height: 104, borderRadius: 12, fill: { $t: 'colors.warn' }, zIndex: 4, animation: { name: 'slideInRight', duration: 540, delay: 200 } },
      { id: 'ep-warn-stripes', type: 'image', src: hazard(856, 104, 'rgba(0,0,0,0.16)'), x: 112, y: 666, width: 856, height: 104, objectFit: 'fill', zIndex: 5 },
      { id: 'ep-warn-t', type: 'text', content: '剧透预警 · 没看完原片别点', fontFamily: { $t: 'fonts.heading' }, fontSize: 44, fontWeight: 900, color: { $t: 'colors.ink' }, textAlign: 'center', letterSpacing: 2, x: 112, y: 694, width: 856, height: 64, zIndex: 6, editable: { content: true } },
      { id: 'ep-score', type: 'text', content: '8.4', fontFamily: IMPACT, fontSize: 120, color: { $t: 'colors.ink' }, x: 112, y: 800, width: 240, height: 170, zIndex: 4, animation: { name: 'zoomIn', duration: 460, delay: 320 }, editable: { content: true, fontSize: { type: 'range', min: 80, max: 160 } } },
      { id: 'ep-score-cap', type: 'text', content: '/10 · 本台意见', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.dim' }, x: 364, y: 806, width: 360, height: 44, zIndex: 4, editable: { content: true } },
      { id: 'ep-stars', type: 'image', src: starRow(440, 88, 5, 4, '%23E8A317', 'rgba(0,0,0,0.14)'), x: 364, y: 866, width: 440, height: 88, objectFit: 'fill', zIndex: 4, animation: { name: 'twinkle', duration: 2600, iterationCount: 'infinite' } },
      { id: 'ep-foot', type: 'text', content: '原片更长，但这 3 分钟值回票价', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.dim' }, textAlign: 'right', x: 340, y: 954, width: 628, height: 44, zIndex: 4, editable: { content: true } }
    ]
  },

  // 6. 避雷差评卡 —— 大叉 + 低分 + 吐槽金句（安利卡的暗色双胞胎）
  {
    id: 'film-flop-alert', name: '避雷差评劝退卡', version: '1.0.0', category: 'film',
    tags: ['film', 'review', 'warning', '16:9'],
    thumbnail: svgUri('<rect width="160" height="90" fill="%2314121A"/><text x="118" y="78" font-family="PingFang SC,sans-serif" font-size="70" fill="%23F3EFE6" opacity="0.06">弃</text><g stroke="%23E23B4E" stroke-width="7" stroke-linecap="round"><path d="M120 22 L158 60"/><path d="M158 22 L120 60"/></g><text x="139" y="86" font-family="Impact,sans-serif" font-size="22" fill="%23E23B4E" text-anchor="middle">2.8</text><text x="10" y="16" font-family="Consolas,monospace" font-size="5" fill="%23E23B4E" letter-spacing="1">AVOID LIST</text><rect x="10" y="24" width="52" height="7" rx="1.5" fill="%23F3EFE6"/><rect x="10" y="36" width="66" height="9" rx="1.5" fill="%23F3EFE6"/><rect x="10" y="50" width="74" height="12" rx="1.5" fill="%23E23B4E"/><rect x="10" y="68" width="90" height="16" rx="3" fill="%23FFFFFF" opacity="0.07"/><rect x="14" y="72" width="56" height="5" rx="1" fill="%23F3EFE6" opacity="0.8"/><rect x="14" y="79" width="40" height="3" rx="1" fill="%238A8598"/><rect x="14" y="74" width="58" height="1.6" fill="%23E23B4E"/>', 160, 90),
    tokens: {
      colors: {
        bg: { label: '底色', default: '#14121A', options: ['#14121A', '#101720', '#101A14', '#1A1013'] },
        ink: { label: '主文字', default: '#F3EFE6', options: ['#F3EFE6', '#E8F1F7', '#E9F5EC', '#F7E9EC'] },
        accent: { label: '差评红', default: '#E23B4E', options: ['#E23B4E', '#FF6B35', '#8CE05A', '#F2545B'] },
        dim: { label: '弱文字', default: '#8A8598', options: ['#8A8598', '#7F93A3', '#8AA795', '#A3838A'] }
      },
      fonts: { heading: { label: '标题字体', default: HEI, options: [HEI, IMPACT] } }
    },
    presets: [
      { name: '冷场黑', colors: { bg: '#14121A', ink: '#F3EFE6', accent: '#E23B4E', dim: '#8A8598' } },
      { name: '深夜蓝', colors: { bg: '#101720', ink: '#E8F1F7', accent: '#FF6B35', dim: '#7F93A3' } },
      { name: '毒藤绿', colors: { bg: '#101A14', ink: '#E9F5EC', accent: '#8CE05A', dim: '#8AA795' } },
      { name: '酒红夜', colors: { bg: '#1A1013', ink: '#F7E9EC', accent: '#F2545B', dim: '#A3838A' } }
    ],
    canvas: { virtualWidth: 1920, virtualHeight: 1080, defaultWidth: 1920, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'fl-hatch', type: 'image', src: hatchBg(1920, 1080, 30, 'rgba(255,255,255,0.05)'), x: 0, y: 0, width: 1920, height: 1080, objectFit: 'fill', zIndex: 1 },
      { id: 'fl-ghost', type: 'text', content: '弃', fontFamily: { $t: 'fonts.heading' }, fontSize: 680, fontWeight: 900, color: { $t: 'colors.ink' }, opacity: 0.05, textAlign: 'center', x: 1080, y: 60, width: 762, height: 952, zIndex: 2, animation: { name: 'drift', duration: 8000, iterationCount: 'infinite' } },
      { id: 'fl-kicker', type: 'text', content: 'AVOID LIST · 避雷实录 Nº 05', fontFamily: MONO, fontSize: 26, letterSpacing: 6, color: { $t: 'colors.accent' }, x: 120, y: 100, width: 900, height: 44, zIndex: 4, editable: { content: true } },
      { id: 'fl-l1', type: 'text', content: '全员加滤镜', fontFamily: { $t: 'fonts.heading' }, fontSize: 88, fontWeight: 900, color: { $t: 'colors.ink' }, letterSpacing: 3, x: 120, y: 170, width: 980, height: 132, zIndex: 4, animation: { name: 'slideInLeft', duration: 480 }, editable: { content: true, fontSize: { type: 'range', min: 60, max: 110 } } },
      { id: 'fl-l2', type: 'text', content: '编剧没带脑子', fontFamily: { $t: 'fonts.heading' }, fontSize: 116, fontWeight: 900, color: { $t: 'colors.ink' }, letterSpacing: 3, x: 120, y: 318, width: 980, height: 164, zIndex: 4, animation: { name: 'slideInLeft', duration: 480, delay: 130 }, editable: { content: true } },
      { id: 'fl-l3', type: 'text', content: '但带了 KPI', fontFamily: { $t: 'fonts.heading' }, fontSize: 148, fontWeight: 900, color: { $t: 'colors.accent' }, letterSpacing: 2, x: 120, y: 500, width: 980, height: 210, zIndex: 4, animation: { name: 'slideInLeft', duration: 520, delay: 260 }, editable: { content: true, fontSize: { type: 'range', min: 100, max: 170 } } },
      { id: 'fl-sub', type: 'text', content: '60 集追到弃剧，最心疼的是我自己的 60 小时', fontFamily: HEI, fontSize: 34, color: { $t: 'colors.ink' }, opacity: 0.85, x: 120, y: 730, width: 980, height: 56, zIndex: 4, editable: { content: true } },
      { id: 'fl-card', type: 'shape', shapeKind: 'rect', x: 120, y: 800, width: 880, height: 170, borderRadius: 16, fill: 'rgba(255,255,255,0.06)', border: { width: 2, color: { $t: 'colors.dim' } }, zIndex: 3 },
      { id: 'fl-card-t', type: 'text', content: '被避雷 ·《雾港谜案 第三季》', fontFamily: HEI, fontSize: 40, fontWeight: 700, color: { $t: 'colors.ink' }, x: 160, y: 830, width: 760, height: 56, zIndex: 4, editable: { content: true } },
      { id: 'fl-strike', type: 'shape', shapeKind: 'rect', x: 160, y: 856, width: 540, height: 8, borderRadius: 999, fill: { $t: 'colors.accent' }, rotation: -1.5, zIndex: 5, animation: { name: 'slideInLeft', duration: 520, delay: 420 } },
      { id: 'fl-card-s', type: 'text', content: '播出 18 天 · 我撑到第 2 集 · 滤镜两星，剧情零星', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.dim' }, x: 160, y: 900, width: 760, height: 44, zIndex: 4, editable: { content: true } },
      { id: 'fl-x1', type: 'shape', shapeKind: 'rect', x: 1290, y: 306, width: 420, height: 68, borderRadius: 34, fill: { $t: 'colors.accent' }, rotation: 45, zIndex: 6, animation: { name: 'zoomIn', duration: 460 } },
      { id: 'fl-x2', type: 'shape', shapeKind: 'rect', x: 1290, y: 306, width: 420, height: 68, borderRadius: 34, fill: { $t: 'colors.accent' }, rotation: -45, zIndex: 6, animation: { name: 'zoomIn', duration: 460, delay: 140 } },
      { id: 'fl-score', type: 'text', content: '2.8', fontFamily: IMPACT, fontSize: 220, color: { $t: 'colors.accent' }, textAlign: 'center', x: 1160, y: 560, width: 680, height: 310, zIndex: 5, animation: { name: 'rise', duration: 560, delay: 280 }, editable: { content: true, fontSize: { type: 'range', min: 140, max: 260 } } },
      { id: 'fl-score-cap', type: 'text', content: '/10 · 我给的，不服来辩', fontFamily: HEI, fontSize: 30, color: { $t: 'colors.dim' }, textAlign: 'center', x: 1160, y: 830, width: 680, height: 46, zIndex: 5, editable: { content: true } },
      { id: 'fl-track', type: 'shape', shapeKind: 'rect', x: 1160, y: 910, width: 680, height: 18, borderRadius: 999, fill: 'rgba(255,255,255,0.14)', zIndex: 5 },
      { id: 'fl-bar', type: 'shape', shapeKind: 'rect', x: 1160, y: 910, width: 190, height: 18, borderRadius: 999, fill: { $t: 'colors.accent' }, zIndex: 6, animation: { name: 'slideInLeft', duration: 620, delay: 420 } },
      { id: 'fl-foot', type: 'text', content: '评论区聊聊你今年最冤的一次追剧', fontFamily: HEI, fontSize: 30, color: { $t: 'colors.dim' }, x: 120, y: 1000, width: 880, height: 44, zIndex: 4, editable: { content: true } }
    ]
  }
]

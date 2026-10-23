// src/core/templates/sale/sale-promo.ts —— 促销·电商大类第一批（6 个高频场景 · 覆盖 16:9 / 4:5 / 1:1 / 9:16 / 3:4）
// 口径：大促横幅 / 直播预告 / 拼单券 / 卖点长图 / 战报 / 新品发售预告；颜色全走 token，每个 4 套预设。
import type { Template } from '@/types/types'
import { HEI, SONG, IMPACT, MONO, SANS, SERIF, halftone, star, starfield } from '../_fx/trend'
import { svgUri } from '../_fx/common'

// 放射速度线：从画布中心发散的楔形，颜色一律 rgba 以透出底色 token
function rays(w: number, h: number, n: number, fill: string) {
  const cx = w / 2, cy = h / 2, R = Math.hypot(w, h)
  let s = ''
  for (let i = 0; i < n; i++) {
    const a0 = (i / n) * Math.PI * 2, a1 = a0 + (Math.PI / n) * 0.8
    s += `<path d="M${cx} ${cy} L${(cx + Math.cos(a0) * R).toFixed(1)} ${(cy + Math.sin(a0) * R).toFixed(1)} L${(cx + Math.cos(a1) * R).toFixed(1)} ${(cy + Math.sin(a1) * R).toFixed(1)} Z" fill="${fill}"/>`
  }
  return svgUri(s, w, h)
}
// 竖向齿孔虚线（票券撕口）
function dashV(h: number, stroke: string, w = 10, dash = 16) {
  return svgUri(`<line x1="${w / 2}" y1="0" x2="${w / 2}" y2="${h}" stroke="${stroke}" stroke-width="${w - 4}" stroke-dasharray="${dash} ${dash}" stroke-linecap="round"/>`, w, h)
}
// 增长折线：vals 取 0~1，面积 + 折线 + 节点
function growth(w: number, h: number, vals: number[], stroke: string, area: string) {
  const n = vals.length
  const px = (i: number) => 14 + (i * (w - 28)) / (n - 1)
  const py = (v: number) => h - 34 - v * (h - 70)
  const line = vals.map((v, i) => `${i ? 'L' : 'M'}${px(i).toFixed(1)} ${py(v).toFixed(1)}`).join(' ')
  let s = `<path d="${line} L${px(n - 1).toFixed(1)} ${h - 34} L${px(0).toFixed(1)} ${h - 34} Z" fill="${area}"/>`
  s += `<path d="${line}" fill="none" stroke="${stroke}" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"/>`
  vals.forEach((v, i) => { s += `<circle cx="${px(i).toFixed(1)}" cy="${py(v).toFixed(1)}" r="8" fill="${stroke}"/>` })
  s += `<line x1="14" y1="${h - 34}" x2="${w - 14}" y2="${h - 34}" stroke="${stroke}" stroke-width="2" opacity="0.35"/>`
  return svgUri(s, w, h)
}
// 假二维码：定位角 + 伪随机模块（固定种子，渲染稳定）
function qrMock(size: number, cell: number, dark: string) {
  const n = Math.floor(size / cell)
  let x = 20260328, s = ''
  const rnd = () => { x = (x * 1103515245 + 12345) & 0x7fffffff; return x }
  const finder = (fx: number, fy: number) =>
    `<rect x="${fx}" y="${fy}" width="${cell * 7}" height="${cell * 7}" fill="${dark}"/><rect x="${fx + cell}" y="${fy + cell}" width="${cell * 5}" height="${cell * 5}" fill="%23FFFFFF"/><rect x="${fx + cell * 2}" y="${fy + cell * 2}" width="${cell * 3}" height="${cell * 3}" fill="${dark}"/>`
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) {
    const inFinder = (r < 8 && c < 8) || (r < 8 && c > n - 9) || (r > n - 9 && c < 8)
    if (!inFinder && rnd() % 100 < 44) s += `<rect x="${c * cell}" y="${r * cell}" width="${cell}" height="${cell}" fill="${dark}"/>`
  }
  return svgUri(s + finder(0, 0) + finder((n - 7) * cell, 0) + finder(0, (n - 7) * cell), size, size)
}
// 价签爆炸贴：12 齿polygon
function burst(size: number, fill: string) {
  const pts = Array.from({ length: 24 }, (_, i) => {
    const a = (i * Math.PI) / 12, r = i % 2 ? size * 0.34 : size * 0.5
    return `${(size / 2 + Math.cos(a) * r).toFixed(1)},${(size / 2 + Math.sin(a) * r).toFixed(1)}`
  }).join(' ')
  return svgUri(`<polygon points="${pts}" fill="${fill}"/>`, size, size)
}

export const saleTemplates: Template[] = [
  // 1. 大促主视觉横幅 —— 红橙冲击底 + 巨大折扣数字爆炸贴 + 倒计时三连盒（16:9）
  {
    id: 'sale-big-promo', name: '大促主视觉横幅', version: '1.0.0', category: 'sale',
    tags: ['sale', 'big-promo', 'banner', 'countdown', '16:9'],
    thumbnail: svgUri('<rect width="160" height="90" fill="%23C4122F"/><g stroke="%23FFFFFF" stroke-opacity="0.07" stroke-width="6"><path d="M80 45 L0 6"/><path d="M80 45 L0 45"/><path d="M80 45 L0 84"/><path d="M80 45 L160 6"/><path d="M80 45 L160 45"/><path d="M80 45 L160 84"/></g><rect x="104" y="14" width="48" height="48" rx="6" fill="%23FFD23F" transform="rotate(-5 128 38)"/><text x="128" y="50" font-family="Impact,sans-serif" font-size="30" fill="%237A0A20" text-anchor="middle">2</text><rect x="12" y="16" width="40" height="10" rx="5" fill="%23FFD23F"/><rect x="12" y="34" width="74" height="10" rx="2" fill="%23FFF3E0"/><rect x="12" y="48" width="60" height="10" rx="2" fill="%23FFF3E0" opacity="0.75"/><g fill="%237A0A20"><rect x="12" y="68" width="16" height="12" rx="3"/><rect x="32" y="68" width="16" height="12" rx="3"/><rect x="52" y="68" width="16" height="12" rx="3"/></g><rect x="78" y="30" width="18" height="6" rx="3" fill="%23FFF3E0" opacity="0.5"/>', 160, 90),
    tokens: {
      colors: {
        bg: { label: '底色', default: '#C4122F', options: ['#C4122F', '#EF4A18', '#9E0F2C', '#E0215A'] },
        ink: { label: '主文字', default: '#FFF3E0', options: ['#FFF3E0', '#FFF8E7', '#FFEDEE', '#FFF1E0'] },
        accent: { label: '价签黄', default: '#FFD23F', options: ['#FFD23F', '#FFE87A', '#FFB020', '#FFDAB0'] },
        deep: { label: '深色块', default: '#7A0A20', options: ['#7A0A20', '#8C3410', '#4E0A1B', '#8A0E46'] }
      },
      fonts: { heading: { label: '标题字体', default: HEI, options: [HEI, IMPACT] } }
    },
    presets: [
      { name: '新年红爆', colors: { bg: '#C4122F', ink: '#FFF3E0', accent: '#FFD23F', deep: '#7A0A20' } },
      { name: '橙意十足', colors: { bg: '#EF4A18', ink: '#FFF8E7', accent: '#FFE87A', deep: '#8C3410' } },
      { name: '暗夜酒红', colors: { bg: '#9E0F2C', ink: '#FFEDEE', accent: '#FFB020', deep: '#4E0A1B' } },
      { name: '莓果桃气', colors: { bg: '#E0215A', ink: '#FFF1E0', accent: '#FFDAB0', deep: '#8A0E46' } }
    ],
    canvas: { virtualWidth: 1920, virtualHeight: 1080, defaultWidth: 1920, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'bp-rays', type: 'image', src: rays(1920, 1080, 30, 'rgba(0,0,0,0.10)'), x: 0, y: 0, width: 1920, height: 1080, objectFit: 'fill', zIndex: 1 },
      { id: 'bp-dots', type: 'image', src: halftone(1920, 1080, 3, 72, 'rgba(255,255,255,0.09)'), x: 0, y: 0, width: 1920, height: 1080, objectFit: 'fill', zIndex: 1 },
      { id: 'bp-kicker', type: 'shape', shapeKind: 'rect', x: 120, y: 96, width: 330, height: 62, borderRadius: 999, fill: { $t: 'colors.accent' }, zIndex: 3 },
      { id: 'bp-kicker-t', type: 'text', content: '全年最大的一波', fontFamily: HEI, fontSize: 30, fontWeight: 700, color: { $t: 'colors.deep' }, textAlign: 'center', x: 120, y: 108, width: 330, height: 42, zIndex: 4, editable: { content: true } },
      { id: 'bp-h1', type: 'text', content: '别再攒购物车', fontFamily: { $t: 'fonts.heading' }, fontSize: 122, fontWeight: 900, color: { $t: 'colors.ink' }, letterSpacing: 2, x: 120, y: 200, width: 880, height: 172, zIndex: 4, animation: { name: 'slideInLeft', duration: 480 }, editable: { content: true, fontSize: { type: 'range', min: 80, max: 150 } } },
      { id: 'bp-h2', type: 'text', content: '今晚直接掀底价', fontFamily: { $t: 'fonts.heading' }, fontSize: 122, fontWeight: 900, color: { $t: 'colors.accent' }, letterSpacing: 2, x: 120, y: 396, width: 980, height: 172, zIndex: 4, animation: { name: 'slideInLeft', duration: 480, delay: 130 }, editable: { content: true, fontSize: { type: 'range', min: 80, max: 150 } } },
      { id: 'bp-sub', type: 'text', content: '跨店每满 300 减 50 · 上不封顶（钱包下封顶）', fontFamily: HEI, fontSize: 36, color: { $t: 'colors.ink' }, opacity: 0.92, x: 120, y: 600, width: 900, height: 60, zIndex: 4, animation: { name: 'fadeInUp', duration: 460, delay: 260 }, editable: { content: true } },
      { id: 'bp-cd-cap', type: 'text', content: '距本场结束', fontFamily: HEI, fontSize: 30, fontWeight: 700, color: { $t: 'colors.ink' }, opacity: 0.8, x: 120, y: 700, width: 280, height: 46, zIndex: 4, editable: { content: true } },
      { id: 'bp-cd-1', group: 'bp-cd-', type: 'shape', shapeKind: 'rect', x: 120, y: 766, width: 112, height: 112, borderRadius: 18, fill: { $t: 'colors.deep' }, zIndex: 3 },
      { id: 'bp-cd-2', group: 'bp-cd-', type: 'shape', shapeKind: 'rect', x: 306, y: 766, width: 112, height: 112, borderRadius: 18, fill: { $t: 'colors.deep' }, zIndex: 3 },
      { id: 'bp-cd-3', group: 'bp-cd-', type: 'shape', shapeKind: 'rect', x: 492, y: 766, width: 112, height: 112, borderRadius: 18, fill: { $t: 'colors.deep' }, zIndex: 3 },
      { id: 'bp-cd-t1', type: 'text', content: '02', fontFamily: IMPACT, fontSize: 64, color: { $t: 'colors.ink' }, textAlign: 'center', x: 120, y: 776, width: 112, height: 92, zIndex: 4, editable: { content: true } },
      { id: 'bp-cd-t2', type: 'text', content: '47', fontFamily: IMPACT, fontSize: 64, color: { $t: 'colors.ink' }, textAlign: 'center', x: 306, y: 776, width: 112, height: 92, zIndex: 4, editable: { content: true } },
      { id: 'bp-cd-t3', type: 'text', content: '13', fontFamily: IMPACT, fontSize: 64, color: { $t: 'colors.accent' }, textAlign: 'center', x: 492, y: 776, width: 112, height: 92, zIndex: 4, editable: { content: true } },
      { id: 'bp-cd-c1', type: 'text', content: ':', fontFamily: IMPACT, fontSize: 64, color: { $t: 'colors.ink' }, opacity: 0.75, textAlign: 'center', x: 236, y: 776, width: 66, height: 92, zIndex: 4, animation: { name: 'blink', duration: 1000, iterationCount: 'infinite' } },
      { id: 'bp-cd-c2', type: 'text', content: ':', fontFamily: IMPACT, fontSize: 64, color: { $t: 'colors.ink' }, opacity: 0.75, textAlign: 'center', x: 422, y: 776, width: 66, height: 92, zIndex: 4, animation: { name: 'blink', duration: 1000, delay: 500, iterationCount: 'infinite' } },
      { id: 'bp-cd-l1', type: 'text', content: '时', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.ink' }, opacity: 0.7, textAlign: 'center', x: 120, y: 890, width: 112, height: 42, zIndex: 4 },
      { id: 'bp-cd-l2', type: 'text', content: '分', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.ink' }, opacity: 0.7, textAlign: 'center', x: 306, y: 890, width: 112, height: 42, zIndex: 4 },
      { id: 'bp-cd-l3', type: 'text', content: '秒', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.ink' }, opacity: 0.7, textAlign: 'center', x: 492, y: 890, width: 112, height: 42, zIndex: 4 },
      { id: 'bp-foot', type: 'text', content: '库存 2000 件 · 抢完即止（真不补，别问）', fontFamily: HEI, fontSize: 36, color: { $t: 'colors.ink' }, opacity: 0.85, x: 120, y: 956, width: 820, height: 60, zIndex: 4, editable: { content: true } },
      { id: 'bp-tag', type: 'shape', shapeKind: 'rect', x: 1120, y: 140, width: 620, height: 620, borderRadius: 44, fill: { $t: 'colors.accent' }, rotation: -5, zIndex: 3, animation: { name: 'wobble', duration: 2400, iterationCount: 'infinite' } },
      { id: 'bp-tag-hi', type: 'shape', shapeKind: 'rect', x: 1148, y: 168, width: 564, height: 564, borderRadius: 32, border: { width: 5, style: 'dashed', color: { $t: 'colors.deep' } }, opacity: 0.55, rotation: -5, zIndex: 4 },
      { id: 'bp-hole', type: 'shape', shapeKind: 'circle', x: 1160, y: 176, width: 46, height: 46, fill: { $t: 'colors.bg' }, zIndex: 5 },
      { id: 'bp-num', type: 'text', content: '2', fontFamily: IMPACT, fontSize: 460, color: { $t: 'colors.deep' }, textAlign: 'center', x: 1150, y: 190, width: 560, height: 650, zIndex: 5, animation: { name: 'zoomIn', duration: 520, delay: 260 }, editable: { content: true, fontSize: { type: 'range', min: 300, max: 520 } } },
      { id: 'bp-zhe', type: 'text', content: '折起', fontFamily: { $t: 'fonts.heading' }, fontSize: 84, fontWeight: 900, color: { $t: 'colors.deep' }, x: 1580, y: 560, width: 190, height: 120, zIndex: 5, editable: { content: true } },
      { id: 'bp-burst', type: 'image', src: burst(200, 'rgba(255,255,255,0.95)'), x: 1030, y: 660, width: 200, height: 200, objectFit: 'contain', rotation: -12, zIndex: 6, animation: { name: 'twinkle', duration: 2600, iterationCount: 'infinite' } },
      { id: 'bp-burst-t', type: 'text', content: '限量', fontFamily: HEI, fontSize: 30, fontWeight: 900, color: { $t: 'colors.deep' }, textAlign: 'center', rotation: -12, x: 1030, y: 742, width: 200, height: 42, zIndex: 7, editable: { content: true } }
    ]
  },

  // 2. 直播预告卡 —— 主播头像虚线位 + 开播时间胶囊 + 福利清单 + 提醒条（4:5）
  {
    id: 'sale-live-preview', name: '直播预告卡', version: '1.0.0', category: 'sale',
    tags: ['sale', 'live', 'preview', 'checklist', '4:5'],
    thumbnail: svgUri('<rect width="160" height="200" fill="%2317101F"/><g stroke="%23FFFFFF" stroke-opacity="0.05"><circle cx="30" cy="24" r="1.2"/><circle cx="120" cy="16" r="1.2"/><circle cx="60" cy="186" r="1.2"/><circle cx="140" cy="120" r="1.2"/></g><rect x="12" y="14" width="40" height="9" rx="4.5" fill="%23FF3D68"/><rect x="108" y="14" width="40" height="12" rx="6" fill="%23FFFFFF" opacity="0.12"/><rect x="12" y="34" width="86" height="11" rx="2" fill="%23FFF6EA"/><rect x="12" y="50" width="110" height="11" rx="2" fill="%23FFC24B"/><rect x="12" y="72" width="72" height="14" rx="7" fill="%23FFC24B"/><circle cx="124" cy="88" r="22" fill="none" stroke="%23FF3D68" stroke-width="1.6" stroke-dasharray="4 3"/><text x="124" y="92" font-size="10" font-family="sans-serif" fill="%23FFF6EA" text-anchor="middle" opacity="0.7">脸</text><g fill="%23FFF6EA" opacity="0.75"><rect x="14" y="106" width="4" height="4" rx="1"/><rect x="14" y="122" width="4" height="4" rx="1"/><rect x="14" y="138" width="4" height="4" rx="1"/></g><g fill="%23FFF6EA" opacity="0.35"><rect x="24" y="106" width="66" height="4" rx="1"/><rect x="24" y="122" width="54" height="4" rx="1"/><rect x="24" y="138" width="74" height="4" rx="1"/></g><rect x="12" y="154" width="136" height="18" rx="5" fill="%23FF3D68"/><rect x="12" y="180" width="72" height="6" rx="2" fill="%23A395AF"/>', 160, 200),
    tokens: {
      colors: {
        bg: { label: '夜色底', default: '#17101F', options: ['#17101F', '#1B1215', '#0F1720', '#1D1512'] },
        ink: { label: '主文字', default: '#FFF6EA', options: ['#FFF6EA', '#FFEFEF', '#EAF1F8', '#FFF3E2'] },
        accent: { label: '强调粉', default: '#FF3D68', options: ['#FF3D68', '#FF6B35', '#4CC9F0', '#A3E635'] },
        gold: { label: '时间金', default: '#FFC24B', options: ['#FFC24B', '#FFE08A', '#F7B267', '#BFE8C2'] },
        dim: { label: '弱文字', default: '#A395AF', options: ['#A395AF', '#B0998F', '#8FA3B5', '#9BAF8F'] }
      },
      fonts: { heading: { label: '标题字体', default: HEI, options: [HEI, IMPACT] } }
    },
    presets: [
      { name: '暗紫霓虹', colors: { bg: '#17101F', ink: '#FFF6EA', accent: '#FF3D68', gold: '#FFC24B', dim: '#A395AF' } },
      { name: '酒红直播间', colors: { bg: '#1B1215', ink: '#FFEFEF', accent: '#FF6B35', gold: '#FFE08A', dim: '#B0998F' } },
      { name: '午夜蓝调', colors: { bg: '#0F1720', ink: '#EAF1F8', accent: '#4CC9F0', gold: '#F7B267', dim: '#8FA3B5' } },
      { name: '焦糖暖夜', colors: { bg: '#1D1512', ink: '#FFF3E2', accent: '#A3E635', gold: '#BFE8C2', dim: '#9BAF8F' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'lv-fog', type: 'overlay', background: 'radial-gradient(circle at 78% 34%, rgba(255,61,104,0.20), transparent 48%)', x: 0, y: 0, width: 1080, height: 1350, zIndex: 1 },
      { id: 'lv-dots', type: 'image', src: halftone(1080, 1350, 2.4, 66, 'rgba(255,255,255,0.07)'), x: 0, y: 0, width: 1080, height: 1350, objectFit: 'fill', zIndex: 1 },
      { id: 'lv-kicker', type: 'shape', shapeKind: 'rect', x: 72, y: 80, width: 268, height: 58, borderRadius: 999, fill: { $t: 'colors.accent' }, zIndex: 3 },
      { id: 'lv-kicker-t', type: 'text', content: 'LIVE 直播预告', fontFamily: MONO, fontSize: 26, fontWeight: 700, letterSpacing: 2, color: { $t: 'colors.bg' }, textAlign: 'center', x: 72, y: 90, width: 268, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'lv-badge', type: 'shape', shapeKind: 'rect', x: 772, y: 84, width: 236, height: 54, borderRadius: 999, fill: 'rgba(255,255,255,0.12)', zIndex: 3 },
      { id: 'lv-dot', type: 'shape', shapeKind: 'circle', x: 792, y: 101, width: 20, height: 20, fill: { $t: 'colors.accent' }, zIndex: 4, animation: { name: 'blink', duration: 1200, iterationCount: 'infinite' } },
      { id: 'lv-badge-t', type: 'text', content: '已预约 1.2 万', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.ink' }, textAlign: 'center', x: 818, y: 95, width: 184, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'lv-t1', type: 'text', content: '今晚不整活\n只把价格打下来', fontFamily: { $t: 'fonts.heading' }, fontSize: 100, fontWeight: 900, color: { $t: 'colors.ink' }, lineHeight: 1.22, letterSpacing: 2, x: 72, y: 170, width: 860, height: 268, zIndex: 3, animation: { name: 'slideInLeft', duration: 520 }, editable: { content: true, fontSize: { type: 'range', min: 64, max: 116 } } },
      { id: 'lv-time', type: 'shape', shapeKind: 'rect', x: 72, y: 478, width: 520, height: 92, borderRadius: 999, fill: { $t: 'colors.gold' }, zIndex: 3 },
      { id: 'lv-time-t', type: 'text', content: '3月18日 20:00 开播', fontFamily: HEI, fontSize: 42, fontWeight: 900, color: { $t: 'colors.bg' }, textAlign: 'center', x: 72, y: 496, width: 520, height: 60, zIndex: 4, animation: { name: 'zoomIn', duration: 460, delay: 130 }, editable: { content: true } },
      { id: 'lv-avatar', type: 'shape', shapeKind: 'circle', x: 700, y: 470, width: 308, height: 308, border: { width: 6, style: 'dashed', color: { $t: 'colors.accent' } }, zIndex: 3, animation: { name: 'float', duration: 4600, iterationCount: 'infinite' } },
      { id: 'lv-avatar-t', type: 'text', content: '主播头像位', fontFamily: HEI, fontSize: 30, color: { $t: 'colors.ink' }, opacity: 0.85, textAlign: 'center', x: 700, y: 596, width: 308, height: 44, zIndex: 4, editable: { content: true } },
      { id: 'lv-avatar-cap', type: 'text', content: '拖图替换', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.dim' }, textAlign: 'center', x: 700, y: 644, width: 308, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'lv-list-h', type: 'text', content: '今晚福利清单', fontFamily: { $t: 'fonts.heading' }, fontSize: 36, fontWeight: 900, color: { $t: 'colors.gold' }, x: 72, y: 610, width: 300, height: 54, zIndex: 3, editable: { content: true } },
      { id: 'lv-b1', group: 'lv-b', type: 'shape', shapeKind: 'circle', x: 76, y: 690, width: 22, height: 22, fill: { $t: 'colors.accent' }, zIndex: 3 },
      { id: 'lv-b2', group: 'lv-b', type: 'shape', shapeKind: 'circle', x: 76, y: 758, width: 22, height: 22, fill: { $t: 'colors.gold' }, zIndex: 3 },
      { id: 'lv-b3', group: 'lv-b', type: 'shape', shapeKind: 'circle', x: 76, y: 826, width: 22, height: 22, fill: { $t: 'colors.accent' }, zIndex: 3 },
      { id: 'lv-b4', group: 'lv-b', type: 'shape', shapeKind: 'circle', x: 76, y: 894, width: 22, height: 22, fill: { $t: 'colors.gold' }, zIndex: 3 },
      { id: 'lv-r1', type: 'text', content: '整点抽免单 · 每小时 1 次', fontFamily: HEI, fontSize: 30, color: { $t: 'colors.ink' }, x: 118, y: 680, width: 520, height: 50, zIndex: 3, animation: { name: 'rise', duration: 460, delay: 260 }, editable: { content: true } },
      { id: 'lv-r2', type: 'text', content: '备注「老粉」再减 20', fontFamily: HEI, fontSize: 30, color: { $t: 'colors.ink' }, x: 118, y: 748, width: 520, height: 50, zIndex: 3, animation: { name: 'rise', duration: 460, delay: 260 }, editable: { content: true } },
      { id: 'lv-r3', type: 'text', content: '满 399 送保温杯（颜色随机）', fontFamily: HEI, fontSize: 30, color: { $t: 'colors.ink' }, x: 118, y: 816, width: 520, height: 50, zIndex: 3, animation: { name: 'rise', duration: 460, delay: 260 }, editable: { content: true } },
      { id: 'lv-r4', type: 'text', content: '包邮送运费险 · 退货不心疼', fontFamily: HEI, fontSize: 30, color: { $t: 'colors.ink' }, x: 118, y: 884, width: 520, height: 50, zIndex: 3, animation: { name: 'rise', duration: 460, delay: 260 }, editable: { content: true } },
      { id: 'lv-bar', type: 'shape', shapeKind: 'rect', x: 72, y: 970, width: 936, height: 104, borderRadius: 24, fill: { $t: 'colors.accent' }, zIndex: 3 },
      { id: 'lv-bar-t', type: 'text', content: '提前 5 分钟进场 · 前 100 名抽免单', fontFamily: HEI, fontSize: 36, fontWeight: 900, color: { $t: 'colors.ink' }, textAlign: 'center', x: 72, y: 998, width: 936, height: 56, zIndex: 4, editable: { content: true } },
      { id: 'lv-note', type: 'text', content: '淘宝 / 抖音 / 视频号 同步开播（哪个顺手点哪个）', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.dim' }, x: 72, y: 1104, width: 880, height: 46, zIndex: 3, editable: { content: true } },
      { id: 'lv-foot', type: 'text', content: '点关注不迷路 · 迷路了我也不接你', fontFamily: HEI, fontSize: 30, color: { $t: 'colors.ink' }, opacity: 0.9, x: 72, y: 1196, width: 640, height: 50, zIndex: 3, editable: { content: true } }
    ]
  },

  // 3. 优惠券 / 拼单卡 —— 齿孔票券 + 满减大字 + 拼单码 + 立省金额（1:1）
  {
    id: 'sale-coupon-ticket', name: '优惠券拼单卡', version: '1.0.0', category: 'sale',
    tags: ['sale', 'coupon', 'ticket', 'groupbuy', '1:1'],
    thumbnail: svgUri('<rect width="160" height="160" fill="%23FBF1DE"/><g fill="%231F1B16" opacity="0.06"><circle cx="20" cy="140" r="1.4"/><circle cx="140" cy="140" r="1.4"/></g><rect x="60" y="14" width="34" height="8" rx="4" fill="%23E23A2E"/><rect x="14" y="30" width="70" height="14" rx="2" fill="%233B2A1A"/><rect x="14" y="48" width="52" height="8" rx="2" fill="%233B2A1A" opacity="0.5"/><rect x="14" y="66" width="132" height="62" rx="6" fill="%23FFFFFF" stroke="%23E23A2E" stroke-width="1.5"/><circle cx="14" cy="97" r="5" fill="%23FBF1DE"/><circle cx="146" cy="97" r="5" fill="%23FBF1DE"/><line x1="104" y1="72" x2="104" y2="122" stroke="%23E23A2E" stroke-width="1.4" stroke-dasharray="4 3"/><text x="24" y="106" font-family="Impact,sans-serif" font-size="26" fill="%23E23A2E">¥50</text><g fill="%233B2A1A"><rect x="114" y="76" width="6" height="6"/><rect x="122" y="76" width="6" height="6"/><rect x="114" y="84" width="6" height="6"/><rect x="130" y="84" width="6" height="6"/><rect x="122" y="92" width="6" height="6"/></g><rect x="110" y="104" width="34" height="16" rx="8" fill="%23F0A106"/><rect x="14" y="138" width="86" height="8" rx="2" fill="%23E23A2E" opacity="0.7"/><rect x="14" y="150" width="52" height="6" rx="2" fill="%233B2A1A" opacity="0.35"/>', 160, 160),
    tokens: {
      colors: {
        bg: { label: '底色', default: '#FBF1DE', options: ['#FBF1DE', '#EFF3EA', '#F7E9EC', '#E9EFF6'] },
        card: { label: '券面', default: '#FFFFFF', options: ['#FFFFFF', '#FFFDF6', '#FDF2F2', '#F1F6FB'] },
        ink: { label: '主文字', default: '#3B2A1A', options: ['#3B2A1A', '#22301D', '#3D1F27', '#1E2A3B'] },
        accent: { label: '券红', default: '#E23A2E', options: ['#E23A2E', '#2F9E44', '#C2255C', '#2563EB'] },
        gold: { label: '副强调', default: '#F0A106', options: ['#F0A106', '#B08D57', '#74B08D', '#5B8DB8'] }
      },
      fonts: { heading: { label: '数字字体', default: IMPACT, options: [IMPACT, MONO] } }
    },
    presets: [
      { name: '奶油番茄', colors: { bg: '#FBF1DE', card: '#FFFFFF', ink: '#3B2A1A', accent: '#E23A2E', gold: '#F0A106' } },
      { name: '米白抹茶', colors: { bg: '#EFF3EA', card: '#FFFDF6', ink: '#22301D', accent: '#2F9E44', gold: '#B08D57' } },
      { name: '燕麦可可', colors: { bg: '#F7E9EC', card: '#FDF2F2', ink: '#3D1F27', accent: '#C2255C', gold: '#74B08D' } },
      { name: '雾霾蓝调', colors: { bg: '#E9EFF6', card: '#F1F6FB', ink: '#1E2A3B', accent: '#2563EB', gold: '#5B8DB8' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1080, defaultWidth: 1080, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'cp-dots', type: 'image', src: halftone(1080, 1080, 3, 60, 'rgba(59,42,26,0.10)'), x: 0, y: 0, width: 1080, height: 1080, objectFit: 'fill', zIndex: 1 },
      { id: 'cp-kicker', type: 'shape', shapeKind: 'rect', x: 72, y: 68, width: 250, height: 54, borderRadius: 999, fill: { $t: 'colors.accent' }, zIndex: 3 },
      { id: 'cp-kicker-t', type: 'text', content: '限时拼单券', fontFamily: HEI, fontSize: 26, fontWeight: 700, color: { $t: 'colors.card' }, textAlign: 'center', x: 72, y: 78, width: 250, height: 38, zIndex: 4, editable: { content: true } },
      { id: 'cp-h', type: 'text', content: '闺蜜拼单券', fontFamily: { $t: 'fonts.heading' }, fontSize: 88, fontWeight: 900, color: { $t: 'colors.ink' }, letterSpacing: 2, x: 72, y: 152, width: 560, height: 128, zIndex: 3, animation: { name: 'fadeInUp', duration: 480 }, editable: { content: true, fontSize: { type: 'range', min: 60, max: 110 } } },
      { id: 'cp-sub', type: 'text', content: '两个人买，才配叫省钱', fontFamily: HEI, fontSize: 30, color: { $t: 'colors.accent' }, x: 72, y: 286, width: 460, height: 46, zIndex: 3, editable: { content: true } },
      { id: 'cp-ticket', type: 'shape', shapeKind: 'rect', x: 72, y: 360, width: 936, height: 460, borderRadius: 28, fill: { $t: 'colors.card' }, border: { width: 4, color: { $t: 'colors.accent' } }, shadow: { offsetX: 0, offsetY: 10, blur: 26, color: 'rgba(59,42,26,0.14)' }, zIndex: 2 },
      { id: 'cp-notch-l', type: 'shape', shapeKind: 'circle', x: 44, y: 562, width: 56, height: 56, fill: { $t: 'colors.bg' }, group: 'notch', zIndex: 4 },
      { id: 'cp-notch-r', type: 'shape', shapeKind: 'circle', x: 980, y: 562, width: 56, height: 56, fill: { $t: 'colors.bg' }, group: 'notch', zIndex: 4 },
      { id: 'cp-perf', type: 'image', src: dashV(410, 'rgba(226,58,46,0.55)', 10, 15), x: 672, y: 388, width: 10, height: 410, objectFit: 'fill', zIndex: 4 },
      { id: 'cp-cond', type: 'text', content: '满 300 元可用', fontFamily: HEI, fontSize: 36, fontWeight: 700, color: { $t: 'colors.ink' }, x: 136, y: 406, width: 320, height: 52, zIndex: 4, editable: { content: true } },
      { id: 'cp-big', type: 'text', content: '¥50', fontFamily: { $t: 'fonts.heading' }, fontSize: 210, fontWeight: 900, color: { $t: 'colors.accent' }, x: 136, y: 456, width: 420, height: 300, zIndex: 4, animation: { name: 'zoomIn', duration: 520, delay: 130 }, editable: { content: true, fontSize: { type: 'range', min: 140, max: 240 } } },
      { id: 'cp-note', type: 'text', content: '可叠加店铺券 · 每人限用 1 张', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.ink' }, opacity: 0.75, x: 136, y: 738, width: 460, height: 42, zIndex: 4, editable: { content: true } },
      { id: 'cp-qr', type: 'image', src: qrMock(168, 12, '%233B2A1A'), x: 758, y: 398, width: 168, height: 168, objectFit: 'contain', zIndex: 4 },
      { id: 'cp-code', type: 'text', content: '拼单码 8F2K', fontFamily: MONO, fontSize: 26, color: { $t: 'colors.ink' }, textAlign: 'center', x: 692, y: 580, width: 300, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'cp-btn', type: 'shape', shapeKind: 'rect', x: 726, y: 640, width: 232, height: 78, borderRadius: 999, fill: { $t: 'colors.gold' }, zIndex: 4 },
      { id: 'cp-btn-t', type: 'text', content: '去拼单', fontFamily: HEI, fontSize: 36, fontWeight: 900, color: { $t: 'colors.ink' }, textAlign: 'center', x: 726, y: 658, width: 232, height: 56, zIndex: 5, editable: { content: true } },
      { id: 'cp-foot', type: 'text', content: '拼单成功额外立减 30 · 四舍五入等于白送', fontFamily: HEI, fontSize: 30, color: { $t: 'colors.ink' }, x: 72, y: 862, width: 700, height: 50, zIndex: 3, animation: { name: 'slideUpFade', duration: 460, delay: 260 }, editable: { content: true } },
      { id: 'cp-valid', type: 'text', content: '有效期 2026.03.18 24:00 · 过时不候', fontFamily: MONO, fontSize: 26, color: { $t: 'colors.accent' }, x: 72, y: 934, width: 640, height: 44, zIndex: 3, editable: { content: true } },
      { id: 'cp-star1', type: 'image', src: star(74, 'rgba(240,161,6,0.9)'), x: 896, y: 150, width: 74, height: 74, objectFit: 'contain', rotation: 12, zIndex: 3, animation: { name: 'twinkle', duration: 2800, iterationCount: 'infinite' } },
      { id: 'cp-star2', type: 'image', src: star(52, 'rgba(226,58,46,0.75)'), x: 960, y: 236, width: 52, height: 52, objectFit: 'contain', rotation: -14, zIndex: 3, animation: { name: 'wobble', duration: 2200, iterationCount: 'infinite' } }
    ]
  },

  // 4. 商品卖点长图 —— 竖排四宫格卖点 + 价格锚点（原价划线 / 到手价）（9:16）
  {
    id: 'sale-selling-points', name: '商品卖点长图', version: '1.0.0', category: 'sale',
    tags: ['sale', 'selling-points', 'detail', 'price-anchor', '9:16'],
    thumbnail: svgUri('<rect width="160" height="284" fill="%23F7F3EC"/><rect x="14" y="16" width="36" height="9" rx="4.5" fill="%23E8590C"/><rect x="14" y="34" width="76" height="14" rx="2" fill="%231F1B16"/><rect x="14" y="52" width="60" height="14" rx="2" fill="%23E8590C"/><g><rect x="14" y="76" width="64" height="46" rx="5" fill="%23FFFFFF" stroke="%231F1B16" stroke-opacity="0.12"/><rect x="82" y="76" width="64" height="46" rx="5" fill="%23FFFFFF" stroke="%231F1B16" stroke-opacity="0.12"/><rect x="14" y="128" width="64" height="46" rx="5" fill="%23FFFFFF" stroke="%231F1B16" stroke-opacity="0.12"/><rect x="82" y="128" width="64" height="46" rx="5" fill="%23FFFFFF" stroke="%231F1B16" stroke-opacity="0.12"/></g><g fill="%23E8590C"><rect x="20" y="82" width="12" height="6" rx="2"/><rect x="88" y="82" width="12" height="6" rx="2"/><rect x="20" y="134" width="12" height="6" rx="2"/><rect x="88" y="134" width="12" height="6" rx="2"/></g><g fill="%231F1B16" opacity="0.3"><rect x="20" y="96" width="50" height="4" rx="1"/><rect x="88" y="96" width="42" height="4" rx="1"/><rect x="20" y="148" width="46" height="4" rx="1"/><rect x="88" y="148" width="52" height="4" rx="1"/></g><line x1="14" y1="196" x2="146" y2="196" stroke="%231F1B16" stroke-opacity="0.15"/><text x="14" y="222" font-family="Impact,sans-serif" font-size="24" fill="%231F1B16" opacity="0.4">¥899</text><line x1="14" y1="214" x2="66" y2="214" stroke="%23E8590C" stroke-width="2"/><text x="76" y="224" font-family="Impact,sans-serif" font-size="30" fill="%23E8590C">¥599</text><rect x="14" y="244" width="132" height="22" rx="6" fill="%23E8590C"/><rect x="14" y="272" width="70" height="6" rx="2" fill="%238A8177"/>', 160, 284),
    tokens: {
      colors: {
        bg: { label: '纸色', default: '#F7F3EC', options: ['#F7F3EC', '#EDF1F4', '#F6EDEF', '#EFF3E9'] },
        card: { label: '卡面', default: '#FFFFFF', options: ['#FFFFFF', '#FFFDF7', '#FCF3F5', '#F2F7FB'] },
        ink: { label: '主文字', default: '#1F1B16', options: ['#1F1B16', '#16201C', '#241A1E', '#151E28'] },
        accent: { label: '品牌橙', default: '#E8590C', options: ['#E8590C', '#2563EB', '#C2255C', '#2F9E44'] },
        dim: { label: '弱文字', default: '#8A8177', options: ['#8A8177', '#7A8A80', '#8A7A82', '#7A838A'] }
      },
      fonts: { heading: { label: '标题字体', default: HEI, options: [HEI, SONG] } }
    },
    presets: [
      { name: '燕麦奶白', colors: { bg: '#F7F3EC', card: '#FFFFFF', ink: '#1F1B16', accent: '#E8590C', dim: '#8A8177' } },
      { name: '石墨冷蓝', colors: { bg: '#EDF1F4', card: '#F2F7FB', ink: '#151E28', accent: '#2563EB', dim: '#7A838A' } },
      { name: '玫瑰高级灰', colors: { bg: '#F6EDEF', card: '#FCF3F5', ink: '#241A1E', accent: '#C2255C', dim: '#8A7A82' } },
      { name: '抹茶清新', colors: { bg: '#EFF3E9', card: '#FFFDF7', ink: '#16201C', accent: '#2F9E44', dim: '#7A8A80' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1920, defaultWidth: 1080, defaultHeight: 1920, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'sp-dots', type: 'image', src: halftone(1080, 1920, 2.6, 72, 'rgba(31,27,22,0.08)'), x: 0, y: 0, width: 1080, height: 1920, objectFit: 'fill', zIndex: 1 },
      { id: 'sp-kicker', type: 'shape', shapeKind: 'rect', x: 72, y: 80, width: 256, height: 56, borderRadius: 999, fill: { $t: 'colors.accent' }, zIndex: 3 },
      { id: 'sp-kicker-t', type: 'text', content: '自用 30 天实测', fontFamily: HEI, fontSize: 28, fontWeight: 700, color: { $t: 'colors.card' }, textAlign: 'center', x: 72, y: 90, width: 256, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'sp-h1', type: 'text', content: '一把椅子', fontFamily: { $t: 'fonts.heading' }, fontSize: 118, fontWeight: 900, color: { $t: 'colors.ink' }, x: 72, y: 160, width: 560, height: 168, zIndex: 3, animation: { name: 'fadeInUp', duration: 520 }, editable: { content: true, fontSize: { type: 'range', min: 80, max: 130 } } },
      { id: 'sp-h2', type: 'text', content: '治好了我的腰', fontFamily: { $t: 'fonts.heading' }, fontSize: 118, fontWeight: 900, color: { $t: 'colors.accent' }, x: 72, y: 340, width: 800, height: 168, zIndex: 3, animation: { name: 'fadeInUp', duration: 520, delay: 130 }, editable: { content: true, fontSize: { type: 'range', min: 80, max: 130 } } },
      { id: 'sp-sub', type: 'text', content: '连坐 30 天 · 人话版总结', fontFamily: HEI, fontSize: 28, color: { $t: 'colors.dim' }, x: 72, y: 536, width: 460, height: 44, zIndex: 3, editable: { content: true } },
      { id: 'sp-c1', group: 'sp-c', type: 'shape', shapeKind: 'rect', x: 72, y: 620, width: 450, height: 280, borderRadius: 24, fill: { $t: 'colors.card' }, border: { width: 2, color: 'rgba(31,27,22,0.12)' }, zIndex: 2, animation: { name: 'slideInLeft', duration: 460, delay: 260 } },
      { id: 'sp-c1-n', type: 'text', content: '01', fontFamily: IMPACT, fontSize: 46, color: { $t: 'colors.accent' }, x: 100, y: 648, width: 110, height: 66, zIndex: 3, editable: { content: true } },
      { id: 'sp-c1-t', type: 'text', content: '三段靠背', fontFamily: { $t: 'fonts.heading' }, fontSize: 40, fontWeight: 900, color: { $t: 'colors.ink' }, x: 100, y: 724, width: 260, height: 56, zIndex: 3, editable: { content: true } },
      { id: 'sp-c1-d', type: 'text', content: '腰窝自己贴合\n不用手拧半天', fontFamily: HEI, fontSize: 28, color: { $t: 'colors.dim' }, lineHeight: 1.45, x: 100, y: 792, width: 396, height: 90, zIndex: 3, editable: { content: true } },
      { id: 'sp-c2', group: 'sp-c', type: 'shape', shapeKind: 'rect', x: 558, y: 620, width: 450, height: 280, borderRadius: 24, fill: { $t: 'colors.card' }, border: { width: 2, color: 'rgba(31,27,22,0.12)' }, zIndex: 2, animation: { name: 'slideInRight', duration: 460, delay: 260 } },
      { id: 'sp-c2-n', type: 'text', content: '02', fontFamily: IMPACT, fontSize: 46, color: { $t: 'colors.accent' }, x: 586, y: 648, width: 110, height: 66, zIndex: 3, editable: { content: true } },
      { id: 'sp-c2-t', type: 'text', content: '4D 扶手', fontFamily: { $t: 'fonts.heading' }, fontSize: 40, fontWeight: 900, color: { $t: 'colors.ink' }, x: 586, y: 724, width: 300, height: 56, zIndex: 3, editable: { content: true } },
      { id: 'sp-c2-d', type: 'text', content: '前后左右都能调\n打字不架胳膊', fontFamily: HEI, fontSize: 28, color: { $t: 'colors.dim' }, lineHeight: 1.45, x: 586, y: 792, width: 396, height: 90, zIndex: 3, editable: { content: true } },
      { id: 'sp-c3', group: 'sp-c', type: 'shape', shapeKind: 'rect', x: 72, y: 930, width: 450, height: 280, borderRadius: 24, fill: { $t: 'colors.card' }, border: { width: 2, color: 'rgba(31,27,22,0.12)' }, zIndex: 2, animation: { name: 'slideInLeft', duration: 460, delay: 260 } },
      { id: 'sp-c3-n', type: 'text', content: '03', fontFamily: IMPACT, fontSize: 46, color: { $t: 'colors.accent' }, x: 100, y: 958, width: 110, height: 66, zIndex: 3, editable: { content: true } },
      { id: 'sp-c3-t', type: 'text', content: '160° 后仰', fontFamily: { $t: 'fonts.heading' }, fontSize: 40, fontWeight: 900, color: { $t: 'colors.ink' }, x: 100, y: 1034, width: 320, height: 56, zIndex: 3, editable: { content: true } },
      { id: 'sp-c3-d', type: 'text', content: '午休能躺平\n老板路过自动坐直', fontFamily: HEI, fontSize: 28, color: { $t: 'colors.dim' }, lineHeight: 1.45, x: 100, y: 1102, width: 396, height: 90, zIndex: 3, editable: { content: true } },
      { id: 'sp-c4', group: 'sp-c', type: 'shape', shapeKind: 'rect', x: 558, y: 930, width: 450, height: 280, borderRadius: 24, fill: { $t: 'colors.card' }, border: { width: 2, color: 'rgba(31,27,22,0.12)' }, zIndex: 2, animation: { name: 'slideInRight', duration: 460, delay: 260 } },
      { id: 'sp-c4-n', type: 'text', content: '04', fontFamily: IMPACT, fontSize: 46, color: { $t: 'colors.accent' }, x: 586, y: 958, width: 110, height: 66, zIndex: 3, editable: { content: true } },
      { id: 'sp-c4-t', type: 'text', content: '全网布坐面', fontFamily: { $t: 'fonts.heading' }, fontSize: 40, fontWeight: 900, color: { $t: 'colors.ink' }, x: 586, y: 1034, width: 340, height: 56, zIndex: 3, editable: { content: true } },
      { id: 'sp-c4-d', type: 'text', content: '夏天不闷腿\n久坐不留印子', fontFamily: HEI, fontSize: 28, color: { $t: 'colors.dim' }, lineHeight: 1.45, x: 586, y: 1102, width: 396, height: 90, zIndex: 3, editable: { content: true } },
      { id: 'sp-anchor-h', type: 'text', content: '价格锚点 · 别急着自己算', fontFamily: HEI, fontSize: 28, fontWeight: 700, color: { $t: 'colors.dim' }, x: 72, y: 1268, width: 480, height: 44, zIndex: 3, editable: { content: true } },
      { id: 'sp-old-l', type: 'text', content: '日常价', fontFamily: HEI, fontSize: 28, color: { $t: 'colors.dim' }, x: 72, y: 1330, width: 150, height: 44, zIndex: 3, editable: { content: true } },
      { id: 'sp-old', type: 'text', content: '¥899', fontFamily: { $t: 'fonts.heading' }, fontSize: 40, color: { $t: 'colors.dim' }, x: 232, y: 1322, width: 200, height: 56, zIndex: 3, editable: { content: true } },
      { id: 'sp-strike', type: 'shape', shapeKind: 'rect', x: 226, y: 1348, width: 214, height: 5, fill: { $t: 'colors.accent' }, opacity: 0.8, zIndex: 4 },
      { id: 'sp-save', type: 'text', content: '立省 300', fontFamily: HEI, fontSize: 40, fontWeight: 900, color: { $t: 'colors.accent' }, x: 690, y: 1322, width: 318, height: 56, zIndex: 3, editable: { content: true } },
      { id: 'sp-price-l', type: 'text', content: '今晚到手价', fontFamily: HEI, fontSize: 28, color: { $t: 'colors.ink' }, x: 72, y: 1408, width: 260, height: 44, zIndex: 3, editable: { content: true } },
      { id: 'sp-price', type: 'text', content: '¥599', fontFamily: { $t: 'fonts.heading' }, fontSize: 118, fontWeight: 900, color: { $t: 'colors.accent' }, x: 72, y: 1462, width: 400, height: 168, zIndex: 3, animation: { name: 'zoomIn', duration: 520 }, editable: { content: true, fontSize: { type: 'range', min: 80, max: 150 } } },
      { id: 'sp-price-note', type: 'text', content: '含 12 期免息\n折合每天 1.6 元（一杯奶茶钱）', fontFamily: HEI, fontSize: 28, color: { $t: 'colors.ink' }, lineHeight: 1.5, x: 500, y: 1470, width: 508, height: 100, zIndex: 3, editable: { content: true } },
      { id: 'sp-rule', type: 'shape', shapeKind: 'rect', x: 72, y: 1664, width: 936, height: 3, fill: { $t: 'colors.dim' }, opacity: 0.4, zIndex: 2 },
      { id: 'sp-cta', type: 'shape', shapeKind: 'rect', x: 72, y: 1690, width: 936, height: 104, borderRadius: 22, fill: { $t: 'colors.accent' }, zIndex: 2 },
      { id: 'sp-cta-t', type: 'text', content: '评论区扣 1 领 100 元隐藏券', fontFamily: HEI, fontSize: 40, fontWeight: 900, color: { $t: 'colors.card' }, textAlign: 'center', x: 72, y: 1718, width: 936, height: 56, zIndex: 3, animation: { name: 'blink', duration: 2400, iterationCount: 'infinite' }, editable: { content: true } },
      { id: 'sp-tag', type: 'image', src: star(64, 'rgba(232,89,12,0.85)'), x: 928, y: 96, width: 64, height: 64, objectFit: 'contain', rotation: 14, zIndex: 4, animation: { name: 'twinkle', duration: 2600, iterationCount: 'infinite' } }
    ]
  },

  // 5. 战报海报 —— GMV 巨大数字 + 增长曲线 + 里程碑（3:4）
  {
    id: 'sale-gmv-report', name: '大促战报海报', version: '1.0.0', category: 'sale',
    tags: ['sale', 'gmv', 'report', 'milestone', '3:4'],
    thumbnail: svgUri('<rect width="160" height="213" fill="%2310100E"/><rect x="14" y="16" width="46" height="10" rx="5" fill="%23E6B325"/><g fill="%23F4EFE4" opacity="0.08"><circle cx="140" cy="30" r="1.4"/><circle cx="120" cy="60" r="1.2"/><circle cx="30" cy="200" r="1.4"/></g><text x="14" y="76" font-family="Impact,sans-serif" font-size="40" fill="%23F4EFE4">1,286</text><rect x="112" y="56" width="20" height="16" rx="2" fill="%23E6B325"/><g stroke="%23E6B325" stroke-width="2.4" fill="none"><path d="M14 130 L44 118 L74 124 L104 100 L140 88"/></g><g fill="%23E6B325"><circle cx="44" cy="118" r="2.6"/><circle cx="104" cy="100" r="2.6"/><circle cx="140" cy="88" r="3"/></g><line x1="14" y1="136" x2="146" y2="136" stroke="%23F4EFE4" stroke-opacity="0.2"/><g fill="%23F4EFE4" opacity="0.55"><rect x="14" y="152" width="5" height="5"/><rect x="14" y="168" width="5" height="5"/><rect x="14" y="184" width="5" height="5"/></g><g fill="%23F4EFE4" opacity="0.3"><rect x="26" y="152" width="66" height="5" rx="1"/><rect x="26" y="168" width="54" height="5" rx="1"/><rect x="26" y="184" width="74" height="5" rx="1"/></g>', 160, 213),
    tokens: {
      colors: {
        bg: { label: '夜色底', default: '#10100E', options: ['#10100E', '#0B1420', '#170E14', '#0E1712'] },
        ink: { label: '主文字', default: '#F4EFE4', options: ['#F4EFE4', '#E6EEF6', '#F6E8EC', '#E8F2E9'] },
        gold: { label: '战报金', default: '#E6B325', options: ['#E6B325', '#F4D06F', '#C9A227', '#FFD9A0'] },
        up: { label: '增长色', default: '#3DDC97', options: ['#3DDC97', '#4CC9F0', '#FF6B6B', '#A3E635'] },
        dim: { label: '弱文字', default: '#8B857A', options: ['#8B857A', '#7F8B99', '#997F88', '#7F9985'] }
      },
      fonts: { heading: { label: '大数字', default: IMPACT, options: [IMPACT, MONO] } }
    },
    presets: [
      { name: '黑金战报', colors: { bg: '#10100E', ink: '#F4EFE4', gold: '#E6B325', up: '#3DDC97', dim: '#8B857A' } },
      { name: '午夜蓝金', colors: { bg: '#0B1420', ink: '#E6EEF6', gold: '#F4D06F', up: '#4CC9F0', dim: '#7F8B99' } },
      { name: '暗紫捷报', colors: { bg: '#170E14', ink: '#F6E8EC', gold: '#C9A227', up: '#FF6B6B', dim: '#997F88' } },
      { name: '松林首胜', colors: { bg: '#0E1712', ink: '#E8F2E9', gold: '#FFD9A0', up: '#A3E635', dim: '#7F9985' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1440, defaultWidth: 1080, defaultHeight: 1440, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'gr-fog', type: 'overlay', background: 'radial-gradient(circle at 50% 30%, rgba(230,179,37,0.18), transparent 52%)', x: 0, y: 0, width: 1080, height: 1440, zIndex: 1 },
      { id: 'gr-dots', type: 'image', src: halftone(1080, 1440, 2.2, 66, 'rgba(244,239,228,0.06)'), x: 0, y: 0, width: 1080, height: 1440, objectFit: 'fill', zIndex: 1 },
      { id: 'gr-kicker', type: 'shape', shapeKind: 'rect', x: 72, y: 80, width: 296, height: 56, borderRadius: 999, fill: { $t: 'colors.gold' }, zIndex: 3 },
      { id: 'gr-kicker-t', type: 'text', content: '2026 618 战报', fontFamily: MONO, fontSize: 28, fontWeight: 700, color: { $t: 'colors.bg' }, textAlign: 'center', x: 72, y: 90, width: 296, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'gr-live-t', type: 'text', content: '实时数据 · 截至 24:00', fontFamily: HEI, fontSize: 28, color: { $t: 'colors.dim' }, textAlign: 'right', x: 610, y: 92, width: 398, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'gr-label', type: 'text', content: '全场总成交额', fontFamily: { $t: 'fonts.heading' }, fontSize: 42, fontWeight: 900, color: { $t: 'colors.ink' }, letterSpacing: 4, x: 72, y: 178, width: 420, height: 62, zIndex: 3, editable: { content: true } },
      { id: 'gr-num', type: 'text', content: '1,286', fontFamily: { $t: 'fonts.heading' }, fontSize: 280, fontWeight: 900, color: { $t: 'colors.ink' }, lineHeight: 1.05, x: 72, y: 262, width: 830, height: 380, zIndex: 3, shadow: { offsetX: 0, offsetY: 0, blur: 60, color: 'rgba(230,179,37,0.35)' }, animation: { name: 'zoomIn', duration: 560 }, editable: { content: true, fontSize: { type: 'range', min: 180, max: 300 } } },
      { id: 'gr-unit', type: 'text', content: '万元', fontFamily: { $t: 'fonts.heading' }, fontSize: 60, fontWeight: 900, color: { $t: 'colors.gold' }, x: 812, y: 470, width: 196, height: 92, zIndex: 3, animation: { name: 'slideInRight', duration: 460, delay: 130 }, editable: { content: true } },
      { id: 'gr-growth', type: 'text', content: '同比 +218% · 环比 +64%', fontFamily: HEI, fontSize: 34, fontWeight: 700, color: { $t: 'colors.up' }, x: 72, y: 660, width: 620, height: 50, zIndex: 3, animation: { name: 'fadeInUp', duration: 460, delay: 260 }, editable: { content: true } },
      { id: 'gr-arrow', type: 'text', content: '↑', fontFamily: SANS, fontSize: 34, fontWeight: 700, color: { $t: 'colors.up' }, x: 610, y: 660, width: 60, height: 50, zIndex: 3, animation: { name: 'float', duration: 3600, iterationCount: 'infinite' } },
      { id: 'gr-curve', type: 'image', src: growth(936, 300, [0.08, 0.16, 0.12, 0.34, 0.44, 0.38, 0.62, 0.78, 1], 'rgba(230,179,37,0.95)', 'rgba(230,179,37,0.16)'), x: 72, y: 740, width: 936, height: 300, objectFit: 'fill', zIndex: 2 },
      { id: 'gr-curve-cap', type: 'text', content: '27 天走势 · 最后 3 天占了半条命', fontFamily: HEI, fontSize: 24, color: { $t: 'colors.dim' }, x: 72, y: 1052, width: 620, height: 40, zIndex: 3, editable: { content: true } },
      { id: 'gr-rule', type: 'shape', shapeKind: 'rect', x: 72, y: 1108, width: 936, height: 2, fill: { $t: 'colors.dim' }, opacity: 0.5, zIndex: 2 },
      { id: 'gr-ms-h', type: 'text', content: '里程碑', fontFamily: { $t: 'fonts.heading' }, fontSize: 42, fontWeight: 900, color: { $t: 'colors.gold' }, x: 72, y: 1130, width: 260, height: 62, zIndex: 3, editable: { content: true } },
      { id: 'gr-m1', group: 'gr-m', type: 'shape', shapeKind: 'rect', x: 72, y: 1216, width: 18, height: 18, fill: { $t: 'colors.gold' }, zIndex: 3 },
      { id: 'gr-m1-t', type: 'text', content: 'D1 00:07 破 100 万 · 全员以为刷单', fontFamily: HEI, fontSize: 28, color: { $t: 'colors.ink' }, x: 110, y: 1200, width: 830, height: 46, zIndex: 3, animation: { name: 'rise', duration: 460, delay: 260 }, editable: { content: true } },
      { id: 'gr-m2', group: 'gr-m', type: 'shape', shapeKind: 'rect', x: 72, y: 1272, width: 18, height: 18, fill: { $t: 'colors.up' }, zIndex: 3 },
      { id: 'gr-m2-t', type: 'text', content: 'D14 累计 800 万 · 补了三次货', fontFamily: HEI, fontSize: 28, color: { $t: 'colors.ink' }, x: 110, y: 1256, width: 830, height: 46, zIndex: 3, animation: { name: 'rise', duration: 460, delay: 260 }, editable: { content: true } },
      { id: 'gr-m3', group: 'gr-m', type: 'shape', shapeKind: 'rect', x: 72, y: 1328, width: 18, height: 18, fill: { $t: 'colors.gold' }, zIndex: 3 },
      { id: 'gr-m3-t', type: 'text', content: 'D27 收官 1,286 万 · 客服已关机', fontFamily: HEI, fontSize: 28, color: { $t: 'colors.ink' }, x: 110, y: 1312, width: 830, height: 46, zIndex: 3, animation: { name: 'rise', duration: 460, delay: 260 }, editable: { content: true } },
      { id: 'gr-spark', type: 'image', src: star(70, 'rgba(230,179,37,0.9)'), x: 940, y: 150, width: 70, height: 70, objectFit: 'contain', zIndex: 4, animation: { name: 'twinkle', duration: 2400, iterationCount: 'infinite' } },
      { id: 'gr-foot', type: 'text', content: '谢谢每一位冲动下单的你 · 双十一见', fontFamily: HEI, fontSize: 28, color: { $t: 'colors.dim' }, x: 72, y: 1378, width: 640, height: 42, zIndex: 3, editable: { content: true } }
    ]
  },

  // 6. 新品发售预告 —— 黑金极简悬念 + 发售日期 + 提醒条（1:1）
  {
    id: 'sale-drop-teaser', name: '新品发售预告', version: '1.0.0', category: 'sale',
    tags: ['sale', 'new-drop', 'teaser', 'countdown', '1:1'],
    thumbnail: svgUri('<rect width="160" height="160" fill="%230C0B0A"/><g fill="%23F3EEE4" opacity="0.5"><circle cx="24" cy="20" r="1"/><circle cx="132" cy="28" r="1.2"/><circle cx="104" cy="14" r="0.8"/><circle cx="52" cy="34" r="0.9"/></g><rect x="14" y="14" width="132" height="132" fill="none" stroke="%23C9A227" stroke-width="1" opacity="0.5"/><text x="80" y="42" font-family="Georgia,serif" font-size="8" fill="%23C9A227" text-anchor="middle" letter-spacing="2">NEW DROP 02</text><rect x="60" y="52" width="40" height="3" fill="%23C9A227"/><text x="80" y="104" font-family="Impact,sans-serif" font-size="34" fill="%23F3EEE4" text-anchor="middle">03.28</text><rect x="44" y="116" width="72" height="12" rx="6" fill="none" stroke="%23C9A227" stroke-width="1"/><rect x="52" y="120" width="56" height="4" rx="2" fill="%23C9A227" opacity="0.6"/><rect x="56" y="138" width="48" height="4" rx="1" fill="%238A8378"/>', 160, 160),
    tokens: {
      colors: {
        bg: { label: '墨黑', default: '#0C0B0A', options: ['#0C0B0A', '#0E1210', '#110C0C', '#0B0E14'] },
        ink: { label: '主文字', default: '#F3EEE3', options: ['#F3EEE3', '#E8EFEA', '#F2E8E8', '#E4EAF3'] },
        gold: { label: '香槟金', default: '#C9A227', options: ['#C9A227', '#D8BEC0', '#B08D57', '#9FB6CD'] },
        dim: { label: '弱文字', default: '#8A8378', options: ['#8A8378', '#7F8A83', '#8A7F7F', '#7F8794'] }
      },
      fonts: { heading: { label: '标题字体', default: SONG, options: [SONG, SERIF] }, latin: { label: '西文字', default: SERIF, options: [SERIF, MONO] } }
    },
    presets: [
      { name: '黑金悬念', colors: { bg: '#0C0B0A', ink: '#F3EEE3', gold: '#C9A227', dim: '#8A8378' } },
      { name: '墨绿香槟', colors: { bg: '#0E1210', ink: '#E8EFEA', gold: '#B08D57', dim: '#7F8A83' } },
      { name: '深棕铜光', colors: { bg: '#110C0C', ink: '#F2E8E8', gold: '#D8BEC0', dim: '#8A7F7F' } },
      { name: '藏蓝银月', colors: { bg: '#0B0E14', ink: '#E4EAF3', gold: '#9FB6CD', dim: '#7F8794' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1080, defaultWidth: 1080, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'dt-stars', type: 'image', src: starfield(1080, 1080, 70, 'rgba(243,238,227,0.55)', 33), x: 0, y: 0, width: 1080, height: 1080, objectFit: 'fill', zIndex: 1 },
      { id: 'dt-glow', type: 'overlay', background: 'radial-gradient(circle at 50% 42%, rgba(201,162,39,0.16), transparent 55%)', x: 0, y: 0, width: 1080, height: 1080, zIndex: 1 },
      { id: 'dt-frame', type: 'shape', shapeKind: 'rect', x: 60, y: 60, width: 960, height: 960, border: { width: 3, color: { $t: 'colors.gold' } }, opacity: 0.55, zIndex: 2 },
      { id: 'dt-frame-in', type: 'shape', shapeKind: 'rect', x: 78, y: 78, width: 924, height: 924, border: { width: 1, style: 'dashed', color: { $t: 'colors.gold' } }, opacity: 0.35, zIndex: 2 },
      { id: 'dt-kicker', type: 'text', content: 'NEW DROP · 第二次上架', fontFamily: { $t: 'fonts.latin' }, fontSize: 28, letterSpacing: 6, color: { $t: 'colors.gold' }, textAlign: 'center', x: 72, y: 126, width: 936, height: 40, zIndex: 3, editable: { content: true } },
      { id: 'dt-rule', type: 'shape', shapeKind: 'rect', x: 470, y: 186, width: 140, height: 3, fill: { $t: 'colors.gold' }, zIndex: 3 },
      { id: 'dt-name', type: 'text', content: '「不好好睡觉」台灯', fontFamily: { $t: 'fonts.heading' }, fontSize: 46, fontWeight: 700, color: { $t: 'colors.ink' }, textAlign: 'center', x: 72, y: 214, width: 936, height: 66, zIndex: 3, animation: { name: 'fadeInUp', duration: 520 }, editable: { content: true } },
      { id: 'dt-ghost', type: 'text', content: '?', fontFamily: IMPACT, fontSize: 520, color: { $t: 'colors.ink' }, opacity: 0.05, textAlign: 'center', x: 300, y: 230, width: 480, height: 740, zIndex: 2, animation: { name: 'drift', duration: 9000, iterationCount: 'infinite' } },
      { id: 'dt-date', type: 'text', content: '03.28', fontFamily: IMPACT, fontSize: 260, color: { $t: 'colors.ink' }, textAlign: 'center', x: 90, y: 300, width: 900, height: 380, zIndex: 3, animation: { name: 'zoomIn', duration: 560, delay: 130 }, editable: { content: true, fontSize: { type: 'range', min: 180, max: 300 } } },
      { id: 'dt-time', type: 'text', content: '20:00 准时开抢 · 首批只有 200 件', fontFamily: HEI, fontSize: 36, color: { $t: 'colors.gold' }, textAlign: 'center', x: 72, y: 690, width: 936, height: 56, zIndex: 3, animation: { name: 'fadeInUp', duration: 460, delay: 260 }, editable: { content: true } },
      { id: 'dt-rule2', type: 'shape', shapeKind: 'rect', x: 340, y: 762, width: 400, height: 2, fill: { $t: 'colors.dim' }, opacity: 0.6, zIndex: 3 },
      { id: 'dt-hint', type: 'text', content: '这次的东西，我还没敢让我妈看', fontFamily: { $t: 'fonts.heading' }, fontSize: 36, color: { $t: 'colors.ink' }, opacity: 0.9, textAlign: 'center', x: 72, y: 792, width: 936, height: 56, zIndex: 3, editable: { content: true } },
      { id: 'dt-remind', type: 'shape', shapeKind: 'rect', x: 240, y: 872, width: 600, height: 96, borderRadius: 999, border: { width: 3, color: { $t: 'colors.gold' } }, zIndex: 3 },
      { id: 'dt-remind-t', type: 'text', content: '开抢前 10 分钟提醒我', fontFamily: HEI, fontSize: 36, fontWeight: 700, color: { $t: 'colors.gold' }, textAlign: 'center', x: 240, y: 898, width: 600, height: 56, zIndex: 4, animation: { name: 'blink', duration: 2600, iterationCount: 'infinite' }, editable: { content: true } },
      { id: 'dt-foot', type: 'text', content: '剧透到此为止 · 剩下的等开播再说', fontFamily: HEI, fontSize: 28, color: { $t: 'colors.dim' }, textAlign: 'center', x: 72, y: 962, width: 936, height: 44, zIndex: 3, editable: { content: true } },
      { id: 'dt-spark-l', type: 'image', src: star(58, 'rgba(201,162,39,0.85)'), x: 128, y: 330, width: 58, height: 58, objectFit: 'contain', zIndex: 4, animation: { name: 'twinkle', duration: 2800, iterationCount: 'infinite' } },
      { id: 'dt-spark-r', type: 'image', src: star(42, 'rgba(243,238,227,0.7)'), x: 900, y: 560, width: 42, height: 42, objectFit: 'contain', zIndex: 4, animation: { name: 'twinkle', duration: 2400, delay: 700, iterationCount: 'infinite' } }
    ]
  }
]

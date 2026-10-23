// src/core/templates/chinese/chinese-porcelain.ts —— 青花瓷
import type { Template } from '@/types/types'

// 宝相花纹团（青花瓣 + 联珠内圈），随 spinSlow 缓转
const MOTIF_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><g fill="none" stroke="%231e3a8a" stroke-width="3"><circle cx="100" cy="100" r="95" stroke-dasharray="5 7"/><circle cx="100" cy="100" r="62"/><ellipse cx="100" cy="34" rx="12" ry="22"/><ellipse cx="100" cy="34" rx="12" ry="22" transform="rotate(45 100 100)"/><ellipse cx="100" cy="34" rx="12" ry="22" transform="rotate(90 100 100)"/><ellipse cx="100" cy="34" rx="12" ry="22" transform="rotate(135 100 100)"/><ellipse cx="100" cy="34" rx="12" ry="22" transform="rotate(180 100 100)"/><ellipse cx="100" cy="34" rx="12" ry="22" transform="rotate(225 100 100)"/><ellipse cx="100" cy="34" rx="12" ry="22" transform="rotate(270 100 100)"/><ellipse cx="100" cy="34" rx="12" ry="22" transform="rotate(315 100 100)"/><circle cx="100" cy="100" r="15" fill="%231e3a8a"/><circle cx="100" cy="100" r="26" stroke-width="2"/></g></svg>'

// 如意祥云
const CLOUD_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 60"><path d="M14 46 Q 10 30 26 28 Q 26 12 44 12 Q 58 12 60 24 Q 66 14 80 16 Q 96 18 94 32 Q 116 28 122 42 Q 126 52 110 50 L 24 50 Q 14 52 14 46 Z" fill="none" stroke="%231e3a8a" stroke-width="3" opacity="0.55"/><path d="M36 30 Q 44 24 50 32" fill="none" stroke="%231e3a8a" stroke-width="2" opacity="0.55"/></svg>'

// ===== PC_ 前缀：青花瓷专用纹样 =====
// 缠枝边饰：18 组卷草＋花瓣绕盘沿一圈，外联珠内双圈
const PC_RIM_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><g fill="none" stroke="%231e3a8a" stroke-width="2.4" stroke-linecap="round">' + Array.from({ length: 18 }, (_, i) => `<g transform="rotate(${i * 20} 200 200)"><path d="M200 6 Q 214 18 200 32 Q 186 18 200 6 Z"/><path d="M174 24 Q 200 8 226 24" opacity="0.65"/><path d="M186 34 Q 200 28 214 34" opacity="0.5"/><circle cx="200" cy="19" r="2.6" fill="%231e3a8a" stroke="none"/></g>`).join('') + '</g><circle cx="200" cy="200" r="178" fill="none" stroke="%231e3a8a" stroke-width="1.6" stroke-dasharray="3 7" opacity="0.65"/></svg>'
// 冰裂纹：满幅细碎开片
const PC_CRACKLE_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><g fill="none" stroke="%231e3a8a" stroke-width="1" opacity="0.15">' + Array.from({ length: 18 }, (_, i) => `<path d="M${(i * 233) % 900 + 30} ${(i * 419) % 880 + 40} l ${18 + (i % 5) * 13} ${-12 + (i % 4) * 11} l ${-12 + (i % 3) * 17} ${14 + (i % 5) * 8}"/>`).join('') + '</g><g fill="none" stroke="%2360a5fa" stroke-width="1.4" opacity="0.18">' + Array.from({ length: 9 }, (_, i) => `<path d="M${(i * 397) % 860 + 60} ${(i * 613) % 840 + 70} q ${24 + (i % 3) * 10} ${-16 + (i % 4) * 12} ${44 + (i % 2) * 16} ${6 - (i % 3) * 5}"/>`).join('') + '</g></svg>'
// 苏麻离青：钴料浓聚的铁锈斑，压在盘沿一圈
const PC_FLECK_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><g fill="%231e3a8a">' + Array.from({ length: 52 }, (_, i) => { const a = (i * 137.5 * Math.PI) / 180; const r = 248 + (i % 7) * 10; return `<circle cx="${(300 + r * Math.cos(a)).toFixed(1)}" cy="${(300 + r * Math.sin(a)).toFixed(1)}" r="${(1.4 + (i % 4) * 1.1).toFixed(1)}" opacity="${(0.16 + (i % 5) * 0.09).toFixed(2)}"/>` }).join('') + '</g></svg>'
// 开光内折枝：一茎二花
const PC_SPRIG_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 170"><g fill="none" stroke="%231e3a8a" stroke-width="3" stroke-linecap="round"><path d="M60 158 Q 54 108 62 66 Q 66 40 84 24"/><path d="M60 120 Q 34 112 26 88" stroke-width="2.4"/><path d="M62 90 Q 86 84 96 62" stroke-width="2.4"/></g><g fill="none" stroke="%2360a5fa" stroke-width="2.4"><ellipse cx="86" cy="20" rx="9" ry="13"/><ellipse cx="24" cy="84" rx="8" ry="11"/><ellipse cx="98" cy="58" rx="8" ry="11"/></g><g fill="%231e3a8a" opacity="0.75"><circle cx="86" cy="20" r="3.4"/><circle cx="24" cy="84" r="3"/><circle cx="98" cy="58" r="3"/></g></svg>'

export const chinesePorcelainTemplate: Template = {
  id: 'chinese-porcelain-blue', name: '青花缠枝雅韵', version: '1.1.0', category: 'chinese', tags: ['chinese', 'porcelain', 'blue-white', 'ceramic'],
  thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23f5f7fa"/><g fill="none" stroke="%231e3a8a" stroke-width="1.2" opacity="0.4"><path d="M0 6 Q 8 1 16 6 T 32 6 T 48 6 T 64 6 T 80 6 T 96 6"/><path d="M0 96 Q 8 91 16 96 T 32 96 T 48 96 T 64 96 T 80 96 T 96 96"/></g><g fill="none" stroke="%231e3a8a" stroke-width="0.5" opacity="0.18"><path d="M6 20 l 10 8 l -4 10"/><path d="M88 24 l -8 10 l 9 7"/><path d="M14 82 l 9 -7 l 9 6"/></g><circle cx="52" cy="53" r="22" fill="%231e3a8a" opacity="0.08"/><circle cx="50" cy="50" r="22" fill="none" stroke="%231e3a8a" stroke-width="2.8"/><circle cx="50" cy="50" r="17.6" fill="none" stroke="%231e3a8a" stroke-width="0.7" opacity="0.55"/><circle cx="50" cy="50" r="15.2" fill="none" stroke="%231e3a8a" stroke-width="2" stroke-dasharray="3 2.6" opacity="0.5"/><circle cx="50" cy="50" r="11.4" fill="none" stroke="%2360a5fa" stroke-width="0.9" stroke-dasharray="1.5 1.5"/><g fill="none" stroke="%231e3a8a" stroke-width="1"><ellipse cx="50" cy="43" rx="2" ry="3.6"/><ellipse cx="50" cy="43" rx="2" ry="3.6" transform="rotate(60 50 50)"/><ellipse cx="50" cy="43" rx="2" ry="3.6" transform="rotate(120 50 50)"/><ellipse cx="50" cy="43" rx="2" ry="3.6" transform="rotate(180 50 50)"/><ellipse cx="50" cy="43" rx="2" ry="3.6" transform="rotate(240 50 50)"/><ellipse cx="50" cy="43" rx="2" ry="3.6" transform="rotate(300 50 50)"/></g><circle cx="50" cy="50" r="2.4" fill="%231e3a8a"/><g fill="none" stroke="%231e3a8a" stroke-width="1.1" opacity="0.8"><ellipse cx="76" cy="50" rx="1.5" ry="3"/><ellipse cx="24" cy="50" rx="1.5" ry="3"/><ellipse cx="68.4" cy="31.6" rx="1.5" ry="3" transform="rotate(45 68.4 31.6)"/><ellipse cx="31.6" cy="31.6" rx="1.5" ry="3" transform="rotate(-45 31.6 31.6)"/><ellipse cx="68.4" cy="68.4" rx="1.5" ry="3" transform="rotate(45 68.4 68.4)"/><ellipse cx="31.6" cy="68.4" rx="1.5" ry="3" transform="rotate(-45 31.6 68.4)"/></g><g fill="none" stroke="%231e3a8a" stroke-width="1.1"><rect x="6" y="38" width="9" height="16" rx="3"/><rect x="85" y="38" width="9" height="16" rx="3"/></g><g fill="%2360a5fa"><circle cx="10.5" cy="46" r="1.5"/><circle cx="89.5" cy="46" r="1.5"/></g><g fill="%231e3a8a"><rect x="24" y="12" width="40" height="5" rx="1" opacity="0.85"/><rect x="70" y="11" width="7.5" height="7.5" rx="1"/></g><g fill="%231e3a8a" opacity="0.5"><rect x="30" y="79" width="34" height="2.6" rx="1"/><rect x="36" y="85" width="22" height="1.6" rx="0.8"/></g><g fill="%231e3a8a" opacity="0.55"><rect x="12" y="60" width="2.6" height="2.6"/><rect x="12" y="64.5" width="2.6" height="2.6"/><rect x="12" y="69" width="2.6" height="2.6"/><rect x="12" y="73.5" width="2.6" height="2.6"/></g></svg>',
  tokens: {
    colors: {
      bg: { label: '瓷胎', default: '#F5F7FA', options: ['#F5F7FA', '#FFFFFF', '#EEF2F7', '#F7F2E4', '#E9EFF6'] },
      primary: { label: '钴蓝', default: '#1E3A8A', options: ['#1E3A8A', '#1D4ED8', '#2563EB', '#0F4C81', '#2A4B7C'] },
      accent: { label: '淡青', default: '#60A5FA', options: ['#60A5FA', '#93C5FD', '#38BDF8', '#B08968', '#CBD5E1'] }
    },
    fonts: { heading: { label: '标题字体', default: 'STSong, Songti SC, SimSun, serif', options: ['STSong, Songti SC, SimSun, serif', 'STKaiti, KaiTi, serif', 'SimSun, Songti SC, serif'] } }
  },
  presets: [
    { name: '经典钴蓝', colors: { bg: '#F5F7FA', primary: '#1E3A8A', accent: '#60A5FA' } },
    { name: '月白影青', colors: { bg: '#E9EFF6', primary: '#0F4C81', accent: '#93C5FD' } },
    { name: '宣纸暖调', colors: { bg: '#F7F2E4', primary: '#2A4B7C', accent: '#B08968' } },
    { name: '莹白霁青', colors: { bg: '#FFFFFF', primary: '#1D4ED8', accent: '#38BDF8' } }
  ],
  canvas: {
    virtualWidth: 1000, virtualHeight: 1000, defaultWidth: 1000, defaultHeight: 1000, backgroundColor: { $t: 'colors.bg' },
    // 上下海水江崖式波浪锦带 + 底部淡墨晕
    backgroundImage: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000"><defs><pattern id="wave" width="48" height="24" patternUnits="userSpaceOnUse"><path d="M0 24 Q 12 2 24 24 Q 36 2 48 24" fill="none" stroke="%231e3a8a" stroke-width="2.5" opacity="0.55"/></pattern></defs><rect x="0" y="46" width="1000" height="24" fill="url(%23wave)"/><rect x="0" y="930" width="1000" height="24" fill="url(%23wave)"/><circle cx="180" cy="780" r="300" fill="%231e3a8a" opacity="0.05"/><circle cx="860" cy="240" r="220" fill="%231e3a8a" opacity="0.04"/></svg>'
  },
  elements: [
    // 釉面层次：盘体投影 + 满幅开片（冰裂）
    { id: 'plate-shadow', type: 'shape', shapeKind: 'circle', x: 280, y: 268, width: 440, height: 440, fill: 'transparent', shadow: { color: 'rgba(30,58,138,0.28)', blur: 64, offsetX: 0, offsetY: 20 }, opacity: 0.75, zIndex: 1 },
    { id: 'ice-crackle', type: 'image', src: PC_CRACKLE_SVG, x: 0, y: 0, width: 1000, height: 1000, objectFit: 'fill', opacity: 0.75, zIndex: 1 },
    { id: 'plate-outer', type: 'shape', shapeKind: 'circle', x: 280, y: 260, width: 440, height: 440, border: { color: { $t: 'colors.primary' }, width: 10, style: 'solid' }, zIndex: 1 },
    { id: 'plate-rim', type: 'shape', shapeKind: 'circle', x: 310, y: 290, width: 380, height: 380, border: { color: { $t: 'colors.primary' }, width: 1.5 }, opacity: 0.55, zIndex: 1 },
    { id: 'plate-inner', type: 'shape', shapeKind: 'circle', x: 330, y: 310, width: 340, height: 340, border: { color: { $t: 'colors.accent' }, width: 3, style: 'dashed' }, zIndex: 1 },
    // 缠枝边饰一圈 + 苏麻离青浓聚斑
    { id: 'rim-scroll', type: 'image', src: PC_RIM_SVG, x: 290, y: 270, width: 420, height: 420, objectFit: 'contain', opacity: 0.95, zIndex: 1, animation: { name: 'spinSlow', duration: 88000, iterationCount: 'infinite', easing: 'linear' } },
    { id: 'cobalt-fleck', type: 'image', src: PC_FLECK_SVG, x: 295, y: 275, width: 410, height: 410, objectFit: 'contain', zIndex: 2 },
    { id: 'plate-motif', type: 'image', src: MOTIF_SVG, x: 360, y: 340, width: 280, height: 280, objectFit: 'contain', zIndex: 2, animation: { name: 'spinSlow', duration: 36000, iterationCount: 'infinite', easing: 'linear' }, editable: { position: true, size: { type: 'scale' } } },
    // 盘外六瓣青莲
    ...Array.from({ length: 6 }, (_, i) => {
      const a = ((30 + i * 60) * Math.PI) / 180
      return {
        id: 'rim-petal-' + i, type: 'shape' as const, shapeKind: 'circle' as const,
        x: Math.round(500 + 266 * Math.sin(a)) - 11, y: Math.round(480 - 266 * Math.cos(a)) - 24,
        width: 22, height: 48, rotation: 30 + i * 60,
        fill: { $t: 'colors.accent' }, border: { color: { $t: 'colors.primary' }, width: 2 },
        opacity: 0.5, zIndex: 2,
        animation: { name: 'twinkle' as const, duration: 3400 + i * 260, delay: i * 240, iterationCount: 'infinite' as const }
      }
    }),
    // 开光两枚：内绘折枝牡丹
    { id: 'kai-light-l', type: 'shape', shapeKind: 'rect', x: 94, y: 400, width: 124, height: 170, borderRadius: 26, border: { color: { $t: 'colors.primary' }, width: 3 }, opacity: 0.85, zIndex: 1, animation: { name: 'fadeIn', duration: 900, delay: 300 } },
    { id: 'kai-sprig-l', type: 'image', src: PC_SPRIG_SVG, x: 102, y: 414, width: 108, height: 146, objectFit: 'contain', opacity: 0.92, zIndex: 2, animation: { name: 'float', duration: 8600, iterationCount: 'infinite', easing: 'ease-in-out' } },
    { id: 'kai-light-r', type: 'shape', shapeKind: 'rect', x: 782, y: 400, width: 124, height: 170, borderRadius: 26, border: { color: { $t: 'colors.primary' }, width: 3 }, opacity: 0.85, zIndex: 1, animation: { name: 'fadeIn', duration: 900, delay: 450 } },
    { id: 'kai-sprig-r', type: 'image', src: PC_SPRIG_SVG, x: 790, y: 414, width: 108, height: 146, objectFit: 'contain', rotation: 5, opacity: 0.92, zIndex: 2, animation: { name: 'float', duration: 9400, delay: 600, iterationCount: 'infinite', easing: 'ease-in-out' } },
    { id: 'cloud-l', type: 'image', src: CLOUD_SVG, x: 90, y: 200, width: 170, height: 73, objectFit: 'contain', zIndex: 1, animation: { name: 'drift', duration: 9000, iterationCount: 'infinite', easing: 'ease-in-out' } },
    { id: 'cloud-r', type: 'image', src: CLOUD_SVG, x: 750, y: 640, width: 140, height: 60, objectFit: 'contain', opacity: 0.75, zIndex: 1, animation: { name: 'float', duration: 6500, iterationCount: 'infinite', delay: 800, easing: 'ease-in-out' } },
    { id: 'title-main', type: 'text', content: '青花·千年窑火', fontFamily: { $t: 'fonts.heading' }, fontSize: 58, fontWeight: '700', color: { $t: 'colors.primary' }, letterSpacing: 12, textAlign: 'center', x: 150, y: 120, width: 700, height: 84, zIndex: 3, animation: { name: 'inkReveal', duration: 1400 }, editable: { content: true, fontSize: { type: 'range', min: 40, max: 76 }, position: true } },
    { id: 'seal', type: 'shape', shapeKind: 'rect', x: 812, y: 128, width: 44, height: 44, fill: { $t: 'colors.primary' }, borderRadius: 6, zIndex: 3, animation: { name: 'zoomIn', duration: 500, delay: 1500 } },
    { id: 'seal-text', type: 'text', content: '珍', fontFamily: { $t: 'fonts.heading' }, fontSize: 26, fontWeight: '700', color: '#FFFFFF', textAlign: 'center', x: 812, y: 134, width: 44, height: 40, zIndex: 4, editable: { content: true } },
    { id: 'kiln-mark', type: 'text', content: '宣\n德\n年\n制', fontFamily: { $t: 'fonts.heading' }, fontSize: 22, fontWeight: '500', color: { $t: 'colors.primary' }, opacity: 0.55, lineHeight: 1.35, textAlign: 'center', x: 96, y: 600, width: 26, height: 120, zIndex: 3, animation: { name: 'inkReveal', duration: 1200, delay: 900 }, editable: { content: true } },
    { id: 'title-sub', type: 'text', content: '素胚勾勒 · 笔锋浓转淡', fontFamily: { $t: 'fonts.heading' }, fontSize: 26, fontWeight: '500', color: { $t: 'colors.accent' }, letterSpacing: 8, textAlign: 'center', x: 250, y: 760, width: 500, height: 40, zIndex: 2, animation: { name: 'fadeInUp', duration: 900, delay: 500 }, editable: { content: true } },
    { id: 'title-en', type: 'text', content: 'BLUE AND WHITE PORCELAIN', fontFamily: 'Georgia, serif', fontSize: 16, fontWeight: '400', color: { $t: 'colors.primary' }, letterSpacing: 8, textAlign: 'center', x: 250, y: 820, width: 500, height: 30, zIndex: 2, opacity: 0.6, editable: { content: true } }
  ]
}

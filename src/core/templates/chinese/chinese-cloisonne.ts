// src/core/templates/chinese/chinese-cloisonne.ts —— 景泰蓝掐丝
import type { Template } from '@/types/types'

// 掐丝缠枝莲纹盘心
const MEDALLION_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="360" height="360" viewBox="0 0 360 360"><g fill="none" stroke="%23fbbf24" stroke-width="3" opacity="0.95"><circle cx="180" cy="180" r="150"/><circle cx="180" cy="180" r="118"/></g><g fill="%23e0f2fe" stroke="%23f59e0b" stroke-width="2.5"><path d="M180 90 Q 210 120 180 150 Q 150 120 180 90"/><path d="M270 180 Q 240 210 210 180 Q 240 150 270 180"/><path d="M180 270 Q 150 240 180 210 Q 210 240 180 270"/><path d="M90 180 Q 120 150 150 180 Q 120 210 90 180"/></g><circle cx="180" cy="180" r="26" fill="%23fde68a" stroke="%23b45309" stroke-width="3"/></svg>'
// 联珠纹环（旋转背光）
const BEAD_RING_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="480" height="480" viewBox="0 0 480 480"><g fill="%23d97706">'
  + Array.from({ length: 24 }, (_, i) => { const a = (i * Math.PI * 2) / 24; const cx = 240 + 218 * Math.cos(a); const cy = 240 + 218 * Math.sin(a); return `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="7"/>`; }).join('')
  + '</g></svg>'
// 如意云头纹边角
const CLOUD_CORNER_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180"><g fill="none" stroke="%23f59e0b" stroke-width="4" stroke-linecap="round"><path d="M20 150 Q 20 90 70 80 Q 60 40 100 34 Q 138 30 142 66 Q 172 74 164 110"/><path d="M100 34 Q 96 60 118 66"/><circle cx="70" cy="80" r="9" fill="%23155e75"/><circle cx="142" cy="66" r="9" fill="%23155e75"/></g></svg>'
// 珐琅釉地缠枝底纹
const ENAMEL_BG_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000"><g fill="none" stroke="%23d97706" stroke-width="2" opacity="0.35"><rect x="40" y="40" width="920" height="920" rx="20"/><rect x="64" y="64" width="872" height="872" rx="14"/></g><g fill="none" stroke="%237dd3fc" stroke-width="2" opacity="0.25"><path d="M100 940 Q 160 880 100 820 Q 40 880 100 940"/><path d="M900 940 Q 960 880 900 820 Q 840 880 900 940"/><path d="M100 180 Q 160 120 100 60 M900 180 Q 960 120 900 60"/></g><g fill="%23fbbf24" opacity="0.16"><circle cx="200" cy="200" r="3"/><circle cx="800" cy="200" r="3"/><circle cx="500" cy="120" r="3"/><circle cx="180" cy="560" r="3"/><circle cx="820" cy="560" r="3"/></g></svg>'

export const chineseCloisonneTemplate: Template = {
  id: 'chinese-cloisonne-enamel', name: '景泰蓝掐丝', version: '1.1.0', category: 'chinese', tags: ['chinese', 'cloisonne', 'enamel', 'gold'],
  thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%230c4a6e"/><circle cx="50" cy="50" r="26" fill="none" stroke="%23d97706" stroke-width="3"/><circle cx="50" cy="50" r="14" fill="%23155e75" stroke="%23fbbf24" stroke-width="2"/></svg>',
  tokens: {
    colors: {
      bg: { label: '景泰蓝', default: '#0C4A6E', options: ['#0C4A6E', '#075985', '#155E75', '#064E3B', '#4C1D95'] },
      primary: { label: '鎏金', default: '#D97706', options: ['#D97706', '#F59E0B', '#B45309', '#FBBF24', '#EAB308'] },
      accent: { label: '宝蓝', default: '#1D4ED8', options: ['#1D4ED8', '#2563EB', '#1E40AF', '#0891B2', '#7C3AED'] },
      extra: { label: '釉红', default: '#BE123C', options: ['#BE123C', '#E11D48', '#9F1239', '#F97316', '#DB2777'] }
    },
    fonts: { heading: { label: '标题字体', default: 'STSong, Songti SC, SimSun, serif', options: ['STSong, Songti SC, SimSun, serif', 'STKaiti, KaiTi, serif', 'SimHei, sans-serif'] } }
  },
  presets: [
    { name: '景泰鎏金', colors: { bg: '#0C4A6E', primary: '#D97706', accent: '#1D4ED8', extra: '#BE123C' } },
    { name: '孔雀翠羽', colors: { bg: '#064E3B', primary: '#FBBF24', accent: '#0891B2', extra: '#DB2777' } },
    { name: '茄皮紫釉', colors: { bg: '#4C1D95', primary: '#EAB308', accent: '#7C3AED', extra: '#F97316' } },
    { name: '琉璃赤金', colors: { bg: '#155E75', primary: '#F59E0B', accent: '#1E40AF', extra: '#E11D48' } }
  ],
  canvas: {
    virtualWidth: 1000, virtualHeight: 1000, defaultWidth: 1000, defaultHeight: 1000, backgroundColor: { $t: 'colors.bg' },
    backgroundImage: ENAMEL_BG_SVG
  },
  elements: [
    { id: 'bead-ring', type: 'image', src: BEAD_RING_SVG, objectFit: 'contain', x: 260, y: 140, width: 480, height: 480, opacity: 0.9, zIndex: 1, animation: { name: 'spinSlow', duration: 56000, iterationCount: 'infinite' }, editable: { position: true, size: { type: 'scale' } } },
    { id: 'ring-outer', type: 'shape', shapeKind: 'circle', x: 290, y: 170, width: 420, height: 420, border: { color: { $t: 'colors.primary' }, width: 6, style: 'solid' }, zIndex: 2 },
    { id: 'ring-mid', type: 'shape', shapeKind: 'circle', x: 340, y: 220, width: 320, height: 320, border: { color: { $t: 'colors.accent' }, width: 22, style: 'solid' }, zIndex: 2 },
    { id: 'medallion', type: 'image', src: MEDALLION_SVG, objectFit: 'contain', x: 415, y: 295, width: 170, height: 170, zIndex: 3, animation: { name: 'shimmer', duration: 4600, iterationCount: 'infinite' }, editable: { position: true, size: { type: 'scale' } } },
    { id: 'core-char', type: 'text', content: '蓝', fontFamily: { $t: 'fonts.heading' }, fontSize: 96, fontWeight: '900', color: { $t: 'colors.extra' }, textAlign: 'center', x: 415, y: 325, width: 170, height: 120, zIndex: 4, animation: { name: 'glow', duration: 1600, iterationCount: 'infinite' }, editable: { content: true } },
    { id: 'petal-l', type: 'shape', shapeKind: 'circle', x: 200, y: 360, width: 44, height: 44, fill: { $t: 'colors.accent' }, border: { color: { $t: 'colors.primary' }, width: 3 }, zIndex: 2, animation: { name: 'float', duration: 6000, iterationCount: 'infinite' } },
    { id: 'petal-r', type: 'shape', shapeKind: 'circle', x: 756, y: 360, width: 44, height: 44, fill: { $t: 'colors.accent' }, border: { color: { $t: 'colors.primary' }, width: 3 }, zIndex: 2, animation: { name: 'float', duration: 6000, delay: 900, iterationCount: 'infinite' } },
    { id: 'corner-1', group: 'corner-', type: 'image', src: CLOUD_CORNER_SVG, objectFit: 'contain', x: 44, y: 44, width: 150, height: 150, opacity: 0.85, zIndex: 2 },
    { id: 'corner-2', group: 'corner-', type: 'image', src: CLOUD_CORNER_SVG, objectFit: 'contain', x: 806, y: 44, width: 150, height: 150, rotation: 90, opacity: 0.85, zIndex: 2 },
    { id: 'corner-3', group: 'corner-', type: 'image', src: CLOUD_CORNER_SVG, objectFit: 'contain', x: 806, y: 806, width: 150, height: 150, rotation: 180, opacity: 0.85, zIndex: 2 },
    { id: 'corner-4', group: 'corner-', type: 'image', src: CLOUD_CORNER_SVG, objectFit: 'contain', x: 44, y: 806, width: 150, height: 150, rotation: 270, opacity: 0.85, zIndex: 2 },
    { id: 'title-main', type: 'text', content: '景泰蓝 · 掐丝珐琅', fontFamily: { $t: 'fonts.heading' }, fontSize: 64, fontWeight: '900', color: { $t: 'colors.primary' }, letterSpacing: 12, textAlign: 'center', x: 150, y: 660, width: 700, height: 100, zIndex: 5, shadow: { color: 'rgba(0,0,0,0.55)', blur: 16, offsetX: 0, offsetY: 6 }, animation: { name: 'inkReveal', duration: 1500 }, editable: { content: true, fontSize: { type: 'range', min: 44, max: 84 }, position: true } },
    { id: 'title-en', type: 'text', content: 'CLOISONNÉ ENAMEL OF THE MING COURT', fontFamily: 'Georgia, serif', fontSize: 17, fontWeight: '400', color: '#7DD3FC', letterSpacing: 5, textAlign: 'center', x: 220, y: 790, width: 560, height: 30, zIndex: 5, animation: { name: 'fadeIn', duration: 1000, delay: 900 }, editable: { content: true } }
  ]
}

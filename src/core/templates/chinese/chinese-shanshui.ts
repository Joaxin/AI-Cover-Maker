// src/core/templates/chinese/chinese-shanshui.ts —— 青绿山水
import type { Template } from '@/types/types'

// 远山层叠（淡墨青绿剪影）
const PEAKS_FAR_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="400" viewBox="0 0 1000 400"><path d="M-20 400 L140 140 L260 300 L360 180 L480 400 Z" fill="%2394cdb8" opacity="0.5"/><path d="M380 400 L560 90 L680 260 L780 150 L1020 400 Z" fill="%236ab39a" opacity="0.45"/></svg>'
// 近岭层（石青设色）
const PEAKS_NEAR_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="460" viewBox="0 0 1000 460"><path d="M-30 460 L180 120 L330 340 L470 60 L640 360 L760 200 L1030 460 Z" fill="%230f766e" opacity="0.92"/><path d="M-30 460 L180 120 L240 220 L150 460 Z" fill="%23115e59" opacity="0.85"/><path d="M470 60 L560 210 L470 360 L400 240 Z" fill="%23134e4a" opacity="0.7"/><path d="M760 200 L1030 460 L820 460 Z" fill="%23115e59" opacity="0.8"/></svg>'
// 流云烟带
const MIST_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="80" viewBox="0 0 600 80"><path d="M10 50 Q 90 18 180 42 T 360 38 T 590 46" fill="none" stroke="%23ffffff" stroke-width="16" stroke-linecap="round" opacity="0.75"/><path d="M40 66 Q 150 40 260 58 T 560 56" fill="none" stroke="%23e7f3ee" stroke-width="9" stroke-linecap="round" opacity="0.6"/></svg>'
// 归雁一行
const BIRDS_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="320" height="120" viewBox="0 0 320 120"><g fill="none" stroke="%2342506a" stroke-width="4" stroke-linecap="round"><path d="M20 60 Q 38 40 56 58 M56 58 Q 74 40 92 60"/><path d="M130 30 Q 145 15 160 29 M160 29 Q 175 15 190 31"/><path d="M225 66 Q 238 53 251 65 M251 65 Q 264 53 277 67"/></g></svg>'
// 绢本皴理底纹
const SILK_TEXTURE_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000"><g stroke="%23b8ad93" stroke-width="1" opacity="0.18"><line x1="0" y1="60" x2="1000" y2="64"/><line x1="0" y1="190" x2="1000" y2="186"/><line x1="0" y1="330" x2="1000" y2="336"/><line x1="0" y1="470" x2="1000" y2="466"/><line x1="0" y1="610" x2="1000" y2="616"/><line x1="0" y1="755" x2="1000" y2="750"/></g><g fill="%238a7f66" opacity="0.08"><circle cx="120" cy="140" r="2"/><circle cx="640" cy="90" r="1.6"/><circle cx="880" cy="420" r="2.2"/><circle cx="300" cy="560" r="1.8"/><circle cx="720" cy="700" r="2"/></g></svg>'

export const chineseShanshuiTemplate: Template = {
  id: 'chinese-blue-green-shanshui', name: '青绿山水千里意', version: '1.1.0', category: 'chinese', tags: ['chinese', 'landscape', 'shanshui', 'teal'],
  thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23f3efe4"/><path d="M0 80 L30 45 L55 80 Z" fill="%230f766e"/><path d="M35 85 L65 38 L100 85 Z" fill="%23115e59"/><circle cx="76" cy="24" r="9" fill="%23b45309"/></svg>',
  tokens: {
    colors: {
      bg: { label: '绢素', default: '#F3EFE4', options: ['#F3EFE4', '#EFE9D9', '#F7F4EA', '#E9E4F2', '#E4EEF0'] },
      primary: { label: '石青', default: '#0F766E', options: ['#0F766E', '#115E59', '#134E4A', '#6D28D9', '#0369A1'] },
      accent: { label: '赭金', default: '#B45309', options: ['#B45309', '#92400E', '#D97706', '#B91C1C', '#0E7490'] },
      ink: { label: '题跋墨色', default: '#57534E', options: ['#57534E', '#5B4A63', '#4A6670', '#6B5B3E'] },
      seal: { label: '印泥朱', default: '#991B1B', options: ['#991B1B', '#7F1D1D', '#9F1239', '#B91C1C'] }
    },
    fonts: { heading: { label: '标题字体', default: 'STKaiti, KaiTi, serif', options: ['STKaiti, KaiTi, serif', 'STSong, Songti SC, SimSun, serif', 'SimSun, Songti SC, serif'] } }
  },
  presets: [
    { name: '千里青绿', colors: { bg: '#F3EFE4', primary: '#0F766E', accent: '#B45309', ink: '#57534E', seal: '#991B1B' } },
    { name: '暮山紫翠', colors: { bg: '#E9E4F2', primary: '#6D28D9', accent: '#B91C1C', ink: '#5B4A63', seal: '#7F1D1D' } },
    { name: '雨过天青', colors: { bg: '#E4EEF0', primary: '#0369A1', accent: '#0E7490', ink: '#4A6670', seal: '#9F1239' } },
    { name: '层峦流金', colors: { bg: '#EFE9D9', primary: '#115E59', accent: '#D97706', ink: '#6B5B3E', seal: '#B91C1C' } }
  ],
  canvas: {
    virtualWidth: 1000, virtualHeight: 1000, defaultWidth: 1000, defaultHeight: 1000, backgroundColor: { $t: 'colors.bg' },
    backgroundImage: `${SILK_TEXTURE_SVG}`
  },
  elements: [
    { id: 'peaks-far', type: 'image', src: PEAKS_FAR_SVG, objectFit: 'contain', x: 0, y: 430, width: 1000, height: 400, opacity: 0.8, zIndex: 0, animation: { name: 'drift', duration: 26000, iterationCount: 'infinite' } },
    { id: 'sun-halo', type: 'shape', shapeKind: 'circle', x: 668, y: 100, width: 174, height: 174, border: { color: { $t: 'colors.accent' }, width: 2, style: 'dashed' }, opacity: 0.6, zIndex: 1, animation: { name: 'spinSlow', duration: 40000, iterationCount: 'infinite' } },
    { id: 'sun', type: 'shape', shapeKind: 'circle', x: 700, y: 132, width: 110, height: 110, fill: { $t: 'colors.accent' }, opacity: 0.9, zIndex: 1, animation: { name: 'shimmer', duration: 5200, iterationCount: 'infinite' } },
    { id: 'birds', type: 'image', src: BIRDS_SVG, objectFit: 'contain', x: 560, y: 240, width: 320, height: 120, zIndex: 1, animation: { name: 'slideInLeft', duration: 2200, delay: 600 } },
    { id: 'peaks-near', type: 'image', src: PEAKS_NEAR_SVG, objectFit: 'contain', x: 0, y: 560, width: 1000, height: 440, zIndex: 1, editable: { position: true, size: { type: 'scale' } } },
    { id: 'mist-1', type: 'image', src: MIST_SVG, objectFit: 'contain', x: 40, y: 520, width: 600, height: 80, zIndex: 2, animation: { name: 'drift', duration: 16000, iterationCount: 'infinite' } },
    { id: 'mist-2', type: 'image', src: MIST_SVG, objectFit: 'contain', x: 420, y: 640, width: 540, height: 72, zIndex: 2, animation: { name: 'drift', duration: 21000, delay: 1200, iterationCount: 'infinite' } },
    { id: 'scroll-frame', type: 'shape', shapeKind: 'rect', x: 36, y: 36, width: 928, height: 928, border: { color: { $t: 'colors.primary' }, width: 3, style: 'solid' }, borderRadius: 6, opacity: 0.35, zIndex: 3 },
    { id: 'title-main', type: 'text', content: '只此青绿', fontFamily: { $t: 'fonts.heading' }, fontSize: 100, fontWeight: '900', color: { $t: 'colors.primary' }, letterSpacing: 20, textAlign: 'center', x: 180, y: 120, width: 480, height: 150, zIndex: 4, animation: { name: 'inkReveal', duration: 1600 }, editable: { content: true, fontSize: { type: 'range', min: 70, max: 130 }, position: true } },
    { id: 'title-sub', type: 'text', content: '山远天低 · 烟云苍翠', fontFamily: { $t: 'fonts.heading' }, fontSize: 26, fontWeight: '500', color: { $t: 'colors.ink' }, letterSpacing: 8, textAlign: 'center', x: 220, y: 300, width: 400, height: 40, zIndex: 4, animation: { name: 'fadeIn', duration: 1000, delay: 800 }, editable: { content: true } },
    { id: 'seal-small', type: 'shape', shapeKind: 'rect', x: 668, y: 302, width: 34, height: 34, fill: { $t: 'colors.seal' }, borderRadius: 4, zIndex: 4, animation: { name: 'fadeIn', duration: 800, delay: 1400 } },
    { id: 'seal-char', type: 'text', content: '印', fontFamily: 'STKaiti, KaiTi, serif', fontSize: 22, fontWeight: '700', color: '#FFFFFF', textAlign: 'center', x: 668, y: 307, width: 34, height: 26, zIndex: 5, animation: { name: 'fadeIn', duration: 800, delay: 1600 }, editable: { content: true } },
    { id: 'footer-poem', type: 'text', content: '江流天地外 山色有无中', fontFamily: { $t: 'fonts.heading' }, fontSize: 30, fontWeight: '700', color: { $t: 'colors.primary' }, letterSpacing: 6, textAlign: 'center', x: 300, y: 880, width: 400, height: 50, zIndex: 3, animation: { name: 'fadeInUp', duration: 1200, delay: 1000 }, editable: { content: true } }
  ]
}

// src/core/templates/chinese/chinese-seal.ts —— 篆刻印章
import type { Template } from '@/types/types'

// 印面冲砂边栏肌理
const SEAL_TEXTURE_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 340"><g fill="%23f2ead9"><circle cx="18" cy="60" r="3"/><circle cx="322" cy="96" r="4"/><circle cx="60" cy="322" r="3"/><circle cx="290" cy="290" r="3"/><circle cx="330" cy="20" r="5"/><circle cx="20" cy="330" r="4"/><circle cx="170" cy="12" r="2.5"/><circle cx="328" cy="170" r="2.5"/></g><path d="M8 8 H332 V332 H8 Z" fill="none" stroke="%23f2ead9" stroke-width="10" stroke-dasharray="60 14 30 10" opacity="0.8"/></svg>'

// 缠枝纹边饰带
const VINE_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 40"><g fill="none" stroke="%238b7355" stroke-width="2.5" opacity="0.7"><path d="M0 20 Q 25 0 50 20 T 100 20 T 150 20 T 200 20 T 250 20 T 300 20"/><circle cx="50" cy="20" r="4" fill="%238b7355"/><circle cx="150" cy="20" r="4" fill="%238b7355"/><circle cx="250" cy="20" r="4" fill="%238b7355"/></g></svg>'

export const chineseSealTemplate: Template = {
  id: 'chinese-seal-stone', name: '方寸篆刻', version: '1.1.0', category: 'chinese', tags: ['chinese', 'seal', 'calligraphy', 'vermilion'],
  thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23f2ead9"/><rect x="28" y="28" width="44" height="44" rx="4" fill="%23991b1b"/><rect x="38" y="38" width="6" height="24" fill="%23f2ead9"/><rect x="56" y="38" width="6" height="24" fill="%23f2ead9"/></svg>',
  tokens: {
    colors: {
      bg: { label: '旧纸', default: '#F2EAD9', options: ['#F2EAD9', '#EDE3CF', '#F7F0E3', '#E9DCC5', '#EDE7DA'] },
      primary: { label: '印泥朱', default: '#991B1B', options: ['#991B1B', '#B91C1C', '#7F1D1D', '#1C1917', '#7C2D12'] },
      accent: { label: '墨', default: '#292524', options: ['#292524', '#1C1917', '#44403C', '#57534E'] }
    },
    fonts: { heading: { label: '标题字体', default: 'STSong, Songti SC, SimSun, serif', options: ['STSong, Songti SC, SimSun, serif', 'STKaiti, KaiTi, serif', 'SimSun, Songti SC, serif'] } }
  },
  presets: [
    { name: '朱砂印泥', colors: { bg: '#F2EAD9', primary: '#991B1B', accent: '#292524' } },
    { name: '玄墨古拓', colors: { bg: '#EDE7DA', primary: '#1C1917', accent: '#57534E' } },
    { name: '赭石旧札', colors: { bg: '#E9DCC5', primary: '#7C2D12', accent: '#44403C' } },
    { name: '朱文小印', colors: { bg: '#F7F0E3', primary: '#B91C1C', accent: '#1C1917' } }
  ],
  canvas: {
    virtualWidth: 1000, virtualHeight: 1000, defaultWidth: 1000, defaultHeight: 1000, backgroundColor: { $t: 'colors.bg' },
    // 纸面纤维斑点肌理
    backgroundImage: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000"><g fill="%238b7355" opacity="0.10"><circle cx="120" cy="90" r="2"/><circle cx="420" cy="60" r="1.5"/><circle cx="760" cy="140" r="2"/><circle cx="900" cy="380" r="1.5"/><circle cx="80" cy="480" r="2"/><circle cx="300" cy="720" r="1.5"/><circle cx="640" cy="860" r="2"/><circle cx="920" cy="700" r="1.5"/><circle cx="520" cy="300" r="1.5"/><circle cx="180" cy="900" r="2"/></g></svg>'
  },
  elements: [
    { id: 'seal-big', type: 'shape', shapeKind: 'rect', x: 330, y: 170, width: 340, height: 340, fill: { $t: 'colors.primary' }, borderRadius: 18, zIndex: 1, animation: { name: 'inkReveal', duration: 1300 }, shadow: { offsetX: 0, offsetY: 10, blur: 26, color: 'rgba(60,20,10,0.35)' } },
    { id: 'seal-texture', type: 'image', src: SEAL_TEXTURE_SVG, x: 330, y: 170, width: 340, height: 340, objectFit: 'contain', zIndex: 2 },
    { id: 'seal-grid-v', type: 'shape', shapeKind: 'rect', x: 500, y: 210, width: 2, height: 260, border: { color: { $t: 'colors.bg' }, width: 2 }, opacity: 0.55, zIndex: 2 },
    { id: 'seal-grid-h', type: 'shape', shapeKind: 'line', x: 370, y: 340, width: 260, height: 2, border: { color: { $t: 'colors.bg' }, width: 2 }, opacity: 0.55, zIndex: 2 },
    { id: 'seal-char-1', type: 'text', content: '戒', fontFamily: { $t: 'fonts.heading' }, fontSize: 118, fontWeight: '900', color: { $t: 'colors.bg' }, textAlign: 'center', x: 366, y: 210, width: 130, height: 130, zIndex: 3, animation: { name: 'fadeIn', duration: 700, delay: 800 }, editable: { content: true } },
    { id: 'seal-char-2', type: 'text', content: '定', fontFamily: { $t: 'fonts.heading' }, fontSize: 118, fontWeight: '900', color: { $t: 'colors.bg' }, textAlign: 'center', x: 504, y: 210, width: 130, height: 130, zIndex: 3, animation: { name: 'fadeIn', duration: 700, delay: 1000 }, editable: { content: true } },
    { id: 'seal-char-3', type: 'text', content: '生', fontFamily: { $t: 'fonts.heading' }, fontSize: 118, fontWeight: '900', color: { $t: 'colors.bg' }, textAlign: 'center', x: 366, y: 342, width: 130, height: 130, zIndex: 3, animation: { name: 'fadeIn', duration: 700, delay: 1200 }, editable: { content: true } },
    { id: 'seal-char-4', type: 'text', content: '慧', fontFamily: { $t: 'fonts.heading' }, fontSize: 118, fontWeight: '900', color: { $t: 'colors.bg' }, textAlign: 'center', x: 504, y: 342, width: 130, height: 130, zIndex: 3, animation: { name: 'fadeIn', duration: 700, delay: 1400 }, editable: { content: true } },
    { id: 'vine-l', type: 'image', src: VINE_SVG, x: 60, y: 585, width: 260, height: 35, objectFit: 'contain', zIndex: 2 },
    { id: 'vine-r', type: 'image', src: VINE_SVG, x: 680, y: 585, width: 260, height: 35, objectFit: 'contain', zIndex: 2 },
    { id: 'side-title', type: 'text', content: '方寸之间 · 金石千秋', fontFamily: { $t: 'fonts.heading' }, fontSize: 40, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 10, textAlign: 'center', x: 200, y: 640, width: 600, height: 70, zIndex: 2, animation: { name: 'fadeInUp', duration: 900, delay: 600 }, editable: { content: true, fontSize: { type: 'range', min: 28, max: 56 }, position: true } },
    { id: 'side-en', type: 'text', content: 'THE ART OF CHINESE SEAL CARVING', fontFamily: 'Georgia, serif', fontSize: 16, fontWeight: '400', color: { $t: 'colors.accent' }, opacity: 0.65, letterSpacing: 5, textAlign: 'center', x: 220, y: 740, width: 560, height: 30, zIndex: 2, editable: { content: true } },
    { id: 'mini-seal', type: 'shape', shapeKind: 'circle', x: 790, y: 790, width: 56, height: 56, fill: { $t: 'colors.primary' }, zIndex: 2, animation: { name: 'pulse', duration: 3200, iterationCount: 'infinite', easing: 'ease-in-out' } },
    { id: 'mini-seal-text', type: 'text', content: '印', fontFamily: { $t: 'fonts.heading' }, fontSize: 30, fontWeight: '700', color: { $t: 'colors.bg' }, textAlign: 'center', x: 790, y: 800, width: 56, height: 40, zIndex: 3, editable: { content: true } }
  ]
}

// src/core/templates/chinese/chinese-shanghai.ts —— 老上海月份牌
import type { Template } from '@/types/types'

// Art Deco 扇形光芒（spinSlow 极缓转，营造霓虹旋转感）
const SUNBURST_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><g fill="%23b45309" opacity="0.5"><path d="M100 100 L88 8 L112 8 Z"/><path d="M100 100 L88 8 L112 8 Z" transform="rotate(30 100 100)"/><path d="M100 100 L88 8 L112 8 Z" transform="rotate(60 100 100)"/><path d="M100 100 L88 8 L112 8 Z" transform="rotate(90 100 100)"/><path d="M100 100 L88 8 L112 8 Z" transform="rotate(120 100 100)"/><path d="M100 100 L88 8 L112 8 Z" transform="rotate(150 100 100)"/><path d="M100 100 L88 8 L112 8 Z" transform="rotate(180 100 100)"/><path d="M100 100 L88 8 L112 8 Z" transform="rotate(210 100 100)"/><path d="M100 100 L88 8 L112 8 Z" transform="rotate(240 100 100)"/><path d="M100 100 L88 8 L112 8 Z" transform="rotate(270 100 100)"/><path d="M100 100 L88 8 L112 8 Z" transform="rotate(300 100 100)"/><path d="M100 100 L88 8 L112 8 Z" transform="rotate(330 100 100)"/></g></svg>'

// 装饰艺术边角扇纹
const CORNER_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><g fill="none" stroke="%23b45309" stroke-width="3"><path d="M6 74 L6 40 L40 40"/><path d="M6 58 L24 58 L24 74" fill="%23b45309" stroke="none" opacity="0.6"/><path d="M14 74 L14 48 L48 48" opacity="0.5"/></g></svg>'

export const chineseShanghaiTemplate: Template = {
  id: 'chinese-shanghai-vintage', name: '老上海月份牌', version: '1.1.0', category: 'chinese', tags: ['chinese', 'shanghai', 'art-deco', 'vintage', 'poster'],
  thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23fdf3dc"/><rect x="15" y="15" width="70" height="70" fill="none" stroke="%239f1239" stroke-width="3"/><circle cx="50" cy="38" r="12" fill="%239f1239"/><rect x="28" y="58" width="44" height="5" fill="%23b45309"/></svg>',
  tokens: {
    colors: {
      bg: { label: '米黄纸', default: '#FDF3DC', options: ['#FDF3DC', '#FAEBCC', '#F5E6C8', '#EAF4F1', '#F2E4EE'] },
      primary: { label: '洋红', default: '#9F1239', options: ['#9F1239', '#BE123C', '#881337', '#0F5E56', '#4C1D95'] },
      accent: { label: '焦糖金', default: '#B45309', options: ['#B45309', '#D97706', '#92400E', '#C0902F'] }
    },
    fonts: { heading: { label: '标题字体', default: 'SimHei, STHeiti, sans-serif', options: ['SimHei, STHeiti, sans-serif', 'STSong, Songti SC, SimSun, serif', 'Microsoft YaHei, sans-serif'] } }
  },
  presets: [
    { name: '象牙洋红', colors: { bg: '#FDF3DC', primary: '#9F1239', accent: '#B45309' } },
    { name: '孔雀年代', colors: { bg: '#EAF4F1', primary: '#0F5E56', accent: '#C0902F' } },
    { name: '紫罗兰夜', colors: { bg: '#F2E4EE', primary: '#4C1D95', accent: '#B45309' } },
    { name: '琥珀留声', colors: { bg: '#F5E6C8', primary: '#881337', accent: '#D97706' } }
  ],
  canvas: {
    virtualWidth: 1000, virtualHeight: 1000, defaultWidth: 1000, defaultHeight: 1000, backgroundColor: { $t: 'colors.bg' },
    backgroundImage: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000"><g opacity="0.12"><path d="M500 0 L560 420 L500 460 L440 420 Z" fill="%23b45309"/><path d="M1000 500 L580 560 L540 500 L580 440 Z" fill="%23b45309"/><path d="M500 1000 L560 580 L500 540 L440 580 Z" fill="%23b45309"/><path d="M0 500 L420 560 L460 500 L420 440 Z" fill="%23b45309"/></g></svg>'
  },
  elements: [
    { id: 'deco-sunburst', type: 'image', src: SUNBURST_SVG, x: 330, y: 100, width: 340, height: 340, objectFit: 'contain', zIndex: 1, animation: { name: 'spinSlow', duration: 80000, iterationCount: 'infinite', easing: 'linear' }, editable: { position: true, size: { type: 'scale' } } },
    { id: 'deco-frame', type: 'shape', shapeKind: 'rect', x: 60, y: 60, width: 880, height: 880, border: { color: { $t: 'colors.primary' }, width: 6, style: 'double' }, zIndex: 4 },
    { id: 'corner-tl', type: 'image', src: CORNER_SVG, x: 70, y: 70, width: 70, height: 70, objectFit: 'contain', zIndex: 5 },
    { id: 'corner-tr', type: 'image', src: CORNER_SVG, x: 860, y: 70, width: 70, height: 70, objectFit: 'contain', rotation: 90, zIndex: 5 },
    { id: 'corner-bl', type: 'image', src: CORNER_SVG, x: 70, y: 860, width: 70, height: 70, objectFit: 'contain', rotation: -90, zIndex: 5 },
    { id: 'corner-br', type: 'image', src: CORNER_SVG, x: 860, y: 860, width: 70, height: 70, objectFit: 'contain', rotation: 180, zIndex: 5 },
    { id: 'arc-badge', type: 'shape', shapeKind: 'circle', x: 390, y: 160, width: 220, height: 220, fill: { $t: 'colors.primary' }, zIndex: 2, animation: { name: 'shimmer', duration: 4200, iterationCount: 'infinite', easing: 'ease-in-out' } },
    { id: 'arc-badge-ring', type: 'shape', shapeKind: 'circle', x: 402, y: 172, width: 196, height: 196, border: { color: { $t: 'colors.bg' }, width: 2, style: 'dashed' }, zIndex: 2 },
    { id: 'arc-badge-text', type: 'text', content: '上海', fontFamily: { $t: 'fonts.heading' }, fontSize: 80, fontWeight: '900', color: { $t: 'colors.bg' }, textAlign: 'center', x: 390, y: 212, width: 220, height: 120, zIndex: 3, editable: { content: true } },
    { id: 'title-main', type: 'text', content: '夜 半 歌 舞 厅', fontFamily: { $t: 'fonts.heading' }, fontSize: 88, fontWeight: '900', color: { $t: 'colors.primary' }, letterSpacing: 12, textAlign: 'center', x: 130, y: 480, width: 740, height: 130, zIndex: 2, animation: { name: 'inkReveal', duration: 1400 }, editable: { content: true, fontSize: { type: 'range', min: 60, max: 110 }, position: true } },
    { id: 'title-en', type: 'text', content: 'SHANGHAI · PARADANCE BALLROOM · 1930', fontFamily: 'Georgia, serif', fontSize: 20, fontWeight: '400', color: { $t: 'colors.accent' }, letterSpacing: 6, textAlign: 'center', x: 155, y: 640, width: 690, height: 30, zIndex: 2, animation: { name: 'fadeInUp', duration: 800, delay: 700 }, editable: { content: true } },
    { id: 'band-left', type: 'shape', shapeKind: 'rect', x: 130, y: 750, width: 300, height: 12, fill: { $t: 'colors.accent' }, zIndex: 2 },
    { id: 'band-right', type: 'shape', shapeKind: 'rect', x: 570, y: 750, width: 300, height: 12, fill: { $t: 'colors.accent' }, zIndex: 2 },
    { id: 'slogan', type: 'text', content: '摩登时代 · 衣香鬓影 · 不夜之城', fontFamily: { $t: 'fonts.heading' }, fontSize: 26, fontWeight: '500', color: { $t: 'colors.accent' }, letterSpacing: 6, textAlign: 'center', x: 220, y: 790, width: 560, height: 40, zIndex: 2, editable: { content: true } }
  ]
}

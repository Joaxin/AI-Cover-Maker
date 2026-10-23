// src/core/templates/chinese/chinese-nianhua.ts —— 杨柳青年画
import type { Template } from '@/types/types'

// 团花（角隅装饰，pulse 呼吸）
const ROSETTE_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><g fill="none" stroke="%23facc15" stroke-width="3"><circle cx="40" cy="40" r="10" fill="%2315803d" stroke="%23facc15"/><circle cx="40" cy="40" r="26" stroke-dasharray="6 6"/><g fill="%23facc15" stroke="none"><circle cx="40" cy="8" r="4"/><circle cx="40" cy="8" r="4" transform="rotate(90 40 40)"/><circle cx="40" cy="8" r="4" transform="rotate(180 40 40)"/><circle cx="40" cy="8" r="4" transform="rotate(270 40 40)"/></g></g></svg>'

// 如意云头横带
const CLOUD_BAND_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 50"><g fill="none" stroke="%23fde047" stroke-width="3" opacity="0.9"><path d="M0 40 Q 15 14 30 40 Q 45 14 60 40 Q 75 14 90 40 Q 105 14 120 40 Q 135 14 150 40 Q 165 14 180 40 Q 195 14 210 40 Q 225 14 240 40 Q 255 14 270 40 Q 285 14 300 40"/><circle cx="30" cy="22" r="4" fill="%23fde047"/><circle cx="90" cy="22" r="4" fill="%23fde047"/><circle cx="150" cy="22" r="4" fill="%23fde047"/><circle cx="210" cy="22" r="4" fill="%23fde047"/><circle cx="270" cy="22" r="4" fill="%23fde047"/></g></svg>'

// 鲤鱼剪影（连年有余）
const FISH_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 60"><g fill="%23fde047"><path d="M10 30 Q 40 4 92 16 Q 118 22 132 30 Q 118 38 92 44 Q 40 56 10 30 Z"/><path d="M10 30 L2 14 Q 18 22 24 30 Q 18 38 2 46 Z"/><circle cx="106" cy="26" r="3.5" fill="%23b91c1c"/></g><path d="M46 20 Q 66 30 46 40" fill="none" stroke="%23b91c1c" stroke-width="3"/></svg>'

export const chineseNianhuaTemplate: Template = {
  id: 'chinese-nianhua-folk', name: '杨柳青年画', version: '1.1.0', category: 'chinese', tags: ['chinese', 'folk', 'new-year', 'woodblock'],
  thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23b91c1c"/><circle cx="50" cy="45" r="24" fill="%23facc15"/><rect x="25" y="75" width="50" height="8" fill="%2315803d"/></svg>',
  tokens: {
    colors: {
      bg: { label: '年红', default: '#B91C1C', options: ['#B91C1C', '#DC2626', '#991B1B', '#C81E1E', '#166534'] },
      primary: { label: '藤黄', default: '#FACC15', options: ['#FACC15', '#FDE047', '#FBBF24', '#FEF08A'] },
      accent: { label: '翠绿', default: '#15803D', options: ['#15803D', '#16A34A', '#166534', '#DC2626', '#F97316'] },
      extra: { label: '靛青', default: '#1D4ED8', options: ['#1D4ED8', '#1E40AF', '#2563EB', '#0F766E', '#DC2626'] }
    },
    fonts: { heading: { label: '标题字体', default: 'SimHei, STHeiti, sans-serif', options: ['SimHei, STHeiti, sans-serif', 'STKaiti, KaiTi, serif', 'STSong, Songti SC, SimSun, serif'] } }
  },
  presets: [
    { name: '年红藤黄', colors: { bg: '#B91C1C', primary: '#FACC15', accent: '#15803D', extra: '#1D4ED8' } },
    { name: '桃红叠翠', colors: { bg: '#C81E1E', primary: '#FEF08A', accent: '#16A34A', extra: '#0F766E' } },
    { name: '墨绿鎏金', colors: { bg: '#166534', primary: '#FDE047', accent: '#F97316', extra: '#DC2626' } },
    { name: '火树金花', colors: { bg: '#DC2626', primary: '#FBBF24', accent: '#166534', extra: '#2563EB' } }
  ],
  canvas: {
    virtualWidth: 1000, virtualHeight: 1000, defaultWidth: 1000, defaultHeight: 1000, backgroundColor: { $t: 'colors.bg' },
    // 五福捧寿式散点团花底纹
    backgroundImage: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000"><g fill="%23fde047" opacity="0.22"><circle cx="120" cy="120" r="9"/><circle cx="880" cy="120" r="9"/><circle cx="120" cy="880" r="9"/><circle cx="880" cy="880" r="9"/><circle cx="500" cy="80" r="7"/><circle cx="80" cy="500" r="7"/><circle cx="920" cy="500" r="7"/><circle cx="500" cy="930" r="7"/><circle cx="260" cy="260" r="5"/><circle cx="740" cy="260" r="5"/><circle cx="260" cy="740" r="5"/><circle cx="740" cy="740" r="5"/></g></svg>'
  },
  elements: [
    { id: 'frame-outer', type: 'shape', shapeKind: 'rect', x: 70, y: 70, width: 860, height: 860, border: { color: { $t: 'colors.primary' }, width: 8, style: 'solid' }, zIndex: 4 },
    { id: 'frame-inner', type: 'shape', shapeKind: 'rect', x: 96, y: 96, width: 808, height: 808, border: { color: { $t: 'colors.accent' }, width: 3, style: 'dashed' }, zIndex: 4 },
    { id: 'rosette-tl', type: 'image', src: ROSETTE_SVG, x: 100, y: 100, width: 64, height: 64, objectFit: 'contain', zIndex: 5, animation: { name: 'pulse', duration: 2600, iterationCount: 'infinite', easing: 'ease-in-out' } },
    { id: 'rosette-tr', type: 'image', src: ROSETTE_SVG, x: 836, y: 100, width: 64, height: 64, objectFit: 'contain', zIndex: 5, animation: { name: 'pulse', duration: 2600, iterationCount: 'infinite', delay: 400, easing: 'ease-in-out' } },
    { id: 'rosette-bl', type: 'image', src: ROSETTE_SVG, x: 100, y: 836, width: 64, height: 64, objectFit: 'contain', zIndex: 5, animation: { name: 'pulse', duration: 2600, iterationCount: 'infinite', delay: 800, easing: 'ease-in-out' } },
    { id: 'rosette-br', type: 'image', src: ROSETTE_SVG, x: 836, y: 836, width: 64, height: 64, objectFit: 'contain', zIndex: 5, animation: { name: 'pulse', duration: 2600, iterationCount: 'infinite', delay: 1200, easing: 'ease-in-out' } },
    { id: 'medallion', type: 'shape', shapeKind: 'circle', x: 340, y: 180, width: 320, height: 320, fill: { $t: 'colors.primary' }, border: { color: { $t: 'colors.accent' }, width: 6 }, zIndex: 1, animation: { name: 'shimmer', duration: 3800, iterationCount: 'infinite', easing: 'ease-in-out' } },
    { id: 'medallion-char', type: 'text', content: '福', fontFamily: { $t: 'fonts.heading' }, fontSize: 180, fontWeight: '900', color: { $t: 'colors.bg' }, textAlign: 'center', x: 340, y: 235, width: 320, height: 220, zIndex: 2, animation: { name: 'bounce', duration: 1400, delay: 300 }, editable: { content: true, fontSize: { type: 'range', min: 120, max: 220 } } },
    { id: 'fish-l', type: 'image', src: FISH_SVG, x: 150, y: 480, width: 150, height: 64, objectFit: 'contain', zIndex: 2, animation: { name: 'float', duration: 4600, iterationCount: 'infinite', easing: 'ease-in-out' }, editable: { position: true, size: { type: 'scale' } } },
    { id: 'fish-r', type: 'image', src: FISH_SVG, x: 700, y: 480, width: 150, height: 64, objectFit: 'contain', rotation: 0, zIndex: 2, animation: { name: 'float', duration: 5200, iterationCount: 'infinite', delay: 700, easing: 'ease-in-out' }, editable: { position: true, size: { type: 'scale' } } },
    { id: 'title-main', type: 'text', content: '年年有余', fontFamily: { $t: 'fonts.heading' }, fontSize: 96, fontWeight: '900', color: { $t: 'colors.primary' }, letterSpacing: 16, textAlign: 'center', x: 150, y: 590, width: 700, height: 140, zIndex: 2, shadow: { color: 'rgba(0,0,0,0.45)', blur: 12, offsetX: 0, offsetY: 6 }, animation: { name: 'inkReveal', duration: 1400 }, editable: { content: true, fontSize: { type: 'range', min: 64, max: 120 }, position: true } },
    { id: 'cloud-band', type: 'image', src: CLOUD_BAND_SVG, x: 250, y: 730, width: 500, height: 50, objectFit: 'contain', zIndex: 2 },
    { id: 'banner', type: 'shape', shapeKind: 'rect', x: 280, y: 800, width: 440, height: 56, fill: { $t: 'colors.extra' }, borderRadius: 28, zIndex: 2 },
    { id: 'banner-text', type: 'text', content: '武强杨柳 · 迎春纳福', fontFamily: { $t: 'fonts.heading' }, fontSize: 28, fontWeight: '700', color: '#FFFFFF', letterSpacing: 6, textAlign: 'center', x: 280, y: 812, width: 440, height: 40, zIndex: 3, editable: { content: true } }
  ]
}

// src/core/templates/minimal/minimal.ts
import type { Template } from '@/types/types'
export const minimalTemplates: Template[] = [
{
  id: 'minimal-swiss-grid', name: '瑞士网格黑白', version: '1.1.0', category: 'minimal',
  tags: ['minimal', 'typography', 'black-and-white', 'grid'],
  thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23ffffff"/><rect x="8" y="8" width="84" height="84" fill="none" stroke="%23111111" stroke-width="1.5"/><rect x="15" y="20" width="40" height="6" fill="%23111111"/><rect x="15" y="30" width="70" height="2" fill="%23111111"/></svg>',
  tokens: {
    colors: {
      bg: { label: '背景', default: '#FFFFFF', options: ['#FFFFFF', '#F5F5F7', '#FAFAFA', '#FDFCF7', '#F4F4F5'] },
      primary: { label: '主色', default: '#111111', options: ['#111111', '#000000', '#1E293B', '#1C1917', '#0F172A'] },
      accent: { label: '辅色', default: '#444444', options: ['#444444', '#64748B', '#94A3B8', '#B45309', '#3B82F6'] }
    },
    fonts: {
      heading: { label: '标题', default: 'Helvetica, Arial, sans-serif', options: ['Helvetica, Arial, sans-serif', 'Inter, sans-serif', 'system-ui'] }
    }
  },
  presets: [
    { name: '纯白墨黑', colors: { bg: '#FFFFFF', primary: '#111111', accent: '#444444' } },
    { name: '宣纸暖调', colors: { bg: '#FDFCF7', primary: '#1C1917', accent: '#B45309' } },
    { name: '冷灰石青', colors: { bg: '#F4F4F5', primary: '#1E293B', accent: '#64748B' } },
    { name: '极光浅蓝', colors: { bg: '#FAFAFA', primary: '#0F172A', accent: '#3B82F6' } }
  ],
  canvas: { virtualWidth: 1000, virtualHeight: 1000, defaultWidth: 1000, defaultHeight: 1000, backgroundColor: { $t: 'colors.bg' } },
  elements: [
    { id: 'border-frame', type: 'shape', shapeKind: 'rect', x: 60, y: 60, width: 880, height: 880, zIndex: 1, border: { color: { $t: 'colors.primary' }, width: 4, style: 'solid' } },
    { id: 'grid-line-h', type: 'shape', shapeKind: 'line', x: 60, y: 600, width: 880, height: 2, zIndex: 2, fill: { $t: 'colors.primary' } },
    { id: 'grid-line-v', type: 'shape', shapeKind: 'rect', x: 600, y: 60, width: 2, height: 880, zIndex: 2, fill: { $t: 'colors.primary' }, opacity: 0.25 },
    { id: 'index-no', type: 'text', content: 'N° 01', fontFamily: { $t: 'fonts.heading' }, fontSize: 28, fontWeight: '700', color: { $t: 'colors.primary' }, x: 100, y: 100, width: 200, height: 40, zIndex: 3, editable: { content: true } },
    { id: 'main-title', type: 'text', content: 'LESS IS MORE.', fontFamily: { $t: 'fonts.heading' }, fontSize: 76, fontWeight: '900', color: { $t: 'colors.primary' }, letterSpacing: -2, x: 100, y: 220, width: 800, height: 180, zIndex: 4, animation: { name: 'fadeIn', duration: 800 }, editable: { content: true, fontSize: { type: 'range', min: 40, max: 120 }, position: true } },
    { id: 'sub-text', type: 'text', content: 'Simplicity is about subtracting the obvious and adding the meaningful.', fontFamily: 'Georgia, serif', fontSize: 24, fontWeight: '400', color: { $t: 'colors.accent' }, lineHeight: 1.6, x: 100, y: 640, width: 780, height: 120, zIndex: 5, editable: { content: true } }
  ]
},
{
  id: 'minimal-split-geometry', name: '极简对顶分割', version: '1.1.0', category: 'minimal',
  tags: ['minimal', 'split', 'contrast'],
  thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="50" height="100" fill="%23000000"/><rect x="50" width="50" height="100" fill="%23ffffff"/><circle cx="50" cy="50" r="20" fill="none" stroke="%23888888" stroke-width="2"/></svg>',
  tokens: {
    colors: {
      bg: { label: '浅色区', default: '#F5F5F7', options: ['#F5F5F7', '#FFFFFF', '#FAFAFA', '#E7E5E4', '#EFF6FF'] },
      ink: { label: '深色区', default: '#121212', options: ['#121212', '#000000', '#1E293B', '#292524'] },
      line: { label: '轮廓线', default: '#666666', options: ['#666666', '#94A3B8', '#F59E0B', '#3B82F6'] }
    },
    fonts: { heading: { label: '标题', default: 'Helvetica, Arial, sans-serif', options: ['Helvetica, Arial, sans-serif', 'Impact, sans-serif'] } }
  },
  presets: [
    { name: '黑白对撞', colors: { bg: '#F5F5F7', ink: '#121212', line: '#666666' } },
    { name: '石墨鎏金', colors: { bg: '#E7E5E4', ink: '#292524', line: '#F59E0B' } },
    { name: '午夜蓝调', colors: { bg: '#EFF6FF', ink: '#1E293B', line: '#3B82F6' } },
    { name: '纯粹明暗', colors: { bg: '#FFFFFF', ink: '#000000', line: '#94A3B8' } }
  ],
  canvas: { virtualWidth: 1000, virtualHeight: 1000, defaultWidth: 1000, defaultHeight: 1000, backgroundColor: { $t: 'colors.bg' } },
  elements: [
    { id: 'dark-block', type: 'shape', shapeKind: 'rect', x: 0, y: 0, width: 500, height: 1000, fill: { $t: 'colors.ink' }, zIndex: 1, animation: { name: 'fadeIn', duration: 600 }},
    { id: 'center-circle', type: 'shape', shapeKind: 'circle', x: 350, y: 350, width: 300, height: 300, border: { color: { $t: 'colors.line' }, width: 2, style: 'solid' }, zIndex: 2, animation: { name: 'pulse', duration: 2500, iterationCount: 'infinite' } },
    { id: 'left-vertical-title', type: 'text', content: 'CONTRAST', fontFamily: { $t: 'fonts.heading' }, fontSize: 60, fontWeight: '900', color: { $t: 'colors.bg' }, rotation: 270, x: 100, y: 450, width: 400, height: 80, zIndex: 3, animation: { name: 'slideInLeft', duration: 700, delay: 220 }, editable: { content: true, fontSize: { type: 'range', min: 40, max: 80 }, position: true } },
    { id: 'right-desc', type: 'text', content: 'PURE BALANCE OF FORM AND VOID.', fontFamily: { $t: 'fonts.heading' }, fontSize: 22, fontWeight: '500', color: { $t: 'colors.ink' }, letterSpacing: 4, x: 560, y: 480, width: 380, height: 100, zIndex: 3, animation: { name: 'fadeInUp', duration: 700, delay: 440 }, editable: { content: true, position: true } }
  ]
}
]

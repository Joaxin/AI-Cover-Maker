// src/core/templates/minimal/cm-mono-grid.ts
// CM 系列 · 等宽字阵（极简 / 排版封面）｜ 隐性 CM 标记
import type { Template } from '@/types/types'
import { SANS, HEI, MONO } from '../_fx/trend'

export const cmMonoGridTemplates: Template[] = [
  {
    id: 'cm-mono-grid', name: '等宽字阵', version: '1.0.0', category: 'minimal',
    tags: ['cm', 'mono', 'grid', 'typo', 'minimal', 'cover'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="56" viewBox="0 0 100 56"><rect width="100" height="56" fill="%23F4F4F2"/><rect x="60" y="8" width="32" height="40" fill="none" stroke="%231A1A1A" stroke-width="1"/><line x1="76" y1="8" x2="76" y2="48" stroke="%231A1A1A" stroke-width="0.6"/><rect x="8" y="44" width="40" height="3" fill="%231A1A1A"/><rect x="8" y="50" width="24" height="3" fill="%23FF5C00"/></svg>',
    tokens: {
      colors: {
        bg: { label: '底色', default: '#F4F4F2', options: ['#F4F4F2', '#EDEDEA', '#121212', '#0F0F0F'] },
        ink: { label: '文字', default: '#1A1A1A', options: ['#1A1A1A', '#0D0D0D', '#F2F2F0', '#EAEAEA'] },
        accent: { label: '强调', default: '#FF5C00', options: ['#FF5C00', '#F4511E', '#FF6B35', '#FF7A00'] },
        c1: { label: '辅助1', default: '#555555', options: ['#555555', '#6B6B6B', '#888888', '#444444'] },
        c2: { label: '辅助2', default: '#CCCCCC', options: ['#CCCCCC', '#D8D8D8', '#999999', '#BBBBBB'] }
      },
      fonts: {
        display: { label: '等宽标题', default: MONO, options: [MONO, SANS] },
        cjk: { label: '中文', default: HEI, options: [HEI, SANS] }
      }
    },
    presets: [
      { name: '纸白橙标', colors: { bg: '#F4F4F2', ink: '#1A1A1A', accent: '#FF5C00', c1: '#555555', c2: '#CCCCCC' } },
      { name: '灰阶素稿', colors: { bg: '#EDEDEA', ink: '#0D0D0D', accent: '#F4511E', c1: '#6B6B6B', c2: '#D8D8D8' } },
      { name: '暗底冷显', colors: { bg: '#121212', ink: '#F2F2F0', accent: '#FF6B35', c1: '#888888', c2: '#999999' } },
      { name: '墨黑极夜', colors: { bg: '#0F0F0F', ink: '#EAEAEA', accent: '#FF7A00', c1: '#444444', c2: '#BBBBBB' } }
    ],
    canvas: { virtualWidth: 1920, virtualHeight: 1080, defaultWidth: 1920, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      // 模块网格（右侧细线栅格）
      { id: 'cm-mg-g1', group: 'cm-mg-g', type: 'shape', shapeKind: 'line', x: 1080, y: 120, width: 1, height: 840, fill: { $t: 'colors.c1' }, opacity: 0.25, zIndex: 2 },
      { id: 'cm-mg-g2', group: 'cm-mg-g', type: 'shape', shapeKind: 'line', x: 1320, y: 120, width: 1, height: 840, fill: { $t: 'colors.c1' }, opacity: 0.25, zIndex: 2 },
      { id: 'cm-mg-g3', group: 'cm-mg-g', type: 'shape', shapeKind: 'line', x: 1560, y: 120, width: 1, height: 840, fill: { $t: 'colors.c1' }, opacity: 0.25, zIndex: 2 },
      { id: 'cm-mg-g4', group: 'cm-mg-g', type: 'shape', shapeKind: 'line', x: 1800, y: 120, width: 1, height: 840, fill: { $t: 'colors.c1' }, opacity: 0.25, zIndex: 2 },
      { id: 'cm-mg-h1', group: 'cm-mg-h', type: 'shape', shapeKind: 'line', x: 1080, y: 360, width: 720, height: 1, fill: { $t: 'colors.c1' }, opacity: 0.25, zIndex: 2 },
      { id: 'cm-mg-h2', group: 'cm-mg-h', type: 'shape', shapeKind: 'line', x: 1080, y: 600, width: 720, height: 1, fill: { $t: 'colors.c1' }, opacity: 0.25, zIndex: 2 },
      { id: 'cm-mg-h3', group: 'cm-mg-h', type: 'shape', shapeKind: 'line', x: 1080, y: 840, width: 720, height: 1, fill: { $t: 'colors.c1' }, opacity: 0.25, zIndex: 2 },
      { id: 'cm-mg-cell', type: 'shape', shapeKind: 'rect', x: 1320, y: 360, width: 240, height: 240, fill: { $t: 'colors.accent' }, opacity: 0.9, zIndex: 3, animation: { name: 'pulse', duration: 3000, iterationCount: 'infinite' } },
      // 文字层
      { id: 'cm-mg-kicker', type: 'text', content: 'MONOSPACE · 等宽字阵', fontFamily: { $t: 'fonts.display' }, fontSize: 26, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.7, letterSpacing: 4, x: 120, y: 180, width: 900, height: 40, zIndex: 5, animation: { name: 'fadeIn', duration: 600 } },
      { id: 'cm-mg-title', type: 'text', content: 'GRID\nsystem.', fontFamily: { $t: 'fonts.display' }, fontSize: 140, fontWeight: '800', color: { $t: 'colors.ink' }, lineHeight: 1.08, letterSpacing: -2, x: 120, y: 300, width: 900, height: 360, zIndex: 6, animation: { name: 'fadeInUp', duration: 900 }, editable: { content: true, fontSize: { type: 'range', min: 110, max: 170 } } },
      { id: 'cm-mg-sub', type: 'text', content: '用秩序收纳一切内容。', fontFamily: { $t: 'fonts.cjk' }, fontSize: 36, color: { $t: 'colors.ink' }, opacity: 0.82, x: 120, y: 720, width: 900, height: 60, zIndex: 6, animation: { name: 'rise', duration: 900, delay: 200 }, editable: { content: true } },
      { id: 'cm-mg-cta', type: 'shape', shapeKind: 'rect', x: 120, y: 820, width: 320, height: 84, fill: { $t: 'colors.ink' }, borderRadius: 42, zIndex: 6, animation: { name: 'fadeInUp', duration: 800, delay: 320 } },
      { id: 'cm-mg-cta-t', type: 'text', content: '套用栅格', fontFamily: { $t: 'fonts.cjk' }, fontSize: 30, fontWeight: '700', color: { $t: 'colors.bg' }, textAlign: 'center', lineHeight: 2.8, x: 120, y: 820, width: 320, height: 84, zIndex: 7, editable: { content: true } },
      { id: 'cm-mg-badge', type: 'text', content: 'NEW · 2.5', fontFamily: { $t: 'fonts.display' }, fontSize: 24, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 4, textAlign: 'right', x: 1560, y: 120, width: 300, height: 36, zIndex: 5, animation: { name: 'fadeIn', duration: 600, delay: 120 } },
      { id: 'cm-mg-decor', type: 'text', content: '88', fontFamily: { $t: 'fonts.display' }, fontSize: 300, fontWeight: '800', color: { $t: 'colors.ink' }, opacity: 0.05, textAlign: 'right', x: 1140, y: 520, width: 740, height: 540, zIndex: 4 },
      { id: 'cm-mg-watermark', type: 'text', content: 'CM · SYS/GRID', fontFamily: { $t: 'fonts.display' }, fontSize: 24, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.06, letterSpacing: 4, x: 120, y: 1000, width: 600, height: 30, zIndex: 8 }
    ]
  }
]

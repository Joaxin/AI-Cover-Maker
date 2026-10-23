// src/core/templates/tech/hy4-blueprint.ts —— 工程蓝图 Blueprint（1:1）
// 蓝图语言：深蓝底 + 网格细线 + 技术圆与尺寸标注 + 等宽小字。
// HY4 标记：id / 导出名 / tags 带 hy4，右下角图签嵌入「HY4 / DWG-02」。
import type { Template } from '@/types/types'
import { HEI, MONO, SANS, grain } from '../_fx/trend'

export const hy4BlueprintTemplates: Template[] = [
  {
    id: 'hy4-blueprint', name: '工程蓝图', version: '1.0.0', category: 'tech',
    tags: ['hy4', 'tech', 'blueprint', 'technical', 'grid', 'drafting', '1:1'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="108" height="108" viewBox="0 0 108 108"><rect width="108" height="108" fill="%230E2340"/><g stroke="%237FD4F5" stroke-opacity="0.35" stroke-width="1"><path d="M8 0v108M30 0v108M52 0v108M74 0v108M96 0v108M0 8h108M0 30h108M0 52h108M0 74h108M0 96h108"/></g><circle cx="54" cy="46" r="22" fill="none" stroke="%237FD4F5" stroke-width="1.5"/><circle cx="54" cy="46" r="12" fill="none" stroke="%237FD4F5" stroke-width="1"/><rect x="26" y="76" width="56" height="4" rx="2" fill="%23F2F7FB"/><rect x="40" y="86" width="28" height="3" rx="1.5" fill="%237FD4F5"/></svg>',
    tokens: {
      colors: {
        bg: { label: '蓝图底', default: '#0E2340', options: ['#0E2340', '#102A4C', '#08211F', '#1B2233'] },
        ink: { label: '主线条', default: '#F2F7FB', options: ['#F2F7FB', '#E6EEF7', '#D7F3EE', '#E9EDF7'] },
        line: { label: '网格线', default: '#7FD4F5', options: ['#7FD4F5', '#8FE3FF', '#63E6C3', '#A9B8FF'] },
        accent: { label: '标注色', default: '#FFB347', options: ['#FFB347', '#FFD166', '#FF8B6B', '#7CE7B8'] }
      },
      fonts: { heading: { label: '标题', default: HEI, options: [HEI, SANS] }, note: { label: '标注', default: MONO, options: [MONO, SANS] } }
    },
    presets: [
      { name: '经典蓝', colors: { bg: '#0E2340', ink: '#F2F7FB', line: '#7FD4F5', accent: '#FFB347' } },
      { name: '深海军', colors: { bg: '#102A4C', ink: '#E6EEF7', line: '#8FE3FF', accent: '#FFD166' } },
      { name: '青绿晒图', colors: { bg: '#08211F', ink: '#D7F3EE', line: '#63E6C3', accent: '#FF8B6B' } },
      { name: '石墨蓝', colors: { bg: '#1B2233', ink: '#E9EDF7', line: '#A9B8FF', accent: '#7CE7B8' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1080, defaultWidth: 1080, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      // 网格（细长 rect 模拟线）
      { id: 'hy4-bp-v1', group: 'hy4-bp-v', type: 'shape', shapeKind: 'rect', x: 90, y: 60, width: 1, height: 960, fill: { $t: 'colors.line' }, opacity: 0.20, zIndex: 2 },
      { id: 'hy4-bp-v2', group: 'hy4-bp-v', type: 'shape', shapeKind: 'rect', x: 240, y: 60, width: 1, height: 960, fill: { $t: 'colors.line' }, opacity: 0.20, zIndex: 2 },
      { id: 'hy4-bp-v3', group: 'hy4-bp-v', type: 'shape', shapeKind: 'rect', x: 390, y: 60, width: 1, height: 960, fill: { $t: 'colors.line' }, opacity: 0.20, zIndex: 2 },
      { id: 'hy4-bp-v4', group: 'hy4-bp-v', type: 'shape', shapeKind: 'rect', x: 540, y: 60, width: 1, height: 960, fill: { $t: 'colors.line' }, opacity: 0.20, zIndex: 2 },
      { id: 'hy4-bp-v5', group: 'hy4-bp-v', type: 'shape', shapeKind: 'rect', x: 690, y: 60, width: 1, height: 960, fill: { $t: 'colors.line' }, opacity: 0.20, zIndex: 2 },
      { id: 'hy4-bp-v6', group: 'hy4-bp-v', type: 'shape', shapeKind: 'rect', x: 840, y: 60, width: 1, height: 960, fill: { $t: 'colors.line' }, opacity: 0.20, zIndex: 2 },
      { id: 'hy4-bp-v7', group: 'hy4-bp-v', type: 'shape', shapeKind: 'rect', x: 990, y: 60, width: 1, height: 960, fill: { $t: 'colors.line' }, opacity: 0.20, zIndex: 2 },
      { id: 'hy4-bp-h1', group: 'hy4-bp-h', type: 'shape', shapeKind: 'rect', x: 60, y: 90, width: 960, height: 1, fill: { $t: 'colors.line' }, opacity: 0.20, zIndex: 2 },
      { id: 'hy4-bp-h2', group: 'hy4-bp-h', type: 'shape', shapeKind: 'rect', x: 60, y: 240, width: 960, height: 1, fill: { $t: 'colors.line' }, opacity: 0.20, zIndex: 2 },
      { id: 'hy4-bp-h3', group: 'hy4-bp-h', type: 'shape', shapeKind: 'rect', x: 60, y: 390, width: 960, height: 1, fill: { $t: 'colors.line' }, opacity: 0.20, zIndex: 2 },
      { id: 'hy4-bp-h4', group: 'hy4-bp-h', type: 'shape', shapeKind: 'rect', x: 60, y: 540, width: 960, height: 1, fill: { $t: 'colors.line' }, opacity: 0.20, zIndex: 2 },
      { id: 'hy4-bp-h5', group: 'hy4-bp-h', type: 'shape', shapeKind: 'rect', x: 60, y: 690, width: 960, height: 1, fill: { $t: 'colors.line' }, opacity: 0.20, zIndex: 2 },
      { id: 'hy4-bp-h6', group: 'hy4-bp-h', type: 'shape', shapeKind: 'rect', x: 60, y: 840, width: 960, height: 1, fill: { $t: 'colors.line' }, opacity: 0.20, zIndex: 2 },
      { id: 'hy4-bp-h7', group: 'hy4-bp-h', type: 'shape', shapeKind: 'rect', x: 60, y: 990, width: 960, height: 1, fill: { $t: 'colors.line' }, opacity: 0.20, zIndex: 2 },
      // 技术圆
      { id: 'hy4-bp-ring', type: 'shape', shapeKind: 'circle', x: 300, y: 200, width: 480, height: 480, fill: 'transparent', border: { width: 2, color: { $t: 'colors.line' } }, opacity: 0.85, zIndex: 4, animation: { name: 'zoomIn', duration: 900 } },
      { id: 'hy4-bp-ring2', type: 'shape', shapeKind: 'circle', x: 390, y: 290, width: 300, height: 300, fill: 'transparent', border: { width: 1.5, color: { $t: 'colors.line' } }, opacity: 0.6, zIndex: 4 },
      { id: 'hy4-bp-core', type: 'shape', shapeKind: 'circle', x: 500, y: 400, width: 80, height: 80, fill: { $t: 'colors.accent' }, opacity: 0.9, zIndex: 5, animation: { name: 'pulse', duration: 3200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'hy4-bp-cross-v', type: 'shape', shapeKind: 'rect', x: 539, y: 150, width: 2, height: 580, fill: { $t: 'colors.line' }, opacity: 0.5, zIndex: 5 },
      { id: 'hy4-bp-cross-h', type: 'shape', shapeKind: 'rect', x: 230, y: 439, width: 620, height: 2, fill: { $t: 'colors.line' }, opacity: 0.5, zIndex: 5 },
      // 尺寸标注
      { id: 'hy4-bp-dim', type: 'shape', shapeKind: 'rect', x: 300, y: 712, width: 480, height: 2, fill: { $t: 'colors.accent' }, opacity: 0.8, zIndex: 6 },
      { id: 'hy4-bp-dim-l', type: 'shape', shapeKind: 'rect', x: 300, y: 692, width: 2, height: 42, fill: { $t: 'colors.accent' }, opacity: 0.8, zIndex: 6 },
      { id: 'hy4-bp-dim-r', type: 'shape', shapeKind: 'rect', x: 778, y: 692, width: 2, height: 42, fill: { $t: 'colors.accent' }, opacity: 0.8, zIndex: 6 },
      // 文字
      { id: 'hy4-bp-kicker', type: 'text', content: 'TECHNICAL DRAWING / 结构草图', fontFamily: { $t: 'fonts.note' }, fontSize: 24, fontWeight: '700', color: { $t: 'colors.line' }, opacity: 0.9, letterSpacing: 6, x: 90, y: 96, width: 700, height: 34, zIndex: 8, animation: { name: 'slideInLeft', duration: 700 } },
      { id: 'hy4-bp-title', type: 'text', content: '结构\n草图', fontFamily: { $t: 'fonts.heading' }, fontSize: 96, fontWeight: '800', color: { $t: 'colors.ink' }, lineHeight: 1.06, letterSpacing: 2, x: 90, y: 800, width: 620, height: 220, zIndex: 8, animation: { name: 'fadeInUp', duration: 900, delay: 160 }, editable: { content: true, fontSize: { type: 'range', min: 80, max: 108 } } },
      { id: 'hy4-bp-scale', type: 'text', content: 'SCALE 1:1　Ø480　REV.C', fontFamily: { $t: 'fonts.note' }, fontSize: 22, color: { $t: 'colors.line' }, opacity: 0.75, letterSpacing: 3, x: 90, y: 742, width: 640, height: 30, zIndex: 8 },
      { id: 'hy4-bp-hy', type: 'text', content: 'HY4 / DWG-02', fontFamily: { $t: 'fonts.note' }, fontSize: 20, color: { $t: 'colors.ink' }, opacity: 0.55, letterSpacing: 4, x: 760, y: 940, width: 280, height: 28, zIndex: 8 },
      { id: 'hy4-bp-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1080, background: `url("${grain(300, 23, 0.5)}")`, opacity: 0.06, mixBlendMode: 'overlay', zIndex: 20 }
    ]
  }
]

// src/core/templates/art/hy4-paper-relief.ts —— 纸雕浮雕 Paper Relief（4:5）
// 分层纸雕语言：暖纸底 + 拱形镂空 + 投影纸片 + 衬线大标题。
// HY4 标记：id / 导出名 / tags 带 hy4，画面右下小注嵌入「HY4 · PAPER STUDIO」。
import type { Template } from '@/types/types'
import { HEI, MONO, SERIF, grain } from '../_fx/trend'

export const hy4PaperReliefTemplates: Template[] = [
  {
    id: 'hy4-paper-relief', name: '纸雕浮雕', version: '1.0.0', category: 'art',
    tags: ['hy4', 'art', 'paper cut', 'relief', 'layered', 'serif', '4:5'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="108" height="135" viewBox="0 0 108 135"><rect width="108" height="135" fill="%23F3EBE1"/><path d="M20 58a34 34 0 0 1 68 0v57H20z" fill="%23E4D6C6"/><path d="M31 72a23 23 0 0 1 46 0v43H31z" fill="%23D9C3AE"/><rect x="34" y="98" width="40" height="5" rx="2.5" fill="%234A3A2E"/><rect x="34" y="108" width="26" height="4" rx="2" fill="%234A3A2E" opacity="0.55"/><rect x="78" y="30" width="12" height="12" rx="3" fill="%23C96F4A"/></svg>',
    tokens: {
      colors: {
        bg: { label: '纸底', default: '#F3EBE1', options: ['#F3EBE1', '#EFE7DC', '#1F1B18', '#E7EDE6'] },
        ink: { label: '墨色', default: '#4A3A2E', options: ['#4A3A2E', '#3A3229', '#F2ECE4', '#223027'] },
        paperA: { label: '纸层一', default: '#E4D6C6', options: ['#E4D6C6', '#DCCFC0', '#2A2521', '#D7E0D5'] },
        paperB: { label: '纸层二', default: '#D9C3AE', options: ['#D9C3AE', '#CDB79F', '#37312B', '#C6D3C3'] },
        accent: { label: '点缀', default: '#C96F4A', options: ['#C96F4A', '#B8653F', '#E0A458', '#7E9C7A'] }
      },
      fonts: { heading: { label: '标题', default: SERIF, options: [SERIF, HEI] }, note: { label: '小字', default: MONO, options: [MONO, HEI] } }
    },
    presets: [
      { name: '米白暖纸', colors: { bg: '#F3EBE1', ink: '#4A3A2E', paperA: '#E4D6C6', paperB: '#D9C3AE', accent: '#C96F4A' } },
      { name: '燕麦浅', colors: { bg: '#EFE7DC', ink: '#3A3229', paperA: '#DCCFC0', paperB: '#CDB79F', accent: '#B8653F' } },
      { name: '暗夜纸', colors: { bg: '#1F1B18', ink: '#F2ECE4', paperA: '#2A2521', paperB: '#37312B', accent: '#E0A458' } },
      { name: '苔绿纸', colors: { bg: '#E7EDE6', ink: '#223027', paperA: '#D7E0D5', paperB: '#C6D3C3', accent: '#7E9C7A' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'hy4-pr-layer1', type: 'shape', shapeKind: 'rect', x: 90, y: 210, width: 900, height: 900, fill: { $t: 'colors.paperA' }, borderRadius: 28, zIndex: 2, shadow: { offsetX: 0, offsetY: 18, blur: 40, color: 'rgba(0,0,0,0.14)' }, animation: { name: 'fadeInUp', duration: 900 } },
      { id: 'hy4-pr-layer2', type: 'shape', shapeKind: 'rect', x: 150, y: 280, width: 780, height: 760, fill: { $t: 'colors.paperB' }, borderRadius: 22, zIndex: 3, shadow: { offsetX: 0, offsetY: 14, blur: 30, color: 'rgba(0,0,0,0.12)' }, animation: { name: 'fadeInUp', duration: 900, delay: 120 } },
      // 拱形镂空（圆 + 矩形拼装）
      { id: 'hy4-pr-arch-top', type: 'shape', shapeKind: 'circle', x: 330, y: 360, width: 420, height: 420, fill: { $t: 'colors.bg' }, zIndex: 4 },
      { id: 'hy4-pr-arch-base', type: 'shape', shapeKind: 'rect', x: 330, y: 570, width: 420, height: 300, fill: { $t: 'colors.bg' }, zIndex: 4 },
      { id: 'hy4-pr-arch-line', type: 'shape', shapeKind: 'rect', x: 322, y: 700, width: 436, height: 3, fill: { $t: 'colors.accent' }, opacity: 0.7, zIndex: 5 },
      // 文字
      { id: 'hy4-pr-kicker', type: 'text', content: 'PAPER RELIEF / 纸雕 · 第四辑', fontFamily: { $t: 'fonts.note' }, fontSize: 24, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.72, letterSpacing: 6, x: 120, y: 130, width: 840, height: 36, zIndex: 8, animation: { name: 'slideInLeft', duration: 700 } },
      { id: 'hy4-pr-title', type: 'text', content: '层叠\n之光', fontFamily: { $t: 'fonts.heading' }, fontSize: 108, fontWeight: '700', color: { $t: 'colors.ink' }, lineHeight: 1.08, letterSpacing: 2, x: 150, y: 980, width: 780, height: 250, zIndex: 8, animation: { name: 'fadeInUp', duration: 900, delay: 200 }, editable: { content: true, fontSize: { type: 'range', min: 88, max: 120 } } },
      { id: 'hy4-pr-sub', type: 'text', content: '一刀一刀，把光切成层次。', fontFamily: { $t: 'fonts.heading' }, fontSize: 32, color: { $t: 'colors.ink' }, opacity: 0.8, letterSpacing: 2, x: 150, y: 1256, width: 600, height: 46, zIndex: 8, animation: { name: 'rise', duration: 800, delay: 400 }, editable: { content: true } },
      { id: 'hy4-pr-hy', type: 'text', content: 'HY4 · PAPER STUDIO', fontFamily: { $t: 'fonts.note' }, fontSize: 20, color: { $t: 'colors.ink' }, opacity: 0.45, letterSpacing: 3, x: 770, y: 1268, width: 300, height: 28, zIndex: 8 },
      // 点缀纸片
      { id: 'hy4-pr-chip', type: 'shape', shapeKind: 'rect', x: 852, y: 302, width: 110, height: 110, fill: { $t: 'colors.accent' }, opacity: 0.85, borderRadius: 16, rotation: -8, zIndex: 6, animation: { name: 'float', duration: 9000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'hy4-pr-chip2', type: 'shape', shapeKind: 'rect', x: 118, y: 726, width: 72, height: 72, fill: { $t: 'colors.accent' }, opacity: 0.5, borderRadius: 12, rotation: 12, zIndex: 6, animation: { name: 'drift', duration: 11000, delay: 400, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'hy4-pr-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1350, background: `url("${grain(320, 11, 0.5)}")`, opacity: 0.07, mixBlendMode: 'multiply', zIndex: 20 }
    ]
  }
]

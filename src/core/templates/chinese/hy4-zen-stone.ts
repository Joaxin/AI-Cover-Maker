// src/core/templates/chinese/hy4-zen-stone.ts —— 侘寂石庭 Zen Stone（1:1）
// 侘寂语言：砂米底 + 耙纹同心圆 + 孤石 + 朱印 + 疏排衬线题字。
// HY4 标记：id / 导出名 / tags 带 hy4，朱印内嵌入「HY4」。
import type { Template } from '@/types/types'
import { HEI, MONO, SERIF, SONG, grain } from '../_fx/trend'

export const hy4ZenStoneTemplates: Template[] = [
  {
    id: 'hy4-zen-stone', name: '侘寂石庭', version: '1.0.0', category: 'chinese',
    tags: ['hy4', 'chinese', 'zen', 'wabi sabi', 'stone garden', 'serif', '1:1'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="108" height="108" viewBox="0 0 108 108"><rect width="108" height="108" fill="%23EDE6DA"/><g fill="none" stroke="%23C9BCA6" stroke-width="1"><circle cx="54" cy="52" r="30"/><circle cx="54" cy="52" r="23"/><circle cx="54" cy="52" r="16"/></g><ellipse cx="54" cy="52" rx="9" ry="7" fill="%237A7266"/><rect x="80" y="78" width="16" height="16" rx="2" fill="%23B4462F"/><rect x="14" y="90" width="30" height="4" fill="%23423B33"/></svg>',
    tokens: {
      colors: {
        bg: { label: '砂底', default: '#EDE6DA', options: ['#EDE6DA', '#E7E0D2', '#1A1917', '#E4E7DE'] },
        ink: { label: '墨字', default: '#423B33', options: ['#423B33', '#3A342D', '#EDE7DC', '#333A31'] },
        sand: { label: '耙纹', default: '#C9BCA6', options: ['#C9BCA6', '#C2B49C', '#4A463D', '#BFC7B4'] },
        stone: { label: '孤石', default: '#7A7266', options: ['#7A7266', '#6B6459', '#9AA093', '#8A8272'] },
        seal: { label: '朱印', default: '#B4462F', options: ['#B4462F', '#A63D28', '#C96A4A', '#8E5A3C'] }
      },
      fonts: { heading: { label: '标题', default: SONG, options: [SONG, SERIF, HEI] }, note: { label: '小字', default: MONO, options: [MONO, HEI] } }
    },
    presets: [
      { name: '枯砂', colors: { bg: '#EDE6DA', ink: '#423B33', sand: '#C9BCA6', stone: '#7A7266', seal: '#B4462F' } },
      { name: '旧纸', colors: { bg: '#E7E0D2', ink: '#3A342D', sand: '#C2B49C', stone: '#6B6459', seal: '#A63D28' } },
      { name: '夜庭', colors: { bg: '#1A1917', ink: '#EDE7DC', sand: '#4A463D', stone: '#9AA093', seal: '#C96A4A' } },
      { name: '苔庭', colors: { bg: '#E4E7DE', ink: '#333A31', sand: '#BFC7B4', stone: '#8A8272', seal: '#8E5A3C' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1080, defaultWidth: 1080, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      // 耙纹同心圆
      { id: 'hy4-zn-r1', group: 'hy4-zn-r', type: 'shape', shapeKind: 'circle', x: 190, y: 190, width: 700, height: 700, fill: 'transparent', border: { width: 2, color: { $t: 'colors.sand' } }, opacity: 0.9, zIndex: 3, animation: { name: 'zoomIn', duration: 1000 } },
      { id: 'hy4-zn-r2', group: 'hy4-zn-r', type: 'shape', shapeKind: 'circle', x: 265, y: 265, width: 550, height: 550, fill: 'transparent', border: { width: 2, color: { $t: 'colors.sand' } }, opacity: 0.8, zIndex: 3, animation: { name: 'zoomIn', duration: 1000, delay: 120 } },
      { id: 'hy4-zn-r3', group: 'hy4-zn-r', type: 'shape', shapeKind: 'circle', x: 340, y: 340, width: 400, height: 400, fill: 'transparent', border: { width: 2, color: { $t: 'colors.sand' } }, opacity: 0.7, zIndex: 3, animation: { name: 'zoomIn', duration: 1000, delay: 240 } },
      { id: 'hy4-zn-r4', group: 'hy4-zn-r', type: 'shape', shapeKind: 'circle', x: 415, y: 415, width: 250, height: 250, fill: 'transparent', border: { width: 2, color: { $t: 'colors.sand' } }, opacity: 0.6, zIndex: 3, animation: { name: 'zoomIn', duration: 1000, delay: 360 } },
      // 孤石（圆 + 接触阴影用 rect 模拟椭圆）
      { id: 'hy4-zn-stone-shadow', type: 'shape', shapeKind: 'rect', x: 430, y: 566, width: 240, height: 44, fill: { $t: 'colors.sand' }, opacity: 0.35, borderRadius: 22, zIndex: 4 },
      { id: 'hy4-zn-stone', type: 'shape', shapeKind: 'circle', x: 452, y: 452, width: 196, height: 196, fill: { $t: 'colors.stone' }, zIndex: 5, animation: { name: 'float', duration: 12000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'hy4-zn-stone-hi', type: 'shape', shapeKind: 'circle', x: 486, y: 470, width: 96, height: 96, fill: { $t: 'colors.bg' }, opacity: 0.16, zIndex: 6 },
      // 一道竖向墨线
      { id: 'hy4-zn-line', type: 'shape', shapeKind: 'rect', x: 148, y: 148, width: 2, height: 200, fill: { $t: 'colors.ink' }, opacity: 0.35, zIndex: 6 },
      // 文字
      { id: 'hy4-zn-kicker', type: 'text', content: 'ZEN GARDEN / 侘寂石庭', fontFamily: { $t: 'fonts.note' }, fontSize: 24, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.6, letterSpacing: 7, x: 148, y: 370, width: 420, height: 34, zIndex: 9, animation: { name: 'slideInLeft', duration: 700 } },
      { id: 'hy4-zn-title', type: 'text', content: '留白\n之处', fontFamily: { $t: 'fonts.heading' }, fontSize: 104, fontWeight: '700', color: { $t: 'colors.ink' }, lineHeight: 1.1, letterSpacing: 6, x: 148, y: 800, width: 620, height: 240, zIndex: 9, animation: { name: 'fadeInUp', duration: 900, delay: 200 }, editable: { content: true, fontSize: { type: 'range', min: 84, max: 116 } } },
      { id: 'hy4-zn-sub', type: 'text', content: '砂上有纹，石不言。', fontFamily: { $t: 'fonts.heading' }, fontSize: 30, color: { $t: 'colors.ink' }, opacity: 0.7, letterSpacing: 3, x: 148, y: 700, width: 560, height: 44, zIndex: 9, animation: { name: 'rise', duration: 800, delay: 380 }, editable: { content: true } },
      // 朱印（方章 + HY4）
      { id: 'hy4-zn-seal', type: 'shape', shapeKind: 'rect', x: 872, y: 872, width: 116, height: 116, fill: { $t: 'colors.seal' }, opacity: 0.92, borderRadius: 6, zIndex: 9, animation: { name: 'bounce', duration: 900, delay: 500 } },
      { id: 'hy4-zn-seal-t', type: 'text', content: 'HY4', fontFamily: { $t: 'fonts.note' }, fontSize: 30, fontWeight: '700', color: { $t: 'colors.bg' }, opacity: 0.95, letterSpacing: 2, textAlign: 'center', x: 872, y: 906, width: 116, height: 40, zIndex: 10 },
      { id: 'hy4-zn-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1080, background: `url("${grain(340, 19, 0.5)}")`, opacity: 0.08, mixBlendMode: 'multiply', zIndex: 20 }
    ]
  }
]

// src/core/templates/retro/hy-vapor-sunset.ts
// HY 系列 · 蒸汽波落日（4:5 竖版）｜ 对标 Synthwave / Vaporwave 落日网格审美
import type { Template } from '@/types/types'
import {SANS, HEI, SERIF, grainSoft} from '../_fx/trend'

export const hyVaporSunsetTemplates: Template[] = [
  {
    id: 'hy-vapor-sunset', name: '蒸汽波落日', version: '1.0.0', category: 'retro',
    tags: ['hy', 'vaporwave', 'synthwave', 'sunset', 'retro', '4:5', 'grid'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="125" viewBox="0 0 100 125"><rect width="100" height="125" fill="%231a1033"/><circle cx="50" cy="46" r="26" fill="%23ff6aa9"/><rect x="24" y="50" width="52" height="3" fill="%231a1033"/><rect x="24" y="58" width="52" height="4" fill="%231a1033"/><rect x="0" y="84" width="100" height="2" fill="%2300e5ff" opacity="0.8"/><rect x="20" y="92" width="60" height="1.5" fill="%23ff6aa9" opacity="0.7"/></svg>',
    tokens: {
      colors: {
        bg: { label: '夜空', default: '#1a1033', options: ['#1a1033', '#101a3a', '#2a0f3a', '#0d1b2a'] },
        sun: { label: '落日', default: '#ff6aa9', options: ['#ff6aa9', '#ff8a5c', '#ffd166', '#ff5d8f'] },
        neon: { label: '霓虹', default: '#00e5ff', options: ['#00e5ff', '#7c4dff', '#22d3ee', '#a855f7'] },
        glow: { label: '辉光', default: '#7c4dff', options: ['#7c4dff', '#ff6aa9', '#5b8def', '#f472b6'] },
        ink: { label: '文字', default: '#fdf4ff', options: ['#fdf4ff', '#ffffff', '#ffe8f5', '#e0f7ff'] }
      },
      fonts: {
        display: { label: '英文', default: SANS, options: [SANS, SERIF] },
        cjk: { label: '中文', default: HEI, options: [HEI, SANS] }
      }
    },
    presets: [
      { name: '莓紫电光', colors: { bg: '#1a1033', sun: '#ff6aa9', neon: '#00e5ff', glow: '#7c4dff', ink: '#fdf4ff' } },
      { name: '深海落日', colors: { bg: '#101a3a', sun: '#ff8a5c', neon: '#22d3ee', glow: '#5b8def', ink: '#ffffff' } },
      { name: '玫瑰幻境', colors: { bg: '#2a0f3a', sun: '#ffd166', neon: '#a855f7', glow: '#ff5d8f', ink: '#ffe8f5' } },
      { name: '午夜晴空', colors: { bg: '#0d1b2a', sun: '#ff5d8f', neon: '#7c4dff', glow: '#f472b6', ink: '#e0f7ff' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      // 天空渐变辉光
      { id: 'vs-sky', type: 'overlay', x: 0, y: 0, width: 1080, height: 770, background: 'linear-gradient(180deg, rgba(124,77,255,0) 0%, rgba(255,106,169,0.20) 68%, rgba(255,106,169,0.42) 100%)', zIndex: 1 },
      // 落日
      { id: 'vs-sun', type: 'shape', shapeKind: 'circle', x: 290, y: 210, width: 500, height: 500, fill: { $t: 'colors.sun' }, zIndex: 2, shadow: { offsetX: 0, offsetY: 0, blur: 90, color: { $t: 'colors.sun' } }, animation: { name: 'glow', duration: 5200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      // 落日切口（底色横条模拟 synthwave 条纹）
      { id: 'vs-slit1', group: 'vs-slit', type: 'shape', shapeKind: 'rect', x: 290, y: 540, width: 500, height: 8, fill: { $t: 'colors.bg' }, zIndex: 3 },
      { id: 'vs-slit2', group: 'vs-slit', type: 'shape', shapeKind: 'rect', x: 290, y: 578, width: 500, height: 12, fill: { $t: 'colors.bg' }, zIndex: 3 },
      { id: 'vs-slit3', group: 'vs-slit', type: 'shape', shapeKind: 'rect', x: 290, y: 622, width: 500, height: 16, fill: { $t: 'colors.bg' }, zIndex: 3 },
      { id: 'vs-slit4', group: 'vs-slit', type: 'shape', shapeKind: 'rect', x: 290, y: 672, width: 500, height: 22, fill: { $t: 'colors.bg' }, zIndex: 3 },
      { id: 'vs-slit5', group: 'vs-slit', type: 'shape', shapeKind: 'rect', x: 290, y: 728, width: 500, height: 30, fill: { $t: 'colors.bg' }, zIndex: 3 },
      // 地平线
      { id: 'vs-horizon', type: 'shape', shapeKind: 'line', x: 0, y: 770, width: 1080, height: 3, fill: { $t: 'colors.neon' }, opacity: 0.9, zIndex: 4, shadow: { offsetX: 0, offsetY: 0, blur: 22, color: { $t: 'colors.neon' } } },
      // 网格地面（竖线，两侧对称向中间收窄视觉）
      { id: 'vs-gv1', group: 'vs-gv', type: 'shape', shapeKind: 'line', x: 90, y: 772, width: 1, height: 578, fill: { $t: 'colors.neon' }, opacity: 0.22, zIndex: 4 },
      { id: 'vs-gv2', group: 'vs-gv', type: 'shape', shapeKind: 'line', x: 210, y: 772, width: 1, height: 578, fill: { $t: 'colors.neon' }, opacity: 0.22, zIndex: 4 },
      { id: 'vs-gv3', group: 'vs-gv', type: 'shape', shapeKind: 'line', x: 330, y: 772, width: 1, height: 578, fill: { $t: 'colors.neon' }, opacity: 0.22, zIndex: 4 },
      { id: 'vs-gv4', group: 'vs-gv', type: 'shape', shapeKind: 'line', x: 450, y: 772, width: 1, height: 578, fill: { $t: 'colors.neon' }, opacity: 0.22, zIndex: 4 },
      { id: 'vs-gv5', group: 'vs-gv', type: 'shape', shapeKind: 'line', x: 630, y: 772, width: 1, height: 578, fill: { $t: 'colors.neon' }, opacity: 0.22, zIndex: 4 },
      { id: 'vs-gv6', group: 'vs-gv', type: 'shape', shapeKind: 'line', x: 750, y: 772, width: 1, height: 578, fill: { $t: 'colors.neon' }, opacity: 0.22, zIndex: 4 },
      { id: 'vs-gv7', group: 'vs-gv', type: 'shape', shapeKind: 'line', x: 870, y: 772, width: 1, height: 578, fill: { $t: 'colors.neon' }, opacity: 0.22, zIndex: 4 },
      { id: 'vs-gv8', group: 'vs-gv', type: 'shape', shapeKind: 'line', x: 990, y: 772, width: 1, height: 578, fill: { $t: 'colors.neon' }, opacity: 0.22, zIndex: 4 },
      // 网格地面（横线，间距渐大制造透视）
      { id: 'vs-gh1', group: 'vs-gh', type: 'shape', shapeKind: 'line', x: 0, y: 832, width: 1080, height: 1, fill: { $t: 'colors.neon' }, opacity: 0.18, zIndex: 4 },
      { id: 'vs-gh2', group: 'vs-gh', type: 'shape', shapeKind: 'line', x: 0, y: 912, width: 1080, height: 1, fill: { $t: 'colors.neon' }, opacity: 0.18, zIndex: 4 },
      { id: 'vs-gh3', group: 'vs-gh', type: 'shape', shapeKind: 'line', x: 0, y: 1012, width: 1080, height: 1, fill: { $t: 'colors.neon' }, opacity: 0.18, zIndex: 4 },
      { id: 'vs-gh4', group: 'vs-gh', type: 'shape', shapeKind: 'line', x: 0, y: 1136, width: 1080, height: 1, fill: { $t: 'colors.neon' }, opacity: 0.18, zIndex: 4 },
      { id: 'vs-gh5', group: 'vs-gh', type: 'shape', shapeKind: 'line', x: 0, y: 1286, width: 1080, height: 1, fill: { $t: 'colors.neon' }, opacity: 0.18, zIndex: 4 },
      // 顶部标记与眉标
      { id: 'vs-hy', type: 'text', content: 'HY', fontFamily: { $t: 'fonts.display' }, fontSize: 22, fontWeight: '700', color: { $t: 'colors.neon' }, opacity: 0.38, letterSpacing: 3, x: 90, y: 92, width: 160, height: 32, zIndex: 6 },
      { id: 'vs-kicker', type: 'text', content: 'SUNSET RADIO', fontFamily: { $t: 'fonts.display' }, fontSize: 24, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.72, letterSpacing: 5, textAlign: 'right', x: 700, y: 92, width: 290, height: 32, zIndex: 6, animation: { name: 'fadeIn', duration: 600 } },
      // 主标题
      { id: 'vs-title', type: 'text', content: 'RETRO', fontFamily: { $t: 'fonts.display' }, fontSize: 158, fontWeight: '800', color: { $t: 'colors.ink' }, textAlign: 'center', lineHeight: 1.06, letterSpacing: 2, x: 140, y: 152, width: 800, height: 180, zIndex: 6, animation: { name: 'fadeInUp', duration: 900 }, editable: { content: true, fontSize: { type: 'range', min: 120, max: 170 } } },
      { id: 'vs-title2', type: 'text', content: 'WAVE', fontFamily: { $t: 'fonts.display' }, fontSize: 158, fontWeight: '800', color: { $t: 'colors.neon' }, textAlign: 'center', lineHeight: 1.06, letterSpacing: 2, x: 140, y: 320, width: 800, height: 180, zIndex: 6, animation: { name: 'fadeInUp', duration: 900, delay: 120 }, editable: { content: true, fontSize: { type: 'range', min: 120, max: 170 } } },
      // 副标题组（统一左对齐 x=90）
      { id: 'vs-sub', type: 'text', content: '霓虹坠入地平线的那一秒', fontFamily: { $t: 'fonts.cjk' }, fontSize: 36, color: { $t: 'colors.ink' }, opacity: 0.92, x: 90, y: 1040, width: 700, height: 52, zIndex: 6, animation: { name: 'rise', duration: 900, delay: 200 }, editable: { content: true } },
      { id: 'vs-meta', type: 'text', content: 'A-SIDE  /  1984  /  夜间播放', fontFamily: { $t: 'fonts.cjk' }, fontSize: 24, color: { $t: 'colors.ink' }, opacity: 0.6, x: 90, y: 1108, width: 700, height: 36, zIndex: 6, animation: { name: 'rise', duration: 900, delay: 300 } },
      { id: 'vs-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1350, background: `url("${grainSoft(320, 11, 0.5)}")`, opacity: 0.05, mixBlendMode: 'screen', zIndex: 9 }
    ]
  }
]

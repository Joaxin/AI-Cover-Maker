// src/core/templates/emotional/st-dusk-layers.ts
// HY 系列 · 层叠暮色（4:5 竖版）｜ 对标 atmospheric layered hills 的黄昏渐变审美
import type { Template } from '@/types/types'
import {SANS, HEI, SERIF, MONO, grainSoft} from '../_fx/trend'

export const stDuskLayersTemplates: Template[] = [
  {
    id: 'st-dusk-layers', name: '层叠暮色', version: '1.0.0', category: 'emotional',
    tags: ['st', 'dusk', 'layers', 'atmospheric', 'gradient', 'hills', '4:5'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="125" viewBox="0 0 100 125"><rect width="100" height="125" fill="%232A1B4A"/><rect width="100" height="62" fill="%236E4E8E"/><circle cx="48" cy="48" r="13" fill="%23F5A25D"/><circle cx="48" cy="48" r="22" fill="%23F5A25D" opacity="0.28"/><path d="M0 68 Q 30 54 62 68 T 100 64 L100 125 L0 125 Z" fill="%23A47FB8" opacity="0.9"/><path d="M0 82 Q 34 70 64 82 T 100 78 L100 125 L0 125 Z" fill="%234E3A6E"/><path d="M0 100 Q 40 90 70 100 T 100 96 L100 125 L0 125 Z" fill="%232A1B4A"/><rect x="10" y="14" width="30" height="3" fill="%23FDF3E7"/><rect x="10" y="22" width="20" height="3" fill="%23FDF3E7" opacity="0.6"/></svg>',
    tokens: {
      colors: {
        bg: { label: '底夜色', default: '#2A1B4A', options: ['#2A1B4A', '#1B2A4A', '#3A1B33', '#14302E'] },
        ink: { label: '文字', default: '#FDF3E7', options: ['#FDF3E7', '#F0F6FF', '#FFF0F3', '#EFFAF5'] },
        glow: { label: '落日', default: '#F5A25D', options: ['#F5A25D', '#F5B25D', '#F58A5D', '#F5C25D'] },
        layer1: { label: '远岭', default: '#A47FB8', options: ['#A47FB8', '#8FA8CC', '#C98FA8', '#8FB8AE'] },
        layer2: { label: '中景', default: '#6E4E8E', options: ['#6E4E8E', '#4E6A9E', '#8E4E6E', '#4E8E7E'] },
        layer3: { label: '近景', default: '#3E2A5C', options: ['#3E2A5C', '#2A3A5C', '#4A2A3E', '#2A4A44'] },
        accent: { label: '点缀', default: '#E8748C', options: ['#E8748C', '#E88CA8', '#FF9E7A', '#E8B48C'] }
      },
      fonts: {
        display: { label: '英文', default: SERIF, options: [SERIF, SANS, MONO] },
        cjk: { label: '中文', default: HEI, options: [HEI, SANS, SERIF] },
        mono: { label: '等宽标注', default: MONO, options: [MONO, SANS, SERIF] }
      }
    },
    presets: [
      { name: '紫橙暮色', colors: { bg: '#2A1B4A', ink: '#FDF3E7', glow: '#F5A25D', layer1: '#A47FB8', layer2: '#6E4E8E', layer3: '#3E2A5C', accent: '#E8748C' } },
      { name: '蓝粉黄昏', colors: { bg: '#1B2A4A', ink: '#F0F6FF', glow: '#F5B25D', layer1: '#8FA8CC', layer2: '#4E6A9E', layer3: '#2A3A5C', accent: '#E88CA8' } },
      { name: '玫红夜岭', colors: { bg: '#3A1B33', ink: '#FFF0F3', glow: '#F58A5D', layer1: '#C98FA8', layer2: '#8E4E6E', layer3: '#4A2A3E', accent: '#FF9E7A' } },
      { name: '青绿薄暮', colors: { bg: '#14302E', ink: '#EFFAF5', glow: '#F5C25D', layer1: '#8FB8AE', layer2: '#4E8E7E', layer3: '#2A4A44', accent: '#E8B48C' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      // 暮色天空（冷紫蓝 → 玫粉 → 暖橘，越往下越暖）
      { id: 'st-dk-sky', type: 'overlay', x: 0, y: 0, width: 1080, height: 1350, background: 'linear-gradient(180deg, rgba(38,22,78,0.95) 0%, rgba(110,78,142,0.85) 40%, rgba(200,96,120,0.6) 68%, rgba(245,162,93,0.72) 100%)', zIndex: 1 },
      // 高空星点（天还没全黑）
      { id: 'st-dk-star1', group: 'st-dk-star', type: 'shape', shapeKind: 'circle', x: 820, y: 180, width: 8, height: 8, fill: { $t: 'colors.ink' }, opacity: 0.7, zIndex: 2, animation: { name: 'twinkle', duration: 4200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-dk-star2', group: 'st-dk-star', type: 'shape', shapeKind: 'circle', x: 940, y: 300, width: 6, height: 6, fill: { $t: 'colors.ink' }, opacity: 0.55, zIndex: 2, animation: { name: 'twinkle', duration: 5600, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-dk-star3', group: 'st-dk-star', type: 'shape', shapeKind: 'circle', x: 730, y: 420, width: 5, height: 5, fill: { $t: 'colors.ink' }, opacity: 0.45, zIndex: 2, animation: { name: 'twinkle', duration: 6400, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-dk-star4', group: 'st-dk-star', type: 'shape', shapeKind: 'circle', x: 985, y: 520, width: 7, height: 7, fill: { $t: 'colors.ink' }, opacity: 0.5, zIndex: 2, animation: { name: 'twinkle', duration: 5000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-dk-star5', group: 'st-dk-star', type: 'shape', shapeKind: 'circle', x: 130, y: 520, width: 5, height: 5, fill: { $t: 'colors.ink' }, opacity: 0.4, zIndex: 2, animation: { name: 'twinkle', duration: 7000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-dk-star6', group: 'st-dk-star', type: 'shape', shapeKind: 'circle', x: 880, y: 560, width: 4, height: 4, fill: { $t: 'colors.ink' }, opacity: 0.45, zIndex: 2 },
      { id: 'st-dk-star7', group: 'st-dk-star', type: 'shape', shapeKind: 'circle', x: 992, y: 118, width: 5, height: 5, fill: { $t: 'colors.ink' }, opacity: 0.6, zIndex: 2, animation: { name: 'twinkle', duration: 4600, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-dk-star8', group: 'st-dk-star', type: 'shape', shapeKind: 'circle', x: 74, y: 300, width: 4, height: 4, fill: { $t: 'colors.ink' }, opacity: 0.4, zIndex: 2 },
      // 落日余晖（径向暖光）
      { id: 'st-dk-glow', type: 'overlay', x: 180, y: 380, width: 720, height: 620, background: 'radial-gradient(50% 50% at 50% 50%, rgba(245,162,93,0.55) 0%, rgba(245,162,93,0) 70%)', zIndex: 3 },
      // 落日本体（下半被远岭遮住，像正在落山）
      { id: 'st-dk-sun', type: 'shape', shapeKind: 'circle', x: 420, y: 600, width: 240, height: 240, fill: { $t: 'colors.glow' }, shadow: { offsetX: 0, offsetY: 0, blur: 90, color: { $t: 'colors.glow' } }, zIndex: 3, animation: { name: 'glow', duration: 7200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      // 第一层（最远，最亮最雾）
      { id: 'st-dk-l1', group: 'st-dk-l', type: 'shape', shapeKind: 'circle', x: -560, y: 760, width: 2200, height: 760, rotation: -4, fill: { $t: 'colors.layer1' }, opacity: 0.55, zIndex: 4, animation: { name: 'drift', duration: 18000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      // 层间雾气一
      { id: 'st-dk-haze1', type: 'shape', shapeKind: 'circle', x: -310, y: 800, width: 1700, height: 260, fill: { $t: 'colors.layer1' }, opacity: 0.16, zIndex: 5 },
      // 第二层（中景）
      { id: 'st-dk-l2', group: 'st-dk-l', type: 'shape', shapeKind: 'circle', x: -460, y: 880, width: 2000, height: 700, rotation: 3, fill: { $t: 'colors.layer2' }, opacity: 0.78, zIndex: 6, animation: { name: 'drift', duration: 21000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      // 层间雾气二
      { id: 'st-dk-haze2', type: 'shape', shapeKind: 'circle', x: -360, y: 950, width: 1800, height: 240, fill: { $t: 'colors.layer2' }, opacity: 0.15, zIndex: 7 },
      // 第三层（近景）
      { id: 'st-dk-l3', group: 'st-dk-l', type: 'shape', shapeKind: 'circle', x: -520, y: 1010, width: 2100, height: 640, rotation: -3, fill: { $t: 'colors.layer3' }, opacity: 0.92, zIndex: 8, animation: { name: 'drift', duration: 24000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      // 远景灯火（压在远岭线上）
      { id: 'st-dk-lamp1', type: 'shape', shapeKind: 'circle', x: 250, y: 736, width: 6, height: 6, fill: { $t: 'colors.glow' }, opacity: 0.9, zIndex: 9 },
      { id: 'st-dk-lamp2', type: 'shape', shapeKind: 'circle', x: 832, y: 744, width: 5, height: 5, fill: { $t: 'colors.glow' }, opacity: 0.8, zIndex: 9 },
      // 第四层（前景，与夜色融为一体）
      { id: 'st-dk-l4', group: 'st-dk-l', type: 'shape', shapeKind: 'circle', x: -660, y: 1160, width: 2400, height: 760, rotation: 2, fill: { $t: 'colors.bg' }, opacity: 0.96, zIndex: 9, animation: { name: 'drift', duration: 27000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      // 底部文字上方的细线
      { id: 'st-dk-rule', type: 'shape', shapeKind: 'line', x: 90, y: 1176, width: 300, height: 2, fill: { $t: 'colors.ink' }, opacity: 0.3, zIndex: 10 },
      // 顶部眉标
      { id: 'st-dk-kicker', type: 'text', content: 'ST FILMS · 暮色系列', fontFamily: { $t: 'fonts.mono' }, fontSize: 24, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.72, letterSpacing: 5, x: 90, y: 112, width: 700, height: 36, zIndex: 11, animation: { name: 'fadeIn', duration: 700 } },
      // 主标题（中文，单行）
      { id: 'st-dk-title', type: 'text', content: '暮色苍茫', fontFamily: { $t: 'fonts.cjk' }, fontSize: 116, fontWeight: '700', color: { $t: 'colors.ink' }, letterSpacing: 16, lineHeight: 1.2, x: 90, y: 240, width: 900, height: 150, zIndex: 11, animation: { name: 'fadeInUp', duration: 1000, easing: 'ease-out' }, editable: { content: true, fontSize: { type: 'range', min: 92, max: 132 } } },
      // 英文副题
      { id: 'st-dk-en', type: 'text', content: 'DUSK, IN LAYERS', fontFamily: { $t: 'fonts.display' }, fontSize: 34, color: { $t: 'colors.ink' }, opacity: 0.78, letterSpacing: 8, lineHeight: 1.3, x: 90, y: 420, width: 900, height: 50, zIndex: 11, animation: { name: 'rise', duration: 900, delay: 200 }, editable: { content: true } },
      // 底部小注
      { id: 'st-dk-sub', type: 'text', content: '黄昏落进山谷的第十九次', fontFamily: { $t: 'fonts.cjk' }, fontSize: 30, color: { $t: 'colors.ink' }, opacity: 0.86, lineHeight: 1.3, x: 90, y: 1196, width: 700, height: 44, zIndex: 11, animation: { name: 'rise', duration: 900, delay: 320 }, editable: { content: true } },
      // 元数据
      { id: 'st-dk-meta', type: 'text', content: 'SCENE 07  /  18:42  /  ST FILMS', fontFamily: { $t: 'fonts.mono' }, fontSize: 20, color: { $t: 'colors.ink' }, opacity: 0.55, letterSpacing: 3, lineHeight: 1.3, x: 90, y: 1252, width: 700, height: 30, zIndex: 11 },
      // 颗粒
      { id: 'st-dk-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1350, background: `url("${grainSoft(320, 47, 0.5)}")`, opacity: 0.05, mixBlendMode: 'overlay', zIndex: 13 }
    ]
  }
]

// src/core/templates/tech/hy-iso-platform.ts
// HY 系列 · 等轴悬浮平台（4:5 竖版）｜ 对标 Isometric 3D 渲染 + 柔和投影的当代科技审美
import type { Template } from '@/types/types'
import {SANS, HEI, MONO, grainSoft} from '../_fx/trend'

export const hyIsoPlatformTemplates: Template[] = [
  {
    id: 'hy-iso-platform', name: '等轴悬浮平台', version: '1.0.0', category: 'tech',
    tags: ['hy', 'isometric', '3d', 'platform', 'soft shadow', '4:5', 'tech'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="125" viewBox="0 0 100 125"><rect width="100" height="125" fill="%23EEF2FF"/><rect x="18" y="30" width="60" height="24" fill="%23A5B4FC" transform="rotate(-16 48 42)"/><rect x="14" y="58" width="66" height="26" fill="%23C4B5FD" transform="rotate(-16 47 71)"/><rect x="20" y="88" width="58" height="22" fill="%2386EFAC" transform="rotate(-16 49 99)"/><rect x="70" y="20" width="16" height="16" fill="%23FB7185" transform="rotate(45 78 28)"/></svg>',
    tokens: {
      colors: {
        bg: { label: '底色', default: '#EEF2FF', options: ['#EEF2FF', '#F5F3FF', '#F0FDFA', '#0F172A'] },
        ink: { label: '文字', default: '#1E1B4B', options: ['#1E1B4B', '#0F172A', '#312E81', '#E0E7FF'] },
        deck1: { label: '平台1', default: '#A5B4FC', options: ['#A5B4FC', '#93C5FD', '#C4B5FD', '#67E8F9'] },
        deck2: { label: '平台2', default: '#C4B5FD', options: ['#C4B5FD', '#A5B4FC', '#FBCFE8', '#5EEAD4'] },
        deck3: { label: '平台3', default: '#86EFAC', options: ['#86EFAC', '#FDE68A', '#99F6E4', '#FDBA74'] },
        accent: { label: '点缀', default: '#FB7185', options: ['#FB7185', '#F59E0B', '#34D399', '#818CF8'] }
      },
      fonts: {
        display: { label: '英文标题', default: SANS, options: [SANS, MONO, HEI] },
        cjk: { label: '中文', default: HEI, options: [HEI, SANS, MONO] },
        mono: { label: '等宽标注', default: MONO, options: [MONO, SANS, HEI] }
      }
    },
    presets: [
      { name: '靛蓝薄雾', colors: { bg: '#EEF2FF', ink: '#1E1B4B', deck1: '#A5B4FC', deck2: '#C4B5FD', deck3: '#86EFAC', accent: '#FB7185' } },
      { name: '雾紫晴天', colors: { bg: '#F5F3FF', ink: '#312E81', deck1: '#93C5FD', deck2: '#A5B4FC', deck3: '#FDE68A', accent: '#F59E0B' } },
      { name: '薄荷玻璃', colors: { bg: '#F0FDFA', ink: '#0F172A', deck1: '#C4B5FD', deck2: '#FBCFE8', deck3: '#99F6E4', accent: '#34D399' } },
      { name: '深海夜航', colors: { bg: '#0F172A', ink: '#E0E7FF', deck1: '#67E8F9', deck2: '#5EEAD4', deck3: '#FDBA74', accent: '#818CF8' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      // 背景柔光（给等轴渲染打环境光）
      { id: 'ip-glow1', type: 'shape', shapeKind: 'circle', x: 620, y: 80, width: 520, height: 520, fill: { $t: 'colors.deck2' }, opacity: 0.22, zIndex: 1 },
      { id: 'ip-glow2', type: 'shape', shapeKind: 'circle', x: -160, y: 700, width: 560, height: 560, fill: { $t: 'colors.deck1' }, opacity: 0.18, zIndex: 1 },
      { id: 'ip-sky', type: 'overlay', x: 0, y: 0, width: 1080, height: 1350, background: 'linear-gradient(160deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 55%)', opacity: 0.7, zIndex: 1 },
      // 第一层平台（最远最小）
      { id: 'ip-d1', group: 'ip-d', type: 'shape', shapeKind: 'rect', x: 250, y: 200, width: 620, height: 300, rotation: -16, borderRadius: 40, fill: { $t: 'colors.deck1' }, opacity: 0.95, shadow: { offsetX: 0, offsetY: 26, blur: 44, color: '#000000'}, zIndex: 2, animation: { name: 'float', duration: 7600, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'ip-d1edge', type: 'shape', shapeKind: 'rect', x: 250, y: 200, width: 620, height: 300, rotation: -16, borderRadius: 40, fill: 'transparent', border: { width: 2, color: { $t: 'colors.ink' } }, opacity: 0.12, zIndex: 3 },
      // 第二层平台（中景）
      { id: 'ip-d2', group: 'ip-d', type: 'shape', shapeKind: 'rect', x: 170, y: 430, width: 760, height: 330, rotation: -16, borderRadius: 44, fill: { $t: 'colors.deck2' }, opacity: 0.96, shadow: { offsetX: 0, offsetY: 32, blur: 54, color: '#000000'}, zIndex: 4, animation: { name: 'float', duration: 8800, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'ip-d2edge', type: 'shape', shapeKind: 'rect', x: 170, y: 430, width: 760, height: 330, rotation: -16, borderRadius: 44, fill: 'transparent', border: { width: 2, color: { $t: 'colors.ink' } }, opacity: 0.12, zIndex: 5 },
      // 第三层平台（最近最大）
      { id: 'ip-d3', group: 'ip-d', type: 'shape', shapeKind: 'rect', x: 120, y: 690, width: 840, height: 360, rotation: -16, borderRadius: 48, fill: { $t: 'colors.deck3' }, opacity: 0.97, shadow: { offsetX: 0, offsetY: 40, blur: 64, color: '#000000'}, zIndex: 6, animation: { name: 'float', duration: 9600, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'ip-d3edge', type: 'shape', shapeKind: 'rect', x: 120, y: 690, width: 840, height: 360, rotation: -16, borderRadius: 48, fill: 'transparent', border: { width: 2, color: { $t: 'colors.ink' } }, opacity: 0.12, zIndex: 7 },
      // 等轴立方体（旋转 45° 的方块 = 菱形顶面）
      { id: 'ip-cube1', group: 'ip-cube', type: 'shape', shapeKind: 'rect', x: 700, y: 150, width: 170, height: 170, rotation: 45, borderRadius: 22, fill: { $t: 'colors.accent' }, shadow: { offsetX: 0, offsetY: 18, blur: 30, color: '#000000'}, zIndex: 8, animation: { name: 'spinSlow', duration: 22000, iterationCount: 'infinite', easing: 'linear' } },
      { id: 'ip-cube2', group: 'ip-cube', type: 'shape', shapeKind: 'rect', x: 140, y: 300, width: 120, height: 120, rotation: 45, borderRadius: 18, fill: { $t: 'colors.accent' }, opacity: 0.75, shadow: { offsetX: 0, offsetY: 14, blur: 26, color: '#000000'}, zIndex: 8, animation: { name: 'float', duration: 6800, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'ip-cube3', group: 'ip-cube', type: 'shape', shapeKind: 'rect', x: 860, y: 600, width: 96, height: 96, rotation: 45, borderRadius: 14, fill: { $t: 'colors.ink' }, opacity: 0.45, zIndex: 8 },
      // 连接线（等轴结构的支撑感）
      { id: 'ip-link1', type: 'shape', shapeKind: 'line', x: 470, y: 330, width: 2, height: 140, rotation: 16, fill: { $t: 'colors.ink' }, opacity: 0.16, zIndex: 8 },
      { id: 'ip-link2', type: 'shape', shapeKind: 'line', x: 620, y: 560, width: 2, height: 160, rotation: 16, fill: { $t: 'colors.ink' }, opacity: 0.16, zIndex: 8 },
      // 顶部标注
      { id: 'ip-hy', type: 'text', content: 'HY', fontFamily: { $t: 'fonts.mono' }, fontSize: 26, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.5, letterSpacing: 4, x: 90, y: 92, width: 220, height: 36, zIndex: 10 },
      { id: 'ip-kicker', type: 'text', content: 'ISOMETRIC  /  SYSTEM 03', fontFamily: { $t: 'fonts.mono' }, fontSize: 22, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.6, letterSpacing: 2, textAlign: 'right', x: 610, y: 92, width: 410, height: 34, zIndex: 10, animation: { name: 'fadeIn', duration: 600 } },
      // 底部文字组
      { id: 'ip-title', type: 'text', content: 'Layered Systems', fontFamily: { $t: 'fonts.display' }, fontSize: 88, fontWeight: '800', color: { $t: 'colors.ink' }, lineHeight: 1.08, letterSpacing: -2, x: 90, y: 1070, width: 800, height: 130, zIndex: 10, animation: { name: 'fadeInUp', duration: 900 }, editable: { content: true, fontSize: { type: 'range', min: 92, max: 132 } } },
      { id: 'ip-sub', type: 'text', content: '一层层搭起来的产品叙事', fontFamily: { $t: 'fonts.cjk' }, fontSize: 30, color: { $t: 'colors.ink' }, opacity: 0.72, x: 90, y: 1190, width: 700, height: 44, zIndex: 10, animation: { name: 'rise', duration: 900, delay: 180 }, editable: { content: true } },
      { id: 'ip-rule', type: 'shape', shapeKind: 'line', x: 90, y: 1040, width: 900, height: 3, fill: { $t: 'colors.ink' }, opacity: 0.18, zIndex: 10 },
      { id: 'ip-meta', type: 'text', content: 'STACKED · HY-03', fontFamily: { $t: 'fonts.mono' }, fontSize: 20, color: { $t: 'colors.ink' }, opacity: 0.5, letterSpacing: 2, textAlign: 'right', x: 640, y: 1196, width: 350, height: 32, zIndex: 10 },
      { id: 'ip-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1350, background: `url("${grainSoft(300, 21, 0.5)}")`, opacity: 0.035, mixBlendMode: 'multiply', zIndex: 12 }
    ]
  }
]

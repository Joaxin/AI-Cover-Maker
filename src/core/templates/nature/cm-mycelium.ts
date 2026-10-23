// src/core/templates/nature/cm-mycelium.ts
// CM 系列 · 菌丝网络（自然 / 生命网络封面）｜ 隐性 CM 标记
import type { Template } from '@/types/types'
import { SANS, HEI, SERIF, grainSoft } from '../_fx/trend'

export const cmMyceliumTemplates: Template[] = [
  {
    id: 'cm-mycelium', name: '菌丝网络', version: '1.0.0', category: 'nature',
    tags: ['cm', 'mycelium', 'network', 'nature', 'cover'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="56" viewBox="0 0 100 56"><rect width="100" height="56" fill="%230E1B14"/><line x1="30" y1="40" x2="55" y2="20" stroke="%237EE787" stroke-width="1.4"/><line x1="55" y1="20" x2="80" y2="38" stroke="%2356D364" stroke-width="1.4"/><circle cx="30" cy="40" r="4" fill="%237EE787"/><circle cx="55" cy="20" r="5" fill="%2356D364"/><circle cx="80" cy="38" r="4" fill="%23A7F3D0"/><rect x="8" y="46" width="40" height="3" fill="%23E8F5EC"/><rect x="8" y="51" width="24" height="3" fill="%23E8F5EC" opacity="0.5"/></svg>',
    tokens: {
      colors: {
        bg: { label: '底色', default: '#0E1B14', options: ['#0E1B14', '#0C1712', '#10180F', '#0B1418'] },
        ink: { label: '文字', default: '#E8F5EC', options: ['#E8F5EC', '#EAF6EE', '#E6F5F0', '#DFF3E8'] },
        accent: { label: '强调', default: '#7EE787', options: ['#7EE787', '#86EFAC', '#4ADE80', '#A3E635'] },
        c1: { label: '辅助1', default: '#56D364', options: ['#56D364', '#34D399', '#22C55E', '#4ADE80'] },
        c2: { label: '辅助2', default: '#A7F3D0', options: ['#A7F3D0', '#BBF7D0', '#C7F9E9', '#D9F99D'] }
      },
      fonts: {
        display: { label: '英文标题', default: SANS, options: [SANS, SERIF] },
        cjk: { label: '中文', default: HEI, options: [HEI, SANS] }
      }
    },
    presets: [
      { name: '林下嫩绿', colors: { bg: '#0E1B14', ink: '#E8F5EC', accent: '#7EE787', c1: '#56D364', c2: '#A7F3D0' } },
      { name: '苔原深青', colors: { bg: '#0C1712', ink: '#EAF6EE', accent: '#86EFAC', c1: '#34D399', c2: '#BBF7D0' } },
      { name: '苗圃新绿', colors: { bg: '#10180F', ink: '#E6F5F0', accent: '#4ADE80', c1: '#22C55E', c2: '#C7F9E9' } },
      { name: '湖畔芽黄', colors: { bg: '#0B1418', ink: '#DFF3E8', accent: '#A3E635', c1: '#4ADE80', c2: '#D9F99D' } }
    ],
    canvas: { virtualWidth: 1920, virtualHeight: 1080, defaultWidth: 1920, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      // 菌丝网络（节点 + 横竖连接线，仿生命网络）
      { id: 'cm-my-n1', group: 'cm-my-n', type: 'shape', shapeKind: 'circle', x: 1102, y: 342, width: 36, height: 36, fill: { $t: 'colors.accent' }, opacity: 0.9, zIndex: 3 },
      { id: 'cm-my-n2', group: 'cm-my-n', type: 'shape', shapeKind: 'circle', x: 1442, y: 342, width: 36, height: 36, fill: { $t: 'colors.c1' }, opacity: 0.9, zIndex: 3 },
      { id: 'cm-my-n3', group: 'cm-my-n', type: 'shape', shapeKind: 'circle', x: 1782, y: 342, width: 36, height: 36, fill: { $t: 'colors.c2' }, opacity: 0.9, zIndex: 3 },
      { id: 'cm-my-n4', group: 'cm-my-n', type: 'shape', shapeKind: 'circle', x: 1102, y: 702, width: 36, height: 36, fill: { $t: 'colors.c1' }, opacity: 0.9, zIndex: 3 },
      { id: 'cm-my-n5', group: 'cm-my-n', type: 'shape', shapeKind: 'circle', x: 1442, y: 702, width: 36, height: 36, fill: { $t: 'colors.accent' }, opacity: 0.9, zIndex: 3, animation: { name: 'pulse', duration: 2600, iterationCount: 'infinite' } },
      { id: 'cm-my-n6', group: 'cm-my-n', type: 'shape', shapeKind: 'circle', x: 1782, y: 702, width: 36, height: 36, fill: { $t: 'colors.c1' }, opacity: 0.9, zIndex: 3 },
      { id: 'cm-my-h1', group: 'cm-my-h', type: 'shape', shapeKind: 'line', x: 1120, y: 360, width: 320, height: 2, fill: { $t: 'colors.ink' }, opacity: 0.28, zIndex: 2 },
      { id: 'cm-my-h2', group: 'cm-my-h', type: 'shape', shapeKind: 'line', x: 1460, y: 360, width: 320, height: 2, fill: { $t: 'colors.ink' }, opacity: 0.28, zIndex: 2 },
      { id: 'cm-my-h3', group: 'cm-my-h', type: 'shape', shapeKind: 'line', x: 1120, y: 720, width: 320, height: 2, fill: { $t: 'colors.ink' }, opacity: 0.28, zIndex: 2 },
      { id: 'cm-my-h4', group: 'cm-my-h', type: 'shape', shapeKind: 'line', x: 1460, y: 720, width: 320, height: 2, fill: { $t: 'colors.ink' }, opacity: 0.28, zIndex: 2 },
      { id: 'cm-my-v1', group: 'cm-my-v', type: 'shape', shapeKind: 'line', x: 1120, y: 360, width: 2, height: 360, fill: { $t: 'colors.ink' }, opacity: 0.28, zIndex: 2 },
      { id: 'cm-my-v2', group: 'cm-my-v', type: 'shape', shapeKind: 'line', x: 1460, y: 360, width: 2, height: 360, fill: { $t: 'colors.ink' }, opacity: 0.28, zIndex: 2 },
      { id: 'cm-my-v3', group: 'cm-my-v', type: 'shape', shapeKind: 'line', x: 1800, y: 360, width: 2, height: 360, fill: { $t: 'colors.ink' }, opacity: 0.28, zIndex: 2 },
      // 辉光
      { id: 'cm-my-glow', type: 'shape', shapeKind: 'circle', x: 1240, y: 380, width: 600, height: 600, fill: { $t: 'colors.accent' }, opacity: 0.08, zIndex: 1, animation: { name: 'float', duration: 8800, iterationCount: 'infinite', easing: 'ease-in-out' } },
      // 文字层
      { id: 'cm-my-kicker', type: 'text', content: 'MYCELIUM · 菌丝网络', fontFamily: { $t: 'fonts.display' }, fontSize: 28, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.72, letterSpacing: 6, x: 120, y: 180, width: 900, height: 40, zIndex: 5, animation: { name: 'fadeIn', duration: 600 } },
      { id: 'cm-my-title', type: 'text', content: 'Quiet\nnetwork.', fontFamily: { $t: 'fonts.display' }, fontSize: 150, fontWeight: '800', color: { $t: 'colors.ink' }, lineHeight: 1.05, letterSpacing: -3, x: 120, y: 300, width: 900, height: 360, zIndex: 6, animation: { name: 'fadeInUp', duration: 900 }, editable: { content: true, fontSize: { type: 'range', min: 120, max: 180 } } },
      { id: 'cm-my-sub', type: 'text', content: '地下沉默相连的众生。', fontFamily: { $t: 'fonts.cjk' }, fontSize: 36, color: { $t: 'colors.ink' }, opacity: 0.82, x: 120, y: 720, width: 900, height: 60, zIndex: 6, animation: { name: 'rise', duration: 900, delay: 200 }, editable: { content: true } },
      { id: 'cm-my-cta', type: 'shape', shapeKind: 'rect', x: 120, y: 820, width: 320, height: 84, fill: { $t: 'colors.ink' }, borderRadius: 42, zIndex: 6, animation: { name: 'fadeInUp', duration: 800, delay: 320 } },
      { id: 'cm-my-cta-t', type: 'text', content: '走进森林', fontFamily: { $t: 'fonts.cjk' }, fontSize: 30, fontWeight: '700', color: { $t: 'colors.bg' }, textAlign: 'center', lineHeight: 2.8, x: 120, y: 820, width: 320, height: 84, zIndex: 7, editable: { content: true } },
      { id: 'cm-my-badge', type: 'text', content: 'NEW · 2.5', fontFamily: { $t: 'fonts.display' }, fontSize: 26, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 4, textAlign: 'right', x: 1560, y: 120, width: 300, height: 36, zIndex: 5, animation: { name: 'fadeIn', duration: 600, delay: 120 } },
      { id: 'cm-my-decor', type: 'text', content: '51', fontFamily: { $t: 'fonts.display' }, fontSize: 300, fontWeight: '800', color: { $t: 'colors.ink' }, opacity: 0.05, textAlign: 'right', x: 1140, y: 520, width: 740, height: 540, zIndex: 4 },
      { id: 'cm-my-watermark', type: 'text', content: 'CM · UNDERGROUND', fontFamily: { $t: 'fonts.display' }, fontSize: 24, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.06, letterSpacing: 4, x: 120, y: 1000, width: 600, height: 30, zIndex: 8 },
      { id: 'cm-my-grain', type: 'overlay', x: 0, y: 0, width: 1920, height: 1080, background: `url("${grainSoft(320, 9, 0.5)}")`, opacity: 0.05, mixBlendMode: 'screen', zIndex: 9 }
    ]
  }
]

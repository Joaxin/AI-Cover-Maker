// src/core/templates/knowledge/hy4-orbit-graph.ts —— 轨道信息图 Orbit Graph（1:1）
// 轨道语言：深色底 + 同心轨道环 + 环上节点 + 中心核心 + 等宽图例。
// HY4 标记：id / 导出名 / tags 带 hy4，图例行嵌入「HY4 / ORBIT」。
import type { Template } from '@/types/types'
import { HEI, MONO, SANS, grain } from '../_fx/trend'

export const hy4OrbitGraphTemplates: Template[] = [
  {
    id: 'hy4-orbit-graph', name: '轨道信息图', version: '1.0.0', category: 'knowledge',
    tags: ['hy4', 'knowledge', 'orbit', 'infographic', 'data', 'mono', '1:1'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="108" height="108" viewBox="0 0 108 108"><rect width="108" height="108" fill="%230C1424"/><g fill="none" stroke="%234EA8DE" stroke-opacity="0.6" stroke-width="1.2"><circle cx="54" cy="56" r="34"/><circle cx="54" cy="56" r="24"/><circle cx="54" cy="56" r="14"/></g><circle cx="54" cy="56" r="6" fill="%23F2B33D"/><circle cx="88" cy="56" r="3.5" fill="%234EA8DE"/><circle cx="54" cy="22" r="3" fill="%234EA8DE"/><circle cx="30" cy="78" r="3" fill="%23E45C7A"/><rect x="14" y="92" width="46" height="4" rx="2" fill="%23E8EEF6"/><rect x="66" y="92" width="28" height="4" rx="2" fill="%234EA8DE" opacity="0.7"/></svg>',
    tokens: {
      colors: {
        bg: { label: '底', default: '#0C1424', options: ['#0C1424', '#101A2E', '#F5F6F8', '#0A1A18'] },
        ink: { label: '主字', default: '#E8EEF6', options: ['#E8EEF6', '#DEE7F2', '#1A2231', '#E3F2EE'] },
        ring: { label: '轨道', default: '#4EA8DE', options: ['#4EA8DE', '#63B8FF', '#2E8FB0', '#5BC0A8'] },
        core: { label: '核心', default: '#F2B33D', options: ['#F2B33D', '#FFC94D', '#D9822B', '#FFD98A'] },
        node: { label: '节点', default: '#E45C7A', options: ['#E45C7A', '#FF7A94', '#7A5CE4', '#E48A5C'] }
      },
      fonts: { heading: { label: '标题', default: HEI, options: [HEI, SANS] }, note: { label: '图例', default: MONO, options: [MONO, SANS] } }
    },
    presets: [
      { name: '深空蓝', colors: { bg: '#0C1424', ink: '#E8EEF6', ring: '#4EA8DE', core: '#F2B33D', node: '#E45C7A' } },
      { name: '午夜蓝', colors: { bg: '#101A2E', ink: '#DEE7F2', ring: '#63B8FF', core: '#FFC94D', node: '#FF7A94' } },
      { name: '纸面图', colors: { bg: '#F5F6F8', ink: '#1A2231', ring: '#2E8FB0', core: '#D9822B', node: '#7A5CE4' } },
      { name: '墨绿图', colors: { bg: '#0A1A18', ink: '#E3F2EE', ring: '#5BC0A8', core: '#FFD98A', node: '#E48A5C' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1080, defaultWidth: 1080, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      // 轨道环
      { id: 'hy4-ob-r1', group: 'hy4-ob-r', type: 'shape', shapeKind: 'circle', x: 280, y: 380, width: 520, height: 520, fill: 'transparent', border: { width: 2, color: { $t: 'colors.ring' } }, opacity: 0.75, zIndex: 3, animation: { name: 'zoomIn', duration: 900 } },
      { id: 'hy4-ob-r2', group: 'hy4-ob-r', type: 'shape', shapeKind: 'circle', x: 360, y: 460, width: 360, height: 360, fill: 'transparent', border: { width: 2, color: { $t: 'colors.ring' } }, opacity: 0.6, zIndex: 3, animation: { name: 'zoomIn', duration: 900, delay: 120 } },
      { id: 'hy4-ob-r3', group: 'hy4-ob-r', type: 'shape', shapeKind: 'circle', x: 440, y: 540, width: 200, height: 200, fill: 'transparent', border: { width: 2, color: { $t: 'colors.ring' } }, opacity: 0.5, zIndex: 3, animation: { name: 'zoomIn', duration: 900, delay: 240 } },
      // 环上节点
      { id: 'hy4-ob-n1', group: 'hy4-ob-n', type: 'shape', shapeKind: 'circle', x: 776, y: 616, width: 44, height: 44, fill: { $t: 'colors.node' }, zIndex: 5, animation: { name: 'pulse', duration: 3000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'hy4-ob-n2', group: 'hy4-ob-n', type: 'shape', shapeKind: 'circle', x: 520, y: 420, width: 36, height: 36, fill: { $t: 'colors.ring' }, zIndex: 5, animation: { name: 'twinkle', duration: 3600, iterationCount: 'infinite' } },
      { id: 'hy4-ob-n3', group: 'hy4-ob-n', type: 'shape', shapeKind: 'circle', x: 290, y: 700, width: 32, height: 32, fill: { $t: 'colors.node' }, opacity: 0.85, zIndex: 5, animation: { name: 'twinkle', duration: 4200, delay: 600, iterationCount: 'infinite' } },
      { id: 'hy4-ob-n4', group: 'hy4-ob-n', type: 'shape', shapeKind: 'circle', x: 620, y: 876, width: 28, height: 28, fill: { $t: 'colors.ring' }, opacity: 0.8, zIndex: 5 },
      // 中心核心
      { id: 'hy4-ob-core', type: 'shape', shapeKind: 'circle', x: 494, y: 594, width: 92, height: 92, fill: { $t: 'colors.core' }, zIndex: 6, shadow: { offsetX: 0, offsetY: 0, blur: 40, color: { $t: 'colors.core' } }, animation: { name: 'glow', duration: 4200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'hy4-ob-core-label', type: 'text', content: '42', fontFamily: { $t: 'fonts.note' }, fontSize: 30, fontWeight: '700', color: { $t: 'colors.bg' }, textAlign: 'center', x: 494, y: 622, width: 92, height: 38, zIndex: 7 },
      // 十字辅助线
      { id: 'hy4-ob-cross-v', type: 'shape', shapeKind: 'rect', x: 539, y: 330, width: 1, height: 520, fill: { $t: 'colors.ring' }, opacity: 0.28, zIndex: 4 },
      { id: 'hy4-ob-cross-h', type: 'shape', shapeKind: 'rect', x: 230, y: 639, width: 620, height: 1, fill: { $t: 'colors.ring' }, opacity: 0.28, zIndex: 4 },
      // 文字
      { id: 'hy4-ob-kicker', type: 'text', content: 'ORBIT ANALYSIS / 轨道分析', fontFamily: { $t: 'fonts.note' }, fontSize: 24, fontWeight: '700', color: { $t: 'colors.ring' }, opacity: 0.9, letterSpacing: 6, x: 80, y: 96, width: 700, height: 34, zIndex: 9, animation: { name: 'slideInLeft', duration: 700 } },
      { id: 'hy4-ob-title', type: 'text', content: '数据\n轨道', fontFamily: { $t: 'fonts.heading' }, fontSize: 104, fontWeight: '800', color: { $t: 'colors.ink' }, lineHeight: 1.06, letterSpacing: 2, x: 80, y: 150, width: 620, height: 230, zIndex: 9, animation: { name: 'fadeInUp', duration: 900, delay: 160 }, editable: { content: true, fontSize: { type: 'range', min: 84, max: 116 } } },
      { id: 'hy4-ob-sub', type: 'text', content: '三个层级，一条主线。', fontFamily: { $t: 'fonts.heading' }, fontSize: 30, color: { $t: 'colors.ink' }, opacity: 0.7, letterSpacing: 2, x: 80, y: 396, width: 520, height: 44, zIndex: 9, animation: { name: 'rise', duration: 800, delay: 340 }, editable: { content: true } },
      // 图例
      { id: 'hy4-ob-lg1-dot', type: 'shape', shapeKind: 'circle', x: 80, y: 962, width: 18, height: 18, fill: { $t: 'colors.core' }, zIndex: 9 },
      { id: 'hy4-ob-lg1', type: 'text', content: '核心指标', fontFamily: { $t: 'fonts.note' }, fontSize: 22, color: { $t: 'colors.ink' }, opacity: 0.72, letterSpacing: 2, x: 110, y: 958, width: 220, height: 30, zIndex: 9 },
      { id: 'hy4-ob-lg2-dot', type: 'shape', shapeKind: 'circle', x: 350, y: 962, width: 18, height: 18, fill: { $t: 'colors.node' }, zIndex: 9 },
      { id: 'hy4-ob-lg2', type: 'text', content: '外部节点', fontFamily: { $t: 'fonts.note' }, fontSize: 22, color: { $t: 'colors.ink' }, opacity: 0.72, letterSpacing: 2, x: 380, y: 958, width: 220, height: 30, zIndex: 9 },
      { id: 'hy4-ob-hy', type: 'text', content: 'HY4 / ORBIT', fontFamily: { $t: 'fonts.note' }, fontSize: 22, color: { $t: 'colors.ring' }, opacity: 0.8, letterSpacing: 4, textAlign: 'right', x: 700, y: 958, width: 300, height: 30, zIndex: 9 },
      { id: 'hy4-ob-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1080, background: `url("${grain(300, 43, 0.5)}")`, opacity: 0.06, mixBlendMode: 'overlay', zIndex: 20 }
    ]
  }
]

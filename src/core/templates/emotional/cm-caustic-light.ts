// src/core/templates/emotional/cm-caustic-light.ts
// CM 系列 · 水光折射（情绪 / 光影封面）｜ 隐性 CM 标记
import type { Template } from '@/types/types'
import { SANS, HEI, SERIF, grainSoft } from '../_fx/trend'

export const cmCausticLightTemplates: Template[] = [
  {
    id: 'cm-caustic-light', name: '水光折射', version: '1.0.0', category: 'emotional',
    tags: ['cm', 'caustic', 'light', 'water', 'emotional', 'cover'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="56" viewBox="0 0 100 56"><rect width="100" height="56" fill="%2306262B"/><circle cx="30" cy="22" r="18" fill="%2338BDF8" opacity="0.55"/><circle cx="64" cy="40" r="14" fill="%2367E8F9" opacity="0.5"/><circle cx="80" cy="14" r="9" fill="%23A7F3D0" opacity="0.5"/><rect x="8" y="46" width="40" height="3" fill="%23EAF6F5"/><rect x="8" y="51" width="24" height="3" fill="%23EAF6F5" opacity="0.5"/></svg>',
    tokens: {
      colors: {
        bg: { label: '底色', default: '#06262B', options: ['#06262B', '#0B1F3A', '#10242B', '#1B1030'] },
        ink: { label: '文字', default: '#EAF6F5', options: ['#EAF6F5', '#F0FBFF', '#E8F0FF', '#F5F0FF'] },
        accent: { label: '强调', default: '#38BDF8', options: ['#38BDF8', '#22D3EE', '#60A5FA', '#818CF8'] },
        c1: { label: '辅助1', default: '#67E8F9', options: ['#67E8F9', '#5EEAD4', '#7DD3FC', '#A5F3FC'] },
        c2: { label: '辅助2', default: '#A7F3D0', options: ['#A7F3D0', '#BBF7D0', '#C7F9E9', '#D9F99D'] }
      },
      fonts: {
        display: { label: '英文标题', default: SANS, options: [SANS, SERIF] },
        cjk: { label: '中文', default: HEI, options: [HEI, SANS] }
      }
    },
    presets: [
      { name: '深海青光', colors: { bg: '#06262B', ink: '#EAF6F5', accent: '#38BDF8', c1: '#67E8F9', c2: '#A7F3D0' } },
      { name: '夜空靛蓝', colors: { bg: '#0B1F3A', ink: '#F0FBFF', accent: '#60A5FA', c1: '#7DD3FC', c2: '#C7F9E9' } },
      { name: '松石冷调', colors: { bg: '#10242B', ink: '#E8F0FF', accent: '#22D3EE', c1: '#5EEAD4', c2: '#BBF7D0' } },
      { name: '紫夜柔光', colors: { bg: '#1B1030', ink: '#F5F0FF', accent: '#818CF8', c1: '#A5F3FC', c2: '#D9F99D' } }
    ],
    canvas: { virtualWidth: 1920, virtualHeight: 1080, defaultWidth: 1920, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      // 水光团（大圆 + 低透明度，相互叠加成 caustic 折射）
      { id: 'cm-cl-g1', group: 'cm-cl-g', type: 'shape', shapeKind: 'circle', x: -120, y: -100, width: 720, height: 720, fill: { $t: 'colors.accent' }, opacity: 0.28, zIndex: 1, animation: { name: 'float', duration: 8200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'cm-cl-g2', group: 'cm-cl-g', type: 'shape', shapeKind: 'circle', x: 1360, y: 260, width: 820, height: 820, fill: { $t: 'colors.c1' }, opacity: 0.24, zIndex: 1, animation: { name: 'drift', duration: 9800, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'cm-cl-g3', group: 'cm-cl-g', type: 'shape', shapeKind: 'circle', x: 620, y: 520, width: 680, height: 680, fill: { $t: 'colors.c2' }, opacity: 0.20, zIndex: 1, animation: { name: 'float', duration: 7600, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'cm-cl-g4', group: 'cm-cl-g', type: 'shape', shapeKind: 'circle', x: 220, y: 560, width: 460, height: 460, fill: { $t: 'colors.accent' }, opacity: 0.18, zIndex: 1, animation: { name: 'heartbeat', duration: 6400, iterationCount: 'infinite', easing: 'ease-in-out' } },
      // 斜向光束（细线，低透明度）
      { id: 'cm-cl-ray1', type: 'shape', shapeKind: 'line', x: 300, y: -40, width: 2, height: 1180, fill: { $t: 'colors.ink' }, opacity: 0.08, rotation: 18, zIndex: 2 },
      { id: 'cm-cl-ray2', type: 'shape', shapeKind: 'line', x: 980, y: -40, width: 2, height: 1180, fill: { $t: 'colors.ink' }, opacity: 0.08, rotation: 18, zIndex: 2 },
      // 文字层
      { id: 'cm-cl-kicker', type: 'text', content: 'CAUSTICS · 水光之间', fontFamily: { $t: 'fonts.display' }, fontSize: 28, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.7, letterSpacing: 6, x: 120, y: 180, width: 1400, height: 40, zIndex: 5, animation: { name: 'fadeIn', duration: 600 } },
      { id: 'cm-cl-title', type: 'text', content: 'Light\nbends.', fontFamily: { $t: 'fonts.display' }, fontSize: 150, fontWeight: '800', color: { $t: 'colors.ink' }, lineHeight: 1.05, letterSpacing: -3, x: 120, y: 300, width: 1200, height: 360, zIndex: 6, animation: { name: 'fadeInUp', duration: 900 }, editable: { content: true, fontSize: { type: 'range', min: 120, max: 180 } } },
      { id: 'cm-cl-sub', type: 'text', content: '光在水的褶皱里弯折成诗。', fontFamily: { $t: 'fonts.cjk' }, fontSize: 36, color: { $t: 'colors.ink' }, opacity: 0.82, x: 120, y: 720, width: 1400, height: 60, zIndex: 6, animation: { name: 'rise', duration: 900, delay: 200 }, editable: { content: true } },
      { id: 'cm-cl-cta', type: 'shape', shapeKind: 'rect', x: 120, y: 820, width: 320, height: 84, fill: { $t: 'colors.ink' }, borderRadius: 42, zIndex: 6, animation: { name: 'fadeInUp', duration: 800, delay: 320 } },
      { id: 'cm-cl-cta-t', type: 'text', content: '沉浸观看', fontFamily: { $t: 'fonts.cjk' }, fontSize: 30, fontWeight: '700', color: { $t: 'colors.bg' }, textAlign: 'center', lineHeight: 2.8, x: 120, y: 820, width: 320, height: 84, zIndex: 7, editable: { content: true } },
      { id: 'cm-cl-badge', type: 'text', content: 'NEW · 2.5', fontFamily: { $t: 'fonts.display' }, fontSize: 26, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 4, textAlign: 'right', x: 1500, y: 180, width: 300, height: 36, zIndex: 5, animation: { name: 'fadeIn', duration: 600, delay: 120 } },
      { id: 'cm-cl-decor', type: 'text', content: '12', fontFamily: { $t: 'fonts.display' }, fontSize: 320, fontWeight: '800', color: { $t: 'colors.ink' }, opacity: 0.05, textAlign: 'right', x: 1140, y: 500, width: 740, height: 540, zIndex: 4 },
      { id: 'cm-cl-watermark', type: 'text', content: 'CM · AQUA REEL', fontFamily: { $t: 'fonts.display' }, fontSize: 24, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.06, letterSpacing: 4, x: 120, y: 1000, width: 600, height: 30, zIndex: 8 },
      { id: 'cm-cl-grain', type: 'overlay', x: 0, y: 0, width: 1920, height: 1080, background: `url("${grainSoft(320, 9, 0.5)}")`, opacity: 0.05, mixBlendMode: 'screen', zIndex: 9 }
    ]
  }
]

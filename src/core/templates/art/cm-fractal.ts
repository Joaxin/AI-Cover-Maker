// src/core/templates/art/cm-fractal.ts
// CM 系列 · 分形绽放（艺术 / 生成感封面）｜ 隐性 CM 标记
import type { Template } from '@/types/types'
import { SANS, HEI, SERIF, grainSoft } from '../_fx/trend'

export const cmFractalTemplates: Template[] = [
  {
    id: 'cm-fractal', name: '分形绽放', version: '1.0.0', category: 'art',
    tags: ['cm', 'fractal', 'bloom', 'generative', 'art', 'cover'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="56" viewBox="0 0 100 56"><rect width="100" height="56" fill="%23120B26"/><circle cx="50" cy="28" r="22" fill="%23C084FC" opacity="0.6"/><circle cx="50" cy="28" r="13" fill="%2367E8F9" opacity="0.7"/><circle cx="50" cy="28" r="5" fill="%23F0ABFC"/><rect x="8" y="46" width="40" height="3" fill="%23F3E8FF"/><rect x="8" y="51" width="24" height="3" fill="%23F3E8FF" opacity="0.5"/></svg>',
    tokens: {
      colors: {
        bg: { label: '底色', default: '#120B26', options: ['#120B26', '#0B1020', '#1A0F2E', '#0E1B22'] },
        ink: { label: '文字', default: '#F3E8FF', options: ['#F3E8FF', '#F8F0FF', '#E8F0FF', '#F0FFF8'] },
        accent: { label: '强调', default: '#C084FC', options: ['#C084FC', '#A78BFA', '#E879F9', '#D8B4FE'] },
        c1: { label: '辅助1', default: '#67E8F9', options: ['#67E8F9', '#22D3EE', '#7DD3FC', '#5EEAD4'] },
        c2: { label: '辅助2', default: '#F0ABFC', options: ['#F0ABFC', '#F9A8D4', '#FBCFE8', '#C4B5FD'] }
      },
      fonts: {
        display: { label: '英文标题', default: SANS, options: [SANS, SERIF] },
        cjk: { label: '中文', default: HEI, options: [HEI, SANS] }
      }
    },
    presets: [
      { name: '紫晶绽放', colors: { bg: '#120B26', ink: '#F3E8FF', accent: '#C084FC', c1: '#67E8F9', c2: '#F0ABFC' } },
      { name: '靛夜生成', colors: { bg: '#0B1020', ink: '#F8F0FF', accent: '#A78BFA', c1: '#22D3EE', c2: '#F9A8D4' } },
      { name: '酒紫深处', colors: { bg: '#1A0F2E', ink: '#E8F0FF', accent: '#E879F9', c1: '#7DD3FC', c2: '#FBCFE8' } },
      { name: '湖绿萌发', colors: { bg: '#0E1B22', ink: '#F0FFF8', accent: '#D8B4FE', c1: '#5EEAD4', c2: '#C4B5FD' } }
    ],
    canvas: { virtualWidth: 1920, virtualHeight: 1080, defaultWidth: 1920, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      // 分形绽放（同心光团 + 放射，仿生成感）
      { id: 'cm-fr-g1', group: 'cm-fr-g', type: 'shape', shapeKind: 'circle', x: 1180, y: 300, width: 760, height: 760, fill: { $t: 'colors.accent' }, opacity: 0.22, zIndex: 1, animation: { name: 'float', duration: 8200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'cm-fr-g2', group: 'cm-fr-g', type: 'shape', shapeKind: 'circle', x: 1300, y: 420, width: 520, height: 520, fill: { $t: 'colors.c1' }, opacity: 0.26, zIndex: 1, animation: { name: 'drift', duration: 9800, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'cm-fr-g3', group: 'cm-fr-g', type: 'shape', shapeKind: 'circle', x: 1400, y: 520, width: 320, height: 320, fill: { $t: 'colors.c2' }, opacity: 0.3, zIndex: 1, animation: { name: 'heartbeat', duration: 6400, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'cm-fr-r1', type: 'shape', shapeKind: 'circle', x: 1380, y: 500, width: 360, height: 360, fill: 'transparent', border: { width: 2, color: { $t: 'colors.ink' } }, opacity: 0.3, zIndex: 2 },
      { id: 'cm-fr-r2', type: 'shape', shapeKind: 'circle', x: 1300, y: 420, width: 520, height: 520, fill: 'transparent', border: { width: 2, color: { $t: 'colors.ink' } }, opacity: 0.22, zIndex: 2 },
      { id: 'cm-fr-core', type: 'shape', shapeKind: 'circle', x: 1536, y: 656, width: 68, height: 68, fill: { $t: 'colors.c2' }, zIndex: 3, animation: { name: 'pulse', duration: 2200, iterationCount: 'infinite' } },
      // 放射细线
      { id: 'cm-fr-l1', type: 'shape', shapeKind: 'line', x: 1570, y: 690, width: 360, height: 2, fill: { $t: 'colors.ink' }, opacity: 0.18, rotation: 35, zIndex: 2 },
      { id: 'cm-fr-l2', type: 'shape', shapeKind: 'line', x: 1570, y: 690, width: 360, height: 2, fill: { $t: 'colors.ink' }, opacity: 0.18, rotation: -35, zIndex: 2 },
      // 文字层
      { id: 'cm-fr-kicker', type: 'text', content: 'FRACTAL · 分形绽放', fontFamily: { $t: 'fonts.display' }, fontSize: 28, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.7, letterSpacing: 6, x: 120, y: 180, width: 900, height: 40, zIndex: 5, animation: { name: 'fadeIn', duration: 600 } },
      { id: 'cm-fr-title', type: 'text', content: 'Bloom\nrecursive.', fontFamily: { $t: 'fonts.display' }, fontSize: 140, fontWeight: '800', color: { $t: 'colors.ink' }, lineHeight: 1.05, letterSpacing: -3, x: 120, y: 300, width: 1000, height: 340, zIndex: 6, animation: { name: 'fadeInUp', duration: 900 }, editable: { content: true, fontSize: { type: 'range', min: 110, max: 170 } } },
      { id: 'cm-fr-sub', type: 'text', content: '无限自相似的微小宇宙。', fontFamily: { $t: 'fonts.cjk' }, fontSize: 36, color: { $t: 'colors.ink' }, opacity: 0.82, x: 120, y: 700, width: 900, height: 60, zIndex: 6, animation: { name: 'rise', duration: 900, delay: 200 }, editable: { content: true } },
      { id: 'cm-fr-cta', type: 'shape', shapeKind: 'rect', x: 120, y: 800, width: 320, height: 84, fill: { $t: 'colors.ink' }, borderRadius: 42, zIndex: 6, animation: { name: 'fadeInUp', duration: 800, delay: 320 } },
      { id: 'cm-fr-cta-t', type: 'text', content: '生成赏析', fontFamily: { $t: 'fonts.cjk' }, fontSize: 30, fontWeight: '700', color: { $t: 'colors.bg' }, textAlign: 'center', lineHeight: 2.8, x: 120, y: 800, width: 320, height: 84, zIndex: 7, editable: { content: true } },
      { id: 'cm-fr-badge', type: 'text', content: 'NEW · 2.5', fontFamily: { $t: 'fonts.display' }, fontSize: 26, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 4, textAlign: 'right', x: 1560, y: 120, width: 300, height: 36, zIndex: 5, animation: { name: 'fadeIn', duration: 600, delay: 120 } },
      { id: 'cm-fr-decor', type: 'text', content: '33', fontFamily: { $t: 'fonts.display' }, fontSize: 300, fontWeight: '800', color: { $t: 'colors.ink' }, opacity: 0.05, textAlign: 'right', x: 1140, y: 520, width: 740, height: 540, zIndex: 4 },
      { id: 'cm-fr-watermark', type: 'text', content: 'CM · GENESIS', fontFamily: { $t: 'fonts.display' }, fontSize: 24, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.06, letterSpacing: 4, x: 120, y: 1000, width: 600, height: 30, zIndex: 8 },
      { id: 'cm-fr-grain', type: 'overlay', x: 0, y: 0, width: 1920, height: 1080, background: `url("${grainSoft(320, 9, 0.5)}")`, opacity: 0.05, mixBlendMode: 'screen', zIndex: 9 }
    ]
  }
]

// src/core/templates/art/cm-stained-glass.ts
// CM 系列 · 彩窗玻璃（艺术 / 叙事封面）｜ 隐性 CM 标记
import type { Template } from '@/types/types'
import { SANS, HEI, SERIF, grainSoft } from '../_fx/trend'

export const cmStainedGlassTemplates: Template[] = [
  {
    id: 'cm-stained-glass', name: '彩窗玻璃', version: '1.0.0', category: 'art',
    tags: ['cm', 'stained', 'glass', 'window', 'art', 'cover'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="56" viewBox="0 0 100 56"><rect width="100" height="56" fill="%231A1230"/><rect x="58" y="8" width="34" height="40" fill="%23F472B6"/><rect x="58" y="8" width="34" height="40" fill="none" stroke="%23F8F4FF" stroke-width="2"/><rect x="62" y="12" width="12" height="14" fill="%2360A5FA"/><rect x="76" y="28" width="12" height="14" fill="%23FBBF24"/><rect x="8" y="44" width="40" height="3" fill="%23F8F4FF"/><rect x="8" y="50" width="24" height="3" fill="%23F8F4FF" opacity="0.5"/></svg>',
    tokens: {
      colors: {
        bg: { label: '底色', default: '#1A1230', options: ['#1A1230', '#101A2B', '#221018', '#0E1B22'] },
        ink: { label: '文字', default: '#F8F4FF', options: ['#F8F4FF', '#FDF6FF', '#F0F4FF', '#F4FFFB'] },
        accent: { label: '强调', default: '#F472B6', options: ['#F472B6', '#FB7185', '#C084FC', '#F0ABFC'] },
        c1: { label: '辅助1', default: '#60A5FA', options: ['#60A5FA', '#38BDF8', '#818CF8', '#7DD3FC'] },
        c2: { label: '辅助2', default: '#FBBF24', options: ['#FBBF24', '#FCD34D', '#F59E0B', '#FDE68A'] }
      },
      fonts: {
        display: { label: '英文标题', default: SANS, options: [SANS, SERIF] },
        cjk: { label: '中文', default: HEI, options: [HEI, SANS] }
      }
    },
    presets: [
      { name: '玫瑰圣堂', colors: { bg: '#1A1230', ink: '#F8F4FF', accent: '#F472B6', c1: '#60A5FA', c2: '#FBBF24' } },
      { name: '靛蓝穹顶', colors: { bg: '#101A2B', ink: '#FDF6FF', accent: '#818CF8', c1: '#38BDF8', c2: '#FCD34D' } },
      { name: '酒红晚祷', colors: { bg: '#221018', ink: '#F0F4FF', accent: '#FB7185', c1: '#7DD3FC', c2: '#F59E0B' } },
      { name: '湖绿中庭', colors: { bg: '#0E1B22', ink: '#F4FFFB', accent: '#C084FC', c1: '#60A5FA', c2: '#FDE68A' } }
    ],
    canvas: { virtualWidth: 1920, virtualHeight: 1080, defaultWidth: 1920, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      // 彩窗格（右侧 3×4 网格，深色 leading 描边，鲜亮填充）
      { id: 'cm-sg-p1', group: 'cm-sg-p', type: 'shape', shapeKind: 'rect', x: 1060, y: 90, width: 270, height: 225, fill: { $t: 'colors.accent' }, border: { width: 7, color: { $t: 'colors.ink' } }, zIndex: 2 },
      { id: 'cm-sg-p2', group: 'cm-sg-p', type: 'shape', shapeKind: 'rect', x: 1345, y: 90, width: 270, height: 225, fill: { $t: 'colors.c1' }, border: { width: 7, color: { $t: 'colors.ink' } }, zIndex: 2 },
      { id: 'cm-sg-p3', group: 'cm-sg-p', type: 'shape', shapeKind: 'rect', x: 1630, y: 90, width: 270, height: 225, fill: { $t: 'colors.c2' }, border: { width: 7, color: { $t: 'colors.ink' } }, zIndex: 2 },
      { id: 'cm-sg-p4', group: 'cm-sg-p', type: 'shape', shapeKind: 'rect', x: 1060, y: 330, width: 270, height: 225, fill: { $t: 'colors.c1' }, border: { width: 7, color: { $t: 'colors.ink' } }, zIndex: 2 },
      { id: 'cm-sg-p5', group: 'cm-sg-p', type: 'shape', shapeKind: 'rect', x: 1345, y: 330, width: 270, height: 225, fill: { $t: 'colors.accent' }, border: { width: 7, color: { $t: 'colors.ink' } }, zIndex: 2 },
      { id: 'cm-sg-p6', group: 'cm-sg-p', type: 'shape', shapeKind: 'rect', x: 1630, y: 330, width: 270, height: 225, fill: { $t: 'colors.c1' }, border: { width: 7, color: { $t: 'colors.ink' } }, zIndex: 2 },
      { id: 'cm-sg-p7', group: 'cm-sg-p', type: 'shape', shapeKind: 'rect', x: 1060, y: 570, width: 270, height: 225, fill: { $t: 'colors.c2' }, border: { width: 7, color: { $t: 'colors.ink' } }, zIndex: 2 },
      { id: 'cm-sg-p8', group: 'cm-sg-p', type: 'shape', shapeKind: 'rect', x: 1345, y: 570, width: 270, height: 225, fill: { $t: 'colors.c1' }, border: { width: 7, color: { $t: 'colors.ink' } }, zIndex: 2 },
      { id: 'cm-sg-p9', group: 'cm-sg-p', type: 'shape', shapeKind: 'rect', x: 1630, y: 570, width: 270, height: 225, fill: { $t: 'colors.accent' }, border: { width: 7, color: { $t: 'colors.ink' } }, zIndex: 2 },
      { id: 'cm-sg-p10', group: 'cm-sg-p', type: 'shape', shapeKind: 'rect', x: 1060, y: 810, width: 270, height: 180, fill: { $t: 'colors.accent' }, border: { width: 7, color: { $t: 'colors.ink' } }, zIndex: 2 },
      { id: 'cm-sg-p11', group: 'cm-sg-p', type: 'shape', shapeKind: 'rect', x: 1345, y: 810, width: 270, height: 180, fill: { $t: 'colors.c2' }, border: { width: 7, color: { $t: 'colors.ink' } }, zIndex: 2 },
      { id: 'cm-sg-p12', group: 'cm-sg-p', type: 'shape', shapeKind: 'rect', x: 1630, y: 810, width: 270, height: 180, fill: { $t: 'colors.c1' }, border: { width: 7, color: { $t: 'colors.ink' } }, zIndex: 2 },
      // 文字层
      { id: 'cm-sg-kicker', type: 'text', content: 'STAINED GLASS · 彩窗叙事', fontFamily: { $t: 'fonts.display' }, fontSize: 28, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.7, letterSpacing: 6, x: 120, y: 180, width: 900, height: 40, zIndex: 5, animation: { name: 'fadeIn', duration: 600 } },
      { id: 'cm-sg-title', type: 'text', content: 'Sacred\nlight.', fontFamily: { $t: 'fonts.display' }, fontSize: 150, fontWeight: '800', color: { $t: 'colors.ink' }, lineHeight: 1.05, letterSpacing: -3, x: 120, y: 300, width: 900, height: 360, zIndex: 6, animation: { name: 'fadeInUp', duration: 900 }, editable: { content: true, fontSize: { type: 'range', min: 120, max: 180 } } },
      { id: 'cm-sg-sub', type: 'text', content: '让光穿过色彩的缝隙。', fontFamily: { $t: 'fonts.cjk' }, fontSize: 36, color: { $t: 'colors.ink' }, opacity: 0.82, x: 120, y: 720, width: 900, height: 60, zIndex: 6, animation: { name: 'rise', duration: 900, delay: 200 }, editable: { content: true } },
      { id: 'cm-sg-cta', type: 'shape', shapeKind: 'rect', x: 120, y: 820, width: 320, height: 84, fill: { $t: 'colors.ink' }, borderRadius: 42, zIndex: 6, animation: { name: 'fadeInUp', duration: 800, delay: 320 } },
      { id: 'cm-sg-cta-t', type: 'text', content: '欣赏作品', fontFamily: { $t: 'fonts.cjk' }, fontSize: 30, fontWeight: '700', color: { $t: 'colors.bg' }, textAlign: 'center', lineHeight: 2.8, x: 120, y: 820, width: 320, height: 84, zIndex: 7, editable: { content: true } },
      { id: 'cm-sg-badge', type: 'text', content: 'NEW · 2.5', fontFamily: { $t: 'fonts.display' }, fontSize: 26, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 4, textAlign: 'right', x: 1560, y: 90, width: 300, height: 36, zIndex: 5, animation: { name: 'fadeIn', duration: 600, delay: 120 } },
      { id: 'cm-sg-decor', type: 'text', content: '03', fontFamily: { $t: 'fonts.display' }, fontSize: 280, fontWeight: '800', color: { $t: 'colors.ink' }, opacity: 0.05, textAlign: 'right', x: 1140, y: 520, width: 740, height: 540, zIndex: 4 },
      { id: 'cm-sg-watermark', type: 'text', content: 'CM · WINDOW No.3', fontFamily: { $t: 'fonts.display' }, fontSize: 24, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.06, letterSpacing: 4, x: 120, y: 1000, width: 600, height: 30, zIndex: 8 },
      { id: 'cm-sg-grain', type: 'overlay', x: 0, y: 0, width: 1920, height: 1080, background: `url("${grainSoft(320, 9, 0.5)}")`, opacity: 0.04, mixBlendMode: 'overlay', zIndex: 9 }
    ]
  }
]

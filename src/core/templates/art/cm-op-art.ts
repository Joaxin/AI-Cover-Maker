// src/core/templates/art/cm-op-art.ts
// CM 系列 · 欧普幻视（艺术 / 错视封面）｜ 隐性 CM 标记
import type { Template } from '@/types/types'
import { SANS, HEI, SERIF, grainSoft } from '../_fx/trend'

export const cmOpArtTemplates: Template[] = [
  {
    id: 'cm-op-art', name: '欧普幻视', version: '1.0.0', category: 'art',
    tags: ['cm', 'opart', 'moire', 'illusion', 'art', 'cover'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="56" viewBox="0 0 100 56"><rect width="100" height="56" fill="%23FAFAFA"/><circle cx="72" cy="28" r="24" fill="none" stroke="%23141414" stroke-width="3"/><circle cx="72" cy="28" r="16" fill="none" stroke="%23141414" stroke-width="3"/><circle cx="72" cy="28" r="8" fill="%23E63946"/><rect x="8" y="46" width="40" height="3" fill="%23141414"/><rect x="8" y="51" width="24" height="3" fill="%23141414" opacity="0.5"/></svg>',
    tokens: {
      colors: {
        bg: { label: '底色', default: '#FAFAFA', options: ['#FAFAFA', '#F0F0EE', '#0E0E0E', '#101418'] },
        ink: { label: '文字', default: '#141414', options: ['#141414', '#0A0A0A', '#F2F2F2', '#E8E8E8'] },
        accent: { label: '强调', default: '#E63946', options: ['#E63946', '#EF476F', '#F25C54', '#FF5A5F'] },
        c1: { label: '辅助1', default: '#2B2B2B', options: ['#2B2B2B', '#3A3A3A', '#444444', '#555555'] },
        c2: { label: '辅助2', default: '#D9D9D9', options: ['#D9D9D9', '#CFCFCF', '#888888', '#BBBBBB'] }
      },
      fonts: {
        display: { label: '英文标题', default: SANS, options: [SANS, SERIF] },
        cjk: { label: '中文', default: HEI, options: [HEI, SANS] }
      }
    },
    presets: [
      { name: '黑白红', colors: { bg: '#FAFAFA', ink: '#141414', accent: '#E63946', c1: '#2B2B2B', c2: '#D9D9D9' } },
      { name: '灰阶冷', colors: { bg: '#F0F0EE', ink: '#0A0A0A', accent: '#EF476F', c1: '#3A3A3A', c2: '#CFCFCF' } },
      { name: '暗夜反相', colors: { bg: '#0E0E0E', ink: '#F2F2F2', accent: '#FF5A5F', c1: '#444444', c2: '#888888' } },
      { name: '石墨深', colors: { bg: '#101418', ink: '#E8E8E8', accent: '#F25C54', c1: '#555555', c2: '#BBBBBB' } }
    ],
    canvas: { virtualWidth: 1920, virtualHeight: 1080, defaultWidth: 1920, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      // 欧普同心环（圆心 1520,540，粗描边成错视波纹）
      { id: 'cm-oa-r1', group: 'cm-oa-r', type: 'shape', shapeKind: 'circle', x: 1460, y: 480, width: 120, height: 120, fill: 'transparent', border: { width: 12, color: { $t: 'colors.ink' } }, opacity: 0.9, zIndex: 2 },
      { id: 'cm-oa-r2', group: 'cm-oa-r', type: 'shape', shapeKind: 'circle', x: 1380, y: 400, width: 280, height: 280, fill: 'transparent', border: { width: 12, color: { $t: 'colors.c1' } }, opacity: 0.9, zIndex: 2 },
      { id: 'cm-oa-r3', group: 'cm-oa-r', type: 'shape', shapeKind: 'circle', x: 1300, y: 320, width: 440, height: 440, fill: 'transparent', border: { width: 12, color: { $t: 'colors.accent' } }, opacity: 0.92, zIndex: 2 },
      { id: 'cm-oa-r4', group: 'cm-oa-r', type: 'shape', shapeKind: 'circle', x: 1220, y: 240, width: 600, height: 600, fill: 'transparent', border: { width: 12, color: { $t: 'colors.ink' } }, opacity: 0.85, zIndex: 2 },
      { id: 'cm-oa-r5', group: 'cm-oa-r', type: 'shape', shapeKind: 'circle', x: 1140, y: 160, width: 760, height: 760, fill: 'transparent', border: { width: 12, color: { $t: 'colors.c1' } }, opacity: 0.8, zIndex: 2 },
      { id: 'cm-oa-r6', group: 'cm-oa-r', type: 'shape', shapeKind: 'circle', x: 1060, y: 80, width: 920, height: 920, fill: 'transparent', border: { width: 12, color: { $t: 'colors.ink' } }, opacity: 0.7, zIndex: 2 },
      { id: 'cm-oa-r7', group: 'cm-oa-r', type: 'shape', shapeKind: 'circle', x: 980, y: 0, width: 1080, height: 1080, fill: 'transparent', border: { width: 12, color: { $t: 'colors.c2' } }, opacity: 0.55, zIndex: 2 },
      { id: 'cm-oa-r8', group: 'cm-oa-r', type: 'shape', shapeKind: 'circle', x: 900, y: -80, width: 1240, height: 1240, fill: 'transparent', border: { width: 12, color: { $t: 'colors.ink' } }, opacity: 0.45, zIndex: 2 },
      // 文字层
      { id: 'cm-oa-kicker', type: 'text', content: 'OP ART · 欧普幻视', fontFamily: { $t: 'fonts.display' }, fontSize: 28, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.7, letterSpacing: 6, x: 120, y: 180, width: 900, height: 40, zIndex: 5, animation: { name: 'fadeIn', duration: 600 } },
      { id: 'cm-oa-title', type: 'text', content: 'Optic\nripple.', fontFamily: { $t: 'fonts.display' }, fontSize: 150, fontWeight: '800', color: { $t: 'colors.ink' }, lineHeight: 1.05, letterSpacing: -3, x: 120, y: 300, width: 900, height: 360, zIndex: 6, animation: { name: 'fadeInUp', duration: 900 }, editable: { content: true, fontSize: { type: 'range', min: 120, max: 180 } } },
      { id: 'cm-oa-sub', type: 'text', content: '让眼睛自己流动起来。', fontFamily: { $t: 'fonts.cjk' }, fontSize: 36, color: { $t: 'colors.ink' }, opacity: 0.82, x: 120, y: 720, width: 900, height: 60, zIndex: 6, animation: { name: 'rise', duration: 900, delay: 200 }, editable: { content: true } },
      { id: 'cm-oa-cta', type: 'shape', shapeKind: 'rect', x: 120, y: 820, width: 320, height: 84, fill: { $t: 'colors.ink' }, borderRadius: 42, zIndex: 6, animation: { name: 'fadeInUp', duration: 800, delay: 320 } },
      { id: 'cm-oa-cta-t', type: 'text', content: '体验错视', fontFamily: { $t: 'fonts.cjk' }, fontSize: 30, fontWeight: '700', color: { $t: 'colors.bg' }, textAlign: 'center', lineHeight: 2.8, x: 120, y: 820, width: 320, height: 84, zIndex: 7, editable: { content: true } },
      { id: 'cm-oa-badge', type: 'text', content: 'NEW · 2.5', fontFamily: { $t: 'fonts.display' }, fontSize: 26, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 4, textAlign: 'right', x: 1560, y: 120, width: 300, height: 36, zIndex: 5, animation: { name: 'fadeIn', duration: 600, delay: 120 } },
      { id: 'cm-oa-decor', type: 'text', content: '15', fontFamily: { $t: 'fonts.display' }, fontSize: 300, fontWeight: '800', color: { $t: 'colors.ink' }, opacity: 0.05, textAlign: 'right', x: 1140, y: 520, width: 740, height: 540, zIndex: 4 },
      { id: 'cm-oa-watermark', type: 'text', content: 'CM · OPTIK', fontFamily: { $t: 'fonts.display' }, fontSize: 24, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.06, letterSpacing: 4, x: 120, y: 1000, width: 600, height: 30, zIndex: 8 },
      { id: 'cm-oa-grain', type: 'overlay', x: 0, y: 0, width: 1920, height: 1080, background: `url("${grainSoft(320, 9, 0.5)}")`, opacity: 0.04, mixBlendMode: 'multiply', zIndex: 9 }
    ]
  }
]

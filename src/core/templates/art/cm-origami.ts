// src/core/templates/art/cm-origami.ts
// CM 系列 · 折纸几何（艺术 / 构成封面）｜ 隐性 CM 标记
import type { Template } from '@/types/types'
import { SANS, HEI, SERIF, grainSoft } from '../_fx/trend'

export const cmOrigamiTemplates: Template[] = [
  {
    id: 'cm-origami', name: '折纸几何', version: '1.0.0', category: 'art',
    tags: ['cm', 'origami', 'paper', 'fold', 'art', 'cover'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="56" viewBox="0 0 100 56"><rect width="100" height="56" fill="%23FBF7F0"/><polygon points="20,40 40,12 60,40" fill="%23EF6F6C"/><polygon points="40,12 60,40 50,48" fill="%234C8BF5"/><polygon points="60,40 80,18 86,40" fill="%23F4C95D"/><rect x="8" y="46" width="40" height="3" fill="%232B2B2B"/><rect x="8" y="51" width="24" height="3" fill="%232B2B2B" opacity="0.5"/></svg>',
    tokens: {
      colors: {
        bg: { label: '底色', default: '#FBF7F0', options: ['#FBF7F0', '#F4EFE6', '#1C1A17', '#161D2B'] },
        ink: { label: '文字', default: '#2B2B2B', options: ['#2B2B2B', '#1A1A1A', '#F2EEE6', '#EAF1FF'] },
        accent: { label: '强调', default: '#EF6F6C', options: ['#EF6F6C', '#F2789F', '#E76F51', '#F4978E'] },
        c1: { label: '辅助1', default: '#4C8BF5', options: ['#4C8BF5', '#3B82F6', '#6A5ACD', '#60A5FA'] },
        c2: { label: '辅助2', default: '#F4C95D', options: ['#F4C95D', '#FCD34D', '#F4A261', '#FDE68A'] }
      },
      fonts: {
        display: { label: '英文标题', default: SANS, options: [SANS, SERIF] },
        cjk: { label: '中文', default: HEI, options: [HEI, SANS] }
      }
    },
    presets: [
      { name: '和纸暖调', colors: { bg: '#FBF7F0', ink: '#2B2B2B', accent: '#EF6F6C', c1: '#4C8BF5', c2: '#F4C95D' } },
      { name: '米色素朴', colors: { bg: '#F4EFE6', ink: '#1A1A1A', accent: '#E76F51', c1: '#3B82F6', c2: '#FCD34D' } },
      { name: '暗夜折面', colors: { bg: '#1C1A17', ink: '#F2EEE6', accent: '#F2789F', c1: '#6A5ACD', c2: '#F4A261' } },
      { name: '蓝灰冷折', colors: { bg: '#161D2B', ink: '#EAF1FF', accent: '#F4978E', c1: '#60A5FA', c2: '#FDE68A' } }
    ],
    canvas: { virtualWidth: 1920, virtualHeight: 1080, defaultWidth: 1920, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      // 折面（旋转矩形叠出折纸层次）
      { id: 'cm-og-f1', group: 'cm-og-f', type: 'shape', shapeKind: 'rect', x: 1180, y: 220, width: 560, height: 560, fill: { $t: 'colors.accent' }, rotation: -12, opacity: 0.92, zIndex: 2, animation: { name: 'float', duration: 8600, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'cm-og-f2', group: 'cm-og-f', type: 'shape', shapeKind: 'rect', x: 1380, y: 360, width: 520, height: 520, fill: { $t: 'colors.c1' }, rotation: 16, opacity: 0.88, zIndex: 3, animation: { name: 'drift', duration: 9400, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'cm-og-f3', group: 'cm-og-f', type: 'shape', shapeKind: 'rect', x: 1280, y: 160, width: 380, height: 380, fill: { $t: 'colors.c2' }, rotation: 28, opacity: 0.85, zIndex: 4, animation: { name: 'float', duration: 7200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      // 折痕（细线）
      { id: 'cm-og-cr1', type: 'shape', shapeKind: 'line', x: 1180, y: 760, width: 760, height: 2, fill: { $t: 'colors.ink' }, opacity: 0.18, rotation: -12, zIndex: 5 },
      { id: 'cm-og-cr2', type: 'shape', shapeKind: 'line', x: 1300, y: 360, width: 760, height: 2, fill: { $t: 'colors.ink' }, opacity: 0.16, rotation: 16, zIndex: 5 },
      // 文字层
      { id: 'cm-og-kicker', type: 'text', content: 'ORIGAMI · 折纸构成', fontFamily: { $t: 'fonts.display' }, fontSize: 28, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.7, letterSpacing: 6, x: 120, y: 180, width: 1400, height: 40, zIndex: 6, animation: { name: 'fadeIn', duration: 600 } },
      { id: 'cm-og-title', type: 'text', content: 'Folded\nform.', fontFamily: { $t: 'fonts.display' }, fontSize: 150, fontWeight: '800', color: { $t: 'colors.ink' }, lineHeight: 1.05, letterSpacing: -3, x: 120, y: 300, width: 1200, height: 360, zIndex: 7, animation: { name: 'fadeInUp', duration: 900 }, editable: { content: true, fontSize: { type: 'range', min: 120, max: 180 } } },
      { id: 'cm-og-sub', type: 'text', content: '一张纸的几何修行。', fontFamily: { $t: 'fonts.cjk' }, fontSize: 36, color: { $t: 'colors.ink' }, opacity: 0.82, x: 120, y: 720, width: 1400, height: 60, zIndex: 7, animation: { name: 'rise', duration: 900, delay: 200 }, editable: { content: true } },
      { id: 'cm-og-cta', type: 'shape', shapeKind: 'rect', x: 120, y: 820, width: 320, height: 84, fill: { $t: 'colors.ink' }, borderRadius: 42, zIndex: 7, animation: { name: 'fadeInUp', duration: 800, delay: 320 } },
      { id: 'cm-og-cta-t', type: 'text', content: '查看系列', fontFamily: { $t: 'fonts.cjk' }, fontSize: 30, fontWeight: '700', color: { $t: 'colors.bg' }, textAlign: 'center', lineHeight: 2.8, x: 120, y: 820, width: 320, height: 84, zIndex: 8, editable: { content: true } },
      { id: 'cm-og-badge', type: 'text', content: 'NEW · 2.5', fontFamily: { $t: 'fonts.display' }, fontSize: 26, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 4, textAlign: 'right', x: 1500, y: 180, width: 300, height: 36, zIndex: 6, animation: { name: 'fadeIn', duration: 600, delay: 120 } },
      { id: 'cm-og-decor', type: 'text', content: '09', fontFamily: { $t: 'fonts.display' }, fontSize: 300, fontWeight: '800', color: { $t: 'colors.ink' }, opacity: 0.05, textAlign: 'right', x: 1140, y: 520, width: 740, height: 540, zIndex: 5 },
      { id: 'cm-og-watermark', type: 'text', content: 'CM · PAPER FOLD', fontFamily: { $t: 'fonts.display' }, fontSize: 24, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.06, letterSpacing: 4, x: 120, y: 1000, width: 600, height: 30, zIndex: 9 },
      { id: 'cm-og-grain', type: 'overlay', x: 0, y: 0, width: 1920, height: 1080, background: `url("${grainSoft(320, 9, 0.5)}")`, opacity: 0.05, mixBlendMode: 'multiply', zIndex: 10 }
    ]
  }
]

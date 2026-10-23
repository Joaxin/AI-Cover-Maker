// src/core/templates/magazine/cm-art-nouveau.ts
// CM 系列 · 新艺术浪潮（杂志 / 装饰封面）｜ 隐性 CM 标记
import type { Template } from '@/types/types'
import { SANS, HEI, SERIF, grainSoft, arch } from '../_fx/trend'

export const cmArtNouveauTemplates: Template[] = [
  {
    id: 'cm-art-nouveau', name: '新艺术浪潮', version: '1.0.0', category: 'magazine',
    tags: ['cm', 'artnouveau', 'organic', 'gold', 'magazine', 'cover'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="56" viewBox="0 0 100 56"><rect width="100" height="56" fill="%23F3ECE0"/><path d="M40 54 A30 40 0 0 1 100 54 Z" fill="%23C9A227" opacity="0.7"/><circle cx="50" cy="22" r="10" fill="none" stroke="%238C6A4A" stroke-width="1.4"/><rect x="8" y="46" width="40" height="3" fill="%233A2E22"/><rect x="8" y="51" width="24" height="3" fill="%233A2E22" opacity="0.5"/></svg>',
    tokens: {
      colors: {
        bg: { label: '底色', default: '#F3ECE0', options: ['#F3ECE0', '#EFE6D5', '#1E1812', '#15171F'] },
        ink: { label: '文字', default: '#3A2E22', options: ['#3A2E22', '#2B231A', '#F1E9DC', '#E9E4DA'] },
        accent: { label: '强调', default: '#C9A227', options: ['#C9A227', '#B8860B', '#D4AF37', '#C8A04B'] },
        c1: { label: '辅助1', default: '#8C6A4A', options: ['#8C6A4A', '#7A5C3E', '#9C7A52', '#6F5638'] },
        c2: { label: '辅助2', default: '#B5654A', options: ['#B5654A', '#A0522D', '#C06B4F', '#D08A6A'] }
      },
      fonts: {
        display: { label: '英文标题', default: SERIF, options: [SERIF, SANS] },
        cjk: { label: '中文', default: HEI, options: [HEI, SANS] }
      }
    },
    presets: [
      { name: '金棕典雅', colors: { bg: '#F3ECE0', ink: '#3A2E22', accent: '#C9A227', c1: '#8C6A4A', c2: '#B5654A' } },
      { name: '米色古雅', colors: { bg: '#EFE6D5', ink: '#2B231A', accent: '#B8860B', c1: '#7A5C3E', c2: '#A0522D' } },
      { name: '暗金夜阑', colors: { bg: '#1E1812', ink: '#F1E9DC', accent: '#D4AF37', c1: '#9C7A52', c2: '#C06B4F' } },
      { name: '墨蓝沉静', colors: { bg: '#15171F', ink: '#E9E4DA', accent: '#C8A04B', c1: '#6F5638', c2: '#D08A6A' } }
    ],
    canvas: { virtualWidth: 1920, virtualHeight: 1080, defaultWidth: 1920, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      // 新艺术拱形（右侧大拱）
      { id: 'cm-an-arch', type: 'overlay', x: 1180, y: 120, width: 760, height: 960, background: `url("${arch(760, 960, '#C9A227')}")`, opacity: 0.22, mixBlendMode: 'multiply', zIndex: 2 },
      // 装饰同心圆（藤蔓感的圆）
      { id: 'cm-an-c1', type: 'shape', shapeKind: 'circle', x: 1340, y: 280, width: 440, height: 440, fill: 'transparent', border: { width: 3, color: { $t: 'colors.accent' } }, opacity: 0.5, zIndex: 3 },
      { id: 'cm-an-c2', type: 'shape', shapeKind: 'circle', x: 1420, y: 360, width: 280, height: 280, fill: 'transparent', border: { width: 2, color: { $t: 'colors.c1' } }, opacity: 0.45, zIndex: 3 },
      { id: 'cm-an-dot', type: 'shape', shapeKind: 'circle', x: 1536, y: 576, width: 48, height: 48, fill: { $t: 'colors.c2' }, zIndex: 4, animation: { name: 'pulse', duration: 2600, iterationCount: 'infinite' } },
      // 竖向金线
      { id: 'cm-an-rule', type: 'shape', shapeKind: 'line', x: 1040, y: 120, width: 2, height: 840, fill: { $t: 'colors.accent' }, opacity: 0.4, zIndex: 3 },
      // 文字层
      { id: 'cm-an-kicker', type: 'text', content: 'ART NOUVEAU · 新艺术浪潮', fontFamily: { $t: 'fonts.display' }, fontSize: 28, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.7, letterSpacing: 6, x: 120, y: 180, width: 900, height: 40, zIndex: 6, animation: { name: 'fadeIn', duration: 600 } },
      { id: 'cm-an-title', type: 'text', content: 'Organic\nlines.', fontFamily: { $t: 'fonts.display' }, fontSize: 150, fontWeight: '800', color: { $t: 'colors.ink' }, lineHeight: 1.05, letterSpacing: -2, x: 120, y: 300, width: 900, height: 360, zIndex: 7, animation: { name: 'fadeInUp', duration: 900 }, editable: { content: true, fontSize: { type: 'range', min: 120, max: 180 } } },
      { id: 'cm-an-sub', type: 'text', content: '让曲线重新生长。', fontFamily: { $t: 'fonts.cjk' }, fontSize: 36, color: { $t: 'colors.ink' }, opacity: 0.82, x: 120, y: 720, width: 900, height: 60, zIndex: 7, animation: { name: 'rise', duration: 900, delay: 200 }, editable: { content: true } },
      { id: 'cm-an-cta', type: 'shape', shapeKind: 'rect', x: 120, y: 820, width: 320, height: 84, fill: { $t: 'colors.ink' }, borderRadius: 42, zIndex: 7, animation: { name: 'fadeInUp', duration: 800, delay: 320 } },
      { id: 'cm-an-cta-t', type: 'text', content: '翻阅专题', fontFamily: { $t: 'fonts.cjk' }, fontSize: 30, fontWeight: '700', color: { $t: 'colors.bg' }, textAlign: 'center', lineHeight: 2.8, x: 120, y: 820, width: 320, height: 84, zIndex: 8, editable: { content: true } },
      { id: 'cm-an-badge', type: 'text', content: 'NEW · 2.5', fontFamily: { $t: 'fonts.display' }, fontSize: 26, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 4, textAlign: 'right', x: 1560, y: 120, width: 300, height: 36, zIndex: 6, animation: { name: 'fadeIn', duration: 600, delay: 120 } },
      { id: 'cm-an-decor', type: 'text', content: '21', fontFamily: { $t: 'fonts.display' }, fontSize: 300, fontWeight: '800', color: { $t: 'colors.ink' }, opacity: 0.05, textAlign: 'right', x: 1140, y: 520, width: 740, height: 540, zIndex: 5 },
      { id: 'cm-an-watermark', type: 'text', content: 'CM · ATELIER', fontFamily: { $t: 'fonts.display' }, fontSize: 24, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.06, letterSpacing: 4, x: 120, y: 1000, width: 600, height: 30, zIndex: 9 },
      { id: 'cm-an-grain', type: 'overlay', x: 0, y: 0, width: 1920, height: 1080, background: `url("${grainSoft(320, 9, 0.5)}")`, opacity: 0.05, mixBlendMode: 'multiply', zIndex: 10 }
    ]
  }
]

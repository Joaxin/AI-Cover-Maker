// src/core/templates/minimal/trend-bold-mono-marquee.ts
// 当红趋势批 → 归入「极简黑白」（minimal） ｜ 3. 黑白大字跑马灯（1:1）
// 迁移自 src/core/templates/trend/：模板内容、素材函数与外观保持不变，只改分类归属。
import type { Template } from '@/types/types'
import { SANS, HEI, SONG, MONO, IMPACT, grain } from '../_fx/trend'

export const trendBoldMonoMarqueeTemplates: Template[] = [
  {
    id: 'trend-bold-mono-marquee', name: '黑白大字走带', version: '1.0.0', category: 'minimal',
    tags: ['trend', 'monochrome', 'bold type', 'editorial', 'marquee', '1:1'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23111"/><rect x="10" y="22" width="80" height="14" fill="%23fff"/><rect x="10" y="42" width="56" height="14" fill="%23fff" opacity="0.6"/><rect x="0" y="68" width="100" height="10" fill="%23f0f0f0"/><rect x="10" y="84" width="34" height="5" fill="%23fff" opacity="0.5"/></svg>',
    tokens: {
      colors: {
        bg: { label: '底', default: '#0E0E0E', options: ['#0E0E0E', '#F7F5F2', '#1F2937', '#170F0B'] },
        fg: { label: '字', default: '#F7F5F2', options: ['#F7F5F2', '#0E0E0E', '#E7E5E4', '#FAF6EF'] },
        strip: { label: '走带', default: '#F7F5F2', options: ['#F7F5F2', '#FFD400', '#FF4D2E', '#0E0E0E'] },
        stripInk: { label: '走带字色', default: '#0E0E0E', options: ['#0E0E0E', '#F7F5F2', '#7C2D12', '#111827', '#170F0B'] }
      },
      fonts: { latin: { label: '大字', default: IMPACT, options: [IMPACT, SANS, 'Didot, Georgia, serif'] }, cjk: { label: '中文', default: HEI, options: [HEI, SONG, MONO] } }
    },
    presets: [
      { name: '黑白硬照', colors: { bg: '#0E0E0E', fg: '#F7F5F2', strip: '#F7F5F2', stripInk: '#0E0E0E' } },
      { name: '纸白反相', colors: { bg: '#F7F5F2', fg: '#0E0E0E', strip: '#0E0E0E', stripInk: '#F7F5F2' } },
      { name: '石墨柠檬', colors: { bg: '#1F2937', fg: '#E7E5E4', strip: '#FFD400', stripInk: '#111827' } },
      { name: '深棕米白', colors: { bg: '#170F0B', fg: '#FAF6EF', strip: '#FF4D2E', stripInk: '#170F0B' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1080, defaultWidth: 1080, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'bm-hair-top', type: 'shape', shapeKind: 'rect', x: 62, y: 78, width: 946, height: 2, fill: { $t: 'colors.fg' }, opacity: 0.35, zIndex: 3 },
      { id: 'bm-meta-l', type: 'text', content: 'MONOCHROME / VOL.12', fontFamily: { $t: 'fonts.latin' }, fontSize: 22, fontWeight: '700', color: { $t: 'colors.fg' }, letterSpacing: 4, x: 62, y: 100, width: 480, height: 30, zIndex: 3 },
      { id: 'bm-meta-r', type: 'text', content: '2026 · 九月刊', fontFamily: { $t: 'fonts.cjk' }, fontSize: 22, color: { $t: 'colors.fg' }, opacity: 0.72, letterSpacing: 2, textAlign: 'right', x: 560, y: 100, width: 448, height: 30, zIndex: 3 },
      { id: 'bm-l1', type: 'text', content: 'LESS', fontFamily: { $t: 'fonts.latin' }, fontSize: 268, fontWeight: '900', color: { $t: 'colors.fg' }, letterSpacing: -6, x: 62, y: 176, width: 960, height: 268, zIndex: 3, animation: { name: 'fadeInUp', duration: 650 }, editable: { content: true, fontSize: { type: 'range', min: 170, max: 300 } } },
      { id: 'bm-l2', type: 'text', content: 'BUT', fontFamily: { $t: 'fonts.latin' }, fontSize: 268, fontWeight: '900', color: { $t: 'colors.bg' }, letterSpacing: -6, x: 62, y: 424, width: 960, height: 268, zIndex: 4, animation: { name: 'fadeInUp', duration: 650, delay: 130 }, editable: { content: true } },
      { id: 'bm-l2-bg', type: 'shape', shapeKind: 'rect', x: 62, y: 424, width: 956, height: 268, fill: { $t: 'colors.fg' }, zIndex: 3 },
      { id: 'bm-l3', type: 'text', content: 'BETTER', fontFamily: { $t: 'fonts.latin' }, fontSize: 232, fontWeight: '900', color: { $t: 'colors.fg' }, letterSpacing: -6, x: 62, y: 672, width: 1010, height: 234, zIndex: 3, rotation: -1.2, animation: { name: 'fadeInUp', duration: 650, delay: 260 }, editable: { content: true } },
      { id: 'bm-cn', type: 'text', content: '只留一句话', fontFamily: { $t: 'fonts.cjk' }, fontSize: 46, fontWeight: '900', color: { $t: 'colors.fg' }, letterSpacing: 10, x: 62, y: 946, width: 520, height: 60, zIndex: 4, animation: { name: 'fadeIn', duration: 700, delay: 420 }, editable: { content: true } },
      { id: 'bm-note', type: 'text', content: '删掉 80% 之后剩下\n的才是设计', fontFamily: { $t: 'fonts.cjk' }, fontSize: 26, color: { $t: 'colors.fg' }, opacity: 0.66, lineHeight: 1.6, textAlign: 'right', x: 610, y: 934, width: 398, height: 84, zIndex: 4 },
      { id: 'bm-band', type: 'shape', shapeKind: 'rect', x: -20, y: 1026, width: 1120, height: 54, fill: { $t: 'colors.strip' }, zIndex: 5, rotation: -0.8 },
      { id: 'bm-band-t', type: 'text', content: 'LESS · BUT · BETTER · 少 · 但 · 更 · 好 · LESS · BUT · BETTER', fontFamily: { $t: 'fonts.latin' }, fontSize: 25, fontWeight: '900', color: { $t: 'colors.stripInk' }, letterSpacing: 5, textAlign: 'center', lineHeight: 2.1, x: -20, y: 1026, width: 1120, height: 54, rotation: -0.8, zIndex: 6, animation: { name: 'drift', duration: 8000, iterationCount: 'infinite', easing: 'ease-in-out' }, editable: { content: true } },
      { id: 'bm-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1080, background: `url("${grain(280, 5, 0.6)}")`, opacity: 0.06, mixBlendMode: 'overlay', zIndex: 9 }
    ]
  }
]

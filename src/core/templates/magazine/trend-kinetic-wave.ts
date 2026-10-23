// src/core/templates/magazine/trend-kinetic-wave.ts
// 当红趋势批 → 归入「杂志风」（magazine） ｜ 1. 动态波浪字（3:4）
// 迁移自 src/core/templates/trend/：模板内容、素材函数与外观保持不变，只改分类归属。
import type { Template } from '@/types/types'
import { SANS, HEI, SONG, MONO, IMPACT, grain, scribble } from '../_fx/trend'

export const trendKineticWaveTemplates: Template[] = [
  {
    id: 'trend-kinetic-wave', name: '动态波浪字海报', version: '1.0.0', category: 'magazine',
    tags: ['trend', 'kinetic', 'typography', 'wavy', 'bold', '3:4'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="133" viewBox="0 0 100 133"><rect width="100" height="133" fill="%23F5F1E8"/><circle cx="20" cy="18" r="26" fill="%23FF4D2E" opacity="0.18"/><rect x="12" y="34" width="76" height="12" fill="%23111827"/><rect x="16" y="52" width="60" height="12" fill="%23FF4D2E"/><path d="M12 78 Q 26 68 40 78 T 68 78 T 92 78" stroke="%237C3AED" stroke-width="4" fill="none"/><rect x="12" y="104" width="42" height="12" rx="6" fill="%23111827"/></svg>',
    tokens: {
      colors: {
        bg: { label: '纸面', default: '#F5F1E8', options: ['#F5F1E8', '#111827', '#E7E5E4', '#FFF1E6'] },
        ink: { label: '主字色', default: '#111827', options: ['#111827', '#F8FAFC', '#1C4021', '#7C2D12'] },
        accent: { label: '强调色', default: '#FF4D2E', options: ['#FF4D2E', '#FDE047', '#16A34A', '#2563EB'] },
        pop: { label: '点缀色', default: '#7C3AED', options: ['#7C3AED', '#EC4899', '#F97316', '#38BDF8'] }
      },
      fonts: {
        latin: { label: '英文大字', default: IMPACT, options: [IMPACT, SANS, '"Times New Roman", serif'] },
        cjk: { label: '中文大字', default: HEI, options: [HEI, SONG, MONO] }
      }
    },
    presets: [
      { name: '米纸朱红', colors: { bg: '#F5F1E8', ink: '#111827', accent: '#FF4D2E', pop: '#7C3AED' } },
      { name: '暗夜荧光', colors: { bg: '#111827', ink: '#F8FAFC', accent: '#FDE047', pop: '#EC4899' } },
      { name: '水泥蓝调', colors: { bg: '#E7E5E4', ink: '#111827', accent: '#2563EB', pop: '#38BDF8' } },
      { name: '抹茶复古', colors: { bg: '#FFF1E6', ink: '#1C4021', accent: '#16A34A', pop: '#F97316' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1440, defaultWidth: 1080, defaultHeight: 1440, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'kw-blob-a', type: 'shape', shapeKind: 'circle', x: -160, y: -180, width: 560, height: 560, fill: { $t: 'colors.accent' }, opacity: 0.2, zIndex: 1 },
      { id: 'kw-blob-b', type: 'shape', shapeKind: 'circle', x: 700, y: 1050, width: 620, height: 620, fill: { $t: 'colors.pop' }, opacity: 0.16, zIndex: 1 },
      { id: 'kw-bloom', type: 'overlay', x: 0, y: 0, width: 1080, height: 1440, background: 'radial-gradient(circle at 24% 12%, rgba(255,255,255,0.42), transparent 52%)', mixBlendMode: 'soft-light', zIndex: 2 },
      { id: 'kw-kicker', type: 'text', content: 'TREND REPORT · 2026 潮流观察', fontFamily: { $t: 'fonts.latin' }, fontSize: 26, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 5, x: 90, y: 116, width: 900, height: 34, zIndex: 5, animation: { name: 'slideInLeft', duration: 600 }, editable: { content: true } },
      { id: 'kw-rule', type: 'shape', shapeKind: 'rect', x: 90, y: 168, width: 140, height: 4, fill: { $t: 'colors.ink' }, opacity: 0.55, zIndex: 5 },
      { id: 'kw-l1', type: 'text', content: 'NEXT', fontFamily: { $t: 'fonts.latin' }, fontSize: 232, fontWeight: '900', color: { $t: 'colors.ink' }, letterSpacing: -4, x: 82, y: 228, width: 940, height: 236, zIndex: 5, rotation: -2.5, animation: { name: 'fadeInUp', duration: 700 }, editable: { content: true, fontSize: { type: 'range', min: 150, max: 280 } } },
      { id: 'kw-l2', type: 'text', content: 'WAVE', fontFamily: { $t: 'fonts.latin' }, fontSize: 232, fontWeight: '900', color: { $t: 'colors.accent' }, letterSpacing: -4, x: 150, y: 424, width: 900, height: 236, zIndex: 5, rotation: 2, animation: { name: 'fadeInUp', duration: 700, delay: 140 }, editable: { content: true, fontSize: { type: 'range', min: 150, max: 280 } } },
      { id: 'kw-wave', type: 'image', src: scribble(820, 64, '%237C3AED', 8), x: 92, y: 690, width: 820, height: 64, objectFit: 'fill', zIndex: 5, animation: { name: 'wobble', duration: 6000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'kw-side', type: 'text', content: 'K I N E T I C   T Y P O G R A P H Y', fontFamily: { $t: 'fonts.latin' }, fontSize: 19, color: { $t: 'colors.ink' }, opacity: 0.45, letterSpacing: 3, x: 758, y: 470, width: 560, height: 28, rotation: 90, zIndex: 4 },
      { id: 'kw-cn', type: 'text', content: '动 起 来 的 字', fontFamily: { $t: 'fonts.cjk' }, fontSize: 68, fontWeight: '900', color: { $t: 'colors.ink' }, letterSpacing: 6, x: 90, y: 784, width: 720, height: 84, zIndex: 5, animation: { name: 'rise', duration: 800, delay: 300 }, editable: { content: true } },
      { id: 'kw-body', type: 'text', content: '波浪、拉伸、错位——把静止的版面\n变成一段被按了暂停的动画。', fontFamily: { $t: 'fonts.cjk' }, fontSize: 30, color: { $t: 'colors.ink' }, opacity: 0.72, lineHeight: 1.7, x: 92, y: 892, width: 780, height: 116, zIndex: 5, animation: { name: 'fadeIn', duration: 700, delay: 500 } },
      { id: 'kw-pill', type: 'shape', shapeKind: 'rect', x: 90, y: 1064, width: 400, height: 100, fill: { $t: 'colors.ink' }, borderRadius: 50, zIndex: 5, animation: { name: 'zoomIn', duration: 500, delay: 620 } },
      { id: 'kw-pill-t', type: 'text', content: '看这批趋势 ↗', fontFamily: { $t: 'fonts.cjk' }, fontSize: 34, fontWeight: '700', color: { $t: 'colors.bg' }, textAlign: 'center', lineHeight: 2.9, x: 90, y: 1064, width: 400, height: 100, zIndex: 6, editable: { content: true } },
      { id: 'kw-chip', type: 'shape', shapeKind: 'rect', x: 516, y: 1064, width: 190, height: 100, fill: { $t: 'colors.pop' }, borderRadius: 50, zIndex: 5 },
      { id: 'kw-chip-t', type: 'text', content: 'HOT', fontFamily: { $t: 'fonts.latin' }, fontSize: 34, fontWeight: '900', color: { $t: 'colors.bg' }, textAlign: 'center', lineHeight: 2.9, x: 516, y: 1064, width: 190, height: 100, zIndex: 6 },
      { id: 'kw-marquee', type: 'text', content: 'MOTION · 变形 · DISTORTION · 波浪 · STRETCH · 错位 ·', fontFamily: { $t: 'fonts.latin' }, fontSize: 24, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.34, letterSpacing: 4, x: 90, y: 1268, width: 920, height: 32, zIndex: 5, animation: { name: 'drift', duration: 9000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'kw-foot', type: 'text', content: 'WORDS_BATTLE / 001 · 2026.09', fontFamily: { $t: 'fonts.latin' }, fontSize: 20, color: { $t: 'colors.ink' }, opacity: 0.5, letterSpacing: 2, x: 90, y: 1330, width: 600, height: 28, zIndex: 5 },
      { id: 'kw-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1440, background: `url("${grain(300, 11, 0.5)}")`, opacity: 0.07, mixBlendMode: 'multiply', zIndex: 9 }
    ]
  }
]

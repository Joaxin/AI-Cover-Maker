// src/core/templates/knowledge/trend-geometric-bauhaus.ts
// 当红趋势批 → 归入「知识科普」（knowledge） ｜ 12. 几何构成（16:9）
// 迁移自 src/core/templates/trend/：模板内容、素材函数与外观保持不变，只改分类归属。
import type { Template } from '@/types/types'
import { SANS, HEI, SONG, MONO, SERIF, arch, triangle } from '../_fx/trend'

export const trendGeometricBauhausTemplates: Template[] = [
  {
    id: 'trend-geometric-bauhaus', name: '几何构成封面', version: '1.0.0', category: 'knowledge',
    tags: ['trend', 'geometric', 'bauhaus', 'abstract', 'grid', '16:9'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="90" viewBox="0 0 160 90"><rect width="160" height="90" fill="%23F4F1EA"/><path d="M20 62 A22 22 0 0 1 64 62 Z" fill="%23E11D48"/><circle cx="104" cy="44" r="20" fill="%231D4ED8"/><polygon points="130,64 156,64 143,30" fill="%23F59E0B"/><rect x="20" y="72" width="60" height="6" fill="%23111"/><rect x="86" y="72" width="30" height="6" fill="%23111" opacity="0.5"/></svg>',
    tokens: {
      colors: {
        bg: { label: '纸面', default: '#F4F1EA', options: ['#F4F1EA', '#FFFFFF', '#111111', '#EDE9E0'] },
        ink: { label: '墨线', default: '#141414', options: ['#141414', '#F4F1EA', '#1E3A8A', '#3F2D1B'] },
        shapeA: { label: '形体一', default: '#E11D48', options: ['#E11D48', '#2563EB', '#15803D', '#7C3AED'] },
        shapeB: { label: '形体二', default: '#F59E0B', options: ['#F59E0B', '#0EA5E9', '#DC2626', '#111111'] }
      },
      fonts: { latin: { label: '几何标题', default: SANS, options: [SANS, MONO, SERIF] }, cjk: { label: '中文体', default: HEI, options: [HEI, SONG, MONO] } }
    },
    presets: [
      { name: '构成原色', colors: { bg: '#F4F1EA', ink: '#141414', shapeA: '#E11D48', shapeB: '#F59E0B' } },
      { name: '包豪斯蓝', colors: { bg: '#FFFFFF', ink: '#1E3A8A', shapeA: '#2563EB', shapeB: '#0EA5E9' } },
      { name: '反白夜色', colors: { bg: '#111111', ink: '#F4F1EA', shapeA: '#7C3AED', shapeB: '#DC2626' } },
      { name: '松柏牛皮', colors: { bg: '#EDE9E0', ink: '#3F2D1B', shapeA: '#15803D', shapeB: '#111111' } }
    ],
    canvas: { virtualWidth: 1920, virtualHeight: 1080, defaultWidth: 1920, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'gb-grid-v', type: 'image', src: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1920 1080"><g stroke='%23141414' stroke-width='1' opacity='0.1'>` + Array.from({ length: 11 }, (_, i) => `<line x1='${160 * (i + 1)}' y1='0' x2='${160 * (i + 1)}' y2='1080'/>`).join('') + Array.from({ length: 5 }, (_, i) => `<line x1='0' y1='${180 * (i + 1)}' x2='1920' y2='${180 * (i + 1)}'/>`).join('') + `</g></svg>`, x: 0, y: 0, width: 1920, height: 1080, objectFit: 'fill', zIndex: 1 },
      { id: 'gb-arch', type: 'image', src: arch(520, 300, '%23E11D48'), x: 1160, y: 176, width: 520, height: 300, objectFit: 'fill', zIndex: 3, animation: { name: 'zoomIn', duration: 800 } },
      { id: 'gb-circle', type: 'shape', shapeKind: 'circle', x: 1290, y: 476, width: 260, height: 260, fill: { $t: 'colors.shapeB' }, zIndex: 3, animation: { name: 'pulse', duration: 6000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'gb-ring', type: 'shape', shapeKind: 'circle', x: 1130, y: 500, width: 210, height: 210, fill: 'transparent', border: { width: 12, color: { $t: 'colors.ink' } }, zIndex: 3 },
      { id: 'gb-tri', type: 'image', src: triangle(300, 260, '%23141414'), x: 1580, y: 500, width: 300, height: 260, objectFit: 'fill', zIndex: 3 },
      { id: 'gb-bar-a', type: 'shape', shapeKind: 'rect', x: 1160, y: 792, width: 720, height: 26, fill: { $t: 'colors.ink' }, zIndex: 3 },
      { id: 'gb-bar-b', type: 'shape', shapeKind: 'rect', x: 1160, y: 840, width: 420, height: 26, fill: { $t: 'colors.shapeA' }, zIndex: 3 },
      { id: 'gb-dot-col', type: 'shape', shapeKind: 'circle', x: 1000, y: 200, width: 40, height: 40, fill: { $t: 'colors.shapeB' }, zIndex: 3 },
      { id: 'gb-stack', type: 'shape', shapeKind: 'rect', x: 160, y: 200, width: 400, height: 40, fill: 'transparent', border: { width: 2, color: { $t: 'colors.ink' } }, opacity: 0.5, zIndex: 3 },
      { id: 'gb-kicker', type: 'text', content: 'GEOMETRIC / 构成 · 秩序 · 1919→2026', fontFamily: { $t: 'fonts.cjk' }, fontSize: 25, color: { $t: 'colors.ink' }, opacity: 0.66, letterSpacing: 5, x: 160, y: 286, width: 800, height: 38, zIndex: 5, animation: { name: 'slideInLeft', duration: 700 } },
      { id: 'gb-h1', type: 'text', content: 'POINT,\nLINE,\nPLANE', fontFamily: { $t: 'fonts.latin' }, fontSize: 152, fontWeight: '800', color: { $t: 'colors.ink' }, lineHeight: 1.02, letterSpacing: -4, x: 160, y: 350, width: 900, height: 480, zIndex: 5, animation: { name: 'fadeInUp', duration: 900 }, editable: { content: true, fontSize: { type: 'range', min: 100, max: 180 } } },
      { id: 'gb-cn', type: 'text', content: '点、线、面的第三次会师', fontFamily: { $t: 'fonts.cjk' }, fontSize: 40, fontWeight: '700', color: { $t: 'colors.ink' }, letterSpacing: 3, x: 160, y: 848, width: 780, height: 60, zIndex: 5, animation: { name: 'rise', duration: 900, delay: 300 }, editable: { content: true } },
      { id: 'gb-rule', type: 'shape', shapeKind: 'rect', x: 160, y: 934, width: 60, height: 5, fill: { $t: 'colors.shapeA' }, zIndex: 5 },
      { id: 'gb-body', type: 'text', content: '把复杂的内容压进三个基本形，\n观众的眼睛会自己走完剩下的路。', fontFamily: { $t: 'fonts.cjk' }, fontSize: 26, color: { $t: 'colors.ink' }, opacity: 0.66, lineHeight: 1.75, x: 240, y: 920, width: 700, height: 96, zIndex: 5, editable: { content: true } },
      { id: 'gb-foot', type: 'text', content: 'BAUHAUS REVIVAL · LECTURE 04 · 2026.09.28 19:30', fontFamily: { $t: 'fonts.latin' }, fontSize: 22, color: { $t: 'colors.ink' }, opacity: 0.5, letterSpacing: 3, x: 1000, y: 936, width: 880, height: 32, textAlign: 'right', zIndex: 5 }
    ]
  }
]

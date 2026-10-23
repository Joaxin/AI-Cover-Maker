// src/core/templates/tech/trend-liquid-blob.ts
// 当红趋势批 → 归入「科技风」（tech） ｜ 10. 液态有机形体（9:16）
// 迁移自 src/core/templates/trend/：模板内容、素材函数与外观保持不变，只改分类归属。
import type { Template } from '@/types/types'
import {SANS, HEI, SONG, MONO, grainSoft, SERIF, grain} from '../_fx/trend'

export const trendLiquidBlobTemplates: Template[] = [
  {
    id: 'trend-liquid-blob', name: '液态有机形体', version: '1.0.0', category: 'tech',
    tags: ['trend', 'organic', '3d shape', 'liquid', 'soft shadow', '9:16'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="178" viewBox="0 0 100 178"><rect width="100" height="178" fill="%23F3EFE9"/><ellipse cx="34" cy="52" rx="26" ry="20" fill="%2386EFAC" transform="rotate(-18 34 52)"/><ellipse cx="66" cy="86" rx="22" ry="16" fill="%2393C5FD" transform="rotate(14 66 86)"/><rect x="20" y="120" width="60" height="10" rx="5" fill="%23111"/><rect x="20" y="136" width="34" height="10" rx="5" fill="%23111" opacity="0.4"/></svg>',
    tokens: {
      colors: {
        bg: { label: '底色', default: '#F3EFE9', options: ['#F3EFE9', '#EDE9FE', '#DCFCE7', '#111827'] },
        ink: { label: '文字', default: '#1A1A1A', options: ['#1A1A1A', '#F8FAFC', '#1F2937', '#14532D'] },
        blob: { label: '形体主色', default: '#86EFAC', options: ['#86EFAC', '#93C5FD', '#FCD34D', '#F9A8D4', '#C4B5FD'] },
        blob2: { label: '形体副色', default: '#93C5FD', options: ['#93C5FD', '#FCD34D', '#C4B5FD', '#FDBA74', '#86EFAC'] }
      },
      fonts: { latin: { label: '英文标题', default: SANS, options: [SANS, SERIF, MONO] }, cjk: { label: '中文体', default: HEI, options: [HEI, SONG, MONO] } }
    },
    presets: [
      { name: '奶油叶绿', colors: { bg: '#F3EFE9', ink: '#1A1A1A', blob: '#86EFAC', blob2: '#93C5FD' } },
      { name: '雾紫外壳', colors: { bg: '#EDE9FE', ink: '#1F2937', blob: '#C4B5FD', blob2: '#FCD34D' } },
      { name: '湖水薄荷', colors: { bg: '#DCFCE7', ink: '#14532D', blob: '#93C5FD', blob2: '#86EFAC' } },
      { name: '暗夜糖果', colors: { bg: '#111827', ink: '#F8FAFC', blob: '#F9A8D4', blob2: '#FDBA74' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1920, defaultWidth: 1080, defaultHeight: 1920, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'lb-shadow-1', type: 'shape', shapeKind: 'circle', x: 150, y: 350, width: 620, height: 460, fill: { $t: 'colors.ink' }, opacity: 0.07, zIndex: 2, rotation: -14 },
      { id: 'lb-blob-1', group: 'lb-blob-', type: 'shape', shapeKind: 'circle', x: 130, y: 300, width: 620, height: 460, fill: { $t: 'colors.blob' }, zIndex: 3, rotation: -14, shadow: { offsetX: 0, offsetY: 26, blur: 40, color: 'rgba(0,0,0,0.12)' }, animation: { name: 'float', duration: 7600, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'lb-blob-2', group: 'lb-blob-', type: 'shape', shapeKind: 'circle', x: 520, y: 620, width: 470, height: 380, fill: { $t: 'colors.blob2' }, opacity: 0.95, zIndex: 4, rotation: 12, shadow: { offsetX: 0, offsetY: 20, blur: 34, color: 'rgba(0,0,0,0.1)' }, animation: { name: 'drift', duration: 9200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'lb-blob-3', group: 'lb-blob-', type: 'shape', shapeKind: 'circle', x: 236, y: 920, width: 250, height: 250, fill: { $t: 'colors.ink' }, opacity: 0.88, zIndex: 5, animation: { name: 'heartbeat', duration: 6400, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'lb-pill-1', type: 'shape', shapeKind: 'rect', x: 620, y: 1040, width: 330, height: 130, fill: { $t: 'colors.blob' }, borderRadius: 65, zIndex: 5, rotation: -8, animation: { name: 'float', duration: 8200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'lb-pill-2', type: 'shape', shapeKind: 'rect', x: 560, y: 250, width: 190, height: 74, fill: { $t: 'colors.blob2' }, borderRadius: 37, zIndex: 6, rotation: 6 },
      { id: 'lb-ring', type: 'shape', shapeKind: 'circle', x: 780, y: 470, width: 210, height: 210, fill: 'transparent', border: { width: 14, color: { $t: 'colors.blob2' } }, zIndex: 6, animation: { name: 'spinSlow', duration: 24000, iterationCount: 'infinite', easing: 'linear' } },
      { id: 'lb-kicker', type: 'text', content: 'SOFT FORM / 有机形态 · 2026', fontFamily: { $t: 'fonts.latin' }, fontSize: 25, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.6, letterSpacing: 6, x: 96, y: 140, width: 900, height: 36, zIndex: 8, animation: { name: 'slideInLeft', duration: 700 } },
      { id: 'lb-h1', type: 'text', content: 'Flow,\nNot Force', fontFamily: { $t: 'fonts.latin' }, fontSize: 150, fontWeight: '800', color: { $t: 'colors.ink' }, lineHeight: 1.04, letterSpacing: -5, x: 96, y: 1196, width: 912, height: 330, zIndex: 8, animation: { name: 'fadeInUp', duration: 900 }, editable: { content: true, fontSize: { type: 'range', min: 110, max: 164 } } },
      { id: 'lb-cn', type: 'text', content: '圆角代替棱角，\n说服就变成邀请。', fontFamily: { $t: 'fonts.cjk' }, fontSize: 42, fontWeight: '700', color: { $t: 'colors.ink' }, lineHeight: 1.5, x: 96, y: 1540, width: 620, height: 150, zIndex: 8, animation: { name: 'rise', duration: 900, delay: 220 }, editable: { content: true } },
      { id: 'lb-cta', type: 'shape', shapeKind: 'rect', x: 88, y: 1706, width: 372, height: 104, fill: { $t: 'colors.ink' }, borderRadius: 52, zIndex: 8 },
      { id: 'lb-cta-t', type: 'text', content: '看看这组形体', fontFamily: { $t: 'fonts.cjk' }, fontSize: 33, fontWeight: '700', color: { $t: 'colors.bg' }, textAlign: 'center', lineHeight: 3.15, x: 88, y: 1706, width: 372, height: 104, zIndex: 9, editable: { content: true } },
      { id: 'lb-note', type: 'text', content: ' ORGANIC · LIQUID · SOFT ', fontFamily: { $t: 'fonts.latin' }, fontSize: 24, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.55, letterSpacing: 4, textAlign: 'right', x: 520, y: 1740, width: 472, height: 34, zIndex: 9 },
      { id: 'lb-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1920, background: `url("${grainSoft(300, 33, 0.55)}")`, opacity: 0.07, mixBlendMode: 'multiply', zIndex: 10 }
    ]
  }
]

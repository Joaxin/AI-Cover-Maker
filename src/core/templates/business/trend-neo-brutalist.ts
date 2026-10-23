// src/core/templates/business/trend-neo-brutalist.ts
// 当红趋势批 → 归入「商务风」（business） ｜ 2. 新粗野主义硬边卡（1:1）
// 迁移自 src/core/templates/trend/：模板内容、素材函数与外观保持不变，只改分类归属。
import type { Template } from '@/types/types'
import { SANS, HEI, SONG, MONO, IMPACT, halftone, star } from '../_fx/trend'

export const trendNeoBrutalistTemplates: Template[] = [
  {
    id: 'trend-neo-brutalist', name: '新粗野主义便签', version: '1.0.0', category: 'business',
    tags: ['trend', 'neo-brutalism', 'sticker', 'raw', 'diy', '1:1'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23FDF6E3"/><rect x="18" y="20" width="60" height="46" fill="%23FFD400" stroke="%23111" stroke-width="3"/><rect x="22" y="26" width="40" height="6" fill="%23111"/><rect x="22" y="38" width="28" height="4" fill="%23111" opacity="0.5"/><rect x="18" y="74" width="34" height="12" fill="%23FF5A36" stroke="%23111" stroke-width="3"/><rect x="60" y="74" width="22" height="12" fill="%23FFF" stroke="%23111" stroke-width="3"/></svg>',
    tokens: {
      colors: {
        bg: { label: '底纸', default: '#FDF6E3', options: ['#FDF6E3', '#FFFFFF', '#D9F2C5', '#FFE3EC'] },
        ink: { label: '描边', default: '#111111', options: ['#111111', '#1E3A8A', '#3F2D1B', '#0B3B2E'] },
        card: { label: '卡片', default: '#FFD400', options: ['#FFD400', '#A7F3D0', '#FBCFE8', '#BFDBFE', '#FFFFFF'] },
        accent: { label: '强调块', default: '#FF5A36', options: ['#FF5A36', '#111111', '#4F46E5', '#059669'] }
      },
      fonts: { latin: { label: '标题体', default: IMPACT, options: [IMPACT, SANS, MONO] }, cjk: { label: '中文体', default: HEI, options: [HEI, SONG, MONO] } }
    },
    presets: [
      { name: '柠檬便利贴', colors: { bg: '#FDF6E3', ink: '#111111', card: '#FFD400', accent: '#FF5A36' } },
      { name: '薄荷手写板', colors: { bg: '#D9F2C5', ink: '#0B3B2E', card: '#FFFFFF', accent: '#059669' } },
      { name: '草莓牛奶', colors: { bg: '#FFE3EC', ink: '#3F2D1B', card: '#FBCFE8', accent: '#4F46E5' } },
      { name: '靛蓝反色', colors: { bg: '#FFFFFF', ink: '#1E3A8A', card: '#BFDBFE', accent: '#111111' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1080, defaultWidth: 1080, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'nb-grid', type: 'image', src: halftone(1080, 1080, 2, 46, '%23111111'), x: 0, y: 0, width: 1080, height: 1080, objectFit: 'fill', opacity: 0.12, zIndex: 1 },
      { id: 'nb-shadow', type: 'shape', shapeKind: 'rect', x: 96, y: 122, width: 888, height: 560, fill: { $t: 'colors.ink' }, borderRadius: 0, zIndex: 2 },
      { id: 'nb-card', type: 'shape', shapeKind: 'rect', x: 76, y: 96, width: 888, height: 560, fill: { $t: 'colors.card' }, border: { width: 6, color: { $t: 'colors.ink' } }, zIndex: 3, animation: { name: 'zoomIn', duration: 420 }},
      { id: 'nb-tag', type: 'shape', shapeKind: 'rect', x: 76, y: 60, width: 268, height: 62, fill: { $t: 'colors.accent' }, border: { width: 5, color: { $t: 'colors.ink' } }, zIndex: 4, rotation: -3, animation: { name: 'swing', duration: 5200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'nb-tag-t', type: 'text', content: 'NO.07 干货', fontFamily: { $t: 'fonts.cjk' }, fontSize: 32, fontWeight: '900', color: { $t: 'colors.bg' }, textAlign: 'center', lineHeight: 1.9, x: 76, y: 60, width: 268, height: 62, rotation: -3, zIndex: 5, animation: { name: 'fadeIn', duration: 300, delay: 300 }, editable: { content: true } },
      { id: 'nb-h1', type: 'text', content: '别做\n好看的\n垃圾', fontFamily: { $t: 'fonts.cjk' }, fontSize: 118, fontWeight: '900', color: { $t: 'colors.ink' }, lineHeight: 1.08, letterSpacing: 2, x: 120, y: 148, width: 780, height: 400, zIndex: 4, animation: { name: 'slideInLeft', duration: 480, delay: 140 }, editable: { content: true, fontSize: { type: 'range', min: 80, max: 140 } } },
      { id: 'nb-underline', type: 'shape', shapeKind: 'rect', x: 122, y: 522, width: 470, height: 26, fill: { $t: 'colors.accent' }, opacity: 0.9, zIndex: 3, animation: { name: 'slideInLeft', duration: 420, delay: 520 }},
      { id: 'nb-sub', type: 'text', content: 'RAW / UGLY / USEFUL —— 丑一点，但一句话记得住', fontFamily: { $t: 'fonts.latin' }, fontSize: 24, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.75, x: 122, y: 566, width: 820, height: 38, zIndex: 4, animation: { name: 'fadeIn', duration: 400, delay: 560 }, editable: { content: true } },
      { id: 'nb-box1', type: 'shape', shapeKind: 'rect', x: 76, y: 712, width: 424, height: 156, fill: { $t: 'colors.bg' }, border: { width: 5, color: { $t: 'colors.ink' } }, zIndex: 4, animation: { name: 'zoomIn', duration: 360, delay: 620 }},
      { id: 'nb-box1-t', type: 'text', content: '3 秒抓住人\n靠的是冲突，不是配色', fontFamily: { $t: 'fonts.cjk' }, fontSize: 28, fontWeight: '700', color: { $t: 'colors.ink' }, lineHeight: 1.55, x: 100, y: 736, width: 380, height: 110, zIndex: 5, editable: { content: true } },
      { id: 'nb-box2', type: 'shape', shapeKind: 'rect', x: 540, y: 712, width: 424, height: 156, fill: { $t: 'colors.accent' }, border: { width: 5, color: { $t: 'colors.ink' } }, zIndex: 4, animation: { name: 'zoomIn', duration: 360, delay: 700 }},
      { id: 'nb-box2-t', type: 'text', content: 'DO IT\nUGLY, DO IT\nNOW', fontFamily: { $t: 'fonts.latin' }, fontSize: 28, fontWeight: '900', color: { $t: 'colors.bg' }, lineHeight: 1.25, x: 564, y: 726, width: 380, height: 128, zIndex: 5 },
      { id: 'nb-sticker', type: 'image', src: star(190, '%23FF5A36'), x: 848, y: 60, width: 190, height: 190, zIndex: 6, rotation: 14, animation: { name: 'twinkle', duration: 3400, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'nb-foot', type: 'shape', shapeKind: 'rect', x: 76, y: 928, width: 888, height: 76, fill: { $t: 'colors.ink' }, zIndex: 4, animation: { name: 'fadeIn', duration: 360, delay: 780 }},
      { id: 'nb-foot-t', type: 'text', content: 'ANTI-DESIGN · 反精致宣言 · 粗边硬阴影 · 手涂色块', fontFamily: { $t: 'fonts.cjk' }, fontSize: 24, fontWeight: '700', color: { $t: 'colors.bg' }, textAlign: 'center', lineHeight: 2.9, x: 76, y: 928, width: 888, height: 76, zIndex: 5, editable: { content: true } }
    ]
  }
]

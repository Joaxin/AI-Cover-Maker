// src/core/templates/magazine/hy-02-editorial-serif.ts
// HY 署名批 → 杂志风（magazine） ｜ 大刊衬线编辑感 Editorial Serif（1080×1350 竖版 4:5）
import type { Template } from '@/types/types'
import { SERIF, HEI, grain } from '../_fx/trend'

export const hyEditorialSerifTemplates: Template[] = [
  {
    id: 'hy-02-editorial-serif', name: '大刊衬线', version: '1.0.0', category: 'magazine',
    tags: ['hy', 'editorial', 'serif', 'magazine', 'vogue', 'kinfolk', '4:5'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="125" viewBox="0 0 100 125"><rect width="100" height="125" fill="%23F4F1EA"/><rect x="8" y="10" width="84" height="1.5" fill="%231A1714"/><text x="10" y="42" font-family="Georgia" font-size="28" fill="%231A1714">Slow</text><rect x="10" y="52" width="58" height="2" fill="%23B5432F"/><text x="10" y="74" font-family="sans-serif" font-size="9" fill="%231A1714" opacity="0.7">慢下来</text><rect x="10" y="100" width="80" height="1.5" fill="%231A1714"/><text x="68" y="118" font-family="Georgia" font-size="26" fill="%23B5432F" opacity="0.4">07</text></svg>',
    tokens: {
      colors: {
        bg: { label: '纸底', default: '#F4F1EA', options: ['#F4F1EA', '#16140F', '#2A1416', '#EFE3CF'] },
        ink: { label: '墨色', default: '#1A1714', options: ['#1A1714', '#F2EDE3', '#F4E9E6', '#3A2C1A'] },
        rule: { label: '线色', default: '#1A1714', options: ['#1A1714', '#F2EDE3', '#F4E9E6', '#3A2C1A'] },
        accent: { label: '点缀', default: '#B5432F', options: ['#B5432F', '#C9A24B', '#E0B85C', '#B5762E'] },
        body: { label: '正文', default: 'rgba(26,23,20,0.72)', options: ['rgba(26,23,20,0.72)', 'rgba(242,237,227,0.7)', 'rgba(244,233,230,0.72)', 'rgba(58,44,26,0.72)'] }
      },
      fonts: { serif: { label: '衬线英文', default: SERIF, options: [SERIF, HEI] }, cjk: { label: '中文细黑', default: HEI, options: [HEI, SERIF] } }
    },
    presets: [
      { name: '米白墨', colors: { bg: '#F4F1EA', ink: '#1A1714', rule: '#1A1714', accent: '#B5432F', body: 'rgba(26,23,20,0.72)' } },
      { name: '纯墨黑', colors: { bg: '#16140F', ink: '#F2EDE3', rule: '#F2EDE3', accent: '#C9A24B', body: 'rgba(242,237,227,0.7)' } },
      { name: '酒红夜', colors: { bg: '#2A1416', ink: '#F4E9E6', rule: '#F4E9E6', accent: '#E0B85C', body: 'rgba(244,233,230,0.72)' } },
      { name: '沙金暖', colors: { bg: '#EFE3CF', ink: '#3A2C1A', rule: '#3A2C1A', accent: '#B5762E', body: 'rgba(58,44,26,0.72)' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'ed-frame', type: 'shape', shapeKind: 'rect', x: 44, y: 44, width: 992, height: 1262, fill: 'transparent', border: { width: 1, style: 'solid', color: { $t: 'colors.rule' } }, opacity: 0.5, zIndex: 1 },
      { id: 'ed-watermark', type: 'text', content: 'VII', fontFamily: { $t: 'fonts.serif' }, fontSize: 220, fontWeight: '700', color: { $t: 'colors.accent' }, opacity: 0.05, textAlign: 'center', rotation: -6, x: 500, y: 372, width: 540, height: 280, zIndex: 1 },
      { id: 'ed-decor-07', type: 'text', content: '07', fontFamily: { $t: 'fonts.serif' }, fontSize: 130, fontWeight: '700', color: { $t: 'colors.accent' }, opacity: 0.22, textAlign: 'right', x: 700, y: 1188, width: 292, height: 140, zIndex: 2 },

      { id: 'ed-rule-top', type: 'shape', shapeKind: 'rect', x: 88, y: 96, width: 904, height: 2, fill: { $t: 'colors.rule' }, zIndex: 3 },
      { id: 'ed-rule-bot', type: 'shape', shapeKind: 'rect', x: 88, y: 236, width: 904, height: 2, fill: { $t: 'colors.rule' }, zIndex: 3 },
      { id: 'ed-grid-rule-top', type: 'shape', shapeKind: 'rect', x: 88, y: 1086, width: 904, height: 2, fill: { $t: 'colors.rule' }, zIndex: 3 },
      { id: 'ed-grid-rule-bot', type: 'shape', shapeKind: 'rect', x: 88, y: 1190, width: 904, height: 2, fill: { $t: 'colors.rule' }, zIndex: 3 },

      { id: 'ed-mark-tr', type: 'shape', shapeKind: 'circle', x: 956, y: 100, width: 16, height: 16, fill: { $t: 'colors.accent' }, zIndex: 4 },
      { id: 'ed-mark-bl', type: 'shape', shapeKind: 'circle', x: 88, y: 1290, width: 14, height: 14, fill: { $t: 'colors.accent' }, zIndex: 4 },
      { id: 'ed-barcode', type: 'shape', shapeKind: 'rect', x: 88, y: 1286, width: 160, height: 36, fill: { $t: 'colors.ink' }, opacity: 0.9, zIndex: 4 },
      { id: 'ed-lead-rule', type: 'shape', shapeKind: 'rect', x: 88, y: 944, width: 904, height: 2, fill: { $t: 'colors.rule' }, opacity: 0.55, zIndex: 4 },
      { id: 'ed-title-rule', type: 'shape', shapeKind: 'rect', x: 88, y: 724, width: 320, height: 3, fill: { $t: 'colors.accent' }, zIndex: 5 },

      { id: 'ed-mast-zh', type: 'text', content: '留白', fontFamily: { $t: 'fonts.serif' }, fontSize: 60, fontWeight: '700', color: { $t: 'colors.ink' }, letterSpacing: 4, x: 88, y: 112, width: 300, height: 78, zIndex: 5, animation: { name: 'fadeIn', duration: 600 } },
      { id: 'ed-mast-en', type: 'text', content: 'BLANK MAGAZINE', fontFamily: { $t: 'fonts.serif' }, fontSize: 24, fontWeight: '400', color: { $t: 'colors.ink' }, opacity: 0.85, letterSpacing: 8, x: 88, y: 190, width: 480, height: 34, zIndex: 5 },
      { id: 'ed-issue', type: 'text', content: '第 07 期 · ISSUE 07', fontFamily: { $t: 'fonts.cjk' }, fontSize: 24, fontWeight: '500', color: { $t: 'colors.accent' }, opacity: 0.9, letterSpacing: 4, textAlign: 'right', x: 88, y: 116, width: 904, height: 34, zIndex: 5 },
      { id: 'ed-kicker', type: 'text', content: '封面故事 · COVER STORY', fontFamily: { $t: 'fonts.cjk' }, fontSize: 24, fontWeight: '500', color: { $t: 'colors.accent' }, letterSpacing: 6, x: 88, y: 280, width: 904, height: 34, zIndex: 5, animation: { name: 'slideInLeft', duration: 700, delay: 200 } },

      { id: 'ed-title', type: 'text', content: 'Slow\nLiving', fontFamily: { $t: 'fonts.serif' }, fontSize: 200, fontWeight: '400', color: { $t: 'colors.ink' }, lineHeight: 0.98, letterSpacing: -2, x: 88, y: 336, width: 904, height: 440, zIndex: 6, animation: { name: 'fadeInUp', duration: 800 }, editable: { content: true, fontSize: { type: 'range', min: 120, max: 210 } } },

      { id: 'ed-sub', type: 'text', content: '在加速的时代里，\n我们练习把节奏慢下来。', fontFamily: { $t: 'fonts.cjk' }, fontSize: 40, fontWeight: '300', color: { $t: 'colors.body' }, lineHeight: 1.7, letterSpacing: 1, x: 88, y: 792, width: 820, height: 150, zIndex: 5, animation: { name: 'rise', duration: 800, delay: 240 }, editable: { content: true } },
      { id: 'ed-lead', type: 'text', content: '本期三篇长文，关于停顿、关于手艺，\n也关于如何与空白好好相处。', fontFamily: { $t: 'fonts.cjk' }, fontSize: 27, fontWeight: '400', color: { $t: 'colors.body' }, lineHeight: 1.7, letterSpacing: 1, x: 88, y: 968, width: 860, height: 120, zIndex: 5, animation: { name: 'fadeIn', duration: 800, delay: 360 }, editable: { content: true } },

      { id: 'ed-col1-h', type: 'text', content: '栏目 / SECTION', fontFamily: { $t: 'fonts.cjk' }, fontSize: 20, fontWeight: '500', color: { $t: 'colors.accent' }, opacity: 0.9, letterSpacing: 4, x: 88, y: 1110, width: 280, height: 30, zIndex: 5 },
      { id: 'ed-col1-v', type: 'text', content: '封面 · 生活', fontFamily: { $t: 'fonts.cjk' }, fontSize: 30, fontWeight: '600', color: { $t: 'colors.ink' }, letterSpacing: 1, x: 88, y: 1140, width: 280, height: 40, zIndex: 5 },
      { id: 'ed-col2-h', type: 'text', content: '期号 / ISSUE', fontFamily: { $t: 'fonts.cjk' }, fontSize: 20, fontWeight: '500', color: { $t: 'colors.accent' }, opacity: 0.9, letterSpacing: 4, x: 389, y: 1110, width: 280, height: 30, zIndex: 5 },
      { id: 'ed-col2-v', type: 'text', content: '第 07 期', fontFamily: { $t: 'fonts.cjk' }, fontSize: 30, fontWeight: '600', color: { $t: 'colors.ink' }, letterSpacing: 1, x: 389, y: 1140, width: 280, height: 40, zIndex: 5 },
      { id: 'ed-col3-h', type: 'text', content: '作者 / BYLINE', fontFamily: { $t: 'fonts.cjk' }, fontSize: 20, fontWeight: '500', color: { $t: 'colors.accent' }, opacity: 0.9, letterSpacing: 4, x: 690, y: 1110, width: 280, height: 30, zIndex: 5 },
      { id: 'ed-col3-v', type: 'text', content: '编辑部 出品', fontFamily: { $t: 'fonts.cjk' }, fontSize: 30, fontWeight: '600', color: { $t: 'colors.ink' }, letterSpacing: 1, x: 690, y: 1140, width: 280, height: 40, zIndex: 5 },

      { id: 'ed-foot', type: 'text', content: '留白 BLANK · 月刊 · 2026 春季号', fontFamily: { $t: 'fonts.cjk' }, fontSize: 24, fontWeight: '400', color: { $t: 'colors.body' }, letterSpacing: 2, x: 88, y: 1224, width: 640, height: 34, zIndex: 5 },
      { id: 'ed-price', type: 'text', content: '¥ 28 · 全国零售', fontFamily: { $t: 'fonts.cjk' }, fontSize: 20, fontWeight: '500', color: { $t: 'colors.ink' }, letterSpacing: 2, x: 300, y: 1288, width: 300, height: 32, zIndex: 5 },

      { id: 'ed-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1350, background: `url("${grain(280, 6, 0.5)}")`, opacity: 0.035, mixBlendMode: 'overlay', zIndex: 9 }
    ]
  }
]

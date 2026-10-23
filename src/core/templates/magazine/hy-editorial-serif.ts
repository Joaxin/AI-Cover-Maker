// src/core/templates/magazine/hy-editorial-serif.ts
// HY 署名批 → 杂志风（magazine） ｜ 衬线编辑排版（1080×1350 竖版）
import type { Template } from '@/types/types'
import { SONG, HEI, SERIF, grain } from '../_fx/trend'

export const hyEditorialSerifTemplates: Template[] = [
  {
    id: 'hy-editorial-serif', name: '杂志衬线 · 编辑排版', version: '1.0.0', category: 'magazine',
    tags: ['hy', 'editorial', 'serif', 'magazine', 'minimal', '1:1.25'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23F4F1EA"/><text x="14" y="40" font-family="Georgia" font-size="26" fill="%231A1714">缓慢</text><rect x="14" y="50" width="72" height="2" fill="%231A1714"/><text x="14" y="74" font-family="sans-serif" font-size="11" fill="%231A1714" opacity="0.7">留白给呼吸</text><text x="70" y="92" font-family="Georgia" font-size="30" fill="%23B5432F" opacity="0.4">07</text></svg>',
    tokens: {
      colors: {
        bg: { label: '纸', default: '#F4F1EA', options: ['#F4F1EA', '#EFE7D8', '#EDEBE6', '#EAF0EE'] },
        ink: { label: '墨', default: '#1A1714', options: ['#1A1714', '#1B1B1B', '#14110D', '#10211C'] },
        rule: { label: '线', default: '#1A1714', options: ['#1A1714', '#1B1B1B', '#14110D', '#10211C'] },
        body: { label: '正文', default: 'rgba(26,23,20,0.72)', options: ['rgba(26,23,20,0.72)', 'rgba(27,27,27,0.7)', 'rgba(20,17,13,0.72)', 'rgba(16,33,28,0.72)'] },
        accent: { label: '点缀', default: '#B5432F', options: ['#B5432F', '#8A5A2B', '#9C5A3C', '#2C5A6B'] }
      },
      fonts: { serif: { label: '衬线', default: SERIF, options: [SERIF, SONG] }, cjk: { label: '中文', default: HEI, options: [HEI, SONG] } }
    },
    presets: [
      { name: '纸白墨黑', colors: { bg: '#F4F1EA', ink: '#1A1714', rule: '#1A1714', body: 'rgba(26,23,20,0.72)', accent: '#B5432F' } },
      { name: '米杏深棕', colors: { bg: '#EFE7D8', ink: '#1B1B1B', rule: '#1B1B1B', body: 'rgba(27,27,27,0.7)', accent: '#8A5A2B' } },
      { name: '雾灰赭石', colors: { bg: '#EDEBE6', ink: '#14110D', rule: '#14110D', body: 'rgba(20,17,13,0.72)', accent: '#9C5A3C' } },
      { name: '瓷青墨蓝', colors: { bg: '#EAF0EE', ink: '#10211C', rule: '#10211C', body: 'rgba(16,33,28,0.72)', accent: '#2C5A6B' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'ed-dot', type: 'shape', shapeKind: 'circle', x: 60, y: 116, width: 18, height: 18, fill: { $t: 'colors.accent' }, zIndex: 3 },
      { id: 'ed-eyebrow', type: 'text', content: 'KINFOLK 风格 · 第 07 期', fontFamily: { $t: 'fonts.cjk' }, fontSize: 22, fontWeight: '500', color: { $t: 'colors.accent' }, letterSpacing: 6, x: 96, y: 100, width: 920, height: 36, zIndex: 3, animation: { name: 'fadeIn', duration: 600 } },
      { id: 'ed-title', type: 'text', content: '缓慢生活', fontFamily: { $t: 'fonts.cjk' }, fontSize: 140, fontWeight: '700', color: { $t: 'colors.ink' }, letterSpacing: 6, x: 60, y: 160, width: 960, height: 200, zIndex: 4, animation: { name: 'fadeInUp', duration: 700 }, editable: { content: true, fontSize: { type: 'range', min: 90, max: 180 } } },
      { id: 'ed-rule', type: 'shape', shapeKind: 'rect', x: 60, y: 408, width: 960, height: 2, fill: { $t: 'colors.rule' }, zIndex: 3, animation: { name: 'slideInLeft', duration: 700, delay: 200 } },
      { id: 'ed-body', type: 'text', content: '在加速的世界里，\n留一点空白给呼吸。', fontFamily: { $t: 'fonts.cjk' }, fontSize: 30, fontWeight: '400', color: { $t: 'colors.body' }, lineHeight: 1.7, x: 60, y: 448, width: 900, height: 120, zIndex: 4, animation: { name: 'fadeIn', duration: 700, delay: 360 }, editable: { content: true } },
      { id: 'ed-byline', type: 'text', content: '文 / 编辑部', fontFamily: { $t: 'fonts.cjk' }, fontSize: 24, color: { $t: 'colors.body' }, letterSpacing: 2, x: 60, y: 1190, width: 420, height: 36, zIndex: 4 },
      { id: 'ed-page', type: 'text', content: '07', fontFamily: { $t: 'fonts.serif' }, fontSize: 110, fontWeight: '700', color: { $t: 'colors.accent' }, opacity: 0.28, textAlign: 'right', x: 820, y: 1120, width: 200, height: 140, zIndex: 3 },
      { id: 'ed-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1350, background: `url("${grain(280, 6, 0.5)}")`, opacity: 0.035, mixBlendMode: 'overlay', zIndex: 9 }
    ]
  }
]

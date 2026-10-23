// src/core/templates/quotes/trend-surreal-float.ts
// 当红趋势批 → 归入「金句语录」（quotes） ｜ 11. 超现实悬浮（2.35:1）
// 迁移自 src/core/templates/trend/：模板内容、素材函数与外观保持不变，只改分类归属。
import type { Template } from '@/types/types'
import {SANS, HEI, SONG, MONO, grainSoft, SERIF, arch, triangle, cloud, grain} from '../_fx/trend'

export const trendSurrealFloatTemplates: Template[] = [
  {
    id: 'trend-surreal-float', name: '超现实悬浮横图', version: '1.0.0', category: 'quotes',
    tags: ['trend', 'surreal', 'floating', 'dream', 'juxtaposition', '2.35:1'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="68" viewBox="0 0 160 68"><rect width="160" height="68" fill="%23DCE7F5"/><rect x="0" y="46" width="160" height="22" fill="%23C6D6EA"/><path d="M96 46 V22 A14 14 0 0 1 124 22 V46 Z" fill="%23111827" opacity="0.85"/><ellipse cx="44" cy="20" rx="16" ry="8" fill="%23FDE68A"/><ellipse cx="44" cy="52" rx="14" ry="4" fill="%23111827" opacity="0.15"/><rect x="16" y="56" width="40" height="5" fill="%23111827"/></svg>',
    tokens: {
      colors: {
        sky: { label: '天空', default: '#DCE7F5', options: ['#DCE7F5', '#F5E6D3', '#E0E7FF', '#DFF3E8'] },
        ground: { label: '地面', default: '#C6D6EA', options: ['#C6D6EA', '#E7D3B5', '#C7D2FE', '#C8E6D2'] },
        object: { label: '悬浮物', default: '#FDE68A', options: ['#FDE68A', '#F9A8D4', '#A5B4FC', '#FDBA74'] },
        ink: { label: '墨', default: '#111827', options: ['#111827', '#3B2F2A', '#1F2937', '#0F172A'] }
      },
      fonts: { latin: { label: '英文标题', default: SERIF, options: [SERIF, SANS, MONO] }, cjk: { label: '中文体', default: HEI, options: [HEI, SONG, MONO] } }
    },
    presets: [
      { name: '淡蓝天台', colors: { sky: '#DCE7F5', ground: '#C6D6EA', object: '#FDE68A', ink: '#111827' } },
      { name: '沙丘黄昏', colors: { sky: '#F5E6D3', ground: '#E7D3B5', object: '#FDBA74', ink: '#3B2F2A' } },
      { name: '靛紫梦境', colors: { sky: '#E0E7FF', ground: '#C7D2FE', object: '#A5B4FC', ink: '#1F2937' } },
      { name: '薄荷绿野', colors: { sky: '#DFF3E8', ground: '#C8E6D2', object: '#F9A8D4', ink: '#0F172A' } }
    ],
    canvas: { virtualWidth: 1800, virtualHeight: 766, defaultWidth: 1800, defaultHeight: 766, backgroundColor: { $t: 'colors.sky' } },
    elements: [
      { id: 'sf-ground', type: 'shape', shapeKind: 'rect', x: 0, y: 500, width: 1800, height: 266, fill: { $t: 'colors.ground' }, zIndex: 2 },
      { id: 'sf-horizon', type: 'shape', shapeKind: 'rect', x: 0, y: 498, width: 1800, height: 3, fill: { $t: 'colors.ink' }, opacity: 0.25, zIndex: 3 },
      { id: 'sf-arch', type: 'shape', shapeKind: 'rect', x: 1240, y: 210, width: 300, height: 292, fill: { $t: 'colors.ink' }, borderRadius: 150, zIndex: 4, opacity: 0.9 },
      { id: 'sf-arch-in', type: 'shape', shapeKind: 'rect', x: 1284, y: 254, width: 212, height: 248, fill: { $t: 'colors.ground' }, borderRadius: 106, zIndex: 5 },
      { id: 'sf-cloud', type: 'image', src: cloud(360, 190, '%23FFFFFF'), x: 1180, y: 96, width: 360, height: 190, objectFit: 'fill', opacity: 0.85, zIndex: 6, animation: { name: 'drift', duration: 12000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'sf-disc-shadow', type: 'shape', shapeKind: 'circle', x: 396, y: 520, width: 300, height: 68, fill: { $t: 'colors.ink' }, opacity: 0.13, zIndex: 4 },
      { id: 'sf-disc', type: 'shape', shapeKind: 'circle', x: 420, y: 236, width: 252, height: 252, fill: { $t: 'colors.object' }, zIndex: 5, shadow: { offsetX: 0, offsetY: 18, blur: 30, color: 'rgba(0,0,0,0.14)' }, animation: { name: 'float', duration: 7000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'sf-ladder', type: 'image', src: arch(220, 300, '%23111827'), x: 880, y: 200, width: 220, height: 300, objectFit: 'fill', opacity: 0.16, zIndex: 4 },
      { id: 'sf-steps', type: 'shape', shapeKind: 'rect', x: 900, y: 470, width: 260, height: 30, fill: { $t: 'colors.ink' }, opacity: 0.85, zIndex: 5 },
      { id: 'sf-steps-2', type: 'shape', shapeKind: 'rect', x: 940, y: 410, width: 220, height: 30, fill: { $t: 'colors.ink' }, opacity: 0.7, zIndex: 5 },
      { id: 'sf-steps-3', type: 'shape', shapeKind: 'rect', x: 980, y: 350, width: 180, height: 30, fill: { $t: 'colors.ink' }, opacity: 0.55, zIndex: 5 },
      { id: 'sf-tri', type: 'image', src: triangle(180, 150, '%23111827'), x: 160, y: 350, width: 180, height: 150, objectFit: 'fill', opacity: 0.8, zIndex: 5, animation: { name: 'swing', duration: 8000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'sf-kicker', type: 'text', content: 'SURREAL / 一句不讲理的话', fontFamily: { $t: 'fonts.cjk' }, fontSize: 24, color: { $t: 'colors.ink' }, opacity: 0.62, letterSpacing: 6, x: 120, y: 128, width: 700, height: 36, zIndex: 8, animation: { name: 'fadeIn', duration: 800 } },
      { id: 'sf-h1', type: 'text', content: '把门留在\n半空中', fontFamily: { $t: 'fonts.cjk' }, fontSize: 96, fontWeight: '900', color: { $t: 'colors.ink' }, lineHeight: 1.16, letterSpacing: 2, x: 120, y: 188, width: 720, height: 240, zIndex: 8, animation: { name: 'inkReveal', duration: 1200 }, editable: { content: true, fontSize: { type: 'range', min: 64, max: 120 } } },
      { id: 'sf-body', type: 'text', content: '不解释逻辑，只造一个让人停一秒的画面。', fontFamily: { $t: 'fonts.cjk' }, fontSize: 28, color: { $t: 'colors.ink' }, opacity: 0.7, x: 120, y: 616, width: 780, height: 44, zIndex: 8, animation: { name: 'slideUpFade', duration: 900, delay: 320 }, editable: { content: true } },
      { id: 'sf-tag', type: 'shape', shapeKind: 'rect', x: 1380, y: 560, width: 300, height: 96, fill: { $t: 'colors.ink' }, borderRadius: 48, zIndex: 8 },
      { id: 'sf-tag-t', type: 'text', content: 'NEW · 第 12 场', fontFamily: { $t: 'fonts.cjk' }, fontSize: 30, color: { $t: 'colors.sky' }, textAlign: 'center', lineHeight: 3.2, x: 1380, y: 560, width: 300, height: 96, zIndex: 9, editable: { content: true } },
      { id: 'sf-grain', type: 'overlay', x: 0, y: 0, width: 1800, height: 766, background: `url("${grainSoft(300, 47, 0.6)}")`, opacity: 0.09, mixBlendMode: 'multiply', zIndex: 10 }
    ]
  }
]

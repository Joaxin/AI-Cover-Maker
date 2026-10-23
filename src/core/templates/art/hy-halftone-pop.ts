// src/core/templates/art/hy-halftone-pop.ts
// HY 署名批 → 艺术风（art） ｜ 波普半调网点（1080×1350 竖版）
import type { Template } from '@/types/types'
import { HEI, SANS, IMPACT, halftone } from '../_fx/trend'
import { svgUri as makeSvg } from '../_fx/common'

export const hyHalftonePopTemplates: Template[] = [
  {
    id: 'hy-halftone-pop', name: '波普半调 · 炸裂出圈', version: '1.0.0', category: 'art',
    tags: ['hy', 'halftone', 'pop art', 'warhol', 'bold', '1:1.25'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23FFE14D"/><rect y="56" width="100" height="44" fill="%23FF3D7F"/><text x="50" y="46" font-family="Impact" font-size="34" fill="%232B2BFF" text-anchor="middle">POP</text><circle cx="50" cy="78" r="16" fill="%23FFFFFF" stroke="%23111" stroke-width="3"/></svg>',
    tokens: {
      colors: {
        bg: { label: '底色', default: '#FFE14D', options: ['#FFE14D', '#3A8BFF', '#FF3D7F', '#FF8A3A'] },
        pop: { label: '撞色', default: '#FF3D7F', options: ['#FF3D7F', '#FFE14D', '#2B2BFF', '#8B5CFF'] },
        ink: { label: '字', default: '#2B2BFF', options: ['#2B2BFF', '#1A1A1A', '#FF2E97', '#0E6B2E'] },
        bubble: { label: '气泡', default: '#FFFFFF', options: ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF'] },
        sub: { label: '副文', default: '#1A1A1A', options: ['#1A1A1A', '#111111', '#1A1A1A', '#111111'] }
      },
      fonts: { latin: { label: '大字', default: IMPACT, options: [IMPACT, SANS] }, cjk: { label: '中文', default: HEI, options: [HEI] } }
    },
    presets: [
      { name: '番茄黄', colors: { bg: '#FFE14D', pop: '#FF3D7F', ink: '#2B2BFF', bubble: '#FFFFFF', sub: '#1A1A1A' } },
      { name: '电光蓝', colors: { bg: '#3A8BFF', pop: '#FFE14D', ink: '#FFFFFF', bubble: '#FFFFFF', sub: '#10204A' } },
      { name: '品红青', colors: { bg: '#FF3D7F', pop: '#2B2BFF', ink: '#FFFFFF', bubble: '#FFFFFF', sub: '#2A0A1A' } },
      { name: '橙紫', colors: { bg: '#FF8A3A', pop: '#8B5CFF', ink: '#2B1A00', bubble: '#FFFFFF', sub: '#2A1400' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'hp-lower', type: 'shape', shapeKind: 'rect', x: 0, y: 820, width: 1080, height: 530, fill: { $t: 'colors.pop' }, zIndex: 1 },
      { id: 'hp-half', type: 'overlay', x: 0, y: 0, width: 1080, height: 820, background: `url("${halftone(1080, 820, 9, 34, '#000000')}")`, opacity: 0.18, mixBlendMode: 'multiply', zIndex: 2 },
      { id: 'hp-pop-echo', type: 'text', content: 'POP', fontFamily: { $t: 'fonts.latin' }, fontSize: 300, fontWeight: '900', color: { $t: 'colors.ink' }, letterSpacing: -4, x: 70, y: 250, width: 940, height: 340, zIndex: 3, opacity: 0.16 },
      { id: 'hp-pop', type: 'text', content: 'POP', fontFamily: { $t: 'fonts.latin' }, fontSize: 300, fontWeight: '900', color: { $t: 'colors.ink' }, letterSpacing: -4, x: 80, y: 240, width: 940, height: 340, zIndex: 4, animation: { name: 'bounce', duration: 1200 }, editable: { content: true } },
      { id: 'hp-bubble', type: 'image', src: makeSvg(`<path d='M60 0 H1020 Q1080 0 1080 60 V470 Q1080 530 1020 530 H610 L575 600 L545 530 H60 Q0 530 0 470 V60 Q0 0 60 0 Z' fill='#FFFFFF' stroke='#111111' stroke-width='8'/>`, 1080, 600), x: 90, y: 560, width: 620, height: 345, zIndex: 5 },
      { id: 'hp-title', type: 'text', content: '炸裂出圈', fontFamily: { $t: 'fonts.cjk' }, fontSize: 70, fontWeight: '900', color: { $t: 'colors.ink' }, letterSpacing: 6, textAlign: 'center', x: 150, y: 640, width: 500, height: 120, zIndex: 6, animation: { name: 'zoomIn', duration: 600, delay: 200 }, editable: { content: true } },
      { id: 'hp-stamp-bg', type: 'shape', shapeKind: 'circle', x: 820, y: 980, width: 190, height: 190, fill: { $t: 'colors.ink' }, rotation: -12, zIndex: 5 },
      { id: 'hp-stamp', type: 'text', content: 'NEW\nDROP', fontFamily: { $t: 'fonts.latin' }, fontSize: 46, fontWeight: '900', color: { $t: 'colors.bubble' }, letterSpacing: 2, textAlign: 'center', rotation: -12, x: 820, y: 1010, width: 190, height: 130, zIndex: 6, lineHeight: 1.05 },
      { id: 'hp-note', type: 'text', content: 'HY · POP ART', fontFamily: { $t: 'fonts.latin' }, fontSize: 28, color: { $t: 'colors.sub' }, letterSpacing: 4, x: 70, y: 1260, width: 600, height: 40, zIndex: 6 }
    ]
  }
]

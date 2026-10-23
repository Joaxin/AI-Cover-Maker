// src/core/templates/tech/hy-chrome-liquid.ts
// HY 署名批 → 科技风（tech） ｜ 液态铬金属字（1080×1080 方形）
import type { Template } from '@/types/types'
import { SANS, HEI, IMPACT, grain } from '../_fx/trend'

export const hyChromeLiquidTemplates: Template[] = [
  {
    id: 'hy-chrome-liquid', name: '液态铬 · 金属字', version: '1.0.0', category: 'tech',
    tags: ['hy', 'liquid chrome', 'metallic', 'tech', '1:1'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%230B0D10"/><text x="50" y="62" font-family="Impact" font-size="30" fill="%23E8ECF2" text-anchor="middle">CHROME</text><rect x="0" y="30" width="100" height="2" fill="%238fa8c8" opacity="0.4"/><rect x="0" y="74" width="100" height="2" fill="%238fa8c8" opacity="0.4"/></svg>',
    tokens: {
      colors: {
        bg: { label: '底', default: '#0B0D10', options: ['#0B0D10', '#0E0E12', '#0A0F16', '#100C0A'] },
        metal: { label: '金属', default: '#E8ECF2', options: ['#E8ECF2', '#F3D9D0', '#C9D6E8', '#D9C7A0'] },
        beam: { label: '高光', default: '#8FA8C8', options: ['#8FA8C8', '#E7B7A8', '#8FB8E8', '#B8A06A'] },
        glow: { label: '外发光', default: 'rgba(143,168,200,0.5)', options: ['rgba(143,168,200,0.5)', 'rgba(231,183,168,0.5)', 'rgba(143,184,232,0.5)', 'rgba(184,160,106,0.5)'] },
        sub: { label: '副文', default: 'rgba(232,236,242,0.7)', options: ['rgba(232,236,242,0.7)', 'rgba(243,217,208,0.7)', 'rgba(201,214,232,0.7)', 'rgba(217,199,160,0.7)'] }
      },
      fonts: { latin: { label: '大字', default: IMPACT, options: [IMPACT, SANS] }, cjk: { label: '中文', default: HEI, options: [HEI] } }
    },
    presets: [
      { name: '镜面银', colors: { bg: '#0B0D10', metal: '#E8ECF2', beam: '#8FA8C8', glow: 'rgba(143,168,200,0.5)', sub: 'rgba(232,236,242,0.7)' } },
      { name: '玫瑰金', colors: { bg: '#0E0E12', metal: '#F3D9D0', beam: '#E7B7A8', glow: 'rgba(231,183,168,0.5)', sub: 'rgba(243,217,208,0.7)' } },
      { name: '钛蓝', colors: { bg: '#0A0F16', metal: '#C9D6E8', beam: '#8FB8E8', glow: 'rgba(143,184,232,0.5)', sub: 'rgba(201,214,232,0.7)' } },
      { name: '暗夜青铜', colors: { bg: '#100C0A', metal: '#D9C7A0', beam: '#B8A06A', glow: 'rgba(184,160,106,0.5)', sub: 'rgba(217,199,160,0.7)' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1080, defaultWidth: 1080, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'cl-bar1', type: 'shape', shapeKind: 'rect', x: -20, y: 300, width: 1120, height: 3, fill: { $t: 'colors.beam' }, opacity: 0.28, zIndex: 2, animation: { name: 'drift', duration: 9000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'cl-bar2', type: 'shape', shapeKind: 'rect', x: -20, y: 640, width: 1120, height: 2, fill: { $t: 'colors.beam' }, opacity: 0.2, zIndex: 2, animation: { name: 'drift', duration: 11000, iterationCount: 'infinite', easing: 'ease-in-out', delay: 600 } },
      { id: 'cl-tag', type: 'text', content: 'LIQUID CHROME / 2026', fontFamily: { $t: 'fonts.latin' }, fontSize: 22, fontWeight: '700', color: { $t: 'colors.beam' }, letterSpacing: 5, x: 60, y: 70, width: 700, height: 36, zIndex: 5 },
      { id: 'cl-title', type: 'text', content: 'CHROME', fontFamily: { $t: 'fonts.latin' }, fontSize: 200, fontWeight: '900', color: { $t: 'colors.metal' }, letterSpacing: -2, x: 60, y: 330, width: 960, height: 250, zIndex: 5, shadow: { offsetX: 0, offsetY: 0, blur: 60, color: { $t: 'colors.glow' } }, animation: { name: 'shimmer', duration: 4000, iterationCount: 'infinite' }, editable: { content: true } },
      { id: 'cl-echo', type: 'text', content: 'CHROME', fontFamily: { $t: 'fonts.latin' }, fontSize: 150, fontWeight: '900', color: { $t: 'colors.metal' }, letterSpacing: -2, opacity: 0.16, x: 60, y: 560, width: 960, height: 200, zIndex: 4 },
      { id: 'cl-cn', type: 'text', content: '液态铬 · 金属字体', fontFamily: { $t: 'fonts.cjk' }, fontSize: 30, fontWeight: '700', color: { $t: 'colors.sub' }, letterSpacing: 4, x: 60, y: 800, width: 600, height: 44, zIndex: 5, animation: { name: 'fadeIn', duration: 700, delay: 300 }, editable: { content: true } },
      { id: 'cl-note', type: 'text', content: 'HY · 出图质感', fontFamily: { $t: 'fonts.latin' }, fontSize: 24, color: { $t: 'colors.beam' }, letterSpacing: 3, textAlign: 'right', x: 680, y: 980, width: 340, height: 36, zIndex: 5 },
      { id: 'cl-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1080, background: `url("${grain(280, 9, 0.6)}")`, opacity: 0.05, mixBlendMode: 'overlay', zIndex: 9 }
    ]
  }
]

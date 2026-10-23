// src/core/templates/cute/hy-soft-clay.ts
// HY 署名批 → 可爱风（cute） ｜ 柔和黏土 3D 几何体（1080×1080 方形）
import type { Template } from '@/types/types'
import { HEI, SANS, grain } from '../_fx/trend'

export const hySoftClayTemplates: Template[] = [
  {
    id: 'hy-soft-clay', name: '柔和黏土 · 小确幸', version: '1.0.0', category: 'cute',
    tags: ['hy', 'soft clay', '3D', 'cute', 'pastel', '1:1'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23FCEFE8"/><rect x="20" y="22" width="34" height="34" rx="14" fill="%23FFB3C1"/><circle cx="70" cy="40" r="18" fill="%23A0E0D8"/><rect x="44" y="54" width="30" height="30" rx="13" fill="%23FFD98A"/><text x="50" y="92" font-size="13" font-family="sans-serif" fill="%235a4636" text-anchor="middle">黏土感</text></svg>',
    tokens: {
      colors: {
        bg: { label: '底', default: '#FCEFE8', options: ['#FCEFE8', '#EAF3F0', '#F1ECFB', '#FBF6DC'] },
        clayA: { label: '黏土A', default: '#FFB3C1', options: ['#FFB3C1', '#FFC9B0', '#A8C8FF', '#C9B6F0'] },
        clayB: { label: '黏土B', default: '#A0E0D8', options: ['#A0E0D8', '#BFE3B0', '#C0B0F0', '#FFD98A'] },
        clayC: { label: '黏土C', default: '#FFD98A', options: ['#FFD98A', '#FFF0A8', '#A0E0D8', '#FFB3C1'] },
        ink: { label: '标题', default: '#5A4636', options: ['#5A4636', '#3C5A4A', '#4A3C5A', '#6B5320'] },
        sub: { label: '副文', default: 'rgba(90,70,54,0.66)', options: ['rgba(90,70,54,0.66)', 'rgba(60,90,74,0.66)', 'rgba(74,60,90,0.66)', 'rgba(107,83,32,0.66)'] },
        tag: { label: '标签', default: '#FF7AA0', options: ['#FF7AA0', '#FF8C5A', '#5B9CFF', '#9B7AD8'] }
      },
      fonts: { cjk: { label: '中文', default: HEI, options: [HEI] }, latin: { label: '拉丁', default: SANS, options: [SANS] } }
    },
    presets: [
      { name: '奶油蜜桃', colors: { bg: '#FCEFE8', clayA: '#FFB3C1', clayB: '#A0E0D8', clayC: '#FFD98A', ink: '#5A4636', sub: 'rgba(90,70,54,0.66)', tag: '#FF7AA0' } },
      { name: '薄荷奶蓝', colors: { bg: '#EAF3F0', clayA: '#A8C8FF', clayB: '#BFE3B0', clayC: '#A0E0D8', ink: '#3C5A4A', sub: 'rgba(60,90,74,0.66)', tag: '#5B9CFF' } },
      { name: '芋泥紫', colors: { bg: '#F1ECFB', clayA: '#C9B6F0', clayB: '#C0B0F0', clayC: '#FFB3C1', ink: '#4A3C5A', sub: 'rgba(74,60,90,0.66)', tag: '#9B7AD8' } },
      { name: '柠檬芝士', colors: { bg: '#FBF6DC', clayA: '#FFC9B0', clayB: '#FFD98A', clayC: '#BFE3B0', ink: '#6B5320', sub: 'rgba(107,83,32,0.66)', tag: '#FF8C5A' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1080, defaultWidth: 1080, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'sc-b1', group: 'sc-b', type: 'shape', shapeKind: 'circle', x: 110, y: 150, width: 330, height: 330, fill: { $t: 'colors.clayA' }, zIndex: 2, shadow: { offsetX: 0, offsetY: 42, blur: 60, color: 'rgba(0,0,0,0.18)' }, animation: { name: 'float', duration: 6000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'sc-b2', group: 'sc-b', type: 'shape', shapeKind: 'circle', x: 630, y: 120, width: 260, height: 260, fill: { $t: 'colors.clayB' }, rotation: 12, zIndex: 2, shadow: { offsetX: 0, offsetY: 38, blur: 54, color: 'rgba(0,0,0,0.18)' }, animation: { name: 'float', duration: 7200, iterationCount: 'infinite', easing: 'ease-in-out', delay: 400 } },
      { id: 'sc-b3', group: 'sc-b', type: 'shape', shapeKind: 'rect', x: 430, y: 390, width: 300, height: 300, borderRadius: 120, fill: { $t: 'colors.clayC' }, rotation: -8, zIndex: 2, shadow: { offsetX: 0, offsetY: 44, blur: 58, color: 'rgba(0,0,0,0.18)' }, opacity: 0.94, animation: { name: 'float', duration: 6800, iterationCount: 'infinite', easing: 'ease-in-out', delay: 800 } },
      { id: 'sc-tagbg', type: 'shape', shapeKind: 'rect', x: 90, y: 560, width: 150, height: 66, borderRadius: 33, fill: { $t: 'colors.tag' }, zIndex: 4 },
      { id: 'sc-tag', type: 'text', content: 'NEW', fontFamily: { $t: 'fonts.latin' }, fontSize: 30, fontWeight: '900', color: '#FFFFFF', textAlign: 'center', x: 90, y: 560, width: 150, height: 66, zIndex: 5, letterSpacing: 2 },
      { id: 'sc-title', type: 'text', content: '柔和黏土', fontFamily: { $t: 'fonts.cjk' }, fontSize: 112, fontWeight: '900', color: { $t: 'colors.ink' }, letterSpacing: 4, x: 110, y: 680, width: 860, height: 130, zIndex: 5, animation: { name: 'fadeInUp', duration: 650 }, editable: { content: true } },
      { id: 'sc-sub', type: 'text', content: '像捏出来的 3D 小确幸', fontFamily: { $t: 'fonts.cjk' }, fontSize: 36, fontWeight: '500', color: { $t: 'colors.sub' }, letterSpacing: 2, x: 112, y: 826, width: 860, height: 56, zIndex: 5, animation: { name: 'fadeIn', duration: 700, delay: 220 }, editable: { content: true } },
      { id: 'sc-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1080, background: `url("${grain(280, 4, 0.5)}")`, opacity: 0.04, mixBlendMode: 'overlay', zIndex: 9 }
    ]
  }
]

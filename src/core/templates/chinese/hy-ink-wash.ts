// src/core/templates/chinese/hy-ink-wash.ts
// HY 系列 · 水墨留痕（4:5 竖版）｜ 对标现代新中式：宣纸底 + 墨圆 + 书法笔触 + 朱印
import type { Template } from '@/types/types'
import {SONG, HEI, SERIF, SANS, MONO, grainSoft} from '../_fx/trend'

export const hyInkWashTemplates: Template[] = [
  {
    id: 'hy-ink-wash', name: '水墨留痕', version: '1.0.0', category: 'chinese',
    tags: ['hy', 'chinese', 'ink', 'calligraphy', 'seal', '4:5', 'oriental'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="125" viewBox="0 0 100 125"><rect width="100" height="125" fill="%23EFE7DA"/><circle cx="50" cy="48" r="30" fill="none" stroke="%23242421" stroke-width="3" opacity="0.8"/><rect x="24" y="86" width="52" height="4" fill="%23242421" opacity="0.85"/><rect x="34" y="96" width="40" height="2.5" fill="%23242421" opacity="0.5"/><rect x="70" y="72" width="16" height="16" fill="%23B4463A"/></svg>',
    tokens: {
      colors: {
        bg: { label: '宣纸', default: '#EFE7DA', options: ['#EFE7DA', '#F2ECE1', '#E7E1D3', '#18181A'] },
        ink: { label: '墨色', default: '#242421', options: ['#242421', '#1A1A18', '#332F2A', '#EFE7DA'] },
        wash: { label: '淡墨', default: '#8A8478', options: ['#8A8478', '#9C968A', '#756F64', '#C9C3B6'] },
        seal: { label: '朱印', default: '#B4463A', options: ['#B4463A', '#A63A2E', '#C25E4A', '#8C5A3C'] },
        accent: { label: '点缀', default: '#6B7762', options: ['#6B7762', '#5A6B5D', '#7D8A72', '#8C7B5A'] }
      },
      fonts: {
        brush: { label: '书法标题', default: SONG, options: [SONG, SERIF, HEI] },
        cjk: { label: '中文', default: SONG, options: [SONG, HEI, SANS] },
        mono: { label: '等宽标注', default: MONO, options: [MONO, SANS, SERIF] }
      }
    },
    presets: [
      { name: '宣纸素墨', colors: { bg: '#EFE7DA', ink: '#242421', wash: '#8A8478', seal: '#B4463A', accent: '#6B7762' } },
      { name: '陈年老宣', colors: { bg: '#F2ECE1', ink: '#1A1A18', wash: '#9C968A', seal: '#A63A2E', accent: '#5A6B5D' } },
      { name: '烟灰麻纸', colors: { bg: '#E7E1D3', ink: '#332F2A', wash: '#756F64', seal: '#C25E4A', accent: '#7D8A72' } },
      { name: '夜版反相', colors: { bg: '#18181A', ink: '#EFE7DA', wash: '#C9C3B6', seal: '#8C5A3C', accent: '#8C7B5A' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      // 淡墨晕染（大圆，极低透明度）
      { id: 'iw-wash1', type: 'shape', shapeKind: 'circle', x: 180, y: 260, width: 620, height: 620, fill: { $t: 'colors.wash' }, opacity: 0.13, zIndex: 1, animation: { name: 'float', duration: 12000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'iw-wash2', type: 'shape', shapeKind: 'circle', x: 460, y: 620, width: 480, height: 480, fill: { $t: 'colors.accent' }, opacity: 0.1, zIndex: 1, animation: { name: 'drift', duration: 15000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      // 墨圆（一笔圆相，描边为主）
      { id: 'iw-enso', type: 'shape', shapeKind: 'circle', x: 220, y: 380, width: 540, height: 540, fill: 'transparent', border: { width: 26, color: { $t: 'colors.ink' } }, opacity: 0.82, zIndex: 3, animation: { name: 'spinSlow', duration: 34000, iterationCount: 'infinite', easing: 'linear' } },
      { id: 'iw-enso2', type: 'shape', shapeKind: 'circle', x: 268, y: 428, width: 444, height: 444, fill: 'transparent', border: { width: 6, color: { $t: 'colors.ink' } }, opacity: 0.24, zIndex: 3 },
      // 书法笔触（旋转的圆角矩形，粗细渐变由多层叠出）
      { id: 'iw-brush1', group: 'iw-brush', type: 'shape', shapeKind: 'rect', x: 130, y: 980, width: 460, height: 34, rotation: -6, borderRadius: 17, fill: { $t: 'colors.ink' }, opacity: 0.9, zIndex: 4 },
      { id: 'iw-brush2', group: 'iw-brush', type: 'shape', shapeKind: 'rect', x: 130, y: 1030, width: 340, height: 18, rotation: -6, borderRadius: 9, fill: { $t: 'colors.ink' }, opacity: 0.45, zIndex: 4 },
      { id: 'iw-brush3', group: 'iw-brush', type: 'shape', shapeKind: 'rect', x: 660, y: 300, width: 300, height: 22, rotation: 74, borderRadius: 11, fill: { $t: 'colors.ink' }, opacity: 0.35, zIndex: 4 },
      { id: 'iw-brush4', group: 'iw-brush', type: 'shape', shapeKind: 'rect', x: 700, y: 300, width: 300, height: 14, rotation: 74, borderRadius: 7, fill: { $t: 'colors.ink' }, opacity: 0.22, zIndex: 4 },
      // 竖向细线（卷轴感）
      { id: 'iw-vl1', type: 'shape', shapeKind: 'line', x: 120, y: 180, width: 1, height: 990, fill: { $t: 'colors.ink' }, opacity: 0.12, zIndex: 2 },
      { id: 'iw-vl2', type: 'shape', shapeKind: 'line', x: 960, y: 180, width: 1, height: 990, fill: { $t: 'colors.ink' }, opacity: 0.12, zIndex: 2 },
      // 朱印（方章 + 内框留白）
      { id: 'iw-seal', type: 'shape', shapeKind: 'rect', x: 800, y: 980, width: 130, height: 130, borderRadius: 8, fill: { $t: 'colors.seal' }, opacity: 0.92, zIndex: 6, animation: { name: 'pulse', duration: 7600, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'iw-seal-in', type: 'shape', shapeKind: 'rect', x: 826, y: 1006, width: 78, height: 78, fill: 'transparent', border: { width: 3, color: { $t: 'colors.bg' } }, opacity: 0.9, zIndex: 7 },
      // 顶部标注
      { id: 'iw-hy', type: 'text', content: 'HY', fontFamily: { $t: 'fonts.mono' }, fontSize: 22, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.5, letterSpacing: 4, x: 150, y: 130, width: 220, height: 32, zIndex: 10 },
      { id: 'iw-kicker', type: 'text', content: 'INK  /  一 卷', fontFamily: { $t: 'fonts.mono' }, fontSize: 20, color: { $t: 'colors.ink' }, opacity: 0.5, letterSpacing: 4, textAlign: 'right', x: 700, y: 130, width: 290, height: 32, zIndex: 10, animation: { name: 'fadeIn', duration: 800 } },
      // 主标题（书法中文，居中压在墨圆上）
      { id: 'iw-title', type: 'text', content: '墨里山河', fontFamily: { $t: 'fonts.brush' }, fontSize: 118, fontWeight: '500', color: { $t: 'colors.ink' }, letterSpacing: 16, textAlign: 'center', x: 150, y: 560, width: 780, height: 170, zIndex: 10, animation: { name: 'inkReveal', duration: 1400, easing: 'ease-out' }, editable: { content: true, fontSize: { type: 'range', min: 92, max: 136 } } },
      { id: 'iw-en', type: 'text', content: 'Ink in the\nMountains', fontFamily: { $t: 'fonts.mono' }, fontSize: 34, color: { $t: 'colors.ink' }, opacity: 0.6, lineHeight: 1.4, letterSpacing: 2, textAlign: 'center', x: 200, y: 750, width: 680, height: 110, zIndex: 10, animation: { name: 'rise', duration: 1200, delay: 240 }, editable: { content: true } },
      // 底部小注
      { id: 'iw-note', type: 'text', content: '留白是无声的水声，墨落才有山。', fontFamily: { $t: 'fonts.cjk' }, fontSize: 26, color: { $t: 'colors.ink' }, opacity: 0.6, textAlign: 'center', x: 200, y: 1160, width: 680, height: 42, zIndex: 10, animation: { name: 'fadeIn', duration: 1000, delay: 380 }, editable: { content: true } },
      { id: 'iw-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1350, background: `url("${grainSoft(340, 43, 0.55)}")`, opacity: 0.06, mixBlendMode: 'multiply', zIndex: 12 }
    ]
  }
]

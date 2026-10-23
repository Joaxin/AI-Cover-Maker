// src/core/templates/sport/hy-sport-pulse.ts
// HY 系列 · 动能海报（4:5 竖版）｜ 对标运动品牌主视觉：斜切块面 + 速度线 + 超大字重
import type { Template } from '@/types/types'
import {SANS, HEI, IMPACT, MONO, grainSoft} from '../_fx/trend'

export const hySportPulseTemplates: Template[] = [
  {
    id: 'hy-sport-pulse', name: '动能海报', version: '1.0.0', category: 'sport',
    tags: ['hy', 'sport', 'dynamic', 'diagonal', 'impact', '4:5', 'poster'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="125" viewBox="0 0 100 125"><rect width="100" height="125" fill="%23101010"/><polygon points="0,40 100,10 100,42 0,72" fill="%23E63946"/><polygon points="0,88 100,58 100,66 0,96" fill="%23F4A261" opacity="0.9"/><rect x="12" y="100" width="52" height="9" fill="%23FFFFFF"/><rect x="12" y="114" width="30" height="5" fill="%23FFFFFF" opacity="0.6"/><rect x="70" y="100" width="20" height="20" fill="%23E63946"/></svg>',
    tokens: {
      colors: {
        bg: { label: '底黑', default: '#101010', options: ['#101010', '#0B1220', '#1A1A1A', '#F5F5F5'] },
        ink: { label: '文字', default: '#FFFFFF', options: ['#FFFFFF', '#F1FAEE', '#EAEAEA', '#101010'] },
        burst: { label: '爆发色', default: '#E63946', options: ['#E63946', '#FF5A1F', '#D90429', '#2A9D8F'] },
        flare: { label: '副焰色', default: '#F4A261', options: ['#F4A261', '#FFD166', '#FF7B54', '#48CAE4'] },
        muted: { label: '低注目', default: '#6E6E6E', options: ['#6E6E6E', '#5A5A5A', '#8A8A8A', '#B0B0B0'] }
      },
      fonts: {
        display: { label: '英文标题', default: IMPACT, options: [IMPACT, SANS, MONO] },
        cjk: { label: '中文', default: HEI, options: [HEI, SANS, MONO] },
        mono: { label: '等宽标注', default: MONO, options: [MONO, SANS, IMPACT] }
      }
    },
    presets: [
      { name: '烈焰破风', colors: { bg: '#101010', ink: '#FFFFFF', burst: '#E63946', flare: '#F4A261', muted: '#6E6E6E' } },
      { name: '午夜竞速', colors: { bg: '#0B1220', ink: '#F1FAEE', burst: '#FF5A1F', flare: '#FFD166', muted: '#5A5A5A' } },
      { name: '极地训练', colors: { bg: '#1A1A1A', ink: '#EAEAEA', burst: '#D90429', flare: '#FF7B54', muted: '#8A8A8A' } },
      { name: '白昼球场', colors: { bg: '#F5F5F5', ink: '#101010', burst: '#2A9D8F', flare: '#48CAE4', muted: '#B0B0B0' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      // 大斜切块面（制造速度感）
      { id: 'sp-band1', group: 'sp-band', type: 'shape', shapeKind: 'rect', x: -180, y: 250, width: 1420, height: 150, rotation: -18, fill: { $t: 'colors.burst' }, zIndex: 2, animation: { name: 'slideInLeft', duration: 900, easing: 'ease-out' } },
      { id: 'sp-band2', group: 'sp-band', type: 'shape', shapeKind: 'rect', x: -180, y: 430, width: 1420, height: 70, rotation: -18, fill: { $t: 'colors.flare' }, opacity: 0.92, zIndex: 2, animation: { name: 'slideInLeft', duration: 900, delay: 120, easing: 'ease-out' } },
      { id: 'sp-band3', group: 'sp-band', type: 'shape', shapeKind: 'rect', x: -180, y: 980, width: 1420, height: 44, rotation: -18, fill: { $t: 'colors.burst' }, opacity: 0.55, zIndex: 2 },
      // 速度线（右上到左下的细线组）
      { id: 'sp-l1', group: 'sp-l', type: 'shape', shapeKind: 'line', x: 620, y: 150, width: 400, height: 4, rotation: -18, fill: { $t: 'colors.ink' }, opacity: 0.5, zIndex: 3 },
      { id: 'sp-l2', group: 'sp-l', type: 'shape', shapeKind: 'line', x: 700, y: 200, width: 320, height: 3, rotation: -18, fill: { $t: 'colors.ink' }, opacity: 0.32, zIndex: 3 },
      { id: 'sp-l3', group: 'sp-l', type: 'shape', shapeKind: 'line', x: 660, y: 700, width: 380, height: 4, rotation: -18, fill: { $t: 'colors.ink' }, opacity: 0.4, zIndex: 3 },
      { id: 'sp-l4', group: 'sp-l', type: 'shape', shapeKind: 'line', x: 740, y: 750, width: 280, height: 3, rotation: -18, fill: { $t: 'colors.ink' }, opacity: 0.24, zIndex: 3 },
      { id: 'sp-l5', group: 'sp-l', type: 'shape', shapeKind: 'line', x: 90, y: 900, width: 360, height: 3, rotation: -18, fill: { $t: 'colors.ink' }, opacity: 0.28, zIndex: 3 },
      // 巨型背景数字（id 带 ghost 豁免）
      { id: 'sp-bignum-ghost', type: 'text', content: '07', fontFamily: { $t: 'fonts.display' }, fontSize: 420, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.07, textAlign: 'right', x: 520, y: 520, width: 560, height: 460, zIndex: 3 },
      // 光斑（给黑底一点空气）
      { id: 'sp-glow', type: 'shape', shapeKind: 'circle', x: 640, y: 120, width: 500, height: 500, fill: { $t: 'colors.burst' }, opacity: 0.16, zIndex: 1, animation: { name: 'pulse', duration: 5200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      // 顶部标注
      { id: 'sp-hy', type: 'text', content: 'HY', fontFamily: { $t: 'fonts.mono' }, fontSize: 24, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.6, letterSpacing: 4, x: 90, y: 96, width: 220, height: 34, zIndex: 10 },
      { id: 'sp-kicker', type: 'text', content: 'TRAINING  /  SS26', fontFamily: { $t: 'fonts.mono' }, fontSize: 20, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.6, letterSpacing: 4, textAlign: 'right', x: 690, y: 96, width: 300, height: 32, zIndex: 10, animation: { name: 'fadeIn', duration: 600 } },
      // 主标题（超大字重，两行错位）
      { id: 'sp-t1', type: 'text', content: 'NO', fontFamily: { $t: 'fonts.display' }, fontSize: 168, fontWeight: '700', color: { $t: 'colors.ink' }, letterSpacing: 4, lineHeight: 1.0, x: 90, y: 610, width: 700, height: 180, zIndex: 10, animation: { name: 'fadeInUp', duration: 800 }, editable: { content: true, fontSize: { type: 'range', min: 150, max: 220 } } },
      { id: 'sp-t2', type: 'text', content: 'LIMITS', fontFamily: { $t: 'fonts.display' }, fontSize: 200, fontWeight: '700', color: { $t: 'colors.burst' }, letterSpacing: 4, lineHeight: 1.0, x: 90, y: 830, width: 990, height: 220, zIndex: 10, animation: { name: 'fadeInUp', duration: 800, delay: 120 }, editable: { content: true, fontSize: { type: 'range', min: 150, max: 205 } } },
      // 底部信息（统一左对齐 x=90）
      { id: 'sp-sub', type: 'text', content: '把每一次呼吸都跑成节拍。', fontFamily: { $t: 'fonts.cjk' }, fontSize: 36, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.92, x: 90, y: 1120, width: 700, height: 52, zIndex: 10, animation: { name: 'rise', duration: 900, delay: 260 }, editable: { content: true } },
      { id: 'sp-meta', type: 'text', content: '07 / PUSH HARDER', fontFamily: { $t: 'fonts.mono' }, fontSize: 20, color: { $t: 'colors.muted' }, letterSpacing: 3, x: 90, y: 1190, width: 700, height: 32, zIndex: 10 },
      { id: 'sp-rule', type: 'shape', shapeKind: 'line', x: 90, y: 1100, width: 900, height: 2, fill: { $t: 'colors.ink' }, opacity: 0.2, zIndex: 10 },
      { id: 'sp-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1350, background: `url("${grainSoft(300, 37, 0.5)}")`, opacity: 0.05, mixBlendMode: 'overlay', zIndex: 12 }
    ]
  }
]

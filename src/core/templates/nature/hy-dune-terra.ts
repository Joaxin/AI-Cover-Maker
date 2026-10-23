// src/core/templates/nature/hy-dune-terra.ts
// HY 系列 · 大地沙丘（4:5）｜ 对标 AI 生成图像的 earth tone organic landscape
import type { Template } from '@/types/types'
import {SANS, HEI, MONO, grainSoft, grain} from '../_fx/trend'

export const hyDuneTerraTemplates: Template[] = [
  {
    id: 'hy-dune-terra', name: '大地沙丘', version: '1.0.0', category: 'nature',
    tags: ['hy', 'dune', 'terra', 'earth tone', 'organic', '4:5'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="125" viewBox="0 0 100 125"><rect width="100" height="125" fill="%23EDE6DA"/><circle cx="74" cy="28" r="11" fill="%23E8B04B"/><path d="M0 78 Q30 60 60 76 T100 74 V125 H0 Z" fill="%23DCC7A0"/><path d="M0 92 Q34 76 66 90 T100 88 V125 H0 Z" fill="%23C9A87C"/><path d="M0 104 Q30 92 60 102 T100 100 V125 H0 Z" fill="%23A8845A"/></svg>',
    tokens: {
      colors: {
        bg: { label: '天', default: '#EDE6DA', options: ['#EDE6DA', '#E7EDEA', '#EDE9E2', '#F0E9DF'] },
        ink: { label: '字', default: '#3A2E1E', options: ['#3A2E1E', '#2E3A36', '#2E2A22', '#33302A'] },
        dune1: { label: '丘1', default: '#DCC7A0', options: ['#DCC7A0', '#C9D3C0', '#D8CDC2', '#E0CBAE'] },
        dune2: { label: '丘2', default: '#C9A87C', options: ['#C9A87C', '#A9C0A6', '#BCA892', '#CBA982'] },
        dune3: { label: '丘3', default: '#A8845A', options: ['#A8845A', '#7E9A86', '#9A8470', '#A8855C'] },
        accent: { label: '日', default: '#E8B04B', options: ['#E8B04B', '#E0922E', '#E0A24B', '#E8B86A'] }
      },
      fonts: {
        display: { label: '英文', default: SANS, options: [SANS, MONO] },
        cjk: { label: '中文', default: HEI, options: [HEI, SANS] },
        mono: { label: '等宽', default: MONO, options: [MONO, SANS] }
      }
    },
    presets: [
      { name: '沙金陶土', colors: { bg: '#EDE6DA', ink: '#3A2E1E', dune1: '#DCC7A0', dune2: '#C9A87C', dune3: '#A8845A', accent: '#E8B04B' } },
      { name: '苔绿矿物', colors: { bg: '#E7EDEA', ink: '#2E3A36', dune1: '#C9D3C0', dune2: '#A9C0A6', dune3: '#7E9A86', accent: '#E0922E' } },
      { name: '雾灰暖石', colors: { bg: '#EDE9E2', ink: '#2E2A22', dune1: '#D8CDC2', dune2: '#BCA892', dune3: '#9A8470', accent: '#E0A24B' } },
      { name: '杏奶黄昏', colors: { bg: '#F0E9DF', ink: '#33302A', dune1: '#E0CBAE', dune2: '#CBA982', dune3: '#A8855C', accent: '#E8B86A' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      // 太阳
      { id: 'dt-sun', type: 'shape', shapeKind: 'circle', x: 760, y: 220, width: 210, height: 210, fill: { $t: 'colors.accent' }, opacity: 0.9, zIndex: 2, shadow: { offsetX: 0, offsetY: 0, blur: 30, color: 'rgba(232,176,75,0.35)' }, animation: { name: 'glow', duration: 4000, iterationCount: 'infinite' } },
      // 层叠沙丘（超大椭圆只露弧线）
      { id: 'dt-d1', group: 'dt-d', type: 'shape', shapeKind: 'circle', x: -300, y: 740, width: 1700, height: 620, fill: { $t: 'colors.dune1' }, zIndex: 1, animation: { name: 'float', duration: 9000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'dt-d2', group: 'dt-d', type: 'shape', shapeKind: 'circle', x: -200, y: 860, width: 1600, height: 620, fill: { $t: 'colors.dune2' }, zIndex: 2, animation: { name: 'drift', duration: 10000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'dt-d3', group: 'dt-d', type: 'shape', shapeKind: 'circle', x: -100, y: 980, width: 1500, height: 640, fill: { $t: 'colors.dune3' }, zIndex: 3, animation: { name: 'float', duration: 8600, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'dt-fg', type: 'shape', shapeKind: 'circle', x: -50, y: 1100, width: 1400, height: 700, fill: { $t: 'colors.dune3' }, zIndex: 4 },
      // 文字（统一 x=90，落在天空区）
      { id: 'dt-title', type: 'text', content: '沙丘之上', fontFamily: { $t: 'fonts.cjk' }, fontSize: 110, fontWeight: '800', color: { $t: 'colors.ink' }, x: 90, y: 300, width: 900, height: 140, zIndex: 6, animation: { name: 'fadeInUp', duration: 880 }, editable: { content: true, fontSize: { type: 'range', min: 84, max: 124 } } },
      { id: 'dt-sub', type: 'text', content: '风把时间，磨成温柔的曲线。', fontFamily: { $t: 'fonts.cjk' }, fontSize: 32, color: { $t: 'colors.ink' }, opacity: 0.82, x: 90, y: 460, width: 900, height: 80, zIndex: 6, animation: { name: 'rise', duration: 800, delay: 160 }, editable: { content: true } },
      { id: 'dt-i1', type: 'text', content: 'ALT 1,240 M', fontFamily: { $t: 'fonts.mono' }, fontSize: 24, fontWeight: '600', color: { $t: 'colors.ink' }, opacity: 0.8, letterSpacing: 2, x: 90, y: 1180, width: 400, height: 34, zIndex: 6, animation: { name: 'fadeIn', duration: 700, delay: 240 }, editable: { content: true } },
      { id: 'dt-i2', type: 'text', content: 'DUSK', fontFamily: { $t: 'fonts.mono' }, fontSize: 24, fontWeight: '600', color: { $t: 'colors.ink' }, opacity: 0.8, letterSpacing: 4, textAlign: 'right', x: 590, y: 1180, width: 400, height: 34, zIndex: 6, animation: { name: 'fadeIn', duration: 700, delay: 300 }, editable: { content: true } },
      { id: 'dt-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1350, background: `url("${grainSoft(300, 11, 0.5)}")`, opacity: 0.05, mixBlendMode: 'multiply', zIndex: 9 }
    ]
  }
]

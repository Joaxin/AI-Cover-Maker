// src/core/templates/business/hy-foil-luxe.ts
// HY 系列 · 金属箔轻奢（4:5）｜ 对标 AI 生成图像的高端品牌主视觉
import type { Template } from '@/types/types'
import {SANS, HEI, MONO, SERIF, grainSoft, grain} from '../_fx/trend'

export const hyFoilLuxeTemplates: Template[] = [
  {
    id: 'hy-foil-luxe', name: '金属箔轻奢', version: '1.0.0', category: 'business',
    tags: ['hy', 'luxe', 'foil', 'gold', 'serif', '4:5', 'premium'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="125" viewBox="0 0 100 125"><rect width="100" height="125" fill="%230E1116"/><rect x="10" y="10" width="80" height="105" fill="none" stroke="%23C9A24B" stroke-width="1" opacity="0.7"/><rect x="16" y="16" width="68" height="93" fill="none" stroke="%23C9A24B" stroke-width="0.6" opacity="0.5"/><rect x="40" y="40" width="20" height="2" fill="%23C9A24B"/><text x="50" y="72" font-family="Georgia,serif" font-size="22" fill="%23F3ECDD" text-anchor="middle">静</text><rect x="30" y="86" width="40" height="1" fill="%239A958A"/></svg>',
    tokens: {
      colors: {
        bg: { label: '底色', default: '#0E1116', options: ['#0E1116', '#10141B', '#1A1410', '#0B1410'] },
        ink: { label: '文字', default: '#F3ECDD', options: ['#F3ECDD', '#EDE3D2', '#F0E8DA', '#E9E2D2'] },
        fog: { label: '灰字', default: '#9A958A', options: ['#9A958A', '#8C97A0', '#A89A86', '#8FA89A'] },
        foil: { label: '箔金', default: '#C9A24B', options: ['#C9A24B', '#D9B65C', '#B8902F', '#E0C06A'] },
        line: { label: '描边', default: '#B8902F', options: ['#B8902F', '#C9A24B', '#A87E2A', '#D9B65C'] }
      },
      fonts: {
        display: { label: '无衬线', default: SANS, options: [SANS, MONO] },
        serif: { label: '衬线', default: SERIF, options: [SERIF, HEI] },
        cjk: { label: '中文', default: HEI, options: [HEI, SERIF] },
        mono: { label: '等宽', default: MONO, options: [MONO, SANS] }
      }
    },
    presets: [
      { name: '暗夜金', colors: { bg: '#0E1116', ink: '#F3ECDD', fog: '#9A958A', foil: '#C9A24B', line: '#B8902F' } },
      { name: '墨蓝金', colors: { bg: '#10141B', ink: '#EDE3D2', fog: '#8C97A0', foil: '#D9B65C', line: '#C9A24B' } },
      { name: '焦糖棕', colors: { bg: '#1A1410', ink: '#F0E8DA', fog: '#A89A86', foil: '#B8902F', line: '#A87E2A' } },
      { name: '松墨绿', colors: { bg: '#0B1410', ink: '#E9E2D2', fog: '#8FA89A', foil: '#E0C06A', line: '#D9B65C' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      // 极淡暖光雾
      { id: 'fl-glow', type: 'shape', shapeKind: 'circle', x: 340, y: 240, width: 720, height: 720, fill: { $t: 'colors.foil' }, opacity: 0.08, zIndex: 1, animation: { name: 'float', duration: 9000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      // 双层金属描边框
      { id: 'fl-frame-o', type: 'shape', shapeKind: 'rect', x: 72, y: 72, width: 936, height: 1206, fill: 'transparent', border: { width: 1, color: { $t: 'colors.line' } }, opacity: 0.5, zIndex: 3 },
      { id: 'fl-frame-i', type: 'shape', shapeKind: 'rect', x: 96, y: 96, width: 888, height: 1158, fill: 'transparent', border: { width: 1, color: { $t: 'colors.line' } }, opacity: 0.3, zIndex: 3 },
      // 四角短转角线
      { id: 'fl-c-tl-h', type: 'shape', shapeKind: 'line', x: 72, y: 72, width: 120, height: 2, fill: { $t: 'colors.foil' }, opacity: 0.7, zIndex: 4 },
      { id: 'fl-c-tl-v', type: 'shape', shapeKind: 'line', x: 72, y: 72, width: 2, height: 120, fill: { $t: 'colors.foil' }, opacity: 0.7, zIndex: 4 },
      { id: 'fl-c-tr-h', type: 'shape', shapeKind: 'line', x: 888, y: 72, width: 120, height: 2, fill: { $t: 'colors.foil' }, opacity: 0.7, zIndex: 4 },
      { id: 'fl-c-tr-v', type: 'shape', shapeKind: 'line', x: 1006, y: 72, width: 2, height: 120, fill: { $t: 'colors.foil' }, opacity: 0.7, zIndex: 4 },
      { id: 'fl-c-bl-h', type: 'shape', shapeKind: 'line', x: 72, y: 1258, width: 120, height: 2, fill: { $t: 'colors.foil' }, opacity: 0.7, zIndex: 4 },
      { id: 'fl-c-bl-v', type: 'shape', shapeKind: 'line', x: 72, y: 1238, width: 2, height: 120, fill: { $t: 'colors.foil' }, opacity: 0.7, zIndex: 4 },
      { id: 'fl-c-br-h', type: 'shape', shapeKind: 'line', x: 888, y: 1258, width: 120, height: 2, fill: { $t: 'colors.foil' }, opacity: 0.7, zIndex: 4 },
      { id: 'fl-c-br-v', type: 'shape', shapeKind: 'line', x: 1006, y: 1238, width: 2, height: 120, fill: { $t: 'colors.foil' }, opacity: 0.7, zIndex: 4 },
      // 居中文字（全部 textAlign:center，避免左对齐漂移）
      { id: 'fl-kicker', type: 'text', content: 'ANNUAL REVIEW · 2026', fontFamily: { $t: 'fonts.mono' }, fontSize: 26, fontWeight: '600', color: { $t: 'colors.foil' }, letterSpacing: 8, textAlign: 'center', x: 90, y: 170, width: 900, height: 36, zIndex: 5, animation: { name: 'fadeIn', duration: 600 }, editable: { content: true } },
      { id: 'fl-title', type: 'text', content: '致静水流深', fontFamily: { $t: 'fonts.cjk' }, fontSize: 108, fontWeight: '500', color: { $t: 'colors.ink' }, textAlign: 'center', lineHeight: 1.1, x: 90, y: 520, width: 900, height: 150, zIndex: 6, animation: { name: 'fadeInUp', duration: 880, delay: 160 }, editable: { content: true, fontSize: { type: 'range', min: 84, max: 120 } } },
      { id: 'fl-gold', type: 'shape', shapeKind: 'rect', x: 490, y: 700, width: 100, height: 3, fill: { $t: 'colors.foil' }, zIndex: 5, animation: { name: 'shimmer', duration: 3000, iterationCount: 'infinite' } },
      { id: 'fl-sub', type: 'text', content: '在不确定性中，守住确定的价值。', fontFamily: { $t: 'fonts.cjk' }, fontSize: 30, color: { $t: 'colors.ink' }, opacity: 0.82, textAlign: 'center', x: 90, y: 740, width: 900, height: 44, zIndex: 6, animation: { name: 'rise', duration: 800, delay: 260 }, editable: { content: true } },
      // 底部三栏（各自居中）
      { id: 'fl-d1', type: 'shape', shapeKind: 'line', x: 370, y: 950, width: 2, height: 130, fill: { $t: 'colors.ink' }, opacity: 0.18, zIndex: 4 },
      { id: 'fl-d2', type: 'shape', shapeKind: 'line', x: 660, y: 950, width: 2, height: 130, fill: { $t: 'colors.ink' }, opacity: 0.18, zIndex: 4 },
      { id: 'fl-c1', type: 'text', content: '1.2x', fontFamily: { $t: 'fonts.display' }, fontSize: 60, fontWeight: '800', color: { $t: 'colors.foil' }, textAlign: 'center', x: 90, y: 940, width: 280, height: 80, zIndex: 6, animation: { name: 'fadeInUp', duration: 760, delay: 340 }, editable: { content: true } },
      { id: 'fl-c1l', type: 'text', content: '资产增长', fontFamily: { $t: 'fonts.cjk' }, fontSize: 24, color: { $t: 'colors.fog' }, textAlign: 'center', x: 90, y: 1020, width: 280, height: 34, zIndex: 6, animation: { name: 'fadeIn', duration: 700, delay: 400 }, editable: { content: true } },
      { id: 'fl-c2', type: 'text', content: '98%', fontFamily: { $t: 'fonts.display' }, fontSize: 60, fontWeight: '800', color: { $t: 'colors.foil' }, textAlign: 'center', x: 380, y: 940, width: 280, height: 80, zIndex: 6, animation: { name: 'fadeInUp', duration: 760, delay: 400 }, editable: { content: true } },
      { id: 'fl-c2l', type: 'text', content: '履约率', fontFamily: { $t: 'fonts.cjk' }, fontSize: 24, color: { $t: 'colors.fog' }, textAlign: 'center', x: 380, y: 1020, width: 280, height: 34, zIndex: 6, animation: { name: 'fadeIn', duration: 700, delay: 460 }, editable: { content: true } },
      { id: 'fl-c3', type: 'text', content: '24', fontFamily: { $t: 'fonts.display' }, fontSize: 60, fontWeight: '800', color: { $t: 'colors.foil' }, textAlign: 'center', x: 670, y: 940, width: 280, height: 80, zIndex: 6, animation: { name: 'fadeInUp', duration: 760, delay: 460 }, editable: { content: true } },
      { id: 'fl-c3l', type: 'text', content: '覆盖国家', fontFamily: { $t: 'fonts.cjk' }, fontSize: 24, color: { $t: 'colors.fog' }, textAlign: 'center', x: 670, y: 1020, width: 280, height: 34, zIndex: 6, animation: { name: 'fadeIn', duration: 700, delay: 520 }, editable: { content: true } },
      // 底栏
      { id: 'fl-rule', type: 'shape', shapeKind: 'line', x: 90, y: 1180, width: 900, height: 1, fill: { $t: 'colors.ink' }, opacity: 0.2, zIndex: 4 },
      { id: 'fl-org', type: 'text', content: 'HY CAPITAL · CONFIDENTIAL', fontFamily: { $t: 'fonts.mono' }, fontSize: 20, color: { $t: 'colors.fog' }, opacity: 0.7, letterSpacing: 3, textAlign: 'center', x: 90, y: 1220, width: 900, height: 30, zIndex: 5, animation: { name: 'fadeIn', duration: 700, delay: 560 }, editable: { content: true } },
      { id: 'fl-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1350, background: `url("${grainSoft(300, 11, 0.5)}")`, opacity: 0.04, mixBlendMode: 'multiply', zIndex: 9 }
    ]
  }
]

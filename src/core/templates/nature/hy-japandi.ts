// src/core/templates/nature/hy-japandi.ts
// HY 系列 · 侘寂侘风（4:5 竖版）｜ 对标 Japandi / Wabi-sabi 的静谧留白与矿物暖色
import type { Template } from '@/types/types'
import {SANS, SONG, SERIF, HEI, MONO, grainSoft} from '../_fx/trend'

export const hyJapandiTemplates: Template[] = [
  {
    id: 'hy-japandi', name: '侘寂静物', version: '1.0.0', category: 'nature',
    tags: ['hy', 'japandi', 'wabi sabi', 'minimal', 'warm', '4:5', 'zen'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="125" viewBox="0 0 100 125"><rect width="100" height="125" fill="%23F2EDE4"/><circle cx="50" cy="52" r="30" fill="%23DCD2C4"/><circle cx="50" cy="52" r="30" fill="none" stroke="%23B8AC9B" stroke-width="1"/><rect x="0" y="88" width="100" height="1" fill="%23B8AC9B"/><rect x="40" y="100" width="20" height="20" fill="%23B4463A"/><rect x="14" y="18" width="26" height="2" fill="%234A443C"/></svg>',
    tokens: {
      colors: {
        bg: { label: '纸色', default: '#F2EDE4', options: ['#F2EDE4', '#F7F4EE', '#EDE7DC', '#2A2724'] },
        ink: { label: '墨色', default: '#4A443C', options: ['#4A443C', '#3A3630', '#2E2A26', '#EDE7DC'] },
        muted: { label: '淡影', default: '#B8AC9B', options: ['#B8AC9B', '#C4BAA9', '#A69A88', '#7A7168'] },
        orb: { label: '月轮', default: '#DCD2C4', options: ['#DCD2C4', '#E3DCD0', '#D3C7B6', '#3F3A34'] },
        seal: { label: '朱印', default: '#B4463A', options: ['#B4463A', '#A63A2E', '#C25E4A', '#8C5A3C'] }
      },
      fonts: {
        display: { label: '英文', default: SERIF, options: [SERIF, SANS, MONO] },
        cjk: { label: '中文', default: SONG, options: [SONG, HEI, SANS] },
        mono: { label: '等宽', default: MONO, options: [MONO, SANS, SERIF] }
      }
    },
    presets: [
      { name: '宣纸月轮', colors: { bg: '#F2EDE4', ink: '#4A443C', muted: '#B8AC9B', orb: '#DCD2C4', seal: '#B4463A' } },
      { name: '亚麻晨雾', colors: { bg: '#F7F4EE', ink: '#3A3630', muted: '#C4BAA9', orb: '#E3DCD0', seal: '#A63A2E' } },
      { name: '粗陶茶室', colors: { bg: '#EDE7DC', ink: '#2E2A26', muted: '#A69A88', orb: '#D3C7B6', seal: '#C25E4A' } },
      { name: '夜色枯山', colors: { bg: '#2A2724', ink: '#EDE7DC', muted: '#7A7168', orb: '#3F3A34', seal: '#8C5A3C' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      // 顶部极短线（一点点仪式感）
      { id: 'jp-rule1', type: 'shape', shapeKind: 'line', x: 90, y: 150, width: 180, height: 2, fill: { $t: 'colors.muted' }, opacity: 0.8, zIndex: 2 },
      // 巨大月轮（半露 + 极柔阴影）
      { id: 'jp-orb', type: 'shape', shapeKind: 'circle', x: 190, y: 300, width: 700, height: 700, fill: { $t: 'colors.orb' }, opacity: 0.85, shadow: { offsetX: 0, offsetY: 20, blur: 60, color: '#000000'}, zIndex: 1, animation: { name: 'float', duration: 11000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      // 月轮细描边
      { id: 'jp-orbring', type: 'shape', shapeKind: 'circle', x: 190, y: 300, width: 700, height: 700, fill: 'transparent', border: { width: 1, color: { $t: 'colors.muted' } }, opacity: 0.55, zIndex: 2, animation: { name: 'float', duration: 11000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      // 地平线（一条压住画面的横线）
      { id: 'jp-horizon', type: 'shape', shapeKind: 'line', x: 0, y: 880, width: 1080, height: 1, fill: { $t: 'colors.muted' }, opacity: 0.7, zIndex: 3 },
      // 几缕竖向的淡影（像纸的肌理 / 竹影）
      { id: 'jp-v1', group: 'jp-v', type: 'shape', shapeKind: 'line', x: 205, y: 880, width: 2, height: 300, fill: { $t: 'colors.muted' }, opacity: 0.18, zIndex: 3 },
      { id: 'jp-v2', group: 'jp-v', type: 'shape', shapeKind: 'line', x: 355, y: 880, width: 2, height: 220, fill: { $t: 'colors.muted' }, opacity: 0.14, zIndex: 3 },
      { id: 'jp-v3', group: 'jp-v', type: 'shape', shapeKind: 'line', x: 725, y: 880, width: 2, height: 260, fill: { $t: 'colors.muted' }, opacity: 0.16, zIndex: 3 },
      { id: 'jp-v4', group: 'jp-v', type: 'shape', shapeKind: 'line', x: 875, y: 880, width: 2, height: 190, fill: { $t: 'colors.muted' }, opacity: 0.12, zIndex: 3 },
      // 一枚小石 / 一个极简圆点
      { id: 'jp-stone', type: 'shape', shapeKind: 'circle', x: 480, y: 850, width: 120, height: 120, fill: { $t: 'colors.ink' }, opacity: 0.14, zIndex: 3 },
      // 朱印（小方块 + 内部留白）
      { id: 'jp-seal', type: 'shape', shapeKind: 'rect', x: 480, y: 1090, width: 76, height: 76, borderRadius: 6, fill: { $t: 'colors.seal' }, opacity: 0.9, zIndex: 8, animation: { name: 'pulse', duration: 8200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      // 左上 HY 标记
      { id: 'jp-hy', type: 'text', content: 'HY', fontFamily: { $t: 'fonts.mono' }, fontSize: 22, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.42, letterSpacing: 4, x: 90, y: 96, width: 220, height: 32, zIndex: 9 },
      { id: 'jp-kicker', type: 'text', content: 'QUIET MORNING', fontFamily: { $t: 'fonts.display' }, fontSize: 22, color: { $t: 'colors.ink' }, opacity: 0.5, letterSpacing: 6, textAlign: 'right', x: 690, y: 96, width: 300, height: 32, zIndex: 9, animation: { name: 'fadeIn', duration: 800 } },
      // 主标题（衬线中文，克制）
      { id: 'jp-title', type: 'text', content: '山静日长', fontFamily: { $t: 'fonts.cjk' }, fontSize: 108, fontWeight: '500', color: { $t: 'colors.ink' }, letterSpacing: 18, textAlign: 'center', x: 140, y: 250, width: 800, height: 160, zIndex: 9, animation: { name: 'fadeIn', duration: 1400, easing: 'ease-out' }, editable: { content: true, fontSize: { type: 'range', min: 84, max: 128 } } },
      // 英文副题
      { id: 'jp-en', type: 'text', content: 'Stillness,\nslowly.', fontFamily: { $t: 'fonts.display' }, fontSize: 46, color: { $t: 'colors.ink' }, opacity: 0.68, lineHeight: 1.35, letterSpacing: 1, textAlign: 'center', x: 170, y: 430, width: 740, height: 150, zIndex: 9, animation: { name: 'rise', duration: 1200, delay: 200 }, editable: { content: true } },
      // 底部小注
      { id: 'jp-note', type: 'text', content: '留白处，才是画面真正的内容。', fontFamily: { $t: 'fonts.cjk' }, fontSize: 26, color: { $t: 'colors.ink' }, opacity: 0.6, textAlign: 'center', x: 190, y: 1180, width: 700, height: 40, zIndex: 9, animation: { name: 'rise', duration: 1000, delay: 340 }, editable: { content: true } },
      { id: 'jp-meta', type: 'text', content: 'HY · STUDIO NOTE', fontFamily: { $t: 'fonts.mono' }, fontSize: 18, color: { $t: 'colors.ink' }, opacity: 0.38, letterSpacing: 3, textAlign: 'center', x: 190, y: 1240, width: 700, height: 28, zIndex: 9 },
      { id: 'jp-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1350, background: `url("${grainSoft(340, 13, 0.55)}")`, opacity: 0.055, mixBlendMode: 'multiply', zIndex: 12 }
    ]
  }
]

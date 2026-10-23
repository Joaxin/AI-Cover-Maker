// src/core/templates/art/hy-memphis-pop.ts
// HY 系列 · 孟菲斯几何（4:5 竖版）｜ 对标 Memphis Design 复兴审美：散落几何 + 高对比撞色
import type { Template } from '@/types/types'
import {SANS, HEI, IMPACT, MONO, halftone, scribble, triangle, grainSoft} from '../_fx/trend'

export const hyMemphisPopTemplates: Template[] = [
  {
    id: 'hy-memphis-pop', name: '孟菲斯几何', version: '1.0.0', category: 'art',
    tags: ['hy', 'memphis', 'geometric', 'shapes', 'bold', '4:5', 'art'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="125" viewBox="0 0 100 125"><rect width="100" height="125" fill="%23FDF6E3"/><circle cx="70" cy="34" r="18" fill="none" stroke="%23FF5A5F" stroke-width="4"/><polygon points="18,74 44,74 31,50" fill="%234ECDC4"/><circle cx="24" cy="98" r="8" fill="%23FFC93C"/><rect x="58" y="88" width="26" height="26" fill="%237C4DFF" transform="rotate(20 71 101)"/><rect x="14" y="18" width="30" height="5" fill="%231B1B1F"/><rect x="14" y="28" width="18" height="5" fill="%231B1B1F"/></svg>',
    tokens: {
      colors: {
        bg: { label: '底色', default: '#FDF6E3', options: ['#FDF6E3', '#FFF5F5', '#F0FFF9', '#1B1B1F'] },
        ink: { label: '墨色', default: '#1B1B1F', options: ['#1B1B1F', '#2D3142', '#3D2C29', '#FDF6E3'] },
        pop1: { label: '主色1', default: '#FF5A5F', options: ['#FF5A5F', '#F25F5C', '#E63946', '#FF8FA3'] },
        pop2: { label: '主色2', default: '#FFC93C', options: ['#FFC93C', '#FFD166', '#F4A261', '#FFE066'] },
        pop3: { label: '主色3', default: '#4ECDC4', options: ['#4ECDC4', '#06D6A0', '#48BFE3', '#83D8C9'] },
        accent: { label: '点缀', default: '#7C4DFF', options: ['#7C4DFF', '#9D4EDD', '#5A67D8', '#C77DFF'] }
      },
      fonts: {
        display: { label: '英文标题', default: IMPACT, options: [IMPACT, SANS, MONO] },
        cjk: { label: '中文', default: HEI, options: [HEI, SANS, MONO] },
        mono: { label: '等宽标注', default: MONO, options: [MONO, IMPACT, SANS] }
      }
    },
    presets: [
      { name: '奶油撞色', colors: { bg: '#FDF6E3', ink: '#1B1B1F', pop1: '#FF5A5F', pop2: '#FFC93C', pop3: '#4ECDC4', accent: '#7C4DFF' } },
      { name: '暖粉浴缸', colors: { bg: '#FFF5F5', ink: '#2D3142', pop1: '#F25F5C', pop2: '#FFD166', pop3: '#06D6A0', accent: '#9D4EDD' } },
      { name: '薄荷工厂', colors: { bg: '#F0FFF9', ink: '#3D2C29', pop1: '#E63946', pop2: '#F4A261', pop3: '#48BFE3', accent: '#5A67D8' } },
      { name: '午夜游乐', colors: { bg: '#1B1B1F', ink: '#FDF6E3', pop1: '#FF8FA3', pop2: '#FFE066', pop3: '#83D8C9', accent: '#C77DFF' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      // 背景柔光团（给平涂加一点呼吸感）
      { id: 'mp-glow1', type: 'shape', shapeKind: 'circle', x: 640, y: 130, width: 460, height: 460, fill: { $t: 'colors.pop2' }, opacity: 0.2, zIndex: 1 },
      { id: 'mp-glow2', type: 'shape', shapeKind: 'circle', x: -140, y: 620, width: 540, height: 540, fill: { $t: 'colors.pop3' }, opacity: 0.18, zIndex: 1 },
      // 网点阵（旋转让边缘更活）
      { id: 'mp-dots', type: 'overlay', x: 80, y: 210, width: 380, height: 380, rotation: -8, background: `url("${halftone(56, 56, 6, 16, '%231B1B1F')}")`, opacity: 0.45, zIndex: 2 },
      // 三角形（几何构成里的尖角）
      { id: 'mp-tri', type: 'overlay', x: 530, y: 300, width: 220, height: 190, rotation: 14, background: `url("${triangle(220, 190, '%23FF5A5F')}")`, opacity: 0.92, zIndex: 2, animation: { name: 'float', duration: 6400, iterationCount: 'infinite', easing: 'ease-in-out' } },
      // 描边大圆环
      { id: 'mp-ring', type: 'shape', shapeKind: 'circle', x: 610, y: 470, width: 380, height: 380, fill: 'transparent', border: { width: 16, color: { $t: 'colors.pop1' } }, opacity: 0.85, zIndex: 2, animation: { name: 'spinSlow', duration: 26000, iterationCount: 'infinite', easing: 'linear' } },
      // 手绘波浪线
      { id: 'mp-scrib', type: 'overlay', x: 120, y: 660, width: 420, height: 90, rotation: -6, background: `url("${scribble(420, 90, '%237C4DFF', 7)}")`, opacity: 0.9, zIndex: 3 },
      // 散落小方块
      { id: 'mp-sq1', group: 'mp-sq', type: 'shape', shapeKind: 'rect', x: 500, y: 210, width: 78, height: 78, rotation: 22, fill: { $t: 'colors.pop3' }, zIndex: 3 },
      { id: 'mp-sq2', group: 'mp-sq', type: 'shape', shapeKind: 'rect', x: 880, y: 470, width: 62, height: 62, rotation: -20, fill: { $t: 'colors.pop2' }, zIndex: 3 },
      { id: 'mp-sq3', group: 'mp-sq', type: 'shape', shapeKind: 'rect', x: 150, y: 300, width: 54, height: 54, rotation: 34, fill: { $t: 'colors.accent' }, zIndex: 3 },
      { id: 'mp-sq4', group: 'mp-sq', type: 'shape', shapeKind: 'rect', x: 80, y: 900, width: 96, height: 96, rotation: -14, borderRadius: 24, fill: { $t: 'colors.pop1' }, zIndex: 3 },
      // 实心小圆三连
      { id: 'mp-c1', group: 'mp-c', type: 'shape', shapeKind: 'circle', x: 890, y: 250, width: 58, height: 58, fill: { $t: 'colors.pop1' }, zIndex: 3 },
      { id: 'mp-c2', group: 'mp-c', type: 'shape', shapeKind: 'circle', x: 950, y: 330, width: 38, height: 38, fill: { $t: 'colors.ink' }, zIndex: 3 },
      { id: 'mp-c3', group: 'mp-c', type: 'shape', shapeKind: 'circle', x: 860, y: 700, width: 76, height: 76, fill: { $t: 'colors.pop3' }, opacity: 0.9, zIndex: 3 },
      // 细線
      { id: 'mp-rule1', type: 'shape', shapeKind: 'line', x: 90, y: 168, width: 900, height: 4, fill: { $t: 'colors.ink' }, zIndex: 4 },
      { id: 'mp-rule2', type: 'shape', shapeKind: 'line', x: 90, y: 1180, width: 900, height: 3, fill: { $t: 'colors.ink' }, opacity: 0.35, zIndex: 4 },
      // 左上 HY 标记 + 右上标签
      { id: 'mp-hy', type: 'text', content: 'HY', fontFamily: { $t: 'fonts.mono' }, fontSize: 26, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.55, letterSpacing: 4, x: 90, y: 96, width: 220, height: 36, zIndex: 6 },
      { id: 'mp-kicker', type: 'text', content: 'SHAPES & RULES', fontFamily: { $t: 'fonts.mono' }, fontSize: 22, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 4, textAlign: 'right', x: 690, y: 96, width: 300, height: 34, zIndex: 6, animation: { name: 'fadeIn', duration: 600 } },
      // 主标题
      { id: 'mp-title', type: 'text', content: 'MEMPHIS', fontFamily: { $t: 'fonts.display' }, fontSize: 148, fontWeight: '700', color: { $t: 'colors.ink' }, textAlign: 'center', lineHeight: 1.1, letterSpacing: 6, x: 50, y: 830, width: 980, height: 190, zIndex: 6, animation: { name: 'fadeInUp', duration: 900 }, editable: { content: true, fontSize: { type: 'range', min: 110, max: 165 } } },
      { id: 'mp-cjk', type: 'text', content: '把形状散落在图纸上', fontFamily: { $t: 'fonts.cjk' }, fontSize: 40, fontWeight: '700', color: { $t: 'colors.pop1' }, textAlign: 'center', x: 140, y: 1030, width: 800, height: 56, zIndex: 6, animation: { name: 'rise', duration: 900, delay: 160 }, editable: { content: true } },
      { id: 'mp-sub', type: 'text', content: '几何不该端着——让圆、三角与方块自己跳舞。', fontFamily: { $t: 'fonts.cjk' }, fontSize: 26, color: { $t: 'colors.ink' }, opacity: 0.72, x: 90, y: 1210, width: 700, height: 40, zIndex: 6, animation: { name: 'rise', duration: 900, delay: 260 }, editable: { content: true } },
      { id: 'mp-meta', type: 'text', content: 'NO.HY-02  /  ART', fontFamily: { $t: 'fonts.mono' }, fontSize: 20, color: { $t: 'colors.ink' }, opacity: 0.5, letterSpacing: 2, textAlign: 'right', x: 690, y: 1212, width: 300, height: 32, zIndex: 6 },
      { id: 'mp-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1350, background: `url("${grainSoft(300, 5, 0.5)}")`, opacity: 0.04, mixBlendMode: 'multiply', zIndex: 9 }
    ]
  }
]

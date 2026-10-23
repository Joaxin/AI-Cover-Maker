// src/core/templates/minimal/hy-07-swiss-grid.ts
// 瑞士网格极简 Swiss Grid（4:5 竖版 1080×1350）
// International Typographic Style：12 栏网格骨架 + 超大无衬线标题 + 单一强调色块 + 理性分栏小注。
// HY 标记：id / 导出名 / tags 带 hy；底部三栏小注嵌入「编号 / 分类 / 日期」。
import type { Template } from '@/types/types'
import { SANS, HEI, MONO, SERIF, grain } from '../_fx/trend'

const COL = 96          // 统一左页边距（所有左对齐文字共用，规避 ALIGN-DRIFT）
const STEP = 74         // 栏宽 = (1080 - 96*2) / 12

export const hy07SwissGridTemplates: Template[] = [
  {
    id: 'hy-07-swiss-grid', name: '瑞士网格', version: '1.0.0', category: 'minimal',
    tags: ['hy', 'minimal', 'swiss', 'grid', 'editorial', 'typographic', '4:5'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="125" viewBox="0 0 100 125"><rect width="100" height="125" fill="%23FAFAF7"/><line x1="16" y1="0" x2="16" y2="125" stroke="%2314140F" stroke-opacity="0.12"/><line x1="50" y1="0" x2="50" y2="125" stroke="%2314140F" stroke-opacity="0.12"/><line x1="84" y1="0" x2="84" y2="125" stroke="%2314140F" stroke-opacity="0.12"/><rect x="50" y="42" width="34" height="34" fill="%23D8261E"/><text x="16" y="102" font-family="Arial" font-size="22" font-weight="800" fill="%2314140F">GRID</text></svg>',
    tokens: {
      colors: {
        bg: { label: '底色', default: '#FAFAF7', options: ['#FAFAF7', '#F4F6FB', '#F3EEE3', '#EEF3EC'] },
        ink: { label: '文字', default: '#14140F', options: ['#14140F', '#1B2233', '#2B2620', '#1A2A1C'] },
        accent: { label: '强调', default: '#D8261E', options: ['#D8261E', '#1E63D8', '#D98324', '#2E7D32'] },
        line: { label: '网格线', default: '#14140F', options: ['#14140F', '#1B2233', '#2B2620', '#1A2A1C'] }
      },
      fonts: { display: { label: '标题', default: SANS, options: [SANS, HEI, SERIF] }, mono: { label: '小字', default: MONO, options: [MONO, SANS] } }
    },
    presets: [
      { name: '红黑经典', colors: { bg: '#FAFAF7', ink: '#14140F', accent: '#D8261E', line: '#14140F' } },
      { name: '蓝黑冷峻', colors: { bg: '#F4F6FB', ink: '#1B2233', accent: '#1E63D8', line: '#1B2233' } },
      { name: '橙灰暖调', colors: { bg: '#F3EEE3', ink: '#2B2620', accent: '#D98324', line: '#2B2620' } },
      { name: '绿黑自然', colors: { bg: '#EEF3EC', ink: '#1A2A1C', accent: '#2E7D32', line: '#1A2A1C' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      // —— 12 栏网格细线（背景骨架）——
      { id: 'sg-grid-1', group: 'sg-grid-', type: 'shape', shapeKind: 'rect', x: COL, y: 96, width: 2, height: 1158, fill: { $t: 'colors.line' }, opacity: 0.10, zIndex: 1 },
      { id: 'sg-grid-2', group: 'sg-grid-', type: 'shape', shapeKind: 'rect', x: COL + STEP * 3, y: 96, width: 2, height: 1158, fill: { $t: 'colors.line' }, opacity: 0.10, zIndex: 1 },
      { id: 'sg-grid-3', group: 'sg-grid-', type: 'shape', shapeKind: 'rect', x: COL + STEP * 6, y: 96, width: 2, height: 1158, fill: { $t: 'colors.line' }, opacity: 0.10, zIndex: 1 },
      { id: 'sg-grid-4', group: 'sg-grid-', type: 'shape', shapeKind: 'rect', x: COL + STEP * 9, y: 96, width: 2, height: 1158, fill: { $t: 'colors.line' }, opacity: 0.10, zIndex: 1 },
      { id: 'sg-grid-5', group: 'sg-grid-', type: 'shape', shapeKind: 'rect', x: COL + STEP * 12, y: 96, width: 2, height: 1158, fill: { $t: 'colors.line' }, opacity: 0.10, zIndex: 1 },

      // —— 横向分割线 ——
      { id: 'sg-toprule', type: 'shape', shapeKind: 'line', x: COL, y: 300, width: 888, height: 2, fill: { $t: 'colors.line' }, opacity: 0.18, zIndex: 2 },
      { id: 'sg-midrule', type: 'shape', shapeKind: 'line', x: COL, y: 985, width: 888, height: 2, fill: { $t: 'colors.line' }, opacity: 0.18, zIndex: 2 },
      { id: 'sg-botrule', type: 'shape', shapeKind: 'line', x: COL, y: 1175, width: 888, height: 2, fill: { $t: 'colors.line' }, opacity: 0.18, zIndex: 2 },

      // —— 单一强调色块（右下落座）+ 装饰圆点 / 圆环（标题右侧留白区）——
      { id: 'sg-accent-block', type: 'shape', shapeKind: 'rect', x: COL + STEP * 7, y: 1000, width: STEP * 5 - 8, height: 150, fill: { $t: 'colors.accent' }, zIndex: 3, animation: { name: 'fadeIn', duration: 900, delay: 200 } },
      { id: 'sg-dot', type: 'shape', shapeKind: 'circle', x: 838, y: 408, width: 58, height: 58, fill: { $t: 'colors.accent' }, zIndex: 3, animation: { name: 'pulse', duration: 5200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'sg-ring', type: 'shape', shapeKind: 'circle', x: 812, y: 600, width: 130, height: 130, fill: 'transparent', border: { width: 10, color: { $t: 'colors.accent' } }, opacity: 0.85, zIndex: 3, animation: { name: 'spinSlow', duration: 26000, iterationCount: 'infinite', easing: 'linear' } },

      // —— 顶部信息行：巨型编号 + kicker + meta ——
      { id: 'sg-numeral', type: 'text', content: '07', fontFamily: { $t: 'fonts.display' }, fontSize: 220, fontWeight: '800', color: { $t: 'colors.ink' }, letterSpacing: -6, x: 688, y: 120, width: 250, height: 240, zIndex: 8, animation: { name: 'fadeIn', duration: 800 }, editable: { content: true, fontSize: { type: 'range', min: 160, max: 240 } } },
      { id: 'sg-kicker', type: 'text', content: 'MINIMALISM · 极简观察', fontFamily: { $t: 'fonts.mono' }, fontSize: 25, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.75, letterSpacing: 8, x: COL, y: 120, width: 560, height: 36, zIndex: 8, animation: { name: 'slideInLeft', duration: 700 } },
      { id: 'sg-meta', type: 'text', content: '2026 / 03 · ISSUE 07 · 设计', fontFamily: { $t: 'fonts.mono' }, fontSize: 22, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.6, letterSpacing: 4, x: COL, y: 320, width: 580, height: 30, zIndex: 8 },

      // —— 超大无衬线标题 ——
      { id: 'sg-title', type: 'text', content: '少\n即是\n多', fontFamily: { $t: 'fonts.display' }, fontSize: 150, fontWeight: '800', color: { $t: 'colors.ink' }, lineHeight: 1.0, letterSpacing: -4, x: COL, y: 360, width: 520, height: 470, zIndex: 8, animation: { name: 'fadeInUp', duration: 900, delay: 120 }, editable: { content: true, fontSize: { type: 'range', min: 110, max: 168 } } },

      // —— 副标题 / 引言 ——
      { id: 'sg-sub', type: 'text', content: '删掉 80% 的噪音，\n剩下的 20% 才听得清。', fontFamily: { $t: 'fonts.display' }, fontSize: 34, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.9, letterSpacing: 2, lineHeight: 1.45, x: COL, y: 850, width: 700, height: 120, zIndex: 8, animation: { name: 'rise', duration: 800, delay: 360 }, editable: { content: true } },

      // —— 左侧标签列（强调色小注）——
      { id: 'sg-tag-1', type: 'text', content: 'TAG / 极简生活', fontFamily: { $t: 'fonts.mono' }, fontSize: 22, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.7, letterSpacing: 3, x: COL, y: 1005, width: 260, height: 40, zIndex: 8 },
      { id: 'sg-tag-2', type: 'text', content: 'TAG / 设计系统', fontFamily: { $t: 'fonts.mono' }, fontSize: 22, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.7, letterSpacing: 3, x: COL, y: 1055, width: 260, height: 40, zIndex: 8 },

      // —— 底部三栏理性小注：编号 / 分类 / 日期 ——
      { id: 'sg-note-1', type: 'text', content: '01 / 编号\nHY-07', fontFamily: { $t: 'fonts.mono' }, fontSize: 22, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.72, letterSpacing: 3, lineHeight: 1.4, x: COL, y: 1200, width: STEP * 3, height: 70, zIndex: 8 },
      { id: 'sg-note-2', type: 'text', content: '02 / 分类\nMINIMAL', fontFamily: { $t: 'fonts.mono' }, fontSize: 22, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.72, letterSpacing: 3, lineHeight: 1.4, x: COL + STEP * 4, y: 1200, width: STEP * 3, height: 70, zIndex: 8 },
      { id: 'sg-note-3', type: 'text', content: '03 / 日期\n2026 / 03', fontFamily: { $t: 'fonts.mono' }, fontSize: 22, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.72, letterSpacing: 3, lineHeight: 1.4, x: COL + STEP * 8, y: 1200, width: STEP * 4, height: 70, zIndex: 8 },

      // —— 全局细颗粒纹理 ——
      { id: 'sg-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1350, background: `url("${grain(300, 3, 0.55)}")`, opacity: 0.045, mixBlendMode: 'multiply', zIndex: 20 }
    ]
  }
]

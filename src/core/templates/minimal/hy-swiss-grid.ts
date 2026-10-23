// src/core/templates/minimal/hy-swiss-grid.ts —— 瑞士网格 Swiss Grid（4:5）
// International Typographic Style：12 栏网格骨架 + 超大无衬线标题 + 单一强调色块 + 理性分栏小注。
// HY 标记：id / 导出名 / tags 带 hy，底部三栏小注之一嵌入「HY-01 / GRID SYSTEM」。
import type { Template } from '@/types/types'
import { HEI, MONO, SANS, SERIF, grain } from '../_fx/trend'

const COL = 96          // 统一左页边距
const STEP = 74         // 栏宽（(1080-96*2)/12）

export const hySwissGridTemplates: Template[] = [
  {
    id: 'hy-swiss-grid', name: '瑞士网格', version: '1.0.0', category: 'minimal',
    tags: ['hy', 'minimal', 'swiss', 'grid', 'editorial', 'typographic', '4:5'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="108" height="135" viewBox="0 0 108 135"><rect width="108" height="135" fill="%23FAFAF7"/><line x1="9.6" y1="9.6" x2="9.6" y2="125.4" stroke="%2314140F" stroke-opacity="0.12"/><line x1="17" y1="9.6" x2="17" y2="125.4" stroke="%2314140F" stroke-opacity="0.12"/><line x1="39.2" y1="9.6" x2="39.2" y2="125.4" stroke="%2314140F" stroke-opacity="0.12"/><line x1="61.4" y1="9.6" x2="61.4" y2="125.4" stroke="%2314140F" stroke-opacity="0.12"/><line x1="83.6" y1="9.6" x2="83.6" y2="125.4" stroke="%2314140F" stroke-opacity="0.12"/><text x="9.6" y="31" font-family="monospace" font-size="3.4" letter-spacing="0.6" fill="%2314140F" opacity="0.72">INTERNATIONAL TYPE</text><text x="9.6" y="46" font-family="Arial" font-size="12.5" font-weight="800" fill="%2314140F">网格</text><text x="9.6" y="58" font-family="Arial" font-size="12.5" font-weight="800" fill="%2314140F">之美</text><line x1="9.6" y1="76" x2="98.4" y2="76" stroke="%2314140F" stroke-opacity="0.18"/><rect x="9.6" y="80.5" width="50" height="2.2" fill="%2314140F" opacity="0.32"/><rect x="9.6" y="85" width="34" height="2.2" fill="%2314140F" opacity="0.32"/><rect x="61.4" y="88" width="36.2" height="30" fill="%23D8261E"/><rect x="9.6" y="118" width="17" height="1.7" fill="%2314140F" opacity="0.5"/><rect x="9.6" y="121" width="13" height="1.7" fill="%2314140F" opacity="0.35"/><rect x="39.2" y="118" width="17" height="1.7" fill="%2314140F" opacity="0.5"/><rect x="39.2" y="121" width="13" height="1.7" fill="%2314140F" opacity="0.35"/><rect x="68.8" y="118" width="17" height="1.7" fill="%2314140F" opacity="0.5"/><rect x="68.8" y="121" width="13" height="1.7" fill="%2314140F" opacity="0.35"/></svg>',
    tokens: {
      colors: {
        bg: { label: '底色', default: '#FAFAF7', options: ['#FAFAF7', '#F4F6FB', '#F3EEE3', '#0E0E12'] },
        ink: { label: '文字', default: '#14140F', options: ['#14140F', '#1B2233', '#2B2620', '#F2F2EC'] },
        accent: { label: '强调', default: '#D8261E', options: ['#D8261E', '#1E63D8', '#B07A2B', '#C6F23A'] },
        line: { label: '网格线', default: '#14140F', options: ['#14140F', '#1B2233', '#2B2620', '#F2F2EC'] }
      },
      fonts: { heading: { label: '标题', default: SANS, options: [SANS, HEI, SERIF] }, mono: { label: '小字', default: MONO, options: [MONO, SANS] } }
    },
    presets: [
      { name: '经典黑红', colors: { bg: '#FAFAF7', ink: '#14140F', accent: '#D8261E', line: '#14140F' } },
      { name: '钴蓝白', colors: { bg: '#F4F6FB', ink: '#1B2233', accent: '#1E63D8', line: '#1B2233' } },
      { name: '纸米赭', colors: { bg: '#F3EEE3', ink: '#2B2620', accent: '#B07A2B', line: '#2B2620' } },
      { name: '暗夜黄绿', colors: { bg: '#0E0E12', ink: '#F2F2EC', accent: '#C6F23A', line: '#F2F2EC' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      // —— 12 栏网格细线 ——
      { id: 'sg-grid-1', group: 'sg-grid-', type: 'shape', shapeKind: 'rect', x: COL, y: 96, width: 2, height: 1158, fill: { $t: 'colors.line' }, opacity: 0.10, zIndex: 1 },
      { id: 'sg-grid-2', group: 'sg-grid-', type: 'shape', shapeKind: 'rect', x: COL + STEP, y: 96, width: 2, height: 1158, fill: { $t: 'colors.line' }, opacity: 0.10, zIndex: 1 },
      { id: 'sg-grid-3', group: 'sg-grid-', type: 'shape', shapeKind: 'rect', x: COL + STEP * 4, y: 96, width: 2, height: 1158, fill: { $t: 'colors.line' }, opacity: 0.10, zIndex: 1 },
      { id: 'sg-grid-4', group: 'sg-grid-', type: 'shape', shapeKind: 'rect', x: COL + STEP * 7, y: 96, width: 2, height: 1158, fill: { $t: 'colors.line' }, opacity: 0.10, zIndex: 1 },
      { id: 'sg-grid-5', group: 'sg-grid-', type: 'shape', shapeKind: 'rect', x: COL + STEP * 10, y: 96, width: 2, height: 1158, fill: { $t: 'colors.line' }, opacity: 0.10, zIndex: 1 },
      { id: 'sg-rule', type: 'shape', shapeKind: 'line', x: COL, y: 760, width: 888, height: 2, fill: { $t: 'colors.line' }, opacity: 0.18, zIndex: 2 },
      // —— 强调色块 ——
      { id: 'sg-block', type: 'shape', shapeKind: 'rect', x: COL + STEP * 7, y: 880, width: STEP * 5 - 8, height: 300, fill: { $t: 'colors.accent' }, zIndex: 3, animation: { name: 'fadeIn', duration: 900, delay: 200 } },
      // —— 文字 ——
      { id: 'sg-kicker', type: 'text', content: 'INTERNATIONAL TYPE · 国际主义', fontFamily: { $t: 'fonts.mono' }, fontSize: 22, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.72, letterSpacing: 8, x: COL, y: 300, width: 888, height: 34, zIndex: 8, animation: { name: 'slideInLeft', duration: 700 } },
      { id: 'sg-title', type: 'text', content: '网格\n之美', fontFamily: { $t: 'fonts.heading' }, fontSize: 116, fontWeight: '800', color: { $t: 'colors.ink' }, lineHeight: 1.02, letterSpacing: -4, x: COL, y: 360, width: 888, height: 250, zIndex: 8, animation: { name: 'fadeInUp', duration: 900, delay: 120 }, editable: { content: true, fontSize: { type: 'range', min: 92, max: 128 } } },
      { id: 'sg-sub', type: 'text', content: '秩序不是限制，而是让信息自由呼吸的留白。', fontFamily: { $t: 'fonts.heading' }, fontSize: 30, color: { $t: 'colors.ink' }, opacity: 0.86, letterSpacing: 2, lineHeight: 1.45, x: COL, y: 800, width: STEP * 7 - 12, height: 92, zIndex: 8, animation: { name: 'rise', duration: 800, delay: 360 }, editable: { content: true } },
      // —— 底部三栏理性小注（各自占一列，x 差值远大于 30px 不触发漂移）——
      { id: 'sg-note-1', type: 'text', content: '01 / 排版\n12-COL GRID', fontFamily: { $t: 'fonts.mono' }, fontSize: 22, color: { $t: 'colors.ink' }, opacity: 0.7, letterSpacing: 3, lineHeight: 1.4, x: COL, y: 1180, width: STEP * 3, height: 70, zIndex: 8 },
      { id: 'sg-note-2', type: 'text', content: '02 / 字重\n800 BLACK', fontFamily: { $t: 'fonts.mono' }, fontSize: 22, color: { $t: 'colors.ink' }, opacity: 0.7, letterSpacing: 3, lineHeight: 1.4, x: COL + STEP * 4, y: 1180, width: STEP * 3, height: 70, zIndex: 8 },
      { id: 'sg-note-3', type: 'text', content: 'HY-01 / GRID\nSYSTEM NOTE', fontFamily: { $t: 'fonts.mono' }, fontSize: 22, color: { $t: 'colors.ink' }, opacity: 0.7, letterSpacing: 3, lineHeight: 1.4, x: COL + STEP * 8, y: 1180, width: STEP * 4, height: 70, zIndex: 8 },
      { id: 'sg-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1350, background: `url("${grain(300, 3, 0.55)}")`, opacity: 0.045, mixBlendMode: 'multiply', zIndex: 20 }
    ]
  }
]

// src/core/templates/quotes/hy-quote-calm.ts
// HY 系列 · 静句海报（4:5 竖版）｜ 对标极简金句排版：大留白 + 细线 + 单一强调色
import type { Template } from '@/types/types'
import {SANS, SERIF, SONG, HEI, MONO, grainSoft} from '../_fx/trend'

export const hyQuoteCalmTemplates: Template[] = [
  {
    id: 'hy-quote-calm', name: '静句海报', version: '1.0.0', category: 'quotes',
    tags: ['hy', 'quote', 'minimal', 'serif', 'typography', '4:5', 'poster'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="125" viewBox="0 0 100 125"><rect width="100" height="125" fill="%23FBFBF9"/><rect x="18" y="26" width="64" height="1" fill="%23242321"/><rect x="18" y="52" width="52" height="4" fill="%23242321"/><rect x="18" y="64" width="40" height="4" fill="%23242321"/><rect x="18" y="76" width="46" height="4" fill="%23B4463A"/><rect x="18" y="94" width="18" height="1" fill="%23242321"/><rect x="18" y="100" width="26" height="2" fill="%23242321" opacity="0.5"/></svg>',
    tokens: {
      colors: {
        bg: { label: '纸色', default: '#FBFBF9', options: ['#FBFBF9', '#F5F3EF', '#F7FAFB', '#1A1A1A'] },
        ink: { label: '墨色', default: '#242321', options: ['#242321', '#1C1B1A', '#2E2C2A', '#F5F3EF'] },
        muted: { label: '淡墨', default: '#8C8880', options: ['#8C8880', '#9C9790', '#7A766F', '#A8A49D'] },
        accent: { label: '强调', default: '#B4463A', options: ['#B4463A', '#9A3412', '#3F6212', '#1E40AF'] },
        rule: { label: '细线', default: '#D8D4CC', options: ['#D8D4CC', '#CFCAC2', '#E2DFD8', '#4A4845'] }
      },
      fonts: {
        quote: { label: '金句', default: SERIF, options: [SERIF, SONG, SANS] },
        cjk: { label: '中文', default: SONG, options: [SONG, HEI, SERIF] },
        mono: { label: '署名', default: MONO, options: [MONO, SANS, SERIF] }
      }
    },
    presets: [
      { name: '宣纸朱丹', colors: { bg: '#FBFBF9', ink: '#242321', muted: '#8C8880', accent: '#B4463A', rule: '#D8D4CC' } },
      { name: '亚麻深墨', colors: { bg: '#F5F3EF', ink: '#1C1B1A', muted: '#9C9790', accent: '#9A3412', rule: '#CFCAC2' } },
      { name: '晨雾青苔', colors: { bg: '#F7FAFB', ink: '#2E2C2A', muted: '#7A766F', accent: '#3F6212', rule: '#E2DFD8' } },
      { name: '深夜独白', colors: { bg: '#1A1A1A', ink: '#F5F3EF', muted: '#A8A49D', accent: '#1E40AF', rule: '#4A4845' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      // 极淡背景柔光
      { id: 'qc-glow', type: 'shape', shapeKind: 'circle', x: 240, y: 200, width: 620, height: 620, fill: { $t: 'colors.accent' }, opacity: 0.05, zIndex: 1 },
      // 顶部细线 + 编号
      { id: 'qc-rule-top', type: 'shape', shapeKind: 'line', x: 120, y: 220, width: 840, height: 1, fill: { $t: 'colors.rule' }, zIndex: 2 },
      { id: 'qc-hy', type: 'text', content: 'HY', fontFamily: { $t: 'fonts.mono' }, fontSize: 22, fontWeight: '700', color: { $t: 'colors.muted' }, opacity: 0.7, letterSpacing: 4, x: 120, y: 168, width: 240, height: 32, zIndex: 5 },
      { id: 'qc-num', type: 'text', content: 'No. 04', fontFamily: { $t: 'fonts.mono' }, fontSize: 20, color: { $t: 'colors.muted' }, letterSpacing: 2, textAlign: 'right', x: 700, y: 168, width: 260, height: 30, zIndex: 5, animation: { name: 'fadeIn', duration: 700 } },
      // 装饰性引号（id 带 exempt 词，避免与正文冲突）
      { id: 'qc-mark-decor', type: 'text', content: '\u201C', fontFamily: { $t: 'fonts.quote' }, fontSize: 200, color: { $t: 'colors.accent' }, opacity: 0.14, textAlign: 'center', x: 420, y: 250, width: 240, height: 240, zIndex: 3 },
      // 金句主体（居中，两英文行 + 一行强调 + 一行中文）
      { id: 'qc-q1', type: 'text', content: 'Slow is smooth,', fontFamily: { $t: 'fonts.quote' }, fontSize: 74, color: { $t: 'colors.ink' }, lineHeight: 1.3, textAlign: 'center', x: 150, y: 470, width: 780, height: 110, zIndex: 5, animation: { name: 'fadeInUp', duration: 1000 }, editable: { content: true, fontSize: { type: 'range', min: 54, max: 88 } } },
      { id: 'qc-q2', type: 'text', content: 'smooth is fast.', fontFamily: { $t: 'fonts.quote' }, fontSize: 74, color: { $t: 'colors.ink' }, lineHeight: 1.3, textAlign: 'center', x: 150, y: 600, width: 780, height: 110, zIndex: 5, animation: { name: 'fadeInUp', duration: 1000, delay: 140 }, editable: { content: true, fontSize: { type: 'range', min: 54, max: 88 } } },
      { id: 'qc-q3', type: 'text', content: '慢即是快', fontFamily: { $t: 'fonts.cjk' }, fontSize: 52, color: { $t: 'colors.accent' }, letterSpacing: 10, textAlign: 'center', x: 150, y: 760, width: 780, height: 80, zIndex: 5, animation: { name: 'rise', duration: 1000, delay: 280 }, editable: { content: true } },
      // 分隔短线
      { id: 'qc-divider', type: 'shape', shapeKind: 'line', x: 500, y: 900, width: 80, height: 2, fill: { $t: 'colors.accent' }, zIndex: 5 },
      // 署名 / 出处
      { id: 'qc-by', type: 'text', content: 'HY STUDIO', fontFamily: { $t: 'fonts.mono' }, fontSize: 24, fontWeight: '700', color: { $t: 'colors.ink' }, letterSpacing: 6, textAlign: 'center', x: 150, y: 950, width: 780, height: 38, zIndex: 5, animation: { name: 'fadeIn', duration: 900, delay: 400 }, editable: { content: true } },
      { id: 'qc-src', type: 'text', content: '— 摘自《慢下来的那一刻》', fontFamily: { $t: 'fonts.cjk' }, fontSize: 22, color: { $t: 'colors.muted' }, textAlign: 'center', x: 150, y: 1000, width: 780, height: 34, zIndex: 5, animation: { name: 'fadeIn', duration: 900, delay: 480 }, editable: { content: true } },
      // 底部细线与注脚
      { id: 'qc-rule-bottom', type: 'shape', shapeKind: 'line', x: 120, y: 1130, width: 840, height: 1, fill: { $t: 'colors.rule' }, zIndex: 2 },
      { id: 'qc-foot', type: 'text', content: 'DAILY NOTE', fontFamily: { $t: 'fonts.mono' }, fontSize: 18, color: { $t: 'colors.muted' }, opacity: 0.8, letterSpacing: 4, x: 120, y: 1160, width: 400, height: 28, zIndex: 5 },
      { id: 'qc-page', type: 'text', content: '04 / 12', fontFamily: { $t: 'fonts.mono' }, fontSize: 18, color: { $t: 'colors.muted' }, opacity: 0.8, letterSpacing: 3, textAlign: 'right', x: 660, y: 1160, width: 300, height: 28, zIndex: 5 },
      { id: 'qc-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1350, background: `url("${grainSoft(320, 31, 0.5)}")`, opacity: 0.04, mixBlendMode: 'multiply', zIndex: 9 }
    ]
  }
]

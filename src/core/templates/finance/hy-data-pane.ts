// src/core/templates/finance/hy-data-pane.ts —— 数据玻璃面板 Data Pane（1:1）
// 现代 fintech dashboard：暗底网格 + 渐变面积折线图 + 涨跌玻璃标签 + 大号 KPI + 理性注释。
// HY 标记：id / 导出名 / tags 带 hy，脚注嵌入「HY · MARKETS」。
import type { Template } from '@/types/types'
import { HEI, MONO, SANS, SERIF, grain } from '../_fx/trend'
import { svgUri } from '../_fx/common'

// 面积折线图（涨：红；跌：绿，遵循中国习惯），底部渐变填充
function areaChart(up: boolean) {
  const stroke = up ? '%23FF4D4F' : '%23FF4D4F'
  const pts = up
    ? '0,360 90,320 180,346 270,280 360,300 450,236 540,256 630,200 720,214 810,150 900,176 990,120'
    : '0,140 90,180 180,150 270,210 360,188 450,252 540,228 630,288 720,262 810,326 900,300 990,360'
  const line = pts.split(' ').map(p => p.split(',')).map(([x, y]) => `${x},${y}`).join(' L')
  const fill = up
    ? 'M0,120 L90,320 L180,346 L270,280 L360,300 L450,236 L540,256 L630,200 L720,214 L810,150 L900,176 L990,120 L990,400 L0,400 Z'
    : 'M0,140 L90,180 L180,150 L270,210 L360,188 L450,252 L540,228 L630,288 L720,262 L810,326 L900,300 L990,360 L990,400 L0,400 Z'
  return svgUri(
    `<path d='${fill}' fill='${stroke}' fill-opacity='0.12'/>` +
    `<polyline points='${line}' fill='none' stroke='${stroke}' stroke-width='5' stroke-linejoin='round' stroke-linecap='round'/>`,
    990, 400
  )
}

export const hyDataPaneTemplates: Template[] = [
  {
    id: 'hy-data-pane', name: '数据玻璃面板', version: '1.0.0', category: 'finance',
    tags: ['hy', 'finance', 'dashboard', 'fintech', 'chart', 'glass', '1:1'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%230E1320"/><rect x="10" y="10" width="80" height="56" rx="8" fill="%23FFFFFF" opacity="0.06"/><polyline points="12,52 30,40 48,46 66,30 84,36 96,22" fill="none" stroke="%23FF4D4F" stroke-width="3"/><text x="12" y="80" font-family="monospace" font-size="14" fill="%23FF4D4F">+12.4%</text></svg>',
    tokens: {
      colors: {
        bg: { label: '底色', default: '#0E1320', options: ['#0E1320', '#101826', '#0C1A16', '#16101C'] },
        ink: { label: '文字', default: '#EAF0FF', options: ['#EAF0FF', '#E6ECF5', '#E6FBF2', '#F6EAF4'] },
        up: { label: '涨', default: '#FF4D4F', options: ['#FF4D4F', '#FF6B6B', '#FF5C5C', '#FF7BC0'] },
        accent: { label: '强调', default: '#5B8DEF', options: ['#5B8DEF', '#38BDF8', '#3DD6C0', '#C084FC'] },
        line: { label: '网格线', default: '#5B8DEF', options: ['#5B8DEF', '#38BDF8', '#3DD6C0', '#C084FC'] }
      },
      fonts: { heading: { label: '标题', default: HEI, options: [HEI, SANS, SERIF] }, mono: { label: '小字', default: MONO, options: [MONO, SANS] } }
    },
    presets: [
      { name: '深蓝涨', colors: { bg: '#0E1320', ink: '#EAF0FF', up: '#FF4D4F', accent: '#5B8DEF', line: '#5B8DEF' } },
      { name: '墨青涨', colors: { bg: '#0C1A16', ink: '#E6FBF2', up: '#FF5C5C', accent: '#3DD6C0', line: '#3DD6C0' } },
      { name: '夜紫涨', colors: { bg: '#16101C', ink: '#F6EAF4', up: '#FF7BC0', accent: '#C084FC', line: '#C084FC' } },
      { name: '石墨涨', colors: { bg: '#101826', ink: '#E6ECF5', up: '#FF6B6B', accent: '#38BDF8', line: '#38BDF8' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1080, defaultWidth: 1080, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      // —— 网格 ——
      { id: 'dp-grid-1', group: 'dp-grid-', type: 'shape', shapeKind: 'line', x: 96, y: 560, width: 888, height: 2, fill: { $t: 'colors.line' }, opacity: 0.10, zIndex: 1 },
      { id: 'dp-grid-2', group: 'dp-grid-', type: 'shape', shapeKind: 'line', x: 96, y: 700, width: 888, height: 2, fill: { $t: 'colors.line' }, opacity: 0.10, zIndex: 1 },
      { id: 'dp-grid-3', group: 'dp-grid-', type: 'shape', shapeKind: 'line', x: 96, y: 840, width: 888, height: 2, fill: { $t: 'colors.line' }, opacity: 0.10, zIndex: 1 },
      { id: 'dp-glow', type: 'shape', shapeKind: 'circle', x: 620, y: 120, width: 520, height: 520, fill: { $t: 'colors.accent' }, opacity: 0.16, zIndex: 2, animation: { name: 'drift', duration: 14000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      // —— 顶部 KPI ——
      { id: 'dp-kicker', type: 'text', content: 'MARKET PULSE / 行情脉搏', fontFamily: { $t: 'fonts.mono' }, fontSize: 22, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.72, letterSpacing: 8, x: 96, y: 110, width: 800, height: 34, zIndex: 8, animation: { name: 'slideInLeft', duration: 700 } },
      { id: 'dp-kpi', type: 'text', content: '3,284.6', fontFamily: { $t: 'fonts.heading' }, fontSize: 132, fontWeight: '800', color: { $t: 'colors.ink' }, letterSpacing: -3, x: 96, y: 168, width: 888, height: 160, zIndex: 8, animation: { name: 'fadeInUp', duration: 900, delay: 120 }, editable: { content: true, fontSize: { type: 'range', min: 104, max: 148 } } },
      { id: 'dp-delta', type: 'shape', shapeKind: 'rect', x: 96, y: 344, width: 240, height: 72, fill: { $t: 'colors.up' }, opacity: 0.16, borderRadius: 36, zIndex: 7 },
      { id: 'dp-delta-t', type: 'text', content: '+12.4%  今日', fontFamily: { $t: 'fonts.mono' }, fontSize: 30, fontWeight: '700', color: { $t: 'colors.up' }, textAlign: 'center', lineHeight: 2.4, x: 96, y: 344, width: 240, height: 72, zIndex: 9, editable: { content: true } },
      // —— 图表卡 ——
      { id: 'dp-card', type: 'shape', shapeKind: 'rect', x: 96, y: 460, width: 888, height: 460, fill: { $t: 'colors.ink' }, opacity: 0.06, borderRadius: 32, zIndex: 3 },
      { id: 'dp-chart', type: 'image', src: areaChart(true), x: 96, y: 470, width: 888, height: 400, zIndex: 5, animation: { name: 'fadeIn', duration: 900, delay: 240 } },
      // —— 底部三列 ——
      { id: 'dp-c1', type: 'text', content: 'VOL\n84.2M', fontFamily: { $t: 'fonts.mono' }, fontSize: 30, color: { $t: 'colors.ink' }, opacity: 0.85, letterSpacing: 3, lineHeight: 1.4, x: 96, y: 960, width: 280, height: 80, zIndex: 8 },
      { id: 'dp-c2', type: 'text', content: 'HIGH\n3,410.0', fontFamily: { $t: 'fonts.mono' }, fontSize: 30, color: { $t: 'colors.ink' }, opacity: 0.85, letterSpacing: 3, lineHeight: 1.4, x: 400, y: 960, width: 280, height: 80, zIndex: 8 },
      { id: 'dp-c3', type: 'text', content: 'HY · MARKETS\nREALTIME', fontFamily: { $t: 'fonts.mono' }, fontSize: 26, color: { $t: 'colors.ink' }, opacity: 0.6, letterSpacing: 4, lineHeight: 1.4, x: 704, y: 960, width: 280, height: 80, zIndex: 8 },
      { id: 'dp-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1080, background: `url("${grain(300, 17, 0.55)}")`, opacity: 0.05, mixBlendMode: 'overlay', zIndex: 20 }
    ]
  }
]

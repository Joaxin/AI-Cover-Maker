// src/core/templates/tech/hy-01-aurora-glass.ts
// 极光玻璃拟态（Aurora Glass）｜ 归入「科技风」（tech）｜ 9:16 竖版
import type { Template } from '@/types/types'
import { SANS, HEI, SONG, MONO, SERIF, grainSoft } from '../_fx/trend'

export const hy01AuroraGlassTemplates: Template[] = [
  {
    id: 'hy-01-aurora-glass', name: '极光玻璃', version: '1.0.0', category: 'tech',
    tags: ['hy', 'aurora', 'glass', 'frosted', 'gradient', '9:16'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="178" viewBox="0 0 100 178"><rect width="100" height="178" fill="%23111632"/><ellipse cx="28" cy="34" rx="30" ry="22" fill="%2350dcc8" opacity="0.7"/><ellipse cx="74" cy="26" rx="26" ry="20" fill="%239678fa" opacity="0.7"/><ellipse cx="50" cy="162" rx="34" ry="24" fill="%23ff78b4" opacity="0.5"/><rect x="14" y="58" width="72" height="92" rx="8" fill="%23ffffff" opacity="0.12" stroke="%23ffffff" stroke-opacity="0.5"/><rect x="22" y="72" width="56" height="9" rx="4" fill="%23ffffff" opacity="0.9"/><rect x="22" y="88" width="40" height="7" rx="3" fill="%23ffffff" opacity="0.6"/><rect x="22" y="128" width="34" height="9" rx="4" fill="%2350dcc8"/></svg>',
    tokens: {
      colors: {
        bg: { label: '底色', default: '#0B1020', options: ['#0B1020', '#111632', '#E8EEF2', '#06223A'] },
        ink: { label: '文字', default: '#EEF3FF', options: ['#EEF3FF', '#F4F7FF', '#16323A', '#E6F4FF'] },
        accent: { label: '极光主色', default: '#50DCC8', options: ['#50DCC8', '#7C5CFF', '#FF8FB1', '#3DA9FC'] },
        accent2: { label: '极光副色', default: '#9678FA', options: ['#9678FA', '#B06BFF', '#FFC36E', '#5BE0C8'] },
        surface: { label: '玻璃面板', default: '#FFFFFF', options: ['#FFFFFF', '#0E2A33', '#3A1622', '#FFFFFF'] }
      },
      fonts: {
        display: { label: '大标题', default: HEI, options: [HEI, SONG, SANS] },
        latin: { label: '英文', default: SANS, options: [SANS, SERIF, MONO] },
        cjk: { label: '中文', default: HEI, options: [HEI, SONG, MONO] }
      }
    },
    presets: [
      { name: '雾极光', colors: { bg: '#E8EEF2', ink: '#16323A', accent: '#6FD3C4', accent2: '#8FA8E8', surface: '#0E2A33' } },
      { name: '霓虹夜', colors: { bg: '#0B1020', ink: '#EEF3FF', accent: '#50DCC8', accent2: '#B06BFF', surface: '#FFFFFF' } },
      { name: '玫瑰晨', colors: { bg: '#FBE9EE', ink: '#3A1622', accent: '#FF8FB1', accent2: '#FFC36E', surface: '#3A1622' } },
      { name: '深海蓝', colors: { bg: '#06223A', ink: '#E6F4FF', accent: '#3DA9FC', accent2: '#5BE0C8', surface: '#FFFFFF' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1920, defaultWidth: 1080, defaultHeight: 1920, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      // —— 底层：极光渐变光晕（overlay 多层 radial/linear）——
      { id: 'ag-glow-1', group: 'ag-glow-', type: 'overlay', x: 0, y: 0, width: 1080, height: 1920, zIndex: 1, background: 'radial-gradient(62% 46% at 22% 15%, rgba(80,220,200,0.55), rgba(80,220,200,0) 70%)' },
      { id: 'ag-glow-2', group: 'ag-glow-', type: 'overlay', x: 0, y: 0, width: 1080, height: 1920, zIndex: 1, background: 'radial-gradient(58% 44% at 84% 12%, rgba(150,120,255,0.50), rgba(150,120,255,0) 72%)' },
      { id: 'ag-glow-3', group: 'ag-glow-', type: 'overlay', x: 0, y: 0, width: 1080, height: 1920, zIndex: 1, background: 'radial-gradient(72% 58% at 50% 96%, rgba(255,120,180,0.40), rgba(255,120,180,0) 72%)' },
      // —— 中层：跟随预设换色的极光柔光团（shape 半透明圆）——
      { id: 'ag-blob-a', type: 'shape', shapeKind: 'circle', x: 120, y: 300, width: 540, height: 540, fill: { $t: 'colors.accent' }, opacity: 0.18, zIndex: 2, animation: { name: 'float', duration: 9200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'ag-blob-b', type: 'shape', shapeKind: 'circle', x: 600, y: 1080, width: 600, height: 600, fill: { $t: 'colors.accent2' }, opacity: 0.16, zIndex: 2, animation: { name: 'drift', duration: 10800, iterationCount: 'infinite', easing: 'ease-in-out' } },
      // —— 大号水印数字（装饰，豁免压字检查）——
      { id: 'ag-bigmark', type: 'text', content: '26', fontFamily: { $t: 'fonts.latin' }, fontSize: 260, fontWeight: '800', color: { $t: 'colors.accent' }, opacity: 0.10, textAlign: 'right', lineHeight: 1, x: 600, y: 80, width: 420, height: 420, zIndex: 3 },
      // —— 毛玻璃卡片（半透明面板 + 细描边 + 柔光阴影）——
      { id: 'ag-card', type: 'shape', shapeKind: 'rect', x: 64, y: 460, width: 952, height: 1040, fill: { $t: 'colors.surface' }, opacity: 0.16, borderRadius: 48, border: { width: 1.5, style: 'solid', color: 'rgba(255,255,255,0.35)' }, shadow: { offsetX: 0, offsetY: 30, blur: 60, color: 'rgba(0,0,0,0.22)' }, zIndex: 12 },
      { id: 'ag-hairline', type: 'shape', shapeKind: 'line', x: 88, y: 206, width: 904, height: 1, fill: { $t: 'colors.ink' }, opacity: 0.15, zIndex: 13 },
      // —— 边角小标记（tech 质感小圆点）——
      { id: 'ag-dot-1', type: 'shape', shapeKind: 'circle', x: 936, y: 196, width: 16, height: 16, fill: { $t: 'colors.accent' }, opacity: 0.85, zIndex: 14 },
      { id: 'ag-dot-2', type: 'shape', shapeKind: 'circle', x: 962, y: 232, width: 10, height: 10, fill: { $t: 'colors.accent2' }, opacity: 0.85, zIndex: 14 },
      // —— 顶层文字与 UI 细节 ——
      { id: 'ag-kicker', type: 'text', content: 'AURORA GLASS · 极光玻璃拟态', fontFamily: { $t: 'fonts.latin' }, fontSize: 26, fontWeight: '700', color: { $t: 'colors.accent2' }, letterSpacing: 4, lineHeight: 1.2, x: 88, y: 110, width: 904, height: 40, zIndex: 20 },
      { id: 'ag-no', type: 'text', content: 'HY · 2026', fontFamily: { $t: 'fonts.latin' }, fontSize: 26, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.6, letterSpacing: 3, textAlign: 'right', lineHeight: 1.2, x: 560, y: 110, width: 432, height: 40, zIndex: 20 },
      { id: 'ag-title', type: 'text', content: '把灵感\n调成极光色', fontFamily: { $t: 'fonts.display' }, fontSize: 140, fontWeight: '800', color: { $t: 'colors.ink' }, lineHeight: 1.12, letterSpacing: 1, x: 88, y: 560, width: 904, height: 420, zIndex: 20, animation: { name: 'fadeInUp', duration: 900 }, editable: { content: true, fontSize: { type: 'range', min: 110, max: 160 } } },
      { id: 'ag-sub', type: 'text', content: '夜色里也能发光的封面', fontFamily: { $t: 'fonts.cjk' }, fontSize: 44, fontWeight: '600', color: { $t: 'colors.ink' }, lineHeight: 1.3, x: 88, y: 1010, width: 904, height: 70, zIndex: 20, animation: { name: 'rise', duration: 900, delay: 160 }, editable: { content: true } },
      { id: 'ag-body', type: 'text', content: '极光渐变打底，毛玻璃卡片浮在上面，\n信息像被夜空轻轻托住。\n三套预设，一键换情绪。', fontFamily: { $t: 'fonts.cjk' }, fontSize: 30, fontWeight: '400', color: { $t: 'colors.ink' }, opacity: 0.92, lineHeight: 1.62, x: 88, y: 1120, width: 904, height: 200, zIndex: 20, animation: { name: 'rise', duration: 900, delay: 280 }, editable: { content: true } },
      { id: 'ag-div', type: 'shape', shapeKind: 'line', x: 88, y: 1360, width: 420, height: 1, fill: { $t: 'colors.ink' }, opacity: 0.25, zIndex: 13 },
      // 标签 pill
      { id: 'ag-pill-1', type: 'shape', shapeKind: 'rect', x: 88, y: 1410, width: 300, height: 72, fill: { $t: 'colors.accent' }, borderRadius: 36, zIndex: 21 },
      { id: 'ag-pill-1-t', type: 'text', content: '新趋势', fontFamily: { $t: 'fonts.cjk' }, fontSize: 26, fontWeight: '700', color: { $t: 'colors.bg' }, textAlign: 'center', lineHeight: 2.77, x: 88, y: 1410, width: 300, height: 72, zIndex: 22 },
      { id: 'ag-pill-2', type: 'shape', shapeKind: 'rect', x: 404, y: 1410, width: 230, height: 72, fill: { $t: 'colors.accent2' }, opacity: 0.9, borderRadius: 36, zIndex: 21 },
      { id: 'ag-pill-2-t', type: 'text', content: '毛玻璃', fontFamily: { $t: 'fonts.cjk' }, fontSize: 26, fontWeight: '700', color: { $t: 'colors.bg' }, textAlign: 'center', lineHeight: 2.77, x: 404, y: 1410, width: 230, height: 72, zIndex: 22 },
      // 行动按钮
      { id: 'ag-cta', type: 'shape', shapeKind: 'rect', x: 88, y: 1620, width: 420, height: 104, fill: { $t: 'colors.ink' }, borderRadius: 52, shadow: { offsetX: 0, offsetY: 16, blur: 30, color: 'rgba(0,0,0,0.18)' }, zIndex: 20 },
      { id: 'ag-cta-t', type: 'text', content: '收藏这套极光', fontFamily: { $t: 'fonts.cjk' }, fontSize: 36, fontWeight: '700', color: { $t: 'colors.bg' }, textAlign: 'center', lineHeight: 2.89, x: 88, y: 1620, width: 420, height: 104, zIndex: 23, editable: { content: true } },
      { id: 'ag-footer', type: 'text', content: '编辑于 2026 · 极光系列', fontFamily: { $t: 'fonts.latin' }, fontSize: 22, fontWeight: '500', color: { $t: 'colors.ink' }, opacity: 0.55, letterSpacing: 2, textAlign: 'right', lineHeight: 1.2, x: 560, y: 1652, width: 432, height: 40, zIndex: 20 },
      { id: 'ag-c-bl', type: 'text', content: '© IFU Studio', fontFamily: { $t: 'fonts.latin' }, fontSize: 22, fontWeight: '500', color: { $t: 'colors.ink' }, opacity: 0.4, letterSpacing: 2, lineHeight: 1.2, x: 88, y: 1780, width: 300, height: 30, zIndex: 20 },
      { id: 'ag-c-br', type: 'text', content: 'Aurora / 9:16', fontFamily: { $t: 'fonts.latin' }, fontSize: 22, fontWeight: '500', color: { $t: 'colors.ink' }, opacity: 0.4, letterSpacing: 2, textAlign: 'right', lineHeight: 1.2, x: 600, y: 1780, width: 392, height: 30, zIndex: 20 },
      // —— 顶层：细腻噪点 ——
      { id: 'ag-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1920, background: `url("${grainSoft(300, 33, 0.5)}")`, opacity: 0.06, mixBlendMode: 'soft-light', zIndex: 40 }
    ]
  }
]

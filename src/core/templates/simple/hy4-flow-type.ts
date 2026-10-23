// src/core/templates/simple/hy4-flow-type.ts —— 流动渐变大字 Flow Type（9:16）
// 流动语言：深色渐底 + 大流动色团 + 掠光横带 + 超大无衬线。
// HY4 标记：id / 导出名 / tags 带 hy4，底部小注嵌入「HY4 · FLOW STATE」。
import type { Template } from '@/types/types'
import { HEI, MONO, SANS, IMPACT, grain } from '../_fx/trend'

export const hy4FlowTypeTemplates: Template[] = [
  {
    id: 'hy4-flow-type', name: '流动大字', version: '1.0.0', category: 'simple',
    tags: ['hy4', 'simple', 'gradient', 'big type', 'flow', 'modern', '9:16'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="108" height="192" viewBox="0 0 108 192"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="%230F1230"/><stop offset="1" stop-color="%232A1050"/></linearGradient></defs><rect width="108" height="192" fill="url(%23g)"/><circle cx="30" cy="56" r="34" fill="%236D5BFF" opacity="0.6"/><circle cx="82" cy="110" r="30" fill="%2300D6C0" opacity="0.5"/><rect x="14" y="140" width="80" height="12" rx="6" fill="%23FFFFFF"/><rect x="14" y="158" width="52" height="9" rx="4.5" fill="%23FFFFFF" opacity="0.7"/></svg>',
    tokens: {
      colors: {
        bg: { label: '底', default: '#0F1230', options: ['#0F1230', '#141026', '#F4F1EA', '#08221F'] },
        ink: { label: '字', default: '#FFFFFF', options: ['#FFFFFF', '#F2F4FF', '#14131F', '#EAFFF9'] },
        flowA: { label: '流色一', default: '#6D5BFF', options: ['#6D5BFF', '#7C5CFF', '#FF7AB8', '#00B8A9'] },
        flowB: { label: '流色二', default: '#00D6C0', options: ['#00D6C0', '#38BDF8', '#FFC36B', '#5BE0A0'] },
        flowC: { label: '流色三', default: '#FF7AB8', options: ['#FF7AB8', '#FF9F6B', '#C4B5FD', '#FFD36B'] }
      },
      fonts: { heading: { label: '标题', default: IMPACT, options: [IMPACT, HEI, SANS] }, note: { label: '小字', default: MONO, options: [MONO, SANS] } }
    },
    presets: [
      { name: '夜流紫', colors: { bg: '#0F1230', ink: '#FFFFFF', flowA: '#6D5BFF', flowB: '#00D6C0', flowC: '#FF7AB8' } },
      { name: '深蓝流', colors: { bg: '#141026', ink: '#F2F4FF', flowA: '#7C5CFF', flowB: '#38BDF8', flowC: '#FF9F6B' } },
      { name: '纸面流', colors: { bg: '#F4F1EA', ink: '#14131F', flowA: '#FF7AB8', flowB: '#FFC36B', flowC: '#C4B5FD' } },
      { name: '湖水流', colors: { bg: '#08221F', ink: '#EAFFF9', flowA: '#00B8A9', flowB: '#5BE0A0', flowC: '#FFD36B' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1920, defaultWidth: 1080, defaultHeight: 1920, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      // 流动色团
      { id: 'hy4-fl-b1', group: 'hy4-fl-b', type: 'shape', shapeKind: 'circle', x: 40, y: 260, width: 700, height: 700, fill: { $t: 'colors.flowA' }, opacity: 0.55, zIndex: 2, animation: { name: 'drift', duration: 15000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'hy4-fl-b2', group: 'hy4-fl-b', type: 'shape', shapeKind: 'circle', x: 380, y: 720, width: 720, height: 720, fill: { $t: 'colors.flowB' }, opacity: 0.45, zIndex: 2, animation: { name: 'float', duration: 17000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'hy4-fl-b3', group: 'hy4-fl-b', type: 'shape', shapeKind: 'circle', x: 120, y: 1340, width: 620, height: 620, fill: { $t: 'colors.flowC' }, opacity: 0.32, zIndex: 2, animation: { name: 'drift', duration: 19000, delay: 600, iterationCount: 'infinite', easing: 'ease-in-out' } },
      // 掠光横带
      { id: 'hy4-fl-sweep', type: 'overlay', x: 0, y: 900, width: 1080, height: 260, background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.22) 50%, rgba(255,255,255,0) 100%)', zIndex: 5, animation: { name: 'gradientPan', duration: 7000, iterationCount: 'infinite', easing: 'linear' } },
      { id: 'hy4-fl-vig', type: 'overlay', x: 0, y: 0, width: 1080, height: 1920, background: 'radial-gradient(circle at 50% 42%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.42) 100%)', zIndex: 6 },
      // 文字
      { id: 'hy4-fl-kicker', type: 'text', content: 'FLOW STATE / 流动 · 第四辑', fontFamily: { $t: 'fonts.note' }, fontSize: 26, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.75, letterSpacing: 8, x: 110, y: 190, width: 850, height: 38, zIndex: 10, animation: { name: 'slideInLeft', duration: 700 } },
      { id: 'hy4-fl-title1', type: 'text', content: 'FLOW', fontFamily: { $t: 'fonts.heading' }, fontSize: 170, fontWeight: '900', color: { $t: 'colors.ink' }, letterSpacing: -4, x: 110, y: 1180, width: 860, height: 200, zIndex: 10, animation: { name: 'fadeInUp', duration: 900, delay: 180 }, editable: { content: true, fontSize: { type: 'range', min: 140, max: 190 } } },
      { id: 'hy4-fl-title2', type: 'text', content: 'STATE', fontFamily: { $t: 'fonts.heading' }, fontSize: 170, fontWeight: '900', color: { $t: 'colors.ink' }, opacity: 0.16, letterSpacing: -4, x: 110, y: 1370, width: 860, height: 200, zIndex: 10, animation: { name: 'fadeInUp', duration: 900, delay: 300 } },
      { id: 'hy4-fl-sub', type: 'text', content: '让颜色自己流动，字只是容器。', fontFamily: { $t: 'fonts.heading' }, fontSize: 36, color: { $t: 'colors.ink' }, opacity: 0.82, letterSpacing: 2, x: 110, y: 1620, width: 800, height: 52, zIndex: 10, animation: { name: 'rise', duration: 800, delay: 420 }, editable: { content: true } },
      { id: 'hy4-fl-hy', type: 'text', content: 'HY4 · FLOW STATE', fontFamily: { $t: 'fonts.note' }, fontSize: 22, color: { $t: 'colors.ink' }, opacity: 0.5, letterSpacing: 6, x: 110, y: 1800, width: 600, height: 30, zIndex: 10 },
      { id: 'hy4-fl-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1920, background: `url("${grain(320, 37, 0.5)}")`, opacity: 0.06, mixBlendMode: 'overlay', zIndex: 20 }
    ]
  }
]

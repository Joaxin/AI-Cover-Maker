// src/core/templates/cute/hy4-iridescent.ts —— 虹彩珠光 Iridescent（9:16）
// 珠光语言：柔粉渐底 + 虹彩环 + 高光泡泡 + 圆角胶囊标签。
// HY4 标记：id / 导出名 / tags 带 hy4，底部胶囊嵌入「HY4 · PEARL」。
import type { Template } from '@/types/types'
import { HEI, MONO, SANS, SERIF, grain } from '../_fx/trend'

export const hy4IridescentTemplates: Template[] = [
  {
    id: 'hy4-iridescent', name: '虹彩珠光', version: '1.0.0', category: 'cute',
    tags: ['hy4', 'cute', 'iridescent', 'pearl', 'holographic', 'soft', '9:16'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="108" height="192" viewBox="0 0 108 192"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="%23FFE3F1"/><stop offset="0.5" stop-color="%23E4E7FF"/><stop offset="1" stop-color="%23DDF6F2"/></linearGradient></defs><rect width="108" height="192" fill="url(%23g)"/><circle cx="54" cy="76" r="30" fill="none" stroke="%23FF9FD0" stroke-width="3" opacity="0.8"/><circle cx="54" cy="76" r="22" fill="none" stroke="%239BD8FF" stroke-width="2" opacity="0.75"/><circle cx="76" cy="40" r="7" fill="%23FFFFFF" opacity="0.9"/><rect x="26" y="150" width="56" height="9" rx="4.5" fill="%234A4460"/><rect x="36" y="166" width="36" height="7" rx="3.5" fill="%234A4460" opacity="0.5"/></svg>',
    tokens: {
      colors: {
        bg: { label: '底色', default: '#FFE3F1', options: ['#FFE3F1', '#E4E7FF', '#1B1830', '#DDF6F2'] },
        ink: { label: '文字', default: '#4A4460', options: ['#4A4460', '#3F3B57', '#F4EEFF', '#2F4A46'] },
        iris1: { label: '虹彩一', default: '#FF9FD0', options: ['#FF9FD0', '#F9A8FF', '#7FE7FF', '#FFC48F'] },
        iris2: { label: '虹彩二', default: '#9BD8FF', options: ['#9BD8FF', '#A5F3E0', '#FFB3C7', '#B7C4FF'] },
        iris3: { label: '虹彩三', default: '#C9B6FF', options: ['#C9B6FF', '#FFD9A0', '#8FE9D0', '#E0B3FF'] }
      },
      fonts: { heading: { label: '标题', default: HEI, options: [HEI, SERIF, SANS] }, note: { label: '小字', default: MONO, options: [MONO, SANS] } }
    },
    presets: [
      { name: '樱贝粉', colors: { bg: '#FFE3F1', ink: '#4A4460', iris1: '#FF9FD0', iris2: '#9BD8FF', iris3: '#C9B6FF' } },
      { name: '雾蓝贝', colors: { bg: '#E4E7FF', ink: '#3F3B57', iris1: '#F9A8FF', iris2: '#A5F3E0', iris3: '#FFD9A0' } },
      { name: '夜光贝', colors: { bg: '#1B1830', ink: '#F4EEFF', iris1: '#7FE7FF', iris2: '#FFB3C7', iris3: '#8FE9D0' } },
      { name: '薄荷贝', colors: { bg: '#DDF6F2', ink: '#2F4A46', iris1: '#FFC48F', iris2: '#B7C4FF', iris3: '#E0B3FF' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1920, defaultWidth: 1080, defaultHeight: 1920, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      // 渐变底
      { id: 'hy4-ir-bg', type: 'overlay', x: 0, y: 0, width: 1080, height: 1920, background: 'linear-gradient(160deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 46%)', zIndex: 2 },
      { id: 'hy4-ir-glow1', group: 'hy4-ir-glow', type: 'shape', shapeKind: 'circle', x: 80, y: 220, width: 620, height: 620, fill: { $t: 'colors.iris1' }, opacity: 0.34, zIndex: 3, animation: { name: 'drift', duration: 14000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'hy4-ir-glow2', group: 'hy4-ir-glow', type: 'shape', shapeKind: 'circle', x: 420, y: 700, width: 700, height: 700, fill: { $t: 'colors.iris2' }, opacity: 0.30, zIndex: 3, animation: { name: 'float', duration: 16000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'hy4-ir-glow3', group: 'hy4-ir-glow', type: 'shape', shapeKind: 'circle', x: 120, y: 1180, width: 560, height: 560, fill: { $t: 'colors.iris3' }, opacity: 0.26, zIndex: 3 },
      // 虹彩环（三层同心，无填充）
      { id: 'hy4-ir-ring1', group: 'hy4-ir-ring', type: 'shape', shapeKind: 'circle', x: 200, y: 470, width: 680, height: 680, fill: 'transparent', border: { width: 14, color: { $t: 'colors.iris1' } }, opacity: 0.85, zIndex: 5, animation: { name: 'gradientPan', duration: 9000, iterationCount: 'infinite', easing: 'linear' } },
      { id: 'hy4-ir-ring2', group: 'hy4-ir-ring', type: 'shape', shapeKind: 'circle', x: 280, y: 550, width: 520, height: 520, fill: 'transparent', border: { width: 10, color: { $t: 'colors.iris2' } }, opacity: 0.8, zIndex: 6, animation: { name: 'spinSlow', duration: 24000, iterationCount: 'infinite', easing: 'linear' } },
      { id: 'hy4-ir-ring3', group: 'hy4-ir-ring', type: 'shape', shapeKind: 'circle', x: 372, y: 642, width: 336, height: 336, fill: 'transparent', border: { width: 6, color: { $t: 'colors.iris3' } }, opacity: 0.75, zIndex: 7 },
      // 高光泡泡
      { id: 'hy4-ir-bub1', group: 'hy4-ir-bub', type: 'shape', shapeKind: 'circle', x: 840, y: 300, width: 130, height: 130, fill: { $t: 'colors.ink' }, opacity: 0.10, border: { width: 1.5, color: { $t: 'colors.ink' } }, zIndex: 8, animation: { name: 'float', duration: 9000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'hy4-ir-bub2', group: 'hy4-ir-bub', type: 'shape', shapeKind: 'circle', x: 120, y: 900, width: 90, height: 90, fill: { $t: 'colors.ink' }, opacity: 0.08, border: { width: 1.5, color: { $t: 'colors.ink' } }, zIndex: 8, animation: { name: 'drift', duration: 11000, delay: 400, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'hy4-ir-bub3', group: 'hy4-ir-bub', type: 'shape', shapeKind: 'circle', x: 900, y: 1120, width: 64, height: 64, fill: { $t: 'colors.ink' }, opacity: 0.07, zIndex: 8 },
      // 文字
      { id: 'hy4-ir-kicker', type: 'text', content: 'IRIDESCENT / 虹彩珠光', fontFamily: { $t: 'fonts.note' }, fontSize: 26, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.7, letterSpacing: 8, textAlign: 'center', x: 140, y: 190, width: 800, height: 38, zIndex: 10, animation: { name: 'fadeIn', duration: 700 } },
      { id: 'hy4-ir-title', type: 'text', content: '珠光的\n一次呼吸', fontFamily: { $t: 'fonts.heading' }, fontSize: 104, fontWeight: '800', color: { $t: 'colors.ink' }, lineHeight: 1.1, letterSpacing: 2, textAlign: 'center', x: 140, y: 1320, width: 800, height: 260, zIndex: 10, animation: { name: 'fadeInUp', duration: 900, delay: 200 }, editable: { content: true, fontSize: { type: 'range', min: 84, max: 116 } } },
      { id: 'hy4-ir-sub', type: 'text', content: '光落在贝壳上，就有了颜色。', fontFamily: { $t: 'fonts.heading' }, fontSize: 34, color: { $t: 'colors.ink' }, opacity: 0.76, letterSpacing: 2, textAlign: 'center', x: 140, y: 1620, width: 800, height: 50, zIndex: 10, animation: { name: 'rise', duration: 800, delay: 380 }, editable: { content: true } },
      // 胶囊标签
      { id: 'hy4-ir-pill', type: 'shape', shapeKind: 'rect', x: 390, y: 1730, width: 300, height: 76, fill: { $t: 'colors.iris1' }, opacity: 0.5, borderRadius: 38, zIndex: 9, animation: { name: 'pulse', duration: 4200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'hy4-ir-pill-t', type: 'text', content: 'HY4 · PEARL', fontFamily: { $t: 'fonts.note' }, fontSize: 24, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.8, letterSpacing: 5, textAlign: 'center', x: 390, y: 1754, width: 300, height: 34, zIndex: 11 },
      { id: 'hy4-ir-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1920, background: `url("${grain(320, 13, 0.45)}")`, opacity: 0.05, mixBlendMode: 'overlay', zIndex: 20 }
    ]
  }
]

// src/core/templates/tech/hy-liquid-glass.ts —— 流光玻璃 Liquid Glass（4:5）
// iOS 26 液态玻璃语言：深色极光 mesh 底 + 半透玻璃卡（底/描边/内高光/投影四件套）+ 漂浮玻璃球。
// HY 标记：id / 导出名 / tags 带 hy，画面左下角小注嵌入「HY · STUDIO NOTE」。
import type { Template } from '@/types/types'
import { HEI, MONO, SANS, SERIF, grain } from '../_fx/trend'

export const hyLiquidGlassTemplates: Template[] = [
  {
    id: 'hy-liquid-glass', name: '流光玻璃', version: '1.0.0', category: 'tech',
    tags: ['hy', 'tech', 'liquid glass', 'glassmorphism', 'aurora', 'soft ui', '4:5'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="108" height="135" viewBox="0 0 108 135"><rect width="108" height="135" fill="%230B1020"/><circle cx="34" cy="40" r="30" fill="%236D5BFF" opacity="0.5"/><circle cx="80" cy="70" r="26" fill="%232DD4BF" opacity="0.45"/><rect x="16" y="56" width="76" height="48" rx="11" fill="%23FFFFFF" opacity="0.12" stroke="%23FFFFFF" stroke-opacity="0.4"/><rect x="20" y="94" width="40" height="6" rx="3" fill="%23FFFFFF" opacity="0.85"/><rect x="20" y="106" width="24" height="4" rx="2" fill="%23FFFFFF" opacity="0.4"/></svg>',
    tokens: {
      colors: {
        bg: { label: '底色', default: '#0B1020', options: ['#0B1020', '#11131F', '#FAF7F2', '#0E1A17'] },
        ink: { label: '文字', default: '#F4F6FF', options: ['#F4F6FF', '#EAEAF2', '#1B1B22', '#0F2A24'] },
        accentA: { label: '极光一', default: '#6D5BFF', options: ['#6D5BFF', '#7C5CFF', '#FF8FB1', '#39C2A8'] },
        accentB: { label: '极光二', default: '#2DD4BF', options: ['#2DD4BF', '#38BDF8', '#FFC36B', '#5BD6C0'] },
        accentC: { label: '极光三', default: '#FB7A9C', options: ['#FB7A9C', '#FF9F6B', '#F6A8D4', '#FBD36B'] }
      },
      fonts: { heading: { label: '标题', default: HEI, options: [HEI, SANS, SERIF] }, mono: { label: '小字', default: MONO, options: [MONO, SANS] } }
    },
    presets: [
      { name: '夜蓝极光', colors: { bg: '#0B1020', ink: '#F4F6FF', accentA: '#6D5BFF', accentB: '#2DD4BF', accentC: '#FB7A9C' } },
      { name: '雾紫霜', colors: { bg: '#11131F', ink: '#EAEAF2', accentA: '#7C5CFF', accentB: '#38BDF8', accentC: '#FF9F6B' } },
      { name: '晨白杏', colors: { bg: '#FAF7F2', ink: '#1B1B22', accentA: '#FF8FB1', accentB: '#FFC36B', accentC: '#F6A8D4' } },
      { name: '湖石墨', colors: { bg: '#0E1A17', ink: '#0F2A24', accentA: '#39C2A8', accentB: '#5BD6C0', accentC: '#FBD36B' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'lg-glow-1', group: 'lg-glow-', type: 'shape', shapeKind: 'circle', x: 120, y: 150, width: 780, height: 780, fill: { $t: 'colors.accentA' }, opacity: 0.34, zIndex: 2, animation: { name: 'drift', duration: 12000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'lg-glow-2', group: 'lg-glow-', type: 'shape', shapeKind: 'circle', x: 520, y: 560, width: 700, height: 700, fill: { $t: 'colors.accentB' }, opacity: 0.30, zIndex: 2, animation: { name: 'float', duration: 14000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'lg-glow-3', group: 'lg-glow-', type: 'shape', shapeKind: 'circle', x: 280, y: 980, width: 560, height: 560, fill: { $t: 'colors.accentC' }, opacity: 0.22, zIndex: 2 },
      { id: 'lg-center', type: 'overlay', x: 0, y: 0, width: 1080, height: 1350, background: 'radial-gradient(circle at 50% 34%, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0) 60%)', zIndex: 3 },
      // —— 玻璃卡四件套 ——
      { id: 'lg-card', type: 'shape', shapeKind: 'rect', x: 110, y: 260, width: 860, height: 940, fill: { $t: 'colors.ink' }, opacity: 0.10, borderRadius: 44, zIndex: 4, shadow: { offsetX: 0, offsetY: 30, blur: 60, color: 'rgba(0,0,0,0.35)' }, animation: { name: 'fadeInUp', duration: 900 } },
      { id: 'lg-card-edge', type: 'shape', shapeKind: 'rect', x: 110, y: 260, width: 860, height: 940, fill: 'transparent', borderRadius: 44, border: { width: 1.5, color: { $t: 'colors.ink' } }, opacity: 0.5, zIndex: 5 },
      { id: 'lg-card-hi', type: 'overlay', x: 110, y: 260, width: 860, height: 940, background: 'linear-gradient(180deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.02) 46%)', borderRadius: 44, zIndex: 6 },
      // —— 文字 ——
      { id: 'lg-kicker', type: 'text', content: 'SOFT GLASS / 流光玻璃 · 2026', fontFamily: { $t: 'fonts.mono' }, fontSize: 24, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.78, letterSpacing: 8, x: 150, y: 340, width: 780, height: 36, zIndex: 8, animation: { name: 'slideInLeft', duration: 700 } },
      { id: 'lg-title', type: 'text', content: '通透\n之境', fontFamily: { $t: 'fonts.heading' }, fontSize: 104, fontWeight: '800', color: { $t: 'colors.ink' }, lineHeight: 1.06, letterSpacing: -3, x: 150, y: 880, width: 780, height: 240, zIndex: 8, animation: { name: 'fadeInUp', duration: 900, delay: 160 }, editable: { content: true, fontSize: { type: 'range', min: 84, max: 116 } } },
      { id: 'lg-sub', type: 'text', content: '玻璃不是材质，是光被安排的秩序。', fontFamily: { $t: 'fonts.heading' }, fontSize: 32, color: { $t: 'colors.ink' }, opacity: 0.82, letterSpacing: 2, lineHeight: 1.4, x: 150, y: 1140, width: 780, height: 48, zIndex: 8, animation: { name: 'rise', duration: 800, delay: 380 }, editable: { content: true } },
      { id: 'lg-hy', type: 'text', content: 'HY · STUDIO NOTE', fontFamily: { $t: 'fonts.mono' }, fontSize: 20, color: { $t: 'colors.ink' }, opacity: 0.5, letterSpacing: 5, x: 150, y: 1248, width: 420, height: 30, zIndex: 8 },
      // —— 漂浮玻璃球 ——
      { id: 'lg-orb-1', type: 'shape', shapeKind: 'circle', x: 812, y: 236, width: 150, height: 150, fill: { $t: 'colors.ink' }, opacity: 0.12, border: { width: 1.5, color: { $t: 'colors.ink' } }, zIndex: 7, animation: { name: 'float', duration: 9000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'lg-orb-2', type: 'shape', shapeKind: 'circle', x: 118, y: 1010, width: 104, height: 104, fill: { $t: 'colors.ink' }, opacity: 0.10, border: { width: 1.5, color: { $t: 'colors.ink' } }, zIndex: 7, animation: { name: 'drift', duration: 11000, delay: 600, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'lg-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1350, background: `url("${grain(300, 7, 0.55)}")`, opacity: 0.06, mixBlendMode: 'overlay', zIndex: 20 }
    ]
  }
]

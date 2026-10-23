// src/core/templates/event/hy-ticket-glass.ts —— 玻璃票券 Glass Ticket（9:16）
// 现代电子票根：深色 mesh 光晕 + 半透玻璃卡 + 左右半圆打孔 + 竖直虚线撕口 + 巨号日期 + 条码票号。
// HY 标记：id / 导出名 / tags 带 hy，票号嵌入「NO.HY-26041」。
import type { Template } from '@/types/types'
import { HEI, MONO, SANS, SERIF, grain } from '../_fx/trend'
import { svgUri } from '../_fx/common'

const perf = svgUri(`<line x1="540" y1="300" x2="540" y2="900" stroke="%23FFFFFF" stroke-width="5" stroke-dasharray="16 18"/>`, 1080, 1920)

export const hyTicketGlassTemplates: Template[] = [
  {
    id: 'hy-ticket-glass', name: '玻璃票券', version: '1.0.0', category: 'event',
    tags: ['hy', 'event', 'ticket', 'glassmorphism', 'admit one', '9:16'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="178" viewBox="0 0 100 178"><rect width="100" height="178" fill="%23101422"/><circle cx="30" cy="30" r="22" fill="%236D5BFF" opacity="0.5"/><circle cx="74" cy="120" r="26" fill="%232DD4BF" opacity="0.45"/><rect x="14" y="20" width="72" height="138" rx="10" fill="%23FFFFFF" opacity="0.12" stroke="%23FFFFFF" stroke-opacity="0.4"/><circle cx="14" cy="89" r="6" fill="%23101422"/><circle cx="86" cy="89" r="6" fill="%23101422"/><rect x="20" y="120" width="56" height="5" rx="2" fill="%23FFFFFF" opacity="0.85"/></svg>',
    tokens: {
      colors: {
        bg: { label: '底色', default: '#101422', options: ['#101422', '#16121F', '#0E1A17', '#1A1020'] },
        ink: { label: '文字', default: '#F2F4FF', options: ['#F2F4FF', '#EDEAF2', '#E8FBF4', '#FBEAF4'] },
        accentA: { label: '光斑一', default: '#6D5BFF', options: ['#6D5BFF', '#7C5CFF', '#39C2A8', '#FF7BC0'] },
        accentB: { label: '光斑二', default: '#2DD4BF', options: ['#2DD4BF', '#FF9F6B', '#5BD6C0', '#C084FC'] },
        accentC: { label: '光斑三', default: '#FB7A9C', options: ['#FB7A9C', '#38BDF8', '#FBD36B', '#F472B6'] }
      },
      fonts: { heading: { label: '标题', default: HEI, options: [HEI, SANS, SERIF] }, mono: { label: '小字', default: MONO, options: [MONO, SANS] } }
    },
    presets: [
      { name: '午夜紫', colors: { bg: '#101422', ink: '#F2F4FF', accentA: '#6D5BFF', accentB: '#2DD4BF', accentC: '#FB7A9C' } },
      { name: '焦糖可可', colors: { bg: '#16121F', ink: '#EDEAF2', accentA: '#7C5CFF', accentB: '#FF9F6B', accentC: '#38BDF8' } },
      { name: '竹林青', colors: { bg: '#0E1A17', ink: '#E8FBF4', accentA: '#39C2A8', accentB: '#5BD6C0', accentC: '#FBD36B' } },
      { name: '桃石英', colors: { bg: '#1A1020', ink: '#FBEAF4', accentA: '#FF7BC0', accentB: '#C084FC', accentC: '#F472B6' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1920, defaultWidth: 1080, defaultHeight: 1920, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'tk-glow-1', type: 'shape', shapeKind: 'circle', x: 80, y: 140, width: 720, height: 720, fill: { $t: 'colors.accentA' }, opacity: 0.30, zIndex: 2, animation: { name: 'drift', duration: 13000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'tk-glow-2', type: 'shape', shapeKind: 'circle', x: 460, y: 980, width: 700, height: 700, fill: { $t: 'colors.accentB' }, opacity: 0.26, zIndex: 2, animation: { name: 'float', duration: 15000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'tk-center', type: 'overlay', x: 0, y: 0, width: 1080, height: 1920, background: 'radial-gradient(circle at 50% 30%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 60%)', zIndex: 3 },
      // —— 票体四件套 ——
      { id: 'tk-card', type: 'shape', shapeKind: 'rect', x: 120, y: 200, width: 840, height: 1300, fill: { $t: 'colors.ink' }, opacity: 0.12, borderRadius: 36, zIndex: 4, shadow: { offsetX: 0, offsetY: 28, blur: 70, color: 'rgba(0,0,0,0.4)' }, animation: { name: 'fadeInUp', duration: 900 } },
      { id: 'tk-card-edge', type: 'shape', shapeKind: 'rect', x: 120, y: 200, width: 840, height: 1300, fill: 'transparent', borderRadius: 36, border: { width: 1.5, color: { $t: 'colors.ink' } }, opacity: 0.5, zIndex: 5 },
      { id: 'tk-card-hi', type: 'overlay', x: 120, y: 200, width: 840, height: 1300, background: 'linear-gradient(180deg, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.02) 44%)', borderRadius: 36, zIndex: 6 },
      // —— 左右半圆打孔（fill 同底色制造缺口）——
      { id: 'tk-hole-l', type: 'shape', shapeKind: 'circle', x: 65, y: 775, width: 110, height: 110, fill: { $t: 'colors.bg' }, zIndex: 7 },
      { id: 'tk-hole-r', type: 'shape', shapeKind: 'circle', x: 905, y: 775, width: 110, height: 110, fill: { $t: 'colors.bg' }, zIndex: 7 },
      // —— 竖直虚线撕口 ——
      { id: 'tk-perf', type: 'image', src: perf, x: 0, y: 0, width: 1080, height: 1920, opacity: 0.32, zIndex: 7 },
      // —— 文字（上半票）——
      { id: 'tk-kicker', type: 'text', content: 'ADMIT ONE / 入场券', fontFamily: { $t: 'fonts.mono' }, fontSize: 24, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.8, letterSpacing: 8, x: 168, y: 260, width: 744, height: 36, zIndex: 8, animation: { name: 'slideInLeft', duration: 700 } },
      { id: 'tk-date', type: 'text', content: '10·24', fontFamily: { $t: 'fonts.heading' }, fontSize: 190, fontWeight: '800', color: { $t: 'colors.ink' }, letterSpacing: -4, x: 168, y: 360, width: 744, height: 230, zIndex: 8, animation: { name: 'fadeInUp', duration: 900, delay: 120 }, editable: { content: true, fontSize: { type: 'range', min: 150, max: 210 } } },
      { id: 'tk-when', type: 'text', content: 'SAT · 19:30 开场', fontFamily: { $t: 'fonts.mono' }, fontSize: 30, color: { $t: 'colors.ink' }, opacity: 0.82, letterSpacing: 4, x: 168, y: 620, width: 744, height: 40, zIndex: 8 },
      // —— 文字（下半票）——
      { id: 'tk-title', type: 'text', content: '声音\n漫游', fontFamily: { $t: 'fonts.heading' }, fontSize: 84, fontWeight: '800', color: { $t: 'colors.ink' }, lineHeight: 1.05, letterSpacing: -2, x: 168, y: 960, width: 744, height: 230, zIndex: 8, animation: { name: 'fadeInUp', duration: 900, delay: 220 }, editable: { content: true, fontSize: { type: 'range', min: 66, max: 96 } } },
      { id: 'tk-sub', type: 'text', content: '一场关于夜晚与频率的现场', fontFamily: { $t: 'fonts.heading' }, fontSize: 30, color: { $t: 'colors.ink' }, opacity: 0.84, letterSpacing: 2, lineHeight: 1.4, x: 168, y: 1240, width: 744, height: 46, zIndex: 8, animation: { name: 'rise', duration: 800, delay: 380 }, editable: { content: true } },
      { id: 'tk-cta', type: 'shape', shapeKind: 'rect', x: 168, y: 1320, width: 260, height: 92, fill: { $t: 'colors.ink' }, opacity: 0.2, borderRadius: 46, zIndex: 7 },
      { id: 'tk-cta-t', type: 'text', content: 'VIP 区', fontFamily: { $t: 'fonts.heading' }, fontSize: 30, fontWeight: '700', color: { $t: 'colors.ink' }, textAlign: 'center', lineHeight: 3.07, x: 168, y: 1320, width: 260, height: 92, zIndex: 9, editable: { content: true } },
      { id: 'tk-no', type: 'text', content: 'NO.HY-26041', fontFamily: { $t: 'fonts.mono' }, fontSize: 22, color: { $t: 'colors.ink' }, opacity: 0.6, letterSpacing: 4, x: 168, y: 1430, width: 500, height: 30, zIndex: 8 },
      { id: 'tk-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1920, background: `url("${grain(300, 13, 0.55)}")`, opacity: 0.06, mixBlendMode: 'overlay', zIndex: 20 }
    ]
  }
]

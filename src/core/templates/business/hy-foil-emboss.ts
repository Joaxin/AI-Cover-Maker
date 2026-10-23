// src/core/templates/business/hy-foil-emboss.ts —— 烫金压凹 Foil Emboss（4:5）
// 高级名片 / 请柬质感：深色纸底 + 烫金字（亮层+暗层叠出金属高光，id 含 ghost 豁免 CLASH）
// + 双线凹凸细框 + 居中对称排版 + 大量留白。HY 标记：id / 导出名 / tags 带 hy，脚注嵌入「HY ATELIER」。
import type { Template } from '@/types/types'
import { HEI, MONO, SANS, SERIF, SONG, grain } from '../_fx/trend'

export const hyFoilEmbossTemplates: Template[] = [
  {
    id: 'hy-foil-emboss', name: '烫金压凹', version: '1.0.0', category: 'business',
    tags: ['hy', 'business', 'foil', 'emboss', 'luxury', 'serif', '4:5'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="108" height="135" viewBox="0 0 108 135"><rect width="108" height="135" fill="%23181410"/><rect x="12" y="14" width="84" height="107" rx="4" fill="none" stroke="%23C8A24B" stroke-width="1.4" stroke-opacity="0.8"/><text x="54" y="74" font-family="Georgia" font-size="18" font-weight="700" fill="%23E6C878" text-anchor="middle">GILD</text><text x="54" y="74" font-family="Georgia" font-size="18" font-weight="700" fill="%23000" fill-opacity="0.4" text-anchor="middle">GILD</text></svg>',
    tokens: {
      colors: {
        bg: { label: '纸底', default: '#181410', options: ['#181410', '#14201C', '#1A1410', '#101418'] },
        foil: { label: '烫金', default: '#E6C878', options: ['#E6C878', '#CFE0C2', '#E8C9A0', '#C9B6E8'] },
        foilDeep: { label: '金暗', default: '#8A6A2E', options: ['#8A6A2E', '#5E6E54', '#8A6A48', '#6A5E8A'] },
        ink: { label: '文字', default: '#EDE4D2', options: ['#EDE4D2', '#DCE6D6', '#EDE0CE', '#DEE2EC'] }
      },
      fonts: { heading: { label: '标题', default: SERIF, options: [SERIF, SONG, HEI] }, mono: { label: '小字', default: MONO, options: [MONO, SANS] } }
    },
    presets: [
      { name: '哑光金', colors: { bg: '#181410', foil: '#E6C878', foilDeep: '#8A6A2E', ink: '#EDE4D2' } },
      { name: '苔绿金', colors: { bg: '#14201C', foil: '#CFE0C2', foilDeep: '#5E6E54', ink: '#DCE6D6' } },
      { name: '可可金', colors: { bg: '#1A1410', foil: '#E8C9A0', foilDeep: '#8A6A48', ink: '#EDE0CE' } },
      { name: '暗紫金', colors: { bg: '#101418', foil: '#C9B6E8', foilDeep: '#6A5E8A', ink: '#DEE2EC' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'fe-vignette', type: 'overlay', x: 0, y: 0, width: 1080, height: 1350, background: 'radial-gradient(circle at 50% 42%, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.4) 100%)', zIndex: 2 },
      // —— 双线凹凸细框 ——
      { id: 'fe-frame-out', type: 'shape', shapeKind: 'rect', x: 96, y: 96, width: 888, height: 1158, fill: 'transparent', borderRadius: 8, border: { width: 2, color: { $t: 'colors.foil' } }, opacity: 0.55, zIndex: 4 },
      { id: 'fe-frame-in', type: 'shape', shapeKind: 'rect', x: 112, y: 112, width: 856, height: 1126, fill: 'transparent', borderRadius: 6, border: { width: 1, color: { $t: 'colors.foilDeep' } }, opacity: 0.5, zIndex: 4 },
      // —— 烫金主标（暗层 + 亮层，ghost 豁免 CLASH）——
      { id: 'fe-title-ghost', type: 'text', content: '鎏金\n一刻', fontFamily: { $t: 'fonts.heading' }, fontSize: 132, fontWeight: '700', color: { $t: 'colors.foilDeep' }, lineHeight: 1.08, letterSpacing: 6, x: 96, y: 470, width: 888, height: 320, textAlign: 'center', zIndex: 6, animation: { name: 'fadeInUp', duration: 900 } },
      { id: 'fe-title', type: 'text', content: '鎏金\n一刻', fontFamily: { $t: 'fonts.heading' }, fontSize: 132, fontWeight: '700', color: { $t: 'colors.foil' }, lineHeight: 1.08, letterSpacing: 6, x: 96, y: 462, width: 888, height: 320, textAlign: 'center', zIndex: 7, animation: { name: 'fadeInUp', duration: 900, delay: 80 }, editable: { content: true, fontSize: { type: 'range', min: 104, max: 148 } } },
      // —— 分隔细线 ——
      { id: 'fe-rule', type: 'shape', shapeKind: 'line', x: 440, y: 830, width: 200, height: 2, fill: { $t: 'colors.foil' }, opacity: 0.6, zIndex: 6 },
      // —— 文字 ——
      { id: 'fe-kicker', type: 'text', content: 'INVITATION · 诚邀莅临', fontFamily: { $t: 'fonts.mono' }, fontSize: 24, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.8, letterSpacing: 10, textAlign: 'center', x: 96, y: 380, width: 888, height: 34, zIndex: 8, animation: { name: 'fadeIn', duration: 800 } },
      { id: 'fe-sub', type: 'text', content: '把时间，压成一片可触摸的光泽。', fontFamily: { $t: 'fonts.heading' }, fontSize: 34, color: { $t: 'colors.ink' }, opacity: 0.86, letterSpacing: 3, lineHeight: 1.4, textAlign: 'center', x: 140, y: 880, width: 800, height: 50, zIndex: 8, animation: { name: 'rise', duration: 800, delay: 280 }, editable: { content: true } },
      { id: 'fe-foot', type: 'text', content: 'HY ATELIER / 2026 春', fontFamily: { $t: 'fonts.mono' }, fontSize: 22, color: { $t: 'colors.ink' }, opacity: 0.55, letterSpacing: 6, textAlign: 'center', x: 96, y: 1180, width: 888, height: 32, zIndex: 8 },
      { id: 'fe-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1350, background: `url("${grain(300, 19, 0.55)}")`, opacity: 0.06, mixBlendMode: 'overlay', zIndex: 20 }
    ]
  }
]

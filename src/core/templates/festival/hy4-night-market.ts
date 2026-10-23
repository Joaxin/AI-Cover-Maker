// src/core/templates/festival/hy4-night-market.ts —— 夜市霓虹 Night Market（4:5）
// 夜市语言：暖暗底 + 灯串 + 发光招牌（描边+投影）+ 灯笼 + 热气团。
// HY4 标记：id / 导出名 / tags 带 hy4，招牌角标嵌入「HY4 · 夜市」。
import type { Template } from '@/types/types'
import { HEI, MONO, SANS, SERIF, grain } from '../_fx/trend'

export const hy4NightMarketTemplates: Template[] = [
  {
    id: 'hy4-night-market', name: '夜市霓虹', version: '1.0.0', category: 'festival',
    tags: ['hy4', 'festival', 'night market', 'neon sign', 'lantern', 'warm', '4:5'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="108" height="135" viewBox="0 0 108 135"><rect width="108" height="135" fill="%231A1016"/><rect x="6" y="22" width="96" height="2" fill="%236B5A46"/><g fill="%23FFD98A"><circle cx="18" cy="26" r="3"/><circle cx="38" cy="26" r="3"/><circle cx="58" cy="26" r="3"/><circle cx="78" cy="26" r="3"/><circle cx="98" cy="26" r="3"/></g><rect x="16" y="46" width="76" height="42" rx="8" fill="none" stroke="%23FF6B4A" stroke-width="2.5"/><rect x="26" y="60" width="56" height="6" rx="3" fill="%23FFE9C7"/><rect x="32" y="74" width="44" height="5" rx="2.5" fill="%23FFB37A"/><circle cx="30" cy="106" r="9" fill="%23E8462F" opacity="0.85"/><circle cx="78" cy="104" r="7" fill="%23FFB347" opacity="0.8"/></svg>',
    tokens: {
      colors: {
        bg: { label: '夜色', default: '#1A1016', options: ['#1A1016', '#20130F', '#0E1420', '#231A14'] },
        ink: { label: '暖白字', default: '#FFE9C7', options: ['#FFE9C7', '#FFF3E0', '#F6E7D8', '#FFEFD5'] },
        neon: { label: '霓虹', default: '#FF6B4A', options: ['#FF6B4A', '#FF8A5C', '#FF4D6D', '#FFA24A'] },
        lamp: { label: '灯光', default: '#FFD98A', options: ['#FFD98A', '#FFC86B', '#FFE3A8', '#FFCB57'] },
        deep: { label: '暗部', default: '#2A1A20', options: ['#2A1A20', '#33201A', '#16202E', '#33251B'] }
      },
      fonts: { heading: { label: '标题', default: HEI, options: [HEI, SERIF] }, note: { label: '小字', default: MONO, options: [MONO, SANS] } }
    },
    presets: [
      { name: '炭火夜', colors: { bg: '#1A1016', ink: '#FFE9C7', neon: '#FF6B4A', lamp: '#FFD98A', deep: '#2A1A20' } },
      { name: '糖炒夜', colors: { bg: '#20130F', ink: '#FFF3E0', neon: '#FF8A5C', lamp: '#FFC86B', deep: '#33201A' } },
      { name: '冷巷夜', colors: { bg: '#0E1420', ink: '#F6E7D8', neon: '#FF4D6D', lamp: '#FFE3A8', deep: '#16202E' } },
      { name: '橘灯夜', colors: { bg: '#231A14', ink: '#FFEFD5', neon: '#FFA24A', lamp: '#FFCB57', deep: '#33251B' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      // 夜色渐层
      { id: 'hy4-nm-vig', type: 'overlay', x: 0, y: 0, width: 1080, height: 1350, background: 'radial-gradient(circle at 50% 42%, rgba(255,180,120,0.18) 0%, rgba(0,0,0,0) 62%)', zIndex: 2 },
      // 灯串
      { id: 'hy4-nm-wire', type: 'shape', shapeKind: 'rect', x: 60, y: 210, width: 960, height: 3, fill: { $t: 'colors.deep' }, opacity: 0.9, zIndex: 4 },
      { id: 'hy4-nm-l1', group: 'hy4-nm-l', type: 'shape', shapeKind: 'circle', x: 130, y: 226, width: 44, height: 44, fill: { $t: 'colors.lamp' }, opacity: 0.95, zIndex: 5, animation: { name: 'twinkle', duration: 2600, iterationCount: 'infinite' } },
      { id: 'hy4-nm-l2', group: 'hy4-nm-l', type: 'shape', shapeKind: 'circle', x: 310, y: 226, width: 44, height: 44, fill: { $t: 'colors.lamp' }, opacity: 0.95, zIndex: 5, animation: { name: 'twinkle', duration: 3000, delay: 200, iterationCount: 'infinite' } },
      { id: 'hy4-nm-l3', group: 'hy4-nm-l', type: 'shape', shapeKind: 'circle', x: 490, y: 226, width: 44, height: 44, fill: { $t: 'colors.lamp' }, opacity: 0.95, zIndex: 5, animation: { name: 'twinkle', duration: 2800, delay: 400, iterationCount: 'infinite' } },
      { id: 'hy4-nm-l4', group: 'hy4-nm-l', type: 'shape', shapeKind: 'circle', x: 670, y: 226, width: 44, height: 44, fill: { $t: 'colors.lamp' }, opacity: 0.95, zIndex: 5, animation: { name: 'twinkle', duration: 3200, delay: 600, iterationCount: 'infinite' } },
      { id: 'hy4-nm-l5', group: 'hy4-nm-l', type: 'shape', shapeKind: 'circle', x: 850, y: 226, width: 44, height: 44, fill: { $t: 'colors.lamp' }, opacity: 0.95, zIndex: 5, animation: { name: 'twinkle', duration: 2900, delay: 800, iterationCount: 'infinite' } },
      // 发光招牌
      { id: 'hy4-nm-board', type: 'shape', shapeKind: 'rect', x: 110, y: 400, width: 860, height: 480, fill: { $t: 'colors.deep' }, opacity: 0.75, borderRadius: 28, border: { width: 4, color: { $t: 'colors.neon' } }, zIndex: 6, shadow: { offsetX: 0, offsetY: 0, blur: 70, color: { $t: 'colors.neon' } }, animation: { name: 'glow', duration: 4600, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'hy4-nm-board-inner', type: 'shape', shapeKind: 'rect', x: 150, y: 440, width: 780, height: 400, fill: 'transparent', borderRadius: 20, border: { width: 1.5, color: { $t: 'colors.lamp' } }, opacity: 0.45, zIndex: 7 },
      // 招牌文字
      { id: 'hy4-nm-title', type: 'text', content: '夜市', fontFamily: { $t: 'fonts.heading' }, fontSize: 190, fontWeight: '900', color: { $t: 'colors.ink' }, letterSpacing: 12, textAlign: 'center', x: 150, y: 520, width: 780, height: 220, zIndex: 9, animation: { name: 'blink', duration: 5200, iterationCount: 'infinite' }, editable: { content: true, fontSize: { type: 'range', min: 150, max: 210 } } },
      { id: 'hy4-nm-title-sub', type: 'text', content: 'NIGHT MARKET', fontFamily: { $t: 'fonts.note' }, fontSize: 34, fontWeight: '700', color: { $t: 'colors.lamp' }, opacity: 0.9, letterSpacing: 10, textAlign: 'center', x: 150, y: 752, width: 780, height: 46, zIndex: 9, animation: { name: 'fadeIn', duration: 700, delay: 300 } },
      // 角标
      { id: 'hy4-nm-badge', type: 'text', content: 'HY4 · 夜市', fontFamily: { $t: 'fonts.note' }, fontSize: 20, color: { $t: 'colors.lamp' }, opacity: 0.7, letterSpacing: 4, x: 168, y: 800, width: 300, height: 28, zIndex: 9 },
      // 灯笼与热气
      { id: 'hy4-nm-lantern1', type: 'shape', shapeKind: 'circle', x: 150, y: 980, width: 150, height: 150, fill: { $t: 'colors.neon' }, opacity: 0.9, zIndex: 8, shadow: { offsetX: 0, offsetY: 0, blur: 50, color: { $t: 'colors.neon' } }, animation: { name: 'float', duration: 10000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'hy4-nm-lantern2', type: 'shape', shapeKind: 'circle', x: 800, y: 940, width: 110, height: 110, fill: { $t: 'colors.lamp' }, opacity: 0.85, zIndex: 8, shadow: { offsetX: 0, offsetY: 0, blur: 40, color: { $t: 'colors.lamp' } }, animation: { name: 'float', duration: 12000, delay: 500, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'hy4-nm-steam1', type: 'shape', shapeKind: 'circle', x: 420, y: 1040, width: 260, height: 260, fill: { $t: 'colors.ink' }, opacity: 0.07, zIndex: 7, animation: { name: 'drift', duration: 14000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'hy4-nm-steam2', type: 'shape', shapeKind: 'circle', x: 560, y: 1120, width: 200, height: 200, fill: { $t: 'colors.ink' }, opacity: 0.05, zIndex: 7, animation: { name: 'drift', duration: 16000, delay: 700, iterationCount: 'infinite', easing: 'ease-in-out' } },
      // 底部文字
      { id: 'hy4-nm-kicker', type: 'text', content: 'OPEN 18:00 — 01:00', fontFamily: { $t: 'fonts.note' }, fontSize: 26, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.75, letterSpacing: 6, textAlign: 'center', x: 140, y: 1230, width: 800, height: 36, zIndex: 9, animation: { name: 'fadeIn', duration: 700, delay: 400 } },
      { id: 'hy4-nm-foot', type: 'text', content: '热气、灯串、和一句「再来一份」。', fontFamily: { $t: 'fonts.heading' }, fontSize: 32, color: { $t: 'colors.ink' }, opacity: 0.8, letterSpacing: 2, textAlign: 'center', x: 140, y: 1276, width: 800, height: 46, zIndex: 9, animation: { name: 'rise', duration: 800, delay: 500 }, editable: { content: true } },
      { id: 'hy4-nm-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1350, background: `url("${grain(320, 47, 0.5)}")`, opacity: 0.07, mixBlendMode: 'overlay', zIndex: 20 }
    ]
  }
]

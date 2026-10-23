// src/core/templates/cute/trend-bubbly-candy.ts
// 当红趋势批 → 归入「可爱风」（cute） ｜ 4. 泡泡糖立体字（4:5）
// 迁移自 src/core/templates/trend/：模板内容、素材函数与外观保持不变，只改分类归属。
import type { Template } from '@/types/types'
import { SANS, HEI, SONG, MONO, IMPACT, halftone, star } from '../_fx/trend'

export const trendBubblyCandyTemplates: Template[] = [
  {
    id: 'trend-bubbly-candy', name: '泡泡糖立体字', version: '1.0.0', category: 'cute',
    tags: ['trend', 'bubbly', '3d text', 'candy', 'playful', '4:5'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="108" height="135" viewBox="0 0 108 135"><rect width="108" height="135" fill="%23FFF0F5"/><circle cx="26" cy="30" r="18" fill="%23F9A8D4" opacity="0.5"/><rect x="18" y="52" width="72" height="16" rx="8" fill="%23A78BFA"/><rect x="22" y="48" width="72" height="16" rx="8" fill="%23F472B6"/><rect x="18" y="80" width="46" height="12" rx="6" fill="%2322D3EE"/><path d="M84 92 l4 10 10 4 -10 4 -4 10 -4 -10 -10 -4 10 -4 z" fill="%23FDE047"/></svg>',
    tokens: {
      colors: {
        bg: { label: '底色', default: '#FFF0F5', options: ['#FFF0F5', '#F0F9FF', '#FEF9C3', '#111827'] },
        ink: { label: '文字', default: '#3B1E4E', options: ['#3B1E4E', '#0F172A', '#7C2D12', '#F8FAFC'] },
        candy: { label: '泡泡面', default: '#F472B6', options: ['#F472B6', '#A78BFA', '#22D3EE', '#FDBA74'] },
        pop: { label: '投影层', default: '#A78BFA', options: ['#A78BFA', '#F472B6', '#FB7185', '#38BDF8'] }
      },
      fonts: { latin: { label: '泡泡体', default: '"Arial Rounded MT Bold", "Trebuchet MS", Helvetica, sans-serif', options: ['"Arial Rounded MT Bold", "Trebuchet MS", Helvetica, sans-serif', IMPACT, SANS] }, cjk: { label: '中文体', default: HEI, options: [HEI, SONG, MONO] } }
    },
    presets: [
      { name: '草莓奶昔', colors: { bg: '#FFF0F5', ink: '#3B1E4E', candy: '#F472B6', pop: '#A78BFA' } },
      { name: '芋泥奶茶', colors: { bg: '#F0F9FF', ink: '#0F172A', candy: '#A78BFA', pop: '#38BDF8' } },
      { name: '橘子汽水', colors: { bg: '#FEF9C3', ink: '#7C2D12', candy: '#FDBA74', pop: '#FB7185' } },
      { name: '暗夜糖果', colors: { bg: '#111827', ink: '#F8FAFC', candy: '#22D3EE', pop: '#F472B6' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'bc-blob-a', type: 'shape', shapeKind: 'circle', x: -140, y: -120, width: 480, height: 480, fill: { $t: 'colors.candy' }, opacity: 0.34, zIndex: 1, animation: { name: 'float', duration: 7000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'bc-blob-b', type: 'shape', shapeKind: 'circle', x: 800, y: 210, width: 420, height: 420, fill: { $t: 'colors.pop' }, opacity: 0.3, zIndex: 1, animation: { name: 'float', duration: 8600, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'bc-blob-c', type: 'shape', shapeKind: 'circle', x: 60, y: 1090, width: 360, height: 360, fill: { $t: 'colors.candy' }, opacity: 0.26, zIndex: 1 },
      { id: 'bc-kicker', type: 'text', content: 'SWEET TALK · 今日糖分超标', fontFamily: { $t: 'fonts.cjk' }, fontSize: 30, fontWeight: '900', color: { $t: 'colors.ink' }, opacity: 0.7, letterSpacing: 3, textAlign: 'center', x: 90, y: 128, width: 900, height: 42, zIndex: 6, animation: { name: 'slideUpFade', duration: 600 }, editable: { content: true } },
      { id: 'bc-l1-shadow', type: 'text', content: 'CUTIE', fontFamily: { $t: 'fonts.latin' }, fontSize: 228, fontWeight: '900', color: { $t: 'colors.pop' }, letterSpacing: -2, textAlign: 'center', x: 100, y: 236, width: 880, height: 240, zIndex: 3, animation: { name: 'zoomIn', duration: 620 } },
      { id: 'bc-l1-off', type: 'text', content: 'CUTIE', fontFamily: { $t: 'fonts.latin' }, fontSize: 228, fontWeight: '900', color: { $t: 'colors.pop' }, letterSpacing: -2, textAlign: 'center', x: 92, y: 216, width: 880, height: 240, zIndex: 4 },
      { id: 'bc-l1', type: 'text', content: 'CUTIE', fontFamily: { $t: 'fonts.latin' }, fontSize: 228, fontWeight: '900', color: { $t: 'colors.candy' }, letterSpacing: -2, textAlign: 'center', x: 84, y: 198, width: 880, height: 240, zIndex: 5, animation: { name: 'heartbeat', duration: 5200, iterationCount: 'infinite', easing: 'ease-in-out' }, editable: { content: true, fontSize: { type: 'range', min: 150, max: 260 } } },
      { id: 'bc-l1-hi', type: 'text', content: 'CUTIE', fontFamily: { $t: 'fonts.latin' }, fontSize: 228, fontWeight: '900', color: { $t: 'colors.bg' }, opacity: 0.55, letterSpacing: -2, textAlign: 'center', x: 78, y: 186, width: 880, height: 240, zIndex: 6 },
      { id: 'bc-cn-shadow', type: 'text', content: '甜 到 冒 泡', fontFamily: { $t: 'fonts.cjk' }, fontSize: 96, fontWeight: '900', color: { $t: 'colors.pop' }, letterSpacing: 6, textAlign: 'center', x: 112, y: 512, width: 880, height: 128, zIndex: 4 },
      { id: 'bc-cn', type: 'text', content: '甜 到 冒 泡', fontFamily: { $t: 'fonts.cjk' }, fontSize: 96, fontWeight: '900', color: { $t: 'colors.ink' }, letterSpacing: 6, textAlign: 'center', x: 104, y: 496, width: 880, height: 128, zIndex: 5, animation: { name: 'wobble', duration: 6200, iterationCount: 'infinite', easing: 'ease-in-out' }, editable: { content: true } },
      { id: 'bc-bubble-1', type: 'shape', shapeKind: 'circle', x: 150, y: 700, width: 92, height: 92, fill: { $t: 'colors.bg' }, border: { width: 6, color: { $t: 'colors.candy' } }, zIndex: 5, animation: { name: 'rise', duration: 1400, delay: 200 } },
      { id: 'bc-bubble-2', type: 'shape', shapeKind: 'circle', x: 252, y: 736, width: 46, height: 46, fill: { $t: 'colors.pop' }, zIndex: 5, animation: { name: 'rise', duration: 1400, delay: 340 } },
      { id: 'bc-note', type: 'text', content: '把话说软一点，人就愿意听完一句。\n圆润的字形自带滤镜效果。', fontFamily: { $t: 'fonts.cjk' }, fontSize: 32, color: { $t: 'colors.ink' }, opacity: 0.8, lineHeight: 1.75, x: 330, y: 690, width: 620, height: 128, zIndex: 5, animation: { name: 'fadeIn', duration: 700, delay: 420 }, editable: { content: true } },
      { id: 'bc-card', type: 'shape', shapeKind: 'rect', x: 104, y: 880, width: 872, height: 190, fill: { $t: 'colors.bg' }, border: { width: 7, color: { $t: 'colors.ink' } }, borderRadius: 96, zIndex: 4 },
      { id: 'bc-card-t', type: 'text', content: '本周主推 · 莓莓气泡 · 芋泥波波', fontFamily: { $t: 'fonts.cjk' }, fontSize: 40, fontWeight: '900', color: { $t: 'colors.ink' }, textAlign: 'center', lineHeight: 4.7, x: 104, y: 880, width: 872, height: 190, zIndex: 6, editable: { content: true } },
      { id: 'bc-star-1', type: 'image', src: star(150, '%23FDE047'), x: 856, y: 1062, width: 150, height: 150, zIndex: 6, animation: { name: 'sparkle', duration: 3200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'bc-star-2', type: 'image', src: star(96, '%23F472B6'), x: 128, y: 916, width: 96, height: 96, zIndex: 7, animation: { name: 'twinkle', duration: 2600, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'bc-foot', type: 'text', content: 'SUGAR LEVEL 100% · 2026', fontFamily: { $t: 'fonts.latin' }, fontSize: 24, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.5, letterSpacing: 6, textAlign: 'center', x: 90, y: 1180, width: 900, height: 32, zIndex: 5 },
      { id: 'bc-dots', type: 'image', src: halftone(1080, 1350, 3, 60, '%233B1E4E'), x: 0, y: 0, width: 1080, height: 1350, objectFit: 'fill', opacity: 0.08, zIndex: 2 }
    ]
  }
]

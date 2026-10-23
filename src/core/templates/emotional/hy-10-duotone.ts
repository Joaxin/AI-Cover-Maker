// src/core/templates/emotional/hy-10-duotone.ts
// HY 系列 · 双色调情绪影像（1080×1920 9:16）｜复古冲印感 duotone 摄影海报
import type { Template } from '@/types/types'
import { SANS, HEI, MONO, grainSoft, aura } from '../_fx/trend'

export const hy10DuotoneTemplates: Template[] = [
  {
    id: 'hy-10-duotone', name: '双色调情绪', version: '1.0.0', category: 'emotional',
    tags: ['hy', 'duotone', '双色调', 'film', '情绪', '9:16'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="178" viewBox="0 0 100 178"><rect width="100" height="178" fill="%2308171F"/><circle cx="46" cy="60" r="26" fill="%230E4E63"/><circle cx="56" cy="66" r="26" fill="%23F0A868" opacity="0.85"/><rect x="10" y="104" width="80" height="2" fill="%23F0A868" opacity="0.6"/><rect x="10" y="122" width="56" height="7" rx="3.5" fill="%23E8F4F6"/><rect x="10" y="134" width="38" height="5" rx="2.5" fill="%23E8F4F6" opacity="0.5"/><rect x="10" y="150" width="30" height="10" rx="5" fill="%23123240"/><circle cx="72" cy="155" r="3" fill="%23F0A868"/></svg>',
    tokens: {
      colors: {
        bg: { label: '底片底色', default: '#08171F', options: ['#08171F', '#2A1206', '#2B1A24', '#0C211C', '#111319'] },
        ink: { label: '文字', default: '#E8F4F6', options: ['#E8F4F6', '#FFF1E2', '#FDEBF2', '#E6F6EF', '#F3F4F6'] },
        accent: { label: '暗部色', default: '#0E4E63', options: ['#0E4E63', '#7A2E12', '#6E3450', '#12503F', '#2A2F45'] },
        accent2: { label: '亮部色', default: '#F0A868', options: ['#F0A868', '#FFB057', '#F7B9CE', '#9FE7C8', '#C9B6FF'] },
        surface: { label: '面板', default: '#123240', options: ['#123240', '#3D1C0C', '#3B2432', '#16332B', '#1B1E27'] }
      },
      fonts: {
        display: { label: '英文', default: SANS, options: [SANS, MONO] },
        cjk: { label: '中文', default: HEI, options: [HEI, SANS] },
        mono: { label: '等宽', default: MONO, options: [MONO, SANS] }
      }
    },
    presets: [
      { name: '午夜青', colors: { bg: '#08171F', ink: '#E8F4F6', accent: '#0E4E63', accent2: '#F0A868', surface: '#123240' } },
      { name: '落日橙', colors: { bg: '#2A1206', ink: '#FFF1E2', accent: '#7A2E12', accent2: '#FFB057', surface: '#3D1C0C' } },
      { name: '雾粉', colors: { bg: '#2B1A24', ink: '#FDEBF2', accent: '#6E3450', accent2: '#F7B9CE', surface: '#3B2432' } },
      { name: '薄荷绿', colors: { bg: '#0C211C', ink: '#E6F6EF', accent: '#12503F', accent2: '#9FE7C8', surface: '#16332B' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1920, defaultWidth: 1080, defaultHeight: 1920, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      // —— 底层柔光团（跟随 token 的同心圆，等价于径向渐变）——
      ...aura('dt-halo', 540, 640, 470, 'colors.accent2', 5),
      ...aura('dt-halo2', 340, 1180, 300, 'colors.accent', 4),
      // —— 影像暗示：几何色块 ——
      { id: 'dt-frame', type: 'shape', shapeKind: 'rect', x: 96, y: 300, width: 888, height: 820, fill: 'transparent', border: { width: 2, color: { $t: 'colors.accent2' } }, opacity: 0.32, zIndex: 4 },
      { id: 'dt-slit', type: 'shape', shapeKind: 'rect', x: 620, y: 330, width: 120, height: 760, fill: { $t: 'colors.accent' }, opacity: 0.3, zIndex: 4 },
      { id: 'dt-slit-2', type: 'shape', shapeKind: 'rect', x: 782, y: 330, width: 46, height: 700, fill: { $t: 'colors.accent2' }, opacity: 0.22, zIndex: 4 },
      { id: 'dt-disc-echo', type: 'shape', shapeKind: 'circle', x: 360, y: 470, width: 520, height: 520, fill: { $t: 'colors.accent' }, opacity: 0.62, zIndex: 5 },
      { id: 'dt-disc', type: 'shape', shapeKind: 'circle', x: 300, y: 430, width: 520, height: 520, fill: { $t: 'colors.accent2' }, opacity: 0.9, zIndex: 6, animation: { name: 'float', duration: 9000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'dt-disc-ring', type: 'shape', shapeKind: 'circle', x: 250, y: 380, width: 640, height: 640, fill: 'transparent', border: { width: 3, color: { $t: 'colors.accent2' } }, opacity: 0.45, zIndex: 6, animation: { name: 'pulse', duration: 12000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'dt-bar-1', group: 'dt-bar-', type: 'shape', shapeKind: 'rect', x: 96, y: 980, width: 888, height: 14, fill: { $t: 'colors.accent2' }, opacity: 0.5, zIndex: 7 },
      { id: 'dt-bar-2', group: 'dt-bar-', type: 'shape', shapeKind: 'rect', x: 96, y: 1014, width: 520, height: 8, fill: { $t: 'colors.accent' }, opacity: 0.6, zIndex: 7 },
      { id: 'dt-bar-3', group: 'dt-bar-', type: 'shape', shapeKind: 'rect', x: 96, y: 1042, width: 300, height: 6, fill: { $t: 'colors.accent2' }, opacity: 0.4, zIndex: 7 },
      { id: 'dt-corner-a', type: 'shape', shapeKind: 'rect', x: 96, y: 300, width: 44, height: 4, fill: { $t: 'colors.accent2' }, opacity: 0.62, zIndex: 7 },
      { id: 'dt-corner-b', type: 'shape', shapeKind: 'rect', x: 96, y: 300, width: 4, height: 44, fill: { $t: 'colors.accent2' }, opacity: 0.62, zIndex: 7 },
      { id: 'dt-corner-c', type: 'shape', shapeKind: 'rect', x: 940, y: 1116, width: 44, height: 4, fill: { $t: 'colors.accent2' }, opacity: 0.62, zIndex: 7 },
      { id: 'dt-corner-d', type: 'shape', shapeKind: 'rect', x: 980, y: 1072, width: 4, height: 48, fill: { $t: 'colors.accent2' }, opacity: 0.62, zIndex: 7 },
      // —— 双色冲印：overlay 渐变 / 柔光 / 暗角 ——
      { id: 'dt-glow', type: 'overlay', x: 0, y: 0, width: 1080, height: 1920, background: 'radial-gradient(52% 30% at 50% 27%, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0) 72%)', zIndex: 7 },
      { id: 'dt-wash', type: 'overlay', x: 0, y: 0, width: 1080, height: 1920, background: 'linear-gradient(165deg, rgba(240,168,104,0.55) 0%, rgba(14,78,99,0.30) 52%, rgba(240,168,104,0.26) 100%)', mixBlendMode: 'soft-light', opacity: 0.9, zIndex: 8 },
      { id: 'dt-wash-2', type: 'overlay', x: 0, y: 0, width: 1080, height: 1920, background: 'linear-gradient(200deg, rgba(255,255,255,0) 28%, rgba(255,255,255,0.10) 50%, rgba(255,255,255,0) 72%)', mixBlendMode: 'screen', zIndex: 8 },
      { id: 'dt-vig', type: 'overlay', x: 0, y: 0, width: 1080, height: 1920, background: 'radial-gradient(120% 92% at 50% 42%, rgba(0,0,0,0) 44%, rgba(0,0,0,0.46) 100%)', mixBlendMode: 'multiply', zIndex: 9 },
      // —— 文字（左对齐统一 x=96）——
      { id: 'dt-kicker', type: 'text', content: 'DUOTONE / 情绪冲印', fontFamily: { $t: 'fonts.mono' }, fontSize: 24, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.75, letterSpacing: 5, lineHeight: 1.2, x: 96, y: 112, width: 888, height: 40, zIndex: 10, animation: { name: 'fadeIn', duration: 700 }, editable: { content: true } },
      { id: 'dt-no', type: 'text', content: 'Nº 10 / 2026', fontFamily: { $t: 'fonts.display' }, fontSize: 20, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.6, letterSpacing: 4, lineHeight: 1.2, textAlign: 'right', x: 96, y: 116, width: 888, height: 34, zIndex: 10, animation: { name: 'fadeIn', duration: 700, delay: 120 } },
      { id: 'dt-cap', type: 'text', content: '底片 NO.10 · 双色冲印', fontFamily: { $t: 'fonts.mono' }, fontSize: 22, fontWeight: '600', color: { $t: 'colors.ink' }, opacity: 0.72, letterSpacing: 2, lineHeight: 1.2, x: 96, y: 1120, width: 500, height: 34, zIndex: 10, animation: { name: 'slideInLeft', duration: 700, delay: 140 } },
      { id: 'dt-watermark', type: 'text', content: '10', fontFamily: { $t: 'fonts.display' }, fontSize: 200, fontWeight: '800', color: { $t: 'colors.accent2' }, opacity: 0.08, letterSpacing: 0, lineHeight: 1.2, textAlign: 'right', x: 96, y: 560, width: 888, height: 240, zIndex: 5 },
      { id: 'dt-title', type: 'text', content: '在两色之间\n藏一整个夏天', fontFamily: { $t: 'fonts.cjk' }, fontSize: 96, fontWeight: '700', color: { $t: 'colors.ink' }, lineHeight: 1.3, letterSpacing: 2, x: 96, y: 1268, width: 888, height: 290, zIndex: 11, animation: { name: 'fadeInUp', duration: 900, delay: 180 }, editable: { content: true, fontSize: { type: 'range', min: 72, max: 116 } } },
      { id: 'dt-en', type: 'text', content: 'TWO COLORS · ONE MOOD', fontFamily: { $t: 'fonts.display' }, fontSize: 28, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.7, letterSpacing: 3, lineHeight: 1.2, x: 96, y: 1560, width: 888, height: 44, zIndex: 11, animation: { name: 'rise', duration: 800, delay: 260 } },
      { id: 'dt-sub', type: 'text', content: '光落在暗部，才叫情绪。', fontFamily: { $t: 'fonts.cjk' }, fontSize: 38, fontWeight: '500', color: { $t: 'colors.ink' }, opacity: 0.86, lineHeight: 1.6, x: 96, y: 1630, width: 888, height: 76, zIndex: 11, animation: { name: 'rise', duration: 800, delay: 320 }, editable: { content: true } },
      { id: 'dt-pill', type: 'shape', shapeKind: 'rect', x: 96, y: 1730, width: 372, height: 96, fill: { $t: 'colors.surface' }, borderRadius: 48, zIndex: 10 },
      { id: 'dt-pill-t', type: 'text', content: '把这张收好', fontFamily: { $t: 'fonts.cjk' }, fontSize: 32, fontWeight: '700', color: { $t: 'colors.ink' }, lineHeight: 3, letterSpacing: 2, textAlign: 'center', x: 96, y: 1730, width: 372, height: 96, zIndex: 11, editable: { content: true } },
      { id: 'dt-foot', type: 'text', content: 'STUDIO HY · DUOTONE SERIES', fontFamily: { $t: 'fonts.mono' }, fontSize: 20, fontWeight: '600', color: { $t: 'colors.ink' }, opacity: 0.6, letterSpacing: 2, lineHeight: 1.2, textAlign: 'right', x: 96, y: 1760, width: 888, height: 30, zIndex: 11, animation: { name: 'fadeIn', duration: 700, delay: 380 }, editable: { content: true } },
      // —— 胶片质感 ——
      { id: 'dt-scan', type: 'overlay', x: 0, y: 0, width: 1080, height: 1920, background: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.035) 0px, rgba(255,255,255,0.035) 1px, rgba(0,0,0,0) 1px, rgba(0,0,0,0) 4px)', opacity: 0.6, zIndex: 13 },
      { id: 'dt-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1920, background: `url("${grainSoft(300, 23, 0.55)}")`, opacity: 0.09, mixBlendMode: 'multiply', zIndex: 14 }
    ]
  }
]

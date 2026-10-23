// src/core/templates/art/hy-03-chrome-liquid.ts
// HY 署名批 → 艺术风（art） ｜ 液态铬金属（1080×1350 竖版 4:5）
// 冷银与钢蓝光带托起流动的镀铬形体，用高反差标题和精密 UI 标记呈现 2026 液态金属视觉。
import type { Template } from '@/types/types'
import { HEI, IMPACT, MONO, SANS, grainSoft } from '../_fx/trend'

export const hy03ChromeLiquidTemplates: Template[] = [
  {
    schemaVersion: 1,
    id: 'hy-03-chrome-liquid', name: '液态铬金', version: '1.0.0', category: 'art',
    tags: ['hy', 'chrome liquid', 'liquid metal', 'metallic', 'editorial', '4:5'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="125" viewBox="0 0 100 125"><rect width="100" height="125" fill="%230A0D14"/><rect x="-14" y="62" width="126" height="18" rx="9" fill="%236E86A6" transform="rotate(-18 50 71)" opacity="0.7"/><ellipse cx="72" cy="58" rx="31" ry="23" fill="%23D9E6F2" transform="rotate(-17 72 58)"/><ellipse cx="73" cy="51" rx="18" ry="7" fill="%23FFFFFF" opacity="0.55" transform="rotate(-17 73 51)"/><rect x="9" y="13" width="59" height="12" rx="2" fill="%23F4F7FF"/><rect x="9" y="29" width="46" height="12" rx="2" fill="%23F4F7FF"/><rect x="9" y="103" width="36" height="4" rx="2" fill="%2392A8FF"/><circle cx="87" cy="105" r="6" fill="%23D9E6F2"/></svg>',
    tokens: {
      colors: {
        bg: { label: '深空底色', default: '#0A0D14', options: ['#0A0D14', '#07070B', '#160D15', '#090C0F'] },
        ink: { label: '高反差文字', default: '#F4F7FF', options: ['#F4F7FF', '#F5F3FF', '#FFF2F8', '#E7ECEF'] },
        metal: { label: '镜面金属', default: '#D9E6F2', options: ['#D9E6F2', '#BFC2D1', '#E9C9DA', '#89939C'] },
        steel: { label: '钢蓝阴影', default: '#6E86A6', options: ['#6E86A6', '#53596D', '#9C6684', '#39434B'] },
        accent: { label: '电镀高光', default: '#92A8FF', options: ['#92A8FF', '#7C5CFF', '#FF8BC4', '#67D4E1'] },
        surface: { label: '界面面板', default: '#151C2B', options: ['#151C2B', '#15131D', '#2B1525', '#151B1F'] }
      },
      fonts: {
        display: { label: '冲击标题', default: IMPACT, options: [IMPACT, SANS, HEI] },
        cjk: { label: '中文正文', default: HEI, options: [HEI, SANS] },
        mono: { label: '参数小字', default: MONO, options: [MONO, SANS] }
      }
    },
    presets: [
      { name: '极地银', colors: { bg: '#0A0D14', ink: '#F4F7FF', metal: '#D9E6F2', steel: '#6E86A6', accent: '#92A8FF', surface: '#151C2B' } },
      { name: '暗夜铬', colors: { bg: '#07070B', ink: '#F5F3FF', metal: '#BFC2D1', steel: '#53596D', accent: '#7C5CFF', surface: '#15131D' } },
      { name: '玫瑰镀', colors: { bg: '#160D15', ink: '#FFF2F8', metal: '#E9C9DA', steel: '#9C6684', accent: '#FF8BC4', surface: '#2B1525' } },
      { name: '钛黑', colors: { bg: '#090C0F', ink: '#E7ECEF', metal: '#89939C', steel: '#39434B', accent: '#67D4E1', surface: '#151B1F' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      // —— 底层：冷银 / 钢蓝流光与暗紫空间 ——
      { id: 'chrome-bg-glow', type: 'overlay', x: 0, y: 0, width: 1080, height: 1350, background: 'radial-gradient(circle at 78% 32%, rgba(146,168,255,0.22) 0%, rgba(104,82,154,0.10) 34%, rgba(0,0,0,0) 68%)', zIndex: 1 },
      { id: 'chrome-band-a', type: 'shape', shapeKind: 'rect', x: 48, y: 650, width: 984, height: 190, fill: { $t: 'colors.steel' }, borderRadius: 95, opacity: 0.38, rotation: -17, zIndex: 2 },
      { id: 'chrome-band-a-light', type: 'overlay', x: 48, y: 650, width: 984, height: 190, background: 'linear-gradient(180deg, rgba(255,255,255,0.34) 0%, rgba(255,255,255,0.04) 38%, rgba(0,0,0,0.30) 100%)', borderRadius: 95, opacity: 0.78, rotation: -17, mixBlendMode: 'screen', zIndex: 3 },
      { id: 'chrome-band-b', type: 'shape', shapeKind: 'rect', x: 48, y: 846, width: 984, height: 72, fill: { $t: 'colors.accent' }, borderRadius: 36, opacity: 0.22, rotation: -17, zIndex: 2 },
      { id: 'chrome-grid-v', type: 'shape', shapeKind: 'rect', x: 846, y: 56, width: 1, height: 1190, fill: { $t: 'colors.ink' }, opacity: 0.14, zIndex: 2 },
      { id: 'chrome-grid-h', type: 'shape', shapeKind: 'rect', x: 48, y: 1042, width: 984, height: 1, fill: { $t: 'colors.ink' }, opacity: 0.14, zIndex: 2 },

      // —— 中层：多段镜面流体与高光切面 ——
      { id: 'chrome-blob-main-shadow', type: 'shape', shapeKind: 'circle', x: 342, y: 346, width: 690, height: 510, fill: { $t: 'colors.bg' }, opacity: 0.58, rotation: -16, zIndex: 4, shadow: { offsetX: 0, offsetY: 38, blur: 70, color: 'rgba(0,0,0,0.52)' } },
      { id: 'chrome-blob-main', type: 'shape', shapeKind: 'circle', x: 342, y: 310, width: 690, height: 510, fill: { $t: 'colors.metal' }, rotation: -16, zIndex: 5, shadow: { offsetX: -12, offsetY: 20, blur: 42, color: 'rgba(0,0,0,0.42)' }, animation: { name: 'float', duration: 9800, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'chrome-blob-main-highlight', type: 'overlay', x: 342, y: 310, width: 690, height: 510, background: 'radial-gradient(ellipse at 38% 24%, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.48) 16%, rgba(255,255,255,0.03) 38%, rgba(8,12,24,0.58) 68%, rgba(255,255,255,0.38) 100%)', borderRadius: 255, opacity: 0.92, rotation: -16, mixBlendMode: 'overlay', zIndex: 6 },
      { id: 'chrome-blob-main-edge', type: 'shape', shapeKind: 'circle', x: 342, y: 310, width: 690, height: 510, fill: 'transparent', border: { width: 2, color: { $t: 'colors.ink' } }, opacity: 0.48, rotation: -16, zIndex: 7 },
      { id: 'chrome-blob-left', type: 'shape', shapeKind: 'circle', x: 48, y: 630, width: 590, height: 430, fill: { $t: 'colors.steel' }, rotation: 18, zIndex: 5, shadow: { offsetX: 18, offsetY: 26, blur: 54, color: 'rgba(0,0,0,0.44)' }, animation: { name: 'drift', duration: 11200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'chrome-blob-left-highlight', type: 'overlay', x: 48, y: 630, width: 590, height: 430, background: 'radial-gradient(ellipse at 64% 26%, rgba(255,255,255,0.76) 0%, rgba(255,255,255,0.16) 28%, rgba(0,0,0,0.42) 74%, rgba(255,255,255,0.26) 100%)', borderRadius: 215, opacity: 0.84, rotation: 18, mixBlendMode: 'screen', zIndex: 6 },
      { id: 'chrome-ribbon', type: 'shape', shapeKind: 'rect', x: 206, y: 760, width: 690, height: 122, fill: { $t: 'colors.metal' }, borderRadius: 61, rotation: -29, zIndex: 7, shadow: { offsetX: 0, offsetY: 24, blur: 38, color: 'rgba(0,0,0,0.36)' } },
      { id: 'chrome-ribbon-highlight', type: 'overlay', x: 206, y: 760, width: 690, height: 122, background: 'linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.12) 40%, rgba(0,0,0,0.42) 74%, rgba(255,255,255,0.52) 100%)', borderRadius: 61, rotation: -29, mixBlendMode: 'overlay', zIndex: 8 },
      { id: 'chrome-drop-1', group: 'chrome-drop-', type: 'shape', shapeKind: 'circle', x: 858, y: 794, width: 150, height: 150, fill: { $t: 'colors.metal' }, zIndex: 7, shadow: { offsetX: 0, offsetY: 20, blur: 32, color: 'rgba(0,0,0,0.40)' }, animation: { name: 'float', duration: 7600, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'chrome-drop-1-highlight', type: 'overlay', x: 858, y: 794, width: 150, height: 150, background: 'radial-gradient(circle at 34% 26%, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.18) 34%, rgba(0,0,0,0.48) 72%, rgba(255,255,255,0.28) 100%)', borderRadius: 75, mixBlendMode: 'overlay', zIndex: 8 },
      { id: 'chrome-drop-2', group: 'chrome-drop-', type: 'shape', shapeKind: 'circle', x: 768, y: 914, width: 66, height: 66, fill: { $t: 'colors.accent' }, opacity: 0.88, zIndex: 8, animation: { name: 'pulse', duration: 5200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'chrome-drop-3', group: 'chrome-drop-', type: 'shape', shapeKind: 'circle', x: 924, y: 700, width: 42, height: 42, fill: { $t: 'colors.ink' }, opacity: 0.72, zIndex: 8 },
      { id: 'chrome-orbit', type: 'shape', shapeKind: 'circle', x: 730, y: 654, width: 292, height: 292, fill: 'transparent', border: { width: 2, style: 'dashed', color: { $t: 'colors.accent' } }, opacity: 0.68, rotation: -10, zIndex: 8, animation: { name: 'spinSlow', duration: 26000, iterationCount: 'infinite', easing: 'linear' } },
      { id: 'chrome-core', type: 'shape', shapeKind: 'circle', x: 86, y: 858, width: 166, height: 166, fill: { $t: 'colors.surface' }, border: { width: 2, color: { $t: 'colors.metal' } }, zIndex: 8 },
      { id: 'chrome-core-highlight', type: 'overlay', x: 86, y: 858, width: 166, height: 166, background: 'radial-gradient(circle at 36% 30%, rgba(255,255,255,0.62) 0%, rgba(255,255,255,0.05) 34%, rgba(0,0,0,0.38) 100%)', borderRadius: 83, zIndex: 9 },
      { id: 'chrome-spark-h', type: 'shape', shapeKind: 'rect', x: 934, y: 294, width: 78, height: 4, fill: { $t: 'colors.ink' }, opacity: 0.76, zIndex: 9, animation: { name: 'twinkle', duration: 3400, iterationCount: 'infinite' } },
      { id: 'chrome-spark-v', type: 'shape', shapeKind: 'rect', x: 971, y: 257, width: 4, height: 78, fill: { $t: 'colors.ink' }, opacity: 0.76, zIndex: 9, animation: { name: 'twinkle', duration: 3400, iterationCount: 'infinite' } },

      // —— 顶层：高对比标题、真实感文案与 UI 标记 ——
      { id: 'chrome-kicker', type: 'text', content: 'MATERIAL FORECAST / 2026', fontFamily: { $t: 'fonts.mono' }, fontSize: 22, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 5, x: 88, y: 84, width: 650, height: 36, zIndex: 12, animation: { name: 'slideInLeft', duration: 720 } },
      { id: 'chrome-issue', type: 'text', content: 'ISSUE 03', fontFamily: { $t: 'fonts.mono' }, fontSize: 22, fontWeight: '700', color: { $t: 'colors.ink' }, textAlign: 'right', letterSpacing: 4, x: 804, y: 84, width: 188, height: 36, opacity: 0.72, zIndex: 12 },
      { id: 'chrome-title-ghost', type: 'text', content: 'LIQUID\nCHROME', fontFamily: { $t: 'fonts.display' }, fontSize: 164, fontWeight: '900', color: { $t: 'colors.accent' }, lineHeight: 1, letterSpacing: -2, x: 102, y: 176, width: 890, height: 360, opacity: 0.20, zIndex: 10 },
      { id: 'chrome-title', type: 'text', content: 'LIQUID\nCHROME', fontFamily: { $t: 'fonts.display' }, fontSize: 164, fontWeight: '900', color: { $t: 'colors.ink' }, lineHeight: 1, letterSpacing: -2, x: 88, y: 162, width: 904, height: 360, zIndex: 12, shadow: { offsetX: 0, offsetY: 10, blur: 36, color: 'rgba(0,0,0,0.48)' }, animation: { name: 'fadeInUp', duration: 860 }, editable: { content: true, fontSize: { type: 'range', min: 130, max: 178 } } },
      { id: 'chrome-sub', type: 'text', content: '把未来感，调到最高亮度', fontFamily: { $t: 'fonts.cjk' }, fontSize: 46, fontWeight: '800', color: { $t: 'colors.ink' }, lineHeight: 1.2, letterSpacing: 2, x: 88, y: 550, width: 700, height: 68, zIndex: 12, animation: { name: 'rise', duration: 820, delay: 180 }, editable: { content: true } },
      { id: 'chrome-divider', type: 'shape', shapeKind: 'rect', x: 88, y: 640, width: 252, height: 5, fill: { $t: 'colors.accent' }, zIndex: 11 },
      { id: 'chrome-body', type: 'text', content: '这次不讲温柔。\n让冷银高光顺着曲面一路流下来。', fontFamily: { $t: 'fonts.cjk' }, fontSize: 34, fontWeight: '600', color: { $t: 'colors.ink' }, lineHeight: 1.45, letterSpacing: 1, x: 88, y: 1090, width: 650, height: 116, opacity: 0.88, zIndex: 12, animation: { name: 'fadeInUp', duration: 880, delay: 320 }, editable: { content: true } },
      { id: 'chrome-pill', type: 'shape', shapeKind: 'rect', x: 786, y: 1090, width: 206, height: 66, fill: { $t: 'colors.surface' }, borderRadius: 33, border: { width: 2, color: { $t: 'colors.accent' } }, zIndex: 11 },
      { id: 'chrome-pill-text', type: 'text', content: '冷调已加载', fontFamily: { $t: 'fonts.cjk' }, fontSize: 26, fontWeight: '700', color: { $t: 'colors.ink' }, textAlign: 'center', lineHeight: 2.5, x: 786, y: 1090, width: 206, height: 66, zIndex: 12 },
      { id: 'chrome-footer', type: 'text', content: 'HY · VISUAL MATERIAL LAB', fontFamily: { $t: 'fonts.mono' }, fontSize: 20, fontWeight: '700', color: { $t: 'colors.ink' }, letterSpacing: 4, x: 88, y: 1260, width: 600, height: 30, opacity: 0.54, zIndex: 12 },
      { id: 'chrome-footer-code', type: 'text', content: 'CR / 03—26', fontFamily: { $t: 'fonts.mono' }, fontSize: 20, fontWeight: '700', color: { $t: 'colors.accent' }, textAlign: 'right', letterSpacing: 3, x: 792, y: 1260, width: 200, height: 30, zIndex: 12 },
      { id: 'chrome-corner-tl-h', type: 'shape', shapeKind: 'rect', x: 48, y: 48, width: 32, height: 4, fill: { $t: 'colors.ink' }, opacity: 0.5, zIndex: 12 },
      { id: 'chrome-corner-tl-v', type: 'shape', shapeKind: 'rect', x: 48, y: 48, width: 4, height: 32, fill: { $t: 'colors.ink' }, opacity: 0.5, zIndex: 12 },
      { id: 'chrome-corner-br-h', type: 'shape', shapeKind: 'rect', x: 1000, y: 1298, width: 32, height: 4, fill: { $t: 'colors.ink' }, opacity: 0.5, zIndex: 12 },
      { id: 'chrome-corner-br-v', type: 'shape', shapeKind: 'rect', x: 1028, y: 1270, width: 4, height: 32, fill: { $t: 'colors.ink' }, opacity: 0.5, zIndex: 12 },
      { id: 'chrome-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1350, background: `url("${grainSoft(320, 73, 0.52)}")`, opacity: 0.055, mixBlendMode: 'overlay', zIndex: 20 }
    ]
  }
]

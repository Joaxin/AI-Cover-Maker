// src/core/templates/retro/hy-06-y2k-holo.ts —— 全息千禧 Holographic Y2K（4:5 竖版）
// 千禧风回潮：全息箔 shimmer（粉紫青银多彩渐变）+ 星光点缀 + 圆润泡泡字 + 亮银描边 + 低饱和糖果底。
// HY 标记：id / 导出名 / tags 带 hy，脚注嵌入「HY HOLO SERIES / 2026」。
// 注意：渐变一律写在 type:'overlay' 的 background 上；shape.fill 只放纯色 / rgba / token。
import type { Template } from '@/types/types'
import { SANS, HEI, SONG, MONO, grainSoft, star, starfield } from '../_fx/trend'

const TITLE = '千禧回潮\n真香现场'
const TITLE_X = 88
const TITLE_Y = 286
const TITLE_W = 904
const TITLE_H = 400

export const hy06Y2kHoloTemplates: Template[] = [
  {
    schemaVersion: 1,
    id: 'hy-06-y2k-holo',
    name: '全息千禧',
    version: '1.0.0',
    category: 'retro',
    tags: ['hy', 'retro', 'y2k', 'holographic', 'foil', 'candy', '4:5'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="125" viewBox="0 0 100 125"><rect width="100" height="125" fill="%23F6EEFA"/><circle cx="70" cy="34" r="24" fill="%23FF86CB" opacity="0.55"/><circle cx="28" cy="70" r="18" fill="%237FD6F5" opacity="0.6"/><circle cx="66" cy="46" r="26" fill="none" stroke="%23EFE7F8" stroke-width="3"/><rect x="12" y="88" width="76" height="18" rx="9" fill="%23FF86CB" opacity="0.35"/><rect x="18" y="94" width="46" height="6" rx="3" fill="%2333194A"/><polygon points="84,74 87,82 95,85 87,88 84,96 81,88 73,85 81,82" fill="%23FFFFFF"/><rect x="12" y="112" width="34" height="5" rx="2.5" fill="%2333194A" opacity="0.5"/></svg>',
    tokens: {
      colors: {
        bg: { label: '底色', default: '#F6EEFA', options: ['#F6EEFA', '#E8EBF1', '#FDEEF2', '#E9FBF4'] },
        ink: { label: '文字', default: '#33194A', options: ['#33194A', '#141A2C', '#4A1F31', '#0E3B31'] },
        accent: { label: '全息粉', default: '#FF86CB', options: ['#FF86CB', '#A9BEEC', '#FF7FA8', '#5FE3C0'] },
        accent2: { label: '全息青', default: '#7FD6F5', options: ['#7FD6F5', '#5FD8E0', '#FFC9DE', '#8FD9FF'] },
        surface: { label: '面板', default: '#FDE6F4', options: ['#FDE6F4', '#F4F6FB', '#FFF3F7', '#F0FDF8'] },
        foil: { label: '亮银箔', default: '#EFE7F8', options: ['#EFE7F8', '#FFFFFF', '#F6DCE8', '#DDF6EF'] }
      },
      fonts: {
        cjk: { label: '中文体', default: HEI, options: [HEI, SONG, MONO] },
        latin: { label: '英文体', default: SANS, options: [SANS, MONO] }
      }
    },
    presets: [
      {
        name: '糖果箔',
        colors: { bg: '#F6EEFA', ink: '#33194A', accent: '#FF86CB', accent2: '#7FD6F5', surface: '#FDE6F4', foil: '#EFE7F8' }
      },
      {
        name: '赛博银',
        colors: { bg: '#E8EBF1', ink: '#141A2C', accent: '#A9BEEC', accent2: '#5FD8E0', surface: '#F4F6FB', foil: '#FFFFFF' }
      },
      {
        name: '樱粉',
        colors: { bg: '#FDEEF2', ink: '#4A1F31', accent: '#FF7FA8', accent2: '#FFC9DE', surface: '#FFF3F7', foil: '#F6DCE8' }
      },
      {
        name: '薄荷波',
        colors: { bg: '#E9FBF4', ink: '#0E3B31', accent: '#5FE3C0', accent2: '#8FD9FF', surface: '#F0FDF8', foil: '#DDF6EF' }
      }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      // —— 底层：全息箔渐变 + 糖果光斑 ——
      {
        id: 'hy-y2k-bg-foil', type: 'overlay', x: 0, y: 0, width: 1080, height: 1350,
        background: 'linear-gradient(155deg, rgba(255,150,214,0.55) 0%, rgba(178,148,255,0.45) 30%, rgba(126,214,246,0.50) 58%, rgba(255,255,255,0.60) 100%)',
        opacity: 0.6, zIndex: 1
      },
      { id: 'hy-y2k-orb-1', type: 'shape', shapeKind: 'circle', x: 612, y: 196, width: 400, height: 400, fill: { $t: 'colors.accent' }, opacity: 0.5, zIndex: 2, animation: { name: 'float', duration: 11000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'hy-y2k-orb-2', type: 'shape', shapeKind: 'circle', x: 128, y: 520, width: 300, height: 300, fill: { $t: 'colors.accent2' }, opacity: 0.45, zIndex: 2, animation: { name: 'drift', duration: 14000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'hy-y2k-bubble-1', type: 'shape', shapeKind: 'circle', x: 930, y: 700, width: 90, height: 90, fill: { $t: 'colors.foil' }, border: { width: 3, color: 'rgba(255,255,255,0.85)' }, zIndex: 2, animation: { name: 'pulse', duration: 5200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'hy-y2k-bubble-2', type: 'shape', shapeKind: 'circle', x: 100, y: 980, width: 64, height: 64, fill: { $t: 'colors.accent' }, opacity: 0.55, zIndex: 2, animation: { name: 'float', duration: 8600, iterationCount: 'infinite', easing: 'ease-in-out' } },

      // —— 中层：shimmer 光带 / 星点 / 银环 ——
      {
        id: 'hy-y2k-holo-band', type: 'overlay', x: 88, y: 250, width: 904, height: 420, borderRadius: 44,
        background: 'linear-gradient(115deg, rgba(255,143,208,0.55) 0%, rgba(167,139,250,0.42) 34%, rgba(125,214,245,0.48) 66%, rgba(255,255,255,0.50) 100%)',
        opacity: 0.8, zIndex: 3, animation: { name: 'gradientPan', duration: 9000, iterationCount: 'infinite', easing: 'ease-in-out' }
      },
      { id: 'hy-y2k-stars', type: 'overlay', x: 120, y: 170, width: 840, height: 560, background: `url("${starfield(840, 560, 44, '%23FFFFFF', 2026)}")`, opacity: 0.9, zIndex: 4 },
      { id: 'hy-y2k-ring', type: 'shape', shapeKind: 'circle', x: 760, y: 330, width: 230, height: 230, fill: 'transparent', border: { width: 12, color: { $t: 'colors.foil' } }, opacity: 0.85, zIndex: 4, animation: { name: 'spinSlow', duration: 26000, iterationCount: 'infinite', easing: 'linear' } },
      { id: 'hy-y2k-mark', type: 'shape', shapeKind: 'rect', x: 940, y: 88, width: 48, height: 48, borderRadius: 12, fill: { $t: 'colors.foil' }, border: { width: 3, color: 'rgba(255,255,255,0.9)' }, rotation: 12, zIndex: 4 },

      // —— 泡泡字：银箔描边（halo / ghost 豁免压字检查）——
      { id: 'hy-y2k-title-halo', type: 'text', content: TITLE, fontFamily: { $t: 'fonts.cjk' }, fontSize: 158, fontWeight: '800', color: { $t: 'colors.foil' }, lineHeight: 1.16, letterSpacing: 4, x: TITLE_X, y: TITLE_Y - 4, width: TITLE_W, height: TITLE_H, zIndex: 5 },
      { id: 'hy-y2k-title-ghost-1', type: 'text', content: TITLE, fontFamily: { $t: 'fonts.cjk' }, fontSize: 150, fontWeight: '800', color: { $t: 'colors.accent' }, lineHeight: 1.16, letterSpacing: 4, x: TITLE_X, y: TITLE_Y + 8, width: TITLE_W, height: TITLE_H, zIndex: 6 },
      {
        id: 'hy-y2k-title', type: 'text', content: TITLE, fontFamily: { $t: 'fonts.cjk' }, fontSize: 150, fontWeight: '800',
        color: { $t: 'colors.ink' }, lineHeight: 1.16, letterSpacing: 4, x: TITLE_X, y: TITLE_Y, width: TITLE_W, height: TITLE_H,
        zIndex: 8, animation: { name: 'fadeInUp', duration: 900 },
        editable: { content: true, fontSize: { type: 'range', min: 110, max: 170 } }
      },

      // —— 贴纸徽章 ——
      { id: 'hy-y2k-badge', type: 'shape', shapeKind: 'rect', x: 760, y: 228, width: 190, height: 110, borderRadius: 55, fill: { $t: 'colors.accent2' }, border: { width: 4, color: 'rgba(255,255,255,0.92)' }, rotation: 8, zIndex: 7, animation: { name: 'wobble', duration: 7000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'hy-y2k-badge-t', type: 'text', content: '全息贴纸', fontFamily: { $t: 'fonts.cjk' }, fontSize: 34, fontWeight: '700', color: { $t: 'colors.ink' }, textAlign: 'center', lineHeight: 2.5, x: 760, y: 228, width: 190, height: 110, rotation: 8, zIndex: 9 },
      { id: 'hy-y2k-star-1', group: 'hy-y2k-star-', type: 'image', src: star(88, '%23FFFFFF'), x: 846, y: 612, width: 88, height: 88, zIndex: 7, opacity: 0.92, animation: { name: 'twinkle', duration: 3400, iterationCount: 'infinite' } },
      { id: 'hy-y2k-star-2', group: 'hy-y2k-star-', type: 'image', src: star(72, '%23FFFFFF'), x: 156, y: 196, width: 72, height: 72, zIndex: 7, opacity: 0.85, animation: { name: 'twinkle', duration: 4200, delay: 400, iterationCount: 'infinite' } },
      { id: 'hy-y2k-star-3', group: 'hy-y2k-star-', type: 'image', src: star(64, '%23FFFFFF'), x: 916, y: 900, width: 64, height: 64, zIndex: 7, opacity: 0.8, animation: { name: 'sparkle', duration: 5000, delay: 800, iterationCount: 'infinite' } },

      // —— 顶层：眉条与编号 ——
      { id: 'hy-y2k-kicker', type: 'text', content: 'HOLOGRAPHIC Y2K / 全息千禧', fontFamily: { $t: 'fonts.latin' }, fontSize: 26, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.75, letterSpacing: 6, x: 88, y: 92, width: 600, height: 40, zIndex: 8, animation: { name: 'slideInLeft', duration: 700 } },
      { id: 'hy-y2k-no', type: 'text', content: 'NO.06 / 2000', fontFamily: { $t: 'fonts.latin' }, fontSize: 20, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.6, letterSpacing: 4, textAlign: 'right', x: 640, y: 94, width: 352, height: 30, zIndex: 8 },
      { id: 'hy-y2k-rule', type: 'shape', shapeKind: 'line', x: 88, y: 152, width: 904, height: 2, fill: { $t: 'colors.ink' }, opacity: 0.22, zIndex: 8 },

      // —— 正文 ——
      { id: 'hy-y2k-sub', type: 'text', content: '全息箔、糖果色、亮银描边，\n把 2000 年的塑料未来穿回身上。', fontFamily: { $t: 'fonts.cjk' }, fontSize: 44, fontWeight: '700', color: { $t: 'colors.ink' }, lineHeight: 1.5, letterSpacing: 1, x: 88, y: 706, width: 760, height: 152, zIndex: 8, animation: { name: 'rise', duration: 900, delay: 220 }, editable: { content: true } },

      // —— 标签 pill ×3 ——
      { id: 'hy-y2k-pill-1', group: 'hy-y2k-pill-', type: 'shape', shapeKind: 'rect', x: 88, y: 880, width: 250, height: 76, borderRadius: 38, fill: { $t: 'colors.surface' }, border: { width: 3, color: { $t: 'colors.accent' } }, zIndex: 8 },
      { id: 'hy-y2k-pill-1-t', type: 'text', content: '全息贴纸', fontFamily: { $t: 'fonts.cjk' }, fontSize: 30, fontWeight: '700', color: { $t: 'colors.ink' }, textAlign: 'center', lineHeight: 2.5, x: 88, y: 880, width: 250, height: 76, zIndex: 9, editable: { content: true } },
      { id: 'hy-y2k-pill-2', group: 'hy-y2k-pill-', type: 'shape', shapeKind: 'rect', x: 356, y: 880, width: 250, height: 76, borderRadius: 38, fill: { $t: 'colors.surface' }, border: { width: 3, color: { $t: 'colors.accent2' } }, zIndex: 8 },
      { id: 'hy-y2k-pill-2-t', type: 'text', content: '糖果金属', fontFamily: { $t: 'fonts.cjk' }, fontSize: 30, fontWeight: '700', color: { $t: 'colors.ink' }, textAlign: 'center', lineHeight: 2.5, x: 356, y: 880, width: 250, height: 76, zIndex: 9, editable: { content: true } },
      { id: 'hy-y2k-pill-3', group: 'hy-y2k-pill-', type: 'shape', shapeKind: 'rect', x: 624, y: 880, width: 250, height: 76, borderRadius: 38, fill: { $t: 'colors.accent' }, opacity: 0.28, zIndex: 8 },
      { id: 'hy-y2k-pill-3-t', type: 'text', content: '闪光滤镜', fontFamily: { $t: 'fonts.cjk' }, fontSize: 30, fontWeight: '700', color: { $t: 'colors.ink' }, textAlign: 'center', lineHeight: 2.5, x: 624, y: 880, width: 250, height: 76, zIndex: 9, editable: { content: true } },

      // —— CTA ——
      { id: 'hy-y2k-cta', type: 'shape', shapeKind: 'rect', x: 88, y: 1050, width: 430, height: 118, borderRadius: 59, fill: { $t: 'colors.ink' }, zIndex: 8, animation: { name: 'glow', duration: 4600, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'hy-y2k-cta-t', type: 'text', content: '点开看完整清单', fontFamily: { $t: 'fonts.cjk' }, fontSize: 40, fontWeight: '700', color: { $t: 'colors.bg' }, textAlign: 'center', lineHeight: 2.9, x: 88, y: 1050, width: 430, height: 118, zIndex: 10, editable: { content: true } },
      { id: 'hy-y2k-cta-glow', type: 'overlay', x: 88, y: 1040, width: 430, height: 138, borderRadius: 69, background: 'radial-gradient(ellipse at 32% 50%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 72%)', mixBlendMode: 'screen', opacity: 0.5, zIndex: 11, animation: { name: 'shimmer', duration: 5200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'hy-y2k-note', type: 'text', content: 'Y2K 不是复古\n是重新出厂。', fontFamily: { $t: 'fonts.cjk' }, fontSize: 30, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.85, lineHeight: 1.5, letterSpacing: 1, x: 602, y: 1050, width: 390, height: 110, zIndex: 8, animation: { name: 'fadeIn', duration: 900, delay: 420 }, editable: { content: true } },

      // —— 页脚 ——
      { id: 'hy-y2k-rule-2', type: 'shape', shapeKind: 'line', x: 88, y: 1196, width: 904, height: 2, fill: { $t: 'colors.ink' }, opacity: 0.16, zIndex: 8 },
      { id: 'hy-y2k-foot', type: 'text', content: 'HY HOLO SERIES / 2026 · 共 6 组配色', fontFamily: { $t: 'fonts.latin' }, fontSize: 20, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.65, letterSpacing: 4, x: 88, y: 1224, width: 620, height: 30, zIndex: 8 },
      { id: 'hy-y2k-foot-2', type: 'text', content: 'NO.06 / HY Y2K', fontFamily: { $t: 'fonts.latin' }, fontSize: 20, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.6, letterSpacing: 4, textAlign: 'right', x: 700, y: 1224, width: 292, height: 30, zIndex: 8 },

      // —— 质感 ——
      { id: 'hy-y2k-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1350, background: `url("${grainSoft(300, 2026, 0.55)}")`, opacity: 0.06, mixBlendMode: 'multiply', zIndex: 20 }
    ]
  }
]

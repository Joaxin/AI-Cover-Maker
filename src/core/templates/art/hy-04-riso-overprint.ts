// src/core/templates/art/hy-04-riso-overprint.ts
// HY 署名批 → 艺术风（art） ｜ Riso 叠印网点（1080×1350 竖版 4:5）
// 2–3 个高饱和专色用半调网点叠印，错位套印 + mixBlendMode 叠色，粗黑描边字带错位重影。
import type { Template } from '@/types/types'
import { HEI, SANS, halftone, grainSoft, star } from '../_fx/trend'

export const hy04RisoOverprintTemplates: Template[] = [
  {
    id: 'hy-04-riso-overprint', name: '网点叠印', version: '1.0.0', category: 'art',
    tags: ['hy', 'riso', 'overprint', 'halftone', 'print', '4:5', 'spot color'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="125" viewBox="0 0 100 125"><rect width="100" height="125" fill="%23F4EFE6"/><circle cx="30" cy="34" r="18" fill="%23FF3EA5"/><circle cx="40" cy="40" r="18" fill="%231E66FF" opacity="0.7"/><rect x="14" y="78" width="40" height="9" rx="4" fill="%23111"/><rect x="14" y="92" width="26" height="7" rx="3" fill="%23111" opacity="0.5"/><rect x="60" y="96" width="30" height="14" rx="7" fill="%23FFD23E"/><circle cx="80" cy="30" r="10" fill="%23111"/></svg>',
    tokens: {
      colors: {
        bg: { label: '纸色', default: '#F4EFE6', options: ['#F4EFE6', '#F3F0E2', '#FBEDE0', '#EDEAF6'] },
        ink: { label: '油墨字', default: '#16110F', options: ['#16110F', '#16130A', '#2A1206', '#120E22'] },
        accent: { label: '专色·荧光粉', default: '#FF3EA5', options: ['#FF3EA5', '#FFD23E', '#FF6A3D', '#6A3EFF'] },
        accent2: { label: '专色·电光蓝', default: '#1E66FF', options: ['#1E66FF', '#1E66FF', '#FF3E6E', '#1E8BFF'] },
        accent3: { label: '专色·明黄', default: '#FFD23E', options: ['#FFD23E', '#FF6A3D', '#FFB23E', '#2BE0D0'] },
        surface: { label: '面板/印戳', default: '#FFFFFF', options: ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF'] }
      },
      fonts: { display: { label: '大标题', default: HEI, options: [HEI, SANS] }, latin: { label: '英文', default: SANS, options: [SANS, HEI] }, cjk: { label: '中文', default: HEI, options: [HEI, SANS] } }
    },
    presets: [
      { name: '荧光粉蓝', colors: { bg: '#F4EFE6', ink: '#16110F', accent: '#FF3EA5', accent2: '#1E66FF', accent3: '#FFD23E', surface: '#FFFFFF' } },
      { name: '柠檬电光', colors: { bg: '#F3F0E2', ink: '#16130A', accent: '#FFD23E', accent2: '#1E66FF', accent3: '#FF6A3D', surface: '#FFFFFF' } },
      { name: '双橙暖', colors: { bg: '#FBEDE0', ink: '#2A1206', accent: '#FF6A3D', accent2: '#FF3E6E', accent3: '#FFB23E', surface: '#FFFFFF' } },
      { name: '蓝紫冷', colors: { bg: '#EDEAF6', ink: '#120E22', accent: '#6A3EFF', accent2: '#1E8BFF', accent3: '#2BE0D0', surface: '#FFFFFF' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      // —— 底层：三块错位套印的半调网点专色版（Riso 叠印）——
      { id: 'riso-plate-1', group: 'riso-plate-', type: 'overlay', x: 0, y: 0, width: 1080, height: 1350, background: `url("${halftone(1080, 1350, 15, 48, '#FF3EA5')}")`, opacity: 0.42, mixBlendMode: 'multiply', zIndex: 1 },
      { id: 'riso-plate-2', group: 'riso-plate-', type: 'overlay', x: 22, y: 14, width: 1080, height: 1350, background: `url("${halftone(1080, 1350, 15, 48, '#1E66FF')}")`, opacity: 0.38, mixBlendMode: 'multiply', zIndex: 2 },
      { id: 'riso-plate-3', group: 'riso-plate-', type: 'overlay', x: 40, y: 28, width: 1080, height: 1350, background: `url("${halftone(1080, 1350, 15, 48, '#FFD23E')}")`, opacity: 0.34, mixBlendMode: 'multiply', zIndex: 3 },
      // —— 中层：几何专色块（跟随 preset 换色）——
      { id: 'riso-blob-1', type: 'shape', shapeKind: 'circle', x: 690, y: 60, width: 330, height: 330, fill: { $t: 'colors.accent' }, opacity: 0.9, zIndex: 4, rotation: -10 },
      { id: 'riso-blob-2', type: 'shape', shapeKind: 'circle', x: 60, y: 980, width: 300, height: 300, fill: { $t: 'colors.accent2' }, opacity: 0.85, zIndex: 4, rotation: 8 },
      { id: 'riso-bar', type: 'shape', shapeKind: 'rect', x: 48, y: 1240, width: 984, height: 70, fill: { $t: 'colors.accent3' }, zIndex: 1 },
      { id: 'riso-ring', type: 'shape', shapeKind: 'circle', x: 700, y: 470, width: 230, height: 230, fill: 'transparent', border: { width: 16, color: { $t: 'colors.accent' } }, zIndex: 6, rotation: -6 },
      // —— 顶层：文字与 UI 细节 ——
      { id: 'riso-kicker', type: 'text', content: 'INDEPENDENT PRINT · 小批量丝网', fontFamily: { $t: 'fonts.latin' }, fontSize: 28, fontWeight: '700', color: { $t: 'colors.ink' }, letterSpacing: 4, x: 88, y: 110, width: 904, height: 44, zIndex: 8 },
      { id: 'riso-rule', type: 'shape', shapeKind: 'rect', x: 88, y: 162, width: 360, height: 8, fill: { $t: 'colors.ink' }, zIndex: 7 },
      { id: 'riso-bigmark', type: 'text', content: '印', fontFamily: { $t: 'fonts.display' }, fontSize: 420, fontWeight: '900', color: { $t: 'colors.ink' }, opacity: 0.07, x: 88, y: 800, width: 460, height: 460, zIndex: 4 },
      { id: 'riso-title-ghost', type: 'text', content: '印刷术\n的浪漫', fontFamily: { $t: 'fonts.display' }, fontSize: 150, fontWeight: '900', color: { $t: 'colors.accent2' }, letterSpacing: -2, x: 104, y: 224, width: 904, height: 340, zIndex: 5 },
      { id: 'riso-title', type: 'text', content: '印刷术\n的浪漫', fontFamily: { $t: 'fonts.display' }, fontSize: 150, fontWeight: '900', color: { $t: 'colors.ink' }, letterSpacing: -2, x: 88, y: 210, width: 904, height: 340, zIndex: 6, animation: { name: 'inkReveal', duration: 820 }, editable: { content: true, fontSize: { type: 'range', min: 110, max: 170 } } },
      { id: 'riso-sub', type: 'text', content: '把荧光粉压过电光蓝一点点', fontFamily: { $t: 'fonts.cjk' }, fontSize: 58, fontWeight: '800', color: { $t: 'colors.ink' }, letterSpacing: 2, x: 88, y: 540, width: 904, height: 80, zIndex: 8, animation: { name: 'rise', duration: 880, delay: 160 }, editable: { content: true } },
      { id: 'riso-body', type: 'text', content: '不追求零误差。\n让网点错位、让套印偏一点，\n手感的证明，就藏在那一毫米里。', fontFamily: { $t: 'fonts.cjk' }, fontSize: 40, fontWeight: '600', color: { $t: 'colors.ink' }, lineHeight: 1.5, letterSpacing: 1, x: 88, y: 660, width: 904, height: 320, zIndex: 8, animation: { name: 'fadeInUp', duration: 900, delay: 280 }, editable: { content: true } },
      { id: 'riso-divider', type: 'shape', shapeKind: 'rect', x: 88, y: 1010, width: 220, height: 7, fill: { $t: 'colors.accent' }, zIndex: 7 },
      { id: 'riso-pill-1', type: 'shape', shapeKind: 'rect', x: 88, y: 1066, width: 210, height: 64, fill: { $t: 'colors.surface' }, borderRadius: 32, border: { width: 4, color: { $t: 'colors.ink' } }, zIndex: 7 },
      { id: 'riso-pill-1t', type: 'text', content: '荧光粉', fontFamily: { $t: 'fonts.cjk' }, fontSize: 30, fontWeight: '800', color: { $t: 'colors.ink' }, textAlign: 'center', x: 88, y: 1066, width: 210, height: 64, lineHeight: 2.1, zIndex: 8 },
      { id: 'riso-pill-2', type: 'shape', shapeKind: 'rect', x: 320, y: 1066, width: 210, height: 64, fill: { $t: 'colors.surface' }, borderRadius: 32, border: { width: 4, color: { $t: 'colors.ink' } }, zIndex: 7 },
      { id: 'riso-pill-2t', type: 'text', content: '电光蓝', fontFamily: { $t: 'fonts.cjk' }, fontSize: 30, fontWeight: '800', color: { $t: 'colors.ink' }, textAlign: 'center', x: 320, y: 1066, width: 210, height: 64, lineHeight: 2.1, zIndex: 8 },
      { id: 'riso-star', type: 'image', src: star(120, '#16110F'), x: 600, y: 1084, width: 64, height: 64, zIndex: 8 },
      { id: 'riso-stamp-bg', type: 'shape', shapeKind: 'circle', x: 838, y: 1040, width: 180, height: 180, fill: { $t: 'colors.ink' }, rotation: -12, zIndex: 7 },
      { id: 'riso-stamp', type: 'text', content: '限定\n印次', fontFamily: { $t: 'fonts.cjk' }, fontSize: 46, fontWeight: '900', color: { $t: 'colors.surface' }, letterSpacing: 3, textAlign: 'center', lineHeight: 1.15, rotation: -12, x: 838, y: 1075, width: 180, height: 120, zIndex: 8 },
      { id: 'riso-bg-num', type: 'text', content: 'No.07', fontFamily: { $t: 'fonts.latin' }, fontSize: 30, fontWeight: '800', color: { $t: 'colors.ink' }, textAlign: 'right', letterSpacing: 2, x: 820, y: 108, width: 172, height: 40, zIndex: 8, opacity: 0.7 },
      { id: 'riso-corner-tl', type: 'shape', shapeKind: 'rect', x: 48, y: 48, width: 36, height: 6, fill: { $t: 'colors.ink' }, zIndex: 7 },
      { id: 'riso-corner-bl', type: 'shape', shapeKind: 'rect', x: 48, y: 48, width: 6, height: 36, fill: { $t: 'colors.ink' }, zIndex: 7 },
      { id: 'riso-corner-br', type: 'shape', shapeKind: 'rect', x: 996, y: 1296, width: 36, height: 6, fill: { $t: 'colors.ink' }, zIndex: 7 },
      { id: 'riso-corner-bb', type: 'shape', shapeKind: 'rect', x: 1026, y: 1266, width: 6, height: 36, fill: { $t: 'colors.ink' }, zIndex: 7 },
      { id: 'riso-note', type: 'text', content: 'RISO · OVERPRINT · 2026', fontFamily: { $t: 'fonts.latin' }, fontSize: 24, fontWeight: '700', color: { $t: 'colors.ink' }, letterSpacing: 5, x: 88, y: 1262, width: 700, height: 36, zIndex: 8, opacity: 0.8 },
      { id: 'riso-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1350, background: `url("${grainSoft(320, 41, 0.5)}")`, opacity: 0.06, mixBlendMode: 'multiply', zIndex: 10 }
    ]
  }
]

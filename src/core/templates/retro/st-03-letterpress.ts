// src/core/templates/retro/st-03-letterpress.ts —— 凸版铅字 Letterpress（4:5 竖版）
// 铅字凸版印刷：暖米白手工纸 + 深墨粗衬线大字（活字压印）+ 细密网点 + 油墨不均做旧色块 + 版口边线与页码。
// ST 标记：id / 导出名 / tags 带 st，信息栏嵌入「ST PRESS · EST.1926」与「NO.ST-03」铅字小字。
import type { Template } from '@/types/types'
import { SANS, HEI, SONG, MONO, SERIF, grainSoft, halftone } from '../_fx/trend'

export const st03LetterpressTemplates: Template[] = [
  {
    schemaVersion: 1,
    id: 'st-03-letterpress', name: '凸版铅字', version: '1.0.0', category: 'retro',
    tags: ['st', 'retro', 'letterpress', '凸版', '铅字', '印刷', '纸感', '4:5'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="125" viewBox="0 0 100 125"><rect width="100" height="125" fill="%23F5F0E4"/><rect x="7" y="7" width="86" height="111" fill="none" stroke="%23211D17" stroke-width="1.5"/><rect x="14" y="20" width="34" height="3" fill="%23211D17"/><rect x="14" y="33" width="46" height="8" rx="1.5" fill="%23211D17"/><rect x="14" y="47" width="40" height="8" rx="1.5" fill="%23211D17"/><rect x="14" y="63" width="26" height="3" fill="%238A3A2C"/><rect x="62" y="84" width="24" height="24" fill="%23211D17"/><rect x="14" y="99" width="42" height="2" fill="%23211D17" opacity="0.55"/><rect x="14" y="105" width="30" height="2" fill="%23211D17" opacity="0.55"/></svg>',
    tokens: {
      colors: {
        bg: { label: '纸底', default: '#F5F0E4', options: ['#F5F0E4', '#E9DDC3', '#F4EAD9', '#F2EFE2'] },
        ink: { label: '墨色', default: '#211D17', options: ['#211D17', '#3B2C1C', '#5E1B24', '#1C2A47'] },
        accent: { label: '油墨', default: '#8A3A2C', options: ['#8A3A2C', '#9A4A22', '#A03A48', '#2F4E7E'] },
        accent2: { label: '次墨', default: '#6E6552', options: ['#6E6552', '#7B6A45', '#8A5A3C', '#5C6B84'] },
        surface: { label: '纸面板', default: '#EAE1CD', options: ['#EAE1CD', '#DAC9A4', '#EDDFC6', '#E3E1CF'] }
      },
      fonts: {
        display: { label: '活字大标题', default: SONG, options: [SONG, HEI, SERIF] },
        latin: { label: '英文衬线', default: SERIF, options: [SERIF, MONO, SANS] },
        note: { label: '铅字小字', default: MONO, options: [MONO, SANS, HEI] }
      }
    },
    presets: [
      { name: '米白墨黑', colors: { bg: '#F5F0E4', ink: '#211D17', accent: '#8A3A2C', accent2: '#6E6552', surface: '#EAE1CD' } },
      { name: '牛皮棕', colors: { bg: '#E9DDC3', ink: '#3B2C1C', accent: '#9A4A22', accent2: '#7B6A45', surface: '#DAC9A4' } },
      { name: '酒红墨', colors: { bg: '#F4EAD9', ink: '#5E1B24', accent: '#A03A48', accent2: '#8A5A3C', surface: '#EDDFC6' } },
      { name: '靛蓝墨', colors: { bg: '#F2EFE2', ink: '#1C2A47', accent: '#2F4E7E', accent2: '#5C6B84', surface: '#E3E1CF' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      // —— 做旧油墨层：多层低透明度色块，模拟压印不匀 ——
      { id: 'lp-ink-block-a', type: 'shape', shapeKind: 'rect', x: 88, y: 800, width: 320, height: 150, fill: { $t: 'colors.accent' }, opacity: 0.1, zIndex: 2 },
      { id: 'lp-ink-block-b', type: 'shape', shapeKind: 'rect', x: 560, y: 780, width: 432, height: 180, fill: { $t: 'colors.accent2' }, opacity: 0.09, zIndex: 2 },
      { id: 'lp-ink-block-c', type: 'shape', shapeKind: 'circle', x: 680, y: 830, width: 300, height: 300, fill: { $t: 'colors.ink' }, opacity: 0.05, zIndex: 2 },
      { id: 'lp-info-panel', type: 'shape', shapeKind: 'rect', x: 88, y: 1000, width: 904, height: 170, fill: { $t: 'colors.surface' }, opacity: 0.5, zIndex: 2 },
      // —— 纸感与网点纹理（overlay，压在纸底上、文字下） ——
      { id: 'lp-halftone-main', type: 'overlay', x: 88, y: 196, width: 904, height: 440, background: `url("${halftone(72, 72, 5, 24, 'rgba(20,18,15,0.12)')}")`, opacity: 0.5, mixBlendMode: 'multiply', zIndex: 2 },
      { id: 'lp-halftone-corner', type: 'overlay', x: 620, y: 980, width: 330, height: 240, rotation: -5, background: `url("${halftone(48, 48, 6, 16, 'rgba(20,18,15,0.14)')}")`, opacity: 0.45, mixBlendMode: 'multiply', zIndex: 2 },
      { id: 'lp-paper-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1350, background: `url("${grainSoft(320, 41, 0.5)}")`, opacity: 0.08, mixBlendMode: 'multiply', zIndex: 1 },
      // —— 版口边线 + 套印规矩角线 ——
      { id: 'lp-frame-outer', type: 'shape', shapeKind: 'rect', x: 64, y: 64, width: 952, height: 1222, fill: 'transparent', border: { width: 3, color: { $t: 'colors.ink' } }, opacity: 0.9, zIndex: 4 },
      { id: 'lp-frame-inner', type: 'shape', shapeKind: 'rect', x: 78, y: 78, width: 924, height: 1194, fill: 'transparent', border: { width: 1, color: { $t: 'colors.ink' } }, opacity: 0.4, zIndex: 4 },
      { id: 'lp-reg-cross-v', type: 'shape', shapeKind: 'rect', x: 1022, y: 74, width: 2, height: 28, fill: { $t: 'colors.ink' }, opacity: 0.55, zIndex: 5 },
      { id: 'lp-reg-cross-h', type: 'shape', shapeKind: 'rect', x: 1010, y: 86, width: 28, height: 2, fill: { $t: 'colors.ink' }, opacity: 0.55, zIndex: 5 },
      { id: 'lp-reg-circle', type: 'shape', shapeKind: 'circle', x: 880, y: 800, width: 110, height: 110, fill: 'transparent', border: { width: 2, color: { $t: 'colors.ink' } }, opacity: 0.35, zIndex: 5 },
      // —— 眉头：kicker + 编号 + 细线 ——
      { id: 'lp-kicker', type: 'text', content: 'LETTERPRESS STUDIO', fontFamily: { $t: 'fonts.latin' }, fontSize: 30, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.85, letterSpacing: 8, x: 88, y: 116, width: 560, height: 44, zIndex: 8, animation: { name: 'slideInLeft', duration: 700 } },
      { id: 'lp-no-top', type: 'text', content: 'NO.03', fontFamily: { $t: 'fonts.latin' }, fontSize: 44, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.9, letterSpacing: 4, textAlign: 'right', x: 592, y: 100, width: 400, height: 56, zIndex: 8 },
      { id: 'lp-header-rule', type: 'shape', shapeKind: 'rect', x: 88, y: 172, width: 904, height: 2, fill: { $t: 'colors.ink' }, opacity: 0.85, zIndex: 5 },
      // —— 活字大标题（带一层套印重影） ——
      { id: 'lp-title-ghost', type: 'text', content: '好字，\n是压出来的', fontFamily: { $t: 'fonts.display' }, fontSize: 168, fontWeight: '800', color: { $t: 'colors.accent' }, opacity: 0.22, lineHeight: 1.06, letterSpacing: 2, x: 88, y: 214, width: 904, height: 392, zIndex: 7, animation: { name: 'fadeIn', duration: 900 } },
      { id: 'lp-title', type: 'text', content: '好字，\n是压出来的', fontFamily: { $t: 'fonts.display' }, fontSize: 168, fontWeight: '800', color: { $t: 'colors.ink' }, lineHeight: 1.06, letterSpacing: 2, x: 88, y: 206, width: 904, height: 392, zIndex: 8, animation: { name: 'fadeInUp', duration: 900, delay: 150 }, editable: { content: true, fontSize: { type: 'range', min: 140, max: 190 } } },
      { id: 'lp-subtitle', type: 'text', content: '油墨、齿孔，和纸的脾气', fontFamily: { $t: 'fonts.display' }, fontSize: 66, fontWeight: '700', color: { $t: 'colors.ink' }, lineHeight: 1.3, letterSpacing: 1, x: 88, y: 580, width: 860, height: 104, zIndex: 8, animation: { name: 'rise', duration: 800, delay: 300 }, editable: { content: true } },
      { id: 'lp-latin-sub', type: 'text', content: 'INK · TYPE · PAPER', fontFamily: { $t: 'fonts.latin' }, fontSize: 44, fontWeight: '400', color: { $t: 'colors.ink' }, opacity: 0.85, lineHeight: 1.2, letterSpacing: 10, x: 88, y: 700, width: 760, height: 56, zIndex: 8, animation: { name: 'fadeIn', duration: 700, delay: 400 } },
      // —— 书脊题字：竖排铅字小字 ——
      { id: 'lp-spine', type: 'text', content: '凸版\n印刷', fontFamily: { $t: 'fonts.display' }, fontSize: 22, fontWeight: '400', color: { $t: 'colors.ink' }, opacity: 0.55, lineHeight: 1.6, letterSpacing: 2, x: 16, y: 430, width: 42, height: 160, zIndex: 6 },
      // —— 活字存档小字栏 ——
      { id: 'lp-archive-label', type: 'text', content: '活字存档 / TYPE CASE', fontFamily: { $t: 'fonts.note' }, fontSize: 30, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.9, letterSpacing: 4, x: 88, y: 930, width: 560, height: 42, zIndex: 8 },
      { id: 'lp-info-rule', type: 'shape', shapeKind: 'rect', x: 88, y: 986, width: 904, height: 2, fill: { $t: 'colors.ink' }, opacity: 0.7, zIndex: 5 },
      { id: 'lp-info-1', type: 'text', content: 'ST PRESS · EST.1926', fontFamily: { $t: 'fonts.note' }, fontSize: 22, fontWeight: '400', color: { $t: 'colors.ink' }, opacity: 0.9, letterSpacing: 6, x: 88, y: 1012, width: 520, height: 32, zIndex: 8, animation: { name: 'fadeIn', duration: 600, delay: 500 } },
      { id: 'lp-info-2', type: 'text', content: 'NO.ST-03 · 第 103 印', fontFamily: { $t: 'fonts.note' }, fontSize: 22, fontWeight: '400', color: { $t: 'colors.ink' }, opacity: 0.75, letterSpacing: 3, x: 88, y: 1054, width: 520, height: 32, zIndex: 8, animation: { name: 'fadeIn', duration: 600, delay: 580 } },
      { id: 'lp-info-3', type: 'text', content: '手工排版 · 慢速压印 · 纸纤维的方向', fontFamily: { $t: 'fonts.note' }, fontSize: 22, fontWeight: '400', color: { $t: 'colors.ink' }, opacity: 0.6, letterSpacing: 3, x: 88, y: 1096, width: 640, height: 32, zIndex: 8, animation: { name: 'fadeIn', duration: 600, delay: 660 } },
      // —— 铅字方块：一枚凸版活字 ——
      { id: 'lp-type-block', type: 'shape', shapeKind: 'rect', x: 828, y: 1058, width: 112, height: 112, fill: { $t: 'colors.ink' }, borderRadius: 6, zIndex: 7, shadow: { offsetX: 2, offsetY: 3, blur: 2, color: 'rgba(20,18,15,0.35)' }, animation: { name: 'zoomIn', duration: 600, delay: 500 } },
      { id: 'lp-type-block-t', type: 'text', content: '印', fontFamily: { $t: 'fonts.display' }, fontSize: 56, fontWeight: '700', color: { $t: 'colors.bg' }, textAlign: 'center', lineHeight: 2, x: 828, y: 1058, width: 112, height: 112, zIndex: 8, animation: { name: 'fadeIn', duration: 500, delay: 650 } },
      // —— 版口下方：星花 + 页码 + 年份 ——
      { id: 'lp-asterism', type: 'shape', shapeKind: 'rect', x: 880, y: 1196, width: 16, height: 16, fill: { $t: 'colors.accent' }, rotation: 45, opacity: 0.8, zIndex: 6 },
      { id: 'lp-footer-rule', type: 'shape', shapeKind: 'rect', x: 88, y: 1180, width: 904, height: 2, fill: { $t: 'colors.ink' }, opacity: 0.85, zIndex: 5 },
      { id: 'lp-footer-line', type: 'text', content: '每一页，都值得被认真压平。', fontFamily: { $t: 'fonts.display' }, fontSize: 30, fontWeight: '700', color: { $t: 'colors.ink' }, lineHeight: 1.2, letterSpacing: 2, x: 88, y: 1206, width: 620, height: 44, zIndex: 8, animation: { name: 'slideUpFade', duration: 700, delay: 600 }, editable: { content: true } },
      { id: 'lp-year', type: 'text', content: 'MMXXVI', fontFamily: { $t: 'fonts.note' }, fontSize: 20, fontWeight: '400', color: { $t: 'colors.ink' }, opacity: 0.6, letterSpacing: 4, x: 88, y: 1248, width: 300, height: 28, zIndex: 8 },
      { id: 'lp-page-no', type: 'text', content: 'P.103', fontFamily: { $t: 'fonts.note' }, fontSize: 20, fontWeight: '400', color: { $t: 'colors.ink' }, opacity: 0.8, letterSpacing: 2, textAlign: 'right', x: 792, y: 1248, width: 200, height: 28, zIndex: 8, animation: { name: 'fadeIn', duration: 600, delay: 700 } }
    ]
  }
]

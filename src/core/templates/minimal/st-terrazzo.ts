// src/core/templates/minimal/st-terrazzo.ts —— 水磨石材质 Terrazzo Material（4:5 竖版）
// 暖白基底上散布同色系矿物碎屑（圆 / 圆角方 / 三角），配极简排版与图鉴细框，材料感优先、不喧宾夺主。
// ST 标记：id / 导出名 / tags 带 st；底部左下嵌「NO.ST-06」小字（小字号、低透明度、不显眼处）。
import type { Template } from '@/types/types'
import { HEI, MONO, SANS, SERIF, SONG, triangle, grainSoft } from '../_fx/trend'

export const stTerrazzoTemplates: Template[] = [
  {
    id: 'st-terrazzo', name: '水磨石图鉴', version: '1.0.0', category: 'minimal',
    tags: ['st', 'terrazzo', 'material', 'speckle', 'minimal', '4:5', 'texture', 'catalog', 'warm'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="125" viewBox="0 0 100 125"><rect width="100" height="125" fill="%23F5F1E8"/><rect x="7" y="7" width="86" height="111" fill="none" stroke="%232B2823" stroke-width="0.8" opacity="0.35"/><circle cx="24" cy="26" r="5" fill="%23D9CFC0"/><circle cx="62" cy="18" r="3.4" fill="%23B9A98F"/><rect x="76" y="30" width="9" height="7" rx="2" fill="%238A7B68" transform="rotate(18 80 33)"/><circle cx="86" cy="52" r="4.6" fill="%23D9CFC0"/><polygon points="70,74 80,74 75,64" fill="%23B9A98F"/><circle cx="20" cy="58" r="2.6" fill="%238A7B68"/><rect x="34" y="44" width="7" height="7" rx="1.6" fill="%23B9A98F" transform="rotate(-14 37 47)"/><circle cx="52" cy="88" r="3" fill="%23A85B3C"/><circle cx="88" cy="96" r="5.4" fill="%23B9A98F"/><rect x="12" y="104" width="13" height="4" rx="1" fill="%23D9CFC0" transform="rotate(10 18 106)"/><polygon points="60,110 68,110 64,102" fill="%23D9CFC0"/><circle cx="40" cy="76" r="2" fill="%23D9CFC0"/><circle cx="16" cy="80" r="3.2" fill="%23B9A98F"/><rect x="14" y="90" width="30" height="3" fill="%232B2823" opacity="0.55"/><rect x="14" y="97" width="18" height="2" fill="%232B2823" opacity="0.35"/></svg>',
    tokens: {
      colors: {
        bg: { label: '底色', default: '#F5F1E8', options: ['#F5F1E8', '#F2F1EC', '#F6EFEA', '#26231F'] },
        ink: { label: '墨色', default: '#2B2823', options: ['#2B2823', '#33352F', '#4A3B3B', '#EDE6D8'] },
        chip1: { label: '碎屑·浅', default: '#D9CFC0', options: ['#D9CFC0', '#CFCEC6', '#E3CBC5', '#6B5F4E'] },
        chip2: { label: '碎屑·中', default: '#B9A98F', options: ['#B9A98F', '#A6A69C', '#C9A39C', '#8F7E66'] },
        chip3: { label: '碎屑·深', default: '#8A7B68', options: ['#8A7B68', '#77766E', '#A97B74', '#A89478'] },
        accent: { label: '陶土点缀', default: '#A85B3C', options: ['#A85B3C', '#6B7A72', '#8A4F48', '#C98A5B'] }
      },
      fonts: {
        display: { label: '英文标题', default: SANS, options: [SANS, SERIF, MONO] },
        cjk: { label: '中文标题', default: HEI, options: [HEI, SANS, SONG] },
        mono: { label: '等宽标注', default: MONO, options: [MONO, SANS, SERIF] }
      }
    },
    presets: [
      { name: '暖白陶土', colors: { bg: '#F5F1E8', ink: '#2B2823', chip1: '#D9CFC0', chip2: '#B9A98F', chip3: '#8A7B68', accent: '#A85B3C' } },
      { name: '水泥浅灰', colors: { bg: '#F2F1EC', ink: '#33352F', chip1: '#CFCEC6', chip2: '#A6A69C', chip3: '#77766E', accent: '#6B7A72' } },
      { name: '深焙咖啡', colors: { bg: '#26231F', ink: '#EDE6D8', chip1: '#6B5F4E', chip2: '#8F7E66', chip3: '#A89478', accent: '#C98A5B' } },
      { name: '陶土粉灰', colors: { bg: '#F6EFEA', ink: '#4A3B3B', chip1: '#E3CBC5', chip2: '#C9A39C', chip3: '#A97B74', accent: '#8A4F48' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      // —— 图鉴细框（四周留白统一 84）——
      { id: 'st-tz-frame', type: 'shape', shapeKind: 'rect', x: 84, y: 84, width: 912, height: 1182, fill: 'transparent', border: { width: 1.5, color: { $t: 'colors.ink' } }, opacity: 0.3, zIndex: 1, animation: { name: 'fadeIn', duration: 1000 } },
      // —— 背景大序号（极淡水印，id 含 decor 豁免）——
      { id: 'st-tz-bignum-decor', type: 'text', content: '06', fontFamily: { $t: 'fonts.display' }, fontSize: 360, fontWeight: '800', color: { $t: 'colors.ink' }, opacity: 0.055, x: 600, y: 700, width: 480, height: 460, zIndex: 2, animation: { name: 'fadeIn', duration: 1400, delay: 200 } },

      // —— 矿物碎屑 · 顶部横带（疏落小片）——
      { id: 'st-tz-c01', type: 'shape', shapeKind: 'circle', x: 148, y: 96, width: 20, height: 20, fill: { $t: 'colors.chip2' }, opacity: 0.8, group: 'chip', zIndex: 10 },
      { id: 'st-tz-c02', type: 'shape', shapeKind: 'rect', x: 316, y: 128, width: 26, height: 22, borderRadius: 6, rotation: 14, fill: { $t: 'colors.chip3' }, opacity: 0.72, group: 'chip', zIndex: 10 },
      { id: 'st-tz-c03', type: 'shape', shapeKind: 'circle', x: 688, y: 64, width: 32, height: 32, fill: { $t: 'colors.chip1' }, opacity: 0.85, group: 'chip', zIndex: 10 },
      { id: 'st-tz-c04', type: 'overlay', x: 872, y: 104, width: 36, height: 32, rotation: 10, background: `url("${triangle(36, 32, '%23B9A98F')}")`, opacity: 0.7, group: 'chip', zIndex: 10 },
      { id: 'st-tz-c05', type: 'shape', shapeKind: 'rect', x: 1002, y: 150, width: 22, height: 22, borderRadius: 5, rotation: -16, fill: { $t: 'colors.chip1' }, opacity: 0.78, group: 'chip', zIndex: 10 },

      // —— 矿物碎屑 · 右侧纵列（中密簇，大小错落）——
      { id: 'st-tz-c06', type: 'shape', shapeKind: 'circle', x: 812, y: 232, width: 46, height: 46, fill: { $t: 'colors.chip1' }, opacity: 0.78, group: 'chip', zIndex: 10 },
      { id: 'st-tz-c07', type: 'shape', shapeKind: 'rect', x: 938, y: 286, width: 30, height: 30, borderRadius: 7, rotation: 22, fill: { $t: 'colors.chip3' }, opacity: 0.68, group: 'chip', zIndex: 10 },
      { id: 'st-tz-c08', type: 'shape', shapeKind: 'circle', x: 1006, y: 372, width: 16, height: 16, fill: { $t: 'colors.chip2' }, opacity: 0.82, group: 'chip', zIndex: 10 },
      { id: 'st-tz-c09', type: 'overlay', x: 848, y: 424, width: 42, height: 38, rotation: -12, background: `url("${triangle(42, 38, '%238A7B68')}")`, opacity: 0.62, group: 'chip', zIndex: 10 },
      { id: 'st-tz-c10', type: 'shape', shapeKind: 'rect', x: 996, y: 512, width: 26, height: 36, borderRadius: 8, rotation: 34, fill: { $t: 'colors.chip1' }, opacity: 0.68, group: 'chip', zIndex: 10 },
      { id: 'st-tz-c11', type: 'shape', shapeKind: 'circle', x: 824, y: 612, width: 62, height: 62, fill: { $t: 'colors.chip2' }, opacity: 0.68, group: 'chip', zIndex: 10, animation: { name: 'float', duration: 9200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-tz-c12', type: 'shape', shapeKind: 'rect', x: 952, y: 706, width: 18, height: 18, borderRadius: 4, rotation: 45, fill: { $t: 'colors.chip3' }, opacity: 0.78, group: 'chip', zIndex: 10 },
      { id: 'st-tz-c13', type: 'overlay', x: 1004, y: 796, width: 30, height: 28, rotation: 16, background: `url("${triangle(30, 28, '%23D9CFC0')}")`, opacity: 0.72, group: 'chip', zIndex: 10 },
      { id: 'st-tz-c14', type: 'shape', shapeKind: 'circle', x: 872, y: 888, width: 24, height: 24, fill: { $t: 'colors.chip3' }, opacity: 0.78, group: 'chip', zIndex: 10 },
      { id: 'st-tz-c15', type: 'shape', shapeKind: 'rect', x: 978, y: 976, width: 36, height: 28, borderRadius: 6, rotation: -20, fill: { $t: 'colors.chip2' }, opacity: 0.68, group: 'chip', zIndex: 10 },

      // —— 矿物碎屑 · 左缘外散点（框外一两片，破一下秩序）——
      { id: 'st-tz-c16', type: 'shape', shapeKind: 'circle', x: 38, y: 548, width: 14, height: 14, fill: { $t: 'colors.chip3' }, opacity: 0.82, group: 'chip', zIndex: 10 },
      { id: 'st-tz-c17', type: 'shape', shapeKind: 'rect', x: 46, y: 748, width: 20, height: 20, borderRadius: 5, rotation: 26, fill: { $t: 'colors.chip1' }, opacity: 0.72, group: 'chip', zIndex: 10 },
      { id: 'st-tz-c18', type: 'overlay', x: 32, y: 968, width: 26, height: 24, rotation: -14, background: `url("${triangle(26, 24, '%23B9A98F')}")`, opacity: 0.68, group: 'chip', zIndex: 10 },
      { id: 'st-tz-c19', type: 'shape', shapeKind: 'circle', x: 52, y: 1128, width: 18, height: 18, fill: { $t: 'colors.chip1' }, opacity: 0.78, group: 'chip', zIndex: 10 },

      // —— 矿物碎屑 · 中腹稀散（小片点缀，给文字组留净区）——
      { id: 'st-tz-c20', type: 'shape', shapeKind: 'circle', x: 296, y: 612, width: 12, height: 12, fill: { $t: 'colors.chip2' }, opacity: 0.8, group: 'chip', zIndex: 10 },
      { id: 'st-tz-c21', type: 'shape', shapeKind: 'rect', x: 516, y: 556, width: 16, height: 16, borderRadius: 4, rotation: 30, fill: { $t: 'colors.chip3' }, opacity: 0.72, group: 'chip', zIndex: 10 },
      { id: 'st-tz-c22', type: 'shape', shapeKind: 'circle', x: 632, y: 692, width: 10, height: 10, fill: { $t: 'colors.accent' }, opacity: 0.85, group: 'chip', zIndex: 10 },
      { id: 'st-tz-c23', type: 'shape', shapeKind: 'rect', x: 196, y: 812, width: 22, height: 18, borderRadius: 5, rotation: -22, fill: { $t: 'colors.chip3' }, opacity: 0.68, group: 'chip', zIndex: 10 },
      { id: 'st-tz-c24', type: 'overlay', x: 424, y: 884, width: 22, height: 20, rotation: 12, background: `url("${triangle(22, 20, '%23D9CFC0')}")`, opacity: 0.68, group: 'chip', zIndex: 10 },
      { id: 'st-tz-c25', type: 'shape', shapeKind: 'circle', x: 688, y: 996, width: 14, height: 14, fill: { $t: 'colors.accent' }, opacity: 0.78, group: 'chip', zIndex: 10 },

      // —— 矿物碎屑 · 底部横带（与顶部呼应，避开右下标注）——
      { id: 'st-tz-c26', type: 'shape', shapeKind: 'circle', x: 612, y: 1068, width: 38, height: 38, fill: { $t: 'colors.chip1' }, opacity: 0.74, group: 'chip', zIndex: 10, animation: { name: 'float', duration: 11000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-tz-c27', type: 'shape', shapeKind: 'rect', x: 748, y: 1132, width: 28, height: 24, borderRadius: 6, rotation: 18, fill: { $t: 'colors.chip3' }, opacity: 0.68, group: 'chip', zIndex: 10 },
      { id: 'st-tz-c28', type: 'overlay', x: 892, y: 1052, width: 32, height: 30, rotation: -8, background: `url("${triangle(32, 30, '%23B9A98F')}")`, opacity: 0.68, group: 'chip', zIndex: 10 },
      { id: 'st-tz-c29', type: 'shape', shapeKind: 'circle', x: 986, y: 1146, width: 20, height: 20, fill: { $t: 'colors.chip1' }, opacity: 0.78, group: 'chip', zIndex: 10 },
      { id: 'st-tz-c30', type: 'shape', shapeKind: 'rect', x: 836, y: 1224, width: 42, height: 34, borderRadius: 9, rotation: 10, fill: { $t: 'colors.chip2' }, opacity: 0.62, group: 'chip', zIndex: 10 },

      // —— 底部细分隔线 + ST 小标记 ——
      { id: 'st-tz-rule', type: 'shape', shapeKind: 'line', x: 90, y: 1156, width: 400, height: 2, fill: { $t: 'colors.accent' }, opacity: 0.5, zIndex: 24 },
      { id: 'st-tz-stmark', type: 'text', content: 'NO.ST-06', fontFamily: { $t: 'fonts.mono' }, fontSize: 18, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.42, letterSpacing: 4, x: 90, y: 1198, width: 400, height: 30, zIndex: 30, animation: { name: 'fadeIn', duration: 600, delay: 640 }, editable: { content: true } },
      { id: 'st-tz-spec', type: 'text', content: 'SPECIMEN · 04', fontFamily: { $t: 'fonts.mono' }, fontSize: 18, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.55, letterSpacing: 4, textAlign: 'right', x: 560, y: 1198, width: 430, height: 30, zIndex: 30, animation: { name: 'fadeIn', duration: 600, delay: 520 }, editable: { content: true } },

      // —— 文字组（统一左对齐 x=90）——
      { id: 'st-tz-kicker', type: 'text', content: 'MATERIAL STUDIES', fontFamily: { $t: 'fonts.display' }, fontSize: 26, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.75, letterSpacing: 6, x: 90, y: 196, width: 900, height: 36, zIndex: 30, animation: { name: 'fadeIn', duration: 600 }, editable: { content: true } },
      { id: 'st-tz-title', type: 'text', content: '水磨石笔记', fontFamily: { $t: 'fonts.cjk' }, fontSize: 116, fontWeight: '300', color: { $t: 'colors.ink' }, letterSpacing: 6, lineHeight: 1.12, x: 90, y: 264, width: 900, height: 180, zIndex: 30, animation: { name: 'fadeInUp', duration: 900, delay: 80 }, editable: { content: true, fontSize: { type: 'range', min: 92, max: 128 } } },
      { id: 'st-tz-sub', type: 'text', content: 'TERRAZZO · SCATTERED MINERALS', fontFamily: { $t: 'fonts.display' }, fontSize: 30, fontWeight: '400', color: { $t: 'colors.ink' }, opacity: 0.8, letterSpacing: 4, x: 90, y: 424, width: 900, height: 48, zIndex: 30, animation: { name: 'rise', duration: 800, delay: 240 }, editable: { content: true } },
      { id: 'st-tz-index', type: 'text', content: 'STONE INDEX', fontFamily: { $t: 'fonts.mono' }, fontSize: 18, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.55, letterSpacing: 4, textAlign: 'right', x: 560, y: 196, width: 430, height: 36, zIndex: 30, animation: { name: 'fadeIn', duration: 600, delay: 400 }, editable: { content: true } },

      // —— 极淡颗粒感（材料质感收尾）——
      { id: 'st-tz-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1350, background: `url("${grainSoft(320, 5, 0.5)}")`, opacity: 0.05, mixBlendMode: 'multiply', zIndex: 40 }
    ]
  }
]

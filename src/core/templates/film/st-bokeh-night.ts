// src/core/templates/film/st-bokeh-night.ts
// ST 系列 · 夜拍散焦光斑（4:5 胶片封面）｜ 对标 AI 生成图像里最有电影感的"夜拍散景"审美：
// 深底、暖色弥散光斑大小错落、一道 115° 镜头光晕扫过左上、极淡胶片颗粒，安静温暖不花哨。
// ST 标记以低透明度小字嵌在右上角不显眼处（id 含 watermark 豁免词）。
import type { Template } from '@/types/types'
import { SANS, SERIF, HEI, SONG, MONO, IMPACT, grainSoft } from '../_fx/trend'

export const stBokehNightTemplates: Template[] = [
  {
    id: 'st-bokeh-night',
    name: '夜拍散焦光斑',
    version: '1.0.0',
    category: 'film',
    tags: ['st', 'bokeh', 'night', 'cinematic', 'light', '4:5', 'film', 'warm', 'grain', 'vertical'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="125" viewBox="0 0 100 125"><rect width="100" height="125" fill="%2312100D"/><path d="M0 0 L58 0 L0 44 Z" fill="%23FFD6AA" opacity="0.18"/><circle cx="22" cy="26" r="25" fill="%23E8A85C" opacity="0.3"/><circle cx="64" cy="16" r="17" fill="%23F4DFB4" opacity="0.22"/><circle cx="84" cy="42" r="23" fill="%23C96A3E" opacity="0.26"/><circle cx="40" cy="54" r="11" fill="%23E8A85C" opacity="0.4"/><circle cx="74" cy="68" r="8" fill="%23F4DFB4" opacity="0.5"/><circle cx="14" cy="72" r="14" fill="%23C96A3E" opacity="0.2"/><circle cx="118" cy="90" r="20" fill="%23E8A85C" opacity="0.16"/><circle cx="48" cy="24" r="1.5" fill="%23F4DFB4" opacity="0.9"/><circle cx="96" cy="80" r="1.3" fill="%23F4DFB4" opacity="0.8"/><circle cx="58" cy="92" r="1.6" fill="%23F4DFB4" opacity="0.85"/><rect x="12" y="97" width="24" height="1.6" fill="%237E96B8"/><rect x="12" y="105" width="54" height="5" fill="%23F3E7D3"/><rect x="12" y="115" width="32" height="2.6" fill="%23F3E7D3" opacity="0.6"/></svg>',
    tokens: {
      colors: {
        bg: { label: '夜色底', default: '#12100D', options: ['#12100D', '#0B101C', '#170D0E', '#0C120E'] },
        ink: { label: '月色文字', default: '#F3E7D3', options: ['#F3E7D3', '#E8EEF7', '#F2E3D8', '#EDE6D4'] },
        bokeh1: { label: '光斑·暖金', default: '#E8A85C', options: ['#E8A85C', '#D9A86C', '#D98E5A', '#D9A961'] },
        bokeh2: { label: '光斑·铜橙', default: '#C96A3E', options: ['#C96A3E', '#B85C46', '#A94F38', '#B0663A'] },
        bokeh3: { label: '光斑·香槟', default: '#F4DFB4', options: ['#F4DFB4', '#E9D9B8', '#EFD3A6', '#F0DFC0'] },
        accent: { label: '冷点缀', default: '#7E96B8', options: ['#7E96B8', '#9DB8D9', '#8A7BA8', '#6FA08C'] }
      },
      fonts: {
        display: { label: '英文标题', default: SERIF, options: [SERIF, SANS, IMPACT] },
        cjk: { label: '中文副题', default: HEI, options: [HEI, SONG, SANS] },
        mono: { label: '等宽元数据', default: MONO, options: [MONO, SANS, HEI] }
      }
    },
    presets: [
      { name: '琥珀夜', colors: { bg: '#12100D', ink: '#F3E7D3', bokeh1: '#E8A85C', bokeh2: '#C96A3E', bokeh3: '#F4DFB4', accent: '#7E96B8' } },
      { name: '蓝调时刻', colors: { bg: '#0B101C', ink: '#E8EEF7', bokeh1: '#D9A86C', bokeh2: '#B85C46', bokeh3: '#E9D9B8', accent: '#9DB8D9' } },
      { name: '酒红夜', colors: { bg: '#170D0E', ink: '#F2E3D8', bokeh1: '#D98E5A', bokeh2: '#A94F38', bokeh3: '#EFD3A6', accent: '#8A7BA8' } },
      { name: '松林夜', colors: { bg: '#0C120E', ink: '#EDE6D4', bokeh1: '#D9A961', bokeh2: '#B0663A', bokeh3: '#F0DFC0', accent: '#6FA08C' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      // ===== 散焦光斑：大圆 + 低透明度 + 大模糊投影，尺寸 62~300 错落、透明度参差，分布于上 2/3 =====
      { id: 'st-bk-bk01', group: 'st-bk-bk', type: 'shape', shapeKind: 'circle', x: 80, y: 110, width: 300, height: 300, fill: { $t: 'colors.bokeh1' }, opacity: 0.3, zIndex: 1, shadow: { offsetX: 0, offsetY: 0, blur: 90, color: { $t: 'colors.bokeh1' } }, animation: { name: 'float', duration: 11000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-bk-bk02', group: 'st-bk-bk', type: 'shape', shapeKind: 'circle', x: 520, y: 54, width: 230, height: 230, fill: { $t: 'colors.bokeh3' }, opacity: 0.2, zIndex: 1, shadow: { offsetX: 0, offsetY: 0, blur: 75, color: { $t: 'colors.bokeh3' } }, animation: { name: 'float', duration: 13000, delay: 1200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-bk-bk03', group: 'st-bk-bk', type: 'shape', shapeKind: 'circle', x: 770, y: 170, width: 280, height: 280, fill: { $t: 'colors.bokeh2' }, opacity: 0.26, zIndex: 1, shadow: { offsetX: 0, offsetY: 0, blur: 85, color: { $t: 'colors.bokeh2' } }, animation: { name: 'float', duration: 10000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-bk-bk04', group: 'st-bk-bk', type: 'shape', shapeKind: 'circle', x: 46, y: 400, width: 190, height: 190, fill: { $t: 'colors.bokeh2' }, opacity: 0.32, zIndex: 1, shadow: { offsetX: 0, offsetY: 0, blur: 65, color: { $t: 'colors.bokeh2' } }, animation: { name: 'glow', duration: 8000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-bk-bk05', group: 'st-bk-bk', type: 'shape', shapeKind: 'circle', x: 330, y: 300, width: 140, height: 140, fill: { $t: 'colors.bokeh1' }, opacity: 0.38, zIndex: 1, shadow: { offsetX: 0, offsetY: 0, blur: 50, color: { $t: 'colors.bokeh1' } }, animation: { name: 'glow', duration: 7000, delay: 800, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-bk-bk06', group: 'st-bk-bk', type: 'shape', shapeKind: 'circle', x: 880, y: 470, width: 160, height: 160, fill: { $t: 'colors.accent' }, opacity: 0.24, zIndex: 1, shadow: { offsetX: 0, offsetY: 0, blur: 60, color: { $t: 'colors.accent' } }, animation: { name: 'float', duration: 9500, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-bk-bk07', group: 'st-bk-bk', type: 'shape', shapeKind: 'circle', x: 170, y: 580, width: 250, height: 250, fill: { $t: 'colors.bokeh1' }, opacity: 0.17, zIndex: 1, shadow: { offsetX: 0, offsetY: 0, blur: 95, color: { $t: 'colors.bokeh1' } }, animation: { name: 'float', duration: 14000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-bk-bk08', group: 'st-bk-bk', type: 'shape', shapeKind: 'circle', x: 600, y: 540, width: 105, height: 105, fill: { $t: 'colors.bokeh2' }, opacity: 0.4, zIndex: 1, shadow: { offsetX: 0, offsetY: 0, blur: 42, color: { $t: 'colors.bokeh2' } }, animation: { name: 'glow', duration: 6500, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-bk-bk09', group: 'st-bk-bk', type: 'shape', shapeKind: 'circle', x: 800, y: 690, width: 210, height: 210, fill: { $t: 'colors.bokeh1' }, opacity: 0.2, zIndex: 1, shadow: { offsetX: 0, offsetY: 0, blur: 80, color: { $t: 'colors.bokeh1' } }, animation: { name: 'float', duration: 12000, delay: 2000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-bk-bk10', group: 'st-bk-bk', type: 'shape', shapeKind: 'circle', x: 40, y: 740, width: 95, height: 95, fill: { $t: 'colors.bokeh3' }, opacity: 0.3, zIndex: 1, shadow: { offsetX: 0, offsetY: 0, blur: 35, color: { $t: 'colors.bokeh3' } }, animation: { name: 'float', duration: 10500, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-bk-bk11', group: 'st-bk-bk', type: 'shape', shapeKind: 'circle', x: 450, y: 730, width: 180, height: 180, fill: { $t: 'colors.bokeh2' }, opacity: 0.2, zIndex: 1, shadow: { offsetX: 0, offsetY: 0, blur: 70, color: { $t: 'colors.bokeh2' } }, animation: { name: 'float', duration: 13000, delay: 600, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-bk-bk12', group: 'st-bk-bk', type: 'shape', shapeKind: 'circle', x: 930, y: 850, width: 110, height: 110, fill: { $t: 'colors.bokeh3' }, opacity: 0.24, zIndex: 1, shadow: { offsetX: 0, offsetY: 0, blur: 45, color: { $t: 'colors.bokeh3' } }, animation: { name: 'float', duration: 9000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-bk-bk13', group: 'st-bk-bk', type: 'shape', shapeKind: 'circle', x: 230, y: 140, width: 72, height: 72, fill: { $t: 'colors.bokeh1' }, opacity: 0.42, zIndex: 1, shadow: { offsetX: 0, offsetY: 0, blur: 28, color: { $t: 'colors.bokeh1' } }, animation: { name: 'glow', duration: 6000, delay: 400, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-bk-bk14', group: 'st-bk-bk', type: 'shape', shapeKind: 'circle', x: 650, y: 290, width: 62, height: 62, fill: { $t: 'colors.bokeh3' }, opacity: 0.36, zIndex: 1, shadow: { offsetX: 0, offsetY: 0, blur: 24, color: { $t: 'colors.bokeh3' } }, animation: { name: 'glow', duration: 7500, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-bk-bk15', group: 'st-bk-bk', type: 'shape', shapeKind: 'circle', x: 120, y: 880, width: 200, height: 200, fill: { $t: 'colors.bokeh2' }, opacity: 0.15, zIndex: 1, shadow: { offsetX: 0, offsetY: 0, blur: 90, color: { $t: 'colors.bokeh2' } }, animation: { name: 'float', duration: 15000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      // ===== 对焦清晰的星点：极小实心圆 + 高透明度 + 微光晕，配 twinkle =====
      { id: 'st-bk-sp1', group: 'st-bk-sp', type: 'shape', shapeKind: 'circle', x: 305, y: 205, width: 14, height: 14, fill: { $t: 'colors.bokeh3' }, opacity: 0.9, zIndex: 2, shadow: { offsetX: 0, offsetY: 0, blur: 8, color: { $t: 'colors.bokeh3' } }, animation: { name: 'twinkle', duration: 3000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-bk-sp2', group: 'st-bk-sp', type: 'shape', shapeKind: 'circle', x: 690, y: 130, width: 10, height: 10, fill: { $t: 'colors.bokeh3' }, opacity: 0.8, zIndex: 2, shadow: { offsetX: 0, offsetY: 0, blur: 6, color: { $t: 'colors.bokeh3' } }, animation: { name: 'twinkle', duration: 4200, delay: 800, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-bk-sp3', group: 'st-bk-sp', type: 'shape', shapeKind: 'circle', x: 860, y: 620, width: 12, height: 12, fill: { $t: 'colors.bokeh1' }, opacity: 0.85, zIndex: 2, shadow: { offsetX: 0, offsetY: 0, blur: 7, color: { $t: 'colors.bokeh1' } }, animation: { name: 'twinkle', duration: 3600, delay: 1400, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-bk-sp4', group: 'st-bk-sp', type: 'shape', shapeKind: 'circle', x: 150, y: 505, width: 9, height: 9, fill: { $t: 'colors.bokeh3' }, opacity: 0.75, zIndex: 2, shadow: { offsetX: 0, offsetY: 0, blur: 5, color: { $t: 'colors.bokeh3' } }, animation: { name: 'twinkle', duration: 5000, delay: 400, iterationCount: 'infinite', easing: 'ease-in-out' } },
      // ===== 氛围层：顶部暖雾 + 115° 镜头光晕（左上扫过）+ 底部压暗 + 胶片颗粒 =====
      { id: 'st-bk-glow', type: 'overlay', x: 0, y: 0, width: 1080, height: 1350, background: 'radial-gradient(120% 55% at 18% -8%, rgba(255,196,128,0.20) 0%, rgba(255,196,128,0) 62%)', zIndex: 3 },
      { id: 'st-bk-leak', type: 'overlay', x: 0, y: 0, width: 1080, height: 1350, background: 'linear-gradient(115deg, rgba(255,214,170,0.34) 0%, rgba(255,214,170,0.12) 26%, rgba(255,214,170,0) 46%)', zIndex: 4 },
      { id: 'st-bk-vignette', type: 'overlay', x: 0, y: 0, width: 1080, height: 1350, background: 'linear-gradient(180deg, rgba(18,16,13,0) 52%, rgba(10,7,5,0.62) 100%)', zIndex: 5 },
      { id: 'st-bk-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1350, background: `url("${grainSoft(300, 11, 0.5)}")`, opacity: 0.06, mixBlendMode: 'overlay', zIndex: 30 },
      // ===== 底部文字组：细线 + 小号眉题 + 大号衬线标题（单行）+ 中文副题 + 等宽元数据 =====
      { id: 'st-bk-rule', type: 'shape', shapeKind: 'line', x: 96, y: 966, width: 170, height: 2, fill: { $t: 'colors.accent' }, opacity: 0.9, zIndex: 8, animation: { name: 'fadeIn', duration: 700 } },
      { id: 'st-bk-kicker', type: 'text', content: 'CINEMATIC BOKEH SERIES', fontFamily: { $t: 'fonts.display' }, fontSize: 28, fontWeight: '700', color: { $t: 'colors.accent' }, opacity: 0.9, letterSpacing: 6, x: 96, y: 994, width: 700, height: 40, zIndex: 10, animation: { name: 'fadeIn', duration: 600 }, editable: { content: true } },
      { id: 'st-bk-title', type: 'text', content: 'AFTER DARK', fontFamily: { $t: 'fonts.display' }, fontSize: 100, fontWeight: '700', color: { $t: 'colors.ink' }, letterSpacing: 3, lineHeight: 1.05, x: 96, y: 1040, width: 888, height: 120, zIndex: 11, shadow: { offsetX: 0, offsetY: 6, blur: 30, color: { $t: 'colors.bg' } }, animation: { name: 'fadeInUp', duration: 900, delay: 120 }, editable: { content: true, fontSize: { type: 'range', min: 72, max: 120 } } },
      { id: 'st-bk-sub', type: 'text', content: '夜色失焦，光斑温柔。', fontFamily: { $t: 'fonts.cjk' }, fontSize: 40, color: { $t: 'colors.ink' }, opacity: 0.88, letterSpacing: 2, lineHeight: 1.5, x: 96, y: 1172, width: 888, height: 68, zIndex: 12, shadow: { offsetX: 0, offsetY: 3, blur: 16, color: { $t: 'colors.bg' } }, animation: { name: 'rise', duration: 900, delay: 280 }, editable: { content: true } },
      { id: 'st-bk-meta', type: 'text', content: 'ST · REEL 07 / 1/60s · F1.4', fontFamily: { $t: 'fonts.mono' }, fontSize: 24, color: { $t: 'colors.ink' }, opacity: 0.66, letterSpacing: 2, x: 96, y: 1242, width: 888, height: 40, zIndex: 13, animation: { name: 'fadeIn', duration: 700, delay: 440 }, editable: { content: true } },
      // ===== ST 隐性标记：右上角小字、低透明度，不显眼 =====
      { id: 'st-bk-mark-watermark', type: 'text', content: 'ST · REEL 07', fontFamily: { $t: 'fonts.mono' }, fontSize: 20, color: { $t: 'colors.accent' }, opacity: 0.42, letterSpacing: 4, textAlign: 'right', x: 780, y: 84, width: 240, height: 32, zIndex: 9, animation: { name: 'fadeIn', duration: 800, delay: 600 }, editable: { content: true } }
    ]
  }
]

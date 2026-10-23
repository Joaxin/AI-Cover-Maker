// src/core/templates/art/st-holo-prism.ts
// ST 系列 · 光棱折射（4:5 竖版封面）｜ 深色底 + 玻璃棱镜 + 硬边光谱折射带 + 星芒
import type { Template } from '@/types/types'
import { SANS, HEI, MONO, SERIF, IMPACT, grainSoft, star, starfield, triangle, aura } from '../_fx/trend'

export const stHoloPrismTemplates: Template[] = [
  {
    id: 'st-holo-prism', name: '光棱折射', version: '1.0.0', category: 'art',
    tags: ['st', 'prism', 'holo', 'refraction', 'spectral', '4:5', 'optics', 'dark', 'glass'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="125" viewBox="0 0 100 125"><rect width="100" height="125" fill="%230B0F1E"/><circle cx="50" cy="46" r="36" fill="%231B2A55"/><rect x="4" y="38" width="28" height="6" fill="%23FFFFFF" opacity="0.14"/><rect x="4" y="41" width="30" height="2" fill="%23FFFFFF" opacity="0.9"/><polygon points="50,20 72,60 28,60" fill="%23FFFFFF" opacity="0.16"/><polygon points="50,20 72,60 28,60" fill="none" stroke="%23FFFFFF" stroke-opacity="0.55" stroke-width="1.2"/><rect x="64" y="46" width="30" height="2.6" fill="%23FF4D6D" transform="rotate(9 64 46)"/><rect x="65" y="50" width="26" height="2.4" fill="%23FFB13D" transform="rotate(15 65 50)"/><rect x="66" y="54" width="22" height="2.2" fill="%233D9BFF" transform="rotate(21 66 54)"/><rect x="67" y="58" width="18" height="2" fill="%239D4DFF" transform="rotate(27 67 58)"/><circle cx="88" cy="18" r="1.5" fill="%23FFFFFF" opacity="0.9"/><circle cx="12" cy="22" r="1" fill="%23FFFFFF" opacity="0.7"/><circle cx="92" cy="72" r="1.2" fill="%23FFFFFF" opacity="0.6"/><circle cx="18" cy="80" r="1" fill="%23FFFFFF" opacity="0.5"/><rect x="10" y="102" width="48" height="4.5" fill="%23EEF2FA"/><rect x="10" y="111" width="30" height="2.6" fill="%23EEF2FA" opacity="0.55"/></svg>',
    tokens: {
      colors: {
        bg: { label: '底色', default: '#0B0F1E', options: ['#0B0F1E', '#060D18', '#07130F', '#140D0A', '#101425'] },
        ink: { label: '文字', default: '#EEF2FA', options: ['#EEF2FA', '#E8F1FF', '#EAFBF2', '#FBF0E4', '#FFFFFF'] },
        spectral1: { label: '光谱·红端', default: '#FF4D6D', options: ['#FF4D6D', '#FF6B9D', '#FF7A59', '#FF5A3C', '#F2506E'] },
        spectral2: { label: '光谱·黄端', default: '#FFB13D', options: ['#FFB13D', '#FFE066', '#FFD93D', '#FFC93C', '#FFCF5C'] },
        spectral3: { label: '光谱·蓝端', default: '#3D9BFF', options: ['#3D9BFF', '#4DD8FF', '#43F5A5', '#6FB7FF', '#39C6FF'] },
        accent: { label: '光谱·紫端', default: '#9D4DFF', options: ['#9D4DFF', '#7A5CFF', '#B84DFF', '#C77DFF', '#8A5BFF'] },
        glass: { label: '棱镜高光', default: '#FFFFFF', options: ['#FFFFFF', '#F5F9FF', '#FFF8F0', '#EAF6FF'] },
        glow: { label: '环境辉光', default: '#1B2A55', options: ['#1B2A55', '#0E2A4D', '#123A2E', '#3A2418', '#232A4A'] }
      },
      fonts: {
        display: { label: '英文标题', default: SANS, options: [SANS, IMPACT, SERIF] },
        cjk: { label: '中文', default: HEI, options: [HEI, SANS, 'Songti SC, SimSun, serif'] },
        mono: { label: '序号标记', default: MONO, options: [MONO, SANS, HEI] }
      }
    },
    presets: [
      { name: '深靛默认', colors: { bg: '#0B0F1E', ink: '#EEF2FA', spectral1: '#FF4D6D', spectral2: '#FFB13D', spectral3: '#3D9BFF', accent: '#9D4DFF', glass: '#FFFFFF', glow: '#1B2A55' } },
      { name: '幽蓝深空', colors: { bg: '#060D18', ink: '#E8F1FF', spectral1: '#FF6B9D', spectral2: '#FFE066', spectral3: '#4DD8FF', accent: '#7A5CFF', glass: '#FFFFFF', glow: '#0E2A4D' } },
      { name: '墨绿极光', colors: { bg: '#07130F', ink: '#EAFBF2', spectral1: '#FF7A59', spectral2: '#FFD93D', spectral3: '#43F5A5', accent: '#B84DFF', glass: '#FFFFFF', glow: '#123A2E' } },
      { name: '暖褐暗房', colors: { bg: '#140D0A', ink: '#FBF0E4', spectral1: '#FF5A3C', spectral2: '#FFC93C', spectral3: '#6FB7FF', accent: '#C77DFF', glass: '#FFFFFF', glow: '#3A2418' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      // 环境辉光：棱镜周围的同心柔光
      ...aura('st-hp-aura', 540, 470, 420, 'colors.glow', 6),
      { id: 'st-hp-glow', type: 'overlay', x: 0, y: 0, width: 1080, height: 1350, background: 'radial-gradient(circle at 50% 33%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.045) 42%, rgba(255,255,255,0) 72%)', opacity: 0.9, zIndex: 2, animation: { name: 'pulse', duration: 9000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      // 星尘（仅上部区域，避开底部文字）
      { id: 'st-hp-starfield', type: 'overlay', x: 40, y: 36, width: 1000, height: 680, background: `url("${starfield(1000, 680, 46, 'rgba(255,255,255,0.85)', 7)}")`, opacity: 0.5, zIndex: 3 },
      // 暗角，收拢视线
      { id: 'st-hp-vignette', type: 'overlay', x: 0, y: 0, width: 1080, height: 1350, background: 'radial-gradient(circle at 50% 33%, rgba(0,0,0,0) 42%, rgba(0,0,0,0.4) 100%)', zIndex: 4 },
      // 背景大字（豁免位：低透明度水印）
      { id: 'st-hp-light-decor', type: 'text', content: 'LIGHT', fontFamily: { $t: 'fonts.display' }, fontSize: 220, fontWeight: '800', color: { $t: 'colors.glass' }, opacity: 0.07, letterSpacing: 12, x: 70, y: 300, width: 940, height: 290, zIndex: 5, animation: { name: 'fadeIn', duration: 1400 }, editable: { content: true } },
      // 入射白光（左侧近水平射入棱镜）
      { id: 'st-hp-beam-glow', type: 'shape', shapeKind: 'rect', x: 110, y: 391, width: 344, height: 14, fill: { $t: 'colors.glass' }, opacity: 0.16, borderRadius: 7, zIndex: 5, animation: { name: 'pulse', duration: 4200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-hp-beam-1', type: 'shape', shapeKind: 'rect', x: 120, y: 397, width: 334, height: 4, fill: { $t: 'colors.glass' }, opacity: 0.85, borderRadius: 2, zIndex: 5, animation: { name: 'fadeIn', duration: 800, delay: 200 } },
      { id: 'st-hp-beam-2', type: 'shape', shapeKind: 'rect', x: 140, y: 380, width: 310, height: 3, rotation: 6, fill: { $t: 'colors.glass' }, opacity: 0.45, borderRadius: 1.5, zIndex: 5, animation: { name: 'fadeIn', duration: 800, delay: 350 } },
      // 光学光圈（描边圆环）
      { id: 'st-hp-ring', type: 'shape', shapeKind: 'circle', x: 395, y: 308, width: 290, height: 290, fill: 'transparent', border: { width: 2, color: { $t: 'colors.accent' } }, opacity: 0.38, zIndex: 5, animation: { name: 'glow', duration: 5200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      // 折射光谱带：5 条硬边细带，角度错开 8°~28°
      { id: 'st-hp-band-1', group: 'st-hp-band-', type: 'shape', shapeKind: 'rect', x: 643, y: 428, width: 400, height: 9, rotation: 8, fill: { $t: 'colors.spectral1' }, opacity: 0.66, borderRadius: 2, shadow: { offsetX: 0, offsetY: 0, blur: 14, color: { $t: 'colors.spectral1' } }, zIndex: 6, animation: { name: 'fadeIn', duration: 700, delay: 300 } },
      { id: 'st-hp-band-2', group: 'st-hp-band-', type: 'shape', shapeKind: 'rect', x: 648, y: 460, width: 350, height: 8, rotation: 13, fill: { $t: 'colors.spectral2' }, opacity: 0.6, borderRadius: 2, shadow: { offsetX: 0, offsetY: 0, blur: 14, color: { $t: 'colors.spectral2' } }, zIndex: 6, animation: { name: 'fadeIn', duration: 700, delay: 420 } },
      { id: 'st-hp-band-3', group: 'st-hp-band-', type: 'shape', shapeKind: 'rect', x: 653, y: 487, width: 300, height: 8, rotation: 18, fill: { $t: 'colors.spectral3' }, opacity: 0.68, borderRadius: 2, shadow: { offsetX: 0, offsetY: 0, blur: 14, color: { $t: 'colors.spectral3' } }, zIndex: 6, animation: { name: 'fadeIn', duration: 700, delay: 540 } },
      { id: 'st-hp-band-4', group: 'st-hp-band-', type: 'shape', shapeKind: 'rect', x: 657, y: 510, width: 265, height: 7, rotation: 23, fill: { $t: 'colors.accent' }, opacity: 0.6, borderRadius: 2, shadow: { offsetX: 0, offsetY: 0, blur: 14, color: { $t: 'colors.accent' } }, zIndex: 6, animation: { name: 'fadeIn', duration: 700, delay: 660 } },
      { id: 'st-hp-band-5', group: 'st-hp-band-', type: 'shape', shapeKind: 'rect', x: 663, y: 528, width: 225, height: 6, rotation: 28, fill: { $t: 'colors.glass' }, opacity: 0.5, borderRadius: 2, shadow: { offsetX: 0, offsetY: 0, blur: 12, color: { $t: 'colors.glass' } }, zIndex: 6, animation: { name: 'fadeIn', duration: 700, delay: 780 } },
      // 玻璃棱镜（三角形 + 微倾斜）
      { id: 'st-hp-prism', type: 'overlay', x: 360, y: 240, width: 360, height: 320, rotation: -5, background: `url("${triangle(360, 320, 'rgba(255,255,255,0.10)')}")`, zIndex: 7, animation: { name: 'fadeIn', duration: 1000 } },
      // 棱镜内部高光细线
      { id: 'st-hp-hl-1', type: 'shape', shapeKind: 'rect', x: 450, y: 420, width: 190, height: 5, rotation: 12, fill: { $t: 'colors.glass' }, opacity: 0.5, borderRadius: 2.5, zIndex: 8, animation: { name: 'shimmer', duration: 4200, delay: 500, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-hp-hl-2', type: 'shape', shapeKind: 'rect', x: 475, y: 485, width: 140, height: 4, rotation: -16, fill: { $t: 'colors.glass' }, opacity: 0.35, borderRadius: 2, zIndex: 8, animation: { name: 'shimmer', duration: 5200, delay: 900, iterationCount: 'infinite', easing: 'ease-in-out' } },
      // 棱尖反光点
      { id: 'st-hp-glint', type: 'shape', shapeKind: 'circle', x: 520, y: 235, width: 12, height: 12, fill: { $t: 'colors.glass' }, opacity: 0.9, shadow: { offsetX: 0, offsetY: 0, blur: 10, color: { $t: 'colors.glass' } }, zIndex: 8, animation: { name: 'twinkle', duration: 2600, iterationCount: 'infinite', easing: 'ease-in-out' } },
      // 细发丝框
      { id: 'st-hp-frame', type: 'shape', shapeKind: 'rect', x: 40, y: 40, width: 1000, height: 1270, fill: 'transparent', border: { width: 1, color: { $t: 'colors.ink' } }, opacity: 0.16, zIndex: 9, animation: { name: 'fadeIn', duration: 1200, delay: 600 } },
      // 星芒点缀
      { id: 'st-hp-star-1', group: 'st-hp-star-', type: 'overlay', x: 150, y: 170, width: 64, height: 64, background: `url("${star(64, '%23FFFFFF')}")`, opacity: 0.9, zIndex: 10, animation: { name: 'twinkle', duration: 3400, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-hp-star-2', group: 'st-hp-star-', type: 'overlay', x: 920, y: 210, width: 44, height: 44, background: `url("${star(44, '%23FFFFFF')}")`, opacity: 0.75, zIndex: 10, animation: { name: 'sparkle', duration: 4600, delay: 600, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-hp-star-3', group: 'st-hp-star-', type: 'overlay', x: 830, y: 120, width: 34, height: 34, background: `url("${star(34, '%23FFFFFF')}")`, opacity: 0.6, zIndex: 10, animation: { name: 'twinkle', duration: 2800, delay: 300, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-hp-star-4', group: 'st-hp-star-', type: 'overlay', x: 210, y: 560, width: 52, height: 52, background: `url("${star(52, '%23FFFFFF')}")`, opacity: 0.55, zIndex: 10, animation: { name: 'twinkle', duration: 3800, delay: 900, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-hp-star-5', group: 'st-hp-star-', type: 'overlay', x: 960, y: 620, width: 40, height: 40, background: `url("${star(40, '%23FFFFFF')}")`, opacity: 0.5, zIndex: 10, animation: { name: 'sparkle', duration: 5200, delay: 1200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-hp-star-6', group: 'st-hp-star-', type: 'overlay', x: 120, y: 760, width: 28, height: 28, background: `url("${star(28, '%23FFFFFF')}")`, opacity: 0.45, zIndex: 10, animation: { name: 'twinkle', duration: 3000, delay: 1500, iterationCount: 'infinite', easing: 'ease-in-out' } },
      // 眉标短rule
      { id: 'st-hp-rule', type: 'shape', shapeKind: 'rect', x: 90, y: 975, width: 110, height: 2, fill: { $t: 'colors.ink' }, opacity: 0.35, borderRadius: 1, zIndex: 11, animation: { name: 'fadeIn', duration: 700, delay: 400 } },
      // 文字层（统一左对齐 x=90）
      { id: 'st-hp-kicker', type: 'text', content: 'PRISMATIC REFRACTION', fontFamily: { $t: 'fonts.display' }, fontSize: 28, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.85, letterSpacing: 5, x: 90, y: 920, width: 620, height: 44, zIndex: 11, animation: { name: 'fadeIn', duration: 700, delay: 500 }, editable: { content: true } },
      { id: 'st-hp-title', type: 'text', content: 'REFRACT', fontFamily: { $t: 'fonts.display' }, fontSize: 150, fontWeight: '800', color: { $t: 'colors.glass' }, letterSpacing: 4, lineHeight: 1.05, x: 90, y: 985, width: 900, height: 205, shadow: { offsetX: 0, offsetY: 0, blur: 26, color: { $t: 'colors.spectral3' } }, zIndex: 12, animation: { name: 'fadeInUp', duration: 950, delay: 650 }, editable: { content: true, fontSize: { type: 'range', min: 120, max: 170 } } },
      { id: 'st-hp-sub', type: 'text', content: '把白光拆解成七种情绪', fontFamily: { $t: 'fonts.cjk' }, fontSize: 40, fontWeight: '500', color: { $t: 'colors.ink' }, opacity: 0.85, letterSpacing: 2, x: 90, y: 1195, width: 760, height: 56, zIndex: 12, animation: { name: 'rise', duration: 850, delay: 850 }, editable: { content: true } },
      // ST 隐性标记：小字号、低透明度、右下角不显眼处
      { id: 'st-hp-mark-watermark', type: 'text', content: 'NO.ST-01', fontFamily: { $t: 'fonts.mono' }, fontSize: 22, fontWeight: '400', color: { $t: 'colors.ink' }, opacity: 0.42, letterSpacing: 3, textAlign: 'right', x: 760, y: 1240, width: 230, height: 34, zIndex: 11, animation: { name: 'fadeIn', duration: 650, delay: 1000 }, editable: { content: true } },
      // 全画面玻璃颗粒
      { id: 'st-hp-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1350, background: `url("${grainSoft(320, 11, 0.5)}")`, opacity: 0.05, zIndex: 15 }
    ]
  }
]

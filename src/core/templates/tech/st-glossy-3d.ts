// src/core/templates/tech/st-glossy-3d.ts
// ST 系列 · 光泽立体渲染（4:5 竖版）｜ 对标 AI 生成图像里流行的 soft 3D product render 审美：
// 大球体与胶囊体、明确高光点、柔和接触阴影、渐变的体积感；干净、柔软、有重量、高级灰粉彩。
// 隐性 ST 标记：模板 id 用 st- 前缀、元素 id 用 st-g3- 前缀、tags 含 st、画面右下角嵌 ST RENDER LAB 小字。
import type { Template } from '@/types/types'
import { SANS, HEI, MONO, grainSoft, aura } from '../_fx/trend'

export const stGlossy3dTemplates: Template[] = [
  {
    id: 'st-glossy-3d', name: '光泽立体渲染', version: '1.0.0', category: 'tech',
    tags: ['st', 'glossy', '3d', 'render', 'sphere', 'soft', 'pastel', '4:5', 'tech'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="125" viewBox="0 0 100 125"><rect width="100" height="125" fill="%23F4F2FA"/><circle cx="70" cy="30" r="24" fill="%23C4B5FD" opacity="0.45"/><circle cx="48" cy="46" r="27" fill="%23A5B4FC"/><circle cx="40" cy="38" r="8" fill="%23FFFFFF" opacity="0.9"/><circle cx="22" cy="78" r="14" fill="%23F9A8D4"/><circle cx="18" cy="74" r="4" fill="%23FFFFFF" opacity="0.85"/><circle cx="82" cy="72" r="12" fill="%23C4B5FD"/><circle cx="79" cy="69" r="3.5" fill="%23FFFFFF" opacity="0.85"/><rect x="24" y="86" width="52" height="17" rx="8.5" fill="%23FB7185"/><rect x="31" y="89" width="20" height="4" rx="2" fill="%23FFFFFF" opacity="0.75"/><rect x="14" y="112" width="46" height="4" fill="%23221E3A"/><rect x="14" y="119" width="30" height="2.5" fill="%23221E3A" opacity="0.55"/></svg>',
    tokens: {
      colors: {
        bg: { label: '底色', default: '#F4F2FA', options: ['#F4F2FA', '#FBF7F2', '#F0F5FF', '#14121F'] },
        ink: { label: '文字', default: '#221E3A', options: ['#221E3A', '#1E1B4B', '#0F172A', '#ECE9F8'] },
        body1: { label: '主球', default: '#A5B4FC', options: ['#A5B4FC', '#93C5FD', '#C4B5FD', '#818CF8'] },
        body2: { label: '环境光', default: '#C4B5FD', options: ['#C4B5FD', '#A5B4FC', '#F9A8D4', '#5EEAD4'] },
        body3: { label: '小圆球', default: '#F9A8D4', options: ['#F9A8D4', '#FBCFE8', '#FDBA74', '#67E8F9'] },
        accent: { label: '胶囊/点缀', default: '#FB7185', options: ['#FB7185', '#F59E0B', '#34D399', '#A78BFA'] }
      },
      fonts: {
        display: { label: '英文标题', default: SANS, options: [SANS, MONO, HEI] },
        cjk: { label: '中文', default: HEI, options: [HEI, SANS, MONO] },
        mono: { label: '等宽标注', default: MONO, options: [MONO, SANS, HEI] }
      }
    },
    presets: [
      { name: '柔光淡紫', colors: { bg: '#F4F2FA', ink: '#221E3A', body1: '#A5B4FC', body2: '#C4B5FD', body3: '#F9A8D4', accent: '#FB7185' } },
      { name: '雾蓝奶白', colors: { bg: '#FBF7F2', ink: '#1E1B4B', body1: '#93C5FD', body2: '#A5B4FC', body3: '#FBCFE8', accent: '#F59E0B' } },
      { name: '薄荷粉桃', colors: { bg: '#F0F5FF', ink: '#0F172A', body1: '#C4B5FD', body2: '#F9A8D4', body3: '#FDBA74', accent: '#34D399' } },
      { name: '夜色渲染', colors: { bg: '#14121F', ink: '#ECE9F8', body1: '#818CF8', body2: '#5EEAD4', body3: '#67E8F9', accent: '#A78BFA' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      // —— 环境：柔光团（aura 同心圆作主球背后 halo，两枚低透明度大圆补左右环境光）——
      ...aura('st-g3-aura', 540, 420, 300, 'colors.body2'),
      { id: 'st-g3-glow-bl', type: 'shape', shapeKind: 'circle', x: 30, y: 560, width: 320, height: 320, fill: { $t: 'colors.body3' }, opacity: 0.16, zIndex: 1 },
      { id: 'st-g3-glow-tr', type: 'shape', shapeKind: 'circle', x: 880, y: 70, width: 180, height: 180, fill: { $t: 'colors.body2' }, opacity: 0.22, zIndex: 1 },
      // —— 背景幽灵字（豁免 id，极淡不抢戏）——
      { id: 'st-g3-bigmark', type: 'text', content: '3D', fontFamily: { $t: 'fonts.display' }, fontSize: 400, fontWeight: '800', color: { $t: 'colors.ink' }, opacity: 0.05, textAlign: 'center', x: 140, y: 180, width: 800, height: 480, zIndex: 2, editable: { content: true } },
      // —— 接触阴影（overlay 径向渐变，落在球体下方）——
      { id: 'st-g3-orb-main-cs', type: 'overlay', x: 340, y: 612, width: 400, height: 112, borderRadius: 56, background: 'radial-gradient(50% 50% at 50% 50%, rgba(10,8,24,0.30) 0%, rgba(10,8,24,0.12) 45%, rgba(10,8,24,0) 75%)', zIndex: 3 },
      { id: 'st-g3-orb-l-cs', type: 'overlay', x: 118, y: 772, width: 194, height: 66, borderRadius: 33, background: 'radial-gradient(50% 50% at 50% 50%, rgba(10,8,24,0.26) 0%, rgba(10,8,24,0.10) 45%, rgba(10,8,24,0) 75%)', zIndex: 3 },
      { id: 'st-g3-orb-r-cs', type: 'overlay', x: 803, y: 672, width: 164, height: 60, borderRadius: 30, background: 'radial-gradient(50% 50% at 50% 50%, rgba(10,8,24,0.24) 0%, rgba(10,8,24,0.09) 45%, rgba(10,8,24,0) 75%)', zIndex: 3 },
      { id: 'st-g3-cap-cs', type: 'overlay', x: 372, y: 942, width: 356, height: 84, borderRadius: 42, background: 'radial-gradient(50% 50% at 50% 50%, rgba(10,8,24,0.24) 0%, rgba(10,8,24,0.09) 45%, rgba(10,8,24,0) 75%)', zIndex: 3 },
      // —— 小球 L（左，210）——
      { id: 'st-g3-orb-l', type: 'shape', shapeKind: 'circle', x: 110, y: 600, width: 210, height: 210, fill: { $t: 'colors.body2' }, shadow: { offsetX: 0, offsetY: 16, blur: 36, color: 'rgba(34,30,58,0.26)' }, zIndex: 4, animation: { name: 'float', duration: 6200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-g3-orb-l-hl', type: 'overlay', x: 110, y: 600, width: 210, height: 210, borderRadius: 105, background: 'radial-gradient(35% 30% at 32% 26%, rgba(255,255,255,0.80) 0%, rgba(255,255,255,0) 62%)', zIndex: 5 },
      { id: 'st-g3-orb-l-sh', type: 'overlay', x: 110, y: 600, width: 210, height: 210, borderRadius: 105, background: 'radial-gradient(78% 72% at 70% 80%, rgba(10,8,24,0) 36%, rgba(10,8,24,0.22) 100%)', zIndex: 5 },
      // —— 小球 R（右，190）——
      { id: 'st-g3-orb-r', type: 'shape', shapeKind: 'circle', x: 790, y: 520, width: 190, height: 190, fill: { $t: 'colors.body3' }, shadow: { offsetX: 0, offsetY: 14, blur: 32, color: 'rgba(34,30,58,0.24)' }, zIndex: 4, animation: { name: 'float', duration: 8200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-g3-orb-r-hl', type: 'overlay', x: 790, y: 520, width: 190, height: 190, borderRadius: 95, background: 'radial-gradient(35% 30% at 32% 26%, rgba(255,255,255,0.80) 0%, rgba(255,255,255,0) 62%)', zIndex: 5 },
      { id: 'st-g3-orb-r-sh', type: 'overlay', x: 790, y: 520, width: 190, height: 190, borderRadius: 95, background: 'radial-gradient(78% 72% at 70% 80%, rgba(10,8,24,0) 36%, rgba(10,8,24,0.22) 100%)', zIndex: 5 },
      // —— 主球（480，居中偏上的视觉锚点）——
      { id: 'st-g3-orb-main', type: 'shape', shapeKind: 'circle', x: 300, y: 170, width: 480, height: 480, fill: { $t: 'colors.body1' }, shadow: { offsetX: 0, offsetY: 26, blur: 60, color: 'rgba(34,30,58,0.30)' }, zIndex: 5, animation: { name: 'float', duration: 7000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-g3-orb-main-hl', type: 'overlay', x: 300, y: 170, width: 480, height: 480, borderRadius: 240, background: 'radial-gradient(35% 30% at 32% 26%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.28) 38%, rgba(255,255,255,0) 62%)', zIndex: 6 },
      { id: 'st-g3-orb-main-sh', type: 'overlay', x: 300, y: 170, width: 480, height: 480, borderRadius: 240, background: 'radial-gradient(78% 72% at 70% 80%, rgba(10,8,24,0) 32%, rgba(10,8,24,0.24) 100%)', zIndex: 6 },
      // —— 胶囊体（横放中下部，高光缎带 + 底部收暗）——
      { id: 'st-g3-cap', type: 'shape', shapeKind: 'rect', x: 330, y: 800, width: 440, height: 180, borderRadius: 90, fill: { $t: 'colors.accent' }, shadow: { offsetX: 0, offsetY: 22, blur: 48, color: 'rgba(34,30,58,0.28)' }, zIndex: 6, animation: { name: 'float', duration: 9200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-g3-cap-hl', type: 'overlay', x: 330, y: 800, width: 440, height: 180, borderRadius: 90, background: 'radial-gradient(48% 85% at 34% 8%, rgba(255,255,255,0.62) 0%, rgba(255,255,255,0.12) 45%, rgba(255,255,255,0) 68%)', zIndex: 7 },
      { id: 'st-g3-cap-sh', type: 'overlay', x: 330, y: 800, width: 440, height: 180, borderRadius: 90, background: 'linear-gradient(180deg, rgba(10,8,24,0) 52%, rgba(10,8,24,0.20) 100%)', zIndex: 7 },
      // —— 装饰：描边圆环 + 两颗小点 ——
      { id: 'st-g3-ring', type: 'shape', shapeKind: 'circle', x: 928, y: 176, width: 112, height: 112, fill: 'transparent', border: { width: 2, color: { $t: 'colors.ink' } }, opacity: 0.28, zIndex: 8, animation: { name: 'pulse', duration: 4200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-g3-dot1', type: 'shape', shapeKind: 'circle', x: 168, y: 288, width: 26, height: 26, fill: { $t: 'colors.accent' }, zIndex: 8, animation: { name: 'twinkle', duration: 3200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-g3-dot2', type: 'shape', shapeKind: 'circle', x: 902, y: 756, width: 18, height: 18, fill: { $t: 'colors.ink' }, opacity: 0.5, zIndex: 8, animation: { name: 'pulse', duration: 2800, iterationCount: 'infinite', easing: 'ease-in-out' } },
      // —— 顶部标注（左眉标 + 右版本号，同组左对齐全部 x=84）——
      { id: 'st-g3-toplabel', type: 'text', content: 'PRODUCT RENDER / 2026', fontFamily: { $t: 'fonts.mono' }, fontSize: 20, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.6, letterSpacing: 2, x: 84, y: 60, width: 560, height: 30, zIndex: 10, animation: { name: 'fadeIn', duration: 600 }, editable: { content: true } },
      { id: 'st-g3-meta', type: 'text', content: 'VOL.01 · 4:5', fontFamily: { $t: 'fonts.mono' }, fontSize: 18, color: { $t: 'colors.ink' }, opacity: 0.55, letterSpacing: 2, textAlign: 'right', x: 580, y: 62, width: 416, height: 28, zIndex: 10, animation: { name: 'fadeIn', duration: 600, delay: 120 }, editable: { content: true } },
      // —— 底部文字组（标题单行不折行；副题远离标题墨迹 ≥30px）——
      { id: 'st-g3-rule', type: 'shape', shapeKind: 'line', x: 84, y: 1024, width: 912, height: 3, fill: { $t: 'colors.ink' }, opacity: 0.18, zIndex: 10 },
      { id: 'st-g3-kicker', type: 'text', content: 'SOFT 3D · RENDER SERIES', fontFamily: { $t: 'fonts.mono' }, fontSize: 24, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.85, letterSpacing: 2, x: 84, y: 1044, width: 560, height: 32, zIndex: 10, animation: { name: 'fadeIn', duration: 600 }, editable: { content: true } },
      { id: 'st-g3-title', type: 'text', content: 'SOFT RENDER', fontFamily: { $t: 'fonts.display' }, fontSize: 104, fontWeight: '800', color: { $t: 'colors.ink' }, lineHeight: 1.05, letterSpacing: -2, x: 84, y: 1084, width: 912, height: 112, zIndex: 11, animation: { name: 'fadeInUp', duration: 900 }, editable: { content: true, fontSize: { type: 'range', min: 84, max: 124 } } },
      { id: 'st-g3-sub', type: 'text', content: '柔软、有重量的光泽渲染', fontFamily: { $t: 'fonts.cjk' }, fontSize: 34, color: { $t: 'colors.ink' }, opacity: 0.85, x: 84, y: 1226, width: 560, height: 46, zIndex: 10, animation: { name: 'rise', duration: 900, delay: 180 }, editable: { content: true } },
      // —— 隐性 ST 标记：右下角小字，低透明度不显眼 ——
      { id: 'st-g3-stmark', type: 'text', content: 'ST RENDER LAB', fontFamily: { $t: 'fonts.mono' }, fontSize: 16, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.5, letterSpacing: 4, textAlign: 'right', x: 640, y: 1244, width: 356, height: 26, zIndex: 10, animation: { name: 'fadeIn', duration: 800, delay: 400 }, editable: { content: true } },
      // —— 全画面极淡噪点 ——
      { id: 'st-g3-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1350, background: `url("${grainSoft(300, 11, 0.5)}")`, opacity: 0.04, mixBlendMode: 'multiply', zIndex: 12 }
    ]
  }
]

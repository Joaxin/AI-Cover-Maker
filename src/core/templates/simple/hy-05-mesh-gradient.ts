// src/core/templates/simple/hy-05-mesh-gradient.ts
// HY 系列 · 柔雾渐变（1:1 方形）｜ 多色网格渐变 / Soft Fog Mesh Gradient
import type { Template } from '@/types/types'
import { SANS, HEI, SONG, MONO, SERIF, grainSoft, aura } from '../_fx/trend'

export const hy05MeshGradientTemplates: Template[] = [
  {
    id: 'hy-05-mesh-gradient', name: '柔雾渐变', version: '1.0.0', category: 'simple',
    tags: ['hy', 'mesh', 'gradient', 'soft fog', 'minimal', '1:1', '小红书'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23FBF1F4"/><circle cx="22" cy="26" r="26" fill="%23F9A8D4" opacity="0.7"/><circle cx="80" cy="22" r="22" fill="%23FDBA74" opacity="0.7"/><circle cx="18" cy="80" r="22" fill="%23C4B5FD" opacity="0.7"/><circle cx="82" cy="78" r="24" fill="%23FDE68A" opacity="0.7"/><rect x="22" y="46" width="56" height="9" rx="4" fill="%233A2A33"/><rect x="22" y="60" width="38" height="7" rx="3" fill="%233A2A33" opacity="0.5"/></svg>',
    tokens: {
      colors: {
        bg: { label: '底色', default: '#FBF1F4', options: ['#FBF1F4', '#EFF6FB', '#1A1426', '#FBF3E8'] },
        ink: { label: '文字', default: '#3A2A33', options: ['#3A2A33', '#1E2A38', '#F3EEFF', '#3D2B1F'] },
        c1: { label: '雾色一', default: '#F9A8D4', options: ['#F9A8D4', '#7DD3FC', '#A78BFA', '#FDBA74'] },
        c2: { label: '雾色二', default: '#FDBA74', options: ['#FDBA74', '#5EEAD4', '#F0ABFC', '#FB923C'] },
        c3: { label: '雾色三', default: '#C4B5FD', options: ['#C4B5FD', '#A5B4FC', '#818CF8', '#FCD34D'] },
        c4: { label: '雾色四', default: '#FDE68A', options: ['#FDE68A', '#67E8F9', '#FB7185', '#F9A8A8'] }
      },
      fonts: {
        display: { label: '英文', default: SANS, options: [SANS, MONO, SERIF] },
        cjk: { label: '中文', default: HEI, options: [HEI, SONG, SERIF] },
        serif: { label: '衬线', default: SERIF, options: [SERIF, SONG, SANS] }
      }
    },
    presets: [
      { name: '晨曦粉', colors: { bg: '#FBF1F4', ink: '#3A2A33', c1: '#F9A8D4', c2: '#FDBA74', c3: '#C4B5FD', c4: '#FDE68A' } },
      { name: '海岸蓝', colors: { bg: '#EFF6FB', ink: '#1E2A38', c1: '#7DD3FC', c2: '#5EEAD4', c3: '#A5B4FC', c4: '#67E8F9' } },
      { name: '暮光紫', colors: { bg: '#1A1426', ink: '#F3EEFF', c1: '#A78BFA', c2: '#F0ABFC', c3: '#818CF8', c4: '#FB7185' } },
      { name: '蜜橘暖', colors: { bg: '#FBF3E8', ink: '#3D2B1F', c1: '#FDBA74', c2: '#FB923C', c3: '#FCD34D', c4: '#F9A8A8' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1080, defaultWidth: 1080, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      // —— 网格柔雾：四角色团（多层半透明圆叠加出柔和晕染）——
      ...aura('mg-a', 250, 300, 540, 'colors.c1', 5),
      ...aura('mg-b', 850, 250, 520, 'colors.c2', 5),
      ...aura('mg-c', 230, 850, 540, 'colors.c3', 5),
      ...aura('mg-d', 860, 830, 540, 'colors.c4', 5),
      // —— 中央柔光，统一雾感 ——
      { id: 'mg-bloom', type: 'overlay', x: 0, y: 0, width: 1080, height: 1080, background: 'radial-gradient(circle at 50% 44%, rgba(255,255,255,0.38), transparent 60%)', mixBlendMode: 'soft-light', opacity: 0.9, zIndex: 2 },
      // —— 背景大字水印（装饰，豁免压字）——
      { id: 'mg-ghost-num', type: 'text', content: '05', fontFamily: { $t: 'fonts.serif' }, fontSize: 300, fontWeight: '800', color: { $t: 'colors.ink' }, opacity: 0.05, textAlign: 'center', x: 310, y: 320, width: 460, height: 420, zIndex: 3 },
      // —— 边角标记 ——
      { id: 'mg-corner-tl-h', type: 'shape', shapeKind: 'rect', x: 88, y: 64, width: 64, height: 3, fill: { $t: 'colors.ink' }, opacity: 0.4, zIndex: 5 },
      { id: 'mg-corner-tl-v', type: 'shape', shapeKind: 'rect', x: 88, y: 64, width: 3, height: 52, fill: { $t: 'colors.ink' }, opacity: 0.4, zIndex: 5 },
      { id: 'mg-corner-br-h', type: 'shape', shapeKind: 'rect', x: 928, y: 1013, width: 64, height: 3, fill: { $t: 'colors.ink' }, opacity: 0.4, zIndex: 5 },
      { id: 'mg-corner-br-v', type: 'shape', shapeKind: 'rect', x: 989, y: 960, width: 3, height: 56, fill: { $t: 'colors.ink' }, opacity: 0.4, zIndex: 5 },
      // —— 顶部 kicker + 期数标签 ——
      { id: 'mg-kicker', type: 'text', content: 'MESH GRADIENT · 第 05 期', fontFamily: { $t: 'fonts.display' }, fontSize: 26, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.62, letterSpacing: 5, x: 88, y: 128, width: 620, height: 40, zIndex: 6, animation: { name: 'fadeIn', duration: 700 }, editable: { content: true } },
      { id: 'mg-tag', type: 'shape', shapeKind: 'rect', x: 760, y: 112, width: 200, height: 60, fill: 'transparent', border: { width: 1, color: { $t: 'colors.ink' } }, borderRadius: 30, opacity: 0.7, zIndex: 6 },
      { id: 'mg-tag-t', type: 'text', content: '柔雾特辑', fontFamily: { $t: 'fonts.cjk' }, fontSize: 26, fontWeight: '700', color: { $t: 'colors.ink' }, textAlign: 'center', lineHeight: 2.3, x: 760, y: 112, width: 200, height: 60, zIndex: 7, editable: { content: true } },
      // —— 主文案块（左对齐）——
      { id: 'mg-dot', type: 'shape', shapeKind: 'circle', x: 88, y: 386, width: 20, height: 20, fill: { $t: 'colors.c1' }, zIndex: 6, animation: { name: 'float', duration: 8000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'mg-eyebrow', type: 'text', content: 'SOFT FOG / 把多云的心情调成柔雾色', fontFamily: { $t: 'fonts.display' }, fontSize: 28, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.7, letterSpacing: 2, x: 124, y: 380, width: 700, height: 40, zIndex: 6, animation: { name: 'fadeIn', duration: 700, delay: 120 }, editable: { content: true } },
      { id: 'mg-title', type: 'text', content: '被温柔的颜色\n接住一整天', fontFamily: { $t: 'fonts.cjk' }, fontSize: 104, fontWeight: '800', color: { $t: 'colors.ink' }, lineHeight: 1.16, letterSpacing: 2, x: 88, y: 470, width: 904, height: 280, zIndex: 6, animation: { name: 'fadeInUp', duration: 900, delay: 200 }, editable: { content: true, fontSize: { type: 'range', min: 84, max: 120 } } },
      { id: 'mg-sub', type: 'text', content: '不赶时间，也不急着变好。', fontFamily: { $t: 'fonts.cjk' }, fontSize: 36, fontWeight: '500', color: { $t: 'colors.ink' }, opacity: 0.72, lineHeight: 1.5, x: 88, y: 778, width: 904, height: 60, zIndex: 6, animation: { name: 'rise', duration: 900, delay: 320 }, editable: { content: true } },
      { id: 'mg-divider', type: 'shape', shapeKind: 'rect', x: 88, y: 856, width: 420, height: 3, fill: { $t: 'colors.ink' }, opacity: 0.45, zIndex: 6 },
      { id: 'mg-meta', type: 'text', content: '柔雾渐变 · 小红书风格封面', fontFamily: { $t: 'fonts.display' }, fontSize: 26, fontWeight: '600', color: { $t: 'colors.ink' }, opacity: 0.6, letterSpacing: 1, x: 88, y: 902, width: 904, height: 40, zIndex: 6, animation: { name: 'fadeIn', duration: 800, delay: 420 }, editable: { content: true } },
      // —— 颗粒质感 ——
      { id: 'mg-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1080, background: `url("${grainSoft(340, 17, 0.7)}")`, opacity: 0.08, mixBlendMode: 'overlay', zIndex: 9 }
    ]
  }
]

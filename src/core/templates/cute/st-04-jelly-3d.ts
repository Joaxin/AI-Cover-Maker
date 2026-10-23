// src/core/templates/cute/st-04-jelly-3d.ts
// 可爱风（cute）｜ ST 署名系列 No.04 ｜ 果冻 3D 质感 · Jelly 3D（1:1 方形）
// 隐性署名：NO.ST-04 · JELLY LAB（右下角小字）
import type { Template } from '@/types/types'
import { SANS, HEI, SONG, grainSoft } from '../_fx/trend'

export const st04Jelly3dTemplates: Template[] = [
  {
    schemaVersion: 1,
    id: 'st-04-jelly-3d',
    name: '果冻软糖',
    version: '1.0.0',
    category: 'cute',
    tags: ['st', 'cute', 'jelly', '3d', 'gummy', 'candy', 'soft', '1:1'],
    thumbnail:
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23FFF3F8"/><circle cx="78" cy="22" r="24" fill="%23FFD9EA" opacity="0.65"/><rect x="36" y="18" width="52" height="52" rx="16" fill="%23FF9DC6"/><rect x="44" y="26" width="30" height="14" rx="7" fill="%23FFFFFF" opacity="0.6"/><circle cx="22" cy="60" r="15" fill="%23FF9DC6" opacity="0.9"/><circle cx="27" cy="55" r="5" fill="%23FFFFFF" opacity="0.75"/><rect x="14" y="82" width="56" height="7" rx="3.5" fill="%234A1F3D"/><rect x="14" y="91" width="32" height="5" rx="2.5" fill="%234A1F3D" opacity="0.45"/></svg>',
    tokens: {
      colors: {
        bg: { label: '底色', default: '#FFF3F8', options: ['#FFF3F8', '#ECFAF4', '#FFF7DB', '#F3EEFF', '#FFFFFF'] },
        ink: { label: '文字', default: '#4A1F3D', options: ['#4A1F3D', '#123F33', '#5C4400', '#35215F', '#2B2136'] },
        accent: { label: '果冻主色', default: '#FF9DC6', options: ['#FF9DC6', '#7FE0C2', '#FFD34F', '#B493EC', '#FFB3C7'] },
        accent2: { label: '果冻副色', default: '#FFD9EA', options: ['#FFD9EA', '#CDF5E8', '#FFE9A6', '#DED2FA', '#FFC4DC'] },
        surface: { label: '面板色', default: '#FFFFFF', options: ['#FFFFFF', '#FFFDF6', '#FDF6FF', '#F2FBF7', '#FFFFFF'] }
      },
      fonts: {
        display: { label: '大标题', default: HEI, options: [HEI, SONG] },
        latin: { label: '英文', default: SANS, options: [SANS] },
        cjk: { label: '中文', default: HEI, options: [HEI, SANS] }
      }
    },
    presets: [
      { name: '草莓奶昔', colors: { bg: '#FFF3F8', ink: '#4A1F3D', accent: '#FF9DC6', accent2: '#FFD9EA', surface: '#FFFFFF' } },
      { name: '薄荷气泡', colors: { bg: '#ECFAF4', ink: '#123F33', accent: '#7FE0C2', accent2: '#CDF5E8', surface: '#FFFDF6' } },
      { name: '柠檬糖', colors: { bg: '#FFF7DB', ink: '#5C4400', accent: '#FFD34F', accent2: '#FFE9A6', surface: '#FFFDF2' } },
      { name: '葡萄紫', colors: { bg: '#F3EEFF', ink: '#35215F', accent: '#B493EC', accent2: '#DED2FA', surface: '#FFFFFF' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1080, defaultWidth: 1080, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      // ---------- 底层：柔光与氛围 ----------
      { id: 'jd-sheen', type: 'overlay', x: 0, y: 0, width: 1080, height: 1080, background: 'linear-gradient(180deg, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0) 32%)', zIndex: 1 },
      { id: 'jd-glow-tr', type: 'overlay', x: 0, y: 0, width: 1080, height: 1080, background: 'radial-gradient(circle at 84% 10%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 55%)', zIndex: 1 },
      { id: 'jd-glow-bl', type: 'overlay', x: 0, y: 0, width: 1080, height: 1080, background: 'radial-gradient(circle at 8% 96%, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 50%)', zIndex: 1 },
      { id: 'jd-aura-tr', type: 'shape', shapeKind: 'circle', x: 680, y: 20, width: 380, height: 380, fill: { $t: 'colors.accent' }, opacity: 0.16, zIndex: 2 },
      { id: 'jd-aura-bl', type: 'shape', shapeKind: 'circle', x: 30, y: 640, width: 340, height: 340, fill: { $t: 'colors.accent2' }, opacity: 0.45, zIndex: 2 },

      // ---------- 主果冻：半透明多层叠出体积 ----------
      { id: 'jd-jelly-shadow', type: 'shape', shapeKind: 'circle', x: 575, y: 625, width: 400, height: 78, fill: { $t: 'colors.ink' }, opacity: 0.10, zIndex: 3 },
      { id: 'jd-jelly-body', type: 'shape', shapeKind: 'rect', x: 555, y: 175, width: 430, height: 470, fill: { $t: 'colors.accent' }, opacity: 0.85, borderRadius: 125, zIndex: 4, shadow: { offsetX: 0, offsetY: 26, blur: 44, color: 'rgba(0,0,0,0.13)' }, animation: { name: 'float', duration: 7600, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'jd-jelly-inner', type: 'shape', shapeKind: 'rect', x: 610, y: 225, width: 320, height: 370, fill: { $t: 'colors.accent2' }, opacity: 0.55, borderRadius: 88, zIndex: 5 },
      { id: 'jd-jelly-bot', type: 'shape', shapeKind: 'rect', x: 610, y: 490, width: 320, height: 105, fill: { $t: 'colors.accent2' }, opacity: 0.40, borderRadius: 52, zIndex: 5 },
      { id: 'jd-jelly-top', type: 'shape', shapeKind: 'rect', x: 640, y: 225, width: 280, height: 160, fill: '#ffffff', opacity: 0.30, borderRadius: 78, zIndex: 6 },
      { id: 'jd-jelly-hl', type: 'shape', shapeKind: 'circle', x: 640, y: 238, width: 148, height: 72, fill: '#ffffff', opacity: 0.55, borderRadius: 36, rotation: -12, zIndex: 7 },
      { id: 'jd-jelly-spark', type: 'shape', shapeKind: 'circle', x: 838, y: 315, width: 34, height: 34, fill: '#ffffff', opacity: 0.75, borderRadius: 17, zIndex: 7, animation: { name: 'twinkle', duration: 2200, iterationCount: 'infinite', easing: 'ease-in-out' } },

      // ---------- 小方糖 ----------
      { id: 'jd-cube-shadow', type: 'shape', shapeKind: 'circle', x: 845, y: 778, width: 165, height: 36, fill: { $t: 'colors.ink' }, opacity: 0.10, zIndex: 6 },
      { id: 'jd-cube-a', type: 'shape', shapeKind: 'rect', x: 830, y: 615, width: 180, height: 180, fill: { $t: 'colors.accent2' }, opacity: 0.90, borderRadius: 48, rotation: 8, zIndex: 7, shadow: { offsetX: 0, offsetY: 16, blur: 28, color: 'rgba(0,0,0,0.10)' }, animation: { name: 'wobble', duration: 5200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'jd-cube-a-hl', type: 'shape', shapeKind: 'rect', x: 858, y: 640, width: 92, height: 52, fill: '#ffffff', opacity: 0.45, borderRadius: 26, rotation: 8, zIndex: 8 },

      // ---------- 圆糖豆 ----------
      { id: 'jd-ball-shadow', type: 'shape', shapeKind: 'circle', x: 480, y: 726, width: 130, height: 30, fill: { $t: 'colors.ink' }, opacity: 0.10, zIndex: 6 },
      { id: 'jd-ball', type: 'shape', shapeKind: 'circle', x: 470, y: 590, width: 145, height: 145, fill: { $t: 'colors.accent' }, opacity: 0.72, borderRadius: 72, zIndex: 7, animation: { name: 'float', duration: 6400, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'jd-ball-hl', type: 'shape', shapeKind: 'circle', x: 502, y: 612, width: 44, height: 44, fill: '#ffffff', opacity: 0.60, borderRadius: 22, zIndex: 8 },

      // ---------- 气泡与圆点 ----------
      { id: 'jd-bubble-1', group: 'jd-bubble-', type: 'shape', shapeKind: 'circle', x: 900, y: 130, width: 100, height: 100, fill: '#ffffff', opacity: 0.35, borderRadius: 50, zIndex: 6, animation: { name: 'float', duration: 9000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'jd-bubble-2', group: 'jd-bubble-', type: 'shape', shapeKind: 'circle', x: 840, y: 70, width: 46, height: 46, fill: '#ffffff', opacity: 0.50, borderRadius: 23, zIndex: 6 },
      { id: 'jd-bubble-3', group: 'jd-bubble-', type: 'shape', shapeKind: 'circle', x: 950, y: 260, width: 62, height: 62, fill: '#ffffff', opacity: 0.30, borderRadius: 31, zIndex: 6 },
      { id: 'jd-bubble-4', group: 'jd-bubble-', type: 'shape', shapeKind: 'circle', x: 640, y: 90, width: 70, height: 70, fill: '#ffffff', opacity: 0.40, borderRadius: 35, zIndex: 6 },
      { id: 'jd-dot-1', type: 'shape', shapeKind: 'circle', x: 920, y: 385, width: 28, height: 28, fill: { $t: 'colors.accent' }, opacity: 0.95, borderRadius: 14, zIndex: 7 },
      { id: 'jd-dot-2', type: 'shape', shapeKind: 'circle', x: 540, y: 300, width: 36, height: 36, fill: { $t: 'colors.accent2' }, opacity: 0.95, borderRadius: 18, zIndex: 7 },
      { id: 'jd-ring', type: 'shape', shapeKind: 'circle', x: 690, y: 700, width: 130, height: 130, fill: 'transparent', border: { width: 12, style: 'solid', color: { $t: 'colors.accent2' } }, zIndex: 5, animation: { name: 'spinSlow', duration: 26000, iterationCount: 'infinite', easing: 'linear' } },

      // ---------- 左下小软糖 ----------
      { id: 'jd-mini-1', type: 'shape', shapeKind: 'rect', x: 92, y: 650, width: 124, height: 124, fill: { $t: 'colors.accent2' }, opacity: 0.85, borderRadius: 36, rotation: -6, zIndex: 7, shadow: { offsetX: 0, offsetY: 12, blur: 22, color: 'rgba(0,0,0,0.08)' } },
      { id: 'jd-mini-1-hl', type: 'shape', shapeKind: 'rect', x: 112, y: 668, width: 62, height: 36, fill: '#ffffff', opacity: 0.50, borderRadius: 18, rotation: -6, zIndex: 8 },
      { id: 'jd-mini-2', type: 'shape', shapeKind: 'rect', x: 248, y: 706, width: 84, height: 84, fill: { $t: 'colors.accent' }, opacity: 0.80, borderRadius: 24, rotation: 10, zIndex: 7 },

      // ---------- 标签 pill ----------
      { id: 'jd-pill-tag1', type: 'shape', shapeKind: 'rect', x: 88, y: 520, width: 208, height: 64, fill: { $t: 'colors.surface' }, borderRadius: 32, border: { width: 3, style: 'solid', color: { $t: 'colors.accent' } }, zIndex: 9, shadow: { offsetX: 0, offsetY: 8, blur: 18, color: 'rgba(0,0,0,0.08)' }, animation: { name: 'fadeInUp', duration: 800, delay: 300 } },
      { id: 'jd-tag1-t', type: 'text', content: '软糖治愈系', fontFamily: { $t: 'fonts.cjk' }, fontSize: 26, fontWeight: '700', color: { $t: 'colors.ink' }, textAlign: 'center', lineHeight: 2.46, letterSpacing: 2, x: 88, y: 520, width: 208, height: 64, zIndex: 10, editable: { content: true } },
      { id: 'jd-pill-tag2', type: 'shape', shapeKind: 'rect', x: 316, y: 520, width: 196, height: 64, fill: { $t: 'colors.accent' }, borderRadius: 32, zIndex: 9, animation: { name: 'fadeInUp', duration: 800, delay: 380 } },
      { id: 'jd-tag2-t', type: 'text', content: '爆汁不粘牙', fontFamily: { $t: 'fonts.cjk' }, fontSize: 26, fontWeight: '700', color: { $t: 'colors.ink' }, textAlign: 'center', lineHeight: 2.46, letterSpacing: 2, x: 316, y: 520, width: 196, height: 64, zIndex: 10, editable: { content: true } },

      // ---------- 文案区（左对齐统一 x=88） ----------
      { id: 'jd-kicker', type: 'text', content: 'JELLY 3D · 软糖实验室', fontFamily: { $t: 'fonts.latin' }, fontSize: 26, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.62, letterSpacing: 4, lineHeight: 1.3, x: 88, y: 76, width: 640, height: 40, zIndex: 12, animation: { name: 'slideInLeft', duration: 700 } },
      { id: 'jd-title', type: 'text', content: '这口果冻\nQ 弹满分', fontFamily: { $t: 'fonts.display' }, fontSize: 100, fontWeight: '800', color: { $t: 'colors.ink' }, lineHeight: 1.14, letterSpacing: 2, x: 88, y: 140, width: 640, height: 250, zIndex: 12, animation: { name: 'fadeInUp', duration: 900 }, editable: { content: true, fontSize: { type: 'range', min: 80, max: 120 } } },
      { id: 'jd-sub', type: 'text', content: '这份可爱半透明，还会爆汁', fontFamily: { $t: 'fonts.cjk' }, fontSize: 34, fontWeight: '600', color: { $t: 'colors.ink' }, opacity: 0.75, lineHeight: 1.5, x: 88, y: 420, width: 660, height: 58, zIndex: 12, animation: { name: 'rise', duration: 900, delay: 220 }, editable: { content: true } },

      // ---------- 角落信息 ----------
      { id: 'jd-note', type: 'text', content: '糖分补给站 · 周一至周日', fontFamily: { $t: 'fonts.cjk' }, fontSize: 20, fontWeight: '600', color: { $t: 'colors.ink' }, opacity: 0.55, letterSpacing: 2, lineHeight: 1.3, x: 88, y: 972, width: 420, height: 32, zIndex: 12 },
      { id: 'jd-sig', type: 'text', content: 'NO.ST-04 · JELLY LAB', fontFamily: { $t: 'fonts.latin' }, fontSize: 20, fontWeight: '600', color: { $t: 'colors.ink' }, opacity: 0.50, letterSpacing: 1, textAlign: 'right', lineHeight: 1.3, x: 660, y: 972, width: 332, height: 32, zIndex: 12 },

      // ---------- 顶层质感 ----------
      { id: 'jd-vignette', type: 'overlay', x: 0, y: 0, width: 1080, height: 1080, background: 'radial-gradient(circle at 50% 45%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.08) 100%)', zIndex: 19 },
      { id: 'jd-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1080, background: `url("${grainSoft(300, 33, 0.55)}")`, opacity: 0.06, mixBlendMode: 'multiply', zIndex: 20 }
    ]
  }
]

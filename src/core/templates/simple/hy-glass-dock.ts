// src/core/templates/simple/hy-glass-dock.ts
// HY 系列 · 毛玻璃浮层（4:5）｜ 对标当下 AI 生成图像的玻璃质感审美
import type { Template } from '@/types/types'
import {SANS, HEI, MONO, grainSoft, grain} from '../_fx/trend'

export const hyGlassDockTemplates: Template[] = [
  {
    id: 'hy-glass-dock', name: '毛玻璃浮层', version: '1.0.0', category: 'simple',
    tags: ['hy', 'glass', 'frosted', 'dock', '4:5', 'soft', 'minimal'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="125" viewBox="0 0 100 125"><rect width="100" height="125" fill="%23EEF1F6"/><circle cx="20" cy="24" r="22" fill="%2393C5FD" opacity="0.7"/><circle cx="82" cy="40" r="18" fill="%23A5B4FC" opacity="0.7"/><rect x="18" y="58" width="64" height="44" rx="8" fill="%23ffffff" opacity="0.55" stroke="%23ffffff" stroke-width="1"/><rect x="26" y="70" width="40" height="4" fill="%2316161D"/><rect x="26" y="80" width="28" height="4" fill="%2316161D" opacity="0.5"/></svg>',
    tokens: {
      colors: {
        bg: { label: '底色', default: '#EEF1F6', options: ['#EEF1F6', '#F3EFFB', '#FFF1F5', '#E7F0EC'] },
        ink: { label: '文字', default: '#1B1F2A', options: ['#1B1F2A', '#22303A', '#3A2A2E', '#16261F'] },
        glass: { label: '玻璃', default: '#FFFFFF', options: ['#FFFFFF', '#F4F7FF', '#FBF4FF', '#F2FBF6'] },
        stroke: { label: '描边', default: '#FFFFFF', options: ['#FFFFFF', '#EAF0FF', '#FFF0F8', '#EAFBF2'] },
        accent: { label: '点缀', default: '#6366F1', options: ['#6366F1', '#EC4899', '#0EA5E9', '#10B981'] }
      },
      fonts: {
        display: { label: '英文', default: SANS, options: [SANS, MONO] },
        cjk: { label: '中文', default: HEI, options: [HEI, SANS] }
      }
    },
    presets: [
      { name: '雾蓝玻璃', colors: { bg: '#EEF1F6', ink: '#1B1F2A', glass: '#FFFFFF', stroke: '#FFFFFF', accent: '#6366F1' } },
      { name: '薰衣雾紫', colors: { bg: '#F3EFFB', ink: '#22303A', glass: '#F4F7FF', stroke: '#EAF0FF', accent: '#8B5CF6' } },
      { name: '蜜桃雾粉', colors: { bg: '#FFF1F5', ink: '#3A2A2E', glass: '#FBF4FF', stroke: '#FFF0F8', accent: '#EC4899' } },
      { name: '苔绿雾青', colors: { bg: '#E7F0EC', ink: '#16261F', glass: '#F2FBF6', stroke: '#EAFBF2', accent: '#10B981' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      // 背后透出的柔光团
      { id: 'gd-glow1', type: 'shape', shapeKind: 'circle', x: -120, y: -100, width: 620, height: 620, fill: { $t: 'colors.accent' }, opacity: 0.18, zIndex: 1, animation: { name: 'float', duration: 9000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'gd-glow2', type: 'shape', shapeKind: 'circle', x: 720, y: 820, width: 560, height: 560, fill: { $t: 'colors.accent' }, opacity: 0.14, zIndex: 1, animation: { name: 'drift', duration: 10200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      // 顶部 kicker + 徽标
      { id: 'gd-kicker', type: 'text', content: 'GLASS SYSTEM / 通透秩序', fontFamily: { $t: 'fonts.display' }, fontSize: 26, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.62, letterSpacing: 5, x: 90, y: 120, width: 760, height: 36, zIndex: 5, animation: { name: 'fadeIn', duration: 600 }, editable: { content: true } },
      { id: 'gd-badge', type: 'shape', shapeKind: 'rect', x: 822, y: 110, width: 168, height: 56, fill: { $t: 'colors.glass' }, opacity: 0.55, borderRadius: 28, zIndex: 5 },
      { id: 'gd-badge-t', type: 'text', content: 'v2.5', fontFamily: { $t: 'fonts.display' }, fontSize: 24, fontWeight: '700', color: { $t: 'colors.accent' }, textAlign: 'center', lineHeight: 2.33, x: 822, y: 110, width: 168, height: 56, zIndex: 6 },
      // 主玻璃卡（标题）
      { id: 'gd-card1', type: 'shape', shapeKind: 'rect', x: 90, y: 250, width: 900, height: 470, fill: { $t: 'colors.glass' }, opacity: 0.5, borderRadius: 36, shadow: { offsetX: 0, offsetY: 30, blur: 50, color: 'rgba(20,30,60,0.12)' }, zIndex: 4, animation: { name: 'fadeInUp', duration: 800 } },
      { id: 'gd-card1-s', type: 'shape', shapeKind: 'rect', x: 90, y: 250, width: 900, height: 470, fill: 'transparent', border: { width: 1, color: { $t: 'colors.stroke' } }, opacity: 0.5, borderRadius: 36, zIndex: 4 },
      { id: 'gd-eyebrow', type: 'text', content: 'WEEKLY REVIEW', fontFamily: { $t: 'fonts.display' }, fontSize: 24, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 6, x: 140, y: 300, width: 800, height: 34, zIndex: 6, animation: { name: 'fadeIn', duration: 600, delay: 120 }, editable: { content: true } },
      { id: 'gd-title', type: 'text', content: '把复杂\n收进玻璃', fontFamily: { $t: 'fonts.cjk' }, fontSize: 96, fontWeight: '800', color: { $t: 'colors.ink' }, lineHeight: 1.12, x: 140, y: 360, width: 800, height: 300, zIndex: 6, animation: { name: 'fadeInUp', duration: 860, delay: 200 }, editable: { content: true, fontSize: { type: 'range', min: 76, max: 110 } } },
      // 次玻璃卡（要点列表）
      { id: 'gd-card2', type: 'shape', shapeKind: 'rect', x: 160, y: 770, width: 760, height: 320, fill: { $t: 'colors.glass' }, opacity: 0.45, borderRadius: 30, shadow: { offsetX: 0, offsetY: 24, blur: 40, color: 'rgba(20,30,60,0.1)' }, zIndex: 4, animation: { name: 'fadeInUp', duration: 820, delay: 320 } },
      { id: 'gd-card2-s', type: 'shape', shapeKind: 'rect', x: 160, y: 770, width: 760, height: 320, fill: 'transparent', border: { width: 1, color: { $t: 'colors.stroke' } }, opacity: 0.45, borderRadius: 30, zIndex: 4 },
      { id: 'gd-l1', type: 'text', content: '01 · 极简编排', fontFamily: { $t: 'fonts.display' }, fontSize: 30, fontWeight: '700', color: { $t: 'colors.ink' }, x: 210, y: 810, width: 660, height: 40, zIndex: 6, animation: { name: 'slideInLeft', duration: 700, delay: 420 }, editable: { content: true } },
      { id: 'gd-l1d', type: 'text', content: '用最少的元素讲清楚一件事', fontFamily: { $t: 'fonts.cjk' }, fontSize: 24, color: { $t: 'colors.ink' }, opacity: 0.6, x: 210, y: 856, width: 660, height: 36, zIndex: 6, animation: { name: 'slideInLeft', duration: 700, delay: 480 }, editable: { content: true } },
      { id: 'gd-l2', type: 'text', content: '02 · 通透层次', fontFamily: { $t: 'fonts.display' }, fontSize: 30, fontWeight: '700', color: { $t: 'colors.ink' }, x: 210, y: 920, width: 660, height: 40, zIndex: 6, animation: { name: 'slideInLeft', duration: 700, delay: 540 }, editable: { content: true } },
      { id: 'gd-l2d', type: 'text', content: '玻璃与光共同承担呼吸感', fontFamily: { $t: 'fonts.cjk' }, fontSize: 24, color: { $t: 'colors.ink' }, opacity: 0.6, x: 210, y: 966, width: 660, height: 36, zIndex: 6, animation: { name: 'slideInLeft', duration: 700, delay: 600 }, editable: { content: true } },
      // 底部 dock
      { id: 'gd-dock', type: 'shape', shapeKind: 'rect', x: 90, y: 1180, width: 900, height: 110, fill: { $t: 'colors.glass' }, opacity: 0.5, borderRadius: 30, zIndex: 4, animation: { name: 'fadeInUp', duration: 760, delay: 660 } },
      { id: 'gd-dock-s', type: 'shape', shapeKind: 'rect', x: 90, y: 1180, width: 900, height: 110, fill: 'transparent', border: { width: 1, color: { $t: 'colors.stroke' } }, opacity: 0.5, borderRadius: 30, zIndex: 4 },
      { id: 'gd-d1', group: 'gd-d', type: 'shape', shapeKind: 'circle', x: 170, y: 1215, width: 40, height: 40, fill: { $t: 'colors.accent' }, opacity: 0.85, zIndex: 6, animation: { name: 'float', duration: 7000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'gd-d2', group: 'gd-d', type: 'shape', shapeKind: 'circle', x: 250, y: 1215, width: 40, height: 40, fill: { $t: 'colors.ink' }, opacity: 0.15, zIndex: 6 },
      { id: 'gd-d3', group: 'gd-d', type: 'shape', shapeKind: 'circle', x: 330, y: 1215, width: 40, height: 40, fill: { $t: 'colors.ink' }, opacity: 0.15, zIndex: 6 },
      { id: 'gd-dock-t', type: 'text', content: 'GLASS DOCK · 四项要点一屏收纳', fontFamily: { $t: 'fonts.display' }, fontSize: 24, fontWeight: '600', color: { $t: 'colors.ink' }, opacity: 0.7, x: 410, y: 1215, width: 540, height: 40, zIndex: 6, animation: { name: 'fadeIn', duration: 700, delay: 720 }, editable: { content: true } },
      { id: 'gd-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1350, background: `url("${grainSoft(300, 11, 0.5)}")`, opacity: 0.045, mixBlendMode: 'multiply', zIndex: 9 }
    ]
  }
]

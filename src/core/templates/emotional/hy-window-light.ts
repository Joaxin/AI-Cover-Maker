// src/core/templates/emotional/hy-window-light.ts
// HY 系列 · 窗影柔光（1080×1440）｜ 对标 AI 生成图像的午后阳光治愈感
import type { Template } from '@/types/types'
import {SANS, HEI, MONO, grainSoft, grain} from '../_fx/trend'

export const hyWindowLightTemplates: Template[] = [
  {
    id: 'hy-window-light', name: '窗影柔光', version: '1.0.0', category: 'emotional',
    tags: ['hy', 'window', 'light', 'soft', 'warm', '1080x1440'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="133" viewBox="0 0 100 133"><rect width="100" height="133" fill="%23FBF3E6"/><polygon points="0,20 50,0 50,80 0,110" fill="%23FFF7E6" opacity="0.85"/><polygon points="55,40 100,22 100,100 55,118" fill="%23FFF7E6" opacity="0.7"/><rect x="12" y="104" width="50" height="4" fill="%233A2E22"/><rect x="12" y="112" width="36" height="3" fill="%233A2E22" opacity="0.6"/><circle cx="80" cy="22" r="6" fill="%23F6D9A0"/></svg>',
    tokens: {
      colors: {
        bg: { label: '墙', default: '#FBF3E6', options: ['#FBF3E6', '#F6EFE3', '#F2F4EF', '#F4ECE2'] },
        light: { label: '光', default: '#FFFFFF', options: ['#FFFFFF', '#FFFDF6', '#FBFFF8', '#FFF8EC'] },
        ink: { label: '字', default: '#3A2E22', options: ['#3A2E22', '#2E3A36', '#33302A', '#2C2A24'] },
        muted: { label: '灰字', default: '#9A8E7A', options: ['#9A8E7A', '#8C97A0', '#998C7A', '#8A8676'] },
        warm: { label: '暖光', default: '#F6D9A0', options: ['#F6D9A0', '#F3C98C', '#F7E0B0', '#F5D49A'] }
      },
      fonts: {
        display: { label: '英文', default: SANS, options: [SANS, MONO] },
        cjk: { label: '中文', default: HEI, options: [HEI, SANS] },
        mono: { label: '等宽', default: MONO, options: [MONO, SANS] }
      }
    },
    presets: [
      { name: '米杏暖墙', colors: { bg: '#FBF3E6', light: '#FFFFFF', ink: '#3A2E22', muted: '#9A8E7A', warm: '#F6D9A0' } },
      { name: '雾灰冷墙', colors: { bg: '#F6EFE3', light: '#FFFDF6', ink: '#2E3A36', muted: '#8C97A0', warm: '#F3C98C' } },
      { name: '苔绿晨光', colors: { bg: '#F2F4EF', light: '#FBFFF8', ink: '#33302A', muted: '#998C7A', warm: '#F7E0B0' } },
      { name: '奶油黄昏', colors: { bg: '#F4ECE2', light: '#FFF8EC', ink: '#2C2A24', muted: '#8A8676', warm: '#F5D49A' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1440, defaultWidth: 1080, defaultHeight: 1440, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      // 整片柔光
      { id: 'wl-grad', type: 'overlay', x: 0, y: 0, width: 1080, height: 1440, background: 'linear-gradient(135deg, rgba(255,247,230,0.6) 0%, rgba(255,247,230,0) 60%)', zIndex: 2 },
      // 斜射光条
      { id: 'wl-r1', group: 'wl-r', type: 'shape', shapeKind: 'rect', x: -120, y: 200, width: 1500, height: 70, fill: { $t: 'colors.light' }, opacity: 0.14, rotation: -30, zIndex: 3, animation: { name: 'float', duration: 9000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'wl-r2', group: 'wl-r', type: 'shape', shapeKind: 'rect', x: -120, y: 330, width: 1500, height: 54, fill: { $t: 'colors.light' }, opacity: 0.12, rotation: -30, zIndex: 3, animation: { name: 'float', duration: 10000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'wl-r3', group: 'wl-r', type: 'shape', shapeKind: 'rect', x: -120, y: 450, width: 1500, height: 96, fill: { $t: 'colors.light' }, opacity: 0.16, rotation: -30, zIndex: 3, animation: { name: 'float', duration: 8600, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'wl-r4', group: 'wl-r', type: 'shape', shapeKind: 'rect', x: -120, y: 600, width: 1500, height: 44, fill: { $t: 'colors.light' }, opacity: 0.1, rotation: -30, zIndex: 3 },
      // 文字（统一 x=120）
      { id: 'wl-kicker', type: 'text', content: 'AFTERNOON · 16:40', fontFamily: { $t: 'fonts.mono' }, fontSize: 26, fontWeight: '600', color: { $t: 'colors.muted' }, letterSpacing: 6, x: 120, y: 200, width: 840, height: 36, zIndex: 6, animation: { name: 'fadeIn', duration: 600 }, editable: { content: true } },
      { id: 'wl-title', type: 'text', content: '把午后\n还给窗台', fontFamily: { $t: 'fonts.cjk' }, fontSize: 72, fontWeight: '700', color: { $t: 'colors.ink' }, lineHeight: 1.5, x: 120, y: 860, width: 840, height: 230, zIndex: 6, animation: { name: 'fadeInUp', duration: 880, delay: 160 }, editable: { content: true, fontSize: { type: 'range', min: 56, max: 84 } } },
      { id: 'wl-sub', type: 'text', content: '风很轻，时间走得很慢。', fontFamily: { $t: 'fonts.cjk' }, fontSize: 30, color: { $t: 'colors.ink' }, opacity: 0.8, x: 120, y: 1120, width: 840, height: 80, zIndex: 6, animation: { name: 'rise', duration: 800, delay: 260 }, editable: { content: true } },
      { id: 'wl-foot', type: 'text', content: 'STUDIO HY · QUIET SERIES', fontFamily: { $t: 'fonts.mono' }, fontSize: 22, color: { $t: 'colors.muted' }, opacity: 0.6, letterSpacing: 3, x: 120, y: 1300, width: 840, height: 30, zIndex: 6, animation: { name: 'fadeIn', duration: 700, delay: 320 }, editable: { content: true } },
      { id: 'wl-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1440, background: `url("${grainSoft(300, 11, 0.5)}")`, opacity: 0.05, mixBlendMode: 'multiply', zIndex: 9 }
    ]
  }
]

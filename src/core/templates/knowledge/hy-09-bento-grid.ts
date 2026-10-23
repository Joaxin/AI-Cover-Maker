// src/core/templates/knowledge/hy-09-bento-grid.ts
// HY 系列 · 便当盒网格（1:1）｜ 苹果式 Bento 信息块，干货/清单类封面
import type { Template } from '@/types/types'
import { SANS, HEI, MONO, grainSoft } from '../_fx/trend'

export const hy09BentoGridTemplates: Template[] = [
  {
    schemaVersion: 1,
    id: 'hy-09-bento-grid', name: '便当盒网格', version: '1.0.0', category: 'knowledge',
    tags: ['hy', 'bento', 'grid', 'checklist', 'knowledge', '1:1'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23EEF2F7"/><rect x="8" y="9" width="40" height="7" rx="3.5" fill="%232F6FED"/><rect x="8" y="21" width="70" height="10" rx="5" fill="%2316233A"/><rect x="8" y="37" width="52" height="27" rx="7" fill="%23FFFFFF"/><rect x="64" y="37" width="28" height="27" rx="7" fill="%23FFFFFF"/><rect x="8" y="68" width="28" height="27" rx="7" fill="%23FFFFFF"/><rect x="40" y="68" width="52" height="27" rx="7" fill="%23FFFFFF"/><circle cx="18" cy="45" r="4" fill="%232F6FED"/><circle cx="74" cy="45" r="4" fill="%237FB2FF"/><circle cx="18" cy="75" r="4" fill="%237FB2FF"/></svg>',
    tokens: {
      colors: {
        bg: { label: '底色', default: '#EEF2F7', options: ['#EEF2F7', '#FDF3E7', '#E8F5EE', '#0F1420'] },
        ink: { label: '主文字', default: '#16233A', options: ['#16233A', '#3A2412', '#123528', '#EEF2F9'] },
        muted: { label: '灰字', default: '#6B7C93', options: ['#6B7C93', '#94755A', '#5F7F6E', '#8A97AC'] },
        accent: { label: '强调色', default: '#2F6FED', options: ['#2F6FED', '#F08A24', '#12A374', '#5B8CFF'] },
        accent2: { label: '次强调', default: '#7FB2FF', options: ['#7FB2FF', '#FFC46B', '#7FD9B6', '#A78BFA'] },
        surface: { label: '卡片面', default: '#FFFFFF', options: ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#1B2331'] }
      },
      fonts: {
        display: { label: '数字英文', default: SANS, options: [SANS, MONO] },
        cjk: { label: '中文体', default: HEI, options: [HEI, SANS] },
        mono: { label: '等宽', default: MONO, options: [MONO, SANS] }
      }
    },
    presets: [
      { name: '雾蓝', colors: { bg: '#EEF2F7', ink: '#16233A', muted: '#6B7C93', accent: '#2F6FED', accent2: '#7FB2FF', surface: '#FFFFFF' } },
      { name: '暖橙', colors: { bg: '#FDF3E7', ink: '#3A2412', muted: '#94755A', accent: '#F08A24', accent2: '#FFC46B', surface: '#FFFFFF' } },
      { name: '薄荷', colors: { bg: '#E8F5EE', ink: '#123528', muted: '#5F7F6E', accent: '#12A374', accent2: '#7FD9B6', surface: '#FFFFFF' } },
      { name: '暗夜', colors: { bg: '#0F1420', ink: '#EEF2F9', muted: '#8A97AC', accent: '#5B8CFF', accent2: '#A78BFA', surface: '#1B2331' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1080, defaultWidth: 1080, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      // ── 底层：柔光 / 暗角 / 噪点 ──
      { id: 'bg-wash', type: 'overlay', x: 0, y: 0, width: 1080, height: 1080, background: 'radial-gradient(circle at 24% 8%, rgba(255,255,255,0.9), rgba(255,255,255,0) 58%)', mixBlendMode: 'soft-light', opacity: 0.55, zIndex: 0 },
      { id: 'bg-vignette', type: 'overlay', x: 0, y: 0, width: 1080, height: 1080, background: 'radial-gradient(circle at 84% 94%, rgba(0,0,0,0.12), rgba(0,0,0,0) 56%)', mixBlendMode: 'multiply', opacity: 0.7, zIndex: 0 },
      { id: 'bg-orb', type: 'shape', shapeKind: 'circle', x: 812, y: 96, width: 216, height: 216, fill: { $t: 'colors.accent2' }, opacity: 0.2, borderRadius: 108, zIndex: 1, animation: { name: 'float', duration: 9000, iterationCount: 'infinite', easing: 'ease-in-out' } },

      // ── 页眉：小标签 + 大标题 ──
      { id: 'hd-kicker', type: 'text', content: '高效学习 · 立刻上手', fontFamily: { $t: 'fonts.cjk' }, fontSize: 19, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 6, x: 88, y: 74, width: 904, height: 30, zIndex: 6, animation: { name: 'slideInLeft', duration: 700 }, editable: { content: true } },
      { id: 'hd-kicker-en', type: 'text', content: 'BENTO KNOWLEDGE CARDS 2026', fontFamily: { $t: 'fonts.mono' }, fontSize: 19, fontWeight: '600', color: { $t: 'colors.muted' }, letterSpacing: 2, textAlign: 'right', x: 560, y: 74, width: 432, height: 30, zIndex: 6, animation: { name: 'fadeIn', duration: 700, delay: 120 } },
      { id: 'hd-title', type: 'text', content: '把复杂的事\n收进 6 张卡片', fontFamily: { $t: 'fonts.cjk' }, fontSize: 92, fontWeight: '800', color: { $t: 'colors.ink' }, lineHeight: 1.2, letterSpacing: -1, x: 88, y: 118, width: 904, height: 230, zIndex: 6, animation: { name: 'fadeInUp', duration: 900, delay: 60 }, editable: { content: true, fontSize: { type: 'range', min: 68, max: 104 } } },
      { id: 'hd-rule', type: 'shape', shapeKind: 'line', x: 88, y: 356, width: 904, height: 2, fill: { $t: 'colors.ink' }, opacity: 0.14, zIndex: 2 },

      // ── 便当盒 · 第一排 ──
      { id: 'a1-card', type: 'shape', shapeKind: 'rect', x: 88, y: 380, width: 428, height: 250, fill: { $t: 'colors.surface' }, borderRadius: 28, border: { width: 1, style: 'solid', color: 'rgba(0,0,0,0.06)' }, shadow: { offsetX: 0, offsetY: 10, blur: 26, color: 'rgba(0,0,0,0.07)' }, zIndex: 3, animation: { name: 'zoomIn', duration: 760, delay: 160 } },
      { id: 'a1-icon', type: 'shape', shapeKind: 'circle', x: 112, y: 404, width: 56, height: 56, fill: { $t: 'colors.accent' }, borderRadius: 28, zIndex: 4, animation: { name: 'pulse', duration: 4200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'a1-tag', type: 'text', content: 'CHECKLIST', fontFamily: { $t: 'fonts.mono' }, fontSize: 24, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 3, x: 184, y: 418, width: 300, height: 32, zIndex: 5, animation: { name: 'fadeIn', duration: 700, delay: 260 } },
      { id: 'a1-num', type: 'text', content: '01', fontFamily: { $t: 'fonts.display' }, fontSize: 56, fontWeight: '800', color: { $t: 'colors.ink' }, lineHeight: 1.15, x: 112, y: 470, width: 380, height: 70, zIndex: 5, animation: { name: 'fadeInUp', duration: 700, delay: 200 }, editable: { content: true } },
      { id: 'a1-label', type: 'text', content: '先讲结论，再讲论证', fontFamily: { $t: 'fonts.cjk' }, fontSize: 30, fontWeight: '700', color: { $t: 'colors.muted' }, lineHeight: 1.2, x: 112, y: 548, width: 380, height: 44, zIndex: 5, animation: { name: 'rise', duration: 700, delay: 280 }, editable: { content: true } },

      { id: 'a2-card', type: 'shape', shapeKind: 'rect', x: 536, y: 380, width: 228, height: 250, fill: { $t: 'colors.surface' }, borderRadius: 28, border: { width: 1, style: 'solid', color: 'rgba(0,0,0,0.06)' }, shadow: { offsetX: 0, offsetY: 10, blur: 26, color: 'rgba(0,0,0,0.07)' }, zIndex: 3, animation: { name: 'zoomIn', duration: 760, delay: 220 } },
      { id: 'a2-icon', type: 'shape', shapeKind: 'circle', x: 560, y: 408, width: 48, height: 48, fill: { $t: 'colors.accent2' }, borderRadius: 24, zIndex: 4, animation: { name: 'heartbeat', duration: 5200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'a2-num', type: 'text', content: '02', fontFamily: { $t: 'fonts.display' }, fontSize: 56, fontWeight: '800', color: { $t: 'colors.ink' }, lineHeight: 1.15, x: 560, y: 470, width: 180, height: 70, zIndex: 5, animation: { name: 'fadeInUp', duration: 700, delay: 300 }, editable: { content: true } },
      { id: 'a2-label', type: 'text', content: '一段一重点', fontFamily: { $t: 'fonts.cjk' }, fontSize: 30, fontWeight: '700', color: { $t: 'colors.muted' }, lineHeight: 1.2, x: 560, y: 548, width: 180, height: 44, zIndex: 5, animation: { name: 'rise', duration: 700, delay: 360 }, editable: { content: true } },

      { id: 'a3-card', type: 'shape', shapeKind: 'rect', x: 784, y: 380, width: 208, height: 250, fill: { $t: 'colors.surface' }, borderRadius: 28, border: { width: 1, style: 'solid', color: 'rgba(0,0,0,0.06)' }, shadow: { offsetX: 0, offsetY: 10, blur: 26, color: 'rgba(0,0,0,0.07)' }, zIndex: 3, animation: { name: 'zoomIn', duration: 760, delay: 280 } },
      { id: 'a3-icon', type: 'shape', shapeKind: 'circle', x: 808, y: 408, width: 48, height: 48, fill: { $t: 'colors.accent' }, borderRadius: 24, zIndex: 4, animation: { name: 'twinkle', duration: 4600, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'a3-num', type: 'text', content: '03', fontFamily: { $t: 'fonts.display' }, fontSize: 56, fontWeight: '800', color: { $t: 'colors.ink' }, lineHeight: 1.15, x: 808, y: 470, width: 160, height: 70, zIndex: 5, animation: { name: 'fadeInUp', duration: 700, delay: 380 }, editable: { content: true } },
      { id: 'a3-label', type: 'text', content: '马上能用', fontFamily: { $t: 'fonts.cjk' }, fontSize: 30, fontWeight: '700', color: { $t: 'colors.muted' }, lineHeight: 1.2, x: 808, y: 548, width: 160, height: 44, zIndex: 5, animation: { name: 'rise', duration: 700, delay: 440 }, editable: { content: true } },

      // ── 便当盒 · 第二排 ──
      { id: 'b1-card', type: 'shape', shapeKind: 'rect', x: 88, y: 650, width: 228, height: 250, fill: { $t: 'colors.surface' }, borderRadius: 28, border: { width: 1, style: 'solid', color: 'rgba(0,0,0,0.06)' }, shadow: { offsetX: 0, offsetY: 10, blur: 26, color: 'rgba(0,0,0,0.07)' }, zIndex: 3, animation: { name: 'zoomIn', duration: 760, delay: 340 } },
      { id: 'b1-icon', type: 'shape', shapeKind: 'circle', x: 112, y: 678, width: 48, height: 48, fill: { $t: 'colors.accent2' }, borderRadius: 24, zIndex: 4, animation: { name: 'float', duration: 6400, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'b1-num', type: 'text', content: '04', fontFamily: { $t: 'fonts.display' }, fontSize: 56, fontWeight: '800', color: { $t: 'colors.ink' }, lineHeight: 1.15, x: 112, y: 740, width: 180, height: 70, zIndex: 5, animation: { name: 'fadeInUp', duration: 700, delay: 460 }, editable: { content: true } },
      { id: 'b1-label', type: 'text', content: '少即是多', fontFamily: { $t: 'fonts.cjk' }, fontSize: 30, fontWeight: '700', color: { $t: 'colors.muted' }, lineHeight: 1.2, x: 112, y: 818, width: 180, height: 44, zIndex: 5, animation: { name: 'rise', duration: 700, delay: 520 }, editable: { content: true } },

      { id: 'b2-card', type: 'shape', shapeKind: 'rect', x: 336, y: 650, width: 320, height: 250, fill: { $t: 'colors.surface' }, borderRadius: 28, border: { width: 1, style: 'solid', color: 'rgba(0,0,0,0.06)' }, shadow: { offsetX: 0, offsetY: 10, blur: 26, color: 'rgba(0,0,0,0.07)' }, zIndex: 3, animation: { name: 'zoomIn', duration: 760, delay: 400 } },
      { id: 'b2-icon', type: 'shape', shapeKind: 'circle', x: 360, y: 678, width: 48, height: 48, fill: { $t: 'colors.accent' }, borderRadius: 24, zIndex: 4, animation: { name: 'pulse', duration: 4800, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'b2-num', type: 'text', content: '05', fontFamily: { $t: 'fonts.display' }, fontSize: 56, fontWeight: '800', color: { $t: 'colors.ink' }, lineHeight: 1.15, x: 360, y: 740, width: 272, height: 70, zIndex: 5, animation: { name: 'fadeInUp', duration: 700, delay: 540 }, editable: { content: true } },
      { id: 'b2-label', type: 'text', content: '举例要给场景', fontFamily: { $t: 'fonts.cjk' }, fontSize: 30, fontWeight: '700', color: { $t: 'colors.muted' }, lineHeight: 1.2, x: 360, y: 818, width: 272, height: 44, zIndex: 5, animation: { name: 'rise', duration: 700, delay: 600 }, editable: { content: true } },

      { id: 'b3-card', type: 'shape', shapeKind: 'rect', x: 676, y: 650, width: 316, height: 250, fill: { $t: 'colors.surface' }, borderRadius: 28, border: { width: 1, style: 'solid', color: 'rgba(0,0,0,0.06)' }, shadow: { offsetX: 0, offsetY: 10, blur: 26, color: 'rgba(0,0,0,0.07)' }, zIndex: 3, animation: { name: 'zoomIn', duration: 760, delay: 460 } },
      { id: 'b3-icon', type: 'shape', shapeKind: 'circle', x: 700, y: 678, width: 48, height: 48, fill: { $t: 'colors.accent2' }, borderRadius: 24, zIndex: 4, animation: { name: 'drift', duration: 8600, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'b3-num', type: 'text', content: '06', fontFamily: { $t: 'fonts.display' }, fontSize: 56, fontWeight: '800', color: { $t: 'colors.ink' }, lineHeight: 1.15, x: 700, y: 740, width: 268, height: 70, zIndex: 5, animation: { name: 'fadeInUp', duration: 700, delay: 620 }, editable: { content: true } },
      { id: 'b3-label', type: 'text', content: '结尾留个行动', fontFamily: { $t: 'fonts.cjk' }, fontSize: 30, fontWeight: '700', color: { $t: 'colors.muted' }, lineHeight: 1.2, x: 700, y: 818, width: 268, height: 44, zIndex: 5, animation: { name: 'rise', duration: 700, delay: 680 }, editable: { content: true } },

      // ── 页脚：行动条 + 角标 ──
      { id: 'ft-pill', type: 'shape', shapeKind: 'rect', x: 88, y: 920, width: 420, height: 80, fill: { $t: 'colors.accent' }, borderRadius: 40, shadow: { offsetX: 0, offsetY: 10, blur: 22, color: 'rgba(0,0,0,0.12)' }, zIndex: 6, animation: { name: 'fadeInUp', duration: 700, delay: 740 } },
      { id: 'ft-pill-t', type: 'text', content: '收藏这份清单', fontFamily: { $t: 'fonts.cjk' }, fontSize: 24, fontWeight: '700', color: '#fff', textAlign: 'center', lineHeight: 3.3, x: 88, y: 920, width: 420, height: 80, zIndex: 7, editable: { content: true } },
      { id: 'ft-note', type: 'text', content: 'SIX CARDS · ONE CHECKLIST', fontFamily: { $t: 'fonts.mono' }, fontSize: 19, fontWeight: '600', color: { $t: 'colors.muted' }, letterSpacing: 3, textAlign: 'right', x: 560, y: 950, width: 432, height: 30, zIndex: 6, animation: { name: 'fadeIn', duration: 700, delay: 800 } },
      { id: 'cnr-dot', type: 'shape', shapeKind: 'rect', x: 1000, y: 986, width: 32, height: 32, fill: { $t: 'colors.accent' }, borderRadius: 16, opacity: 0.9, zIndex: 6, animation: { name: 'blink', duration: 3600, iterationCount: 'infinite', easing: 'ease-in-out' } },

      // ── 顶层噪点 ──
      { id: 'bg-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1080, background: `url("${grainSoft(300, 27, 0.5)}")`, opacity: 0.06, mixBlendMode: 'multiply', zIndex: 9 }
    ]
  }
]

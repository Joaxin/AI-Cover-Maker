// src/core/templates/simple/st-05-capsule-ui.ts
// 署名系列 st-05 ｜ 简洁风（simple）｜ 胶囊色块 UI / Capsule Blocks（1:1 方形）
// 大圆角胶囊 + 圆角方块、浅色底 + 单一强调色、干净网格与图标化细节
import type { Template } from '@/types/types'
import { SANS, HEI, SONG, MONO, grainSoft } from '../_fx/trend'

export const st05CapsuleUiTemplates: Template[] = [
  {
    schemaVersion: 1,
    id: 'st-05-capsule-ui',
    name: '胶囊色块',
    version: '1.0.0',
    category: 'simple',
    tags: ['st', 'simple', 'capsule', 'ui kit', 'pill', 'bento', '1:1'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23EDF2F9"/><rect x="10" y="10" width="30" height="9" rx="4.5" fill="%232E6BFF"/><circle cx="88" cy="15" r="11" fill="%23A9C3F7"/><rect x="10" y="30" width="50" height="10" rx="5" fill="%23171C26"/><rect x="10" y="44" width="38" height="10" rx="5" fill="%23171C26"/><rect x="10" y="62" width="24" height="18" rx="6" fill="%23FFFFFF"/><rect x="38" y="62" width="24" height="18" rx="6" fill="%23FFFFFF"/><rect x="66" y="62" width="24" height="18" rx="6" fill="%23FFFFFF"/><rect x="10" y="86" width="34" height="9" rx="4.5" fill="%23171C26"/><circle cx="88" cy="90" r="3.5" fill="%232E6BFF"/></svg>',
    tokens: {
      colors: {
        bg: { label: '底色', default: '#EDF2F9', options: ['#EDF2F9', '#FBF2E8', '#E9F6EF', '#F2F2F3', '#FFFFFF'] },
        ink: { label: '文字', default: '#171C26', options: ['#171C26', '#2A2015', '#12251C', '#1C1E22', '#FFFFFF'] },
        accent: { label: '强调色', default: '#2E6BFF', options: ['#2E6BFF', '#F07B26', '#0FA377', '#454C56', '#7A5AF8'] },
        accent2: { label: '浅强调', default: '#A9C3F7', options: ['#A9C3F7', '#F7C9A0', '#93DCC0', '#C0C6CE', '#D9CFFA'] },
        surface: { label: '卡片面', default: '#FFFFFF', options: ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#F7F8FA'] }
      },
      fonts: {
        latin: { label: '英文', default: SANS, options: [SANS, MONO] },
        cjk: { label: '中文', default: HEI, options: [HEI, SONG] },
        mono: { label: '等宽', default: MONO, options: [MONO, SANS] }
      }
    },
    presets: [
      { name: '晨雾蓝', colors: { bg: '#EDF2F9', ink: '#171C26', accent: '#2E6BFF', accent2: '#A9C3F7', surface: '#FFFFFF' } },
      { name: '暖杏', colors: { bg: '#FBF2E8', ink: '#2A2015', accent: '#F07B26', accent2: '#F7C9A0', surface: '#FFFFFF' } },
      { name: '薄荷', colors: { bg: '#E9F6EF', ink: '#12251C', accent: '#0FA377', accent2: '#93DCC0', surface: '#FFFFFF' } },
      { name: '石墨灰', colors: { bg: '#F2F2F3', ink: '#1C1E22', accent: '#454C56', accent2: '#C0C6CE', surface: '#FFFFFF' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1080, defaultWidth: 1080, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      // —— 底层：左上柔光 / 底部暗角 / 细噪点
      { id: 'cb-glow', type: 'overlay', x: 0, y: 0, width: 1080, height: 1080, background: 'radial-gradient(115% 85% at 14% 0%, rgba(255,255,255,0.95), rgba(255,255,255,0) 58%)', opacity: 0.8, zIndex: 1 },
      { id: 'cb-vignette', type: 'overlay', x: 0, y: 0, width: 1080, height: 1080, background: 'linear-gradient(180deg, rgba(20,24,32,0) 58%, rgba(20,24,32,0.08) 100%)', zIndex: 2 },
      { id: 'cb-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1080, background: `url("${grainSoft(300, 33, 0.55)}")`, opacity: 0.06, mixBlendMode: 'multiply', zIndex: 30 },

      // —— 装饰层：浅色团 / 圆环 / 背景大编号 / 十字标 / CTA 光晕
      { id: 'cb-decor-blob', type: 'shape', shapeKind: 'circle', x: 800, y: 44, width: 252, height: 252, fill: { $t: 'colors.accent2' }, opacity: 0.38, zIndex: 2, animation: { name: 'float', duration: 9000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'cb-decor-ring', type: 'shape', shapeKind: 'circle', x: 820, y: 540, width: 170, height: 170, fill: 'transparent', border: { width: 12, color: { $t: 'colors.accent2' } }, opacity: 0.85, zIndex: 3, animation: { name: 'spinSlow', duration: 26000, iterationCount: 'infinite', easing: 'linear' } },
      { id: 'cb-bg-num-05', type: 'text', content: '05', fontFamily: { $t: 'fonts.latin' }, fontSize: 200, fontWeight: '800', color: { $t: 'colors.ink' }, opacity: 0.07, letterSpacing: 4, lineHeight: 1.05, x: 760, y: 200, width: 240, height: 240, zIndex: 2 },
      { id: 'cb-decor-plus-h', type: 'shape', shapeKind: 'line', x: 940, y: 312, width: 28, height: 4, fill: { $t: 'colors.ink' }, opacity: 0.45, borderRadius: 2, zIndex: 4 },
      { id: 'cb-decor-plus-v', type: 'shape', shapeKind: 'line', x: 952, y: 300, width: 4, height: 28, fill: { $t: 'colors.ink' }, opacity: 0.45, borderRadius: 2, zIndex: 4 },
      { id: 'cb-cta-halo', type: 'shape', shapeKind: 'circle', x: 400, y: 890, width: 170, height: 170, fill: { $t: 'colors.accent2' }, opacity: 0.3, zIndex: 2, animation: { name: 'pulse', duration: 7000, iterationCount: 'infinite', easing: 'ease-in-out' } },

      // —— 页眉：强调色胶囊 + 等宽小字（隐性署名）
      { id: 'cb-chip', type: 'shape', shapeKind: 'rect', x: 88, y: 96, width: 300, height: 64, fill: { $t: 'colors.accent' }, borderRadius: 32, zIndex: 5, shadow: { offsetX: 0, offsetY: 10, blur: 22, color: 'rgba(20,24,32,0.14)' }, animation: { name: 'slideInLeft', duration: 700 } },
      { id: 'cb-chip-t', type: 'text', content: 'CAPSULE UI 05', fontFamily: { $t: 'fonts.latin' }, fontSize: 26, fontWeight: '700', color: '#FFFFFF', letterSpacing: 2, textAlign: 'center', lineHeight: 2.46, x: 88, y: 96, width: 300, height: 64, zIndex: 6, editable: { content: true } },
      { id: 'cb-note', type: 'text', content: 'ST · UI KIT 05', fontFamily: { $t: 'fonts.mono' }, fontSize: 22, fontWeight: '500', color: { $t: 'colors.ink' }, opacity: 0.55, letterSpacing: 3, textAlign: 'right', lineHeight: 1.3, x: 592, y: 112, width: 400, height: 32, zIndex: 6 },

      // —— 标题区
      { id: 'cb-title', type: 'text', content: '把复杂功能，\n装进一颗胶囊。', fontFamily: { $t: 'fonts.cjk' }, fontSize: 116, fontWeight: '800', color: { $t: 'colors.ink' }, lineHeight: 1.24, letterSpacing: 2, x: 88, y: 240, width: 904, height: 300, zIndex: 8, animation: { name: 'fadeInUp', duration: 900 }, editable: { content: true, fontSize: { type: 'range', min: 96, max: 132 } } },
      { id: 'cb-sub', type: 'text', content: '胶囊色块排版：圆角、留白、\n一个强调色，就够高级。', fontFamily: { $t: 'fonts.cjk' }, fontSize: 44, fontWeight: '500', color: { $t: 'colors.ink' }, opacity: 0.78, lineHeight: 1.5, x: 88, y: 560, width: 904, height: 150, zIndex: 8, animation: { name: 'rise', duration: 900, delay: 160 }, editable: { content: true } },

      // —— Bento 卡片行：圆角方块 + 图标化细节
      { id: 'cb-card-a', type: 'shape', shapeKind: 'rect', x: 88, y: 720, width: 280, height: 190, fill: { $t: 'colors.surface' }, borderRadius: 40, zIndex: 6, shadow: { offsetX: 0, offsetY: 18, blur: 36, color: 'rgba(20,24,32,0.10)' }, animation: { name: 'fadeInUp', duration: 800, delay: 240 } },
      { id: 'cb-card-a-icon', type: 'shape', shapeKind: 'rect', x: 116, y: 748, width: 56, height: 24, fill: { $t: 'colors.accent' }, borderRadius: 12, zIndex: 7 },
      { id: 'cb-card-a-num', type: 'text', content: '01', fontFamily: { $t: 'fonts.latin' }, fontSize: 44, fontWeight: '800', color: { $t: 'colors.ink' }, lineHeight: 1.2, x: 116, y: 792, width: 120, height: 64, zIndex: 7, animation: { name: 'fadeIn', duration: 700, delay: 420 } },
      { id: 'cb-card-a-label', type: 'text', content: '圆角即语气', fontFamily: { $t: 'fonts.cjk' }, fontSize: 26, fontWeight: '600', color: { $t: 'colors.ink' }, opacity: 0.6, lineHeight: 1.3, x: 116, y: 844, width: 200, height: 52, zIndex: 7, editable: { content: true } },

      { id: 'cb-card-b', type: 'shape', shapeKind: 'rect', x: 400, y: 720, width: 280, height: 190, fill: { $t: 'colors.surface' }, borderRadius: 40, zIndex: 6, shadow: { offsetX: 0, offsetY: 18, blur: 36, color: 'rgba(20,24,32,0.10)' }, animation: { name: 'fadeInUp', duration: 800, delay: 320 } },
      { id: 'cb-card-b-l1', type: 'shape', shapeKind: 'line', x: 428, y: 750, width: 64, height: 6, fill: { $t: 'colors.ink' }, opacity: 0.75, borderRadius: 3, zIndex: 7 },
      { id: 'cb-card-b-l2', type: 'shape', shapeKind: 'line', x: 428, y: 764, width: 40, height: 6, fill: { $t: 'colors.ink' }, opacity: 0.3, borderRadius: 3, zIndex: 7 },
      { id: 'cb-card-b-num', type: 'text', content: '02', fontFamily: { $t: 'fonts.latin' }, fontSize: 44, fontWeight: '800', color: { $t: 'colors.ink' }, lineHeight: 1.2, x: 428, y: 792, width: 120, height: 64, zIndex: 7, animation: { name: 'fadeIn', duration: 700, delay: 500 } },
      { id: 'cb-card-b-label', type: 'text', content: '留白即节奏', fontFamily: { $t: 'fonts.cjk' }, fontSize: 26, fontWeight: '600', color: { $t: 'colors.ink' }, opacity: 0.6, lineHeight: 1.3, x: 428, y: 844, width: 200, height: 52, zIndex: 7, editable: { content: true } },

      { id: 'cb-card-c', type: 'shape', shapeKind: 'rect', x: 712, y: 720, width: 280, height: 190, fill: { $t: 'colors.surface' }, borderRadius: 40, zIndex: 6, shadow: { offsetX: 0, offsetY: 18, blur: 36, color: 'rgba(20,24,32,0.10)' }, animation: { name: 'fadeInUp', duration: 800, delay: 400 } },
      { id: 'cb-card-c-dot', type: 'shape', shapeKind: 'circle', x: 740, y: 744, width: 26, height: 26, fill: { $t: 'colors.accent2' }, zIndex: 7 },
      { id: 'cb-card-c-pill', type: 'shape', shapeKind: 'rect', x: 776, y: 750, width: 52, height: 22, fill: { $t: 'colors.accent' }, borderRadius: 11, zIndex: 7 },
      { id: 'cb-card-c-num', type: 'text', content: '03', fontFamily: { $t: 'fonts.latin' }, fontSize: 44, fontWeight: '800', color: { $t: 'colors.ink' }, lineHeight: 1.2, x: 740, y: 792, width: 120, height: 64, zIndex: 7, animation: { name: 'fadeIn', duration: 700, delay: 580 } },
      { id: 'cb-card-c-label', type: 'text', content: '强调即焦点', fontFamily: { $t: 'fonts.cjk' }, fontSize: 26, fontWeight: '600', color: { $t: 'colors.ink' }, opacity: 0.6, lineHeight: 1.3, x: 740, y: 844, width: 200, height: 52, zIndex: 7, editable: { content: true } },

      // —— 底部：CTA 胶囊 + 状态点 + 等宽署名
      { id: 'cb-cta', type: 'shape', shapeKind: 'rect', x: 88, y: 946, width: 430, height: 100, fill: { $t: 'colors.ink' }, borderRadius: 50, zIndex: 8, shadow: { offsetX: 0, offsetY: 16, blur: 32, color: 'rgba(20,24,32,0.18)' }, animation: { name: 'pulse', duration: 5200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'cb-cta-t', type: 'text', content: '拿走就能用', fontFamily: { $t: 'fonts.cjk' }, fontSize: 32, fontWeight: '700', color: '#FFFFFF', textAlign: 'center', lineHeight: 3.125, x: 88, y: 946, width: 430, height: 100, zIndex: 9, editable: { content: true } },
      { id: 'cb-dot-1', group: 'cb-dot-', type: 'shape', shapeKind: 'circle', x: 560, y: 989, width: 14, height: 14, fill: { $t: 'colors.accent' }, zIndex: 9, animation: { name: 'twinkle', duration: 3000, iterationCount: 'infinite' } },
      { id: 'cb-dot-2', group: 'cb-dot-', type: 'shape', shapeKind: 'circle', x: 592, y: 989, width: 14, height: 14, fill: { $t: 'colors.ink' }, opacity: 0.2, zIndex: 9 },
      { id: 'cb-dot-3', group: 'cb-dot-', type: 'shape', shapeKind: 'circle', x: 624, y: 989, width: 14, height: 14, fill: { $t: 'colors.accent2' }, zIndex: 9, animation: { name: 'twinkle', duration: 3000, delay: 800, iterationCount: 'infinite' } },
      { id: 'cb-sig', type: 'text', content: 'NO.ST-05', fontFamily: { $t: 'fonts.mono' }, fontSize: 22, fontWeight: '500', color: { $t: 'colors.ink' }, opacity: 0.55, letterSpacing: 3, textAlign: 'right', lineHeight: 1.3, x: 560, y: 986, width: 432, height: 32, zIndex: 9 }
    ]
  }
]

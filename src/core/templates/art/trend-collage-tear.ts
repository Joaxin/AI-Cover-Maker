// src/core/templates/art/trend-collage-tear.ts
// 当红趋势批 → 归入「艺术风」（art） ｜ 8. maximalist 撕纸拼贴（3:4）
// 迁移自 src/core/templates/trend/：模板内容、素材函数与外观保持不变，只改分类归属。
import type { Template } from '@/types/types'
import {HEI, SONG, MONO, IMPACT, grainSoft, tapeSoft, scrap, grain, tape} from '../_fx/trend'

export const trendCollageTearTemplates: Template[] = [
  {
    id: 'trend-collage-tear', name: '撕纸拼贴海报', version: '1.0.0', category: 'art',
    tags: ['trend', 'collage', 'maximalist', 'torn paper', 'mixed media', '3:4'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="133" viewBox="0 0 100 133"><rect width="100" height="133" fill="%23EDE7DA"/><polygon points="10,30 60,20 86,44 40,58" fill="%23E11D48" opacity="0.9"/><polygon points="18,70 78,62 88,96 26,104" fill="%231D4ED8" opacity="0.85"/><rect x="12" y="108" width="60" height="9" fill="%23111"/><rect x="30" y="44" width="40" height="6" fill="%23F8FAFC" opacity="0.8" transform="rotate(-6 50 47)"/></svg>',
    tokens: {
      colors: {
        bg: { label: '底板', default: '#EDE7DA', options: ['#EDE7DA', '#F4F1EA', '#E7E5E4', '#F5E6D3'] },
        ink: { label: '墨', default: '#141414', options: ['#141414', '#3B2F2A', '#111827', '#1F2937'] },
        paperA: { label: '撕片 A', default: '#E11D48', options: ['#E11D48', '#F59E0B', '#0D9488', '#7C3AED'] },
        paperB: { label: '撕片 B', default: '#1D4ED8', options: ['#1D4ED8', '#155E75', '#B45309', '#BE185D'] }
      },
      fonts: { latin: { label: '英文拼贴体', default: '"Times New Roman", Georgia, serif', options: ['"Times New Roman", Georgia, serif', IMPACT, MONO] }, cjk: { label: '中文体', default: SONG, options: [SONG, HEI, MONO] } }
    },
    presets: [
      { name: '红蓝撞色', colors: { bg: '#EDE7DA', ink: '#141414', paperA: '#E11D48', paperB: '#1D4ED8' } },
      { name: '姜黄靛青', colors: { bg: '#F4F1EA', ink: '#3B2F2A', paperA: '#F59E0B', paperB: '#155E75' } },
      { name: '松柏墨黑', colors: { bg: '#E7E5E4', ink: '#111827', paperA: '#0D9488', paperB: '#B45309' } },
      { name: '紫红胶片', colors: { bg: '#F5E6D3', ink: '#1F2937', paperA: '#7C3AED', paperB: '#BE185D' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1440, defaultWidth: 1080, defaultHeight: 1440, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'cc-hairline', type: 'shape', shapeKind: 'rect', x: 72, y: 72, width: 936, height: 1296, fill: 'transparent', border: { width: 2, color: { $t: 'colors.ink' } }, opacity: 0.3, zIndex: 2 },
      { id: 'cc-scrap-a', type: 'image', src: scrap(880, 420, '%23E11D48', 9), x: 96, y: 210, width: 880, height: 420, objectFit: 'fill', zIndex: 3, rotation: -3.2 },
      { id: 'cc-scrap-b', type: 'image', src: scrap(820, 380, '%231D4ED8', 31), x: 180, y: 560, width: 820, height: 380, objectFit: 'fill', zIndex: 4, rotation: 2.6, opacity: 0.92 },
      { id: 'cc-scrap-c', type: 'image', src: scrap(520, 220, '%23F8FAFC', 53), x: 96, y: 880, width: 520, height: 220, objectFit: 'fill', zIndex: 5, rotation: -1.6 },
      { id: 'cc-kicker', type: 'text', content: 'MAXIMALIST / 拼贴 · 叠层 · 失控', fontFamily: { $t: 'fonts.cjk' }, fontSize: 25, color: { $t: 'colors.ink' }, opacity: 0.7, letterSpacing: 4, x: 96, y: 128, width: 900, height: 36, zIndex: 8, animation: { name: 'fadeIn', duration: 700 } },
      { id: 'cc-h1', type: 'text', content: 'MORE\nIS\nMORE', fontFamily: { $t: 'fonts.latin' }, fontSize: 158, fontWeight: '700', color: { $t: 'colors.ink' }, lineHeight: 0.98, letterSpacing: -3, x: 132, y: 246, width: 800, height: 400, zIndex: 6, rotation: -2, animation: { name: 'inkReveal', duration: 1200 }, editable: { content: true, fontSize: { type: 'range', min: 110, max: 190 } } },
      { id: 'cc-h1b', type: 'text', content: '多多', fontFamily: { $t: 'fonts.cjk' }, fontSize: 150, fontWeight: '900', color: { $t: 'colors.bg' }, letterSpacing: 12, x: 470, y: 604, width: 520, height: 180, zIndex: 7, rotation: 3, animation: { name: 'slideUpFade', duration: 900, delay: 300 }, editable: { content: true } },
      { id: 'cc-tape', type: 'image', src: tapeSoft(300, 66, '%23F8FAFC'), x: 640, y: 178, width: 300, height: 66, zIndex: 9, rotation: 8 },
      { id: 'cc-cn', type: 'text', content: '元素越多，\n越要有一根主线。', fontFamily: { $t: 'fonts.cjk' }, fontSize: 44, fontWeight: '700', color: { $t: 'colors.ink' }, lineHeight: 1.45, x: 128, y: 906, width: 460, height: 160, zIndex: 8, editable: { content: true } },
      { id: 'cc-list', type: 'text', content: '01 图层叠到喘不过气\n02 颜色互相吵一架\n03 留一处空白当出口', fontFamily: { $t: 'fonts.cjk' }, fontSize: 27, color: { $t: 'colors.ink' }, opacity: 0.8, lineHeight: 1.85, x: 640, y: 902, width: 400, height: 160, zIndex: 8, animation: { name: 'fadeInUp', duration: 800, delay: 420 }, editable: { content: true } },
      { id: 'cc-stamp', type: 'shape', shapeKind: 'circle', x: 128, y: 1112, width: 168, height: 168, fill: { $t: 'colors.paperA' }, opacity: 0.95, zIndex: 8, animation: { name: 'spinSlow', duration: 30000, iterationCount: 'infinite', easing: 'linear' } },
      { id: 'cc-stamp-t', type: 'text', content: 'CUT & PASTE', fontFamily: { $t: 'fonts.latin' }, fontSize: 26, fontWeight: '700', color: { $t: 'colors.bg' }, letterSpacing: 1, textAlign: 'center', lineHeight: 3.2, x: 128, y: 1112, width: 168, height: 168, zIndex: 9 },
      { id: 'cc-strip', type: 'shape', shapeKind: 'rect', x: 336, y: 1156, width: 660, height: 84, fill: { $t: 'colors.ink' }, zIndex: 8, rotation: -1.2 },
      { id: 'cc-strip-t', type: 'text', content: '撕纸 · 胶带 · 复印 · 扫描 · 再撕一次', fontFamily: { $t: 'fonts.cjk' }, fontSize: 30, color: { $t: 'colors.bg' }, letterSpacing: 3, textAlign: 'center', lineHeight: 2.8, x: 336, y: 1156, width: 660, height: 84, rotation: -1.2, zIndex: 9, editable: { content: true } },
      { id: 'cc-tab', type: 'shape', shapeKind: 'rect', x: 744, y: 1298, width: 240, height: 48, fill: { $t: 'colors.paperB' }, borderRadius: 24, zIndex: 8, rotation: -1.5 },
      { id: 'cc-tab-t', type: 'text', content: 'HAND-MADE', fontFamily: { $t: 'fonts.latin' }, fontSize: 22, fontWeight: '700', color: { $t: 'colors.bg' }, letterSpacing: 3, textAlign: 'center', lineHeight: 2.2, x: 744, y: 1298, width: 240, height: 48, rotation: -1.5, zIndex: 9 },
      { id: 'cc-foot', type: 'text', content: 'COLLAGE STUDIO / 手工数字混合 · 2026', fontFamily: { $t: 'fonts.cjk' }, fontSize: 22, color: { $t: 'colors.ink' }, opacity: 0.55, letterSpacing: 2, x: 96, y: 1310, width: 560, height: 30, zIndex: 8 },
      { id: 'cc-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1440, background: `url("${grainSoft(300, 21, 0.7)}")`, opacity: 0.1, mixBlendMode: 'multiply', zIndex: 10 }
    ]
  }
]

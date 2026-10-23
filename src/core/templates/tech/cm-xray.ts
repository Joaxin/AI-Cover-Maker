// src/core/templates/tech/cm-xray.ts
// CM 系列 · X 光通透（科技 / 透视封面）｜ 隐性 CM 标记
import type { Template } from '@/types/types'
import { SANS, HEI, SERIF, grainSoft } from '../_fx/trend'

export const cmXrayTemplates: Template[] = [
  {
    id: 'cm-xray', name: 'X光通透', version: '1.0.0', category: 'tech',
    tags: ['cm', 'xray', 'translucent', 'tech', 'cover'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="56" viewBox="0 0 100 56"><rect width="100" height="56" fill="%2304121A"/><circle cx="68" cy="28" r="22" fill="none" stroke="%2322D3EE" stroke-width="1.6" opacity="0.8"/><circle cx="68" cy="28" r="12" fill="none" stroke="%2338BDF8" stroke-width="1.6"/><line x1="68" y1="2" x2="68" y2="54" stroke="%2322D3EE" stroke-width="0.8" opacity="0.5"/><line x1="42" y1="28" x2="94" y2="28" stroke="%2322D3EE" stroke-width="0.8" opacity="0.5"/></svg>',
    tokens: {
      colors: {
        bg: { label: '底色', default: '#04121A', options: ['#04121A', '#06141F', '#0A0F1C', '#04161A'] },
        ink: { label: '文字', default: '#CFFAFE', options: ['#CFFAFE', '#E0F7FF', '#D7F0FF', '#CFFAF0'] },
        accent: { label: '强调', default: '#22D3EE', options: ['#22D3EE', '#06B6D4', '#2DD4BF', '#38BDF8'] },
        c1: { label: '辅助1', default: '#38BDF8', options: ['#38BDF8', '#0EA5E9', '#60A5FA', '#7DD3FC'] },
        c2: { label: '辅助2', default: '#7DD3FC', options: ['#7DD3FC', '#A5F3FC', '#99F6E4', '#Bae6fd'] }
      },
      fonts: {
        display: { label: '英文标题', default: SANS, options: [SANS, SERIF] },
        cjk: { label: '中文', default: HEI, options: [HEI, SANS] }
      }
    },
    presets: [
      { name: '深海透视', colors: { bg: '#04121A', ink: '#CFFAFE', accent: '#22D3EE', c1: '#38BDF8', c2: '#7DD3FC' } },
      { name: '极地冷光', colors: { bg: '#06141F', ink: '#E0F7FF', accent: '#06B6D4', c1: '#0EA5E9', c2: '#A5F3FC' } },
      { name: '靛蓝扫描', colors: { bg: '#0A0F1C', ink: '#D7F0FF', accent: '#2DD4BF', c1: '#60A5FA', c2: '#99F6E4' } },
      { name: '湖青显影', colors: { bg: '#04161A', ink: '#CFFAF0', accent: '#38BDF8', c1: '#7DD3FC', c2: '#Bae6fd' } }
    ],
    canvas: { virtualWidth: 1920, virtualHeight: 1080, defaultWidth: 1920, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      // X 光环（同心描边圆 + 十字准线）
      { id: 'cm-xr-r1', group: 'cm-xr-r', type: 'shape', shapeKind: 'circle', x: 1300, y: 320, width: 460, height: 460, fill: 'transparent', border: { width: 3, color: { $t: 'colors.accent' } }, opacity: 0.7, zIndex: 2 },
      { id: 'cm-xr-r2', group: 'cm-xr-r', type: 'shape', shapeKind: 'circle', x: 1380, y: 400, width: 300, height: 300, fill: 'transparent', border: { width: 3, color: { $t: 'colors.c1' } }, opacity: 0.7, zIndex: 2 },
      { id: 'cm-xr-r3', group: 'cm-xr-r', type: 'shape', shapeKind: 'circle', x: 1450, y: 470, width: 160, height: 160, fill: { $t: 'colors.accent' }, opacity: 0.3, zIndex: 2 },
      { id: 'cm-xr-h', type: 'shape', shapeKind: 'line', x: 1040, y: 550, width: 980, height: 2, fill: { $t: 'colors.accent' }, opacity: 0.4, zIndex: 2 },
      { id: 'cm-xr-v', type: 'shape', shapeKind: 'line', x: 1530, y: 280, width: 2, height: 560, fill: { $t: 'colors.accent' }, opacity: 0.4, zIndex: 2 },
      // 透视辉光
      { id: 'cm-xr-glow', type: 'shape', shapeKind: 'circle', x: 1180, y: 300, width: 700, height: 700, fill: { $t: 'colors.c1' }, opacity: 0.12, zIndex: 1, animation: { name: 'pulse', duration: 4200, iterationCount: 'infinite' } },
      // 文字层
      { id: 'cm-xr-kicker', type: 'text', content: 'X-RAY · 透视显影', fontFamily: { $t: 'fonts.display' }, fontSize: 28, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.72, letterSpacing: 6, x: 120, y: 180, width: 900, height: 40, zIndex: 5, animation: { name: 'fadeIn', duration: 600 } },
      { id: 'cm-xr-title', type: 'text', content: 'See\nthrough.', fontFamily: { $t: 'fonts.display' }, fontSize: 150, fontWeight: '800', color: { $t: 'colors.ink' }, lineHeight: 1.05, letterSpacing: -3, x: 120, y: 300, width: 900, height: 360, zIndex: 6, animation: { name: 'fadeInUp', duration: 900 }, editable: { content: true, fontSize: { type: 'range', min: 120, max: 180 } } },
      { id: 'cm-xr-sub', type: 'text', content: '看见结构之下的结构。', fontFamily: { $t: 'fonts.cjk' }, fontSize: 36, color: { $t: 'colors.ink' }, opacity: 0.82, x: 120, y: 720, width: 900, height: 60, zIndex: 6, animation: { name: 'rise', duration: 900, delay: 200 }, editable: { content: true } },
      { id: 'cm-xr-cta', type: 'shape', shapeKind: 'rect', x: 120, y: 820, width: 320, height: 84, fill: { $t: 'colors.ink' }, borderRadius: 42, zIndex: 6, animation: { name: 'fadeInUp', duration: 800, delay: 320 } },
      { id: 'cm-xr-cta-t', type: 'text', content: '查看解析', fontFamily: { $t: 'fonts.cjk' }, fontSize: 30, fontWeight: '700', color: { $t: 'colors.bg' }, textAlign: 'center', lineHeight: 2.8, x: 120, y: 820, width: 320, height: 84, zIndex: 7, editable: { content: true } },
      { id: 'cm-xr-badge', type: 'text', content: 'NEW · 2.5', fontFamily: { $t: 'fonts.display' }, fontSize: 26, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 4, textAlign: 'right', x: 1560, y: 120, width: 300, height: 36, zIndex: 5, animation: { name: 'fadeIn', duration: 600, delay: 120 } },
      { id: 'cm-xr-decor', type: 'text', content: '44', fontFamily: { $t: 'fonts.display' }, fontSize: 300, fontWeight: '800', color: { $t: 'colors.ink' }, opacity: 0.05, textAlign: 'right', x: 1140, y: 520, width: 740, height: 540, zIndex: 4 },
      { id: 'cm-xr-watermark', type: 'text', content: 'CM · SCAN MODE', fontFamily: { $t: 'fonts.display' }, fontSize: 24, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.06, letterSpacing: 4, x: 120, y: 1000, width: 600, height: 30, zIndex: 8 },
      { id: 'cm-xr-grain', type: 'overlay', x: 0, y: 0, width: 1920, height: 1080, background: `url("${grainSoft(320, 9, 0.5)}")`, opacity: 0.05, mixBlendMode: 'screen', zIndex: 9 }
    ]
  }
]

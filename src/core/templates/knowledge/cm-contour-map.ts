// src/core/templates/knowledge/cm-contour-map.ts
// CM 系列 · 等高线地形（知识 / 地理可视化封面）｜ 隐性 CM 标记
import type { Template } from '@/types/types'
import { SANS, HEI, SERIF, grainSoft } from '../_fx/trend'

export const cmContourMapTemplates: Template[] = [
  {
    id: 'cm-contour-map', name: '等高线地形', version: '1.0.0', category: 'knowledge',
    tags: ['cm', 'contour', 'topo', 'map', 'knowledge', 'cover'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="56" viewBox="0 0 100 56"><rect width="100" height="56" fill="%23FBF7F0"/><circle cx="70" cy="34" r="26" fill="none" stroke="%231F2937" stroke-width="1.2" opacity="0.5"/><circle cx="70" cy="34" r="17" fill="none" stroke="%23E07A5F" stroke-width="1.6"/><circle cx="70" cy="34" r="8" fill="%2381B29A"/><rect x="8" y="44" width="40" height="3" fill="%231F2937"/><rect x="8" y="50" width="24" height="3" fill="%231F2937" opacity="0.5"/></svg>',
    tokens: {
      colors: {
        bg: { label: '底色', default: '#FBF7F0', options: ['#FBF7F0', '#F4F1EA', '#0F1B2D', '#1A1410'] },
        ink: { label: '文字', default: '#1F2937', options: ['#1F2937', '#111827', '#E8E2D6', '#F2ECE0'] },
        accent: { label: '强调', default: '#E07A5F', options: ['#E07A5F', '#E76F51', '#F2A541', '#E9C46A'] },
        c1: { label: '辅助1', default: '#81B29A', options: ['#81B29A', '#6A994E', '#2A9D8F', '#457B9D'] },
        c2: { label: '辅助2', default: '#F2CC8F', options: ['#F2CC8F', '#F4A261', '#E9C46A', '#EAD2AC'] }
      },
      fonts: {
        display: { label: '英文标题', default: SANS, options: [SANS, SERIF] },
        cjk: { label: '中文', default: HEI, options: [HEI, SANS] }
      }
    },
    presets: [
      { name: '陶土纸感', colors: { bg: '#FBF7F0', ink: '#1F2937', accent: '#E07A5F', c1: '#81B29A', c2: '#F2CC8F' } },
      { name: '墨绿档案', colors: { bg: '#F4F1EA', ink: '#111827', accent: '#E76F51', c1: '#6A994E', c2: '#F4A261' } },
      { name: '深蓝夜图', colors: { bg: '#0F1B2D', ink: '#E8E2D6', accent: '#F2A541', c1: '#2A9D8F', c2: '#E9C46A' } },
      { name: '暖棕典籍', colors: { bg: '#1A1410', ink: '#F2ECE0', accent: '#E9C46A', c1: '#457B9D', c2: '#EAD2AC' } }
    ],
    canvas: { virtualWidth: 1920, virtualHeight: 1080, defaultWidth: 1920, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      // 等高线环（同心圆 + 描边，透明填充成环，统一圆心 1480,560）
      { id: 'cm-ct-r1', group: 'cm-ct-r', type: 'shape', shapeKind: 'circle', x: 1360, y: 440, width: 240, height: 240, fill: 'transparent', border: { width: 2, color: { $t: 'colors.ink' } }, opacity: 0.28, zIndex: 2 },
      { id: 'cm-ct-r2', group: 'cm-ct-r', type: 'shape', shapeKind: 'circle', x: 1300, y: 380, width: 360, height: 360, fill: 'transparent', border: { width: 2, color: { $t: 'colors.c1' } }, opacity: 0.30, zIndex: 2 },
      { id: 'cm-ct-r3', group: 'cm-ct-r', type: 'shape', shapeKind: 'circle', x: 1220, y: 300, width: 520, height: 520, fill: 'transparent', border: { width: 3, color: { $t: 'colors.accent' } }, opacity: 0.42, zIndex: 2 },
      { id: 'cm-ct-r4', group: 'cm-ct-r', type: 'shape', shapeKind: 'circle', x: 1120, y: 200, width: 720, height: 720, fill: 'transparent', border: { width: 2, color: { $t: 'colors.c1' } }, opacity: 0.24, zIndex: 2 },
      { id: 'cm-ct-r5', group: 'cm-ct-r', type: 'shape', shapeKind: 'circle', x: 1000, y: 80, width: 960, height: 960, fill: 'transparent', border: { width: 2, color: { $t: 'colors.ink' } }, opacity: 0.18, zIndex: 2 },
      { id: 'cm-ct-r6', group: 'cm-ct-r', type: 'shape', shapeKind: 'circle', x: 860, y: -60, width: 1240, height: 1240, fill: 'transparent', border: { width: 2, color: { $t: 'colors.c2' } }, opacity: 0.20, zIndex: 2 },
      { id: 'cm-ct-peak', type: 'shape', shapeKind: 'circle', x: 1466, y: 546, width: 28, height: 28, fill: { $t: 'colors.accent' }, zIndex: 3, animation: { name: 'pulse', duration: 2400, iterationCount: 'infinite' } },
      // 文字层（左对齐统一 x=120）
      { id: 'cm-ct-kicker', type: 'text', content: 'CARTOGRAPHY · 地理可视化', fontFamily: { $t: 'fonts.display' }, fontSize: 28, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.65, letterSpacing: 6, x: 120, y: 180, width: 1400, height: 40, zIndex: 5, animation: { name: 'fadeIn', duration: 600 } },
      { id: 'cm-ct-title', type: 'text', content: 'Map the\nunseen.', fontFamily: { $t: 'fonts.display' }, fontSize: 150, fontWeight: '800', color: { $t: 'colors.ink' }, lineHeight: 1.05, letterSpacing: -3, x: 120, y: 300, width: 1200, height: 360, zIndex: 6, animation: { name: 'fadeInUp', duration: 900 }, editable: { content: true, fontSize: { type: 'range', min: 120, max: 180 } } },
      { id: 'cm-ct-sub', type: 'text', content: '把地形翻译成可阅读的语言。', fontFamily: { $t: 'fonts.cjk' }, fontSize: 36, color: { $t: 'colors.ink' }, opacity: 0.82, x: 120, y: 720, width: 1400, height: 60, zIndex: 6, animation: { name: 'rise', duration: 900, delay: 200 }, editable: { content: true } },
      { id: 'cm-ct-cta', type: 'shape', shapeKind: 'rect', x: 120, y: 820, width: 320, height: 84, fill: { $t: 'colors.ink' }, borderRadius: 42, zIndex: 6, animation: { name: 'fadeInUp', duration: 800, delay: 320 } },
      { id: 'cm-ct-cta-t', type: 'text', content: '立即探索', fontFamily: { $t: 'fonts.cjk' }, fontSize: 30, fontWeight: '700', color: { $t: 'colors.bg' }, textAlign: 'center', lineHeight: 2.8, x: 120, y: 820, width: 320, height: 84, zIndex: 7, editable: { content: true } },
      { id: 'cm-ct-badge', type: 'text', content: 'NEW · 2.5', fontFamily: { $t: 'fonts.display' }, fontSize: 26, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 4, textAlign: 'right', x: 1500, y: 180, width: 300, height: 36, zIndex: 5, animation: { name: 'fadeIn', duration: 600, delay: 120 } },
      { id: 'cm-ct-decor', type: 'text', content: '07', fontFamily: { $t: 'fonts.display' }, fontSize: 320, fontWeight: '800', color: { $t: 'colors.ink' }, opacity: 0.05, textAlign: 'right', x: 1140, y: 500, width: 740, height: 540, zIndex: 4 },
      { id: 'cm-ct-watermark', type: 'text', content: 'CM · FIELD NOTES', fontFamily: { $t: 'fonts.display' }, fontSize: 24, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.06, letterSpacing: 4, x: 120, y: 1000, width: 600, height: 30, zIndex: 8 },
      { id: 'cm-ct-grain', type: 'overlay', x: 0, y: 0, width: 1920, height: 1080, background: `url("${grainSoft(320, 9, 0.5)}")`, opacity: 0.05, mixBlendMode: 'multiply', zIndex: 9 }
    ]
  }
]

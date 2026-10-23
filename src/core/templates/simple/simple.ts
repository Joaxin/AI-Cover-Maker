// src/core/templates/simple/simple.ts
import type { Template } from '@/types/types'
export const simpleTemplates: Template[] = [
{
  id: 'simple-soft-card', name: '柔和卡片排版', version: '1.1.0', category: 'simple',
  tags: ['simple', 'clean', 'card', 'pastel'],
  thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23eef2f6"/><g fill="%231e293b" opacity="0.2"><circle cx="7" cy="88" r="1.6"/><circle cx="13" cy="88" r="1.6"/><circle cx="19" cy="88" r="1.6"/><circle cx="7" cy="94" r="1.6"/><circle cx="13" cy="94" r="1.6"/><circle cx="19" cy="94" r="1.6"/><circle cx="93" cy="16" r="1.6"/><circle cx="93" cy="23" r="1.6"/><circle cx="93" cy="30" r="1.6"/></g><rect x="18" y="21" width="72" height="68" rx="8" fill="%231e293b" opacity="0.05"/><rect x="16" y="18" width="72" height="68" rx="7" fill="%231e293b" opacity="0.09"/><rect x="13" y="14" width="72" height="68" rx="7" fill="%23ffffff"/><rect x="19" y="21" width="16" height="6" rx="3" fill="%234338ca" opacity="0.14"/><rect x="38" y="21" width="18" height="6" rx="3" fill="%234338ca" opacity="0.1"/><rect x="25" y="22" width="4" height="4" rx="2" fill="%234338ca"/><rect x="74" y="20" width="7" height="7" rx="3.5" fill="none" stroke="%234338ca" stroke-width="0.9" opacity="0.4"/><rect x="19" y="34" width="46" height="5" rx="1" fill="%231e293b"/><rect x="19" y="42" width="32" height="5" rx="1" fill="%231e293b" opacity="0.7"/><rect x="19" y="54" width="60" height="1" fill="%231e293b" opacity="0.12"/><rect x="19" y="60" width="48" height="2" fill="%2394a3b8"/><rect x="19" y="65" width="34" height="2" fill="%2394a3b8" opacity="0.7"/><rect x="19" y="72" width="60" height="1" fill="%231e293b" opacity="0.1"/><rect x="19" y="76" width="24" height="2" fill="%234338ca" opacity="0.55"/><rect x="63" y="76" width="16" height="2" fill="%2394a3b8"/></svg>',
  tokens: {
    colors: {
      bg: { label: '背景', default: '#F0F4F8', options: ['#F0F4F8', '#F5F5F0', '#EEF2F6', '#EBF4F6', '#FEF3F2'] },
      primary: { label: '主色', default: '#1E293B', options: ['#1E293B', '#0F172A', '#334155', '#1C1917', '#134E4A', '#3F1D2B'] },
      accent: { label: '强调', default: '#4338CA', options: ['#4338CA', '#3B82F6', '#6366F1', '#0D9488', '#DB2777'] }
    },
    fonts: { heading: { label: '标题字体', default: 'Helvetica, Arial, sans-serif', options: ['Helvetica, Arial, sans-serif', 'Inter, sans-serif', 'system-ui, sans-serif'] } }
  },
  presets: [
    { name: '静谧靛蓝', colors: { bg: '#F0F4F8', primary: '#1E293B', accent: '#4338CA' } },
    { name: '青瓷薄荷', colors: { bg: '#EBF4F6', primary: '#134E4A', accent: '#0D9488' } },
    { name: '暮粉温柔', colors: { bg: '#FEF3F2', primary: '#3F1D2B', accent: '#DB2777' } },
    { name: '石墨冷静', colors: { bg: '#F5F5F0', primary: '#0F172A', accent: '#3B82F6' } }
  ],
  canvas: { virtualWidth: 1000, virtualHeight: 1000, defaultWidth: 1000, defaultHeight: 1000, backgroundColor: { $random: { type: 'color', palette: ['#F0F4F8', '#F5F5F0', '#EEF2F6', '#EBF4F6'] } } },
  elements: [
    ...Array.from({ length: 6 }, (_, i) => ({ id: `bg-dot-${i}`, type: 'shape' as const, shapeKind: 'circle' as const, x: 40 + (i % 3) * 22, y: 906 + Math.floor(i / 3) * 22, width: 6, height: 6, fill: { $t: 'colors.primary' }, opacity: 0.3 - (i % 3) * 0.07, group: 'dots', zIndex: 1 })),
    ...Array.from({ length: 3 }, (_, i) => ({ id: `bg-dot-edge-${i}`, type: 'shape' as const, shapeKind: 'circle' as const, x: 946, y: 140 + i * 30, width: 6, height: 6, fill: { $t: 'colors.primary' }, opacity: 0.26 - i * 0.07, group: 'dots', zIndex: 1 })),
    { id: 'shadow-far', type: 'shape', shapeKind: 'rect', x: 124, y: 152, width: 800, height: 760, fill: { $t: 'colors.primary' }, opacity: 0.05, borderRadius: 28, zIndex: 1 },
    { id: 'shadow-near', type: 'shape', shapeKind: 'rect', x: 112, y: 136, width: 800, height: 760, fill: { $t: 'colors.primary' }, opacity: 0.09, borderRadius: 26, zIndex: 2 },
    { id: 'card-bg', type: 'shape', shapeKind: 'rect', x: 100, y: 120, width: 800, height: 760, fill: '#FFFFFF', borderRadius: 24, shadow: { color: 'rgba(0,0,0,0.06)', blur: 30, offsetX: 0, offsetY: 15 }, zIndex: 3 },
    { id: 'tag-capsule', type: 'shape', shapeKind: 'rect', x: 160, y: 180, width: 120, height: 40, fill: { $t: 'colors.accent' }, opacity: 0.12, borderRadius: 20, zIndex: 4 },
    { id: 'tag-capsule-2', type: 'shape', shapeKind: 'rect', x: 296, y: 180, width: 150, height: 40, fill: { $t: 'colors.accent' }, opacity: 0.09, borderRadius: 20, zIndex: 4 },
    { id: 'tag-text', type: 'text', content: 'INSIGHT', fontFamily: { $t: 'fonts.heading' }, fontSize: 16, fontWeight: '700', color: { $t: 'colors.accent' }, textAlign: 'center', x: 160, y: 188, width: 120, height: 30, zIndex: 5, editable: { content: true } },
    { id: 'tag-text-2', type: 'text', content: '第 07 期', fontFamily: { $t: 'fonts.heading' }, fontSize: 16, fontWeight: '500', color: { $t: 'colors.accent' }, opacity: 0.85, textAlign: 'center', x: 296, y: 189, width: 150, height: 26, zIndex: 5, editable: { content: true } },
    { id: 'corner-ring', type: 'shape', shapeKind: 'circle', x: 812, y: 176, width: 48, height: 48, border: { color: { $t: 'colors.accent' }, width: 1.5, style: 'solid' }, opacity: 0.35, zIndex: 4, animation: { name: 'float', duration: 6400, iterationCount: 'infinite', easing: 'ease-in-out' } },
    { id: 'title', type: 'text', content: 'Design for Everyday Clarity', fontFamily: { $t: 'fonts.heading' }, fontSize: 64, fontWeight: '800', color: { $t: 'colors.primary' }, lineHeight: 1.25, x: 160, y: 260, width: 680, height: 200, zIndex: 6, animation: { name: 'fadeInUp', duration: 700 }, editable: { content: true, fontSize: { type: 'range', min: 48, max: 80 }, position: true } },
    { id: 'divider', type: 'shape', shapeKind: 'line', x: 160, y: 500, width: 680, height: 2, fill: { $t: 'colors.primary' }, opacity: 0.08, zIndex: 4 },
    { id: 'accent-dot', type: 'shape', shapeKind: 'circle', x: 160, y: 500, width: 14, height: 14, fill: { $t: 'colors.accent' }, zIndex: 5, animation: { name: 'pulse', duration: 2400, iterationCount: 'infinite' } },
    { id: 'footer-note', type: 'text', content: 'Building digital products with thoughtful simplicity and user delight.', fontFamily: { $t: 'fonts.heading' }, fontSize: 26, fontWeight: '400', color: { $t: 'colors.primary' }, opacity: 0.62, lineHeight: 1.5, x: 160, y: 540, width: 680, height: 120, zIndex: 5, editable: { content: true, position: true } },
    { id: 'rule-fine', type: 'shape', shapeKind: 'rect', x: 160, y: 700, width: 680, height: 1, fill: { $t: 'colors.primary' }, opacity: 0.1, zIndex: 4 },
    { id: 'signature', type: 'text', content: '文 / 沈知远 · 产品手记 No.07', fontFamily: { $t: 'fonts.heading' }, fontSize: 22, fontWeight: '500', color: { $t: 'colors.primary' }, opacity: 0.75, x: 160, y: 724, width: 520, height: 36, zIndex: 5, animation: { name: 'fadeIn', duration: 700, delay: 500 }, editable: { content: true, position: true } },
    { id: 'read-time', type: 'text', content: '03:12 读完', fontFamily: { $t: 'fonts.heading' }, fontSize: 20, color: { $t: 'colors.primary' }, opacity: 0.5, textAlign: 'right', x: 560, y: 726, width: 280, height: 32, zIndex: 5, editable: { content: true } }
  ]
},
{
  id: 'simple-bold-gradient-accent', name: '极简亮色强调条', version: '1.1.0', category: 'simple',
  tags: ['simple', 'bold', 'accent'],
  thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23fafafa"/><rect x="9" y="15" width="1.6" height="70" rx="0.8" fill="%230284c7"/><rect x="14" y="18" width="24" height="1.6" fill="%230f172a" opacity="0.45"/><g fill="%230f172a"><rect x="14" y="26" width="50" height="4.6" rx="0.6"/><rect x="14" y="33" width="41" height="4.6" rx="0.6"/></g><rect x="14" y="45" width="34" height="2" fill="%230f172a" opacity="0.5"/><rect x="14" y="51" width="20" height="2" fill="%230284c7" opacity="0.9"/><g fill="%230284c7"><rect x="72" y="23" width="21" height="6.6" opacity="0.07"/><rect x="72" y="29.6" width="21" height="6.6" opacity="0.17"/><rect x="72" y="36.2" width="21" height="6.6" opacity="0.28"/><rect x="72" y="42.8" width="21" height="6.6" opacity="0.38"/><rect x="72" y="49.4" width="21" height="6.6" opacity="0.49"/><rect x="72" y="56" width="21" height="6.6" opacity="0.6"/><rect x="72" y="62.6" width="21" height="6.6" opacity="0.71"/><rect x="72" y="69.2" width="21" height="6.6" opacity="0.83"/></g><rect x="14" y="57" width="30" height="30" rx="2" fill="%230284c7" opacity="0.08"/><rect x="14" y="57" width="30" height="30" rx="2" fill="none" stroke="%230284c7" stroke-width="0.7" opacity="0.35"/><text x="29" y="78" font-family="Helvetica, Arial, sans-serif" font-size="15" font-weight="900" fill="%230284c7" text-anchor="middle" opacity="0.9">07</text><circle cx="45.5" cy="55" r="2" fill="%230284c7" opacity="0.9"/><g fill="%230f172a" opacity="0.55"><rect x="65" y="56" width="3.4" height="3.4" rx="0.6"/><rect x="65" y="62" width="3.4" height="3.4" rx="0.6"/><rect x="65" y="68" width="3.4" height="3.4" rx="0.6"/><rect x="65" y="74" width="3.4" height="3.4" rx="0.6"/></g><rect x="14" y="87" width="79" height="0.5" fill="%230f172a" opacity="0.15"/><g fill="%230f172a" opacity="0.5"><rect x="14" y="90" width="15" height="1.8"/><rect x="44" y="90" width="19" height="1.8"/><rect x="68" y="90" width="25" height="1.8"/></g></svg>',
  tokens: {
    colors: {
      bg: { label: '背景', default: '#FAFAFA', options: ['#FAFAFA', '#FFFFFF', '#F8FAFC', '#FFF7ED', '#F0FDF4'] },
      primary: { label: '主色', default: '#0F172A', options: ['#0F172A', '#1E293B', '#000000', '#4C1D95', '#7C2D12', '#14532D'] },
      accent: { label: '强调条', default: '#0284C7', options: ['#0284C7', '#10B981', '#F59E0B', '#6366F1', '#EC4899'] }
    },
    fonts: { heading: { label: '标题字体', default: 'Helvetica, Arial, sans-serif', options: ['Helvetica, Arial, sans-serif', 'Impact, sans-serif', 'Inter, sans-serif'] } }
  },
  presets: [
    { name: '天际蓝条', colors: { bg: '#FAFAFA', primary: '#0F172A', accent: '#0284C7' } },
    { name: '松林翠意', colors: { bg: '#F0FDF4', primary: '#14532D', accent: '#10B981' } },
    { name: '琥珀暖阳', colors: { bg: '#FFF7ED', primary: '#7C2D12', accent: '#F59E0B' } },
    { name: '魅影紫罗兰', colors: { bg: '#FFFFFF', primary: '#4C1D95', accent: '#6366F1' } }
  ],
  canvas: { virtualWidth: 1000, virtualHeight: 1000, defaultWidth: 1000, defaultHeight: 1000, backgroundColor: { $t: 'colors.bg' } },
  elements: [
    { id: 'accent-bar', type: 'shape', shapeKind: 'rect', x: 90, y: 150, width: 14, height: 700, fill: { $t: 'colors.accent' }, borderRadius: 7, zIndex: 1, editable: { color: { type: 'palette', options: ['#0284C7', '#10B981', '#F59E0B', '#6366F1', '#EC4899'] }, position: true } },
    ...Array.from({ length: 8 }, (_, i) => ({ id: `grad-${i}`, type: 'shape' as const, shapeKind: 'rect' as const, x: 720, y: 230 + i * 66, width: 210, height: 66, fill: { $t: 'colors.accent' }, opacity: 0.06 + i * 0.11, borderRadius: 2, group: 'gradient', zIndex: 2 })),
    { id: 'geo-square', type: 'shape', shapeKind: 'rect', x: 140, y: 560, width: 300, height: 300, fill: { $t: 'colors.accent' }, opacity: 0.08, borderRadius: 12, zIndex: 2 },
    { id: 'geo-ring', type: 'shape', shapeKind: 'rect', x: 140, y: 560, width: 300, height: 300, border: { color: { $t: 'colors.accent' }, width: 3, style: 'solid' }, opacity: 0.35, borderRadius: 12, zIndex: 3 },
    { id: 'geo-num', type: 'text', content: '07', fontFamily: { $t: 'fonts.heading' }, fontSize: 150, fontWeight: '900', color: { $t: 'colors.accent' }, opacity: 0.9, textAlign: 'center', lineHeight: 1.2, x: 190, y: 620, width: 200, height: 180, zIndex: 4, editable: { content: true, fontSize: { type: 'range', min: 90, max: 200 }, position: true } },
    { id: 'geo-dot', type: 'shape', shapeKind: 'circle', x: 424, y: 544, width: 32, height: 32, fill: { $t: 'colors.accent' }, opacity: 0.9, zIndex: 4, animation: { name: 'float', duration: 5200, iterationCount: 'infinite', easing: 'ease-in-out' } },
    { id: 'hair-top', type: 'shape', shapeKind: 'rect', x: 140, y: 224, width: 560, height: 2, fill: { $t: 'colors.primary' }, opacity: 0.18, zIndex: 2 },
    { id: 'hair-bottom', type: 'shape', shapeKind: 'rect', x: 140, y: 880, width: 790, height: 1, fill: { $t: 'colors.primary' }, opacity: 0.14, zIndex: 2 },
    { id: 'date-text', type: 'text', content: 'VOLUME // 2026 EDITION', fontFamily: 'Courier New, monospace', fontSize: 20, fontWeight: '700', color: { $t: 'colors.primary' }, opacity: 0.5, x: 140, y: 180, width: 500, height: 30, zIndex: 3, editable: { content: true } },
    { id: 'issue-tag', type: 'text', content: 'NO.07 / 42', fontFamily: 'Courier New, monospace', fontSize: 20, fontWeight: '700', color: { $t: 'colors.primary' }, opacity: 0.55, textAlign: 'right', x: 700, y: 176, width: 230, height: 30, zIndex: 3, editable: { content: true } },
    { id: 'headline', type: 'text', content: 'THINK CLEAR.\nACT DECISIVE.', fontFamily: { $t: 'fonts.heading' }, fontSize: 60, fontWeight: '900', color: { $t: 'colors.primary' }, lineHeight: 1.2, x: 140, y: 250, width: 580, height: 170, zIndex: 3, animation: { name: 'slideInLeft', duration: 600 }, editable: { content: true, fontSize: { type: 'range', min: 48, max: 72 }, position: true } },
    { id: 'sub-cn', type: 'text', content: '把复杂留给自己，把清晰交给读者', fontFamily: { $t: 'fonts.heading' }, fontSize: 28, fontWeight: '500', color: { $t: 'colors.primary' }, opacity: 0.78, x: 140, y: 448, width: 470, height: 44, zIndex: 4, animation: { name: 'fadeInUp', duration: 700, delay: 380 }, editable: { content: true, position: true } },
    { id: 'author-label', type: 'text', content: 'CURATED ESSENTIALS', fontFamily: { $t: 'fonts.heading' }, fontSize: 22, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 2, x: 140, y: 506, width: 400, height: 36, zIndex: 4, editable: { content: true } },
    { id: 'side-vertical', type: 'text', content: '克\n制\n即\n丰\n富', fontFamily: { $t: 'fonts.heading' }, fontSize: 32, fontWeight: '500', color: { $t: 'colors.primary' }, opacity: 0.7, lineHeight: 1.44, x: 650, y: 560, width: 48, height: 230, zIndex: 3, editable: { content: true, position: true } },
    { id: 'info-src', type: 'text', content: '编辑部夜谈 · 沈知远', fontFamily: { $t: 'fonts.heading' }, fontSize: 20, fontWeight: '500', color: { $t: 'colors.primary' }, opacity: 0.62, x: 140, y: 895, width: 260, height: 32, zIndex: 3, editable: { content: true } },
    { id: 'info-sep-a', type: 'shape', shapeKind: 'rect', x: 418, y: 901, width: 2, height: 22, fill: { $t: 'colors.primary' }, opacity: 0.25, zIndex: 3 },
    { id: 'info-date', type: 'text', content: '2026.09.24 · 周三', fontFamily: { $t: 'fonts.heading' }, fontSize: 20, color: { $t: 'colors.primary' }, opacity: 0.6, x: 440, y: 895, width: 200, height: 32, zIndex: 3, editable: { content: true } },
    { id: 'info-sep-b', type: 'shape', shapeKind: 'rect', x: 658, y: 901, width: 2, height: 22, fill: { $t: 'colors.primary' }, opacity: 0.25, zIndex: 3 },
    { id: 'info-issue', type: 'text', content: 'ISSUE 07 · 总第 42 期', fontFamily: { $t: 'fonts.heading' }, fontSize: 20, color: { $t: 'colors.primary' }, opacity: 0.55, x: 680, y: 895, width: 250, height: 32, zIndex: 3, editable: { content: true } }
  ]
}
]

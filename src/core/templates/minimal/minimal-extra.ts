// src/core/templates/minimal/minimal-extra.ts —— 极简黑白扩展（5 个）
import type { Template } from '@/types/types'

// 圆相（enso）：一道开口的枯笔圆环 + 淡墨重影
const ENSO_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 220"><circle cx="110" cy="110" r="86" fill="none" stroke="%23141414" stroke-width="13" stroke-linecap="round" stroke-dasharray="450 92" transform="rotate(120 110 110)" opacity="0.9"/><circle cx="110" cy="110" r="86" fill="none" stroke="%23141414" stroke-width="5" stroke-linecap="round" stroke-dasharray="120 420" transform="rotate(196 110 110)" opacity="0.3"/></svg>'

// 点阵同心环：虚线圆点拼成的"半调球体"
const DOTS_RING_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300"><g fill="none" stroke="%2318181b" stroke-linecap="round"><circle cx="150" cy="150" r="142" stroke-width="5" stroke-dasharray="0.1 30"/><circle cx="150" cy="150" r="108" stroke-width="6" stroke-dasharray="0.1 24"/><circle cx="150" cy="150" r="74" stroke-width="7" stroke-dasharray="0.1 18"/><circle cx="150" cy="150" r="40" stroke-width="8" stroke-dasharray="0.1 13"/><circle cx="150" cy="150" r="10" fill="%2318181b" stroke="none"/></g></svg>'

export const minimalExtraTemplates: Template[] = [
  {
    id: 'minimal-zen-enso', name: '禅影圆相', version: '1.0.0', category: 'minimal',
    tags: ['minimal', 'black-and-white', 'zen', 'enso', '留白'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23fafaf8"/><circle cx="50" cy="42" r="26" fill="none" stroke="%23141414" stroke-width="4" stroke-dasharray="138 26" stroke-linecap="round" transform="rotate(120 50 42)"/><rect x="24" y="80" width="52" height="4" fill="%23141414"/></svg>',
    tokens: {
      colors: {
        bg: { label: '纸面', default: '#FAFAF8', options: ['#FAFAF8', '#FFFFFF', '#F5F1E8', '#F1F3F4', '#131313'] },
        ink: { label: '墨色', default: '#141414', options: ['#141414', '#000000', '#1F1D1A', '#111827', '#F5F5F5'] },
        accent: { label: '淡灰', default: '#9CA3AF', options: ['#9CA3AF', '#8A8378', '#6B7280', '#D4D4D4', '#A1A1AA'] }
      },
      fonts: {
        heading: { label: '标题', default: 'Songti SC, STSong, SimSun, serif', options: ['Songti SC, STSong, SimSun, serif', 'Helvetica, Arial, sans-serif', 'Georgia, serif'] }
      }
    },
    presets: [
      { name: '素纸浓墨', colors: { bg: '#FAFAF8', ink: '#141414', accent: '#9CA3AF' } },
      { name: '宣纸暖灰', colors: { bg: '#F5F1E8', ink: '#1F1D1A', accent: '#8A8378' } },
      { name: '石青冷灰', colors: { bg: '#F1F3F4', ink: '#111827', accent: '#6B7280' } },
      { name: '夜窟逆光', colors: { bg: '#131313', ink: '#F5F5F5', accent: '#A1A1AA' } }
    ],
    canvas: {
      virtualWidth: 1000, virtualHeight: 1000, defaultWidth: 1000, defaultHeight: 1000, backgroundColor: { $t: 'colors.bg' },
      backgroundImage: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000"><circle cx="110" cy="890" r="250" fill="%23141414" opacity="0.04"/><circle cx="890" cy="130" r="170" fill="%23141414" opacity="0.03"/><rect x="42" y="42" width="916" height="916" fill="none" stroke="%23141414" stroke-width="1" opacity="0.16"/></svg>'
    },
    elements: [
      { id: 'enso', type: 'image', src: ENSO_SVG, x: 320, y: 190, width: 360, height: 360, objectFit: 'contain', zIndex: 2, animation: { name: 'zoomIn', duration: 1100, easing: 'ease-out' } },
      { id: 'ring-dashed', type: 'shape', shapeKind: 'circle', x: 292, y: 162, width: 416, height: 416, border: { color: { $t: 'colors.accent' }, width: 1.5, style: 'dashed' }, zIndex: 1, animation: { name: 'spinSlow', duration: 48000, iterationCount: 'infinite', easing: 'linear' } },
      { id: 'dot-hanging', type: 'shape', shapeKind: 'circle', x: 490, y: 118, width: 20, height: 20, fill: { $t: 'colors.ink' }, zIndex: 2, animation: { name: 'float', duration: 5200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'h-line', type: 'shape', shapeKind: 'line', x: 300, y: 660, width: 400, height: 2, fill: { $t: 'colors.ink' }, opacity: 0.7, zIndex: 2, animation: { name: 'fadeIn', duration: 800, delay: 600 } },
      { id: 'title-cn', type: 'text', content: '留 白', fontFamily: { $t: 'fonts.heading' }, fontSize: 96, fontWeight: '700', color: { $t: 'colors.ink' }, letterSpacing: 28, textAlign: 'center', x: 150, y: 690, width: 700, height: 130, zIndex: 3, animation: { name: 'inkReveal', duration: 1400, delay: 300 }, editable: { content: true, fontSize: { type: 'range', min: 56, max: 130 }, position: true } },
      { id: 'title-en', type: 'text', content: 'EMPTINESS IS FULLNESS', fontFamily: 'Helvetica, Arial, sans-serif', fontSize: 18, fontWeight: '500', color: { $t: 'colors.accent' }, letterSpacing: 10, textAlign: 'center', x: 250, y: 838, width: 500, height: 28, zIndex: 3, animation: { name: 'fadeInUp', duration: 900, delay: 900 }, editable: { content: true } },
      { id: 'index-no', type: 'text', content: 'N° 01 / 静', fontFamily: 'Georgia, serif', fontSize: 20, color: { $t: 'colors.accent' }, x: 84, y: 84, width: 220, height: 30, zIndex: 3, editable: { content: true } }
    ]
  },
  {
    id: 'minimal-diagonal-cut', name: '破形斜裂', version: '1.0.0', category: 'minimal',
    tags: ['minimal', 'black-and-white', 'diagonal', 'brutalist'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23ffffff"/><rect x="-20" y="44" width="140" height="14" fill="%23111111" transform="rotate(-14 50 50)"/><rect x="-20" y="66" width="140" height="2" fill="%23888888" transform="rotate(-14 50 50)"/><rect x="14" y="18" width="44" height="7" fill="%23111111"/></svg>',
    tokens: {
      colors: {
        bg: { label: '纸面', default: '#FFFFFF', options: ['#FFFFFF', '#F5F5F7', '#FAFAFA', '#101010'] },
        ink: { label: '裂墨', default: '#111111', options: ['#111111', '#000000', '#1C1917', '#E8E8E8'] },
        accent: { label: '灰线', default: '#8E8E93', options: ['#8E8E93', '#C7C7CC', '#6B7280', '#3F3F46'] }
      },
      fonts: { heading: { label: '标题', default: 'Helvetica, Arial, sans-serif', options: ['Helvetica, Arial, sans-serif', 'Impact, sans-serif', 'Inter, sans-serif'] } }
    },
    presets: [
      { name: '白纸黑裂', colors: { bg: '#FFFFFF', ink: '#111111', accent: '#8E8E93' } },
      { name: '灰卡石墨', colors: { bg: '#F5F5F7', ink: '#1C1917', accent: '#6B7280' } },
      { name: '暗房反相', colors: { bg: '#101010', ink: '#E8E8E8', accent: '#3F3F46' } },
      { name: '素纸纯墨', colors: { bg: '#FAFAFA', ink: '#000000', accent: '#C7C7CC' } }
    ],
    canvas: { virtualWidth: 1000, virtualHeight: 1000, defaultWidth: 1000, defaultHeight: 1000, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'bar-main', type: 'shape', shapeKind: 'rect', x: -180, y: 452, width: 1360, height: 128, rotation: -14, fill: { $t: 'colors.ink' }, zIndex: 2, animation: { name: 'slideInLeft', duration: 900, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' } },
      { id: 'bar-echo', type: 'shape', shapeKind: 'rect', x: -180, y: 622, width: 1360, height: 3, rotation: -14, fill: { $t: 'colors.accent' }, opacity: 0.6, zIndex: 2, animation: { name: 'slideInLeft', duration: 900, delay: 250 } },
      { id: 'bar-label', type: 'text', content: 'DIAGONAL DISRUPTION — 14°', fontFamily: { $t: 'fonts.heading' }, fontSize: 26, fontWeight: '700', color: { $t: 'colors.bg' }, letterSpacing: 6, x: 300, y: 496, width: 580, height: 40, rotation: -14, zIndex: 3, animation: { name: 'fadeIn', duration: 700, delay: 800 }, editable: { content: true } },
      { id: 'title-cn', type: 'text', content: '破形', fontFamily: { $t: 'fonts.heading' }, fontSize: 128, fontWeight: '900', color: { $t: 'colors.ink' }, letterSpacing: 16, x: 96, y: 116, width: 640, height: 160, zIndex: 1, animation: { name: 'fadeInUp', duration: 800 }, editable: { content: true, fontSize: { type: 'range', min: 70, max: 160 }, position: true } },
      { id: 'title-sub', type: 'text', content: '以一条斜线，撕开网格的秩序。', fontFamily: 'Songti SC, STSong, SimSun, serif', fontSize: 28, color: { $t: 'colors.ink' }, opacity: 0.85, x: 96, y: 286, width: 560, height: 44, zIndex: 1, animation: { name: 'rise', duration: 800, delay: 400 }, editable: { content: true } },
      { id: 'side-vertical', type: 'text', content: 'MINIMAL / EDIT.05', fontFamily: 'Helvetica, Arial, sans-serif', fontSize: 18, fontWeight: '500', color: { $t: 'colors.accent' }, letterSpacing: 6, rotation: 270, x: 828, y: 640, width: 320, height: 28, zIndex: 3, animation: { name: 'slideInRight', duration: 800, delay: 600 }, editable: { content: true } },
      { id: 'foot-note', type: 'text', content: 'NO CURVES. NO MERCY. ONE ANGLE.', fontFamily: 'Georgia, serif', fontSize: 20, color: { $t: 'colors.accent' }, letterSpacing: 3, x: 96, y: 840, width: 640, height: 32, zIndex: 3, editable: { content: true } },
      { id: 'foot-rule', type: 'shape', shapeKind: 'line', x: 96, y: 820, width: 240, height: 2, fill: { $t: 'colors.ink' }, zIndex: 3, animation: { name: 'fadeIn', duration: 600, delay: 1000 } }
    ]
  },
  {
    id: 'minimal-halftone-dots', name: '半调点聚', version: '1.0.0', category: 'minimal',
    tags: ['minimal', 'black-and-white', 'halftone', 'dots', 'grid'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23f4f4f2"/><g fill="%2318181b"><circle cx="68" cy="34" r="14" opacity="0.15"/><circle cx="68" cy="34" r="9" opacity="0.4"/><circle cx="68" cy="34" r="4"/></g><rect x="14" y="60" width="44" height="7" fill="%2318181b"/><rect x="14" y="72" width="30" height="3" fill="%2318181b" opacity="0.5"/></svg>',
    tokens: {
      colors: {
        bg: { label: '版面', default: '#F4F4F2', options: ['#F4F4F2', '#FFFFFF', '#E7E5E4', '#0E0E0E'] },
        ink: { label: '点墨', default: '#18181B', options: ['#18181B', '#000000', '#27272A', '#EDEDED'] },
        accent: { label: '散灰', default: '#A1A1AA', options: ['#A1A1AA', '#71717A', '#D4D4D4', '#52525B'] }
      },
      fonts: { heading: { label: '标题', default: 'Inter, Helvetica, Arial, sans-serif', options: ['Inter, Helvetica, Arial, sans-serif', 'Helvetica, Arial, sans-serif'] } }
    },
    presets: [
      { name: '网点原版', colors: { bg: '#F4F4F2', ink: '#18181B', accent: '#A1A1AA' } },
      { name: '银盐灰阶', colors: { bg: '#FFFFFF', ink: '#000000', accent: '#71717A' } },
      { name: '夜版显影', colors: { bg: '#0E0E0E', ink: '#EDEDED', accent: '#52525B' } },
      { name: '暖灰版印', colors: { bg: '#E7E5E4', ink: '#27272A', accent: '#D4D4D4' } }
    ],
    canvas: {
      virtualWidth: 1000, virtualHeight: 1000, defaultWidth: 1000, defaultHeight: 1000, backgroundColor: { $t: 'colors.bg' },
      backgroundImage: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000"><defs><pattern id="hd" width="30" height="30" patternUnits="userSpaceOnUse"><circle cx="5" cy="5" r="1.5" fill="%2318181b" opacity="0.22"/></pattern></defs><rect width="1000" height="1000" fill="url(%23hd)"/><circle cx="820" cy="150" r="260" fill="%2318181b" opacity="0.05"/></svg>'
    },
    elements: [
      { id: 'dot-sphere', type: 'image', src: DOTS_RING_SVG, x: 560, y: 240, width: 360, height: 360, objectFit: 'contain', zIndex: 2, animation: { name: 'spinSlow', duration: 60000, iterationCount: 'infinite', easing: 'linear' } },
      { id: 'num-giant', type: 'text', content: '01', fontFamily: { $t: 'fonts.heading' }, fontSize: 230, fontWeight: '900', color: { $t: 'colors.ink' }, letterSpacing: -14, x: 70, y: 130, width: 480, height: 260, zIndex: 1, animation: { name: 'zoomOut', duration: 900 }, editable: { content: true, fontSize: { type: 'range', min: 120, max: 300 } } },
      { id: 'title-cn', type: 'text', content: '点聚成形成声', fontFamily: { $t: 'fonts.heading' }, fontSize: 44, fontWeight: '700', color: { $t: 'colors.ink' }, letterSpacing: 10, x: 82, y: 470, width: 600, height: 64, zIndex: 3, animation: { name: 'rise', duration: 800, delay: 300 }, editable: { content: true, fontSize: { type: 'range', min: 29, max: 57 }, position: true } },
      { id: 'rule-mid', type: 'shape', shapeKind: 'line', x: 82, y: 566, width: 836, height: 2, fill: { $t: 'colors.ink' }, opacity: 0.8, zIndex: 3, animation: { name: 'fadeIn', duration: 700, delay: 500 } },
      { id: 'desc', type: 'text', content: 'HALFTONE — 用最少的墨，排最密的秩序。每个点都是一次克制。', fontFamily: 'Helvetica, Arial, sans-serif', fontSize: 22, color: { $t: 'colors.accent' }, lineHeight: 1.7, x: 82, y: 606, width: 460, height: 120, zIndex: 3, editable: { content: true } },
      { id: 'cursor', type: 'shape', shapeKind: 'rect', x: 82, y: 748, width: 26, height: 26, fill: { $t: 'colors.ink' }, zIndex: 3, animation: { name: 'blink', duration: 1200, iterationCount: 'infinite' } },
      { id: 'corner-dots', type: 'shape', shapeKind: 'circle', x: 860, y: 820, width: 14, height: 14, fill: { $t: 'colors.accent' }, zIndex: 2, animation: { name: 'twinkle', duration: 2600, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'corner-dots-2', type: 'shape', shapeKind: 'circle', x: 820, y: 860, width: 9, height: 9, fill: { $t: 'colors.accent' }, zIndex: 2, animation: { name: 'twinkle', duration: 2600, delay: 700, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'foot-tag', type: 'text', content: 'DOT MATRIX OF PURE CONTRAST', fontFamily: 'Georgia, serif', fontSize: 16, color: { $t: 'colors.accent' }, letterSpacing: 6, x: 82, y: 888, width: 500, height: 26, zIndex: 3, editable: { content: true } }
    ]
  },
  {
    id: 'minimal-eclipse-night', name: '玄夜蚀环', version: '1.0.0', category: 'minimal',
    tags: ['minimal', 'black-and-white', 'dark', 'eclipse', 'inverse'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%230c0c0e"/><circle cx="50" cy="42" r="22" fill="none" stroke="%23f4f4f5" stroke-width="3"/><circle cx="42" cy="36" r="22" fill="%230c0c0e"/><circle cx="42" cy="36" r="22" fill="none" stroke="%23f4f4f5" stroke-width="0.8" opacity="0.3"/><rect x="28" y="76" width="44" height="3" fill="%23f4f4f5"/></svg>',
    tokens: {
      colors: {
        bg: { label: '夜色', default: '#0C0C0E', options: ['#0C0C0E', '#000000', '#101418', '#F4F4F5'] },
        ink: { label: '白光', default: '#F4F4F5', options: ['#F4F4F5', '#FFFFFF', '#E4E4E7', '#18181B'] },
        accent: { label: '远灰', default: '#52525B', options: ['#52525B', '#3F3F46', '#71717A', '#A1A1AA'] }
      },
      fonts: { heading: { label: '标题', default: 'Helvetica, Arial, sans-serif', options: ['Helvetica, Arial, sans-serif', 'Inter, sans-serif', 'Songti SC, SimSun, serif'] } }
    },
    presets: [
      { name: '玄夜素环', colors: { bg: '#0C0C0E', ink: '#F4F4F5', accent: '#52525B' } },
      { name: '纯黑皓白', colors: { bg: '#000000', ink: '#FFFFFF', accent: '#3F3F46' } },
      { name: '白昼逆蚀', colors: { bg: '#F4F4F5', ink: '#18181B', accent: '#A1A1AA' } },
      { name: '墨蓝蚀影', colors: { bg: '#101418', ink: '#E4E4E7', accent: '#71717A' } }
    ],
    canvas: {
      virtualWidth: 1000, virtualHeight: 1000, defaultWidth: 1000, defaultHeight: 1000, backgroundColor: { $t: 'colors.bg' },
      backgroundImage: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000"><circle cx="500" cy="400" r="340" fill="%23ffffff" opacity="0.03"/><g fill="%23ffffff"><circle cx="120" cy="160" r="1.8" opacity="0.5"/><circle cx="240" cy="80" r="1.3" opacity="0.35"/><circle cx="840" cy="120" r="1.8" opacity="0.5"/><circle cx="900" cy="300" r="1.2" opacity="0.3"/><circle cx="80" cy="480" r="1.4" opacity="0.4"/><circle cx="930" cy="620" r="1.6" opacity="0.4"/><circle cx="160" cy="760" r="1.2" opacity="0.3"/><circle cx="860" cy="860" r="1.5" opacity="0.4"/><circle cx="300" cy="920" r="1.2" opacity="0.3"/></g></svg>'
    },
    elements: [
      { id: 'corona', type: 'shape', shapeKind: 'circle', x: 300, y: 200, width: 400, height: 400, border: { color: { $t: 'colors.ink' }, width: 3, style: 'solid' }, zIndex: 2, animation: { name: 'pulse', duration: 3200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'corona-halo', type: 'shape', shapeKind: 'circle', x: 276, y: 176, width: 448, height: 448, border: { color: { $t: 'colors.accent' }, width: 1, style: 'solid' }, zIndex: 1, opacity: 0.7, animation: { name: 'ripple', duration: 4200, iterationCount: 'infinite', easing: 'ease-out' } },
      { id: 'bite-disc', type: 'shape', shapeKind: 'circle', x: 262, y: 150, width: 400, height: 400, fill: { $t: 'colors.bg' }, zIndex: 3, animation: { name: 'drift', duration: 14000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'orbit-dot', type: 'shape', shapeKind: 'circle', x: 492, y: 574, width: 16, height: 16, fill: { $t: 'colors.ink' }, zIndex: 4, animation: { name: 'twinkle', duration: 3000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'title-en', type: 'text', content: 'ECLIPSE', fontFamily: { $t: 'fonts.heading' }, fontSize: 84, fontWeight: '800', color: { $t: 'colors.ink' }, letterSpacing: 26, textAlign: 'center', x: 150, y: 680, width: 700, height: 110, zIndex: 5, animation: { name: 'fadeInUp', duration: 1000 }, editable: { content: true, fontSize: { type: 'range', min: 48, max: 110 }, position: true } },
      { id: 'title-cn', type: 'text', content: '朔 之 后 ， 光 重 新 裂 开', fontFamily: 'Songti SC, STSong, SimSun, serif', fontSize: 26, color: { $t: 'colors.accent' }, letterSpacing: 6, textAlign: 'center', x: 220, y: 800, width: 560, height: 40, zIndex: 5, animation: { name: 'fadeIn', duration: 900, delay: 700 }, editable: { content: true } },
      { id: 'top-meta', type: 'text', content: 'TOT. 09 · 19 — 全蚀 04:12', fontFamily: 'Helvetica, Arial, sans-serif', fontSize: 16, color: { $t: 'colors.accent' }, letterSpacing: 4, x: 84, y: 84, width: 400, height: 26, zIndex: 5, editable: { content: true } },
      { id: 'top-meta-r', type: 'text', content: 'B/W DARK SERIES', fontFamily: 'Helvetica, Arial, sans-serif', fontSize: 16, color: { $t: 'colors.accent' }, letterSpacing: 4, textAlign: 'right', x: 600, y: 84, width: 316, height: 26, zIndex: 5, editable: { content: true } }
    ]
  },
  {
    id: 'minimal-type-stack', name: '字块矩阵', version: '1.0.0', category: 'minimal',
    tags: ['minimal', 'black-and-white', 'typography', 'brutalist', 'swiss'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23efefea"/><rect x="12" y="14" width="14" height="14" fill="%23151515"/><rect x="12" y="38" width="76" height="8" fill="%23151515"/><rect x="12" y="52" width="60" height="8" fill="%23151515" opacity="0.55"/><rect x="12" y="66" width="70" height="8" fill="%23151515"/><rect x="84" y="66" width="8" height="8" fill="%23151515"/></svg>',
    tokens: {
      colors: {
        bg: { label: '卡纸', default: '#EFEFEA', options: ['#EFEFEA', '#FFFFFF', '#E7E5E4', '#121212'] },
        ink: { label: '字黑', default: '#151515', options: ['#151515', '#000000', '#1E293B', '#F2F2F2'] },
        accent: { label: '中灰', default: '#8A8A8A', options: ['#8A8A8A', '#B4B4B4', '#5C5C66', '#3F3F46'] }
      },
      fonts: { heading: { label: '标题', default: 'Helvetica, Arial, sans-serif', options: ['Helvetica, Arial, sans-serif', 'Inter, sans-serif', 'Impact, sans-serif'] } }
    },
    presets: [
      { name: '卡纸黑块', colors: { bg: '#EFEFEA', ink: '#151515', accent: '#8A8A8A' } },
      { name: '冷白石墨', colors: { bg: '#FFFFFF', ink: '#1E293B', accent: '#5C5C66' } },
      { name: '黑卡反白', colors: { bg: '#121212', ink: '#F2F2F2', accent: '#B4B4B4' } },
      { name: '暖灰纯黑', colors: { bg: '#E7E5E4', ink: '#000000', accent: '#3F3F46' } }
    ],
    canvas: {
      virtualWidth: 1000, virtualHeight: 1000, defaultWidth: 1000, defaultHeight: 1000, backgroundColor: { $t: 'colors.bg' },
      backgroundImage: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000"><text x="520" y="760" font-family="Helvetica, Arial, sans-serif" font-size="640" font-weight="900" fill="none" stroke="%23151515" stroke-width="2" opacity="0.07" text-anchor="middle">M</text><rect x="60" y="60" width="880" height="880" fill="none" stroke="%23151515" stroke-width="1" opacity="0.14"/></svg>'
    },
    elements: [
      { id: 'block-a', type: 'shape', shapeKind: 'rect', x: 96, y: 96, width: 120, height: 120, fill: { $t: 'colors.ink' }, zIndex: 2, animation: { name: 'zoomIn', duration: 500 } },
      { id: 'block-b', type: 'shape', shapeKind: 'rect', x: 244, y: 96, width: 56, height: 120, fill: { $t: 'colors.accent' }, zIndex: 2, animation: { name: 'zoomIn', duration: 500, delay: 150 } },
      { id: 'line-1', type: 'text', content: 'MONO', fontFamily: { $t: 'fonts.heading' }, fontSize: 150, fontWeight: '900', color: { $t: 'colors.ink' }, letterSpacing: -6, x: 88, y: 280, width: 830, height: 160, zIndex: 3, animation: { name: 'rise', duration: 650, delay: 200 }, editable: { content: true, fontSize: { type: 'range', min: 90, max: 190 } } },
      { id: 'line-2', type: 'text', content: 'TONE', fontFamily: { $t: 'fonts.heading' }, fontSize: 150, fontWeight: '900', color: { $t: 'colors.accent' }, letterSpacing: -6, x: 88, y: 430, width: 830, height: 160, zIndex: 3, animation: { name: 'rise', duration: 650, delay: 420 }, editable: { content: true } },
      { id: 'line-3', type: 'text', content: 'STACK_', fontFamily: { $t: 'fonts.heading' }, fontSize: 150, fontWeight: '900', color: { $t: 'colors.ink' }, letterSpacing: -6, x: 88, y: 580, width: 830, height: 160, zIndex: 3, animation: { name: 'rise', duration: 650, delay: 640 }, editable: { content: true } },
      { id: 'caret', type: 'shape', shapeKind: 'rect', x: 760, y: 640, width: 64, height: 96, fill: { $t: 'colors.ink' }, zIndex: 2, animation: { name: 'blink', duration: 1100, iterationCount: 'infinite' } },
      { id: 'rule-foot', type: 'shape', shapeKind: 'line', x: 96, y: 836, width: 808, height: 2, fill: { $t: 'colors.ink' }, zIndex: 3, animation: { name: 'fadeIn', duration: 600, delay: 1100 } },
      { id: 'foot-left', type: 'text', content: '瑞士排印 · 黑白三部曲', fontFamily: 'Songti SC, STSong, SimSun, serif', fontSize: 24, color: { $t: 'colors.ink' }, x: 88, y: 858, width: 420, height: 36, zIndex: 3, editable: { content: true } },
      { id: 'foot-right', type: 'text', content: 'TYPE AS ARCHITECTURE', fontFamily: 'Georgia, serif', fontSize: 18, color: { $t: 'colors.accent' }, letterSpacing: 5, textAlign: 'right', x: 560, y: 864, width: 344, height: 28, zIndex: 3, editable: { content: true } }
    ]
  }
]

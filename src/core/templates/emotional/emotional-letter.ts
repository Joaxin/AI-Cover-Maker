// src/core/templates/emotional/emotional-letter.ts —— 手写信纸
import type { Template } from '@/types/types'

// 桌面木纹底纹
const DESK_TEXTURE_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000"><g stroke="%23a07b44" stroke-width="1.5" opacity="0.25"><path d="M0 80 Q 250 66 500 82 T 1000 76"/><path d="M0 260 Q 300 246 600 264 T 1000 254"/><path d="M0 470 Q 260 452 520 472 T 1000 462"/><path d="M0 690 Q 320 674 640 694 T 1000 684"/><path d="M0 880 Q 240 866 480 884 T 1000 876"/></g><g fill="%237c5a2e" opacity="0.1"><ellipse cx="180" cy="180" rx="26" ry="9"/><ellipse cx="830" cy="760" rx="30" ry="10"/><ellipse cx="620" cy="120" rx="20" ry="7"/></g></svg>'
// 信纸横格 + 红色页边线
const RULED_PAPER_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="780" height="760" viewBox="0 0 780 760"><g stroke="%23c9b892" stroke-width="1" opacity="0.8"><line x1="50" y1="220" x2="740" y2="220"/><line x1="50" y1="320" x2="740" y2="320"/><line x1="50" y1="420" x2="740" y2="420"/><line x1="50" y1="520" x2="740" y2="520"/><line x1="50" y1="620" x2="740" y2="620"/></g><line x1="42" y1="30" x2="42" y2="730" stroke="%23b91c1c" stroke-width="1.5" opacity="0.55"/></svg>'
// 咖啡渍圆环
const COFFEE_RING_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160"><circle cx="80" cy="80" r="58" fill="none" stroke="%238a5a2b" stroke-width="7" opacity="0.28"/><circle cx="80" cy="80" r="58" fill="none" stroke="%238a5a2b" stroke-width="2.5" opacity="0.4" stroke-dasharray="150 60" transform="rotate(-30 80 80)"/><circle cx="118" cy="42" r="6" fill="%238a5a2b" opacity="0.18"/></svg>'
// 火漆印
const WAX_SEAL_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 150 150"><path d="M75 12 L96 26 L120 22 L126 46 L146 60 L134 80 L142 102 L118 108 L108 130 L84 124 L64 140 L52 118 L28 114 L32 90 L14 72 L34 56 L30 32 L54 34 Z" fill="%23991B1B"/><circle cx="75" cy="75" r="40" fill="%23B91C1C"/><circle cx="75" cy="75" r="40" fill="none" stroke="%237F1D1D" stroke-width="3"/><path d="M75 48 Q 92 62 75 78 Q 58 62 75 48 M60 84 Q 75 96 90 84" fill="none" stroke="%23FCA5A5" stroke-width="4" stroke-linecap="round" opacity="0.85"/></svg>'

export const emotionalLetterTemplate: Template = {
  id: 'emotional-handwritten-letter', name: '未寄出的信', version: '1.1.0', category: 'emotional', tags: ['emotional', 'letter', 'handwritten', 'nostalgic'],
  thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23f5ead5"/><rect x="15" y="20" width="70" height="60" fill="%23fffbef" stroke="%23c9b892" stroke-width="1.5"/><line x1="24" y1="36" x2="76" y2="36" stroke="%239a8c6d" stroke-width="1.5"/><line x1="24" y1="50" x2="70" y2="50" stroke="%239a8c6d" stroke-width="1.5"/><rect x="66" y="24" width="14" height="10" fill="none" stroke="%23b91c1c" stroke-width="1.5"/></svg>',
  tokens: {
    colors: {
      bg: { label: '旧桌', default: '#EAD9B8', options: ['#EAD9B8', '#E3CFA8', '#F0E3C8', '#D6C6A3', '#E7E5E4'] },
      paper: { label: '信纸', default: '#FFFBEF', options: ['#FFFBEF', '#FDF8E8', '#FFFFF5', '#FAF3DF', '#FAFAF9'] },
      primary: { label: '钢笔蓝', default: '#1E3A5F', options: ['#1E3A5F', '#334155', '#3B5B8C', '#92400E', '#14532D'] },
      accent: { label: '火漆红', default: '#B91C1C', options: ['#B91C1C', '#991B1B', '#DC2626', '#BE123C', '#166534'] }
    },
    fonts: { heading: { label: '标题字体', default: 'STKaiti, KaiTi, serif', options: ['STKaiti, KaiTi, serif', 'STSong, Songti SC, SimSun, serif', 'Georgia, serif'] } }
  },
  presets: [
    { name: '钢笔蓝旧桌', colors: { bg: '#EAD9B8', paper: '#FFFBEF', primary: '#1E3A5F', accent: '#B91C1C' } },
    { name: '茶墨秋笺', colors: { bg: '#D6C6A3', paper: '#FAF3DF', primary: '#92400E', accent: '#BE123C' } },
    { name: '雪信松青', colors: { bg: '#E7E5E4', paper: '#FAFAF9', primary: '#14532D', accent: '#166534' } },
    { name: '麦色旧笺', colors: { bg: '#E3CFA8', paper: '#FDF8E8', primary: '#3B5B8C', accent: '#DC2626' } }
  ],
  canvas: {
    virtualWidth: 1000, virtualHeight: 1000, defaultWidth: 1000, defaultHeight: 1000, backgroundColor: { $t: 'colors.bg' },
    backgroundImage: DESK_TEXTURE_SVG
  },
  elements: [
    { id: 'paper', type: 'shape', shapeKind: 'rect', x: 110, y: 120, width: 780, height: 760, fill: { $t: 'colors.paper' }, rotation: { $random: { type: 'range', min: -1.5, max: 1.5, step: 0.5 } }, shadow: { offsetX: 0, offsetY: 14, blur: 30, color: 'rgba(90,70,30,0.35)' }, zIndex: 1 },
    { id: 'paper-rules', type: 'image', src: RULED_PAPER_SVG, objectFit: 'contain', x: 110, y: 120, width: 780, height: 760, zIndex: 1, animation: { name: 'fadeIn', duration: 900, delay: 400 } },
    { id: 'coffee-ring', type: 'image', src: COFFEE_RING_SVG, objectFit: 'contain', x: 700, y: 700, width: 160, height: 160, zIndex: 2, animation: { name: 'fadeIn', duration: 1200, delay: 1600 }, editable: { position: true, size: { type: 'scale' } } },
    { id: 'greeting', type: 'text', content: '见字如面：', fontFamily: { $t: 'fonts.heading' }, fontSize: 44, fontWeight: '700', color: { $t: 'colors.primary' }, x: 160, y: 190, width: 400, height: 70, zIndex: 3, animation: { name: 'inkReveal', duration: 1300 }, editable: { content: true } },
    { id: 'body', type: 'text', content: '有些话写下来就轻了，\n有些想念寄出去就暖了。\n愿收信的你，一切安好。', fontFamily: { $t: 'fonts.heading' }, fontSize: 36, fontWeight: '500', color: { $t: 'colors.primary' }, lineHeight: 2.1, x: 160, y: 290, width: 680, height: 380, zIndex: 3, animation: { name: 'fadeIn', duration: 1200, delay: 600 }, editable: { content: true, fontSize: { type: 'range', min: 26, max: 46 }, position: true } },
    { id: 'sign', type: 'text', content: '—— 一个念旧的人', fontFamily: { $t: 'fonts.heading' }, fontSize: 30, fontWeight: '500', color: { $t: 'colors.primary' }, textAlign: 'right', x: 460, y: 740, width: 380, height: 50, zIndex: 3, animation: { name: 'fadeInUp', duration: 1000, delay: 1400 }, editable: { content: true } },
    { id: 'stamp', type: 'shape', shapeKind: 'rect', x: 740, y: 160, width: 110, height: 86, fill: { $t: 'colors.paper' }, border: { color: { $t: 'colors.accent' }, width: 3, style: 'dashed' }, rotation: 4, zIndex: 3, animation: { name: 'fadeIn', duration: 900, delay: 900 } },
    { id: 'stamp-char', type: 'text', content: '寄', fontFamily: { $t: 'fonts.heading' }, fontSize: 44, fontWeight: '700', color: { $t: 'colors.accent' }, textAlign: 'center', x: 740, y: 175, width: 110, height: 60, zIndex: 4, rotation: 4, animation: { name: 'bounce', duration: 2400, delay: 1500, iterationCount: 'infinite' } },
    { id: 'wax-seal', type: 'image', src: WAX_SEAL_SVG, objectFit: 'contain', x: 130, y: 740, width: 130, height: 130, rotation: -8, zIndex: 4, animation: { name: 'fadeInDown', duration: 900, delay: 1200 }, editable: { position: true, size: { type: 'scale' } } },
    { id: 'postmark-arc', type: 'shape', shapeKind: 'circle', x: 690, y: 205, width: 190, height: 190, border: { color: { $t: 'colors.accent' }, width: 2, style: 'dashed' }, opacity: 0.5, zIndex: 5, animation: { name: 'spinSlow', duration: 60000, iterationCount: 'infinite' } }
  ]
}

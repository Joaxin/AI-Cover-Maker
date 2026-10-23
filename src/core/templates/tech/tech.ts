// src/core/templates/tech/tech.ts
import type { Template } from '@/types/types'
export const techTemplates: Template[] = [
{
  id: 'tech-quantum-grid', name: '量子矩阵科技', version: '1.1.0', category: 'tech',
  tags: ['tech', 'cyber', 'matrix', 'dark', 'code'],
  thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23050814"/><defs><pattern id="qg" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M10 0 L0 0 0 10" fill="none" stroke="%2300f0ff" stroke-width="0.3" opacity="0.22"/></pattern></defs><rect width="100" height="100" fill="url(%23qg)"/><g fill="%2300f0ff"><circle cx="12" cy="13" r="1.5"/><circle cx="20" cy="13" r="1.3" opacity="0.75"/><circle cx="28" cy="13" r="1.1" opacity="0.5"/><circle cx="36" cy="13" r="0.9" opacity="0.3"/></g><g stroke="%2300f0ff" stroke-width="0.7" fill="none"><circle cx="84" cy="15" r="5"/><path d="M77 15 H91 M84 8 V22"/></g><rect x="10" y="28" width="56" height="5" fill="%23ffffff"/><rect x="10" y="37" width="43" height="5" fill="%23ffffff" opacity="0.8"/><rect x="10" y="46" width="60" height="5" fill="%23ffffff" opacity="0.6"/><rect x="10" y="57" width="34" height="2" fill="%2300f0ff" opacity="0.7"/><g stroke="%2300f0ff" stroke-width="0.6" opacity="0.6" fill="none"><path d="M32 70 L57 63 M34 78 L57 82"/></g><g fill="%2300f0ff"><circle cx="59" cy="62" r="1.8"/><circle cx="59" cy="83" r="1.5" opacity="0.7"/><rect x="11" y="66" width="3" height="3"/><rect x="21" y="66" width="3" height="3" opacity="0.75"/><rect x="31" y="66" width="3" height="3" opacity="0.5"/><rect x="11" y="94" width="3" height="3"/><rect x="21" y="94" width="3" height="3" opacity="0.75"/><rect x="31" y="94" width="3" height="3" opacity="0.5"/></g><g fill="%2300f0ff"><rect x="88" y="30" width="4" height="4"/><rect x="88" y="42" width="4" height="4" opacity="0.45"/><rect x="88" y="54" width="4" height="4" opacity="0.2"/></g><g fill="%2300f0ff"><rect x="10" y="80" width="30" height="2"/><rect x="10" y="85" width="22" height="2" opacity="0.65"/><rect x="10" y="90" width="38" height="2" opacity="0.4"/></g><rect x="46" y="80" width="26" height="2" fill="%2300f0ff" opacity="0.85"/></svg>',
  tokens: {
    colors: {
      bg: { label: '背景', default: '#050814', options: ['#050814', '#030712', '#0A0F1E', '#0A0118', '#020617'] },
      primary: { label: '主色', default: '#FFFFFF', options: ['#FFFFFF', '#F8FAFC', '#E2E8F0', '#F5F3FF', '#ECFCCB', '#E0F2FE'] },
      accent: { label: '科技青', default: '#00F0FF', options: ['#00F0FF', '#22D3EE', '#06B6D4', '#A78BFA', '#4ADE80', '#38BDF8'] }
    },
    fonts: { heading: { label: '标题字体', default: 'Helvetica, Arial, sans-serif', options: ['Helvetica, Arial, sans-serif', 'Impact, sans-serif', 'Inter, sans-serif'] } }
  },
  presets: [
    { name: '极夜科技青', colors: { bg: '#050814', primary: '#FFFFFF', accent: '#00F0FF' } },
    { name: '数据矩阵紫', colors: { bg: '#0A0118', primary: '#F5F3FF', accent: '#A78BFA' } },
    { name: '荧光终端绿', colors: { bg: '#030712', primary: '#ECFCCB', accent: '#4ADE80' } },
    { name: '深海量子蓝', colors: { bg: '#020617', primary: '#E0F2FE', accent: '#38BDF8' } }
  ],
  canvas: { virtualWidth: 1000, virtualHeight: 1000, defaultWidth: 1000, defaultHeight: 1000, backgroundColor: { $t: 'colors.bg' } },
  elements: [
    { id: 'grid-vector', type: 'image', src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000"><defs><pattern id="p" width="50" height="50" patternUnits="userSpaceOnUse"><path d="M 50 0 L 0 0 0 50" fill="none" stroke="%2300F0FF" stroke-width="0.7" opacity="0.16"/><circle cx="50" cy="50" r="1.1" fill="%2300F0FF" opacity="0.2"/></pattern></defs><rect width="1000" height="1000" fill="url(%23p)"/><circle cx="810" cy="180" r="230" fill="%2300F0FF" opacity="0.05"/><circle cx="170" cy="830" r="250" fill="%2300F0FF" opacity="0.04"/></svg>', x: 0, y: 0, width: 1000, height: 1000, objectFit: 'fill', zIndex: 1, editable: { src: true } },
    { id: 'status-indicator', type: 'shape', shapeKind: 'circle', x: 100, y: 120, width: 16, height: 16, fill: { $t: 'colors.accent' }, zIndex: 2, animation: { name: 'glow', duration: 1500, iterationCount: 'infinite' } },
    { id: 'scan-line', type: 'shape', shapeKind: 'line', x: 130, y: 245, width: 770, height: 2, fill: { $t: 'colors.accent' }, opacity: 0.5, zIndex: 2, animation: { name: 'slideInLeft', duration: 1400 } },
    { id: 'system-text', type: 'text', content: 'SYSTEM ARCHITECTURE // V4.1', fontFamily: 'Courier New, monospace', fontSize: 18, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 2, x: 130, y: 118, width: 500, height: 30, zIndex: 3, editable: { content: true } },
    { id: 'cross-h', type: 'shape', shapeKind: 'rect', x: 816, y: 149, width: 88, height: 2, fill: { $t: 'colors.accent' }, opacity: 0.85, zIndex: 3, animation: { name: 'fadeIn', duration: 600, delay: 900 } },
    { id: 'cross-v', type: 'shape', shapeKind: 'rect', x: 859, y: 106, width: 2, height: 88, fill: { $t: 'colors.accent' }, opacity: 0.85, zIndex: 3 },
    { id: 'cross-ring', type: 'shape', shapeKind: 'circle', x: 838, y: 128, width: 44, height: 44, border: { color: { $t: 'colors.accent' }, width: 1.5, style: 'solid' }, opacity: 0.6, zIndex: 3, animation: { name: 'ripple', duration: 3200, iterationCount: 'infinite', easing: 'ease-out' } },
    ...Array.from({ length: 8 }, (_, i) => ({ id: `mat-node-${i}`, type: 'shape' as const, shapeKind: 'circle' as const, x: 100 + (i % 4) * 66, y: 636 + Math.floor(i / 4) * 52, width: 10, height: 10, fill: { $t: 'colors.accent' }, opacity: 0.62 - (i % 4) * 0.13, group: 'matrix', zIndex: 2 })),
    ...Array.from({ length: 3 }, (_, i) => ({ id: `edge-cell-${i}`, type: 'shape' as const, shapeKind: 'rect' as const, x: 940, y: 300 + i * 88, width: 12, height: 12, fill: { $t: 'colors.accent' }, opacity: 0.6 - i * 0.2, borderRadius: 2, group: 'edge-cell', zIndex: 2 })),
    ...Array.from({ length: 3 }, (_, i) => ({ id: `data-bar-${i}`, type: 'shape' as const, shapeKind: 'rect' as const, x: 100, y: 856 + i * 28, width: [300, 220, 380][i], height: 8, fill: { $t: 'colors.accent' }, opacity: 0.85 - i * 0.22, borderRadius: 4, group: 'data-bar', zIndex: 2 })),
    { id: 'net-link-a', type: 'shape', shapeKind: 'rect', x: 320, y: 640, width: 250, height: 2, fill: { $t: 'colors.accent' }, opacity: 0.45, rotation: -13, zIndex: 2 },
    { id: 'net-link-b', type: 'shape', shapeKind: 'rect', x: 350, y: 700, width: 210, height: 2, fill: { $t: 'colors.accent' }, opacity: 0.32, rotation: 11, zIndex: 2 },
    { id: 'net-node-a', type: 'shape', shapeKind: 'circle', x: 560, y: 606, width: 14, height: 14, fill: { $t: 'colors.accent' }, zIndex: 2, animation: { name: 'twinkle', duration: 2600, iterationCount: 'infinite', easing: 'ease-in-out' } },
    { id: 'net-node-b', type: 'shape', shapeKind: 'circle', x: 552, y: 715, width: 12, height: 12, fill: { $t: 'colors.accent' }, opacity: 0.7, zIndex: 2, animation: { name: 'twinkle', duration: 3200, delay: 500, iterationCount: 'infinite', easing: 'ease-in-out' } },
    { id: 'hero-title', type: 'text', content: 'NEXT-GEN\nCLOUD NATIVE\nENGINE', fontFamily: { $t: 'fonts.heading' }, fontSize: 76, fontWeight: '900', color: { $t: 'colors.primary' }, lineHeight: 1.1, letterSpacing: -1, x: 100, y: 280, width: 800, height: 280, zIndex: 4, animation: { name: 'fadeInUp', duration: 700 }, editable: { content: true, fontSize: { type: 'range', min: 56, max: 96 }, position: true } },
    { id: 'hero-sub', type: 'text', content: '量子级并行不是更快，而是每一瓦都花在刀刃上', fontFamily: { $t: 'fonts.heading' }, fontSize: 26, fontWeight: '500', color: { $t: 'colors.primary' }, opacity: 0.82, x: 100, y: 572, width: 680, height: 46, zIndex: 4, animation: { name: 'fadeInUp', duration: 700, delay: 420 }, editable: { content: true, position: true } },
    { id: 'bar-value-a', type: 'text', content: 'GPU UTIL 92.4%', fontFamily: 'Courier New, monospace', fontSize: 18, fontWeight: '700', color: { $t: 'colors.accent' }, x: 500, y: 850, width: 280, height: 26, zIndex: 3, editable: { content: true } },
    { id: 'bar-value-b', type: 'text', content: 'I/O 1.04 GB/s', fontFamily: 'Courier New, monospace', fontSize: 18, color: { $t: 'colors.primary' }, opacity: 0.6, x: 500, y: 884, width: 280, height: 26, zIndex: 3, editable: { content: true } },
    { id: 'code-tag', type: 'text', content: '01011001 01100001 01110010 01101110', fontFamily: 'Courier New, monospace', fontSize: 18, fontWeight: '400', color: { $t: 'colors.primary' }, opacity: 0.3, x: 100, y: 812, width: 800, height: 30, zIndex: 2, editable: { content: true } }
  ]
},
{
  id: 'tech-circuit-ai', name: '神经智能算力', version: '1.1.0', category: 'tech',
  tags: ['tech', 'ai', 'neural', 'computing'],
  thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23020617"/><defs><pattern id="ca" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M10 0 L0 0 0 10" fill="none" stroke="%2338bdf8" stroke-width="0.25" opacity="0.18"/></pattern></defs><rect width="100" height="100" fill="url(%23ca)"/><rect x="60" y="18" width="30" height="30" rx="3" fill="%2338bdf8" fill-opacity="0.12" stroke="%2338bdf8" stroke-width="1.2"/><rect x="67" y="25" width="16" height="16" rx="2" fill="none" stroke="%2338bdf8" stroke-width="0.7" opacity="0.7"/><circle cx="75" cy="33" r="4" fill="%2338bdf8" opacity="0.75"/><g fill="%2338bdf8"><rect x="54" y="22" width="5" height="2"/><rect x="54" y="28" width="5" height="2" opacity="0.8"/><rect x="54" y="34" width="5" height="2" opacity="0.6"/><rect x="54" y="40" width="5" height="2" opacity="0.45"/></g><g stroke="%2338bdf8" stroke-width="0.8" fill="none" opacity="0.65"><path d="M12 58 H46 M46 46 V58 M12 66 H32 M12 74 H56 M56 50 V74"/></g><g fill="%2338bdf8"><circle cx="46" cy="58" r="1.6"/><circle cx="56" cy="74" r="1.6"/></g><rect x="10" y="14" width="34" height="4" fill="%23f8fafc"/><rect x="10" y="22" width="26" height="4" fill="%23f8fafc" opacity="0.8"/><g stroke="%2338bdf8" stroke-width="0.7" opacity="0.6"><path d="M14 88 L29 93 M30 93 L45 86"/></g><g fill="%2338bdf8"><circle cx="14" cy="88" r="1.8"/><circle cx="29" cy="93" r="1.8"/><circle cx="45" cy="86" r="1.8"/></g></svg>',
  tokens: {
    colors: {
      bg: { label: '背景', default: '#020617', options: ['#020617', '#0F172A', '#111827', '#1E1B4B', '#0C0A09'] },
      primary: { label: '主色', default: '#F8FAFC', options: ['#F8FAFC', '#FFFFFF', '#E2E8F0', '#EEF2FF', '#FAFAFA'] },
      accent: { label: '科技蓝', default: '#38BDF8', options: ['#38BDF8', '#0EA5E9', '#06B6D4', '#818CF8', '#FB923C', '#22D3EE'] }
    },
    fonts: { heading: { label: '标题字体', default: 'Helvetica, Arial, sans-serif', options: ['Helvetica, Arial, sans-serif', 'Impact, sans-serif', 'Inter, sans-serif'] } }
  },
  presets: [
    { name: '深海算力蓝', colors: { bg: '#020617', primary: '#F8FAFC', accent: '#38BDF8' } },
    { name: '量子神经紫', colors: { bg: '#1E1B4B', primary: '#EEF2FF', accent: '#818CF8' } },
    { name: '熔岩推理橙', colors: { bg: '#0C0A09', primary: '#FAFAFA', accent: '#FB923C' } },
    { name: '碳素极简灰', colors: { bg: '#111827', primary: '#E2E8F0', accent: '#22D3EE' } }
  ],
  canvas: { virtualWidth: 1000, virtualHeight: 1000, defaultWidth: 1000, defaultHeight: 1000, backgroundColor: { $t: 'colors.bg' } },
  elements: [
    { id: 'pcb-field', type: 'image', src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000"><defs><pattern id="pcb" width="62" height="62" patternUnits="userSpaceOnUse"><path d="M 62 0 L 0 0 0 62" fill="none" stroke="%2338BDF8" stroke-width="0.5" opacity="0.09"/><rect x="29" y="29" width="3" height="3" fill="%2338BDF8" opacity="0.16"/></pattern></defs><rect width="1000" height="1000" fill="url(%23pcb)"/><circle cx="760" cy="340" r="300" fill="%2338BDF8" opacity="0.05"/><circle cx="180" cy="800" r="220" fill="%2338BDF8" opacity="0.04"/></svg>', x: 0, y: 0, width: 1000, height: 1000, objectFit: 'fill', zIndex: 1, editable: { src: true } },
    { id: 'core-chip', type: 'shape', shapeKind: 'rect', x: 620, y: 200, width: 280, height: 280, fill: { $t: 'colors.primary' }, opacity: 0.08, borderRadius: 20, border: { color: { $t: 'colors.accent' }, width: 2, style: 'solid' }, zIndex: 2, animation: { name: 'float', duration: 7000, iterationCount: 'infinite', easing: 'ease-in-out' }, editable: { position: true } },
    { id: 'chip-die', type: 'shape', shapeKind: 'rect', x: 660, y: 240, width: 200, height: 200, borderRadius: 10, border: { color: { $t: 'colors.accent' }, width: 1.5, style: 'solid' }, opacity: 0.55, zIndex: 3 },
    { id: 'chip-glow', type: 'shape', shapeKind: 'circle', x: 720, y: 300, width: 80, height: 80, fill: { $t: 'colors.accent' }, opacity: 0.55, zIndex: 3, animation: { name: 'glow', duration: 2000, iterationCount: 'infinite' } },
    ...Array.from({ length: 5 }, (_, i) => ({ id: `chip-pin-${i}`, type: 'shape' as const, shapeKind: 'rect' as const, x: 586, y: 252 + i * 42, width: 30, height: 10, fill: { $t: 'colors.accent' }, opacity: 0.85 - i * 0.1, borderRadius: 2, group: 'chip-pin', zIndex: 2 })),
    ...Array.from({ length: 3 }, (_, i) => ({ id: `trace-h-${i}`, type: 'shape' as const, shapeKind: 'rect' as const, x: 140, y: 560 + i * 40, width: [460, 320, 600][i], height: 2, fill: { $t: 'colors.accent' }, opacity: 0.5 - i * 0.08, group: 'trace', zIndex: 2 })),
    ...Array.from({ length: 2 }, (_, i) => ({ id: `trace-v-${i}`, type: 'shape' as const, shapeKind: 'rect' as const, x: [600, 740][i], y: [440, 490][i], width: 2, height: [122, 152][i], fill: { $t: 'colors.accent' }, opacity: 0.46 - i * 0.08, group: 'trace', zIndex: 2 })),
    ...Array.from({ length: 2 }, (_, i) => ({ id: `trace-via-${i}`, type: 'shape' as const, shapeKind: 'circle' as const, x: [595, 735][i], y: [555, 635][i], width: 10, height: 10, fill: { $t: 'colors.accent' }, opacity: 0.9 - i * 0.15, group: 'trace', zIndex: 3 })),
    ...Array.from({ length: 3 }, (_, i) => ({ id: `nn-node-${i}`, type: 'shape' as const, shapeKind: 'circle' as const, x: [146, 340, 546][i], y: [780, 824, 772][i], width: 18, height: 18, fill: { $t: 'colors.accent' }, opacity: 0.95 - i * 0.14, group: 'nn-node', zIndex: 3 })),
    { id: 'nn-syn-a', type: 'shape', shapeKind: 'rect', x: 152, y: 810, width: 200, height: 2, fill: { $t: 'colors.accent' }, opacity: 0.42, rotation: 13, zIndex: 2 },
    { id: 'nn-syn-b', type: 'shape', shapeKind: 'rect', x: 346, y: 806, width: 212, height: 2, fill: { $t: 'colors.accent' }, opacity: 0.34, rotation: -14, zIndex: 2 },
    { id: 'chip-layer-a', type: 'text', content: 'L0 · 128 LANES', fontFamily: 'Courier New, monospace', fontSize: 16, fontWeight: '700', color: { $t: 'colors.accent' }, x: 672, y: 384, width: 180, height: 24, zIndex: 4, editable: { content: true } },
    { id: 'chip-layer-b', type: 'text', content: 'L1 · 96GB HBM3', fontFamily: 'Courier New, monospace', fontSize: 16, color: { $t: 'colors.primary' }, opacity: 0.6, x: 672, y: 410, width: 180, height: 24, zIndex: 4, editable: { content: true } },
    { id: 'comp-label-u7', type: 'text', content: 'U7 · ASIC-9', fontFamily: 'Courier New, monospace', fontSize: 13, color: { $t: 'colors.primary' }, opacity: 0.65, x: 620, y: 498, width: 110, height: 20, zIndex: 4, editable: { content: true } },
    { id: 'comp-label-r13', type: 'text', content: 'R13 4.7kΩ', fontFamily: 'Courier New, monospace', fontSize: 13, color: { $t: 'colors.primary' }, opacity: 0.5, x: 620, y: 524, width: 110, height: 20, zIndex: 4, editable: { content: true } },
    { id: 'peak-value', type: 'text', content: '1,024 TFLOPS', fontFamily: 'Courier New, monospace', fontSize: 18, fontWeight: '700', color: { $t: 'colors.accent' }, x: 770, y: 500, width: 160, height: 26, zIndex: 4, animation: { name: 'fadeIn', duration: 600, delay: 800 }, editable: { content: true } },
    { id: 'badge-ai', type: 'text', content: 'NEURAL CLUSTER // REV.4', fontFamily: 'Courier New, monospace', fontSize: 20, fontWeight: '700', color: { $t: 'colors.accent' }, x: 100, y: 160, width: 440, height: 30, zIndex: 2, editable: { content: true, position: true } },
    { id: 'title-ai', type: 'text', content: 'AI INFRA\nBENCHMARK', fontFamily: { $t: 'fonts.heading' }, fontSize: 70, fontWeight: '900', color: { $t: 'colors.primary' }, lineHeight: 1.15, x: 100, y: 240, width: 470, height: 220, zIndex: 3, animation: { name: 'fadeIn', duration: 800 }, editable: { content: true, fontSize: { type: 'range', min: 52, max: 90 }, position: true } },
    { id: 'sub-cn', type: 'text', content: '算力不是堆电费，是算准每一瓦', fontFamily: { $t: 'fonts.heading' }, fontSize: 26, fontWeight: '500', color: { $t: 'colors.primary' }, opacity: 0.85, x: 100, y: 478, width: 470, height: 46, zIndex: 3, animation: { name: 'fadeInUp', duration: 700, delay: 400 }, editable: { content: true, position: true } },
    { id: 'stats-line', type: 'text', content: 'Latency < 1.2ms · P99 Stable · 100M+ QPS Concurrency', fontFamily: { $t: 'fonts.heading' }, fontSize: 22, fontWeight: '500', color: { $t: 'colors.primary' }, opacity: 0.6, x: 100, y: 690, width: 800, height: 44, zIndex: 3, editable: { content: true, position: true } }
  ]
}
]

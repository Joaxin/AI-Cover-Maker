// src/core/templates/minimal/hy4-brutalist.ts —— 粗野主义 Brutalist（1:1）
// 粗野语言：硬边色块 + 超粗无衬线 + 位移重影 + 等宽标注条。
// HY4 标记：id / 导出名 / tags 带 hy4，右下角条签嵌入「HY4 / BLOCK 04」。
import type { Template } from '@/types/types'
import { HEI, IMPACT, MONO, SANS, grain } from '../_fx/trend'

export const hy4BrutalistTemplates: Template[] = [
  {
    id: 'hy4-brutalist', name: '粗野区块', version: '1.0.0', category: 'minimal',
    tags: ['hy4', 'minimal', 'brutalist', 'bold type', 'block', 'swiss', '1:1'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="108" height="108" viewBox="0 0 108 108"><rect width="108" height="108" fill="%23F2F0EB"/><rect x="0" y="0" width="108" height="30" fill="%23111"/><rect x="60" y="40" width="40" height="40" fill="%23F5D90A"/><rect x="10" y="52" width="46" height="7" fill="%23111"/><rect x="10" y="64" width="34" height="7" fill="%23111"/><rect x="10" y="86" width="88" height="2" fill="%23111"/></svg>',
    tokens: {
      colors: {
        bg: { label: '底', default: '#F2F0EB', options: ['#F2F0EB', '#FFFFFF', '#111111', '#E9E4DA'] },
        ink: { label: '墨', default: '#111111', options: ['#111111', '#1C1C1C', '#FAF8F4', '#191919'] },
        accent: { label: '强调块', default: '#F5D90A', options: ['#F5D90A', '#FF5A36', '#2F6BFF', '#12C08E'] },
        block: { label: '深色块', default: '#1C1C1C', options: ['#1C1C1C', '#111111', '#F0ECE3', '#232323'] }
      },
      fonts: { heading: { label: '标题', default: IMPACT, options: [IMPACT, HEI, SANS] }, note: { label: '标注', default: MONO, options: [MONO, SANS] } }
    },
    presets: [
      { name: '水泥黄', colors: { bg: '#F2F0EB', ink: '#111111', accent: '#F5D90A', block: '#1C1C1C' } },
      { name: '纯白橙', colors: { bg: '#FFFFFF', ink: '#1C1C1C', accent: '#FF5A36', block: '#111111' } },
      { name: '反相黑', colors: { bg: '#111111', ink: '#FAF8F4', accent: '#2F6BFF', block: '#F0ECE3' } },
      { name: '灰纸绿', colors: { bg: '#E9E4DA', ink: '#191919', accent: '#12C08E', block: '#232323' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1080, defaultWidth: 1080, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      // 顶部深色条
      { id: 'hy4-br-top', type: 'shape', shapeKind: 'rect', x: 0, y: 0, width: 1080, height: 190, fill: { $t: 'colors.block' }, zIndex: 2, animation: { name: 'slideInLeft', duration: 700 } },
      { id: 'hy4-br-topbar-t', type: 'text', content: 'BRUTALIST / 粗野区块', fontFamily: { $t: 'fonts.note' }, fontSize: 26, fontWeight: '700', color: { $t: 'colors.bg' }, opacity: 0.92, letterSpacing: 7, x: 70, y: 78, width: 700, height: 36, zIndex: 8, animation: { name: 'fadeIn', duration: 600, delay: 200 } },
      // 强调块
      { id: 'hy4-br-chip', type: 'shape', shapeKind: 'rect', x: 700, y: 250, width: 300, height: 300, fill: { $t: 'colors.accent' }, zIndex: 3, animation: { name: 'zoomIn', duration: 800, delay: 200 } },
      { id: 'hy4-br-chip-x', type: 'shape', shapeKind: 'rect', x: 700, y: 250, width: 300, height: 8, fill: { $t: 'colors.ink' }, zIndex: 4 },
      { id: 'hy4-br-chip-y', type: 'shape', shapeKind: 'rect', x: 700, y: 250, width: 8, height: 300, fill: { $t: 'colors.ink' }, zIndex: 4 },
      // 标题 + 位移重影（ghost 豁免字面重叠）
      { id: 'hy4-br-title-ghost', type: 'text', content: 'BRUTAL', fontFamily: { $t: 'fonts.heading' }, fontSize: 150, fontWeight: '900', color: { $t: 'colors.accent' }, opacity: 0.9, letterSpacing: -2, x: 82, y: 428, width: 900, height: 176, zIndex: 5 },
      { id: 'hy4-br-title', type: 'text', content: 'BRUTAL', fontFamily: { $t: 'fonts.heading' }, fontSize: 150, fontWeight: '900', color: { $t: 'colors.ink' }, letterSpacing: -2, x: 70, y: 420, width: 900, height: 176, zIndex: 6, animation: { name: 'fadeInUp', duration: 800, delay: 260 }, editable: { content: true, fontSize: { type: 'range', min: 120, max: 168 } } },
      { id: 'hy4-br-title2', type: 'text', content: 'FORM 04', fontFamily: { $t: 'fonts.heading' }, fontSize: 150, fontWeight: '900', color: { $t: 'colors.ink' }, letterSpacing: -2, x: 70, y: 588, width: 900, height: 176, zIndex: 6, animation: { name: 'fadeInUp', duration: 800, delay: 360 }, editable: { content: true, fontSize: { type: 'range', min: 120, max: 168 } } },
      // 分隔粗线
      { id: 'hy4-br-rule', type: 'shape', shapeKind: 'rect', x: 70, y: 800, width: 940, height: 6, fill: { $t: 'colors.ink' }, zIndex: 6 },
      // 标注
      { id: 'hy4-br-meta', type: 'text', content: 'NO RULES / ONLY WEIGHT', fontFamily: { $t: 'fonts.note' }, fontSize: 26, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.8, letterSpacing: 5, x: 70, y: 838, width: 700, height: 36, zIndex: 8, animation: { name: 'slideInLeft', duration: 700, delay: 460 } },
      { id: 'hy4-br-hy', type: 'text', content: 'HY4 / BLOCK 04', fontFamily: { $t: 'fonts.note' }, fontSize: 22, color: { $t: 'colors.ink' }, opacity: 0.6, letterSpacing: 4, x: 720, y: 976, width: 300, height: 30, zIndex: 8 },
      { id: 'hy4-br-num', type: 'text', content: '04', fontFamily: { $t: 'fonts.heading' }, fontSize: 92, fontWeight: '900', color: { $t: 'colors.ink' }, opacity: 0.16, x: 800, y: 600, width: 200, height: 110, zIndex: 7 },
      { id: 'hy4-br-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1080, background: `url("${grain(300, 41, 0.5)}")`, opacity: 0.05, mixBlendMode: 'multiply', zIndex: 20 }
    ]
  }
]

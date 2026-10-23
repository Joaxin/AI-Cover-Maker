// src/core/templates/simple/trend-aura-gradient.ts
// 当红趋势批 → 归入「简约风」（simple） ｜ 7. 柔雾光晕（4:5）
// 迁移自 src/core/templates/trend/：模板内容、素材函数与外观保持不变，只改分类归属。
import type { Template } from '@/types/types'
import {SANS, HEI, SONG, MONO, grainSoft, SERIF, aura, grain} from '../_fx/trend'

export const trendAuraGradientTemplates: Template[] = [
  {
    id: 'trend-aura-gradient', name: '柔雾光晕卡片', version: '1.0.0', category: 'simple',
    tags: ['trend', 'aura', 'gradient', 'soft', 'calm', '4:5'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="108" height="135" viewBox="0 0 108 135"><rect width="108" height="135" fill="%23101014"/><circle cx="34" cy="40" r="34" fill="%238B5CF6" opacity="0.18"/><circle cx="34" cy="40" r="22" fill="%238B5CF6" opacity="0.24"/><circle cx="34" cy="40" r="12" fill="%238B5CF6" opacity="0.32"/><circle cx="82" cy="104" r="30" fill="%2322D3EE" opacity="0.2"/><rect x="24" y="60" width="60" height="6" fill="%23F5F3FF" opacity="0.85"/><rect x="24" y="74" width="38" height="6" fill="%23F5F3FF" opacity="0.5"/></svg>',
    tokens: {
      colors: {
        bg: { label: '底色', default: '#101014', options: ['#101014', '#F5F1E8', '#0B1120', '#1A1520'] },
        ink: { label: '文字', default: '#F5F3FF', options: ['#F5F3FF', '#1C1917', '#E2E8F0', '#111827'] },
        glowA: { label: '主光晕', default: '#8B5CF6', options: ['#8B5CF6', '#F59E0B', '#22D3EE', '#FB7185', '#38BDF8'] },
        glowB: { label: '副光晕', default: '#22D3EE', options: ['#22D3EE', '#A3E635', '#F472B6', '#38BDF8', '#FB7185'] }
      },
      fonts: { serif: { label: '标题衬线', default: SERIF, options: [SERIF, SONG, SANS] }, cjk: { label: '中文体', default: HEI, options: [HEI, SONG, MONO] } }
    },
    presets: [
      { name: '夜紫青雾', colors: { bg: '#101014', ink: '#F5F3FF', glowA: '#8B5CF6', glowB: '#22D3EE' } },
      { name: '纸面暖橘', colors: { bg: '#F5F1E8', ink: '#1C1917', glowA: '#F59E0B', glowB: '#FB7185' } },
      { name: '深海蓝雾', colors: { bg: '#0B1120', ink: '#E2E8F0', glowA: '#38BDF8', glowB: '#A3E635' } },
      { name: '暗房玫瑰', colors: { bg: '#1A1520', ink: '#F5F3FF', glowA: '#FB7185', glowB: '#F472B6' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      ...aura('ag-aura-a', 300, 330, 420, 'colors.glowA'),
      ...aura('ag-aura-b', 880, 1040, 380, 'colors.glowB'),
      { id: 'ag-bloom', type: 'overlay', x: 0, y: 0, width: 1080, height: 1350, background: 'radial-gradient(circle at 50% 8%, rgba(255,255,255,0.2), transparent 46%)', mixBlendMode: 'soft-light', zIndex: 2 },
      { id: 'ag-ring', type: 'shape', shapeKind: 'circle', x: 148, y: 178, width: 784, height: 784, fill: 'transparent', border: { width: 1, color: { $t: 'colors.ink' } }, opacity: 0.16, zIndex: 4, animation: { name: 'spinSlow', duration: 40000, iterationCount: 'infinite', easing: 'linear' } },
      { id: 'ag-kicker', type: 'text', content: 'A U R A   ·   第 09 期', fontFamily: { $t: 'fonts.serif' }, fontSize: 26, color: { $t: 'colors.ink' }, opacity: 0.62, letterSpacing: 10, textAlign: 'center', x: 140, y: 260, width: 800, height: 40, zIndex: 6, animation: { name: 'fadeIn', duration: 900 } },
      { id: 'ag-h1', type: 'text', content: 'Slow\nLight', fontFamily: { $t: 'fonts.serif' }, fontSize: 176, color: { $t: 'colors.ink' }, lineHeight: 0.98, textAlign: 'center', letterSpacing: -3, x: 100, y: 366, width: 880, height: 356, zIndex: 6, animation: { name: 'fadeInUp', duration: 1100 }, editable: { content: true, fontSize: { type: 'range', min: 120, max: 210 } } },
      { id: 'ag-cn', type: 'text', content: '把节奏调慢一格', fontFamily: { $t: 'fonts.cjk' }, fontSize: 44, color: { $t: 'colors.ink' }, letterSpacing: 8, textAlign: 'center', x: 140, y: 762, width: 800, height: 66, zIndex: 6, animation: { name: 'rise', duration: 1000, delay: 260 }, editable: { content: true } },
      { id: 'ag-body', type: 'text', content: '低饱和的光带从画面边缘渗进来，\n不解释内容，只负责情绪。', fontFamily: { $t: 'fonts.cjk' }, fontSize: 27, color: { $t: 'colors.ink' }, opacity: 0.62, lineHeight: 1.85, textAlign: 'center', x: 200, y: 856, width: 680, height: 108, zIndex: 6, animation: { name: 'fadeIn', duration: 1000, delay: 460 }, editable: { content: true } },
      { id: 'ag-pill', type: 'shape', shapeKind: 'rect', x: 396, y: 1036, width: 288, height: 84, fill: 'transparent', border: { width: 1, color: { $t: 'colors.ink' } }, borderRadius: 42, opacity: 0.85, zIndex: 6 },
      { id: 'ag-pill-t', type: 'text', content: '聆听这一束光', fontFamily: { $t: 'fonts.cjk' }, fontSize: 28, color: { $t: 'colors.ink' }, letterSpacing: 3, textAlign: 'center', lineHeight: 3, x: 396, y: 1036, width: 288, height: 84, zIndex: 7, editable: { content: true } },
      { id: 'ag-foot-l', type: 'text', content: 'MOOD / 2026.09', fontFamily: { $t: 'fonts.serif' }, fontSize: 22, color: { $t: 'colors.ink' }, opacity: 0.42, letterSpacing: 4, x: 140, y: 1200, width: 420, height: 32, zIndex: 6 },
      { id: 'ag-foot-r', type: 'text', content: 'SLOW LIGHT SERIES', fontFamily: { $t: 'fonts.serif' }, fontSize: 22, color: { $t: 'colors.ink' }, opacity: 0.42, letterSpacing: 4, textAlign: 'right', x: 520, y: 1200, width: 420, height: 32, zIndex: 6 },
      { id: 'ag-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1350, background: `url("${grainSoft(340, 13, 0.7)}")`, opacity: 0.1, mixBlendMode: 'overlay', zIndex: 9 }
    ]
  }
]

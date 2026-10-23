// src/core/templates/art/hy4-watercolor.ts —— 水彩晕染 Watercolor（4:5）
// 水彩语言：纸白底 + 多层低透明色团叠加 + 柔边高光 + 衬线标题。
// HY4 标记：id / 导出名 / tags 带 hy4，底部小注嵌入「HY4 · WASH NOTE」。
import type { Template } from '@/types/types'
import { HEI, MONO, SERIF, grain } from '../_fx/trend'

export const hy4WatercolorTemplates: Template[] = [
  {
    id: 'hy4-watercolor', name: '水彩晕染', version: '1.0.0', category: 'art',
    tags: ['hy4', 'art', 'watercolor', 'wash', 'soft', 'serif', '4:5'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="108" height="135" viewBox="0 0 108 135"><rect width="108" height="135" fill="%23FBF9F5"/><circle cx="34" cy="40" r="30" fill="%23F2A7A0" opacity="0.55"/><circle cx="72" cy="34" r="24" fill="%23A8C7E8" opacity="0.5"/><circle cx="52" cy="72" r="28" fill="%23F7D1A0" opacity="0.45"/><circle cx="26" cy="86" r="18" fill="%23B7D8C4" opacity="0.4"/><rect x="22" y="108" width="46" height="6" rx="3" fill="%233C3A38"/><rect x="22" y="120" width="28" height="4" rx="2" fill="%233C3A38" opacity="0.5"/></svg>',
    tokens: {
      colors: {
        bg: { label: '纸白', default: '#FBF9F5', options: ['#FBF9F5', '#F6F3EE', '#171A1D', '#F4F7F3'] },
        ink: { label: '墨色', default: '#3C3A38', options: ['#3C3A38', '#33312F', '#EFEAE3', '#2B332F'] },
        washA: { label: '晕染一', default: '#F2A7A0', options: ['#F2A7A0', '#E9B7C6', '#7FA6C9', '#C7B7E8'] },
        washB: { label: '晕染二', default: '#A8C7E8', options: ['#A8C7E8', '#9FD3D8', '#F0B49C', '#A8D5BA'] },
        washC: { label: '晕染三', default: '#F7D1A0', options: ['#F7D1A0', '#F5C97C', '#9EC5E8', '#E4D9A8'] }
      },
      fonts: { heading: { label: '标题', default: SERIF, options: [SERIF, HEI] }, note: { label: '小字', default: MONO, options: [MONO, HEI] } }
    },
    presets: [
      { name: '晨雾粉', colors: { bg: '#FBF9F5', ink: '#3C3A38', washA: '#F2A7A0', washB: '#A8C7E8', washC: '#F7D1A0' } },
      { name: '藕荷', colors: { bg: '#F6F3EE', ink: '#33312F', washA: '#E9B7C6', washB: '#9FD3D8', washC: '#F5C97C' } },
      { name: '夜色水彩', colors: { bg: '#171A1D', ink: '#EFEAE3', washA: '#7FA6C9', washB: '#F0B49C', washC: '#9EC5E8' } },
      { name: '薄绿', colors: { bg: '#F4F7F3', ink: '#2B332F', washA: '#C7B7E8', washB: '#A8D5BA', washC: '#E4D9A8' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      // 色团叠加（低透明度圆模拟水彩扩散）
      { id: 'hy4-wc-b1', group: 'hy4-wc-b', type: 'shape', shapeKind: 'circle', x: 60, y: 160, width: 560, height: 560, fill: { $t: 'colors.washA' }, opacity: 0.42, zIndex: 2, animation: { name: 'drift', duration: 13000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'hy4-wc-b2', group: 'hy4-wc-b', type: 'shape', shapeKind: 'circle', x: 430, y: 90, width: 500, height: 500, fill: { $t: 'colors.washB' }, opacity: 0.38, zIndex: 2, animation: { name: 'float', duration: 15000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'hy4-wc-b3', group: 'hy4-wc-b', type: 'shape', shapeKind: 'circle', x: 210, y: 470, width: 620, height: 620, fill: { $t: 'colors.washC' }, opacity: 0.34, zIndex: 3, animation: { name: 'drift', duration: 17000, delay: 500, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'hy4-wc-b4', group: 'hy4-wc-b', type: 'shape', shapeKind: 'circle', x: 700, y: 560, width: 380, height: 380, fill: { $t: 'colors.washA' }, opacity: 0.26, zIndex: 3 },
      { id: 'hy4-wc-b5', group: 'hy4-wc-b', type: 'shape', shapeKind: 'circle', x: 40, y: 760, width: 340, height: 340, fill: { $t: 'colors.washB' }, opacity: 0.24, zIndex: 3 },
      // 柔边高光
      { id: 'hy4-wc-hi', type: 'overlay', x: 0, y: 0, width: 1080, height: 1350, background: 'radial-gradient(circle at 42% 30%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 58%)', mixBlendMode: 'soft-light', zIndex: 4 },
      // 纸纹压边
      { id: 'hy4-wc-edge', type: 'shape', shapeKind: 'rect', x: 60, y: 60, width: 960, height: 1230, fill: 'transparent', border: { width: 1, color: { $t: 'colors.ink' } }, opacity: 0.18, zIndex: 6 },
      // 文字
      { id: 'hy4-wc-kicker', type: 'text', content: 'WATERCOLOR WASH / 水彩 · 第四辑', fontFamily: { $t: 'fonts.note' }, fontSize: 24, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.66, letterSpacing: 6, x: 120, y: 130, width: 840, height: 36, zIndex: 8, animation: { name: 'slideInLeft', duration: 700 } },
      { id: 'hy4-wc-title', type: 'text', content: '湿润的\n边界', fontFamily: { $t: 'fonts.heading' }, fontSize: 106, fontWeight: '700', color: { $t: 'colors.ink' }, lineHeight: 1.08, letterSpacing: 2, x: 120, y: 1010, width: 780, height: 240, zIndex: 8, animation: { name: 'fadeInUp', duration: 900, delay: 180 }, editable: { content: true, fontSize: { type: 'range', min: 86, max: 118 } } },
      { id: 'hy4-wc-sub', type: 'text', content: '颜色在水里相遇，才有了过渡。', fontFamily: { $t: 'fonts.heading' }, fontSize: 32, color: { $t: 'colors.ink' }, opacity: 0.78, letterSpacing: 2, x: 120, y: 1270, width: 600, height: 46, zIndex: 8, animation: { name: 'rise', duration: 800, delay: 380 }, editable: { content: true } },
      { id: 'hy4-wc-hy', type: 'text', content: 'HY4 · WASH NOTE', fontFamily: { $t: 'fonts.note' }, fontSize: 20, color: { $t: 'colors.ink' }, opacity: 0.42, letterSpacing: 5, x: 740, y: 1282, width: 280, height: 28, zIndex: 8 },
      { id: 'hy4-wc-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1350, background: `url("${grain(340, 31, 0.45)}")`, opacity: 0.06, mixBlendMode: 'multiply', zIndex: 20 }
    ]
  }
]

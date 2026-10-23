// src/core/templates/emotional/emotional.ts —— 治愈夕阳渐变
import type { Template } from '@/types/types'

// 高空软云（半透明白，任何预设下都协调）
const CLOUD_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 70"><path d="M28 58 Q 8 58 8 44 Q 8 30 26 32 Q 28 12 52 12 Q 70 12 76 26 Q 84 16 100 18 Q 122 20 122 38 Q 142 34 148 46 Q 154 58 136 58 Z" fill="white" opacity="0.5"/><path d="M150 40 Q 146 28 160 26 Q 168 18 182 24 Q 196 20 200 34 Q 212 38 206 48 L 156 48 Q 148 46 150 40 Z" fill="white" opacity="0.35"/></svg>'

// 归鸟一行（黑色半透明剪影）
const BIRDS_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 60"><g fill="none" stroke="%23000000" stroke-width="3" stroke-linecap="round" opacity="0.5"><path d="M10 30 Q 20 16 30 28 Q 40 16 50 30"/><path d="M80 18 Q 88 8 96 17 Q 104 8 112 18"/><path d="M150 36 Q 157 26 164 35 Q 171 26 178 36"/><path d="M205 20 Q 212 11 219 19 Q 226 11 233 20"/></g></svg>'

export const emotionalTemplates: Template[] = [
{
  id: 'emotional-sunset-healing', name: '治愈夕阳渐变', version: '1.1.0', category: 'emotional', tags: ['emotional', 'healing', 'sunset', 'gradient'],
  thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="%23fbbf24"/><stop offset="1" stop-color="%23f97316"/></linearGradient></defs><rect width="100" height="100" fill="url(%23g)"/><circle cx="50" cy="55" r="18" fill="%23fff7ed"/></svg>',
  tokens: {
    colors: {
      bg: { label: '天空', default: '#FBBF24', options: ['#FBBF24', '#F59E0B', '#F472B6', '#E879A0', '#64748B', '#94A3B8'] },
      primary: { label: '文字', default: '#7C2D12', options: ['#7C2D12', '#9A3412', '#831843', '#0F172A', '#450A0A'] },
      accent: { label: '暖阳', default: '#FFF7ED', options: ['#FFF7ED', '#FFFFFF', '#FDE68A', '#FBCFE8', '#E2E8F0', '#FFF1F2'] }
    },
    fonts: { heading: { label: '标题字体', default: "'PingFang SC', 'Microsoft YaHei', sans-serif", options: ["'PingFang SC', 'Microsoft YaHei', sans-serif", 'STKaiti, KaiTi, serif', 'Georgia, serif'] } }
  },
  presets: [
    { name: '暖橘落日', colors: { bg: '#FBBF24', primary: '#7C2D12', accent: '#FFF7ED' } },
    { name: '玫瑰暮霭', colors: { bg: '#E879A0', primary: '#831843', accent: '#FFF1F2' } },
    { name: '黛青薄暮', colors: { bg: '#94A3B8', primary: '#0F172A', accent: '#FDE68A' } },
    { name: '灰蓝晚晴', colors: { bg: '#64748B', primary: '#450A0A', accent: '#E2E8F0' } }
  ],
  canvas: {
    virtualWidth: 1000, virtualHeight: 1000, defaultWidth: 1000, defaultHeight: 1000, backgroundColor: { $t: 'colors.bg' },
    // 中性明暗渐变 + 地平线暖光带，叠加在任意天空色上都协调
    backgroundImage: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000"><defs><linearGradient id="shade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="%23000000" stop-opacity="0.14"/><stop offset="0.45" stop-color="%23ffffff" stop-opacity="0.12"/><stop offset="0.72" stop-color="%23000000" stop-opacity="0.18"/><stop offset="1" stop-color="%23000000" stop-opacity="0.42"/></linearGradient></defs><rect width="1000" height="1000" fill="url(%23shade)"/></svg>'
  },
  elements: [
    { id: 'sun', type: 'shape', shapeKind: 'circle', x: 370, y: 470, width: 260, height: 260, fill: { $t: 'colors.accent' }, zIndex: 1, shadow: { offsetX: 0, offsetY: 0, blur: 60, color: 'rgba(255,247,237,0.8)' }, animation: { name: 'shimmer', duration: 4000, iterationCount: 'infinite', easing: 'ease-in-out' } },
    { id: 'sun-halo', type: 'shape', shapeKind: 'circle', x: 320, y: 420, width: 360, height: 360, border: { color: { $t: 'colors.accent' }, width: 2, style: 'solid' }, opacity: 0.4, zIndex: 1, animation: { name: 'pulse', duration: 3200, iterationCount: 'infinite', easing: 'ease-in-out' } },
    { id: 'sea-band', type: 'overlay', x: 0, y: 700, width: 1000, height: 300, background: 'rgba(0,0,0,0.28)', zIndex: 2 },
    { id: 'sea-glint-1', group: 'sea-glint-', type: 'shape', shapeKind: 'rect', x: 430, y: 730, width: 140, height: 6, borderRadius: 3, fill: { $t: 'colors.accent' }, opacity: 0.55, zIndex: 3, animation: { name: 'float', duration: 5000, iterationCount: 'infinite', easing: 'ease-in-out' } },
    { id: 'sea-glint-2', group: 'sea-glint-', type: 'shape', shapeKind: 'rect', x: 380, y: 780, width: 240, height: 5, borderRadius: 2.5, fill: { $t: 'colors.accent' }, opacity: 0.35, zIndex: 3, animation: { name: 'float', duration: 6200, iterationCount: 'infinite', delay: 600, easing: 'ease-in-out' } },
    { id: 'sea-glint-3', group: 'sea-glint-', type: 'shape', shapeKind: 'rect', x: 450, y: 830, width: 100, height: 4, borderRadius: 2, fill: { $t: 'colors.accent' }, opacity: 0.22, zIndex: 3, animation: { name: 'float', duration: 7400, iterationCount: 'infinite', delay: 1200, easing: 'ease-in-out' } },
    { id: 'cloud-a', type: 'image', src: CLOUD_SVG, x: 70, y: 130, width: 260, height: 83, objectFit: 'contain', zIndex: 2, animation: { name: 'drift', duration: 14000, iterationCount: 'infinite', easing: 'ease-in-out' }, editable: { position: true, size: { type: 'scale' } } },
    { id: 'cloud-b', type: 'image', src: CLOUD_SVG, x: 660, y: 240, width: 200, height: 64, objectFit: 'contain', opacity: 0.8, zIndex: 2, animation: { name: 'drift', duration: 18000, iterationCount: 'infinite', delay: 2000, easing: 'ease-in-out' } },
    { id: 'birds', type: 'image', src: BIRDS_SVG, x: 560, y: 360, width: 260, height: 65, objectFit: 'contain', zIndex: 2, animation: { name: 'slideInLeft', duration: 1600, delay: 700 }, editable: { position: true, size: { type: 'scale' } } },
    { id: 'title-main', type: 'text', content: '日落是礼物', fontFamily: { $t: 'fonts.heading' }, fontSize: 100, fontWeight: '900', color: { $t: 'colors.primary' }, letterSpacing: 14, textAlign: 'center', x: 150, y: 150, width: 700, height: 150, zIndex: 4, animation: { name: 'inkReveal', duration: 1500 }, editable: { content: true, fontSize: { type: 'range', min: 64, max: 130 }, position: true } },
    { id: 'title-sub', type: 'text', content: '今天也辛苦了，晚风会替你卸下疲惫', fontFamily: { $t: 'fonts.heading' }, fontSize: 30, fontWeight: '500', color: { $t: 'colors.primary' }, letterSpacing: 4, textAlign: 'center', x: 200, y: 330, width: 600, height: 50, zIndex: 4, animation: { name: 'fadeInUp', duration: 900, delay: 600 }, editable: { content: true } },
    { id: 'footer-en', type: 'text', content: 'EVERY SUNSET IS A PROMISE OF TOMORROW.', fontFamily: 'Georgia, serif', fontSize: 17, fontWeight: '400', color: { $t: 'colors.accent' }, letterSpacing: 4, textAlign: 'center', x: 220, y: 900, width: 560, height: 30, zIndex: 4, opacity: 0.85, editable: { content: true } }
  ]
}
]

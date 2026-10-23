// src/core/templates/emotional/emotional-neon.ts —— 都市霓虹孤独
import type { Template } from '@/types/types'

// 霓虹灯管招牌框
const NEON_FRAME_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="760" height="320" viewBox="0 0 760 320"><rect x="8" y="8" width="744" height="304" rx="26" fill="none" stroke="%23f0abfc" stroke-width="4" opacity="0.9"/><rect x="8" y="8" width="744" height="304" rx="26" fill="none" stroke="%23f0abfc" stroke-width="12" opacity="0.18"/><path d="M40 40 Q 90 24 140 40" fill="none" stroke="%2367e8f9" stroke-width="3" opacity="0.8"/><path d="M620 280 Q 670 264 720 280" fill="none" stroke="%23fde047" stroke-width="3" opacity="0.8"/></svg>'
// 月牙
const MOON_SLIVER_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="140" height="140" viewBox="0 0 140 140"><path d="M92 14 A 56 56 0 1 0 126 92 A 44 44 0 0 1 92 14 Z" fill="%23e2e8f0" opacity="0.9"/><circle cx="40" cy="46" r="4" fill="%23cbd5e1" opacity="0.6"/><circle cx="30" cy="80" r="3" fill="%23cbd5e1" opacity="0.5"/></svg>'
// 电线与栖鸟
const WIRE_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="900" height="90" viewBox="0 0 900 90"><path d="M0 30 Q 240 66 460 40 T 900 34" fill="none" stroke="%233f3f5a" stroke-width="3"/><path d="M300 47 l0 14" stroke="%233f3f5a" stroke-width="3"/><g fill="%23181828" stroke="%2367e8f9" stroke-width="1.5" opacity="0.95"><path d="M288 30 q 12 -14 24 0 q -4 12 -12 12 q -12 4 -12 -12 z"/><circle cx="312" cy="20" r="4"/></g><g fill="%23181828" stroke="%23f0abfc" stroke-width="1.5" opacity="0.95"><path d="M340 36 q 12 -14 24 0 q -4 12 -12 12 q -12 4 -12 -12 z"/><circle cx="364" cy="26" r="4"/></g></svg>'
// 细雨丝
const RAIN_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000"><g stroke="%2394a3b8" stroke-width="1.2" opacity="0.16"><line x1="80" y1="40" x2="66" y2="120"/><line x1="220" y1="120" x2="206" y2="200"/><line x1="360" y1="30" x2="346" y2="110"/><line x1="520" y1="180" x2="506" y2="260"/><line x1="700" y1="60" x2="686" y2="140"/><line x1="850" y1="240" x2="836" y2="320"/><line x1="150" y1="420" x2="136" y2="500"/><line x1="620" y1="380" x2="606" y2="460"/><line x1="920" y1="480" x2="906" y2="560"/></g></svg>'

export const emotionalNeonTemplate: Template = {
  id: 'emotional-city-neon', name: '城市霓虹与孤独', version: '1.1.0', category: 'emotional', tags: ['emotional', 'city', 'neon', 'lonely', 'night'],
  thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%230a0a12"/><rect x="20" y="45" width="14" height="45" fill="%23181828"/><rect x="42" y="30" width="16" height="60" fill="%2320203a"/><rect x="66" y="52" width="12" height="38" fill="%23181828"/><rect x="24" y="52" width="3" height="3" fill="%23f0abfc"/><rect x="47" y="40" width="3" height="3" fill="%23fde047"/><rect x="70" y="60" width="3" height="3" fill="%2367e8f9"/></svg>',
  tokens: {
    colors: {
      bg: { label: '夜幕', default: '#0A0A12', options: ['#0A0A12', '#0F0F1A', '#05050A', '#0C1220', '#020617'] },
      primary: { label: '霓虹粉', default: '#F0ABFC', options: ['#F0ABFC', '#E879F9', '#F5D0FE', '#22D3EE', '#A5F3FC'] },
      accent: { label: '路灯黄', default: '#FDE047', options: ['#FDE047', '#FACC15', '#FEF08A', '#FB923C', '#818CF8'] },
      extra: { label: '橱窗青', default: '#67E8F9', options: ['#67E8F9', '#22D3EE', '#A5F3FC', '#F472B6', '#F0ABFC'] }
    },
    fonts: { heading: { label: '标题字体', default: "'Microsoft YaHei', 'PingFang SC', sans-serif", options: ["'Microsoft YaHei', 'PingFang SC', sans-serif", "'Courier New', monospace", 'Impact, sans-serif'] } }
  },
  presets: [
    { name: '霓虹粉紫', colors: { bg: '#0A0A12', primary: '#F0ABFC', accent: '#FDE047', extra: '#67E8F9' } },
    { name: '青橙夜行', colors: { bg: '#0C1220', primary: '#22D3EE', accent: '#FB923C', extra: '#F472B6' } },
    { name: '冰蓝寂夜', colors: { bg: '#020617', primary: '#A5F3FC', accent: '#818CF8', extra: '#F0ABFC' } },
    { name: '粉金夜窗', colors: { bg: '#0F0F1A', primary: '#E879F9', accent: '#FACC15', extra: '#A5F3FC' } }
  ],
  canvas: {
    virtualWidth: 1000, virtualHeight: 1000, defaultWidth: 1000, defaultHeight: 1000, backgroundColor: { $t: 'colors.bg' },
    backgroundImage: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000"><rect x="60" y="560" width="130" height="440" fill="%23181828"/><rect x="230" y="470" width="160" height="530" fill="%2320203a"/><rect x="430" y="600" width="120" height="400" fill="%2315152a"/><rect x="590" y="430" width="170" height="570" fill="%231e1e38"/><rect x="800" y="540" width="140" height="460" fill="%23181828"/><g fill="%23fde047" opacity="0.85"><rect x="90" y="600" width="10" height="10"/><rect x="130" y="660" width="10" height="10"/><rect x="260" y="510" width="10" height="10"/><rect x="330" y="580" width="10" height="10"/><rect x="620" y="470" width="10" height="10"/><rect x="700" y="540" width="10" height="10"/><rect x="840" y="590" width="10" height="10"/></g><g fill="%2367e8f9" opacity="0.7"><rect x="150" y="620" width="10" height="10"/><rect x="290" y="640" width="10" height="10"/><rect x="660" y="620" width="10" height="10"/><rect x="880" y="660" width="10" height="10"/></g></svg>'
  },
  elements: [
    { id: 'rain-layer', type: 'image', src: RAIN_SVG, objectFit: 'contain', x: 0, y: 0, width: 1000, height: 1000, zIndex: 0, animation: { name: 'drift', duration: 18000, iterationCount: 'infinite' } },
    { id: 'moon', type: 'image', src: MOON_SLIVER_SVG, objectFit: 'contain', x: 810, y: 60, width: 120, height: 120, opacity: 0.85, zIndex: 1, animation: { name: 'float', duration: 9000, iterationCount: 'infinite' }, editable: { position: true, size: { type: 'scale' } } },
    { id: 'wire', type: 'image', src: WIRE_SVG, objectFit: 'contain', x: 50, y: 470, width: 900, height: 90, zIndex: 2, animation: { name: 'fadeIn', duration: 1200, delay: 500 } },
    { id: 'win-1', group: 'win-', type: 'shape', shapeKind: 'rect', x: 265, y: 515, width: 10, height: 10, fill: { $t: 'colors.accent' }, zIndex: 2, animation: { name: 'pulse', duration: 2100, iterationCount: 'infinite' } },
    { id: 'win-2', group: 'win-', type: 'shape', shapeKind: 'rect', x: 625, y: 475, width: 10, height: 10, fill: { $t: 'colors.accent' }, zIndex: 2, animation: { name: 'pulse', duration: 1700, delay: 600, iterationCount: 'infinite' } },
    { id: 'win-3', group: 'win-', type: 'shape', shapeKind: 'rect', x: 665, y: 625, width: 10, height: 10, fill: { $t: 'colors.extra' }, zIndex: 2, animation: { name: 'pulse', duration: 2600, delay: 1100, iterationCount: 'infinite' } },
    { id: 'win-4', group: 'win-', type: 'shape', shapeKind: 'rect', x: 95, y: 605, width: 10, height: 10, fill: { $t: 'colors.extra' }, zIndex: 2, animation: { name: 'pulse', duration: 1900, delay: 350, iterationCount: 'infinite' } },
    { id: 'neon-frame', type: 'image', src: NEON_FRAME_SVG, objectFit: 'contain', x: 120, y: 70, width: 760, height: 320, zIndex: 2, animation: { name: 'shimmer', duration: 3400, iterationCount: 'infinite' }, editable: { position: true, size: { type: 'scale' } } },
    { id: 'neon-line', type: 'shape', shapeKind: 'line', x: 150, y: 250, width: 700, height: 3, border: { color: { $t: 'colors.primary' }, width: 3 }, opacity: 0.5, zIndex: 2 },
    { id: 'title-main', type: 'text', content: '人潮汹涌\n我独自亮着', fontFamily: { $t: 'fonts.heading' }, fontSize: 84, fontWeight: '900', color: { $t: 'colors.primary' }, lineHeight: 1.5, letterSpacing: 8, textAlign: 'center', x: 150, y: 100, width: 700, height: 260, zIndex: 3, shadow: { color: 'rgba(240,171,252,0.55)', blur: 32, offsetX: 0, offsetY: 0 }, animation: { name: 'glow', duration: 2000, iterationCount: 'infinite' }, editable: { content: true, fontSize: { type: 'range', min: 56, max: 108 }, position: true } },
    { id: 'title-sub', type: 'text', content: '孤独不是没人陪，是心里有盏灯没人看见', fontFamily: { $t: 'fonts.heading' }, fontSize: 27, fontWeight: '400', color: { $t: 'colors.accent' }, letterSpacing: 3, textAlign: 'center', x: 170, y: 380, width: 660, height: 45, zIndex: 3, animation: { name: 'inkReveal', duration: 1500, delay: 400 }, editable: { content: true } },
    { id: 'ticker', type: 'text', content: 'LAST TRAIN 23:47 · CITY LIGHTS · ALONE TOGETHER', fontFamily: "'Courier New', monospace", fontSize: 16, fontWeight: '600', color: { $t: 'colors.extra' }, letterSpacing: 4, textAlign: 'center', x: 200, y: 440, width: 600, height: 30, zIndex: 3, animation: { name: 'pulse', duration: 3000, iterationCount: 'infinite' }, editable: { content: true } }
  ]
}

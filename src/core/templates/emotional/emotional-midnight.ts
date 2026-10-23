// src/core/templates/emotional/emotional-midnight.ts —— 深夜蓝致郁系
import type { Template } from '@/types/types'

// 天际线剪影（凌晨的城市仍未睡）
const SKYLINE_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="220" viewBox="0 0 1000 220"><g fill="%23020617" opacity="0.9"><rect x="30" y="90" width="90" height="130"/><rect x="150" y="50" width="70" height="170"/><rect x="250" y="120" width="110" height="100"/><rect x="390" y="70" width="60" height="150"/><rect x="480" y="130" width="120" height="90"/><rect x="630" y="40" width="80" height="180"/><rect x="740" y="110" width="90" height="110"/><rect x="860" y="70" width="110" height="150"/></g><g fill="%23fde68a" opacity="0.8"><rect x="52" y="112" width="8" height="8"/><rect x="76" y="140" width="8" height="8"/><rect x="168" y="76" width="8" height="8"/><rect x="192" y="120" width="8" height="8"/><rect x="404" y="96" width="8" height="8"/><rect x="652" y="66" width="8" height="8"/><rect x="676" y="110" width="8" height="8"/><rect x="888" y="96" width="8" height="8"/><rect x="920" y="140" width="8" height="8"/></g></svg>'
// 流星
const COMET_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="260" height="90" viewBox="0 0 260 90"><path d="M6 80 L240 12" stroke="%23e2e8f0" stroke-width="3" stroke-linecap="round" opacity="0.85"/><path d="M70 62 L240 12" stroke="%2394a3b8" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/><circle cx="243" cy="11" r="5" fill="%23f8fafc"/></svg>'
// 薄云
const NIGHT_CLOUD_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="420" height="70" viewBox="0 0 420 70"><g fill="%23334155" opacity="0.8"><ellipse cx="120" cy="42" rx="110" ry="18"/><ellipse cx="240" cy="32" rx="90" ry="15"/><ellipse cx="330" cy="45" rx="70" ry="13"/></g></svg>'

export const emotionalMidnightTemplate: Template = {
  id: 'emotional-midnight-blue', name: '深夜三时的蓝', version: '1.1.0', category: 'emotional', tags: ['emotional', 'midnight', 'melancholy', 'moon'],
  thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%230f172a"/><circle cx="70" cy="28" r="12" fill="%23e2e8f0"/><circle cx="64" cy="24" r="10" fill="%230f172a"/><rect x="20" y="60" width="40" height="3" fill="%23475569"/></svg>',
  tokens: {
    colors: {
      bg: { label: '夜蓝', default: '#0F172A', options: ['#0F172A', '#1E293B', '#020617', '#2E1065', '#083344'] },
      primary: { label: '月白', default: '#E2E8F0', options: ['#E2E8F0', '#F8FAFC', '#CBD5E1', '#E9D5FF', '#A5F3FC'] },
      accent: { label: '幽蓝', default: '#64748B', options: ['#64748B', '#475569', '#94A3B8', '#A78BFA', '#22D3EE'] }
    },
    fonts: { heading: { label: '标题字体', default: 'STSong, Songti SC, SimSun, serif', options: ['STSong, Songti SC, SimSun, serif', "'PingFang SC', 'Microsoft YaHei', sans-serif", 'Georgia, serif'] } }
  },
  presets: [
    { name: '夜蓝月白', colors: { bg: '#0F172A', primary: '#E2E8F0', accent: '#64748B' } },
    { name: '墨紫星沉', colors: { bg: '#2E1065', primary: '#E9D5FF', accent: '#A78BFA' } },
    { name: '深海微光', colors: { bg: '#083344', primary: '#A5F3FC', accent: '#22D3EE' } },
    { name: '灰蓝静夜', colors: { bg: '#1E293B', primary: '#CBD5E1', accent: '#94A3B8' } }
  ],
  canvas: {
    virtualWidth: 1000, virtualHeight: 1000, defaultWidth: 1000, defaultHeight: 1000, backgroundColor: { $t: 'colors.bg' },
    backgroundImage: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000"><g fill="%23e2e8f0" opacity="0.7"><circle cx="120" cy="140" r="2.5"/><circle cx="300" cy="90" r="1.8"/><circle cx="480" cy="180" r="2.2"/><circle cx="880" cy="120" r="2"/><circle cx="760" cy="300" r="1.6"/><circle cx="180" cy="380" r="1.8"/><circle cx="620" cy="80" r="2.4"/><circle cx="920" cy="420" r="1.7"/><circle cx="80" cy="560" r="2"/><circle cx="420" cy="420" r="1.5"/></g></svg>'
  },
  elements: [
    { id: 'moon-halo', type: 'shape', shapeKind: 'circle', x: 640, y: 110, width: 190, height: 190, border: { color: { $t: 'colors.accent' }, width: 1, style: 'dashed' }, opacity: 0.5, zIndex: 0, animation: { name: 'pulse', duration: 3600, iterationCount: 'infinite' } },
    { id: 'moon', type: 'shape', shapeKind: 'circle', x: 660, y: 130, width: 150, height: 150, fill: { $t: 'colors.primary' }, zIndex: 1, animation: { name: 'glow', duration: 2400, iterationCount: 'infinite' } },
    { id: 'moon-mask', type: 'shape', shapeKind: 'circle', x: 630, y: 105, width: 140, height: 140, fill: { $t: 'colors.bg' }, zIndex: 2 },
    { id: 'star-1', group: 'star-', type: 'shape', shapeKind: 'circle', x: 150, y: 120, width: 8, height: 8, fill: { $t: 'colors.primary' }, zIndex: 1, animation: { name: 'pulse', duration: 2200, delay: 0, iterationCount: 'infinite' } },
    { id: 'star-2', group: 'star-', type: 'shape', shapeKind: 'circle', x: 340, y: 70, width: 6, height: 6, fill: { $t: 'colors.primary' }, zIndex: 1, animation: { name: 'pulse', duration: 2600, delay: 500, iterationCount: 'infinite' } },
    { id: 'star-3', group: 'star-', type: 'shape', shapeKind: 'circle', x: 500, y: 200, width: 7, height: 7, fill: { $t: 'colors.accent' }, zIndex: 1, animation: { name: 'pulse', duration: 2000, delay: 900, iterationCount: 'infinite' } },
    { id: 'star-4', group: 'star-', type: 'shape', shapeKind: 'circle', x: 240, y: 260, width: 5, height: 5, fill: { $t: 'colors.accent' }, zIndex: 1, animation: { name: 'pulse', duration: 3000, delay: 1400, iterationCount: 'infinite' } },
    { id: 'comet', type: 'image', src: COMET_SVG, objectFit: 'contain', x: 430, y: 60, width: 260, height: 90, zIndex: 1, animation: { name: 'slideInRight', duration: 1800, delay: 400 }, editable: { position: true, size: { type: 'scale' } } },
    { id: 'cloud-1', type: 'image', src: NIGHT_CLOUD_SVG, objectFit: 'contain', x: 60, y: 300, width: 420, height: 70, opacity: 0.7, zIndex: 1, animation: { name: 'drift', duration: 24000, iterationCount: 'infinite' } },
    { id: 'cloud-2', type: 'image', src: NIGHT_CLOUD_SVG, objectFit: 'contain', x: 520, y: 480, width: 340, height: 60, opacity: 0.5, zIndex: 1, animation: { name: 'drift', duration: 30000, delay: 1500, iterationCount: 'infinite' } },
    { id: 'skyline', type: 'image', src: SKYLINE_SVG, objectFit: 'contain', x: 0, y: 780, width: 1000, height: 220, zIndex: 2, animation: { name: 'fadeIn', duration: 1400, delay: 300 }, editable: { position: true, size: { type: 'scale' } } },
    { id: 'title-main', type: 'text', content: '有些话\n只说给凌晨三点听', fontFamily: { $t: 'fonts.heading' }, fontSize: 62, fontWeight: '700', color: { $t: 'colors.primary' }, lineHeight: 1.6, x: 130, y: 340, width: 640, height: 320, zIndex: 3, animation: { name: 'inkReveal', duration: 1600 }, editable: { content: true, fontSize: { type: 'range', min: 44, max: 80 }, position: true } },
    { id: 'divider', type: 'shape', shapeKind: 'line', x: 130, y: 700, width: 260, height: 2, border: { color: { $t: 'colors.accent' }, width: 2 }, zIndex: 3, animation: { name: 'fadeIn', duration: 900, delay: 1000 } },
    { id: 'title-sub', type: 'text', content: '失眠的人，都替月亮值过班', fontFamily: { $t: 'fonts.heading' }, fontSize: 26, fontWeight: '400', color: { $t: 'colors.accent' }, letterSpacing: 5, x: 130, y: 730, width: 600, height: 45, zIndex: 3, animation: { name: 'fadeInUp', duration: 1100, delay: 1200 }, editable: { content: true } },
    { id: 'footer-en', type: 'text', content: '3:00 AM · DEAR MIDNIGHT', fontFamily: 'Georgia, serif', fontSize: 15, fontWeight: '400', color: { $t: 'colors.accent' }, letterSpacing: 8, x: 130, y: 880, width: 400, height: 30, zIndex: 3, opacity: 0.75, animation: { name: 'fadeIn', duration: 1000, delay: 1800 }, editable: { content: true } }
  ]
}

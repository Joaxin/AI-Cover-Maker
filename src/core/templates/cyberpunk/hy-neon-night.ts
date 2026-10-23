// src/core/templates/cyberpunk/hy-neon-night.ts
// HY 系列 · 霓虹夜城（9:16）｜ 对标 AI 生成图像里电影感的赛博夜景
import type { Template } from '@/types/types'
import {SANS, HEI, MONO, starfield, grainSoft, grain} from '../_fx/trend'

export const hyNeonNightTemplates: Template[] = [
  {
    id: 'hy-neon-night', name: '霓虹夜城', version: '1.0.0', category: 'cyberpunk',
    tags: ['hy', 'neon', 'night', 'city', 'glow', '9:16'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="178" viewBox="0 0 100 178"><rect width="100" height="178" fill="%230A0E1A"/><circle cx="28" cy="34" r="16" fill="%23FF2D9B" opacity="0.5"/><circle cx="74" cy="60" r="12" fill="%2322D3EE" opacity="0.5"/><rect x="0" y="120" width="100" height="3" fill="%2322D3EE" opacity="0.6"/><rect x="0" y="132" width="100" height="2" fill="%23FF2D9B" opacity="0.5"/><rect x="0" y="144" width="100" height="2" fill="%2322D3EE" opacity="0.35"/><text x="8" y="172" font-family="Helvetica" font-size="16" fill="%23EAF6FF">夜</text></svg>',
    tokens: {
      colors: {
        bg: { label: '夜底', default: '#0A0E1A', options: ['#0A0E1A', '#0B1020', '#120A18', '#0A1410'] },
        ink: { label: '字', default: '#EAF6FF', options: ['#EAF6FF', '#F0F6FF', '#F2EAFE', '#E6FBF4'] },
        neonA: { label: '霓虹A', default: '#FF2D9B', options: ['#FF2D9B', '#F43F5E', '#FB7185', '#EC4899'] },
        neonB: { label: '霓虹B', default: '#22D3EE', options: ['#22D3EE', '#38BDF8', '#2DD4BF', '#0EA5E9'] },
        glow: { label: '辉光', default: '#7C3AED', options: ['#7C3AED', '#8B5CF6', '#A855F7', '#6366F1'] }
      },
      fonts: {
        display: { label: '英文', default: SANS, options: [SANS, MONO] },
        cjk: { label: '中文', default: HEI, options: [HEI, SANS] },
        mono: { label: '等宽', default: MONO, options: [MONO, SANS] }
      }
    },
    presets: [
      { name: '桃红冰蓝', colors: { bg: '#0A0E1A', ink: '#EAF6FF', neonA: '#FF2D9B', neonB: '#22D3EE', glow: '#7C3AED' } },
      { name: '玫红天蓝', colors: { bg: '#0B1020', ink: '#F0F6FF', neonA: '#F43F5E', neonB: '#38BDF8', glow: '#8B5CF6' } },
      { name: '酒红薄荷', colors: { bg: '#120A18', ink: '#F2EAFE', neonA: '#FB7185', neonB: '#2DD4BF', glow: '#A855F7' } },
      { name: '暗夜青绿', colors: { bg: '#0A1410', ink: '#E6FBF4', neonA: '#EC4899', neonB: '#0EA5E9', glow: '#6366F1' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1920, defaultWidth: 1080, defaultHeight: 1920, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      // 星点
      { id: 'nn-stars', type: 'overlay', x: 0, y: 0, width: 1080, height: 1920, background: `url("${starfield(1080, 1920, 90, '%23ffffff', 17)}")`, opacity: 0.4, zIndex: 1 },
      // 弥散光晕
      { id: 'nn-g1', type: 'shape', shapeKind: 'circle', x: -160, y: 200, width: 760, height: 760, fill: { $t: 'colors.neonA' }, opacity: 0.22, shadow: { offsetX: 0, offsetY: 0, blur: 80, color: 'rgba(255,45,155,0.45)' }, zIndex: 2, animation: { name: 'float', duration: 8400, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'nn-g2', type: 'shape', shapeKind: 'circle', x: 780, y: 980, width: 820, height: 820, fill: { $t: 'colors.neonB' }, opacity: 0.18, shadow: { offsetX: 0, offsetY: 0, blur: 80, color: 'rgba(34,211,238,0.4)' }, zIndex: 2, animation: { name: 'drift', duration: 9600, iterationCount: 'infinite', easing: 'ease-in-out' } },
      // 光轨
      { id: 'nn-t1', group: 'nn-t', type: 'shape', shapeKind: 'line', x: 0, y: 640, width: 1080, height: 3, fill: { $t: 'colors.neonA' }, opacity: 0.5, rotation: 8, shadow: { offsetX: 0, offsetY: 0, blur: 30, color: 'rgba(255,45,155,0.55)' }, zIndex: 3 },
      { id: 'nn-t2', group: 'nn-t', type: 'shape', shapeKind: 'line', x: 0, y: 760, width: 1080, height: 2, fill: { $t: 'colors.neonB' }, opacity: 0.4, rotation: 8, shadow: { offsetX: 0, offsetY: 0, blur: 26, color: 'rgba(34,211,238,0.5)' }, zIndex: 3 },
      { id: 'nn-t3', group: 'nn-t', type: 'shape', shapeKind: 'line', x: 0, y: 520, width: 1080, height: 2, fill: { $t: 'colors.neonB' }, opacity: 0.3, rotation: 8, zIndex: 3 },
      // 文字
      { id: 'nn-meta', type: 'text', content: "35.6895°N 139.6917°E", fontFamily: { $t: 'fonts.mono' }, fontSize: 28, color: { $t: 'colors.ink' }, opacity: 0.8, letterSpacing: 4, x: 90, y: 300, width: 900, height: 36, zIndex: 6, animation: { name: 'fadeIn', duration: 600 }, editable: { content: true } },
      { id: 'nn-ghost', type: 'text', content: '霓虹夜行', fontFamily: { $t: 'fonts.cjk' }, fontSize: 150, fontWeight: '800', color: { $t: 'colors.neonB' }, opacity: 0.4, x: 110, y: 780, width: 900, height: 230, zIndex: 5 },
      { id: 'nn-title', type: 'text', content: '霓虹夜行', fontFamily: { $t: 'fonts.cjk' }, fontSize: 150, fontWeight: '800', color: { $t: 'colors.ink' }, x: 90, y: 760, width: 900, height: 230, zIndex: 6, shadow: { offsetX: 0, offsetY: 0, blur: 36, color: 'rgba(255,45,155,0.5)' }, animation: { name: 'fadeInUp', duration: 880, delay: 160 }, editable: { content: true, fontSize: { type: 'range', min: 110, max: 168 } } },
      // 底部信息条
      { id: 'nn-bar', type: 'shape', shapeKind: 'rect', x: 90, y: 1620, width: 900, height: 160, fill: { $t: 'colors.ink' }, opacity: 0.08, borderRadius: 24, border: { width: 1, color: { $t: 'colors.neonB' } }, zIndex: 4, animation: { name: 'fadeInUp', duration: 800, delay: 320 } },
      { id: 'nn-bt1', type: 'text', content: '今夜不眠', fontFamily: { $t: 'fonts.cjk' }, fontSize: 38, fontWeight: '700', color: { $t: 'colors.ink' }, x: 140, y: 1650, width: 800, height: 50, zIndex: 6, animation: { name: 'fadeIn', duration: 700, delay: 400 }, editable: { content: true } },
      { id: 'nn-bt2', type: 'text', content: '霓虹是这座城的心跳。', fontFamily: { $t: 'fonts.cjk' }, fontSize: 27, color: { $t: 'colors.ink' }, opacity: 0.72, x: 140, y: 1712, width: 800, height: 40, zIndex: 6, animation: { name: 'fadeIn', duration: 700, delay: 460 }, editable: { content: true } },
      { id: 'nn-foot', type: 'text', content: 'STUDIO HY · NEO TOKYO', fontFamily: { $t: 'fonts.mono' }, fontSize: 22, color: { $t: 'colors.ink' }, opacity: 0.6, letterSpacing: 3, x: 90, y: 1840, width: 900, height: 30, zIndex: 6, animation: { name: 'fadeIn', duration: 700, delay: 520 }, editable: { content: true } },
      { id: 'nn-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1920, background: `url("${grainSoft(320, 9, 0.5)}")`, opacity: 0.04, mixBlendMode: 'multiply', zIndex: 9 }
    ]
  }
]

// src/core/templates/scifi/hy-aurora-flow.ts
// HY 系列 · 极光流纹理（9:16）｜ 对标 AI 生成图像里的高级 aurora gradient
import type { Template } from '@/types/types'
import {SANS, HEI, MONO, starfield, grainSoft, grain} from '../_fx/trend'

export const hyAuroraFlowTemplates: Template[] = [
  {
    id: 'hy-aurora-flow', name: '极光流纹理', version: '1.0.0', category: 'scifi',
    tags: ['hy', 'aurora', 'gradient', 'flow', 'dark', '9:16'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="178" viewBox="0 0 100 178"><rect width="100" height="178" fill="%23070B14"/><path d="M0 50 Q30 30 55 52 T100 48 V80 Q60 70 30 86 T0 80 Z" fill="%232DD4BF" opacity="0.6"/><path d="M0 90 Q35 70 65 92 T100 88 V118 Q60 108 30 122 T0 116 Z" fill="%236366F1" opacity="0.55"/><path d="M0 132 Q30 116 60 134 T100 128 V160 Q60 150 30 162 T0 158 Z" fill="%23EC4899" opacity="0.45"/><circle cx="80" cy="24" r="1.4" fill="%23ffffff"/><circle cx="20" cy="40" r="1.2" fill="%23ffffff"/><circle cx="64" cy="14" r="1" fill="%23ffffff"/></svg>',
    tokens: {
      colors: {
        bg: { label: '底色', default: '#070B14', options: ['#070B14', '#0A0E1A', '#0B1020', '#1A0E1A'] },
        ink: { label: '文字', default: '#EAF2FF', options: ['#EAF2FF', '#F2EAFE', '#E6FBF4', '#F0E6F2'] },
        aurora1: { label: '极光1', default: '#2DD4BF', options: ['#2DD4BF', '#34D399', '#22D3EE', '#5EEAD4'] },
        aurora2: { label: '极光2', default: '#6366F1', options: ['#6366F1', '#818CF8', '#7C3AED', '#A855F7'] },
        aurora3: { label: '极光3', default: '#EC4899', options: ['#EC4899', '#F472B6', '#F43F5E', '#FB7185'] }
      },
      fonts: {
        display: { label: '英文', default: SANS, options: [SANS, MONO] },
        cjk: { label: '中文', default: HEI, options: [HEI, SANS] },
        mono: { label: '等宽', default: MONO, options: [MONO, SANS] }
      }
    },
    presets: [
      { name: '青靛粉', colors: { bg: '#070B14', ink: '#EAF2FF', aurora1: '#2DD4BF', aurora2: '#6366F1', aurora3: '#EC4899' } },
      { name: '翠蓝紫', colors: { bg: '#0A0E1A', ink: '#F2EAFE', aurora1: '#34D399', aurora2: '#818CF8', aurora3: '#A855F7' } },
      { name: '冰青玫', colors: { bg: '#0B1020', ink: '#E6FBF4', aurora1: '#22D3EE', aurora2: '#7C3AED', aurora3: '#F43F5E' } },
      { name: '酒红极光', colors: { bg: '#1A0E1A', ink: '#F0E6F2', aurora1: '#5EEAD4', aurora2: '#A855F7', aurora3: '#FB7185' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1920, defaultWidth: 1080, defaultHeight: 1920, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      // 星点
      { id: 'af-stars', type: 'overlay', x: 0, y: 0, width: 1080, height: 1920, background: `url("${starfield(1080, 1920, 140, '%23ffffff', 23)}")`, opacity: 0.5, zIndex: 1 },
      // 极光带（径向渐变 + screen 混合）
      { id: 'af-a1', group: 'af-a', type: 'overlay', x: 0, y: 200, width: 1080, height: 760, background: 'radial-gradient(60% 50% at 30% 40%, rgba(45,212,191,0.55) 0%, rgba(45,212,191,0) 70%)', mixBlendMode: 'screen', opacity: 0.9, zIndex: 2, animation: { name: 'gradientPan', duration: 12000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'af-a2', group: 'af-a', type: 'overlay', x: 0, y: 520, width: 1080, height: 820, background: 'radial-gradient(55% 45% at 65% 50%, rgba(99,102,241,0.5) 0%, rgba(99,102,241,0) 70%)', mixBlendMode: 'screen', opacity: 0.9, zIndex: 2, animation: { name: 'gradientPan', duration: 14000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'af-a3', group: 'af-a', type: 'overlay', x: 0, y: 320, width: 1080, height: 760, background: 'radial-gradient(50% 40% at 50% 30%, rgba(236,72,153,0.4) 0%, rgba(236,72,153,0) 70%)', mixBlendMode: 'screen', opacity: 0.85, zIndex: 2 },
      // 光带（实体）
      { id: 'af-b1', type: 'shape', shapeKind: 'rect', x: -100, y: 420, width: 1500, height: 120, fill: { $t: 'colors.aurora1' }, opacity: 0.25, rotation: -18, shadow: { offsetX: 0, offsetY: 0, blur: 60, color: 'rgba(45,212,191,0.4)' }, zIndex: 3, animation: { name: 'float', duration: 8000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'af-b2', type: 'shape', shapeKind: 'rect', x: -100, y: 680, width: 1500, height: 90, fill: { $t: 'colors.aurora2' }, opacity: 0.2, rotation: -18, shadow: { offsetX: 0, offsetY: 0, blur: 50, color: 'rgba(99,102,241,0.4)' }, zIndex: 3, animation: { name: 'drift', duration: 9000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      // 文字
      { id: 'af-kicker', type: 'text', content: 'AURORA / NORTH 68°', fontFamily: { $t: 'fonts.mono' }, fontSize: 28, fontWeight: '600', color: { $t: 'colors.ink' }, opacity: 0.85, letterSpacing: 6, x: 90, y: 160, width: 900, height: 38, zIndex: 6, animation: { name: 'fadeIn', duration: 600 }, editable: { content: true } },
      { id: 'af-title', type: 'text', content: '极光之下', fontFamily: { $t: 'fonts.cjk' }, fontSize: 130, fontWeight: '800', color: { $t: 'colors.ink' }, x: 90, y: 820, width: 900, height: 200, zIndex: 6, animation: { name: 'fadeInUp', duration: 880, delay: 160 }, editable: { content: true, fontSize: { type: 'range', min: 100, max: 146 } } },
      // 玻璃信息条
      { id: 'af-bar', type: 'shape', shapeKind: 'rect', x: 90, y: 1500, width: 900, height: 200, fill: { $t: 'colors.aurora1' }, opacity: 0.12, borderRadius: 30, zIndex: 4, animation: { name: 'fadeInUp', duration: 800, delay: 320 } },
      { id: 'af-bar-s', type: 'shape', shapeKind: 'rect', x: 90, y: 1500, width: 900, height: 200, fill: 'transparent', border: { width: 1, color: { $t: 'colors.ink' } }, opacity: 0.15, borderRadius: 30, zIndex: 4 },
      { id: 'af-bt1', type: 'text', content: '极夜 64 天', fontFamily: { $t: 'fonts.cjk' }, fontSize: 34, fontWeight: '700', color: { $t: 'colors.ink' }, x: 140, y: 1540, width: 800, height: 48, zIndex: 6, animation: { name: 'fadeIn', duration: 700, delay: 400 }, editable: { content: true } },
      { id: 'af-bt2', type: 'text', content: '光，是这里唯一的时钟。', fontFamily: { $t: 'fonts.cjk' }, fontSize: 28, color: { $t: 'colors.ink' }, opacity: 0.72, x: 140, y: 1600, width: 800, height: 40, zIndex: 6, animation: { name: 'fadeIn', duration: 700, delay: 460 }, editable: { content: true } },
      { id: 'af-foot', type: 'text', content: 'STUDIO HY · AURORA', fontFamily: { $t: 'fonts.mono' }, fontSize: 22, color: { $t: 'colors.ink' }, opacity: 0.6, letterSpacing: 3, x: 90, y: 1820, width: 900, height: 30, zIndex: 6, animation: { name: 'fadeIn', duration: 700, delay: 520 }, editable: { content: true } },
      { id: 'af-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1920, background: `url("${grainSoft(320, 9, 0.5)}")`, opacity: 0.04, mixBlendMode: 'multiply', zIndex: 9 }
    ]
  }
]

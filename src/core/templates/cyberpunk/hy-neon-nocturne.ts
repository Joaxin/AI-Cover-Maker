// src/core/templates/cyberpunk/hy-neon-nocturne.ts
// HY 署名批 → 赛博朋克（cyberpunk） ｜ 霓虹夜景（1920×1080 视频封面）
import type { Template } from '@/types/types'
import { HEI, SANS, grain } from '../_fx/trend'

export const hyNeonNocturneTemplates: Template[] = [
  {
    id: 'hy-neon-nocturne', name: '霓虹夜行 · 不眠城', version: '1.0.0', category: 'cyberpunk',
    tags: ['hy', 'neon', 'cyberpunk', 'night', 'bokeh', '16:9'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%2307060E"/><circle cx="26" cy="30" r="16" fill="%23FF2E97" opacity="0.5"/><circle cx="72" cy="44" r="20" fill="%2300E5FF" opacity="0.45"/><text x="50" y="64" font-family="sans-serif" font-size="16" fill="%23F2F6FF" text-anchor="middle" font-weight="bold">霓虹夜</text></svg>',
    tokens: {
      colors: {
        bg: { label: '底', default: '#07060E', options: ['#07060E', '#0A0612', '#04101A', '#0E0710'] },
        neon1: { label: '霓虹1', default: '#FF2E97', options: ['#FF2E97', '#FF5E3A', '#7B5CFF', '#E5FF3A'] },
        neon2: { label: '霓虹2', default: '#00E5FF', options: ['#00E5FF', '#FF2E97', '#3A8BFF', '#FF7BE5'] },
        neon3: { label: '霓虹3', default: '#B15CFF', options: ['#B15CFF', '#FFB23A', '#00E5FF', '#2EFF9E'] },
        ink: { label: '标题', default: '#F2F6FF', options: ['#F2F6FF', '#FFE9F2', '#E9F4FF', '#F2FFEF'] },
        sub: { label: '副文', default: 'rgba(242,246,255,0.72)', options: ['rgba(242,246,255,0.72)', 'rgba(255,233,242,0.72)', 'rgba(233,244,255,0.72)', 'rgba(242,255,239,0.72)'] }
      },
      fonts: { cjk: { label: '中文', default: HEI, options: [HEI] }, latin: { label: '拉丁', default: SANS, options: [SANS] } }
    },
    presets: [
      { name: '品红青', colors: { bg: '#07060E', neon1: '#FF2E97', neon2: '#00E5FF', neon3: '#B15CFF', ink: '#F2F6FF', sub: 'rgba(242,246,255,0.72)' } },
      { name: '紫橙', colors: { bg: '#0A0612', neon1: '#FF5E3A', neon2: '#FF2E97', neon3: '#FFB23A', ink: '#FFE9F2', sub: 'rgba(255,233,242,0.72)' } },
      { name: '蓝粉', colors: { bg: '#04101A', neon1: '#7B5CFF', neon2: '#3A8BFF', neon3: '#00E5FF', ink: '#E9F4FF', sub: 'rgba(233,244,255,0.72)' } },
      { name: '赛博黄绿', colors: { bg: '#0E0710', neon1: '#E5FF3A', neon2: '#FF7BE5', neon3: '#2EFF9E', ink: '#F2FFEF', sub: 'rgba(242,255,239,0.72)' } }
    ],
    canvas: { virtualWidth: 1920, virtualHeight: 1080, defaultWidth: 1920, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'nn-g1', group: 'nn-g', type: 'shape', shapeKind: 'circle', x: 120, y: -80, width: 520, height: 520, fill: { $t: 'colors.neon1' }, opacity: 0.5, zIndex: 1, shadow: { offsetX: 0, offsetY: 0, blur: 300, color: { $t: 'colors.neon1' } }, animation: { name: 'twinkle', duration: 6000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'nn-g2', group: 'nn-g', type: 'shape', shapeKind: 'circle', x: 1380, y: 360, width: 560, height: 560, fill: { $t: 'colors.neon2' }, opacity: 0.45, zIndex: 1, shadow: { offsetX: 0, offsetY: 0, blur: 320, color: { $t: 'colors.neon2' } }, animation: { name: 'pulse', duration: 7000, iterationCount: 'infinite', easing: 'ease-in-out', delay: 500 } },
      { id: 'nn-g3', group: 'nn-g', type: 'shape', shapeKind: 'circle', x: 700, y: 700, width: 420, height: 420, fill: { $t: 'colors.neon3' }, opacity: 0.4, zIndex: 1, shadow: { offsetX: 0, offsetY: 0, blur: 280, color: { $t: 'colors.neon3' } } },
      { id: 'nn-bar', type: 'shape', shapeKind: 'rect', x: -20, y: 120, width: 1960, height: 3, fill: { $t: 'colors.neon2' }, opacity: 0.6, rotation: -1, zIndex: 2, animation: { name: 'shimmer', duration: 5000, iterationCount: 'infinite' } },
      { id: 'nn-d1', group: 'nn-d', type: 'shape', shapeKind: 'circle', x: 240, y: 520, width: 12, height: 12, fill: { $t: 'colors.neon2' }, opacity: 0.8, zIndex: 2 },
      { id: 'nn-d2', group: 'nn-d', type: 'shape', shapeKind: 'circle', x: 360, y: 300, width: 8, height: 8, fill: { $t: 'colors.neon1' }, opacity: 0.7, zIndex: 2 },
      { id: 'nn-d3', group: 'nn-d', type: 'shape', shapeKind: 'circle', x: 1500, y: 240, width: 14, height: 14, fill: { $t: 'colors.neon3' }, opacity: 0.7, zIndex: 2 },
      { id: 'nn-fog', type: 'overlay', x: 0, y: 720, width: 1920, height: 360, background: 'linear-gradient(to top, rgba(7,6,14,0.95), rgba(7,6,14,0))', zIndex: 3 },
      { id: 'nn-title', type: 'text', content: '霓虹夜行', fontFamily: { $t: 'fonts.cjk' }, fontSize: 168, fontWeight: '900', color: { $t: 'colors.ink' }, letterSpacing: 8, x: 980, y: 360, width: 860, height: 220, zIndex: 5, shadow: { offsetX: 0, offsetY: 0, blur: 50, color: { $t: 'colors.neon2' } }, animation: { name: 'fadeInUp', duration: 700 }, editable: { content: true } },
      { id: 'nn-sub', type: 'text', content: '午夜霓虹 · 不眠之城', fontFamily: { $t: 'fonts.cjk' }, fontSize: 44, fontWeight: '500', color: { $t: 'colors.sub' }, letterSpacing: 6, x: 120, y: 880, width: 760, height: 60, zIndex: 5, animation: { name: 'fadeIn', duration: 700, delay: 260 }, editable: { content: true } },
      { id: 'nn-note', type: 'text', content: 'HY · CYBERPUNK', fontFamily: { $t: 'fonts.latin' }, fontSize: 26, color: { $t: 'colors.neon2' }, letterSpacing: 6, x: 120, y: 960, width: 600, height: 36, zIndex: 5 },
      { id: 'nn-grain', type: 'overlay', x: 0, y: 0, width: 1920, height: 1080, background: `url("${grain(320, 8, 0.6)}")`, opacity: 0.05, mixBlendMode: 'overlay', zIndex: 9 }
    ]
  }
]

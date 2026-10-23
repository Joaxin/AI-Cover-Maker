// src/core/templates/acg/hy-anime-sky.ts
// HY 系列 · 动画主视觉天空（竖版 1080x1440）｜ 对标日系动画 KV 的戏剧性天空 + 云团 + 速度线
import type { Template } from '@/types/types'
import {SANS, HEI, IMPACT, MONO, cloud, grainSoft} from '../_fx/trend'

export const hyAnimeSkyTemplates: Template[] = [
  {
    id: 'hy-anime-sky', name: '动画天空主视觉', version: '1.0.0', category: 'acg',
    tags: ['hy', 'anime', 'sky', 'clouds', 'key visual', '1080x1440', 'acg'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="133" viewBox="0 0 100 133"><rect width="100" height="133" fill="%230F2A5C"/><rect x="0" y="0" width="100" height="70" fill="%232C4C8F"/><circle cx="72" cy="52" r="16" fill="%23FFB86B" opacity="0.9"/><ellipse cx="30" cy="58" rx="18" ry="7" fill="%23FFE9D6" opacity="0.85"/><ellipse cx="62" cy="66" rx="22" ry="8" fill="%23FFD9C2" opacity="0.8"/><rect x="0" y="104" width="100" height="29" fill="%230A1A3C"/><rect x="18" y="20" width="30" height="4" fill="%23FFFFFF" opacity="0.85"/></svg>',
    tokens: {
      colors: {
        bg: { label: '夜空', default: '#0F2A5C', options: ['#0F2A5C', '#12203F', '#1B1442', '#062A33'] },
        sky: { label: '天光', default: '#2C4C8F', options: ['#2C4C8F', '#3B5FA8', '#4A2F6B', '#0E4A5C'] },
        glow: { label: '夕照', default: '#FFB86B', options: ['#FFB86B', '#FF9671', '#FFD6A5', '#FF8FA3'] },
        cloud: { label: '云团', default: '#FFE9D6', options: ['#FFE9D6', '#FFD9C2', '#FFF3E6', '#FFC9C9'] },
        ink: { label: '文字', default: '#FFFFFF', options: ['#FFFFFF', '#FFF7ED', '#EAF2FF', '#FFF0F3'] }
      },
      fonts: {
        display: { label: '英文标题', default: IMPACT, options: [IMPACT, SANS, MONO] },
        cjk: { label: '中文', default: HEI, options: [HEI, SANS, MONO] },
        mono: { label: '等宽标注', default: MONO, options: [MONO, SANS, IMPACT] }
      }
    },
    presets: [
      { name: '黄昏飞行', colors: { bg: '#0F2A5C', sky: '#2C4C8F', glow: '#FFB86B', cloud: '#FFE9D6', ink: '#FFFFFF' } },
      { name: '午后晴层', colors: { bg: '#12203F', sky: '#3B5FA8', glow: '#FF9671', cloud: '#FFD9C2', ink: '#FFF7ED' } },
      { name: '紫夜微光', colors: { bg: '#1B1442', sky: '#4A2F6B', glow: '#FFD6A5', cloud: '#FFF3E6', ink: '#EAF2FF' } },
      { name: '深海夏日', colors: { bg: '#062A33', sky: '#0E4A5C', glow: '#FF8FA3', cloud: '#FFC9C9', ink: '#FFF0F3' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1440, defaultWidth: 1080, defaultHeight: 1440, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      // 天空渐变（由上至下：夜蓝 -> 夕照暖）
      { id: 'as-sky', type: 'overlay', x: 0, y: 0, width: 1080, height: 1440, background: 'linear-gradient(180deg, rgba(15,42,92,1) 0%, rgba(44,76,143,0.92) 42%, rgba(255,184,107,0.45) 78%, rgba(255,233,214,0.55) 100%)', zIndex: 1 },
      // 夕照核心
      { id: 'as-sun', type: 'shape', shapeKind: 'circle', x: 660, y: 300, width: 360, height: 360, fill: { $t: 'colors.glow' }, opacity: 0.55, shadow: { offsetX: 0, offsetY: 0, blur: 130, color: { $t: 'colors.glow' }}, zIndex: 2, animation: { name: 'glow', duration: 6400, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'as-suncore', type: 'shape', shapeKind: 'circle', x: 740, y: 380, width: 200, height: 200, fill: { $t: 'colors.cloud' }, opacity: 0.85, shadow: { offsetX: 0, offsetY: 0, blur: 60, color: { $t: 'colors.cloud' }}, zIndex: 3 },
      // 云团（大中小三层，错位排布）
      { id: 'as-c1', group: 'as-c', type: 'overlay', x: 60, y: 620, width: 460, height: 190, background: `url("${cloud(460, 190, '%23FFE9D6')}")`, opacity: 0.82, zIndex: 4, animation: { name: 'drift', duration: 14000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'as-c2', group: 'as-c', type: 'overlay', x: 520, y: 760, width: 500, height: 210, background: `url("${cloud(500, 210, '%23FFD9C2')}")`, opacity: 0.72, zIndex: 4, animation: { name: 'drift', duration: 18000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'as-c3', group: 'as-c', type: 'overlay', x: 40, y: 930, width: 380, height: 160, background: `url("${cloud(380, 160, '%23FFF3E6')}")`, opacity: 0.6, zIndex: 4, animation: { name: 'drift', duration: 22000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      // 速度线（斜向，制造动势）
      { id: 'as-sp1', group: 'as-sp', type: 'shape', shapeKind: 'line', x: 60, y: 150, width: 320, height: 3, rotation: 22, fill: { $t: 'colors.ink' }, opacity: 0.22, zIndex: 5 },
      { id: 'as-sp2', group: 'as-sp', type: 'shape', shapeKind: 'line', x: 60, y: 240, width: 240, height: 2, rotation: 22, fill: { $t: 'colors.ink' }, opacity: 0.16, zIndex: 5 },
      { id: 'as-sp3', group: 'as-sp', type: 'shape', shapeKind: 'line', x: 700, y: 480, width: 320, height: 3, rotation: -22, fill: { $t: 'colors.ink' }, opacity: 0.2, zIndex: 5 },
      { id: 'as-sp4', group: 'as-sp', type: 'shape', shapeKind: 'line', x: 780, y: 570, width: 230, height: 2, rotation: -22, fill: { $t: 'colors.ink' }, opacity: 0.14, zIndex: 5 },
      // 地面剪影（压住画面底边）
      { id: 'as-ground', type: 'shape', shapeKind: 'rect', x: 0, y: 1120, width: 1080, height: 320, fill: { $t: 'colors.bg' }, opacity: 0.92, zIndex: 6 },
      { id: 'as-gline', type: 'shape', shapeKind: 'line', x: 0, y: 1120, width: 1080, height: 2, fill: { $t: 'colors.ink' }, opacity: 0.3, zIndex: 7 },
      // 顶部标注
      { id: 'as-hy', type: 'text', content: 'HY', fontFamily: { $t: 'fonts.mono' }, fontSize: 24, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.6, letterSpacing: 4, x: 90, y: 96, width: 220, height: 34, zIndex: 10 },
      { id: 'as-kicker', type: 'text', content: 'SUMMER SIGNAL', fontFamily: { $t: 'fonts.mono' }, fontSize: 22, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.72, letterSpacing: 5, textAlign: 'right', x: 690, y: 96, width: 300, height: 34, zIndex: 10, animation: { name: 'fadeIn', duration: 600 } },
      // 主标题
      { id: 'as-title', type: 'text', content: 'SKYLINE', fontFamily: { $t: 'fonts.display' }, fontSize: 150, fontWeight: '700', color: { $t: 'colors.ink' }, textAlign: 'center', letterSpacing: 10, lineHeight: 1.12, x: 60, y: 300, width: 960, height: 190, zIndex: 10, shadow: { offsetX: 0, offsetY: 0, blur: 40, color: { $t: 'colors.bg' }}, animation: { name: 'fadeInUp', duration: 1000 }, editable: { content: true, fontSize: { type: 'range', min: 110, max: 170 } } },
      { id: 'as-titlecjk', type: 'text', content: '那年夏天的光', fontFamily: { $t: 'fonts.cjk' }, fontSize: 44, fontWeight: '700', color: { $t: 'colors.ink' }, textAlign: 'center', letterSpacing: 8, x: 140, y: 530, width: 800, height: 62, zIndex: 10, animation: { name: 'rise', duration: 1000, delay: 200 }, editable: { content: true } },
      // 底部信息（剪影上，统一左对齐 x=90）
      { id: 'as-sub', type: 'text', content: '在被夕阳染透之前，我们一直在飞。', fontFamily: { $t: 'fonts.cjk' }, fontSize: 30, color: { $t: 'colors.ink' }, opacity: 0.88, x: 90, y: 1200, width: 700, height: 46, zIndex: 10, animation: { name: 'rise', duration: 900, delay: 320 }, editable: { content: true } },
      { id: 'as-meta', type: 'text', content: 'EP.07  /  HY FILMS', fontFamily: { $t: 'fonts.mono' }, fontSize: 20, color: { $t: 'colors.ink' }, opacity: 0.55, letterSpacing: 3, x: 90, y: 1264, width: 700, height: 32, zIndex: 10 },
      { id: 'as-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1440, background: `url("${grainSoft(320, 17, 0.5)}")`, opacity: 0.05, mixBlendMode: 'overlay', zIndex: 12 }
    ]
  }
]

// src/core/templates/cyberpunk/hy-night-neon.ts —— 霓虹夜城 Night Neon（9:16）
// 赛博夜景：深蓝紫底 + 远景建筑剪影（深色 rect 群）+ 霓虹招牌（亮色块 + 亮字）
// + 湿滑地面反射（底部竖向渐变 overlay）+ 星点 + 颗粒。HY 标记：id / 导出名 / tags 带 hy，脚注嵌入「HY NEON / D9」。
import type { Template } from '@/types/types'
import { HEI, MONO, SANS, SERIF, grain, starfield } from '../_fx/trend'

export const hyNightNeonTemplates: Template[] = [
  {
    id: 'hy-night-neon', name: '霓虹夜城', version: '1.0.0', category: 'cyberpunk',
    tags: ['hy', 'cyberpunk', 'neon', 'night city', 'synthwave', '9:16'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="178" viewBox="0 0 100 178"><rect width="100" height="178" fill="%23141233"/><rect x="14" y="60" width="18" height="80" fill="%230A0E1F"/><rect x="40" y="40" width="20" height="100" fill="%230A0E1F"/><rect x="68" y="70" width="18" height="70" fill="%230A0E1F"/><rect x="44" y="50" width="12" height="6" fill="%23FF4D9D"/><rect x="20" y="74" width="9" height="4" fill="%2338E8FF"/><rect x="0" y="140" width="100" height="38" fill="%232A1A4A" opacity="0.6"/></svg>',
    tokens: {
      colors: {
        bg: { label: '夜空', default: '#141233', options: ['#141233', '#0E1A2E', '#1E1030', '#0C1424'] },
        building: { label: '楼宇', default: '#0A0E1F', options: ['#0A0E1F', '#08121F', '#140A24', '#07101C'] },
        neonA: { label: '霓虹一', default: '#FF4D9D', options: ['#FF4D9D', '#38E8FF', '#C084FC', '#3DD6C0'] },
        neonB: { label: '霓虹二', default: '#38E8FF', options: ['#38E8FF', '#FFD24D', '#7CFC00', '#FF7BC0'] },
        ink: { label: '文字', default: '#F2F0FF', options: ['#F2F0FF', '#E6F5FF', '#F6EAF4', '#EAF2EC'] }
      },
      fonts: { heading: { label: '标题', default: HEI, options: [HEI, SANS, SERIF] }, mono: { label: '小字', default: MONO, options: [MONO, SANS] } }
    },
    presets: [
      { name: '粉蓝夜', colors: { bg: '#141233', building: '#0A0E1F', neonA: '#FF4D9D', neonB: '#38E8FF', ink: '#F2F0FF' } },
      { name: '冰海夜', colors: { bg: '#0E1A2E', building: '#08121F', neonA: '#38E8FF', neonB: '#FFD24D', ink: '#E6F5FF' } },
      { name: '紫雾夜', colors: { bg: '#1E1030', building: '#140A24', neonA: '#C084FC', neonB: '#7CFC00', ink: '#F6EAF4' } },
      { name: '青绿夜', colors: { bg: '#0C1424', building: '#07101C', neonA: '#3DD6C0', neonB: '#FF7BC0', ink: '#EAF2EC' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1920, defaultWidth: 1080, defaultHeight: 1920, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'nn-stars', type: 'image', src: starfield(1080, 1920, 70, '%23FFFFFF', 21), x: 0, y: 0, width: 1080, height: 1920, opacity: 0.7, zIndex: 2 },
      { id: 'nn-glow', type: 'shape', shapeKind: 'circle', x: 360, y: 360, width: 640, height: 640, fill: { $t: 'colors.neonA' }, opacity: 0.12, zIndex: 2, animation: { name: 'drift', duration: 16000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      // —— 远景楼宇剪影（群）——
      { id: 'nn-b1', group: 'nn-b', type: 'shape', shapeKind: 'rect', x: 90, y: 980, width: 150, height: 520, fill: { $t: 'colors.building' }, zIndex: 3 },
      { id: 'nn-b2', group: 'nn-b', type: 'shape', shapeKind: 'rect', x: 270, y: 820, width: 130, height: 680, fill: { $t: 'colors.building' }, zIndex: 3 },
      { id: 'nn-b3', group: 'nn-b', type: 'shape', shapeKind: 'rect', x: 430, y: 1080, width: 180, height: 320, fill: { $t: 'colors.building' }, zIndex: 3 },
      { id: 'nn-b4', group: 'nn-b', type: 'shape', shapeKind: 'rect', x: 640, y: 900, width: 140, height: 500, fill: { $t: 'colors.building' }, zIndex: 3 },
      { id: 'nn-b5', group: 'nn-b', type: 'shape', shapeKind: 'rect', x: 800, y: 760, width: 160, height: 640, fill: { $t: 'colors.building' }, zIndex: 3 },
      { id: 'nn-b6', group: 'nn-b', type: 'shape', shapeKind: 'rect', x: 930, y: 1040, width: 110, height: 360, fill: { $t: 'colors.building' }, zIndex: 3 },
      // —— 霓虹招牌 ——
      { id: 'nn-sign-1', group: 'nn-sign-', type: 'shape', shapeKind: 'rect', x: 290, y: 880, width: 90, height: 26, fill: { $t: 'colors.neonA' }, opacity: 0.9, zIndex: 5, animation: { name: 'blink', duration: 4200, iterationCount: 'infinite' } },
      { id: 'nn-sign-2', group: 'nn-sign-', type: 'shape', shapeKind: 'rect', x: 820, y: 840, width: 26, height: 120, fill: { $t: 'colors.neonB' }, opacity: 0.9, zIndex: 5, animation: { name: 'pulse', duration: 5200, iterationCount: 'infinite' } },
      { id: 'nn-sign-3', group: 'nn-sign-', type: 'shape', shapeKind: 'rect', x: 150, y: 1080, width: 70, height: 20, fill: { $t: 'colors.neonB' }, opacity: 0.85, zIndex: 5, animation: { name: 'blink', duration: 3600, delay: 800, iterationCount: 'infinite' } },
      // —— 地面反射 ——
      { id: 'nn-floor', type: 'overlay', x: 0, y: 0, width: 1080, height: 1920, background: 'linear-gradient(180deg, rgba(255,77,157,0) 0%, rgba(255,77,157,0) 62%, rgba(255,77,157,0.10) 82%, rgba(56,232,255,0.10) 100%)', mixBlendMode: 'screen', zIndex: 4 },
      // —— 文字 ——
      { id: 'nn-kicker', type: 'text', content: 'NIGHT CITY · 夜之城', fontFamily: { $t: 'fonts.mono' }, fontSize: 26, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.85, letterSpacing: 8, textAlign: 'center', x: 96, y: 1240, width: 888, height: 36, zIndex: 8, animation: { name: 'slideInLeft', duration: 700 } },
      { id: 'nn-title', type: 'text', content: '霓虹\n之夜', fontFamily: { $t: 'fonts.heading' }, fontSize: 150, fontWeight: '800', color: { $t: 'colors.ink' }, lineHeight: 1.04, letterSpacing: -4, textAlign: 'center', x: 96, y: 1300, width: 888, height: 340, zIndex: 8, animation: { name: 'fadeInUp', duration: 900, delay: 160 }, editable: { content: true, fontSize: { type: 'range', min: 120, max: 168 } } },
      { id: 'nn-sub', type: 'text', content: '雨把整座城，洗成一块发光的屏。', fontFamily: { $t: 'fonts.heading' }, fontSize: 34, color: { $t: 'colors.ink' }, opacity: 0.86, letterSpacing: 3, lineHeight: 1.4, textAlign: 'center', x: 140, y: 1660, width: 800, height: 50, zIndex: 8, animation: { name: 'rise', duration: 800, delay: 380 }, editable: { content: true } },
      { id: 'nn-foot', type: 'text', content: 'HY NEON / DISTRICT 9', fontFamily: { $t: 'fonts.mono' }, fontSize: 22, color: { $t: 'colors.ink' }, opacity: 0.6, letterSpacing: 6, textAlign: 'center', x: 96, y: 1760, width: 888, height: 30, zIndex: 8 },
      { id: 'nn-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1920, background: `url("${grain(300, 29, 0.55)}")`, opacity: 0.06, mixBlendMode: 'overlay', zIndex: 20 }
    ]
  }
]

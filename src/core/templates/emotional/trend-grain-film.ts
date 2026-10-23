// src/core/templates/emotional/trend-grain-film.ts
// 当红趋势批 → 归入「情感文案风」（emotional） ｜ 9. 噪点胶片横幅（2.35:1）
// 迁移自 src/core/templates/trend/：模板内容、素材函数与外观保持不变，只改分类归属。
import type { Template } from '@/types/types'
import {HEI, SONG, MONO, grainSoft, SERIF, perforations, grain} from '../_fx/trend'

export const trendGrainFilmTemplates: Template[] = [
  {
    id: 'trend-grain-film', name: '噪点胶片横图', version: '1.0.0', category: 'emotional',
    tags: ['trend', 'grain', 'film', 'texture', 'analog', '2.35:1'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="68" viewBox="0 0 160 68"><rect width="160" height="68" fill="%23171310"/><rect x="10" y="8" width="6" height="52" fill="%23F5EFE6" opacity="0.18"/><rect x="144" y="8" width="6" height="52" fill="%23F5EFE6" opacity="0.18"/><rect x="28" y="22" width="76" height="9" fill="%23F5EFE6"/><rect x="28" y="38" width="44" height="6" fill="%23E8B14C" opacity="0.9"/></svg>',
    tokens: {
      colors: {
        bg: { label: '片基', default: '#171310', options: ['#171310', '#0F1418', '#1C1917', '#221728'] },
        ink: { label: '字幕', default: '#F5EFE6', options: ['#F5EFE6', '#171310', '#E7E5E4', '#FDF6E3'] },
        amber: { label: '暖光', default: '#E8B14C', options: ['#E8B14C', '#D97706', '#EF4444', '#7DD3FC'] },
        frame: { label: '齿孔', default: '#F5EFE6', options: ['#F5EFE6', '#A8A29E', '#57534E', '#FDE68A'] }
      },
      fonts: { latin: { label: '片名字体', default: '"Copperplate", Georgia, serif', options: ['"Copperplate", Georgia, serif', SERIF, MONO] }, cjk: { label: '中文体', default: SONG, options: [SONG, HEI, MONO] } }
    },
    presets: [
      { name: '钨丝灯', colors: { bg: '#171310', ink: '#F5EFE6', amber: '#E8B14C', frame: '#F5EFE6' } },
      { name: '冷调夜采', colors: { bg: '#0F1418', ink: '#E7E5E4', amber: '#7DD3FC', frame: '#A8A29E' } },
      { name: '过期胶卷', colors: { bg: '#221728', ink: '#FDF6E3', amber: '#EF4444', frame: '#FDE68A' } },
      { name: '黑白底片', colors: { bg: '#1C1917', ink: '#F5EFE6', amber: '#D97706', frame: '#57534E' } }
    ],
    canvas: { virtualWidth: 1800, virtualHeight: 766, defaultWidth: 1800, defaultHeight: 766, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'gf-vignette', type: 'overlay', x: 0, y: 0, width: 1800, height: 766, background: 'radial-gradient(ellipse at 42% 46%, rgba(255,255,255,0.12), transparent 58%), radial-gradient(ellipse at 50% 50%, transparent 52%, rgba(0,0,0,0.5))', mixBlendMode: 'normal', zIndex: 2 },
      { id: 'gf-perf-l', type: 'image', src: perforations(46, 766, 20, '%23F5EFE6'), x: 24, y: 0, width: 46, height: 766, objectFit: 'fill', opacity: 0.22, group: 'perf', zIndex: 3 },
      { id: 'gf-perf-r', type: 'image', src: perforations(46, 766, 20, '%23F5EFE6'), x: 1730, y: 0, width: 46, height: 766, objectFit: 'fill', opacity: 0.22, group: 'perf', zIndex: 3 },
      { id: 'gf-frame', type: 'shape', shapeKind: 'rect', x: 108, y: 74, width: 1584, height: 618, fill: 'transparent', border: { width: 2, color: { $t: 'colors.frame' } }, opacity: 0.3, zIndex: 4 },
      { id: 'gf-slate', type: 'text', content: 'SCENE 01 · TAKE 07 · 2026.09.21', fontFamily: { $t: 'fonts.latin' }, fontSize: 23, color: { $t: 'colors.amber' }, letterSpacing: 8, x: 168, y: 148, width: 900, height: 36, zIndex: 6, animation: { name: 'blink', duration: 4200, iterationCount: 'infinite', easing: 'steps(1)' } },
      { id: 'gf-h1', type: 'text', content: 'GRAIN', fontFamily: { $t: 'fonts.latin' }, fontSize: 216, color: { $t: 'colors.ink' }, letterSpacing: 10, x: 168, y: 214, width: 1200, height: 232, zIndex: 6, animation: { name: 'fadeIn', duration: 1100 }, editable: { content: true, fontSize: { type: 'range', min: 140, max: 250 } } },
      { id: 'gf-cn', type: 'text', content: '颗粒不是杂质，是手写的痕迹', fontFamily: { $t: 'fonts.cjk' }, fontSize: 46, color: { $t: 'colors.ink' }, letterSpacing: 4, x: 168, y: 468, width: 1100, height: 70, zIndex: 6, animation: { name: 'slideUpFade', duration: 900, delay: 260 }, editable: { content: true } },
      { id: 'gf-rule', type: 'shape', shapeKind: 'rect', x: 168, y: 566, width: 260, height: 3, fill: { $t: 'colors.amber' }, zIndex: 6 },
      { id: 'gf-body', type: 'text', content: 'ISO 400 · f/1.4 · 1/60s —— 把噪点当作主色，\n画面就自动有了温度。', fontFamily: { $t: 'fonts.cjk' }, fontSize: 26, color: { $t: 'colors.ink' }, opacity: 0.66, lineHeight: 1.8, textAlign: 'right', x: 980, y: 592, width: 640, height: 96, zIndex: 6, editable: { content: true } },
      { id: 'gf-badge', type: 'shape', shapeKind: 'rect', x: 1420, y: 140, width: 224, height: 66, fill: { $t: 'colors.amber' }, zIndex: 6 },
      { id: 'gf-badge-t', type: 'text', content: 'NO. 04', fontFamily: { $t: 'fonts.latin' }, fontSize: 30, color: { $t: 'colors.bg' }, letterSpacing: 4, textAlign: 'center', lineHeight: 2.2, x: 1420, y: 140, width: 224, height: 66, zIndex: 7 },
      { id: 'gf-grain-strong', type: 'overlay', x: 0, y: 0, width: 1800, height: 766, background: `url("${grainSoft(360, 17, 0.85)}")`, opacity: 0.22, mixBlendMode: 'overlay', zIndex: 8 },
      { id: 'gf-grain-soft', type: 'overlay', x: 0, y: 0, width: 1800, height: 766, background: `url("${grainSoft(200, 41, 0.6)}")`, opacity: 0.1, mixBlendMode: 'multiply', zIndex: 9 },
      { id: 'gf-scan', type: 'overlay', x: 0, y: 0, width: 1800, height: 766, background: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.05) 0 2px, transparent 2px 5px)', opacity: 0.5, zIndex: 10, animation: { name: 'gradientPan', duration: 12000, iterationCount: 'infinite', easing: 'linear' } }
    ]
  }
]

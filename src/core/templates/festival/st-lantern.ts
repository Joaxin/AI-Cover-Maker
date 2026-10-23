// src/core/templates/festival/st-lantern.ts
// ST 系列 · 灯会夜色（4:5）｜ 对标 AI 生成图像的放灯/灯节夜景审美：
// 暖调深色夜空里，孔明灯由近及远向上飘升，配水面倒影与暖光弥散。温暖、祈愿感、光点错落不杂。
import type { Template } from '@/types/types'
import { SANS, HEI, SONG, SERIF, MONO, grainSoft } from '../_fx/trend'

export const stLanternTemplates: Template[] = [
  {
    id: 'st-lantern', name: '灯会夜色', version: '1.0.0', category: 'festival',
    tags: ['st', 'lantern', 'festival', 'night', 'warm', 'lights', '4:5', 'wish', 'river'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="125" viewBox="0 0 100 125"><rect width="100" height="125" fill="%23190D08"/><ellipse cx="50" cy="106" rx="58" ry="30" fill="%23FF7A3D" opacity="0.15"/><rect x="20" y="36" width="13" height="16" rx="6.5" fill="%23FFC53D" opacity="0.92"/><rect x="47" y="20" width="11" height="14" rx="5.5" fill="%23FF7A3D" opacity="0.85"/><rect x="72" y="42" width="9" height="12" rx="4.5" fill="%23FF9D6E" opacity="0.72"/><rect x="57" y="64" width="14" height="18" rx="7" fill="%23FFC53D" opacity="0.88"/><rect x="27" y="72" width="11" height="14" rx="5.5" fill="%23FF7A3D" opacity="0.78"/><rect x="86" y="66" width="8" height="10" rx="4" fill="%23FF9D6E" opacity="0.6"/><circle cx="35" cy="14" r="1.3" fill="%23FFE0B0" opacity="0.9"/><circle cx="83" cy="24" r="1.1" fill="%23FFE0B0" opacity="0.7"/><circle cx="13" cy="54" r="1" fill="%23FFE0B0" opacity="0.6"/><circle cx="93" cy="52" r="1.2" fill="%23FFE0B0" opacity="0.8"/><circle cx="45" cy="46" r="1" fill="%23FFE0B0" opacity="0.5"/><rect x="16" y="98" width="36" height="2" rx="1" fill="%23FFC53D" opacity="0.35"/><rect x="54" y="103" width="32" height="2" rx="1" fill="%23FF7A3D" opacity="0.3"/><rect x="30" y="109" width="42" height="2" rx="1" fill="%23FF9D6E" opacity="0.24"/><rect x="62" y="115" width="26" height="2" rx="1" fill="%23FFC53D" opacity="0.18"/></svg>',
    tokens: {
      colors: {
        bg: { label: '底色', default: '#190D08', options: ['#190D08', '#151007', '#180A0E', '#0D1220'] },
        ink: { label: '文字', default: '#FFE9D8', options: ['#FFE9D8', '#FFF3DC', '#FFE7E0', '#FFEFD9'] },
        lamp1: { label: '灯色·近', default: '#FF7A3D', options: ['#FF7A3D', '#FFAE35', '#FF6448', '#FF9A4E'] },
        lamp2: { label: '灯色·中', default: '#FFC53D', options: ['#FFC53D', '#FFD968', '#FFA35C', '#FFD08A'] },
        lamp3: { label: '灯色·远', default: '#FF9D6E', options: ['#FF9D6E', '#FF9256', '#FF8FA0', '#F2A66B'] },
        accent: { label: '点缀', default: '#FFE0B0', options: ['#FFE0B0', '#FFE9AE', '#FFCDB8', '#FFE3BC'] }
      },
      fonts: {
        display: { label: '英文', default: SERIF, options: [SERIF, SANS, SONG] },
        cjk: { label: '中文', default: HEI, options: [HEI, SANS, SONG] },
        mono: { label: '等宽', default: MONO, options: [MONO, SANS, HEI] }
      }
    },
    presets: [
      { name: '橘夜祈愿', colors: { bg: '#190D08', ink: '#FFE9D8', lamp1: '#FF7A3D', lamp2: '#FFC53D', lamp3: '#FF9D6E', accent: '#FFE0B0' } },
      { name: '金蜜灯河', colors: { bg: '#151007', ink: '#FFF3DC', lamp1: '#FFAE35', lamp2: '#FFD968', lamp3: '#FF9256', accent: '#FFE9AE' } },
      { name: '绯灯之夜', colors: { bg: '#180A0E', ink: '#FFE7E0', lamp1: '#FF6448', lamp2: '#FFA35C', lamp3: '#FF8FA0', accent: '#FFCDB8' } },
      { name: '黛蓝浮灯', colors: { bg: '#0D1220', ink: '#FFEFD9', lamp1: '#FF9A4E', lamp2: '#FFD08A', lamp3: '#F2A66B', accent: '#FFE3BC' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      // 氛围层：底部暖光弥散 + 文字区一侧弱暖霭 + 顶部压暗保对比
      { id: 'st-ln-atmos', type: 'overlay', x: 0, y: 0, width: 1080, height: 1350, background: 'radial-gradient(70% 40% at 50% 78%, rgba(255,180,90,0.30) 0%, rgba(255,180,90,0) 72%), radial-gradient(55% 30% at 24% 56%, rgba(255,150,80,0.10) 0%, rgba(255,150,80,0) 70%), linear-gradient(180deg, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0) 34%)', zIndex: 1 },

      // 水面倒影：5 条横向细线，长度与透明度参差
      { id: 'st-ln-w1', group: 'st-ln-w', type: 'shape', shapeKind: 'line', x: 110, y: 1180, width: 300, height: 3, fill: { $t: 'colors.lamp1' }, opacity: 0.18, zIndex: 2 },
      { id: 'st-ln-w2', group: 'st-ln-w', type: 'shape', shapeKind: 'line', x: 560, y: 1204, width: 380, height: 3, fill: { $t: 'colors.lamp2' }, opacity: 0.15, zIndex: 2, animation: { name: 'drift', duration: 9000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-ln-w3', group: 'st-ln-w', type: 'shape', shapeKind: 'line', x: 70, y: 1236, width: 250, height: 2, fill: { $t: 'colors.lamp3' }, opacity: 0.12, zIndex: 2 },
      { id: 'st-ln-w4', group: 'st-ln-w', type: 'shape', shapeKind: 'line', x: 420, y: 1262, width: 460, height: 3, fill: { $t: 'colors.lamp1' }, opacity: 0.1, zIndex: 2, animation: { name: 'drift', duration: 11000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-ln-w5', group: 'st-ln-w', type: 'shape', shapeKind: 'line', x: 170, y: 1288, width: 330, height: 2, fill: { $t: 'colors.lamp2' }, opacity: 0.08, zIndex: 2 },

      // 远处灯串：极小暖光点，错落分布，配 twinkle
      { id: 'st-ln-d1', group: 'st-ln-d', type: 'shape', shapeKind: 'circle', x: 880, y: 300, width: 12, height: 12, fill: { $t: 'colors.lamp2' }, opacity: 0.8, zIndex: 3, animation: { name: 'twinkle', duration: 2600, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-ln-d2', group: 'st-ln-d', type: 'shape', shapeKind: 'circle', x: 150, y: 250, width: 9, height: 9, fill: { $t: 'colors.lamp1' }, opacity: 0.7, zIndex: 3, animation: { name: 'twinkle', duration: 3200, delay: 400, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-ln-d3', group: 'st-ln-d', type: 'shape', shapeKind: 'circle', x: 960, y: 470, width: 8, height: 8, fill: { $t: 'colors.accent' }, opacity: 0.75, zIndex: 3, animation: { name: 'twinkle', duration: 2800, delay: 800, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-ln-d4', group: 'st-ln-d', type: 'shape', shapeKind: 'circle', x: 320, y: 180, width: 11, height: 11, fill: { $t: 'colors.lamp2' }, opacity: 0.65, zIndex: 3, animation: { name: 'twinkle', duration: 3600, delay: 200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-ln-d5', group: 'st-ln-d', type: 'shape', shapeKind: 'circle', x: 1010, y: 380, width: 7, height: 7, fill: { $t: 'colors.lamp3' }, opacity: 0.7, zIndex: 3, animation: { name: 'twinkle', duration: 2400, delay: 600, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-ln-d6', group: 'st-ln-d', type: 'shape', shapeKind: 'circle', x: 60, y: 520, width: 10, height: 10, fill: { $t: 'colors.lamp1' }, opacity: 0.6, zIndex: 3, animation: { name: 'twinkle', duration: 3000, delay: 1000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-ln-d7', group: 'st-ln-d', type: 'shape', shapeKind: 'circle', x: 760, y: 560, width: 13, height: 13, fill: { $t: 'colors.lamp2' }, opacity: 0.85, zIndex: 3, animation: { name: 'twinkle', duration: 2700, delay: 300, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-ln-d8', group: 'st-ln-d', type: 'shape', shapeKind: 'circle', x: 520, y: 270, width: 8, height: 8, fill: { $t: 'colors.accent' }, opacity: 0.7, zIndex: 3, animation: { name: 'twinkle', duration: 3300, delay: 900, iterationCount: 'infinite', easing: 'ease-in-out' } },

      // 灯笼 1（近·左下，最大最亮）：灯身 + 灯穗 + 火点，三件套同步 float
      { id: 'st-ln-l1-body', type: 'shape', shapeKind: 'rect', x: 118, y: 826, width: 128, height: 162, borderRadius: 62, fill: { $t: 'colors.lamp1' }, opacity: 0.95, shadow: { offsetX: 0, offsetY: 0, blur: 78, color: { $t: 'colors.lamp1' } }, zIndex: 6, animation: { name: 'float', duration: 9200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-ln-l1-tassel', type: 'shape', shapeKind: 'line', x: 181, y: 990, width: 2, height: 34, fill: { $t: 'colors.lamp2' }, opacity: 0.85, zIndex: 7, animation: { name: 'float', duration: 9200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-ln-l1-fire', type: 'shape', shapeKind: 'circle', x: 176, y: 1026, width: 12, height: 12, fill: { $t: 'colors.lamp2' }, opacity: 0.95, zIndex: 8, animation: { name: 'float', duration: 9200, iterationCount: 'infinite', easing: 'ease-in-out' } },

      // 灯笼 2（近·右下）
      { id: 'st-ln-l2-body', type: 'shape', shapeKind: 'rect', x: 698, y: 772, width: 110, height: 140, borderRadius: 54, fill: { $t: 'colors.lamp2' }, opacity: 0.92, shadow: { offsetX: 0, offsetY: 0, blur: 66, color: { $t: 'colors.lamp2' } }, zIndex: 6, animation: { name: 'float', duration: 10600, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-ln-l2-tassel', type: 'shape', shapeKind: 'line', x: 752, y: 914, width: 2, height: 30, fill: { $t: 'colors.lamp1' }, opacity: 0.8, zIndex: 7, animation: { name: 'float', duration: 10600, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-ln-l2-fire', type: 'shape', shapeKind: 'circle', x: 748, y: 946, width: 11, height: 11, fill: { $t: 'colors.lamp1' }, opacity: 0.9, zIndex: 8, animation: { name: 'float', duration: 10600, iterationCount: 'infinite', easing: 'ease-in-out' } },

      // 灯笼 3（中·右中）
      { id: 'st-ln-l3-body', type: 'shape', shapeKind: 'rect', x: 846, y: 580, width: 86, height: 110, borderRadius: 42, fill: { $t: 'colors.lamp3' }, opacity: 0.74, shadow: { offsetX: 0, offsetY: 0, blur: 46, color: { $t: 'colors.lamp3' } }, zIndex: 5, animation: { name: 'float', duration: 8400, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-ln-l3-tassel', type: 'shape', shapeKind: 'line', x: 888, y: 692, width: 2, height: 26, fill: { $t: 'colors.lamp2' }, opacity: 0.7, zIndex: 6, animation: { name: 'float', duration: 8400, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-ln-l3-fire', type: 'shape', shapeKind: 'circle', x: 884, y: 720, width: 10, height: 10, fill: { $t: 'colors.lamp2' }, opacity: 0.85, zIndex: 7, animation: { name: 'float', duration: 8400, iterationCount: 'infinite', easing: 'ease-in-out' } },

      // 灯笼 4（中·左上）
      { id: 'st-ln-l4-body', type: 'shape', shapeKind: 'rect', x: 246, y: 452, width: 82, height: 104, borderRadius: 40, fill: { $t: 'colors.lamp1' }, opacity: 0.7, shadow: { offsetX: 0, offsetY: 0, blur: 40, color: { $t: 'colors.lamp1' } }, zIndex: 5, animation: { name: 'float', duration: 7600, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-ln-l4-tassel', type: 'shape', shapeKind: 'line', x: 286, y: 558, width: 2, height: 24, fill: { $t: 'colors.lamp2' }, opacity: 0.65, zIndex: 6, animation: { name: 'float', duration: 7600, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-ln-l4-fire', type: 'shape', shapeKind: 'circle', x: 283, y: 584, width: 9, height: 9, fill: { $t: 'colors.lamp2' }, opacity: 0.8, zIndex: 7, animation: { name: 'float', duration: 7600, iterationCount: 'infinite', easing: 'ease-in-out' } },

      // 灯笼 5（远·中上）
      { id: 'st-ln-l5-body', type: 'shape', shapeKind: 'rect', x: 560, y: 352, width: 66, height: 84, borderRadius: 32, fill: { $t: 'colors.lamp2' }, opacity: 0.55, shadow: { offsetX: 0, offsetY: 0, blur: 30, color: { $t: 'colors.lamp2' } }, zIndex: 4, animation: { name: 'float', duration: 9800, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-ln-l5-tassel', type: 'shape', shapeKind: 'line', x: 592, y: 438, width: 2, height: 20, fill: { $t: 'colors.lamp1' }, opacity: 0.55, zIndex: 5, animation: { name: 'float', duration: 9800, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-ln-l5-fire', type: 'shape', shapeKind: 'circle', x: 589, y: 460, width: 8, height: 8, fill: { $t: 'colors.lamp1' }, opacity: 0.7, zIndex: 6, animation: { name: 'float', duration: 9800, iterationCount: 'infinite', easing: 'ease-in-out' } },

      // 灯笼 6（远·右上，最小最淡）
      { id: 'st-ln-l6-body', type: 'shape', shapeKind: 'rect', x: 906, y: 210, width: 56, height: 72, borderRadius: 28, fill: { $t: 'colors.lamp3' }, opacity: 0.45, shadow: { offsetX: 0, offsetY: 0, blur: 24, color: { $t: 'colors.lamp3' } }, zIndex: 4, animation: { name: 'float', duration: 11200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-ln-l6-tassel', type: 'shape', shapeKind: 'line', x: 933, y: 284, width: 2, height: 18, fill: { $t: 'colors.lamp2' }, opacity: 0.5, zIndex: 5, animation: { name: 'float', duration: 11200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-ln-l6-fire', type: 'shape', shapeKind: 'circle', x: 931, y: 304, width: 7, height: 7, fill: { $t: 'colors.lamp2' }, opacity: 0.65, zIndex: 6, animation: { name: 'float', duration: 11200, iterationCount: 'infinite', easing: 'ease-in-out' } },

      // 文字组：统一左对齐 x=90
      { id: 'st-ln-kicker', type: 'text', content: 'LANTERN NIGHT', fontFamily: { $t: 'fonts.display' }, fontSize: 28, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.85, letterSpacing: 10, x: 90, y: 190, width: 700, height: 42, zIndex: 12, animation: { name: 'fadeIn', duration: 600 }, editable: { content: true } },
      { id: 'st-ln-title', type: 'text', content: '灯河千愿', fontFamily: { $t: 'fonts.cjk' }, fontSize: 120, fontWeight: '800', color: { $t: 'colors.ink' }, lineHeight: 1.1, x: 90, y: 560, width: 800, height: 150, zIndex: 13, animation: { name: 'fadeInUp', duration: 900, delay: 160 }, editable: { content: true, fontSize: { type: 'range', min: 96, max: 124 } } },
      { id: 'st-ln-sub', type: 'text', content: 'Wishes adrift on a river of light.', fontFamily: { $t: 'fonts.display' }, fontSize: 36, color: { $t: 'colors.ink' }, opacity: 0.9, x: 90, y: 745, width: 760, height: 50, zIndex: 12, animation: { name: 'rise', duration: 900, delay: 300 }, editable: { content: true } },

      // 底部 ST 签名标记 + 细分隔线
      { id: 'st-ln-rule', type: 'shape', shapeKind: 'line', x: 90, y: 1172, width: 140, height: 2, fill: { $t: 'colors.lamp1' }, opacity: 0.5, zIndex: 11, animation: { name: 'fadeIn', duration: 700, delay: 400 } },
      { id: 'st-ln-mark', type: 'text', content: 'ST LIGHTS · 灯节', fontFamily: { $t: 'fonts.mono' }, fontSize: 24, color: { $t: 'colors.ink' }, opacity: 0.55, letterSpacing: 4, x: 90, y: 1215, width: 500, height: 36, zIndex: 11, animation: { name: 'fadeIn', duration: 700, delay: 480 }, editable: { content: true } },

      // 全画面极淡颗粒
      { id: 'st-ln-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1350, background: `url("${grainSoft(320, 11, 0.5)}")`, opacity: 0.05, mixBlendMode: 'multiply', zIndex: 20 }
    ]
  }
]

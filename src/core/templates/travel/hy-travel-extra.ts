// src/core/templates/travel/hy-travel-extra.ts —— travel 分类首批补充（2 个 · 城市漫步 + 徒步路线图）
// 口径：城市漫步（4:5 暖纸胶片 + 时间节点路线 + 地图虚位）/ 徒步路线（16:9 深松绿 + 柱状海拔剖面 + 数据胶囊）。
// 与 nature 目录其余模板错开：走「vlog 路书」与「等高线信息图」两条新骨架。
// 规范：颜色全走 token；每套 4 组预设；1080×1350 与 1920×1080 的 virtual 与 default 同值。
import type { Template } from '@/types/types'
import { HEI, SONG, MONO, IMPACT, SANS, grainSoft } from '../_fx/trend'
import { dotsBg } from '../knowledge/_decor'
import { svgUri } from '../_fx/common'

export const hyTravelExtraTemplates: Template[] = [
  // 1. 城市漫步封面 —— vlog 路书：暖纸胶片底 + 三时点路线 + 地图虚位
  {
    id: 'hy-travel-citywalk', name: '城市漫步封面', version: '1.0.0', category: 'travel',
    tags: ['hy', 'travel', 'citywalk', '城市漫步', 'vlog', '4:5'],
    thumbnail: svgUri('<rect width="100" height="125" fill="%23F2EDE4"/><rect x="10" y="12" width="30" height="4" rx="2" fill="%23C8552F"/><rect x="10" y="21" width="40" height="12" rx="1" fill="%232A2620"/><rect x="10" y="38" width="32" height="12" rx="1" fill="%232A2620" opacity="0.7"/><rect x="10" y="60" width="36" height="5" rx="2" fill="%23C8552F"/><circle cx="16" cy="82" r="5" fill="%23C8552F"/><rect x="24" y="81" width="26" height="2" fill="%238A8172"/><circle cx="54" cy="82" r="5" fill="%233D6B5A"/><rect x="62" y="81" width="26" height="2" fill="%238A8172"/><circle cx="92" cy="82" r="5" fill="%23C8552F"/><rect x="10" y="98" width="80" height="14" rx="2" fill="none" stroke="%238A8172" stroke-width="1" stroke-dasharray="4 3"/>', 100, 125),
    tokens: {
      colors: {
        bg: { label: '纸色', default: '#F2EDE4', options: ['#F2EDE4', '#E9F0E8', '#F4EAE6', '#E8EEF4'] },
        ink: { label: '主文字', default: '#2A2620', options: ['#2A2620', '#1E2A22', '#2E1F22', '#1A2430'] },
        accent: { label: '砖红', default: '#C8552F', options: ['#C8552F', '#3F8A63', '#C25B7E', '#3A6EA8'] },
        accent2: { label: '松绿', default: '#3D6B5A', options: ['#3D6B5A', '#2F7A55', '#A4406B', '#2A4E9B'] },
        dim: { label: '弱文字', default: '#8A8172', options: ['#8A8172', '#6F8577', '#947680', '#6B7A92'] }
      },
      fonts: { heading: { label: '标题字体', default: HEI, options: [HEI, SONG] } }
    },
    presets: [
      { name: '暖纸砖红', colors: { bg: '#F2EDE4', ink: '#2A2620', accent: '#C8552F', accent2: '#3D6B5A', dim: '#8A8172' } },
      { name: '薄荷清晨', colors: { bg: '#E9F0E8', ink: '#1E2A22', accent: '#3F8A63', accent2: '#2F7A55', dim: '#6F8577' } },
      { name: '藕粉黄昏', colors: { bg: '#F4EAE6', ink: '#2E1F22', accent: '#C25B7E', accent2: '#A4406B', dim: '#947680' } },
      { name: '晴空藏青', colors: { bg: '#E8EEF4', ink: '#1A2430', accent: '#3A6EA8', accent2: '#2A4E9B', dim: '#6B7A92' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'cw-glow', type: 'overlay', background: 'radial-gradient(70% 50% at 70% 15%, rgba(200,85,47,0.16) 0%, rgba(200,85,47,0) 70%)', mixBlendMode: 'multiply', opacity: 0.9, x: 0, y: 0, width: 1080, height: 1350, zIndex: 1 },
      { id: 'cw-grain', type: 'image', src: grainSoft(300, 21, 0.5), x: 0, y: 0, width: 1080, height: 1350, objectFit: 'fill', opacity: 0.35, zIndex: 1 },
      { id: 'cw-deco-1', type: 'shape', shapeKind: 'circle', x: 860, y: 180, width: 180, height: 180, border: { width: 2, color: { $t: 'colors.accent' } }, opacity: 0.4, zIndex: 2 },
      { id: 'cw-no', type: 'text', content: 'WALK 07', fontFamily: MONO, fontSize: 26, fontWeight: 700, letterSpacing: 8, color: { $t: 'colors.accent' }, x: 88, y: 88, width: 400, height: 40, zIndex: 4 },
      { id: 'cw-kicker', type: 'text', content: 'CITYWALK · 周末路线', fontFamily: MONO, fontSize: 30, fontWeight: 700, letterSpacing: 5, color: { $t: 'colors.accent2' }, x: 88, y: 175, width: 800, height: 44, zIndex: 4, animation: { name: 'fadeIn', duration: 420 }, editable: { content: true } },
      { id: 'cw-title', type: 'text', content: '用脚步\n读完这座城', fontFamily: { $t: 'fonts.heading' }, fontSize: 132, fontWeight: 900, lineHeight: 1.16, color: { $t: 'colors.ink' }, x: 88, y: 290, width: 880, height: 360, zIndex: 5, animation: { name: 'fadeInUp', duration: 520, delay: 130 }, editable: { content: true, fontSize: { type: 'range', min: 100, max: 150 } } },
      { id: 'cw-deco-2', type: 'text', content: '→', fontFamily: SANS, fontSize: 56, color: { $t: 'colors.accent' }, x: 940, y: 420, width: 80, height: 80, zIndex: 4, animation: { name: 'float', duration: 4000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'cw-rule', type: 'shape', shapeKind: 'rect', x: 88, y: 630, width: 420, height: 10, borderRadius: 5, fill: { $t: 'colors.accent' }, zIndex: 4, animation: { name: 'slideInLeft', duration: 520, delay: 260 } },
      { id: 'cw-sub', type: 'text', content: '8 公里 · 4 家口袋咖啡 · 1 条旧巷', fontFamily: HEI, fontSize: 34, color: { $t: 'colors.dim' }, x: 88, y: 670, width: 860, height: 52, zIndex: 4, animation: { name: 'fadeInUp', duration: 480, delay: 200 }, editable: { content: true } },
      { id: 'cw-n1', group: 'cw-n', type: 'shape', shapeKind: 'circle', x: 140, y: 830, width: 56, height: 56, fill: { $t: 'colors.accent' }, zIndex: 4 },
      { id: 'cw-n1-l', type: 'shape', shapeKind: 'line', x: 196, y: 858, width: 294, height: 2, fill: { $t: 'colors.dim' }, opacity: 0.5, zIndex: 3 },
      { id: 'cw-n2', group: 'cw-n', type: 'shape', shapeKind: 'circle', x: 490, y: 830, width: 56, height: 56, fill: { $t: 'colors.accent2' }, zIndex: 4 },
      { id: 'cw-n2-l', type: 'shape', shapeKind: 'line', x: 546, y: 858, width: 294, height: 2, fill: { $t: 'colors.dim' }, opacity: 0.5, zIndex: 3 },
      { id: 'cw-n3', group: 'cw-n', type: 'shape', shapeKind: 'circle', x: 840, y: 830, width: 56, height: 56, fill: { $t: 'colors.accent' }, zIndex: 4 },
      { id: 'cw-n1-t', type: 'text', content: '07:30', fontFamily: MONO, fontSize: 24, letterSpacing: 2, color: { $t: 'colors.dim' }, textAlign: 'center', x: 78, y: 906, width: 180, height: 32, zIndex: 4, editable: { content: true } },
      { id: 'cw-n2-t', type: 'text', content: '12:10', fontFamily: MONO, fontSize: 24, letterSpacing: 2, color: { $t: 'colors.dim' }, textAlign: 'center', x: 428, y: 906, width: 180, height: 32, zIndex: 4, editable: { content: true } },
      { id: 'cw-n3-t', type: 'text', content: '18:40', fontFamily: MONO, fontSize: 24, letterSpacing: 2, color: { $t: 'colors.dim' }, textAlign: 'center', x: 778, y: 906, width: 180, height: 32, zIndex: 4, editable: { content: true } },
      { id: 'cw-map', type: 'shape', shapeKind: 'rect', x: 88, y: 1000, width: 904, height: 230, borderRadius: 16, border: { width: 2, style: 'dashed', color: { $t: 'colors.dim' } }, zIndex: 3 },
      { id: 'cw-map-t', type: 'text', content: 'MAP SLOT · 拖路线截图进来', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.dim' }, textAlign: 'center', x: 88, y: 1100, width: 904, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'cw-pill', type: 'shape', shapeKind: 'rect', x: 88, y: 1268, width: 200, height: 56, borderRadius: 28, border: { width: 2, color: { $t: 'colors.accent' } }, zIndex: 4 },
      { id: 'cw-pill-t', type: 'text', content: '胶片滤镜', fontFamily: HEI, fontSize: 24, color: { $t: 'colors.accent' }, textAlign: 'center', x: 88, y: 1285, width: 200, height: 36, zIndex: 5, editable: { content: true } },
      { id: 'cw-note', type: 'text', content: 'HY · WALK LAB', fontFamily: MONO, fontSize: 20, letterSpacing: 4, color: { $t: 'colors.accent2' }, opacity: 0.7, x: 760, y: 1290, width: 300, height: 30, zIndex: 4 }
    ]
  },

  // 2. 徒步路线封面 —— 等高线信息图：深松绿 + 柱状海拔剖面 + 数据胶囊
  {
    id: 'hy-travel-hiking', name: '徒步路线封面', version: '1.0.0', category: 'travel',
    tags: ['hy', 'travel', 'hiking', '徒步', '路线', '16:9'],
    thumbnail: svgUri('<rect width="160" height="90" fill="%2316241C"/><rect x="10" y="10" width="30" height="4" rx="2" fill="%23E8A03D"/><rect x="10" y="19" width="36" height="11" rx="1" fill="%23F0F4EC"/><rect x="10" y="34" width="28" height="11" rx="1" fill="%23F0F4EC" opacity="0.7"/><rect x="14" y="58" width="12" height="14" fill="%2393A896" opacity="0.5"/><rect x="44" y="48" width="12" height="24" fill="%236FB58A"/><rect x="74" y="40" width="12" height="32" fill="%23E8A03D"/><rect x="104" y="50" width="12" height="22" fill="%236FB58A"/><rect x="134" y="56" width="12" height="16" fill="%2393A896" opacity="0.5"/><rect x="12" y="72" width="136" height="2" fill="%2393A896"/><rect x="112" y="10" width="38" height="9" rx="4" fill="none" stroke="%23E8A03D" stroke-width="1"/>', 160, 90),
    tokens: {
      colors: {
        bg: { label: '底色', default: '#16241C', options: ['#16241C', '#141F26', '#1C2018', '#121C24'] },
        ink: { label: '主文字', default: '#F0F4EC', options: ['#F0F4EC', '#EAF2F4', '#F2F0E6', '#EAF0FA'] },
        accent: { label: '琥珀', default: '#E8A03D', options: ['#E8A03D', '#3FA8C4', '#E8845C', '#5B8FE0'] },
        accent2: { label: '苔绿', default: '#6FB58A', options: ['#6FB58A', '#3F9EB0', '#C98A5C', '#5A86D6'] },
        dim: { label: '弱文字', default: '#93A896', options: ['#93A896', '#7FA0A8', '#A89888', '#8493AC'] }
      },
      fonts: { heading: { label: '标题字体', default: HEI, options: [HEI, SONG] } }
    },
    presets: [
      { name: '松林琥珀', colors: { bg: '#16241C', ink: '#F0F4EC', accent: '#E8A03D', accent2: '#6FB58A', dim: '#93A896' } },
      { name: '冰湖青', colors: { bg: '#141F26', ink: '#EAF2F4', accent: '#3FA8C4', accent2: '#3F9EB0', dim: '#7FA0A8' } },
      { name: '秋林赭石', colors: { bg: '#1C2018', ink: '#F2F0E6', accent: '#E8845C', accent2: '#C98A5C', dim: '#A89888' } },
      { name: '星夜蓝', colors: { bg: '#121C24', ink: '#EAF0FA', accent: '#5B8FE0', accent2: '#5A86D6', dim: '#8493AC' } }
    ],
    canvas: { virtualWidth: 1920, virtualHeight: 1080, defaultWidth: 1920, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'hk-glow', type: 'overlay', background: 'radial-gradient(60% 50% at 30% 80%, rgba(232,160,61,0.22) 0%, rgba(232,160,61,0) 70%)', mixBlendMode: 'screen', opacity: 0.9, x: 0, y: 0, width: 1920, height: 1080, zIndex: 1 },
      { id: 'hk-dots', type: 'image', src: dotsBg(1920, 1080, 56, 'rgba(255,255,255,0.045)'), x: 0, y: 0, width: 1920, height: 1080, objectFit: 'fill', zIndex: 1 },
      { id: 'hk-no', type: 'text', content: 'TRAIL 04', fontFamily: MONO, fontSize: 26, fontWeight: 700, letterSpacing: 8, color: { $t: 'colors.accent2' }, x: 120, y: 80, width: 400, height: 40, zIndex: 4 },
      { id: 'hk-kicker', type: 'text', content: 'HIKING MAP · 单日往返', fontFamily: MONO, fontSize: 30, fontWeight: 700, letterSpacing: 5, color: { $t: 'colors.accent' }, x: 120, y: 170, width: 820, height: 44, zIndex: 4, animation: { name: 'fadeIn', duration: 420 }, editable: { content: true } },
      { id: 'hk-title', type: 'text', content: '云顶山\n徒步穿越线', fontFamily: { $t: 'fonts.heading' }, fontSize: 130, fontWeight: 900, lineHeight: 1.16, color: { $t: 'colors.ink' }, x: 120, y: 260, width: 900, height: 350, zIndex: 5, animation: { name: 'fadeInUp', duration: 520, delay: 130 }, editable: { content: true, fontSize: { type: 'range', min: 100, max: 150 } } },
      { id: 'hk-p1', type: 'shape', shapeKind: 'rect', x: 1400, y: 80, width: 400, height: 56, borderRadius: 28, border: { width: 2, color: { $t: 'colors.accent' } }, zIndex: 4 },
      { id: 'hk-p1-t', type: 'text', content: '轻装 · 免门票', fontFamily: HEI, fontSize: 24, color: { $t: 'colors.accent' }, textAlign: 'center', x: 1400, y: 96, width: 400, height: 36, zIndex: 5, editable: { content: true } },
      { id: 'hk-p2', type: 'shape', shapeKind: 'rect', x: 1400, y: 156, width: 400, height: 56, borderRadius: 28, border: { width: 2, color: { $t: 'colors.accent2' } }, zIndex: 4 },
      { id: 'hk-p2-t', type: 'text', content: '日出机位 ✓', fontFamily: HEI, fontSize: 24, color: { $t: 'colors.accent2' }, textAlign: 'center', x: 1400, y: 172, width: 400, height: 36, zIndex: 5, editable: { content: true } },
      { id: 'hk-e1', type: 'text', content: '860m', fontFamily: MONO, fontSize: 26, letterSpacing: 2, color: { $t: 'colors.dim' }, textAlign: 'center', x: 110, y: 700, width: 160, height: 36, zIndex: 4 },
      { id: 'hk-e2', type: 'text', content: '1,240m', fontFamily: MONO, fontSize: 26, letterSpacing: 2, color: { $t: 'colors.accent' }, textAlign: 'center', x: 710, y: 620, width: 160, height: 36, zIndex: 4 },
      { id: 'hk-e3', type: 'text', content: '980m', fontFamily: MONO, fontSize: 26, letterSpacing: 2, color: { $t: 'colors.dim' }, textAlign: 'center', x: 1310, y: 690, width: 160, height: 36, zIndex: 4 },
      { id: 'hk-b1', group: 'hk-b', type: 'shape', shapeKind: 'rect', x: 160, y: 740, width: 60, height: 120, borderRadius: 8, fill: { $t: 'colors.dim' }, opacity: 0.5, zIndex: 3 },
      { id: 'hk-b2', group: 'hk-b', type: 'shape', shapeKind: 'rect', x: 460, y: 690, width: 60, height: 170, borderRadius: 8, fill: { $t: 'colors.accent2' }, zIndex: 3, animation: { name: 'rise', duration: 600, delay: 120 } },
      { id: 'hk-b3', group: 'hk-b', type: 'shape', shapeKind: 'rect', x: 760, y: 660, width: 60, height: 200, borderRadius: 8, fill: { $t: 'colors.accent' }, zIndex: 3, animation: { name: 'rise', duration: 600, delay: 200 } },
      { id: 'hk-b4', group: 'hk-b', type: 'shape', shapeKind: 'rect', x: 1060, y: 700, width: 60, height: 160, borderRadius: 8, fill: { $t: 'colors.accent2' }, zIndex: 3, animation: { name: 'rise', duration: 600, delay: 280 } },
      { id: 'hk-b5', group: 'hk-b', type: 'shape', shapeKind: 'rect', x: 1360, y: 730, width: 60, height: 130, borderRadius: 8, fill: { $t: 'colors.dim' }, opacity: 0.5, zIndex: 3 },
      { id: 'hk-b6', group: 'hk-b', type: 'shape', shapeKind: 'rect', x: 1660, y: 760, width: 60, height: 100, borderRadius: 8, fill: { $t: 'colors.dim' }, opacity: 0.4, zIndex: 3 },
      { id: 'hk-base', type: 'shape', shapeKind: 'line', x: 140, y: 864, width: 1660, height: 2, fill: { $t: 'colors.dim' }, opacity: 0.6, zIndex: 3 },
      { id: 'hk-s1', group: 'hk-s', type: 'shape', shapeKind: 'rect', x: 120, y: 940, width: 340, height: 100, borderRadius: 20, fill: 'rgba(255,255,255,0.06)', zIndex: 4 },
      { id: 'hk-s1-k', type: 'text', content: '全程', fontFamily: HEI, fontSize: 24, color: { $t: 'colors.dim' }, x: 140, y: 952, width: 300, height: 30, zIndex: 5, editable: { content: true } },
      { id: 'hk-s1-v', type: 'text', content: '12.6 km', fontFamily: IMPACT, fontSize: 44, color: { $t: 'colors.ink' }, x: 140, y: 1000, width: 300, height: 50, zIndex: 5, editable: { content: true } },
      { id: 'hk-s2', group: 'hk-s', type: 'shape', shapeKind: 'rect', x: 480, y: 940, width: 340, height: 100, borderRadius: 20, fill: 'rgba(255,255,255,0.06)', zIndex: 4 },
      { id: 'hk-s2-k', type: 'text', content: '累计爬升', fontFamily: HEI, fontSize: 24, color: { $t: 'colors.dim' }, x: 500, y: 952, width: 300, height: 30, zIndex: 5, editable: { content: true } },
      { id: 'hk-s2-v', type: 'text', content: '860 m', fontFamily: IMPACT, fontSize: 44, color: { $t: 'colors.accent' }, x: 500, y: 1000, width: 300, height: 50, zIndex: 5, editable: { content: true } },
      { id: 'hk-s3', group: 'hk-s', type: 'shape', shapeKind: 'rect', x: 840, y: 940, width: 340, height: 100, borderRadius: 20, fill: 'rgba(255,255,255,0.06)', zIndex: 4 },
      { id: 'hk-s3-k', type: 'text', content: '用时', fontFamily: HEI, fontSize: 24, color: { $t: 'colors.dim' }, x: 860, y: 952, width: 300, height: 30, zIndex: 5, editable: { content: true } },
      { id: 'hk-s3-v', type: 'text', content: '4h 20m', fontFamily: IMPACT, fontSize: 44, color: { $t: 'colors.ink' }, x: 860, y: 1000, width: 300, height: 50, zIndex: 5, editable: { content: true } },
      { id: 'hk-arrow', type: 'text', content: '↗', fontFamily: SANS, fontSize: 80, color: { $t: 'colors.accent' }, x: 1740, y: 880, width: 100, height: 100, zIndex: 4, animation: { name: 'float', duration: 4200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'hk-note', type: 'text', content: 'HY · TRAIL LAB', fontFamily: MONO, fontSize: 20, letterSpacing: 4, color: { $t: 'colors.dim' }, opacity: 0.6, x: 1400, y: 1010, width: 400, height: 30, zIndex: 4 }
    ]
  },

  // 3. 旅行装备清单封面 —— 打勾清单：方形 checkbox + 重量列 + 总重胶囊
  {
    id: 'hy-travel-gear', name: '旅行装备清单封面', version: '1.0.0', category: 'travel',
    tags: ['hy', 'travel', '装备', '清单', '开箱', '1:1'],
    thumbnail: svgUri('<rect width="100" height="100" fill="%2314201C"/><rect x="10" y="12" width="28" height="4" rx="2" fill="%23E8A03D"/><rect x="10" y="21" width="34" height="12" rx="1" fill="%23EAF2EC"/><rect x="10" y="38" width="28" height="12" rx="1" fill="%23EAF2EC" opacity="0.7"/><rect x="10" y="58" width="10" height="10" rx="2" fill="%23E8A03D"/><path d="M12 63l3 3 5-6" stroke="%2314201C" stroke-width="2" fill="none"/><rect x="26" y="60" width="34" height="4" rx="1" fill="%23EAF2EC"/><rect x="66" y="61" width="22" height="3" rx="1" fill="%238FA89A"/><rect x="10" y="72" width="10" height="10" rx="2" fill="%23E8A03D"/><path d="M12 77l3 3 5-6" stroke="%2314201C" stroke-width="2" fill="none"/><rect x="26" y="74" width="34" height="4" rx="1" fill="%23EAF2EC"/><rect x="66" y="75" width="22" height="3" rx="1" fill="%238FA89A"/><rect x="10" y="86" width="10" height="10" rx="2" fill="none" stroke="%236FB58A" stroke-width="1.5"/><rect x="26" y="88" width="34" height="4" rx="1" fill="%23EAF2EC"/><rect x="66" y="89" width="22" height="3" rx="1" fill="%238FA89A"/>', 100, 100),
    tokens: {
      colors: {
        bg: { label: '底色', default: '#14201C', options: ['#14201C', '#121C24', '#211A12', '#101824'] },
        ink: { label: '主文字', default: '#EAF2EC', options: ['#EAF2EC', '#EAF2F6', '#F5EEE2', '#EAF0FA'] },
        accent: { label: '琥珀', default: '#E8A03D', options: ['#E8A03D', '#4FB8D9', '#E8845C', '#6FA8E8'] },
        accent2: { label: '苔绿', default: '#6FB58A', options: ['#6FB58A', '#6FB5C4', '#C9A05C', '#7A9AD6'] },
        dim: { label: '弱文字', default: '#8FA89A', options: ['#8FA89A', '#84A0AC', '#A89880', '#8493AC'] }
      },
      fonts: { heading: { label: '标题字体', default: HEI, options: [HEI, SONG] } }
    },
    presets: [
      { name: '苔原琥珀', colors: { bg: '#14201C', ink: '#EAF2EC', accent: '#E8A03D', accent2: '#6FB58A', dim: '#8FA89A' } },
      { name: '冰湖青', colors: { bg: '#121C24', ink: '#EAF2F6', accent: '#4FB8D9', accent2: '#6FB5C4', dim: '#84A0AC' } },
      { name: '赭石秋', colors: { bg: '#211A12', ink: '#F5EEE2', accent: '#E8845C', accent2: '#C9A05C', dim: '#A89880' } },
      { name: '夜蓝', colors: { bg: '#101824', ink: '#EAF0FA', accent: '#6FA8E8', accent2: '#7A9AD6', dim: '#8493AC' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1080, defaultWidth: 1080, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'tg-glow', type: 'overlay', background: 'radial-gradient(60% 55% at 50% 20%, rgba(232,160,61,0.20) 0%, rgba(232,160,61,0) 70%)', mixBlendMode: 'screen', opacity: 0.9, x: 0, y: 0, width: 1080, height: 1080, zIndex: 1 },
      { id: 'tg-dots', type: 'image', src: dotsBg(1080, 1080, 44, 'rgba(255,255,255,0.045)'), x: 0, y: 0, width: 1080, height: 1080, objectFit: 'fill', zIndex: 1 },
      { id: 'tg-no', type: 'text', content: 'PACK 03', fontFamily: MONO, fontSize: 26, fontWeight: 700, letterSpacing: 8, color: { $t: 'colors.accent2' }, x: 88, y: 80, width: 420, height: 40, zIndex: 4 },
      { id: 'tg-kicker', type: 'text', content: 'PACKING LIST · 三天两夜', fontFamily: MONO, fontSize: 30, fontWeight: 700, letterSpacing: 4, color: { $t: 'colors.accent' }, x: 88, y: 170, width: 820, height: 44, zIndex: 4, animation: { name: 'fadeIn', duration: 420 }, editable: { content: true } },
      { id: 'tg-title', type: 'text', content: '出门\n带什么', fontFamily: { $t: 'fonts.heading' }, fontSize: 140, fontWeight: 900, lineHeight: 1.16, color: { $t: 'colors.ink' }, x: 88, y: 200, width: 880, height: 380, zIndex: 5, animation: { name: 'fadeInUp', duration: 520, delay: 130 }, editable: { content: true, fontSize: { type: 'range', min: 110, max: 160 } } },
      { id: 'tg-rule', type: 'shape', shapeKind: 'rect', x: 88, y: 520, width: 400, height: 10, borderRadius: 5, fill: { $t: 'colors.accent' }, zIndex: 4, animation: { name: 'slideInLeft', duration: 520, delay: 260 } },
      { id: 'tg-b1', group: 'tg-b', type: 'shape', shapeKind: 'rect', x: 88, y: 550, width: 36, height: 36, borderRadius: 8, fill: { $t: 'colors.accent' }, opacity: 0.25, border: { width: 2, color: { $t: 'colors.accent' } }, zIndex: 4 },
      { id: 'tg-c1', type: 'text', content: '✓', fontFamily: SANS, fontSize: 26, color: { $t: 'colors.accent' }, textAlign: 'center', x: 88, y: 564, width: 36, height: 30, zIndex: 5 },
      { id: 'tg-n1', type: 'text', content: '快充头 + 线', fontFamily: HEI, fontSize: 34, color: { $t: 'colors.ink' }, x: 150, y: 540, width: 560, height: 46, zIndex: 4, editable: { content: true } },
      { id: 'tg-w1', type: 'text', content: '210g', fontFamily: MONO, fontSize: 24, color: { $t: 'colors.dim' }, textAlign: 'right', x: 760, y: 542, width: 240, height: 32, zIndex: 4, editable: { content: true } },
      { id: 'tg-b2', group: 'tg-b', type: 'shape', shapeKind: 'rect', x: 88, y: 625, width: 36, height: 36, borderRadius: 8, fill: { $t: 'colors.accent' }, opacity: 0.25, border: { width: 2, color: { $t: 'colors.accent' } }, zIndex: 4 },
      { id: 'tg-c2', type: 'text', content: '✓', fontFamily: SANS, fontSize: 26, color: { $t: 'colors.accent' }, textAlign: 'center', x: 88, y: 639, width: 36, height: 30, zIndex: 5 },
      { id: 'tg-n2', type: 'text', content: '速干衣 ×2', fontFamily: HEI, fontSize: 34, color: { $t: 'colors.ink' }, x: 150, y: 615, width: 560, height: 46, zIndex: 4, editable: { content: true } },
      { id: 'tg-w2', type: 'text', content: '380g', fontFamily: MONO, fontSize: 24, color: { $t: 'colors.dim' }, textAlign: 'right', x: 760, y: 617, width: 240, height: 32, zIndex: 4, editable: { content: true } },
      { id: 'tg-b3', group: 'tg-b', type: 'shape', shapeKind: 'rect', x: 88, y: 700, width: 36, height: 36, borderRadius: 8, fill: { $t: 'colors.accent' }, opacity: 0.25, border: { width: 2, color: { $t: 'colors.accent' } }, zIndex: 4 },
      { id: 'tg-c3', type: 'text', content: '✓', fontFamily: SANS, fontSize: 26, color: { $t: 'colors.accent' }, textAlign: 'center', x: 88, y: 714, width: 36, height: 30, zIndex: 5 },
      { id: 'tg-n3', type: 'text', content: '分装洗护', fontFamily: HEI, fontSize: 34, color: { $t: 'colors.ink' }, x: 150, y: 690, width: 560, height: 46, zIndex: 4, editable: { content: true } },
      { id: 'tg-w3', type: 'text', content: '240g', fontFamily: MONO, fontSize: 24, color: { $t: 'colors.dim' }, textAlign: 'right', x: 760, y: 692, width: 240, height: 32, zIndex: 4, editable: { content: true } },
      { id: 'tg-b4', group: 'tg-b', type: 'shape', shapeKind: 'rect', x: 88, y: 775, width: 36, height: 36, borderRadius: 8, border: { width: 2, color: { $t: 'colors.accent2' } }, zIndex: 4 },
      { id: 'tg-n4', type: 'text', content: '相机 + 备用电池', fontFamily: HEI, fontSize: 34, color: { $t: 'colors.ink' }, x: 150, y: 765, width: 560, height: 46, zIndex: 4, editable: { content: true } },
      { id: 'tg-w4', type: 'text', content: '620g', fontFamily: MONO, fontSize: 24, color: { $t: 'colors.dim' }, textAlign: 'right', x: 760, y: 767, width: 240, height: 32, zIndex: 4, editable: { content: true } },
      { id: 'tg-b5', group: 'tg-b', type: 'shape', shapeKind: 'rect', x: 88, y: 850, width: 36, height: 36, borderRadius: 8, border: { width: 2, color: { $t: 'colors.accent2' } }, zIndex: 4 },
      { id: 'tg-n5', type: 'text', content: '轻量化帐篷', fontFamily: HEI, fontSize: 34, color: { $t: 'colors.ink' }, x: 150, y: 840, width: 560, height: 46, zIndex: 4, editable: { content: true } },
      { id: 'tg-w5', type: 'text', content: '1.2kg', fontFamily: MONO, fontSize: 24, color: { $t: 'colors.dim' }, textAlign: 'right', x: 760, y: 842, width: 240, height: 32, zIndex: 4, editable: { content: true } },
      { id: 'tg-b6', group: 'tg-b', type: 'shape', shapeKind: 'rect', x: 88, y: 925, width: 36, height: 36, borderRadius: 8, border: { width: 2, color: { $t: 'colors.accent2' } }, zIndex: 4 },
      { id: 'tg-n6', type: 'text', content: '急救包', fontFamily: HEI, fontSize: 34, color: { $t: 'colors.ink' }, x: 150, y: 915, width: 560, height: 46, zIndex: 4, editable: { content: true } },
      { id: 'tg-w6', type: 'text', content: '180g', fontFamily: MONO, fontSize: 24, color: { $t: 'colors.dim' }, textAlign: 'right', x: 760, y: 917, width: 240, height: 32, zIndex: 4, editable: { content: true } },
      { id: 'tg-total', type: 'shape', shapeKind: 'rect', x: 88, y: 990, width: 904, height: 70, borderRadius: 20, fill: 'rgba(255,255,255,0.06)', zIndex: 4 },
      { id: 'tg-total-k', type: 'text', content: '总重（不含相机）', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.dim' }, x: 120, y: 1004, width: 400, height: 32, zIndex: 5, editable: { content: true } },
      { id: 'tg-total-v', type: 'text', content: '2.9 kg', fontFamily: IMPACT, fontSize: 48, color: { $t: 'colors.accent' }, x: 560, y: 1000, width: 400, height: 52, zIndex: 5, editable: { content: true } },
      { id: 'tg-note', type: 'text', content: 'HY · PACK LAB', fontFamily: MONO, fontSize: 20, letterSpacing: 4, color: { $t: 'colors.dim' }, opacity: 0.6, x: 740, y: 100, width: 300, height: 30, zIndex: 4 }
    ]
  },
  // 3. 城市美食巡礼 —— 9:16 味觉路书：标题组 + 6 家店（店名/招牌）+ 路线小结
  {
    id: 'hy-travel-foodie', name: '城市美食巡礼', version: '1.0.0', category: 'travel',
    tags: ['hy', 'travel', 'food', '美食', '探店', '9:16'],
    thumbnail: svgUri('<rect width="100" height="160" fill="%23F4EAE2"/><rect x="10" y="14" width="26" height="4" rx="2" fill="%23C8552F"/><rect x="10" y="22" width="40" height="12" rx="1" fill="%232A2620"/><rect x="10" y="40" width="34" height="12" rx="1" fill="%232A2620" opacity="0.7"/><circle cx="18" cy="74" r="5" fill="%23C8552F"/><rect x="28" y="71" width="34" height="3" fill="%238A8172"/><circle cx="18" cy="90" r="5" fill="%233D6B5A"/><rect x="28" y="87" width="34" height="3" fill="%238A8172"/><circle cx="18" cy="106" r="5" fill="%23C8552F"/><rect x="28" y="103" width="34" height="3" fill="%238A8172"/>', 100, 160),
    tokens: {
      colors: {
        bg: { label: '纸色', default: '#F4EAE2', options: ['#F4EAE2', '#E9F0E8', '#F2EDE4', '#E8EEF4'] },
        ink: { label: '主文字', default: '#2A2620', options: ['#2A2620', '#1E2A22', '#2A2620', '#1A2430'] },
        accent: { label: '砖红', default: '#C8552F', options: ['#C8552F', '#3F8A63', '#C25B7E', '#3A6EA8'] },
        accent2: { label: '松绿', default: '#3D6B5A', options: ['#3D6B5A', '#2F7A55', '#A4406B', '#2A4E9B'] },
        dim: { label: '弱文字', default: '#8A8172', options: ['#8A8172', '#6F8577', '#947680', '#6B7A92'] }
      },
      fonts: { heading: { label: '标题字体', default: HEI, options: [HEI, SONG] } }
    },
    presets: [
      { name: '暖纸砖红', colors: { bg: '#F4EAE2', ink: '#2A2620', accent: '#C8552F', accent2: '#3D6B5A', dim: '#8A8172' } },
      { name: '薄荷清晨', colors: { bg: '#E9F0E8', ink: '#1E2A22', accent: '#3F8A63', accent2: '#2F7A55', dim: '#6F8577' } },
      { name: '藕粉黄昏', colors: { bg: '#F2EDE4', ink: '#2A2620', accent: '#C25B7E', accent2: '#A4406B', dim: '#947680' } },
      { name: '晴空藏青', colors: { bg: '#E8EEF4', ink: '#1A2430', accent: '#3A6EA8', accent2: '#2A4E9B', dim: '#6B7A92' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1920, defaultWidth: 1080, defaultHeight: 1920, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'mfd-glow', type: 'overlay', background: 'radial-gradient(70% 50% at 70% 15%, rgba(200,85,47,0.16) 0%, rgba(200,85,47,0) 70%)', mixBlendMode: 'multiply', opacity: 0.9, x: 0, y: 0, width: 1080, height: 1920, zIndex: 1 },
      { id: 'mfd-grain', type: 'image', src: grainSoft(300, 21, 0.5), x: 0, y: 0, width: 1080, height: 1920, objectFit: 'fill', opacity: 0.32, zIndex: 1 },
      { id: 'mfd-no', type: 'text', content: 'EAT 09', fontFamily: MONO, fontSize: 26, fontWeight: 700, letterSpacing: 8, color: { $t: 'colors.accent' }, x: 88, y: 80, width: 400, height: 40, zIndex: 4 },
      { id: 'mfd-note', type: 'text', content: 'HY · EAT LAB', fontFamily: MONO, fontSize: 20, letterSpacing: 4, color: { $t: 'colors.dim' }, opacity: 0.65, x: 700, y: 84, width: 300, height: 30, zIndex: 4 },
      { id: 'mfd-kicker', type: 'text', content: 'FOOD TRAIL · 城市味觉路线', fontFamily: MONO, fontSize: 30, fontWeight: 700, letterSpacing: 5, color: { $t: 'colors.accent2' }, x: 88, y: 175, width: 820, height: 44, zIndex: 4, animation: { name: 'fadeIn', duration: 420 }, editable: { content: true } },
      { id: 'mfd-title', type: 'text', content: '用胃\n记住一座城', fontFamily: { $t: 'fonts.heading' }, fontSize: 140, fontWeight: 900, lineHeight: 1.16, color: { $t: 'colors.ink' }, x: 88, y: 280, width: 880, height: 360, zIndex: 5, animation: { name: 'fadeInUp', duration: 520, delay: 130 }, editable: { content: true, fontSize: { type: 'range', min: 100, max: 160 } } },
      { id: 'mfd-rule', type: 'shape', shapeKind: 'rect', x: 88, y: 628, width: 380, height: 10, borderRadius: 5, fill: { $t: 'colors.accent' }, zIndex: 4, animation: { name: 'slideInLeft', duration: 520, delay: 260 } },
      { id: 'mfd-sub', type: 'text', content: '6 家店 · 1 天吃透', fontFamily: HEI, fontSize: 36, color: { $t: 'colors.dim' }, x: 88, y: 672, width: 900, height: 54, zIndex: 4, editable: { content: true } },
      { id: 'mfd-r1-i', type: 'text', content: '01', fontFamily: MONO, fontSize: 30, color: { $t: 'colors.accent2' }, x: 88, y: 770, width: 64, height: 44, zIndex: 4 },
      { id: 'mfd-r1-n', type: 'text', content: '陈记锅贴', fontFamily: HEI, fontSize: 34, color: { $t: 'colors.ink' }, x: 170, y: 770, width: 520, height: 46, zIndex: 4, editable: { content: true } },
      { id: 'mfd-r1-t', type: 'text', content: '招牌 · 12 元', fontFamily: MONO, fontSize: 26, color: { $t: 'colors.dim' }, textAlign: 'right', x: 700, y: 772, width: 292, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'mfd-r2-i', type: 'text', content: '02', fontFamily: MONO, fontSize: 30, color: { $t: 'colors.accent2' }, x: 88, y: 848, width: 64, height: 44, zIndex: 4 },
      { id: 'mfd-r2-n', type: 'text', content: '巷口豆浆', fontFamily: HEI, fontSize: 34, color: { $t: 'colors.ink' }, x: 170, y: 848, width: 520, height: 46, zIndex: 4, editable: { content: true } },
      { id: 'mfd-r2-t', type: 'text', content: '甜浆 · 6 元', fontFamily: MONO, fontSize: 26, color: { $t: 'colors.dim' }, textAlign: 'right', x: 700, y: 850, width: 292, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'mfd-r3-i', type: 'text', content: '03', fontFamily: MONO, fontSize: 30, color: { $t: 'colors.accent2' }, x: 88, y: 926, width: 64, height: 44, zIndex: 4 },
      { id: 'mfd-r3-n', type: 'text', content: '老周烧腊', fontFamily: HEI, fontSize: 34, color: { $t: 'colors.ink' }, x: 170, y: 926, width: 520, height: 46, zIndex: 4, editable: { content: true } },
      { id: 'mfd-r3-t', type: 'text', content: '双拼 · 38 元', fontFamily: MONO, fontSize: 26, color: { $t: 'colors.dim' }, textAlign: 'right', x: 700, y: 928, width: 292, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'mfd-r4-i', type: 'text', content: '04', fontFamily: MONO, fontSize: 30, color: { $t: 'colors.accent2' }, x: 88, y: 1004, width: 64, height: 44, zIndex: 4 },
      { id: 'mfd-r4-n', type: 'text', content: '海边大排档', fontFamily: HEI, fontSize: 34, color: { $t: 'colors.ink' }, x: 170, y: 1004, width: 520, height: 46, zIndex: 4, editable: { content: true } },
      { id: 'mfd-r4-t', type: 'text', content: '小炒 · 人均 60', fontFamily: MONO, fontSize: 26, color: { $t: 'colors.dim' }, textAlign: 'right', x: 700, y: 1006, width: 292, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'mfd-r5-i', type: 'text', content: '05', fontFamily: MONO, fontSize: 30, color: { $t: 'colors.accent2' }, x: 88, y: 1082, width: 64, height: 44, zIndex: 4 },
      { id: 'mfd-r5-n', type: 'text', content: '阿婆糖水', fontFamily: HEI, fontSize: 34, color: { $t: 'colors.ink' }, x: 170, y: 1082, width: 520, height: 46, zIndex: 4, editable: { content: true } },
      { id: 'mfd-r5-t', type: 'text', content: '双皮奶 · 15 元', fontFamily: MONO, fontSize: 26, color: { $t: 'colors.dim' }, textAlign: 'right', x: 700, y: 1084, width: 292, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'mfd-r6-i', type: 'text', content: '06', fontFamily: MONO, fontSize: 30, color: { $t: 'colors.accent2' }, x: 88, y: 1160, width: 64, height: 44, zIndex: 4 },
      { id: 'mfd-r6-n', type: 'text', content: '夜市烤串', fontFamily: HEI, fontSize: 34, color: { $t: 'colors.ink' }, x: 170, y: 1160, width: 520, height: 46, zIndex: 4, editable: { content: true } },
      { id: 'mfd-r6-t', type: 'text', content: '人均 · 45 元', fontFamily: MONO, fontSize: 26, color: { $t: 'colors.dim' }, textAlign: 'right', x: 700, y: 1162, width: 292, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'mfd-foot', type: 'text', content: '路线 4.2 km · 全步行可达', fontFamily: MONO, fontSize: 26, color: { $t: 'colors.dim' }, x: 88, y: 1280, width: 900, height: 40, zIndex: 4, editable: { content: true } }
    ]
  },
  // 4. 旅行花费账单 —— 4:5 明细条：标题组 + 5 类支出（标签/金额/占比条）+ 合计
  {
    id: 'hy-travel-budget', name: '旅行花费账单', version: '1.0.0', category: 'travel',
    tags: ['hy', 'travel', 'budget', '花费', '账单', '4:5'],
    thumbnail: svgUri('<rect width="100" height="125" fill="%23EDEFEA"/><rect x="10" y="12" width="26" height="4" rx="2" fill="%233F8A63"/><rect x="10" y="20" width="42" height="12" rx="1" fill="%231E2A22"/><rect x="10" y="38" width="34" height="12" rx="1" fill="%231E2A22" opacity="0.7"/><rect x="10" y="64" width="80" height="6" rx="3" fill="%233F8A63"/><rect x="10" y="78" width="60" height="6" rx="3" fill="%23C8552F"/><rect x="10" y="92" width="40" height="6" rx="3" fill="%233F8A63" opacity="0.7"/><rect x="10" y="106" width="52" height="6" rx="3" fill="%233F8A63" opacity="0.5"/>', 100, 125),
    tokens: {
      colors: {
        bg: { label: '底色', default: '#EDEFEA', options: ['#EDEFEA', '#E9F0E8', '#F2EDE4', '#E8EEF4'] },
        ink: { label: '主文字', default: '#1E2A22', options: ['#1E2A22', '#2A2620', '#1E2A22', '#1A2430'] },
        accent: { label: '绿', default: '#3F8A63', options: ['#3F8A63', '#C8552F', '#3A6EA8', '#C25B7E'] },
        accent2: { label: '砖红', default: '#C8552F', options: ['#C8552F', '#2F7A55', '#2A4E9B', '#A4406B'] },
        dim: { label: '弱文字', default: '#6F8577', options: ['#6F8577', '#8A8172', '#6B7A92', '#947680'] }
      },
      fonts: { heading: { label: '标题字体', default: HEI, options: [HEI, SONG] } }
    },
    presets: [
      { name: '薄荷账单', colors: { bg: '#EDEFEA', ink: '#1E2A22', accent: '#3F8A63', accent2: '#C8552F', dim: '#6F8577' } },
      { name: '暖纸砖红', colors: { bg: '#F2EDE4', ink: '#2A2620', accent: '#C8552F', accent2: '#3D6B5A', dim: '#8A8172' } },
      { name: '晴空藏青', colors: { bg: '#E8EEF4', ink: '#1A2430', accent: '#3A6EA8', accent2: '#2A4E9B', dim: '#6B7A92' } },
      { name: '藕粉黄昏', colors: { bg: '#F4EAE6', ink: '#2E1F22', accent: '#C25B7E', accent2: '#A4406B', dim: '#947680' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'mbg-glow', type: 'overlay', background: 'radial-gradient(70% 50% at 72% 15%, rgba(63,138,99,0.16) 0%, rgba(63,138,99,0) 70%)', mixBlendMode: 'multiply', opacity: 0.9, x: 0, y: 0, width: 1080, height: 1350, zIndex: 1 },
      { id: 'mbg-dots', type: 'image', src: dotsBg(1080, 1350, 46, 'rgba(0,0,0,0.04)'), x: 0, y: 0, width: 1080, height: 1350, objectFit: 'fill', zIndex: 1 },
      { id: 'mbg-no', type: 'text', content: 'COST 09', fontFamily: MONO, fontSize: 26, fontWeight: 700, letterSpacing: 8, color: { $t: 'colors.accent' }, x: 88, y: 80, width: 400, height: 40, zIndex: 4 },
      { id: 'mbg-note', type: 'text', content: 'HY · COST LAB', fontFamily: MONO, fontSize: 20, letterSpacing: 4, color: { $t: 'colors.dim' }, opacity: 0.65, x: 700, y: 84, width: 300, height: 30, zIndex: 4 },
      { id: 'mbg-kicker', type: 'text', content: 'TRIP COST · 花费明细', fontFamily: MONO, fontSize: 30, fontWeight: 700, letterSpacing: 5, color: { $t: 'colors.accent2' }, x: 88, y: 170, width: 820, height: 44, zIndex: 4, animation: { name: 'fadeIn', duration: 420 }, editable: { content: true } },
      { id: 'mbg-title', type: 'text', content: '这趟\n花了多少', fontFamily: { $t: 'fonts.heading' }, fontSize: 130, fontWeight: 900, lineHeight: 1.16, color: { $t: 'colors.ink' }, x: 88, y: 280, width: 880, height: 360, zIndex: 5, animation: { name: 'fadeInUp', duration: 520, delay: 130 }, editable: { content: true, fontSize: { type: 'range', min: 100, max: 150 } } },
      { id: 'mbg-rule', type: 'shape', shapeKind: 'rect', x: 88, y: 608, width: 380, height: 10, borderRadius: 5, fill: { $t: 'colors.accent' }, zIndex: 4, animation: { name: 'slideInLeft', duration: 520, delay: 260 } },
      { id: 'mbg-sub', type: 'text', content: '5 天 4 晚 · 双人出行', fontFamily: HEI, fontSize: 34, color: { $t: 'colors.dim' }, x: 88, y: 652, width: 900, height: 50, zIndex: 4, editable: { content: true } },
      { id: 'mbg-c1-k', type: 'text', content: '交通', fontFamily: HEI, fontSize: 30, color: { $t: 'colors.ink' }, x: 88, y: 740, width: 200, height: 42, zIndex: 4, editable: { content: true } },
      { id: 'mbg-c1-v', type: 'text', content: '¥2,400', fontFamily: MONO, fontSize: 30, color: { $t: 'colors.accent' }, textAlign: 'right', x: 760, y: 740, width: 232, height: 44, zIndex: 4, editable: { content: true } },
      { id: 'mbg-c1-bg', type: 'shape', shapeKind: 'rect', x: 88, y: 788, width: 904, height: 10, borderRadius: 5, fill: { $t: 'colors.dim' }, opacity: 0.22, zIndex: 3 },
      { id: 'mbg-c1-fg', type: 'shape', shapeKind: 'rect', x: 88, y: 788, width: 244, height: 10, borderRadius: 5, fill: { $t: 'colors.accent' }, zIndex: 4 },
      { id: 'mbg-c2-k', type: 'text', content: '住宿', fontFamily: HEI, fontSize: 30, color: { $t: 'colors.ink' }, x: 88, y: 812, width: 200, height: 42, zIndex: 4, editable: { content: true } },
      { id: 'mbg-c2-v', type: 'text', content: '¥3,360', fontFamily: MONO, fontSize: 30, color: { $t: 'colors.accent' }, textAlign: 'right', x: 760, y: 812, width: 232, height: 44, zIndex: 4, editable: { content: true } },
      { id: 'mbg-c2-bg', type: 'shape', shapeKind: 'rect', x: 88, y: 860, width: 904, height: 10, borderRadius: 5, fill: { $t: 'colors.dim' }, opacity: 0.22, zIndex: 3 },
      { id: 'mbg-c2-fg', type: 'shape', shapeKind: 'rect', x: 88, y: 860, width: 344, height: 10, borderRadius: 5, fill: { $t: 'colors.accent' }, zIndex: 4 },
      { id: 'mbg-c3-k', type: 'text', content: '餐饮', fontFamily: HEI, fontSize: 30, color: { $t: 'colors.ink' }, x: 88, y: 884, width: 200, height: 42, zIndex: 4, editable: { content: true } },
      { id: 'mbg-c3-v', type: 'text', content: '¥1,760', fontFamily: MONO, fontSize: 30, color: { $t: 'colors.accent' }, textAlign: 'right', x: 760, y: 884, width: 232, height: 44, zIndex: 4, editable: { content: true } },
      { id: 'mbg-c3-bg', type: 'shape', shapeKind: 'rect', x: 88, y: 932, width: 904, height: 10, borderRadius: 5, fill: { $t: 'colors.dim' }, opacity: 0.22, zIndex: 3 },
      { id: 'mbg-c3-fg', type: 'shape', shapeKind: 'rect', x: 88, y: 932, width: 181, height: 10, borderRadius: 5, fill: { $t: 'colors.accent' }, zIndex: 4 },
      { id: 'mbg-c4-k', type: 'text', content: '门票', fontFamily: HEI, fontSize: 30, color: { $t: 'colors.ink' }, x: 88, y: 956, width: 200, height: 42, zIndex: 4, editable: { content: true } },
      { id: 'mbg-c4-v', type: 'text', content: '¥620', fontFamily: MONO, fontSize: 30, color: { $t: 'colors.accent' }, textAlign: 'right', x: 760, y: 956, width: 232, height: 44, zIndex: 4, editable: { content: true } },
      { id: 'mbg-c4-bg', type: 'shape', shapeKind: 'rect', x: 88, y: 1004, width: 904, height: 10, borderRadius: 5, fill: { $t: 'colors.dim' }, opacity: 0.22, zIndex: 3 },
      { id: 'mbg-c4-fg', type: 'shape', shapeKind: 'rect', x: 88, y: 1004, width: 63, height: 10, borderRadius: 5, fill: { $t: 'colors.accent' }, zIndex: 4 },
      { id: 'mbg-c5-k', type: 'text', content: '其他', fontFamily: HEI, fontSize: 30, color: { $t: 'colors.ink' }, x: 88, y: 1028, width: 200, height: 42, zIndex: 4, editable: { content: true } },
      { id: 'mbg-c5-v', type: 'text', content: '¥720', fontFamily: MONO, fontSize: 30, color: { $t: 'colors.accent' }, textAlign: 'right', x: 760, y: 1028, width: 232, height: 44, zIndex: 4, editable: { content: true } },
      { id: 'mbg-c5-bg', type: 'shape', shapeKind: 'rect', x: 88, y: 1076, width: 904, height: 10, borderRadius: 5, fill: { $t: 'colors.dim' }, opacity: 0.22, zIndex: 3 },
      { id: 'mbg-c5-fg', type: 'shape', shapeKind: 'rect', x: 88, y: 1076, width: 72, height: 10, borderRadius: 5, fill: { $t: 'colors.accent' }, zIndex: 4 },
      { id: 'mbg-total', type: 'text', content: '合计  ¥8,860', fontFamily: IMPACT, fontSize: 48, color: { $t: 'colors.accent' }, x: 88, y: 1140, width: 500, height: 54, zIndex: 5, editable: { content: true } }
    ]
  }
]

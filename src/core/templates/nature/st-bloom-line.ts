// src/core/templates/nature/st-bloom-line.ts
// ST 系列 · 植物线描（4:5 竖版）｜ botanical line art：极细线条勾勒花枝、叶片与花形，
// 暖白纸底上偏置构图 + 优雅衬线标题，旧植物图鉴内页般的克制书卷气。
import type { Template } from '@/types/types'
import { SERIF, SONG, MONO, SANS, HEI, grainSoft } from '../_fx/trend'

export const stBloomLineTemplates: Template[] = [
  {
    id: 'st-bloom-line', name: '植物线描', version: '1.0.0', category: 'nature',
    tags: ['st', 'botanical', 'line art', 'floral', 'elegant', '4:5', 'engraving'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="125" viewBox="0 0 100 125"><rect width="100" height="125" fill="%23F4EFE5"/><rect x="10" y="16" width="20" height="1.2" fill="%233B372F" opacity="0.5"/><rect x="10" y="24" width="30" height="3" fill="%233B372F" opacity="0.85"/><rect x="10" y="34" width="24" height="1.1" fill="%233B372F" opacity="0.4"/><rect x="10" y="41" width="27" height="1.1" fill="%233B372F" opacity="0.3"/><rect x="61" y="26" width="1" height="50" fill="%233B372F" opacity="0.65"/><line x1="61" y1="52" x2="43" y2="40" stroke="%233B372F" stroke-width="0.8" opacity="0.55"/><line x1="61" y1="62" x2="79" y2="50" stroke="%233B372F" stroke-width="0.8" opacity="0.55"/><ellipse cx="50" cy="45" rx="9" ry="3" fill="none" stroke="%235C6B4A" stroke-width="0.8" transform="rotate(-42 50 45)"/><ellipse cx="72" cy="55" rx="8" ry="2.6" fill="none" stroke="%235C6B4A" stroke-width="0.8" transform="rotate(42 72 55)"/><ellipse cx="49" cy="63" rx="7.5" ry="2.5" fill="none" stroke="%235C6B4A" stroke-width="0.8" transform="rotate(-36 49 63)"/><ellipse cx="74" cy="69" rx="7" ry="2.4" fill="none" stroke="%235C6B4A" stroke-width="0.8" transform="rotate(36 74 69)"/><ellipse cx="79" cy="47" rx="2.4" ry="3.8" fill="none" stroke="%23B4634A" stroke-width="0.8" transform="rotate(42 79 47)"/><ellipse cx="61" cy="15" rx="5.4" ry="2.1" fill="none" stroke="%23B4634A" stroke-width="0.9" transform="rotate(-90 61 15)"/><ellipse cx="66.2" cy="20.9" rx="5.4" ry="2.1" fill="none" stroke="%23B4634A" stroke-width="0.9" transform="rotate(-18 66.2 20.9)"/><ellipse cx="64.2" cy="27.9" rx="5.4" ry="2.1" fill="none" stroke="%23B4634A" stroke-width="0.9" transform="rotate(54 64.2 27.9)"/><ellipse cx="57.8" cy="27.9" rx="5.4" ry="2.1" fill="none" stroke="%23B4634A" stroke-width="0.9" transform="rotate(126 57.8 27.9)"/><ellipse cx="55.8" cy="20.9" rx="5.4" ry="2.1" fill="none" stroke="%23B4634A" stroke-width="0.9" transform="rotate(198 55.8 20.9)"/><circle cx="61" cy="22" r="1.9" fill="%23A98A4B"/><circle cx="61" cy="22" r="0.7" fill="%233B372F" opacity="0.6"/><rect x="24" y="88" width="0.8" height="16" fill="%233B372F" opacity="0.5"/><ellipse cx="18" cy="94" rx="6" ry="2" fill="none" stroke="%235C6B4A" stroke-width="0.7" transform="rotate(140 18 94)"/><ellipse cx="31" cy="100" rx="5" ry="1.8" fill="none" stroke="%235C6B4A" stroke-width="0.7" transform="rotate(38 31 100)"/><rect x="10" y="112" width="16" height="0.8" fill="%233B372F" opacity="0.4"/><rect x="10" y="115.5" width="11" height="0.7" fill="%233B372F" opacity="0.3"/></svg>',
    tokens: {
      colors: {
        bg: { label: '纸色', default: '#F4EFE5', options: ['#F4EFE5', '#EFE9DC', '#F6F1E6', '#23231F'] },
        ink: { label: '墨色', default: '#3B372F', options: ['#3B372F', '#33302A', '#4A3B2F', '#EDE6D8'] },
        leaf: { label: '叶色', default: '#5C6B4A', options: ['#5C6B4A', '#4E5D3E', '#6B7A55', '#8A9A72'] },
        petal: { label: '瓣色', default: '#B4634A', options: ['#B4634A', '#A85B43', '#C07A5C', '#C98A6E'] },
        accent: { label: '花心', default: '#A98A4B', options: ['#A98A4B', '#96773C', '#B89B5E', '#C9A85E'] },
        muted: { label: '淡影', default: '#C9BFA8', options: ['#C9BFA8', '#BDB39E', '#D2C6AC', '#6E6858'] }
      },
      fonts: {
        display: { label: '英文', default: SERIF, options: [SERIF, SANS, MONO] },
        cjk: { label: '中文', default: SONG, options: [SONG, HEI, SERIF] },
        mono: { label: '等宽', default: MONO, options: [MONO, SERIF, SONG] }
      }
    },
    presets: [
      { name: '纸本草木', colors: { bg: '#F4EFE5', ink: '#3B372F', leaf: '#5C6B4A', petal: '#B4634A', accent: '#A98A4B', muted: '#C9BFA8' } },
      { name: '苔庭晨雾', colors: { bg: '#EFE9DC', ink: '#33302A', leaf: '#4E5D3E', petal: '#A85B43', accent: '#96773C', muted: '#BDB39E' } },
      { name: '赭石花房', colors: { bg: '#F6F1E6', ink: '#4A3B2F', leaf: '#6B7A55', petal: '#C07A5C', accent: '#B89B5E', muted: '#D2C6AC' } },
      { name: '夜色图鉴', colors: { bg: '#23231F', ink: '#EDE6D8', leaf: '#8A9A72', petal: '#C98A6E', accent: '#C9A85E', muted: '#6E6858' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      // ===== 主花枝（中上部偏右）：一茎 + 两分枝 + 一朵五瓣花 + 一枚花苞 =====
      // 主茎（近竖直微倾）
      { id: 'st-bl-stem', type: 'shape', shapeKind: 'line', x: 795, y: 250, width: 2, height: 500, rotation: 1.5, fill: { $t: 'colors.ink' }, opacity: 0.65, zIndex: 1 },
      // 左上分枝
      { id: 'st-bl-br1', type: 'shape', shapeKind: 'line', x: 747, y: 309, width: 1.5, height: 132, rotation: -43, fill: { $t: 'colors.ink' }, opacity: 0.55, zIndex: 1 },
      // 右上分枝
      { id: 'st-bl-br2', type: 'shape', shapeKind: 'line', x: 839, y: 441, width: 1.5, height: 119, rotation: 42, fill: { $t: 'colors.ink' }, opacity: 0.55, zIndex: 1 },
      // 分枝端叶（描边细长椭圆）
      { id: 'st-bl-leaf1', group: 'st-bl-leaf', type: 'shape', shapeKind: 'circle', x: 703, y: 365, width: 95, height: 19, rotation: -43, fill: 'transparent', border: { width: 1.2, color: { $t: 'colors.leaf' } }, opacity: 0.8, zIndex: 2, animation: { name: 'drift', duration: 9200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-bl-leaf2', group: 'st-bl-leaf', type: 'shape', shapeKind: 'circle', x: 796, y: 491, width: 88, height: 18, rotation: 42, fill: 'transparent', border: { width: 1.2, color: { $t: 'colors.leaf' } }, opacity: 0.8, zIndex: 2, animation: { name: 'drift', duration: 9800, iterationCount: 'infinite', easing: 'ease-in-out' } },
      // 花苞（右上分枝末端）+ 托叶
      { id: 'st-bl-bud', type: 'shape', shapeKind: 'circle', x: 875, y: 431, width: 22, height: 34, rotation: 42, fill: 'transparent', border: { width: 1.2, color: { $t: 'colors.petal' } }, opacity: 0.75, zIndex: 2, animation: { name: 'float', duration: 8000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-bl-budleaf', type: 'shape', shapeKind: 'circle', x: 850, y: 459, width: 36, height: 9, rotation: 97, fill: 'transparent', border: { width: 1, color: { $t: 'colors.leaf' } }, opacity: 0.6, zIndex: 2 },
      // 主茎叶片（左右交错，两片填极淡叶色、两片纯描边）
      { id: 'st-bl-leaf3', group: 'st-bl-leaf', type: 'shape', shapeKind: 'circle', x: 700, y: 445, width: 115, height: 23, rotation: 145, fill: { $t: 'colors.leaf' }, opacity: 0.1, border: { width: 1.2, color: { $t: 'colors.leaf' } }, zIndex: 2, animation: { name: 'drift', duration: 9000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-bl-leaf4', group: 'st-bl-leaf', type: 'shape', shapeKind: 'circle', x: 773, y: 479, width: 115, height: 23, rotation: 35, fill: 'transparent', border: { width: 1.2, color: { $t: 'colors.leaf' } }, opacity: 0.8, zIndex: 2, animation: { name: 'drift', duration: 9600, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-bl-leaf5', group: 'st-bl-leaf', type: 'shape', shapeKind: 'circle', x: 693, y: 580, width: 105, height: 21, rotation: 150, fill: 'transparent', border: { width: 1.2, color: { $t: 'colors.leaf' } }, opacity: 0.75, zIndex: 2 },
      { id: 'st-bl-leaf6', group: 'st-bl-leaf', type: 'shape', shapeKind: 'circle', x: 793, y: 630, width: 105, height: 21, rotation: 30, fill: { $t: 'colors.leaf' }, opacity: 0.09, border: { width: 1.2, color: { $t: 'colors.leaf' } }, zIndex: 2 },
      // 茎节小横线（图鉴感）
      { id: 'st-bl-node1', type: 'shape', shapeKind: 'line', x: 784, y: 430, width: 26, height: 1, fill: { $t: 'colors.muted' }, opacity: 0.55, zIndex: 1 },
      { id: 'st-bl-node2', type: 'shape', shapeKind: 'line', x: 784, y: 600, width: 26, height: 1, fill: { $t: 'colors.muted' }, opacity: 0.55, zIndex: 1 },
      // 主花：五片花瓣绕心旋转 + 花心 + 花心点
      { id: 'st-bl-p1', group: 'st-bl-p', type: 'shape', shapeKind: 'circle', x: 740, y: 216, width: 120, height: 44, rotation: -90, fill: 'transparent', border: { width: 1.5, color: { $t: 'colors.petal' } }, opacity: 0.8, zIndex: 3, animation: { name: 'swing', duration: 6400, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-bl-p2', group: 'st-bl-p', type: 'shape', shapeKind: 'circle', x: 799, y: 259, width: 120, height: 44, rotation: -18, fill: 'transparent', border: { width: 1.5, color: { $t: 'colors.petal' } }, opacity: 0.8, zIndex: 3, animation: { name: 'swing', duration: 6600, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-bl-p3', group: 'st-bl-p', type: 'shape', shapeKind: 'circle', x: 775, y: 328, width: 120, height: 44, rotation: 54, fill: 'transparent', border: { width: 1.5, color: { $t: 'colors.petal' } }, opacity: 0.8, zIndex: 3, animation: { name: 'swing', duration: 6800, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-bl-p4', group: 'st-bl-p', type: 'shape', shapeKind: 'circle', x: 705, y: 328, width: 120, height: 44, rotation: 126, fill: 'transparent', border: { width: 1.5, color: { $t: 'colors.petal' } }, opacity: 0.8, zIndex: 3, animation: { name: 'swing', duration: 6500, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-bl-p5', group: 'st-bl-p', type: 'shape', shapeKind: 'circle', x: 681, y: 259, width: 120, height: 44, rotation: 198, fill: 'transparent', border: { width: 1.5, color: { $t: 'colors.petal' } }, opacity: 0.8, zIndex: 3, animation: { name: 'swing', duration: 6700, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-bl-heart', type: 'shape', shapeKind: 'circle', x: 789, y: 289, width: 22, height: 22, fill: { $t: 'colors.accent' }, opacity: 0.9, zIndex: 4, animation: { name: 'pulse', duration: 5200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-bl-heartdot', type: 'shape', shapeKind: 'circle', x: 797, y: 297, width: 6, height: 6, fill: { $t: 'colors.ink' }, opacity: 0.45, zIndex: 5 },
      // ===== 陪衬小枝（左下）：一梗 + 三片小叶 =====
      { id: 'st-bl-sprig', type: 'shape', shapeKind: 'line', x: 212, y: 790, width: 1.5, height: 210, rotation: 6, fill: { $t: 'colors.ink' }, opacity: 0.5, zIndex: 2 },
      { id: 'st-bl-sprig-l1', group: 'st-bl-sprig-l', type: 'shape', shapeKind: 'circle', x: 158, y: 832, width: 84, height: 17, rotation: 142, fill: 'transparent', border: { width: 1, color: { $t: 'colors.leaf' } }, opacity: 0.7, zIndex: 2 },
      { id: 'st-bl-sprig-l2', group: 'st-bl-sprig-l', type: 'shape', shapeKind: 'circle', x: 194, y: 898, width: 76, height: 15, rotation: 38, fill: 'transparent', border: { width: 1, color: { $t: 'colors.leaf' } }, opacity: 0.7, zIndex: 2 },
      { id: 'st-bl-sprig-l3', group: 'st-bl-sprig-l', type: 'shape', shapeKind: 'circle', x: 184, y: 764, width: 64, height: 13, rotation: -18, fill: 'transparent', border: { width: 1, color: { $t: 'colors.leaf' } }, opacity: 0.7, zIndex: 2 },
      // ===== 文字组（统一左对齐 x=90）=====
      { id: 'st-bl-kicker', type: 'text', content: 'BOTANICAL STUDIES', fontFamily: { $t: 'fonts.display' }, fontSize: 20, fontWeight: '400', color: { $t: 'colors.ink' }, opacity: 0.55, letterSpacing: 8, x: 90, y: 150, width: 500, height: 36, zIndex: 6, animation: { name: 'fadeIn', duration: 700, easing: 'ease-out' }, editable: { content: true } },
      { id: 'st-bl-title', type: 'text', content: '草木本纪', fontFamily: { $t: 'fonts.cjk' }, fontSize: 96, fontWeight: '400', color: { $t: 'colors.ink' }, letterSpacing: 14, lineHeight: 1.2, x: 90, y: 196, width: 620, height: 120, zIndex: 6, animation: { name: 'inkReveal', duration: 1200, easing: 'ease-out' }, editable: { content: true, fontSize: { type: 'range', min: 72, max: 112 } } },
      { id: 'st-bl-en', type: 'text', content: 'Line Studies of\nBlossom & Leaf', fontFamily: { $t: 'fonts.display' }, fontSize: 34, fontWeight: '400', color: { $t: 'colors.ink' }, opacity: 0.75, letterSpacing: 2, lineHeight: 1.35, x: 90, y: 320, width: 700, height: 100, zIndex: 6, animation: { name: 'rise', duration: 900, delay: 200, easing: 'ease-out' }, editable: { content: true } },
      { id: 'st-bl-zh', type: 'text', content: '以极细线条，摹写一枝花的开合。', fontFamily: { $t: 'fonts.cjk' }, fontSize: 24, fontWeight: '400', color: { $t: 'colors.ink' }, opacity: 0.75, letterSpacing: 2, lineHeight: 1.2, x: 90, y: 460, width: 620, height: 40, zIndex: 6, animation: { name: 'fadeIn', duration: 800, delay: 300, easing: 'ease-out' }, editable: { content: true } },
      // ===== 底部：细分隔线 + ST 隐性标记 + 图鉴编号 =====
      { id: 'st-bl-rule', type: 'shape', shapeKind: 'line', x: 90, y: 1140, width: 120, height: 1, fill: { $t: 'colors.ink' }, opacity: 0.35, zIndex: 8, animation: { name: 'fadeIn', duration: 700, delay: 400, easing: 'ease-out' } },
      { id: 'st-bl-mark', type: 'text', content: 'ST BOTANICAL 04', fontFamily: { $t: 'fonts.mono' }, fontSize: 18, fontWeight: '400', color: { $t: 'colors.ink' }, opacity: 0.42, letterSpacing: 3, lineHeight: 1.2, x: 90, y: 1160, width: 400, height: 30, zIndex: 9, animation: { name: 'fadeIn', duration: 600, delay: 420, easing: 'ease-out' }, editable: { content: true } },
      { id: 'st-bl-plate', type: 'text', content: 'PL. XXIV', fontFamily: { $t: 'fonts.mono' }, fontSize: 20, fontWeight: '400', color: { $t: 'colors.ink' }, opacity: 0.42, letterSpacing: 4, textAlign: 'right', lineHeight: 1.2, x: 800, y: 1160, width: 190, height: 30, zIndex: 9, animation: { name: 'fadeIn', duration: 600, delay: 420, easing: 'ease-out' }, editable: { content: true } },
      // ===== 纸纤维（极淡）=====
      { id: 'st-bl-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1350, background: `url("${grainSoft(340, 11, 0.5)}")`, opacity: 0.05, mixBlendMode: 'multiply', zIndex: 12 }
    ]
  }
]

// src/core/templates/chinese/chinese.ts —— 水墨留白禅意 + 朱红宫阙格调
import type { Template } from '@/types/types'

// ===== 水墨留白 =====
// 枯笔禅圆（墨环）
const ENSO_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600"><path d="M310 70 A 230 230 0 1 0 460 140" fill="none" stroke="%231c1917" stroke-width="26" stroke-linecap="round" opacity="0.82"/><path d="M310 70 A 230 230 0 1 0 460 140" fill="none" stroke="%231c1917" stroke-width="9" stroke-linecap="round" opacity="0.35" stroke-dasharray="4 18"/><path d="M462 142 q 18 22 12 44" fill="none" stroke="%231c1917" stroke-width="7" stroke-linecap="round" opacity="0.5"/></svg>'
// 远山淡墨
const INK_HILLS_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="240" viewBox="0 0 1000 240"><path d="M-20 240 Q 140 90 300 200 Q 420 120 560 210 L560 240 Z" fill="%2357534e" opacity="0.28"/><path d="M480 240 Q 660 60 820 190 Q 910 140 1020 220 L1020 240 Z" fill="%2357534e" opacity="0.2"/></svg>'
// 梅枝一点
const PLUM_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="360" height="260" viewBox="0 0 360 260"><path d="M10 240 Q 120 170 200 120 T 340 30" fill="none" stroke="%23292524" stroke-width="6" stroke-linecap="round" opacity="0.85"/><path d="M180 132 Q 210 100 226 66 M236 96 Q 270 90 296 70" fill="none" stroke="%23292524" stroke-width="3" stroke-linecap="round" opacity="0.7"/><g fill="%23991b1b"><circle cx="228" cy="62" r="7" opacity="0.9"/><circle cx="298" cy="66" r="5.5" opacity="0.8"/><circle cx="150" cy="158" r="5" opacity="0.75"/></g><g fill="%23f7f4ed" opacity="0.9"><circle cx="226" cy="60" r="2"/><circle cx="296" cy="64" r="1.6"/></g></svg>'
// 宣纸纤维底纹
const RICE_PAPER_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000"><g stroke="%23c7bfa8" stroke-width="1" opacity="0.14"><line x1="60" y1="0" x2="72" y2="1000"/><line x1="240" y1="0" x2="230" y2="1000"/><line x1="430" y1="0" x2="442" y2="1000"/><line x1="640" y1="0" x2="628" y2="1000"/><line x1="830" y1="0" x2="842" y2="1000"/></g><g fill="%23a8a08a" opacity="0.1"><circle cx="150" cy="200" r="2"/><circle cx="540" cy="90" r="1.6"/><circle cx="880" cy="520" r="2.2"/><circle cx="330" cy="640" r="1.8"/></g></svg>'

// ===== IZ_ 前缀：水墨留白专用（少而精，只补层次不抢留白） =====
// 飞白：枯笔横扫，一段段断开
const IZ_FEIBAI_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 64"><g fill="%231c1917">' + Array.from({ length: 11 }, (_, i) => `<rect x="${8 + i * 46}" y="${6 + (i % 3) * 13}" width="${30 + (i % 4) * 12}" height="${2 + (i % 3)}" rx="1" opacity="${(0.1 + (i % 5) * 0.07).toFixed(2)}"/>`).join('') + '</g><path d="M6 46 Q 200 36 514 48" fill="none" stroke="%231c1917" stroke-width="4" stroke-linecap="round" opacity="0.18"/><path d="M40 58 Q 260 52 470 60" fill="none" stroke="%231c1917" stroke-width="2" stroke-linecap="round" opacity="0.12"/></svg>'
// 淡墨云气：垫在禅圆脚下的一段水气
const IZ_MIST_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 150"><g fill="%2357534e" opacity="0.15"><ellipse cx="180" cy="98" rx="178" ry="24"/><ellipse cx="470" cy="72" rx="150" ry="17"/><ellipse cx="742" cy="106" rx="140" ry="21"/></g><g fill="none" stroke="%2357534e" stroke-width="2" opacity="0.2"><path d="M40 122 Q 260 108 460 120 T 872 114"/></g></svg>'
// 竹两竿：极简剪影，只占右上一线
const IZ_BAMBOO_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 460"><g fill="none" stroke="%2344403c" stroke-width="7" stroke-linecap="round" opacity="0.55"><path d="M46 452 L46 302"/><path d="M46 288 L46 152"/><path d="M46 138 L46 14"/></g><g fill="none" stroke="%2344403c" stroke-width="3" stroke-linecap="round" opacity="0.5"><path d="M46 300 Q 92 286 118 252"/><path d="M46 288 Q 84 258 96 218"/><path d="M46 150 Q 14 128 6 90"/><path d="M46 138 Q 80 116 108 108"/></g><g fill="%2344403c" opacity="0.42"><path d="M118 252 Q 136 244 138 230 Q 124 232 112 242 Z"/><path d="M96 218 Q 114 202 110 188 Q 96 198 88 214 Z"/><path d="M6 90 Q 2 70 8 56 Q 16 72 20 86 Z"/><path d="M108 108 Q 128 100 130 88 Q 114 90 100 100 Z"/></g></svg>'
// 溅墨：一滩加两点飞沫
const IZ_SPLATTER_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><g fill="%231c1917"><path d="M46 30 Q 66 22 74 40 Q 84 60 62 68 Q 40 74 34 54 Q 30 38 46 30 Z" opacity="0.14"/><circle cx="88" cy="34" r="5" opacity="0.3"/><circle cx="98" cy="56" r="2.6" opacity="0.34"/><circle cx="24" cy="76" r="3.4" opacity="0.24"/><circle cx="70" cy="86" r="1.8" opacity="0.4"/></g></svg>'

// ===== 朱红宫阙 =====
// 宫檐脊兽剪影 + 瓦当连纹
const EAVES_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="200" viewBox="0 0 1000 200"><path d="M0 150 Q 180 96 340 118 T 660 118 T 1000 150 L1000 200 L0 200 Z" fill="%23f59e0b" opacity="0.9"/><path d="M0 150 Q 180 96 340 118 T 660 118 T 1000 150" fill="none" stroke="%23b45309" stroke-width="4"/><g fill="%23b45309"><circle cx="120" cy="170" r="10"/><circle cx="300" cy="160" r="10"/><circle cx="500" cy="158" r="10"/><circle cx="700" cy="160" r="10"/><circle cx="880" cy="170" r="10"/></g><path d="M40 130 q 10 -34 34 -40 q -2 26 -34 40 z" fill="%23f59e0b"/><path d="M960 130 q -10 -34 -34 -40 q 2 26 34 40 z" fill="%23f59e0b"/></svg>'
// 团寿纹窗棂角饰
const LATTICE_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="170" height="170" viewBox="0 0 170 170"><g fill="none" stroke="%23fbbf24" stroke-width="4"><rect x="14" y="14" width="142" height="142" rx="10"/><path d="M50 14 v142 M120 14 v142 M14 50 h142 M14 120 h142"/><circle cx="85" cy="85" r="26"/></g><circle cx="85" cy="85" r="8" fill="%23fbbf24"/></svg>'
// 如意金云
const GOLD_CLOUD_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="90" viewBox="0 0 300 90"><g fill="none" stroke="%23fcd34d" stroke-width="5" stroke-linecap="round"><path d="M20 62 Q 40 30 76 38 Q 84 12 116 16 Q 146 20 146 46 Q 180 40 190 62"/><path d="M190 62 Q 224 46 254 60 Q 276 68 288 60"/><circle cx="76" cy="46" r="7"/><circle cx="146" cy="50" r="7"/></g></svg>'
// 宫墙粉妆底纹
const PALACE_BG_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000"><g stroke="%23fbbf24" stroke-width="1.5" opacity="0.18"><line x1="0" y1="120" x2="1000" y2="120"/><line x1="0" y1="300" x2="1000" y2="300"/><line x1="0" y1="700" x2="1000" y2="700"/><line x1="0" y1="880" x2="1000" y2="880"/></g><g fill="%23fde68a" opacity="0.12"><circle cx="140" cy="210" r="4"/><circle cx="500" cy="210" r="4"/><circle cx="860" cy="210" r="4"/><circle cx="320" cy="795" r="4"/><circle cx="680" cy="795" r="4"/></g></svg>'

export const chineseTemplates: Template[] = [
{
  id: 'chinese-ink-zen', name: '水墨留白禅意', version: '1.1.0', category: 'chinese', tags: ['chinese', 'ink', 'zen', 'traditional', 'poetry'],
  thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23f7f4ed"/><g fill="%2357534e" opacity="0.14"><ellipse cx="26" cy="66" rx="18" ry="3"/><ellipse cx="64" cy="61" rx="14" ry="2.4"/></g><path d="M4 86 Q 20 66 34 84 Q 46 72 58 86 Z" fill="%2357534e" opacity="0.18"/><path d="M52 86 Q 70 64 84 82 Q 92 76 98 84 L98 88 L52 88 Z" fill="%2357534e" opacity="0.12"/><g fill="none" stroke="%2344403c" stroke-width="2" opacity="0.5"><path d="M78 30 v14 M78 48 v14"/><path d="M78 34 q 6 -3 9 -8 M78 52 q -6 -4 -8 -10" stroke-width="1.2"/></g><circle cx="36" cy="42" r="19" fill="none" stroke="%231c1917" stroke-width="3.6" stroke-dasharray="104 15" transform="rotate(-42 36 42)"/><g fill="%231c1917"><circle cx="17" cy="27" r="3" opacity="0.16"/><circle cx="22" cy="33" r="1.2" opacity="0.3"/><circle cx="13" cy="35" r="0.7" opacity="0.4"/><circle cx="27" cy="20" r="0.9" opacity="0.3"/></g><g fill="%231c1917" opacity="0.4"><rect x="17" y="70" width="27" height="1.4" rx="0.7"/><rect x="23" y="73" width="20" height="1" rx="0.5"/><rect x="15" y="76" width="13" height="0.9" rx="0.45"/></g><g fill="%231c1917"><rect x="58" y="16" width="6.5" height="6.5" rx="1"/><rect x="58" y="26" width="6.5" height="6.5" rx="1"/><rect x="58" y="36" width="6.5" height="6.5" rx="1"/><rect x="58" y="46" width="6.5" height="6.5" rx="1"/></g><g fill="%231c1917" opacity="0.6"><rect x="48" y="34" width="5" height="5" rx="1"/><rect x="48" y="42" width="5" height="5" rx="1"/><rect x="48" y="50" width="5" height="5" rx="1"/><rect x="48" y="58" width="5" height="5" rx="1"/></g><g fill="%231c1917" opacity="0.45"><rect x="12" y="48" width="3.4" height="3.4"/><rect x="12" y="54" width="3.4" height="3.4"/><rect x="12" y="60" width="3.4" height="3.4"/></g><rect x="76" y="16" width="9.5" height="9.5" rx="1" fill="%23991b1b"/><rect x="78" y="18" width="5.5" height="5.5" fill="none" stroke="%23f7f4ed" stroke-width="0.8"/><g stroke="%23f7f4ed" stroke-width="1.1" opacity="0.95"><path d="M79.6 20.2 v3.2 M77.8 21.4 h3.6"/></g><ellipse cx="84" cy="92" rx="5" ry="3" fill="%23991b1b" opacity="0.8" transform="rotate(-8 84 92)"/></svg>',
  tokens: {
    colors: {
      bg: { label: '宣纸', default: '#F7F4ED', options: ['#F7F4ED', '#FAF7F0', '#F0EAD6', '#EEF2F4', '#F2E8D9'] },
      primary: { label: '墨色', default: '#1C1917', options: ['#1C1917', '#292524', '#44403C', '#1E3A8A', '#57534E'] },
      accent: { label: '朱砂', default: '#991B1B', options: ['#991B1B', '#B91C1C', '#DC2626', '#0E7490', '#B45309'] }
    },
    fonts: { heading: { label: '标题字体', default: 'STSong, Songti SC, SimSun, serif', options: ['STSong, Songti SC, SimSun, serif', 'STKaiti, KaiTi, serif', 'SimSun, Songti SC, serif'] } }
  },
  presets: [
    { name: '宣纸墨韵', colors: { bg: '#F7F4ED', primary: '#1C1917', accent: '#991B1B' } },
    { name: '寒灰泪墨', colors: { bg: '#EEF2F4', primary: '#1E3A8A', accent: '#0E7490' } },
    { name: '茶香古鼎', colors: { bg: '#F2E8D9', primary: '#57534E', accent: '#B45309' } },
    { name: '古纸朱痕', colors: { bg: '#F0EAD6', primary: '#292524', accent: '#DC2626' } }
  ],
  canvas: { virtualWidth: 1000, virtualHeight: 1000, defaultWidth: 1000, defaultHeight: 1000, backgroundColor: { $t: 'colors.bg' }, backgroundImage: RICE_PAPER_SVG },
  elements: [
    { id: 'enso', type: 'image', src: ENSO_SVG, objectFit: 'contain', x: 150, y: 200, width: 560, height: 560, zIndex: 1, animation: { name: 'inkReveal', duration: 2200 }, editable: { position: true, size: { type: 'scale' } } },
    { id: 'bamboo', type: 'image', src: IZ_BAMBOO_SVG, objectFit: 'contain', x: 858, y: 226, width: 102, height: 392, opacity: 0.5, zIndex: 1, animation: { name: 'float', duration: 9200, iterationCount: 'infinite', easing: 'ease-in-out' } },
    { id: 'ink-hills', type: 'image', src: INK_HILLS_SVG, objectFit: 'contain', x: 24, y: 654, width: 952, height: 232, zIndex: 1, animation: { name: 'drift', duration: 28000, iterationCount: 'infinite' } },
    // 淡墨云气：把禅圆"坐"进纸里
    { id: 'ink-mist', type: 'image', src: IZ_MIST_SVG, objectFit: 'contain', x: 60, y: 604, width: 880, height: 160, opacity: 0.9, zIndex: 1, animation: { name: 'fadeIn', duration: 1400, delay: 700 } },
    { id: 'plum-branch', type: 'image', src: PLUM_SVG, objectFit: 'contain', x: 560, y: 620, width: 360, height: 260, zIndex: 2, animation: { name: 'float', duration: 8000, iterationCount: 'infinite' } },
    // 飞白两笔：枯笔横扫的下沿
    { id: 'dry-brush', type: 'image', src: IZ_FEIBAI_SVG, objectFit: 'contain', x: 140, y: 700, width: 520, height: 64, rotation: -1.5, opacity: 0.6, zIndex: 2, animation: { name: 'fadeIn', duration: 1000, delay: 1100 } },
    { id: 'dry-brush-2', type: 'image', src: IZ_FEIBAI_SVG, objectFit: 'contain', x: 178, y: 756, width: 300, height: 38, rotation: 2.5, opacity: 0.34, zIndex: 2, animation: { name: 'fadeIn', duration: 1000, delay: 1300 } },
    // 溅墨：左上角一滩三点，与右上朱印对角取势
    { id: 'ink-splatter', type: 'image', src: IZ_SPLATTER_SVG, objectFit: 'contain', x: 104, y: 206, width: 126, height: 126, rotation: -12, opacity: 0.85, zIndex: 2 },
    { id: 'ink-dot', type: 'shape', shapeKind: 'circle', x: 120, y: 130, width: 14, height: 14, fill: { $t: 'colors.primary' }, opacity: 0.7, zIndex: 2, animation: { name: 'pulse', duration: 3200, iterationCount: 'infinite' } },
    { id: 'ink-fleck-1', type: 'shape', shapeKind: 'circle', x: 236, y: 176, width: 9, height: 9, fill: { $t: 'colors.primary' }, opacity: 0.28, zIndex: 2 },
    { id: 'ink-fleck-2', type: 'shape', shapeKind: 'circle', x: 100, y: 338, width: 6, height: 6, fill: { $t: 'colors.primary' }, opacity: 0.36, zIndex: 2 },
    // 朱印：方框 + 印文 + 内双线，右下再压一枚闲章
    { id: 'red-seal', type: 'shape', shapeKind: 'rect', x: 760, y: 140, width: 48, height: 48, fill: { $t: 'colors.accent' }, borderRadius: 4, zIndex: 3, animation: { name: 'fadeIn', duration: 800, delay: 1600 } },
    { id: 'seal-inner', type: 'shape', shapeKind: 'rect', x: 768, y: 148, width: 32, height: 32, border: { color: { $t: 'colors.bg' }, width: 1.5 }, opacity: 0.85, zIndex: 3, animation: { name: 'fadeIn', duration: 800, delay: 1900 } },
    { id: 'corner-seal', type: 'shape', shapeKind: 'circle', x: 880, y: 898, width: 54, height: 34, rotation: -8, fill: { $t: 'colors.accent' }, opacity: 0.82, zIndex: 3, animation: { name: 'fadeIn', duration: 700, delay: 2100 } },
    { id: 'red-seal-text', type: 'text', content: '禅', fontFamily: { $t: 'fonts.heading' }, fontSize: 28, fontWeight: '700', color: '#FFFFFF', textAlign: 'center', x: 760, y: 148, width: 48, height: 48, zIndex: 4, animation: { name: 'fadeIn', duration: 800, delay: 1800 }, editable: { content: true } },
    { id: 'title-vertical-1', type: 'text', content: '万\n物\n生\n长', fontFamily: { $t: 'fonts.heading' }, fontSize: 64, fontWeight: '900', color: { $t: 'colors.primary' }, lineHeight: 1.4, x: 640, y: 140, width: 80, height: 450, zIndex: 5, animation: { name: 'fadeInDown', duration: 900 }, editable: { content: true, fontSize: { type: 'range', min: 48, max: 80 }, position: true } },
    { id: 'title-vertical-2', type: 'text', content: '此\n心\n安\n处', fontFamily: { $t: 'fonts.heading' }, fontSize: 64, fontWeight: '400', color: { $t: 'colors.primary' }, opacity: 0.65, lineHeight: 1.4, x: 520, y: 260, width: 80, height: 450, zIndex: 5, animation: { name: 'fadeInDown', duration: 900, delay: 500 }, editable: { content: true } },
    { id: 'colophon-cn', type: 'text', content: '丙\n午\n夏\n月', fontFamily: { $t: 'fonts.heading' }, fontSize: 18, fontWeight: '500', color: { $t: 'colors.primary' }, opacity: 0.6, lineHeight: 1.4, x: 112, y: 470, width: 26, height: 150, zIndex: 5, animation: { name: 'inkReveal', duration: 1200, delay: 900 }, editable: { content: true } },
    { id: 'poetry-en', type: 'text', content: 'A DROP OF INK BECOMES A MOUNTAIN.', fontFamily: 'Georgia, serif', fontSize: 16, fontWeight: '400', color: { $t: 'colors.primary' }, opacity: 0.5, letterSpacing: 3, x: 100, y: 840, width: 640, height: 30, zIndex: 2, animation: { name: 'fadeIn', duration: 1000, delay: 2000 }, editable: { content: true } }
  ]
},
{
  id: 'chinese-vermilion-palace', name: '朱红宫阙格调', version: '1.1.0', category: 'chinese', tags: ['chinese', 'palace', 'red-gold', 'oriental'],
  thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23881337"/><rect x="15" y="15" width="70" height="70" fill="none" stroke="%23fbbf24" stroke-width="2"/></svg>',
  tokens: {
    colors: {
      bg: { label: '朱红', default: '#7F1D1D', options: ['#7F1D1D', '#991B1B', '#B91C1C', '#78350F', '#1E1B4B'] },
      primary: { label: '宫墙', default: '#FFFFFF', options: ['#FFFFFF', '#FEF3C7', '#FDE68A', '#F5F3FF'] },
      accent: { label: '金箔', default: '#F59E0B', options: ['#F59E0B', '#FBBF24', '#FCD34D', '#EAB308', '#FDE047'] }
    },
    fonts: { heading: { label: '标题字体', default: 'Songti SC, SimSun, STSong, serif', options: ['Songti SC, SimSun, STSong, serif', 'STKaiti, KaiTi, serif', 'STSong, SimSun, serif'] } }
  },
  presets: [
    { name: '朱红鎏金', colors: { bg: '#7F1D1D', primary: '#FFFFFF', accent: '#F59E0B' } },
    { name: '禁城赭棕', colors: { bg: '#78350F', primary: '#FEF3C7', accent: '#FBBF24' } },
    { name: '玄夜金辉', colors: { bg: '#1E1B4B', primary: '#F5F3FF', accent: '#FDE047' } },
    { name: '红墙金瓦', colors: { bg: '#991B1B', primary: '#FDE68A', accent: '#FCD34D' } }
  ],
  canvas: { virtualWidth: 1000, virtualHeight: 1000, defaultWidth: 1000, defaultHeight: 1000, backgroundColor: { $t: 'colors.bg' }, backgroundImage: PALACE_BG_SVG },
  elements: [
    { id: 'outer-frame', type: 'shape', shapeKind: 'rect', x: 44, y: 44, width: 912, height: 912, border: { color: { $t: 'colors.accent' }, width: 2, style: 'double' }, opacity: 0.85, zIndex: 1 },
    { id: 'gold-inner-frame', type: 'shape', shapeKind: 'rect', x: 80, y: 80, width: 840, height: 840, border: { color: { $t: 'colors.accent' }, width: 3, style: 'solid' }, zIndex: 1 },
    { id: 'eaves-top', type: 'image', src: EAVES_SVG, objectFit: 'contain', x: 120, y: 96, width: 760, height: 152, rotation: 180, zIndex: 2, animation: { name: 'fadeInDown', duration: 1100 }, editable: { position: true, size: { type: 'scale' } } },
    { id: 'eaves-bottom', type: 'image', src: EAVES_SVG, objectFit: 'contain', x: 120, y: 760, width: 760, height: 152, zIndex: 2, animation: { name: 'fadeInUp', duration: 1100, delay: 200 }, editable: { position: true, size: { type: 'scale' } } },
    { id: 'lattice-1', group: 'lattice-', type: 'image', src: LATTICE_SVG, objectFit: 'contain', x: 96, y: 96, width: 120, height: 120, opacity: 0.9, zIndex: 2 },
    { id: 'lattice-2', group: 'lattice-', type: 'image', src: LATTICE_SVG, objectFit: 'contain', x: 784, y: 96, width: 120, height: 120, opacity: 0.9, zIndex: 2 },
    { id: 'lattice-3', group: 'lattice-', type: 'image', src: LATTICE_SVG, objectFit: 'contain', x: 96, y: 784, width: 120, height: 120, opacity: 0.9, zIndex: 2 },
    { id: 'lattice-4', group: 'lattice-', type: 'image', src: LATTICE_SVG, objectFit: 'contain', x: 784, y: 784, width: 120, height: 120, opacity: 0.9, zIndex: 2 },
    { id: 'cloud-l', type: 'image', src: GOLD_CLOUD_SVG, objectFit: 'contain', x: 120, y: 300, width: 300, height: 90, zIndex: 2, animation: { name: 'drift', duration: 14000, iterationCount: 'infinite' } },
    { id: 'cloud-r', type: 'image', src: GOLD_CLOUD_SVG, objectFit: 'contain', x: 580, y: 600, width: 300, height: 90, zIndex: 2, animation: { name: 'drift', duration: 17000, delay: 800, iterationCount: 'infinite' } },
    { id: 'sub-badge', type: 'text', content: '东方美学专栏', fontFamily: { $t: 'fonts.heading' }, fontSize: 26, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 6, textAlign: 'center', x: 200, y: 268, width: 600, height: 40, zIndex: 3, animation: { name: 'fadeIn', duration: 900, delay: 700 }, editable: { content: true } },
    { id: 'main-title', type: 'text', content: '大国重器\n盛世风华', fontFamily: { $t: 'fonts.heading' }, fontSize: 76, fontWeight: '900', color: { $t: 'colors.primary' }, letterSpacing: 8, textAlign: 'center', lineHeight: 1.4, x: 150, y: 340, width: 700, height: 260, zIndex: 3, shadow: { color: 'rgba(0,0,0,0.6)', blur: 20, offsetX: 0, offsetY: 8 }, animation: { name: 'shimmer', duration: 4200, iterationCount: 'infinite' }, editable: { content: true, fontSize: { type: 'range', min: 56, max: 96 }, position: true } },
    { id: 'footer-ornament', type: 'text', content: '✦ 东方雅集 · 岁次丙午 ✦', fontFamily: { $t: 'fonts.heading' }, fontSize: 20, fontWeight: '500', color: { $t: 'colors.accent' }, textAlign: 'center', x: 200, y: 700, width: 600, height: 40, zIndex: 3, animation: { name: 'fadeInUp', duration: 900, delay: 1200 }, editable: { content: true } }
  ]
}
]

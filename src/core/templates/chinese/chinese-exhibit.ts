// src/core/templates/chinese/chinese-exhibit.ts —— 展陈·器物批（3 个，高装饰密度）
// 口径：原创 SVG 纹样、实底色块一律走 $t、data URI 内颜色写 %23RRGGBB、竖线用细长 rect 不用 shapeKind:'line'。
import type { Template } from '@/types/types'
import {MONO, SANS, SERIF, grain, star, cloud} from '../_fx/trend'
import { seeded01, svgUri } from '../_fx/common'

const seeded = seeded01

/** 归一化伪随机：返回 0..1（trend 里的 seeded 是原始整数，别混用） */


const KAITI = 'STKaiti, KaiTi, "Kaiti SC", serif'
const HEI = '"PingFang SC", "Microsoft YaHei", "Hiragino Sans GB", sans-serif'



/** 十二瓣莲心：藻井、宝相花的视觉核心，金瓣朱蕊 */
const LOTUS_URI = (() => {
  const petals = Array.from({ length: 12 }, (_, i) => {
    const a = (360 / 12) * i
    return `<path transform="rotate(${a} 170 170)" d="M170 170 Q 140 104 170 28 Q 200 104 170 170 Z" fill="%23E8B45C" opacity="${i % 2 ? 0.5 : 0.92}"/>`
  }).join('')
  const beads = Array.from({ length: 12 }, (_, i) => {
    const rad = (Math.PI * 2 * i) / 12
    return `<circle cx="${(170 + Math.cos(rad) * 58).toFixed(1)}" cy="${(170 + Math.sin(rad) * 58).toFixed(1)}" r="7" fill="%23F5EFE0" opacity="0.85"/>`
  }).join('')
  return svgUri(`<g>${petals}</g><circle cx="170" cy="170" r="34" fill="%23B4442F"/><g>${beads}</g><circle cx="170" cy="170" r="15" fill="%23F5EFE0"/>`, 340, 340)
})()

/** 转角云纹：三弯卷云，贴四角用 */
const CLOUD_URI = svgUri('<g fill="none" stroke="%23E8B45C" stroke-width="7" stroke-linecap="round"><path d="M14 96 Q 14 46 56 40 Q 96 34 100 66 Q 104 94 74 92 Q 52 90 56 70 Q 60 54 76 60"/><path d="M20 112 Q 64 112 96 128" opacity="0.6"/><path d="M118 62 Q 134 40 158 44" opacity="0.5"/></g>', 172, 140)

/** 忍冬纹横带：连续三叶，做上下饰带 */
const HONEYSUCKLE_URI = svgUri('<g fill="none" stroke="%232E8B72" stroke-width="5" stroke-linecap="round"><path d="M0 44 Q 40 6 80 44 T 160 44 T 240 44 T 320 44 T 400 44 T 480 44 T 560 44 T 640 44"/><g fill="%232E8B72" stroke="none"><circle cx="80" cy="44" r="7"/><circle cx="240" cy="44" r="7"/><circle cx="400" cy="44" r="7"/><circle cx="560" cy="44" r="7"/></g><g fill="%23E8B45C" stroke="none"><path d="M160 44 q 16 -26 34 -6 q -16 22 -34 6 Z"/><path d="M320 44 q 16 -26 34 -6 q -16 22 -34 6 Z"/><path d="M480 44 q 16 -26 34 -6 q -16 22 -34 6 Z"/><path d="M640 44 q 16 -26 34 -6 q -16 22 -34 6 Z"/></g></g>', 700, 80)

/** 秦公簋器形：白线全形拓勾线（盖、双耳、腹、方座、扉棱） */
const VESSEL_URI = svgUri(`<g fill="none" stroke="%23FFFFFF" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round">
<circle cx="200" cy="52" r="17"/>
<path d="M96 118 Q 200 58 304 118 Z"/>
<path d="M84 134 L316 134"/>
<ellipse cx="200" cy="250" rx="112" ry="102"/>
<path d="M92 176 Q 34 206 58 262 Q 74 298 108 296"/>
<path d="M308 176 Q 366 206 342 262 Q 326 298 292 296"/>
<path d="M112 352 L288 352 L300 464 L100 464 Z"/>
<path d="M100 464 L300 464" stroke-width="7"/>
<path d="M200 134 L200 152 M124 352 L124 336 M276 352 L276 336" stroke-width="3.5"/>
<g stroke-width="2.6" opacity="0.8"><path d="M104 158 Q 200 142 296 158"/><path d="M104 330 Q 200 348 296 330"/></g>
<g stroke-width="3" opacity="0.9"><path d="M120 372 L280 372 M126 404 L274 404 M132 436 L268 436"/></g>
</g>`, 400, 500)

/** 兽面（饕餮）纹饰带：对称目、角、云螺 */
const TAOTIE_URI = svgUri(`<g fill="none" stroke="%23FFFFFF" stroke-width="3.4" stroke-linecap="round">
<path d="M180 4 L180 22 M170 8 L190 8 M164 16 L196 16"/>
<circle cx="146" cy="30" r="11"/><circle cx="214" cy="30" r="11"/>
<path d="M60 30 Q 96 6 132 22 M300 30 Q 264 6 228 22"/>
<path d="M20 44 Q 40 18 68 34 Q 52 46 62 52 M340 44 Q 320 18 292 34 Q 308 46 298 52"/>
<path d="M96 46 Q 130 56 164 44 M264 46 Q 230 56 196 44"/>
<path d="M116 20 Q 132 4 152 12 M244 20 Q 228 4 208 12" opacity="0.85"/>
</g><g fill="%23FFFFFF" opacity="0.9"><circle cx="146" cy="30" r="4"/><circle cx="214" cy="30" r="4"/></g>`, 360, 60)

/** 版心鱼尾：上下黑鱼尾标记 */
const YUWEI_URI = svgUri('<g fill="%23000000" opacity="0.78"><path d="M40 44 L4 4 L76 4 Z"/><path d="M40 44 L4 84 L76 84 Z" opacity="0.55"/><rect x="38" y="4" width="4" height="40"/></g>', 80, 88)

/** 纸筋：宣纸内杂纤维与细小碎屑 */
const PAPER_STRIP_URI = svgUri('<g stroke="%2357534E" stroke-width="1.3" fill="none" opacity="0.6"><path d="M6 12 Q 120 4 240 12 T 470 10"/><path d="M10 20 Q 150 28 300 19 T 468 22"/></g><g fill="%2357534E" opacity="0.5"><circle cx="90" cy="8" r="1.7"/><circle cx="210" cy="18" r="1.4"/><circle cx="330" cy="9" r="1.9"/><circle cx="410" cy="20" r="1.5"/></g>', 480, 28)

export const chineseExhibitTemplates: Template[] = [
  // 1. 藻井穹顶（9:16）—— 层层方井套叠、联珠绕莲
  {
    id: 'chinese-caisson-zenith', name: '藻井穹顶', version: '1.0.0', category: 'chinese',
    tags: ['chinese', 'dunhuang', 'caisson', 'ornament', '9:16'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="178" viewBox="0 0 100 178"><rect width="100" height="178" fill="%231C3A52"/><g fill="none" stroke="%23E8B45C" stroke-width="2"><rect x="16" y="46" width="68" height="68"/><rect x="24" y="54" width="52" height="52" transform="rotate(45 50 88)"/></g><g fill="none" stroke="%232E8B72" stroke-width="2"><rect x="32" y="62" width="36" height="36"/></g><circle cx="50" cy="88" r="12" fill="%23B4442F"/><circle cx="50" cy="88" r="5" fill="%23F5EFE0"/><rect x="22" y="132" width="56" height="5" fill="%23E8B45C"/><rect x="30" y="144" width="40" height="3" fill="%23F5EFE0" opacity="0.6"/></svg>',
    tokens: {
      colors: {
        bg: { label: '窟顶青', default: '#1C3A52', options: ['#1C3A52', '#2A1B42', '#4A1F2B', '#123328', '#0F172A'] },
        gold: { label: '鎏金', default: '#E8B45C', options: ['#E8B45C', '#FDE68A', '#F0C46A', '#F59E0B'] },
        jade: { label: '石绿', default: '#2E8B72', options: ['#2E8B72', '#14B8A6', '#7DD3C0', '#A78BFA'] },
        cinnabar: { label: '朱砂', default: '#B4442F', options: ['#B4442F', '#DC2626', '#E4573D', '#B45309'] },
        paper: { label: '粉壁', default: '#F5EFE0', options: ['#F5EFE0', '#FFF7E8', '#F0F7EE', '#E7E5E4'] }
      },
      fonts: { heading: { label: '标题字体', default: KAITI, options: [KAITI, SERIF, SANS] } }
    },
    presets: [
      { name: '石青鎏金', colors: { bg: '#1C3A52', gold: '#E8B45C', jade: '#2E8B72', cinnabar: '#B4442F', paper: '#F5EFE0' } },
      { name: '紫夜宝相', colors: { bg: '#2A1B42', gold: '#FDE68A', jade: '#A78BFA', cinnabar: '#E4573D', paper: '#F7F3E8' } },
      { name: '朱壁残彩', colors: { bg: '#4A1F2B', gold: '#F0C46A', jade: '#7DD3C0', cinnabar: '#DC2626', paper: '#FFF7E8' } },
      { name: '松石初唐', colors: { bg: '#123328', gold: '#E8B45C', jade: '#14B8A6', cinnabar: '#B45309', paper: '#F0F7EE' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1920, defaultWidth: 1080, defaultHeight: 1920, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      // —— 方井套叠：外框 → 六重旋转方环 → 八角星 → 联珠 → 莲心
      { id: 'cz-frame-out', type: 'shape', shapeKind: 'rect', x: 44, y: 44, width: 992, height: 1832, fill: 'rgba(0,0,0,0)', border: { color: { $t: 'colors.gold' }, width: 3, style: 'solid' }, opacity: 0.75, zIndex: 2 },
      { id: 'cz-frame-in', type: 'shape', shapeKind: 'rect', x: 66, y: 66, width: 948, height: 1788, fill: 'rgba(0,0,0,0)', border: { color: { $t: 'colors.cinnabar' }, width: 2, style: 'solid' }, opacity: 0.8, zIndex: 2 },
      ...Array.from({ length: 6 }, (_, i) => {
        const s = 880 - i * 104
        return { id: `cz-ring-${i}`, type: 'shape', shapeKind: 'rect', x: 540 - s / 2, y: 760 - s / 2, width: s, height: s, rotation: i % 2 ? 45 : 0, fill: 'rgba(0,0,0,0)', border: { color: i % 3 === 1 ? { $t: 'colors.jade' } as any : { $t: 'colors.gold' } as any, width: 20 - i * 2, style: 'solid' }, opacity: 0.92, zIndex: 3, animation: { name: i < 2 ? 'zoomIn' : 'fadeIn', duration: 700 + i * 120, delay: i * 130 } }
      }) as any,
      ...[22.5, 67.5].map((rot, i) => {
        const s = 452
        return { id: `cz-star-${i}`, type: 'shape', shapeKind: 'rect', x: 540 - s / 2, y: 760 - s / 2, width: s, height: s, rotation: rot, fill: 'rgba(0,0,0,0)', border: { color: { $t: 'colors.cinnabar' }, width: 7, style: 'solid' }, opacity: 0.85, zIndex: 4, animation: { name: 'fadeIn', duration: 800, delay: 700 + i * 140 } }
      }) as any,
      { id: 'cz-halo', type: 'shape', shapeKind: 'circle', x: 330, y: 550, width: 420, height: 420, fill: { $t: 'colors.cinnabar' }, opacity: 0.22, zIndex: 4, animation: { name: 'pulse', duration: 4200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'cz-halo-2', type: 'shape', shapeKind: 'circle', x: 386, y: 606, width: 308, height: 308, fill: { $t: 'colors.jade' }, opacity: 0.3, zIndex: 4 },
      { id: 'cz-lotus', type: 'image', src: LOTUS_URI, objectFit: 'contain', x: 375, y: 595, width: 330, height: 330, zIndex: 6, animation: { name: 'spinSlow', duration: 64000, iterationCount: 'infinite', easing: 'linear' }, editable: { position: true, size: { type: 'scale' } } },
      // 联珠绕莲：24 颗金朱相间，错时闪
      ...Array.from({ length: 24 }, (_, i) => {
        const rad = (Math.PI * 2 * i) / 24, r = 252, s = i % 2 ? 14 : 21
        return { id: `cz-bead-${i}`, type: 'shape', shapeKind: 'circle', x: 540 + Math.cos(rad) * r - s / 2, y: 760 + Math.sin(rad) * r - s / 2, width: s, height: s, fill: i % 3 === 0 ? { $t: 'colors.cinnabar' } : { $t: 'colors.gold' }, opacity: 0.9, zIndex: 5, animation: { name: 'twinkle', duration: 2400 + (i % 5) * 320, delay: i * 90, iterationCount: 'infinite' } }
      }) as any,
      // 四角云纹
      ...[0, 1, 2, 3].map(i => {
        const x = i % 2 ? 908 : 44, y = i < 2 ? 44 : 1736
        return { id: `cz-cloud-${i}`, type: 'image', src: CLOUD_URI, objectFit: 'contain', x, y, width: 130, height: 106, rotation: i * 90, zIndex: 5, opacity: 0.8, animation: { name: 'fadeIn', duration: 900, delay: 900 + i * 120 } }
      }) as any,
      // 上下忍冬饰带
      { id: 'cz-band-top', type: 'image', src: HONEYSUCKLE_URI, objectFit: 'fill', x: 150, y: 1176, width: 780, height: 84, opacity: 0.85, zIndex: 5 },
      { id: 'cz-band-bottom', type: 'image', src: HONEYSUCKLE_URI, objectFit: 'fill', x: 150, y: 1706, width: 780, height: 84, rotation: 180, opacity: 0.55, zIndex: 5 },
      // 两侧竖读题名
      { id: 'cz-side-l', type: 'text', content: '窟\n顶', fontFamily: KAITI, fontSize: 44, fontWeight: '700', color: { $t: 'colors.paper' }, opacity: 0.5, textAlign: 'center', lineHeight: 1.5, x: 96, y: 700, width: 62, height: 140, zIndex: 6 },
      { id: 'cz-side-r', type: 'text', content: '方\n井', fontFamily: KAITI, fontSize: 44, fontWeight: '700', color: { $t: 'colors.paper' }, opacity: 0.5, textAlign: 'center', lineHeight: 1.5, x: 922, y: 700, width: 62, height: 140, zIndex: 6 },
      // —— 文字区
      { id: 'cz-kicker', type: 'text', content: '莫高窟第 220 窟 · 初唐 · 斗四八瓣', fontFamily: MONO, fontSize: 26, color: { $t: 'colors.jade' }, letterSpacing: 5, textAlign: 'center', x: 140, y: 1292, width: 800, height: 38, zIndex: 6, animation: { name: 'fadeIn', duration: 800, delay: 1100 }, editable: { content: true } },
      { id: 'cz-title', type: 'text', content: '藻　井', fontFamily: { $t: 'fonts.heading' }, fontSize: 176, fontWeight: '900', color: { $t: 'colors.gold' }, letterSpacing: 10, textAlign: 'center', x: 120, y: 1330, width: 840, height: 226, zIndex: 6, animation: { name: 'inkReveal', duration: 1200 }, editable: { content: true, fontSize: { type: 'range', min: 120, max: 220 }, position: true } },
      { id: 'cz-rule', type: 'shape', shapeKind: 'rect', x: 380, y: 1562, width: 320, height: 2, fill: { $t: 'colors.gold' }, opacity: 0.6, zIndex: 6 },
      { id: 'cz-sub', type: 'text', content: 'CAISSON · 仰见天穹', fontFamily: SANS, fontSize: 30, color: { $t: 'colors.paper' }, opacity: 0.8, letterSpacing: 6, textAlign: 'center', x: 140, y: 1582, width: 800, height: 42, zIndex: 6, editable: { content: true, fontSize: { type: 'range', min: 22, max: 44 } } },
      { id: 'cz-body', type: 'text', content: '方井套叠、八瓣分流，联珠绕着莲心。\n古人把一整座星空倒扣在窟顶。', fontFamily: HEI, fontSize: 27, color: { $t: 'colors.paper' }, opacity: 0.62, lineHeight: 1.8, textAlign: 'center', x: 130, y: 1632, width: 820, height: 112, zIndex: 6, animation: { name: 'fadeInUp', duration: 900, delay: 1350 }, editable: { content: true, fontSize: { type: 'range', min: 20, max: 36 }, position: true } },
      { id: 'cz-seal', type: 'shape', shapeKind: 'rect', x: 900, y: 1806, width: 92, height: 92, fill: { $t: 'colors.cinnabar' }, borderRadius: 6, opacity: 0.94, zIndex: 7, animation: { name: 'zoomIn', duration: 600, delay: 1600 } },
      { id: 'cz-seal-t', type: 'text', content: '珍', fontFamily: KAITI, fontSize: 56, fontWeight: '700', color: '#FFFFFF', textAlign: 'center', x: 900, y: 1815, width: 92, height: 76, zIndex: 8 },
      { id: 'cz-foot', type: 'text', content: '敦煌纹样档案 / PLATE 01', fontFamily: MONO, fontSize: 22, color: { $t: 'colors.gold' }, opacity: 0.55, letterSpacing: 3, x: 108, y: 1826, width: 520, height: 32, zIndex: 7, editable: { content: true } },
      { id: 'cz-grain', type: 'overlay', x: 44, y: 44, width: 992, height: 1832, background: `url("${grain(320, 11, 0.8)}")`, opacity: 0.14, mixBlendMode: 'overlay', zIndex: 9 }
    ]
  },
  // 2. 全形拓·秦公簋（4:5）—— 墨块作底、白线勾器形、铭文竖列、展陈标注
  {
    id: 'chinese-bronze-rubbing', name: '全形拓·秦公簋', version: '1.0.0', category: 'chinese',
    tags: ['chinese', 'bronze', 'rubbing', 'epigraphy', '4:5'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="125" viewBox="0 0 100 125"><rect width="100" height="125" fill="%23EFE6D2"/><rect x="14" y="18" width="72" height="56" fill="%231C1917"/><g fill="none" stroke="%23EFE6D2" stroke-width="1.6"><ellipse cx="50" cy="46" rx="18" ry="14"/><path d="M32 34 h-6 M68 34 h6 M40 60 l-4 12 M60 60 l4 12 M50 60 v12"/></g><g fill="%231C1917"><rect x="20" y="82" width="2" height="22"/><rect x="27" y="82" width="2" height="22"/><rect x="34" y="82" width="2" height="22"/></g><rect x="62" y="82" width="22" height="22" fill="%23B4442F" opacity="0.85"/></svg>',
    tokens: {
      colors: {
        bg: { label: '拓纸', default: '#EFE6D2', options: ['#EFE6D2', '#F5EFE0', '#E7E0CF', '#EDE0D4'] },
        ink: { label: '墨拓', default: '#1C1917', options: ['#1C1917', '#111827', '#2B2118', '#0F172A'] },
        verdigris: { label: '铜绿', default: '#3E6B5A', options: ['#3E6B5A', '#0D9488', '#4D7C0F', '#155E75'] },
        cinnabar: { label: '朱印', default: '#B4442F', options: ['#B4442F', '#C2410C', '#BE123C', '#9F1239'] }
      },
      fonts: { heading: { label: '标题字体', default: SERIF, options: [SERIF, KAITI, SANS] } }
    },
    presets: [
      { name: '古拓原色', colors: { bg: '#EFE6D2', ink: '#1C1917', verdigris: '#3E6B5A', cinnabar: '#B4442F' } },
      { name: '冷金旧墨', colors: { bg: '#E7E0CF', ink: '#111827', verdigris: '#155E75', cinnabar: '#9F1239' } },
      { name: '茶纸朱砂', colors: { bg: '#EDE0D4', ink: '#2B2118', verdigris: '#4D7C0F', cinnabar: '#C2410C' } },
      { name: '青绿生坑', colors: { bg: '#F5EFE0', ink: '#0F172A', verdigris: '#0D9488', cinnabar: '#BE123C' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'br-block', type: 'shape', shapeKind: 'rect', x: 88, y: 148, width: 904, height: 700, fill: { $t: 'colors.ink' }, zIndex: 2, shadow: { color: 'rgba(28,25,23,0.32)', blur: 26, offsetX: 0, offsetY: 12 } },
      { id: 'br-block-frame', type: 'shape', shapeKind: 'rect', x: 106, y: 166, width: 868, height: 664, fill: 'rgba(0,0,0,0)', border: { color: '#FFFFFF', width: 2, style: 'solid' }, opacity: 0.34, zIndex: 3 },
      { id: 'br-vessel', type: 'image', src: VESSEL_URI, objectFit: 'contain', x: 176, y: 214, width: 400, height: 560, opacity: 0.95, zIndex: 4, animation: { name: 'fadeIn', duration: 1100 }, editable: { position: true, size: { type: 'scale' } } },
      // 器盖与腹部的纹饰带
      { id: 'br-taotie-1', type: 'image', src: TAOTIE_URI, objectFit: 'fill', x: 196, y: 396, width: 360, height: 54, opacity: 0.9, zIndex: 5 },
      { id: 'br-taotie-2', type: 'image', src: TAOTIE_URI, objectFit: 'fill', x: 196, y: 566, width: 360, height: 54, opacity: 0.7, zIndex: 5 },
      // 铭文三列（白字，右起）
      ...['唯王正月初吉丁辰', '公作宝簋眉寿无疆', '子子孙孙永宝用之'].map((col, i) => (
        { id: `br-ming-${i}`, type: 'text', content: col.split('').join('\n'), fontFamily: KAITI, fontSize: 34, fontWeight: '700', color: '#FFFFFF', opacity: 0.88, textAlign: 'center', lineHeight: 1.24, x: 838 - i * 118, y: 214, width: 76, height: 610, zIndex: 5, animation: { name: 'fadeIn', duration: 900, delay: 400 + i * 260 }, editable: { content: true } }
      )) as any,
      { id: 'br-ming-cap', type: 'text', content: '铭文三十字', fontFamily: MONO, fontSize: 22, color: '#FFFFFF', opacity: 0.5, textAlign: 'right', x: 636, y: 838, width: 320, height: 32, zIndex: 5 },
      // 尺寸标注
      { id: 'br-dim', type: 'shape', shapeKind: 'rect', x: 176, y: 884, width: 400, height: 2, fill: { $t: 'colors.ink' }, opacity: 0.5, zIndex: 4 },
      { id: 'br-dim-l', type: 'shape', shapeKind: 'rect', x: 176, y: 872, width: 2, height: 26, fill: { $t: 'colors.ink' }, opacity: 0.5, zIndex: 4 },
      { id: 'br-dim-r', type: 'shape', shapeKind: 'rect', x: 574, y: 872, width: 2, height: 26, fill: { $t: 'colors.ink' }, opacity: 0.5, zIndex: 4 },
      { id: 'br-dim-t', type: 'text', content: '口径 22.1 cm　·　通高 24.6 cm', fontFamily: MONO, fontSize: 23, color: { $t: 'colors.ink' }, opacity: 0.62, textAlign: 'center', x: 156, y: 906, width: 440, height: 34, zIndex: 4, editable: { content: true } },
      // 标题与释文
      { id: 'br-kicker', type: 'text', content: 'EPIGRAPHY ARCHIVE · 西周 早期 · 陕西出土', fontFamily: MONO, fontSize: 24, color: { $t: 'colors.verdigris' }, letterSpacing: 3, x: 88, y: 62, width: 700, height: 36, zIndex: 4, editable: { content: true } },
      { id: 'br-title', type: 'text', content: '秦公簋全形拓', fontFamily: { $t: 'fonts.heading' }, fontSize: 84, fontWeight: '900', color: { $t: 'colors.ink' }, letterSpacing: 6, x: 86, y: 96, width: 908, height: 106, zIndex: 4, animation: { name: 'inkReveal', duration: 1100 }, editable: { content: true, fontSize: { type: 'range', min: 56, max: 104 }, position: true } },
      { id: 'br-rule', type: 'shape', shapeKind: 'rect', x: 88, y: 974, width: 904, height: 1, fill: { $t: 'colors.ink' }, opacity: 0.28, zIndex: 4 },
      { id: 'br-expl-title', type: 'text', content: '释文', fontFamily: KAITI, fontSize: 34, fontWeight: '700', color: { $t: 'colors.verdigris' }, letterSpacing: 6, x: 88, y: 996, width: 200, height: 48, zIndex: 4 },
      { id: 'br-body', type: 'text', content: '惟十又一月，秦公作其皇且（祖）公，鼎（禀）不配（丕）配，令（命）其（受）命于天，畯（峻）在位，簋实八簋，用享于皇祖，永保用享。', fontFamily: KAITI, fontSize: 27, color: { $t: 'colors.ink' }, opacity: 0.72, lineHeight: 1.78, x: 88, y: 1046, width: 640, height: 148, zIndex: 4, animation: { name: 'fadeInUp', duration: 900, delay: 700 }, editable: { content: true, fontSize: { type: 'range', min: 20, max: 36 }, position: true } },
      { id: 'br-photo', type: 'image', src: '/images/photo/bronze-vessel-plate-300x240.jpg', objectFit: 'cover', x: 758, y: 1004, width: 234, height: 186, rotation: 2, borderRadius: 4, zIndex: 4, border: { color: '#FFFFFF', width: 6, style: 'solid' }, shadow: { color: 'rgba(28,25,23,0.24)', blur: 16, offsetX: 0, offsetY: 6 }, editable: { src: { type: 'upload' }, position: true, size: { type: 'scale' } } },
      { id: 'br-photo-t', type: 'text', content: '器形实摄 · 侧面', fontFamily: MONO, fontSize: 20, color: { $t: 'colors.ink' }, opacity: 0.5, textAlign: 'center', rotation: 2, x: 758, y: 1200, width: 234, height: 30, zIndex: 5 },
      // 藏印两方 + 编号
      { id: 'br-seal-1', type: 'shape', shapeKind: 'rect', x: 862, y: 172, width: 96, height: 96, fill: { $t: 'colors.cinnabar' }, opacity: 0.9, borderRadius: 4, rotation: -3, zIndex: 6, animation: { name: 'zoomIn', duration: 600, delay: 1200 } },
      { id: 'br-seal-1t', type: 'text', content: '藏珍', fontFamily: KAITI, fontSize: 38, fontWeight: '700', color: '#FFFFFF', textAlign: 'center', lineHeight: 1.25, rotation: -3, x: 866, y: 184, width: 88, height: 72, zIndex: 7 },
      { id: 'br-seal-2', type: 'shape', shapeKind: 'circle', x: 760, y: 232, width: 68, height: 68, fill: 'rgba(0,0,0,0)', border: { color: { $t: 'colors.cinnabar' }, width: 4, style: 'solid' }, opacity: 0.8, rotation: 6, zIndex: 6 },
      { id: 'br-seal-2t', type: 'text', content: '考', fontFamily: KAITI, fontSize: 34, color: { $t: 'colors.cinnabar' }, textAlign: 'center', rotation: 6, x: 762, y: 248, width: 64, height: 42, zIndex: 7 },
      { id: 'br-foot', type: 'text', content: '拓本编号 T-0417 / 旧藏 二 轩 · 一 九 二 三 年 重 拓', fontFamily: MONO, fontSize: 22, color: { $t: 'colors.ink' }, opacity: 0.45, letterSpacing: 2, x: 88, y: 1256, width: 800, height: 32, zIndex: 4, editable: { content: true } },
      { id: 'br-paper-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1350, background: `url("${grain(300, 5, 0.85)}")`, opacity: 0.12, mixBlendMode: 'multiply', zIndex: 9 }
    ]
  },
  // 3. 藏山阁跋尾（1:1）—— 版框界栏、竖排右起、朱笔圈点、鱼尾版心
  {
    id: 'chinese-colophon-page', name: '藏山阁跋尾', version: '1.0.0', category: 'chinese',
    tags: ['chinese', 'rare-book', 'colophon', 'vertical-text', '1:1'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23F5EFE0"/><rect x="12" y="12" width="76" height="76" fill="none" stroke="%231C1917" stroke-width="2"/><g stroke="%231C1917" stroke-width="0.8" opacity="0.4"><line x1="28" y1="14" x2="28" y2="86"/><line x1="44" y1="14" x2="44" y2="86"/><line x1="60" y1="14" x2="60" y2="86"/><line x1="76" y1="14" x2="76" y2="86"/></g><g fill="%231C1917"><rect x="80" y="20" width="5" height="5"/><rect x="80" y="30" width="5" height="5"/><rect x="80" y="40" width="5" height="5"/><rect x="66" y="20" width="5" height="5"/><rect x="66" y="30" width="5" height="5"/></g><circle cx="66" cy="40" r="6" fill="none" stroke="%23B4442F" stroke-width="1.6"/><path d="M46 12 l4 8 l4 -8 z" fill="%231C1917"/></svg>',
    tokens: {
      colors: {
        bg: { label: '纸色', default: '#F5EFE0', options: ['#F5EFE0', '#EFE6D2', '#FAF7EF', '#EDE6D6'] },
        ink: { label: '墨色', default: '#26221C', options: ['#26221C', '#1C1917', '#1F2937', '#3F2E22'] },
        cinnabar: { label: '朱笔', default: '#B4442F', options: ['#B4442F', '#C2410C', '#BE123C', '#A16207'] },
        moss: { label: '藏笺', default: '#5B6B4A', options: ['#5B6B4A', '#3E6B5A', '#4D7C0F', '#57534E'] }
      },
      fonts: { heading: { label: '标题字体', default: KAITI, options: [KAITI, SERIF, SANS] } }
    },
    presets: [
      { name: '藏山原本', colors: { bg: '#F5EFE0', ink: '#26221C', cinnabar: '#B4442F', moss: '#5B6B4A' } },
      { name: '旧楮浓墨', colors: { bg: '#EDE6D6', ink: '#1C1917', cinnabar: '#A16207', moss: '#57534E' } },
      { name: '仿宋刻本', colors: { bg: '#FAF7EF', ink: '#1F2937', cinnabar: '#BE123C', moss: '#3E6B5A' } },
      { name: '写经雅集', colors: { bg: '#EFE6D2', ink: '#3F2E22', cinnabar: '#C2410C', moss: '#4D7C0F' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1080, defaultWidth: 1080, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'cp-frame-out', type: 'shape', shapeKind: 'rect', x: 68, y: 62, width: 944, height: 956, fill: 'rgba(0,0,0,0)', border: { color: { $t: 'colors.ink' }, width: 4, style: 'solid' }, opacity: 0.9, zIndex: 2 },
      { id: 'cp-frame-in', type: 'shape', shapeKind: 'rect', x: 80, y: 74, width: 920, height: 932, fill: 'rgba(0,0,0,0)', border: { color: { $t: 'colors.ink' }, width: 1, style: 'solid' }, opacity: 0.55, zIndex: 2 },
      // 界栏八道
      ...Array.from({ length: 8 }, (_, i) => (
        { id: `cp-col-line-${i}`, type: 'shape', shapeKind: 'rect', x: 152 + i * 104, y: 150, width: 1.5, height: 726, fill: { $t: 'colors.ink' }, opacity: 0.34, zIndex: 2 }
      )) as any,
      { id: 'cp-collar-top', type: 'image', src: YUWEI_URI, objectFit: 'contain', x: 500, y: 78, width: 80, height: 44, zIndex: 3 },
      { id: 'cp-collar-bottom', type: 'image', src: YUWEI_URI, objectFit: 'contain', x: 500, y: 958, width: 80, height: 44, rotation: 180, zIndex: 3 },
      { id: 'cp-center-title', type: 'text', content: '卷 三 · 跋', fontFamily: KAITI, fontSize: 26, color: { $t: 'colors.ink' }, opacity: 0.65, textAlign: 'center', x: 456, y: 116, width: 168, height: 34, zIndex: 3 },
      { id: 'cp-center-foot', type: 'text', content: '藏山阁　·　一', fontFamily: MONO, fontSize: 22, color: { $t: 'colors.ink' }, opacity: 0.5, textAlign: 'center', x: 452, y: 924, width: 176, height: 30, zIndex: 3 },
      // 题名两列（右起大字）
      { id: 'cp-title', type: 'text', content: '藏山阁跋尾', fontFamily: { $t: 'fonts.heading' }, fontSize: 58, fontWeight: '900', color: { $t: 'colors.ink' }, textAlign: 'center', lineHeight: 1.32, x: 934, y: 152, width: 78, height: 396, zIndex: 4, animation: { name: 'inkReveal', duration: 1200 }, editable: { content: true, fontSize: { type: 'range', min: 40, max: 72 } } },
      { id: 'cp-title-2', type: 'text', content: '矩堂居士记', fontFamily: KAITI, fontSize: 34, color: { $t: 'colors.moss' }, textAlign: 'center', lineHeight: 1.32, x: 846, y: 152, width: 56, height: 350, zIndex: 4, animation: { name: 'fadeIn', duration: 900, delay: 500 }, editable: { content: true } },
      // 正文六列（竖排，右起）
      ...['余少时得此本于厂肆，', '纸墨如新，中阙数叶，', '以焦山本补之。深夜展', '卷，窗雨滴沥，忽疑古', '人把酒对坐，为之一哂。', '癸卯九月十有七日，灯下。'].map((col, i) => (
        { id: `cp-text-${i}`, type: 'text', content: col.split('').join('\n'), fontFamily: { $t: 'fonts.heading' } as any, fontSize: 31, color: { $t: 'colors.ink' } as any, opacity: 0.86, textAlign: 'center', lineHeight: 1.24, x: 758 - i * 92, y: 164, width: 62, height: 700, zIndex: 4, animation: { name: 'fadeIn', duration: 800, delay: 300 + i * 170 }, editable: { content: true, fontSize: { type: 'range', min: 22, max: 40 }, position: true } }
      )) as any,
      // 朱笔圈点（句与眼）
      ...[[758, 164], [758, 348], [666, 228], [482, 474], [390, 348]].map((p, i) => (
        { id: `cp-quan-${i}`, type: 'shape', shapeKind: 'circle', x: p[0] + 8, y: p[1] + 6, width: 46, height: 46, fill: 'rgba(0,0,0,0)', border: { color: { $t: 'colors.cinnabar' }, width: 3, style: 'solid' }, opacity: 0.8, rotation: i % 2 ? 12 : -9, zIndex: 5, animation: { name: 'zoomIn', duration: 500, delay: 1500 + i * 160 } }
      )) as any,
      { id: 'cp-marginalia', type: 'text', content: '语带天機', fontFamily: KAITI, fontSize: 24, color: { $t: 'colors.cinnabar' }, opacity: 0.85, textAlign: 'center', lineHeight: 1.3, x: 200, y: 186, width: 44, height: 130, zIndex: 5, animation: { name: 'fadeIn', duration: 800, delay: 2100 }, editable: { content: true } },
      // 藏印三方
      { id: 'cp-seal-a', type: 'shape', shapeKind: 'rect', x: 104, y: 800, width: 78, height: 78, fill: { $t: 'colors.cinnabar' }, opacity: 0.88, borderRadius: 3, rotation: -2, zIndex: 6 },
      { id: 'cp-seal-at', type: 'text', content: '矩堂', fontFamily: KAITI, fontSize: 30, fontWeight: '700', color: '#FFFFFF', textAlign: 'center', lineHeight: 1.25, rotation: -2, x: 106, y: 812, width: 74, height: 54, zIndex: 7 },
      { id: 'cp-seal-b', type: 'shape', shapeKind: 'rect', x: 104, y: 892, width: 78, height: 40, fill: 'rgba(0,0,0,0)', border: { color: { $t: 'colors.cinnabar' }, width: 3, style: 'solid' }, opacity: 0.8, rotation: 1, zIndex: 6 },
      { id: 'cp-seal-bt', type: 'text', content: '子孙世保', fontFamily: KAITI, fontSize: 19, color: { $t: 'colors.cinnabar' }, textAlign: 'center', rotation: 1, x: 104, y: 900, width: 78, height: 26, zIndex: 7 },
      { id: 'cp-seal-c', type: 'shape', shapeKind: 'circle', x: 196, y: 838, width: 56, height: 56, fill: { $t: 'colors.cinnabar' }, opacity: 0.82, zIndex: 6 },
      { id: 'cp-seal-ct', type: 'text', content: '書', fontFamily: KAITI, fontSize: 30, color: '#FFFFFF', textAlign: 'center', x: 196, y: 848, width: 56, height: 38, zIndex: 7 },
      // 虫蛀点与纸筋
      ...Array.from({ length: 9 }, (_, i) => { const r = seeded(i * 31 + 7); const s = 5 + r() * 9
        return { id: `cp-worm-${i}`, type: 'shape', shapeKind: 'circle', x: 120 + r() * 840, y: 120 + r() * 840, width: s, height: s, fill: { $t: 'colors.ink' }, opacity: 0.1 + r() * 0.12, zIndex: 1 } }).flat() as any,
      { id: 'cp-strip', type: 'image', src: PAPER_STRIP_URI, objectFit: 'fill', x: 214, y: 640, width: 420, height: 22, opacity: 0.5, rotation: -3, zIndex: 1 },
      { id: 'cp-foot', type: 'text', content: '跋尾 / 藏山阁丛书本　·　清　·　六 行 五 十 二 字', fontFamily: MONO, fontSize: 21, color: { $t: 'colors.moss' }, opacity: 0.72, letterSpacing: 1, x: 106, y: 962, width: 640, height: 32, zIndex: 6, editable: { content: true } },
      { id: 'cp-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1080, background: `url("${grain(280, 17, 0.9)}")`, opacity: 0.13, mixBlendMode: 'multiply', zIndex: 9 }
    ]
  },
]

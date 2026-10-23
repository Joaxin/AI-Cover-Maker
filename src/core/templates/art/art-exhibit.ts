// src/core/templates/art/art-exhibit.ts —— 展陈·器物批（艺术风 3 个，高装饰密度）
// 口径：原创 SVG、实底色块走 $t、data URI 内颜色写 %23RRGGBB、伪光晕用同心圆、竖线用细长 rect。
import type { Template } from '@/types/types'
import {MONO, SANS, SERIF, grain} from '../_fx/trend'
import { seeded01, svgUri } from '../_fx/common'

const seeded = seeded01

const HEI = '"PingFang SC", "Microsoft YaHei", "Hiragino Sans GB", sans-serif'
const KAITI = 'STKaiti, KaiTi, "Kaiti SC", serif'

/** 归一化伪随机：返回 0..1（trend 里的 seeded 是原始整数，别混用） */

/** 金缮裂痕：一条走线 + 两处加粗，纯金箔色 */
const KINTSGURI_URI = svgUri('<path d="M60 6 Q 96 62 78 118 Q 62 168 108 214 Q 142 250 128 300" fill="none" stroke="%23C9A227" stroke-width="7" stroke-linecap="round"/><path d="M78 118 Q 118 132 146 112" fill="none" stroke="%23C9A227" stroke-width="4.5" stroke-linecap="round" opacity="0.9"/><circle cx="108" cy="214" r="9" fill="%23E9C763"/>', 200, 320)

/** 裂纹网络放大镜内的冰裂 */
const CRACKLE_URI = svgUri('<g stroke="%235C6B66" stroke-width="2.6" fill="none" opacity="0.85"><path d="M6 40 L64 12 L128 46 L196 20"/><path d="M64 12 L86 78 L40 132 L98 176"/><path d="M128 46 L152 108 L104 130"/><path d="M152 108 L212 132 L180 178 L118 190"/><path d="M86 78 L160 70"/><path d="M40 132 L14 178"/><path d="M180 30 L212 74"/></g>', 220, 200)

/** 观众剪影（展墙前的两个身形，用于比例尺） */
const FIGURE_URI = svgUri('<g fill="%232C2A28"><path d="M34 6 a13 13 0 1 1 0.1 0 Z"/><path d="M20 34 q14 -10 28 0 l6 66 h-14 l-4 -30 -4 30 h-14 l-2 -66 z"/><path d="M14 100 h12 v54 h-12 z" opacity="0.9"/><path d="M42 100 h12 v54 h-12 z" opacity="0.9"/></g>', 70, 158)
const FIGURE_SEAT_URI = svgUri('<g fill="%232C2A28"><circle cx="30" cy="16" r="12"/><path d="M12 40 q18 -12 36 0 l4 34 -10 4 -6 -22 -4 30 h-20 z"/><path d="M18 84 h34 v14 h-34 z"/><path d="M22 98 l-4 34 h10 l4 -30 z"/><path d="M46 98 l12 30 h10 l-14 -30 z"/></g>', 74, 140)

export const artExhibitTemplates: Template[] = [
  // 4. 瓷片开片（3:4）—— 汝窑天青、冰裂纹、支钉痕、金缮修复
  {
    id: 'art-porcelain-shard', name: '瓷片开片', version: '1.0.0', category: 'art',
    tags: ['art', 'porcelain', 'ru-ware', 'crackle', '3:4'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="133" viewBox="0 0 100 133"><rect width="100" height="133" fill="%2328323B"/><circle cx="46" cy="52" r="34" fill="%23A9C4BE"/><circle cx="76" cy="30" r="16" fill="%2328323B"/><g stroke="%235C6B66" stroke-width="1" fill="none" opacity="0.8"><path d="M22 40 L40 26 L58 44 L74 30"/><path d="M40 26 L44 58 L26 74"/></g><path d="M44 58 Q 56 76 46 92" fill="none" stroke="%23C9A227" stroke-width="2.5"/><rect x="12" y="102" width="62" height="20" fill="%23DCCFB6"/></svg>',
    tokens: {
      colors: {
        bg: { label: '展陈绒布', default: '#28323B', options: ['#28323B', '#1F2937', '#33402F', '#3B2F2A'] },
        glaze: { label: '天青釉', default: '#A9C4BE', options: ['#A9C4BE', '#C7DBE4', '#DCE4CE', '#E6DFD0'] },
        crack: { label: '开片纹', default: '#5C6B66', options: ['#5C6B66', '#7C8B95', '#8A7A63', '#4B5D52'] },
        gold: { label: '金缮', default: '#C9A227', options: ['#C9A227', '#E9C763', '#B08D57', '#F0D58A'] },
        label: { label: '展签纸', default: '#DCCFB6', options: ['#DCCFB6', '#EFE6D2', '#E7E5E4', '#D6E0DA'] }
      },
      fonts: { heading: { label: '标题字体', default: SERIF, options: [SERIF, KAITI, SANS] } }
    },
    presets: [
      { name: '汝窑天青', colors: { bg: '#28323B', glaze: '#A9C4BE', crack: '#5C6B66', gold: '#C9A227', label: '#DCCFB6' } },
      { name: '月白冷釉', colors: { bg: '#1F2937', glaze: '#C7DBE4', crack: '#7C8B95', gold: '#E9C763', label: '#E7E5E4' } },
      { name: '粉青春釉', colors: { bg: '#33402F', glaze: '#DCE4CE', crack: '#4B5D52', gold: '#B08D57', label: '#D6E0DA' } },
      { name: '米黄旧瓷', colors: { bg: '#3B2F2A', glaze: '#E6DFD0', crack: '#8A7A63', gold: '#F0D58A', label: '#EFE6D2' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1440, defaultWidth: 1080, defaultHeight: 1440, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      // 射灯假光晕：五层同心圆递降透明度（渲染层没有 blur，只能这么造）
      ...Array.from({ length: 5 }, (_, i) => (
        { id: `ps-glow-${i}`, type: 'shape', shapeKind: 'circle', x: 540 - (150 + i * 88), y: 250 - (150 + i * 88) * .42, width: (150 + i * 88) * 2, height: (150 + i * 88) * .84, fill: '#FFFFFF', opacity: 0.055 - i * 0.008, zIndex: 1 }
      )) as any,
      { id: 'ps-plinth', type: 'shape', shapeKind: 'rect', x: 0, y: 1128, width: 1080, height: 312, fill: 'rgba(0,0,0,0.24)', zIndex: 1 },
      // 瓷片本体：一大圆 + 两枚同底色圆咬出缺角，得到不规则残片轮廓
      { id: 'ps-body', type: 'shape', shapeKind: 'circle', x: 210, y: 300, width: 660, height: 660, fill: { $t: 'colors.glaze' }, zIndex: 3, animation: { name: 'zoomIn', duration: 900 }, shadow: { color: 'rgba(0,0,0,0.42)', blur: 34, offsetX: 0, offsetY: 16 } },
      { id: 'ps-bite-a', type: 'shape', shapeKind: 'circle', x: 750, y: 236, width: 250, height: 250, fill: { $t: 'colors.bg' }, zIndex: 4 },
      { id: 'ps-bite-b', type: 'shape', shapeKind: 'circle', x: 116, y: 792, width: 200, height: 200, fill: { $t: 'colors.bg' }, zIndex: 4 },
      { id: 'ps-bite-c', type: 'shape', shapeKind: 'rect', x: 176, y: 316, width: 128, height: 128, rotation: 38, fill: { $t: 'colors.bg' }, zIndex: 4 },
      // 冰裂：18 条自中心放射 + 4 条弧带（细长 rect 模拟）
      ...Array.from({ length: 18 }, (_, i) => { const r = seeded(i * 37 + 5); const a = (360 / 18) * i + r() * 9; const len = 150 + r() * 190
        return { id: `ps-crack-${i}`, type: 'shape', shapeKind: 'rect', x: 540 - 1.6, y: 630 - len / 2, width: 3.2, height: len, rotation: a, fill: { $t: 'colors.crack' }, opacity: 0.32 + r() * 0.3, zIndex: 5 } }).flat() as any,
      ...Array.from({ length: 4 }, (_, i) => (
        { id: `ps-ring-${i}`, type: 'shape', shapeKind: 'circle', x: 540 - (110 + i * 74), y: 630 - (110 + i * 74), width: (110 + i * 74) * 2, height: (110 + i * 74) * 2, fill: 'rgba(0,0,0,0)', border: { color: { $t: 'colors.crack' }, width: 1.5, style: 'dashed' }, opacity: 0.26, rotation: i * 12, zIndex: 5 }
      )) as any,
      { id: 'ps-kintsugi', type: 'image', src: KINTSGURI_URI, objectFit: 'contain', x: 402, y: 470, width: 220, height: 352, rotation: 14, zIndex: 6, opacity: 0.95, animation: { name: 'shimmer', duration: 5200, iterationCount: 'infinite' }, editable: { position: true, size: { type: 'scale' } } },
      // 支钉痕五枚（香灰胎色）
      ...Array.from({ length: 5 }, (_, i) => { const a = 200 + i * 40
        return { id: `ps-spur-${i}`, type: 'shape', shapeKind: 'circle', x: 540 + Math.cos((a * Math.PI) / 180) * 300 - 17, y: 630 + Math.sin((a * Math.PI) / 180) * 300 - 13, width: 34, height: 26, fill: { $t: 'colors.label' }, opacity: 0.85, rotation: a * 0.4, zIndex: 6 } }).flat() as any,
      // 开片放大镜
      { id: 'ps-lens', type: 'shape', shapeKind: 'circle', x: 690, y: 856, width: 236, height: 236, fill: { $t: 'colors.glaze' }, opacity: 0.96, zIndex: 7, shadow: { color: 'rgba(0,0,0,0.4)', blur: 20, offsetX: 0, offsetY: 8 } },
      { id: 'ps-lens-img', type: 'image', src: CRACKLE_URI, objectFit: 'cover', x: 712, y: 878, width: 192, height: 192, zIndex: 8, opacity: 0.9 },
      { id: 'ps-lens-ring', type: 'shape', shapeKind: 'circle', x: 690, y: 856, width: 236, height: 236, fill: 'rgba(0,0,0,0)', border: { color: { $t: 'colors.gold' }, width: 4, style: 'solid' }, zIndex: 9 },
      { id: 'ps-lens-arm', type: 'shape', shapeKind: 'rect', x: 902, y: 1074, width: 12, height: 116, rotation: -28, fill: { $t: 'colors.gold' }, opacity: 0.85, borderRadius: 6, zIndex: 7 },
      // 展签
      { id: 'ps-label', type: 'shape', shapeKind: 'rect', x: 96, y: 1056, width: 470, height: 214, fill: { $t: 'colors.label' }, borderRadius: 2, zIndex: 7, shadow: { color: 'rgba(0,0,0,0.35)', blur: 18, offsetX: 0, offsetY: 8 }, rotation: -1 },
      { id: 'ps-label-name', type: 'text', content: '汝窑天青釉残片', fontFamily: KAITI, fontSize: 34, fontWeight: '700', color: { $t: 'colors.bg' }, letterSpacing: 2, rotation: -1, x: 122, y: 1084, width: 400, height: 46, zIndex: 8, editable: { content: true } },
      { id: 'ps-label-rule', type: 'shape', shapeKind: 'rect', x: 122, y: 1140, width: 418, height: 1.5, fill: { $t: 'colors.bg' }, opacity: 0.35, rotation: -1, zIndex: 8 },
      { id: 'ps-label-1', type: 'text', content: '北宋 1086—1106　·　河南宝丰清凉寺', fontFamily: HEI, fontSize: 22, color: { $t: 'colors.bg' }, opacity: 0.78, rotation: -1, x: 122, y: 1156, width: 418, height: 32, zIndex: 8, editable: { content: true } },
      { id: 'ps-label-2', type: 'text', content: '径 12.4cm　残件　·　金缮修复三道', fontFamily: MONO, fontSize: 21, color: { $t: 'colors.bg' }, opacity: 0.6, rotation: -1, x: 122, y: 1194, width: 418, height: 30, zIndex: 8, editable: { content: true } },
      { id: 'ps-label-no', type: 'text', content: 'GAL. No. 汝 07', fontFamily: MONO, fontSize: 20, color: { $t: 'colors.bg' }, opacity: 0.45, letterSpacing: 2, rotation: -1, x: 122, y: 1228, width: 418, height: 28, zIndex: 8 },
      // 主文字
      { id: 'ps-kicker', type: 'text', content: 'PORCELAIN FRAGMENT · 开片', fontFamily: MONO, fontSize: 24, color: { $t: 'colors.gold' }, letterSpacing: 6, textAlign: 'center', x: 140, y: 106, width: 800, height: 34, zIndex: 6, editable: { content: true } },
      { id: 'ps-title', type: 'text', content: '雨过天青云破处', fontFamily: { $t: 'fonts.heading' }, fontSize: 92, fontWeight: '900', color: { $t: 'colors.glaze' }, letterSpacing: 6, textAlign: 'center', x: 90, y: 140, width: 900, height: 118, zIndex: 6, animation: { name: 'inkReveal', duration: 1200 }, editable: { content: true, fontSize: { type: 'range', min: 60, max: 112 }, position: true } },
      { id: 'ps-sub', type: 'text', content: '釉面下的那道蓝，只烧一次', fontFamily: MONO, fontSize: 22, color: { $t: 'colors.label' }, opacity: 0.5, letterSpacing: 3, textAlign: 'center', x: 240, y: 258, width: 600, height: 30, zIndex: 6, editable: { content: true } },
      { id: 'ps-foot-l', type: 'text', content: '裂 是 时 间 的 署 名', fontFamily: KAITI, fontSize: 27, color: { $t: 'colors.label' }, opacity: 0.62, letterSpacing: 8, x: 96, y: 1320, width: 480, height: 40, zIndex: 7, animation: { name: 'fadeIn', duration: 900, delay: 900 }, editable: { content: true } },
      { id: 'ps-foot-r', type: 'text', content: '展柜 3 / 灯光 2700K', fontFamily: MONO, fontSize: 21, color: { $t: 'colors.gold' }, opacity: 0.7, textAlign: 'right', letterSpacing: 2, x: 560, y: 1324, width: 424, height: 32, zIndex: 7, editable: { content: true } },
      { id: 'ps-corner', type: 'shape', shapeKind: 'rect', x: 60, y: 60, width: 960, height: 1320, fill: 'rgba(0,0,0,0)', border: { color: { $t: 'colors.gold' }, width: 1.5, style: 'solid' }, opacity: 0.35, zIndex: 10 },
      { id: 'ps-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1440, background: `url("${grain(300, 13, 0.9)}")`, opacity: 0.12, mixBlendMode: 'overlay', zIndex: 11 }
    ]
  },
  // 5. 美术馆展墙（16:9）—— 展厅剖立面：光锥、三件作品、展签、视线标注、长凳与观众
  {
    id: 'art-gallery-wall', name: '美术馆展墙', version: '1.0.0', category: 'art',
    tags: ['art', 'exhibition', 'gallery-wall', 'mohr', '16:9'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="90" viewBox="0 0 160 90"><rect width="160" height="90" fill="%23F2EEE7"/><rect y="72" width="160" height="18" fill="%23B9A88F"/><rect x="20" y="24" width="26" height="34" fill="%232C2A28"/><rect x="23" y="27" width="20" height="28" fill="%23B4552E"/><rect x="64" y="28" width="40" height="28" fill="%232C2A28"/><rect x="67" y="31" width="34" height="22" fill="%233C5A78"/><rect x="120" y="26" width="24" height="30" fill="%232C2A28"/><rect x="123" y="29" width="18" height="24" fill="%23C9A227"/><g fill="%23FFFFFF" opacity="0.5"><polygon points="33,8 22,24 44,24"/><polygon points="84,8 72,28 96,28"/><polygon points="132,8 122,26 142,26"/></g><g fill="%232C2A28"><circle cx="52" cy="66" r="4"/><rect x="46" y="70" width="12" height="16"/></g></svg>',
    tokens: {
      colors: {
        wall: { label: '展墙', default: '#F2EEE7', options: ['#F2EEE7', '#E8E4DC', '#DDE4E6', '#EDE9E2'] },
        floor: { label: '地面', default: '#B9A88F', options: ['#B9A88F', '#A8A29E', '#8C8378', '#C7BFAE'] },
        frame: { label: '画框', default: '#2C2A28', options: ['#2C2A28', '#F5F1E8', '#6B5B3E', '#111827'] },
        art1: { label: '作品一', default: '#B4552E', options: ['#B4552E', '#9A3412', '#7C2D12', '#B91C1C'] },
        art2: { label: '作品二', default: '#3C5A78', options: ['#3C5A78', '#1E3A8A', '#0F766E', '#4C1D95'] },
        art3: { label: '作品三', default: '#C9A227', options: ['#C9A227', '#4D7C0F', '#B45309', '#0D9488'] },
        ink: { label: '标注墨', default: '#3F3B36', options: ['#3F3B36', '#1C1917', '#292524', '#44403C'] }
      },
      fonts: { heading: { label: '标题字体', default: SANS, options: [SANS, SERIF, HEI] } }
    },
    presets: [
      { name: '白盒展厅', colors: { wall: '#F2EEE7', floor: '#B9A88F', frame: '#2C2A28', art1: '#B4552E', art2: '#3C5A78', art3: '#C9A227', ink: '#3F3B36' } },
      { name: '暖灰旧馆', colors: { wall: '#E8E4DC', floor: '#A8A29E', frame: '#6B5B3E', art1: '#9A3412', art2: '#0F766E', art3: '#4D7C0F', ink: '#292524' } },
      { name: '夜场聚光', colors: { wall: '#DDE4E6', floor: '#8C8378', frame: '#111827', art1: '#B91C1C', art2: '#1E3A8A', art3: '#B45309', ink: '#1C1917' } },
      { name: '奶油新馆', colors: { wall: '#EDE9E2', floor: '#C7BFAE', frame: '#F5F1E8', art1: '#7C2D12', art2: '#4C1D95', art3: '#0D9488', ink: '#44403C' } }
    ],
    canvas: { virtualWidth: 1920, virtualHeight: 1080, defaultWidth: 1920, defaultHeight: 1080, backgroundColor: { $t: 'colors.wall' } },
    elements: [
      // 顶部灯槽与三束光锥
      { id: 'gw-track', type: 'shape', shapeKind: 'rect', x: 0, y: 0, width: 1920, height: 34, fill: { $t: 'colors.ink' }, opacity: 0.9, zIndex: 2 },
      ...[300, 960, 1520].map((cx, i) => (
        { id: `gw-cone-${i}`, type: 'image', objectFit: 'fill', src: svgUri(`<polygon points="${cx},34 ${cx - 158},660 ${cx + 158},660" fill="%23FFFFFF" opacity="0.42"/>`, 1920, 700), x: 0, y: 0, width: 1920, height: 700, zIndex: 3, opacity: 0.5, animation: { name: 'shimmer', duration: 6000 + i * 900, iterationCount: 'infinite', easing: 'ease-in-out' } }
      )) as any,
      ...[300, 960, 1520].map((cx, i) => Array.from({ length: 3 }, (_, k) => (
        { id: `gw-halo-${i}-${k}`, type: 'shape', shapeKind: 'circle', x: cx - (96 + k * 74), y: 470 - (96 + k * 74) * 0.62, width: (96 + k * 74) * 2, height: (96 + k * 74) * 1.24, fill: '#FFFFFF', opacity: 0.075 - k * 0.018, zIndex: 3 }
      ))).flat() as any,
      // 挂线（细 rect + 吊环）
      ...[300, 960, 1520].map((cx, i) => [
        { id: `gw-wire-${i}`, type: 'shape', shapeKind: 'rect', x: cx - 1, y: 34, width: 2, height: 250, fill: { $t: 'colors.ink' }, opacity: 0.5, zIndex: 4 },
        { id: `gw-ring-${i}`, type: 'shape', shapeKind: 'circle', x: cx - 7, y: 272, width: 14, height: 14, fill: 'rgba(0,0,0,0)', border: { color: { $t: 'colors.ink' } as any, width: 2.5, style: 'solid' }, opacity: 0.7, zIndex: 4 }
      ]).flat() as any,
      // 作品一：竖幅色域
      { id: 'gw-a1-frame', type: 'shape', shapeKind: 'rect', x: 154, y: 296, width: 292, height: 372, fill: { $t: 'colors.frame' }, zIndex: 5, shadow: { color: 'rgba(0,0,0,0.26)', blur: 22, offsetX: 0, offsetY: 12 }, animation: { name: 'fadeInUp', duration: 900, delay: 200 } },
      { id: 'gw-a1-mat', type: 'shape', shapeKind: 'rect', x: 170, y: 312, width: 260, height: 340, fill: '#FFFFFF', opacity: 0.94, zIndex: 6 },
      { id: 'gw-a1-art', type: 'shape', shapeKind: 'rect', x: 186, y: 328, width: 228, height: 308, fill: { $t: 'colors.art1' }, zIndex: 7 },
      { id: 'gw-a1-shape', type: 'shape', shapeKind: 'circle', x: 224, y: 386, width: 152, height: 152, fill: { $t: 'colors.frame' }, opacity: 0.5, zIndex: 8 },
      { id: 'gw-a1-band', type: 'shape', shapeKind: 'rect', x: 186, y: 556, width: 228, height: 80, fill: '#FFFFFF', opacity: 0.35, zIndex: 8 },
      // 作品二：横幅三联带
      { id: 'gw-a2-frame', type: 'shape', shapeKind: 'rect', x: 682, y: 316, width: 556, height: 332, fill: { $t: 'colors.frame' }, zIndex: 5, shadow: { color: 'rgba(0,0,0,0.26)', blur: 22, offsetX: 0, offsetY: 12 }, animation: { name: 'fadeInUp', duration: 900, delay: 420 } },
      { id: 'gw-a2-art', type: 'shape', shapeKind: 'rect', x: 698, y: 332, width: 524, height: 300, fill: { $t: 'colors.art2' }, zIndex: 6 },
      ...Array.from({ length: 3 }, (_, i) => (
        { id: `gw-a2-band-${i}`, type: 'shape', shapeKind: 'rect', x: 698, y: 332 + i * 100, width: 524, height: 100, fill: i % 2 ? '#FFFFFF' as any : ({ $t: 'colors.art3' } as any), opacity: i % 2 ? 0.16 : 0.55, zIndex: 7 }
      )) as any,
      { id: 'gw-a2-line', type: 'shape', shapeKind: 'rect', x: 698, y: 452, width: 524, height: 3, fill: '#FFFFFF', opacity: 0.6, zIndex: 8 },
      // 作品三：实摄照片
      { id: 'gw-a3-frame', type: 'shape', shapeKind: 'rect', x: 1394, y: 302, width: 252, height: 360, fill: { $t: 'colors.frame' }, zIndex: 5, shadow: { color: 'rgba(0,0,0,0.26)', blur: 22, offsetX: 0, offsetY: 12 }, animation: { name: 'fadeInUp', duration: 900, delay: 640 } },
      { id: 'gw-a3-art', type: 'image', src: '/images/photo/gallery-abstract-canvas-440x620.jpg', objectFit: 'cover', x: 1408, y: 316, width: 224, height: 332, zIndex: 6, editable: { src: { type: 'upload' }, position: true, size: { type: 'scale' } } },
      // 三张展签
      ...[[154, 292, '无题 No.7', 'A. 康纳 · 布面油画'], [682, 556, '山海之间', '陈 矩 · 综合材料 · 2021'], [1394, 252, '窗 光', 'L. 费尔南德斯 · 银盐']].map((c, i) => {
        const x = c[0] as number, w = c[1] as number
        return [
          { id: `gw-lb-${i}`, type: 'shape', shapeKind: 'rect', x, y: 706, width: w, height: 74, fill: '#FFFFFF', opacity: 0.86, zIndex: 6, shadow: { color: 'rgba(0,0,0,0.12)', blur: 10, offsetX: 0, offsetY: 4 } },
          { id: `gw-lb-t-${i}`, type: 'text', content: c[2] as string, fontFamily: HEI, fontSize: 21, fontWeight: '700', color: { $t: 'colors.ink' } as any, x: x + 16, y: 718, width: w - 32, height: 30, zIndex: 7, editable: { content: true } },
          { id: `gw-lb-a-${i}`, type: 'text', content: c[3] as string, fontFamily: MONO, fontSize: 19, color: { $t: 'colors.ink' } as any, opacity: 0.6, x: x + 16, y: 750, width: w - 32, height: 26, zIndex: 7 }
        ]
      }).flat() as any,
      // 视线与挂画高度标注
      { id: 'gw-eye', type: 'shape', shapeKind: 'rect', x: 96, y: 566, width: 1728, height: 2, fill: { $t: 'colors.ink' }, opacity: 0.3, zIndex: 9 },
      ...Array.from({ length: 24 }, (_, i) => (
        { id: `gw-eye-dash-${i}`, type: 'shape', shapeKind: 'rect', x: 96 + i * 72, y: 564, width: 34, height: 6, fill: { $t: 'colors.wall' }, zIndex: 10 }
      )) as any,
      { id: 'gw-eye-t', type: 'text', content: '标准视线高 152 cm', fontFamily: MONO, fontSize: 21, color: { $t: 'colors.ink' }, opacity: 0.72, letterSpacing: 2, x: 96, y: 526, width: 360, height: 30, zIndex: 11, editable: { content: true } },
      { id: 'gw-dim', type: 'shape', shapeKind: 'rect', x: 104, y: 296, width: 3, height: 410, fill: { $t: 'colors.ink' }, opacity: 0.45, zIndex: 9 },
      { id: 'gw-dim-t', type: 'text', content: '画底边距地 145 cm', fontFamily: MONO, fontSize: 20, color: { $t: 'colors.ink' }, opacity: 0.6, rotation: -90, x: 40, y: 430, width: 300, height: 28, zIndex: 9, editable: { content: true } },
      // 地面、踢脚、长凳、观众
      { id: 'gw-floor', type: 'shape', shapeKind: 'rect', x: 0, y: 872, width: 1920, height: 208, fill: { $t: 'colors.floor' }, zIndex: 4 },
      { id: 'gw-skirt', type: 'shape', shapeKind: 'rect', x: 0, y: 862, width: 1920, height: 10, fill: { $t: 'colors.ink' }, opacity: 0.22, zIndex: 5 },
      { id: 'gw-shine', type: 'overlay', x: 0, y: 872, width: 1920, height: 208, background: 'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 46%)', zIndex: 6 },
      { id: 'gw-bench', type: 'shape', shapeKind: 'rect', x: 830, y: 806, width: 280, height: 26, fill: { $t: 'colors.frame' }, opacity: 0.92, borderRadius: 4, zIndex: 7 },
      { id: 'gw-bench-l1', type: 'shape', shapeKind: 'rect', x: 856, y: 832, width: 18, height: 62, fill: { $t: 'colors.frame' }, opacity: 0.8, zIndex: 7 },
      { id: 'gw-bench-l2', type: 'shape', shapeKind: 'rect', x: 1066, y: 832, width: 18, height: 62, fill: { $t: 'colors.frame' }, opacity: 0.8, zIndex: 7 },
      { id: 'gw-bench-sh', type: 'shape', shapeKind: 'rect', x: 830, y: 894, width: 280, height: 16, fill: 'rgba(0,0,0,0.16)', borderRadius: 8, zIndex: 6 },
      { id: 'gw-fig-1', type: 'image', src: FIGURE_URI, objectFit: 'contain', x: 520, y: 640, width: 116, height: 262, zIndex: 8, opacity: 0.9, animation: { name: 'drift', duration: 14000, iterationCount: 'infinite', easing: 'ease-in-out' }, editable: { position: true, size: { type: 'scale' } } },
      { id: 'gw-fig-2', type: 'image', src: FIGURE_SEAT_URI, objectFit: 'contain', x: 1188, y: 682, width: 112, height: 212, zIndex: 8, opacity: 0.82, animation: { name: 'float', duration: 9000, iterationCount: 'infinite', delay: 800, easing: 'ease-in-out' }, editable: { position: true, size: { type: 'scale' } } },
      { id: 'gw-fig-1-sh', type: 'shape', shapeKind: 'rect', x: 512, y: 894, width: 132, height: 18, fill: 'rgba(0,0,0,0.14)', borderRadius: 9, zIndex: 7 },
      { id: 'gw-fig-2-sh', type: 'shape', shapeKind: 'rect', x: 1180, y: 894, width: 128, height: 18, fill: 'rgba(0,0,0,0.14)', borderRadius: 9, zIndex: 7 },
      // 展览标题（写在墙上）
      { id: 'gw-kicker', type: 'text', content: 'SUMMER SHOW · 第三展厅', fontFamily: MONO, fontSize: 24, color: { $t: 'colors.ink' }, opacity: 0.66, letterSpacing: 6, x: 96, y: 96, width: 620, height: 34, zIndex: 6, editable: { content: true } },
      { id: 'gw-title', type: 'text', content: '静 物 的 回 声', fontFamily: { $t: 'fonts.heading' }, fontSize: 92, fontWeight: '900', color: { $t: 'colors.ink' }, letterSpacing: 12, x: 96, y: 132, width: 900, height: 116, zIndex: 6, animation: { name: 'inkReveal', duration: 1200 }, editable: { content: true, fontSize: { type: 'range', min: 60, max: 116 }, position: true } },
      { id: 'gw-dates', type: 'text', content: '2026.07.11 — 09.28　·　周二至周日 10:00—18:00', fontFamily: HEI, fontSize: 27, color: { $t: 'colors.ink' }, opacity: 0.72, letterSpacing: 1, x: 96, y: 254, width: 860, height: 40, zIndex: 6, animation: { name: 'fadeIn', duration: 800, delay: 700 }, editable: { content: true, fontSize: { type: 'range', min: 20, max: 38 } } },
      { id: 'gw-note', type: 'text', content: '本厅共 3 件 / 摄影禁止闪光灯', fontFamily: MONO, fontSize: 22, color: { $t: 'colors.ink' }, opacity: 0.45, textAlign: 'right', letterSpacing: 2, x: 1320, y: 96, width: 504, height: 32, zIndex: 6, editable: { content: true } },
      { id: 'gw-foot', type: 'text', content: 'GALLERY WALL · 展墙立面 1:1 示意　·　策划 矩堂研究组', fontFamily: MONO, fontSize: 21, color: { $t: 'colors.wall' }, letterSpacing: 2, x: 96, y: 978, width: 900, height: 30, zIndex: 9, editable: { content: true } },
      { id: 'gw-grain', type: 'overlay', x: 0, y: 0, width: 1920, height: 1080, background: `url("${grain(320, 23, 0.8)}")`, opacity: 0.1, mixBlendMode: 'multiply', zIndex: 12 }
    ]
  },
  // 6. 展签三联（2.35:1 公众号头图）—— 三张带条码的展签卡横排
  {
    id: 'art-label-trilogy', name: '展签三联', version: '1.0.0', category: 'art',
    tags: ['art', 'wall-label', 'exhibition', 'banner', '2.35:1'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="68" viewBox="0 0 160 68"><rect width="160" height="68" fill="%23EAE6DF"/><g fill="%23FCFAF5"><rect x="14" y="16" width="40" height="42"/><rect x="60" y="16" width="40" height="42"/><rect x="106" y="16" width="40" height="42"/></g><g fill="%232F2C28"><rect x="18" y="20" width="32" height="14"/><rect x="64" y="20" width="32" height="14"/><rect x="110" y="20" width="32" height="14"/></g><g fill="%23B4442F"><circle cx="22" cy="50" r="3"/><circle cx="68" cy="50" r="3"/><circle cx="114" cy="50" r="3"/></g></svg>',
    tokens: {
      colors: {
        bg: { label: '背板', default: '#EAE6DF', options: ['#EAE6DF', '#DEDAD2', '#E4E9E7', '#F0EAE0'] },
        card: { label: '签纸', default: '#FCFAF5', options: ['#FCFAF5', '#FFFFFF', '#F5EFE0', '#EEF2F0'] },
        ink: { label: '墨色', default: '#2F2C28', options: ['#2F2C28', '#111827', '#3F3B36', '#1C1917'] },
        accent: { label: '展期朱', default: '#B4442F', options: ['#B4442F', '#1D4ED8', '#0F766E', '#A16207'] },
        quiet: { label: '次级灰', default: '#8A847B', options: ['#8A847B', '#6B7280', '#78716C', '#9CA3AF'] }
      },
      fonts: { heading: { label: '标题字体', default: SANS, options: [SANS, SERIF, HEI] } }
    },
    presets: [
      { name: '纸签原色', colors: { bg: '#EAE6DF', card: '#FCFAF5', ink: '#2F2C28', accent: '#B4442F', quiet: '#8A847B' } },
      { name: '冷灰蓝调', colors: { bg: '#E4E9E7', card: '#EEF2F0', ink: '#111827', accent: '#1D4ED8', quiet: '#6B7280' } },
      { name: '米黄写展', colors: { bg: '#F0EAE0', card: '#F5EFE0', ink: '#3F3B36', accent: '#A16207', quiet: '#78716C' } },
      { name: '松绿展签', colors: { bg: '#DEDAD2', card: '#FFFFFF', ink: '#1C1917', accent: '#0F766E', quiet: '#9CA3AF' } }
    ],
    canvas: { virtualWidth: 1800, virtualHeight: 766, defaultWidth: 1800, defaultHeight: 766, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'lt-rule-top', type: 'shape', shapeKind: 'rect', x: 96, y: 68, width: 1608, height: 2, fill: { $t: 'colors.ink' }, opacity: 0.28, zIndex: 2 },
      { id: 'lt-kicker', type: 'text', content: 'WALL LABELS · 本 期 三 件', fontFamily: MONO, fontSize: 22, color: { $t: 'colors.accent' }, letterSpacing: 8, x: 96, y: 26, width: 700, height: 32, zIndex: 3, editable: { content: true } },
      { id: 'lt-title', type: 'text', content: '展签三联', fontFamily: { $t: 'fonts.heading' }, fontSize: 66, fontWeight: '900', color: { $t: 'colors.ink' }, letterSpacing: 6, x: 96, y: 88, width: 780, height: 84, zIndex: 3, animation: { name: 'slideInLeft', duration: 800 }, editable: { content: true, fontSize: { type: 'range', min: 44, max: 88 }, position: true } },
      { id: 'lt-dates', type: 'text', content: '07.11 — 09.28 / 第三展厅 · 由东廊入', fontFamily: HEI, fontSize: 25, color: { $t: 'colors.quiet' }, x: 96, y: 176, width: 780, height: 36, zIndex: 3, editable: { content: true } },
      // 三张展签卡
      ...[['无题 No.7', 'A. 康纳', '布面油画 · 1962 · 116×89', '/images/photo/gallery-label-one-300x300.jpg', '01'],
         ['山海之间', '陈 矩', '综合材料 · 2021 · 240×180', '/images/photo/gallery-label-two-300x300.jpg', '02'],
         ['窗光', 'L. 费尔南德斯', '银盐照片 · 1998 · 60×48', '/images/photo/gallery-label-three-300x300.jpg', '03']].map((c, i) => {
        const x = 120 + i * 560
        return [
          { id: `lt-card-${i}`, type: 'shape', shapeKind: 'rect', x, y: 236, width: 480, height: 456, fill: { $t: 'colors.card' }, zIndex: 3, rotation: i === 1 ? 0.6 : -0.8, shadow: { color: 'rgba(0,0,0,0.18)', blur: 24, offsetX: 0, offsetY: 10 }, animation: { name: 'fadeInUp', duration: 800, delay: 200 + i * 180 } },
          { id: `lt-thumb-${i}`, type: 'image', src: c[3], objectFit: 'cover', x: x + 26, y: 262, width: 428, height: 190, zIndex: 4, rotation: i === 1 ? 0.6 : -0.8, editable: { src: { type: 'upload' }, position: true, size: { type: 'scale' } } },
          { id: `lt-no-${i}`, type: 'shape', shapeKind: 'circle', x: x + 26, y: 250, width: 62, height: 62, fill: { $t: 'colors.accent' }, opacity: 0.94, zIndex: 5, rotation: i === 1 ? 0.6 : -0.8 },
          { id: `lt-no-t-${i}`, type: 'text', content: c[4], fontFamily: SANS, fontSize: 28, fontWeight: '900', color: '#FFFFFF', textAlign: 'center', rotation: i === 1 ? 0.6 : -0.8, x: x + 26, y: 262, width: 62, height: 40, zIndex: 6 },
          { id: `lt-name-${i}`, type: 'text', content: c[0], fontFamily: { $t: 'fonts.heading' } as any, fontSize: 38, fontWeight: '800', color: { $t: 'colors.ink' } as any, rotation: i === 1 ? 0.6 : -0.8, letterSpacing: 1, x: x + 26, y: 470, width: 428, height: 52, zIndex: 5, editable: { content: true, fontSize: { type: 'range', min: 28, max: 48 } } },
          { id: `lt-meta-${i}`, type: 'text', content: c[1], fontFamily: HEI, fontSize: 24, color: { $t: 'colors.ink' } as any, opacity: 0.78, rotation: i === 1 ? 0.6 : -0.8, x: x + 26, y: 528, width: 428, height: 34, zIndex: 5, editable: { content: true } },
          { id: `lt-medium-${i}`, type: 'text', content: c[2], fontFamily: MONO, fontSize: 20, color: { $t: 'colors.quiet' } as any, rotation: i === 1 ? 0.6 : -0.8, x: x + 26, y: 566, width: 428, height: 30, zIndex: 5, editable: { content: true } },
          { id: `lt-bar-${i}`, type: 'shape', shapeKind: 'rect', x: x + 26, y: 606, width: 428, height: 1.5, fill: { $t: 'colors.ink' }, opacity: 0.2, rotation: i === 1 ? 0.6 : -0.8, zIndex: 5 },
          ...Array.from({ length: 9 }, (_, k) => { const r = seeded(i * 53 + k * 11); const w = 3 + Math.round(r() * 6)
            return { id: `lt-code-${i}-${k}`, type: 'shape', shapeKind: 'rect', x: x + 26 + k * 26, y: 622, width: w, height: 40, fill: { $t: 'colors.ink' } as any, opacity: 0.85, rotation: i === 1 ? 0.6 : -0.8, zIndex: 5 } }).flat(),
          { id: `lt-pin-${i}`, type: 'shape', shapeKind: 'circle', x: x + 226, y: 226, width: 16, height: 16, fill: { $t: 'colors.ink' }, opacity: 0.5, zIndex: 6 },
          { id: `lt-sq-${i}`, type: 'text', content: '馆藏 · 勿触', fontFamily: MONO, fontSize: 17, color: { $t: 'colors.quiet' } as any, opacity: 0.8, rotation: i === 1 ? 0.6 : -0.8, textAlign: 'right', x: x + 240, y: 632, width: 214, height: 26, zIndex: 6 }
        ]
      }).flat() as any,
      { id: 'lt-side', type: 'text', content: 'SCROLL →　作 品 说 明 见 出 口', fontFamily: MONO, fontSize: 21, color: { $t: 'colors.ink' }, opacity: 0.5, letterSpacing: 3, textAlign: 'right', x: 1000, y: 148, width: 704, height: 30, zIndex: 3, animation: { name: 'blink', duration: 2600, iterationCount: 'infinite' }, editable: { content: true } },
      { id: 'lt-foot', type: 'text', content: '矩堂美术馆 / 展签照排　·　字体 24pt · 视读距离 60cm', fontFamily: MONO, fontSize: 20, color: { $t: 'colors.quiet' }, x: 96, y: 706, width: 900, height: 28, zIndex: 3, editable: { content: true } },
      { id: 'lt-corner', type: 'shape', shapeKind: 'rect', x: 40, y: 40, width: 1720, height: 686, fill: 'rgba(0,0,0,0)', border: { color: { $t: 'colors.ink' }, width: 1.5, style: 'solid' }, opacity: 0.25, zIndex: 8 },
      { id: 'lt-grain', type: 'overlay', x: 0, y: 0, width: 1800, height: 766, background: `url("${grain(300, 31, 0.85)}")`, opacity: 0.11, mixBlendMode: 'multiply', zIndex: 9 }
    ]
  },
]

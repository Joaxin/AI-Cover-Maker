// src/core/templates/video/bili-covers.ts —— B站/视频平台 up 主封面批（16:9 · 1920×1080）
// 口径：大字报贴纸风 / 测评对决 / 一图看懂 / 游戏高光 四个高频流派；颜色全走 token，预设可换色。
import type { Template } from '@/types/types'
import { HEI, IMPACT, MONO } from '../_fx/trend'
import { hatchBg, dotsBg } from '../knowledge/_decor'
import { svgUri } from '../_fx/common'

// 爆炸贴纸（不规则 9 尖星）
const BURST_URI = svgUri('<polygon points="340,-25 404,84 564,-7 499,168 677,201 517,291 631,428 454,395 453,570 340,433 229,564 231,390 66,418 176,289 34,206 199,178 145,27 285,110" fill="%23E63A2E"/>', 680, 540)
// 手绘圈重点（开口椭圆线圈）
const DOODLE_URI = svgUri('<path d="M690 140 C 640 40 200 -20 90 70 C -30 165 40 330 260 372 C 500 415 700 330 680 190" fill="none" stroke="%23FFFFFF" stroke-width="16" stroke-linecap="round"/>', 720, 420)
// 手绘弯箭头
const ARROW_URI = svgUri('<g fill="none" stroke="%23E63A2E" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"><path d="M340 30 C 200 60 90 160 60 300"/><path d="M18 240 L60 300 L118 262"/></g>', 360, 320)
// 游戏扫描线：整幅 1920×1080，每 14px 一条细亮线，objectFit fill 不变形
const SCAN_URI = svgUri(`<rect width="1920" height="1080" fill="transparent"/><path d="${Array.from({ length: 77 }, (_, i) => `M0 ${i * 14 + 8} H1920`).join(' ')}" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="2"/>`, 1920, 1080)

export const biliCoverTemplates: Template[] = [
  // 1. 爆炸大字整活封面 —— 黄底黑字红爆炸，B站首页最常见的"大字报贴纸"流
  {
    id: 'video-bili-blast', name: '爆炸大字整活封面', version: '1.0.0', category: 'video',
    tags: ['video', 'bilibili', 'thumbnail', '16:9', '大字报'],
    thumbnail: svgUri('<rect width="160" height="90" fill="%23FFD91C"/><g fill="%23000000" opacity="0.06"><rect x="0" y="10" width="160" height="1"/><rect x="0" y="30" width="160" height="1"/><rect x="0" y="50" width="160" height="1"/><rect x="0" y="70" width="160" height="1"/></g><polygon points="80,8 120,20 140,45 118,70 80,82 44,68 22,44 46,20" fill="%23E63A2E"/><rect x="28" y="36" width="108" height="12" rx="2" fill="%23FFFFFF" opacity="0.85"/><rect x="26" y="34" width="108" height="12" rx="2" fill="%23171512"/><rect x="40" y="54" width="86" height="12" rx="2" fill="%23FFFFFF" opacity="0.85"/><rect x="38" y="52" width="86" height="12" rx="2" fill="%23E63A2E"/><rect x="10" y="12" width="34" height="9" rx="4" fill="%23171512"/><g fill="%23171512" opacity="0.18"><rect x="52" y="13" width="26" height="5" rx="1"/><rect x="12" y="68" width="34" height="6" rx="1"/><rect x="22" y="78" width="30" height="5" rx="1"/></g><rect x="96" y="12" width="40" height="10" rx="5" fill="%23171512"/><circle cx="140" cy="20" r="10" fill="%23171512"/><rect x="112" y="60" width="42" height="26" rx="3" fill="none" stroke="%23171512" stroke-width="1.6" stroke-dasharray="4 3"/><rect x="12" y="82" width="26" height="7" rx="3.5" fill="%23E63A2E"/><polygon points="14,44 18,40 22,45 27,42 26,48 30,52 24,53 21,58 17,53 12,54 14,49 10,46" fill="%23E63A2E"/><text x="24" y="30" font-family="Impact,sans-serif" font-size="10" fill="%23171512">★</text>', 160, 90),
    tokens: {
      colors: {
        bg: { label: '底色', default: '#FFD91C', options: ['#FFD91C', '#00E5D0', '#FF8FA3', '#F4E1C6'] },
        ink: { label: '主文字', default: '#171512', options: ['#171512', '#0B2B27', '#3B1120', '#3B2A1D'] },
        accent: { label: '爆炸色', default: '#E63A2E', options: ['#E63A2E', '#FF4D2D', '#C2410C', '#171512'] },
        pop: { label: '贴纸白', default: '#FFFFFF', options: ['#FFFFFF', '#FFFDF8', '#FFF9DB'] }
      },
      fonts: { heading: { label: '标题字体', default: HEI, options: [HEI, IMPACT] } }
    },
    presets: [
      { name: '香蕉黄', colors: { bg: '#FFD91C', ink: '#171512', accent: '#E63A2E', pop: '#FFFFFF' } },
      { name: '电光青', colors: { bg: '#00E5D0', ink: '#0B2B27', accent: '#FF4D2D', pop: '#FFFFFF' } },
      { name: '樱粉闹', colors: { bg: '#FF8FA3', ink: '#3B1120', accent: '#171512', pop: '#FFF9DB' } },
      { name: '奶咖棕', colors: { bg: '#F4E1C6', ink: '#3B2A1D', accent: '#C2410C', pop: '#FFFDF8' } }
    ],
    canvas: { virtualWidth: 1920, virtualHeight: 1080, defaultWidth: 1920, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'bl-hatch', type: 'image', src: hatchBg(1920, 1080, 26, 'rgba(0,0,0,0.07)'), x: 0, y: 0, width: 1920, height: 1080, objectFit: 'fill', zIndex: 1 },
      { id: 'bl-burst', type: 'image', src: BURST_URI, x: 260, y: 120, width: 1360, height: 1080, objectFit: 'contain', zIndex: 2, animation: { name: 'zoomIn', duration: 520 } },
      { id: 'bl-kicker', type: 'shape', shapeKind: 'rect', x: 120, y: 104, width: 320, height: 68, borderRadius: 999, fill: { $t: 'colors.ink' }, zIndex: 4 },
      { id: 'bl-kicker-t', type: 'text', content: '全网更新中', fontFamily: HEI, fontSize: 32, fontWeight: 700, color: { $t: 'colors.pop' }, textAlign: 'center', x: 120, y: 118, width: 320, height: 44, zIndex: 5, editable: { content: true } },
      { id: 'bl-t1', type: 'text', content: '99%的人', fontFamily: { $t: 'fonts.heading' }, fontSize: 168, fontWeight: 900, color: { $t: 'colors.ink' }, letterSpacing: 4, x: 250, y: 268, width: 1420, height: 190, zIndex: 6, animation: { name: 'slideInRight', duration: 480 }, editable: { content: true, fontSize: { type: 'range', min: 100, max: 220 } } },
      { id: 'bl-t2', type: 'text', content: '都不知道！', fontFamily: { $t: 'fonts.heading' }, fontSize: 168, fontWeight: 900, color: { $t: 'colors.accent' }, letterSpacing: 4, x: 330, y: 470, width: 1420, height: 190, zIndex: 6, animation: { name: 'slideInRight', duration: 480, delay: 140 }, editable: { content: true, fontSize: { type: 'range', min: 100, max: 220 } } },
      { id: 'bl-doodle', type: 'image', src: DOODLE_URI, x: 292, y: 442, width: 1210, height: 260, objectFit: 'contain', rotation: -2, zIndex: 7 },
      { id: 'bl-arrow', type: 'image', src: ARROW_URI, x: 1140, y: 770, width: 260, height: 230, objectFit: 'contain', rotation: 14, zIndex: 7, animation: { name: 'wobble', duration: 1600 } },
      { id: 'bl-sub', type: 'text', content: '冷知识系列 · EP.12 · 每周五晚八点', fontFamily: HEI, fontSize: 38, color: { $t: 'colors.ink' }, opacity: 0.85, x: 120, y: 920, width: 900, height: 50, zIndex: 6, editable: { content: true } },
      { id: 'bl-badge', type: 'shape', shapeKind: 'circle', x: 1600, y: 116, width: 200, height: 200, fill: { $t: 'colors.ink' }, zIndex: 8 },
      { id: 'bl-badge-t', type: 'text', content: '第\n12\n期', fontFamily: MONO, fontSize: 40, fontWeight: 700, color: { $t: 'colors.pop' }, textAlign: 'center', lineHeight: 0.98, x: 1600, y: 148, width: 200, height: 140, zIndex: 9, editable: { content: true } },
      { id: 'bl-t1o', type: 'text', content: '99%的人', fontFamily: { $t: 'fonts.heading' }, fontSize: 168, fontWeight: 900, color: { $t: 'colors.accent' }, letterSpacing: 4, x: 264, y: 282, width: 1420, height: 190, zIndex: 5 },
      { id: 'bl-t2o', type: 'text', content: '都不知道！', fontFamily: { $t: 'fonts.heading' }, fontSize: 168, fontWeight: 900, color: { $t: 'colors.pop' }, letterSpacing: 4, x: 344, y: 484, width: 1420, height: 190, zIndex: 5 },
      { id: 'bl-burst-mini', type: 'image', src: BURST_URI, x: 40, y: 420, width: 220, height: 175, objectFit: 'contain', rotation: -12, zIndex: 6, animation: { name: 'zoomIn', duration: 460, delay: 260 } },
      { id: 'bl-spark', type: 'text', content: '★', fontFamily: IMPACT, fontSize: 88, color: { $t: 'colors.ink' }, x: 120, y: 268, width: 100, height: 100, zIndex: 6, animation: { name: 'twinkle', duration: 2000 } },
      { id: 'bl-ep', type: 'text', content: 'EP.12', fontFamily: IMPACT, fontSize: 64, color: { $t: 'colors.accent' }, x: 1440, y: 340, width: 300, height: 80, zIndex: 6, editable: { content: true } },
      { id: 'bl-play', type: 'shape', shapeKind: 'rect', x: 1140, y: 120, width: 400, height: 76, borderRadius: 999, fill: { $t: 'colors.ink' }, zIndex: 8 },
      { id: 'bl-play-t', type: 'text', content: '播放 328.6万', fontFamily: HEI, fontSize: 30, fontWeight: 700, color: { $t: 'colors.pop' }, textAlign: 'center', x: 1140, y: 138, width: 400, height: 40, zIndex: 9, editable: { content: true } },
      { id: 'bl-dur', type: 'shape', shapeKind: 'rect', x: 120, y: 1000, width: 250, height: 64, borderRadius: 999, fill: { $t: 'colors.accent' }, zIndex: 8 },
      { id: 'bl-dur-t', type: 'text', content: '08:41', fontFamily: MONO, fontSize: 32, fontWeight: 700, color: { $t: 'colors.pop' }, textAlign: 'center', x: 120, y: 1014, width: 250, height: 36, zIndex: 9, editable: { content: true } },
      { id: 'bl-cut', type: 'shape', shapeKind: 'rect', x: 1420, y: 640, width: 440, height: 400, borderRadius: 28, border: { width: 8, style: 'dashed', color: { $t: 'colors.ink' } }, zIndex: 5 },
      { id: 'bl-cut-t', type: 'text', content: '这里放你的惊讶表情', imageSlot: 'bl-cut', fontFamily: HEI, fontSize: 30, color: { $t: 'colors.ink' }, opacity: 0.72, textAlign: 'center', x: 1420, y: 812, width: 440, height: 44, zIndex: 6, editable: { content: true } },
      { id: 'bl-dm1', type: 'text', content: '哈哈哈哈哈', fontFamily: HEI, fontSize: 56, fontWeight: 700, color: { $t: 'colors.ink' }, opacity: 0.18, rotation: -3, x: 120, y: 716, width: 640, height: 70, zIndex: 5, editable: { content: true } },
      { id: 'bl-dm2', type: 'text', content: '这段我看了三遍', fontFamily: HEI, fontSize: 50, fontWeight: 700, color: { $t: 'colors.ink' }, opacity: 0.16, rotation: 2, x: 240, y: 800, width: 660, height: 66, zIndex: 5, editable: { content: true } },
      { id: 'bl-dm3', type: 'text', content: '冷知识又增加了', fontFamily: HEI, fontSize: 46, fontWeight: 700, color: { $t: 'colors.ink' }, opacity: 0.15, rotation: -2, x: 470, y: 176, width: 560, height: 58, zIndex: 5, editable: { content: true } }
    ]
  },

  // 2. 硬核测评对决封面 —— 左右分屏 VS，数码/测评区标配
  {
    id: 'video-bili-review', name: '硬核测评对决封面', version: '1.0.0', category: 'video',
    tags: ['video', 'bilibili', 'review', 'versus', '16:9'],
    thumbnail: svgUri('<rect width="160" height="90" fill="%2312141A"/><rect width="70" height="90" fill="%233B82F6" opacity="0.18"/><rect x="90" width="70" height="90" fill="%23F97316" opacity="0.18"/><circle cx="80" cy="42" r="18" fill="none" stroke="%23F5F7FA" stroke-width="2"/><text x="80" y="49" font-family="Impact,sans-serif" font-size="18" fill="%23F5F7FA" text-anchor="middle">VS</text><rect x="14" y="20" width="42" height="42" fill="none" stroke="%23F5F7FA" stroke-opacity="0.4" stroke-dasharray="4 3"/><rect x="104" y="20" width="42" height="42" fill="none" stroke="%23F5F7FA" stroke-opacity="0.4" stroke-dasharray="4 3"/><rect x="40" y="72" width="80" height="8" rx="2" fill="%23F5F7FA"/>', 160, 90),
    tokens: {
      colors: {
        bg: { label: '底色', default: '#12141A', options: ['#12141A', '#1A1024', '#0B1D17', '#221313'] },
        ink: { label: '主文字', default: '#F5F7FA', options: ['#F5F7FA', '#FFF9DB', '#E9F7EF', '#FDECEC'] },
        left: { label: '左队色', default: '#3B82F6', options: ['#3B82F6', '#8B5CF6', '#0EA5E9', '#6366F1'] },
        right: { label: '右队色', default: '#F97316', options: ['#F97316', '#EF4444', '#F59E0B', '#EC4899'] },
        dim: { label: '弱文字', default: '#8A93A3', options: ['#8A93A3', '#A78BC9', '#7FA98F', '#B08A8A'] }
      },
      fonts: { heading: { label: '标题字体', default: HEI, options: [HEI, IMPACT] } }
    },
    presets: [
      { name: '蓝橙经典', colors: { bg: '#12141A', ink: '#F5F7FA', left: '#3B82F6', right: '#F97316', dim: '#8A93A3' } },
      { name: '紫红对抗', colors: { bg: '#1A1024', ink: '#FFF9DB', left: '#8B5CF6', right: '#EF4444', dim: '#A78BC9' } },
      { name: '青金对决', colors: { bg: '#0B1D17', ink: '#E9F7EF', left: '#0EA5E9', right: '#F59E0B', dim: '#7FA98F' } },
      { name: '石墨灰', colors: { bg: '#221313', ink: '#FDECEC', left: '#6366F1', right: '#EC4899', dim: '#B08A8A' } }
    ],
    canvas: { virtualWidth: 1920, virtualHeight: 1080, defaultWidth: 1920, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'rv-panel-l', type: 'shape', shapeKind: 'rect', x: 0, y: 0, width: 840, height: 1080, fill: { $t: 'colors.left' }, opacity: 0.16, zIndex: 1 },
      { id: 'rv-panel-r', type: 'shape', shapeKind: 'rect', x: 1080, y: 0, width: 840, height: 1080, fill: { $t: 'colors.right' }, opacity: 0.16, zIndex: 1 },
      { id: 'rv-seam', type: 'shape', shapeKind: 'rect', x: 956, y: 100, width: 6, height: 880, fill: { $t: 'colors.ink' }, opacity: 0.28, zIndex: 2 },
      { id: 'rv-slot-l', type: 'shape', shapeKind: 'rect', x: 150, y: 230, width: 560, height: 560, borderRadius: 24, border: { width: 4, style: 'dashed', color: { $t: 'colors.ink' } }, zIndex: 3 },
      { id: 'rv-slot-l-t', type: 'text', content: '选手 A · 左图可换', fontFamily: HEI, fontSize: 30, color: { $t: 'colors.dim' }, textAlign: 'center', x: 150, y: 740, width: 560, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'rv-slot-r', type: 'shape', shapeKind: 'rect', x: 1210, y: 230, width: 560, height: 560, borderRadius: 24, border: { width: 4, style: 'dashed', color: { $t: 'colors.ink' } }, zIndex: 3 },
      { id: 'rv-slot-r-t', type: 'text', content: '选手 B · 右图可换', fontFamily: HEI, fontSize: 30, color: { $t: 'colors.dim' }, textAlign: 'center', x: 1210, y: 740, width: 560, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'rv-ring', type: 'shape', shapeKind: 'circle', x: 780, y: 330, width: 360, height: 360, border: { width: 10, color: { $t: 'colors.ink' } }, zIndex: 5 },
      { id: 'rv-vs', type: 'text', content: 'VS', fontFamily: IMPACT, fontSize: 240, color: { $t: 'colors.ink' }, textAlign: 'center', x: 780, y: 386, width: 360, height: 250, zIndex: 6, shadow: { offsetX: 0, offsetY: 0, blur: 46, color: { $t: 'colors.left' } }, animation: { name: 'zoomIn', duration: 520 }, editable: { content: true } },
      { id: 'rv-chip-l', type: 'shape', shapeKind: 'rect', x: 150, y: 110, width: 300, height: 64, borderRadius: 999, fill: { $t: 'colors.left' }, zIndex: 6 },
      { id: 'rv-chip-l-t', type: 'text', content: '硬核测评', fontFamily: HEI, fontSize: 30, fontWeight: 700, color: { $t: 'colors.ink' }, textAlign: 'center', x: 150, y: 124, width: 300, height: 38, zIndex: 7, editable: { content: true } },
      { id: 'rv-chip-r', type: 'shape', shapeKind: 'rect', x: 1470, y: 110, width: 300, height: 64, borderRadius: 999, fill: { $t: 'colors.right' }, zIndex: 6 },
      { id: 'rv-chip-r-t', type: 'text', content: '自费购买', fontFamily: HEI, fontSize: 30, fontWeight: 700, color: { $t: 'colors.ink' }, textAlign: 'center', x: 1470, y: 124, width: 300, height: 38, zIndex: 7, editable: { content: true } },
      { id: 'rv-title', type: 'text', content: '谁才是真正的卷王？', fontFamily: { $t: 'fonts.heading' }, fontSize: 96, fontWeight: 900, color: { $t: 'colors.ink' }, textAlign: 'center', letterSpacing: 4, x: 360, y: 880, width: 1200, height: 120, zIndex: 8, animation: { name: 'fadeInUp', duration: 520, delay: 120 }, editable: { content: true, fontSize: { type: 'range', min: 60, max: 130 } } },
      { id: 'rv-sub', type: 'text', content: 'Vol.07 · 两周实测 · 结论在片尾', fontFamily: HEI, fontSize: 30, color: { $t: 'colors.dim' }, textAlign: 'center', x: 660, y: 1006, width: 600, height: 40, zIndex: 8, editable: { content: true } }
    ]
  },

  // 3. 一图看懂科普封面 —— 深蓝底巨数发光，知识区/科普区首图流
  {
    id: 'video-bili-explained', name: '一图看懂科普封面', version: '1.0.0', category: 'video',
    tags: ['video', 'bilibili', 'science', 'explainer', '16:9'],
    thumbnail: svgUri('<rect width="160" height="90" fill="%230E1B2E"/><text x="14" y="58" font-family="Impact,sans-serif" font-size="38" fill="%234CC9F0">99%</text><rect x="92" y="22" width="56" height="7" rx="2" fill="%23F2F6FC"/><rect x="92" y="35" width="40" height="7" rx="2" fill="%23F2F6FC" opacity="0.55"/><rect x="92" y="52" width="20" height="10" rx="5" fill="%23FFB703"/><rect x="116" y="52" width="20" height="10" rx="5" fill="%234CC9F0"/><rect x="14" y="74" width="70" height="5" rx="2" fill="%237D93B0"/>', 160, 90),
    tokens: {
      colors: {
        bg: { label: '底色', default: '#0E1B2E', options: ['#0E1B2E', '#101820', '#1D1430', '#0B2224'] },
        ink: { label: '主文字', default: '#F2F6FC', options: ['#F2F6FC', '#FFF9DB', '#EAF4F1', '#F3EAFF'] },
        accent: { label: '主强调', default: '#4CC9F0', options: ['#4CC9F0', '#52E0A5', '#C77DFF', '#FFB703'] },
        accent2: { label: '次强调', default: '#FFB703', options: ['#FFB703', '#FF6B6B', '#8AC926', '#4CC9F0'] },
        dim: { label: '弱文字', default: '#7D93B0', options: ['#7D93B0', '#6E7B8A', '#93840F', '#8A7DA8'] }
      },
      fonts: { heading: { label: '标题字体', default: HEI, options: [HEI, IMPACT] } }
    },
    presets: [
      { name: '深夜青', colors: { bg: '#0E1B2E', ink: '#F2F6FC', accent: '#4CC9F0', accent2: '#FFB703', dim: '#7D93B0' } },
      { name: '碳绿', colors: { bg: '#101820', ink: '#EAF4F1', accent: '#52E0A5', accent2: '#FF6B6B', dim: '#6E7B8A' } },
      { name: '暗紫', colors: { bg: '#1D1430', ink: '#F3EAFF', accent: '#C77DFF', accent2: '#8AC926', dim: '#8A7DA8' } },
      { name: '墨青', colors: { bg: '#0B2224', ink: '#FFF9DB', accent: '#FFB703', accent2: '#4CC9F0', dim: '#7D93B0' } }
    ],
    canvas: { virtualWidth: 1920, virtualHeight: 1080, defaultWidth: 1920, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'ex-dots', type: 'image', src: dotsBg(1920, 1080, 54, 'rgba(255,255,255,0.07)'), x: 0, y: 0, width: 1920, height: 1080, objectFit: 'fill', zIndex: 1 },
      { id: 'ex-num', type: 'text', content: '99%', fontFamily: IMPACT, fontSize: 400, color: { $t: 'colors.accent' }, x: 110, y: 210, width: 880, height: 430, zIndex: 3, shadow: { offsetX: 0, offsetY: 0, blur: 70, color: { $t: 'colors.accent' } }, animation: { name: 'fadeInUp', duration: 620 }, editable: { content: true, fontSize: { type: 'range', min: 240, max: 460 } } },
      { id: 'ex-num-cap', type: 'text', content: '的人看完都惊了', fontFamily: HEI, fontSize: 46, color: { $t: 'colors.ink' }, x: 140, y: 680, width: 700, height: 60, zIndex: 3, editable: { content: true } },
      { id: 'ex-kicker', type: 'text', content: 'ONE GRAPH · 5 分钟系列', fontFamily: MONO, fontSize: 30, letterSpacing: 8, color: { $t: 'colors.accent2' }, x: 1080, y: 216, width: 720, height: 40, zIndex: 3, editable: { content: true } },
      { id: 'ex-title', type: 'text', content: '睡眠是怎么\n发生的', fontFamily: { $t: 'fonts.heading' }, fontSize: 92, fontWeight: 900, color: { $t: 'colors.ink' }, lineHeight: 1.16, x: 1080, y: 288, width: 740, height: 230, zIndex: 3, animation: { name: 'fadeInUp', duration: 620, delay: 140 }, editable: { content: true, fontSize: { type: 'range', min: 60, max: 120 } } },
      { id: 'ex-rule', type: 'shape', shapeKind: 'rect', x: 1080, y: 560, width: 140, height: 10, borderRadius: 999, fill: { $t: 'colors.accent2' }, zIndex: 3 },
      { id: 'ex-chip1', group: 'ex-chip', type: 'shape', shapeKind: 'rect', x: 1080, y: 630, width: 210, height: 72, borderRadius: 999, border: { width: 3, color: { $t: 'colors.accent' } }, zIndex: 3 },
      { id: 'ex-chip1-t', type: 'text', content: '褪黑素', fontFamily: HEI, fontSize: 34, color: { $t: 'colors.accent' }, textAlign: 'center', x: 1080, y: 646, width: 210, height: 42, zIndex: 4, editable: { content: true } },
      { id: 'ex-chip2', group: 'ex-chip', type: 'shape', shapeKind: 'rect', x: 1320, y: 630, width: 210, height: 72, borderRadius: 999, border: { width: 3, color: { $t: 'colors.accent' } }, zIndex: 3 },
      { id: 'ex-chip2-t', type: 'text', content: '核心体温', fontFamily: HEI, fontSize: 34, color: { $t: 'colors.accent' }, textAlign: 'center', x: 1320, y: 646, width: 210, height: 42, zIndex: 4, editable: { content: true } },
      { id: 'ex-chip3', group: 'ex-chip', type: 'shape', shapeKind: 'rect', x: 1560, y: 630, width: 210, height: 72, borderRadius: 999, border: { width: 3, color: { $t: 'colors.accent' } }, zIndex: 3 },
      { id: 'ex-chip3-t', type: 'text', content: '腺苷', fontFamily: HEI, fontSize: 34, color: { $t: 'colors.accent' }, textAlign: 'center', x: 1560, y: 646, width: 210, height: 42, zIndex: 4, editable: { content: true } },
      { id: 'ex-arrow', type: 'image', src: svgUri('<g fill="none" stroke="%23FFB703" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"><path d="M40 260 C 160 240 260 140 300 30"/><path d="M262 52 L300 30 L306 76"/></g>', 340, 300), x: 880, y: 560, width: 220, height: 195, objectFit: 'contain', rotation: -6, zIndex: 4 },
      { id: 'ex-sub', type: 'text', content: 'S2 · EP08 · 附参考文献', fontFamily: HEI, fontSize: 30, color: { $t: 'colors.dim' }, x: 140, y: 960, width: 700, height: 40, zIndex: 3, editable: { content: true } }
    ]
  },

  // 4. 游戏高光缩略图封面 —— 血条 + 发光大字，游戏区/PVP 区高频
  {
    id: 'video-bili-gaming', name: '游戏高光缩略图', version: '1.0.0', category: 'video',
    tags: ['video', 'bilibili', 'gaming', 'thumbnail', '16:9'],
    thumbnail: svgUri('<rect width="160" height="90" fill="%23170B2E"/><path d="M0 0 L160 90 L0 90 Z" fill="rgba(255,46,136,0.16)"/><g stroke="rgba(255,255,255,0.07)" stroke-width="1"><path d="M0 12 H160"/><path d="M0 26 H160"/><path d="M0 40 H160"/><path d="M0 54 H160"/><path d="M0 68 H160"/><path d="M0 82 H160"/></g><rect x="10" y="10" width="70" height="7" rx="3" fill="%232A1A45"/><rect x="10" y="10" width="46" height="7" rx="3" fill="%23FF2E88"/><rect x="10" y="21" width="56" height="5" rx="2.5" fill="%230B0518"/><rect x="10" y="21" width="46" height="5" rx="2.5" fill="%233DF1DB"/><rect x="86" y="8" width="26" height="10" rx="5" fill="rgba(0,0,0,0.55)"/><text x="99" y="16" font-family="Impact,sans-serif" font-size="8" fill="%23FFFFFF" text-anchor="middle">14:32</text><rect x="10" y="34" width="86" height="16" rx="2" fill="%23FFFFFF"/><rect x="12" y="36" width="82" height="14" rx="1" fill="%23FF2E88" opacity="0.35"/><rect x="10" y="34" width="86" height="16" rx="2" fill="%23FFFFFF"/><rect x="10" y="56" width="60" height="8" rx="2" fill="%233DF1DB"/><rect x="12" y="66" width="46" height="3" rx="1" fill="%23A78BC9" opacity="0.6"/><rect x="108" y="10" width="42" height="11" rx="2" fill="%233DF1DB" transform="rotate(5 129 15)"/><circle cx="136" cy="64" r="14" fill="%23FF2E88"/><text x="136" y="69" font-family="Impact,sans-serif" font-size="12" fill="%23FFFFFF" text-anchor="middle">1P</text><text x="96" y="52" font-family="Impact,sans-serif" font-size="13" fill="%233DF1DB">44</text><g fill="%233DF1DB" opacity="0.75"><rect x="90" y="72" width="4" height="14" rx="2"/><rect x="85" y="77" width="14" height="4" rx="2"/></g><circle cx="106" cy="80" r="4" fill="%23FF2E88"/><circle cx="114" cy="73" r="4" fill="none" stroke="%23FF2E88" stroke-width="1.4"/>', 160, 90),
    tokens: {
      colors: {
        bg: { label: '底色', default: '#170B2E', options: ['#170B2E', '#0B1026', '#2E0B17', '#0B2E1B'] },
        ink: { label: '主文字', default: '#FFFFFF', options: ['#FFFFFF', '#FFF9DB', '#EAFcff', '#FFEAF3'] },
        neon: { label: '主霓虹', default: '#FF2E88', options: ['#FF2E88', '#FF6B35', '#F43F5E', '#A855F7'] },
        neon2: { label: '次霓虹', default: '#3DF1DB', options: ['#3DF1DB', '#FACC15', '#4CC9F0', '#52E0A5'] },
        dim: { label: '弱文字', default: '#A78BC9', options: ['#A78BC9', '#8A93A3', '#C98BA7', '#8BC9A7'] }
      },
      fonts: { heading: { label: '标题字体', default: IMPACT, options: [IMPACT, HEI] } }
    },
    presets: [
      { name: '粉紫电', colors: { bg: '#170B2E', ink: '#FFFFFF', neon: '#FF2E88', neon2: '#3DF1DB', dim: '#A78BC9' } },
      { name: '深海蓝', colors: { bg: '#0B1026', ink: '#EAFcff', neon: '#4CC9F0', neon2: '#FACC15', dim: '#7D93B0' } },
      { name: '猩红夜', colors: { bg: '#2E0B17', ink: '#FFEAF3', neon: '#F43F5E', neon2: '#FF6B35', dim: '#C98BA7' } },
      { name: '毒液绿', colors: { bg: '#0B2E1B', ink: '#FFFFFF', neon: '#52E0A5', neon2: '#FACC15', dim: '#8BC9A7' } }
    ],
    canvas: { virtualWidth: 1920, virtualHeight: 1080, defaultWidth: 1920, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'gm-glow', type: 'overlay', background: 'linear-gradient(135deg, rgba(255,46,136,0.26), transparent 46%, rgba(61,241,219,0.20))', x: 0, y: 0, width: 1920, height: 1080, zIndex: 1 },
      { id: 'gm-scan', type: 'image', src: SCAN_URI, x: 0, y: 0, width: 1920, height: 1080, objectFit: 'fill', zIndex: 2 },
      { id: 'gm-hp-label', type: 'text', content: 'BOSS 血量', fontFamily: MONO, fontSize: 28, letterSpacing: 4, color: { $t: 'colors.neon2' }, x: 140, y: 92, width: 400, height: 36, zIndex: 4, editable: { content: true } },
      { id: 'gm-hp-track', type: 'shape', shapeKind: 'rect', x: 140, y: 140, width: 880, height: 44, borderRadius: 999, fill: 'rgba(0,0,0,0.55)', zIndex: 4 },
      { id: 'gm-hp-fill', type: 'shape', shapeKind: 'rect', x: 148, y: 148, width: 240, height: 28, borderRadius: 999, fill: { $t: 'colors.neon' }, zIndex: 5, animation: { name: 'heartbeat', duration: 1400 } },
      { id: 'gm-hp-pct', type: 'text', content: '7%', fontFamily: IMPACT, fontSize: 34, color: { $t: 'colors.ink' }, x: 1040, y: 142, width: 120, height: 42, zIndex: 5, editable: { content: true } },
      { id: 'gm-kill', type: 'shape', shapeKind: 'rect', x: 1360, y: 120, width: 400, height: 84, borderRadius: 16, fill: { $t: 'colors.neon2' }, rotation: 5, zIndex: 5 },
      { id: 'gm-kill-t', type: 'text', content: 'FIRST BLOOD', fontFamily: IMPACT, fontSize: 44, color: { $t: 'colors.bg' }, textAlign: 'center', rotation: 5, x: 1360, y: 138, width: 400, height: 52, zIndex: 6, editable: { content: true } },
      { id: 'gm-title', type: 'text', content: '五 杀！', fontFamily: { $t: 'fonts.heading' }, fontSize: 260, fontWeight: 900, color: { $t: 'colors.ink' }, letterSpacing: 10, x: 140, y: 340, width: 1300, height: 300, zIndex: 7, shadow: { offsetX: 0, offsetY: 0, blur: 56, color: { $t: 'colors.neon' } }, animation: { name: 'zoomIn', duration: 480 }, editable: { content: true, fontSize: { type: 'range', min: 140, max: 320 } } },
      { id: 'gm-sub', type: 'text', content: '残血反杀 · 全程高能', fontFamily: HEI, fontSize: 60, fontWeight: 700, color: { $t: 'colors.neon2' }, x: 140, y: 690, width: 900, height: 80, zIndex: 7, animation: { name: 'slideInRight', duration: 480, delay: 160 }, editable: { content: true } },
      { id: 'gm-badge', type: 'shape', shapeKind: 'circle', x: 1560, y: 700, width: 230, height: 230, fill: { $t: 'colors.neon' }, zIndex: 7, shadow: { offsetX: 0, offsetY: 0, blur: 46, color: { $t: 'colors.neon' } } },
      { id: 'gm-badge-t', type: 'text', content: '1P', fontFamily: IMPACT, fontSize: 84, color: { $t: 'colors.ink' }, textAlign: 'center', x: 1560, y: 758, width: 230, height: 96, zIndex: 8 },
      { id: 'gm-foot', type: 'text', content: '全场集锦 · 第 3 周目 · 无解说版', fontFamily: HEI, fontSize: 32, color: { $t: 'colors.dim' }, x: 140, y: 960, width: 800, height: 44, zIndex: 7, editable: { content: true } },
      { id: 'gm-title-o', type: 'text', content: '五 杀！', fontFamily: { $t: 'fonts.heading' }, fontSize: 260, fontWeight: 900, color: { $t: 'colors.neon' }, letterSpacing: 10, opacity: 0.9, x: 140, y: 352, width: 1300, height: 300, zIndex: 6 },
      { id: 'gm-mp-label', type: 'text', content: 'ULT 能量槽 · 已满', fontFamily: HEI, fontSize: 24, fontWeight: 700, letterSpacing: 3, color: { $t: 'colors.neon2' }, x: 140, y: 208, width: 460, height: 32, zIndex: 4, editable: { content: true } },
      { id: 'gm-mp-track', type: 'shape', shapeKind: 'rect', x: 140, y: 248, width: 600, height: 26, borderRadius: 999, fill: 'rgba(0,0,0,0.55)', zIndex: 4 },
      { id: 'gm-mp-fill', type: 'shape', shapeKind: 'rect', x: 146, y: 254, width: 540, height: 14, borderRadius: 999, fill: { $t: 'colors.neon2' }, zIndex: 5, animation: { name: 'pulse', duration: 1600 } },
      { id: 'gm-time-pill', type: 'shape', shapeKind: 'rect', x: 1130, y: 88, width: 190, height: 68, borderRadius: 999, fill: 'rgba(0,0,0,0.55)', zIndex: 4 },
      { id: 'gm-time-t', type: 'text', content: '14:32', fontFamily: IMPACT, fontSize: 38, color: { $t: 'colors.ink' }, textAlign: 'center', x: 1130, y: 102, width: 190, height: 42, zIndex: 5, editable: { content: true } },
      { id: 'gm-combo', type: 'text', content: '44 COMBO', fontFamily: IMPACT, fontSize: 96, color: { $t: 'colors.neon2' }, rotation: -4, x: 1080, y: 624, width: 520, height: 110, zIndex: 6, shadow: { offsetX: 0, offsetY: 0, blur: 44, color: { $t: 'colors.neon2' } }, editable: { content: true } },
      { id: 'gm-combo-cap', type: 'text', content: '最高连击 · 全场第一', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.dim' }, x: 1086, y: 748, width: 440, height: 36, zIndex: 6, editable: { content: true } },
      { id: 'gm-log', type: 'text', content: '+300 击杀分 · 伤害占比 41.2%', fontFamily: HEI, fontSize: 28, color: { $t: 'colors.dim' }, opacity: 0.75, x: 140, y: 846, width: 760, height: 36, zIndex: 5, editable: { content: true } },
      { id: 'gm-dpad-v', type: 'shape', shapeKind: 'rect', x: 1080, y: 916, width: 26, height: 88, borderRadius: 10, fill: { $t: 'colors.neon2' }, opacity: 0.75, zIndex: 6 },
      { id: 'gm-dpad-h', type: 'shape', shapeKind: 'rect', x: 1049, y: 947, width: 88, height: 26, borderRadius: 10, fill: { $t: 'colors.neon2' }, opacity: 0.75, zIndex: 6 },
      { id: 'gm-btn-a', type: 'shape', shapeKind: 'circle', x: 1180, y: 946, width: 40, height: 40, fill: { $t: 'colors.neon' }, zIndex: 6, animation: { name: 'heartbeat', duration: 1500 } },
      { id: 'gm-btn-b', type: 'shape', shapeKind: 'circle', x: 1236, y: 916, width: 40, height: 40, border: { width: 4, color: { $t: 'colors.neon' } }, zIndex: 6 }
    ]
  }
]

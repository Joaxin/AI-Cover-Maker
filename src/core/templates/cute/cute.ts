// src/core/templates/cute/cute.ts
// 可爱风最早的两条模板：糖果气泡波点 / 手帐贴纸插画风
// 2026-09-21 美化：补底纹与光斑层、加贴纸 sprite 与气泡描边环、动效改为「入场 + 常驻」双层节奏
import type { Template } from '@/types/types'

/** 波点底纹：offset 让第二层网点错开，形成手帐纸的交错排布 */
function dotField(w: number, h: number, gap: number, r: number, fill: string, offset = false) {
  let s = ''
  for (let y = gap / 2; y < h; y += gap) {
    const off = (offset ? (Math.round(y / gap) % 2) : 0) * (gap / 2)
    for (let x = gap / 2; x < w; x += gap) s += `<circle cx='${(x + off).toFixed(1)}' cy='${y}' r='${r}' fill='${fill}'/>`
  }
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${s}</svg>`
}

/** 横线纸：手帐内页的引导线 */
function ruledLines(w: number, h: number, gap: number, stroke: string) {
  let s = ''
  for (let y = gap; y < h; y += gap) s += `<line x1='0' y1='${y}' x2='${w}' y2='${y}' stroke='${stroke}' stroke-width='1.6'/>`
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${s}</svg>`
}

/** 斜纹胶带：贴在纯色胶带条上增加纸纹 */
function tapeStripes(w: number, h: number, fill: string) {
  let s = ''
  for (let x = -h; x < w + h; x += 18) s += `<path d='M${x} ${h} L${x + h} 0 L${x + h + 5} 0 L${x + 5} ${h} Z' fill='${fill}'/>`
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><g opacity='0.55'>${s}</g></svg>`
}

/** 铅笔波浪线：手写标题下的涂鸦下划线 */
function pencilWave(w: number, h: number, stroke: string, waves = 6) {
  const step = w / waves
  let d = `M0 ${h * 0.55}`
  for (let i = 0; i < waves; i++) d += ` Q ${(i + 0.5) * step} ${i % 2 ? h * 0.95 : h * 0.1} ${(i + 1) * step} ${h * 0.55}`
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><path d='${d}' fill='none' stroke='${stroke}' stroke-width='5' stroke-linecap='round'/></svg>`
}

/** 四角星光（白色半透明，跟任何换色预设都不打架） */
function sparkle4(size: number, fill = 'rgba(255,255,255,0.92)') {
  const c = size / 2
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><path d='M${c} 2 Q ${c + size * 0.09} ${c - size * 0.09} ${size - 2} ${c} Q ${c + size * 0.09} ${c + size * 0.09} ${c} ${size - 2} Q ${c - size * 0.09} ${c + size * 0.09} 2 ${c} Q ${c - size * 0.09} ${c - size * 0.09} ${c} 2 Z' fill='${fill}'/></svg>`
}

/** 棒棒糖（白色剪影 + 螺旋纹，靠透明度贴合各种浅色底） */
const LOLLIPOP = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="150" viewBox="0 0 120 150"><rect x="55" y="86" width="10" height="60" rx="5" fill="rgba(255,255,255,0.9)"/><circle cx="60" cy="52" r="48" fill="rgba(255,255,255,0.95)"/><path d="M60 52a10 10 0 0 1 20 0a20 20 0 0 1-40 0a30 30 0 0 1 60 0a40 40 0 0 1-80 0" fill="none" stroke="rgba(148,163,184,0.55)" stroke-width="7" stroke-linecap="round"/></svg>'

/** 抱罐子小熊贴纸 */
const BEAR = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="170" viewBox="0 0 160 170"><circle cx="44" cy="36" r="22" fill="%23B7866B"/><circle cx="116" cy="36" r="22" fill="%23B7866B"/><circle cx="44" cy="36" r="11" fill="%23F4DCC6"/><circle cx="116" cy="36" r="11" fill="%23F4DCC6"/><circle cx="80" cy="66" r="46" fill="%23C89A7C"/><ellipse cx="80" cy="84" rx="24" ry="18" fill="%23F4DCC6"/><circle cx="62" cy="58" r="6" fill="%234A3527"/><circle cx="98" cy="58" r="6" fill="%234A3527"/><ellipse cx="80" cy="76" rx="8" ry="6" fill="%234A3527"/><path d="M80 82v8M80 90c-7 8-18 6-21-2M80 90c7 8 18 6 21-2" fill="none" stroke="%234A3527" stroke-width="4.5" stroke-linecap="round"/><circle cx="46" cy="78" r="9" fill="%23F0A6A6" opacity="0.65"/><circle cx="114" cy="78" r="9" fill="%23F0A6A6" opacity="0.65"/><path d="M34 118h92c8 0 12 6 12 14 0 14-16 24-58 24s-58-10-58-24c0-8 4-14 12-14z" fill="%23F6EFE4" stroke="%23C89A7C" stroke-width="4"/><rect x="30" y="106" width="100" height="16" rx="8" fill="%23F9C9D4"/><text x="80" y="146" font-family="Helvetica, Arial, sans-serif" font-size="20" font-weight="700" text-anchor="middle" fill="%23B7866B">YAY</text></svg>'

/** 爱心贴纸 */
const HEART = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="90" height="82" viewBox="0 0 90 82"><path d="M45 78C18 58 2 42 2 26 2 12 13 2 26 2c8 0 15 4 19 11 4-7 11-11 19-11 13 0 24 10 24 24 0 16-16 32-43 52z" fill="%23F472B6"/><path d="M20 12c6-4 13-3 16 3" fill="none" stroke="rgba(255,255,255,0.85)" stroke-width="6" stroke-linecap="round"/></svg>'

/** 小花贴纸 */
const FLOWER = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96"><g fill="%23FDE68A"><ellipse cx="48" cy="18" rx="14" ry="18"/><ellipse cx="48" cy="78" rx="14" ry="18"/><ellipse cx="18" cy="48" rx="18" ry="14"/><ellipse cx="78" cy="48" rx="18" ry="14"/></g><g fill="%23FBCFE8"><ellipse cx="26" cy="26" rx="15" ry="12" transform="rotate(-45 26 26)"/><ellipse cx="70" cy="26" rx="15" ry="12" transform="rotate(45 70 26)"/><ellipse cx="26" cy="70" rx="15" ry="12" transform="rotate(45 26 70)"/><ellipse cx="70" cy="70" rx="15" ry="12" transform="rotate(-45 70 70)"/></g><circle cx="48" cy="48" r="15" fill="%23FB923C"/></svg>'

const ROUNDED = 'Varela Round, Yuanti SC, "PingFang SC", "Microsoft YaHei", sans-serif'
const KAITI = 'STKaiti, KaiTi, "PingFang SC", serif'
const SANS = 'Helvetica, Arial, sans-serif'
const MONO = 'Consolas, Menlo, "Courier New", monospace'

export const cuteTemplates: Template[] = [
  {
    id: 'cute-bubble-pop', name: '糖果气泡波点', version: '1.2.0', category: 'cute',
    tags: ['cute', 'bubble', 'candy', 'pastel', 'playful', '1:1'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23FEF08A"/><g fill="rgba(255,255,255,0.7)"><circle cx="14" cy="14" r="4"/><circle cx="42" cy="10" r="3"/><circle cx="70" cy="18" r="4"/><circle cx="24" cy="86" r="4"/><circle cx="86" cy="62" r="3"/></g><circle cx="26" cy="24" r="13" fill="%23F472B6"/><circle cx="22" cy="19" r="4" fill="rgba(255,255,255,0.85)"/><circle cx="80" cy="76" r="15" fill="%2338BDF8"/><rect x="12" y="34" width="76" height="46" rx="10" fill="%23FFFFFF" stroke="%231E293B" stroke-width="3"/><rect x="8" y="28" width="24" height="10" rx="5" fill="%2338BDF8" stroke="%231E293B" stroke-width="2"/><rect x="24" y="48" width="52" height="7" rx="3.5" fill="%23F472B6"/><rect x="32" y="62" width="36" height="5" rx="2.5" fill="%2394A3B8"/></svg>',
    tokens: {
      colors: {
        bg: { label: '背景', default: '#FEF08A', options: ['#FEF08A', '#FDE047', '#FEE2E2', '#E0F2FE', '#CCFBF1', '#E0E7FF'] },
        primary: { label: '主色', default: '#F472B6', options: ['#F472B6', '#EC4899', '#DB2777', '#FB7185', '#14B8A6', '#A78BFA'] },
        accent: { label: '辅色', default: '#38BDF8', options: ['#38BDF8', '#0EA5E9', '#A78BFA', '#F59E0B', '#F472B6'] },
        ink: { label: '描边墨', default: '#1E293B', options: ['#1E293B', '#5B2A3A', '#134E4A', '#312E81', '#7C2D12'] },
        paper: { label: '卡片', default: '#FFFFFF', options: ['#FFFFFF', '#FFFBEB', '#FDF2F8', '#F0FDFA'] }
      },
      fonts: {
        heading: { label: '标题字体', default: 'Comic Sans MS, Impact, sans-serif', options: ['Comic Sans MS, Impact, sans-serif', SANS, 'system-ui'] },
        body: { label: '正文字体', default: ROUNDED, options: [ROUNDED, SANS, KAITI] }
      }
    },
    presets: [
      { name: '柠檬糖果', colors: { bg: '#FEF08A', primary: '#F472B6', accent: '#38BDF8', ink: '#1E293B', paper: '#FFFFFF' } },
      { name: '草莓牛奶', colors: { bg: '#FEE2E2', primary: '#FB7185', accent: '#A78BFA', ink: '#5B2A3A', paper: '#FFFBEB' } },
      { name: '薄荷汽水', colors: { bg: '#CCFBF1', primary: '#14B8A6', accent: '#38BDF8', ink: '#134E4A', paper: '#F0FDFA' } },
      { name: '香芋波波', colors: { bg: '#E0E7FF', primary: '#A78BFA', accent: '#F472B6', ink: '#312E81', paper: '#FDF2F8' } }
    ],
    canvas: { virtualWidth: 1000, virtualHeight: 1000, defaultWidth: 1000, defaultHeight: 1000, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'bp-dots-fine', type: 'image', src: dotField(1080, 1080, 58, 7, 'rgba(255,255,255,0.72)'), x: -40, y: -40, width: 1080, height: 1080, objectFit: 'fill', opacity: 0.55, zIndex: 1, animation: { name: 'pulse', duration: 4800, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'bp-dots-bold', type: 'image', src: dotField(1120, 1120, 138, 17, 'rgba(255,255,255,0.5)', true), x: -60, y: -60, width: 1120, height: 1120, objectFit: 'fill', opacity: 0.5, zIndex: 1, animation: { name: 'drift', duration: 9000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'bubble-pink', type: 'shape', shapeKind: 'circle', x: 120, y: 100, width: { $random: { type: 'range', min: 140, max: 220, step: 10 } }, height: { $random: { type: 'range', min: 140, max: 220, step: 10 } }, fill: { $t: 'colors.primary' }, opacity: 0.92, zIndex: 2, animation: { name: 'bounce', duration: 2600, iterationCount: 'infinite', easing: 'ease-in-out' }, editable: { position: true } },
      { id: 'bp-pink-gloss', type: 'shape', shapeKind: 'circle', x: 166, y: 142, width: 46, height: 30, fill: { $t: 'colors.paper' }, opacity: 0.8, zIndex: 3, animation: { name: 'twinkle', duration: 3200, iterationCount: 'infinite' } },
      { id: 'bubble-cyan', type: 'shape', shapeKind: 'circle', x: 720, y: 650, width: 180, height: 180, fill: { $t: 'colors.accent' }, opacity: 0.9, zIndex: 2, animation: { name: 'float', duration: 4200, delay: 400, iterationCount: 'infinite', easing: 'ease-in-out' }, editable: { position: true } },
      { id: 'bp-cyan-gloss', type: 'shape', shapeKind: 'circle', x: 756, y: 684, width: 44, height: 28, fill: { $t: 'colors.paper' }, opacity: 0.75, zIndex: 3, animation: { name: 'twinkle', duration: 3800, delay: 500, iterationCount: 'infinite' } },
      { id: 'bubble-small', type: 'shape', shapeKind: 'circle', x: 780, y: 150, width: 70, height: 70, fill: { $t: 'colors.accent' }, opacity: 0.8, zIndex: 2, animation: { name: 'drift', duration: 5200, iterationCount: 'infinite', easing: 'ease-in-out' }, editable: { position: true } },
      { id: 'bp-bubble-mid', type: 'shape', shapeKind: 'circle', x: 60, y: 660, width: 120, height: 120, fill: { $t: 'colors.primary' }, opacity: 0.45, zIndex: 2, animation: { name: 'float', duration: 5000, delay: 250, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'bp-bubble-tiny-a', type: 'shape', shapeKind: 'circle', x: 520, y: 110, width: 40, height: 40, fill: { $t: 'colors.accent' }, opacity: 0.85, zIndex: 2, animation: { name: 'twinkle', duration: 2800, iterationCount: 'infinite' } },
      { id: 'bp-bubble-tiny-b', type: 'shape', shapeKind: 'circle', x: 926, y: 438, width: 30, height: 30, fill: { $t: 'colors.primary' }, opacity: 0.8, zIndex: 2, animation: { name: 'twinkle', duration: 3400, delay: 600, iterationCount: 'infinite' } },
      { id: 'bp-ring-a', type: 'shape', shapeKind: 'circle', x: 236, y: 690, width: 150, height: 150, fill: 'transparent', border: { width: 4, style: 'dashed', color: { $t: 'colors.accent' } }, zIndex: 2, animation: { name: 'ripple', duration: 3200, iterationCount: 'infinite', easing: 'ease-out' } },
      { id: 'bp-ring-b', type: 'shape', shapeKind: 'circle', x: 830, y: 220, width: 110, height: 110, fill: 'transparent', border: { width: 3, style: 'dashed', color: { $t: 'colors.primary' } }, zIndex: 2, animation: { name: 'ripple', duration: 3800, delay: 900, iterationCount: 'infinite', easing: 'ease-out' } },
      { id: 'card-content', type: 'shape', shapeKind: 'rect', x: 120, y: 260, width: 760, height: 480, fill: { $t: 'colors.paper' }, borderRadius: 40, border: { color: { $t: 'colors.ink' }, width: 6, style: 'solid' }, shadow: { color: { $t: 'colors.ink' }, blur: 0, offsetX: 12, offsetY: 12 }, zIndex: 4, animation: { name: 'zoomIn', duration: 520, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }, editable: { position: true, size: { type: 'scale' } } },
      { id: 'bp-card-inner', type: 'shape', shapeKind: 'rect', x: 152, y: 292, width: 696, height: 416, fill: 'transparent', borderRadius: 28, border: { width: 3, style: 'dashed', color: { $t: 'colors.primary' } }, opacity: 0.55, zIndex: 5 },
      { id: 'bp-tab', type: 'shape', shapeKind: 'rect', x: 196, y: 206, width: 190, height: 62, borderRadius: 31, fill: { $t: 'colors.accent' }, border: { width: 5, color: { $t: 'colors.ink' } }, zIndex: 6, rotation: -6, animation: { name: 'swing', duration: 4600, iterationCount: 'infinite', easing: 'ease-in-out' }, editable: { position: true } },
      { id: 'bp-tab-t', type: 'text', content: 'SWEET', fontFamily: { $t: 'fonts.heading' }, fontSize: 28, fontWeight: '900', color: { $t: 'colors.ink' }, letterSpacing: 5, textAlign: 'center', lineHeight: 2.1, x: 196, y: 206, width: 190, height: 62, rotation: -6, zIndex: 7, editable: { content: true } },
      { id: 'bp-kicker', type: 'text', content: '· TODAY IS A GOOD DAY ·', fontFamily: { $t: 'fonts.heading' }, fontSize: 24, fontWeight: '700', color: { $t: 'colors.primary' }, opacity: 0.9, letterSpacing: 6, textAlign: 'center', x: 160, y: 332, width: 680, height: 32, zIndex: 6, animation: { name: 'slideInLeft', duration: 620, delay: 200 }, editable: { content: true, position: true } },
      { id: 'title-cute', type: 'text', content: 'HAPPY DAY! ✨', fontFamily: { $t: 'fonts.heading' }, fontSize: 72, fontWeight: '900', color: { $t: 'colors.primary' }, textAlign: 'center', lineHeight: 1.08, letterSpacing: 1, shadow: { offsetX: 0, offsetY: 6, blur: 0, color: { $t: 'colors.accent' } }, x: 160, y: 372, width: 680, height: 92, zIndex: 6, animation: { name: 'wobble', duration: 3200, delay: 600, iterationCount: 'infinite' }, editable: { content: true, fontSize: { type: 'range', min: 48, max: 88 }, position: true } },
      { id: 'sub-cute', type: 'text', content: '今天也是元气满满、吃饱喝足的一天！', fontFamily: { $t: 'fonts.body' }, fontSize: 32, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.82, textAlign: 'center', lineHeight: 1.5, letterSpacing: 1, x: 160, y: 486, width: 680, height: 80, zIndex: 6, animation: { name: 'slideUpFade', duration: 800, delay: 420 }, editable: { content: true, fontSize: { type: 'range', min: 21, max: 42 }, position: true } },
      { id: 'bp-foot', type: 'text', content: '气 泡 充 足 · 糖 分 超 标', fontFamily: { $t: 'fonts.body' }, fontSize: 22, fontWeight: '600', color: { $t: 'colors.primary' }, opacity: 0.75, letterSpacing: 3, textAlign: 'center', x: 160, y: 606, width: 680, height: 34, zIndex: 6, animation: { name: 'fadeIn', duration: 900, delay: 720 }, editable: { content: true } },
      { id: 'bp-candy', type: 'image', src: LOLLIPOP, x: 858, y: 500, width: 110, height: 138, objectFit: 'contain', rotation: 10, zIndex: 6, animation: { name: 'swing', duration: 4200, iterationCount: 'infinite', easing: 'ease-in-out' }, editable: { position: true, size: { type: 'scale' } } },
      { id: 'bp-sparkle-a', type: 'image', src: sparkle4(44), x: 56, y: 190, width: 44, height: 44, objectFit: 'contain', zIndex: 6, animation: { name: 'sparkle', duration: 2600, iterationCount: 'infinite' } },
      { id: 'bp-sparkle-b', type: 'image', src: sparkle4(36), x: 912, y: 300, width: 36, height: 36, objectFit: 'contain', zIndex: 6, animation: { name: 'sparkle', duration: 3000, delay: 900, iterationCount: 'infinite' } },
      { id: 'bp-sparkle-c', type: 'image', src: sparkle4(30, 'rgba(255,255,255,0.8)'), x: 430, y: 56, width: 30, height: 30, objectFit: 'contain', zIndex: 6, animation: { name: 'sparkle', duration: 3400, delay: 1500, iterationCount: 'infinite', easing: 'ease-in-out' } }
    ]
  },
  {
    id: 'cute-sticker-diary', name: '手帐贴纸插画风', version: '1.2.0', category: 'cute',
    tags: ['cute', 'diary', 'sticker', 'cheerful', '1:1'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23DBEAFE"/><g fill="rgba(255,255,255,0.7)"><circle cx="12" cy="14" r="3"/><circle cx="88" cy="20" r="3"/><circle cx="16" cy="88" r="3"/><circle cx="84" cy="84" r="3"/></g><rect x="18" y="18" width="64" height="68" rx="6" fill="%23FFFFFF" stroke="%23CBD5E1" stroke-width="1"/><rect x="36" y="12" width="28" height="9" rx="3" fill="%23FDE047" opacity="0.9"/><g stroke="%23BFCBDA" stroke-width="1.4"><path d="M28 40h40M28 50h40M28 60h30"/></g><rect x="54" y="56" width="22" height="24" rx="2" fill="%23FFFFFF" stroke="%23CBD5E1" stroke-width="1"/><rect x="57" y="59" width="16" height="14" fill="%2393C5FD"/><rect x="24" y="26" width="30" height="6" rx="3" fill="%231E40AF"/></svg>',
    tokens: {
      colors: {
        bg: { label: '背景', default: '#DBEAFE', options: ['#DBEAFE', '#E0E7FF', '#FCE7F3', '#DCFCE7', '#FEF9C3'] },
        primary: { label: '主色', default: '#1E40AF', options: ['#1E40AF', '#3B82F6', '#6366F1', '#DB2777', '#15803D', '#B45309'] },
        accent: { label: '辅色', default: '#FDE047', options: ['#FDE047', '#FBBF24', '#F472B6', '#FBCFE8'] },
        ink: { label: '内文墨', default: '#475569', options: ['#475569', '#1F2937', '#4C1D95', '#134E4A', '#78350F'] },
        paper: { label: '纸色', default: '#FFFFFF', options: ['#FFFFFF', '#FFFCF5', '#FEFCE8', '#FFF1F2'] }
      },
      fonts: {
        heading: { label: '标题字体', default: SANS, options: [SANS, 'system-ui', 'Comic Sans MS, sans-serif'] },
        hand: { label: '手写字', default: KAITI, options: [KAITI, ROUNDED, 'Comic Sans MS, sans-serif'] },
        mono: { label: '标签字体', default: MONO, options: [MONO, SANS] }
      }
    },
    presets: [
      { name: '天空蓝调', colors: { bg: '#DBEAFE', primary: '#1E40AF', accent: '#FDE047', ink: '#1F2937', paper: '#FFFFFF' } },
      { name: '樱花粉笺', colors: { bg: '#FCE7F3', primary: '#DB2777', accent: '#FBCFE8', ink: '#475569', paper: '#FFF1F2' } },
      { name: '抹茶手帐', colors: { bg: '#DCFCE7', primary: '#15803D', accent: '#FDE047', ink: '#134E4A', paper: '#FFFCF5' } },
      { name: '奶油柠檬', colors: { bg: '#FEF9C3', primary: '#B45309', accent: '#FBBF24', ink: '#78350F', paper: '#FEFCE8' } }
    ],
    canvas: { virtualWidth: 1000, virtualHeight: 1000, defaultWidth: 1000, defaultHeight: 1000, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'sd-bg-dots', type: 'image', src: dotField(1060, 1060, 74, 9, 'rgba(255,255,255,0.6)', true), x: -30, y: -30, width: 1060, height: 1060, objectFit: 'fill', zIndex: 1, animation: { name: 'pulse', duration: 5200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'paper-sheet', type: 'shape', shapeKind: 'rect', x: 140, y: 120, width: 720, height: 760, fill: { $t: 'colors.paper' }, borderRadius: 20, border: { width: 2, color: 'rgba(148,163,184,0.35)' }, shadow: { color: 'rgba(30,41,59,0.16)', blur: 28, offsetX: 0, offsetY: 14 }, zIndex: 2, animation: { name: 'fadeInDown', duration: 620 }, editable: { position: true, size: { type: 'scale' } } },
      { id: 'sd-rules', type: 'image', src: ruledLines(620, 594, 44, 'rgba(100,116,139,0.20)'), x: 214, y: 252, width: 620, height: 594, objectFit: 'fill', opacity: 0.85, zIndex: 3 },
      { id: 'sd-margin-line', type: 'shape', shapeKind: 'rect', x: 196, y: 120, width: 3, height: 760, fill: { $t: 'colors.primary' }, opacity: 0.22, zIndex: 3 },
      { id: 'sd-hole-a', type: 'shape', shapeKind: 'circle', x: 158, y: 248, width: 34, height: 34, fill: { $t: 'colors.bg' }, border: { width: 2, color: 'rgba(148,163,184,0.4)' }, zIndex: 4 },
      { id: 'sd-hole-b', type: 'shape', shapeKind: 'circle', x: 158, y: 483, width: 34, height: 34, fill: { $t: 'colors.bg' }, border: { width: 2, color: 'rgba(148,163,184,0.4)' }, zIndex: 4 },
      { id: 'sd-hole-c', type: 'shape', shapeKind: 'circle', x: 158, y: 718, width: 34, height: 34, fill: { $t: 'colors.bg' }, border: { width: 2, color: 'rgba(148,163,184,0.4)' }, zIndex: 4 },
      { id: 'title-sticker', type: 'text', content: '🧸 DAILY VLOG', fontFamily: { $t: 'fonts.heading' }, fontSize: 46, fontWeight: '900', color: { $t: 'colors.primary' }, letterSpacing: 1, x: 214, y: 168, width: 420, height: 66, zIndex: 6, animation: { name: 'slideInLeft', duration: 700, delay: 200 }, editable: { content: true, fontSize: { type: 'range', min: 32, max: 60 }, position: true } },
      { id: 'sd-title-wave', type: 'image', src: pencilWave(300, 20, 'rgba(71,85,105,0.45)'), x: 216, y: 238, width: 300, height: 20, objectFit: 'fill', zIndex: 5, animation: { name: 'inkReveal', duration: 1100, delay: 560 } },
      { id: 'sd-date-chip', type: 'shape', shapeKind: 'rect', x: 636, y: 172, width: 190, height: 48, borderRadius: 24, fill: { $t: 'colors.paper' }, border: { width: 3, color: { $t: 'colors.primary' } }, zIndex: 6, rotation: 3 },
      { id: 'sd-date-text', type: 'text', content: '2026.09.21 SUN', fontFamily: { $t: 'fonts.mono' }, fontSize: 20, fontWeight: '700', color: { $t: 'colors.primary' }, textAlign: 'center', lineHeight: 2.3, x: 636, y: 172, width: 190, height: 48, rotation: 3, zIndex: 7, animation: { name: 'fadeIn', duration: 800, delay: 640 }, editable: { content: true } },
      { id: 'note-body', type: 'text', content: '记录生活中的可爱碎碎念\n每一个微小瞬间都闪闪发光 🌸', fontFamily: { $t: 'fonts.hand' }, fontSize: 26, fontWeight: '600', color: { $t: 'colors.ink' }, lineHeight: 1.9, x: 214, y: 268, width: 410, height: 170, zIndex: 5, animation: { name: 'fadeInUp', duration: 800, delay: 420 }, editable: { content: true, fontSize: { type: 'range', min: 16, max: 36 }, position: true } },
      { id: 'sd-photo-frame', type: 'shape', shapeKind: 'rect', x: 646, y: 268, width: 208, height: 254, borderRadius: 8, fill: { $t: 'colors.paper' }, border: { width: 2, color: 'rgba(148,163,184,0.45)' }, shadow: { color: 'rgba(30,41,59,0.2)', blur: 16, offsetX: 0, offsetY: 8 }, zIndex: 6, rotation: 3, animation: { name: 'zoomIn', duration: 620, delay: 520, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }, editable: { position: true, size: { type: 'scale' } } },
      { id: 'diary-photo', type: 'image', src: '/images/photo/daily-vlog-400x400.jpg', x: 660, y: 282, width: 180, height: 180, objectFit: 'cover', rotation: 3, zIndex: 7, editable: { src: { type: 'upload' }, position: true, size: { type: 'scale' } } },
      { id: 'sd-photo-cap', type: 'text', content: '今日份的小确幸', fontFamily: { $t: 'fonts.hand' }, fontSize: 20, fontWeight: '600', color: { $t: 'colors.ink' }, opacity: 0.75, textAlign: 'center', x: 646, y: 470, width: 208, height: 40, rotation: 3, zIndex: 7, editable: { content: true } },
      { id: 'sd-check-box-a', type: 'shape', shapeKind: 'rect', x: 214, y: 506, width: 32, height: 32, borderRadius: 9, fill: { $t: 'colors.paper' }, border: { width: 3, color: { $t: 'colors.primary' } }, zIndex: 5 },
      { id: 'sd-check-tick-a', type: 'text', content: '✓', fontFamily: SANS, fontSize: 26, fontWeight: '900', color: { $t: 'colors.primary' }, textAlign: 'center', lineHeight: 1.2, x: 214, y: 506, width: 32, height: 32, rotation: -6, zIndex: 6, animation: { name: 'inkReveal', duration: 700, delay: 900 } },
      { id: 'sd-check-item-a', type: 'text', content: '买到了秋天的第一杯芋泥', fontFamily: { $t: 'fonts.hand' }, fontSize: 23, fontWeight: '600', color: { $t: 'colors.ink' }, opacity: 0.9, x: 260, y: 504, width: 360, height: 36, zIndex: 5, animation: { name: 'slideUpFade', duration: 620, delay: 760 }, editable: { content: true } },
      { id: 'sd-check-box-b', type: 'shape', shapeKind: 'rect', x: 214, y: 556, width: 32, height: 32, borderRadius: 9, fill: { $t: 'colors.paper' }, border: { width: 3, color: { $t: 'colors.primary' } }, zIndex: 5 },
      { id: 'sd-check-tick-b', type: 'text', content: '✓', fontFamily: SANS, fontSize: 26, fontWeight: '900', color: { $t: 'colors.primary' }, textAlign: 'center', lineHeight: 1.2, x: 214, y: 556, width: 32, height: 32, rotation: -6, zIndex: 6, animation: { name: 'inkReveal', duration: 700, delay: 1060 } },
      { id: 'sd-check-item-b', type: 'text', content: '给窗台的多肉换了新盆', fontFamily: { $t: 'fonts.hand' }, fontSize: 23, fontWeight: '600', color: { $t: 'colors.ink' }, opacity: 0.9, x: 260, y: 554, width: 360, height: 36, zIndex: 5, animation: { name: 'slideUpFade', duration: 620, delay: 920 }, editable: { content: true } },
      { id: 'sd-check-box-c', type: 'shape', shapeKind: 'rect', x: 214, y: 606, width: 32, height: 32, borderRadius: 9, fill: { $t: 'colors.paper' }, border: { width: 3, color: { $t: 'colors.primary' } }, zIndex: 5 },
      { id: 'sd-check-tick-c', type: 'text', content: '✓', fontFamily: SANS, fontSize: 26, fontWeight: '900', color: { $t: 'colors.primary' }, textAlign: 'center', lineHeight: 1.2, x: 214, y: 606, width: 32, height: 32, rotation: -6, zIndex: 6, animation: { name: 'inkReveal', duration: 700, delay: 1220 } },
      { id: 'sd-check-item-c', type: 'text', content: '记下三个发光的小念头', fontFamily: { $t: 'fonts.hand' }, fontSize: 23, fontWeight: '600', color: { $t: 'colors.ink' }, opacity: 0.9, x: 260, y: 604, width: 360, height: 36, zIndex: 5, animation: { name: 'slideUpFade', duration: 620, delay: 1080 }, editable: { content: true } },
      { id: 'sd-tape-left', type: 'shape', shapeKind: 'rect', x: 148, y: 98, width: 160, height: 44, fill: { $t: 'colors.primary' }, opacity: 0.72, rotation: -14, zIndex: 9, animation: { name: 'swing', duration: 6000, delay: 300, iterationCount: 'infinite', easing: 'ease-in-out' }, editable: { position: true } },
      { id: 'sd-tape-left-tex', type: 'image', src: tapeStripes(160, 44, 'rgba(255,255,255,0.5)'), x: 148, y: 98, width: 160, height: 44, objectFit: 'fill', rotation: -14, zIndex: 10, animation: { name: 'swing', duration: 6000, delay: 300, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'tape-top', type: 'shape', shapeKind: 'rect', x: 400, y: 90, width: 200, height: 50, fill: { $t: 'colors.accent' }, opacity: 0.9, rotation: -4, zIndex: 9, animation: { name: 'swing', duration: 5200, iterationCount: 'infinite', easing: 'ease-in-out' }, editable: { position: true } },
      { id: 'sd-tape-top-tex', type: 'image', src: tapeStripes(200, 50, 'rgba(255,255,255,0.45)'), x: 400, y: 90, width: 200, height: 50, objectFit: 'fill', rotation: -4, zIndex: 10, animation: { name: 'swing', duration: 5200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'sd-tape-right', type: 'shape', shapeKind: 'rect', x: 706, y: 96, width: 172, height: 42, fill: { $t: 'colors.accent' }, opacity: 0.82, rotation: 12, zIndex: 9, animation: { name: 'swing', duration: 6800, delay: 900, iterationCount: 'infinite', easing: 'ease-in-out' }, editable: { position: true } },
      { id: 'sd-tape-right-tex', type: 'image', src: tapeStripes(172, 42, 'rgba(255,255,255,0.45)'), x: 706, y: 96, width: 172, height: 42, objectFit: 'fill', rotation: 12, zIndex: 10, animation: { name: 'swing', duration: 6800, delay: 900, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'sd-bear', type: 'image', src: BEAR, x: 644, y: 548, width: 176, height: 187, objectFit: 'contain', rotation: 5, zIndex: 8, animation: { name: 'wobble', duration: 4600, delay: 800, iterationCount: 'infinite' }, editable: { position: true, size: { type: 'scale' } } },
      { id: 'sd-flower', type: 'image', src: FLOWER, x: 556, y: 690, width: 82, height: 82, objectFit: 'contain', rotation: -12, zIndex: 8, animation: { name: 'swing', duration: 5600, iterationCount: 'infinite', easing: 'ease-in-out' }, editable: { position: true, size: { type: 'scale' } } },
      { id: 'heart-dot-a', type: 'image', src: HEART, x: 208, y: 790, width: 50, height: 46, objectFit: 'contain', rotation: -8, zIndex: 8, animation: { name: 'heartbeat', duration: 1800, iterationCount: 'infinite' }, editable: { position: true } },
      { id: 'heart-dot-b', type: 'image', src: HEART, x: 266, y: 800, width: 34, height: 31, objectFit: 'contain', rotation: 10, opacity: 0.85, zIndex: 8, animation: { name: 'heartbeat', duration: 2200, delay: 320, iterationCount: 'infinite' } },
      { id: 'sd-heart-dot-c', type: 'shape', shapeKind: 'circle', x: 314, y: 806, width: 20, height: 20, fill: { $t: 'colors.accent' }, zIndex: 8, animation: { name: 'twinkle', duration: 2600, delay: 600, iterationCount: 'infinite' } },
      { id: 'sd-foot', type: 'text', content: '今日份的快乐已经存档啦', fontFamily: { $t: 'fonts.hand' }, fontSize: 21, fontWeight: '600', color: { $t: 'colors.ink' }, opacity: 0.6, letterSpacing: 1, x: 350, y: 798, width: 280, height: 36, zIndex: 6, animation: { name: 'fadeIn', duration: 900, delay: 1200 }, editable: { content: true } },
      { id: 'sd-page', type: 'text', content: 'PAGE 07', fontFamily: { $t: 'fonts.mono' }, fontSize: 18, fontWeight: '700', color: { $t: 'colors.primary' }, opacity: 0.7, letterSpacing: 2, textAlign: 'right', x: 664, y: 800, width: 172, height: 32, zIndex: 6, animation: { name: 'fadeIn', duration: 900, delay: 1400 } },
      { id: 'sd-sparkle-a', type: 'image', src: sparkle4(44, 'rgba(251,191,36,0.95)'), x: 52, y: 56, width: 44, height: 44, objectFit: 'contain', zIndex: 8, animation: { name: 'sparkle', duration: 2800, iterationCount: 'infinite' } },
      { id: 'sd-sparkle-b', type: 'image', src: sparkle4(36, 'rgba(244,114,182,0.9)'), x: 902, y: 480, width: 36, height: 36, objectFit: 'contain', zIndex: 8, animation: { name: 'sparkle', duration: 3200, delay: 900, iterationCount: 'infinite' } },
      { id: 'sd-sparkle-c', type: 'image', src: sparkle4(30, 'rgba(255,255,255,0.95)'), x: 40, y: 872, width: 30, height: 30, objectFit: 'contain', zIndex: 8, animation: { name: 'sparkle', duration: 3600, delay: 1600, iterationCount: 'infinite' } }
    ]
  }
]

import type { Template } from '@/types/types'

// 手绘涂鸦装饰（原创 SVG，纸感线稿）
const SCRIBBLE_UNDERLINE_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="420" height="40" viewBox="0 0 420 40"><path d="M6 26 C 90 6, 150 34, 230 16 S 360 8, 414 22" fill="none" stroke="%23dc2626" stroke-width="6" stroke-linecap="round"/></svg>'
const STAR_DOODLE_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"><path d="M40 8 L49 31 L74 31 L54 46 L62 70 L40 55 L18 70 L26 46 L6 31 L31 31 Z" fill="none" stroke="%2378350f" stroke-width="4" stroke-linejoin="round"/></svg>'
const CURVED_ARROW_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="120" viewBox="0 0 160 120"><path d="M10 20 C 90 10, 130 60, 118 104" fill="none" stroke="%2378350f" stroke-width="4" stroke-linecap="round"/><path d="M104 88 L120 108 L134 84" fill="none" stroke="%2378350f" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>'
const TAPE_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="60" viewBox="0 0 160 60"><rect width="160" height="60" fill="%23fde68a" opacity="0.75"/><path d="M0 0 L18 30 L0 60 M160 0 L142 30 L160 60" fill="none" stroke="%23f59e0b" stroke-width="2" opacity="0.5"/></svg>'
// 纹理保持低透明度，避免与 colors.bg 预设冲突
const GRAPH_BG_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000"><g stroke="%2364748b" stroke-width="1" opacity="0.22">'
  + Array.from({ length: 21 }, (_, i) => `<line x1="${i * 50}" y1="0" x2="${i * 50}" y2="1000"/><line x1="0" y1="${i * 50}" x2="1000" y2="${i * 50}"/>`).join('')
  + '</g></svg>'
const KRAFT_DOT_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000"><pattern id="kraft" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="%23D97706" opacity="0.15"/></pattern><rect width="1000" height="1000" fill="url(%23kraft)"/></svg>'

// —— 以下辅助仅服务 handdrawn-marker-scribble：手绘笔触全部用 shape + token 色拼出，换色面板可跟随 ——
// 穿心放射笔画：3 条同中心、互差 60° 的长条 = 6 道光芒（米字星芒 / 闪光记号）
function msBurst(id: string, cx: number, cy: number, len: number, thick: number, color: { $t: string }, opacity: number, zIndex: number, rotation0 = 0) {
  return [0, 60, 120].map((d, i) => ({
    id: `${id}-${i}`, type: 'shape' as const, shapeKind: 'rect' as const,
    x: Math.round(cx - thick / 2), y: Math.round(cy - len / 2), width: thick, height: len,
    rotation: rotation0 + d, fill: color as any, opacity, borderRadius: thick / 2, zIndex
  }))
}
// 记号笔胶带条：半透明斜置矩形（四角各一条，允许少量出血）
function msTape(id: string, x: number, y: number, w: number, h: number, rotation: number, zIndex: number) {
  return { id, type: 'shape' as const, shapeKind: 'rect' as const, x, y, width: w, height: h, rotation, fill: { $t: 'colors.highlight' } as any, opacity: 0.55, borderRadius: 3, zIndex }
}

// —— 以下辅助仅服务 handdrawn-sketchbook：速写本页纹 / 螺旋装订孔 / 撕除线 ——
// 螺旋装订孔：左侧一列打孔小圆（换色面板跟随 bg + ink）
const SB_HOLES = Array.from({ length: 5 }, (_, i) => ({
  id: `sb-hole-${i}`, type: 'shape' as const, shapeKind: 'circle' as const,
  x: 40, y: 170 + i * 165, width: 28, height: 28,
  fill: { $t: 'colors.bg' } as any, border: { color: { $t: 'colors.ink' } as any, width: 3 },
  opacity: 0.9, zIndex: 2
}))
// 页面横线：正文背后的速写本格线，极低透明度不抢字
const SB_RULES = Array.from({ length: 4 }, (_, i) => ({
  id: `sb-rule-${i}`, type: 'shape' as const, shapeKind: 'rect' as const,
  x: 120, y: 300 + i * 150, width: 760, height: 2,
  fill: { $t: 'colors.annotation' } as any, opacity: 0.14, zIndex: 1
}))
// 撕除线（毛边）：顶部一列半圆缺口 + 一道虚线，像从本子上撕下来
const SB_RIP_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="820" height="22" viewBox="0 0 820 22"><g fill="%23ffffff" fill-opacity="0.5">'
  + Array.from({ length: 21 }, (_, i) => `<circle cx="${10 + i * 40}" cy="2" r="6"/>`).join('')
  + '</g><line x1="4" y1="14" x2="816" y2="14" stroke="%23000000" stroke-opacity="0.22" stroke-width="2" stroke-dasharray="7 7"/></svg>'

export const handdrawnTemplates: Template[] = [
  {
    id: 'handdrawn-sketchbook', name: '草图本手绘随笔', version: '1.2.0', category: 'handdrawn', tags: ['handdrawn', 'sketch', 'pencil', 'doodle', 'kraft'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23fef3c7"/><g stroke="%23b45309" stroke-width="1" opacity="0.28"><line x1="20" y1="40" x2="84" y2="40"/><line x1="20" y1="55" x2="84" y2="55"/><line x1="20" y1="70" x2="84" y2="70"/><line x1="20" y1="85" x2="84" y2="85"/></g><rect x="15" y="14" width="72" height="72" rx="6" fill="none" stroke="%2378350f" stroke-width="1.6" stroke-dasharray="3,3"/><g fill="%23fef3c7" stroke="%2378350f" stroke-width="1.2"><circle cx="9" cy="24" r="3"/><circle cx="9" cy="42" r="3"/><circle cx="9" cy="60" r="3"/><circle cx="9" cy="78" r="3"/></g><line x1="17" y1="15" x2="85" y2="15" stroke="%2378350f" stroke-width="1" stroke-dasharray="3 3" opacity="0.4"/><g fill="%23fde68a" opacity="0.85"><rect x="2" y="8" width="16" height="6" transform="rotate(-38 10 11)"/><rect x="82" y="8" width="16" height="6" transform="rotate(38 90 11)"/><rect x="2" y="86" width="16" height="6" transform="rotate(38 10 89)"/><rect x="82" y="86" width="16" height="6" transform="rotate(-38 90 89)"/></g><rect x="24" y="24" width="42" height="5" fill="%2378350f"/><rect x="25" y="25" width="42" height="5" fill="%23dc2626" opacity="0.22"/><rect x="24" y="32" width="30" height="4" fill="%2392400e"/><path d="M24 44 C 38 41, 50 47, 66 43" fill="none" stroke="%23dc2626" stroke-width="2" stroke-linecap="round"/><rect x="25" y="47" width="34" height="1.6" fill="%23dc2626" opacity="0.5"/><circle cx="80" cy="58" r="4.5" fill="none" stroke="%23dc2626" stroke-width="1.4"/><rect x="78" y="63" width="5" height="2" fill="%23dc2626"/><text x="60" y="76" font-size="6" fill="%23dc2626" opacity="0.9" font-family="sans-serif" transform="rotate(-6 66 74)">别撕这页</text><path d="M78 78 L88 78 L88 88 Z" fill="%2378350f" opacity="0.18"/></svg>',
    tokens: {
      colors: {
        bg: { label: '纸面', default: '#FEF3C7', options: ['#FEF3C7', '#FFFBEB', '#FDF6E3', '#FFEDD5', '#E7E5E4', '#0F172A'] },
        ink: { label: '主墨色', default: '#78350F', options: ['#78350F', '#92400E', '#292524', '#1C1917', '#1E3A8A', '#FDE047', '#7C2D12'] },
        body: { label: '正文色', default: '#92400E', options: ['#92400E', '#78350F', '#57534E', '#334155', '#7C2D12', '#FDE68A', '#9A3412'] },
        accent: { label: '涂鸦强调', default: '#DC2626', options: ['#DC2626', '#EA580C', '#0D9488', '#4338CA', '#FDE047', '#F97316'] },
        annotation: { label: '注释色', default: '#B45309', options: ['#B45309', '#D97706', '#78716C', '#64748B', '#94A3B8'] }
      },
      fonts: {
        hand: { label: '手写字体', default: 'Courier New, Georgia, monospace', options: ['Courier New, Georgia, monospace', 'Courier New, monospace', 'Comic Sans MS, cursive'] }
      }
    },
    presets: [
      { name: '牛皮纸暖棕', colors: { bg: '#FEF3C7', ink: '#78350F', body: '#92400E', accent: '#DC2626', annotation: '#B45309' } },
      { name: '米纸炭墨', colors: { bg: '#FDF6E3', ink: '#292524', body: '#57534E', accent: '#EA580C', annotation: '#78716C' } },
      { name: '橘调速写', colors: { bg: '#FFEDD5', ink: '#7C2D12', body: '#9A3412', accent: '#0D9488', annotation: '#B45309' } },
      { name: '黑板粉彩', colors: { bg: '#0F172A', ink: '#FDE047', body: '#FDE68A', accent: '#F97316', annotation: '#94A3B8' } }
    ],
    canvas: { virtualWidth: 1000, virtualHeight: 1000, defaultWidth: 1000, defaultHeight: 1000, backgroundColor: { $t: 'colors.bg' }, backgroundImage: KRAFT_DOT_SVG },
    elements: [
      // —— 纸面层：撕除线 + 螺旋装订孔 + 页面横线 + 装订侧阴影 ——
      { id: 'sb-rip', type: 'image', src: SB_RIP_SVG, objectFit: 'contain', x: 90, y: 76, width: 820, height: 24, zIndex: 1 },
      ...SB_HOLES,
      ...SB_RULES,
      { id: 'sb-gutter', type: 'shape', shapeKind: 'rect', x: 76, y: 96, width: 20, height: 808, fill: { $t: 'colors.ink' }, opacity: 0.08, borderRadius: 10, zIndex: 1 },
      { id: 'doodle-box', type: 'shape', shapeKind: 'rect', x: 90, y: 90, width: 820, height: 820, border: { color: { $t: 'colors.ink' }, width: 4, style: 'dashed' }, borderRadius: 16, zIndex: 1 },
      // —— 标题区：主标题 + 错位回声 + 双层笔触划线 ——
      { id: 'sketch-title', type: 'text', content: 'CREATIVE\nSKETCHBOOK', fontFamily: { $t: 'fonts.hand' }, fontSize: 64, fontWeight: '900', color: { $t: 'colors.ink' }, lineHeight: 1.2, x: 140, y: 160, width: 720, height: 180, zIndex: 2, animation: { name: 'fadeInUp', duration: 800 }, editable: { content: true, fontSize: { type: 'range', min: 40, max: 96 }, position: true } },
      { id: 'sketch-title-echo', type: 'text', content: 'CREATIVE\nSKETCHBOOK', fontFamily: { $t: 'fonts.hand' }, fontSize: 64, fontWeight: '900', color: { $t: 'colors.accent' }, opacity: 0.22, rotation: 1.6, lineHeight: 1.2, x: 155, y: 172, width: 720, height: 180, zIndex: 1 },
      { id: 'underline-scribble', type: 'image', src: SCRIBBLE_UNDERLINE_SVG, objectFit: 'contain', x: 150, y: 340, width: 380, height: 34, zIndex: 3, animation: { name: 'inkReveal', duration: 900, delay: 400 } },
      { id: 'sb-stroke-thin', type: 'shape', shapeKind: 'rect', x: 158, y: 372, width: 330, height: 6, fill: { $t: 'colors.accent' }, opacity: 0.45, rotation: 1.4, borderRadius: 3, zIndex: 3 },
      { id: 'doodle-body', type: 'text', content: '“Art is not what you see, but what you make others see.”\n\n— Handcrafted thoughts, ideas and visual notes from the studio desk.', fontFamily: { $t: 'fonts.hand' }, fontSize: 26, fontWeight: '600', color: { $t: 'colors.body' }, lineHeight: 1.6, x: 140, y: 420, width: 640, height: 240, zIndex: 2, editable: { content: true, fontSize: { type: 'range', min: 18, max: 40 }, position: true } },
      // —— 散布小速写：灯泡简笔（圆 + 灯座） + 旁注手写字 ——
      { id: 'sb-doodle-bulb', type: 'shape', shapeKind: 'circle', x: 824, y: 424, width: 54, height: 54, border: { color: { $t: 'colors.accent' }, width: 4, style: 'solid' }, opacity: 0.8, rotation: 8, zIndex: 4, animation: { name: 'twinkle', duration: 3400, iterationCount: 'infinite' } },
      { id: 'sb-doodle-bulb-base', type: 'shape', shapeKind: 'rect', x: 840, y: 480, width: 22, height: 9, fill: { $t: 'colors.accent' }, opacity: 0.8, rotation: 8, borderRadius: 4, zIndex: 4 },
      { id: 'sb-side-note', type: 'text', content: '第 47 次改稿\n先别撕这一页', fontFamily: 'Comic Sans MS, cursive', fontSize: 22, fontWeight: '700', color: { $t: 'colors.accent' }, opacity: 0.85, rotation: -6, x: 640, y: 700, width: 200, height: 64, zIndex: 5, editable: { content: true } },
      { id: 'star-a', type: 'image', src: STAR_DOODLE_SVG, objectFit: 'contain', x: 720, y: 560, width: 84, height: 84, zIndex: 4, animation: { name: 'twinkle', duration: 2600, iterationCount: 'infinite' } },
      { id: 'curved-arrow', type: 'image', src: CURVED_ARROW_SVG, objectFit: 'contain', x: 300, y: 660, width: 150, height: 120, zIndex: 4, animation: { name: 'swing', duration: 2400, iterationCount: 'infinite', easing: 'ease-in-out' } },
      // —— 页角翻页 + 四角胶带（压在纸面上方） ——
      { id: 'sb-corner-curl', type: 'shape', shapeKind: 'rect', x: 838, y: 838, width: 76, height: 76, fill: { $t: 'colors.ink' }, opacity: 0.14, rotation: 45, borderRadius: 12, shadow: { offsetX: 4, offsetY: 6, blur: 12, color: 'rgba(0,0,0,0.18)' }, zIndex: 5 },
      { id: 'tape-tl', type: 'image', src: TAPE_SVG, objectFit: 'contain', x: 66, y: 74, width: 150, height: 56, rotation: -38, zIndex: 6 },
      { id: 'tape-tr', type: 'image', src: TAPE_SVG, objectFit: 'contain', x: 784, y: 74, width: 150, height: 56, rotation: 38, zIndex: 6 },
      { id: 'tape-bl', type: 'image', src: TAPE_SVG, objectFit: 'contain', x: 66, y: 870, width: 150, height: 56, rotation: 38, zIndex: 6 },
      { id: 'tape-br', type: 'image', src: TAPE_SVG, objectFit: 'contain', x: 786, y: 872, width: 150, height: 56, rotation: -38, zIndex: 6 },
      { id: 'footer-hand', type: 'text', content: 'sketched by hand · no.01', fontFamily: { $t: 'fonts.hand' }, fontSize: 20, fontWeight: '700', color: { $t: 'colors.annotation' }, x: 520, y: 840, width: 240, height: 34, textAlign: 'right', zIndex: 5, editable: { content: true } }
    ]
  },
  {
    id: 'handdrawn-marker-scribble', name: '记号笔涂鸦速写', version: '1.2.0', category: 'handdrawn', tags: ['handdrawn', 'marker', 'graffiti', 'scribble'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23ffffff"/><g stroke="%2364748b" stroke-width="0.5" opacity="0.25"><path d="M20 0V100M40 0V100M60 0V100M80 0V100M0 20H100M0 40H100M0 60H100M0 80H100"/></g><rect x="4" y="4" width="92" height="92" rx="2" fill="none" stroke="%230f172a" stroke-width="1" stroke-dasharray="3 2" opacity="0.5"/><rect x="7" y="10" width="18" height="6" fill="%23fde68a" opacity="0.9" transform="rotate(-34 16 13)"/><rect x="76" y="8" width="18" height="6" fill="%23fde68a" opacity="0.9" transform="rotate(32 85 11)"/><rect x="6" y="86" width="18" height="6" fill="%23fde68a" opacity="0.9" transform="rotate(20 15 89)"/><rect x="78" y="86" width="18" height="6" fill="%23fde68a" opacity="0.9" transform="rotate(-28 87 89)"/><ellipse cx="24" cy="32" rx="13" ry="9" fill="none" stroke="%23dc2626" stroke-width="1.6" transform="rotate(-8 24 32)"/><rect x="8" y="46" width="84" height="11" fill="%23fef08a" opacity="0.9" transform="rotate(-1.5 50 51)"/><rect x="10" y="27" width="52" height="9" fill="%230f172a"/><rect x="10" y="48" width="46" height="6" fill="%23dc2626"/><path d="M10 62 C 26 58, 40 66, 56 61" fill="none" stroke="%23dc2626" stroke-width="3" stroke-linecap="round"/><rect x="10" y="66" width="42" height="3" fill="%23dc2626"/><rect x="12" y="70" width="34" height="2" fill="%23dc2626" opacity="0.55"/><g fill="%23dc2626"><rect x="82" y="60" width="3" height="17" rx="1.5" transform="rotate(22 83.5 68.5)"/><rect x="78" y="74" width="13" height="3" rx="1.5" transform="rotate(-10 84.5 75.5)"/><rect x="83" y="76" width="3" height="16" rx="1.5" transform="rotate(22 84.5 84)"/></g><path d="M70 20 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2z" fill="%23dc2626"/><rect x="10" y="78" width="30" height="2" fill="%2364748b" opacity="0.5"/></svg>',
    tokens: {
      colors: {
        bg: { label: '纸面', default: '#FFFFFF', options: ['#FFFFFF', '#FAFAF9', '#FEF9C3', '#FDF6E3', '#F1F5F9'] },
        ink: { label: '主墨色', default: '#0F172A', options: ['#0F172A', '#1C1917', '#78350F', '#111827'] },
        accent: { label: '记号笔红', default: '#DC2626', options: ['#DC2626', '#EF4444', '#EA580C', '#7C3AED', '#0D9488'] },
        highlight: { label: '荧光底色', default: '#FEF08A', options: ['#FEF08A', '#BBF7D0', '#BFDBFE', '#FBCFE8', '#FDE047'] },
        annotation: { label: '注释色', default: '#64748B', options: ['#64748B', '#94A3B8', '#78716C'] }
      },
      fonts: {
        head: { label: '标题字体', default: 'Impact, sans-serif', options: ['Impact, sans-serif', 'Arial Black, sans-serif', 'Courier New, monospace'] }
      }
    },
    presets: [
      { name: '白纸红笔', colors: { bg: '#FFFFFF', ink: '#0F172A', accent: '#DC2626', highlight: '#FEF08A', annotation: '#64748B' } },
      { name: '牛皮马克', colors: { bg: '#FEF9C3', ink: '#1C1917', accent: '#EA580C', highlight: '#FDE047', annotation: '#78716C' } },
      { name: '紫夜荧光', colors: { bg: '#F1F5F9', ink: '#111827', accent: '#7C3AED', highlight: '#BFDBFE', annotation: '#94A3B8' } },
      { name: '米纸青笔', colors: { bg: '#FAFAF9', ink: '#78350F', accent: '#0D9488', highlight: '#BBF7D0', annotation: '#94A3B8' } }
    ],
    canvas: { virtualWidth: 1000, virtualHeight: 1000, defaultWidth: 1000, defaultHeight: 1000, backgroundColor: { $t: 'colors.bg' }, backgroundImage: GRAPH_BG_SVG },
    elements: [
      // —— 纸面层：格纹底（canvas 图）+ 手写虚线框 + 一道涂满的草稿字 ——
      { id: 'ms-frame', type: 'shape', shapeKind: 'rect', x: 34, y: 34, width: 932, height: 932, border: { color: { $t: 'colors.ink' }, width: 4, style: 'dashed' }, borderRadius: 12, opacity: 0.34, rotation: -0.5, zIndex: 1 },
      { id: 'ms-ghost-title', type: 'text', content: 'RAW & REAL', fontFamily: { $t: 'fonts.head' }, fontSize: 96, fontWeight: '900', color: { $t: 'colors.accent' }, opacity: 0.24, rotation: -1.8, x: 107, y: 198, width: 800, height: 120, zIndex: 1 },
      { id: 'marker-highlight', type: 'shape', shapeKind: 'rect', x: 80, y: 330, width: 840, height: 96, fill: { $t: 'colors.highlight' }, opacity: 0.85, rotation: -1.5, borderRadius: 6, zIndex: 1, animation: { name: 'zoomIn', duration: 600 } },
      { id: 'ms-greek-1', type: 'shape', shapeKind: 'rect', x: 662, y: 748, width: 246, height: 7, fill: { $t: 'colors.ink' }, opacity: 0.14, rotation: -1.2, borderRadius: 4, zIndex: 1 },
      // —— 标题区 ——
      { id: 'scribble-header', type: 'text', content: 'RAW & REAL', fontFamily: { $t: 'fonts.head' }, fontSize: 96, fontWeight: '900', color: { $t: 'colors.ink' }, x: 100, y: 190, width: 800, height: 120, zIndex: 2, animation: { name: 'slideInLeft', duration: 700 }, editable: { content: true, fontSize: { type: 'range', min: 60, max: 130 }, position: true } },
      { id: 'scribble-sub', type: 'text', content: 'NO FILTERS. JUST THOUGHTS.', fontFamily: { $t: 'fonts.head' }, fontSize: 48, fontWeight: '700', color: { $t: 'colors.accent' }, x: 100, y: 342, width: 800, height: 70, zIndex: 2, animation: { name: 'fadeIn', duration: 700, delay: 300 }, editable: { content: true, position: true } },
      { id: 'underline-red', type: 'image', src: SCRIBBLE_UNDERLINE_SVG, objectFit: 'contain', x: 100, y: 500, width: 420, height: 40, zIndex: 2, animation: { name: 'inkReveal', duration: 900, delay: 500 } },
      // 记号笔粗下划线：双层错位，模仿两遍笔触压不满的毛边
      { id: 'ms-stroke-1', type: 'shape', shapeKind: 'rect', x: 104, y: 546, width: 404, height: 15, fill: { $t: 'colors.accent' }, opacity: 0.9, rotation: -1.4, borderRadius: 8, zIndex: 2 },
      { id: 'ms-stroke-2', type: 'shape', shapeKind: 'rect', x: 114, y: 565, width: 348, height: 8, fill: { $t: 'colors.accent' }, opacity: 0.5, rotation: 1.3, borderRadius: 4, zIndex: 2 },
      { id: 'pencil-annotation', type: 'text', content: '// drawn with 0.5mm ballpoint pen on recycled paper', fontFamily: 'Courier New, monospace', fontSize: 20, fontWeight: '600', color: { $t: 'colors.annotation' }, x: 100, y: 820, width: 700, height: 40, zIndex: 2, editable: { content: true } },
      // —— 涂鸦层：圈圈 / 星芒 / 闪电 / 箭头 ——
      { id: 'ms-ring-raw', type: 'shape', shapeKind: 'circle', x: 88, y: 172, width: 198, height: 134, border: { color: { $t: 'colors.accent' }, width: 5, style: 'solid' }, opacity: 0.9, rotation: -7, zIndex: 3, animation: { name: 'wobble', duration: 3400, iterationCount: 'infinite' } },
      { id: 'circle-doodle', type: 'shape', shapeKind: 'circle', x: 620, y: 176, width: 260, height: 150, border: { color: { $t: 'colors.accent' }, width: 6, style: 'solid' }, rotation: -10, zIndex: 3, animation: { name: 'wobble', duration: 3000, iterationCount: 'infinite' } },
      ...msBurst('ms-spark', 908, 470, 84, 8, { $t: 'colors.accent' }, 0.85, 3, 12),
      { id: 'ms-bolt-1', group: 'ms-bolt-', type: 'shape', shapeKind: 'rect', x: 894, y: 566, width: 11, height: 46, fill: { $t: 'colors.accent' }, opacity: 0.9, rotation: 22, borderRadius: 5, zIndex: 3 },
      { id: 'ms-bolt-2', group: 'ms-bolt-', type: 'shape', shapeKind: 'rect', x: 872, y: 604, width: 42, height: 10, fill: { $t: 'colors.accent' }, opacity: 0.9, rotation: -10, borderRadius: 5, zIndex: 3 },
      { id: 'ms-bolt-3', group: 'ms-bolt-', type: 'shape', shapeKind: 'rect', x: 898, y: 612, width: 11, height: 44, fill: { $t: 'colors.accent' }, opacity: 0.9, rotation: 22, borderRadius: 5, zIndex: 3 },
      { id: 'ms-star-1', type: 'text', content: '★', fontFamily: 'Arial Black, sans-serif', fontSize: 40, fontWeight: '700', color: { $t: 'colors.accent' }, rotation: 16, x: 742, y: 450, width: 62, height: 62, zIndex: 3, animation: { name: 'twinkle', duration: 2600, iterationCount: 'infinite' } },
      { id: 'ms-star-2', type: 'text', content: '✦', fontFamily: 'Arial Black, sans-serif', fontSize: 34, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.6, rotation: -18, x: 262, y: 866, width: 48, height: 48, zIndex: 3, animation: { name: 'sparkle', duration: 3200, delay: 500, iterationCount: 'infinite' } },
      { id: 'arrow-doodle', type: 'image', src: CURVED_ARROW_SVG, objectFit: 'contain', x: 640, y: 660, width: 170, height: 130, rotation: 30, zIndex: 3, animation: { name: 'swing', duration: 2600, iterationCount: 'infinite' }, editable: { position: true, size: { type: 'scale' } } },
      // —— 手写作业：页眉小字 + 圈内批注 + 散落便签 ——
      { id: 'ms-kicker', type: 'text', content: 'MARKER NOTES NO.07 / 03:47 AM', fontFamily: 'Courier New, monospace', fontSize: 22, fontWeight: '700', color: { $t: 'colors.annotation' }, letterSpacing: 7, x: 102, y: 132, width: 640, height: 32, zIndex: 3 },
      { id: 'ms-note-circle', type: 'text', content: '三分钟内画完\n不许用橡皮', fontFamily: 'Comic Sans MS, cursive', fontSize: 30, fontWeight: '700', color: { $t: 'colors.accent' }, textAlign: 'center', lineHeight: 1.35, rotation: -10, x: 640, y: 208, width: 220, height: 88, zIndex: 4, editable: { content: true } },
      // 字号阶梯：46→40（星芒）、32→34（便签主句）拉开 9% 以上的档位差，避免 48≈46、34≈32、32≈30 挤成一团
      { id: 'ms-note-1', type: 'text', content: '火柴人先站稳，再谈风格', fontFamily: 'Comic Sans MS, cursive', fontSize: 34, fontWeight: '700', color: { $t: 'colors.ink' }, rotation: -1.2, x: 102, y: 602, width: 520, height: 50, zIndex: 3, editable: { content: true, position: true } },
      { id: 'ms-note-2', type: 'text', content: '涂坏的那一格，常常是最好看的一格', fontFamily: 'Comic Sans MS, cursive', fontSize: 26, fontWeight: '600', color: { $t: 'colors.annotation' }, rotation: 0.9, x: 104, y: 658, width: 560, height: 40, zIndex: 3, editable: { content: true } },
      { id: 'ms-note-tail', type: 'text', content: '（背面也画满了，别撕）', fontFamily: 'Comic Sans MS, cursive', fontSize: 24, fontWeight: '600', color: { $t: 'colors.annotation' }, textAlign: 'right', rotation: -6, x: 626, y: 872, width: 300, height: 36, zIndex: 3, editable: { content: true } },
      // —— 四角胶带条（压在纸面上方）——
      msTape('ms-tape-tl', -12, 88, 170, 44, -36, 9),
      msTape('ms-tape-tr', 714, 10, 170, 44, 34, 9),
      msTape('ms-tape-bl', 44, 930, 170, 44, 20, 9),
      msTape('ms-tape-br', 782, 924, 170, 44, -28, 9)
    ]
  }
];

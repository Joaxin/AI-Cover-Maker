// src/core/templates/simple/simple-extra.ts
// 简约风 10 个模板：栏式留白/索引卡片/静照留白/数字衬标/网点呼吸/备忘录纸/数据便签/拱窗/标签矩阵/简讯条
import type { Template } from '@/types/types'
import { seededInt } from '../_fx/common'

const seeded = seededInt

// 横格线（索引卡/便签纸）
function ruledLines(w: number, h: number, gap: number, stroke: string) {
  const lines: string[] = []
  for (let y = gap; y < h; y += gap) lines.push(`<line x1='0' y1='${y}' x2='${w}' y2='${y}' stroke='${stroke}' stroke-width='1.5'/>`)
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${lines.join('')}</svg>`
}
// 渐变网点阵（左疏右密）
function dotMatrix(w: number, h: number, cols: number, rows: number, fill: string) {
  const dots: string[] = []
  const cw = w / cols, ch = h / rows
  for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
    const k = (i + 1) / cols
    const r = 1 + 13 * k * k
    dots.push(`<circle cx='${(i + 0.5) * cw}' cy='${(j + 0.5) * ch}' r='${r.toFixed(1)}' fill='${fill}'/>`)
  }
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${dots.join('')}</svg>`
}
// 迷你折线图
function sparkline(w: number, h: number, stroke: string, seed = 42) {
  const rnd = seeded(seed); const pts: string[] = []
  for (let i = 0; i <= 10; i++) pts.push(`${(i * w / 10).toFixed(1)},${(h * 0.18 + rnd() % Math.round(h * 0.62)).toFixed(1)}`)
  const area = `M0,${h} L${pts.join(' L')} L${w},${h} Z`
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><path d='${area}' fill='${stroke}' opacity='0.1'/><polyline points='${pts.join(' ')}' fill='none' stroke='${stroke}' stroke-width='5' stroke-linecap='round' stroke-linejoin='round'/></svg>`
}

const SANS = 'Helvetica, Arial, sans-serif'
const SERIF = 'Georgia, "Times New Roman", serif'
const MONO = 'Consolas, Menlo, "Courier New", monospace'
const SONG = 'Songti SC, SimSun, serif'

const SIMPLE_COLORS = (labels: [string, string, string], defs: [string, string, string], opts: string[][]) => ({
  bg: { label: labels[0], default: defs[0], options: opts[0] },
  primary: { label: labels[1], default: defs[1], options: opts[1] },
  accent: { label: labels[2], default: defs[2], options: opts[2] }
})

export const simpleExtraTemplates: Template[] = [
  // 1. 栏式留白（4:5）
  {
    id: 'simple-grid-column', name: '栏式留白', version: '1.0.0', category: 'simple',
    tags: ['simple', 'grid', 'column', '4:5'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23f6f7f5"/><rect width="24" height="100" fill="%230d9488"/><rect x="34" y="30" width="52" height="7" fill="%231f2937"/><rect x="34" y="44" width="36" height="7" fill="%231f2937" opacity="0.5"/></svg>',
    tokens: {
      colors: SIMPLE_COLORS(['纸灰', '墨石', '湖青'], ['#F6F7F5', '#1F2937', '#0D9488'],
        [['#F6F7F5', '#FAFAFA', '#F4F6F8', '#FBF7F0'], ['#1F2937', '#111827', '#334155', '#3F3F46'], ['#0D9488', '#4F46E5', '#C2410C', '#DB2777']]),
      fonts: { heading: { label: '标题字体', default: SANS, options: [SANS, SERIF, SONG, 'Inter, sans-serif'] } }
    },
    presets: [
      { name: '纸灰湖青', colors: { bg: '#F6F7F5', primary: '#1F2937', accent: '#0D9488' } },
      { name: '雾白靛蓝', colors: { bg: '#F4F6F8', primary: '#334155', accent: '#4F46E5' } },
      { name: '米白赤陶', colors: { bg: '#FBF7F0', primary: '#3F3F46', accent: '#C2410C' } },
      { name: '素白玫红', colors: { bg: '#FAFAFA', primary: '#111827', accent: '#DB2777' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'gc-col', type: 'shape', shapeKind: 'rect', x: 0, y: 0, width: 300, height: 1350, fill: { $t: 'colors.accent' }, zIndex: 1 },
      { id: 'gc-col-no', type: 'text', content: 'No. 01', fontFamily: MONO, fontSize: 26, color: '#FFFFFF', opacity: 0.85, x: 56, y: 84, width: 190, height: 36, zIndex: 3, editable: { content: true } },
      { id: 'gc-col-foot', type: 'text', content: 'MMXXVI\nAUTUMN', fontFamily: SERIF, fontSize: 30, color: '#FFFFFF', opacity: 0.7, lineHeight: 1.5, x: 56, y: 1150, width: 190, height: 110, zIndex: 3 },
      ...Array.from({ length: 6 }, (_, i) => ({ id: `gc-grid-${i}`, type: 'shape' as const, shapeKind: 'rect' as const, x: 392 + i * 112, y: 0, width: 1, height: 1350, fill: { $t: 'colors.primary' } as any, opacity: 0.06, group: 'grid', zIndex: 1 })),
      { id: 'gc-title', type: 'text', content: '少，\n即多一点', fontFamily: { $t: 'fonts.heading' }, fontSize: 118, fontWeight: '800', color: { $t: 'colors.primary' }, lineHeight: 1.3, x: 404, y: 330, width: 600, height: 360, zIndex: 3, animation: { name: 'fadeInUp', duration: 800 }, editable: { content: true, fontSize: { type: 'range', min: 72, max: 150 }, position: true } },
      { id: 'gc-sub', type: 'text', content: 'LESS BUT BETTER · 简约生活提案', fontFamily: SANS, fontSize: 26, color: { $t: 'colors.primary' }, opacity: 0.55, letterSpacing: 3, x: 404, y: 720, width: 600, height: 38, zIndex: 3, editable: { content: true } },
      { id: 'gc-bar', type: 'shape', shapeKind: 'rect', x: 404, y: 792, width: 110, height: 5, fill: { $t: 'colors.accent' }, zIndex: 3 },
      { id: 'gc-copy', type: 'text', content: '把房间、日程和念头都擦干净，\n留下的那几样，才真的属于你。', fontFamily: SONG, fontSize: 31, color: { $t: 'colors.primary' }, opacity: 0.8, lineHeight: 1.8, x: 404, y: 850, width: 620, height: 140, zIndex: 3, animation: { name: 'fadeIn', duration: 900, delay: 350 }, editable: { content: true, fontSize: { type: 'range', min: 24, max: 40 }, position: true } },
      { id: 'gc-dot', type: 'shape', shapeKind: 'circle', x: 1004, y: 1248, width: 16, height: 16, fill: { $t: 'colors.accent' }, zIndex: 3, animation: { name: 'pulse', duration: 2600, iterationCount: 'infinite' } },
      { id: 'gc-date', type: 'text', content: '2026.09.19 · 周五', fontFamily: MONO, fontSize: 22, color: { $t: 'colors.primary' }, opacity: 0.45, textAlign: 'right', x: 640, y: 1240, width: 340, height: 32, zIndex: 3, editable: { content: true } }
    ]
  },
  // 2. 索引卡片（1:1）
  {
    id: 'simple-index-card', name: '索引卡片', version: '1.0.0', category: 'simple',
    tags: ['simple', 'card', 'index', 'stationery', '1:1'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23eef0ec"/><rect x="14" y="12" width="72" height="76" rx="5" fill="%23fff"/><circle cx="50" cy="22" r="5" fill="%23eef0ec"/><rect x="18" y="16" width="64" height="68" rx="3" fill="none" stroke="%231f2937" stroke-width="1" opacity="0.3"/><rect x="20" y="46" width="1.5" height="34" fill="%23c2410c" opacity="0.55"/><rect x="22" y="36" width="40" height="5" fill="%231f2937"/><line x1="22" y1="56" x2="78" y2="56" stroke="%23c9ced4" stroke-width="2"/><line x1="22" y1="68" x2="78" y2="68" stroke="%23c9ced4" stroke-width="2"/><rect x="52" y="14" width="16" height="5" fill="%23c2410c" opacity="0.55" transform="rotate(-8 60 16)"/><circle cx="24" cy="80" r="1.6" fill="%23c2410c"/><circle cx="28.5" cy="80" r="1.6" fill="%23c2410c" opacity="0.7"/><circle cx="33" cy="80" r="1.6" fill="%23c2410c" opacity="0.45"/><g fill="%231f2937" opacity="0.45"><rect x="86" y="52" width="3" height="3"/><rect x="86" y="58" width="3" height="3"/><rect x="86" y="64" width="3" height="3"/></g></svg>',
    tokens: {
      colors: SIMPLE_COLORS(['灰绿底', '石墨', '赭橘'], ['#EEF0EC', '#27272A', '#C2410C'],
        [['#EEF0EC', '#F6F7F5', '#F1F0EA', '#E9EEF2'], ['#27272A', '#1F2937', '#0F172A', '#44403C'], ['#C2410C', '#0D9488', '#4F46E5', '#B45309']]),
      fonts: { heading: { label: '标题字体', default: SERIF, options: [SERIF, SANS, SONG, 'Inter, sans-serif'] } }
    },
    presets: [
      { name: '灰绿赭橘', colors: { bg: '#EEF0EC', primary: '#27272A', accent: '#C2410C' } },
      { name: '纸白石墨', colors: { bg: '#F6F7F5', primary: '#1F2937', accent: '#0D9488' } },
      { name: '米色金墨', colors: { bg: '#F1F0EA', primary: '#44403C', accent: '#B45309' } },
      { name: '雾蓝靛印', colors: { bg: '#E9EEF2', primary: '#0F172A', accent: '#4F46E5' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1080, defaultWidth: 1080, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'ic-card', type: 'shape', shapeKind: 'rect', x: 90, y: 90, width: 900, height: 900, fill: '#FFFFFF', borderRadius: 22, shadow: { color: 'rgba(31,41,55,0.10)', blur: 34, offsetX: 0, offsetY: 16 }, zIndex: 1 },
      { id: 'ic-hole', type: 'shape', shapeKind: 'circle', x: 505, y: 122, width: 70, height: 70, fill: { $t: 'colors.bg' }, border: { color: { $t: 'colors.primary' }, width: 2, style: 'solid' }, opacity: 0.9, zIndex: 2 },
      { id: 'ic-ruled', type: 'image', src: ruledLines(820, 460, 52, 'rgba(39,39,42,0.13)'), x: 130, y: 540, width: 820, height: 420, zIndex: 2 },
      { id: 'ic-no', type: 'text', content: 'No. 026', fontFamily: MONO, fontSize: 30, color: { $t: 'colors.accent' }, letterSpacing: 2, x: 150, y: 205, width: 320, height: 42, zIndex: 3, editable: { content: true } },
      { id: 'ic-title', type: 'text', content: '晨间速写簿', fontFamily: { $t: 'fonts.heading' }, fontSize: 88, fontWeight: '700', color: { $t: 'colors.primary' }, letterSpacing: 4, x: 150, y: 268, width: 560, height: 120, zIndex: 3, animation: { name: 'fadeIn', duration: 800 }, editable: { content: true, fontSize: { type: 'range', min: 56, max: 112 }, position: true } },
      { id: 'ic-sub', type: 'text', content: 'INDEX CARD · 一天一格，写满为止', fontFamily: SANS, fontSize: 24, color: { $t: 'colors.primary' }, opacity: 0.5, letterSpacing: 2, x: 152, y: 402, width: 560, height: 34, zIndex: 3, editable: { content: true } },
      { id: 'ic-photo-edge', type: 'shape', shapeKind: 'rect', x: 700, y: 190, width: 290, height: 290, fill: '#FFFFFF', borderRadius: 6, rotation: 5, shadow: { color: 'rgba(31,41,55,0.16)', blur: 22, offsetX: 0, offsetY: 10 }, zIndex: 3 },
      { id: 'ic-photo', type: 'image', src: '/images/photo/desk-morning-250x250.jpg', objectFit: 'cover', x: 720, y: 210, width: 250, height: 250, rotation: 5, zIndex: 4, editable: { src: { type: 'upload' }, position: true, size: { type: 'scale' } } },
      { id: 'ic-line1', type: 'text', content: '天气：晴，风很小　·　光线：东侧柔光', fontFamily: SONG, fontSize: 27, color: { $t: 'colors.primary' }, opacity: 0.75, x: 150, y: 560, width: 780, height: 40, zIndex: 3, editable: { content: true, position: true } },
      { id: 'ic-line2', type: 'text', content: '「把不必要的都拿掉，剩下的就是答案。」', fontFamily: SONG, fontSize: 27, color: { $t: 'colors.accent' }, opacity: 0.9, x: 150, y: 664, width: 780, height: 40, zIndex: 3, editable: { content: true, position: true } },
      { id: 'ic-date', type: 'text', content: '2026.09.19', fontFamily: MONO, fontSize: 24, color: { $t: 'colors.primary' }, opacity: 0.45, textAlign: 'right', x: 700, y: 900, width: 250, height: 34, zIndex: 3, editable: { content: true } },
      // —— 加密度：框中框细线 / 左侧装订竖线 / 相角胶带 / 页脚三点 / 右边距竖排小字 ——
      { id: 'ic-inset', type: 'shape', shapeKind: 'rect', x: 128, y: 128, width: 824, height: 824, fill: 'transparent', borderRadius: 12, border: { color: { $t: 'colors.primary' }, width: 1.5 }, opacity: 0.15, zIndex: 2, editable: { content: true } as any },
      { id: 'ic-margin-rule', type: 'shape', shapeKind: 'rect', x: 138, y: 536, width: 1.5, height: 416, fill: { $t: 'colors.accent' }, opacity: 0.4, zIndex: 2 },
      { id: 'ic-tape', type: 'shape', shapeKind: 'rect', x: 676, y: 186, width: 132, height: 34, fill: { $t: 'colors.accent' }, opacity: 0.55, rotation: -8, zIndex: 5 },
      { id: 'ic-vlabel', type: 'text', content: '速\n写\n日\n记', fontFamily: SONG, fontSize: 20, color: { $t: 'colors.primary' }, opacity: 0.5, lineHeight: 1.6, x: 962, y: 566, width: 26, height: 190, zIndex: 3, editable: { content: true } as any },
      ...([[150, 0.55], [170, 0.4], [190, 0.25]] as any[]).map(([cx, op], i) => ({ id: `ic-pip-${i}`, type: 'shape' as const, shapeKind: 'circle' as const, x: cx, y: 922, width: 10, height: 10, fill: { $t: 'colors.accent' } as any, opacity: op, zIndex: 3 }))
    ]
  },
  // 3. 静照留白（9:16）
  {
    id: 'simple-silent-photo', name: '静照留白', version: '1.0.0', category: 'simple',
    tags: ['simple', 'photo', 'minimal', '9:16'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23fafaf9"/><rect width="100" height="62" fill="%23a8a29e"/><rect x="0" y="44" width="100" height="18" fill="%23fafaf9" opacity="0.45"/><rect x="5" y="5" width="90" height="52" fill="none" stroke="%23fafaf9" stroke-width="1" opacity="0.75"/><rect x="9" y="15" width="10" height="1.6" fill="%23fafaf9"/><rect x="85" y="9" width="5" height="5" fill="%230d9488"/><g fill="%23fafaf9"><rect x="80" y="24" width="3" height="3"/><rect x="80" y="29" width="3" height="3"/><rect x="80" y="34" width="3" height="3"/></g><g fill="%23fafaf9"><rect x="80" y="40" width="3" height="3" opacity="0.8"/><rect x="85" y="40" width="2.4" height="2.4" opacity="0.55"/><rect x="89" y="40" width="1.8" height="1.8" opacity="0.35"/></g><rect x="10" y="66" width="28" height="2.5" fill="%231c1917" opacity="0.22"/><rect x="10" y="72" width="52" height="6" fill="%231c1917"/><rect x="10" y="84" width="30" height="4" fill="%231c1917" opacity="0.4"/><circle cx="86" cy="75" r="4" fill="%230d9488"/></svg>',
    tokens: {
      colors: SIMPLE_COLORS(['宣白', '炭黑', '湖青'], ['#FAFAF9', '#1C1917', '#0D9488'],
        [['#FAFAF9', '#F5F5F4', '#F8FAFC', '#FFFBEB'], ['#1C1917', '#292524', '#0F172A', '#1F2937'], ['#0D9488', '#B45309', '#4F46E5', '#BE123C']]),
      fonts: { heading: { label: '标题字体', default: SONG, options: [SONG, SANS, SERIF, 'Inter, sans-serif'] } }
    },
    presets: [
      { name: '宣白湖青', colors: { bg: '#FAFAF9', primary: '#1C1917', accent: '#0D9488' } },
      { name: '奶油琥珀', colors: { bg: '#FFFBEB', primary: '#292524', accent: '#B45309' } },
      { name: '冷灰雾蓝', colors: { bg: '#F8FAFC', primary: '#0F172A', accent: '#4F46E5' } },
      { name: '静梅墨黑', colors: { bg: '#F5F5F4', primary: '#1F2937', accent: '#BE123C' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1920, defaultWidth: 1080, defaultHeight: 1920, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'sp-photo', type: 'image', src: '/images/photo/still-morning-1080x1400.jpg', objectFit: 'cover', x: 0, y: 0, width: 1080, height: 1400, zIndex: 1, editable: { src: { type: 'upload' }, position: true, size: { type: 'scale' } } },
      { id: 'sp-corner', type: 'text', content: '静 照', fontFamily: SONG, fontSize: 26, color: '#FFFFFF', letterSpacing: 8, opacity: 0.9, x: 80, y: 84, width: 200, height: 38, zIndex: 3, shadow: { color: 'rgba(0,0,0,0.45)', blur: 12, offsetX: 0, offsetY: 1 }, editable: { content: true } },
      { id: 'sp-dot', type: 'shape', shapeKind: 'circle', x: 90, y: 1512, width: 16, height: 16, fill: { $t: 'colors.accent' }, zIndex: 3, animation: { name: 'pulse', duration: 2800, iterationCount: 'infinite' } },
      { id: 'sp-title', type: 'text', content: '安静的早晨\n自有它的声响', fontFamily: { $t: 'fonts.heading' }, fontSize: 68, fontWeight: '700', color: { $t: 'colors.primary' }, lineHeight: 1.55, x: 88, y: 1552, width: 800, height: 230, zIndex: 3, animation: { name: 'fadeInUp', duration: 900 }, editable: { content: true, fontSize: { type: 'range', min: 44, max: 92 }, position: true } },
      { id: 'sp-divider', type: 'shape', shapeKind: 'rect', x: 90, y: 1812, width: 900, height: 1.5, fill: { $t: 'colors.primary' }, opacity: 0.16, zIndex: 3 },
      { id: 'sp-foot-l', type: 'text', content: 'SILENT MORNING · 静照馆 No.7', fontFamily: MONO, fontSize: 22, color: { $t: 'colors.primary' }, opacity: 0.55, x: 90, y: 1836, width: 560, height: 32, zIndex: 3, editable: { content: true } },
      { id: 'sp-foot-r', type: 'text', content: '2026 / 09', fontFamily: MONO, fontSize: 22, color: { $t: 'colors.primary' }, opacity: 0.55, textAlign: 'right', x: 700, y: 1836, width: 290, height: 32, zIndex: 3, editable: { content: true } },
      // —— 加密度：照片底部渐隐层 / 画框细线 / 角标短横线与小方章 / 竖排小字 / 拍摄参数 / 消隐三点 ——
      { id: 'sp-scrim', type: 'overlay', background: 'linear-gradient(to top, rgba(250,250,249,0.9) 0%, rgba(250,250,249,0.35) 38%, rgba(250,250,249,0) 100%)', x: 0, y: 1040, width: 1080, height: 360, zIndex: 2 },
      { id: 'sp-frame', type: 'shape', shapeKind: 'rect', x: 48, y: 48, width: 984, height: 1304, fill: 'transparent', border: { color: { $t: 'colors.bg' }, width: 2 }, opacity: 0.5, zIndex: 3, editable: { content: true } as any },
      { id: 'sp-tick', type: 'shape', shapeKind: 'rect', x: 80, y: 138, width: 92, height: 2, fill: { $t: 'colors.bg' }, opacity: 0.85, zIndex: 3 },
      { id: 'sp-sq', type: 'shape', shapeKind: 'rect', x: 966, y: 84, width: 18, height: 18, fill: { $t: 'colors.accent' }, opacity: 0.9, zIndex: 3 },
      { id: 'sp-vmark', type: 'text', content: '静\n物\n如\n常', fontFamily: SONG, fontSize: 26, color: { $t: 'colors.bg' }, opacity: 0.85, lineHeight: 1.9, x: 944, y: 300, width: 40, height: 240, zIndex: 3, shadow: { color: 'rgba(0,0,0,0.35)', blur: 10, offsetX: 0, offsetY: 1 }, editable: { content: true } as any },
      { id: 'sp-exif', type: 'text', content: 'KODAK 200 · f/2.0 · 1/125s', fontFamily: MONO, fontSize: 22, color: { $t: 'colors.primary' }, opacity: 0.5, letterSpacing: 1, x: 90, y: 1446, width: 560, height: 32, zIndex: 3, editable: { content: true } },
      ...([[944, 14, 0.75], [966, 11, 0.55], [984, 8, 0.35]] as any[]).map(([mx, ms, mo], i) => ({ id: `sp-mark-${i}`, type: 'shape' as const, shapeKind: 'rect' as const, x: mx, y: 640, width: ms, height: ms, fill: { $t: 'colors.bg' } as any, opacity: mo, zIndex: 3 }))
    ]
  },
  // 4. 数字衬标（1:1）
  {
    id: 'simple-num-serif', name: '数字衬标', version: '1.0.0', category: 'simple',
    tags: ['simple', 'number', 'serif', 'typography', '1:1'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23f8f8f6"/><text x="12" y="76" font-family="Georgia" font-size="64" fill="%231f2937" opacity="0.08">07</text><rect x="6" y="6" width="88" height="88" fill="none" stroke="%231f2937" stroke-width="1" opacity="0.25"/><rect x="20" y="44" width="46" height="6" fill="%231f2937"/><rect x="20" y="56" width="26" height="6" fill="%23be123c"/><rect x="86" y="30" width="1" height="34" fill="%231f2937" opacity="0.35"/><g fill="%231f2937" opacity="0.45"><rect x="80" y="34" width="6" height="1"/><rect x="77" y="45" width="9" height="1"/><rect x="80" y="56" width="6" height="1"/></g><circle cx="80" cy="76" r="8" fill="none" stroke="%23be123c" stroke-width="1" stroke-dasharray="2 2"/><text x="80" y="79" font-family="Georgia" font-size="8" fill="%23be123c" text-anchor="middle">37</text><rect x="20" y="82" width="28" height="2" fill="%231f2937" opacity="0.22"/></svg>',
    tokens: {
      colors: SIMPLE_COLORS(['暖素纸', '深墨', '酒红'], ['#F8F8F6', '#1F2937', '#BE123C'],
        [['#F8F8F6', '#FAFAFA', '#F4F4F5', '#F7F6F2'], ['#1F2937', '#111827', '#3F3F46', '#0F172A'], ['#BE123C', '#0D9488', '#B45309', '#4F46E5']]),
      fonts: { heading: { label: '标题字体', default: SERIF, options: [SERIF, SONG, SANS, 'Inter, sans-serif'] } }
    },
    presets: [
      { name: '暖纸酒红', colors: { bg: '#F8F8F6', primary: '#1F2937', accent: '#BE123C' } },
      { name: '素白松绿', colors: { bg: '#FAFAFA', primary: '#111827', accent: '#0D9488' } },
      { name: '旧米赭金', colors: { bg: '#F7F6F2', primary: '#3F3F46', accent: '#B45309' } },
      { name: '冷灰靛印', colors: { bg: '#F4F4F5', primary: '#0F172A', accent: '#4F46E5' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1080, defaultWidth: 1080, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'ns-num', type: 'text', content: '07', fontFamily: SERIF, fontSize: 620, fontWeight: '700', color: { $t: 'colors.primary' }, opacity: 0.08, x: 40, y: 150, width: 1000, height: 700, zIndex: 1, editable: { content: true, fontSize: { type: 'range', min: 380, max: 720 }, position: true } },
      { id: 'ns-hairline', type: 'shape', shapeKind: 'rect', x: 120, y: 300, width: 840, height: 1.5, fill: { $t: 'colors.primary' }, opacity: 0.14, zIndex: 2 },
      { id: 'ns-kicker', type: 'text', content: 'WEEKLY NOTE · 周刊便签', fontFamily: MONO, fontSize: 24, color: { $t: 'colors.accent' }, letterSpacing: 4, x: 122, y: 336, width: 600, height: 36, zIndex: 3, editable: { content: true } },
      { id: 'ns-title', type: 'text', content: '把一周\n折成四折', fontFamily: { $t: 'fonts.heading' }, fontSize: 106, fontWeight: '700', color: { $t: 'colors.primary' }, lineHeight: 1.35, x: 120, y: 400, width: 640, height: 320, zIndex: 3, animation: { name: 'fadeInUp', duration: 850 }, editable: { content: true, fontSize: { type: 'range', min: 64, max: 136 }, position: true } },
      { id: 'ns-bar', type: 'shape', shapeKind: 'rect', x: 122, y: 756, width: 88, height: 5, fill: { $t: 'colors.accent' }, zIndex: 3 },
      { id: 'ns-copy', type: 'text', content: '周一到周日，只留三件记得住的事，\n这一周就算没白过。', fontFamily: SONG, fontSize: 30, color: { $t: 'colors.primary' }, opacity: 0.75, lineHeight: 1.75, x: 122, y: 792, width: 640, height: 120, zIndex: 3, animation: { name: 'fadeIn', duration: 900, delay: 300 }, editable: { content: true, fontSize: { type: 'range', min: 22, max: 40 }, position: true } },
      { id: 'ns-side', type: 'text', content: '二〇二六 · 第三十七周', fontFamily: SONG, fontSize: 24, color: { $t: 'colors.primary' }, opacity: 0.4, letterSpacing: 3, textAlign: 'right', x: 660, y: 124, width: 300, height: 36, zIndex: 3, editable: { content: true } },
      { id: 'ns-dot', type: 'shape', shapeKind: 'circle', x: 952, y: 102, width: 14, height: 14, fill: { $t: 'colors.accent' }, zIndex: 3, animation: { name: 'pulse', duration: 2800, iterationCount: 'infinite' } },
      // —— 加密度：外框细线 / 右侧标尺（竖线 + 三道刻度）/ 虚线圆章 + 周数 / 页脚版权小字 ——
      { id: 'ns-frame', type: 'shape', shapeKind: 'rect', x: 64, y: 64, width: 952, height: 952, fill: 'transparent', border: { color: { $t: 'colors.primary' }, width: 1.5 }, opacity: 0.15, zIndex: 2, editable: { content: true } as any },
      { id: 'ns-vline', type: 'shape', shapeKind: 'rect', x: 930, y: 340, width: 1.5, height: 480, fill: { $t: 'colors.primary' }, opacity: 0.18, zIndex: 2 },
      ...([380, 462, 544] as any[]).map((ty, i) => ({ id: `ns-tick-${i}`, type: 'shape' as const, shapeKind: 'rect' as const, x: 912, y: ty, width: i === 1 ? 32 : 22, height: 1.5, fill: { $t: 'colors.primary' } as any, opacity: i === 1 ? 0.4 : 0.26, zIndex: 2 })),
      { id: 'ns-ring', type: 'shape', shapeKind: 'circle', x: 858, y: 846, width: 132, height: 132, fill: 'transparent', border: { color: { $t: 'colors.accent' }, width: 2, style: 'dashed' }, opacity: 0.55, zIndex: 2, animation: { name: 'spinSlow', duration: 16000, iterationCount: 'infinite' }, editable: { content: true } as any },
      { id: 'ns-badge', type: 'text', content: '37', fontFamily: SERIF, fontSize: 40, fontWeight: '700', color: { $t: 'colors.accent' }, textAlign: 'center', lineHeight: 1.4, x: 858, y: 886, width: 132, height: 56, zIndex: 3, editable: { content: true } },
      { id: 'ns-colophon', type: 'text', content: 'SET IN GEORGIA · 每周一早七点更新', fontFamily: MONO, fontSize: 20, color: { $t: 'colors.primary' }, opacity: 0.4, letterSpacing: 1, x: 122, y: 956, width: 560, height: 30, zIndex: 3, editable: { content: true } }
    ]
  },
  // 5. 网点呼吸（4:5）
  {
    id: 'simple-halftone-dot', name: '网点呼吸', version: '1.0.0', category: 'simple',
    tags: ['simple', 'halftone', 'dots', 'geometry', '4:5'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23f4f6f8"/><circle cx="82" cy="72" r="14" fill="%234f46e5" opacity="0.5"/><circle cx="64" cy="80" r="7" fill="%234f46e5" opacity="0.4"/><circle cx="90" cy="48" r="6" fill="%234f46e5" opacity="0.3"/><rect x="14" y="24" width="52" height="6" fill="%231f2937"/><rect x="14" y="38" width="30" height="6" fill="%231f2937" opacity="0.5"/></svg>',
    tokens: {
      colors: SIMPLE_COLORS(['雾蓝纸', '墨蓝', '靛紫'], ['#F4F6F8', '#1E293B', '#4F46E5'],
        [['#F4F6F8', '#F8FAFC', '#F6F7F5', '#FAF5F4'], ['#1E293B', '#0F172A', '#334155', '#1C1917'], ['#4F46E5', '#0D9488', '#BE123C', '#B45309']]),
      fonts: { heading: { label: '标题字体', default: 'Inter, sans-serif', options: ['Inter, sans-serif', SANS, SONG, SERIF] } }
    },
    presets: [
      { name: '雾蓝靛紫', colors: { bg: '#F4F6F8', primary: '#1E293B', accent: '#4F46E5' } },
      { name: '月白湖青', colors: { bg: '#F8FAFC', primary: '#0F172A', accent: '#0D9488' } },
      { name: '豆绿墨石', colors: { bg: '#F6F7F5', primary: '#334155', accent: '#B45309' } },
      { name: '藕粉炭灰', colors: { bg: '#FAF5F4', primary: '#1C1917', accent: '#BE123C' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'hd-matrix', type: 'image', src: dotMatrix(1080, 1350, 12, 15, 'rgba(79,70,229,0.30)'), x: 0, y: 0, width: 1080, height: 1350, zIndex: 1 },
      { id: 'hd-scrim', type: 'overlay', background: 'linear-gradient(105deg, rgba(244,246,248,0.96) 0%, rgba(244,246,248,0.86) 40%, rgba(244,246,248,0) 72%)', x: 0, y: 0, width: 1080, height: 1350, zIndex: 2 },
      { id: 'hd-kicker', type: 'text', content: 'HALFTONE · 网点观察', fontFamily: MONO, fontSize: 24, color: { $t: 'colors.accent' }, letterSpacing: 4, x: 96, y: 176, width: 560, height: 36, zIndex: 3, editable: { content: true } },
      { id: 'hd-title', type: 'text', content: '密度\n会呼吸', fontFamily: { $t: 'fonts.heading' }, fontSize: 128, fontWeight: '800', color: { $t: 'colors.primary' }, lineHeight: 1.28, x: 96, y: 300, width: 640, height: 420, zIndex: 3, animation: { name: 'fadeIn', duration: 900 }, editable: { content: true, fontSize: { type: 'range', min: 80, max: 160 }, position: true } },
      { id: 'hd-bar', type: 'shape', shapeKind: 'rect', x: 96, y: 760, width: 96, height: 5, fill: { $t: 'colors.accent' }, zIndex: 3 },
      { id: 'hd-copy', type: 'text', content: '点与点的距离，就是画面的呼吸。\n近看是噪点，退后是天空。', fontFamily: SONG, fontSize: 31, color: { $t: 'colors.primary' }, opacity: 0.8, lineHeight: 1.8, x: 96, y: 806, width: 660, height: 130, zIndex: 3, animation: { name: 'fadeInUp', duration: 900, delay: 300 }, editable: { content: true, fontSize: { type: 'range', min: 22, max: 40 }, position: true } },
      { id: 'hd-orbit', type: 'shape', shapeKind: 'circle', x: 806, y: 120, width: 130, height: 130, fill: 'transparent', border: { color: { $t: 'colors.accent' }, width: 2, style: 'dashed' }, zIndex: 3, animation: { name: 'spinSlow', duration: 14000, iterationCount: 'infinite' } },
      { id: 'hd-foot', type: 'text', content: 'DOT FIELD / 180 pcs.', fontFamily: MONO, fontSize: 22, color: { $t: 'colors.primary' }, opacity: 0.45, x: 96, y: 1216, width: 420, height: 32, zIndex: 3, editable: { content: true } },
      { id: 'hd-pageno', type: 'text', content: '05', fontFamily: SERIF, fontSize: 44, color: { $t: 'colors.primary' }, opacity: 0.35, textAlign: 'right', x: 900, y: 1244, width: 120, height: 60, zIndex: 3 }
    ]
  },
  // 6. 备忘录纸（16:9）
  {
    id: 'simple-office-memo', name: '备忘录纸', version: '1.0.0', category: 'simple',
    tags: ['simple', 'memo', 'note', 'desk', '16:9'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23eef0ec"/><rect x="30" y="18" width="46" height="66" rx="3" fill="%23d8dcd4" transform="rotate(-6 53 51)"/><rect x="26" y="16" width="48" height="70" rx="3" fill="%23fff"/><rect x="34" y="28" width="26" height="5" fill="%231f2937"/><line x1="34" y1="44" x2="66" y2="44" stroke="%23d4d4d8" stroke-width="2"/><line x1="34" y1="54" x2="62" y2="54" stroke="%23d4d4d8" stroke-width="2"/></svg>',
    tokens: {
      colors: SIMPLE_COLORS(['灰绿桌', '石墨', '森绿'], ['#EAEEE8', '#27272A', '#166534'],
        [['#EAEEE8', '#EEF0EC', '#F1F0EA', '#E9EEF2'], ['#27272A', '#1F2937', '#292524', '#111827'], ['#166534', '#0D9488', '#B45309', '#BE123C']]),
      fonts: { heading: { label: '标题字体', default: SONG, options: [SONG, SANS, SERIF, 'Inter, sans-serif'] } }
    },
    presets: [
      { name: '绿桌森墨', colors: { bg: '#EAEEE8', primary: '#27272A', accent: '#166534' } },
      { name: '灰绿松青', colors: { bg: '#EEF0EC', primary: '#1F2937', accent: '#0D9488' } },
      { name: '米桌赭金', colors: { bg: '#F1F0EA', primary: '#292524', accent: '#B45309' } },
      { name: '雾桌梅红', colors: { bg: '#E9EEF2', primary: '#111827', accent: '#BE123C' } }
    ],
    canvas: { virtualWidth: 1920, virtualHeight: 1080, defaultWidth: 1920, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'mm-sheet-back', type: 'shape', shapeKind: 'rect', x: 1150, y: 150, width: 560, height: 720, fill: '#FFFFFF', borderRadius: 8, rotation: 6, opacity: 0.65, shadow: { color: 'rgba(39,39,42,0.10)', blur: 24, offsetX: 0, offsetY: 12 }, zIndex: 1 },
      { id: 'mm-sheet', type: 'shape', shapeKind: 'rect', x: 1120, y: 130, width: 560, height: 720, fill: '#FFFFFF', borderRadius: 8, rotation: -2, shadow: { color: 'rgba(39,39,42,0.14)', blur: 30, offsetX: 0, offsetY: 14 }, zIndex: 2 },
      { id: 'mm-pin', type: 'shape', shapeKind: 'circle', x: 1378, y: 150, width: 26, height: 26, fill: { $t: 'colors.accent' }, zIndex: 4, shadow: { color: 'rgba(0,0,0,0.18)', blur: 8, offsetX: 0, offsetY: 3 } },
      { id: 'mm-photo', type: 'image', src: '/images/photo/desk-notes-360x240.jpg', objectFit: 'cover', x: 1190, y: 216, width: 360, height: 240, rotation: -2, zIndex: 3, editable: { src: { type: 'upload' }, position: true, size: { type: 'scale' } } },
      { id: 'mm-check1', group: 'mm-check', type: 'shape', shapeKind: 'rect', x: 1194, y: 512, width: 16, height: 16, fill: 'transparent', border: { color: { $t: 'colors.primary' }, width: 2, style: 'solid' }, rotation: -2, zIndex: 3 },
      { id: 'mm-item1', type: 'text', content: '✓　把周报改成三行', fontFamily: SONG, fontSize: 28, color: { $t: 'colors.primary' }, rotation: -2, x: 1224, y: 498, width: 400, height: 40, zIndex: 3, editable: { content: true } },
      { id: 'mm-check2', group: 'mm-check', type: 'shape', shapeKind: 'rect', x: 1194, y: 588, width: 16, height: 16, fill: 'transparent', border: { color: { $t: 'colors.primary' }, width: 2, style: 'solid' }, rotation: -2, zIndex: 3 },
      { id: 'mm-item2', type: 'text', content: '给绿植换大一号的盆', fontFamily: SONG, fontSize: 28, color: { $t: 'colors.primary' }, opacity: 0.75, rotation: -2, x: 1224, y: 574, width: 400, height: 40, zIndex: 3, editable: { content: true } },
      { id: 'mm-check3', group: 'mm-check', type: 'shape', shapeKind: 'rect', x: 1194, y: 664, width: 16, height: 16, fill: 'transparent', border: { color: { $t: 'colors.primary' }, width: 2, style: 'solid' }, rotation: -2, zIndex: 3 },
      { id: 'mm-item3', type: 'text', content: '把「改天」换成日期', fontFamily: SONG, fontSize: 28, color: { $t: 'colors.primary' }, opacity: 0.75, rotation: -2, x: 1224, y: 650, width: 400, height: 40, zIndex: 3, editable: { content: true } },
      { id: 'mm-kicker', type: 'text', content: 'MEMO · 本周待办', fontFamily: MONO, fontSize: 26, color: { $t: 'colors.accent' }, letterSpacing: 4, x: 140, y: 250, width: 560, height: 38, zIndex: 3, editable: { content: true } },
      { id: 'mm-title', type: 'text', content: '重要的事，\n一张纸装得下', fontFamily: { $t: 'fonts.heading' }, fontSize: 104, fontWeight: '700', color: { $t: 'colors.primary' }, lineHeight: 1.4, x: 140, y: 320, width: 880, height: 330, zIndex: 3, animation: { name: 'fadeInUp', duration: 850 }, editable: { content: true, fontSize: { type: 'range', min: 64, max: 130 }, position: true } },
      { id: 'mm-bar', type: 'shape', shapeKind: 'rect', x: 140, y: 678, width: 96, height: 5, fill: { $t: 'colors.accent' }, zIndex: 3 },
      { id: 'mm-copy', type: 'text', content: '清单不必长，划掉的时候有声音，就够了。', fontFamily: SONG, fontSize: 30, color: { $t: 'colors.primary' }, opacity: 0.7, x: 140, y: 716, width: 780, height: 44, zIndex: 3, animation: { name: 'fadeIn', duration: 900, delay: 300 }, editable: { content: true, fontSize: { type: 'range', min: 22, max: 40 }, position: true } },
      { id: 'mm-date', type: 'text', content: '2026.09.19 — 2026.09.25', fontFamily: MONO, fontSize: 22, color: { $t: 'colors.primary' }, opacity: 0.45, x: 140, y: 950, width: 460, height: 32, zIndex: 3, editable: { content: true } }
    ]
  },
  // 7. 数据便签（16:9）
  {
    id: 'simple-line-chart-card', name: '数据便签', version: '1.0.0', category: 'simple',
    tags: ['simple', 'data', 'chart', 'kpi', '16:9'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23f4f6f8"/><rect x="12" y="18" width="76" height="64" rx="5" fill="%23fff"/><polyline points="22,62 34,50 46,56 58,40 70,46 78,32" fill="none" stroke="%230d9488" stroke-width="3"/><rect x="22" y="26" width="26" height="6" fill="%231f2937"/></svg>',
    tokens: {
      colors: SIMPLE_COLORS(['雾纸', '墨蓝', '松青'], ['#F4F6F8', '#1E293B', '#0D9488'],
        [['#F4F6F8', '#FAFAFA', '#F6F7F5', '#FBF7F0'], ['#1E293B', '#0F172A', '#334155', '#292524'], ['#0D9488', '#4F46E5', '#2563EB', '#166534']]),
      fonts: { heading: { label: '标题字体', default: SANS, options: [SANS, 'Inter, sans-serif', SERIF, MONO] } }
    },
    presets: [
      { name: '雾纸松青', colors: { bg: '#F4F6F8', primary: '#1E293B', accent: '#0D9488' } },
      { name: '素白靛印', colors: { bg: '#FAFAFA', primary: '#0F172A', accent: '#4F46E5' } },
      { name: '豆绿森墨', colors: { bg: '#F6F7F5', primary: '#334155', accent: '#166534' } },
      { name: '米纸海蓝', colors: { bg: '#FBF7F0', primary: '#292524', accent: '#2563EB' } }
    ],
    canvas: { virtualWidth: 1920, virtualHeight: 1080, defaultWidth: 1920, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'lc-card', type: 'shape', shapeKind: 'rect', x: 140, y: 110, width: 1640, height: 860, fill: '#FFFFFF', borderRadius: 18, shadow: { color: 'rgba(30,41,59,0.08)', blur: 30, offsetX: 0, offsetY: 14 }, zIndex: 1 },
      { id: 'lc-label', type: 'text', content: 'MONTHLY NOTE · 九月小结', fontFamily: MONO, fontSize: 24, color: { $t: 'colors.accent' }, letterSpacing: 4, x: 220, y: 176, width: 620, height: 36, zIndex: 3, editable: { content: true } },
      { id: 'lc-title', type: 'text', content: '这个月最好的一个数字', fontFamily: { $t: 'fonts.heading' }, fontSize: 54, fontWeight: '700', color: { $t: 'colors.primary' }, x: 220, y: 232, width: 900, height: 76, zIndex: 3, animation: { name: 'fadeIn', duration: 800 }, editable: { content: true, fontSize: { type: 'range', min: 36, max: 76 }, position: true } },
      { id: 'lc-big', type: 'text', content: '82.6', fontFamily: SANS, fontSize: 240, fontWeight: '800', color: { $t: 'colors.primary' }, letterSpacing: -8, x: 220, y: 372, width: 700, height: 280, zIndex: 3, animation: { name: 'zoomIn', duration: 900 }, editable: { content: true, fontSize: { type: 'range', min: 140, max: 320 }, position: true } },
      { id: 'lc-unit', type: 'text', content: '小时 / 深度工作', fontFamily: SONG, fontSize: 30, color: { $t: 'colors.primary' }, opacity: 0.6, x: 220, y: 668, width: 500, height: 42, zIndex: 3, editable: { content: true } },
      { id: 'lc-delta-pill', type: 'shape', shapeKind: 'rect', x: 232, y: 742, width: 190, height: 56, fill: { $t: 'colors.accent' }, opacity: 0.12, borderRadius: 28, zIndex: 3 },
      { id: 'lc-delta', type: 'text', content: '▲ +12.4%', fontFamily: MONO, fontSize: 28, fontWeight: '700', color: { $t: 'colors.accent' }, textAlign: 'center', x: 220, y: 754, width: 190, height: 34, zIndex: 4, editable: { content: true } },
      { id: 'lc-delta-note', type: 'text', content: '对比上月', fontFamily: SONG, fontSize: 24, color: { $t: 'colors.primary' }, opacity: 0.5, x: 444, y: 756, width: 200, height: 32, zIndex: 4, editable: { content: true } },
      { id: 'lc-chart', type: 'image', src: sparkline(860, 420, 'rgba(13,148,136,0.9)', 913), x: 900, y: 300, width: 860, height: 420, zIndex: 3, animation: { name: 'shimmer', duration: 5200, iterationCount: 'infinite' } },
      { id: 'lc-axis', type: 'shape', shapeKind: 'rect', x: 900, y: 726, width: 860, height: 1.5, fill: { $t: 'colors.primary' }, opacity: 0.12, zIndex: 2 },
      { id: 'lc-x1', type: 'text', content: 'W1', fontFamily: MONO, fontSize: 20, color: { $t: 'colors.primary' }, opacity: 0.4, x: 900, y: 744, width: 60, height: 28, zIndex: 3 },
      { id: 'lc-x2', type: 'text', content: 'W2', fontFamily: MONO, fontSize: 20, color: { $t: 'colors.primary' }, opacity: 0.4, x: 1115, y: 744, width: 60, height: 28, zIndex: 3 },
      { id: 'lc-x3', type: 'text', content: 'W3', fontFamily: MONO, fontSize: 20, color: { $t: 'colors.primary' }, opacity: 0.4, x: 1330, y: 744, width: 60, height: 28, zIndex: 3 },
      { id: 'lc-x4', type: 'text', content: 'W4', fontFamily: MONO, fontSize: 20, color: { $t: 'colors.primary' }, opacity: 0.4, x: 1545, y: 744, width: 60, height: 28, zIndex: 3 },
      { id: 'lc-peak', type: 'text', content: '峰值出现在第三周 · 周四清晨', fontFamily: SONG, fontSize: 26, color: { $t: 'colors.primary' }, opacity: 0.65, x: 900, y: 812, width: 700, height: 38, zIndex: 3, editable: { content: true } },
      { id: 'lc-foot', type: 'text', content: '数据来源：手写台账 · 单位已折算', fontFamily: SANS, fontSize: 22, color: { $t: 'colors.primary' }, opacity: 0.35, x: 900, y: 880, width: 700, height: 32, zIndex: 3, editable: { content: true } }
    ]
  },
  // 8. 拱窗（9:16）
  {
    id: 'simple-arch-window', name: '拱窗', version: '1.0.0', category: 'simple',
    tags: ['simple', 'arch', 'geometry', 'still', '9:16'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23faf5f4"/><path d="M32 88V44a18 18 0 0 1 36 0v44z" fill="%23dbe7e3"/><path d="M37 84V45a13 13 0 0 1 26 0v39" fill="none" stroke="%23b45309" stroke-width="1" opacity="0.45"/><path d="M40 76V46a10 10 0 0 1 20 0v30" fill="none" stroke="%23ffffff" stroke-width="6" opacity="0.5"/><circle cx="50" cy="40" r="9" fill="%23b45309"/><rect x="49" y="58" width="2" height="30" fill="%231f2937" opacity="0.3"/><rect x="26" y="84" width="48" height="3" fill="%23292524" opacity="0.16"/><rect x="28" y="89" width="44" height="1" fill="%23292524" opacity="0.3"/><rect x="34" y="14" width="13" height="1" fill="%23292524" opacity="0.28"/><rect x="53" y="14" width="13" height="1" fill="%23292524" opacity="0.28"/><circle cx="50" cy="11" r="2.4" fill="none" stroke="%23b45309" stroke-width="1" opacity="0.75"/><rect x="78" y="40" width="2" height="2" fill="%23292524" opacity="0.45"/><rect x="78" y="45" width="2" height="2" fill="%23292524" opacity="0.4"/><rect x="78" y="50" width="2" height="2" fill="%23292524" opacity="0.35"/><rect x="78" y="55" width="2" height="2" fill="%23292524" opacity="0.3"/></svg>',
    tokens: {
      colors: SIMPLE_COLORS(['藕粉墙', '炭灰', '陶土橘'], ['#FAF5F4', '#292524', '#B45309'],
        [['#FAF5F4', '#F8FAFC', '#F7F6F2', '#F3F7EC'], ['#292524', '#1C1917', '#111827', '#334155'], ['#B45309', '#0D9488', '#BE123C', '#4F46E5']]),
      fonts: { heading: { label: '标题字体', default: SERIF, options: [SERIF, SONG, SANS, 'Inter, sans-serif'] } }
    },
    presets: [
      { name: '藕粉陶土', colors: { bg: '#FAF5F4', primary: '#292524', accent: '#B45309' } },
      { name: '月白松青', colors: { bg: '#F8FAFC', primary: '#111827', accent: '#0D9488' } },
      { name: '旧米梅红', colors: { bg: '#F7F6F2', primary: '#1C1917', accent: '#BE123C' } },
      { name: '豆绿靛印', colors: { bg: '#F3F7EC', primary: '#334155', accent: '#4F46E5' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1920, defaultWidth: 1080, defaultHeight: 1920, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'aw-arch', type: 'shape', shapeKind: 'rect', x: 200, y: 280, width: 680, height: 1080, fill: { $t: 'colors.accent' }, opacity: 0.14, borderRadius: 340, zIndex: 1 },
      { id: 'aw-arch-line', type: 'shape', shapeKind: 'rect', x: 240, y: 320, width: 600, height: 1040, fill: 'transparent', border: { color: { $t: 'colors.accent' }, width: 2, style: 'solid' }, borderRadius: 300, zIndex: 2, opacity: 0.5 },
      { id: 'aw-sun', type: 'shape', shapeKind: 'circle', x: 430, y: 470, width: 220, height: 220, fill: { $t: 'colors.accent' }, opacity: 0.85, zIndex: 2, animation: { name: 'float', duration: 6200, iterationCount: 'infinite' } },
      { id: 'aw-horizon', type: 'shape', shapeKind: 'rect', x: 240, y: 900, width: 600, height: 1.5, fill: { $t: 'colors.primary' }, opacity: 0.25, zIndex: 3 },
      { id: 'aw-mullion', type: 'shape', shapeKind: 'rect', x: 537, y: 320, width: 5, height: 1000, fill: { $t: 'colors.primary' }, opacity: 0.18, zIndex: 3 },
      { id: 'aw-kicker', type: 'text', content: 'ARCH & LIGHT · 光物几何', fontFamily: MONO, fontSize: 24, color: { $t: 'colors.primary' }, opacity: 0.55, letterSpacing: 5, textAlign: 'center', x: 240, y: 176, width: 600, height: 36, zIndex: 3, editable: { content: true } },
      { id: 'aw-title', type: 'text', content: '窗不开，\n光自己会进来', fontFamily: { $t: 'fonts.heading' }, fontSize: 96, fontWeight: '700', color: { $t: 'colors.primary' }, textAlign: 'center', lineHeight: 1.45, x: 140, y: 1500, width: 800, height: 300, zIndex: 3, animation: { name: 'fadeInUp', duration: 900 }, editable: { content: true, fontSize: { type: 'range', min: 60, max: 120 }, position: true } },
      { id: 'aw-bar', type: 'shape', shapeKind: 'rect', x: 490, y: 1830, width: 100, height: 4, fill: { $t: 'colors.accent' }, zIndex: 3 },
      { id: 'aw-foot', type: 'text', content: 'GEOMETRY STUDY NO.8 · 二〇二六秋', fontFamily: SANS, fontSize: 20, color: { $t: 'colors.primary' }, opacity: 0.4, letterSpacing: 3, textAlign: 'center', x: 240, y: 1858, width: 600, height: 30, zIndex: 3, editable: { content: true } },
      // —— 加密度：拱中拱细线 / 斜射光柱 / 窗台与台面线 / 顶部装饰短线+圆章 / 右侧竖排小字 ——
      { id: 'aw-arch-inner', type: 'shape', shapeKind: 'rect', x: 276, y: 356, width: 528, height: 980, fill: 'transparent', borderRadius: 264, border: { color: { $t: 'colors.accent' }, width: 1.5 }, opacity: 0.3, zIndex: 1, editable: { content: true } as any },
      { id: 'aw-shaft', type: 'overlay', background: 'linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 72%)', x: 520, y: 490, width: 280, height: 860, rotation: 14, zIndex: 2 },
      { id: 'aw-sill', type: 'shape', shapeKind: 'rect', x: 176, y: 1360, width: 728, height: 18, fill: { $t: 'colors.primary' }, opacity: 0.14, zIndex: 2 },
      { id: 'aw-sill-rule', type: 'shape', shapeKind: 'rect', x: 196, y: 1392, width: 688, height: 1.5, fill: { $t: 'colors.primary' }, opacity: 0.3, zIndex: 2 },
      { id: 'aw-top-rule-l', type: 'shape', shapeKind: 'rect', x: 390, y: 138, width: 120, height: 1.5, fill: { $t: 'colors.primary' }, opacity: 0.25, zIndex: 3 },
      { id: 'aw-top-rule-r', type: 'shape', shapeKind: 'rect', x: 570, y: 138, width: 120, height: 1.5, fill: { $t: 'colors.primary' }, opacity: 0.25, zIndex: 3 },
      { id: 'aw-top-gem', type: 'shape', shapeKind: 'circle', x: 528, y: 126, width: 20, height: 20, fill: 'transparent', border: { color: { $t: 'colors.accent' }, width: 1.5 }, opacity: 0.7, zIndex: 3 },
      { id: 'aw-vlabel', type: 'text', content: '光\n与\n静\n物', fontFamily: SONG, fontSize: 24, color: { $t: 'colors.primary' }, opacity: 0.4, lineHeight: 1.9, x: 920, y: 640, width: 32, height: 220, zIndex: 3, editable: { content: true } as any }
    ]
  },
  // 9. 标签矩阵（1:1）
  {
    id: 'simple-tag-row', name: '标签矩阵', version: '1.0.0', category: 'simple',
    tags: ['simple', 'tags', 'capsule', 'grid', '1:1'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23fafafa"/><rect x="14" y="16" width="52" height="7" rx="3" fill="%23111827"/><rect x="14" y="40" width="26" height="12" rx="6" fill="%234f46e5" opacity="0.16"/><rect x="46" y="40" width="34" height="12" rx="6" fill="%234f46e5" opacity="0.16"/><rect x="14" y="58" width="30" height="12" rx="6" fill="%234f46e5" opacity="0.16"/><rect x="50" y="58" width="22" height="12" rx="6" fill="%234f46e5" opacity="0.16"/></svg>',
    tokens: {
      colors: SIMPLE_COLORS(['素白', '黑', '靛蓝'], ['#FAFAFA', '#111827', '#4F46E5'],
        [['#FAFAFA', '#F6F7F5', '#F4F6F8', '#FBF7F0'], ['#111827', '#1F2937', '#292524', '#334155'], ['#4F46E5', '#0D9488', '#BE123C', '#B45309']]),
      fonts: { heading: { label: '标题字体', default: 'Inter, sans-serif', options: ['Inter, sans-serif', SANS, SONG, SERIF] } }
    },
    presets: [
      { name: '素白靛蓝', colors: { bg: '#FAFAFA', primary: '#111827', accent: '#4F46E5' } },
      { name: '豆绿松青', colors: { bg: '#F6F7F5', primary: '#1F2937', accent: '#0D9488' } },
      { name: '雾蓝梅红', colors: { bg: '#F4F6F8', primary: '#334155', accent: '#BE123C' } },
      { name: '米纸赭金', colors: { bg: '#FBF7F0', primary: '#292524', accent: '#B45309' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1080, defaultWidth: 1080, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'tr-kicker', type: 'text', content: 'COLLECTION · 我的收藏夹', fontFamily: MONO, fontSize: 24, color: { $t: 'colors.accent' }, letterSpacing: 4, x: 100, y: 128, width: 600, height: 36, zIndex: 3, editable: { content: true } },
      { id: 'tr-title', type: 'text', content: '用标签\n给兴趣编号', fontFamily: { $t: 'fonts.heading' }, fontSize: 96, fontWeight: '800', color: { $t: 'colors.primary' }, lineHeight: 1.3, x: 96, y: 190, width: 620, height: 320, zIndex: 3, animation: { name: 'fadeIn', duration: 850 }, editable: { content: true, fontSize: { type: 'range', min: 60, max: 120 }, position: true } },
      { id: 'tr-hairline', type: 'shape', shapeKind: 'rect', x: 100, y: 548, width: 880, height: 1.5, fill: { $t: 'colors.primary' }, opacity: 0.12, zIndex: 2 },
      ...(() => {
        const TAGS = ['手冲咖啡', '城市场所', '字体排印', '胶片摄影', '极简主义', '植物养护', '长键盘古', '独立杂志', '黑胶采样', '骑行路线', '陶艺入门', '冬泳记录']
        const W = [176, 176, 176, 176, 176, 176, 176, 176, 176, 176, 176, 176]
        const rows = [[0, 1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11]]
        const out: any[] = []
        rows.forEach((row, ri) => {
          row.forEach((ti, ci) => {
            const w = W[ti]
            out.push({ id: `tr-pill-${ti}`, type: 'shape' as const, shapeKind: 'rect' as const, x: 100 + ci * (w + 28), y: 596 + ri * 92, width: w, height: 62, fill: { $t: 'colors.accent' } as any, opacity: 0.1, borderRadius: 31, zIndex: 2, animation: { name: 'fadeInUp', duration: 500, delay: 300 + ti * 70 } })
            out.push({ id: `tr-tag-${ti}`, type: 'text' as const, content: TAGS[ti], fontFamily: SANS, fontSize: 26, color: { $t: 'colors.accent' } as any, textAlign: 'center' as const, x: 100 + ci * (w + 28), y: 610 + ri * 92, width: w, height: 36, zIndex: 3, editable: { content: true } })
          })
        })
        return out
      })(),
      { id: 'tr-plus', type: 'shape', shapeKind: 'rect', x: 100, y: 872, width: 62, height: 62, fill: 'transparent', border: { color: { $t: 'colors.primary' }, width: 2, style: 'dashed' }, borderRadius: 31, zIndex: 2 },
      { id: 'tr-plus-t', type: 'text', content: '+', fontFamily: SANS, fontSize: 34, color: { $t: 'colors.primary' }, opacity: 0.5, textAlign: 'center', x: 100, y: 884, width: 62, height: 40, zIndex: 3 },
      { id: 'tr-more', type: 'text', content: '还有 27 个标签，藏在你的记录里', fontFamily: SONG, fontSize: 26, color: { $t: 'colors.primary' }, opacity: 0.5, x: 186, y: 888, width: 560, height: 36, zIndex: 3, editable: { content: true } },
      { id: 'tr-foot', type: 'text', content: 'TAG GRID / 2026', fontFamily: MONO, fontSize: 20, color: { $t: 'colors.primary' }, opacity: 0.35, textAlign: 'right', x: 700, y: 892, width: 280, height: 30, zIndex: 3 }
    ]
  },
  // 10. 简讯条（16:9）
  {
    id: 'simple-newsbrief', name: '简讯条', version: '1.0.0', category: 'simple',
    tags: ['simple', 'news', 'newspaper', 'columns', '16:9'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23f7f5f0"/><rect x="8" y="12" width="84" height="4" fill="%231c1917"/><rect x="8" y="22" width="40" height="6" fill="%231c1917"/><rect x="8" y="38" width="26" height="3" fill="%23b91c1c"/><rect x="8" y="45" width="26" height="40" fill="%231c1917" opacity="0.12"/><rect x="37" y="45" width="26" height="40" fill="%231c1917" opacity="0.12"/><rect x="66" y="45" width="26" height="40" fill="%231c1917" opacity="0.12"/></svg>',
    tokens: {
      colors: SIMPLE_COLORS(['新闻纸', '油墨', '朱印'], ['#F7F5F0', '#1C1917', '#B91C1C'],
        [['#F7F5F0', '#FAFAF9', '#F4F6F8', '#FBF7F0'], ['#1C1917', '#1F2937', '#111827', '#292524'], ['#B91C1C', '#0D9488', '#2563EB', '#B45309']]),
      fonts: { heading: { label: '标题字体', default: SERIF, options: [SERIF, SONG, SANS, MONO] } }
    },
    presets: [
      { name: '新闻纸朱印', colors: { bg: '#F7F5F0', primary: '#1C1917', accent: '#B91C1C' } },
      { name: '素白松青', colors: { bg: '#FAFAF9', primary: '#1F2937', accent: '#0D9488' } },
      { name: '雾纸靛章', colors: { bg: '#F4F6F8', primary: '#111827', accent: '#2563EB' } },
      { name: '米纸赭批', colors: { bg: '#FBF7F0', primary: '#292524', accent: '#B45309' } }
    ],
    canvas: { virtualWidth: 1920, virtualHeight: 1080, defaultWidth: 1920, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'nb-rule-top', type: 'shape', shapeKind: 'rect', x: 120, y: 84, width: 1680, height: 5, fill: { $t: 'colors.primary' }, zIndex: 2 },
      { id: 'nb-masthead', type: 'text', content: 'SIMPLICITY DAILY · 简约日报', fontFamily: { $t: 'fonts.heading' }, fontSize: 58, fontWeight: '700', letterSpacing: 2, color: { $t: 'colors.primary' }, x: 120, y: 106, width: 980, height: 80, zIndex: 3, editable: { content: true, position: true } },
      { id: 'nb-vol', type: 'text', content: '第 2026 卷 · No. 0919', fontFamily: MONO, fontSize: 24, color: { $t: 'colors.primary' }, opacity: 0.5, textAlign: 'right', x: 1360, y: 134, width: 440, height: 34, zIndex: 3, editable: { content: true } },
      { id: 'nb-rule-mid1', type: 'shape', shapeKind: 'rect', x: 120, y: 206, width: 1680, height: 2, fill: { $t: 'colors.primary' }, opacity: 0.4, zIndex: 2 },
      { id: 'nb-rule-mid2', type: 'shape', shapeKind: 'rect', x: 120, y: 214, width: 1680, height: 1, fill: { $t: 'colors.primary' }, opacity: 0.18, zIndex: 2 },
      { id: 'nb-headline', type: 'text', content: '把世界的噪音，排成三栏的呼吸', fontFamily: { $t: 'fonts.heading' }, fontSize: 64, fontWeight: '700', color: { $t: 'colors.primary' }, x: 120, y: 240, width: 1680, height: 90, zIndex: 3, animation: { name: 'fadeInUp', duration: 800 }, editable: { content: true, fontSize: { type: 'range', min: 40, max: 88 }, position: true } },
      { id: 'nb-kicker-top', type: 'text', content: 'TOP STORY · 今日头条', fontFamily: MONO, fontSize: 20, color: { $t: 'colors.accent' }, letterSpacing: 6, x: 120, y: 344, width: 460, height: 30, zIndex: 3, editable: { content: true } },
      { id: 'nb-rule-cols', type: 'shape', shapeKind: 'rect', x: 120, y: 392, width: 1680, height: 1, fill: { $t: 'colors.primary' }, opacity: 0.25, zIndex: 2 },
      { id: 'nb-div1', type: 'shape', shapeKind: 'rect', x: 672, y: 418, width: 1, height: 470, fill: { $t: 'colors.primary' }, opacity: 0.15, zIndex: 2 },
      { id: 'nb-div2', type: 'shape', shapeKind: 'rect', x: 1252, y: 418, width: 1, height: 470, fill: { $t: 'colors.primary' }, opacity: 0.15, zIndex: 2 },

      { id: 'nb-c1-dot', type: 'shape', shapeKind: 'rect', x: 120, y: 424, width: 12, height: 12, fill: { $t: 'colors.accent' }, zIndex: 3, animation: { name: 'pulse', duration: 2400, iterationCount: 'infinite' } },
      { id: 'nb-c1-kicker', type: 'text', content: '城市 CITY', fontFamily: MONO, fontSize: 22, color: { $t: 'colors.accent' }, letterSpacing: 3, x: 146, y: 416, width: 320, height: 30, zIndex: 3, editable: { content: true } },
      { id: 'nb-c1-title', type: 'text', content: '通勤路上读完的\n三十页书', fontFamily: SONG, fontSize: 38, fontWeight: '700', color: { $t: 'colors.primary' }, lineHeight: 1.35, x: 120, y: 460, width: 520, height: 112, zIndex: 3, animation: { name: 'fadeIn', duration: 700, delay: 150 }, editable: { content: true, fontSize: { type: 'range', min: 28, max: 48 }, position: true } },
      { id: 'nb-c1-photo', type: 'image', src: '/images/photo/brief-commute-520x180.jpg', objectFit: 'cover', x: 120, y: 590, width: 520, height: 180, zIndex: 3, editable: { src: { type: 'upload' }, position: true, size: { type: 'scale' } } },
      { id: 'nb-c1-body', type: 'text', content: '把碎片时间折进书页里，到站时刚好读完一章。地铁的报站声，成了天然的书签。', fontFamily: SONG, fontSize: 24, color: { $t: 'colors.primary' }, opacity: 0.68, lineHeight: 1.7, x: 120, y: 792, width: 520, height: 96, zIndex: 3, editable: { content: true } },

      { id: 'nb-c2-dot', type: 'shape', shapeKind: 'rect', x: 700, y: 424, width: 12, height: 12, fill: { $t: 'colors.accent' }, zIndex: 3 },
      { id: 'nb-c2-kicker', type: 'text', content: '书房 DESK', fontFamily: MONO, fontSize: 22, color: { $t: 'colors.accent' }, letterSpacing: 3, x: 726, y: 416, width: 320, height: 30, zIndex: 3, editable: { content: true } },
      { id: 'nb-c2-title', type: 'text', content: '桌面清空计划\n第一周报告', fontFamily: SONG, fontSize: 38, fontWeight: '700', color: { $t: 'colors.primary' }, lineHeight: 1.35, x: 700, y: 460, width: 520, height: 112, zIndex: 3, animation: { name: 'fadeIn', duration: 700, delay: 300 }, editable: { content: true, fontSize: { type: 'range', min: 28, max: 48 }, position: true } },
      { id: 'nb-c2-body', type: 'text', content: '桌上只留一盏灯、一台电脑。第三天开始，找东西的时间变成了发呆的时间——这是好兆头。', fontFamily: SONG, fontSize: 24, color: { $t: 'colors.primary' }, opacity: 0.68, lineHeight: 1.7, x: 700, y: 590, width: 520, height: 180, zIndex: 3, editable: { content: true } },
      { id: 'nb-c2-quote', type: 'text', content: '「少放，是多想。」', fontFamily: { $t: 'fonts.heading' }, fontSize: 26, fontStyle: 'italic', color: { $t: 'colors.accent' }, x: 700, y: 792, width: 520, height: 40, zIndex: 3, editable: { content: true } },

      { id: 'nb-c3-dot', type: 'shape', shapeKind: 'rect', x: 1280, y: 424, width: 12, height: 12, fill: { $t: 'colors.accent' }, zIndex: 3 },
      { id: 'nb-c3-kicker', type: 'text', content: '厨房 KITCHEN', fontFamily: MONO, fontSize: 22, color: { $t: 'colors.accent' }, letterSpacing: 3, x: 1306, y: 416, width: 320, height: 30, zIndex: 3, editable: { content: true } },
      { id: 'nb-c3-title', type: 'text', content: '三样食材的\n晚饭美学', fontFamily: SONG, fontSize: 38, fontWeight: '700', color: { $t: 'colors.primary' }, lineHeight: 1.35, x: 1280, y: 460, width: 520, height: 112, zIndex: 3, animation: { name: 'fadeIn', duration: 700, delay: 450 }, editable: { content: true, fontSize: { type: 'range', min: 28, max: 48 }, position: true } },
      { id: 'nb-c3-body', type: 'text', content: '米、蛋、一把青菜。菜单越短，采购越轻，剩菜越少。本周冰箱清空率：百分之九十二。', fontFamily: SONG, fontSize: 24, color: { $t: 'colors.primary' }, opacity: 0.68, lineHeight: 1.7, x: 1280, y: 590, width: 520, height: 180, zIndex: 3, editable: { content: true } },
      { id: 'nb-c3-tag', type: 'shape', shapeKind: 'rect', x: 1280, y: 792, width: 96, height: 34, fill: 'transparent', border: { color: { $t: 'colors.accent' }, width: 1.5, style: 'solid' }, borderRadius: 4, zIndex: 3 },
      { id: 'nb-c3-tag-t', type: 'text', content: '简讯', fontFamily: MONO, fontSize: 20, color: { $t: 'colors.accent' }, textAlign: 'center', x: 1280, y: 798, width: 96, height: 26, zIndex: 4 },

      { id: 'nb-rule-foot', type: 'shape', shapeKind: 'rect', x: 120, y: 928, width: 1680, height: 1, fill: { $t: 'colors.primary' }, opacity: 0.3, zIndex: 2 },
      { id: 'nb-foot-l', type: 'text', content: 'PAGE A01', fontFamily: MONO, fontSize: 20, color: { $t: 'colors.primary' }, opacity: 0.4, x: 120, y: 950, width: 200, height: 30, zIndex: 3 },
      { id: 'nb-foot-c', type: 'text', content: '简单，是一种编辑能力', fontFamily: SONG, fontSize: 22, color: { $t: 'colors.primary' }, opacity: 0.5, textAlign: 'center', x: 660, y: 948, width: 600, height: 34, zIndex: 3, editable: { content: true } },
      { id: 'nb-foot-r', type: 'text', content: 'EDITED · 2026.09', fontFamily: MONO, fontSize: 20, color: { $t: 'colors.primary' }, opacity: 0.4, textAlign: 'right', x: 1500, y: 950, width: 300, height: 30, zIndex: 3, editable: { content: true } }
    ]
  }
]
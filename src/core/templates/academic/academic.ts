// src/core/templates/academic/academic.ts
// 学术分类 10 个模板：论文/答辩/期刊/黑板/实验本/书单/会议/毕业/图表/引书
import type { Template } from '@/types/types'
import { seededInt } from '../_fx/common'

const seeded = seededInt

// 方格纸纹理
function gridBg(w: number, h: number, gap = 45, stroke = 'rgba(29,78,216,0.11)') {
  let lines = ''
  for (let x = gap; x < w; x += gap) lines += `<line x1='${x}' y1='0' x2='${x}' y2='${h}' stroke='${stroke}'/>`
  for (let y = gap; y < h; y += gap) lines += `<line x1='0' y1='${y}' x2='${w}' y2='${y}' stroke='${stroke}'/>`
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" stroke-width="1.4">${lines}</svg>`
}
// 条码
function barcode(w: number, h: number, fill = '%23111827', seed = 7) {
  const rnd = seeded(seed); let bars = ''; let x = 4
  while (x < w - 8) { const bw = 1 + (rnd() % 4); bars += `<rect x='${x}' y='0' width='${bw}' height='${h}' fill='${fill}'/>`; x += bw + 2 + (rnd() % 3) }
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${bars}</svg>`
}
// 二维码占位（原创像素噪声 + 三定位角）
function qrBlock(w: number, h: number, cell: number, color = '%23111827', seed = 21) {
  const n = Math.floor(w / cell); let sq = ''
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) { if (((i * 7 + j * 13 + i * j * 3 + seed) % 100) < 46) sq += `<rect x='${i * cell}' y='${j * cell}' width='${cell}' height='${cell}' fill='${color}'/>` }
  const eye = (ex: number, ey: number) => `<rect x='${ex}' y='${ey}' width='${cell * 7}' height='${cell * 7}' fill='none' stroke='${color}' stroke-width='${cell}'/><rect x='${ex + cell * 2}' y='${ey + cell * 2}' width='${cell * 3}' height='${cell * 3}' fill='${color}'/>`
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${sq}${eye(0, 0)}${eye(w - cell * 7, 0)}${eye(0, h - cell * 7)}</svg>`
}
// 折线图（原创，含渐变面积）
function lineChart(w: number, h: number, stroke = '%23DC2626', seed = 99) {
  const rnd = seeded(seed); const n = 12; const pts: string[] = []
  for (let i = 0; i <= n; i++) pts.push(`${Math.round((i / n) * (w - 60) + 30)},${Math.round(h - 40 - (rnd() % Math.round(h * 0.6)) - 10)}`)
  const dots = pts.map(p => `<circle cx='${p.split(',')[0]}' cy='${p.split(',')[1]}' r='5' fill='${stroke}'/>`).join('')
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><polyline points='${pts.join(' ')}' fill='none' stroke='${stroke}' stroke-width='5' stroke-linecap='round' stroke-linejoin='round'/>${dots}</svg>`
}
// 粉笔灰散点
function dustDots(w: number, h: number, n = 46, seed = 66, fill = 'rgba(241,245,242,0.35)') {
  const rnd = seeded(seed); let c = ''
  for (let i = 0; i < n; i++) c += `<circle cx='${rnd() % w}' cy='${rnd() % h}' r='${1 + rnd() % 3}' fill='${fill}'/>`
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${c}</svg>`
}

// 原创贴图：学位帽 / 徽章环 / 烧瓶
const CAP = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="220" height="160" viewBox="0 0 220 160"><polygon points="110,14 208,52 110,90 12,52" fill="%231E3A5F"/><path d="M62 68v30c0 15 96 15 96 0V68" fill="%2316294A"/><rect x="104" y="46" width="12" height="10" fill="%23B08D3E"/><path d="M196 58v46" stroke="%23B08D3E" stroke-width="7"/><circle cx="196" cy="112" r="10" fill="%23B08D3E"/></svg>'
const BADGE = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160"><circle cx="80" cy="80" r="70" fill="none" stroke="%23C9A227" stroke-width="4"/><circle cx="80" cy="80" r="58" fill="none" stroke="%23C9A227" stroke-width="1.6"/><path d="M50 96V60l30-14 30 14v36" fill="none" stroke="%23C9A227" stroke-width="5" stroke-linejoin="round"/><path d="M50 96h60" stroke="%23C9A227" stroke-width="5"/></svg>'
const FLASK = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="140" height="160" viewBox="0 0 140 160"><path d="M56 14h28M62 14v34L28 128a12 12 0 0 0 11 17h62a12 12 0 0 0 11-17L78 48V14" fill="none" stroke="%23E8F0EA" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/><path d="M41 104h58l11 25a11 11 0 0 1-10 15H40a11 11 0 0 1-10-15z" fill="%23A7E0C2" opacity="0.75"/><circle cx="60" cy="118" r="5" fill="%23E8F0EA" opacity="0.8"/><circle cx="82" cy="126" r="4" fill="%23E8F0EA" opacity="0.8"/></svg>'

const SERIF = 'Didot, Georgia, "Times New Roman", serif'
const SONG = 'Songti SC, SimSun, serif'
const SANS = 'Helvetica, Arial, sans-serif'
const MONO = 'Consolas, Menlo, "Courier New", monospace'
const HAND = 'STKaiti, KaiTi, serif'

const ACADEM_COLORS = (labels: [string, string, string], defs: [string, string, string], opts: string[][]) => ({
  bg: { label: labels[0], default: defs[0], options: opts[0] },
  primary: { label: labels[1], default: defs[1], options: opts[1] },
  accent: { label: labels[2], default: defs[2], options: opts[2] }
})

export const academicTemplates: Template[] = [
  // 1. 论文首页卡（4:5）
  {
    id: 'acad-paper-firstpage', name: '论文首页卡', version: '1.0.0', category: 'academic',
    tags: ['academic', 'paper', 'research', 'thesis', '4:5'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="125" viewBox="0 0 100 125"><rect width="100" height="125" fill="%23fbf9f2"/><rect x="15" y="18" width="70" height="7" fill="%231f2937"/><rect x="25" y="32" width="50" height="4" fill="%237c2d12"/><rect x="15" y="60" width="32" height="45" fill="%23d6d3d1"/><rect x="53" y="60" width="32" height="45" fill="%23d6d3d1"/></svg>',
    tokens: {
      colors: ACADEM_COLORS(['纸面', '墨色', '强调'], ['#FBF9F2', '#1F2937', '#7C2D12'],
        [['#FBF9F2', '#F5F2E8', '#F2F5F0', '#0F172A', '#F5F7FA'], ['#1F2937', '#111827', '#351C15', '#F8FAFC', '#14231B', '#1E3A5F'], ['#7C2D12', '#0F5132', '#1E3A5F', '#B45309', '#B08D3E', '#E7B10A']]),
      fonts: { heading: { label: '标题字体', default: SONG, options: [SONG, SERIF, 'STZhongsong, SimSun, serif'] } }
    },
    presets: [
      { name: '砖红米白', colors: { bg: '#FBF9F2', primary: '#1F2937', accent: '#7C2D12' } },
      { name: '墨绿玄纸', colors: { bg: '#F2F5F0', primary: '#14231B', accent: '#0F5132' } },
      { name: '藏蓝学术', colors: { bg: '#F5F7FA', primary: '#1E3A5F', accent: '#B08D3E' } },
      { name: '暗夜反白', colors: { bg: '#0F172A', primary: '#F8FAFC', accent: '#E7B10A' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'pf-kicker', type: 'text', content: 'VOL. 12 · NO. 04 · SPRING 2026', fontFamily: MONO, fontSize: 22, fontWeight: '600', color: { $t: 'colors.accent' }, letterSpacing: 4, textAlign: 'center', x: 90, y: 66, width: 900, height: 30, zIndex: 2 },
      { id: 'pf-rule-top', type: 'shape', shapeKind: 'line', x: 90, y: 116, width: 900, height: 3, fill: { $t: 'colors.primary' }, opacity: 0.85, zIndex: 2 },
      { id: 'pf-title', type: 'text', content: 'Attention Is All You Need\n再思考：Transformer\n的下一个十年', fontFamily: { $t: 'fonts.heading' }, fontSize: 46, fontWeight: '800', color: { $t: 'colors.primary' }, textAlign: 'center', lineHeight: 1.35, x: 100, y: 146, width: 880, height: 200, zIndex: 2, animation: { name: 'fadeInDown', duration: 800 }, editable: { content: true, fontSize: { type: 'range', min: 36, max: 58 }, position: true } },
      { id: 'pf-authors', type: 'text', content: '张三¹　李四²　王五¹', fontFamily: SONG, fontSize: 30, fontWeight: '600', color: { $t: 'colors.primary' }, textAlign: 'center', x: 140, y: 350, width: 800, height: 40, zIndex: 2, animation: { name: 'fadeIn', duration: 700, delay: 200 }, editable: { content: true } },
      { id: 'pf-affil', type: 'text', content: '¹ 北京大学 计算机学院　　² 清华大学 交叉信息研究院', fontFamily: SANS, fontSize: 22, color: { $t: 'colors.primary' }, opacity: 0.62, textAlign: 'center', x: 110, y: 398, width: 860, height: 32, zIndex: 2, editable: { content: true } },
      { id: 'pf-abs-label', type: 'text', content: '摘要 / ABSTRACT', fontFamily: SANS, fontSize: 24, fontWeight: '800', color: { $t: 'colors.accent' }, letterSpacing: 3, x: 90, y: 466, width: 400, height: 32, zIndex: 2 },
      { id: 'pf-abs-body', type: 'text', content: '我们提出一种全新的网络架构 Transformer，完全基于注意力机制，彻底摒弃了循环与卷积结构。本文通过对自注意力块的并行化与表示能力的提升，在机器翻译任务上以更少的训练时间获得了更优的结果。', fontFamily: SONG, fontSize: 26, color: { $t: 'colors.primary' }, opacity: 0.88, lineHeight: 1.75, x: 90, y: 506, width: 900, height: 160, zIndex: 2, editable: { content: true, fontSize: { type: 'range', min: 20, max: 34 }, position: true } },
      { id: 'pf-rule-mid', type: 'shape', shapeKind: 'line', x: 90, y: 690, width: 900, height: 2, fill: { $t: 'colors.primary' }, opacity: 0.35, zIndex: 2 },
      ...Array.from({ length: 11 }, (_, i) => ({ id: `pf-colL-${i}`, type: 'shape' as const, shapeKind: 'rect' as const, x: 90, y: 716 + i * 34, width: i % 4 === 3 ? 300 : 425, height: 10, fill: { $t: 'colors.primary' } as any, opacity: 0.14, group: 'skeleton', zIndex: 1 })),
      ...Array.from({ length: 11 }, (_, i) => ({ id: `pf-colR-${i}`, type: 'shape' as const, shapeKind: 'rect' as const, x: 565, y: 716 + i * 34, width: i % 5 === 4 ? 260 : 425, height: 10, fill: { $t: 'colors.primary' } as any, opacity: 0.14, zIndex: 1 })),
      { id: 'pf-figbox', type: 'shape', shapeKind: 'rect', x: 565, y: 1094, width: 425, height: 130, fill: { $t: 'colors.accent' }, opacity: 0.1, border: { color: { $t: 'colors.accent' } as any, width: 2, style: 'dashed' as const }, zIndex: 1 },
      { id: 'pf-fig-cap', type: 'text', content: '图 1 · 架构示意（占位）', fontFamily: SANS, fontSize: 20, color: { $t: 'colors.accent' }, textAlign: 'center', x: 565, y: 1148, width: 425, height: 28, zIndex: 2, editable: { content: true } },
      { id: 'pf-page', type: 'text', content: 'p. 1 / 24', fontFamily: MONO, fontSize: 20, color: { $t: 'colors.primary' }, opacity: 0.5, x: 880, y: 1268, width: 110, height: 26, zIndex: 2 },
      { id: 'pf-footer', type: 'text', content: 'ACADEMIA PRESS · ISSN 2076-0000', fontFamily: MONO, fontSize: 20, color: { $t: 'colors.primary' }, opacity: 0.5, letterSpacing: 2, x: 90, y: 1268, width: 500, height: 26, zIndex: 2, editable: { content: true } },
      { id: 'pf-rule-bot', type: 'shape', shapeKind: 'line', x: 90, y: 1256, width: 900, height: 2, fill: { $t: 'colors.accent' }, opacity: 0.8, zIndex: 2 }
    ]
  },
  // 2. 答辩 PPT 封面（16:9）
  {
    id: 'acad-thesis-defense', name: '答辩 PPT 封面', version: '1.0.0', category: 'academic',
    tags: ['academic', 'defense', 'slides', 'thesis', '16:9'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="90" viewBox="0 0 160 90"><rect width="160" height="90" fill="%2310233f"/><circle cx="80" cy="30" r="12" fill="none" stroke="%23c9a227" stroke-width="2"/><rect x="40" y="50" width="80" height="6" fill="%23f8fafc"/><rect x="55" y="62" width="50" height="4" fill="%23c9a227"/></svg>',
    tokens: {
      colors: ACADEM_COLORS(['底色', '主文字', '鎏金'], ['#10233F', '#F8FAFC', '#C9A227'],
        [['#10233F', '#14231B', '#2A1215', '#18181B'], ['#F8FAFC', '#FDF6E3', '#F1F5F9', '#FEF3C7'], ['#C9A227', '#E7B10A', '#B08D3E', '#94A3B8']]),
      fonts: { heading: { label: '标题字体', default: SONG, options: [SONG, SERIF, 'STZhongsong, SimSun, serif'] } }
    },
    presets: [
      { name: '藏蓝鎏金', colors: { bg: '#10233F', primary: '#F8FAFC', accent: '#C9A227' } },
      { name: '墨绿校徽', colors: { bg: '#14231B', primary: '#FDF6E3', accent: '#B08D3E' } },
      { name: '波尔多绛红', colors: { bg: '#2A1215', primary: '#FEF3C7', accent: '#E7B10A' } },
      { name: '石墨银灰', colors: { bg: '#18181B', primary: '#F1F5F9', accent: '#94A3B8' } }
    ],
    canvas: { virtualWidth: 1920, virtualHeight: 1080, defaultWidth: 1920, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'td-frame', type: 'shape', shapeKind: 'rect', x: 44, y: 44, width: 1832, height: 992, fill: 'rgba(0,0,0,0)', border: { color: { $t: 'colors.accent' } as any, width: 2, style: 'solid' as const }, opacity: 0.5, zIndex: 1 },
      { id: 'td-frame2', type: 'shape', shapeKind: 'rect', x: 58, y: 58, width: 1804, height: 964, fill: 'rgba(0,0,0,0)', border: { color: { $t: 'colors.accent' } as any, width: 1, style: 'solid' as const }, opacity: 0.28, zIndex: 1 },
      { id: 'td-badge', type: 'image', src: BADGE, x: 860, y: 118, width: 200, height: 200, zIndex: 3, animation: { name: 'zoomIn', duration: 800 }, editable: { position: true, size: { type: 'scale' } } },
      { id: 'td-eyebrow', type: 'text', content: '硕士学位论文答辩 · MASTER\'S THESIS DEFENSE', fontFamily: SANS, fontSize: 26, fontWeight: '600', color: { $t: 'colors.accent' }, letterSpacing: 6, textAlign: 'center', x: 360, y: 350, width: 1200, height: 34, zIndex: 3, animation: { name: 'fadeIn', duration: 800, delay: 300 } },
      { id: 'td-title', type: 'text', content: '面向低资源语言的跨语言\n句义表示学习方法研究', fontFamily: { $t: 'fonts.heading' }, fontSize: 68, fontWeight: '800', color: { $t: 'colors.primary' }, textAlign: 'center', lineHeight: 1.42, x: 260, y: 414, width: 1400, height: 210, zIndex: 3, animation: { name: 'rise', duration: 900 }, editable: { content: true, fontSize: { type: 'range', min: 48, max: 84 }, position: true } },
      { id: 'td-rule', type: 'shape', shapeKind: 'line', x: 810, y: 664, width: 300, height: 4, fill: { $t: 'colors.accent' }, zIndex: 3, animation: { name: 'slideInLeft', duration: 700, delay: 500 } },
      { id: 'td-meta', type: 'text', content: '答辩人：陈明　　指导教师：刘教授 / 研究员\n答辩委员会主席：王院士\n答辩日期：2026 年 6 月 14 日 · 逸夫学术厅 305', fontFamily: SONG, fontSize: 28, color: { $t: 'colors.primary' }, opacity: 0.82, textAlign: 'center', lineHeight: 1.8, x: 460, y: 706, width: 1000, height: 160, zIndex: 3, animation: { name: 'fadeInUp', duration: 800, delay: 450 }, editable: { content: true, position: true } },
      { id: 'td-univ', type: 'text', content: 'XX 大学 · 计算机科学与技术学院', fontFamily: SANS, fontSize: 24, color: { $t: 'colors.accent' }, letterSpacing: 4, textAlign: 'center', x: 560, y: 930, width: 800, height: 30, zIndex: 3, editable: { content: true } },
      { id: 'td-corner1', group: 'td-corner', type: 'shape', shapeKind: 'rect', x: 44, y: 44, width: 64, height: 10, fill: { $t: 'colors.accent' }, zIndex: 2 },
      { id: 'td-corner2', group: 'td-corner', type: 'shape', shapeKind: 'rect', x: 44, y: 44, width: 10, height: 64, fill: { $t: 'colors.accent' }, zIndex: 2 },
      { id: 'td-corner3', group: 'td-corner', type: 'shape', shapeKind: 'rect', x: 1812, y: 1026, width: 64, height: 10, fill: { $t: 'colors.accent' }, zIndex: 2 },
      { id: 'td-corner4', group: 'td-corner', type: 'shape', shapeKind: 'rect', x: 1866, y: 1006, width: 10, height: 30, fill: { $t: 'colors.accent' }, zIndex: 2 }
    ]
  },
  // 3. 学术期刊封面（1:1）
  {
    id: 'acad-journal-cover', name: '学术期刊封面', version: '1.0.0', category: 'academic',
    tags: ['academic', 'journal', 'cover', 'quarterly', '1:1'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23fdfcf8"/><rect x="12" y="12" width="76" height="10" fill="%23111827"/><rect x="12" y="28" width="76" height="4" fill="%230f5132"/><rect x="12" y="48" width="60" height="6" fill="%23111827"/><rect x="12" y="58" width="40" height="4" fill="%230f5132"/></svg>',
    tokens: {
      colors: ACADEM_COLORS(['纸面', '主色', '刊色'], ['#FDFCF8', '#111827', '#0F5132'],
        [['#FDFCF8', '#F5F2E8', '#F2F5F0', '#EEF2F7', '#FAF3EC'], ['#111827', '#1F2937', '#14231B', '#1E3A5F', '#351C15'], ['#0F5132', '#B08D3E', '#7C2D12', '#1D4ED8']]),
      fonts: { heading: { label: '刊名字体', default: SERIF, options: [SERIF, SONG, 'Playfair Display, serif'] } }
    },
    presets: [
      { name: '常春藤绿', colors: { bg: '#FDFCF8', primary: '#111827', accent: '#0F5132' } },
      { name: '羊皮烫金', colors: { bg: '#F5F2E8', primary: '#351C15', accent: '#B08D3E' } },
      { name: '砖红复古', colors: { bg: '#FAF3EC', primary: '#1F2937', accent: '#7C2D12' } },
      { name: '钢笔蓝', colors: { bg: '#EEF2F7', primary: '#1E3A5F', accent: '#1D4ED8' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1080, defaultWidth: 1080, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'jc-mast', type: 'text', content: 'ACADEMIA', fontFamily: { $t: 'fonts.heading' }, fontSize: 118, fontWeight: '900', color: { $t: 'colors.primary' }, letterSpacing: 10, textAlign: 'center', x: 60, y: 56, width: 960, height: 140, zIndex: 3, animation: { name: 'inkReveal', duration: 1100 }, editable: { content: true, fontSize: { type: 'range', min: 80, max: 140 }, position: true } },
      { id: 'jc-sub', type: 'text', content: '社 会 科 学 版 · SOCIAL SCIENCES QUARTERLY', fontFamily: SANS, fontSize: 24, fontWeight: '600', color: { $t: 'colors.accent' }, letterSpacing: 4, textAlign: 'center', x: 140, y: 200, width: 800, height: 30, zIndex: 3, editable: { content: true } },
      { id: 'jc-rule1', type: 'shape', shapeKind: 'line', x: 60, y: 250, width: 960, height: 4, fill: { $t: 'colors.primary' }, zIndex: 2 },
      { id: 'jc-rule2', type: 'shape', shapeKind: 'line', x: 60, y: 260, width: 960, height: 1.5, fill: { $t: 'colors.primary' }, opacity: 0.55, zIndex: 2 },
      { id: 'jc-issuebar', type: 'shape', shapeKind: 'rect', x: 60, y: 286, width: 960, height: 52, fill: { $t: 'colors.accent' }, zIndex: 2, animation: { name: 'slideInLeft', duration: 600 } },
      { id: 'jc-issue', type: 'text', content: 'ISSUE Nº 128　·　JUNE 2026　·　定价 ¥ 38.00', fontFamily: SANS, fontSize: 25, fontWeight: '700', color: { $t: 'colors.bg' }, letterSpacing: 3, textAlign: 'center', x: 60, y: 297, width: 960, height: 32, zIndex: 3, editable: { content: true } },
      { id: 'jc-feat-quote', type: 'text', content: '\u201c', fontFamily: SERIF, fontSize: 150, fontWeight: '900', color: { $t: 'colors.accent' }, opacity: 0.3, x: 70, y: 366, width: 100, height: 140, zIndex: 2 },
      { id: 'jc-feat', type: 'text', content: '知识的边界\n与学术的自由', fontFamily: { $t: 'fonts.heading' }, fontSize: 74, fontWeight: '800', color: { $t: 'colors.primary' }, lineHeight: 1.3, x: 150, y: 400, width: 780, height: 230, zIndex: 3, animation: { name: 'fadeInUp', duration: 800, delay: 250 }, editable: { content: true, fontSize: { type: 'range', min: 52, max: 92 }, position: true } },
      { id: 'jc-feat-en', type: 'text', content: 'ON THE BOUNDARIES OF KNOWLEDGE', fontFamily: SANS, fontSize: 22, color: { $t: 'colors.accent' }, letterSpacing: 5, x: 154, y: 640, width: 700, height: 28, zIndex: 3, editable: { content: true } },
      { id: 'jc-toc-label', type: 'text', content: '要目 CONTENTS', fontFamily: SANS, fontSize: 20, fontWeight: '800', color: { $t: 'colors.accent' }, letterSpacing: 4, x: 70, y: 722, width: 300, height: 26, zIndex: 3 },
      { id: 'jc-toc', type: 'text', content: '04　论人文数据的公共性　·　林语生\n22　城市里的匿名空间　·　程一舟\n41　翻译中的不可译项　·　沈舟\n58　重读《规训与惩罚》　·　顾非', fontFamily: SONG, fontSize: 26, color: { $t: 'colors.primary' }, opacity: 0.85, lineHeight: 1.75, x: 70, y: 756, width: 780, height: 170, zIndex: 3, animation: { name: 'fadeIn', duration: 700, delay: 500 }, editable: { content: true, position: true } },
      { id: 'jc-code', type: 'image', src: barcode(220, 52, '%23111827', 12), x: 70, y: 972, width: 220, height: 52, zIndex: 3 },
      { id: 'jc-issn', type: 'text', content: 'ISSN 2076-0000 · 双月刊', fontFamily: MONO, fontSize: 20, color: { $t: 'colors.primary' }, opacity: 0.55, x: 70, y: 1026, width: 420, height: 26, zIndex: 3, editable: { content: true } },
      { id: 'jc-price-badge', type: 'shape', shapeKind: 'circle', x: 900, y: 890, width: 120, height: 120, fill: 'rgba(0,0,0,0)', border: { color: { $t: 'colors.accent' } as any, width: 3, style: 'solid' as const }, zIndex: 3 },
      { id: 'jc-price-txt', type: 'text', content: '新刊\n特惠', fontFamily: SONG, fontSize: 30, fontWeight: '700', color: { $t: 'colors.accent' }, textAlign: 'center', lineHeight: 1.3, x: 918, y: 916, width: 84, height: 76, zIndex: 3 }
    ]
  },
  // 4. 公式黑板（16:9）
  {
    id: 'acad-formula-blackboard', name: '公式黑板', version: '1.0.0', category: 'academic',
    tags: ['academic', 'blackboard', 'formula', 'lecture', '16:9'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="90" viewBox="0 0 160 90"><rect width="160" height="90" fill="%231e3a34"/><rect x="14" y="18" width="60" height="5" fill="%23f1f5f2" opacity="0.8"/><rect x="14" y="32" width="90" height="5" fill="%23a7e0c2" opacity="0.8"/><rect x="14" y="48" width="44" height="5" fill="%23f1f5f2" opacity="0.6"/><rect x="8" y="78" width="144" height="6" fill="%237c5b3a"/></svg>',
    tokens: {
      colors: {
        ...ACADEM_COLORS(['板底', '粉笔', '彩笔'], ['#1E3A34', '#F1F5F2', '#A7E0C2'],
          [['#1E3A34', '#17171A', '#16213A', '#2B211A'], ['#F1F5F2', '#FDF6E3', '#E8F0FF', '#F5F5F4'], ['#A7E0C2', '#FDE68A', '#F9A8D4', '#93C5FD']]),
        frame: { label: '木框', default: '#7C5B3A', options: ['#7C5B3A', '#57524B', '#3D4C6B', '#8A6440'] }
      },
      fonts: { heading: { label: '板书字体', default: MONO, options: [MONO, 'Georgia, serif', SONG] } }
    },
    presets: [
      { name: '经典墨绿', colors: { bg: '#1E3A34', primary: '#F1F5F2', accent: '#A7E0C2', frame: '#7C5B3A' } },
      { name: '炭黑讲堂', colors: { bg: '#17171A', primary: '#F5F5F4', accent: '#FDE68A', frame: '#57524B' } },
      { name: '深蓝夜课', colors: { bg: '#16213A', primary: '#E8F0FF', accent: '#93C5FD', frame: '#3D4C6B' } },
      { name: '暖棕旧板', colors: { bg: '#2B211A', primary: '#FDF6E3', accent: '#F9A8D4', frame: '#8A6440' } }
    ],
    canvas: { virtualWidth: 1920, virtualHeight: 1080, defaultWidth: 1920, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'fb-wood-t', type: 'shape', shapeKind: 'rect', x: 0, y: 0, width: 1920, height: 34, fill: { $t: 'colors.frame' }, zIndex: 4 },
      { id: 'fb-wood-b', type: 'shape', shapeKind: 'rect', x: 0, y: 1046, width: 1920, height: 34, fill: { $t: 'colors.frame' }, zIndex: 4 },
      { id: 'fb-wood-l', type: 'shape', shapeKind: 'rect', x: 0, y: 0, width: 34, height: 1080, fill: { $t: 'colors.frame' }, zIndex: 4 },
      { id: 'fb-wood-r', type: 'shape', shapeKind: 'rect', x: 1886, y: 0, width: 34, height: 1080, fill: { $t: 'colors.frame' }, zIndex: 4 },
      { id: 'fb-dust', type: 'image', src: dustDots(1700, 260, 60, 66, 'rgba(241,245,242,0.30)'), x: 110, y: 770, width: 1700, height: 260, zIndex: 2, opacity: 0.8 },
      { id: 'fb-course', type: 'text', content: '数学物理方法 · 第 12 讲', fontFamily: HAND, fontSize: 40, color: { $t: 'colors.accent' }, opacity: 0.9, letterSpacing: 4, x: 130, y: 90, width: 700, height: 54, zIndex: 3, animation: { name: 'inkReveal', duration: 1000 }, editable: { content: true, position: true } },
      { id: 'fb-underline', type: 'shape', shapeKind: 'line', x: 130, y: 152, width: 430, height: 4, fill: { $t: 'colors.accent' }, opacity: 0.75, rotation: -0.6, zIndex: 3 },
      { id: 'fb-f1', type: 'text', content: '∇·E = ρ / ε₀        ∇×B = μ₀J + μ₀ε₀ ∂E/∂t', fontFamily: { $t: 'fonts.heading' }, fontSize: 56, fontWeight: '700', color: { $t: 'colors.primary' }, x: 150, y: 240, width: 1620, height: 80, zIndex: 3, rotation: -0.4, opacity: 0.95, animation: { name: 'slideInLeft', duration: 900, delay: 200 }, editable: { content: true, fontSize: { type: 'range', min: 36, max: 72 }, position: true } },
      { id: 'fb-f2', type: 'text', content: '∫₀^∞ e^(−x²) dx = √π / 2', fontFamily: { $t: 'fonts.heading' }, fontSize: 62, fontWeight: '700', color: { $t: 'colors.primary' }, x: 150, y: 386, width: 1000, height: 90, zIndex: 3, rotation: 0.5, opacity: 0.92, animation: { name: 'inkReveal', duration: 1000, delay: 400 }, editable: { content: true, fontSize: { type: 'range', min: 40, max: 80 }, position: true } },
      { id: 'fb-f3', type: 'text', content: 'e^{iπ} + 1 = 0', fontFamily: { $t: 'fonts.heading' }, fontSize: 96, fontWeight: '800', color: { $t: 'colors.accent' }, x: 1180, y: 372, width: 700, height: 140, zIndex: 3, rotation: -1.2, animation: { name: 'shimmer', duration: 2600, iterationCount: 'infinite' }, editable: { content: true, fontSize: { type: 'range', min: 60, max: 112 }, position: true } },
      { id: 'fb-f4', type: 'text', content: 'iħ ∂ψ/∂t = Ĥψ', fontFamily: { $t: 'fonts.heading' }, fontSize: 54, fontWeight: '700', color: { $t: 'colors.primary' }, x: 150, y: 540, width: 900, height: 80, zIndex: 3, rotation: -0.6, opacity: 0.88, animation: { name: 'inkReveal', duration: 1000, delay: 650 }, editable: { content: true, fontSize: { type: 'range', min: 36, max: 70 }, position: true } },
      { id: 'fb-note', type: 'text', content: '※ 重点：此式将于期中考查', fontFamily: HAND, fontSize: 34, color: { $t: 'colors.accent' }, opacity: 0.85, x: 1120, y: 560, width: 640, height: 48, zIndex: 3, rotation: 1.2, editable: { content: true } },
      { id: 'fb-circle', type: 'shape', shapeKind: 'circle', x: 1090, y: 340, width: 780, height: 210, fill: 'rgba(0,0,0,0)', border: { color: { $t: 'colors.accent' } as any, width: 5, style: 'solid' as const }, opacity: 0.7, rotation: -1, zIndex: 3 },
      { id: 'fb-tray', type: 'shape', shapeKind: 'rect', x: 34, y: 1000, width: 1852, height: 18, fill: { $t: 'colors.frame' }, zIndex: 5 },
      { id: 'fb-chalk1', type: 'shape', shapeKind: 'rect', x: 120, y: 986, width: 74, height: 16, fill: { $t: 'colors.primary' }, borderRadius: 6, zIndex: 6 },
      { id: 'fb-chalk2', type: 'shape', shapeKind: 'rect', x: 210, y: 988, width: 56, height: 14, fill: { $t: 'colors.accent' }, borderRadius: 6, zIndex: 6, rotation: 2 },
      { id: 'fb-eraser1', type: 'shape', shapeKind: 'rect', x: 1620, y: 972, width: 150, height: 30, fill: { $t: 'colors.frame' }, borderRadius: 4, zIndex: 6 },
      { id: 'fb-eraser2', type: 'shape', shapeKind: 'rect', x: 1620, y: 950, width: 150, height: 24, fill: { $t: 'colors.primary' }, opacity: 0.75, borderRadius: 4, zIndex: 6 }
    ]
  },
  // 5. 实验记录本（1:1）
  {
    id: 'acad-lab-notebook', name: '实验记录本', version: '1.0.0', category: 'academic',
    tags: ['academic', 'lab', 'notebook', 'data', '1:1'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23f7f5ee"/><rect x="16" y="0" width="2" height="100" fill="%23dc2626" opacity="0.6"/><rect x="26" y="18" width="52" height="5" fill="%231f2937"/><rect x="26" y="34" width="48" height="30" fill="none" stroke="%231d4ed8" stroke-width="2"/><circle cx="8" cy="30" r="4" fill="%23e7e5e4"/></svg>',
    tokens: {
      colors: ACADEM_COLORS(['纸色', '墨迹', '笔色'], ['#F7F5EE', '#1F2937', '#1D4ED8'],
        [['#F7F5EE', '#FCFBEF', '#F4F6FA', '#FBF3EA'], ['#1F2937', '#111827', '#1E293B', '#292524'], ['#1D4ED8', '#DC2626', '#0F5132', '#111111']]),
      fonts: { heading: { label: '手写字体', default: HAND, options: [HAND, SONG, 'STFangsong, SimSun, serif'] } }
    },
    presets: [
      { name: '蓝钢笔', colors: { bg: '#F7F5EE', primary: '#1F2937', accent: '#1D4ED8' } },
      { name: '红钢笔', colors: { bg: '#FCFBEF', primary: '#292524', accent: '#DC2626' } },
      { name: '绿钢笔', colors: { bg: '#F4F6FA', primary: '#1E293B', accent: '#0F5132' } },
      { name: '碳素墨', colors: { bg: '#FBF3EA', primary: '#111827', accent: '#111111' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1080, defaultWidth: 1080, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'ln-grid', type: 'image', src: gridBg(1080, 1080, 45), x: 0, y: 0, width: 1080, height: 1080, zIndex: 0 },
      { id: 'ln-margin', type: 'shape', shapeKind: 'rect', x: 96, y: 0, width: 3, height: 1080, fill: { $t: 'colors.accent' }, opacity: 0.5, zIndex: 1 },
      { id: 'ln-hole1', group: 'ln-hole', type: 'shape', shapeKind: 'circle', x: 22, y: 230, width: 36, height: 36, fill: '#FFFFFF', border: { color: 'rgba(31,41,55,0.25)', width: 2, style: 'solid' as const }, zIndex: 1 },
      { id: 'ln-hole2', group: 'ln-hole', type: 'shape', shapeKind: 'circle', x: 22, y: 522, width: 36, height: 36, fill: '#FFFFFF', border: { color: 'rgba(31,41,55,0.25)', width: 2, style: 'solid' as const }, zIndex: 1 },
      { id: 'ln-hole3', group: 'ln-hole', type: 'shape', shapeKind: 'circle', x: 22, y: 814, width: 36, height: 36, fill: '#FFFFFF', border: { color: 'rgba(31,41,55,0.25)', width: 2, style: 'solid' as const }, zIndex: 1 },
      { id: 'ln-title', type: 'text', content: '实验记录 · Lab Notes', fontFamily: { $t: 'fonts.heading' }, fontSize: 54, fontWeight: '800', color: { $t: 'colors.primary' }, letterSpacing: 2, x: 130, y: 70, width: 820, height: 70, zIndex: 2, animation: { name: 'inkReveal', duration: 1000 }, editable: { content: true, fontSize: { type: 'range', min: 38, max: 68 }, position: true } },
      { id: 'ln-meta', type: 'text', content: '编号 LB-2026-041　日期 2026-05-18　环境 22℃ / 45%RH　记录人 苏晚', fontFamily: MONO, fontSize: 23, color: { $t: 'colors.primary' }, opacity: 0.7, x: 132, y: 148, width: 900, height: 32, zIndex: 2, editable: { content: true } },
      { id: 'ln-table-head', type: 'shape', shapeKind: 'rect', x: 132, y: 218, width: 820, height: 56, fill: { $t: 'colors.accent' }, opacity: 0.14, zIndex: 1 },
      { id: 'ln-table-frame', type: 'shape', shapeKind: 'rect', x: 132, y: 218, width: 820, height: 282, fill: 'rgba(0,0,0,0)', border: { color: { $t: 'colors.primary' } as any, width: 2.5, style: 'solid' as const }, zIndex: 2 },
      { id: 'ln-table-v1', type: 'shape', shapeKind: 'rect', x: 405, y: 218, width: 2, height: 282, fill: { $t: 'colors.primary' }, opacity: 0.7, zIndex: 2 },
      { id: 'ln-table-v2', type: 'shape', shapeKind: 'rect', x: 678, y: 218, width: 2, height: 282, fill: { $t: 'colors.primary' }, opacity: 0.7, zIndex: 2 },
      ...Array.from({ length: 4 }, (_, i) => ({ id: `ln-table-h${i}`, type: 'shape' as const, shapeKind: 'rect' as const, x: 132, y: 274 + i * 56 + 0.5, width: 820, height: 2, fill: { $t: 'colors.primary' } as any, opacity: 0.7, group: 'table-rules', zIndex: 2 })),
      { id: 'ln-th', type: 'text', content: '次数 t/s　　电动势 E/mV　　电流 I/mA', fontFamily: SONG, fontSize: 26, fontWeight: '700', color: { $t: 'colors.primary' }, x: 152, y: 232, width: 790, height: 32, zIndex: 3, editable: { content: true } },
      { id: 'ln-row1', type: 'text', content: '①　12.4　　41.8', fontFamily: MONO, fontSize: 26, color: { $t: 'colors.primary' }, x: 152, y: 290, width: 790, height: 34, zIndex: 3, editable: { content: true } },
      { id: 'ln-row2', type: 'text', content: '②　24.8　　83.1', fontFamily: MONO, fontSize: 26, color: { $t: 'colors.primary' }, x: 152, y: 346, width: 790, height: 34, zIndex: 3, editable: { content: true } },
      { id: 'ln-row3', type: 'text', content: '③　42.0　　139.6　← 峰值', fontFamily: MONO, fontSize: 26, fontWeight: '700', color: { $t: 'colors.accent' }, x: 152, y: 402, width: 790, height: 34, zIndex: 3, editable: { content: true } },
      { id: 'ln-row4', type: 'text', content: '④　61.5　　128.2', fontFamily: MONO, fontSize: 26, color: { $t: 'colors.primary' }, x: 152, y: 458, width: 790, height: 34, zIndex: 3, editable: { content: true } },
      { id: 'ln-concl', type: 'text', content: '结论草案：响应峰值出现在 42s 附近，\n与理论预期偏差 < 3%。明日复测③。', fontFamily: { $t: 'fonts.heading' }, fontSize: 32, color: { $t: 'colors.primary' }, lineHeight: 1.7, x: 132, y: 574, width: 830, height: 120, zIndex: 2, rotation: -0.8, animation: { name: 'fadeInUp', duration: 800, delay: 350 }, editable: { content: true, fontSize: { type: 'range', min: 24, max: 44 }, position: true } },
      { id: 'ln-check-ring', type: 'shape', shapeKind: 'circle', x: 872, y: 556, width: 108, height: 108, fill: 'rgba(0,0,0,0)', border: { color: { $t: 'colors.accent' } as any, width: 6, style: 'solid' as const }, rotation: -8, opacity: 0.9, zIndex: 2, animation: { name: 'zoomIn', duration: 500, delay: 600 } },
      { id: 'ln-check', type: 'text', content: '✓', fontFamily: SANS, fontSize: 64, fontWeight: '900', color: { $t: 'colors.accent' }, textAlign: 'center', x: 872, y: 570, width: 108, height: 84, zIndex: 3, rotation: -8 },
      { id: 'ln-stamp-box', type: 'shape', shapeKind: 'rect', x: 760, y: 872, width: 252, height: 74, fill: 'rgba(0,0,0,0)', border: { color: { $t: 'colors.accent' } as any, width: 3, style: 'solid' as const }, borderRadius: 10, rotation: -4, opacity: 0.8, zIndex: 2 },
      { id: 'ln-stamp', type: 'text', content: '导师已核阅', fontFamily: SONG, fontSize: 34, fontWeight: '800', color: { $t: 'colors.accent' }, textAlign: 'center', letterSpacing: 4, x: 760, y: 888, width: 252, height: 44, zIndex: 3, rotation: -4, editable: { content: true } },
      { id: 'ln-page', type: 'text', content: 'Page 23', fontFamily: MONO, fontSize: 22, color: { $t: 'colors.primary' }, opacity: 0.45, x: 132, y: 986, width: 160, height: 28, zIndex: 2 }
    ]
  },
  // 6. 文献清单卡（4:5）
  {
    id: 'acad-reading-list', name: '文献清单卡', version: '1.0.0', category: 'academic',
    tags: ['academic', 'reading', 'list', 'reference', '4:5'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="125" viewBox="0 0 100 125"><rect width="100" height="125" fill="%23faf7f0"/><rect x="12" y="12" width="56" height="7" fill="%23292524"/><rect x="12" y="34" width="4" height="14" fill="%23b45309"/><rect x="22" y="36" width="56" height="4" fill="%23292524" opacity="0.7"/><rect x="22" y="44" width="40" height="3" fill="%23292524" opacity="0.35"/><rect x="12" y="60" width="4" height="14" fill="%23b45309"/><rect x="22" y="62" width="50" height="4" fill="%23292524" opacity="0.7"/><rect x="22" y="70" width="34" height="3" fill="%23292524" opacity="0.35"/></svg>',
    tokens: {
      colors: ACADEM_COLORS(['纸面', '墨色', '标记'], ['#FAF7F0', '#292524', '#B45309'],
        [['#FAF7F0', '#F5F2E8', '#F2F5F0', '#EEF2F7'], ['#292524', '#1F2937', '#14231B', '#1E3A5F', '#351C15'], ['#B45309', '#0F5132', '#7C2D12', '#1D4ED8']]),
      fonts: { heading: { label: '标题字体', default: SONG, options: [SONG, SERIF, 'Georgia, serif'] } }
    },
    presets: [
      { name: '琥珀批注', colors: { bg: '#FAF7F0', primary: '#292524', accent: '#B45309' } },
      { name: '松绿书斋', colors: { bg: '#F2F5F0', primary: '#14231B', accent: '#0F5132' } },
      { name: '赭石旧纸', colors: { bg: '#F5F2E8', primary: '#351C15', accent: '#7C2D12' } },
      { name: '藏蓝书签', colors: { bg: '#EEF2F7', primary: '#1E3A5F', accent: '#1D4ED8' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'rl-head', type: 'text', content: '文献清单 · READING LIST', fontFamily: { $t: 'fonts.heading' }, fontSize: 62, fontWeight: '800', color: { $t: 'colors.primary' }, letterSpacing: 2, x: 84, y: 72, width: 912, height: 84, zIndex: 2, animation: { name: 'fadeInDown', duration: 800 }, editable: { content: true, fontSize: { type: 'range', min: 44, max: 78 }, position: true } },
      { id: 'rl-sub', type: 'text', content: '2026 春季 · 认知科学方向 · 第一批', fontFamily: SANS, fontSize: 24, color: { $t: 'colors.accent' }, letterSpacing: 3, x: 86, y: 162, width: 600, height: 32, zIndex: 2, editable: { content: true } },
      { id: 'rl-rule', type: 'shape', shapeKind: 'line', x: 84, y: 210, width: 912, height: 3, fill: { $t: 'colors.primary' }, opacity: 0.8, zIndex: 2 },
      { id: 'rl-hl', type: 'shape', shapeKind: 'rect', x: 128, y: 398, width: 660, height: 40, fill: { $t: 'colors.accent' }, opacity: 0.24, rotation: -0.6, zIndex: 1 },
      ...Array.from({ length: 5 }, (_, i) => ({ id: `rl-bar-${i}`, type: 'shape' as const, shapeKind: 'rect' as const, x: 84, y: 260 + i * 178, width: 6, height: 128, fill: { $t: 'colors.accent' } as any, opacity: 0.75, group: 'ruler', zIndex: 2 })),
      { id: 'rl-n1', type: 'text', content: '01', fontFamily: SERIF, fontSize: 34, fontWeight: '700', color: { $t: 'colors.accent' }, x: 110, y: 258, width: 70, height: 42, zIndex: 3 },
      { id: 'rl-t1', type: 'text', content: '认知负荷理论在多媒体学习中的应用', fontFamily: { $t: 'fonts.heading' }, fontSize: 36, fontWeight: '700', color: { $t: 'colors.primary' }, x: 182, y: 260, width: 810, height: 50, zIndex: 3, animation: { name: 'slideInLeft', duration: 600 }, editable: { content: true, fontSize: { type: 'range', min: 26, max: 44 }, position: true } },
      { id: 'rl-m1', type: 'text', content: 'Sweller, J. · 1988 · 《Learning and Instruction》 · 被引 8,412 · ★★★★★', fontFamily: SANS, fontSize: 23, color: { $t: 'colors.primary' }, opacity: 0.6, x: 184, y: 316, width: 810, height: 30, zIndex: 3, editable: { content: true } },
      { id: 'rl-n2', type: 'text', content: '02', fontFamily: SERIF, fontSize: 34, fontWeight: '700', color: { $t: 'colors.accent' }, x: 110, y: 436, width: 70, height: 42, zIndex: 3 },
      { id: 'rl-t2', type: 'text', content: '系统 1 与系统 2：双过程理论综述', fontFamily: { $t: 'fonts.heading' }, fontSize: 36, fontWeight: '700', color: { $t: 'colors.primary' }, x: 182, y: 438, width: 810, height: 50, zIndex: 3, animation: { name: 'slideInLeft', duration: 600, delay: 150 }, editable: { content: true, fontSize: { type: 'range', min: 26, max: 44 }, position: true } },
      { id: 'rl-m2', type: 'text', content: 'Kahneman, D. · 2011 · 《Thinking, Fast and Slow》 · 精读 ✔', fontFamily: SANS, fontSize: 23, color: { $t: 'colors.primary' }, opacity: 0.6, x: 184, y: 494, width: 810, height: 30, zIndex: 3, editable: { content: true } },
      { id: 'rl-n3', type: 'text', content: '03', fontFamily: SERIF, fontSize: 34, fontWeight: '700', color: { $t: 'colors.accent' }, x: 110, y: 614, width: 70, height: 42, zIndex: 3 },
      { id: 'rl-t3', type: 'text', content: '工作记忆容量限制与注意控制', fontFamily: { $t: 'fonts.heading' }, fontSize: 36, fontWeight: '700', color: { $t: 'colors.primary' }, x: 182, y: 616, width: 810, height: 50, zIndex: 3, animation: { name: 'slideInLeft', duration: 600, delay: 300 }, editable: { content: true, fontSize: { type: 'range', min: 26, max: 44 }, position: true } },
      { id: 'rl-m3', type: 'text', content: 'Cowan, N. · 2001 · 《Behavioral and Brain Sciences》 · 待读 ○', fontFamily: SANS, fontSize: 23, color: { $t: 'colors.primary' }, opacity: 0.6, x: 184, y: 672, width: 810, height: 30, zIndex: 3, editable: { content: true } },
      { id: 'rl-n4', type: 'text', content: '04', fontFamily: SERIF, fontSize: 34, fontWeight: '700', color: { $t: 'colors.accent' }, x: 110, y: 792, width: 70, height: 42, zIndex: 3 },
      { id: 'rl-t4', type: 'text', content: '生成效应对长期记忆保持的影响', fontFamily: { $t: 'fonts.heading' }, fontSize: 36, fontWeight: '700', color: { $t: 'colors.primary' }, x: 182, y: 794, width: 810, height: 50, zIndex: 3, animation: { name: 'slideInLeft', duration: 600, delay: 450 }, editable: { content: true, fontSize: { type: 'range', min: 26, max: 44 }, position: true } },
      { id: 'rl-m4', type: 'text', content: 'Slamecka & McElree · 1983 · 《JEP: Human Learning》 · 已摘录 ✎', fontFamily: SANS, fontSize: 23, color: { $t: 'colors.primary' }, opacity: 0.6, x: 184, y: 850, width: 810, height: 30, zIndex: 3, editable: { content: true } },
      { id: 'rl-n5', type: 'text', content: '05', fontFamily: SERIF, fontSize: 34, fontWeight: '700', color: { $t: 'colors.accent' }, x: 110, y: 970, width: 70, height: 42, zIndex: 3 },
      { id: 'rl-t5', type: 'text', content: '间隔重复与记忆巩固的神经机制', fontFamily: { $t: 'fonts.heading' }, fontSize: 36, fontWeight: '700', color: { $t: 'colors.primary' }, x: 182, y: 972, width: 810, height: 50, zIndex: 3, animation: { name: 'slideInLeft', duration: 600, delay: 600 }, editable: { content: true, fontSize: { type: 'range', min: 26, max: 44 }, position: true } },
      { id: 'rl-m5', type: 'text', content: 'Gontavies et al. · 2025 · 《Nature Neuroscience》 · 重点 ★★★', fontFamily: SANS, fontSize: 23, color: { $t: 'colors.primary' }, opacity: 0.6, x: 184, y: 1028, width: 810, height: 30, zIndex: 3, editable: { content: true } },
      { id: 'rl-foot-rule', type: 'shape', shapeKind: 'line', x: 84, y: 1176, width: 912, height: 2, fill: { $t: 'colors.primary' }, opacity: 0.35, zIndex: 2 },
      { id: 'rl-foot', type: 'text', content: '— 本单终 · 尚余 8 篇待归档 —', fontFamily: SONG, fontSize: 26, color: { $t: 'colors.accent' }, textAlign: 'center', letterSpacing: 3, x: 240, y: 1206, width: 600, height: 36, zIndex: 2, animation: { name: 'fadeIn', duration: 700, delay: 700 }, editable: { content: true } }
    ]
  },
  // 7. 学术会议海报页（9:16）
  {
    id: 'acad-conference', name: '学术会议海报页', version: '1.0.0', category: 'academic',
    tags: ['academic', 'conference', 'poster', 'symposium', '9:16'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="90" height="160" viewBox="0 0 90 160"><rect width="90" height="160" fill="%23f4f6fa"/><rect width="90" height="52" fill="%230f172a"/><rect x="10" y="14" width="70" height="7" fill="%23ffffff"/><rect x="10" y="27" width="48" height="4" fill="%232563eb"/><rect x="10" y="70" width="70" height="18" fill="none" stroke="%232563eb" stroke-width="2"/><rect x="10" y="96" width="70" height="18" fill="none" stroke="%230f172a" stroke-width="1.5"/></svg>',
    tokens: {
      colors: ACADEM_COLORS(['底色', '主色', '强调'], ['#F4F6FA', '#0F172A', '#2563EB'],
        [['#F4F6FA', '#FDFCF8', '#F2F5F0', '#F5F0EA'], ['#0F172A', '#1E3A5F', '#14231B', '#292524'], ['#2563EB', '#0F5132', '#B08D3E', '#7C2D12']]),
      fonts: { heading: { label: '标题字体', default: SONG, options: [SONG, SERIF, 'STZhongsong, SimSun, serif'] } }
    },
    presets: [
      { name: '学院藏蓝', colors: { bg: '#F4F6FA', primary: '#0F172A', accent: '#2563EB' } },
      { name: '常春藤绿', colors: { bg: '#F2F5F0', primary: '#14231B', accent: '#0F5132' } },
      { name: '金色校庆', colors: { bg: '#FDFCF8', primary: '#1E3A5F', accent: '#B08D3E' } },
      { name: '砖红学术', colors: { bg: '#F5F0EA', primary: '#292524', accent: '#7C2D12' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1920, defaultWidth: 1080, defaultHeight: 1920, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'cf-band', type: 'shape', shapeKind: 'rect', x: 0, y: 0, width: 1080, height: 452, fill: { $t: 'colors.primary' }, zIndex: 1 },
      { id: 'cf-band-rule', type: 'shape', shapeKind: 'line', x: 0, y: 452, width: 1080, height: 8, fill: { $t: 'colors.accent' }, zIndex: 2 },
      { id: 'cf-kicker', type: 'text', content: 'ICAI 2026 · THE 9th ANNUAL CONFERENCE', fontFamily: MONO, fontSize: 22, fontWeight: '600', color: { $t: 'colors.accent' }, letterSpacing: 5, textAlign: 'center', x: 90, y: 66, width: 900, height: 32, zIndex: 3, animation: { name: 'fadeIn', duration: 700 } },
      { id: 'cf-title', type: 'text', content: '第九届人工智能前沿\n学术研讨会', fontFamily: { $t: 'fonts.heading' }, fontSize: 84, fontWeight: '900', color: { $t: 'colors.bg' }, textAlign: 'center', lineHeight: 1.36, x: 90, y: 118, width: 900, height: 240, zIndex: 3, animation: { name: 'fadeInUp', duration: 900 }, editable: { content: true, fontSize: { type: 'range', min: 56, max: 104 }, position: true } },
      { id: 'cf-title-en', type: 'text', content: 'Frontiers in Artificial Intelligence Symposium', fontFamily: SERIF, fontSize: 30, color: { $t: 'colors.bg' }, opacity: 0.75, textAlign: 'center', letterSpacing: 2, x: 90, y: 372, width: 900, height: 36, zIndex: 3, editable: { content: true } },
      { id: 'cf-when', type: 'text', content: '2026 年 10 月 23—25 日　·　杭州 · 紫金港学术交流中心', fontFamily: SONG, fontSize: 36, fontWeight: '700', color: { $t: 'colors.primary' }, textAlign: 'center', x: 90, y: 496, width: 900, height: 44, zIndex: 3, animation: { name: 'fadeIn', duration: 700, delay: 300 }, editable: { content: true } },
      { id: 'cf-deadline', type: 'text', content: '摘要投稿截止：2026-08-31　｜　录用通知：2026-09-20', fontFamily: MONO, fontSize: 22, color: { $t: 'colors.accent' }, textAlign: 'center', x: 90, y: 548, width: 900, height: 32, zIndex: 3, editable: { content: true } },
      { id: 'cf-track-label', type: 'text', content: '分会场 TRACKS', fontFamily: SANS, fontSize: 22, fontWeight: '800', color: { $t: 'colors.primary' }, letterSpacing: 6, x: 84, y: 636, width: 400, height: 28, zIndex: 3 },
      { id: 'cf-tr1', group: 'cf-tr', type: 'shape', shapeKind: 'rect', x: 84, y: 678, width: 912, height: 92, fill: 'rgba(0,0,0,0)', border: { color: { $t: 'colors.accent' } as any, width: 2.5, style: 'solid' as const }, borderRadius: 14, zIndex: 2 },
      { id: 'cf-tr1-t', type: 'text', content: 'A　大模型对齐与安全 · 召集人 周衡', fontFamily: SONG, fontSize: 30, fontWeight: '700', color: { $t: 'colors.primary' }, x: 116, y: 706, width: 860, height: 40, zIndex: 3, animation: { name: 'slideInLeft', duration: 600 }, editable: { content: true } },
      { id: 'cf-tr2', group: 'cf-tr', type: 'shape', shapeKind: 'rect', x: 84, y: 790, width: 912, height: 92, fill: 'rgba(0,0,0,0)', border: { color: { $t: 'colors.primary' } as any, width: 1.5, style: 'solid' as const }, borderRadius: 14, opacity: 0.85, zIndex: 2 },
      { id: 'cf-tr2-t', type: 'text', content: 'B　具身智能与人机交互 · 召集人 吴岭', fontFamily: SONG, fontSize: 30, fontWeight: '700', color: { $t: 'colors.primary' }, x: 116, y: 818, width: 860, height: 40, zIndex: 3, animation: { name: 'slideInLeft', duration: 600, delay: 150 }, editable: { content: true } },
      { id: 'cf-tr3', group: 'cf-tr', type: 'shape', shapeKind: 'rect', x: 84, y: 902, width: 912, height: 92, fill: 'rgba(0,0,0,0)', border: { color: { $t: 'colors.primary' } as any, width: 1.5, style: 'solid' as const }, borderRadius: 14, opacity: 0.85, zIndex: 2 },
      { id: 'cf-tr3-t', type: 'text', content: 'C　AI for Science：方法与边界 · 召集人 郑棠', fontFamily: SONG, fontSize: 30, fontWeight: '700', color: { $t: 'colors.primary' }, x: 116, y: 930, width: 860, height: 40, zIndex: 3, animation: { name: 'slideInLeft', duration: 600, delay: 300 }, editable: { content: true } },
      { id: 'cf-key-label', type: 'text', content: '特邀报告 KEYNOTE', fontFamily: SANS, fontSize: 22, fontWeight: '800', color: { $t: 'colors.primary' }, letterSpacing: 6, x: 84, y: 1058, width: 400, height: 28, zIndex: 3 },
      { id: 'cf-av1', group: 'cf-av', type: 'image', src: '/images/photo/scholar-a-200x200.jpg', objectFit: 'cover', x: 84, y: 1102, width: 150, height: 150, zIndex: 3, editable: { src: { type: 'upload' }, position: true } },
      { id: 'cf-av2', group: 'cf-av', type: 'image', src: '/images/photo/scholar-b-200x200.jpg', objectFit: 'cover', x: 258, y: 1102, width: 150, height: 150, zIndex: 3, editable: { src: { type: 'upload' }, position: true } },
      { id: 'cf-av3', group: 'cf-av', type: 'image', src: '/images/photo/scholar-c-200x200.jpg', objectFit: 'cover', x: 432, y: 1102, width: 150, height: 150, zIndex: 3, editable: { src: { type: 'upload' }, position: true } },
      { id: 'cf-kn-txt', type: 'text', content: '三位讲者围绕「可信推理」「世界模型」\n「科学发现的自动化」发表主题报告，\n会后设 30 分钟圆桌问答。', fontFamily: SONG, fontSize: 22, color: { $t: 'colors.primary' }, opacity: 0.75, lineHeight: 1.7, x: 620, y: 1108, width: 380, height: 220, zIndex: 3, editable: { content: true } },
      { id: 'cf-sch-line', type: 'shape', shapeKind: 'rect', x: 120, y: 1360, width: 3, height: 330, fill: { $t: 'colors.accent' }, opacity: 0.6, zIndex: 2 },
      { id: 'cf-dot1', group: 'cf-dot', type: 'shape', shapeKind: 'circle', x: 109, y: 1372, width: 25, height: 25, fill: { $t: 'colors.accent' }, zIndex: 3 },
      { id: 'cf-dot2', group: 'cf-dot', type: 'shape', shapeKind: 'circle', x: 109, y: 1512, width: 25, height: 25, fill: { $t: 'colors.primary' }, opacity: 0.7, zIndex: 3 },
      { id: 'cf-dot3', group: 'cf-dot', type: 'shape', shapeKind: 'circle', x: 109, y: 1652, width: 25, height: 25, fill: { $t: 'colors.primary' }, opacity: 0.7, zIndex: 3 },
      { id: 'cf-sched', type: 'text', content: '10.23 AM　开幕主旨 · 主会场\n10.24 PM　三分会场并行 · A/B/C\n10.25 PM　闭幕圆桌 · 最佳论文发布', fontFamily: SONG, fontSize: 30, color: { $t: 'colors.primary' }, lineHeight: 1.9, x: 168, y: 1358, width: 520, height: 330, zIndex: 3, animation: { name: 'fadeInUp', duration: 800, delay: 400 }, editable: { content: true, position: true } },
      { id: 'cf-qr', type: 'image', src: qrBlock(170, 170, 10, '%230F172A', 21), x: 830, y: 1372, width: 170, height: 170, zIndex: 3 },
      { id: 'cf-qr-t', type: 'text', content: '扫码提交摘要', fontFamily: SANS, fontSize: 22, color: { $t: 'colors.primary' }, opacity: 0.7, textAlign: 'center', x: 810, y: 1552, width: 210, height: 28, zIndex: 3, editable: { content: true } },
      { id: 'cf-foot', type: 'shape', shapeKind: 'rect', x: 0, y: 1832, width: 1080, height: 88, fill: { $t: 'colors.primary' }, zIndex: 2 },
      { id: 'cf-host', type: 'text', content: '主办单位：XX 大学计算机学院 · 协办：中国人工智能学会', fontFamily: SANS, fontSize: 22, color: { $t: 'colors.bg' }, opacity: 0.9, textAlign: 'center', letterSpacing: 2, x: 90, y: 1858, width: 900, height: 30, zIndex: 3, editable: { content: true } }
    ]
  },
  // 8. 毕业纪念卡（1:1）
  {
    id: 'acad-graduation', name: '毕业纪念卡', version: '1.0.0', category: 'academic',
    tags: ['academic', 'graduation', 'ceremony', 'commencement', '1:1'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23fcf8ee"/><polygon points="50,22 72,32 50,42 28,32" fill="%231e3a5f"/><rect x="30" y="52" width="40" height="5" fill="%23b08d3e"/><rect x="36" y="63" width="28" height="4" fill="%231e3a5f"/></svg>',
    tokens: {
      colors: ACADEM_COLORS(['卡面', '主色', '绶金'], ['#FCF8EE', '#1E3A5F', '#B08D3E'],
        [['#FCF8EE', '#FDFCF8', '#F2F5F0', '#F8F2F2'], ['#1E3A5F', '#14231B', '#2A1215', '#111827'], ['#B08D3E', '#C9A227', '#0F5132', '#991B1B', '#57534E']]),
      fonts: { heading: { label: '标题字体', default: SERIF, options: [SERIF, SONG, 'Georgia, serif'] } }
    },
    presets: [
      { name: '藏蓝绶金', colors: { bg: '#FCF8EE', primary: '#1E3A5F', accent: '#B08D3E' } },
      { name: '墨绿桂金', colors: { bg: '#F2F5F0', primary: '#14231B', accent: '#C9A227' } },
      { name: '绛红博士', colors: { bg: '#F8F2F2', primary: '#2A1215', accent: '#991B1B' } },
      { name: '黑白典藏', colors: { bg: '#FDFCF8', primary: '#111827', accent: '#57534E' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1080, defaultWidth: 1080, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'gr-frame', type: 'shape', shapeKind: 'rect', x: 40, y: 40, width: 1000, height: 1000, fill: 'rgba(0,0,0,0)', border: { color: { $t: 'colors.primary' } as any, width: 3, style: 'solid' as const }, opacity: 0.9, zIndex: 1 },
      { id: 'gr-frame2', type: 'shape', shapeKind: 'rect', x: 54, y: 54, width: 972, height: 972, fill: 'rgba(0,0,0,0)', border: { color: { $t: 'colors.accent' } as any, width: 1.5, style: 'solid' as const }, opacity: 0.6, zIndex: 1 },
      { id: 'gr-ring1', type: 'shape', shapeKind: 'circle', x: 370, y: 96, width: 340, height: 340, fill: 'rgba(0,0,0,0)', border: { color: { $t: 'colors.accent' } as any, width: 2, style: 'solid' as const }, opacity: 0.4, zIndex: 1 },
      { id: 'gr-cap', type: 'image', src: CAP, x: 405, y: 128, width: 270, height: 196, zIndex: 3, animation: { name: 'float', duration: 3200, iterationCount: 'infinite' } },
      { id: 'gr-congr', type: 'text', content: 'CONGRATULATIONS', fontFamily: { $t: 'fonts.heading' }, fontSize: 34, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 14, textAlign: 'center', x: 190, y: 372, width: 700, height: 44, zIndex: 3, animation: { name: 'fadeIn', duration: 800, delay: 250 }, editable: { content: true } },
      { id: 'gr-class', type: 'text', content: '2026 届 · 毕业典礼纪念', fontFamily: SONG, fontSize: 30, color: { $t: 'colors.primary' }, opacity: 0.75, letterSpacing: 6, textAlign: 'center', x: 290, y: 428, width: 500, height: 40, zIndex: 3, editable: { content: true } },
      { id: 'gr-name', type: 'text', content: '林知远', fontFamily: SONG, fontSize: 110, fontWeight: '900', color: { $t: 'colors.primary' }, letterSpacing: 16, textAlign: 'center', x: 190, y: 500, width: 700, height: 150, zIndex: 3, animation: { name: 'inkReveal', duration: 1200 }, editable: { content: true, fontSize: { type: 'range', min: 70, max: 140 }, position: true } },
      { id: 'gr-degree', type: 'text', content: '获授 工学博士 学位', fontFamily: SONG, fontSize: 34, fontWeight: '700', color: { $t: 'colors.primary' }, opacity: 0.85, textAlign: 'center', letterSpacing: 4, x: 290, y: 668, width: 500, height: 44, zIndex: 3, editable: { content: true } },
      { id: 'gr-ribbon', type: 'shape', shapeKind: 'rect', x: 210, y: 768, width: 660, height: 54, fill: { $t: 'colors.accent' }, zIndex: 2, animation: { name: 'zoomIn', duration: 600, delay: 500 } },
      { id: 'gr-ribbon-l', type: 'text', content: 'PROFECTIO · 前程似锦 · PROFECTIO', fontFamily: SERIF, fontSize: 25, fontWeight: '700', color: { $t: 'colors.bg' }, letterSpacing: 5, textAlign: 'center', x: 210, y: 780, width: 660, height: 32, zIndex: 3, editable: { content: true } },
      { id: 'gr-rib-l1', type: 'shape', shapeKind: 'rect', x: 156, y: 768, width: 54, height: 54, fill: { $t: 'colors.accent' }, rotation: 45, zIndex: 1 },
      { id: 'gr-rib-r1', type: 'shape', shapeKind: 'rect', x: 870, y: 768, width: 54, height: 54, fill: { $t: 'colors.accent' }, rotation: 45, zIndex: 1 },
      { id: 'gr-motto', type: 'text', content: '「 求知若饥 · 虚心若愚 」', fontFamily: { $t: 'fonts.heading' }, fontSize: 40, color: { $t: 'colors.primary' }, textAlign: 'center', letterSpacing: 4, x: 240, y: 872, width: 600, height: 56, zIndex: 3, animation: { name: 'fadeInUp', duration: 800, delay: 650 }, editable: { content: true, fontSize: { type: 'range', min: 28, max: 54 } } },
      { id: 'gr-date', type: 'text', content: '2026 年 6 月 28 日 · 大礼堂', fontFamily: MONO, fontSize: 24, color: { $t: 'colors.accent' }, letterSpacing: 3, textAlign: 'center', x: 340, y: 948, width: 400, height: 32, zIndex: 3, editable: { content: true } },
      { id: 'gr-seal', type: 'shape', shapeKind: 'circle', x: 856, y: 896, width: 110, height: 110, fill: 'rgba(0,0,0,0)', border: { color: { $t: 'colors.primary' } as any, width: 3, style: 'solid' as const }, opacity: 0.65, zIndex: 2 },
      { id: 'gr-seal-t', type: 'text', content: '校\n长\n印', fontFamily: SONG, fontSize: 26, fontWeight: '700', color: { $t: 'colors.primary' }, opacity: 0.7, textAlign: 'center', lineHeight: 1.25, x: 886, y: 912, width: 52, height: 80, zIndex: 3 }
    ]
  },
  // 9. 数据图表卡（16:9）
  {
    id: 'acad-data-figure', name: '数据图表卡', version: '1.0.0', category: 'academic',
    tags: ['academic', 'chart', 'data', 'figure', '16:9'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="90" viewBox="0 0 160 90"><rect width="160" height="90" fill="%23fcfcfd"/><rect x="20" y="14" width="90" height="6" fill="%23111827"/><path d="M24 74V26M24 74h112" stroke="%23111827" stroke-width="2" fill="none"/><polyline points="30,62 48,44 66,52 86,30 106,38" fill="none" stroke="%23dc2626" stroke-width="3"/><rect x="120" y="46" width="8" height="28" fill="%23dc2626"/><rect x="132" y="36" width="8" height="38" fill="%23111827"/></svg>',
    tokens: {
      colors: ACADEM_COLORS(['纸白', '坐标墨', '数据色'], ['#FCFCFD', '#111827', '#DC2626'],
        [['#FCFCFD', '#F7F9FB', '#FBF9F2', '#F4F6FA'], ['#111827', '#1F2937', '#0F172A', '#292524', '#14231B'], ['#DC2626', '#1D4ED8', '#0F5132', '#B45309']]),
      fonts: { heading: { label: '标题字体', default: SANS, options: [SANS, SERIF, SONG] } }
    },
    presets: [
      { name: '顶刊红', colors: { bg: '#FCFCFD', primary: '#111827', accent: '#DC2626' } },
      { name: '评审蓝', colors: { bg: '#F7F9FB', primary: '#0F172A', accent: '#1D4ED8' } },
      { name: '生态绿', colors: { bg: '#FBF9F2', primary: '#14231B', accent: '#0F5132' } },
      { name: '琥珀暖调', colors: { bg: '#F4F6FA', primary: '#292524', accent: '#B45309' } }
    ],
    canvas: { virtualWidth: 1920, virtualHeight: 1080, defaultWidth: 1920, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'df-title', type: 'text', content: '消融实验：各模块对下游任务准确率的贡献', fontFamily: { $t: 'fonts.heading' }, fontSize: 44, fontWeight: '800', color: { $t: 'colors.primary' }, x: 120, y: 60, width: 1500, height: 60, zIndex: 3, animation: { name: 'fadeInDown', duration: 700 }, editable: { content: true, fontSize: { type: 'range', min: 30, max: 58 }, position: true } },
      { id: 'df-sub', type: 'text', content: 'n = 5 seeds · error bars = ±1σ · higher is better', fontFamily: MONO, fontSize: 22, color: { $t: 'colors.accent' }, letterSpacing: 2, x: 122, y: 124, width: 900, height: 28, zIndex: 3, editable: { content: true } },
      { id: 'df-axis-y', type: 'shape', shapeKind: 'rect', x: 198, y: 198, width: 3.5, height: 642, fill: { $t: 'colors.primary' }, zIndex: 2 },
      { id: 'df-axis-x', type: 'shape', shapeKind: 'rect', x: 198, y: 838, width: 1010, height: 3.5, fill: { $t: 'colors.primary' }, zIndex: 2 },
      ...Array.from({ length: 4 }, (_, i) => ({ id: `df-grid-${i}`, type: 'shape' as const, shapeKind: 'rect' as const, x: 202, y: 262 + i * 144, width: 1002, height: 1.5, fill: { $t: 'colors.primary' } as any, opacity: 0.1, group: 'grid', zIndex: 1 })),
      { id: 'df-ylabels', type: 'text', content: '90\n80\n70\n60\n50', fontFamily: MONO, fontSize: 21, color: { $t: 'colors.primary' }, opacity: 0.65, textAlign: 'right', lineHeight: 1.85, x: 96, y: 226, width: 84, height: 610, zIndex: 3 },
      { id: 'df-line', type: 'image', src: lineChart(980, 560, '%23DC2626', 88), x: 214, y: 254, width: 980, height: 560, zIndex: 2, animation: { name: 'fadeIn', duration: 900, delay: 250 } },
      { id: 'df-leg1', type: 'shape', shapeKind: 'circle', x: 250, y: 236, width: 18, height: 18, fill: '#DC2626', zIndex: 3 },
      { id: 'df-leg1-t', type: 'text', content: '本方法 Ours', fontFamily: SANS, fontSize: 22, color: { $t: 'colors.primary' }, x: 278, y: 231, width: 220, height: 28, zIndex: 3, editable: { content: true } },
      { id: 'df-leg2', type: 'shape', shapeKind: 'circle', x: 500, y: 236, width: 18, height: 18, fill: { $t: 'colors.primary' }, opacity: 0.35, zIndex: 3 },
      { id: 'df-leg2-t', type: 'text', content: '基线 Baseline', fontFamily: SANS, fontSize: 22, color: { $t: 'colors.primary' }, opacity: 0.7, x: 528, y: 231, width: 220, height: 28, zIndex: 3, editable: { content: true } },
      ...['w/o 对齐', '+检索', '+CoT', '+集成', '完整体'].map((s, i) => ({ id: `df-xlab-${i}`, type: 'text' as const, content: s, fontFamily: SONG as any, fontSize: 22, color: { $t: 'colors.primary' } as any, opacity: 0.7, textAlign: 'center' as const, x: 240 + i * 195, y: 856, width: 160, height: 28, zIndex: 3 })),
      { id: 'df-bars', type: 'image', src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="380" height="620" viewBox="0 0 380 620"><rect x="18" y="300" width="52" height="320" fill="%23111827" opacity="0.25"/><rect x="92" y="240" width="52" height="380" fill="%23111827" opacity="0.38"/><rect x="166" y="170" width="52" height="450" fill="%23111827" opacity="0.5"/><rect x="240" y="110" width="52" height="510" fill="%23111827" opacity="0.65"/><rect x="314" y="52" width="52" height="568" fill="%23DC2626"/></svg>', x: 1350, y: 226, width: 400, height: 640, zIndex: 2, animation: { name: 'fadeInUp', duration: 800, delay: 400 } },
      { id: 'df-bars-cap', type: 'text', content: '训练步数预算（×1e4）→', fontFamily: MONO, fontSize: 20, color: { $t: 'colors.primary' }, opacity: 0.55, x: 1350, y: 880, width: 400, height: 26, zIndex: 3 },
      { id: 'df-fig', type: 'text', content: 'Fig. 3　本方法在全部配置下均显著优于基线（p < 0.01），完整体较基线提升 21.4 个百分点。', fontFamily: SERIF, fontSize: 26, color: { $t: 'colors.primary' }, opacity: 0.8, x: 120, y: 950, width: 1680, height: 40, zIndex: 3, editable: { content: true, position: true } }
    ]
  },
  // 10. 著作引书卡（4:5）
  {
    id: 'acad-book-citation', name: '著作引书卡', version: '1.0.0', category: 'academic',
    tags: ['academic', 'book', 'citation', 'library', '4:5'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="125" viewBox="0 0 100 125"><rect width="100" height="125" fill="%23f2efe9"/><rect x="14" y="14" width="72" height="50" fill="%23fbf7ec" stroke="%2326221c" stroke-width="1.5"/><rect x="22" y="24" width="44" height="5" fill="%2326221c"/><rect x="22" y="34" width="30" height="3" fill="%237f1d1d"/><rect x="14" y="80" width="10" height="28" fill="%237f1d1d"/><rect x="27" y="76" width="9" height="32" fill="%2326221c"/><rect x="39" y="82" width="11" height="26" fill="%23b45309"/></svg>',
    tokens: {
      colors: {
        ...ACADEM_COLORS(['卡纸', '墨色', '书脊'], ['#F2EFE9', '#26221C', '#7F1D1D'],
          [['#F2EFE9', '#FAF7F0', '#F2F5F0', '#EEF2F7'], ['#26221C', '#1F2937', '#14231B', '#1E3A5F', '#351C15'], ['#7F1D1D', '#0F5132', '#B45309', '#1D4ED8']]),
        paper: { label: '封面纸', default: '#FBF7EC', options: ['#FBF7EC', '#F3F7F1', '#F7EFDD', '#EDF2F9'] }
      },
      fonts: { heading: { label: '书名字体', default: SONG, options: [SONG, SERIF, 'STZhongsong, SimSun, serif'] } }
    },
    presets: [
      { name: '酒红书房', colors: { bg: '#F2EFE9', primary: '#26221C', accent: '#7F1D1D', paper: '#FBF7EC' } },
      { name: '松绿藏书', colors: { bg: '#F2F5F0', primary: '#14231B', accent: '#0F5132', paper: '#F3F7F1' } },
      { name: '赭黄旧书', colors: { bg: '#FAF7F0', primary: '#351C15', accent: '#B45309', paper: '#F7EFDD' } },
      { name: '藏蓝馆际', colors: { bg: '#EEF2F7', primary: '#1E3A5F', accent: '#1D4ED8', paper: '#EDF2F9' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'bc-ghost', type: 'text', content: '「', fontFamily: SONG, fontSize: 420, fontWeight: '900', color: { $t: 'colors.primary' }, opacity: 0.06, x: 560, y: 30, width: 480, height: 460, zIndex: 0 },
      { id: 'bc-head', type: 'text', content: '书目卡 · CATALOG CARD Nº 047', fontFamily: MONO, fontSize: 24, fontWeight: '600', color: { $t: 'colors.accent' }, letterSpacing: 4, x: 90, y: 70, width: 700, height: 32, zIndex: 3, animation: { name: 'fadeIn', duration: 600 }, editable: { content: true } },
      { id: 'bc-head-rule', type: 'shape', shapeKind: 'line', x: 90, y: 112, width: 900, height: 2, fill: { $t: 'colors.primary' }, opacity: 0.55, zIndex: 2 },
      { id: 'bc-cover-shadow', type: 'shape', shapeKind: 'rect', x: 102, y: 166, width: 880, height: 500, fill: 'rgba(38,34,28,0.18)', borderRadius: 6, zIndex: 1 },
      { id: 'bc-cover', type: 'shape', shapeKind: 'rect', x: 90, y: 150, width: 880, height: 500, fill: { $t: 'colors.paper' }, border: { color: { $t: 'colors.primary' } as any, width: 2.5, style: 'solid' as const }, borderRadius: 6, zIndex: 2, animation: { name: 'zoomIn', duration: 700 } },
      { id: 'bc-spine', type: 'shape', shapeKind: 'rect', x: 90, y: 150, width: 46, height: 500, fill: { $t: 'colors.accent' }, borderRadius: 6, zIndex: 3 },
      { id: 'bc-frame', type: 'shape', shapeKind: 'rect', x: 168, y: 190, width: 756, height: 420, fill: 'rgba(0,0,0,0)', border: { color: { $t: 'colors.primary' } as any, width: 1.5, style: 'solid' as const }, opacity: 0.4, zIndex: 3 },
      { id: 'bc-class', type: 'text', content: 'N82 · 艺术理论', fontFamily: MONO, fontSize: 20, color: { $t: 'colors.primary' }, opacity: 0.6, x: 190, y: 212, width: 300, height: 28, zIndex: 4, editable: { content: true } },
      { id: 'bc-title', type: 'text', content: '观看之道\nWays of Seeing', fontFamily: { $t: 'fonts.heading' }, fontSize: 74, fontWeight: '900', color: { $t: 'colors.primary' }, lineHeight: 1.3, x: 190, y: 272, width: 720, height: 210, zIndex: 4, animation: { name: 'inkReveal', duration: 1100 }, editable: { content: true, fontSize: { type: 'range', min: 52, max: 96 }, position: true } },
      { id: 'bc-author', type: 'text', content: '[英] 约翰·伯格 著　·　戴行钺 译', fontFamily: SONG, fontSize: 28, color: { $t: 'colors.primary' }, opacity: 0.75, x: 192, y: 492, width: 700, height: 38, zIndex: 4, editable: { content: true } },
      { id: 'bc-pub', type: 'text', content: '广西师范大学出版社 · 2015 年版 · 精装', fontFamily: SANS, fontSize: 20, color: { $t: 'colors.accent' }, x: 192, y: 536, width: 700, height: 30, zIndex: 4, editable: { content: true } },
      { id: 'bc-quote', type: 'text', content: '「我们从未真正观看过一件艺术品；观看的是我们赋予它的意义。」', fontFamily: SONG, fontSize: 32, color: { $t: 'colors.primary' }, opacity: 0.9, lineHeight: 1.6, x: 128, y: 706, width: 830, height: 104, zIndex: 3, animation: { name: 'fadeInUp', duration: 800, delay: 300 }, editable: { content: true, fontSize: { type: 'range', min: 22, max: 40 }, position: true } },
      { id: 'bc-cite-bar', type: 'shape', shapeKind: 'rect', x: 90, y: 846, width: 5, height: 92, fill: { $t: 'colors.accent' }, zIndex: 3 },
      { id: 'bc-cite', type: 'text', content: 'Berger, J. (2015). Ways of Seeing (1st ed., p. 8). Guangxi Normal University Press.', fontFamily: MONO, fontSize: 20, color: { $t: 'colors.primary' }, opacity: 0.7, lineHeight: 1.55, x: 112, y: 850, width: 870, height: 84, zIndex: 3, editable: { content: true } },
      { id: 'bc-shelf-base', type: 'shape', shapeKind: 'rect', x: 60, y: 1194, width: 960, height: 10, fill: { $t: 'colors.primary' }, opacity: 0.7, zIndex: 4 },
      ...Array.from({ length: 6 }, (_, i) => ({ id: `bc-spine-${i}`, type: 'shape' as const, shapeKind: 'rect' as const, x: 90 + i * 92, y: 1194 - (150 + (i * 53) % 90), width: 66 + (i * 17) % 26, height: 150 + (i * 53) % 90, fill: i % 2 === 0 ? { $t: 'colors.accent' } : { $t: 'colors.primary' }, opacity: 0.88 - (i % 3) * 0.12, borderRadius: 3, group: 'spine', zIndex: 3 })),
      ...Array.from({ length: 6 }, (_, i) => ({ id: `bc-band-${i}`, type: 'shape' as const, shapeKind: 'rect' as const, x: 90 + i * 92, y: 1194 - (150 + (i * 53) % 90) + 26, width: 66 + (i * 17) % 26, height: 7, fill: { $t: 'colors.paper' } as any, opacity: 0.85, group: 'spine', zIndex: 4 })),
      { id: 'bc-isbn', type: 'image', src: barcode(300, 54, '%2326221C', 33), x: 700, y: 1226, width: 300, height: 54, zIndex: 4 },
      { id: 'bc-isbn-t', type: 'text', content: 'ISBN 978-7-5495-6627-1', fontFamily: MONO, fontSize: 20, color: { $t: 'colors.primary' }, opacity: 0.6, x: 90, y: 1240, width: 460, height: 28, zIndex: 4, editable: { content: true } },
      { id: 'bc-callno-box', type: 'shape', shapeKind: 'rect', x: 828, y: 106, width: 162, height: 54, fill: '#FFFFFF', border: { color: { $t: 'colors.primary' } as any, width: 1.5, style: 'solid' as const }, zIndex: 2 },
      { id: 'bc-callno', type: 'text', content: 'N82\nB452', fontFamily: MONO, fontSize: 20, fontWeight: '700', color: { $t: 'colors.primary' }, textAlign: 'center', lineHeight: 1.2, x: 828, y: 110, width: 162, height: 48, zIndex: 3, editable: { content: true } }
    ]
  }
]


// src/core/templates/finance/finance-cards.ts —— 财经·理财第一批（财经自媒体向 6 个）
// 口径：不做年报/大屏，做「周复盘 / 科普 / 笔记 / 打卡」这类个人输出物；涨跌色沿用 A 股语境（红涨绿跌）；
//       图表一律 rect + circle 或内联 SVG 拼，颜色全部走 token（装饰底纹允许 rgba）；
//       所有示例数字旁边都带「仅为示例」小字，文案理性克制、留一点散户式自嘲。
// 共享文件未改：finance 大类已在 CATEGORY_REGISTRY 注册，本文件由 import.meta.glob('./templates/*/*.ts') 自动收录。
import type { CanvasElement, Template } from '@/types/types'
import { HEI, SONG, MONO, SANS, IMPACT } from '../_fx/trend'
import { dotsBg } from '../knowledge/_decor'
import { svgUri } from '../_fx/common'

/** 引用 token 的简写：动态拼 key 时需要（数组批量生成的元素用） */
const D = (k: string) => ({ $t: k }) as any

const FANG = 'STFangsong, FangSong, "FangSong SC", serif'

/** 打卡格阵缩略图：cols×rows 小格，前 done 格涂满色（供 thumbnail 用，非画布元素） */
const miniGrid = (cols: number, rows: number, cell: number, gap: number, ox: number, oy: number, done: number, hot: string, pending: string) =>
  Array.from({ length: cols * rows }, (_, i) => {
    const c = i % cols, r = Math.floor(i / cols)
    return `<rect x="${ox + c * (cell + gap)}" y="${oy + r * (cell + gap)}" width="${cell}" height="${cell}" rx="1.5" fill="${i < done ? hot : pending}"/>`
  }).join('')

export const financeTemplates: Template[] = [
  // 1. 一周市场复盘（16:9）—— 蜡烛装饰 + 本周关键词大字 + 三指数卡片行
  {
    id: 'finance-weekly-review', name: '一周市场复盘', version: '1.0.0', category: 'finance',
    tags: ['finance', 'weekly-review', 'market', 'a-share', 'index', '16:9'],
    thumbnail: svgUri('<rect width="160" height="90" fill="%2310151F"/><g fill="%23E14434" opacity="0.55"><rect x="104" y="16" width="6" height="22" rx="2"/><rect x="106.4" y="9" width="1.2" height="36"/><rect x="120" y="26" width="6" height="16" rx="2"/><rect x="122.4" y="20" width="1.2" height="28"/><rect x="136" y="12" width="6" height="26" rx="2"/><rect x="138.4" y="6" width="1.2" height="38"/></g><g fill="%2319975F" opacity="0.55"><rect x="150" y="22" width="6" height="18" rx="2"/><rect x="152.4" y="15" width="1.2" height="32"/></g><rect x="10" y="14" width="42" height="11" rx="5.5" fill="%23E14434"/><rect x="10" y="32" width="56" height="17" rx="3" fill="%23F2EFE6"/><rect x="10" y="54" width="44" height="5" rx="2.5" fill="%23F2EFE6" opacity="0.45"/><g fill="%23F2EFE6" opacity="0.1"><rect x="10" y="67" width="44" height="17" rx="3"/><rect x="58" y="67" width="44" height="17" rx="3"/><rect x="106" y="67" width="44" height="17" rx="3"/></g><g fill="%23E14434"><rect x="14" y="71" width="18" height="4" rx="2"/><rect x="110" y="71" width="18" height="4" rx="2"/></g><g fill="%2319975F"><rect x="62" y="71" width="18" height="4" rx="2"/></g>', 160, 90),
    tokens: {
      colors: {
        bg: { label: '底色', default: '#10151F', options: ['#10151F', '#F3EEE3', '#15181C', '#0E1A16'] },
        ink: { label: '主文字', default: '#F2EFE6', options: ['#F2EFE6', '#231F19', '#EAF0F4', '#E7F1EA'] },
        dim: { label: '弱文字', default: '#8B93A3', options: ['#8B93A3', '#877D6C', '#79848F', '#7F9A8D'] },
        up: { label: '涨·红', default: '#E14434', options: ['#E14434', '#C8392B', '#FF6A4D', '#F0554F'] },
        down: { label: '跌·绿', default: '#19975F', options: ['#19975F', '#2C7A5B', '#3DDC97', '#4FC793'] }
      },
      fonts: { heading: { label: '标题字体', default: HEI, options: [HEI, SONG, IMPACT] } }
    },
    presets: [
      { name: '夜盘墨蓝', colors: { bg: '#10151F', ink: '#F2EFE6', dim: '#8B93A3', up: '#E14434', down: '#19975F' } },
      { name: '晨报宣纸', colors: { bg: '#F3EEE3', ink: '#231F19', dim: '#877D6C', up: '#C8392B', down: '#2C7A5B' } },
      { name: '石墨夜签', colors: { bg: '#15181C', ink: '#EAF0F4', dim: '#79848F', up: '#FF6A4D', down: '#3DDC97' } },
      { name: '深松收盘', colors: { bg: '#0E1A16', ink: '#E7F1EA', dim: '#7F9A8D', up: '#F0554F', down: '#4FC793' } }
    ],
    canvas: { virtualWidth: 1920, virtualHeight: 1080, defaultWidth: 1920, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'wr-dots', type: 'image', src: dotsBg(1920, 1080, 64, 'rgba(127,127,127,0.13)'), x: 0, y: 0, width: 1920, height: 1080, objectFit: 'fill', zIndex: 1 },
      // 关键词区
      { id: 'wr-rule', type: 'shape', shapeKind: 'rect', x: 120, y: 88, width: 1680, height: 3, fill: D('colors.ink'), opacity: 0.26, zIndex: 3, animation: { name: 'slideInLeft', duration: 700 } },
      { id: 'wr-kicker', type: 'text', content: 'WEEKLY REVIEW · 市场周复盘 · 第 38 周', fontFamily: MONO, fontSize: 24, letterSpacing: 6, color: D('colors.dim'), x: 120, y: 118, width: 860, height: 34, zIndex: 4, editable: { content: true } },
      { id: 'wr-live', type: 'shape', shapeKind: 'circle', x: 1440, y: 128, width: 16, height: 16, fill: D('colors.up'), zIndex: 4, animation: { name: 'blink', duration: 1500, iterationCount: 'infinite' } },
      { id: 'wr-status', type: 'text', content: '已收盘 09-26', fontFamily: MONO, fontSize: 24, letterSpacing: 2, color: D('colors.ink'), opacity: 0.8, textAlign: 'right', x: 1466, y: 118, width: 334, height: 34, zIndex: 4, editable: { content: true } },
      { id: 'wr-tag', type: 'shape', shapeKind: 'rect', x: 120, y: 186, width: 320, height: 66, borderRadius: 999, fill: D('colors.up'), zIndex: 3, animation: { name: 'zoomIn', duration: 420, delay: 120 } },
      { id: 'wr-tag-t', type: 'text', content: '本周关键词', fontFamily: HEI, fontSize: 30, fontWeight: '900', color: D('colors.bg'), textAlign: 'center', x: 120, y: 200, width: 320, height: 42, zIndex: 4, editable: { content: true } },
      { id: 'wr-key', type: 'text', content: '震荡', fontFamily: { $t: 'fonts.heading' }, fontSize: 210, fontWeight: '900', letterSpacing: 6, color: D('colors.ink'), x: 120, y: 274, width: 700, height: 294, zIndex: 4, animation: { name: 'zoomIn', duration: 560 }, editable: { content: true, fontSize: { type: 'range', min: 120, max: 260 } } },
      { id: 'wr-sub', type: 'text', content: '三个指数，两种心情', fontFamily: HEI, fontSize: 44, fontWeight: '700', color: D('colors.ink'), x: 120, y: 590, width: 900, height: 62, zIndex: 4, animation: { name: 'fadeInUp', duration: 520, delay: 200 }, editable: { content: true, fontSize: { type: 'range', min: 28, max: 64 } } },
      { id: 'wr-note', type: 'text', content: '指数没脾气，账户有情绪', fontFamily: HEI, fontSize: 36, color: D('colors.dim'), x: 120, y: 662, width: 900, height: 52, zIndex: 4, editable: { content: true } },
      // 蜡烛装饰：16 根，形状拼（跟随预设换色）
      ...((() => {
        const px = [3012, 3028, 3019, 2984, 2968, 2996, 3021, 3044, 3031, 3006, 2988, 3014, 3052, 3076, 3061, 3092]
        const yy = (p: number) => 600 - (p - 2940) * 2.8
        return px.map((p, i) => {
          const o = i ? px[i - 1] : p - 12
          const up = p >= o
          const hi = Math.max(o, p) + 9 + (i % 3) * 5
          const lo = Math.min(o, p) - 9 - (i % 4) * 4
          const bt = yy(Math.max(o, p)), bb = yy(Math.min(o, p))
          const x = 1010 + i * 49
          const col = D(up ? 'colors.up' : 'colors.down')
          return [
            { id: `wr-kw-${i}`, type: 'shape', shapeKind: 'rect', x: x + 11, y: yy(hi), width: 4, height: Math.max(6, yy(lo) - yy(hi)), fill: col, opacity: 0.3, zIndex: 2 },
            { id: `wr-kb-${i}`, type: 'shape', shapeKind: 'rect', x, y: bt, width: 26, height: Math.max(12, bb - bt), borderRadius: 4, fill: col, opacity: 0.5, zIndex: 2, animation: { name: 'rise', duration: 520, delay: 200 + i * 45 } } as CanvasElement
          ]
        })
      })().flat()) as CanvasElement[],
      { id: 'wr-klabel', type: 'text', content: '日 K 走势 · 示意图', fontFamily: MONO, fontSize: 24, color: D('colors.dim'), textAlign: 'right', x: 1540, y: 636, width: 260, height: 34, zIndex: 4, editable: { content: true } },
      // 示例印章（旋转 → 不参与对齐/压字判定）
      { id: 'wr-stamp', type: 'shape', shapeKind: 'circle', x: 828, y: 196, width: 168, height: 168, border: { width: 5, style: 'solid', color: D('colors.down') }, rotation: -12, opacity: 0.85, zIndex: 5, animation: { name: 'twinkle', duration: 3200, iterationCount: 'infinite' } },
      { id: 'wr-stamp-t', type: 'text', content: '仅为示例', fontFamily: HEI, fontSize: 30, fontWeight: '700', color: D('colors.down'), textAlign: 'center', rotation: -12, x: 828, y: 260, width: 168, height: 42, zIndex: 6, editable: { content: true } },
      // 三指数卡片行
      ...([['上证指数', '3 088.42', '+1.24%', 'colors.up', '周涨 38.2 点'], ['深证成指', '10 462.18', '-0.36%', 'colors.down', '周跌 37.9 点'], ['创业板指', '2 156.04', '+2.05%', 'colors.up', '周涨 43.2 点']] as const).map((r, i) => {
        const x = 120 + i * 600
        return [
          { id: `wr-card-${i}`, type: 'shape', shapeKind: 'rect', x, y: 736, width: 480, height: 252, borderRadius: 20, fill: 'rgba(127,127,127,0.12)', border: { width: 2, style: 'solid', color: D('colors.dim') }, zIndex: 3, animation: { name: 'fadeInUp', duration: 520, delay: 120 + i * 130 } },
          { id: `wr-cname-${i}`, type: 'text', content: r[0], fontFamily: HEI, fontSize: 30, fontWeight: '700', color: D('colors.ink'), x: x + 32, y: 760, width: 300, height: 42, zIndex: 4, editable: { content: true } },
          { id: `wr-cval-${i}`, type: 'text', content: r[1], fontFamily: MONO, fontSize: 56, fontWeight: '700', color: D('colors.ink'), x: x + 32, y: 806, width: 400, height: 79, zIndex: 4, editable: { content: true, fontSize: { type: 'range', min: 34, max: 72 } } },
          { id: `wr-cchg-${i}`, type: 'text', content: r[2], fontFamily: MONO, fontSize: 36, fontWeight: '700', color: D(r[3]), x: x + 32, y: 890, width: 300, height: 51, zIndex: 4, editable: { content: true } },
          { id: `wr-carrow-${i}`, type: 'text', content: r[2].startsWith('+') ? '▲' : '▼', fontFamily: SANS, fontSize: 36, color: D(r[3]), textAlign: 'right', x: x + 348, y: 890, width: 100, height: 51, zIndex: 4 },
          { id: `wr-cnote-${i}`, type: 'text', content: `${r[4]} · 仅为示例`, fontFamily: HEI, fontSize: 24, color: D('colors.dim'), x: x + 32, y: 946, width: 380, height: 34, zIndex: 4, editable: { content: true } }
        ]
      }).flat() as CanvasElement[],
      { id: 'wr-foot', type: 'text', content: '以上数字为演示示例 · 不构成任何投资建议', fontFamily: HEI, fontSize: 24, color: D('colors.dim'), x: 120, y: 1006, width: 900, height: 34, zIndex: 4, editable: { content: true } },
      { id: 'wr-foot-r', type: 'text', content: 'FINANCE WEEKLY · VOL.38', fontFamily: MONO, fontSize: 24, letterSpacing: 2, color: D('colors.up'), textAlign: 'right', x: 1340, y: 1006, width: 460, height: 34, zIndex: 4 }
    ]
  },

  // 2. 资产配置科普图（1:1）—— 20 段拼环形 + 四笔钱分层说明行
  {
    id: 'finance-asset-allocation', name: '资产配置科普图', version: '1.0.0', category: 'finance',
    tags: ['finance', 'asset-allocation', 'chart', 'donut', '科普', '1:1'],
    thumbnail: svgUri('<rect width="100" height="100" fill="%23F5F2EA"/><g fill="none" stroke-width="9"><circle cx="33" cy="56" r="20" stroke="%23C8392B" stroke-dasharray="50 76" transform="rotate(-90 33 56)"/><circle cx="33" cy="56" r="20" stroke="%232C7A5B" stroke-dasharray="38 88" transform="rotate(54 33 56)"/><circle cx="33" cy="56" r="20" stroke="%23231F19" stroke-dasharray="25 101" opacity="0.5" transform="rotate(162 33 56)"/><circle cx="33" cy="56" r="20" stroke="%238A8478" stroke-dasharray="12 114" opacity="0.7" transform="rotate(234 33 56)"/></g><circle cx="33" cy="56" r="12" fill="%23F5F2EA"/><rect x="10" y="12" width="52" height="7" rx="2" fill="%23231F19"/><rect x="10" y="24" width="30" height="4" rx="2" fill="%23231F19" opacity="0.35"/><g fill="%23231F19" opacity="0.14"><rect x="62" y="34" width="30" height="6" rx="3"/><rect x="62" y="50" width="30" height="6" rx="3"/><rect x="62" y="66" width="30" height="6" rx="3"/></g><g><circle cx="60" cy="37" r="3" fill="%238A8478"/><circle cx="60" cy="53" r="3" fill="%232C7A5B"/><circle cx="60" cy="69" r="3" fill="%23C8392B"/></g><rect x="8" y="86" width="84" height="4" rx="2" fill="%23C8392B" opacity="0.85"/>', 100, 100),
    tokens: {
      colors: {
        bg: { label: '底色', default: '#F5F2EA', options: ['#F5F2EA', '#12161F', '#EDF1F0', '#F4EBE4'] },
        ink: { label: '主文字', default: '#231F19', options: ['#231F19', '#EEF2F7', '#17211F', '#2B2118'] },
        dim: { label: '弱文字', default: '#8A8478', options: ['#8A8478', '#7E879A', '#6E7F7C', '#8B7A6C'] },
        up: { label: '进攻·红', default: '#C8392B', options: ['#C8392B', '#FF6A4D', '#E14434', '#D0503C'] },
        down: { label: '防守·绿', default: '#2C7A5B', options: ['#2C7A5B', '#3DDC97', '#19975F', '#4FB98C'] }
      },
      fonts: { heading: { label: '标题字体', default: HEI, options: [HEI, SONG, FANG] } }
    },
    presets: [
      { name: '米纸红绿', colors: { bg: '#F5F2EA', ink: '#231F19', dim: '#8A8478', up: '#C8392B', down: '#2C7A5B' } },
      { name: '夜读墨蓝', colors: { bg: '#12161F', ink: '#EEF2F7', dim: '#7E879A', up: '#FF6A4D', down: '#3DDC97' } },
      { name: '松青账本', colors: { bg: '#EDF1F0', ink: '#17211F', dim: '#6E7F7C', up: '#E14434', down: '#19975F' } },
      { name: '暖砂笔记', colors: { bg: '#F4EBE4', ink: '#2B2118', dim: '#8B7A6C', up: '#D0503C', down: '#4FB98C' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1080, defaultWidth: 1080, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'al-rule', type: 'shape', shapeKind: 'rect', x: 72, y: 68, width: 936, height: 3, fill: D('colors.up'), zIndex: 3, animation: { name: 'slideInLeft', duration: 680 } },
      { id: 'al-kicker', type: 'text', content: 'ASSET ALLOCATION · 资产配置科普', fontFamily: MONO, fontSize: 18, letterSpacing: 5, color: D('colors.dim'), x: 72, y: 88, width: 620, height: 26, zIndex: 4, editable: { content: true } },
      { id: 'al-title', type: 'text', content: '四笔钱先分好仓', fontFamily: { $t: 'fonts.heading' }, fontSize: 88, fontWeight: '900', color: D('colors.ink'), x: 72, y: 120, width: 936, height: 124, zIndex: 4, animation: { name: 'fadeInUp', duration: 560 }, editable: { content: true, fontSize: { type: 'range', min: 52, max: 108 } } },
      { id: 'al-sub', type: 'text', content: '钱分四份，各干各的活 · 比例仅为示意', fontFamily: HEI, fontSize: 32, color: D('colors.dim'), x: 72, y: 252, width: 900, height: 45, zIndex: 4, editable: { content: true } },
      // 环形：20 段小矩形绕圈拼
      ...((() => {
        const cx = 330, cy = 650, R = 200
        const cls = (j: number) => (j < 2 ? 'colors.dim' : j < 6 ? 'colors.ink' : j < 12 ? 'colors.down' : 'colors.up')
        const op = (j: number) => (j < 2 ? 0.95 : j < 6 ? 0.5 : 0.95)
        return Array.from({ length: 20 }, (_, j) => {
          const a = j * 18 - 90, rad = (a * Math.PI) / 180
          return {
            id: `al-seg-${j}`, type: 'shape', shapeKind: 'rect',
            x: cx + R * Math.cos(rad) - 23, y: cy + R * Math.sin(rad) - 8, width: 46, height: 16, rotation: a + 90,
            fill: D(cls(j)), opacity: op(j), borderRadius: 4, zIndex: 3,
            animation: { name: 'zoomIn', duration: 420, delay: 260 + j * 40 }
          } as CanvasElement
        })
      })()) as CanvasElement[],
      { id: 'al-hub', type: 'shape', shapeKind: 'circle', x: 198, y: 518, width: 264, height: 264, fill: D('colors.bg'), opacity: 0.92, zIndex: 3 },
      { id: 'al-hero', type: 'text', content: '40%', fontFamily: MONO, fontSize: 64, fontWeight: '900', color: D('colors.up'), textAlign: 'center', x: 198, y: 596, width: 264, height: 90, zIndex: 5, animation: { name: 'zoomIn', duration: 620, delay: 1100 }, editable: { content: true, fontSize: { type: 'range', min: 40, max: 84 } } },
      { id: 'al-hero-l', type: 'text', content: '长钱占比', fontFamily: HEI, fontSize: 24, color: D('colors.dim'), textAlign: 'center', x: 198, y: 692, width: 264, height: 34, zIndex: 5, editable: { content: true } },
      { id: 'al-ring-cap', type: 'text', content: '示意比例 · 不是给你的作业', fontFamily: HEI, fontSize: 18, color: D('colors.dim'), x: 72, y: 884, width: 500, height: 26, zIndex: 4, editable: { content: true } },
      // 四笔钱说明行
      ...([['活钱', '10%', 'colors.dim', '随取随用 · 三个月开销'], ['保障', '20%', 'colors.ink', '专款专用 · 先把底兜住'], ['稳钱', '30%', 'colors.down', '求稳的一档 · 波动小'], ['长钱', '40%', 'colors.up', '五年不动 · 陪企业慢慢长']] as const).map((r, i) => {
        const y = 436 + i * 118
        return [
          { id: `al-dot-${i}`, type: 'shape', shapeKind: 'circle', x: 600, y: y + 16, width: 22, height: 22, borderRadius: 0, fill: D(r[2]), opacity: i === 1 ? 0.55 : 1, zIndex: 4, animation: { name: 'fadeIn', duration: 420, delay: 420 + i * 120 } },
          { id: `al-name-${i}`, type: 'text', content: r[0], fontFamily: { $t: 'fonts.heading' }, fontSize: 44, fontWeight: '900', color: D('colors.ink'), x: 640, y, width: 200, height: 62, zIndex: 4, editable: { content: true } },
          { id: `al-pct-${i}`, type: 'text', content: r[1], fontFamily: MONO, fontSize: 44, fontWeight: '700', color: D(r[2]), textAlign: 'right', x: 810, y: y + 4, width: 198, height: 62, zIndex: 4, animation: { name: 'slideInRight', duration: 480, delay: 480 + i * 120 }, editable: { content: true } },
          { id: `al-desc-${i}`, type: 'text', content: r[3], fontFamily: HEI, fontSize: 24, color: D('colors.dim'), x: 640, y: y + 70, width: 368, height: 34, zIndex: 4, editable: { content: true } }
        ]
      }).flat() as CanvasElement[],
      { id: 'al-div', type: 'shape', shapeKind: 'rect', x: 72, y: 918, width: 936, height: 1.5, fill: D('colors.dim'), opacity: 0.4, zIndex: 3 },
      { id: 'al-end', type: 'text', content: '先分好仓，再谈选股；比例随人生阶段调整。', fontFamily: { $t: 'fonts.heading' }, fontSize: 32, fontWeight: '700', color: D('colors.ink'), x: 72, y: 942, width: 936, height: 45, zIndex: 4, animation: { name: 'rise', duration: 560, delay: 900 }, editable: { content: true, fontSize: { type: 'range', min: 22, max: 46 } } },
      { id: 'al-foot', type: 'text', content: '比例与表述均为演示示例，不构成任何投资建议。', fontFamily: MONO, fontSize: 18, color: D('colors.dim'), x: 72, y: 1004, width: 620, height: 26, zIndex: 4, editable: { content: true } },
      { id: 'al-foot-r', type: 'text', content: '4 BUCKETS · 示意版', fontFamily: MONO, fontSize: 18, letterSpacing: 3, color: D('colors.up'), textAlign: 'right', x: 708, y: 1004, width: 300, height: 26, zIndex: 4 },
      { id: 'al-coin', type: 'shape', shapeKind: 'circle', x: 936, y: 132, width: 34, height: 34, border: { width: 3, style: 'solid', color: D('colors.up') }, zIndex: 4, animation: { name: 'float', duration: 4200, iterationCount: 'infinite' } },
      { id: 'al-coin-dot', type: 'shape', shapeKind: 'circle', x: 948, y: 144, width: 10, height: 10, fill: D('colors.up'), zIndex: 4, animation: { name: 'float', duration: 4200, iterationCount: 'infinite' } }
    ]
  },

  // 3. 复利思维卡（4:5）—— 复利曲线 + 早晚两个结果大字 + 「早开始」结论条
  {
    id: 'finance-compound-card', name: '复利思维卡', version: '1.0.0', category: 'finance',
    tags: ['finance', 'compound', 'interest', 'thinking', '4:5'],
    thumbnail: svgUri('<rect width="100" height="125" fill="%23F6F2E6"/><rect x="8" y="10" width="44" height="6" rx="2" fill="%23241F17"/><rect x="8" y="20" width="26" height="4" rx="2" fill="%23241F17" opacity="0.35"/><rect x="8" y="30" width="84" height="46" rx="4" fill="%23241F17" opacity="0.07"/><path d="M14 70 C 40 68 56 60 74 40 C 82 32 88 24 90 18" fill="none" stroke="%23B23A2B" stroke-width="3" stroke-linecap="round"/><path d="M50 70 C 62 68 74 62 84 52" fill="none" stroke="%238A8478" stroke-width="2.4" stroke-linecap="round" stroke-dasharray="5 4"/><rect x="8" y="82" width="40" height="10" rx="2" fill="%23B23A2B" opacity="0.18"/><rect x="54" y="82" width="38" height="10" rx="2" fill="%23241F17" opacity="0.08"/><rect x="8" y="98" width="84" height="12" rx="4" fill="%23B23A2B"/><rect x="14" y="102" width="40" height="4" rx="2" fill="%23F6F2E6"/>', 100, 125),
    tokens: {
      colors: {
        bg: { label: '底色', default: '#F6F2E6', options: ['#F6F2E6', '#111418', '#EDF1EC', '#1A1524'] },
        ink: { label: '主文字', default: '#241F17', options: ['#241F17', '#EAF0F6', '#1B241E', '#EFE7F8'] },
        dim: { label: '弱文字', default: '#8A8478', options: ['#8A8478', '#7C8794', '#6F7F73', '#9A8CAE'] },
        early: { label: '早开始', default: '#B23A2B', options: ['#B23A2B', '#FF6A4D', '#C2410C', '#E14434'] },
        late: { label: '晚开始', default: '#5F6B78', options: ['#5F6B78', '#9AA6B2', '#8A7B6C', '#8C7BA6'] }
      },
      fonts: { heading: { label: '标题字体', default: HEI, options: [HEI, SONG, FANG] } }
    },
    presets: [
      { name: '米纸暖棕', colors: { bg: '#F6F2E6', ink: '#241F17', dim: '#8A8478', early: '#B23A2B', late: '#5F6B78' } },
      { name: '夜读冷灰', colors: { bg: '#111418', ink: '#EAF0F6', dim: '#7C8794', early: '#FF6A4D', late: '#9AA6B2' } },
      { name: '松绿手帐', colors: { bg: '#EDF1EC', ink: '#1B241E', dim: '#6F7F73', early: '#C2410C', late: '#5F6B78' } },
      { name: '紫夜台灯', colors: { bg: '#1A1524', ink: '#EFE7F8', dim: '#9A8CAE', early: '#E14434', late: '#8C7BA6' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'cp-kicker', type: 'text', content: 'COMPOUND THINKING · 复利思维卡', fontFamily: MONO, fontSize: 20, letterSpacing: 5, color: D('colors.dim'), x: 72, y: 84, width: 620, height: 28, zIndex: 4, editable: { content: true } },
      { id: 'cp-title', type: 'text', content: '早十年和晚十年', fontFamily: { $t: 'fonts.heading' }, fontSize: 64, fontWeight: '900', color: D('colors.ink'), x: 72, y: 124, width: 936, height: 90, zIndex: 4, animation: { name: 'inkReveal', duration: 900 }, editable: { content: true, fontSize: { type: 'range', min: 40, max: 88 } } },
      { id: 'cp-sub', type: 'text', content: '同样一笔钱，晚开始的那十年究竟亏在哪', fontFamily: HEI, fontSize: 28, color: D('colors.dim'), x: 72, y: 226, width: 936, height: 40, zIndex: 4, editable: { content: true } },
      // 曲线面板
      { id: 'cp-panel', type: 'shape', shapeKind: 'rect', x: 72, y: 300, width: 936, height: 480, borderRadius: 20, fill: 'rgba(127,127,127,0.09)', border: { width: 2, style: 'solid', color: 'rgba(127,127,127,0.28)' }, zIndex: 2 },
      { id: 'cp-panel-t', type: 'text', content: '账户价值（示意）', fontFamily: HEI, fontSize: 20, color: D('colors.dim'), x: 104, y: 326, width: 300, height: 28, zIndex: 4, editable: { content: true } },
      { id: 'cp-panel-u', type: 'text', content: '横轴：投资年数', fontFamily: MONO, fontSize: 20, color: D('colors.dim'), textAlign: 'right', x: 728, y: 326, width: 248, height: 28, zIndex: 4, editable: { content: true } },
      { id: 'cp-axis-x', type: 'shape', shapeKind: 'rect', x: 140, y: 700, width: 800, height: 2, fill: D('colors.ink'), opacity: 0.28, zIndex: 3 },
      { id: 'cp-axis-y', type: 'shape', shapeKind: 'rect', x: 140, y: 372, width: 2, height: 328, fill: D('colors.ink'), opacity: 0.28, zIndex: 3 },
      ...[0.34, 0.67, 1].map((f, i) => (
        { id: `cp-grid-${i}`, type: 'shape', shapeKind: 'rect', x: 142, y: 700 - 109 * f, width: 798, height: 1, fill: 'rgba(127,127,127,0.30)', zIndex: 3 }
      )) as CanvasElement[],
      // 两条复利曲线（旋转矩形分段拼）
      ...((() => {
        const K = 137.3, yAt = (v: number) => 700 - (v - 1) * K, xAt = (t: number) => 140 + t * 40
        const mk = (pts: number[][], name: string, tok: string, th: number, op: number, d0: number) =>
          pts.slice(1).map((p, i) => {
            const q = pts[i], dx = p[0] - q[0], dy = p[1] - q[1], L = Math.hypot(dx, dy)
            return { id: `${name}-${i}`, type: 'shape', shapeKind: 'rect', x: (q[0] + p[0]) / 2 - L / 2, y: (q[1] + p[1]) / 2 - th / 2, width: L, height: th, rotation: (Math.atan2(dy, dx) * 180) / Math.PI, fill: D(tok), opacity: op, borderRadius: th / 2, zIndex: 4, animation: { name: 'fadeIn', duration: 460, delay: d0 + i * 70 } } as CanvasElement
          })
        const early = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20].map(t => [xAt(t), yAt(Math.pow(1.06, t))])
        const later = [10, 12, 14, 16, 18, 20].map(t => [xAt(t), yAt(Math.pow(1.06, t - 10))])
        return [
          ...mk(early, 'cp-early', 'colors.early', 7, 0.95, 360),
          ...mk(later, 'cp-late', 'colors.late', 5, 0.8, 560),
          { id: 'cp-e-dot', type: 'shape', shapeKind: 'circle', x: early[early.length - 1][0] - 11, y: early[early.length - 1][1] - 11, width: 22, height: 22, fill: D('colors.early'), zIndex: 4, animation: { name: 'pulse', duration: 2200, iterationCount: 'infinite' } } as CanvasElement,
          { id: 'cp-l-dot', type: 'shape', shapeKind: 'circle', x: later[later.length - 1][0] - 9, y: later[later.length - 1][1] - 9, width: 18, height: 18, fill: D('colors.late'), zIndex: 4 } as CanvasElement
        ]
      })()) as CanvasElement[],
      { id: 'cp-early-l', type: 'text', content: '25 岁开始', fontFamily: HEI, fontSize: 28, fontWeight: '700', color: D('colors.early'), x: 660, y: 356, width: 240, height: 40, zIndex: 5, editable: { content: true } },
      { id: 'cp-late-l', type: 'text', content: '35 岁开始', fontFamily: HEI, fontSize: 28, fontWeight: '700', color: D('colors.late'), x: 660, y: 616, width: 240, height: 40, zIndex: 5, editable: { content: true } },
      { id: 'cp-x1', type: 'text', content: '第 1 年', fontFamily: MONO, fontSize: 20, color: D('colors.dim'), x: 140, y: 722, width: 120, height: 28, zIndex: 4 },
      { id: 'cp-x2', type: 'text', content: '第 10 年', fontFamily: MONO, fontSize: 20, color: D('colors.dim'), x: 500, y: 722, width: 120, height: 28, zIndex: 4 },
      { id: 'cp-x3', type: 'text', content: '第 20 年', fontFamily: MONO, fontSize: 20, color: D('colors.dim'), textAlign: 'right', x: 820, y: 722, width: 120, height: 28, zIndex: 4 },
      // 两个结果大字
      { id: 'cp-v1-l', type: 'text', content: '投 10 万 · 拿 20 年', fontFamily: HEI, fontSize: 28, color: D('colors.dim'), x: 72, y: 810, width: 400, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'cp-v1', type: 'text', content: '32 万', fontFamily: MONO, fontSize: 96, fontWeight: '900', color: D('colors.early'), x: 72, y: 852, width: 360, height: 135, zIndex: 4, animation: { name: 'zoomIn', duration: 560, delay: 900 }, editable: { content: true, fontSize: { type: 'range', min: 60, max: 120 } } },
      { id: 'cp-v1-n', type: 'text', content: '演示示例 · 按年化 6% 估算', fontFamily: HEI, fontSize: 20, color: D('colors.dim'), x: 72, y: 992, width: 400, height: 28, zIndex: 4, editable: { content: true } },
      { id: 'cp-v2-l', type: 'text', content: '同样 10 万 · 只晚 10 年', fontFamily: HEI, fontSize: 28, color: D('colors.dim'), x: 540, y: 810, width: 420, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'cp-v2', type: 'text', content: '18 万', fontFamily: MONO, fontSize: 96, fontWeight: '900', color: D('colors.late'), x: 540, y: 852, width: 360, height: 135, zIndex: 4, animation: { name: 'zoomIn', duration: 560, delay: 1040 }, editable: { content: true, fontSize: { type: 'range', min: 60, max: 120 } } },
      { id: 'cp-v2-n', type: 'text', content: '差的不是收益率，是年数', fontFamily: HEI, fontSize: 20, color: D('colors.dim'), x: 540, y: 992, width: 420, height: 28, zIndex: 4, editable: { content: true } },
      // 结论条
      { id: 'cp-bar', type: 'shape', shapeKind: 'rect', x: 72, y: 1060, width: 936, height: 118, borderRadius: 18, fill: D('colors.early'), zIndex: 3, animation: { name: 'slideUpFade', duration: 620, delay: 1150 } },
      { id: 'cp-bar-t', type: 'text', content: '最难的不是收益率，是早开始', fontFamily: { $t: 'fonts.heading' }, fontSize: 40, fontWeight: '900', color: D('colors.bg'), x: 104, y: 1092, width: 872, height: 56, zIndex: 4, animation: { name: 'fadeInUp', duration: 560, delay: 1280 }, editable: { content: true, fontSize: { type: 'range', min: 26, max: 52 } } },
      { id: 'cp-foot', type: 'text', content: '本页曲线为四舍五入的演示示例，不构成任何投资建议。', fontFamily: MONO, fontSize: 20, color: D('colors.dim'), x: 72, y: 1214, width: 936, height: 28, zIndex: 4, editable: { content: true } }
    ]
  },

  // 4. 基金周记（9:16）—— 日期竖排 + 收益行表 + 心态一句话 + 示例角标
  {
    id: 'finance-fund-diary', name: '基金周记', version: '1.0.0', category: 'finance',
    tags: ['finance', 'fund', 'diary', 'weekly', '笔记', '9:16'],
    thumbnail: svgUri('<rect width="90" height="160" fill="%2312151B"/><rect x="8" y="12" width="40" height="9" rx="2" fill="%23EFEAE0"/><rect x="70" y="12" width="12" height="34" rx="2" fill="%23EFEAE0" opacity="0.25"/><text x="76" y="26" font-family="serif" font-size="9" fill="%23EFEAE0" text-anchor="middle">9</text><text x="76" y="38" font-family="serif" font-size="9" fill="%23EFEAE0" text-anchor="middle">月</text><rect x="8" y="28" width="26" height="12" rx="2" fill="%23E14434"/><text x="8" y="60" font-family="Impact,sans-serif" font-size="14" fill="%23E14434">-0.24%</text><g fill="%23EFEAE0" opacity="0.12"><rect x="8" y="72" width="74" height="12" rx="2"/><rect x="8" y="90" width="74" height="12" rx="2"/><rect x="8" y="108" width="74" height="12" rx="2"/></g><g fill="%23E14434"><rect x="12" y="76" width="20" height="3" rx="1.5"/><rect x="12" y="112" width="20" height="3" rx="1.5"/></g><g fill="%2319975F"><rect x="12" y="94" width="20" height="3" rx="1.5"/></g><rect x="8" y="128" width="74" height="20" rx="4" fill="none" stroke="%238A93A3" stroke-width="1"/><rect x="14" y="134" width="44" height="3" rx="1.5" fill="%23EFEAE0" opacity="0.6"/><rect x="14" y="140" width="30" height="3" rx="1.5" fill="%23EFEAE0" opacity="0.35"/><circle cx="72" cy="140" r="7" fill="none" stroke="%2319975F" stroke-width="1.2"/>', 90, 160),
    tokens: {
      colors: {
        bg: { label: '底色', default: '#12151B', options: ['#12151B', '#F4F1E8', '#0F1A16', '#171325'] },
        ink: { label: '主文字', default: '#EFEAE0', options: ['#EFEAE0', '#221E17', '#E6F0E9', '#EFE7F8'] },
        dim: { label: '弱文字', default: '#8A93A3', options: ['#8A93A3', '#877E6E', '#7F9A8D', '#98896E'] },
        up: { label: '红·涨', default: '#E14434', options: ['#E14434', '#C8392B', '#FF6A4D', '#D0503C'] },
        down: { label: '绿·跌', default: '#19975F', options: ['#19975F', '#2C7A5B', '#3DDC97', '#4FB98C'] }
      },
      fonts: { heading: { label: '标题字体', default: HEI, options: [HEI, SONG, FANG] } }
    },
    presets: [
      { name: '夜记账黑', colors: { bg: '#12151B', ink: '#EFEAE0', dim: '#8A93A3', up: '#E14434', down: '#19975F' } },
      { name: '白纸晨记', colors: { bg: '#F4F1E8', ink: '#221E17', dim: '#877E6E', up: '#C8392B', down: '#2C7A5B' } },
      { name: '松青夜话', colors: { bg: '#0F1A16', ink: '#E6F0E9', dim: '#7F9A8D', up: '#FF6A4D', down: '#3DDC97' } },
      { name: '紫灯下复盘', colors: { bg: '#171325', ink: '#EFE7F8', dim: '#98896E', up: '#D0503C', down: '#4FB98C' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1920, defaultWidth: 1080, defaultHeight: 1920, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'fd-kicker', type: 'text', content: 'FUND DIARY · 第 12 篇 · 只记自己这一份', fontFamily: MONO, fontSize: 16, letterSpacing: 4, color: D('colors.dim'), x: 72, y: 88, width: 700, height: 24, zIndex: 4, editable: { content: true } },
      { id: 'fd-title', type: 'text', content: '基金周记', fontFamily: { $t: 'fonts.heading' }, fontSize: 112, fontWeight: '900', letterSpacing: 4, color: D('colors.ink'), x: 72, y: 118, width: 560, height: 157, zIndex: 4, animation: { name: 'fadeInUp', duration: 560 }, editable: { content: true, fontSize: { type: 'range', min: 72, max: 140 } } },
      // 日期竖排
      { id: 'fd-drail', type: 'shape', shapeKind: 'rect', x: 862, y: 118, width: 2, height: 400, fill: D('colors.dim'), opacity: 0.45, zIndex: 3 },
      { id: 'fd-dline', type: 'text', content: '9\n月\n22\n日', fontFamily: SONG, fontSize: 80, lineHeight: 1.15, color: D('colors.ink'), opacity: 0.9, textAlign: 'center', x: 888, y: 112, width: 120, height: 400, zIndex: 4, animation: { name: 'fadeIn', duration: 700, delay: 260 }, editable: { content: true, fontSize: { type: 'range', min: 48, max: 100 } } },
      { id: 'fd-rule', type: 'shape', shapeKind: 'rect', x: 72, y: 286, width: 700, height: 2, fill: D('colors.up'), opacity: 0.6, zIndex: 3 },
      { id: 'fd-sub', type: 'text', content: '统计区间 9 月 22 日至 9 月 28 日', fontFamily: HEI, fontSize: 22, color: D('colors.dim'), x: 72, y: 300, width: 700, height: 32, zIndex: 4, editable: { content: true } },
      // 本周合计
      { id: 'fd-hl', type: 'text', content: '本周合计', fontFamily: HEI, fontSize: 22, fontWeight: '700', letterSpacing: 4, color: D('colors.dim'), x: 72, y: 366, width: 260, height: 32, zIndex: 4, editable: { content: true } },
      { id: 'fd-hero', type: 'text', content: '-0.24%', fontFamily: MONO, fontSize: 80, fontWeight: '900', color: D('colors.down'), x: 72, y: 402, width: 420, height: 112, zIndex: 4, animation: { name: 'zoomIn', duration: 560, delay: 180 }, editable: { content: true, fontSize: { type: 'range', min: 48, max: 108 } } },
      { id: 'fd-hero-n', type: 'text', content: '四只基，两只飘红，两只装死', fontFamily: HEI, fontSize: 22, color: D('colors.dim'), x: 72, y: 526, width: 700, height: 32, zIndex: 4, editable: { content: true } },
      // 表头
      { id: 'fd-th', type: 'shape', shapeKind: 'rect', x: 72, y: 586, width: 936, height: 2, fill: D('colors.ink'), opacity: 0.24, zIndex: 3 },
      { id: 'fd-th-n', type: 'text', content: '名称', fontFamily: HEI, fontSize: 22, color: D('colors.dim'), x: 72, y: 604, width: 200, height: 32, zIndex: 4 },
      { id: 'fd-th-w', type: 'text', content: '本周', fontFamily: HEI, fontSize: 22, color: D('colors.dim'), textAlign: 'right', x: 560, y: 604, width: 248, height: 32, zIndex: 4 },
      { id: 'fd-th-c', type: 'text', content: '持有至今', fontFamily: HEI, fontSize: 22, color: D('colors.dim'), textAlign: 'right', x: 828, y: 604, width: 180, height: 32, zIndex: 4 },
      // 收益行表
      ...([
        ['宽基指数 · 沪深 300 联接', '-1.86%', 'colors.down', '+12.40%', 0.83],
        ['红利低波 · 收息为主', '-0.62%', 'colors.down', '+4.18%', 0.28],
        ['海外科技 · 追高的代价', '+2.40%', 'colors.up', '+9.60%', 0.64],
        ['纯债打底 · 全场气氛组', '+0.14%', 'colors.up', '+1.90%', 0.13]
      ] as const).map((r, i) => {
        const y = 656 + i * 150
        return [
          { id: `fd-name-${i}`, type: 'text', content: r[0], fontFamily: HEI, fontSize: 30, color: D('colors.ink'), x: 72, y, width: 470, height: 42, zIndex: 4, animation: { name: 'slideInLeft', duration: 520, delay: 300 + i * 110 }, editable: { content: true } },
          { id: `fd-week-${i}`, type: 'text', content: r[1], fontFamily: MONO, fontSize: 44, fontWeight: '700', color: D(r[2]), textAlign: 'right', x: 560, y: y - 4, width: 248, height: 62, zIndex: 4, animation: { name: 'fadeInUp', duration: 480, delay: 340 + i * 110 }, editable: { content: true } },
          { id: `fd-total-${i}`, type: 'text', content: r[3], fontFamily: MONO, fontSize: 22, color: D('colors.dim'), textAlign: 'right', x: 828, y: y + 10, width: 180, height: 32, zIndex: 4, editable: { content: true } },
          { id: `fd-track-${i}`, type: 'shape', shapeKind: 'rect', x: 72, y: y + 62, width: 936, height: 8, borderRadius: 4, fill: 'rgba(127,127,127,0.20)', zIndex: 3 },
          { id: `fd-bar-${i}`, type: 'shape', shapeKind: 'rect', x: 72, y: y + 62, width: 936 * r[4], height: 8, borderRadius: 4, fill: D(r[2]), opacity: 0.9, zIndex: 4, animation: { name: 'slideInLeft', duration: 760, delay: 420 + i * 110 } },
          i < 3 ? { id: `fd-sep-${i}`, type: 'shape', shapeKind: 'rect', x: 72, y: y + 106, width: 936, height: 1.5, fill: 'rgba(127,127,127,0.30)', zIndex: 3 } : null
        ].filter(Boolean)
      }).flat() as CanvasElement[],
      { id: 'fd-cap', type: 'text', content: '以上收益为演示示例 · 进度条按 15% 折算', fontFamily: MONO, fontSize: 16, color: D('colors.dim'), x: 72, y: 1258, width: 700, height: 24, zIndex: 4, editable: { content: true } },
      // 心态一句话
      { id: 'fd-mood', type: 'shape', shapeKind: 'rect', x: 72, y: 1316, width: 936, height: 300, borderRadius: 24, fill: 'rgba(127,127,127,0.10)', border: { width: 2, style: 'dashed', color: D('colors.dim') }, zIndex: 3, animation: { name: 'fadeIn', duration: 600, delay: 700 } },
      { id: 'fd-mood-l', type: 'text', content: '本周心态', fontFamily: HEI, fontSize: 22, letterSpacing: 4, color: D('colors.dim'), x: 104, y: 1348, width: 240, height: 32, zIndex: 4, editable: { content: true } },
      { id: 'fd-quote', type: 'text', content: '「拿住是本事，\n拿不住是人性。」', fontFamily: { $t: 'fonts.heading' }, fontSize: 44, fontWeight: '900', lineHeight: 1.45, color: D('colors.ink'), x: 104, y: 1396, width: 872, height: 146, zIndex: 4, animation: { name: 'rise', duration: 620, delay: 820 }, editable: { content: true, fontSize: { type: 'range', min: 30, max: 60 } } },
      { id: 'fd-mood-n', type: 'text', content: '本周操作：没操作（这是今年最贵的一次克制）', fontFamily: HEI, fontSize: 22, color: D('colors.dim'), x: 104, y: 1562, width: 872, height: 32, zIndex: 4, editable: { content: true } },
      // 下周给自己的三句话
      { id: 'fd-plan', type: 'text', content: '下周三条自我提醒', fontFamily: HEI, fontSize: 30, fontWeight: '700', color: D('colors.up'), x: 72, y: 1668, width: 600, height: 42, zIndex: 4, editable: { content: true } },
      ...['□ 每周只看一次账户', '□ 手续费也是成本', '□ 别人的截图不是作业'].map((s, i) => (
        { id: `fd-todo-${i}`, type: 'text', content: s, fontFamily: HEI, fontSize: 22, color: D('colors.ink'), opacity: 0.85, x: 72, y: 1722 + i * 50, width: 600, height: 34, zIndex: 4, animation: { name: 'fadeInUp', duration: 460, delay: 980 + i * 110 }, editable: { content: true } }
      )) as CanvasElement[],
      // 示例角标（旋转章）
      { id: 'fd-stamp', type: 'shape', shapeKind: 'circle', x: 828, y: 1664, width: 172, height: 172, border: { width: 4, style: 'solid', color: D('colors.up') }, rotation: -12, opacity: 0.9, zIndex: 5, animation: { name: 'twinkle', duration: 3000, iterationCount: 'infinite' } },
      { id: 'fd-stamp-t', type: 'text', content: '示例数据', fontFamily: HEI, fontSize: 30, fontWeight: '700', color: D('colors.up'), textAlign: 'center', rotation: -12, x: 828, y: 1728, width: 172, height: 44, zIndex: 6, editable: { content: true } },
      { id: 'fd-foot', type: 'text', content: '本页数字均为个人记录示意，不构成任何参考。', fontFamily: MONO, fontSize: 16, color: D('colors.dim'), x: 72, y: 1856, width: 700, height: 26, zIndex: 4, editable: { content: true } },
      { id: 'fd-foot-r', type: 'text', content: 'WEEK 39 · 2026', fontFamily: MONO, fontSize: 16, letterSpacing: 2, color: D('colors.up'), textAlign: 'right', x: 800, y: 1856, width: 208, height: 26, zIndex: 4 }
    ]
  },

  // 5. 存钱挑战打卡（1:1）—— 52 周格阵部分涂满 + 当前总额大字
  {
    id: 'finance-save-challenge', name: '存钱挑战打卡', version: '1.0.0', category: 'finance',
    tags: ['finance', 'saving', 'challenge', 'checkin', '打卡', '1:1'],
    thumbnail: svgUri('<rect width="100" height="100" fill="%23F5F1E4"/><rect x="8" y="10" width="46" height="7" rx="2" fill="%231F2429"/><rect x="8" y="22" width="60" height="14" rx="3" fill="%23BE3E2C" opacity="0.16"/><rect x="11" y="26" width="34" height="6" rx="2" fill="%23BE3E2C"/><rect x="70" y="24" width="22" height="10" rx="5" fill="%231F2429"/>' + miniGrid(10, 4, 6, 3, 8, 46, 21, '%23BE3E2C', '%231F2429') + '<rect x="8" y="80" width="62" height="5" rx="2.5" fill="%231F2429" opacity="0.16"/><rect x="8" y="80" width="32" height="5" rx="2.5" fill="%23BE3E2C"/><rect x="8" y="90" width="40" height="4" rx="2" fill="%231F2429" opacity="0.3"/>', 100, 100),
    tokens: {
      colors: {
        bg: { label: '底色', default: '#F5F1E4', options: ['#F5F1E4', '#131619', '#EDF1EC', '#1B1622'] },
        ink: { label: '主文字', default: '#1F2429', options: ['#1F2429', '#EFEBE1', '#1A231E', '#EDE6F5'] },
        dim: { label: '弱文字', default: '#7A828C', options: ['#7A828C', '#8A929C', '#6E7F73', '#9A8CAE'] },
        hot: { label: '已存颜色', default: '#BE3E2C', options: ['#BE3E2C', '#E14434', '#C2410C', '#D0503C'] },
        cool: { label: '辅助绿', default: '#2F7D5B', options: ['#2F7D5B', '#3DDC97', '#19975F', '#4FB98C'] }
      },
      fonts: { heading: { label: '标题字体', default: HEI, options: [HEI, IMPACT, SONG] } }
    },
    presets: [
      { name: '米纸存钱罐', colors: { bg: '#F5F1E4', ink: '#1F2429', dim: '#7A828C', hot: '#BE3E2C', cool: '#2F7D5B' } },
      { name: '夜黑铁罐', colors: { bg: '#131619', ink: '#EFEBE1', dim: '#8A929C', hot: '#E14434', cool: '#3DDC97' } },
      { name: '松绿记录', colors: { bg: '#EDF1EC', ink: '#1A231E', dim: '#6E7F73', hot: '#C2410C', cool: '#19975F' } },
      { name: '紫灯小账', colors: { bg: '#1B1622', ink: '#EDE6F5', dim: '#9A8CAE', hot: '#D0503C', cool: '#4FB98C' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1080, defaultWidth: 1080, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'sv-kicker', type: 'text', content: 'SAVING CHALLENGE · 52 WEEKS', fontFamily: MONO, fontSize: 18, letterSpacing: 5, color: D('colors.dim'), x: 72, y: 76, width: 560, height: 26, zIndex: 4, editable: { content: true } },
      { id: 'sv-title', type: 'text', content: '存钱挑战打卡表', fontFamily: { $t: 'fonts.heading' }, fontSize: 76, fontWeight: '900', color: D('colors.ink'), x: 72, y: 112, width: 600, height: 110, zIndex: 4, animation: { name: 'fadeInUp', duration: 540 }, editable: { content: true, fontSize: { type: 'range', min: 48, max: 96 } } },
      { id: 'sv-badge', type: 'shape', shapeKind: 'rect', x: 752, y: 136, width: 256, height: 64, borderRadius: 999, fill: D('colors.hot'), zIndex: 3, animation: { name: 'zoomIn', duration: 460, delay: 240 } },
      { id: 'sv-badge-t', type: 'text', content: '第 27 / 52 周', fontFamily: MONO, fontSize: 26, fontWeight: '700', color: D('colors.bg'), textAlign: 'center', x: 752, y: 152, width: 256, height: 37, zIndex: 4, editable: { content: true } },
      { id: 'sv-lbl', type: 'text', content: '已经存下（示意）', fontFamily: HEI, fontSize: 26, color: D('colors.dim'), x: 72, y: 248, width: 400, height: 37, zIndex: 4, editable: { content: true } },
      { id: 'sv-total', type: 'text', content: '￥ 13 500', fontFamily: MONO, fontSize: 110, fontWeight: '900', color: D('colors.hot'), x: 72, y: 288, width: 620, height: 154, zIndex: 4, animation: { name: 'zoomIn', duration: 600, delay: 300 }, editable: { content: true, fontSize: { type: 'range', min: 70, max: 130 } } },
      { id: 'sv-goal', type: 'text', content: '目标 ￥ 30 000', fontFamily: MONO, fontSize: 26, color: D('colors.dim'), textAlign: 'right', x: 708, y: 358, width: 300, height: 37, zIndex: 4, editable: { content: true } },
      // 52 周格阵：13×4，前 27 格涂满
      ...Array.from({ length: 52 }, (_, i) => {
        const col = i % 13, row = Math.floor(i / 13)
        const x = 78 + col * 72, y = 448 + row * 72
        const done = i < 27, cur = i === 26
        return [
          {
            id: `sv-cell-${i}`, type: 'shape', shapeKind: 'rect', x, y, width: 60, height: 60, borderRadius: 14,
            fill: done ? D('colors.hot') : D('colors.ink'), opacity: done ? (cur ? 1 : 0.82) : 0.07,
            border: cur ? { width: 4, style: 'solid', color: D('colors.ink') } : (done ? undefined : { width: 1.5, style: 'solid', color: 'rgba(127,127,127,0.42)' }),
            zIndex: done ? 3 : 2,
            animation: cur ? { name: 'twinkle', duration: 2200, iterationCount: 'infinite' } : (done && i >= 22 ? { name: 'zoomIn', duration: 420, delay: 520 + (i - 22) * 45 } : undefined)
          } as CanvasElement,
          { id: `sv-num-${i}`, type: 'text', content: String(i + 1), fontFamily: MONO, fontSize: 18, fontWeight: '700', color: done ? D('colors.bg') : D('colors.dim'), textAlign: 'center', x: x + 6, y: y + 18, width: 48, height: 26, zIndex: 4, editable: { content: true } }
        ]
      }).flat() as CanvasElement[],
      { id: 'sv-track', type: 'shape', shapeKind: 'rect', x: 78, y: 756, width: 924, height: 12, borderRadius: 6, fill: 'rgba(127,127,127,0.22)', zIndex: 3 },
      { id: 'sv-fill', type: 'shape', shapeKind: 'rect', x: 78, y: 756, width: 480, height: 12, borderRadius: 6, fill: D('colors.hot'), zIndex: 4, animation: { name: 'slideInLeft', duration: 900, delay: 700 } },
      { id: 'sv-pct', type: 'text', content: '完成 52%', fontFamily: MONO, fontSize: 26, fontWeight: '700', color: D('colors.ink'), x: 72, y: 784, width: 300, height: 37, zIndex: 4, editable: { content: true } },
      { id: 'sv-left', type: 'text', content: '还差 25 周 · 少买 25 杯奶茶', fontFamily: HEI, fontSize: 26, color: D('colors.dim'), textAlign: 'right', x: 640, y: 784, width: 368, height: 37, zIndex: 4, editable: { content: true } },
      { id: 'sv-line', type: 'text', content: '省下来的不是钱，是底气', fontFamily: { $t: 'fonts.heading' }, fontSize: 40, fontWeight: '900', color: D('colors.cool'), x: 72, y: 872, width: 936, height: 56, zIndex: 4, animation: { name: 'rise', duration: 560, delay: 900 }, editable: { content: true, fontSize: { type: 'range', min: 26, max: 56 } } },
      { id: 'sv-foot', type: 'text', content: '金额与周数均为演示示例，不构成任何理财建议。', fontFamily: MONO, fontSize: 18, color: D('colors.dim'), x: 72, y: 964, width: 620, height: 26, zIndex: 4, editable: { content: true } },
      { id: 'sv-foot-r', type: 'text', content: 'DAY 189 / 364', fontFamily: MONO, fontSize: 18, letterSpacing: 3, color: D('colors.hot'), textAlign: 'right', x: 778, y: 964, width: 230, height: 26, zIndex: 4 }
    ]
  },

  // 6. 财经名词解释卡（3:4）—— 术语大字 + 三段人话翻译 + 「下次不再懵」尾巴
  {
    id: 'finance-term-card', name: '财经名词解释卡', version: '1.0.0', category: 'finance',
    tags: ['finance', 'term', 'glossary', '科普', '3:4'],
    thumbnail: svgUri('<rect width="105" height="140" fill="%231B1620"/><rect x="8" y="10" width="34" height="4" rx="2" fill="%23C6A15B"/><rect x="8" y="20" width="46" height="14" rx="2" fill="%23F2EEE6"/><rect x="58" y="20" width="22" height="14" rx="2" fill="%23F2EEE6" opacity="0.35"/><rect x="8" y="42" width="34" height="3" rx="1.5" fill="%23C6A15B"/><g fill="%23C6A15B"><rect x="8" y="52" width="10" height="10" rx="5" opacity="0.9"/></g><g fill="%23F2EEE6" opacity="0.55"><rect x="24" y="54" width="40" height="4" rx="2"/><rect x="24" y="62" width="70" height="4" rx="2" opacity="0.6"/><rect x="24" y="70" width="52" height="4" rx="2" opacity="0.5"/></g><g fill="%23C6A15B"><rect x="8" y="86" width="10" height="10" rx="5"/></g><g fill="%23F2EEE6" opacity="0.5"><rect x="24" y="88" width="44" height="4" rx="2"/><rect x="24" y="96" width="66" height="4" rx="2"/><rect x="24" y="104" width="40" height="4" rx="2"/></g><rect x="8" y="118" width="89" height="14" rx="5" fill="%23C6A15B"/><rect x="16" y="123" width="40" height="4" rx="2" fill="%231B1620"/>', 105, 140),
    tokens: {
      colors: {
        bg: { label: '底色', default: '#1B1620', options: ['#1B1620', '#F4F0E4', '#121A1E', '#211A16'] },
        ink: { label: '主文字', default: '#F2EEE6', options: ['#F2EEE6', '#221E17', '#E7F0F2', '#EFE3D6'] },
        dim: { label: '弱文字', default: '#9A93A6', options: ['#9A93A6', '#7D766A', '#7A8C90', '#9C8977'] },
        gold: { label: '强调金', default: '#C6A15B', options: ['#C6A15B', '#B23A2B', '#C99A2E', '#D97706'] },
        line: { label: '分隔线', default: '#3A3444', options: ['#3A3444', '#D3CDBE', '#C6D2D6', '#D8C8B4'] }
      },
      fonts: { heading: { label: '标题字体', default: HEI, options: [HEI, SONG, FANG] } }
    },
    presets: [
      { name: '夜读金', colors: { bg: '#1B1620', ink: '#F2EEE6', dim: '#9A93A6', gold: '#C6A15B', line: '#3A3444' } },
      { name: '晨读纸', colors: { bg: '#F4F0E4', ink: '#221E17', dim: '#7D766A', gold: '#B23A2B', line: '#D3CDBE' } },
      { name: '青瓷夜话', colors: { bg: '#121A1E', ink: '#E7F0F2', dim: '#7A8C90', gold: '#C99A2E', line: '#C6D2D6' } },
      { name: '褐灯旧书', colors: { bg: '#211A16', ink: '#EFE3D6', dim: '#9C8977', gold: '#D97706', line: '#D8C8B4' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1440, defaultWidth: 1080, defaultHeight: 1440, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'tc-dots', type: 'image', src: dotsBg(1080, 1440, 56, 'rgba(127,127,127,0.10)'), x: 0, y: 0, width: 1080, height: 1440, objectFit: 'fill', zIndex: 1 },
      { id: 'tc-ghost', type: 'text', content: '懵', fontFamily: SONG, fontSize: 420, fontWeight: '900', color: D('colors.ink'), opacity: 0.055, rotation: -8, x: 576, y: 520, width: 480, height: 590, zIndex: 2 },
      { id: 'tc-kicker', type: 'text', content: 'TERM EXPLAINED · 财经名词解释 第 07 期', fontFamily: MONO, fontSize: 20, letterSpacing: 4, color: D('colors.gold'), x: 72, y: 84, width: 700, height: 28, zIndex: 4, editable: { content: true } },
      { id: 'tc-term', type: 'text', content: '市盈率', fontFamily: { $t: 'fonts.heading' }, fontSize: 150, fontWeight: '900', letterSpacing: 4, color: D('colors.ink'), x: 72, y: 130, width: 600, height: 210, zIndex: 4, animation: { name: 'inkReveal', duration: 900 }, editable: { content: true, fontSize: { type: 'range', min: 96, max: 180 } } },
      { id: 'tc-tag', type: 'shape', shapeKind: 'rect', x: 726, y: 200, width: 210, height: 62, borderRadius: 999, border: { width: 3, style: 'solid', color: D('colors.gold') }, zIndex: 4, animation: { name: 'float', duration: 4600, iterationCount: 'infinite' } },
      { id: 'tc-tag-t', type: 'text', content: 'PE 20 倍', fontFamily: MONO, fontSize: 26, fontWeight: '700', color: D('colors.gold'), textAlign: 'center', x: 726, y: 214, width: 210, height: 37, zIndex: 5, editable: { content: true } },
      { id: 'tc-latin', type: 'text', content: 'P / E RATIO · 股价 ÷ 每股收益', fontFamily: MONO, fontSize: 28, letterSpacing: 2, color: D('colors.dim'), x: 72, y: 356, width: 700, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'tc-rule', type: 'shape', shapeKind: 'rect', x: 72, y: 404, width: 936, height: 2, fill: D('colors.line'), zIndex: 3, animation: { name: 'slideInLeft', duration: 700 } },
      // 三段翻译
      ...([
        ['01', '课本怎么说', '把它想成一个回本闹钟：', '按现在的赚钱速度，几年赚回本金。'],
        ['02', '人话怎么说', '数字 20，就是「二十年版」：', '一年赚 1 块，你得吃 20 年才回本。'],
        ['03', '你该盯什么', '同行比、历史比、增速比：', '单看一个数，等于什么都不看。']
      ] as const).map((b, i) => {
        const y = 440 + i * 220
        return [
          { id: `tc-no-${i}`, type: 'text', content: b[0], fontFamily: IMPACT, fontSize: 68, color: D('colors.gold'), x: 72, y, width: 130, height: 96, zIndex: 4, animation: { name: 'zoomIn', duration: 460, delay: 200 + i * 160 }, editable: { content: true } },
          { id: `tc-lab-${i}`, type: 'text', content: b[1], fontFamily: { $t: 'fonts.heading' }, fontSize: 40, fontWeight: '900', color: D('colors.ink'), x: 212, y: y + 10, width: 480, height: 56, zIndex: 4, editable: { content: true } },
          { id: `tc-body-${i}`, type: 'text', content: `${b[2]}\n${b[3]}`, fontFamily: HEI, fontSize: 28, lineHeight: 1.5, color: D('colors.dim'), x: 212, y: y + 80, width: 796, height: 96, zIndex: 4, animation: { name: 'fadeInUp', duration: 520, delay: 280 + i * 160 }, editable: { content: true, fontSize: { type: 'range', min: 20, max: 38 } } },
          i < 2 ? { id: `tc-div-${i}`, type: 'shape', shapeKind: 'rect', x: 72, y: y + 196, width: 936, height: 1.5, fill: D('colors.line'), zIndex: 3 } : null
        ].filter(Boolean)
      }).flat() as CanvasElement[],
      // 尾巴
      { id: 'tc-bar', type: 'shape', shapeKind: 'rect', x: 72, y: 1150, width: 936, height: 118, borderRadius: 18, fill: D('colors.gold'), zIndex: 3, animation: { name: 'slideUpFade', duration: 620, delay: 760 } },
      { id: 'tc-bar-t', type: 'text', content: '下次再听到这句，不再懵', fontFamily: { $t: 'fonts.heading' }, fontSize: 40, fontWeight: '900', color: D('colors.bg'), textAlign: 'center', x: 72, y: 1184, width: 936, height: 56, zIndex: 4, animation: { name: 'fadeInUp', duration: 560, delay: 880 }, editable: { content: true, fontSize: { type: 'range', min: 26, max: 52 } } },
      { id: 'tc-foot', type: 'text', content: '解释为方便理解的简化版本，数字与场景均为示例，不构成任何建议。', fontFamily: MONO, fontSize: 20, color: D('colors.dim'), x: 72, y: 1300, width: 936, height: 28, zIndex: 4, editable: { content: true } }
    ]
  }
]

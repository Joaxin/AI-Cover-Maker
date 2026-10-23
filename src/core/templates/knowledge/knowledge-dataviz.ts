// src/core/templates/knowledge/knowledge-dataviz.ts —— 数据·说明图批（知识风 3 个，高信息密度）
// 口径：图表一律用 rect/circle 拼（跟随 token 换色），不画进 SVG 死色；原创线稿 SVG 只用中性墨白；竖线用细长 rect；seeded 本地归一化。
import type { Template } from '@/types/types'
import {MONO, SANS, SERIF, HEI, grain} from '../_fx/trend'
import { seeded01, svgUri } from '../_fx/common'

const seeded = seeded01

const KAITI = 'STKaiti, KaiTi, "Kaiti SC", serif'

/** 归一化伪随机：返回 0..1（trend 里的 seeded 是原始整数，别混用） */

/** 手冲壶线稿（解剖图主体）：白墨中性色，任何预设下都读得出 */
const KETTLE_URI = svgUri(`
<g fill="none" stroke="%232A2724" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
  <path d="M52 26 q-10 -18 6 -22 q18 -5 26 8" opacity="0.9"/>
  <ellipse cx="150" cy="40" rx="62" ry="16"/>
  <path d="M88 40 q4 46 -14 74 q-16 28 6 46 h120 q22 -18 6 -46 q-18 -28 -14 -74"/>
  <path d="M96 60 q-42 6 -54 40"/>
  <ellipse cx="150" cy="160" rx="76" ry="15" opacity="0.5"/>
  <path d="M232 62 q40 4 44 40 q4 34 -30 42" opacity="0.9"/>
  <path d="M74 196 h152 l-12 26 h-128 z" opacity="0.85"/>
  <circle cx="150" cy="98" r="24" opacity="0.75"/>
  <path d="M150 82 v16 l11 7" opacity="0.75"/>
</g>`, 300, 240)

/** 爆炸分解线稿：六件自上而下拉开，中缝为回转轴虚线（540×760，注记按 0.925 缩放对齐） */
const EXPLODED_URI = svgUri(`
<g fill="none" stroke="%232A2724" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round">
  <path d="M268 0 V760" stroke-width="1.6" stroke-dasharray="9 11" opacity="0.35"/>
  <path d="M262 6 h16 v14 h-16 z"/><ellipse cx="270" cy="42" rx="94" ry="19"/>
  <path d="M196 30 q74 -18 148 0" opacity="0.55"/>
  <path d="M132 196 C 132 132 176 108 224 120 C 268 131 316 152 372 128" />
  <path d="M120 190 a13 13 0 1 1 0.1 0 Z"/><path d="M384 122 l18 -10 -6 20 z"/>
  <path d="M178 250 h184 q30 62 10 116 h-204 q-20 -54 10 -116 z"/>
  <ellipse cx="270" cy="250" rx="92" ry="17"/>
  <path d="M196 320 q74 22 148 0" opacity="0.4"/>
  <path d="M198 440 q72 -26 144 0 q12 34 -12 46 q-60 -16 -120 0 q-24 -12 -12 -46 z"/>
  <rect x="250" y="524" width="40" height="66" rx="10"/><path d="M270 524 v-16"/>
  <path d="M262 548 h16 M262 566 h16" stroke-width="1.8" opacity="0.6"/>
  <path d="M166 652 h208 l-18 44 h-172 z"/><ellipse cx="270" cy="652" rx="104" ry="15" opacity="0.5"/>
  <path d="M214 722 h112" stroke-width="1.8" opacity="0.45"/>
</g>`, 540, 760)

export const knowledgeDatavizTemplates: Template[] = [
  // 1. 数据长图（9:16）—— 三段式：条形榜 + 占比条 + 趋势折线，全部 rect/circle 拼，随预设换色
  {
    id: 'knowledge-datalong', name: '数据长图', version: '1.0.0', category: 'knowledge',
    tags: ['knowledge', 'data', 'long-image', 'chart', '9:16'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="178" viewBox="0 0 100 178"><rect width="100" height="178" fill="%23F6F3EC"/><rect x="10" y="12" width="56" height="7" fill="%2322201E"/><rect x="10" y="24" width="34" height="4" fill="%23C2410C"/><g fill="%23C2410C"><rect x="10" y="46" width="58" height="7"/><rect x="10" y="60" width="44" height="7"/><rect x="10" y="74" width="30" height="7"/></g><g fill="%2322201E" opacity="0.25"><rect x="10" y="46" width="72" height="7"/><rect x="10" y="60" width="72" height="7"/><rect x="10" y="74" width="72" height="7"/></g><rect x="10" y="96" width="72" height="9" fill="%230F766E"/><rect x="82" y="96" width="8" height="9" fill="%23A16207"/><polyline points="10,150 28,140 46,146 64,126 82,116" fill="none" stroke="%23C2410C" stroke-width="3"/><rect x="10" y="162" width="80" height="4" fill="%2322201E" opacity="0.2"/></svg>',
    tokens: {
      colors: {
        bg: { label: '纸底', default: '#F6F3EC', options: ['#F6F3EC', '#F2F5F7', '#FBF3EF', '#EFF3EC'] },
        ink: { label: '主墨', default: '#22201E', options: ['#22201E', '#16212B', '#2B2422', '#1B2417'] },
        accent: { label: '主数据色', default: '#C2410C', options: ['#C2410C', '#1D4ED8', '#0F766E', '#B45309'] },
        accent2: { label: '次数据色', default: '#0F766E', options: ['#0F766E', '#7C3AED', '#B45309', '#15803D'] },
        accent3: { label: '第三数据色', default: '#A16207', options: ['#A16207', '#0369A1', '#BE123C', '#4D7C0F'] },
        card: { label: '卡片纸', default: '#FFFDF8', options: ['#FFFDF8', '#F8FAFC', '#FFFFFF', '#F7F7F2'] },
        grid: { label: '网格线', default: '#D8D2C4', options: ['#D8D2C4', '#CBD5E1', '#E3DAD2', '#CDD6C6'] }
      },
      fonts: { heading: { label: '标题字体', default: HEI, options: [HEI, SERIF, SANS, KAITI] } }
    },
    presets: [
      { name: '陶土橙', colors: { bg: '#F6F3EC', ink: '#22201E', accent: '#C2410C', accent2: '#0F766E', accent3: '#A16207', card: '#FFFDF8', grid: '#D8D2C4' } },
      { name: '深海蓝', colors: { bg: '#F2F5F7', ink: '#16212B', accent: '#1D4ED8', accent2: '#7C3AED', accent3: '#0369A1', card: '#F8FAFC', grid: '#CBD5E1' } },
      { name: '松墨绿', colors: { bg: '#EFF3EC', ink: '#1B2417', accent: '#15803D', accent2: '#4D7C0F', accent3: '#0F766E', card: '#F7F7F2', grid: '#CDD6C6' } },
      { name: '暮紫砂', colors: { bg: '#FBF3EF', ink: '#2B2422', accent: '#BE123C', accent2: '#B45309', accent3: '#7C3AED', card: '#FFFFFF', grid: '#E3DAD2' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1920, defaultWidth: 1080, defaultHeight: 1920, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      // 页眉
      { id: 'dl-kicker', type: 'text', content: 'DATA IN ONE PAGE · 城市咖啡消费', fontFamily: MONO, fontSize: 22, color: { $t: 'colors.accent' }, letterSpacing: 5, x: 88, y: 66, width: 904, height: 34, zIndex: 4, editable: { content: true } },
      { id: 'dl-title', type: 'text', content: '一年喝掉多少杯', fontFamily: { $t: 'fonts.heading' }, fontSize: 92, fontWeight: '900', color: { $t: 'colors.ink' }, letterSpacing: 2, x: 86, y: 104, width: 908, height: 116, zIndex: 4, animation: { name: 'inkReveal', duration: 1100 }, editable: { content: true, fontSize: { type: 'range', min: 60, max: 112 }, position: true } },
      { id: 'dl-sub', type: 'text', content: '样本 32 万单 / 2024 全年 / 五城区 / 含外卖与到店', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.ink' }, opacity: 0.62, x: 88, y: 228, width: 904, height: 40, zIndex: 4, animation: { name: 'fadeIn', duration: 800, delay: 500 }, editable: { content: true, fontSize: { type: 'range', min: 20, max: 36 } } },
      { id: 'dl-rule', type: 'shape', shapeKind: 'rect', x: 88, y: 282, width: 904, height: 2, fill: { $t: 'colors.ink' }, opacity: 0.28, zIndex: 4 },
      // 三个头部指标卡
      ...[['3.2', '杯 / 人均年饮', 'colors.accent'], ['1842', '家 · 独立咖啡馆', 'colors.accent2'], ['31.6', '元 · 单杯均价', 'colors.accent3']].map((s, i) => {
        const x = 88 + i * 308
        return [
          { id: `dl-stat-${i}`, type: 'shape', shapeKind: 'rect', x, y: 312, width: 288, height: 158, fill: { $t: 'colors.card' }, borderRadius: 6, zIndex: 3, shadow: { color: 'rgba(0,0,0,0.08)', blur: 14, offsetX: 0, offsetY: 6 }, animation: { name: 'fadeInUp', duration: 700, delay: 120 + i * 120 } },
          { id: `dl-stat-n-${i}`, type: 'text', content: s[0], fontFamily: MONO, fontSize: 62, fontWeight: '700', color: { $t: s[2] } as any, x: x + 20, y: 336, width: 248, height: 72, zIndex: 4, editable: { content: true, fontSize: { type: 'range', min: 40, max: 76 } } },
          { id: `dl-stat-l-${i}`, type: 'text', content: s[1], fontFamily: HEI, fontSize: 18, color: { $t: 'colors.ink' } as any, opacity: 0.6, x: x + 20, y: 416, width: 248, height: 32, zIndex: 4, editable: { content: true } }
        ]
      }).flat() as any,
      // ① 条形榜：五城区
      { id: 'dl-s1-badge', type: 'text', content: '01', fontFamily: MONO, fontSize: 26, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 2, x: 88, y: 512, width: 80, height: 34, zIndex: 4 },
      { id: 'dl-s1-title', type: 'text', content: '哪个区最爱喝', fontFamily: { $t: 'fonts.heading' }, fontSize: 40, fontWeight: '800', color: { $t: 'colors.ink' }, x: 160, y: 502, width: 600, height: 52, zIndex: 4, editable: { content: true, fontSize: { type: 'range', min: 30, max: 52 } } },
      ...[['朝阳区', 92], ['海淀区', 78], ['西城区', 61], ['东城区', 55], ['通州区', 33]].map((b, i) => {
        const y = 586 + i * 74, v = b[1] as number
        return [
          { id: `dl-bar-l-${i}`, type: 'text', content: b[0] as string, fontFamily: HEI, fontSize: 26, color: { $t: 'colors.ink' } as any, x: 88, y: y + 4, width: 190, height: 34, zIndex: 4, editable: { content: true } },
          { id: `dl-bar-t-${i}`, type: 'shape', shapeKind: 'rect', x: 296, y, width: 588, height: 42, fill: { $t: 'colors.grid' }, opacity: 0.42, borderRadius: 4, zIndex: 3 },
          { id: `dl-bar-f-${i}`, type: 'shape', shapeKind: 'rect', x: 296, y, width: 588 * v / 100, height: 42, fill: { $t: i % 2 ? 'colors.accent2' : 'colors.accent' }, borderRadius: 4, zIndex: 4, animation: { name: 'slideInLeft', duration: 800, delay: 260 + i * 130 } },
          { id: `dl-bar-v-${i}`, type: 'text', content: `${v}`, fontFamily: MONO, fontSize: 22, fontWeight: '700', color: { $t: 'colors.ink' } as any, textAlign: 'right', x: 898, y: y + 6, width: 94, height: 32, zIndex: 4 }
        ]
      }).flat() as any,
      { id: 'dl-s1-note', type: 'text', content: '口径：每 100 单中该区的下单占比', fontFamily: MONO, fontSize: 18, color: { $t: 'colors.ink' }, opacity: 0.42, x: 88, y: 962, width: 700, height: 30, zIndex: 4 },
      // ② 占比条：连锁 / 独立 / 其他
      { id: 'dl-s2-badge', type: 'text', content: '02', fontFamily: MONO, fontSize: 26, fontWeight: '700', color: { $t: 'colors.accent2' }, letterSpacing: 2, x: 88, y: 1024, width: 80, height: 34, zIndex: 4 },
      { id: 'dl-s2-title', type: 'text', content: '钱付给了谁', fontFamily: { $t: 'fonts.heading' }, fontSize: 40, fontWeight: '800', color: { $t: 'colors.ink' }, x: 160, y: 1014, width: 600, height: 52, zIndex: 4, editable: { content: true, fontSize: { type: 'range', min: 30, max: 52 } } },
      { id: 'dl-share-t', type: 'shape', shapeKind: 'rect', x: 88, y: 1092, width: 904, height: 62, fill: { $t: 'colors.card' }, borderRadius: 6, zIndex: 3 },
      ...[['连锁品牌', 46, 'colors.accent'], ['独立小店', 33, 'colors.accent2'], ['便利店与速溶', 21, 'colors.accent3']].map((s, i) => {
        const before = [0, 46, 79][i]
        return [
          { id: `dl-share-${i}`, type: 'shape', shapeKind: 'rect', x: 88 + 904 * before / 100, y: 1092, width: 904 * (s[1] as number) / 100, height: 62, fill: { $t: s[2] } as any, opacity: 0.92, zIndex: 4, animation: { name: 'slideInLeft', duration: 900, delay: 500 + i * 180 } },
          { id: `dl-share-dot-${i}`, type: 'shape', shapeKind: 'circle', x: 92, y: 1190 + i * 46, width: 18, height: 18, fill: { $t: s[2] } as any, zIndex: 4 },
          { id: `dl-share-l-${i}`, type: 'text', content: `${s[0]}　${s[1]}%`, fontFamily: HEI, fontSize: 26, color: { $t: 'colors.ink' } as any, x: 126, y: 1184 + i * 46, width: 460, height: 34, zIndex: 4, editable: { content: true } }
        ]
      }).flat() as any,
      { id: 'dl-share-r', type: 'text', content: '同比：连锁 +6.2pt\n独立 −4.1pt', fontFamily: MONO, fontSize: 22, color: { $t: 'colors.ink' }, opacity: 0.55, textAlign: 'right', lineHeight: 1.55, x: 620, y: 1184, width: 372, height: 84, zIndex: 4 },
      // ③ 趋势折线：六年客单（用细 rect 拼斜线，颜色跟 token）
      { id: 'dl-s3-badge', type: 'text', content: '03', fontFamily: MONO, fontSize: 26, fontWeight: '700', color: { $t: 'colors.accent3' }, letterSpacing: 2, x: 88, y: 1318, width: 80, height: 34, zIndex: 4 },
      { id: 'dl-s3-title', type: 'text', content: '六年的曲线', fontFamily: { $t: 'fonts.heading' }, fontSize: 40, fontWeight: '800', color: { $t: 'colors.ink' }, x: 160, y: 1308, width: 600, height: 52, zIndex: 4, editable: { content: true, fontSize: { type: 'range', min: 30, max: 52 } } },
      ...Array.from({ length: 4 }, (_, i) => (
        { id: `dl-grid-${i}`, type: 'shape', shapeKind: 'rect', x: 88, y: 1392 + i * 62, width: 904, height: 1.5, fill: { $t: 'colors.grid' }, opacity: 0.7, zIndex: 3 }
      )) as any,
      ...(() => { const vals = [128, 152, 171, 196, 238, 286]; const min = 110, max = 300
        const px = vals.map((_, i) => 118 + i * 168)
        const py = vals.map(v => 1640 - (v - min) / (max - min) * 240)
        const segs = px.slice(1).map((x, i) => { const dx = x - px[i], dy = py[i + 1] - py[i]
          return { id: `dl-line-${i}`, type: 'shape', shapeKind: 'rect', x: (px[i] + x) / 2 - Math.hypot(dx, dy) / 2, y: (py[i] + py[i + 1]) / 2 - 3, width: Math.hypot(dx, dy), height: 6, rotation: Math.atan2(dy, dx) * 180 / Math.PI, fill: { $t: 'colors.accent' }, borderRadius: 3, zIndex: 5 } })
        const dots = px.map((x, i) => [
          { id: `dl-dot-${i}`, type: 'shape', shapeKind: 'circle', x: x - 13, y: py[i] - 13, width: 26, height: 26, fill: { $t: 'colors.card' }, opacity: 1, border: { color: { $t: 'colors.accent' } as any, width: 4, style: 'solid' }, zIndex: 6, animation: { name: 'zoomIn', duration: 500, delay: 700 + i * 120 } },
          { id: `dl-dot-v-${i}`, type: 'text', content: String(vals[i]), fontFamily: MONO, fontSize: 22, fontWeight: '700', color: { $t: 'colors.ink' } as any, textAlign: 'center', x: x - 50, y: py[i] - 52, width: 100, height: 30, zIndex: 6 },
          { id: `dl-dot-y-${i}`, type: 'text', content: `20${19 + i}`, fontFamily: MONO, fontSize: 18, color: { $t: 'colors.ink' } as any, opacity: 0.5, textAlign: 'center', x: x - 50, y: 1656, width: 100, height: 28, zIndex: 6 }
        ])
        return [...segs, ...dots.flat()] })() as any,
      // 结论
      { id: 'dl-end', type: 'shape', shapeKind: 'rect', x: 88, y: 1716, width: 904, height: 132, fill: { $t: 'colors.ink' }, opacity: 0.06, borderRadius: 6, zIndex: 3 },
      { id: 'dl-end-t', type: 'text', content: '一句话', fontFamily: KAITI, fontSize: 26, fontWeight: '700', color: { $t: 'colors.accent' }, x: 108, y: 1738, width: 200, height: 36, zIndex: 4 },
      { id: 'dl-end-b', type: 'text', content: '总量还在涨，但涨的是连锁与外卖；街边小店的客单更依赖熟客与手冲。', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.ink' }, opacity: 0.82, lineHeight: 1.62, x: 108, y: 1774, width: 860, height: 62, zIndex: 4, animation: { name: 'fadeInUp', duration: 800, delay: 1000 }, editable: { content: true, fontSize: { type: 'range', min: 20, max: 34 } } },
      { id: 'dl-foot-l', type: 'text', content: '数据 / 城市咖啡观察 2024 年报', fontFamily: MONO, fontSize: 18, color: { $t: 'colors.ink' }, opacity: 0.45, x: 88, y: 1866, width: 520, height: 28, zIndex: 4 },
      { id: 'dl-foot-r', type: 'text', content: '01 / 01', fontFamily: MONO, fontSize: 18, color: { $t: 'colors.accent' }, opacity: 0.8, textAlign: 'right', letterSpacing: 2, x: 700, y: 1866, width: 292, height: 28, zIndex: 4 },
      { id: 'dl-mark', type: 'image', src: KETTLE_URI, objectFit: 'contain', x: 812, y: 60, width: 180, height: 144, opacity: 0.16, zIndex: 2, editable: { position: true, size: { type: 'scale' } } },
      { id: 'dl-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1920, background: `url("${grain(300, 17, 0.85)}")`, opacity: 0.1, mixBlendMode: 'multiply', zIndex: 8 }
    ]
  },
  // 2. 解剖式分解图（4:5）—— 手冲壶六件分层爆炸，引出线编号注记 + 尺寸标注 + 规格条
  {
    id: 'knowledge-anatomy-explode', name: '解剖式分解图', version: '1.0.0', category: 'knowledge',
    tags: ['knowledge', 'exploded', 'anatomy', 'diagram', '4:5'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="125" viewBox="0 0 100 125"><rect width="100" height="125" fill="%23F4F2ED"/><g stroke="%232A2724" stroke-width="1.6" fill="none"><ellipse cx="42" cy="22" rx="15" ry="4"/><path d="M28 38 h28 q6 12 2 22 h-32 q-4 -10 2 -22"/><path d="M30 74 q12 -5 24 0"/><path d="M28 96 h28 l-4 10 h-20 z"/></g><path d="M42 8 V112" stroke="%232A2724" stroke-width="0.8" stroke-dasharray="3 3" opacity="0.4"/><g fill="%23C2410C"><circle cx="70" cy="22" r="4"/><circle cx="70" cy="50" r="4"/><circle cx="70" cy="76" r="4"/><circle cx="70" cy="100" r="4"/></g><g stroke="%232A2724" stroke-width="0.8" opacity="0.5"><path d="M56 22 H66"/><path d="M56 50 H66"/><path d="M56 76 H66"/><path d="M56 100 H66"/></g></svg>',
    tokens: {
      colors: {
        bg: { label: '图底', default: '#F4F2ED', options: ['#F4F2ED', '#EEF2F4', '#F6F1EA', '#EFF2EC'] },
        card: { label: '面板', default: '#FFFDF7', options: ['#FFFDF7', '#FFFFFF', '#FBFAF6', '#F7FAF7'] },
        ink: { label: '线墨', default: '#2A2724', options: ['#2A2724', '#16202A', '#33291F', '#1D2A20'] },
        accent: { label: '主标注色', default: '#C2410C', options: ['#C2410C', '#1D4ED8', '#0F766E', '#B45309'] },
        accent2: { label: '次标注色', default: '#0F766E', options: ['#0F766E', '#7C3AED', '#B45309', '#15803D'] },
        accent3: { label: '三级标注色', default: '#A16207', options: ['#A16207', '#0369A1', '#BE123C', '#4D7C0F'] },
        line: { label: '引线灰', default: '#8C857A', options: ['#8C857A', '#7A8896', '#9A8C7C', '#7C8A7C'] }
      },
      fonts: { heading: { label: '标题字体', default: HEI, options: [HEI, SERIF, SANS, KAITI] } }
    },
    presets: [
      { name: '工程橙', colors: { bg: '#F4F2ED', card: '#FFFDF7', ink: '#2A2724', accent: '#C2410C', accent2: '#0F766E', accent3: '#A16207', line: '#8C857A' } },
      { name: '蓝晒图', colors: { bg: '#EEF2F4', card: '#FFFFFF', ink: '#16202A', accent: '#1D4ED8', accent2: '#7C3AED', accent3: '#0369A1', line: '#7A8896' } },
      { name: '黄铜旧图', colors: { bg: '#F6F1EA', card: '#FBFAF6', ink: '#33291F', accent: '#B45309', accent2: '#A16207', accent3: '#BE123C', line: '#9A8C7C' } },
      { name: '松绿手绘', colors: { bg: '#EFF2EC', card: '#F7FAF7', ink: '#1D2A20', accent: '#15803D', accent2: '#0F766E', accent3: '#4D7C0F', line: '#7C8A7C' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      // 标题区
      { id: 'da-kicker', type: 'text', content: 'EXPLODED VIEW · 手冲壶 No.7', fontFamily: MONO, fontSize: 23, color: { $t: 'colors.accent' }, letterSpacing: 5, x: 88, y: 60, width: 700, height: 32, zIndex: 4, editable: { content: true } },
      { id: 'da-title', type: 'text', content: '一壶的解剖', fontFamily: { $t: 'fonts.heading' }, fontSize: 86, fontWeight: '900', color: { $t: 'colors.ink' }, letterSpacing: 3, x: 86, y: 96, width: 908, height: 110, zIndex: 4, animation: { name: 'inkReveal', duration: 1100 }, editable: { content: true, fontSize: { type: 'range', min: 56, max: 108 }, position: true } },
      { id: 'da-sub', type: 'text', content: '六件 / 自盖至座逐层拆开 / 比例 1:1', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.ink' }, opacity: 0.6, x: 88, y: 212, width: 700, height: 38, zIndex: 4, animation: { name: 'fadeIn', duration: 800, delay: 480 }, editable: { content: true, fontSize: { type: 'range', min: 20, max: 34 } } },
      { id: 'da-no', type: 'text', content: 'DWG 07—A', fontFamily: MONO, fontSize: 21, color: { $t: 'colors.line' }, textAlign: 'right', letterSpacing: 2, x: 720, y: 106, width: 272, height: 30, zIndex: 4 },
      { id: 'da-rule', type: 'shape', shapeKind: 'rect', x: 88, y: 264, width: 904, height: 2, fill: { $t: 'colors.ink' }, opacity: 0.24, zIndex: 4 },
      // 图板与爆炸线稿
      { id: 'da-panel', type: 'shape', shapeKind: 'rect', x: 120, y: 304, width: 520, height: 780, fill: { $t: 'colors.card' }, borderRadius: 6, zIndex: 2, shadow: { color: 'rgba(0,0,0,0.07)', blur: 16, offsetX: 0, offsetY: 6 } },
      { id: 'da-panel-top', type: 'shape', shapeKind: 'rect', x: 120, y: 304, width: 520, height: 6, fill: { $t: 'colors.accent' }, opacity: 0.85, borderRadius: 3, zIndex: 3 },
      { id: 'da-art', type: 'image', src: EXPLODED_URI, objectFit: 'contain', x: 128, y: 316, width: 504, height: 703, zIndex: 3, opacity: 0.95, animation: { name: 'fadeIn', duration: 1000 }, editable: { position: true, size: { type: 'scale' } } },
      // 左侧总高尺寸标注
      { id: 'da-dim', type: 'shape', shapeKind: 'rect', x: 88, y: 316, width: 2, height: 703, fill: { $t: 'colors.line' }, opacity: 0.75, zIndex: 4 },
      { id: 'da-dim-t1', type: 'shape', shapeKind: 'rect', x: 76, y: 316, width: 26, height: 2, fill: { $t: 'colors.line' }, opacity: 0.75, zIndex: 4 },
      { id: 'da-dim-t2', type: 'shape', shapeKind: 'rect', x: 76, y: 1017, width: 26, height: 2, fill: { $t: 'colors.line' }, opacity: 0.75, zIndex: 4 },
      { id: 'da-dim-lb', type: 'text', content: '总高 226 mm', fontFamily: MONO, fontSize: 20, color: { $t: 'colors.ink' }, opacity: 0.6, textAlign: 'center', rotation: -90, x: 0, y: 620, width: 200, height: 26, zIndex: 4, editable: { content: true } },
      // 六道编号注记（引出线 + 徽标 + 名称 + 规格）
      ...[['01', 353, '壶盖', '铜制 · 密封圈', 'colors.accent'], ['02', 458, '鹅颈', '内径 6.5 mm', 'colors.accent2'], ['03', 597, '壶身', '1 L · 三层钢', 'colors.accent'], ['04', 747, '把手', '电木 · 防烫', 'colors.accent3'], ['05', 830, '温度计', '量程 0—120 ℃', 'colors.accent2'], ['06', 934, '底座', '360° 硅胶圈', 'colors.accent']].map((p, i) => {
        const y = p[1] as number
        return [
          { id: `da-lead-${i}`, type: 'shape', shapeKind: 'rect', x: 540, y: y - 1, width: 100, height: 2, fill: { $t: 'colors.line' }, opacity: 0.8, zIndex: 4 },
          { id: `da-dot-${i}`, type: 'shape', shapeKind: 'circle', x: 532, y: y - 5, width: 10, height: 10, fill: { $t: p[4] } as any, zIndex: 5 },
          { id: `da-badge-${i}`, type: 'shape', shapeKind: 'circle', x: 648, y: y - 25, width: 50, height: 50, fill: { $t: p[4] } as any, opacity: 0.95, zIndex: 5, animation: { name: 'zoomIn', duration: 460, delay: 700 + i * 130 } },
          { id: `da-badge-t-${i}`, type: 'text', content: p[0] as string, fontFamily: MONO, fontSize: 23, fontWeight: '700', color: '#FFFFFF', textAlign: 'center', x: 648, y: y - 14, width: 50, height: 28, zIndex: 6 },
          { id: `da-name-${i}`, type: 'text', content: p[2] as string, fontFamily: { $t: 'fonts.heading' } as any, fontSize: 31, fontWeight: '800', color: { $t: 'colors.ink' } as any, x: 724, y: y - 30, width: 278, height: 40, zIndex: 5, editable: { content: true } },
          { id: `da-spec-${i}`, type: 'text', content: p[3] as string, fontFamily: MONO, fontSize: 21, color: { $t: 'colors.ink' } as any, opacity: 0.56, x: 724, y: y + 10, width: 278, height: 30, zIndex: 5, editable: { content: true } }
        ]
      }).flat() as any,
      { id: 'da-note', type: 'text', content: '拆解按实际装配顺序排列，虚线为回转轴。', fontFamily: HEI, fontSize: 21, color: { $t: 'colors.line' }, x: 120, y: 1032, width: 520, height: 30, zIndex: 4, editable: { content: true } },
      // 底部三格规格
      ...[['容量', '1 000 mL'], ['空壶重', '640 g'], ['壶口径', '86 mm']].map((s, i) => {
        const x = 88 + i * 308
        return [
          { id: `da-sp-${i}`, type: 'shape', shapeKind: 'rect', x, y: 1096, width: 288, height: 112, fill: { $t: 'colors.card' }, borderRadius: 6, zIndex: 2 },
          { id: `da-sp-k-${i}`, type: 'text', content: s[0], fontFamily: HEI, fontSize: 22, color: { $t: 'colors.line' } as any, x: x + 20, y: 1116, width: 248, height: 30, zIndex: 4, editable: { content: true } },
          { id: `da-sp-v-${i}`, type: 'text', content: s[1], fontFamily: MONO, fontSize: 40, fontWeight: '700', color: { $t: i === 0 ? 'colors.accent' : (i === 1 ? 'colors.accent2' : 'colors.accent3') } as any, x: x + 20, y: 1150, width: 248, height: 48, zIndex: 4, editable: { content: true, fontSize: { type: 'range', min: 28, max: 52 } } }
        ]
      }).flat() as any,
      { id: 'da-foot-l', type: 'text', content: '图 / 矩堂器物研究室　·　线稿非等比仅作示意', fontFamily: MONO, fontSize: 20, color: { $t: 'colors.ink' }, opacity: 0.45, x: 88, y: 1244, width: 640, height: 28, zIndex: 4 },
      { id: 'da-foot-r', type: 'text', content: 'SCALE 1:1', fontFamily: MONO, fontSize: 20, color: { $t: 'colors.accent' }, letterSpacing: 3, textAlign: 'right', x: 740, y: 1244, width: 252, height: 28, zIndex: 4 },
      { id: 'da-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1350, background: `url("${grain(300, 41, 0.8)}")`, opacity: 0.11, mixBlendMode: 'multiply', zIndex: 8 }
    ]
  },
  // 3. 时间轴长卷（3:4）—— 卷轴式书脊 + 七节点左右交错 + 三段时期色带
  {
    id: 'knowledge-timeline-scroll', name: '时间轴长卷', version: '1.0.0', category: 'knowledge',
    tags: ['knowledge', 'timeline', 'scroll', 'history', '3:4'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="133" viewBox="0 0 100 133"><rect width="100" height="133" fill="%23F3F1EA"/><rect x="10" y="10" width="80" height="5" rx="2" fill="%23262421" opacity="0.5"/><rect x="10" y="118" width="80" height="5" rx="2" fill="%23262421" opacity="0.5"/><rect x="49" y="18" width="2" height="96" fill="%23262421" opacity="0.35"/><g fill="%23C2410C"><circle cx="50" cy="28" r="4"/><circle cx="50" cy="60" r="4"/><circle cx="50" cy="92" r="4"/></g><g fill="%23FFFDF8" stroke="%23262421" stroke-opacity="0.25"><rect x="12" y="22" width="30" height="12" rx="2"/><rect x="58" y="38" width="30" height="12" rx="2"/><rect x="12" y="54" width="30" height="12" rx="2"/><rect x="58" y="70" width="30" height="12" rx="2"/><rect x="12" y="86" width="30" height="12" rx="2"/></g><rect x="92" y="18" width="3" height="34" fill="%23C2410C" opacity="0.4"/><rect x="92" y="56" width="3" height="34" fill="%230F766E" opacity="0.4"/><rect x="92" y="94" width="3" height="20" fill="%23A16207" opacity="0.4"/></svg>',
    tokens: {
      colors: {
        bg: { label: '卷底', default: '#F3F1EA', options: ['#F3F1EA', '#EDF1F3', '#F6EFE8', '#EEF2EB'] },
        card: { label: '节点卡', default: '#FFFDF8', options: ['#FFFDF8', '#FFFFFF', '#FBF9F4', '#F6FAF6'] },
        ink: { label: '文字墨', default: '#262421', options: ['#262421', '#15202B', '#33261D', '#1C271E'] },
        line: { label: '书脊灰', default: '#9A9287', options: ['#9A9287', '#8794A0', '#A39584', '#8A9A86'] },
        accent: { label: '一期色', default: '#C2410C', options: ['#C2410C', '#1D4ED8', '#0F766E', '#B45309'] },
        accent2: { label: '二期色', default: '#0F766E', options: ['#0F766E', '#7C3AED', '#B45309', '#15803D'] },
        accent3: { label: '三期色', default: '#A16207', options: ['#A16207', '#0369A1', '#BE123C', '#4D7C0F'] }
      },
      fonts: { heading: { label: '标题字体', default: HEI, options: [HEI, SERIF, KAITI, SANS] } }
    },
    presets: [
      { name: '旧纸赭', colors: { bg: '#F3F1EA', card: '#FFFDF8', ink: '#262421', line: '#9A9287', accent: '#C2410C', accent2: '#0F766E', accent3: '#A16207' } },
      { name: '冷青档案', colors: { bg: '#EDF1F3', card: '#FFFFFF', ink: '#15202B', line: '#8794A0', accent: '#1D4ED8', accent2: '#7C3AED', accent3: '#0369A1' } },
      { name: '暮褐写本', colors: { bg: '#F6EFE8', card: '#FBF9F4', ink: '#33261D', line: '#A39584', accent: '#B45309', accent2: '#BE123C', accent3: '#7C3AED' } },
      { name: '松间绿', colors: { bg: '#EEF2EB', card: '#F6FAF6', ink: '#1C271E', line: '#8A9A86', accent: '#15803D', accent2: '#0F766E', accent3: '#4D7C0F' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1440, defaultWidth: 1080, defaultHeight: 1440, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      // 卷首
      { id: 'ts-kicker', type: 'text', content: 'TIMELINE · 一条街二十年', fontFamily: MONO, fontSize: 22, color: { $t: 'colors.accent' }, letterSpacing: 5, x: 88, y: 48, width: 700, height: 32, zIndex: 4, editable: { content: true } },
      { id: 'ts-title', type: 'text', content: '咖啡馆编年', fontFamily: { $t: 'fonts.heading' }, fontSize: 84, fontWeight: '900', color: { $t: 'colors.ink' }, letterSpacing: 4, x: 86, y: 84, width: 908, height: 104, zIndex: 4, animation: { name: 'inkReveal', duration: 1100 }, editable: { content: true, fontSize: { type: 'range', min: 56, max: 104 }, position: true } },
      { id: 'ts-sub', type: 'text', content: '七个节点 / 由卷首读到卷尾 / 口述整理', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.ink' }, opacity: 0.58, x: 88, y: 192, width: 700, height: 36, zIndex: 4, animation: { name: 'fadeIn', duration: 800, delay: 460 }, editable: { content: true, fontSize: { type: 'range', min: 19, max: 33 } } },
      { id: 'ts-rule', type: 'shape', shapeKind: 'rect', x: 88, y: 234, width: 904, height: 2, fill: { $t: 'colors.ink' }, opacity: 0.22, zIndex: 4 },
      // 卷轴上下杆与轴头
      { id: 'ts-rod-t', type: 'shape', shapeKind: 'rect', x: 48, y: 244, width: 984, height: 14, fill: { $t: 'colors.ink' }, opacity: 0.16, borderRadius: 7, zIndex: 2 },
      { id: 'ts-rod-b', type: 'shape', shapeKind: 'rect', x: 48, y: 1362, width: 984, height: 14, fill: { $t: 'colors.ink' }, opacity: 0.16, borderRadius: 7, zIndex: 2 },
      ...[[40, 251], [1024, 251], [40, 1369], [1024, 1369]].map((p, i) => (
        { id: `ts-knob-${i}`, type: 'shape', shapeKind: 'circle', x: p[0], y: p[1] - 14, width: 28, height: 28, fill: { $t: i < 2 ? 'colors.accent' : (i === 2 ? 'colors.accent2' : 'colors.accent3') } as any, opacity: 0.9, zIndex: 3 }
      )) as any,
      // 书脊
      { id: 'ts-spine', type: 'shape', shapeKind: 'rect', x: 538, y: 300, width: 4, height: 920, fill: { $t: 'colors.line' }, opacity: 0.55, zIndex: 3 },
      { id: 'ts-spine-run', type: 'shape', shapeKind: 'rect', x: 538, y: 300, width: 4, height: 560, fill: { $t: 'colors.accent' }, zIndex: 3, animation: { name: 'fadeInDown', duration: 1400, delay: 400 } },
      { id: 'ts-begin', type: 'text', content: '起', fontFamily: KAITI, fontSize: 22, fontWeight: '700', color: { $t: 'colors.accent' }, textAlign: 'center', x: 500, y: 264, width: 80, height: 28, zIndex: 4 },
      { id: 'ts-end', type: 'text', content: '今', fontFamily: KAITI, fontSize: 22, fontWeight: '700', color: { $t: 'colors.accent3' }, textAlign: 'center', x: 500, y: 1226, width: 80, height: 28, zIndex: 4 },
      // 右侧三段时期色带 + 竖排标注
      ...[[300, 320, 'colors.accent', '萌芽期', 447], [630, 320, 'colors.accent2', '扩张期', 777], [960, 260, 'colors.accent3', '沉淀期', 1077]].map((b, i) => [
        { id: `ts-band-${i}`, type: 'shape', shapeKind: 'rect', x: 1040, y: b[0] as number, width: 8, height: b[1] as number, fill: { $t: b[2] } as any, opacity: 0.42, borderRadius: 4, zIndex: 3 },
        { id: `ts-band-t-${i}`, type: 'text', content: (b[3] as string).split('').join(' '), fontFamily: KAITI, fontSize: 22, fontWeight: '700', color: { $t: b[2] } as any, opacity: 0.9, textAlign: 'center', rotation: -90, x: 940, y: b[4] as number, width: 120, height: 26, zIndex: 4 }
      ]).flat() as any,
      // 七个节点（左右交错）
      ...[['2005', '第一间', '咖啡机搬进临街铺面，菜单上只有三种豆子。', 'colors.accent'],
      ['2009', '手冲上桌', '单一产地成了卖点，壶与滤杯进了吧台。', 'colors.accent'],
      ['2013', '自家烘焙', '前店后厂，烘焙日志第一次贴在墙上。', 'colors.accent2'],
      ['2016', '连锁进场', '外资品牌把价格带拉开，也拉高了预期。', 'colors.accent2'],
      ['2020', '外卖年份', '到店缩水一半，小程序救回了流水。', 'colors.accent2'],
      ['2022', '豆子透明', '溯源码印上杯套，烘焙度写成日期。', 'colors.accent3'],
      ['2025', '回到社区', '熟客占到七成，菜单反倒变短了。', 'colors.accent3']].map((n, i) => {
        const y = 350 + i * 132, left = i % 2 === 0
        const cx = left ? 64 : 592
        return [
          { id: `ts-card-${i}`, type: 'shape', shapeKind: 'rect', x: cx, y: y - 72, width: 420, height: 150, fill: { $t: 'colors.card' }, borderRadius: 6, zIndex: 4, shadow: { color: 'rgba(0,0,0,0.08)', blur: 14, offsetX: 0, offsetY: 6 }, animation: { name: left ? 'slideInLeft' : 'slideInRight', duration: 800, delay: 300 + i * 130 } },
          { id: `ts-tick-${i}`, type: 'shape', shapeKind: 'rect', x: left ? 488 : 542, y: y - 1, width: 50, height: 2, fill: { $t: 'colors.line' }, opacity: 0.8, zIndex: 3 },
          { id: `ts-node-${i}`, type: 'shape', shapeKind: 'circle', x: 518, y: y - 22, width: 44, height: 44, fill: { $t: 'colors.card' } as any, border: { color: { $t: n[3] } as any, width: 4, style: 'solid' }, zIndex: 5, animation: { name: 'zoomIn', duration: 460, delay: 420 + i * 130 } },
          { id: `ts-node-in-${i}`, type: 'shape', shapeKind: 'circle', x: 533, y: y - 7, width: 14, height: 14, fill: { $t: n[3] } as any, zIndex: 6 },
          { id: `ts-year-${i}`, type: 'text', content: n[0] as string, fontFamily: MONO, fontSize: 26, fontWeight: '700', color: { $t: n[3] } as any, x: cx + 24, y: y - 58, width: 200, height: 30, zIndex: 5, editable: { content: true } },
          { id: `ts-name-${i}`, type: 'text', content: n[1] as string, fontFamily: { $t: 'fonts.heading' } as any, fontSize: 32, fontWeight: '800', color: { $t: 'colors.ink' } as any, x: cx + 24, y: y - 24, width: 372, height: 38, zIndex: 5, editable: { content: true, fontSize: { type: 'range', min: 24, max: 44 } } },
          { id: `ts-desc-${i}`, type: 'text', content: n[2] as string, fontFamily: HEI, fontSize: 22, color: { $t: 'colors.ink' } as any, opacity: 0.62, lineHeight: 1.42, x: cx + 24, y: y + 18, width: 372, height: 60, zIndex: 5, editable: { content: true } }
        ]
      }).flat() as any,
      // 卷尾小结
      { id: 'ts-sum', type: 'shape', shapeKind: 'rect', x: 64, y: 1262, width: 948, height: 52, fill: { $t: 'colors.ink' }, opacity: 0.07, borderRadius: 6, zIndex: 3 },
      { id: 'ts-sum-t', type: 'text', content: '廿年 · 从三豆到一码', fontFamily: KAITI, fontSize: 26, fontWeight: '700', color: { $t: 'colors.accent' }, x: 88, y: 1272, width: 420, height: 32, zIndex: 4, editable: { content: true } },
      { id: 'ts-sum-b', type: 'text', content: '菜单变短，关系变长。', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.ink' }, opacity: 0.66, textAlign: 'right', x: 520, y: 1274, width: 472, height: 30, zIndex: 4, editable: { content: true } },
      { id: 'ts-foot-l', type: 'text', content: '整理 / 街区内 12 家店主口述　·　2005—2025', fontFamily: MONO, fontSize: 18, color: { $t: 'colors.ink' }, opacity: 0.42, x: 88, y: 1326, width: 620, height: 28, zIndex: 4 },
      { id: 'ts-foot-r', type: 'text', content: '07 NODES', fontFamily: MONO, fontSize: 18, color: { $t: 'colors.accent2' }, letterSpacing: 3, textAlign: 'right', x: 720, y: 1326, width: 292, height: 28, zIndex: 4 },
      { id: 'ts-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1440, background: `url("${grain(300, 61, 0.85)}")`, opacity: 0.12, mixBlendMode: 'multiply', zIndex: 8 }
    ]
  }
]

// src/core/templates/parenting/parenting-cards.ts —— 母婴·亲子大类第一批（6 个高频场景 · 覆盖 4:5 / 9:16 / 1:1 / 3:4）
// 口径：育儿干货卡 / 月度成长记录 / 一周辅食计划 / 早教游戏卡 / 遛娃去处安利 / 今日心情打卡。
// 视角：新手父母本人的记录口吻 —— 手账 + 数据 + 清单，不卖萌不灌鸡汤；括号里那句是重点。
// 颜色全走 token（每个 3~5 色 · 4 套预设）；装饰底纹一律 rgba 以跟随换色。
import type { Template } from '@/types/types'
import {HEI, SONG, MONO, SANS, IMPACT, SERIF, halftone, star, tapeSoft, scribble, tape} from '../_fx/trend'
import { svgUri } from '../_fx/common'

// 成长曲线：双折线（实线主指标 + 虚线次指标）+ 网格 + 月龄刻度，颜色走中性 rgba 以适配任意预设
function growthChart(w: number, h: number, v1: number[], v2: number[]) {
  const n = v1.length
  const px = (i: number) => 22 + (i * (w - 44)) / (n - 1)
  const py = (v: number) => h - 56 - v * (h - 122)
  const line = (v: number[]) => v.map((y, i) => `${i ? 'L' : 'M'}${px(i).toFixed(1)} ${py(y).toFixed(1)}`).join(' ')
  let s = ''
  for (let g = 0; g < 4; g++) {
    const gy = (26 + g * ((h - 122) / 3)).toFixed(1)
    s += `<line x1='22' y1='${gy}' x2='${w - 22}' y2='${gy}' stroke='rgba(36,48,56,0.12)' stroke-width='2' stroke-dasharray='5 9'/>`
  }
  s += `<path d='${line(v1)} L${px(n - 1).toFixed(1)} ${h - 56} L${px(0).toFixed(1)} ${h - 56} Z' fill='rgba(36,48,56,0.07)'/>`
  s += `<path d='${line(v2)}' fill='none' stroke='rgba(36,48,56,0.32)' stroke-width='5' stroke-dasharray='14 11' stroke-linecap='round'/>`
  s += `<path d='${line(v1)}' fill='none' stroke='rgba(36,48,56,0.72)' stroke-width='8' stroke-linejoin='round' stroke-linecap='round'/>`
  v1.forEach((y, i) => { s += `<circle cx='${px(i).toFixed(1)}' cy='${py(y).toFixed(1)}' r='10' fill='%23FFFFFF' stroke='rgba(36,48,56,0.72)' stroke-width='5'/>` })
  v2.forEach((y, i) => { s += `<circle cx='${px(i).toFixed(1)}' cy='${py(y).toFixed(1)}' r='6' fill='rgba(36,48,56,0.32)'/>` })
  for (let i = 0; i < n; i++) s += `<text x='${px(i).toFixed(1)}' y='${h - 12}' font-family='Consolas,Menlo,monospace' font-size='26' fill='rgba(36,48,56,0.5)' text-anchor='middle'>${i + 1}</text>`
  s += `<line x1='22' y1='${h - 56}' x2='${w - 22}' y2='${h - 56}' stroke='rgba(36,48,56,0.3)' stroke-width='3'/>`
  return svgUri(s, w, h)
}
// 方格记录纸：横细线 + 左页边距红线（用 rgba，换预设不露馅）
function ledgerBg(w: number, h: number, gap: number) {
  let s = ''
  for (let y = gap; y < h; y += gap) s += `<line x1='0' y1='${y}' x2='${w}' y2='${y}' stroke='rgba(36,48,56,0.07)' stroke-width='2'/>`
  for (let x = gap; x < w; x += gap) s += `<line x1='${x}' y1='0' x2='${x}' y2='${h}' stroke='rgba(36,48,56,0.045)' stroke-width='2'/>`
  return svgUri(s, w, h)
}
// 右上角标：压角的直角三角旗
function cornerFlag(size: number, fill: string) {
  return svgUri(`<path d='M${size} 0 L${size} ${size} L0 0 Z' fill='${fill}'/><path d='M${size * 0.62} 0 L${size} 0 L${size} ${size * 0.38}' fill='rgba(0,0,0,0.12)'/>`, size, size)
}
// 便签纸：四角微抖的矩形，贴上去有手写感（与纯可爱风的圆软糖区分）
function stickyNote(size: number, fill: string) {
  return svgUri(`<polygon points='${(size * 0.04).toFixed(1)},${(size * 0.1).toFixed(1)} ${(size * 0.94).toFixed(1)},0 ${size},${(size * 0.88).toFixed(1)} ${(size * 0.08).toFixed(1)},${size}' fill='${fill}'/>`, size, size)
}
// 虚线相框角标（照片虚位的四个直角夹）
function photoCorners(size: number, stroke: string) {
  const a = size * 0.26, t = 7
  const one = (x: number, y: number, dx: number, dy: number) =>
    `<rect x='${x}' y='${y}' width='${dx ? a : t}' height='${dx ? t : a}' fill='${stroke}'/>`
  return svgUri(one(0, 0, 1, 0) + one(size - a, 0, 1, 0) + one(0, size - t, 1, 0) + one(size - a, size - t, 1, 0)
    + one(0, 0, 0, 1) + one(size - t, 0, 0, 1) + one(0, size - a, 0, 1) + one(size - t, size - a, 0, 1), size, size)
}

export const parentingTemplates: Template[] = [
  // 1. 育儿干货卡 —— 月龄标签 + 要点三行 + 「亲测有效」印章，4:5 小红书信息卡
  {
    id: 'parenting-tip-card', name: '育儿干货卡', version: '1.0.0', category: 'parenting',
    tags: ['parenting', 'tip-card', 'sleep-training', 'checklist', '4:5'],
    thumbnail: svgUri('<rect width="160" height="200" fill="%23FBF3E4"/><g fill="rgba(44,36,25,0.10)"><circle cx="24" cy="24" r="1.5"/><circle cx="64" cy="18" r="1.5"/><circle cx="132" cy="30" r="1.5"/><circle cx="40" cy="184" r="1.5"/><circle cx="120" cy="168" r="1.5"/></g><rect x="12" y="16" width="46" height="14" rx="7" fill="%233F7D6B"/><rect x="66" y="20" width="44" height="6" rx="3" fill="%238A7A63"/><rect x="12" y="42" width="86" height="16" rx="2" fill="%232C2419"/><rect x="12" y="62" width="86" height="16" rx="2" fill="%233F7D6B"/><path d="M12 92 Q 26 86 40 92 T 70 92 T 100 92" fill="none" stroke="%23C2452E" stroke-width="3" opacity="0.5"/><g fill="%233F7D6B"><circle cx="18" cy="110" r="5"/><circle cx="18" cy="130" r="5"/><circle cx="18" cy="150" r="5"/></g><g fill="%232C2419" opacity="0.72"><rect x="30" y="107" width="72" height="6" rx="2"/><rect x="30" y="127" width="60" height="6" rx="2"/><rect x="30" y="147" width="66" height="6" rx="2"/></g><g transform="rotate(-14 126 150)"><circle cx="126" cy="150" r="26" fill="none" stroke="%23C2452E" stroke-width="3"/><text x="126" y="146" font-family="sans-serif" font-size="11" font-weight="700" fill="%23C2452E" text-anchor="middle">亲测有效</text><text x="126" y="162" font-family="sans-serif" font-size="6" fill="%23C2452E" text-anchor="middle">真不是广告</text></g><rect x="12" y="178" width="52" height="5" rx="2" fill="%238A7A63"/>', 160, 200),
    tokens: {
      colors: {
        bg: { label: '纸色', default: '#FBF3E4', options: ['#FBF3E4', '#EDF2F5', '#F0F4E8', '#F8EEEE'] },
        ink: { label: '主文字', default: '#2C2419', options: ['#2C2419', '#1D2A33', '#26301E', '#33212A'] },
        accent: { label: '记号绿', default: '#3F7D6B', options: ['#3F7D6B', '#3E6E8E', '#6B8E3D', '#A9586B'] },
        seal: { label: '印章红', default: '#C2452E', options: ['#C2452E', '#C0563E', '#C2612E', '#B23A48'] },
        dim: { label: '弱文字', default: '#8A7A63', options: ['#8A7A63', '#7D8F9C', '#85907A', '#9C8089'] }
      },
      fonts: { heading: { label: '标题字体', default: HEI, options: [HEI, SONG] } }
    },
    presets: [
      { name: '燕麦暖纸', colors: { bg: '#FBF3E4', ink: '#2C2419', accent: '#3F7D6B', seal: '#C2452E', dim: '#8A7A63' } },
      { name: '雾蓝夜奶', colors: { bg: '#EDF2F5', ink: '#1D2A33', accent: '#3E6E8E', seal: '#C0563E', dim: '#7D8F9C' } },
      { name: '抹茶辅食', colors: { bg: '#F0F4E8', ink: '#26301E', accent: '#6B8E3D', seal: '#C2612E', dim: '#85907A' } },
      { name: '藕粉哄睡', colors: { bg: '#F8EEEE', ink: '#33212A', accent: '#A9586B', seal: '#B23A48', dim: '#9C8089' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'pc-bg', type: 'image', src: halftone(1080, 1350, 2.4, 58, 'rgba(44,36,25,0.07)'), x: 0, y: 0, width: 1080, height: 1350, objectFit: 'fill', zIndex: 1 },
      { id: 'pc-rule', type: 'shape', shapeKind: 'rect', x: 48, y: 148, width: 984, height: 3, fill: 'rgba(44,36,25,0.20)', zIndex: 3 },
      { id: 'pc-age', type: 'shape', shapeKind: 'rect', x: 48, y: 64, width: 228, height: 64, borderRadius: 999, fill: { $t: 'colors.accent' }, zIndex: 3 },
      { id: 'pc-age-t', type: 'text', content: '8-10 月龄', fontFamily: MONO, fontSize: 28, fontWeight: 700, color: { $t: 'colors.bg' }, textAlign: 'center', x: 48, y: 78, width: 228, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'pc-cat', type: 'text', content: '睡眠篇 · 亲测三件事', fontFamily: HEI, fontSize: 28, letterSpacing: 1, color: { $t: 'colors.dim' }, x: 300, y: 80, width: 520, height: 44, zIndex: 4, editable: { content: true } },
      { id: 'pc-t1', type: 'text', content: '一夜六醒', fontFamily: { $t: 'fonts.heading' }, fontSize: 120, fontWeight: 900, letterSpacing: 2, color: { $t: 'colors.ink' }, x: 48, y: 178, width: 620, height: 186, zIndex: 3, animation: { name: 'fadeInUp', duration: 520, delay: 0 }, editable: { content: true, fontSize: { type: 'range', min: 76, max: 140 } } },
      { id: 'pc-t2', type: 'text', content: '改成一觉', fontFamily: { $t: 'fonts.heading' }, fontSize: 120, fontWeight: 900, letterSpacing: 2, color: { $t: 'colors.accent' }, x: 48, y: 356, width: 620, height: 186, zIndex: 3, animation: { name: 'fadeInUp', duration: 520, delay: 130 }, editable: { content: true, fontSize: { type: 'range', min: 76, max: 140 } } },
      { id: 'pc-u', type: 'image', src: scribble(560, 26, 'rgba(194,69,46,0.6)', 6), x: 48, y: 548, width: 560, height: 26, objectFit: 'fill', zIndex: 4 },
      { id: 'pc-sub', type: 'text', content: '（不是我厉害，是他终于肯睡了）', fontFamily: HEI, fontSize: 34, color: { $t: 'colors.dim' }, x: 48, y: 590, width: 900, height: 56, zIndex: 3, editable: { content: true } },
      { id: 'pc-c1', group: 'pc-c', type: 'shape', shapeKind: 'circle', x: 48, y: 698, width: 42, height: 42, fill: { $t: 'colors.accent' }, zIndex: 3 },
      { id: 'pc-tick1', type: 'text', content: '✓', fontFamily: SANS, fontSize: 28, fontWeight: 700, color: { $t: 'colors.bg' }, textAlign: 'center', x: 48, y: 702, width: 42, height: 36, zIndex: 4 },
      { id: 'pc-r1', type: 'text', content: '睡前那顿喂够 · 奶量提到 240ml', fontFamily: HEI, fontSize: 34, color: { $t: 'colors.ink' }, x: 116, y: 690, width: 880, height: 58, zIndex: 3, animation: { name: 'rise', duration: 480, delay: 260 }, editable: { content: true } },
      { id: 'pc-c2', group: 'pc-c', type: 'shape', shapeKind: 'circle', x: 48, y: 790, width: 42, height: 42, fill: { $t: 'colors.accent' }, zIndex: 3 },
      { id: 'pc-tick2', type: 'text', content: '✓', fontFamily: SANS, fontSize: 28, fontWeight: 700, color: { $t: 'colors.bg' }, textAlign: 'center', x: 48, y: 794, width: 42, height: 36, zIndex: 4 },
      { id: 'pc-r2', type: 'text', content: '放下前拍哄 3 分钟 · 不抱睡', fontFamily: HEI, fontSize: 34, color: { $t: 'colors.ink' }, x: 116, y: 782, width: 880, height: 58, zIndex: 3, animation: { name: 'rise', duration: 480, delay: 260 }, editable: { content: true } },
      { id: 'pc-c3', group: 'pc-c', type: 'shape', shapeKind: 'circle', x: 48, y: 882, width: 42, height: 42, fill: { $t: 'colors.accent' }, zIndex: 3 },
      { id: 'pc-tick3', type: 'text', content: '✓', fontFamily: SANS, fontSize: 28, fontWeight: 700, color: { $t: 'colors.bg' }, textAlign: 'center', x: 48, y: 886, width: 42, height: 36, zIndex: 4 },
      { id: 'pc-r3', type: 'text', content: '夜里哼唧先等 30 秒 · 他能自己接上', fontFamily: HEI, fontSize: 34, color: { $t: 'colors.ink' }, x: 116, y: 874, width: 880, height: 58, zIndex: 3, animation: { name: 'rise', duration: 480, delay: 260 }, editable: { content: true } },
      { id: 'pc-stamp-ring', type: 'shape', shapeKind: 'rect', x: 744, y: 980, width: 264, height: 264, borderRadius: 999, border: { width: 9, color: { $t: 'colors.seal' } }, rotation: -14, zIndex: 6, animation: { name: 'float', duration: 5200, iterationCount: 'infinite' } },
      { id: 'pc-stamp-t', type: 'text', content: '亲测有效', fontFamily: { $t: 'fonts.heading' }, fontSize: 58, fontWeight: 900, color: { $t: 'colors.seal' }, textAlign: 'center', rotation: -14, x: 744, y: 1048, width: 264, height: 90, zIndex: 7, editable: { content: true } },
      { id: 'pc-stamp-s', type: 'text', content: '真不是广告', fontFamily: HEI, fontSize: 24, letterSpacing: 2, color: { $t: 'colors.seal' }, textAlign: 'center', rotation: -14, x: 744, y: 1146, width: 264, height: 42, zIndex: 7, editable: { content: true } },
      { id: 'pc-foot', type: 'text', content: '记录人：一个困到产生幻觉的妈', fontFamily: HEI, fontSize: 34, color: { $t: 'colors.ink' }, x: 48, y: 1000, width: 660, height: 58, zIndex: 4, editable: { content: true } },
      { id: 'pc-foot2', type: 'text', content: '干货目录 → 主页置顶（更新很慢，抱歉）', fontFamily: HEI, fontSize: 28, color: { $t: 'colors.dim' }, x: 48, y: 1072, width: 660, height: 48, zIndex: 4, editable: { content: true } },
      { id: 'pc-star', type: 'image', src: star(52, 'rgba(194,69,46,0.5)'), x: 908, y: 190, width: 52, height: 52, objectFit: 'contain', zIndex: 5, animation: { name: 'twinkle', duration: 2400, iterationCount: 'infinite' } }
    ]
  },

  // 2. 宝宝月度成长记录 —— 身高体重曲线位 + 新技能清单 + 照片虚位，9:16 成长档案
  {
    id: 'parenting-growth-log', name: '宝宝月度成长记录', version: '1.0.0', category: 'parenting',
    tags: ['parenting', 'growth-log', 'monthly', 'record', '9:16'],
    thumbnail: svgUri('<rect width="160" height="284" fill="%23F6F2E9"/><g fill="rgba(36,48,56,0.06)"><circle cx="30" cy="30" r="1.4"/><circle cx="120" cy="20" r="1.4"/><circle cx="60" cy="270" r="1.4"/><circle cx="140" cy="200" r="1.4"/></g><rect x="12" y="14" width="40" height="11" rx="5.5" fill="%234F7D8C"/><rect x="12" y="36" width="92" height="14" rx="2" fill="%23243038"/><rect x="12" y="56" width="70" height="14" rx="2" fill="%234F7D8C"/><g fill="rgba(36,48,56,0.07)"><rect x="12" y="82" width="40" height="34" rx="3"/><rect x="58" y="82" width="40" height="34" rx="3"/><rect x="104" y="82" width="40" height="34" rx="3"/></g><g fill="%23243038" opacity="0.7"><rect x="18" y="90" width="20" height="4" rx="1"/><rect x="64" y="90" width="20" height="4" rx="1"/><rect x="110" y="90" width="20" height="4" rx="1"/></g><rect x="12" y="130" width="132" height="56" rx="4" fill="%23FFFFFF" opacity="0.5"/><path d="M18 176 L44 166 L70 156 L96 142 L122 132 L140 124" fill="none" stroke="%23243038" stroke-width="2.4" opacity="0.7"/><path d="M18 182 L44 176 L70 170 L96 162 L122 154 L140 148" fill="none" stroke="%23243038" stroke-width="1.4" stroke-dasharray="4 3" opacity="0.35"/><g fill="%23D98A46"><circle cx="44" cy="166" r="2.6"/><circle cx="96" cy="142" r="2.6"/></g><g fill="%23243038" opacity="0.6"><circle cx="18" cy="200" r="3"/><rect x="26" y="198" width="56" height="4" rx="1"/><circle cx="18" cy="214" r="3"/><rect x="26" y="212" width="48" height="4" rx="1"/><circle cx="18" cy="228" r="3"/><rect x="26" y="226" width="52" height="4" rx="1"/></g><rect x="12" y="240" width="64" height="34" rx="2" fill="none" stroke="%23243038" stroke-width="1.6" stroke-dasharray="4 3"/><rect x="8" y="238" width="20" height="7" fill="rgba(255,255,255,0.7)" transform="rotate(-32 18 241)"/><g fill="%234F7D8C"><rect x="88" y="252" width="56" height="6" rx="2"/><rect x="88" y="264" width="40" height="5" rx="2"/></g>', 160, 284),
    tokens: {
      colors: {
        bg: { label: '档案纸', default: '#F6F2E9', options: ['#F6F2E9', '#EEF3F1', '#F7F0EC', '#EFF1F6'] },
        ink: { label: '主文字', default: '#243038', options: ['#243038', '#1C2E28', '#38271F', '#232733'] },
        accent: { label: '记录蓝', default: '#4F7D8C', options: ['#4F7D8C', '#4C8B6B', '#9A6B4F', '#5A6B96'] },
        warm: { label: '强调橙', default: '#D98A46', options: ['#D98A46', '#C2703D', '#B4553F', '#7E6BC4'] },
        dim: { label: '弱文字', default: '#8D8577', options: ['#8D8577', '#7B8B84', '#94837A', '#7C8091'] }
      },
      fonts: { heading: { label: '标题字体', default: HEI, options: [HEI, SONG] } }
    },
    presets: [
      { name: '奶油档案', colors: { bg: '#F6F2E9', ink: '#243038', accent: '#4F7D8C', warm: '#D98A46', dim: '#8D8577' } },
      { name: '豆绿体检', colors: { bg: '#EEF3F1', ink: '#1C2E28', accent: '#4C8B6B', warm: '#C2703D', dim: '#7B8B84' } },
      { name: '燕麦清晨', colors: { bg: '#F7F0EC', ink: '#38271F', accent: '#9A6B4F', warm: '#B4553F', dim: '#94837A' } },
      { name: '雾紫深夜', colors: { bg: '#EFF1F6', ink: '#232733', accent: '#5A6B96', warm: '#7E6BC4', dim: '#7C8091' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1920, defaultWidth: 1080, defaultHeight: 1920, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'gl-bg', type: 'image', src: ledgerBg(1080, 1920, 72), x: 0, y: 0, width: 1080, height: 1920, objectFit: 'fill', zIndex: 1 },
      { id: 'gl-month', type: 'shape', shapeKind: 'rect', x: 48, y: 68, width: 232, height: 64, borderRadius: 999, fill: { $t: 'colors.accent' }, zIndex: 3 },
      { id: 'gl-month-t', type: 'text', content: '第 9 个月', fontFamily: MONO, fontSize: 28, fontWeight: 700, color: { $t: 'colors.bg' }, textAlign: 'center', x: 48, y: 82, width: 232, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'gl-no', type: 'text', content: '成长记录 · NO.09', fontFamily: MONO, fontSize: 28, letterSpacing: 2, color: { $t: 'colors.dim' }, x: 320, y: 84, width: 520, height: 44, zIndex: 3, editable: { content: true } },
      { id: 'gl-t1', type: 'text', content: '本月成长结算', fontFamily: { $t: 'fonts.heading' }, fontSize: 84, fontWeight: 900, letterSpacing: 2, color: { $t: 'colors.ink' }, x: 48, y: 172, width: 940, height: 132, zIndex: 3, animation: { name: 'slideInLeft', duration: 520, delay: 0 }, editable: { content: true, fontSize: { type: 'range', min: 56, max: 96 } } },
      { id: 'gl-sub', type: 'text', content: '（体重、身长、头围都在涨，只有我的头发在跌）', fontFamily: HEI, fontSize: 34, color: { $t: 'colors.dim' }, x: 48, y: 322, width: 960, height: 58, zIndex: 3, animation: { name: 'fadeIn', duration: 460, delay: 130 }, editable: { content: true } },
      { id: 'gl-k1', group: 'gl-k', type: 'shape', shapeKind: 'rect', x: 48, y: 424, width: 300, height: 196, borderRadius: 24, fill: 'rgba(36,48,56,0.06)', zIndex: 3 },
      { id: 'gl-k1-l', type: 'text', content: '身高', fontFamily: HEI, fontSize: 28, color: { $t: 'colors.dim' }, textAlign: 'center', x: 48, y: 448, width: 300, height: 44, zIndex: 4, editable: { content: true } },
      { id: 'gl-k1-n', type: 'text', content: '68.2 cm', fontFamily: MONO, fontSize: 58, fontWeight: 700, color: { $t: 'colors.accent' }, textAlign: 'center', x: 48, y: 500, width: 300, height: 82, zIndex: 4, editable: { content: true } },
      { id: 'gl-k1-d', type: 'text', content: '↑ 2.1 cm', fontFamily: MONO, fontSize: 24, color: { $t: 'colors.warm' }, textAlign: 'center', x: 48, y: 578, width: 300, height: 36, zIndex: 4, editable: { content: true } },
      { id: 'gl-k2', group: 'gl-k', type: 'shape', shapeKind: 'rect', x: 390, y: 424, width: 300, height: 196, borderRadius: 24, fill: 'rgba(36,48,56,0.06)', zIndex: 3 },
      { id: 'gl-k2-l', type: 'text', content: '体重', fontFamily: HEI, fontSize: 28, color: { $t: 'colors.dim' }, textAlign: 'center', x: 390, y: 448, width: 300, height: 44, zIndex: 4, editable: { content: true } },
      { id: 'gl-k2-n', type: 'text', content: '8.1 kg', fontFamily: MONO, fontSize: 58, fontWeight: 700, color: { $t: 'colors.accent' }, textAlign: 'center', x: 390, y: 500, width: 300, height: 82, zIndex: 4, editable: { content: true } },
      { id: 'gl-k2-d', type: 'text', content: '↑ 0.4 kg', fontFamily: MONO, fontSize: 24, color: { $t: 'colors.warm' }, textAlign: 'center', x: 390, y: 578, width: 300, height: 36, zIndex: 4, editable: { content: true } },
      { id: 'gl-k3', group: 'gl-k', type: 'shape', shapeKind: 'rect', x: 732, y: 424, width: 300, height: 196, borderRadius: 24, fill: 'rgba(36,48,56,0.06)', zIndex: 3 },
      { id: 'gl-k3-l', type: 'text', content: '头围', fontFamily: HEI, fontSize: 28, color: { $t: 'colors.dim' }, textAlign: 'center', x: 732, y: 448, width: 300, height: 44, zIndex: 4, editable: { content: true } },
      { id: 'gl-k3-n', type: 'text', content: '43.5 cm', fontFamily: MONO, fontSize: 58, fontWeight: 700, color: { $t: 'colors.accent' }, textAlign: 'center', x: 732, y: 500, width: 300, height: 82, zIndex: 4, editable: { content: true } },
      { id: 'gl-k3-d', type: 'text', content: '↑ 0.6 cm', fontFamily: MONO, fontSize: 24, color: { $t: 'colors.warm' }, textAlign: 'center', x: 732, y: 578, width: 300, height: 36, zIndex: 4, editable: { content: true } },
      { id: 'gl-sec1', type: 'text', content: '身高体重曲线', fontFamily: { $t: 'fonts.heading' }, fontSize: 40, fontWeight: 900, color: { $t: 'colors.ink' }, x: 48, y: 682, width: 560, height: 62, zIndex: 3, editable: { content: true } },
      { id: 'gl-chart', type: 'image', src: growthChart(888, 300, [0.12, 0.26, 0.38, 0.5, 0.62, 0.74, 0.83, 0.9, 0.98], [0.16, 0.3, 0.42, 0.55, 0.63, 0.72, 0.79, 0.85, 0.9]), x: 96, y: 762, width: 888, height: 300, objectFit: 'fill', zIndex: 3, editable: { content: true } },
      { id: 'gl-lg1', type: 'text', content: '— 身高', fontFamily: HEI, fontSize: 24, color: { $t: 'colors.accent' }, x: 48, y: 1082, width: 176, height: 40, zIndex: 3, editable: { content: true } },
      { id: 'gl-lg2', type: 'text', content: '— 体重', fontFamily: HEI, fontSize: 24, color: { $t: 'colors.warm' }, x: 240, y: 1082, width: 176, height: 40, zIndex: 3, editable: { content: true } },
      { id: 'gl-cap', type: 'text', content: '曲线一路上扬 · 头发没有', fontFamily: HEI, fontSize: 28, color: { $t: 'colors.dim' }, textAlign: 'right', x: 520, y: 1078, width: 512, height: 46, zIndex: 3, editable: { content: true } },
      { id: 'gl-sec2', type: 'text', content: '本月新技能清单', fontFamily: { $t: 'fonts.heading' }, fontSize: 40, fontWeight: 900, color: { $t: 'colors.ink' }, x: 48, y: 1168, width: 620, height: 62, zIndex: 3, editable: { content: true } },
      { id: 'gl-b1', group: 'gl-b', type: 'shape', shapeKind: 'circle', x: 48, y: 1274, width: 36, height: 36, fill: { $t: 'colors.warm' }, zIndex: 3 },
      { id: 'gl-r1', type: 'text', content: '独立翻身 · 两侧都会（非常得意）', fontFamily: HEI, fontSize: 34, color: { $t: 'colors.ink' }, x: 112, y: 1264, width: 880, height: 58, zIndex: 3, animation: { name: 'rise', duration: 480, delay: 260 }, editable: { content: true } },
      { id: 'gl-b2', group: 'gl-b', type: 'shape', shapeKind: 'circle', x: 48, y: 1360, width: 36, height: 36, fill: { $t: 'colors.warm' }, zIndex: 3 },
      { id: 'gl-r2', type: 'text', content: '扶站 3 秒 · 松手 0 秒（接得很快）', fontFamily: HEI, fontSize: 34, color: { $t: 'colors.ink' }, x: 112, y: 1350, width: 880, height: 58, zIndex: 3, editable: { content: true } },
      { id: 'gl-b3', group: 'gl-b', type: 'shape', shapeKind: 'circle', x: 48, y: 1446, width: 36, height: 36, border: { width: 3, color: { $t: 'colors.dim' } }, zIndex: 3 },
      { id: 'gl-r3', type: 'text', content: '叫人 · 会喊「妈」，只喊一次', fontFamily: HEI, fontSize: 34, color: { $t: 'colors.dim' }, x: 112, y: 1436, width: 880, height: 58, zIndex: 3, editable: { content: true } },
      { id: 'gl-photo', type: 'shape', shapeKind: 'rect', x: 48, y: 1540, width: 452, height: 288, borderRadius: 12, border: { width: 5, style: 'dashed', color: { $t: 'colors.ink' } }, zIndex: 3, animation: { name: 'float', duration: 5200, iterationCount: 'infinite' } },
      { id: 'gl-photo-t', type: 'text', content: '本月最佳一张', fontFamily: HEI, fontSize: 28, color: { $t: 'colors.ink' }, opacity: 0.8, textAlign: 'center', x: 48, y: 1656, width: 452, height: 44, zIndex: 4, editable: { content: true } },
      { id: 'gl-photo-c', type: 'text', content: '拖图替换（背景乱是正常的）', fontFamily: HEI, fontSize: 24, color: { $t: 'colors.dim' }, textAlign: 'center', x: 48, y: 1704, width: 452, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'gl-tape', type: 'image', src: tapeSoft(190, 52, 'rgba(255,255,255,0.75)'), x: 30, y: 1512, width: 190, height: 52, objectFit: 'contain', rotation: -34, zIndex: 5 },
      { id: 'gl-n1', type: 'text', content: '本月关键词：站', fontFamily: { $t: 'fonts.heading' }, fontSize: 34, fontWeight: 700, color: { $t: 'colors.accent' }, x: 548, y: 1552, width: 484, height: 58, zIndex: 3, editable: { content: true } },
      { id: 'gl-n2', type: 'text', content: '睡整觉：2 晚（另外 5 晚不算）', fontFamily: HEI, fontSize: 28, color: { $t: 'colors.ink' }, x: 548, y: 1624, width: 484, height: 48, zIndex: 3, editable: { content: true } },
      { id: 'gl-n3', type: 'text', content: '总结：体重 ↑ 钱包 ↓', fontFamily: MONO, fontSize: 24, color: { $t: 'colors.dim' }, x: 548, y: 1686, width: 484, height: 40, zIndex: 3, editable: { content: true } },
      { id: 'gl-n4', type: 'text', content: '下月目标：他少哭一次，我多睡两小时', fontFamily: HEI, fontSize: 28, color: { $t: 'colors.warm' }, x: 548, y: 1742, width: 484, height: 48, zIndex: 3, animation: { name: 'fadeInUp', duration: 480, delay: 130 }, editable: { content: true } },
      { id: 'gl-star', type: 'image', src: star(56, 'rgba(217,138,70,0.55)'), x: 950, y: 690, width: 56, height: 56, objectFit: 'contain', zIndex: 5, animation: { name: 'twinkle', duration: 2600, iterationCount: 'infinite' } }
    ]
  },

  // 3. 一周辅食计划 —— 七天格 + 餐点短句 + 避雷角标，1:1 排班表感
  {
    id: 'parenting-meal-plan', name: '一周辅食计划', version: '1.0.0', category: 'parenting',
    tags: ['parenting', 'meal-plan', 'baby-food', 'weekly', '1:1'],
    thumbnail: svgUri('<rect width="160" height="160" fill="%23F3EFE4"/><g fill="rgba(45,58,44,0.05)"><rect x="0" y="14" width="160" height="1"/><rect x="0" y="42" width="160" height="1"/><rect x="0" y="118" width="160" height="1"/></g><rect x="10" y="12" width="74" height="13" rx="2" fill="%232D3A2C"/><rect x="10" y="30" width="52" height="5" rx="2" fill="%237C8674"/><path d="M160 8 L160 46 L122 8 Z" fill="%23C0563C"/><text x="140" y="27" font-family="sans-serif" font-size="9" font-weight="700" fill="%23FFFDF6" text-anchor="middle" transform="rotate(45 140 24)">避雷</text><g fill="%232D3A2C"><rect x="10" y="46" width="26" height="8" rx="4" opacity="0.12"/><rect x="10" y="62" width="26" height="8" rx="4" opacity="0.12"/><rect x="10" y="78" width="26" height="8" rx="4" opacity="0.12"/><rect x="10" y="94" width="26" height="8" rx="4" opacity="0.12"/><rect x="10" y="110" width="26" height="8" rx="4" opacity="0.12"/></g><g fill="%236E8B4F"><rect x="42" y="48" width="70" height="4" rx="2"/><rect x="42" y="64" width="58" height="4" rx="2"/><rect x="42" y="80" width="76" height="4" rx="2"/><rect x="42" y="96" width="62" height="4" rx="2"/><rect x="42" y="112" width="68" height="4" rx="2"/></g><g fill="%232D3A2C" opacity="0.4"><rect x="120" y="48" width="26" height="4" rx="2"/><rect x="120" y="64" width="20" height="4" rx="2"/><rect x="120" y="80" width="28" height="4" rx="2"/><rect x="120" y="96" width="22" height="4" rx="2"/><rect x="120" y="112" width="24" height="4" rx="2"/></g><rect x="8" y="130" width="144" height="18" rx="5" fill="rgba(45,58,44,0.08)"/><rect x="14" y="137" width="96" height="4" rx="2" fill="%23C0563C"/><circle cx="128" cy="24" r="3" fill="%23E0A244"/><circle cx="140" cy="24" r="3" fill="%23E0A244"/><circle cx="152" cy="24" r="3" fill="%23E0A244"/>', 160, 160),
    tokens: {
      colors: {
        bg: { label: '餐桌纸', default: '#F3EFE4', options: ['#F3EFE4', '#EDF1F3', '#F6EFE7', '#EFF2E7'] },
        ink: { label: '主文字', default: '#2D3A2C', options: ['#2D3A2C', '#22303A', '#3A2C24', '#2C2637'] },
        veg: { label: '蔬菜绿', default: '#6E8B4F', options: ['#6E8B4F', '#4E7E86', '#A6693F', '#7A5C93'] },
        warn: { label: '避雷红', default: '#C0563C', options: ['#C0563C', '#B8453F', '#C2612E', '#9E3B57'] },
        dim: { label: '弱文字', default: '#7C8674', options: ['#7C8674', '#75838C', '#8C7B6D', '#7F7A8A'] }
      },
      fonts: { heading: { label: '标题字体', default: HEI, options: [HEI, SONG] } }
    },
    presets: [
      { name: '田园绿', colors: { bg: '#F3EFE4', ink: '#2D3A2C', veg: '#6E8B4F', warn: '#C0563C', dim: '#7C8674' } },
      { name: '海盐蓝', colors: { bg: '#EDF1F3', ink: '#22303A', veg: '#4E7E86', warn: '#B8453F', dim: '#75838C' } },
      { name: '南瓜橙', colors: { bg: '#F6EFE7', ink: '#3A2C24', veg: '#A6693F', warn: '#C2612E', dim: '#8C7B6D' } },
      { name: '紫薯泥', colors: { bg: '#EFF2E7', ink: '#2C2637', veg: '#7A5C93', warn: '#9E3B57', dim: '#7F7A8A' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1080, defaultWidth: 1080, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'mp-bg', type: 'image', src: ledgerBg(1080, 1080, 72), x: 0, y: 0, width: 1080, height: 1080, objectFit: 'fill', zIndex: 1 },
      { id: 'mp-t1', type: 'text', content: '一周辅食计划', fontFamily: { $t: 'fonts.heading' }, fontSize: 58, fontWeight: 900, letterSpacing: 2, color: { $t: 'colors.ink' }, x: 48, y: 56, width: 620, height: 92, zIndex: 3, animation: { name: 'slideInLeft', duration: 500, delay: 0 }, editable: { content: true, fontSize: { type: 'range', min: 40, max: 72 } } },
      { id: 'mp-sub', type: 'text', content: '（做得完做不完，看你俩谁的脾气大）', fontFamily: HEI, fontSize: 24, color: { $t: 'colors.dim' }, x: 48, y: 150, width: 640, height: 40, zIndex: 3, editable: { content: true } },
      { id: 'mp-flag', type: 'image', src: cornerFlag(156, 'rgba(192,86,60,0.95)'), x: 876, y: 48, width: 156, height: 156, objectFit: 'fill', zIndex: 4 },
      { id: 'mp-flag-t', type: 'text', content: '避雷', fontFamily: { $t: 'fonts.heading' }, fontSize: 34, fontWeight: 900, color: { $t: 'colors.bg' }, textAlign: 'center', rotation: 45, x: 928, y: 76, width: 128, height: 60, zIndex: 5, animation: { name: 'wobble', duration: 3200, iterationCount: 'infinite' }, editable: { content: true } },
      { id: 'mp-d1', group: 'mp-d', type: 'shape', shapeKind: 'rect', x: 48, y: 214, width: 116, height: 58, borderRadius: 14, fill: 'rgba(45,58,44,0.10)', zIndex: 3 },
      { id: 'mp-d1-t', type: 'text', content: '周一', fontFamily: HEI, fontSize: 28, fontWeight: 700, color: { $t: 'colors.ink' }, textAlign: 'center', x: 48, y: 226, width: 116, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'mp-r1', type: 'text', content: '南瓜小米糊 · 蛋黄从 1/4 个试起', fontFamily: HEI, fontSize: 28, color: { $t: 'colors.ink' }, x: 190, y: 222, width: 842, height: 46, zIndex: 4, animation: { name: 'rise', duration: 440, delay: 130 }, editable: { content: true } },
      { id: 'mp-d2', group: 'mp-d', type: 'shape', shapeKind: 'rect', x: 48, y: 318, width: 116, height: 58, borderRadius: 14, fill: 'rgba(45,58,44,0.10)', zIndex: 3 },
      { id: 'mp-d2-t', type: 'text', content: '周二', fontFamily: HEI, fontSize: 28, fontWeight: 700, color: { $t: 'colors.ink' }, textAlign: 'center', x: 48, y: 330, width: 116, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'mp-r2', type: 'text', content: '西兰花牛肉泥 · 他吐了，我吃了', fontFamily: HEI, fontSize: 28, color: { $t: 'colors.ink' }, x: 190, y: 326, width: 842, height: 46, zIndex: 4, animation: { name: 'rise', duration: 440, delay: 130 }, editable: { content: true } },
      { id: 'mp-d3', group: 'mp-d', type: 'shape', shapeKind: 'rect', x: 48, y: 422, width: 116, height: 58, borderRadius: 14, fill: 'rgba(45,58,44,0.10)', zIndex: 3 },
      { id: 'mp-d3-t', type: 'text', content: '周三', fontFamily: HEI, fontSize: 28, fontWeight: 700, color: { $t: 'colors.ink' }, textAlign: 'center', x: 48, y: 434, width: 116, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'mp-r3', type: 'text', content: '土豆胡萝卜泥 + 高铁米粉', fontFamily: HEI, fontSize: 28, color: { $t: 'colors.ink' }, x: 190, y: 430, width: 842, height: 46, zIndex: 4, animation: { name: 'rise', duration: 440, delay: 260 }, editable: { content: true } },
      { id: 'mp-d4', group: 'mp-d', type: 'shape', shapeKind: 'rect', x: 48, y: 526, width: 116, height: 58, borderRadius: 14, fill: 'rgba(45,58,44,0.10)', zIndex: 3 },
      { id: 'mp-d4-t', type: 'text', content: '周四', fontFamily: HEI, fontSize: 28, fontWeight: 700, color: { $t: 'colors.ink' }, textAlign: 'center', x: 48, y: 538, width: 116, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'mp-r4', type: 'text', content: '鳕鱼粥 · 第一次试鱼，盯了三小时', fontFamily: HEI, fontSize: 28, color: { $t: 'colors.ink' }, x: 190, y: 534, width: 842, height: 46, zIndex: 4, animation: { name: 'rise', duration: 440, delay: 260 }, editable: { content: true } },
      { id: 'mp-d5', group: 'mp-d', type: 'shape', shapeKind: 'rect', x: 48, y: 630, width: 116, height: 58, borderRadius: 14, fill: 'rgba(45,58,44,0.10)', zIndex: 3 },
      { id: 'mp-d5-t', type: 'text', content: '周五', fontFamily: HEI, fontSize: 28, fontWeight: 700, color: { $t: 'colors.ink' }, textAlign: 'center', x: 48, y: 642, width: 116, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'mp-r5', type: 'text', content: '山药小面 · 剪得很碎（我的耐心也是）', fontFamily: HEI, fontSize: 28, color: { $t: 'colors.ink' }, x: 190, y: 638, width: 842, height: 46, zIndex: 4, editable: { content: true } },
      { id: 'mp-d6', group: 'mp-d', type: 'shape', shapeKind: 'rect', x: 48, y: 734, width: 116, height: 58, borderRadius: 14, fill: 'rgba(45,58,44,0.10)', zIndex: 3 },
      { id: 'mp-d6-t', type: 'text', content: '周六', fontFamily: HEI, fontSize: 28, fontWeight: 700, color: { $t: 'colors.ink' }, textAlign: 'center', x: 48, y: 746, width: 116, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'mp-r6', type: 'text', content: '苹果燕麦糊 · 加一勺无糖酸奶', fontFamily: HEI, fontSize: 28, color: { $t: 'colors.ink' }, x: 190, y: 742, width: 842, height: 46, zIndex: 4, editable: { content: true } },
      { id: 'mp-d7', group: 'mp-d', type: 'shape', shapeKind: 'rect', x: 48, y: 838, width: 116, height: 58, borderRadius: 14, fill: 'rgba(45,58,44,0.10)', zIndex: 3 },
      { id: 'mp-d7-t', type: 'text', content: '周日', fontFamily: HEI, fontSize: 28, fontWeight: 700, color: { $t: 'colors.ink' }, textAlign: 'center', x: 48, y: 850, width: 116, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'mp-r7', type: 'text', content: '全家吃啥他吃啥 · 今天是饺子皮', fontFamily: HEI, fontSize: 28, color: { $t: 'colors.ink' }, x: 190, y: 846, width: 842, height: 46, zIndex: 4, editable: { content: true } },
      { id: 'mp-warn-bar', type: 'shape', shapeKind: 'rect', x: 48, y: 928, width: 984, height: 88, borderRadius: 22, fill: 'rgba(192,86,60,0.12)', zIndex: 3 },
      { id: 'mp-warn-t', type: 'text', content: '避雷：✗ 蜂蜜（1 岁内）✗ 盐糖 ✗ 整颗坚果', fontFamily: HEI, fontSize: 28, fontWeight: 700, color: { $t: 'colors.warn' }, x: 76, y: 946, width: 900, height: 48, zIndex: 4, editable: { content: true } },
      { id: 'mp-u', type: 'image', src: scribble(300, 18, 'rgba(110,139,79,0.65)', 5), x: 48, y: 146, width: 300, height: 18, objectFit: 'fill', zIndex: 3 },
      { id: 'mp-dot1', group: 'mp-dot', type: 'shape', shapeKind: 'circle', x: 916, y: 168, width: 20, height: 20, fill: { $t: 'colors.veg' }, zIndex: 4, animation: { name: 'twinkle', duration: 2200, iterationCount: 'infinite' } },
      { id: 'mp-dot2', group: 'mp-dot', type: 'shape', shapeKind: 'circle', x: 956, y: 168, width: 20, height: 20, fill: { $t: 'colors.warn' }, zIndex: 4, animation: { name: 'twinkle', duration: 2200, delay: 700, iterationCount: 'infinite' } },
      { id: 'mp-dot3', group: 'mp-dot', type: 'shape', shapeKind: 'circle', x: 996, y: 168, width: 20, height: 20, fill: { $t: 'colors.ink' }, zIndex: 4, animation: { name: 'twinkle', duration: 2200, delay: 1400, iterationCount: 'infinite' } }
    ]
  },

  // 4. 早教游戏卡 —— 游戏名大字 + 材料清单 + 时长/难度标签，3:4 卡片包
  {
    id: 'parenting-play-game', name: '早教游戏卡', version: '1.0.0', category: 'parenting',
    tags: ['parenting', 'early-edu', 'game-card', 'toddler', '3:4'],
    thumbnail: svgUri('<rect width="160" height="213" fill="%23FCF6E7"/><g fill="rgba(47,41,33,0.05)"><circle cx="26" cy="26" r="1.5"/><circle cx="120" cy="18" r="1.5"/><circle cx="70" cy="200" r="1.5"/><circle cx="140" cy="140" r="1.5"/></g><rect x="10" y="14" width="28" height="10" rx="5" fill="%23E0A244"/><rect x="44" y="14" width="40" height="10" rx="5" fill="%2337776E"/><rect x="90" y="14" width="34" height="10" rx="5" fill="%232F2921" opacity="0.14"/><rect x="10" y="38" width="112" height="20" rx="2" fill="%232F2921"/><rect x="10" y="62" width="80" height="20" rx="2" fill="%23D8683F"/><rect x="10" y="92" width="44" height="6" rx="3" fill="%2337776E"/><g fill="%232F2921" opacity="0.6"><rect x="10" y="108" width="96" height="4" rx="2"/><rect x="10" y="120" width="82" height="4" rx="2"/><rect x="10" y="132" width="100" height="4" rx="2"/><rect x="10" y="144" width="70" height="4" rx="2"/></g><g fill="%23E0A244"><circle cx="6" cy="110" r="2.6"/><circle cx="6" cy="122" r="2.6"/><circle cx="6" cy="134" r="2.6"/><circle cx="6" cy="146" r="2.6"/></g><rect x="8" y="160" width="144" height="38" rx="6" fill="rgba(47,41,33,0.07)"/><rect x="16" y="168" width="24" height="8" rx="4" fill="%23D8683F"/><rect x="46" y="170" width="86" height="4" rx="2" fill="%232F2921" opacity="0.55"/><rect x="16" y="182" width="24" height="8" rx="4" fill="%2337776E"/><rect x="46" y="184" width="72" height="4" rx="2" fill="%232F2921" opacity="0.55"/><polygon points="150,6 154,20 140,16" fill="%23D8683F"/>', 160, 213),
    tokens: {
      colors: {
        bg: { label: '卡纸', default: '#FCF6E7', options: ['#FCF6E7', '#EEF3F4', '#F8EFEA', '#F0F3E8'] },
        ink: { label: '主文字', default: '#2F2921', options: ['#2F2921', '#1F2A2E', '#332420', '#2A2F21'] },
        accent: { label: '游戏绿', default: '#37776E', options: ['#37776E', '#4A6FA5', '#A85B43', '#6B7A3A'] },
        warm: { label: '热闹橙', default: '#D8683F', options: ['#D8683F', '#E0A244', '#C2456B', '#3F8EA8'] },
        dim: { label: '弱文字', default: '#8A8171', options: ['#8A8171', '#77828A', '#8C7A72', '#7E8474'] }
      },
      fonts: { heading: { label: '标题字体', default: HEI, options: [HEI, IMPACT] } }
    },
    presets: [
      { name: '奶黄卡纸', colors: { bg: '#FCF6E7', ink: '#2F2921', accent: '#37776E', warm: '#D8683F', dim: '#8A8171' } },
      { name: '湖水蓝', colors: { bg: '#EEF3F4', ink: '#1F2A2E', accent: '#4A6FA5', warm: '#E0A244', dim: '#77828A' } },
      { name: '砖红游戏', colors: { bg: '#F8EFEA', ink: '#332420', accent: '#A85B43', warm: '#C2456B', dim: '#8C7A72' } },
      { name: '抹茶课', colors: { bg: '#F0F3E8', ink: '#2A2F21', accent: '#6B7A3A', warm: '#3F8EA8', dim: '#7E8474' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1440, defaultWidth: 1080, defaultHeight: 1440, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'pg-bg', type: 'image', src: halftone(1080, 1440, 2.6, 62, 'rgba(47,41,33,0.06)'), x: 0, y: 0, width: 1080, height: 1440, objectFit: 'fill', zIndex: 1 },
      { id: 'pg-age', type: 'shape', shapeKind: 'rect', x: 48, y: 68, width: 148, height: 62, borderRadius: 999, fill: { $t: 'colors.warm' }, zIndex: 3 },
      { id: 'pg-age-t', type: 'text', content: '1 岁 8 月+', fontFamily: MONO, fontSize: 28, fontWeight: 700, color: { $t: 'colors.bg' }, textAlign: 'center', x: 48, y: 82, width: 148, height: 38, zIndex: 4, editable: { content: true } },
      { id: 'pg-cat', type: 'shape', shapeKind: 'rect', x: 212, y: 68, width: 232, height: 62, borderRadius: 999, fill: { $t: 'colors.accent' }, zIndex: 3 },
      { id: 'pg-cat-t', type: 'text', content: '精细动作', fontFamily: HEI, fontSize: 28, fontWeight: 700, color: { $t: 'colors.bg' }, textAlign: 'center', x: 212, y: 82, width: 232, height: 38, zIndex: 4, editable: { content: true } },
      { id: 'pg-no', type: 'text', content: '在家陪玩 · 第 07 局', fontFamily: HEI, fontSize: 28, letterSpacing: 1, color: { $t: 'colors.dim' }, x: 480, y: 84, width: 504, height: 44, zIndex: 4, editable: { content: true } },
      { id: 'pg-t1', type: 'text', content: '纸巾盒', fontFamily: { $t: 'fonts.heading' }, fontSize: 150, fontWeight: 900, letterSpacing: 4, color: { $t: 'colors.ink' }, x: 48, y: 176, width: 700, height: 226, zIndex: 3, animation: { name: 'zoomIn', duration: 520, delay: 0 }, editable: { content: true, fontSize: { type: 'range', min: 96, max: 170 } } },
      { id: 'pg-t2', type: 'text', content: '抽抽乐', fontFamily: { $t: 'fonts.heading' }, fontSize: 150, fontWeight: 900, letterSpacing: 4, color: { $t: 'colors.warm' }, x: 48, y: 390, width: 700, height: 226, zIndex: 3, animation: { name: 'zoomIn', duration: 520, delay: 130 }, editable: { content: true, fontSize: { type: 'range', min: 96, max: 170 } } },
      { id: 'pg-u', type: 'image', src: scribble(420, 24, 'rgba(55,119,110,0.6)', 6), x: 48, y: 618, width: 420, height: 24, objectFit: 'fill', zIndex: 4 },
      { id: 'pg-sub', type: 'text', content: '（一个空盒子，换我 15 分钟上厕所）', fontFamily: HEI, fontSize: 34, color: { $t: 'colors.dim' }, x: 48, y: 650, width: 900, height: 58, zIndex: 3, editable: { content: true } },
      { id: 'pg-tags', type: 'shape', shapeKind: 'rect', x: 48, y: 736, width: 984, height: 92, borderRadius: 22, fill: 'rgba(47,41,33,0.07)', zIndex: 3 },
      { id: 'pg-tag1', type: 'text', content: '时长 15 分钟', fontFamily: HEI, fontSize: 28, fontWeight: 700, color: { $t: 'colors.ink' }, x: 76, y: 758, width: 260, height: 48, zIndex: 4, editable: { content: true } },
      { id: 'pg-tag2', type: 'text', content: '难度 ★★☆', fontFamily: HEI, fontSize: 28, fontWeight: 700, color: { $t: 'colors.ink' }, x: 380, y: 758, width: 240, height: 48, zIndex: 4, editable: { content: true } },
      { id: 'pg-tag3', type: 'text', content: '场面 有点乱', fontFamily: HEI, fontSize: 28, fontWeight: 700, color: { $t: 'colors.accent' }, x: 664, y: 758, width: 300, height: 48, zIndex: 4, editable: { content: true } },
      { id: 'pg-sec', type: 'text', content: '准备材料（家里全有）', fontFamily: { $t: 'fonts.heading' }, fontSize: 40, fontWeight: 900, color: { $t: 'colors.ink' }, x: 48, y: 866, width: 780, height: 62, zIndex: 3, editable: { content: true } },
      { id: 'pg-m1', group: 'pg-m', type: 'shape', shapeKind: 'circle', x: 48, y: 966, width: 30, height: 30, fill: { $t: 'colors.warm' }, zIndex: 3 },
      { id: 'pg-mr1', type: 'text', content: '空纸巾盒 1 个（卷纸芯攒一攒也行）', fontFamily: HEI, fontSize: 34, color: { $t: 'colors.ink' }, x: 110, y: 952, width: 880, height: 58, zIndex: 3, animation: { name: 'rise', duration: 460, delay: 260 }, editable: { content: true } },
      { id: 'pg-m2', group: 'pg-m', type: 'shape', shapeKind: 'circle', x: 48, y: 1036, width: 30, height: 30, fill: { $t: 'colors.warm' }, zIndex: 3 },
      { id: 'pg-mr2', type: 'text', content: '袜子 5 只 · 成对的不要，会被抢走', fontFamily: HEI, fontSize: 34, color: { $t: 'colors.ink' }, x: 110, y: 1022, width: 880, height: 58, zIndex: 3, editable: { content: true } },
      { id: 'pg-m3', group: 'pg-m', type: 'shape', shapeKind: 'circle', x: 48, y: 1106, width: 30, height: 30, fill: { $t: 'colors.warm' }, zIndex: 3 },
      { id: 'pg-mr3', type: 'text', content: '小毯子一块 · 用来当「惊喜」', fontFamily: HEI, fontSize: 34, color: { $t: 'colors.ink' }, x: 110, y: 1092, width: 880, height: 58, zIndex: 3, editable: { content: true } },
      { id: 'pg-m4', group: 'pg-m', type: 'shape', shapeKind: 'circle', x: 48, y: 1176, width: 30, height: 30, fill: { $t: 'colors.dim' }, zIndex: 3 },
      { id: 'pg-mr4', type: 'text', content: '你的 15 分钟 · 以及忍住不笑', fontFamily: HEI, fontSize: 34, color: { $t: 'colors.ink' }, x: 110, y: 1162, width: 880, height: 58, zIndex: 3, editable: { content: true } },
      { id: 'pg-card', type: 'shape', shapeKind: 'rect', x: 48, y: 1244, width: 984, height: 148, borderRadius: 24, fill: 'rgba(55,119,110,0.14)', zIndex: 3 },
      { id: 'pg-how', type: 'text', content: '玩法：塞进去，让他一只只掏出来；掏完再塞，循环到他烦为止。', fontFamily: HEI, fontSize: 28, color: { $t: 'colors.ink' }, x: 76, y: 1266, width: 900, height: 48, zIndex: 4, editable: { content: true } },
      { id: 'pg-tip', type: 'text', content: '翻车实录：20 分钟后盒子归他，我归沙发。', fontFamily: HEI, fontSize: 28, color: { $t: 'colors.accent' }, x: 76, y: 1324, width: 900, height: 48, zIndex: 4, animation: { name: 'fadeInUp', duration: 460, delay: 130 }, editable: { content: true } },
      { id: 'pg-star', type: 'image', src: star(72, 'rgba(216,104,63,0.55)'), x: 924, y: 200, width: 72, height: 72, objectFit: 'contain', zIndex: 5, animation: { name: 'twinkle', duration: 2600, iterationCount: 'infinite' } },
      { id: 'pg-note', type: 'image', src: stickyNote(128, 'rgba(224,162,68,0.5)'), x: 872, y: 400, width: 128, height: 128, objectFit: 'contain', rotation: 10, zIndex: 4, animation: { name: 'float', duration: 5200, iterationCount: 'infinite' } },
      { id: 'pg-note-t', type: 'text', content: '不用买', fontFamily: HEI, fontSize: 28, fontWeight: 700, color: { $t: 'colors.ink' }, textAlign: 'center', rotation: 10, x: 872, y: 446, width: 128, height: 40, zIndex: 5, editable: { content: true } }
    ]
  },

  // 5. 遛娃好去处安利 —— 地点虚线图位 + 体力消耗评级 + 花销参考，4:5 测评报告
  {
    id: 'parenting-outing-spot', name: '遛娃好去处安利', version: '1.0.0', category: 'parenting',
    tags: ['parenting', 'outing', 'park', 'review', '4:5'],
    thumbnail: svgUri('<rect width="160" height="200" fill="%23EAF0E6"/><g fill="rgba(38,54,44,0.06)"><circle cx="28" cy="24" r="1.4"/><circle cx="118" cy="16" r="1.4"/><circle cx="60" cy="188" r="1.4"/><circle cx="140" cy="120" r="1.4"/></g><rect x="10" y="14" width="34" height="11" rx="5.5" fill="%233F7A57"/><rect x="50" y="16" width="46" height="6" rx="3" fill="%2378877A"/><rect x="10" y="34" width="104" height="14" rx="2" fill="%2326362C"/><rect x="10" y="54" width="70" height="6" rx="3" fill="%2378877A"/><rect x="10" y="72" width="140" height="62" rx="4" fill="none" stroke="%2326362C" stroke-width="1.6" stroke-dasharray="4 3"/><path d="M74 100 a6 6 0 1 1 0 0.1" fill="none" stroke="%23C25E3A" stroke-width="2"/><rect x="8" y="68" width="22" height="7" fill="rgba(255,255,255,0.72)" transform="rotate(-32 19 71)"/><rect x="126" y="126" width="22" height="7" fill="rgba(255,255,255,0.72)" transform="rotate(30 137 129)"/><text x="80" y="106" font-family="sans-serif" font-size="8" fill="%2326362C" text-anchor="middle" opacity="0.6">照片位</text><g fill="%233F7A57"><circle cx="16" cy="148" r="5"/><circle cx="32" cy="148" r="5"/><circle cx="48" cy="148" r="5"/><circle cx="64" cy="148" r="5"/></g><circle cx="80" cy="148" r="5" fill="none" stroke="%2378877A" stroke-width="1.6"/><rect x="94" y="144" width="52" height="7" rx="2" fill="%2326362C" opacity="0.6"/><rect x="10" y="162" width="140" height="14" rx="4" fill="rgba(38,54,44,0.08)"/><rect x="14" y="166" width="56" height="6" rx="2" fill="%23C25E3A"/><rect x="76" y="166" width="40" height="6" rx="2" fill="%2378877A"/><g fill="%2326362C" opacity="0.5"><rect x="10" y="184" width="88" height="5" rx="2"/><rect x="10" y="192" width="60" height="5" rx="2"/></g>', 160, 200),
    tokens: {
      colors: {
        bg: { label: '草地纸', default: '#EAF0E6', options: ['#EAF0E6', '#EDF1F5', '#F5EFE3', '#F3ECED'] },
        ink: { label: '主文字', default: '#26362C', options: ['#26362C', '#222C38', '#38301F', '#362430'] },
        accent: { label: '户外绿', default: '#3F7A57', options: ['#3F7A57', '#3D6E86', '#8A6A34', '#7C4E68'] },
        warn: { label: '路况橙', default: '#C25E3A', options: ['#C25E3A', '#C27A2E', '#B23A48', '#5A6BB0'] },
        dim: { label: '弱文字', default: '#78877A', options: ['#78877A', '#77828F', '#8C8267', '#8F7A85'] }
      },
      fonts: { heading: { label: '标题字体', default: HEI, options: [HEI, SONG] } }
    },
    presets: [
      { name: '草坪绿', colors: { bg: '#EAF0E6', ink: '#26362C', accent: '#3F7A57', warn: '#C25E3A', dim: '#78877A' } },
      { name: '江边蓝', colors: { bg: '#EDF1F5', ink: '#222C38', accent: '#3D6E86', warn: '#C27A2E', dim: '#77828F' } },
      { name: '秋日棕', colors: { bg: '#F5EFE3', ink: '#38301F', accent: '#8A6A34', warn: '#B23A48', dim: '#8C8267' } },
      { name: '樱道粉', colors: { bg: '#F3ECED', ink: '#362430', accent: '#7C4E68', warn: '#C25E3A', dim: '#8F7A85' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'ot-bg', type: 'image', src: halftone(1080, 1350, 2.2, 66, 'rgba(38,54,44,0.07)'), x: 0, y: 0, width: 1080, height: 1350, objectFit: 'fill', zIndex: 1 },
      { id: 'ot-free', type: 'shape', shapeKind: 'rect', x: 48, y: 66, width: 172, height: 62, borderRadius: 999, fill: { $t: 'colors.accent' }, zIndex: 3 },
      { id: 'ot-free-t', type: 'text', content: '门票 ¥0', fontFamily: MONO, fontSize: 28, fontWeight: 700, color: { $t: 'colors.bg' }, textAlign: 'center', x: 48, y: 80, width: 172, height: 38, zIndex: 4, editable: { content: true } },
      { id: 'ot-kicker', type: 'text', content: '遛娃实录 · 第 03 站', fontFamily: HEI, fontSize: 28, letterSpacing: 2, color: { $t: 'colors.dim' }, x: 256, y: 82, width: 480, height: 44, zIndex: 4, editable: { content: true } },
      { id: 'ot-t1', type: 'text', content: '共青森林公园', fontFamily: { $t: 'fonts.heading' }, fontSize: 84, fontWeight: 900, letterSpacing: 3, color: { $t: 'colors.ink' }, x: 48, y: 168, width: 900, height: 132, zIndex: 3, animation: { name: 'slideInLeft', duration: 520, delay: 0 }, editable: { content: true, fontSize: { type: 'range', min: 56, max: 100 } } },
      { id: 'ot-sub', type: 'text', content: '（地铁不直达，带娃请直接打车，别问我怎么知道的）', fontFamily: HEI, fontSize: 28, color: { $t: 'colors.dim' }, x: 48, y: 306, width: 960, height: 48, zIndex: 3, animation: { name: 'fadeIn', duration: 460, delay: 130 }, editable: { content: true } },
      { id: 'ot-photo', type: 'shape', shapeKind: 'rect', x: 48, y: 388, width: 984, height: 396, borderRadius: 16, border: { width: 5, style: 'dashed', color: { $t: 'colors.ink' } }, zIndex: 3 },
      { id: 'ot-photo-t', type: 'text', content: '实拍位 · 门口那排小吃摊', fontFamily: HEI, fontSize: 34, color: { $t: 'colors.ink' }, opacity: 0.85, textAlign: 'center', x: 48, y: 552, width: 984, height: 58, zIndex: 4, editable: { content: true } },
      { id: 'ot-photo-c', type: 'text', content: '拖图替换 · 糊了也算真实', fontFamily: HEI, fontSize: 24, color: { $t: 'colors.dim' }, textAlign: 'center', x: 48, y: 614, width: 984, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'ot-tape1', type: 'image', src: tapeSoft(200, 54, 'rgba(255,255,255,0.78)'), x: 36, y: 360, width: 200, height: 54, objectFit: 'contain', rotation: -34, zIndex: 5 },
      { id: 'ot-tape2', type: 'image', src: tapeSoft(200, 54, 'rgba(255,255,255,0.78)'), x: 844, y: 716, width: 200, height: 54, objectFit: 'contain', rotation: 30, zIndex: 5 },
      { id: 'ot-corner', type: 'image', src: photoCorners(96, 'rgba(38,54,44,0.35)'), x: 936, y: 400, width: 96, height: 96, objectFit: 'contain', zIndex: 5 },
      { id: 'ot-rate-l', type: 'text', content: '体力消耗', fontFamily: { $t: 'fonts.heading' }, fontSize: 40, fontWeight: 900, color: { $t: 'colors.ink' }, x: 48, y: 816, width: 300, height: 62, zIndex: 3, editable: { content: true } },
      { id: 'ot-r1', group: 'ot-r', type: 'shape', shapeKind: 'circle', x: 372, y: 828, width: 40, height: 40, fill: { $t: 'colors.warn' }, zIndex: 3 },
      { id: 'ot-r2', group: 'ot-r', type: 'shape', shapeKind: 'circle', x: 428, y: 828, width: 40, height: 40, fill: { $t: 'colors.warn' }, zIndex: 3 },
      { id: 'ot-r3', group: 'ot-r', type: 'shape', shapeKind: 'circle', x: 484, y: 828, width: 40, height: 40, fill: { $t: 'colors.warn' }, zIndex: 3 },
      { id: 'ot-r4', group: 'ot-r', type: 'shape', shapeKind: 'circle', x: 540, y: 828, width: 40, height: 40, fill: { $t: 'colors.warn' }, opacity: 0.45, zIndex: 3 },
      { id: 'ot-r5', group: 'ot-r', type: 'shape', shapeKind: 'circle', x: 596, y: 828, width: 40, height: 40, border: { width: 4, color: { $t: 'colors.dim' } }, zIndex: 3 },
      { id: 'ot-rate-t', type: 'text', content: '4/5 · 他 5 星，我 3 星', fontFamily: HEI, fontSize: 28, color: { $t: 'colors.dim' }, x: 664, y: 826, width: 368, height: 46, zIndex: 3, editable: { content: true } },
      { id: 'ot-cost', type: 'shape', shapeKind: 'rect', x: 48, y: 908, width: 984, height: 108, borderRadius: 22, fill: 'rgba(38,54,44,0.07)', zIndex: 3 },
      { id: 'ot-cost-h', type: 'text', content: '花销参考', fontFamily: HEI, fontSize: 28, fontWeight: 700, color: { $t: 'colors.accent' }, x: 76, y: 936, width: 200, height: 48, zIndex: 4, editable: { content: true } },
      { id: 'ot-cost-t', type: 'text', content: '停车 20 · 摇船 40 · 冰淇淋 35（大头在这）', fontFamily: MONO, fontSize: 28, color: { $t: 'colors.ink' }, x: 288, y: 936, width: 720, height: 48, zIndex: 4, animation: { name: 'fadeInUp', duration: 460, delay: 260 }, editable: { content: true } },
      { id: 'ot-sec', type: 'text', content: '三条实话', fontFamily: { $t: 'fonts.heading' }, fontSize: 40, fontWeight: 900, color: { $t: 'colors.ink' }, x: 48, y: 1048, width: 400, height: 62, zIndex: 3, editable: { content: true } },
      { id: 'ot-b1', group: 'ot-b', type: 'shape', shapeKind: 'circle', x: 48, y: 1146, width: 26, height: 26, fill: { $t: 'colors.accent' }, zIndex: 3 },
      { id: 'ot-t2', type: 'text', content: '推车能进，但沙坑那 200 米得抬', fontFamily: HEI, fontSize: 34, color: { $t: 'colors.ink' }, x: 100, y: 1132, width: 880, height: 58, zIndex: 3, editable: { content: true } },
      { id: 'ot-b2', group: 'ot-b', type: 'shape', shapeKind: 'circle', x: 48, y: 1216, width: 26, height: 26, fill: { $t: 'colors.accent' }, zIndex: 3 },
      { id: 'ot-t3', type: 'text', content: '厕所三星 · 湿巾自带，别嫌啰嗦', fontFamily: HEI, fontSize: 34, color: { $t: 'colors.ink' }, x: 100, y: 1202, width: 880, height: 58, zIndex: 3, editable: { content: true } },
      { id: 'ot-b3', group: 'ot-b', type: 'shape', shapeKind: 'circle', x: 48, y: 1286, width: 26, height: 26, fill: { $t: 'colors.warn' }, zIndex: 3 },
      { id: 'ot-t4', type: 'text', content: '回程车上秒睡 —— 这才是本报告重点', fontFamily: HEI, fontSize: 34, fontWeight: 700, color: { $t: 'colors.warn' }, x: 100, y: 1272, width: 880, height: 58, zIndex: 3, animation: { name: 'rise', duration: 460, delay: 260 }, editable: { content: true } },
      { id: 'ot-star', type: 'image', src: star(58, 'rgba(194,94,58,0.5)'), x: 946, y: 176, width: 58, height: 58, objectFit: 'contain', zIndex: 5, animation: { name: 'twinkle', duration: 2600, iterationCount: 'infinite' } }
    ]
  },

  // 6. 今日心情打卡 —— 大字心情 + 电量条 + 事件一句话，1:1 轻松吐槽向
  {
    id: 'parenting-mood-checkin', name: '今日心情打卡', version: '1.0.0', category: 'parenting',
    tags: ['parenting', 'mood', 'checkin', 'diary', '1:1'],
    thumbnail: svgUri('<rect width="160" height="160" fill="%23F7F1E8"/><g fill="rgba(56,48,40,0.05)"><circle cx="30" cy="26" r="1.4"/><circle cx="124" cy="18" r="1.4"/><circle cx="60" cy="146" r="1.4"/><circle cx="140" cy="104" r="1.4"/></g><rect x="10" y="14" width="26" height="9" rx="4.5" fill="%23B4553F"/><rect x="42" y="15" width="44" height="6" rx="3" fill="%238B7F6E"/><rect x="10" y="34" width="86" height="30" rx="3" fill="%2338302A"/><rect x="10" y="70" width="48" height="10" rx="2" fill="%23B4553F" opacity="0.75"/><rect x="10" y="92" width="104" height="20" rx="10" fill="none" stroke="%2338302A" stroke-width="2"/><rect x="14" y="96" width="26" height="12" rx="6" fill="%23B4553F"/><rect x="116" y="98" width="5" height="8" rx="2" fill="%2338302A"/><g fill="%2338302A" opacity="0.55"><rect x="10" y="124" width="96" height="4" rx="2"/><rect x="10" y="133" width="72" height="4" rx="2"/></g><g opacity="0.85"><circle cx="128" cy="128" r="7" fill="none" stroke="%238B7F6E" stroke-width="1.6"/><circle cx="146" cy="128" r="7" fill="%23D89A3E"/><rect x="10" y="146" width="40" height="5" rx="2" fill="%238B7F6E"/></g><path d="M136 42 l3 8 l8 3 l-8 3 l-3 8 l-3 -8 l-8 -3 l8 -3 z" fill="%23D89A3E"/>', 160, 160),
    tokens: {
      colors: {
        bg: { label: '底色', default: '#F7F1E8', options: ['#F7F1E8', '#EDF1F4', '#F4EEE9', '#EBF1EE'] },
        ink: { label: '主文字', default: '#38302A', options: ['#38302A', '#252E38', '#3A2A2E', '#2C3327'] },
        mood: { label: '心情色', default: '#B4553F', options: ['#B4553F', '#4E7A9B', '#8C6BB0', '#4E8B62'] },
        energy: { label: '电量色', default: '#D89A3E', options: ['#D89A3E', '#5AA07A', '#C56A8E', '#5B8CC4'] },
        dim: { label: '弱文字', default: '#8B7F6E', options: ['#8B7F6E', '#7A8590', '#91807C', '#7C8879'] }
      },
      fonts: { heading: { label: '标题字体', default: HEI, options: [HEI, SERIF] } }
    },
    presets: [
      { name: '奶油打卡', colors: { bg: '#F7F1E8', ink: '#38302A', mood: '#B4553F', energy: '#D89A3E', dim: '#8B7F6E' } },
      { name: '阴天蓝', colors: { bg: '#EDF1F4', ink: '#252E38', mood: '#4E7A9B', energy: '#5B8CC4', dim: '#7A8590' } },
      { name: '低糖粉', colors: { bg: '#F4EEE9', ink: '#3A2A2E', mood: '#8C6BB0', energy: '#C56A8E', dim: '#91807C' } },
      { name: '硬撑绿', colors: { bg: '#EBF1EE', ink: '#2C3327', mood: '#4E8B62', energy: '#5AA07A', dim: '#7C8879' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1080, defaultWidth: 1080, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'mc-bg', type: 'image', src: ledgerBg(1080, 1080, 84), x: 0, y: 0, width: 1080, height: 1080, objectFit: 'fill', zIndex: 1 },
      { id: 'mc-day', type: 'shape', shapeKind: 'rect', x: 48, y: 64, width: 216, height: 62, borderRadius: 999, fill: { $t: 'colors.mood' }, zIndex: 3 },
      { id: 'mc-day-t', type: 'text', content: 'DAY 214', fontFamily: MONO, fontSize: 28, fontWeight: 700, letterSpacing: 2, color: { $t: 'colors.bg' }, textAlign: 'center', x: 48, y: 78, width: 216, height: 38, zIndex: 4, editable: { content: true } },
      { id: 'mc-date', type: 'text', content: '10 月 12 日 · 晴（屋里下雨过）', fontFamily: MONO, fontSize: 28, letterSpacing: 1, color: { $t: 'colors.dim' }, x: 296, y: 80, width: 620, height: 44, zIndex: 3, editable: { content: true } },
      { id: 'mc-t1', type: 'text', content: '还行', fontFamily: { $t: 'fonts.heading' }, fontSize: 200, fontWeight: 900, letterSpacing: 8, color: { $t: 'colors.ink' }, x: 48, y: 168, width: 640, height: 300, zIndex: 3, animation: { name: 'zoomIn', duration: 540, delay: 0 }, editable: { content: true, fontSize: { type: 'range', min: 130, max: 230 } } },
      { id: 'mc-u', type: 'image', src: scribble(520, 26, 'rgba(180,85,63,0.55)', 7), x: 48, y: 470, width: 520, height: 26, objectFit: 'fill', zIndex: 4 },
      { id: 'mc-t2', type: 'text', content: '（装的，\n准确说是麻了）', fontFamily: { $t: 'fonts.heading' }, fontSize: 58, fontWeight: 900, color: { $t: 'colors.mood' }, lineHeight: 1.24, x: 700, y: 196, width: 332, height: 190, zIndex: 3, animation: { name: 'fadeInUp', duration: 500, delay: 130 }, editable: { content: true, fontSize: { type: 'range', min: 40, max: 72 } } },
      { id: 'mc-batt', type: 'shape', shapeKind: 'rect', x: 48, y: 534, width: 624, height: 96, borderRadius: 48, border: { width: 6, color: { $t: 'colors.ink' } }, zIndex: 3 },
      { id: 'mc-fill', type: 'shape', shapeKind: 'rect', x: 64, y: 550, width: 176, height: 64, borderRadius: 32, fill: { $t: 'colors.energy' }, zIndex: 4, animation: { name: 'pulse', duration: 2600, iterationCount: 'infinite' } },
      { id: 'mc-nub', type: 'shape', shapeKind: 'rect', x: 684, y: 564, width: 22, height: 36, borderRadius: 8, fill: { $t: 'colors.ink' }, zIndex: 3 },
      { id: 'mc-batt-t', type: 'text', content: '今日电量 18%', fontFamily: HEI, fontSize: 34, fontWeight: 700, color: { $t: 'colors.ink' }, x: 736, y: 552, width: 296, height: 58, zIndex: 4, editable: { content: true } },
      { id: 'mc-batt-s', type: 'text', content: '充电方式：他睡着以后，我自己也睡着了', fontFamily: HEI, fontSize: 24, color: { $t: 'colors.dim' }, x: 736, y: 612, width: 296, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'mc-ev', type: 'shape', shapeKind: 'rect', x: 48, y: 672, width: 984, height: 176, borderRadius: 24, fill: 'rgba(56,48,40,0.06)', zIndex: 3 },
      { id: 'mc-ev-h', type: 'text', content: '今日事件', fontFamily: HEI, fontSize: 28, fontWeight: 700, letterSpacing: 2, color: { $t: 'colors.mood' }, x: 76, y: 698, width: 240, height: 48, zIndex: 4, editable: { content: true } },
      { id: 'mc-ev-t', type: 'text', content: '凌晨四点被自己的闹钟吓醒，他跟着笑了，\n我没笑 —— 第二天回想起来还是想笑。', fontFamily: HEI, fontSize: 34, lineHeight: 1.46, color: { $t: 'colors.ink' }, x: 76, y: 748, width: 900, height: 106, zIndex: 4, animation: { name: 'rise', duration: 480, delay: 260 }, editable: { content: true } },
      { id: 'mc-mood-h', type: 'text', content: '今日表情', fontFamily: HEI, fontSize: 24, letterSpacing: 2, color: { $t: 'colors.dim' }, x: 48, y: 866, width: 200, height: 40, zIndex: 3, editable: { content: true } },
      { id: 'mc-o1', group: 'mc-o', type: 'shape', shapeKind: 'rect', x: 268, y: 862, width: 48, height: 48, borderRadius: 12, border: { width: 3, color: { $t: 'colors.dim' } }, zIndex: 3 },
      { id: 'mc-o2', group: 'mc-o', type: 'shape', shapeKind: 'rect', x: 340, y: 862, width: 48, height: 48, borderRadius: 12, border: { width: 3, color: { $t: 'colors.dim' } }, zIndex: 3 },
      { id: 'mc-o3', group: 'mc-o', type: 'shape', shapeKind: 'rect', x: 412, y: 862, width: 48, height: 48, borderRadius: 12, fill: { $t: 'colors.mood' }, zIndex: 3 },
      { id: 'mc-o3-t', type: 'text', content: '麻', fontFamily: HEI, fontSize: 24, fontWeight: 700, color: { $t: 'colors.bg' }, textAlign: 'center', x: 412, y: 870, width: 48, height: 34, zIndex: 4, editable: { content: true } },
      { id: 'mc-o4', group: 'mc-o', type: 'shape', shapeKind: 'rect', x: 484, y: 862, width: 48, height: 48, borderRadius: 12, border: { width: 3, color: { $t: 'colors.dim' } }, zIndex: 3 },
      { id: 'mc-o5', group: 'mc-o', type: 'shape', shapeKind: 'rect', x: 556, y: 862, width: 48, height: 48, borderRadius: 12, border: { width: 3, color: { $t: 'colors.dim' } }, zIndex: 3 },
      { id: 'mc-streak', type: 'text', content: '连续打卡 214 天 · 没一天想来的', fontFamily: HEI, fontSize: 24, color: { $t: 'colors.dim' }, x: 640, y: 866, width: 392, height: 40, zIndex: 3, editable: { content: true } },
      { id: 'mc-foot', type: 'text', content: '明天继续 · 毕竟没人批我的假', fontFamily: HEI, fontSize: 28, color: { $t: 'colors.ink' }, x: 48, y: 948, width: 620, height: 48, zIndex: 3, animation: { name: 'fadeInUp', duration: 460, delay: 130 }, editable: { content: true } },
      { id: 'mc-rec', type: 'shape', shapeKind: 'circle', x: 968, y: 962, width: 24, height: 24, fill: { $t: 'colors.mood' }, zIndex: 4, animation: { name: 'blink', duration: 1400, iterationCount: 'infinite' } },
      { id: 'mc-rec-t', type: 'text', content: '记录中', fontFamily: HEI, fontSize: 24, letterSpacing: 2, color: { $t: 'colors.mood' }, x: 780, y: 956, width: 176, height: 40, zIndex: 4 }
    ]
  },

  // 7. 绘本推荐（4:5）—— 本周三选一 + 适读年龄 + 一句话推荐
  {
    id: 'parenting-book-rec', name: '本周绘本推荐', version: '1.0.0', category: 'parenting',
    tags: ['parenting', 'book', 'reading', 'picture-book', '4:5'],
    thumbnail: svgUri('<rect width="160" height="200" fill="%23FBF3E4"/><g fill="rgba(44,36,25,0.10)"><circle cx="24" cy="24" r="1.5"/><circle cx="132" cy="18" r="1.5"/><circle cx="40" cy="184" r="1.5"/></g><rect x="12" y="14" width="46" height="14" rx="7" fill="%233F7D6B"/><rect x="12" y="34" width="86" height="16" rx="2" fill="%232C2419"/><g fill="rgba(44,36,25,0.07)"><rect x="12" y="58" width="40" height="120" rx="3"/><rect x="12" y="58" width="40" height="120" rx="3" fill="none" stroke="%232C2419" stroke-width="1.5" stroke-dasharray="3 2"/></g><text x="32" y="124" font-family="sans-serif" font-size="9" fill="%238A7A63" text-anchor="middle">封面</text><g fill="%233F7D6B"><rect x="64" y="62" width="80" height="6" rx="2"/><rect x="64" y="78" width="64" height="6" rx="2"/></g><rect x="64" y="96" width="60" height="14" rx="7" fill="%23C2452E" opacity="0.85"/><g fill="%232C2419" opacity="0.5"><rect x="64" y="122" width="84" height="5" rx="2"/><rect x="64" y="134" width="64" height="5" rx="2"/></g><g fill="rgba(44,36,25,0.07)"><rect x="12" y="196" width="40" height="0" rx="3"/></g>', 160, 200),
    tokens: {
      colors: {
        bg: { label: '纸色', default: '#FBF3E4', options: ['#FBF3E4', '#EDF2F5', '#F0F4E8', '#F8EEEE'] },
        ink: { label: '主文字', default: '#2C2419', options: ['#2C2419', '#1D2A33', '#26301E', '#33212A'] },
        accent: { label: '记号绿', default: '#3F7D6B', options: ['#3F7D6B', '#3E6E8E', '#6B8E3D', '#A9586B'] },
        seal: { label: '印章红', default: '#C2452E', options: ['#C2452E', '#C0563E', '#C2612E', '#B23A48'] },
        dim: { label: '弱文字', default: '#8A7A63', options: ['#8A7A63', '#7D8F9C', '#85907A', '#9C8089'] }
      },
      fonts: { heading: { label: '标题字体', default: HEI, options: [HEI, SONG] } }
    },
    presets: [
      { name: '燕麦暖纸', colors: { bg: '#FBF3E4', ink: '#2C2419', accent: '#3F7D6B', seal: '#C2452E', dim: '#8A7A63' } },
      { name: '雾蓝夜奶', colors: { bg: '#EDF2F5', ink: '#1D2A33', accent: '#3E6E8E', seal: '#C0563E', dim: '#7D8F9C' } },
      { name: '抹茶辅食', colors: { bg: '#F0F4E8', ink: '#26301E', accent: '#6B8E3D', seal: '#C2612E', dim: '#85907A' } },
      { name: '藕粉哄睡', colors: { bg: '#F8EEEE', ink: '#33212A', accent: '#A9586B', seal: '#B23A48', dim: '#9C8089' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'bk-bg', type: 'image', src: halftone(1080, 1350, 2.4, 58, 'rgba(44,36,25,0.07)'), x: 0, y: 0, width: 1080, height: 1350, objectFit: 'fill', zIndex: 1 },
      { id: 'bk-age', type: 'shape', shapeKind: 'rect', x: 48, y: 64, width: 228, height: 64, borderRadius: 999, fill: { $t: 'colors.accent' }, zIndex: 3 },
      { id: 'bk-age-t', type: 'text', content: '陪读 15 分钟', fontFamily: MONO, fontSize: 28, fontWeight: '700', color: { $t: 'colors.bg' }, textAlign: 'center', x: 48, y: 78, width: 228, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'bk-kicker', type: 'text', content: '书房常备 · 第 09 周', fontFamily: HEI, fontSize: 28, letterSpacing: 1, color: { $t: 'colors.dim' }, x: 300, y: 80, width: 560, height: 44, zIndex: 4, editable: { content: true } },
      { id: 'bk-title', type: 'text', content: '本周绘本三选一', fontFamily: { $t: 'fonts.heading' }, fontSize: 84, fontWeight: '900', letterSpacing: 2, color: { $t: 'colors.ink' }, x: 48, y: 120, width: 900, height: 130, zIndex: 3, animation: { name: 'slideInLeft', duration: 520 }, editable: { content: true, fontSize: { type: 'range', min: 56, max: 100 } } },
      { id: 'bk-r1-c', type: 'shape', shapeKind: 'rect', x: 76, y: 250, width: 240, height: 300, borderRadius: 12, border: { width: 5, style: 'dashed', color: { $t: 'colors.ink' } }, zIndex: 3 },
      { id: 'bk-r1-ct', type: 'text', content: '封面位', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.ink' }, opacity: 0.6, textAlign: 'center', x: 76, y: 384, width: 240, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'bk-r1-n', type: 'text', content: '小熊宝宝 绘本系列', fontFamily: { $t: 'fonts.heading' }, fontSize: 40, fontWeight: '800', color: { $t: 'colors.ink' }, x: 360, y: 270, width: 660, height: 58, zIndex: 4, editable: { content: true } },
      { id: 'bk-r1-a', type: 'shape', shapeKind: 'rect', x: 360, y: 346, width: 160, height: 52, borderRadius: 999, fill: { $t: 'colors.seal' }, opacity: 0.9, zIndex: 4 },
      { id: 'bk-r1-at', type: 'text', content: '适读 1-3 岁', fontFamily: HEI, fontSize: 26, fontWeight: '700', color: { $t: 'colors.bg' }, textAlign: 'center', x: 360, y: 358, width: 160, height: 40, zIndex: 5, editable: { content: true } },
      { id: 'bk-r1-d', type: 'text', content: '吃饭刷牙不抗拒，\n温柔到犯规。', fontFamily: HEI, fontSize: 32, color: { $t: 'colors.dim' }, lineHeight: 1.5, x: 360, y: 430, width: 660, height: 100, zIndex: 4, editable: { content: true } },
      { id: 'bk-r2-c', type: 'shape', shapeKind: 'rect', x: 76, y: 580, width: 240, height: 300, borderRadius: 12, border: { width: 5, style: 'dashed', color: { $t: 'colors.ink' } }, zIndex: 3 },
      { id: 'bk-r2-ct', type: 'text', content: '封面位', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.ink' }, opacity: 0.6, textAlign: 'center', x: 76, y: 714, width: 240, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'bk-r2-n', type: 'text', content: '点点点 互动绘本', fontFamily: { $t: 'fonts.heading' }, fontSize: 40, fontWeight: '800', color: { $t: 'colors.ink' }, x: 360, y: 600, width: 660, height: 58, zIndex: 4, editable: { content: true } },
      { id: 'bk-r2-a', type: 'shape', shapeKind: 'rect', x: 360, y: 676, width: 160, height: 52, borderRadius: 999, fill: { $t: 'colors.seal' }, opacity: 0.9, zIndex: 4 },
      { id: 'bk-r2-at', type: 'text', content: '适读 2-4 岁', fontFamily: HEI, fontSize: 26, fontWeight: '700', color: { $t: 'colors.bg' }, textAlign: 'center', x: 360, y: 688, width: 160, height: 40, zIndex: 5, editable: { content: true } },
      { id: 'bk-r2-d', type: 'text', content: '按一按就会变多，\n娃能自己玩半小时。', fontFamily: HEI, fontSize: 32, color: { $t: 'colors.dim' }, lineHeight: 1.5, x: 360, y: 760, width: 660, height: 100, zIndex: 4, editable: { content: true } },
      { id: 'bk-r3-c', type: 'shape', shapeKind: 'rect', x: 76, y: 910, width: 240, height: 300, borderRadius: 12, border: { width: 5, style: 'dashed', color: { $t: 'colors.ink' } }, zIndex: 3 },
      { id: 'bk-r3-ct', type: 'text', content: '封面位', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.ink' }, opacity: 0.6, textAlign: 'center', x: 76, y: 1044, width: 240, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'bk-r3-n', type: 'text', content: '猜猜我有多爱你', fontFamily: { $t: 'fonts.heading' }, fontSize: 40, fontWeight: '800', color: { $t: 'colors.ink' }, x: 360, y: 930, width: 660, height: 58, zIndex: 4, editable: { content: true } },
      { id: 'bk-r3-a', type: 'shape', shapeKind: 'rect', x: 360, y: 1006, width: 160, height: 52, borderRadius: 999, fill: { $t: 'colors.seal' }, opacity: 0.9, zIndex: 4 },
      { id: 'bk-r3-at', type: 'text', content: '适读 3-6 岁', fontFamily: HEI, fontSize: 26, fontWeight: '700', color: { $t: 'colors.bg' }, textAlign: 'center', x: 360, y: 1018, width: 160, height: 40, zIndex: 5, editable: { content: true } },
      { id: 'bk-r3-d', type: 'text', content: '睡前一本，\n比讲道理管用。', fontFamily: HEI, fontSize: 32, color: { $t: 'colors.dim' }, lineHeight: 1.5, x: 360, y: 1090, width: 660, height: 100, zIndex: 4, editable: { content: true } },
      { id: 'bk-foot', type: 'text', content: '陪读 15 分钟，比说教管用', fontFamily: HEI, fontSize: 34, color: { $t: 'colors.ink' }, x: 48, y: 1250, width: 620, height: 58, zIndex: 4, editable: { content: true } },
      { id: 'bk-star', type: 'image', src: star(56, 'rgba(194,69,46,0.5)'), x: 916, y: 1262, width: 56, height: 56, objectFit: 'contain', zIndex: 5, animation: { name: 'twinkle', duration: 2600, iterationCount: 'infinite' } }
    ]
  },

  // 8. 疫苗接种时间表（1:1）—— 月龄→疫苗→备注
  {
    id: 'parenting-vaccine-cal', name: '疫苗接种时间表', version: '1.0.0', category: 'parenting',
    tags: ['parenting', 'vaccine', 'schedule', 'health', '1:1'],
    thumbnail: svgUri('<rect width="160" height="160" fill="%23F6F2E9"/><g fill="rgba(36,48,56,0.06)"><circle cx="30" cy="30" r="1.4"/><circle cx="120" cy="20" r="1.4"/><circle cx="60" cy="146" r="1.4"/></g><rect x="12" y="14" width="46" height="11" rx="5.5" fill="%234F7D8C"/><rect x="12" y="34" width="92" height="14" rx="2" fill="%23243038"/><g fill="%234F7D8C"><rect x="12" y="58" width="64" height="20" rx="4"/><rect x="12" y="88" width="64" height="20" rx="4"/><rect x="12" y="118" width="64" height="20" rx="4"/></g><g fill="%23243038" opacity="0.7"><rect x="92" y="60" width="56" height="4" rx="2"/><rect x="92" y="68" width="40" height="4" rx="2"/><rect x="92" y="90" width="56" height="4" rx="2"/><rect x="92" y="98" width="44" height="4" rx="2"/><rect x="92" y="120" width="50" height="4" rx="2"/><rect x="92" y="128" width="38" height="4" rx="2"/></g>', 160, 160),
    tokens: {
      colors: {
        bg: { label: '档案纸', default: '#F6F2E9', options: ['#F6F2E9', '#EEF3F1', '#F7F0EC', '#EFF1F6'] },
        ink: { label: '主文字', default: '#243038', options: ['#243038', '#1C2E28', '#38271F', '#232733'] },
        accent: { label: '记录蓝', default: '#4F7D8C', options: ['#4F7D8C', '#4C8B6B', '#9A6B4F', '#5A6B96'] },
        warm: { label: '强调橙', default: '#D98A46', options: ['#D98A46', '#C2703D', '#B4553F', '#7E6BC4'] },
        dim: { label: '弱文字', default: '#8D8577', options: ['#8D8577', '#7B8B84', '#94837A', '#7C8091'] }
      },
      fonts: { heading: { label: '标题字体', default: HEI, options: [HEI, SONG] } }
    },
    presets: [
      { name: '奶油档案', colors: { bg: '#F6F2E9', ink: '#243038', accent: '#4F7D8C', warm: '#D98A46', dim: '#8D8577' } },
      { name: '豆绿体检', colors: { bg: '#EEF3F1', ink: '#1C2E28', accent: '#4C8B6B', warm: '#C2703D', dim: '#7B8B84' } },
      { name: '燕麦清晨', colors: { bg: '#F7F0EC', ink: '#38271F', accent: '#9A6B4F', warm: '#B4553F', dim: '#94837A' } },
      { name: '雾紫深夜', colors: { bg: '#EFF1F6', ink: '#232733', accent: '#5A6B96', warm: '#7E6BC4', dim: '#7C8091' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1080, defaultWidth: 1080, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'vc-bg', type: 'image', src: ledgerBg(1080, 1080, 72), x: 0, y: 0, width: 1080, height: 1080, objectFit: 'fill', zIndex: 1 },
      { id: 'vc-kicker', type: 'text', content: '免疫规划 · 0-6 月龄要点', fontFamily: HEI, fontSize: 28, letterSpacing: 2, color: { $t: 'colors.dim' }, x: 48, y: 64, width: 620, height: 44, zIndex: 3, editable: { content: true } },
      { id: 'vc-title', type: 'text', content: '疫苗接种时间表', fontFamily: { $t: 'fonts.heading' }, fontSize: 80, fontWeight: '900', letterSpacing: 2, color: { $t: 'colors.ink' }, x: 48, y: 100, width: 900, height: 120, zIndex: 3, animation: { name: 'slideInLeft', duration: 520 }, editable: { content: true, fontSize: { type: 'range', min: 56, max: 96 } } },
      { id: 'vc-sub', type: 'text', content: '按时接种，别提前囤苗 · 以社区医院安排为准', fontFamily: HEI, fontSize: 28, color: { $t: 'colors.dim' }, x: 48, y: 230, width: 960, height: 44, zIndex: 3, editable: { content: true } },
      { id: 'vc-m1', group: 'vc-m', type: 'shape', shapeKind: 'rect', x: 48, y: 300, width: 120, height: 64, borderRadius: 16, fill: { $t: 'colors.accent' }, zIndex: 3 },
      { id: 'vc-m1-t', type: 'text', content: '出生', fontFamily: HEI, fontSize: 28, fontWeight: '700', color: { $t: 'colors.bg' }, textAlign: 'center', x: 48, y: 318, width: 120, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'vc-n1', type: 'text', content: '乙肝① + 卡介苗', fontFamily: { $t: 'fonts.heading' }, fontSize: 36, fontWeight: '700', color: { $t: 'colors.ink' }, x: 220, y: 304, width: 760, height: 56, zIndex: 4, editable: { content: true } },
      { id: 'vc-d1', type: 'text', content: '医院直接打，出院前别漏', fontFamily: HEI, fontSize: 28, color: { $t: 'colors.dim' }, x: 220, y: 360, width: 760, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'vc-m2', group: 'vc-m', type: 'shape', shapeKind: 'rect', x: 48, y: 426, width: 120, height: 64, borderRadius: 16, fill: { $t: 'colors.accent' }, zIndex: 3 },
      { id: 'vc-m2-t', type: 'text', content: '1 月龄', fontFamily: HEI, fontSize: 28, fontWeight: '700', color: { $t: 'colors.bg' }, textAlign: 'center', x: 48, y: 444, width: 120, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'vc-n2', type: 'text', content: '乙肝②', fontFamily: { $t: 'fonts.heading' }, fontSize: 36, fontWeight: '700', color: { $t: 'colors.ink' }, x: 220, y: 430, width: 760, height: 56, zIndex: 4, editable: { content: true } },
      { id: 'vc-d2', type: 'text', content: '满月体检一起，别单独跑', fontFamily: HEI, fontSize: 28, color: { $t: 'colors.dim' }, x: 220, y: 486, width: 760, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'vc-m3', group: 'vc-m', type: 'shape', shapeKind: 'rect', x: 48, y: 552, width: 120, height: 64, borderRadius: 16, fill: { $t: 'colors.accent' }, zIndex: 3 },
      { id: 'vc-m3-t', type: 'text', content: '2 月龄', fontFamily: HEI, fontSize: 28, fontWeight: '700', color: { $t: 'colors.bg' }, textAlign: 'center', x: 48, y: 570, width: 120, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'vc-n3', type: 'text', content: '脊灰①', fontFamily: { $t: 'fonts.heading' }, fontSize: 36, fontWeight: '700', color: { $t: 'colors.ink' }, x: 220, y: 556, width: 760, height: 56, zIndex: 4, editable: { content: true } },
      { id: 'vc-d3', type: 'text', content: '口服滴剂，注意当天腹泻', fontFamily: HEI, fontSize: 28, color: { $t: 'colors.dim' }, x: 220, y: 612, width: 760, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'vc-m4', group: 'vc-m', type: 'shape', shapeKind: 'rect', x: 48, y: 678, width: 120, height: 64, borderRadius: 16, fill: { $t: 'colors.accent' }, zIndex: 3 },
      { id: 'vc-m4-t', type: 'text', content: '3 月龄', fontFamily: HEI, fontSize: 28, fontWeight: '700', color: { $t: 'colors.bg' }, textAlign: 'center', x: 48, y: 696, width: 120, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'vc-n4', type: 'text', content: '百白破①', fontFamily: { $t: 'fonts.heading' }, fontSize: 36, fontWeight: '700', color: { $t: 'colors.ink' }, x: 220, y: 682, width: 760, height: 56, zIndex: 4, editable: { content: true } },
      { id: 'vc-d4', type: 'text', content: '可能低烧，多观察精神', fontFamily: HEI, fontSize: 28, color: { $t: 'colors.dim' }, x: 220, y: 738, width: 760, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'vc-m5', group: 'vc-m', type: 'shape', shapeKind: 'rect', x: 48, y: 804, width: 120, height: 64, borderRadius: 16, fill: { $t: 'colors.warm' }, zIndex: 3 },
      { id: 'vc-m5-t', type: 'text', content: '6 月龄', fontFamily: HEI, fontSize: 28, fontWeight: '700', color: { $t: 'colors.bg' }, textAlign: 'center', x: 48, y: 822, width: 120, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'vc-n5', type: 'text', content: '乙肝③ + 流脑', fontFamily: { $t: 'fonts.heading' }, fontSize: 36, fontWeight: '700', color: { $t: 'colors.ink' }, x: 220, y: 808, width: 760, height: 56, zIndex: 4, editable: { content: true } },
      { id: 'vc-d5', type: 'text', content: '半岁小节点，记得约号', fontFamily: HEI, fontSize: 28, color: { $t: 'colors.dim' }, x: 220, y: 864, width: 760, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'vc-foot', type: 'text', content: '早产 / 过敏 / 生病请先问医生，别自行延后', fontFamily: HEI, fontSize: 24, color: { $t: 'colors.dim' }, x: 48, y: 930, width: 960, height: 40, zIndex: 4, editable: { content: true } }
    ]
  }
]

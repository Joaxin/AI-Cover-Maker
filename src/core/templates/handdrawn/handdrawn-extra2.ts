// src/core/templates/handdrawn/handdrawn-extra2.ts
// 手绘风第二批扩展模板：涂鸦插画 + 透明纸纹底 + tokens/presets（可一键换配色）
import type { Template } from '@/types/types'

// ---------- 纸纹底（透明，叠在 backgroundColor token 上）----------
function dotPaper(w: number, h: number, gap = 42, fill = 'rgba(120,53,15,0.16)', r = 2.2) {
  let s = ''
  for (let y = gap; y < h; y += gap) for (let x = gap; x < w; x += gap) s += `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}"/>`
  return 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '">' + s + '</svg>'
}
function ruledPaper(w: number, h: number, gap = 52, stroke = 'rgba(37,99,235,0.16)', marginX = 110, marginColor = 'rgba(225,29,72,0.30)') {
  let s = ''
  for (let y = gap; y < h; y += gap) s += `<line x1="0" y1="${y}" x2="${w}" y2="${y}" stroke="${stroke}" stroke-width="1.5"/>`
  if (marginX > 0) s += `<line x1="${marginX}" y1="0" x2="${marginX}" y2="${h}" stroke="${marginColor}" stroke-width="2"/>`
  return 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '">' + s + '</svg>'
}
function gridPaper(w: number, h: number, gap = 48, stroke = 'rgba(37,99,235,0.14)') {
  let s = ''
  for (let x = 0; x <= w; x += gap) s += `<line x1="${x}" y1="0" x2="${x}" y2="${h}"/>`
  for (let y = 0; y <= h; y += gap) s += `<line x1="0" y1="${y}" x2="${w}" y2="${y}"/>`
  return 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '"><g stroke="' + stroke + '" stroke-width="1">' + s + '</g></svg>'
}
function flecks(w: number, h: number, n: number, fill: string) {
  let s = '', x = 987654321
  const rnd = () => { x = (x * 1103515245 + 12345) & 0x7fffffff; return x }
  for (let i = 0; i < n; i++) { const px = rnd() % w, py = rnd() % h, r = 1 + (rnd() % 3); s += `<circle cx="${px}" cy="${py}" r="${r}" fill="${fill}"/>` }
  return 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '">' + s + '</svg>'
}
function brickBg(w: number, h: number, bw = 170, bh = 64, stroke = 'rgba(255,255,255,0.07)') {
  let s = '', row = 0
  for (let y = 0; y <= h; y += bh, row++) {
    s += `<line x1="0" y1="${y}" x2="${w}" y2="${y}"/>`
    const off = row % 2 ? bw / 2 : 0
    for (let x = off; x <= w; x += bw) s += `<line x1="${x}" y1="${y}" x2="${x}" y2="${Math.min(y + bh, h)}"/>`
  }
  return 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '"><g stroke="' + stroke + '" stroke-width="2">' + s + '</g></svg>'
}
// 手绘抖动表格线（作为 image 元素叠加在表格区域）
function handGrid(w: number, h: number, cols: number, rows: number, stroke = 'rgba(70,50,30,0.55)') {
  const jit = (i: number) => (Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1) * 7 - 3.5
  let s = ''
  for (let i = 0; i <= rows; i++) {
    const yy = (h / rows) * i
    let d = `M0 ${(yy + jit(i * 7 + 1)).toFixed(1)}`
    for (let c = 1; c <= 4; c++) d += ` L${((w / 4) * c).toFixed(1)} ${(yy + jit(i * 13 + c)).toFixed(1)}`
    s += `<path d="${d}" fill="none"/>`
  }
  for (let c = 0; c <= cols; c++) {
    const xx = (w / cols) * c
    let d = `M${(xx + jit(c * 3 + 40)).toFixed(1)} 0`
    for (let r = 1; r <= 4; r++) d += ` L${(xx + jit(c * 17 + r)).toFixed(1)} ${((h / 4) * r).toFixed(1)}`
    s += `<path d="${d}" fill="none"/>`
  }
  return 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h + '"><g stroke="' + stroke + '" stroke-width="2.4" stroke-linecap="round">' + s + '</g></svg>'
}

// ---------- 原创涂鸦线稿（固定插画配色）----------
const STAR = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"><path d="M40 6 L49 30 L74 31 L54 46 L62 72 L40 56 L18 72 L26 46 L6 31 L31 30 Z" fill="none" stroke="%23b45309" stroke-width="4" stroke-linejoin="round"/></svg>'
const STAR_FILL = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"><path d="M40 6 L49 30 L74 31 L54 46 L62 72 L40 56 L18 72 L26 46 L6 31 L31 30 Z" fill="%23facc15" stroke="%23b45309" stroke-width="4" stroke-linejoin="round"/></svg>'
const HEART = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="110" viewBox="0 0 120 110"><path d="M60 100 C 10 60, 16 8, 60 34 C 104 8, 110 60, 60 100 Z" fill="%23fb7185" stroke="%23e11d48" stroke-width="4" stroke-linejoin="round"/></svg>'
const CLOUD = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="180" height="120" viewBox="0 0 180 120"><path d="M42 96 a26 26 0 0 1 4 -52 a30 30 0 0 1 58 -8 a24 24 0 0 1 36 26 a20 20 0 0 1 -8 34 Z" fill="%23ffffff" stroke="%2360a5fa" stroke-width="5" stroke-linejoin="round"/></svg>'
const CHECK = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"><path d="M10 32 L24 46 L52 12" fill="none" stroke="%2316a34a" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></svg>'
const QUILL = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="380" height="60" viewBox="0 0 380 60"><path d="M10 40 C 130 8, 250 8, 372 26 M44 48 C 160 26, 270 30, 350 44" fill="none" stroke="%237c2d12" stroke-width="3" stroke-linecap="round"/></svg>'
const TAPE = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="180" height="60" viewBox="0 0 180 60"><rect width="180" height="60" fill="%23fde68a" opacity="0.8"/><g stroke="%23f59e0b" stroke-width="3" opacity="0.5"><line x1="30" y1="0" x2="10" y2="60"/><line x1="70" y1="0" x2="50" y2="60"/><line x1="110" y1="0" x2="90" y2="60"/><line x1="150" y1="0" x2="130" y2="60"/></g></svg>'
const BULB = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="140" height="150" viewBox="0 0 140 150"><circle cx="70" cy="55" r="38" fill="%23fef08a" stroke="%23f59e0b" stroke-width="5"/><path d="M52 94 h36 M55 107 h30 M60 120 h20" stroke="%23b45309" stroke-width="6" stroke-linecap="round"/><g stroke="%23f59e0b" stroke-width="4" stroke-linecap="round"><line x1="22" y1="14" x2="34" y2="26"/><line x1="118" y1="14" x2="106" y2="26"/></g></svg>'
const X_MARK = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"><path d="M14 14 L66 66 M66 14 L14 66" fill="none" stroke="%23dc2626" stroke-width="10" stroke-linecap="round"/></svg>'
const COMPASS = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><circle cx="100" cy="106" r="88" fill="none" stroke="%2378350f" stroke-width="5"/><circle cx="100" cy="106" r="70" fill="none" stroke="%2378350f" stroke-width="2" stroke-dasharray="3 9"/><path d="M100 42 L118 114 L100 98 L82 114 Z" fill="%23dc2626" stroke="%2378350f" stroke-width="3" stroke-linejoin="round"/><path d="M100 170 L82 98 L100 114 L118 98 Z" fill="none" stroke="%2378350f" stroke-width="3" stroke-linejoin="round"/><text x="100" y="32" font-size="26" text-anchor="middle" fill="%2378350f" font-family="serif">N</text></svg>'
const ROUTE_PATH = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="520" viewBox="0 0 1200 520"><path d="M40 460 C 220 300, 180 120, 380 140 S 640 380, 800 260 S 1020 60, 1160 120" fill="none" stroke="%23dc2626" stroke-width="8" stroke-dasharray="2 24" stroke-linecap="round"/></svg>'
const BARBELL = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="240" height="160" viewBox="0 0 240 160"><line x1="50" y1="80" x2="190" y2="80" stroke="%231c1917" stroke-width="10" stroke-linecap="round"/><rect x="26" y="38" width="26" height="84" rx="8" fill="%231c1917"/><rect x="188" y="38" width="26" height="84" rx="8" fill="%231c1917"/><rect x="4" y="56" width="18" height="48" rx="6" fill="%23ea580c"/><rect x="218" y="56" width="18" height="48" rx="6" fill="%23ea580c"/></svg>'
const MOUNTAINS = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="360" viewBox="0 0 800 360"><path d="M20 340 L260 90 L430 340 Z" fill="none" stroke="%23166534" stroke-width="6" stroke-linejoin="round"/><path d="M300 340 L520 130 L740 340 Z" fill="none" stroke="%2315803d" stroke-width="6" stroke-linejoin="round"/><path d="M232 128 L260 90 L288 128 L270 118 L254 132 L240 120 Z" fill="%23ffffff" stroke="%23166534" stroke-width="3" stroke-linejoin="round"/><circle cx="660" cy="80" r="34" fill="%23fde047" stroke="%23f59e0b" stroke-width="5"/><line x1="10" y1="342" x2="790" y2="342" stroke="%23166534" stroke-width="5" stroke-linecap="round"/></svg>'
const TENT = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="240" viewBox="0 0 300 240"><path d="M150 24 L284 216 H16 Z" fill="none" stroke="%23b45309" stroke-width="7" stroke-linejoin="round"/><path d="M150 96 L116 216 H184 Z" fill="%23fde68a" stroke="%23b45309" stroke-width="5" stroke-linejoin="round"/><line x1="150" y1="24" x2="150" y2="6" stroke="%23b45309" stroke-width="5"/><path d="M150 6 L180 15 L150 24 Z" fill="%23dc2626"/></svg>'
const FIRE = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="140" height="160" viewBox="0 0 140 160"><path d="M70 8 C 96 44, 118 58, 118 92 a48 48 0 0 1 -96 0 C 22 58, 44 44, 70 8 Z" fill="%23f97316" stroke="%23dc2626" stroke-width="5" stroke-linejoin="round" opacity="0.92"/><path d="M70 60 C 84 78, 92 86, 92 102 a22 22 0 0 1 -44 0 c0 -16, 8 -24, 22 -42 Z" fill="%23fde047"/><g stroke="%2378350f" stroke-width="8" stroke-linecap="round"><line x1="34" y1="150" x2="106" y2="138"/><line x1="34" y1="138" x2="106" y2="150"/></g></svg>'
const CLOCK = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="170" viewBox="0 0 160 170"><path d="M58 26 h44 M80 26 v14" stroke="%231e293b" stroke-width="6" stroke-linecap="round" fill="none"/><circle cx="80" cy="100" r="60" fill="none" stroke="%231e293b" stroke-width="6"/><g stroke="%231e293b" stroke-width="6" stroke-linecap="round"><line x1="80" y1="100" x2="80" y2="62"/><line x1="80" y1="100" x2="106" y2="112"/></g><circle cx="80" cy="100" r="6" fill="%23dc2626"/></svg>'
const PEN = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="70" height="170" viewBox="0 0 70 170"><rect x="18" y="18" width="34" height="90" rx="8" fill="none" stroke="%231e293b" stroke-width="5"/><line x1="18" y1="50" x2="52" y2="50" stroke="%231e293b" stroke-width="5"/><path d="M20 108 H50 L35 158 Z" fill="%23b45309" stroke="%2378350f" stroke-width="3" stroke-linejoin="round"/><line x1="35" y1="118" x2="35" y2="142" stroke="%23fef3c7" stroke-width="3"/></svg>'
const ENVELOPE = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="140" viewBox="0 0 200 140"><rect x="8" y="14" width="184" height="112" rx="10" fill="%23ffffff" stroke="%230f766e" stroke-width="5"/><path d="M8 24 L100 84 L192 24" fill="none" stroke="%230f766e" stroke-width="5" stroke-linejoin="round"/></svg>'
const CROWN = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="180" height="130" viewBox="0 0 180 130"><path d="M18 110 L8 38 L48 66 L90 18 L132 66 L172 38 L162 110 Z" fill="%23facc15" stroke="%23b45309" stroke-width="5" stroke-linejoin="round"/><circle cx="8" cy="32" r="7" fill="%23fb7185" stroke="%23b45309" stroke-width="3"/><circle cx="90" cy="12" r="7" fill="%23fb7185" stroke="%23b45309" stroke-width="3"/><circle cx="172" cy="32" r="7" fill="%2360a5fa" stroke="%23b45309" stroke-width="3"/></svg>'
const LEAF = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="200" viewBox="0 0 120 200"><path d="M60 6 C 58 60,58 140,60 196" fill="none" stroke="%2315803d" stroke-width="4" stroke-linecap="round"/>' + Array.from({ length: 6 }, (_, i) => { const y = 40 + i * 26, d = i % 2 ? 1 : -1; return `<ellipse cx="${60 + d * 26}" cy="${y}" rx="24" ry="11" fill="%234ade80" stroke="%2315803d" stroke-width="2" transform="rotate(${d * 32} ${60 + d * 26} ${y})"/>` }).join('') + '</svg>'
const WREATH = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600"><circle cx="300" cy="300" r="230" fill="none" stroke="%2316a34a" stroke-width="14" opacity="0.55"/>' + Array.from({ length: 12 }, (_, i) => {
  const a = (i * Math.PI) / 6, cx = 300 + Math.cos(a) * 230, cy = 300 + Math.sin(a) * 230, petal = ['%23fda4af', '%23fde047', '%23c4b5fd', '%23fdba74'][i % 4]
  const f = (v: number) => v.toFixed(1)
  return `<g><circle cx="${f(cx - 16)}" cy="${f(cy)}" r="13" fill="${petal}"/><circle cx="${f(cx + 16)}" cy="${f(cy)}" r="13" fill="${petal}"/><circle cx="${f(cx)}" cy="${f(cy - 16)}" r="13" fill="${petal}"/><circle cx="${f(cx)}" cy="${f(cy + 16)}" r="13" fill="${petal}"/><circle cx="${f(cx)}" cy="${f(cy)}" r="10" fill="%23fef9c3"/></g>`
}).join('') + '</svg>'

// ---------- 可复用样式片段 ----------
const CN_HAND = 'STXingkai, Xingkai SC, 华文行楷, STKaiti, cursive'
const EN_HAND = 'Segoe Print, Bradley Hand, "Comic Sans MS", cursive'
const PENCIL = 'Courier New, monospace'
const HAND_FONTS = { hand: { label: '手写字', default: CN_HAND, options: [CN_HAND, EN_HAND, 'STKaiti, KaiTi, serif'] } }

// —— 以下辅助仅服务 handdrawn-greeting-card / handdrawn-graffiti（前缀 gc / gf，避免与上方通用函数冲突）——
// 丝带十字：半透明长条压过整张卡纸，颜色走 token 可换色
function gcRibbon(id: string, x: number, y: number, w: number, h: number, zIndex: number) {
  return { id, type: 'shape' as const, shapeKind: 'rect' as const, x, y, width: w, height: h, fill: { $t: 'colors.accent' } as any, opacity: 0.13, zIndex }
}
// 亮片小圆点：交替 ink / accent，闪烁节奏错开
function gcSequins(list: [number, number, number][]) {
  return list.map(([x, y, s], i) => ({
    id: `gc-sequin-${i}`, type: 'shape' as const, shapeKind: 'circle' as const,
    x, y, width: s, height: s, fill: { $t: i % 2 ? 'colors.ink' : 'colors.accent' } as any,
    opacity: 0.7, zIndex: 5, animation: { name: 'twinkle' as const, duration: 2400 + i * 420, delay: i * 260, iterationCount: 'infinite' as const }
  }))
}
// 角落小花 shape 组：5 瓣 + 1 花心
function gcFlower(id: string, cx: number, cy: number, pr: number) {
  const petals = [0, 72, 144, 216, 288].map((deg, i) => ({
    id: `${id}-p${i}`, type: 'shape' as const, shapeKind: 'circle' as const,
    x: Math.round(cx + Math.cos((deg * Math.PI) / 180) * pr - pr * 0.62),
    y: Math.round(cy + Math.sin((deg * Math.PI) / 180) * pr - pr * 0.62),
    width: Math.round(pr * 1.24), height: Math.round(pr * 1.24),
    fill: { $t: i % 2 ? 'colors.accent' : 'colors.ink' } as any, opacity: 0.62, rotation: deg, zIndex: 5
  }))
  return [...petals, { id: `${id}-core`, type: 'shape' as const, shapeKind: 'circle' as const, x: cx - Math.round(pr * 0.5), y: cy - Math.round(pr * 0.5), width: pr, height: pr, fill: { $t: 'colors.bg' } as any, border: { color: { $t: 'colors.ink' } as any, width: 3 }, zIndex: 6 }]
}
// 滴漆竖条（循环，长度不等）：竖条 + 部分带漆珠尾端
function gfDrips(list: [number, number, number, string, boolean][]) {
  const out: any[] = []
  list.forEach(([x, y, h, token, beaded], i) => {
    out.push({ id: `gf-drip-${i}`, type: 'shape' as const, shapeKind: 'rect' as const, x, y, width: 14, height: h, fill: { $t: token } as any, opacity: 0.85, borderRadius: 7, zIndex: 3 })
    if (beaded) out.push({ id: `gf-drip-${i}-bead`, type: 'shape' as const, shapeKind: 'circle' as const, x: x - 4, y: y + h - 3, width: 22, height: 22, fill: { $t: token } as any, opacity: 0.9, zIndex: 3 })
  })
  return out
}
// 过喷碎点（spray overspray）
function gfSpecks(list: [number, number, number, string][]) {
  return list.map(([x, y, s, token], i) => ({
    id: `gf-speck-${i}`, type: 'shape' as const, shapeKind: 'circle' as const, x, y, width: s, height: s,
    fill: { $t: token } as any, opacity: 0.4, zIndex: 4
  }))
}

export const handdrawnExtra2Templates: Template[] = [
  // 1. 头脑风暴便利贴
  {
    id: 'handdrawn-brainstorm', name: '头脑风暴便利贴 (1:1)', version: '1.0.0', category: 'handdrawn', tags: ['handdrawn', 'brainstorm', 'sticky', 'idea', '1:1'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23fffbEB"/><rect x="10" y="16" width="26" height="26" fill="%23fef08a" transform="rotate(-6 23 29)"/><rect x="64" y="14" width="26" height="26" fill="%23bbf7d0" transform="rotate(5 77 27)"/><circle cx="50" cy="56" r="16" fill="%23f59e0b"/></svg>',
    tokens: {
      colors: {
        bg: { label: '纸色', default: '#FFFBEB', options: ['#FFFBEB', '#FFFDF5', '#F8FAFC', '#FEF2F2'] },
        ink: { label: '笔色', default: '#292524', options: ['#292524', '#1C1917', '#44403C', '#334155'] },
        accent: { label: '强调', default: '#F59E0B', options: ['#F59E0B', '#DC2626', '#7C3AED', '#0891B2', '#16A34A'] },
        'note-a': { label: '便利贴·左上', default: '#FEF08A', options: ['#FEF08A', '#BAE6FD', '#FECACA', '#BBF7D0'] },
        'note-b': { label: '便利贴·右上', default: '#BBF7D0', options: ['#BBF7D0', '#A5F3FC', '#FED7AA', '#D9F99D'] },
        'note-c': { label: '便利贴·左下', default: '#FBCFE8', options: ['#FBCFE8', '#C7D2FE', '#FBCFE8', '#A7F3D0'] },
        'note-d': { label: '便利贴·右下', default: '#BFDBFE', options: ['#BFDBFE', '#BBF7D0', '#FEF08A', '#FEF08A'] }
      },
      fonts: HAND_FONTS
    },
    presets: [
      { name: '琥珀思维', colors: { bg: '#FFFBEB', ink: '#292524', accent: '#F59E0B', 'note-a': '#FEF08A', 'note-b': '#BBF7D0', 'note-c': '#FBCFE8', 'note-d': '#BFDBFE' } },
      { name: '冷静青蓝', colors: { bg: '#F8FAFC', ink: '#334155', accent: '#0891B2', 'note-a': '#BAE6FD', 'note-b': '#A5F3FC', 'note-c': '#C7D2FE', 'note-d': '#BBF7D0' } },
      { name: '番茄冲刺', colors: { bg: '#FEF2F2', ink: '#1C1917', accent: '#DC2626', 'note-a': '#FECACA', 'note-b': '#FED7AA', 'note-c': '#FBCFE8', 'note-d': '#FEF08A' } },
      { name: '生长绿调', colors: { bg: '#FFFDF5', ink: '#44403C', accent: '#16A34A', 'note-a': '#BBF7D0', 'note-b': '#D9F99D', 'note-c': '#A7F3D0', 'note-d': '#FEF08A' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1080, defaultWidth: 1080, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' }, backgroundImage: dotPaper(1080, 1080, 46, 'rgba(180,83,9,0.10)') },
    elements: [
      { id: 'title', type: 'text', content: '头脑风暴', fontFamily: { $t: 'fonts.hand' }, fontSize: 92, fontWeight: '700', color: { $t: 'colors.ink' }, x: 90, y: 70, width: 600, height: 120, zIndex: 3, animation: { name: 'inkReveal', duration: 1000 }, editable: { content: true, position: true } },
      { id: 'sub', type: 'text', content: 'BRAINSTORM · 把想法贴出来', fontFamily: PENCIL, fontSize: 28, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 3, x: 96, y: 196, width: 640, height: 40, zIndex: 3, editable: { content: true } },
      { id: 'bulb', type: 'image', src: BULB, objectFit: 'contain', x: 880, y: 70, width: 130, height: 140, zIndex: 5, animation: { name: 'float', duration: 3600, iterationCount: 'infinite' } },
      { id: 'bubble', type: 'shape', shapeKind: 'rect', x: 330, y: 440, width: 420, height: 180, fill: { $t: 'colors.accent' }, borderRadius: 90, zIndex: 2, animation: { name: 'zoomIn', duration: 600, delay: 300 } },
      { id: 'bubble-text', type: 'text', content: '如果从零开始，\n我们会做什么？', fontFamily: { $t: 'fonts.hand' }, fontSize: 40, fontWeight: '700', color: '#FFFFFF', textAlign: 'center', lineHeight: 1.4, x: 350, y: 470, width: 380, height: 120, zIndex: 4, editable: { content: true } },
      { id: 'stick-a', type: 'shape', shapeKind: 'rect', x: 96, y: 300, width: 220, height: 220, fill: { $t: 'colors.note-a' }, rotation: -6, shadow: { offsetX: 4, offsetY: 6, blur: 10, color: 'rgba(0,0,0,0.12)' }, zIndex: 2 },
      { id: 'stick-a-text', type: 'text', content: '用户到底\n在意什么？', fontFamily: { $t: 'fonts.hand' }, fontSize: 34, fontWeight: '400', color: { $t: 'colors.ink' }, lineHeight: 1.4, rotation: -6, x: 120, y: 340, width: 172, height: 140, zIndex: 3, editable: { content: true } },
      { id: 'stick-b', type: 'shape', shapeKind: 'rect', x: 764, y: 290, width: 220, height: 220, fill: { $t: 'colors.note-b' }, rotation: 5, shadow: { offsetX: 4, offsetY: 6, blur: 10, color: 'rgba(0,0,0,0.12)' }, zIndex: 2 },
      { id: 'stick-b-text', type: 'text', content: '一周内\n能上线吗？', fontFamily: { $t: 'fonts.hand' }, fontSize: 34, fontWeight: '400', color: { $t: 'colors.ink' }, lineHeight: 1.4, rotation: 5, x: 788, y: 330, width: 172, height: 140, zIndex: 3, editable: { content: true } },
      { id: 'stick-c', type: 'shape', shapeKind: 'rect', x: 110, y: 740, width: 220, height: 220, fill: { $t: 'colors.note-c' }, rotation: 4, shadow: { offsetX: 4, offsetY: 6, blur: 10, color: 'rgba(0,0,0,0.12)' }, zIndex: 2 },
      { id: 'stick-c-text', type: 'text', content: '名字要\n够顺口', fontFamily: { $t: 'fonts.hand' }, fontSize: 34, fontWeight: '400', color: { $t: 'colors.ink' }, lineHeight: 1.4, rotation: 4, x: 134, y: 780, width: 172, height: 140, zIndex: 3, editable: { content: true } },
      { id: 'stick-d', type: 'shape', shapeKind: 'rect', x: 756, y: 756, width: 220, height: 220, fill: { $t: 'colors.note-d' }, rotation: -5, shadow: { offsetX: 4, offsetY: 6, blur: 10, color: 'rgba(0,0,0,0.12)' }, zIndex: 2 },
      { id: 'stick-d-text', type: 'text', content: '先做\n最小版本', fontFamily: { $t: 'fonts.hand' }, fontSize: 34, fontWeight: '400', color: { $t: 'colors.ink' }, lineHeight: 1.4, rotation: -5, x: 780, y: 796, width: 172, height: 140, zIndex: 3, editable: { content: true } },
      { id: 'link-a', type: 'shape', shapeKind: 'rect', x: 300, y: 420, width: 130, height: 5, fill: { $t: 'colors.ink' }, opacity: 0.45, rotation: 14, zIndex: 1 },
      { id: 'link-b', type: 'shape', shapeKind: 'rect', x: 660, y: 400, width: 130, height: 5, fill: { $t: 'colors.ink' }, opacity: 0.45, rotation: -18, zIndex: 1 },
      { id: 'link-c', type: 'shape', shapeKind: 'rect', x: 310, y: 660, width: 130, height: 5, fill: { $t: 'colors.ink' }, opacity: 0.45, rotation: -24, zIndex: 1 },
      { id: 'link-d', type: 'shape', shapeKind: 'rect', x: 655, y: 668, width: 130, height: 5, fill: { $t: 'colors.ink' }, opacity: 0.45, rotation: 22, zIndex: 1 },
      { id: 'footer', type: 'text', content: 'idea wall · no.07', fontFamily: PENCIL, fontSize: 24, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.45, x: 400, y: 1010, width: 280, height: 32, textAlign: 'center', zIndex: 3, editable: { content: true } }
    ]
  },

  // 2. 街头涂鸦喷漆墙
  {
    id: 'handdrawn-graffiti', name: '街头涂鸦喷漆墙 (4:5)', version: '1.0.0', category: 'handdrawn', tags: ['handdrawn', 'graffiti', 'spray', 'street', '4:5'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="125" viewBox="0 0 100 125"><rect width="100" height="125" fill="%231c1917"/><g stroke="%23ffffff" stroke-width="1" opacity="0.08"><line x1="0" y1="24" x2="100" y2="24"/><line x1="0" y1="48" x2="100" y2="48"/><line x1="0" y1="72" x2="100" y2="72"/><line x1="0" y1="96" x2="100" y2="96"/><line x1="34" y1="24" x2="34" y2="48"/><line x1="67" y1="48" x2="67" y2="72"/><line x1="20" y1="72" x2="20" y2="96"/><line x1="80" y1="72" x2="80" y2="96"/></g><g stroke="%23facc15" stroke-width="1.2" opacity="0.16"><line x1="0" y1="60" x2="100" y2="60"/><line x1="0" y1="90" x2="100" y2="90"/></g><circle cx="26" cy="26" r="22" fill="%23facc15" opacity="0.11"/><circle cx="76" cy="46" r="25" fill="%23f472b6" opacity="0.10"/><circle cx="44" cy="96" r="23" fill="%23facc15" opacity="0.08"/><path d="M40 10 L50 4 L60 10 L55 16 L45 16 Z" fill="%23facc15" stroke="%23b45309" stroke-width="1"/><text x="12" y="46" font-size="24" font-family="Impact" fill="%23000000" opacity="0.85">RAW</text><text x="10" y="44" font-size="24" font-family="Impact" fill="%23facc15">RAW</text><g fill="%23facc15"><rect x="22" y="50" width="3.4" height="20" rx="1.7"/><circle cx="23.7" cy="71" r="2.6"/><rect x="45" y="52" width="3" height="11" rx="1.5"/></g><g fill="%23f472b6"><rect x="66" y="50" width="3.4" height="16" rx="1.7"/><circle cx="67.7" cy="67" r="2.4"/><rect x="85" y="50" width="3" height="22" rx="1.5"/></g><rect x="8" y="80" width="42" height="12" fill="%23f472b6" transform="rotate(-4 29 86)"/><rect x="62" y="104" width="26" height="9" fill="%23facc15" transform="rotate(6 75 108)"/><rect x="8" y="104" width="22" height="8" fill="%23f472b6" transform="rotate(-7 19 108)"/><text x="30" y="112" font-size="7" font-family="cursive" fill="%23facc15" transform="rotate(-6 44 109)">墙在说话</text><text x="65" y="110.5" font-size="4.2" font-family="cursive" fill="%231c1917">限流一条</text><text x="10" y="120" font-size="4.5" font-family="monospace" fill="%23facc15" opacity="0.7">wall 03</text></svg>',
    tokens: {
      colors: {
        bg: { label: '墙面', default: '#1C1917', options: ['#1C1917', '#292524', '#0F172A', '#3B2A20'] },
        primary: { label: '喷漆', default: '#FACC15', options: ['#FACC15', '#F472B6', '#22D3EE', '#4ADE80', '#FB923C', '#A78BFA'] },
        accent: { label: '辅助', default: '#F472B6', options: ['#F472B6', '#22D3EE', '#A78BFA', '#F87171', '#FDE047', '#4ADE80'] }
      },
      fonts: { heading: { label: '大字', default: 'Impact, Haettenschweiler, sans-serif', options: ['Impact, Haettenschweiler, sans-serif', EN_HAND, 'Arial Black, sans-serif'] }, hand: { label: '手写字', default: CN_HAND, options: [CN_HAND, EN_HAND, 'STKaiti, KaiTi, serif'] } }
    },
    presets: [
      { name: '夜色金漆', colors: { bg: '#1C1917', primary: '#FACC15', accent: '#F472B6' } },
      { name: '赛博粉青', colors: { bg: '#0F172A', primary: '#22D3EE', accent: '#F472B6' } },
      { name: '活力橙雾', colors: { bg: '#292524', primary: '#FB923C', accent: '#FDE047' } },
      { name: '电光紫夜', colors: { bg: '#3B2A20', primary: '#A78BFA', accent: '#4ADE80' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' }, backgroundImage: brickBg(1080, 1350, 176, 66, 'rgba(255,255,255,0.07)') },
    elements: [
      // —— 墙面层：砖缝高光 + 喷漆云雾大色块（低透明度叠加）——
      { id: 'gf-seam-1', type: 'shape', shapeKind: 'rect', x: 26, y: 636, width: 1028, height: 6, fill: { $t: 'colors.primary' }, opacity: 0.06, zIndex: 1 },
      { id: 'gf-seam-2', type: 'shape', shapeKind: 'rect', x: 26, y: 966, width: 1028, height: 6, fill: { $t: 'colors.accent' }, opacity: 0.06, zIndex: 1 },
      { id: 'gf-cloud-1', group: 'gf-cloud-', type: 'shape', shapeKind: 'circle', x: 40, y: 110, width: 430, height: 430, fill: { $t: 'colors.primary' }, opacity: 0.10, zIndex: 1, animation: { name: 'pulse', duration: 9000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'gf-cloud-2', group: 'gf-cloud-', type: 'shape', shapeKind: 'circle', x: 560, y: 360, width: 490, height: 490, fill: { $t: 'colors.accent' }, opacity: 0.09, zIndex: 1, animation: { name: 'drift', duration: 16000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'gf-cloud-3', group: 'gf-cloud-', type: 'shape', shapeKind: 'circle', x: 236, y: 896, width: 424, height: 424, fill: { $t: 'colors.primary' }, opacity: 0.07, zIndex: 1 },
      // —— 主标题：黑投影 + 黄漆双层，滴漆竖条从字脚下挂下来 ——
      { id: 'crown', type: 'image', src: CROWN, objectFit: 'contain', x: 430, y: 110, width: 220, height: 150, rotation: -6, zIndex: 5, animation: { name: 'swing', duration: 3200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'title-shadow', type: 'text', content: 'STREET\nMIND', fontFamily: { $t: 'fonts.heading' }, fontSize: 200, fontWeight: '900', color: 'rgba(0,0,0,0.85)', lineHeight: 1.05, letterSpacing: 6, x: 112, y: 302, width: 880, height: 460, zIndex: 2 },
      { id: 'title', type: 'text', content: 'STREET\nMIND', fontFamily: { $t: 'fonts.heading' }, fontSize: 200, fontWeight: '900', color: { $t: 'colors.primary' }, lineHeight: 1.05, letterSpacing: 6, x: 96, y: 288, width: 880, height: 460, zIndex: 3, animation: { name: 'zoomIn', duration: 700 }, editable: { content: true, fontSize: { type: 'range', min: 140, max: 240 }, position: true } },
      ...gfDrips([
        [240, 700, 140, 'colors.primary', true],
        [430, 706, 78, 'colors.accent', false],
        [600, 694, 150, 'colors.primary', true],
        [812, 702, 104, 'colors.accent', false],
        [930, 690, 140, 'colors.primary', true]
      ] as [number, number, number, string, boolean][]),
      // —— 贴纸群：斜贴错落，压住墙面 ——
      { id: 'tag', type: 'shape', shapeKind: 'rect', x: 100, y: 860, width: 420, height: 96, fill: { $t: 'colors.accent' }, rotation: -3, borderRadius: 14, zIndex: 2 },
      { id: 'tag-text', type: 'text', content: 'RAW IDEA CREW', fontFamily: { $t: 'fonts.heading' }, fontSize: 38, fontWeight: '900', color: { $t: 'colors.bg' }, letterSpacing: 2, textAlign: 'center', rotation: -3, x: 110, y: 884, width: 400, height: 52, zIndex: 4, editable: { content: true } },
      { id: 'sticker', type: 'shape', shapeKind: 'rect', x: 640, y: 850, width: 300, height: 110, fill: '#FFFFFF', border: { color: { $t: 'colors.bg' }, width: 5, style: 'dashed' }, rotation: 5, borderRadius: 55, zIndex: 2 },
      { id: 'sticker-text', type: 'text', content: 'EST. 2026', fontFamily: PENCIL, fontSize: 40, fontWeight: '700', color: { $t: 'colors.bg' }, textAlign: 'center', rotation: 5, x: 660, y: 882, width: 260, height: 48, zIndex: 4, editable: { content: true } },
      { id: 'gf-sticker-bl', type: 'shape', shapeKind: 'rect', x: 62, y: 1152, width: 224, height: 68, fill: { $t: 'colors.primary' }, rotation: -8, borderRadius: 10, zIndex: 4 },
      { id: 'gf-sticker-br', type: 'shape', shapeKind: 'rect', x: 640, y: 1146, width: 256, height: 70, fill: { $t: 'colors.accent' }, rotation: 6, borderRadius: 10, zIndex: 4 },
      { id: 'gf-sticker-tag', type: 'text', content: '今日限流：只限一条', fontFamily: { $t: 'fonts.hand' }, fontSize: 26, fontWeight: '700', color: { $t: 'colors.bg' }, textAlign: 'center', rotation: 6, x: 648, y: 1162, width: 244, height: 44, zIndex: 5, editable: { content: true } },
      // —— 喷漆签名粗字 + 过喷碎点 ——
      { id: 'gf-sign', type: 'text', content: '墙在说话', fontFamily: { $t: 'fonts.hand' }, fontSize: 66, fontWeight: '700', color: { $t: 'colors.primary' }, letterSpacing: 4, rotation: -6, x: 316, y: 1140, width: 320, height: 96, zIndex: 5, animation: { name: 'inkReveal', duration: 1200, delay: 500 }, shadow: { offsetX: 5, offsetY: 6, blur: 0, color: 'rgba(0,0,0,0.65)' }, editable: { content: true } },
      ...gfSpecks([[992, 372, 18, 'colors.primary'], [64, 992, 13, 'colors.accent']] as [number, number, number, string][]),
      { id: 'quote', type: 'text', content: '“城市是画布，想法是油漆。”', fontFamily: { $t: 'fonts.hand' }, fontSize: 44, fontWeight: '400', color: '#FFFFFF', opacity: 0.92, x: 96, y: 1060, width: 880, height: 70, zIndex: 4, animation: { name: 'fadeInUp', duration: 800, delay: 400 }, editable: { content: true } },
      { id: 'footer', type: 'text', content: 'spraycan journal · wall 03', fontFamily: PENCIL, fontSize: 26, fontWeight: '700', color: { $t: 'colors.primary' }, opacity: 0.8, letterSpacing: 2, x: 96, y: 1240, width: 520, height: 36, zIndex: 4, editable: { content: true } }
    ]
  },

  // 3. 手绘旅行路线图
  {
    id: 'handdrawn-travel-map', name: '手绘旅行路线图 (16:9)', version: '1.0.0', category: 'handdrawn', tags: ['handdrawn', 'travel', 'map', 'route', '16:9'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="178" height="100" viewBox="0 0 178 100"><rect width="178" height="100" fill="%23faedd3"/><path d="M20 80 C 50 50, 60 30, 90 40 S 140 70, 160 30" fill="none" stroke="%23dc2626" stroke-width="3" stroke-dasharray="1 6" stroke-linecap="round"/><circle cx="20" cy="80" r="5" fill="%23dc2626"/><circle cx="160" cy="30" r="6" fill="none" stroke="%2378350f" stroke-width="2"/></svg>',
    tokens: {
      colors: {
        bg: { label: '纸色', default: '#FAEDD3', options: ['#FAEDD3', '#FEF6E7', '#F5EEDC', '#FFF8EC'] },
        ink: { label: '笔色', default: '#78350F', options: ['#78350F', '#92400E', '#57534E', '#1E293B'] },
        accent: { label: '路线', default: '#DC2626', options: ['#DC2626', '#EA580C', '#0F766E', '#7C3AED'] }
      },
      fonts: HAND_FONTS
    },
    presets: [
      { name: '旧羊皮卷', colors: { bg: '#FAEDD3', ink: '#78350F', accent: '#DC2626' } },
      { name: '牛皮暖橙', colors: { bg: '#FEF6E7', ink: '#92400E', accent: '#EA580C' } },
      { name: '青墨航线', colors: { bg: '#F5EEDC', ink: '#1E293B', accent: '#0F766E' } },
      { name: '紫罗兰漫游', colors: { bg: '#FFF8EC', ink: '#57534E', accent: '#7C3AED' } }
    ],
    canvas: { virtualWidth: 1920, virtualHeight: 1080, defaultWidth: 1920, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' }, backgroundImage: flecks(1920, 1080, 130, 'rgba(120,53,15,0.10)') },
    elements: [
      { id: 'frame-outer', type: 'shape', shapeKind: 'rect', x: 36, y: 36, width: 1848, height: 1008, border: { color: { $t: 'colors.ink' }, width: 6 }, opacity: 0.85, zIndex: 5 },
      { id: 'frame-inner', type: 'shape', shapeKind: 'rect', x: 62, y: 62, width: 1796, height: 956, border: { color: { $t: 'colors.ink' }, width: 2, style: 'dashed' }, opacity: 0.5, zIndex: 5 },
      { id: 'title', type: 'text', content: '滇西环线 · 七日', fontFamily: { $t: 'fonts.hand' }, fontSize: 92, fontWeight: '700', color: { $t: 'colors.ink' }, x: 120, y: 110, width: 900, height: 120, zIndex: 3, animation: { name: 'inkReveal', duration: 1100 }, editable: { content: true, position: true } },
      { id: 'sub', type: 'text', content: 'DAY 1 → DAY 7 · 大理 — 丽江 — 香格里拉', fontFamily: PENCIL, fontSize: 32, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 2, x: 120, y: 236, width: 1100, height: 46, zIndex: 3, editable: { content: true } },
      { id: 'route', type: 'image', src: ROUTE_PATH, objectFit: 'contain', x: 380, y: 400, width: 1180, height: 500, zIndex: 2, animation: { name: 'inkReveal', duration: 1600, delay: 400 } },
      { id: 'compass', type: 'image', src: COMPASS, objectFit: 'contain', x: 1600, y: 120, width: 220, height: 220, zIndex: 4 },
      { id: 'pin-1', group: 'pin-', type: 'shape', shapeKind: 'circle', x: 404, y: 828, width: 34, height: 34, fill: { $t: 'colors.accent' }, border: { color: { $t: 'colors.ink' }, width: 4 }, zIndex: 3 },
      { id: 'pin-1-text', type: 'text', content: '大理 · 起点', fontFamily: { $t: 'fonts.hand' }, fontSize: 36, fontWeight: '400', color: { $t: 'colors.ink' }, x: 300, y: 880, width: 260, height: 48, zIndex: 3, editable: { content: true } },
      { id: 'pin-2', group: 'pin-', type: 'shape', shapeKind: 'circle', x: 812, y: 552, width: 34, height: 34, fill: { $t: 'colors.accent' }, border: { color: { $t: 'colors.ink' }, width: 4 }, zIndex: 3, animation: { name: 'ripple', duration: 2600, iterationCount: 'infinite' } },
      { id: 'pin-2-text', type: 'text', content: '沙溪古镇', fontFamily: { $t: 'fonts.hand' }, fontSize: 36, fontWeight: '400', color: { $t: 'colors.ink' }, x: 720, y: 494, width: 220, height: 48, zIndex: 3, editable: { content: true } },
      { id: 'pin-3', group: 'pin-', type: 'shape', shapeKind: 'circle', x: 1158, y: 638, width: 34, height: 34, fill: { $t: 'colors.accent' }, border: { color: { $t: 'colors.ink' }, width: 4 }, zIndex: 3 },
      { id: 'pin-3-text', type: 'text', content: '虎跳峡', fontFamily: { $t: 'fonts.hand' }, fontSize: 36, fontWeight: '400', color: { $t: 'colors.ink' }, x: 1080, y: 690, width: 200, height: 48, zIndex: 3, editable: { content: true } },
      { id: 'x-mark', type: 'image', src: X_MARK, objectFit: 'contain', x: 1440, y: 470, width: 92, height: 92, zIndex: 3, animation: { name: 'zoomIn', duration: 500, delay: 1200 } },
      { id: 'dest-text', type: 'text', content: '丽江 · 终点', fontFamily: { $t: 'fonts.hand' }, fontSize: 42, fontWeight: '700', color: { $t: 'colors.accent' }, x: 1380, y: 566, width: 240, height: 56, zIndex: 3, editable: { content: true } },
      { id: 'cloud', type: 'image', src: CLOUD, objectFit: 'contain', x: 1450, y: 880, width: 200, height: 130, opacity: 0.8, zIndex: 4, animation: { name: 'drift', duration: 18000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'stamp', type: 'text', content: '· 手绘于归途火车上 ·', fontFamily: { $t: 'fonts.hand' }, fontSize: 30, fontWeight: '400', color: { $t: 'colors.ink' }, opacity: 0.6, x: 120, y: 960, width: 460, height: 44, zIndex: 3, editable: { content: true } }
    ]
  },

  // 4. 拍立得拼贴手账
  {
    id: 'handdrawn-scrapbook', name: '拍立得拼贴手账 (1:1)', version: '1.0.0', category: 'handdrawn', tags: ['handdrawn', 'scrapbook', 'polaroid', 'photo', '1:1'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23fefce8"/><rect x="14" y="26" width="34" height="44" fill="%23ffffff" transform="rotate(-6 31 48)"/><rect x="19" y="31" width="24" height="26" fill="%23bae6fd"/><rect x="52" y="30" width="34" height="44" fill="%23ffffff" transform="rotate(6 69 52)"/><rect x="57" y="35" width="24" height="26" fill="%23fde68a"/></svg>',
    tokens: {
      colors: {
        bg: { label: '纸色', default: '#FEFCE8', options: ['#FEFCE8', '#FFFDF5', '#F8FAFC', '#FFF1F2'] },
        ink: { label: '笔色', default: '#44403C', options: ['#44403C', '#1C1917', '#57534E', '#334155'] },
        accent: { label: '强调', default: '#E11D48', options: ['#E11D48', '#7C3AED', '#2563EB', '#059669', '#EA580C'] }
      },
      fonts: { hand: { label: '手写字', default: EN_HAND, options: [EN_HAND, CN_HAND, PENCIL] } }
    },
    presets: [
      { name: '奶油相册', colors: { bg: '#FEFCE8', ink: '#44403C', accent: '#E11D48' } },
      { name: '雾蓝旅行', colors: { bg: '#F8FAFC', ink: '#334155', accent: '#2563EB' } },
      { name: '粉格青春', colors: { bg: '#FFF1F2', ink: '#1C1917', accent: '#7C3AED' } },
      { name: '森系胶片', colors: { bg: '#FFFDF5', ink: '#57534E', accent: '#059669' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1080, defaultWidth: 1080, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' }, backgroundImage: dotPaper(1080, 1080, 44, 'rgba(70,60,40,0.10)') },
    elements: [
      { id: 'title', type: 'text', content: '我们的夏天', fontFamily: { $t: 'fonts.hand' }, fontSize: 88, fontWeight: '700', color: { $t: 'colors.ink' }, x: 90, y: 64, width: 640, height: 110, zIndex: 3, animation: { name: 'inkReveal', duration: 1000 }, editable: { content: true, position: true } },
      { id: 'title-rule', type: 'image', src: QUILL, objectFit: 'contain', x: 100, y: 176, width: 460, height: 52, zIndex: 3, animation: { name: 'inkReveal', duration: 800, delay: 400 } },
      { id: 'pola-a-frame', type: 'shape', shapeKind: 'rect', x: 120, y: 290, width: 390, height: 470, fill: '#FFFFFF', border: { color: 'rgba(0,0,0,0.12)', width: 2 }, rotation: -6, shadow: { offsetX: 8, offsetY: 12, blur: 18, color: 'rgba(0,0,0,0.18)' }, zIndex: 2 },
      { id: 'pola-a-img', type: 'image', src: '/images/photo/summer-lake-330x330.jpg', objectFit: 'cover', x: 150, y: 320, width: 330, height: 330, rotation: -6, zIndex: 3, editable: { src: { type: 'upload' }, position: true, size: { type: 'scale', min: 0.5, max: 2 } } },
      { id: 'pola-a-cap', type: 'text', content: '洱海边 · 第 3 天', fontFamily: { $t: 'fonts.hand' }, fontSize: 34, fontWeight: '400', color: { $t: 'colors.ink' }, textAlign: 'center', rotation: -6, x: 130, y: 672, width: 370, height: 48, zIndex: 3, editable: { content: true } },
      { id: 'tape-a1', type: 'image', src: TAPE, objectFit: 'contain', x: 96, y: 268, width: 140, height: 48, rotation: -40, zIndex: 6 },
      { id: 'tape-a2', type: 'image', src: TAPE, objectFit: 'contain', x: 428, y: 726, width: 140, height: 48, rotation: -40, zIndex: 6 },
      { id: 'pola-b-frame', type: 'shape', shapeKind: 'rect', x: 566, y: 330, width: 390, height: 470, fill: '#FFFFFF', border: { color: 'rgba(0,0,0,0.12)', width: 2 }, rotation: 5, shadow: { offsetX: 8, offsetY: 12, blur: 18, color: 'rgba(0,0,0,0.18)' }, zIndex: 2 },
      { id: 'pola-b-img', type: 'image', src: '/images/photo/summer-friends-330x330.jpg', objectFit: 'cover', x: 596, y: 360, width: 330, height: 330, rotation: 5, zIndex: 3, editable: { src: { type: 'upload' }, position: true, size: { type: 'scale', min: 0.5, max: 2 } } },
      { id: 'pola-b-cap', type: 'text', content: '晚风与冰汽水肿', fontFamily: { $t: 'fonts.hand' }, fontSize: 34, fontWeight: '400', color: { $t: 'colors.ink' }, textAlign: 'center', rotation: 5, x: 576, y: 712, width: 370, height: 48, zIndex: 3, editable: { content: true } },
      { id: 'tape-b1', type: 'image', src: TAPE, objectFit: 'contain', x: 556, y: 306, width: 140, height: 48, rotation: 34, zIndex: 6 },
      { id: 'note', type: 'shape', shapeKind: 'rect', x: 800, y: 90, width: 210, height: 210, fill: '#FEF08A', rotation: 8, shadow: { offsetX: 4, offsetY: 6, blur: 10, color: 'rgba(0,0,0,0.12)' }, zIndex: 4 },
      { id: 'note-text', type: 'text', content: '要常回头\n看看笑过的\n地方', fontFamily: { $t: 'fonts.hand' }, fontSize: 32, fontWeight: '400', color: '#713F12', lineHeight: 1.4, textAlign: 'center', rotation: 8, x: 818, y: 122, width: 176, height: 150, zIndex: 5, editable: { content: true } },
      { id: 'heart', type: 'image', src: HEART, objectFit: 'contain', x: 86, y: 120, width: 96, height: 88, zIndex: 5, animation: { name: 'heartbeat', duration: 2200, iterationCount: 'infinite' } },
      { id: 'star', group: 'star', type: 'image', src: STAR, objectFit: 'contain', x: 920, y: 860, width: 84, height: 84, zIndex: 5, animation: { name: 'twinkle', duration: 2800, iterationCount: 'infinite' } },
      { id: 'footer', type: 'text', content: 'photo & memory · summer 2026', fontFamily: PENCIL, fontSize: 26, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 2, x: 120, y: 990, width: 560, height: 36, zIndex: 3, editable: { content: true } }
    ]
  },

  // 5. 手绘本月书单
  {
    id: 'handdrawn-book-list', name: '手绘本月书单 (9:16)', version: '1.0.0', category: 'handdrawn', tags: ['handdrawn', 'book', 'reading', 'list', '9:16'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="178" viewBox="0 0 100 178"><rect width="100" height="178" fill="%23fff7ed"/><rect x="16" y="52" width="10" height="34" fill="%23dc2626"/><rect x="28" y="52" width="10" height="34" fill="%232563eb"/><rect x="40" y="52" width="10" height="34" fill="%23059669"/><line x1="58" y1="60" x2="86" y2="60" stroke="%2392400e" stroke-width="3"/><line x1="58" y1="72" x2="80" y2="72" stroke="%2392400e" stroke-width="2"/></svg>',
    tokens: {
      colors: {
        bg: { label: '纸色', default: '#FFF7ED', options: ['#FFF7ED', '#FFFBEB', '#FEFCE8', '#F8FAFC'] },
        ink: { label: '笔色', default: '#7C2D12', options: ['#7C2D12', '#44403C', '#1E293B', '#57534E'] },
        accent: { label: '强调', default: '#EA580C', options: ['#EA580C', '#B45309', '#BE123C', '#7C3AED'] },
        sp1: { label: '书脊一', default: '#DC2626', options: ['#DC2626', '#B91C1C', '#9F1239', '#6D28D9'] },
        sp2: { label: '书脊二', default: '#2563EB', options: ['#2563EB', '#1D4ED8', '#4338CA', '#2563EB'] },
        sp3: { label: '书脊三', default: '#059669', options: ['#059669', '#15803D', '#0F766E', '#0D9488'] },
        sp4: { label: '书脊四', default: '#7C3AED', options: ['#7C3AED', '#78350F', '#7E22CE', '#DB2777'] }
      },
      fonts: HAND_FONTS
    },
    presets: [
      { name: '暖橙书房', colors: { bg: '#FFF7ED', ink: '#7C2D12', accent: '#EA580C', sp1: '#DC2626', sp2: '#2563EB', sp3: '#059669', sp4: '#7C3AED' } },
      { name: '焦糖复古', colors: { bg: '#FFFBEB', ink: '#44403C', accent: '#B45309', sp1: '#B91C1C', sp2: '#1D4ED8', sp3: '#15803D', sp4: '#78350F' } },
      { name: '玫瑰藏书', colors: { bg: '#FEFCE8', ink: '#1E293B', accent: '#BE123C', sp1: '#9F1239', sp2: '#4338CA', sp3: '#0F766E', sp4: '#7E22CE' } },
      { name: '紫调夜读', colors: { bg: '#F8FAFC', ink: '#57534E', accent: '#7C3AED', sp1: '#6D28D9', sp2: '#2563EB', sp3: '#0D9488', sp4: '#DB2777' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1920, defaultWidth: 1080, defaultHeight: 1920, backgroundColor: { $t: 'colors.bg' }, backgroundImage: dotPaper(1080, 1920, 46, 'rgba(124,45,18,0.10)') },
    elements: [
      { id: 'frame', type: 'shape', shapeKind: 'rect', x: 56, y: 100, width: 968, height: 1720, border: { color: { $t: 'colors.ink' }, width: 3, style: 'dashed' }, borderRadius: 20, opacity: 0.5, zIndex: 1 },
      { id: 'title', type: 'text', content: '五月 · 书单', fontFamily: { $t: 'fonts.hand' }, fontSize: 110, fontWeight: '700', color: { $t: 'colors.ink' }, x: 120, y: 190, width: 800, height: 150, zIndex: 3, animation: { name: 'inkReveal', duration: 1100 }, editable: { content: true, position: true } },
      { id: 'sub', type: 'text', content: 'READ 5 · DONE 5', fontFamily: PENCIL, fontSize: 32, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 5, x: 126, y: 352, width: 600, height: 44, zIndex: 3, editable: { content: true } },
      { id: 'underline', type: 'image', src: QUILL, objectFit: 'contain', x: 128, y: 410, width: 480, height: 50, zIndex: 3, animation: { name: 'inkReveal', duration: 800, delay: 500 } },
      { id: 'spine-1', group: 'spine-', type: 'shape', shapeKind: 'rect', x: 130, y: 560, width: 64, height: 180, fill: { $t: 'colors.sp1' }, borderRadius: 8, rotation: -2, zIndex: 2 },
      { id: 'book-1', type: 'text', content: '《百年孤独》 · 马尔克斯', fontFamily: { $t: 'fonts.hand' }, fontSize: 46, fontWeight: '400', color: { $t: 'colors.ink' }, x: 240, y: 590, width: 640, height: 60, zIndex: 3, editable: { content: true } },
      { id: 'rate-1', type: 'text', content: '★★★★★', fontFamily: EN_HAND, fontSize: 40, color: { $t: 'colors.accent' }, x: 240, y: 668, width: 320, height: 52, zIndex: 3 },
      { id: 'spine-2', group: 'spine-', type: 'shape', shapeKind: 'rect', x: 130, y: 810, width: 64, height: 180, fill: { $t: 'colors.sp2' }, borderRadius: 8, rotation: 2, zIndex: 2 },
      { id: 'book-2', type: 'text', content: '《小王子》 · 圣埃克苏佩里', fontFamily: { $t: 'fonts.hand' }, fontSize: 46, fontWeight: '400', color: { $t: 'colors.ink' }, x: 240, y: 840, width: 640, height: 60, zIndex: 3, editable: { content: true } },
      { id: 'rate-2', type: 'text', content: '★★★★☆', fontFamily: EN_HAND, fontSize: 40, color: { $t: 'colors.accent' }, x: 240, y: 918, width: 320, height: 52, zIndex: 3 },
      { id: 'spine-3', group: 'spine-', type: 'shape', shapeKind: 'rect', x: 130, y: 1060, width: 64, height: 180, fill: { $t: 'colors.sp3' }, borderRadius: 8, rotation: -2, zIndex: 2 },
      { id: 'book-3', type: 'text', content: '《人类简史》 · 尤瓦尔·赫拉利', fontFamily: { $t: 'fonts.hand' }, fontSize: 46, fontWeight: '400', color: { $t: 'colors.ink' }, x: 240, y: 1090, width: 700, height: 60, zIndex: 3, editable: { content: true } },
      { id: 'rate-3', type: 'text', content: '★★★★☆', fontFamily: EN_HAND, fontSize: 40, color: { $t: 'colors.accent' }, x: 240, y: 1168, width: 320, height: 52, zIndex: 3 },
      { id: 'spine-4', group: 'spine-', type: 'shape', shapeKind: 'rect', x: 130, y: 1310, width: 64, height: 180, fill: { $t: 'colors.sp4' }, borderRadius: 8, rotation: 2, zIndex: 2 },
      { id: 'book-4', type: 'text', content: '《月亮与六便士》 · 毛姆', fontFamily: { $t: 'fonts.hand' }, fontSize: 46, fontWeight: '400', color: { $t: 'colors.ink' }, x: 240, y: 1340, width: 640, height: 60, zIndex: 3, editable: { content: true } },
      { id: 'rate-4', type: 'text', content: '★★★★★', fontFamily: EN_HAND, fontSize: 40, color: { $t: 'colors.accent' }, x: 240, y: 1418, width: 320, height: 52, zIndex: 3 },
      { id: 'spine-5', group: 'spine-', type: 'shape', shapeKind: 'rect', x: 130, y: 1560, width: 64, height: 180, fill: { $t: 'colors.accent' }, borderRadius: 8, rotation: -2, zIndex: 2 },
      { id: 'book-5', type: 'text', content: '《瓦尔登湖》 · 梭罗', fontFamily: { $t: 'fonts.hand' }, fontSize: 46, fontWeight: '400', color: { $t: 'colors.ink' }, x: 240, y: 1590, width: 640, height: 60, zIndex: 3, editable: { content: true } },
      { id: 'rate-5', type: 'text', content: '★★★☆☆', fontFamily: EN_HAND, fontSize: 40, color: { $t: 'colors.accent' }, x: 240, y: 1668, width: 320, height: 52, zIndex: 3 },
      { id: 'pen', type: 'image', src: PEN, objectFit: 'contain', x: 872, y: 1600, width: 88, height: 210, rotation: 18, zIndex: 4 },
      { id: 'footer', type: 'text', content: 'next: 海浪与灯塔', fontFamily: PENCIL, fontSize: 28, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.5, x: 130, y: 1800, width: 480, height: 38, zIndex: 3, editable: { content: true } }
    ]
  },

  // 6. 手绘收支记账本
  {
    id: 'handdrawn-budget', name: '手绘收支记账本 (4:5)', version: '1.0.0', category: 'handdrawn', tags: ['handdrawn', 'budget', 'finance', 'chart', '4:5'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="125" viewBox="0 0 100 125"><rect width="100" height="125" fill="%23f0f9ff"/><g stroke="%232563eb" opacity="0.15"><line x1="0" y1="30" x2="100" y2="30"/><line x1="0" y1="55" x2="100" y2="55"/><line x1="0" y1="80" x2="100" y2="80"/></g><rect x="20" y="62" width="10" height="28" fill="%230f766e"/><rect x="38" y="50" width="10" height="40" fill="%23dc2626"/><rect x="56" y="70" width="10" height="20" fill="%230f766e"/></svg>',
    tokens: {
      colors: {
        bg: { label: '纸色', default: '#F0F9FF', options: ['#F0F9FF', '#ECFEFF', '#F8FAFC', '#FFFDF5'] },
        ink: { label: '笔色', default: '#0F172A', options: ['#0F172A', '#1E293B', '#334155', '#44403C'] },
        accent: { label: '强调', default: '#0F766E', options: ['#0F766E', '#2563EB', '#7C3AED', '#B45309'] },
        in: { label: '收入色', default: '#15803D', options: ['#15803D', '#0D9488', '#16A34A', '#4D7C0F'] },
        out: { label: '支出色', default: '#B91C1C', options: ['#B91C1C', '#DC2626', '#BE123C', '#C2410C'] }
      },
      fonts: HAND_FONTS
    },
    presets: [
      { name: '青竹账本', colors: { bg: '#F0F9FF', ink: '#0F172A', accent: '#0F766E', in: '#15803D', out: '#B91C1C' } },
      { name: '蔚蓝理财', colors: { bg: '#ECFEFF', ink: '#1E293B', accent: '#2563EB', in: '#0D9488', out: '#DC2626' } },
      { name: '紫金存钱', colors: { bg: '#F8FAFC', ink: '#334155', accent: '#7C3AED', in: '#16A34A', out: '#BE123C' } },
      { name: '棕木储蓄', colors: { bg: '#FFFDF5', ink: '#44403C', accent: '#B45309', in: '#4D7C0F', out: '#C2410C' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' }, backgroundImage: ruledPaper(1080, 1350, 54) },
    elements: [
      { id: 'title', type: 'text', content: '六月记账本', fontFamily: { $t: 'fonts.hand' }, fontSize: 96, fontWeight: '700', color: { $t: 'colors.ink' }, x: 130, y: 90, width: 640, height: 130, zIndex: 3, animation: { name: 'inkReveal', duration: 1000 }, editable: { content: true, position: true } },
      { id: 'sub', type: 'text', content: 'JUNE LEDGER · 收支两讫', fontFamily: PENCIL, fontSize: 28, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 3, x: 130, y: 226, width: 620, height: 40, zIndex: 3, editable: { content: true } },
      { id: 'env', type: 'image', src: ENVELOPE, objectFit: 'contain', x: 850, y: 110, width: 160, height: 112, rotation: 8, zIndex: 5, animation: { name: 'float', duration: 4200, iterationCount: 'infinite' } },
      { id: 'in-h', type: 'text', content: '↓ 收入 INCOME', fontFamily: { $t: 'fonts.hand' }, fontSize: 44, fontWeight: '700', color: { $t: 'colors.in' }, x: 130, y: 320, width: 380, height: 56, zIndex: 3, editable: { content: true } },
      { id: 'in-1', type: 'text', content: '工资 ······ 12,000', fontFamily: PENCIL, fontSize: 34, color: { $t: 'colors.ink' }, x: 130, y: 396, width: 380, height: 44, zIndex: 3, editable: { content: true } },
      { id: 'in-2', type: 'text', content: '稿费 ·········· 800', fontFamily: PENCIL, fontSize: 34, color: { $t: 'colors.ink' }, x: 130, y: 452, width: 380, height: 44, zIndex: 3, editable: { content: true } },
      { id: 'in-3', type: 'text', content: '理财 ·········· 240', fontFamily: PENCIL, fontSize: 34, color: { $t: 'colors.ink' }, x: 130, y: 508, width: 380, height: 44, zIndex: 3, editable: { content: true } },
      { id: 'out-h', type: 'text', content: '↑ 支出 EXPENSE', fontFamily: { $t: 'fonts.hand' }, fontSize: 44, fontWeight: '700', color: { $t: 'colors.out' }, x: 590, y: 320, width: 400, height: 56, zIndex: 3, editable: { content: true } },
      { id: 'out-1', type: 'text', content: '房租 ······ 3,500', fontFamily: PENCIL, fontSize: 34, color: { $t: 'colors.ink' }, x: 590, y: 396, width: 400, height: 44, zIndex: 3, editable: { content: true } },
      { id: 'out-2', type: 'text', content: '咖啡 ········· 128', fontFamily: PENCIL, fontSize: 34, color: { $t: 'colors.ink' }, x: 590, y: 452, width: 400, height: 44, zIndex: 3, editable: { content: true } },
      { id: 'out-3', type: 'text', content: '买书 ········· 216', fontFamily: PENCIL, fontSize: 34, color: { $t: 'colors.ink' }, x: 590, y: 508, width: 400, height: 44, zIndex: 3, editable: { content: true } },
      { id: 'chart-h', type: 'text', content: '每周支出曲线', fontFamily: { $t: 'fonts.hand' }, fontSize: 44, fontWeight: '700', color: { $t: 'colors.ink' }, x: 130, y: 610, width: 500, height: 56, zIndex: 3, editable: { content: true } },
      { id: 'bar-1', group: 'bar-', type: 'shape', shapeKind: 'rect', x: 170, y: 800, width: 76, height: 150, fill: { $t: 'colors.accent' }, borderRadius: 10, opacity: 0.85, zIndex: 2, animation: { name: 'fadeInUp', duration: 600, delay: 200 } },
      { id: 'bar-2', group: 'bar-', type: 'shape', shapeKind: 'rect', x: 310, y: 730, width: 76, height: 220, fill: { $t: 'colors.out' }, borderRadius: 10, opacity: 0.85, zIndex: 2, animation: { name: 'fadeInUp', duration: 600, delay: 400 } },
      { id: 'bar-3', group: 'bar-', type: 'shape', shapeKind: 'rect', x: 450, y: 830, width: 76, height: 120, fill: { $t: 'colors.accent' }, borderRadius: 10, opacity: 0.85, zIndex: 2, animation: { name: 'fadeInUp', duration: 600, delay: 600 } },
      { id: 'bar-4', group: 'bar-', type: 'shape', shapeKind: 'rect', x: 590, y: 776, width: 76, height: 174, fill: { $t: 'colors.out' }, borderRadius: 10, opacity: 0.85, zIndex: 2, animation: { name: 'fadeInUp', duration: 600, delay: 800 } },
      { id: 'baseline', type: 'shape', shapeKind: 'line', x: 130, y: 950, width: 820, height: 5, fill: { $t: 'colors.ink' }, zIndex: 2 },
      { id: 'bar-labels', type: 'text', content: 'W1            W2            W3            W4', fontFamily: PENCIL, fontSize: 26, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.6, x: 158, y: 966, width: 560, height: 34, zIndex: 3 },
      { id: 'save-hl', type: 'shape', shapeKind: 'rect', x: 130, y: 1060, width: 560, height: 84, fill: 'rgba(21,128,61,0.12)', borderRadius: 12, rotation: -1, zIndex: 1 },
      { id: 'save-text', type: 'text', content: '本月结余 +9,196 ↑ 攒下一半自由', fontFamily: { $t: 'fonts.hand' }, fontSize: 44, fontWeight: '700', color: { $t: 'colors.in' }, rotation: -1, x: 150, y: 1076, width: 660, height: 56, zIndex: 3, animation: { name: 'zoomIn', duration: 600, delay: 900 }, editable: { content: true } },
      { id: 'footer', type: 'text', content: 'coin journal · p.06', fontFamily: PENCIL, fontSize: 24, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.45, x: 130, y: 1250, width: 400, height: 34, zIndex: 3, editable: { content: true } }
    ]
  },

  // 7. 手绘健身打卡表
  {
    id: 'handdrawn-workout', name: '手绘健身打卡表 (9:16)', version: '1.0.0', category: 'handdrawn', tags: ['handdrawn', 'workout', 'fitness', 'checklist', '9:16'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="178" viewBox="0 0 100 178"><rect width="100" height="178" fill="%23fafaf9"/><line x1="30" y1="52" x2="70" y2="52" stroke="%231c1917" stroke-width="4"/><rect x="24" y="44" width="6" height="16" fill="%231c1917"/><rect x="70" y="44" width="6" height="16" fill="%231c1917"/><rect x="22" y="80" width="12" height="12" fill="%23ea580c"/><rect x="40" y="80" width="12" height="12" fill="none" stroke="%231c1917" stroke-width="2"/></svg>',
    tokens: {
      colors: {
        bg: { label: '纸色', default: '#FAFAF9', options: ['#FAFAF9', '#FFFFFF', '#FFF7ED', '#F0FDFA'] },
        ink: { label: '笔色', default: '#1C1917', options: ['#1C1917', '#292524', '#0F172A', '#44403C'] },
        accent: { label: '强调', default: '#EA580C', options: ['#EA580C', '#DC2626', '#059669', '#2563EB', '#7C3AED'] }
      },
      fonts: { heading: { label: '大标题', default: 'Impact, Haettenschweiler, sans-serif', options: ['Impact, Haettenschweiler, sans-serif', 'Arial Black, sans-serif', EN_HAND] }, hand: { label: '手写字', default: CN_HAND, options: [CN_HAND, EN_HAND, 'STKaiti, KaiTi, serif'] } }
    },
    presets: [
      { name: '燃脂橙', colors: { bg: '#FAFAF9', ink: '#1C1917', accent: '#EA580C' } },
      { name: '硬核红', colors: { bg: '#FFFFFF', ink: '#0F172A', accent: '#DC2626' } },
      { name: '薄荷铁馆', colors: { bg: '#F0FDFA', ink: '#292524', accent: '#059669' } },
      { name: '蓝调力量', colors: { bg: '#FFF7ED', ink: '#44403C', accent: '#2563EB' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1920, defaultWidth: 1080, defaultHeight: 1920, backgroundColor: { $t: 'colors.bg' }, backgroundImage: gridPaper(1080, 1920, 60, 'rgba(28,25,23,0.06)') },
    elements: [
      { id: 'barbell', type: 'image', src: BARBELL, objectFit: 'contain', x: 400, y: 120, width: 280, height: 180, zIndex: 4, animation: { name: 'bounce', duration: 2600, iterationCount: 'infinite' } },
      { id: 'title', type: 'text', content: 'LEG DAY', fontFamily: { $t: 'fonts.heading' }, fontSize: 150, fontWeight: '900', color: { $t: 'colors.ink' }, letterSpacing: 6, x: 110, y: 330, width: 860, height: 170, textAlign: 'center', zIndex: 3, animation: { name: 'zoomIn', duration: 600 }, editable: { content: true, fontSize: { type: 'range', min: 100, max: 180 }, position: true } },
      { id: 'title-hl', type: 'shape', shapeKind: 'rect', x: 300, y: 470, width: 480, height: 26, fill: { $t: 'colors.accent' }, opacity: 0.9, rotation: -1, borderRadius: 8, zIndex: 2 },
      { id: 'sub', type: 'text', content: '腿部训练 · 第 8 周 · 状态满格', fontFamily: PENCIL, fontSize: 30, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 2, x: 130, y: 520, width: 820, height: 44, textAlign: 'center', zIndex: 3, editable: { content: true } },
      { id: 'ex-1', type: 'text', content: '深蹲 4×12', fontFamily: { $t: 'fonts.hand' }, fontSize: 52, fontWeight: '700', color: { $t: 'colors.ink' }, x: 130, y: 660, width: 500, height: 64, zIndex: 3, editable: { content: true } },
      { id: 'e1-b1', group: 'e1-b', type: 'shape', shapeKind: 'rect', x: 720, y: 664, width: 58, height: 58, fill: { $t: 'colors.accent' }, borderRadius: 12, zIndex: 2 },
      { id: 'e1-b2', group: 'e1-b', type: 'shape', shapeKind: 'rect', x: 812, y: 664, width: 58, height: 58, fill: { $t: 'colors.accent' }, borderRadius: 12, zIndex: 2 },
      { id: 'e1-b3', group: 'e1-b', type: 'shape', shapeKind: 'rect', x: 904, y: 664, width: 58, height: 58, border: { color: { $t: 'colors.ink' }, width: 4 }, borderRadius: 12, zIndex: 2 },
      { id: 'ex-2', type: 'text', content: '硬拉 3×10', fontFamily: { $t: 'fonts.hand' }, fontSize: 52, fontWeight: '700', color: { $t: 'colors.ink' }, x: 130, y: 800, width: 500, height: 64, zIndex: 3, editable: { content: true } },
      { id: 'e2-b1', group: 'e2-b', type: 'shape', shapeKind: 'rect', x: 720, y: 804, width: 58, height: 58, fill: { $t: 'colors.accent' }, borderRadius: 12, zIndex: 2 },
      { id: 'e2-b2', group: 'e2-b', type: 'shape', shapeKind: 'rect', x: 812, y: 804, width: 58, height: 58, fill: { $t: 'colors.accent' }, borderRadius: 12, zIndex: 2 },
      { id: 'e2-b3', group: 'e2-b', type: 'shape', shapeKind: 'rect', x: 904, y: 804, width: 58, height: 58, fill: { $t: 'colors.accent' }, borderRadius: 12, zIndex: 2 },
      { id: 'ex-3', type: 'text', content: '腿举 3×15', fontFamily: { $t: 'fonts.hand' }, fontSize: 52, fontWeight: '700', color: { $t: 'colors.ink' }, x: 130, y: 940, width: 500, height: 64, zIndex: 3, editable: { content: true } },
      { id: 'e3-b1', group: 'e3-b', type: 'shape', shapeKind: 'rect', x: 720, y: 944, width: 58, height: 58, fill: { $t: 'colors.accent' }, borderRadius: 12, zIndex: 2 },
      { id: 'e3-b2', group: 'e3-b', type: 'shape', shapeKind: 'rect', x: 812, y: 944, width: 58, height: 58, border: { color: { $t: 'colors.ink' }, width: 4 }, borderRadius: 12, zIndex: 2 },
      { id: 'e3-b3', group: 'e3-b', type: 'shape', shapeKind: 'rect', x: 904, y: 944, width: 58, height: 58, border: { color: { $t: 'colors.ink' }, width: 4 }, borderRadius: 12, zIndex: 2 },
      { id: 'ex-4', type: 'text', content: '提踵 4×20', fontFamily: { $t: 'fonts.hand' }, fontSize: 52, fontWeight: '700', color: { $t: 'colors.ink' }, x: 130, y: 1080, width: 500, height: 64, zIndex: 3, editable: { content: true } },
      { id: 'e4-b1', group: 'e4-b', type: 'shape', shapeKind: 'rect', x: 720, y: 1084, width: 58, height: 58, border: { color: { $t: 'colors.ink' }, width: 4 }, borderRadius: 12, zIndex: 2 },
      { id: 'e4-b2', group: 'e4-b', type: 'shape', shapeKind: 'rect', x: 812, y: 1084, width: 58, height: 58, border: { color: { $t: 'colors.ink' }, width: 4 }, borderRadius: 12, zIndex: 2 },
      { id: 'e4-b3', group: 'e4-b', type: 'shape', shapeKind: 'rect', x: 904, y: 1084, width: 58, height: 58, border: { color: { $t: 'colors.ink' }, width: 4 }, borderRadius: 12, zIndex: 2 },
      { id: 'prog-label', type: 'text', content: '本周完成度 70%', fontFamily: PENCIL, fontSize: 30, fontWeight: '700', color: { $t: 'colors.ink' }, x: 130, y: 1240, width: 460, height: 42, zIndex: 3, editable: { content: true } },
      { id: 'prog-track', type: 'shape', shapeKind: 'rect', x: 140, y: 1300, width: 800, height: 28, border: { color: { $t: 'colors.ink' }, width: 4 }, borderRadius: 14, zIndex: 2 },
      { id: 'prog-fill', type: 'shape', shapeKind: 'rect', x: 148, y: 1306, width: 552, height: 16, fill: { $t: 'colors.accent' }, borderRadius: 8, zIndex: 3, animation: { name: 'slideInLeft', duration: 900, delay: 400 } },
      { id: 'quote', type: 'text', content: '“别和理想中的自己比，\n和昨天的自己比。”', fontFamily: { $t: 'fonts.hand' }, fontSize: 40, fontWeight: '400', color: { $t: 'colors.ink' }, lineHeight: 1.5, opacity: 0.85, x: 130, y: 1450, width: 700, height: 140, zIndex: 3, animation: { name: 'fadeIn', duration: 900, delay: 600 }, editable: { content: true } },
      { id: 'footer', type: 'text', content: 'sweat journal · week 08', fontFamily: PENCIL, fontSize: 26, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.45, x: 130, y: 1780, width: 500, height: 36, zIndex: 3, editable: { content: true } }
    ]
  },

  // 8. 手绘心情格阵
  {
    id: 'handdrawn-mood-tracker', name: '手绘心情格阵 (1:1)', version: '1.0.0', category: 'handdrawn', tags: ['handdrawn', 'mood', 'tracker', 'grid', '1:1'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23fffbeb"/><g stroke="%2378716c" stroke-width="1" opacity="0.5"><line x1="20" y1="30" x2="90" y2="30"/><line x1="20" y1="50" x2="90" y2="50"/><line x1="20" y1="70" x2="90" y2="70"/><line x1="40" y1="30" x2="40" y2="70"/><line x1="60" y1="30" x2="60" y2="70"/><line x1="80" y1="30" x2="80" y2="70"/></g><circle cx="50" cy="40" r="5" fill="%23facc15"/><circle cx="70" cy="60" r="5" fill="%2386efac"/></svg>',
    tokens: {
      colors: {
        bg: { label: '纸色', default: '#FFFBEB', options: ['#FFFBEB', '#FFFDF5', '#F8FAFC', '#FDF4FF'] },
        ink: { label: '笔色', default: '#57534E', options: ['#57534E', '#44403C', '#1E293B', '#78716C'] },
        accent: { label: '强调', default: '#F59E0B', options: ['#F59E0B', '#EC4899', '#8B5CF6', '#0EA5E9'] },
        happy: { label: '开心', default: '#FACC15', options: ['#FACC15', '#FDE047', '#FCD34D', '#FDE68A'] },
        calm: { label: '平静', default: '#86EFAC', options: ['#86EFAC', '#A7F3D0', '#99F6E4', '#6EE7B7'] },
        focus: { label: '专注', default: '#93C5FD', options: ['#93C5FD', '#C4B5FD', '#A5B4FC', '#7DD3FC'] },
        grateful: { label: '感恩', default: '#F9A8D4', options: ['#F9A8D4', '#F9A8D4', '#F0ABFC', '#FBCFE8'] },
        tired: { label: '疲惫', default: '#CBD5E1', options: ['#CBD5E1', '#D6D3D1', '#CBD5E1', '#CBD5E1'] }
      },
      fonts: HAND_FONTS
    },
    presets: [
      { name: '暖阳心情', colors: { bg: '#FFFBEB', ink: '#57534E', accent: '#F59E0B', happy: '#FACC15', calm: '#86EFAC', focus: '#93C5FD', grateful: '#F9A8D4', tired: '#CBD5E1' } },
      { name: '粉雾情绪', colors: { bg: '#FDF4FF', ink: '#44403C', accent: '#EC4899', happy: '#FDE047', calm: '#A7F3D0', focus: '#C4B5FD', grateful: '#F9A8D4', tired: '#D6D3D1' } },
      { name: '紫调内观', colors: { bg: '#F8FAFC', ink: '#1E293B', accent: '#8B5CF6', happy: '#FCD34D', calm: '#99F6E4', focus: '#A5B4FC', grateful: '#F0ABFC', tired: '#CBD5E1' } },
      { name: '晴空记录', colors: { bg: '#FFFDF5', ink: '#78716C', accent: '#0EA5E9', happy: '#FDE68A', calm: '#6EE7B7', focus: '#7DD3FC', grateful: '#FBCFE8', tired: '#CBD5E1' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1080, defaultWidth: 1080, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' }, backgroundImage: dotPaper(1080, 1080, 48, 'rgba(120,113,108,0.12)') },
    elements: [
      { id: 'title', type: 'text', content: '一周心情格阵', fontFamily: { $t: 'fonts.hand' }, fontSize: 84, fontWeight: '700', color: { $t: 'colors.ink' }, x: 90, y: 70, width: 700, height: 110, zIndex: 3, animation: { name: 'inkReveal', duration: 1000 }, editable: { content: true, fontSize: { type: 'range', min: 55, max: 109 }, position: true } },
      { id: 'sub', type: 'text', content: 'MOOD TRACKER · W37', fontFamily: PENCIL, fontSize: 28, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 4, x: 96, y: 188, width: 560, height: 40, zIndex: 3, editable: { content: true } },
      { id: 'cloud', type: 'image', src: CLOUD, objectFit: 'contain', x: 880, y: 60, width: 150, height: 100, opacity: 0.85, zIndex: 5, animation: { name: 'drift', duration: 15000, iterationCount: 'infinite', easing: 'ease-in-out' }, editable: { position: true, size: { type: 'scale' } } },
      { id: 'grid', type: 'image', src: handGrid(800, 400, 7, 5, 'rgba(87,83,78,0.55)'), objectFit: 'fill', x: 150, y: 430, width: 800, height: 400, zIndex: 2 },
      { id: 'wd-1', type: 'text', content: '一', fontFamily: { $t: 'fonts.hand' }, fontSize: 32, color: { $t: 'colors.ink' }, textAlign: 'center', x: 150, y: 384, width: 114, height: 42, zIndex: 3 },
      { id: 'wd-2', type: 'text', content: '二', fontFamily: { $t: 'fonts.hand' }, fontSize: 32, color: { $t: 'colors.ink' }, textAlign: 'center', x: 264, y: 384, width: 114, height: 42, zIndex: 3 },
      { id: 'wd-3', type: 'text', content: '三', fontFamily: { $t: 'fonts.hand' }, fontSize: 32, color: { $t: 'colors.ink' }, textAlign: 'center', x: 378, y: 384, width: 114, height: 42, zIndex: 3 },
      { id: 'wd-4', type: 'text', content: '四', fontFamily: { $t: 'fonts.hand' }, fontSize: 32, color: { $t: 'colors.ink' }, textAlign: 'center', x: 492, y: 384, width: 114, height: 42, zIndex: 3 },
      { id: 'wd-5', type: 'text', content: '五', fontFamily: { $t: 'fonts.hand' }, fontSize: 32, color: { $t: 'colors.ink' }, textAlign: 'center', x: 606, y: 384, width: 114, height: 42, zIndex: 3 },
      { id: 'wd-6', type: 'text', content: '六', fontFamily: { $t: 'fonts.hand' }, fontSize: 32, color: { $t: 'colors.ink' }, textAlign: 'center', x: 720, y: 384, width: 114, height: 42, zIndex: 3 },
      { id: 'wd-7', type: 'text', content: '日', fontFamily: { $t: 'fonts.hand' }, fontSize: 32, color: { $t: 'colors.ink' }, textAlign: 'center', x: 836, y: 384, width: 114, height: 42, zIndex: 3 },
      { id: 'dot-1', group: 'dot-', type: 'shape', shapeKind: 'circle', x: 185, y: 448, width: 44, height: 44, fill: { $t: 'colors.happy' }, zIndex: 4, animation: { name: 'zoomIn', duration: 400, delay: 300 } },
      { id: 'dot-2', group: 'dot-', type: 'shape', shapeKind: 'circle', x: 408, y: 448, width: 44, height: 44, fill: { $t: 'colors.focus' }, zIndex: 4, animation: { name: 'zoomIn', duration: 400, delay: 450 } },
      { id: 'dot-3', group: 'dot-', type: 'shape', shapeKind: 'circle', x: 631, y: 528, width: 44, height: 44, fill: { $t: 'colors.calm' }, zIndex: 4, animation: { name: 'zoomIn', duration: 400, delay: 600 } },
      { id: 'dot-4', group: 'dot-', type: 'shape', shapeKind: 'circle', x: 854, y: 448, width: 44, height: 44, fill: { $t: 'colors.happy' }, zIndex: 4, animation: { name: 'zoomIn', duration: 400, delay: 750 } },
      { id: 'dot-5', group: 'dot-', type: 'shape', shapeKind: 'circle', x: 294, y: 608, width: 44, height: 44, fill: { $t: 'colors.grateful' }, zIndex: 4, animation: { name: 'zoomIn', duration: 400, delay: 900 } },
      { id: 'dot-6', group: 'dot-', type: 'shape', shapeKind: 'circle', x: 517, y: 688, width: 44, height: 44, fill: { $t: 'colors.tired' }, zIndex: 4, animation: { name: 'zoomIn', duration: 400, delay: 1050 } },
      { id: 'dot-7', group: 'dot-', type: 'shape', shapeKind: 'circle', x: 740, y: 608, width: 44, height: 44, fill: { $t: 'colors.calm' }, zIndex: 4, animation: { name: 'zoomIn', duration: 400, delay: 1200 } },
      { id: 'dot-8', group: 'dot-', type: 'shape', shapeKind: 'circle', x: 854, y: 768, width: 44, height: 44, fill: { $t: 'colors.focus' }, zIndex: 4, animation: { name: 'zoomIn', duration: 400, delay: 1350 } },
      { id: 'lg-1', group: 'lg-', type: 'shape', shapeKind: 'circle', x: 130, y: 920, width: 30, height: 30, fill: { $t: 'colors.happy' }, zIndex: 3 },
      { id: 'lg-1t', type: 'text', content: '开心', fontFamily: { $t: 'fonts.hand' }, fontSize: 30, color: { $t: 'colors.ink' }, x: 170, y: 918, width: 90, height: 36, zIndex: 3, editable: { content: true } },
      { id: 'lg-2', group: 'lg-', type: 'shape', shapeKind: 'circle', x: 300, y: 920, width: 30, height: 30, fill: { $t: 'colors.calm' }, zIndex: 3 },
      { id: 'lg-2t', type: 'text', content: '平静', fontFamily: { $t: 'fonts.hand' }, fontSize: 30, color: { $t: 'colors.ink' }, x: 340, y: 918, width: 90, height: 36, zIndex: 3, editable: { content: true } },
      { id: 'lg-3', group: 'lg-', type: 'shape', shapeKind: 'circle', x: 470, y: 920, width: 30, height: 30, fill: { $t: 'colors.focus' }, zIndex: 3 },
      { id: 'lg-3t', type: 'text', content: '专注', fontFamily: { $t: 'fonts.hand' }, fontSize: 30, color: { $t: 'colors.ink' }, x: 510, y: 918, width: 90, height: 36, zIndex: 3, editable: { content: true } },
      { id: 'lg-4', group: 'lg-', type: 'shape', shapeKind: 'circle', x: 640, y: 920, width: 30, height: 30, fill: { $t: 'colors.grateful' }, zIndex: 3 },
      { id: 'lg-4t', type: 'text', content: '感恩', fontFamily: { $t: 'fonts.hand' }, fontSize: 30, color: { $t: 'colors.ink' }, x: 680, y: 918, width: 90, height: 36, zIndex: 3, editable: { content: true } },
      { id: 'lg-5', group: 'lg-', type: 'shape', shapeKind: 'circle', x: 810, y: 920, width: 30, height: 30, fill: { $t: 'colors.tired' }, zIndex: 3 },
      { id: 'lg-5t', type: 'text', content: '疲惫', fontFamily: { $t: 'fonts.hand' }, fontSize: 30, color: { $t: 'colors.ink' }, x: 850, y: 918, width: 90, height: 36, zIndex: 3, editable: { content: true } },
      { id: 'footer', type: 'text', content: 'feelings are weather, you are the sky.', fontFamily: PENCIL, fontSize: 26, fontWeight: '700', color: { $t: 'colors.accent' }, x: 150, y: 1004, width: 700, height: 36, zIndex: 3, editable: { content: true } }
    ]
  },

  // 9. 花环生日贺卡
  {
    id: 'handdrawn-greeting-card', name: '花环生日贺卡 (4:5)', version: '1.0.0', category: 'handdrawn', tags: ['handdrawn', 'birthday', 'card', 'wreath', '4:5'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="125" viewBox="0 0 100 125"><rect width="100" height="125" fill="%23fff1f2"/><g fill="none" stroke="%239f1239"><rect x="5" y="5" width="90" height="115" rx="4" stroke-width="1.6" opacity="0.8"/><rect x="9" y="9" width="82" height="107" rx="3" stroke-width="0.8" stroke-dasharray="3 2" opacity="0.55"/></g><path d="M10 10 L50 26 M90 10 L50 26" fill="none" stroke="%239f1239" stroke-width="0.7" opacity="0.35"/><rect x="45" y="5" width="10" height="115" fill="%23e11d48" opacity="0.12"/><rect x="5" y="60" width="90" height="10" fill="%23e11d48" opacity="0.12"/><circle cx="50" cy="44" r="24" fill="none" stroke="%2316a34a" stroke-width="3.4" opacity="0.55"/><g><circle cx="50" cy="20" r="3.4" fill="%23fda4af"/><circle cx="74" cy="44" r="3.4" fill="%23fde047"/><circle cx="50" cy="68" r="3.4" fill="%23c4b5fd"/><circle cx="26" cy="44" r="3.4" fill="%23fdba74"/></g><text x="50" y="48" font-size="12" text-anchor="middle" fill="%239f1239" font-family="cursive">生日快乐</text><rect x="15" y="86" width="58" height="2.6" fill="%239f1239" opacity="0.5"/><rect x="15" y="93" width="48" height="2.6" fill="%239f1239" opacity="0.4"/><rect x="15" y="100" width="54" height="2.6" fill="%239f1239" opacity="0.3"/><g transform="translate(18 112)"><circle cx="0" cy="-6" r="3.4" fill="%23e11d48" opacity="0.7"/><circle cx="5.7" cy="-1.9" r="3.4" fill="%239f1239" opacity="0.7"/><circle cx="3.5" cy="4.9" r="3.4" fill="%23e11d48" opacity="0.7"/><circle cx="-3.5" cy="4.9" r="3.4" fill="%239f1239" opacity="0.7"/><circle cx="-5.7" cy="-1.9" r="3.4" fill="%23e11d48" opacity="0.7"/><circle cx="0" cy="0" r="2.6" fill="%23fff1f2" stroke="%239f1239" stroke-width="0.8"/></g><g fill="%23e11d48" opacity="0.75"><circle cx="86" cy="88" r="3"/><circle cx="80" cy="103" r="2"/></g><g fill="%239f1239" opacity="0.6"><circle cx="12" cy="76" r="2.2"/><circle cx="90" cy="34" r="2"/></g></svg>',
    tokens: {
      colors: {
        bg: { label: '卡纸', default: '#FFF1F2', options: ['#FFF1F2', '#FFFBEB', '#FDF4FF', '#F0FDFA'] },
        ink: { label: '笔色', default: '#9F1239', options: ['#9F1239', '#B45309', '#7C3AED', '#0F766E'] },
        accent: { label: '强调', default: '#E11D48', options: ['#E11D48', '#F59E0B', '#A855F7', '#14B8A6'] }
      },
      fonts: HAND_FONTS
    },
    presets: [
      { name: '蜜桃粉黛', colors: { bg: '#FFF1F2', ink: '#9F1239', accent: '#E11D48' } },
      { name: '金盏暖阳', colors: { bg: '#FFFBEB', ink: '#B45309', accent: '#F59E0B' } },
      { name: '紫罗兰诗', colors: { bg: '#FDF4FF', ink: '#7C3AED', accent: '#A855F7' } },
      { name: '薄荷清欢', colors: { bg: '#F0FDFA', ink: '#0F766E', accent: '#14B8A6' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' }, backgroundImage: dotPaper(1080, 1350, 40, 'rgba(159,18,57,0.08)') },
    elements: [
      // —— 卡面压印层：花边压纹框（实线 + 虚线双框）+ 封套折线 + 丝带十字 ——
      { id: 'gc-frame-outer', type: 'shape', shapeKind: 'rect', x: 54, y: 54, width: 972, height: 1242, border: { color: { $t: 'colors.ink' }, width: 5 }, borderRadius: 26, opacity: 0.7, zIndex: 1 },
      { id: 'gc-frame-inner', type: 'shape', shapeKind: 'rect', x: 82, y: 82, width: 916, height: 1186, border: { color: { $t: 'colors.accent' }, width: 2, style: 'dashed' }, borderRadius: 20, opacity: 0.55, zIndex: 1 },
      { id: 'gc-fold-left', type: 'shape', shapeKind: 'rect', x: 96, y: 120, width: 470, height: 3, rotation: 21, fill: { $t: 'colors.ink' }, opacity: 0.28, zIndex: 1 },
      { id: 'gc-fold-right', type: 'shape', shapeKind: 'rect', x: 520, y: 120, width: 470, height: 3, rotation: -21, fill: { $t: 'colors.ink' }, opacity: 0.28, zIndex: 1 },
      gcRibbon('gc-ribbon-v', 488, 30, 104, 1290, 1),
      gcRibbon('gc-ribbon-h', 30, 618, 1020, 104, 1),
      // —— 花环与主文案 ——
      { id: 'wreath', type: 'image', src: WREATH, objectFit: 'contain', x: 220, y: 110, width: 640, height: 640, zIndex: 2, animation: { name: 'spinSlow', duration: 60000, iterationCount: 'infinite', easing: 'linear' } },
      { id: 'crown', type: 'image', src: CROWN, objectFit: 'contain', x: 480, y: 190, width: 130, height: 94, zIndex: 5, animation: { name: 'bounce', duration: 2800, iterationCount: 'infinite' } },
      { id: 'title', type: 'text', content: '生日快乐', fontFamily: { $t: 'fonts.hand' }, fontSize: 118, fontWeight: '700', color: { $t: 'colors.ink' }, textAlign: 'center', x: 260, y: 350, width: 560, height: 150, zIndex: 4, animation: { name: 'zoomIn', duration: 800 }, editable: { content: true, fontSize: { type: 'range', min: 80, max: 150 }, position: true } },
      { id: 'title-en', type: 'text', content: 'H A P P Y   B I R T H D A Y', fontFamily: PENCIL, fontSize: 26, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 6, textAlign: 'center', x: 220, y: 508, width: 640, height: 44, zIndex: 4, editable: { content: true } },
      { id: 'rule', type: 'image', src: QUILL, objectFit: 'contain', x: 330, y: 790, width: 420, height: 48, zIndex: 3 },
      { id: 'body', type: 'text', content: '愿新的一岁：\n有风有月，有酒有朋友；\n想做的事都做成，\n爱的人都在身边。', fontFamily: { $t: 'fonts.hand' }, fontSize: 44, fontWeight: '400', color: { $t: 'colors.ink' }, lineHeight: 1.7, textAlign: 'center', x: 140, y: 850, width: 800, height: 310, zIndex: 3, animation: { name: 'fadeInUp', duration: 900, delay: 500 }, editable: { content: true } },
      { id: 'sign', type: 'text', content: '—— 爱你的朋友们', fontFamily: { $t: 'fonts.hand' }, fontSize: 36, fontWeight: '400', color: { $t: 'colors.accent' }, textAlign: 'right', x: 540, y: 1140, width: 400, height: 50, zIndex: 3, editable: { content: true } },
      // —— 内页补一句手涂的祝福 + 角落小花 + 亮片 ——
      { id: 'gc-inner-bless', type: 'text', content: '内页再补一句：\n又长大一岁，又厉害一分', fontFamily: { $t: 'fonts.hand' }, fontSize: 30, fontWeight: '400', color: { $t: 'colors.ink' }, opacity: 0.72, lineHeight: 1.5, rotation: -2, x: 130, y: 1148, width: 380, height: 88, zIndex: 4, editable: { content: true } },
      ...gcFlower('gc-flower', 160, 330, 24),
      ...gcSequins([[918, 250, 20], [940, 790, 15], [118, 700, 17], [860, 1264, 13]] as [number, number, number][]),
      // —— 现有四角点缀 ——
      { id: 'heart', type: 'image', src: HEART, objectFit: 'contain', x: 90, y: 150, width: 90, height: 82, zIndex: 5, animation: { name: 'heartbeat', duration: 2200, iterationCount: 'infinite' } },
      { id: 'star-a', type: 'image', src: STAR_FILL, objectFit: 'contain', x: 900, y: 170, width: 76, height: 76, zIndex: 5, animation: { name: 'twinkle', duration: 2600, iterationCount: 'infinite' } },
      { id: 'star-b', type: 'image', src: STAR, objectFit: 'contain', x: 110, y: 1000, width: 64, height: 64, zIndex: 5, animation: { name: 'sparkle', duration: 3200, delay: 600, iterationCount: 'infinite' } },
      { id: 'leaf', type: 'image', src: LEAF, objectFit: 'contain', x: 920, y: 1050, width: 90, height: 150, rotation: 14, zIndex: 5, animation: { name: 'swing', duration: 3000, iterationCount: 'infinite', easing: 'ease-in-out' } }
    ]
  },

  // 10. 手绘单词记忆卡
  {
    id: 'handdrawn-word-note', name: '手绘单词记忆卡 (4:5)', version: '1.0.0', category: 'handdrawn', tags: ['handdrawn', 'word', 'vocabulary', 'study', '4:5'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="125" viewBox="0 0 100 125"><rect width="100" height="125" fill="%23fefce8"/><g stroke="%232563eb" stroke-width="1" opacity="0.12"><line x1="0" y1="25" x2="100" y2="25"/><line x1="0" y1="50" x2="100" y2="50"/><line x1="25" y1="0" x2="25" y2="125"/><line x1="50" y1="0" x2="50" y2="125"/><line x1="75" y1="0" x2="75" y2="125"/></g><text x="14" y="48" font-size="16" font-family="Georgia" fill="%23292524">seren-</text><rect x="14" y="58" width="56" height="8" fill="%23fde047"/></svg>',
    tokens: {
      colors: {
        bg: { label: '纸色', default: '#FEFCE8', options: ['#FEFCE8', '#FFFBEB', '#F8FAFC', '#F0FDFA'] },
        ink: { label: '笔色', default: '#292524', options: ['#292524', '#1E293B', '#44403C', '#0F172A'] },
        accent: { label: '强调', default: '#CA8A04', options: ['#CA8A04', '#2563EB', '#DB2777', '#059669'] }
      },
      fonts: { serif: { label: '单词体', default: 'Georgia, "Times New Roman", serif', options: ['Georgia, "Times New Roman", serif', 'Helvetica, Arial, sans-serif', EN_HAND] } }
    },
    presets: [
      { name: '荧光黄笔记', colors: { bg: '#FEFCE8', ink: '#292524', accent: '#CA8A04' } },
      { name: '蓝黑墨水', colors: { bg: '#F8FAFC', ink: '#0F172A', accent: '#2563EB' } },
      { name: '桃气少女', colors: { bg: '#FFFBEB', ink: '#44403C', accent: '#DB2777' } },
      { name: '薄荷词根', colors: { bg: '#F0FDFA', ink: '#1E293B', accent: '#059669' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' }, backgroundImage: gridPaper(1080, 1350, 46, 'rgba(37,99,235,0.10)') },
    elements: [
      { id: 'tape-tl', type: 'image', src: TAPE, objectFit: 'contain', x: 60, y: 52, width: 160, height: 54, rotation: -38, zIndex: 6 },
      { id: 'tape-br', type: 'image', src: TAPE, objectFit: 'contain', x: 860, y: 1240, width: 160, height: 54, rotation: -38, zIndex: 6 },
      { id: 'badge', type: 'text', content: 'WORD CARD · NO.042', fontFamily: PENCIL, fontSize: 26, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 4, x: 106, y: 130, width: 500, height: 38, zIndex: 3, editable: { content: true } },
      { id: 'word', type: 'text', content: 'serendipity', fontFamily: { $t: 'fonts.serif' }, fontSize: 124, fontWeight: '700', color: { $t: 'colors.ink' }, x: 106, y: 190, width: 900, height: 150, zIndex: 3, animation: { name: 'inkReveal', duration: 1100 }, editable: { content: true, fontSize: { type: 'range', min: 90, max: 150 }, position: true } },
      { id: 'phonetic', type: 'text', content: '/ˌser.ənˈdɪp.ə.ti/  n.', fontFamily: PENCIL, fontSize: 34, color: { $t: 'colors.accent' }, x: 106, y: 350, width: 620, height: 46, zIndex: 3 },
      { id: 'hl', type: 'shape', shapeKind: 'rect', x: 100, y: 448, width: 460, height: 62, fill: '#FDE047', opacity: 0.55, rotation: -1, borderRadius: 6, zIndex: 1 },
      { id: 'meaning', type: 'text', content: '意外发现珍宝的运气', fontFamily: { $t: 'fonts.serif' }, fontSize: 52, fontWeight: '700', color: { $t: 'colors.ink' }, rotation: -1, x: 106, y: 448, width: 620, height: 68, zIndex: 3, editable: { content: true } },
      { id: 'ex-h', type: 'text', content: '例句', fontFamily: CN_HAND, fontSize: 40, fontWeight: '700', color: { $t: 'colors.accent' }, x: 106, y: 560, width: 160, height: 52, zIndex: 3 },
      { id: 'ex', type: 'text', content: 'Meeting her was pure serendipity —\nwe found each other in a bookstore\nthat was about to close.', fontFamily: 'Georgia, serif', fontSize: 34, fontWeight: '400', color: { $t: 'colors.ink' }, lineHeight: 1.6, x: 106, y: 624, width: 860, height: 160, zIndex: 3, editable: { content: true } },
      { id: 'memo-h', type: 'text', content: '记忆法', fontFamily: CN_HAND, fontSize: 40, fontWeight: '700', color: { $t: 'colors.accent' }, x: 106, y: 820, width: 160, height: 52, zIndex: 3 },
      { id: 'memo-box', type: 'shape', shapeKind: 'rect', x: 100, y: 886, width: 880, height: 150, fill: 'rgba(202,138,4,0.08)', border: { color: { $t: 'colors.accent' }, width: 2, style: 'dashed' }, borderRadius: 14, zIndex: 2 },
      { id: 'memo-text', type: 'text', content: '拆词：seren（黄昏的微光）+ dipity（小精灵）\n→ 黄昏时分不期而遇的小确幸', fontFamily: { $t: 'fonts.serif' }, fontSize: 32, color: { $t: 'colors.ink' }, lineHeight: 1.6, x: 130, y: 912, width: 820, height: 106, zIndex: 3, editable: { content: true } },
      { id: 'star-h', type: 'text', content: '掌握度', fontFamily: CN_HAND, fontSize: 36, fontWeight: '700', color: { $t: 'colors.ink' }, x: 106, y: 1080, width: 160, height: 46, zIndex: 3 },
      { id: 'star-1', group: 'star-', type: 'image', src: STAR_FILL, objectFit: 'contain', x: 260, y: 1072, width: 56, height: 56, zIndex: 3, animation: { name: 'zoomIn', duration: 300, delay: 300 } },
      { id: 'star-2', group: 'star-', type: 'image', src: STAR_FILL, objectFit: 'contain', x: 326, y: 1072, width: 56, height: 56, zIndex: 3, animation: { name: 'zoomIn', duration: 300, delay: 450 } },
      { id: 'star-3', group: 'star-', type: 'image', src: STAR_FILL, objectFit: 'contain', x: 392, y: 1072, width: 56, height: 56, zIndex: 3, animation: { name: 'zoomIn', duration: 300, delay: 600 } },
      { id: 'star-4', group: 'star-', type: 'image', src: STAR, objectFit: 'contain', x: 458, y: 1072, width: 56, height: 56, zIndex: 3 },
      { id: 'star-5', group: 'star-', type: 'image', src: STAR, objectFit: 'contain', x: 524, y: 1072, width: 56, height: 56, zIndex: 3 },
      { id: 'bulb', type: 'image', src: BULB, objectFit: 'contain', x: 872, y: 1044, width: 108, height: 116, zIndex: 4, animation: { name: 'twinkle', duration: 3000, iterationCount: 'infinite' } },
      { id: 'footer', type: 'text', content: 'review in 3 days · spaced repetition', fontFamily: PENCIL, fontSize: 24, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.5, x: 106, y: 1250, width: 620, height: 34, zIndex: 3, editable: { content: true } }
    ]
  },

  // 11. 手绘一周课表
  {
    id: 'handdrawn-class-schedule', name: '手绘一周课表 (1:1)', version: '1.0.0', category: 'handdrawn', tags: ['handdrawn', 'schedule', 'class', 'timetable', '1:1'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23fffbeb"/><g stroke="%2378716c" stroke-width="1" opacity="0.5"><line x1="18" y1="28" x2="92" y2="28"/><line x1="18" y1="48" x2="92" y2="48"/><line x1="18" y1="68" x2="92" y2="68"/><line x1="34" y1="28" x2="34" y2="88"/><line x1="50" y1="28" x2="50" y2="88"/><line x1="66" y1="28" x2="66" y2="88"/><line x1="82" y1="28" x2="82" y2="88"/><line x1="18" y1="88" x2="92" y2="88"/></g><rect x="36" y="30" width="12" height="16" rx="3" fill="%23bfdbfe"/><rect x="68" y="50" width="12" height="16" rx="3" fill="%23fecaca"/></svg>',
    tokens: {
      colors: {
        bg: { label: '纸色', default: '#FFFBEB', options: ['#FFFBEB', '#FFFDF5', '#F8FAFC', '#F0FDFA'] },
        ink: { label: '笔色', default: '#44403C', options: ['#44403C', '#292524', '#1E293B', '#57534E', '#334155'] },
        accent: { label: '强调', default: '#D97706', options: ['#D97706', '#DC2626', '#7C3AED', '#0D9488'] },
        cs1: { label: '课程块一', default: '#BFDBFE', options: ['#BFDBFE', '#99F6E4', '#DDD6FE', '#FECACA'] },
        cs2: { label: '课程块二', default: '#FECACA', options: ['#FECACA', '#BAE6FD', '#C7D2FE', '#FED7AA'] },
        cs3: { label: '课程块三', default: '#BBF7D0', options: ['#BBF7D0', '#D9F99D', '#BAE6FD', '#FEF08A'] },
        cs4: { label: '课程块四', default: '#FEF08A', options: ['#FEF08A', '#FEF08A', '#FBCFE8', '#BBF7D0'] },
        cs5: { label: '课程块五', default: '#FBCFE8', options: ['#FBCFE8', '#BFDBFE', '#F5D0FE', '#99F6E4'] },
        cs6: { label: '课程块六', default: '#E9D5FF', options: ['#E9D5FF', '#DDD6FE', '#D9F99D', '#E9D5FF'] }
      },
      fonts: HAND_FONTS
    },
    presets: [
      { name: '晨间课表', colors: { bg: '#FFFBEB', ink: '#44403C', accent: '#D97706', cs1: '#BFDBFE', cs2: '#FECACA', cs3: '#BBF7D0', cs4: '#FEF08A', cs5: '#FBCFE8', cs6: '#E9D5FF' } },
      { name: '青柠早八', colors: { bg: '#F0FDFA', ink: '#1E293B', accent: '#0D9488', cs1: '#99F6E4', cs2: '#BAE6FD', cs3: '#D9F99D', cs4: '#FEF08A', cs5: '#BFDBFE', cs6: '#DDD6FE' } },
      { name: '紫藤晚自习', colors: { bg: '#F8FAFC', ink: '#334155', accent: '#7C3AED', cs1: '#DDD6FE', cs2: '#C7D2FE', cs3: '#BAE6FD', cs4: '#FBCFE8', cs5: '#F5D0FE', cs6: '#D9F99D' } },
      { name: '珊瑚提醒', colors: { bg: '#FFFDF5', ink: '#292524', accent: '#DC2626', cs1: '#FECACA', cs2: '#FED7AA', cs3: '#FEF08A', cs4: '#BBF7D0', cs5: '#99F6E4', cs6: '#E9D5FF' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1080, defaultWidth: 1080, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' }, backgroundImage: dotPaper(1080, 1080, 46, 'rgba(68,64,60,0.10)') },
    elements: [
      { id: 'title', type: 'text', content: '本周课表', fontFamily: { $t: 'fonts.hand' }, fontSize: 88, fontWeight: '700', color: { $t: 'colors.ink' }, x: 90, y: 64, width: 560, height: 110, zIndex: 3, animation: { name: 'inkReveal', duration: 1000 }, editable: { content: true, position: true } },
      { id: 'sub', type: 'text', content: 'WEEK SCHEDULE · 第 6 教学周', fontFamily: PENCIL, fontSize: 26, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 2, x: 96, y: 182, width: 640, height: 38, zIndex: 3, editable: { content: true } },
      { id: 'clock', type: 'image', src: CLOCK, objectFit: 'contain', x: 872, y: 60, width: 150, height: 158, zIndex: 5, animation: { name: 'swing', duration: 3000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'grid', type: 'image', src: handGrid(840, 640, 5, 5, 'rgba(68,64,60,0.5)'), objectFit: 'fill', x: 120, y: 300, width: 840, height: 640, zIndex: 2 },
      { id: 'cd-1', type: 'text', content: '周一', fontFamily: { $t: 'fonts.hand' }, fontSize: 32, fontWeight: '700', color: { $t: 'colors.ink' }, textAlign: 'center', x: 120, y: 252, width: 168, height: 42, zIndex: 3 },
      { id: 'cd-2', type: 'text', content: '周二', fontFamily: { $t: 'fonts.hand' }, fontSize: 32, fontWeight: '700', color: { $t: 'colors.ink' }, textAlign: 'center', x: 288, y: 252, width: 168, height: 42, zIndex: 3 },
      { id: 'cd-3', type: 'text', content: '周三', fontFamily: { $t: 'fonts.hand' }, fontSize: 32, fontWeight: '700', color: { $t: 'colors.ink' }, textAlign: 'center', x: 456, y: 252, width: 168, height: 42, zIndex: 3 },
      { id: 'cd-4', type: 'text', content: '周四', fontFamily: { $t: 'fonts.hand' }, fontSize: 32, fontWeight: '700', color: { $t: 'colors.ink' }, textAlign: 'center', x: 624, y: 252, width: 168, height: 42, zIndex: 3 },
      { id: 'cd-5', type: 'text', content: '周五', fontFamily: { $t: 'fonts.hand' }, fontSize: 32, fontWeight: '700', color: { $t: 'colors.ink' }, textAlign: 'center', x: 792, y: 252, width: 168, height: 42, zIndex: 3 },
      { id: 't-1', group: 't-', type: 'shape', shapeKind: 'rect', x: 134, y: 442, width: 140, height: 104, fill: { $t: 'colors.cs1' }, borderRadius: 12, rotation: -1, zIndex: 3 },
      { id: 't-1-text', type: 'text', content: '高等数学\n8:00', fontFamily: { $t: 'fonts.hand' }, fontSize: 32, fontWeight: '700', color: { $t: 'colors.ink' }, lineHeight: 1.35, textAlign: 'center', rotation: -1, x: 134, y: 456, width: 140, height: 84, zIndex: 4, editable: { content: true } },
      { id: 't-2', group: 't-', type: 'shape', shapeKind: 'rect', x: 302, y: 314, width: 140, height: 104, fill: { $t: 'colors.cs2' }, borderRadius: 12, rotation: 1, zIndex: 3 },
      { id: 't-2-text', type: 'text', content: '大学英语\n8:00', fontFamily: { $t: 'fonts.hand' }, fontSize: 32, fontWeight: '700', color: { $t: 'colors.ink' }, lineHeight: 1.35, textAlign: 'center', rotation: 1, x: 302, y: 328, width: 140, height: 84, zIndex: 4, editable: { content: true } },
      { id: 't-3', group: 't-', type: 'shape', shapeKind: 'rect', x: 470, y: 570, width: 140, height: 104, fill: { $t: 'colors.cs3' }, borderRadius: 12, rotation: -1, zIndex: 3 },
      { id: 't-3-text', type: 'text', content: '线性代数\n10:00', fontFamily: { $t: 'fonts.hand' }, fontSize: 32, fontWeight: '700', color: { $t: 'colors.ink' }, lineHeight: 1.35, textAlign: 'center', rotation: -1, x: 470, y: 584, width: 140, height: 84, zIndex: 4, editable: { content: true } },
      { id: 't-4', group: 't-', type: 'shape', shapeKind: 'rect', x: 638, y: 442, width: 140, height: 104, fill: { $t: 'colors.cs4' }, borderRadius: 12, rotation: 1, zIndex: 3 },
      { id: 't-4-text', type: 'text', content: '设计思维\n9:30', fontFamily: { $t: 'fonts.hand' }, fontSize: 32, fontWeight: '700', color: { $t: 'colors.ink' }, lineHeight: 1.35, textAlign: 'center', rotation: 1, x: 638, y: 456, width: 140, height: 84, zIndex: 4, editable: { content: true } },
      { id: 't-5', group: 't-', type: 'shape', shapeKind: 'rect', x: 299, y: 830, width: 146, height: 104, fill: { $t: 'colors.cs5' }, borderRadius: 12, rotation: -1, zIndex: 3 },
      { id: 't-5-text', type: 'text', content: '中国近代史\n14:00', fontFamily: { $t: 'fonts.hand' }, fontSize: 28, fontWeight: '700', color: { $t: 'colors.ink' }, lineHeight: 1.35, textAlign: 'center', rotation: -1, x: 299, y: 844, width: 146, height: 84, zIndex: 4, editable: { content: true } },
      { id: 't-6', group: 't-', type: 'shape', shapeKind: 'rect', x: 806, y: 702, width: 140, height: 104, fill: { $t: 'colors.cs6' }, borderRadius: 12, rotation: 1, zIndex: 3 },
      { id: 't-6-text', type: 'text', content: '体育课\n15:30', fontFamily: { $t: 'fonts.hand' }, fontSize: 32, fontWeight: '700', color: { $t: 'colors.ink' }, lineHeight: 1.35, textAlign: 'center', rotation: 1, x: 806, y: 716, width: 140, height: 84, zIndex: 4, editable: { content: true } },
      { id: 'star', group: 'star', type: 'image', src: STAR, objectFit: 'contain', x: 940, y: 960, width: 72, height: 72, zIndex: 4, animation: { name: 'twinkle', duration: 2800, iterationCount: 'infinite' } },
      { id: 'footer', type: 'text', content: '别忘带实验报告！', fontFamily: { $t: 'fonts.hand' }, fontSize: 34, fontWeight: '400', color: { $t: 'colors.accent' }, x: 120, y: 990, width: 500, height: 48, zIndex: 3, animation: { name: 'blink', duration: 2400, iterationCount: 'infinite' }, editable: { content: true } }
    ]
  },

  // 12. 山野露营清单
  {
    id: 'handdrawn-camping', name: '山野露营清单 (9:16)', version: '1.0.0', category: 'handdrawn', tags: ['handdrawn', 'camping', 'outdoor', 'checklist', '9:16'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="178" viewBox="0 0 100 178"><rect width="100" height="178" fill="%23fffbeb"/><path d="M12 66 L36 32 L60 66 Z" fill="none" stroke="%23166534" stroke-width="3"/><path d="M46 66 L68 38 L90 66 Z" fill="none" stroke="%2315803d" stroke-width="3"/><path d="M30 106 L46 78 L62 106 Z" fill="none" stroke="%23b45309" stroke-width="3"/><line x1="16" y1="106" x2="84" y2="106" stroke="%23166534" stroke-width="2"/></svg>',
    tokens: {
      colors: {
        bg: { label: '纸色', default: '#FFFBEB', options: ['#FFFBEB', '#FEF6E7', '#F0FDFA', '#F7FEE7'] },
        ink: { label: '笔色', default: '#78350F', options: ['#78350F', '#92400E', '#57534E', '#365314'] },
        accent: { label: '强调', default: '#15803D', options: ['#15803D', '#B45309', '#0F766E', '#BE123C'] }
      },
      fonts: HAND_FONTS
    },
    presets: [
      { name: '森野营地', colors: { bg: '#FFFBEB', ink: '#78350F', accent: '#15803D' } },
      { name: '秋日牛皮', colors: { bg: '#FEF6E7', ink: '#92400E', accent: '#B45309' } },
      { name: '湖畔薄荷', colors: { bg: '#F0FDFA', ink: '#57534E', accent: '#0F766E' } },
      { name: '晚霞玫瑰', colors: { bg: '#F7FEE7', ink: '#365314', accent: '#BE123C' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1920, defaultWidth: 1080, defaultHeight: 1920, backgroundColor: { $t: 'colors.bg' }, backgroundImage: flecks(1080, 1920, 90, 'rgba(120,53,15,0.08)') },
    elements: [
      { id: 'mountains', type: 'image', src: MOUNTAINS, objectFit: 'contain', x: 140, y: 140, width: 800, height: 360, zIndex: 2, animation: { name: 'fadeIn', duration: 1000 } },
      { id: 'title', type: 'text', content: '山野露营清单', fontFamily: { $t: 'fonts.hand' }, fontSize: 100, fontWeight: '700', color: { $t: 'colors.ink' }, x: 90, y: 540, width: 900, height: 130, textAlign: 'center', zIndex: 3, animation: { name: 'inkReveal', duration: 1100 }, editable: { content: true, position: true } },
      { id: 'sub', type: 'text', content: 'CAMPING PACKING LIST · 云屏谷 2 日', fontFamily: PENCIL, fontSize: 28, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 3, x: 140, y: 686, width: 800, height: 40, textAlign: 'center', zIndex: 3, editable: { content: true } },
      { id: 'cb-1', group: 'cb-', type: 'shape', shapeKind: 'rect', x: 160, y: 800, width: 52, height: 52, border: { color: { $t: 'colors.ink' }, width: 3 }, borderRadius: 12, zIndex: 3 },
      { id: 'ck-1', type: 'image', src: CHECK, objectFit: 'contain', x: 154, y: 794, width: 62, height: 62, zIndex: 4, animation: { name: 'zoomIn', duration: 400, delay: 500 } },
      { id: 'it-1', type: 'text', content: '帐篷 + 地钉 + 防潮垫', fontFamily: { $t: 'fonts.hand' }, fontSize: 44, color: { $t: 'colors.ink' }, x: 250, y: 800, width: 680, height: 56, zIndex: 3, editable: { content: true } },
      { id: 'cb-2', group: 'cb-', type: 'shape', shapeKind: 'rect', x: 160, y: 910, width: 52, height: 52, border: { color: { $t: 'colors.ink' }, width: 3 }, borderRadius: 12, zIndex: 3 },
      { id: 'ck-2', type: 'image', src: CHECK, objectFit: 'contain', x: 154, y: 904, width: 62, height: 62, zIndex: 4, animation: { name: 'zoomIn', duration: 400, delay: 700 } },
      { id: 'it-2', type: 'text', content: '睡袋（夜温 8°C）', fontFamily: { $t: 'fonts.hand' }, fontSize: 44, color: { $t: 'colors.ink' }, x: 250, y: 910, width: 680, height: 56, zIndex: 3, editable: { content: true } },
      { id: 'cb-3', group: 'cb-', type: 'shape', shapeKind: 'rect', x: 160, y: 1020, width: 52, height: 52, border: { color: { $t: 'colors.ink' }, width: 3 }, borderRadius: 12, zIndex: 3 },
      { id: 'it-3', type: 'text', content: '头灯 + 备用电池', fontFamily: { $t: 'fonts.hand' }, fontSize: 44, color: { $t: 'colors.ink' }, x: 250, y: 1020, width: 680, height: 56, zIndex: 3, editable: { content: true } },
      { id: 'cb-4', group: 'cb-', type: 'shape', shapeKind: 'rect', x: 160, y: 1130, width: 52, height: 52, border: { color: { $t: 'colors.ink' }, width: 3 }, borderRadius: 12, zIndex: 3 },
      { id: 'it-4', type: 'text', content: '炉具 · 挂耳咖啡 · 半升威士忌', fontFamily: { $t: 'fonts.hand' }, fontSize: 44, color: { $t: 'colors.ink' }, x: 250, y: 1130, width: 740, height: 56, zIndex: 3, editable: { content: true } },
      { id: 'cb-5', group: 'cb-', type: 'shape', shapeKind: 'rect', x: 160, y: 1240, width: 52, height: 52, border: { color: { $t: 'colors.ink' }, width: 3 }, borderRadius: 12, zIndex: 3 },
      { id: 'it-5', type: 'text', content: '急救包 · 防蚊液 · 垃圾袋', fontFamily: { $t: 'fonts.hand' }, fontSize: 44, color: { $t: 'colors.ink' }, x: 250, y: 1240, width: 700, height: 56, zIndex: 3, editable: { content: true } },
      { id: 'cb-6', group: 'cb-', type: 'shape', shapeKind: 'rect', x: 160, y: 1350, width: 52, height: 52, border: { color: { $t: 'colors.ink' }, width: 3 }, borderRadius: 12, zIndex: 3 },
      { id: 'it-6', type: 'text', content: '胶片相机（不许带电脑）', fontFamily: { $t: 'fonts.hand' }, fontSize: 44, color: { $t: 'colors.ink' }, x: 250, y: 1350, width: 700, height: 56, zIndex: 3, editable: { content: true } },
      { id: 'tent', type: 'image', src: TENT, objectFit: 'contain', x: 130, y: 1520, width: 280, height: 224, zIndex: 3 },
      { id: 'fire', type: 'image', src: FIRE, objectFit: 'contain', x: 500, y: 1560, width: 130, height: 150, zIndex: 3, animation: { name: 'pulse', duration: 1600, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'star', group: 'star', type: 'image', src: STAR_FILL, objectFit: 'contain', x: 700, y: 1500, width: 64, height: 64, zIndex: 4, animation: { name: 'twinkle', duration: 2600, iterationCount: 'infinite' } },
      { id: 'quote', type: 'text', content: '山里信号不好，\n但夜夜有好梦。', fontFamily: { $t: 'fonts.hand' }, fontSize: 38, fontWeight: '400', color: { $t: 'colors.accent' }, lineHeight: 1.55, x: 720, y: 1590, width: 300, height: 150, zIndex: 3, editable: { content: true } },
      { id: 'footer', type: 'text', content: 'see you in the wild · pack light', fontFamily: PENCIL, fontSize: 26, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.5, x: 160, y: 1800, width: 600, height: 36, zIndex: 3, editable: { content: true } }
    ]
  }
]

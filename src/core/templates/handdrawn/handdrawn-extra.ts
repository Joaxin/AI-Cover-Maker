// src/core/templates/handdrawn/handdrawn-extra.ts
// 手绘风扩展模板：原创线稿涂鸦 + 透明纸纹底 + tokens/presets（可一键换配色）
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

// ---------- 原创涂鸦线稿（固定插画配色）----------
const SUN = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160"><circle cx="80" cy="80" r="30" fill="%23fde047" stroke="%23f59e0b" stroke-width="4"/><g stroke="%23f59e0b" stroke-width="6" stroke-linecap="round">' + Array.from({ length: 12 }, (_, i) => { const a = (i * Math.PI) / 6, x1 = 80 + Math.cos(a) * 44, y1 = 80 + Math.sin(a) * 44, x2 = 80 + Math.cos(a) * 66, y2 = 80 + Math.sin(a) * 66; return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}"/>` }).join('') + '</g></svg>'
const RAINBOW = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="120" viewBox="0 0 200 120"><g fill="none" stroke-width="12" stroke-linecap="round"><path d="M18 112 A82 82 0 0 1 182 112" stroke="%23ef4444"/><path d="M36 112 A64 64 0 0 1 164 112" stroke="%23f59e0b"/><path d="M54 112 A46 46 0 0 1 146 112" stroke="%2322c55e"/><path d="M72 112 A28 28 0 0 1 128 112" stroke="%233b82f6"/></g></svg>'
const CLOUD = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="180" height="120" viewBox="0 0 180 120"><path d="M42 96 a26 26 0 0 1 4 -52 a30 30 0 0 1 58 -8 a24 24 0 0 1 36 26 a20 20 0 0 1 -8 34 Z" fill="%23ffffff" stroke="%2360a5fa" stroke-width="5" stroke-linejoin="round"/></svg>'
const HOUSE = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="150" viewBox="0 0 160 150"><path d="M26 72 L80 26 L134 72" fill="none" stroke="%23b45309" stroke-width="5" stroke-linejoin="round"/><rect x="42" y="70" width="76" height="66" fill="none" stroke="%23b45309" stroke-width="5"/><rect x="66" y="96" width="28" height="40" fill="none" stroke="%23b45309" stroke-width="4"/></svg>'
const HEART = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="110" viewBox="0 0 120 110"><path d="M60 100 C 10 60, 16 8, 60 34 C 104 8, 110 60, 60 100 Z" fill="%23fb7185" stroke="%23e11d48" stroke-width="4" stroke-linejoin="round"/></svg>'
const LEAF = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="200" viewBox="0 0 120 200"><path d="M60 6 C 58 60,58 140,60 196" fill="none" stroke="%2315803d" stroke-width="4" stroke-linecap="round"/>' + Array.from({ length: 6 }, (_, i) => { const y = 40 + i * 26, d = i % 2 ? 1 : -1; return `<ellipse cx="${60 + d * 26}" cy="${y}" rx="24" ry="11" fill="%234ade80" stroke="%2315803d" stroke-width="2" transform="rotate(${d * 32} ${60 + d * 26} ${y})"/>` }).join('') + '</svg>'
const COFFEE = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 240 240"><circle cx="120" cy="120" r="92" fill="none" stroke="%23a16207" stroke-width="12" opacity="0.22"/><circle cx="120" cy="120" r="92" fill="none" stroke="%23854d0e" stroke-width="4" opacity="0.28"/></svg>'
const PAPERCLIP = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="150" viewBox="0 0 60 150"><path d="M18 16 V104 a12 12 0 0 0 24 0 V28 a8 8 0 0 0 -16 0 V120" fill="none" stroke="%2394a3b8" stroke-width="5" stroke-linecap="round"/></svg>'
const STAMP = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="130" height="150" viewBox="0 0 130 150"><rect x="8" y="8" width="114" height="134" fill="%23fef9c3" stroke="%23b45309" stroke-width="2" stroke-dasharray="5 5"/><path d="M40 70 L58 70 L65 40 L72 96 L82 58 L92 78 L104 70" fill="none" stroke="%23b45309" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"/><text x="65" y="128" font-size="16" text-anchor="middle" fill="%23b45309" font-family="monospace">PAR AVION</text></svg>'
const GLOBE = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="140" height="140" viewBox="0 0 140 140"><circle cx="70" cy="70" r="56" fill="none" stroke="%231e293b" stroke-width="3.5"/><ellipse cx="70" cy="70" rx="24" ry="56" fill="none" stroke="%231e293b" stroke-width="3"/><line x1="14" y1="70" x2="126" y2="70" stroke="%231e293b" stroke-width="3"/><path d="M24 44 H116 M24 96 H116" stroke="%231e293b" stroke-width="2.5"/></svg>'
const QUILL = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="380" height="60" viewBox="0 0 380 60"><path d="M10 40 C 130 8, 250 8, 372 26 M44 48 C 160 26, 270 30, 350 44" fill="none" stroke="%237c2d12" stroke-width="3" stroke-linecap="round"/></svg>'
const STAR = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"><path d="M40 6 L49 30 L74 31 L54 46 L62 72 L40 56 L18 72 L26 46 L6 31 L31 30 Z" fill="none" stroke="%23b45309" stroke-width="4" stroke-linejoin="round"/></svg>'
const CURVED_ARROW = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="120" viewBox="0 0 160 120"><path d="M10 20 C 90 10,130 60,118 104" fill="none" stroke="%2378350f" stroke-width="4" stroke-linecap="round"/><path d="M104 88 L120 108 L134 84" fill="none" stroke="%2378350f" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>'
const CHECK = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"><path d="M10 32 L24 46 L52 12" fill="none" stroke="%2316a34a" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></svg>'
const BUBBLE = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="120" viewBox="0 0 160 120"><path d="M20 12 H140 a12 12 0 0 1 12 12 V70 a12 12 0 0 1 -12 12 H64 L40 108 V82 H20 a12 12 0 0 1 -12 -12 V24 a12 12 0 0 1 12 -12 Z" fill="%23ffffff" stroke="%231e293b" stroke-width="4" stroke-linejoin="round"/></svg>'
const TAPE = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="180" height="60" viewBox="0 0 180 60"><rect width="180" height="60" fill="%23fde68a" opacity="0.8"/><g stroke="%23f59e0b" stroke-width="3" opacity="0.5"><line x1="30" y1="0" x2="10" y2="60"/><line x1="70" y1="0" x2="50" y2="60"/><line x1="110" y1="0" x2="90" y2="60"/><line x1="150" y1="0" x2="130" y2="60"/></g></svg>'
const BUILDING = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="560" height="430" viewBox="0 0 560 430"><g fill="none" stroke="%231e3a8a" stroke-width="3" stroke-linejoin="round"><rect x="120" y="130" width="320" height="240"/><path d="M120 130 L280 52 L440 130"/><rect x="172" y="182" width="58" height="58"/><rect x="330" y="182" width="58" height="58"/><rect x="248" y="272" width="64" height="98"/><line x1="70" y1="370" x2="490" y2="370"/><line x1="120" y1="370" x2="120" y2="392"/><line x1="440" y1="370" x2="440" y2="392"/></g></svg>'
const GEOMETRY = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="240" viewBox="0 0 300 240"><g fill="none" stroke="%231d4ed8" stroke-width="3"><circle cx="150" cy="120" r="92"/><path d="M58 120 A92 92 0 0 1 150 28"/><line x1="150" y1="120" x2="242" y2="120"/><line x1="150" y1="120" x2="215" y2="55"/><path d="M188 120 A38 38 0 0 0 180 93"/></g></svg>'
const DIM_ARROW = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="220" height="40" viewBox="0 0 220 40"><line x1="16" y1="20" x2="204" y2="20" stroke="%23475569" stroke-width="2.5"/><path d="M16 20 L30 12 M16 20 L30 28 M204 20 L190 12 M204 20 L190 28" fill="none" stroke="%23475569" stroke-width="2.5" stroke-linecap="round"/></svg>'
const NORTH = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="90" height="110" viewBox="0 0 90 110"><circle cx="45" cy="58" r="40" fill="none" stroke="%231e3a8a" stroke-width="3"/><path d="M45 26 L56 66 L45 58 L34 66 Z" fill="%23dc2626" stroke="%231e3a8a" stroke-width="2" stroke-linejoin="round"/><text x="45" y="18" font-size="18" text-anchor="middle" fill="%231e3a8a" font-family="serif">N</text></svg>'

// ---------- 可复用样式片段 ----------
const CN_HAND = 'STXingkai, Xingkai SC, 华文行楷, STKaiti, cursive'
const EN_HAND = 'Segoe Print, Bradley Hand, "Comic Sans MS", cursive'
const PENCIL = 'Courier New, monospace'

// ---------- 以下 ke* 前缀 helper 只服务本文件被美化的模板（撞名风险由前缀隔离）----------
type KeColor = { $t: string } | string
// 手绘细条：信纸横线、缝线、尺寸线、粉笔痕。给个小角度就是手画的“不太直”
function keBar(id: string, x: number, y: number, w: number, h: number, color: KeColor, opacity: number, zIndex: number, rotation = 0) {
  return { id, type: 'shape' as const, shapeKind: 'rect' as const, x: Math.round(x), y: Math.round(y), width: Math.round(w), height: Math.round(h), rotation, fill: color as any, opacity, borderRadius: Math.min(4, Math.max(1, h / 2)), zIndex }
}
// 两点连线：旋转以元素中心为轴，故按中点定位，角度自动算（引出线 / 斜撑 / 半径）
function keLineTo(id: string, x1: number, y1: number, x2: number, y2: number, color: KeColor, thickness: number, opacity: number, zIndex: number) {
  const len = Math.hypot(x2 - x1, y2 - y1), deg = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI
  return keBar(id, (x1 + x2) / 2 - len / 2, (y1 + y2) / 2 - thickness / 2, len, thickness, color, opacity, zIndex, Math.round(deg * 10) / 10)
}
// 空心圈 / 椭圆：邮戳、咖啡渍、火漆、细胞、圆规弧（style: 'dashed' 即作图痕）
function keRing(id: string, x: number, y: number, w: number, h: number, color: KeColor, width: number, opacity: number, zIndex: number, rotation = 0, style = 'solid') {
  return { id, type: 'shape' as const, shapeKind: 'circle' as const, x, y, width: w, height: h, rotation, border: { color: color as any, width, style }, opacity, zIndex }
}
// 实心点：粉笔灰、墨点、浆果
function keDot(id: string, cx: number, cy: number, r: number, color: KeColor, opacity: number, zIndex: number) {
  return { id, type: 'shape' as const, shapeKind: 'circle' as const, x: Math.round(cx - r), y: Math.round(cy - r), width: Math.round(r * 2), height: Math.round(r * 2), fill: color as any, opacity, zIndex }
}
// 固定种子伪随机：同一模板每次渲染点位一致，缩略图与导出不会各画一张
function keRnd(seed: number) { let s = seed >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296 } }
// 散布小点：在 (x0,y0)-(x1,y1) 里撒 n 个，透明度再各自抖一点，避免“复制粘贴感”
function keScatter(prefix: string, seed: number, x0: number, y0: number, x1: number, y1: number, n: number, rMin: number, rMax: number, color: KeColor, opacity: number, zIndex: number) {
  const rnd = keRnd(seed)
  return Array.from({ length: n }, (_, i) => keDot(`${prefix}-${i + 1}`, x0 + rnd() * (x1 - x0), y0 + rnd() * (y1 - y0), rMin + rnd() * (rMax - rMin), color, Number((opacity * (0.55 + rnd() * 0.45)).toFixed(2)), zIndex))
}
// 双层笔触：同一道线画两遍，第二遍更细更淡并错开，做出蜡笔 / 粉笔压不满的毛边
function keStroke2(id: string, x: number, y: number, w: number, h: number, color: KeColor, opacity: number, zIndex: number, rotation = 0) {
  return [keBar(`${id}-a`, x, y, w, h, color, opacity, zIndex, rotation - 0.8), keBar(`${id}-b`, x + w * 0.04, y + h + 6, w * 0.82, Math.max(3, h * 0.5), color, Number((opacity * 0.5).toFixed(2)), zIndex, rotation + 1.2)]
}
// 十字准星：蓝图 / 网格定位角标
function keCross(id: string, cx: number, cy: number, arm: number, t: number, color: KeColor, opacity: number, zIndex: number) {
  return [keBar(`${id}-h`, cx - arm / 2, cy - t / 2, arm, t, color, opacity, zIndex), keBar(`${id}-v`, cx - t / 2, cy - arm / 2, t, arm, color, opacity, zIndex)]
}
// 等距平行线：信纸横线、方格纸粗线、书钉；奇偶行各歪一点点，像手画
function keRows(id: string, n: number, x: number, y0: number, step: number, w: number, h: number, color: KeColor, opacity: number, zIndex: number, rotation = 0) {
  return Array.from({ length: n }, (_, i) => keBar(`${id}-${i + 1}`, x, y0 + i * step, w, h, color, opacity, zIndex, rotation + (i % 2 ? 0.35 : -0.35)))
}
// 虚线段：把一条线切成几小段，省掉“为什么这条线是实线”的追问
function keDashed(id: string, x1: number, y1: number, x2: number, y2: number, segs: number, thickness: number, color: KeColor, opacity: number, zIndex: number) {
  return Array.from({ length: segs }, (_, i) => {
    const t0 = i / segs, t1 = t0 + 0.62 / segs
    return keLineTo(`${id}-${i + 1}`, x1 + (x2 - x1) * t0, y1 + (y2 - y1) * t0, x1 + (x2 - x1) * t1, y1 + (y2 - y1) * t1, color, thickness, opacity, zIndex)
  })
}

export const handdrawnExtraTemplates: Template[] = [
  {
    id: 'handdrawn-bullet-journal', name: '手帐习惯打卡 (9:16)', version: '1.0.0', category: 'handdrawn', tags: ['handdrawn', 'journal', 'planner', 'checklist', '9:16'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="178" viewBox="0 0 100 178"><rect width="100" height="178" fill="%23fff8ec"/><rect x="12" y="20" width="76" height="140" rx="6" fill="none" stroke="%2357534e" stroke-width="2" stroke-dasharray="4 4"/><rect x="20" y="40" width="14" height="14" fill="none" stroke="%2357534e" stroke-width="2"/><path d="M22 47 l4 4 l7 -9" stroke="%2316a34a" stroke-width="2" fill="none"/></svg>',
    tokens: {
      colors: {
        bg: { label: '纸色', default: '#FFF8EC', options: ['#FFF8EC', '#FFFDF5', '#FEF6E7', '#F4F9F1', '#FBFAFF'] },
        ink: { label: '笔色', default: '#57534E', options: ['#57534E', '#44403C', '#3F3F46', '#1E293B'] },
        accent: { label: '强调', default: '#E11D48', options: ['#E11D48', '#7C3AED', '#2563EB', '#059669', '#EA580C'] }
      },
      fonts: { hand: { label: '手写字', default: CN_HAND, options: [CN_HAND, EN_HAND, 'STKaiti, KaiTi, serif'] } }
    },
    presets: [
      { name: '奶油手帐', colors: { bg: '#FFF8EC', ink: '#57534E', accent: '#E11D48' } },
      { name: '薄荷清单', colors: { bg: '#F4F9F1', ink: '#3F3F46', accent: '#059669' } },
      { name: '紫调规划', colors: { bg: '#FBFAFF', ink: '#44403C', accent: '#7C3AED' } },
      { name: '复古牛皮', colors: { bg: '#FEF6E7', ink: '#44403C', accent: '#EA580C' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1920, defaultWidth: 1080, defaultHeight: 1920, backgroundColor: { $t: 'colors.bg' }, backgroundImage: dotPaper(1080, 1920) },
    elements: [
      { id: 'frame', type: 'shape', shapeKind: 'rect', x: 60, y: 120, width: 960, height: 1680, border: { color: { $t: 'colors.ink' }, width: 3, style: 'dashed' }, borderRadius: 18, opacity: 0.55, zIndex: 1 },
      { id: 'tape', group: 'tape', type: 'image', src: CLOUD, objectFit: 'contain', x: 430, y: 70, width: 220, height: 130, zIndex: 5 },
      { id: 'title', type: 'text', content: '三月 · 关键词', fontFamily: { $t: 'fonts.hand' }, fontSize: 100, fontWeight: '700', color: { $t: 'colors.ink' }, x: 120, y: 240, width: 840, height: 140, zIndex: 3, animation: { name: 'inkReveal', duration: 1100 }, editable: { content: true, position: true } },
      { id: 'underline', type: 'image', src: QUILL, objectFit: 'contain', x: 130, y: 384, width: 460, height: 60, zIndex: 3, animation: { name: 'inkReveal', duration: 900, delay: 400 } },
      { id: 'sub', type: 'text', content: 'MONTHLY LOG · NO.03', fontFamily: PENCIL, fontSize: 30, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 4, x: 132, y: 460, width: 600, height: 44, zIndex: 3, editable: { content: true } },
      { id: 'habit-h', type: 'text', content: '本月习惯打卡', fontFamily: { $t: 'fonts.hand' }, fontSize: 54, fontWeight: '700', color: { $t: 'colors.ink' }, x: 120, y: 580, width: 600, height: 70, zIndex: 3, editable: { content: true } },
      { id: 'cb1', group: 'cb', type: 'shape', shapeKind: 'rect', x: 128, y: 700, width: 54, height: 54, border: { color: { $t: 'colors.ink' }, width: 3 }, borderRadius: 12, zIndex: 3 },
      { id: 'ck1', type: 'image', src: CHECK, objectFit: 'contain', x: 120, y: 690, width: 66, height: 66, zIndex: 4, animation: { name: 'zoomIn', duration: 400, delay: 600 } },
      { id: 'it1', type: 'text', content: '早睡早起 · 21 天', fontFamily: { $t: 'fonts.hand' }, fontSize: 44, fontWeight: '400', color: { $t: 'colors.ink' }, x: 210, y: 700, width: 640, height: 56, zIndex: 3, editable: { content: true } },
      { id: 'cb2', group: 'cb', type: 'shape', shapeKind: 'rect', x: 128, y: 800, width: 54, height: 54, border: { color: { $t: 'colors.ink' }, width: 3 }, borderRadius: 12, zIndex: 3 },
      { id: 'it2', type: 'text', content: '每天阅读 30 分钟', fontFamily: { $t: 'fonts.hand' }, fontSize: 44, fontWeight: '400', color: { $t: 'colors.ink' }, x: 210, y: 800, width: 640, height: 56, zIndex: 3, editable: { content: true } },
      { id: 'cb3', group: 'cb', type: 'shape', shapeKind: 'rect', x: 128, y: 900, width: 54, height: 54, border: { color: { $t: 'colors.ink' }, width: 3 }, borderRadius: 12, zIndex: 3 },
      { id: 'ck3', type: 'image', src: CHECK, objectFit: 'contain', x: 120, y: 890, width: 66, height: 66, zIndex: 4, animation: { name: 'zoomIn', duration: 400, delay: 800 } },
      { id: 'it3', type: 'text', content: '运动 3 次', fontFamily: { $t: 'fonts.hand' }, fontSize: 44, fontWeight: '400', color: { $t: 'colors.ink' }, x: 210, y: 900, width: 640, height: 56, zIndex: 3, editable: { content: true } },
      { id: 'grat-h', type: 'text', content: '今日份感恩', fontFamily: { $t: 'fonts.hand' }, fontSize: 54, fontWeight: '700', color: { $t: 'colors.ink' }, x: 120, y: 1080, width: 600, height: 70, zIndex: 3, editable: { content: true } },
      { id: 'grat-box', type: 'shape', shapeKind: 'rect', x: 120, y: 1190, width: 840, height: 440, fill: 'rgba(225,29,72,0.06)', border: { color: { $t: 'colors.accent' }, width: 2, style: 'dashed' }, borderRadius: 16, zIndex: 2 },
      { id: 'grat-text', type: 'text', content: '· 傍晚的那场大雨\n· 朋友寄来的明信片\n· 还没放弃的自己', fontFamily: { $t: 'fonts.hand' }, fontSize: 42, fontWeight: '400', color: { $t: 'colors.ink' }, lineHeight: 1.7, x: 170, y: 1250, width: 740, height: 320, zIndex: 3, animation: { name: 'fadeIn', duration: 900, delay: 500 }, editable: { content: true } },
      { id: 'star', group: 'star', type: 'image', src: STAR, objectFit: 'contain', x: 830, y: 1690, width: 78, height: 78, zIndex: 4, animation: { name: 'twinkle', duration: 2600, iterationCount: 'infinite' } },
      { id: 'footer', type: 'text', content: 'page 01 / handdrawn', fontFamily: PENCIL, fontSize: 26, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.5, x: 120, y: 1700, width: 400, height: 34, zIndex: 3, editable: { content: true } }
    ]
  },
  {
    id: 'handdrawn-chalkboard', name: '黑板粉笔板书 (1:1)', version: '1.0.0', category: 'handdrawn', tags: ['handdrawn', 'chalkboard', 'chalk', 'teaching', '1:1'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23234d3a"/><rect x="6" y="6" width="88" height="88" rx="4" fill="none" stroke="%237a5230" stroke-width="7"/><rect x="13" y="13" width="74" height="74" fill="none" stroke="%235c3b1e" stroke-width="1.5"/><rect x="22" y="30" width="46" height="12" fill="%23ffffff" opacity="0.06" transform="rotate(-2 45 36)"/><g fill="%23f8fafc"><circle cx="30" cy="70" r="1.4" opacity="0.35"/><circle cx="64" cy="26" r="1.1" opacity="0.28"/><circle cx="78" cy="62" r="1.6" opacity="0.3"/><circle cx="46" cy="82" r="1.2" opacity="0.25"/></g><path d="M20 26 h22" stroke="%23fde68a" stroke-width="3" opacity="0.9"/><path d="M20 34 h34 M20 44 h46 M20 52 h28" stroke="%23f8fafc" stroke-width="3" opacity="0.85"/><path d="M22 60 C 34 52, 46 66, 58 58" fill="none" stroke="%23fde68a" stroke-width="2"/><path d="M62 66 l26 -14" stroke="%23f8fafc" stroke-width="2"/><circle cx="75" cy="59" r="2.4" fill="%23fde68a"/><path d="M70 78 q6 -4 12 0" fill="none" stroke="%23fde68a" stroke-width="2"/><g><rect x="18" y="84" width="16" height="3.6" rx="1.8" fill="%23f8fafc" opacity="0.9" transform="rotate(-3 26 86)"/><rect x="36" y="85" width="13" height="3.4" rx="1.7" fill="%23fde68a" opacity="0.9" transform="rotate(4 42 87)"/><rect x="52" y="84" width="10" height="3.2" rx="1.6" fill="%23f8fafc" opacity="0.6"/></g></svg>',
    tokens: {
      colors: {
        bg: { label: '板面', default: '#234D3A', options: ['#234D3A', '#1E293B', '#312E81', '#3B2A20'] },
        ink: { label: '粉笔', default: '#F8FAFC', options: ['#F8FAFC', '#FFFFFF', '#E5E7EB', '#F1F5F9', '#E0E7FF', '#F5E9DA'] },
        accent: { label: '彩笔', default: '#FDE68A', options: ['#FDE68A', '#A7F3D0', '#FBCFE8', '#BAE6FD', '#7DD3FC', '#FCD34D'] }
      },
      fonts: { hand: { label: '手写体', default: CN_HAND, options: [CN_HAND, EN_HAND, '"Comic Sans MS", cursive'] } }
    },
    presets: [
      { name: '墨绿黑板', colors: { bg: '#234D3A', ink: '#F8FAFC', accent: '#FDE68A' } },
      { name: '深夜蓝板', colors: { bg: '#1E293B', ink: '#F1F5F9', accent: '#7DD3FC' } },
      { name: '靛紫讲堂', colors: { bg: '#312E81', ink: '#E0E7FF', accent: '#FBCFE8' } },
      { name: '棕木复古', colors: { bg: '#3B2A20', ink: '#F5E9DA', accent: '#FCD34D' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1080, defaultWidth: 1080, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' }, backgroundImage: flecks(1080, 1080, 150, 'rgba(255,255,255,0.05)') },
    elements: [
      // —— 木框双层 + 擦痕 + 粉笔灰：黑板不是干净的面，是被擦过很多遍的面 ——
      { id: 'wood-frame', type: 'shape', shapeKind: 'rect', x: 26, y: 26, width: 1028, height: 1028, border: { color: '#7A5230', width: 26, style: 'solid' }, borderRadius: 20, zIndex: 5 },
      { id: 'wood-frame-inner', type: 'shape', shapeKind: 'rect', x: 52, y: 52, width: 976, height: 976, border: { color: '#5C3B1E', width: 6, style: 'solid' }, borderRadius: 10, opacity: 0.9, zIndex: 5 },
      { id: 'inner-line', type: 'shape', shapeKind: 'rect', x: 96, y: 96, width: 888, height: 888, border: { color: { $t: 'colors.ink' }, width: 2, style: 'dashed' }, borderRadius: 12, opacity: 0.4, zIndex: 2 },
      { id: 'chalk-eraser-1', type: 'shape', shapeKind: 'rect', x: 210, y: 606, width: 620, height: 46, fill: { $t: 'colors.ink' }, opacity: 0.05, rotation: -1.4, borderRadius: 6, zIndex: 1 },
      { id: 'chalk-eraser-2', type: 'shape', shapeKind: 'rect', x: 520, y: 232, width: 400, height: 62, fill: { $t: 'colors.ink' }, opacity: 0.04, rotation: 1.8, borderRadius: 8, zIndex: 1 },
      ...keScatter('chalk-dust', 20260918, 130, 470, 950, 930, 4, 4, 10, { $t: 'colors.ink' }, 0.3, 2),
      // —— 板书主体 ——
      { id: 'subject', type: 'text', content: '数学 · 选择性必修二', fontFamily: { $t: 'fonts.hand' }, fontSize: 44, fontWeight: '700', color: { $t: 'colors.accent' }, x: 140, y: 148, width: 520, height: 60, zIndex: 3, editable: { content: true } },
      { id: 'lesson-date', type: 'text', content: '2026.09.18 周五 · 第 5 讲', fontFamily: PENCIL, fontSize: 26, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.72, textAlign: 'right', x: 600, y: 156, width: 350, height: 40, zIndex: 3, editable: { content: true } },
      { id: 'title', type: 'text', content: '什么是“导数”？', fontFamily: { $t: 'fonts.hand' }, fontSize: 96, fontWeight: '700', color: { $t: 'colors.ink' }, x: 140, y: 230, width: 820, height: 130, zIndex: 3, animation: { name: 'inkReveal', duration: 1200 }, editable: { content: true, position: true } },
      { id: 'rule', type: 'shape', shapeKind: 'line', x: 140, y: 380, width: 420, height: 4, fill: { $t: 'colors.accent' }, opacity: 0.8, zIndex: 3, animation: { name: 'slideInLeft', duration: 700, delay: 500 } },
      { id: 'rule-second', type: 'shape', shapeKind: 'rect', x: 152, y: 394, width: 366, height: 2, fill: { $t: 'colors.ink' }, opacity: 0.45, rotation: 0.9, borderRadius: 2, zIndex: 3 },
      { id: 'formula', type: 'text', content: "f'(x) = lim   [ f(x+h) − f(x) ] / h\n            h→0", fontFamily: PENCIL, fontSize: 46, fontWeight: '700', color: { $t: 'colors.ink' }, lineHeight: 1.6, x: 140, y: 440, width: 820, height: 170, zIndex: 3, animation: { name: 'fadeIn', duration: 900, delay: 400 }, editable: { content: true } },
      // 关键词下面那道波浪：粉笔第二遍没压住第一遍
      ...keStroke2('formula-wave', 316, 630, 372, 8, { $t: 'colors.accent' }, 0.8, 3),
      { id: 'note', type: 'text', content: '本质：曲线在某一点的“瞬时变化率”。', fontFamily: { $t: 'fonts.hand' }, fontSize: 40, fontWeight: '400', color: { $t: 'colors.accent' }, x: 140, y: 690, width: 560, height: 100, zIndex: 3, editable: { content: true } },
      // —— 右侧副板书：老师顺手写的、但考试一定会考 ——
      { id: 'side-tag', type: 'text', content: '背下来', fontFamily: { $t: 'fonts.hand' }, fontSize: 30, fontWeight: '700', color: { $t: 'colors.accent' }, opacity: 0.85, rotation: -6, x: 742, y: 660, width: 130, height: 40, zIndex: 3, editable: { content: true } },
      { id: 'side-1', type: 'text', content: "(sin x)' = cos x", fontFamily: PENCIL, fontSize: 28, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.8, x: 742, y: 706, width: 240, height: 36, zIndex: 3, editable: { content: true } },
      { id: 'side-2', type: 'text', content: "(ln x)' = 1 / x", fontFamily: PENCIL, fontSize: 28, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.7, rotation: 1.5, x: 742, y: 744, width: 240, height: 36, zIndex: 3, editable: { content: true } },
      // —— 切线示意：一条线 + 一个点 + 一句话 ——
      { id: 'curve', type: 'shape', shapeKind: 'line', x: 700, y: 880, width: 300, height: 4, fill: { $t: 'colors.ink' }, rotation: -24, opacity: 0.85, zIndex: 3 },
      { id: 'tangent-point', type: 'shape', shapeKind: 'circle', x: 840, y: 872, width: 20, height: 20, fill: { $t: 'colors.accent' }, opacity: 0.95, zIndex: 4 },
      { id: 'tangent-label', type: 'text', content: 'P(1, f(1)) · 割线躺平的那一刻', fontFamily: PENCIL, fontSize: 22, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.66, rotation: -2, x: 640, y: 944, width: 400, height: 32, zIndex: 3, editable: { content: true } },
      { id: 'circle-mark', type: 'shape', shapeKind: 'circle', x: 150, y: 820, width: 150, height: 96, border: { color: { $t: 'colors.accent' }, width: 4, style: 'solid' }, rotation: -8, zIndex: 3, animation: { name: 'wobble', duration: 3200, iterationCount: 'infinite' } },
      { id: 'todo', type: 'text', content: '作业：课本 P42 练习 1–4', fontFamily: PENCIL, fontSize: 30, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.7, x: 140, y: 846, width: 620, height: 44, zIndex: 4, editable: { content: true } },
      // —— 讲台角：三支粉笔，用剩的一长一短 ——
      { id: 'chalk-stick-1', group: 'chalk-stick-', type: 'shape', shapeKind: 'rect', x: 128, y: 940, width: 124, height: 17, fill: { $t: 'colors.ink' }, opacity: 0.92, rotation: -3, borderRadius: 8, zIndex: 4 },
      { id: 'chalk-stick-2', group: 'chalk-stick-', type: 'shape', shapeKind: 'rect', x: 268, y: 944, width: 96, height: 15, fill: { $t: 'colors.accent' }, opacity: 0.92, rotation: 4, borderRadius: 7, zIndex: 4 },
      { id: 'chalk-stick-3', group: 'chalk-stick-', type: 'shape', shapeKind: 'rect', x: 378, y: 941, width: 62, height: 14, fill: { $t: 'colors.ink' }, opacity: 0.6, rotation: -1.5, borderRadius: 7, zIndex: 4 }
    ]
  },
  {
    id: 'handdrawn-kraft-letter', name: '牛皮纸手写信 (4:5)', version: '1.0.0', category: 'handdrawn', tags: ['handdrawn', 'letter', 'kraft', 'vintage', 'post', '4:5'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="125" viewBox="0 0 100 125"><rect width="100" height="125" fill="%23e0b98a"/><rect x="10" y="14" width="80" height="100" rx="3" fill="%23fff5e6" transform="rotate(-1.5 50 64)"/><g stroke="%235b4632" stroke-width="0.8" opacity="0.18"><path d="M20 42h64M20 55h64M20 68h64M20 81h64M20 94h58"/></g><g stroke="%235b4632" stroke-width="1" opacity="0.4" stroke-linecap="round"><path d="M15 33v6M15 53v6M15 73v6M15 93v6"/></g><rect x="66" y="20" width="20" height="24" fill="%23fef9c3" stroke="%23b45309" stroke-dasharray="3 3"/><g fill="none" stroke="%235b4632" opacity="0.4"><circle cx="74" cy="30" r="12" stroke-width="1.4"/><circle cx="74" cy="30" r="8" stroke-width="0.8"/><path d="M60 46h26M61 50h24" stroke-width="1"/></g><path d="M18 26h20" stroke="%235b4632" stroke-width="2.4" opacity="0.85"/><path d="M20 40h44M20 52h50M20 64h34" stroke="%235b4632" stroke-width="1.6" opacity="0.5"/><circle cx="78" cy="103" r="8" fill="%235b4632" opacity="0.9"/><path d="M75 106l3-4 3 4" fill="none" stroke="%23fff5e6" stroke-width="1.2"/><path d="M14 112 q4 -6 8 0 q-4 6 -8 0z" fill="%23fb7185" stroke="%23e11d48" stroke-width="1"/><rect x="6" y="106" width="18" height="6" fill="%23fde68a" opacity="0.85" transform="rotate(28 15 109)"/></svg>',
    tokens: {
      colors: {
        bg: { label: '牛皮', default: '#E0B98A', options: ['#E0B98A', '#D6A86B', '#C99A5B', '#E8CBA0', '#B5854A'] },
        paper: { label: '信纸', default: '#FFF5E6', options: ['#FFF5E6', '#FFFBF2', '#FDF6EC', '#F5EBD9'] },
        ink: { label: '笔色', default: '#5B4632', options: ['#5B4632', '#44403C', '#6B4F32', '#4A3728', '#3F3428'] }
      },
      fonts: { hand: { label: '手写字', default: CN_HAND, options: [CN_HAND, EN_HAND, 'STKaiti, KaiTi, serif'] } }
    },
    presets: [
      { name: '经典牛皮', colors: { bg: '#E0B98A', paper: '#FFF5E6', ink: '#5B4632' } },
      { name: '暖棕旧信', colors: { bg: '#C99A5B', paper: '#FDF6EC', ink: '#4A3728' } },
      { name: '浅杏纸感', colors: { bg: '#E8CBA0', paper: '#FFFBF2', ink: '#5B4632' } },
      { name: '深咖复古', colors: { bg: '#B5854A', paper: '#F5EBD9', ink: '#3F3428' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' }, backgroundImage: flecks(1080, 1350, 160, 'rgba(90,60,30,0.10)') },
    elements: [
      // —— 纸面层：横线 + 装订缝线 + 折过一次的痕 ——
      { id: 'letter-paper', type: 'shape', shapeKind: 'rect', x: 90, y: 120, width: 900, height: 1110, fill: { $t: 'colors.paper' }, rotation: -1.5, borderRadius: 6, shadow: { color: 'rgba(0,0,0,0.18)', blur: 24, offsetX: 0, offsetY: 10 }, zIndex: 1 },
      ...keRows('paper-rule', 6, 182, 400, 84, 740, 2, { $t: 'colors.ink' }, 0.11, 2, -1.5),
      { id: 'fold-crease', type: 'shape', shapeKind: 'rect', x: 96, y: 682, width: 888, height: 3, fill: { $t: 'colors.ink' }, opacity: 0.06, rotation: -1.5, borderRadius: 2, zIndex: 1 },
      ...keRows('margin-stitch', 4, 148, 300, 220, 4, 34, { $t: 'colors.ink' }, 0.4, 2, -1.5),
      // —— 邮资层：邮票 + 双层邮戳圈 + 两道销票痕 ——
      { id: 'tape', group: 'tape', type: 'image', src: CLOUD, objectFit: 'contain', x: 60, y: 64, width: 170, height: 100, rotation: -18, zIndex: 6 },
      { id: 'tape-corner', type: 'image', src: TAPE, objectFit: 'contain', x: 44, y: 1150, width: 180, height: 58, rotation: 28, zIndex: 6 },
      { id: 'stamp', type: 'image', src: STAMP, objectFit: 'contain', x: 812, y: 158, width: 128, height: 148, rotation: 5, zIndex: 4 },
      { id: 'postmark', type: 'shape', shapeKind: 'circle', x: 792, y: 178, width: 150, height: 150, border: { color: { $t: 'colors.ink' }, width: 3, style: 'solid' }, opacity: 0.35, rotation: -12, zIndex: 5 },
      { id: 'postmark-inner', type: 'shape', shapeKind: 'circle', x: 812, y: 198, width: 110, height: 110, border: { color: { $t: 'colors.ink' }, width: 2, style: 'dashed' }, opacity: 0.3, rotation: -12, zIndex: 5 },
      { id: 'postmark-date', type: 'text', content: '2026.09.18 · 上海 邮政', fontFamily: PENCIL, fontSize: 18, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.5, textAlign: 'center', rotation: -12, x: 762, y: 234, width: 210, height: 26, zIndex: 5, editable: { content: true } },
      { id: 'postmark-wave-1', type: 'shape', shapeKind: 'rect', x: 742, y: 306, width: 250, height: 4, fill: { $t: 'colors.ink' }, opacity: 0.3, rotation: -12, borderRadius: 2, zIndex: 5 },
      { id: 'postmark-wave-2', type: 'shape', shapeKind: 'rect', x: 748, y: 324, width: 238, height: 4, fill: { $t: 'colors.ink' }, opacity: 0.2, rotation: -12, borderRadius: 2, zIndex: 5 },
      // —— 写信层 ——
      { id: 'letter-kicker', type: 'text', content: 'LETTER NO.41 · 手写不打草稿', fontFamily: PENCIL, fontSize: 22, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.55, letterSpacing: 5, rotation: -1.5, x: 260, y: 164, width: 520, height: 32, zIndex: 3, editable: { content: true } },
      { id: 'salutation', type: 'text', content: '见字如面：', fontFamily: { $t: 'fonts.hand' }, fontSize: 58, fontWeight: '700', color: { $t: 'colors.ink' }, rotation: -1.5, x: 160, y: 220, width: 500, height: 80, zIndex: 3, animation: { name: 'inkReveal', duration: 1000 }, editable: { content: true, position: true } },
      { id: 'body', type: 'text', content: '很久没有这样提笔写字了。\n愿你所在城市，此刻天气晴。\n把生活里的琐碎，慢慢写成诗。', fontFamily: { $t: 'fonts.hand' }, fontSize: 44, fontWeight: '400', color: { $t: 'colors.ink' }, lineHeight: 1.9, rotation: -1.5, x: 160, y: 360, width: 780, height: 480, zIndex: 3, animation: { name: 'fadeIn', duration: 900, delay: 400 }, editable: { content: true } },
      { id: 'sign', type: 'text', content: '—— 你的老友', fontFamily: { $t: 'fonts.hand' }, fontSize: 44, fontWeight: '400', color: { $t: 'colors.ink' }, textAlign: 'right', rotation: -1.5, x: 520, y: 920, width: 420, height: 70, zIndex: 3, editable: { content: true } },
      { id: 'date', type: 'text', content: '二〇二六年 · 秋', fontFamily: PENCIL, fontSize: 26, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.6, textAlign: 'right', rotation: -1.5, x: 620, y: 1000, width: 320, height: 40, zIndex: 3, editable: { content: true } },
      { id: 'postscript', type: 'text', content: 'P.S. 信封里那张车票，我留着没扔。', fontFamily: { $t: 'fonts.hand' }, fontSize: 32, fontWeight: '400', color: { $t: 'colors.ink' }, opacity: 0.82, lineHeight: 1.5, rotation: -1.5, x: 160, y: 1046, width: 560, height: 80, zIndex: 3, editable: { content: true } },
      { id: 'ps-arrow', type: 'image', src: CURVED_ARROW, objectFit: 'contain', x: 636, y: 1030, width: 140, height: 110, rotation: 26, zIndex: 4 },
      // —— 火漆封缄：压在信角上，字是烫出来的 ——
      { id: 'wax-seal', type: 'shape', shapeKind: 'circle', x: 806, y: 1056, width: 132, height: 132, fill: { $t: 'colors.ink' }, opacity: 0.94, rotation: -8, zIndex: 5 },
      { id: 'wax-seal-mark', type: 'text', content: '安', fontFamily: { $t: 'fonts.hand' }, fontSize: 62, fontWeight: '700', color: { $t: 'colors.paper' }, textAlign: 'center', rotation: -8, x: 806, y: 1080, width: 132, height: 88, zIndex: 6 },
      { id: 'heart', type: 'image', src: HEART, objectFit: 'contain', x: 168, y: 1140, width: 80, height: 74, rotation: -8, zIndex: 4, animation: { name: 'heartbeat', duration: 1800, iterationCount: 'infinite' } }
    ]
  },
  {
    id: 'handdrawn-blueprint', name: '铅笔建筑草图 (16:9)', version: '1.0.0', category: 'handdrawn', tags: ['handdrawn', 'blueprint', 'sketch', 'architecture', '16:9'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="178" height="100" viewBox="0 0 178 100"><rect width="178" height="100" fill="%23eef4ff"/><g stroke="%231e3a8a" stroke-width="0.5" opacity="0.18"><path d="M14 0V100M28 0V100M42 0V100M56 0V100M70 0V100M84 0V100M98 0V100M112 0V100M126 0V100M140 0V100M154 0V100M168 0V100M0 14H178M0 28H178M0 42H178M0 56H178M0 70H178M0 84H178"/></g><rect x="4" y="4" width="170" height="92" fill="none" stroke="%231e3a8a" stroke-width="1" stroke-dasharray="3 3" opacity="0.55"/><rect x="7" y="7" width="164" height="86" fill="none" stroke="%231e3a8a" stroke-width="0.6" opacity="0.35"/><path d="M60 70 h58 V40 l-29 -18 l-29 18 Z" fill="none" stroke="%231e3a8a" stroke-width="2"/><line x1="20" y1="80" x2="158" y2="80" stroke="%231e3a8a" stroke-width="1.5" stroke-dasharray="3 3"/><g stroke="%23dc2626" stroke-width="1"><path d="M52 78V42"/><path d="M49 42h6M49 78h6"/></g><text x="46" y="62" font-size="7" fill="%23dc2626" font-family="monospace" transform="rotate(-90 46 62)">10.5 m</text><g stroke="%23dc2626" stroke-width="1" fill="none"><path d="M89 40 L116 26"/><path d="M118 72 L146 64"/></g><g fill="%23dc2626"><circle cx="89" cy="40" r="1.8"/><circle cx="118" cy="72" r="1.8"/></g><g stroke="%231e3a8a" stroke-width="0.8" opacity="0.5"><path d="M104 12h10M109 7v10M70 88h10M75 83v10"/></g><rect x="126" y="80" width="46" height="16" fill="none" stroke="%231e3a8a" stroke-width="1"/><path d="M126 88h46" stroke="%231e3a8a" stroke-width="0.6"/><text x="129" y="86" font-size="5" fill="%231e3a8a" font-family="monospace">A-101</text><text x="129" y="94" font-size="5" fill="%231e3a8a" font-family="monospace">1:150</text></svg>',
    tokens: {
      colors: {
        bg: { label: '图纸', default: '#EFF4FF', options: ['#EFF4FF', '#E7F0FF', '#F2F6FF', '#E3EEFF', '#F5F3FF', '#E3F2FD'] },
        ink: { label: '线稿', default: '#1E3A8A', options: ['#1E3A8A', '#1E293B', '#0F172A', '#3730A3'] },
        accent: { label: '标注', default: '#DC2626', options: ['#DC2626', '#EA580C', '#0891B2', '#4F46E5', '#0284C7'] }
      },
      fonts: { hand: { label: '标题', default: CN_HAND, options: [CN_HAND, 'STKaiti, KaiTi, serif', EN_HAND] } }
    },
    presets: [
      { name: '经典蓝图', colors: { bg: '#EFF4FF', ink: '#1E3A8A', accent: '#DC2626' } },
      { name: '石墨工程', colors: { bg: '#F2F6FF', ink: '#1E293B', accent: '#0891B2' } },
      { name: '暖调草图', colors: { bg: '#F5F3FF', ink: '#3730A3', accent: '#EA580C' } },
      { name: '深海图纸', colors: { bg: '#E3F2FD', ink: '#0F172A', accent: '#0284C7' } }
    ],
    canvas: { virtualWidth: 1920, virtualHeight: 1080, defaultWidth: 1920, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' }, backgroundImage: gridPaper(1920, 1080, 48) },
    elements: [
      // —— 图框：双线外框 + 两处十字准星（晒图定位用的） ——
      { id: 'frame', type: 'shape', shapeKind: 'rect', x: 40, y: 40, width: 1840, height: 1000, border: { color: { $t: 'colors.ink' }, width: 3, style: 'dashed' }, borderRadius: 8, opacity: 0.5, zIndex: 1 },
      { id: 'frame-inner', type: 'shape', shapeKind: 'rect', x: 58, y: 58, width: 1804, height: 964, border: { color: { $t: 'colors.ink' }, width: 2, style: 'solid' }, opacity: 0.32, zIndex: 1 },
      ...keCross('cross-a', 1132, 116, 60, 3, { $t: 'colors.ink' }, 0.4, 2),
      ...keCross('cross-b', 946, 962, 60, 3, { $t: 'colors.ink' }, 0.4, 2),
      // —— 图名区 ——
      { id: 'eyebrow', type: 'text', content: 'ARCHITECTURE SKETCH', fontFamily: PENCIL, fontSize: 28, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 6, x: 120, y: 108, width: 900, height: 36, zIndex: 3, editable: { content: true } },
      { id: 'title', type: 'text', content: '中央图书馆 · 立面草图', fontFamily: { $t: 'fonts.hand' }, fontSize: 66, fontWeight: '700', color: { $t: 'colors.ink' }, x: 120, y: 150, width: 1000, height: 90, zIndex: 3, animation: { name: 'inkReveal', duration: 1100 }, editable: { content: true, position: true } },
      { id: 'sub', type: 'text', content: 'SCALE 1:150  ·  SHEET A-101  ·  正午日照验算', fontFamily: PENCIL, fontSize: 26, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.6, x: 120, y: 250, width: 900, height: 40, zIndex: 3, editable: { content: true } },
      // —— 立面 + 两道尺寸（横向在脚下，纵向在左侧） ——
      { id: 'drawing', type: 'image', src: BUILDING, objectFit: 'contain', x: 200, y: 340, width: 560, height: 430, zIndex: 2, animation: { name: 'fadeInUp', duration: 900 } },
      { id: 'dim', type: 'image', src: DIM_ARROW, objectFit: 'contain', x: 210, y: 790, width: 540, height: 40, zIndex: 2 },
      { id: 'dim-text', type: 'text', content: '24.0 m', fontFamily: PENCIL, fontSize: 24, fontWeight: '700', color: { $t: 'colors.ink' }, x: 400, y: 836, width: 200, height: 32, zIndex: 3, editable: { content: true } },
      { id: 'dim-v-line', type: 'shape', shapeKind: 'rect', x: 266, y: 392, width: 3, height: 320, fill: { $t: 'colors.accent' }, opacity: 0.75, rotation: 0.4, borderRadius: 2, zIndex: 3 },
      { id: 'dim-v-tick', type: 'shape', shapeKind: 'rect', x: 248, y: 709, width: 40, height: 3, fill: { $t: 'colors.accent' }, opacity: 0.75, borderRadius: 2, zIndex: 3 },
      { id: 'dim-v-text', type: 'text', content: '10.5 m', fontFamily: PENCIL, fontSize: 24, fontWeight: '700', color: { $t: 'colors.accent' }, textAlign: 'center', rotation: -90, x: 216, y: 511, width: 100, height: 32, zIndex: 3, editable: { content: true } },
      // —— 引出注释：一个点、一条线、一句人话 ——
      { id: 'lead-a-dot', type: 'shape', shapeKind: 'circle', x: 474, y: 386, width: 13, height: 13, fill: { $t: 'colors.accent' }, opacity: 0.95, zIndex: 3 },
      { id: 'lead-a-line', type: 'shape', shapeKind: 'rect', x: 487, y: 343, width: 256, height: 2, fill: { $t: 'colors.accent' }, opacity: 0.8, rotation: -21, borderRadius: 1, zIndex: 3 },
      { id: 'lead-a-text', type: 'text', content: '坡屋面 · 25° 找坡，雨水自己走', fontFamily: PENCIL, fontSize: 24, fontWeight: '700', color: { $t: 'colors.accent' }, rotation: -2, x: 748, y: 278, width: 420, height: 34, zIndex: 3, editable: { content: true } },
      { id: 'lead-b-dot', type: 'shape', shapeKind: 'circle', x: 636, y: 658, width: 13, height: 13, fill: { $t: 'colors.accent' }, opacity: 0.95, zIndex: 3 },
      { id: 'lead-b-line', type: 'shape', shapeKind: 'rect', x: 649, y: 699, width: 214, height: 2, fill: { $t: 'colors.accent' }, opacity: 0.8, rotation: 21, borderRadius: 1, zIndex: 3 },
      { id: 'lead-b-text', type: 'text', content: '承重墙 300mm · 不能拆，问了结构了', fontFamily: PENCIL, fontSize: 24, fontWeight: '700', color: { $t: 'colors.accent' }, rotation: 2, x: 862, y: 726, width: 440, height: 34, zIndex: 3, editable: { content: true } },
      { id: 'north', type: 'image', src: NORTH, objectFit: 'contain', x: 800, y: 380, width: 96, height: 118, zIndex: 3, animation: { name: 'swing', duration: 3000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      // —— 设计说明 ——
      { id: 'note-box', type: 'shape', shapeKind: 'rect', x: 1180, y: 340, width: 620, height: 400, border: { color: { $t: 'colors.ink' }, width: 2, style: 'dashed' }, borderRadius: 12, opacity: 0.9, zIndex: 2 },
      { id: 'note-h', type: 'text', content: '设计说明', fontFamily: { $t: 'fonts.hand' }, fontSize: 44, fontWeight: '700', color: { $t: 'colors.accent' }, x: 1220, y: 384, width: 400, height: 60, zIndex: 3, editable: { content: true } },
      { id: 'note-b', type: 'text', content: '· 南向采光角 ≥ 45°\n· 承重墙厚 300mm\n· 中庭通高两层，自然通风', fontFamily: { $t: 'fonts.hand' }, fontSize: 34, fontWeight: '400', color: { $t: 'colors.ink' }, lineHeight: 1.7, x: 1220, y: 460, width: 540, height: 250, zIndex: 3, animation: { name: 'fadeIn', duration: 800, delay: 400 }, editable: { content: true } },
      // —— 图签角块：改到第 3 版，还是第 1 版好看 ——
      { id: 'title-block', type: 'shape', shapeKind: 'rect', x: 1440, y: 828, width: 420, height: 176, border: { color: { $t: 'colors.ink' }, width: 3, style: 'solid' }, opacity: 0.9, zIndex: 2 },
      { id: 'title-block-rule', type: 'shape', shapeKind: 'rect', x: 1440, y: 916, width: 420, height: 2, fill: { $t: 'colors.ink' }, opacity: 0.5, zIndex: 3 },
      { id: 'title-block-a', type: 'text', content: '图号 A-101 · 立面图', fontFamily: PENCIL, fontSize: 26, fontWeight: '700', color: { $t: 'colors.ink' }, x: 1466, y: 852, width: 370, height: 38, zIndex: 3, editable: { content: true } },
      { id: 'title-block-b', type: 'text', content: '比例 1:150 · 2026.09.18', fontFamily: PENCIL, fontSize: 26, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.75, x: 1466, y: 940, width: 370, height: 38, zIndex: 3, editable: { content: true } },
      { id: 'footer', type: 'text', content: 'rev 03 · drawn by hand, not by CAD (yet)', fontFamily: PENCIL, fontSize: 24, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.5, x: 120, y: 966, width: 700, height: 34, zIndex: 3, editable: { content: true } }
    ]
  },
  {
    id: 'handdrawn-recipe', name: '手写食谱卡 (9:16)', version: '1.0.0', category: 'handdrawn', tags: ['handdrawn', 'recipe', 'menu', 'food', '9:16'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="178" viewBox="0 0 100 178"><rect width="100" height="178" fill="%23f7f1e3"/><rect x="12" y="22" width="76" height="136" rx="6" fill="%23fffdf7" stroke="%23b45309" stroke-width="2"/><rect x="16" y="26" width="68" height="128" rx="4" fill="none" stroke="%2378350f" stroke-width="0.6" stroke-dasharray="3 3" opacity="0.5"/><text x="50" y="42" font-size="6" fill="%23ea580c" font-family="monospace" text-anchor="middle">NO.12</text><path d="M32 52 q10 -16 20 0 t20 0" fill="none" stroke="%23ea580c" stroke-width="3"/><path d="M36 57 q9 -12 18 0" fill="none" stroke="%2378350f" stroke-width="1" opacity="0.4"/><g stroke="%2378350f" stroke-width="1.6" opacity="0.85"><path d="M22 70h30M22 78h26M22 86h32M22 94h24"/></g><g stroke="%2378350f" stroke-width="1.6" opacity="0.6" text-anchor="end"><path d="M70 70h8M70 78h8M70 86h6M70 94h8"/></g><circle cx="76" cy="106" r="6" fill="%23ea580c" opacity="0.8"/><path d="M76 99 l1.5 -4" stroke="%233f4e3a" stroke-width="1.6"/><g stroke="%2378350f" stroke-width="1.4" opacity="0.7"><path d="M22 116h44M22 124h38M22 132h42"/></g><rect x="20" y="138" width="60" height="18" rx="3" fill="none" stroke="%23ea580c" stroke-width="1" stroke-dasharray="3 2"/><g fill="%23ea580c" opacity="0.7"><rect x="24" y="142" width="34" height="2"/><rect x="24" y="148" width="26" height="2"/></g><path d="M22 162h14M42 162h14M62 162h14" stroke="%23b45309" stroke-width="1.5" stroke-dasharray="2 2"/></svg>',
    tokens: {
      colors: {
        bg: { label: '背景', default: '#F7F1E3', options: ['#F7F1E3', '#FBF6EC', '#F3EADB', '#FDF8EE', '#F5E9D7'] },
        paper: { label: '卡片', default: '#FFFDF7', options: ['#FFFDF7', '#FFFFFF', '#FFFBF0', '#FFFBF2'] },
        ink: { label: '笔色', default: '#78350F', options: ['#78350F', '#57534E', '#44403C', '#3F4E3A', '#6B2D5B', '#5B4632'] },
        accent: { label: '强调', default: '#EA580C', options: ['#EA580C', '#C2410C', '#B91C1C', '#15803D'] }
      },
      fonts: { hand: { label: '手写字', default: CN_HAND, options: [CN_HAND, EN_HAND, 'STKaiti, KaiTi, serif'] } }
    },
    presets: [
      { name: '番茄厨房', colors: { bg: '#F7F1E3', paper: '#FFFDF7', ink: '#78350F', accent: '#EA580C' } },
      { name: '香草绿地', colors: { bg: '#F3EADB', paper: '#FFFFFF', ink: '#3F4E3A', accent: '#15803D' } },
      { name: '莓果甜铺', colors: { bg: '#FDF8EE', paper: '#FFFBF0', ink: '#6B2D5B', accent: '#B91C1C' } },
      { name: '焦糖甜点', colors: { bg: '#F5E9D7', paper: '#FFFBF2', ink: '#5B4632', accent: '#C2410C' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1920, defaultWidth: 1080, defaultHeight: 1920, backgroundColor: { $t: 'colors.bg' }, backgroundImage: dotPaper(1080, 1920, 46, 'rgba(180,83,9,0.10)') },
    elements: [
      // —— 卡纸 + 内框：食谱卡都是剪下来贴在本子上的，边框得像剪过 ——
      { id: 'card', type: 'shape', shapeKind: 'rect', x: 90, y: 150, width: 900, height: 1620, fill: { $t: 'colors.paper' }, border: { color: { $t: 'colors.ink' }, width: 3, style: 'solid' }, borderRadius: 20, shadow: { color: 'rgba(0,0,0,0.12)', blur: 22, offsetX: 6, offsetY: 10 }, zIndex: 1 },
      { id: 'card-inner', type: 'shape', shapeKind: 'rect', x: 114, y: 176, width: 852, height: 1568, border: { color: { $t: 'colors.ink' }, width: 2, style: 'dashed' }, borderRadius: 14, opacity: 0.28, zIndex: 2 },
      { id: 'tape', group: 'tape', type: 'image', src: CLOUD, objectFit: 'contain', x: 440, y: 96, width: 200, height: 110, zIndex: 6 },
      // —— 菜名 ——
      { id: 'cuisine', type: 'text', content: '家常菜 · NO.12', fontFamily: PENCIL, fontSize: 28, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 3, textAlign: 'center', x: 240, y: 220, width: 600, height: 40, zIndex: 3, editable: { content: true } },
      { id: 'dish', type: 'text', content: '番茄意面', fontFamily: { $t: 'fonts.hand' }, fontSize: 110, fontWeight: '700', color: { $t: 'colors.ink' }, textAlign: 'center', x: 140, y: 280, width: 800, height: 150, zIndex: 3, animation: { name: 'inkReveal', duration: 1100 }, editable: { content: true, position: true } },
      { id: 'wavy', type: 'shape', shapeKind: 'line', x: 380, y: 452, width: 320, height: 4, fill: { $t: 'colors.accent' }, zIndex: 3 },
      { id: 'wavy-second', type: 'shape', shapeKind: 'rect', x: 396, y: 466, width: 286, height: 3, fill: { $t: 'colors.ink' }, opacity: 0.35, rotation: 1.2, borderRadius: 2, zIndex: 3 },
      // —— 食材：左列菜名、右列分量，中间不用连线，眼睛自己会找 ——
      // 左列统一 x=150（与两个小标题同一条基准线），盒宽 520 够 12 字一行不折行；
      // 右列右边缘 930 与撕线对齐。行距 78 > 单行墨迹高 48，用户把菜名改长一点也不压下一行
      { id: 'ing-h', type: 'text', content: '食材', fontFamily: { $t: 'fonts.hand' }, fontSize: 50, fontWeight: '700', color: { $t: 'colors.ink' }, x: 150, y: 512, width: 300, height: 60, zIndex: 3, editable: { content: true } },
      { id: 'ing-meta', type: 'text', content: '2 人份 · 全程 15 分钟 · 难度 ★★☆', fontFamily: PENCIL, fontSize: 26, fontWeight: '700', color: { $t: 'colors.accent' }, opacity: 0.9, textAlign: 'right', x: 460, y: 528, width: 470, height: 40, zIndex: 3, editable: { content: true } },
      { id: 'ing-1a', type: 'text', content: '干意面（别买花纹太深的）', fontFamily: { $t: 'fonts.hand' }, fontSize: 40, fontWeight: '400', color: { $t: 'colors.ink' }, x: 150, y: 604, width: 520, height: 58, zIndex: 3, editable: { content: true } },
      { id: 'ing-1b', type: 'text', content: '160 g', fontFamily: { $t: 'fonts.hand' }, fontSize: 40, fontWeight: '700', color: { $t: 'colors.accent' }, textAlign: 'right', x: 770, y: 604, width: 160, height: 58, zIndex: 3, editable: { content: true } },
      { id: 'ing-2a', type: 'text', content: '放软了的番茄', fontFamily: { $t: 'fonts.hand' }, fontSize: 40, fontWeight: '400', color: { $t: 'colors.ink' }, x: 150, y: 682, width: 520, height: 58, zIndex: 3, editable: { content: true } },
      { id: 'ing-2b', type: 'text', content: '3 个', fontFamily: { $t: 'fonts.hand' }, fontSize: 40, fontWeight: '700', color: { $t: 'colors.accent' }, textAlign: 'right', x: 770, y: 682, width: 160, height: 58, zIndex: 3, editable: { content: true } },
      { id: 'ing-3a', type: 'text', content: '洋葱（会催泪那种）', fontFamily: { $t: 'fonts.hand' }, fontSize: 40, fontWeight: '400', color: { $t: 'colors.ink' }, x: 150, y: 760, width: 520, height: 58, zIndex: 3, editable: { content: true } },
      { id: 'ing-3b', type: 'text', content: '半个', fontFamily: { $t: 'fonts.hand' }, fontSize: 40, fontWeight: '700', color: { $t: 'colors.accent' }, textAlign: 'right', x: 770, y: 760, width: 160, height: 58, zIndex: 3, editable: { content: true } },
      { id: 'ing-4a', type: 'text', content: '橄榄油 · 盐 · 现磨黑胡椒', fontFamily: { $t: 'fonts.hand' }, fontSize: 40, fontWeight: '400', color: { $t: 'colors.ink' }, x: 150, y: 838, width: 520, height: 58, zIndex: 3, editable: { content: true } },
      { id: 'ing-4b', type: 'text', content: '各适量', fontFamily: { $t: 'fonts.hand' }, fontSize: 40, fontWeight: '700', color: { $t: 'colors.accent' }, textAlign: 'right', x: 770, y: 838, width: 160, height: 58, zIndex: 3, editable: { content: true } },
      // —— 一颗番茄：画得不好，但它是本卡主角 ——
      { id: 'illo-tomato', type: 'shape', shapeKind: 'circle', x: 844, y: 934, width: 92, height: 92, fill: { $t: 'colors.accent' }, opacity: 0.75, zIndex: 2 },
      { id: 'illo-tomato-stem', type: 'shape', shapeKind: 'rect', x: 884, y: 908, width: 10, height: 34, fill: { $t: 'colors.ink' }, opacity: 0.6, rotation: 14, borderRadius: 5, zIndex: 3 },
      // —— 做法：三步，多一步都不叫快手菜 ——
      { id: 'step-h', type: 'text', content: '做法', fontFamily: { $t: 'fonts.hand' }, fontSize: 50, fontWeight: '700', color: { $t: 'colors.ink' }, x: 150, y: 1058, width: 300, height: 60, zIndex: 3, editable: { content: true } },
      // 38→34：三步各自最长一行 767px 落进 790 盒宽（原 38px 时 858px 必然折行）；
      // 盒高 80→96 + 行距 108，就算用户改文案真折成两行也压不到下一条
      { id: 'step', type: 'text', content: '① 水开加大盐（像海水那么咸），面下锅 8 分钟。', fontFamily: { $t: 'fonts.hand' }, fontSize: 34, fontWeight: '400', color: { $t: 'colors.ink' }, lineHeight: 1.5, x: 150, y: 1116, width: 790, height: 96, zIndex: 3, animation: { name: 'fadeInUp', duration: 800, delay: 400 }, editable: { content: true } },
      { id: 'step-2', type: 'text', content: '② 番茄洋葱小火炒 6 分钟，炒到出沙、锅边发黏。', fontFamily: { $t: 'fonts.hand' }, fontSize: 34, fontWeight: '400', color: { $t: 'colors.ink' }, lineHeight: 1.5, x: 150, y: 1224, width: 790, height: 96, zIndex: 3, animation: { name: 'fadeInUp', duration: 800, delay: 560 }, editable: { content: true } },
      { id: 'step-3', type: 'text', content: '③ 面连汤舀进锅，翻拌 90 秒，起锅前磨黑胡椒。', fontFamily: { $t: 'fonts.hand' }, fontSize: 34, fontWeight: '400', color: { $t: 'colors.ink' }, lineHeight: 1.5, x: 150, y: 1332, width: 790, height: 96, zIndex: 3, animation: { name: 'fadeInUp', duration: 800, delay: 720 }, editable: { content: true } },
      // —— 小贴士 ——
      { id: 'tip-box', type: 'shape', shapeKind: 'rect', x: 150, y: 1440, width: 780, height: 190, border: { color: { $t: 'colors.accent' }, width: 2, style: 'dashed' }, borderRadius: 16, zIndex: 2 },
      { id: 'tip', type: 'text', content: '小贴士：最后加一勺面汤乳化，\n酱汁才会挂面而不是躺在锅底。', fontFamily: { $t: 'fonts.hand' }, fontSize: 34, fontWeight: '400', color: { $t: 'colors.accent' }, lineHeight: 1.6, x: 190, y: 1478, width: 560, height: 130, zIndex: 3, editable: { content: true } },
      { id: 'pot', type: 'image', src: SUN, objectFit: 'contain', x: 800, y: 1478, width: 106, height: 106, opacity: 0.8, zIndex: 3 },
      // —— 撕线：这一张要贴冰箱 ——
      ...keDashed('torn-edge', 150, 1680, 930, 1680, 3, 4, { $t: 'colors.ink' }, 0.35, 2),
      { id: 'footer', type: 'text', content: '沿虚线撕下 · 贴冰箱门左侧 · 厨房记录 NO.12', fontFamily: PENCIL, fontSize: 24, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.55, textAlign: 'center', x: 150, y: 1700, width: 780, height: 36, zIndex: 3, editable: { content: true } }
    ]
  },
  {
    id: 'handdrawn-crayon-kids', name: '蜡笔童趣涂鸦 (1:1)', version: '1.0.0', category: 'handdrawn', tags: ['handdrawn', 'crayon', 'kids', 'doodle', 'colorful', '1:1'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23e6f4ff"/><g stroke-width="4" stroke-linecap="round" opacity="0.95"><path d="M8 8 l10 6" stroke="%23fde047"/><path d="M28 12 l10 -6" stroke="%23fb923c"/><path d="M48 8 l10 6" stroke="%2322c55e"/><path d="M68 12 l10 -6" stroke="%23f472b6"/><path d="M86 8 l8 5" stroke="%231d4ed8"/></g><path d="M6 86 h88" stroke="%2386efac" stroke-width="12"/><path d="M14 80 v-8 M44 82 v-9 M84 80 v-8" stroke="%2322c55e" stroke-width="3" stroke-linecap="round"/><circle cx="78" cy="28" r="10" fill="%23fde047" stroke="%23f59e0b" stroke-width="2"/><g fill="none" stroke-width="3" stroke-linecap="round"><path d="M10 46 A14 14 0 0 1 38 46" stroke="%23ef4444"/><path d="M15 46 A9 9 0 0 1 33 46" stroke="%2322c55e"/></g><path d="M46 62 l12 -10 l12 10" fill="none" stroke="%23b45309" stroke-width="3" stroke-linejoin="round"/><rect x="50" y="62" width="16" height="16" fill="none" stroke="%23b45309" stroke-width="3"/><g stroke="%231d4ed8" stroke-width="3" stroke-linecap="round" fill="none"><circle cx="26" cy="60" r="5"/><path d="M26 65v10M20 70 l12 -3M26 75 l-5 8M26 75 l5 8"/></g><g stroke="%231d4ed8" stroke-width="4" stroke-linecap="round"><path d="M34 51 h30"/><path d="M38 56 h20" opacity="0.5"/></g><path d="M12 34 q6 -4 12 0" fill="none" stroke="%23ffffff" stroke-width="4" opacity="0.9"/></svg>',
    tokens: {
      colors: {
        bg: { label: '天空', default: '#E6F4FF', options: ['#E6F4FF', '#DCEFFE', '#EAF6FF', '#D6ECFB', '#FDE7F1', '#E4F7DA', '#EEE9FF'] },
        accent: { label: '标题', default: '#1D4ED8', options: ['#1D4ED8', '#DB2777', '#7C3AED', '#EA580C', '#059669'] }
      },
      fonts: { hand: { label: '手写字', default: '"Comic Sans MS", "Segoe Print", cursive', options: ['"Comic Sans MS", "Segoe Print", cursive', CN_HAND, EN_HAND] } }
    },
    presets: [
      { name: '晴空童趣', colors: { bg: '#E6F4FF', accent: '#1D4ED8' } },
      { name: '粉彩乐园', colors: { bg: '#FDE7F1', accent: '#DB2777' } },
      { name: '青草阳光', colors: { bg: '#E4F7DA', accent: '#059669' } },
      { name: '紫霞幻想', colors: { bg: '#EEE9FF', accent: '#7C3AED' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1080, defaultWidth: 1080, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      // —— 地平线：草地 + 冒出来的草叶 + 天空上乱涂的三道蜡笔 ——
      // 草地/草叶全部走 colors.accent（本模板只有天空 + 标题两个色 token），换预设时地面跟着走：
      // 晴空蓝笔→青蓝草地，青草阳光→绿草地，粉彩乐园→粉草地，正是小孩拿一支蜡笔涂天的效果
      { id: 'grass', type: 'shape', shapeKind: 'rect', x: 0, y: 880, width: 1080, height: 200, fill: { $t: 'colors.accent' }, opacity: 0.28, zIndex: 1, animation: { name: 'fadeIn', duration: 500 }},
      { id: 'grass-blade-1', type: 'shape', shapeKind: 'rect', x: 96, y: 838, width: 11, height: 52, fill: { $t: 'colors.accent' }, opacity: 0.9, rotation: -14, borderRadius: 6, zIndex: 2 },
      { id: 'grass-blade-2', type: 'shape', shapeKind: 'rect', x: 552, y: 842, width: 10, height: 46, fill: { $t: 'colors.accent' }, opacity: 0.85, rotation: 12, borderRadius: 5, zIndex: 2 },
      { id: 'sky-scribble-1', type: 'shape', shapeKind: 'rect', x: 48, y: 306, width: 372, height: 26, fill: { $t: 'colors.accent' }, opacity: 0.1, rotation: -2.4, borderRadius: 13, zIndex: 1 },
      { id: 'sky-scribble-2', type: 'shape', shapeKind: 'rect', x: 640, y: 556, width: 392, height: 22, fill: { $t: 'colors.accent' }, opacity: 0.08, rotation: 1.8, borderRadius: 11, zIndex: 1 },
      // —— 歪扭花边：一笔上一笔下，蜡笔没削过 ——
      // 七面小旗：奇数面 + 第 4 面走 colors.accent（深浅两档压出节奏），整串随预设换色。
      // 太阳黄 / 泡泡糖粉两面是彩旗“彩虹感”的下限，本模板只有天空 + 标题两个色 token，
      // 再映射就会退化成单色旗串 —— 故保留字面，但开 editable.color 色板让用户按预设手挑
      { id: 'garland-1', group: 'garland-', type: 'shape', shapeKind: 'rect', x: 60, y: 52, width: 152, height: 15, fill: { $t: 'colors.accent' }, opacity: 0.9, rotation: -32, borderRadius: 7, zIndex: 2 },
      { id: 'garland-2', group: 'garland-', type: 'shape', shapeKind: 'rect', x: 196, y: 26, width: 152, height: 15, fill: '#FDE047', opacity: 0.95, rotation: 32, borderRadius: 7, zIndex: 2, editable: { color: { type: 'palette', options: ['#FDE047', '#FB923C', '#F472B6', '#4ADE80', '#60A5FA', '#A78BFA'] } } },
      { id: 'garland-3', group: 'garland-', type: 'shape', shapeKind: 'rect', x: 332, y: 52, width: 152, height: 15, fill: { $t: 'colors.accent' }, opacity: 0.9, rotation: -32, borderRadius: 7, zIndex: 2 },
      { id: 'garland-4', group: 'garland-', type: 'shape', shapeKind: 'rect', x: 468, y: 26, width: 152, height: 15, fill: { $t: 'colors.accent' }, opacity: 0.55, rotation: 32, borderRadius: 7, zIndex: 2 },
      { id: 'garland-5', group: 'garland-', type: 'shape', shapeKind: 'rect', x: 604, y: 52, width: 152, height: 15, fill: { $t: 'colors.accent' }, opacity: 0.9, rotation: -32, borderRadius: 7, zIndex: 2 },
      { id: 'garland-6', group: 'garland-', type: 'shape', shapeKind: 'rect', x: 740, y: 26, width: 152, height: 15, fill: '#F472B6', opacity: 0.95, rotation: 32, borderRadius: 7, zIndex: 2, editable: { color: { type: 'palette', options: ['#F472B6', '#FB923C', '#FDE047', '#4ADE80', '#60A5FA', '#A78BFA'] } } },
      { id: 'garland-7', group: 'garland-', type: 'shape', shapeKind: 'rect', x: 876, y: 52, width: 152, height: 15, fill: { $t: 'colors.accent' }, opacity: 0.9, rotation: -32, borderRadius: 7, zIndex: 2 },
      // —— 远景：太阳、彩虹、云、星星 ——
      { id: 'sun', type: 'image', src: SUN, objectFit: 'contain', x: 790, y: 70, width: 220, height: 220, zIndex: 2, animation: { name: 'spinSlow', duration: 40000, iterationCount: 'infinite', easing: 'linear' }, editable: { position: true, size: { type: 'scale' } } },
      { id: 'rainbow', type: 'image', src: RAINBOW, objectFit: 'contain', x: 80, y: 120, width: 340, height: 200, zIndex: 2, animation: { name: 'zoomIn', duration: 700, delay: 250 }, editable: { position: true, size: { type: 'scale' } } },
      { id: 'cloud-a', type: 'image', src: CLOUD, objectFit: 'contain', x: 430, y: 150, width: 190, height: 130, zIndex: 2, animation: { name: 'drift', duration: 14000, iterationCount: 'infinite', easing: 'ease-in-out' }, editable: { position: true, size: { type: 'scale' } } },
      { id: 'star', group: 'star', type: 'image', src: STAR, objectFit: 'contain', x: 686, y: 214, width: 84, height: 84, rotation: -14, zIndex: 2, animation: { name: 'twinkle', duration: 3000, iterationCount: 'infinite' } },
      // —— 近景：房子、树、花 ——
      { id: 'house', type: 'image', src: HOUSE, objectFit: 'contain', x: 380, y: 640, width: 300, height: 280, zIndex: 3, animation: { name: 'fadeInUp', duration: 600, delay: 420 }, editable: { position: true, size: { type: 'scale' } } },
      { id: 'tree', type: 'image', src: LEAF, objectFit: 'contain', x: 44, y: 620, width: 150, height: 260, zIndex: 3, animation: { name: 'fadeInUp', duration: 600, delay: 560 }, editable: { position: true, size: { type: 'scale' } } },
      { id: 'flower', type: 'image', src: HEART, objectFit: 'contain', x: 892, y: 782, width: 104, height: 96, rotation: 12, zIndex: 3, animation: { name: 'swing', duration: 3000, iterationCount: 'infinite', easing: 'ease-in-out' }, editable: { position: true, size: { type: 'scale' } } },
      // —— 火柴人：头、身子、张开的手臂、两条叉开的腿 ——
      { id: 'kid-head', type: 'shape', shapeKind: 'circle', x: 710, y: 686, width: 64, height: 64, border: { color: { $t: 'colors.accent' }, width: 8, style: 'solid' }, opacity: 0.95, zIndex: 3 },
      { id: 'kid-body', type: 'shape', shapeKind: 'rect', x: 737, y: 750, width: 9, height: 96, fill: { $t: 'colors.accent' }, opacity: 0.95, rotation: 1.5, borderRadius: 5, zIndex: 3 },
      { id: 'kid-arms', type: 'shape', shapeKind: 'rect', x: 692, y: 786, width: 100, height: 9, fill: { $t: 'colors.accent' }, opacity: 0.95, rotation: -14, borderRadius: 5, zIndex: 3 },
      { id: 'kid-leg-l', type: 'shape', shapeKind: 'rect', x: 704, y: 844, width: 9, height: 88, fill: { $t: 'colors.accent' }, opacity: 0.95, rotation: 22, borderRadius: 5, zIndex: 3 },
      { id: 'kid-leg-r', type: 'shape', shapeKind: 'rect', x: 758, y: 844, width: 9, height: 88, fill: { $t: 'colors.accent' }, opacity: 0.95, rotation: -22, borderRadius: 5, zIndex: 3 },
      // —— 标题：蜡笔写一遍压不住色，所以画了两遍 ——
      { id: 'title', type: 'text', content: '我们的小世界', fontFamily: { $t: 'fonts.hand' }, fontSize: 96, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 4, textAlign: 'center', x: 120, y: 360, width: 840, height: 130, zIndex: 4, animation: { name: 'bounce', duration: 2600, iterationCount: 'infinite' }, editable: { content: true, fontSize: { type: 'range', min: 62, max: 124 }, position: true } },
      ...keStroke2('title-crayon', 300, 502, 480, 16, { $t: 'colors.accent' }, 0.85, 4),
      { id: 'sub', type: 'text', content: '· 用蜡笔画下今天的心情 ·', fontFamily: { $t: 'fonts.hand' }, fontSize: 40, fontWeight: '400', color: { $t: 'colors.accent' }, opacity: 0.8, textAlign: 'center', x: 240, y: 556, width: 600, height: 60, zIndex: 4, animation: { name: 'fadeIn', duration: 600, delay: 900 }, editable: { content: true } },
      // —— 小作者的落款与旁白 ——
      { id: 'kid-sign', type: 'text', content: 'MADE BY ME, AGE 6 1/2', fontFamily: PENCIL, fontSize: 30, fontWeight: '700', color: { $t: 'colors.accent' }, opacity: 0.85, letterSpacing: 2, rotation: -3, x: 96, y: 964, width: 440, height: 44, zIndex: 4, editable: { content: true } },
      { id: 'kid-note', type: 'text', content: '今天去了公园\n冰淇淋掉了一口，被妈妈吃了', fontFamily: { $t: 'fonts.hand' }, fontSize: 34, fontWeight: '400', color: { $t: 'colors.accent' }, opacity: 0.9, lineHeight: 1.45, textAlign: 'right', rotation: 2, x: 520, y: 940, width: 470, height: 100, zIndex: 4, editable: { content: true } }
    ]
  },
  {
    id: 'handdrawn-coffee-notes', name: '咖啡渍草稿纸 (4:5)', version: '1.0.0', category: 'handdrawn', tags: ['handdrawn', 'notes', 'coffee', 'paper', '4:5'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="125" viewBox="0 0 100 125"><rect width="100" height="125" fill="%23f4f4f0"/><g stroke="%23334155" stroke-width="0.6" opacity="0.07"><path d="M4 62h92M4 98h92"/></g><circle cx="74" cy="26" r="14" fill="none" stroke="%23a16207" stroke-width="4" opacity="0.4"/><circle cx="78" cy="42" r="8" fill="none" stroke="%23854d0e" stroke-width="1.5" opacity="0.3"/><circle cx="20" cy="106" r="11" fill="none" stroke="%23a16207" stroke-width="3.5" opacity="0.3"/><path d="M10 40 h52 v9 h-52z" fill="%23b45309" opacity="0.18"/><g stroke="%23334155" stroke-width="1.6" opacity="0.35"><ellipse cx="18" cy="30" rx="11" ry="6" transform="rotate(-8 18 30)" fill="none"/></g><rect x="12" y="9" width="4" height="12" rx="2" fill="none" stroke="%2394a3b8" stroke-width="1.6" transform="rotate(-12 14 15)"/><path d="M8 52 h84" stroke="%23b45309" stroke-width="1.6" opacity="0.8"/><g fill="%23334155"><rect x="18" y="58" width="52" height="5"/><rect x="18" y="68" width="62" height="5"/><rect x="18" y="78" width="56" height="5"/></g><g fill="none" stroke="%23334155" stroke-width="1.4" opacity="0.8"><rect x="9" y="57" width="6" height="6" rx="1.5"/><rect x="9" y="67" width="6" height="6" rx="1.5"/><rect x="9" y="77" width="6" height="6" rx="1.5"/></g><path d="M10 59 l3 3 l5 -6" stroke="%2316a34a" stroke-width="1.6" fill="none"/><rect x="18" y="88" width="42" height="4" fill="%2394a3b8" opacity="0.6"/><path d="M20 92 h38" stroke="%23b45309" stroke-width="1.4" opacity="0.8"/><path d="M18 86 h40" stroke="%23b45309" stroke-width="1" opacity="0.4"/><path d="M62 84 h26 v18 h-18 l-6 8 v-8 h-2z" fill="%23ffffff" stroke="%23334155" stroke-width="1.2"/><rect x="66" y="104" width="26" height="16" fill="%23b45309" opacity="0.2" transform="rotate(4 79 112)"/><path d="M6 118 h30" stroke="%23334155" stroke-width="1.4" opacity="0.35"/></svg>',
    tokens: {
      colors: {
        bg: { label: '纸色', default: '#F4F4F0', options: ['#F4F4F0', '#FBFAF6', '#F1EFE9', '#FFFDF7', '#F1F7F2', '#F0F4F8'] },
        ink: { label: '笔色', default: '#334155', options: ['#334155', '#1E293B', '#44403C', '#4B5563', '#1F2937'] },
        accent: { label: '强调', default: '#B45309', options: ['#B45309', '#DC2626', '#4F46E5', '#0891B2', '#15803D'] }
      },
      fonts: { hand: { label: '手写字', default: EN_HAND, options: [EN_HAND, CN_HAND, 'STKaiti, KaiTi, serif'] } }
    },
    presets: [
      { name: '拿铁草稿', colors: { bg: '#F4F4F0', ink: '#334155', accent: '#B45309' } },
      { name: '黑咖高对比', colors: { bg: '#FBFAF6', ink: '#1E293B', accent: '#DC2626' } },
      { name: '冷萃青柠', colors: { bg: '#F1F7F2', ink: '#1F2937', accent: '#15803D' } },
      { name: '海盐蓝调', colors: { bg: '#F0F4F8', ink: '#334155', accent: '#0891B2' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' }, backgroundImage: flecks(1080, 1350, 110, 'rgba(80,70,50,0.05)') },
    elements: [
      // —— 纸与渍：杯印不止一个，第二个压在页脚 ——
      { id: 'paper-fiber-1', type: 'shape', shapeKind: 'rect', x: 40, y: 640, width: 1000, height: 2, fill: { $t: 'colors.ink' }, opacity: 0.05, rotation: -0.4, zIndex: 1 },
      { id: 'paper-fiber-2', type: 'shape', shapeKind: 'rect', x: 40, y: 1024, width: 1000, height: 2, fill: { $t: 'colors.ink' }, opacity: 0.05, rotation: 0.5, zIndex: 1 },
      { id: 'coffee', type: 'image', src: COFFEE, objectFit: 'contain', x: 760, y: 90, width: 260, height: 260, zIndex: 1 },
      { id: 'coffee-ring-side', type: 'shape', shapeKind: 'circle', x: 862, y: 404, width: 158, height: 152, border: { color: '#A16207', width: 10, style: 'solid' }, opacity: 0.14, rotation: -6, zIndex: 1 },
      { id: 'coffee-ring-foot', type: 'shape', shapeKind: 'circle', x: 56, y: 1072, width: 216, height: 206, border: { color: '#854D0E', width: 16, style: 'solid' }, opacity: 0.13, rotation: 8, zIndex: 1 },
      { id: 'paperclip', type: 'image', src: PAPERCLIP, objectFit: 'contain', x: 90, y: 70, width: 60, height: 150, rotation: -12, zIndex: 5 },
      // —— 标题：荧光笔拖过第二行，圈出第一句 ——
      { id: 'meta', type: 'text', content: 'Tue 9/15 · 美式 No.2 · 已经凉了', fontFamily: PENCIL, fontSize: 24, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.55, letterSpacing: 2, x: 200, y: 170, width: 640, height: 36, zIndex: 3, editable: { content: true } },
      { id: 'headline-hl', type: 'shape', shapeKind: 'rect', x: 88, y: 356, width: 648, height: 84, fill: { $t: 'colors.accent' }, opacity: 0.2, rotation: -0.8, borderRadius: 8, zIndex: 1 },
      { id: 'headline', type: 'text', content: '关于产品，\n我想清楚的三件事', fontFamily: { $t: 'fonts.hand' }, fontSize: 74, fontWeight: '700', color: { $t: 'colors.ink' }, lineHeight: 1.28, x: 90, y: 250, width: 900, height: 220, zIndex: 3, animation: { name: 'inkReveal', duration: 1100 }, editable: { content: true, position: true } },
      { id: 'ring-a', type: 'shape', shapeKind: 'circle', x: 78, y: 244, width: 220, height: 120, border: { color: { $t: 'colors.accent' }, width: 4, style: 'solid' }, rotation: -8, opacity: 0.75, zIndex: 2, animation: { name: 'wobble', duration: 3400, iterationCount: 'infinite' } },
      { id: 'ring-a-second', type: 'shape', shapeKind: 'circle', x: 68, y: 236, width: 242, height: 138, border: { color: { $t: 'colors.accent' }, width: 3, style: 'solid' }, rotation: -12, opacity: 0.4, zIndex: 2 },
      { id: 'divider', type: 'shape', shapeKind: 'line', x: 90, y: 520, width: 900, height: 3, fill: { $t: 'colors.accent' }, opacity: 0.7, zIndex: 3, animation: { name: 'slideInLeft', duration: 700, delay: 400 } },
      // —— 三条想明白的 + 一条划掉的 ——
      { id: 'box1', group: 'box', type: 'shape', shapeKind: 'rect', x: 96, y: 578, width: 46, height: 46, border: { color: { $t: 'colors.ink' }, width: 3, style: 'solid' }, borderRadius: 10, opacity: 0.8, zIndex: 3 },
      { id: 'box2', group: 'box', type: 'shape', shapeKind: 'rect', x: 96, y: 678, width: 46, height: 46, border: { color: { $t: 'colors.ink' }, width: 3, style: 'solid' }, borderRadius: 10, opacity: 0.8, zIndex: 3 },
      { id: 'box3', group: 'box', type: 'shape', shapeKind: 'rect', x: 96, y: 778, width: 46, height: 46, border: { color: { $t: 'colors.ink' }, width: 3, style: 'solid' }, borderRadius: 10, opacity: 0.5, zIndex: 3 },
      { id: 'check1', type: 'image', src: CHECK, objectFit: 'contain', x: 88, y: 570, width: 62, height: 62, zIndex: 4, animation: { name: 'zoomIn', duration: 400, delay: 600 } },
      { id: 'item1', type: 'text', content: '① 少即是多：先解决一个真问题。', fontFamily: { $t: 'fonts.hand' }, fontSize: 44, fontWeight: '400', color: { $t: 'colors.ink' }, x: 170, y: 580, width: 800, height: 60, zIndex: 3, animation: { name: 'slideInLeft', duration: 600, delay: 500 }, editable: { content: true } },
      { id: 'item2', type: 'text', content: '② 慢即是快：别为速度牺牲方向。', fontFamily: { $t: 'fonts.hand' }, fontSize: 44, fontWeight: '400', color: { $t: 'colors.ink' }, x: 170, y: 680, width: 800, height: 60, zIndex: 3, animation: { name: 'slideInLeft', duration: 600, delay: 700 }, editable: { content: true } },
      { id: 'item3', type: 'text', content: '③ 用户不是数据，是一个个具体的人。', fontFamily: { $t: 'fonts.hand' }, fontSize: 44, fontWeight: '400', color: { $t: 'colors.ink' }, x: 170, y: 780, width: 800, height: 60, zIndex: 3, animation: { name: 'slideInLeft', duration: 600, delay: 900 }, editable: { content: true } },
      ...keStroke2('item3-wave', 176, 850, 520, 8, { $t: 'colors.accent' }, 0.7, 3),
      { id: 'item4', type: 'text', content: '④ 先把社区功能做起来', fontFamily: { $t: 'fonts.hand' }, fontSize: 40, fontWeight: '400', color: { $t: 'colors.ink' }, opacity: 0.55, x: 170, y: 890, width: 470, height: 56, zIndex: 3, editable: { content: true } },
      { id: 'item4-strike', type: 'shape', shapeKind: 'rect', x: 164, y: 918, width: 470, height: 5, fill: { $t: 'colors.accent' }, opacity: 0.9, rotation: -1.6, borderRadius: 3, zIndex: 4 },
      // —— 页边：气泡批注 + 一张贴歪的便签 ——
      { id: 'margin-arrow', type: 'image', src: CURVED_ARROW, objectFit: 'contain', x: 572, y: 898, width: 130, height: 108, rotation: -12, zIndex: 4 },
      { id: 'bubble', type: 'image', src: BUBBLE, objectFit: 'contain', x: 650, y: 876, width: 260, height: 195, zIndex: 5, animation: { name: 'fadeInUp', duration: 600, delay: 800 } },
      // 气泡盒 200→260：「这条最重要」5 字 × 40px = 200px 墨迹，旧盒宽 156 必折两行探出盒底 35px
      { id: 'bubble-text', type: 'text', content: '这条最重要', fontFamily: { $t: 'fonts.hand' }, fontSize: 40, fontWeight: '700', color: { $t: 'colors.ink' }, textAlign: 'center', x: 678, y: 932, width: 204, height: 56, zIndex: 6, editable: { content: true } },
      { id: 'sticky', type: 'shape', shapeKind: 'rect', x: 678, y: 1090, width: 314, height: 214, fill: { $t: 'colors.accent' }, opacity: 0.16, rotation: 4, borderRadius: 6, shadow: { color: 'rgba(0,0,0,0.10)', blur: 14, offsetX: 0, offsetY: 6 }, zIndex: 2 },
      // 便签 250×190 → 314×214：两行文案各 240 / 275px，旧盒宽 212 把四行墨迹顶到 footer 上
      { id: 'sticky-text', type: 'text', content: '下周只做这一件：\n把 ① 写成能验收的话', fontFamily: { $t: 'fonts.hand' }, fontSize: 30, fontWeight: '400', color: { $t: 'colors.ink' }, lineHeight: 1.45, rotation: 4, x: 694, y: 1116, width: 282, height: 154, zIndex: 3, editable: { content: true } },
      { id: 'star', group: 'star', type: 'image', src: STAR, objectFit: 'contain', x: 400, y: 1160, width: 84, height: 84, rotation: 10, zIndex: 4, animation: { name: 'twinkle', duration: 2800, iterationCount: 'infinite' } },
      { id: 'footer', type: 'text', content: '— scribbled between two coffees · p.14 —', fontFamily: PENCIL, fontSize: 26, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.5, textAlign: 'center', x: 90, y: 1264, width: 900, height: 40, zIndex: 3, editable: { content: true } }
    ]
  },
  {
    id: 'handdrawn-postcard', name: '旅行明信片 (16:9)', version: '1.0.0', category: 'handdrawn', tags: ['handdrawn', 'postcard', 'travel', 'vintage', '16:9'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="178" height="100" viewBox="0 0 178 100"><rect width="178" height="100" fill="%23f3ecd9"/><rect x="10" y="12" width="158" height="76" rx="4" fill="%23fffdf6" stroke="%2378350f" stroke-width="1.5" stroke-dasharray="4 3"/><rect x="132" y="20" width="24" height="30" fill="%23fef9c3" stroke="%23b45309"/><path d="M20 60 h60 M20 68 h44" stroke="%2394a3b8" stroke-width="2"/></svg>',
    tokens: {
      colors: {
        bg: { label: '背景', default: '#F3ECD9', options: ['#F3ECD9', '#EAF0E2', '#F0E6E6', '#E7EEF5'] },
        paper: { label: '卡面', default: '#FFFDF6', options: ['#FFFDF6', '#FFFFFF', '#FFFBF0'] },
        ink: { label: '笔色', default: '#57534E', options: ['#57534E', '#44403C', '#334155', '#3F4E3A'] },
        accent: { label: '邮戳', default: '#B45309', options: ['#B45309', '#1D4ED8', '#BE123C', '#047857'] }
      },
      fonts: { hand: { label: '手写字', default: EN_HAND, options: [EN_HAND, CN_HAND, 'STKaiti, KaiTi, serif'] } }
    },
    presets: [
      { name: '旧海报', colors: { bg: '#F3ECD9', paper: '#FFFDF6', ink: '#57534E', accent: '#B45309' } },
      { name: '海岸蓝调', colors: { bg: '#E7EEF5', paper: '#FFFFFF', ink: '#334155', accent: '#1D4ED8' } },
      { name: '森林漫步', colors: { bg: '#EAF0E2', paper: '#FFFDF6', ink: '#3F4E3A', accent: '#047857' } },
      { name: '玫瑰旧旅', colors: { bg: '#F0E6E6', paper: '#FFFBF0', ink: '#57534E', accent: '#BE123C' } }
    ],
    canvas: { virtualWidth: 1920, virtualHeight: 1080, defaultWidth: 1920, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'card', type: 'shape', shapeKind: 'rect', x: 120, y: 100, width: 1680, height: 880, fill: { $t: 'colors.paper' }, border: { color: { $t: 'colors.ink' }, width: 3, style: 'dashed' }, borderRadius: 12, shadow: { color: 'rgba(0,0,0,0.15)', blur: 26, offsetX: 0, offsetY: 12 }, zIndex: 1 },
      { id: 'mid', type: 'shape', shapeKind: 'rect', x: 960, y: 160, width: 3, height: 760, fill: { $t: 'colors.ink' }, opacity: 0.35, zIndex: 2 },
      { id: 'stamp', type: 'image', src: STAMP, objectFit: 'contain', x: 1600, y: 160, width: 150, height: 172, rotation: 4, zIndex: 4 },
      { id: 'postmark', type: 'shape', shapeKind: 'circle', x: 1560, y: 190, width: 190, height: 190, border: { color: { $t: 'colors.accent' }, width: 3, style: 'solid' }, opacity: 0.4, rotation: -10, zIndex: 5 },
      { id: 'greeting', type: 'text', content: 'Greetings from', fontFamily: { $t: 'fonts.hand' }, fontSize: 46, fontWeight: '400', color: { $t: 'colors.ink' }, x: 220, y: 190, width: 640, height: 70, zIndex: 3, editable: { content: true } },
      { id: 'place', type: 'text', content: '大理 · 洱海边', fontFamily: { $t: 'fonts.hand' }, fontSize: 120, fontWeight: '700', color: { $t: 'colors.accent' }, x: 220, y: 260, width: 720, height: 160, zIndex: 3, animation: { name: 'inkReveal', duration: 1200 }, editable: { content: true, position: true } },
      { id: 'globe', type: 'image', src: GLOBE, objectFit: 'contain', x: 300, y: 560, width: 220, height: 220, opacity: 0.85, zIndex: 3, animation: { name: 'spinSlow', duration: 60000, iterationCount: 'infinite', easing: 'linear' } },
      { id: 'msg', type: 'text', content: '这里的风很软，阳光很慢，\n我把思念写进这片海蓝色里。\n你什么时候来？', fontFamily: { $t: 'fonts.hand' }, fontSize: 40, fontWeight: '400', color: { $t: 'colors.ink' }, lineHeight: 1.7, x: 220, y: 470, width: 700, height: 200, zIndex: 3, animation: { name: 'fadeIn', duration: 900, delay: 500 }, editable: { content: true } },
      { id: 'addr-line1', group: 'addr-line', type: 'shape', shapeKind: 'line', x: 1040, y: 460, width: 700, height: 2, fill: { $t: 'colors.ink' }, opacity: 0.3, zIndex: 3 },
      { id: 'addr-line2', group: 'addr-line', type: 'shape', shapeKind: 'line', x: 1040, y: 560, width: 700, height: 2, fill: { $t: 'colors.ink' }, opacity: 0.3, zIndex: 3 },
      { id: 'addr-line3', group: 'addr-line', type: 'shape', shapeKind: 'line', x: 1040, y: 660, width: 700, height: 2, fill: { $t: 'colors.ink' }, opacity: 0.3, zIndex: 3 },
      { id: 'addr-label', type: 'text', content: 'TO:', fontFamily: PENCIL, fontSize: 30, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.55, x: 1040, y: 360, width: 200, height: 40, zIndex: 3, editable: { content: true } },
      { id: 'tape', group: 'tape', type: 'image', src: CLOUD, objectFit: 'contain', x: 60, y: 60, width: 180, height: 110, rotation: -20, zIndex: 6 }
    ]
  },
  {
    id: 'handdrawn-botanical', name: '植物标本手账 (3:4)', version: '1.0.0', category: 'handdrawn', tags: ['handdrawn', 'botanical', 'journal', 'plant', '3:4'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="133" viewBox="0 0 108 144"><rect width="108" height="144" fill="%23f2ede0"/><rect x="9" y="9" width="90" height="126" fill="none" stroke="%2344403c" stroke-width="1.6"/><rect x="12" y="12" width="84" height="120" fill="none" stroke="%2344403c" stroke-width="0.8" stroke-dasharray="3 2" opacity="0.55"/><g stroke="%2344403c" stroke-width="0.7" opacity="0.16"><line x1="15" y1="47" x2="93" y2="46"/><line x1="15" y1="60" x2="93" y2="61"/><line x1="15" y1="73" x2="93" y2="72"/></g><rect x="46" y="4" width="16" height="6" fill="%23fde68a" opacity="0.85" transform="rotate(-2 54 7)"/><text x="54" y="27" font-size="8" text-anchor="middle" fill="%2344403c" font-family="cursive">Herbarium</text><g fill="none" stroke="%2315803d" stroke-width="1.4" stroke-linecap="round"><path d="M24 40 C24 55,24 62,24 68"/><path d="M54 36 C54 52,54 62,54 72"/><path d="M86 42 C86 55,86 62,86 67"/></g><g fill="%234ade80" stroke="%2315803d" stroke-width="0.8"><ellipse cx="19" cy="48" rx="5" ry="2.4" transform="rotate(-30 19 48)"/><ellipse cx="29" cy="55" rx="5" ry="2.4" transform="rotate(30 29 55)"/><ellipse cx="48" cy="46" rx="5.5" ry="2.6" transform="rotate(-28 48 46)"/><ellipse cx="60" cy="55" rx="5.5" ry="2.6" transform="rotate(28 60 55)"/><ellipse cx="81" cy="50" rx="5" ry="2.4" transform="rotate(-30 81 50)"/><ellipse cx="91" cy="57" rx="5" ry="2.4" transform="rotate(30 91 57)"/></g><g stroke="%23f2ede0" stroke-width="2.6" opacity="0.95"><line x1="77" y1="55" x2="95" y2="50"/><line x1="77" y1="50" x2="95" y2="55"/></g><g stroke="%2344403c" stroke-width="0.7" opacity="0.6"><line x1="25" y1="75" x2="31" y2="65"/><line x1="85" y1="75" x2="89" y2="67"/></g><g fill="none" stroke="%2315803d" stroke-width="1"><line x1="15" y1="79" x2="30" y2="79"/><line x1="72" y1="79" x2="90" y2="79"/></g><line x1="36" y1="112" x2="72" y2="112" stroke="%2315803d" stroke-width="1" opacity="0.6"/><rect x="15" y="115" width="34" height="17" fill="%23f2ede0" stroke="%2344403c" stroke-width="1"/><text x="18" y="122" font-size="5.5" fill="%2315803d" font-family="monospace">NO.07</text><g fill="none" stroke="%2344403c" stroke-width="0.8" opacity="0.7"><line x1="18" y1="126" x2="45" y2="126"/><line x1="18" y1="129" x2="38" y2="129"/></g><g fill="none" stroke="%2344403c" stroke-width="0.8" opacity="0.5"><line x1="62" y1="119" x2="93" y2="119"/><line x1="74" y1="124" x2="93" y2="124"/></g><line x1="74" y1="131" x2="90" y2="131" stroke="%2344403c" stroke-width="1.6" opacity="0.55"/><g fill="%2344403c"><circle cx="46" cy="78" r="1.2" opacity="0.3"/><circle cx="57" cy="81" r="0.8" opacity="0.24"/><circle cx="63" cy="76" r="1" opacity="0.2"/></g></svg>',
    tokens: {
      colors: {
        bg: { label: '纸色', default: '#F2EDE0', options: ['#F2EDE0', '#EFF3E8', '#F5EFE2', '#EAF0E4'] },
        ink: { label: '笔色', default: '#44403C', options: ['#44403C', '#57534E', '#3F4E3A'] },
        accent: { label: '植物', default: '#15803D', options: ['#15803D', '#0F766E', '#4D7C0F', '#B45309'] }
      },
      fonts: { hand: { label: '手写体', default: EN_HAND, options: [EN_HAND, CN_HAND, 'Georgia, serif'] } }
    },
    presets: [
      { name: '苔绿标本', colors: { bg: '#F2EDE0', ink: '#44403C', accent: '#15803D' } },
      { name: '青瓷草木', colors: { bg: '#EAF0E4', ink: '#3F4E3A', accent: '#0F766E' } },
      { name: '枯叶棕调', colors: { bg: '#F5EFE2', ink: '#57534E', accent: '#B45309' } },
      { name: '稻田青黄', colors: { bg: '#EFF3E8', ink: '#44403C', accent: '#4D7C0F' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1440, defaultWidth: 1080, defaultHeight: 1440, backgroundColor: { $t: 'colors.bg' }, backgroundImage: flecks(1080, 1440, 120, 'rgba(90,80,50,0.06)') },
    elements: [
      { id: 'sheet', type: 'shape', shapeKind: 'rect', x: 90, y: 90, width: 900, height: 1260, border: { color: { $t: 'colors.ink' }, width: 2, style: 'solid' }, opacity: 0.75, zIndex: 1 },
      { id: 'sheet-inner', type: 'shape', shapeKind: 'rect', x: 118, y: 118, width: 844, height: 1204, border: { color: { $t: 'colors.ink' }, width: 1.5, style: 'dashed' }, opacity: 0.32, zIndex: 1 },
      // 标本台的淡淡的定位格：手画的，每条歪一点点
      ...keRows('grid-h', 3, 150, 470, 130, 780, 2, { $t: 'colors.ink' }, 0.1, 1),
      { id: 'corner', type: 'image', src: TAPE, objectFit: 'contain', x: 460, y: 60, width: 160, height: 60, zIndex: 6 },
      { id: 'title', type: 'text', content: 'Herbarium', fontFamily: { $t: 'fonts.hand' }, fontSize: 92, fontWeight: '700', color: { $t: 'colors.ink' }, textAlign: 'center', x: 140, y: 150, width: 800, height: 120, zIndex: 3, animation: { name: 'fadeIn', duration: 800 }, editable: { content: true } },
      { id: 'sub', type: 'text', content: '标 本 笔 记 · 第 07 页', fontFamily: { $t: 'fonts.hand' }, fontSize: 34, fontWeight: '400', color: { $t: 'colors.accent' }, letterSpacing: 6, textAlign: 'center', x: 240, y: 268, width: 600, height: 44, zIndex: 3, editable: { content: true } },
      { id: 'leaf-l', type: 'image', src: LEAF, objectFit: 'contain', x: 150, y: 400, width: 180, height: 300, rotation: -12, zIndex: 3, animation: { name: 'swing', duration: 5000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'leaf-c', type: 'image', src: LEAF, objectFit: 'contain', x: 440, y: 350, width: 210, height: 370, rotation: -3, zIndex: 3, animation: { name: 'swing', duration: 6200, delay: 800, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'leaf-r', type: 'image', src: LEAF, objectFit: 'contain', x: 780, y: 420, width: 160, height: 280, rotation: 14, zIndex: 3, animation: { name: 'swing', duration: 5600, delay: 400, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'mount-line1', type: 'shape', shapeKind: 'rect', x: 360, y: 470, width: 4, height: 240, fill: { $t: 'colors.ink' }, opacity: 0.4, zIndex: 2 },
      { id: 'mount-line2', type: 'shape', shapeKind: 'rect', x: 720, y: 470, width: 4, height: 240, fill: { $t: 'colors.ink' }, opacity: 0.4, zIndex: 2 },
      // 压纸条：十字交叉压在右侧标本上（纸色贴住绿色叶面才看得出是"贴"）
      keLineTo('mount-x-1', 772, 552, 950, 500, { $t: 'colors.bg' }, 20, 0.92, 5),
      keLineTo('mount-x-2', 772, 500, 950, 552, { $t: 'colors.bg' }, 20, 0.92, 5),
      // 植物学标注引出线 + 拉丁名
      keLineTo('lead-1', 252, 750, 306, 650, { $t: 'colors.ink' }, 2, 0.5, 4),
      { id: 'lead-1-text', type: 'text', content: 'Folium oppositum · 叶对生', fontFamily: { $t: 'fonts.hand' }, fontSize: 26, fontWeight: '400', color: { $t: 'colors.accent' }, x: 140, y: 752, width: 360, height: 40, zIndex: 4, editable: { content: true } },
      keLineTo('lead-2', 846, 752, 884, 664, { $t: 'colors.ink' }, 2, 0.5, 4),
      { id: 'lead-2-text', type: 'text', content: 'Capitulum · 头状花序，已谢', fontFamily: { $t: 'fonts.hand' }, fontSize: 26, fontWeight: '400', color: { $t: 'colors.accent' }, textAlign: 'right', x: 476, y: 752, width: 370, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'spec-h', type: 'text', content: '· 科属：菊科 / Asteraceae ·', fontFamily: { $t: 'fonts.hand' }, fontSize: 34, fontWeight: '400', color: { $t: 'colors.ink' }, textAlign: 'center', x: 190, y: 820, width: 700, height: 50, zIndex: 3, editable: { content: true } },
      { id: 'note', type: 'text', content: '采于山谷溪畔，喜半阴湿土。\n叶对生，边缘具锯齿，秋开小花。', fontFamily: { $t: 'fonts.hand' }, fontSize: 34, fontWeight: '400', color: { $t: 'colors.ink' }, lineHeight: 1.7, textAlign: 'center', x: 190, y: 900, width: 700, height: 160, zIndex: 3, animation: { name: 'fadeIn', duration: 900, delay: 400 }, editable: { content: true } },
      { id: 'rule', type: 'shape', shapeKind: 'line', x: 360, y: 1120, width: 360, height: 2, fill: { $t: 'colors.accent' }, opacity: 0.6, zIndex: 3 },
      // 标本角标签
      { id: 'label-card', type: 'shape', shapeKind: 'rect', x: 150, y: 1155, width: 340, height: 165, fill: { $t: 'colors.bg' }, border: { color: { $t: 'colors.ink' }, width: 2, style: 'solid' }, opacity: 0.95, rotation: -1.5, zIndex: 3 },
      { id: 'label-no', type: 'text', content: 'NO.07', fontFamily: PENCIL, fontSize: 42, fontWeight: '700', color: { $t: 'colors.accent' }, x: 174, y: 1174, width: 290, height: 52, zIndex: 4 },
      { id: 'label-name', type: 'text', content: 'Asteraceae sp.\n压干 14 天 · 换纸 3 次', fontFamily: { $t: 'fonts.hand' }, fontSize: 26, fontWeight: '400', color: { $t: 'colors.ink' }, lineHeight: 1.5, x: 174, y: 1230, width: 300, height: 82, zIndex: 4, editable: { content: true } },
      { id: 'latin', type: 'text', content: 'Coll. 2026.09.14 · 海拔 1200 m', fontFamily: 'Georgia, serif', fontSize: 26, fontWeight: '400', color: { $t: 'colors.ink' }, opacity: 0.6, textAlign: 'right', x: 540, y: 1170, width: 400, height: 50, zIndex: 3, editable: { content: true } },
      { id: 'scale-text', type: 'text', content: '5 cm', fontFamily: PENCIL, fontSize: 20, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.55, x: 700, y: 1240, width: 140, height: 32, zIndex: 3 },
      keBar('scale-bar', 700, 1284, 140, 5, { $t: 'colors.ink' }, 0.5, 3),
      // 掉在台纸上的墨点
      ...keScatter('ink-dot', 20260914, 430, 748, 660, 796, 2, 4, 9, { $t: 'colors.ink' }, 0.18, 2)
    ]
  },
  {
    id: 'handdrawn-todo', name: '涂鸦待办清单 (1:1)', version: '1.0.0', category: 'handdrawn', tags: ['handdrawn', 'todo', 'checklist', 'doodle', '1:1'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23fffbea"/><circle cx="26" cy="34" r="9" fill="none" stroke="%23ea580c" stroke-width="3"/><rect x="42" y="30" width="40" height="6" rx="3" fill="%2357534e"/><circle cx="26" cy="58" r="9" fill="%2322c55e"/><rect x="42" y="54" width="30" height="6" rx="3" fill="%23a8a29e"/></svg>',
    tokens: {
      colors: {
        bg: { label: '背景', default: '#FFFBEB', options: ['#FFFBEB', '#FEFCE8', '#EFF6FF', '#FDF2F8', '#F0FDF4'] },
        ink: { label: '笔色', default: '#57534E', options: ['#57534E', '#44403C', '#1E293B', '#334155', '#3F4E3A'] },
        accent: { label: '强调', default: '#EA580C', options: ['#EA580C', '#DB2777', '#4F46E5', '#059669', '#DC2626'] }
      },
      fonts: { hand: { label: '手写字', default: CN_HAND, options: [CN_HAND, EN_HAND, 'STKaiti, KaiTi, serif'] } }
    },
    presets: [
      { name: '活力橙', colors: { bg: '#FFFBEB', ink: '#57534E', accent: '#EA580C' } },
      { name: '莓果粉', colors: { bg: '#FDF2F8', ink: '#57534E', accent: '#DB2777' } },
      { name: '靛蓝专注', colors: { bg: '#EFF6FF', ink: '#334155', accent: '#4F46E5' } },
      { name: '青草绿', colors: { bg: '#F0FDF4', ink: '#3F4E3A', accent: '#059669' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1080, defaultWidth: 1080, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' }, backgroundImage: dotPaper(1080, 1080, 44, 'rgba(120,53,15,0.12)') },
    elements: [
      { id: 'tape', group: 'tape', type: 'image', src: CLOUD, objectFit: 'contain', x: 430, y: 60, width: 220, height: 120, zIndex: 6 },
      { id: 'title', type: 'text', content: '今日待办', fontFamily: { $t: 'fonts.hand' }, fontSize: 92, fontWeight: '700', color: { $t: 'colors.ink' }, textAlign: 'center', x: 140, y: 150, width: 800, height: 120, zIndex: 3, animation: { name: 'zoomIn', duration: 500 }, editable: { content: true, position: true } },
      { id: 'sub', type: 'text', content: "TO-DO · let's do this ✔", fontFamily: EN_HAND, fontSize: 34, fontWeight: '700', color: { $t: 'colors.accent' }, textAlign: 'center', x: 240, y: 272, width: 600, height: 50, zIndex: 3, editable: { content: true } },
      { id: 'r1-num', type: 'shape', shapeKind: 'circle', x: 130, y: 380, width: 60, height: 60, border: { color: { $t: 'colors.accent' }, width: 3, style: 'solid' }, zIndex: 3 },
      { id: 'r1-n', type: 'text', content: '1', fontFamily: PENCIL, fontSize: 34, fontWeight: '700', color: { $t: 'colors.accent' }, textAlign: 'center', x: 130, y: 390, width: 60, height: 40, zIndex: 4 },
      { id: 'r1-txt', type: 'text', content: '晨间写作 500 字', fontFamily: { $t: 'fonts.hand' }, fontSize: 46, fontWeight: '400', color: { $t: 'colors.ink' }, x: 220, y: 384, width: 700, height: 60, zIndex: 3, editable: { content: true } },
      { id: 'r2-num', type: 'shape', shapeKind: 'circle', x: 130, y: 500, width: 60, height: 60, border: { color: { $t: 'colors.accent' }, width: 3, style: 'solid' }, zIndex: 3 },
      { id: 'r2-n', type: 'text', content: '2', fontFamily: PENCIL, fontSize: 34, fontWeight: '700', color: { $t: 'colors.accent' }, textAlign: 'center', x: 130, y: 510, width: 60, height: 40, zIndex: 4 },
      { id: 'r2-txt', type: 'text', content: '整理工位 + 一盆绿植', fontFamily: { $t: 'fonts.hand' }, fontSize: 46, fontWeight: '400', color: { $t: 'colors.ink' }, x: 220, y: 504, width: 700, height: 60, zIndex: 3, editable: { content: true } },
      { id: 'r3-num', type: 'shape', shapeKind: 'circle', x: 130, y: 620, width: 60, height: 60, fill: { $t: 'colors.accent' }, zIndex: 3 },
      { id: 'r3-n', type: 'text', content: '3', fontFamily: PENCIL, fontSize: 34, fontWeight: '700', color: '#FFFFFF', textAlign: 'center', x: 130, y: 630, width: 60, height: 40, zIndex: 4 },
      { id: 'r3-txt', type: 'text', content: '给妈妈打个电话', fontFamily: { $t: 'fonts.hand' }, fontSize: 46, fontWeight: '400', color: { $t: 'colors.ink' }, x: 220, y: 624, width: 700, height: 60, zIndex: 3, editable: { content: true } },
      { id: 'done-check', type: 'image', src: CHECK, objectFit: 'contain', x: 780, y: 606, width: 90, height: 90, zIndex: 4, animation: { name: 'zoomIn', duration: 400, delay: 700 } },
      { id: 'bubble', type: 'image', src: BUBBLE, objectFit: 'contain', x: 800, y: 300, width: 190, height: 150, zIndex: 5, animation: { name: 'fadeInUp', duration: 600, delay: 800 } },
      { id: 'bubble-t', type: 'text', content: '加油!', fontFamily: { $t: 'fonts.hand' }, fontSize: 42, fontWeight: '700', color: { $t: 'colors.ink' }, textAlign: 'center', x: 828, y: 336, width: 140, height: 60, zIndex: 6, editable: { content: true } },
      { id: 'footer', type: 'text', content: '★ 完成 1 / 3 项 ★', fontFamily: PENCIL, fontSize: 28, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.6, textAlign: 'center', x: 340, y: 760, width: 400, height: 40, zIndex: 3, editable: { content: true } }
    ]
  },
  {
    id: 'handdrawn-math-grid', name: '数学网格笔记 (4:5)', version: '1.0.0', category: 'handdrawn', tags: ['handdrawn', 'math', 'geometry', 'notes', 'grid', '4:5'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="125" viewBox="0 0 108 135"><rect width="108" height="135" fill="%23f5f8ff"/><g stroke="%231d4ed8" stroke-width="0.4" opacity="0.16"><path d="M9 0V135M18 0V135M27 0V135M36 0V135M45 0V135M54 0V135M63 0V135M72 0V135M81 0V135M90 0V135M99 0V135M0 9H108M0 18H108M0 27H108M0 36H108M0 45H108M0 54H108M0 63H108M0 72H108M0 81H108M0 90H108M0 99H108M0 108H108M0 117H108M0 126H108"/></g><g stroke="%231d4ed8" stroke-width="0.9" opacity="0.13"><path d="M27.6 4V131M73.6 4V131M6 27.6H102M6 50.6H102M6 73.6H102"/></g><rect x="7" y="14" width="26" height="2.4" fill="%231d4ed8" opacity="0.6"/><rect x="6" y="19" width="40" height="6" rx="2" fill="%231e293b"/><rect x="6" y="28" width="34" height="6" rx="2" fill="%231e293b"/><g fill="none" stroke="%231d4ed8"><circle cx="73" cy="33" r="13" stroke-width="0.9" stroke-dasharray="2.6 2" opacity="0.6"/><line x1="73" y1="33" x2="85" y2="26" stroke-width="1" opacity="0.8"/><line x1="72" y1="40" x2="93" y2="41" stroke-width="0.8" stroke-dasharray="3 2" opacity="0.5"/></g><circle cx="73" cy="33" r="1" fill="%231d4ed8"/><rect x="6" y="48" width="44" height="1.6" fill="%231d4ed8" opacity="0.6"/><rect x="6" y="53" width="34" height="3" fill="%231e293b" opacity="0.35"/><rect x="6" y="58" width="28" height="3" fill="%231e293b" opacity="0.35"/><rect x="8" y="66" width="26" height="5" rx="2" fill="%231d4ed8" opacity="0.75"/><g stroke="%231d4ed8" stroke-width="1" opacity="0.65" fill="%231d4ed8"><line x1="58" y1="74" x2="97" y2="74"/><line x1="58" y1="74" x2="58" y2="46"/><path d="M97 72L101 74L97 76Z" stroke="none"/><path d="M56 46L58 42L60 46Z" stroke="none"/></g><circle cx="75" cy="61" r="11.5" fill="none" stroke="%231d4ed8" stroke-width="1.1"/><line x1="63.5" y1="61" x2="86.5" y2="61" stroke="%231d4ed8" stroke-width="0.7"/><g stroke="%231d4ed8" stroke-width="0.9" opacity="0.45" stroke-dasharray="4 3"><line x1="9" y1="79" x2="46" y2="79"/></g><rect x="6" y="83" width="52" height="2.6" fill="%231e293b" opacity="0.3"/><rect x="6" y="88" width="40" height="2.6" fill="%231e293b" opacity="0.3"/><rect x="6" y="95" width="96" height="19" fill="none" stroke="%231d4ed8" stroke-width="0.9" stroke-dasharray="3 2"/><g fill="%231e293b" opacity="0.28"><rect x="12" y="101" width="66" height="2.4"/><rect x="12" y="107" width="48" height="2.4"/></g><rect x="6" y="120" width="30" height="2.4" fill="%231e293b" opacity="0.25"/><rect x="56" y="119" width="34" height="3" rx="1.5" fill="%231d4ed8" opacity="0.4"/></svg>',
    tokens: {
      colors: {
        bg: { label: '图纸', default: '#F5F8FF', options: ['#F5F8FF', '#EFF5FF', '#F8FAFF', '#EAF1FF', '#EAF7F9', '#F6F3FF', '#FDF2F8'] },
        ink: { label: '正文', default: '#1E293B', options: ['#1E293B', '#0F172A', '#334155'] },
        accent: { label: '图线', default: '#1D4ED8', options: ['#1D4ED8', '#0891B2', '#7C3AED', '#DB2777'] }
      },
      fonts: { hand: { label: '手写体', default: CN_HAND, options: [CN_HAND, EN_HAND, 'STKaiti, KaiTi, serif'] } }
    },
    presets: [
      { name: '坐标蓝', colors: { bg: '#F5F8FF', ink: '#1E293B', accent: '#1D4ED8' } },
      { name: '几何青', colors: { bg: '#EAF7F9', ink: '#0F172A', accent: '#0891B2' } },
      { name: '函数紫', colors: { bg: '#F6F3FF', ink: '#1E293B', accent: '#7C3AED' } },
      { name: '概率玫红', colors: { bg: '#FDF2F8', ink: '#334155', accent: '#DB2777' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' }, backgroundImage: gridPaper(1080, 1350, 46) },
    elements: [
      { id: 'tape', group: 'tape', type: 'image', src: CLOUD, objectFit: 'contain', x: 60, y: 70, width: 170, height: 110, rotation: -18, zIndex: 6 },
      // 手描的“粗格”：每 5 小格加粗一条，方格纸立刻有了主次
      ...keRows('grid-major-h', 3, 60, 276, 230, 960, 3, { $t: 'colors.accent' }, 0.09, 1),
      keBar('grid-major-v-1', 276, 60, 3, 1230, { $t: 'colors.accent' }, 0.07, 1, 0.3),
      keBar('grid-major-v-2', 736, 60, 3, 1230, { $t: 'colors.accent' }, 0.07, 1, -0.25),
      { id: 'kicker', type: 'text', content: 'GEOMETRY · 圆的性质 · LAB 03', fontFamily: PENCIL, fontSize: 28, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 3, x: 90, y: 150, width: 700, height: 40, zIndex: 3, editable: { content: true } },
      { id: 'title', type: 'text', content: '为什么\n周长 = 2πr？', fontFamily: { $t: 'fonts.hand' }, fontSize: 82, fontWeight: '700', color: { $t: 'colors.ink' }, lineHeight: 1.24, x: 90, y: 210, width: 900, height: 240, zIndex: 3, animation: { name: 'inkReveal', duration: 1100 }, editable: { content: true, position: true } },
      // 圆规作图痕：虚线圆 + 一条半径 + 圆心
      keRing('compass-arc', 700, 200, 260, 260, { $t: 'colors.accent' }, 2, 0.45, 2),
      keLineTo('compass-r', 830, 330, 945, 269, { $t: 'colors.accent' }, 3, 0.75, 3),
      keDot('compass-center', 830, 330, 5, { $t: 'colors.accent' }, 0.85, 3),
      { id: 'compass-label', type: 'text', content: 'r = 5 cm', fontFamily: PENCIL, fontSize: 28, fontWeight: '700', color: { $t: 'colors.accent' }, x: 850, y: 344, width: 170, height: 38, zIndex: 3 },
      { id: 'divider', type: 'shape', shapeKind: 'line', x: 90, y: 500, width: 460, height: 3, fill: { $t: 'colors.accent' }, opacity: 0.6, zIndex: 3, animation: { name: 'slideInLeft', duration: 700, delay: 400 } },
      { id: 'body1', type: 'text', content: '把圆沿半径剪开、拉直，\n近似一个长方形：', fontFamily: { $t: 'fonts.hand' }, fontSize: 40, fontWeight: '400', color: { $t: 'colors.ink' }, lineHeight: 1.6, x: 90, y: 540, width: 480, height: 130, zIndex: 3, editable: { content: true } },
      { id: 'formula', type: 'text', content: 'C = 2πr', fontFamily: PENCIL, fontSize: 74, fontWeight: '700', color: { $t: 'colors.accent' }, x: 90, y: 700, width: 480, height: 100, zIndex: 3, animation: { name: 'zoomIn', duration: 500, delay: 600 }, editable: { content: true } },
      // 拉直的周长：一条辅助虚线接在公式下面
      ...keDashed('unroll', 96, 812, 520, 812, 3, 3, { $t: 'colors.accent' }, 0.5, 2),
      // 坐标轴 + 箭头 + 原点
      keBar('axis-x', 640, 798, 380, 4, { $t: 'colors.accent' }, 0.6, 2),
      keBar('axis-y', 638, 470, 4, 332, { $t: 'colors.accent' }, 0.6, 2),
      { id: 'axis-arrow-x', type: 'text', content: '▶', fontFamily: PENCIL, fontSize: 30, fontWeight: '700', color: { $t: 'colors.accent' }, textAlign: 'center', x: 1016, y: 780, width: 40, height: 40, zIndex: 3 },
      { id: 'axis-arrow-y', type: 'text', content: '▲', fontFamily: PENCIL, fontSize: 30, fontWeight: '700', color: { $t: 'colors.accent' }, textAlign: 'center', x: 620, y: 434, width: 40, height: 40, zIndex: 3 },
      { id: 'axis-origin', type: 'text', content: 'O', fontFamily: PENCIL, fontSize: 26, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.6, x: 606, y: 806, width: 30, height: 34, zIndex: 3 },
      { id: 'fig', type: 'image', src: GEOMETRY, objectFit: 'contain', x: 620, y: 480, width: 380, height: 300, zIndex: 3 },
      { id: 'body2', type: 'text', content: '高是半径 r，长是半个周长 πr，\n两者相乘再 ×2，即得周长。', fontFamily: { $t: 'fonts.hand' }, fontSize: 36, fontWeight: '400', color: { $t: 'colors.ink' }, lineHeight: 1.6, x: 90, y: 840, width: 860, height: 130, zIndex: 3, editable: { content: true } },
      { id: 'note', type: 'shape', shapeKind: 'rect', x: 90, y: 1010, width: 900, height: 180, border: { color: { $t: 'colors.accent' }, width: 2, style: 'dashed' }, borderRadius: 14, zIndex: 2 },
      { id: 'note-text', type: 'text', content: 'π 是一个无理数：3.14159……\n它描述的是“圆”这件事本身的常数。', fontFamily: { $t: 'fonts.hand' }, fontSize: 34, fontWeight: '400', color: { $t: 'colors.ink' }, lineHeight: 1.6, x: 130, y: 1044, width: 820, height: 130, zIndex: 3, editable: { content: true } },
      { id: 'formula-mini', type: 'text', content: 'sin²θ + cos²θ = 1', fontFamily: PENCIL, fontSize: 30, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.5, textAlign: 'right', x: 600, y: 1236, width: 400, height: 44, zIndex: 3, editable: { content: true } },
      { id: 'footer', type: 'text', content: '数学笔记 · 把公式画出来 · 每格 1 cm', fontFamily: { $t: 'fonts.hand' }, fontSize: 26, fontWeight: '400', color: { $t: 'colors.ink' }, opacity: 0.55, x: 90, y: 1240, width: 500, height: 40, zIndex: 3, editable: { content: true } }
    ]
  },
  {
    id: 'handdrawn-poem', name: '手写诗歌页 (9:16)', version: '1.0.0', category: 'handdrawn', tags: ['handdrawn', 'poem', 'ruled', 'writing', '9:16'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="178" viewBox="0 0 108 192"><rect width="108" height="192" fill="%23fffdf5"/><g stroke="%23bfdbfe" stroke-width="0.7" opacity="0.9"><path d="M0 11H108M0 22H108M0 33H108M0 44H108M0 155H108M0 166H108M0 177H108M0 188H108"/></g><line x1="15" y1="4" x2="15" y2="188" stroke="%23fca5a5" stroke-width="0.9"/><path d="M30 42 C 46 36,72 36,84 41" fill="none" stroke="%237c2d12" stroke-width="1.6"/><g stroke="%237c2d12" stroke-width="1" opacity="0.5"><line x1="40" y1="27" x2="68" y2="27"/><line x1="44" y1="31" x2="64" y2="31"/></g><rect x="20" y="47" width="78" height="84" fill="%23fffdf5" stroke="%2357534e" stroke-width="1"/><rect x="22" y="49" width="74" height="80" fill="none" stroke="%2357534e" stroke-width="0.5" opacity="0.45"/><g stroke="%2357534e" stroke-width="0.4" opacity="0.28"><path d="M78.5 55V126M65.5 55V126M52.5 55V126M36 55V126"/></g><g stroke="%2357534e" stroke-width="4.2" stroke-dasharray="4.4 3" opacity="0.78"><line x1="85" y1="62" x2="85" y2="100"/><line x1="72" y1="62" x2="72" y2="108"/><line x1="59" y1="62" x2="59" y2="95"/><line x1="46" y1="62" x2="46" y2="114"/></g><rect x="83" y="51" width="5" height="8" fill="%237c2d12" opacity="0.8"/><g stroke="%237c2d12" stroke-width="2.4" stroke-dasharray="2.6 2.4" opacity="0.7"><line x1="28" y1="94" x2="28" y2="122"/></g><rect x="24" y="130" width="9" height="9" fill="%237c2d12" opacity="0.9" transform="rotate(3 28.5 134.5)"/><g fill="none" stroke="%2357534e" stroke-width="0.6" opacity="0.4"><circle cx="7" cy="62" r="1.7"/><circle cx="7" cy="90" r="1.7"/><circle cx="7" cy="118" r="1.7"/></g><g fill="%2357534e"><circle cx="46" cy="147" r="1.5" opacity="0.24"/><circle cx="58" cy="154" r="1" opacity="0.2"/><circle cx="70" cy="146" r="1.8" opacity="0.16"/><circle cx="64" cy="160" r="0.9" opacity="0.22"/></g><path d="M18 152 L20 157 L25 157.5 L21 160.5 L22.5 165.5 L18 162.5 L13.5 165.5 L15 160.5 L11 157.5 L16 157 Z" fill="none" stroke="%23b45309" stroke-width="0.8"/><path d="M86 158 C 78 152,79 145,86 149 C 93 145,94 152,86 158 Z" fill="none" stroke="%23e11d48" stroke-width="0.9"/><line x1="34" y1="172" x2="74" y2="172" stroke="%2357534e" stroke-width="1.6" opacity="0.35"/></svg>',
    tokens: {
      colors: {
        bg: { label: '纸色', default: '#FFFDF5', options: ['#FFFDF5', '#FFFEF9', '#FBFAF3', '#FFF8EC', '#F3F8F7'] },
        ink: { label: '笔色', default: '#57534E', options: ['#57534E', '#44403C', '#334155', '#1E293B'] },
        accent: { label: '落款', default: '#7C2D12', options: ['#7C2D12', '#B91C1C', '#1E3A8A', '#155E75'] }
      },
      fonts: { hand: { label: '手写体', default: CN_HAND, options: [CN_HAND, EN_HAND, 'STKaiti, KaiTi, serif'] } }
    },
    presets: [
      { name: '宣黄诗笺', colors: { bg: '#FFFDF5', ink: '#57534E', accent: '#7C2D12' } },
      { name: '冷白信纸', colors: { bg: '#FFFEF9', ink: '#334155', accent: '#1E3A8A' } },
      { name: '怀旧米黄', colors: { bg: '#FBFAF3', ink: '#44403C', accent: '#B91C1C' } },
      { name: '墨青小楷', colors: { bg: '#F3F8F7', ink: '#1E293B', accent: '#155E75' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1920, defaultWidth: 1080, defaultHeight: 1920, backgroundColor: { $t: 'colors.bg' }, backgroundImage: ruledPaper(1080, 1920, 56, 'rgba(37,99,235,0.14)', 150) },
    elements: [
      { id: 'title', type: 'text', content: '《 风 》', fontFamily: { $t: 'fonts.hand' }, fontSize: 88, fontWeight: '700', color: { $t: 'colors.ink' }, textAlign: 'center', x: 240, y: 220, width: 600, height: 120, zIndex: 3, animation: { name: 'inkReveal', duration: 1100 }, editable: { content: true, position: true } },
      ...keStroke2('title-rule', 400, 330, 280, 7, { $t: 'colors.accent' }, 0.5, 3),
      { id: 'quill', type: 'image', src: QUILL, objectFit: 'contain', x: 340, y: 372, width: 400, height: 60, zIndex: 3, animation: { name: 'inkReveal', duration: 900, delay: 400 } },
      // 竖排诗笺的版框：先用纸色压住横线，再描边框，否则横格纸会跟竖字打架
      { id: 'blank-panel', type: 'shape', shapeKind: 'rect', x: 196, y: 470, width: 790, height: 840, fill: { $t: 'colors.bg' }, opacity: 0.93, zIndex: 1 },
      { id: 'panel-frame', type: 'shape', shapeKind: 'rect', x: 200, y: 474, width: 782, height: 832, border: { color: { $t: 'colors.ink' }, width: 2.5, style: 'solid' }, opacity: 0.42, zIndex: 2 },
      // 引首章（右上角闲章）
      { id: 'lead-seal', type: 'shape', shapeKind: 'rect', x: 862, y: 498, width: 44, height: 96, fill: { $t: 'colors.accent' }, borderRadius: 8, opacity: 0.8, zIndex: 4 },
      { id: 'lead-seal-text', type: 'text', content: '风', fontFamily: { $t: 'fonts.hand' }, fontSize: 30, fontWeight: '700', color: { $t: 'colors.bg' }, textAlign: 'center', x: 862, y: 528, width: 44, height: 40, zIndex: 5 },
      // 竖排：从右往左读，一行一列
      { id: 'verse', type: 'text', content: '你\n看\n不\n见\n我', fontFamily: { $t: 'fonts.hand' }, fontSize: 74, fontWeight: '400', color: { $t: 'colors.ink' }, lineHeight: 1.14, textAlign: 'center', x: 830, y: 604, width: 110, height: 430, zIndex: 3, animation: { name: 'fadeIn', duration: 1200 }, editable: { content: true, fontSize: { type: 'range', min: 48, max: 84 }, position: true } },
      { id: 'verse-2', type: 'text', content: '却\n知\n道\n你\n来\n过', fontFamily: { $t: 'fonts.hand' }, fontSize: 74, fontWeight: '400', color: { $t: 'colors.ink' }, lineHeight: 1.14, textAlign: 'center', x: 700, y: 604, width: 110, height: 520, zIndex: 3, animation: { name: 'fadeIn', duration: 1000, delay: 250 }, editable: { content: true } },
      { id: 'verse-3', type: 'text', content: '树\n叶\n替\n我', fontFamily: { $t: 'fonts.hand' }, fontSize: 74, fontWeight: '400', color: { $t: 'colors.ink' }, lineHeight: 1.14, textAlign: 'center', x: 570, y: 604, width: 110, height: 345, zIndex: 3, animation: { name: 'fadeIn', duration: 1000, delay: 450 }, editable: { content: true } },
      { id: 'verse-4', type: 'text', content: '翻\n动\n了\n整\n个\n夏\n天', fontFamily: { $t: 'fonts.hand' }, fontSize: 74, fontWeight: '400', color: { $t: 'colors.ink' }, lineHeight: 1.14, textAlign: 'center', x: 440, y: 604, width: 110, height: 600, zIndex: 3, animation: { name: 'fadeIn', duration: 1000, delay: 650 }, editable: { content: true } },
      // 行格：竖排之间的分隔细线，手写不可能笔直
      keBar('col-div-1', 815, 500, 2, 750, { $t: 'colors.ink' }, 0.16, 2, 0.4),
      keBar('col-div-2', 685, 500, 2, 750, { $t: 'colors.ink' }, 0.16, 2, -0.35),
      keBar('col-div-3', 555, 500, 2, 750, { $t: 'colors.ink' }, 0.16, 2, 0.3),
      keBar('col-div-4', 376, 500, 2, 750, { $t: 'colors.ink' }, 0.12, 2, -0.45),
      // 落款列 + 名章
      { id: 'author', type: 'text', content: '佚\n名\n手\n稿', fontFamily: { $t: 'fonts.hand' }, fontSize: 44, fontWeight: '400', color: { $t: 'colors.accent' }, lineHeight: 1.3, textAlign: 'center', x: 252, y: 1010, width: 66, height: 240, zIndex: 3, editable: { content: true } },
      { id: 'seal', type: 'shape', shapeKind: 'rect', x: 238, y: 1330, width: 88, height: 88, fill: { $t: 'colors.accent' }, borderRadius: 12, opacity: 0.9, rotation: 3.5, zIndex: 4 },
      { id: 'seal-text', type: 'text', content: '诗', fontFamily: { $t: 'fonts.hand' }, fontSize: 50, fontWeight: '700', color: { $t: 'colors.bg' }, textAlign: 'center', x: 238, y: 1348, width: 88, height: 56, zIndex: 5 },
      // 左侧三孔装订
      keRing('hole-1', 52, 620, 30, 30, { $t: 'colors.ink' }, 2.5, 0.3, 2),
      keRing('hole-2', 52, 900, 30, 30, { $t: 'colors.ink' }, 2.5, 0.3, 2),
      keRing('hole-3', 52, 1180, 30, 30, { $t: 'colors.ink' }, 2.5, 0.3, 2),
      // 溅到页脚的墨点
      ...keScatter('ink-dot', 20260918, 430, 1440, 760, 1600, 4, 5, 14, { $t: 'colors.ink' }, 0.13, 2),
      { id: 'star', group: 'star', type: 'image', src: STAR, objectFit: 'contain', x: 160, y: 1520, width: 70, height: 70, rotation: -12, zIndex: 3, animation: { name: 'twinkle', duration: 3000, iterationCount: 'infinite' } },
      { id: 'heart', type: 'image', src: HEART, objectFit: 'contain', x: 830, y: 1540, width: 84, height: 78, rotation: 10, zIndex: 3, animation: { name: 'heartbeat', duration: 2000, iterationCount: 'infinite' } },
      { id: 'footer', type: 'text', content: '抄于 2026 年 9 月 · 末班地铁 3 号线', fontFamily: { $t: 'fonts.hand' }, fontSize: 30, fontWeight: '400', color: { $t: 'colors.ink' }, opacity: 0.5, textAlign: 'center', x: 240, y: 1700, width: 600, height: 48, zIndex: 3, editable: { content: true } }
    ]
  }
]

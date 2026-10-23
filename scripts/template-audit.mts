// scripts/template-audit.mts —— 开发期模板体检（不入包，npm run 体检模板）
// 字面级换行/压字 + 对齐漂移 + 字号层级 + 留白 + 换色失效 + 动效层次；--fix 打印逐元素整改建议
// 一次性审查脚本 v4：
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const ROOT = 'src/core/templates'
const files: string[] = []
for (const d of fs.readdirSync(ROOT)) {
  const p = path.join(ROOT, d)
  if (!fs.statSync(p).isDirectory() || d === '_fx') continue
  for (const f of fs.readdirSync(p)) if (f.endsWith('.ts')) files.push(path.join(p, f))
}
const isTpl = (v: any) => v && typeof v === 'object' && typeof v.id === 'string' && Array.isArray(v.elements)
const tpls: { t: any; f: string }[] = []
for (const f of files) {
  const mod = await import(pathToFileURL(path.resolve(f)).href)
  for (const v of Object.values(mod)) {
    if (Array.isArray(v)) v.forEach(x => isTpl(x) && tpls.push({ t: x, f }))
    else if (isTpl(v)) tpls.push({ t: v, f })
  }
}
const num = (v: any) => (typeof v === 'number' ? v : v && typeof v === 'object' ? Number(v.min ?? 0) || 0 : 0)
const CJK = /[\u2e80-\u2fff\u3000-\u303f\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff00-\uffef]/
const narrow = new Set([...'il.,;:\'"!|()/\\·、'])
const wide = new Set([...'MWmw@%'])
const charEm = (c: string) => CJK.test(c) ? 1 : c === '\u3000' ? 1 : c === ' ' ? .3 : narrow.has(c) ? .33 : /[0-9]/.test(c) ? .56 : /[A-Z]/.test(c) ? (wide.has(c) ? .95 : .7) : /[a-z]/.test(c) ? (wide.has(c) ? .85 : .53) : .55
const tw = (s: string, size: number, ls: number) => [...s].reduce((a, c) => a + charEm(c) * size, 0) + [...s].length * ls

function layout(content: string, size: number, ls: number, boxW: number) {
  const toks: string[] = []
  for (const para of content.split('\n')) {
    if (!para) { toks.push('\n'); continue }
    let cur = ''
    for (const c of para) {
      if (CJK.test(c)) { if (cur) { toks.push(cur); cur = '' } toks.push(c) }
      else if (c === ' ') { if (cur) toks.push(cur); cur = ''; toks.push(' ') }
      else cur += c
    }
    if (cur) toks.push(cur)
    toks.push('\n')
  }
  const lines: number[] = []
  let line = '', lineW = 0
  const flush = () => { lines.push(tw(line.replace(/^\s+|\s+$/g, ''), size, ls)); line = ''; lineW = 0 }
  for (const tk of toks) {
    if (tk === '\n') { if (line) flush(); else lines.push(0); continue }
    const w = tw(tk, size, ls)
    if (lineW + w > boxW && line.trim()) { flush(); if (tk === ' ') { lineW = 0; continue } }
    if (!line.trim() && w > boxW) { line = tk; lineW = w; flush(); continue }
    line += tk; lineW += w
  }
  if (line) flush()
  return lines.filter(l => l > 0).length ? lines : [0]
}

const GHOST = /shadow|ghost|outline|echo|watermark|halo|glitch|-off$|-hi$|decor|bigmark|bg-num|bg-letter|seal|stamp|strike|panel-t|lantern|tick|check|sign-seal/
type Row = { tpl: string; cat: string; el: string; kind: string; detail: string; sev: number }
const rows: Row[] = []
const push = (r: Row) => rows.push(r)
/** 编组覆盖统计：多少模板/多少簇被当成「一个视觉单元」整组选中 */
const groupStat = { tpl: 0, clusters: 0, els: 0 }
const highCount = () => rows.filter(r => r.sev >= 3).length

for (const { t, f } of tpls) {
  const W = t.canvas.defaultWidth || t.canvas.virtualWidth
  const H = t.canvas.defaultHeight || t.canvas.virtualHeight
  const items = (t.elements as any[]).map(e => {
    const x = num(e.x), y = num(e.y), w = num(e.width), h = num(e.height)
    const size = typeof e.fontSize === 'number' ? e.fontSize : num(e.fontSize)
    return { e, x, y, w, h, size }
  })
  const texts = items.filter(i => i.e.type === 'text' && typeof i.e.content === 'string' && i.e.content.trim() && i.size > 0)
  // 墨迹占位（按 textAlign 定位；行盒上下各留 ~18%/8% 的字身空白）
  for (const i of texts) {
    const ls = i.e.letterSpacing || 0, lh = i.e.lineHeight || 1.2
    const box = Math.max(1, i.w)
    const lines = layout(i.e.content, i.size, ls, box)
    const maxW = Math.max(...lines, 1)
    const n = lines.length
    const inkTop = i.y + i.size * lh * .18
    const inkBot = i.y + i.size * lh * (n - 1 + .82)
    const al = i.e.textAlign || 'left'
    const ix = al === 'center' ? i.x + (i.w - maxW) / 2 : al === 'right' ? i.x + i.w - maxW : i.x
    i.ink = { x: ix, y: inkTop, w: maxW, h: inkBot - inkTop, n, maxW, need: n * i.size * lh }
    i.longWord = Math.max(...i.e.content.split(/[\s\n]/).map(s => tw(s, i.size, ls)), 0)
  }
  const others = items.filter(i => i.e.type !== 'text')

  // ① 折行下溢：墨迹底部超过盒底，并指出压到了谁
  for (const i of texts) {
    const spill = i.ink.y + i.ink.h - (i.y + i.h)
    if (spill > Math.max(i.size * .55, 8)) {
      if (i.ink.n <= 1 && i.longWord <= i.w * 1.02) continue
      const hit = [...texts, ...others].filter(j => j !== i && j.e.type !== 'overlay' && j.y > i.y + i.h * .5 && j.y < i.ink.y + i.ink.h && Math.min(i.x + i.w, j.x + j.w) - Math.max(i.x, j.x) > 10)
      const cross = i.ink.y + i.ink.h > H
      push({ tpl: t.id, cat: t.category, el: i.e.id, kind: 'WRAP-SPILL', sev: cross ? 3 : hit.length ? 3 : spill > i.size * 1.4 ? 2 : 1, detail: `折成 ${i.ink.n} 行，墨迹底部到 ${(i.ink.y + i.ink.h).toFixed(0)}px（盒底 ${(i.y + i.h).toFixed(0)}，画布 ${H}）超出 ${spill.toFixed(0)}px${hit.length ? ` → 压到 ${hit.slice(0, 3).map(x => x.e.id).join('/')}` : ''}${cross ? ' → 冲出画布' : ''}｜「${i.e.content.replace(/\n/g, '⏎').slice(0, 14)}」` })
    }
  }
  // ② 单词超长 → 浏览器不折行、直接横向探出
  for (const i of texts) {
    if (i.longWord > i.w * 1.08 && i.ink.n === 1)
      push({ tpl: t.id, cat: t.category, el: i.e.id, kind: 'WORD-OVERFLOW', sev: i.longWord > i.w * 1.35 ? 3 : 2, detail: `最长单词 ${i.longWord.toFixed(0)}px > 盒宽 ${i.w}px，横向探出 ${(i.longWord - i.w).toFixed(0)}px（${i.e.textAlign || 'left'}）｜「${i.e.content.split(/[\s\n]/).sort((a, b) => tw(b, i.size, 0) - tw(a, i.size, 0))[0].slice(0, 14)}」` })
  }
  // ③ 字面级压字
  const T = texts.filter(i => (i.e.opacity ?? 1) > .45 && !GHOST.test(i.e.id) && i.e.color !== 'transparent')
  for (let a = 0; a < T.length; a++) for (let b = a + 1; b < T.length; b++) {
    const A = T[a], B = T[b]
    if (A.e.content === B.e.content) continue
    if ((A.e.rotation ?? 0) !== (B.e.rotation ?? 0)) continue
    const ix = Math.min(A.ink.x + A.ink.w, B.ink.x + B.ink.w) - Math.max(A.ink.x, B.ink.x)
    const iy = Math.min(A.ink.y + A.ink.h, B.ink.y + B.ink.h) - Math.max(A.ink.y, B.ink.y)
    if (ix <= 6 || iy <= 6) continue
    const dens = (ix * iy) / Math.max(1, Math.min(A.ink.w * A.ink.h, B.ink.w * B.ink.h))
    if (dens < .18) continue
    const short = Math.min(A.ink.w * A.ink.h, B.ink.w * B.ink.h) < (Math.max(A.size, B.size) * 2) ** 2
    push({ tpl: t.id, cat: t.category, el: `${A.e.id}×${B.e.id}`, kind: 'TEXT-CLASH', sev: short ? 1 : dens > .5 ? 3 : 2, detail: `字面重叠 ${(dens * 100).toFixed(0)}%（横向 ${ix.toFixed(0)}px / 纵向 ${iy.toFixed(0)}px）｜「${A.e.content.replace(/\n/g, '⏎').slice(0, 10)}」/「${B.e.content.replace(/\n/g, '⏎').slice(0, 10)}」` })
  }
  // ④ 文字出画布（墨迹）
  for (const i of texts) {
    const e = i.ink.x + i.ink.w - W, s = -i.ink.x, bo = i.ink.y + i.ink.h - H, tp = -i.ink.y
    const m = Math.max(e, s, bo, tp)
    if (m > 6 && Math.abs(i.e.rotation ?? 0) < 4) push({ tpl: t.id, cat: t.category, el: i.e.id, kind: 'TEXT-CLIPPED', sev: 3, detail: `墨迹越出画布 ${m.toFixed(0)}px（${e === m ? '右' : s === m ? '左' : bo === m ? '下' : '上'}边）｜「${i.e.content.slice(0, 10)}」` })
  }
  // ⑤ 对齐漂移：内容元素左边距近似不等
  const content = items.filter(i => (i.e.type === 'text' && ((i.e.textAlign ?? 'left') === 'left')) && i.w > 20 && Math.abs(i.e.rotation ?? 0) < 2 && i.x > W * .02 && i.x < W * .9)
  const xs = [...new Set(content.map(i => i.x))].sort((a, b) => a - b)
  const drift: string[][] = []
  for (let k = 0; k < xs.length - 1; k++) {
    const d = xs[k + 1] - xs[k]
    if (d >= 3 && d <= Math.max(10, W * .009)) {
      const g1 = content.filter(i => i.x === xs[k]).map(i => i.e.id), g2 = content.filter(i => i.x === xs[k + 1]).map(i => i.e.id)
      if (g1.length + g2.length >= 3) drift.push([`${xs[k]}(${g1.length})`, `${xs[k + 1]}(${g2.length})`, `${d}px`, ...g2.slice(0, 3)])
    }
  }
  if (drift.length) push({ tpl: t.id, cat: t.category, el: `${drift.length} 组`, kind: 'ALIGN-DRIFT', sev: drift.length >= 4 ? 2 : 1, detail: `左边缘参差 ${drift.slice(0, 2).map(d => `${d[0]} vs ${d[1]} 差 ${d[2]}：${d.slice(3).join('/')}`).join('；')}` })
  // ⑥ 字号层级：近似字号成堆
  const sizes = [...new Set(texts.map(i => Math.round(i.size)))].sort((a, b) => b - a)
  const mushy: string[] = []
  for (let k = 0; k < sizes.length - 1; k++) if ((sizes[k] - sizes[k + 1]) / sizes[k + 1] < .09 && sizes[k] < 100) mushy.push(`${sizes[k]}≈${sizes[k + 1]}`)
  if (mushy.length >= 4) push({ tpl: t.id, cat: t.category, el: `${sizes.length} 档`, kind: 'TYPE-MUSH', sev: mushy.length >= 7 ? 2 : 1, detail: `相邻字号过近：${mushy.slice(0, 5).join('、')}` })
  // ⑦ 留白：内容外框
  const cb = items.filter(i => i.w > 4 && !(i.w >= W * .96 && i.h >= H * .96))
  if (cb.length) {
    const L = Math.min(...cb.map(i => i.x)), R = W - Math.max(...cb.map(i => i.x + i.w)), Tp = Math.min(...cb.map(i => i.y)), Bm = H - Math.max(...cb.map(i => i.y + i.h))
    if (Math.min(L, R, Tp, Bm) < W * .012) push({ tpl: t.id, cat: t.category, el: '-', kind: 'TIGHT-MARGIN', sev: 1, detail: `内容外框 左${L.toFixed(0)} 右${R.toFixed(0)} 上${Tp.toFixed(0)} 下${Bm.toFixed(0)}（贴边）` })
    else if ((L > W * .1 && R < W * .035) || (R > W * .1 && L < W * .035)) push({ tpl: t.id, cat: t.category, el: '-', kind: 'UNBALANCED', sev: 1, detail: `左右留白失衡 左${L.toFixed(0)} vs 右${R.toFixed(0)}` })
  }
  // ⑧ 换色失效
  const hard = items.filter(i => (i.e.type === 'text' && typeof i.e.color === 'string' && /^#[0-9a-f]{3,8}$/i.test(i.e.color) && !/^#(fff|ffffff|000|000000)$/i.test(i.e.color)) || (i.e.type === 'shape' && typeof i.e.fill === 'string' && /^#[0-9a-f]{3,8}$/i.test(i.e.fill) && !/^#(fff|ffffff)$/i.test(i.e.fill)))
  if (hard.length >= 3) push({ tpl: t.id, cat: t.category, el: hard.slice(0, 4).map(h => h.e.id).join(','), kind: 'RECOLOR-DEAF', sev: hard.length >= 8 ? 2 : 1, detail: `${hard.length} 处字面色不随预设变化` })
  // ⑨ token 路径失效（resolver 只 warn 后回退 undefined → 成品静默丢色/丢字体）
  const keys = new Set<string>()
  for (const [g, defs] of Object.entries((t.tokens ?? {}) as Record<string, any>)) {
    for (const k of Object.keys(defs ?? {})) keys.add(`${g}.${k}`)
  }
  // ⑬ token 命名漂移：同一角色全库有主名，模板用了罕见别名（新建模板请照主名写）
  const TOKEN_ALIASES: Record<string, string> = { 'colors.secondary': 'colors.accent2', 'colors.text': 'colors.ink', 'fonts.head': 'fonts.heading' }
  for (const kk of keys) {
    const canon = TOKEN_ALIASES[kk]
    if (canon) push({ tpl: t.id, cat: t.category, el: '-', kind: 'TOKEN-ALIAS', sev: 1, detail: `token「${kk}」命名漂移，全库主名「${canon}」，建议统一` })
  }
  // ⑭ preset 覆盖缺口：元素引用了的色 token，某个预设却没给值 → 换预设时该色纹丝不动
  const colorRefs = new Set<string>()
  for (const m of JSON.stringify(t).matchAll(/"\$t":"(colors\.[^"]+)"/g)) if (keys.has(m[1])) colorRefs.add(m[1])
  for (const [pn, pdef] of Object.entries((t.presets ?? {}) as Record<string, any>)) {
    const covered = new Set<string>()
    for (const [g, defs] of Object.entries((pdef as any) ?? {})) for (const k of Object.keys(defs ?? {})) covered.add(`${g}.${k}`)
    const missing = [...colorRefs].filter(x => !covered.has(x))
    if (missing.length) push({ tpl: t.id, cat: t.category, el: String(pn), kind: 'PRESET-GAP', sev: 2, detail: `预设「${pn}」缺 ${missing.length}/${colorRefs.size} 个被引用色：${missing.slice(0, 5).join(', ')}` })
  }
  for (const m of JSON.stringify(t).matchAll(/"\$t":"([^"]+)"/g)) {
    if (!keys.has(m[1])) push({ tpl: t.id, cat: t.category, el: '-', kind: 'TOKEN-MISS', sev: 3, detail: `引用了不存在的 token「${m[1]}」` })
  }
  // ⑩ 坏 data URI：内联 SVG 必须单根闭合且标签成对（双 </svg> → 浏览器解析失败 → 画布红斜纹）
  const svgUris: { where: string; src: string }[] = []
  if (typeof t.thumbnail === 'string' && t.thumbnail.startsWith('data:image/svg')) svgUris.push({ where: 'thumbnail', src: t.thumbnail })
  for (const e of t.elements as any[]) if (typeof e.src === 'string' && e.src.startsWith('data:image/svg')) svgUris.push({ where: e.id, src: e.src })
  for (const { where, src } of svgUris) {
    const body = src.slice(src.indexOf(',') + 1)
    const probs: string[] = []
    const open = (body.match(/<svg[\s>]/g) || []).length
    const close = (body.match(/<\/svg\s*>/g) || []).length
    if (open !== 1 || close !== 1) probs.push(`<svg> 开 ${open}/闭 ${close}（应为 1/1，多半是 inner 自带闭合标签又被 svgUri 补了一次）`)
    else {
      const stack: string[] = []
      let stray = ''
      for (const m of body.replace(/<!--[^]*?-->/g, '').matchAll(/<(\/?)([A-Za-z][\w:.-]*)((?:"[^"]*"|'[^']*'|[^>])*?)(\/?)>/g)) {
        if (m[4]) continue
        if (m[1]) { if (stack.pop() !== m[2] && !stray) stray = `</${m[2]}> 无配对` }
        else stack.push(m[2])
      }
      if (stack.length && !stray) stray = `<${stack[stack.length - 1]}> 未闭合`
      if (stray) probs.push(`标签不成对：${stray}`)
    }
    if (probs.length) push({ tpl: t.id, cat: t.category, el: where, kind: 'BAD-SVG-URI', sev: 3, detail: probs.join('；') })
  }
  // ⑪ 外链素材：主打离线可用，素材必须落 public/images/ 本地路径（2026-09-28 起存量为 0，出现即高危挡 build）
  const externs: { where: string; url: string }[] = []
  if (typeof t.thumbnail === 'string' && /^(https?:)?\/\//i.test(t.thumbnail)) externs.push({ where: 'thumbnail', url: t.thumbnail })
  for (const e of t.elements as any[]) if (e.type === 'image' && typeof e.src === 'string' && /^(https?:)?\/\//i.test(e.src)) externs.push({ where: e.id, url: e.src })
  for (const x of externs) push({ tpl: t.id, cat: t.category, el: x.where, kind: 'EXTERNAL-ASSET', sev: 3, detail: `外链素材 → 断网即挂：${x.url.slice(0, 70)}` })
  // ⑫ 编组覆盖统计：条码/齿孔/刻度这类"一个装饰拆成 N 个元素"必须整组选中/拖动，
  //    否则用户只能一根一根点。现在有两条路：模板显式 group，或按 id 前缀运行时推断。
  //    这里只统计覆盖率（不逐条报警），漏网的用「显式 group」或改名补上。
  const fam = new Map<string, number>()
  let groupedEls = 0
  for (const e of t.elements as any[]) {
    if (e.group) { fam.set(e.group, (fam.get(e.group) || 0) + 1); groupedEls++; continue }
    if ((e.type === 'shape' || e.type === 'image') && !e.editable && !e.locked) {
      const k = String(e.id).replace(/[-_]?\d+$/, '')
      if (k) fam.set(k, (fam.get(k) || 0) + 1)
    }
  }
  const autoCovered = [...fam.values()].filter((n) => n >= 3).length
  if (autoCovered) groupStat.tpl++
  groupStat.clusters += autoCovered
  groupStat.els += groupedEls
  const animN = t.elements.filter((e: any) => e.animation).length
  const enter = t.elements.filter((e: any) => e.animation && e.animation.iterationCount === undefined).length
  if (animN === 0) push({ tpl: t.id, cat: t.category, el: '-', kind: 'NO-MOTION', sev: 1, detail: `0/${t.elements.length} 动效` })
  else if (enter === 0) push({ tpl: t.id, cat: t.category, el: '-', kind: 'NO-ENTRANCE', sev: 1, detail: `${animN}/${t.elements.length} 全是循环，无入场层次` })
}

const stat = kinds_summary()
function kinds_summary() {
  const k = [...new Set(rows.map(r => r.kind))]
  return k.map(x => ({ x, l: rows.filter(r => r.kind === x) }))
}
console.log(`扫描 ${tpls.length} 个模板 / ${tpls.reduce((a, b) => a + b.t.elements.length, 0)} 元素，其中文字 ${tpls.reduce((a, b) => a + b.t.elements.filter(e => e.type === 'text').length, 0)} 个`)
console.log(`编组（整组选中/拖动）：覆盖 ${groupStat.tpl} 个模板 / ${groupStat.clusters} 簇，其中显式 group 元素 ${groupStat.els} 个\n`)
for (const { x, l } of stat.sort((a, b) => b.l.filter(r => r.sev >= 3).length - a.l.filter(r => r.sev >= 3).length))
  console.log(`${x.padEnd(14)} ${String(l.length).padStart(4)}   高 ${l.filter(r => r.sev >= 3).length} 中 ${l.filter(r => r.sev === 2).length}`)
for (const k of ['BAD-SVG-URI', 'TOKEN-MISS', 'EXTERNAL-ASSET', 'WRAP-SPILL', 'WORD-OVERFLOW', 'TEXT-CLIPPED', 'TEXT-CLASH', 'ALIGN-DRIFT', 'TYPE-MUSH', 'TIGHT-MARGIN', 'UNBALANCED', 'RECOLOR-DEAF', 'PRESET-GAP', 'TOKEN-ALIAS', 'GROUP-MISS', 'NO-MOTION', 'NO-ENTRANCE']) {
  const l = rows.filter(r => r.kind === k).sort((a, b) => b.sev - a.sev)
  if (!l.length) continue
  console.log(`\n════ ${k} (${l.length}：高 ${l.filter(r => r.sev >= 3).length} 中 ${l.filter(r => r.sev === 2).length}) ════`)
  for (const r of l.slice(0, k === 'ALIGN-DRIFT' ? 999 : k === 'TYPE-MUSH' ? 14 : 24)) console.log(` ${r.sev >= 3 ? '⚠' : r.sev === 2 ? '·' : ' '} [${r.cat}] ${r.tpl} :: ${r.el}\n      ${r.detail}`)
}
const cnt: Record<string, number> = {}
for (const r of rows) cnt[r.tpl] = (cnt[r.tpl] || 0) + (r.sev >= 3 ? 3 : r.sev === 2 ? 2 : 1)
console.log('\n════ 综合最差 25 ════')
for (const [id, n] of Object.entries(cnt).sort((a, b) => b[1] - a[1]).slice(0, 25)) console.log(`  ${String(n).padStart(3)}  ${id}`)

// ===== --fix：逐条给出改数依据 =====
if (process.argv.includes('--fix')) {
  const want = new Set(rows.filter(r => r.sev >= 3 && r.kind !== 'TEXT-CLASH').map(r => `${r.tpl}::${r.el}`))
  for (const r of rows) if (r.sev >= 3 && r.kind === 'TEXT-CLASH') for (const id of r.el.split('×')) want.add(`${r.tpl}::${id}`)
  console.log('\n════ FIX TABLE ════')
  for (const { t } of tpls) {
    const W = t.canvas.defaultWidth || t.canvas.virtualWidth
    const H = t.canvas.defaultHeight || t.canvas.virtualHeight
    const els = t.elements as any[]
    for (const e of els) {
      if (e.type !== 'text' || !want.has(`${t.id}::${e.id}`)) continue
      const size = e.fontSize, ls = e.letterSpacing || 0, lh = e.lineHeight || 1.2
      const lines = String(e.content).split('\n')
      const need = Math.max(...lines.map(l => tw(l, size, ls)), 0)
      const ne = Math.max(...String(e.content).split(/\s+/).map(s => tw(s, size, ls)), 0)
      const needH = lines.length * size * lh + size * .2
      const rightRoom = W - e.x - 16
      const shrink = need > e.width ? Math.floor(size * Math.min(1, rightRoom / need)) : size
      const below = els.filter(j => j !== e && j.y > e.y + 8 && (Math.min(e.x + e.width, (j.x ?? 0) + (j.width ?? 0)) - Math.max(e.x, j.x ?? 0)) > 10)
        .sort((a, b) => a.y - b.y)[0]
      console.log(`${t.id} :: ${e.id}`)
      console.log(`  现 x${e.x} y${e.y} w${e.width} h${e.height} fs${size} ls${ls} lh${lh} align${e.textAlign || 'left'} z${e.zIndex ?? '-'} rot${e.rotation ?? 0}  行${lines.length}`)
      console.log(`  需宽 ${need.toFixed(0)}（最长单词 ${ne.toFixed(0)}）｜盒 ${e.width} ｜右可用 ${rightRoom}｜需高 ${needH.toFixed(0)} vs 盒高 ${e.height}`)
      console.log(`  建议：width→${Math.min(Math.ceil(need * 1.12), rightRoom)}  height→${Math.ceil(needH * 1.1)}${shrink < size ? `（或 fontSize→${shrink}）` : ''}${below ? `｜下方最近 ${below.id} y=${below.y}` : ''}`)
      console.log(`  内容「${String(e.content).replace(/\n/g, '⏎').slice(0, 30)}」`)
    }
  }
}

// build 闸门：只卡高危（sev>=3）。低/中告警如 TIGHT-MARGIN 出血豁免属登记在案口径，不阻断。
if (process.argv.includes('--exit-on-high') && highCount() > 0) {
  console.error(`\n✖ 模板体检发现 ${highCount()} 条高危告警，build 终止。逐条清单见上方，或跑 npm run 体检模板 复核。`)
  process.exit(1)
}

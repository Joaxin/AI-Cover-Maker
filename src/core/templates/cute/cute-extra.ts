// src/core/templates/cute/cute-extra.ts
// 可爱风 10 个模板：兔/蜜桃/猫咖/晚安猫/软糖熊/恐龙/彩虹/抹茶/北极熊/奶茶
import type { Template } from '@/types/types'
import { seededInt } from '../_fx/common'

const seeded = seededInt

// 波点底纹
function dotsField(w: number, h: number, gap = 92, r = 11, fill = 'rgba(255,183,197,0.45)') {
  const dots: string[] = []
  for (let y = gap / 2; y < h; y += gap) for (let x = gap / 2; x < w; x += gap) {
    const off = (Math.round(y / gap) % 2) * (gap / 2)
    dots.push(`<circle cx='${x + off}' cy='${y}' r='${r}' fill='${fill}'/>`)
  }
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${dots.join('')}</svg>`
}
// 星星撒点（五角小星）
function starSprinkle(w: number, h: number, n = 34, seed = 520, fill = 'rgba(252,211,77,0.85)') {
  const rnd = seeded(seed); let s = ''
  for (let i = 0; i < n; i++) {
    const x = rnd() % w, y = rnd() % (h * 0.72), r = 4 + rnd() % 8, rot = rnd() % 45
    let pts = ''
    for (let k = 0; k < 10; k++) { const rr = k % 2 === 0 ? r : r * 0.45; const a = (Math.PI / 5) * k - Math.PI / 2; pts += `${(Math.cos(a) * rr).toFixed(1)},${(Math.sin(a) * rr).toFixed(1)} ` }
    s += `<polygon points='${pts.trim()}' fill='${fill}' transform='translate(${x} ${y}) rotate(${rot})'/>`
  }
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${s}</svg>`
}
// 飘雪点
function snowDrift(w: number, h: number, n = 60, seed = 77, fill = 'rgba(255,255,255,0.85)') {
  const rnd = seeded(seed); let c = ''
  for (let i = 0; i < n; i++) c += `<circle cx='${rnd() % w}' cy='${rnd() % h}' r='${3 + rnd() % 8}' fill='${fill}' opacity='${(0.35 + (rnd() % 55) / 100).toFixed(2)}'/>`
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${c}</svg>`
}
// 爱心撒点
function heartSprinkle(w: number, h: number, n = 16, seed = 33, fill = 'rgba(219,39,119,0.5)', size = 22) {
  const rnd = seeded(seed); let s = ''
  for (let i = 0; i < n; i++) {
    const x = rnd() % w, y = rnd() % h, k = (0.6 + (rnd() % 8) / 10)
    s += `<path d='M12 21C5 15 0 10.5 0 6.6 0 3 2.7 0 6 0c2.3 0 4.4 1.3 6 3.5C13.6 1.3 15.7 0 18 0c3.3 0 6 3 6 6.6 0 3.9-5 8.4-12 14.4z' fill='${fill}' transform='translate(${x} ${y}) scale(${k.toFixed(2)})'/>`
  }
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${s}</svg>`
}

// 四角星光（颜色用 rgba，避免和 3 色 token 打架）
function sparkle4(size: number, fill = 'rgba(255,255,255,0.92)') {
  const c = size / 2
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><path d='M${c} 2 Q ${c + size * 0.09} ${c - size * 0.09} ${size - 2} ${c} Q ${c + size * 0.09} ${c + size * 0.09} ${c} ${size - 2} Q ${c - size * 0.09} ${c + size * 0.09} 2 ${c} Q ${c - size * 0.09} ${c - size * 0.09} ${c} 2 Z' fill='${fill}'/></svg>`
}
// 铅笔波浪下划线
function squiggle(w: number, h: number, stroke: string, waves = 8) {
  const step = w / waves
  let d = `M0 ${h * 0.55}`
  for (let i = 0; i < waves; i++) d += ` Q ${(i + 0.5) * step} ${i % 2 ? h * 0.95 : h * 0.05} ${(i + 1) * step} ${h * 0.55}`
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><path d='${d}' fill='none' stroke='${stroke}' stroke-width='${Math.max(3, h * 0.22).toFixed(1)}' stroke-linecap='round'/></svg>`
}
// 和纸胶带斜纹
function stripes(w: number, h: number, fill: string, step = 16) {
  let s = ''
  for (let x = -h; x < w + h; x += step) s += `<path d='M${x} ${h} L${x + h} 0 L${x + h + 5} 0 L${x + 5} ${h} Z' fill='${fill}'/>`
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><g opacity='0.55'>${s}</g></svg>`
}
// 小票撕口锯齿（dir=down 齿朝下，贴在小票底边；up 齿朝上贴顶边）
function tornEdge(w: number, h: number, teeth: number, fill: string, dir: 'up' | 'down' = 'down') {
  const s = w / teeth, band = h * 0.45, pts: string[] = []
  if (dir === 'down') {
    pts.push(`0,0`, `${w},0`, `${w},${band.toFixed(1)}`)
    for (let i = teeth - 1; i >= 0; i--) pts.push(`${(i * s + s / 2).toFixed(1)},${h}`, `${(i * s).toFixed(1)},${band.toFixed(1)}`)
  } else {
    pts.push(`0,${h}`, `${w},${h}`, `${w},${(h - band).toFixed(1)}`)
    for (let i = teeth - 1; i >= 0; i--) pts.push(`${(i * s + s / 2).toFixed(1)},0`, `${(i * s).toFixed(1)},${(h - band).toFixed(1)}`)
  }
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><polygon points='${pts.join(' ')}' fill='${fill}'/></svg>`
}
// 条形码竖条
function barcode(w: number, h: number, fill = 'rgba(31,41,55,0.88)', seed = 7) {
  const rnd = seeded(seed); let x = 0, s = ''
  while (x < w - 3) {
    const bw = 2 + rnd() % 6
    s += `<rect x='${x.toFixed(1)}' y='0' width='${bw}' height='${h}' fill='${fill}'/>`
    x += bw + 2 + rnd() % 5
  }
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${s}</svg>`
}
// 热气三缕（甜品/饮料上方）
function steam(w: number, h: number, stroke: string) {
  let s = ''
  for (let i = 0; i < 3; i++) {
    const x = w * (0.2 + i * 0.3)
    s += `<path d='M${x.toFixed(1)} ${h} C ${(x - w * 0.09).toFixed(1)} ${(h * 0.7).toFixed(1)} ${(x + w * 0.09).toFixed(1)} ${(h * 0.42).toFixed(1)} ${x.toFixed(1)} ${(h * 0.12).toFixed(1)}' fill='none' stroke='${stroke}' stroke-width='${(w * 0.045).toFixed(1)}' stroke-linecap='round'/>`
  }
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${s}</svg>`
}
// 恐龙三趾脚印：从左下角一路走向右上，偶数行是另一只脚
function footprints(w: number, h: number, n: number, fill: string) {
  let s = ''
  for (let i = 0; i < n; i++) {
    const t = i / Math.max(1, n - 1)
    const x = w * (0.08 + t * 0.78), y = h * (0.9 - t * 0.74) + (i % 2 ? h * 0.1 : 0)
    const k = 0.7 + (i % 3) * 0.13, rot = i % 2 ? 14 : -10
    s += `<g transform='translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${rot}) scale(${k.toFixed(2)})' fill='${fill}'><ellipse cx='0' cy='8' rx='8' ry='11'/><ellipse cx='-13' cy='-6' rx='5' ry='9' transform='rotate(-28 -13 -6)'/><ellipse cx='0' cy='-12' rx='5' ry='10'/><ellipse cx='13' cy='-6' rx='5' ry='9' transform='rotate(28 13 -6)'/></g>`
  }
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${s}</svg>`
}
// 六角雪花（六条主臂 + 每臂一对侧枝，一眼是雪花）
function snowflake(size: number, stroke = 'rgba(255,255,255,0.95)') {
  const c = size / 2, r = c * 0.84
  let arms = ''
  for (let i = 0; i < 6; i++) {
    arms += `<g transform='rotate(${i * 60} ${c} ${c})'><line x1='${c}' y1='${c}' x2='${c}' y2='${(c - r).toFixed(1)}'/><line x1='${c}' y1='${(c - r * 0.58).toFixed(1)}' x2='${(c - r * 0.3).toFixed(1)}' y2='${(c - r * 0.82).toFixed(1)}'/><line x1='${c}' y1='${(c - r * 0.58).toFixed(1)}' x2='${(c + r * 0.3).toFixed(1)}' y2='${(c - r * 0.82).toFixed(1)}'/><line x1='${c}' y1='${(c - r * 0.3).toFixed(1)}' x2='${(c - r * 0.18).toFixed(1)}' y2='${(c - r * 0.5).toFixed(1)}'/><line x1='${c}' y1='${(c - r * 0.3).toFixed(1)}' x2='${(c + r * 0.18).toFixed(1)}' y2='${(c - r * 0.5).toFixed(1)}'/></g>`
  }
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><g fill='none' stroke='${stroke}' stroke-width='${(size * 0.055).toFixed(1)}' stroke-linecap='round'>${arms}</g></svg>`
}

// ===== 原创 sprite =====
// 小兔脸（粉白）
const BUNNY = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="340" viewBox="0 0 300 340"><ellipse cx="105" cy="70" rx="30" ry="68" fill="%23FFFFFF" stroke="%23E5C6CE" stroke-width="4"/><ellipse cx="195" cy="70" rx="30" ry="68" fill="%23FFFFFF" stroke="%23E5C6CE" stroke-width="4"/><ellipse cx="105" cy="76" rx="14" ry="46" fill="%23FFB7C5"/><ellipse cx="195" cy="76" rx="14" ry="46" fill="%23FFB7C5"/><ellipse cx="150" cy="225" rx="112" ry="98" fill="%23FFFFFF" stroke="%23E5C6CE" stroke-width="4"/><circle cx="112" cy="205" r="10" fill="%234B3B45"/><circle cx="188" cy="205" r="10" fill="%234B3B45"/><ellipse cx="150" cy="238" rx="12" ry="9" fill="%23FF8FAB"/><path d="M150 247v14M150 261c-9 10-24 8-28-2M150 261c9 10 24 8 28-2" fill="none" stroke="%234B3B45" stroke-width="5" stroke-linecap="round"/><circle cx="86" cy="240" r="14" fill="%23FFB7C5" opacity="0.75"/><circle cx="214" cy="240" r="14" fill="%23FFB7C5" opacity="0.75"/></svg>'
// 云朵
const CLOUD = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="260" height="140" viewBox="0 0 260 140"><g fill="%23FFFFFF"><circle cx="70" cy="86" r="44"/><circle cx="130" cy="60" r="52"/><circle cx="196" cy="88" r="40"/><rect x="46" y="82" width="170" height="48" rx="24"/></g></svg>'
// 蜜桃
const PEACH = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="320" height="360" viewBox="0 0 320 360"><path d="M160 70C90 70 40 128 40 200s56 130 120 130 120-58 120-130S230 70 160 70z" fill="%23FFC6B3"/><path d="M160 70c-34 46-34 214 0 260 34-46 34-214 0-260z" fill="%23FFAD8F" opacity="0.65"/><circle cx="104" cy="216" r="20" fill="%23FF8A7A" opacity="0.6"/><circle cx="216" cy="216" r="20" fill="%23FF8A7A" opacity="0.6"/><circle cx="128" cy="178" r="9" fill="%23573B32"/><circle cx="192" cy="178" r="9" fill="%23573B32"/><path d="M160 196c-6 8-16 8-20 0M160 196c6 8 16 8 20 0" fill="none" stroke="%23573B32" stroke-width="6" stroke-linecap="round"/><path d="M160 72c2-30 26-50 56-52-2 30-26 50-56 52z" fill="%2374C47C"/></svg>'
// 猫剪影（坐姿，暖棕）
const CATSIT = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="240" height="280" viewBox="0 0 240 280"><path d="M60 250c-16-6-26-22-24-40 3-25 26-38 44-52 14-11 20-26 22-44 2-22 12-40 30-50l-6-24 22 14c10-3 22-3 32 0l20-14-5 24c20 10 30 30 30 52 0 40-18 74-44 98-16 15-22 26-24 40z" fill="%23A9746A"/><path d="M176 158c22-8 42 6 44 28 2 24-18 40-42 40" fill="none" stroke="%23A9746A" stroke-width="20" stroke-linecap="round"/><circle cx="118" cy="98" r="6" fill="%23FDF6EC"/><circle cx="146" cy="98" r="6" fill="%23FDF6EC"/></svg>'
// 咖啡杯
const COFFEECUP = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="220" height="180" viewBox="0 0 220 180"><path d="M30 60h130v54c0 28-24 46-65 46S30 142 30 114z" fill="%23FDF6EC" stroke="%2378350F" stroke-width="6"/><path d="M160 70h22c16 0 28 12 28 26s-12 26-28 26h-26" fill="none" stroke="%2378350F" stroke-width="6"/><path d="M42 74h106v10c0 24-20 38-53 38s-53-14-53-38z" fill="%23B47A4F"/><path d="M70 36c0-12 10-12 10-24M110 36c0-12 10-12 10-24" fill="none" stroke="%23C8A98C" stroke-width="7" stroke-linecap="round"/></svg>'
// 月亮
const CRESCENT = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><path d="M136 24a84 84 0 1 0 40 128A70 70 0 0 1 136 24z" fill="%23FCD34D"/><circle cx="92" cy="70" r="10" fill="%23F5B93B" opacity="0.6"/><circle cx="70" cy="120" r="14" fill="%23F5B93B" opacity="0.5"/></svg>'
// 睡猫（团身闭眼）
const SLEEPYCAT = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="340" height="220" viewBox="0 0 340 220"><ellipse cx="170" cy="140" rx="140" ry="66" fill="%238E7CC3"/><path d="M300 150c26-4 38 14 32 34" fill="none" stroke="%238E7CC3" stroke-width="22" stroke-linecap="round"/><circle cx="96" cy="110" r="54" fill="%239D8BD1"/><polygon points="60,72 54,30 92,58" fill="%239D8BD1"/><polygon points="124,62 142,24 152,66" fill="%239D8BD1"/><polygon points="64,62 61,38 84,56" fill="%23F9A8D4"/><polygon points="126,58 136,34 142,60" fill="%23F9A8D4"/><path d="M74 112c6 7 15 7 21 0M104 112c6 7 15 7 21 0" fill="none" stroke="%23312A4A" stroke-width="5.5" stroke-linecap="round"/><path d="M94 124c-4 5-11 5-15 0M94 124c4 5 11 5 15 0" fill="none" stroke="%23312A4A" stroke-width="5" stroke-linecap="round"/><circle cx="60" cy="130" r="9" fill="%23F9A8D4" opacity="0.7"/><circle cx="132" cy="128" r="9" fill="%23F9A8D4" opacity="0.7"/></svg>'
// 软糖小熊（颜色可注入，需 %23 编码）
function gummyBear(fill: string): string {
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="140" height="150" viewBox="0 0 140 150"><g fill="${fill}"><circle cx="42" cy="26" r="15"/><circle cx="98" cy="26" r="15"/><circle cx="70" cy="40" r="30"/><rect x="36" y="60" width="68" height="62" rx="26"/><circle cx="28" cy="82" r="15"/><circle cx="112" cy="82" r="15"/><circle cx="46" cy="130" r="16"/><circle cx="94" cy="130" r="16"/></g><ellipse cx="70" cy="96" rx="20" ry="17" fill="%23FFFFFF" opacity="0.4"/><circle cx="58" cy="36" r="4.5" fill="%23FFFFFF" opacity="0.85"/><circle cx="82" cy="36" r="4.5" fill="%23FFFFFF" opacity="0.85"/></svg>`
}
// 抱抱小恐龙（薄荷绿，圆滚）
const DINO = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="360" height="320" viewBox="0 0 360 320"><g fill="%236FCF8B"><circle cx="180" cy="180" r="120"/><circle cx="228" cy="86" r="62"/></g><polygon points="180,58 200,16 222,58" fill="%23F9A84C"/><polygon points="126,70 138,28 162,72" fill="%23F9A84C"/><polygon points="234,56 256,20 268,60" fill="%23F9A84C"/><path d="M64 210c-30 6-46 26-44 52 26 10 52 0 66-20z" fill="%236FCF8B"/><circle cx="248" cy="80" r="9" fill="%2327422E"/><circle cx="208" cy="102" r="7" fill="%2327422E" opacity="0"/><path d="M238 98c8 8 20 8 28 0" fill="none" stroke="%2327422E" stroke-width="5.5" stroke-linecap="round"/><circle cx="268" cy="104" r="11" fill="%23FFB1C1" opacity="0.85"/><circle cx="132" cy="188" r="30" fill="%23A7E8B8"/><path d="M120 138c0 14 10 22 10 22" stroke="%23FFFFFF" stroke-width="0" fill="none"/></svg>'
// 拱形彩虹（粉彩五条）
const RAINBOW = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="480" height="260" viewBox="0 0 480 260"><g fill="none" stroke-width="34" stroke-linecap="round"><path d="M40 240a200 200 0 0 1 400 0" stroke="%23F9A8D4"/><path d="M78 240a162 162 0 0 1 324 0" stroke="%23FDBA74"/><path d="M116 240a124 124 0 0 1 248 0" stroke="%23FDE68A"/><path d="M154 240a86 86 0 0 1 172 0" stroke="%23A7F3D0"/><path d="M192 240a48 48 0 0 1 96 0" stroke="%23BFDBFE"/></g></svg>'
// 抹茶蛋糕切件
const CAKE = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="260" height="230" viewBox="0 0 260 230"><path d="M30 210 130 40l100 170z" fill="%23DCEBC8"/><path d="M52 172h156l14 24H38z" fill="%23A5C88A"/><path d="M68 138h124l10 18H58z" fill="%23F6F0E4"/><path d="M86 106h88l8 16H78z" fill="%23A5C88A"/><circle cx="130" cy="44" r="16" fill="%23E35D6B"/><path d="M130 28c8-14 22-14 28-4-12 2-20 8-28 22" fill="%235E8C4A"/></svg>'
// 团子串
const DANGO = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="270" viewBox="0 0 80 270"><rect x="35" y="10" width="10" height="250" rx="5" fill="%23C9A06B"/><circle cx="40" cy="52" r="36" fill="%23F6F0E4"/><circle cx="40" cy="130" r="36" fill="%23A5C88A"/><circle cx="40" cy="208" r="36" fill="%23F4A7C3"/></svg>'
// 北极熊
const POLAR = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="360" height="280" viewBox="0 0 360 280"><g fill="%23FFFFFF" stroke="%23B9CFDD" stroke-width="5"><ellipse cx="190" cy="180" rx="140" ry="92"/><circle cx="96" cy="120" r="66"/><circle cx="52" cy="72" r="22"/><circle cx="126" cy="64" r="22"/><rect x="96" y="224" width="44" height="48" rx="20"/><rect x="228" y="224" width="44" height="48" rx="20"/></g><circle cx="74" cy="112" r="8.5" fill="%23334155"/><circle cx="116" cy="106" r="8.5" fill="%23334155"/><ellipse cx="94" cy="142" rx="15" ry="11" fill="%23334155"/><path d="M38 176h116c10 0 10 30 0 30H38c-16 0-16-30 0-30z" fill="%23F97316"/><path d="M148 180v56" stroke="%23EA6A0B" stroke-width="15" stroke-linecap="round"/><circle cx="58" cy="132" r="10" fill="%23FFC9B0" opacity="0.9"/><circle cx="138" cy="126" r="10" fill="%23FFC9B0" opacity="0.9"/></svg>'
// 珍珠奶茶杯
const BOBA = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="260" height="420" viewBox="0 0 260 420"><path d="M40 60h180l-16 320c-1 20-16 30-74 30s-73-10-74-30z" fill="%23F3E3CE" stroke="%238C5A3C" stroke-width="6"/><path d="M46 140h168l-10 240c-1 18-15 28-74 28s-73-10-74-28z" fill="%23D9A66C"/><path d="M52 260h156l-6 120c-1 16-14 24-72 24s-71-8-72-24z" fill="%238C5A3C"/><g fill="%234A2E1F"><circle cx="86" cy="366" r="18"/><circle cx="128" cy="384" r="18"/><circle cx="172" cy="364" r="18"/><circle cx="108" cy="342" r="16"/><circle cx="152" cy="340" r="16"/></g><rect x="150" y="8" width="26" height="120" rx="12" fill="%23F472B6" transform="rotate(14 163 68)"/><path d="M40 60h180" stroke="%238C5A3C" stroke-width="8"/><circle cx="96" cy="216" r="9" fill="%23FFFFFF" opacity="0.6"/></svg>'

// 抹茶叶（一片带主脉 + 三条细脉）
const LEAF = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="150" height="120" viewBox="0 0 150 120"><path d="M136 8C70 8 20 46 12 100c-1 7 2 12 6 13 60 8 114-36 122-98 1-5-1-8-4-7z" fill="%23A5C88A"/><path d="M22 110C52 80 90 42 128 16" fill="none" stroke="%2354803F" stroke-width="6" stroke-linecap="round"/><path d="M60 88 66 62M86 66 94 38M40 104 44 84" fill="none" stroke="%2354803F" stroke-width="4" stroke-linecap="round" opacity="0.8"/></svg>'
// 积雪小松树（三层三角 + 每层一顶雪帽 + 树干）
const PINE = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="170" height="230" viewBox="0 0 170 230"><rect x="76" y="186" width="18" height="40" rx="6" fill="%238B5E3C"/><polygon points="85,8 138,86 32,86" fill="%232F7A55"/><polygon points="85,58 152,150 18,150" fill="%23357F5A"/><polygon points="85,110 162,196 8,196" fill="%233D8A62"/><path d="M85 8 118 58 85 48 52 58z" fill="%23FFFFFF" opacity="0.92"/><path d="M85 58 128 108 85 96 42 108z" fill="%23FFFFFF" opacity="0.85"/><path d="M85 110 134 158 85 146 36 158z" fill="%23FFFFFF" opacity="0.78"/></svg>'
// 恐龙蛋（奶白壳 + 绿斑点 + 一圈裂纹）
const EGG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="130" height="160" viewBox="0 0 130 160"><ellipse cx="65" cy="90" rx="54" ry="66" fill="%23FDF6E3" stroke="%23C9A06B" stroke-width="5"/><g fill="%23A5C88A"><circle cx="42" cy="60" r="9"/><circle cx="88" cy="86" r="11"/><circle cx="56" cy="124" r="8"/><circle cx="94" cy="128" r="6"/></g><path d="M18 88 32 96 44 84 58 94 70 82 84 92 96 80 108 88" fill="none" stroke="%23C9A06B" stroke-width="5" stroke-linecap="round"/></svg>'
// 雪人（三段身子 + 胡萝卜鼻 + 树枝手）
const SNOWMAN = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="150" height="210" viewBox="0 0 150 210"><g fill="%23FFFFFF" stroke="%23B9CFDD" stroke-width="5"><circle cx="75" cy="162" r="46"/><circle cx="75" cy="96" r="34"/><circle cx="75" cy="44" r="27"/></g><circle cx="65" cy="38" r="4.5" fill="%23334155"/><circle cx="86" cy="38" r="4.5" fill="%23334155"/><polygon points="75,44 96,52 75,56" fill="%23F97316"/><path d="M75 66c5 5 12 5 17 0" fill="none" stroke="%23334155" stroke-width="4" stroke-linecap="round"/><path d="M42 96 12 76M108 96 138 76" fill="none" stroke="%238B5E3C" stroke-width="6" stroke-linecap="round"/><circle cx="58" cy="52" r="7" fill="%23FFC9B0" opacity="0.85"/><circle cx="93" cy="52" r="7" fill="%23FFC9B0" opacity="0.85"/><g fill="%23334155"><circle cx="75" cy="88" r="4"/><circle cx="75" cy="106" r="4"/></g><g fill="%23334155"><circle cx="75" cy="150" r="4"/><circle cx="75" cy="170" r="4"/></g></svg>'

const ROUNDED = 'Varela Round, Yuanti SC, "PingFang SC", "Microsoft YaHei", sans-serif'
const KAITI = 'STKaiti, KaiTi, serif'
const SANS = 'Helvetica, Arial, sans-serif'
const MONO = 'Consolas, Menlo, "Courier New", monospace'

const CUTE_COLORS = (labels: [string, string, string], defs: [string, string, string], opts: string[][]) => ({
  bg: { label: labels[0], default: defs[0], options: opts[0] },
  primary: { label: labels[1], default: defs[1], options: opts[1] },
  accent: { label: labels[2], default: defs[2], options: opts[2] }
})

export const cuteExtraTemplates: Template[] = [
  // 1. 云朵小兔（1:1）
  {
    id: 'cute-cloud-bunny', name: '云朵小兔', version: '1.0.0', category: 'cute',
    tags: ['cute', 'bunny', 'cloud', 'pastel', '1:1'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23eaf6ff"/><rect x="3.5" y="3.5" width="93" height="93" rx="6" fill="none" stroke="%23ffb7c5" stroke-width="1.8" stroke-dasharray="5 4" opacity="0.8"/><rect x="6.5" y="6.5" width="87" height="87" rx="5" fill="none" stroke="%234a6fa5" stroke-width="0.6" stroke-dasharray="3 3" opacity="0.3"/><ellipse cx="18" cy="15" rx="11" ry="5" fill="%23fff"/><ellipse cx="81" cy="25" rx="12" ry="5.5" fill="%23fff" opacity="0.95"/><ellipse cx="65" cy="12.5" rx="5.5" ry="2.6" fill="%23fff" opacity="0.75"/><ellipse cx="27" cy="78" rx="10" ry="4.2" fill="%23fff" opacity="0.9"/><ellipse cx="77" cy="78" rx="8" ry="3.6" fill="%23fff" opacity="0.85"/><ellipse cx="50" cy="80" rx="19" ry="3.5" fill="%234a6fa5" opacity="0.1"/><circle cx="50" cy="57" r="21" fill="none" stroke="%23ffb7c5" stroke-width="1.1" stroke-dasharray="4 3" opacity="0.8"/><ellipse cx="42" cy="30" rx="5" ry="12" fill="%23fff"/><ellipse cx="58" cy="30" rx="5" ry="12" fill="%23fff"/><ellipse cx="50" cy="58" rx="20" ry="17" fill="%23fff"/><circle cx="44" cy="56" r="2" fill="%234b3b45"/><circle cx="56" cy="56" r="2" fill="%234b3b45"/><rect x="30" y="7" width="40" height="4.5" rx="2.2" fill="%234a6fa5" opacity="0.5"/><rect x="38" y="13" width="24" height="2.5" rx="1.2" fill="%23ffb7c5" opacity="0.85"/><path d="M86 10.6 L86.95 13.05 L89.4 14 L86.95 14.95 L86 17.4 L85.05 14.95 L83.6 14 L85.05 13.05 Z" fill="%23ffb7c5"/><path d="M12 69.2 L12.78 71.2 L14.8 72 L12.78 72.78 L12 74.8 L11.22 72.78 L9.2 72 L11.22 71.2 Z" fill="%23ffb7c5" opacity="0.8"/><path d="M66 39.9 L66.6 41.4 L68.2 42 L66.6 42.6 L66 44.1 L65.4 42.6 L63.8 42 L65.4 41.4 Z" fill="%23fff" opacity="0.95"/><rect x="91" y="45" width="1.8" height="1.8" fill="%234a6fa5" opacity="0.5"/><rect x="91" y="50" width="1.8" height="1.8" fill="%234a6fa5" opacity="0.45"/><rect x="91" y="55" width="1.8" height="1.8" fill="%234a6fa5" opacity="0.4"/><rect x="91" y="60" width="1.8" height="1.8" fill="%234a6fa5" opacity="0.35"/><rect x="72" y="86" width="17" height="5" rx="2.5" fill="%23ffb7c5" opacity="0.45"/><rect x="75.5" y="87.6" width="10" height="1.8" rx="0.9" fill="%234a6fa5" opacity="0.6"/><rect x="33" y="88" width="30" height="2" rx="1" fill="%234a6fa5" opacity="0.32"/><circle cx="14" cy="89.5" r="1.5" fill="%23ffb7c5" opacity="0.5"/><circle cx="18.6" cy="89.5" r="1.2" fill="%23ffb7c5" opacity="0.36"/><circle cx="22.4" cy="89.5" r="1" fill="%23ffb7c5" opacity="0.24"/></svg>',
    tokens: {
      colors: CUTE_COLORS(['天空', '文字', '樱粉'], ['#EAF6FF', '#4A6FA5', '#FFB7C5'],
        [['#EAF6FF', '#FFF3EC', '#F3F7EC', '#2E2852'], ['#4A6FA5', '#9A3412', '#3F6212', '#F9F1FF'], ['#FFB7C5', '#FB7185', '#86EFAC', '#FCD34D']]),
      fonts: { heading: { label: '标题字体', default: ROUNDED, options: [ROUNDED, KAITI, 'Comic Sans MS, cursive'] } }
    },
    presets: [
      { name: '晴空小兔', colors: { bg: '#EAF6FF', primary: '#4A6FA5', accent: '#FFB7C5' } },
      { name: '蜜桃奶橘', colors: { bg: '#FFF3EC', primary: '#9A3412', accent: '#FB7185' } },
      { name: '抹茶牛奶', colors: { bg: '#F3F7EC', primary: '#3F6212', accent: '#86EFAC' } },
      { name: '晚安星野', colors: { bg: '#2E2852', primary: '#F9F1FF', accent: '#FCD34D' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1080, defaultWidth: 1080, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'cb-dots', type: 'image', src: dotsField(1080, 1080, 108, 10, 'rgba(180,213,240,0.5)'), x: 0, y: 0, width: 1080, height: 1080, zIndex: 0 },
      { id: 'cb-cloud1', group: 'cb-cloud', type: 'image', src: CLOUD, x: 70, y: 96, width: 260, height: 140, zIndex: 1, animation: { name: 'drift', duration: 6000, iterationCount: 'infinite' }, editable: { position: true, size: { type: 'scale' } } },
      { id: 'cb-cloud2', group: 'cb-cloud', type: 'image', src: CLOUD, x: 730, y: 190, width: 290, height: 156, zIndex: 1, animation: { name: 'float', duration: 4200, iterationCount: 'infinite' }, editable: { position: true, size: { type: 'scale' } } },
      { id: 'cb-cloud3', group: 'cb-cloud', type: 'image', src: CLOUD, x: 180, y: 780, width: 220, height: 118, zIndex: 1, opacity: 0.85, animation: { name: 'drift', duration: 7200, iterationCount: 'infinite' }, editable: { position: true, size: { type: 'scale' } } },
      { id: 'cb-title', type: 'text', content: '今天也要\n元气满满', fontFamily: { $t: 'fonts.heading' }, fontSize: 92, fontWeight: '800', color: { $t: 'colors.primary' }, textAlign: 'center', lineHeight: 1.35, x: 120, y: 130, width: 840, height: 250, zIndex: 3, animation: { name: 'bounce', duration: 1400 }, editable: { content: true, fontSize: { type: 'range', min: 60, max: 120 }, position: true } },
      { id: 'cb-sub', type: 'text', content: '· KEEP SMILING · 摸摸头 ·', fontFamily: KAITI, fontSize: 32, color: { $t: 'colors.accent' }, textAlign: 'center', letterSpacing: 5, x: 240, y: 384, width: 600, height: 44, zIndex: 3, editable: { content: true } },
      { id: 'cb-bunny', type: 'image', src: BUNNY, x: 390, y: 520, width: 300, height: 340, zIndex: 2, animation: { name: 'float', duration: 3600, iterationCount: 'infinite' }, editable: { position: true, size: { type: 'scale' } } },
      { id: 'cb-ring', type: 'shape', shapeKind: 'circle', x: 322, y: 470, width: 436, height: 436, fill: 'rgba(0,0,0,0)', border: { color: { $t: 'colors.accent' } as any, width: 5, style: 'dashed' as const }, opacity: 0.8, zIndex: 1 },
      { id: 'cb-heart-l', type: 'text', content: '♡', fontFamily: SANS, fontSize: 56, color: { $t: 'colors.accent' }, x: 250, y: 560, width: 60, height: 60, zIndex: 3, animation: { name: 'heartbeat', duration: 2200, iterationCount: 'infinite' } },
      { id: 'cb-heart-r', type: 'text', content: '♡', fontFamily: SANS, fontSize: 44, color: { $t: 'colors.accent' }, x: 780, y: 620, width: 50, height: 50, zIndex: 3, animation: { name: 'heartbeat', duration: 2600, delay: 500, iterationCount: 'infinite' } },
      { id: 'cb-sign', type: 'text', content: 'From. 你的小兔', fontFamily: KAITI, fontSize: 26, color: { $t: 'colors.primary' }, opacity: 0.6, textAlign: 'center', x: 380, y: 950, width: 320, height: 36, zIndex: 3, editable: { content: true } },
      // —— 加密度：虚线双框 / 脚下云影 / 星光三点 / 两朵小云 / 右侧竖排小字 / 打卡胶囊 / 页脚三点 ——
      { id: 'cb-frame', type: 'shape', shapeKind: 'rect', x: 36, y: 36, width: 1008, height: 1008, fill: 'rgba(0,0,0,0)', border: { color: { $t: 'colors.accent' } as any, width: 9, style: 'dashed' as const }, borderRadius: 58, opacity: 0.75, zIndex: 4 },
      { id: 'cb-frame2', type: 'shape', shapeKind: 'rect', x: 64, y: 64, width: 952, height: 952, fill: 'rgba(0,0,0,0)', border: { color: { $t: 'colors.primary' } as any, width: 3, style: 'dashed' as const }, borderRadius: 44, opacity: 0.3, zIndex: 4 },
      { id: 'cb-ground', type: 'shape', shapeKind: 'circle', x: 336, y: 838, width: 408, height: 84, fill: { $t: 'colors.primary' }, opacity: 0.1, zIndex: 1 },
      { id: 'cb-cloud4', group: 'cb-cloud', type: 'image', src: CLOUD, x: 742, y: 794, width: 176, height: 94, objectFit: 'contain', opacity: 0.8, zIndex: 1, animation: { name: 'drift', duration: 7200, iterationCount: 'infinite' }, editable: { position: true, size: { type: 'scale' } } },
      { id: 'cb-cloud5', group: 'cb-cloud', type: 'image', src: CLOUD, x: 650, y: 104, width: 118, height: 63, objectFit: 'contain', opacity: 0.7, zIndex: 1, animation: { name: 'float', duration: 4800, delay: 400, iterationCount: 'infinite' }, editable: { position: true, size: { type: 'scale' } } },
      { id: 'cb-sparkle-a', type: 'image', src: sparkle4(46, 'rgba(255,183,197,0.95)'), x: 924, y: 104, width: 46, height: 46, objectFit: 'contain', zIndex: 3, animation: { name: 'sparkle', duration: 2800, iterationCount: 'infinite' } },
      { id: 'cb-sparkle-b', type: 'image', src: sparkle4(34, 'rgba(255,183,197,0.8)'), x: 132, y: 704, width: 34, height: 34, objectFit: 'contain', zIndex: 3, animation: { name: 'sparkle', duration: 3400, delay: 800, iterationCount: 'infinite' } },
      { id: 'cb-sparkle-c', type: 'image', src: sparkle4(26, 'rgba(255,255,255,0.95)'), x: 664, y: 430, width: 26, height: 26, objectFit: 'contain', zIndex: 3, animation: { name: 'sparkle', duration: 3000, delay: 1500, iterationCount: 'infinite' } },
      { id: 'cb-vlabel', type: 'text', content: '云\n端\n有\n糖', fontFamily: KAITI, fontSize: 28, color: { $t: 'colors.primary' }, opacity: 0.5, lineHeight: 1.7, x: 952, y: 430, width: 34, height: 200, zIndex: 3, editable: { content: true } as any },
      { id: 'cb-pill', type: 'shape', shapeKind: 'rect', x: 788, y: 928, width: 172, height: 50, fill: { $t: 'colors.accent' }, opacity: 0.18, borderRadius: 25, border: { color: { $t: 'colors.accent' } as any, width: 3, style: 'solid' as const }, zIndex: 4 },
      { id: 'cb-pill-t', type: 'text', content: '打卡 +1', fontFamily: KAITI, fontSize: 26, fontWeight: '700', color: { $t: 'colors.primary' }, opacity: 0.85, textAlign: 'center', lineHeight: 1.9, x: 788, y: 928, width: 172, height: 50, zIndex: 5, editable: { content: true } },
      ...([[128, 0.5], [158, 0.36], [188, 0.24]] as any[]).map(([cx, op], i) => ({ id: `cb-pip-${i}`, type: 'shape' as const, shapeKind: 'circle' as const, x: cx, y: 966 - i, width: 14 - i * 2, height: 14 - i * 2, fill: { $t: 'colors.accent' } as any, opacity: op, zIndex: 3 }))
    ]
  },
  // 2. 蜜桃波波（4:5）
  {
    id: 'cute-peach-pop', name: '蜜桃波波', version: '1.0.0', category: 'cute',
    tags: ['cute', 'peach', 'pop', 'summer', '4:5'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="125" viewBox="0 0 100 125"><rect width="100" height="125" fill="%23fff3ec"/><circle cx="50" cy="62" r="26" fill="%23ffc6b3"/><path d="M50 36c1-8 7-13 15-14-1 8-7 13-15 14z" fill="%2374c47c"/><circle cx="34" cy="20" r="6" fill="%23ffad8f" opacity="0.6"/><circle cx="72" cy="100" r="8" fill="%23ff8a7a" opacity="0.4"/></svg>',
    tokens: {
      colors: CUTE_COLORS(['汽水底', '文字', '蜜桃'], ['#FFF3EC', '#9A3412', '#FB7185'],
        [['#FFF3EC', '#FFE9EF', '#FDF6EC', '#FFF8E1'], ['#9A3412', '#BE123C', '#78350F', '#15803D'], ['#FB7185', '#F97316', '#F472B6', '#34D399']]),
      fonts: { heading: { label: '标题字体', default: ROUNDED, options: [ROUNDED, KAITI, SANS] } }
    },
    presets: [
      { name: '蜜桃汽水', colors: { bg: '#FFF3EC', primary: '#9A3412', accent: '#FB7185' } },
      { name: '桃桃玫瑰', colors: { bg: '#FFE9EF', primary: '#BE123C', accent: '#F472B6' } },
      { name: '焦糖奶茶', colors: { bg: '#FDF6EC', primary: '#78350F', accent: '#F97316' } },
      { name: '青提气泡', colors: { bg: '#FFF8E1', primary: '#15803D', accent: '#34D399' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'pp-dots', type: 'image', src: dotsField(1080, 1350, 120, 14, 'rgba(255,173,143,0.35)'), x: 0, y: 0, width: 1080, height: 1350, zIndex: 0 },
      { id: 'pp-title', type: 'text', content: '蜜桃苏打', fontFamily: { $t: 'fonts.heading' }, fontSize: 138, fontWeight: '900', color: { $t: 'colors.primary' }, textAlign: 'center', letterSpacing: 8, x: 90, y: 100, width: 900, height: 170, zIndex: 3, animation: { name: 'zoomIn', duration: 700 }, editable: { content: true, fontSize: { type: 'range', min: 90, max: 170 }, position: true } },
      { id: 'pp-title-en', type: 'text', content: 'PEACH FIZZ · 夏日限定', fontFamily: SANS, fontSize: 28, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 8, textAlign: 'center', x: 240, y: 276, width: 600, height: 38, zIndex: 3, editable: { content: true } },
      { id: 'pp-peach', type: 'image', src: PEACH, x: 360, y: 400, width: 360, height: 405, zIndex: 2, animation: { name: 'swing', duration: 3800, iterationCount: 'infinite' } },
      { id: 'pp-bubble1', group: 'pp-bubble', type: 'shape', shapeKind: 'circle', x: 200, y: 460, width: 90, height: 90, fill: 'rgba(0,0,0,0)', border: { color: { $t: 'colors.accent' } as any, width: 5, style: 'solid' as const }, opacity: 0.55, zIndex: 1, animation: { name: 'rise', duration: 4800, iterationCount: 'infinite' } },
      { id: 'pp-bubble2', group: 'pp-bubble', type: 'shape', shapeKind: 'circle', x: 810, y: 560, width: 58, height: 58, fill: { $t: 'colors.accent' }, opacity: 0.3, zIndex: 1, animation: { name: 'rise', duration: 3800, delay: 800, iterationCount: 'infinite' } },
      { id: 'pp-bubble3', group: 'pp-bubble', type: 'shape', shapeKind: 'circle', x: 296, y: 700, width: 40, height: 40, fill: { $t: 'colors.accent' }, opacity: 0.4, zIndex: 1, animation: { name: 'rise', duration: 5200, delay: 1500, iterationCount: 'infinite' } },
      { id: 'pp-bubble4', group: 'pp-bubble', type: 'shape', shapeKind: 'circle', x: 770, y: 400, width: 26, height: 26, fill: 'rgba(0,0,0,0)', border: { color: { $t: 'colors.primary' } as any, width: 4, style: 'solid' as const }, opacity: 0.35, zIndex: 1, animation: { name: 'rise', duration: 6000, delay: 500, iterationCount: 'infinite' } },
      { id: 'pp-copy', type: 'text', content: '一口陷入软fuzzy的甜\n腮红是秋天偷偷亲的', fontFamily: KAITI, fontSize: 40, color: { $t: 'colors.primary' }, textAlign: 'center', lineHeight: 1.65, x: 140, y: 880, width: 800, height: 140, zIndex: 3, animation: { name: 'fadeInUp', duration: 800 }, editable: { content: true, fontSize: { type: 'range', min: 28, max: 54 }, position: true } },
      { id: 'pp-tag-bg', type: 'shape', shapeKind: 'rect', x: 340, y: 1084, width: 400, height: 76, fill: { $t: 'colors.primary' }, borderRadius: 38, zIndex: 2, rotation: -2 },
      { id: 'pp-tag', type: 'text', content: 'SINCE 2026 · 鲜果现打', fontFamily: ROUNDED, fontSize: 28, fontWeight: '700', color: { $t: 'colors.bg' }, textAlign: 'center', x: 340, y: 1102, width: 400, height: 40, zIndex: 3, rotation: -2, editable: { content: true } },
      { id: 'pp-foot', type: 'text', content: '★ 冰镇后风味更佳 ★', fontFamily: KAITI, fontSize: 26, color: { $t: 'colors.accent' }, textAlign: 'center', letterSpacing: 4, x: 300, y: 1224, width: 480, height: 34, zIndex: 3, editable: { content: true } }
    ]
  },
  // 3. 猫咪咖啡馆（9:16）
  {
    id: 'cute-cat-cafe', name: '猫咪咖啡馆', version: '1.0.0', category: 'cute',
    tags: ['cute', 'cat', 'cafe', 'menu', '9:16'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="90" height="160" viewBox="0 0 90 160"><rect width="90" height="160" fill="%23fdf6ec"/><path d="M25 50V28l12 9 8-14 8 14 12-9v22" fill="none" stroke="%23a9746a" stroke-width="4"/><rect x="18" y="96" width="54" height="34" rx="6" fill="%2378350f"/><circle cx="45" cy="70" r="3" fill="%23f59e0b"/></svg>',
    tokens: {
      colors: CUTE_COLORS(['奶咖底', '深焙', '琥珀'], ['#FDF6EC', '#78350F', '#F59E0B'],
        [['#FDF6EC', '#F6EFE6', '#FDF0F3', '#EFF3EC'], ['#78350F', '#44403C', '#7C2D12', '#3F4A3C'], ['#F59E0B', '#EC4899', '#10B981', '#6366F1', '#B45309']]),
      fonts: { heading: { label: '标题字体', default: KAITI, options: [KAITI, ROUNDED, 'Songti SC, SimSun, serif'] } }
    },
    presets: [
      { name: '深焙奶咖', colors: { bg: '#FDF6EC', primary: '#78350F', accent: '#F59E0B' } },
      { name: '可可拿铁', colors: { bg: '#F6EFE6', primary: '#44403C', accent: '#B45309' } },
      { name: '猫咪莓莓', colors: { bg: '#FDF0F3', primary: '#7C2D12', accent: '#EC4899' } },
      { name: '抹茶澳白', colors: { bg: '#EFF3EC', primary: '#3F4A3C', accent: '#10B981' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1920, defaultWidth: 1080, defaultHeight: 1920, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'cc-arch', type: 'shape', shapeKind: 'rect', x: 240, y: 90, width: 600, height: 560, fill: '#CFE7F5', borderRadius: 300, zIndex: 1 },
      { id: 'cc-arch-frame', type: 'shape', shapeKind: 'rect', x: 240, y: 90, width: 600, height: 560, fill: 'rgba(0,0,0,0)', border: { color: { $t: 'colors.primary' } as any, width: 8, style: 'solid' as const }, borderRadius: 300, zIndex: 3 },
      { id: 'cc-mullion-v', type: 'shape', shapeKind: 'rect', x: 534, y: 90, width: 12, height: 560, fill: { $t: 'colors.primary' }, opacity: 0.9, zIndex: 4 },
      { id: 'cc-mullion-h', type: 'shape', shapeKind: 'rect', x: 240, y: 366, width: 600, height: 12, fill: { $t: 'colors.primary' }, opacity: 0.9, zIndex: 4 },
      { id: 'cc-cat', type: 'image', src: CATSIT, x: 410, y: 380, width: 260, height: 304, zIndex: 2, animation: { name: 'float', duration: 4200, iterationCount: 'infinite' } },
      { id: 'cc-sun', type: 'shape', shapeKind: 'circle', x: 640, y: 150, width: 64, height: 64, fill: '#FDE68A', opacity: 0.9, zIndex: 2, animation: { name: 'twinkle', duration: 3200, iterationCount: 'infinite' } },
      { id: 'cc-title', type: 'text', content: '猫咪咖啡馆', fontFamily: { $t: 'fonts.heading' }, fontSize: 96, fontWeight: '900', color: { $t: 'colors.primary' }, textAlign: 'center', letterSpacing: 6, x: 90, y: 720, width: 900, height: 130, zIndex: 3, animation: { name: 'bounce', duration: 1200 }, editable: { content: true, fontSize: { type: 'range', min: 64, max: 124 }, position: true } },
      { id: 'cc-title-en', type: 'text', content: 'CAT & COFFEE · OPEN 10:00 - 20:00', fontFamily: MONO, fontSize: 26, color: { $t: 'colors.accent' }, letterSpacing: 4, textAlign: 'center', x: 140, y: 856, width: 800, height: 34, zIndex: 3, editable: { content: true } },
      { id: 'cc-cup', type: 'image', src: COFFEECUP, x: 80, y: 936, width: 200, height: 164, zIndex: 3, animation: { name: 'wobble', duration: 3000, iterationCount: 'infinite' } },
      { id: 'cc-board', type: 'shape', shapeKind: 'rect', x: 120, y: 1180, width: 840, height: 480, fill: { $t: 'colors.primary' }, borderRadius: 28, zIndex: 2, animation: { name: 'fadeInUp', duration: 800 } },
      { id: 'cc-board-inner', type: 'shape', shapeKind: 'rect', x: 142, y: 1202, width: 796, height: 436, fill: 'rgba(0,0,0,0)', border: { color: { $t: 'colors.bg' } as any, width: 3, style: 'dashed' as const }, borderRadius: 18, opacity: 0.6, zIndex: 3 },
      { id: 'cc-menu-h', type: 'text', content: '· 今日菜单 MENU ·', fontFamily: KAITI, fontSize: 40, fontWeight: '700', color: { $t: 'colors.accent' }, textAlign: 'center', letterSpacing: 6, x: 300, y: 1236, width: 480, height: 52, zIndex: 4, editable: { content: true } },
      { id: 'cc-menu1', type: 'text', content: '猫爪拿铁 Cat Paw Latte　　¥ 28', fontFamily: ROUNDED, fontSize: 33, color: { $t: 'colors.bg' }, x: 220, y: 1322, width: 660, height: 44, zIndex: 4, editable: { content: true } },
      { id: 'cc-menu2', type: 'text', content: '呼噜可可 Purring Cocoa　　¥ 32', fontFamily: ROUNDED, fontSize: 33, color: { $t: 'colors.bg' }, x: 220, y: 1404, width: 660, height: 44, zIndex: 4, editable: { content: true } },
      { id: 'cc-menu3', type: 'text', content: '肉球抹茶 Ball Matcha　　¥ 30', fontFamily: ROUNDED, fontSize: 33, color: { $t: 'colors.bg' }, x: 220, y: 1486, width: 660, height: 44, zIndex: 4, editable: { content: true } },
      { id: 'cc-menu4', type: 'text', content: '晒肚皮美式 Belly-up Espresso　¥ 25', fontFamily: ROUNDED, fontSize: 33, color: { $t: 'colors.accent' }, x: 220, y: 1568, width: 700, height: 44, zIndex: 4, editable: { content: true } },
      { id: 'cc-foot', type: 'text', content: '店内有 6 只常驻店员，撸猫请轻手轻脚 ♪', fontFamily: KAITI, fontSize: 30, color: { $t: 'colors.primary' }, opacity: 0.75, textAlign: 'center', x: 140, y: 1740, width: 800, height: 40, zIndex: 3, editable: { content: true } },
      { id: 'cc-hearts', type: 'image', src: heartSprinkle(1080, 1920, 14, 88, 'rgba(245,158,11,0.35)'), x: 0, y: 0, width: 1080, height: 1920, zIndex: 0 }
    ]
  },
  // 4. 星空猫猫枕（1:1）
  {
    id: 'cute-starry-kitty', name: '星空猫猫枕', version: '1.0.0', category: 'cute',
    tags: ['cute', 'night', 'cat', 'goodnight', '1:1'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%232e2852"/><path d="M72 18a16 16 0 1 0 8 26 13 13 0 0 1-8-26z" fill="%23fcd34d"/><ellipse cx="46" cy="72" rx="28" ry="13" fill="%238e7cc3"/><circle cx="28" cy="66" r="10" fill="%239d8bd1"/><rect x="12" y="30" width="3" height="3" fill="%23fcd34d"/><rect x="34" y="22" width="3" height="3" fill="%23fcd34d"/></svg>',
    tokens: {
      colors: CUTE_COLORS(['夜幕', '月光', '星黄'], ['#2E2852', '#F9F1FF', '#FCD34D'],
        [['#2E2852', '#1E1B4B', '#0F2233', '#3B2430'], ['#F9F1FF', '#EEF2FF', '#E0F2FE', '#FDF2F8'], ['#FCD34D', '#A78BFA', '#7DD3FC', '#F9A8D4']]),
      fonts: { heading: { label: '标题字体', default: KAITI, options: [KAITI, ROUNDED, 'Georgia, serif'] } }
    },
    presets: [
      { name: '暮紫星野', colors: { bg: '#2E2852', primary: '#F9F1FF', accent: '#FCD34D' } },
      { name: '靛蓝夜读', colors: { bg: '#1E1B4B', primary: '#EEF2FF', accent: '#A78BFA' } },
      { name: '深海眠眠', colors: { bg: '#0F2233', primary: '#E0F2FE', accent: '#7DD3FC' } },
      { name: '梅子酒夜', colors: { bg: '#3B2430', primary: '#FDF2F8', accent: '#F9A8D4' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1080, defaultWidth: 1080, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'sk-stars', type: 'image', src: starSprinkle(1080, 1080, 40, 520, 'rgba(252,211,77,0.8)'), x: 0, y: 0, width: 1080, height: 1080, zIndex: 0, animation: { name: 'twinkle', duration: 3600, iterationCount: 'infinite' } },
      { id: 'sk-moon', type: 'image', src: CRESCENT, x: 780, y: 90, width: 200, height: 200, zIndex: 2, animation: { name: 'float', duration: 5200, iterationCount: 'infinite' } },
      { id: 'sk-title', type: 'text', content: '晚安，好梦', fontFamily: { $t: 'fonts.heading' }, fontSize: 100, fontWeight: '900', color: { $t: 'colors.primary' }, textAlign: 'center', letterSpacing: 10, x: 120, y: 150, width: 840, height: 140, zIndex: 3, animation: { name: 'fadeIn', duration: 1000 }, editable: { content: true, fontSize: { type: 'range', min: 64, max: 130 }, position: true } },
      { id: 'sk-sub', type: 'text', content: 'GOOD NIGHT · 星星替我值夜班', fontFamily: KAITI, fontSize: 30, color: { $t: 'colors.accent' }, textAlign: 'center', letterSpacing: 5, x: 240, y: 300, width: 600, height: 40, zIndex: 3, animation: { name: 'fadeIn', duration: 900, delay: 350 }, editable: { content: true } },
      { id: 'sk-z1', type: 'text', content: 'z', fontFamily: 'Georgia, serif', fontSize: 46, fontWeight: '700', color: { $t: 'colors.primary' }, opacity: 0.65, x: 620, y: 470, width: 60, height: 60, zIndex: 3, animation: { name: 'rise', duration: 3400, iterationCount: 'infinite' } },
      { id: 'sk-z2', type: 'text', content: 'Z', fontFamily: 'Georgia, serif', fontSize: 62, fontWeight: '700', color: { $t: 'colors.primary' }, opacity: 0.5, x: 680, y: 420, width: 70, height: 80, zIndex: 3, animation: { name: 'rise', duration: 3400, delay: 700, iterationCount: 'infinite' } },
      { id: 'sk-z3', type: 'text', content: 'z', fontFamily: 'Georgia, serif', fontSize: 36, fontWeight: '700', color: { $t: 'colors.primary' }, opacity: 0.75, x: 570, y: 520, width: 50, height: 50, zIndex: 3, animation: { name: 'rise', duration: 3400, delay: 1400, iterationCount: 'infinite' } },
      { id: 'sk-cat', type: 'image', src: SLEEPYCAT, x: 200, y: 560, width: 480, height: 310, zIndex: 2, animation: { name: 'heartbeat', duration: 4600, iterationCount: 'infinite' } },
      { id: 'sk-pillow', type: 'shape', shapeKind: 'rect', x: 150, y: 830, width: 580, height: 46, fill: { $t: 'colors.primary' }, opacity: 0.15, borderRadius: 23, zIndex: 1 },
      { id: 'sk-copy', type: 'text', content: '把今天的不开心折好，\n交给月亮保管一晚。', fontFamily: KAITI, fontSize: 30, color: { $t: 'colors.primary' }, opacity: 0.85, lineHeight: 1.7, x: 700, y: 640, width: 320, height: 110, zIndex: 3, editable: { content: true, fontSize: { type: 'range', min: 22, max: 30 }, position: true } },
      { id: 'sk-sign', type: 'text', content: '—— 猫与月亮事务所', fontFamily: KAITI, fontSize: 24, color: { $t: 'colors.accent' }, opacity: 0.8, x: 156, y: 960, width: 400, height: 34, zIndex: 3, editable: { content: true } }
    ]
  },
  // 5. 软糖小熊（4:5）
  {
    id: 'cute-gummy-bear', name: '软糖小熊', version: '1.0.0', category: 'cute',
    tags: ['cute', 'gummy', 'candy', 'dessert', '4:5'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="125" viewBox="0 0 100 125"><rect width="100" height="125" fill="%23fff0f5"/><rect x="20" y="40" width="60" height="46" rx="14" fill="%23fff"/><circle cx="34" cy="56" r="8" fill="%23fb7185"/><circle cx="58" cy="56" r="8" fill="%23a78bfa"/><circle cx="34" cy="74" r="8" fill="%2334d399"/><circle cx="58" cy="74" r="8" fill="%23FDE047"/></svg>',
    tokens: {
      colors: CUTE_COLORS(['糖纸', '文字', '果酱'], ['#FFF0F5', '#BE185D', '#7C3AED'],
        [['#FFF0F5', '#FEF9E7', '#F0F7FF', '#F1FBF4'], ['#BE185D', '#B45309', '#1D4ED8', '#15803D'], ['#7C3AED', '#EC4899', '#F59E0B', '#10B981']]),
      fonts: { heading: { label: '标题字体', default: ROUNDED, options: [ROUNDED, KAITI, 'Comic Sans MS, cursive'] } }
    },
    presets: [
      { name: '莓果汽水', colors: { bg: '#FFF0F5', primary: '#BE185D', accent: '#7C3AED' } },
      { name: '焦糖布丁', colors: { bg: '#FEF9E7', primary: '#B45309', accent: '#EC4899' } },
      { name: '蓝莓冰沙', colors: { bg: '#F0F7FF', primary: '#1D4ED8', accent: '#F59E0B' } },
      { name: '青苹果派', colors: { bg: '#F1FBF4', primary: '#15803D', accent: '#10B981' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'gb-hearts', type: 'image', src: heartSprinkle(1080, 1350, 18, 41, 'rgba(236,72,153,0.28)'), x: 0, y: 0, width: 1080, height: 1350, zIndex: 0 },
      { id: 'gb-card', type: 'shape', shapeKind: 'rect', x: 110, y: 130, width: 860, height: 640, fill: '#FFFFFF', border: { color: { $t: 'colors.accent' } as any, width: 8, style: 'dashed' as const }, borderRadius: 56, zIndex: 1, animation: { name: 'zoomIn', duration: 600 } },
      { id: 'gb-title', type: 'text', content: '软糖小熊商店', fontFamily: { $t: 'fonts.heading' }, fontSize: 96, fontWeight: '900', color: { $t: 'colors.primary' }, textAlign: 'center', letterSpacing: 4, x: 160, y: 190, width: 760, height: 130, zIndex: 3, animation: { name: 'bounce', duration: 1200 }, editable: { content: true, fontSize: { type: 'range', min: 60, max: 120 }, position: true } },
      { id: 'gb-sub', type: 'text', content: 'GUMMY BEAR PANTRY · 每周一至周五 甜蜜营业', fontFamily: SANS, fontSize: 24, color: { $t: 'colors.accent' }, letterSpacing: 3, textAlign: 'center', x: 160, y: 326, width: 760, height: 34, zIndex: 3, editable: { content: true } },
      { id: 'gb-bear-pink', type: 'image', src: gummyBear('%23FB7185'), x: 210, y: 396, width: 150, height: 160, zIndex: 4, animation: { name: 'wobble', duration: 2600, iterationCount: 'infinite' } },
      { id: 'gb-bear-violet', type: 'image', src: gummyBear('%23A78BFA'), x: 400, y: 430, width: 170, height: 182, zIndex: 4, animation: { name: 'wobble', duration: 3000, delay: 300, iterationCount: 'infinite' } },
      { id: 'gb-bear-mint', type: 'image', src: gummyBear('%2334D399'), x: 610, y: 402, width: 146, height: 156, zIndex: 4, animation: { name: 'wobble', duration: 2800, delay: 600, iterationCount: 'infinite' } },
      { id: 'gb-bear-lemon', type: 'image', src: gummyBear('%23FDE047'), x: 790, y: 446, width: 130, height: 140, zIndex: 4, animation: { name: 'wobble', duration: 3200, delay: 900, iterationCount: 'infinite' } },
      { id: 'gb-flavor', type: 'text', content: '今日口味：草莓 / 葡萄 / 青苹果 / 柠檬', fontFamily: KAITI, fontSize: 36, color: { $t: 'colors.primary' }, textAlign: 'center', x: 150, y: 640, width: 780, height: 50, zIndex: 4, animation: { name: 'fadeInUp', duration: 700, delay: 400 }, editable: { content: true, fontSize: { type: 'range', min: 26, max: 48 }, position: true } },
      { id: 'gb-price-ring', type: 'shape', shapeKind: 'circle', x: 444, y: 830, width: 192, height: 192, fill: { $t: 'colors.accent' }, zIndex: 2, animation: { name: 'pulse', duration: 2400, iterationCount: 'infinite' } },
      { id: 'gb-price', type: 'text', content: '¥ 9.9\n/ 袋', fontFamily: ROUNDED, fontSize: 46, fontWeight: '900', color: '#FFFFFF', textAlign: 'center', lineHeight: 1.25, x: 444, y: 862, width: 192, height: 120, zIndex: 3, editable: { content: true } },
      { id: 'gb-note-l', type: 'text', content: '零香精\n零色素', fontFamily: KAITI, fontSize: 30, color: { $t: 'colors.primary' }, opacity: 0.75, textAlign: 'center', lineHeight: 1.5, x: 170, y: 880, width: 180, height: 90, zIndex: 3, editable: { content: true } },
      { id: 'gb-note-r', type: 'text', content: '嚼起来\n像在笑', fontFamily: KAITI, fontSize: 30, color: { $t: 'colors.primary' }, opacity: 0.75, textAlign: 'center', lineHeight: 1.5, x: 730, y: 880, width: 180, height: 90, zIndex: 3, editable: { content: true } },
      { id: 'gb-strip', type: 'shape', shapeKind: 'rect', x: 14, y: 1116, width: 1052, height: 120, fill: { $t: 'colors.primary' }, opacity: 0.08, borderRadius: 60, zIndex: 1 },
      { id: 'gb-strip-txt', type: 'text', content: '★ STRAWBERRY ★ GRAPE ★ APPLE ★ LEMON ★ MIX ★', fontFamily: ROUNDED, fontSize: 28, fontWeight: '700', color: { $t: 'colors.primary' }, textAlign: 'center', letterSpacing: 4, x: 60, y: 1152, width: 960, height: 40, zIndex: 3, animation: { name: 'gradientPan', duration: 4000, iterationCount: 'infinite' }, editable: { content: true } },
      { id: 'gb-foot', type: 'text', content: '买三袋送一只玻璃罐 · 冷藏更 Q', fontFamily: KAITI, fontSize: 27, color: { $t: 'colors.accent' }, textAlign: 'center', x: 260, y: 1262, width: 560, height: 36, zIndex: 3, editable: { content: true } }
    ]
  },
  // 6. 抱抱小恐龙（1:1）
  {
    id: 'cute-dinosaur-hug', name: '抱抱小恐龙', version: '1.1.0', category: 'cute',
    tags: ['cute', 'dinosaur', 'hug', 'kids', '1:1'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23effbef"/><circle cx="48" cy="58" r="24" fill="%236fcf8b"/><circle cx="62" cy="38" r="12" fill="%236fcf8b"/><polygon points="58,26 64,14 70,26" fill="%23f9a84c"/><circle cx="66" cy="36" r="2.5" fill="%2327422e"/><rect x="16" y="14" width="68" height="4" fill="%236fcf8b" opacity="0.35"/></svg>',
    tokens: {
      colors: CUTE_COLORS(['草地', '文字', '橘棘'], ['#EFFBEF', '#1F5B33', '#FB923C'],
        [['#EFFBEF', '#FFF6E9', '#EDF6FF', '#FFF0F5'], ['#1F5B33', '#7C4A03', '#1E4B7A', '#8A2B55'], ['#FB923C', '#F472B6', '#38BDF8', '#A3E635']]),
      fonts: { heading: { label: '标题字体', default: ROUNDED, options: [ROUNDED, KAITI, 'Comic Sans MS, cursive'] } }
    },
    presets: [
      { name: '薄荷草原', colors: { bg: '#EFFBEF', primary: '#1F5B33', accent: '#FB923C' } },
      { name: '暖阳沙丘', colors: { bg: '#FFF6E9', primary: '#7C4A03', accent: '#F472B6' } },
      { name: '雨后天蓝', colors: { bg: '#EDF6FF', primary: '#1E4B7A', accent: '#38BDF8' } },
      { name: '樱花粉粉', colors: { bg: '#FFF0F5', primary: '#8A2B55', accent: '#A3E635' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1080, defaultWidth: 1080, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'dh-glow', type: 'overlay', background: 'radial-gradient(circle at 50% 60%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 58%)', x: 0, y: 0, width: 1080, height: 1080, zIndex: 0 },
      { id: 'dh-dots', type: 'image', src: dotsField(1080, 1080, 104, 10, 'rgba(126,199,140,0.28)'), x: 0, y: 0, width: 1080, height: 1080, objectFit: 'fill', zIndex: 0, animation: { name: 'pulse', duration: 6000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'dh-leaf-l', type: 'image', src: LEAF, x: 44, y: 44, width: 214, height: 171, objectFit: 'contain', rotation: -16, zIndex: 1, animation: { name: 'swing', duration: 5600, iterationCount: 'infinite', easing: 'ease-in-out' }, editable: { position: true, size: { type: 'scale' } } },
      { id: 'dh-leaf-r', type: 'image', src: LEAF, x: 836, y: 896, width: 196, height: 157, objectFit: 'contain', rotation: 162, zIndex: 1, animation: { name: 'swing', duration: 6400, delay: 700, iterationCount: 'infinite', easing: 'ease-in-out' }, editable: { position: true, size: { type: 'scale' } } },
      { id: 'dh-title-sq', type: 'image', src: squiggle(430, 22, 'rgba(31,91,51,0.34)', 7), x: 326, y: 226, width: 430, height: 22, objectFit: 'fill', zIndex: 3, animation: { name: 'inkReveal', duration: 1200, delay: 520 } },
      { id: 'dh-frame', type: 'shape', shapeKind: 'rect', x: 36, y: 36, width: 1008, height: 1008, fill: 'rgba(0,0,0,0)', border: { color: { $t: 'colors.accent' } as any, width: 10, style: 'dashed' as const }, borderRadius: 64, zIndex: 4 },
      { id: 'dh-title', type: 'text', content: '抱一抱，没关系', fontFamily: { $t: 'fonts.heading' }, fontSize: 88, fontWeight: '900', color: { $t: 'colors.primary' }, textAlign: 'center', letterSpacing: 4, x: 110, y: 110, width: 860, height: 120, zIndex: 3, animation: { name: 'fadeInDown', duration: 800 }, editable: { content: true, fontSize: { type: 'range', min: 56, max: 112 }, position: true } },
      { id: 'dh-sub', type: 'text', content: 'HUG DELIVERY · 今日额度已备好', fontFamily: SANS, fontSize: 25, color: { $t: 'colors.accent' }, letterSpacing: 4, textAlign: 'center', x: 240, y: 266, width: 600, height: 34, zIndex: 3, animation: { name: 'slideUpFade', duration: 700, delay: 360 }, editable: { content: true } },
      { id: 'dh-dino', type: 'image', src: DINO, x: 300, y: 330, width: 480, height: 427, zIndex: 2, animation: { name: 'swing', duration: 4200, iterationCount: 'infinite' } },
      { id: 'dh-shadow', type: 'shape', shapeKind: 'circle', x: 330, y: 700, width: 420, height: 90, fill: { $t: 'colors.primary' }, opacity: 0.1, zIndex: 1 },
      { id: 'dh-arm-l', type: 'text', content: 'づ◕‿◕づ', fontFamily: SANS, fontSize: 40, color: { $t: 'colors.primary' }, opacity: 0.7, textAlign: 'center', x: 120, y: 520, width: 220, height: 50, zIndex: 3, animation: { name: 'pulse', duration: 2600, iterationCount: 'infinite' } },
      { id: 'dh-bubble', type: 'shape', shapeKind: 'rect', x: 712, y: 316, width: 228, height: 90, fill: 'rgba(255,255,255,0.95)', borderRadius: 45, border: { color: { $t: 'colors.primary' } as any, width: 4, style: 'solid' as const }, zIndex: 5, rotation: 5, animation: { name: 'swing', duration: 4600, iterationCount: 'infinite', easing: 'ease-in-out' }, editable: { position: true } },
      { id: 'dh-bubble-t', type: 'text', content: '抱一下！', fontFamily: KAITI, fontSize: 38, fontWeight: '700', color: { $t: 'colors.primary' }, textAlign: 'center', lineHeight: 2.3, x: 712, y: 316, width: 228, height: 90, rotation: 5, zIndex: 6, editable: { content: true } },
      { id: 'dh-bubble-tail', type: 'shape', shapeKind: 'circle', x: 686, y: 392, width: 28, height: 28, fill: 'rgba(255,255,255,0.95)', border: { color: { $t: 'colors.primary' } as any, width: 4, style: 'solid' as const }, zIndex: 5 },
      { id: 'dh-bubble-tail2', type: 'shape', shapeKind: 'circle', x: 664, y: 428, width: 15, height: 15, fill: 'rgba(255,255,255,0.95)', zIndex: 5 },
      { id: 'dh-arm-r', type: 'text', content: '(⌒▽⌒)⊃♡', fontFamily: SANS, fontSize: 38, color: { $t: 'colors.primary' }, opacity: 0.65, textAlign: 'center', x: 806, y: 646, width: 200, height: 48, zIndex: 3, animation: { name: 'heartbeat', duration: 2600, delay: 400, iterationCount: 'infinite' } },
      { id: 'dh-egg', type: 'image', src: EGG, x: 84, y: 654, width: 116, height: 143, objectFit: 'contain', rotation: -8, zIndex: 4, animation: { name: 'float', duration: 4200, delay: 200, iterationCount: 'infinite', easing: 'ease-in-out' }, editable: { position: true, size: { type: 'scale' } } },
      { id: 'dh-egg2', type: 'image', src: EGG, x: 898, y: 780, width: 94, height: 116, objectFit: 'contain', rotation: 12, zIndex: 4, animation: { name: 'float', duration: 5000, delay: 900, iterationCount: 'infinite', easing: 'ease-in-out' }, editable: { position: true, size: { type: 'scale' } } },
      { id: 'dh-footprint1', group: 'dh-footprint', type: 'shape', shapeKind: 'circle', x: 962, y: 456, width: 26, height: 30, fill: { $t: 'colors.accent' }, opacity: 0.55, zIndex: 2, animation: { name: 'float', duration: 3200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'dh-footprint2', group: 'dh-footprint', type: 'shape', shapeKind: 'circle', x: 986, y: 540, width: 22, height: 26, fill: { $t: 'colors.accent' }, opacity: 0.45, zIndex: 2, animation: { name: 'float', duration: 3200, delay: 420, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'dh-footprint3', group: 'dh-footprint', type: 'shape', shapeKind: 'circle', x: 958, y: 618, width: 18, height: 22, fill: { $t: 'colors.accent' }, opacity: 0.35, zIndex: 2, animation: { name: 'float', duration: 3200, delay: 840, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'dh-heart-b', type: 'text', content: '♡', fontFamily: SANS, fontSize: 54, color: { $t: 'colors.accent' }, x: 856, y: 200, width: 60, height: 58, zIndex: 3, animation: { name: 'rise', duration: 4200, iterationCount: 'infinite' } },
      { id: 'dh-sparkle-a', type: 'image', src: sparkle4(42, 'rgba(249,168,76,0.9)'), x: 148, y: 302, width: 42, height: 42, objectFit: 'contain', zIndex: 3, animation: { name: 'sparkle', duration: 2800, iterationCount: 'infinite' } },
      { id: 'dh-sparkle-b', type: 'image', src: sparkle4(30, 'rgba(249,168,76,0.8)'), x: 244, y: 452, width: 30, height: 30, objectFit: 'contain', zIndex: 3, animation: { name: 'sparkle', duration: 3400, delay: 800, iterationCount: 'infinite' } },
      { id: 'dh-sparkle-c', type: 'image', src: sparkle4(26, 'rgba(255,255,255,0.95)'), x: 322, y: 884, width: 26, height: 26, objectFit: 'contain', zIndex: 3, animation: { name: 'sparkle', duration: 3000, delay: 1500, iterationCount: 'infinite' } },
      { id: 'dh-frame2', type: 'shape', shapeKind: 'rect', x: 62, y: 62, width: 956, height: 956, fill: 'rgba(0,0,0,0)', border: { color: { $t: 'colors.primary' } as any, width: 3, style: 'dashed' as const }, borderRadius: 48, opacity: 0.32, zIndex: 4 },
      { id: 'dh-copy', type: 'text', content: '今天也可以像小恐龙一样，\n张大嘴巴把烦恼啊呜吃掉。', fontFamily: KAITI, fontSize: 36, color: { $t: 'colors.primary' }, textAlign: 'center', lineHeight: 1.6, x: 190, y: 790, width: 700, height: 110, zIndex: 3, animation: { name: 'fadeInUp', duration: 800, delay: 300 }, editable: { content: true, fontSize: { type: 'range', min: 26, max: 46 }, position: true } },
      { id: 'dh-sign', type: 'text', content: '· 侏罗纪最软投递员 No.7 ·', fontFamily: KAITI, fontSize: 24, color: { $t: 'colors.primary' }, opacity: 0.55, textAlign: 'center', x: 320, y: 952, width: 440, height: 32, zIndex: 3, animation: { name: 'fadeIn', duration: 900, delay: 700 }, editable: { content: true } }
    ]
  },
  // 7. 彩虹摇篮 · 百日纪念（9:16）
  {
    id: 'cute-rainbow-crib', name: '彩虹百日纪念', version: '1.0.0', category: 'cute',
    tags: ['cute', 'baby', 'rainbow', 'milestone', '9:16'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23fff8f0"/><path d="M25 78a25 25 0 0 1 50 0" fill="none" stroke="%23f9a8d4" stroke-width="7"/><path d="M36 78a14 14 0 0 1 28 0" fill="none" stroke="%23fde68a" stroke-width="7"/><circle cx="50" cy="38" r="12" fill="%23fdba74" opacity="0.7"/></svg>',
    tokens: {
      colors: CUTE_COLORS(['宣纸奶白', '暖棕墨', '粉黛'], ['#FFF8F0', '#B45309', '#F9A8D4'],
        [['#FFF8F0', '#F3F7EC', '#2E2852', '#EFF6FF'], ['#B45309', '#3F6212', '#F9F1FF', '#0C4A6E'], ['#F9A8D4', '#6EE7B7', '#FCD34D', '#38BDF8']]),
      fonts: { heading: { label: '标题字体', default: ROUNDED, options: [ROUNDED, KAITI, 'Comic Sans MS, cursive'] } }
    },
    presets: [
      { name: '暖阳粉黛', colors: { bg: '#FFF8F0', primary: '#B45309', accent: '#F9A8D4' } },
      { name: '薄荷清晨', colors: { bg: '#F3F7EC', primary: '#3F6212', accent: '#6EE7B7' } },
      { name: '星空夜话', colors: { bg: '#2E2852', primary: '#F9F1FF', accent: '#FCD34D' } },
      { name: '海盐冰蓝', colors: { bg: '#EFF6FF', primary: '#0C4A6E', accent: '#38BDF8' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1920, defaultWidth: 1080, defaultHeight: 1920, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'rc-dots', type: 'image', src: dotsField(1080, 1920, 122, 9, 'rgba(249,168,212,0.26)'), x: 0, y: 0, width: 1080, height: 1920, zIndex: 0 },
      { id: 'rc-stars', type: 'image', src: starSprinkle(1080, 640, 22, 131, 'rgba(251,191,36,0.65)'), objectFit: 'contain', objectPosition: 'center 0%', x: 0, y: 0, width: 1080, height: 1920, zIndex: 1, animation: { name: 'twinkle', duration: 3200, iterationCount: 'infinite' } },
      { id: 'rc-title', type: 'text', content: '小满的一百日', fontFamily: { $t: 'fonts.heading' }, fontSize: 104, fontWeight: '900', color: { $t: 'colors.primary' }, textAlign: 'center', letterSpacing: 6, x: 90, y: 150, width: 900, height: 130, zIndex: 3, animation: { name: 'zoomIn', duration: 900 }, editable: { content: true, fontSize: { type: 'range', min: 64, max: 130 }, position: true } },
      { id: 'rc-en', type: 'text', content: 'HAPPY 100 DAYS', fontFamily: SANS, fontSize: 30, color: { $t: 'colors.accent' }, textAlign: 'center', letterSpacing: 12, x: 240, y: 302, width: 600, height: 40, zIndex: 3, editable: { content: true } },
      { id: 'rc-sub', type: 'text', content: '谢谢你选中我们当爸妈', fontFamily: KAITI, fontSize: 34, color: { $t: 'colors.primary' }, opacity: 0.85, textAlign: 'center', letterSpacing: 4, x: 240, y: 356, width: 600, height: 44, zIndex: 3, animation: { name: 'fadeInUp', duration: 800, delay: 300 }, editable: { content: true } },
      { id: 'rc-frame', type: 'shape', shapeKind: 'rect', x: 196, y: 476, width: 688, height: 688, fill: 'transparent', border: { color: { $t: 'colors.accent' }, width: 4, style: 'dashed' }, borderRadius: 344, zIndex: 2 },
      { id: 'rc-photo', type: 'image', src: '/images/photo/baby-100days-680x680.jpg', objectFit: 'cover', x: 220, y: 500, width: 640, height: 640, borderRadius: 320, zIndex: 3, editable: { src: { type: 'upload' }, position: true, size: { type: 'scale' } } },
      { id: 'rc-row1', type: 'text', content: '出生 · 2026.06.11 · 3.42kg', fontFamily: KAITI, fontSize: 32, color: { $t: 'colors.primary' }, opacity: 0.85, textAlign: 'center', x: 190, y: 1246, width: 700, height: 42, zIndex: 3, editable: { content: true } },
      { id: 'rc-row2', type: 'text', content: '百日 · 2026.09.19 · 7.10kg', fontFamily: KAITI, fontSize: 32, color: { $t: 'colors.primary' }, opacity: 0.85, textAlign: 'center', x: 190, y: 1300, width: 700, height: 42, zIndex: 3, editable: { content: true } },
      { id: 'rc-rainbow', type: 'image', src: RAINBOW, x: 262, y: 1430, width: 556, height: 302, zIndex: 2, animation: { name: 'float', duration: 5600, iterationCount: 'infinite' } },
      { id: 'rc-cloud-l', type: 'image', src: CLOUD, x: 96, y: 1622, width: 250, height: 135, zIndex: 3, animation: { name: 'drift', duration: 6800, iterationCount: 'infinite' } },
      { id: 'rc-cloud-r', type: 'image', src: CLOUD, x: 726, y: 1612, width: 272, height: 147, zIndex: 3, animation: { name: 'float', duration: 4600, iterationCount: 'infinite' } },
      { id: 'rc-hearts', type: 'image', src: heartSprinkle(1080, 400, 10, 47, 'rgba(244,114,182,0.4)', 18), objectFit: 'contain', objectPosition: 'center 95.39%', x: 0, y: 0, width: 1080, height: 1920, zIndex: 1, opacity: 0.8 },
      { id: 'rc-sign', type: 'text', content: '· 林家小满 成长纪念 ·', fontFamily: KAITI, fontSize: 26, color: { $t: 'colors.accent' }, opacity: 0.9, textAlign: 'center', letterSpacing: 4, x: 240, y: 1806, width: 600, height: 36, zIndex: 3, editable: { content: true } }
    ]
  },
  // 8. 抹茶甜品铺（16:9）
  {
    id: 'cute-matcha-desert', name: '抹茶甜品铺', version: '1.1.0', category: 'cute',
    tags: ['cute', 'matcha', 'dessert', 'menu', '16:9'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23f3f7ec"/><path d="M22 74 46 34l24 40z" fill="%23a5c88a"/><rect x="30" y="56" width="32" height="7" fill="%23f6f0e4"/><circle cx="46" cy="32" r="6" fill="%23e35d6b"/></svg>',
    tokens: {
      colors: CUTE_COLORS(['宣纸抹茶', '抹茶深', '焦糖'], ['#F3F7EC', '#3F6212', '#D97706'],
        [['#F3F7EC', '#FDF6EC', '#FFF3EC', '#EFF6FF'], ['#3F6212', '#78350F', '#9D174D', '#0C4A6E'], ['#D97706', '#F472B6', '#FB7185', '#38BDF8']]),
      fonts: { heading: { label: '标题字体', default: ROUNDED, options: [ROUNDED, KAITI, SANS] } }
    },
    presets: [
      { name: '抹茶牛乳', colors: { bg: '#F3F7EC', primary: '#3F6212', accent: '#D97706' } },
      { name: '黑糖挂霜', colors: { bg: '#FDF6EC', primary: '#78350F', accent: '#F472B6' } },
      { name: '莓莓牛乳', colors: { bg: '#FFF3EC', primary: '#9D174D', accent: '#FB7185' } },
      { name: '海盐冰蓝', colors: { bg: '#EFF6FF', primary: '#0C4A6E', accent: '#38BDF8' } }
    ],
    canvas: { virtualWidth: 1920, virtualHeight: 1080, defaultWidth: 1920, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'md-dots', type: 'image', src: dotsField(1920, 1080, 116, 10, 'rgba(165,200,138,0.35)'), x: 0, y: 0, width: 1920, height: 1080, zIndex: 0 },
      { id: 'md-card', type: 'shape', shapeKind: 'rect', x: 92, y: 68, width: 940, height: 944, fill: 'rgba(255,255,255,0.74)', borderRadius: 32, border: { color: { $t: 'colors.primary' }, width: 3, style: 'dashed' }, opacity: 0.96, shadow: { color: 'rgba(63,98,18,0.18)', blur: 30, offsetX: 0, offsetY: 12 }, zIndex: 1, animation: { name: 'fadeIn', duration: 700 }, editable: { position: true, size: { type: 'scale' } } },
      { id: 'md-card-inner', type: 'shape', shapeKind: 'rect', x: 116, y: 92, width: 892, height: 896, fill: 'transparent', borderRadius: 22, border: { color: { $t: 'colors.accent' }, width: 2, style: 'solid' }, opacity: 0.5, zIndex: 1 },
      { id: 'md-tape-l', type: 'shape', shapeKind: 'rect', x: 150, y: 44, width: 210, height: 52, fill: { $t: 'colors.accent' }, opacity: 0.8, rotation: -7, zIndex: 3, animation: { name: 'swing', duration: 6000, iterationCount: 'infinite', easing: 'ease-in-out' }, editable: { position: true } },
      { id: 'md-tape-l-tex', type: 'image', src: stripes(210, 52, 'rgba(255,255,255,0.55)'), x: 150, y: 44, width: 210, height: 52, objectFit: 'fill', rotation: -7, zIndex: 4, animation: { name: 'swing', duration: 6000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'md-tape-r', type: 'shape', shapeKind: 'rect', x: 780, y: 40, width: 210, height: 52, fill: { $t: 'colors.primary' }, opacity: 0.55, rotation: 6, zIndex: 3, animation: { name: 'swing', duration: 6800, delay: 600, iterationCount: 'infinite', easing: 'ease-in-out' }, editable: { position: true } },
      { id: 'md-tape-r-tex', type: 'image', src: stripes(210, 52, 'rgba(255,255,255,0.5)'), x: 780, y: 40, width: 210, height: 52, objectFit: 'fill', rotation: 6, zIndex: 4, animation: { name: 'swing', duration: 6800, delay: 600, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'md-leaf-a', type: 'image', src: LEAF, x: 62, y: 858, width: 200, height: 160, objectFit: 'contain', rotation: -14, zIndex: 2, animation: { name: 'swing', duration: 5400, iterationCount: 'infinite', easing: 'ease-in-out' }, editable: { position: true, size: { type: 'scale' } } },
      { id: 'md-leaf-b', type: 'image', src: LEAF, x: 902, y: 892, width: 176, height: 141, objectFit: 'contain', rotation: 158, zIndex: 2, animation: { name: 'swing', duration: 6200, delay: 800, iterationCount: 'infinite', easing: 'ease-in-out' }, editable: { position: true, size: { type: 'scale' } } },
      { id: 'md-title-sq', type: 'image', src: squiggle(430, 20, 'rgba(217,119,6,0.55)', 8), x: 126, y: 356, width: 430, height: 20, objectFit: 'fill', zIndex: 3, animation: { name: 'inkReveal', duration: 1100, delay: 620 } },
      { id: 'md-tag', type: 'shape', shapeKind: 'rect', x: 124, y: 116, width: 304, height: 64, fill: { $t: 'colors.primary' }, borderRadius: 32, zIndex: 2 },
      { id: 'md-tag-t', type: 'text', content: '春 日 限 定', fontFamily: KAITI, fontSize: 30, color: { $t: 'colors.bg' }, textAlign: 'center', x: 124, y: 132, width: 304, height: 36, zIndex: 3, editable: { content: true } },
      { id: 'md-title', type: 'text', content: '今日抹茶', fontFamily: { $t: 'fonts.heading' }, fontSize: 128, fontWeight: '900', color: { $t: 'colors.primary' }, letterSpacing: 6, x: 120, y: 200, width: 720, height: 160, zIndex: 3, animation: { name: 'slideInLeft', duration: 900 }, editable: { content: true, fontSize: { type: 'range', min: 80, max: 160 }, position: true } },
      { id: 'md-sub', type: 'text', content: 'MATCHA DESSERT LAB · 手作甜品研究部', fontFamily: SANS, fontSize: 28, color: { $t: 'colors.accent' }, letterSpacing: 6, x: 124, y: 384, width: 820, height: 46, zIndex: 3, editable: { content: true } },
      { id: 'md-divider', type: 'shape', shapeKind: 'rect', x: 124, y: 444, width: 640, height: 2, fill: 'transparent', border: { color: { $t: 'colors.primary' }, width: 2, style: 'dashed' }, zIndex: 2, opacity: 0.5, animation: { name: 'fadeIn', duration: 800, delay: 500 } },
      { id: 'md-b1', group: 'md-b', type: 'shape', shapeKind: 'circle', x: 130, y: 508, width: 18, height: 18, fill: { $t: 'colors.accent' }, zIndex: 3, animation: { name: 'twinkle', duration: 3200, iterationCount: 'infinite' } },
      { id: 'md-m1', type: 'text', content: '壹 · 抹茶千层 Mille Crêpe　¥ 38', fontFamily: KAITI, fontSize: 38, color: { $t: 'colors.primary' }, x: 164, y: 492, width: 620, height: 52, zIndex: 3, animation: { name: 'slideUpFade', duration: 620, delay: 560 }, editable: { content: true, fontSize: { type: 'range', min: 28, max: 48 }, position: true } },
      { id: 'md-b2', group: 'md-b', type: 'shape', shapeKind: 'circle', x: 130, y: 580, width: 18, height: 18, fill: { $t: 'colors.accent' }, zIndex: 3, animation: { name: 'twinkle', duration: 3200, delay: 500, iterationCount: 'infinite' } },
      { id: 'md-m2', type: 'text', content: '贰 · 白玉红豆团子串　¥ 22', fontFamily: KAITI, fontSize: 38, color: { $t: 'colors.primary' }, x: 164, y: 564, width: 620, height: 52, zIndex: 3, animation: { name: 'slideUpFade', duration: 620, delay: 700 }, editable: { content: true } },
      { id: 'md-b3', group: 'md-b', type: 'shape', shapeKind: 'circle', x: 130, y: 652, width: 18, height: 18, fill: { $t: 'colors.accent' }, zIndex: 3, animation: { name: 'twinkle', duration: 3200, delay: 1000, iterationCount: 'infinite' } },
      { id: 'md-m3', type: 'text', content: '叁 · 焙茶焦糖布丁　¥ 26', fontFamily: KAITI, fontSize: 38, color: { $t: 'colors.primary' }, x: 164, y: 636, width: 620, height: 52, zIndex: 3, animation: { name: 'slideUpFade', duration: 620, delay: 840 }, editable: { content: true } },
      { id: 'md-note', type: 'text', content: '手作每日限量 · 售完即止 · 堂食加两元冰块', fontFamily: KAITI, fontSize: 26, color: { $t: 'colors.primary' }, opacity: 0.6, x: 164, y: 724, width: 620, height: 36, zIndex: 3, animation: { name: 'fadeIn', duration: 900, delay: 1000 }, editable: { content: true } },
      { id: 'md-photo-frame', type: 'shape', shapeKind: 'rect', x: 1136, y: 82, width: 648, height: 428, fill: 'transparent', borderRadius: 36, border: { color: { $t: 'colors.primary' }, width: 4, style: 'dashed' }, opacity: 0.5, zIndex: 2 },
      { id: 'md-photo', type: 'image', src: '/images/photo/matcha-cake-620x400.jpg', objectFit: 'cover', x: 1150, y: 96, width: 620, height: 400, borderRadius: 28, zIndex: 2, animation: { name: 'zoomIn', duration: 700, delay: 220, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }, editable: { src: { type: 'upload' }, position: true, size: { type: 'scale' } } },
      { id: 'md-photo-tape', type: 'shape', shapeKind: 'rect', x: 1118, y: 70, width: 196, height: 46, fill: { $t: 'colors.accent' }, opacity: 0.82, rotation: -8, zIndex: 4, animation: { name: 'swing', duration: 5600, iterationCount: 'infinite', easing: 'ease-in-out' }, editable: { position: true } },
      { id: 'md-photo-tape-tex', type: 'image', src: stripes(196, 46, 'rgba(255,255,255,0.5)'), x: 1118, y: 70, width: 196, height: 46, objectFit: 'fill', rotation: -8, zIndex: 5, animation: { name: 'swing', duration: 5600, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'md-photo-cap-bg', type: 'shape', shapeKind: 'rect', x: 1170, y: 434, width: 310, height: 50, fill: 'rgba(255,255,255,0.92)', borderRadius: 25, zIndex: 4 },
      { id: 'md-photo-cap', type: 'text', content: '抹茶千层 · 今日出炉', fontFamily: KAITI, fontSize: 25, fontWeight: '700', color: { $t: 'colors.primary' }, textAlign: 'center', lineHeight: 1.95, x: 1170, y: 434, width: 310, height: 50, zIndex: 5, animation: { name: 'fadeIn', duration: 800, delay: 900 }, editable: { content: true } },
      { id: 'md-steam', type: 'image', src: steam(180, 112, 'rgba(63,98,18,0.3)'), x: 1396, y: 498, width: 180, height: 112, objectFit: 'contain', zIndex: 3, animation: { name: 'rise', duration: 3200, iterationCount: 'infinite', easing: 'ease-out' } },
      { id: 'md-cake', type: 'image', src: CAKE, x: 1180, y: 620, width: 400, height: 354, zIndex: 3, animation: { name: 'swing', duration: 3600, iterationCount: 'infinite', easing: 'ease-in-out' }, editable: { position: true, size: { type: 'scale' } } },
      { id: 'md-dango', type: 'image', src: DANGO, x: 1636, y: 612, width: 104, height: 351, zIndex: 3, animation: { name: 'float', duration: 4800, delay: 300, iterationCount: 'infinite', easing: 'ease-in-out' }, editable: { position: true, size: { type: 'scale' } } },
      { id: 'md-badge-ring', type: 'shape', shapeKind: 'circle', x: 1660, y: 382, width: 222, height: 222, fill: 'transparent', border: { color: { $t: 'colors.accent' }, width: 3, style: 'dashed' }, zIndex: 4, animation: { name: 'ripple', duration: 3400, iterationCount: 'infinite', easing: 'ease-out' } },
      { id: 'md-badge', type: 'shape', shapeKind: 'circle', x: 1676, y: 398, width: 190, height: 190, fill: { $t: 'colors.accent' }, zIndex: 5, rotation: -12, animation: { name: 'pulse', duration: 2600, iterationCount: 'infinite' }, editable: { position: true, size: { type: 'scale' } } },
      { id: 'md-badge-t', type: 'text', content: '限定\n赏味', fontFamily: KAITI, fontSize: 46, fontWeight: '700', color: '#FFFFFF', textAlign: 'center', lineHeight: 1.3, rotation: -12, x: 1676, y: 439, width: 190, height: 108, zIndex: 6 },
      { id: 'md-hours', type: 'text', content: 'OPEN 10:00 — 20:00 · 週三店休', fontFamily: MONO, fontSize: 22, color: { $t: 'colors.primary' }, opacity: 0.6, letterSpacing: 2, x: 1150, y: 998, width: 420, height: 34, zIndex: 3, animation: { name: 'fadeIn', duration: 900, delay: 1100 }, editable: { content: true } },
      { id: 'md-sparkle-a', type: 'image', src: sparkle4(38, 'rgba(251,191,36,0.9)'), x: 1796, y: 812, width: 38, height: 38, objectFit: 'contain', zIndex: 4, animation: { name: 'sparkle', duration: 3000, iterationCount: 'infinite' } },
      { id: 'md-sparkle-b', type: 'image', src: sparkle4(28, 'rgba(251,191,36,0.8)'), x: 1096, y: 556, width: 28, height: 28, objectFit: 'contain', zIndex: 4, animation: { name: 'sparkle', duration: 3600, delay: 1200, iterationCount: 'infinite' } }
    ]
  },
  // 9. 北极熊的橘子围巾（1:1）
  {
    id: 'cute-polar-pal', name: '北极熊的围巾', version: '1.1.0', category: 'cute',
    tags: ['cute', 'polar', 'winter', 'snow', '1:1'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23e8f4fa"/><ellipse cx="54" cy="58" rx="26" ry="17" fill="%23fff" stroke="%23b9cfdd" stroke-width="2"/><circle cx="32" cy="46" r="12" fill="%23fff" stroke="%23b9cfdd" stroke-width="2"/><rect x="24" y="52" width="18" height="5" rx="2.5" fill="%23f97316"/><circle cx="30" cy="44" r="1.8" fill="%23334155"/><circle cx="37" cy="43" r="1.8" fill="%23334155"/></svg>',
    tokens: {
      colors: CUTE_COLORS(['冰空', '墨蓝', '围巾橙'], ['#E8F4FA', '#1E4B63', '#F97316'],
        [['#E8F4FA', '#102A43', '#FCE7F3', '#ECFDF5'], ['#1E4B63', '#E6F7FF', '#831843', '#065F46'], ['#F97316', '#FDBA74', '#FB923C', '#F59E0B']]),
      fonts: { heading: { label: '标题字体', default: ROUNDED, options: [ROUNDED, KAITI, 'Comic Sans MS, cursive'] } }
    },
    presets: [
      { name: '初雪清晨', colors: { bg: '#E8F4FA', primary: '#1E4B63', accent: '#F97316' } },
      { name: '夜航星冰', colors: { bg: '#102A43', primary: '#E6F7FF', accent: '#FDBA74' } },
      { name: '暮光粉雪', colors: { bg: '#FCE7F3', primary: '#831843', accent: '#FB923C' } },
      { name: '薄荷糖霜', colors: { bg: '#ECFDF5', primary: '#065F46', accent: '#F59E0B' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1080, defaultWidth: 1080, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'pp-sky', type: 'overlay', background: 'linear-gradient(180deg, rgba(207,232,243,0.55) 0%, rgba(255,255,255,0) 46%)', x: 0, y: 0, width: 1080, height: 1080, zIndex: 0 },
      { id: 'pp-glow', type: 'overlay', background: 'radial-gradient(circle at 50% 64%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 56%)', x: 0, y: 0, width: 1080, height: 1080, zIndex: 0, animation: { name: 'pulse', duration: 7000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'pp-dots', type: 'image', src: dotsField(1080, 1080, 88, 7, 'rgba(255,255,255,0.5)'), x: 0, y: 0, width: 1080, height: 1080, objectFit: 'fill', zIndex: 0, animation: { name: 'pulse', duration: 5600, delay: 600, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'pp-frame', type: 'shape', shapeKind: 'rect', x: 44, y: 44, width: 992, height: 992, fill: 'transparent', borderRadius: 72, border: { color: { $t: 'colors.primary' }, width: 4, style: 'solid' }, opacity: 0.26, zIndex: 6 },
      { id: 'pp-frame2', type: 'shape', shapeKind: 'rect', x: 64, y: 64, width: 952, height: 952, fill: 'transparent', borderRadius: 60, border: { color: { $t: 'colors.accent' }, width: 3, style: 'dashed' }, opacity: 0.45, zIndex: 6 },
      { id: 'pp-title-sq', type: 'image', src: squiggle(460, 16, 'rgba(249,115,22,0.5)', 8), x: 310, y: 264, width: 460, height: 16, objectFit: 'fill', zIndex: 4, animation: { name: 'inkReveal', duration: 1100, delay: 620 } },
      { id: 'pp-title', type: 'text', content: '冬 日 抱 抱', fontFamily: { $t: 'fonts.heading' }, fontSize: 108, fontWeight: '900', color: { $t: 'colors.primary' }, textAlign: 'center', letterSpacing: 12, x: 120, y: 122, width: 840, height: 140, zIndex: 4, animation: { name: 'fadeInDown', duration: 900 }, editable: { content: true, fontSize: { type: 'range', min: 64, max: 136 }, position: true } },
      { id: 'pp-sub', type: 'text', content: 'HUG SEASON · 围巾是新织的', fontFamily: KAITI, fontSize: 32, color: { $t: 'colors.accent' }, textAlign: 'center', letterSpacing: 4, x: 240, y: 296, width: 600, height: 42, zIndex: 4, animation: { name: 'slideUpFade', duration: 760, delay: 420 }, editable: { content: true } },
      { id: 'pp-heart1', type: 'text', content: '♡', fontFamily: 'Georgia, serif', fontSize: 44, color: { $t: 'colors.accent' }, x: 872, y: 356, width: 56, height: 56, zIndex: 4, animation: { name: 'rise', duration: 3800, iterationCount: 'infinite' } },
      { id: 'pp-heart2', type: 'text', content: '♡', fontFamily: 'Georgia, serif', fontSize: 32, color: { $t: 'colors.accent' }, opacity: 0.8, x: 152, y: 420, width: 44, height: 44, zIndex: 4, animation: { name: 'rise', duration: 3800, delay: 1300, iterationCount: 'infinite' } },
      { id: 'pp-heart3', type: 'text', content: '♡', fontFamily: 'Georgia, serif', fontSize: 26, color: { $t: 'colors.accent' }, opacity: 0.65, x: 792, y: 250, width: 38, height: 38, zIndex: 4, animation: { name: 'rise', duration: 4400, delay: 2200, iterationCount: 'infinite' } },
      { id: 'pp-sparkle-a', type: 'image', src: sparkle4(46), x: 158, y: 232, width: 46, height: 46, objectFit: 'contain', zIndex: 4, animation: { name: 'sparkle', duration: 2800, iterationCount: 'infinite' } },
      { id: 'pp-sparkle-b', type: 'image', src: sparkle4(34, 'rgba(255,255,255,0.85)'), x: 938, y: 470, width: 34, height: 34, objectFit: 'contain', zIndex: 4, animation: { name: 'sparkle', duration: 3400, delay: 1100, iterationCount: 'infinite' } },
      { id: 'pp-sparkle-c', type: 'image', src: sparkle4(28, 'rgba(253,186,116,0.9)'), x: 246, y: 606, width: 28, height: 28, objectFit: 'contain', zIndex: 4, animation: { name: 'sparkle', duration: 3000, delay: 1900, iterationCount: 'infinite' } },
      { id: 'pp-pine-l', type: 'image', src: PINE, x: 26, y: 574, width: 178, height: 250, objectFit: 'contain', zIndex: 1, animation: { name: 'fadeIn', duration: 900, delay: 300 } },
      { id: 'pp-pine-r', type: 'image', src: PINE, x: 904, y: 448, width: 150, height: 210, objectFit: 'contain', rotation: 4, zIndex: 1, animation: { name: 'fadeIn', duration: 900, delay: 480 } },
      { id: 'pp-ground', type: 'shape', shapeKind: 'rect', x: -30, y: 824, width: 1140, height: 300, fill: 'rgba(255,255,255,0.95)', borderRadius: 70, zIndex: 1 },
      { id: 'pp-shadow', type: 'shape', shapeKind: 'rect', x: 214, y: 846, width: 660, height: 56, fill: 'rgba(120,144,169,0.28)', borderRadius: 28, zIndex: 1 },
      { id: 'pp-tracks', type: 'image', src: footprints(210, 120, 4, 'rgba(120,144,169,0.32)'), x: 30, y: 848, width: 210, height: 120, objectFit: 'fill', zIndex: 2, opacity: 0.9 },
      { id: 'pp-snowman', type: 'image', src: SNOWMAN, x: 846, y: 646, width: 128, height: 180, objectFit: 'contain', zIndex: 2, animation: { name: 'float', duration: 5800, delay: 600, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'pp-bear', type: 'image', src: POLAR, x: 262, y: 428, width: 560, height: 436, zIndex: 2, animation: { name: 'float', duration: 5200, iterationCount: 'infinite' } },
      { id: 'pp-snowflake-a', type: 'image', src: snowflake(94), x: 916, y: 322, width: 94, height: 94, objectFit: 'contain', opacity: 0.75, zIndex: 3, animation: { name: 'spinSlow', duration: 15000, iterationCount: 'infinite', easing: 'linear' } },
      { id: 'pp-snowflake-b', type: 'image', src: snowflake(64), x: 92, y: 318, width: 64, height: 64, objectFit: 'contain', opacity: 0.6, zIndex: 3, animation: { name: 'spinSlow', duration: 11000, delay: 900, iterationCount: 'infinite', easing: 'linear' } },
      { id: 'pp-snow', type: 'image', src: snowDrift(1080, 1080, 72, 99, 'rgba(255,255,255,0.9)'), x: 0, y: 0, width: 1080, height: 1080, objectFit: 'fill', zIndex: 5, animation: { name: 'drift', duration: 9000, iterationCount: 'infinite' } },
      { id: 'pp-snow2', type: 'image', src: snowDrift(1140, 1140, 40, 213, 'rgba(255,255,255,0.95)'), x: -30, y: -30, width: 1140, height: 1140, objectFit: 'fill', zIndex: 5, opacity: 0.7, animation: { name: 'float', duration: 7200, delay: 1200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'pp-copy', type: 'text', content: '雪再大，也挡不住想见你的心。', fontFamily: KAITI, fontSize: 36, color: { $t: 'colors.primary' }, textAlign: 'center', letterSpacing: 3, x: 190, y: 932, width: 700, height: 50, zIndex: 4, animation: { name: 'fadeInUp', duration: 800, delay: 700 }, editable: { content: true, fontSize: { type: 'range', min: 26, max: 46 }, position: true } },
      { id: 'pp-sign', type: 'text', content: '—— 白熊与橘子围巾事务所 ——', fontFamily: KAITI, fontSize: 24, color: { $t: 'colors.primary' }, opacity: 0.55, textAlign: 'center', x: 320, y: 1002, width: 440, height: 32, zIndex: 4, animation: { name: 'fadeIn', duration: 900, delay: 980 }, editable: { content: true } }
    ]
  },
  // 10. 珍珠奶茶小票（4:5）
  {
    id: 'cute-boba-latte', name: '奶茶小票', version: '1.1.0', category: 'cute',
    tags: ['cute', 'boba', 'receipt', 'drink', '4:5'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23fdf0dc"/><rect x="26" y="14" width="48" height="72" rx="4" fill="%23fff" stroke="%236b3e26" stroke-width="2" stroke-dasharray="4 3"/><rect x="34" y="26" width="32" height="4" fill="%23d9a66c"/><rect x="34" y="38" width="24" height="4" fill="%23d9a66c"/><rect x="34" y="50" width="30" height="4" fill="%23d9a66c"/></svg>',
    tokens: {
      colors: CUTE_COLORS(['奶茶纸', '黑糖棕', '吸管粉'], ['#FDF0DC', '#6B3E26', '#F472B6'],
        [['#FDF0DC', '#F3F7EC', '#FFF3EC', '#F9FAFB'], ['#6B3E26', '#3F6212', '#9D174D', '#111827'], ['#F472B6', '#FB7185', '#C084FC', '#F9A8D4']]),
      fonts: { heading: { label: '标题字体', default: ROUNDED, options: [ROUNDED, KAITI, MONO] } }
    },
    presets: [
      { name: '黑糖奶茶', colors: { bg: '#FDF0DC', primary: '#6B3E26', accent: '#F472B6' } },
      { name: '抹茶波波', colors: { bg: '#F3F7EC', primary: '#3F6212', accent: '#FB7185' } },
      { name: '葡萄冰沙', colors: { bg: '#FFF3EC', primary: '#9D174D', accent: '#C084FC' } },
      { name: '燕麦拿铁', colors: { bg: '#F9FAFB', primary: '#111827', accent: '#F9A8D4' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'bl-shadow', type: 'shape', shapeKind: 'rect', x: 86, y: 80, width: 940, height: 1230, fill: 'rgba(107,62,38,0.16)', borderRadius: 12, zIndex: 0 },
      { id: 'bl-card', type: 'shape', shapeKind: 'rect', x: 70, y: 60, width: 940, height: 1230, fill: '#FFFFFF', borderRadius: 12, zIndex: 1 },
      { id: 'bl-tear-top', type: 'image', src: tornEdge(940, 26, 22, '%23FFFFFF', 'up'), x: 70, y: 44, width: 940, height: 26, objectFit: 'fill', zIndex: 1 },
      { id: 'bl-tear-bot', type: 'image', src: tornEdge(940, 26, 22, '%23FFFFFF', 'down'), x: 70, y: 1270, width: 940, height: 26, objectFit: 'fill', zIndex: 1 },
      { id: 'bl-dots', type: 'image', src: dotsField(940, 1230, 84, 5, 'rgba(0,0,0,0.05)'), x: 70, y: 60, width: 940, height: 1230, objectFit: 'fill', zIndex: 2, opacity: 0.8, animation: { name: 'pulse', duration: 7600, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'bl-tape-a', type: 'shape', shapeKind: 'rect', x: 34, y: 32, width: 196, height: 58, fill: { $t: 'colors.accent' }, opacity: 0.42, borderRadius: 4, rotation: -8, zIndex: 4, animation: { name: 'swing', duration: 6200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'bl-tape-a-tex', type: 'image', src: stripes(196, 58, 'rgba(255,255,255,0.55)'), x: 34, y: 32, width: 196, height: 58, objectFit: 'fill', rotation: -8, zIndex: 5, opacity: 0.42, animation: { name: 'swing', duration: 6200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'bl-tape-b', type: 'shape', shapeKind: 'rect', x: 850, y: 32, width: 196, height: 58, fill: { $t: 'colors.accent' }, opacity: 0.42, borderRadius: 4, rotation: 7, zIndex: 4, animation: { name: 'swing', duration: 6800, delay: 500, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'bl-tape-b-tex', type: 'image', src: stripes(196, 58, 'rgba(255,255,255,0.55)'), x: 850, y: 32, width: 196, height: 58, objectFit: 'fill', rotation: 7, zIndex: 5, opacity: 0.42, animation: { name: 'swing', duration: 6800, delay: 500, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'bl-tape-c', type: 'shape', shapeKind: 'rect', x: 30, y: 1256, width: 178, height: 54, fill: { $t: 'colors.primary' }, opacity: 0.32, borderRadius: 4, rotation: 6, zIndex: 4, animation: { name: 'swing', duration: 7200, delay: 900, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'bl-tape-c-tex', type: 'image', src: stripes(178, 54, 'rgba(255,255,255,0.5)'), x: 30, y: 1256, width: 178, height: 54, objectFit: 'fill', rotation: 6, zIndex: 5, opacity: 0.32, animation: { name: 'swing', duration: 7200, delay: 900, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'bl-tape-d', type: 'shape', shapeKind: 'rect', x: 872, y: 1256, width: 178, height: 54, fill: { $t: 'colors.primary' }, opacity: 0.32, borderRadius: 4, rotation: -7, zIndex: 4, animation: { name: 'swing', duration: 6600, delay: 300, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'bl-tape-d-tex', type: 'image', src: stripes(178, 54, 'rgba(255,255,255,0.5)'), x: 872, y: 1256, width: 178, height: 54, objectFit: 'fill', rotation: -7, zIndex: 5, opacity: 0.32, animation: { name: 'swing', duration: 6600, delay: 300, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'bl-hearts', type: 'image', src: heartSprinkle(940, 200, 8, 41, 'rgba(244,114,182,0.35)', 18), x: 70, y: 60, width: 940, height: 200, zIndex: 2, opacity: 0.8 },
      { id: 'bl-logo', type: 'text', content: 'BOBA LAB · EST.2026', fontFamily: MONO, fontSize: 26, color: { $t: 'colors.accent' }, textAlign: 'center', letterSpacing: 8, x: 290, y: 116, width: 500, height: 36, zIndex: 3, animation: { name: 'fadeIn', duration: 700, delay: 120 }, editable: { content: true } },
      { id: 'bl-title', type: 'text', content: '今日份快乐', fontFamily: { $t: 'fonts.heading' }, fontSize: 88, fontWeight: '900', color: { $t: 'colors.primary' }, textAlign: 'center', letterSpacing: 6, x: 150, y: 164, width: 780, height: 116, zIndex: 3, animation: { name: 'zoomIn', duration: 800 }, editable: { content: true, fontSize: { type: 'range', min: 60, max: 110 }, position: true } },
      { id: 'bl-title-sq', type: 'image', src: squiggle(380, 14, 'rgba(244,114,182,0.55)', 7), x: 350, y: 286, width: 380, height: 14, objectFit: 'fill', zIndex: 3, animation: { name: 'inkReveal', duration: 1000, delay: 560 } },
      { id: 'bl-sub', type: 'text', content: '全糖去冰 · 快乐加满 · 外卖第 128 单', fontFamily: KAITI, fontSize: 30, color: { $t: 'colors.primary' }, opacity: 0.75, textAlign: 'center', x: 190, y: 308, width: 700, height: 40, zIndex: 3, animation: { name: 'slideUpFade', duration: 700, delay: 400 }, editable: { content: true } },
      { id: 'bl-d1', type: 'shape', shapeKind: 'rect', x: 150, y: 368, width: 780, height: 2, fill: 'transparent', border: { color: { $t: 'colors.primary' }, width: 2, style: 'dashed' }, zIndex: 3, opacity: 0.45 },
      { id: 'bl-hl', type: 'shape', shapeKind: 'rect', x: 160, y: 402, width: 760, height: 56, fill: 'rgba(107,62,38,0.06)', borderRadius: 10, zIndex: 2 },
      { id: 'bl-b1', group: 'bl-b', type: 'shape', shapeKind: 'circle', x: 150, y: 420, width: 14, height: 14, fill: { $t: 'colors.accent' }, zIndex: 3, animation: { name: 'twinkle', duration: 3200, iterationCount: 'infinite' } },
      { id: 'bl-b2', group: 'bl-b', type: 'shape', shapeKind: 'circle', x: 150, y: 482, width: 14, height: 14, fill: { $t: 'colors.accent' }, zIndex: 3, animation: { name: 'twinkle', duration: 3200, delay: 400, iterationCount: 'infinite' } },
      { id: 'bl-b3', group: 'bl-b', type: 'shape', shapeKind: 'circle', x: 150, y: 544, width: 14, height: 14, fill: { $t: 'colors.accent' }, zIndex: 3, animation: { name: 'twinkle', duration: 3200, delay: 800, iterationCount: 'infinite' } },
      { id: 'bl-b4', group: 'bl-b', type: 'shape', shapeKind: 'circle', x: 150, y: 606, width: 14, height: 14, fill: { $t: 'colors.accent' }, zIndex: 3, animation: { name: 'twinkle', duration: 3200, delay: 1200, iterationCount: 'infinite' } },
      { id: 'bl-o1', type: 'text', content: '01　黑糖珍珠鲜奶　　　¥ 18', fontFamily: MONO, fontSize: 30, color: { $t: 'colors.primary' }, x: 176, y: 408, width: 728, height: 44, zIndex: 3, animation: { name: 'slideUpFade', duration: 620, delay: 520 }, editable: { content: true, fontSize: { type: 'range', min: 22, max: 40 }, position: true } },
      { id: 'bl-o2', type: 'text', content: '02　抹茶奶盖红豆　　　¥ 22', fontFamily: MONO, fontSize: 30, color: { $t: 'colors.primary' }, x: 176, y: 470, width: 728, height: 44, zIndex: 3, animation: { name: 'slideUpFade', duration: 620, delay: 640 }, editable: { content: true } },
      { id: 'bl-o3', type: 'text', content: '03　桂花酒酿小圆子　　¥ 20', fontFamily: MONO, fontSize: 30, color: { $t: 'colors.primary' }, x: 176, y: 532, width: 728, height: 44, zIndex: 3, animation: { name: 'slideUpFade', duration: 620, delay: 760 }, editable: { content: true } },
      { id: 'bl-o4', type: 'text', content: '04　烤布蕾乌龙奶茶　　¥ 24', fontFamily: MONO, fontSize: 30, color: { $t: 'colors.primary' }, x: 176, y: 594, width: 728, height: 44, zIndex: 3, animation: { name: 'slideUpFade', duration: 620, delay: 880 }, editable: { content: true } },
      { id: 'bl-total', type: 'text', content: '合计 TOTAL　　　　　　¥ 84', fontFamily: MONO, fontSize: 34, fontWeight: '700', color: { $t: 'colors.accent' }, x: 176, y: 660, width: 728, height: 48, zIndex: 3, animation: { name: 'fadeIn', duration: 700, delay: 1020 }, editable: { content: true } },
      { id: 'bl-d2', type: 'shape', shapeKind: 'rect', x: 150, y: 730, width: 780, height: 2, fill: 'transparent', border: { color: { $t: 'colors.primary' }, width: 2, style: 'dashed' }, zIndex: 3, opacity: 0.45 },
      { id: 'bl-photo-frame', type: 'shape', shapeKind: 'rect', x: 140, y: 766, width: 360, height: 360, fill: 'transparent', borderRadius: 28, border: { color: { $t: 'colors.accent' }, width: 3, style: 'dashed' }, opacity: 0.55, zIndex: 2 },
      { id: 'bl-photo', type: 'image', src: '/images/photo/boba-cup-340x340.jpg', objectFit: 'cover', x: 150, y: 776, width: 340, height: 340, borderRadius: 24, zIndex: 3, animation: { name: 'zoomIn', duration: 760, delay: 300 }, editable: { src: { type: 'upload' }, position: true, size: { type: 'scale' } } },
      { id: 'bl-photo-cap-bg', type: 'shape', shapeKind: 'rect', x: 150, y: 1056, width: 340, height: 60, fill: 'rgba(31,25,22,0.42)', borderRadius: 24, zIndex: 4 },
      { id: 'bl-photo-cap', type: 'text', content: '珍珠 · 现煮第 4 小时', fontFamily: MONO, fontSize: 24, color: '#FFFFFF', textAlign: 'center', letterSpacing: 2, x: 150, y: 1070, width: 340, height: 34, zIndex: 5, animation: { name: 'fadeIn', duration: 700, delay: 900 }, editable: { content: true } },
      { id: 'bl-photo-tape', type: 'shape', shapeKind: 'rect', x: 246, y: 752, width: 148, height: 44, fill: { $t: 'colors.accent' }, opacity: 0.45, borderRadius: 3, rotation: -5, zIndex: 4 },
      { id: 'bl-photo-tape-tex', type: 'image', src: stripes(148, 44, 'rgba(255,255,255,0.6)'), x: 246, y: 752, width: 148, height: 44, objectFit: 'fill', rotation: -5, zIndex: 5, opacity: 0.45 },
      { id: 'bl-steam', type: 'image', src: steam(140, 72, 'rgba(255,255,255,0.85)'), x: 250, y: 792, width: 140, height: 72, objectFit: 'fill', opacity: 0.7, zIndex: 4, animation: { name: 'rise', duration: 4200, iterationCount: 'infinite', easing: 'ease-out' } },
      { id: 'bl-barcode', type: 'image', src: barcode(156, 58, 'rgba(40,30,25,0.85)', 11), x: 532, y: 916, width: 156, height: 58, objectFit: 'fill', zIndex: 3 },
      { id: 'bl-barcode-t', type: 'text', content: 'NO. 000128', fontFamily: MONO, fontSize: 22, color: { $t: 'colors.primary' }, opacity: 0.7, textAlign: 'center', letterSpacing: 3, x: 522, y: 976, width: 176, height: 26, zIndex: 3, animation: { name: 'fadeIn', duration: 800, delay: 1100 }, editable: { content: true } },
      { id: 'bl-note', type: 'text', content: '「咖啡因是成年人的童话，\n　珍珠是童话里的化石。」', fontFamily: KAITI, fontSize: 30, color: { $t: 'colors.primary' }, lineHeight: 1.7, x: 532, y: 780, width: 400, height: 110, zIndex: 3, animation: { name: 'fadeInUp', duration: 800, delay: 480 }, editable: { content: true, fontSize: { type: 'range', min: 22, max: 40 }, position: true } },
      { id: 'bl-cup-shadow', type: 'shape', shapeKind: 'rect', x: 692, y: 1240, width: 248, height: 44, fill: 'rgba(107,62,38,0.14)', borderRadius: 22, zIndex: 2 },
      { id: 'bl-pearls', type: 'image', src: snowDrift(300, 84, 16, 91, 'rgba(107,62,38,0.5)'), x: 150, y: 1130, width: 300, height: 84, objectFit: 'fill', opacity: 0.85, zIndex: 3, animation: { name: 'twinkle', duration: 3800, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'bl-boba', type: 'image', src: BOBA, x: 706, y: 940, width: 214, height: 346, zIndex: 3, animation: { name: 'float', duration: 4800, iterationCount: 'infinite' } },
      { id: 'bl-stamp', type: 'shape', shapeKind: 'circle', x: 548, y: 1006, width: 168, height: 168, fill: 'transparent', border: { color: { $t: 'colors.accent' }, width: 4, style: 'solid' }, zIndex: 4, opacity: 0.9, animation: { name: 'pulse', duration: 2800, iterationCount: 'infinite' } },
      { id: 'bl-stamp-ring', type: 'shape', shapeKind: 'circle', x: 534, y: 992, width: 196, height: 196, fill: 'transparent', border: { color: { $t: 'colors.accent' }, width: 3, style: 'dashed' }, zIndex: 4, animation: { name: 'ripple', duration: 3000, iterationCount: 'infinite', easing: 'ease-out' } },
      { id: 'bl-stamp-t', type: 'text', content: '盖章\n推荐', fontFamily: KAITI, fontSize: 34, fontWeight: '700', color: { $t: 'colors.accent' }, textAlign: 'center', lineHeight: 1.35, rotation: -12, x: 548, y: 1046, width: 168, height: 92, zIndex: 5, animation: { name: 'zoomIn', duration: 620, delay: 1200 } },
      { id: 'bl-sparkle-a', type: 'image', src: sparkle4(44, 'rgba(244,114,182,0.75)'), x: 948, y: 690, width: 44, height: 44, objectFit: 'contain', zIndex: 3, animation: { name: 'sparkle', duration: 2800, iterationCount: 'infinite' } },
      { id: 'bl-sparkle-b', type: 'image', src: sparkle4(30, 'rgba(107,62,38,0.4)'), x: 104, y: 672, width: 30, height: 30, objectFit: 'contain', zIndex: 3, animation: { name: 'sparkle', duration: 3400, delay: 900, iterationCount: 'infinite' } },
      { id: 'bl-sparkle-c', type: 'image', src: sparkle4(26, 'rgba(244,114,182,0.6)'), x: 940, y: 1150, width: 26, height: 26, objectFit: 'contain', zIndex: 3, animation: { name: 'sparkle', duration: 3000, delay: 1700, iterationCount: 'infinite' } },
      { id: 'bl-sign', type: 'text', content: '—— 打工人能量补给站 No.26 ——', fontFamily: MONO, fontSize: 22, color: { $t: 'colors.primary' }, opacity: 0.55, textAlign: 'center', x: 240, y: 1234, width: 600, height: 32, zIndex: 3, animation: { name: 'fadeIn', duration: 900, delay: 1320 }, editable: { content: true } }
    ]
  }
]

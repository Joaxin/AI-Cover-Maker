// src/core/templates/tech/tech-extra.ts —— 科技风扩展（5 个）
import type { Template } from '@/types/types'

// 雷达显示器：量程圈 + 方位刻度 + 扫掠扇形 + 目标光点
const RADAR_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><g fill="none" stroke="%2300f0ff"><circle cx="200" cy="200" r="180" stroke-width="2" opacity="0.8"/><circle cx="200" cy="200" r="126" stroke-width="1" opacity="0.5"/><circle cx="200" cy="200" r="72" stroke-width="1" opacity="0.5"/><circle cx="200" cy="200" r="18" stroke-width="1" opacity="0.6"/><line x1="200" y1="14" x2="200" y2="386" stroke-width="0.8" opacity="0.35"/><line x1="14" y1="200" x2="386" y2="200" stroke-width="0.8" opacity="0.35"/><circle r="178" stroke-width="6" stroke-dasharray="1 13.8" opacity="0.5"/></g><path d="M200 200 L200 20 A180 180 0 0 1 337.9 84.3 Z" fill="%2300f0ff" opacity="0.14"/><path d="M200 200 L200 20 A180 180 0 0 0 200 20 Z" fill="none"/><g fill="%2300f0ff"><circle cx="286" cy="128" r="5"/><circle cx="140" cy="262" r="4" opacity="0.8"/><circle cx="248" cy="300" r="3" opacity="0.6"/></g></svg>'

// CRT 扫描线
const SCANLINE_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="8" height="6"><rect width="8" height="3" fill="%23000000" opacity="0.55"/></svg>'

// 等距网格（30° 折线拼）
const ISO_BG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000"><defs><pattern id="iso" width="56" height="32" patternUnits="userSpaceOnUse"><path d="M0 32 L28 16 L56 32" fill="none" stroke="%2322d3ee" stroke-width="1" opacity="0.16"/><path d="M0 16 L28 0 L56 16" fill="none" stroke="%2322d3ee" stroke-width="1" opacity="0.1"/></pattern></defs><rect width="1000" height="1000" fill="url(%23iso)"/><circle cx="850" cy="180" r="230" fill="%230891b2" opacity="0.08"/><circle cx="140" cy="840" r="190" fill="%236366f1" opacity="0.07"/></svg>'

// 蓝图线框设备：主板轮廓 + 模块 + 尺寸标注
const BLUEPRINT_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 360"><g fill="none" stroke="%237dd3fc" stroke-width="2"><rect x="40" y="40" width="440" height="240" rx="14"/><rect x="76" y="80" width="120" height="86" rx="6"/><rect x="232" y="80" width="80" height="86" rx="6"/><circle cx="404" cy="122" r="34"/><path d="M76 208 L444 208 M76 236 L300 236" stroke-dasharray="6 6" opacity="0.7"/><path d="M40 312 L480 312 M40 304 L40 320 M480 304 L480 320" stroke-width="1.4"/><path d="M24 60 L24 260 M16 60 L32 60 M16 260 L32 260" stroke-width="1.4"/></g><g fill="%237dd3fc"><circle cx="108" cy="104" r="4"/><circle cx="264" cy="104" r="4"/><circle cx="404" cy="122" r="5" opacity="0.9"/></g></svg>'

// ── 本文件私有素材（te* 前缀）──────────────────────────────────────────────
// 口径：可读几何（环／引线／等轴棱边／刻度／文本）一律 $t token，切预设＝整图换色；
//       只有氛围层（玻璃高光、极光渐层、CRT 暗角、等轴地面细纹）允许中性 rgba／白透写死。

/** 两点之间的细长 rect（居中旋转，端点取中点＋半长）：尺寸线／引线／扫描条／等轴斜边通用 */
function teSeg(id: string, x1: number, y1: number, x2: number, y2: number, t: number, token: string, op: number, z: number, extra: any = {}) {
  const dx = x2 - x1, dy = y2 - y1, len = Math.sqrt(dx * dx + dy * dy)
  return { id, type: 'shape', shapeKind: 'rect', x: (x1 + x2) / 2 - len / 2, y: (y1 + y2) / 2 - t / 2, width: len, height: t, rotation: (Math.atan2(dy, dx) * 180) / Math.PI, fill: { $t: token }, opacity: op, zIndex: z, ...extra }
}

/** 真等轴菱形线框（宽:高 = 2:1，斜边 ±26.57°）＝ 4 条斜边 */
function teRhombus(prefix: string, cx: number, cy: number, hw: number, hh: number, t: number, token: string, op: number, z: number, extra: any = {}) {
  const v = [[cx, cy - hh], [cx + hw, cy], [cx, cy + hh], [cx - hw, cy]]
  return v.map((p, i) => teSeg(`${prefix}-${i}`, p[0], p[1], v[(i + 1) % 4][0], v[(i + 1) % 4][1], t, token, op, z, extra))
}

/** 等轴面的两条前边（V 形）：堆叠层的下层只画前缘，省一半元素 */
function teChevron(prefix: string, cx: number, cy: number, hw: number, hh: number, t: number, token: string, op: number, z: number, extra: any = {}) {
  return [teSeg(`${prefix}-l`, cx - hw, cy, cx, cy + hh, t, token, op, z, extra), teSeg(`${prefix}-r`, cx, cy + hh, cx + hw, cy, t, token, op, z, extra)]
}

/** 等轴地面细纹：±26.57° 两组平行线叠出菱形地砖，白透低 alpha 适配全部深色预设 */
const TE_ISO_GROUND = 'repeating-linear-gradient(26.57deg, rgba(255,255,255,0.085) 0 1px, rgba(255,255,255,0) 1px 44px), repeating-linear-gradient(-26.57deg, rgba(255,255,255,0.085) 0 1px, rgba(255,255,255,0) 1px 44px)'

/** 制图辅助细网格（25 格／50 格双密度） */
const TE_FINE_GRID = 'repeating-linear-gradient(0deg, rgba(255,255,255,0.055) 0 1px, rgba(255,255,255,0) 1px 25px), repeating-linear-gradient(90deg, rgba(255,255,255,0.055) 0 1px, rgba(255,255,255,0) 1px 25px)'

/** CRT 玻璃：中央暗角 + 缓慢游走的磷光扫描带 */
const TE_CRT_VIGNETTE = 'radial-gradient(74% 64% at 50% 50%, rgba(0,0,0,0) 48%, rgba(0,0,0,0.62) 100%)'
const TE_CRT_BAND = 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.05) 44%, rgba(255,255,255,0.09) 52%, rgba(255,255,255,0) 62%)'

/** 极光主带：斜穿画面的一条弥光 */
const TE_AURORA_BAND = 'linear-gradient(112deg, rgba(255,255,255,0) 6%, rgba(56,189,248,0.22) 27%, rgba(129,140,248,0.2) 44%, rgba(244,114,182,0.15) 61%, rgba(255,255,255,0) 84%)'

export const techExtraTemplates: Template[] = [
  {
    id: 'tech-hud-radar', name: '天火雷达态势', version: '1.0.0', category: 'tech',
    tags: ['tech', 'radar', 'HUD', 'telemetry', 'dark'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23060d1a"/><circle cx="50" cy="44" r="34" fill="%2300f0ff" opacity="0.05"/><g fill="none" stroke="%2300f0ff"><circle cx="50" cy="44" r="30" stroke-width="1.2" opacity="0.9"/><circle cx="50" cy="44" r="21" stroke-width="0.6" opacity="0.5" stroke-dasharray="3 2"/><circle cx="50" cy="44" r="11" stroke-width="0.6" opacity="0.45"/><circle cx="50" cy="44" r="26" stroke-width="3.4" stroke-dasharray="0.8 3.4" opacity="0.28"/></g><path d="M18 44 H82 M50 12 V76" stroke="%2300f0ff" stroke-width="0.5" opacity="0.32" fill="none"/><path d="M50 44 L50 14 A30 30 0 0 1 71 23 Z" fill="%2300f0ff" opacity="0.15"/><path d="M50 44 L71 23" stroke="%2300f0ff" stroke-width="1.3" opacity="0.95"/><path d="M50 44 L66 32" stroke="%2300f0ff" stroke-width="1.3" opacity="0.4"/><g stroke="%2300f0ff" stroke-width="1.5" fill="none" opacity="0.85"><path d="M5 12 V5 H12"/><path d="M95 88 V95 H88"/></g><g fill="%2300f0ff"><rect x="63" y="30.5" width="4.6" height="4.6" transform="rotate(45 65.3 32.8)"/><circle cx="34" cy="55" r="1.6" opacity="0.6"/><circle cx="28" cy="61" r="1.2" opacity="0.35"/><circle cx="50" cy="44" r="1.6" opacity="0.9"/></g><g fill="none" stroke="%2300f0ff" stroke-width="0.6"><rect x="8" y="79" width="34" height="3.4" opacity="0.55"/><rect x="46" y="79" width="16" height="3.4" stroke-dasharray="1.6 1.6" opacity="0.4"/></g><rect x="8" y="79" width="21" height="3.4" fill="%2300f0ff" opacity="0.75"/><rect x="8" y="88" width="54" height="3" fill="%23e0f2fe" opacity="0.5"/><rect x="8" y="93.5" width="30" height="2" fill="%23e0f2fe" opacity="0.25"/></svg>',
    tokens: {
      colors: {
        bg: { label: '舱底', default: '#060D1A', options: ['#060D1A', '#020617', '#0B1220', '#10041E'] },
        primary: { label: '读数白', default: '#E0F2FE', options: ['#E0F2FE', '#FFFFFF', '#F8FAFC', '#F5F3FF'] },
        accent: { label: '荧光青', default: '#00F0FF', options: ['#00F0FF', '#22D3EE', '#34D399', '#A78BFA'] }
      },
      fonts: { heading: { label: '标题', default: 'Inter, Helvetica, Arial, sans-serif', options: ['Inter, Helvetica, Arial, sans-serif', 'Helvetica, Arial, sans-serif'] } }
    },
    presets: [
      { name: '极夜荧光青', colors: { bg: '#060D1A', primary: '#E0F2FE', accent: '#00F0FF' } },
      { name: '列岛翡翠绿', colors: { bg: '#020617', primary: '#F8FAFC', accent: '#34D399' } },
      { name: '深空魅紫', colors: { bg: '#10041E', primary: '#F5F3FF', accent: '#A78BFA' } },
      { name: '编队青辉', colors: { bg: '#0B1220', primary: '#FFFFFF', accent: '#22D3EE' } }
    ],
    canvas: {
      virtualWidth: 1000, virtualHeight: 1000, defaultWidth: 1000, defaultHeight: 1000, backgroundColor: { $t: 'colors.bg' },
      backgroundImage: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000"><defs><pattern id="g" width="50" height="50" patternUnits="userSpaceOnUse"><path d="M50 0 L0 0 0 50" fill="none" stroke="%2300f0ff" stroke-width="0.6" opacity="0.1"/></pattern></defs><rect width="1000" height="1000" fill="url(%23g)"/><circle cx="500" cy="430" r="330" fill="%2300f0ff" opacity="0.04"/></svg>'
    },
    elements: [
      { id: 'radar-disc', type: 'image', src: RADAR_SVG, x: 230, y: 130, width: 540, height: 540, objectFit: 'contain', zIndex: 2, animation: { name: 'spinSlow', duration: 24000, iterationCount: 'infinite', easing: 'linear' }, editable: { position: true, size: { type: 'scale' } } },
      // ── 量程环组（token 描边，切预设＝整圈换色）
      { id: 'ring-outer', type: 'shape', shapeKind: 'circle', x: 257, y: 157, width: 486, height: 486, border: { color: { $t: 'colors.accent' }, width: 1.5, style: 'solid' }, opacity: 0.5, zIndex: 3 },
      { id: 'ring-mid', type: 'shape', shapeKind: 'circle', x: 330, y: 230, width: 340, height: 340, border: { color: { $t: 'colors.accent' }, width: 1, style: 'dashed' }, opacity: 0.3, zIndex: 3 },
      { id: 'ring-inner', type: 'shape', shapeKind: 'circle', x: 400, y: 300, width: 200, height: 200, border: { color: { $t: 'colors.accent' }, width: 1, style: 'solid' }, opacity: 0.34, zIndex: 3 },
      { id: 'ring-dial', type: 'shape', shapeKind: 'circle', x: 278, y: 178, width: 444, height: 444, border: { color: { $t: 'colors.accent' }, width: 9, style: 'dashed' }, opacity: 0.13, zIndex: 3, animation: { name: 'spinSlow', duration: 46000, iterationCount: 'infinite', easing: 'linear' } },
      { id: 'cross-h', type: 'shape', shapeKind: 'rect', x: 257, y: 399, width: 486, height: 1.5, fill: { $t: 'colors.accent' }, opacity: 0.28, zIndex: 3, animation: { name: 'slideInLeft', duration: 800, delay: 150 } },
      { id: 'cross-v', type: 'shape', shapeKind: 'rect', x: 499, y: 157, width: 1.5, height: 486, fill: { $t: 'colors.accent' }, opacity: 0.28, zIndex: 3, animation: { name: 'fadeInDown', duration: 800, delay: 260 } },
      // ── 扫掠条：同速不同初角 → 三条并转，拖出一段余辉扇形
      { id: 'sweep-a', type: 'shape', shapeKind: 'rect', x: 252, y: 398, width: 496, height: 3.5, fill: { $t: 'colors.accent' }, opacity: 0.55, borderRadius: 2, zIndex: 3, shadow: { offsetX: 0, offsetY: 0, blur: 16, color: 'rgba(0,240,255,0.55)' }, animation: { name: 'spinSlow', duration: 9000, iterationCount: 'infinite', easing: 'linear' } },
      { id: 'sweep-b', type: 'shape', shapeKind: 'rect', x: 252, y: 398, width: 496, height: 3, rotation: 14, fill: { $t: 'colors.accent' }, opacity: 0.3, borderRadius: 2, zIndex: 3, animation: { name: 'spinSlow', duration: 9000, iterationCount: 'infinite', easing: 'linear' } },
      { id: 'sweep-c', type: 'shape', shapeKind: 'rect', x: 252, y: 398, width: 496, height: 2.5, rotation: 28, fill: { $t: 'colors.accent' }, opacity: 0.16, borderRadius: 2, zIndex: 3, animation: { name: 'spinSlow', duration: 9000, iterationCount: 'infinite', easing: 'linear' } },
      { id: 'core-dot', type: 'shape', shapeKind: 'circle', x: 492, y: 392, width: 16, height: 16, fill: { $t: 'colors.accent' }, opacity: 0.85, zIndex: 4, animation: { name: 'heartbeat', duration: 2600, iterationCount: 'infinite' } },
      // ── 方位刻度
      { id: 'deg-000', type: 'text', content: '000°', fontFamily: 'Courier New, monospace', fontSize: 16, fontWeight: '700', color: { $t: 'colors.accent' }, opacity: 0.75, letterSpacing: 2, textAlign: 'center', x: 458, y: 110, width: 84, height: 22, zIndex: 5, animation: { name: 'fadeIn', duration: 600, delay: 700 }, editable: { content: true } },
      { id: 'deg-090', type: 'text', content: '090°', fontFamily: 'Courier New, monospace', fontSize: 16, fontWeight: '700', color: { $t: 'colors.accent' }, opacity: 0.6, letterSpacing: 2, x: 756, y: 388, width: 66, height: 22, zIndex: 5, animation: { name: 'fadeIn', duration: 600, delay: 800 }, editable: { content: true } },
      { id: 'deg-180', type: 'text', content: '180°', fontFamily: 'Courier New, monospace', fontSize: 16, fontWeight: '700', color: { $t: 'colors.accent' }, opacity: 0.6, letterSpacing: 2, textAlign: 'center', x: 458, y: 664, width: 84, height: 22, zIndex: 5, animation: { name: 'fadeIn', duration: 600, delay: 900 }, editable: { content: true } },
      { id: 'deg-270', type: 'text', content: '270°', fontFamily: 'Courier New, monospace', fontSize: 16, fontWeight: '700', color: { $t: 'colors.accent' }, opacity: 0.6, letterSpacing: 2, textAlign: 'right', x: 176, y: 388, width: 66, height: 22, zIndex: 5, animation: { name: 'fadeIn', duration: 600, delay: 1000 }, editable: { content: true } },
      { id: 'bracket-tl', type: 'shape', shapeKind: 'rect', x: 60, y: 60, width: 64, height: 64, border: { color: { $t: 'colors.accent' }, width: 3, style: 'solid' }, zIndex: 3, animation: { name: 'fadeIn', duration: 500 } },
      { id: 'bracket-br', type: 'shape', shapeKind: 'rect', x: 876, y: 876, width: 64, height: 64, border: { color: { $t: 'colors.accent' }, width: 3, style: 'solid' }, zIndex: 3, animation: { name: 'fadeIn', duration: 500, delay: 200 } },
      { id: 'lock-blip', type: 'shape', shapeKind: 'circle', x: 560, y: 280, width: 14, height: 14, fill: { $t: 'colors.accent' }, zIndex: 4, animation: { name: 'twinkle', duration: 1800, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'lock-ring', type: 'shape', shapeKind: 'circle', x: 540, y: 260, width: 54, height: 54, border: { color: { $t: 'colors.accent' }, width: 1.5, style: 'solid' }, zIndex: 4, animation: { name: 'ripple', duration: 2400, iterationCount: 'infinite', easing: 'ease-out' } },
      // ── 目标点：菱形＋编号，另挂一条虚线航迹
      { id: 'tgt-a', type: 'shape', shapeKind: 'rect', x: 647, y: 225, width: 16, height: 16, rotation: 45, fill: { $t: 'colors.accent' }, opacity: 0.92, zIndex: 5, animation: { name: 'twinkle', duration: 2100, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'tgt-a-tag', type: 'text', content: 'T-041 · 前机 M0.84', fontFamily: 'Courier New, monospace', fontSize: 15, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 1, x: 678, y: 216, width: 226, height: 22, zIndex: 5, animation: { name: 'slideInRight', duration: 600, delay: 900 }, editable: { content: true } },
      { id: 'tgt-b', type: 'shape', shapeKind: 'rect', x: 372, y: 498, width: 13, height: 13, rotation: 45, fill: { $t: 'colors.accent' }, opacity: 0.62, zIndex: 5, animation: { name: 'twinkle', duration: 2600, delay: 500, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'tgt-b-tag', type: 'text', content: 'T-077 · 慢速货机', fontFamily: 'Courier New, monospace', fontSize: 15, color: { $t: 'colors.accent' }, opacity: 0.72, letterSpacing: 1, x: 396, y: 520, width: 200, height: 22, zIndex: 5, animation: { name: 'fadeIn', duration: 600, delay: 1100 }, editable: { content: true } },
      { id: 'tgt-b-track', type: 'shape', shapeKind: 'rect', x: 226, y: 518, width: 264, height: 7, rotation: -32, border: { color: { $t: 'colors.accent' }, width: 1.5, style: 'dashed' }, opacity: 0.45, zIndex: 4, animation: { name: 'fadeIn', duration: 700, delay: 1250 } },
      { id: 'tele-left', type: 'text', content: 'TRK 041 · BRG 274°\nALT 38,000 · SPD M0.86\nLINK ... SECURE', fontFamily: 'Courier New, monospace', fontSize: 19, fontWeight: '700', color: { $t: 'colors.accent' }, lineHeight: 1.8, x: 66, y: 150, width: 300, height: 120, zIndex: 4, animation: { name: 'slideUpFade', duration: 700, delay: 400 }, editable: { content: true } },
      { id: 'tele-right', type: 'text', content: 'SWEEP 15 rpm\nNOISE FLOOR -92dB\nTHREAT LVL ... LOW', fontFamily: 'Courier New, monospace', fontSize: 19, fontWeight: '700', color: { $t: 'colors.accent' }, opacity: 0.75, lineHeight: 1.8, textAlign: 'right', x: 640, y: 620, width: 296, height: 120, zIndex: 4, animation: { name: 'slideUpFade', duration: 700, delay: 650 }, editable: { content: true } },
      { id: 'title-cn', type: 'text', content: '全域态势感知', fontFamily: { $t: 'fonts.heading' }, fontSize: 68, fontWeight: '900', color: { $t: 'colors.primary' }, letterSpacing: 14, textAlign: 'center', x: 150, y: 712, width: 700, height: 92, zIndex: 5, animation: { name: 'zoomIn', duration: 800 }, editable: { content: true, fontSize: { type: 'range', min: 44, max: 88 }, position: true } },
      { id: 'title-sub', type: 'text', content: 'REAL-TIME OPERATIONS CENTER // UPLINK ESTABLISHED', fontFamily: 'Courier New, monospace', fontSize: 17, color: { $t: 'colors.primary' }, opacity: 0.55, letterSpacing: 4, textAlign: 'center', x: 180, y: 820, width: 640, height: 28, zIndex: 5, animation: { name: 'fadeIn', duration: 700, delay: 900 }, editable: { content: true } },
      // ── 量程条
      { id: 'rng-bar', type: 'shape', shapeKind: 'rect', x: 60, y: 900, width: 288, height: 14, fill: { $t: 'colors.accent' }, opacity: 0.34, border: { color: { $t: 'colors.accent' }, width: 1.5, style: 'dashed' }, zIndex: 5, animation: { name: 'slideInLeft', duration: 800, delay: 1000 } },
      { id: 'rng-tag', type: 'text', content: 'RANGE 120 NM · 每格 30 NM', fontFamily: 'Courier New, monospace', fontSize: 16, color: { $t: 'colors.primary' }, opacity: 0.62, letterSpacing: 2, x: 360, y: 894, width: 320, height: 24, zIndex: 5, animation: { name: 'fadeIn', duration: 600, delay: 1200 }, editable: { content: true } }
    ]
  },
  {
    id: 'tech-terminal-crt', name: '终端绿字流', version: '1.0.0', category: 'tech',
    tags: ['tech', 'terminal', 'crt', 'monospace', 'retro'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><defs><pattern id="scan" width="4" height="3" patternUnits="userSpaceOnUse"><rect width="4" height="1.3" fill="%23000000" opacity="0.5"/></pattern></defs><rect width="100" height="100" fill="%23060a06"/><circle cx="50" cy="52" r="40" fill="%234ade80" opacity="0.05"/><rect x="9" y="11" width="82" height="78" rx="3" fill="none" stroke="%234ade80" stroke-width="1.4"/><rect x="9" y="11" width="82" height="9" fill="%23166534" opacity="0.8"/><g fill="%234ade80"><circle cx="15" cy="15.5" r="1.5"/><circle cx="20" cy="15.5" r="1.5" opacity="0.6"/><circle cx="25" cy="15.5" r="1.5" opacity="0.35"/></g><rect x="64" y="13.5" width="23" height="4" fill="%23166534" opacity="0.9"/><rect x="9" y="20" width="82" height="3.4" fill="%23166534" opacity="0.45"/><rect x="14" y="27" width="30" height="2.4" fill="%234ade80" opacity="0.95"/><rect x="14" y="32" width="46" height="2" fill="%234ade80" opacity="0.6"/><rect x="14" y="36.5" width="36" height="2" fill="%234ade80" opacity="0.45"/><rect x="14" y="47" width="52" height="8" fill="%234ade80" opacity="0.28" transform="translate(0.6 0.6)"/><rect x="13" y="46" width="52" height="8" fill="%234ade80" opacity="0.95"/><rect x="13" y="57" width="34" height="5" fill="%234ade80" opacity="0.9"/><rect x="14" y="66" width="54" height="1.8" fill="%234ade80" opacity="0.8"/><rect x="14" y="66" width="38" height="1.8" fill="%234ade80"/><rect x="13" y="71" width="72" height="14" fill="none" stroke="%234ade80" stroke-width="0.6" opacity="0.45"/><g fill="%234ade80" opacity="0.5"><rect x="15.5" y="73.5" width="28" height="1.4"/><rect x="15.5" y="76.5" width="20" height="1.4"/><rect x="15.5" y="79.5" width="33" height="1.4"/><rect x="54" y="73.5" width="18" height="1.4" opacity="0.7"/><rect x="54" y="76.5" width="24" height="1.4" opacity="0.55"/></g><rect x="13" y="88" width="5" height="0.8" fill="%234ade80" opacity="0.7"/><rect width="100" height="100" fill="url(%23scan)" opacity="0.35"/></svg>',
    tokens: {
      colors: {
        bg: { label: '屏底', default: '#060A06', options: ['#060A06', '#0A0F0A', '#0B1021', '#100B02'] },
        primary: { label: '荧光', default: '#4ADE80', options: ['#4ADE80', '#86EFAC', '#38BDF8', '#FBBF24'] },
        accent: { label: '余辉', default: '#166534', options: ['#166534', '#14532D', '#075985', '#78350F'] }
      },
      fonts: { heading: { label: '字体', default: 'Courier New, monospace', options: ['Courier New, monospace', 'Menlo, Consolas, monospace'] } }
    },
    presets: [
      { name: '磷光绿', colors: { bg: '#060A06', primary: '#4ADE80', accent: '#166534' } },
      { name: '琥珀老屏', colors: { bg: '#100B02', primary: '#FBBF24', accent: '#78350F' } },
      { name: '冷蓝蓝屏', colors: { bg: '#0B1021', primary: '#38BDF8', accent: '#075985' } },
      { name: '浅苔旧屏', colors: { bg: '#0A0F0A', primary: '#86EFAC', accent: '#14532D' } }
    ],
    canvas: {
      virtualWidth: 1000, virtualHeight: 1000, defaultWidth: 1000, defaultHeight: 1000, backgroundColor: { $t: 'colors.bg' },
      backgroundImage: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000"><circle cx="500" cy="500" r="460" fill="%234ade80" opacity="0.035"/><circle cx="500" cy="500" r="240" fill="%234ade80" opacity="0.03"/></svg>'
    },
    elements: [
      { id: 'win-frame', type: 'shape', shapeKind: 'rect', x: 60, y: 60, width: 880, height: 880, border: { color: { $t: 'colors.primary' }, width: 2, style: 'solid' }, borderRadius: 10, zIndex: 2 },
      { id: 'win-bar', type: 'shape', shapeKind: 'rect', x: 60, y: 60, width: 880, height: 54, fill: { $t: 'colors.accent' }, opacity: 0.6, borderRadius: 10, zIndex: 2 },
      // ── 窗口三件套按钮＋标签页
      { id: 'win-btn-1', group: 'win-btn-', type: 'shape', shapeKind: 'circle', x: 830, y: 78, width: 18, height: 18, fill: { $t: 'colors.primary' }, opacity: 0.9, zIndex: 3 },
      { id: 'win-btn-2', group: 'win-btn-', type: 'shape', shapeKind: 'circle', x: 860, y: 78, width: 18, height: 18, fill: { $t: 'colors.primary' }, opacity: 0.52, zIndex: 3 },
      { id: 'win-btn-3', group: 'win-btn-', type: 'shape', shapeKind: 'circle', x: 890, y: 78, width: 18, height: 18, fill: { $t: 'colors.primary' }, opacity: 0.3, zIndex: 3 },
      { id: 'tab-strip', type: 'shape', shapeKind: 'rect', x: 62, y: 114, width: 876, height: 38, fill: { $t: 'colors.accent' }, opacity: 0.32, zIndex: 2 },
      { id: 'tab-on', type: 'shape', shapeKind: 'rect', x: 62, y: 114, width: 226, height: 38, fill: { $t: 'colors.primary' }, opacity: 0.12, zIndex: 2 },
      { id: 'tab-t1', type: 'text', content: 'build.log', fontFamily: { $t: 'fonts.heading' }, fontSize: 18, fontWeight: '700', color: { $t: 'colors.primary' }, x: 88, y: 121, width: 180, height: 24, zIndex: 3, editable: { content: true } },
      { id: 'tab-t2', type: 'text', content: 'deploy.sh', fontFamily: { $t: 'fonts.heading' }, fontSize: 18, color: { $t: 'colors.primary' }, opacity: 0.42, x: 316, y: 121, width: 160, height: 24, zIndex: 3, editable: { content: true } },
      { id: 'tab-t3', type: 'text', content: 'htop — 别关，服务器正在看你', fontFamily: { $t: 'fonts.heading' }, fontSize: 15, color: { $t: 'colors.primary' }, opacity: 0.28, textAlign: 'right', x: 560, y: 121, width: 366, height: 24, zIndex: 3, editable: { content: true } },
      { id: 'win-title', type: 'text', content: 'bash — cover-maker@core — 80×24', fontFamily: { $t: 'fonts.heading' }, fontSize: 18, fontWeight: '700', color: { $t: 'colors.primary' }, letterSpacing: 1, x: 84, y: 74, width: 600, height: 26, zIndex: 3, editable: { content: true } },
      { id: 'cmd-1', type: 'text', content: '$ ./build --target=production', fontFamily: { $t: 'fonts.heading' }, fontSize: 26, fontWeight: '700', color: { $t: 'colors.primary' }, x: 100, y: 170, width: 780, height: 40, zIndex: 3, animation: { name: 'slideUpFade', duration: 450 }, editable: { content: true } },
      { id: 'cmd-2', type: 'text', content: '✓ tokens resolved ......... 100%', fontFamily: { $t: 'fonts.heading' }, fontSize: 22, color: { $t: 'colors.primary' }, opacity: 0.75, x: 100, y: 226, width: 780, height: 38, zIndex: 3, animation: { name: 'slideUpFade', duration: 450, delay: 500 }, editable: { content: true } },
      { id: 'cmd-3', type: 'text', content: '✓ layers painted .......... 100%', fontFamily: { $t: 'fonts.heading' }, fontSize: 22, color: { $t: 'colors.primary' }, opacity: 0.75, x: 100, y: 272, width: 780, height: 38, zIndex: 3, animation: { name: 'slideUpFade', duration: 450, delay: 900 }, editable: { content: true } },
      { id: 'cmd-4', type: 'text', content: '$ git push origin main --force-with-lease', fontFamily: { $t: 'fonts.heading' }, fontSize: 26, fontWeight: '700', color: { $t: 'colors.primary' }, x: 100, y: 316, width: 780, height: 36, zIndex: 3, animation: { name: 'slideUpFade', duration: 450, delay: 1050 }, editable: { content: true } },
      { id: 'cmd-5', type: 'text', content: '▸ 42 templates · 0 处占位废话 · 2.4s', fontFamily: { $t: 'fonts.heading' }, fontSize: 22, color: { $t: 'colors.primary' }, opacity: 0.6, x: 100, y: 352, width: 780, height: 30, zIndex: 3, animation: { name: 'slideUpFade', duration: 450, delay: 1150 }, editable: { content: true } },
      // ── 磷光副本：同文案同位置，靠 blur 做发光底（不参与编辑，改主标题即可）
      { id: 'hero-glow', type: 'text', content: 'SHIP IT\nIN ONE ENTER', fontFamily: 'Inter, Helvetica, Arial, sans-serif', fontSize: 84, fontWeight: '900', color: { $t: 'colors.primary' }, opacity: 0.22, lineHeight: 1.12, letterSpacing: -1, x: 100, y: 380, width: 820, height: 230, zIndex: 2, shadow: { offsetX: 0, offsetY: 0, blur: 46, color: { $t: 'colors.primary' } }, animation: { name: 'glow', duration: 3200, iterationCount: 'infinite', easing: 'ease-in-out' }, editable: false },
      { id: 'hero', type: 'text', content: 'SHIP IT\nIN ONE ENTER', fontFamily: 'Inter, Helvetica, Arial, sans-serif', fontSize: 84, fontWeight: '900', color: { $t: 'colors.primary' }, lineHeight: 1.12, letterSpacing: -1, x: 100, y: 380, width: 820, height: 230, zIndex: 3, shadow: { offsetX: 0, offsetY: 0, blur: 26, color: 'rgba(74,222,128,0.45)' }, animation: { name: 'fadeInUp', duration: 800, delay: 1200 }, editable: { content: true, fontSize: { type: 'range', min: 56, max: 104 }, position: true } },
      { id: 'prog-line', type: 'text', content: '█████████████████░░░ 89% · uploading dist/ → cdn', fontFamily: { $t: 'fonts.heading' }, fontSize: 22, color: { $t: 'colors.primary' }, opacity: 0.72, x: 100, y: 622, width: 780, height: 30, zIndex: 3, animation: { name: 'pulse', duration: 2200, iterationCount: 'infinite', easing: 'ease-in-out' }, editable: { content: true } },
      { id: 'cursor-block', type: 'shape', shapeKind: 'rect', x: 100, y: 664, width: 40, height: 54, fill: { $t: 'colors.primary' }, zIndex: 3, animation: { name: 'blink', duration: 1000, iterationCount: 'infinite' } },
      { id: 'sel-line', type: 'shape', shapeKind: 'rect', x: 164, y: 672, width: 430, height: 34, fill: { $t: 'colors.primary' }, opacity: 0.14, borderRadius: 2, zIndex: 2 },
      { id: 'foot-log', type: 'text', content: 'uptime 99.99% · commits 1,284 · deploys 365 · zero downtime', fontFamily: { $t: 'fonts.heading' }, fontSize: 18, color: { $t: 'colors.primary' }, opacity: 0.5, x: 164, y: 676, width: 700, height: 30, zIndex: 3, editable: { content: true } },
      // ── 底部日志面板：左 INFO／右资源占用／最下一行待输入的 tail
      { id: 'log-frame', type: 'shape', shapeKind: 'rect', x: 100, y: 740, width: 800, height: 150, border: { color: { $t: 'colors.primary' }, width: 1.5, style: 'solid' }, opacity: 0.32, borderRadius: 6, zIndex: 2 },
      { id: 'log-left', type: 'text', content: '[15:04:11] INFO  tokens → #4ADE80 全部命中\n[15:04:11] INFO  38 layers · 0 orphan\n[15:04:12] WARN  标题 27 字，建议减肥\n[15:04:12] INFO  dist/cover.png 218 kB ✓', fontFamily: { $t: 'fonts.heading' }, fontSize: 15, color: { $t: 'colors.primary' }, opacity: 0.58, lineHeight: 1.7, x: 120, y: 754, width: 440, height: 122, zIndex: 3, animation: { name: 'slideUpFade', duration: 600, delay: 1400 }, editable: { content: true } },
      { id: 'log-right', type: 'text', content: 'mem 412MB / 8GB\nfan 2,100 rpm · 冷静\nqueue 0 · retry 0\nCPU 3% · 摸鱼中', fontFamily: { $t: 'fonts.heading' }, fontSize: 15, color: { $t: 'colors.primary' }, opacity: 0.4, textAlign: 'right', lineHeight: 1.7, x: 596, y: 754, width: 284, height: 122, zIndex: 3, animation: { name: 'fadeIn', duration: 600, delay: 1550 }, editable: { content: true } },
      { id: 'log-tail', type: 'text', content: '$ tail -f /var/log/cover.log · 按 . 进专注模式 ▍', fontFamily: { $t: 'fonts.heading' }, fontSize: 18, fontWeight: '700', color: { $t: 'colors.primary' }, opacity: 0.66, x: 100, y: 902, width: 800, height: 26, zIndex: 3, animation: { name: 'fadeIn', duration: 700, delay: 1500 }, editable: { content: true } },
      // ── CRT 玻璃：内缘高光弧＋暗角＋一条缓慢游走的磷光扫描带
      { id: 'glass-edge', type: 'shape', shapeKind: 'rect', x: 76, y: 76, width: 848, height: 848, border: { color: { $t: 'colors.primary' }, width: 1, style: 'solid' }, opacity: 0.12, borderRadius: 26, zIndex: 5 },
      { id: 'crt-vignette', type: 'overlay', background: TE_CRT_VIGNETTE, x: 0, y: 0, width: 1000, height: 1000, zIndex: 5 },
      { id: 'scan-band', type: 'overlay', background: TE_CRT_BAND, mixBlendMode: 'screen', opacity: 0.55, x: 62, y: 240, width: 876, height: 420, zIndex: 5, animation: { name: 'float', duration: 7000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'crt-lines', type: 'image', src: SCANLINE_SVG, x: 0, y: 0, width: 1000, height: 1000, objectFit: 'fill', opacity: 0.16, zIndex: 6, animation: { name: 'pulse', duration: 5200, iterationCount: 'infinite', easing: 'ease-in-out' } }
    ]
  },
  {
    id: 'tech-glass-aurora', name: '玻璃弥光', version: '1.0.0', category: 'tech',
    tags: ['tech', 'glassmorphism', 'aurora', 'light', 'gradient'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><defs><radialGradient id="b1" cx="30%" cy="30%" r="70%"><stop offset="0%" stop-color="%2338bdf8" stop-opacity="0.6"/><stop offset="100%" stop-color="%2338bdf8" stop-opacity="0"/></radialGradient><radialGradient id="b2" cx="60%" cy="40%" r="70%"><stop offset="0%" stop-color="%23a78bfa" stop-opacity="0.55"/><stop offset="100%" stop-color="%23a78bfa" stop-opacity="0"/></radialGradient><radialGradient id="b3" cx="50%" cy="50%" r="60%"><stop offset="0%" stop-color="%23f472b6" stop-opacity="0.4"/><stop offset="100%" stop-color="%23f472b6" stop-opacity="0"/></radialGradient><linearGradient id="ab" x1="0" y1="1" x2="1" y2="0"><stop offset="20%" stop-color="%2338bdf8" stop-opacity="0"/><stop offset="45%" stop-color="%23818cf8" stop-opacity="0.35"/><stop offset="70%" stop-color="%23f472b6" stop-opacity="0"/><stop offset="100%" stop-color="%23ffffff" stop-opacity="0"/></linearGradient></defs><rect width="100" height="100" fill="%23f2f6fb"/><rect width="100" height="100" fill="url(%23ab)"/><circle cx="26" cy="24" r="30" fill="url(%23b1)"/><circle cx="76" cy="66" r="30" fill="url(%23b2)"/><circle cx="34" cy="84" r="24" fill="url(%23b3)"/><circle cx="56" cy="-24" r="46" fill="none" stroke="%23ffffff" stroke-width="1.6" opacity="0.9"/><rect x="12" y="20" width="60" height="48" rx="9" fill="%23ffffff" opacity="0.3" stroke="%23ffffff" stroke-opacity="0.7"/><rect x="18" y="28" width="60" height="46" rx="8" fill="%23ffffff" opacity="0.78" stroke="%23ffffff" stroke-opacity="0.9"/><rect x="24" y="34" width="14" height="14" rx="4" fill="%23ffffff" stroke="%23cbd5e1" stroke-width="0.8"/><rect x="26" y="38" width="10" height="1.6" fill="%2338bdf8" opacity="0.6"/><rect x="42" y="35" width="30" height="3" fill="%23334155" opacity="0.75"/><rect x="42" y="41" width="20" height="2" fill="%23334155" opacity="0.35"/><rect x="24" y="54" width="48" height="1.4" fill="%23334155" opacity="0.18"/><rect x="24" y="59" width="40" height="1.4" fill="%23334155" opacity="0.13"/><rect x="24" y="64" width="26" height="1.4" fill="%23334155" opacity="0.1"/><g fill="%23818cf8"><circle cx="86" cy="18" r="3" opacity="0.75"/><circle cx="10" cy="58" r="2" opacity="0.5"/><circle cx="92" cy="46" r="1.6" opacity="0.4"/></g><rect x="62" y="76" width="26" height="14" rx="4" fill="%23ffffff" opacity="0.7" stroke="%23ffffff"/><g fill="%2338bdf8"><rect x="66" y="84" width="2.6" height="4"/><rect x="70.5" y="81" width="2.6" height="7" opacity="0.75"/><rect x="75" y="85" width="2.6" height="3" opacity="0.5"/><rect x="79.5" y="79.5" width="2.6" height="8.5" opacity="0.9"/></g></svg>',
    tokens: {
      colors: {
        bg: { label: '底色', default: '#F2F6FB', options: ['#F2F6FB', '#FFFFFF', '#EEF2FF', '#F5F3FF', '#ECFEFF'] },
        primary: { label: '字色', default: '#1E293B', options: ['#1E293B', '#0F172A', '#312E81', '#111827'] },
        accent: { label: '弥光', default: '#38BDF8', options: ['#38BDF8', '#818CF8', '#22D3EE', '#F472B6'] }
      },
      fonts: { heading: { label: '标题', default: 'Inter, Helvetica, Arial, sans-serif', options: ['Inter, Helvetica, Arial, sans-serif', 'PingFang SC, Microsoft YaHei, sans-serif'] } }
    },
    presets: [
      { name: '晴空弥光', colors: { bg: '#F2F6FB', primary: '#1E293B', accent: '#38BDF8' } },
      { name: '晨雾紫罗兰', colors: { bg: '#F5F3FF', primary: '#312E81', accent: '#818CF8' } },
      { name: '薄荷青雾', colors: { bg: '#ECFEFF', primary: '#111827', accent: '#22D3EE' } },
      { name: '淡靛粉霞', colors: { bg: '#EEF2FF', primary: '#0F172A', accent: '#F472B6' } }
    ],
    canvas: { virtualWidth: 1000, virtualHeight: 1000, defaultWidth: 1000, defaultHeight: 1000, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      // ── 极光层：一条斜穿的主带＋四团低透明度色斑，叠出弥光纵深
      { id: 'aurora-band', type: 'overlay', background: TE_AURORA_BAND, x: -60, y: 30, width: 1120, height: 940, opacity: 0.85, zIndex: 1, animation: { name: 'drift', duration: 14000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'blob-1', group: 'blob-', type: 'overlay', background: 'radial-gradient(circle at 30% 30%, rgba(56,189,248,0.55), transparent 62%)', x: -120, y: -140, width: 640, height: 640, zIndex: 1, animation: { name: 'gradientPan', duration: 9000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'blob-2', group: 'blob-', type: 'overlay', background: 'radial-gradient(circle at 60% 40%, rgba(167,139,250,0.5), transparent 60%)', x: 520, y: 380, width: 620, height: 620, zIndex: 1, animation: { name: 'float', duration: 8000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'blob-3', group: 'blob-', type: 'overlay', background: 'radial-gradient(circle at 50% 50%, rgba(244,114,182,0.32), transparent 60%)', x: 120, y: 640, width: 460, height: 460, zIndex: 1, animation: { name: 'drift', duration: 11000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'blob-4', group: 'blob-', type: 'overlay', background: 'radial-gradient(circle at 42% 46%, rgba(129,140,248,0.34), transparent 58%)', x: 560, y: -170, width: 560, height: 560, zIndex: 1, animation: { name: 'float', duration: 9600, delay: 400, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'blob-5', group: 'blob-', type: 'overlay', background: 'radial-gradient(circle at 55% 45%, rgba(45,212,191,0.26), transparent 60%)', x: -170, y: 470, width: 480, height: 480, zIndex: 1, animation: { name: 'drift', duration: 12400, iterationCount: 'infinite', easing: 'ease-in-out' } },
      // ── 玻璃层：背板 → 主卡 → 内衬细线，三层错位的毛玻璃
      { id: 'card-back', type: 'shape', shapeKind: 'rect', x: 96, y: 176, width: 706, height: 548, fill: 'rgba(255,255,255,0.34)', borderRadius: 40, border: { color: 'rgba(255,255,255,0.72)', width: 1.5, style: 'solid' }, zIndex: 1, shadow: { offsetX: 0, offsetY: 18, blur: 40, color: 'rgba(30,41,59,0.08)' }, animation: { name: 'fadeInUp', duration: 700, delay: 100 } },
      { id: 'card-main', type: 'shape', shapeKind: 'rect', x: 130, y: 220, width: 740, height: 560, fill: 'rgba(255,255,255,0.62)', borderRadius: 34, border: { color: 'rgba(255,255,255,0.9)', width: 1.5, style: 'solid' }, zIndex: 2, shadow: { offsetX: 0, offsetY: 24, blur: 48, color: 'rgba(30,41,59,0.12)' }, animation: { name: 'fadeInUp', duration: 900 } },
      { id: 'card-inset', type: 'shape', shapeKind: 'rect', x: 158, y: 248, width: 684, height: 504, fill: 'rgba(255,255,255,0.2)', borderRadius: 24, border: { color: 'rgba(255,255,255,0.62)', width: 1, style: 'solid' }, zIndex: 2, animation: { name: 'fadeIn', duration: 700, delay: 400 } },
      { id: 'card-chip', type: 'shape', shapeKind: 'rect', x: 176, y: 268, width: 120, height: 40, fill: 'rgba(255,255,255,0.85)', borderRadius: 20, zIndex: 3, animation: { name: 'fadeIn', duration: 600, delay: 500 } },
      { id: 'chip-text', type: 'text', content: 'GLASS UI', fontFamily: { $t: 'fonts.heading' }, fontSize: 16, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 2, x: 190, y: 278, width: 100, height: 22, zIndex: 4, editable: { content: true } },
      { id: 'chip-2', type: 'shape', shapeKind: 'rect', x: 312, y: 268, width: 228, height: 40, fill: 'rgba(255,255,255,0.7)', borderRadius: 20, border: { color: 'rgba(255,255,255,0.9)', width: 1, style: 'solid' }, zIndex: 3, animation: { name: 'fadeIn', duration: 600, delay: 650 } },
      { id: 'chip-2-text', type: 'text', content: 'blur(28px) saturate(1.8)', fontFamily: 'Courier New, monospace', fontSize: 13, color: { $t: 'colors.primary' }, opacity: 0.6, x: 330, y: 278, width: 200, height: 22, zIndex: 4, editable: { content: true } },
      { id: 'title-cn', type: 'text', content: '轻界 · 智感', fontFamily: { $t: 'fonts.heading' }, fontSize: 78, fontWeight: '900', color: { $t: 'colors.primary' }, letterSpacing: 10, x: 176, y: 356, width: 660, height: 110, zIndex: 3, animation: { name: 'rise', duration: 800, delay: 300 }, editable: { content: true, fontSize: { type: 'range', min: 48, max: 96 }, position: true } },
      { id: 'title-en', type: 'text', content: 'CLARITY, THROUGH DIFFUSION', fontFamily: { $t: 'fonts.heading' }, fontSize: 22, fontWeight: '600', color: { $t: 'colors.primary' }, opacity: 0.55, letterSpacing: 6, x: 178, y: 486, width: 640, height: 34, zIndex: 3, animation: { name: 'fadeIn', duration: 700, delay: 800 }, editable: { content: true } },
      { id: 'divider', type: 'shape', shapeKind: 'line', x: 178, y: 560, width: 644, height: 2, fill: 'rgba(30,41,59,0.15)', zIndex: 3 },
      { id: 'desc', type: 'text', content: '弥光在玻璃上流动，信息在克制中显形。2026 NEXT-GEN INTERFACE SERIES.', fontFamily: { $t: 'fonts.heading' }, fontSize: 21, color: { $t: 'colors.primary' }, opacity: 0.6, lineHeight: 1.7, x: 178, y: 596, width: 644, height: 120, zIndex: 3, editable: { content: true } },
      { id: 'orb', type: 'shape', shapeKind: 'circle', x: 806, y: 128, width: 26, height: 26, fill: { $t: 'colors.accent' }, opacity: 0.8, zIndex: 3, animation: { name: 'bounce', duration: 3600, iterationCount: 'infinite', easing: 'ease-in-out' } },
      // ── 悬浮小卡：透光率读数＋迷你柱状图
      { id: 'mini-card', type: 'shape', shapeKind: 'rect', x: 520, y: 64, width: 262, height: 112, fill: 'rgba(255,255,255,0.58)', borderRadius: 26, border: { color: 'rgba(255,255,255,0.92)', width: 1.5, style: 'solid' }, zIndex: 3, shadow: { offsetX: 0, offsetY: 16, blur: 36, color: 'rgba(30,41,59,0.1)' }, animation: { name: 'float', duration: 7600, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'mini-label', type: 'text', content: '透光率 TRANSMIT', fontFamily: { $t: 'fonts.heading' }, fontSize: 16, fontWeight: '600', color: { $t: 'colors.primary' }, opacity: 0.55, letterSpacing: 1, x: 544, y: 82, width: 200, height: 24, zIndex: 4, editable: { content: true } },
      { id: 'mini-value', type: 'text', content: '92.4%', fontFamily: { $t: 'fonts.heading' }, fontSize: 36, fontWeight: '900', color: { $t: 'colors.accent' }, x: 544, y: 106, width: 140, height: 42, zIndex: 4, editable: { content: true } },
      { id: 'spark-0', group: 'spark-', type: 'shape', shapeKind: 'rect', x: 690, y: 130, width: 14, height: 20, fill: { $t: 'colors.accent' }, opacity: 0.35, borderRadius: 4, zIndex: 4, animation: { name: 'pulse', duration: 3400, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'spark-1', group: 'spark-', type: 'shape', shapeKind: 'rect', x: 712, y: 116, width: 14, height: 34, fill: { $t: 'colors.accent' }, opacity: 0.6, borderRadius: 4, zIndex: 4, animation: { name: 'pulse', duration: 3400, delay: 300, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'spark-2', group: 'spark-', type: 'shape', shapeKind: 'rect', x: 734, y: 136, width: 14, height: 14, fill: { $t: 'colors.accent' }, opacity: 0.28, borderRadius: 4, zIndex: 4, animation: { name: 'pulse', duration: 3400, delay: 600, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'spark-3', group: 'spark-', type: 'shape', shapeKind: 'rect', x: 756, y: 108, width: 14, height: 42, fill: { $t: 'colors.accent' }, opacity: 0.85, borderRadius: 4, zIndex: 4, animation: { name: 'pulse', duration: 3400, delay: 900, iterationCount: 'infinite', easing: 'ease-in-out' } },
      // ── 光斑散点＋边缘高光弧＋规格脚注
      { id: 'bokeh-1', type: 'shape', shapeKind: 'circle', x: 94, y: 690, width: 16, height: 16, fill: { $t: 'colors.accent' }, opacity: 0.5, zIndex: 3, animation: { name: 'twinkle', duration: 4200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'bokeh-2', type: 'shape', shapeKind: 'circle', x: 916, y: 436, width: 12, height: 12, fill: { $t: 'colors.accent' }, opacity: 0.35, zIndex: 3, animation: { name: 'twinkle', duration: 5200, delay: 800, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'arc-top', type: 'shape', shapeKind: 'circle', x: 250, y: -540, width: 780, height: 780, border: { color: { $t: 'colors.accent' }, width: 2, style: 'solid' }, opacity: 0.3, zIndex: 3, animation: { name: 'fadeIn', duration: 900, delay: 700 } },
      { id: 'kicker', type: 'text', content: '弥光玻璃 · 第四号规格卡', fontFamily: { $t: 'fonts.heading' }, fontSize: 18, fontWeight: '700', color: { $t: 'colors.accent' }, opacity: 0.85, letterSpacing: 3, x: 96, y: 112, width: 360, height: 28, zIndex: 4, animation: { name: 'slideInLeft', duration: 700 }, editable: { content: true } },
      { id: 'caption', type: 'text', content: 'GLASS SPEC SHEET · 4 LAYERS · n=1.52 · 2026', fontFamily: 'Courier New, monospace', fontSize: 16, color: { $t: 'colors.primary' }, opacity: 0.45, letterSpacing: 2, x: 178, y: 812, width: 644, height: 26, zIndex: 3, animation: { name: 'fadeIn', duration: 700, delay: 1100 }, editable: { content: true } }
    ]
  },
  {
    id: 'tech-iso-datacube', name: '等距算力立方', version: '1.0.0', category: 'tech',
    tags: ['tech', 'isometric', 'datacenter', 'edge', '3d'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%2308131c"/><g stroke="%2322d3ee" stroke-width="0.5" opacity="0.16"><path d="M4 62 L96 93 M10 55 L84 90 M18 50 L70 76"/><path d="M96 62 L4 93 M90 55 L16 90 M82 50 L30 76"/></g><g><rect x="62" y="8" width="30" height="7" rx="2" fill="%2308131c" stroke="%2322d3ee" stroke-width="0.9"/><rect x="60" y="18" width="34" height="7" rx="2" fill="%2308131c" stroke="%2322d3ee" stroke-width="0.9" opacity="0.8"/><rect x="58" y="28" width="38" height="7" rx="2" fill="%2308131c" stroke="%2322d3ee" stroke-width="0.9" opacity="0.6"/></g><g fill="%2322d3ee"><circle cx="65" cy="11.5" r="1.2"/><circle cx="69" cy="11.5" r="1.2" opacity="0.6"/><circle cx="73" cy="11.5" r="1.2" opacity="0.35"/></g><g fill="none" stroke="%2322d3ee" stroke-linejoin="round"><path d="M40 42 L64 54 L40 66 L16 54 Z" stroke-width="1.5" opacity="0.95"/><path d="M16 62 L40 74 L64 62" stroke-width="1.2" opacity="0.6"/><path d="M16 70 L40 82 L64 70" stroke-width="1.2" opacity="0.35"/><path d="M16 54 V70 M64 54 V70 M40 66 V82" stroke-width="0.9" opacity="0.5"/></g><ellipse cx="40" cy="88" rx="24" ry="7" fill="none" stroke="%2322d3ee" stroke-width="0.8" stroke-dasharray="2 2" opacity="0.4"/><path d="M40 82 V88" stroke="%2322d3ee" stroke-width="0.8" stroke-dasharray="1.6 1.6" opacity="0.55"/><circle cx="40" cy="42" r="2" fill="%2322d3ee"/><path d="M22 48 L10 60" stroke="%23a5f3fc" stroke-width="0.7" opacity="0.7"/><rect x="2" y="56" width="12" height="3" fill="%2322d3ee" opacity="0.8"/><rect x="2" y="62" width="8" height="2" fill="%23ecfeff" opacity="0.35"/><rect x="70" y="90" width="24" height="3" fill="%2322d3ee" opacity="0.65"/><rect x="70" y="95" width="16" height="2" fill="%23ecfeff" opacity="0.3"/></svg>',
    tokens: {
      colors: {
        bg: { label: '深底', default: '#08131C', options: ['#08131C', '#0B1220', '#020617', '#0F172A'] },
        primary: { label: '字白', default: '#ECFEFF', options: ['#ECFEFF', '#FFFFFF', '#E2E8F0', '#F8FAFC'] },
        accent: { label: '电光青', default: '#22D3EE', options: ['#22D3EE', '#06B6D4', '#6366F1', '#F59E0B'] }
      },
      fonts: { heading: { label: '标题', default: 'Inter, Helvetica, Arial, sans-serif', options: ['Inter, Helvetica, Arial, sans-serif', 'Impact, sans-serif'] } }
    },
    presets: [
      { name: '边缘电光青', colors: { bg: '#08131C', primary: '#ECFEFF', accent: '#22D3EE' } },
      { name: '芯群靛蓝', colors: { bg: '#0B1220', primary: '#E2E8F0', accent: '#6366F1' } },
      { name: '过载琥珀', colors: { bg: '#0F172A', primary: '#F8FAFC', accent: '#F59E0B' } },
      { name: '纯白青栈', colors: { bg: '#020617', primary: '#FFFFFF', accent: '#06B6D4' } }
    ],
    canvas: {
      virtualWidth: 1000, virtualHeight: 1000, defaultWidth: 1000, defaultHeight: 1000, backgroundColor: { $t: 'colors.bg' },
      backgroundImage: ISO_BG
    },
    elements: [
      // ── 等轴地面网格（氛围层：白透细纹，任何深色预设都不刺眼）
      { id: 'iso-ground', type: 'overlay', background: TE_ISO_GROUND, x: 380, y: 520, width: 600, height: 460, opacity: 0.95, zIndex: 1, animation: { name: 'fadeIn', duration: 900 } },
      { id: 'plate-3', group: 'plate-', type: 'shape', shapeKind: 'rect', x: 560, y: 210, width: 320, height: 88, fill: { $t: 'colors.bg' }, borderRadius: 16, border: { color: { $t: 'colors.accent' }, width: 2, style: 'solid' }, opacity: 0.85, zIndex: 3, shadow: { offsetX: 0, offsetY: 16, blur: 30, color: 'rgba(0,0,0,0.5)' }, animation: { name: 'float', duration: 6200, iterationCount: 'infinite', delay: 600, easing: 'ease-in-out' } },
      { id: 'plate-2', group: 'plate-', type: 'shape', shapeKind: 'rect', x: 540, y: 330, width: 360, height: 88, fill: { $t: 'colors.bg' }, borderRadius: 16, border: { color: { $t: 'colors.accent' }, width: 2, style: 'solid' }, zIndex: 2, shadow: { offsetX: 0, offsetY: 16, blur: 30, color: 'rgba(0,0,0,0.5)' }, animation: { name: 'float', duration: 6200, iterationCount: 'infinite', delay: 300, easing: 'ease-in-out' } },
      { id: 'plate-1', group: 'plate-', type: 'shape', shapeKind: 'rect', x: 520, y: 450, width: 400, height: 88, fill: { $t: 'colors.bg' }, borderRadius: 16, border: { color: { $t: 'colors.accent' }, width: 2.5, style: 'solid' }, zIndex: 1, shadow: { offsetX: 0, offsetY: 18, blur: 34, color: 'rgba(0,0,0,0.55)' }, animation: { name: 'float', duration: 6200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'led-a', type: 'shape', shapeKind: 'circle', x: 552, y: 482, width: 14, height: 14, fill: { $t: 'colors.accent' }, zIndex: 4, animation: { name: 'heartbeat', duration: 2000, iterationCount: 'infinite' } },
      { id: 'led-b', type: 'shape', shapeKind: 'circle', x: 576, y: 482, width: 14, height: 14, fill: { $t: 'colors.accent' }, opacity: 0.7, zIndex: 4, animation: { name: 'heartbeat', duration: 2000, delay: 400, iterationCount: 'infinite' } },
      { id: 'led-c', type: 'shape', shapeKind: 'circle', x: 600, y: 482, width: 14, height: 14, fill: { $t: 'colors.accent' }, opacity: 0.4, zIndex: 4, animation: { name: 'heartbeat', duration: 2000, delay: 800, iterationCount: 'infinite' } },
      // ── 等轴菱形面堆叠：顶层整圈＋两层前缘 V＋三条竖直棱
      ...teRhombus('iso-l1', 700, 640, 180, 90, 2, 'colors.accent', 0.85, 4, { animation: { name: 'fadeIn', duration: 800, delay: 500 } }),
      ...teChevron('iso-l2', 700, 730, 180, 90, 2, 'colors.accent', 0.5, 4, { animation: { name: 'fadeIn', duration: 800, delay: 700 } }),
      ...teChevron('iso-l3', 700, 820, 180, 90, 2, 'colors.accent', 0.32, 4, { animation: { name: 'fadeIn', duration: 800, delay: 900 } }),
      teSeg('iso-v-l', 520, 640, 520, 820, 2, 'colors.accent', 0.45, 4),
      teSeg('iso-v-r', 880, 640, 880, 820, 2, 'colors.accent', 0.45, 4),
      teSeg('iso-v-f', 700, 730, 700, 910, 2, 'colors.accent', 0.38, 4),
      // ── 投影：落影椭圆＋竖直投影虚线＋地面基准虚线
      { id: 'iso-shadow', type: 'shape', shapeKind: 'circle', x: 530, y: 878, width: 340, height: 104, border: { color: { $t: 'colors.accent' }, width: 1.5, style: 'dashed' }, opacity: 0.3, zIndex: 2, animation: { name: 'pulse', duration: 5200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'iso-proj-v', type: 'shape', shapeKind: 'rect', x: 698, y: 906, width: 4, height: 46, border: { color: { $t: 'colors.accent' }, width: 1.5, style: 'dashed' }, opacity: 0.5, zIndex: 2 },
      { id: 'iso-proj-h', type: 'shape', shapeKind: 'rect', x: 560, y: 950, width: 280, height: 4, border: { color: { $t: 'colors.accent' }, width: 1.5, style: 'dashed' }, opacity: 0.42, zIndex: 2, animation: { name: 'slideInLeft', duration: 900, delay: 1000 } },
      // ── 顶点标注＋数据引出线
      { id: 'iso-vtx', type: 'shape', shapeKind: 'circle', x: 692, y: 542, width: 16, height: 16, fill: { $t: 'colors.accent' }, zIndex: 5, animation: { name: 'heartbeat', duration: 2400, iterationCount: 'infinite' } },
      { id: 'iso-vtx-tag', type: 'text', content: 'V0 · 0,0,0', fontFamily: 'Courier New, monospace', fontSize: 15, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 1, x: 718, y: 538, width: 168, height: 24, zIndex: 5, animation: { name: 'fadeIn', duration: 600, delay: 1100 }, editable: { content: true } },
      teSeg('iso-lead', 610, 685, 486, 756, 1.5, 'colors.accent', 0.6, 5),
      { id: 'iso-lead-tag', type: 'text', content: 'COLD TIER · 1.2M IOPS', fontFamily: 'Courier New, monospace', fontSize: 15, color: { $t: 'colors.primary' }, opacity: 0.8, letterSpacing: 1, textAlign: 'right', x: 262, y: 748, width: 214, height: 24, zIndex: 5, animation: { name: 'slideInLeft', duration: 700, delay: 1200 }, editable: { content: true } },
      { id: 'node-tag', type: 'text', content: 'EDGE NODE 07 / TIER-A', fontFamily: 'Courier New, monospace', fontSize: 18, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 3, x: 96, y: 120, width: 420, height: 28, zIndex: 4, animation: { name: 'slideInLeft', duration: 700 }, editable: { content: true } },
      { id: 'title-cn', type: 'text', content: '算力立方', fontFamily: { $t: 'fonts.heading' }, fontSize: 92, fontWeight: '900', color: { $t: 'colors.primary' }, letterSpacing: 12, x: 96, y: 300, width: 560, height: 120, zIndex: 4, animation: { name: 'fadeInUp', duration: 800, delay: 300 }, editable: { content: true, fontSize: { type: 'range', min: 56, max: 110 }, position: true } },
      { id: 'title-en', type: 'text', content: 'DISTRIBUTED DATA FABRIC', fontFamily: { $t: 'fonts.heading' }, fontSize: 24, fontWeight: '700', color: { $t: 'colors.primary' }, opacity: 0.6, letterSpacing: 8, x: 96, y: 442, width: 620, height: 38, zIndex: 4, animation: { name: 'fadeIn', duration: 700, delay: 700 }, editable: { content: true } },
      { id: 'spec-line', type: 'text', content: '8 region · 40 Gbps · P99 < 3ms', fontFamily: 'Courier New, monospace', fontSize: 20, color: { $t: 'colors.accent' }, x: 96, y: 844, width: 520, height: 30, zIndex: 4, animation: { name: 'rise', duration: 700, delay: 900 }, editable: { content: true } }
    ]
  },
  {
    id: 'tech-blueprint-lab', name: '蓝图线框实验室', version: '1.0.0', category: 'tech',
    tags: ['tech', 'blueprint', 'schematic', 'wireframe', 'engineering'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><defs><pattern id="bpg" width="7.5" height="7.5" patternUnits="userSpaceOnUse"><path d="M7.5 0 L0 0 0 7.5" fill="none" stroke="%2393c5fd" stroke-width="0.25" opacity="0.22"/></pattern></defs><rect width="100" height="100" fill="%230a1f3c"/><rect x="4" y="4" width="92" height="92" fill="url(%23bpg)"/><rect x="4" y="4" width="92" height="92" fill="none" stroke="%237dd3fc" stroke-width="0.5" opacity="0.4"/><path d="M8 57 H86 M16 10 V72" stroke="%237dd3fc" stroke-width="0.5" opacity="0.4" fill="none"/><g fill="none" stroke="%237dd3fc"><rect x="24" y="25" width="52" height="29" rx="2" stroke-width="0.9" opacity="0.95"/><rect x="28" y="30" width="14" height="10" stroke-width="0.55" opacity="0.8"/><rect x="46" y="30" width="9" height="10" stroke-width="0.55" opacity="0.8"/><circle cx="66" cy="36" r="4" stroke-width="0.55" opacity="0.7"/><path d="M28 45 H72 M28 49 H52" stroke-width="0.45" stroke-dasharray="1.6 1.6" opacity="0.5"/></g><g fill="none" stroke="%237dd3fc" stroke-width="0.45"><path d="M24 20 V24.5 M76 20 V24.5" opacity="0.55"/><path d="M24 21.5 H76" stroke-width="0.6" opacity="0.9"/></g><rect x="42" y="15" width="16" height="2.2" fill="%23e0f2fe" opacity="0.55"/><g fill="none" stroke="%237dd3fc" stroke-width="0.5" opacity="0.85"><path d="M22.4 22.6 L28 29"/><path d="M77 30 H58"/></g><g fill="%230a1f3c" stroke="%237dd3fc" stroke-width="0.6"><circle cx="20" cy="20" r="2.8"/><circle cx="80" cy="30" r="2.8"/></g><g fill="%237dd3fc"><rect x="19.6" y="19" width="0.75" height="2" opacity="0.95"/><rect x="78.9" y="29.1" width="2" height="0.6" opacity="0.95"/><rect x="78.9" y="30.4" width="2" height="0.6" opacity="0.95"/></g><g fill="none" stroke="%237dd3fc"><rect x="78" y="8" width="19" height="28" stroke-width="0.4" stroke-dasharray="1.4 1.4" opacity="0.4"/><rect x="83.5" y="13" width="6" height="9.5" stroke-width="0.5" opacity="0.8"/><circle cx="86.5" cy="27" r="6" stroke-width="0.7" opacity="0.95"/></g><circle cx="86.5" cy="29" r="3.3" fill="%237dd3fc" opacity="0.3"/><g fill="none" stroke="%237dd3fc"><rect x="9" y="82" width="15" height="8" rx="0.8" stroke-width="0.6" opacity="0.9"/><path d="M24 86 H50" stroke-width="0.45" opacity="0.6"/></g><rect x="50.6" y="84.7" width="2.6" height="2.6" fill="%237dd3fc" opacity="0.85" transform="rotate(45 51.9 86)"/><g fill="none" stroke="%237dd3fc" stroke-width="0.5" opacity="0.85"><rect x="64" y="80" width="31" height="12"/><path d="M64 84.5 H95" stroke-width="0.4"/></g><g fill="%23e0f2fe" opacity="0.5"><rect x="66" y="86.4" width="20" height="1.3"/><rect x="66" y="89" width="13" height="1.1"/></g><g fill="%23e0f2fe"><rect x="15" y="63" width="56" height="5" opacity="0.85"/><rect x="15" y="71" width="34" height="1.7" opacity="0.4"/></g></svg>',
    tokens: {
      colors: {
        bg: { label: '图板', default: '#0A1F3C', options: ['#0A1F3C', '#082B4A', '#0C1B33', '#052E16'] },
        primary: { label: '标注白', default: '#E0F2FE', options: ['#E0F2FE', '#FFFFFF', '#F8FAFC', '#DCFCE7'] },
        accent: { label: '线稿青', default: '#7DD3FC', options: ['#7DD3FC', '#38BDF8', '#86EFAC', '#FDE68A'] }
      },
      fonts: { heading: { label: '标题', default: 'Helvetica, Arial, sans-serif', options: ['Helvetica, Arial, sans-serif', 'Inter, sans-serif'] } }
    },
    presets: [
      { name: '经典晒图蓝', colors: { bg: '#0A1F3C', primary: '#E0F2FE', accent: '#7DD3FC' } },
      { name: '深海制图', colors: { bg: '#082B4A', primary: '#FFFFFF', accent: '#38BDF8' } },
      { name: '夜航暖标', colors: { bg: '#0C1B33', primary: '#F8FAFC', accent: '#FDE68A' } },
      { name: '墨松绿稿', colors: { bg: '#052E16', primary: '#DCFCE7', accent: '#86EFAC' } }
    ],
    canvas: {
      virtualWidth: 1000, virtualHeight: 1000, defaultWidth: 1000, defaultHeight: 1000, backgroundColor: { $t: 'colors.bg' },
      backgroundImage: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000"><defs><pattern id="fine" width="25" height="25" patternUnits="userSpaceOnUse"><path d="M25 0 L0 0 0 25" fill="none" stroke="%2393c5fd" stroke-width="0.5" opacity="0.1"/></pattern><pattern id="bold" width="125" height="125" patternUnits="userSpaceOnUse"><path d="M125 0 L0 0 0 125" fill="none" stroke="%2393c5fd" stroke-width="1" opacity="0.16"/></pattern></defs><rect width="1000" height="1000" fill="url(%23fine)"/><rect width="1000" height="1000" fill="url(%23bold)"/><rect x="36" y="36" width="928" height="928" fill="none" stroke="%237dd3fc" stroke-width="1.5" opacity="0.4"/></svg>'
    },
    elements: [
      { id: 'device-wire', type: 'image', src: BLUEPRINT_SVG, x: 200, y: 200, width: 620, height: 430, objectFit: 'contain', zIndex: 2, animation: { name: 'fadeIn', duration: 900 }, editable: { position: true, size: { type: 'scale' } } },
      { id: 'pin-blip', type: 'shape', shapeKind: 'circle', x: 272, y: 288, width: 12, height: 12, fill: { $t: 'colors.accent' }, zIndex: 3, animation: { name: 'twinkle', duration: 2400, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'guide-h', type: 'shape', shapeKind: 'line', x: 84, y: 700, width: 832, height: 2, fill: { $t: 'colors.accent' }, opacity: 0.5, zIndex: 2, animation: { name: 'slideInLeft', duration: 1000 } },
      { id: 'guide-v', type: 'shape', shapeKind: 'rect', x: 150, y: 120, width: 2, height: 760, fill: { $t: 'colors.accent' }, opacity: 0.35, zIndex: 1, animation: { name: 'slideInRight', duration: 1000, delay: 200 } },
      { id: 'anno-1', type: 'text', content: 'MODULE A · 120×86', fontFamily: 'Courier New, monospace', fontSize: 16, color: { $t: 'colors.primary' }, opacity: 0.7, letterSpacing: 1, x: 196, y: 154, width: 280, height: 24, zIndex: 3, animation: { name: 'fadeIn', duration: 600, delay: 800 }, editable: { content: true } },
      { id: 'anno-2', type: 'text', content: 'REV 2.1 · SCALE 1:1', fontFamily: 'Courier New, monospace', fontSize: 16, color: { $t: 'colors.primary' }, opacity: 0.7, letterSpacing: 1, textAlign: 'right', x: 580, y: 646, width: 300, height: 24, zIndex: 3, animation: { name: 'fadeIn', duration: 600, delay: 1000 }, editable: { content: true } },
      { id: 'title-cn', type: 'text', content: '从 蓝 图 到 产 品', fontFamily: { $t: 'fonts.heading' }, fontSize: 62, fontWeight: '800', color: { $t: 'colors.primary' }, letterSpacing: 10, x: 150, y: 742, width: 700, height: 84, zIndex: 3, animation: { name: 'zoomIn', duration: 800, delay: 500 }, editable: { content: true, fontSize: { type: 'range', min: 40, max: 80 }, position: true } },
      { id: 'title-en', type: 'text', content: 'ENGINEERING BLUEPRINT SERIES — DRAWN IN LIGHT', fontFamily: 'Courier New, monospace', fontSize: 17, color: { $t: 'colors.accent' }, letterSpacing: 4, x: 152, y: 846, width: 620, height: 28, zIndex: 3, animation: { name: 'rise', duration: 700, delay: 1100 }, editable: { content: true } },
      // ── 右上详图区：细网格底＋虚线框里的圆底烧瓶（颈／瓶身／液面全部 token 描边）
      { id: 'detail-grid', type: 'overlay', background: TE_FINE_GRID, x: 780, y: 60, width: 200, height: 208, opacity: 0.6, zIndex: 1 },
      { id: 'detail-frame', type: 'shape', shapeKind: 'rect', x: 778, y: 58, width: 204, height: 212, border: { color: { $t: 'colors.accent' }, width: 1, style: 'dashed' }, opacity: 0.38, zIndex: 2, animation: { name: 'fadeIn', duration: 700, delay: 600 } },
      { id: 'flask-neck', type: 'shape', shapeKind: 'rect', x: 862, y: 100, width: 26, height: 58, border: { color: { $t: 'colors.primary' }, width: 1.5, style: 'solid' }, opacity: 0.7, zIndex: 3, animation: { name: 'fadeInDown', duration: 700, delay: 700 } },
      { id: 'flask-body', type: 'shape', shapeKind: 'circle', x: 835, y: 156, width: 80, height: 80, border: { color: { $t: 'colors.primary' }, width: 2, style: 'solid' }, opacity: 0.8, zIndex: 3, animation: { name: 'zoomIn', duration: 700, delay: 750 } },
      { id: 'flask-liquid', type: 'shape', shapeKind: 'circle', x: 851, y: 177, width: 48, height: 48, fill: { $t: 'colors.accent' }, opacity: 0.3, zIndex: 3, animation: { name: 'pulse', duration: 3200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'flask-tag', type: 'text', content: 'FLASK · 溶剂 250 mL', fontFamily: 'Courier New, monospace', fontSize: 13, color: { $t: 'colors.primary' }, opacity: 0.72, letterSpacing: 1, x: 786, y: 242, width: 190, height: 22, zIndex: 4, animation: { name: 'fadeIn', duration: 600, delay: 1200 }, editable: { content: true } },
      // ── 顶部尺寸线：两条引出线托住一条度量线，读数压在壳宽正中
      teSeg('ext-l', 248, 250, 248, 204, 1, 'colors.primary', 0.4, 3),
      teSeg('ext-r', 772, 250, 772, 204, 1, 'colors.primary', 0.4, 3),
      { id: 'dim-h', type: 'shape', shapeKind: 'rect', x: 248, y: 206, width: 524, height: 1.5, fill: { $t: 'colors.accent' }, opacity: 0.6, zIndex: 3, animation: { name: 'slideInLeft', duration: 900, delay: 200 } },
      { id: 'dim-label', type: 'text', content: '524.6 mm', fontFamily: 'Courier New, monospace', fontSize: 20, color: { $t: 'colors.accent' }, opacity: 0.85, textAlign: 'center', letterSpacing: 1, x: 420, y: 174, width: 180, height: 26, zIndex: 4, animation: { name: 'fadeIn', duration: 600, delay: 1000 }, editable: { content: true } },
      // ── 引出标注：编号气泡 01／02 各牵一条引线咬住模块 A、B 的角点
      teSeg('lead-a', 209, 218, 291, 296, 1.2, 'colors.accent', 0.85, 3, { animation: { name: 'fadeIn', duration: 600, delay: 700 } }),
      { id: 'bubble-a', type: 'shape', shapeKind: 'circle', x: 182, y: 190, width: 32, height: 32, fill: { $t: 'colors.bg' }, border: { color: { $t: 'colors.accent' }, width: 1.5, style: 'solid' }, zIndex: 4, animation: { name: 'zoomIn', duration: 500, delay: 650 } },
      { id: 'bubble-a-t', type: 'text', content: '01', fontFamily: 'Courier New, monospace', fontSize: 15, fontWeight: '700', color: { $t: 'colors.accent' }, textAlign: 'center', x: 182, y: 196, width: 32, height: 20, zIndex: 5 },
      teSeg('lead-b', 790, 296, 572, 296, 1.2, 'colors.accent', 0.85, 3, { animation: { name: 'slideInRight', duration: 800, delay: 750 } }),
      { id: 'bubble-b', type: 'shape', shapeKind: 'circle', x: 790, y: 280, width: 32, height: 32, fill: { $t: 'colors.bg' }, border: { color: { $t: 'colors.accent' }, width: 1.5, style: 'solid' }, zIndex: 4, animation: { name: 'zoomIn', duration: 500, delay: 800 } },
      { id: 'bubble-b-t', type: 'text', content: '02', fontFamily: 'Courier New, monospace', fontSize: 15, fontWeight: '700', color: { $t: 'colors.accent' }, textAlign: 'center', x: 790, y: 286, width: 32, height: 20, zIndex: 5 },
      // ── 左下角芯片走线：一块芯片壳拉一条总线到焊盘
      { id: 'chip-body', type: 'shape', shapeKind: 'rect', x: 96, y: 888, width: 126, height: 64, border: { color: { $t: 'colors.accent' }, width: 2, style: 'solid' }, opacity: 0.85, zIndex: 3, animation: { name: 'zoomIn', duration: 700, delay: 900 } },
      teSeg('chip-trace', 222, 920, 594, 920, 1.5, 'colors.accent', 0.5, 2, { animation: { name: 'slideInLeft', duration: 1000, delay: 1000 } }),
      { id: 'chip-via', type: 'shape', shapeKind: 'rect', x: 588, y: 914, width: 12, height: 12, rotation: 45, fill: { $t: 'colors.accent' }, opacity: 0.85, zIndex: 3, animation: { name: 'twinkle', duration: 2800, iterationCount: 'infinite', easing: 'ease-in-out' } },
      // ── 图签角块：删不掉的那一格，落款写的是这张图怎么来的
      { id: 'tb-frame', type: 'shape', shapeKind: 'rect', x: 650, y: 874, width: 300, height: 86, border: { color: { $t: 'colors.accent' }, width: 1.5, style: 'solid' }, opacity: 0.6, zIndex: 3, animation: { name: 'fadeIn', duration: 600, delay: 1100 } },
      { id: 'tb-rule', type: 'shape', shapeKind: 'rect', x: 650, y: 904, width: 300, height: 1, fill: { $t: 'colors.primary' }, opacity: 0.3, zIndex: 3 },
      { id: 'tb-text', type: 'text', content: 'DWG CV-2026-07 · SHEET 1/1\nDRAWN 由模板生成 · 禁手改', fontFamily: 'Courier New, monospace', fontSize: 13, lineHeight: 1.5, color: { $t: 'colors.primary' }, opacity: 0.72, x: 660, y: 910, width: 282, height: 46, zIndex: 4, animation: { name: 'fadeIn', duration: 600, delay: 1300 }, editable: { content: true } }
    ]
  }
]

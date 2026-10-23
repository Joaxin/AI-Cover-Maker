// src/core/templates/pixel/pixel.ts
import type { Template } from '@/types/types'

// ---------- 像素机厅的公共语汇 ----------
const PX = 'Courier New, monospace'

/** CRT 扫描线底纹（横向细条 pattern，叠在 colors.bg 上） */
function scanTile(w: number, h: number, band = 6, fill = 'rgba(255,255,255,0.045)') {
  return 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '"><defs><pattern id="pxsc" width="4" height="' + band + '" patternUnits="userSpaceOnUse"><rect width="4" height="2" fill="' + fill + '"/></pattern></defs><rect width="' + w + '" height="' + h + '" fill="url(%23pxsc)"/></svg>'
}

/** 阶梯状像素边框：四角三层错位硬边 rect（8-bit 无圆角，越往里越细越淡） */
function stairFrame(ox: number, oy: number, token: string) {
  const corners: Array<[number, number, number, number]> = [[ox, oy, 1, 1], [ox + (1000 - ox * 2), oy, -1, 1], [ox, oy + (1000 - oy * 2), 1, -1], [ox + (1000 - ox * 2), oy + (1000 - oy * 2), -1, -1]]
  const thick = [16, 9, 5]
  const reach = [140, 96, 58]
  return corners.flatMap(([cx, cy, dx, dy], ci) =>
    [0, 1, 2].flatMap((k) => {
      const t = thick[k], len = reach[k], pad = k * 21, op = [0.92, 0.55, 0.34][k]
      return [
        { id: `stair-h-${ci}-${k}`, type: 'shape' as const, shapeKind: 'rect' as const, x: dx > 0 ? cx + pad : cx - len - pad, y: dy > 0 ? cy + pad : cy - t - pad, width: len, height: t, fill: { $t: token }, opacity: op, zIndex: 3 },
        { id: `stair-v-${ci}-${k}`, type: 'shape' as const, shapeKind: 'rect' as const, x: dx > 0 ? cx + pad : cx - t - pad, y: dy > 0 ? cy + pad : cy - len - pad, width: t, height: len, fill: { $t: token }, opacity: op, zIndex: 3 }
      ]
    })
  )
}

export const pixelTemplates: Template[] = [
{
  id: 'pixel-arcade-gameover', name: '复古街机像素卡', version: '1.1.0', category: 'pixel',
  tags: ['pixel', 'arcade', 'retro', '8bit', 'gaming'],
  thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%2318181b"/><g fill="%23facc15" opacity="0.18"><rect x="10" y="10" width="2" height="2"/><rect x="26" y="10" width="2" height="2"/><rect x="42" y="10" width="2" height="2"/><rect x="58" y="10" width="2" height="2"/><rect x="74" y="10" width="2" height="2"/><rect x="10" y="34" width="2" height="2"/><rect x="42" y="38" width="2" height="2"/><rect x="74" y="34" width="2" height="2"/><rect x="26" y="72" width="2" height="2"/><rect x="58" y="78" width="2" height="2"/><rect x="10" y="88" width="2" height="2"/><rect x="86" y="60" width="2" height="2"/></g><g fill="%23facc15"><rect x="4" y="4" width="22" height="3"/><rect x="4" y="4" width="3" height="22"/><rect x="74" y="4" width="22" height="3"/><rect x="93" y="4" width="3" height="22"/><rect x="4" y="74" width="3" height="22"/><rect x="4" y="93" width="22" height="3"/><rect x="74" y="93" width="22" height="3"/><rect x="93" y="74" width="3" height="22"/></g><g fill="%234ade80" opacity="0.5"><rect x="10" y="10" width="80" height="80" fill="none" stroke="%234ade80" stroke-width="1" opacity="0.45"/></g><rect x="12" y="20" width="20" height="2" fill="%23e11d48"/><rect x="34" y="20" width="12" height="2" fill="%23facc15"/><g fill="%23e11d48"><rect x="54" y="20" width="4" height="2"/><rect x="60" y="20" width="4" height="2"/><rect x="66" y="20" width="4" height="2"/></g><g fill="%23ffffff" opacity="0.12"><rect x="72" y="20" width="4" height="2"/><rect x="78" y="20" width="4" height="2"/><rect x="84" y="20" width="4" height="2"/></g><rect x="12" y="25" width="16" height="1.6" fill="%234ade80" opacity="0.85"/><g fill="%234ade80" opacity="0.2"><rect x="32" y="25" width="16" height="1.6"/><rect x="52" y="25" width="16" height="1.6"/><rect x="72" y="25" width="16" height="1.6"/></g><text x="50" y="44" font-size="6" text-anchor="middle" fill="%234ade80" font-family="monospace" letter-spacing="1">GAME OVER</text><rect x="28" y="49" width="46" height="10" fill="%23e11d48" opacity="0.85"/><rect x="25" y="46" width="46" height="10" fill="%23facc15"/><g fill="%23facc15"><circle cx="34" cy="64" r="2.6"/><circle cx="43" cy="64" r="2.6"/></g><g fill="%23facc15" opacity="0.25"><circle cx="52" cy="64" r="2.6"/><circle cx="61" cy="64" r="2.6"/></g><text x="50" y="78" font-size="5.5" text-anchor="middle" fill="%234ade80" font-family="monospace">&gt; PRESS START</text><g font-size="5" font-family="monospace"><text x="26" y="88" fill="%23facc15">10</text><text x="36" y="88" fill="%23facc15" opacity="0.6">9</text><text x="43" y="88" fill="%23facc15" opacity="0.45">8</text><text x="50" y="88" fill="%23facc15" opacity="0.3">7</text><text x="57" y="88" fill="%23facc15" opacity="0.2">6</text></g><text x="50" y="95" font-size="4" text-anchor="middle" fill="%2394a3b8" font-family="monospace">CREDIT 02</text></svg>',
  tokens: {
    colors: {
      bg: { label: '背景', default: '#18181B', options: ['#18181B', '#1F1F23', '#09090B', '#0B001A', '#000000'] },
      primary: { label: '主色', default: '#FACC15', options: ['#FACC15', '#FDE047', '#FBBF24', '#FF2E88', '#F87171'] },
      accent: { label: '辅色', default: '#4ADE80', options: ['#4ADE80', '#22C55E', '#86EFAC', '#00F0FF', '#FDE047'] },
      danger: { label: '血条红', default: '#E11D48', options: ['#E11D48', '#EF4444', '#F87171', '#FB7171', '#F97316'] },
      hud: { label: '机台灰', default: '#94A3B8', options: ['#94A3B8', '#A1A1AA', '#CBD5E1', '#64748B', '#7DD3FC'] }
    },
    fonts: { heading: { label: '标题字体', default: 'Impact, Courier New, monospace', options: ['Impact, Courier New, monospace', 'Courier New, monospace', 'Impact, sans-serif'] } }
  },
  presets: [
    { name: '街机经典黄绿', colors: { bg: '#18181B', primary: '#FACC15', accent: '#4ADE80', danger: '#E11D48', hud: '#94A3B8' } },
    { name: '霓虹电竞粉青', colors: { bg: '#0B001A', primary: '#FF2E88', accent: '#00F0FF', danger: '#FF2E88', hud: '#A5B4FC' } },
    { name: '复古红白机', colors: { bg: '#1F1F23', primary: '#F87171', accent: '#FDE047', danger: '#EF4444', hud: '#CBD5E1' } },
    { name: '暗金通关夜', colors: { bg: '#000000', primary: '#FBBF24', accent: '#86EFAC', danger: '#F97316', hud: '#A1A1AA' } }
  ],
  canvas: { virtualWidth: 1000, virtualHeight: 1000, defaultWidth: 1000, defaultHeight: 1000, backgroundColor: { $t: 'colors.bg' }, backgroundImage: scanTile(1000, 1000, 6) },
  elements: [
    // ── 底纹：点阵 + 扫描线 + CRT 亮带 ──────────────────────────
    ...Array.from({ length: 110 }, (_, i) => ({
      id: 'dot-' + i, type: 'shape' as const, shapeKind: 'rect' as const,
      x: 76 + (i % 10) * 92, y: 76 + Math.floor(i / 10) * 82, width: 8, height: 8,
      fill: (i + Math.floor(i / 10)) % 3 === 0 ? { $t: 'colors.accent' } : { $t: 'colors.primary' },
      opacity: (i + Math.floor(i / 10)) % 3 === 0 ? 0.08 : 0.055, zIndex: 0
    })),
    { id: 'scanlines', type: 'overlay', x: 48, y: 48, width: 904, height: 904, background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.34) 0 2px, rgba(0,0,0,0) 2px 6px)', opacity: 0.5, zIndex: 1 },
    { id: 'crt-band', type: 'overlay', x: 48, y: 250, width: 904, height: 140, background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.07) 48%, rgba(255,255,255,0) 100%)', zIndex: 1, animation: { name: 'drift', duration: 7000, iterationCount: 'infinite', easing: 'ease-in-out' } },
    // ── 阶梯像素边框：内圈实线 + 外圈发丝线 + 四角错位硬边 ────────
    { id: 'pixel-frame', type: 'shape', shapeKind: 'rect', x: 60, y: 60, width: 880, height: 880, border: { color: { $t: 'colors.accent' }, width: 6, style: 'solid' }, zIndex: 2, opacity: 0.45, animation: { name: 'fadeIn', duration: 300 }},
    { id: 'frame-out', type: 'shape', shapeKind: 'rect', x: 44, y: 44, width: 912, height: 912, border: { color: { $t: 'colors.primary' }, width: 2, style: 'solid' }, opacity: 0.3, zIndex: 2 },
    ...stairFrame(44, 44, 'colors.primary'),
    // ── HUD 第一行：1UP / SCORE / 金币 / 最高分 ──────────────────
    { id: 'hud-1up', type: 'text', content: '1UP', fontFamily: PX, fontSize: 26, fontWeight: '900', color: { $t: 'colors.danger' }, x: 104, y: 92, width: 60, height: 34, zIndex: 5, animation: { name: 'blink', duration: 1400, iterationCount: 'infinite' } },
    { id: 'score-bar', type: 'text', content: 'SCORE  004820', fontFamily: PX, fontSize: 26, fontWeight: '700', color: { $t: 'colors.primary' }, letterSpacing: 3, x: 168, y: 90, width: 290, height: 38, zIndex: 5, animation: { name: 'fadeIn', duration: 260, delay: 300 }, editable: { content: true } },
    ...Array.from({ length: 4 }, (_, i) => ({
      id: 'coin-' + i, type: 'shape' as const, shapeKind: 'circle' as const,
      x: 474 + i * 30, y: 96, width: 22, height: 22,
      fill: { $t: 'colors.primary' }, border: { color: { $t: 'colors.danger' }, width: 3, style: 'solid' },
      opacity: i < 2 ? 0.95 : 0.22, zIndex: 5,
      ...(i === 0 ? { animation: { name: 'sparkle' as const, duration: 2400, iterationCount: 'infinite' as const } } : {})
    })),
    { id: 'coin-count', type: 'text', content: '×02', fontFamily: PX, fontSize: 22, fontWeight: '700', color: { $t: 'colors.primary' }, opacity: 0.75, x: 600, y: 94, width: 60, height: 30, zIndex: 5, editable: { content: true } },
    { id: 'hud-high', type: 'text', content: 'HIGH  999990', fontFamily: PX, fontSize: 26, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 2, textAlign: 'right', x: 660, y: 90, width: 240, height: 38, zIndex: 5, editable: { content: true } },
    // ── HUD 第二行：关卡铭牌 + 余命 ─────────────────────────────
    { id: 'stage-plate', type: 'shape', shapeKind: 'rect', x: 104, y: 140, width: 340, height: 34, fill: 'rgba(0,0,0,0.45)', border: { color: { $t: 'colors.accent' }, width: 2, style: 'solid' }, opacity: 0.9, zIndex: 4 },
    { id: 'stage-name', type: 'text', content: '第 07 关 · 霓虹后巷', fontFamily: PX, fontSize: 22, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 1, x: 116, y: 145, width: 320, height: 30, zIndex: 5, animation: { name: 'slideInLeft', duration: 320, delay: 420 }, editable: { content: true } },
    { id: 'life-label', type: 'text', content: 'LIFE', fontFamily: PX, fontSize: 18, fontWeight: '700', color: { $t: 'colors.hud' }, opacity: 0.7, letterSpacing: 3, textAlign: 'right', x: 660, y: 146, width: 80, height: 26, zIndex: 5 },
    { id: 'life-hearts', type: 'text', content: '♥ ♥ ♡', fontFamily: PX, fontSize: 30, fontWeight: '900', color: { $t: 'colors.danger' }, textAlign: 'right', x: 750, y: 138, width: 150, height: 38, zIndex: 5, editable: { content: true } },
    // ── HP / 能量分段条（实心段 + 空槽）──────────────────────────
    { id: 'hp-label', type: 'text', content: 'HP', fontFamily: PX, fontSize: 26, fontWeight: '900', color: { $t: 'colors.danger' }, x: 104, y: 202, width: 48, height: 32, zIndex: 5 },
    { id: 'hp-track', type: 'shape', shapeKind: 'rect', x: 160, y: 206, width: 740, height: 26, fill: 'rgba(255,255,255,0.05)', border: { color: { $t: 'colors.hud' }, width: 2, style: 'solid' }, opacity: 0.75, zIndex: 4 },
    ...Array.from({ length: 13 }, (_, i) => ({
      id: 'hp-seg-' + i, type: 'shape' as const, shapeKind: 'rect' as const,
      x: 168 + i * 56, y: 210, width: 48, height: 18,
      fill: i < 5 ? { $t: 'colors.danger' } : 'rgba(255,255,255,0.08)', zIndex: 5,
      ...(i === 4 ? { animation: { name: 'blink' as const, duration: 900, iterationCount: 'infinite' as const } } : {})
    })),
    { id: 'en-label', type: 'text', content: 'EN', fontFamily: PX, fontSize: 26, fontWeight: '900', color: { $t: 'colors.accent' }, x: 104, y: 246, width: 48, height: 30, zIndex: 5 },
    { id: 'en-track', type: 'shape', shapeKind: 'rect', x: 160, y: 250, width: 740, height: 18, fill: 'rgba(255,255,255,0.04)', border: { color: { $t: 'colors.hud' }, width: 2, style: 'solid' }, opacity: 0.55, zIndex: 4 },
    ...Array.from({ length: 13 }, (_, i) => ({
      id: 'en-seg-' + i, type: 'shape' as const, shapeKind: 'rect' as const,
      x: 168 + i * 56, y: 253, width: 48, height: 12,
      fill: i < 8 ? { $t: 'colors.accent' } : 'rgba(255,255,255,0.07)', opacity: i < 8 ? 0.9 : 1, zIndex: 5
    })),
    { id: 'bar-note', type: 'text', content: '血量见底 · 冲刺能量还剩 62% · 别急着放弃', fontFamily: PX, fontSize: 18, color: { $t: 'colors.hud' }, opacity: 0.65, letterSpacing: 1, x: 104, y: 280, width: 640, height: 26, zIndex: 5, editable: { content: true } },
    // ── 标题区：GAME OVER + 硬阴影错位主标 ───────────────────────
    { id: 'title-kicker', type: 'text', content: '★ GAME OVER ★', fontFamily: PX, fontSize: 30, fontWeight: '700', color: { $t: 'colors.accent' }, opacity: 0.85, letterSpacing: 12, textAlign: 'center', x: 100, y: 336, width: 800, height: 42, zIndex: 6, animation: { name: 'fadeInDown', duration: 400, delay: 200 }, editable: { content: true } },
    { id: 'pixel-title-shadow', type: 'text', content: '游戏结束', fontFamily: { $t: 'fonts.heading' }, fontSize: 116, fontWeight: '900', color: { $t: 'colors.danger' }, opacity: 0.85, letterSpacing: 14, textAlign: 'center', x: 112, y: 396, width: 800, height: 148, zIndex: 6 },
    { id: 'pixel-title', type: 'text', content: '游戏结束', fontFamily: { $t: 'fonts.heading' }, fontSize: 116, fontWeight: '900', color: { $t: 'colors.primary' }, letterSpacing: 14, textAlign: 'center', x: 100, y: 384, width: 800, height: 148, zIndex: 7, animation: { name: 'zoomIn', duration: 420, delay: 150 }, editable: { content: true, fontSize: { type: 'range', min: 64, max: 140 }, position: true } },
    { id: 'run-stats', type: 'text', content: '本关得分 4820 · 最大连击 17 · 用时 03′41″', fontFamily: PX, fontSize: 26, color: { $t: 'colors.hud' }, letterSpacing: 1, textAlign: 'center', x: 100, y: 554, width: 800, height: 40, zIndex: 6, animation: { name: 'fadeInUp', duration: 320, delay: 620 }, editable: { content: true } },
    // ── PRESS START：闪烁光标行 ────────────────────────────────
    { id: 'sub-pixel', type: 'text', content: '▶  PRESS START · 按开始键继续', fontFamily: PX, fontSize: 30, fontWeight: '700', color: { $t: 'colors.accent' }, textAlign: 'center', letterSpacing: 2, x: 100, y: 616, width: 800, height: 48, zIndex: 6, animation: { name: 'blink', duration: 1000, iterationCount: 'infinite' }, editable: { content: true, fontSize: { type: 'range', min: 18, max: 40 }, position: true } },
    // ── CONTINUE? 倒计时 10→1 ─────────────────────────────────
    { id: 'cont-label', type: 'text', content: 'CONTINUE?', fontFamily: { $t: 'fonts.heading' }, fontSize: 40, fontWeight: '900', color: { $t: 'colors.primary' }, letterSpacing: 3, x: 116, y: 700, width: 320, height: 48, zIndex: 6, animation: { name: 'slideInLeft', duration: 360, delay: 900 }, editable: { content: true } },
    { id: 'cont-cn', type: 'text', content: '面摊还没收，雨也还没停', fontFamily: PX, fontSize: 18, color: { $t: 'colors.hud' }, opacity: 0.7, letterSpacing: 2, x: 118, y: 752, width: 340, height: 26, zIndex: 6, editable: { content: true } },
    ...Array.from({ length: 10 }, (_, i) => ({
      id: 'count-' + i, type: 'text' as const, content: String(10 - i), fontFamily: PX, fontSize: 30, fontWeight: '700' as const,
      color: { $t: 'colors.primary' } as const, textAlign: 'center' as const, opacity: 1 - i * 0.075,
      x: 460 + i * 44, y: 702, width: 38, height: 44, zIndex: 6,
      ...(i === 0 ? { animation: { name: 'blink' as const, duration: 700, iterationCount: 'infinite' as const } } : {})
    })),
    // ── 机台铭牌 / 底部信息 ───────────────────────────────────
    { id: 'rule-pixel', type: 'shape', shapeKind: 'rect', x: 104, y: 826, width: 792, height: 4, fill: { $t: 'colors.primary' }, opacity: 0.22, zIndex: 5 },
    { id: 'bottom-coins', type: 'text', content: 'CREDIT 02 · 投币续关 · 机台编号 PX-0712', fontFamily: PX, fontSize: 22, fontWeight: '700', color: { $t: 'colors.hud' }, textAlign: 'center', x: 100, y: 848, width: 800, height: 38, zIndex: 5, animation: { name: 'fadeInUp', duration: 300, delay: 700 }, editable: { content: true } },
    { id: 'cab-plate', type: 'text', content: '星光电子 · 禁止拍打机台 · 本机保修期已过三十二年', fontFamily: PX, fontSize: 18, color: { $t: 'colors.hud' }, opacity: 0.5, letterSpacing: 1, textAlign: 'center', x: 100, y: 898, width: 800, height: 28, zIndex: 5, editable: { content: true } }
  ]
},
{
  id: 'pixel-dungeon-quest', name: '像素地牢冒险', version: '1.1.0', category: 'pixel',
  tags: ['pixel', 'rpg', 'dungeon', 'quest'],
  thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%232e1065"/><rect x="15" y="15" width="70" height="70" fill="%233b0764" stroke="%23eab308" stroke-width="2"/></svg>',
  tokens: {
    colors: {
      bg: { label: '背景', default: '#2E1065', options: ['#2E1065', '#3B0764', '#1E1B4B', '#052E16', '#450A0A'] },
      primary: { label: '主色', default: '#FFFFFF', options: ['#FFFFFF', '#F5F3FF', '#EDE9FE', '#ECFDF5', '#FEF2F2'] },
      accent: { label: '金色', default: '#EAB308', options: ['#EAB308', '#F59E0B', '#FBBF24', '#34D399', '#F97316'] }
    },
    fonts: { heading: { label: '标题字体', default: 'Courier New, monospace', options: ['Courier New, monospace', 'Impact, sans-serif', 'Helvetica, Arial, sans-serif'] } }
  },
  presets: [
    { name: '紫晶地牢', colors: { bg: '#2E1065', primary: '#FFFFFF', accent: '#EAB308' } },
    { name: '翡翠洞窟', colors: { bg: '#052E16', primary: '#ECFDF5', accent: '#34D399' } },
    { name: '熔火深渊', colors: { bg: '#450A0A', primary: '#FEF2F2', accent: '#F59E0B' } },
    { name: '星辉法阵', colors: { bg: '#1E1B4B', primary: '#EDE9FE', accent: '#FBBF24' } }
  ],
  canvas: { virtualWidth: 1000, virtualHeight: 1000, defaultWidth: 1000, defaultHeight: 1000, backgroundColor: { $t: 'colors.bg' } },
  elements: [
    { id: 'dialog-box', type: 'shape', shapeKind: 'rect', x: 100, y: 200, width: 800, height: 600, fill: '#3B0764', border: { color: { $t: 'colors.accent' }, width: 6, style: 'solid' }, borderRadius: 8, zIndex: 1, animation: { name: 'zoomIn', duration: 320 }},
    { id: 'speaker-name', type: 'text', content: '[ ELDER MAGE ]', fontFamily: { $t: 'fonts.heading' }, fontSize: 28, fontWeight: '900', color: { $t: 'colors.accent' }, x: 150, y: 250, width: 700, height: 40, zIndex: 2, animation: { name: 'fadeIn', duration: 240, delay: 320 }, editable: { content: true, fontSize: { type: 'range', min: 18, max: 36 }, position: true } },
    { id: 'quest-dialog', type: 'text', content: '"The dark woods await.\nTake this sword and venture forth."', fontFamily: { $t: 'fonts.heading' }, fontSize: 32, fontWeight: '700', color: { $t: 'colors.primary' }, lineHeight: 1.6, x: 150, y: 330, width: 700, height: 250, zIndex: 2, animation: { name: 'fadeIn', duration: 420, delay: 480 }, editable: { content: true, fontSize: { type: 'range', min: 24, max: 44 }, position: true } },
    { id: 'cursor-block', type: 'shape', shapeKind: 'rect', x: 700, y: 540, width: 26, height: 34, fill: { $t: 'colors.accent' }, zIndex: 3, animation: { name: 'blink', duration: 800, iterationCount: 'infinite' } },
    { id: 'hp-bar', type: 'text', content: 'HP: ■■■■■■■□  MP: ■■■■■□□□', fontFamily: 'Courier New, monospace', fontSize: 24, fontWeight: '700', color: '#EF4444', x: 150, y: 680, width: 700, height: 40, zIndex: 2, animation: { name: 'slideInLeft', duration: 320, delay: 760 }, editable: { content: true, position: true } }
  ]
}
]

// src/core/templates/pixel/pixel-extra.ts
// 像素风扩展模板：8-bit 精灵图 + 棋盘/扫描线底纹 + tokens/presets（可一键换配色）
import type { Template } from '@/types/types'
import { seededInt } from '../_fx/common'

const seeded = seededInt

// ---------- 底纹生成（透明 SVG，叠在 backgroundColor token 上）----------

function dither(w: number, h: number, cell = 44, s = 7, fill = 'rgba(255,255,255,0.05)') {
  return 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '"><defs><pattern id="dg" width="' + cell + '" height="' + cell + '" patternUnits="userSpaceOnUse"><rect width="' + s + '" height="' + s + '" fill="' + fill + '"/></pattern></defs><rect width="' + w + '" height="' + h + '" fill="url(%23dg)"/></svg>'
}
function checker(w: number, h: number, cell = 56, fill = 'rgba(255,255,255,0.04)') {
  return 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '"><defs><pattern id="ck" width="' + cell * 2 + '" height="' + cell * 2 + '" patternUnits="userSpaceOnUse"><rect width="' + cell + '" height="' + cell + '" fill="' + fill + '"/><rect x="' + cell + '" y="' + cell + '" width="' + cell + '" height="' + cell + '" fill="' + fill + '"/></pattern></defs><rect width="' + w + '" height="' + h + '" fill="url(%23ck)"/></svg>'
}
function scan(w: number, h: number, band = 8, fill = 'rgba(255,255,255,0.03)') {
  return 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '"><defs><pattern id="sc" width="4" height="' + band + '" patternUnits="userSpaceOnUse"><rect width="4" height="3" fill="' + fill + '"/></pattern></defs><rect width="' + w + '" height="' + h + '" fill="url(%23sc)"/></svg>'
}

// ---------- 像素精灵（字符网格 → 方块 SVG）----------
function px(rows: string[], pal: Record<string, string>, s = 10) {
  const h = rows.length, w = rows[0].length
  let r = ''
  rows.forEach((row, y) => { for (let x = 0; x < row.length; x++) { const c = pal[row[x]]; if (c) r += `<rect x="${x * s}" y="${y * s}" width="${s}" height="${s}" fill="${c}"/>` } })
  return 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="' + w * s + '" height="' + h * s + '" viewBox="0 0 ' + w * s + ' ' + h * s + '" shape-rendering="crispEdges">' + r + '</svg>'
}
const HEART = px(['..rr.rr..', '.rRrrrRr.', '.rrrrrrr.', '.rrrrrrr.', '..rrrrr..', '...rrr...', '....r....'], { r: '%23ef4444', R: '%23fca5a5' }, 10)
const COIN = px(['..gggg..', '.gyyyyg.', 'gywwwyyg', 'gywwwyyg', 'gywwwyyg', 'gywwwyyg', '.gyyyyg.', '..gggg..'], { g: '%23b45309', y: '%23facc15', w: '%23fef9c3' }, 10)
const SWORD = px(['...bb...', '...bb...', '...bb...', '...bb...', '...bb...', '.gggggg.', '...hh...', '...hh...'], { b: '%23e2e8f0', g: '%23eab308', h: '%2392400e' }, 10)
const POTION = px(['...tt...', '...tt...', '..cppc..', '.cppppc.', '.cppppc.', '.cppppc.', '..cccc..'], { t: '%23a16207', c: '%2367e8f9', p: '%23a855f7' }, 10)
const KEY = px(['..ggg...', '.g...g..', '.g...g..', '..ggg...', '...g....', '...g....', '...gg...', '...g....'], { g: '%23fbbf24' }, 10)
const GHOST = px(['..wwww..', '.wwwwww.', 'weewweew', 'weewweew', 'wwwwwwww', 'wwwwwwww', 'wwwwwwww', 'w.ww.ww.'], { w: '%23f8fafc', e: '%231e293b' }, 10)
const SLIME = px(['..gggg..', '.gggggg.', 'ggeggogg', '.gggggg.', 'gggggggg', 'gggggggg'], { g: '%234ade80', e: '%2314532d' }, 10)
const STAR = px(['...y...', '..yyy..', 'yyyyyyy', '.yyyyy.', '..yyy..', '.yy.yy.'], { y: '%23fde047' }, 10)
const SKULL = px(['.wwwwww.', 'wwwwwwww', 'wwkwwkww', 'wwkwwkww', 'wwwwwwww', '.wkwwkw.', '.wwwwww.', '..w.w.w.'], { w: '%23f5f5f4', k: '%2318181b' }, 10)
const CHEST = px(['.dddddd.', '.dddddd.', 'gggggggg', 'ddddggdd', 'ddddggdd', 'dddddddd', 'dddddddd'], { d: '%2392400e', g: '%23facc15' }, 10)
const BIRD = px(['.b.....b.', '.bb...bb.', '..bb.bb.'], { b: '%230f172a' }, 10)
const HERO = px(['..rrrr..', '.rrrrrr.', '.ffssff.', '.ssssss.', '..bbbb..', '.ybbby..', '..bb.bb.', '.tt..tt.'], { r: '%23dc2626', f: '%231e293b', s: '%23fde68a', b: '%232563eb', y: '%23facc15', t: '%2378350f' }, 10)

// ---------- 可复用 ----------
const PX = 'Courier New, monospace'
const PIXEL_COLORS = (labels: [string, string, string], def: { bg: string; primary: string; accent: string }, opts: { bg: string[]; primary: string[]; accent: string[] }) => ({
  bg: { label: labels[0], default: def.bg, options: opts.bg },
  primary: { label: labels[1], default: def.primary, options: opts.primary },
  accent: { label: labels[2], default: def.accent, options: opts.accent }
})
const PX_FONTS = { heading: { label: '标题字体', default: PX, options: [PX, 'Impact, sans-serif', 'Helvetica, Arial, sans-serif'] } }

export const pixelExtraTemplates: Template[] = [
  // 1. RPG 对话框
  {
    id: 'pixel-rpg-dialogue', name: 'RPG对话框 (16:9)', version: '1.0.0', category: 'pixel', tags: ['pixel', 'rpg', 'dialogue', 'adventure', '16:9'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="178" height="100" viewBox="0 0 178 100"><rect width="178" height="100" fill="%23101828"/><rect x="14" y="42" width="150" height="46" fill="%23000" stroke="%23f8fafc" stroke-width="2"/><rect x="18" y="46" width="142" height="38" fill="none" stroke="%23f8fafc" stroke-width="1"/><rect x="28" y="34" width="34" height="12" fill="%23fde047"/><g fill="%23ef4444"><rect x="20" y="14" width="4" height="4"/><rect x="24" y="12" width="4" height="4"/><rect x="28" y="14" width="4" height="4"/><rect x="22" y="16" width="8" height="4"/><rect x="24" y="20" width="4" height="4"/></g></svg>',
    tokens: {
      colors: PIXEL_COLORS(['夜色', '对白', '强调'], { bg: '#101828', primary: '#F8FAFC', accent: '#FDE047' }, {
        bg: ['#101828', '#052E16', '#2E1065', '#450A0A'],
        primary: ['#F8FAFC', '#ECFDF5', '#F5F3FF', '#FEF2F2'],
        accent: ['#FDE047', '#FBBF24', '#A78BFA', '#F87171']
      }),
      fonts: PX_FONTS
    },
    presets: [
      { name: '深夜蓝调', colors: { bg: '#101828', primary: '#F8FAFC', accent: '#FDE047' } },
      { name: '翡翠原野', colors: { bg: '#052E16', primary: '#ECFDF5', accent: '#FBBF24' } },
      { name: '紫晶王城', colors: { bg: '#2E1065', primary: '#F5F3FF', accent: '#A78BFA' } },
      { name: '熔岩洞窟', colors: { bg: '#450A0A', primary: '#FEF2F2', accent: '#F87171' } }
    ],
    canvas: { virtualWidth: 1920, virtualHeight: 1080, defaultWidth: 1920, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' }, backgroundImage: dither(1920, 1080, 48, 6) },
    elements: [
      { id: 'scene', type: 'text', content: '第一章 · 雪山的信号', fontFamily: { $t: 'fonts.heading' }, fontSize: 30, fontWeight: '700', color: { $t: 'colors.primary' }, opacity: 0.55, letterSpacing: 8, textAlign: 'center', x: 660, y: 70, width: 600, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'heart-1', group: 'heart-', type: 'image', src: HEART, objectFit: 'contain', x: 170, y: 76, width: 56, height: 50, zIndex: 4 },
      { id: 'heart-2', group: 'heart-', type: 'image', src: HEART, objectFit: 'contain', x: 236, y: 76, width: 56, height: 50, zIndex: 4 },
      { id: 'heart-3', group: 'heart-', type: 'image', src: HEART, objectFit: 'contain', x: 302, y: 76, width: 56, height: 50, zIndex: 4, opacity: 0.3 },
      { id: 'bars', type: 'text', content: 'HP ■■■■■■■■□□  MP ■■■■■□□□□□', fontFamily: PX, fontSize: 26, fontWeight: '700', color: { $t: 'colors.primary' }, x: 400, y: 82, width: 640, height: 38, zIndex: 4 },
      { id: 'coin', type: 'image', src: COIN, objectFit: 'contain', x: 1580, y: 74, width: 46, height: 46, zIndex: 4, animation: { name: 'sparkle' as const, duration: 2600, iterationCount: 'infinite' } },
      { id: 'gold', type: 'text', content: 'GOLD × 128', fontFamily: PX, fontSize: 28, fontWeight: '700', color: { $t: 'colors.accent' }, textAlign: 'right', x: 1280, y: 80, width: 280, height: 38, zIndex: 4, editable: { content: true } },
      { id: 'hero', type: 'image', src: HERO, objectFit: 'contain', x: 300, y: 280, width: 160, height: 160, zIndex: 3, animation: { name: 'float' as const, duration: 5200, iterationCount: 'infinite' } },
      { id: 'chest', type: 'image', src: CHEST, objectFit: 'contain', x: 1480, y: 330, width: 130, height: 120, zIndex: 3 },
      { id: 'slime', type: 'image', src: SLIME, objectFit: 'contain', x: 1030, y: 360, width: 120, height: 100, zIndex: 3, animation: { name: 'bounce' as const, duration: 2200, delay: 300, iterationCount: 'infinite' } },
      { id: 'dlg-outer', type: 'shape', shapeKind: 'rect', x: 160, y: 520, width: 1600, height: 430, fill: 'rgba(0,0,0,0.62)', border: { color: { $t: 'colors.primary' }, width: 6 }, zIndex: 2 },
      { id: 'dlg-inner', type: 'shape', shapeKind: 'rect', x: 182, y: 542, width: 1556, height: 386, border: { color: { $t: 'colors.primary' }, width: 3 }, opacity: 0.55, zIndex: 3 },
      { id: 'name-bg', type: 'shape', shapeKind: 'rect', x: 240, y: 476, width: 320, height: 66, fill: { $t: 'colors.accent' }, zIndex: 4 },
      { id: 'name-t', type: 'text', content: '村长 · ELDER', fontFamily: { $t: 'fonts.heading' }, fontSize: 34, fontWeight: '900', color: { $t: 'colors.bg' }, textAlign: 'center', x: 240, y: 488, width: 320, height: 44, zIndex: 5, editable: { content: true } },
      { id: 'dlg-text', type: 'text', content: '「北方雪山的信号……又出现了。\n带上这把剑，替我们去看一眼吧。」', fontFamily: { $t: 'fonts.heading' }, fontSize: 44, fontWeight: '700', color: { $t: 'colors.primary' }, lineHeight: 1.8, x: 250, y: 590, width: 1420, height: 220, zIndex: 4, animation: { name: 'fadeIn' as const, duration: 1200 }, editable: { content: true, fontSize: { type: 'range', min: 32, max: 56 }, position: true } },
      { id: 'arrow', type: 'text', content: '▼', fontFamily: PX, fontSize: 40, fontWeight: '900', color: { $t: 'colors.accent' }, x: 1680, y: 880, width: 50, height: 48, zIndex: 5, animation: { name: 'blink' as const, duration: 900, iterationCount: 'infinite' } },
      { id: 'footer', type: 'text', content: 'CARTRIDGE 256KB · SAVE: ON · © PIXEL SOFT', fontFamily: PX, fontSize: 22, color: { $t: 'colors.primary' }, opacity: 0.4, textAlign: 'center', x: 660, y: 1010, width: 600, height: 32, zIndex: 4 }
    ]
  },

  // 2. 物品栏背包
  {
    id: 'pixel-inventory', name: '物品栏背包 (1:1)', version: '1.0.0', category: 'pixel', tags: ['pixel', 'inventory', 'rpg', 'items', '1:1'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%231c1917"/><g fill="none" stroke="%23a8a29e" stroke-width="1"><rect x="14" y="14" width="22" height="22"/><rect x="40" y="14" width="22" height="22"/><rect x="66" y="14" width="22" height="22"/><rect x="14" y="40" width="22" height="22"/><rect x="40" y="40" width="22" height="22"/><rect x="66" y="40" width="22" height="22"/></g><rect x="40" y="14" width="22" height="22" fill="none" stroke="%23facc15" stroke-width="2"/><g fill="%23e2e8f0"><rect x="49" y="17" width="4" height="12"/><rect x="45" y="28" width="12" height="3"/><rect x="49" y="31" width="4" height="3"/></g></svg>',
    tokens: {
      colors: PIXEL_COLORS(['仓库', '边框', '选中'], { bg: '#1C1917', primary: '#E7E5E4', accent: '#FACC15' }, {
        bg: ['#1C1917', '#431407', '#1E1B4B', '#052E16'],
        primary: ['#E7E5E4', '#FFEDD5', '#E0E7FF', '#D1FAE5'],
        accent: ['#FACC15', '#FB923C', '#A78BFA', '#34D399']
      }),
      fonts: PX_FONTS
    },
    presets: [
      { name: '仓库夜', colors: { bg: '#1C1917', primary: '#E7E5E4', accent: '#FACC15' } },
      { name: '猎人橙', colors: { bg: '#431407', primary: '#FFEDD5', accent: '#FB923C' } },
      { name: '法师紫', colors: { bg: '#1E1B4B', primary: '#E0E7FF', accent: '#A78BFA' } },
      { name: '盗贼绿', colors: { bg: '#052E16', primary: '#D1FAE5', accent: '#34D399' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1080, defaultWidth: 1080, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' }, backgroundImage: checker(1080, 1080, 54, 'rgba(255,255,255,0.045)') },
    elements: [
      { id: 'title', type: 'text', content: '背包 · INVENTORY', fontFamily: { $t: 'fonts.heading' }, fontSize: 56, fontWeight: '900', color: { $t: 'colors.primary' }, letterSpacing: 6, x: 110, y: 62, width: 700, height: 70, zIndex: 4, editable: { content: true, fontSize: { type: 'range', min: 40, max: 72 }, position: true } },
      { id: 'panel', type: 'shape', shapeKind: 'rect', x: 110, y: 168, width: 566, height: 566, fill: 'rgba(0,0,0,0.35)', border: { color: { $t: 'colors.primary' }, width: 3 }, opacity: 0.9, zIndex: 2 },
      ...Array.from({ length: 25 }, (_, i) => ({
        id: 'slot-' + i, type: 'shape' as const, shapeKind: 'rect' as const,
        x: 134 + (i % 5) * 112, y: 192 + Math.floor(i / 5) * 112, width: 90, height: 90,
        fill: 'rgba(255,255,255,0.06)', border: { color: 'rgba(255,255,255,0.16)', width: 2 }, zIndex: 3
      })),
      { id: 'it-coin', type: 'image', src: COIN, objectFit: 'contain', x: 148, y: 206, width: 62, height: 62, zIndex: 4 },
      { id: 'it-potion', type: 'image', src: POTION, objectFit: 'contain', x: 372, y: 206, width: 62, height: 62, zIndex: 4 },
      { id: 'it-sword', type: 'image', src: SWORD, objectFit: 'contain', x: 260, y: 206, width: 62, height: 62, zIndex: 4 },
      { id: 'it-key', type: 'image', src: KEY, objectFit: 'contain', x: 260, y: 542, width: 62, height: 62, zIndex: 4 },
      { id: 'it-ghost', type: 'image', src: GHOST, objectFit: 'contain', x: 596, y: 318, width: 62, height: 62, zIndex: 4, animation: { name: 'float' as const, duration: 6000, iterationCount: 'infinite' } },
      { id: 'sel', type: 'shape', shapeKind: 'rect', x: 252, y: 198, width: 74, height: 74, fill: 'rgba(250,204,21,0.12)', border: { color: { $t: 'colors.accent' }, width: 5 }, zIndex: 5, animation: { name: 'pulse' as const, duration: 1600, iterationCount: 'infinite' } },
      { id: 'qty-coin', type: 'text', content: '×12', fontFamily: PX, fontSize: 20, fontWeight: '700', color: { $t: 'colors.primary' }, x: 190, y: 250, width: 50, height: 28, zIndex: 5 },
      { id: 'desc', type: 'shape', shapeKind: 'rect', x: 110, y: 780, width: 566, height: 210, fill: 'rgba(0,0,0,0.4)', border: { color: { $t: 'colors.primary' }, width: 2 }, zIndex: 2 },
      { id: 'desc-t', type: 'text', content: '铁剑 IRON SWORD', fontFamily: { $t: 'fonts.heading' }, fontSize: 34, fontWeight: '900', color: { $t: 'colors.accent' }, x: 142, y: 802, width: 400, height: 44, zIndex: 4, editable: { content: true } },
      { id: 'desc-d', type: 'text', content: 'ATK +12 · 耐久 48/60\n「剑刃上刻着褪色的家纹。」', fontFamily: PX, fontSize: 26, color: { $t: 'colors.primary' }, lineHeight: 1.7, opacity: 0.85, x: 142, y: 858, width: 500, height: 110, zIndex: 4, editable: { content: true } },
      { id: 'equip-bg', type: 'shape', shapeKind: 'rect', x: 552, y: 802, width: 100, height: 40, fill: { $t: 'colors.accent' }, zIndex: 4 },
      { id: 'equip-t', type: 'text', content: '装备中', fontFamily: PX, fontSize: 22, fontWeight: '900', color: { $t: 'colors.bg' }, textAlign: 'center', x: 552, y: 808, width: 100, height: 30, zIndex: 5 },
      { id: 'prev-frame', type: 'shape', shapeKind: 'rect', x: 740, y: 168, width: 240, height: 240, fill: 'rgba(0,0,0,0.35)', border: { color: { $t: 'colors.primary' }, width: 2 }, zIndex: 2 },
      { id: 'prev-item', type: 'image', src: SWORD, objectFit: 'contain', x: 798, y: 198, width: 124, height: 124, zIndex: 4, animation: { name: 'float' as const, duration: 5600, iterationCount: 'infinite' } },
      { id: 'prev-lb', type: 'text', content: '预 览', fontFamily: PX, fontSize: 22, color: { $t: 'colors.primary' }, opacity: 0.5, letterSpacing: 8, textAlign: 'center', x: 740, y: 344, width: 240, height: 30, zIndex: 4 },
      { id: 'gold-chip', type: 'shape', shapeKind: 'rect', x: 740, y: 460, width: 240, height: 84, fill: 'rgba(0,0,0,0.35)', border: { color: { $t: 'colors.accent' }, width: 2 }, zIndex: 2 },
      { id: 'gold-ico', type: 'image', src: COIN, objectFit: 'contain', x: 760, y: 478, width: 48, height: 48, zIndex: 4 },
      { id: 'gold-txt', type: 'text', content: '1,288 G', fontFamily: { $t: 'fonts.heading' }, fontSize: 34, fontWeight: '900', color: { $t: 'colors.accent' }, x: 822, y: 480, width: 150, height: 44, zIndex: 4, editable: { content: true } },
      { id: 'wgt', type: 'text', content: '负重 26 / 40', fontFamily: PX, fontSize: 24, color: { $t: 'colors.primary' }, opacity: 0.6, x: 740, y: 576, width: 240, height: 34, zIndex: 4, editable: { content: true } },
      { id: 'wgt-track', type: 'shape', shapeKind: 'rect', x: 740, y: 616, width: 240, height: 16, fill: 'rgba(255,255,255,0.1)', zIndex: 3 },
      { id: 'wgt-fill', type: 'shape', shapeKind: 'rect', x: 740, y: 616, width: 156, height: 16, fill: { $t: 'colors.accent' }, zIndex: 3, animation: { name: 'slideInLeft' as const, duration: 900 } },
      { id: 'keys', type: 'text', content: 'R 排序 · SELECT 丢弃 · START 关闭', fontFamily: PX, fontSize: 22, color: { $t: 'colors.primary' }, opacity: 0.45, lineHeight: 1.35, x: 740, y: 1000, width: 260, height: 64, zIndex: 4 }
    ]
  },

  // 3. 街机高分榜
  {
    id: 'pixel-highscore', name: '街机高分榜 (9:16)', version: '1.0.0', category: 'pixel', tags: ['pixel', 'arcade', 'highscore', 'leaderboard', '9:16'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="178" viewBox="0 0 100 178"><rect width="100" height="178" fill="%23000"/><text x="50" y="28" font-size="12" text-anchor="middle" fill="%23fff" font-family="monospace">HIGH</text><g font-size="7" font-family="monospace" fill="%23facc15"><text x="20" y="50">999990 AAA</text><text x="20" y="64" fill="%239ca3af">820040 BOB</text><text x="20" y="78" fill="%239ca3af">711020 CES</text></g><rect x="20" y="120" width="8" height="8" fill="%23ef4444"/><rect x="32" y="120" width="8" height="8" fill="%2322c55e"/></svg>',
    tokens: {
      colors: PIXEL_COLORS(['机房', '字样', '榜首'], { bg: '#000000', primary: '#FFFFFF', accent: '#EF4444' }, {
        bg: ['#000000', '#020617', '#160A02', '#0B001A'],
        primary: ['#FFFFFF', '#E0F2FE', '#FDE68A', '#F0ABFC'],
        accent: ['#EF4444', '#22D3EE', '#F59E0B', '#00F0FF']
      }),
      fonts: PX_FONTS
    },
    presets: [
      { name: '街机黑白红', colors: { bg: '#000000', primary: '#FFFFFF', accent: '#EF4444' } },
      { name: '青蓝CRT', colors: { bg: '#020617', primary: '#E0F2FE', accent: '#22D3EE' } },
      { name: '琥珀终端', colors: { bg: '#160A02', primary: '#FDE68A', accent: '#F59E0B' } },
      { name: '霓虹夜场', colors: { bg: '#0B001A', primary: '#F0ABFC', accent: '#00F0FF' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1920, defaultWidth: 1080, defaultHeight: 1920, backgroundColor: { $t: 'colors.bg' }, backgroundImage: scan(1080, 1920, 8) },
    elements: [
      { id: 'title', type: 'text', content: '★ TOP SCORES ★', fontFamily: { $t: 'fonts.heading' }, fontSize: 68, fontWeight: '900', color: { $t: 'colors.primary' }, letterSpacing: 8, textAlign: 'center', x: 90, y: 150, width: 900, height: 84, zIndex: 4, animation: { name: 'bounce' as const, duration: 2000, iterationCount: 'infinite' }, editable: { content: true, fontSize: { type: 'range', min: 48, max: 84 }, position: true } },
      { id: 'sub', type: 'text', content: '—— 全 服 排 行 榜 ——', fontFamily: PX, fontSize: 28, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 6, textAlign: 'center', x: 190, y: 252, width: 700, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'th', type: 'text', content: 'RANK    SCORE    NAME', fontFamily: PX, fontSize: 28, fontWeight: '700', color: { $t: 'colors.primary' }, opacity: 0.5, letterSpacing: 2, textAlign: 'center', x: 140, y: 344, width: 800, height: 38, zIndex: 4 },
      { id: 'line-th', type: 'shape', shapeKind: 'line', x: 140, y: 396, width: 800, height: 3, fill: { $t: 'colors.primary' }, opacity: 0.35, zIndex: 3 },
      { id: 'row-1', type: 'text', content: '01    999990    AAA', fontFamily: PX, fontSize: 32, fontWeight: '900', color: { $t: 'colors.accent' }, textAlign: 'center', x: 140, y: 428, width: 800, height: 44, zIndex: 4, animation: { name: 'blink' as const, duration: 1400, iterationCount: 'infinite' }, editable: { content: true } },
      { id: 'row-2', type: 'text', content: '02    820040    ZEL', fontFamily: PX, fontSize: 32, color: { $t: 'colors.primary' }, textAlign: 'center', x: 140, y: 496, width: 800, height: 44, zIndex: 4, editable: { content: true } },
      { id: 'row-3', type: 'text', content: '03    711020    MID', fontFamily: PX, fontSize: 32, color: { $t: 'colors.primary' }, textAlign: 'center', x: 140, y: 564, width: 800, height: 44, zIndex: 4, editable: { content: true } },
      { id: 'row-4', type: 'text', content: '04    654321    TOR', fontFamily: PX, fontSize: 32, color: { $t: 'colors.primary' }, opacity: 0.85, textAlign: 'center', x: 140, y: 632, width: 800, height: 44, zIndex: 4, editable: { content: true } },
      { id: 'row-5', type: 'text', content: '05    588200    NEB', fontFamily: PX, fontSize: 32, color: { $t: 'colors.primary' }, opacity: 0.8, textAlign: 'center', x: 140, y: 700, width: 800, height: 44, zIndex: 4, editable: { content: true } },
      { id: 'row-6', type: 'text', content: '06    490440    FOX', fontFamily: PX, fontSize: 32, color: { $t: 'colors.primary' }, opacity: 0.7, textAlign: 'center', x: 140, y: 768, width: 800, height: 44, zIndex: 4, editable: { content: true } },
      { id: 'row-7', type: 'text', content: '07    402110    LYN', fontFamily: PX, fontSize: 32, color: { $t: 'colors.primary' }, opacity: 0.6, textAlign: 'center', x: 140, y: 836, width: 800, height: 44, zIndex: 4, editable: { content: true } },
      { id: 'row-8', type: 'text', content: '08    331780    DOG', fontFamily: PX, fontSize: 32, color: { $t: 'colors.primary' }, opacity: 0.5, textAlign: 'center', x: 140, y: 904, width: 800, height: 44, zIndex: 4, editable: { content: true } },
      { id: 'banner', type: 'text', content: '2026 秋季机厅锦标赛 · 10.31 截止', fontFamily: { $t: 'fonts.heading' }, fontSize: 34, fontWeight: '700', color: { $t: 'colors.primary' }, letterSpacing: 3, textAlign: 'center', x: 90, y: 1050, width: 900, height: 46, zIndex: 4, editable: { content: true } },
      { id: 'new-record', type: 'text', content: 'NEW RECORD!', fontFamily: { $t: 'fonts.heading' }, fontSize: 58, fontWeight: '900', color: { $t: 'colors.accent' }, letterSpacing: 6, textAlign: 'center', x: 190, y: 1160, width: 700, height: 74, zIndex: 4, animation: { name: 'zoomIn' as const, duration: 700, delay: 300 }, editable: { content: true } },
      { id: 'ghost-a', type: 'image', src: GHOST, objectFit: 'contain', x: 250, y: 1330, width: 90, height: 90, zIndex: 4, animation: { name: 'drift' as const, duration: 7000, iterationCount: 'infinite' } },
      { id: 'ghost-b', type: 'image', src: GHOST, objectFit: 'contain', x: 510, y: 1360, width: 70, height: 70, zIndex: 4, animation: { name: 'drift' as const, duration: 8500, delay: 800, iterationCount: 'infinite' } },
      { id: 'ghost-c', type: 'image', src: GHOST, objectFit: 'contain', x: 760, y: 1320, width: 80, height: 80, zIndex: 4, animation: { name: 'drift' as const, duration: 7600, delay: 1500, iterationCount: 'infinite' } },
      { id: 'insert', type: 'text', content: 'INSERT COIN', fontFamily: { $t: 'fonts.heading' }, fontSize: 40, fontWeight: '900', color: { $t: 'colors.accent' }, letterSpacing: 10, textAlign: 'center', x: 190, y: 1540, width: 700, height: 52, zIndex: 4, animation: { name: 'blink' as const, duration: 1100, iterationCount: 'infinite' }, editable: { content: true } },
      { id: 'coin-row', type: 'image', src: COIN, objectFit: 'contain', x: 492, y: 1640, width: 56, height: 56, zIndex: 4, animation: { name: 'sparkle' as const, duration: 2400, iterationCount: 'infinite' } },
      { id: 'footer', type: 'text', content: 'CREDIT 01 · 2P ARENA · 禁止拍打机台', fontFamily: PX, fontSize: 22, color: { $t: 'colors.primary' }, opacity: 0.4, textAlign: 'center', x: 190, y: 1780, width: 700, height: 32, zIndex: 4, editable: { content: true } }
    ]
  },

  // 4. 像素落日风景
  {
    id: 'pixel-sunset', name: '像素落日风景 (4:5)', version: '1.0.0', category: 'pixel', tags: ['pixel', 'sunset', 'landscape', 'lofi', '4:5'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="142" height="178" viewBox="0 0 142 178"><rect width="142" height="178" fill="%231e1b4b"/><rect y="60" width="142" height="30" fill="%23fb7185" opacity="0.25"/><rect y="90" width="142" height="30" fill="%23fb7185" opacity="0.45"/><rect y="120" width="142" height="26" fill="%23fb7185" opacity="0.7"/><rect x="50" y="78" width="42" height="42" fill="%23fde047"/><rect y="146" width="142" height="32" fill="%230f172a"/><g fill="%23f8fafc"><rect x="18" y="24" width="4" height="4"/><rect x="112" y="38" width="4" height="4"/><rect x="86" y="16" width="3" height="3"/></g></svg>',
    tokens: {
      colors: {
        ...PIXEL_COLORS(['夜幕', '霞光', '落日'], { bg: '#1E1B4B', primary: '#FB7185', accent: '#FDE047' }, {
          bg: ['#1E1B4B', '#0C1B33', '#2E1065', '#14532D'],
          primary: ['#FB7185', '#F97316', '#E879F9', '#FBBF24', '#A7F3D0'],
          accent: ['#FDE047', '#FB923C', '#FDE68A', '#A7F3D0']
        }),
        silhouette: { label: '地平剪影', default: '#150F35', options: ['#150F35', '#060D1A', '#1B0940', '#062A16'] }
      },
      fonts: PX_FONTS
    },
    presets: [
      { name: '玫瑰暮色', colors: { bg: '#1E1B4B', primary: '#FB7185', accent: '#FDE047', silhouette: '#150F35' } },
      { name: '橘烧天际', colors: { bg: '#0C1B33', primary: '#F97316', accent: '#FB923C', silhouette: '#060D1A' } },
      { name: '紫霞仙境', colors: { bg: '#2E1065', primary: '#E879F9', accent: '#FDE68A', silhouette: '#1B0940' } },
      { name: '绿野晨雾', colors: { bg: '#14532D', primary: '#A7F3D0', accent: '#FDE047', silhouette: '#062A16' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' }, backgroundImage: dither(1080, 1350, 60, 5, 'rgba(255,255,255,0.06)') },
    elements: [
      { id: 'band-1', group: 'band-', type: 'shape', shapeKind: 'rect', x: 0, y: 560, width: 1080, height: 130, fill: { $t: 'colors.primary' }, opacity: 0.18, zIndex: 1 },
      { id: 'band-2', group: 'band-', type: 'shape', shapeKind: 'rect', x: 0, y: 690, width: 1080, height: 130, fill: { $t: 'colors.primary' }, opacity: 0.34, zIndex: 1 },
      { id: 'band-3', group: 'band-', type: 'shape', shapeKind: 'rect', x: 0, y: 820, width: 1080, height: 130, fill: { $t: 'colors.primary' }, opacity: 0.55, zIndex: 1 },
      { id: 'band-4', group: 'band-', type: 'shape', shapeKind: 'rect', x: 0, y: 950, width: 1080, height: 110, fill: { $t: 'colors.primary' }, opacity: 0.78, zIndex: 1 },
      { id: 'sun', type: 'shape', shapeKind: 'rect', x: 420, y: 620, width: 240, height: 240, fill: { $t: 'colors.accent' }, zIndex: 2, animation: { name: 'glow' as const, duration: 4600, iterationCount: 'infinite' } },
      { id: 'sun-cut-1', type: 'shape', shapeKind: 'rect', x: 420, y: 700, width: 240, height: 18, fill: { $t: 'colors.bg' }, opacity: 0.55, zIndex: 3 },
      { id: 'sun-cut-2', type: 'shape', shapeKind: 'rect', x: 420, y: 760, width: 240, height: 28, fill: { $t: 'colors.bg' }, opacity: 0.65, zIndex: 3 },
      { id: 'star-1', group: 'star-', type: 'shape', shapeKind: 'rect', x: 140, y: 120, width: 8, height: 8, fill: '#FFFFFF', opacity: 0.8, zIndex: 2, animation: { name: 'twinkle' as const, duration: 2600, iterationCount: 'infinite' } },
      { id: 'star-2', group: 'star-', type: 'shape', shapeKind: 'rect', x: 880, y: 90, width: 7, height: 7, fill: '#FFFFFF', opacity: 0.7, zIndex: 2, animation: { name: 'twinkle' as const, duration: 3400, delay: 600, iterationCount: 'infinite' } },
      { id: 'star-3', group: 'star-', type: 'shape', shapeKind: 'rect', x: 640, y: 190, width: 6, height: 6, fill: '#FFFFFF', opacity: 0.6, zIndex: 2, animation: { name: 'twinkle' as const, duration: 2200, delay: 1200, iterationCount: 'infinite' } },
      { id: 'star-4', group: 'star-', type: 'shape', shapeKind: 'rect', x: 300, y: 260, width: 6, height: 6, fill: '#FFFFFF', opacity: 0.55, zIndex: 2, animation: { name: 'twinkle' as const, duration: 3000, delay: 400, iterationCount: 'infinite' } },
      { id: 'star-5', group: 'star-', type: 'image', src: STAR, objectFit: 'contain', x: 920, y: 240, width: 54, height: 46, zIndex: 2, animation: { name: 'twinkle' as const, duration: 4200, delay: 900, iterationCount: 'infinite' } },
      { id: 'bird-1', type: 'image', src: BIRD, objectFit: 'contain', x: 200, y: 470, width: 90, height: 32, zIndex: 3, animation: { name: 'drift' as const, duration: 9000, iterationCount: 'infinite' }, editable: { position: true, size: { type: 'scale' } } },
      { id: 'bird-2', type: 'image', src: BIRD, objectFit: 'contain', x: 330, y: 520, width: 66, height: 24, zIndex: 3, animation: { name: 'drift' as const, duration: 11000, delay: 1200, iterationCount: 'infinite' }, editable: { position: true, size: { type: 'scale' } } },
      { id: 'hill', type: 'shape', shapeKind: 'rect', x: -140, y: 1010, width: 720, height: 160, fill: { $t: 'colors.silhouette' }, zIndex: 4 },
      { id: 'tower', type: 'shape', shapeKind: 'rect', x: 150, y: 850, width: 60, height: 200, fill: { $t: 'colors.silhouette' }, zIndex: 4 },
      { id: 'tower-top', type: 'shape', shapeKind: 'rect', x: 162, y: 820, width: 36, height: 30, fill: { $t: 'colors.silhouette' }, zIndex: 4 },
      { id: 'ground', type: 'shape', shapeKind: 'rect', x: 0, y: 1060, width: 1080, height: 150, fill: { $t: 'colors.silhouette' }, zIndex: 4 },
      { id: 'tree', type: 'image', src: POTION, objectFit: 'contain', x: 810, y: 960, width: 100, height: 100, zIndex: 5, opacity: 0.9, editable: { position: true, size: { type: 'scale' } } },
      { id: 'water-line-1', type: 'shape', shapeKind: 'rect', x: 640, y: 1130, width: 180, height: 8, fill: { $t: 'colors.accent' }, opacity: 0.5, zIndex: 5 },
      { id: 'water-line-2', type: 'shape', shapeKind: 'rect', x: 700, y: 1160, width: 120, height: 8, fill: { $t: 'colors.accent' }, opacity: 0.35, zIndex: 5 },
      { id: 'title', type: 'text', content: '落日收集记', fontFamily: { $t: 'fonts.heading' }, fontSize: 84, fontWeight: '900', color: { $t: 'colors.primary' }, letterSpacing: 14, textAlign: 'center', x: 140, y: 250, width: 800, height: 100, zIndex: 6, animation: { name: 'fadeInDown' as const, duration: 1000 }, editable: { content: true, fontSize: { type: 'range', min: 56, max: 110 }, position: true } },
      { id: 'sub', type: 'text', content: 'SUNSET COLLECTOR · 把每一天的高光存档', fontFamily: PX, fontSize: 26, color: '#FFFFFF', opacity: 0.65, letterSpacing: 3, textAlign: 'center', x: 140, y: 366, width: 800, height: 36, zIndex: 6, editable: { content: true } },
      { id: 'footer', type: 'text', content: 'DAY 128 · 曝光 1/60 · 白平衡：怀旧', fontFamily: PX, fontSize: 22, color: '#FFFFFF', opacity: 0.4, letterSpacing: 2, textAlign: 'center', x: 190, y: 1260, width: 700, height: 32, zIndex: 6, editable: { content: true } }
    ]
  },

  // 5. GameBoy 掌机
  {
    id: 'pixel-gameboy', name: 'GameBoy掌机 (1:1)', version: '1.0.0', category: 'pixel', tags: ['pixel', 'gameboy', 'handheld', 'retro', '1:1'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23e7e5e4"/><rect x="18" y="12" width="64" height="46" rx="0" fill="%230f172a"/><rect x="24" y="17" width="52" height="36" fill="%2386ac92"/><rect x="34" y="70" width="8" height="24" fill="%230f172a"/><rect x="26" y="78" width="24" height="8" fill="%230f172a"/><circle cx="70" cy="82" r="7" fill="%237c3aed"/><circle cx="84" cy="74" r="7" fill="%237c3aed"/></svg>',
    tokens: {
      colors: PIXEL_COLORS(['机身', '描线', '屏幕'], { bg: '#E7E5E4', primary: '#0F172A', accent: '#86AC92' }, {
        bg: ['#E7E5E4', '#1C1917', '#F97316', '#BAE6FD'],
        primary: ['#0F172A', '#F5F5F4', '#7C2D12', '#0C4A6E'],
        accent: ['#86AC92', '#22C55E', '#FBBF24', '#67E8F9']
      }),
      fonts: PX_FONTS
    },
    presets: [
      { name: '原版灰', colors: { bg: '#E7E5E4', primary: '#0F172A', accent: '#86AC92' } },
      { name: '口袋黑', colors: { bg: '#1C1917', primary: '#F5F5F4', accent: '#22C55E' } },
      { name: '原子橙', colors: { bg: '#F97316', primary: '#7C2D12', accent: '#FBBF24' } },
      { name: '冰莓蓝', colors: { bg: '#BAE6FD', primary: '#0C4A6E', accent: '#67E8F9' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1080, defaultWidth: 1080, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' }, backgroundImage: dither(1080, 1080, 52, 6, 'rgba(0,0,0,0.06)') },
    elements: [
      { id: 'body', type: 'shape', shapeKind: 'rect', x: 190, y: 70, width: 700, height: 940, fill: 'rgba(0,0,0,0.08)', border: { color: { $t: 'colors.primary' }, width: 5 }, zIndex: 1, animation: { name: 'zoomIn' as const, duration: 340 }},
      { id: 'bezel', type: 'shape', shapeKind: 'rect', x: 260, y: 140, width: 560, height: 400, fill: { $t: 'colors.primary' }, zIndex: 2 },
      { id: 'screen', type: 'shape', shapeKind: 'rect', x: 320, y: 180, width: 440, height: 320, fill: { $t: 'colors.accent' }, zIndex: 3, animation: { name: 'fadeIn' as const, duration: 260, delay: 280 }},
      { id: 'scr-hill', type: 'shape', shapeKind: 'rect', x: 320, y: 420, width: 440, height: 80, fill: 'rgba(0,0,0,0.28)', zIndex: 4 },
      { id: 'scr-sun', type: 'shape', shapeKind: 'rect', x: 640, y: 220, width: 56, height: 56, fill: 'rgba(0,0,0,0.3)', zIndex: 4 },
      { id: 'scr-hero', type: 'image', src: HERO, objectFit: 'contain', x: 380, y: 350, width: 72, height: 72, zIndex: 5, animation: { name: 'bounce' as const, duration: 1800, delay: 200, iterationCount: 'infinite' }, editable: { position: true, size: { type: 'scale' } } },
      { id: 'scr-slime', type: 'image', src: SLIME, objectFit: 'contain', x: 600, y: 380, width: 60, height: 50, zIndex: 5, animation: { name: 'bounce' as const, duration: 2200, iterationCount: 'infinite' }, editable: { position: true, size: { type: 'scale' } } },
      { id: 'scr-text', type: 'text', content: 'WORLD 1-1 · GO!', fontFamily: PX, fontSize: 26, fontWeight: '900', color: 'rgba(0,0,0,0.6)', letterSpacing: 2, x: 350, y: 200, width: 300, height: 34, zIndex: 5, animation: { name: 'fadeIn' as const, duration: 220, delay: 500 }, editable: { content: true } },
      { id: 'brand', type: 'text', content: 'PIXELBOY · 8-BIT', fontFamily: { $t: 'fonts.heading' }, fontSize: 30, fontWeight: '900', color: { $t: 'colors.primary' }, letterSpacing: 6, x: 300, y: 560, width: 400, height: 40, zIndex: 4, animation: { name: 'fadeIn' as const, duration: 260, delay: 560 }, editable: { content: true } },
      { id: 'stripe-1', type: 'shape', shapeKind: 'rect', x: 760, y: 568, width: 90, height: 8, fill: { $t: 'colors.primary' }, opacity: 0.8, zIndex: 4, rotation: -14 },
      { id: 'stripe-2', type: 'shape', shapeKind: 'rect', x: 764, y: 590, width: 90, height: 8, fill: { $t: 'colors.accent' }, opacity: 0.9, zIndex: 4, rotation: -14 },
      { id: 'dpad-v', type: 'shape', shapeKind: 'rect', x: 330, y: 660, width: 64, height: 190, fill: { $t: 'colors.primary' }, zIndex: 4 },
      { id: 'dpad-h', type: 'shape', shapeKind: 'rect', x: 266, y: 722, width: 192, height: 64, fill: { $t: 'colors.primary' }, zIndex: 4 },
      { id: 'dpad-c', type: 'shape', shapeKind: 'rect', x: 342, y: 734, width: 40, height: 40, fill: 'rgba(255,255,255,0.15)', zIndex: 5 },
      { id: 'btn-a', type: 'shape', shapeKind: 'rect', x: 730, y: 690, width: 78, height: 78, fill: { $t: 'colors.accent' }, border: { color: { $t: 'colors.primary' }, width: 6 }, zIndex: 4, rotation: -12 },
      { id: 'btn-b', type: 'shape', shapeKind: 'rect', x: 610, y: 740, width: 78, height: 78, fill: { $t: 'colors.accent' }, border: { color: { $t: 'colors.primary' }, width: 6 }, zIndex: 4, rotation: -12 },
      { id: 'btn-a-lb', type: 'text', content: 'B', fontFamily: PX, fontSize: 26, fontWeight: '900', color: { $t: 'colors.primary' }, x: 742, y: 630, width: 30, height: 34, zIndex: 5 },
      { id: 'btn-b-lb', type: 'text', content: 'A', fontFamily: PX, fontSize: 26, fontWeight: '900', color: { $t: 'colors.primary' }, x: 618, y: 682, width: 30, height: 34, zIndex: 5 },
      { id: 'select', type: 'shape', shapeKind: 'rect', x: 452, y: 900, width: 76, height: 26, fill: { $t: 'colors.primary' }, zIndex: 4, rotation: -22 },
      { id: 'start', type: 'shape', shapeKind: 'rect', x: 560, y: 900, width: 76, height: 26, fill: { $t: 'colors.primary' }, zIndex: 4, rotation: -22 },
      { id: 'sel-lb', type: 'text', content: 'SELECT · START', fontFamily: PX, fontSize: 18, color: { $t: 'colors.primary' }, opacity: 0.6, letterSpacing: 2, x: 440, y: 944, width: 220, height: 26, zIndex: 4 },
      { id: 'spk-1', group: 'spk-', type: 'shape', shapeKind: 'rect', x: 700, y: 900, width: 14, height: 64, fill: { $t: 'colors.primary' }, opacity: 0.7, rotation: -28, zIndex: 4 },
      { id: 'spk-2', group: 'spk-', type: 'shape', shapeKind: 'rect', x: 730, y: 912, width: 14, height: 64, fill: { $t: 'colors.primary' }, opacity: 0.7, rotation: -28, zIndex: 4 },
      { id: 'spk-3', group: 'spk-', type: 'shape', shapeKind: 'rect', x: 760, y: 924, width: 14, height: 64, fill: { $t: 'colors.primary' }, opacity: 0.7, rotation: -28, zIndex: 4 },
      { id: 'pwr', type: 'shape', shapeKind: 'rect', x: 236, y: 900, width: 18, height: 18, fill: '#EF4444', zIndex: 4, animation: { name: 'blink' as const, duration: 2200, iterationCount: 'infinite' } },
      { id: 'pwr-lb', type: 'text', content: 'POWER', fontFamily: PX, fontSize: 16, color: { $t: 'colors.primary' }, opacity: 0.6, x: 224, y: 926, width: 80, height: 22, zIndex: 4 },
      { id: 'caption', type: 'text', content: '随身携带的整个童年', fontFamily: { $t: 'fonts.heading' }, fontSize: 36, fontWeight: '900', color: { $t: 'colors.primary' }, letterSpacing: 8, textAlign: 'center', x: 140, y: 16, width: 800, height: 44, zIndex: 6, animation: { name: 'fadeInUp' as const, duration: 320, delay: 660 }, editable: { content: true, fontSize: { type: 'range', min: 24, max: 47 }, position: true } }
    ]
  },

  // 6. 肉鸽地牢小地图
  {
    id: 'pixel-dungeon-map', name: '肉鸽地牢小地图 (16:9)', version: '1.0.0', category: 'pixel', tags: ['pixel', 'roguelike', 'map', 'dungeon', '16:9'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="178" height="100" viewBox="0 0 178 100"><rect width="178" height="100" fill="%230c0a09"/><g fill="%23292524" stroke="%2357534e" stroke-width="1"><rect x="14" y="16" width="40" height="28"/><rect x="86" y="30" width="34" height="26"/><rect x="134" y="52" width="32" height="26"/></g><g stroke="%2357534e" stroke-width="3"><line x1="54" y1="30" x2="86" y2="42"/><line x1="120" y1="44" x2="134" y2="62"/></g><text x="30" y="34" font-size="10" fill="%23fbbf24" font-family="monospace">@</text><text x="142" y="70" font-size="10" fill="%23ef4444" font-family="monospace">!</text></svg>',
    tokens: {
      colors: PIXEL_COLORS(['暗窟', '石色', '标记'], { bg: '#0C0A09', primary: '#A8A29E', accent: '#FBBF24' }, {
        bg: ['#0C0A09', '#1E1B4B', '#052E16', '#450A0A'],
        primary: ['#A8A29E', '#C4B5FD', '#86EFAC', '#FCA5A5'],
        accent: ['#FBBF24', '#FDE047', '#4ADE80', '#F87171']
      }),
      fonts: PX_FONTS
    },
    presets: [
      { name: '火炬褐', colors: { bg: '#0C0A09', primary: '#A8A29E', accent: '#FBBF24' } },
      { name: '幽蓝法窟', colors: { bg: '#1E1B4B', primary: '#C4B5FD', accent: '#FDE047' } },
      { name: '苔藓地道', colors: { bg: '#052E16', primary: '#86EFAC', accent: '#4ADE80' } },
      { name: '血窟警戒', colors: { bg: '#450A0A', primary: '#FCA5A5', accent: '#F87171' } }
    ],
    canvas: { virtualWidth: 1920, virtualHeight: 1080, defaultWidth: 1920, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' }, backgroundImage: checker(1920, 1080, 48, 'rgba(255,255,255,0.035)') },
    elements: [
      { id: 'title', type: 'text', content: '卡戎地下 · 第 7 层', fontFamily: { $t: 'fonts.heading' }, fontSize: 56, fontWeight: '900', color: { $t: 'colors.primary' }, letterSpacing: 8, x: 120, y: 70, width: 900, height: 70, zIndex: 4, animation: { name: 'fadeIn' as const, duration: 280 }, editable: { content: true, fontSize: { type: 'range', min: 40, max: 76 }, position: true } },
      { id: 'subtitle', type: 'text', content: 'MAPTAB [M] · 探索率 62% · 已探明房间 9 / 14', fontFamily: PX, fontSize: 24, color: { $t: 'colors.primary' }, opacity: 0.55, x: 120, y: 148, width: 900, height: 36, zIndex: 4, editable: { content: true } },
      { id: 'map-frame', type: 'shape', shapeKind: 'rect', x: 120, y: 220, width: 1180, height: 740, fill: 'rgba(255,255,255,0.025)', border: { color: { $t: 'colors.primary' }, width: 3 }, opacity: 0.85, zIndex: 2, animation: { name: 'zoomIn' as const, duration: 340, delay: 180 }},
      { id: 'room-a', type: 'shape', shapeKind: 'rect', x: 190, y: 290, width: 260, height: 180, fill: 'rgba(168,162,158,0.14)', border: { color: { $t: 'colors.primary' }, width: 4 }, zIndex: 3 },
      { id: 'room-b', type: 'shape', shapeKind: 'rect', x: 560, y: 340, width: 220, height: 160, fill: 'rgba(168,162,158,0.14)', border: { color: { $t: 'colors.primary' }, width: 4 }, zIndex: 3 },
      { id: 'room-c', type: 'shape', shapeKind: 'rect', x: 900, y: 280, width: 280, height: 200, fill: 'rgba(168,162,158,0.14)', border: { color: { $t: 'colors.primary' }, width: 4 }, zIndex: 3 },
      { id: 'room-d', type: 'shape', shapeKind: 'rect', x: 250, y: 620, width: 240, height: 200, fill: 'rgba(168,162,158,0.14)', border: { color: { $t: 'colors.primary' }, width: 4 }, zIndex: 3 },
      { id: 'room-e', type: 'shape', shapeKind: 'rect', x: 640, y: 660, width: 200, height: 180, fill: 'rgba(168,162,158,0.10)', border: { color: { $t: 'colors.primary' }, width: 4 }, opacity: 0.6, zIndex: 3 },
      { id: 'room-x', type: 'shape', shapeKind: 'rect', x: 1010, y: 620, width: 200, height: 180, fill: 'rgba(255,255,255,0.02)', border: { color: 'rgba(168,162,158,0.3)', width: 3, style: 'dashed' }, zIndex: 3 },
      { id: 'x-t', type: 'text', content: '未探明', fontFamily: PX, fontSize: 24, color: { $t: 'colors.primary' }, opacity: 0.35, textAlign: 'center', x: 1010, y: 690, width: 200, height: 32, zIndex: 4 },
      { id: 'corr-1', group: 'corr-', type: 'shape', shapeKind: 'line', x: 450, y: 380, width: 110, height: 4, fill: { $t: 'colors.primary' }, opacity: 0.5, zIndex: 3 },
      { id: 'corr-2', group: 'corr-', type: 'shape', shapeKind: 'line', x: 780, y: 420, width: 120, height: 4, fill: { $t: 'colors.primary' }, opacity: 0.5, zIndex: 3 },
      { id: 'corr-3', group: 'corr-', type: 'shape', shapeKind: 'rect', x: 370, y: 470, width: 4, height: 150, fill: { $t: 'colors.primary' }, opacity: 0.5, zIndex: 3 },
      { id: 'corr-4', group: 'corr-', type: 'shape', shapeKind: 'line', x: 490, y: 720, width: 150, height: 4, fill: { $t: 'colors.primary' }, opacity: 0.5, zIndex: 3 },
      { id: 'you', type: 'text', content: '@', fontFamily: PX, fontSize: 64, fontWeight: '900', color: { $t: 'colors.accent' }, x: 290, y: 330, width: 70, height: 80, zIndex: 5, animation: { name: 'blink' as const, duration: 1200, iterationCount: 'infinite' } },
      { id: 'you-lb', type: 'text', content: '你 · Lv.14', fontFamily: PX, fontSize: 24, fontWeight: '700', color: { $t: 'colors.accent' }, x: 210, y: 250, width: 220, height: 30, zIndex: 5, animation: { name: 'fadeIn' as const, duration: 240, delay: 560 }},
      { id: 'loot', type: 'text', content: '$', fontFamily: PX, fontSize: 48, fontWeight: '900', color: '#FDE047', x: 990, y: 330, width: 60, height: 70, zIndex: 5, animation: { name: 'sparkle' as const, duration: 2400, iterationCount: 'infinite' } },
      { id: 'loot-lb', type: 'text', content: '宝箱房', fontFamily: PX, fontSize: 24, color: { $t: 'colors.primary' }, opacity: 0.7, x: 970, y: 250, width: 140, height: 30, zIndex: 5 },
      { id: 'boss', type: 'text', content: '!', fontFamily: PX, fontSize: 48, fontWeight: '900', color: '#EF4444', x: 720, y: 690, width: 50, height: 70, zIndex: 5, animation: { name: 'pulse' as const, duration: 1600, iterationCount: 'infinite' } },
      { id: 'boss-lb', type: 'text', content: '？的气息', fontFamily: PX, fontSize: 24, color: { $t: 'colors.primary' }, opacity: 0.7, x: 660, y: 620, width: 160, height: 30, zIndex: 5 },
      { id: 'stairs', type: 'text', content: '>', fontFamily: PX, fontSize: 48, fontWeight: '900', color: { $t: 'colors.accent' }, x: 380, y: 690, width: 50, height: 64, zIndex: 5 },
      { id: 'north', type: 'text', content: 'N ↑', fontFamily: PX, fontSize: 30, fontWeight: '900', color: { $t: 'colors.primary' }, opacity: 0.6, x: 1210, y: 250, width: 70, height: 40, zIndex: 5 },
      { id: 'legend', type: 'shape', shapeKind: 'rect', x: 1380, y: 220, width: 420, height: 470, fill: 'rgba(0,0,0,0.35)', border: { color: { $t: 'colors.primary' }, width: 2 }, zIndex: 2, animation: { name: 'fadeIn' as const, duration: 280, delay: 440 }},
      { id: 'lg-h', type: 'text', content: 'LEGEND // 图例', fontFamily: PX, fontSize: 24, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 2, x: 1410, y: 252, width: 360, height: 34, zIndex: 4 },
      { id: 'lg-1', type: 'text', content: '@  你所在位置', fontFamily: PX, fontSize: 24, color: { $t: 'colors.primary' }, x: 1410, y: 306, width: 360, height: 38, zIndex: 4, editable: { content: true } },
      { id: 'lg-2', type: 'text', content: '$  战利品（未拾取）', fontFamily: PX, fontSize: 24, color: { $t: 'colors.primary' }, x: 1410, y: 356, width: 360, height: 38, zIndex: 4, editable: { content: true } },
      { id: 'lg-3', type: 'text', content: '!  高威胁反应', fontFamily: PX, fontSize: 24, color: { $t: 'colors.primary' }, x: 1410, y: 406, width: 360, height: 38, zIndex: 4, editable: { content: true } },
      { id: 'lg-4', type: 'text', content: '>  下层楼梯', fontFamily: PX, fontSize: 24, color: { $t: 'colors.primary' }, x: 1410, y: 456, width: 360, height: 38, zIndex: 4, editable: { content: true } },
      { id: 'lg-skull', type: 'image', src: SKULL, objectFit: 'contain', x: 1530, y: 510, width: 96, height: 96, zIndex: 4, animation: { name: 'twinkle' as const, duration: 3200, iterationCount: 'infinite' } },
      { id: 'lg-note', type: 'text', content: '提示：火把快熄了。', fontFamily: PX, fontSize: 24, color: { $t: 'colors.primary' }, opacity: 0.5, x: 1410, y: 628, width: 360, height: 30, zIndex: 4, editable: { content: true } },
      { id: 'footer', type: 'text', content: 'F1 帮助 · F5 全图（如果活着回来）', fontFamily: PX, fontSize: 24, color: { $t: 'colors.primary' }, opacity: 0.4, x: 120, y: 1000, width: 900, height: 32, zIndex: 4, animation: { name: 'fadeIn' as const, duration: 260, delay: 680 }, editable: { content: true } }
    ]
  },

  // 7. 像素杂货铺
  {
    id: 'pixel-general-store', name: '像素杂货铺 (4:5)', version: '1.0.0', category: 'pixel', tags: ['pixel', 'shop', 'store', 'prices', '4:5'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="142" height="178" viewBox="0 0 142 178"><rect width="142" height="178" fill="%231c1917"/><rect x="20" y="20" width="102" height="26" fill="none" stroke="%23fde68a" stroke-width="2"/><text x="71" y="38" font-size="13" text-anchor="middle" fill="%23fde68a" font-family="monospace">SHOP</text><g fill="%23f97316"><rect x="24" y="52" width="20" height="34"/><rect x="52" y="52" width="20" height="34"/><rect x="80" y="52" width="20" height="34"/><rect x="108" y="52" width="20" height="34"/></g><g font-size="9" font-family="monospace" fill="%23e7e5e4"><text x="26" y="110">药水</text><text x="96" y="110">40G</text><text x="26" y="128">钥匙</text><text x="96" y="128">90G</text></g></svg>',
    tokens: {
      colors: PIXEL_COLORS(['夜色街道', '灯箱字', '暖帘'], { bg: '#1C1917', primary: '#FDE68A', accent: '#F97316' }, {
        bg: ['#1C1917', '#0C1B33', '#2E1065', '#431407'],
        primary: ['#FDE68A', '#E0F2FE', '#F5F3FF', '#FFEDD5'],
        accent: ['#F97316', '#EF4444', '#22C55E', '#38BDF8', '#A78BFA']
      }),
      fonts: PX_FONTS
    },
    presets: [
      { name: '灯火橙', colors: { bg: '#1C1917', primary: '#FDE68A', accent: '#F97316' } },
      { name: '雪见蓝', colors: { bg: '#0C1B33', primary: '#E0F2FE', accent: '#38BDF8' } },
      { name: '魔法紫', colors: { bg: '#2E1065', primary: '#F5F3FF', accent: '#A78BFA' } },
      { name: '炉火红', colors: { bg: '#431407', primary: '#FFEDD5', accent: '#EF4444' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' }, backgroundImage: dither(1080, 1350, 50, 6, 'rgba(255,255,255,0.05)') },
    elements: [
      { id: 'sign', type: 'shape', shapeKind: 'rect', x: 140, y: 80, width: 800, height: 120, fill: 'rgba(0,0,0,0.4)', border: { color: { $t: 'colors.primary' }, width: 4 }, zIndex: 2, animation: { name: 'zoomIn' as const, duration: 320 }},
      { id: 'sign-t', type: 'text', content: '杂货铺 GENERAL STORE', fontFamily: { $t: 'fonts.heading' }, fontSize: 52, fontWeight: '900', color: { $t: 'colors.primary' }, letterSpacing: 6, textAlign: 'center', x: 140, y: 112, width: 800, height: 60, zIndex: 4, animation: { name: 'glow' as const, duration: 4200, iterationCount: 'infinite' }, editable: { content: true, fontSize: { type: 'range', min: 36, max: 64 }, position: true } },
      { id: 'noren-1', group: 'noren-', type: 'shape', shapeKind: 'rect', x: 170, y: 224, width: 130, height: 170, fill: { $t: 'colors.accent' }, opacity: 0.9, zIndex: 3 },
      { id: 'noren-2', group: 'noren-', type: 'shape', shapeKind: 'rect', x: 330, y: 224, width: 130, height: 170, fill: { $t: 'colors.accent' }, opacity: 0.9, zIndex: 3 },
      { id: 'noren-3', group: 'noren-', type: 'shape', shapeKind: 'rect', x: 490, y: 224, width: 130, height: 170, fill: { $t: 'colors.accent' }, opacity: 0.9, zIndex: 3 },
      { id: 'noren-4', group: 'noren-', type: 'shape', shapeKind: 'rect', x: 650, y: 224, width: 130, height: 170, fill: { $t: 'colors.accent' }, opacity: 0.9, zIndex: 3 },
      { id: 'noren-5', group: 'noren-', type: 'shape', shapeKind: 'rect', x: 810, y: 224, width: 130, height: 170, fill: { $t: 'colors.accent' }, opacity: 0.9, zIndex: 3 },
      { id: 'noren-bar', type: 'shape', shapeKind: 'line', x: 150, y: 224, width: 820, height: 10, fill: { $t: 'colors.primary' }, opacity: 0.7, zIndex: 4, animation: { name: 'fadeIn' as const, duration: 260, delay: 240 }},
      { id: 'n-closed', type: 'text', content: '营业中 · OPEN', fontFamily: PX, fontSize: 26, fontWeight: '700', color: { $t: 'colors.primary' }, letterSpacing: 4, textAlign: 'center', x: 140, y: 420, width: 800, height: 36, zIndex: 4, animation: { name: 'blink' as const, duration: 2600, iterationCount: 'infinite' }, editable: { content: true } },
      { id: 'menu-h', type: 'text', content: '—— 今日货架 ——', fontFamily: { $t: 'fonts.heading' }, fontSize: 32, fontWeight: '700', color: { $t: 'colors.primary' }, opacity: 0.75, letterSpacing: 4, textAlign: 'center', x: 290, y: 492, width: 500, height: 42, zIndex: 4, animation: { name: 'fadeIn' as const, duration: 260, delay: 420 }, editable: { content: true } },
      { id: 'g-potion', type: 'image', src: POTION, objectFit: 'contain', x: 170, y: 570, width: 72, height: 72, zIndex: 4 },
      { id: 'p-potion', type: 'text', content: '小治疗药水 POTION SM', fontFamily: PX, fontSize: 30, color: { $t: 'colors.primary' }, x: 270, y: 586, width: 520, height: 40, zIndex: 4, animation: { name: 'fadeIn' as const, duration: 240, delay: 520 }, editable: { content: true } },
      { id: 'v-potion', type: 'text', content: '40 G', fontFamily: { $t: 'fonts.heading' }, fontSize: 34, fontWeight: '900', color: { $t: 'colors.accent' }, textAlign: 'right', x: 800, y: 582, width: 130, height: 44, zIndex: 4, editable: { content: true } },
      { id: 'g-key', type: 'image', src: KEY, objectFit: 'contain', x: 170, y: 680, width: 72, height: 72, zIndex: 4 },
      { id: 'p-key', type: 'text', content: '万能钥匙 MASTER KEY', fontFamily: PX, fontSize: 30, color: { $t: 'colors.primary' }, x: 270, y: 696, width: 520, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'v-key', type: 'text', content: '90 G', fontFamily: { $t: 'fonts.heading' }, fontSize: 34, fontWeight: '900', color: { $t: 'colors.accent' }, textAlign: 'right', x: 800, y: 692, width: 130, height: 44, zIndex: 4, editable: { content: true } },
      { id: 'g-heart', type: 'image', src: HEART, objectFit: 'contain', x: 170, y: 790, width: 78, height: 70, zIndex: 4 },
      { id: 'p-heart', type: 'text', content: '生命上限 +1 LIFE UP', fontFamily: PX, fontSize: 30, color: { $t: 'colors.primary' }, x: 270, y: 806, width: 520, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'v-heart', type: 'text', content: '???', fontFamily: { $t: 'fonts.heading' }, fontSize: 34, fontWeight: '900', color: { $t: 'colors.accent' }, textAlign: 'right', x: 800, y: 802, width: 130, height: 44, zIndex: 4, animation: { name: 'twinkle' as const, duration: 2800, iterationCount: 'infinite' }, editable: { content: true } },
      { id: 'g-sword', type: 'image', src: SWORD, objectFit: 'contain', x: 170, y: 900, width: 72, height: 72, zIndex: 4 },
      { id: 'p-sword', type: 'text', content: '铁剑 IRON SWORD', fontFamily: PX, fontSize: 30, color: { $t: 'colors.primary' }, x: 270, y: 916, width: 520, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'v-sword', type: 'text', content: '120 G', fontFamily: { $t: 'fonts.heading' }, fontSize: 34, fontWeight: '900', color: { $t: 'colors.accent' }, textAlign: 'right', x: 800, y: 912, width: 130, height: 44, zIndex: 4, editable: { content: true } },
      { id: 'coin-pile', type: 'image', src: COIN, objectFit: 'contain', x: 170, y: 1030, width: 64, height: 64, zIndex: 4 },
      { id: 'coin-pile-2', type: 'image', src: COIN, objectFit: 'contain', x: 220, y: 1050, width: 48, height: 48, zIndex: 4, animation: { name: 'sparkle' as const, duration: 2600, delay: 400, iterationCount: 'infinite' } },
      { id: 'enter', type: 'text', content: '▶ 从后门进入需要 1 把钥匙', fontFamily: PX, fontSize: 26, color: { $t: 'colors.primary' }, opacity: 0.65, x: 300, y: 1046, width: 620, height: 36, zIndex: 4, animation: { name: 'fadeInUp' as const, duration: 300, delay: 700 }, editable: { content: true } },
      { id: 'footer', type: 'text', content: '店主不在，钱放罐子里 · 偷东西会被史莱姆看见', fontFamily: PX, fontSize: 22, color: { $t: 'colors.primary' }, opacity: 0.45, textAlign: 'center', x: 140, y: 1180, width: 800, height: 32, zIndex: 4, editable: { content: true } },
      { id: 'slime-shop', type: 'image', src: SLIME, objectFit: 'contain', x: 880, y: 1220, width: 96, height: 80, zIndex: 4, animation: { name: 'bounce' as const, duration: 2600, iterationCount: 'infinite' } }
    ]
  },

  // 8. 任务告示板
  {
    id: 'pixel-quest-board', name: '任务告示板 (9:16)', version: '1.0.0', category: 'pixel', tags: ['pixel', 'quest', 'board', 'rpg', '9:16'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="178" viewBox="0 0 100 178"><rect width="100" height="178" fill="%23292524"/><rect x="14" y="40" width="72" height="40" fill="%23fef3c7"/><rect x="46" y="36" width="8" height="8" fill="%23ef4444"/><rect x="14" y="90" width="72" height="40" fill="%23fef3c7" opacity="0.85"/><rect x="46" y="86" width="8" height="8" fill="%23ef4444"/><g stroke="%2357534e" stroke-width="4"><line x1="10" y1="150" x2="10" y2="178"/><line x1="90" y1="150" x2="90" y2="178"/></g><text x="50" y="26" font-size="10" text-anchor="middle" fill="%23fde68a" font-family="monospace">QUESTS</text></svg>',
    tokens: {
      colors: PIXEL_COLORS(['木墙', '羊皮纸', '火漆印'], { bg: '#292524', primary: '#FEF3C7', accent: '#EF4444' }, {
        bg: ['#292524', '#1C1917', '#0C1B33', '#3B2A20'],
        primary: ['#FEF3C7', '#F5F5F4', '#E0F2FE', '#FFEDD5'],
        accent: ['#EF4444', '#F59E0B', '#22C55E', '#A78BFA']
      }),
      fonts: PX_FONTS
    },
    presets: [
      { name: '冒险者夜', colors: { bg: '#292524', primary: '#FEF3C7', accent: '#EF4444' } },
      { name: '公会清晨', colors: { bg: '#1C1917', primary: '#F5F5F4', accent: '#F59E0B' } },
      { name: '港口驿站', colors: { bg: '#0C1B33', primary: '#E0F2FE', accent: '#22C55E' } },
      { name: '炉边酒馆', colors: { bg: '#3B2A20', primary: '#FFEDD5', accent: '#A78BFA' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1920, defaultWidth: 1080, defaultHeight: 1920, backgroundColor: { $t: 'colors.bg' }, backgroundImage: checker(1080, 1920, 60, 'rgba(255,255,255,0.03)') },
    elements: [
      { id: 'post-l', type: 'shape', shapeKind: 'rect', x: 90, y: 260, width: 40, height: 1560, fill: 'rgba(0,0,0,0.35)', border: { color: 'rgba(255,255,255,0.1)', width: 2 }, zIndex: 1 },
      { id: 'post-r', type: 'shape', shapeKind: 'rect', x: 950, y: 260, width: 40, height: 1560, fill: 'rgba(0,0,0,0.35)', border: { color: 'rgba(255,255,255,0.1)', width: 2 }, zIndex: 1 },
      { id: 'board', type: 'shape', shapeKind: 'rect', x: 70, y: 300, width: 940, height: 1450, fill: 'rgba(120,80,40,0.18)', border: { color: { $t: 'colors.primary' }, width: 5 }, opacity: 0.95, zIndex: 2 },
      { id: 'title', type: 'text', content: '任务告示板', fontFamily: { $t: 'fonts.heading' }, fontSize: 92, fontWeight: '900', color: { $t: 'colors.primary' }, letterSpacing: 16, textAlign: 'center', x: 140, y: 108, width: 800, height: 110, zIndex: 4, animation: { name: 'zoomIn' as const, duration: 700 }, editable: { content: true, fontSize: { type: 'range', min: 64, max: 110 }, position: true } },
      { id: 'subtitle', type: 'text', content: 'QUEST BOARD · 揭榜请到柜台登记', fontFamily: PX, fontSize: 26, color: { $t: 'colors.primary' }, opacity: 0.55, letterSpacing: 4, textAlign: 'center', x: 190, y: 214, width: 700, height: 36, zIndex: 4, editable: { content: true } },
      { id: 'q1', group: 'q', type: 'shape', shapeKind: 'rect', x: 140, y: 370, width: 800, height: 300, fill: { $t: 'colors.primary' }, opacity: 0.95, rotation: -1.5, zIndex: 3 },
      { id: 'q1-pin', type: 'shape', shapeKind: 'rect', x: 520, y: 352, width: 22, height: 22, fill: { $t: 'colors.accent' }, zIndex: 5 },
      { id: 'q1-h', type: 'text', content: '★ 北田的史莱姆 ×12', fontFamily: { $t: 'fonts.heading' }, fontSize: 42, fontWeight: '900', color: { $t: 'colors.bg' }, x: 180, y: 400, width: 720, height: 52, zIndex: 4, rotation: -1.5, editable: { content: true } },
      { id: 'q1-b', type: 'text', content: '作物又被啃了。报酬按只计，\n尾巴可以不留。', fontFamily: PX, fontSize: 28, color: { $t: 'colors.bg' }, opacity: 0.75, lineHeight: 1.6, x: 180, y: 470, width: 700, height: 110, zIndex: 4, rotation: -1.5, editable: { content: true } },
      { id: 'q1-r', type: 'text', content: '奖励 120 G · ★★', fontFamily: PX, fontSize: 30, fontWeight: '900', color: { $t: 'colors.bg' }, opacity: 0.9, x: 180, y: 596, width: 600, height: 40, zIndex: 4, rotation: -1.5, editable: { content: true } },
      { id: 'q2', group: 'q', type: 'shape', shapeKind: 'rect', x: 150, y: 760, width: 800, height: 300, fill: { $t: 'colors.primary' }, opacity: 0.88, rotation: 1.2, zIndex: 3 },
      { id: 'q2-pin', type: 'shape', shapeKind: 'rect', x: 540, y: 742, width: 22, height: 22, fill: { $t: 'colors.accent' }, zIndex: 5 },
      { id: 'q2-h', type: 'text', content: '★ 深夜钟楼异响', fontFamily: { $t: 'fonts.heading' }, fontSize: 42, fontWeight: '900', color: { $t: 'colors.bg' }, x: 180, y: 790, width: 720, height: 52, zIndex: 4, rotation: 1.2, editable: { content: true } },
      { id: 'q2-b', type: 'text', content: '钟声在零点自己响了 13 下。\n胆大的来，幽灵真的在。', fontFamily: PX, fontSize: 28, color: { $t: 'colors.bg' }, opacity: 0.75, lineHeight: 1.6, x: 180, y: 860, width: 700, height: 110, zIndex: 4, rotation: 1.2, editable: { content: true } },
      { id: 'q2-r', type: 'text', content: '奖励 300 G · ★★★', fontFamily: PX, fontSize: 30, fontWeight: '900', color: { $t: 'colors.bg' }, opacity: 0.9, x: 180, y: 986, width: 600, height: 40, zIndex: 4, rotation: 1.2, editable: { content: true } },
      { id: 'q2-ghost', type: 'image', src: GHOST, objectFit: 'contain', x: 800, y: 880, width: 100, height: 100, zIndex: 5, animation: { name: 'float' as const, duration: 5600, iterationCount: 'infinite' } },
      { id: 'q3', group: 'q', type: 'shape', shapeKind: 'rect', x: 140, y: 1150, width: 800, height: 300, fill: { $t: 'colors.primary' }, opacity: 0.8, rotation: -0.8, zIndex: 3 },
      { id: 'q3-pin', type: 'shape', shapeKind: 'rect', x: 528, y: 1132, width: 22, height: 22, fill: { $t: 'colors.accent' }, zIndex: 5 },
      { id: 'q3-h', type: 'text', content: '★ 护送运盐车（急）', fontFamily: { $t: 'fonts.heading' }, fontSize: 42, fontWeight: '900', color: { $t: 'colors.bg' }, x: 180, y: 1180, width: 720, height: 52, zIndex: 4, rotation: -0.8, editable: { content: true } },
      { id: 'q3-b', type: 'text', content: '强盗出没的老路线，两天来回。\n会挥剑就行，工资日结。', fontFamily: PX, fontSize: 28, color: { $t: 'colors.bg' }, opacity: 0.75, lineHeight: 1.6, x: 180, y: 1250, width: 700, height: 110, zIndex: 4, rotation: -0.8, editable: { content: true } },
      { id: 'q3-r', type: 'text', content: '奖励 180 G · ★★', fontFamily: PX, fontSize: 30, fontWeight: '900', color: { $t: 'colors.bg' }, opacity: 0.9, x: 180, y: 1376, width: 600, height: 40, zIndex: 4, rotation: -0.8, editable: { content: true } },
      { id: 'take', type: 'text', content: '▶ 按 A 揭榜 · 按 B 回家吃饭', fontFamily: PX, fontSize: 30, fontWeight: '700', color: { $t: 'colors.primary' }, letterSpacing: 2, textAlign: 'center', x: 140, y: 1540, width: 800, height: 42, zIndex: 4, animation: { name: 'blink' as const, duration: 1600, iterationCount: 'infinite' }, editable: { content: true } },
      { id: 'star-d', type: 'image', src: STAR, objectFit: 'contain', x: 480, y: 1620, width: 60, height: 54, zIndex: 4, animation: { name: 'twinkle' as const, duration: 3000, iterationCount: 'infinite' } },
      { id: 'footer', type: 'text', content: '新人冒险者请先阅读《地牢法》第 3 条', fontFamily: PX, fontSize: 22, color: { $t: 'colors.primary' }, opacity: 0.4, textAlign: 'center', x: 190, y: 1810, width: 700, height: 32, zIndex: 4, editable: { content: true } }
    ]
  },

  // 9. BOSS 血条
  {
    id: 'pixel-boss-hp', name: 'BOSS血条 (16:9)', version: '1.0.0', category: 'pixel', tags: ['pixel', 'boss', 'health', 'battle', '16:9'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="178" height="100" viewBox="0 0 178 100"><rect width="178" height="100" fill="%2318181b"/><rect x="20" y="18" width="100" height="8" fill="none" stroke="%23f5f5f4" stroke-width="1"/><rect x="21" y="19" width="62" height="6" fill="%23ef4444"/><rect x="84" y="19" width="3" height="6" fill="%23fbbf24"/><g fill="%23f5f5f4"><rect x="66" y="46" width="10" height="10"/><rect x="76" y="46" width="10" height="10"/><rect x="86" y="46" width="10" height="10"/><rect x="56" y="56" width="50" height="10"/><rect x="66" y="66" width="10" height="8"/><rect x="86" y="66" width="10" height="8"/></g><text x="120" y="70" font-size="12" fill="%23fbbf24" font-family="monospace">-9999</text></svg>',
    tokens: {
      colors: PIXEL_COLORS(['斗技场', '铭文', '血量'], { bg: '#18181B', primary: '#F5F5F4', accent: '#EF4444' }, {
        bg: ['#18181B', '#0C0A09', '#1E1B4B', '#450A0A'],
        primary: ['#F5F5F4', '#E7E5E4', '#C4B5FD', '#FDE68A'],
        accent: ['#EF4444', '#F97316', '#A855F7', '#22C55E']
      }),
      fonts: PX_FONTS
    },
    presets: [
      { name: '赤红终局', colors: { bg: '#18181B', primary: '#F5F5F4', accent: '#EF4444' } },
      { name: '余烬试炼', colors: { bg: '#0C0A09', primary: '#E7E5E4', accent: '#F97316' } },
      { name: '虚空魔王', colors: { bg: '#1E1B4B', primary: '#C4B5FD', accent: '#A855F7' } },
      { name: '腐沼巨龙', colors: { bg: '#450A0A', primary: '#FDE68A', accent: '#22C55E' } }
    ],
    canvas: { virtualWidth: 1920, virtualHeight: 1080, defaultWidth: 1920, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' }, backgroundImage: scan(1920, 1080, 10, 'rgba(255,255,255,0.025)') },
    elements: [
      { id: 'arena-tag', type: 'text', content: 'FINAL ROOM · 无退路', fontFamily: PX, fontSize: 26, fontWeight: '700', color: { $t: 'colors.primary' }, opacity: 0.45, letterSpacing: 8, x: 160, y: 96, width: 600, height: 36, zIndex: 4, editable: { content: true } },
      { id: 'boss-name', type: 'text', content: '光之吞噬者 · Lvl 99', fontFamily: { $t: 'fonts.heading' }, fontSize: 84, fontWeight: '900', color: { $t: 'colors.primary' }, letterSpacing: 6, x: 160, y: 150, width: 1300, height: 110, zIndex: 4, animation: { name: 'slideInLeft' as const, duration: 800 }, editable: { content: true, fontSize: { type: 'range', min: 56, max: 104 }, position: true } },
      { id: 'skull', type: 'image', src: SKULL, objectFit: 'contain', x: 1620, y: 120, width: 150, height: 150, zIndex: 4, animation: { name: 'pulse' as const, duration: 2400, iterationCount: 'infinite' } },
      { id: 'hp-frame', type: 'shape', shapeKind: 'rect', x: 160, y: 330, width: 1600, height: 64, fill: 'rgba(0,0,0,0.5)', border: { color: { $t: 'colors.primary' }, width: 4 }, zIndex: 3 },
      ...Array.from({ length: 10 }, (_, i) => ({
        id: 'hp-seg-' + i, type: 'shape' as const, shapeKind: 'rect' as const,
        x: 172 + i * 158, y: 342, width: 146, height: 40,
        fill: i < 6 ? { $t: 'colors.accent' } : 'rgba(255,255,255,0.07)',
        opacity: i < 6 ? 1 : 1, zIndex: 4,
        ...(i === 5 ? { animation: { name: 'blink' as const, duration: 900, iterationCount: 'infinite' as const } } : {})
      })),
      { id: 'hp-pct', type: 'text', content: '58%', fontFamily: { $t: 'fonts.heading' }, fontSize: 34, fontWeight: '900', color: { $t: 'colors.accent' }, textAlign: 'right', x: 1560, y: 280, width: 200, height: 44, zIndex: 5, editable: { content: true } },
      { id: 'phase', type: 'text', content: 'PHASE Ⅱ · 狂暴倒计时 00:47', fontFamily: PX, fontSize: 28, fontWeight: '700', color: { $t: 'colors.primary' }, opacity: 0.65, letterSpacing: 2, x: 160, y: 420, width: 800, height: 38, zIndex: 4, editable: { content: true } },
      { id: 'enrage', type: 'text', content: '▲ ENRAGED ▲', fontFamily: { $t: 'fonts.heading' }, fontSize: 36, fontWeight: '900', color: { $t: 'colors.accent' }, letterSpacing: 10, textAlign: 'center', x: 1300, y: 416, width: 460, height: 46, zIndex: 4, animation: { name: 'wobble' as const, duration: 1400, iterationCount: 'infinite' }, editable: { content: true } },
      { id: 'stage', type: 'shape', shapeKind: 'rect', x: 0, y: 840, width: 1920, height: 10, fill: { $t: 'colors.primary' }, opacity: 0.25, zIndex: 3 },
      { id: 'boss-sprite', type: 'image', src: GHOST, objectFit: 'contain', x: 1200, y: 520, width: 280, height: 280, zIndex: 3, animation: { name: 'float' as const, duration: 6000, iterationCount: 'infinite' } },
      { id: 'hero-sprite', type: 'image', src: HERO, objectFit: 'contain', x: 420, y: 660, width: 170, height: 170, zIndex: 4, animation: { name: 'bounce' as const, duration: 900, iterationCount: 'infinite' } },
      { id: 'dmg-1', type: 'text', content: '-9999', fontFamily: { $t: 'fonts.heading' }, fontSize: 56, fontWeight: '900', color: { $t: 'colors.accent' }, x: 1120, y: 470, width: 240, height: 66, zIndex: 5, animation: { name: 'rise' as const, duration: 1600, iterationCount: 'infinite' } },
      { id: 'dmg-2', type: 'text', content: '-412', fontFamily: PX, fontSize: 36, fontWeight: '700', color: { $t: 'colors.primary' }, opacity: 0.6, x: 620, y: 600, width: 160, height: 44, zIndex: 5, animation: { name: 'rise' as const, duration: 2000, delay: 600, iterationCount: 'infinite' } },
      { id: 'hearts', type: 'text', content: '♥♥♥', fontFamily: PX, fontSize: 44, fontWeight: '900', color: { $t: 'colors.accent' }, x: 160, y: 900, width: 200, height: 54, zIndex: 4 },
      { id: 'player-hp', type: 'shape', shapeKind: 'rect', x: 380, y: 916, width: 420, height: 22, fill: 'rgba(255,255,255,0.1)', zIndex: 3 },
      { id: 'player-fill', type: 'shape', shapeKind: 'rect', x: 380, y: 916, width: 92, height: 22, fill: '#4ADE80', zIndex: 4, animation: { name: 'blink' as const, duration: 1100, iterationCount: 'infinite' } },
      { id: 'player-lb', type: 'text', content: 'YOU · HP 危险', fontFamily: PX, fontSize: 24, fontWeight: '700', color: { $t: 'colors.primary' }, opacity: 0.6, x: 380, y: 872, width: 400, height: 34, zIndex: 4, editable: { content: true } },
      { id: 'hint', type: 'text', content: '翻滚需要体力，体力需要信仰。', fontFamily: PX, fontSize: 24, color: { $t: 'colors.primary' }, opacity: 0.4, textAlign: 'right', x: 1300, y: 990, width: 460, height: 32, zIndex: 4, editable: { content: true } }
    ]
  },

  // 10. 复古开机自检
  {
    id: 'pixel-boot', name: '复古开机自检 (1:1)', version: '1.0.0', category: 'pixel', tags: ['pixel', 'boot', 'crt', 'terminal', '1:1'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23000"/><rect x="8" y="8" width="84" height="84" fill="none" stroke="%234ade80" stroke-width="2" stroke-dasharray="4 3"/><g font-size="7" font-family="monospace" fill="%234ade80"><text x="16" y="30">MEM OK</text><text x="16" y="42">DISK OK</text><text x="16" y="58">■ ■ ■</text></g><rect x="60" y="52" width="6" height="6" fill="%23fde047"/></svg>',
    tokens: {
      colors: PIXEL_COLORS(['熄屏黑', '荧光绿', '提示'], { bg: '#000000', primary: '#4ADE80', accent: '#FDE047' }, {
        bg: ['#000000', '#0A0A0A', '#020617', '#150A02'],
        primary: ['#4ADE80', '#86EFAC', '#67E8F9', '#FDE68A'],
        accent: ['#FDE047', '#FB7185', '#A78BFA', '#F9A825']
      }),
      fonts: PX_FONTS
    },
    presets: [
      { name: '荧光绿', colors: { bg: '#000000', primary: '#4ADE80', accent: '#FDE047' } },
      { name: '薄荷CRT', colors: { bg: '#0A0A0A', primary: '#86EFAC', accent: '#FB7185' } },
      { name: '海水蓝屏', colors: { bg: '#020617', primary: '#67E8F9', accent: '#A78BFA' } },
      { name: '琥珀老屏', colors: { bg: '#150A02', primary: '#FDE68A', accent: '#F9A825' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1080, defaultWidth: 1080, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' }, backgroundImage: scan(1080, 1080, 7, 'rgba(255,255,255,0.035)') },
    elements: [
      { id: 'crt-frame', type: 'shape', shapeKind: 'rect', x: 70, y: 70, width: 940, height: 940, border: { color: { $t: 'colors.primary' }, width: 3, style: 'dashed' }, opacity: 0.45, zIndex: 2 },
      { id: 'bios', type: 'text', content: 'PIXEL-BIOS v2.4  (C) 198X 星光软件', fontFamily: PX, fontSize: 28, color: { $t: 'colors.primary' }, x: 130, y: 130, width: 800, height: 38, zIndex: 4, editable: { content: true } },
      { id: 'ln1', type: 'text', content: 'MEMORY CHECK ........ 64K OK', fontFamily: PX, fontSize: 30, color: { $t: 'colors.primary' }, x: 130, y: 210, width: 820, height: 40, zIndex: 4, animation: { name: 'fadeIn' as const, duration: 500 }, editable: { content: true } },
      { id: 'ln2', type: 'text', content: 'SPRITE ENGINE ....... READY', fontFamily: PX, fontSize: 30, color: { $t: 'colors.primary' }, x: 130, y: 262, width: 820, height: 40, zIndex: 4, animation: { name: 'fadeIn' as const, duration: 500, delay: 300 }, editable: { content: true } },
      { id: 'ln3', type: 'text', content: 'SOUND CHIP (3 CHANNEL) OK', fontFamily: PX, fontSize: 30, color: { $t: 'colors.primary' }, x: 130, y: 314, width: 820, height: 40, zIndex: 4, animation: { name: 'fadeIn' as const, duration: 500, delay: 600 }, editable: { content: true } },
      { id: 'ln4', type: 'text', content: 'CARTRIDGE DETECTED: 「星光卡带」', fontFamily: PX, fontSize: 30, color: { $t: 'colors.accent' }, x: 130, y: 366, width: 850, height: 40, zIndex: 4, animation: { name: 'fadeIn' as const, duration: 500, delay: 900 }, editable: { content: true } },
      { id: 'load-h', type: 'text', content: 'LOADING ...', fontFamily: PX, fontSize: 26, fontWeight: '700', color: { $t: 'colors.primary' }, letterSpacing: 3, x: 130, y: 460, width: 400, height: 34, zIndex: 4 },
      ...Array.from({ length: 12 }, (_, i) => ({
        id: 'seg-' + i, type: 'shape' as const, shapeKind: 'rect' as const,
        x: 130 + i * 70, y: 508, width: 52, height: 34,
        fill: { $t: 'colors.primary' }, opacity: 0.9, zIndex: 4,
        animation: { name: 'zoomIn' as const, duration: 300, delay: 200 + i * 90 }
      })),
      { id: 'pct', type: 'text', content: '100%', fontFamily: PX, fontSize: 30, fontWeight: '900', color: { $t: 'colors.accent' }, textAlign: 'right', x: 900, y: 456, width: 120, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'logo-star', type: 'image', src: STAR, objectFit: 'contain', x: 474, y: 600, width: 130, height: 117, zIndex: 4, animation: { name: 'twinkle' as const, duration: 3200, iterationCount: 'infinite' } },
      { id: 'logo', type: 'text', content: '星 光 冒 险 社', fontFamily: { $t: 'fonts.heading' }, fontSize: 76, fontWeight: '900', color: { $t: 'colors.primary' }, letterSpacing: 12, textAlign: 'center', x: 140, y: 740, width: 800, height: 96, zIndex: 4, animation: { name: 'zoomIn' as const, duration: 800, delay: 1400 }, editable: { content: true, fontSize: { type: 'range', min: 52, max: 96 }, position: true } },
      { id: 'logo-en', type: 'text', content: 'STARLIGHT ADVENTURE CO.', fontFamily: PX, fontSize: 26, color: { $t: 'colors.primary' }, opacity: 0.55, letterSpacing: 10, textAlign: 'center', x: 190, y: 848, width: 700, height: 34, zIndex: 4, editable: { content: true } },
      { id: 'ready', type: 'text', content: 'PRESS ANY KEY ▮', fontFamily: { $t: 'fonts.heading' }, fontSize: 34, fontWeight: '900', color: { $t: 'colors.accent' }, letterSpacing: 6, textAlign: 'center', x: 290, y: 916, width: 500, height: 44, zIndex: 4, animation: { name: 'blink' as const, duration: 1000, iterationCount: 'infinite' }, editable: { content: true } },
      { id: 'coin-ico', type: 'image', src: COIN, objectFit: 'contain', x: 130, y: 924, width: 44, height: 44, zIndex: 4, animation: { name: 'sparkle' as const, duration: 2800, iterationCount: 'infinite' } },
      { id: 'hero-ico', type: 'image', src: HERO, objectFit: 'contain', x: 890, y: 900, width: 70, height: 70, zIndex: 4, animation: { name: 'bounce' as const, duration: 1600, delay: 400, iterationCount: 'infinite' } }
    ]
  }
]

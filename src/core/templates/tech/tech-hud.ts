// src/core/templates/tech/tech-hud.ts —— 重 HUD·赛博批（机械剖视图 1:1 ／ 霓虹街景纵深 9:16）
// 口径：剖视几何全部用 rect+circle+旋转 rect 拼装、实色走 token（换预设＝整图换色）；
//       剖面线/扫描线/暗角/噪点等氛围层是中性 rgba（overlay 才有 mixBlendMode），允许写死；
//       发光靠 shadow.blur 与 glow 动画；斜线一律用居中旋转的细长 rect（端点取中点+半长，避免竖线被压扁）。
import type { Template } from '@/types/types'
import {MONO, HEI, grain, star} from '../_fx/trend'
import { seeded01 } from '../_fx/common'

const seeded = seeded01

/** 归一化伪随机：返回 0..1（trend 里的 seeded 是原始整数，别混用） */

/** 两点之间的细长 rect（自带居中旋转），用于尺寸线／引线／透视汇聚线 */
function seg(id: string, x1: number, y1: number, x2: number, y2: number, t: number, token: string, op: number, z: number, extra: any = {}) {
  const dx = x2 - x1, dy = y2 - y1, len = Math.sqrt(dx * dx + dy * dy)
  return { id, type: 'shape', shapeKind: 'rect', x: x1 + dx / 2 - len / 2, y: y1 + dy / 2 - t / 2, width: len, height: t, rotation: Math.atan2(dy, dx) * 180 / Math.PI, fill: { $t: token }, opacity: op, zIndex: z, ...extra }
}

const HEAD = '"Arial Black", Impact, "PingFang SC", "Microsoft YaHei", sans-serif'
const MESH = 'repeating-linear-gradient(0deg, rgba(170,215,235,0.05) 0px, rgba(170,215,235,0.05) 1px, rgba(0,0,0,0) 1px, rgba(0,0,0,0) 40px), repeating-linear-gradient(90deg, rgba(170,215,235,0.05) 0px, rgba(170,215,235,0.05) 1px, rgba(0,0,0,0) 1px, rgba(0,0,0,0) 40px)'
const SCAN = 'repeating-linear-gradient(0deg, rgba(210,235,250,0.05) 0px, rgba(210,235,250,0.05) 1px, rgba(0,0,0,0) 1px, rgba(0,0,0,0) 4px)'
/** 剖面线（45° 斜纹）：overlay 才有 background，中性白纹不跟换色 */
const HATCH = 'repeating-linear-gradient(45deg, rgba(226,244,255,0.14) 0px, rgba(226,244,255,0.14) 2px, rgba(0,0,0,0) 2px, rgba(0,0,0,0) 11px)'

const VIGNETTE = 'radial-gradient(78% 62% at 50% 46%, rgba(0,0,0,0) 42%, rgba(0,0,0,0.68) 100%)'
/** 夜空渐层：47.5% 处＝地平线（912 / 1920），以下透明留给路面 */
const SKY = 'linear-gradient(180deg, rgba(4,7,20,0.96) 0%, rgba(10,14,38,0.8) 24%, rgba(64,18,72,0.52) 42%, rgba(0,0,0,0) 47.5%)'
const ROAD_HAZE = 'linear-gradient(180deg, rgba(0,0,0,0) 47.5%, rgba(140,200,255,0.07) 58%, rgba(255,110,170,0.09) 74%, rgba(0,0,0,0.34) 100%)'
/** 窗格网：26px 竖棂 + 34px 楼层，铺在楼体上（窗灯另用 token 方块） */
const WGRID = 'repeating-linear-gradient(90deg, rgba(180,215,240,0.10) 0px, rgba(180,215,240,0.10) 1px, rgba(0,0,0,0) 1px, rgba(0,0,0,0) 26px), repeating-linear-gradient(0deg, rgba(180,215,240,0.10) 0px, rgba(180,215,240,0.10) 1px, rgba(0,0,0,0) 1px, rgba(0,0,0,0) 34px)'
const RAIN_A = 'repeating-linear-gradient(78deg, rgba(198,230,255,0.15) 0px, rgba(198,230,255,0.15) 1px, rgba(0,0,0,0) 1px, rgba(0,0,0,0) 9px)'
const RAIN_B = 'repeating-linear-gradient(73deg, rgba(255,226,240,0.12) 0px, rgba(255,226,240,0.12) 1.5px, rgba(0,0,0,0) 1.5px, rgba(0,0,0,0) 22px)'

/** 透视公式：p=0 为消失点，路面 y＝912+600·p^1.6，半宽＝(60+880·p^1.28)/2 */
const roadY = (p: number) => 912 + 600 * Math.pow(p, 1.6)
const roadW = (p: number) => 60 + 880 * Math.pow(p, 1.28)

export const techHudTemplates: Template[] = [
  {
    id: 'tech-mecha-section', name: '机械剖视图', version: '1.0.0', category: 'tech',
    tags: ['tech', 'blueprint', 'cross-section', 'engineering', '1:1', '高信息密度'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23050B12"/><circle cx="50" cy="46" r="26" fill="none" stroke="%2322D3EE" stroke-width="1.4"/><circle cx="50" cy="46" r="9" fill="none" stroke="%23FBBF24" stroke-width="1.4"/><rect x="18" y="45" width="64" height="2" fill="%2322D3EE" opacity="0.6"/><rect x="14" y="78" width="72" height="10" fill="none" stroke="%2394A3B8" stroke-width="1"/></svg>',
    tokens: {
      colors: {
        bg: { label: '图纸底', default: '#050B12', options: ['#050B12', '#0A0512', '#02100A', '#100C04', '#0A0A0A'] },
        panel: { label: '表格底', default: '#0A1520', options: ['#0A1520', '#150C1E', '#0A1812', '#181206', '#121212'] },
        ink: { label: '主字色', default: '#E4F2FA', options: ['#E4F2FA', '#F2E9FF', '#E4FFF0', '#FFF2DC', '#EDEDED'] },
        muted: { label: '弱字色', default: '#7C9AAE', options: ['#7C9AAE', '#A38FBB', '#7FA894', '#B79C6A', '#8E8E8E'] },
        line: { label: '图线', default: '#1D3749', options: ['#1D3749', '#2E1F42', '#1C3A2C', '#3A2C10', '#272727'] },
        accent: { label: '轮廓线', default: '#22D3EE', options: ['#22D3EE', '#A855F7', '#34D399', '#F59E0B', '#94A3B8'] },
        accent2: { label: '标注线', default: '#FBBF24', options: ['#FBBF24', '#F472B6', '#A3E635', '#38BDF8', '#FB7185'] },
        accent3: { label: '运动件', default: '#FB7185', options: ['#FB7185', '#818CF8', '#5EEAD4', '#FDBA74', '#C084FC'] }
      },
      fonts: { heading: { label: '标题字体', default: HEAD, options: [HEAD, MONO, HEI] } }
    },
    presets: [
      { name: '青蓝蓝图', colors: { bg: '#050B12', panel: '#0A1520', ink: '#E4F2FA', muted: '#7C9AAE', line: '#1D3749', accent: '#22D3EE', accent2: '#FBBF24', accent3: '#FB7185' } },
      { name: '紫晶剖面', colors: { bg: '#0A0512', panel: '#150C1E', ink: '#F2E9FF', muted: '#A38FBB', line: '#2E1F42', accent: '#A855F7', accent2: '#F472B6', accent3: '#818CF8' } },
      { name: '墨绿车间', colors: { bg: '#02100A', panel: '#0A1812', ink: '#E4FFF0', muted: '#7FA894', line: '#1C3A2C', accent: '#34D399', accent2: '#A3E635', accent3: '#5EEAD4' } },
      { name: '钠灯晒图', colors: { bg: '#100C04', panel: '#181206', ink: '#FFF2DC', muted: '#B79C6A', line: '#3A2C10', accent: '#F59E0B', accent2: '#FDBA74', accent3: '#FB7185' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1080, defaultWidth: 1080, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      // ── 图纸氛围
      { id: 'ms-mesh', type: 'overlay', background: MESH, x: 0, y: 0, width: 1080, height: 1080, opacity: 0.9, zIndex: 1 },
      { id: 'ms-glow', type: 'shape', shapeKind: 'circle', x: 310, y: 400, width: 240, height: 240, fill: { $t: 'colors.accent' }, opacity: 0.08, zIndex: 1, shadow: { color: { $t: 'colors.accent' }, blur: 70, offsetX: 0, offsetY: 0 }, animation: { name: 'pulse', duration: 6000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      // ── 页眉
      { id: 'ms-kicker', type: 'text', content: 'SECTION A—A / 涡轮泵总成 / 图号 NF-042', fontFamily: MONO, fontSize: 22, color: { $t: 'colors.accent2' }, letterSpacing: 3, x: 92, y: 74, width: 560, height: 30, zIndex: 5, editable: { content: true }, animation: { name: 'fadeIn', duration: 480 } },
      { id: 'ms-title', type: 'text', content: '机械剖视图', fontFamily: { $t: 'fonts.heading' }, fontSize: 64, fontWeight: '900', color: { $t: 'colors.ink' }, letterSpacing: 4, x: 92, y: 106, width: 460, height: 82, zIndex: 5, shadow: { color: { $t: 'colors.accent' }, blur: 24, offsetX: 0, offsetY: 0 }, animation: { name: 'glow', duration: 4400, iterationCount: 'infinite', easing: 'ease-in-out' }, editable: { content: true, fontSize: { type: 'range', min: 40, max: 78 } } },
      { id: 'ms-sec', type: 'text', content: '投影：第三角 · 单位 mm', fontFamily: MONO, fontSize: 18, color: { $t: 'colors.muted' }, textAlign: 'right', x: 700, y: 152, width: 304, height: 26, zIndex: 5, editable: { content: true } },
      { id: 'ms-chip', type: 'shape', shapeKind: 'rect', x: 780, y: 68, width: 224, height: 44, fill: { $t: 'colors.accent2' }, opacity: 0.12, border: { width: 1, color: { $t: 'colors.accent2' } }, borderRadius: 4, zIndex: 4 },
      { id: 'ms-chip-dot', type: 'shape', shapeKind: 'circle', x: 800, y: 84, width: 11, height: 11, fill: { $t: 'colors.accent2' }, zIndex: 5, animation: { name: 'blink', duration: 1200, iterationCount: 'infinite', easing: 'steps(1)' } },
      { id: 'ms-chip-t', type: 'text', content: 'LIVE 载荷 68%', fontFamily: MONO, fontSize: 18, fontWeight: '700', color: { $t: 'colors.accent2' }, textAlign: 'center', letterSpacing: 1, x: 800, y: 78, width: 190, height: 26, zIndex: 5, editable: { content: true } },
      { id: 'ms-rule', type: 'shape', shapeKind: 'rect', x: 92, y: 198, width: 912, height: 2, fill: { $t: 'colors.accent' }, opacity: 0.45, zIndex: 4, animation: { name: 'slideInLeft', duration: 760, delay: 100 } },
      // ── 剖视主体：壳体 / 剖面线 / 叶轮 / 轴
      { id: 'ms-ring-o', type: 'shape', shapeKind: 'circle', x: 174, y: 264, width: 512, height: 512, border: { width: 1.5, style: 'dashed', color: { $t: 'colors.accent' } }, opacity: 0.3, zIndex: 2, animation: { name: 'spinSlow', duration: 26000, iterationCount: 'infinite', easing: 'linear' } },
      { id: 'ms-shell', type: 'shape', shapeKind: 'circle', x: 198, y: 288, width: 464, height: 464, border: { width: 3, color: { $t: 'colors.accent' } }, opacity: 0.95, zIndex: 3, shadow: { color: { $t: 'colors.accent' }, blur: 18, offsetX: 0, offsetY: 0 } },
      { id: 'ms-inner', type: 'shape', shapeKind: 'circle', x: 246, y: 336, width: 368, height: 368, border: { width: 1.5, color: { $t: 'colors.accent' } }, opacity: 0.6, zIndex: 3 },
      { id: 'ms-wall', type: 'shape', shapeKind: 'circle', x: 272, y: 362, width: 316, height: 316, border: { width: 1, style: 'dashed', color: { $t: 'colors.line' } }, opacity: 0.95, zIndex: 3 },
      { id: 'ms-hatch-l', type: 'overlay', background: HATCH, x: 198, y: 288, width: 34, height: 464, opacity: 0.9, zIndex: 3 },
      { id: 'ms-hatch-r', type: 'overlay', background: HATCH, x: 628, y: 288, width: 34, height: 464, opacity: 0.9, zIndex: 3, animation: { name: 'pulse', duration: 7000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'ms-shaft', type: 'shape', shapeKind: 'rect', x: 198, y: 514, width: 464, height: 12, fill: { $t: 'colors.accent3' }, opacity: 0.4, zIndex: 3 },
      ...Array.from({ length: 12 }, (_, i) => {
        const a = i * 30, rad = a * Math.PI / 180
        return { id: `ms-blade-${i}`, type: 'shape', shapeKind: 'rect', x: 430 + Math.cos(rad) * 116 - 46, y: 520 + Math.sin(rad) * 116 - 8, width: 92, height: 16, rotation: a, fill: { $t: 'colors.accent' }, opacity: 0.28, zIndex: 3, animation: { name: 'twinkle', duration: 3600 + i * 160, delay: i * 110, iterationCount: 'infinite', easing: 'ease-in-out' } }
      }) as any,
      { id: 'ms-hub', type: 'shape', shapeKind: 'circle', x: 370, y: 460, width: 120, height: 120, fill: { $t: 'colors.panel' }, opacity: 0.98, border: { width: 2.5, color: { $t: 'colors.accent2' } }, zIndex: 4, shadow: { color: { $t: 'colors.accent2' }, blur: 22, offsetX: 0, offsetY: 0 }, animation: { name: 'pulse', duration: 2800, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'ms-hub-in', type: 'shape', shapeKind: 'circle', x: 404, y: 494, width: 52, height: 52, border: { width: 1.5, color: { $t: 'colors.accent3' } }, opacity: 0.9, zIndex: 5 },
      ...Array.from({ length: 8 }, (_, i) => {
        const rad = (i * 45 - 22) * Math.PI / 180
        return { id: `ms-bolt-${i}`, type: 'shape', shapeKind: 'circle', x: 430 + Math.cos(rad) * 190 - 7, y: 520 + Math.sin(rad) * 190 - 7, width: 14, height: 14, border: { width: 1.5, color: { $t: 'colors.muted' } }, fill: { $t: 'colors.bg' } as any, opacity: 0.95, zIndex: 4, animation: { name: 'twinkle', duration: 2600 + i * 220, delay: i * 140, iterationCount: 'infinite' } }
      }) as any,
      // ── 尺寸线
      { id: 'ms-dim-v', type: 'shape', shapeKind: 'rect', x: 149, y: 288, width: 1.5, height: 464, fill: { $t: 'colors.accent2' }, opacity: 0.75, zIndex: 3 },
      { id: 'ms-dim-v-t1', type: 'shape', shapeKind: 'rect', x: 136, y: 288, width: 28, height: 1.5, fill: { $t: 'colors.accent2' }, opacity: 0.75, zIndex: 3 },
      { id: 'ms-dim-v-t2', type: 'shape', shapeKind: 'rect', x: 136, y: 751, width: 28, height: 1.5, fill: { $t: 'colors.accent2' }, opacity: 0.75, zIndex: 3 },
      { id: 'ms-dim-v-t', type: 'text', content: 'H 464', fontFamily: MONO, fontSize: 18, fontWeight: '700', color: { $t: 'colors.accent2' }, letterSpacing: 2, textAlign: 'center', rotation: -90, x: 60, y: 507, width: 130, height: 26, zIndex: 5, editable: { content: true } },
      { id: 'ms-dim-h', type: 'shape', shapeKind: 'rect', x: 198, y: 795, width: 464, height: 1.5, fill: { $t: 'colors.accent2' }, opacity: 0.75, zIndex: 3 },
      { id: 'ms-dim-h-t1', type: 'shape', shapeKind: 'rect', x: 198, y: 782, width: 1.5, height: 28, fill: { $t: 'colors.accent2' }, opacity: 0.75, zIndex: 3 },
      { id: 'ms-dim-h-t2', type: 'shape', shapeKind: 'rect', x: 661, y: 782, width: 1.5, height: 28, fill: { $t: 'colors.accent2' }, opacity: 0.75, zIndex: 3 },
      { id: 'ms-dim-h-t', type: 'text', content: 'Ø 464 · 公差 H7', fontFamily: MONO, fontSize: 22, fontWeight: '700', color: { $t: 'colors.accent2' }, letterSpacing: 2, textAlign: 'center', x: 334, y: 750, width: 192, height: 28, zIndex: 5, editable: { content: true } },
      // ── 右侧引出标注
      ...[[516, 302, '01', '叶轮', '钛合金 · 12 片'], [612, 368, '02', '机械密封', '碳化硅 / 石墨'], [650, 434, '03', '前壳体', 'QT450 球墨铸铁'], [666, 500, '04', '轴承座', '圆锥滚子 32210'], [662, 566, '05', '导流叶片', '不锈钢 316L'], [640, 632, '06', 'O 型圈', '氟橡胶 · Ø3.1']].map((c, i) => {
        const edge = c[0] as number, cy = c[1] as number, tok = i % 2 ? 'colors.accent2' : 'colors.accent'
        return [
          { id: `ms-lead-${i}`, type: 'shape', shapeKind: 'rect', x: edge, y: cy, width: 688 - edge, height: 1.5, fill: { $t: tok }, opacity: 0.8, zIndex: 4, animation: { name: 'slideInLeft', duration: 600, delay: 260 + i * 90 } },
          { id: `ms-bd-${i}`, type: 'shape', shapeKind: 'circle', x: 690, y: cy - 15, width: 30, height: 30, border: { width: 1.5, color: { $t: tok } }, fill: { $t: 'colors.bg' }, opacity: 0.95, zIndex: 5, animation: { name: 'pulse', duration: 3000 + i * 260, delay: i * 180, iterationCount: 'infinite' } },
          { id: `ms-bd-t-${i}`, type: 'text', content: c[2] as string, fontFamily: MONO, fontSize: 18, fontWeight: '700', color: { $t: tok } as any, textAlign: 'center', x: 690, y: cy - 8, width: 30, height: 22, zIndex: 6 },
          { id: `ms-note-${i}`, type: 'text', content: c[3] as string, fontFamily: { $t: 'fonts.heading' } as any, fontSize: 26, fontWeight: '800', color: { $t: 'colors.ink' } as any, letterSpacing: 1, x: 748, y: cy - 30, width: 256, height: 34, zIndex: 5, editable: { content: true } },
          { id: `ms-note-s-${i}`, type: 'text', content: c[4] as string, fontFamily: MONO, fontSize: 18, color: { $t: 'colors.muted' } as any, x: 748, y: cy + 6, width: 256, height: 26, zIndex: 5, editable: { content: true } }
        ]
      }).flat() as any,
      // ── 左下公差表
      { id: 'ms-tol-frame', type: 'shape', shapeKind: 'rect', x: 92, y: 862, width: 464, height: 148, fill: { $t: 'colors.panel' }, opacity: 0.85, border: { width: 1, color: { $t: 'colors.line' } }, zIndex: 2 },
      { id: 'ms-tol-cap', type: 'text', content: '关键公差 / TOLERANCE', fontFamily: { $t: 'fonts.heading' }, fontSize: 22, fontWeight: '800', color: { $t: 'colors.accent' }, letterSpacing: 2, x: 92, y: 824, width: 400, height: 30, zIndex: 5, editable: { content: true } },
      ...[['项目', '数值', '公差带', '等级'], ['轴径 Ø95', '0.020', 'H7', 'IT6'], ['端面跳动', '0.015', 'A2', 'G2'], ['叶片间隙', '0.80', 'C4', '±0.05'], ['粗糙度', 'Ra 0.8', 'N7', '—']].map((r, i) => {
        const head = i === 0, y = head ? 880 : 908 + (i - 1) * 26
        return [
          { id: `ms-tol-a-${i}`, type: 'text', content: r[0], fontFamily: head ? MONO : HEI, fontSize: head ? 18 : 18, fontWeight: head ? '700' : '400', color: { $t: head ? 'colors.muted' : 'colors.ink' } as any, letterSpacing: head ? 2 : 0, x: 108, y, width: 136, height: 24, zIndex: 5, editable: { content: true } },
          { id: `ms-tol-b-${i}`, type: 'text', content: r[1], fontFamily: MONO, fontSize: head ? 18 : 22, fontWeight: head ? '700' : '700', color: { $t: head ? 'colors.muted' : 'colors.accent' } as any, letterSpacing: head ? 2 : 0, x: 236, y, width: 110, height: 24, zIndex: 5 },
          { id: `ms-tol-c-${i}`, type: 'text', content: r[2], fontFamily: MONO, fontSize: 18, color: { $t: head ? 'colors.muted' : 'colors.accent2' } as any, letterSpacing: head ? 2 : 0, x: 364, y, width: 90, height: 24, zIndex: 5 },
          { id: `ms-tol-d-${i}`, type: 'text', content: r[3], fontFamily: MONO, fontSize: 18, color: { $t: head ? 'colors.muted' : 'colors.muted' } as any, textAlign: 'right', letterSpacing: head ? 2 : 0, x: 448, y, width: 92, height: 24, zIndex: 5 }
        ]
      }).flat() as any,
      // ── 右下标题栏
      { id: 'ms-tb-frame', type: 'shape', shapeKind: 'rect', x: 570, y: 862, width: 434, height: 148, fill: { $t: 'colors.panel' }, opacity: 0.85, border: { width: 1.5, color: { $t: 'colors.accent' } }, zIndex: 2 },
      { id: 'ms-tb-v1', type: 'shape', shapeKind: 'rect', x: 714, y: 862, width: 1, height: 148, fill: { $t: 'colors.line' }, zIndex: 3 },
      { id: 'ms-tb-v2', type: 'shape', shapeKind: 'rect', x: 858, y: 862, width: 1, height: 148, fill: { $t: 'colors.line' }, zIndex: 3 },
      { id: 'ms-tb-h', type: 'shape', shapeKind: 'rect', x: 570, y: 935, width: 434, height: 1, fill: { $t: 'colors.line' }, zIndex: 3 },
      ...[[586, 880, '图号', 'NF-042'], [730, 880, '材质', 'TI-6AL-4V'], [874, 880, '比例', '1:2'], [586, 953, '版本', 'REV 2.4'], [730, 953, '日期', '2077-03-18'], [874, 953, '页次', '01 / 04']].map((f, i) => (
        [
          { id: `ms-tb-l-${i}`, type: 'text', content: f[2] as string, fontFamily: MONO, fontSize: 18, color: { $t: 'colors.muted' } as any, letterSpacing: 1, x: f[0] as number, y: f[1] as number, width: 116, height: 24, zIndex: 5 },
          { id: `ms-tb-v-${i}`, type: 'text', content: f[3] as string, fontFamily: MONO, fontSize: 22, fontWeight: '700', color: { $t: 'colors.ink' } as any, x: f[0] as number, y: (f[1] as number) + 26, width: 128, height: 28, zIndex: 5, editable: { content: true } }
        ]
      )).flat() as any,
      // ── 波纹与扫描
      { id: 'ms-ripple-1', type: 'shape', shapeKind: 'circle', x: 330, y: 420, width: 200, height: 200, border: { width: 1.5, color: { $t: 'colors.accent3' } }, opacity: 0.35, zIndex: 2, animation: { name: 'ripple', duration: 3800, iterationCount: 'infinite', easing: 'ease-out' } },
      { id: 'ms-ripple-2', type: 'shape', shapeKind: 'circle', x: 330, y: 420, width: 200, height: 200, border: { width: 1.5, color: { $t: 'colors.accent' } }, opacity: 0.35, zIndex: 2, animation: { name: 'ripple', duration: 3800, delay: 1900, iterationCount: 'infinite', easing: 'ease-out' } },
      { id: 'ms-scanbar', type: 'shape', shapeKind: 'rect', x: 198, y: 470, width: 464, height: 3, fill: { $t: 'colors.accent3' }, opacity: 0.4, zIndex: 6, shadow: { color: { $t: 'colors.accent3' }, blur: 18, offsetX: 0, offsetY: 0 }, animation: { name: 'float', duration: 6400, iterationCount: 'infinite', easing: 'ease-in-out' } },
      // ── 顶层
      { id: 'ms-scanline', type: 'overlay', background: SCAN, x: 0, y: 0, width: 1080, height: 1080, mixBlendMode: 'screen', opacity: 0.7, zIndex: 8 },
      { id: 'ms-vig', type: 'overlay', background: 'radial-gradient(88% 74% at 40% 48%, rgba(0,0,0,0) 46%, rgba(0,0,0,0.66) 100%)', x: 0, y: 0, width: 1080, height: 1080, zIndex: 8 },
      { id: 'ms-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1080, background: `url("${grain(280, 11, 0.9)}")`, opacity: 0.12, mixBlendMode: 'overlay', zIndex: 9 }
    ]
  },
  {
    id: 'tech-neon-street-depth', name: '霓虹街景纵深', version: '1.0.0', category: 'tech',
    tags: ['tech', 'neon', 'night-city', 'perspective', 'wet-street', '9:16', '高信息密度'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23060A1A"/><polygon points="50,47 6,100 94,100" fill="%230C1526"/><rect x="8" y="24" width="16" height="62" fill="%230C1526"/><rect x="76" y="28" width="16" height="58" fill="%230C1526"/><rect x="11" y="32" width="4" height="20" fill="%23FF2E88"/><rect x="86" y="38" width="4" height="18" fill="%2322D3EE"/><rect x="44" y="45" width="12" height="3" fill="%23FBBF24"/><rect x="30" y="82" width="40" height="2" fill="%2322D3EE" opacity="0.6"/></svg>',
    tokens: {
      colors: {
        bg: { label: '夜空', default: '#060A1A', options: ['#060A1A', '#0A0512', '#03100B', '#12040A', '#080810'] },
        panel: { label: '楼体', default: '#0C1526', options: ['#0C1526', '#170D22', '#0A1814', '#1C0A12', '#101018'] },
        ink: { label: '主字色', default: '#EAF4FF', options: ['#EAF4FF', '#F3E9FF', '#E6FFF2', '#FFEDE2', '#E8E8EF'] },
        muted: { label: '弱字色', default: '#7C93B0', options: ['#7C93B0', '#A08CBB', '#7DA891', '#B98F86', '#8D8DA0'] },
        line: { label: '接缝', default: '#1B2E4A', options: ['#1B2E4A', '#2C1D42', '#1A3729', '#3A1B24', '#25252F'] },
        accent: { label: '霓虹主色', default: '#FF2E88', options: ['#FF2E88', '#A855F7', '#FF6B35', '#22D3EE', '#F43F5E'] },
        accent2: { label: '霓虹辅色', default: '#22D3EE', options: ['#22D3EE', '#818CF8', '#FDE047', '#FBBF24', '#5EEAD4'] },
        accent3: { label: '窗灯', default: '#FBBF24', options: ['#FBBF24', '#F0ABFC', '#FDBA74', '#7DD3FC', '#A3E635'] }
      },
      fonts: { heading: { label: '标题字体', default: HEAD, options: [HEAD, MONO, HEI] } }
    },
    presets: [
      { name: '霓虹粉青', colors: { bg: '#060A1A', panel: '#0C1526', ink: '#EAF4FF', muted: '#7C93B0', line: '#1B2E4A', accent: '#FF2E88', accent2: '#22D3EE', accent3: '#FBBF24' } },
      { name: '紫电雨夜', colors: { bg: '#0A0512', panel: '#170D22', ink: '#F3E9FF', muted: '#A08CBB', line: '#2C1D42', accent: '#A855F7', accent2: '#818CF8', accent3: '#F0ABFC' } },
      { name: '铜橙夜市', colors: { bg: '#12040A', panel: '#1C0A12', ink: '#FFEDE2', muted: '#B98F86', line: '#3A1B24', accent: '#FF6B35', accent2: '#FDE047', accent3: '#FDBA74' } },
      { name: '冰蓝冷巷', colors: { bg: '#03100B', panel: '#0A1814', ink: '#E6FFF2', muted: '#7DA891', line: '#1A3729', accent: '#22D3EE', accent2: '#5EEAD4', accent3: '#7DD3FC' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1920, defaultWidth: 1080, defaultHeight: 1920, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      // ── 夜空 / 远景 / 消失点
      { id: 'ns-sky', type: 'overlay', background: SKY, x: 0, y: 0, width: 1080, height: 1920, zIndex: 1 },
      ...([[96, 402], [188, 348], [286, 452], [402, 372], [520, 330], [640, 414], [742, 356], [858, 442], [950, 380], [1002, 470]] as number[][]).map((p, i) => (
        { id: `ns-star-${i}`, type: 'shape', shapeKind: 'circle', x: p[0], y: p[1], width: 4, height: 4, fill: { $t: 'colors.ink' }, opacity: 0.55, zIndex: 2, animation: { name: 'twinkle', duration: 2600 + i * 260, delay: i * 180, iterationCount: 'infinite', easing: 'ease-in-out' } }
      )) as any,
      ...([[404, 838, 34, 68], [444, 856, 26, 50], [476, 826, 40, 80], [592, 844, 30, 62], [630, 862, 44, 44], [682, 830, 26, 76]] as number[][]).map((s, i) => (
        { id: `ns-far-${i}`, type: 'shape', shapeKind: 'rect', x: s[0], y: s[1], width: s[2], height: s[3], fill: { $t: 'colors.panel' }, opacity: 0.92, zIndex: 2, border: { width: 1, color: { $t: i % 2 ? 'colors.accent' : 'colors.accent2' } } }
      )) as any,
      { id: 'ns-vp-glow', type: 'shape', shapeKind: 'circle', x: 372, y: 846, width: 336, height: 132, fill: { $t: 'colors.accent2' }, opacity: 0.16, zIndex: 2, shadow: { color: { $t: 'colors.accent2' }, blur: 64, offsetX: 0, offsetY: 0 }, animation: { name: 'pulse', duration: 5600, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'ns-vp-core', type: 'shape', shapeKind: 'circle', x: 498, y: 886, width: 84, height: 36, fill: { $t: 'colors.accent' }, opacity: 0.4, zIndex: 2, shadow: { color: { $t: 'colors.accent' }, blur: 26, offsetX: 0, offsetY: 0 }, animation: { name: 'glow', duration: 3400, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'ns-horizon', type: 'shape', shapeKind: 'rect', x: 88, y: 910, width: 904, height: 2, fill: { $t: 'colors.accent2' }, opacity: 0.4, zIndex: 3, animation: { name: 'pulse', duration: 4200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      // ── 路面：阶梯透视条带 + 接缝 + 中线短块 + 测距门
      ...Array.from({ length: 16 }, (_, k) => {
        const w = roadW((k + 1) / 16)
        return { id: `ns-road-${k}`, type: 'shape', shapeKind: 'rect', x: 540 - w / 2, y: roadY(k / 16), width: w, height: roadY((k + 1) / 16) - roadY(k / 16) + 1, fill: { $t: 'colors.panel' }, opacity: 0.3 + k * 0.036, zIndex: 2 }
      }) as any,
      ...Array.from({ length: 8 }, (_, k) => {
        const p = (2 * k + 1) / 16, y = roadY(p), w = roadW(p)
        return { id: `ns-seam-${k}`, type: 'shape', shapeKind: 'rect', x: 540 - w / 2, y, width: w, height: 2, fill: { $t: 'colors.line' }, opacity: 0.85, zIndex: 3 }
      }) as any,
      ...Array.from({ length: 9 }, (_, k) => {
        const p = (k + 0.5) / 9
        return { id: `ns-dash-${k}`, type: 'shape', shapeKind: 'rect', x: 538, y: roadY(p), width: 4, height: 4 + 26 * p, fill: { $t: 'colors.accent2' }, opacity: 0.5, zIndex: 3, animation: { name: 'twinkle', duration: 2200 + k * 140, delay: k * 120, iterationCount: 'infinite', easing: 'ease-in-out' } }
      }) as any,
      ...([[0.16, 'D+180 m'], [0.42, 'D+90 m'], [0.74, 'D+30 m']] as [number, string][]).map((g, i) => {
        const y = roadY(g[0]), w = roadW(g[0]), tok = i % 2 ? 'colors.accent' : 'colors.accent2'
        return [
          { id: `ns-gate-${i}`, type: 'shape', shapeKind: 'rect', x: 540 - w / 2, y, width: w, height: 3, fill: { $t: tok }, opacity: 0.4, zIndex: 4, animation: { name: 'slideInLeft', duration: 620, delay: 320 + i * 160 } },
          { id: `ns-gate-t-${i}`, type: 'text', content: g[1], fontFamily: MONO, fontSize: 18, fontWeight: '700', color: { $t: tok } as any, letterSpacing: 1, textAlign: 'center', x: 480, y: y - 30, width: 120, height: 26, zIndex: 6, editable: { content: true } }
        ]
      }).flat() as any,
      // ── 楼体（4+4 镜像）：墙体 / 屋顶灯带 / 窗格网 / 10 扇闪窗
      ...([[62, 470, 130, 750], [146, 560, 120, 540], [224, 620, 110, 400], [300, 660, 96, 300], [888, 470, 130, 750], [814, 560, 120, 540], [746, 620, 110, 400], [684, 660, 96, 300]] as number[][]).map((b, i) => {
        const bx = b[0], by = b[1], bw = b[2], bh = b[3]
        const cols = Math.max(1, Math.floor((bw - 42) / 26)), rows = Math.max(1, Math.floor((bh - 54) / 34))
        const rnd = seeded(140 + i * 53)
        const toks = ['colors.accent', 'colors.accent2', 'colors.accent3']
        return [
          { id: `ns-bld-${i}`, type: 'shape', shapeKind: 'rect', x: bx, y: by, width: bw, height: bh, fill: { $t: 'colors.panel' }, opacity: 0.96, border: { width: 1, color: { $t: 'colors.line' } }, zIndex: 3 },
          { id: `ns-bld-top-${i}`, type: 'shape', shapeKind: 'rect', x: bx, y: by, width: bw, height: 3, fill: { $t: toks[i % 3] }, opacity: 0.75, zIndex: 4, animation: { name: 'glow', duration: 5200 + i * 420, iterationCount: 'infinite', easing: 'ease-in-out' } },
          { id: `ns-bld-grid-${i}`, type: 'overlay', background: WGRID, x: bx + 12, y: by + 18, width: bw - 24, height: bh - 30, opacity: 0.5, zIndex: 4 },
          ...Array.from({ length: 10 }, (_, j) => {
            const c = (j * 3 + i + Math.floor(rnd() * cols)) % cols, r = (j * 7 + i * 2 + Math.floor(rnd() * rows)) % rows
            return { id: `ns-win-${i}-${j}`, type: 'shape', shapeKind: 'rect', x: bx + 16 + c * 26, y: by + 22 + r * 34, width: 14, height: 20, fill: { $t: toks[(i + j) % 3] }, opacity: 0.5 + rnd() * 0.4, zIndex: 4, animation: { name: j % 4 === 0 ? 'twinkle' : 'pulse', duration: 2400 + ((i * 7 + j * 5) % 9) * 380, delay: (i * 11 + j * 6) % 1500, iterationCount: 'infinite', easing: 'ease-in-out' } }
          })
        ]
      }).flat() as any,
      // ── 竖排霓虹招牌（框＋发光＋竖字）
      ...([[74, 520, 4, '深夜\n食堂'], [158, 604, 3, '居酒屋'], [236, 648, 2, '拉面'], [966, 520, 3, '電脳街'], [874, 604, 2, '酒吧'], [806, 648, 2, '夜食']] as [number, number, number, string][]).map((s, i) => {
        const bh = Math.round(22 * 1.05 * (s[2] - 0.18)) + 8, tok = i % 2 ? 'colors.accent2' : 'colors.accent'
        return [
          { id: `ns-sign-${i}-decor`, type: 'shape', shapeKind: 'rect', x: s[0] - 5, y: s[1] - 12, width: 50, height: bh + 24, fill: { $t: 'colors.bg' }, opacity: 0.72, border: { width: 1.5, color: { $t: tok } }, borderRadius: 3, zIndex: 5, shadow: { color: { $t: tok }, blur: 22, offsetX: 0, offsetY: 0 }, animation: { name: 'pulse', duration: 3200 + i * 460, iterationCount: 'infinite', easing: 'ease-in-out' } },
          { id: `ns-sign-t-${i}-decor`, type: 'text', content: s[3], fontFamily: { $t: 'fonts.heading' } as any, fontSize: 22, fontWeight: '900', color: { $t: tok } as any, letterSpacing: 2, lineHeight: 1.05, textAlign: 'center', x: s[0], y: s[1], width: 40, height: bh, zIndex: 6, editable: { content: true } }
        ]
      }).flat() as any,
      ...([
        { id: 'ns-hboard-0', type: 'shape', shapeKind: 'rect', x: 74, y: 700, width: 106, height: 34, fill: { $t: 'colors.accent2' }, opacity: 0.14, border: { width: 1, color: { $t: 'colors.accent2' } }, borderRadius: 3, zIndex: 5 },
        { id: 'ns-hboard-t-0', type: 'text', content: 'OPEN 24 H', fontFamily: MONO, fontSize: 18, fontWeight: '700', color: { $t: 'colors.accent2' }, letterSpacing: 1, textAlign: 'center', x: 74, y: 706, width: 106, height: 24, zIndex: 6, animation: { name: 'blink', duration: 2600, iterationCount: 'infinite', easing: 'steps(1)' } },
        { id: 'ns-hboard-1', type: 'shape', shapeKind: 'rect', x: 894, y: 700, width: 106, height: 34, fill: { $t: 'colors.accent' }, opacity: 0.14, border: { width: 1, color: { $t: 'colors.accent' } }, borderRadius: 3, zIndex: 5 },
        { id: 'ns-hboard-t-1', type: 'text', content: 'CAUTION', fontFamily: MONO, fontSize: 18, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 2, textAlign: 'center', x: 894, y: 706, width: 106, height: 24, zIndex: 6, animation: { name: 'twinkle', duration: 2400, iterationCount: 'infinite', easing: 'ease-in-out' } }
      ] as any),
      // ── 车灯光轨 + 湿面倒影
      seg('ns-trail-1', 200, 1400, 500, 1200, 9, 'colors.accent', 0.55, 5, { shadow: { color: { $t: 'colors.accent' }, blur: 18, offsetX: 0, offsetY: 0 }, animation: { name: 'drift', duration: 4200, iterationCount: 'infinite', easing: 'ease-in-out' } }),
      seg('ns-trail-2', 880, 1420, 580, 1230, 7, 'colors.accent2', 0.5, 5, { shadow: { color: { $t: 'colors.accent2' }, blur: 18, offsetX: 0, offsetY: 0 }, animation: { name: 'drift', duration: 5200, delay: 600, iterationCount: 'infinite', easing: 'ease-in-out' } }),
      seg('ns-trail-3', 300, 1490, 760, 1330, 6, 'colors.accent3', 0.45, 5, { shadow: { color: { $t: 'colors.accent3' }, blur: 16, offsetX: 0, offsetY: 0 }, animation: { name: 'drift', duration: 6400, delay: 1200, iterationCount: 'infinite', easing: 'ease-in-out' } }),
      ...([[300, 1244, 10, 176, 'colors.accent'], [372, 1268, 8, 150, 'colors.accent3'], [540, 1300, 12, 170, 'colors.accent2'], [664, 1262, 9, 160, 'colors.accent'], [726, 1236, 8, 140, 'colors.accent3']] as [number, number, number, number, string][]).map((r, i) => (
        { id: `ns-ref-${i}`, type: 'shape', shapeKind: 'rect', x: r[0], y: r[1], width: r[2], height: r[3], fill: { $t: r[4] } as any, opacity: 0.16, zIndex: 4, shadow: { color: { $t: r[4] } as any, blur: 22, offsetX: 0, offsetY: 0 }, animation: { name: i % 2 ? 'pulse' : 'float', duration: 3600 + i * 520, delay: i * 220, iterationCount: 'infinite', easing: 'ease-in-out' } }
      )) as any,
      // ── 页眉
      { id: 'ns-kicker', type: 'text', content: 'ALLEY 07 / 纵深透视 / 雨夜 03:14', fontFamily: MONO, fontSize: 22, color: { $t: 'colors.accent2' }, letterSpacing: 3, x: 88, y: 120, width: 620, height: 30, zIndex: 7, editable: { content: true }, animation: { name: 'fadeIn', duration: 480 } },
      { id: 'ns-title', type: 'text', content: '霓虹街景纵深', fontFamily: { $t: 'fonts.heading' }, fontSize: 88, fontWeight: '900', color: { $t: 'colors.ink' }, letterSpacing: 4, x: 88, y: 152, width: 620, height: 116, zIndex: 7, shadow: { color: { $t: 'colors.accent' }, blur: 28, offsetX: 0, offsetY: 0 }, animation: { name: 'glow', duration: 4600, iterationCount: 'infinite', easing: 'ease-in-out' }, editable: { content: true, fontSize: { type: 'range', min: 56, max: 104 } } },
      { id: 'ns-sub', type: 'text', content: '长曝 8 秒 · 消失点 (540, 912)', fontFamily: HEI, fontSize: 22, color: { $t: 'colors.muted' }, letterSpacing: 1, x: 88, y: 262, width: 560, height: 30, zIndex: 7, editable: { content: true } },
      { id: 'ns-meta', type: 'text', content: 'FRAME 07 / 1080×1920', fontFamily: MONO, fontSize: 18, fontWeight: '700', color: { $t: 'colors.accent' }, textAlign: 'right', letterSpacing: 2, x: 700, y: 132, width: 312, height: 26, zIndex: 7, editable: { content: true } },
      { id: 'ns-chip', type: 'shape', shapeKind: 'rect', x: 760, y: 228, width: 252, height: 40, fill: { $t: 'colors.accent' }, opacity: 0.12, border: { width: 1, color: { $t: 'colors.accent' } }, borderRadius: 4, zIndex: 6 },
      { id: 'ns-chip-dot', type: 'shape', shapeKind: 'circle', x: 780, y: 242, width: 11, height: 11, fill: { $t: 'colors.accent' }, zIndex: 7, animation: { name: 'blink', duration: 1400, iterationCount: 'infinite', easing: 'steps(1)' } },
      { id: 'ns-chip-t', type: 'text', content: '雨强 12 mm/h', fontFamily: MONO, fontSize: 18, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 1, textAlign: 'center', x: 798, y: 236, width: 200, height: 26, zIndex: 7, editable: { content: true } },
      { id: 'ns-rule', type: 'shape', shapeKind: 'rect', x: 88, y: 300, width: 904, height: 2, fill: { $t: 'colors.accent' }, opacity: 0.45, zIndex: 6, animation: { name: 'slideInLeft', duration: 760, delay: 100 } },
      // ── 底部读数带
      ...([[88, '街区长 / LENGTH', '2.4 KM'], [400, '霓虹招牌 / SIGNS', '138 块'], [712, '曝光 / SHUTTER', '8.0 s']] as [number, string, string][]).map((c, i) => (
        [
          { id: `ns-cell-${i}`, type: 'shape', shapeKind: 'rect', x: c[0], y: 1580, width: 280, height: 132, fill: { $t: 'colors.panel' }, opacity: 0.6, border: { width: 1, color: { $t: 'colors.line' } }, zIndex: 6 },
          { id: `ns-cell-l-${i}`, type: 'text', content: c[1], fontFamily: MONO, fontSize: 18, color: { $t: 'colors.muted' } as any, letterSpacing: 1, x: c[0], y: 1600, width: 260, height: 26, zIndex: 7, animation: { name: 'fadeInUp', duration: 560, delay: 420 + i * 130 } },
          { id: `ns-cell-v-${i}`, type: 'text', content: c[2], fontFamily: { $t: 'fonts.heading' } as any, fontSize: 32, fontWeight: '900', color: { $t: i % 2 ? 'colors.accent2' : 'colors.accent' } as any, letterSpacing: 1, x: c[0], y: 1630, width: 260, height: 44, zIndex: 7, editable: { content: true }, animation: { name: 'fadeInUp', duration: 620, delay: 520 + i * 130 } }
        ]
      )).flat() as any,
      { id: 'ns-foot-l', type: 'text', content: '拍摄位 巷口 / 焦距 24mm / 光圈 f/2.8', fontFamily: HEI, fontSize: 18, color: { $t: 'colors.muted' }, x: 88, y: 1740, width: 560, height: 26, zIndex: 7, editable: { content: true } },
      { id: 'ns-foot-r', type: 'text', content: 'SEQ NS-07 / 9:16', fontFamily: MONO, fontSize: 18, fontWeight: '700', color: { $t: 'colors.accent2' }, textAlign: 'right', letterSpacing: 1, x: 700, y: 1740, width: 312, height: 26, zIndex: 7, editable: { content: true } },
      { id: 'ns-foot-rule', type: 'shape', shapeKind: 'rect', x: 88, y: 1790, width: 904, height: 1, fill: { $t: 'colors.line' }, zIndex: 6 },
      // ── 大气层：路面雾、雨丝、CRT
      { id: 'ns-haze', type: 'overlay', background: ROAD_HAZE, x: 0, y: 0, width: 1080, height: 1920, opacity: 0.9, zIndex: 5 },
      { id: 'ns-rain-a', type: 'overlay', background: RAIN_A, x: 0, y: 0, width: 1080, height: 1920, mixBlendMode: 'screen', opacity: 0.85, zIndex: 8, animation: { name: 'drift', duration: 9000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'ns-rain-b', type: 'overlay', background: RAIN_B, x: 0, y: 0, width: 1080, height: 1920, mixBlendMode: 'screen', opacity: 0.7, zIndex: 8, animation: { name: 'drift', duration: 6200, delay: 900, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'ns-scan', type: 'overlay', background: SCAN, x: 0, y: 0, width: 1080, height: 1920, mixBlendMode: 'screen', opacity: 0.5, zIndex: 9 },
      { id: 'ns-vig', type: 'overlay', background: VIGNETTE, x: 0, y: 0, width: 1080, height: 1920, zIndex: 9 },
      { id: 'ns-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1920, background: `url("${grain(300, 23, 0.9)}")`, opacity: 0.13, mixBlendMode: 'overlay', zIndex: 10 }
    ]
  }
]

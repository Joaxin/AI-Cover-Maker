// src/core/templates/cyberpunk/cyberpunk-hud.ts —— 重 HUD·赛博批（驾驶舱仪表大屏 16:9 ／ 故障艺术唱片 1:1）
// 口径：仪表与图表全用 rect+circle 拼、实色一律走 token（换预设＝整机换色）；
//       氛围层（网格/扫描线/暗角/噪点）只允许中性 rgba 写死，因为它们本就不该跟色；
//       发光靠 shadow.blur + glow 动画（drop-shadow 取 currentColor，所以自动跟 token）；竖线一律细长 rect。
import type { Template } from '@/types/types'
import {MONO, HEI, grain} from '../_fx/trend'
import { seeded01 } from '../_fx/common'

const seeded = seeded01

/** 归一化伪随机：返回 0..1（trend 里的 seeded 是原始整数，别混用） */

const HEAD = '"Arial Black", Impact, "PingFang SC", "Microsoft YaHei", sans-serif'
const MESH = 'repeating-linear-gradient(0deg, rgba(150,220,255,0.055) 0px, rgba(150,220,255,0.055) 1px, rgba(0,0,0,0) 1px, rgba(0,0,0,0) 48px), repeating-linear-gradient(90deg, rgba(150,220,255,0.055) 0px, rgba(150,220,255,0.055) 1px, rgba(0,0,0,0) 1px, rgba(0,0,0,0) 48px)'
const SCAN = 'repeating-linear-gradient(0deg, rgba(215,242,255,0.06) 0px, rgba(215,242,255,0.06) 1px, rgba(0,0,0,0) 1px, rgba(0,0,0,0) 4px)'
const VIGNETTE = 'radial-gradient(74% 60% at 50% 46%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.66) 100%)'

export const cyberpunkHudTemplates: Template[] = [
  {
    id: 'cyberpunk-cockpit-hud', name: '驾驶舱仪表大屏', version: '1.0.0', category: 'cyberpunk',
    tags: ['cyberpunk', 'hud', 'cockpit', 'telemetry', '16-9', '高信息密度'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%2305070D"/><circle cx="50" cy="52" r="17" fill="none" stroke="%2300E5FF" stroke-width="1.4"/><circle cx="50" cy="52" r="8" fill="none" stroke="%23FF2D78" stroke-width="1"/><rect x="8" y="18" width="26" height="2" fill="%2300E5FF"/><rect x="8" y="24" width="18" height="2" fill="%23FFD400"/><rect x="66" y="72" width="26" height="2" fill="%23FF2D78"/><rect x="8" y="80" width="84" height="6" fill="none" stroke="%231C3247" stroke-width="1"/></svg>',
    tokens: {
      colors: {
        bg: { label: '舱内底', default: '#05070D', options: ['#05070D', '#0A0406', '#0B0703', '#07040F', '#02060C'] },
        panel: { label: '面板底', default: '#0B1220', options: ['#0B1220', '#1A090D', '#171008', '#120B22', '#08131C'] },
        ink: { label: '主字色', default: '#E2F7FF', options: ['#E2F7FF', '#FFE9E9', '#FFF3DC', '#F1E8FF', '#EAF6FF'] },
        muted: { label: '弱字色', default: '#6E93AC', options: ['#6E93AC', '#A87A80', '#B09164', '#9A86BF', '#7FA8BC'] },
        line: { label: '描线', default: '#1C3247', options: ['#1C3247', '#3A141A', '#33230E', '#291A45', '#16404F'] },
        accent: { label: '主霓虹', default: '#00E5FF', options: ['#00E5FF', '#FF4D4D', '#FFB020', '#A855F7', '#22D3EE'] },
        accent2: { label: '警示霓虹', default: '#FF2D78', options: ['#FF2D78', '#FFD166', '#FF6B35', '#22D3EE', '#F472B6'] },
        accent3: { label: '第三色', default: '#FFD400', options: ['#FFD400', '#7CFFB2', '#6FE3C4', '#F472B6', '#4ADE80'] }
      },
      fonts: { heading: { label: '标题字体', default: HEAD, options: [HEAD, MONO, HEI] } }
    },
    presets: [
      { name: '青蓝战术', colors: { bg: '#05070D', panel: '#0B1220', ink: '#E2F7FF', muted: '#6E93AC', line: '#1C3247', accent: '#00E5FF', accent2: '#FF2D78', accent3: '#FFD400' } },
      { name: '赤刃警戒', colors: { bg: '#0A0406', panel: '#1A090D', ink: '#FFE9E9', muted: '#A87A80', line: '#3A141A', accent: '#FF4D4D', accent2: '#FFD166', accent3: '#7CFFB2' } },
      { name: '琥珀蒸汽', colors: { bg: '#0B0703', panel: '#171008', ink: '#FFF3DC', muted: '#B09164', line: '#33230E', accent: '#FFB020', accent2: '#FF6B35', accent3: '#6FE3C4' } },
      { name: '紫电渗透', colors: { bg: '#07040F', panel: '#120B22', ink: '#F1E8FF', muted: '#9A86BF', line: '#291A45', accent: '#A855F7', accent2: '#22D3EE', accent3: '#F472B6' } }
    ],
    canvas: { virtualWidth: 1920, virtualHeight: 1080, defaultWidth: 1920, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      // ── 氛围层（全出血、中性色）
      { id: 'ch-mesh', type: 'overlay', background: MESH, x: 0, y: 0, width: 1920, height: 1080, opacity: 0.85, zIndex: 1 },
      { id: 'ch-glow-a', type: 'shape', shapeKind: 'circle', x: 700, y: 240, width: 372, height: 372, fill: { $t: 'colors.accent' }, opacity: 0.07, zIndex: 1, animation: { name: 'pulse', duration: 4600, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'ch-glow-b', type: 'shape', shapeKind: 'circle', x: 806, y: 346, width: 160, height: 160, fill: { $t: 'colors.accent' }, opacity: 0.1, zIndex: 1, shadow: { color: { $t: 'colors.accent' }, blur: 70, offsetX: 0, offsetY: 0 } },
      { id: 'ch-glow-c', type: 'shape', shapeKind: 'circle', x: 1500, y: 690, width: 270, height: 270, fill: { $t: 'colors.accent2' }, opacity: 0.05, zIndex: 1, animation: { name: 'float', duration: 9000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'ch-strut-l', type: 'shape', shapeKind: 'rect', x: 44, y: 128, width: 620, height: 3, fill: { $t: 'colors.accent' }, opacity: 0.22, rotation: 26, zIndex: 1 },
      { id: 'ch-strut-r', type: 'shape', shapeKind: 'rect', x: 1256, y: 402, width: 620, height: 3, fill: { $t: 'colors.accent' }, opacity: 0.22, rotation: -26, zIndex: 1 },
      // ── 座舱外框四角括号
      ...[[44, 44, 1, 1], [1876, 44, -1, 1], [44, 1036, 1, -1], [1876, 1036, -1, -1]].map((c, i) => {
        const dx = c[2] as number, dy = c[3] as number
        return [
          { id: `ch-fr-h-${i}`, type: 'shape', shapeKind: 'rect', x: dx > 0 ? c[0] : c[0] - 132, y: dy > 0 ? c[1] : c[1] - 4, width: 132, height: 4, fill: { $t: 'colors.accent' }, opacity: 0.85, zIndex: 3, shadow: { color: { $t: 'colors.accent' }, blur: 10, offsetX: 0, offsetY: 0 }, animation: { name: dx > 0 ? 'slideInLeft' : 'slideInRight', duration: 620, delay: 60 + i * 90 } },
          { id: `ch-fr-v-${i}`, type: 'shape', shapeKind: 'rect', x: dx > 0 ? c[0] : c[0] - 4, y: dy > 0 ? c[1] : c[1] - 132, width: 4, height: 132, fill: { $t: 'colors.accent' }, opacity: 0.85, zIndex: 3, shadow: { color: { $t: 'colors.accent' }, blur: 10, offsetX: 0, offsetY: 0 }, animation: { name: 'fadeIn', duration: 700, delay: 120 + i * 90 } }
        ]
      }).flat() as any,
      // ── 顶部状态条
      { id: 'ch-top-panel', type: 'shape', shapeKind: 'rect', x: 44, y: 60, width: 1832, height: 48, fill: { $t: 'colors.panel' }, opacity: 0.65, border: { width: 1, color: { $t: 'colors.line' } }, zIndex: 2, animation: { name: 'fadeIn', duration: 520 } },
      { id: 'ch-top-rule', type: 'shape', shapeKind: 'rect', x: 44, y: 106, width: 1832, height: 2, fill: { $t: 'colors.accent' }, opacity: 0.45, zIndex: 3, animation: { name: 'slideInLeft', duration: 900, delay: 140 } },
      { id: 'ch-sys', type: 'text', content: 'MECHA-OS v9.42 // 神经链路已同步', fontFamily: MONO, fontSize: 22, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 3, x: 72, y: 68, width: 620, height: 30, zIndex: 4, editable: { content: true, fontSize: { type: 'range', min: 16, max: 30 } }, animation: { name: 'fadeIn', duration: 500, delay: 260 } },
      { id: 'ch-mode', type: 'text', content: 'COMBAT MODE · 手动超频 120%', fontFamily: MONO, fontSize: 18, color: { $t: 'colors.muted' }, x: 848, y: 70, width: 400, height: 26, zIndex: 4, editable: { content: true } },
      { id: 'ch-live', type: 'shape', shapeKind: 'circle', x: 1296, y: 78, width: 13, height: 13, fill: { $t: 'colors.accent2' }, zIndex: 4, shadow: { color: { $t: 'colors.accent2' }, blur: 14, offsetX: 0, offsetY: 0 }, animation: { name: 'blink', duration: 1100, iterationCount: 'infinite', easing: 'steps(1)' } },
      { id: 'ch-live-t', type: 'text', content: 'LIVE FEED', fontFamily: MONO, fontSize: 18, fontWeight: '700', color: { $t: 'colors.accent2' }, letterSpacing: 2, x: 1320, y: 70, width: 160, height: 26, zIndex: 4 },
      { id: 'ch-clock', type: 'text', content: 'T+00:42:17 · SECTOR 07-G', fontFamily: MONO, fontSize: 22, fontWeight: '700', color: { $t: 'colors.ink' }, textAlign: 'right', letterSpacing: 2, x: 1400, y: 68, width: 448, height: 30, zIndex: 4, editable: { content: true } },
      // ── 左：推进遥测
      { id: 'ch-l-panel', type: 'shape', shapeKind: 'rect', x: 44, y: 152, width: 512, height: 424, fill: { $t: 'colors.panel' }, opacity: 0.5, border: { width: 1, color: { $t: 'colors.line' } }, zIndex: 2, animation: { name: 'fadeInUp', duration: 700, delay: 120 } },
      { id: 'ch-l-title', type: 'text', content: '推进遥测 / PROPULSION', fontFamily: { $t: 'fonts.heading' }, fontSize: 26, fontWeight: '800', color: { $t: 'colors.accent' }, letterSpacing: 2, x: 72, y: 174, width: 448, height: 34, zIndex: 4, editable: { content: true, fontSize: { type: 'range', min: 20, max: 34 } } },
      { id: 'ch-l-rule', type: 'shape', shapeKind: 'rect', x: 72, y: 218, width: 448, height: 1.5, fill: { $t: 'colors.line' }, opacity: 0.9, zIndex: 3 },
      ...[['矢量喷口 A', 78, '78%', 'colors.accent'], ['矢量喷口 B', 81, '81%', 'colors.accent'], ['主推进器', 64, '64%', 'colors.accent3'], ['姿态微调', 92, '92%', 'colors.accent'], ['冷却回路', 37, '37%', 'colors.accent2']].map((r, i) => {
        const y = 244 + i * 68, pct = r[1] as number
        return [
          { id: `ch-l-lab-${i}`, type: 'text', content: r[0] as string, fontFamily: MONO, fontSize: 18, color: { $t: 'colors.muted' }, x: 72, y, width: 300, height: 26, zIndex: 4, editable: { content: true } },
          { id: `ch-l-val-${i}`, type: 'text', content: r[2] as string, fontFamily: MONO, fontSize: 22, fontWeight: '700', color: { $t: r[3] as string } as any, textAlign: 'right', x: 336, y: y - 2, width: 184, height: 28, zIndex: 4, shadow: { color: { $t: r[3] as string } as any, blur: 12, offsetX: 0, offsetY: 0 }, editable: { content: true } },
          { id: `ch-l-trk-${i}`, type: 'shape', shapeKind: 'rect', x: 72, y: y + 34, width: 448, height: 8, fill: { $t: 'colors.line' }, opacity: 0.5, borderRadius: 4, zIndex: 3 },
          { id: `ch-l-bar-${i}`, type: 'shape', shapeKind: 'rect', x: 72, y: y + 34, width: 448 * pct / 100, height: 8, fill: { $t: r[3] as string } as any, borderRadius: 4, zIndex: 4, shadow: { color: { $t: r[3] as string } as any, blur: 12, offsetX: 0, offsetY: 0 }, animation: { name: 'slideInLeft', duration: 820, delay: 260 + i * 110 } }
        ]
      }).flat() as any,
      // ── 左下：限制器
      { id: 'ch-l2-panel', type: 'shape', shapeKind: 'rect', x: 44, y: 604, width: 512, height: 236, fill: { $t: 'colors.panel' }, opacity: 0.5, border: { width: 1, color: { $t: 'colors.line' } }, zIndex: 2, animation: { name: 'fadeInUp', duration: 700, delay: 300 } },
      { id: 'ch-l2-title', type: 'text', content: '限制器状态 / LIMITER', fontFamily: { $t: 'fonts.heading' }, fontSize: 26, fontWeight: '800', color: { $t: 'colors.accent2' }, letterSpacing: 2, x: 72, y: 622, width: 420, height: 34, zIndex: 4, editable: { content: true } },
      ...[['同步率上限', '已锁定', 'colors.accent3'], ['武器限制器', '解除 78%', 'colors.accent'], ['神经负载', '警告 91%', 'colors.accent2'], ['散热余量', '良好 42%', 'colors.accent']].map((r, i) => {
        const y = 678 + i * 34
        return [
          { id: `ch-l2-sq-${i}`, type: 'shape', shapeKind: 'rect', x: 72, y: y + 6, width: 10, height: 10, fill: { $t: r[2] as string } as any, zIndex: 4, animation: { name: 'fadeIn', duration: 400, delay: 420 + i * 90 } },
          { id: `ch-l2-t-${i}`, type: 'text', content: r[0] as string, fontFamily: MONO, fontSize: 18, color: { $t: 'colors.muted' }, x: 100, y, width: 300, height: 26, zIndex: 4, editable: { content: true } },
          { id: `ch-l2-v-${i}`, type: 'text', content: r[1] as string, fontFamily: MONO, fontSize: 18, fontWeight: '700', color: { $t: r[2] as string } as any, textAlign: 'right', x: 372, y, width: 148, height: 26, zIndex: 4, editable: { content: true } }
        ]
      }).flat() as any,
      // ── 中：主瞄准环
      { id: 'ch-c-ring-o', type: 'shape', shapeKind: 'circle', x: 656, y: 196, width: 460, height: 460, border: { width: 2, style: 'dashed', color: { $t: 'colors.accent' } }, opacity: 0.5, zIndex: 3, animation: { name: 'spinSlow', duration: 17000, iterationCount: 'infinite', easing: 'linear' } },
      { id: 'ch-c-ring-i', type: 'shape', shapeKind: 'circle', x: 736, y: 276, width: 300, height: 300, border: { width: 1.5, color: { $t: 'colors.accent2' } }, opacity: 0.6, zIndex: 3, animation: { name: 'spinSlow', duration: 7600, iterationCount: 'infinite', easing: 'linear' } },
      { id: 'ch-c-ring-m', type: 'shape', shapeKind: 'circle', x: 806, y: 346, width: 160, height: 160, border: { width: 1, style: 'dashed', color: { $t: 'colors.line' } }, opacity: 0.9, zIndex: 3 },
      ...Array.from({ length: 12 }, (_, i) => {
        const a = (i * 30 - 90) * Math.PI / 180
        return { id: `ch-c-tick-${i}`, type: 'shape', shapeKind: 'rect', x: 886 + Math.cos(a) * 238 - 1.5, y: 426 + Math.sin(a) * 238 - 11, width: 3, height: i % 3 === 0 ? 22 : 12, fill: { $t: 'colors.accent' }, opacity: i % 3 === 0 ? 0.85 : 0.4, zIndex: 3, animation: { name: 'twinkle', duration: 2600, delay: i * 120, iterationCount: 'infinite' } }
      }) as any,
      { id: 'ch-c-xh-l', type: 'shape', shapeKind: 'rect', x: 640, y: 425, width: 176, height: 2, fill: { $t: 'colors.accent' }, opacity: 0.75, zIndex: 3 },
      { id: 'ch-c-xh-r', type: 'shape', shapeKind: 'rect', x: 956, y: 425, width: 176, height: 2, fill: { $t: 'colors.accent' }, opacity: 0.75, zIndex: 3 },
      { id: 'ch-c-xh-t', type: 'shape', shapeKind: 'rect', x: 885, y: 180, width: 2, height: 176, fill: { $t: 'colors.accent' }, opacity: 0.75, zIndex: 3 },
      { id: 'ch-c-xh-b', type: 'shape', shapeKind: 'rect', x: 885, y: 496, width: 2, height: 176, fill: { $t: 'colors.accent' }, opacity: 0.75, zIndex: 3 },
      ...[[1004, 306, 'colors.accent2', 12], [806, 470, 'colors.accent3', 10], [962, 372, 'colors.accent', 9], [824, 344, 'colors.accent2', 8]].map((b, i) => (
        { id: `ch-c-blip-${i}`, type: 'shape', shapeKind: 'circle', x: b[0] as number, y: b[1] as number, width: b[3] as number, height: b[3] as number, fill: { $t: b[2] as string } as any, zIndex: 4, shadow: { color: { $t: b[2] as string } as any, blur: 16, offsetX: 0, offsetY: 0 }, animation: { name: 'twinkle', duration: 1900 + i * 260, delay: 400 + i * 300, iterationCount: 'infinite' } }
      )) as any,
      { id: 'ch-c-lead-1', type: 'shape', shapeKind: 'rect', x: 1012, y: 306, width: 26, height: 1.5, fill: { $t: 'colors.accent' }, opacity: 0.7, zIndex: 3 },
      { id: 'ch-c-tag-1', type: 'text', content: '目标 T-0417 // 距离 0.42 km', fontFamily: MONO, fontSize: 18, fontWeight: '700', color: { $t: 'colors.accent' }, x: 1040, y: 294, width: 320, height: 26, zIndex: 4, editable: { content: true }, animation: { name: 'fadeIn', duration: 500, delay: 760 } },
      { id: 'ch-c-lead-2', type: 'shape', shapeKind: 'rect', x: 978, y: 476, width: 60, height: 1.5, fill: { $t: 'colors.accent2' }, opacity: 0.7, zIndex: 3 },
      { id: 'ch-c-tag-2', type: 'text', content: '护盾命中点 · 右舷第三段', fontFamily: MONO, fontSize: 18, color: { $t: 'colors.accent2' }, x: 1040, y: 464, width: 320, height: 26, zIndex: 4, editable: { content: true }, animation: { name: 'fadeIn', duration: 500, delay: 880 } },
      { id: 'ch-c-hero', type: 'text', content: '0.42 MACH', fontFamily: { $t: 'fonts.heading' }, fontSize: 96, fontWeight: '900', color: { $t: 'colors.ink' }, textAlign: 'center', letterSpacing: 3, x: 580, y: 664, width: 612, height: 114, zIndex: 5, shadow: { color: { $t: 'colors.accent' }, blur: 34, offsetX: 0, offsetY: 0 }, animation: { name: 'glow', duration: 3200, iterationCount: 'infinite', easing: 'ease-in-out' }, editable: { content: true, fontSize: { type: 'range', min: 56, max: 112 } } },
      { id: 'ch-c-sub', type: 'text', content: '瞬时速度 / 护盾 78% / 核心温度正常', fontFamily: MONO, fontSize: 22, color: { $t: 'colors.muted' }, textAlign: 'center', letterSpacing: 1, x: 580, y: 788, width: 612, height: 30, zIndex: 4, editable: { content: true } },
      ...[['高度', '3 200 m', 'colors.ink'], ['护盾', '78 %', 'colors.accent'], ['核心温', '42 ℃', 'colors.accent3']].map((c, i) => {
        const x = 632 + i * 174
        return [
          { id: `ch-c-cell-l-${i}`, type: 'text', content: c[0] as string, fontFamily: MONO, fontSize: 18, color: { $t: 'colors.muted' }, x, y: 852, width: 150, height: 24, zIndex: 4 },
          { id: `ch-c-cell-v-${i}`, type: 'text', content: c[1] as string, fontFamily: MONO, fontSize: 32, fontWeight: '700', color: { $t: c[2] as string } as any, x, y: 880, width: 150, height: 42, zIndex: 4, editable: { content: true } },
          { id: `ch-c-cell-b-${i}`, type: 'shape', shapeKind: 'rect', x, y: 930, width: 132, height: 2, fill: { $t: c[2] as string } as any, opacity: 0.5, zIndex: 4, animation: { name: 'slideInLeft', duration: 700, delay: 500 + i * 120 } }
        ]
      }).flat() as any,
      // ── 右：扫描阵列
      { id: 'ch-r-panel', type: 'shape', shapeKind: 'rect', x: 1364, y: 152, width: 512, height: 424, fill: { $t: 'colors.panel' }, opacity: 0.5, border: { width: 1, color: { $t: 'colors.line' } }, zIndex: 2, animation: { name: 'fadeInUp', duration: 700, delay: 200 } },
      { id: 'ch-r-title', type: 'text', content: '扫描阵列 / SCAN ARRAY', fontFamily: { $t: 'fonts.heading' }, fontSize: 26, fontWeight: '800', color: { $t: 'colors.accent' }, letterSpacing: 2, x: 1392, y: 174, width: 448, height: 34, zIndex: 4, editable: { content: true } },
      { id: 'ch-r-ring-1', group: 'ch-r-ring-', type: 'shape', shapeKind: 'circle', x: 1520, y: 250, width: 200, height: 200, border: { width: 1.5, style: 'dashed', color: { $t: 'colors.accent' } }, opacity: 0.45, zIndex: 3, animation: { name: 'spinSlow', duration: 12000, iterationCount: 'infinite', easing: 'linear' } },
      { id: 'ch-r-ring-2', group: 'ch-r-ring-', type: 'shape', shapeKind: 'circle', x: 1552, y: 282, width: 136, height: 136, border: { width: 1, color: { $t: 'colors.line' } }, opacity: 0.9, zIndex: 3 },
      { id: 'ch-r-ring-3', group: 'ch-r-ring-', type: 'shape', shapeKind: 'circle', x: 1584, y: 314, width: 72, height: 72, fill: { $t: 'colors.accent' }, opacity: 0.08, zIndex: 3, animation: { name: 'pulse', duration: 2800, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'ch-r-sweep', type: 'shape', shapeKind: 'rect', x: 1618, y: 250, width: 3, height: 200, fill: { $t: 'colors.accent' }, opacity: 0.5, zIndex: 3, shadow: { color: { $t: 'colors.accent' }, blur: 14, offsetX: 0, offsetY: 0 }, animation: { name: 'spinSlow', duration: 4200, iterationCount: 'infinite', easing: 'linear' } },
      { id: 'ch-r-cross-h', type: 'shape', shapeKind: 'rect', x: 1520, y: 349, width: 200, height: 1.5, fill: { $t: 'colors.line' }, zIndex: 3 },
      { id: 'ch-r-cross-v', type: 'shape', shapeKind: 'rect', x: 1619, y: 250, width: 1.5, height: 200, fill: { $t: 'colors.line' }, zIndex: 3 },
      ...[[1566, 300, 'colors.accent2', 10], [1664, 380, 'colors.accent3', 9], [1590, 406, 'colors.accent2', 8], [1656, 288, 'colors.accent', 7]].map((b, i) => (
        { id: `ch-r-blip-${i}`, type: 'shape', shapeKind: 'circle', x: b[0] as number, y: b[1] as number, width: b[3] as number, height: b[3] as number, fill: { $t: b[2] as string } as any, zIndex: 4, shadow: { color: { $t: b[2] as string } as any, blur: 12, offsetX: 0, offsetY: 0 }, animation: { name: 'twinkle', duration: 2200 + i * 300, delay: 300 + i * 420, iterationCount: 'infinite' } }
      )) as any,
      ...[['未知飞行体 · 02', '方位 041°', 'colors.accent2'], ['友军机 · ALPHA', '方位 118°', 'colors.accent'], ['回波杂讯 · 07', '方位 275°', 'colors.muted']].map((r, i) => {
        const y = 476 + i * 32
        return [
          { id: `ch-r-tag-${i}`, type: 'shape', shapeKind: 'circle', x: 1392, y: y + 7, width: 9, height: 9, fill: { $t: r[2] as string } as any, zIndex: 4 },
          { id: `ch-r-row-${i}`, type: 'text', content: r[0] as string, fontFamily: MONO, fontSize: 18, color: { $t: 'colors.ink' }, x: 1416, y, width: 260, height: 26, zIndex: 4, editable: { content: true } },
          { id: `ch-r-rowv-${i}`, type: 'text', content: r[1] as string, fontFamily: MONO, fontSize: 18, color: { $t: r[2] as string } as any, textAlign: 'right', x: 1620, y, width: 216, height: 26, zIndex: 4, editable: { content: true } }
        ]
      }).flat() as any,
      // ── 右下：系统日志
      { id: 'ch-r2-panel', type: 'shape', shapeKind: 'rect', x: 1364, y: 604, width: 512, height: 236, fill: { $t: 'colors.panel' }, opacity: 0.5, border: { width: 1, color: { $t: 'colors.line' } }, zIndex: 2, animation: { name: 'fadeInUp', duration: 700, delay: 380 } },
      { id: 'ch-r2-title', type: 'text', content: '系统日志 / LOG', fontFamily: { $t: 'fonts.heading' }, fontSize: 26, fontWeight: '800', color: { $t: 'colors.accent3' }, letterSpacing: 2, x: 1392, y: 622, width: 400, height: 34, zIndex: 4, editable: { content: true } },
      ...[['[00:41:02] 链路抖动 +2ms', 'colors.muted'], ['[00:40:58] 护盾重校准完成', 'colors.muted'], ['[00:40:41] 锁定 T-0417', 'colors.accent'], ['[00:40:12] 右舷装甲侵蚀 22%', 'colors.accent2'], ['[00:39:57] 燃料混合比修正', 'colors.muted']].map((r, i) => (
        { id: `ch-r2-line-${i}`, type: 'text', content: r[0] as string, fontFamily: MONO, fontSize: 18, color: { $t: r[1] as string } as any, opacity: i === 3 ? 1 : 0.8, x: 1392, y: 668 + i * 32, width: 448, height: 26, zIndex: 4, editable: { content: true }, animation: { name: 'slideInRight', duration: 520, delay: 480 + i * 110 } }
      )) as any,
      { id: 'ch-r2-cursor', type: 'shape', shapeKind: 'rect', x: 1392, y: 830, width: 16, height: 2, fill: { $t: 'colors.accent3' }, zIndex: 4, animation: { name: 'blink', duration: 900, iterationCount: 'infinite', easing: 'steps(1)' } },
      // ── 底部频谱带
      { id: 'ch-b-lab', type: 'text', content: '频谱 / SPECTRUM 12.8 GHz', fontFamily: MONO, fontSize: 18, color: { $t: 'colors.muted' }, letterSpacing: 2, x: 72, y: 936, width: 420, height: 26, zIndex: 4, editable: { content: true } },
      { id: 'ch-b-panel', type: 'shape', shapeKind: 'rect', x: 44, y: 968, width: 1832, height: 60, fill: { $t: 'colors.panel' }, opacity: 0.55, border: { width: 1, color: { $t: 'colors.line' } }, zIndex: 2 },
      { id: 'ch-b-base', type: 'shape', shapeKind: 'rect', x: 60, y: 1014, width: 1732, height: 1.5, fill: { $t: 'colors.line' }, zIndex: 3 },
      ...(() => { const rnd = seeded(20771); return Array.from({ length: 44 }, (_, i) => {
        const h = 8 + Math.round(rnd() * 38)
        return { id: `ch-b-bar-${i}`, type: 'shape', shapeKind: 'rect', x: 60 + i * 38, y: 1014 - h, width: 22, height: h, fill: { $t: i % 7 === 3 ? 'colors.accent2' : i % 5 === 2 ? 'colors.accent3' : 'colors.accent' }, opacity: 0.35 + rnd() * 0.55, zIndex: 4, animation: { name: 'pulse', duration: 900 + Math.round(rnd() * 1400), delay: i * 34, iterationCount: 'infinite', easing: 'ease-in-out' } }
      }) })() as any,
      { id: 'ch-b-right', type: 'text', content: '采样 44 / 窗口 2.4 s', fontFamily: MONO, fontSize: 18, color: { $t: 'colors.muted' }, textAlign: 'right', x: 1500, y: 936, width: 348, height: 26, zIndex: 4, editable: { content: true } },
      // ── 顶层 CRT
      { id: 'ch-scan', type: 'overlay', background: SCAN, x: 0, y: 0, width: 1920, height: 1080, mixBlendMode: 'screen', zIndex: 8 },
      { id: 'ch-vignette', type: 'overlay', background: VIGNETTE, x: 0, y: 0, width: 1920, height: 1080, zIndex: 8 },
      { id: 'ch-grain', type: 'overlay', x: 0, y: 0, width: 1920, height: 1080, background: `url("${grain(300, 17, 0.85)}")`, opacity: 0.12, mixBlendMode: 'overlay', zIndex: 9 }
    ]
  },
  {
    id: 'cyberpunk-glitch-record', name: '故障艺术唱片', version: '1.0.0', category: 'cyberpunk',
    tags: ['cyberpunk', 'glitch', 'vinyl', 'album', '1:1', '高信息密度'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%2307040F"/><circle cx="62" cy="42" r="26" fill="none" stroke="%23A855F7" stroke-width="1.4"/><circle cx="62" cy="42" r="8" fill="%2322D3EE"/><rect x="10" y="20" width="34" height="5" fill="%23F472B6"/><rect x="10" y="30" width="24" height="3" fill="%2322D3EE"/><rect x="8" y="46" width="40" height="2" fill="%23A855F7"/></svg>',
    tokens: {
      colors: {
        bg: { label: '封套底', default: '#07040F', options: ['#07040F', '#0B0409', '#04080E', '#0D0A04', '#000000'] },
        panel: { label: '纸白区', default: '#150C26', options: ['#150C26', '#1E0B14', '#0B1622', '#1C1608', '#111111'] },
        ink: { label: '主字色', default: '#F2ECFF', options: ['#F2ECFF', '#FFEAF2', '#E8F4FF', '#FFF6DE', '#FFFFFF'] },
        muted: { label: '弱字色', default: '#9C86BF', options: ['#9C86BF', '#B98091', '#7E9AAE', '#B79C6A', '#8A8A8A'] },
        line: { label: '纹路', default: '#2C1C4A', options: ['#2C1C4A', '#43172A', '#17303F', '#3B2E12', '#242424'] },
        accent: { label: '主霓虹', default: '#A855F7', options: ['#A855F7', '#F472B6', '#22D3EE', '#FFD166', '#7C3AED'] },
        accent2: { label: '标签色', default: '#22D3EE', options: ['#22D3EE', '#FF2D78', '#A3E635', '#FFB020', '#38BDF8'] },
        accent3: { label: '错位条', default: '#F472B6', options: ['#F472B6', '#FFD166', '#F87171', '#4ADE80', '#FFFFFF'] }
      },
      fonts: { heading: { label: '标题字体', default: HEAD, options: [HEAD, MONO, HEI] } }
    },
    presets: [
      { name: '紫电压片', colors: { bg: '#07040F', panel: '#150C26', ink: '#F2ECFF', muted: '#9C86BF', line: '#2C1C4A', accent: '#A855F7', accent2: '#22D3EE', accent3: '#F472B6' } },
      { name: '血橙噪点', colors: { bg: '#0B0409', panel: '#1E0B14', ink: '#FFEAF2', muted: '#B98091', line: '#43172A', accent: '#F472B6', accent2: '#FF2D78', accent3: '#FFD166' } },
      { name: '冰蓝首版', colors: { bg: '#04080E', panel: '#0B1622', ink: '#E8F4FF', muted: '#7E9AAE', line: '#17303F', accent: '#22D3EE', accent2: '#A3E635', accent3: '#F87171' } },
      { name: '酸性黄斑', colors: { bg: '#0D0A04', panel: '#1C1608', ink: '#FFF6DE', muted: '#B79C6A', line: '#3B2E12', accent: '#FFD166', accent2: '#FFB020', accent3: '#4ADE80' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1080, defaultWidth: 1080, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      // ── 氛围层
      { id: 'gr-mesh', type: 'overlay', background: MESH, x: 0, y: 0, width: 1080, height: 1080, opacity: 0.5, zIndex: 1 },
      { id: 'gr-bg-num', type: 'text', content: 'A', fontFamily: { $t: 'fonts.heading' }, fontSize: 240, fontWeight: '900', color: { $t: 'colors.accent' }, opacity: 0.06, x: 60, y: 360, width: 260, height: 260, zIndex: 1 },
      { id: 'gr-glow-1', type: 'shape', shapeKind: 'circle', x: 606, y: 254, width: 340, height: 340, fill: { $t: 'colors.accent' }, opacity: 0.08, zIndex: 1, shadow: { color: { $t: 'colors.accent' }, blur: 80, offsetX: 0, offsetY: 0 }, animation: { name: 'pulse', duration: 5200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      // ── 黑胶：唱纹环 + 标签 + 主轴
      ...Array.from({ length: 20 }, (_, i) => {
        const r = 128 + i * 7.4
        return { id: `gr-groove-${i}`, type: 'shape', shapeKind: 'circle', x: 776 - r, y: 424 - r, width: r * 2, height: r * 2, border: { width: i % 4 === 0 ? 1.6 : 1, color: { $t: 'colors.line' } }, opacity: i % 4 === 0 ? 0.95 : 0.6, zIndex: 2 }
      }) as any,
      { id: 'gr-edge', type: 'shape', shapeKind: 'circle', x: 500, y: 148, width: 552, height: 552, border: { width: 2, color: { $t: 'colors.accent' } }, opacity: 0.55, zIndex: 3, shadow: { color: { $t: 'colors.accent' }, blur: 18, offsetX: 0, offsetY: 0 } },
      { id: 'gr-ripple-1', type: 'shape', shapeKind: 'circle', x: 646, y: 294, width: 260, height: 260, border: { width: 1.5, color: { $t: 'colors.accent2' } }, opacity: 0.5, zIndex: 3, animation: { name: 'ripple', duration: 3400, iterationCount: 'infinite', easing: 'ease-out' } },
      { id: 'gr-ripple-2', type: 'shape', shapeKind: 'circle', x: 646, y: 294, width: 260, height: 260, border: { width: 1.5, color: { $t: 'colors.accent' } }, opacity: 0.5, zIndex: 3, animation: { name: 'ripple', duration: 3400, delay: 1700, iterationCount: 'infinite', easing: 'ease-out' } },
      { id: 'gr-dashed', type: 'shape', shapeKind: 'circle', x: 596, y: 244, width: 360, height: 360, border: { width: 1.5, style: 'dashed', color: { $t: 'colors.accent2' } }, opacity: 0.4, zIndex: 3, animation: { name: 'spinSlow', duration: 9000, iterationCount: 'infinite', easing: 'linear' } },
      { id: 'gr-shine', type: 'shape', shapeKind: 'rect', x: 596, y: 384, width: 380, height: 96, fill: 'rgba(255,255,255,0.07)', rotation: -34, zIndex: 3 },
      { id: 'gr-label', type: 'shape', shapeKind: 'circle', x: 684, y: 332, width: 184, height: 184, fill: { $t: 'colors.accent2' }, opacity: 0.9, zIndex: 4 },
      { id: 'gr-label-t', type: 'text', content: 'A 面 · 33⅓\nNEON STATIC', fontFamily: MONO, fontSize: 18, fontWeight: '700', color: 'rgba(0,0,0,0.8)', textAlign: 'center', lineHeight: 1.45, x: 690, y: 392, width: 172, height: 64, zIndex: 5, editable: { content: true } },
      { id: 'gr-spindle', type: 'shape', shapeKind: 'circle', x: 766, y: 414, width: 20, height: 20, fill: { $t: 'colors.bg' }, zIndex: 5 },
      // ── 唱臂
      { id: 'gr-arm', type: 'shape', shapeKind: 'rect', x: 751, y: 321, width: 312, height: 5, fill: { $t: 'colors.muted' }, opacity: 0.9, rotation: 125, zIndex: 4, animation: { name: 'wobble', duration: 5200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'gr-arm-pivot', type: 'shape', shapeKind: 'circle', x: 972, y: 172, width: 48, height: 48, border: { width: 2, color: { $t: 'colors.accent' } }, fill: { $t: 'colors.panel' }, opacity: 0.95, zIndex: 4 },
      { id: 'gr-arm-head', type: 'shape', shapeKind: 'circle', x: 810, y: 444, width: 16, height: 16, fill: { $t: 'colors.accent2' }, zIndex: 5, shadow: { color: { $t: 'colors.accent2' }, blur: 16, offsetX: 0, offsetY: 0 }, animation: { name: 'twinkle', duration: 2600, iterationCount: 'infinite' } },
      // ── 错位切片条（故障感：drift + blink 叠加）
      ...[[512, 262, 512, 16, 'colors.accent', 0.2, 'drift', 5200, 0], [596, 300, 430, 6, 'colors.accent3', 0.35, 'drift', 3800, 400], [540, 470, 500, 12, 'colors.accent2', 0.22, 'slideInRight', 620, 260], [620, 520, 400, 5, 'colors.accent', 0.42, 'blink', 2600, 0], [480, 596, 540, 20, 'colors.accent3', 0.12, 'drift', 6600, 200], [700, 188, 300, 8, 'colors.accent2', 0.3, 'fadeIn', 500, 420], [466, 664, 520, 4, 'colors.accent', 0.5, 'drift', 4400, 600]].map((s, i) => (
        { id: `gr-slice-${i}`, type: 'shape', shapeKind: 'rect', x: s[0] as number, y: s[1] as number, width: s[2] as number, height: s[3] as number, fill: { $t: s[4] as string } as any, opacity: s[5] as number, zIndex: 6, animation: { name: s[6] as any, duration: s[7] as number, delay: s[8] as number, iterationCount: (s[6] === 'drift' || s[6] === 'blink') ? 'infinite' : undefined, easing: s[6] === 'blink' ? 'steps(1)' : 'ease-in-out' } }
      )) as any,
      // ── 左上：RGB 分离标题
      { id: 'gr-kicker', type: 'text', content: 'LP-013 · 压片 500 张 · 33⅓ RPM', fontFamily: MONO, fontSize: 18, color: { $t: 'colors.accent2' }, letterSpacing: 3, x: 76, y: 148, width: 440, height: 26, zIndex: 5, editable: { content: true }, animation: { name: 'fadeIn', duration: 500, delay: 120 } },
      { id: 'gr-title-echo-a', type: 'text', content: '霓虹断层', fontFamily: { $t: 'fonts.heading' }, fontSize: 96, fontWeight: '900', color: { $t: 'colors.accent' }, letterSpacing: 2, x: 64, y: 184, width: 480, height: 116, zIndex: 5, opacity: 0.85 },
      { id: 'gr-title-echo-b', type: 'text', content: '霓虹断层', fontFamily: { $t: 'fonts.heading' }, fontSize: 96, fontWeight: '900', color: { $t: 'colors.accent3' }, letterSpacing: 2, x: 88, y: 200, width: 480, height: 116, zIndex: 5, opacity: 0.7, animation: { name: 'drift', duration: 4600, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'gr-title', type: 'text', content: '霓虹断层', fontFamily: { $t: 'fonts.heading' }, fontSize: 96, fontWeight: '900', color: { $t: 'colors.ink' }, letterSpacing: 2, x: 76, y: 192, width: 480, height: 116, zIndex: 6, shadow: { color: { $t: 'colors.accent2' }, blur: 26, offsetX: 0, offsetY: 0 }, animation: { name: 'glow', duration: 3600, iterationCount: 'infinite', easing: 'ease-in-out' }, editable: { content: true, fontSize: { type: 'range', min: 56, max: 112 } } },
      { id: 'gr-sub', type: 'text', content: 'NEON FAULT // SIDE A · 立体声', fontFamily: MONO, fontSize: 22, color: { $t: 'colors.ink' }, letterSpacing: 4, x: 76, y: 320, width: 480, height: 30, zIndex: 5, editable: { content: true }, animation: { name: 'fadeInUp', duration: 600, delay: 320 } },
      { id: 'gr-credit', type: 'text', content: '录音 / 混音：叁一〇工作室　母带：K. Aoki', fontFamily: MONO, fontSize: 18, color: { $t: 'colors.muted' }, x: 76, y: 356, width: 480, height: 26, zIndex: 5, editable: { content: true } },
      // ── 左中：规格 + 播放块
      { id: 'gr-sec', type: 'text', content: '压片规格 / SPEC', fontFamily: { $t: 'fonts.heading' }, fontSize: 28, fontWeight: '800', color: { $t: 'colors.accent' }, letterSpacing: 2, x: 76, y: 412, width: 360, height: 38, zIndex: 5, editable: { content: true } },
      { id: 'gr-sec-rule', type: 'shape', shapeKind: 'rect', x: 76, y: 456, width: 380, height: 1.5, fill: { $t: 'colors.line' }, zIndex: 4 },
      ...[['转速', '33⅓ RPM'], ['净重', '180 g'], ['时长', '2 × 45 min'], ['版次', '首版 500 张']].map((r, i) => {
        const y = 476 + i * 40
        return [
          { id: `gr-spec-l-${i}`, type: 'text', content: r[0] as string, fontFamily: MONO, fontSize: 18, color: { $t: 'colors.muted' }, x: 76, y, width: 160, height: 26, zIndex: 5, editable: { content: true } },
          { id: `gr-spec-v-${i}`, type: 'text', content: r[1] as string, fontFamily: MONO, fontSize: 22, fontWeight: '700', color: { $t: 'colors.ink' }, textAlign: 'right', x: 236, y: y - 2, width: 220, height: 30, zIndex: 5, editable: { content: true } },
          { id: `gr-spec-d-${i}`, type: 'shape', shapeKind: 'rect', x: 76, y: y + 32, width: 380, height: 1, fill: { $t: 'colors.line' }, opacity: 0.65, zIndex: 4 }
        ]
      }).flat() as any,
      { id: 'gr-play', type: 'shape', shapeKind: 'rect', x: 76, y: 644, width: 196, height: 52, border: { width: 1.5, color: { $t: 'colors.accent2' } }, fill: { $t: 'colors.accent2' }, opacity: 0.16, zIndex: 4, animation: { name: 'pulse', duration: 2400, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'gr-play-t', type: 'text', content: 'PLAY ▶ 24bit', fontFamily: MONO, fontSize: 22, fontWeight: '700', color: { $t: 'colors.accent2' }, textAlign: 'center', letterSpacing: 2, x: 76, y: 656, width: 196, height: 30, zIndex: 5, editable: { content: true } },
      { id: 'gr-side', type: 'shape', shapeKind: 'rect', x: 288, y: 644, width: 168, height: 52, border: { width: 1, style: 'dashed', color: { $t: 'colors.accent3' } }, opacity: 0.8, zIndex: 4 },
      { id: 'gr-side-t', type: 'text', content: 'GATEKEEP 01', fontFamily: MONO, fontSize: 18, color: { $t: 'colors.accent3' }, textAlign: 'center', letterSpacing: 2, x: 288, y: 658, width: 168, height: 26, zIndex: 5, editable: { content: true } },
      // ── 右上：条码 + 编号
      ...(() => { const rnd = seeded(90210); let cx = 848; const out: any[] = []
        for (let i = 0; i < 22 && cx < 1036; i++) { const w = 1 + Math.round(rnd() * 5); out.push({ id: `gr-bar-${i}`, type: 'shape', shapeKind: 'rect', x: cx, y: 76, width: w, height: 42, fill: { $t: 'colors.ink' }, opacity: 0.5 + rnd() * 0.45, zIndex: 4, animation: { name: 'fadeIn', duration: 380, delay: 200 + i * 26 } }); cx += w + 2 + Math.round(rnd() * 4) }
        return out })() as any,
      { id: 'gr-cat', type: 'text', content: 'CAT. NF-013 / 2077', fontFamily: MONO, fontSize: 18, color: { $t: 'colors.muted' }, textAlign: 'right', letterSpacing: 2, x: 800, y: 124, width: 240, height: 26, zIndex: 5, editable: { content: true } },
      // ── 底部：曲目表
      { id: 'gr-tr-title', type: 'text', content: '曲目 / TRACKLIST', fontFamily: { $t: 'fonts.heading' }, fontSize: 28, fontWeight: '800', color: { $t: 'colors.ink' }, letterSpacing: 2, x: 76, y: 716, width: 380, height: 38, zIndex: 5, editable: { content: true } },
      { id: 'gr-tr-rule', type: 'shape', shapeKind: 'rect', x: 76, y: 762, width: 956, height: 1.5, fill: { $t: 'colors.accent' }, opacity: 0.55, zIndex: 4, animation: { name: 'slideInLeft', duration: 800, delay: 260 } },
      { id: 'gr-tr-div', type: 'shape', shapeKind: 'rect', x: 552, y: 786, width: 1.5, height: 214, fill: { $t: 'colors.line' }, zIndex: 4 },
      ...[['A1', '霓虹断层', "4'12", 'A2', '静止雨', "3'48", 'A3', '静电舞池', "5'03", 'A4', '钢与釉', "4'40", 'A5', '夜航终止', "6'15"], ['B1', '锈蚀天使', "5'21", 'B2', '玻璃教堂', "4'08", 'B3', '二重曝光', "3'55", 'B4', '铜色月光', "5'44", 'B5', '余震', "7'02"]].map((col, c) => {
        return [0, 1, 2, 3, 4].map(k => {
          const y = 790 + k * 44, ox = c * 484
          return [
            { id: `gr-tr-n-${c}-${k}`, type: 'text', content: col[k * 3] as string, fontFamily: MONO, fontSize: 18, fontWeight: '700', color: { $t: c ? 'colors.accent2' : 'colors.accent' } as any, textAlign: 'center', x: 76 + ox, y, width: 26, height: 26, zIndex: 5 },
            { id: `gr-tr-t-${c}-${k}`, type: 'text', content: col[k * 3 + 1] as string, fontFamily: HEI, fontSize: 22, color: { $t: 'colors.ink' } as any, x: 112 + ox, y: y - 2, width: 320, height: 30, zIndex: 5, editable: { content: true }, animation: { name: c ? 'slideInRight' : 'fadeIn', duration: 460, delay: 380 + k * 90 + c * 120 } },
            { id: `gr-tr-d-${c}-${k}`, type: 'text', content: col[k * 3 + 2] as string, fontFamily: MONO, fontSize: 18, color: { $t: 'colors.muted' } as any, textAlign: 'right', x: 388 + ox, y, width: 56, height: 26, zIndex: 5 }
          ]
        }).flat()
      }).flat() as any,
      // ── 顶层 CRT
      { id: 'gr-scan', type: 'overlay', background: SCAN, x: 0, y: 0, width: 1080, height: 1080, mixBlendMode: 'screen', opacity: 0.8, zIndex: 8 },
      { id: 'gr-vignette', type: 'overlay', background: 'radial-gradient(82% 72% at 62% 42%, rgba(0,0,0,0) 46%, rgba(0,0,0,0.72) 100%)', x: 0, y: 0, width: 1080, height: 1080, zIndex: 8 },
      { id: 'gr-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1080, background: `url("${grain(280, 41, 0.9)}")`, opacity: 0.14, mixBlendMode: 'overlay', zIndex: 9 }
    ]
  }
]

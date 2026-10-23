// src/core/templates/scifi/scifi-hud.ts —— 重 HUD·赛博批（电路板爆炸拆解 4:5 ／ 终端监控墙 9:16）
// 口径：拆解层与图表全部由 rect+circle 拼装、实色走 token（换预设＝整机换色）；
//       氛围层（网格/扫描线/暗角/噪点/剖线填充）为中性 rgba，允许写死；发光靠 shadow.blur + glow/twinkle 动画。
import type { Template } from '@/types/types'
import {MONO, HEI, grain} from '../_fx/trend'
import { seeded01 } from '../_fx/common'

const seeded = seeded01

/** 归一化伪随机：返回 0..1（trend 里的 seeded 是原始整数，别混用） */

const HEAD = '"Arial Black", Impact, "PingFang SC", "Microsoft YaHei", sans-serif'
const MESH = 'repeating-linear-gradient(0deg, rgba(150,220,255,0.05) 0px, rgba(150,220,255,0.05) 1px, rgba(0,0,0,0) 1px, rgba(0,0,0,0) 44px), repeating-linear-gradient(90deg, rgba(150,220,255,0.05) 0px, rgba(150,220,255,0.05) 1px, rgba(0,0,0,0) 1px, rgba(0,0,0,0) 44px)'
const SCAN = 'repeating-linear-gradient(0deg, rgba(205,240,255,0.055) 0px, rgba(205,240,255,0.055) 1px, rgba(0,0,0,0) 1px, rgba(0,0,0,0) 4px)'

export const scifiHudTemplates: Template[] = [
  {
    id: 'scifi-circuit-explode', name: '电路板爆炸拆解', version: '1.0.0', category: 'scifi',
    tags: ['scifi', 'exploded-view', 'pcb', 'blueprint', '4:5', '高信息密度'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23040A10"/><g fill="none" stroke="%2338BDF8" stroke-width="1.6"><rect x="24" y="18" width="52" height="10"/><rect x="30" y="38" width="40" height="12"/><rect x="16" y="60" width="68" height="14"/></g><rect x="49" y="12" width="2" height="70" fill="%23A3E635" opacity="0.5"/><rect x="60" y="21" width="26" height="2" fill="%23F472B6"/></svg>',
    tokens: {
      colors: {
        bg: { label: '图纸底', default: '#040A10', options: ['#040A10', '#0A0510', '#050D0A', '#100A04', '#080810'] },
        panel: { label: '面板底', default: '#0A1522', options: ['#0A1522', '#150B20', '#0B1A14', '#1A1308', '#101018'] },
        ink: { label: '主字色', default: '#E6F6FF', options: ['#E6F6FF', '#F3E9FF', '#E8FFF3', '#FFF3DE', '#EDEDED'] },
        muted: { label: '弱字色', default: '#7CA0B6', options: ['#7CA0B6', '#A48FB8', '#84A994', '#B79C6A', '#9A9A9A'] },
        line: { label: '描线', default: '#1B3348', options: ['#1B3348', '#2E1F42', '#1D3A2C', '#3B2E12', '#26262E'] },
        accent: { label: '结构线', default: '#38BDF8', options: ['#38BDF8', '#A855F7', '#34D399', '#F59E0B', '#94A3B8'] },
        accent2: { label: '标注色', default: '#A3E635', options: ['#A3E635', '#F472B6', '#FBBF24', '#22D3EE', '#FB7185'] },
        accent3: { label: '强调色', default: '#F472B6', options: ['#F472B6', '#FBBF24', '#22D3EE', '#A3E635', '#F87171'] }
      },
      fonts: { heading: { label: '标题字体', default: HEAD, options: [HEAD, MONO, HEI] } }
    },
    presets: [
      { name: '冷蓝工程', colors: { bg: '#040A10', panel: '#0A1522', ink: '#E6F6FF', muted: '#7CA0B6', line: '#1B3348', accent: '#38BDF8', accent2: '#A3E635', accent3: '#F472B6' } },
      { name: '紫晶实验', colors: { bg: '#0A0510', panel: '#150B20', ink: '#F3E9FF', muted: '#A48FB8', line: '#2E1F42', accent: '#A855F7', accent2: '#F472B6', accent3: '#FBBF24' } },
      { name: '青绿固件', colors: { bg: '#050D0A', panel: '#0B1A14', ink: '#E8FFF3', muted: '#84A994', line: '#1D3A2C', accent: '#34D399', accent2: '#FBBF24', accent3: '#22D3EE' } },
      { name: '暖铜复刻', colors: { bg: '#100A04', panel: '#1A1308', ink: '#FFF3DE', muted: '#B79C6A', line: '#3B2E12', accent: '#F59E0B', accent2: '#22D3EE', accent3: '#A3E635' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      // ── 氛围
      { id: 'ce-mesh', type: 'overlay', background: MESH, x: 0, y: 0, width: 1080, height: 1350, opacity: 0.8, zIndex: 1 },
      { id: 'ce-glow-1', type: 'shape', shapeKind: 'circle', x: 240, y: 430, width: 340, height: 340, fill: { $t: 'colors.accent' }, opacity: 0.06, zIndex: 1, shadow: { color: { $t: 'colors.accent' }, blur: 70, offsetX: 0, offsetY: 0 }, animation: { name: 'pulse', duration: 5600, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'ce-glow-2', type: 'shape', shapeKind: 'circle', x: 300, y: 700, width: 220, height: 220, fill: { $t: 'colors.accent2' }, opacity: 0.05, zIndex: 1, animation: { name: 'float', duration: 9000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      // ── 页眉
      { id: 'ce-kicker', type: 'text', content: 'EXPLODED VIEW · 装配分解 / 编号 NF-06', fontFamily: MONO, fontSize: 22, color: { $t: 'colors.accent2' }, letterSpacing: 3, x: 76, y: 78, width: 620, height: 30, zIndex: 5, editable: { content: true }, animation: { name: 'fadeIn', duration: 500 } },
      { id: 'ce-title', type: 'text', content: '模块拆解图', fontFamily: { $t: 'fonts.heading' }, fontSize: 72, fontWeight: '900', color: { $t: 'colors.ink' }, letterSpacing: 3, x: 76, y: 112, width: 500, height: 92, zIndex: 5, shadow: { color: { $t: 'colors.accent' }, blur: 26, offsetX: 0, offsetY: 0 }, animation: { name: 'glow', duration: 4200, iterationCount: 'infinite', easing: 'ease-in-out' }, editable: { content: true, fontSize: { type: 'range', min: 44, max: 84 } } },
      { id: 'ce-meta', type: 'text', content: '投影：第一角 / 单位 mm / 比例 1:4', fontFamily: MONO, fontSize: 18, color: { $t: 'colors.muted' }, x: 76, y: 212, width: 480, height: 26, zIndex: 5, editable: { content: true } },
      { id: 'ce-rule', type: 'shape', shapeKind: 'rect', x: 76, y: 250, width: 928, height: 2, fill: { $t: 'colors.accent' }, opacity: 0.5, zIndex: 4, animation: { name: 'slideInLeft', duration: 800, delay: 120 } },
      // ── 右上：三个统计
      ...[['5 件', '拆解层数'], ['0.4 mm', '层间隙'], ['142 g', '组件总重']].map((s, i) => {
        const y = 82 + i * 56
        return [
          { id: `ce-st-v-${i}`, type: 'text', content: s[0], fontFamily: MONO, fontSize: 28, fontWeight: '700', color: { $t: i === 1 ? 'colors.accent3' : 'colors.accent' } as any, x: 738, y, width: 200, height: 36, zIndex: 5, editable: { content: true } },
          { id: `ce-st-l-${i}`, type: 'text', content: s[1], fontFamily: MONO, fontSize: 18, color: { $t: 'colors.muted' } as any, x: 738, y: y + 32, width: 200, height: 24, zIndex: 5 }
        ]
      }).flat() as any,
      // ── 中缝轴线（虚线）+ 扫描条
      ...Array.from({ length: 16 }, (_, i) => (
        { id: `ce-axis-${i}`, type: 'shape', shapeKind: 'rect', x: 398, y: 268 + i * 44, width: 4, height: 14, fill: { $t: 'colors.accent' }, opacity: 0.32, zIndex: 2 }
      )) as any,
      { id: 'ce-scan', type: 'shape', shapeKind: 'rect', x: 130, y: 560, width: 540, height: 3, fill: { $t: 'colors.accent2' }, opacity: 0.45, zIndex: 6, shadow: { color: { $t: 'colors.accent2' }, blur: 16, offsetX: 0, offsetY: 0 }, animation: { name: 'float', duration: 5200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      // ── 五层爆炸体（几何拼装，颜色全跟 token）
      { id: 'ce-l0', group: 'ce-l', type: 'shape', shapeKind: 'rect', x: 200, y: 262, width: 400, height: 96, fill: { $t: 'colors.panel' }, opacity: 0.92, border: { width: 2, color: { $t: 'colors.accent' } }, borderRadius: 4, zIndex: 3, animation: { name: 'slideInLeft', duration: 700, delay: 160 } },
      ...Array.from({ length: 7 }, (_, i) => (
        { id: `ce-l0-slot-${i}`, type: 'shape', shapeKind: 'rect', x: 236 + i * 46, y: 292, width: 30, height: 8, fill: { $t: 'colors.accent' }, opacity: 0.45, zIndex: 4 }
      )) as any,
      { id: 'ce-l1', group: 'ce-l', type: 'shape', shapeKind: 'rect', x: 290, y: 392, width: 220, height: 108, fill: { $t: 'colors.bg' }, opacity: 0.95, border: { width: 2, color: { $t: 'colors.accent2' } }, borderRadius: 3, zIndex: 3, shadow: { color: { $t: 'colors.accent2' }, blur: 22, offsetX: 0, offsetY: 0 }, animation: { name: 'slideInRight', duration: 700, delay: 260 } },
      { id: 'ce-l1-die', type: 'shape', shapeKind: 'rect', x: 350, y: 422, width: 100, height: 48, fill: { $t: 'colors.accent2' }, opacity: 0.18, zIndex: 4 },
      { id: 'ce-l1-mark', type: 'shape', shapeKind: 'circle', x: 306, y: 406, width: 12, height: 12, fill: { $t: 'colors.accent3' }, zIndex: 4, animation: { name: 'twinkle', duration: 2400, iterationCount: 'infinite' } },
      ...[0, 1, 2, 3, 4, 5, 6].flatMap(k => [
        { id: `ce-l1-pin-l-${k}`, type: 'shape', shapeKind: 'rect', x: 280, y: 404 + k * 14, width: 12, height: 5, fill: { $t: 'colors.accent' }, opacity: 0.7, zIndex: 3 },
        { id: `ce-l1-pin-r-${k}`, type: 'shape', shapeKind: 'rect', x: 508, y: 404 + k * 14, width: 12, height: 5, fill: { $t: 'colors.accent' }, opacity: 0.7, zIndex: 3 }
      ]) as any,
      { id: 'ce-l2', group: 'ce-l', type: 'shape', shapeKind: 'rect', x: 160, y: 534, width: 480, height: 128, fill: { $t: 'colors.panel' }, opacity: 0.95, border: { width: 2, color: { $t: 'colors.accent' } }, borderRadius: 4, zIndex: 3, animation: { name: 'slideInLeft', duration: 700, delay: 360 } },
      ...(() => { const rnd = seeded(6621); return Array.from({ length: 12 }, (_, i) => {
        const col = i % 6, row = Math.floor(i / 6)
        return { id: `ce-l2-pad-${i}`, type: 'shape', shapeKind: 'circle', x: 196 + col * 62, y: 560 + row * 62, width: 14, height: 14, border: { width: 1.5, color: { $t: 'colors.accent2' } }, fill: { $t: 'colors.bg' } as any, opacity: 0.95, zIndex: 4, animation: { name: 'twinkle', duration: 2200 + Math.round(rnd() * 1600), delay: i * 130, iterationCount: 'infinite' } }
      }) })() as any,
      ...[[0, 656, 200, 140], [1, 620, 260, 300], [2, 584, 340, 120]].map(t => (
        { id: `ce-l2-trace-${t[0]}`, type: 'shape', shapeKind: 'rect', x: t[1], y: t[2], width: t[3], height: 2, fill: { $t: 'colors.accent' }, opacity: 0.55, zIndex: 4 }
      )) as any,
      { id: 'ce-l3', group: 'ce-l', type: 'shape', shapeKind: 'rect', x: 180, y: 696, width: 440, height: 100, fill: { $t: 'colors.bg' }, opacity: 0.9, border: { width: 2, color: { $t: 'colors.accent3' } }, borderRadius: 3, zIndex: 3, animation: { name: 'slideInRight', duration: 700, delay: 460 } },
      ...Array.from({ length: 13 }, (_, i) => (
        { id: `ce-l3-fin-${i}`, type: 'shape', shapeKind: 'rect', x: 200 + i * 32, y: 706, width: 8, height: 80, fill: { $t: 'colors.accent3' }, opacity: 0.3, zIndex: 4 }
      )) as any,
      { id: 'ce-l4', group: 'ce-l', type: 'shape', shapeKind: 'rect', x: 150, y: 830, width: 500, height: 112, fill: { $t: 'colors.panel' }, opacity: 0.95, border: { width: 2, color: { $t: 'colors.accent' } }, borderRadius: 6, zIndex: 3, animation: { name: 'fadeInUp', duration: 760, delay: 560 } },
      ...[[178, 858], [622, 858], [178, 914], [622, 914]].map((h, i) => (
        { id: `ce-l4-hole-${i}`, type: 'shape', shapeKind: 'circle', x: h[0], y: h[1], width: 18, height: 18, border: { width: 2, color: { $t: 'colors.muted' } }, opacity: 0.75, zIndex: 4 }
      )) as any,
      { id: 'ce-l4-slot', type: 'shape', shapeKind: 'rect', x: 320, y: 872, width: 160, height: 26, fill: { $t: 'colors.accent' }, opacity: 0.16, border: { width: 1, color: { $t: 'colors.line' } }, borderRadius: 3, zIndex: 4 },
      // ── 右侧引线标注
      ...[[310, 606, '01', '屏蔽罩', 'SHIELD CAN · 铝 6063'], [446, 516, '02', '主控芯片', 'BGA-144 · 12×12'], [598, 646, '03', '六层载板', 'FR-4 · 1.6 mm'], [746, 626, '04', '散热鳍片', '铜芯铝翅 ×12'], [886, 656, '05', '压铸底座', 'ADC12 · 四点定位']].map((c, i) => {
        const cy = c[0] as number, edge = c[1] as number
        return [
          { id: `ce-lead-${i}`, type: 'shape', shapeKind: 'rect', x: edge, y: cy, width: 690 - edge, height: 1.5, fill: { $t: i % 2 ? 'colors.accent2' : 'colors.accent' }, opacity: 0.8, zIndex: 4, animation: { name: 'slideInLeft', duration: 620, delay: 620 + i * 100 } },
          { id: `ce-badge-${i}`, type: 'shape', shapeKind: 'circle', x: 692, y: cy - 15, width: 30, height: 30, border: { width: 1.5, color: { $t: i % 2 ? 'colors.accent2' : 'colors.accent' } }, fill: { $t: 'colors.bg' } as any, opacity: 0.95, zIndex: 5, animation: { name: 'pulse', duration: 3200 + i * 300, delay: i * 200, iterationCount: 'infinite' } },
          { id: `ce-badge-t-${i}`, type: 'text', content: c[2] as string, fontFamily: MONO, fontSize: 18, fontWeight: '700', color: { $t: i % 2 ? 'colors.accent2' : 'colors.accent' } as any, textAlign: 'center', x: 692, y: cy - 8, width: 30, height: 22, zIndex: 6 },
          { id: `ce-note-${i}`, type: 'text', content: c[3] as string, fontFamily: { $t: 'fonts.heading' } as any, fontSize: 26, fontWeight: '800', color: { $t: 'colors.ink' } as any, letterSpacing: 1, x: 738, y: cy - 30, width: 270, height: 34, zIndex: 5, editable: { content: true } },
          { id: `ce-note-s-${i}`, type: 'text', content: c[4] as string, fontFamily: MONO, fontSize: 18, color: { $t: 'colors.muted' } as any, x: 738, y: cy + 8, width: 270, height: 26, zIndex: 5, editable: { content: true } }
        ]
      }).flat() as any,
      // ── 底部物料表
      { id: 'ce-bom', type: 'text', content: '物料清单 / BOM', fontFamily: { $t: 'fonts.heading' }, fontSize: 28, fontWeight: '800', color: { $t: 'colors.ink' }, letterSpacing: 2, x: 76, y: 966, width: 400, height: 38, zIndex: 5, editable: { content: true } },
      { id: 'ce-bom-rule', type: 'shape', shapeKind: 'rect', x: 76, y: 1010, width: 928, height: 1.5, fill: { $t: 'colors.accent' }, opacity: 0.6, zIndex: 4 },
      ...[['部件', '规格 / 材质', '层位', '数量'], ['屏蔽罩', '铝 6063 · 阳极氧化', 'L1', '1'], ['主控芯片', 'BGA-144 · 12×12 mm', 'L2', '1'], ['六层载板', 'FR-4 · 1.6 mm · 沉金', 'L3', '1'], ['散热鳍片', '铜芯铝翅 · 12 片', 'L4', '2'], ['压铸底座', 'ADC12 · 四点定位', 'L5', '1']].map((r, i) => {
        const y = i === 0 ? 1018 : 1046 + (i - 1) * 42, head = i === 0
        return [
          head ? null : { id: `ce-bom-zebra-${i}`, type: 'shape', shapeKind: 'rect', x: 64, y: y - 8, width: 952, height: 38, fill: { $t: 'colors.panel' }, opacity: i % 2 ? 0.75 : 0.35, zIndex: 2 },
          { id: `ce-bom-a-${i}`, type: 'text', content: r[0], fontFamily: head ? MONO : HEI, fontSize: head ? 18 : 22, fontWeight: head ? '700' : '400', color: { $t: head ? 'colors.muted' : 'colors.ink' } as any, letterSpacing: head ? 2 : 0, x: 76, y, width: 240, height: 28, zIndex: 5, editable: { content: true } },
          { id: `ce-bom-b-${i}`, type: 'text', content: r[1], fontFamily: MONO, fontSize: 18, color: { $t: 'colors.muted' } as any, letterSpacing: head ? 2 : 0, x: 352, y, width: 280, height: 28, zIndex: 5, editable: { content: true } },
          { id: `ce-bom-c-${i}`, type: 'text', content: r[2], fontFamily: MONO, fontSize: 18, color: { $t: 'colors.accent' } as any, letterSpacing: head ? 2 : 0, x: 640, y, width: 120, height: 28, zIndex: 5 },
          { id: `ce-bom-d-${i}`, type: 'text', content: r[3], fontFamily: MONO, fontSize: head ? 18 : 22, fontWeight: '700', color: { $t: head ? 'colors.muted' : 'colors.accent2' } as any, textAlign: 'right', letterSpacing: head ? 2 : 0, x: 880, y, width: 124, height: 28, zIndex: 5 }
        ].filter(Boolean)
      }).flat() as any,
      { id: 'ce-foot-rule', type: 'shape', shapeKind: 'rect', x: 76, y: 1264, width: 928, height: 1, fill: { $t: 'colors.line' }, zIndex: 4 },
      { id: 'ce-foot-l', type: 'text', content: '制图 / DFM-03　校对 / R&D 二组　批准 / K. Aoki', fontFamily: MONO, fontSize: 18, color: { $t: 'colors.muted' }, x: 76, y: 1280, width: 640, height: 26, zIndex: 5, editable: { content: true } },
      { id: 'ce-foot-r', type: 'text', content: 'REV. 2.4 / 2077-03-18', fontFamily: MONO, fontSize: 18, color: { $t: 'colors.accent' }, textAlign: 'right', x: 730, y: 1280, width: 274, height: 26, zIndex: 5, editable: { content: true } },
      // ── 四角定位框
      ...[[76, 60, 1, 1], [1004, 60, -1, 1], [76, 1316, 1, -1], [1004, 1316, -1, -1]].map((c, i) => {
        const dx = c[2] as number, dy = c[3] as number
        return { id: `ce-fr-${i}`, type: 'shape', shapeKind: 'rect', x: dx > 0 ? c[0] as number : (c[0] as number) - 4, y: dy > 0 ? c[1] as number : (c[1] as number) - 96, width: 4, height: 96, fill: { $t: 'colors.accent3' }, opacity: 0.7, zIndex: 4, animation: { name: 'fadeIn', duration: 600, delay: 200 + i * 120 } }
      }) as any,
      // ── 顶层
      { id: 'ce-scanline', type: 'overlay', background: SCAN, x: 0, y: 0, width: 1080, height: 1350, mixBlendMode: 'screen', opacity: 0.7, zIndex: 8 },
      { id: 'ce-vig', type: 'overlay', background: 'radial-gradient(92% 70% at 42% 46%, rgba(0,0,0,0) 46%, rgba(0,0,0,0.7) 100%)', x: 0, y: 0, width: 1080, height: 1350, zIndex: 8 },
      { id: 'ce-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1350, background: `url("${grain(280, 29, 0.9)}")`, opacity: 0.12, mixBlendMode: 'overlay', zIndex: 9 }
    ]
  },
  {
    id: 'scifi-terminal-wall', name: '终端监控墙', version: '1.0.0', category: 'scifi',
    tags: ['scifi', 'terminal', 'monitor', 'dashboard', '9:16', '高信息密度'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%2303080D"/><g fill="none" stroke="%2334D399" stroke-width="1.4"><rect x="12" y="14" width="76" height="22"/><rect x="12" y="42" width="76" height="20"/><rect x="12" y="66" width="36" height="22"/><rect x="52" y="66" width="36" height="22"/></g><g fill="%23FBBF24"><circle cx="18" cy="20" r="2"/><circle cx="58" cy="20" r="2"/></g><rect x="16" y="48" width="44" height="2" fill="%2334D399"/></svg>',
    tokens: {
      colors: {
        bg: { label: '机房底', default: '#03080D', options: ['#03080D', '#060410', '#0A0703', '#02100C', '#0A0508'] },
        panel: { label: '窗格底', default: '#081420', options: ['#081420', '#12091C', '#1A1408', '#07180F', '#140A0E'] },
        ink: { label: '主字色', default: '#DFF3EA', options: ['#DFF3EA', '#F0E6FF', '#FFF1D9', '#E2F5FF', '#FFE4EC'] },
        muted: { label: '弱字色', default: '#79A08E', options: ['#79A08E', '#A08FBF', '#B69B6A', '#7FA8BC', '#B08090'] },
        line: { label: '描线', default: '#183427', options: ['#183427', '#2B1D3F', '#3A2C12', '#173245', '#3A1622'] },
        accent: { label: '正常态', default: '#34D399', options: ['#34D399', '#A855F7', '#FFB020', '#22D3EE', '#FB7185'] },
        accent2: { label: '告警态', default: '#FBBF24', options: ['#FBBF24', '#F472B6', '#F87171', '#38BDF8', '#A3E635'] },
        accent3: { label: '强调态', default: '#5EEAD4', options: ['#5EEAD4', '#818CF8', '#F59E0B', '#F472B6', '#4ADE80'] }
      },
      fonts: { heading: { label: '标题字体', default: HEAD, options: [HEAD, MONO, HEI] } }
    },
    presets: [
      { name: '翡翠机房', colors: { bg: '#03080D', panel: '#081420', ink: '#DFF3EA', muted: '#79A08E', line: '#183427', accent: '#34D399', accent2: '#FBBF24', accent3: '#5EEAD4' } },
      { name: '紫罗兰深空', colors: { bg: '#060410', panel: '#12091C', ink: '#F0E6FF', muted: '#A08FBF', line: '#2B1D3F', accent: '#A855F7', accent2: '#F472B6', accent3: '#818CF8' } },
      { name: '琥珀夜班', colors: { bg: '#0A0703', panel: '#1A1408', ink: '#FFF1D9', muted: '#B69B6A', line: '#3A2C12', accent: '#FFB020', accent2: '#F87171', accent3: '#F59E0B' } },
      { name: '冰蓝冷通道', colors: { bg: '#02100C', panel: '#07180F', ink: '#E2F5FF', muted: '#7FA8BC', line: '#173245', accent: '#22D3EE', accent2: '#A3E635', accent3: '#4ADE80' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1920, defaultWidth: 1080, defaultHeight: 1920, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      // ── 氛围
      { id: 'tw-mesh', type: 'overlay', background: MESH, x: 0, y: 0, width: 1080, height: 1920, opacity: 0.75, zIndex: 1 },
      { id: 'tw-glow-1', type: 'shape', shapeKind: 'circle', x: 380, y: 1180, width: 420, height: 420, fill: { $t: 'colors.accent' }, opacity: 0.06, zIndex: 1, shadow: { color: { $t: 'colors.accent' }, blur: 80, offsetX: 0, offsetY: 0 }, animation: { name: 'pulse', duration: 6200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'tw-sweep', type: 'shape', shapeKind: 'rect', x: 64, y: 700, width: 952, height: 4, fill: { $t: 'colors.accent' }, opacity: 0.22, zIndex: 6, shadow: { color: { $t: 'colors.accent' }, blur: 20, offsetX: 0, offsetY: 0 }, animation: { name: 'float', duration: 7000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      // ── 页眉
      { id: 'tw-kicker', type: 'text', content: 'MONITOR WALL // 轨道中继站 · 4 面板', fontFamily: MONO, fontSize: 22, color: { $t: 'colors.accent' }, letterSpacing: 3, x: 64, y: 78, width: 520, height: 30, zIndex: 5, editable: { content: true }, animation: { name: 'fadeIn', duration: 500 } },
      { id: 'tw-title', type: 'text', content: '全域监控墙', fontFamily: { $t: 'fonts.heading' }, fontSize: 72, fontWeight: '900', color: { $t: 'colors.ink' }, letterSpacing: 3, x: 64, y: 112, width: 480, height: 92, zIndex: 5, shadow: { color: { $t: 'colors.accent' }, blur: 26, offsetX: 0, offsetY: 0 }, animation: { name: 'glow', duration: 4600, iterationCount: 'infinite', easing: 'ease-in-out' }, editable: { content: true, fontSize: { type: 'range', min: 44, max: 84 } } },
      { id: 'tw-sub', type: 'text', content: '心跳 · 负载 · 舱段状态 · 组网拓扑　同步于 04:12:07 UTC', fontFamily: MONO, fontSize: 18, color: { $t: 'colors.muted' }, x: 64, y: 214, width: 560, height: 26, zIndex: 5, editable: { content: true } },
      { id: 'tw-alert', type: 'shape', shapeKind: 'rect', x: 640, y: 84, width: 376, height: 56, fill: { $t: 'colors.accent2' }, opacity: 0.14, border: { width: 1.5, color: { $t: 'colors.accent2' } }, zIndex: 4, animation: { name: 'wobble', duration: 4200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'tw-alert-t', type: 'text', content: '⚠ 告警 2 · 待处理 1', fontFamily: MONO, fontSize: 22, fontWeight: '700', color: { $t: 'colors.accent2' }, textAlign: 'center', letterSpacing: 1, x: 640, y: 96, width: 376, height: 30, zIndex: 5, editable: { content: true } },
      { id: 'tw-rule', type: 'shape', shapeKind: 'rect', x: 64, y: 250, width: 952, height: 2, fill: { $t: 'colors.accent' }, opacity: 0.5, zIndex: 4, animation: { name: 'slideInLeft', duration: 800, delay: 100 } },
      // ── W1 日志流
      { id: 'tw-w1', group: 'tw-w', type: 'shape', shapeKind: 'rect', x: 64, y: 278, width: 952, height: 336, fill: { $t: 'colors.panel' }, opacity: 0.85, border: { width: 1, color: { $t: 'colors.line' } }, zIndex: 2, animation: { name: 'fadeInUp', duration: 680, delay: 140 } },
      { id: 'tw-w1-bar', type: 'shape', shapeKind: 'rect', x: 64, y: 278, width: 952, height: 44, fill: { $t: 'colors.line' }, opacity: 0.85, zIndex: 3 },
      ...[[96, 'colors.accent2'], [120, 'colors.accent3'], [144, 'colors.muted']].map((d, i) => (
        { id: `tw-w1-dot-${i}`, type: 'shape', shapeKind: 'circle', x: d[0] as number, y: 292, width: 13, height: 13, fill: { $t: d[1] as string } as any, opacity: 0.9, zIndex: 4, animation: { name: 'twinkle', duration: 3000 + i * 700, delay: i * 260, iterationCount: 'infinite' } }
      )) as any,
      { id: 'tw-w1-title', type: 'text', content: 'syslog @ relay-core-01', fontFamily: MONO, fontSize: 18, color: { $t: 'colors.muted' }, letterSpacing: 1, x: 164, y: 288, width: 480, height: 26, zIndex: 5, editable: { content: true } },
      ...[['[04:12:07] 心跳包 OK · 时延 12 ms', 'colors.muted', 0.9], ['[04:11:52] 冷泵转速 3 420 rpm', 'colors.muted', 0.9], ['[04:11:38] 舱段 C 气压回升 101.2 kPa', 'colors.accent', 1], ['[04:11:20] 阵列 B 已完成姿态修正', 'colors.muted', 0.9], ['[04:11:04] ⚠ 辐照计数越限（阈值 8.2）', 'colors.accent2', 1], ['[04:10:47] 数据下传 1.84 Gb 已入站', 'colors.muted', 0.9], ['[04:10:31] 备用电池组自检通过', 'colors.muted', 0.9], ['[04:10:12] ⚠ 节点 N5 握手超时重试', 'colors.accent3', 1]].map((l, i) => (
        { id: `tw-w1-line-${i}`, type: 'text', content: l[0] as string, fontFamily: MONO, fontSize: 18, color: { $t: l[1] as string } as any, opacity: l[2] as number, x: 96, y: 338 + i * 30, width: 880, height: 26, zIndex: 5, editable: { content: true }, animation: { name: 'slideInLeft', duration: 460, delay: 220 + i * 70 } }
      )) as any,
      { id: 'tw-w1-cursor', type: 'shape', shapeKind: 'rect', x: 96, y: 586, width: 15, height: 2, fill: { $t: 'colors.accent' }, zIndex: 5, animation: { name: 'blink', duration: 900, iterationCount: 'infinite', easing: 'steps(1)' } },
      // ── W2 负载
      { id: 'tw-w2', group: 'tw-w', type: 'shape', shapeKind: 'rect', x: 64, y: 646, width: 952, height: 348, fill: { $t: 'colors.panel' }, opacity: 0.85, border: { width: 1, color: { $t: 'colors.line' } }, zIndex: 2, animation: { name: 'fadeInUp', duration: 680, delay: 240 } },
      { id: 'tw-w2-bar', type: 'shape', shapeKind: 'rect', x: 64, y: 646, width: 952, height: 44, fill: { $t: 'colors.line' }, opacity: 0.85, zIndex: 3 },
      { id: 'tw-w2-title', type: 'text', content: 'load / 资源负载 · 60 s 滑窗', fontFamily: MONO, fontSize: 18, color: { $t: 'colors.muted' }, letterSpacing: 1, x: 164, y: 656, width: 520, height: 26, zIndex: 5, editable: { content: true } },
      ...[['计算核心', 82, '82 %', 'colors.accent'], ['热控回路', 61, '61 %', 'colors.accent'], ['缓存占用', 93, '93 %', 'colors.accent2'], ['下行带宽', 47, '47 %', 'colors.accent3']].map((r, i) => {
        const y = 706 + i * 52, pct = r[1] as number
        return [
          { id: `tw-w2-lab-${i}`, type: 'text', content: r[0] as string, fontFamily: MONO, fontSize: 18, color: { $t: 'colors.muted' } as any, x: 96, y, width: 280, height: 26, zIndex: 5, editable: { content: true } },
          { id: `tw-w2-val-${i}`, type: 'text', content: r[2] as string, fontFamily: MONO, fontSize: 28, fontWeight: '700', color: { $t: r[3] as string } as any, textAlign: 'right', x: 640, y: y - 4, width: 336, height: 32, zIndex: 5, shadow: { color: { $t: r[3] as string } as any, blur: 12, offsetX: 0, offsetY: 0 }, editable: { content: true } },
          { id: `tw-w2-trk-${i}`, type: 'shape', shapeKind: 'rect', x: 96, y: y + 30, width: 880, height: 7, fill: { $t: 'colors.line' }, opacity: 0.9, borderRadius: 3, zIndex: 4 },
          { id: `tw-w2-bar-${i}`, type: 'shape', shapeKind: 'rect', x: 96, y: y + 30, width: 880 * pct / 100, height: 7, fill: { $t: r[3] as string } as any, borderRadius: 3, zIndex: 5, shadow: { color: { $t: r[3] as string } as any, blur: 10, offsetX: 0, offsetY: 0 }, animation: { name: 'slideInLeft', duration: 820, delay: 320 + i * 120 } }
        ]
      }).flat() as any,
      ...(() => { const rnd = seeded(7411); return Array.from({ length: 26 }, (_, i) => {
        const h = 6 + Math.round(rnd() * 38)
        return { id: `tw-w2-spark-${i}`, type: 'shape', shapeKind: 'rect', x: 96 + i * 33, y: 974 - h, width: 16, height: h, fill: { $t: i % 6 === 4 ? 'colors.accent2' : 'colors.accent' }, opacity: 0.3 + rnd() * 0.55, zIndex: 5, animation: { name: 'pulse', duration: 1100 + Math.round(rnd() * 1500), delay: i * 40, iterationCount: 'infinite', easing: 'ease-in-out' } }
      }) })() as any,
      { id: 'tw-w2-spark-lab', type: 'text', content: '吞吐 60 s', fontFamily: MONO, fontSize: 18, color: { $t: 'colors.muted' }, textAlign: 'right', x: 640, y: 900, width: 336, height: 26, zIndex: 5 },
      // ── W3 舱段状态格
      { id: 'tw-w3', group: 'tw-w', type: 'shape', shapeKind: 'rect', x: 64, y: 1026, width: 952, height: 400, fill: { $t: 'colors.panel' }, opacity: 0.6, border: { width: 1, color: { $t: 'colors.line' } }, zIndex: 2, animation: { name: 'fadeInUp', duration: 680, delay: 320 } },
      { id: 'tw-w3-bar', type: 'shape', shapeKind: 'rect', x: 64, y: 1026, width: 952, height: 44, fill: { $t: 'colors.line' }, opacity: 0.85, zIndex: 3 },
      { id: 'tw-w3-title', type: 'text', content: 'bays / 舱段状态 · 12 区', fontFamily: MONO, fontSize: 18, color: { $t: 'colors.muted' }, letterSpacing: 1, x: 164, y: 1036, width: 480, height: 26, zIndex: 5, editable: { content: true } },
      ...[['反应堆 A', '98 %', 'colors.accent'], ['反应堆 B', '待机', 'colors.muted'], ['热控回路', '正常', 'colors.accent'], ['推进舱', '61 %', 'colors.accent'], ['生保系统', '正常', 'colors.accent'], ['辐照屏蔽', '超限', 'colors.accent2'], ['阵列 A', '追踪', 'colors.accent3'], ['阵列 B', '锁定', 'colors.accent3'], ['数据舱', '下传', 'colors.accent'], ['气闸 C', '101 kPa', 'colors.accent'], ['机械臂', '归位', 'colors.muted'], ['应急电池', '充电 74%', 'colors.accent2']].map((c, i) => {
        const x = 88 + (i % 4) * 224, y = 1090 + Math.floor(i / 4) * 108
        return [
          { id: `tw-w3-cell-${i}`, type: 'shape', shapeKind: 'rect', x, y, width: 216, height: 96, fill: { $t: 'colors.panel' }, opacity: 0.95, border: { width: 1, color: { $t: c[2] as string } as any }, borderRadius: 4, zIndex: 3, animation: { name: 'zoomIn', duration: 520, delay: 420 + i * 55 } },
          { id: `tw-w3-led-${i}`, type: 'shape', shapeKind: 'circle', x: x + 98, y: y + 20, width: 11, height: 11, fill: { $t: c[2] as string } as any, zIndex: 5, shadow: { color: { $t: c[2] as string } as any, blur: 12, offsetX: 0, offsetY: 0 }, animation: { name: i % 5 === 5 ? 'blink' : 'twinkle', duration: 1800 + i * 180, delay: i * 90, iterationCount: 'infinite', easing: i % 5 === 5 ? 'steps(1)' : 'ease-in-out' } },
          { id: `tw-w3-n-${i}`, type: 'text', content: c[0] as string, fontFamily: HEI, fontSize: 18, color: { $t: 'colors.muted' } as any, textAlign: 'center', x, y: y + 34, width: 216, height: 24, zIndex: 5, editable: { content: true } },
          { id: `tw-w3-v-${i}`, type: 'text', content: c[1] as string, fontFamily: MONO, fontSize: 22, fontWeight: '700', color: { $t: c[2] as string } as any, textAlign: 'center', x, y: y + 58, width: 216, height: 28, zIndex: 5, editable: { content: true } }
        ]
      }).flat() as any,
      // ── W4 组网拓扑
      { id: 'tw-w4', group: 'tw-w', type: 'shape', shapeKind: 'rect', x: 64, y: 1458, width: 952, height: 322, fill: { $t: 'colors.panel' }, opacity: 0.6, border: { width: 1, color: { $t: 'colors.line' } }, zIndex: 2, animation: { name: 'fadeInUp', duration: 680, delay: 420 } },
      { id: 'tw-w4-bar', type: 'shape', shapeKind: 'rect', x: 64, y: 1458, width: 952, height: 44, fill: { $t: 'colors.line' }, opacity: 0.85, zIndex: 3 },
      { id: 'tw-w4-title', type: 'text', content: 'mesh / 组网拓扑 · 7 节点', fontFamily: MONO, fontSize: 18, color: { $t: 'colors.muted' }, letterSpacing: 1, x: 164, y: 1468, width: 480, height: 26, zIndex: 5, editable: { content: true } },
      { id: 'tw-w4-meta', type: 'text', content: '链路 8 · 平均跳 1.6', fontFamily: MONO, fontSize: 18, color: { $t: 'colors.accent' }, textAlign: 'right', x: 640, y: 1468, width: 336, height: 26, zIndex: 5, editable: { content: true } },
      ...(() => {
        const N = [[160, 1620], [330, 1548], [330, 1700], [520, 1620], [700, 1540], [700, 1706], [890, 1620]]
        const E = [[0, 1], [0, 2], [1, 3], [2, 3], [3, 4], [3, 5], [4, 6], [5, 6]]
        const links = E.map((e, i) => {
          const a = N[e[0]], b = N[e[1]], dx = b[0] - a[0], dy = b[1] - a[1], len = Math.sqrt(dx * dx + dy * dy)
          return { id: `tw-w4-link-${i}`, type: 'shape', shapeKind: 'rect', x: a[0] + dx / 2 - len / 2, y: a[1] + dy / 2 - 1, width: len, height: 2, fill: { $t: i % 3 === 1 ? 'colors.accent3' : 'colors.accent' } as any, opacity: 0.55, zIndex: 3, animation: { name: 'pulse', duration: 2400 + i * 320, delay: i * 180, iterationCount: 'infinite', easing: 'ease-in-out' } }
        })
        const nodes = N.map((n, i) => [
          { id: `tw-w4-node-${i}`, type: 'shape', shapeKind: 'circle', x: n[0] - 13, y: n[1] - 13, width: 26, height: 26, border: { width: 2, color: { $t: i === 4 ? 'colors.accent2' : 'colors.accent' } as any }, fill: { $t: 'colors.panel' } as any, zIndex: 5, shadow: { color: { $t: i === 4 ? 'colors.accent2' : 'colors.accent' } as any, blur: 16, offsetX: 0, offsetY: 0 }, animation: { name: i === 4 ? 'blink' : 'twinkle', duration: 2200 + i * 260, delay: i * 200, iterationCount: 'infinite', easing: i === 4 ? 'steps(1)' : 'ease-in-out' } },
          { id: `tw-w4-hub-${i}`, type: 'shape', shapeKind: 'circle', x: n[0] - 4, y: n[1] - 4, width: 8, height: 8, fill: { $t: i === 4 ? 'colors.accent2' : 'colors.accent' } as any, zIndex: 5 },
          { id: `tw-w4-lab-${i}`, type: 'text', content: `N${i + 1}`, fontFamily: MONO, fontSize: 18, color: { $t: 'colors.muted' } as any, textAlign: 'center', x: n[0] - 40, y: n[1] + 18, width: 80, height: 24, zIndex: 5 }
        ])
        return [...links, ...nodes.flat(), { id: 'tw-w4-ripple', type: 'shape', shapeKind: 'circle', x: 455, y: 1555, width: 130, height: 130, border: { width: 1.5, color: { $t: 'colors.accent' } }, opacity: 0.4, zIndex: 4, animation: { name: 'ripple', duration: 3600, iterationCount: 'infinite', easing: 'ease-out' } }]
      })() as any,
      // ── 页脚
      { id: 'tw-up-lab', type: 'text', content: 'UPTIME 连续运行', fontFamily: MONO, fontSize: 18, color: { $t: 'colors.muted' }, letterSpacing: 2, x: 64, y: 1792, width: 320, height: 26, zIndex: 5, editable: { content: true } },
      { id: 'tw-up-val', type: 'text', content: '418 d 07 h', fontFamily: { $t: 'fonts.heading' }, fontSize: 40, fontWeight: '900', color: { $t: 'colors.accent' }, letterSpacing: 2, x: 64, y: 1818, width: 340, height: 52, zIndex: 5, shadow: { color: { $t: 'colors.accent' }, blur: 20, offsetX: 0, offsetY: 0 }, editable: { content: true, fontSize: { type: 'range', min: 26, max: 56 } } },
      ...[['正常', 'colors.accent'], ['告警', 'colors.accent2'], ['旁路', 'colors.muted']].map((g, i) => {
        const x = 452 + i * 152
        return [
          { id: `tw-lg-${i}`, type: 'shape', shapeKind: 'rect', x, y: 1800, width: 136, height: 44, border: { width: 1, color: { $t: g[1] as string } as any }, opacity: 0.8, zIndex: 4 },
          { id: `tw-lg-dot-${i}`, type: 'shape', shapeKind: 'circle', x: x + 14, y: 1816, width: 11, height: 11, fill: { $t: g[1] as string } as any, zIndex: 5 },
          { id: `tw-lg-t-${i}`, type: 'text', content: g[0] as string, fontFamily: HEI, fontSize: 18, color: { $t: g[1] as string } as any, textAlign: 'center', x: x + 26, y: 1810, width: 98, height: 24, zIndex: 5 }
        ]
      }).flat() as any,
      { id: 'tw-foot-r', type: 'text', content: 'SN 2077-R-0412 / 自动刷新 5 s', fontFamily: MONO, fontSize: 18, color: { $t: 'colors.muted' }, textAlign: 'right', x: 640, y: 1858, width: 336, height: 26, zIndex: 5, editable: { content: true } },
      // ── 顶层
      { id: 'tw-scanline', type: 'overlay', background: SCAN, x: 0, y: 0, width: 1080, height: 1920, mixBlendMode: 'screen', opacity: 0.75, zIndex: 8 },
      { id: 'tw-vig', type: 'overlay', background: 'radial-gradient(100% 62% at 50% 44%, rgba(0,0,0,0) 48%, rgba(0,0,0,0.68) 100%)', x: 0, y: 0, width: 1080, height: 1920, zIndex: 8 },
      { id: 'tw-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1920, background: `url("${grain(260, 61, 0.9)}")`, opacity: 0.11, mixBlendMode: 'overlay', zIndex: 9 }
    ]
  }
]

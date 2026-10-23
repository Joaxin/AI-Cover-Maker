// src/core/templates/emotional/hy-handpan-resonance.ts
// 手碟共振（Handpan Resonance）：手碟俯视抽象（中心 Ding + 环绕 8 音区）+ 向外扩散的声波共振环 + 空灵排版。
// 1080×1350（4:5 竖版）；主色全部走 tokens.colors；四套预设覆盖全部被引用色 token。
import type { Template } from '@/types/types'
import { HEI, SANS, MONO, SONG, grainSoft, aura } from '../_fx/trend'
import { svgUri } from '../_fx/common'

// 手碟俯视：外圈碟体 + 内圈 + 8 个环绕音区（绕 Ding 旋转分布）+ 中心 Ding。
// 全部用半透明白描边，可随任何底色融入；金属光泽由下方 radial-gradient overlay 提供。
const HANDPAN_URI = svgUri(
  `<circle cx="320" cy="320" r="308" fill="none" stroke="%23FFFFFF" stroke-opacity="0.16" stroke-width="2"/>` +
  `<circle cx="320" cy="320" r="286" fill="none" stroke="%23FFFFFF" stroke-opacity="0.10" stroke-width="1.5"/>` +
  `<g fill="none" stroke="%23FFFFFF" stroke-opacity="0.20" stroke-width="2">` +
  [0, 45, 90, 135, 180, 225, 270, 315]
    .map(d => `<ellipse cx="320" cy="145" rx="44" ry="72" transform="rotate(${d} 320 320)"/>`)
    .join('') +
  `</g>` +
  `<circle cx="320" cy="320" r="64" fill="%23FFFFFF" fill-opacity="0.05" stroke="%23FFFFFF" stroke-opacity="0.30" stroke-width="2.5"/>` +
  `<circle cx="320" cy="320" r="38" fill="none" stroke="%23FFFFFF" stroke-opacity="0.18" stroke-width="1.5"/>`,
  640, 640
)

export const hyHandpanResonanceTemplates: Template[] = [
  {
    id: 'hy-handpan-resonance', name: '手碟共振', version: '1.0.0', category: 'emotional',
    tags: ['hy', 'handpan', 'meditation', 'sound-bath', 'healing', 'resonance', '9:16'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="125" viewBox="0 0 100 125"><rect width="100" height="125" fill="%230B1020"/><circle cx="50" cy="48" r="40" fill="none" stroke="%23FFFFFF" stroke-opacity="0.14" stroke-width="1.2"/><circle cx="50" cy="48" r="30" fill="none" stroke="%23FFFFFF" stroke-opacity="0.10" stroke-width="1"/><circle cx="50" cy="48" r="9" fill="none" stroke="%23FFFFFF" stroke-opacity="0.30" stroke-width="1.4"/><circle cx="50" cy="48" r="46" fill="none" stroke="%236E8FF2" stroke-opacity="0.18" stroke-width="0.8"/><circle cx="50" cy="48" r="54" fill="none" stroke="%236E8FF2" stroke-opacity="0.10" stroke-width="0.8"/><rect x="26" y="92" width="48" height="6" fill="%23F2F5FA"/><rect x="32" y="103" width="36" height="2.4" fill="%238A93A8"/></svg>',
    tokens: {
      colors: {
        bg: { label: '夜幕底', default: '#0B1020', options: ['#0B1020', '#14101C', '#07161A', '#1A1512'] },
        metal: { label: '碟体金属', default: '#8FA6C4', options: ['#8FA6C4', '#C4A48F', '#8FC4BC', '#D8C4A8'] },
        glow: { label: '共振光晕', default: '#6E8FF2', options: ['#6E8FF2', '#A87FF2', '#4FD1C5', '#E0A85A'] },
        ink: { label: '主标题', default: '#F2F5FA', options: ['#F2F5FA', '#FAF2F5', '#F0FAF8', '#FBF6EE'] },
        muted: { label: '次要文字', default: '#8A93A8', options: ['#8A93A8', '#A8969F', '#86A09C', '#A89880'] },
        accent: { label: '铜金点缀', default: '#C9A96A', options: ['#C9A96A', '#E0B070', '#D4B06A', '#B8763E'] }
      },
      fonts: {
        title: { label: '中文标题', default: HEI, options: [HEI, SONG, SANS] },
        latin: { label: '西文标题', default: SANS, options: [SANS, MONO, 'Didot, Georgia, serif'] },
        mono: { label: '技术标记', default: MONO, options: [MONO, SANS] },
        meta: { label: '说明小字', default: HEI, options: [HEI, SANS, SONG] }
      }
    },
    presets: [
      { name: '夜蓝钢', colors: { bg: '#0B1020', metal: '#8FA6C4', glow: '#6E8FF2', ink: '#F2F5FA', muted: '#8A93A8', accent: '#C9A96A' } },
      { name: '暮紫铜', colors: { bg: '#14101C', metal: '#C4A48F', glow: '#A87FF2', ink: '#FAF2F5', muted: '#A8969F', accent: '#E0B070' } },
      { name: '极光青', colors: { bg: '#07161A', metal: '#8FC4BC', glow: '#4FD1C5', ink: '#F0FAF8', muted: '#86A09C', accent: '#D4B06A' } },
      { name: '暖砂金', colors: { bg: '#1A1512', metal: '#D8C4A8', glow: '#E0A85A', ink: '#FBF6EE', muted: '#A89880', accent: '#B8763E' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      // ── 底色：中心微亮的深邃底 ───────────────────────────────────
      { id: 'hy-bg-grad', type: 'overlay', x: 0, y: 0, width: 1080, height: 1350, background: 'radial-gradient(120% 78% at 50% 36%, rgba(255,255,255,0.07) 0%, rgba(0,0,0,0) 62%)', mixBlendMode: 'screen', opacity: 0.9, zIndex: 1 },
      // ── 共振光晕（中心柔光）─────────────────────────────────────
      ...aura('hy-halo', 540, 500, 430, 'colors.glow', 5).map(s => ({ ...s, zIndex: 2 })),
      // ── 声波共振环：三层同心圆向外扩散 ──────────────────────────
      { id: 'hy-ring-1', group: 'hy-ring-', type: 'shape', shapeKind: 'circle', x: 180, y: 160, width: 720, height: 720, fill: 'transparent', border: { width: 2, color: { $t: 'colors.metal' } }, opacity: 0.32, zIndex: 3, animation: { name: 'pulse', duration: 5200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'hy-ring-2', group: 'hy-ring-', type: 'shape', shapeKind: 'circle', x: 120, y: 100, width: 840, height: 840, fill: 'transparent', border: { width: 1.6, color: { $t: 'colors.glow' } }, opacity: 0.22, zIndex: 3, animation: { name: 'pulse', duration: 6400, delay: 400, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'hy-ring-3', group: 'hy-ring-', type: 'shape', shapeKind: 'circle', x: 60, y: 40, width: 960, height: 960, fill: 'transparent', border: { width: 1.2, color: { $t: 'colors.glow' } }, opacity: 0.14, zIndex: 3, animation: { name: 'pulse', duration: 7600, delay: 800, iterationCount: 'infinite', easing: 'ease-in-out' } },
      // ── 手碟本体（金属光泽垫底 + 俯视结构线）─────────────────────
      { id: 'hy-disc-sheen', type: 'overlay', x: 220, y: 180, width: 640, height: 640, background: 'radial-gradient(52% 52% at 42% 34%, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.04) 46%, rgba(0,0,0,0.22) 100%)', mixBlendMode: 'screen', opacity: 0.75, zIndex: 4 },
      { id: 'hy-disc', type: 'image', src: HANDPAN_URI, objectFit: 'fill', x: 220, y: 180, width: 640, height: 640, zIndex: 5, animation: { name: 'fadeInUp', duration: 1100, delay: 260 } },
      // ── 顶部栏目标签 ────────────────────────────────────────────
      { id: 'hy-kicker', type: 'text', content: 'SOUND BATH · 声音疗愈', fontFamily: { $t: 'fonts.latin' }, fontSize: 22, fontWeight: '500', color: { $t: 'colors.muted' }, letterSpacing: 6, lineHeight: 1.2, textAlign: 'center', x: 140, y: 96, width: 800, height: 40, zIndex: 8, animation: { name: 'fadeIn', duration: 640, delay: 120 }, editable: { content: true } },
      // ── 主标题 + 西文副题 ───────────────────────────────────────
      { id: 'hy-title', type: 'text', content: '空灵共振', fontFamily: { $t: 'fonts.title' }, fontSize: 104, fontWeight: '800', color: { $t: 'colors.ink' }, letterSpacing: 8, lineHeight: 1.25, textAlign: 'center', x: 140, y: 920, width: 800, height: 140, shadow: { offsetX: 0, offsetY: 10, blur: 30, color: 'rgba(0,0,0,0.42)' }, zIndex: 8, animation: { name: 'inkReveal', duration: 1100, delay: 620 }, editable: { content: true, fontSize: { type: 'range', min: 76, max: 124 } } },
      { id: 'hy-title-latin', type: 'text', content: 'HANDPAN RESONANCE', fontFamily: { $t: 'fonts.latin' }, fontSize: 30, fontWeight: '500', color: { $t: 'colors.ink' }, letterSpacing: 8, lineHeight: 1.2, textAlign: 'center', opacity: 0.84, x: 140, y: 1070, width: 800, height: 50, zIndex: 8, animation: { name: 'fadeIn', duration: 760, delay: 820 }, editable: { content: true } },
      // ── 调式 / 频率标注 ─────────────────────────────────────────
      { id: 'hy-scale', type: 'text', content: 'D KURD 9 · 432 Hz', fontFamily: { $t: 'fonts.mono' }, fontSize: 22, fontWeight: '500', color: { $t: 'colors.accent' }, letterSpacing: 5, lineHeight: 1.2, textAlign: 'center', x: 140, y: 1160, width: 800, height: 40, zIndex: 8, animation: { name: 'fadeIn', duration: 700, delay: 940 }, editable: { content: true } },
      // ── 底部小字（含 HY 隐性署名）────────────────────────────────
      { id: 'hy-foot', type: 'text', content: 'HY · SOUND LAB · 2026', fontFamily: { $t: 'fonts.meta' }, fontSize: 20, fontWeight: '400', color: { $t: 'colors.muted' }, letterSpacing: 4, lineHeight: 1.2, textAlign: 'center', x: 140, y: 1230, width: 800, height: 40, zIndex: 8, animation: { name: 'fadeIn', duration: 680, delay: 1020 }, editable: { content: true } },
      // ── 颗粒 + 暗角 ─────────────────────────────────────────────
      { id: 'hy-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1350, background: `url("${grainSoft(340, 23, 0.5)}")`, opacity: 0.07, mixBlendMode: 'overlay', zIndex: 30 },
      { id: 'hy-vignette', type: 'overlay', x: 0, y: 0, width: 1080, height: 1350, background: 'radial-gradient(128% 94% at 50% 40%, rgba(0,0,0,0) 46%, rgba(0,0,0,0.62) 100%)', opacity: 0.8, mixBlendMode: 'multiply', zIndex: 31 }
    ]
  }
]

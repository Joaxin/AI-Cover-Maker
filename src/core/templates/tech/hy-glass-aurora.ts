// src/core/templates/tech/hy-glass-aurora.ts
// 玻璃极光卡（9:16）：极光 mesh 底（token 色同心圆叠出大半径柔光，随预设换色）+ 两层中性渐变罩
// + 一张毛玻璃卡承载主文案（白色半透明圆角层 · 长柔和阴影 · 极细亮边）
// 分区：眉标区 / 主视觉区（玻璃卡）/ 标题区 / 说明区 / CTA + 页脚区
import type { CanvasElement, ShapeElement, Template } from '@/types/types'
import { HEI, MONO, SANS, SONG, aura, grain } from '../_fx/trend'

/** 极光团：复用 _fx 的同心圆柔光（等效 radial-gradient，但颜色走 token 可随预设换色），补上入场/呼吸动效 */
const meshA: CanvasElement[] = (aura('ga-mesh-a', 500, 560, 470, 'colors.aurora1', 3) as ShapeElement[])
  .map((e, i): CanvasElement => ({
    ...e,
    animation: i === 0
      ? { name: 'pulse', duration: 8600, iterationCount: 'infinite', easing: 'ease-in-out' }
      : { name: 'fadeIn', duration: 1100, delay: i * 140 }
  }))

const meshB: CanvasElement[] = (aura('ga-mesh-b', 580, 1340, 470, 'colors.aurora2', 2) as ShapeElement[])
  .map((e, i): CanvasElement => ({ ...e, animation: { name: 'fadeIn', duration: 1200, delay: 80 + i * 160 } }))

export const hyGlassAuroraTemplates: Template[] = [
  {
    id: 'hy-glass-aurora', name: '玻璃极光卡', version: '1.0.0', category: 'tech',
    tags: ['hy', 'glassmorphism', 'aurora', 'mesh-gradient', 'soft-glow', 'dark-mode', '9:16'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="178" viewBox="0 0 100 178"><rect width="100" height="178" fill="%23070B18"/><circle cx="46" cy="52" r="44" fill="%235EEAD4" opacity="0.15"/><circle cx="46" cy="52" r="30" fill="%235EEAD4" opacity="0.13"/><circle cx="56" cy="134" r="44" fill="%23A78BFA" opacity="0.14"/><rect x="9" y="26" width="82" height="97" rx="10" fill="%23E8F1FF" opacity="0.10"/><rect x="9" y="26" width="82" height="97" rx="10" fill="none" stroke="%23E8F1FF" stroke-opacity="0.34"/><rect x="14" y="29" width="72" height="1" fill="%23E8F1FF" opacity="0.5"/><circle cx="81" cy="11" r="7" fill="none" stroke="%23FDBA74" stroke-width="1"/><rect x="16" y="36" width="34" height="3" rx="1.5" fill="%23FDBA74"/><rect x="16" y="46" width="46" height="7" rx="2" fill="%23F2F7FF"/><rect x="16" y="57" width="36" height="7" rx="2" fill="%23F2F7FF"/><rect x="16" y="72" width="60" height="2.4" rx="1.2" fill="%2393A9C8"/><rect x="16" y="79" width="52" height="2.4" rx="1.2" fill="%2393A9C8"/><rect x="16" y="92" width="26" height="5" rx="1.5" fill="%23FDBA74"/><rect x="16" y="101" width="42" height="2.4" rx="1.2" fill="%2393A9C8" opacity="0.8"/><rect x="9" y="136" width="46" height="12" rx="6" fill="%23F2F7FF"/><rect x="60" y="140" width="30" height="2" rx="1" fill="%2393A9C8"/><rect x="9" y="164" width="54" height="2" rx="1" fill="%2393A9C8" opacity="0.7"/></svg>',
    tokens: {
      colors: {
        bg: { label: '夜空底色', default: '#070B18', options: ['#070B18', '#0A1226', '#07150F', '#120A1E'] },
        aurora1: { label: '极光主色', default: '#5EEAD4', options: ['#5EEAD4', '#7DD3FC', '#86EFAC', '#C4B5FD'] },
        aurora2: { label: '极光副色', default: '#A78BFA', options: ['#A78BFA', '#F9A8D4', '#67E8F9', '#FDA4AF'] },
        glass: { label: '玻璃面', default: '#E8F1FF', options: ['#E8F1FF', '#E6F0FF', '#E9FBF2', '#F5ECFF'] },
        edge: { label: '玻璃亮边', default: 'rgba(232,241,255,0.34)', options: ['rgba(232,241,255,0.34)', 'rgba(230,240,255,0.32)', 'rgba(233,251,242,0.32)', 'rgba(245,236,255,0.34)'] },
        ink: { label: '主字', default: '#F2F7FF', options: ['#F2F7FF', '#F5F9FF', '#F1FBF6', '#FBF7FF'] },
        muted: { label: '次级字', default: '#93A9C8', options: ['#93A9C8', '#9BB0CE', '#93BCA4', '#B3A0CC'] },
        accent: { label: '微光强调', default: '#FDBA74', options: ['#FDBA74', '#FDE68A', '#FCD34D', '#FDBA74'] }
      },
      fonts: {
        heading: { label: '中文标题', default: HEI, options: [HEI, SONG, SANS] },
        body: { label: '中文正文', default: HEI, options: [HEI, SONG, SANS] },
        latin: { label: '西文', default: SANS, options: [SANS, MONO] },
        num: { label: '数字', default: MONO, options: [MONO, SANS] }
      }
    },
    presets: [
      { name: '极夜青紫', colors: { bg: '#070B18', aurora1: '#5EEAD4', aurora2: '#A78BFA', glass: '#E8F1FF', edge: 'rgba(232,241,255,0.34)', ink: '#F2F7FF', muted: '#93A9C8', accent: '#FDBA74' } },
      { name: '深海蓝粉', colors: { bg: '#0A1226', aurora1: '#7DD3FC', aurora2: '#F9A8D4', glass: '#E6F0FF', edge: 'rgba(230,240,255,0.32)', ink: '#F5F9FF', muted: '#9BB0CE', accent: '#FDE68A' } },
      { name: '苔原晨雾', colors: { bg: '#07150F', aurora1: '#86EFAC', aurora2: '#67E8F9', glass: '#E9FBF2', edge: 'rgba(233,251,242,0.32)', ink: '#F1FBF6', muted: '#93BCA4', accent: '#FCD34D' } },
      { name: '暮紫霞光', colors: { bg: '#120A1E', aurora1: '#C4B5FD', aurora2: '#FDA4AF', glass: '#F5ECFF', edge: 'rgba(245,236,255,0.34)', ink: '#FBF7FF', muted: '#B3A0CC', accent: '#FDBA74' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1920, defaultWidth: 1080, defaultHeight: 1920, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      // ── 极光底：两团 token 色柔光 + 中性柔光罩 / 暗角（渐变一律写在 overlay.background 上） ──
      ...meshA,
      ...meshB,
      { id: 'ga-sheen', type: 'overlay', x: 0, y: 0, width: 1080, height: 1920, background: 'radial-gradient(58% 34% at 26% 12%, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0) 68%)', mixBlendMode: 'soft-light', zIndex: 2, animation: { name: 'gradientPan', duration: 14000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'ga-vignette', type: 'overlay', x: 0, y: 0, width: 1080, height: 1920, background: 'radial-gradient(118% 76% at 50% 106%, rgba(0,0,0,0.44) 0%, rgba(0,0,0,0) 62%)', zIndex: 2 },

      // ── 眉标区：左上小字 + 右上微光徽章 ──────────────────────────
      { id: 'ga-eyebrow', type: 'text', content: 'AURORA OS 2.5 · 视觉引擎', fontFamily: { $t: 'fonts.latin' }, fontSize: 30, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.86, letterSpacing: 6, lineHeight: 1.2, x: 100, y: 118, width: 560, height: 44, zIndex: 7, animation: { name: 'fadeIn', duration: 620, delay: 60 }, editable: { content: true } },
      { id: 'ga-badge', type: 'shape', shapeKind: 'circle', x: 856, y: 110, width: 124, height: 124, fill: { $t: 'colors.glass' }, opacity: 0.12, border: { width: 1, style: 'solid', color: { $t: 'colors.edge' } }, shadow: { offsetX: 0, offsetY: 0, blur: 30, color: { $t: 'colors.accent' } }, zIndex: 6, animation: { name: 'zoomIn', duration: 640, delay: 160 } },
      { id: 'ga-badge-t', type: 'text', content: 'NEW', fontFamily: { $t: 'fonts.latin' }, fontSize: 22, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 3, lineHeight: 1.2, textAlign: 'center', x: 856, y: 159, width: 124, height: 30, zIndex: 7, animation: { name: 'fadeIn', duration: 520, delay: 240 }, editable: { content: true } },

      // ── 主视觉区：毛玻璃卡（半透明圆角层 + 长柔和阴影 + 极细亮边） ──
      { id: 'ga-card', type: 'shape', shapeKind: 'rect', x: 100, y: 300, width: 880, height: 1000, fill: { $t: 'colors.glass' }, opacity: 0.1, borderRadius: 36, border: { width: 1, style: 'solid', color: { $t: 'colors.edge' } }, shadow: { offsetX: 0, offsetY: 34, blur: 84, color: 'rgba(0,0,0,0.34)' }, zIndex: 5, animation: { name: 'zoomIn', duration: 780, delay: 280 } },
      { id: 'ga-gloss', type: 'shape', shapeKind: 'rect', x: 140, y: 304, width: 800, height: 2, fill: { $t: 'colors.glass' }, opacity: 0.5, borderRadius: 1, zIndex: 6, animation: { name: 'fadeIn', duration: 700, delay: 440 } },

      // ── 标题区：卡内标签 + 两行主标题 ────────────────────────────
      { id: 'ga-kicker', type: 'text', content: 'NEW ENGINE · 视觉引擎 2.5', fontFamily: { $t: 'fonts.latin' }, fontSize: 30, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 6, lineHeight: 1.2, x: 160, y: 370, width: 760, height: 44, zIndex: 7, animation: { name: 'fadeInUp', duration: 620, delay: 500 }, editable: { content: true } },
      { id: 'ga-title', type: 'text', content: '让每一次生成\n都自带柔光', fontFamily: { $t: 'fonts.heading' }, fontSize: 108, fontWeight: '700', color: { $t: 'colors.ink' }, letterSpacing: 2, lineHeight: 1.18, x: 160, y: 470, width: 760, height: 300, zIndex: 7, animation: { name: 'fadeInUp', duration: 900, delay: 580 }, editable: { content: true, fontSize: { type: 'range', min: 88, max: 116 } } },

      // ── 说明区：四行导语 + 一条实测指标 ──────────────────────────
      { id: 'ga-body', type: 'text', content: '新的玻璃层把噪点压到几乎看不见\n色彩过渡像极光一样连续\n你只管写一句话\n剩下的交给它', fontFamily: { $t: 'fonts.body' }, fontSize: 40, color: { $t: 'colors.muted' }, letterSpacing: 1, lineHeight: 1.65, x: 160, y: 800, width: 760, height: 300, zIndex: 7, animation: { name: 'fadeInUp', duration: 840, delay: 740 }, editable: { content: true, fontSize: { type: 'range', min: 34, max: 44 } } },
      { id: 'ga-stat-n', type: 'text', content: '98.6%', fontFamily: { $t: 'fonts.num' }, fontSize: 54, fontWeight: '700', color: { $t: 'colors.ink' }, letterSpacing: 1, lineHeight: 1.3, x: 160, y: 1116, width: 760, height: 80, zIndex: 7, animation: { name: 'fadeInUp', duration: 720, delay: 900 }, editable: { content: true, fontSize: { type: 'range', min: 44, max: 60 } } },
      { id: 'ga-stat-l', type: 'text', content: '首帧出图成功率 · 近 7 日实测', fontFamily: { $t: 'fonts.body' }, fontSize: 22, color: { $t: 'colors.muted' }, opacity: 0.82, letterSpacing: 2, lineHeight: 1.4, x: 160, y: 1200, width: 760, height: 36, zIndex: 7, animation: { name: 'fadeIn', duration: 660, delay: 1000 }, editable: { content: true } },

      // ── 底部胶囊 CTA ────────────────────────────────────────────
      { id: 'ga-cta', type: 'shape', shapeKind: 'rect', x: 100, y: 1450, width: 440, height: 116, fill: { $t: 'colors.ink' }, borderRadius: 58, shadow: { offsetX: 0, offsetY: 18, blur: 44, color: 'rgba(0,0,0,0.34)' }, zIndex: 6, animation: { name: 'fadeInUp', duration: 780, delay: 1100 } },
      { id: 'ga-cta-t', type: 'text', content: '立即体验新版', fontFamily: { $t: 'fonts.heading' }, fontSize: 30, fontWeight: '700', color: { $t: 'colors.bg' }, letterSpacing: 3, lineHeight: 1.2, textAlign: 'center', x: 100, y: 1488, width: 440, height: 40, zIndex: 7, animation: { name: 'fadeIn', duration: 600, delay: 1220 }, editable: { content: true } },

      // ── 页脚区：左署名 / 右年份 ─────────────────────────────────
      { id: 'ga-foot-l', type: 'text', content: 'AI COVER MAKER · AURORA OS 2.5', fontFamily: { $t: 'fonts.latin' }, fontSize: 22, color: { $t: 'colors.muted' }, letterSpacing: 2, lineHeight: 1.2, x: 100, y: 1800, width: 560, height: 30, zIndex: 7, animation: { name: 'fadeIn', duration: 700, delay: 1340 }, editable: { content: true } },
      { id: 'ga-foot-r', type: 'text', content: 'HY STUDIO · 2026', fontFamily: { $t: 'fonts.latin' }, fontSize: 22, fontWeight: '700', color: { $t: 'colors.muted' }, letterSpacing: 2, lineHeight: 1.2, textAlign: 'right', x: 620, y: 1800, width: 360, height: 30, zIndex: 7, animation: { name: 'fadeIn', duration: 700, delay: 1420 }, editable: { content: true } },

      // ── 极淡噪点颗粒 ────────────────────────────────────────────
      { id: 'ga-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1920, background: `url("${grain(300, 23, 0.55)}")`, opacity: 0.05, mixBlendMode: 'overlay', zIndex: 9 }
    ]
  }
]

// src/core/templates/film/hy-cinematic-wide.ts
// 电影宽幅片头（cinematic scope）：上下遮幅黑条 + 中间 2.39:1 画面区 + 居中超大片名 + 演职员表小字堆叠。
// 1920×1080（16:9）；全色走 tokens.colors，四套预设覆盖全部色 token。
import type { Template } from '@/types/types'
import { HEI, SANS, MONO, grain, perforations } from '../_fx/trend'

export const hyCinematicWideTemplates: Template[] = [
  {
    id: 'hy-cinematic-wide', name: '宽幅片头', version: '1.0.0', category: 'film',
    tags: ['hy', 'cinematic', 'letterbox', 'scope', 'film-title', 'grain', '16:9'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="90" viewBox="0 0 160 90"><rect width="160" height="90" fill="%230A0A0C"/><rect x="8" y="6" width="144" height="10" fill="%23000000"/><rect x="8" y="74" width="144" height="10" fill="%23000000"/><rect x="8" y="16" width="144" height="58" fill="%2314161B"/><ellipse cx="104" cy="34" rx="46" ry="30" fill="%23E0A253" opacity="0.18"/><rect x="14" y="20" width="4" height="50" fill="%23F5F1EA" opacity="0.18"/><rect x="142" y="20" width="4" height="50" fill="%23F5F1EA" opacity="0.18"/><rect x="56" y="40" width="48" height="9" fill="%23F5F1EA"/><rect x="62" y="55" width="36" height="2" fill="%23F5F1EA" opacity="0.5"/><rect x="66" y="60" width="28" height="1.6" fill="%238E8B84"/><rect x="70" y="63" width="20" height="1.6" fill="%238E8B84"/><rect x="14" y="8" width="30" height="2" fill="%238E8B84"/><rect x="116" y="8" width="30" height="2" fill="%238E8B84"/><rect x="14" y="79" width="34" height="2" fill="%238E8B84"/><rect x="112" y="79" width="34" height="2" fill="%238E8B84"/></svg>',
    tokens: {
      colors: {
        bg: { label: '海报底', default: '#0A0A0C', options: ['#0A0A0C', '#080A0C', '#0C0908', '#07080E'] },
        bar: { label: '遮幅黑条', default: '#000000', options: ['#000000', '#05060A', '#0B0705', '#04050B'] },
        frame: { label: '画面底', default: '#14161B', options: ['#14161B', '#101720', '#1A1411', '#11142A'] },
        ink: { label: '片名', default: '#F5F1EA', options: ['#F5F1EA', '#EAF1F4', '#F8F0E4', '#EAECF8'] },
        muted: { label: '小字', default: '#8E8B84', options: ['#8E8B84', '#77868F', '#958B7D', '#7E84A6'] },
        warm: { label: '暖光', default: '#E0A253', options: ['#E0A253', '#7FB2C9', '#E8853A', '#8FA6FF'] }
      },
      fonts: {
        title: { label: '中文片名', default: HEI, options: [HEI, SANS, 'Songti SC, SimSun, serif'] },
        latin: { label: '西文标题', default: SANS, options: [SANS, MONO, 'Didot, Georgia, serif'] },
        mono: { label: '技术标记', default: MONO, options: [MONO, SANS] },
        meta: { label: '演职员小字', default: HEI, options: [HEI, SANS, 'Songti SC, SimSun, serif'] }
      }
    },
    presets: [
      { name: '夜行暖金', colors: { bg: '#0A0A0C', bar: '#000000', frame: '#14161B', ink: '#F5F1EA', muted: '#8E8B84', warm: '#E0A253' } },
      { name: '暗房青灰', colors: { bg: '#080A0C', bar: '#05060A', frame: '#101720', ink: '#EAF1F4', muted: '#77868F', warm: '#7FB2C9' } },
      { name: '琥珀放映', colors: { bg: '#0C0908', bar: '#0B0705', frame: '#1A1411', ink: '#F8F0E4', muted: '#958B7D', warm: '#E8853A' } },
      { name: '午夜靛蓝', colors: { bg: '#07080E', bar: '#04050B', frame: '#11142A', ink: '#EAECF8', muted: '#7E84A6', warm: '#8FA6FF' } }
    ],
    canvas: { virtualWidth: 1920, virtualHeight: 1080, defaultWidth: 1920, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      // ── 画面区：2.39:1 画面底 + 一束暖光 + 底部压暗 ──────────────
      { id: 'hy-band', type: 'shape', shapeKind: 'rect', x: 96, y: 178, width: 1728, height: 724, fill: { $t: 'colors.frame' }, zIndex: 1, animation: { name: 'fadeIn', duration: 700 } },
      { id: 'hy-glow', type: 'overlay', x: 96, y: 178, width: 1728, height: 724, background: 'radial-gradient(760px 500px at 66% 36%, rgba(224,162,83,0.26), rgba(224,162,83,0.08) 46%, rgba(0,0,0,0) 72%)', mixBlendMode: 'screen', opacity: 0.9, zIndex: 2, animation: { name: 'gradientPan', duration: 15000, iterationCount: 'infinite', easing: 'linear' } },
      { id: 'hy-depth', type: 'overlay', x: 96, y: 178, width: 1728, height: 724, background: 'linear-gradient(180deg, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0.04) 42%, rgba(0,0,0,0.68) 100%)', mixBlendMode: 'multiply', opacity: 0.88, zIndex: 3, animation: { name: 'fadeIn', duration: 900, delay: 160 } },
      // ── 上下遮幅黑条 + 暖色分隔线 ────────────────────────────────
      { id: 'hy-bar-top', type: 'shape', shapeKind: 'rect', x: 96, y: 80, width: 1728, height: 98, fill: { $t: 'colors.bar' }, zIndex: 4, animation: { name: 'fadeInDown', duration: 720, delay: 60 } },
      { id: 'hy-bar-bottom', type: 'shape', shapeKind: 'rect', x: 96, y: 902, width: 1728, height: 98, fill: { $t: 'colors.bar' }, zIndex: 4, animation: { name: 'fadeInUp', duration: 720, delay: 60 } },
      { id: 'hy-line-top', type: 'shape', shapeKind: 'line', x: 96, y: 172, width: 1728, height: 2, fill: { $t: 'colors.warm' }, opacity: 0.3, zIndex: 6, animation: { name: 'slideInLeft', duration: 760, delay: 240 } },
      { id: 'hy-line-bottom', type: 'shape', shapeKind: 'line', x: 96, y: 898, width: 1728, height: 2, fill: { $t: 'colors.warm' }, opacity: 0.3, zIndex: 6, animation: { name: 'slideInRight', duration: 760, delay: 300 } },
      // ── 左右齿孔 ────────────────────────────────────────────────
      { id: 'hy-perf-l', type: 'image', src: perforations(30, 660, 16, '%23F5F1EA'), objectFit: 'fill', x: 112, y: 210, width: 30, height: 660, opacity: 0.16, group: 'perf', zIndex: 5, animation: { name: 'fadeIn', duration: 700, delay: 380 } },
      { id: 'hy-perf-r', type: 'image', src: perforations(30, 660, 16, '%23F5F1EA'), objectFit: 'fill', x: 1778, y: 210, width: 30, height: 660, opacity: 0.16, group: 'perf', zIndex: 5, animation: { name: 'fadeIn', duration: 700, delay: 420 } },
      // ── 上黑条：出品 / 技术标记 ──────────────────────────────────
      { id: 'hy-topbar-l', type: 'text', content: 'HY PICTURES PRESENTS', fontFamily: { $t: 'fonts.latin' }, fontSize: 22, fontWeight: '500', color: { $t: 'colors.muted' }, letterSpacing: 6, lineHeight: 1.2, x: 168, y: 118, width: 900, height: 40, zIndex: 7, animation: { name: 'fadeIn', duration: 620, delay: 120 }, editable: { content: true } },
      { id: 'hy-topbar-r', type: 'text', content: 'SCREENPLAY / 2.39:1', fontFamily: { $t: 'fonts.mono' }, fontSize: 22, fontWeight: '500', color: { $t: 'colors.muted' }, letterSpacing: 5, lineHeight: 1.2, textAlign: 'right', x: 1300, y: 118, width: 480, height: 40, zIndex: 7, animation: { name: 'fadeIn', duration: 620, delay: 180 }, editable: { content: true } },
      // ── 画面区顶部：出品方 / 规格 ────────────────────────────────
      { id: 'hy-slug', type: 'text', content: '屿山影业 荣誉出品', fontFamily: { $t: 'fonts.meta' }, fontSize: 22, fontWeight: '500', color: { $t: 'colors.muted' }, letterSpacing: 6, lineHeight: 1.2, x: 168, y: 214, width: 900, height: 42, zIndex: 7, animation: { name: 'fadeIn', duration: 640, delay: 460 }, editable: { content: true } },
      { id: 'hy-meta-r', type: 'text', content: 'COLOR · 122 MIN', fontFamily: { $t: 'fonts.mono' }, fontSize: 22, fontWeight: '500', color: { $t: 'colors.muted' }, letterSpacing: 5, lineHeight: 1.2, textAlign: 'right', x: 1456, y: 214, width: 324, height: 42, zIndex: 7, animation: { name: 'fadeIn', duration: 640, delay: 500 }, editable: { content: true } },
      // ── 片名上方的幽灵字：CINEMASCOPE ───────────────────────────
      { id: 'hy-scope-watermark', type: 'text', content: 'CINEMASCOPE', fontFamily: { $t: 'fonts.latin' }, fontSize: 96, fontWeight: '700', color: { $t: 'colors.warm' }, letterSpacing: 2, lineHeight: 1.2, textAlign: 'center', x: 300, y: 316, width: 1320, height: 140, opacity: 0.13, zIndex: 5, animation: { name: 'pulse', duration: 9000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      // ── 片名：超大字重、字距收紧 ─────────────────────────────────
      { id: 'hy-title', type: 'text', content: '雾中列车', fontFamily: { $t: 'fonts.title' }, fontSize: 176, fontWeight: '800', color: { $t: 'colors.ink' }, letterSpacing: -4, lineHeight: 1.05, textAlign: 'center', x: 560, y: 396, width: 800, height: 210, shadow: { offsetX: 0, offsetY: 12, blur: 34, color: 'rgba(0,0,0,0.45)' }, zIndex: 8, animation: { name: 'inkReveal', duration: 1100, delay: 380 }, editable: { content: true, fontSize: { type: 'range', min: 150, max: 196 } } },
      { id: 'hy-title-latin', type: 'text', content: 'THE TRAIN IN THE FOG', fontFamily: { $t: 'fonts.latin' }, fontSize: 30, fontWeight: '500', color: { $t: 'colors.ink' }, letterSpacing: 9, lineHeight: 1.2, textAlign: 'center', opacity: 0.82, x: 560, y: 620, width: 800, height: 48, zIndex: 8, animation: { name: 'fadeIn', duration: 760, delay: 640 }, editable: { content: true } },
      // ── 演职员表：三行小字、宽字距 ───────────────────────────────
      { id: 'hy-credits', type: 'text', content: 'DIRECTED BY 陈屿\nSTARRING 周砚 · 苏禾\n2026 · 中国 · 122 MIN', fontFamily: { $t: 'fonts.meta' }, fontSize: 22, fontWeight: '400', color: { $t: 'colors.muted' }, letterSpacing: 5, lineHeight: 1.9, textAlign: 'center', x: 560, y: 690, width: 800, height: 150, zIndex: 8, animation: { name: 'rise', duration: 820, delay: 760 }, editable: { content: true } },
      // ── 下黑条：制作信息 / 版权 ──────────────────────────────────
      { id: 'hy-bar-b-l', type: 'text', content: 'ORIGINAL SCORE 林岫 · EDITING 沈澈', fontFamily: { $t: 'fonts.meta' }, fontSize: 22, fontWeight: '400', color: { $t: 'colors.muted' }, letterSpacing: 5, lineHeight: 1.2, x: 168, y: 940, width: 900, height: 42, zIndex: 7, animation: { name: 'fadeIn', duration: 660, delay: 860 }, editable: { content: true } },
      { id: 'hy-bar-b-r', type: 'text', content: '© 2026 屿山影业 · ALL RIGHTS RESERVED', fontFamily: { $t: 'fonts.meta' }, fontSize: 22, fontWeight: '400', color: { $t: 'colors.muted' }, letterSpacing: 4, lineHeight: 1.2, textAlign: 'right', x: 1100, y: 940, width: 680, height: 42, zIndex: 7, animation: { name: 'fadeIn', duration: 660, delay: 900 }, editable: { content: true } },
      // ── 胶片颗粒 + 暗角 ─────────────────────────────────────────
      { id: 'hy-grain', type: 'overlay', x: 0, y: 0, width: 1920, height: 1080, background: `url("${grain(360, 19, 0.55)}")`, opacity: 0.07, mixBlendMode: 'overlay', zIndex: 20 },
      { id: 'hy-vignette', type: 'overlay', x: 0, y: 0, width: 1920, height: 1080, background: 'radial-gradient(126% 92% at 50% 44%, rgba(0,0,0,0) 46%, rgba(0,0,0,0.58) 100%)', opacity: 0.82, mixBlendMode: 'multiply', zIndex: 21 }
    ]
  }
]

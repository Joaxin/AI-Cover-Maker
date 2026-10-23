// src/core/templates/film/hy-08-cinematic-bar.ts
// 宽银幕电影感（cinematic letterbox）：上下遮幅黑条 + 中央电影感渐变区块与暖光晕 + 巨型片名 + 演员表式小字。
// 1920×1080（16:9）；主色全部走 tokens.colors；四套预设覆盖全部被引用色 token。
import type { Template } from '@/types/types'
import { HEI, SANS, MONO, grainSoft, perforations, aura } from '../_fx/trend'

export const hy08CinematicBarTemplates: Template[] = [
  {
    id: 'hy-08-cinematic-bar', name: '宽银幕电影', version: '1.0.0', category: 'film',
    tags: ['hy', 'cinematic', 'letterbox', 'film-title', 'grain', 'credits', '16:9'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="178" height="100" viewBox="0 0 178 100"><rect width="178" height="100" fill="%230B0B0F"/><rect x="0" y="0" width="178" height="12" fill="%23000000"/><rect x="0" y="88" width="178" height="12" fill="%23000000"/><rect x="8" y="12" width="162" height="76" fill="%2314161B"/><ellipse cx="112" cy="40" rx="54" ry="30" fill="%23E0A85A" opacity="0.2"/><rect x="12" y="16" width="3" height="68" fill="%23F5F1EA" opacity="0.16"/><rect x="163" y="16" width="3" height="68" fill="%23F5F1EA" opacity="0.16"/><rect x="54" y="42" width="70" height="10" fill="%23F5F1EA"/><rect x="62" y="57" width="54" height="3" fill="%23F5F1EA" opacity="0.55"/><rect x="66" y="66" width="46" height="2" fill="%239A958C"/><rect x="70" y="71" width="38" height="2" fill="%239A958C"/><rect x="12" y="4" width="40" height="3" fill="%239A958C"/><rect x="126" y="4" width="40" height="3" fill="%239A958C"/><rect x="12" y="93" width="46" height="3" fill="%239A958C"/><rect x="120" y="93" width="46" height="3" fill="%239A958C"/></svg>',
    tokens: {
      colors: {
        bg: { label: '海报底', default: '#0B0B0F', options: ['#0B0B0F', '#080C12', '#0E0808', '#0E0A07'] },
        bar: { label: '遮幅黑条', default: '#000000', options: ['#000000', '#000305', '#000000', '#050302'] },
        ink: { label: '片名', default: '#F5F1EA', options: ['#F5F1EA', '#EAF1F6', '#F6EAEA', '#F7EFE4'] },
        muted: { label: '演职员小字', default: '#9A958C', options: ['#9A958C', '#7E8C99', '#9C8484', '#9A8C7C'] },
        warm: { label: '暖光', default: '#E0A85A', options: ['#E0A85A', '#5BA8E0', '#E05B5B', '#C98A4A'] },
        accent: { label: '标签', default: '#F2C879', options: ['#F2C879', '#8FCBF2', '#F2847C', '#E0A85A'] }
      },
      fonts: {
        title: { label: '中文片名', default: HEI, options: [HEI, '"Songti SC", SimSun, serif', SANS] },
        latin: { label: '西文标题', default: SANS, options: [SANS, MONO, '"Didot", Georgia, serif'] },
        mono: { label: '技术标记', default: MONO, options: [MONO, SANS] },
        meta: { label: '演职员小字', default: HEI, options: [HEI, SANS, '"Songti SC", SimSun, serif'] },
        cjk: { label: '中文标签', default: HEI, options: [HEI, SANS, '"Songti SC", SimSun, serif'] }
      }
    },
    presets: [
      { name: '暗夜金', colors: { bg: '#0B0B0F', bar: '#000000', ink: '#F5F1EA', muted: '#9A958C', warm: '#E0A85A', accent: '#F2C879' } },
      { name: '冷蓝', colors: { bg: '#080C12', bar: '#000305', ink: '#EAF1F6', muted: '#7E8C99', warm: '#5BA8E0', accent: '#8FCBF2' } },
      { name: '血色', colors: { bg: '#0E0808', bar: '#000000', ink: '#F6EAEA', muted: '#9C8484', warm: '#E05B5B', accent: '#F2847C' } },
      { name: '暖棕', colors: { bg: '#0E0A07', bar: '#050302', ink: '#F7EFE4', muted: '#9A8C7C', warm: '#C98A4A', accent: '#E0A85A' } }
    ],
    canvas: { virtualWidth: 1920, virtualHeight: 1080, defaultWidth: 1920, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      // ── 画面区：电影感渐变底 + 暖光晕 + 压暗 ───────────────────────
      { id: 'hy-frame-grad', type: 'overlay', x: 0, y: 140, width: 1920, height: 800, background: 'linear-gradient(180deg, rgba(0,0,0,0.46) 0%, rgba(0,0,0,0.04) 46%, rgba(0,0,0,0.74) 100%)', mixBlendMode: 'multiply', opacity: 0.9, zIndex: 2 },
      { id: 'hy-glow', type: 'overlay', x: 0, y: 140, width: 1920, height: 800, background: 'radial-gradient(900px 620px at 50% 44%, rgba(255,255,255,0.06), rgba(255,255,255,0) 70%)', mixBlendMode: 'screen', opacity: 0.6, zIndex: 3 },
      ...aura('hy-halo', 960, 470, 420, 'colors.warm', 5).map(s => ({ ...s, zIndex: 4 })),
      // ── 上下遮幅黑条 + 暖色分隔线 ────────────────────────────────
      { id: 'hy-bar-top', type: 'shape', shapeKind: 'rect', x: 0, y: 0, width: 1920, height: 140, fill: { $t: 'colors.bar' }, zIndex: 5, animation: { name: 'fadeInDown', duration: 720, delay: 60 } },
      { id: 'hy-bar-bottom', type: 'shape', shapeKind: 'rect', x: 0, y: 940, width: 1920, height: 140, fill: { $t: 'colors.bar' }, zIndex: 5, animation: { name: 'fadeInUp', duration: 720, delay: 60 } },
      { id: 'hy-line-top', type: 'shape', shapeKind: 'line', x: 120, y: 150, width: 1680, height: 2, fill: { $t: 'colors.warm' }, opacity: 0.32, zIndex: 6, animation: { name: 'slideInLeft', duration: 760, delay: 240 } },
      { id: 'hy-line-bottom', type: 'shape', shapeKind: 'line', x: 120, y: 930, width: 1680, height: 2, fill: { $t: 'colors.warm' }, opacity: 0.32, zIndex: 6, animation: { name: 'slideInRight', duration: 760, delay: 300 } },
      // ── 左右齿孔 ────────────────────────────────────────────────
      { id: 'hy-perf-l', type: 'image', src: perforations(30, 560, 14, '%23F5F1EA'), objectFit: 'fill', x: 130, y: 200, width: 30, height: 560, opacity: 0.16, group: 'perf', zIndex: 6, animation: { name: 'fadeIn', duration: 700, delay: 380 } },
      { id: 'hy-perf-r', type: 'image', src: perforations(30, 560, 14, '%23F5F1EA'), objectFit: 'fill', x: 1760, y: 200, width: 30, height: 560, opacity: 0.16, group: 'perf', zIndex: 6, animation: { name: 'fadeIn', duration: 700, delay: 420 } },
      // ── 上黑条：出品 / 技术标记 ──────────────────────────────────
      { id: 'hy-top-l', type: 'text', content: 'HY PICTURES 出品', fontFamily: { $t: 'fonts.latin' }, fontSize: 22, fontWeight: '500', color: { $t: 'colors.muted' }, letterSpacing: 6, lineHeight: 1.2, x: 120, y: 56, width: 900, height: 40, zIndex: 8, animation: { name: 'fadeIn', duration: 620, delay: 120 }, editable: { content: true } },
      { id: 'hy-top-r', type: 'text', content: '2.39:1 · DOLBY', fontFamily: { $t: 'fonts.mono' }, fontSize: 22, fontWeight: '500', color: { $t: 'colors.muted' }, letterSpacing: 5, lineHeight: 1.2, textAlign: 'right', x: 1300, y: 56, width: 500, height: 40, zIndex: 8, animation: { name: 'fadeIn', duration: 620, delay: 180 }, editable: { content: true } },
      // ── 画面区顶部：口碑 kicker + 类型标签 pill ──────────────────
      { id: 'hy-kicker', type: 'text', content: '本周口碑炸裂 · 豆瓣 8.9', fontFamily: { $t: 'fonts.cjk' }, fontSize: 28, fontWeight: '500', color: { $t: 'colors.ink' }, letterSpacing: 4, lineHeight: 1.2, x: 120, y: 176, width: 900, height: 44, zIndex: 8, animation: { name: 'fadeIn', duration: 640, delay: 460 }, editable: { content: true } },
      { id: 'hy-tag', type: 'shape', shapeKind: 'rect', x: 1560, y: 170, width: 240, height: 54, fill: { $t: 'colors.accent' }, borderRadius: 27, zIndex: 7, animation: { name: 'fadeIn', duration: 640, delay: 480 } },
      { id: 'hy-tag-t', type: 'text', content: '剧情 · 悬疑', fontFamily: { $t: 'fonts.cjk' }, fontSize: 28, fontWeight: '700', color: { $t: 'colors.bg' }, letterSpacing: 2, lineHeight: 1.9, textAlign: 'center', x: 1560, y: 170, width: 240, height: 54, zIndex: 8, animation: { name: 'fadeIn', duration: 640, delay: 500 }, editable: { content: true } },
      // ── 片名背后的幽灵字 ─────────────────────────────────────────
      { id: 'hy-ghost-mark', type: 'text', content: 'CINEMATIC', fontFamily: { $t: 'fonts.latin' }, fontSize: 116, fontWeight: '700', color: { $t: 'colors.warm' }, letterSpacing: 4, lineHeight: 1.2, textAlign: 'center', x: 360, y: 300, width: 1200, height: 150, opacity: 0.06, zIndex: 6, animation: { name: 'pulse', duration: 9000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      // ── 巨型片名 + 西文副题 ──────────────────────────────────────
      { id: 'hy-title', type: 'text', content: '长夜将尽', fontFamily: { $t: 'fonts.title' }, fontSize: 200, fontWeight: '800', color: { $t: 'colors.ink' }, letterSpacing: -4, lineHeight: 1.05, textAlign: 'center', x: 560, y: 360, width: 800, height: 240, shadow: { offsetX: 0, offsetY: 12, blur: 34, color: 'rgba(0,0,0,0.45)' }, zIndex: 8, animation: { name: 'inkReveal', duration: 1100, delay: 380 }, editable: { content: true, fontSize: { type: 'range', min: 150, max: 220 } } },
      { id: 'hy-title-latin', type: 'text', content: 'WHEN THE NIGHT ENDS', fontFamily: { $t: 'fonts.latin' }, fontSize: 32, fontWeight: '500', color: { $t: 'colors.ink' }, letterSpacing: 9, lineHeight: 1.2, textAlign: 'center', opacity: 0.82, x: 560, y: 600, width: 800, height: 44, zIndex: 8, animation: { name: 'fadeIn', duration: 760, delay: 640 }, editable: { content: true } },
      // ── 演职员表：导演 / 主演 / 类型 · 上映 ───────────────────────
      { id: 'hy-credits', type: 'text', content: '导演 陈屿\n主演 周砚 · 苏禾 · 林岸\n类型 剧情 / 悬疑　2026 · 122 分钟', fontFamily: { $t: 'fonts.meta' }, fontSize: 24, fontWeight: '400', color: { $t: 'colors.muted' }, letterSpacing: 4, lineHeight: 1.9, textAlign: 'center', x: 560, y: 672, width: 800, height: 170, zIndex: 8, animation: { name: 'rise', duration: 820, delay: 760 }, editable: { content: true } },
      // ── 角标编号 ────────────────────────────────────────────────
      { id: 'hy-num', type: 'text', content: 'N° 08', fontFamily: { $t: 'fonts.latin' }, fontSize: 28, fontWeight: '700', color: { $t: 'colors.muted' }, letterSpacing: 3, lineHeight: 1.2, x: 120, y: 864, width: 300, height: 44, zIndex: 8, animation: { name: 'fadeIn', duration: 680, delay: 840 }, editable: { content: true } },
      // ── 下黑条：制作信息 / 版权 ──────────────────────────────────
      { id: 'hy-bar-b-l', type: 'text', content: '原创配乐 林岫 · 剪辑 沈澈', fontFamily: { $t: 'fonts.meta' }, fontSize: 22, fontWeight: '400', color: { $t: 'colors.muted' }, letterSpacing: 4, lineHeight: 1.2, x: 120, y: 972, width: 900, height: 40, zIndex: 8, animation: { name: 'fadeIn', duration: 660, delay: 860 }, editable: { content: true } },
      { id: 'hy-bar-b-r', type: 'text', content: '© 2026 屿山影业 · ALL RIGHTS RESERVED', fontFamily: { $t: 'fonts.meta' }, fontSize: 22, fontWeight: '400', color: { $t: 'colors.muted' }, letterSpacing: 3, lineHeight: 1.2, textAlign: 'right', x: 1100, y: 972, width: 700, height: 40, zIndex: 8, animation: { name: 'fadeIn', duration: 660, delay: 900 }, editable: { content: true } },
      // ── 胶片颗粒 + 暗角 ─────────────────────────────────────────
      { id: 'hy-grain', type: 'overlay', x: 0, y: 0, width: 1920, height: 1080, background: `url("${grainSoft(360, 19, 0.5)}")`, opacity: 0.07, mixBlendMode: 'overlay', zIndex: 30 },
      { id: 'hy-vignette', type: 'overlay', x: 0, y: 0, width: 1920, height: 1080, background: 'radial-gradient(126% 96% at 50% 42%, rgba(0,0,0,0) 44%, rgba(0,0,0,0.6) 100%)', opacity: 0.8, mixBlendMode: 'multiply', zIndex: 31 }
    ]
  }
]

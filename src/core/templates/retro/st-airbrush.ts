// src/core/templates/retro/st-airbrush.ts
// ST 系列 · 九十年代喷枪（1080×1440）｜ 对标 90s airbrush / soft gradient retro 审美
// 柔亮海报感：多层 radial-gradient 喷枪晕染相互渗透 + 放射星芒 + 细金属感弧线；
// 不做地平线网格（vaporwave 位）、不做网点印刷（pop-dots 位）、不做票据（receipt 位）、不做 chrome 渐变。
// ST 标记：id 用 st- 前缀 / 导出名 stAirbrushTemplates / tags 带 st，画面右下角嵌「ST AIRBRUSH 92」。
import type { Template } from '@/types/types'
import { SANS, HEI, SONG, MONO, IMPACT, grainSoft, star, aura } from '../_fx/trend'

export const stAirbrushTemplates: Template[] = [
  {
    id: 'st-airbrush', name: '九十年代喷枪', version: '1.0.0', category: 'retro',
    tags: ['st', 'airbrush', '90s', 'gradient', 'retro', '1080x1440', 'soft', 'poster'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="133" viewBox="0 0 100 133"><defs><radialGradient id="sa" cx="26%" cy="20%" r="62%"><stop offset="0%" stop-color="%23FF5FA2" stop-opacity="0.8"/><stop offset="100%" stop-color="%23FF5FA2" stop-opacity="0"/></radialGradient><radialGradient id="sb" cx="78%" cy="42%" r="58%"><stop offset="0%" stop-color="%234FD8E8" stop-opacity="0.75"/><stop offset="100%" stop-color="%234FD8E8" stop-opacity="0"/></radialGradient><radialGradient id="sc" cx="48%" cy="86%" r="60%"><stop offset="0%" stop-color="%239D6CFF" stop-opacity="0.75"/><stop offset="100%" stop-color="%239D6CFF" stop-opacity="0"/></radialGradient></defs><rect width="100" height="133" fill="%23F7E8F3"/><rect width="100" height="133" fill="url(%23sa)"/><rect width="100" height="133" fill="url(%23sb)"/><rect width="100" height="133" fill="url(%23sc)"/><circle cx="80" cy="24" r="11" fill="none" stroke="%234FD8E8" stroke-width="0.8" opacity="0.85"/><polygon points="50,42 53.5,51.2 63.3,51.7 55.5,57.9 58.2,67.3 50,60 41.8,67.3 44.3,57.9 36.7,51.7 46.5,51.2" fill="%23FFC94D" opacity="0.95"/><rect x="16" y="94" width="52" height="6" rx="3" fill="%233B2350"/><rect x="16" y="105" width="34" height="3.5" rx="1.75" fill="%233B2350" opacity="0.55"/></svg>',
    tokens: {
      colors: {
        bg: { label: '底色', default: '#F7E8F3', options: ['#F7E8F3', '#ECE8FA', '#FCEFE6', '#241B3E'] },
        ink: { label: '文字', default: '#3B2350', options: ['#3B2350', '#2E2A55', '#4A2E3B', '#F5EFFF'] },
        grad1: { label: '晕染·热粉', default: '#FF5FA2', options: ['#FF5FA2', '#C86BFF', '#FF7A8A', '#FF6FB5'] },
        grad2: { label: '晕染·青', default: '#4FD8E8', options: ['#4FD8E8', '#56C7F0', '#7FE3C4', '#5FE3F0'] },
        grad3: { label: '晕染·紫', default: '#9D6CFF', options: ['#9D6CFF', '#6E8BFF', '#FFB46B', '#A98CFF'] },
        accent: { label: '点缀·暖黄', default: '#FFC94D', options: ['#FFC94D', '#FFE08A', '#FFF0A6', '#FFD97A'] }
      },
      fonts: {
        display: { label: '英文标题', default: SANS, options: [SANS, IMPACT, HEI] },
        cjk: { label: '中文', default: HEI, options: [HEI, SANS, SONG] },
        mono: { label: '标记', default: MONO, options: [MONO, SANS, HEI] }
      }
    },
    presets: [
      { name: '桃粉晴青', colors: { bg: '#F7E8F3', ink: '#3B2350', grad1: '#FF5FA2', grad2: '#4FD8E8', grad3: '#9D6CFF', accent: '#FFC94D' } },
      { name: '雾紫湖蓝', colors: { bg: '#ECE8FA', ink: '#2E2A55', grad1: '#C86BFF', grad2: '#56C7F0', grad3: '#6E8BFF', accent: '#FFE08A' } },
      { name: '蜜桃薄荷', colors: { bg: '#FCEFE6', ink: '#4A2E3B', grad1: '#FF7A8A', grad2: '#7FE3C4', grad3: '#FFB46B', accent: '#FFF0A6' } },
      { name: '暮色霓虹', colors: { bg: '#241B3E', ink: '#F5EFFF', grad1: '#FF6FB5', grad2: '#5FE3F0', grad3: '#A98CFF', accent: '#FFD97A' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1440, defaultWidth: 1080, defaultHeight: 1440, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      // —— 喷枪晕染底层：多层 radial-gradient 相互渗透（色相限定 热粉 / 青 / 紫，暖黄只作点缀）——
      { id: 'st-ab-wash1', group: 'st-ab-wash', type: 'overlay', x: 0, y: 0, width: 1080, height: 1440, background: 'radial-gradient(62% 44% at 22% 16%, rgba(255,95,162,0.55) 0%, rgba(255,95,162,0.24) 46%, rgba(255,95,162,0) 74%)', opacity: 0.9, zIndex: 2, animation: { name: 'gradientPan', duration: 16000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-ab-wash2', group: 'st-ab-wash', type: 'overlay', x: 0, y: 0, width: 1080, height: 1440, background: 'radial-gradient(56% 40% at 84% 38%, rgba(79,216,232,0.52) 0%, rgba(79,216,232,0.22) 48%, rgba(79,216,232,0) 76%)', opacity: 0.9, zIndex: 3, animation: { name: 'gradientPan', duration: 19000, delay: 1200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-ab-wash3', group: 'st-ab-wash', type: 'overlay', x: 0, y: 0, width: 1080, height: 1440, background: 'radial-gradient(68% 46% at 46% 88%, rgba(157,108,255,0.5) 0%, rgba(157,108,255,0.2) 50%, rgba(157,108,255,0) 78%)', opacity: 0.9, zIndex: 4, animation: { name: 'gradientPan', duration: 21000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-ab-wash4', group: 'st-ab-wash', type: 'overlay', x: 0, y: 0, width: 1080, height: 1440, background: 'radial-gradient(46% 30% at 50% 63%, rgba(255,201,77,0.32) 0%, rgba(255,201,77,0.12) 54%, rgba(255,201,77,0) 80%)', opacity: 0.9, zIndex: 5, animation: { name: 'float', duration: 15000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-ab-wash5', group: 'st-ab-wash', type: 'overlay', x: 0, y: 0, width: 1080, height: 1440, background: 'radial-gradient(34% 22% at 78% 9%, rgba(255,95,162,0.3) 0%, rgba(255,95,162,0) 70%)', opacity: 0.85, zIndex: 6, animation: { name: 'gradientPan', duration: 24000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-ab-veil', type: 'overlay', x: 0, y: 0, width: 1080, height: 1440, background: 'radial-gradient(85% 65% at 50% 42%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 62%)', opacity: 0.6, zIndex: 7, animation: { name: 'float', duration: 18000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      // 左上角青色调柔光团（同心圆堆叠，跟随 token 换色）
      ...aura('st-ab-aura', 260, 320, 230, 'colors.grad2', 6),
      // 细金属感弧线（透明填充 + 细 border + 旋转，低透明度）
      { id: 'st-ab-arc1', group: 'st-ab-arc', type: 'shape', shapeKind: 'circle', x: 580, y: 240, width: 430, height: 430, fill: 'transparent', border: { width: 2, color: { $t: 'colors.grad2' } }, opacity: 0.42, rotation: 12, zIndex: 8 },
      { id: 'st-ab-arc2', group: 'st-ab-arc', type: 'shape', shapeKind: 'circle', x: 60, y: 500, width: 340, height: 340, fill: 'transparent', border: { width: 1.5, color: { $t: 'colors.grad1' } }, opacity: 0.35, rotation: -8, zIndex: 8 },
      { id: 'st-ab-arc3', group: 'st-ab-arc', type: 'shape', shapeKind: 'circle', x: 660, y: 560, width: 270, height: 270, fill: 'transparent', border: { width: 1.5, color: { $t: 'colors.grad3' } }, opacity: 0.3, rotation: 24, zIndex: 8 },
      // 放射星芒（主体三枚 + 三枚小闪）
      { id: 'st-ab-star1', group: 'st-ab-star', type: 'overlay', x: 70, y: 330, width: 230, height: 230, rotation: 6, background: `url("${star(230, '%23FF5FA2')}")`, opacity: 0.5, zIndex: 9, animation: { name: 'twinkle', duration: 4800, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-ab-star2', group: 'st-ab-star', type: 'overlay', x: 810, y: 430, width: 170, height: 170, rotation: -12, background: `url("${star(170, '%234FD8E8')}")`, opacity: 0.6, zIndex: 9, animation: { name: 'sparkle', duration: 5600, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-ab-star3', group: 'st-ab-star', type: 'overlay', x: 170, y: 690, width: 140, height: 140, rotation: 18, background: `url("${star(140, '%23FFC94D')}")`, opacity: 0.8, zIndex: 9, animation: { name: 'twinkle', duration: 4200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-ab-star4', group: 'st-ab-star', type: 'overlay', x: 870, y: 700, width: 100, height: 100, rotation: -20, background: `url("${star(100, '%239D6CFF')}")`, opacity: 0.55, zIndex: 9, animation: { name: 'sparkle', duration: 6200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-ab-star5', group: 'st-ab-star', type: 'overlay', x: 900, y: 240, width: 80, height: 80, rotation: 30, background: `url("${star(80, '%23FF5FA2')}")`, opacity: 0.5, zIndex: 9, animation: { name: 'twinkle', duration: 5400, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-ab-star6', group: 'st-ab-star', type: 'overlay', x: 455, y: 745, width: 64, height: 64, rotation: -8, background: `url("${star(64, '%23FFC94D')}")`, opacity: 0.75, zIndex: 9, animation: { name: 'sparkle', duration: 5000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      // 顶部：眉标 + 短 accent 线 + 胶囊徽标
      { id: 'st-ab-rule-top', type: 'shape', shapeKind: 'rect', x: 96, y: 200, width: 120, height: 3, borderRadius: 1.5, fill: { $t: 'colors.accent' }, zIndex: 9, animation: { name: 'fadeIn', duration: 600, delay: 100 } },
      { id: 'st-ab-kicker', type: 'text', content: 'SOFT FOCUS SERIES', fontFamily: { $t: 'fonts.display' }, fontSize: 28, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.75, letterSpacing: 8, x: 96, y: 96, width: 640, height: 44, zIndex: 11, animation: { name: 'fadeIn', duration: 700 }, editable: { content: true } },
      { id: 'st-ab-badge', type: 'shape', shapeKind: 'rect', x: 812, y: 84, width: 172, height: 54, borderRadius: 27, fill: { $t: 'colors.ink' }, zIndex: 11, animation: { name: 'fadeInUp', duration: 700, delay: 80 } },
      { id: 'st-ab-badge-t', type: 'text', content: 'VOL.92', fontFamily: { $t: 'fonts.mono' }, fontSize: 22, fontWeight: '700', color: { $t: 'colors.bg' }, letterSpacing: 3, textAlign: 'center', lineHeight: 2.45, x: 812, y: 84, width: 172, height: 54, zIndex: 12, animation: { name: 'fadeIn', duration: 600, delay: 200 }, editable: { content: true } },
      // 主标题：粗圆体大字 + 错位重影（echo 豁免）
      { id: 'st-ab-title-echo', type: 'text', content: 'AIRBRUSH', fontFamily: { $t: 'fonts.display' }, fontSize: 140, fontWeight: '800', color: { $t: 'colors.grad1' }, opacity: 0.35, letterSpacing: 2, textAlign: 'center', lineHeight: 1, x: 72, y: 890, width: 960, height: 160, zIndex: 10, animation: { name: 'fadeIn', duration: 800, delay: 150 } },
      { id: 'st-ab-title', type: 'text', content: 'AIRBRUSH', fontFamily: { $t: 'fonts.display' }, fontSize: 140, fontWeight: '800', color: { $t: 'colors.ink' }, letterSpacing: 2, textAlign: 'center', lineHeight: 1, x: 60, y: 880, width: 960, height: 160, zIndex: 12, shadow: { offsetX: 0, offsetY: 10, blur: 28, color: { $t: 'colors.grad3' } }, animation: { name: 'fadeInUp', duration: 900 }, editable: { content: true, fontSize: { type: 'range', min: 110, max: 160 } } },
      { id: 'st-ab-sub-cn', type: 'text', content: '把渐变喷成一片柔软的旧时光', fontFamily: { $t: 'fonts.cjk' }, fontSize: 36, color: { $t: 'colors.ink' }, opacity: 0.88, letterSpacing: 2, x: 96, y: 1058, width: 760, height: 56, lineHeight: 1.3, zIndex: 12, animation: { name: 'rise', duration: 900, delay: 200 }, editable: { content: true } },
      { id: 'st-ab-tag', type: 'text', content: 'GRADIENTS THAT BREATHE · 1992', fontFamily: { $t: 'fonts.display' }, fontSize: 25, color: { $t: 'colors.ink' }, opacity: 0.6, letterSpacing: 5, x: 96, y: 1128, width: 700, height: 40, lineHeight: 1.3, zIndex: 11, animation: { name: 'fadeIn', duration: 700, delay: 300 }, editable: { content: true } },
      // 底部：细线 + 信息行 + ST 暗标
      { id: 'st-ab-divider', type: 'shape', shapeKind: 'line', x: 96, y: 1200, width: 888, height: 2, fill: { $t: 'colors.ink' }, opacity: 0.25, zIndex: 9, animation: { name: 'fadeIn', duration: 500, delay: 320 } },
      { id: 'st-ab-info1', type: 'text', content: 'AIRBRUSH STUDIO — EST.1992', fontFamily: { $t: 'fonts.mono' }, fontSize: 22, color: { $t: 'colors.ink' }, letterSpacing: 3, x: 96, y: 1256, width: 500, height: 36, lineHeight: 1.3, zIndex: 11, animation: { name: 'rise', duration: 700, delay: 400 }, editable: { content: true } },
      { id: 'st-ab-info2', type: 'text', content: '空气喷枪工作室 · 一九九二年春', fontFamily: { $t: 'fonts.cjk' }, fontSize: 22, color: { $t: 'colors.ink' }, opacity: 0.75, letterSpacing: 2, x: 96, y: 1302, width: 560, height: 36, lineHeight: 1.3, zIndex: 11, animation: { name: 'rise', duration: 700, delay: 460 }, editable: { content: true } },
      { id: 'st-ab-info3', type: 'text', content: 'EDITION 92 / 1080×1440', fontFamily: { $t: 'fonts.mono' }, fontSize: 22, color: { $t: 'colors.ink' }, opacity: 0.75, letterSpacing: 3, textAlign: 'right', x: 560, y: 1256, width: 424, height: 36, lineHeight: 1.3, zIndex: 11, animation: { name: 'rise', duration: 700, delay: 520 } },
      { id: 'st-ab-mark', type: 'text', content: 'ST AIRBRUSH 92', fontFamily: { $t: 'fonts.mono' }, fontSize: 19, color: { $t: 'colors.ink' }, opacity: 0.55, letterSpacing: 5, textAlign: 'right', x: 560, y: 1350, width: 424, height: 30, lineHeight: 1.3, zIndex: 11, animation: { name: 'fadeIn', duration: 600, delay: 600 } },
      // 全画面极淡颗粒
      { id: 'st-ab-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1440, background: `url("${grainSoft(320, 41, 0.5)}")`, opacity: 0.05, mixBlendMode: 'overlay', zIndex: 20 }
    ]
  }
]

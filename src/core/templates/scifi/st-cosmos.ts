// src/core/templates/scifi/st-cosmos.ts
// ST 系列 · 星轨宇宙（4:5 竖版）｜ 深空底 + 带环行星 + 椭圆轨道弧 + 密集星点的天文图录秩序感
// 隐性标记：id 前缀 st- / 导出名 stCosmosTemplates / tags 含 st / 画面藏 ST 短串（顶部小字、行星背后大字、底部暗标记）
import type { Template } from '@/types/types'
import { SANS, HEI, MONO, SERIF, SONG, IMPACT, starfield, star, grainSoft, aura } from '../_fx/trend'

export const stCosmosTemplates: Template[] = [
  {
    id: 'st-cosmos', name: '星轨宇宙', version: '1.0.0', category: 'scifi',
    tags: ['st', 'cosmos', 'space', 'orbit', 'planet', 'starfield', 'celestial', 'observatory', '4:5'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="125" viewBox="0 0 100 125"><rect width="100" height="125" fill="%2305070F"/><ellipse cx="60" cy="38" rx="36" ry="12" fill="none" stroke="%234A5578" stroke-width="0.8" opacity="0.9" transform="rotate(-18 60 38)"/><ellipse cx="47" cy="66" rx="27" ry="18" fill="none" stroke="%234A5578" stroke-width="0.6" opacity="0.5" transform="rotate(-22 47 66)"/><ellipse cx="62" cy="52" rx="21" ry="30" fill="none" stroke="%234A5578" stroke-width="0.6" opacity="0.45" transform="rotate(8 62 52)"/><circle cx="60" cy="38" r="12" fill="%238892B8"/><ellipse cx="60" cy="38" rx="26" ry="8.5" fill="none" stroke="%23F4F7FF" stroke-width="1.7" opacity="0.9" transform="rotate(-18 60 38)"/><circle cx="15" cy="13" r="1.3" fill="%23FFFFFF" opacity="0.9"/><circle cx="88" cy="21" r="0.9" fill="%23FFFFFF" opacity="0.7"/><circle cx="86" cy="74" r="1.1" fill="%23FFFFFF" opacity="0.65"/><circle cx="27" cy="93" r="1.4" fill="%23FFFFFF" opacity="0.8"/><circle cx="73" cy="103" r="1" fill="%23FFFFFF" opacity="0.6"/><rect x="10" y="10" width="26" height="1.8" fill="%23F4F7FF" opacity="0.8"/><rect x="76" y="7" width="18" height="6" rx="3" fill="none" stroke="%2386D9C8" stroke-width="0.7" opacity="0.9"/><rect x="10" y="109" width="30" height="2.4" fill="%23F4F7FF" opacity="0.9"/><rect x="10" y="114.5" width="18" height="2.4" fill="%23F4F7FF" opacity="0.5"/><rect x="66" y="109" width="20" height="2.4" fill="%2386D9C8" opacity="0.9"/></svg>',
    tokens: {
      colors: {
        bg: { label: '深空底色', default: '#05070F', options: ['#05070F', '#070B16', '#0A0A12', '#0C0A14'] },
        ink: { label: '文字', default: '#F4F7FF', options: ['#F4F7FF', '#EAF0FA', '#FFFFFF', '#F2ECF9'] },
        planet: { label: '行星', default: '#8892B8', options: ['#8892B8', '#C7AE8D', '#9DB4C8', '#B8A9D4'] },
        orbit: { label: '轨道线', default: '#4A5578', options: ['#4A5578', '#3E4A6B', '#554A6B', '#3F5566'] },
        star: { label: '星点', default: '#FFFFFF', options: ['#FFFFFF', '#F4F7FF', '#EAF2FF', '#FFF4E0'] },
        accent: { label: '仪器点缀', default: '#86D9C8', options: ['#86D9C8', '#E3C88F', '#8FB8E8', '#D8A7C8'] }
      },
      fonts: {
        display: { label: '英文标题', default: SANS, options: [SANS, SERIF, IMPACT] },
        mono: { label: '等宽数据', default: MONO, options: [MONO, SANS, HEI] },
        cjk: { label: '中文', default: HEI, options: [HEI, SONG, SANS] }
      }
    },
    presets: [
      { name: '靛夜观测', colors: { bg: '#05070F', ink: '#F4F7FF', planet: '#8892B8', orbit: '#4A5578', star: '#FFFFFF', accent: '#86D9C8' } },
      { name: '金沙深空', colors: { bg: '#0A0A12', ink: '#F2ECF9', planet: '#C7AE8D', orbit: '#554A6B', star: '#FFF4E0', accent: '#E3C88F' } },
      { name: '冰蓝信标', colors: { bg: '#070B16', ink: '#EAF0FA', planet: '#9DB4C8', orbit: '#3E4A6B', star: '#EAF2FF', accent: '#8FB8E8' } },
      { name: '暮紫轨道', colors: { bg: '#0C0A14', ink: '#F4F7FF', planet: '#B8A9D4', orbit: '#3F5566', star: '#FFFFFF', accent: '#D8A7C8' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      // 深空底：星点场 + 行星大气晕
      { id: 'st-cs-starfield', type: 'overlay', x: 0, y: 0, width: 1080, height: 1350, background: `url("${starfield(1080, 1350, 140, '%23ffffff', 31)}")`, opacity: 0.45, zIndex: 1 },
      ...aura('st-cs-glow', 700, 430, 300, 'colors.planet', 4),
      // 行星背后隐藏的 ST 签名（豁免 id，不参与字冲）
      { id: 'st-cs-bigmark', type: 'text', content: 'ST', fontFamily: { $t: 'fonts.display' }, fontSize: 240, fontWeight: '800', color: { $t: 'colors.ink' }, opacity: 0.08, textAlign: 'center', lineHeight: 1.2, x: 490, y: 250, width: 420, height: 360, zIndex: 1 },
      // 观测十字线（穿过行星中心，中段被星体遮住）
      { id: 'st-cs-cross-h', type: 'shape', shapeKind: 'line', x: 400, y: 429, width: 600, height: 2, fill: { $t: 'colors.orbit' }, opacity: 0.3, zIndex: 1 },
      { id: 'st-cs-cross-v', type: 'shape', shapeKind: 'line', x: 699, y: 160, width: 2, height: 540, fill: { $t: 'colors.orbit' }, opacity: 0.3, zIndex: 1 },
      // 轨道弧线：细描边椭圆 + 各自倾角，错落穿过画面
      { id: 'st-cs-orbit1', group: 'st-cs-orbit', type: 'shape', shapeKind: 'circle', x: 200, y: 90, width: 720, height: 540, fill: 'transparent', border: { width: 2, color: { $t: 'colors.orbit' } }, opacity: 0.5, rotation: 12, zIndex: 2, animation: { name: 'drift', duration: 18000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-cs-orbit2', group: 'st-cs-orbit', type: 'shape', shapeKind: 'circle', x: 70, y: 520, width: 520, height: 360, fill: 'transparent', border: { width: 2, color: { $t: 'colors.orbit' } }, opacity: 0.45, rotation: -22, zIndex: 2, animation: { name: 'drift', duration: 22000, delay: 800, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-cs-orbit3', group: 'st-cs-orbit', type: 'shape', shapeKind: 'circle', x: 430, y: 140, width: 560, height: 780, fill: 'transparent', border: { width: 2, color: { $t: 'colors.orbit' } }, opacity: 0.4, rotation: 8, zIndex: 2, animation: { name: 'drift', duration: 16000, delay: 400, iterationCount: 'infinite', easing: 'ease-in-out' } },
      // 外环（压在行星背后）
      { id: 'st-cs-ring-outer', type: 'shape', shapeKind: 'circle', x: 360, y: 312, width: 680, height: 236, fill: 'transparent', border: { width: 3, color: { $t: 'colors.orbit' } }, opacity: 0.45, rotation: -18, zIndex: 2, animation: { name: 'spinSlow', duration: 42000, iterationCount: 'infinite', easing: 'linear' } },
      // 行星：实心星体 + 受光面高光 + 晨昏线暗部
      { id: 'st-cs-planet', type: 'shape', shapeKind: 'circle', x: 510, y: 240, width: 380, height: 380, fill: { $t: 'colors.planet' }, zIndex: 3, animation: { name: 'zoomIn', duration: 900, easing: 'ease-out' } },
      { id: 'st-cs-planet-lit', type: 'overlay', x: 510, y: 240, width: 380, height: 380, background: 'radial-gradient(30% 28% at 32% 26%, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 62%)', zIndex: 4 },
      { id: 'st-cs-planet-term', type: 'overlay', x: 510, y: 240, width: 380, height: 380, background: 'radial-gradient(100% 100% at 68% 76%, rgba(3,5,14,0.5) 0%, rgba(3,5,14,0) 58%)', zIndex: 4 },
      // 主环：压扁椭圆从行星前面穿过，极慢进动
      { id: 'st-cs-ring', type: 'shape', shapeKind: 'circle', x: 420, y: 335, width: 560, height: 190, fill: 'transparent', border: { width: 8, color: { $t: 'colors.star' } }, opacity: 0.6, rotation: -18, zIndex: 5, animation: { name: 'spinSlow', duration: 26000, iterationCount: 'infinite', easing: 'linear' } },
      // 星芒点缀
      { id: 'st-cs-spark1', group: 'st-cs-spark', type: 'overlay', x: 852, y: 152, width: 64, height: 64, background: `url("${star(64, '%23ffffff')}")`, opacity: 0.9, zIndex: 5, animation: { name: 'twinkle', duration: 3000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-cs-spark2', group: 'st-cs-spark', type: 'overlay', x: 150, y: 308, width: 44, height: 44, background: `url("${star(44, '%23ffffff')}")`, opacity: 0.75, zIndex: 5, animation: { name: 'twinkle', duration: 3600, delay: 400, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-cs-spark3', group: 'st-cs-spark', type: 'overlay', x: 938, y: 752, width: 52, height: 52, background: `url("${star(52, '%23ffffff')}")`, opacity: 0.8, zIndex: 5, animation: { name: 'twinkle', duration: 2800, delay: 800, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-cs-spark4', group: 'st-cs-spark', type: 'overlay', x: 282, y: 118, width: 36, height: 36, background: `url("${star(36, '%23ffffff')}")`, opacity: 0.65, zIndex: 5, animation: { name: 'twinkle', duration: 3200, delay: 1200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      // 亮星点（带辉光）
      { id: 'st-cs-dot1', group: 'st-cs-dot', type: 'shape', shapeKind: 'circle', x: 616, y: 176, width: 6, height: 6, fill: { $t: 'colors.star' }, opacity: 0.9, zIndex: 5, shadow: { offsetX: 0, offsetY: 0, blur: 10, color: { $t: 'colors.star' } }, animation: { name: 'twinkle', duration: 2600, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-cs-dot2', group: 'st-cs-dot', type: 'shape', shapeKind: 'circle', x: 884, y: 556, width: 6, height: 6, fill: { $t: 'colors.star' }, opacity: 0.85, zIndex: 5, shadow: { offsetX: 0, offsetY: 0, blur: 10, color: { $t: 'colors.star' } }, animation: { name: 'twinkle', duration: 3400, delay: 600, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-cs-dot3', group: 'st-cs-dot', type: 'shape', shapeKind: 'circle', x: 246, y: 756, width: 5, height: 5, fill: { $t: 'colors.star' }, opacity: 0.8, zIndex: 5, shadow: { offsetX: 0, offsetY: 0, blur: 8, color: { $t: 'colors.star' } }, animation: { name: 'twinkle', duration: 3000, delay: 300, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'st-cs-dot4', group: 'st-cs-dot', type: 'shape', shapeKind: 'circle', x: 986, y: 296, width: 5, height: 5, fill: { $t: 'colors.star' }, opacity: 0.75, zIndex: 5, shadow: { offsetX: 0, offsetY: 0, blur: 8, color: { $t: 'colors.star' } }, animation: { name: 'twinkle', duration: 3800, delay: 900, iterationCount: 'infinite', easing: 'ease-in-out' } },
      // 图录细框 + 仪器徽标
      { id: 'st-cs-frame', type: 'shape', shapeKind: 'rect', x: 48, y: 48, width: 984, height: 1254, fill: 'transparent', border: { width: 1, color: { $t: 'colors.orbit' } }, opacity: 0.35, zIndex: 6, animation: { name: 'fadeIn', duration: 800, delay: 200 } },
      { id: 'st-cs-badge', type: 'shape', shapeKind: 'rect', x: 724, y: 64, width: 260, height: 64, fill: 'transparent', border: { width: 1.5, color: { $t: 'colors.accent' } }, borderRadius: 32, opacity: 0.85, zIndex: 6, animation: { name: 'fadeIn', duration: 600, delay: 80 } },
      { id: 'st-cs-badge-t', type: 'text', content: 'CATALOG 04', fontFamily: { $t: 'fonts.mono' }, fontSize: 22, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 2, textAlign: 'center', lineHeight: 2.9, x: 724, y: 64, width: 260, height: 64, zIndex: 7, animation: { name: 'fadeIn', duration: 600, delay: 100 }, editable: { content: true } },
      // 顶部数据行（含 ST 短串）
      { id: 'st-cs-kicker', type: 'text', content: 'ST ORBIT / 68°N', fontFamily: { $t: 'fonts.mono' }, fontSize: 26, fontWeight: '600', color: { $t: 'colors.ink' }, opacity: 0.85, letterSpacing: 6, x: 96, y: 72, width: 700, height: 40, zIndex: 7, animation: { name: 'fadeIn', duration: 600 }, editable: { content: true } },
      { id: 'st-cs-tag', type: 'text', content: 'R-68B · RING SYSTEM', fontFamily: { $t: 'fonts.mono' }, fontSize: 20, fontWeight: '600', color: { $t: 'colors.accent' }, opacity: 0.75, letterSpacing: 2, x: 96, y: 132, width: 320, height: 28, zIndex: 7, animation: { name: 'fadeIn', duration: 600, delay: 60 }, editable: { content: true } },
      // 大标题 + 中文副题（单行，宽度留 15%+ 余量）
      { id: 'st-cs-title', type: 'text', content: 'DEEP FIELD', fontFamily: { $t: 'fonts.display' }, fontSize: 124, fontWeight: '800', color: { $t: 'colors.ink' }, letterSpacing: 2, lineHeight: 1.05, x: 96, y: 940, width: 888, height: 124, zIndex: 7, shadow: { offsetX: 0, offsetY: 8, blur: 36, color: { $t: 'colors.bg' } }, animation: { name: 'fadeInUp', duration: 900, delay: 150 }, editable: { content: true, fontSize: { type: 'range', min: 100, max: 150 } } },
      { id: 'st-cs-sub', type: 'text', content: '一次对准深空的长时间曝光。', fontFamily: { $t: 'fonts.cjk' }, fontSize: 34, fontWeight: '500', color: { $t: 'colors.ink' }, opacity: 0.85, letterSpacing: 4, x: 96, y: 1084, width: 888, height: 52, zIndex: 7, animation: { name: 'rise', duration: 900, delay: 300 }, editable: { content: true } },
      // 图录分隔线 + 观测元数据
      { id: 'st-cs-rule', type: 'shape', shapeKind: 'line', x: 96, y: 1172, width: 888, height: 1, fill: { $t: 'colors.orbit' }, opacity: 0.55, zIndex: 6, animation: { name: 'fadeIn', duration: 600, delay: 380 } },
      { id: 'st-cs-meta1', type: 'text', content: 'EXPOSURE 240S · f/1.8 · ISO 800', fontFamily: { $t: 'fonts.mono' }, fontSize: 26, fontWeight: '600', color: { $t: 'colors.ink' }, opacity: 0.8, letterSpacing: 2, x: 96, y: 1200, width: 888, height: 36, zIndex: 7, animation: { name: 'fadeIn', duration: 700, delay: 420 }, editable: { content: true } },
      { id: 'st-cs-meta2', type: 'text', content: '目标 R-68B · 环系倾角 18°', fontFamily: { $t: 'fonts.cjk' }, fontSize: 26, fontWeight: '500', color: { $t: 'colors.ink' }, opacity: 0.65, letterSpacing: 2, x: 96, y: 1246, width: 888, height: 36, zIndex: 7, animation: { name: 'fadeIn', duration: 700, delay: 480 }, editable: { content: true } },
      // 左下 ST 暗标记 + 右下坐标
      { id: 'st-cs-mark', type: 'text', content: 'ST ORBIT · 68°N', fontFamily: { $t: 'fonts.mono' }, fontSize: 22, fontWeight: '600', color: { $t: 'colors.ink' }, opacity: 0.45, letterSpacing: 3, x: 96, y: 1292, width: 420, height: 30, zIndex: 7, animation: { name: 'fadeIn', duration: 700, delay: 540 }, editable: { content: true } },
      { id: 'st-cs-coord', type: 'text', content: "N 68°22' / E 33°51'", fontFamily: { $t: 'fonts.mono' }, fontSize: 22, fontWeight: '600', color: { $t: 'colors.ink' }, opacity: 0.55, letterSpacing: 1, textAlign: 'right', x: 664, y: 1292, width: 320, height: 30, zIndex: 7, animation: { name: 'fadeIn', duration: 700, delay: 560 }, editable: { content: true } },
      // 胶片颗粒收尾
      { id: 'st-cs-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1350, background: `url("${grainSoft(320, 11, 0.5)}")`, opacity: 0.05, mixBlendMode: 'multiply', zIndex: 9 }
    ]
  }
]

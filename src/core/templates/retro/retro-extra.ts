// src/core/templates/retro/retro-extra.ts —— 复古风（5 个）
import type { Template } from '@/types/types'

// 胶片齿孔竖条
const SPROCKET_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 600"><rect width="60" height="600" fill="%2326160a"/><g fill="%23f3ead8"><rect x="16" y="20" width="28" height="34" rx="6"/><rect x="16" y="90" width="28" height="34" rx="6"/><rect x="16" y="160" width="28" height="34" rx="6"/><rect x="16" y="230" width="28" height="34" rx="6"/><rect x="16" y="300" width="28" height="34" rx="6"/><rect x="16" y="370" width="28" height="34" rx="6"/><rect x="16" y="440" width="28" height="34" rx="6"/><rect x="16" y="510" width="28" height="34" rx="6"/></g></svg>'

// 黑胶唱片（干净盘体：密纹交给元素层同心圆环，标签交给元素层，转起来才看得出在转）
const VINYL_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><circle cx="200" cy="200" r="197" fill="%231a140f"/><circle cx="200" cy="200" r="197" fill="none" stroke="%234a3f35" stroke-width="2"/><circle cx="200" cy="200" r="108" fill="%23241b12"/><g fill="none" stroke="%2357493a" stroke-width="1.2" opacity="0.6"><circle cx="200" cy="200" r="186"/><circle cx="200" cy="200" r="120"/></g></svg>'

// 半调网点圆斑（报纸照片感）
const HALFTONE_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160"><defs><radialGradient id="hg"><stop offset="0%" stop-color="%23111111" stop-opacity="1"/><stop offset="100%" stop-color="%23111111" stop-opacity="0.15"/></radialGradient></defs><rect width="160" height="160" fill="url(%23hg)"/></svg>'

// 太阳放射纹（西部标章底纹：循环放射线 + 淡日轮）
const SUNBURST_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000"><g fill="%23a16207" opacity="0.13" transform="translate(500 520)">'
  + Array.from({ length: 24 }, (_, i) => `<path d="M0 0 L-26 -560 L26 -560 Z" transform="rotate(${i * 15})"/>`).join('')
  + '</g><g fill="none" stroke="%23432818" opacity="0.08"><circle cx="500" cy="520" r="300" stroke-width="2"/><circle cx="500" cy="520" r="380" stroke-width="1.5" stroke-dasharray="6 10"/></g><g fill="%23432818" opacity="0.07"><circle cx="120" cy="160" r="2"/><circle cx="880" cy="230" r="1.8"/><circle cx="180" cy="820" r="2.2"/><circle cx="820" cy="880" r="1.8"/></g></svg>'

// ===== 美化新增层（REX_ 前缀：本文件专用）=====
// 黑胶：高光反射弧（叠在密纹之上，盘转光不动）
const REX_GLINT_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><g fill="none" stroke="%23ffffff" stroke-linecap="round"><path d="M56 138 A176 176 0 0 1 134 52" stroke-width="15" opacity="0.14"/><path d="M66 156 A162 162 0 0 1 142 74" stroke-width="5" opacity="0.10"/><path d="M344 262 A176 176 0 0 1 268 348" stroke-width="11" opacity="0.09"/></g></svg>'

// 黑胶：灰尘、细划痕与指纹（做旧瑕疵层）
const REX_VINYL_DUST_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><g stroke="%23ffffff" stroke-linecap="round" fill="none" opacity="0.45"><path d="M96 78 L120 102" stroke-width="1.2"/><path d="M308 120 L298 162" stroke-width="1"/><path d="M150 318 L178 338" stroke-width="1.4"/><path d="M262 286 L290 264" stroke-width="1"/><path d="M212 60 L206 42" stroke-width="1.1"/><path d="M74 232 L92 246" stroke-width="1"/></g><g fill="%23ffffff" opacity="0.3"><circle cx="128" cy="214" r="1.6"/><circle cx="286" cy="198" r="1.3"/><circle cx="198" cy="302" r="1.7"/><circle cx="240" cy="130" r="1.2"/><circle cx="164" cy="150" r="1.4"/><circle cx="228" cy="236" r="1.1"/></g><circle cx="248" cy="228" r="34" fill="none" stroke="%23ffffff" stroke-width="1" opacity="0.07"/></svg>'

// 胶片：横向齿孔条（上下各一条，循环小方孔）
const REX_SPROCKET_H_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 832 60"><rect width="832" height="60" fill="%2326160a"/><g fill="%23f3ead8">'
  + Array.from({ length: 11 }, (_, i) => `<rect x="${28 + i * 74}" y="15" width="38" height="30" rx="7"/>`).join('')
  + '</g><g fill="%23f3ead8" opacity="0.25"><rect width="832" height="2"/><rect y="58" width="832" height="2"/></g></svg>'

// 胶片：星爆促销章（循环锯齿）
const REX_STARBURST_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><g fill="%23b3541e">'
  + Array.from({ length: 18 }, (_, i) => {
    const a1 = ((i * 20 - 90) * Math.PI) / 180, a2 = (((i + 0.5) * 20 - 90) * Math.PI) / 180
    return `<path d="M100 100 L${(100 + 96 * Math.cos(a1)).toFixed(1)} ${(100 + 96 * Math.sin(a1)).toFixed(1)} L${(100 + 68 * Math.cos(a2)).toFixed(1)} ${(100 + 68 * Math.sin(a2)).toFixed(1)} Z"/>`
  }).join('')
  + '</g><circle cx="100" cy="100" r="62" fill="%23f3ead8"/><circle cx="100" cy="100" r="54" fill="none" stroke="%2326160a" stroke-width="2" stroke-dasharray="5 5"/></svg>'

// 拍立得：背景散点纸屑（牛皮桌上的碎屑）
const REX_SPECK_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><g fill="%234a3728" opacity="0.2">'
  + Array.from({ length: 34 }, (_, i) => `<circle cx="${(i * 173 + 41) % 1000}" cy="${(i * 389 + 97) % 1000}" r="${(1 + (i * 7) % 5 * 0.6).toFixed(1)}"/>`).join('')
  + '</g><g fill="%23b91c1c" opacity="0.14">'
  + Array.from({ length: 9 }, (_, i) => `<rect x="${(i * 311 + 128) % 960}" y="${(i * 517 + 233) % 960}" width="${(5 + (i % 3) * 3)}" height="2" rx="1" transform="rotate(${(i * 37) % 180} ${(i * 311 + 128) % 960} ${(i * 517 + 233) % 960})"/>`).join('')
  + '</g></svg>'

// 拍立得：相纸颗粒 + 头发丝划痕（瑕疵层）
const REX_PHOTO_GRAIN_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 340"><g fill="%23ffffff" opacity="0.42">'
  + Array.from({ length: 64 }, (_, i) => `<circle cx="${(i * 97 + 13) % 332}" cy="${(i * 151 + 29) % 332}" r="${(0.6 + (i % 3) * 0.5).toFixed(1)}"/>`).join('')
  + '</g><g stroke="%23ffffff" opacity="0.26" stroke-width="1" fill="none"><path d="M62 12 L58 98"/><path d="M256 218 L264 318"/><path d="M148 40 L142 92"/><path d="M300 60 L292 118"/></g></svg>'

export const retroExtraTemplates: Template[] = [
  {
    id: 'retro-film-poster', name: '胶片放映厅', version: '1.0.0', category: 'retro',
    tags: ['retro', 'film', 'cinema', 'sepia', 'vintage'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23f3ead8"/><rect width="100" height="9" fill="%2326160a"/><rect y="91" width="100" height="9" fill="%2326160a"/><rect x="3" width="10" height="100" fill="%2326160a"/><rect x="87" width="10" height="100" fill="%2326160a"/><g fill="%23f3ead8"><rect x="5" y="12" width="6" height="8" rx="2"/><rect x="5" y="30" width="6" height="8" rx="2"/><rect x="5" y="48" width="6" height="8" rx="2"/><rect x="5" y="66" width="6" height="8" rx="2"/><rect x="89" y="12" width="6" height="8" rx="2"/><rect x="89" y="30" width="6" height="8" rx="2"/><rect x="89" y="48" width="6" height="8" rx="2"/><rect x="89" y="66" width="6" height="8" rx="2"/><rect x="19" y="2" width="7" height="5" rx="1.5"/><rect x="33" y="2" width="7" height="5" rx="1.5"/><rect x="47" y="2" width="7" height="5" rx="1.5"/><rect x="61" y="2" width="7" height="5" rx="1.5"/><rect x="75" y="2" width="7" height="5" rx="1.5"/><rect x="19" y="93" width="7" height="5" rx="1.5"/><rect x="33" y="93" width="7" height="5" rx="1.5"/><rect x="47" y="93" width="7" height="5" rx="1.5"/><rect x="61" y="93" width="7" height="5" rx="1.5"/><rect x="75" y="93" width="7" height="5" rx="1.5"/></g><g fill="%2326160a" opacity="0.06"><rect x="17" width="11" height="91"/><rect x="63" y="9" width="7" height="82"/></g><circle cx="50" cy="36" r="15" fill="none" stroke="%23b3541e" stroke-width="3"/><circle cx="50" cy="36" r="8" fill="none" stroke="%2326160a" stroke-width="1" stroke-dasharray="2 2"/><circle cx="50" cy="36" r="2" fill="%23b3541e"/><g stroke="%2326160a" opacity="0.35"><path d="M28 14 L27 44" stroke-width="0.8"/><path d="M72 40 L73 78" stroke-width="0.8"/></g><rect x="34" y="54" width="32" height="5" fill="%2326160a"/><rect x="10" y="14" width="20" height="8" rx="1" fill="%2326160a" transform="rotate(-5 20 18)"/><g fill="none" stroke="%23b3541e"><circle cx="80" cy="20" r="11" stroke-width="2.5"/><circle cx="80" cy="20" r="7.5" stroke-width="1" stroke-dasharray="2 2"/></g><rect x="26" y="66" width="48" height="4" fill="%2326160a"/><rect x="32" y="73" width="36" height="2" fill="%2326160a" opacity="0.6"/><rect x="36" y="78" width="28" height="2" fill="%23b3541e"/></svg>',
    tokens: {
      colors: {
        bg: { label: '旧纸', default: '#F3EAD8', options: ['#F3EAD8', '#EFE4CC', '#F7F0E0', '#E8DCC2'] },
        primary: { label: '棕墨', default: '#26160A', options: ['#26160A', '#3B2A1A', '#1C1917', '#44403C'] },
        accent: { label: '灯橙', default: '#B3541E', options: ['#B3541E', '#C2410C', '#9A3412', '#B45309'] }
      },
      fonts: { heading: { label: '标题', default: 'Georgia, serif', options: ['Georgia, serif', 'Didot, Georgia, serif', 'Songti SC, SimSun, serif'] } }
    },
    presets: [
      { name: '旧棕橙灯', colors: { bg: '#F3EAD8', primary: '#26160A', accent: '#B3541E' } },
      { name: '午夜蓝调', colors: { bg: '#E8DCC2', primary: '#1C1917', accent: '#9A3412' } },
      { name: '褪粉剧场', colors: { bg: '#F7F0E0', primary: '#44403C', accent: '#C2410C' } },
      { name: '褐墨琥珀', colors: { bg: '#EFE4CC', primary: '#3B2A1A', accent: '#B45309' } }
    ],
    canvas: {
      virtualWidth: 1000, virtualHeight: 1000, defaultWidth: 1000, defaultHeight: 1000, backgroundColor: { $t: 'colors.bg' },
      backgroundImage: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000"><circle cx="500" cy="420" r="380" fill="%2326160a" opacity="0.04"/><circle cx="500" cy="420" r="240" fill="%2326160a" opacity="0.04"/><g fill="%2326160a" opacity="0.06"><circle cx="180" cy="240" r="2.5"/><circle cx="740" cy="180" r="2"/><circle cx="860" cy="560" r="2.5"/><circle cx="300" cy="760" r="2"/><circle cx="620" cy="880" r="2.5"/><circle cx="150" cy="560" r="2"/></g></svg>'
    },
    elements: [
      // —— 胶片框：左右竖条 + 上下横条（四边齿孔）
      { id: 'strip-l', type: 'image', src: SPROCKET_SVG, x: 24, y: 24, width: 60, height: 952, objectFit: 'fill', zIndex: 2 },
      { id: 'strip-r', type: 'image', src: SPROCKET_SVG, x: 916, y: 24, width: 60, height: 952, objectFit: 'fill', zIndex: 2 },
      { id: 'strip-t', type: 'image', src: REX_SPROCKET_H_SVG, x: 84, y: 24, width: 832, height: 60, objectFit: 'fill', zIndex: 2 },
      { id: 'strip-b', type: 'image', src: REX_SPROCKET_H_SVG, x: 84, y: 916, width: 832, height: 60, objectFit: 'fill', zIndex: 2 },
      // —— 褪色竖条带（拷贝机色差）
      { id: 'fade-a', type: 'shape', shapeKind: 'rect', x: 150, y: 84, width: 120, height: 832, fill: { $t: 'colors.primary' }, opacity: 0.05, zIndex: 1 },
      { id: 'fade-b', type: 'shape', shapeKind: 'rect', x: 548, y: 84, width: 74, height: 832, fill: { $t: 'colors.accent' }, opacity: 0.1, zIndex: 1 },
      { id: 'fade-c', type: 'shape', shapeKind: 'rect', x: 742, y: 84, width: 128, height: 832, fill: { $t: 'colors.primary' }, opacity: 0.06, zIndex: 1 },
      // —— 做旧划痕细线组
      ...Array.from({ length: 5 }, (_, i) => ({
        id: 'scratch-' + i, type: 'shape' as const, shapeKind: 'rect' as const,
        x: 130 + i * 168, y: 96 + (i % 3) * 74, width: 2, height: [380, 520, 300, 460, 340][i],
        fill: { $t: 'colors.primary' }, opacity: [0.16, 0.11, 0.14, 0.09, 0.13][i], rotation: [-7, 4, -3, 6, -5][i], zIndex: 6
      })),
      // —— 放映灯镜头组
      { id: 'lens', type: 'shape', shapeKind: 'circle', x: 380, y: 150, width: 240, height: 240, border: { color: { $t: 'colors.accent' }, width: 6, style: 'solid' }, zIndex: 3, animation: { name: 'shimmer', duration: 4200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'lens-inner', type: 'shape', shapeKind: 'circle', x: 430, y: 200, width: 140, height: 140, border: { color: { $t: 'colors.primary' }, width: 2, style: 'dashed' }, zIndex: 3, animation: { name: 'spinSlow', duration: 28000, iterationCount: 'infinite', easing: 'linear' } },
      { id: 'lens-dot', type: 'shape', shapeKind: 'circle', x: 488, y: 258, width: 24, height: 24, fill: { $t: 'colors.accent' }, zIndex: 4, animation: { name: 'pulse', duration: 2200, iterationCount: 'infinite' } },
      // —— 贴在海报上的票价签
      { id: 'ticket-tag', type: 'shape', shapeKind: 'rect', x: 96, y: 110, width: 200, height: 68, fill: { $t: 'colors.primary' }, borderRadius: 4, rotation: -5, zIndex: 5, shadow: { offsetX: 2, offsetY: 5, blur: 10, color: 'rgba(38,22,10,0.3)' }, animation: { name: 'zoomIn', duration: 500, delay: 1200 } },
      { id: 'ticket-text', type: 'text', content: '票价 贰角\n儿童减半 · 凭学生证', fontFamily: 'Songti SC, STSong, SimSun, serif', fontSize: 20, fontWeight: '700', color: { $t: 'colors.bg' }, textAlign: 'center', lineHeight: 1.5, rotation: -5, x: 96, y: 122, width: 200, height: 52, zIndex: 6, editable: { content: true } },
      // —— 上映标 + 片名
      { id: 'showing-tag', type: 'shape', shapeKind: 'rect', x: 350, y: 430, width: 300, height: 40, fill: { $t: 'colors.primary' }, zIndex: 3 },
      { id: 'showing-text', type: 'text', content: 'NOW SHOWING', fontFamily: 'Georgia, serif', fontSize: 20, fontWeight: '700', color: { $t: 'colors.bg' }, letterSpacing: 8, textAlign: 'center', x: 350, y: 438, width: 300, height: 26, zIndex: 4, editable: { content: true } },
      { id: 'title-cn', type: 'text', content: '时光放映厅', fontFamily: { $t: 'fonts.heading' }, fontSize: 84, fontWeight: '700', color: { $t: 'colors.primary' }, letterSpacing: 16, textAlign: 'center', x: 150, y: 520, width: 700, height: 110, zIndex: 3, animation: { name: 'inkReveal', duration: 1400, delay: 300 }, editable: { content: true, fontSize: { type: 'range', min: 52, max: 100 }, position: true } },
      { id: 'title-en', type: 'text', content: 'GRAND REOPENING · EST. MCMXCIV', fontFamily: 'Georgia, serif', fontSize: 18, color: { $t: 'colors.accent' }, letterSpacing: 6, textAlign: 'center', x: 180, y: 650, width: 640, height: 30, zIndex: 3, animation: { name: 'fadeIn', duration: 800, delay: 900 }, editable: { content: true } },
      // —— 演职员表小字块（多行）
      { id: 'billing-1', type: 'text', content: '导 演 陈默白 · 主 演 林晚晴 / 苏小舟\n摄 影 周迟 · 美 术 何知一 · 录 音 阿飞\n片 长 96 分钟 · 35 毫米胶片 · 数码修复版', fontFamily: 'Songti SC, STSong, SimSun, serif', fontSize: 16, color: { $t: 'colors.primary' }, opacity: 0.78, lineHeight: 1.75, letterSpacing: 2, textAlign: 'center', x: 180, y: 700, width: 640, height: 88, zIndex: 3, animation: { name: 'fadeIn', duration: 900, delay: 1100 }, editable: { content: true } },
      { id: 'billing-2', type: 'text', content: '加映：每晚 19:30 二刷半价 · 学生证换票\n散场请带走瓜子皮，自带杯可以续汽水', fontFamily: 'Songti SC, STSong, SimSun, serif', fontSize: 14, color: { $t: 'colors.accent' }, lineHeight: 1.7, letterSpacing: 2, textAlign: 'center', x: 180, y: 794, width: 640, height: 48, zIndex: 3, editable: { content: true } },
      { id: 'credits', type: 'text', content: '胶片 35mm · 每秒 24 格 · 散场别急着走，彩蛋在字幕后', fontFamily: 'Songti SC, STSong, SimSun, serif', fontSize: 18, color: { $t: 'colors.primary' }, opacity: 0.65, letterSpacing: 2, textAlign: 'center', x: 200, y: 862, width: 600, height: 28, zIndex: 3, editable: { content: true } },
      // —— 星爆促销章
      { id: 'burst', type: 'image', src: REX_STARBURST_SVG, x: 678, y: 104, width: 208, height: 208, objectFit: 'contain', rotation: 12, zIndex: 6, animation: { name: 'zoomIn', duration: 520, delay: 1300 } },
      { id: 'burst-text', type: 'text', content: 'SALE ON\n二刷半价', fontFamily: 'Impact, Arial Black, sans-serif', fontSize: 26, fontWeight: '900', color: { $t: 'colors.accent' }, textAlign: 'center', lineHeight: 1.2, rotation: 12, x: 708, y: 176, width: 148, height: 64, zIndex: 7, editable: { content: true } }
    ]
  },
  {
    id: 'retro-vinyl-spin', name: '黑胶慢转', version: '1.0.0', category: 'retro',
    tags: ['retro', 'vinyl', 'record', 'music', 'analog'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23efe6d2"/><g stroke="%2326160a" stroke-width="1.6" opacity="0.55"><path d="M8 10 H46"/><path d="M62 10 H92" stroke-dasharray="3 3"/></g><rect x="10" y="22" width="44" height="52" rx="1.5" fill="%23f6efdd" stroke="%2326160a" stroke-width="1.4" transform="rotate(-2 32 48)"/><rect x="13" y="25" width="38" height="46" fill="none" stroke="%23c2410c" stroke-width="0.6" stroke-dasharray="2 2" opacity="0.6" transform="rotate(-2 32 48)"/><circle cx="48" cy="46" r="28" fill="%231a140f"/><g fill="none" stroke="%23efe6d2" opacity="0.22"><circle cx="48" cy="46" r="25"/><circle cx="48" cy="46" r="21"/><circle cx="48" cy="46" r="17"/><circle cx="48" cy="46" r="13"/></g><path d="M30 32 A25 25 0 0 1 42 22" fill="none" stroke="%23ffffff" stroke-width="3" opacity="0.16" stroke-linecap="round"/><circle cx="48" cy="46" r="9" fill="%23c2410c"/><circle cx="48" cy="46" r="1.6" fill="%231a140f"/><path d="M82 18 L66 44" stroke="%2326160a" stroke-width="2.6" stroke-linecap="round"/><rect x="62" y="41" width="8" height="5" rx="1" fill="%2326160a" transform="rotate(34 66 43)"/><circle cx="84" cy="16" r="3.6" fill="%2326160a"/><g fill="%2326160a" opacity="0.5"><rect x="66" y="58" width="26" height="1.8"/><rect x="66" y="64" width="20" height="1.8"/><rect x="66" y="70" width="24" height="1.8"/></g><rect x="66" y="52" width="12" height="2.6" fill="%23c2410c" opacity="0.8"/><rect x="14" y="82" width="58" height="5" fill="%2326160a" opacity="0.85"/><rect x="14" y="90" width="40" height="2.4" fill="%23c2410c" opacity="0.7"/></svg>',
    tokens: {
      colors: {
        bg: { label: '奶橘', default: '#EFE6D2', options: ['#EFE6D2', '#F2EAD8', '#E9DFC8', '#F5EFE0'] },
        primary: { label: '漆黑', default: '#26160A', options: ['#26160A', '#1A140F', '#292524', '#0C0A09'] },
        accent: { label: '标签橘', default: '#C2410C', options: ['#C2410C', '#B45309', '#9A3412', '#155E75'] }
      },
      fonts: { heading: { label: '标题', default: 'Didot, Georgia, serif', options: ['Didot, Georgia, serif', 'Georgia, serif', 'Impact, sans-serif'] } }
    },
    presets: [
      { name: '奶油暖橘', colors: { bg: '#EFE6D2', primary: '#26160A', accent: '#C2410C' } },
      { name: '燕麦湖蓝', colors: { bg: '#F5EFE0', primary: '#0C0A09', accent: '#155E75' } },
      { name: '米灰复古', colors: { bg: '#E9DFC8', primary: '#292524', accent: '#B45309' } },
      { name: '焦糖深黑', colors: { bg: '#F2EAD8', primary: '#1A140F', accent: '#9A3412' } }
    ],
    canvas: {
      virtualWidth: 1000, virtualHeight: 1000, defaultWidth: 1000, defaultHeight: 1000, backgroundColor: { $t: 'colors.bg' },
      backgroundImage: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000"><circle cx="400" cy="420" r="300" fill="%2326160a" opacity="0.05"/><circle cx="400" cy="420" r="210" fill="%2326160a" opacity="0.04"/><g stroke="%2326160a" stroke-width="2" opacity="0.07" fill="none"><path d="M100 880 Q 300 840 500 880 T 900 880"/><path d="M100 910 Q 300 870 500 910 T 900 910"/></g><g fill="%2326160a" opacity="0.08"><circle cx="880" cy="150" r="2"/><circle cx="760" cy="520" r="1.6"/><circle cx="920" cy="640" r="2.2"/><circle cx="60" cy="120" r="1.8"/></g></svg>'
    },
    elements: [
      // —— 顶部编目行
      { id: 'rule-top', group: 'rule-top', type: 'shape', shapeKind: 'line', x: 100, y: 118, width: 800, height: 2, fill: { $t: 'colors.primary' }, opacity: 0.35, zIndex: 3 },
      { id: 'cat-no', type: 'text', content: 'RSD-1974 · 黄昏唱片区 · 逾期罚一首', fontFamily: 'Songti SC, STSong, SimSun, serif', fontSize: 13, color: { $t: 'colors.primary' }, opacity: 0.6, letterSpacing: 3, x: 100, y: 66, width: 420, height: 26, zIndex: 3, animation: { name: 'fadeIn', duration: 600 }, editable: { content: true } },
      { id: 'rpm-tag', type: 'text', content: '33⅓ RPM · 立体声 · 侧 A 首推', fontFamily: 'Georgia, serif', fontSize: 14, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 4, textAlign: 'right', x: 520, y: 64, width: 380, height: 28, zIndex: 3, animation: { name: 'fadeIn', duration: 600, delay: 200 }, editable: { content: true } },
      // —— 纸套（唱片从右上方滑出）
      { id: 'sleeve', type: 'shape', shapeKind: 'rect', x: 90, y: 205, width: 470, height: 520, fill: { $t: 'colors.bg' }, border: { color: { $t: 'colors.primary' }, width: 3, style: 'solid' }, borderRadius: 3, rotation: -1.5, opacity: 0.95, zIndex: 1, shadow: { offsetX: 8, offsetY: 14, blur: 26, color: 'rgba(38,22,10,0.25)' } },
      { id: 'sleeve-inner', type: 'shape', shapeKind: 'rect', x: 106, y: 221, width: 438, height: 488, border: { color: { $t: 'colors.accent' }, width: 1.5, style: 'dashed' }, rotation: -1.5, opacity: 0.5, zIndex: 1 },
      // —— 盘体 + 密纹同心圆环组
      { id: 'record', type: 'image', src: VINYL_SVG, x: 135, y: 155, width: 530, height: 530, objectFit: 'contain', zIndex: 2, animation: { name: 'spinSlow', duration: 16000, iterationCount: 'infinite', easing: 'linear' } },
      ...Array.from({ length: 7 }, (_, i) => ({
        id: 'groove-' + i, type: 'shape' as const, shapeKind: 'circle' as const,
        x: 400 - (252 - i * 20), y: 420 - (252 - i * 20), width: (252 - i * 20) * 2, height: (252 - i * 20) * 2,
        border: { color: { $t: 'colors.bg' }, width: i % 3 === 0 ? 2.5 : 1.5, style: 'solid' as const },
        opacity: [0.2, 0.12, 0.17, 0.1, 0.18, 0.12, 0.16][i], zIndex: 3
      })),
      // —— 高光反射弧 + 灰尘划痕（瑕疵层）
      { id: 'glint', type: 'image', src: REX_GLINT_SVG, x: 135, y: 155, width: 530, height: 530, objectFit: 'contain', zIndex: 4, animation: { name: 'shimmer', duration: 5200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'dust', type: 'image', src: REX_VINYL_DUST_SVG, x: 135, y: 155, width: 530, height: 530, objectFit: 'contain', opacity: 0.55, zIndex: 5 },
      // —— 中心标签
      { id: 'label-disc', type: 'shape', shapeKind: 'circle', x: 330, y: 350, width: 140, height: 140, fill: { $t: 'colors.accent' }, zIndex: 6 },
      { id: 'label-ring', type: 'shape', shapeKind: 'circle', x: 340, y: 360, width: 120, height: 120, border: { color: { $t: 'colors.bg' }, width: 1.5, style: 'dashed' }, opacity: 0.75, zIndex: 6 },
      { id: 'label-text', type: 'text', content: 'SIDE A\n33⅓转', fontFamily: 'Georgia, serif', fontSize: 24, fontWeight: '700', color: { $t: 'colors.bg' }, textAlign: 'center', lineHeight: 1.35, x: 330, y: 382, width: 140, height: 76, zIndex: 7, editable: { content: true } },
      { id: 'spindle', type: 'shape', shapeKind: 'circle', x: 392, y: 412, width: 16, height: 16, fill: { $t: 'colors.primary' }, zIndex: 7 },
      // —— 曲目单（含时长）
      { id: 'tracklist-head', type: 'text', content: 'SIDE A · 曲目与时长', fontFamily: 'Georgia, serif', fontSize: 20, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 4, x: 700, y: 178, width: 260, height: 30, zIndex: 3, animation: { name: 'slideInRight', duration: 700, delay: 500 }, editable: { content: true } },
      { id: 'tracklist', type: 'text', content: 'A1 夜航未晚 · 4:12\nA2 旧唱片店 · 3:38\nA3 落针黄昏 · 5:06\nA4 一面之词 · 0:20\nB1 反转副歌 · 4:44', fontFamily: 'Songti SC, STSong, SimSun, serif', fontSize: 15, color: { $t: 'colors.primary' }, lineHeight: 2, x: 700, y: 218, width: 260, height: 190, zIndex: 3, animation: { name: 'rise', duration: 800, delay: 700 }, editable: { content: true } },
      // —— 唱臂 + 针头
      { id: 'tonearm', type: 'shape', shapeKind: 'rect', x: 690, y: 150, width: 12, height: 320, rotation: 32, fill: { $t: 'colors.primary' }, borderRadius: 6, zIndex: 8, animation: { name: 'swing', duration: 9000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'headshell', type: 'shape', shapeKind: 'rect', x: 592, y: 428, width: 40, height: 24, rotation: 32, fill: { $t: 'colors.primary' }, borderRadius: 4, zIndex: 9 },
      { id: 'pivot', type: 'shape', shapeKind: 'circle', x: 754, y: 148, width: 40, height: 40, fill: { $t: 'colors.primary' }, zIndex: 9 },
      { id: 'note-l', type: 'text', content: '♪', fontFamily: 'Georgia, serif', fontSize: 40, color: { $t: 'colors.accent' }, x: 150, y: 220, width: 50, height: 56, zIndex: 3, animation: { name: 'float', duration: 5200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'note-r', type: 'text', content: '♫', fontFamily: 'Georgia, serif', fontSize: 34, color: { $t: 'colors.primary' }, opacity: 0.6, x: 830, y: 560, width: 50, height: 48, zIndex: 3, animation: { name: 'rise', duration: 6400, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'title-cn', type: 'text', content: '黑胶慢转', fontFamily: { $t: 'fonts.heading' }, fontSize: 76, fontWeight: '700', color: { $t: 'colors.primary' }, letterSpacing: 14, textAlign: 'center', x: 200, y: 730, width: 600, height: 100, zIndex: 10, animation: { name: 'fadeInUp', duration: 900 }, editable: { content: true, fontSize: { type: 'range', min: 48, max: 92 }, position: true } },
      { id: 'title-en', type: 'text', content: 'ALL-TIME SIDE A · NEEDLE DROP AT DUSK', fontFamily: 'Courier New, monospace', fontSize: 18, color: { $t: 'colors.accent' }, letterSpacing: 4, textAlign: 'center', x: 220, y: 846, width: 560, height: 28, zIndex: 10, animation: { name: 'fadeIn', duration: 700, delay: 600 }, editable: { content: true } }
    ]
  },
  {
    id: 'retro-newsprint-headline', name: '旧报头条', version: '1.0.0', category: 'retro',
    tags: ['retro', 'newspaper', 'newsprint', 'serif', 'editorial'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23f5f1e6"/><rect x="14" y="12" width="72" height="2" fill="%231f2937"/><rect x="14" y="16" width="72" height="5" fill="%231f2937"/><rect x="20" y="28" width="60" height="10" fill="%231f2937" opacity="0.85"/><rect x="20" y="44" width="60" height="1.4" fill="%231f2937"/><g fill="%231f2937" opacity="0.5"><rect x="20" y="50" width="26" height="2.4"/><rect x="20" y="56" width="26" height="2.4"/><rect x="20" y="62" width="22" height="2.4"/><rect x="54" y="50" width="26" height="2.4"/><rect x="54" y="56" width="26" height="2.4"/></g><circle cx="67" cy="78" r="10" fill="%237f1d1d" opacity="0.7"/></svg>',
    tokens: {
      colors: {
        bg: { label: '新闻纸', default: '#F5F1E6', options: ['#F5F1E6', '#F0EBDD', '#EDE6D4', '#F7F4EA'] },
        primary: { label: '铅字黑', default: '#1F2937', options: ['#1F2937', '#111827', '#292524', '#1C1917'] },
        accent: { label: '批注红', default: '#7F1D1D', options: ['#7F1D1D', '#991B1B', '#B45309', '#374151'] }
      },
      fonts: { heading: { label: '标题', default: 'Songti SC, STSong, SimSun, serif', options: ['Songti SC, STSong, SimSun, serif', 'Georgia, serif', 'STKaiti, KaiTi, serif'] } }
    },
    presets: [
      { name: '晨光铅字', colors: { bg: '#F5F1E6', primary: '#1F2937', accent: '#7F1D1D' } },
      { name: '夜版褐报', colors: { bg: '#EDE6D4', primary: '#292524', accent: '#B45309' } },
      { name: '冷灰时评', colors: { bg: '#F7F4EA', primary: '#111827', accent: '#374151' } },
      { name: '号外朱印', colors: { bg: '#F0EBDD', primary: '#1C1917', accent: '#991B1B' } }
    ],
    canvas: {
      virtualWidth: 1000, virtualHeight: 1000, defaultWidth: 1000, defaultHeight: 1000, backgroundColor: { $t: 'colors.bg' },
      backgroundImage: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000"><g fill="%231f2937" opacity="0.05"><circle cx="90" cy="110" r="1.6"/><circle cx="310" cy="60" r="1.2"/><circle cx="620" cy="130" r="1.6"/><circle cx="880" cy="90" r="1.2"/><circle cx="150" cy="640" r="1.6"/><circle cx="760" cy="700" r="1.2"/><circle cx="420" cy="920" r="1.6"/><circle cx="920" cy="880" r="1.2"/></g></svg>'
    },
    elements: [
      { id: 'rule-top', group: 'rule-top', type: 'shape', shapeKind: 'line', x: 70, y: 84, width: 860, height: 3, fill: { $t: 'colors.primary' }, zIndex: 2, animation: { name: 'slideInLeft', duration: 700 } },
      { id: 'rule-top2', group: 'rule-top', type: 'shape', shapeKind: 'line', x: 70, y: 92, width: 860, height: 8, fill: { $t: 'colors.primary' }, zIndex: 2, animation: { name: 'slideInLeft', duration: 700, delay: 120 } },
      { id: 'masthead', type: 'text', content: '复 旧 日 报', fontFamily: { $t: 'fonts.heading' }, fontSize: 58, fontWeight: '900', color: { $t: 'colors.primary' }, letterSpacing: 24, textAlign: 'center', x: 200, y: 110, width: 600, height: 78, zIndex: 2, editable: { content: true } },
      { id: 'vol-line', type: 'text', content: 'THE DAILY RETRO · VOL.XII No.218 · 定价二分 · 风雨无阻', fontFamily: 'Courier New, monospace', fontSize: 15, color: { $t: 'colors.primary' }, opacity: 0.6, letterSpacing: 2, textAlign: 'center', x: 180, y: 196, width: 640, height: 24, zIndex: 2, animation: { name: 'fadeIn', duration: 600, delay: 500 }, editable: { content: true } },
      { id: 'rule-mid', type: 'shape', shapeKind: 'line', x: 70, y: 232, width: 860, height: 1.5, fill: { $t: 'colors.primary' }, opacity: 0.8, zIndex: 2 },
      { id: 'headline', type: 'text', content: '复古，是一场\n温柔的逆流', fontFamily: { $t: 'fonts.heading' }, fontSize: 76, fontWeight: '900', color: { $t: 'colors.primary' }, lineHeight: 1.18, textAlign: 'center', x: 130, y: 268, width: 740, height: 220, zIndex: 2, animation: { name: 'inkReveal', duration: 1500 }, editable: { content: true, fontSize: { type: 'range', min: 48, max: 96 }, position: true } },
      { id: 'lead', type: 'text', content: '本报讯：当快进成为习惯，越来越多人选择倒带。黑胶回潮、胶片售罄、旧物市集排起长队——人们怀念的并非旧物本身，而是那段允许慢下来的时光。', fontFamily: 'Songti SC, STSong, SimSun, serif', fontSize: 21, color: { $t: 'colors.primary' }, lineHeight: 1.85, x: 120, y: 520, width: 620, height: 160, zIndex: 2, animation: { name: 'rise', duration: 800, delay: 600 }, editable: { content: true } },
      { id: 'col-rule', type: 'shape', shapeKind: 'rect', x: 770, y: 520, width: 1.5, height: 260, fill: { $t: 'colors.primary' }, opacity: 0.5, zIndex: 2 },
      { id: 'photo-halftone', type: 'image', src: HALFTONE_SVG, x: 790, y: 520, width: 120, height: 120, objectFit: 'contain', opacity: 0.8, zIndex: 2, animation: { name: 'zoomIn', duration: 600, delay: 900 } },
      { id: 'side-note', type: 'text', content: '详见 C6 版\n《慢的经济学》', fontFamily: 'Courier New, monospace', fontSize: 16, color: { $t: 'colors.accent' }, lineHeight: 1.7, x: 790, y: 656, width: 130, height: 64, zIndex: 2, editable: { content: true } },
      { id: 'rule-bottom', type: 'shape', shapeKind: 'line', x: 70, y: 850, width: 860, height: 1.5, fill: { $t: 'colors.primary' }, opacity: 0.7, zIndex: 2 },
      { id: 'stamp', type: 'shape', shapeKind: 'circle', x: 780, y: 862, width: 88, height: 88, border: { color: { $t: 'colors.accent' }, width: 3, style: 'solid' }, opacity: 0.85, zIndex: 3, rotation: -12, animation: { name: 'zoomIn', duration: 500, delay: 1100 } },
      { id: 'stamp-text', type: 'text', content: '已核对', fontFamily: 'Songti SC, STSong, SimSun, serif', fontSize: 22, fontWeight: '700', color: { $t: 'colors.accent' }, rotation: -12, textAlign: 'center', x: 786, y: 892, width: 76, height: 30, zIndex: 4, editable: { content: true } }
    ]
  },
  {
    id: 'retro-western-badge', name: '西部老标章', version: '1.0.0', category: 'retro',
    tags: ['retro', 'western', 'badge', 'general-store', 'ornament'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23ede3cb"/><g fill="%23a16207" opacity="0.12" transform="translate(50 54)"><path d="M0 0 L-4 -56 L4 -56 Z"/><path d="M0 0 L-4 -56 L4 -56 Z" transform="rotate(45)"/><path d="M0 0 L-4 -56 L4 -56 Z" transform="rotate(90)"/><path d="M0 0 L-4 -56 L4 -56 Z" transform="rotate(135)"/><path d="M0 0 L-4 -56 L4 -56 Z" transform="rotate(180)"/><path d="M0 0 L-4 -56 L4 -56 Z" transform="rotate(225)"/><path d="M0 0 L-4 -56 L4 -56 Z" transform="rotate(270)"/><path d="M0 0 L-4 -56 L4 -56 Z" transform="rotate(315)"/></g><rect x="8" y="8" width="84" height="84" fill="none" stroke="%23432818" stroke-width="2"/><rect x="12" y="12" width="76" height="76" fill="none" stroke="%23a16207" stroke-width="0.7" stroke-dasharray="2 2"/><circle cx="50" cy="42" r="24" fill="none" stroke="%23432818" stroke-width="1.6"/><circle cx="50" cy="42" r="20" fill="none" stroke="%23a16207" stroke-width="1.4" stroke-dasharray="1.5 2.5"/><circle cx="50" cy="42" r="15.5" fill="none" stroke="%23432818" stroke-width="0.8"/><g fill="%23432818"><rect x="48.5" y="16" width="3" height="3" transform="rotate(45 50 17.5)"/><rect x="33" y="28" width="3" height="3" transform="rotate(45 34.5 29.5)"/><rect x="64" y="28" width="3" height="3" transform="rotate(45 65.5 29.5)"/></g><path d="M50 33 L52.4 38.6 L58 39.4 L54 43.2 L55 48.8 L50 45.9 L45 48.8 L46 43.2 L42 39.4 L47.6 38.6 Z" fill="%23a16207"/><rect x="30" y="52" width="40" height="6" fill="%23a16207"/><rect x="36" y="64" width="28" height="4" fill="%23432818"/><g fill="%23432818" opacity="0.8"><path d="M26 74 H74 L70 79 L74 84 H26 L30 79 Z" fill="%23a16207"/></g><rect x="34" y="77" width="32" height="2" fill="%23ede3cb"/><rect x="38" y="88" width="24" height="1.6" fill="%23432818" opacity="0.55"/></svg>',
    tokens: {
      colors: {
        bg: { label: '沙卡', default: '#EDE3CB', options: ['#EDE3CB', '#E8DCC2', '#F2EBD9', '#E5D9BE'] },
        primary: { label: '深棕', default: '#432818', options: ['#432818', '#2C1A0E', '#57370F', '#1C1917'] },
        accent: { label: '黄铜', default: '#A16207', options: ['#A16207', '#B45309', '#CA8A04', '#854D0E'] }
      },
      fonts: { heading: { label: '标题', default: 'Impact, Arial Black, sans-serif', options: ['Impact, Arial Black, sans-serif', 'Georgia, serif'] } }
    },
    presets: [
      { name: '黄铜沙金', colors: { bg: '#EDE3CB', primary: '#432818', accent: '#A16207' } },
      { name: '深棕旧木', colors: { bg: '#E5D9BE', primary: '#2C1A0E', accent: '#854D0E' } },
      { name: '麦田赭石', colors: { bg: '#F2EBD9', primary: '#57370F', accent: '#CA8A04' } },
      { name: '铁灰铜印', colors: { bg: '#E8DCC2', primary: '#1C1917', accent: '#B45309' } }
    ],
    canvas: {
      virtualWidth: 1000, virtualHeight: 1000, defaultWidth: 1000, defaultHeight: 1000, backgroundColor: { $t: 'colors.bg' },
      backgroundImage: SUNBURST_SVG
    },
    elements: [
      // —— 双层外框 + 四角菱形
      { id: 'frame-outer', type: 'shape', shapeKind: 'rect', x: 60, y: 60, width: 880, height: 880, border: { color: { $t: 'colors.primary' }, width: 5, style: 'solid' }, zIndex: 4, animation: { name: 'fadeIn', duration: 600 } },
      { id: 'frame-inner', type: 'shape', shapeKind: 'rect', x: 84, y: 84, width: 832, height: 832, border: { color: { $t: 'colors.accent' }, width: 1.5, style: 'dashed' }, zIndex: 4, animation: { name: 'fadeIn', duration: 600, delay: 250 } },
      { id: 'diamond-t', type: 'shape', shapeKind: 'rect', x: 482, y: 106, width: 26, height: 26, rotation: 45, fill: { $t: 'colors.accent' }, zIndex: 5, animation: { name: 'twinkle', duration: 3200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'diamond-b', type: 'shape', shapeKind: 'rect', x: 482, y: 856, width: 26, height: 26, rotation: 45, fill: { $t: 'colors.accent' }, zIndex: 5, animation: { name: 'twinkle', duration: 3200, delay: 600, iterationCount: 'infinite', easing: 'ease-in-out' } },
      // —— 绳纹圆环组（实线 + 双层虚线缓转）
      { id: 'ring-1', group: 'ring-', type: 'shape', shapeKind: 'circle', x: 330, y: 210, width: 340, height: 340, border: { color: { $t: 'colors.primary' }, width: 3, style: 'solid' }, zIndex: 2 },
      { id: 'ring-2', group: 'ring-', type: 'shape', shapeKind: 'circle', x: 356, y: 236, width: 288, height: 288, border: { color: { $t: 'colors.accent' }, width: 1.5, style: 'dashed' }, zIndex: 2, animation: { name: 'spinSlow', duration: 40000, iterationCount: 'infinite', easing: 'linear' } },
      { id: 'ring-3', group: 'ring-', type: 'shape', shapeKind: 'circle', x: 308, y: 188, width: 384, height: 384, border: { color: { $t: 'colors.accent' }, width: 2, style: 'dashed' }, opacity: 0.75, zIndex: 2, animation: { name: 'spinSlow', duration: 64000, iterationCount: 'infinite', easing: 'linear' } },
      { id: 'ring-4', group: 'ring-', type: 'shape', shapeKind: 'circle', x: 264, y: 144, width: 472, height: 472, border: { color: { $t: 'colors.primary' }, width: 1.5, style: 'solid' }, opacity: 0.7, zIndex: 2 },
      // —— 环形 text 组：字母沿上弧逐字排布
      ...Array.from({ length: 9 }, (_, i) => {
        const deg = -72 + i * 18, rad = (deg * Math.PI) / 180
        return {
          id: 'arc-letter-' + i, type: 'text' as const, content: 'PROVISION'[i],
          fontFamily: 'Georgia, serif', fontSize: 36, fontWeight: '700', color: { $t: 'colors.primary' },
          letterSpacing: 0, textAlign: 'center' as const, lineHeight: 1.1, rotation: deg,
          x: Math.round(500 + 216 * Math.sin(rad) - 22), y: Math.round(380 - 216 * Math.cos(rad) - 20), width: 44, height: 40,
          zIndex: 3, opacity: 0.9, editable: { content: true }
        }
      }),
      // —— 星标排 + 中央大星
      ...Array.from({ length: 3 }, (_, i) => ({
        id: 'star-' + i, type: 'text' as const, content: '★', fontFamily: 'Georgia, serif', fontSize: 20,
        color: { $t: 'colors.accent' }, textAlign: 'center' as const, x: 450 + i * 36, y: 232, width: 28, height: 30, zIndex: 3,
        opacity: [0.95, 1, 0.95][i], animation: { name: 'twinkle' as const, duration: 2600 + i * 400, delay: i * 300, iterationCount: 'infinite' as const, easing: 'ease-in-out' }
      })),
      { id: 'badge-star', type: 'text', content: '★', fontFamily: 'Georgia, serif', fontSize: 96, color: { $t: 'colors.primary' }, textAlign: 'center', x: 428, y: 300, width: 144, height: 120, zIndex: 3, animation: { name: 'heartbeat', duration: 4200, iterationCount: 'infinite' } },
      { id: 'est-tag', type: 'shape', shapeKind: 'rect', x: 330, y: 470, width: 340, height: 52, fill: { $t: 'colors.accent' }, zIndex: 3, animation: { name: 'zoomIn', duration: 550, delay: 400 } },
      { id: 'est-text', type: 'text', content: 'EST. 1926', fontFamily: 'Georgia, serif', fontSize: 26, fontWeight: '700', color: { $t: 'colors.bg' }, letterSpacing: 8, textAlign: 'center', x: 330, y: 482, width: 340, height: 32, zIndex: 4, editable: { content: true } },
      { id: 'title-main', type: 'text', content: 'WILD & FREE', fontFamily: { $t: 'fonts.heading' }, fontSize: 88, fontWeight: '900', color: { $t: 'colors.primary' }, letterSpacing: 4, textAlign: 'center', x: 120, y: 600, width: 760, height: 110, zIndex: 3, animation: { name: 'rise', duration: 800, delay: 550 }, editable: { content: true, fontSize: { type: 'range', min: 60, max: 110 }, position: true } },
      { id: 'title-cn', type: 'text', content: '旧 货 商 店 · 童叟无欺', fontFamily: 'Songti SC, STSong, SimSun, serif', fontSize: 28, color: { $t: 'colors.primary' }, opacity: 0.85, letterSpacing: 8, textAlign: 'center', x: 220, y: 724, width: 560, height: 40, zIndex: 3, animation: { name: 'fadeIn', duration: 700, delay: 900 }, editable: { content: true } },
      { id: 'foot-line', type: 'text', content: 'GENERAL MERCANTILE · TRADE · PROVISION', fontFamily: 'Georgia, serif', fontSize: 16, color: { $t: 'colors.accent' }, letterSpacing: 5, textAlign: 'center', x: 140, y: 790, width: 720, height: 26, zIndex: 3, editable: { content: true } },
      // —— 缎带横幅
      { id: 'ribbon', type: 'shape', shapeKind: 'rect', x: 250, y: 826, width: 500, height: 58, fill: { $t: 'colors.primary' }, borderRadius: 6, zIndex: 4, shadow: { offsetX: 0, offsetY: 6, blur: 14, color: 'rgba(67,40,24,0.28)' }, animation: { name: 'zoomIn', duration: 600, delay: 1100 } },
      { id: 'ribbon-text', type: 'text', content: '赊账免谈 · 故事照收', fontFamily: 'Songti SC, STSong, SimSun, serif', fontSize: 32, fontWeight: '700', color: { $t: 'colors.bg' }, letterSpacing: 4, textAlign: 'center', x: 250, y: 840, width: 500, height: 34, zIndex: 5, editable: { content: true } }
    ]
  },
  {
    id: 'retro-polaroid-note', name: '拍立得便签', version: '1.0.0', category: 'retro',
    tags: ['retro', 'polaroid', 'scrapbook', 'postcard', 'warm'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23e8d9bc"/><g fill="%234a3728" opacity="0.28"><circle cx="12" cy="14" r="1.1"/><circle cx="88" cy="8" r="0.9"/><circle cx="94" cy="46" r="1"/><circle cx="6" cy="62" r="0.9"/><circle cx="72" cy="94" r="1.1"/><circle cx="26" cy="90" r="0.8"/></g><g fill="%23b91c1c" opacity="0.18"><rect x="60" y="12" width="6" height="1.6" transform="rotate(24 63 13)"/><rect x="18" y="42" width="5" height="1.4" transform="rotate(-18 20 43)"/></g><g transform="rotate(8 66 44)"><rect x="50" y="20" width="32" height="46" rx="1" fill="%23f1ead9"/><rect x="53" y="23" width="26" height="26" fill="%234a3728" opacity="0.8"/><circle cx="74" cy="29" r="3.4" fill="%23fbbf24"/><rect x="53" y="52" width="18" height="1.8" fill="%234a3728" opacity="0.45"/></g><rect x="24" y="14" width="38" height="50" rx="1" fill="%23fdfdf8" transform="rotate(-4 43 39)" stroke="%234a3728" stroke-opacity="0.25" stroke-width="0.8"/><g transform="rotate(-4 43 39)"><rect x="27" y="17" width="32" height="32" fill="%23155e75"/><circle cx="52" cy="24" r="5" fill="%23fbbf24"/><path d="M27 49 L27 38 Q 36 30 44 38 Q 52 46 59 36 L59 49 Z" fill="%23e8d9bc" opacity="0.9"/><rect x="27" y="42" width="32" height="7" fill="%23fbbf24" opacity="0.4"/></g><g stroke="%23ffffff" opacity="0.3" stroke-width="0.7" fill="none"><path d="M36 20 L35 32" transform="rotate(-4 43 39)"/><path d="M52 34 L53 46" transform="rotate(-4 43 39)"/></g><rect x="58" y="17" width="5" height="32" fill="%23ff9230" opacity="0.3" transform="rotate(-4 43 39)"/><rect x="38" y="8" width="14" height="6" fill="%23b91c1c" opacity="0.45" transform="rotate(6 45 11)"/><rect x="14" y="56" width="14" height="4.6" fill="%23b91c1c" opacity="0.32" transform="rotate(-26 21 58)"/><circle cx="43" cy="15" r="2.2" fill="%23fbbf24" stroke="%234a3728" stroke-width="0.7"/><g fill="none" stroke="%234a3728" stroke-width="1.2"><rect x="63" y="16" width="5" height="14" rx="2.5" transform="rotate(24 65 23)"/><rect x="64.5" y="19" width="2" height="8" rx="1" transform="rotate(24 65 23)"/></g><rect x="72" y="60" width="14" height="16" rx="1" fill="none" stroke="%23155e75" stroke-width="1" stroke-dasharray="1.5 1.5" transform="rotate(7 79 68)"/><circle cx="79" cy="66" r="2.6" fill="%23155e75" opacity="0.6" transform="rotate(7 79 68)"/><circle cx="80" cy="68" r="8" fill="none" stroke="%234a3728" stroke-width="1" stroke-dasharray="2 2" opacity="0.6"/><g stroke="%234a3728" opacity="0.55" stroke-width="1.2"><path d="M10 68 H40"/><path d="M10 74 H36"/><path d="M10 80 H40"/><path d="M10 86 H28"/></g><rect x="10" y="90" width="40" height="1" fill="%234a3728" opacity="0.3"/><rect x="52" y="88" width="22" height="1.6" fill="%234a3728" opacity="0.4"/><rect x="30" y="67" width="16" height="2" fill="%234a3728" opacity="0.7"/></svg>',
    tokens: {
      colors: {
        bg: { label: '牛皮纸', default: '#E8D9BC', options: ['#E8D9BC', '#DFCBA8', '#EFE3C8', '#D9C7A7'] },
        primary: { label: '手写棕', default: '#4A3728', options: ['#4A3728', '#3B2A1A', '#57534E', '#1C1917'] },
        accent: { label: '相纸蓝', default: '#155E75', options: ['#155E75', '#7C2D12', '#3F6212', '#B91C1C'] },
        sun: { label: '日光黄', default: '#FBBF24', options: ['#FBBF24', '#F59E0B', '#FDE68A', '#EA580C'] }
      },
      fonts: { heading: { label: '手写字', default: 'STKaiti, KaiTi, cursive', options: ['STKaiti, KaiTi, cursive', 'Comic Sans MS, cursive', 'Songti SC, SimSun, serif'] } }
    },
    presets: [
      { name: '牛皮旧蓝', colors: { bg: '#E8D9BC', primary: '#4A3728', accent: '#155E75', sun: '#FBBF24' } },
      { name: '赭石暖阳', colors: { bg: '#EFE3C8', primary: '#3B2A1A', accent: '#7C2D12', sun: '#FDE68A' } },
      { name: '橄榄信笺', colors: { bg: '#DFCBA8', primary: '#1C1917', accent: '#3F6212', sun: '#F59E0B' } },
      { name: '深革红押', colors: { bg: '#D9C7A7', primary: '#57534E', accent: '#B91C1C', sun: '#EA580C' } }
    ],
    canvas: {
      virtualWidth: 1000, virtualHeight: 1000, defaultWidth: 1000, defaultHeight: 1000, backgroundColor: { $t: 'colors.bg' },
      backgroundImage: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000"><g fill="none" stroke="%234a3728" opacity="0.1"><circle cx="820" cy="180" r="60" stroke-width="7"/><circle cx="820" cy="180" r="48" stroke-width="2"/><circle cx="170" cy="840" r="42" stroke-width="6"/></g><g fill="%234a3728" opacity="0.07"><circle cx="120" cy="160" r="2"/><circle cx="260" cy="80" r="1.6"/><circle cx="640" cy="90" r="2"/><circle cx="910" cy="420" r="1.6"/><circle cx="80" cy="520" r="2"/><circle cx="900" cy="760" r="1.6"/><circle cx="480" cy="940" r="2"/></g></svg>'
    },
    elements: [
      // —— 牛皮桌上的纸屑散点
      { id: 'specks', type: 'image', src: REX_SPECK_SVG, x: 0, y: 0, width: 1000, height: 1000, objectFit: 'fill', zIndex: 1 },
      // —— 第二张相片（旋转错位叠放）
      { id: 'shadow-back', type: 'overlay', background: 'rgba(60,40,20,0.18)', x: 528, y: 192, width: 320, height: 400, rotation: 10, borderRadius: 6, zIndex: 2 },
      { id: 'polaroid-back', type: 'shape', shapeKind: 'rect', x: 520, y: 180, width: 320, height: 400, rotation: 8, fill: '#F1EAD9', borderRadius: 6, zIndex: 2, shadow: { offsetX: 4, offsetY: 10, blur: 18, color: 'rgba(60,40,20,0.25)' }, animation: { name: 'slideInRight', duration: 700, delay: 200 } },
      { id: 'back-window', type: 'shape', shapeKind: 'rect', x: 544, y: 204, width: 272, height: 272, rotation: 8, fill: { $t: 'colors.primary' }, opacity: 0.82, borderRadius: 2, zIndex: 3 },
      { id: 'back-moon', type: 'shape', shapeKind: 'circle', x: 740, y: 232, width: 44, height: 44, rotation: 8, fill: { $t: 'colors.sun' }, opacity: 0.85, zIndex: 3 },
      { id: 'back-caption', type: 'text', content: '第二张，忘了拍', fontFamily: { $t: 'fonts.heading' }, fontSize: 20, color: { $t: 'colors.primary' }, opacity: 0.75, rotation: 8, x: 548, y: 490, width: 270, height: 30, zIndex: 3, editable: { content: true } },
      // —— 主角：拍立得厚白框 + 底部宽边
      { id: 'polaroid', type: 'shape', shapeKind: 'rect', x: 250, y: 150, width: 400, height: 500, rotation: -4, fill: '#FDFDF8', borderRadius: 6, zIndex: 4, shadow: { offsetX: 0, offsetY: 14, blur: 24, color: 'rgba(60,40,20,0.3)' }, animation: { name: 'swing', duration: 7000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'photo-window', type: 'shape', shapeKind: 'rect', x: 284, y: 184, width: 332, height: 332, rotation: -4, fill: { $t: 'colors.accent' }, zIndex: 5 },
      { id: 'photo-sun', type: 'shape', shapeKind: 'circle', x: 480, y: 240, width: 74, height: 74, rotation: -4, fill: { $t: 'colors.sun' }, zIndex: 6, animation: { name: 'glow', duration: 3600, iterationCount: 'infinite' } },
      { id: 'photo-hill', type: 'image', src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 120"><path d="M0 120 L0 70 Q 80 20 150 62 Q 220 100 280 48 Q 320 12 340 40 L340 120 Z" fill="%23e8d9bc" opacity="0.9"/><path d="M0 120 L0 96 Q 120 62 210 92 Q 290 116 340 84 L340 120 Z" fill="%23fbbf24" opacity="0.5"/></svg>', x: 282, y: 396, width: 336, height: 120, rotation: -4, objectFit: 'fill', zIndex: 6 },
      { id: 'photo-grain', type: 'image', src: REX_PHOTO_GRAIN_SVG, x: 284, y: 184, width: 332, height: 332, rotation: -4, objectFit: 'fill', opacity: 0.5, zIndex: 6 },
      { id: 'light-leak', type: 'overlay', background: 'rgba(255,146,58,0.34)', mixBlendMode: 'screen', x: 560, y: 184, width: 56, height: 332, rotation: -4, zIndex: 6 },
      // —— 胶带两段 + 回形针 + 图钉
      { id: 'tape', type: 'overlay', background: 'rgba(185,28,28,0.35)', x: 400, y: 118, width: 150, height: 44, rotation: 6, zIndex: 8 },
      { id: 'tape-b', type: 'overlay', background: 'rgba(185,28,28,0.26)', x: 200, y: 592, width: 142, height: 40, rotation: -26, zIndex: 8 },
      { id: 'clip-a', type: 'shape', shapeKind: 'rect', x: 800, y: 190, width: 22, height: 64, rotation: 24, border: { color: { $t: 'colors.primary' }, width: 3, style: 'solid' }, borderRadius: 11, zIndex: 8 },
      { id: 'clip-b', type: 'shape', shapeKind: 'rect', x: 805, y: 202, width: 12, height: 40, rotation: 24, border: { color: { $t: 'colors.primary' }, width: 3, style: 'solid' }, borderRadius: 6, zIndex: 8 },
      { id: 'pin', type: 'shape', shapeKind: 'circle', x: 466, y: 160, width: 22, height: 22, fill: { $t: 'colors.sun' }, zIndex: 9, border: { color: '#4A3728', width: 2, style: 'solid' }, animation: { name: 'float', duration: 4600, iterationCount: 'infinite', easing: 'ease-in-out' } },
      // —— 底部宽边手写字
      { id: 'caption', type: 'text', content: 'Summer, 1994.', fontFamily: { $t: 'fonts.heading' }, fontSize: 34, color: { $t: 'colors.primary' }, rotation: -4, x: 300, y: 552, width: 320, height: 48, zIndex: 7, editable: { content: true } },
      { id: 'date-line', type: 'text', content: '1994.07.14 晴 · 汽水与晚风', fontFamily: 'Songti SC, SimSun, serif', fontSize: 16, color: { $t: 'colors.primary' }, opacity: 0.72, letterSpacing: 1, rotation: -4, x: 300, y: 598, width: 320, height: 28, zIndex: 7, editable: { content: true } },
      // —— 邮票与邮戳（右下角）
      { id: 'stamp', type: 'shape', shapeKind: 'rect', x: 852, y: 604, width: 90, height: 104, rotation: 7, fill: 'rgba(253,250,242,0.85)', border: { color: { $t: 'colors.accent' }, width: 2.5, style: 'dashed' }, borderRadius: 2, zIndex: 6 },
      { id: 'stamp-mark', type: 'shape', shapeKind: 'circle', x: 878, y: 628, width: 38, height: 38, rotation: 7, fill: { $t: 'colors.accent' }, opacity: 0.55, zIndex: 6 },
      { id: 'stamp-value', type: 'text', content: '0.80', fontFamily: 'Georgia, serif', fontSize: 18, fontWeight: '700', color: { $t: 'colors.primary' }, opacity: 0.8, textAlign: 'center', rotation: 7, x: 852, y: 692, width: 90, height: 24, zIndex: 7, editable: { content: true } },
      { id: 'postmark', type: 'shape', shapeKind: 'circle', x: 786, y: 614, width: 110, height: 110, rotation: -14, border: { color: { $t: 'colors.primary' }, width: 3, style: 'dashed' }, opacity: 0.5, zIndex: 7 },
      { id: 'postmark-text', type: 'text', content: '黄昏街 · 19:30', fontFamily: 'Songti SC, SimSun, serif', fontSize: 14, color: { $t: 'colors.primary' }, opacity: 0.6, letterSpacing: 1, textAlign: 'center', rotation: -14, x: 786, y: 656, width: 110, height: 24, zIndex: 8, editable: { content: true } },
      // —— 便签手写字与落款
      { id: 'memo', type: 'text', content: '把那个下午夹进相纸里：\n汽水开盖的声音、拉长的影子、\n和没说完的半句话。', fontFamily: { $t: 'fonts.heading' }, fontSize: 24, color: { $t: 'colors.primary' }, lineHeight: 1.8, x: 120, y: 690, width: 560, height: 150, zIndex: 4, animation: { name: 'rise', duration: 800, delay: 500 }, editable: { content: true } },
      { id: 'memo-rule', type: 'shape', shapeKind: 'line', x: 120, y: 852, width: 560, height: 2, fill: { $t: 'colors.primary' }, opacity: 0.22, zIndex: 4 },
      { id: 'sign', type: 'text', content: '— 旧时光收集处', fontFamily: { $t: 'fonts.heading' }, fontSize: 20, color: { $t: 'colors.primary' }, opacity: 0.6, textAlign: 'right', x: 560, y: 880, width: 320, height: 30, zIndex: 4, editable: { content: true } }
    ]
  }
]

// src/core/templates/quotes/quotes.ts
import type { Template } from '@/types/types'
export const quotesTemplates: Template[] = [
{
  id: 'quotes-giant-marks', name: '巨幅引号金句', version: '1.1.0', category: 'quotes',
  tags: ['quotes', 'minimal', 'typography', 'thoughts'],
  thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23fdfcf7"/><text x="25" y="55" font-size="50" font-family="serif" fill="%23d97706">\u201c</text></svg>',
  tokens: {
    colors: {
      bg: { label: '背景', default: '#FDFCFA', options: ['#FDFCFA', '#F7F6F2', '#FAF5EF', '#F4EFEA', '#0F172A'] },
      primary: { label: '主色', default: '#1C1917', options: ['#1C1917', '#292524', '#44403C', '#F8FAFC', '#1E293B'] },
      accent: { label: '引号色', default: '#D97706', options: ['#D97706', '#B45309', '#92400E', '#0D9488', '#3B82F6'] }
    },
    fonts: { heading: { label: '标题字体', default: 'Georgia, Didot, serif', options: ['Georgia, Didot, serif', 'Georgia, serif', 'Songti SC, SimSun, serif'] } }
  },
  presets: [
    { name: '米白墨字', colors: { bg: '#FDFCFA', primary: '#1C1917', accent: '#D97706' } },
    { name: '素纸黛青', colors: { bg: '#F7F6F2', primary: '#1E293B', accent: '#0D9488' } },
    { name: '暖棕琥珀', colors: { bg: '#FAF5EF', primary: '#292524', accent: '#B45309' } },
    { name: '暗夜鎏金', colors: { bg: '#0F172A', primary: '#F8FAFC', accent: '#D97706' } }
  ],
  canvas: { virtualWidth: 1000, virtualHeight: 1000, defaultWidth: 1000, defaultHeight: 1000, backgroundColor: { $t: 'colors.bg' } },
  elements: [
    { id: 'big-quote-mark', type: 'text', content: '\u201c', fontFamily: { $t: 'fonts.heading' }, fontSize: { $random: { type: 'range', min: 240, max: 300, step: 20 } }, fontWeight: '900', color: { $t: 'colors.accent' }, opacity: 0.35, x: 80, y: 80, width: 250, height: 250, zIndex: 1, animation: { name: 'inkReveal', duration: 1200 } },
    { id: 'quote-body', type: 'text', content: 'Stay hungry,\nStay foolish.', fontFamily: { $t: 'fonts.heading' }, fontSize: 68, fontWeight: '700', color: { $t: 'colors.primary' }, lineHeight: 1.3, x: 120, y: 280, width: 760, height: 240, zIndex: 2, animation: { name: 'fadeInUp', duration: 800 }, editable: { content: true, fontSize: { type: 'range', min: 48, max: 90 }, position: true } },
    { id: 'rule-line', type: 'shape', shapeKind: 'line', x: 120, y: 545, width: 160, height: 4, fill: { $t: 'colors.accent' }, zIndex: 2, animation: { name: 'slideInLeft', duration: 700, delay: 400 } },
    { id: 'author-name', type: 'text', content: '— STEVE JOBS, 2005', fontFamily: 'Helvetica, Arial, sans-serif', fontSize: 22, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 3, x: 120, y: 575, width: 600, height: 40, zIndex: 2, editable: { content: true, position: true } }
  ]
},
{
  id: 'quotes-gradient-card', name: '流光渐变卡片语录', version: '1.1.0', category: 'quotes',
  tags: ['quotes', 'gradient', 'modern', 'card'],
  thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><defs><radialGradient id="qh"><stop offset="0%" stop-color="%23a78bfa" stop-opacity="0.5"/><stop offset="100%" stop-color="%230f172a" stop-opacity="0"/></radialGradient><linearGradient id="gq" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="%236366f1"/><stop offset="52%" stop-color="%23a855f7"/><stop offset="100%" stop-color="%23ec4899"/></linearGradient></defs><rect width="100" height="100" fill="%230f172a"/><rect x="2" y="6" width="96" height="88" fill="url(%23qh)"/><rect x="8" y="12" width="84" height="76" rx="4" fill="%230f172a" fill-opacity="0.6"/><rect x="8" y="12" width="84" height="76" rx="4" fill="url(%23gq)" fill-opacity="0.85"/><rect x="11" y="15" width="78" height="70" rx="3" fill="none" stroke="%23ffffff" stroke-opacity="0.3" stroke-width="0.6"/><circle cx="30" cy="30" r="9" fill="%23ddd6fe" fill-opacity="0.25"/><rect x="38" y="37" width="24" height="1.2" fill="%23ddd6fe"/><rect x="26" y="44" width="48" height="2.6" fill="%23ffffff" fill-opacity="0.85"/><rect x="30" y="50" width="40" height="2.6" fill="%23ffffff" fill-opacity="0.55"/><circle cx="41" cy="61" r="1.4" fill="%23ddd6fe"/><rect x="45" y="60" width="14" height="2" fill="%23ffffff" fill-opacity="0.7"/><rect x="45" y="64" width="16" height="1.4" fill="%23ffffff" fill-opacity="0.4"/><rect x="38" y="72" width="24" height="1.2" fill="%23ddd6fe" fill-opacity="0.6"/><rect x="2" y="2" width="3" height="3" fill="%23ddd6fe" fill-opacity="0.5"/><rect x="94" y="3" width="3" height="3" fill="%23ddd6fe" fill-opacity="0.5"/><rect x="3" y="93" width="3" height="3" fill="%23ddd6fe" fill-opacity="0.5"/><rect x="93" y="93" width="3" height="3" fill="%23ddd6fe" fill-opacity="0.5"/><rect x="8" y="91" width="14" height="1.6" fill="%23ddd6fe" fill-opacity="0.45"/><rect x="78" y="91" width="14" height="1.6" fill="%23ddd6fe" fill-opacity="0.45"/></svg>',
  tokens: {
    colors: {
      bg: { label: '背景', default: '#0F172A', options: ['#0F172A', '#1E1B4B', '#18181B', '#0B1F3A', '#1A1204'] },
      primary: { label: '主色', default: '#FFFFFF', options: ['#FFFFFF', '#F8FAFC', '#E0E7FF', '#F0F9FF', '#FAF5FF'] },
      accent: { label: '辅色', default: '#DDD6FE', options: ['#DDD6FE', '#C4B5FD', '#A78BFA', '#7DD3FC', '#FBCFE8'] }
    },
    fonts: { heading: { label: '标题字体', default: 'Songti SC, SimSun, Georgia, serif', options: ['Songti SC, SimSun, Georgia, serif', 'STKaiti, KaiTi, serif', 'Georgia, serif'] } }
  },
  presets: [
    { name: '深邃靛蓝', colors: { bg: '#0F172A', primary: '#FFFFFF', accent: '#DDD6FE' } },
    { name: '曜石星云紫', colors: { bg: '#1E1B4B', primary: '#E0E7FF', accent: '#C4B5FD' } },
    { name: '墨玉深海', colors: { bg: '#0B1F3A', primary: '#F0F9FF', accent: '#7DD3FC' } },
    { name: '玄夜樱粉', colors: { bg: '#18181B', primary: '#FAF5FF', accent: '#FBCFE8' } }
  ],
  canvas: { virtualWidth: 1000, virtualHeight: 1000, defaultWidth: 1000, defaultHeight: 1000, backgroundColor: { $t: 'colors.bg' } },
  elements: [
    // —— 卡外暗场光晕：卡不是浮在纯色上的一张纸
    { id: 'card-aura', type: 'overlay', x: 20, y: 60, width: 960, height: 880, background: 'radial-gradient(ellipse at 50% 46%, rgba(167,139,250,0.32) 0%, rgba(99,102,241,0.16) 40%, rgba(15,23,42,0) 72%)', zIndex: 1 },
    // —— 卡体：深底 + 渐变板 + 内层微光板 + 内描边 + 斜向流光
    { id: 'card-body', type: 'shape', shapeKind: 'rect', x: 80, y: 120, width: 840, height: 760, borderRadius: 36, fill: 'rgba(15,23,42,0.62)', shadow: { color: 'rgba(0,0,0,0.45)', blur: 44, offsetX: 0, offsetY: 18 }, zIndex: 2 },
    { id: 'gradient-plate', type: 'overlay', x: 80, y: 120, width: 840, height: 760, borderRadius: 36, background: 'linear-gradient(135deg, rgba(99,102,241,0.55) 0%, rgba(168,85,247,0.46) 52%, rgba(236,72,153,0.40) 100%)', zIndex: 3, animation: { name: 'gradientPan', duration: 9000, iterationCount: 'infinite', easing: 'ease-in-out' } },
    { id: 'glow-panel', type: 'overlay', x: 108, y: 148, width: 784, height: 704, borderRadius: 26, background: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.26) 0%, rgba(255,255,255,0) 60%)', zIndex: 4 },
    { id: 'inner-border', type: 'shape', shapeKind: 'rect', x: 108, y: 148, width: 784, height: 704, borderRadius: 26, border: { color: 'rgba(255,255,255,0.28)', width: 2, style: 'solid' }, zIndex: 5 },
    { id: 'sheen-band', type: 'overlay', x: 80, y: 120, width: 840, height: 760, borderRadius: 36, background: 'linear-gradient(115deg, rgba(255,255,255,0) 36%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0) 64%)', mixBlendMode: 'screen', zIndex: 6, animation: { name: 'gradientPan', duration: 6800, iterationCount: 'infinite', easing: 'linear' } },
    // —— 巨型引号水印：当图形用，压在所有文字之下
    { id: 'quote-watermark', type: 'text', content: '“', fontFamily: { $t: 'fonts.heading' }, fontSize: 520, fontWeight: '900', color: { $t: 'colors.accent' }, opacity: 0.13, lineHeight: 1.1, x: 100, y: 130, width: 520, height: 520, zIndex: 7 },
    { id: 'quote-watermark-end', type: 'text', content: '”', fontFamily: { $t: 'fonts.heading' }, fontSize: 380, fontWeight: '900', color: { $t: 'colors.accent' }, opacity: 0.1, lineHeight: 1.1, x: 520, y: 430, width: 380, height: 380, zIndex: 7 },
    // —— 语录上方装饰：小圆点 + 细线
    { id: 'ornament-dot-top', type: 'shape', shapeKind: 'circle', x: 491, y: 248, width: 18, height: 18, fill: { $t: 'colors.accent' }, opacity: 0.9, zIndex: 8 },
    { id: 'ornament-rule-top', type: 'shape', shapeKind: 'rect', x: 380, y: 288, width: 240, height: 2, fill: { $t: 'colors.accent' }, opacity: 0.5, zIndex: 8, animation: { name: 'slideInLeft', duration: 700, delay: 200 } },
    { id: 'quote-sentence', type: 'text', content: '潮汐把贝壳放回沙滩，\n像大海修改过的\n一句台词。', fontFamily: { $t: 'fonts.heading' }, fontSize: 52, fontWeight: '700', color: { $t: 'colors.primary' }, textAlign: 'center', lineHeight: 1.6, letterSpacing: 2, x: 140, y: 356, width: 720, height: 246, zIndex: 9, shadow: { color: 'rgba(0,0,0,0.35)', blur: 18, offsetX: 0, offsetY: 6 }, animation: { name: 'fadeIn', duration: 1000 }, editable: { content: true, fontSize: { type: 'range', min: 40, max: 60 }, position: true } },
    { id: 'sub-motto', type: 'text', content: 'THE SEA NEVER EXPLAINS ITSELF', fontFamily: 'Helvetica, Arial, sans-serif', fontSize: 20, fontWeight: '600', color: { $t: 'colors.accent' }, letterSpacing: 6, textAlign: 'center', x: 140, y: 628, width: 720, height: 36, zIndex: 9, animation: { name: 'fadeIn', duration: 900, delay: 500 }, editable: { content: true, position: true } },
    // —— 署名行：小圆点 + 名字 + 身份
    { id: 'author-dot', type: 'shape', shapeKind: 'circle', x: 377, y: 702, width: 14, height: 14, fill: { $t: 'colors.accent' }, opacity: 0.85, zIndex: 9 },
    { id: 'author-name', type: 'text', content: '顾 青', fontFamily: { $t: 'fonts.heading' }, fontSize: 30, fontWeight: '800', color: { $t: 'colors.primary' }, letterSpacing: 4, x: 403, y: 682, width: 300, height: 48, zIndex: 9, animation: { name: 'fadeInUp', duration: 800, delay: 700 }, editable: { content: true, position: true } },
    { id: 'author-role', type: 'text', content: '海洋生物研究员 · 舟山沈家门', fontFamily: 'Helvetica, Arial, sans-serif', fontSize: 22, fontWeight: '500', color: { $t: 'colors.primary' }, opacity: 0.62, letterSpacing: 2, x: 403, y: 732, width: 420, height: 36, zIndex: 9, editable: { content: true } },
    { id: 'ornament-rule-bottom', type: 'shape', shapeKind: 'rect', x: 380, y: 792, width: 240, height: 2, fill: { $t: 'colors.accent' }, opacity: 0.4, zIndex: 8, animation: { name: 'slideInRight', duration: 700, delay: 320 } },
    // —— 卡外四角点缀 + 角落页码
    { id: 'corner-cross-tl', type: 'text', content: '+', fontFamily: 'Helvetica, Arial, sans-serif', fontSize: 34, fontWeight: '300', color: { $t: 'colors.accent' }, opacity: 0.45, textAlign: 'center', lineHeight: 1.2, x: 24, y: 24, width: 48, height: 48, zIndex: 10 },
    { id: 'corner-dot-tr', type: 'shape', shapeKind: 'circle', x: 936, y: 30, width: 20, height: 20, fill: { $t: 'colors.accent' }, opacity: 0.8, zIndex: 10, animation: { name: 'twinkle', duration: 2600, iterationCount: 'infinite' } },
    { id: 'corner-dot-bl', type: 'shape', shapeKind: 'circle', x: 34, y: 946, width: 16, height: 16, fill: { $t: 'colors.accent' }, opacity: 0.55, zIndex: 10, animation: { name: 'twinkle', duration: 3200, delay: 800, iterationCount: 'infinite' } },
    { id: 'corner-cross-br', type: 'text', content: '+', fontFamily: 'Helvetica, Arial, sans-serif', fontSize: 26, fontWeight: '300', color: { $t: 'colors.accent' }, opacity: 0.4, textAlign: 'center', lineHeight: 1.2, x: 928, y: 930, width: 44, height: 44, zIndex: 10 },
    { id: 'page-no', type: 'text', content: 'P. 07 / 48', fontFamily: 'Helvetica, Arial, sans-serif', fontSize: 16, fontWeight: '700', color: { $t: 'colors.accent' }, opacity: 0.5, letterSpacing: 3, x: 76, y: 906, width: 200, height: 28, zIndex: 10, editable: { content: true } },
    { id: 'series-tag', type: 'text', content: '流光集 · 第 07 张', fontFamily: 'Helvetica, Arial, sans-serif', fontSize: 18, fontWeight: '600', color: { $t: 'colors.accent' }, opacity: 0.55, letterSpacing: 2, textAlign: 'right', x: 660, y: 902, width: 260, height: 32, zIndex: 10, editable: { content: true } }
  ]
}
]

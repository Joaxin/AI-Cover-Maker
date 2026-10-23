// src/core/templates/magazine/magazine.ts
import type { Template } from '@/types/types'

// ---------- 版面素材 ----------
// 网点：透明 SVG pattern，只做主视觉区的质感底，不参与换色（中性白雾）
function dotField(w: number, h: number, fill: string, r = 2, gap = 20) {
  return 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '"><defs><pattern id="df" width="' + gap + '" height="' + gap + '" patternUnits="userSpaceOnUse"><circle cx="' + gap / 2 + '" cy="' + gap / 2 + '" r="' + r + '" fill="' + fill + '"/></pattern></defs><rect width="' + w + '" height="' + h + '" fill="url(%23df)"/></svg>'
}

// ---------- 可复用字体栈（只取本文件已出现的栈，楷体/Georgia 不入正文）----------
const SANS = 'Helvetica, Arial, sans-serif'

export const magazineTemplates: Template[] = [
{
  id: 'magazine-vogue-editorial', name: '先锋时尚杂志封面', version: '1.0.0', category: 'magazine',
  tags: ['magazine', 'editorial', 'fashion', 'vogue'],
  thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23FAF8F5"/><rect x="18" y="8" width="64" height="9" fill="%23111111"/><rect x="32" y="21" width="36" height="2" fill="%23111111" opacity="0.45"/><rect x="25" y="28" width="50" height="48" fill="%231C1917"/><circle cx="50" cy="43" r="9" fill="%23EAE6DF"/><rect x="25" y="55" width="50" height="0.8" fill="%23EAE6DF" opacity="0.6"/><rect x="28" y="31" width="44" height="42" fill="none" stroke="%23EAE6DF" stroke-width="0.9"/><rect x="30" y="62" width="26" height="3" fill="%23FAF8F5"/><rect x="30" y="67" width="18" height="3" fill="%23FAF8F5"/><rect x="4" y="30" width="2" height="20" fill="%23111111" opacity="0.5"/><rect x="8" y="30" width="13" height="2" fill="%23111111"/><rect x="8" y="38" width="13" height="2" fill="%23111111"/><rect x="8" y="46" width="10" height="2" fill="%23111111"/><rect x="72" y="29" width="17" height="15" fill="%231C1917"/><rect x="74" y="48" width="13" height="2" fill="%23111111"/><rect x="74" y="56" width="13" height="2" fill="%23111111"/><rect x="18" y="90" width="2" height="6" fill="%231C1917"/><rect x="22" y="90" height="6" width="1" fill="%231C1917"/><rect x="25" y="90" width="3" height="6" fill="%231C1917"/><rect x="30" y="90" width="1.4" height="6" fill="%231C1917"/></svg>',
  tokens: {
    colors: {
      bg: { label: '背景色', default: '#FAF8F5', options: ['#FAF8F5', '#F4F4F5', '#EAE6DF', '#FDF9F0'] },
      primary: { label: '主色', default: '#111111', options: ['#111111', '#1E293B', '#7F1D1D', '#1C1917'] },
      accent: { label: '强调色', default: '#EAE6DF', options: ['#EAE6DF', '#FDE68A', '#FCA5A5', '#D4D4D8'] },
      deep: { label: '主视觉深底', default: '#1C1917', options: ['#1C1917', '#111111', '#1E293B', '#14532D', '#3F2A1D'] },
      light: { label: '图上文字', default: '#FAF8F5', options: ['#FAF8F5', '#FFFFFF', '#FDE68A', '#FCA5A5'] }
    },
    fonts: {
      heading: { label: '标题字体', default: 'Didot, Bodoni MT, Georgia, serif', options: ['Didot, Bodoni MT, Georgia, serif', 'Playfair Display, serif', 'Helvetica, Arial, sans-serif'] }
    }
  },
  presets: [
    { name: '暖象牙白', colors: { bg: '#FAF8F5', primary: '#111111', accent: '#EAE6DF' } },
    { name: '冷灰石材', colors: { bg: '#F4F4F5', primary: '#1E293B', accent: '#D4D4D8' } },
    { name: '酒红经典', colors: { bg: '#FAF8F5', primary: '#7F1D1D', accent: '#FCA5A5' } },
    { name: '暮金雅致', colors: { bg: '#FDF9F0', primary: '#1C1917', accent: '#FDE68A' } }
  ],
  canvas: { virtualWidth: 1000, virtualHeight: 1000, defaultWidth: 1000, defaultHeight: 1000, backgroundColor: { $t: 'colors.bg' } },
  elements: [
    // —— 刊头：巨型字压住顶边 + 一行小字 eyebrow
    { id: 'masthead', type: 'text', content: 'MONOCLE', fontFamily: { $t: 'fonts.heading' }, fontSize: 170, fontWeight: '900', color: { $t: 'colors.primary' }, letterSpacing: 4, lineHeight: 1.05, textAlign: 'center', x: 40, y: 30, width: 920, height: 190, zIndex: 5, animation: { name: 'fadeInDown', duration: 900 }, editable: { content: true, fontSize: { type: 'range', min: 110, max: 176 }, position: true } },
    { id: 'masthead-kicker', type: 'text', content: '文化季刊 · CULTURE QUARTERLY', fontFamily: SANS, fontSize: 18, fontWeight: '700', color: { $t: 'colors.primary' }, opacity: 0.6, letterSpacing: 6, textAlign: 'center', x: 40, y: 234, width: 920, height: 30, zIndex: 5, animation: { name: 'fadeIn', duration: 800, delay: 260 }, editable: { content: true } },
    // —— 封面主视觉区：深底 + 流光渐变 + 网点 + 地平线 + 圆盘 + 双层装饰边框
    { id: 'center-artwork-frame', type: 'shape', shapeKind: 'rect', x: 246, y: 280, width: 508, height: 480, fill: { $t: 'colors.deep' }, zIndex: 1 },
    { id: 'visual-sheen', type: 'overlay', x: 246, y: 280, width: 508, height: 480, background: 'linear-gradient(158deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.05) 40%, rgba(0,0,0,0.38) 100%)', zIndex: 2, animation: { name: 'gradientPan', duration: 9000, iterationCount: 'infinite', easing: 'ease-in-out' } },
    { id: 'visual-halftone', type: 'image', src: dotField(508, 480, 'rgba(255,255,255,0.14)', 2.2, 20), objectFit: 'fill', x: 246, y: 280, width: 508, height: 480, opacity: 0.7, zIndex: 2 },
    { id: 'visual-horizon', type: 'shape', shapeKind: 'rect', x: 246, y: 520, width: 508, height: 2, fill: { $t: 'colors.accent' }, opacity: 0.55, zIndex: 2 },
    { id: 'visual-disc', type: 'shape', shapeKind: 'circle', x: 406, y: 336, width: 188, height: 188, fill: { $t: 'colors.accent' }, zIndex: 2, animation: { name: 'float', duration: 6200, iterationCount: 'infinite', easing: 'ease-in-out' } },
    { id: 'visual-border', type: 'shape', shapeKind: 'rect', x: 264, y: 298, width: 472, height: 444, border: { color: { $t: 'colors.accent' }, width: 2, style: 'solid' }, opacity: 0.72, zIndex: 3 },
    { id: 'headline-overlay', type: 'text', content: '新现代主义\n的形式之外', fontFamily: { $t: 'fonts.heading' }, fontSize: 42, fontWeight: '800', color: { $t: 'colors.light' }, letterSpacing: 4, lineHeight: 1.35, x: 280, y: 568, width: 440, height: 130, zIndex: 4, animation: { name: 'rise', duration: 900, delay: 420 }, editable: { content: true, fontSize: { type: 'range', min: 30, max: 46 }, position: true } },
    // —— 左侧竖排侧标
    { id: 'side-label', type: 'text', content: '建\n筑\n与\n生\n活', fontFamily: { $t: 'fonts.heading' }, fontSize: 24, fontWeight: '700', color: { $t: 'colors.primary' }, opacity: 0.55, textAlign: 'center', lineHeight: 1.2, x: 24, y: 300, width: 34, height: 180, zIndex: 4, animation: { name: 'fadeIn', duration: 900, delay: 700 } },
    // —— 左栏 cover lines：短语 + 细横线
    { id: 'coverline-l1', type: 'text', content: '她如何用\n90 天重建\n一座花园', fontFamily: { $t: 'fonts.heading' }, fontSize: 24, fontWeight: '800', color: { $t: 'colors.primary' }, letterSpacing: 1, lineHeight: 1.5, x: 68, y: 300, width: 158, height: 112, zIndex: 4, animation: { name: 'slideInLeft', duration: 750, delay: 300 }, editable: { content: true, position: true } },
    { id: 'coverline-l1-rule', type: 'shape', shapeKind: 'rect', x: 68, y: 424, width: 72, height: 2, fill: { $t: 'colors.primary' }, opacity: 0.32, zIndex: 4 },
    { id: 'coverline-l2', type: 'text', content: '王澍在温州\n的六年工地', fontFamily: SANS, fontSize: 24, fontWeight: '700', color: { $t: 'colors.primary' }, opacity: 0.86, letterSpacing: 1, lineHeight: 1.5, x: 68, y: 446, width: 158, height: 80, zIndex: 4, animation: { name: 'slideInLeft', duration: 750, delay: 460 }, editable: { content: true, position: true } },
    { id: 'coverline-l2-rule', type: 'shape', shapeKind: 'rect', x: 68, y: 538, width: 72, height: 2, fill: { $t: 'colors.primary' }, opacity: 0.32, zIndex: 4 },
    { id: 'coverline-l3', type: 'text', content: '一间九平米\n的书房里\n如何居住', fontFamily: SANS, fontSize: 22, fontWeight: '500', color: { $t: 'colors.primary' }, opacity: 0.7, letterSpacing: 1, lineHeight: 1.5, x: 68, y: 560, width: 158, height: 104, zIndex: 4, animation: { name: 'slideInLeft', duration: 750, delay: 620 }, editable: { content: true, position: true } },
    { id: 'coverline-l3-rule', type: 'shape', shapeKind: 'rect', x: 68, y: 676, width: 52, height: 2, fill: { $t: 'colors.primary' }, opacity: 0.32, zIndex: 4 },
    // —— 右上角标：期号 + 日期深底块
    { id: 'issue-badge', type: 'shape', shapeKind: 'rect', x: 800, y: 300, width: 166, height: 152, fill: { $t: 'colors.deep' }, zIndex: 3 },
    { id: 'issue-info', type: 'text', content: 'Nº 84', fontFamily: { $t: 'fonts.heading' }, fontSize: 30, fontWeight: '900', color: { $t: 'colors.light' }, letterSpacing: 3, textAlign: 'center', x: 800, y: 326, width: 166, height: 44, zIndex: 4, editable: { content: true } },
    { id: 'issue-date', type: 'text', content: '秋季刊\nAUTUMN 2026', fontFamily: SANS, fontSize: 17, fontWeight: '600', color: { $t: 'colors.light' }, opacity: 0.82, letterSpacing: 2, lineHeight: 1.5, textAlign: 'center', x: 800, y: 376, width: 166, height: 58, zIndex: 4, animation: { name: 'fadeIn', duration: 800, delay: 560 }, editable: { content: true } },
    // —— 右栏 cover lines
    { id: 'coverline-r1', type: 'text', content: '米兰现场\n设计周笔记', fontFamily: { $t: 'fonts.heading' }, fontSize: 24, fontWeight: '800', color: { $t: 'colors.primary' }, letterSpacing: 1, lineHeight: 1.5, textAlign: 'right', x: 800, y: 490, width: 166, height: 80, zIndex: 4, animation: { name: 'slideInRight', duration: 750, delay: 380 }, editable: { content: true, position: true } },
    { id: 'coverline-r1-rule', type: 'shape', shapeKind: 'rect', x: 894, y: 578, width: 72, height: 2, fill: { $t: 'colors.primary' }, opacity: 0.32, zIndex: 4 },
    { id: 'coverline-r2', type: 'text', content: '室内植物\n与光线\n的九种关系', fontFamily: SANS, fontSize: 22, fontWeight: '600', color: { $t: 'colors.primary' }, opacity: 0.78, letterSpacing: 1, lineHeight: 1.5, textAlign: 'right', x: 800, y: 604, width: 166, height: 104, zIndex: 4, animation: { name: 'slideInRight', duration: 750, delay: 540 }, editable: { content: true, position: true } },
    { id: 'coverline-r2-rule', type: 'shape', shapeKind: 'rect', x: 914, y: 720, width: 52, height: 2, fill: { $t: 'colors.primary' }, opacity: 0.32, zIndex: 4 },
    // —— 底部：价格小字 + 条形码组
    { id: 'price-tag', type: 'text', content: '定价 ¥48 / 港币 60', fontFamily: SANS, fontSize: 14, fontWeight: '600', color: { $t: 'colors.primary' }, opacity: 0.62, letterSpacing: 1, textAlign: 'right', x: 770, y: 920, width: 196, height: 30, zIndex: 4, editable: { content: true } },
    { id: 'barcode', type: 'shape', shapeKind: 'rect', x: 40, y: 920, width: 12, height: 44, fill: { $t: 'colors.deep' }, group: 'barcode', zIndex: 4 },
    { id: 'barcode-2', type: 'shape', shapeKind: 'rect', x: 58, y: 920, width: 4, height: 44, fill: { $t: 'colors.deep' }, group: 'barcode', zIndex: 4 },
    { id: 'barcode-3', type: 'shape', shapeKind: 'rect', x: 66, y: 920, width: 8, height: 44, fill: { $t: 'colors.deep' }, group: 'barcode', zIndex: 4 },
    { id: 'barcode-4', type: 'shape', shapeKind: 'rect', x: 78, y: 920, width: 14, height: 44, fill: { $t: 'colors.deep' }, group: 'barcode', zIndex: 4 }
  ]
},
{
  id: 'magazine-typography-heavy', name: '全版式字型杂志', version: '1.1.0', category: 'magazine',
  tags: ['magazine', 'typography', 'bold', 'print'],
  thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23E11D48"/><rect x="5" y="5" width="90" height="90" fill="none" stroke="%23ffffff" stroke-width="0.6" opacity="0.35"/><text x="6" y="62" font-size="58" font-family="Impact,Arial,sans-serif" font-weight="bold" fill="%23ffffff">M</text><rect x="68" y="14" width="27" height="7" fill="%23ffffff"/><rect x="68" y="24" width="20" height="3" fill="%23000000"/><rect x="68" y="31" width="27" height="1.6" fill="%23FFE4E6" opacity="0.7"/><rect x="68" y="36" width="24" height="1.6" fill="%23FFE4E6" opacity="0.7"/><rect x="68" y="41" width="26" height="1.6" fill="%23FFE4E6" opacity="0.7"/><rect x="6" y="64" width="9" height="9" fill="%23000000"/><rect x="18" y="64" width="9" height="9" fill="%23000000"/><rect x="30" y="64" width="9" height="9" fill="%23000000"/><rect x="5" y="78" width="90" height="0.8" fill="%23ffffff" opacity="0.4"/><rect x="7" y="81" width="34" height="1.6" fill="%23FFE4E6"/><rect x="7" y="85" width="30" height="1.6" fill="%23FFE4E6" opacity="0.7"/><rect x="55" y="81" width="34" height="1.6" fill="%23FFE4E6"/><rect x="55" y="85" width="28" height="1.6" fill="%23FFE4E6" opacity="0.7"/></svg>',
  tokens: {
    colors: {
      bg: { label: '版面底色', default: '#E11D48', options: ['#E11D48', '#BE123C', '#9F1239', '#881337', '#171717', '#14532D', '#1E3A8A'] },
      ink: { label: '条带墨色', default: '#000000', options: ['#000000', '#171717', '#FFFFFF', '#0F172A', '#052E16'] },
      paper: { label: '主文字', default: '#FFFFFF', options: ['#FFFFFF', '#FDF6E3', '#000000', '#171717'] },
      soft: { label: '次级文字', default: '#FFE4E6', options: ['#FFE4E6', '#FECDD3', '#E7E5E4', '#BBF7D0', '#BFDBFE'] }
    },
    fonts: {
      head: { label: '大标题字体', default: 'Impact, Helvetica, sans-serif', options: ['Impact, Helvetica, sans-serif', 'Arial Black, sans-serif', 'Georgia, serif'] }
    }
  },
  presets: [
    { name: '深红宣言', colors: { bg: '#E11D48', ink: '#000000', paper: '#FFFFFF', soft: '#FFE4E6' } },
    { name: '纯黑高对比', colors: { bg: '#171717', ink: '#FFFFFF', paper: '#171717', soft: '#E7E5E4' } },
    { name: '墨绿印刷', colors: { bg: '#14532D', ink: '#052E16', paper: '#FDF6E3', soft: '#BBF7D0' } },
    { name: '靛蓝季刊', colors: { bg: '#1E3A8A', ink: '#0F172A', paper: '#FFFFFF', soft: '#BFDBFE' } }
  ],
  canvas: { virtualWidth: 1000, virtualHeight: 1000, defaultWidth: 1000, defaultHeight: 1000, backgroundColor: { $t: 'colors.bg' } },
  elements: [
    // —— 底层：版面光晕，让纯色不显得平
    { id: 'paper-glow', type: 'overlay', x: 40, y: 40, width: 920, height: 920, background: 'radial-gradient(circle at 16% 10%, rgba(255,255,255,0.20), rgba(255,255,255,0) 58%)', zIndex: 1 },
    // —— 顶带：眉标 / 页码 / 通栏细线
    { id: 'rule-top', type: 'shape', shapeKind: 'rect', x: 48, y: 64, width: 904, height: 4, fill: { $t: 'colors.ink' }, opacity: 0.6, zIndex: 3 },
    { id: 'kicker', type: 'text', content: 'TYPOGRAPHY 字型季刊 · VOL. 04', fontFamily: { $t: 'fonts.head' }, fontSize: 20, fontWeight: '700', color: { $t: 'colors.soft' }, letterSpacing: 5, x: 48, y: 78, width: 520, height: 30, zIndex: 4, animation: { name: 'slideInLeft', duration: 600 }, editable: { content: true } },
    { id: 'page-num', type: 'text', content: 'P. 01 / 128', fontFamily: SANS, fontSize: 20, fontWeight: '700', color: { $t: 'colors.soft' }, letterSpacing: 3, textAlign: 'right', x: 700, y: 78, width: 252, height: 30, zIndex: 4, editable: { content: true } },
    // —— 超大首字：一个字当半张海报的图形
    { id: 'huge-word', type: 'text', content: 'M', fontFamily: { $t: 'fonts.head' }, fontSize: 440, fontWeight: '900', color: { $t: 'colors.paper' }, lineHeight: 1.1, x: 16, y: 112, width: 600, height: 500, zIndex: 2, animation: { name: 'slideInLeft', duration: 700 }, editable: { content: true, fontSize: { type: 'range', min: 300, max: 470 }, position: true } },
    // —— 右栏标题组
    { id: 'title-cn', type: 'text', content: '宣言', fontFamily: { $t: 'fonts.head' }, fontSize: 120, fontWeight: '900', color: { $t: 'colors.paper' }, letterSpacing: 8, lineHeight: 1.05, x: 676, y: 140, width: 276, height: 140, zIndex: 4, animation: { name: 'inkReveal', duration: 1000, delay: 200 }, editable: { content: true, fontSize: { type: 'range', min: 80, max: 128 }, position: true } },
    { id: 'subtitle-text', type: 'text', content: 'MANIFESTO', fontFamily: { $t: 'fonts.head' }, fontSize: 38, fontWeight: '900', color: { $t: 'colors.ink' }, letterSpacing: 1, x: 676, y: 292, width: 276, height: 52, zIndex: 4, animation: { name: 'fadeInUp', duration: 700, delay: 320 }, editable: { content: true } },
    { id: 'subtitle-bar', type: 'shape', shapeKind: 'rect', x: 676, y: 356, width: 276, height: 6, fill: { $t: 'colors.ink' }, zIndex: 4 },
    { id: 'title-sub', type: 'text', content: 'CRITICAL ESSAYS ON\nCONTEMPORARY CULTURE', fontFamily: SANS, fontSize: 18, fontWeight: '700', color: { $t: 'colors.soft' }, letterSpacing: 1, lineHeight: 1.6, x: 676, y: 374, width: 276, height: 76, zIndex: 4, editable: { content: true } },
    { id: 'toc-head', type: 'text', content: '本期目录 / CONTENTS', fontFamily: SANS, fontSize: 20, fontWeight: '800', color: { $t: 'colors.paper' }, letterSpacing: 2, x: 676, y: 452, width: 276, height: 30, zIndex: 4, editable: { content: true } },
    { id: 'toc-list', type: 'text', content: '01 网格的沉默 P.04\n02 字距的政治 P.18\n03 一间字号的房 P.36\n04 汉字的骨架 P.52\n05 留白练习册 P.71', fontFamily: SANS, fontSize: 19, fontWeight: '500', color: { $t: 'colors.soft' }, lineHeight: 1.75, x: 676, y: 486, width: 276, height: 176, zIndex: 4, animation: { name: 'fadeIn', duration: 800, delay: 520 }, editable: { content: true } },
    // —— 旋转 90° 的边脊文字
    { id: 'spine-text', type: 'text', content: '字型实验季刊 VOL.04', fontFamily: SANS, fontSize: 16, fontWeight: '700', color: { $t: 'colors.soft' }, opacity: 0.55, letterSpacing: 2, rotation: 90, x: 760, y: 587, width: 200, height: 26, zIndex: 4 },
    // —— 编辑部门小方块
    { id: 'dept-1', group: 'dept-', type: 'shape', shapeKind: 'rect', x: 16, y: 560, width: 100, height: 100, fill: { $t: 'colors.ink' }, zIndex: 3, animation: { name: 'zoomIn', duration: 500, delay: 640 } },
    { id: 'dept-1-label', type: 'text', content: '编辑部', fontFamily: SANS, fontSize: 20, fontWeight: '800', color: { $t: 'colors.paper' }, textAlign: 'center', lineHeight: 1.4, x: 16, y: 588, width: 100, height: 44, zIndex: 4, editable: { content: true } },
    { id: 'dept-2', group: 'dept-', type: 'shape', shapeKind: 'rect', x: 132, y: 560, width: 100, height: 100, fill: { $t: 'colors.paper' }, opacity: 0.9, zIndex: 3, animation: { name: 'zoomIn', duration: 500, delay: 740 } },
    { id: 'dept-2-label', type: 'text', content: '视觉部', fontFamily: SANS, fontSize: 20, fontWeight: '800', color: { $t: 'colors.ink' }, textAlign: 'center', lineHeight: 1.4, x: 132, y: 588, width: 100, height: 44, zIndex: 4, editable: { content: true } },
    { id: 'dept-3', group: 'dept-', type: 'shape', shapeKind: 'rect', x: 248, y: 560, width: 100, height: 100, border: { color: { $t: 'colors.paper' }, width: 3, style: 'solid' }, zIndex: 3, animation: { name: 'zoomIn', duration: 500, delay: 840 } },
    { id: 'dept-3-label', type: 'text', content: '发行部', fontFamily: SANS, fontSize: 20, fontWeight: '800', color: { $t: 'colors.paper' }, textAlign: 'center', lineHeight: 1.4, x: 248, y: 588, width: 100, height: 44, zIndex: 4, editable: { content: true } },
    // —— 双栏行组：左内文 / 右注释
    { id: 'rule-mid', type: 'shape', shapeKind: 'rect', x: 48, y: 700, width: 904, height: 3, fill: { $t: 'colors.paper' }, opacity: 0.35, zIndex: 3 },
    { id: 'col-1-head', type: 'text', content: '内文摘录 / TEXT', fontFamily: SANS, fontSize: 19, fontWeight: '800', color: { $t: 'colors.paper' }, letterSpacing: 3, x: 48, y: 718, width: 420, height: 28, zIndex: 4, editable: { content: true } },
    { id: 'bottom-col-left', type: 'text', content: '版式的秩序，\n建立在看不见的\n网格之上：字距\n是呼吸，行距是\n步速，留白是态度。', fontFamily: SANS, fontSize: 20, fontWeight: '500', color: { $t: 'colors.soft' }, lineHeight: 1.85, x: 48, y: 754, width: 420, height: 186, zIndex: 4, animation: { name: 'fadeInUp', duration: 800, delay: 620 }, editable: { content: true } },
    { id: 'col-2-head', type: 'text', content: '索引与注释 / NOTES', fontFamily: SANS, fontSize: 19, fontWeight: '800', color: { $t: 'colors.paper' }, letterSpacing: 3, x: 520, y: 718, width: 432, height: 28, zIndex: 4, editable: { content: true } },
    { id: 'bottom-col-right', type: 'text', content: '① 全刊使用 12 栏网格\n② 标题字距 -2 / 正文 +6\n③ 首字占版 5/8 页\n④ 大写字形复刻自金属活字\n⑤ 本页所有文字均可改写', fontFamily: SANS, fontSize: 18, fontWeight: '500', color: { $t: 'colors.soft' }, lineHeight: 1.8, x: 520, y: 754, width: 432, height: 186, zIndex: 4, animation: { name: 'fadeInUp', duration: 800, delay: 760 }, editable: { content: true } }
  ]
}
]

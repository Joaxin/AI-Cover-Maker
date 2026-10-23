// src/core/templates/chinese/chinese-huizhu.ts —— 徽派建筑
import type { Template } from '@/types/types'

// 远山淡影
const MOUNTAIN_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 120"><path d="M0 120 L70 40 L130 95 L190 25 L260 100 L320 55 L400 120 Z" fill="%2378716c" opacity="0.28"/><path d="M0 120 L90 65 L170 110 L250 50 L340 112 L400 80 L400 120 Z" fill="%2357534e" opacity="0.2"/></svg>'

// 归雁一行
const WILD_GEESE_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 50"><g fill="none" stroke="%2344403c" stroke-width="2.5" stroke-linecap="round" opacity="0.6"><path d="M8 28 Q 16 17 24 26 Q 32 17 40 28"/><path d="M62 16 Q 69 7 76 15 Q 83 7 90 16"/><path d="M118 30 Q 125 20 132 29 Q 139 20 146 30"/><path d="M176 18 Q 183 9 190 17 Q 197 9 204 18"/></g></svg>'

// 月洞窗棂
const WINDOW_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><g fill="none" stroke="%23292524" stroke-width="3"><circle cx="50" cy="50" r="46"/><path d="M50 4 V96 M4 50 H96"/><circle cx="50" cy="50" r="22" stroke-dasharray="4 4"/></g></svg>'

// ===== HZ_ 前缀：徽派专用（边框角饰／瓦当／漏窗／水面／斑驳） =====
// 四角砖雕角饰 + 门罩线（一整张，只在四角落笔）
const HZ_CORNER_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><g fill="none" stroke="%231c1917" stroke-width="4" stroke-linecap="round" opacity="0.72"><path d="M62 168 L62 62 L168 62"/><path d="M938 168 L938 62 L832 62"/><path d="M62 832 L62 938 L168 938"/><path d="M938 832 L938 938 L832 938"/></g><g fill="none" stroke="%234d7c6a" stroke-width="2.5" opacity="0.8"><path d="M88 168 Q 88 88 168 88"/><path d="M912 168 Q 912 88 832 88"/><path d="M88 832 Q 88 912 168 912"/><path d="M912 832 Q 912 912 832 912"/></g><g fill="%231c1917" opacity="0.6"><rect x="104" y="104" width="12" height="12" transform="rotate(45 110 110)"/><rect x="884" y="104" width="12" height="12" transform="rotate(45 890 110)"/><rect x="104" y="884" width="12" height="12" transform="rotate(45 110 890)"/><rect x="884" y="884" width="12" height="12" transform="rotate(45 890 890)"/></g></svg>'
// 瓦当一排：白灰勾缝，压在黛色檐口上
const HZ_TILES_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 18"><g fill="none" stroke="%23f5f5f4" stroke-width="2">' + Array.from({ length: 8 }, (_, i) => `<circle cx="${10 + i * 20}" cy="9" r="7.5"/><path d="M${10 + i * 20} 3 V15 M${3.5 + i * 20} 9 H16.5" stroke-width="1" opacity="0.8"/>`).join('') + '</g></svg>'
// 方形漏窗：冰裂棂条，自带粉墙底色
const HZ_LATTICE_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect x="4" y="4" width="92" height="92" rx="5" fill="%23f5f5f4"/><g fill="none" stroke="%23292524" stroke-width="3"><rect x="4" y="4" width="92" height="92" rx="5"/><g stroke-width="2" opacity="0.85"><path d="M28 6 V94 M50 6 V94 M72 6 V94 M6 28 H94 M6 50 H94 M6 72 H94"/></g><rect x="38" y="38" width="24" height="24" transform="rotate(45 50 50)"/></g></svg>'
// 月沼水面：几道倒影波纹
const HZ_REFLECT_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 62"><g fill="none" stroke="%231c1917" stroke-width="2" stroke-linecap="round" opacity="0.32">' + Array.from({ length: 7 }, (_, i) => `<path d="M${24 + i * 24} ${12 + (i % 3) * 8} q ${40 + (i % 4) * 24} ${6 - (i % 2) * 12} ${86 + (i % 3) * 28} 0"/>`).join('') + '</g><g fill="%234d7c6a" opacity="0.28">' + Array.from({ length: 9 }, (_, i) => `<rect x="${(i * 89) % 730 + 14}" y="${10 + (i % 4) * 12}" width="${24 + (i % 3) * 16}" height="2" rx="1"/>`).join('') + '</g></svg>'
// 墙面斑驳：雨痕、苔点、细裂（做旧层）
const HZ_MOSS_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><g fill="none" stroke="%234d7c6a" stroke-width="3" stroke-linecap="round" opacity="0.16">' + Array.from({ length: 12 }, (_, i) => `<path d="M${(i * 149) % 900 + 40} ${(i * 283) % 640 + 260} q ${2 - (i % 3)} ${24 + (i % 4) * 12} ${i % 2 ? 5 : -5} ${56 + (i % 3) * 16}"/>`).join('') + '</g><g fill="%231c1917" opacity="0.1">' + Array.from({ length: 28 }, (_, i) => `<circle cx="${(i * 331) % 950 + 20}" cy="${(i * 467) % 930 + 30}" r="${(1.3 + (i % 5) * 0.8).toFixed(1)}"/>`).join('') + '</g><g fill="none" stroke="%231c1917" stroke-width="1" opacity="0.12">' + Array.from({ length: 7 }, (_, i) => `<path d="M${(i * 227) % 860 + 60} ${(i * 521) % 720 + 110} l ${12 + (i % 4) * 10} ${-8 + (i % 3) * 12}"/>`).join('') + '</g></svg>'

export const chineseHuizhuTemplate: Template = {
  id: 'chinese-huizhu-ma', name: '徽派马头墙', version: '1.1.0', category: 'chinese', tags: ['chinese', 'huizhou', 'architecture', 'ink'],
  thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23f5f5f4"/><path d="M54 34 L64 20 L74 31 L84 21 L94 34 Z" fill="%2378716c" opacity="0.22"/><g fill="none" stroke="%2344403c" stroke-width="1" stroke-linecap="round" opacity="0.55"><path d="M57 14 q2.4 -2.6 4.8 0 q2.4 -2.6 4.8 0"/><path d="M70 10 q2 -2.2 4 0 q2 -2.2 4 0"/></g><rect x="8" y="37.5" width="15" height="3.4" fill="%231c1917"/><rect x="10" y="40.5" width="11" height="41.5" fill="%231c1917"/><rect x="22.5" y="50.4" width="12" height="3" fill="%234d7c6a"/><rect x="24" y="53" width="9" height="29" fill="%234d7c6a" opacity="0.9"/><rect x="34.6" y="60.4" width="9.8" height="2.4" fill="%231c1917" opacity="0.8"/><rect x="36" y="62.4" width="7" height="19.6" fill="%231c1917" opacity="0.72"/><rect x="42.8" y="68.8" width="8.4" height="2" fill="%2344403c" opacity="0.7"/><rect x="44" y="70.4" width="6" height="11.6" fill="%2344403c" opacity="0.6"/><g fill="none" stroke="%23f5f5f4" stroke-width="0.5" opacity="0.9"><path d="M10.5 39.2 h11"/></g><g fill="none" stroke="%23f5f5f4" stroke-width="0.5"><circle cx="12" cy="39.2" r="1"/><circle cx="15" cy="39.2" r="1"/><circle cx="18" cy="39.2" r="1"/><circle cx="21" cy="39.2" r="1"/></g><circle cx="15.5" cy="49" r="3.2" fill="%23f5f5f4" opacity="0.95"/><g fill="none" stroke="%231c1917" stroke-width="0.55"><circle cx="15.5" cy="49" r="3.2"/><path d="M15.5 45.8 V52.2 M12.3 49 H18.7"/></g><rect x="12.4" y="62" width="6.6" height="6.6" fill="%23f5f5f4"/><g fill="none" stroke="%231c1917" stroke-width="0.5"><rect x="12.4" y="62" width="6.6" height="6.6"/><path d="M14.6 62 V68.6 M16.9 62 V68.6 M12.4 64.2 H19 M12.4 66.5 H19"/></g><rect x="8" y="82" width="84" height="1.3" fill="%234d7c6a"/><g fill="none" stroke="%231c1917" stroke-width="0.6" stroke-linecap="round" opacity="0.24"><path d="M12 87 q9 1.6 18 0"/><path d="M34 90.5 q11 -1.8 22 0"/><path d="M18 94 q8 1.5 16 0"/><path d="M56 94.5 q9 -1.4 18 0"/></g><g fill="%231c1917"><rect x="62" y="42" width="7" height="7"/><rect x="62" y="49.5" width="7" height="7"/><rect x="62" y="57" width="7" height="7"/><rect x="62" y="64.5" width="7" height="7"/><rect x="62" y="72" width="7" height="7"/></g><g fill="%234d7c6a" opacity="0.85"><rect x="73" y="44" width="4.4" height="4.4"/><rect x="73" y="51" width="4.4" height="4.4"/><rect x="73" y="58" width="4.4" height="4.4"/></g><g fill="%234d7c6a" opacity="0.7"><rect x="62" y="83" width="20" height="1.4"/><rect x="62" y="86" width="13" height="1.4"/></g><circle cx="79" cy="71" r="3.6" fill="none" stroke="%23991b1b" stroke-width="1"/><circle cx="79" cy="71" r="1.8" fill="%23991b1b"/><rect x="85" y="68" width="1.8" height="7" fill="%23991b1b" opacity="0.8"/><g fill="none" stroke="%231c1917" stroke-width="1.1" stroke-linecap="round" opacity="0.75"><path d="M9 20 V9 H20"/><path d="M80 9 H91 V20"/><path d="M9 80 V91 H20"/><path d="M91 80 V91 H80"/></g><rect x="3" y="3" width="94" height="94" fill="none" stroke="%231c1917" stroke-width="1" opacity="0.8"/><rect x="6.5" y="6.5" width="87" height="87" fill="none" stroke="%234d7c6a" stroke-width="0.6" stroke-dasharray="2.4 1.8" opacity="0.8"/><g fill="%231c1917" opacity="0.12"><circle cx="46" cy="26" r="1.2"/><circle cx="30" cy="34" r="1"/><circle cx="52" cy="60" r="0.9"/></g></svg>',
  tokens: {
    colors: {
      bg: { label: '粉墙', default: '#F5F5F4', options: ['#F5F5F4', '#FAFAF9', '#E7E5E4', '#EEF1EA', '#F0EDE4'] },
      primary: { label: '黛瓦', default: '#1C1917', options: ['#1C1917', '#292524', '#44403C', '#334155', '#1F3A2D'] },
      accent: { label: '苔青', default: '#4D7C6A', options: ['#4D7C6A', '#6B8F71', '#3F6254', '#94A3B8', '#8A6B3F'] }
    },
    fonts: { heading: { label: '标题字体', default: 'STSong, Songti SC, SimSun, serif', options: ['STSong, Songti SC, SimSun, serif', 'STKaiti, KaiTi, serif', 'SimHei, sans-serif'] } }
  },
  presets: [
    { name: '淡墨烟雨', colors: { bg: '#F5F5F4', primary: '#1C1917', accent: '#4D7C6A' } },
    { name: '暮雪初霁', colors: { bg: '#EEF1EA', primary: '#334155', accent: '#94A3B8' } },
    { name: '苔径夕照', colors: { bg: '#F0EDE4', primary: '#1F3A2D', accent: '#8A6B3F' } },
    { name: '黛瓦苔痕', colors: { bg: '#E7E5E4', primary: '#292524', accent: '#6B8F71' } }
  ],
  canvas: {
    virtualWidth: 1000, virtualHeight: 1000, defaultWidth: 1000, defaultHeight: 1000, backgroundColor: { $t: 'colors.bg' },
    backgroundImage: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000"><path d="M0 880 Q 300 810 620 878 T 1000 858 L1000 1000 L0 1000 Z" fill="%23d6d3d1" opacity="0.55"/><g fill="%23a8a29e" opacity="0.16"><circle cx="150" cy="200" r="90"/><circle cx="880" cy="150" r="60"/></g></svg>'
  },
  elements: [
    { id: 'mountains', type: 'image', src: MOUNTAIN_SVG, x: 340, y: 120, width: 580, height: 174, objectFit: 'contain', zIndex: 1, animation: { name: 'drift', duration: 20000, iterationCount: 'infinite', easing: 'ease-in-out' }, editable: { position: true, size: { type: 'scale' } } },
    { id: 'geese', type: 'image', src: WILD_GEESE_SVG, x: 520, y: 320, width: 240, height: 55, objectFit: 'contain', zIndex: 1, animation: { name: 'slideInRight', duration: 1800, delay: 500 } },
    // 边框：双层（黛线 + 苔青虚线）＋四角砖雕
    { id: 'frame-outer', type: 'shape', shapeKind: 'rect', x: 28, y: 28, width: 944, height: 944, fill: 'transparent', border: { color: { $t: 'colors.primary' }, width: 3 }, opacity: 0.75, zIndex: 1, animation: { name: 'fadeIn', duration: 1200 } },
    { id: 'frame-inner', type: 'shape', shapeKind: 'rect', x: 46, y: 46, width: 908, height: 908, fill: 'transparent', border: { color: { $t: 'colors.accent' }, width: 1.5, style: 'dashed' }, opacity: 0.45, zIndex: 1, animation: { name: 'fadeIn', duration: 1200, delay: 250 } },
    { id: 'corner-bracket', type: 'image', src: HZ_CORNER_SVG, x: 0, y: 0, width: 1000, height: 1000, objectFit: 'fill', opacity: 0.9, zIndex: 2, animation: { name: 'fadeIn', duration: 1200, delay: 420 } },
    // 马头墙阶梯：一级级跌落的黛色山墙
    { id: 'wall-1', group: 'wall-', type: 'shape', shapeKind: 'rect', x: 100, y: 420, width: 110, height: 460, fill: { $t: 'colors.primary' }, zIndex: 2 },
    { id: 'cap-1', group: 'cap-', type: 'shape', shapeKind: 'rect', x: 84, y: 400, width: 142, height: 26, fill: { $t: 'colors.primary' }, shadow: { offsetX: 0, offsetY: 4, blur: 8, color: 'rgba(28, 25, 23, 0.4)' }, zIndex: 3 },
    { id: 'wall-2', group: 'wall-', type: 'shape', shapeKind: 'rect', x: 280, y: 520, width: 90, height: 360, fill: { $t: 'colors.accent' }, opacity: 0.9, zIndex: 2 },
    { id: 'cap-2', group: 'cap-', type: 'shape', shapeKind: 'rect', x: 266, y: 502, width: 118, height: 22, fill: { $t: 'colors.accent' }, shadow: { offsetX: 0, offsetY: 4, blur: 8, color: 'rgba(28, 25, 23, 0.35)' }, zIndex: 3 },
    { id: 'wall-3', group: 'wall-', type: 'shape', shapeKind: 'rect', x: 196, y: 628, width: 84, height: 252, fill: { $t: 'colors.primary' }, opacity: 0.72, zIndex: 2, animation: { name: 'fadeInUp', duration: 1100, delay: 300 } },
    { id: 'cap-3', group: 'cap-', type: 'shape', shapeKind: 'rect', x: 182, y: 610, width: 112, height: 20, fill: { $t: 'colors.primary' }, opacity: 0.85, zIndex: 3, animation: { name: 'fadeInUp', duration: 1100, delay: 300 } },
    { id: 'wall-4', group: 'wall-', type: 'shape', shapeKind: 'rect', x: 436, y: 700, width: 70, height: 180, fill: { $t: 'colors.accent' }, opacity: 0.62, zIndex: 2, animation: { name: 'fadeInUp', duration: 1100, delay: 520 } },
    { id: 'cap-4', group: 'cap-', type: 'shape', shapeKind: 'rect', x: 424, y: 686, width: 94, height: 16, fill: { $t: 'colors.accent' }, opacity: 0.8, zIndex: 3, animation: { name: 'fadeInUp', duration: 1100, delay: 520 } },
    // 月洞窗透光 ＋ 瓦当阵列 ＋ 方形漏窗
    { id: 'window-glow', type: 'shape', shapeKind: 'circle', x: 116, y: 474, width: 78, height: 78, fill: { $t: 'colors.bg' }, opacity: 0.95, zIndex: 3, animation: { name: 'glow', duration: 6000, iterationCount: 'infinite', easing: 'ease-in-out' } },
    { id: 'window', type: 'image', src: WINDOW_SVG, x: 122, y: 480, width: 66, height: 66, objectFit: 'contain', zIndex: 4 },
    { id: 'tiles-1', type: 'image', src: HZ_TILES_SVG, x: 84, y: 404, width: 142, height: 16, objectFit: 'fill', opacity: 0.9, zIndex: 4 },
    { id: 'tiles-2', type: 'image', src: HZ_TILES_SVG, x: 266, y: 506, width: 118, height: 14, objectFit: 'fill', opacity: 0.85, zIndex: 4 },
    { id: 'window-3', type: 'image', src: HZ_LATTICE_SVG, x: 124, y: 600, width: 62, height: 62, objectFit: 'fill', zIndex: 4, animation: { name: 'zoomIn', duration: 900, delay: 700 } },
    // 水口与做旧
    { id: 'reflection', type: 'image', src: HZ_REFLECT_SVG, x: 100, y: 888, width: 800, height: 62, objectFit: 'fill', opacity: 0.55, zIndex: 2, animation: { name: 'drift', duration: 26000, iterationCount: 'infinite', easing: 'ease-in-out' } },
    { id: 'moss-line', type: 'shape', shapeKind: 'line', x: 100, y: 880, width: 800, height: 4, border: { color: { $t: 'colors.accent' }, width: 4 }, zIndex: 2 },
    { id: 'wall-moss', type: 'image', src: HZ_MOSS_SVG, x: 0, y: 0, width: 1000, height: 1000, objectFit: 'fill', opacity: 0.5, zIndex: 4 },
    { id: 'title-vertical', type: 'text', content: '一\n方\n水\n土\n\n一\n方\n人', fontFamily: { $t: 'fonts.heading' }, fontSize: 52, fontWeight: '900', color: { $t: 'colors.primary' }, lineHeight: 1.12, x: 620, y: 400, width: 76, height: 480, zIndex: 5, animation: { name: 'inkReveal', duration: 1600 }, editable: { content: true, fontSize: { type: 'range', min: 40, max: 60 }, position: true } },
    { id: 'title-sub', type: 'text', content: '粉墙黛瓦\n马头墙\n徽州府', fontFamily: { $t: 'fonts.heading' }, fontSize: 24, fontWeight: '500', color: { $t: 'colors.accent' }, letterSpacing: 8, lineHeight: 2, x: 740, y: 470, width: 160, height: 240, zIndex: 5, animation: { name: 'fadeIn', duration: 1000, delay: 900 }, editable: { content: true } },
    // 朱色印记组：印框 + 长条印边 + 圆印
    { id: 'seal-frame', type: 'shape', shapeKind: 'rect', x: 768, y: 702, width: 66, height: 66, rotation: -3, fill: 'transparent', border: { color: '#991B1B', width: 2 }, opacity: 0.85, zIndex: 5, animation: { name: 'zoomIn', duration: 700, delay: 1200 } },
    { id: 'seal-side', type: 'shape', shapeKind: 'rect', x: 842, y: 704, width: 16, height: 64, fill: '#991B1B', opacity: 0.78, zIndex: 5, animation: { name: 'fadeIn', duration: 800, delay: 1350 } },
    { id: 'seal-dot', type: 'shape', shapeKind: 'circle', x: 786, y: 720, width: 30, height: 30, fill: '#991B1B', zIndex: 5 },
    { id: 'seal-dot-text', type: 'text', content: '徽', fontFamily: { $t: 'fonts.heading' }, fontSize: 17, fontWeight: '700', color: '#FFFFFF', textAlign: 'center', x: 786, y: 724, width: 30, height: 24, zIndex: 6, editable: { content: true } },
    { id: 'hall-mark', type: 'text', content: '敦本堂 · 明弘治十三年建\n晒谱日勿动我家枣', fontFamily: { $t: 'fonts.heading' }, fontSize: 20, fontWeight: '500', color: { $t: 'colors.accent' }, letterSpacing: 2, lineHeight: 1.5, x: 104, y: 902, width: 300, height: 64, zIndex: 5, animation: { name: 'fadeIn', duration: 900, delay: 1500 }, editable: { content: true } }
  ]
}

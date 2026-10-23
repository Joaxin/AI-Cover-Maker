// src/core/templates/chinese/chinese-dunhuang.ts —— 敦煌飞天
import type { Template } from '@/types/types'

// 联珠背光圆环（spinSlow 缓转）
const HALO_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><g fill="none" stroke="%23fbbf24" stroke-width="2.5"><circle cx="100" cy="100" r="96" stroke-dasharray="4 8"/><circle cx="100" cy="100" r="84"/><g fill="%23fbbf24" stroke="none"><circle cx="100" cy="16" r="4"/><circle cx="100" cy="16" r="4" transform="rotate(45 100 100)"/><circle cx="100" cy="16" r="4" transform="rotate(90 100 100)"/><circle cx="100" cy="16" r="4" transform="rotate(135 100 100)"/><circle cx="100" cy="16" r="4" transform="rotate(180 100 100)"/><circle cx="100" cy="16" r="4" transform="rotate(225 100 100)"/><circle cx="100" cy="16" r="4" transform="rotate(270 100 100)"/><circle cx="100" cy="16" r="4" transform="rotate(315 100 100)"/></g></g></svg>'

// 飞天飘带
const RIBBON_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 80"><g fill="none" stroke-linecap="round"><path d="M8 60 Q 70 8 150 40 Q 230 72 292 20" stroke="%2314b8a6" stroke-width="7" opacity="0.85"/><path d="M8 68 Q 80 28 160 52 Q 240 76 292 36" stroke="%23fbbf24" stroke-width="4" opacity="0.7"/></g></svg>'

// 宝相莲花
const LOTUS_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 70"><g fill="none" stroke="%23fbbf24" stroke-width="3"><path d="M60 62 Q 42 40 60 14 Q 78 40 60 62 Z"/><path d="M60 62 Q 26 52 16 28 Q 46 30 60 62 Z"/><path d="M60 62 Q 94 52 104 28 Q 74 30 60 62 Z"/><path d="M60 62 Q 18 68 6 52 Q 36 48 60 62 Z" opacity="0.7"/><path d="M60 62 Q 102 68 114 52 Q 84 48 60 62 Z" opacity="0.7"/></g></svg>'

// ===== DH_ 前缀：本文件独有的敦煌装饰层 =====
// 飘带：朱砂／鎏金／石绿三道弧线，旋转叠放成长绸
const DH_SASH_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 96"><g fill="none" stroke-linecap="round"><path d="M8 14 Q 96 64 172 46 T 332 82" stroke="%23dc2626" stroke-width="7" opacity="0.85"/><path d="M8 32 Q 104 78 180 60 T 332 94" stroke="%23fde68a" stroke-width="3.5" opacity="0.75"/><path d="M18 6 Q 110 54 188 36 T 332 66" stroke="%2314b8a6" stroke-width="2.5" opacity="0.6"/></g></svg>'

// 背光：16 瓣火焰纹环 + 联珠虚线圈
const DH_HALO_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><g fill="none" stroke="%23fde68a" stroke-width="2">' + Array.from({ length: 16 }, (_, i) => `<path d="M200 22 Q 216 60 200 100 Q 184 60 200 22 Z" transform="rotate(${i * 22.5} 200 200)" opacity="${(0.3 + (i % 4) * 0.17).toFixed(2)}"/>`).join('') + '</g><circle cx="200" cy="200" r="132" fill="none" stroke="%2314b8a6" stroke-width="1.5" stroke-dasharray="2 9" opacity="0.7"/><circle cx="200" cy="200" r="150" fill="none" stroke="%23dc2626" stroke-width="1" stroke-dasharray="1 12" opacity="0.55"/></svg>'

// 藻井四角纹：一张全幅图，只在四角落笔（跨双层边框）
const DH_CORNER_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><g fill="none" stroke="%23fde68a" stroke-width="3" stroke-linecap="round"><path d="M62 150 L62 62 L150 62"/><path d="M62 190 Q 62 62 190 62" opacity="0.5"/><path d="M938 150 L938 62 L850 62"/><path d="M938 190 Q 938 62 810 62" opacity="0.5"/><path d="M62 850 L62 938 L150 938"/><path d="M62 810 Q 62 938 190 938" opacity="0.5"/><path d="M938 850 L938 938 L850 938"/><path d="M938 810 Q 938 938 810 938" opacity="0.5"/></g><g fill="%23dc2626" opacity="0.8"><circle cx="94" cy="94" r="7"/><circle cx="906" cy="94" r="7"/><circle cx="94" cy="906" r="7"/><circle cx="906" cy="906" r="7"/></g><g fill="none" stroke="%2314b8a6" stroke-width="2.5" opacity="0.8"><path d="M120 62 Q 142 32 166 62 Q 186 88 210 62"/><path d="M790 62 Q 812 32 836 62 Q 856 88 880 62" opacity="0.6"/><path d="M120 938 Q 142 968 166 938 Q 186 912 210 938"/><path d="M790 938 Q 812 968 836 938 Q 856 912 880 938" opacity="0.6"/></g></svg>'

// 祥云：双钩云头 + 一道云脚
const DH_CLOUD_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 108"><g fill="none" stroke="%23fde68a" stroke-width="4" stroke-linecap="round"><path d="M16 88 Q 6 58 32 46 Q 28 20 58 24 Q 70 6 92 16 Q 118 4 126 30 Q 154 30 154 52 Q 182 58 174 88"/><path d="M40 88 Q 46 66 64 66 Q 72 48 90 56 Q 106 46 114 64 Q 134 62 134 88" opacity="0.6"/></g><path d="M8 98 Q 100 110 192 98" fill="none" stroke="%2314b8a6" stroke-width="3" opacity="0.6"/></svg>'

// 点金散落 + 矿物颜料斑（壁面瑕疵层）
const DH_DUST_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><g fill="%23fde68a">' + Array.from({ length: 32 }, (_, i) => `<circle cx="${((i * 271) % 940) + 30}" cy="${((i * 419) % 920) + 40}" r="${(1.5 + (i % 4) * 1.2).toFixed(1)}" opacity="${(0.18 + (i % 5) * 0.13).toFixed(2)}"/>`).join('') + '</g><g fill="none" stroke="%23dc2626" stroke-width="2" opacity="0.28">' + Array.from({ length: 7 }, (_, i) => `<circle cx="${((i * 173) % 880) + 60}" cy="${((i * 521) % 840) + 70}" r="${4 + (i % 3) * 2}"/>`).join('') + '</g><g fill="%2314b8a6" opacity="0.2">' + Array.from({ length: 9 }, (_, i) => `<circle cx="${((i * 337) % 900) + 50}" cy="${((i * 613) % 880) + 60}" r="${2 + (i % 2)}"/>`).join('') + '</g><g stroke="%23000000" stroke-width="1.5" opacity="0.16" fill="none">' + Array.from({ length: 5 }, (_, i) => `<path d="M${((i * 211) % 760) + 60} ${((i * 379) % 700) + 90} q 46 22 96 8"/>`).join('') + '</g></svg>'

export const chineseDunhuangTemplate: Template = {
  id: 'chinese-dunhuang-apsara', name: '敦煌飞天绮梦', version: '1.1.0', category: 'chinese', tags: ['chinese', 'dunhuang', 'apsara', 'mural'],
  thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%236b4423"/><rect x="3" y="3" width="94" height="94" fill="none" stroke="%23fde68a" stroke-width="1.6"/><rect x="7" y="7" width="86" height="86" fill="none" stroke="%2314b8a6" stroke-width="0.6" stroke-dasharray="2 2"/><g fill="none" stroke="%23fde68a" stroke-width="1.2" stroke-linecap="round"><path d="M7 18 L7 7 L18 7"/><path d="M93 18 L93 7 L82 7"/><path d="M7 82 L7 93 L18 93"/><path d="M93 82 L93 93 L82 93"/></g><circle cx="50" cy="32" r="18" fill="none" stroke="%23fde68a" stroke-width="1.4" stroke-dasharray="2 3" opacity="0.9"/><circle cx="50" cy="32" r="11" fill="none" stroke="%2314b8a6" stroke-width="1.4"/><circle cx="50" cy="32" r="5" fill="%23dc2626" opacity="0.9"/><path d="M12 50 Q 32 38 52 50 T 92 46" fill="none" stroke="%2314b8a6" stroke-width="2.6" opacity="0.9"/><path d="M14 56 Q 40 46 62 56 T 90 53" fill="none" stroke="%23dc2626" stroke-width="1.6" opacity="0.7"/><g fill="%23fde68a"><rect x="26" y="62" width="48" height="6" rx="1.5"/><rect x="32" y="70" width="36" height="2" opacity="0.6"/></g><g fill="%23dc2626" fill-opacity="0.45" stroke="%23fde68a" stroke-width="0.7"><ellipse cx="34" cy="88" rx="3" ry="6.5" transform="rotate(-34 34 88)"/><ellipse cx="42" cy="86" rx="3" ry="6.5" transform="rotate(-17 42 86)"/><ellipse cx="50" cy="85" rx="3" ry="6.5"/><ellipse cx="58" cy="86" rx="3" ry="6.5" transform="rotate(17 58 86)"/><ellipse cx="66" cy="88" rx="3" ry="6.5" transform="rotate(34 66 88)"/></g><g fill="%23fde68a" opacity="0.6"><rect x="12" y="18" width="4" height="4"/><rect x="12" y="26" width="4" height="4"/><rect x="12" y="34" width="4" height="4"/><rect x="12" y="42" width="4" height="4"/></g><rect x="10" y="50" width="9" height="9" fill="none" stroke="%23dc2626" stroke-width="1.6" transform="rotate(-6 14.5 54.5)"/><g fill="%23fde68a" opacity="0.55"><circle cx="76" cy="22" r="1.1"/><circle cx="24" cy="64" r="1"/><circle cx="80" cy="66" r="1.2"/><circle cx="70" cy="78" r="0.9"/><circle cx="88" cy="40" r="1"/><circle cx="16" cy="72" r="0.8"/></g></svg>',
  tokens: {
    colors: {
      bg: { label: '壁砂', default: '#6B4423', options: ['#6B4423', '#7C4A2D', '#573519', '#3F5E5A', '#7F1D1D'] },
      primary: { label: '鎏金', default: '#FDE68A', options: ['#FDE68A', '#FBBF24', '#F59E0B', '#FEF3C7'] },
      accent: { label: '石绿', default: '#0D9488', options: ['#0D9488', '#14B8A6', '#065F46', '#A7F3D0', '#F59E0B'] },
      extra: { label: '朱砂', default: '#DC2626', options: ['#DC2626', '#B91C1C', '#EF4444', '#0D9488'] }
    },
    fonts: { heading: { label: '标题字体', default: 'STKaiti, KaiTi, serif', options: ['STKaiti, KaiTi, serif', 'STSong, Songti SC, SimSun, serif', 'SimSun, Songti SC, serif'] } }
  },
  presets: [
    { name: '石壁流沙', colors: { bg: '#6B4423', primary: '#FDE68A', accent: '#0D9488', extra: '#DC2626' } },
    { name: '青绿洞窟', colors: { bg: '#3F5E5A', primary: '#FDE68A', accent: '#A7F3D0', extra: '#B91C1C' } },
    { name: '朱砂宝相', colors: { bg: '#7F1D1D', primary: '#FEF3C7', accent: '#F59E0B', extra: '#0D9488' } },
    { name: '夜窟流金', colors: { bg: '#573519', primary: '#FBBF24', accent: '#14B8A6', extra: '#EF4444' } }
  ],
  canvas: {
    virtualWidth: 1000, virtualHeight: 1000, defaultWidth: 1000, defaultHeight: 1000, backgroundColor: { $t: 'colors.bg' },
    // 斑驳壁面肌理 + 底部沙丘剪影
    backgroundImage: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000"><g fill="%23000000" opacity="0.10"><circle cx="140" cy="180" r="70"/><circle cx="820" cy="120" r="50"/><circle cx="900" cy="640" r="90"/><circle cx="80" cy="700" r="60"/><circle cx="500" cy="60" r="40"/></g><g fill="%23ffffff" opacity="0.05"><circle cx="300" cy="320" r="100"/><circle cx="700" cy="850" r="80"/></g><path d="M0 860 Q 260 780 520 850 T 1000 830 L1000 1000 L0 1000 Z" fill="%23000000" opacity="0.18"/></svg>'
  },
  elements: [
    // ── 装裱层：藻井双层框 + 四角角纹 ──
    { id: 'frame-outer', type: 'shape', shapeKind: 'rect', x: 28, y: 28, width: 944, height: 944, border: { color: { $t: 'colors.primary' }, width: 3 }, opacity: 0.72, zIndex: 1, animation: { name: 'fadeIn', duration: 900 } },
    { id: 'frame-inner', type: 'shape', shapeKind: 'rect', x: 48, y: 48, width: 904, height: 904, fill: 'rgba(0,0,0,0.12)', border: { color: { $t: 'colors.accent' }, width: 1.5, style: 'dashed' }, opacity: 0.6, zIndex: 1 },
    { id: 'corner-lattice', type: 'image', src: DH_CORNER_SVG, x: 0, y: 0, width: 1000, height: 1000, objectFit: 'fill', opacity: 0.9, zIndex: 2, animation: { name: 'zoomIn', duration: 900, delay: 150 } },
    // ── 背光层：火焰纹瓣环 + 联珠虚线圈 + 原有圆光 ──
    { id: 'halo-bloom', type: 'image', src: DH_HALO_SVG, x: 200, y: 60, width: 600, height: 600, objectFit: 'contain', opacity: 0.42, zIndex: 1, animation: { name: 'spinSlow', duration: 96000, iterationCount: 'infinite', easing: 'linear' } },
    { id: 'halo-lace', type: 'shape', shapeKind: 'circle', x: 296, y: 156, width: 408, height: 408, border: { color: { $t: 'colors.primary' }, width: 2, style: 'dashed' }, opacity: 0.45, zIndex: 1, animation: { name: 'spinSlow', duration: 64000, iterationCount: 'infinite', easing: 'linear' } },
    { id: 'halo-ring', type: 'image', src: HALO_SVG, x: 330, y: 190, width: 340, height: 340, objectFit: 'contain', zIndex: 1, animation: { name: 'spinSlow', duration: 48000, iterationCount: 'infinite', easing: 'linear' }, editable: { position: true, size: { type: 'scale' } } },
    { id: 'halo-core', type: 'shape', shapeKind: 'circle', x: 415, y: 275, width: 170, height: 170, fill: { $t: 'colors.extra' }, opacity: 0.82, zIndex: 1, animation: { name: 'pulse', duration: 3600, iterationCount: 'infinite', easing: 'ease-in-out' } },
    // ── 飘带组：四道旋转错位的长绸 ──
    { id: 'sash-top', type: 'image', src: DH_SASH_SVG, x: 248, y: 112, width: 356, height: 100, objectFit: 'contain', rotation: -8, opacity: 0.5, zIndex: 2, animation: { name: 'drift', duration: 9000, iterationCount: 'infinite', easing: 'ease-in-out' } },
    { id: 'ribbon-a', type: 'image', src: RIBBON_SVG, x: 90, y: 520, width: 380, height: 101, objectFit: 'contain', zIndex: 2, animation: { name: 'float', duration: 6000, iterationCount: 'infinite', easing: 'ease-in-out' }, editable: { position: true, size: { type: 'scale' } } },
    { id: 'ribbon-b', type: 'image', src: RIBBON_SVG, x: 560, y: 430, width: 340, height: 91, objectFit: 'contain', opacity: 0.8, zIndex: 2, animation: { name: 'float', duration: 7200, iterationCount: 'infinite', delay: 900, easing: 'ease-in-out' }, editable: { position: true, size: { type: 'scale' } } },
    { id: 'sash-low', type: 'image', src: RIBBON_SVG, x: 596, y: 636, width: 344, height: 92, objectFit: 'contain', rotation: -14, opacity: 0.78, zIndex: 2, animation: { name: 'float', duration: 6600, delay: 400, iterationCount: 'infinite', easing: 'ease-in-out' } },
    // ── 祥云两组 ──
    { id: 'cloud-l', type: 'image', src: DH_CLOUD_SVG, x: 120, y: 796, width: 180, height: 97, objectFit: 'contain', opacity: 0.75, zIndex: 2, animation: { name: 'fadeInUp', duration: 1100, delay: 700 } },
    { id: 'cloud-r', type: 'image', src: DH_CLOUD_SVG, x: 690, y: 798, width: 176, height: 95, objectFit: 'contain', rotation: 6, opacity: 0.6, zIndex: 2, animation: { name: 'drift', duration: 11000, iterationCount: 'infinite', delay: 600, easing: 'ease-in-out' } },
    // ── 莲座：五瓣扇形托住宝相莲 ──
    { id: 'lotus', type: 'image', src: LOTUS_SVG, x: 430, y: 760, width: 140, height: 82, objectFit: 'contain', zIndex: 3, animation: { name: 'fadeInUp', duration: 1000, delay: 800 } },
    ...Array.from({ length: 5 }, (_, i) => ({
      id: 'seat-petal-' + i, type: 'shape' as const, shapeKind: 'circle' as const,
      x: 500 + (i - 2) * 62 - 19, y: 836 + Math.abs(i - 2) * 8 - 42, width: 38, height: 84, rotation: (i - 2) * 19,
      fill: i % 2 ? { $t: 'colors.accent' } : { $t: 'colors.extra' },
      border: { color: { $t: 'colors.primary' }, width: 2 },
      opacity: 0.34, zIndex: 2,
      animation: { name: 'pulse' as const, duration: 3200 + i * 420, delay: i * 180, iterationCount: 'infinite' as const, easing: 'ease-in-out' }
    })),
    { id: 'bead-1', type: 'shape', shapeKind: 'circle', x: 170, y: 250, width: 14, height: 14, fill: { $t: 'colors.primary' }, zIndex: 2, animation: { name: 'pulse', duration: 2400, iterationCount: 'infinite', delay: 200 } },
    { id: 'bead-2', type: 'shape', shapeKind: 'circle', x: 810, y: 330, width: 10, height: 10, fill: { $t: 'colors.accent' }, zIndex: 2, animation: { name: 'pulse', duration: 2800, iterationCount: 'infinite', delay: 700 } },
    // ── 题记与印 ──
    { id: 'cave-note', type: 'text', content: '窟内请关掉闪光灯 · 飞天怕亮', fontFamily: { $t: 'fonts.heading' }, fontSize: 15, fontWeight: '500', color: { $t: 'colors.accent' }, opacity: 0.85, letterSpacing: 3, textAlign: 'center', x: 250, y: 70, width: 500, height: 30, zIndex: 4, animation: { name: 'fadeIn', duration: 900, delay: 1200 }, editable: { content: true } },
    { id: 'colophon', type: 'text', content: '天衣飞扬\n满壁风动', fontFamily: { $t: 'fonts.heading' }, fontSize: 30, fontWeight: '700', color: { $t: 'colors.primary' }, opacity: 0.9, letterSpacing: 6, lineHeight: 1.32, textAlign: 'center', x: 90, y: 140, width: 36, height: 320, zIndex: 3, shadow: { color: 'rgba(0,0,0,0.45)', blur: 10, offsetX: 0, offsetY: 3 }, animation: { name: 'inkReveal', duration: 1400, delay: 500 }, editable: { content: true } },
    { id: 'seal-frame', type: 'shape', shapeKind: 'rect', x: 838, y: 628, width: 76, height: 76, rotation: -5, border: { color: { $t: 'colors.extra' }, width: 3 }, opacity: 0.9, zIndex: 4, animation: { name: 'zoomIn', duration: 500, delay: 1500 } },
    { id: 'seal-char', type: 'text', content: '莫高', fontFamily: { $t: 'fonts.heading' }, fontSize: 34, fontWeight: '900', color: { $t: 'colors.extra' }, letterSpacing: 2, textAlign: 'center', x: 838, y: 638, width: 76, height: 56, rotation: -5, zIndex: 4, animation: { name: 'fadeIn', duration: 600, delay: 1650 }, editable: { content: true } },
    // ── 主标题 ──
    { id: 'title-main', type: 'text', content: '飞天散花', fontFamily: { $t: 'fonts.heading' }, fontSize: 96, fontWeight: '900', color: { $t: 'colors.primary' }, letterSpacing: 20, textAlign: 'center', x: 200, y: 600, width: 600, height: 130, zIndex: 3, shadow: { color: 'rgba(0,0,0,0.5)', blur: 24, offsetX: 0, offsetY: 8 }, animation: { name: 'inkReveal', duration: 1500 }, editable: { content: true, fontSize: { type: 'range', min: 64, max: 120 }, position: true } },
    { id: 'title-sub', type: 'text', content: '莫高窟第 320 窟 · 画工未留名', fontFamily: { $t: 'fonts.heading' }, fontSize: 22, fontWeight: '500', color: { $t: 'colors.accent' }, letterSpacing: 6, textAlign: 'center', x: 220, y: 906, width: 560, height: 40, zIndex: 3, animation: { name: 'fadeInUp', duration: 900, delay: 600 }, editable: { content: true } },
    // ── 壁面瑕疵层：点金与矿物斑（压在最上，做出壁画剥落） ──
    { id: 'gold-dust', type: 'image', src: DH_DUST_SVG, x: 0, y: 0, width: 1000, height: 1000, objectFit: 'fill', opacity: 0.5, zIndex: 5 }
  ]
}

// src/core/templates/art/art-extra.ts —— 艺术风（5 个）
import type { Template } from '@/types/types'

// 星月漩涡（梵高式笔触环）
const SWIRL_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><g fill="none" stroke-linecap="round"><circle cx="200" cy="200" r="150" stroke="%231e3a8a" stroke-width="16" stroke-dasharray="40 26" opacity="0.85"/><circle cx="200" cy="200" r="118" stroke="%233b82f6" stroke-width="13" stroke-dasharray="34 22" opacity="0.8" transform="rotate(24 200 200)"/><circle cx="200" cy="200" r="88" stroke="%23fde68a" stroke-width="11" stroke-dasharray="26 18" opacity="0.9" transform="rotate(48 200 200)"/><circle cx="200" cy="200" r="58" stroke="%23f59e0b" stroke-width="10" stroke-dasharray="20 14" transform="rotate(70 200 200)"/><circle cx="200" cy="200" r="30" stroke="%23fef3c7" stroke-width="8" stroke-dasharray="14 10" transform="rotate(90 200 200)"/></g></svg>'

// 星月漩涡：远景星点 / 笔触短栅（克制加层用）
const STARRY_DOTS: [number, number][] = [[246, 92], [468, 76], [912, 322], [352, 620]]
const STARRY_DASHES = [{ x: 372, y: 596, w: 124 }, { x: 520, y: 616, w: 96 }, { x: 660, y: 590, w: 132 }, { x: 792, y: 612, w: 80 }]

// 蒙德里安：画布织纹（内场细纹，取代旧硬网格，线由 rect 元素画、可随预设换色）
const MOND_WEAVE = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="880" height="880"><g stroke="%23111111" stroke-width="1" opacity="0.07"><path d="M0 40 H880 M0 120 H880 M0 200 H880 M0 280 H880 M0 360 H880 M0 440 H880 M0 520 H880 M0 600 H880 M0 680 H880 M0 760 H880 M0 840 H880"/><path d="M40 0 V880 M120 0 V880 M200 0 V880 M280 0 V880 M360 0 V880 M440 0 V880 M520 0 V880 M600 0 V880 M680 0 V880 M760 0 V880 M840 0 V880"/></g></svg>'

// 马蒂斯剪纸有机形
const MATISSE_BLOB = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 220"><path d="M60 180 Q 10 140 40 92 Q 66 46 124 40 Q 152 6 198 26 Q 258 30 272 88 Q 296 136 250 172 Q 210 210 150 196 Q 96 210 60 180 Z" fill="%23ff6f61"/><path d="M96 120 Q 130 88 172 104 Q 210 118 200 152 Q 184 186 140 174 Q 100 160 96 120 Z" fill="%230d9488" opacity="0.85"/></svg>'

// 浮世绘巨浪
const WAVE_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 340"><path d="M20 300 Q 60 180 160 150 Q 120 176 118 220 Q 170 130 260 120 Q 220 146 212 190 Q 300 96 400 110 Q 470 122 500 190 Q 460 150 410 160 Q 470 180 480 240 Q 440 200 390 210 Q 460 240 450 300 L20 300 Z" fill="%23123f74"/><path d="M500 190 Q 540 150 580 170 Q 560 130 510 132" fill="none" stroke="%23123f74" stroke-width="10" stroke-linecap="round"/><g fill="%23eaf2fb"><circle cx="150" cy="140" r="10"/><circle cx="180" cy="120" r="7"/><circle cx="250" cy="106" r="9"/><circle cx="290" cy="120" r="6"/><circle cx="390" cy="98" r="10"/><circle cx="430" cy="112" r="7"/><circle cx="520" cy="128" r="8"/><circle cx="556" cy="148" r="5"/><circle cx="120" cy="164" r="6"/></g><g fill="none" stroke="%23eaf2fb" stroke-width="4" opacity="0.8"><path d="M40 330 Q 160 300 300 330 T 580 326"/></g></svg>'

// 浮世绘：掠水飞鸟 + 和纸纤维颗粒（满幅底层，随画布免出血告警）
const UKI_BIRD = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 34"><path d="M4 24 Q 16 6 30 24 Q 44 6 56 24" fill="none" stroke="%23123f74" stroke-width="4" stroke-linecap="round"/></svg>'
const UKI_WASHI = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000"><g fill="%23123f74" opacity="0.06"><circle cx="88" cy="142" r="2"/><circle cx="240" cy="88" r="1.6"/><circle cx="416" cy="196" r="2.2"/><circle cx="604" cy="120" r="1.8"/><circle cx="770" cy="228" r="2"/><circle cx="918" cy="164" r="1.6"/><circle cx="142" cy="466" r="1.8"/><circle cx="352" cy="540" r="2"/><circle cx="688" cy="498" r="1.6"/><circle cx="864" cy="612" r="2.2"/><circle cx="196" cy="820" r="1.8"/><circle cx="470" cy="884" r="2"/><circle cx="742" cy="906" r="1.6"/><circle cx="930" cy="788" r="2"/></g><g stroke="%23123f74" stroke-width="1" opacity="0.05" fill="none"><path d="M0 260 Q 250 244 500 262 T 1000 254"/><path d="M0 640 Q 260 624 520 642 T 1000 632"/></g></svg>'

// 泼彩画廊：亚麻画布织纹（满幅底层，深浅展厅通吃）
const SPLAT_WEAVE = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000"><g stroke="%23808080" stroke-width="1" opacity="0.09" fill="none"><path d="M0 24 H1000 M0 60 H1000 M0 96 H1000 M0 132 H1000 M0 168 H1000 M0 204 H1000 M0 240 H1000 M0 276 H1000 M0 312 H1000 M0 348 H1000 M0 384 H1000 M0 420 H1000 M0 456 H1000 M0 492 H1000 M0 528 H1000 M0 564 H1000 M0 600 H1000 M0 636 H1000 M0 672 H1000 M0 708 H1000 M0 744 H1000 M0 780 H1000 M0 816 H1000 M0 852 H1000 M0 888 H1000 M0 924 H1000 M0 960 H1000"/></g><g stroke="%23808080" stroke-width="1" opacity="0.07" fill="none"><path d="M36 0 V1000 M92 0 V1000 M148 0 V1000 M204 0 V1000 M260 0 V1000 M316 0 V1000 M372 0 V1000 M428 0 V1000 M484 0 V1000 M540 0 V1000 M596 0 V1000 M652 0 V1000 M708 0 V1000 M764 0 V1000 M820 0 V1000 M876 0 V1000 M932 0 V1000"/></g></svg>'

export const artExtraTemplates: Template[] = [
  {
    id: 'art-starry-swirl', name: '星月漩涡', version: '1.0.0', category: 'art',
    tags: ['art', 'post-impressionism', 'van-gogh', 'night-sky'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%230b1e4b"/><circle cx="48" cy="33" r="23" fill="none" stroke="%233b82f6" stroke-width="1" opacity="0.35"/><g fill="none"><circle cx="48" cy="33" r="16" stroke="%233b82f6" stroke-width="4" stroke-dasharray="8 6" opacity="0.85"/><circle cx="48" cy="33" r="9" stroke="%23fde68a" stroke-width="3" stroke-dasharray="6 5"/><circle cx="48" cy="33" r="3" fill="%23f59e0b" stroke="none"/></g><circle cx="78" cy="14" r="3" fill="none" stroke="%23fde68a" stroke-width="0.8" opacity="0.5"/><circle cx="78" cy="14" r="5" fill="none" stroke="%23fde68a" stroke-width="0.6" opacity="0.25"/><circle cx="80" cy="13" r="4.6" fill="%230b1e4b"/><g fill="%23fde68a"><circle cx="25" cy="9" r="1"/><circle cx="47" cy="7.6" r="0.8"/><circle cx="91" cy="32" r="0.9"/><circle cx="35" cy="62" r="0.7"/></g><g fill="%233b82f6" opacity="0.55"><rect x="37" y="59" width="12" height="1" rx="0.5"/><rect x="52" y="61" width="9" height="1" rx="0.5"/><rect x="66" y="58" width="13" height="1" rx="0.5"/></g><path d="M15 48 Q 21 60 18 76 L 12 76 Q 9 60 15 48 Z" fill="%230a2a1e"/><path d="M26 60 Q 29 68 27 77 L 23 77 Q 21 68 26 60 Z" fill="%230a2a1e" opacity="0.7"/><rect x="14" y="64.8" width="72" height="0.6" fill="%23fde68a" opacity="0.3"/><rect x="30" y="79" width="40" height="4" rx="1" fill="%23fde68a" opacity="0.85"/><rect x="34" y="86" width="32" height="1.4" rx="0.7" fill="%233b82f6"/><rect x="14" y="93" width="18" height="1.4" rx="0.7" fill="%23fde68a" opacity="0.7"/><rect x="70" y="93" width="16" height="1.4" rx="0.7" fill="%233b82f6" opacity="0.8"/></svg>',
    tokens: {
      colors: {
        bg: { label: '夜空', default: '#0B1E4B', options: ['#0B1E4B', '#12275C', '#0A1638', '#1B1464'] },
        primary: { label: '星光黄', default: '#FDE68A', options: ['#FDE68A', '#FBBF24', '#FEF3C7', '#F5F5F4'] },
        accent: { label: '笔触蓝', default: '#3B82F6', options: ['#3B82F6', '#60A5FA', '#0EA5E9', '#A78BFA'] }
      },
      fonts: { heading: { label: '标题', default: 'Didot, Georgia, serif', options: ['Didot, Georgia, serif', 'STKaiti, KaiTi, serif', 'Georgia, serif'] } }
    },
    presets: [
      { name: '星夜原调', colors: { bg: '#0B1E4B', primary: '#FDE68A', accent: '#3B82F6' } },
      { name: '靛蓝月白', colors: { bg: '#1B1464', primary: '#FEF3C7', accent: '#60A5FA' } },
      { name: '紫夜流萤', colors: { bg: '#0A1638', primary: '#FBBF24', accent: '#A78BFA' } },
      { name: '霜河淡月', colors: { bg: '#12275C', primary: '#F5F5F4', accent: '#0EA5E9' } }
    ],
    canvas: {
      virtualWidth: 1000, virtualHeight: 1000, defaultWidth: 1000, defaultHeight: 1000, backgroundColor: { $t: 'colors.bg' },
      backgroundImage: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000"><g stroke="%233b82f6" stroke-width="6" stroke-linecap="round" opacity="0.3"><path d="M60 120 Q 140 96 220 122" fill="none"/><path d="M760 90 Q 840 66 930 92" fill="none"/><path d="M90 760 Q 170 736 250 762" fill="none"/><path d="M700 840 Q 790 816 880 842" fill="none"/><path d="M820 560 Q 890 540 950 566" fill="none"/></g><g fill="%23fde68a"><circle cx="120" cy="240" r="4" opacity="0.8"/><circle cx="880" cy="320" r="3" opacity="0.7"/><circle cx="200" cy="80" r="3" opacity="0.6"/><circle cx="640" cy="920" r="4" opacity="0.7"/><circle cx="940" cy="700" r="3" opacity="0.6"/></g></svg>'
    },
    elements: [
      { id: 'swirl-echo', type: 'shape', shapeKind: 'circle', x: 272, y: 102, width: 456, height: 456, border: { color: { $t: 'colors.accent' }, width: 2, style: 'solid' }, opacity: 0.22, zIndex: 1 },
      { id: 'swirl', type: 'image', src: SWIRL_SVG, x: 300, y: 130, width: 400, height: 400, objectFit: 'contain', zIndex: 2, animation: { name: 'spinSlow', duration: 46000, iterationCount: 'infinite', easing: 'linear' }, editable: { position: true, size: { type: 'scale' } } },
      { id: 'moon-halo-a', type: 'shape', shapeKind: 'circle', x: 720, y: 90, width: 148, height: 148, border: { color: { $t: 'colors.primary' }, width: 2, style: 'solid' }, opacity: 0.34, zIndex: 1, animation: { name: 'ripple', duration: 6200, iterationCount: 'infinite', easing: 'ease-out' } },
      { id: 'moon-halo-b', type: 'shape', shapeKind: 'circle', x: 694, y: 64, width: 200, height: 200, border: { color: { $t: 'colors.primary' }, width: 1, style: 'solid' }, opacity: 0.18, zIndex: 1, editable: { content: true } },
      { id: 'moon', type: 'shape', shapeKind: 'circle', x: 750, y: 120, width: 88, height: 88, fill: { $t: 'colors.primary' }, zIndex: 2, shadow: { offsetX: 0, offsetY: 0, blur: 34, color: 'rgba(253,230,138,0.6)' }, animation: { name: 'pulse', duration: 4800, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'moon-bite', type: 'shape', shapeKind: 'circle', x: 726, y: 106, width: 70, height: 70, fill: { $t: 'colors.bg' }, zIndex: 3, animation: { name: 'drift', duration: 10000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'star-a', type: 'text', content: '✦', fontFamily: 'Georgia, serif', fontSize: 34, color: { $t: 'colors.primary' }, x: 150, y: 180, width: 44, height: 44, zIndex: 2, animation: { name: 'sparkle', duration: 3600, iterationCount: 'infinite' } },
      { id: 'star-b', type: 'text', content: '✦', fontFamily: 'Georgia, serif', fontSize: 24, color: { $t: 'colors.accent' }, x: 850, y: 460, width: 34, height: 34, zIndex: 2, animation: { name: 'twinkle', duration: 2800, delay: 500, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'star-c', type: 'text', content: '✦', fontFamily: 'Georgia, serif', fontSize: 20, color: { $t: 'colors.primary' }, opacity: 0.8, x: 62, y: 430, width: 28, height: 28, zIndex: 2, animation: { name: 'twinkle', duration: 3200, delay: 1200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      ...Array.from({ length: 4 }, (_, i) => ({ id: `star-dot-${i}`, type: 'shape' as const, shapeKind: 'circle' as const, x: STARRY_DOTS[i][0], y: STARRY_DOTS[i][1], width: 10 - (i % 3) * 2, height: 10 - (i % 3) * 2, fill: { $t: 'colors.primary' }, opacity: 0.66 - (i % 3) * 0.12, group: 'star-dot', zIndex: 2, animation: { name: 'twinkle' as const, duration: 3000 + i * 400, delay: i * 350, iterationCount: 'infinite' as const, easing: 'ease-in-out' } })),
      { id: 'cypress', type: 'image', src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 300"><path d="M60 6 Q 88 90 74 150 Q 96 120 88 190 Q 110 170 96 240 Q 80 296 40 296 Q 14 240 28 190 Q 10 214 20 150 Q 8 90 60 6 Z" fill="%230a2a1e" stroke="%23166534" stroke-width="4"/></svg>', x: 100, y: 480, width: 110, height: 280, objectFit: 'contain', zIndex: 2, animation: { name: 'swing', duration: 6000, iterationCount: 'infinite', easing: 'ease-in-out' }, editable: { position: true, size: { type: 'scale' } } },
      { id: 'cypress-far', type: 'image', src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 300"><path d="M60 6 Q 88 90 74 150 Q 96 120 88 190 Q 110 170 96 240 Q 80 296 40 296 Q 14 240 28 190 Q 10 214 20 150 Q 8 90 60 6 Z" fill="%230a2a1e" stroke="%23166534" stroke-width="4"/></svg>', x: 232, y: 578, width: 62, height: 166, objectFit: 'contain', opacity: 0.72, zIndex: 2, animation: { name: 'swing', duration: 7400, delay: 600, iterationCount: 'infinite', easing: 'ease-in-out' } },
      ...Array.from({ length: 4 }, (_, i) => ({ id: `brush-dash-${i}`, type: 'shape' as const, shapeKind: 'rect' as const, x: STARRY_DASHES[i].x, y: STARRY_DASHES[i].y, width: STARRY_DASHES[i].w, height: 10, fill: { $t: 'colors.accent' }, opacity: 0.4 - i * 0.06, borderRadius: 5, rotation: -3 + i * 2, group: 'brush-dash', zIndex: 2 })),
      { id: 'horizon-rule', type: 'shape', shapeKind: 'rect', x: 140, y: 648, width: 720, height: 2, fill: { $t: 'colors.primary' }, opacity: 0.3, zIndex: 2 },
      { id: 'title-cn', type: 'text', content: '向夜空的馈赠', fontFamily: { $t: 'fonts.heading' }, fontSize: 64, fontWeight: '700', color: { $t: 'colors.primary' }, letterSpacing: 12, textAlign: 'center', x: 180, y: 786, width: 640, height: 88, zIndex: 4, animation: { name: 'inkReveal', duration: 1500 }, editable: { content: true, fontSize: { type: 'range', min: 42, max: 82 }, position: true } },
      { id: 'title-en', type: 'text', content: 'STARRY NIGHT · STUDY IN BLUE', fontFamily: 'Georgia, serif', fontSize: 18, color: { $t: 'colors.accent' }, letterSpacing: 8, textAlign: 'center', x: 220, y: 880, width: 560, height: 28, zIndex: 4, animation: { name: 'fadeIn', duration: 800, delay: 800 }, editable: { content: true } },
      { id: 'footer-rule', type: 'shape', shapeKind: 'rect', x: 468, y: 938, width: 64, height: 2, fill: { $t: 'colors.accent' }, opacity: 0.5, zIndex: 4 },
      { id: 'meta-left', type: 'text', content: '油画 · 圣雷米时期', fontFamily: { $t: 'fonts.heading' }, fontSize: 20, color: { $t: 'colors.primary' }, opacity: 0.85, letterSpacing: 2, x: 140, y: 930, width: 300, height: 26, zIndex: 4, animation: { name: 'fadeIn', duration: 700, delay: 1000 }, editable: { content: true } },
      { id: 'meta-right', type: 'text', content: 'SAINT-RÉMY · 1889', fontFamily: 'Georgia, serif', fontSize: 18, color: { $t: 'colors.accent' }, letterSpacing: 2, textAlign: 'right', x: 560, y: 932, width: 300, height: 24, zIndex: 4, animation: { name: 'fadeIn', duration: 700, delay: 1150 }, editable: { content: true } }
    ]
  },
  {
    id: 'art-mondrian-grid', name: '蒙德里安格子', version: '1.0.0', category: 'art',
    tags: ['art', 'de-stijl', 'mondrian', 'geometry', 'primary-colors'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23faf6ee"/><rect x="7.4" y="7.4" width="88" height="88" fill="%23111111" opacity="0.05"/><rect x="7.2" y="21.4" width="27.6" height="23" fill="%23d40920"/><rect x="37.4" y="47.4" width="24.4" height="25.2" fill="%23f7c800"/><rect x="63.4" y="74.2" width="29.4" height="18.6" fill="%232247a6"/><rect x="79.4" y="21.4" width="13.4" height="21.2" fill="%23111111"/><g fill="%23111111"><rect x="6" y="6" width="88" height="1"/><rect x="6" y="93" width="88" height="1"/><rect x="6" y="6" width="1" height="88"/><rect x="93" y="6" width="1" height="88"/><rect x="35" y="6" width="1.2" height="87"/><rect x="62" y="46" width="1.2" height="47"/><rect x="77" y="7" width="1.2" height="38"/><rect x="7" y="44.8" width="86" height="1.2"/><rect x="36.2" y="72.8" width="56.8" height="1.2"/><rect x="7" y="20" width="28" height="1.2"/></g><g fill="%23111111"><rect x="39.2" y="13" width="34" height="3.4"/><rect x="39.2" y="18.4" width="20" height="3.4"/><rect x="39.2" y="25.6" width="26" height="1.6"/><rect x="39.2" y="28.6" width="18" height="1.2"/><rect x="39.2" y="31" width="24" height="1.2"/></g><circle cx="31" cy="86.6" r="1.4" fill="%23111111"/><rect x="10" y="85.6" width="22" height="1.4" fill="%23111111" opacity="0.7"/></svg>',
    tokens: {
      colors: {
        bg: { label: '画布白', default: '#FAF6EE', options: ['#FAF6EE', '#FFFFFF', '#F6F1E7', '#F2F2F2'] },
        line: { label: '黑线', default: '#111111', options: ['#111111', '#000000', '#1C1917', '#292524'] },
        red: { label: '朱红', default: '#D40920', options: ['#D40920', '#DC2626', '#B91C1C', '#F97316'] },
        blue: { label: '群青', default: '#2247A6', options: ['#2247A6', '#1D4ED8', '#2563EB', '#0E7490'] },
        yellow: { label: '铬黄', default: '#F7C800', options: ['#F7C800', '#FACC15', '#EAB308', '#FB923C'] }
      },
      fonts: { heading: { label: '标题', default: 'Helvetica, Arial, sans-serif', options: ['Helvetica, Arial, sans-serif', 'Inter, sans-serif'] } }
    },
    presets: [
      { name: '三原色经典', colors: { bg: '#FAF6EE', line: '#111111', red: '#D40920', blue: '#2247A6', yellow: '#F7C800' } },
      { name: '晚调浓烈', colors: { bg: '#FFFFFF', line: '#000000', red: '#DC2626', blue: '#1D4ED8', yellow: '#EAB308' } },
      { name: '褪色旧展', colors: { bg: '#F2F2F2', line: '#292524', red: '#B91C1C', blue: '#0E7490', yellow: '#FB923C' } },
      { name: '暖橙构成', colors: { bg: '#F6F1E7', line: '#1C1917', red: '#F97316', blue: '#2563EB', yellow: '#FACC15' } }
    ],
    canvas: { virtualWidth: 1000, virtualHeight: 1000, defaultWidth: 1000, defaultHeight: 1000, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'field-shadow', type: 'shape', shapeKind: 'rect', x: 74, y: 74, width: 880, height: 880, fill: { $t: 'colors.line' }, opacity: 0.06, zIndex: 0 },
      { id: 'field-weave', type: 'image', src: MOND_WEAVE, x: 60, y: 60, width: 880, height: 880, objectFit: 'fill', zIndex: 1 },
      { id: 'cell-red', type: 'shape', shapeKind: 'rect', x: 72, y: 214, width: 276, height: 230, fill: { $t: 'colors.red' }, zIndex: 2, animation: { name: 'zoomIn', duration: 550 } },
      { id: 'cell-yellow', type: 'shape', shapeKind: 'rect', x: 374, y: 474, width: 244, height: 252, fill: { $t: 'colors.yellow' }, zIndex: 2, animation: { name: 'zoomIn', duration: 550, delay: 200 } },
      { id: 'cell-blue', type: 'shape', shapeKind: 'rect', x: 634, y: 742, width: 294, height: 186, fill: { $t: 'colors.blue' }, zIndex: 2, animation: { name: 'zoomIn', duration: 550, delay: 380 } },
      { id: 'cell-void', type: 'shape', shapeKind: 'rect', x: 794, y: 214, width: 134, height: 212, fill: { $t: 'colors.line' }, zIndex: 2, animation: { name: 'zoomIn', duration: 550, delay: 520 } },
      { id: 'rule-top', type: 'shape', shapeKind: 'rect', x: 60, y: 60, width: 880, height: 10, fill: { $t: 'colors.line' }, zIndex: 3, animation: { name: 'fadeIn', duration: 500 } },
      { id: 'rule-bottom', type: 'shape', shapeKind: 'rect', x: 60, y: 930, width: 880, height: 10, fill: { $t: 'colors.line' }, zIndex: 3, animation: { name: 'fadeIn', duration: 500, delay: 120 } },
      { id: 'rule-left', type: 'shape', shapeKind: 'rect', x: 60, y: 60, width: 10, height: 880, fill: { $t: 'colors.line' }, zIndex: 3, animation: { name: 'fadeIn', duration: 500, delay: 200 } },
      { id: 'rule-right', type: 'shape', shapeKind: 'rect', x: 930, y: 60, width: 10, height: 880, fill: { $t: 'colors.line' }, zIndex: 3, animation: { name: 'fadeIn', duration: 500, delay: 280 } },
      { id: 'rule-v1', group: 'rule-v', type: 'shape', shapeKind: 'rect', x: 350, y: 60, width: 12, height: 870, fill: { $t: 'colors.line' }, zIndex: 3 },
      { id: 'rule-v2', group: 'rule-v', type: 'shape', shapeKind: 'rect', x: 620, y: 460, width: 12, height: 470, fill: { $t: 'colors.line' }, zIndex: 3 },
      { id: 'rule-v3', group: 'rule-v', type: 'shape', shapeKind: 'rect', x: 770, y: 70, width: 12, height: 380, fill: { $t: 'colors.line' }, zIndex: 3 },
      { id: 'rule-h1', group: 'rule-h', type: 'shape', shapeKind: 'rect', x: 70, y: 448, width: 860, height: 12, fill: { $t: 'colors.line' }, zIndex: 3 },
      { id: 'rule-h2', group: 'rule-h', type: 'shape', shapeKind: 'rect', x: 362, y: 728, width: 568, height: 12, fill: { $t: 'colors.line' }, zIndex: 3 },
      { id: 'rule-h3', group: 'rule-h', type: 'shape', shapeKind: 'rect', x: 70, y: 200, width: 280, height: 12, fill: { $t: 'colors.line' }, zIndex: 3 },
      { id: 'title-block', type: 'text', content: 'COMPOSITION\nNo.7', fontFamily: { $t: 'fonts.heading' }, fontSize: 44, fontWeight: '900', color: { $t: 'colors.line' }, lineHeight: 1.15, x: 392, y: 112, width: 370, height: 120, zIndex: 4, animation: { name: 'fadeInUp', duration: 700, delay: 500 }, editable: { content: true, fontSize: { type: 'range', min: 30, max: 44 }, position: true } },
      { id: 'cn-tag', type: 'text', content: '风格派 · 只做减法', fontFamily: 'Songti SC, STSong, SimSun, serif', fontSize: 24, color: { $t: 'colors.line' }, x: 392, y: 252, width: 300, height: 36, zIndex: 4, animation: { name: 'fadeIn', duration: 600, delay: 800 }, editable: { content: true } },
      { id: 'hair-rule', type: 'shape', shapeKind: 'rect', x: 392, y: 300, width: 280, height: 4, fill: { $t: 'colors.line' }, opacity: 0.85, zIndex: 4 },
      { id: 'foot-latin', type: 'text', content: 'DE STIJL 1917', fontFamily: 'Courier New, monospace', fontSize: 17, color: { $t: 'colors.line' }, opacity: 0.7, x: 392, y: 320, width: 200, height: 24, zIndex: 4, editable: { content: true } },
      { id: 'foot-cn', type: 'text', content: '直线与直角，就是世界的语法', fontFamily: 'Songti SC, STSong, SimSun, serif', fontSize: 20, color: { $t: 'colors.line' }, opacity: 0.85, x: 392, y: 352, width: 300, height: 30, zIndex: 4, animation: { name: 'fadeIn', duration: 600, delay: 950 }, editable: { content: true } },
      { id: 'dot-accent', type: 'shape', shapeKind: 'circle', x: 300, y: 856, width: 20, height: 20, fill: { $t: 'colors.line' }, zIndex: 4, animation: { name: 'heartbeat', duration: 3400, iterationCount: 'infinite' } },
      { id: 'sig-line', type: 'text', content: 'P. MONDRIAN · 1917', fontFamily: 'Courier New, monospace', fontSize: 16, letterSpacing: 3, color: { $t: 'colors.line' }, opacity: 0.75, x: 100, y: 852, width: 250, height: 26, zIndex: 4, animation: { name: 'fadeIn', duration: 600, delay: 1100 }, editable: { content: true } }
    ]
  },
  {
    id: 'art-matisse-cutout', name: '马蒂斯剪纸', version: '1.0.0', category: 'art',
    tags: ['art', 'matisse', 'cut-out', 'organic', 'color-field'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23f6f1e3"/><rect x="6" y="6" width="88" height="88" fill="none" stroke="%231f2937" stroke-width="0.6" opacity="0.3"/><rect x="8.6" y="18" width="2" height="38" rx="1" fill="%230d9488" opacity="0.35"/><circle cx="29" cy="14" r="4.3" fill="%23ff6f61"/><circle cx="57.7" cy="12" r="3.1" fill="%230d9488"/><rect x="70" y="9.2" width="5.2" height="11.2" rx="2.6" fill="%230d9488" opacity="0.8" transform="rotate(12 72.6 14.8)"/><path d="M22 62 Q 10 42 28 28 Q 48 14 62 30 Q 82 24 86 46 Q 92 66 70 72 Q 46 82 34 74 Q 24 70 22 62 Z" fill="%23ff6f61"/><path d="M40 54 Q 54 42 66 52 Q 74 62 62 68 Q 48 74 42 64 Z" fill="%230d9488"/><path d="M11 30 Q 17 37 15 49 Q 9 40 11 30 Z" fill="%230d9488" opacity="0.85"/><rect x="11.8" y="59.6" width="4.6" height="9.8" rx="2.3" fill="%23ff6f61" opacity="0.8" transform="rotate(-10 14.1 64.5)"/><circle cx="84.1" cy="36" r="2.9" fill="%23ff6f61"/><circle cx="87.7" cy="45" r="1.1" fill="%231f2937" opacity="0.8"/><circle cx="83.4" cy="49.2" r="0.6" fill="%231f2937" opacity="0.6"/><rect x="22" y="64" width="60" height="1" rx="0.5" fill="%231f2937" opacity="0.4" stroke-dasharray="3 2"/><rect x="24" y="73" width="52" height="7" rx="1" fill="%231f2937" opacity="0.85"/><rect x="24" y="83" width="34" height="1.6" rx="0.8" fill="%230d9488"/><rect x="10" y="88.4" width="17.6" height="4.6" rx="0.6" fill="%23ff6f61" opacity="0.2"/><rect x="11.6" y="89.8" width="12" height="1.6" rx="0.8" fill="%231f2937" opacity="0.8"/><rect x="66" y="90" width="26" height="1.6" rx="0.8" fill="%231f2937" opacity="0.55"/></svg>',
    tokens: {
      colors: {
        bg: { label: '画纸', default: '#F6F1E3', options: ['#F6F1E3', '#FBF7EA', '#F1EBDB', '#EFE9E1'] },
        coral: { label: '珊瑚', default: '#FF6F61', options: ['#FF6F61', '#F97362', '#EF4444', '#FB923C'] },
        teal: { label: '池绿', default: '#0D9488', options: ['#0D9488', '#14B8A6', '#0E7490', '#4D7C0F'] },
        ink: { label: '题字', default: '#1F2937', options: ['#1F2937', '#111827', '#374151', '#134E4A'] }
      },
      fonts: { heading: { label: '标题', default: 'Didot, Georgia, serif', options: ['Didot, Georgia, serif', 'Helvetica, Arial, sans-serif'] } }
    },
    presets: [
      { name: '爵士珊瑚', colors: { bg: '#F6F1E3', coral: '#FF6F61', teal: '#0D9488', ink: '#1F2937' } },
      { name: '蔚蓝海岸', colors: { bg: '#FBF7EA', coral: '#F97362', teal: '#0E7490', ink: '#134E4A' } },
      { name: '橄榄田园', colors: { bg: '#EFE9E1', coral: '#FB923C', teal: '#4D7C0F', ink: '#374151' } },
      { name: '赤陶碧潭', colors: { bg: '#F1EBDB', coral: '#EF4444', teal: '#14B8A6', ink: '#111827' } }
    ],
    canvas: {
      virtualWidth: 1000, virtualHeight: 1000, defaultWidth: 1000, defaultHeight: 1000, backgroundColor: { $t: 'colors.bg' },
      backgroundImage: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000"><g stroke="%231f2937" stroke-width="2" opacity="0.08" fill="none"><path d="M80 920 Q 300 860 520 920 T 960 900"/><path d="M120 80 Q 340 40 560 90"/></g><circle cx="900" cy="140" r="3" fill="%23ff6f61" opacity="0.3"/><circle cx="80" cy="320" r="3" fill="%230d9488" opacity="0.3"/></svg>'
    },
    elements: [
      { id: 'paper-edge', type: 'shape', shapeKind: 'rect', x: 60, y: 60, width: 880, height: 880, border: { color: { $t: 'colors.ink' }, width: 2, style: 'solid' }, opacity: 0.26, zIndex: 1 },
      { id: 'cut-strip', type: 'shape', shapeKind: 'rect', x: 86, y: 180, width: 20, height: 380, fill: { $t: 'colors.teal' }, opacity: 0.3, borderRadius: 10, zIndex: 1, animation: { name: 'fadeIn', duration: 700 } },
      { id: 'paper-shadow', type: 'shape', shapeKind: 'rect', x: 216, y: 206, width: 600, height: 440, fill: { $t: 'colors.ink' }, opacity: 0.06, borderRadius: 40, zIndex: 1 },
      { id: 'cut-disc-a', type: 'shape', shapeKind: 'circle', x: 250, y: 96, width: 86, height: 86, fill: { $t: 'colors.coral' }, opacity: 0.9, zIndex: 2, animation: { name: 'float', duration: 7600, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'cut-disc-b', type: 'shape', shapeKind: 'circle', x: 546, y: 88, width: 62, height: 62, fill: { $t: 'colors.teal' }, opacity: 0.85, zIndex: 2, animation: { name: 'float', duration: 8600, delay: 400, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'cut-ogive-a', type: 'shape', shapeKind: 'rect', x: 700, y: 92, width: 52, height: 112, fill: { $t: 'colors.teal' }, opacity: 0.8, borderRadius: 26, rotation: 12, zIndex: 2, animation: { name: 'swing', duration: 7200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'cut-ogive-b', type: 'shape', shapeKind: 'rect', x: 118, y: 596, width: 46, height: 98, fill: { $t: 'colors.coral' }, opacity: 0.78, borderRadius: 23, rotation: -10, zIndex: 2, animation: { name: 'swing', duration: 6400, delay: 700, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'blob-main', type: 'image', src: MATISSE_BLOB, x: 200, y: 190, width: 600, height: 440, objectFit: 'contain', zIndex: 2, animation: { name: 'float', duration: 8200, iterationCount: 'infinite', easing: 'ease-in-out' }, editable: { position: true, size: { type: 'scale' } } },
      { id: 'scissor-line', type: 'image', src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 60"><path d="M10 30 Q 60 6 110 30 T 210 30 T 310 30 T 410 30 T 510 30 T 590 30" fill="none" stroke="%231f2937" stroke-width="3" stroke-dasharray="10 8" opacity="0.5"/></svg>', x: 200, y: 640, width: 600, height: 60, objectFit: 'contain', zIndex: 2, animation: { name: 'fadeIn', duration: 700, delay: 500 } },
      { id: 'leaf-teal', type: 'image', src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 200"><path d="M60 6 Q 118 70 60 194 Q 4 70 60 6 Z" fill="%230d9488" opacity="0.9"/><path d="M60 30 L60 170" stroke="%23f6f1e3" stroke-width="4"/></svg>', x: 110, y: 300, width: 110, height: 190, objectFit: 'contain', zIndex: 3, animation: { name: 'swing', duration: 5600, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'leaf-echo', type: 'image', src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 200"><path d="M60 6 Q 118 70 60 194 Q 4 70 60 6 Z" fill="%230d9488" opacity="0.9"/><path d="M60 30 L60 170" stroke="%23f6f1e3" stroke-width="4"/></svg>', x: 880, y: 196, width: 62, height: 108, objectFit: 'contain', opacity: 0.62, rotation: 18, zIndex: 3, animation: { name: 'swing', duration: 6800, delay: 500, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'coral-dot', type: 'shape', shapeKind: 'circle', x: 812, y: 330, width: 58, height: 58, fill: { $t: 'colors.coral' }, zIndex: 3, animation: { name: 'bounce', duration: 4200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'ink-dot', type: 'shape', shapeKind: 'circle', x: 866, y: 440, width: 22, height: 22, fill: { $t: 'colors.ink' }, opacity: 0.8, zIndex: 3, animation: { name: 'twinkle', duration: 3000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'seed-a', type: 'shape', shapeKind: 'circle', x: 828, y: 486, width: 12, height: 12, fill: { $t: 'colors.ink' }, opacity: 0.6, zIndex: 3 },
      { id: 'seed-b', type: 'shape', shapeKind: 'circle', x: 860, y: 516, width: 10, height: 10, fill: { $t: 'colors.ink' }, opacity: 0.5, zIndex: 3 },
      { id: 'seed-c', type: 'shape', shapeKind: 'circle', x: 888, y: 548, width: 8, height: 8, fill: { $t: 'colors.ink' }, opacity: 0.42, zIndex: 3 },
      { id: 'title-cn', type: 'text', content: '用剪刀作画', fontFamily: { $t: 'fonts.heading' }, fontSize: 66, fontWeight: '700', color: { $t: 'colors.ink' }, letterSpacing: 12, x: 220, y: 720, width: 560, height: 92, zIndex: 4, animation: { name: 'rise', duration: 800 }, editable: { content: true, fontSize: { type: 'range', min: 44, max: 84 }, position: true } },
      { id: 'title-en', type: 'text', content: 'JAZZ · LES PAPIERS DÉCOUPÉS, 1947', fontFamily: 'Georgia, serif', fontSize: 19, color: { $t: 'colors.teal' }, letterSpacing: 5, x: 220, y: 826, width: 560, height: 30, zIndex: 4, animation: { name: 'fadeIn', duration: 700, delay: 600 }, editable: { content: true } },
      { id: 'meta-left', type: 'text', content: '尼斯 · 1947 冬', fontFamily: { $t: 'fonts.heading' }, fontSize: 20, color: { $t: 'colors.ink' }, opacity: 0.8, x: 100, y: 852, width: 280, height: 28, zIndex: 4, animation: { name: 'fadeIn', duration: 600, delay: 900 }, editable: { content: true } },
      { id: 'label-chip', type: 'shape', shapeKind: 'rect', x: 100, y: 884, width: 176, height: 46, fill: { $t: 'colors.coral' }, opacity: 0.16, borderRadius: 6, zIndex: 4 },
      { id: 'label-text', type: 'text', content: '剪贴草图', fontFamily: { $t: 'fonts.heading' }, fontSize: 20, color: { $t: 'colors.ink' }, letterSpacing: 2, x: 116, y: 896, width: 140, height: 26, zIndex: 5, editable: { content: true } },
      { id: 'quote', type: 'text', content: '"色彩不需要描摹，形状自己会说话。"', fontFamily: 'STKaiti, KaiTi, serif', fontSize: 22, color: { $t: 'colors.ink' }, opacity: 0.7, textAlign: 'right', x: 520, y: 900, width: 400, height: 32, zIndex: 4, editable: { content: true } }
    ]
  },
  {
    id: 'art-ukiyoe-wave', name: '浮世绘浪', version: '1.0.0', category: 'art',
    tags: ['art', 'ukiyoe', 'hokusai', 'wave', 'japanese'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23eaf2fb"/><g fill="%23123f74"><rect x="7" y="7" width="86" height="2.6" opacity="0.16"/><rect x="7" y="10.4" width="86" height="2.2" opacity="0.11"/><rect x="7" y="13.4" width="86" height="1.8" opacity="0.07"/></g><path d="M20 32 L28 22 Q 30 20 32 22 L40 32 Z" fill="%23123f74" opacity="0.85"/><path d="M27 24 L28 22 Q 30 20 32 22 L33 24 Q 31 22.6 30 24 Q 28.6 22.6 27 24 Z" fill="%23f8fafc"/><g fill="none" stroke="%23123f74" stroke-width="1.4" stroke-linecap="round"><path d="M87.2 27 Q 89 24 90.8 27 Q 92.6 24 94.4 27" opacity="0.9"/><path d="M92 17.6 Q 93.5 15.2 95 17.6 Q 96.5 15.2 98 17.6" opacity="0.7" stroke-width="1"/></g><path d="M8 66 Q 16 40 34 34 Q 26 42 26 50 Q 38 30 56 30 Q 46 38 46 46 Q 62 28 78 38 Q 68 38 64 46 Q 78 44 80 58 L8 66 Z" fill="%23123f74"/><path d="M54 52 Q 62 42 74 44 Q 68 48 66 54 Z" fill="%23123f74" opacity="0.45"/><g fill="%23eaf2fb"><circle cx="34" cy="28" r="3"/><circle cx="56" cy="22" r="3.5"/><circle cx="76" cy="30" r="2.6"/><circle cx="23" cy="26" r="1.2"/><circle cx="42" cy="24.6" r="0.9"/></g><rect x="13" y="61.2" width="66" height="0.6" fill="%23123f74" opacity="0.45"/><rect x="14" y="66" width="52" height="6" rx="1" fill="%23123f74"/><rect x="14" y="75.6" width="34" height="2.4" rx="1" fill="%23123f74" opacity="0.7"/><rect x="13" y="81.2" width="36" height="0.5" fill="%23123f74" opacity="0.35"/><rect x="13" y="83" width="20" height="1.8" rx="0.6" fill="%23123f74" opacity="0.8"/><rect x="66" y="83.4" width="22" height="1.6" rx="0.6" fill="%23123f74" opacity="0.7"/><rect x="81" y="66" width="5.6" height="12" rx="1" fill="%23123f74"/></svg>',
    tokens: {
      colors: {
        bg: { label: '和纸', default: '#EAF2FB', options: ['#EAF2FB', '#F2EFE4', '#DDEAF6', '#E8F1EC'] },
        primary: { label: '绀青', default: '#123F74', options: ['#123F74', '#1E3A8A', '#0C4A6E', '#164E63'] },
        accent: { label: '浪沫白', default: '#F8FAFC', options: ['#F8FAFC', '#FFFFFF', '#FEFCE8', '#ECFDF5'] }
      },
      fonts: { heading: { label: '标题', default: 'Songti SC, STSong, SimSun, serif', options: ['Songti SC, STSong, SimSun, serif', 'STKaiti, KaiTi, serif', 'Georgia, serif'] } }
    },
    presets: [
      { name: '神奈川原版', colors: { bg: '#EAF2FB', primary: '#123F74', accent: '#F8FAFC' } },
      { name: '普鲁士蓝', colors: { bg: '#DDEAF6', primary: '#1E3A8A', accent: '#FFFFFF' } },
      { name: '青磁海雾', colors: { bg: '#E8F1EC', primary: '#164E63', accent: '#ECFDF5' } },
      { name: '旧纸寒涛', colors: { bg: '#F2EFE4', primary: '#0C4A6E', accent: '#FEFCE8' } }
    ],
    canvas: {
      virtualWidth: 1000, virtualHeight: 1000, defaultWidth: 1000, defaultHeight: 1000, backgroundColor: { $t: 'colors.bg' },
      backgroundImage: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000"><g fill="none" stroke="%23123f74" stroke-width="2" opacity="0.12"><path d="M0 880 Q 125 856 250 880 T 500 880 T 750 880 T 1000 880"/><path d="M0 920 Q 125 896 250 920 T 500 920 T 750 920 T 1000 920"/><path d="M0 960 Q 125 936 250 960 T 500 960 T 750 960 T 1000 960"/></g><rect x="40" y="40" width="920" height="920" fill="none" stroke="%23123f74" stroke-width="2" opacity="0.2"/></svg>'
    },
    elements: [
      { id: 'washi-grain', type: 'image', src: UKI_WASHI, x: 0, y: 0, width: 1000, height: 1000, objectFit: 'fill', zIndex: 1 },
      { id: 'bokashi-1', group: 'bokashi-', type: 'shape', shapeKind: 'rect', x: 70, y: 70, width: 860, height: 26, fill: { $t: 'colors.primary' }, opacity: 0.16, zIndex: 1 },
      { id: 'bokashi-2', group: 'bokashi-', type: 'shape', shapeKind: 'rect', x: 70, y: 104, width: 860, height: 22, fill: { $t: 'colors.primary' }, opacity: 0.11, zIndex: 1 },
      { id: 'bokashi-3', group: 'bokashi-', type: 'shape', shapeKind: 'rect', x: 70, y: 134, width: 860, height: 18, fill: { $t: 'colors.primary' }, opacity: 0.07, zIndex: 1 },
      { id: 'wave-back', type: 'image', src: WAVE_SVG, x: 540, y: 330, width: 400, height: 230, objectFit: 'contain', opacity: 0.45, zIndex: 1, animation: { name: 'drift', duration: 11000, delay: 400, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'fuji', type: 'image', src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 120"><path d="M20 118 L86 26 Q 100 12 114 26 L180 118 Z" fill="%23123f74" opacity="0.85"/><path d="M74 44 L86 26 Q 100 12 114 26 L126 44 Q 108 36 100 44 Q 88 36 74 44 Z" fill="%23f8fafc"/></svg>', x: 660, y: 180, width: 220, height: 132, objectFit: 'contain', zIndex: 1, animation: { name: 'fadeIn', duration: 1000, delay: 400 } },
      { id: 'bird-a', type: 'image', src: UKI_BIRD, x: 872, y: 104, width: 44, height: 26, objectFit: 'contain', zIndex: 2, animation: { name: 'slideInRight', duration: 900, delay: 900 } },
      { id: 'bird-b', type: 'image', src: UKI_BIRD, x: 920, y: 152, width: 30, height: 18, objectFit: 'contain', opacity: 0.7, zIndex: 2, animation: { name: 'slideInRight', duration: 900, delay: 1150 } },
      { id: 'wave', type: 'image', src: WAVE_SVG, x: 60, y: 300, width: 700, height: 400, objectFit: 'contain', zIndex: 2, animation: { name: 'drift', duration: 9000, iterationCount: 'infinite', easing: 'ease-in-out' }, editable: { position: true, size: { type: 'scale' } } },
      { id: 'foam-a', type: 'shape', shapeKind: 'circle', x: 150, y: 330, width: 22, height: 22, fill: { $t: 'colors.accent' }, zIndex: 3, animation: { name: 'twinkle', duration: 2600, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'foam-b', type: 'shape', shapeKind: 'circle', x: 320, y: 300, width: 14, height: 14, fill: { $t: 'colors.accent' }, zIndex: 3, animation: { name: 'twinkle', duration: 2600, delay: 500, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'foam-c', type: 'shape', shapeKind: 'circle', x: 520, y: 336, width: 18, height: 18, fill: { $t: 'colors.accent' }, zIndex: 3, animation: { name: 'twinkle', duration: 2600, delay: 900, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'foam-d', type: 'shape', shapeKind: 'circle', x: 232, y: 258, width: 12, height: 12, fill: { $t: 'colors.accent' }, zIndex: 3, animation: { name: 'twinkle', duration: 3000, delay: 250, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'foam-e', type: 'shape', shapeKind: 'circle', x: 424, y: 246, width: 9, height: 9, fill: { $t: 'colors.accent' }, zIndex: 3, animation: { name: 'twinkle', duration: 3000, delay: 1200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'rule-above', type: 'shape', shapeKind: 'rect', x: 130, y: 612, width: 660, height: 3, fill: { $t: 'colors.primary' }, opacity: 0.45, zIndex: 3 },
      { id: 'title-cn', type: 'text', content: '神奈川沖浪裏', fontFamily: { $t: 'fonts.heading' }, fontSize: 72, fontWeight: '900', color: { $t: 'colors.primary' }, letterSpacing: 10, x: 130, y: 640, width: 660, height: 100, zIndex: 4, animation: { name: 'inkReveal', duration: 1400 }, editable: { content: true, fontSize: { type: 'range', min: 48, max: 88 }, position: true } },
      { id: 'title-sub', type: 'text', content: '富岳三十六景 · 北斎', fontFamily: 'STKaiti, KaiTi, serif', fontSize: 26, color: { $t: 'colors.primary' }, opacity: 0.75, letterSpacing: 8, x: 130, y: 756, width: 520, height: 38, zIndex: 4, animation: { name: 'fadeIn', duration: 800, delay: 700 }, editable: { content: true } },
      { id: 'rule-below', type: 'shape', shapeKind: 'rect', x: 130, y: 812, width: 360, height: 2, fill: { $t: 'colors.primary' }, opacity: 0.35, zIndex: 4 },
      { id: 'meta-edition', type: 'text', content: '版本 · 绀青三刷', fontFamily: { $t: 'fonts.heading' }, fontSize: 20, color: { $t: 'colors.primary' }, opacity: 0.8, x: 130, y: 830, width: 320, height: 28, zIndex: 4, animation: { name: 'fadeIn', duration: 700, delay: 1000 }, editable: { content: true } },
      { id: 'meta-latin', type: 'text', content: 'EDITION · HOKUSAI', fontFamily: 'Georgia, serif', fontSize: 17, letterSpacing: 4, color: { $t: 'colors.primary' }, opacity: 0.7, textAlign: 'right', x: 560, y: 834, width: 330, height: 24, zIndex: 4, animation: { name: 'fadeIn', duration: 700, delay: 1150 }, editable: { content: true } },
      { id: 'seal', type: 'shape', shapeKind: 'rect', x: 810, y: 660, width: 56, height: 120, fill: { $t: 'colors.primary' }, borderRadius: 8, zIndex: 4, animation: { name: 'zoomIn', duration: 500, delay: 1000 } },
      { id: 'seal-text', type: 'text', content: '浪\n裏', fontFamily: 'Songti SC, STSong, SimSun, serif', fontSize: 30, fontWeight: '900', color: { $t: 'colors.accent' }, textAlign: 'center', lineHeight: 1.5, x: 810, y: 680, width: 56, height: 84, zIndex: 5, editable: { content: true } }
    ]
  },
  {
    id: 'art-paint-splash', name: '泼彩画廊', version: '1.0.0', category: 'art',
    tags: ['art', 'abstract', 'splash', 'gallery', 'expressionism'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23121212"/><g stroke="%23808080" stroke-width="0.4" opacity="0.25" fill="none"><path d="M0 20 H100 M0 44 H100 M0 68 H100"/><path d="M24 0 V100 M60 0 V100"/></g><g fill="%23fafaf9" opacity="0.45"><rect x="86" y="12" width="6" height="0.5"/><rect x="91.8" y="12" width="0.5" height="6"/></g><text x="56" y="29" font-family="Didot, Georgia, serif" font-size="20" font-weight="900" fill="%23fafaf9" opacity="0.14">03</text><circle cx="38" cy="40" r="20" fill="%23e11d48" opacity="0.8"/><circle cx="62" cy="56" r="16" fill="%232563eb" opacity="0.75"/><path d="M16 78 Q 40 62 84 74" stroke="%23fafaf9" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M18 30 Q 44 12 82 22" stroke="%23fafaf9" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.5"/><g fill="%23eab308"><path d="M22 52 Q 40 44 60 52" stroke="%23eab308" stroke-width="2" fill="none" stroke-linecap="round"/><circle cx="36" cy="58" r="1.4"/><circle cx="52" cy="57" r="1"/></g><g><circle cx="87" cy="42" r="1.4" fill="%23e11d48"/><circle cx="10.8" cy="46.8" r="1" fill="%232563eb"/><circle cx="93" cy="55.6" r="0.7" fill="%23e11d48"/><circle cx="6.6" cy="75.4" r="0.5" fill="%232563eb"/><circle cx="76" cy="20" r="0.9" fill="%23e11d48"/><circle cx="15" cy="64" r="0.6" fill="%232563eb"/></g><rect x="18" y="73" width="50" height="6" rx="1" fill="%23fafaf9" opacity="0.9"/><rect x="18.4" y="84.6" width="36" height="7.4" fill="none" stroke="%23fafaf9" stroke-width="0.5" opacity="0.8"/><rect x="20" y="86" width="28" height="1.4" fill="%23fafaf9" opacity="0.8"/><rect x="20" y="89" width="32" height="1.2" fill="%23fafaf9" opacity="0.55"/><rect x="56" y="87" width="18" height="1.6" fill="%23fafaf9" opacity="0.7"/><rect x="12" y="94" width="76" height="0.5" fill="%23fafaf9" opacity="0.3"/></svg>',
    tokens: {
      colors: {
        bg: { label: '展厅墙', default: '#121212', options: ['#121212', '#0C0A09', '#1C1917', '#F5F5F4'] },
        primary: { label: '主彩', default: '#E11D48', options: ['#E11D48', '#F59E0B', '#38BDF8', '#A855F7', '#EC4899'] },
        secondary: { label: '辅彩', default: '#2563EB', options: ['#2563EB', '#0D9488', '#EC4899', '#84CC16', '#A855F7'] },
        ink: { label: '题签', default: '#FAFAF9', options: ['#FAFAF9', '#E7E5E4', '#FFFFFF', '#292524', '#FEF3C7'] }
      },
      fonts: { heading: { label: '标题', default: 'Didot, Georgia, serif', options: ['Didot, Georgia, serif', 'Songti SC, SimSun, serif'] } }
    },
    presets: [
      { name: '夜馆红蓝', colors: { bg: '#121212', primary: '#E11D48', secondary: '#2563EB', ink: '#FAFAF9' } },
      { name: '夜馆金紫', colors: { bg: '#0C0A09', primary: '#F59E0B', secondary: '#A855F7', ink: '#FEF3C7' } },
      { name: '白盒子展厅', colors: { bg: '#F5F5F4', primary: '#EC4899', secondary: '#0D9488', ink: '#292524' } },
      { name: '夜馆青柠', colors: { bg: '#1C1917', primary: '#38BDF8', secondary: '#84CC16', ink: '#E7E5E4' } }
    ],
    canvas: { virtualWidth: 1000, virtualHeight: 1000, defaultWidth: 1000, defaultHeight: 1000, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'canvas-weave', type: 'image', src: SPLAT_WEAVE, x: 0, y: 0, width: 1000, height: 1000, objectFit: 'fill', zIndex: 1 },
      { id: 'tick-hi-tr', type: 'shape', shapeKind: 'rect', x: 860, y: 120, width: 60, height: 2, fill: { $t: 'colors.ink' }, opacity: 0.45, zIndex: 1 },
      { id: 'tick-v-tr', type: 'shape', shapeKind: 'rect', x: 918, y: 120, width: 2, height: 60, fill: { $t: 'colors.ink' }, opacity: 0.45, zIndex: 1 },
      { id: 'bg-num', type: 'text', content: '03', fontFamily: { $t: 'fonts.heading' }, fontSize: 170, fontWeight: '900', color: { $t: 'colors.ink' }, opacity: 0.12, x: 560, y: 130, width: 380, height: 200, zIndex: 2, editable: { content: true } },
      { id: 'splash-1', type: 'overlay', background: 'radial-gradient(circle at 45% 40%, rgba(225,29,72,0.85), transparent 62%)', x: 120, y: 130, width: 520, height: 520, mixBlendMode: 'screen', zIndex: 1, animation: { name: 'gradientPan', duration: 9000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'splash-2', type: 'overlay', background: 'radial-gradient(circle at 55% 55%, rgba(37,99,235,0.8), transparent 60%)', x: 380, y: 300, width: 540, height: 540, mixBlendMode: 'screen', zIndex: 1, animation: { name: 'float', duration: 9500, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'brush-arc', type: 'image', src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 200"><path d="M20 160 Q 200 20 580 90" fill="none" stroke="%23fafaf9" stroke-width="14" stroke-linecap="round" opacity="0.9"/><path d="M60 176 Q 240 60 560 118" fill="none" stroke="%23fafaf9" stroke-width="4" stroke-linecap="round" opacity="0.4"/></svg>', x: 180, y: 200, width: 640, height: 220, objectFit: 'contain', zIndex: 2, animation: { name: 'inkReveal', duration: 1300 }, editable: { position: true, size: { type: 'scale' } } },
      { id: 'drip', type: 'image', src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 120"><path d="M8 40 Q 100 8 196 44 T 392 36" fill="none" stroke="%23eab308" stroke-width="9" stroke-linecap="round"/><path d="M120 46 L120 96" stroke="%23eab308" stroke-width="7" stroke-linecap="round"/><circle cx="120" cy="104" r="7" fill="%23eab308"/><path d="M286 40 L286 74" stroke="%23eab308" stroke-width="6" stroke-linecap="round"/><circle cx="286" cy="82" r="6" fill="%23eab308"/></svg>', x: 220, y: 520, width: 560, height: 170, objectFit: 'contain', zIndex: 3, animation: { name: 'slideInLeft', duration: 800, delay: 400 }, editable: { position: true, size: { type: 'scale' } } },
      { id: 'splatter-a', type: 'shape', shapeKind: 'circle', x: 760, y: 200, width: 18, height: 18, fill: { $t: 'colors.primary' }, zIndex: 3, animation: { name: 'sparkle', duration: 4200, iterationCount: 'infinite' } },
      { id: 'splatter-b', type: 'shape', shapeKind: 'circle', x: 150, y: 640, width: 12, height: 12, fill: { $t: 'colors.secondary' }, zIndex: 3, animation: { name: 'sparkle', duration: 4200, delay: 900, iterationCount: 'infinite' } },
      { id: 'droplet-a', type: 'shape', shapeKind: 'circle', x: 872, y: 420, width: 28, height: 28, fill: { $t: 'colors.primary' }, opacity: 0.85, zIndex: 3, animation: { name: 'float', duration: 6600, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'droplet-b', type: 'shape', shapeKind: 'circle', x: 108, y: 468, width: 20, height: 20, fill: { $t: 'colors.secondary' }, opacity: 0.8, zIndex: 3, animation: { name: 'float', duration: 7800, delay: 500, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'droplet-c', type: 'shape', shapeKind: 'circle', x: 930, y: 556, width: 14, height: 14, fill: { $t: 'colors.primary' }, opacity: 0.7, zIndex: 3, animation: { name: 'twinkle', duration: 3400, delay: 300, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'droplet-d', type: 'shape', shapeKind: 'circle', x: 66, y: 754, width: 10, height: 10, fill: { $t: 'colors.secondary' }, opacity: 0.7, zIndex: 3, animation: { name: 'twinkle', duration: 3000, delay: 900, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'trail-a', type: 'shape', shapeKind: 'circle', x: 382, y: 702, width: 12, height: 12, fill: { $t: 'colors.primary' }, opacity: 0.75, zIndex: 3 },
      { id: 'trail-b', type: 'shape', shapeKind: 'circle', x: 616, y: 686, width: 8, height: 8, fill: { $t: 'colors.secondary' }, opacity: 0.7, zIndex: 3 },
      { id: 'title-cn', type: 'text', content: '泼彩·无题', fontFamily: { $t: 'fonts.heading' }, fontSize: 78, fontWeight: '700', color: { $t: 'colors.ink' }, letterSpacing: 12, x: 180, y: 720, width: 640, height: 110, zIndex: 4, animation: { name: 'rise', duration: 900, delay: 600 }, editable: { content: true, fontSize: { type: 'range', min: 52, max: 96 }, position: true } },
      { id: 'plinth-line', type: 'shape', shapeKind: 'rect', x: 120, y: 940, width: 760, height: 2, fill: { $t: 'colors.ink' }, opacity: 0.28, zIndex: 4 },
      { id: 'gallery-card', type: 'shape', shapeKind: 'rect', x: 184, y: 846, width: 360, height: 74, fill: 'rgba(128,128,128,0.12)', border: { color: { $t: 'colors.ink' }, width: 1, style: 'solid' }, zIndex: 4 },
      { id: 'gallery-text', type: 'text', content: 'No. 03 · 布面丙烯 · 2026', fontFamily: { $t: 'fonts.heading' }, fontSize: 18, color: { $t: 'colors.ink' }, letterSpacing: 2, x: 200, y: 858, width: 330, height: 26, zIndex: 5, editable: { content: true } },
      { id: 'gallery-latin', type: 'text', content: 'ABSTRACT EXPRESSIONISM · 1958', fontFamily: 'Courier New, monospace', fontSize: 15, color: { $t: 'colors.ink' }, opacity: 0.75, letterSpacing: 2, x: 200, y: 888, width: 340, height: 22, zIndex: 5, editable: { content: true } },
      { id: 'credit-cn', type: 'text', content: '馆藏 · 抽象部', fontFamily: { $t: 'fonts.heading' }, fontSize: 20, color: { $t: 'colors.ink' }, opacity: 0.8, x: 560, y: 868, width: 300, height: 28, zIndex: 4, animation: { name: 'fadeIn', duration: 700, delay: 900 }, editable: { content: true } }
    ]
  }
]

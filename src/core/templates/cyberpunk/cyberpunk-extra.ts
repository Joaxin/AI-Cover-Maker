// src/core/templates/cyberpunk/cyberpunk-extra.ts —— 赛博朋克扩展（5 个）
import type { Template } from '@/types/types'

// 合成波落日（带切片缝隙的太阳）
const SUN_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300"><defs><linearGradient id="s" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="%23ffe600"/><stop offset="55%" stop-color="%23ff7b54"/><stop offset="100%" stop-color="%23ff007f"/></linearGradient></defs><circle cx="150" cy="150" r="140" fill="url(%23s)"/><g fill="%2318002f"><rect x="10" y="168" width="280" height="8"/><rect x="10" y="192" width="280" height="11"/><rect x="10" y="222" width="280" height="15"/><rect x="10" y="256" width="280" height="20"/></g></svg>'

// 透视网格地板
const FLOOR_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 320"><g stroke="%2300f0ff" stroke-width="2" opacity="0.7"><path d="M500 0 L-500 320 M500 0 L-180 320 M500 0 L80 320 M500 0 L300 320 M500 0 L500 320 M500 0 L700 320 M500 0 L920 320 M500 0 L1180 320 M500 0 L1500 320" fill="none"/></g><g stroke="%23ff007f" stroke-width="2" opacity="0.75" fill="none"><path d="M0 20 L1000 20"/><path d="M0 52 L1000 52"/><path d="M0 96 L1000 96"/><path d="M0 156 L1000 156"/><path d="M0 236 L1000 236"/><path d="M0 336 L1000 336"/></g></svg>'

// 警告斜纹胶带
const TAPE_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 60"><defs><pattern id="t" width="56" height="56" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="28" height="56" fill="%23ffd60a"/></pattern></defs><rect width="400" height="60" fill="%23141414"/><rect width="400" height="60" fill="url(%23t)" opacity="0.9"/><text x="200" y="38" font-family="Courier New, monospace" font-size="22" font-weight="700" fill="%23141414" text-anchor="middle" letter-spacing="4">DO NOT CROSS</text></svg>'

// 条形码
const BARCODE_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 70"><g fill="%23e8e8e8"><rect x="0" width="4" height="60"/><rect x="8" width="2" height="60"/><rect x="14" width="6" height="60"/><rect x="24" width="2" height="60"/><rect x="30" width="4" height="60"/><rect x="38" width="8" height="60"/><rect x="50" width="2" height="60"/><rect x="56" width="6" height="60"/><rect x="66" width="3" height="60"/><rect x="73" width="5" height="60"/><rect x="84" width="2" height="60"/><rect x="90" width="7" height="60"/><rect x="102" width="3" height="60"/><rect x="109" width="2" height="60"/><rect x="115" width="6" height="60"/><rect x="126" width="4" height="60"/><rect x="134" width="2" height="60"/><rect x="140" width="8" height="60"/><rect x="153" width="3" height="60"/><rect x="160" width="2" height="60"/><rect x="166" width="5" height="60"/><rect x="176" width="3" height="60"/><rect x="183" width="6" height="60"/><rect x="194" width="2" height="60"/><rect x="200" width="4" height="60"/><rect x="208" width="7" height="60"/><rect x="220" width="3" height="60"/><rect x="228" width="5" height="60"/><rect x="237" width="3" height="60"/></g><text x="0" y="70" font-family="Courier New, monospace" font-size="12" fill="%23e8e8e8" letter-spacing="6">CP77-2077-KX</text></svg>'

// ── 本文件专用小工具（前缀 ce*，只做两件事：把两点折成一枚旋转细条、把 token 引用压成对象）
const CE_MONO = 'Courier New, monospace'
const CE_SONG = 'Songti SC, STSong, SimSun, serif'
const ceTok = (k: string) => ({ $t: k })

/** 两点 → 一枚旋转细长 rect：引线 / 电线 / 刀光 / 雨丝 / 雷达辐条全靠它，颜色一律走 token */
function ceLine(id: string, x1: number, y1: number, x2: number, y2: number, thick: number, token: string, opacity: number, z: number, extra: any = {}): any {
  const len = Math.hypot(x2 - x1, y2 - y1)
  const deg = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI
  return {
    id, type: 'shape', shapeKind: 'rect',
    x: +((x1 + x2) / 2 - len / 2).toFixed(1), y: +((y1 + y2) / 2 - thick / 2).toFixed(1),
    width: +len.toFixed(1), height: thick, rotation: +deg.toFixed(2),
    fill: ceTok(token), opacity, zIndex: z, ...extra
  }
}

/** 透视放射线：从消隐点朝下扇形展开，端点自动夹在画布内；中央亮、两侧渐暗保持对称 */
function ceRays(prefix: string, vx: number, vy: number, angles: number[], thick: number, token: string, z: number, dim = 0.4, bright = 0.9): any[] {
  const mid = (angles.length - 1) / 2
  return angles.map((a, i) => {
    const rad = (a * Math.PI) / 180
    const dy = 1000 - vy
    const dx = dy * Math.tan(rad)
    const k = Math.abs(dx) > 500 ? 500 / Math.abs(dx) : 1
    const near = 1 - Math.abs(i - mid) / (mid || 1)
    return ceLine(`${prefix}-${i}`, vx, vy, vx + dx * k, vy + dy * k, thick, token, +(dim + (bright - dim) * near).toFixed(2), z)
  })
}

/** CRT 扫描线：横向 2px 亮线 + 6px 间隙，纯中性 rgba（氛围层不参与换色） */
const CE_CRT = 'repeating-linear-gradient(0deg, rgba(255,255,255,0.055) 0px, rgba(255,255,255,0.055) 2px, rgba(255,255,255,0) 2px, rgba(255,255,255,0) 6px)'

/** 窗格灯阵：两道正交 repeating-linear-gradient 拼出楼宇窗框 */
const ceWindows = (stepX: number, stepY: number, w: number, h: number) =>
  `repeating-linear-gradient(90deg, rgba(148,163,184,${w}) 0px, rgba(148,163,184,${w}) 2px, rgba(148,163,184,0) 2px, rgba(148,163,184,0) ${stepX}px), repeating-linear-gradient(0deg, rgba(148,163,184,${h}) 0px, rgba(148,163,184,${h}) 2px, rgba(148,163,184,0) 2px, rgba(148,163,184,0) ${stepY}px)`

export const cyberpunkExtraTemplates: Template[] = [
  {
    id: 'cyberpunk-vaporwave-sunset', name: '合成波落日', version: '1.0.0', category: 'cyberpunk',
    tags: ['cyberpunk', 'vaporwave', 'synthwave', 'retro', '80s'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><defs><linearGradient id="vs" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="%23ffe600"/><stop offset="58%" stop-color="%23ff7b54"/><stop offset="100%" stop-color="%23ff007f"/></linearGradient></defs><rect width="100" height="100" fill="%2318002f"/><circle cx="50" cy="35" r="24" fill="none" stroke="%2300f0ff" stroke-width="0.7" stroke-dasharray="3 2" opacity="0.55"/><circle cx="50" cy="35" r="18" fill="url(%23vs)"/><g fill="%2318002f"><rect x="28" y="31" width="44" height="2"/><rect x="28" y="36" width="44" height="2.6"/><rect x="28" y="42" width="44" height="3.4"/></g><g fill="none" stroke="%2300f0ff" stroke-width="1" opacity="0.75"><rect x="9" y="26" width="7" height="26"/><rect x="85" y="30" width="6" height="22"/></g><g fill="%23ff007f" opacity="0.8"><rect x="7" y="24" width="11" height="2"/><rect x="83" y="28" width="10" height="2"/></g><rect x="0" y="51" width="100" height="1.5" fill="%2300f0ff"/><g stroke="%2300f0ff" stroke-width="0.9" fill="none" opacity="0.8"><path d="M50 52 L26 100 M50 52 L39 100 M50 52 L50 100 M50 52 L61 100 M50 52 L74 100"/></g><g stroke="%23ff007f" fill="none"><path d="M0 60 L100 60" stroke-width="0.7" opacity="0.7"/><path d="M0 69 L100 69" stroke-width="1" opacity="0.7"/><path d="M0 81 L100 81" stroke-width="1.4" opacity="0.7"/><path d="M0 96 L100 96" stroke-width="1.8" opacity="0.7"/></g><text x="50" y="47.5" font-family="Impact, sans-serif" font-size="7" font-weight="900" fill="%23ffffff" text-anchor="middle" opacity="0.9">NEON DREAMS</text><text x="93" y="13" font-family="Impact, sans-serif" font-size="6" fill="%23ff007f" text-anchor="end" opacity="0.85">MMXXVII</text><text x="6" y="13" font-family="Courier New, monospace" font-size="4.6" fill="%23ffe600" letter-spacing="0.6">107.9 FM</text><g stroke="%23ffffff" stroke-width="0.5" opacity="0.12"><path d="M0 6 L100 6 M0 12 L100 12 M0 18 L100 18 M0 42 L100 42 M0 48 L100 48 M0 90 L100 90"/></g></svg>',
    tokens: {
      colors: {
        bg: { label: '夜空', default: '#18002F', options: ['#18002F', '#0B001A', '#240046', '#001233'] },
        primary: { label: '品红', default: '#FF007F', options: ['#FF007F', '#FF7B54', '#E11D48', '#F472B6'] },
        accent: { label: '霓虹青', default: '#00F0FF', options: ['#00F0FF', '#22D3EE', '#7DF9FF', '#A855F7'] }
      },
      fonts: { heading: { label: '标题', default: 'Impact, Helvetica, sans-serif', options: ['Impact, Helvetica, sans-serif', 'Arial Black, sans-serif'] } }
    },
    presets: [
      { name: '迈阿密落日', colors: { bg: '#18002F', primary: '#FF007F', accent: '#00F0FF' } },
      { name: '紫雾电台', colors: { bg: '#240046', primary: '#F472B6', accent: '#A855F7' } },
      { name: '午夜湾区', colors: { bg: '#001233', primary: '#FF7B54', accent: '#7DF9FF' } },
      { name: '赤雾港区', colors: { bg: '#0B001A', primary: '#E11D48', accent: '#22D3EE' } }
    ],
    canvas: { virtualWidth: 1000, virtualHeight: 1000, defaultWidth: 1000, defaultHeight: 1000, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      // ── 天空与落日
      { id: 'sky-glow', type: 'overlay', background: 'radial-gradient(circle at 50% 42%, rgba(255,0,127,0.35), transparent 58%)', x: 0, y: 0, width: 1000, height: 1000, zIndex: 1, animation: { name: 'gradientPan', duration: 10000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'sun-halo', type: 'shape', shapeKind: 'circle', x: 298, y: 108, width: 404, height: 404, border: { width: 1.5, style: 'dashed', color: { $t: 'colors.accent' } }, opacity: 0.4, zIndex: 1, animation: { name: 'spinSlow', duration: 42000, iterationCount: 'infinite', easing: 'linear' } },
      { id: 'sun', type: 'image', src: SUN_SVG, x: 320, y: 130, width: 360, height: 360, objectFit: 'contain', zIndex: 2, animation: { name: 'float', duration: 7000, iterationCount: 'infinite', easing: 'ease-in-out' }, editable: { position: true, size: { type: 'scale' } } },
      // ── 落日切条：与夜空同色的横带，整幅啃掉太阳与余晖（循环生成）
      { id: 'sun-slice-0', group: 'sun-slice-', type: 'shape', shapeKind: 'rect', x: -20, y: 344, width: 1040, height: 5, fill: { $t: 'colors.bg' }, opacity: 0.9, zIndex: 3 },
      { id: 'sun-slice-1', group: 'sun-slice-', type: 'shape', shapeKind: 'rect', x: -20, y: 374, width: 1040, height: 8, fill: { $t: 'colors.bg' }, opacity: 0.9, zIndex: 3 },
      { id: 'sun-slice-2', group: 'sun-slice-', type: 'shape', shapeKind: 'rect', x: -20, y: 410, width: 1040, height: 12, fill: { $t: 'colors.bg' }, opacity: 0.9, zIndex: 3 },
      // ── 希腊柱剪影：霓虹描边的残柱压在落日渐层上（柱身 + 柱头共两组循环）
      { id: 'col-shaft-0', type: 'shape', shapeKind: 'rect', x: 52, y: 430, width: 42, height: 222, border: { width: 2, color: { $t: 'colors.accent' } }, opacity: 0.5, zIndex: 2 },
      { id: 'col-shaft-1', type: 'shape', shapeKind: 'rect', x: 916, y: 476, width: 34, height: 176, border: { width: 2, color: { $t: 'colors.accent' } }, opacity: 0.42, zIndex: 2 },
      { id: 'col-cap-0', type: 'shape', shapeKind: 'rect', x: 42, y: 418, width: 62, height: 12, fill: { $t: 'colors.primary' }, opacity: 0.6, zIndex: 2 },
      { id: 'col-cap-1', type: 'shape', shapeKind: 'rect', x: 906, y: 464, width: 54, height: 12, fill: { $t: 'colors.primary' }, opacity: 0.52, zIndex: 2 },
      // ── 透视网格地面：老贴图压暗当余晖，放射 + 横线两组循环接管换色
      { id: 'floor', type: 'image', src: FLOOR_SVG, x: 0, y: 660, width: 1000, height: 320, objectFit: 'fill', opacity: 0.26, zIndex: 2, animation: { name: 'rise', duration: 900 } },
      ...ceRays('grid-ray', 500, 656, [-44, -22, 0, 22, 44], 2.5, 'colors.accent', 2, 0.4, 0.85) as any,
      { id: 'grid-rung-0', group: 'grid-rung-', type: 'shape', shapeKind: 'rect', x: 0, y: 668, width: 1000, height: 1.5, fill: { $t: 'colors.primary' }, opacity: 0.55, zIndex: 2 },
      { id: 'grid-rung-1', group: 'grid-rung-', type: 'shape', shapeKind: 'rect', x: 0, y: 690, width: 1000, height: 2, fill: { $t: 'colors.primary' }, opacity: 0.6, zIndex: 2 },
      { id: 'grid-rung-2', group: 'grid-rung-', type: 'shape', shapeKind: 'rect', x: 0, y: 726, width: 1000, height: 2.6, fill: { $t: 'colors.primary' }, opacity: 0.66, zIndex: 2 },
      { id: 'grid-rung-3', group: 'grid-rung-', type: 'shape', shapeKind: 'rect', x: 0, y: 788, width: 1000, height: 3.4, fill: { $t: 'colors.primary' }, opacity: 0.72, zIndex: 2 },
      { id: 'grid-rung-4', group: 'grid-rung-', type: 'shape', shapeKind: 'rect', x: 0, y: 880, width: 1000, height: 4.6, fill: { $t: 'colors.primary' }, opacity: 0.78, zIndex: 2 },
      { id: 'horizon', type: 'shape', shapeKind: 'line', x: 0, y: 652, width: 1000, height: 4, fill: { $t: 'colors.accent' }, zIndex: 3, shadow: { offsetX: 0, offsetY: 0, blur: 22, color: 'rgba(0,240,255,0.8)' }, animation: { name: 'shimmer', duration: 3400, iterationCount: 'infinite' } },
      // ── 悬浮小字：罗马数字 + 片假名，合成波唱片的封套味
      { id: 'roman-float', type: 'text', content: 'MMXXVII', fontFamily: { $t: 'fonts.heading' }, fontSize: 34, fontWeight: '900', color: { $t: 'colors.primary' }, opacity: 0.6, letterSpacing: 8, textAlign: 'right', x: 632, y: 148, width: 272, height: 42, zIndex: 4, animation: { name: 'float', duration: 8600, iterationCount: 'infinite', easing: 'ease-in-out' }, editable: { content: true } },
      { id: 'kana-l', type: 'text', content: '夜間飛行', fontFamily: CE_SONG, fontSize: 30, color: { $t: 'colors.accent' }, opacity: 0.75, letterSpacing: 10, x: 44, y: 584, width: 210, height: 38, zIndex: 4, animation: { name: 'fadeInUp', duration: 900, delay: 700 }, editable: { content: true } },
      { id: 'kana-r', type: 'text', content: 'ネオン・グロウ', fontFamily: CE_SONG, fontSize: 24, color: { $t: 'colors.primary' }, opacity: 0.72, letterSpacing: 5, textAlign: 'right', x: 726, y: 590, width: 230, height: 32, zIndex: 4, animation: { name: 'fadeInUp', duration: 900, delay: 860 }, editable: { content: true } },
      // ── 主标题
      { id: 'title-main', type: 'text', content: 'NEON DREAMS ’84', fontFamily: { $t: 'fonts.heading' }, fontSize: 84, fontWeight: '900', color: { $t: 'colors.primary' }, letterSpacing: 2, textAlign: 'center', x: 40, y: 330, width: 920, height: 120, zIndex: 5, shadow: { offsetX: 6, offsetY: 6, blur: 0, color: '#00F0FF' }, animation: { name: 'zoomIn', duration: 800 }, editable: { content: true, fontSize: { type: 'range', min: 60, max: 120 }, position: true } },
      { id: 'title-cn', type: 'text', content: '回 到 未 来 的 过 去', fontFamily: CE_SONG, fontSize: 30, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 12, textAlign: 'center', x: 200, y: 476, width: 600, height: 44, zIndex: 5, animation: { name: 'fadeInUp', duration: 800, delay: 500 }, editable: { content: true } },
      { id: 'band-tag', type: 'text', content: 'SIDE A // RETRON-FM 107.9', fontFamily: CE_MONO, fontSize: 18, color: '#FFE600', letterSpacing: 3, x: 92, y: 84, width: 420, height: 26, zIndex: 4, editable: { content: true } },
      { id: 'band-tag-r', type: 'text', content: 'TRACK 03', fontFamily: CE_MONO, fontSize: 18, color: '#FFE600', letterSpacing: 3, textAlign: 'right', x: 620, y: 84, width: 288, height: 26, zIndex: 4, editable: { content: true } },
      { id: 'crt-scan', type: 'overlay', background: CE_CRT, x: 0, y: 0, width: 1000, height: 1000, opacity: 0.55, zIndex: 6 }
    ]
  },
  {
    id: 'cyberpunk-glitch-rgb', name: '故障三色拆', version: '1.0.0', category: 'cyberpunk',
    tags: ['cyberpunk', 'glitch', 'rgb', 'datamosh', 'distortion'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23050505"/><g><rect x="0" y="13" width="46" height="3" fill="%23ff004d" opacity="0.5"/><rect x="30" y="18" width="70" height="2" fill="%2300fff7" opacity="0.45"/><rect x="0" y="50" width="62" height="3.4" fill="%23ff004d" opacity="0.35"/><rect x="50" y="55" width="50" height="2" fill="%2300fff7" opacity="0.4"/><rect x="12" y="59" width="38" height="1.6" fill="%23ffffff" opacity="0.28"/><rect x="62" y="66" width="38" height="2.6" fill="%23ff004d" opacity="0.3"/></g><g font-family="Arial Black" font-size="21" font-weight="900"><text x="11" y="42" fill="%23ff004d" opacity="0.9">SYSTEM</text><text x="16" y="39" fill="%2300fff7" opacity="0.85">SYSTEM</text><text x="13.5" y="40.5" fill="%23ffffff">SYSTEM</text><text x="10" y="57" fill="%23ff004d" opacity="0.8">FAILURE</text><text x="15" y="54" fill="%2300fff7" opacity="0.8">FAILURE</text><text x="12.5" y="55.5" fill="%23ffffff">FAILURE</text></g><g fill="%23ffffff"><rect x="4" y="24" width="3" height="3" opacity="0.5"/><rect x="93" y="33" width="2.4" height="6" fill="%23ff004d" opacity="0.55"/><rect x="6" y="62" width="2" height="7" opacity="0.3"/><rect x="76" y="15" width="6" height="2" fill="%2300fff7" opacity="0.5"/></g><g font-family="Courier New, monospace" font-size="4.4"><text x="6" y="11" fill="%2300fff7">FATAL 0x7F3A</text><text x="60" y="11" fill="%23ff004d">記録破損</text><text x="6" y="30" fill="%2300fff7" opacity="0.8">DATA ▒▒ LOST 0x0B4</text></g><rect x="25" y="72" width="50" height="4" fill="none" stroke="%23ffffff" stroke-width="0.8"/><rect x="25.6" y="72.6" width="34" height="2.8" fill="%2300fff7"/><text x="50" y="82" font-family="Courier New, monospace" font-size="4.4" fill="%23ff004d" text-anchor="middle">RECOVERING 68%</text><g font-family="Arial Black" font-size="11" font-weight="900"><text x="6" y="93" fill="%23ff004d" opacity="0.85">NO SIGNAL</text><text x="8.6" y="91.4" fill="%2300fff7" opacity="0.8">NO SIGNAL</text><text x="7.3" y="92.2" fill="%23ffffff">NO SIGNAL</text></g><g stroke="%23ffffff" stroke-width="0.4" opacity="0.1"><path d="M0 4 L100 4 M0 9 L100 9 M0 86 L100 86 M0 96 L100 96"/></g></svg>',
    tokens: {
      colors: {
        bg: { label: '噪点底', default: '#050505', options: ['#050505', '#0A0A0A', '#030712', '#111111'] },
        red: { label: '错位红', default: '#FF004D', options: ['#FF004D', '#FF007F', '#E11D48', '#F97316'] },
        cyan: { label: '错位青', default: '#00FFF7', options: ['#00FFF7', '#00F0FF', '#22D3EE', '#34D399'] },
        white: { label: '主体白', default: '#FFFFFF', options: ['#FFFFFF', '#F5F5F5', '#E0F2FE', '#FEFCE8'] }
      },
      fonts: { heading: { label: '标题', default: 'Arial Black, Impact, sans-serif', options: ['Arial Black, Impact, sans-serif', 'Inter, sans-serif'] } }
    },
    presets: [
      { name: '经典红青', colors: { bg: '#050505', red: '#FF004D', cyan: '#00FFF7', white: '#FFFFFF' } },
      { name: '粉青夜煞', colors: { bg: '#030712', red: '#FF007F', cyan: '#22D3EE', white: '#E0F2FE' } },
      { name: '橙绿毒液', colors: { bg: '#111111', red: '#F97316', cyan: '#34D399', white: '#FEFCE8' } },
      { name: '猩红碎帧', colors: { bg: '#0A0A0A', red: '#E11D48', cyan: '#00F0FF', white: '#F5F5F5' } }
    ],
    canvas: {
      virtualWidth: 1000, virtualHeight: 1000, defaultWidth: 1000, defaultHeight: 1000, backgroundColor: { $t: 'colors.bg' },
      backgroundImage: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000"><g fill="%23ffffff"><rect x="120" y="90" width="46" height="3" opacity="0.08"/><rect x="640" y="180" width="90" height="4" opacity="0.06"/><rect x="80" y="420" width="70" height="4" opacity="0.07"/><rect x="780" y="520" width="120" height="5" opacity="0.05"/><rect x="220" y="700" width="60" height="3" opacity="0.08"/><rect x="560" y="860" width="100" height="4" opacity="0.06"/></g><g fill="%23ff004d" opacity="0.07"><rect x="300" y="240" width="140" height="8"/><rect x="60" y="600" width="100" height="6"/></g><g fill="%2300fff7" opacity="0.07"><rect x="500" y="320" width="160" height="7"/><rect x="700" y="720" width="120" height="6"/></g></svg>'
    },
    elements: [
      // ── 标题三色拆（主标题三层）
      { id: 'ghost-red', type: 'text', content: 'SYSTEM\nFAILURE', fontFamily: { $t: 'fonts.heading' }, fontSize: 118, fontWeight: '900', color: { $t: 'colors.red' }, opacity: 0.85, lineHeight: 1.05, x: 80, y: 262, width: 850, height: 300, zIndex: 2, animation: { name: 'wobble', duration: 2200, iterationCount: 'infinite', easing: 'steps(2)' } },
      { id: 'ghost-cyan', type: 'text', content: 'SYSTEM\nFAILURE', fontFamily: { $t: 'fonts.heading' }, fontSize: 118, fontWeight: '900', color: { $t: 'colors.cyan' }, opacity: 0.85, lineHeight: 1.05, x: 120, y: 250, width: 850, height: 300, zIndex: 2, animation: { name: 'wobble', duration: 2200, delay: 150, iterationCount: 'infinite', easing: 'steps(2)' } },
      { id: 'main-glitch', type: 'text', content: 'SYSTEM\nFAILURE', fontFamily: { $t: 'fonts.heading' }, fontSize: 118, fontWeight: '900', color: { $t: 'colors.white' }, lineHeight: 1.05, x: 100, y: 256, width: 850, height: 300, zIndex: 3, animation: { name: 'glow', duration: 1600, iterationCount: 'infinite' }, editable: { content: true, fontSize: { type: 'range', min: 80, max: 140 }, position: true } },
      // ── 底部第二组色散副本（NO SIGNAL 三层错位）
      { id: 'sig-red', type: 'text', content: 'NO SIGNAL', fontFamily: { $t: 'fonts.heading' }, fontSize: 92, fontWeight: '900', color: { $t: 'colors.red' }, opacity: 0.8, letterSpacing: 4, x: 84, y: 796, width: 720, height: 104, zIndex: 2, animation: { name: 'wobble', duration: 1900, delay: 90, iterationCount: 'infinite', easing: 'steps(2)' } },
      { id: 'sig-cyan', type: 'text', content: 'NO SIGNAL', fontFamily: { $t: 'fonts.heading' }, fontSize: 92, fontWeight: '900', color: { $t: 'colors.cyan' }, opacity: 0.75, letterSpacing: 4, x: 110, y: 784, width: 720, height: 104, zIndex: 3, animation: { name: 'wobble', duration: 1900, delay: 240, iterationCount: 'infinite', easing: 'steps(2)' } },
      { id: 'sig-white', type: 'text', content: 'NO SIGNAL', fontFamily: { $t: 'fonts.heading' }, fontSize: 92, fontWeight: '900', color: { $t: 'colors.white' }, opacity: 0.95, letterSpacing: 4, x: 97, y: 790, width: 720, height: 104, zIndex: 4, shadow: { offsetX: 0, offsetY: 0, blur: 18, color: 'rgba(0,255,247,0.5)' }, animation: { name: 'glow', duration: 2600, iterationCount: 'infinite', easing: 'ease-in-out' }, editable: { content: true } },
      // ── 撕裂横条：宽度 / 起点 / 相位全不一样，steps 抖动模拟丢帧
      { id: 'slice-1', type: 'shape', shapeKind: 'rect', x: 60, y: 300, width: 880, height: 16, fill: { $t: 'colors.red' }, opacity: 0.55, zIndex: 5, animation: { name: 'drift', duration: 1700, iterationCount: 'infinite', easing: 'steps(3)' } },
      { id: 'slice-2', type: 'shape', shapeKind: 'rect', x: 60, y: 428, width: 880, height: 12, fill: { $t: 'colors.cyan' }, opacity: 0.5, zIndex: 5, animation: { name: 'drift', duration: 2100, delay: 400, iterationCount: 'infinite', easing: 'steps(3)' } },
      { id: 'tear-0', group: 'tear-', type: 'shape', shapeKind: 'rect', x: -20, y: 168, width: 470, height: 10, fill: { $t: 'colors.red' }, opacity: 0.5, zIndex: 5, animation: { name: 'drift', duration: 1400, delay: 120, iterationCount: 'infinite', easing: 'steps(2)' } },
      { id: 'tear-1', group: 'tear-', type: 'shape', shapeKind: 'rect', x: 300, y: 192, width: 720, height: 6, fill: { $t: 'colors.cyan' }, opacity: 0.45, zIndex: 5, animation: { name: 'drift', duration: 2600, delay: 620, iterationCount: 'infinite', easing: 'steps(2)' } },
      { id: 'tear-2', group: 'tear-', type: 'shape', shapeKind: 'rect', x: -20, y: 470, width: 620, height: 18, fill: { $t: 'colors.red' }, opacity: 0.35, zIndex: 5, animation: { name: 'drift', duration: 1900, delay: 300, iterationCount: 'infinite', easing: 'steps(4)' } },
      { id: 'tear-3', group: 'tear-', type: 'shape', shapeKind: 'rect', x: 500, y: 494, width: 520, height: 9, fill: { $t: 'colors.cyan' }, opacity: 0.4, zIndex: 5, animation: { name: 'drift', duration: 2300, delay: 900, iterationCount: 'infinite', easing: 'steps(3)' } },
      { id: 'tear-4', group: 'tear-', type: 'shape', shapeKind: 'rect', x: 120, y: 528, width: 380, height: 5, fill: { $t: 'colors.white' }, opacity: 0.28, zIndex: 5, animation: { name: 'drift', duration: 1600, delay: 500, iterationCount: 'infinite', easing: 'steps(2)' } },
      { id: 'tear-5', group: 'tear-', type: 'shape', shapeKind: 'rect', x: 620, y: 598, width: 380, height: 13, fill: { $t: 'colors.red' }, opacity: 0.3, zIndex: 5, animation: { name: 'drift', duration: 2800, delay: 200, iterationCount: 'infinite', easing: 'steps(3)' } },
      // ── 噪点块 + 扫描线
      { id: 'bit-0', group: 'bit-', type: 'shape', shapeKind: 'rect', x: 40, y: 236, width: 14, height: 14, fill: { $t: 'colors.cyan' }, opacity: 0.55, zIndex: 5, animation: { name: 'twinkle', duration: 1700, iterationCount: 'infinite', easing: 'steps(1)' } },
      { id: 'bit-1', group: 'bit-', type: 'shape', shapeKind: 'rect', x: 934, y: 322, width: 10, height: 24, fill: { $t: 'colors.red' }, opacity: 0.5, zIndex: 5, animation: { name: 'twinkle', duration: 2300, delay: 300, iterationCount: 'infinite', easing: 'steps(1)' } },
      { id: 'bit-2', group: 'bit-', type: 'shape', shapeKind: 'rect', x: 56, y: 566, width: 8, height: 30, fill: { $t: 'colors.white' }, opacity: 0.26, zIndex: 5 },
      { id: 'bit-3', group: 'bit-', type: 'shape', shapeKind: 'rect', x: 760, y: 150, width: 26, height: 8, fill: { $t: 'colors.cyan' }, opacity: 0.45, zIndex: 5, animation: { name: 'twinkle', duration: 1400, delay: 700, iterationCount: 'infinite', easing: 'steps(1)' } },
      { id: 'bit-4', group: 'bit-', type: 'shape', shapeKind: 'rect', x: 620, y: 662, width: 34, height: 8, fill: { $t: 'colors.white' }, opacity: 0.2, zIndex: 5 },
      { id: 'noise-block', type: 'shape', shapeKind: 'rect', x: 820, y: 120, width: 90, height: 740, fill: 'rgba(255,255,255,0.04)', zIndex: 1 },
      { id: 'crt-scan', type: 'overlay', background: CE_CRT, x: 0, y: 0, width: 1000, height: 1000, opacity: 0.6, zIndex: 6 },
      // ── 故障小字：日志 / 日文报障 / 十六进制残骸
      { id: 'head-tag', type: 'text', content: 'FATAL EXCEPTION 0x7F3A // SCREEN CORRUPTED', fontFamily: CE_MONO, fontSize: 20, fontWeight: '700', color: { $t: 'colors.cyan' }, letterSpacing: 2, x: 96, y: 118, width: 810, height: 30, zIndex: 4, animation: { name: 'blink', duration: 1700, iterationCount: 'infinite' }, editable: { content: true } },
      { id: 'data-lost', type: 'text', content: 'DATA LOST ▒▒ SECTOR 0x0B4', fontFamily: CE_MONO, fontSize: 19, color: { $t: 'colors.cyan' }, opacity: 0.85, letterSpacing: 2, x: 96, y: 220, width: 440, height: 26, zIndex: 4, animation: { name: 'wobble', duration: 2600, iterationCount: 'infinite', easing: 'steps(2)' }, editable: { content: true } },
      { id: 'record-cn', type: 'text', content: '記録破損 · 復旧不能', fontFamily: CE_SONG, fontSize: 26, color: { $t: 'colors.red' }, letterSpacing: 6, textAlign: 'right', x: 580, y: 214, width: 320, height: 34, zIndex: 4, editable: { content: true } },
      { id: 'chksum', type: 'text', content: 'CHECKSUM FAIL // CRC IN CHUNK 04', fontFamily: CE_MONO, fontSize: 17, color: { $t: 'colors.white' }, opacity: 0.5, letterSpacing: 2, x: 96, y: 592, width: 420, height: 22, zIndex: 4, editable: { content: true } },
      { id: 'hexdump', type: 'text', content: 'DE AD BE EF 00 FF 3A 7F C0', fontFamily: CE_MONO, fontSize: 16, color: { $t: 'colors.cyan' }, opacity: 0.5, letterSpacing: 4, x: 96, y: 924, width: 420, height: 22, zIndex: 4, animation: { name: 'blink', duration: 900, iterationCount: 'infinite', easing: 'steps(1)' } },
      { id: 'sub-cn', type: 'text', content: '信 号 丢 失 · 记 忆 溃 散 · 重 组 中 断', fontFamily: CE_MONO, fontSize: 26, color: { $t: 'colors.white' }, opacity: 0.85, letterSpacing: 8, textAlign: 'center', x: 150, y: 620, width: 700, height: 40, zIndex: 4, animation: { name: 'slideUpFade', duration: 700, delay: 600 }, editable: { content: true } },
      { id: 'recovery-bar', type: 'shape', shapeKind: 'rect', x: 250, y: 700, width: 500, height: 14, border: { color: { $t: 'colors.white' }, width: 1.5, style: 'solid' }, zIndex: 4 },
      { id: 'recovery-fill', type: 'shape', shapeKind: 'rect', x: 252, y: 702, width: 340, height: 10, fill: { $t: 'colors.cyan' }, zIndex: 5, animation: { name: 'slideInLeft', duration: 2400, delay: 800 } },
      { id: 'foot-log', type: 'text', content: 'RECOVERING... 68% — DO NOT POWER OFF', fontFamily: CE_MONO, fontSize: 17, color: { $t: 'colors.red' }, letterSpacing: 2, textAlign: 'center', x: 250, y: 734, width: 500, height: 26, zIndex: 4, editable: { content: true } }
    ]
  },
  {
    id: 'cyberpunk-street-blade', name: '街头刀锋海报', version: '1.0.0', category: 'cyberpunk',
    tags: ['cyberpunk', 'streetwear', 'poster', 'kanji', 'caution'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23101010"/><g stroke="%23f5f5f5" stroke-width="0.7" opacity="0.34" fill="none"><path d="M0 6 L34 10 L72 4 L100 9"/><path d="M89 8 L89 15"/></g><g fill="%23ffd60a"><rect x="0" y="15" width="100" height="8"/><rect x="0" y="84" width="100" height="8"/></g><g fill="%23101010" opacity="0.6"><rect x="10" y="15" width="4" height="8"/><rect x="26" y="15" width="4" height="8"/><rect x="42" y="15" width="4" height="8"/><rect x="58" y="15" width="4" height="8"/><rect x="74" y="15" width="4" height="8"/><rect x="18" y="84" width="4" height="8"/><rect x="38" y="84" width="4" height="8"/><rect x="58" y="84" width="4" height="8"/><rect x="78" y="84" width="4" height="8"/></g><g fill="%23ffd60a"><rect x="12" y="28" width="9" height="9"/><rect x="12" y="40" width="9" height="9"/><rect x="12" y="52" width="9" height="9"/><rect x="12" y="64" width="9" height="9"/></g><text x="28" y="38" font-family="Impact, sans-serif" font-size="14" font-weight="900" fill="%23f5f5f5">STREET</text><rect x="28" y="41" width="44" height="4" fill="%23ff0055"/><text x="28" y="57" font-family="Impact, sans-serif" font-size="14" font-weight="900" fill="%23f5f5f5">BLADE</text><g fill="none"><rect x="74" y="26" width="10" height="22" stroke="%23ff0055" stroke-width="1.1"/><rect x="87" y="26" width="11" height="28" stroke="%23ffd60a" stroke-width="1"/><rect x="12" y="76" width="11" height="16" stroke="%23ffd60a" stroke-width="0.9"/></g><g font-family="serif" font-size="4.6"><text x="76" y="33" fill="%23ff0055">ラ</text><text x="76" y="39" fill="%23ff0055">ー</text><text x="76" y="45" fill="%23ff0055">メ</text><text x="89" y="33" fill="%23ffd60a">定</text><text x="89" y="40" fill="%23ffd60a">食</text><text x="89" y="47" fill="%23ffd60a">屋</text><text x="14" y="82" fill="%23ffd60a" font-size="3.8">喫</text><text x="14" y="87" fill="%23ffd60a" font-size="3.8">烟</text></g><text x="28" y="66" font-family="Courier New, monospace" font-size="4" fill="%23f5f5f5" opacity="0.8">SECTOR 9 // NIGHT MARKET</text><text x="28" y="72" font-family="Songti SC, serif" font-size="4.4" fill="%23ffd60a">電脳街 NO.9-27</text><g opacity="0.14" fill="%23f5f5f5"><rect x="0" y="58" width="100" height="9"/><rect x="0" y="70" width="100" height="7"/></g><g><rect x="87" y="94" width="11" height="6" fill="%23ffd60a" opacity="0.3"/><rect x="74" y="94" width="10" height="4" fill="%23ff0055" opacity="0.3"/><rect x="12" y="94" width="11" height="5" fill="%23ffd60a" opacity="0.24"/></g><g stroke="%23ff0055" stroke-width="1.6" opacity="0.9"><path d="M4 91 L96 82"/></g><g stroke="%23f5f5f5" stroke-width="0.5" opacity="0.75"><path d="M4 93.5 L96 84.5"/></g><g stroke="%23ffd60a" stroke-width="0.4" opacity="0.6"><path d="M4 95.5 L96 86.5"/></g></svg>',
    tokens: {
      colors: {
        bg: { label: '沥青', default: '#101010', options: ['#101010', '#171717', '#0B0B0B', '#14100B'] },
        primary: { label: '刀锋红', default: '#FF0055', options: ['#FF0055', '#FF007F', '#E11D48', '#F59E0B', '#22D3EE'] },
        accent: { label: '警诫黄', default: '#FFD60A', options: ['#FFD60A', '#FACC15', '#FDE68A', '#22D3EE', '#F59E0B'] },
        paper: { label: '字白', default: '#F5F5F5', options: ['#F5F5F5', '#FFFFFF', '#E7E5E4', '#FEF9C3'] }
      },
      fonts: { heading: { label: '标题', default: 'Impact, Arial Black, sans-serif', options: ['Impact, Arial Black, sans-serif', 'Songti SC, SimSun, serif'] } }
    },
    presets: [
      { name: '刀锋红黄', colors: { bg: '#101010', primary: '#FF0055', accent: '#FFD60A', paper: '#F5F5F5' } },
      { name: '夜巡青警', colors: { bg: '#0B0B0B', primary: '#22D3EE', accent: '#F59E0B', paper: '#FFFFFF' } },
      { name: '锈带赭火', colors: { bg: '#14100B', primary: '#E11D48', accent: '#FDE68A', paper: '#FEF9C3' } },
      { name: '粉刃长街', colors: { bg: '#171717', primary: '#FF007F', accent: '#FACC15', paper: '#E7E5E4' } }
    ],
    canvas: {
      virtualWidth: 1000, virtualHeight: 1000, defaultWidth: 1000, defaultHeight: 1000, backgroundColor: { $t: 'colors.bg' },
      backgroundImage: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000"><g fill="%23ffffff" opacity="0.05"><circle cx="80" cy="120" r="2"/><circle cx="240" cy="60" r="1.5"/><circle cx="520" cy="140" r="2"/><circle cx="860" cy="90" r="1.5"/><circle cx="930" cy="260" r="2"/><circle cx="150" cy="480" r="1.5"/><circle cx="60" cy="800" r="2"/><circle cx="420" cy="900" r="1.5"/><circle cx="880" cy="420" r="2"/><circle cx="760" cy="940" r="1.5"/></g><rect x="700" y="600" width="240" height="240" fill="none" stroke="%23ffd60a" stroke-width="2" opacity="0.12" transform="rotate(12 820 720)"/></svg>'
    },
    elements: [
      // ── 电线剪影：三档弛线 + 一根掉到招牌上的垂线
      ...([[0, 44, 338, 68, 2], [338, 68, 712, 30, 2], [712, 30, 1000, 74, 2], [896, 58, 896, 152, 1.5]] as number[][]).map((w, i) =>
        ceLine(`wire-${i}`, w[0], w[1], w[2], w[3], w[4], 'colors.paper', 0.26, 2)
      ) as any,
      // ── 雨夜灯箱：框 + 竖排字成对出现
      { id: 'sign-ramen', type: 'shape', shapeKind: 'rect', x: 744, y: 152, width: 84, height: 168, border: { width: 3, color: { $t: 'colors.primary' } }, zIndex: 2, shadow: { offsetX: 0, offsetY: 0, blur: 22, color: 'rgba(255,0,85,0.45)' }, animation: { name: 'glow', duration: 2400, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'sign-ramen-t', type: 'text', content: 'ラ\nー\nメ\nン', fontFamily: CE_SONG, fontSize: 32, fontWeight: '700', color: { $t: 'colors.primary' }, textAlign: 'center', lineHeight: 1.12, x: 750, y: 164, width: 72, height: 146, zIndex: 3, shadow: { offsetX: 0, offsetY: 0, blur: 12, color: 'rgba(255,0,85,0.9)' }, editable: { content: true } },
      { id: 'sign-diner', type: 'shape', shapeKind: 'rect', x: 848, y: 152, width: 96, height: 236, border: { width: 2.5, color: { $t: 'colors.accent' } }, zIndex: 2, shadow: { offsetX: 0, offsetY: 0, blur: 20, color: 'rgba(255,214,10,0.4)' }, animation: { name: 'glow', duration: 3100, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'sign-diner-t', type: 'text', content: '定\n食\n屋', fontFamily: CE_SONG, fontSize: 54, fontWeight: '700', color: { $t: 'colors.accent' }, textAlign: 'center', lineHeight: 1.14, x: 856, y: 170, width: 80, height: 200, zIndex: 3, shadow: { offsetX: 0, offsetY: 0, blur: 14, color: 'rgba(255,214,10,0.85)' }, editable: { content: true } },
      { id: 'sign-smoke', type: 'shape', shapeKind: 'rect', x: 60, y: 704, width: 100, height: 140, border: { width: 2, color: { $t: 'colors.accent' } }, opacity: 0.9, zIndex: 2, shadow: { offsetX: 0, offsetY: 0, blur: 14, color: 'rgba(255,214,10,0.35)' } },
      { id: 'sign-smoke-t', type: 'text', content: '喫\n烟\n室', fontFamily: CE_SONG, fontSize: 32, color: { $t: 'colors.paper' }, textAlign: 'center', lineHeight: 1.16, x: 66, y: 714, width: 88, height: 120, zIndex: 3, animation: { name: 'blink', duration: 6200, iterationCount: 'infinite', easing: 'steps(1)' }, editable: { content: true } },
      // ── 主视觉：竖排汉字柱 + 刀锋标题
      { id: 'kanji-column', type: 'text', content: '電\n脳\n空\n間', fontFamily: CE_SONG, fontSize: 92, fontWeight: '900', color: { $t: 'colors.accent' }, lineHeight: 1.12, x: 76, y: 170, width: 130, height: 520, zIndex: 2, animation: { name: 'fadeInDown', duration: 800 }, editable: { content: true, fontSize: { type: 'range', min: 60, max: 110 }, position: true } },
      { id: 'title-blade', type: 'text', content: 'STREET\nBLADE', fontFamily: { $t: 'fonts.heading' }, fontSize: 112, fontWeight: '900', color: { $t: 'colors.paper' }, lineHeight: 0.98, letterSpacing: 1, x: 240, y: 200, width: 500, height: 300, zIndex: 3, animation: { name: 'zoomIn', duration: 650 }, editable: { content: true, fontSize: { type: 'range', min: 80, max: 124 }, position: true } },
      { id: 'red-strike', type: 'shape', shapeKind: 'rect', x: 240, y: 356, width: 620, height: 26, fill: { $t: 'colors.primary' }, zIndex: 4, animation: { name: 'slideInLeft', duration: 600, delay: 500 } },
      { id: 'strike-text', type: 'text', content: '赛 博 街 头 · 无 人 机 巡 逻 中', fontFamily: CE_MONO, fontSize: 22, fontWeight: '700', color: { $t: 'colors.bg' }, letterSpacing: 6, x: 252, y: 358, width: 600, height: 24, zIndex: 5, editable: { content: true } },
      { id: 'desc-block', type: 'text', content: 'SECTOR 9 // NIGHT MARKET OPEN 24H\n义体保修三千米内有效 · 现钞概不退换', fontFamily: CE_MONO, fontSize: 22, color: { $t: 'colors.paper' }, opacity: 0.85, lineHeight: 1.7, x: 240, y: 540, width: 660, height: 90, zIndex: 3, animation: { name: 'rise', duration: 700, delay: 600 }, editable: { content: true } },
      { id: 'addr-line', type: 'text', content: '電脳街 NO.9-27 ／ 三更半夜营业中', fontFamily: CE_SONG, fontSize: 20, color: { $t: 'colors.accent' }, letterSpacing: 2, x: 240, y: 646, width: 500, height: 26, zIndex: 3, animation: { name: 'fadeIn', duration: 700, delay: 900 }, editable: { content: true } },
      { id: 'caution-line', type: 'text', content: '立入禁止 · 高圧線下有 ⚡', fontFamily: CE_MONO, fontSize: 17, fontWeight: '700', color: { $t: 'colors.primary' }, letterSpacing: 4, x: 240, y: 680, width: 420, height: 24, zIndex: 3, animation: { name: 'blink', duration: 2100, iterationCount: 'infinite', easing: 'steps(1)' }, editable: { content: true } },
      { id: 'sticker', type: 'shape', shapeKind: 'rect', x: 760, y: 600, width: 150, height: 150, fill: { $t: 'colors.primary' }, rotation: -8, zIndex: 4, animation: { name: 'swing', duration: 4200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'sticker-text', type: 'text', content: 'NEO\nKTOWN', fontFamily: { $t: 'fonts.heading' }, fontSize: 30, fontWeight: '900', color: { $t: 'colors.paper' }, rotation: -8, textAlign: 'center', lineHeight: 1.1, x: 769, y: 638, width: 132, height: 80, zIndex: 5, editable: { content: true } },
      { id: 'barcode', type: 'image', src: BARCODE_SVG, x: 240, y: 720, width: 240, height: 70, objectFit: 'contain', zIndex: 3, animation: { name: 'fadeIn', duration: 600, delay: 900 } },
      // ── 刀光：三道不同粗细的斜切亮带，直接划过胶带
      ...([[60, 884, 940, 824, 9, 'colors.primary', 0.9], [60, 896, 940, 836, 2.5, 'colors.paper', 0.75], [60, 904, 940, 844, 1.5, 'colors.accent', 0.6]] as any[]).map((s: any, i: number) =>
        ceLine(`blade-${i}`, s[0], s[1], s[2], s[3], s[4], s[5], s[6], 6, i === 0 ? { shadow: { offsetX: 0, offsetY: 0, blur: 18, color: 'rgba(255,0,85,0.65)' } } : {})
      ) as any,
      // ── 湿反射：灯箱在积水里的竖条倒影
      { id: 'wet-refl-0', group: 'wet-refl-', type: 'shape', shapeKind: 'rect', x: 848, y: 922, width: 96, height: 46, fill: { $t: 'colors.accent' }, opacity: 0.13, zIndex: 2, animation: { name: 'shimmer', duration: 4200, iterationCount: 'infinite' } },
      { id: 'wet-refl-1', group: 'wet-refl-', type: 'shape', shapeKind: 'rect', x: 744, y: 922, width: 84, height: 34, fill: { $t: 'colors.primary' }, opacity: 0.14, zIndex: 2, animation: { name: 'shimmer', duration: 3300, delay: 500, iterationCount: 'infinite' } },
      { id: 'wet-refl-2', group: 'wet-refl-', type: 'shape', shapeKind: 'rect', x: 60, y: 922, width: 100, height: 40, fill: { $t: 'colors.accent' }, opacity: 0.1, zIndex: 2 },
      // ── 雾气渐层条：两层慢速横漂
      { id: 'mist-0', type: 'overlay', background: 'linear-gradient(180deg, rgba(245,245,245,0) 0%, rgba(245,245,245,0.09) 50%, rgba(245,245,245,0) 100%)', x: -20, y: 552, width: 1040, height: 156, opacity: 0.9, zIndex: 5, animation: { name: 'drift', duration: 13000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'mist-1', type: 'overlay', background: 'linear-gradient(180deg, rgba(245,245,245,0) 0%, rgba(245,245,245,0.07) 50%, rgba(245,245,245,0) 100%)', x: -20, y: 748, width: 1040, height: 130, opacity: 0.85, zIndex: 5, animation: { name: 'drift', duration: 17000, delay: 900, iterationCount: 'infinite', easing: 'ease-in-out' } },
      // ── 警示胶带压顶
      { id: 'tape-top', type: 'image', src: TAPE_SVG, x: -40, y: 66, width: 1080, height: 64, objectFit: 'fill', zIndex: 7, animation: { name: 'slideInLeft', duration: 700 } },
      { id: 'tape-bottom', type: 'image', src: TAPE_SVG, x: -40, y: 852, width: 1080, height: 64, objectFit: 'fill', zIndex: 7, animation: { name: 'slideInRight', duration: 700, delay: 150 } }
    ]
  },
  {
    id: 'cyberpunk-cyborg-spec', name: '义体改造规格单', version: '1.0.0', category: 'cyberpunk',
    tags: ['cyberpunk', 'cyborg', 'spec-sheet', 'mono', 'hardware'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%230c1116"/><g stroke="%2394a3b8" stroke-width="0.4" opacity="0.16"><path d="M10 0 L10 100 M30 0 L30 100 M50 0 L50 100 M70 0 L70 100 M90 0 L90 100 M0 20 L100 20 M0 40 L100 40 M0 60 L100 60 M0 80 L100 80"/></g><rect x="7" y="7" width="86" height="86" fill="none" stroke="%23e2e8f0" stroke-width="0.7" opacity="0.5"/><rect x="85" y="10" width="4.5" height="4.5" fill="none" stroke="%23fb923c" stroke-width="0.9" transform="rotate(45 87.2 12.2)"/><rect x="9" y="88" width="4" height="4" fill="%23fb923c" transform="rotate(45 11 90)"/><g fill="none" stroke="%2322d3ee" stroke-width="1.4"><circle cx="62" cy="34" r="9"/><circle cx="62" cy="34" r="3.4"/><path d="M62 43 L62 58"/><rect x="53" y="58" width="18" height="15" rx="2"/><path d="M53 63 L46 63 M71 63 L78 63 M46 63 L46 74 M78 63 L78 74"/></g><circle cx="62" cy="34" r="14.5" fill="none" stroke="%2322d3ee" stroke-width="0.6" stroke-dasharray="3 2" opacity="0.6"/><g stroke="%2322d3ee" stroke-width="0.5" opacity="0.55"><path d="M45 34 L79 34 M62 17 L62 51"/></g><g stroke="%2322d3ee" stroke-width="0.4" opacity="0.75" fill="none"><path d="M20 74 L26 60 M40 74 L44 52 M56 74 L50 44"/></g><g font-family="Courier New, monospace" font-size="3.2" fill="%23e2e8f0"><text x="12" y="79">12.4kN</text><text x="34" y="79">±140°</text><text x="54" y="79">0.003mm</text></g><g font-family="Inter, sans-serif" font-size="4.6" font-weight="900" fill="%23e2e8f0"><text x="12" y="18">MANTIS</text><text x="12" y="24">EDGE X-9</text></g><g font-family="Courier New, monospace" font-size="3" fill="%2322d3ee"><text x="12" y="30">螳螂义体 · 规格</text></g><g font-family="Courier New, monospace" font-size="2.8" fill="%2394a3b8"><text x="12" y="38">扭矩 12.4</text><text x="12" y="44">延迟 3ms</text><text x="12" y="50">协议 KX-5.2</text></g><g><text x="50" y="86" font-family="Courier New, monospace" font-size="3" fill="%2394a3b8">同步率</text><text x="88" y="86" font-family="Courier New, monospace" font-size="3" fill="%2322d3ee" text-anchor="end">92%</text><rect x="50" y="88" width="38" height="2.4" fill="%23e2e8f0" opacity="0.2"/><rect x="50" y="88" width="35" height="2.4" fill="%2322d3ee"/><text x="50" y="95" font-family="Courier New, monospace" font-size="3" fill="%2394a3b8">刃口温度</text><text x="88" y="95" font-family="Courier New, monospace" font-size="3" fill="%23fb923c" text-anchor="end">41%</text><rect x="50" y="96.6" width="38" height="2.4" fill="%23e2e8f0" opacity="0.2"/><rect x="50" y="96.6" width="16" height="2.4" fill="%23fb923c"/></g></svg>',
    tokens: {
      colors: {
        bg: { label: '车间灰', default: '#0C1116', options: ['#0C1116', '#111827', '#0F172A', '#18181B'] },
        primary: { label: '钛白', default: '#E2E8F0', options: ['#E2E8F0', '#F8FAFC', '#FAFAFA', '#D6D3D1'] },
        accent: { label: '义体青', default: '#22D3EE', options: ['#22D3EE', '#06B6D4', '#A3E635', '#FB7185'] },
        warn: { label: '警示橙', default: '#FB923C', options: ['#FB923C', '#F59E0B', '#EF4444', '#F43F5E'] }
      },
      fonts: { heading: { label: '标题', default: 'Inter, Helvetica, Arial, sans-serif', options: ['Inter, Helvetica, Arial, sans-serif', 'Helvetica, Arial, sans-serif'] } }
    },
    presets: [
      { name: '钛青车间', colors: { bg: '#0C1116', primary: '#E2E8F0', accent: '#22D3EE', warn: '#FB923C' } },
      { name: '军用铬绿', colors: { bg: '#111827', primary: '#F8FAFC', accent: '#A3E635', warn: '#F59E0B' } },
      { name: 'Pink Chrome', colors: { bg: '#18181B', primary: '#FAFAFA', accent: '#FB7185', warn: '#EF4444' } },
      { name: '岩灰玫红', colors: { bg: '#0F172A', primary: '#D6D3D1', accent: '#06B6D4', warn: '#F43F5E' } }
    ],
    canvas: {
      virtualWidth: 1000, virtualHeight: 1000, defaultWidth: 1000, defaultHeight: 1000, backgroundColor: { $t: 'colors.bg' },
      backgroundImage: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000"><defs><pattern id="dotg" width="40" height="40" patternUnits="userSpaceOnUse"><circle cx="20" cy="20" r="1" fill="%2394a3b8" opacity="0.22"/></pattern></defs><rect width="1000" height="1000" fill="url(%23dotg)"/><circle cx="640" cy="420" r="280" fill="none" stroke="%2322d3ee" stroke-width="1" opacity="0.12"/><circle cx="640" cy="420" r="200" fill="none" stroke="%2322d3ee" stroke-width="1" opacity="0.09"/></svg>'
    },
    elements: [
      // ── 车间网格底（氛围层，中性灰不参与换色）
      { id: 'shop-grid', type: 'overlay', background: 'repeating-linear-gradient(90deg, rgba(148,163,184,0.07) 0px, rgba(148,163,184,0.07) 1px, rgba(148,163,184,0) 1px, rgba(148,163,184,0) 44px), repeating-linear-gradient(0deg, rgba(148,163,184,0.07) 0px, rgba(148,163,184,0.07) 1px, rgba(148,163,184,0) 1px, rgba(148,163,184,0) 44px)', x: 0, y: 0, width: 1000, height: 1000, opacity: 0.9, zIndex: 1 },
      { id: 'frame', type: 'shape', shapeKind: 'rect', x: 56, y: 56, width: 888, height: 888, border: { color: { $t: 'colors.primary' }, width: 1.5, style: 'solid' }, opacity: 0.5, zIndex: 4 },
      // ── 警示角标：两枚 45° 菱形，压在图框对角
      { id: 'warn-mark-0', type: 'shape', shapeKind: 'rect', x: 880, y: 78, width: 22, height: 22, rotation: 45, border: { width: 2, color: { $t: 'colors.warn' } }, zIndex: 5, animation: { name: 'pulse', duration: 2100, iterationCount: 'infinite' } },
      { id: 'warn-mark-1', type: 'shape', shapeKind: 'rect', x: 66, y: 900, width: 15, height: 15, rotation: 45, fill: { $t: 'colors.warn' }, opacity: 0.9, zIndex: 5 },
      // ── 被改造的那条胳膊
      { id: 'arm-wire', type: 'image', src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><g fill="none" stroke="%2322d3ee" stroke-width="2.5"><circle cx="200" cy="120" r="58"/><circle cx="200" cy="120" r="26"/><path d="M200 178 L200 268"/><rect x="156" y="268" width="88" height="72" rx="10"/><path d="M156 292 L112 292 M244 292 L288 292 M112 292 L112 340 M288 292 L288 340"/><path d="M176 340 L176 372 M200 340 L200 378 M224 340 L224 372"/></g><g fill="%2322d3ee"><circle cx="200" cy="120" r="8"/><circle cx="200" cy="268" r="6"/><circle cx="112" cy="292" r="5"/><circle cx="288" cy="292" r="5"/></g></svg>', x: 520, y: 180, width: 400, height: 400, objectFit: 'contain', zIndex: 2, animation: { name: 'fadeIn', duration: 900 }, editable: { position: true, size: { type: 'scale' } } },
      // ── 头部标定环：十字 + 虚线环，围着肩关节读数
      ...([[606, 300, 834, 300], [720, 186, 720, 414]] as number[][]).map((s, i) =>
        ceLine(`reticle-ax-${i}`, s[0], s[1], s[2], s[3], 1.5, 'colors.accent', 0.42, 3)
      ) as any,
      { id: 'reticle-ring', type: 'shape', shapeKind: 'circle', x: 640, y: 220, width: 160, height: 160, border: { width: 1.5, style: 'dashed', color: { $t: 'colors.accent' } }, opacity: 0.5, zIndex: 3, animation: { name: 'spinSlow', duration: 26000, iterationCount: 'infinite', easing: 'linear' } },
      // ── 部位引出线：三根细引线各带一段两行读数
      ...([[[598, 594, 664, 462], '腕作动筒', '12.4 kN·m'], [[736, 594, 720, 456], '肘回转', '±140°／0.8s'], [[876, 594, 778, 392], '单分子刃', '0.003 mm']] as [number[], string, string][]).map((c, i) =>
        ceLine(`lead-${i}`, c[0][0], c[0][1], c[0][2], c[0][3], 1.5, 'colors.accent', 0.7, 5, { animation: { name: 'fadeIn', duration: 600, delay: 700 + i * 160 } })
      ) as any,
      ...([['腕作动筒\n12.4 kN·m', 536], ['肘回转\n±140°／0.8s', 676], ['单分子刃\n0.003 mm', 812]] as [string, number][]).map((c, i) => (
        { id: `lead-txt-${i}`, type: 'text', content: c[0], fontFamily: CE_MONO, fontSize: 16, color: { $t: 'colors.primary' }, opacity: 0.85, lineHeight: 1.4, x: c[1], y: 600, width: 136, height: 46, zIndex: 5, animation: { name: 'fadeInUp', duration: 600, delay: 780 + i * 160 }, editable: { content: true } }
      )) as any,
      // ── 参数条列表：标签 + 百分比 + 槽 + 进度
      ...([['神经同步率', 92, '92%', 'colors.accent'], ['刃口过热余量', 41, '41%', 'colors.warn']] as [string, number, string, string][]).map((r, i) => {
        const y = 664 + i * 58
        return [
          { id: `bar-lab-${i}`, type: 'text', content: r[0], fontFamily: CE_MONO, fontSize: 17, color: { $t: 'colors.primary' }, opacity: 0.7, letterSpacing: 2, x: 536, y, width: 260, height: 22, zIndex: 5, editable: { content: true } },
          { id: `bar-pct-${i}`, type: 'text', content: r[2], fontFamily: CE_MONO, fontSize: 19, fontWeight: '700', color: { $t: r[3] }, textAlign: 'right', x: 840, y: y - 2, width: 90, height: 24, zIndex: 5, editable: { content: true } },
          { id: `bar-trk-${i}`, type: 'shape', shapeKind: 'rect', x: 536, y: y + 28, width: 394, height: 7, fill: { $t: 'colors.primary' }, opacity: 0.16, borderRadius: 3, zIndex: 4 },
          { id: `bar-fil-${i}`, type: 'shape', shapeKind: 'rect', x: 536, y: y + 28, width: 394 * r[1] / 100, height: 7, fill: { $t: r[3] }, borderRadius: 3, zIndex: 5, animation: { name: 'slideInLeft', duration: 900, delay: 500 + i * 200 } }
        ]
      }).flat() as any,
      // ── 单据正文
      { id: 'doc-no', type: 'text', content: 'DOC #AR-77-2077 / CLASSIFIED-B / LOT 07', fontFamily: CE_MONO, fontSize: 16, color: { $t: 'colors.primary' }, opacity: 0.55, letterSpacing: 2, x: 96, y: 92, width: 560, height: 26, zIndex: 5, editable: { content: true } },
      { id: 'geo-stamp', type: 'text', content: '装机坐标 35.41°N 139.69°E · 夜之域', fontFamily: CE_MONO, fontSize: 15, color: { $t: 'colors.accent' }, opacity: 0.6, letterSpacing: 1, x: 96, y: 744, width: 400, height: 22, zIndex: 3, editable: { content: true } },
      { id: 'title-model', type: 'text', content: 'MANTIS\nEDGE X-9', fontFamily: { $t: 'fonts.heading' }, fontSize: 88, fontWeight: '900', color: { $t: 'colors.primary' }, lineHeight: 1.04, letterSpacing: 0, x: 96, y: 170, width: 460, height: 220, zIndex: 3, animation: { name: 'slideInLeft', duration: 700 }, editable: { content: true, fontSize: { type: 'range', min: 60, max: 104 }, position: true } },
      { id: 'title-cn', type: 'text', content: '螳 螂 义 体 · 改 造 规 格', fontFamily: CE_MONO, fontSize: 24, color: { $t: 'colors.accent' }, letterSpacing: 6, x: 96, y: 408, width: 440, height: 36, zIndex: 3, animation: { name: 'fadeInUp', duration: 700, delay: 400 }, editable: { content: true } },
      { id: 'spec-rows', type: 'text', content: '输出扭矩 ....... 12.4 kN·m\n刃面涂层 ....... 单分子碳晶\n响应延迟 ....... 3 ms\n接口协议 ....... KX-BUS 5.2\n保修条款 ....... 概不保修', fontFamily: CE_MONO, fontSize: 20, color: { $t: 'colors.primary' }, lineHeight: 2, x: 96, y: 480, width: 440, height: 250, zIndex: 3, animation: { name: 'rise', duration: 800, delay: 600 }, editable: { content: true } },
      { id: 'warn-chip', type: 'shape', shapeKind: 'rect', x: 96, y: 812, width: 300, height: 44, fill: { $t: 'colors.warn' }, opacity: 0.9, zIndex: 5, animation: { name: 'zoomIn', duration: 500, delay: 1000 } },
      { id: 'warn-text', type: 'text', content: '⚠ 非专业改装致命', fontFamily: CE_MONO, fontSize: 20, fontWeight: '700', color: { $t: 'colors.bg' }, x: 112, y: 820, width: 272, height: 28, zIndex: 6, editable: { content: true } },
      { id: 'barcode', type: 'image', src: BARCODE_SVG, x: 700, y: 790, width: 210, height: 62, objectFit: 'contain', zIndex: 5 }
    ]
  },
  {
    id: 'cyberpunk-rain-neon', name: '雨夜霓虹招牌', version: '1.0.0', category: 'cyberpunk',
    tags: ['cyberpunk', 'rain', 'neon-sign', 'city', 'noir'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><defs><pattern id="rn-wl" width="7" height="8.6" patternUnits="userSpaceOnUse"><path d="M0 0 H7 M0 0 V8.6" stroke="%2394a3b8" stroke-width="0.5" fill="none"/></pattern><linearGradient id="rn-gs" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="%23ffffff" stop-opacity="0"/><stop offset="50%" stop-color="%23ffffff" stop-opacity="0.09"/><stop offset="100%" stop-color="%23ffffff" stop-opacity="0"/></linearGradient></defs><rect width="100" height="100" fill="%23080b14"/><circle cx="50" cy="42" r="26" fill="%23ff2f87" opacity="0.05"/><rect x="2" y="12" width="15" height="27" fill="url(%23rn-wl)" opacity="0.45"/><rect x="4" y="17" width="3" height="3" fill="%2300f0ff" opacity="0.75"/><rect x="11.5" y="33" width="3" height="3" fill="%23ff2f87" opacity="0.7"/><g stroke="%237dd3fc" stroke-width="0.9" fill="none"><path d="M17 1 L15 9" opacity="0.22"/><path d="M40 8 L38 18" opacity="0.3"/><path d="M64 0 L62 8" opacity="0.2"/><path d="M78 6 L76 16" opacity="0.26"/><path d="M30 60 L28 69" opacity="0.2"/><path d="M95 56 L93 64" opacity="0.16"/><path d="M50 26 L48 34" opacity="0.18"/><path d="M86 74 L84 82" opacity="0.14"/></g><rect x="0" y="69" width="100" height="21" fill="url(%23rn-gs)"/><rect x="20" y="17" width="60" height="20" rx="2.5" fill="none" stroke="%23ff2f87" stroke-width="1.6"/><rect x="22" y="19" width="56" height="16" rx="1.6" fill="none" stroke="%23ff2f87" stroke-width="0.45" opacity="0.65"/><text x="50" y="30" font-family="Songti SC, serif" font-size="9" fill="%23ff2f87" text-anchor="middle">夜雨</text><text x="50" y="35" font-family="Courier New, monospace" font-size="2.2" fill="%23ff2f87" text-anchor="middle" letter-spacing="0.8" opacity="0.85">OPEN ALL NIGHT</text><rect x="13" y="44" width="34" height="12" rx="1.8" fill="none" stroke="%2300f0ff" stroke-width="1.1"/><text x="30" y="53" font-family="Songti SC, serif" font-size="7" fill="%2300f0ff" text-anchor="middle">酒屋</text><circle cx="64" cy="50" r="8" fill="none" stroke="%2300f0ff" stroke-width="0.8" stroke-dasharray="2 1.4"/><text x="64" y="52.5" font-family="Impact, sans-serif" font-size="6" fill="%2300f0ff" text-anchor="middle">24H</text><text x="75" y="50" font-family="Courier New, monospace" font-size="3" fill="%2394a3b8">SALE 30%</text><rect x="82" y="12" width="13" height="21" rx="1.2" fill="none" stroke="%2300f0ff" stroke-width="1"/><rect x="83.5" y="13.5" width="10" height="18" fill="none" stroke="%2300f0ff" stroke-width="0.35" opacity="0.75"/><text x="88.5" y="20" font-family="Songti SC, serif" font-size="4.4" fill="%2300f0ff" text-anchor="middle">雨</text><text x="88.5" y="25" font-family="Songti SC, serif" font-size="4.4" fill="%2300f0ff" text-anchor="middle">宿</text><text x="88.5" y="30" font-family="Songti SC, serif" font-size="4.4" fill="%2300f0ff" text-anchor="middle">り</text><rect x="51" y="37" width="0.9" height="32" fill="%23ff2f87" opacity="0.35"/><rect x="25" y="57" width="0.7" height="12" fill="%2300f0ff" opacity="0.3"/><rect x="12" y="70" width="76" height="0.6" fill="%2394a3b8" opacity="0.3"/><ellipse cx="27" cy="80" rx="12" ry="1.7" fill="%23ff2f87" opacity="0.2"/><ellipse cx="55" cy="83" rx="13" ry="2" fill="%2300f0ff" opacity="0.18"/><ellipse cx="80" cy="79" rx="9" ry="1.4" fill="%2394a3b8" opacity="0.16"/><text x="50" y="76" font-family="Songti SC, serif" font-size="3.6" fill="%2394a3b8" text-anchor="middle" opacity="0.75">雨 从 霓 虹 上 流 下 来</text><text x="96" y="88" font-family="Songti SC, serif" font-size="3" fill="%2394a3b8" text-anchor="end" opacity="0.6">02:14 雨宿り無料</text><text x="50" y="93" font-family="Courier New, monospace" font-size="2.4" fill="%2394a3b8" text-anchor="middle" opacity="0.5">RAIN DIST. 9021 // N-C-0447</text></svg>',
    tokens: {
      colors: {
        bg: { label: '雨夜', default: '#080B14', options: ['#080B14', '#0B001A', '#030712', '#0A0F1E'] },
        primary: { label: '招牌粉', default: '#FF2F87', options: ['#FF2F87', '#FF007F', '#F472B6', '#A855F7', '#BEF264'] },
        accent: { label: '霓虹青', default: '#00F0FF', options: ['#00F0FF', '#22D3EE', '#7DD3FC', '#BEF264'] },
        mist: { label: '雨雾', default: '#94A3B8', options: ['#94A3B8', '#64748B', '#A5B4FC', '#CBD5E1'] }
      },
      fonts: { heading: { label: '标题', default: 'Songti SC, STSong, SimSun, serif', options: ['Songti SC, STSong, SimSun, serif', 'STKaiti, KaiTi, serif', 'Helvetica, Arial, sans-serif'] } }
    },
    presets: [
      { name: '粉霓虹夜雨', colors: { bg: '#080B14', primary: '#FF2F87', accent: '#00F0FF', mist: '#94A3B8' } },
      { name: '紫电迷巷', colors: { bg: '#0B001A', primary: '#A855F7', accent: '#22D3EE', mist: '#A5B4FC' } },
      { name: '青苔小楼', colors: { bg: '#030712', primary: '#BEF264', accent: '#7DD3FC', mist: '#CBD5E1' } },
      { name: '湿街灯影', colors: { bg: '#0A0F1E', primary: '#F472B6', accent: '#BEF264', mist: '#64748B' } }
    ],
    canvas: {
      virtualWidth: 1000, virtualHeight: 1000, defaultWidth: 1000, defaultHeight: 1000, backgroundColor: { $t: 'colors.bg' },
      backgroundImage: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000"><g stroke="%237dd3fc" stroke-width="1.4" opacity="0.16"><path d="M60 20 L44 78 M180 60 L164 118 M320 10 L304 68 M470 90 L454 148 M610 30 L594 88 M760 70 L744 128 M900 20 L884 78 M120 220 L104 278 M260 300 L244 358 M420 240 L404 298 M580 330 L564 388 M720 250 L704 308 M880 330 L864 388 M60 460 L44 518 M220 540 L204 598 M400 480 L384 538 M560 560 L544 618 M740 490 L724 548 M920 560 L904 618 M140 700 L124 758 M340 760 L324 818 M520 720 L504 778 M700 780 L684 838 M880 720 L864 778 M240 880 L224 938 M460 900 L444 958 M660 900 L644 958 M840 880 L824 938"/></g><circle cx="500" cy="420" r="340" fill="%23ff2f87" opacity="0.04"/><circle cx="500" cy="420" r="200" fill="%23ff2f87" opacity="0.04"/></svg>'
    },
    elements: [
      { id: 'window-lattice', type: 'overlay', background: ceWindows(38, 46, 0.3, 0.22), x: 16, y: 120, width: 158, height: 276, opacity: 0.75, zIndex: 1 },
      { id: 'win-lit-0', type: 'shape', shapeKind: 'rect', x: 58, y: 170, width: 16, height: 20, fill: { $t: 'colors.accent' }, opacity: 0.5, zIndex: 1, animation: { name: 'twinkle', duration: 3400, iterationCount: 'infinite' } },
      { id: 'win-lit-1', type: 'shape', shapeKind: 'rect', x: 136, y: 356, width: 16, height: 20, fill: { $t: 'colors.primary' }, opacity: 0.45, zIndex: 1, animation: { name: 'twinkle', duration: 4200, delay: 1200, iterationCount: 'infinite' } },
      { id: 'ground-sheen', type: 'overlay', background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.07) 46%, rgba(255,255,255,0) 100%)', x: -40, y: 690, width: 1080, height: 210, opacity: 0.9, zIndex: 1, animation: { name: 'drift', duration: 15000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      // 雨丝：背景图里已有 28 条淡雨，这里补 6 条更长更亮的前景雨（长度 / 粗细 / 透明度都不重复，3 条压在最上层）
      ceLine('rain-0', 170, 20, 148, 108, 2, 'colors.mist', 0.22, 1),
      ceLine('rain-1', 404, 86, 380, 182, 2.5, 'colors.mist', 0.3, 6, { animation: { name: 'drift', duration: 9000, iterationCount: 'infinite', easing: 'ease-in-out' } }),
      ceLine('rain-2', 640, 18, 624, 96, 1.6, 'colors.mist', 0.18, 1),
      ceLine('rain-3', 786, 60, 762, 156, 2, 'colors.mist', 0.26, 6, { animation: { name: 'drift', duration: 11500, delay: 700, iterationCount: 'infinite', easing: 'ease-in-out' } }),
      ceLine('rain-4', 300, 596, 278, 690, 2, 'colors.mist', 0.2, 6),
      ceLine('rain-5', 952, 560, 936, 640, 1.8, 'colors.mist', 0.16, 1),
      { id: 'sign-outer', type: 'shape', shapeKind: 'rect', x: 200, y: 170, width: 600, height: 200, borderRadius: 24, border: { color: { $t: 'colors.primary' }, width: 4, style: 'solid' }, zIndex: 2, shadow: { offsetX: 0, offsetY: 0, blur: 30, color: 'rgba(255,47,135,0.55)' }, animation: { name: 'glow', duration: 2600, iterationCount: 'infinite' } },
      { id: 'sign-title', type: 'text', content: '夜 雨 招 牌 屋', fontFamily: { $t: 'fonts.heading' }, fontSize: 76, fontWeight: '700', color: { $t: 'colors.primary' }, letterSpacing: 8, textAlign: 'center', x: 180, y: 216, width: 640, height: 110, zIndex: 3, shadow: { offsetX: 0, offsetY: 0, blur: 24, color: 'rgba(255,47,135,0.9)' }, animation: { name: 'fadeIn', duration: 900 }, editable: { content: true, fontSize: { type: 'range', min: 48, max: 92 }, position: true } },
      { id: 'sign-sub', type: 'text', content: 'OPEN ALL NIGHT', fontFamily: 'Courier New, monospace', fontSize: 20, color: { $t: 'colors.primary' }, opacity: 0.8, letterSpacing: 8, textAlign: 'center', x: 300, y: 322, width: 400, height: 28, zIndex: 3, editable: { content: true } },
      { id: 'sign-2', type: 'shape', shapeKind: 'rect', x: 130, y: 440, width: 340, height: 120, borderRadius: 14, border: { color: { $t: 'colors.accent' }, width: 2.5, style: 'solid' }, zIndex: 2, shadow: { offsetX: 0, offsetY: 0, blur: 20, color: 'rgba(0,240,255,0.5)' }, animation: { name: 'glow', duration: 1300, iterationCount: 'infinite' } },
      { id: 'sign-2-text', type: 'text', content: '酒 屋', fontFamily: { $t: 'fonts.heading' }, fontSize: 54, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 12, textAlign: 'center', x: 140, y: 468, width: 320, height: 68, zIndex: 3, shadow: { offsetX: 0, offsetY: 0, blur: 18, color: 'rgba(0,240,255,0.9)' }, editable: { content: true } },
      { id: 'sign-3', type: 'shape', shapeKind: 'circle', x: 560, y: 420, width: 160, height: 160, border: { color: { $t: 'colors.accent' }, width: 2, style: 'dashed' }, zIndex: 2, animation: { name: 'spinSlow', duration: 18000, iterationCount: 'infinite', easing: 'linear' } },
      { id: 'sign-3-text', type: 'text', content: '24H', fontFamily: 'Impact, Arial Black, sans-serif', fontSize: 52, fontWeight: '900', color: { $t: 'colors.accent' }, textAlign: 'center', x: 560, y: 468, width: 160, height: 64, zIndex: 3, shadow: { offsetX: 0, offsetY: 0, blur: 16, color: 'rgba(0,240,255,0.9)' }, editable: { content: true } },
      { id: 'flicker-sign', type: 'text', content: 'SALE · 七折', fontFamily: 'Courier New, monospace', fontSize: 26, fontWeight: '700', color: { $t: 'colors.mist' }, letterSpacing: 4, x: 748, y: 486, width: 200, height: 34, zIndex: 3, animation: { name: 'blink', duration: 3100, iterationCount: 'infinite' }, editable: { content: true } },
      // 竖排霓虹灯管：外框 3px + 内框 1.5px 双描边，灯管里三粒假名
      { id: 'tube-sign', type: 'shape', shapeKind: 'rect', x: 826, y: 120, width: 130, height: 210, borderRadius: 12, border: { color: { $t: 'colors.accent' }, width: 3, style: 'solid' }, zIndex: 2, shadow: { offsetX: 0, offsetY: 0, blur: 22, color: 'rgba(0,240,255,0.5)' }, animation: { name: 'glow', duration: 1900, iterationCount: 'infinite' } },
      { id: 'tube-sign-in', type: 'shape', shapeKind: 'rect', x: 836, y: 130, width: 110, height: 190, borderRadius: 8, border: { color: { $t: 'colors.accent' }, width: 1.5, style: 'solid' }, opacity: 0.75, zIndex: 2 },
      { id: 'tube-sign-t', type: 'text', content: '雨\n宿\nり', fontFamily: CE_SONG, fontSize: 34, fontWeight: '700', color: { $t: 'colors.accent' }, lineHeight: 1.2, textAlign: 'center', x: 836, y: 150, width: 110, height: 140, zIndex: 3, shadow: { offsetX: 0, offsetY: 0, blur: 14, color: 'rgba(0,240,255,0.9)' }, editable: { content: true } },
      // 湿街反光：招牌正下拉两道细长条，越靠地面越淡
      { id: 'refl-strip-0', type: 'shape', shapeKind: 'rect', x: 512, y: 374, width: 5, height: 318, fill: { $t: 'colors.primary' }, opacity: 0.2, zIndex: 2, animation: { name: 'pulse', duration: 6800, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'refl-strip-1', type: 'shape', shapeKind: 'rect', x: 250, y: 566, width: 4, height: 130, fill: { $t: 'colors.accent' }, opacity: 0.18, zIndex: 2 },
      { id: 'puddle', type: 'shape', shapeKind: 'rect', x: 120, y: 700, width: 760, height: 3, fill: { $t: 'colors.mist' }, opacity: 0.25, zIndex: 2 },
      // 水洼光斑：扁椭圆（circle 拉扁即椭圆），三块灯色各占一段
      { id: 'puddle-glow-0', group: 'puddle-glow-', type: 'shape', shapeKind: 'circle', x: 150, y: 790, width: 240, height: 34, fill: { $t: 'colors.primary' }, opacity: 0.14, zIndex: 2, animation: { name: 'pulse', duration: 7600, delay: 400, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'puddle-glow-1', group: 'puddle-glow-', type: 'shape', shapeKind: 'circle', x: 420, y: 812, width: 270, height: 40, fill: { $t: 'colors.accent' }, opacity: 0.12, zIndex: 2 },
      { id: 'puddle-glow-2', group: 'puddle-glow-', type: 'shape', shapeKind: 'circle', x: 720, y: 788, width: 180, height: 28, fill: { $t: 'colors.mist' }, opacity: 0.1, zIndex: 2 },
      { id: 'puddle-reflect', type: 'text', content: '雨 从 霓 虹 上 流 下 来', fontFamily: { $t: 'fonts.heading' }, fontSize: 34, color: { $t: 'colors.mist' }, letterSpacing: 10, textAlign: 'center', x: 250, y: 736, width: 500, height: 50, zIndex: 2, animation: { name: 'fadeInUp', duration: 1000, delay: 500 }, editable: { content: true } },
      { id: 'open-late', type: 'text', content: '深夜 02:14 ／ 雨宿り無料', fontFamily: CE_SONG, fontSize: 20, color: { $t: 'colors.mist' }, opacity: 0.55, letterSpacing: 2, textAlign: 'right', x: 640, y: 838, width: 320, height: 28, zIndex: 3, editable: { content: true } },
      { id: 'foot-line', type: 'text', content: 'RAIN DIST. 9021 // SIGN LICENSE N-C-0447', fontFamily: 'Courier New, monospace', fontSize: 15, color: { $t: 'colors.mist' }, opacity: 0.5, letterSpacing: 3, textAlign: 'center', x: 250, y: 880, width: 500, height: 24, zIndex: 2, editable: { content: true } }
    ]
  }
]

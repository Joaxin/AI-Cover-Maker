import type { Template } from '@/types/types'
import { SPARKLE4, CLOUD } from './_decor'

// —— 以下辅助仅服务 acg-anime-title-card：全部用 shape + token 色拼出，换色面板可跟随 ——
// 集中线／速度线：以 (cx,cy) 为心向外放射的细矩形，每条长度与角度略有差异
function focusRays(id: string, cx: number, cy: number, count: number, inner: number, outer: number, thick: number, color: { $t: string }, opacity: number, zIndex: number, startDeg = 0, spanDeg = 360) {
  return Array.from({ length: count }, (_, i) => {
    const deg = spanDeg === 360 ? (360 / count) * i + (i % 2 ? 6 : -4) : startDeg + (spanDeg / (count - 1)) * i + (i % 2 ? 3 : -3)
    const rad = (deg * Math.PI) / 180
    const len = outer - (i % 3) * 70
    const mid = inner + len / 2
    return {
      id: `${id}-${i}`, type: 'shape' as const, shapeKind: 'rect' as const,
      x: Math.round(cx + Math.cos(rad) * mid - len / 2), y: Math.round(cy + Math.sin(rad) * mid - thick / 2),
      width: len, height: thick, rotation: deg, fill: color as any,
      opacity: +(opacity - (i % 3) * 0.02).toFixed(3), borderRadius: thick / 2, zIndex
    }
  })
}
// 星芒：3 条同中心、互差 60° 的穿心笔画 = 六道光芒
function starBars(id: string, cx: number, cy: number, len: number, thick: number, color: { $t: string }, opacity: number, zIndex: number) {
  return [0, 60, 120].map((d, i) => ({
    id: `${id}-${i}`, type: 'shape' as const, shapeKind: 'rect' as const,
    x: Math.round(cx - thick / 2), y: Math.round(cy - len / 2), width: thick, height: len,
    rotation: d, fill: color as any, opacity, borderRadius: thick / 2, zIndex
  }))
}

// 16:9 横版动画标题卡（电影宽屏）
export const acgAnimeTitleCard: Template = {
  id: 'acg-anime-title-card', name: '动画标题卡·横版', version: '1.0.0', category: 'acg', tags: ['acg', 'anime', 'title', 'landscape', '16:9'],
  thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="178" height="100" viewBox="0 0 178 100"><defs><linearGradient id="s" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="%23312e81"/><stop offset="100%" stop-color="%23fb7185"/></linearGradient></defs><rect width="178" height="100" fill="url(%23s)"/><rect width="178" height="28" fill="%23110e34" opacity="0.55"/><rect y="28" width="178" height="26" fill="%237c3aed" opacity="0.3"/><rect y="54" width="178" height="24" fill="%23fb7185" opacity="0.22"/><g stroke="%23ffffff" stroke-width="0.6" opacity="0.16"><path d="M111 62 L178 30 M111 62 L176 55 M111 62 L170 88 M111 62 L128 100 M111 62 L60 96 M111 62 L44 74 M111 62 L62 30 M111 62 L96 8"/></g><circle cx="111" cy="62" r="15" fill="%23fde68a"/><g stroke="%23f472b6" stroke-width="1.4" opacity="0.6"><path d="M111 44 V80 M98 52 L124 72 M98 72 L124 52"/></g><rect x="0" y="78" width="178" height="22" fill="%23111827"/><rect x="4" y="4" width="170" height="92" fill="none" stroke="%23ffffff" stroke-width="1.4" opacity="0.9"/><rect x="7" y="7" width="164" height="86" fill="none" stroke="%23ffffff" stroke-width="0.6" opacity="0.4"/><rect x="14" y="26" width="52" height="6" rx="3" fill="%2308061c" opacity="0.5"/><rect x="14" y="27" width="26" height="4" fill="%23f472b6" opacity="0.8"/><rect x="14" y="36" width="58" height="12" fill="%23ffffff" opacity="0.92"/><rect x="14" y="52" width="34" height="3" fill="%23f472b6"/><rect x="14" y="58" width="46" height="3" fill="%23ffffff" opacity="0.7"/><rect x="14" y="80" width="70" height="2" fill="%23ffffff" opacity="0.45"/><circle cx="150" cy="17" r="10" fill="%2308061c" opacity="0.45" stroke="%23f472b6" stroke-width="1"/><rect x="138" y="46" width="28" height="42" rx="1.5" fill="%2308061c" opacity="0.4" stroke="%23ffffff" stroke-width="0.7" stroke-dasharray="2 2"/><rect x="140" y="82" width="24" height="5" rx="1" fill="%23f472b6"/></svg>',
  tokens: {
    colors: {
      primary: { label: '标题', default: '#FFFFFF', options: ['#FFFFFF', '#F8FAFC', '#FEF9C3', '#E0E7FF'] },
      accent: { label: '强调', default: '#F472B6', options: ['#F472B6', '#38BDF8', '#FDE047', '#A5B4FC'] }
    },
    fonts: { heading: { label: '标题字体', default: 'STKaiti, KaiTi, serif', options: ['STKaiti, KaiTi, serif', 'Songti SC, SimSun, serif', 'system-ui, sans-serif'] } }
  },
  presets: [
    { name: '暮色樱粉', colors: { primary: '#FFFFFF', accent: '#F472B6' } },
    { name: '晴空海蓝', colors: { primary: '#F8FAFC', accent: '#38BDF8' } },
    { name: 'Golden 夕阳', colors: { primary: '#FEF9C3', accent: '#FDE047' } },
    { name: '月华清辉', colors: { primary: '#E0E7FF', accent: '#A5B4FC' } }
  ],
  canvas: {
    virtualWidth: 1920, virtualHeight: 1080, defaultWidth: 1920, defaultHeight: 1080, backgroundColor: '#1E1B4B',
    backgroundImage: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080"><defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="%231e1b4b"/><stop offset="45%" stop-color="%237c3aed"/><stop offset="78%" stop-color="%23fb7185"/><stop offset="100%" stop-color="%23fed7aa"/></linearGradient></defs><rect width="1920" height="1080" fill="url(%23sky)"/><circle cx="1300" cy="720" r="150" fill="%23fff7ed" opacity="0.95"/><g fill="%230f172a"><rect x="0" y="880" width="1920" height="200"/><rect x="120" y="720" width="120" height="180"/><rect x="300" y="760" width="90" height="140"/><rect x="430" y="700" width="140" height="200"/><rect x="1500" y="740" width="110" height="160"/><rect x="1650" y="700" width="150" height="200"/></g></svg>'
  },
  elements: [
    // —— 天空分层：一整幅三段硬停渐变叠在天空之上，做出赛璐璐式的空气感（满幅叠加，不贴边） ——
    { id: 'sky-bands', type: 'overlay', background: 'linear-gradient(180deg, rgba(17,14,52,0.55) 0 27.8%, rgba(124,58,237,0.30) 27.8% 53.7%, rgba(251,113,133,0.22) 53.7% 77.8%, rgba(251,113,133,0) 77.8%)', x: 0, y: 0, width: 1920, height: 1080, zIndex: 0 },
    { id: 'cloud-1', type: 'image', src: CLOUD, objectFit: 'contain', x: 120, y: 180, width: 420, height: 230, opacity: 0.7, zIndex: 1, animation: { name: 'drift', duration: 16000, iterationCount: 'infinite', easing: 'ease-in-out' }, editable: { position: true, size: { type: 'scale' } } },
    { id: 'cloud-2', type: 'image', src: CLOUD, objectFit: 'contain', x: 1380, y: 260, width: 380, height: 210, opacity: 0.55, zIndex: 1, animation: { name: 'drift', duration: 20000, delay: 1000, iterationCount: 'infinite', easing: 'ease-in-out' }, editable: { position: true, size: { type: 'scale' } } },
    // —— 集中线：自落日背后向上方天空放射 ——
    ...focusRays('focus-ray', 1300, 720, 6, 190, 400, 9, { $t: 'colors.primary' }, 0.2, 2, -165, 150),
    // —— 星芒：压在太阳上的六道光芒 ——
    ...starBars('sun-spark', 1300, 720, 430, 7, { $t: 'colors.accent' }, 0.55, 3),
    { id: 'star-a', type: 'image', src: SPARKLE4, objectFit: 'contain', x: 260, y: 120, width: 46, height: 46, zIndex: 2, animation: { name: 'twinkle', duration: 2800, iterationCount: 'infinite' } },
    { id: 'star-b', type: 'image', src: SPARKLE4, objectFit: 'contain', x: 720, y: 90, width: 38, height: 38, zIndex: 2, animation: { name: 'sparkle', duration: 3400, delay: 500, iterationCount: 'infinite' } },
    { id: 'star-c', type: 'image', src: SPARKLE4, objectFit: 'contain', x: 1560, y: 150, width: 40, height: 40, zIndex: 2, animation: { name: 'twinkle', duration: 3000, delay: 900, iterationCount: 'infinite' } },
    // —— 集数信息：胶囊条 + 圆形放送徽章 ——
    { id: 'episode-tag', type: 'shape', shapeKind: 'rect', x: 200, y: 400, width: 470, height: 56, fill: 'rgba(8,6,28,0.42)', border: { color: { $t: 'colors.accent' }, width: 2, style: 'solid' }, borderRadius: 28, zIndex: 4 },
    { id: 'episode-text', type: 'text', content: 'EP.12 · 海边的风铃', fontFamily: 'Helvetica, Arial, sans-serif', fontSize: 24, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 6, textAlign: 'center', x: 200, y: 414, width: 470, height: 32, zIndex: 5, editable: { content: true } },
    { id: 'ep-badge-ring', type: 'shape', shapeKind: 'circle', x: 1580, y: 96, width: 200, height: 200, fill: 'rgba(8,6,28,0.38)', border: { color: { $t: 'colors.accent' }, width: 4, style: 'solid' }, rotation: -8, zIndex: 6, animation: { name: 'pulse', duration: 3200, iterationCount: 'infinite' } },
    { id: 'ep-badge-text', type: 'text', content: '第 12 话', fontFamily: { $t: 'fonts.heading' }, fontSize: 44, fontWeight: '900', color: { $t: 'colors.primary' }, letterSpacing: 2, textAlign: 'center', rotation: -8, x: 1580, y: 168, width: 200, height: 56, zIndex: 7, editable: { content: true } },
    // —— 主标题 + 英文副标 ——
    { id: 'title-main', type: 'text', content: '夏日回响', fontFamily: { $t: 'fonts.heading' }, fontSize: 180, fontWeight: '900', color: { $t: 'colors.primary' }, letterSpacing: 14, x: 200, y: 470, width: 1100, height: 240, zIndex: 5, shadow: { color: 'rgba(124,58,237,0.6)', blur: 30, offsetX: 0, offsetY: 8 }, animation: { name: 'rise', duration: 1100 }, editable: { content: true, fontSize: { type: 'range', min: 120, max: 220 }, position: true } },
    { id: 'title-en', type: 'text', content: 'ECHOES OF SUMMER', fontFamily: 'Georgia, serif', fontSize: 44, fontWeight: '400', color: { $t: 'colors.primary' }, letterSpacing: 10, x: 206, y: 720, width: 1100, height: 60, zIndex: 5, animation: { name: 'fadeIn', duration: 900, delay: 800 }, editable: { content: true } },
    { id: 'title-rule', type: 'shape', shapeKind: 'rect', x: 208, y: 700, width: 260, height: 4, fill: { $t: 'colors.accent' }, opacity: 0.9, zIndex: 5 },
    { id: 'credit-line', type: 'text', content: '制作：海雾动画工作室 ／ 作画监督：三日月 凛 ／ 配給：夏の日劇場', fontFamily: 'Songti SC, SimSun, serif', fontSize: 24, color: { $t: 'colors.primary' }, opacity: 0.62, letterSpacing: 2, x: 202, y: 920, width: 1060, height: 40, zIndex: 6, editable: { content: true } },
    // —— 角色立绘位（右下）：虚线框 + 名牌 ——
    { id: 'char-frame', type: 'shape', shapeKind: 'rect', x: 1448, y: 470, width: 384, height: 538, fill: 'rgba(8,6,28,0.38)', border: { color: { $t: 'colors.primary' }, width: 2, style: 'dashed' }, borderRadius: 10, opacity: 0.9, zIndex: 5 },
    { id: 'char-plate', type: 'shape', shapeKind: 'rect', x: 1472, y: 930, width: 336, height: 50, fill: { $t: 'colors.accent' }, opacity: 0.92, borderRadius: 8, zIndex: 6 },
    { id: 'char-name', type: 'text', content: '夏织 · 15 岁 · 风铃部', fontFamily: { $t: 'fonts.heading' }, fontSize: 26, fontWeight: '700', color: { $t: 'colors.primary' }, letterSpacing: 3, textAlign: 'center', x: 1472, y: 940, width: 336, height: 32, zIndex: 7, editable: { content: true } },
    // —— 赛璐璐描边双框（压在最上层）——
    { id: 'cel-frame-outer', type: 'shape', shapeKind: 'rect', x: 48, y: 48, width: 1824, height: 984, border: { color: { $t: 'colors.primary' }, width: 5, style: 'solid' }, borderRadius: 4, opacity: 0.9, zIndex: 8 },
    { id: 'cel-frame-inner', type: 'shape', shapeKind: 'rect', x: 66, y: 66, width: 1788, height: 948, border: { color: { $t: 'colors.primary' }, width: 2, style: 'solid' }, opacity: 0.42, zIndex: 8 }
  ]
}

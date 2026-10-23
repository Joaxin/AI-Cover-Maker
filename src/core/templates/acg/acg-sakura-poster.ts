import type { Template } from '@/types/types'
import { SAKURA_PETAL, SPARKLE4, CLOUD } from './_decor'

// 9:16 竖版樱花番剧海报
export const acgSakuraPoster: Template = {
  id: 'acg-sakura-poster', name: '樱花季·竖版海报', version: '1.0.0', category: 'acg', tags: ['acg', 'anime', 'sakura', 'portrait', '9:16'],
  thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="178" viewBox="0 0 100 178"><defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="%23bae6fd"/><stop offset="100%" stop-color="%23fbcfe8"/></linearGradient></defs><rect width="100" height="178" fill="url(%23sky)"/><circle cx="50" cy="46" r="20" fill="%23fff7ed" opacity="0.9"/><circle cx="30" cy="90" r="6" fill="%23f9a8d4"/><circle cx="70" cy="120" r="5" fill="%23fbcfe8"/></svg>',
  tokens: {
    colors: {
      sky1: { label: '天空', default: '#BAE6FD', options: ['#BAE6FD', '#C7D2FE', '#A5F3FC', '#FDE68A', '#312E81'] },
      sky2: { label: '地平', default: '#FBCFE8', options: ['#FBCFE8', '#FCE7F3', '#FDF4FF', '#FCA5A5', '#701A75'] },
      primary: { label: '主色', default: '#831843', options: ['#831843', '#9D174D', '#1E3A8A', '#7C2D12', '#F1F5F9'] },
      accent: { label: '强调', default: '#F472B6', options: ['#F472B6', '#FB7185', '#F9A8D4', '#F0ABFC'] }
    },
    fonts: { heading: { label: '标题字体', default: 'STKaiti, KaiTi, serif', options: ['STKaiti, KaiTi, serif', 'Songti SC, SimSun, serif', 'system-ui, sans-serif'] } }
  },
  presets: [
    { name: '春樱', colors: { sky1: '#BAE6FD', sky2: '#FBCFE8', primary: '#831843', accent: '#F472B6' } },
    { name: '夕樱', colors: { sky1: '#FDE68A', sky2: '#FCA5A5', primary: '#7C2D12', accent: '#FB7185' } },
    { name: '夜樱', colors: { sky1: '#312E81', sky2: '#701A75', primary: '#F1F5F9', accent: '#F0ABFC' } },
    { name: '晨雾浅樱', colors: { sky1: '#C7D2FE', sky2: '#FCE7F3', primary: '#1E3A8A', accent: '#F9A8D4' } }
  ],
  canvas: {
    virtualWidth: 1080, virtualHeight: 1920, defaultWidth: 1080, defaultHeight: 1920,
    backgroundColor: '#E0F2FE',
    backgroundImage: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1920"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="%23bae6fd"/><stop offset="55%" stop-color="%23e0f2fe"/><stop offset="100%" stop-color="%23fbcfe8"/></linearGradient></defs><rect width="1080" height="1920" fill="url(%23g)"/><circle cx="760" cy="360" r="150" fill="%23fffbeb" opacity="0.85"/></svg>'
  },
  elements: [
    { id: 'cloud-1', type: 'image', src: CLOUD, objectFit: 'contain', x: 60, y: 240, width: 360, height: 200, opacity: 0.9, zIndex: 1, animation: { name: 'drift', duration: 14000, iterationCount: 'infinite', easing: 'ease-in-out' }, editable: { position: true, size: { type: 'scale' } } },
    { id: 'cloud-2', type: 'image', src: CLOUD, objectFit: 'contain', x: 680, y: 520, width: 300, height: 165, opacity: 0.75, zIndex: 1, animation: { name: 'drift', duration: 18000, delay: 1200, iterationCount: 'infinite', easing: 'ease-in-out' }, editable: { position: true, size: { type: 'scale' } } },
    { id: 'petal-1', group: 'petal-', type: 'image', src: SAKURA_PETAL, objectFit: 'contain', x: 120, y: 720, width: 70, height: 70, zIndex: 2, animation: { name: 'float', duration: 5200, iterationCount: 'infinite', easing: 'ease-in-out' } },
    { id: 'petal-2', group: 'petal-', type: 'image', src: SAKURA_PETAL, objectFit: 'contain', x: 880, y: 840, width: 90, height: 90, rotation: 40, zIndex: 2, animation: { name: 'wobble', duration: 6000, delay: 400, iterationCount: 'infinite' } },
    { id: 'petal-3', group: 'petal-', type: 'image', src: SAKURA_PETAL, objectFit: 'contain', x: 250, y: 1120, width: 56, height: 56, rotation: -30, zIndex: 2, animation: { name: 'float', duration: 6800, delay: 900, iterationCount: 'infinite' } },
    { id: 'petal-4', group: 'petal-', type: 'image', src: SAKURA_PETAL, objectFit: 'contain', x: 960, y: 1240, width: 64, height: 64, rotation: 120, zIndex: 2, animation: { name: 'wobble', duration: 5600, delay: 1400, iterationCount: 'infinite' } },
    { id: 'sparkle-a', type: 'image', src: SPARKLE4, objectFit: 'contain', x: 820, y: 660, width: 54, height: 54, zIndex: 3, animation: { name: 'sparkle', duration: 2600, iterationCount: 'infinite' } },
    { id: 'sparkle-b', type: 'image', src: SPARKLE4, objectFit: 'contain', x: 160, y: 940, width: 40, height: 40, zIndex: 3, animation: { name: 'twinkle', duration: 3200, delay: 600, iterationCount: 'infinite' } },
    { id: 'season-badge', type: 'shape', shapeKind: 'rect', x: 140, y: 360, width: 250, height: 60, fill: 'rgba(244,114,182,0.9)', borderRadius: 30, zIndex: 4 },
    { id: 'season-text', type: 'text', content: 'SPRING 2026', fontFamily: 'Helvetica, Arial, sans-serif', fontSize: 26, fontWeight: '700', color: '#FFFFFF', letterSpacing: 4, textAlign: 'center', x: 140, y: 372, width: 250, height: 40, zIndex: 5, editable: { content: true } },
    { id: 'title-main', type: 'text', content: '秒速五厘米', fontFamily: { $t: 'fonts.heading' }, fontSize: 132, fontWeight: '900', color: { $t: 'colors.primary' }, letterSpacing: 6, x: 120, y: 1180, width: 840, height: 300, zIndex: 6, shadow: { color: 'rgba(255,255,255,0.8)', blur: 18, offsetX: 0, offsetY: 4 }, animation: { name: 'rise', duration: 1000 }, editable: { content: true, fontSize: { type: 'range', min: 90, max: 160 }, position: true } },
    { id: 'title-sub', type: 'text', content: '五センチ_per_second', fontFamily: 'Georgia, serif', fontSize: 34, fontWeight: '400', color: { $t: 'colors.accent' }, letterSpacing: 3, x: 124, y: 1500, width: 840, height: 50, zIndex: 6, animation: { name: 'fadeIn', duration: 900, delay: 700 }, editable: { content: true } },
    { id: 'tagline', type: 'text', content: '—— 樱花飘落的速度，是我思念你的速度 ——', fontFamily: { $t: 'fonts.heading' }, fontSize: 30, fontWeight: '500', color: { $t: 'colors.primary' }, opacity: 0.85, textAlign: 'center', x: 120, y: 1620, width: 840, height: 50, zIndex: 6, animation: { name: 'fadeInUp', duration: 900, delay: 1000 }, editable: { content: true } }
  ]
}

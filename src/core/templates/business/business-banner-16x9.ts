import type { Template } from '@/types/types'

// 16:9 横版商务 Banner（照片用 Lorem Picsum 稳定外链）
export const businessBanner16x9: Template = {
  id: 'business-banner-16x9', name: '商务横版 Banner', version: '1.0.0', category: 'business', tags: ['business', 'banner', 'landscape', 'photo', '16:9'],
  thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="178" height="100" viewBox="0 0 178 100"><rect width="178" height="100" fill="%230f172a"/><rect x="16" y="34" width="60" height="6" fill="%23ffffff"/><rect x="16" y="48" width="90" height="4" fill="%2338bdf8"/></svg>',
  tokens: {
    colors: {
      scrim: { label: '遮罩', default: '#0F172A', options: ['#0F172A', '#111827', '#1E293B', '#0B1F1A', '#1A1204', '#1E1B4B'] },
      accent: { label: '强调', default: '#38BDF8', options: ['#38BDF8', '#22D3EE', '#818CF8', '#10B981', '#F59E0B'] },
      text: { label: '文字', default: '#FFFFFF', options: ['#FFFFFF', '#F8FAFC'] }
    },
    fonts: { heading: { label: '标题', default: 'Helvetica, Arial, sans-serif', options: ['Helvetica, Arial, sans-serif', 'Inter, sans-serif', 'system-ui, sans-serif'] } }
  },
  presets: [
    { name: '深海科技蓝', colors: { scrim: '#0F172A', accent: '#38BDF8', text: '#FFFFFF' } },
    { name: '午夜翡翠', colors: { scrim: '#0B1F1A', accent: '#10B981', text: '#FFFFFF' } },
    { name: '曜石琥珀', colors: { scrim: '#1A1204', accent: '#F59E0B', text: '#FFFFFF' } },
    { name: '绛紫商务', colors: { scrim: '#1E1B4B', accent: '#818CF8', text: '#F8FAFC' } }
  ],
  canvas: { virtualWidth: 1920, virtualHeight: 1080, defaultWidth: 1920, defaultHeight: 1080, backgroundColor: { $t: 'colors.scrim' } },
  elements: [
    { id: 'photo', type: 'image', src: '/images/photo/business-team-1920x1080.jpg', objectFit: 'cover', x: 900, y: 0, width: 1020, height: 1080, zIndex: 1, editable: { src: { type: 'upload' }, position: true } },
    { id: 'photo-fade', type: 'overlay', background: 'linear-gradient(to right, #0F172A 0%, rgba(15,23,42,0.6) 12%, rgba(15,23,42,0) 32%)', x: 0, y: 0, width: 1920, height: 1080, zIndex: 2 },
    { id: 'left-panel', type: 'shape', shapeKind: 'rect', x: 0, y: 0, width: 960, height: 1080, fill: { $t: 'colors.scrim' }, zIndex: 1 },
    { id: 'accent-bar', type: 'shape', shapeKind: 'rect', x: 120, y: 300, width: 10, height: 340, fill: { $t: 'colors.accent' }, borderRadius: 5, zIndex: 4, animation: { name: 'fadeInDown', duration: 700 } },
    { id: 'eyebrow', type: 'text', content: 'GLOBAL SUMMIT · 2026', fontFamily: { $t: 'fonts.heading' }, fontSize: 26, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 6, x: 160, y: 320, width: 700, height: 40, zIndex: 4, animation: { name: 'fadeIn', duration: 700 }, editable: { content: true } },
    { id: 'title', type: 'text', content: '构建下一代\n增长引擎', fontFamily: { $t: 'fonts.heading' }, fontSize: 92, fontWeight: '900', color: { $t: 'colors.text' }, lineHeight: 1.2, x: 160, y: 390, width: 740, height: 260, zIndex: 4, animation: { name: 'slideInLeft', duration: 800 }, editable: { content: true, fontSize: { type: 'range', min: 60, max: 120 }, position: true } },
    { id: 'desc', type: 'text', content: '连接产业与资本，共创可持续的商业未来。', fontFamily: { $t: 'fonts.heading' }, fontSize: 32, fontWeight: '400', color: 'rgba(248,250,252,0.8)', lineHeight: 1.5, x: 160, y: 690, width: 720, height: 70, zIndex: 4, animation: { name: 'fadeInUp', duration: 800, delay: 300 }, editable: { content: true } },
    { id: 'cta-pill', type: 'shape', shapeKind: 'rect', x: 160, y: 800, width: 320, height: 84, fill: { $t: 'colors.accent' }, borderRadius: 42, zIndex: 4, animation: { name: 'zoomIn', duration: 600, delay: 600 } },
    { id: 'cta-text', type: 'text', content: '立即报名 →', fontFamily: { $t: 'fonts.heading' }, fontSize: 32, fontWeight: '800', color: { $t: 'colors.scrim' }, textAlign: 'center', x: 160, y: 820, width: 320, height: 46, zIndex: 5, editable: { content: true } }
  ]
}

import type { Template } from '@/types/types'

// 4:5 竖版杂志封面（照片用 Lorem Picsum 稳定外链）
export const magazineCover4x5: Template = {
  id: 'magazine-cover-4x5', name: '旅人杂志封面', version: '1.0.0', category: 'magazine', tags: ['magazine', 'cover', 'travel', 'photo', '4:5'],
  thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="125" viewBox="0 0 100 125"><rect width="100" height="125" fill="%23111827"/><rect x="20" y="12" width="60" height="7" fill="%23ffffff"/><rect x="66" y="23" width="14" height="2" fill="%23F59E0B"/><rect x="22" y="22" width="40" height="2" fill="%23ffffff" opacity="0.5"/><circle cx="14" cy="42" r="8" fill="none" stroke="%23F59E0B" stroke-width="1.6"/><rect x="78" y="58" width="14" height="2" fill="%23ffffff"/><rect x="70" y="66" width="22" height="2" fill="%23ffffff" opacity="0.75"/><rect x="74" y="74" width="18" height="2" fill="%23ffffff" opacity="0.55"/><rect x="6" y="78" width="34" height="7" fill="%23ffffff" transform="rotate(-3 23 81)"/><rect x="8" y="94" width="46" height="6" fill="%23ffffff"/><rect x="8" y="104" width="36" height="3" fill="%23ffffff" opacity="0.6"/><rect x="8" y="115" width="2" height="6" fill="%23ffffff"/><rect x="12" y="115" width="4" height="6" fill="%23ffffff"/><rect x="18" y="115" width="1.4" height="6" fill="%23ffffff"/><rect x="22" y="115" width="3" height="6" fill="%23ffffff"/></svg>',
  tokens: {
    colors: {
      masthead: { label: '刊头', default: '#FFFFFF', options: ['#FFFFFF', '#FEF3C7', '#ECFCCB'] },
      accent: { label: '强调', default: '#F59E0B', options: ['#F59E0B', '#EF4444', '#10B981', '#FB7185', '#34D399', '#E11D48'] },
      ink: { label: '贴纸条墨色', default: '#111827', options: ['#111827', '#1C1917', '#0F172A', '#78350F'] }
    },
    fonts: { heading: { label: '刊名', default: 'Didot, Georgia, serif', options: ['Didot, Georgia, serif', 'Songti SC, SimSun, serif', 'Playfair Display, serif'] } }
  },
  presets: [
    { name: '琥珀旅人', colors: { masthead: '#FFFFFF', accent: '#F59E0B' } },
    { name: '珊瑚海岸', colors: { masthead: '#FFFFFF', accent: '#FB7185' } },
    { name: '松林墨绿', colors: { masthead: '#ECFCCB', accent: '#34D399' } },
    { name: '奶油复古', colors: { masthead: '#FEF3C7', accent: '#E11D48' } }
  ],
  canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: '#111827' },
  elements: [
    { id: 'photo', type: 'image', src: '/images/photo/travel-portrait-1080x1350.jpg', objectFit: 'cover', x: 0, y: 0, width: 1080, height: 1350, zIndex: 1, editable: { src: { type: 'upload' }, position: true } },
    { id: 'scrim-top', type: 'overlay', background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 26%)', x: 0, y: 0, width: 1080, height: 1350, zIndex: 2 },
    { id: 'scrim-bottom', type: 'overlay', background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 40%)', x: 0, y: 0, width: 1080, height: 1350, zIndex: 2 },
    // —— 刊头 + 顶部分类小标签（右上）+ 期号行（居中）
    { id: 'masthead', type: 'text', content: 'WANDER', fontFamily: { $t: 'fonts.heading' }, fontSize: 150, fontWeight: '900', color: { $t: 'colors.masthead' }, letterSpacing: 8, lineHeight: 1.05, textAlign: 'center', x: 40, y: 52, width: 1000, height: 190, zIndex: 4, animation: { name: 'fadeInDown', duration: 900 }, editable: { content: true, fontSize: { type: 'range', min: 90, max: 168 }, position: true } },
    { id: 'category-tag', type: 'text', content: 'TRAVEL · 城市地理', fontFamily: 'Helvetica, Arial, sans-serif', fontSize: 20, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 3, textAlign: 'right', x: 744, y: 252, width: 264, height: 32, zIndex: 4, animation: { name: 'slideInRight', duration: 700, delay: 420 }, editable: { content: true } },
    { id: 'issue-tag', type: 'text', content: 'ISSUE Nº 24  ·  山海之间', fontFamily: 'Helvetica, Arial, sans-serif', fontSize: 24, fontWeight: '600', color: { $t: 'colors.accent' }, letterSpacing: 3, x: 40, y: 250, width: 640, height: 34, textAlign: 'center', zIndex: 4, animation: { name: 'fadeIn', duration: 800, delay: 400 }, editable: { content: true } },
    // —— 期号圆形徽章（左上）
    { id: 'badge-ring', type: 'shape', shapeKind: 'circle', x: 72, y: 340, width: 178, height: 178, border: { color: { $t: 'colors.accent' }, width: 5, style: 'solid' }, zIndex: 4, animation: { name: 'zoomIn', duration: 600, delay: 520 } },
    { id: 'badge-text', type: 'text', content: 'Nº 24\n9 月号', fontFamily: { $t: 'fonts.heading' }, fontSize: 36, fontWeight: '800', color: { $t: 'colors.accent' }, letterSpacing: 2, lineHeight: 1.25, textAlign: 'center', x: 72, y: 386, width: 178, height: 90, zIndex: 4, editable: { content: true } },
    // —— 右侧栏 cover lines：三条短语，各带一条短横线
    { id: 'coverline-s1', type: 'text', content: '在海拔 4200 米\n等一场日出', fontFamily: { $t: 'fonts.heading' }, fontSize: 36, fontWeight: '700', color: { $t: 'colors.masthead' }, letterSpacing: 1, lineHeight: 1.45, textAlign: 'right', x: 690, y: 620, width: 318, height: 106, zIndex: 4, shadow: { color: 'rgba(0,0,0,0.5)', blur: 10, offsetX: 0, offsetY: 3 }, animation: { name: 'slideInRight', duration: 800, delay: 300 }, editable: { content: true, position: true } },
    { id: 'coverline-s1-rule', type: 'shape', shapeKind: 'rect', x: 888, y: 740, width: 120, height: 2, fill: { $t: 'colors.masthead' }, opacity: 0.6, zIndex: 4 },
    { id: 'coverline-s2', type: 'text', content: '戈壁公路\n限速 90 的黄昏', fontFamily: { $t: 'fonts.heading' }, fontSize: 30, fontWeight: '600', color: { $t: 'colors.masthead' }, opacity: 0.92, letterSpacing: 1, lineHeight: 1.5, textAlign: 'right', x: 690, y: 760, width: 318, height: 96, zIndex: 4, shadow: { color: 'rgba(0,0,0,0.5)', blur: 10, offsetX: 0, offsetY: 3 }, animation: { name: 'slideInRight', duration: 800, delay: 460 }, editable: { content: true, position: true } },
    { id: 'coverline-s2-rule', type: 'shape', shapeKind: 'rect', x: 888, y: 868, width: 120, height: 2, fill: { $t: 'colors.masthead' }, opacity: 0.5, zIndex: 4 },
    { id: 'coverline-s3', type: 'text', content: '12 座边境小城\n随刊地图别册', fontFamily: 'Helvetica, Arial, sans-serif', fontSize: 24, fontWeight: '500', color: { $t: 'colors.masthead' }, opacity: 0.85, letterSpacing: 1, lineHeight: 1.5, textAlign: 'right', x: 690, y: 886, width: 318, height: 80, zIndex: 4, shadow: { color: 'rgba(0,0,0,0.45)', blur: 8, offsetX: 0, offsetY: 3 }, animation: { name: 'slideInRight', duration: 800, delay: 620 }, editable: { content: true, position: true } },
    { id: 'coverline-s3-rule', type: 'shape', shapeKind: 'rect', x: 912, y: 974, width: 96, height: 2, fill: { $t: 'colors.masthead' }, opacity: 0.45, zIndex: 4 },
    // —— “本期专题”贴纸条：斜贴的纸片 + 片上墨字
    { id: 'feature-tape', type: 'shape', shapeKind: 'rect', x: 72, y: 852, width: 430, height: 80, fill: { $t: 'colors.masthead' }, opacity: 0.92, borderRadius: 2, rotation: -3.5, shadow: { color: 'rgba(0,0,0,0.35)', blur: 14, offsetX: 0, offsetY: 6 }, zIndex: 4, animation: { name: 'zoomIn', duration: 550, delay: 700 } },
    { id: 'feature-tape-text', type: 'text', content: '本期专题 · 边境小城慢游记', fontFamily: 'Helvetica, Arial, sans-serif', fontSize: 30, fontWeight: '800', color: { $t: 'colors.ink' }, letterSpacing: 1, lineHeight: 1.4, rotation: -3.5, x: 96, y: 872, width: 382, height: 44, zIndex: 5, editable: { content: true, position: true } },
    // —— 主封面故事 + 副句
    { id: 'coverline-1', type: 'text', content: '去有风的地方', fontFamily: { $t: 'fonts.heading' }, fontSize: 72, fontWeight: '800', color: { $t: 'colors.masthead' }, letterSpacing: 2, x: 80, y: 990, width: 920, height: 100, zIndex: 4, shadow: { color: 'rgba(0,0,0,0.5)', blur: 14, offsetX: 0, offsetY: 4 }, animation: { name: 'rise', duration: 900, delay: 300 }, editable: { content: true, fontSize: { type: 'range', min: 48, max: 96 }, position: true } },
    { id: 'coverline-2', type: 'text', content: '36 座小城 · 一场慢慢走的漫游', fontFamily: 'system-ui, sans-serif', fontSize: 44, fontWeight: '400', color: { $t: 'colors.masthead' }, opacity: 0.9, x: 84, y: 1102, width: 900, height: 62, zIndex: 4, animation: { name: 'fadeInUp', duration: 900, delay: 600 }, editable: { content: true } },
    // —— 真条形码组：不等宽竖条
    { id: 'barcode', type: 'shape', shapeKind: 'rect', x: 80, y: 1240, width: 12, height: 54, fill: { $t: 'colors.masthead' }, opacity: 0.88, group: 'barcode', zIndex: 4 },
    { id: 'barcode-2', type: 'shape', shapeKind: 'rect', x: 98, y: 1240, width: 5, height: 54, fill: { $t: 'colors.masthead' }, opacity: 0.88, group: 'barcode', zIndex: 4 },
    { id: 'barcode-3', type: 'shape', shapeKind: 'rect', x: 109, y: 1240, width: 18, height: 54, fill: { $t: 'colors.masthead' }, opacity: 0.88, group: 'barcode', zIndex: 4 },
    { id: 'barcode-4', type: 'shape', shapeKind: 'rect', x: 133, y: 1240, width: 7, height: 54, fill: { $t: 'colors.masthead' }, opacity: 0.88, group: 'barcode', zIndex: 4 }
  ]
}

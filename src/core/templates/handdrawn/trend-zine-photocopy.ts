// src/core/templates/handdrawn/trend-zine-photocopy.ts
// 当红趋势批 → 归入「手绘风」（handdrawn） ｜ 5. 复印机 Zine（3:4）
// 迁移自 src/core/templates/trend/：模板内容、素材函数与外观保持不变，只改分类归属。
import type { Template } from '@/types/types'
import { SANS, HEI, SONG, MONO, IMPACT, grain, halftone, tape, tornEdge } from '../_fx/trend'

export const trendZinePhotocopyTemplates: Template[] = [
  {
    id: 'trend-zine-photocopy', name: '复印机 Zine 拼贴', version: '1.0.0', category: 'handdrawn',
    tags: ['trend', 'zine', 'photocopy', 'collage', 'freeform', '3:4'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="133" viewBox="0 0 100 133"><rect width="100" height="133" fill="%23F2F0EB"/><rect x="12" y="20" width="76" height="30" fill="%23111"/><rect x="16" y="26" width="40" height="5" fill="%23F2F0EB"/><rect x="16" y="36" width="56" height="5" fill="%23F2F0EB" opacity="0.7"/><rect x="30" y="58" width="52" height="26" fill="%23E11D48" opacity="0.85" transform="rotate(-4 56 71)"/><rect x="12" y="94" width="30" height="6" fill="%23111"/><rect x="12" y="106" width="58" height="4" fill="%23111" opacity="0.5"/></svg>',
    tokens: {
      colors: {
        paper: { label: '复印纸', default: '#F2F0EB', options: ['#F2F0EB', '#FFFFFF', '#E7E5E4', '#FDF6E3'] },
        ink: { label: '碳墨', default: '#131313', options: ['#131313', '#1E293B', '#3F2D1B', '#111827'] },
        accent: { label: '单色荧光', default: '#E11D48', options: ['#E11D48', '#2563EB', '#15803D', '#B45309'] },
        ghost: { label: '重影灰', default: '#B8B4AC', options: ['#B8B4AC', '#D6D3D1', '#9CA3AF', '#A8A29E'] }
      },
      fonts: { latin: { label: '英文标题', default: IMPACT, options: [IMPACT, '"Courier New", Georgia, monospace', SANS] }, cjk: { label: '中文正文', default: SONG, options: [SONG, HEI, MONO] } }
    },
    presets: [
      { name: '红黑复印', colors: { paper: '#F2F0EB', ink: '#131313', accent: '#E11D48', ghost: '#B8B4AC' } },
      { name: '蓝晒工程', colors: { paper: '#FFFFFF', ink: '#1E293B', accent: '#2563EB', ghost: '#D6D3D1' } },
      { name: '苔绿小志', colors: { paper: '#E7E5E4', ink: '#111827', accent: '#15803D', ghost: '#9CA3AF' } },
      { name: '牛皮纸棕', colors: { paper: '#FDF6E3', ink: '#3F2D1B', accent: '#B45309', ghost: '#A8A29E' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1440, defaultWidth: 1080, defaultHeight: 1440, backgroundColor: { $t: 'colors.paper' } },
    elements: [
      { id: 'zp-crop-tl', type: 'shape', shapeKind: 'rect', x: 44, y: 44, width: 54, height: 3, fill: { $t: 'colors.ink' }, opacity: 0.7, zIndex: 3 },
      { id: 'zp-crop-tl2', type: 'shape', shapeKind: 'rect', x: 44, y: 44, width: 3, height: 54, fill: { $t: 'colors.ink' }, opacity: 0.7, zIndex: 3 },
      { id: 'zp-crop-br', type: 'shape', shapeKind: 'rect', x: 982, y: 1393, width: 54, height: 3, fill: { $t: 'colors.ink' }, opacity: 0.7, zIndex: 3 },
      { id: 'zp-crop-br2', type: 'shape', shapeKind: 'rect', x: 1033, y: 1342, width: 3, height: 54, fill: { $t: 'colors.ink' }, opacity: 0.7, zIndex: 3 },
      { id: 'zp-index', type: 'text', content: 'ZINE NO.03 / 手作与偏执 / 冬季号', fontFamily: { $t: 'fonts.cjk' }, fontSize: 24, color: { $t: 'colors.ink' }, opacity: 0.66, letterSpacing: 2, x: 120, y: 106, width: 840, height: 34, zIndex: 4 },
      { id: 'zp-hair', type: 'shape', shapeKind: 'rect', x: 120, y: 152, width: 840, height: 2, fill: { $t: 'colors.ink' }, opacity: 0.45, zIndex: 4 },
      { id: 'zp-tape-1', type: 'image', src: tape(280, 62, '%23B8B4AC'), x: 96, y: 190, width: 280, height: 62, zIndex: 8, rotation: -8 },
      { id: 'zp-block', type: 'shape', shapeKind: 'rect', x: 120, y: 226, width: 840, height: 372, fill: { $t: 'colors.ink' }, zIndex: 3, rotation: -0.8 },
      { id: 'zp-head-ghost', type: 'text', content: '不整\n齐的\n好东西', fontFamily: { $t: 'fonts.cjk' }, fontSize: 132, fontWeight: '900', color: { $t: 'colors.paper' }, opacity: 0.22, lineHeight: 1.02, letterSpacing: 4, x: 168, y: 252, width: 760, height: 320, rotation: -0.8, zIndex: 5 },
      { id: 'zp-head', type: 'text', content: '不整\n齐的\n好东西', fontFamily: { $t: 'fonts.cjk' }, fontSize: 132, fontWeight: '900', color: { $t: 'colors.paper' }, lineHeight: 1.02, letterSpacing: 4, x: 158, y: 242, width: 760, height: 320, rotation: -0.8, zIndex: 6, animation: { name: 'inkReveal', duration: 1100 }, editable: { content: true, fontSize: { type: 'range', min: 96, max: 150 } } },
      { id: 'zp-photo', type: 'shape', shapeKind: 'rect', x: 120, y: 630, width: 400, height: 320, fill: { $t: 'colors.accent' }, opacity: 0.9, zIndex: 4, rotation: 2.4 },
      { id: 'zp-photo-halftone', type: 'image', src: halftone(400, 320, 5, 16, '%23131313'), x: 120, y: 630, width: 400, height: 320, objectFit: 'fill', opacity: 0.5, rotation: 2.4, zIndex: 5 },
      { id: 'zp-caption', type: 'text', content: '图 01：车间里那台卡纸的打印机', fontFamily: { $t: 'fonts.cjk' }, fontSize: 22, color: { $t: 'colors.ink' }, opacity: 0.62, x: 132, y: 962, width: 420, height: 30, zIndex: 5 },
      { id: 'zp-body', type: 'text', content: '这一期我们聊“手工感”为什么又红了：\n因为算法把一切都磨得太滑。\n\n错位的字、复印三遍的灰边、\n贴歪的胶带——都是人在场的证据。', fontFamily: { $t: 'fonts.cjk' }, fontSize: 29, color: { $t: 'colors.ink' }, lineHeight: 1.8, x: 564, y: 636, width: 400, height: 350, zIndex: 5, animation: { name: 'fadeIn', duration: 800, delay: 260 }, editable: { content: true } },
      { id: 'zp-tear-top', type: 'image', src: tornEdge(560, 40, '%23F2F0EB', 20), x: 520, y: 1000, width: 560, height: 40, objectFit: 'fill', zIndex: 6 },
      { id: 'zp-stamp', type: 'shape', shapeKind: 'rect', x: 120, y: 1054, width: 396, height: 118, fill: 'transparent', border: { width: 5, color: { $t: 'colors.accent' } }, zIndex: 6, rotation: -4 },
      { id: 'zp-stamp-t', type: 'text', content: 'DO NOT\nFOLD NICELY', fontFamily: { $t: 'fonts.latin' }, fontSize: 34, color: { $t: 'colors.accent' }, letterSpacing: 2, lineHeight: 1.5, textAlign: 'center', x: 120, y: 1062, width: 396, height: 110, rotation: -4, zIndex: 7, editable: { content: true } },
      { id: 'zp-lines', type: 'text', content: '编辑｜无名  设计｜无名  印刷｜自家那台坏的', fontFamily: { $t: 'fonts.cjk' }, fontSize: 22, color: { $t: 'colors.ghost' }, opacity: 0.9, letterSpacing: 1, x: 520, y: 1090, width: 480, height: 30, zIndex: 6 },
      { id: 'zp-torn-band', type: 'image', src: tornEdge(1080, 46, '%23131313', 30), x: 0, y: 1224, width: 1080, height: 46, objectFit: 'fill', zIndex: 6 },
      { id: 'zp-foot', type: 'text', content: 'PHOTOCOPY / 复印 3 遍 / 黑白 + 单色 · 订阅见主页', fontFamily: { $t: 'fonts.cjk' }, fontSize: 23, color: { $t: 'colors.ink' }, opacity: 0.7, letterSpacing: 1, x: 120, y: 1298, width: 880, height: 34, zIndex: 7, editable: { content: true } },
      { id: 'zp-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1440, background: `url("${grain(320, 9, 0.75)}")`, opacity: 0.12, mixBlendMode: 'multiply', zIndex: 9 }
    ]
  }
]

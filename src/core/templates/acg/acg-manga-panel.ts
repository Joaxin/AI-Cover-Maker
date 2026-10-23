import type { Template } from '@/types/types'
import { SPEED_LINES, HALFTONE, PANEL_BORDER, SPARKLE4, SPEECH_BUBBLE } from './_decor'

// 1:1 漫画分格冲击封面
export const acgMangaPanel: Template = {
  id: 'acg-manga-panel', name: '漫画分格冲击', version: '1.0.0', category: 'acg', tags: ['acg', 'manga', 'comic', 'speedlines', '1:1'],
  thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23fde047"/><g stroke="%23111" stroke-width="2"><line x1="50" y1="50" x2="10" y2="6"/><line x1="50" y1="50" x2="90" y2="6"/><line x1="50" y1="50" x2="6" y2="70"/><line x1="50" y1="50" x2="94" y2="70"/><line x1="50" y1="50" x2="4" y2="34"/><line x1="50" y1="50" x2="96" y2="34"/></g><rect x="6" y="64" width="88" height="30" fill="%23111" opacity="0.12"/><rect x="21" y="51" width="58" height="1.6" fill="%23111" opacity="0.5" transform="rotate(-8 50 52)"/><circle cx="50" cy="35" r="20" fill="%23fff" stroke="%23111" stroke-width="2.6"/><rect x="39" y="30" width="22" height="9" rx="1" fill="%23ef4444"/><rect x="2" y="2" width="96" height="96" fill="none" stroke="%23111" stroke-width="2.4"/><rect x="4.4" y="4.4" width="91.2" height="91.2" fill="none" stroke="%23111" stroke-width="0.7" opacity="0.5"/><g fill="%23111" opacity="0.85"><rect x="4.4" y="4.4" width="2.8" height="2.8"/><rect x="92.8" y="4.4" width="2.8" height="2.8"/><rect x="4.4" y="92.8" width="2.8" height="2.8"/><rect x="92.8" y="92.8" width="2.8" height="2.8"/></g><rect x="6" y="6" width="15" height="4.4" fill="%23111" opacity="0.92"/><rect x="8.4" y="7.4" width="10" height="1.5" fill="%23fff" opacity="0.9"/><rect x="9" y="60" width="30" height="20" rx="9" fill="%23fff" stroke="%23111" stroke-width="1.6"/><g fill="%23111" opacity="0.6"><rect x="13" y="65" width="22" height="1.6" rx="0.8"/><rect x="15" y="69" width="18" height="1.6" rx="0.8"/><rect x="17" y="73" width="14" height="1.6" rx="0.8"/></g><rect x="47" y="70" width="44" height="3" rx="1" fill="%23111" opacity="0.75"/><g fill="%23111"><rect x="78.6" y="60.4" width="15" height="0.8" opacity="0.5"/><rect x="78.6" y="62.6" width="11.2" height="0.8" opacity="0.36"/></g><rect x="6" y="87" width="47" height="5" rx="1" fill="%23fff" stroke="%23111" stroke-width="1"/><rect x="9" y="88.8" width="30" height="1.4" fill="%23111" opacity="0.6"/><g fill="%23111" opacity="0.5"><rect x="92" y="32" width="1.8" height="1.8"/><rect x="92" y="37" width="1.8" height="1.8"/><rect x="92" y="42" width="1.8" height="1.8"/><rect x="92" y="47" width="1.8" height="1.8"/></g><path d="M75 12 L76.2 14.8 L79 16 L76.2 17.2 L75 20 L73.8 17.2 L71 16 L73.8 14.8 Z" fill="%23fef08a" stroke="%23facc15" stroke-width="0.5"/><path d="M86 23 L87 26 L89 27 L87 28 L86 31 L85 28 L83 27 L85 26 Z" fill="%23fef08a" stroke="%23facc15" stroke-width="0.5"/><path d="M11 44.6 L11.7 46.3 L13.4 47 L11.7 47.7 L11 49.4 L10.3 47.7 L8.6 47 L10.3 46.3 Z" fill="%23fef08a" stroke="%23facc15" stroke-width="0.4"/></svg>',
  tokens: {
    colors: {
      bg: { label: '底色', default: '#FDE047', options: ['#FDE047', '#FB7185', '#38BDF8', '#A3E635'] },
      ink: { label: '线墨', default: '#111111', options: ['#111111', '#1E293B', '#000000', '#0F172A'] },
      pop: { label: '强调', default: '#EF4444', options: ['#EF4444', '#2563EB', '#000000', '#1E293B', '#FDE047', '#7C3AED'] }
    },
    fonts: { heading: { label: '标题', default: 'Impact, sans-serif', options: ['Impact, sans-serif', 'system-ui, sans-serif'] } }
  },
  presets: [
    { name: '少年Jump', colors: { bg: '#FDE047', ink: '#111111', pop: '#EF4444' } },
    { name: '热血玫红', colors: { bg: '#FB7185', ink: '#111111', pop: '#1E293B' } },
    { name: '冷静青蓝', colors: { bg: '#38BDF8', ink: '#0F172A', pop: '#FDE047' } },
    { name: '荧光青柠', colors: { bg: '#A3E635', ink: '#111111', pop: '#7C3AED' } }
  ],
  canvas: { virtualWidth: 1000, virtualHeight: 1000, defaultWidth: 1000, defaultHeight: 1000, backgroundColor: { $t: 'colors.bg' } },
  elements: [
    { id: 'speed', type: 'image', src: SPEED_LINES, objectFit: 'cover', x: 0, y: 0, width: 1000, height: 1000, opacity: 0.5, zIndex: 1, animation: { name: 'spinSlow', duration: 90000, iterationCount: 'infinite', easing: 'linear' } },
    { id: 'halftone-band', type: 'image', src: HALFTONE, objectFit: 'cover', x: 60, y: 640, width: 880, height: 300, opacity: 0.18, zIndex: 2 },
    { id: 'panel', type: 'image', src: PANEL_BORDER, objectFit: 'cover', x: 0, y: 0, width: 1000, height: 1000, zIndex: 5 },
    { id: 'burst', type: 'shape', shapeKind: 'circle', x: 300, y: 150, width: 400, height: 400, fill: '#FFFFFF', border: { color: { $t: 'colors.ink' }, width: 8 }, zIndex: 3, animation: { name: 'heartbeat', duration: 1800, iterationCount: 'infinite' } },
    { id: 'onomatopoeia', type: 'text', content: 'ドン!!', fontFamily: { $t: 'fonts.heading' }, fontSize: 120, fontWeight: '900', color: { $t: 'colors.pop' }, textAlign: 'center', x: 300, y: 250, width: 400, height: 200, zIndex: 4, shadow: { color: '#111111', blur: 0, offsetX: 6, offsetY: 6 }, animation: { name: 'zoomIn', duration: 500 }, editable: { content: true, fontSize: { type: 'range', min: 70, max: 160 }, position: true } },
    { id: 'bubble', type: 'image', src: SPEECH_BUBBLE, objectFit: 'contain', x: 90, y: 600, width: 300, height: 210, zIndex: 6, animation: { name: 'fadeInUp', duration: 600, delay: 500 }, editable: { position: true, size: { type: 'scale' } } },
    { id: 'bubble-text', type: 'text', content: '这次，\n一定要赢！', fontFamily: 'Songti SC, SimSun, serif', fontSize: 34, fontWeight: '700', color: '#111111', lineHeight: 1.3, textAlign: 'center', x: 120, y: 640, width: 240, height: 120, zIndex: 7, editable: { content: true } },
    { id: 'caption', type: 'text', content: '第 01 话 · 起风的日子', fontFamily: 'STKaiti, KaiTi, serif', fontSize: 30, fontWeight: '700', color: { $t: 'colors.ink' }, x: 430, y: 690, width: 480, height: 50, textAlign: 'right', zIndex: 6, editable: { content: true } },
    { id: 'sparkle', type: 'image', src: SPARKLE4, objectFit: 'contain', x: 720, y: 130, width: 60, height: 60, zIndex: 6, animation: { name: 'sparkle', duration: 2200, iterationCount: 'infinite' } },
    // —— 加密度：内框 + 四角标 / 斜刺线 / トンボ小章 / 节奏短线 / 页脚预告条 / 竖排题字 / 双闪光 ——
    { id: 'mp-frame-in', type: 'shape', shapeKind: 'rect', x: 44, y: 44, width: 912, height: 912, fill: 'rgba(0,0,0,0)', border: { color: { $t: 'colors.ink' }, width: 2, style: 'solid' }, opacity: 0.5, zIndex: 6 },
    ...([[44, 44], [930, 44], [44, 930], [930, 930]] as any[]).map(([cx, cy], i) => ({ id: `mp-corner-${i}`, type: 'shape' as const, shapeKind: 'rect' as const, x: cx, y: cy, width: 26, height: 26, fill: { $t: 'colors.ink' } as any, opacity: 0.85, zIndex: 6 })),
    { id: 'mp-slash', type: 'shape', shapeKind: 'rect', x: 210, y: 516, width: 580, height: 14, fill: { $t: 'colors.ink' }, opacity: 0.5, rotation: -8, zIndex: 2 },
    { id: 'mp-tonbo', type: 'shape', shapeKind: 'rect', x: 60, y: 60, width: 150, height: 44, fill: { $t: 'colors.ink' }, opacity: 0.92, zIndex: 6 },
    { id: 'mp-tonbo-t', type: 'text', content: '創刊号', fontFamily: 'STKaiti, KaiTi, serif', fontSize: 28, fontWeight: '700', color: '#FFFFFF', textAlign: 'center', lineHeight: 1.57, x: 60, y: 60, width: 150, height: 44, zIndex: 7, editable: { content: true } },
    ...([[860, 250, 44], [104, 456, 34]] as any[]).map(([sx, sy, ss], i) => ({ id: `mp-sparkle-${i}`, type: 'image' as const, src: SPARKLE4, objectFit: 'contain' as const, x: sx, y: sy, width: ss, height: ss, zIndex: 6, animation: { name: 'twinkle', duration: 2600 + i * 600, delay: i * 400, iterationCount: 'infinite' } })) as any,
    ...([[786, 604, 150, 0.5], [786, 626, 112, 0.36]] as any[]).map(([bx, by, bw, bo], i) => ({ id: `mp-beat-${i}`, type: 'shape' as const, shapeKind: 'rect' as const, x: bx, y: by, width: bw, height: 6, fill: { $t: 'colors.ink' } as any, opacity: bo, zIndex: 2 })),
    { id: 'mp-foot', type: 'shape', shapeKind: 'rect', x: 60, y: 872, width: 470, height: 44, fill: '#FFFFFF', opacity: 0.95, border: { color: { $t: 'colors.ink' }, width: 3, style: 'solid' }, zIndex: 6 },
    { id: 'mp-foot-t', type: 'text', content: 'NEXT · 次号、衝撃の決戦。', fontFamily: 'STKaiti, KaiTi, serif', fontSize: 26, fontWeight: '700', color: { $t: 'colors.ink' }, lineHeight: 1.7, x: 60, y: 872, width: 470, height: 44, zIndex: 7, editable: { content: true } },
    { id: 'mp-vtext', type: 'text', content: '起\n風\nの\n日', fontFamily: 'STKaiti, KaiTi, serif', fontSize: 28, color: { $t: 'colors.ink' }, opacity: 0.55, lineHeight: 1.7, x: 920, y: 320, width: 34, height: 190, zIndex: 6, editable: { content: true } as any }
  ]
}

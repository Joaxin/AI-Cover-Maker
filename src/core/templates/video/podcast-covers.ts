// src/core/templates/video/podcast-covers.ts —— video 大类播客专题（2 个 · 2026-10-14 从 game-podcast-batch.ts 拆出，游戏 4 套已移 game/game-covers.ts）
// 口径：播客节目徽标（1:1 环形排版 + mic 拼形）/ 播客单集卡片（4:5 金句 + 时间戳章节 + 时长胶囊）。
// 规范：颜色全走 token；每套 4 组预设；1:1 = 1080×1080，4:5 = 1080×1350；virtual 与 default 同值。
import type { CanvasElement, Template } from '@/types/types'
import { HEI, IMPACT, MONO, SERIF } from '../_fx/trend'
import { dotsBg } from '../knowledge/_decor'
import { svgUri } from '../_fx/common'

/** 环形排版：一串字沿圆弧逐字铺开（顶弧朝外正读 flip=false，底弧朝内反读 flip=true），每字仍是可编辑 text */
function arcText(prefix: string, text: string, cx: number, cy: number, r: number, aFrom: number, aTo: number,
  opt: { size: number, family: string, token: string, z: number, flip?: boolean, weight?: string | number, delay?: number }) {
  const chars = [...text].filter(c => c !== ' ')
  const gap = chars.length > 1 ? (aTo - aFrom) / (chars.length - 1) : 0
  return chars.map((c, i): CanvasElement => {
    const a = aFrom + gap * i
    const rad = (a * Math.PI) / 180
    const box = opt.size * 1.5
    return {
      id: `${prefix}-${String(i + 1).padStart(2, '0')}`, type: 'text', content: c,
      fontFamily: opt.family, fontSize: opt.size, fontWeight: opt.weight ?? 700,
      color: { $t: opt.token }, textAlign: 'center',
      x: +(cx + r * Math.cos(rad) - box / 2).toFixed(1),
      y: +(cy - r * Math.sin(rad) - opt.size * 0.6).toFixed(1),
      width: +box.toFixed(1), height: +(opt.size * 1.5).toFixed(1),
      rotation: +(opt.flip ? 270 - a : 90 - a).toFixed(2), zIndex: opt.z,
      editable: { content: true },
      animation: { name: 'fadeIn', duration: 420, delay: (opt.delay ?? 0) + i * 70 }
    } as CanvasElement
  })
}

export const podcastCoversTemplates: Template[] = [
  // 5. 播客节目封面 —— 1:1 圆形徽标：节目名环形排版 + mic 拼形 + 期数
  {
    id: 'video-pod-show', name: '播客节目徽标封面', version: '1.0.0', category: 'video',
    tags: ['video', 'podcast', 'show', 'badge', '1:1'],
    thumbnail: svgUri('<rect width="140" height="140" fill="%23E7E3D9"/><circle cx="70" cy="70" r="52" fill="none" stroke="%238A857C" stroke-width="1.6" stroke-dasharray="4 3"/><g fill="%231B1A18"><rect x="62" y="34" width="16" height="34" rx="8"/><rect x="66" y="72" width="8" height="16" rx="3"/><rect x="56" y="86" width="28" height="5" rx="2.5"/></g><path d="M52 56 C 52 88 88 88 88 56" fill="none" stroke="%232E6F5E" stroke-width="4" stroke-linecap="round"/><g fill="%238A857C"><rect x="26" y="30" width="6" height="6" rx="1"/><rect x="18" y="52" width="6" height="6" rx="1"/><rect x="110" y="30" width="6" height="6" rx="1"/><rect x="118" y="52" width="6" height="6" rx="1"/><rect x="60" y="112" width="6" height="6" rx="1"/><rect x="78" y="112" width="6" height="6" rx="1"/></g><text x="70" y="106" font-family="Impact,sans-serif" font-size="13" fill="%232E6F5E" text-anchor="middle">EP.42</text><text x="10" y="12" font-family="monospace" font-size="6" fill="%238A857C">PODCAST</text><circle cx="126" cy="10" r="3" fill="%23C8462B"/>', 140, 140),
    tokens: {
      colors: {
        bg: { label: '底色', default: '#E7E3D9', options: ['#E7E3D9', '#DCE3E7', '#E7DCDF', '#DDE7DC'] },
        ink: { label: '主文字', default: '#1B1A18', options: ['#1B1A18', '#141A1D', '#1D141A', '#161D14'] },
        accent: { label: '强调色', default: '#2E6F5E', options: ['#2E6F5E', '#3A5A8C', '#8C3A5A', '#7A5A2E'] },
        dim: { label: '弱文字', default: '#8A857C', options: ['#8A857C', '#7C858A', '#8A7C83', '#7F8A7C'] }
      },
      fonts: { heading: { label: '标题字体', default: HEI, options: [HEI, SERIF] } }
    },
    presets: [
      { name: '素纸松绿', colors: { bg: '#E7E3D9', ink: '#1B1A18', accent: '#2E6F5E', dim: '#8A857C' } },
      { name: '雾青靛蓝', colors: { bg: '#DCE3E7', ink: '#141A1D', accent: '#3A5A8C', dim: '#7C858A' } },
      { name: '藕荷酒红', colors: { bg: '#E7DCDF', ink: '#1D141A', accent: '#8C3A5A', dim: '#8A7C83' } },
      { name: '茶灰褐金', colors: { bg: '#DDE7DC', ink: '#161D14', accent: '#7A5A2E', dim: '#7F8A7C' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1080, defaultWidth: 1080, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'ps-dots', type: 'image', src: dotsBg(1080, 1080, 40, 'rgba(27,26,24,0.06)'), x: 0, y: 0, width: 1080, height: 1080, objectFit: 'fill', zIndex: 1 },
      { id: 'ps-ring-o', type: 'shape', shapeKind: 'circle', x: 140, y: 145, width: 800, height: 800, border: { width: 3, style: 'dashed', color: { $t: 'colors.dim' } }, zIndex: 2, animation: { name: 'spinSlow', duration: 46000, iterationCount: 'infinite', easing: 'linear' } },
      { id: 'ps-ring-i', type: 'shape', shapeKind: 'circle', x: 172, y: 177, width: 736, height: 736, border: { width: 1.5, color: { $t: 'colors.accent' } }, opacity: 0.55, zIndex: 2 },
      // ── 节目名环形排版（上弧正读 / 下弧反读）
      ...arcText('ps-arc-t', '通勤路上聊点什么', 540, 545, 330, 155, 25, { size: 44, family: HEI, token: 'colors.ink', z: 4 }),
      ...arcText('ps-arc-b', '双周日晚八点更新', 540, 545, 330, 215, 325, { size: 44, family: HEI, token: 'colors.accent', z: 4, flip: true }),
      // ── mic 拼形（胶囊 + U 形架 + 立柱 + 底座，格栅用底色刻出）
      { id: 'ps-mic-arc', type: 'shape', shapeKind: 'circle', x: 452, y: 300, width: 176, height: 176, border: { width: 10, color: { $t: 'colors.ink' } }, zIndex: 3 },
      { id: 'ps-mic-cover', type: 'shape', shapeKind: 'rect', x: 440, y: 278, width: 200, height: 112, fill: { $t: 'colors.bg' }, zIndex: 3 },
      { id: 'ps-mic-cap', type: 'shape', shapeKind: 'rect', x: 506, y: 288, width: 68, height: 192, borderRadius: 34, fill: { $t: 'colors.accent' }, zIndex: 5, animation: { name: 'float', duration: 4200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'ps-mic-g1', group: 'ps-mic-g', type: 'shape', shapeKind: 'rect', x: 518, y: 330, width: 44, height: 6, borderRadius: 3, fill: { $t: 'colors.bg' }, zIndex: 6 },
      { id: 'ps-mic-g2', group: 'ps-mic-g', type: 'shape', shapeKind: 'rect', x: 518, y: 356, width: 44, height: 6, borderRadius: 3, fill: { $t: 'colors.bg' }, zIndex: 6 },
      { id: 'ps-mic-g3', group: 'ps-mic-g', type: 'shape', shapeKind: 'rect', x: 518, y: 382, width: 44, height: 6, borderRadius: 3, fill: { $t: 'colors.bg' }, zIndex: 6 },
      { id: 'ps-mic-stand', type: 'shape', shapeKind: 'rect', x: 528, y: 468, width: 24, height: 82, fill: { $t: 'colors.ink' }, zIndex: 4 },
      { id: 'ps-mic-base', type: 'shape', shapeKind: 'rect', x: 474, y: 546, width: 132, height: 22, borderRadius: 11, fill: { $t: 'colors.ink' }, zIndex: 4 },
      // ── 期数与栏目信息
      { id: 'ps-ep', type: 'text', content: 'EP.42', fontFamily: IMPACT, fontSize: 130, letterSpacing: 2, color: { $t: 'colors.accent' }, textAlign: 'center', x: 310, y: 650, width: 460, height: 170, zIndex: 5, animation: { name: 'fadeInUp', duration: 520 }, editable: { content: true, fontSize: { type: 'range', min: 80, max: 170 } } },
      { id: 'ps-kicker', type: 'text', content: 'PODCAST', fontFamily: MONO, fontSize: 22, fontWeight: 700, letterSpacing: 10, color: { $t: 'colors.dim' }, x: 70, y: 70, width: 340, height: 34, zIndex: 5, animation: { name: 'fadeIn', duration: 420, delay: 130 }, editable: { content: true } },
      { id: 'ps-rec-d', type: 'shape', shapeKind: 'circle', x: 930, y: 78, width: 18, height: 18, fill: { $t: 'colors.accent' }, zIndex: 5, animation: { name: 'blink', duration: 1500, iterationCount: 'infinite', easing: 'steps(1)' } },
      { id: 'ps-rec-t', type: 'text', content: 'REC', fontFamily: MONO, fontSize: 22, fontWeight: 700, letterSpacing: 3, color: { $t: 'colors.accent' }, textAlign: 'right', x: 800, y: 70, width: 110, height: 34, zIndex: 5 },
      { id: 'ps-foot', type: 'text', content: '一档关于时间与注意力的播客', fontFamily: HEI, fontSize: 28, letterSpacing: 2, color: { $t: 'colors.dim' }, textAlign: 'center', x: 70, y: 986, width: 940, height: 40, zIndex: 5, animation: { name: 'fadeIn', duration: 420, delay: 260 }, editable: { content: true } },
      { id: 'ps-bars-1', group: 'ps-bars-', type: 'shape', shapeKind: 'rect', x: 70, y: 1012, width: 9, height: 28, borderRadius: 4.5, fill: { $t: 'colors.accent' }, opacity: 0.55, zIndex: 4 },
      { id: 'ps-bars-2', group: 'ps-bars-', type: 'shape', shapeKind: 'rect', x: 88, y: 984, width: 9, height: 56, borderRadius: 4.5, fill: { $t: 'colors.accent' }, opacity: 0.55, zIndex: 4, animation: { name: 'pulse', duration: 2200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'ps-bars-3', group: 'ps-bars-', type: 'shape', shapeKind: 'rect', x: 106, y: 1020, width: 9, height: 20, borderRadius: 4.5, fill: { $t: 'colors.accent' }, opacity: 0.55, zIndex: 4 },
      { id: 'ps-bars-4', group: 'ps-bars-', type: 'shape', shapeKind: 'rect', x: 124, y: 968, width: 9, height: 72, borderRadius: 4.5, fill: { $t: 'colors.accent' }, opacity: 0.55, zIndex: 4, animation: { name: 'heartbeat', duration: 2600, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'ps-bars-5', group: 'ps-bars-', type: 'shape', shapeKind: 'rect', x: 142, y: 1004, width: 9, height: 36, borderRadius: 4.5, fill: { $t: 'colors.accent' }, opacity: 0.55, zIndex: 4 }
    ]
  },

  // 6. 播客单集卡片 —— 4:5 竖版：本集金句大字 + 时间戳章节列表 + 收听时长胶囊
  {
    id: 'video-pod-episode', name: '播客单集章节卡片', version: '1.0.0', category: 'video',
    tags: ['video', 'podcast', 'episode', 'chapters', '4:5'],
    thumbnail: svgUri('<rect width="120" height="150" fill="%2314332B"/><text x="8" y="24" font-family="serif" font-size="26" fill="%238FAF9F" opacity="0.4">「</text><rect x="10" y="32" width="72" height="9" rx="1" fill="%23F2EFE4"/><rect x="10" y="45" width="60" height="9" rx="1" fill="%23F2EFE4" opacity="0.8"/><rect x="10" y="58" width="48" height="9" rx="1" fill="%23F2EFE4" opacity="0.6"/><rect x="10" y="74" width="34" height="3" rx="1" fill="%23E9A13B"/><g fill="%23E9A13B"><rect x="10" y="88" width="16" height="5" rx="1"/></g><rect x="30" y="87" width="60" height="5" rx="1" fill="%23F2EFE4" opacity="0.75"/><g fill="%23E9A13B"><rect x="10" y="101" width="16" height="5" rx="1"/></g><rect x="30" y="100" width="52" height="5" rx="1" fill="%23F2EFE4" opacity="0.75"/><g fill="%23E9A13B"><rect x="10" y="114" width="16" height="5" rx="1"/></g><rect x="30" y="113" width="58" height="5" rx="1" fill="%23F2EFE4" opacity="0.75"/><rect x="10" y="126" width="100" height="4" rx="2" fill="rgba(255,255,255,0.16)"/><rect x="11" y="127" width="46" height="2" rx="1" fill="%23E9A13B"/><rect x="10" y="134" width="62" height="11" rx="5.5" fill="none" stroke="%23E9A13B"/>', 120, 150),
    tokens: {
      colors: {
        bg: { label: '底色', default: '#14332B', options: ['#14332B', '#1B2440', '#2C1B22', '#20242A'] },
        ink: { label: '主文字', default: '#F2EFE4', options: ['#F2EFE4', '#EAF0F8', '#F8EAEA', '#E9EDEE'] },
        accent: { label: '强调色', default: '#E9A13B', options: ['#E9A13B', '#7FB2FF', '#F07E93', '#A3B9C6'] },
        dim: { label: '弱文字', default: '#8FAF9F', options: ['#8FAF9F', '#8898B8', '#B8919A', '#9AA4AC'] }
      },
      fonts: { heading: { label: '标题字体', default: SERIF, options: [SERIF, HEI] } }
    },
    presets: [
      { name: '松林琥珀', colors: { bg: '#14332B', ink: '#F2EFE4', accent: '#E9A13B', dim: '#8FAF9F' } },
      { name: '藏青雾蓝', colors: { bg: '#1B2440', ink: '#EAF0F8', accent: '#7FB2FF', dim: '#8898B8' } },
      { name: '酒红玫瑰', colors: { bg: '#2C1B22', ink: '#F8EAEA', accent: '#F07E93', dim: '#B8919A' } },
      { name: '石墨雾灰', colors: { bg: '#20242A', ink: '#E9EDEE', accent: '#A3B9C6', dim: '#9AA4AC' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'pe-dots', type: 'image', src: dotsBg(1080, 1350, 44, 'rgba(255,255,255,0.05)'), x: 0, y: 0, width: 1080, height: 1350, objectFit: 'fill', zIndex: 1 },
      { id: 'pe-glow', type: 'overlay', background: 'radial-gradient(60% 34% at 18% 12%, rgba(233,161,59,0.16), transparent 72%)', x: 0, y: 0, width: 1080, height: 1350, zIndex: 2 },
      { id: 'pe-kicker', type: 'text', content: 'EP.42 · 通勤电台', fontFamily: MONO, fontSize: 28, fontWeight: 700, letterSpacing: 4, color: { $t: 'colors.accent' }, x: 70, y: 96, width: 700, height: 40, zIndex: 4, animation: { name: 'fadeIn', duration: 420 }, editable: { content: true } },
      { id: 'pe-bigmark-o', type: 'text', content: '「', fontFamily: SERIF, fontSize: 210, color: { $t: 'colors.dim' }, opacity: 0.30, x: 44, y: 150, width: 250, height: 250, zIndex: 2, animation: { name: 'twinkle', duration: 5200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'pe-quote', type: 'text', content: '注意力，是\n最后一块\n免费领土', fontFamily: { $t: 'fonts.heading' }, fontSize: 96, fontWeight: 900, lineHeight: 1.24, color: { $t: 'colors.ink' }, x: 70, y: 280, width: 780, height: 390, zIndex: 4, animation: { name: 'fadeInUp', duration: 560, delay: 130 }, editable: { content: true, fontSize: { type: 'range', min: 60, max: 120 } } },
      { id: 'pe-bigmark-c', type: 'text', content: '」', fontFamily: SERIF, fontSize: 210, color: { $t: 'colors.dim' }, opacity: 0.24, x: 780, y: 596, width: 250, height: 250, zIndex: 2 },
      { id: 'pe-by', type: 'text', content: '—— 主播老周 · 对谈阿柯', fontFamily: HEI, fontSize: 28, color: { $t: 'colors.dim' }, x: 70, y: 692, width: 700, height: 40, zIndex: 4, animation: { name: 'fadeIn', duration: 420, delay: 260 }, editable: { content: true } },
      // ── 时间戳章节列表
      { id: 'pe-ch-h', type: 'text', content: '本集章节 · 挑着听', fontFamily: HEI, fontSize: 44, fontWeight: 900, color: { $t: 'colors.accent' }, x: 70, y: 762, width: 700, height: 62, zIndex: 4, editable: { content: true } },
      { id: 'pe-c1-t', type: 'text', content: '02:14', fontFamily: MONO, fontSize: 44, fontWeight: 700, color: { $t: 'colors.accent' }, x: 70, y: 862, width: 200, height: 68, zIndex: 4, animation: { name: 'rise', duration: 460 }, editable: { content: true } },
      { id: 'pe-c1', type: 'text', content: '地铁上想通的事，下车全忘', fontFamily: HEI, fontSize: 34, color: { $t: 'colors.ink' }, x: 250, y: 874, width: 760, height: 52, zIndex: 4, animation: { name: 'rise', duration: 460, delay: 130 }, editable: { content: true } },
      { id: 'pe-l1', group: 'pe-l', type: 'shape', shapeKind: 'rect', x: 70, y: 944, width: 940, height: 2, fill: 'rgba(255,255,255,0.14)', zIndex: 4 },
      { id: 'pe-c2-t', type: 'text', content: '14:40', fontFamily: MONO, fontSize: 44, fontWeight: 700, color: { $t: 'colors.accent' }, x: 70, y: 962, width: 200, height: 68, zIndex: 4, animation: { name: 'rise', duration: 460, delay: 200 }, editable: { content: true } },
      { id: 'pe-c2', type: 'text', content: '我们开始给注意力计时', fontFamily: HEI, fontSize: 34, color: { $t: 'colors.ink' }, x: 250, y: 974, width: 760, height: 52, zIndex: 4, animation: { name: 'rise', duration: 460, delay: 260 }, editable: { content: true } },
      { id: 'pe-l2', group: 'pe-l', type: 'shape', shapeKind: 'rect', x: 70, y: 1044, width: 940, height: 2, fill: 'rgba(255,255,255,0.14)', zIndex: 4 },
      { id: 'pe-c3-t', type: 'text', content: '31:05', fontFamily: MONO, fontSize: 44, fontWeight: 700, color: { $t: 'colors.accent' }, x: 70, y: 1062, width: 200, height: 68, zIndex: 4, animation: { name: 'rise', duration: 460, delay: 330 }, editable: { content: true } },
      { id: 'pe-c3', type: 'text', content: '算法没坏，是我们手太闲', fontFamily: HEI, fontSize: 34, color: { $t: 'colors.ink' }, x: 250, y: 1074, width: 760, height: 52, zIndex: 4, editable: { content: true } },
      { id: 'pe-l3', group: 'pe-l', type: 'shape', shapeKind: 'rect', x: 70, y: 1144, width: 940, height: 2, fill: 'rgba(255,255,255,0.14)', zIndex: 4 },
      // ── 进度条 + 收听时长胶囊
      { id: 'pe-pg-track', type: 'shape', shapeKind: 'rect', x: 70, y: 1186, width: 940, height: 18, borderRadius: 9, fill: 'rgba(255,255,255,0.12)', zIndex: 4 },
      { id: 'pe-pg-fill', type: 'shape', shapeKind: 'rect', x: 78, y: 1192, width: 470, height: 6, borderRadius: 3, fill: { $t: 'colors.accent' }, zIndex: 5, animation: { name: 'shimmer', duration: 2800, iterationCount: 'infinite', easing: 'linear' } },
      { id: 'pe-pg-k1', group: 'pe-pg-k', type: 'shape', shapeKind: 'rect', x: 390, y: 1186, width: 4, height: 18, fill: { $t: 'colors.bg' }, zIndex: 6 },
      { id: 'pe-pg-k2', group: 'pe-pg-k', type: 'shape', shapeKind: 'rect', x: 640, y: 1186, width: 4, height: 18, fill: { $t: 'colors.bg' }, zIndex: 6 },
      { id: 'pe-pg-k3', group: 'pe-pg-k', type: 'shape', shapeKind: 'rect', x: 830, y: 1186, width: 4, height: 18, fill: { $t: 'colors.bg' }, zIndex: 6 },
      { id: 'pe-pill', type: 'shape', shapeKind: 'rect', x: 70, y: 1226, width: 560, height: 84, borderRadius: 42, fill: 'rgba(255,255,255,0.05)', border: { width: 3, color: { $t: 'colors.accent' } }, zIndex: 4, animation: { name: 'fadeInUp', duration: 480, delay: 390 } },
      { id: 'pe-pill-t', type: 'text', content: '全长 58 分钟 · 地铁两站', fontFamily: HEI, fontSize: 34, fontWeight: 700, color: { $t: 'colors.accent' }, textAlign: 'center', x: 70, y: 1248, width: 560, height: 48, zIndex: 5, editable: { content: true, fontSize: { type: 'range', min: 24, max: 44 } } },
      { id: 'pe-foot', type: 'text', content: '通勤电台 · 双周日晚更新', fontFamily: HEI, fontSize: 22, letterSpacing: 2, color: { $t: 'colors.dim' }, textAlign: 'right', x: 660, y: 1252, width: 350, height: 34, zIndex: 5, editable: { content: true } }
    ]
  }
]

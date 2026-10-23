// src/core/templates/video/bili-covers-extra.ts —— B站封面第二批（6 个高频流派 · 16:9 · 1920×1080）
// 口径：震惊反应 / 十大盘点 / 生活VLOG胶片 / 三步教程 / 悬念解密 / 播客对谈；颜色全走 token，每个 4 套预设。
import type { Template } from '@/types/types'
import { HEI, SONG, IMPACT, MONO, SANS, SERIF } from '../_fx/trend'
import { gridBg, dotsBg } from '../knowledge/_decor'
import { svgUri } from '../_fx/common'

// 胶片齿孔条：黑条 + 12 个透明孔（孔透出画布底色，换预设也不露馅）
function filmStrip() {
  const holes = Array.from({ length: 12 }, (_, i) => `<rect x="${i * 160 + 40}" y="25" width="80" height="30" rx="10" fill="transparent"/>`).join('')
  return svgUri(`<rect width="1920" height="80" fill="%23171310"/>${holes}`, 1920, 80)
}
// 漫画惊线（右上放射短斜线）
const SHOCK_URI = svgUri('<g stroke="%230B2B27" stroke-width="12" stroke-linecap="round"><path d="M20 120 L120 30"/><path d="M90 170 L210 55"/><path d="M180 200 L310 75"/><path d="M280 215 L400 100"/></g>', 420, 230)
// 「OMG」爆炸小贴纸轮廓
const OMG_URI = svgUri('<polygon points="210,0 245,58 310,32 300,100 380,96 330,150 410,180 328,205 380,260 296,248 296,320 232,268 188,330 168,258 88,288 116,214 30,206 104,158 40,106 132,110 120,34 178,86" fill="%23FF4D6D"/>', 410, 330)

export const biliCoverExtraTemplates: Template[] = [
  // 1. 震惊反应脸封面 —— 薄荷绿大字 + 右边圆形的"脸位"，反应区/看片区标配
  {
    id: 'video-bili-react', name: '震惊反应脸封面', version: '1.0.0', category: 'video',
    tags: ['video', 'bilibili', 'reaction', 'thumbnail', '16:9'],
    thumbnail: svgUri('<rect width="160" height="90" fill="%230BCFB6"/><g fill="%23000000" opacity="0.05"><circle cx="20" cy="20" r="1.4"/><circle cx="60" cy="16" r="1.4"/><circle cx="100" cy="86" r="1.4"/><circle cx="140" cy="18" r="1.4"/></g><g stroke="%230B2B27" stroke-width="3" stroke-linecap="round" opacity="0.8"><path d="M118 8 L132 2"/><path d="M132 14 L148 8"/><path d="M142 22 L156 18"/></g><circle cx="122" cy="40" r="26" fill="none" stroke="%23FFFFFF" stroke-width="2" stroke-dasharray="5 4"/><rect x="16" y="30" width="82" height="12" rx="2" fill="%23FFFFFF" opacity="0.85"/><rect x="14" y="28" width="82" height="12" rx="2" fill="%230B2B27"/><rect x="16" y="48" width="66" height="12" rx="2" fill="%230B2B27" opacity="0.9"/><rect x="14" y="46" width="66" height="12" rx="2" fill="%23FF4D6D"/><rect x="12" y="44" width="72" height="16" rx="8" fill="none" stroke="%23FFFFFF" stroke-width="2"/><rect x="14" y="12" width="30" height="8" rx="4" fill="%23FF4D6D"/><rect x="48" y="12" width="34" height="8" rx="4" fill="%230B2B27"/><text x="14" y="27" font-family="Impact,sans-serif" font-size="9" fill="%23FF4D6D">EP.06</text><g fill="%230B2B27"><rect x="86" y="14" width="28" height="4" rx="1" opacity="0.18"/><rect x="16" y="64" width="36" height="5" rx="1" opacity="0.16"/><rect x="24" y="73" width="30" height="5" rx="1" opacity="0.2"/></g><polygon points="100,62 108,58 112,66 120,64 118,72 126,76 118,80 120,88 110,84 106,90 102,82 94,84 98,76 90,72 98,68" fill="%23FF4D6D"/><rect x="126" y="76" width="28" height="9" rx="4.5" fill="%23FF4D6D"/><text x="96" y="50" font-family="Arial" font-size="12" fill="%23FF4D6D">→</text>', 160, 90),
    tokens: {
      colors: {
        bg: { label: '底色', default: '#0BCFB6', options: ['#0BCFB6', '#FFD91C', '#FF8FA3', '#7BD389'] },
        ink: { label: '主文字', default: '#0B2B27', options: ['#0B2B27', '#171512', '#3B1120', '#123B1F'] },
        accent: { label: '强调色', default: '#FF4D6D', options: ['#FF4D6D', '#E63A2E', '#171512', '#FF6B35'] },
        pop: { label: '贴纸白', default: '#FFFFFF', options: ['#FFFFFF', '#FFF9DB', '#FFFDF8'] }
      },
      fonts: { heading: { label: '标题字体', default: HEI, options: [HEI, IMPACT] } }
    },
    presets: [
      { name: '薄荷炸', colors: { bg: '#0BCFB6', ink: '#0B2B27', accent: '#FF4D6D', pop: '#FFFFFF' } },
      { name: '柠檬惊', colors: { bg: '#FFD91C', ink: '#171512', accent: '#E63A2E', pop: '#FFF9DB' } },
      { name: '桃粉跳', colors: { bg: '#FF8FA3', ink: '#3B1120', accent: '#171512', pop: '#FFFDF8' } },
      { name: '抹茶愣', colors: { bg: '#7BD389', ink: '#123B1F', accent: '#FF6B35', pop: '#FFFFFF' } }
    ],
    canvas: { virtualWidth: 1920, virtualHeight: 1080, defaultWidth: 1920, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'rt-dots', type: 'image', src: dotsBg(1920, 1080, 60, 'rgba(0,0,0,0.06)'), x: 0, y: 0, width: 1920, height: 1080, objectFit: 'fill', zIndex: 1 },
      { id: 'rt-shock', type: 'image', src: SHOCK_URI, x: 1120, y: 70, width: 420, height: 230, objectFit: 'contain', zIndex: 2, animation: { name: 'wobble', duration: 1500 } },
      { id: 'rt-face', type: 'shape', shapeKind: 'circle', x: 1230, y: 250, width: 560, height: 560, border: { width: 8, style: 'dashed', color: { $t: 'colors.pop' } }, zIndex: 3 },
      { id: 'rt-face-t', type: 'text', content: '这里放你的脸', imageSlot: 'rt-face', fontFamily: HEI, fontSize: 30, color: { $t: 'colors.ink' }, opacity: 0.75, textAlign: 'center', x: 1230, y: 510, width: 560, height: 44, zIndex: 4, editable: { content: true } },
      { id: 'rt-kicker', type: 'shape', shapeKind: 'rect', x: 120, y: 96, width: 300, height: 62, borderRadius: 999, fill: { $t: 'colors.accent' }, zIndex: 4 },
      { id: 'rt-kicker-t', type: 'text', content: '反应太真实', fontFamily: HEI, fontSize: 30, fontWeight: 700, color: { $t: 'colors.pop' }, textAlign: 'center', x: 120, y: 110, width: 300, height: 36, zIndex: 5, editable: { content: true } },
      { id: 'rt-t1', type: 'text', content: '我直接笑到', fontFamily: { $t: 'fonts.heading' }, fontSize: 150, fontWeight: 900, color: { $t: 'colors.ink' }, letterSpacing: 4, x: 140, y: 280, width: 1020, height: 175, zIndex: 5, animation: { name: 'slideInLeft', duration: 480 }, editable: { content: true, fontSize: { type: 'range', min: 90, max: 200 } } },
      { id: 'rt-t2', type: 'text', content: '邻居报警', fontFamily: { $t: 'fonts.heading' }, fontSize: 150, fontWeight: 900, color: { $t: 'colors.accent' }, letterSpacing: 4, x: 140, y: 470, width: 1020, height: 175, zIndex: 5, animation: { name: 'slideInLeft', duration: 480, delay: 140 }, editable: { content: true, fontSize: { type: 'range', min: 90, max: 200 } } },
      { id: 'rt-omg', type: 'image', src: OMG_URI, x: 960, y: 660, width: 260, height: 210, objectFit: 'contain', rotation: -10, zIndex: 6, animation: { name: 'zoomIn', duration: 420, delay: 300 } },
      { id: 'rt-omg-t', type: 'text', content: 'OMG?!', fontFamily: IMPACT, fontSize: 54, color: { $t: 'colors.pop' }, textAlign: 'center', rotation: -10, x: 985, y: 726, width: 210, height: 64, zIndex: 7, editable: { content: true } },
      { id: 'rt-sub', type: 'text', content: '反应系列 · EP.06 · 原片更离谱', fontFamily: HEI, fontSize: 36, color: { $t: 'colors.ink' }, opacity: 0.85, x: 140, y: 940, width: 800, height: 48, zIndex: 5, editable: { content: true } },
      { id: 'rt-t1o', type: 'text', content: '我直接笑到', fontFamily: { $t: 'fonts.heading' }, fontSize: 150, fontWeight: 900, color: { $t: 'colors.pop' }, letterSpacing: 4, x: 160, y: 292, width: 1020, height: 175, zIndex: 4 },
      { id: 'rt-t2o', type: 'text', content: '邻居报警', fontFamily: { $t: 'fonts.heading' }, fontSize: 150, fontWeight: 900, color: { $t: 'colors.ink' }, letterSpacing: 4, opacity: 0.9, x: 160, y: 482, width: 1020, height: 175, zIndex: 4 },
      { id: 'rt-oval', type: 'shape', shapeKind: 'rect', x: 150, y: 462, width: 640, height: 176, borderRadius: 999, border: { width: 8, color: { $t: 'colors.pop' } }, rotation: -2, zIndex: 4 },
      { id: 'rt-play', type: 'shape', shapeKind: 'rect', x: 452, y: 96, width: 340, height: 62, borderRadius: 999, fill: { $t: 'colors.ink' }, zIndex: 4 },
      { id: 'rt-play-t', type: 'text', content: '播放 512.3万', fontFamily: HEI, fontSize: 26, fontWeight: 700, color: { $t: 'colors.pop' }, textAlign: 'center', x: 452, y: 111, width: 340, height: 32, zIndex: 5, editable: { content: true } },
      { id: 'rt-ep', type: 'text', content: 'EP.06', fontFamily: IMPACT, fontSize: 68, color: { $t: 'colors.accent' }, x: 120, y: 186, width: 240, height: 78, zIndex: 5, editable: { content: true } },
      { id: 'rt-arrow', type: 'text', content: '→', fontFamily: SANS, fontSize: 96, fontWeight: 700, color: { $t: 'colors.accent' }, x: 1080, y: 520, width: 130, height: 110, zIndex: 6, animation: { name: 'wobble', duration: 1500 } },
      { id: 'rt-face-cap', type: 'text', content: '原片《全球最尬十段视频》', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.ink' }, opacity: 0.8, textAlign: 'center', x: 1230, y: 830, width: 560, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'rt-dur', type: 'shape', shapeKind: 'rect', x: 1500, y: 900, width: 260, height: 64, borderRadius: 999, fill: { $t: 'colors.accent' }, zIndex: 6 },
      { id: 'rt-dur-t', type: 'text', content: '12:07', fontFamily: MONO, fontSize: 30, fontWeight: 700, color: { $t: 'colors.pop' }, textAlign: 'center', x: 1500, y: 917, width: 260, height: 32, zIndex: 7, editable: { content: true } },
      { id: 'rt-dm1', type: 'text', content: '哈哈哈哈哈', fontFamily: HEI, fontSize: 44, fontWeight: 700, color: { $t: 'colors.ink' }, opacity: 0.18, rotation: -3, x: 470, y: 190, width: 500, height: 60, zIndex: 3, editable: { content: true } },
      { id: 'rt-dm2', type: 'text', content: '这段我看了八遍', fontFamily: HEI, fontSize: 44, fontWeight: 700, color: { $t: 'colors.ink' }, opacity: 0.16, x: 160, y: 700, width: 600, height: 60, zIndex: 3, editable: { content: true } },
      { id: 'rt-dm3', type: 'text', content: '名场面 +1 +1 +1', fontFamily: HEI, fontSize: 44, fontWeight: 700, color: { $t: 'colors.ink' }, opacity: 0.2, rotation: 2, x: 160, y: 780, width: 700, height: 58, zIndex: 3, editable: { content: true } }
    ]
  },

  // 2. 十大盘点倒计时封面 —— 左巨字 TOP10 + 右侧榜单行，盘点/排行区高频
  {
    id: 'video-bili-top10', name: '十大盘点倒计时封面', version: '1.0.0', category: 'video',
    tags: ['video', 'bilibili', 'top10', 'ranking', '16:9'],
    thumbnail: svgUri('<rect width="160" height="90" fill="%23101828"/><text x="12" y="34" font-family="Impact,sans-serif" font-size="14" fill="%23F8FAFC">TOP</text><text x="12" y="72" font-family="Impact,sans-serif" font-size="42" fill="%23FBBF24">10</text><rect x="70" y="16" width="80" height="14" rx="3" fill="none" stroke="%2394A3B8" stroke-dasharray="3 2"/><rect x="70" y="38" width="80" height="14" rx="3" fill="none" stroke="%2394A3B8" stroke-dasharray="3 2"/><rect x="70" y="60" width="80" height="14" rx="3" fill="none" stroke="%2394A3B8" stroke-dasharray="3 2"/><rect x="70" y="16" width="12" height="14" rx="6" fill="%23FBBF24"/><rect x="70" y="38" width="12" height="14" rx="6" fill="%23FBBF24"/><rect x="70" y="60" width="12" height="14" rx="6" fill="%23FBBF24"/>', 160, 90),
    tokens: {
      colors: {
        bg: { label: '底色', default: '#101828', options: ['#101828', '#1A0B0F', '#0B1D2E', '#241A0B'] },
        ink: { label: '主文字', default: '#F8FAFC', options: ['#F8FAFC', '#FFEAF3', '#EAF4FB', '#FFF6DE'] },
        gold: { label: '榜单金', default: '#FBBF24', options: ['#FBBF24', '#FF4D6D', '#4CC9F0', '#A78BFA'] },
        dim: { label: '弱文字', default: '#94A3B8', options: ['#94A3B8', '#C98BA7', '#7DA3C0', '#BFA76E'] }
      },
      fonts: { heading: { label: '标题字体', default: HEI, options: [HEI, IMPACT] } }
    },
    presets: [
      { name: '藏青金', colors: { bg: '#101828', ink: '#F8FAFC', gold: '#FBBF24', dim: '#94A3B8' } },
      { name: '暗夜红', colors: { bg: '#1A0B0F', ink: '#FFEAF3', gold: '#FF4D6D', dim: '#C98BA7' } },
      { name: '深海蓝', colors: { bg: '#0B1D2E', ink: '#EAF4FB', gold: '#4CC9F0', dim: '#7DA3C0' } },
      { name: '焦糖棕', colors: { bg: '#241A0B', ink: '#FFF6DE', gold: '#A78BFA', dim: '#BFA76E' } }
    ],
    canvas: { virtualWidth: 1920, virtualHeight: 1080, defaultWidth: 1920, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'tp-grid', type: 'image', src: gridBg(1920, 1080, 64, 'rgba(255,255,255,0.05)'), x: 0, y: 0, width: 1920, height: 1080, objectFit: 'fill', zIndex: 1 },
      { id: 'tp-top', type: 'text', content: 'TOP', fontFamily: IMPACT, fontSize: 130, letterSpacing: 12, color: { $t: 'colors.ink' }, x: 120, y: 150, width: 560, height: 150, zIndex: 3, editable: { content: true } },
      { id: 'tp-ten', type: 'text', content: '10', fontFamily: IMPACT, fontSize: 460, color: { $t: 'colors.gold' }, x: 110, y: 280, width: 580, height: 480, zIndex: 3, shadow: { offsetX: 0, offsetY: 0, blur: 64, color: { $t: 'colors.gold' } }, animation: { name: 'zoomIn', duration: 520 }, editable: { content: true, fontSize: { type: 'range', min: 280, max: 520 } } },
      { id: 'tp-row1-n', type: 'shape', shapeKind: 'circle', x: 700, y: 190, width: 104, height: 104, fill: { $t: 'colors.gold' }, zIndex: 4 },
      { id: 'tp-row1-t', type: 'text', content: '10', fontFamily: IMPACT, fontSize: 48, color: { $t: 'colors.bg' }, textAlign: 'center', x: 700, y: 218, width: 104, height: 52, zIndex: 5, editable: { content: true } },
      { id: 'tp-row1-bar', type: 'shape', shapeKind: 'rect', x: 830, y: 200, width: 970, height: 84, borderRadius: 16, border: { width: 3, color: { $t: 'colors.dim' } }, zIndex: 4, animation: { name: 'slideInRight', duration: 460 } },
      { id: 'tp-row1-cap', type: 'text', content: '榜单第 10 名 · 点我改标题', fontFamily: HEI, fontSize: 30, color: { $t: 'colors.dim' }, x: 870, y: 222, width: 880, height: 40, zIndex: 5, editable: { content: true } },
      { id: 'tp-row2-n', type: 'shape', shapeKind: 'circle', x: 700, y: 396, width: 104, height: 104, fill: { $t: 'colors.gold' }, zIndex: 4 },
      { id: 'tp-row2-t', type: 'text', content: '09', fontFamily: IMPACT, fontSize: 48, color: { $t: 'colors.bg' }, textAlign: 'center', x: 700, y: 424, width: 104, height: 52, zIndex: 5, editable: { content: true } },
      { id: 'tp-row2-bar', type: 'shape', shapeKind: 'rect', x: 830, y: 406, width: 970, height: 84, borderRadius: 16, border: { width: 3, color: { $t: 'colors.dim' } }, zIndex: 4, animation: { name: 'slideInRight', duration: 460, delay: 130 } },
      { id: 'tp-row2-cap', type: 'text', content: '榜单第 9 名 · 点我改标题', fontFamily: HEI, fontSize: 30, color: { $t: 'colors.dim' }, x: 870, y: 428, width: 880, height: 40, zIndex: 5, editable: { content: true } },
      { id: 'tp-row3-n', type: 'shape', shapeKind: 'circle', x: 700, y: 602, width: 104, height: 104, fill: { $t: 'colors.gold' }, zIndex: 4 },
      { id: 'tp-row3-t', type: 'text', content: '08', fontFamily: IMPACT, fontSize: 48, color: { $t: 'colors.bg' }, textAlign: 'center', x: 700, y: 630, width: 104, height: 52, zIndex: 5, editable: { content: true } },
      { id: 'tp-row3-bar', type: 'shape', shapeKind: 'rect', x: 830, y: 612, width: 970, height: 84, borderRadius: 16, border: { width: 3, color: { $t: 'colors.dim' } }, zIndex: 4, animation: { name: 'slideInRight', duration: 460, delay: 260 } },
      { id: 'tp-row3-cap', type: 'text', content: '榜单第 8 名 · 点我改标题', fontFamily: HEI, fontSize: 30, color: { $t: 'colors.dim' }, x: 870, y: 634, width: 880, height: 40, zIndex: 5, editable: { content: true } },
      { id: 'tp-title', type: 'text', content: '这些作品，看完直接改变人生', fontFamily: { $t: 'fonts.heading' }, fontSize: 76, fontWeight: 900, color: { $t: 'colors.ink' }, x: 700, y: 800, width: 1100, height: 96, zIndex: 6, animation: { name: 'fadeInUp', duration: 520, delay: 200 }, editable: { content: true, fontSize: { type: 'range', min: 48, max: 100 } } },
      { id: 'tp-sub', type: 'text', content: '个人向榜单 · 评论区欢迎对线', fontFamily: HEI, fontSize: 30, color: { $t: 'colors.dim' }, x: 700, y: 916, width: 800, height: 40, zIndex: 6, editable: { content: true } }
    ]
  },

  // 3. 生活VLOG胶片封面 —— 上下齿孔胶片条 + 相纸照片位 + 胶带贴纸，生活区标配
  {
    id: 'video-bili-vlog', name: '生活VLOG胶片封面', version: '1.0.0', category: 'video',
    tags: ['video', 'bilibili', 'vlog', 'film', '16:9'],
    thumbnail: svgUri('<rect width="160" height="90" fill="%23FFF6E9"/><rect width="160" height="10" fill="%23171310"/><rect y="80" width="160" height="10" fill="%23171310"/><g fill="%23FFF6E9"><rect x="8" y="3" width="9" height="4" rx="1.5"/><rect x="28" y="3" width="9" height="4" rx="1.5"/><rect x="48" y="3" width="9" height="4" rx="1.5"/><rect x="68" y="3" width="9" height="4" rx="1.5"/><rect x="88" y="3" width="9" height="4" rx="1.5"/><rect x="108" y="3" width="9" height="4" rx="1.5"/><rect x="128" y="3" width="9" height="4" rx="1.5"/><rect x="8" y="83" width="9" height="4" rx="1.5"/><rect x="28" y="83" width="9" height="4" rx="1.5"/><rect x="48" y="83" width="9" height="4" rx="1.5"/><rect x="68" y="83" width="9" height="4" rx="1.5"/><rect x="88" y="83" width="9" height="4" rx="1.5"/><rect x="108" y="83" width="9" height="4" rx="1.5"/><rect x="128" y="83" width="9" height="4" rx="1.5"/></g><rect x="18" y="26" width="56" height="42" rx="2" fill="%232B2118" opacity="0.1"/><rect x="16" y="24" width="56" height="42" rx="3" fill="none" stroke="%232B2118" stroke-width="2" stroke-dasharray="4 3"/><rect x="20" y="28" width="48" height="34" fill="none" stroke="%232B2118" stroke-width="0.8" opacity="0.4"/><rect x="8" y="20" width="18" height="6" fill="%23FFFFFF" opacity="0.75" transform="rotate(-34 17 23)"/><rect x="60" y="60" width="18" height="6" fill="%23FFFFFF" opacity="0.75" transform="rotate(30 69 63)"/><rect x="84" y="28" width="58" height="7" rx="1" fill="%232B2118"/><rect x="84" y="42" width="40" height="7" rx="1" fill="%232B2118" opacity="0.5"/><rect x="84" y="58" width="26" height="9" rx="4" fill="%23E8590C"/><g fill="%232B2118"><rect x="84" y="70" width="30" height="4" rx="1" opacity="0.6"/></g><circle cx="140" cy="18" r="2.6" fill="%23E8590C"/><rect x="145" y="16" width="12" height="4" rx="1" fill="%23E8590C" opacity="0.8"/><g fill="%23E8590C"><rect x="16" y="70" width="18" height="6" rx="1"/></g><g fill="%232B2118" opacity="0.7"><rect x="38" y="71" width="20" height="3" rx="1"/><rect x="84" y="76" width="26" height="2.4" rx="1"/><rect x="84" y="81" width="22" height="2.4" rx="1"/></g>', 160, 90),
    tokens: {
      colors: {
        bg: { label: '纸色', default: '#FFF6E9', options: ['#FFF6E9', '#EAF1F8', '#F6EAF3', '#EDF6E9'] },
        ink: { label: '主文字', default: '#2B2118', options: ['#2B2118', '#1C2733', '#331C2C', '#1C3324'] },
        accent: { label: '点缀橙', default: '#E8590C', options: ['#E8590C', '#3B82F6', '#C2255C', '#2F9E44'] },
        dim: { label: '弱文字', default: '#8C7A66', options: ['#8C7A66', '#6B7A8C', '#8C6B82', '#6B8C74'] }
      },
      fonts: { heading: { label: '标题字体', default: HEI, options: [HEI, SERIF] } }
    },
    presets: [
      { name: '奶油底', colors: { bg: '#FFF6E9', ink: '#2B2118', accent: '#E8590C', dim: '#8C7A66' } },
      { name: '雾蓝底', colors: { bg: '#EAF1F8', ink: '#1C2733', accent: '#3B82F6', dim: '#6B7A8C' } },
      { name: '藕粉底', colors: { bg: '#F6EAF3', ink: '#331C2C', accent: '#C2255C', dim: '#8C6B82' } },
      { name: '薄荷底', colors: { bg: '#EDF6E9', ink: '#1C3324', accent: '#2F9E44', dim: '#6B8C74' } }
    ],
    canvas: { virtualWidth: 1920, virtualHeight: 1080, defaultWidth: 1920, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'vl-strip-t', type: 'image', src: filmStrip(), x: 0, y: 0, width: 1920, height: 80, objectFit: 'fill', zIndex: 2 },
      { id: 'vl-strip-b', type: 'image', src: filmStrip(), x: 0, y: 1000, width: 1920, height: 80, objectFit: 'fill', zIndex: 2 },
      { id: 'vl-slot', type: 'shape', shapeKind: 'rect', x: 140, y: 190, width: 720, height: 640, borderRadius: 20, border: { width: 5, style: 'dashed', color: { $t: 'colors.ink' } }, zIndex: 3 },
      { id: 'vl-slot-t', type: 'text', content: '照片位 · 拖图替换', fontFamily: HEI, fontSize: 32, color: { $t: 'colors.dim' }, textAlign: 'center', x: 140, y: 490, width: 720, height: 44, zIndex: 4, editable: { content: true } },
      { id: 'vl-tape1', group: 'vl-tape', type: 'shape', shapeKind: 'rect', x: 70, y: 168, width: 190, height: 52, fill: 'rgba(255,255,255,0.62)', rotation: -38, zIndex: 5 },
      { id: 'vl-tape2', group: 'vl-tape', type: 'shape', shapeKind: 'rect', x: 740, y: 764, width: 190, height: 52, fill: 'rgba(255,255,255,0.62)', rotation: 34, zIndex: 5 },
      { id: 'vl-tag', type: 'shape', shapeKind: 'rect', x: 960, y: 196, width: 320, height: 64, borderRadius: 999, fill: { $t: 'colors.accent' }, zIndex: 4 },
      { id: 'vl-tag-t', type: 'text', content: 'VLOG · EP.07', fontFamily: MONO, fontSize: 30, fontWeight: 700, color: { $t: 'colors.bg' }, textAlign: 'center', x: 960, y: 212, width: 320, height: 34, zIndex: 5, editable: { content: true } },
      { id: 'vl-title', type: 'text', content: '独居生活\n第一周', fontFamily: { $t: 'fonts.heading' }, fontSize: 112, fontWeight: 900, color: { $t: 'colors.ink' }, lineHeight: 1.18, x: 960, y: 330, width: 820, height: 290, zIndex: 4, animation: { name: 'fadeInUp', duration: 560 }, editable: { content: true, fontSize: { type: 'range', min: 72, max: 150 } } },
      { id: 'vl-rule', type: 'shape', shapeKind: 'rect', x: 960, y: 650, width: 130, height: 9, borderRadius: 999, fill: { $t: 'colors.accent' }, zIndex: 4 },
      { id: 'vl-list', type: 'text', content: '房租 2300 · 一只猫 · 一盆小葱', fontFamily: HEI, fontSize: 38, color: { $t: 'colors.ink' }, x: 960, y: 692, width: 820, height: 52, zIndex: 4, editable: { content: true } },
      { id: 'vl-date', type: 'text', content: '2026.09 · 上海 · 晴天', fontFamily: MONO, fontSize: 30, letterSpacing: 3, color: { $t: 'colors.dim' }, x: 960, y: 780, width: 820, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'vl-shadow', type: 'shape', shapeKind: 'rect', x: 158, y: 208, width: 720, height: 640, borderRadius: 20, fill: { $t: 'colors.ink' }, opacity: 0.1, zIndex: 2 },
      { id: 'vl-frame', type: 'shape', shapeKind: 'rect', x: 168, y: 218, width: 664, height: 584, borderRadius: 12, border: { width: 3, color: { $t: 'colors.ink' } }, opacity: 0.35, zIndex: 3 },
      { id: 'vl-tape3', group: 'vl-tape', type: 'shape', shapeKind: 'rect', x: 700, y: 160, width: 190, height: 52, fill: 'rgba(255,255,255,0.62)', rotation: 34, zIndex: 5 },
      { id: 'vl-tape4', group: 'vl-tape', type: 'shape', shapeKind: 'rect', x: 60, y: 770, width: 190, height: 52, fill: 'rgba(255,255,255,0.62)', rotation: -32, zIndex: 5 },
      { id: 'vl-rec', type: 'shape', shapeKind: 'circle', x: 1700, y: 112, width: 26, height: 26, fill: { $t: 'colors.accent' }, zIndex: 5, animation: { name: 'blink', duration: 1400 } },
      { id: 'vl-rec-t', type: 'text', content: 'REC', fontFamily: MONO, fontSize: 26, fontWeight: 700, color: { $t: 'colors.accent' }, x: 1734, y: 108, width: 90, height: 34, zIndex: 5 },
      { id: 'vl-ts', type: 'shape', shapeKind: 'rect', x: 140, y: 858, width: 240, height: 60, borderRadius: 8, fill: { $t: 'colors.ink' }, zIndex: 5 },
      { id: 'vl-ts-t', type: 'text', content: '09:41 AM', fontFamily: MONO, fontSize: 30, color: { $t: 'colors.bg' }, textAlign: 'center', x: 140, y: 872, width: 240, height: 32, zIndex: 6, editable: { content: true } },
      { id: 'vl-gps-n', type: 'text', content: '31.2304°N  121.4737°E', fontFamily: MONO, fontSize: 28, letterSpacing: 2, color: { $t: 'colors.dim' }, x: 400, y: 866, width: 520, height: 38, zIndex: 5, editable: { content: true } },
      { id: 'vl-gps-c', type: 'text', content: '上海 · 徐汇 · 老小区 6 楼', fontFamily: HEI, fontSize: 30, color: { $t: 'colors.ink' }, opacity: 0.85, x: 140, y: 930, width: 700, height: 44, zIndex: 5, editable: { content: true } },
      { id: 'vl-todo-h', type: 'text', content: '今日三件事 · 都是小事', fontFamily: HEI, fontSize: 30, fontWeight: 700, color: { $t: 'colors.accent' }, x: 960, y: 846, width: 700, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'vl-todo1', type: 'text', content: '□ 换客厅灯泡 · 拧了半小时', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.ink' }, x: 960, y: 890, width: 820, height: 32, zIndex: 4, editable: { content: true } },
      { id: 'vl-todo2', type: 'text', content: '□ 修厨房水龙头 · 待求助', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.ink' }, x: 960, y: 924, width: 820, height: 32, zIndex: 4, editable: { content: true } },
      { id: 'vl-todo3', type: 'text', content: '☑ 给猫洗澡 · 已阵亡（是我）', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.dim' }, x: 960, y: 958, width: 820, height: 32, zIndex: 4, editable: { content: true } }
    ]
  },

  // 4. 三步教程速成封面 —— 三张步骤卡 + 箭头串联，教程/技能区干货感
  {
    id: 'video-bili-steps', name: '三步教程速成封面', version: '1.0.0', category: 'video',
    tags: ['video', 'bilibili', 'tutorial', 'steps', '16:9'],
    thumbnail: svgUri('<rect width="160" height="90" fill="%230E5C3F"/><rect x="12" y="12" width="40" height="8" rx="4" fill="%238AC926"/><rect x="12" y="26" width="96" height="10" rx="2" fill="%23F2FAF5"/><rect x="16" y="48" width="38" height="30" rx="4" fill="%23FFFFFF" opacity="0.14"/><rect x="60" y="48" width="38" height="30" rx="4" fill="%23FFFFFF" opacity="0.14"/><rect x="104" y="48" width="38" height="30" rx="4" fill="%23FFFFFF" opacity="0.14"/><circle cx="22" cy="46" r="6" fill="%238AC926"/><circle cx="66" cy="46" r="6" fill="%238AC926"/><circle cx="110" cy="46" r="6" fill="%238AC926"/><rect x="12" y="82" width="52" height="4" rx="2" fill="%23A7C9BC"/>', 160, 90),
    tokens: {
      colors: {
        bg: { label: '底色', default: '#0E5C3F', options: ['#0E5C3F', '#143C63', '#5C1428', '#233A94'] },
        ink: { label: '主文字', default: '#F2FAF5', options: ['#F2FAF5', '#EAF2FA', '#FAEAF0', '#ECEEFB'] },
        accent: { label: '强调色', default: '#8AC926', options: ['#8AC926', '#4CC9F0', '#FFB703', '#F472B6'] },
        card: { label: '卡片底', default: 'rgba(255,255,255,0.08)', options: ['rgba(255,255,255,0.08)', 'rgba(0,0,0,0.18)', 'rgba(255,255,255,0.14)'] },
        dim: { label: '弱文字', default: '#A7C9BC', options: ['#A7C9BC', '#9DB6CC', '#CC9DB0', '#ADB4D6'] }
      },
      fonts: { heading: { label: '标题字体', default: HEI, options: [HEI, IMPACT] } }
    },
    presets: [
      { name: '黑板绿', colors: { bg: '#0E5C3F', ink: '#F2FAF5', accent: '#8AC926', card: 'rgba(255,255,255,0.08)', dim: '#A7C9BC' } },
      { name: '讲堂蓝', colors: { bg: '#143C63', ink: '#EAF2FA', accent: '#4CC9F0', card: 'rgba(255,255,255,0.08)', dim: '#9DB6CC' } },
      { name: '夜校红', colors: { bg: '#5C1428', ink: '#FAEAF0', accent: '#FFB703', card: 'rgba(0,0,0,0.18)', dim: '#CC9DB0' } },
      { name: '网课紫', colors: { bg: '#233A94', ink: '#ECEEFB', accent: '#F472B6', card: 'rgba(255,255,255,0.14)', dim: '#ADB4D6' } }
    ],
    canvas: { virtualWidth: 1920, virtualHeight: 1080, defaultWidth: 1920, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'st-grid', type: 'image', src: gridBg(1920, 1080, 72, 'rgba(255,255,255,0.06)'), x: 0, y: 0, width: 1920, height: 1080, objectFit: 'fill', zIndex: 1 },
      { id: 'st-kicker', type: 'shape', shapeKind: 'rect', x: 120, y: 76, width: 260, height: 58, borderRadius: 999, fill: { $t: 'colors.accent' }, zIndex: 3 },
      { id: 'st-kicker-t', type: 'text', content: '保姆级教程', fontFamily: HEI, fontSize: 28, fontWeight: 700, color: { $t: 'colors.bg' }, textAlign: 'center', x: 120, y: 90, width: 260, height: 32, zIndex: 4, editable: { content: true } },
      { id: 'st-title', type: 'text', content: '3 步搞定\n直播推流全流程', fontFamily: { $t: 'fonts.heading' }, fontSize: 104, fontWeight: 900, color: { $t: 'colors.ink' }, lineHeight: 1.16, x: 120, y: 170, width: 1500, height: 250, zIndex: 3, animation: { name: 'fadeIn', duration: 460 }, editable: { content: true, fontSize: { type: 'range', min: 64, max: 140 } } },
      { id: 'st-c1', group: 'st-c', type: 'shape', shapeKind: 'rect', x: 120, y: 500, width: 500, height: 400, borderRadius: 28, fill: { $t: 'colors.card' }, zIndex: 3 },
      { id: 'st-c1-n', type: 'shape', shapeKind: 'circle', x: 150, y: 462, width: 104, height: 104, fill: { $t: 'colors.accent' }, zIndex: 4 },
      { id: 'st-c1-nt', type: 'text', content: '01', fontFamily: IMPACT, fontSize: 46, color: { $t: 'colors.bg' }, textAlign: 'center', x: 150, y: 488, width: 104, height: 52, zIndex: 5, editable: { content: true } },
      { id: 'st-c1-t', type: 'text', content: '准备物料', fontFamily: HEI, fontSize: 52, fontWeight: 700, color: { $t: 'colors.ink' }, x: 160, y: 600, width: 420, height: 66, zIndex: 4, animation: { name: 'rise', duration: 520 }, editable: { content: true } },
      { id: 'st-c1-s', type: 'text', content: '设备清单与检查项\n一次列全', fontFamily: HEI, fontSize: 30, color: { $t: 'colors.dim' }, lineHeight: 1.5, x: 160, y: 690, width: 420, height: 110, zIndex: 4, editable: { content: true } },
      { id: 'st-a1', type: 'text', content: '→', fontFamily: SANS, fontSize: 90, color: { $t: 'colors.accent' }, textAlign: 'center', x: 626, y: 650, width: 78, height: 100, zIndex: 4 },
      { id: 'st-c2', group: 'st-c', type: 'shape', shapeKind: 'rect', x: 710, y: 500, width: 500, height: 400, borderRadius: 28, fill: { $t: 'colors.card' }, zIndex: 3 },
      { id: 'st-c2-n', type: 'shape', shapeKind: 'circle', x: 740, y: 462, width: 104, height: 104, fill: { $t: 'colors.accent' }, zIndex: 4 },
      { id: 'st-c2-nt', type: 'text', content: '02', fontFamily: IMPACT, fontSize: 46, color: { $t: 'colors.bg' }, textAlign: 'center', x: 740, y: 488, width: 104, height: 52, zIndex: 5, editable: { content: true } },
      { id: 'st-c2-t', type: 'text', content: '参数设置', fontFamily: HEI, fontSize: 52, fontWeight: 700, color: { $t: 'colors.ink' }, x: 750, y: 600, width: 420, height: 66, zIndex: 4, animation: { name: 'rise', duration: 520, delay: 140 }, editable: { content: true } },
      { id: 'st-c2-s', type: 'text', content: '码率 / 分辨率 /\n音频延迟抄作业', fontFamily: HEI, fontSize: 30, color: { $t: 'colors.dim' }, lineHeight: 1.5, x: 750, y: 690, width: 420, height: 110, zIndex: 4, editable: { content: true } },
      { id: 'st-a2', type: 'text', content: '→', fontFamily: SANS, fontSize: 90, color: { $t: 'colors.accent' }, textAlign: 'center', x: 1216, y: 650, width: 78, height: 100, zIndex: 4 },
      { id: 'st-c3', group: 'st-c', type: 'shape', shapeKind: 'rect', x: 1300, y: 500, width: 500, height: 400, borderRadius: 28, fill: { $t: 'colors.card' }, zIndex: 3 },
      { id: 'st-c3-n', type: 'shape', shapeKind: 'circle', x: 1330, y: 462, width: 104, height: 104, fill: { $t: 'colors.accent' }, zIndex: 4 },
      { id: 'st-c3-nt', type: 'text', content: '03', fontFamily: IMPACT, fontSize: 46, color: { $t: 'colors.bg' }, textAlign: 'center', x: 1330, y: 488, width: 104, height: 52, zIndex: 5, editable: { content: true } },
      { id: 'st-c3-t', type: 'text', content: '一键开播', fontFamily: HEI, fontSize: 52, fontWeight: 700, color: { $t: 'colors.ink' }, x: 1340, y: 600, width: 420, height: 66, zIndex: 4, animation: { name: 'rise', duration: 520, delay: 280 }, editable: { content: true } },
      { id: 'st-c3-s', type: 'text', content: '自检清单过一遍\n直接推流', fontFamily: HEI, fontSize: 30, color: { $t: 'colors.dim' }, lineHeight: 1.5, x: 1340, y: 690, width: 420, height: 110, zIndex: 4, editable: { content: true } },
      { id: 'st-foot', type: 'text', content: '全文参数表放在置顶评论 · 拿走不谢', fontFamily: HEI, fontSize: 32, color: { $t: 'colors.dim' }, x: 120, y: 960, width: 900, height: 44, zIndex: 3, editable: { content: true } }
    ]
  },

  // 5. 悬念涂条解密封面 —— 黑底白字打黑条 + 解密印章，纪实/吃瓜/案件区高频
  {
    id: 'video-bili-mystery', name: '悬念涂条解密封面', version: '1.0.0', category: 'video',
    tags: ['video', 'bilibili', 'mystery', 'true-crime', '16:9'],
    thumbnail: svgUri('<rect width="160" height="90" fill="%230B0B0F"/><circle cx="112" cy="22" r="26" fill="%23E11D48" opacity="0.07"/><text x="122" y="48" font-family="Impact,sans-serif" font-size="42" fill="%23F5F5F5" opacity="0.09" text-anchor="middle">?</text><line x1="60" y1="27" x2="118" y2="67.5" stroke="%23E11D48" stroke-width="1.1" opacity="0.55"/><line x1="58" y1="39" x2="117" y2="19" stroke="%23E11D48" stroke-width="1" opacity="0.45"/><rect x="10" y="9" width="30" height="2.6" rx="1" fill="%23E11D48" opacity="0.9"/><rect x="27" y="8.2" width="9" height="4.2" fill="%230B0B0F"/><rect x="10" y="21" width="72" height="10" rx="1" fill="%23F5F5F5"/><rect x="39" y="21" width="21" height="10" fill="%230B0B0F"/><circle cx="39.6" cy="21.6" r="1.7" fill="%23E11D48"/><rect x="10" y="36" width="72" height="10" rx="1" fill="%23F5F5F5"/><rect x="39.5" y="36" width="21" height="10" fill="%230B0B0F"/><circle cx="59" cy="36.6" r="1.7" fill="%23E11D48"/><circle cx="112" cy="23" r="8.5" fill="none" stroke="%23E11D48" stroke-width="2"/><line x1="118" y1="29.5" x2="126" y2="37" stroke="%23E11D48" stroke-width="2.6" stroke-linecap="round"/><text x="130" y="45" font-family="Impact,sans-serif" font-size="9" fill="%23E11D48" opacity="0.85">?</text><text x="142" y="35" font-family="Impact,sans-serif" font-size="6" fill="%23F5F5F5" opacity="0.4">?</text><circle cx="130" cy="67.5" r="12.5" fill="none" stroke="%23E11D48" stroke-width="2.4"/><text x="130" y="70" font-family="serif" font-size="9" fill="%23E11D48" text-anchor="middle">密</text><text x="130" y="75" font-family="monospace" font-size="2.6" fill="%23E11D48" text-anchor="middle">CLASSIFIED</text><text x="10" y="53" font-family="monospace" font-size="5" fill="%23E11D48">NO.0417</text><rect x="10" y="56" width="40" height="3" rx="1" fill="%23F5F5F5" opacity="0.5"/><rect x="10" y="62" width="19" height="5.5" rx="2.7" fill="none" stroke="%23E11D48" stroke-width="1"/><text x="12" y="66.4" font-family="monospace" font-size="4" fill="%23E11D48">32:14</text><rect x="31" y="63.4" width="12" height="2.6" rx="1" fill="%239CA3AF" opacity="0.8"/><rect x="10" y="78" width="52" height="3" rx="1" fill="%239CA3AF" opacity="0.75"/>', 160, 90),
    tokens: {
      colors: {
        bg: { label: '底色', default: '#0B0B0F', options: ['#0B0B0F', '#0F0B14', '#0B1014', '#140F0B'] },
        ink: { label: '主文字', default: '#F5F5F5', options: ['#F5F5F5', '#EAE6DA', '#DDE8EE', '#EFE2E2'] },
        red: { label: '机密红', default: '#E11D48', options: ['#E11D48', '#DC2626', '#F97316', '#A3E635'] },
        dim: { label: '弱文字', default: '#9CA3AF', options: ['#9CA3AF', '#A78BC9', '#7FA3B0', '#B0917F'] }
      },
      fonts: { heading: { label: '标题字体', default: HEI, options: [HEI, SONG] } }
    },
    presets: [
      { name: '档案黑', colors: { bg: '#0B0B0F', ink: '#F5F5F5', red: '#E11D48', dim: '#9CA3AF' } },
      { name: '午夜紫', colors: { bg: '#0F0B14', ink: '#EAE6DA', red: '#A3E635', dim: '#A78BC9' } },
      { name: '深海青', colors: { bg: '#0B1014', ink: '#DDE8EE', red: '#F97316', dim: '#7FA3B0' } },
      { name: '旧纸褐', colors: { bg: '#140F0B', ink: '#EFE2E2', red: '#DC2626', dim: '#B0917F' } }
    ],
    canvas: { virtualWidth: 1920, virtualHeight: 1080, defaultWidth: 1920, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'my-fog', type: 'overlay', background: 'radial-gradient(circle at 72% 26%, rgba(225,29,72,0.16), transparent 46%)', x: 0, y: 0, width: 1920, height: 1080, zIndex: 1 },
      { id: 'my-qbg', type: 'text', content: '?', fontFamily: IMPACT, fontSize: 860, color: { $t: 'colors.ink' }, opacity: 0.06, textAlign: 'center', x: 1150, y: 60, width: 720, height: 920, zIndex: 2, animation: { name: 'drift', duration: 6000 } },
      { id: 'my-kicker', type: 'text', content: 'TRUE STORY · 档案 04', fontFamily: MONO, fontSize: 30, letterSpacing: 8, color: { $t: 'colors.red' }, x: 120, y: 120, width: 800, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'my-t1', type: 'text', content: '这件事不能报道', fontFamily: { $t: 'fonts.heading' }, fontSize: 118, fontWeight: 900, letterSpacing: 6, color: { $t: 'colors.ink' }, x: 120, y: 250, width: 1300, height: 150, zIndex: 4, animation: { name: 'fadeInUp', duration: 520 }, editable: { content: true, fontSize: { type: 'range', min: 72, max: 150 } } },
      { id: 'my-bar1', group: 'my-bar', type: 'shape', shapeKind: 'rect', x: 466, y: 258, width: 256, height: 132, fill: { $t: 'colors.bg' }, zIndex: 5 },
      { id: 'my-t2', type: 'text', content: '也没有人敢讲', fontFamily: { $t: 'fonts.heading' }, fontSize: 118, fontWeight: 900, letterSpacing: 6, color: { $t: 'colors.ink' }, x: 120, y: 430, width: 1300, height: 150, zIndex: 4, animation: { name: 'fadeInUp', duration: 520, delay: 130 }, editable: { content: true, fontSize: { type: 'range', min: 72, max: 150 } } },
      { id: 'my-bar2', group: 'my-bar', type: 'shape', shapeKind: 'rect', x: 472, y: 438, width: 256, height: 132, fill: { $t: 'colors.bg' }, zIndex: 5 },
      { id: 'my-q1', type: 'text', content: '?', fontFamily: IMPACT, fontSize: 120, color: { $t: 'colors.red' }, x: 1560, y: 480, width: 120, height: 140, zIndex: 5, animation: { name: 'twinkle', duration: 2400 } },
      { id: 'my-q2', type: 'text', content: '?', fontFamily: IMPACT, fontSize: 72, color: { $t: 'colors.ink' }, opacity: 0.35, x: 1700, y: 400, width: 90, height: 90, zIndex: 5, animation: { name: 'twinkle', duration: 2400, delay: 800 } },
      { id: 'my-stamp', type: 'shape', shapeKind: 'circle', x: 1420, y: 660, width: 300, height: 300, border: { width: 10, color: { $t: 'colors.red' } }, rotation: -12, zIndex: 6, animation: { name: 'zoomIn', duration: 420, delay: 320 } },
      { id: 'my-stamp-t', type: 'text', content: '解密', fontFamily: SONG, fontSize: 88, fontWeight: 700, color: { $t: 'colors.red' }, textAlign: 'center', rotation: -12, x: 1420, y: 722, width: 300, height: 100, zIndex: 7, editable: { content: true } },
      { id: 'my-stamp-s', type: 'text', content: 'CLASSIFIED', fontFamily: MONO, fontSize: 24, letterSpacing: 6, color: { $t: 'colors.red' }, textAlign: 'center', rotation: -12, x: 1420, y: 838, width: 300, height: 32, zIndex: 7 },
      { id: 'my-sub', type: 'text', content: '信源已核实 · 本期为纪录片完整版', fontFamily: HEI, fontSize: 34, color: { $t: 'colors.dim' }, x: 120, y: 940, width: 900, height: 46, zIndex: 4, editable: { content: true } },
      // 放大镜（线索板）：圆环 + 45° 手柄，压在涂条与印章之间
      { id: 'my-lens', type: 'shape', shapeKind: 'circle', x: 1240, y: 176, width: 210, height: 210, border: { width: 12, color: { $t: 'colors.red' } }, zIndex: 4, animation: { name: 'float', duration: 4200 } },
      { id: 'my-lens-h', type: 'shape', shapeKind: 'rect', x: 1424, y: 372, width: 150, height: 26, borderRadius: 13, fill: { $t: 'colors.red' }, rotation: 42, zIndex: 4 },
      // 线索红线：两条各自从涂条边缘拉到印章 / 放大镜底下，交叉成案板线
      { id: 'my-thread-a', type: 'shape', shapeKind: 'line', x: 645.8, y: 565, width: 850.5, height: 4, border: { width: 4, color: { $t: 'colors.red' } }, fill: { $t: 'colors.red' }, opacity: 0.4, rotation: 34.9, zIndex: 3 },
      { id: 'my-thread-b', type: 'shape', shapeKind: 'line', x: 695, y: 365, width: 731.5, height: 4, border: { width: 4, color: { $t: 'colors.red' } }, fill: { $t: 'colors.red' }, opacity: 0.32, rotation: -22, zIndex: 3 },
      { id: 'my-pin1', type: 'shape', shapeKind: 'circle', x: 456, y: 246, width: 22, height: 22, fill: { $t: 'colors.red' }, zIndex: 6 },
      { id: 'my-pin2', type: 'shape', shapeKind: 'circle', x: 700, y: 424, width: 22, height: 22, fill: { $t: 'colors.red' }, zIndex: 6 },
      { id: 'my-arrow', type: 'text', content: '↘', fontFamily: SANS, fontSize: 92, fontWeight: 700, color: { $t: 'colors.red' }, x: 372, y: 166, width: 104, height: 82, zIndex: 6 },
      // 档案信息列：编号 / 未结说明 / 时长胶囊
      { id: 'my-bar3', group: 'my-bar', type: 'shape', shapeKind: 'rect', x: 470, y: 124, width: 150, height: 34, fill: { $t: 'colors.bg' }, zIndex: 5 },
      { id: 'my-no', type: 'text', content: 'NO.0417', fontFamily: MONO, fontSize: 30, fontWeight: 700, letterSpacing: 6, color: { $t: 'colors.red' }, x: 120, y: 620, width: 320, height: 40, zIndex: 5, editable: { content: true } },
      { id: 'my-tag', type: 'text', content: '未结档案 · 全城共 3 起同类', fontFamily: HEI, fontSize: 30, color: { $t: 'colors.ink' }, opacity: 0.82, x: 120, y: 672, width: 760, height: 42, zIndex: 5, editable: { content: true } },
      { id: 'my-dur', type: 'shape', shapeKind: 'rect', x: 120, y: 736, width: 230, height: 58, borderRadius: 999, border: { width: 3, color: { $t: 'colors.red' } }, zIndex: 5 },
      { id: 'my-dur-t', type: 'text', content: '32:14', fontFamily: MONO, fontSize: 30, fontWeight: 700, color: { $t: 'colors.red' }, textAlign: 'center', x: 120, y: 750, width: 230, height: 40, zIndex: 6, editable: { content: true } },
      { id: 'my-dur-cap', type: 'text', content: '正片时长', fontFamily: HEI, fontSize: 24, color: { $t: 'colors.dim' }, x: 370, y: 752, width: 170, height: 36, zIndex: 5, editable: { content: true } }
    ]
  },

  // 6. 播客对谈金句封面 —— 双对话气泡 + 双嘉宾头像位，播客/访谈切片高频
  {
    id: 'video-bili-podcast', name: '播客对谈金句封面', version: '1.0.0', category: 'video',
    tags: ['video', 'bilibili', 'podcast', 'talk', '16:9'],
    thumbnail: svgUri('<rect width="160" height="90" fill="%231C1917"/><rect x="14" y="14" width="76" height="22" rx="8" fill="%23FAF3E8"/><rect x="70" y="36" width="9" height="9" fill="%23FAF3E8" transform="rotate(45 74 40)"/><rect x="70" y="44" width="76" height="22" rx="8" fill="%23F59E0B"/><rect x="82" y="35" width="9" height="9" fill="%23F59E0B" transform="rotate(45 86 40)"/><rect x="22" y="20" width="52" height="4" rx="1" fill="%231C1917" opacity="0.6"/><rect x="84" y="50" width="52" height="4" rx="1" fill="%231C1917" opacity="0.6"/><rect x="26" y="74" width="80" height="7" rx="1" fill="%23FAF3E8"/>', 160, 90),
    tokens: {
      colors: {
        bg: { label: '底色', default: '#1C1917', options: ['#1C1917', '#101820', '#1A1424', '#0F1C18'] },
        ink: { label: '主文字', default: '#FAF3E8', options: ['#FAF3E8', '#E8EEF4', '#EFE8F6', '#E6F0EA'] },
        bubble: { label: '气泡白', default: '#FAF3E8', options: ['#FAF3E8', '#FDF6EC', '#F1F5F9'] },
        amber: { label: '强调琥珀', default: '#F59E0B', options: ['#F59E0B', '#22C55E', '#38BDF8', '#A78BFA'] },
        dim: { label: '弱文字', default: '#A8A29E', options: ['#A8A29E', '#8A93A3', '#9B8AAE', '#7FA291'] }
      },
      fonts: { heading: { label: '标题字体', default: HEI, options: [HEI, SERIF] } }
    },
    presets: [
      { name: '暖褐', colors: { bg: '#1C1917', ink: '#FAF3E8', bubble: '#FAF3E8', amber: '#F59E0B', dim: '#A8A29E' } },
      { name: '冷碳', colors: { bg: '#101820', ink: '#E8EEF4', bubble: '#F1F5F9', amber: '#38BDF8', dim: '#8A93A3' } },
      { name: '暗紫', colors: { bg: '#1A1424', ink: '#EFE8F6', bubble: '#EFE8F6', amber: '#A78BFA', dim: '#9B8AAE' } },
      { name: '森林', colors: { bg: '#0F1C18', ink: '#E6F0EA', bubble: '#FDF6EC', amber: '#22C55E', dim: '#7FA291' } }
    ],
    canvas: { virtualWidth: 1920, virtualHeight: 1080, defaultWidth: 1920, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'pd-dots', type: 'image', src: dotsBg(1920, 1080, 64, 'rgba(255,255,255,0.05)'), x: 0, y: 0, width: 1920, height: 1080, objectFit: 'fill', zIndex: 1 },
      { id: 'pd-mark-l', type: 'text', content: '「', fontFamily: SERIF, fontSize: 300, color: { $t: 'colors.dim' }, opacity: 0.35, x: 60, y: 120, width: 320, height: 320, zIndex: 2 },
      { id: 'pd-mark-r', type: 'text', content: '」', fontFamily: SERIF, fontSize: 300, color: { $t: 'colors.dim' }, opacity: 0.35, x: 1540, y: 620, width: 320, height: 320, zIndex: 2 },
      { id: 'pd-kicker', type: 'text', content: 'PODCAST CLIP · VOL.23', fontFamily: MONO, fontSize: 30, letterSpacing: 8, color: { $t: 'colors.amber' }, x: 140, y: 108, width: 800, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'pd-b1', type: 'shape', shapeKind: 'rect', x: 140, y: 190, width: 920, height: 170, borderRadius: 32, fill: { $t: 'colors.bubble' }, zIndex: 4, animation: { name: 'fadeInUp', duration: 480 } },
      { id: 'pd-b1-tail', type: 'shape', shapeKind: 'rect', x: 230, y: 340, width: 48, height: 48, fill: { $t: 'colors.bubble' }, rotation: 45, zIndex: 4 },
      { id: 'pd-b1-t', type: 'text', content: '为什么大家突然\n都开始聊存钱？', fontFamily: HEI, fontSize: 44, fontWeight: 700, color: { $t: 'colors.bg' }, lineHeight: 1.35, x: 200, y: 218, width: 800, height: 130, zIndex: 5, editable: { content: true } },
      { id: 'pd-b2', type: 'shape', shapeKind: 'rect', x: 860, y: 440, width: 920, height: 170, borderRadius: 32, fill: { $t: 'colors.amber' }, zIndex: 4, animation: { name: 'fadeInUp', duration: 480, delay: 180 } },
      { id: 'pd-b2-tail', type: 'shape', shapeKind: 'rect', x: 1642, y: 590, width: 48, height: 48, fill: { $t: 'colors.amber' }, rotation: 45, zIndex: 4 },
      { id: 'pd-b2-t', type: 'text', content: '因为工资涨得\n比不过利息', fontFamily: HEI, fontSize: 44, fontWeight: 700, color: { $t: 'colors.bg' }, lineHeight: 1.35, x: 920, y: 468, width: 800, height: 130, zIndex: 5, editable: { content: true } },
      { id: 'pd-av-l', type: 'shape', shapeKind: 'circle', x: 140, y: 660, width: 150, height: 150, border: { width: 5, style: 'dashed', color: { $t: 'colors.dim' } }, zIndex: 5 },
      { id: 'pd-av-l-t', type: 'text', content: '主播', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.dim' }, x: 310, y: 706, width: 140, height: 36, zIndex: 5, editable: { content: true } },
      { id: 'pd-av-r', type: 'shape', shapeKind: 'circle', x: 1630, y: 660, width: 150, height: 150, border: { width: 5, style: 'dashed', color: { $t: 'colors.amber' } }, zIndex: 5 },
      { id: 'pd-av-r-t', type: 'text', content: '嘉宾', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.amber' }, textAlign: 'right', x: 1440, y: 706, width: 140, height: 36, zIndex: 5, editable: { content: true } },
      { id: 'pd-title', type: 'text', content: '这一期，我们聊聊钱的事', fontFamily: { $t: 'fonts.heading' }, fontSize: 88, fontWeight: 900, color: { $t: 'colors.ink' }, textAlign: 'center', letterSpacing: 3, x: 260, y: 860, width: 1400, height: 110, zIndex: 6, animation: { name: 'slideUpFade', duration: 520, delay: 260 }, editable: { content: true, fontSize: { type: 'range', min: 56, max: 120 } } }
    ]
  }
]

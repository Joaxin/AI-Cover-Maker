// src/core/templates/video/music-covers.ts —— 音乐区博主封面批（16:9 · 1920×1080）
// 口径：流派盘点（10首歌听懂XX）/ 深夜歌单播放器 / 专辑复盘评分 / 现场合唱 / 乐理和弦 五个高频形态。
import type { Template } from '@/types/types'
import { HEI, SONG, IMPACT, MONO, SANS, SERIF } from '../_fx/trend'
import { dotsBg } from '../knowledge/_decor'
import { svgUri } from '../_fx/common'

// 黑胶唱片：暗色盘面 + 细纹，标签/中心孔由模板内 shape 走 token 上色
const RECORD_URI = (() => {
  const grooves = [292, 262, 232, 202, 172].map(r => `<circle cx="320" cy="320" r="${r}" fill="none" stroke="rgba(255,255,255,0.10)" stroke-width="2"/>`).join('')
  return svgUri(`<circle cx="320" cy="320" r="318" fill="%230A0A0C"/>${grooves}<circle cx="320" cy="320" r="318" fill="none" stroke="rgba(255,255,255,0.16)" stroke-width="3"/>`, 640, 640)
})()
// 均衡器波形：整幅 1920×88，64 根圆角柱
function waveUri(fill: string) {
  const bars = Array.from({ length: 64 }, (_, i) => {
    const bh = Math.max(10, Math.round(80 * Math.abs(Math.sin(i * 0.55) * Math.cos(i * 0.17))))
    return `<rect x="${i * 30 + 6}" y="${(88 - bh) / 2}" width="10" height="${bh}" rx="5" fill="${fill}"/>`
  }).join('')
  return svgUri(bars, 1920, 88)
}
// 演唱会人海手机灯：确定性伪随机散布的小亮点（下半幅）
function lightsUri() {
  let dots = ''
  for (let i = 0; i < 90; i++) {
    dots += `<circle cx="${(i * 197 + 60) % 1920}" cy="${720 + (i * 113) % 330}" r="${4 + i % 4}" fill="rgba(255,217,92,0.85)"/>`
  }
  return svgUri(dots, 1920, 1080)
}
// 麦克风
const MIC_URI = svgUri('<g stroke-linecap="round"><rect x="128" y="16" width="104" height="176" rx="52" fill="%23FFD95C"/><g fill="none" stroke="%23FFD95C" stroke-width="14"><path d="M82 156 C 82 258 278 258 278 156"/><path d="M180 248 L180 336"/><path d="M118 344 L242 344"/></g></g>', 360, 360)
// 均衡器竖条组：n 根圆角柱自底部向上生长，高度按正弦错落（现场/直播类封面的音量条语言）
function mixEqUri(bars: number, w: number, h: number, fill: string, seed = 2) {
  const step = w / bars
  let barsSvg = ''
  for (let i = 0; i < bars; i++) {
    const bh = Math.max(h * 0.17, Math.abs(Math.sin((i + seed) * 0.86) * Math.cos(i * 0.27)) * h)
    barsSvg += `<rect x="${(i * step + step * 0.24).toFixed(1)}" y="${(h - bh).toFixed(1)}" width="${(step * 0.52).toFixed(1)}" height="${bh.toFixed(1)}" rx="${(step * 0.26).toFixed(1)}" fill="${fill}"/>`
  }
  return svgUri(barsSvg, w, h)
}
// 钢琴键盘：14 白键 + 10 黑键，整幅 1920×300
const KEYS_URI = (() => {
  const W = 1920 / 14
  const whites = Array.from({ length: 14 }, (_, i) => `<rect x="${(i * W + 1).toFixed(1)}" y="1" width="${(W - 2).toFixed(1)}" height="298" fill="%23FFFFFF" stroke="%231F2937" stroke-width="3"/>`).join('')
  const blacks = [0, 1, 3, 4, 5, 7, 8, 10, 11, 12].map(i => `<rect x="${((i + 1) * W - 30).toFixed(1)}" y="0" width="58" height="168" fill="%231F2937"/>`).join('')
  return svgUri(`${whites}${blacks}`, 1920, 300)
})()

export const musicCoverTemplates: Template[] = [
  // 1. 流派盘点封面 —— 「10首歌听懂一个流派」，黑胶缓转 + 曲目单，音乐科普区招牌
  {
    id: 'video-mix-genre', name: '流派盘点黑胶封面', version: '1.0.0', category: 'music',
    tags: ['video', 'music', 'genre', 'vinyl', '16:9'],
    thumbnail: svgUri('<rect width="160" height="90" fill="%23141019"/><circle cx="122" cy="45" r="30" fill="%230A0A0C" stroke="rgba(255,255,255,0.18)" stroke-width="2"/><circle cx="122" cy="45" r="21" fill="none" stroke="rgba(255,255,255,0.10)" stroke-width="1"/><circle cx="122" cy="45" r="9" fill="%23E8B44A"/><circle cx="122" cy="45" r="2.4" fill="%23141019"/><rect x="12" y="16" width="26" height="7" rx="3" fill="%23E8B44A"/><g fill="none" stroke="%23E8B44A" stroke-width="1"><rect x="44" y="16" width="20" height="7" rx="3.5"/><rect x="68" y="16" width="20" height="7" rx="3.5"/></g><rect x="92" y="16" width="18" height="7" rx="3.5" fill="%23E8B44A"/><text x="14" y="42" font-family="Impact,sans-serif" font-size="26" fill="%239C8F7A" opacity="0.5">10</text><text x="12" y="40" font-family="Impact,sans-serif" font-size="26" fill="%23E8B44A">10</text><rect x="14" y="47" width="60" height="7" rx="1" fill="%23E8B44A" opacity="0.4"/><rect x="12" y="45" width="60" height="7" rx="1" fill="%23F7F1E3"/><rect x="12" y="58" width="70" height="4" rx="1" fill="%239C8F7A"/><rect x="12" y="66" width="52" height="4" rx="1" fill="%239C8F7A" opacity="0.7"/><rect x="12" y="74" width="62" height="4" rx="1" fill="%239C8F7A" opacity="0.5"/><g fill="%23E8B44A"><rect x="16" y="86" width="30" height="2" rx="1"/></g><g fill="%23F7F1E3" opacity="0.18"><rect x="96" y="62" width="3" height="14" rx="1.5"/><rect x="103" y="68" width="3" height="8" rx="1.5"/><rect x="110" y="56" width="3" height="20" rx="1.5"/><rect x="117" y="66" width="3" height="10" rx="1.5"/><rect x="124" y="52" width="3" height="24" rx="1.5"/><rect x="131" y="64" width="3" height="12" rx="1.5"/><rect x="138" y="58" width="3" height="18" rx="1.5"/><rect x="145" y="70" width="3" height="6" rx="1.5"/><rect x="152" y="62" width="3" height="14" rx="1.5"/></g><rect x="0" y="84" width="90" height="1.5" fill="%23F7F1E3" opacity="0.12"/>', 160, 90),
    tokens: {
      colors: {
        bg: { label: '底色', default: '#141019', options: ['#141019', '#1A0B10', '#0B1220', '#0C1A14'] },
        ink: { label: '主文字', default: '#F7F1E3', options: ['#F7F1E3', '#FFEAE0', '#E8F0FA', '#E6F2E9'] },
        gold: { label: '唱片金', default: '#E8B44A', options: ['#E8B44A', '#F0A868', '#7C9BFF', '#8AC9A0'] },
        dim: { label: '弱文字', default: '#9C8F7A', options: ['#9C8F7A', '#B08A8A', '#7A8CA5', '#789585'] }
      },
      fonts: { heading: { label: '标题字体', default: HEI, options: [HEI, IMPACT] } }
    },
    presets: [
      { name: '黑金', colors: { bg: '#141019', ink: '#F7F1E3', gold: '#E8B44A', dim: '#9C8F7A' } },
      { name: '酒红', colors: { bg: '#1A0B10', ink: '#FFEAE0', gold: '#F0A868', dim: '#B08A8A' } },
      { name: '午夜蓝', colors: { bg: '#0B1220', ink: '#E8F0FA', gold: '#7C9BFF', dim: '#7A8CA5' } },
      { name: '墨绿', colors: { bg: '#0C1A14', ink: '#E6F2E9', gold: '#8AC9A0', dim: '#789585' } }
    ],
    canvas: { virtualWidth: 1920, virtualHeight: 1080, defaultWidth: 1920, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'mg-dots', type: 'image', src: dotsBg(1920, 1080, 58, 'rgba(255,255,255,0.05)'), x: 0, y: 0, width: 1920, height: 1080, objectFit: 'fill', zIndex: 1 },
      { id: 'mg-record', type: 'image', src: RECORD_URI, x: 1200, y: 190, width: 640, height: 640, objectFit: 'contain', zIndex: 2, animation: { name: 'spinSlow', duration: 9000 } },
      { id: 'mg-label', type: 'shape', shapeKind: 'circle', x: 1425, y: 415, width: 190, height: 190, fill: { $t: 'colors.gold' }, zIndex: 3 },
      { id: 'mg-hole', type: 'shape', shapeKind: 'circle', x: 1505, y: 495, width: 30, height: 30, fill: { $t: 'colors.bg' }, zIndex: 4 },
      { id: 'mg-kicker', type: 'shape', shapeKind: 'rect', x: 130, y: 92, width: 330, height: 58, borderRadius: 999, fill: { $t: 'colors.gold' }, zIndex: 4 },
      { id: 'mg-kicker-t', type: 'text', content: '流派指南 · EP.12', fontFamily: HEI, fontSize: 26, fontWeight: 700, color: { $t: 'colors.bg' }, textAlign: 'center', x: 130, y: 106, width: 330, height: 32, zIndex: 5, editable: { content: true } },
      { id: 'mg-num', type: 'text', content: '10 首', fontFamily: IMPACT, fontSize: 250, color: { $t: 'colors.gold' }, x: 120, y: 190, width: 760, height: 280, zIndex: 4, shadow: { offsetX: 0, offsetY: 0, blur: 54, color: { $t: 'colors.gold' } }, animation: { name: 'zoomIn', duration: 520 }, editable: { content: true, fontSize: { type: 'range', min: 150, max: 300 } } },
      { id: 'mg-title', type: 'text', content: '听懂爵士乐', fontFamily: { $t: 'fonts.heading' }, fontSize: 116, fontWeight: 900, color: { $t: 'colors.ink' }, letterSpacing: 5, x: 140, y: 500, width: 1000, height: 140, zIndex: 4, animation: { name: 'slideInLeft', duration: 480, delay: 120 }, editable: { content: true, fontSize: { type: 'range', min: 72, max: 150 } } },
      { id: 'mg-tk1', type: 'text', content: '01  So What — Miles Davis', fontFamily: MONO, fontSize: 34, color: { $t: 'colors.dim' }, x: 140, y: 700, width: 900, height: 46, zIndex: 4, animation: { name: 'slideInLeft', duration: 420, delay: 220 }, editable: { content: true } },
      { id: 'mg-tk2', type: 'text', content: '02  Take Five — Dave Brubeck', fontFamily: MONO, fontSize: 34, color: { $t: 'colors.dim' }, x: 140, y: 762, width: 900, height: 46, zIndex: 4, animation: { name: 'slideInLeft', duration: 420, delay: 320 }, editable: { content: true } },
      { id: 'mg-tk3', type: 'text', content: '03  Feeling Good — Nina Simone', fontFamily: MONO, fontSize: 34, color: { $t: 'colors.dim' }, x: 140, y: 824, width: 900, height: 46, zIndex: 4, animation: { name: 'slideInLeft', duration: 420, delay: 420 }, editable: { content: true } },
      { id: 'mg-line', type: 'text', content: '蓝调 → 摇摆 → 比波普 → 融合', fontFamily: HEI, fontSize: 36, fontWeight: 700, color: { $t: 'colors.gold' }, x: 140, y: 948, width: 900, height: 48, zIndex: 4, editable: { content: true } },
      { id: 'mg-num-o', type: 'text', content: '10 首', fontFamily: IMPACT, fontSize: 250, color: { $t: 'colors.dim' }, opacity: 0.45, x: 140, y: 202, width: 760, height: 280, zIndex: 3 },
      { id: 'mg-title-o', type: 'text', content: '听懂爵士乐', fontFamily: { $t: 'fonts.heading' }, fontSize: 116, fontWeight: 900, color: { $t: 'colors.gold' }, letterSpacing: 5, opacity: 0.45, x: 140, y: 512, width: 1000, height: 140, zIndex: 3 },
      { id: 'mg-hd', type: 'text', content: '曲目单 · TRACKLIST', fontFamily: HEI, fontSize: 26, letterSpacing: 4, color: { $t: 'colors.dim' }, x: 140, y: 656, width: 600, height: 34, zIndex: 4, editable: { content: true } },
      { id: 'mg-tk4', type: 'text', content: '04  A Love Supreme — John Coltrane', fontFamily: MONO, fontSize: 34, color: { $t: 'colors.dim' }, x: 140, y: 886, width: 900, height: 46, zIndex: 4, animation: { name: 'slideInLeft', duration: 420, delay: 520 }, editable: { content: true } },
      { id: 'mg-g1', group: 'mg-g', type: 'shape', shapeKind: 'rect', x: 700, y: 92, width: 152, height: 52, borderRadius: 999, border: { width: 3, color: { $t: 'colors.gold' } }, zIndex: 4 },
      { id: 'mg-g1-t', type: 'text', content: 'Bebop', fontFamily: IMPACT, fontSize: 28, color: { $t: 'colors.gold' }, textAlign: 'center', x: 700, y: 102, width: 152, height: 32, zIndex: 5, editable: { content: true } },
      { id: 'mg-g2', group: 'mg-g', type: 'shape', shapeKind: 'rect', x: 870, y: 92, width: 152, height: 52, borderRadius: 999, border: { width: 3, color: { $t: 'colors.gold' } }, zIndex: 4 },
      { id: 'mg-g2-t', type: 'text', content: 'Cool Jazz', fontFamily: IMPACT, fontSize: 28, color: { $t: 'colors.gold' }, textAlign: 'center', x: 870, y: 102, width: 152, height: 32, zIndex: 5, editable: { content: true } },
      { id: 'mg-g3', group: 'mg-g', type: 'shape', shapeKind: 'rect', x: 1040, y: 92, width: 152, height: 52, borderRadius: 999, fill: { $t: 'colors.gold' }, zIndex: 4 },
      { id: 'mg-g3-t', type: 'text', content: 'Fusion', fontFamily: IMPACT, fontSize: 28, color: { $t: 'colors.bg' }, textAlign: 'center', x: 1040, y: 102, width: 152, height: 32, zIndex: 5, editable: { content: true } },
      { id: 'mg-note', type: 'text', content: '♪', fontFamily: IMPACT, fontSize: 118, color: { $t: 'colors.gold' }, opacity: 0.5, x: 980, y: 240, width: 130, height: 140, zIndex: 4, animation: { name: 'twinkle', duration: 2600 } },
      { id: 'mg-eq', type: 'image', src: mixEqUri(26, 700, 150, 'rgba(247,241,227,0.18)', 6), x: 1210, y: 860, width: 700, height: 150, objectFit: 'fill', zIndex: 3 },
      { id: 'mg-wave', type: 'image', src: waveUri('rgba(247,241,227,0.12)'), x: 0, y: 1030, width: 1920, height: 50, objectFit: 'fill', zIndex: 2 }
    ]
  },

  // 2. 深夜歌单播放器封面 —— 仿播放器 UI：封面位 + 曲目时长 + 进度条，歌单分享区高频
  {
    id: 'video-mix-night', name: '深夜歌单播放器封面', version: '1.0.0', category: 'music',
    tags: ['video', 'music', 'playlist', 'player', '16:9'],
    thumbnail: svgUri('<rect width="160" height="90" fill="%230B1026"/><rect x="14" y="10" width="60" height="7" rx="2" fill="%23EAF0FF"/><rect x="14" y="24" width="132" height="52" rx="8" fill="rgba(255,255,255,0.08)"/><rect x="24" y="34" width="34" height="34" rx="3" fill="none" stroke="%237C9BFF" stroke-dasharray="4 3"/><rect x="70" y="38" width="60" height="5" rx="1" fill="%23EAF0FF" opacity="0.7"/><rect x="70" y="50" width="46" height="5" rx="1" fill="%23EAF0FF" opacity="0.35"/><rect x="70" y="66" width="72" height="3" rx="1.5" fill="%237C9BFF"/><circle cx="132" cy="68" r="4" fill="%237C9BFF"/>', 160, 90),
    tokens: {
      colors: {
        bg: { label: '底色', default: '#0B1026', options: ['#0B1026', '#121212', '#170F2E', '#08211F'] },
        ink: { label: '主文字', default: '#EAF0FF', options: ['#EAF0FF', '#F5F5F5', '#EFE8FF', '#DFF5F1'] },
        accent: { label: '强调色', default: '#7C9BFF', options: ['#7C9BFF', '#FF6B6B', '#C77DFF', '#35D0BA'] },
        card: { label: '播放器底', default: 'rgba(255,255,255,0.06)', options: ['rgba(255,255,255,0.06)', 'rgba(255,255,255,0.10)', 'rgba(0,0,0,0.25)'] },
        dim: { label: '弱文字', default: '#7E8AA6', options: ['#7E8AA6', '#9A9A9A', '#9B8AAE', '#6FA396'] }
      },
      fonts: { heading: { label: '标题字体', default: HEI, options: [HEI, SERIF] } }
    },
    presets: [
      { name: '午夜蓝', colors: { bg: '#0B1026', ink: '#EAF0FF', accent: '#7C9BFF', card: 'rgba(255,255,255,0.06)', dim: '#7E8AA6' } },
      { name: '墨黑', colors: { bg: '#121212', ink: '#F5F5F5', accent: '#FF6B6B', card: 'rgba(255,255,255,0.10)', dim: '#9A9A9A' } },
      { name: '暗紫', colors: { bg: '#170F2E', ink: '#EFE8FF', accent: '#C77DFF', card: 'rgba(255,255,255,0.06)', dim: '#9B8AAE' } },
      { name: '深青', colors: { bg: '#08211F', ink: '#DFF5F1', accent: '#35D0BA', card: 'rgba(0,0,0,0.25)', dim: '#6FA396' } }
    ],
    canvas: { virtualWidth: 1920, virtualHeight: 1080, defaultWidth: 1920, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'mn-kicker', type: 'text', content: 'MIDNIGHT PLAYOUT · VOL.09', fontFamily: MONO, fontSize: 30, letterSpacing: 8, color: { $t: 'colors.accent' }, x: 140, y: 92, width: 900, height: 40, zIndex: 3, editable: { content: true } },
      { id: 'mn-title', type: 'text', content: '一个人听的深夜歌单', fontFamily: { $t: 'fonts.heading' }, fontSize: 92, fontWeight: 900, color: { $t: 'colors.ink' }, letterSpacing: 3, x: 140, y: 150, width: 1300, height: 120, zIndex: 3, animation: { name: 'fadeIn', duration: 520 }, editable: { content: true, fontSize: { type: 'range', min: 56, max: 120 } } },
      { id: 'mn-card', type: 'shape', shapeKind: 'rect', x: 140, y: 340, width: 1640, height: 560, borderRadius: 36, fill: { $t: 'colors.card' }, zIndex: 2 },
      { id: 'mn-slot', type: 'shape', shapeKind: 'rect', x: 200, y: 410, width: 420, height: 420, borderRadius: 20, border: { width: 5, style: 'dashed', color: { $t: 'colors.accent' } }, zIndex: 3 },
      { id: 'mn-slot-t', type: 'text', content: '专辑封面位', fontFamily: HEI, fontSize: 30, color: { $t: 'colors.dim' }, textAlign: 'center', x: 200, y: 600, width: 420, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'mn-t1', type: 'text', content: '01  夜航船 — 声音玩具', fontFamily: HEI, fontSize: 36, color: { $t: 'colors.ink' }, x: 720, y: 430, width: 800, height: 48, zIndex: 4, editable: { content: true } },
      { id: 'mn-d1', type: 'text', content: '04:12', fontFamily: MONO, fontSize: 30, color: { $t: 'colors.dim' }, textAlign: 'right', x: 1540, y: 434, width: 180, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'mn-t2', type: 'text', content: '02  漠河舞厅 — 柳爽', fontFamily: HEI, fontSize: 36, color: { $t: 'colors.ink' }, x: 720, y: 518, width: 800, height: 48, zIndex: 4, editable: { content: true } },
      { id: 'mn-d2', type: 'text', content: '05:01', fontFamily: MONO, fontSize: 30, color: { $t: 'colors.dim' }, textAlign: 'right', x: 1540, y: 522, width: 180, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'mn-t3', type: 'text', content: '03  玉珍 — 草东没有派对', fontFamily: HEI, fontSize: 36, color: { $t: 'colors.ink' }, x: 720, y: 606, width: 800, height: 48, zIndex: 4, editable: { content: true } },
      { id: 'mn-d3', type: 'text', content: '03:47', fontFamily: MONO, fontSize: 30, color: { $t: 'colors.dim' }, textAlign: 'right', x: 1540, y: 610, width: 180, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'mn-more', type: 'text', content: '…… 还有 17 首，完整歌单见简介', fontFamily: HEI, fontSize: 30, color: { $t: 'colors.dim' }, x: 720, y: 682, width: 900, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'mn-pg-track', type: 'shape', shapeKind: 'rect', x: 720, y: 768, width: 1000, height: 10, borderRadius: 999, fill: 'rgba(255,255,255,0.18)', zIndex: 4 },
      { id: 'mn-pg-fill', type: 'shape', shapeKind: 'rect', x: 720, y: 768, width: 400, height: 10, borderRadius: 999, fill: { $t: 'colors.accent' }, zIndex: 5 },
      { id: 'mn-pg-knob', type: 'shape', shapeKind: 'circle', x: 1103, y: 751, width: 34, height: 34, fill: { $t: 'colors.accent' }, zIndex: 6, animation: { name: 'pulse', duration: 1800 } },
      { id: 'mn-time-a', type: 'text', content: '01:47', fontFamily: MONO, fontSize: 26, color: { $t: 'colors.dim' }, x: 720, y: 796, width: 120, height: 34, zIndex: 5, editable: { content: true } },
      { id: 'mn-time-b', type: 'text', content: '04:12', fontFamily: MONO, fontSize: 26, color: { $t: 'colors.dim' }, textAlign: 'right', x: 1600, y: 796, width: 120, height: 34, zIndex: 5, editable: { content: true } },
      { id: 'mn-play', type: 'shape', shapeKind: 'circle', x: 200, y: 860, width: 100, height: 100, fill: { $t: 'colors.accent' }, zIndex: 5, animation: { name: 'heartbeat', duration: 1600 } },
      { id: 'mn-play-t', type: 'text', content: '▶', fontFamily: SANS, fontSize: 40, color: { $t: 'colors.bg' }, textAlign: 'center', x: 214, y: 886, width: 72, height: 50, zIndex: 6 },
      { id: 'mn-wave', type: 'image', src: waveUri('rgba(255,255,255,0.10)'), x: 0, y: 992, width: 1920, height: 88, objectFit: 'fill', zIndex: 2 }
    ]
  },

  // 3. 专辑复盘评分封面 —— 唱片从封套后探出 + 大分数 + 星级，乐评/回顾区招牌
  {
    id: 'video-mix-album', name: '专辑复盘评分封面', version: '1.0.0', category: 'music',
    tags: ['video', 'music', 'album', 'review', '16:9'],
    thumbnail: svgUri('<rect width="160" height="90" fill="%23F5F1E6"/><g fill="%2326211A" opacity="0.08"><circle cx="20" cy="14" r="1"/><circle cx="44" cy="20" r="1"/><circle cx="12" cy="76" r="1"/><circle cx="150" cy="16" r="1"/><circle cx="142" cy="84" r="1"/></g><circle cx="94" cy="45" r="28" fill="%230A0A0C"/><rect x="20" y="18" width="54" height="54" rx="2" fill="%23F5F1E6" stroke="%2326211A" stroke-dasharray="4 3"/><text x="88" y="45" font-family="Impact,sans-serif" font-size="26" fill="%23E8A13A" opacity="0.6">9.8</text><text x="86" y="43" font-family="Impact,sans-serif" font-size="26" fill="%23C2410C">9.8</text><rect x="86" y="54" width="52" height="5" rx="1" fill="%2326211A"/><rect x="86" y="64" width="34" height="5" rx="1" fill="%2326211A" opacity="0.45"/><text x="116" y="22" font-family="Arial" font-size="10" fill="%23E8A13A">★★★★★</text><rect x="118" y="28" width="36" height="12" rx="2" fill="%23C2410C" transform="rotate(8 136 34)"/><g fill="%2326211A"><rect x="14" y="8" width="34" height="4" rx="2" opacity="0.35"/><rect x="14" y="14" width="22" height="4" rx="2" fill="%23C2410C" opacity="0.5"/></g><g fill="%2326211A" opacity="0.55"><rect x="86" y="72" width="46" height="3" rx="1"/><rect x="86" y="78" width="58" height="3" rx="1"/><rect x="86" y="84" width="40" height="3" rx="1"/></g><rect x="86" y="69" width="60" height="1.5" fill="%2326211A" opacity="0.25"/><g fill="%2326211A" opacity="0.22"><rect x="16" y="80" width="2" height="6"/><rect x="21" y="77" width="2" height="12"/><rect x="26" y="81" width="2" height="5"/><rect x="31" y="75" width="2" height="14"/><rect x="36" y="79" width="2" height="8"/><rect x="41" y="76" width="2" height="11"/><rect x="46" y="82" width="2" height="4"/><rect x="51" y="78" width="2" height="9"/><rect x="56" y="74" width="2" height="15"/><rect x="61" y="80" width="2" height="7"/></g><text x="146" y="80" font-family="Impact,sans-serif" font-size="16" fill="%238A7F6D" opacity="0.5">♪</text>', 160, 90),
    tokens: {
      colors: {
        bg: { label: '纸色', default: '#F5F1E6', options: ['#F5F1E6', '#15110E', '#E9EFF6', '#F2EAF4'] },
        ink: { label: '主文字', default: '#26211A', options: ['#26211A', '#F2E9DA', '#1F2A37', '#2E2338'] },
        accent: { label: '评分色', default: '#C2410C', options: ['#C2410C', '#E8B44A', '#2563EB', '#9333EA'] },
        gold: { label: '星标金', default: '#E8A13A', options: ['#E8A13A', '#F59E0B', '#D97706', '#CA8A04'] },
        dim: { label: '弱文字', default: '#8A7F6D', options: ['#8A7F6D', '#A89B85', '#6D8296', '#8A7A93'] }
      },
      fonts: { heading: { label: '标题字体', default: HEI, options: [HEI, IMPACT] } }
    },
    presets: [
      { name: '乐谱纸', colors: { bg: '#F5F1E6', ink: '#26211A', accent: '#C2410C', gold: '#E8A13A', dim: '#8A7F6D' } },
      { name: '黑胶匣', colors: { bg: '#15110E', ink: '#F2E9DA', accent: '#E8B44A', gold: '#E8B44A', dim: '#A89B85' } },
      { name: '雾蓝页', colors: { bg: '#E9EFF6', ink: '#1F2A37', accent: '#2563EB', gold: '#D97706', dim: '#6D8296' } },
      { name: '藕荷页', colors: { bg: '#F2EAF4', ink: '#2E2338', accent: '#9333EA', gold: '#CA8A04', dim: '#8A7A93' } }
    ],
    canvas: { virtualWidth: 1920, virtualHeight: 1080, defaultWidth: 1920, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'ab-vinyl', type: 'image', src: RECORD_URI, x: 560, y: 250, width: 560, height: 560, objectFit: 'contain', zIndex: 2, animation: { name: 'spinSlow', duration: 12000 } },
      { id: 'ab-slot', type: 'shape', shapeKind: 'rect', x: 160, y: 230, width: 620, height: 620, borderRadius: 12, fill: { $t: 'colors.bg' }, border: { width: 5, style: 'dashed', color: { $t: 'colors.ink' } }, zIndex: 3 },
      { id: 'ab-slot-t', type: 'text', content: '专辑封面位', fontFamily: HEI, fontSize: 30, color: { $t: 'colors.dim' }, textAlign: 'center', x: 160, y: 520, width: 620, height: 44, zIndex: 4, editable: { content: true } },
      { id: 'ab-kicker', type: 'shape', shapeKind: 'rect', x: 1290, y: 110, width: 340, height: 62, borderRadius: 999, fill: { $t: 'colors.ink' }, zIndex: 4 },
      { id: 'ab-kicker-t', type: 'text', content: '专辑回顾 · 神专复盘', fontFamily: HEI, fontSize: 26, fontWeight: 700, color: { $t: 'colors.bg' }, textAlign: 'center', x: 1290, y: 126, width: 340, height: 32, zIndex: 5, editable: { content: true } },
      { id: 'ab-score', type: 'text', content: '9.8', fontFamily: IMPACT, fontSize: 240, color: { $t: 'colors.accent' }, rotation: -6, x: 900, y: 200, width: 620, height: 270, zIndex: 4, shadow: { offsetX: 0, offsetY: 0, blur: 50, color: { $t: 'colors.accent' } }, animation: { name: 'zoomIn', duration: 480, delay: 120 }, editable: { content: true, fontSize: { type: 'range', min: 140, max: 300 } } },
      { id: 'ab-stars', type: 'text', content: '★★★★★', fontFamily: SANS, fontSize: 76, color: { $t: 'colors.gold' }, letterSpacing: 14, x: 920, y: 500, width: 600, height: 96, zIndex: 4, animation: { name: 'fadeInUp', duration: 480, delay: 260 }, editable: { content: true } },
      { id: 'ab-title', type: 'text', content: '二十年过去\n它仍是天花板', fontFamily: { $t: 'fonts.heading' }, fontSize: 88, fontWeight: 900, color: { $t: 'colors.ink' }, lineHeight: 1.18, x: 900, y: 630, width: 880, height: 230, zIndex: 4, animation: { name: 'fadeInUp', duration: 520, delay: 180 }, editable: { content: true, fontSize: { type: 'range', min: 56, max: 120 } } },
      { id: 'ab-sub', type: 'text', content: '全 12 轨逐曲拆解 · 从封面设计到母带处理', fontFamily: HEI, fontSize: 30, color: { $t: 'colors.dim' }, x: 160, y: 1024, width: 1200, height: 44, zIndex: 4, editable: { content: true } },
      { id: 'ab-paper', type: 'image', src: dotsBg(1920, 1080, 54, 'rgba(38,33,26,0.07)'), x: 0, y: 0, width: 1920, height: 1080, objectFit: 'fill', zIndex: 1 },
      { id: 'ab-year', type: 'text', content: '二十周年 · 再版深度乐评', fontFamily: HEI, fontSize: 26, letterSpacing: 5, color: { $t: 'colors.dim' }, x: 160, y: 96, width: 760, height: 44, zIndex: 4, editable: { content: true } },
      { id: 'ab-ep', type: 'text', content: 'REVUE NO.041 · 长评', fontFamily: HEI, fontSize: 26, letterSpacing: 4, color: { $t: 'colors.accent' }, x: 1290, y: 186, width: 340, height: 34, zIndex: 4, editable: { content: true } },
      { id: 'ab-run', type: 'shape', shapeKind: 'rect', x: 160, y: 156, width: 330, height: 58, borderRadius: 999, fill: { $t: 'colors.ink' }, zIndex: 4 },
      { id: 'ab-run-t', type: 'text', content: '重听 20 遍 · 18 分 42 秒', fontFamily: HEI, fontSize: 22, fontWeight: 700, color: { $t: 'colors.bg' }, textAlign: 'center', x: 160, y: 170, width: 330, height: 30, zIndex: 5, editable: { content: true } },
      { id: 'ab-score-o', type: 'text', content: '9.8', fontFamily: IMPACT, fontSize: 240, color: { $t: 'colors.gold' }, rotation: -6, opacity: 0.55, x: 912, y: 212, width: 620, height: 270, zIndex: 3 },
      { id: 'ab-stamp', type: 'shape', shapeKind: 'rect', x: 1500, y: 240, width: 300, height: 96, borderRadius: 14, fill: { $t: 'colors.accent' }, rotation: 8, zIndex: 5 },
      { id: 'ab-stamp-t', type: 'text', content: '神专 · 无异议', fontFamily: HEI, fontSize: 40, fontWeight: 900, color: { $t: 'colors.bg' }, textAlign: 'center', rotation: 8, x: 1500, y: 262, width: 300, height: 52, zIndex: 6, editable: { content: true } },
      { id: 'ab-note', type: 'text', content: '♪', fontFamily: IMPACT, fontSize: 110, color: { $t: 'colors.gold' }, opacity: 0.5, x: 820, y: 76, width: 120, height: 130, zIndex: 4, animation: { name: 'twinkle', duration: 2400 } },
      { id: 'ab-note2', type: 'text', content: '♫', fontFamily: IMPACT, fontSize: 76, color: { $t: 'colors.dim' }, opacity: 0.5, x: 1350, y: 516, width: 100, height: 100, zIndex: 4, animation: { name: 'float', duration: 3000 } },
      { id: 'ab-rule', type: 'shape', shapeKind: 'rect', x: 900, y: 866, width: 880, height: 5, borderRadius: 999, fill: { $t: 'colors.ink' }, opacity: 0.3, zIndex: 4 },
      { id: 'ab-tr1', type: 'text', content: '01《霓虹情人》3:42 · 全专入口', fontFamily: HEI, fontSize: 30, color: { $t: 'colors.ink' }, x: 900, y: 884, width: 880, height: 40, zIndex: 4, animation: { name: 'slideInLeft', duration: 420, delay: 200 }, editable: { content: true } },
      { id: 'ab-tr2', type: 'text', content: '02《夜航西飞》4:18 · 弦乐编到发抖', fontFamily: HEI, fontSize: 30, color: { $t: 'colors.dim' }, x: 900, y: 928, width: 880, height: 40, zIndex: 4, animation: { name: 'slideInLeft', duration: 420, delay: 300 }, editable: { content: true } },
      { id: 'ab-tr3', type: 'text', content: '03《黄河一夜》5:06 · 母带示范级', fontFamily: HEI, fontSize: 30, color: { $t: 'colors.dim' }, x: 900, y: 972, width: 880, height: 40, zIndex: 4, animation: { name: 'slideInLeft', duration: 420, delay: 400 }, editable: { content: true } },
      { id: 'ab-wave', type: 'image', src: waveUri('rgba(38,33,26,0.22)'), x: 160, y: 882, width: 620, height: 70, objectFit: 'fill', zIndex: 4 }
    ]
  },

  // 4. 现场大合唱封面 —— 顶光 + 人海手机灯 + 大字，演出/Live 切片高频
  {
    id: 'video-mix-live', name: '现场大合唱封面', version: '1.0.0', category: 'music',
    tags: ['video', 'music', 'live', 'concert', '16:9'],
    thumbnail: svgUri('<rect width="160" height="90" fill="%23160C2E"/><path d="M40 0 L70 0 L92 52 L18 52 Z" fill="rgba(255,217,92,0.16)"/><circle cx="30" cy="70" r="2" fill="%23FFD95C"/><circle cx="58" cy="78" r="2.5" fill="%23FFD95C"/><circle cx="88" cy="72" r="2" fill="%23FFD95C"/><circle cx="118" cy="80" r="2.5" fill="%23FFD95C"/><rect x="8" y="10" width="32" height="8" rx="4" fill="%23FF5C8A"/><rect x="122" y="9" width="30" height="9" rx="4.5" fill="%23FFD95C"/><rect x="10" y="27" width="74" height="13" rx="1" fill="%23FF5C8A"/><rect x="8" y="25" width="74" height="13" rx="1" fill="%23FFF3D6"/><rect x="8" y="43" width="46" height="8" rx="1" fill="%23FF5C8A"/><g fill="%239D8BC0"><rect x="8" y="57" width="26" height="3" rx="1.5"/><rect x="38" y="57" width="20" height="3" rx="1.5"/><rect x="62" y="57" width="16" height="3" rx="1.5"/></g><g fill="none" stroke="%23FFD95C" stroke-width="1"><rect x="8" y="66" width="26" height="9" rx="4.5"/><rect x="38" y="66" width="26" height="9" rx="4.5"/></g><rect x="68" y="66" width="26" height="9" rx="4.5" fill="%23FFD95C"/><g fill="%23FFF3D6"><rect x="96" y="26" width="42" height="4" rx="1"/><rect x="96" y="34" width="52" height="4" rx="1" opacity="0.6"/><rect x="96" y="42" width="46" height="4" rx="1" opacity="0.4"/></g><g fill="%23FFD95C" opacity="0.75"><rect x="96" y="60" width="4" height="16" rx="2"/><rect x="104" y="66" width="4" height="10" rx="2"/><rect x="112" y="52" width="4" height="24" rx="2"/><rect x="120" y="62" width="4" height="14" rx="2"/><rect x="128" y="48" width="4" height="28" rx="2"/><rect x="136" y="64" width="4" height="12" rx="2"/><rect x="144" y="56" width="4" height="20" rx="2"/><rect x="152" y="68" width="4" height="8" rx="2"/></g>', 160, 90),
    tokens: {
      colors: {
        bg: { label: '夜色', default: '#160C2E', options: ['#160C2E', '#0A1026', '#22060C', '#07160F'] },
        ink: { label: '主文字', default: '#FFF3D6', options: ['#FFF3D6', '#E8F1FF', '#FFE8EC', '#E9F7EF'] },
        amber: { label: '灯光黄', default: '#FFD95C', options: ['#FFD95C', '#7DD3FC', '#FCA5A5', '#86EFAC'] },
        pink: { label: '霓虹粉', default: '#FF5C8A', options: ['#FF5C8A', '#F472B6', '#FB923C', '#FDE047'] },
        dim: { label: '弱文字', default: '#9D8BC0', options: ['#9D8BC0', '#7E93B0', '#B08A96', '#7FA98F'] }
      },
      fonts: { heading: { label: '标题字体', default: HEI, options: [HEI, IMPACT] } }
    },
    presets: [
      { name: '紫夜', colors: { bg: '#160C2E', ink: '#FFF3D6', amber: '#FFD95C', pink: '#FF5C8A', dim: '#9D8BC0' } },
      { name: '蓝夜', colors: { bg: '#0A1026', ink: '#E8F1FF', amber: '#7DD3FC', pink: '#F472B6', dim: '#7E93B0' } },
      { name: '红夜', colors: { bg: '#22060C', ink: '#FFE8EC', amber: '#FCA5A5', pink: '#FB923C', dim: '#B08A96' } },
      { name: '绿夜', colors: { bg: '#07160F', ink: '#E9F7EF', amber: '#86EFAC', pink: '#FDE047', dim: '#7FA98F' } }
    ],
    canvas: { virtualWidth: 1920, virtualHeight: 1080, defaultWidth: 1920, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'lv-spot', type: 'overlay', background: 'linear-gradient(115deg, transparent 30%, rgba(255,217,92,0.10) 38%, transparent 46%, transparent 60%, rgba(255,217,92,0.08) 68%, transparent 76%)', x: 0, y: 0, width: 1920, height: 1080, zIndex: 1 },
      { id: 'lv-lights', type: 'image', src: lightsUri(), x: 0, y: 0, width: 1920, height: 1080, objectFit: 'fill', zIndex: 2 },
      { id: 'lv-chip', type: 'shape', shapeKind: 'rect', x: 140, y: 96, width: 420, height: 64, borderRadius: 999, fill: { $t: 'colors.pink' }, zIndex: 4 },
      { id: 'lv-chip-t', type: 'text', content: 'LIVE · 巡演上海站 安可', fontFamily: HEI, fontSize: 28, fontWeight: 700, color: { $t: 'colors.bg' }, textAlign: 'center', x: 140, y: 112, width: 420, height: 34, zIndex: 5, editable: { content: true } },
      { id: 'lv-t1', type: 'text', content: '全场大合唱', fontFamily: { $t: 'fonts.heading' }, fontSize: 210, fontWeight: 900, color: { $t: 'colors.ink' }, letterSpacing: 8, x: 140, y: 300, width: 1400, height: 240, zIndex: 4, animation: { name: 'shimmer', duration: 2600 }, editable: { content: true, fontSize: { type: 'range', min: 130, max: 260 } } },
      { id: 'lv-t2', type: 'text', content: '鸡皮疙瘩起来了', fontFamily: { $t: 'fonts.heading' }, fontSize: 96, fontWeight: 900, color: { $t: 'colors.pink' }, letterSpacing: 4, x: 140, y: 590, width: 1200, height: 120, zIndex: 4, animation: { name: 'slideInRight', duration: 520, delay: 160 }, editable: { content: true, fontSize: { type: 'range', min: 60, max: 130 } } },
      { id: 'lv-mic', type: 'image', src: MIC_URI, x: 1520, y: 240, width: 300, height: 300, objectFit: 'contain', rotation: 12, zIndex: 5, animation: { name: 'float', duration: 2600 } },
      { id: 'lv-note', type: 'text', content: '♪', fontFamily: IMPACT, fontSize: 130, color: { $t: 'colors.amber' }, opacity: 0.55, x: 1400, y: 170, width: 130, height: 150, zIndex: 5, animation: { name: 'twinkle', duration: 2200 } },
      { id: 'lv-sub', type: 'text', content: '前奏一响，三万人同时打开手机灯', fontFamily: HEI, fontSize: 38, color: { $t: 'colors.dim' }, x: 140, y: 920, width: 1100, height: 50, zIndex: 4, editable: { content: true } },
      { id: 'lv-halo', type: 'overlay', background: 'radial-gradient(circle at 74% 20%, rgba(255,217,92,0.20), transparent 52%)', x: 0, y: 0, width: 1920, height: 1080, zIndex: 1 },
      { id: 'lv-t1o', type: 'text', content: '全场大合唱', fontFamily: { $t: 'fonts.heading' }, fontSize: 210, fontWeight: 900, color: { $t: 'colors.pink' }, letterSpacing: 8, opacity: 0.85, x: 140, y: 316, width: 1400, height: 240, zIndex: 3 },
      { id: 'lv-series', type: 'text', content: '2026 秋冬巡演 · 第 18 场', fontFamily: HEI, fontSize: 28, letterSpacing: 4, color: { $t: 'colors.dim' }, x: 596, y: 112, width: 640, height: 40, zIndex: 5, editable: { content: true } },
      { id: 'lv-q', type: 'shape', shapeKind: 'rect', x: 1560, y: 96, width: 230, height: 62, borderRadius: 999, fill: { $t: 'colors.amber' }, zIndex: 4 },
      { id: 'lv-q-t', type: 'text', content: '4K · 现场直拍', fontFamily: HEI, fontSize: 26, fontWeight: 700, color: { $t: 'colors.bg' }, textAlign: 'center', x: 1560, y: 111, width: 230, height: 32, zIndex: 5, editable: { content: true } },
      { id: 'lv-tour-h', type: 'text', content: '下一站 · 巡演日程', fontFamily: HEI, fontSize: 28, fontWeight: 700, letterSpacing: 2, color: { $t: 'colors.pink' }, x: 140, y: 752, width: 520, height: 36, zIndex: 4, editable: { content: true } },
      { id: 'lv-d1', group: 'lv-d', type: 'shape', shapeKind: 'rect', x: 140, y: 804, width: 210, height: 56, borderRadius: 999, border: { width: 3, color: { $t: 'colors.amber' } }, zIndex: 4 },
      { id: 'lv-d1-t', type: 'text', content: '成都站 10.12', fontFamily: HEI, fontSize: 24, color: { $t: 'colors.amber' }, textAlign: 'center', x: 140, y: 816, width: 210, height: 32, zIndex: 5, editable: { content: true } },
      { id: 'lv-d2', group: 'lv-d', type: 'shape', shapeKind: 'rect', x: 374, y: 804, width: 210, height: 56, borderRadius: 999, border: { width: 3, color: { $t: 'colors.amber' } }, zIndex: 4 },
      { id: 'lv-d2-t', type: 'text', content: '武汉站 10.19', fontFamily: HEI, fontSize: 24, color: { $t: 'colors.amber' }, textAlign: 'center', x: 374, y: 816, width: 210, height: 32, zIndex: 5, editable: { content: true } },
      { id: 'lv-d3', group: 'lv-d', type: 'shape', shapeKind: 'rect', x: 608, y: 804, width: 210, height: 56, borderRadius: 999, fill: { $t: 'colors.amber' }, zIndex: 4 },
      { id: 'lv-d3-t', type: 'text', content: '上海站 10.26', fontFamily: HEI, fontSize: 24, fontWeight: 700, color: { $t: 'colors.bg' }, textAlign: 'center', x: 608, y: 816, width: 210, height: 32, zIndex: 5, editable: { content: true } },
      { id: 'lv-set-h', type: 'text', content: '安可三段 · ENCORE', fontFamily: HEI, fontSize: 30, fontWeight: 700, letterSpacing: 3, color: { $t: 'colors.amber' }, x: 1260, y: 580, width: 600, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'lv-set1', type: 'text', content: '01《倔强》副歌被全场接管', fontFamily: HEI, fontSize: 30, color: { $t: 'colors.ink' }, x: 1260, y: 636, width: 600, height: 44, zIndex: 4, animation: { name: 'slideInRight', duration: 460, delay: 260 }, editable: { content: true } },
      { id: 'lv-set2', type: 'text', content: '02《后来》前奏一响集体破防', fontFamily: HEI, fontSize: 30, color: { $t: 'colors.dim' }, x: 1260, y: 690, width: 600, height: 44, zIndex: 4, animation: { name: 'slideInRight', duration: 460, delay: 360 }, editable: { content: true } },
      { id: 'lv-set3', type: 'text', content: '03《海阔天空》话筒递给三万人', fontFamily: HEI, fontSize: 30, color: { $t: 'colors.dim' }, x: 1260, y: 744, width: 600, height: 44, zIndex: 4, animation: { name: 'slideInRight', duration: 460, delay: 460 }, editable: { content: true } },
      { id: 'lv-eq', type: 'image', src: mixEqUri(22, 620, 110, 'rgba(255,255,255,0.24)', 4), x: 1240, y: 884, width: 620, height: 110, objectFit: 'fill', zIndex: 3 }
    ]
  },

  // 5. 乐理和弦速成封面 —— 万能四和弦 chips + 整幅钢琴键盘，教学/弹唱区干货脸
  {
    id: 'video-mix-chords', name: '乐理四和弦封面', version: '1.0.0', category: 'music',
    tags: ['video', 'music', 'theory', 'chords', '16:9'],
    thumbnail: svgUri('<rect width="160" height="90" fill="%23FAF6EF"/><rect x="12" y="10" width="70" height="9" rx="1" fill="%231F2937"/><rect x="12" y="26" width="44" height="9" rx="1" fill="%234338CA"/><rect x="12" y="44" width="26" height="14" rx="3" fill="%23FFFFFF" stroke="%231F2937" stroke-width="1.5"/><rect x="42" y="44" width="26" height="14" rx="3" fill="%23FFFFFF" stroke="%231F2937" stroke-width="1.5"/><rect x="72" y="44" width="26" height="14" rx="3" fill="%23FFFFFF" stroke="%231F2937" stroke-width="1.5"/><rect x="12" y="66" width="136" height="20" fill="%23FFFFFF" stroke="%231F2937"/><g fill="%231F2937"><rect x="30" y="66" width="6" height="12"/><rect x="56" y="66" width="6" height="12"/><rect x="106" y="66" width="6" height="12"/></g>', 160, 90),
    tokens: {
      colors: {
        bg: { label: '底色', default: '#FAF6EF', options: ['#FAF6EF', '#EAF1F8', '#FBEFF2', '#EEF5EA'] },
        ink: { label: '主文字', default: '#1F2937', options: ['#1F2937', '#16232E', '#33212A', '#22301F'] },
        accent: { label: '强调色', default: '#4338CA', options: ['#4338CA', '#0284C7', '#DB2777', '#16A34A'] },
        chip: { label: '和弦卡', default: '#FFFFFF', options: ['#FFFFFF', '#FFF9DB', '#F0F7FF'] },
        dim: { label: '弱文字', default: '#8B8172', options: ['#8B8172', '#6D8296', '#98788A', '#75876F'] }
      },
      fonts: { heading: { label: '标题字体', default: HEI, options: [HEI, IMPACT] } }
    },
    presets: [
      { name: '奶油', colors: { bg: '#FAF6EF', ink: '#1F2937', accent: '#4338CA', chip: '#FFFFFF', dim: '#8B8172' } },
      { name: '雾蓝', colors: { bg: '#EAF1F8', ink: '#16232E', accent: '#0284C7', chip: '#F0F7FF', dim: '#6D8296' } },
      { name: '樱粉', colors: { bg: '#FBEFF2', ink: '#33212A', accent: '#DB2777', chip: '#FFFFFF', dim: '#98788A' } },
      { name: '抹茶', colors: { bg: '#EEF5EA', ink: '#22301F', accent: '#16A34A', chip: '#FFF9DB', dim: '#75876F' } }
    ],
    canvas: { virtualWidth: 1920, virtualHeight: 1080, defaultWidth: 1920, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'ch-dots', type: 'image', src: dotsBg(1920, 780, 52, 'rgba(31,41,55,0.07)'), x: 0, y: 0, width: 1920, height: 780, objectFit: 'fill', zIndex: 1 },
      { id: 'ch-keys', type: 'image', src: KEYS_URI, x: 0, y: 780, width: 1920, height: 300, objectFit: 'fill', zIndex: 2 },
      { id: 'ch-kicker', type: 'text', content: '乐理不难 · EP.03', fontFamily: MONO, fontSize: 30, letterSpacing: 6, color: { $t: 'colors.accent' }, x: 130, y: 96, width: 700, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'ch-title', type: 'text', content: '4 个和弦\n弹遍一千首歌', fontFamily: { $t: 'fonts.heading' }, fontSize: 112, fontWeight: 900, color: { $t: 'colors.ink' }, lineHeight: 1.16, x: 130, y: 160, width: 1300, height: 260, zIndex: 4, animation: { name: 'fadeIn', duration: 480 }, editable: { content: true, fontSize: { type: 'range', min: 72, max: 150 } } },
      { id: 'ch-c1', group: 'ch-c', type: 'shape', shapeKind: 'rect', x: 130, y: 480, width: 230, height: 116, borderRadius: 22, fill: { $t: 'colors.chip' }, border: { width: 4, color: { $t: 'colors.ink' } }, zIndex: 4, animation: { name: 'rise', duration: 460 } },
      { id: 'ch-c1-t', type: 'text', content: 'C', fontFamily: IMPACT, fontSize: 62, color: { $t: 'colors.ink' }, textAlign: 'center', x: 130, y: 504, width: 230, height: 72, zIndex: 5, editable: { content: true } },
      { id: 'ch-c2', group: 'ch-c', type: 'shape', shapeKind: 'rect', x: 410, y: 480, width: 230, height: 116, borderRadius: 22, fill: { $t: 'colors.chip' }, border: { width: 4, color: { $t: 'colors.ink' } }, zIndex: 4, animation: { name: 'rise', duration: 460, delay: 120 } },
      { id: 'ch-c2-t', type: 'text', content: 'G', fontFamily: IMPACT, fontSize: 62, color: { $t: 'colors.ink' }, textAlign: 'center', x: 410, y: 504, width: 230, height: 72, zIndex: 5, editable: { content: true } },
      { id: 'ch-c3', group: 'ch-c', type: 'shape', shapeKind: 'rect', x: 690, y: 480, width: 230, height: 116, borderRadius: 22, fill: { $t: 'colors.chip' }, border: { width: 4, color: { $t: 'colors.ink' } }, zIndex: 4, animation: { name: 'rise', duration: 460, delay: 240 } },
      { id: 'ch-c3-t', type: 'text', content: 'Am', fontFamily: IMPACT, fontSize: 62, color: { $t: 'colors.ink' }, textAlign: 'center', x: 690, y: 504, width: 230, height: 72, zIndex: 5, editable: { content: true } },
      { id: 'ch-c4', group: 'ch-c', type: 'shape', shapeKind: 'rect', x: 970, y: 480, width: 230, height: 116, borderRadius: 22, fill: { $t: 'colors.chip' }, border: { width: 4, color: { $t: 'colors.ink' } }, zIndex: 4, animation: { name: 'rise', duration: 460, delay: 360 } },
      { id: 'ch-c4-t', type: 'text', content: 'F', fontFamily: IMPACT, fontSize: 62, color: { $t: 'colors.ink' }, textAlign: 'center', x: 970, y: 504, width: 230, height: 72, zIndex: 5, editable: { content: true } },
      { id: 'ch-tag', type: 'shape', shapeKind: 'rect', x: 1450, y: 170, width: 310, height: 92, borderRadius: 14, fill: { $t: 'colors.accent' }, rotation: 6, zIndex: 5 },
      { id: 'ch-tag-t', type: 'text', content: '万能进行式', fontFamily: HEI, fontSize: 42, fontWeight: 700, color: { $t: 'colors.chip' }, textAlign: 'center', rotation: 6, x: 1450, y: 194, width: 310, height: 54, zIndex: 6, editable: { content: true } },
      { id: 'ch-note', type: 'text', content: '流行歌的骨架就这四下，剩下交给感情', fontFamily: HEI, fontSize: 38, color: { $t: 'colors.dim' }, x: 130, y: 650, width: 1300, height: 50, zIndex: 4, editable: { content: true } }
    ]
  }
]

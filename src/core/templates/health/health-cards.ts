// src/core/templates/health/health-cards.ts —— 健康·养生大类第一批（6 个模板 · 5 种比例）
// 口径：养生贴士卡(4:5) / 睡眠打卡图(9:16) / 节气养生卡(1:1) / 体检指标科普(3:4) / 一周早餐计划(4:5) / 谣言粉碎机卡(16:9)
// 文案统一走「参考 / 聊聊」口吻，不给疗效承诺；颜色全走 token，每个恰好 4 套预设。
import type { Template } from '@/types/types'
import {HEI, SONG, MONO, SANS, SERIF, IMPACT, grain} from '../_fx/trend'
import { svgUri } from '../_fx/common'

/** 内联 SVG → data URI：inner 不含 <svg>，inner 里的 # 一律写成 %23 */

/** 散点：低透明度碎点，铺在 token 底色上做纸感，换预设也不露馅 */
function specks(w: number, h: number, n: number, step: number, fill: string) {
  let s = ''
  for (let i = 0; i < n; i++) {
    const x = Math.round((i * step * 3.7) % w)
    const y = Math.round((i * step * 7.3) % h)
    s += `<circle cx="${x}" cy="${y}" r="${(1.4 + (i % 4) * 0.8).toFixed(1)}" fill="${fill}" opacity="${(0.16 + (i % 6) * 0.06).toFixed(2)}"/>`
  }
  return s
}

/** 卤纹：几条起伏缓波，茶叶蛋外壳那种一丝一丝的颜色沉淀（底透明，跟着预设底色走） */
function veins(w: number, h: number, stroke: string) {
  const wave = (y0: number, amp: number, k: number, sw: number) => {
    let d = `M0 ${y0.toFixed(1)}`
    for (let x = 0; x < w; x += 96) d += ` Q ${(x + 48).toFixed(1)} ${(y0 + Math.sin(x / k) * amp).toFixed(1)} ${(x + 96).toFixed(1)} ${y0.toFixed(1)}`
    return `<path d="${d}" fill="none" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round"/>`
  }
  return wave(h * 0.16, 30, 210, 3) + wave(h * 0.38, -22, 280, 2) + wave(h * 0.63, 34, 190, 2.4) + wave(h * 0.86, -26, 250, 1.8)
}

/** 表单横格：体检单 / 打卡表的纸感 */
function rules(w: number, h: number, gap: number, stroke: string) {
  let s = ''
  for (let y = gap; y < h; y += gap) s += `<line x1="0" y1="${y}" x2="${w}" y2="${y}" stroke="${stroke}" stroke-width="1"/>`
  return s
}

const TEACUP = svgUri('<g fill="none" stroke="rgba(0,0,0,0.42)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"><path d="M26 96 H182 V126 Q182 176 104 176 Q26 176 26 126 Z"/><path d="M182 108 Q228 108 228 138 Q228 168 182 168"/><path d="M12 192 H196"/><path d="M72 126 Q104 140 136 126"/></g>', 240, 200)
const STEAM = svgUri('<g fill="none" stroke="rgba(0,0,0,0.3)" stroke-width="5" stroke-linecap="round"><path d="M16 58 Q4 40 16 24 Q28 8 16 -6"/><path d="M48 60 Q36 42 48 26 Q60 10 48 -4"/><path d="M80 58 Q68 42 80 26 Q92 12 80 0"/></g>', 96, 64)
const PERSIMMON = svgUri('<g><ellipse cx="78" cy="126" rx="62" ry="56" fill="rgba(194,69,46,0.16)" stroke="rgba(0,0,0,0.4)" stroke-width="3.4"/><path d="M78 72 Q78 60 78 52" stroke="rgba(0,0,0,0.4)" stroke-width="4" fill="none" stroke-linecap="round"/><g fill="none" stroke="rgba(0,0,0,0.4)" stroke-width="3.4" stroke-linecap="round"><path d="M78 74 Q54 68 42 52 M78 74 Q102 68 114 52 M78 74 Q66 58 68 42 M78 74 Q90 58 88 42"/></g><ellipse cx="164" cy="176" rx="46" ry="42" fill="rgba(0,0,0,0.05)" stroke="rgba(0,0,0,0.32)" stroke-width="3"/><g fill="none" stroke="rgba(0,0,0,0.32)" stroke-width="3" stroke-linecap="round"><path d="M164 138 Q146 132 138 120 M164 138 Q182 132 190 120"/></g></g>', 214, 224)
const SKILLET = svgUri('<g fill="none" stroke="rgba(0,0,0,0.4)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"><circle cx="86" cy="90" r="72"/><circle cx="86" cy="90" r="52"/><path d="M158 90 H232"/></g><circle cx="72" cy="78" r="18" fill="rgba(224,138,60,0.5)"/>', 240, 168)
const MOON_CRATER = svgUri('<g fill="rgba(255,255,255,0.16)"><circle cx="34" cy="30" r="9"/><circle cx="74" cy="62" r="6"/><circle cx="46" cy="70" r="4"/></g>', 96, 96)
const FORK = svgUri('<g fill="none" stroke="rgba(0,0,0,0.34)" stroke-width="5" stroke-linecap="round"><path d="M20 6 V40 Q20 56 36 58 M52 6 V40 Q52 56 36 58 M36 58 V104"/><path d="M78 6 V40 Q78 56 94 58 M110 6 V40 Q110 56 94 58 M94 58 V104"/></g>', 130, 112)
const PILLOW = svgUri('<g fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="4.4" stroke-linejoin="round"><path d="M18 40 Q18 18 44 18 H140 Q166 18 166 40 V78 Q166 100 140 100 H44 Q18 100 18 78 Z"/><path d="M18 44 Q92 62 166 44"/></g>', 184, 118)

export const healthTemplates: Template[] = [
  // 1. 养生贴士卡 —— 大字要点×3 + 晨晚分栏 + 茶叶蛋式暖色卤纹底
  {
    id: 'health-wellness-tips', name: '养生贴士卡', version: '1.0.0', category: 'health',
    tags: ['health', 'wellness', 'tips', 'tea-egg', '4:5'],
    thumbnail: svgUri('<rect width="108" height="135" fill="%23EAC9A0"/><g stroke="%233A2418" stroke-width="1.4" fill="none" opacity="0.16"><path d="M0 22 Q27 16 54 22 T108 22"/><path d="M0 60 Q27 66 54 60 T108 60"/><path d="M0 104 Q27 98 54 104 T108 104"/></g><g fill="%233A2418" opacity="0.1"><circle cx="18" cy="34" r="1.6"/><circle cx="86" cy="78" r="1.6"/><circle cx="34" cy="120" r="1.6"/></g><rect x="10" y="14" width="54" height="8" rx="2" fill="%23B4472C"/><rect x="10" y="28" width="70" height="14" rx="3" fill="%233A2418"/><rect x="10" y="48" width="46" height="7" rx="2" fill="%233A2418" opacity="0.55"/><g fill="%23FFF7EC"><rect x="10" y="66" width="40" height="30" rx="4"/><rect x="56" y="66" width="40" height="30" rx="4"/></g><g fill="%23B4472C"><rect x="13" y="70" width="2.4" height="9"/><rect x="59" y="70" width="2.4" height="9"/></g><g stroke="%233A2418" stroke-width="1.4" fill="none" opacity="0.7"><path d="M62 90 H20 M62 96 H14"/><path d="M108 92 Q124 92 124 100 Q124 108 108 108"/></g><rect x="10" y="116" width="52" height="6" rx="2" fill="%233A2418" opacity="0.35"/><rect x="70" y="114" width="28" height="10" rx="5" fill="none" stroke="%23B4472C" stroke-dasharray="3 2"/>', 108, 135),
    tokens: {
      colors: {
        bg: { label: '卤汁底', default: '#EAC9A0', options: ['#EAC9A0', '#F2DCC0', '#E0BFA8', '#D9C7A3'] },
        ink: { label: '主文字', default: '#3A2418', options: ['#3A2418', '#4A3721', '#2B1B12', '#3D2B2B'] },
        accent: { label: '枣红', default: '#B4472C', options: ['#B4472C', '#C2410C', '#A63B4A', '#8C5A2B'] },
        herb: { label: '枸杞橘', default: '#E07A3F', options: ['#E07A3F', '#D9773B', '#E05A5A', '#C99A3F'] },
        paper: { label: '蛋白白', default: '#FFF7EC', options: ['#FFF7EC', '#FFFBF3', '#FDF3E3', '#FFF3E0'] }
      },
      fonts: {
        heading: { label: '标题字体', default: HEI, options: [HEI, SONG, SERIF] },
        sub: { label: '正文字体', default: HEI, options: [HEI, SANS, MONO] }
      }
    },
    presets: [
      { name: '茶叶蛋暖棕', colors: { bg: '#EAC9A0', ink: '#3A2418', accent: '#B4472C', herb: '#E07A3F', paper: '#FFF7EC' } },
      { name: '姜黄蜜糖', colors: { bg: '#F2DCC0', ink: '#4A3721', accent: '#C2410C', herb: '#D9773B', paper: '#FFFBF3' } },
      { name: '山楂乌梅', colors: { bg: '#E0BFA8', ink: '#2B1B12', accent: '#A63B4A', herb: '#E05A5A', paper: '#FDF3E3' } },
      { name: '炒麦香米', colors: { bg: '#D9C7A3', ink: '#3D2B2B', accent: '#8C5A2B', herb: '#C99A3F', paper: '#FFF3E0' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'hs-marble', type: 'image', src: svgUri(veins(1080, 1350, 'rgba(0,0,0,0.09)') + specks(1080, 1350, 90, 37, 'rgba(0,0,0,0.10)'), 1080, 1350), x: 0, y: 0, width: 1080, height: 1350, objectFit: 'fill', zIndex: 1 },
      { id: 'hs-warm', type: 'overlay', x: 0, y: 0, width: 1080, height: 1350, background: 'radial-gradient(120% 62% at 84% 8%, rgba(255,255,255,0.34) 0%, rgba(255,255,255,0) 62%)', zIndex: 2 },
      { id: 'hs-cup', type: 'image', src: TEACUP, x: 806, y: 140, width: 198, height: 165, objectFit: 'contain', zIndex: 3, animation: { name: 'zoomIn', duration: 520, delay: 120 } },
      { id: 'hs-steam', type: 'image', src: STEAM, x: 848, y: 92, width: 96, height: 64, objectFit: 'contain', zIndex: 3, animation: { name: 'float', duration: 3600, iterationCount: 'infinite' } },
      { id: 'hs-dot-a', type: 'shape', shapeKind: 'circle', x: 986, y: 320, width: 16, height: 16, fill: { $t: 'colors.accent' }, opacity: 0.7, zIndex: 3, animation: { name: 'twinkle', duration: 2600, iterationCount: 'infinite' } },
      { id: 'hs-dot-b', type: 'shape', shapeKind: 'circle', x: 762, y: 250, width: 10, height: 10, fill: { $t: 'colors.herb' }, opacity: 0.75, zIndex: 3, animation: { name: 'pulse', duration: 2200, iterationCount: 'infinite' } },
      { id: 'hs-kicker', type: 'text', content: '养胃系列 · 第 8 期 · 亲测可做', fontFamily: { $t: 'fonts.sub' }, fontSize: 30, fontWeight: 700, color: { $t: 'colors.accent' }, letterSpacing: 2, x: 76, y: 78, width: 680, height: 44, zIndex: 4, editable: { content: true } },
      { id: 'hs-title', type: 'text', content: '三条护胃小贴士', fontFamily: { $t: 'fonts.heading' }, fontSize: 92, fontWeight: 900, color: { $t: 'colors.ink' }, letterSpacing: 2, x: 76, y: 126, width: 860, height: 132, zIndex: 4, animation: { name: 'fadeInUp', duration: 520 }, editable: { content: true, fontSize: { type: 'range', min: 60, max: 110 } } },
      { id: 'hs-sub', type: 'text', content: '老规矩：都是日常做得到的，不谈偏方', fontFamily: { $t: 'fonts.sub' }, fontSize: 38, color: { $t: 'colors.ink' }, opacity: 0.82, x: 76, y: 276, width: 900, height: 56, zIndex: 4, editable: { content: true } },
      { id: 'hs-rule', type: 'shape', shapeKind: 'rect', x: 76, y: 352, width: 120, height: 8, borderRadius: 4, fill: { $t: 'colors.accent' }, zIndex: 4 },
      { id: 'hs-n1', type: 'text', content: '01', fontFamily: IMPACT, fontSize: 64, color: { $t: 'colors.accent' }, opacity: 0.9, x: 76, y: 410, width: 110, height: 90, zIndex: 4 },
      { id: 'hs-b1', type: 'text', content: '吃饭换个顺序', fontFamily: { $t: 'fonts.heading' }, fontSize: 52, fontWeight: 800, color: { $t: 'colors.ink' }, x: 210, y: 402, width: 760, height: 76, zIndex: 4, animation: { name: 'slideInLeft', duration: 460, delay: 90 }, editable: { content: true } },
      { id: 'hs-t1', type: 'text', content: '饭前先喝几口汤，再吃菜和饭', fontFamily: { $t: 'fonts.sub' }, fontSize: 30, color: { $t: 'colors.ink' }, opacity: 0.7, x: 210, y: 502, width: 700, height: 46, zIndex: 4, editable: { content: true } },
      { id: 'hs-sep1', type: 'shape', shapeKind: 'rect', x: 76, y: 560, width: 928, height: 2, fill: { $t: 'colors.ink' }, opacity: 0.16, zIndex: 4 },
      { id: 'hs-n2', type: 'text', content: '02', fontFamily: IMPACT, fontSize: 64, color: { $t: 'colors.accent' }, opacity: 0.9, x: 76, y: 592, width: 110, height: 90, zIndex: 4 },
      { id: 'hs-b2', type: 'text', content: '喝够温水这件事', fontFamily: { $t: 'fonts.heading' }, fontSize: 52, fontWeight: 800, color: { $t: 'colors.ink' }, x: 210, y: 584, width: 760, height: 76, zIndex: 4, animation: { name: 'slideInLeft', duration: 460, delay: 200 }, editable: { content: true } },
      { id: 'hs-t2', type: 'text', content: '一天分到几次喝，别一次灌很多', fontFamily: { $t: 'fonts.sub' }, fontSize: 30, color: { $t: 'colors.ink' }, opacity: 0.7, x: 210, y: 684, width: 700, height: 46, zIndex: 4, editable: { content: true } },
      { id: 'hs-sep2', type: 'shape', shapeKind: 'rect', x: 76, y: 742, width: 928, height: 2, fill: { $t: 'colors.ink' }, opacity: 0.16, zIndex: 4 },
      { id: 'hs-n3', type: 'text', content: '03', fontFamily: IMPACT, fontSize: 64, color: { $t: 'colors.accent' }, opacity: 0.9, x: 76, y: 774, width: 110, height: 90, zIndex: 4 },
      { id: 'hs-b3', type: 'text', content: '别一坐一上午', fontFamily: { $t: 'fonts.heading' }, fontSize: 52, fontWeight: 800, color: { $t: 'colors.ink' }, x: 210, y: 766, width: 760, height: 76, zIndex: 4, animation: { name: 'slideInLeft', duration: 460, delay: 310 }, editable: { content: true } },
      { id: 'hs-t3', type: 'text', content: '每 45 分钟起来倒杯水', fontFamily: { $t: 'fonts.sub' }, fontSize: 30, color: { $t: 'colors.ink' }, opacity: 0.7, x: 210, y: 866, width: 700, height: 46, zIndex: 4, editable: { content: true } },
      { id: 'hs-mcard', type: 'shape', shapeKind: 'rect', x: 76, y: 940, width: 440, height: 228, borderRadius: 20, fill: 'rgba(0,0,0,0.06)', border: { width: 2, color: 'rgba(0,0,0,0.08)' }, zIndex: 4 },
      { id: 'hs-ecard', type: 'shape', shapeKind: 'rect', x: 564, y: 940, width: 440, height: 228, borderRadius: 20, fill: 'rgba(0,0,0,0.06)', border: { width: 2, color: 'rgba(0,0,0,0.08)' }, zIndex: 4 },
      { id: 'hs-mtick', type: 'shape', shapeKind: 'rect', x: 108, y: 970, width: 8, height: 52, borderRadius: 4, fill: { $t: 'colors.herb' }, zIndex: 5 },
      { id: 'hs-etick', type: 'shape', shapeKind: 'rect', x: 596, y: 970, width: 8, height: 52, borderRadius: 4, fill: { $t: 'colors.accent' }, zIndex: 5 },
      { id: 'hs-mh', type: 'text', content: '晨起', fontFamily: { $t: 'fonts.heading' }, fontSize: 44, fontWeight: 800, color: { $t: 'colors.ink' }, x: 128, y: 968, width: 180, height: 60, zIndex: 5, editable: { content: true } },
      { id: 'hs-eh', type: 'text', content: '睡前', fontFamily: { $t: 'fonts.heading' }, fontSize: 44, fontWeight: 800, color: { $t: 'colors.ink' }, x: 616, y: 968, width: 180, height: 60, zIndex: 5, editable: { content: true } },
      { id: 'hs-mb', type: 'text', content: '先喝一杯温水\n起床拉伸两分钟', fontFamily: { $t: 'fonts.sub' }, fontSize: 26, lineHeight: 1.5, color: { $t: 'colors.ink' }, opacity: 0.86, x: 108, y: 1030, width: 380, height: 88, zIndex: 5, editable: { content: true } },
      { id: 'hs-eb', type: 'text', content: '睡前一小时离手机\n泡脚十五分钟就好', fontFamily: { $t: 'fonts.sub' }, fontSize: 26, lineHeight: 1.5, color: { $t: 'colors.ink' }, opacity: 0.86, x: 596, y: 1030, width: 380, height: 88, zIndex: 5, editable: { content: true } },
      { id: 'hs-tag', type: 'shape', shapeKind: 'rect', x: 806, y: 1198, width: 198, height: 44, borderRadius: 999, border: { width: 2, style: 'dashed', color: { $t: 'colors.accent' } }, zIndex: 5 },
      { id: 'hs-tag-t', type: 'text', content: '点我改文案', fontFamily: { $t: 'fonts.sub' }, fontSize: 22, color: { $t: 'colors.accent' }, textAlign: 'center', x: 806, y: 1206, width: 198, height: 30, zIndex: 6, editable: { content: true } },
      { id: 'hs-foot', type: 'text', content: '个人记录与公开资料整理 · 不能替代医生诊断', fontFamily: { $t: 'fonts.sub' }, fontSize: 22, color: { $t: 'colors.ink' }, opacity: 0.62, letterSpacing: 1, x: 76, y: 1200, width: 700, height: 36, zIndex: 5, editable: { content: true } }
    ]
  },
  // 2. 睡眠打卡图 —— 竖排日期格 + 睡眠质量自评条 + 本周小结
  {
    id: 'health-sleep-log', name: '睡眠打卡图', version: '1.0.0', category: 'health',
    tags: ['health', 'sleep', 'log', 'checkin', '9:16'],
    thumbnail: svgUri('<rect width="108" height="192" fill="%23232041"/><g fill="%23F3EEE6" opacity="0.5"><circle cx="14" cy="18" r="1"/><circle cx="46" cy="10" r="1"/><circle cx="78" cy="24" r="1"/><circle cx="30" cy="40" r="1"/></g><circle cx="84" cy="34" r="11" fill="%23F0B860"/><circle cx="79" cy="30" r="2.4" fill="%23FFFFFF" opacity="0.35"/><rect x="10" y="56" width="44" height="7" rx="2" fill="%23F3EEE6"/><rect x="10" y="68" width="60" height="4" rx="2" fill="%23F3EEE6" opacity="0.45"/><g fill="%23F3EEE6" opacity="0.09"><rect x="10" y="82" width="88" height="12" rx="3"/><rect x="10" y="98" width="88" height="12" rx="3"/><rect x="10" y="114" width="88" height="12" rx="3"/><rect x="10" y="130" width="88" height="12" rx="3"/></g><g fill="%23F3EEE6" opacity="0.6"><rect x="14" y="86" width="10" height="3" rx="1"/><rect x="14" y="102" width="10" height="3" rx="1"/><rect x="14" y="118" width="10" height="3" rx="1"/><rect x="14" y="134" width="10" height="3" rx="1"/></g><g fill="%238E7CC3"><rect x="86" y="103" width="8" height="3" rx="1.5"/><rect x="86" y="135" width="8" height="3" rx="1.5"/></g><g fill="%23F0B860"><rect x="86" y="87" width="8" height="3" rx="1.5"/><rect x="86" y="119" width="8" height="3" rx="1.5"/><rect x="86" y="151" width="8" height="3" rx="1.5"/></g><text x="12" y="170" font-family="Consolas,monospace" font-size="17" fill="%23F0B860">4.2</text><rect x="36" y="164" width="60" height="4" rx="2" fill="%23F3EEE6" opacity="0.16"/><rect x="36" y="164" width="46" height="4" rx="2" fill="%23F0B860"/><rect x="12" y="180" width="84" height="8" rx="4" fill="none" stroke="%238E7CC3" stroke-dasharray="3 2"/>', 108, 192),
    tokens: {
      colors: {
        bg: { label: '夜色底', default: '#232041', options: ['#232041', '#1F2B22', '#2A1F2E', '#1B2A38'] },
        ink: { label: '主文字', default: '#F3EEE6', options: ['#F3EEE6', '#EAF2E9', '#F4EAF4', '#E8F1F6'] },
        lamp: { label: '暖灯黄', default: '#F0B860', options: ['#F0B860', '#BFD98A', '#E9A0B8', '#7FD3E0'] },
        lav: { label: '薰衣草', default: '#8E7CC3', options: ['#8E7CC3', '#7FA6C9', '#B98CC9', '#6FBFA5'] },
        dim: { label: '弱文字', default: '#A9A3BF', options: ['#A9A3BF', '#A3B8A6', '#BCA3B4', '#9DB2BE'] }
      },
      fonts: {
        heading: { label: '标题字体', default: HEI, options: [HEI, SONG, SERIF] },
        mono: { label: '数字字体', default: MONO, options: [MONO, SANS, IMPACT] }
      }
    },
    presets: [
      { name: '夜航蓝紫', colors: { bg: '#232041', ink: '#F3EEE6', lamp: '#F0B860', lav: '#8E7CC3', dim: '#A9A3BF' } },
      { name: '苔绿深眠', colors: { bg: '#1F2B22', ink: '#EAF2E9', lamp: '#BFD98A', lav: '#7FA6C9', dim: '#A3B8A6' } },
      { name: '梅子夜露', colors: { bg: '#2A1F2E', ink: '#F4EAF4', lamp: '#E9A0B8', lav: '#B98CC9', dim: '#BCA3B4' } },
      { name: '石墨暖灯', colors: { bg: '#1B2A38', ink: '#E8F1F6', lamp: '#7FD3E0', lav: '#6FBFA5', dim: '#9DB2BE' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1920, defaultWidth: 1080, defaultHeight: 1920, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'sl-sky', type: 'image', src: svgUri(specks(1080, 1920, 150, 41, 'rgba(255,255,255,0.85)'), 1080, 1920), x: 0, y: 0, width: 1080, height: 1920, objectFit: 'fill', opacity: 0.4, zIndex: 1 },
      { id: 'sl-glow', type: 'overlay', x: 0, y: 0, width: 1080, height: 1920, background: 'radial-gradient(70% 34% at 80% 8%, rgba(255,220,160,0.22) 0%, rgba(0,0,0,0) 70%)', zIndex: 2 },
      { id: 'sl-halo', type: 'shape', shapeKind: 'circle', x: 762, y: 72, width: 208, height: 208, border: { width: 2, style: 'dashed', color: { $t: 'colors.lamp' } }, opacity: 0.5, zIndex: 3, animation: { name: 'ripple', duration: 4200, iterationCount: 'infinite' } },
      { id: 'sl-moon', type: 'shape', shapeKind: 'circle', x: 800, y: 110, width: 132, height: 132, fill: { $t: 'colors.lamp' }, zIndex: 3, animation: { name: 'pulse', duration: 3800, iterationCount: 'infinite' } },
      { id: 'sl-crater', type: 'image', src: MOON_CRATER, x: 806, y: 116, width: 120, height: 120, objectFit: 'contain', zIndex: 4 },
      { id: 'sl-zzz', type: 'text', content: 'Zzz', fontFamily: SERIF, fontStyle: 'italic', fontSize: 44, color: { $t: 'colors.ink' }, opacity: 0.55, rotation: 8, x: 890, y: 250, width: 110, height: 56, zIndex: 4, animation: { name: 'float', duration: 3200, iterationCount: 'infinite' }, editable: { content: true } },
      { id: 'sl-kicker', type: 'text', content: 'SLEEP LOG · 第 6 周', fontFamily: { $t: 'fonts.mono' }, fontSize: 26, letterSpacing: 8, color: { $t: 'colors.lamp' }, x: 84, y: 76, width: 680, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'sl-title', type: 'text', content: '这周我睡得怎么样', fontFamily: { $t: 'fonts.heading' }, fontSize: 76, fontWeight: 900, color: { $t: 'colors.ink' }, x: 84, y: 124, width: 760, height: 110, zIndex: 4, animation: { name: 'fadeInUp', duration: 520 }, editable: { content: true, fontSize: { type: 'range', min: 48, max: 96 } } },
      { id: 'sl-sub', type: 'text', content: '不聊助眠神器，只聊我那张打卡表', fontFamily: { $t: 'fonts.heading' }, fontSize: 36, color: { $t: 'colors.dim' }, x: 84, y: 254, width: 840, height: 52, zIndex: 4, editable: { content: true } },
      { id: 'sl-h1', type: 'text', content: '日期', fontFamily: { $t: 'fonts.heading' }, fontSize: 26, color: { $t: 'colors.dim' }, x: 84, y: 396, width: 140, height: 38, zIndex: 4 },
      { id: 'sl-h2', type: 'text', content: '入睡', fontFamily: { $t: 'fonts.heading' }, fontSize: 26, color: { $t: 'colors.dim' }, x: 248, y: 396, width: 140, height: 38, zIndex: 4 },
      { id: 'sl-h3', type: 'text', content: '起床', fontFamily: { $t: 'fonts.heading' }, fontSize: 26, color: { $t: 'colors.dim' }, x: 512, y: 396, width: 140, height: 38, zIndex: 4 },
      { id: 'sl-h4', type: 'text', content: '打卡', fontFamily: { $t: 'fonts.heading' }, fontSize: 26, color: { $t: 'colors.dim' }, x: 884, y: 396, width: 112, height: 38, zIndex: 4 },
      { id: 'sl-hrule', type: 'shape', shapeKind: 'rect', x: 84, y: 444, width: 912, height: 2, fill: { $t: 'colors.ink' }, opacity: 0.22, zIndex: 4 },
      { id: 'sl-c1', group: 'sl-c', type: 'shape', shapeKind: 'rect', x: 84, y: 464, width: 912, height: 84, borderRadius: 16, fill: 'rgba(255,255,255,0.055)', zIndex: 3 },
      { id: 'sl-d1', type: 'text', content: '周一', fontFamily: { $t: 'fonts.heading' }, fontSize: 44, fontWeight: 700, color: { $t: 'colors.ink' }, x: 84, y: 478, width: 120, height: 64, zIndex: 4, animation: { name: 'slideInRight', duration: 420 }, editable: { content: true } },
      { id: 'sl-b1', type: 'text', content: '23:10', fontFamily: { $t: 'fonts.mono' }, fontSize: 40, color: { $t: 'colors.dim' }, x: 248, y: 482, width: 230, height: 56, zIndex: 4, editable: { content: true } },
      { id: 'sl-w1', type: 'text', content: '06:40', fontFamily: { $t: 'fonts.mono' }, fontSize: 40, color: { $t: 'colors.dim' }, x: 512, y: 482, width: 230, height: 56, zIndex: 4, editable: { content: true } },
      { id: 'sl-t1', type: 'text', content: '✓', fontFamily: SANS, fontSize: 40, fontWeight: 700, color: { $t: 'colors.lamp' }, x: 884, y: 482, width: 112, height: 56, zIndex: 4 },
      { id: 'sl-c2', group: 'sl-c', type: 'shape', shapeKind: 'rect', x: 84, y: 560, width: 912, height: 84, borderRadius: 16, fill: 'rgba(255,255,255,0.09)', zIndex: 3 },
      { id: 'sl-flag2', group: 'sl-flag', type: 'shape', shapeKind: 'rect', x: 84, y: 574, width: 6, height: 56, borderRadius: 3, fill: { $t: 'colors.lav' }, zIndex: 4 },
      { id: 'sl-d2', type: 'text', content: '周二', fontFamily: { $t: 'fonts.heading' }, fontSize: 44, fontWeight: 700, color: { $t: 'colors.ink' }, x: 84, y: 574, width: 120, height: 64, zIndex: 4, animation: { name: 'slideInRight', duration: 420, delay: 70 }, editable: { content: true } },
      { id: 'sl-b2', type: 'text', content: '23:35', fontFamily: { $t: 'fonts.mono' }, fontSize: 40, color: { $t: 'colors.dim' }, x: 248, y: 578, width: 230, height: 56, zIndex: 4, editable: { content: true } },
      { id: 'sl-w2', type: 'text', content: '06:30', fontFamily: { $t: 'fonts.mono' }, fontSize: 40, color: { $t: 'colors.dim' }, x: 512, y: 578, width: 230, height: 56, zIndex: 4, editable: { content: true } },
      { id: 'sl-t2', type: 'text', content: '✓', fontFamily: SANS, fontSize: 40, fontWeight: 700, color: { $t: 'colors.lamp' }, x: 884, y: 578, width: 112, height: 56, zIndex: 4 },
      { id: 'sl-c3', group: 'sl-c', type: 'shape', shapeKind: 'rect', x: 84, y: 656, width: 912, height: 84, borderRadius: 16, fill: 'rgba(255,255,255,0.055)', zIndex: 3 },
      { id: 'sl-flag3', group: 'sl-flag', type: 'shape', shapeKind: 'rect', x: 84, y: 670, width: 6, height: 56, borderRadius: 3, fill: { $t: 'colors.lav' }, zIndex: 4 },
      { id: 'sl-d3', type: 'text', content: '周三', fontFamily: { $t: 'fonts.heading' }, fontSize: 44, fontWeight: 700, color: { $t: 'colors.ink' }, x: 84, y: 670, width: 120, height: 64, zIndex: 4, animation: { name: 'slideInRight', duration: 420, delay: 140 }, editable: { content: true } },
      { id: 'sl-b3', type: 'text', content: '01:20', fontFamily: { $t: 'fonts.mono' }, fontSize: 40, color: { $t: 'colors.lav' }, x: 248, y: 674, width: 230, height: 56, zIndex: 4, editable: { content: true } },
      { id: 'sl-w3', type: 'text', content: '07:05', fontFamily: { $t: 'fonts.mono' }, fontSize: 40, color: { $t: 'colors.lav' }, x: 512, y: 674, width: 230, height: 56, zIndex: 4, editable: { content: true } },
      { id: 'sl-t3', type: 'text', content: '✗', fontFamily: SANS, fontSize: 40, fontWeight: 700, color: { $t: 'colors.lav' }, x: 884, y: 674, width: 112, height: 56, zIndex: 4 },
      { id: 'sl-c4', group: 'sl-c', type: 'shape', shapeKind: 'rect', x: 84, y: 752, width: 912, height: 84, borderRadius: 16, fill: 'rgba(255,255,255,0.09)', zIndex: 3 },
      { id: 'sl-d4', type: 'text', content: '周四', fontFamily: { $t: 'fonts.heading' }, fontSize: 44, fontWeight: 700, color: { $t: 'colors.ink' }, x: 84, y: 766, width: 120, height: 64, zIndex: 4, animation: { name: 'slideInRight', duration: 420, delay: 210 }, editable: { content: true } },
      { id: 'sl-b4', type: 'text', content: '23:05', fontFamily: { $t: 'fonts.mono' }, fontSize: 40, color: { $t: 'colors.dim' }, x: 248, y: 770, width: 230, height: 56, zIndex: 4, editable: { content: true } },
      { id: 'sl-w4', type: 'text', content: '06:20', fontFamily: { $t: 'fonts.mono' }, fontSize: 40, color: { $t: 'colors.dim' }, x: 512, y: 770, width: 230, height: 56, zIndex: 4, editable: { content: true } },
      { id: 'sl-t4', type: 'text', content: '✓', fontFamily: SANS, fontSize: 40, fontWeight: 700, color: { $t: 'colors.lamp' }, x: 884, y: 770, width: 112, height: 56, zIndex: 4 },
      { id: 'sl-c5', group: 'sl-c', type: 'shape', shapeKind: 'rect', x: 84, y: 848, width: 912, height: 84, borderRadius: 16, fill: 'rgba(255,255,255,0.055)', zIndex: 3 },
      { id: 'sl-d5', type: 'text', content: '周五', fontFamily: { $t: 'fonts.heading' }, fontSize: 44, fontWeight: 700, color: { $t: 'colors.ink' }, x: 84, y: 862, width: 120, height: 64, zIndex: 4, animation: { name: 'slideInRight', duration: 420, delay: 280 }, editable: { content: true } },
      { id: 'sl-b5', type: 'text', content: '23:50', fontFamily: { $t: 'fonts.mono' }, fontSize: 40, color: { $t: 'colors.dim' }, x: 248, y: 866, width: 230, height: 56, zIndex: 4, editable: { content: true } },
      { id: 'sl-w5', type: 'text', content: '06:50', fontFamily: { $t: 'fonts.mono' }, fontSize: 40, color: { $t: 'colors.dim' }, x: 512, y: 866, width: 230, height: 56, zIndex: 4, editable: { content: true } },
      { id: 'sl-t5', type: 'text', content: '✓', fontFamily: SANS, fontSize: 40, fontWeight: 700, color: { $t: 'colors.lamp' }, x: 884, y: 866, width: 112, height: 56, zIndex: 4 },
      { id: 'sl-c6', group: 'sl-c', type: 'shape', shapeKind: 'rect', x: 84, y: 944, width: 912, height: 84, borderRadius: 16, fill: 'rgba(255,255,255,0.09)', zIndex: 3 },
      { id: 'sl-flag6', group: 'sl-flag', type: 'shape', shapeKind: 'rect', x: 84, y: 958, width: 6, height: 56, borderRadius: 3, fill: { $t: 'colors.lav' }, zIndex: 4 },
      { id: 'sl-d6', type: 'text', content: '周六', fontFamily: { $t: 'fonts.heading' }, fontSize: 44, fontWeight: 700, color: { $t: 'colors.ink' }, x: 84, y: 958, width: 120, height: 64, zIndex: 4, animation: { name: 'slideInRight', duration: 420, delay: 350 }, editable: { content: true } },
      { id: 'sl-b6', type: 'text', content: '00:40', fontFamily: { $t: 'fonts.mono' }, fontSize: 40, color: { $t: 'colors.lav' }, x: 248, y: 962, width: 230, height: 56, zIndex: 4, editable: { content: true } },
      { id: 'sl-w6', type: 'text', content: '09:10', fontFamily: { $t: 'fonts.mono' }, fontSize: 40, color: { $t: 'colors.lav' }, x: 512, y: 962, width: 230, height: 56, zIndex: 4, editable: { content: true } },
      { id: 'sl-t6', type: 'text', content: '✓', fontFamily: SANS, fontSize: 40, fontWeight: 700, color: { $t: 'colors.lamp' }, x: 884, y: 962, width: 112, height: 56, zIndex: 4 },
      { id: 'sl-c7', group: 'sl-c', type: 'shape', shapeKind: 'rect', x: 84, y: 1040, width: 912, height: 84, borderRadius: 16, fill: 'rgba(255,255,255,0.055)', zIndex: 3 },
      { id: 'sl-d7', type: 'text', content: '周日', fontFamily: { $t: 'fonts.heading' }, fontSize: 44, fontWeight: 700, color: { $t: 'colors.ink' }, x: 84, y: 1054, width: 120, height: 64, zIndex: 4, animation: { name: 'slideInRight', duration: 420, delay: 420 }, editable: { content: true } },
      { id: 'sl-b7', type: 'text', content: '23:20', fontFamily: { $t: 'fonts.mono' }, fontSize: 40, color: { $t: 'colors.dim' }, x: 248, y: 1058, width: 230, height: 56, zIndex: 4, editable: { content: true } },
      { id: 'sl-w7', type: 'text', content: '07:00', fontFamily: { $t: 'fonts.mono' }, fontSize: 40, color: { $t: 'colors.dim' }, x: 512, y: 1058, width: 230, height: 56, zIndex: 4, editable: { content: true } },
      { id: 'sl-t7', type: 'text', content: '✓', fontFamily: SANS, fontSize: 40, fontWeight: 700, color: { $t: 'colors.lamp' }, x: 884, y: 1058, width: 112, height: 56, zIndex: 4 },
      { id: 'sl-sh', type: 'text', content: '本周自评', fontFamily: { $t: 'fonts.heading' }, fontSize: 44, fontWeight: 800, color: { $t: 'colors.ink' }, x: 84, y: 1180, width: 280, height: 60, zIndex: 4, editable: { content: true } },
      { id: 'sl-score', type: 'text', content: '4.2', fontFamily: { $t: 'fonts.mono' }, fontSize: 126, fontWeight: 700, color: { $t: 'colors.lamp' }, x: 84, y: 1252, width: 300, height: 180, zIndex: 4, animation: { name: 'zoomIn', duration: 480 }, editable: { content: true, fontSize: { type: 'range', min: 80, max: 160 } } },
      { id: 'sl-unit', type: 'text', content: '/ 5 分', fontFamily: { $t: 'fonts.heading' }, fontSize: 44, color: { $t: 'colors.dim' }, x: 396, y: 1352, width: 200, height: 58, zIndex: 4, editable: { content: true } },
      { id: 'sl-pillow', type: 'image', src: PILLOW, x: 740, y: 1330, width: 184, height: 118, objectFit: 'contain', zIndex: 4, animation: { name: 'swing', duration: 4600, iterationCount: 'infinite' } },
      { id: 'sl-track', type: 'shape', shapeKind: 'rect', x: 84, y: 1464, width: 912, height: 22, borderRadius: 11, fill: 'rgba(255,255,255,0.13)', zIndex: 4 },
      { id: 'sl-fill', type: 'shape', shapeKind: 'rect', x: 84, y: 1464, width: 766, height: 22, borderRadius: 11, fill: { $t: 'colors.lamp' }, zIndex: 5, animation: { name: 'shimmer', duration: 3200, iterationCount: 'infinite' } },
      { id: 'sl-k0', group: 'sl-k', type: 'shape', shapeKind: 'rect', x: 84, y: 1500, width: 3, height: 30, fill: { $t: 'colors.ink' }, opacity: 0.4, zIndex: 5 },
      { id: 'sl-k1', group: 'sl-k', type: 'shape', shapeKind: 'rect', x: 312, y: 1500, width: 3, height: 30, fill: { $t: 'colors.ink' }, opacity: 0.4, zIndex: 5 },
      { id: 'sl-k2', group: 'sl-k', type: 'shape', shapeKind: 'rect', x: 540, y: 1500, width: 3, height: 30, fill: { $t: 'colors.ink' }, opacity: 0.4, zIndex: 5 },
      { id: 'sl-k3', group: 'sl-k', type: 'shape', shapeKind: 'rect', x: 768, y: 1500, width: 3, height: 30, fill: { $t: 'colors.ink' }, opacity: 0.4, zIndex: 5 },
      { id: 'sl-k4', group: 'sl-k', type: 'shape', shapeKind: 'rect', x: 993, y: 1500, width: 3, height: 30, fill: { $t: 'colors.ink' }, opacity: 0.4, zIndex: 5 },
      { id: 'sl-lo', type: 'text', content: '睡不够', fontFamily: { $t: 'fonts.heading' }, fontSize: 26, color: { $t: 'colors.dim' }, x: 84, y: 1546, width: 160, height: 38, zIndex: 5, editable: { content: true } },
      { id: 'sl-hi', type: 'text', content: '睡饱了', fontFamily: { $t: 'fonts.heading' }, fontSize: 26, color: { $t: 'colors.dim' }, textAlign: 'right', x: 656, y: 1546, width: 340, height: 38, zIndex: 5, editable: { content: true } },
      { id: 'sl-card', type: 'shape', shapeKind: 'rect', x: 84, y: 1600, width: 912, height: 232, borderRadius: 20, border: { width: 2, style: 'dashed', color: { $t: 'colors.lav' } }, zIndex: 4 },
      { id: 'sl-chead', type: 'text', content: '本周小结', fontFamily: { $t: 'fonts.heading' }, fontSize: 44, fontWeight: 800, color: { $t: 'colors.ink' }, x: 116, y: 1626, width: 260, height: 60, zIndex: 5, editable: { content: true } },
      { id: 'sl-chtag', type: 'text', content: '6/7 天 · 及格', fontFamily: { $t: 'fonts.mono' }, fontSize: 26, color: { $t: 'colors.lav' }, textAlign: 'right', x: 690, y: 1632, width: 274, height: 38, zIndex: 5, editable: { content: true } },
      { id: 'sl-cbody', type: 'text', content: '破功那次是周五的火锅局。\n下周试试把手机放客厅。', fontFamily: { $t: 'fonts.heading' }, fontSize: 36, lineHeight: 1.5, color: { $t: 'colors.ink' }, opacity: 0.9, x: 116, y: 1700, width: 840, height: 120, zIndex: 5, editable: { content: true } },
      { id: 'sl-foot', type: 'text', content: '个人记录 · 不构成任何医疗建议', fontFamily: { $t: 'fonts.heading' }, fontSize: 20, color: { $t: 'colors.dim' }, x: 84, y: 1856, width: 700, height: 34, zIndex: 5, editable: { content: true } }
    ]
  },
  // 3. 节气养生卡 —— 节气大字 + 物候三行 + 宜忌对照（姜黄/朱砂/艾绿暖调，避开水墨节气卡的图式）
  {
    id: 'health-solar-term-care', name: '节气养生卡', version: '1.0.0', category: 'health',
    tags: ['health', 'solar-term', 'season', 'care', '1:1'],
    thumbnail: svgUri('<rect width="135" height="135" fill="%23FBF1DE"/><g fill="%2333302A" opacity="0.08"><circle cx="20" cy="24" r="1.2"/><circle cx="96" cy="16" r="1.2"/><circle cx="60" cy="112" r="1.2"/><circle cx="120" cy="70" r="1.2"/></g><circle cx="96" cy="40" r="17" fill="%23C2452E" opacity="0.13"/><circle cx="96" cy="40" r="22" fill="none" stroke="%239A8C73" stroke-width="1" stroke-dasharray="3 2"/><ellipse cx="94" cy="44" rx="10" ry="9" fill="none" stroke="%23C2452E" stroke-width="1.2"/><rect x="12" y="20" width="46" height="15" rx="2" fill="%2333302A"/><rect x="12" y="40" width="30" height="2.4" fill="%23C2452E"/><g stroke="%2333302A" opacity="0.5" stroke-width="1.4"><path d="M12 50 H46 M12 56 H52 M12 62 H44"/></g><rect x="88" y="52" width="16" height="16" fill="%23C2452E" opacity="0.9" transform="rotate(-6 96 60)"/><g fill="%236E8B5B" opacity="0.16"><rect x="10" y="90" width="54" height="34" rx="4"/></g><g fill="%23C2452E" opacity="0.14"><rect x="70" y="90" width="54" height="34" rx="4"/></g><circle cx="22" cy="100" r="7" fill="%236E8B5B"/><circle cx="82" cy="100" r="7" fill="%23C2452E"/><g fill="%2333302A" opacity="0.55"><rect x="34" y="98" width="24" height="2.4"/><rect x="34" y="106" width="20" height="2.4"/><rect x="94" y="98" width="24" height="2.4"/><rect x="94" y="106" width="20" height="2.4"/></g><rect x="10" y="126" width="40" height="2.4" fill="%239A8C73" opacity="0.6"/>', 135, 135),
    tokens: {
      colors: {
        bg: { label: '宣纸底', default: '#FBF1DE', options: ['#FBF1DE', '#F3E7E2', '#EDF1E2', '#F6EEDD'] },
        ink: { label: '墨字', default: '#33302A', options: ['#33302A', '#4A2F2A', '#333B2E', '#3A3140'] },
        accent: { label: '朱砂', default: '#C2452E', options: ['#C2452E', '#B4553A', '#A6483B', '#C2702E'] },
        herb: { label: '艾草绿', default: '#6E8B5B', options: ['#6E8B5B', '#7C8F52', '#5E8B72', '#8A9A5B'] },
        faint: { label: '淡褐', default: '#9A8C73', options: ['#9A8C73', '#A98F84', '#8B9A84', '#A2917A'] }
      },
      fonts: {
        heading: { label: '标题字体', default: SONG, options: [SONG, HEI, SERIF] },
        sub: { label: '正文字体', default: HEI, options: [HEI, SONG, SANS] }
      }
    },
    presets: [
      { name: '姜黄米纸', colors: { bg: '#FBF1DE', ink: '#33302A', accent: '#C2452E', herb: '#6E8B5B', faint: '#9A8C73' } },
      { name: '陈皮赤褐', colors: { bg: '#F3E7E2', ink: '#4A2F2A', accent: '#B4553A', herb: '#7C8F52', faint: '#A98F84' } },
      { name: '艾青白露', colors: { bg: '#EDF1E2', ink: '#333B2E', accent: '#A6483B', herb: '#5E8B72', faint: '#8B9A84' } },
      { name: '乌梅雪纸', colors: { bg: '#F6EEDD', ink: '#3A3140', accent: '#C2702E', herb: '#8A9A5B', faint: '#A2917A' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1080, defaultWidth: 1080, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'jq-paper', type: 'image', src: svgUri(specks(1080, 1080, 110, 29, 'rgba(0,0,0,0.13)') + '<path d="M0 320 Q340 292 700 322 T1080 306" fill="none" stroke="rgba(0,0,0,0.06)" stroke-width="2"/><path d="M0 780 Q420 812 1080 764" fill="none" stroke="rgba(0,0,0,0.05)" stroke-width="2"/>', 1080, 1080), x: 0, y: 0, width: 1080, height: 1080, objectFit: 'fill', zIndex: 1 },
      { id: 'jq-sun', type: 'shape', shapeKind: 'circle', x: 700, y: 170, width: 250, height: 250, fill: { $t: 'colors.accent' }, opacity: 0.13, zIndex: 2, animation: { name: 'pulse', duration: 4400, iterationCount: 'infinite' } },
      { id: 'jq-ring', type: 'shape', shapeKind: 'circle', x: 660, y: 130, width: 330, height: 330, border: { width: 2, style: 'dashed', color: { $t: 'colors.faint' } }, opacity: 0.7, zIndex: 2 },
      { id: 'jq-persimmon', type: 'image', src: PERSIMMON, x: 716, y: 196, width: 214, height: 224, objectFit: 'contain', zIndex: 3, animation: { name: 'swing', duration: 5200, iterationCount: 'infinite' }, editable: { src: true } },
      { id: 'jq-decor1', type: 'shape', shapeKind: 'circle', x: 632, y: 236, width: 12, height: 12, fill: { $t: 'colors.herb' }, opacity: 0.7, zIndex: 3, animation: { name: 'twinkle', duration: 2800, iterationCount: 'infinite' } },
      { id: 'jq-decor2', type: 'shape', shapeKind: 'circle', x: 1000, y: 512, width: 10, height: 10, fill: { $t: 'colors.accent' }, opacity: 0.65, zIndex: 3, animation: { name: 'twinkle', duration: 3400, delay: 400, iterationCount: 'infinite' } },
      { id: 'jq-kicker', type: 'text', content: '节气养生 · 霜降', fontFamily: { $t: 'fonts.sub' }, fontSize: 26, fontWeight: 700, letterSpacing: 6, color: { $t: 'colors.faint' }, x: 72, y: 88, width: 520, height: 38, zIndex: 4, editable: { content: true } },
      { id: 'jq-no', type: 'text', content: 'NO. 15 / 24', fontFamily: { $t: 'fonts.sub' }, fontSize: 26, letterSpacing: 2, color: { $t: 'colors.faint' }, textAlign: 'right', x: 700, y: 88, width: 308, height: 38, zIndex: 4, editable: { content: true } },
      { id: 'jq-toprule', type: 'shape', shapeKind: 'rect', x: 72, y: 142, width: 936, height: 2, fill: { $t: 'colors.ink' }, opacity: 0.24, zIndex: 4 },
      { id: 'jq-title', type: 'text', content: '霜降', fontFamily: { $t: 'fonts.heading' }, fontSize: 176, fontWeight: 900, letterSpacing: 12, lineHeight: 1.15, color: { $t: 'colors.ink' }, x: 72, y: 172, width: 560, height: 248, zIndex: 4, animation: { name: 'inkReveal', duration: 1200 }, editable: { content: true, fontSize: { type: 'range', min: 120, max: 210 } } },
      { id: 'jq-py', type: 'text', content: 'SHUANG JIANG · 霜降', fontFamily: { $t: 'fonts.sub' }, fontSize: 26, letterSpacing: 5, color: { $t: 'colors.faint' }, x: 72, y: 428, width: 520, height: 38, zIndex: 4, editable: { content: true } },
      { id: 'jq-hrule', type: 'shape', shapeKind: 'rect', x: 72, y: 474, width: 430, height: 2, fill: { $t: 'colors.accent' }, opacity: 0.55, zIndex: 4 },
      { id: 'jq-hou1', type: 'text', content: '一候 · 豺乃祭兽', fontFamily: { $t: 'fonts.heading' }, fontSize: 34, letterSpacing: 2, color: { $t: 'colors.ink' }, opacity: 0.86, x: 72, y: 490, width: 470, height: 48, zIndex: 4, animation: { name: 'slideInLeft', duration: 460 }, editable: { content: true } },
      { id: 'jq-hou2', type: 'text', content: '二候 · 草木黄落', fontFamily: { $t: 'fonts.heading' }, fontSize: 34, letterSpacing: 2, color: { $t: 'colors.ink' }, opacity: 0.86, x: 72, y: 548, width: 470, height: 48, zIndex: 4, animation: { name: 'slideInLeft', duration: 460, delay: 120 }, editable: { content: true } },
      { id: 'jq-hou3', type: 'text', content: '三候 · 蜇虫咸俯', fontFamily: { $t: 'fonts.heading' }, fontSize: 34, letterSpacing: 2, color: { $t: 'colors.ink' }, opacity: 0.86, x: 72, y: 606, width: 470, height: 48, zIndex: 4, animation: { name: 'slideInLeft', duration: 460, delay: 240 }, editable: { content: true } },
      { id: 'jq-date', type: 'text', content: '每年 10 月 23 日前后 · 秋末最后一个节气', fontFamily: { $t: 'fonts.sub' }, fontSize: 26, color: { $t: 'colors.faint' }, x: 72, y: 668, width: 700, height: 38, zIndex: 4, editable: { content: true } },
      { id: 'jq-seal', type: 'shape', shapeKind: 'rect', x: 838, y: 452, width: 152, height: 152, borderRadius: 8, fill: { $t: 'colors.accent' }, opacity: 0.92, rotation: -6, zIndex: 4, animation: { name: 'zoomIn', duration: 460, delay: 420 } },
      { id: 'jq-seal-t', type: 'text', content: '养\n生', fontFamily: { $t: 'fonts.heading' }, fontSize: 44, fontWeight: 700, lineHeight: 1.25, color: { $t: 'colors.bg' }, textAlign: 'center', rotation: -6, x: 838, y: 470, width: 152, height: 120, zIndex: 5 },
      { id: 'jq-yicard', type: 'shape', shapeKind: 'rect', x: 72, y: 730, width: 450, height: 252, borderRadius: 18, fill: { $t: 'colors.herb' }, opacity: 0.14, zIndex: 4 },
      { id: 'jq-jicard', type: 'shape', shapeKind: 'rect', x: 558, y: 730, width: 450, height: 252, borderRadius: 18, fill: { $t: 'colors.accent' }, opacity: 0.12, zIndex: 4 },
      { id: 'jq-yic', type: 'shape', shapeKind: 'circle', x: 104, y: 756, width: 104, height: 104, fill: { $t: 'colors.herb' }, zIndex: 5 },
      { id: 'jq-jic', type: 'shape', shapeKind: 'circle', x: 590, y: 756, width: 104, height: 104, fill: { $t: 'colors.accent' }, zIndex: 5 },
      { id: 'jq-yit', type: 'text', content: '宜', fontFamily: { $t: 'fonts.heading' }, fontSize: 64, fontWeight: 800, color: { $t: 'colors.bg' }, textAlign: 'center', x: 104, y: 762, width: 104, height: 92, zIndex: 6 },
      { id: 'jq-jit', type: 'text', content: '忌', fontFamily: { $t: 'fonts.heading' }, fontSize: 64, fontWeight: 800, color: { $t: 'colors.bg' }, textAlign: 'center', x: 590, y: 762, width: 104, height: 92, zIndex: 6 },
      { id: 'jq-yil', type: 'text', content: '添衣护住脚踝\n睡前泡个热脚', fontFamily: { $t: 'fonts.sub' }, fontSize: 34, lineHeight: 1.45, color: { $t: 'colors.ink' }, x: 104, y: 872, width: 390, height: 100, zIndex: 6, editable: { content: true } },
      { id: 'jq-jil', type: 'text', content: '冷饮配空腹\n熬夜图痛快', fontFamily: { $t: 'fonts.sub' }, fontSize: 34, lineHeight: 1.45, color: { $t: 'colors.ink' }, x: 590, y: 872, width: 390, height: 100, zIndex: 6, editable: { content: true } },
      { id: 'jq-foot', type: 'text', content: '顺时过节气 · 聊聊参考，别当医嘱', fontFamily: { $t: 'fonts.sub' }, fontSize: 20, color: { $t: 'colors.faint' }, x: 72, y: 1006, width: 620, height: 32, zIndex: 5, editable: { content: true } },
      { id: 'jq-sign', type: 'text', content: '节气食堂', fontFamily: { $t: 'fonts.heading' }, fontSize: 20, letterSpacing: 6, color: { $t: 'colors.accent' }, textAlign: 'right', x: 700, y: 1006, width: 308, height: 32, zIndex: 5, editable: { content: true } }
    ]
  },
  // 4. 体检指标科普 —— 指标行表 + 箭头涨跌标注 + 「看懂报告」标题
  {
    id: 'health-checkup-rows', name: '体检指标科普', version: '1.0.0', category: 'health',
    tags: ['health', 'checkup', 'report', 'lab', '3:4'],
    thumbnail: svgUri('<rect width="108" height="144" fill="%23F7F5EF"/><g stroke="%2322384A" stroke-width="0.8" opacity="0.07"><path d="M0 18 H108 M0 36 H108 M0 54 H108 M0 72 H108 M0 90 H108 M0 108 H108 M0 126 H108"/></g><rect x="10" y="14" width="34" height="4" rx="1" fill="%23C9593D"/><rect x="10" y="22" width="62" height="10" rx="1" fill="%2322384A"/><rect x="10" y="36" width="70" height="4" rx="1" fill="%2322384A" opacity="0.4"/><g fill="%2322384A" opacity="0.05"><rect x="10" y="48" width="88" height="16" rx="3"/><rect x="10" y="68" width="88" height="16" rx="3"/><rect x="10" y="88" width="88" height="16" rx="3"/><rect x="10" y="108" width="88" height="16" rx="3"/></g><g fill="%2322384A" opacity="0.55"><rect x="14" y="54" width="22" height="3"/><rect x="14" y="74" width="20" height="3"/><rect x="14" y="94" width="24" height="3"/><rect x="14" y="114" width="18" height="3"/></g><g fill="%238C9AA6"><rect x="44" y="54" width="14" height="3"/><rect x="44" y="74" width="14" height="3"/><rect x="44" y="94" width="14" height="3"/><rect x="44" y="114" width="14" height="3"/></g><g stroke-width="1.6" stroke-linecap="round"><path d="M84 57 v-5 m-2 2 l2-2 l2 2" stroke="%23C9593D" fill="none"/><path d="M84 77 h6" stroke="%234E8C6A" fill="none"/><path d="M84 97 h6" stroke="%234E8C6A" fill="none"/><path d="M84 117 v-5 m-2 2 l2-2 l2 2" stroke="%23C9593D" fill="none"/></g><g fill="%23C9593D"><rect x="10" y="51" width="2" height="10"/><rect x="10" y="91" width="2" height="10"/></g><rect x="10" y="130" width="46" height="3" rx="1" fill="%238C9AA6" opacity="0.5"/>', 108, 144),
    tokens: {
      colors: {
        bg: { label: '报告纸', default: '#F7F5EF', options: ['#F7F5EF', '#F1F4F6', '#F6F1EA', '#EEF3EE'] },
        ink: { label: '诊室蓝', default: '#22384A', options: ['#22384A', '#1F2A38', '#4A3B2C', '#2C4038'] },
        mark: { label: '标注朱', default: '#C9593D', options: ['#C9593D', '#D14343', '#C2702E', '#B85A6B'] },
        ok: { label: '合格绿', default: '#4E8C6A', options: ['#4E8C6A', '#3E8C8C', '#6E8B5B', '#4C7FA8'] },
        faint: { label: '表格灰', default: '#8C9AA6', options: ['#8C9AA6', '#9AA6B0', '#A0937F', '#8FA296'] }
      },
      fonts: {
        heading: { label: '标题字体', default: HEI, options: [HEI, SONG, SANS] },
        mono: { label: '数值字体', default: MONO, options: [MONO, SANS, IMPACT] }
      }
    },
    presets: [
      { name: '米纸诊室', colors: { bg: '#F7F5EF', ink: '#22384A', mark: '#C9593D', ok: '#4E8C6A', faint: '#8C9AA6' } },
      { name: '雾蓝体检', colors: { bg: '#F1F4F6', ink: '#1F2A38', mark: '#D14343', ok: '#3E8C8C', faint: '#9AA6B0' } },
      { name: '暖沙内科', colors: { bg: '#F6F1EA', ink: '#4A3B2C', mark: '#C2702E', ok: '#6E8B5B', faint: '#A0937F' } },
      { name: '素白儿科', colors: { bg: '#EEF3EE', ink: '#2C4038', mark: '#B85A6B', ok: '#4C7FA8', faint: '#8FA296' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1440, defaultWidth: 1080, defaultHeight: 1440, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'tj-paper', type: 'image', src: svgUri(rules(1080, 1440, 72, 'rgba(0,0,0,0.045)') + '<line x1="340" y1="0" x2="340" y2="1440" stroke="rgba(0,0,0,0.04)" stroke-width="1"/><line x1="1008" y1="0" x2="1008" y2="1440" stroke="rgba(0,0,0,0.05)" stroke-width="1"/>', 1080, 1440), x: 0, y: 0, width: 1080, height: 1440, objectFit: 'fill', zIndex: 1 },
      { id: 'tj-ghost', type: 'text', content: '↑', fontFamily: { $t: 'fonts.mono' }, fontSize: 420, color: { $t: 'colors.ink' }, opacity: 0.07, textAlign: 'center', x: 680, y: 560, width: 340, height: 520, zIndex: 2, animation: { name: 'drift', duration: 7000, iterationCount: 'infinite' } },
      { id: 'tj-kicker', type: 'text', content: '体检报告怎么读 · 第 3 篇', fontFamily: { $t: 'fonts.heading' }, fontSize: 26, fontWeight: 700, letterSpacing: 4, color: { $t: 'colors.mark' }, x: 76, y: 76, width: 620, height: 38, zIndex: 4, editable: { content: true } },
      { id: 'tj-title', type: 'text', content: '看懂报告\n上的六个箭头', fontFamily: { $t: 'fonts.heading' }, fontSize: 84, fontWeight: 900, lineHeight: 1.18, color: { $t: 'colors.ink' }, x: 76, y: 140, width: 928, height: 224, zIndex: 4, animation: { name: 'fadeInUp', duration: 520 }, editable: { content: true, fontSize: { type: 'range', min: 56, max: 104 } } },
      { id: 'tj-sub', type: 'text', content: '箭头朝上不等于出事，先把参考区间找出来', fontFamily: { $t: 'fonts.heading' }, fontSize: 34, color: { $t: 'colors.faint' }, x: 76, y: 382, width: 928, height: 52, zIndex: 4, editable: { content: true } },
      { id: 'tj-h1', type: 'text', content: '项目 / 单位', fontFamily: { $t: 'fonts.heading' }, fontSize: 26, letterSpacing: 2, color: { $t: 'colors.faint' }, x: 76, y: 486, width: 230, height: 38, zIndex: 4 },
      { id: 'tj-h2', type: 'text', content: '本次数值', fontFamily: { $t: 'fonts.heading' }, fontSize: 26, letterSpacing: 2, color: { $t: 'colors.faint' }, x: 350, y: 486, width: 170, height: 38, zIndex: 4 },
      { id: 'tj-h3', type: 'text', content: '参考区间', fontFamily: { $t: 'fonts.heading' }, fontSize: 26, letterSpacing: 2, color: { $t: 'colors.faint' }, x: 544, y: 486, width: 200, height: 38, zIndex: 4 },
      { id: 'tj-h4', type: 'text', content: '变化', fontFamily: { $t: 'fonts.heading' }, fontSize: 26, letterSpacing: 2, color: { $t: 'colors.faint' }, x: 844, y: 486, width: 160, height: 38, zIndex: 4 },
      { id: 'tj-hrule', type: 'shape', shapeKind: 'rect', x: 76, y: 530, width: 928, height: 2, fill: { $t: 'colors.ink' }, opacity: 0.24, zIndex: 4 },
      { id: 'tj-c1', group: 'tj-c', type: 'shape', shapeKind: 'rect', x: 76, y: 548, width: 928, height: 108, borderRadius: 14, fill: 'rgba(0,0,0,0.04)', zIndex: 3 },
      { id: 'tj-flag1', type: 'shape', shapeKind: 'rect', x: 76, y: 564, width: 6, height: 76, borderRadius: 3, fill: { $t: 'colors.mark' }, zIndex: 4 },
      { id: 'tj-n1', type: 'text', content: '总胆固醇', fontFamily: { $t: 'fonts.heading' }, fontSize: 38, fontWeight: 700, color: { $t: 'colors.ink' }, x: 100, y: 562, width: 230, height: 50, zIndex: 5, animation: { name: 'slideInLeft', duration: 440 }, editable: { content: true } },
      { id: 'tj-u1', type: 'text', content: 'mmol/L', fontFamily: { $t: 'fonts.mono' }, fontSize: 26, color: { $t: 'colors.faint' }, x: 100, y: 610, width: 230, height: 34, zIndex: 5 },
      { id: 'tj-v1', type: 'text', content: '3.42', fontFamily: { $t: 'fonts.mono' }, fontSize: 44, fontWeight: 700, color: { $t: 'colors.ink' }, x: 350, y: 572, width: 170, height: 62, zIndex: 5, editable: { content: true } },
      { id: 'tj-r1', type: 'text', content: '0 ~ 3.4', fontFamily: { $t: 'fonts.mono' }, fontSize: 30, color: { $t: 'colors.faint' }, x: 544, y: 578, width: 200, height: 48, zIndex: 5, editable: { content: true } },
      { id: 'tj-a1', type: 'text', content: '↑ 偏高', fontFamily: { $t: 'fonts.heading' }, fontSize: 44, fontWeight: 800, color: { $t: 'colors.mark' }, x: 844, y: 572, width: 160, height: 62, zIndex: 5, animation: { name: 'wobble', duration: 2600, iterationCount: 'infinite' }, editable: { content: true } },
      { id: 'tj-c2', group: 'tj-c', type: 'shape', shapeKind: 'rect', x: 76, y: 672, width: 928, height: 108, borderRadius: 14, fill: 'rgba(0,0,0,0.02)', zIndex: 3 },
      { id: 'tj-n2', type: 'text', content: '空腹血糖', fontFamily: { $t: 'fonts.heading' }, fontSize: 38, fontWeight: 700, color: { $t: 'colors.ink' }, x: 100, y: 686, width: 230, height: 50, zIndex: 5, animation: { name: 'slideInLeft', duration: 440, delay: 90 }, editable: { content: true } },
      { id: 'tj-u2', type: 'text', content: 'mmol/L', fontFamily: { $t: 'fonts.mono' }, fontSize: 26, color: { $t: 'colors.faint' }, x: 100, y: 734, width: 230, height: 34, zIndex: 5 },
      { id: 'tj-v2', type: 'text', content: '5.6', fontFamily: { $t: 'fonts.mono' }, fontSize: 44, fontWeight: 700, color: { $t: 'colors.ink' }, x: 350, y: 696, width: 170, height: 62, zIndex: 5, editable: { content: true } },
      { id: 'tj-r2', type: 'text', content: '3.9 ~ 6.1', fontFamily: { $t: 'fonts.mono' }, fontSize: 30, color: { $t: 'colors.faint' }, x: 544, y: 702, width: 200, height: 48, zIndex: 5, editable: { content: true } },
      { id: 'tj-a2', type: 'text', content: '→ 合适', fontFamily: { $t: 'fonts.heading' }, fontSize: 44, fontWeight: 800, color: { $t: 'colors.ok' }, x: 844, y: 696, width: 160, height: 62, zIndex: 5, editable: { content: true } },
      { id: 'tj-c3', group: 'tj-c', type: 'shape', shapeKind: 'rect', x: 76, y: 796, width: 928, height: 108, borderRadius: 14, fill: 'rgba(0,0,0,0.04)', zIndex: 3 },
      { id: 'tj-n3', type: 'text', content: '谷丙转氨酶', fontFamily: { $t: 'fonts.heading' }, fontSize: 38, fontWeight: 700, color: { $t: 'colors.ink' }, x: 100, y: 810, width: 230, height: 50, zIndex: 5, animation: { name: 'slideInLeft', duration: 440, delay: 180 }, editable: { content: true } },
      { id: 'tj-u3', type: 'text', content: 'U/L', fontFamily: { $t: 'fonts.mono' }, fontSize: 26, color: { $t: 'colors.faint' }, x: 100, y: 858, width: 230, height: 34, zIndex: 5 },
      { id: 'tj-v3', type: 'text', content: '22', fontFamily: { $t: 'fonts.mono' }, fontSize: 44, fontWeight: 700, color: { $t: 'colors.ink' }, x: 350, y: 820, width: 170, height: 62, zIndex: 5, editable: { content: true } },
      { id: 'tj-r3', type: 'text', content: '9 ~ 50', fontFamily: { $t: 'fonts.mono' }, fontSize: 30, color: { $t: 'colors.faint' }, x: 544, y: 826, width: 200, height: 48, zIndex: 5, editable: { content: true } },
      { id: 'tj-a3', type: 'text', content: '→ 合适', fontFamily: { $t: 'fonts.heading' }, fontSize: 44, fontWeight: 800, color: { $t: 'colors.ok' }, x: 844, y: 820, width: 160, height: 62, zIndex: 5, editable: { content: true } },
      { id: 'tj-c4', group: 'tj-c', type: 'shape', shapeKind: 'rect', x: 76, y: 920, width: 928, height: 108, borderRadius: 14, fill: 'rgba(0,0,0,0.02)', zIndex: 3 },
      { id: 'tj-n4', type: 'text', content: '血红蛋白', fontFamily: { $t: 'fonts.heading' }, fontSize: 38, fontWeight: 700, color: { $t: 'colors.ink' }, x: 100, y: 934, width: 230, height: 50, zIndex: 5, animation: { name: 'slideInLeft', duration: 440, delay: 270 }, editable: { content: true } },
      { id: 'tj-u4', type: 'text', content: 'g/L', fontFamily: { $t: 'fonts.mono' }, fontSize: 26, color: { $t: 'colors.faint' }, x: 100, y: 982, width: 230, height: 34, zIndex: 5 },
      { id: 'tj-v4', type: 'text', content: '148', fontFamily: { $t: 'fonts.mono' }, fontSize: 44, fontWeight: 700, color: { $t: 'colors.ink' }, x: 350, y: 944, width: 170, height: 62, zIndex: 5, editable: { content: true } },
      { id: 'tj-r4', type: 'text', content: '130 ~ 175', fontFamily: { $t: 'fonts.mono' }, fontSize: 30, color: { $t: 'colors.faint' }, x: 544, y: 950, width: 200, height: 48, zIndex: 5, editable: { content: true } },
      { id: 'tj-a4', type: 'text', content: '→ 合适', fontFamily: { $t: 'fonts.heading' }, fontSize: 44, fontWeight: 800, color: { $t: 'colors.ok' }, x: 844, y: 944, width: 160, height: 62, zIndex: 5, editable: { content: true } },
      { id: 'tj-c5', group: 'tj-c', type: 'shape', shapeKind: 'rect', x: 76, y: 1044, width: 928, height: 108, borderRadius: 14, fill: 'rgba(0,0,0,0.04)', zIndex: 3 },
      { id: 'tj-flag5', type: 'shape', shapeKind: 'rect', x: 76, y: 1060, width: 6, height: 76, borderRadius: 3, fill: { $t: 'colors.mark' }, zIndex: 4 },
      { id: 'tj-n5', type: 'text', content: '尿酸', fontFamily: { $t: 'fonts.heading' }, fontSize: 38, fontWeight: 700, color: { $t: 'colors.ink' }, x: 100, y: 1058, width: 230, height: 50, zIndex: 5, animation: { name: 'slideInLeft', duration: 440, delay: 360 }, editable: { content: true } },
      { id: 'tj-u5', type: 'text', content: 'μmol/L', fontFamily: { $t: 'fonts.mono' }, fontSize: 26, color: { $t: 'colors.faint' }, x: 100, y: 1106, width: 230, height: 34, zIndex: 5 },
      { id: 'tj-v5', type: 'text', content: '452', fontFamily: { $t: 'fonts.mono' }, fontSize: 44, fontWeight: 700, color: { $t: 'colors.ink' }, x: 350, y: 1068, width: 170, height: 62, zIndex: 5, editable: { content: true } },
      { id: 'tj-r5', type: 'text', content: '208 ~ 428', fontFamily: { $t: 'fonts.mono' }, fontSize: 30, color: { $t: 'colors.faint' }, x: 544, y: 1074, width: 200, height: 48, zIndex: 5, editable: { content: true } },
      { id: 'tj-a5', type: 'text', content: '↑ 留意', fontFamily: { $t: 'fonts.heading' }, fontSize: 44, fontWeight: 800, color: { $t: 'colors.mark' }, x: 844, y: 1068, width: 160, height: 62, zIndex: 5, animation: { name: 'wobble', duration: 2600, delay: 600, iterationCount: 'infinite' }, editable: { content: true } },
      { id: 'tj-c6', group: 'tj-c', type: 'shape', shapeKind: 'rect', x: 76, y: 1168, width: 928, height: 108, borderRadius: 14, fill: 'rgba(0,0,0,0.02)', zIndex: 3 },
      { id: 'tj-n6', type: 'text', content: '腰围', fontFamily: { $t: 'fonts.heading' }, fontSize: 38, fontWeight: 700, color: { $t: 'colors.ink' }, x: 100, y: 1182, width: 230, height: 50, zIndex: 5, animation: { name: 'slideInLeft', duration: 440, delay: 450 }, editable: { content: true } },
      { id: 'tj-u6', type: 'text', content: 'cm', fontFamily: { $t: 'fonts.mono' }, fontSize: 26, color: { $t: 'colors.faint' }, x: 100, y: 1230, width: 230, height: 34, zIndex: 5 },
      { id: 'tj-v6', type: 'text', content: '88', fontFamily: { $t: 'fonts.mono' }, fontSize: 44, fontWeight: 700, color: { $t: 'colors.ink' }, x: 350, y: 1192, width: 170, height: 62, zIndex: 5, editable: { content: true } },
      { id: 'tj-r6', type: 'text', content: '男 < 90', fontFamily: { $t: 'fonts.mono' }, fontSize: 30, color: { $t: 'colors.faint' }, x: 544, y: 1198, width: 200, height: 48, zIndex: 5, editable: { content: true } },
      { id: 'tj-a6', type: 'text', content: '→ 合适', fontFamily: { $t: 'fonts.heading' }, fontSize: 44, fontWeight: 800, color: { $t: 'colors.ok' }, x: 844, y: 1192, width: 160, height: 62, zIndex: 5, editable: { content: true } },
      { id: 'tj-note', type: 'text', content: '数值为示意 · 请以实验室参考区间和医生意见为准', fontFamily: { $t: 'fonts.heading' }, fontSize: 20, color: { $t: 'colors.faint' }, x: 76, y: 1320, width: 760, height: 32, zIndex: 5, editable: { content: true } },
      { id: 'tj-ep', type: 'text', content: 'EP.03', fontFamily: { $t: 'fonts.mono' }, fontSize: 20, letterSpacing: 2, color: { $t: 'colors.mark' }, textAlign: 'right', x: 844, y: 1320, width: 160, height: 32, zIndex: 5, editable: { content: true } }
    ]
  },
  // 5. 一周早餐计划 —— 周一到周日行 + 耗时标签 + 购物清单角块
  {
    id: 'health-breakfast-week', name: '一周早餐计划', version: '1.0.0', category: 'health',
    tags: ['health', 'breakfast', 'weekly-plan', 'meal', '4:5'],
    thumbnail: svgUri('<rect width="108" height="135" fill="%23FDF3E3"/><g fill="%234A3721" opacity="0.07"><circle cx="18" cy="20" r="1.2"/><circle cx="86" cy="14" r="1.2"/><circle cx="60" cy="124" r="1.2"/></g><rect x="10" y="12" width="30" height="4" rx="2" fill="%23E08A3C"/><rect x="10" y="20" width="56" height="10" rx="2" fill="%234A3721"/><rect x="10" y="34" width="44" height="3" rx="1" fill="%234A3721" opacity="0.4"/><g fill="%234A3721" opacity="0.05"><rect x="10" y="44" width="88" height="10" rx="3"/><rect x="10" y="58" width="88" height="10" rx="3"/><rect x="10" y="72" width="88" height="10" rx="3"/><rect x="10" y="86" width="88" height="10" rx="3"/></g><g fill="%234A3721" opacity="0.6"><rect x="14" y="48" width="9" height="2.4"/><rect x="14" y="62" width="9" height="2.4"/><rect x="14" y="76" width="9" height="2.4"/><rect x="14" y="90" width="9" height="2.4"/><rect x="28" y="48" width="30" height="2.4"/><rect x="28" y="62" width="26" height="2.4"/><rect x="28" y="76" width="32" height="2.4"/><rect x="28" y="90" width="24" height="2.4"/></g><g><rect x="78" y="46" width="16" height="6" rx="3" fill="%237A9A5E" opacity="0.35"/><rect x="78" y="60" width="16" height="6" rx="3" fill="%237A9A5E" opacity="0.35"/><rect x="78" y="74" width="16" height="6" rx="3" fill="%23E08A3C" opacity="0.35"/><rect x="78" y="88" width="16" height="6" rx="3" fill="%23B5495B" opacity="0.3"/></g><rect x="10" y="104" width="88" height="20" rx="4" fill="%234A3721" opacity="0.07"/><rect x="14" y="108" width="26" height="4" rx="1" fill="%234A3721" opacity="0.6"/><g stroke="%234A3721" stroke-width="1.6" fill="none" opacity="0.45"><path d="M14 118 H70 M14 121 H56"/></g><g stroke="%234A3721" stroke-width="1.4" fill="none" opacity="0.5"><circle cx="88" cy="24" r="7"/><circle cx="88" cy="24" r="4"/><path d="M95 24 H104"/></g>', 108, 135),
    tokens: {
      colors: {
        bg: { label: '牛乳底', default: '#FDF3E3', options: ['#FDF3E3', '#FBF4EA', '#F4F1E4', '#F8EFE7'] },
        ink: { label: '主文字', default: '#4A3721', options: ['#4A3721', '#3D2B2B', '#333B2E', '#45332A'] },
        accent: { label: '焦糖橘', default: '#E08A3C', options: ['#E08A3C', '#D97706', '#C97A4B', '#E0904A'] },
        berry: { label: '莓果红', default: '#B5495B', options: ['#B5495B', '#A63B4A', '#8C5A6B', '#B04A5A'] },
        herb: { label: '燕麦绿', default: '#7A9A5E', options: ['#7A9A5E', '#6E8B5B', '#8A9A5B', '#5E8B72'] }
      },
      fonts: {
        heading: { label: '标题字体', default: HEI, options: [HEI, SONG, SERIF] },
        sub: { label: '正文字体', default: HEI, options: [HEI, SANS, MONO] }
      }
    },
    presets: [
      { name: '牛乳麦片', colors: { bg: '#FDF3E3', ink: '#4A3721', accent: '#E08A3C', berry: '#B5495B', herb: '#7A9A5E' } },
      { name: '莓果酸奶', colors: { bg: '#FBF4EA', ink: '#3D2B2B', accent: '#D97706', berry: '#A63B4A', herb: '#6E8B5B' } },
      { name: '焦糖肉桂', colors: { bg: '#F4F1E4', ink: '#333B2E', accent: '#C97A4B', berry: '#8C5A6B', herb: '#8A9A5B' } },
      { name: '青柠燕麦', colors: { bg: '#F8EFE7', ink: '#45332A', accent: '#E0904A', berry: '#B04A5A', herb: '#5E8B72' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'bk-grain', type: 'image', src: svgUri(specks(1080, 1350, 120, 43, 'rgba(0,0,0,0.10)') + '<path d="M0 240 Q360 212 720 244 T1080 226" fill="none" stroke="rgba(0,0,0,0.05)" stroke-width="2"/><path d="M0 1010 Q420 1042 1080 996" fill="none" stroke="rgba(0,0,0,0.05)" stroke-width="2"/>', 1080, 1350), x: 0, y: 0, width: 1080, height: 1350, objectFit: 'fill', zIndex: 1 },
      { id: 'bk-light', type: 'overlay', x: 0, y: 0, width: 1080, height: 1350, background: 'radial-gradient(96% 44% at 82% 6%, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 66%)', zIndex: 2 },
      { id: 'bk-skillet', type: 'image', src: SKILLET, x: 770, y: 92, width: 170, height: 119, objectFit: 'contain', zIndex: 3, animation: { name: 'zoomIn', duration: 520, delay: 120 } },
      { id: 'bk-steam', type: 'image', src: STEAM, x: 800, y: 44, width: 88, height: 59, objectFit: 'contain', zIndex: 3, animation: { name: 'float', duration: 3800, iterationCount: 'infinite' } },
      { id: 'bk-fork', type: 'image', src: FORK, x: 942, y: 118, width: 66, height: 57, objectFit: 'contain', rotation: 14, zIndex: 3, animation: { name: 'swing', duration: 4800, iterationCount: 'infinite' } },
      { id: 'bk-spark', type: 'shape', shapeKind: 'circle', x: 980, y: 300, width: 16, height: 16, fill: { $t: 'colors.accent' }, opacity: 0.6, zIndex: 3, animation: { name: 'twinkle', duration: 3000, iterationCount: 'infinite' } },
      { id: 'bk-kicker', type: 'text', content: '一周早餐 · 都在十分钟内', fontFamily: { $t: 'fonts.sub' }, fontSize: 26, fontWeight: 700, letterSpacing: 3, color: { $t: 'colors.accent' }, x: 72, y: 80, width: 620, height: 38, zIndex: 4, editable: { content: true } },
      { id: 'bk-title', type: 'text', content: '一周早餐清单', fontFamily: { $t: 'fonts.heading' }, fontSize: 88, fontWeight: 900, color: { $t: 'colors.ink' }, x: 72, y: 128, width: 760, height: 128, zIndex: 4, animation: { name: 'fadeInUp', duration: 520 }, editable: { content: true, fontSize: { type: 'range', min: 56, max: 104 } } },
      { id: 'bk-sub', type: 'text', content: '十分钟以内能搞定的那种，不追求精致', fontFamily: { $t: 'fonts.sub' }, fontSize: 34, color: { $t: 'colors.ink' }, opacity: 0.72, x: 72, y: 272, width: 900, height: 48, zIndex: 4, editable: { content: true } },
      { id: 'bk-c1', group: 'bk-c', type: 'shape', shapeKind: 'rect', x: 72, y: 352, width: 936, height: 96, borderRadius: 16, fill: 'rgba(0,0,0,0.04)', zIndex: 3 },
      { id: 'bk-d1', type: 'text', content: '周一', fontFamily: { $t: 'fonts.heading' }, fontSize: 40, fontWeight: 800, color: { $t: 'colors.ink' }, x: 104, y: 374, width: 104, height: 58, zIndex: 4, animation: { name: 'rise', duration: 440 }, editable: { content: true } },
      { id: 'bk-x1', type: 'text', content: '燕麦牛奶粥 + 一颗蛋', fontFamily: { $t: 'fonts.sub' }, fontSize: 34, color: { $t: 'colors.ink' }, opacity: 0.9, x: 228, y: 376, width: 560, height: 50, zIndex: 4, editable: { content: true } },
      { id: 'bk-p1', group: 'bk-p', type: 'shape', shapeKind: 'rect', x: 820, y: 376, width: 156, height: 48, borderRadius: 999, fill: { $t: 'colors.herb' }, opacity: 0.2, zIndex: 4 },
      { id: 'bk-pt1', type: 'text', content: '8 分钟', fontFamily: { $t: 'fonts.sub' }, fontSize: 26, fontWeight: 700, color: { $t: 'colors.herb' }, textAlign: 'center', x: 820, y: 384, width: 156, height: 38, zIndex: 5, editable: { content: true } },
      { id: 'bk-c2', group: 'bk-c', type: 'shape', shapeKind: 'rect', x: 72, y: 462, width: 936, height: 96, borderRadius: 16, fill: 'rgba(0,0,0,0.04)', zIndex: 3 },
      { id: 'bk-d2', type: 'text', content: '周二', fontFamily: { $t: 'fonts.heading' }, fontSize: 40, fontWeight: 800, color: { $t: 'colors.ink' }, x: 104, y: 484, width: 104, height: 58, zIndex: 4, animation: { name: 'rise', duration: 440, delay: 70 }, editable: { content: true } },
      { id: 'bk-x2', type: 'text', content: '全麦吐司 + 煎蛋 + 豆浆', fontFamily: { $t: 'fonts.sub' }, fontSize: 34, color: { $t: 'colors.ink' }, opacity: 0.9, x: 228, y: 486, width: 560, height: 50, zIndex: 4, editable: { content: true } },
      { id: 'bk-p2', group: 'bk-p', type: 'shape', shapeKind: 'rect', x: 820, y: 486, width: 156, height: 48, borderRadius: 999, fill: { $t: 'colors.herb' }, opacity: 0.2, zIndex: 4 },
      { id: 'bk-pt2', type: 'text', content: '7 分钟', fontFamily: { $t: 'fonts.sub' }, fontSize: 26, fontWeight: 700, color: { $t: 'colors.herb' }, textAlign: 'center', x: 820, y: 494, width: 156, height: 38, zIndex: 5, editable: { content: true } },
      { id: 'bk-c3', group: 'bk-c', type: 'shape', shapeKind: 'rect', x: 72, y: 572, width: 936, height: 96, borderRadius: 16, fill: 'rgba(0,0,0,0.04)', zIndex: 3 },
      { id: 'bk-d3', type: 'text', content: '周三', fontFamily: { $t: 'fonts.heading' }, fontSize: 40, fontWeight: 800, color: { $t: 'colors.ink' }, x: 104, y: 594, width: 104, height: 58, zIndex: 4, animation: { name: 'rise', duration: 440, delay: 140 }, editable: { content: true } },
      { id: 'bk-x3', type: 'text', content: '鸡蛋三明治 · 带去公司', fontFamily: { $t: 'fonts.sub' }, fontSize: 34, color: { $t: 'colors.ink' }, opacity: 0.9, x: 228, y: 596, width: 560, height: 50, zIndex: 4, editable: { content: true } },
      { id: 'bk-p3', group: 'bk-p', type: 'shape', shapeKind: 'rect', x: 820, y: 596, width: 156, height: 48, borderRadius: 999, fill: { $t: 'colors.herb' }, opacity: 0.2, zIndex: 4 },
      { id: 'bk-pt3', type: 'text', content: '6 分钟', fontFamily: { $t: 'fonts.sub' }, fontSize: 26, fontWeight: 700, color: { $t: 'colors.herb' }, textAlign: 'center', x: 820, y: 604, width: 156, height: 38, zIndex: 5, editable: { content: true } },
      { id: 'bk-c4', group: 'bk-c', type: 'shape', shapeKind: 'rect', x: 72, y: 682, width: 936, height: 96, borderRadius: 16, fill: 'rgba(0,0,0,0.04)', zIndex: 3 },
      { id: 'bk-d4', type: 'text', content: '周四', fontFamily: { $t: 'fonts.heading' }, fontSize: 40, fontWeight: 800, color: { $t: 'colors.ink' }, x: 104, y: 704, width: 104, height: 58, zIndex: 4, animation: { name: 'rise', duration: 440, delay: 210 }, editable: { content: true } },
      { id: 'bk-x4', type: 'text', content: '玉米 + 酸奶 + 一把坚果', fontFamily: { $t: 'fonts.sub' }, fontSize: 34, color: { $t: 'colors.ink' }, opacity: 0.9, x: 228, y: 706, width: 560, height: 50, zIndex: 4, editable: { content: true } },
      { id: 'bk-p4', group: 'bk-p', type: 'shape', shapeKind: 'rect', x: 820, y: 706, width: 156, height: 48, borderRadius: 999, fill: { $t: 'colors.herb' }, opacity: 0.2, zIndex: 4 },
      { id: 'bk-pt4', type: 'text', content: '5 分钟', fontFamily: { $t: 'fonts.sub' }, fontSize: 26, fontWeight: 700, color: { $t: 'colors.herb' }, textAlign: 'center', x: 820, y: 714, width: 156, height: 38, zIndex: 5, editable: { content: true } },
      { id: 'bk-c5', group: 'bk-c', type: 'shape', shapeKind: 'rect', x: 72, y: 792, width: 936, height: 96, borderRadius: 16, fill: 'rgba(0,0,0,0.04)', zIndex: 3 },
      { id: 'bk-d5', type: 'text', content: '周五', fontFamily: { $t: 'fonts.heading' }, fontSize: 40, fontWeight: 800, color: { $t: 'colors.ink' }, x: 104, y: 814, width: 104, height: 58, zIndex: 4, animation: { name: 'rise', duration: 440, delay: 280 }, editable: { content: true } },
      { id: 'bk-x5', type: 'text', content: '微波昨晚的杂粮饭', fontFamily: { $t: 'fonts.sub' }, fontSize: 34, color: { $t: 'colors.ink' }, opacity: 0.9, x: 228, y: 816, width: 560, height: 50, zIndex: 4, editable: { content: true } },
      { id: 'bk-p5', group: 'bk-p', type: 'shape', shapeKind: 'rect', x: 820, y: 816, width: 156, height: 48, borderRadius: 999, fill: { $t: 'colors.accent' }, opacity: 0.22, zIndex: 4 },
      { id: 'bk-pt5', type: 'text', content: '4 分钟', fontFamily: { $t: 'fonts.sub' }, fontSize: 26, fontWeight: 700, color: { $t: 'colors.accent' }, textAlign: 'center', x: 820, y: 824, width: 156, height: 38, zIndex: 5, editable: { content: true } },
      { id: 'bk-c6', group: 'bk-c', type: 'shape', shapeKind: 'rect', x: 72, y: 902, width: 936, height: 96, borderRadius: 16, fill: 'rgba(0,0,0,0.04)', zIndex: 3 },
      { id: 'bk-d6', type: 'text', content: '周六', fontFamily: { $t: 'fonts.heading' }, fontSize: 40, fontWeight: 800, color: { $t: 'colors.ink' }, x: 104, y: 924, width: 104, height: 58, zIndex: 4, animation: { name: 'rise', duration: 440, delay: 350 }, editable: { content: true } },
      { id: 'bk-x6', type: 'text', content: '睡到自然醒的早午餐', fontFamily: { $t: 'fonts.sub' }, fontSize: 34, color: { $t: 'colors.ink' }, opacity: 0.9, x: 228, y: 926, width: 560, height: 50, zIndex: 4, editable: { content: true } },
      { id: 'bk-p6', group: 'bk-p', type: 'shape', shapeKind: 'rect', x: 820, y: 926, width: 156, height: 48, borderRadius: 999, fill: { $t: 'colors.berry' }, opacity: 0.2, zIndex: 4 },
      { id: 'bk-pt6', type: 'text', content: '20 分钟', fontFamily: { $t: 'fonts.sub' }, fontSize: 26, fontWeight: 700, color: { $t: 'colors.berry' }, textAlign: 'center', x: 820, y: 934, width: 156, height: 38, zIndex: 5, editable: { content: true } },
      { id: 'bk-c7', group: 'bk-c', type: 'shape', shapeKind: 'rect', x: 72, y: 1012, width: 936, height: 96, borderRadius: 16, fill: 'rgba(0,0,0,0.04)', zIndex: 3 },
      { id: 'bk-d7', type: 'text', content: '周日', fontFamily: { $t: 'fonts.heading' }, fontSize: 40, fontWeight: 800, color: { $t: 'colors.ink' }, x: 104, y: 1034, width: 104, height: 58, zIndex: 4, animation: { name: 'rise', duration: 440, delay: 420 }, editable: { content: true } },
      { id: 'bk-x7', type: 'text', content: '煮蛋备菜一小时工程', fontFamily: { $t: 'fonts.sub' }, fontSize: 34, color: { $t: 'colors.ink' }, opacity: 0.9, x: 228, y: 1036, width: 560, height: 50, zIndex: 4, editable: { content: true } },
      { id: 'bk-p7', group: 'bk-p', type: 'shape', shapeKind: 'rect', x: 820, y: 1036, width: 156, height: 48, borderRadius: 999, fill: { $t: 'colors.accent' }, opacity: 0.22, zIndex: 4 },
      { id: 'bk-pt7', type: 'text', content: '45 分钟', fontFamily: { $t: 'fonts.sub' }, fontSize: 26, fontWeight: 700, color: { $t: 'colors.accent' }, textAlign: 'center', x: 820, y: 1044, width: 156, height: 38, zIndex: 5, editable: { content: true } },
      { id: 'bk-shcard', type: 'shape', shapeKind: 'rect', x: 72, y: 1128, width: 936, height: 148, borderRadius: 20, fill: 'rgba(0,0,0,0.055)', zIndex: 3 },
      { id: 'bk-sh', type: 'text', content: '购物清单', fontFamily: { $t: 'fonts.heading' }, fontSize: 34, fontWeight: 800, color: { $t: 'colors.ink' }, x: 104, y: 1148, width: 240, height: 48, zIndex: 4, editable: { content: true } },
      { id: 'bk-shn', type: 'text', content: '（一次买齐）', fontFamily: { $t: 'fonts.sub' }, fontSize: 26, color: { $t: 'colors.accent' }, textAlign: 'right', x: 640, y: 1154, width: 336, height: 38, zIndex: 4, editable: { content: true } },
      { id: 'bk-sl', type: 'text', content: '鸡蛋 2 板 · 全麦吐司 1 袋 · 燕麦 500 g · 牛奶 4 盒 · 香蕉 1 把', fontFamily: { $t: 'fonts.sub' }, fontSize: 26, color: { $t: 'colors.ink' }, opacity: 0.8, x: 104, y: 1210, width: 872, height: 44, zIndex: 4, editable: { content: true } },
      { id: 'bk-foot', type: 'text', content: '早餐自己做，比排队快 5 分钟', fontFamily: { $t: 'fonts.sub' }, fontSize: 20, color: { $t: 'colors.ink' }, opacity: 0.55, x: 104, y: 1292, width: 700, height: 32, zIndex: 4, editable: { content: true } }
    ]
  },
  // 6. 谣言粉碎机卡 —— 大字谣言划红线 + 「假的」印章 + 真相三段
  {
    id: 'health-rumor-buster', name: '谣言粉碎机卡', version: '1.0.0', category: 'health',
    tags: ['health', 'rumor', 'myth-busting', 'science', '16:9'],
    thumbnail: svgUri('<rect width="160" height="90" fill="%23F2E9DA"/><g fill="%232A2620" opacity="0.07"><circle cx="20" cy="16" r="1.4"/><circle cx="120" cy="80" r="1.4"/><circle cx="150" cy="20" r="1.4"/></g><rect x="12" y="14" width="34" height="4" rx="2" fill="%23C8322B"/><rect x="12" y="22" width="78" height="11" rx="2" fill="%232A2620"/><rect x="12" y="32" width="66" height="3" rx="1" fill="%23C8322B"/><rect x="12" y="44" width="40" height="6" rx="1" fill="%232A2620" opacity="0.7"/><g stroke="%23C8322B" fill="none"><circle cx="128" cy="30" r="17" stroke-width="2.6"/><circle cx="128" cy="30" r="13" stroke-width="0.9" stroke-dasharray="3 2"/></g><g fill="%232E7D6F"><circle cx="16" cy="60" r="4"/><circle cx="66" cy="60" r="4"/><circle cx="116" cy="60" r="4"/></g><g fill="%232A2620" opacity="0.5"><rect x="12" y="68" width="40" height="3"/><rect x="62" y="68" width="40" height="3"/><rect x="112" y="68" width="40" height="3"/><rect x="12" y="74" width="34" height="2"/><rect x="62" y="74" width="30" height="2"/><rect x="112" y="74" width="36" height="2"/></g><rect x="12" y="82" width="136" height="6" rx="3" fill="%232A2620" opacity="0.06"/><g stroke="%23C8322B" stroke-width="2" opacity="0.55" stroke-linecap="round"><path d="M148 50 l6 6 M154 50 l-6 6"/><path d="M96 44 l5 5 M101 44 l-5 5"/></g>', 160, 90),
    tokens: {
      colors: {
        bg: { label: '奶茶纸', default: '#F2E9DA', options: ['#F2E9DA', '#F7F3EC', '#EFE7DC', '#EDEDE6'] },
        ink: { label: '墨黑', default: '#2A2620', options: ['#2A2620', '#1F1B16', '#26302B', '#22263A'] },
        mark: { label: '打假红', default: '#C8322B', options: ['#C8322B', '#D13B2E', '#B84A3B', '#C24D55'] },
        ok: { label: '真相绿', default: '#2E7D6F', options: ['#2E7D6F', '#3E7E8C', '#4B8C6B', '#3B6FA0'] },
        faint: { label: '灰褐', default: '#8A8272', options: ['#8A8272', '#8C8779', '#7F8A7E', '#83836F'] }
      },
      fonts: {
        heading: { label: '标题字体', default: HEI, options: [HEI, SONG, IMPACT] },
        sub: { label: '正文字体', default: HEI, options: [HEI, SANS, MONO] }
      }
    },
    presets: [
      { name: '奶茶纸墨', colors: { bg: '#F2E9DA', ink: '#2A2620', mark: '#C8322B', ok: '#2E7D6F', faint: '#8A8272' } },
      { name: '雪纸朱红', colors: { bg: '#F7F3EC', ink: '#1F1B16', mark: '#D13B2E', ok: '#3E7E8C', faint: '#8C8779' } },
      { name: '豆沙青瓷', colors: { bg: '#EFE7DC', ink: '#26302B', mark: '#B84A3B', ok: '#4B8C6B', faint: '#7F8A7E' } },
      { name: '米灰靛蓝', colors: { bg: '#EDEDE6', ink: '#22263A', mark: '#C24D55', ok: '#3B6FA0', faint: '#83836F' } }
    ],
    canvas: { virtualWidth: 1920, virtualHeight: 1080, defaultWidth: 1920, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'rg-dots', type: 'image', src: svgUri(specks(1920, 1080, 130, 47, 'rgba(0,0,0,0.12)') + '<path d="M0 200 Q480 174 960 206 T1920 186" fill="none" stroke="rgba(0,0,0,0.05)" stroke-width="2"/>', 1920, 1080), x: 0, y: 0, width: 1920, height: 1080, objectFit: 'fill', zIndex: 1 },
      { id: 'rg-veil', type: 'overlay', x: 0, y: 0, width: 1920, height: 1080, background: 'linear-gradient(178deg, rgba(255,255,255,0.34) 0%, rgba(255,255,255,0) 42%), linear-gradient(0deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0) 26%)', zIndex: 2 },
      { id: 'rg-ghost-q', type: 'text', content: '？', fontFamily: SERIF, fontSize: 660, color: { $t: 'colors.ink' }, opacity: 0.05, textAlign: 'center', rotation: 0, x: 1160, y: 180, width: 700, height: 740, zIndex: 2, animation: { name: 'drift', duration: 9000, iterationCount: 'infinite' } },
      { id: 'rg-x1', type: 'text', content: '×', fontFamily: SANS, fontSize: 56, fontWeight: 'bold', color: { $t: 'colors.mark' }, opacity: 0.5, rotation: -8, textAlign: 'center', x: 1244, y: 116, width: 80, height: 76, zIndex: 3, animation: { name: 'twinkle', duration: 2800, iterationCount: 'infinite' } },
      { id: 'rg-x2', type: 'text', content: '×', fontFamily: SANS, fontSize: 56, fontWeight: 'bold', color: { $t: 'colors.mark' }, opacity: 0.5, rotation: -8, textAlign: 'center', x: 1642, y: 384, width: 80, height: 76, zIndex: 3, animation: { name: 'twinkle', duration: 2800, delay: 500, iterationCount: 'infinite' } },
      { id: 'rg-band', type: 'shape', shapeKind: 'rect', x: 96, y: 990, width: 1728, height: 54, borderRadius: 27, fill: 'rgba(0,0,0,0.06)', zIndex: 3 },
      { id: 'rg-kicker', type: 'text', content: '谣言粉碎机 · 第 12 期', fontFamily: { $t: 'fonts.sub' }, fontSize: 26, letterSpacing: 5, color: { $t: 'colors.mark' }, x: 96, y: 80, width: 620, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'rg-truth-h', type: 'text', content: '真相，分三段说', fontFamily: { $t: 'fonts.heading' }, fontSize: 56, fontWeight: 'bold', color: { $t: 'colors.ok' }, x: 96, y: 372, width: 520, height: 80, zIndex: 4, animation: { name: 'fadeInDown', duration: 620, delay: 200 }, editable: { content: true } },
      { id: 'rg-b1', group: 'rg-b', type: 'shape', shapeKind: 'circle', x: 96, y: 548, width: 64, height: 64, fill: { $t: 'colors.ok' }, zIndex: 4 },
      { id: 'rg-b2', group: 'rg-b', type: 'shape', shapeKind: 'circle', x: 688, y: 548, width: 64, height: 64, fill: { $t: 'colors.ok' }, zIndex: 4 },
      { id: 'rg-b3', group: 'rg-b', type: 'shape', shapeKind: 'circle', x: 1280, y: 548, width: 64, height: 64, fill: { $t: 'colors.ok' }, zIndex: 4 },
      { id: 'rg-l1', group: 'rg-l', type: 'shape', shapeKind: 'rect', x: 96, y: 718, width: 100, height: 3, fill: { $t: 'colors.ok' }, opacity: 0.7, zIndex: 4 },
      { id: 'rg-l2', group: 'rg-l', type: 'shape', shapeKind: 'rect', x: 688, y: 718, width: 100, height: 3, fill: { $t: 'colors.ok' }, opacity: 0.7, zIndex: 4 },
      { id: 'rg-l3', group: 'rg-l', type: 'shape', shapeKind: 'rect', x: 1280, y: 718, width: 100, height: 3, fill: { $t: 'colors.ok' }, opacity: 0.7, zIndex: 4 },
      { id: 'rg-foot', type: 'text', content: '本期聊的是最常见的说法之一 · 具体营养需求请咨询医生或营养师', fontFamily: { $t: 'fonts.sub' }, fontSize: 20, color: { $t: 'colors.faint' }, opacity: 0.75, x: 96, y: 890, width: 1200, height: 30, zIndex: 4, editable: { content: true } },
      { id: 'rg-side', type: 'text', content: 'RUMOR BUSTER · EP.12', fontFamily: MONO, fontSize: 20, letterSpacing: 2, color: { $t: 'colors.faint' }, opacity: 0.6, textAlign: 'right', x: 1400, y: 890, width: 424, height: 30, zIndex: 4 },
      { id: 'rg-band-t', type: 'text', content: '关注 @养生不玄学 · 每周拆一个说法', fontFamily: { $t: 'fonts.sub' }, fontSize: 26, color: { $t: 'colors.ink' }, opacity: 0.8, textAlign: 'center', x: 360, y: 1002, width: 1200, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'rg-h1', type: 'text', content: '汤是汤，钙是钙', fontFamily: { $t: 'fonts.heading' }, fontSize: 44, fontWeight: 'bold', color: { $t: 'colors.ink' }, x: 96, y: 644, width: 536, height: 66, zIndex: 5, animation: { name: 'fadeIn', duration: 560, delay: 320 }, editable: { content: true } },
      { id: 'rg-h2', type: 'text', content: '补钙效率排行榜', fontFamily: { $t: 'fonts.heading' }, fontSize: 44, fontWeight: 'bold', color: { $t: 'colors.ink' }, x: 688, y: 644, width: 536, height: 66, zIndex: 5, animation: { name: 'fadeIn', duration: 560, delay: 440 }, editable: { content: true } },
      { id: 'rg-h3', type: 'text', content: '想喝就喝，别有负担', fontFamily: { $t: 'fonts.heading' }, fontSize: 44, fontWeight: 'bold', color: { $t: 'colors.ink' }, x: 1280, y: 644, width: 544, height: 66, zIndex: 5, animation: { name: 'fadeIn', duration: 560, delay: 560 }, editable: { content: true } },
      { id: 'rg-t1', type: 'text', content: '白汤的奶白，是脂肪乳化\n钙含量其实很低', fontFamily: { $t: 'fonts.sub' }, fontSize: 26, lineHeight: 1.6, color: { $t: 'colors.ink' }, opacity: 0.72, x: 96, y: 740, width: 536, height: 92, zIndex: 5, animation: { name: 'fadeInUp', duration: 620, delay: 380 }, editable: { content: true } },
      { id: 'rg-t2', type: 'text', content: '牛奶、豆腐、绿叶菜\n都排在骨头汤前面', fontFamily: { $t: 'fonts.sub' }, fontSize: 26, lineHeight: 1.6, color: { $t: 'colors.ink' }, opacity: 0.72, x: 688, y: 740, width: 536, height: 92, zIndex: 5, animation: { name: 'fadeInUp', duration: 620, delay: 500 }, editable: { content: true } },
      { id: 'rg-t3', type: 'text', content: '它是一碗好喝的热汤，\n只是别指望它补钙。', fontFamily: { $t: 'fonts.sub' }, fontSize: 26, lineHeight: 1.6, color: { $t: 'colors.ink' }, opacity: 0.72, x: 1280, y: 740, width: 544, height: 92, zIndex: 5, animation: { name: 'fadeInUp', duration: 620, delay: 620 }, editable: { content: true } },
      { id: 'rg-n1', type: 'text', content: '01', fontFamily: MONO, fontSize: 34, fontWeight: 'bold', color: { $t: 'colors.bg' }, textAlign: 'center', x: 96, y: 556, width: 64, height: 48, zIndex: 6 },
      { id: 'rg-n2', type: 'text', content: '02', fontFamily: MONO, fontSize: 34, fontWeight: 'bold', color: { $t: 'colors.bg' }, textAlign: 'center', x: 688, y: 556, width: 64, height: 48, zIndex: 6 },
      { id: 'rg-n3', type: 'text', content: '03', fontFamily: MONO, fontSize: 34, fontWeight: 'bold', color: { $t: 'colors.bg' }, textAlign: 'center', x: 1280, y: 556, width: 64, height: 48, zIndex: 6 },
      { id: 'rg-myth', type: 'text', content: '「喝骨头汤能补钙」', fontFamily: { $t: 'fonts.heading' }, fontSize: 104, fontWeight: 'bold', color: { $t: 'colors.ink' }, x: 96, y: 160, width: 1100, height: 150, zIndex: 5, animation: { name: 'fadeInUp', duration: 700 }, editable: { content: true, fontSize: { type: 'range', min: 72, max: 110 } } },
      { id: 'rg-strike', type: 'shape', shapeKind: 'rect', x: 96, y: 232, width: 960, height: 12, borderRadius: 6, fill: { $t: 'colors.mark' }, opacity: 0.9, rotation: -1.2, zIndex: 6 },
      { id: 'rg-stamp', type: 'shape', shapeKind: 'circle', x: 1320, y: 150, width: 300, height: 300, border: { width: 10, color: { $t: 'colors.mark' } }, rotation: -12, zIndex: 5, animation: { name: 'zoomIn', duration: 460, delay: 260 } },
      { id: 'rg-stamp2', type: 'shape', shapeKind: 'circle', x: 1344, y: 174, width: 252, height: 252, border: { width: 3, style: 'dashed', color: { $t: 'colors.mark' } }, rotation: -12, zIndex: 5, animation: { name: 'spinSlow', duration: 14000, iterationCount: 'infinite' } },
      { id: 'rg-stamp-t', type: 'text', content: '假的', fontFamily: { $t: 'fonts.heading' }, fontSize: 120, fontWeight: 'bold', color: { $t: 'colors.mark' }, rotation: -12, textAlign: 'center', x: 1320, y: 216, width: 300, height: 168, zIndex: 6, editable: { content: true } },
      { id: 'rg-stamp-en', type: 'text', content: 'FALSE', fontFamily: MONO, fontSize: 26, letterSpacing: 8, color: { $t: 'colors.mark' }, opacity: 0.85, rotation: -12, textAlign: 'center', x: 1320, y: 350, width: 300, height: 38, zIndex: 6 }
    ]
  },

  // 7. 护颈拉伸卡（9:16）—— 低头族 4 个晨起拉伸 + 时长
  {
    id: 'health-neck-stretch', name: '护颈拉伸卡', version: '1.0.0', category: 'health',
    tags: ['health', 'neck', 'stretch', 'office', '9:16'],
    thumbnail: svgUri('<rect width="108" height="192" fill="%23EAC9A0"/><g stroke="%233A2418" stroke-width="1.2" fill="none" opacity="0.16"><path d="M0 30 Q27 24 54 30 T108 30"/><path d="M0 96 Q27 102 54 96 T108 96"/><path d="M0 150 Q27 144 54 150 T108 150"/></g><rect x="10" y="14" width="50" height="8" rx="2" fill="%23B4472C"/><rect x="10" y="28" width="66" height="14" rx="3" fill="%233A2418"/><g fill="%23B4472C"><circle cx="18" cy="64" r="6"/><circle cx="76" cy="64" r="6"/></g><g fill="%23E07A3F"><rect x="14" y="62" width="2.4" height="9"/><rect x="72" y="62" width="2.4" height="9"/></g><g fill="%233A2418" opacity="0.55"><rect x="12" y="92" width="84" height="5" rx="2"/><rect x="12" y="104" width="70" height="5" rx="2"/><rect x="12" y="116" width="78" height="5" rx="2"/><rect x="12" y="140" width="80" height="5" rx="2"/><rect x="12" y="152" width="64" height="5" rx="2"/><rect x="12" y="164" width="74" height="5" rx="2"/></g><rect x="10" y="180" width="50" height="6" rx="2" fill="%233A2418" opacity="0.3"/>', 108, 192),
    tokens: {
      colors: {
        bg: { label: '卤汁底', default: '#EAC9A0', options: ['#EAC9A0', '#F2DCC0', '#E0BFA8', '#D9C7A3'] },
        ink: { label: '主文字', default: '#3A2418', options: ['#3A2418', '#4A3721', '#2B1B12', '#3D2B2B'] },
        accent: { label: '枣红', default: '#B4472C', options: ['#B4472C', '#C2410C', '#A63B4A', '#8C5A2B'] },
        herb: { label: '枸杞橘', default: '#E07A3F', options: ['#E07A3F', '#D9773B', '#E05A5A', '#C99A3F'] },
        paper: { label: '蛋白白', default: '#FFF7EC', options: ['#FFF7EC', '#FFFBF3', '#FDF3E3', '#FFF3E0'] }
      },
      fonts: {
        heading: { label: '标题字体', default: HEI, options: [HEI, SONG, SERIF] },
        sub: { label: '正文字体', default: HEI, options: [HEI, SANS, MONO] }
      }
    },
    presets: [
      { name: '茶叶蛋暖棕', colors: { bg: '#EAC9A0', ink: '#3A2418', accent: '#B4472C', herb: '#E07A3F', paper: '#FFF7EC' } },
      { name: '姜黄蜜糖', colors: { bg: '#F2DCC0', ink: '#4A3721', accent: '#C2410C', herb: '#D9773B', paper: '#FFFBF3' } },
      { name: '山楂乌梅', colors: { bg: '#E0BFA8', ink: '#2B1B12', accent: '#A63B4A', herb: '#E05A5A', paper: '#FDF3E3' } },
      { name: '炒麦香米', colors: { bg: '#D9C7A3', ink: '#3D2B2B', accent: '#8C5A2B', herb: '#C99A3F', paper: '#FFF3E0' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1920, defaultWidth: 1080, defaultHeight: 1920, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'ns-marble', type: 'image', src: svgUri(veins(1080, 1920, 'rgba(0,0,0,0.09)') + specks(1080, 1920, 140, 41, 'rgba(0,0,0,0.10)'), 1080, 1920), x: 0, y: 0, width: 1080, height: 1920, objectFit: 'fill', zIndex: 1 },
      { id: 'ns-warm', type: 'overlay', x: 0, y: 0, width: 1080, height: 1920, background: 'radial-gradient(120% 60% at 84% 8%, rgba(255,255,255,0.34) 0%, rgba(255,255,255,0) 62%)', zIndex: 2 },
      { id: 'ns-kicker', type: 'text', content: '低头族自救 · 第 5 期', fontFamily: { $t: 'fonts.sub' }, fontSize: 30, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 2, x: 76, y: 80, width: 680, height: 44, zIndex: 4, editable: { content: true } },
      { id: 'ns-title', type: 'text', content: '护颈 4 个拉伸', fontFamily: { $t: 'fonts.heading' }, fontSize: 96, fontWeight: '900', color: { $t: 'colors.ink' }, letterSpacing: 2, x: 76, y: 130, width: 900, height: 130, zIndex: 4, animation: { name: 'fadeInUp', duration: 520 }, editable: { content: true, fontSize: { type: 'range', min: 64, max: 112 } } },
      { id: 'ns-sub', type: 'text', content: '晨起每个动作量力而行，疼就停', fontFamily: { $t: 'fonts.sub' }, fontSize: 38, color: { $t: 'colors.ink' }, opacity: 0.82, x: 76, y: 290, width: 900, height: 56, zIndex: 4, editable: { content: true } },
      { id: 'ns-c1', group: 'ns-c', type: 'shape', shapeKind: 'rect', x: 76, y: 360, width: 928, height: 300, borderRadius: 20, fill: 'rgba(0,0,0,0.06)', zIndex: 3 },
      { id: 'ns-n1', group: 'ns-n', type: 'shape', shapeKind: 'circle', x: 104, y: 400, width: 72, height: 72, fill: { $t: 'colors.accent' }, zIndex: 4, animation: { name: 'zoomIn', duration: 440 } },
      { id: 'ns-n1-t', type: 'text', content: '01', fontFamily: IMPACT, fontSize: 40, color: { $t: 'colors.paper' }, textAlign: 'center', x: 104, y: 420, width: 72, height: 56, zIndex: 5 },
      { id: 'ns-t1', type: 'text', content: '抬头望天', fontFamily: { $t: 'fonts.heading' }, fontSize: 46, fontWeight: '800', color: { $t: 'colors.ink' }, x: 210, y: 404, width: 760, height: 64, zIndex: 4, animation: { name: 'slideInLeft', duration: 460 }, editable: { content: true } },
      { id: 'ns-d1', type: 'text', content: '下巴微收，双眼盯天花板，颈后慢慢拉长', fontFamily: { $t: 'fonts.sub' }, fontSize: 30, color: { $t: 'colors.ink' }, opacity: 0.72, lineHeight: 1.5, x: 210, y: 488, width: 760, height: 90, zIndex: 4, editable: { content: true } },
      { id: 'ns-p1', group: 'ns-p', type: 'shape', shapeKind: 'rect', x: 210, y: 584, width: 240, height: 56, borderRadius: 999, fill: { $t: 'colors.herb' }, opacity: 0.2, zIndex: 4 },
      { id: 'ns-p1-t', type: 'text', content: '保持 10 秒 ×3', fontFamily: { $t: 'fonts.sub' }, fontSize: 26, fontWeight: '700', color: { $t: 'colors.herb' }, x: 210, y: 596, width: 240, height: 38, zIndex: 5, editable: { content: true } },
      { id: 'ns-c2', group: 'ns-c', type: 'shape', shapeKind: 'rect', x: 76, y: 700, width: 928, height: 300, borderRadius: 20, fill: 'rgba(0,0,0,0.06)', zIndex: 3 },
      { id: 'ns-n2', group: 'ns-n', type: 'shape', shapeKind: 'circle', x: 104, y: 740, width: 72, height: 72, fill: { $t: 'colors.accent' }, zIndex: 4, animation: { name: 'zoomIn', duration: 440, delay: 100 } },
      { id: 'ns-n2-t', type: 'text', content: '02', fontFamily: IMPACT, fontSize: 40, color: { $t: 'colors.paper' }, textAlign: 'center', x: 104, y: 760, width: 72, height: 56, zIndex: 5 },
      { id: 'ns-t2', type: 'text', content: '侧颈拉伸', fontFamily: { $t: 'fonts.heading' }, fontSize: 46, fontWeight: '800', color: { $t: 'colors.ink' }, x: 210, y: 744, width: 760, height: 64, zIndex: 4, animation: { name: 'slideInLeft', duration: 460, delay: 100 }, editable: { content: true } },
      { id: 'ns-d2', type: 'text', content: '右耳慢慢靠右肩，左臂自然下垂不耸肩', fontFamily: { $t: 'fonts.sub' }, fontSize: 30, color: { $t: 'colors.ink' }, opacity: 0.72, lineHeight: 1.5, x: 210, y: 828, width: 760, height: 90, zIndex: 4, editable: { content: true } },
      { id: 'ns-p2', group: 'ns-p', type: 'shape', shapeKind: 'rect', x: 210, y: 924, width: 240, height: 56, borderRadius: 999, fill: { $t: 'colors.herb' }, opacity: 0.2, zIndex: 4 },
      { id: 'ns-p2-t', type: 'text', content: '每侧 20 秒', fontFamily: { $t: 'fonts.sub' }, fontSize: 26, fontWeight: '700', color: { $t: 'colors.herb' }, x: 210, y: 936, width: 240, height: 38, zIndex: 5, editable: { content: true } },
      { id: 'ns-c3', group: 'ns-c', type: 'shape', shapeKind: 'rect', x: 76, y: 1040, width: 928, height: 300, borderRadius: 20, fill: 'rgba(0,0,0,0.06)', zIndex: 3 },
      { id: 'ns-n3', group: 'ns-n', type: 'shape', shapeKind: 'circle', x: 104, y: 1080, width: 72, height: 72, fill: { $t: 'colors.accent' }, zIndex: 4, animation: { name: 'zoomIn', duration: 440, delay: 200 } },
      { id: 'ns-n3-t', type: 'text', content: '03', fontFamily: IMPACT, fontSize: 40, color: { $t: 'colors.paper' }, textAlign: 'center', x: 104, y: 1100, width: 72, height: 56, zIndex: 5 },
      { id: 'ns-t3', type: 'text', content: '转肩绕环', fontFamily: { $t: 'fonts.heading' }, fontSize: 46, fontWeight: '800', color: { $t: 'colors.ink' }, x: 210, y: 1084, width: 760, height: 64, zIndex: 4, animation: { name: 'slideInLeft', duration: 460, delay: 200 }, editable: { content: true } },
      { id: 'ns-d3', type: 'text', content: '双肩由前向上、向后画大圈，别耸肩', fontFamily: { $t: 'fonts.sub' }, fontSize: 30, color: { $t: 'colors.ink' }, opacity: 0.72, lineHeight: 1.5, x: 210, y: 1168, width: 760, height: 90, zIndex: 4, editable: { content: true } },
      { id: 'ns-p3', group: 'ns-p', type: 'shape', shapeKind: 'rect', x: 210, y: 1264, width: 240, height: 56, borderRadius: 999, fill: { $t: 'colors.herb' }, opacity: 0.2, zIndex: 4 },
      { id: 'ns-p3-t', type: 'text', content: '10 圈 ×2 组', fontFamily: { $t: 'fonts.sub' }, fontSize: 26, fontWeight: '700', color: { $t: 'colors.herb' }, x: 210, y: 1276, width: 240, height: 38, zIndex: 5, editable: { content: true } },
      { id: 'ns-c4', group: 'ns-c', type: 'shape', shapeKind: 'rect', x: 76, y: 1380, width: 928, height: 300, borderRadius: 20, fill: 'rgba(0,0,0,0.06)', zIndex: 3 },
      { id: 'ns-n4', group: 'ns-n', type: 'shape', shapeKind: 'circle', x: 104, y: 1420, width: 72, height: 72, fill: { $t: 'colors.accent' }, zIndex: 4, animation: { name: 'zoomIn', duration: 440, delay: 300 } },
      { id: 'ns-n4-t', type: 'text', content: '04', fontFamily: IMPACT, fontSize: 40, color: { $t: 'colors.paper' }, textAlign: 'center', x: 104, y: 1440, width: 72, height: 56, zIndex: 5 },
      { id: 'ns-t4', type: 'text', content: '收下巴训练', fontFamily: { $t: 'fonts.heading' }, fontSize: 46, fontWeight: '800', color: { $t: 'colors.ink' }, x: 210, y: 1424, width: 760, height: 64, zIndex: 4, animation: { name: 'slideInLeft', duration: 460, delay: 300 }, editable: { content: true } },
      { id: 'ns-d4', type: 'text', content: '食指抵住下巴，水平向后轻推，别仰头', fontFamily: { $t: 'fonts.sub' }, fontSize: 30, color: { $t: 'colors.ink' }, opacity: 0.72, lineHeight: 1.5, x: 210, y: 1508, width: 760, height: 90, zIndex: 4, editable: { content: true } },
      { id: 'ns-p4', group: 'ns-p', type: 'shape', shapeKind: 'rect', x: 210, y: 1604, width: 240, height: 56, borderRadius: 999, fill: { $t: 'colors.herb' }, opacity: 0.2, zIndex: 4 },
      { id: 'ns-p4-t', type: 'text', content: '10 次 ×3 组', fontFamily: { $t: 'fonts.sub' }, fontSize: 26, fontWeight: '700', color: { $t: 'colors.herb' }, x: 210, y: 1616, width: 240, height: 38, zIndex: 5, editable: { content: true } },
      { id: 'ns-foot', type: 'text', content: '动作轻柔，疼就停 · 不能替代医生诊断', fontFamily: { $t: 'fonts.sub' }, fontSize: 24, color: { $t: 'colors.ink' }, opacity: 0.62, letterSpacing: 1, x: 76, y: 1740, width: 900, height: 38, zIndex: 4, editable: { content: true } }
    ]
  },

  // 8. 饮水打卡（1:1）—— 八杯水进度 + 提醒
  {
    id: 'health-water-log', name: '饮水打卡', version: '1.0.0', category: 'health',
    tags: ['health', 'water', 'log', 'hydration', '1:1'],
    thumbnail: svgUri('<rect width="135" height="135" fill="%23FBF1DE"/><g fill="%2333302A" opacity="0.08"><circle cx="20" cy="24" r="1.2"/><circle cx="96" cy="16" r="1.2"/><circle cx="60" cy="112" r="1.2"/></g><rect x="12" y="16" width="56" height="14" rx="2" fill="%2333302A"/><rect x="12" y="34" width="40" height="3" rx="1" fill="%23C2452E"/><g fill="none" stroke="%236E8B5B" stroke-width="2.4"><circle cx="34" cy="64" r="16"/><circle cx="78" cy="64" r="16"/><circle cx="122" cy="64" r="16"/></g><g fill="%236E8B5B" opacity="0.18"><circle cx="34" cy="64" r="11"/><circle cx="78" cy="64" r="11"/></g><g fill="%23C2452E"><rect x="30" y="60" width="8" height="3"/><rect x="74" y="60" width="8" height="3"/><rect x="118" y="60" width="8" height="3"/></g><rect x="12" y="104" width="96" height="10" rx="5" fill="none" stroke="%2333302A" stroke-width="2"/><rect x="14" y="106" width="60" height="6" rx="3" fill="%236E8B5B"/><text x="100" y="124" font-family="Consolas,monospace" font-size="13" fill="%2333302A">5/8</text>', 135, 135),
    tokens: {
      colors: {
        bg: { label: '宣纸底', default: '#FBF1DE', options: ['#FBF1DE', '#F3E7E2', '#EDF1E2', '#F6EEDD'] },
        ink: { label: '墨字', default: '#33302A', options: ['#33302A', '#4A2F2A', '#333B2E', '#3A3140'] },
        accent: { label: '朱砂', default: '#C2452E', options: ['#C2452E', '#B4553A', '#A6483B', '#C2702E'] },
        herb: { label: '艾草绿', default: '#6E8B5B', options: ['#6E8B5B', '#7C8F52', '#5E8B72', '#8A9A5B'] },
        faint: { label: '淡褐', default: '#9A8C73', options: ['#9A8C73', '#A98F84', '#8B9A84', '#A2917A'] }
      },
      fonts: {
        heading: { label: '标题字体', default: SONG, options: [SONG, HEI, SERIF] },
        sub: { label: '正文字体', default: HEI, options: [HEI, SONG, SANS] }
      }
    },
    presets: [
      { name: '姜黄米纸', colors: { bg: '#FBF1DE', ink: '#33302A', accent: '#C2452E', herb: '#6E8B5B', faint: '#9A8C73' } },
      { name: '陈皮赤褐', colors: { bg: '#F3E7E2', ink: '#4A2F2A', accent: '#B4553A', herb: '#7C8F52', faint: '#A98F84' } },
      { name: '艾青白露', colors: { bg: '#EDF1E2', ink: '#333B2E', accent: '#A6483B', herb: '#5E8B72', faint: '#8B9A84' } },
      { name: '乌梅雪纸', colors: { bg: '#F6EEDD', ink: '#3A3140', accent: '#C2702E', herb: '#8A9A5B', faint: '#A2917A' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1080, defaultWidth: 1080, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'wq-paper', type: 'image', src: svgUri(specks(1080, 1080, 120, 29, 'rgba(0,0,0,0.12)') + '<path d="M0 320 Q340 292 700 322 T1080 306" fill="none" stroke="rgba(0,0,0,0.06)" stroke-width="2"/><path d="M0 780 Q420 812 1080 764" fill="none" stroke="rgba(0,0,0,0.05)" stroke-width="2"/>', 1080, 1080), x: 0, y: 0, width: 1080, height: 1080, objectFit: 'fill', zIndex: 1 },
      { id: 'wq-kicker', type: 'text', content: '每日饮水 · 今天到第几杯', fontFamily: { $t: 'fonts.sub' }, fontSize: 26, fontWeight: '700', letterSpacing: 6, color: { $t: 'colors.faint' }, x: 72, y: 90, width: 600, height: 38, zIndex: 4, editable: { content: true } },
      { id: 'wq-title', type: 'text', content: '今天喝够 8 杯了吗', fontFamily: { $t: 'fonts.heading' }, fontSize: 84, fontWeight: '900', letterSpacing: 2, color: { $t: 'colors.ink' }, x: 72, y: 130, width: 900, height: 120, zIndex: 4, animation: { name: 'inkReveal', duration: 1200 }, editable: { content: true, fontSize: { type: 'range', min: 56, max: 104 } } },
      { id: 'wq-sub', type: 'text', content: '每杯约 250 ml · 全天 2 升', fontFamily: { $t: 'fonts.sub' }, fontSize: 30, color: { $t: 'colors.faint' }, x: 72, y: 270, width: 600, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'wq-c0', group: 'wq-c', type: 'shape', shapeKind: 'circle', x: 120, y: 360, width: 150, height: 150, fill: { $t: 'colors.accent' }, opacity: 0.16, zIndex: 3 },
      { id: 'wq-ck0', type: 'text', content: '✓', fontFamily: SANS, fontSize: 60, fontWeight: '700', color: { $t: 'colors.accent' }, textAlign: 'center', x: 120, y: 380, width: 150, height: 110, zIndex: 4 },
      { id: 'wq-l0', type: 'text', content: '第 1 杯', fontFamily: { $t: 'fonts.sub' }, fontSize: 24, color: { $t: 'colors.ink' }, textAlign: 'center', x: 120, y: 522, width: 150, height: 34, zIndex: 4, editable: { content: true } },
      { id: 'wq-c1', group: 'wq-c', type: 'shape', shapeKind: 'circle', x: 360, y: 360, width: 150, height: 150, fill: { $t: 'colors.accent' }, opacity: 0.16, zIndex: 3 },
      { id: 'wq-ck1', type: 'text', content: '✓', fontFamily: SANS, fontSize: 60, fontWeight: '700', color: { $t: 'colors.accent' }, textAlign: 'center', x: 360, y: 380, width: 150, height: 110, zIndex: 4 },
      { id: 'wq-l1', type: 'text', content: '第 2 杯', fontFamily: { $t: 'fonts.sub' }, fontSize: 24, color: { $t: 'colors.ink' }, textAlign: 'center', x: 360, y: 522, width: 150, height: 34, zIndex: 4, editable: { content: true } },
      { id: 'wq-c2', group: 'wq-c', type: 'shape', shapeKind: 'circle', x: 600, y: 360, width: 150, height: 150, fill: { $t: 'colors.accent' }, opacity: 0.16, zIndex: 3 },
      { id: 'wq-ck2', type: 'text', content: '✓', fontFamily: SANS, fontSize: 60, fontWeight: '700', color: { $t: 'colors.accent' }, textAlign: 'center', x: 600, y: 380, width: 150, height: 110, zIndex: 4 },
      { id: 'wq-l2', type: 'text', content: '第 3 杯', fontFamily: { $t: 'fonts.sub' }, fontSize: 24, color: { $t: 'colors.ink' }, textAlign: 'center', x: 600, y: 522, width: 150, height: 34, zIndex: 4, editable: { content: true } },
      { id: 'wq-c3', group: 'wq-c', type: 'shape', shapeKind: 'circle', x: 840, y: 360, width: 150, height: 150, fill: { $t: 'colors.accent' }, opacity: 0.16, zIndex: 3 },
      { id: 'wq-ck3', type: 'text', content: '✓', fontFamily: SANS, fontSize: 60, fontWeight: '700', color: { $t: 'colors.accent' }, textAlign: 'center', x: 840, y: 380, width: 150, height: 110, zIndex: 4 },
      { id: 'wq-l3', type: 'text', content: '第 4 杯', fontFamily: { $t: 'fonts.sub' }, fontSize: 24, color: { $t: 'colors.ink' }, textAlign: 'center', x: 840, y: 522, width: 150, height: 34, zIndex: 4, editable: { content: true } },
      { id: 'wq-c4', group: 'wq-c', type: 'shape', shapeKind: 'circle', x: 120, y: 620, width: 150, height: 150, fill: { $t: 'colors.accent' }, opacity: 0.16, zIndex: 3 },
      { id: 'wq-ck4', type: 'text', content: '✓', fontFamily: SANS, fontSize: 60, fontWeight: '700', color: { $t: 'colors.accent' }, textAlign: 'center', x: 120, y: 640, width: 150, height: 110, zIndex: 4 },
      { id: 'wq-l4', type: 'text', content: '第 5 杯', fontFamily: { $t: 'fonts.sub' }, fontSize: 24, color: { $t: 'colors.ink' }, textAlign: 'center', x: 120, y: 782, width: 150, height: 34, zIndex: 4, editable: { content: true } },
      { id: 'wq-c5', group: 'wq-c', type: 'shape', shapeKind: 'circle', x: 360, y: 620, width: 150, height: 150, border: { width: 4, style: 'dashed', color: { $t: 'colors.faint' } }, zIndex: 3 },
      { id: 'wq-l5', type: 'text', content: '第 6 杯', fontFamily: { $t: 'fonts.sub' }, fontSize: 24, color: { $t: 'colors.faint' }, textAlign: 'center', x: 360, y: 782, width: 150, height: 34, zIndex: 4, editable: { content: true } },
      { id: 'wq-c6', group: 'wq-c', type: 'shape', shapeKind: 'circle', x: 600, y: 620, width: 150, height: 150, border: { width: 4, style: 'dashed', color: { $t: 'colors.faint' } }, zIndex: 3 },
      { id: 'wq-l6', type: 'text', content: '第 7 杯', fontFamily: { $t: 'fonts.sub' }, fontSize: 24, color: { $t: 'colors.faint' }, textAlign: 'center', x: 600, y: 782, width: 150, height: 34, zIndex: 4, editable: { content: true } },
      { id: 'wq-c7', group: 'wq-c', type: 'shape', shapeKind: 'circle', x: 840, y: 620, width: 150, height: 150, border: { width: 4, style: 'dashed', color: { $t: 'colors.faint' } }, zIndex: 3 },
      { id: 'wq-l7', type: 'text', content: '第 8 杯', fontFamily: { $t: 'fonts.sub' }, fontSize: 24, color: { $t: 'colors.faint' }, textAlign: 'center', x: 840, y: 782, width: 150, height: 34, zIndex: 4, editable: { content: true } },
      { id: 'wq-track', type: 'shape', shapeKind: 'rect', x: 120, y: 840, width: 840, height: 22, borderRadius: 11, fill: 'rgba(0,0,0,0.10)', zIndex: 3 },
      { id: 'wq-fill', type: 'shape', shapeKind: 'rect', x: 120, y: 840, width: 525, height: 22, borderRadius: 11, fill: { $t: 'colors.herb' }, zIndex: 4, animation: { name: 'shimmer', duration: 3200, iterationCount: 'infinite' } },
      { id: 'wq-count', type: 'text', content: '今日已喝 5 / 8 杯', fontFamily: { $t: 'fonts.heading' }, fontSize: 34, fontWeight: '800', color: { $t: 'colors.ink' }, x: 120, y: 876, width: 840, height: 48, zIndex: 4, editable: { content: true } },
      { id: 'wq-rem', type: 'text', content: '设个提醒：每小时一杯，肾会感谢你', fontFamily: { $t: 'fonts.sub' }, fontSize: 28, color: { $t: 'colors.accent' }, x: 120, y: 944, width: 840, height: 44, zIndex: 4, editable: { content: true } },
      { id: 'wq-foot', type: 'text', content: '数值为示意 · 喝多少看体重与天气', fontFamily: { $t: 'fonts.sub' }, fontSize: 20, color: { $t: 'colors.faint' }, x: 120, y: 1008, width: 700, height: 32, zIndex: 4, editable: { content: true } }
    ]
  }
]

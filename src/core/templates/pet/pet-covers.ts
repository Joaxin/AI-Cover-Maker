// src/core/templates/pet/pet-covers.ts
// 宠物·萌宠大类首批 6 个模板（内容向：封面 / 清单 / 账单 / 启示，与「可爱装饰风」错开）
// 口径参照 video/bili-covers-extra.ts：颜色全走 token，每个 4 套预设，装饰尽量用 shape 元素拼（换预设即换色）。
// 文案口径：铲屎官第一人称，猫狗梗（爪印 / 拆家 / 罐头）自然融入，风趣不幼稚。
import type { CanvasElement, Template, TemplateAnimation } from '@/types/types'
import {HEI, SONG, MONO, SANS, IMPACT, halftone, aura, tape} from '../_fx/trend'
import { svgUri } from '../_fx/common'

/** 内联 SVG → data URI；inner 只写内容，不再自带 <svg>，# 一律写成 %23 */

/** 脚点虚线（表格分隔线）：一排列小圆点，走 rgba 故不占硬编码色额度 */
function dotted(w: number, h: number, r: number, gap: number, fill: string) {
  let s = ''
  for (let x = r; x <= w - r; x += gap) s += `<circle cx="${x}" cy="${(h / 2).toFixed(1)}" r="${r}" fill="${fill}"/>`
  return svgUri(s, w, h)
}

/** 警戒斜纹：压在 signal 色条上，冒充 caution tape（线条用 rgba，深浅底都压得住） */
function hazard(w: number, h: number, stroke = 'rgba(20,18,15,0.30)', gap = 30) {
  let s = ''
  for (let x = -h; x < w + h; x += gap) s += `<line x1="${x.toFixed(1)}" y1="${h}" x2="${(x + h).toFixed(1)}" y2="0"/>`
  return svgUri(`<g stroke="${stroke}" stroke-width="${Math.round(gap * 0.4)}">${s}</g>`, w, h)
}

/** 爪印：掌垫（圆角矩形）+ 四趾（圆），全部 shape 走 token，换预设即换色 */
function pawShapes(prefix: string, x: number, y: number, s: number, token: string, rotation = 0, opacity = 1, zIndex = 3, animation?: TemplateAnimation) {
  const fill = { $t: token } as any
  const parts: Array<[string, 'rect' | 'circle', number, number, number, number, number]> = [
    ['pad', 'rect', x + s * 0.26, y + s * 0.46, s * 0.48, s * 0.42, s * 0.24],
    ['toe1', 'circle', x + s * 0.02, y + s * 0.22, s * 0.21, s * 0.21, 0],
    ['toe2', 'circle', x + s * 0.25, y + s * 0.02, s * 0.21, s * 0.21, 0],
    ['toe3', 'circle', x + s * 0.53, y + s * 0.02, s * 0.21, s * 0.21, 0],
    ['toe4', 'circle', x + s * 0.77, y + s * 0.22, s * 0.2, s * 0.2, 0]
  ]
  return parts.map(([suffix, kind, px, py, pw, ph, br]) => ({
    id: `${prefix}-${suffix}`, type: 'shape' as const, shapeKind: kind,
    x: Math.round(px), y: Math.round(py), width: Math.round(pw), height: Math.round(ph),
    ...(br ? { borderRadius: Math.round(br) } : {}),
    fill, rotation, opacity, zIndex, ...(animation ? { animation } : {})
  })) as CanvasElement[]
}

/** 骨头：中间一根圆角条 + 两端各两枚圆钮，同样走 token */
function boneShapes(prefix: string, x: number, y: number, w: number, h: number, token: string, rotation = 0, opacity = 1, zIndex = 3, animation?: TemplateAnimation) {
  const fill = { $t: token } as any
  const r = h * 0.42, d = r * 1.6
  const parts: Array<[string, 'rect' | 'circle', number, number, number, number, number]> = [
    ['shaft', 'rect', x, y + h / 2 - r * 0.66, w, r * 1.32, r * 0.66],
    ['k1', 'circle', x - r * 0.5, y, d, d, 0],
    ['k2', 'circle', x - r * 0.5, y + h - d, d, d, 0],
    ['k3', 'circle', x + w - d + r * 0.5, y, d, d, 0],
    ['k4', 'circle', x + w - d + r * 0.5, y + h - d, d, d, 0]
  ]
  return parts.map(([suffix, kind, px, py, pw, ph, br]) => ({
    id: `${prefix}-${suffix}`, type: 'shape' as const, shapeKind: kind,
    x: Math.round(px), y: Math.round(py), width: Math.round(pw), height: Math.round(ph),
    ...(br ? { borderRadius: Math.round(br) } : {}),
    fill, rotation, opacity, zIndex, ...(animation ? { animation } : {})
  })) as CanvasElement[]
}

export const petTemplates: Template[] = [
  // 1. 萌宠日常封面（1:1）—— 大头照虚位 + 今日行为判词 + 爪印点缀
  {
    id: 'pet-daily-cover', name: '萌宠日常判词封面', version: '1.0.0', category: 'pet',
    tags: ['pet', 'daily', 'verdict', 'cover', '1:1'],
    thumbnail: svgUri('<rect width="100" height="100" fill="%23FFF7EC"/><g fill="%233A2A21" opacity="0.9"><rect x="30" y="16" width="13" height="13" rx="4" transform="rotate(-32 36 22)"/><rect x="57" y="16" width="13" height="13" rx="4" transform="rotate(32 63 22)"/></g><circle cx="50" cy="42" r="21" fill="none" stroke="%233A2A21" stroke-width="2" stroke-dasharray="4 3"/><rect x="34" y="38" width="32" height="4" rx="2" fill="%233A2A21" opacity="0.45"/><rect x="30" y="68" width="40" height="5" rx="2" fill="%23F4A259"/><rect x="26" y="78" width="48" height="5" rx="2" fill="%233A2A21"/><rect x="64" y="88" width="26" height="8" rx="4" fill="%23FF8FA3"/><g fill="%23F4A259" opacity="0.8"><circle cx="13" cy="26" r="2.4"/><circle cx="18" cy="21" r="1.8"/><circle cx="23" cy="26" r="1.8"/><rect x="12" y="28" width="12" height="7" rx="3.5"/></g>', 100, 100),
    tokens: {
      colors: {
        bg: { label: '奶纸', default: '#FFF7EC', options: ['#FFF7EC', '#F1F7F2', '#F5F0FB', '#EEF5FA'] },
        ink: { label: '墨字', default: '#3A2A21', options: ['#3A2A21', '#1F3A2C', '#2E2540', '#1E3040'] },
        accent: { label: '主色', default: '#F4A259', options: ['#F4A259', '#57C69B', '#A78BFA', '#5FA8D3'] },
        pop: { label: '贴纸色', default: '#FF8FA3', options: ['#FF8FA3', '#FFB4C2', '#FFC2D1', '#FFD27F'] }
      },
      fonts: { heading: { label: '判词字体', default: HEI, options: [HEI, SONG] } }
    },
    presets: [
      { name: '奶油橘', colors: { bg: '#FFF7EC', ink: '#3A2A21', accent: '#F4A259', pop: '#FF8FA3' } },
      { name: '抹茶奶', colors: { bg: '#F1F7F2', ink: '#1F3A2C', accent: '#57C69B', pop: '#FFB4C2' } },
      { name: '芋泥雪', colors: { bg: '#F5F0FB', ink: '#2E2540', accent: '#A78BFA', pop: '#FFC2D1' } },
      { name: '海盐蓝', colors: { bg: '#EEF5FA', ink: '#1E3040', accent: '#5FA8D3', pop: '#FFD27F' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1080, defaultWidth: 1080, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'dv-dots', type: 'image', src: halftone(1080, 1080, 2.4, 54, 'rgba(58,42,33,0.10)'), x: 0, y: 0, width: 1080, height: 1080, objectFit: 'fill', zIndex: 1 },
      ...aura('dv-glow', 540, 330, 300, 'colors.accent', 5),
      { id: 'dv-ear-l', type: 'shape', shapeKind: 'rect', x: 350, y: 92, width: 112, height: 112, borderRadius: 36, fill: { $t: 'colors.ink' }, opacity: 0.9, rotation: -32, zIndex: 2, animation: { name: 'float', duration: 4200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'dv-ear-r', type: 'shape', shapeKind: 'rect', x: 618, y: 92, width: 112, height: 112, borderRadius: 36, fill: { $t: 'colors.ink' }, opacity: 0.9, rotation: 32, zIndex: 2, animation: { name: 'float', duration: 4200, delay: 400, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'dv-slot', type: 'shape', shapeKind: 'circle', x: 325, y: 110, width: 430, height: 430, border: { width: 7, style: 'dashed', color: { $t: 'colors.ink' } }, zIndex: 3 },
      { id: 'dv-slot-t', type: 'text', content: '这里放主子的脸', imageSlot: 'dv-slot', fontFamily: HEI, fontSize: 30, color: { $t: 'colors.ink' }, opacity: 0.6, textAlign: 'center', x: 325, y: 308, width: 430, height: 44, zIndex: 4, editable: { content: true } },
      { id: 'dv-rule-l', type: 'shape', shapeKind: 'rect', x: 250, y: 594, width: 110, height: 6, borderRadius: 3, fill: { $t: 'colors.accent' }, opacity: 0.55, zIndex: 3 },
      { id: 'dv-rule-r', type: 'shape', shapeKind: 'rect', x: 720, y: 594, width: 110, height: 6, borderRadius: 3, fill: { $t: 'colors.accent' }, opacity: 0.55, zIndex: 3 },
      { id: 'dv-kicker', type: 'text', content: '今日行为判词', fontFamily: { $t: 'fonts.heading' }, fontSize: 40, fontWeight: 700, color: { $t: 'colors.accent' }, textAlign: 'center', x: 360, y: 572, width: 360, height: 56, zIndex: 4, animation: { name: 'fadeInUp', duration: 520 }, editable: { content: true } },
      { id: 'dv-verdict', type: 'text', content: '偷吃罐头未遂，\n判处加餐一次', fontFamily: { $t: 'fonts.heading' }, fontSize: 72, fontWeight: 900, color: { $t: 'colors.ink' }, lineHeight: 1.3, textAlign: 'center', x: 90, y: 650, width: 900, height: 230, zIndex: 4, animation: { name: 'fadeInUp', duration: 640, delay: 140 }, editable: { content: true, fontSize: { type: 'range', min: 48, max: 96 } } },
      { id: 'dv-stamp', type: 'shape', shapeKind: 'rect', x: 678, y: 852, width: 300, height: 78, borderRadius: 999, fill: { $t: 'colors.pop' }, rotation: -5, zIndex: 4, animation: { name: 'zoomIn', duration: 420, delay: 320 } },
      { id: 'dv-stamp-t', type: 'text', content: '不许上诉', fontFamily: HEI, fontSize: 34, fontWeight: 700, color: { $t: 'colors.ink' }, textAlign: 'center', rotation: -5, x: 678, y: 874, width: 300, height: 52, zIndex: 5, editable: { content: true } },
      { id: 'dv-case', type: 'text', content: '主犯 橘猫「布丁」 · 作案时间 凌晨四点', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.ink' }, opacity: 0.8, textAlign: 'center', x: 70, y: 930, width: 600, height: 38, zIndex: 5, animation: { name: 'slideInLeft', duration: 520, delay: 220 }, editable: { content: true } },
      { id: 'dv-foot', type: 'text', content: '铲屎官日报 · 第 214 天 · 记录人：熬夜的我', fontFamily: HEI, fontSize: 22, color: { $t: 'colors.ink' }, opacity: 0.5, textAlign: 'center', x: 190, y: 1000, width: 700, height: 34, zIndex: 5, editable: { content: true } },
      ...pawShapes('dv-paw-a', 92, 200, 96, 'colors.accent', -18, 0.5, 3),
      ...pawShapes('dv-paw-b', 168, 116, 62, 'colors.pop', 14, 0.6, 3, { name: 'float', duration: 5200, delay: 200, iterationCount: 'infinite', easing: 'ease-in-out' }),
      ...pawShapes('dv-paw-c', 900, 470, 84, 'colors.accent', 24, 0.45, 3),
      { id: 'dv-spark', type: 'shape', shapeKind: 'circle', x: 848, y: 232, width: 22, height: 22, fill: { $t: 'colors.pop' }, zIndex: 4, animation: { name: 'twinkle', duration: 2400, iterationCount: 'infinite' } }
    ]
  },

  // 2. 养宠攻略卡（4:5）—— 主题大字 + 要点三步 + 新手/进阶标签
  {
    id: 'pet-guide-card', name: '养宠攻略三步卡', version: '1.0.0', category: 'pet',
    tags: ['pet', 'guide', 'checklist', 'steps', '4:5'],
    thumbnail: svgUri('<rect width="100" height="125" fill="%23FFFDF7"/><rect x="10" y="10" width="26" height="5" rx="2.5" fill="%23E76F51"/><rect x="64" y="8" width="14" height="7" rx="3.5" fill="%23E76F51"/><rect x="80" y="8" width="14" height="7" rx="3.5" fill="none" stroke="%232F2A24" stroke-dasharray="3 2"/><rect x="10" y="21" width="54" height="9" rx="2" fill="%232F2A24"/><rect x="10" y="33" width="40" height="9" rx="2" fill="%232F2A24" opacity="0.8"/><rect x="10" y="48" width="80" height="20" rx="5" fill="%232F2A24" opacity="0.07"/><circle cx="18" cy="50" r="6" fill="%23E76F51"/><rect x="28" y="52" width="42" height="4" rx="2" fill="%232F2A24"/><rect x="28" y="60" width="52" height="3" rx="1.5" fill="%238B7F72"/><rect x="10" y="74" width="80" height="20" rx="5" fill="%232F2A24" opacity="0.07"/><circle cx="18" cy="76" r="6" fill="%23E76F51"/><rect x="28" y="78" width="42" height="4" rx="2" fill="%232F2A24"/><rect x="28" y="86" width="48" height="3" rx="1.5" fill="%238B7F72"/><rect x="10" y="100" width="80" height="20" rx="5" fill="%232F2A24" opacity="0.07"/><circle cx="18" cy="102" r="6" fill="%23E76F51"/><rect x="28" y="104" width="38" height="4" rx="2" fill="%232F2A24"/><rect x="28" y="112" width="50" height="3" rx="1.5" fill="%238B7F72"/>', 100, 125),
    tokens: {
      colors: {
        bg: { label: '纸色', default: '#FFFDF7', options: ['#FFFDF7', '#F4F8FA', '#FBF3F6', '#F3F8F2'] },
        ink: { label: '墨字', default: '#2F2A24', options: ['#2F2A24', '#1D2B33', '#3A1F2C', '#1E3324'] },
        accent: { label: '强调', default: '#E76F51', options: ['#E76F51', '#2A9D8F', '#7C5CD6', '#3B82F6'] },
        card: { label: '卡底', default: 'rgba(47,42,36,0.07)', options: ['rgba(47,42,36,0.07)', 'rgba(29,43,51,0.08)', 'rgba(58,31,44,0.08)', 'rgba(30,51,36,0.08)'] },
        dim: { label: '弱文字', default: '#8B7F72', options: ['#8B7F72', '#6E7C86', '#8A6E7C', '#6E8B72'] }
      },
      fonts: { heading: { label: '标题字体', default: HEI, options: [HEI, SONG] } }
    },
    presets: [
      { name: '暖陶橘', colors: { bg: '#FFFDF7', ink: '#2F2A24', accent: '#E76F51', card: 'rgba(47,42,36,0.07)', dim: '#8B7F72' } },
      { name: '松石青', colors: { bg: '#F4F8FA', ink: '#1D2B33', accent: '#2A9D8F', card: 'rgba(29,43,51,0.08)', dim: '#6E7C86' } },
      { name: '藕紫罗兰', colors: { bg: '#FBF3F6', ink: '#3A1F2C', accent: '#7C5CD6', card: 'rgba(58,31,44,0.08)', dim: '#8A6E7C' } },
      { name: '学院蓝', colors: { bg: '#F3F8F2', ink: '#1E3324', accent: '#3B82F6', card: 'rgba(30,51,36,0.08)', dim: '#6E8B72' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'gd-dots', type: 'image', src: halftone(1080, 1350, 2.2, 58, 'rgba(47,42,36,0.09)'), x: 0, y: 0, width: 1080, height: 1350, objectFit: 'fill', zIndex: 1 },
      { id: 'gd-kicker', type: 'text', content: '养宠攻略 · NO.07', fontFamily: HEI, fontSize: 26, fontWeight: 700, letterSpacing: 3, color: { $t: 'colors.accent' }, x: 60, y: 90, width: 420, height: 40, zIndex: 3, editable: { content: true } },
      { id: 'gd-tag1', type: 'shape', shapeKind: 'rect', x: 700, y: 84, width: 150, height: 54, borderRadius: 999, fill: { $t: 'colors.accent' }, zIndex: 3 },
      { id: 'gd-tag1-t', type: 'text', content: '新手向', fontFamily: HEI, fontSize: 26, fontWeight: 700, color: { $t: 'colors.bg' }, textAlign: 'center', x: 700, y: 94, width: 150, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'gd-tag2', type: 'shape', shapeKind: 'rect', x: 870, y: 84, width: 150, height: 54, borderRadius: 999, border: { width: 3, color: { $t: 'colors.ink' } }, zIndex: 3 },
      { id: 'gd-tag2-t', type: 'text', content: '进阶可选', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.ink' }, textAlign: 'center', x: 870, y: 94, width: 150, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'gd-title', type: 'text', content: '幼猫到家\n第一周怎么过', fontFamily: { $t: 'fonts.heading' }, fontSize: 100, fontWeight: 900, color: { $t: 'colors.ink' }, lineHeight: 1.2, x: 60, y: 170, width: 880, height: 290, zIndex: 3, animation: { name: 'fadeInUp', duration: 560 }, editable: { content: true, fontSize: { type: 'range', min: 72, max: 124 } } },
      { id: 'gd-sub', type: 'text', content: '照着做，头七天不手忙脚乱', fontFamily: HEI, fontSize: 30, color: { $t: 'colors.dim' }, x: 60, y: 428, width: 780, height: 46, zIndex: 3, editable: { content: true } },
      { id: 'gd-c1', group: 'gd-c', type: 'shape', shapeKind: 'rect', x: 60, y: 530, width: 960, height: 210, borderRadius: 26, fill: { $t: 'colors.card' }, zIndex: 2 },
      { id: 'gd-b1', group: 'gd-b', type: 'shape', shapeKind: 'circle', x: 100, y: 500, width: 92, height: 92, fill: { $t: 'colors.accent' }, zIndex: 3, animation: { name: 'zoomIn', duration: 440 } },
      { id: 'gd-b1-t', type: 'text', content: '01', fontFamily: IMPACT, fontSize: 42, color: { $t: 'colors.bg' }, textAlign: 'center', x: 100, y: 522, width: 92, height: 60, zIndex: 4, editable: { content: true } },
      { id: 'gd-h1', type: 'text', content: '先别洗澡，先适应', fontFamily: { $t: 'fonts.heading' }, fontSize: 46, fontWeight: 700, color: { $t: 'colors.ink' }, x: 250, y: 566, width: 700, height: 68, zIndex: 3, animation: { name: 'fadeInUp', duration: 480 }, editable: { content: true } },
      { id: 'gd-d1', type: 'text', content: '航空箱进屋，给它一个能躲的角落；\n头三天不抱、不亲、不强行洗澡。', fontFamily: HEI, fontSize: 32, color: { $t: 'colors.dim' }, lineHeight: 1.45, x: 250, y: 640, width: 700, height: 104, zIndex: 3, editable: { content: true } },
      { id: 'gd-c2', group: 'gd-c', type: 'shape', shapeKind: 'rect', x: 60, y: 770, width: 960, height: 210, borderRadius: 26, fill: { $t: 'colors.card' }, zIndex: 2 },
      { id: 'gd-b2', group: 'gd-b', type: 'shape', shapeKind: 'circle', x: 100, y: 740, width: 92, height: 92, fill: { $t: 'colors.accent' }, zIndex: 3, animation: { name: 'zoomIn', duration: 440, delay: 140 } },
      { id: 'gd-b2-t', type: 'text', content: '02', fontFamily: IMPACT, fontSize: 42, color: { $t: 'colors.bg' }, textAlign: 'center', x: 100, y: 762, width: 92, height: 60, zIndex: 4, editable: { content: true } },
      { id: 'gd-h2', type: 'text', content: '吃喝拉撒记下来', fontFamily: { $t: 'fonts.heading' }, fontSize: 46, fontWeight: 700, color: { $t: 'colors.ink' }, x: 250, y: 806, width: 700, height: 68, zIndex: 3, animation: { name: 'fadeInUp', duration: 480, delay: 140 }, editable: { content: true } },
      { id: 'gd-d2', type: 'text', content: '猫砂盆、食盆、水碗各就位，\n每天称一次重，数字比感觉靠谱。', fontFamily: HEI, fontSize: 32, color: { $t: 'colors.dim' }, lineHeight: 1.45, x: 250, y: 880, width: 700, height: 104, zIndex: 3, editable: { content: true } },
      { id: 'gd-c3', group: 'gd-c', type: 'shape', shapeKind: 'rect', x: 60, y: 1010, width: 960, height: 210, borderRadius: 26, fill: { $t: 'colors.card' }, zIndex: 2 },
      { id: 'gd-b3', group: 'gd-b', type: 'shape', shapeKind: 'circle', x: 100, y: 980, width: 92, height: 92, fill: { $t: 'colors.accent' }, zIndex: 3, animation: { name: 'zoomIn', duration: 440, delay: 280 } },
      { id: 'gd-b3-t', type: 'text', content: '03', fontFamily: IMPACT, fontSize: 42, color: { $t: 'colors.bg' }, textAlign: 'center', x: 100, y: 1002, width: 92, height: 60, zIndex: 4, editable: { content: true } },
      { id: 'gd-h3', type: 'text', content: '第三周去疫苗', fontFamily: { $t: 'fonts.heading' }, fontSize: 46, fontWeight: 700, color: { $t: 'colors.ink' }, x: 250, y: 1046, width: 700, height: 68, zIndex: 3, animation: { name: 'fadeInUp', duration: 480, delay: 280 }, editable: { content: true } },
      { id: 'gd-d3', type: 'text', content: '首免三针、驱虫、绝育的时间线，\n一次问清，别等出事再翻攻略。', fontFamily: HEI, fontSize: 32, color: { $t: 'colors.dim' }, lineHeight: 1.45, x: 250, y: 1120, width: 700, height: 104, zIndex: 3, editable: { content: true } },
      ...boneShapes('gd-bone', 872, 1174, 148, 72, 'colors.accent', -12, 0.7, 4, { name: 'float', duration: 5000, iterationCount: 'infinite', easing: 'ease-in-out' }),
      { id: 'gd-foot', type: 'text', content: '攻略作者：也是第一次当铲屎官，错了评论区骂我', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.dim' }, x: 60, y: 1258, width: 820, height: 38, zIndex: 3, editable: { content: true } },
      ...pawShapes('gd-paw', 946, 190, 74, 'colors.accent', 18, 0.35, 2, { name: 'twinkle', duration: 3200, iterationCount: 'infinite' })
    ]
  },

  // 3. 领养代替购买卡（3:4）—— 毛孩子资料表 + 领养流程条
  {
    id: 'pet-adoption-card', name: '领养代替购买档案卡', version: '1.0.0', category: 'pet',
    tags: ['pet', 'adoption', 'profile', 'form', '3:4'],
    thumbnail: svgUri('<rect width="100" height="133" fill="%23F4F7F2"/><rect x="10" y="9" width="24" height="4" rx="2" fill="%234D9B6A"/><rect x="10" y="17" width="48" height="9" rx="2" fill="%231E2A22"/><rect x="10" y="29" width="34" height="4" rx="2" fill="%236F7E72"/><rect x="8" y="40" width="84" height="46" rx="5" fill="%23FFFFFF" opacity="0.85"/><rect x="14" y="46" width="24" height="32" rx="3" fill="none" stroke="%231E2A22" stroke-dasharray="3 2"/><rect x="44" y="48" width="34" height="4" rx="2" fill="%231E2A22"/><rect x="44" y="57" width="30" height="4" rx="2" fill="%231E2A22" opacity="0.7"/><rect x="44" y="66" width="36" height="4" rx="2" fill="%231E2A22" opacity="0.7"/><rect x="44" y="75" width="28" height="4" rx="2" fill="%234D9B6A"/><circle cx="16" cy="97" r="5" fill="%234D9B6A"/><circle cx="38" cy="97" r="5" fill="%234D9B6A" opacity="0.7"/><circle cx="60" cy="97" r="5" fill="%234D9B6A" opacity="0.5"/><circle cx="82" cy="97" r="5" fill="%234D9B6A" opacity="0.35"/><line x1="16" y1="97" x2="82" y2="97" stroke="%231E2A22" stroke-width="1" opacity="0.25"/><rect x="12" y="106" width="14" height="3" rx="1.5" fill="%236F7E72"/><rect x="34" y="106" width="14" height="3" rx="1.5" fill="%236F7E72"/><rect x="56" y="106" width="14" height="3" rx="1.5" fill="%236F7E72"/><rect x="78" y="106" width="14" height="3" rx="1.5" fill="%236F7E72"/><rect x="10" y="116" width="44" height="8" rx="4" fill="%234D9B6A"/>', 100, 133),
    tokens: {
      colors: {
        bg: { label: '档案纸', default: '#F4F7F2', options: ['#F4F7F2', '#FFF6EF', '#F2F4FA', '#FBF2F4'] },
        ink: { label: '墨字', default: '#1E2A22', options: ['#1E2A22', '#33241A', '#1E2233', '#331E26'] },
        accent: { label: '强调', default: '#4D9B6A', options: ['#4D9B6A', '#E76F51', '#4C6FD0', '#C2557E'] },
        paper: { label: '卡纸', default: 'rgba(255,255,255,0.78)', options: ['rgba(255,255,255,0.78)', 'rgba(255,255,255,0.82)', 'rgba(255,255,255,0.8)', 'rgba(255,255,255,0.8)'] },
        dim: { label: '弱文字', default: '#6F7E72', options: ['#6F7E72', '#8A7566', '#6F7686', '#8A6F78'] }
      },
      fonts: { heading: { label: '标题字体', default: HEI, options: [HEI, SONG] } }
    },
    presets: [
      { name: '救助绿', colors: { bg: '#F4F7F2', ink: '#1E2A22', accent: '#4D9B6A', paper: 'rgba(255,255,255,0.78)', dim: '#6F7E72' } },
      { name: '暖陶橘', colors: { bg: '#FFF6EF', ink: '#33241A', accent: '#E76F51', paper: 'rgba(255,255,255,0.82)', dim: '#8A7566' } },
      { name: '夜巡蓝', colors: { bg: '#F2F4FA', ink: '#1E2233', accent: '#4C6FD0', paper: 'rgba(255,255,255,0.8)', dim: '#6F7686' } },
      { name: '蔷薇粉', colors: { bg: '#FBF2F4', ink: '#331E26', accent: '#C2557E', paper: 'rgba(255,255,255,0.8)', dim: '#8A6F78' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1440, defaultWidth: 1080, defaultHeight: 1440, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'ad-dots', type: 'image', src: halftone(1080, 1440, 2.2, 60, 'rgba(30,42,34,0.09)'), x: 0, y: 0, width: 1080, height: 1440, objectFit: 'fill', zIndex: 1 },
      { id: 'ad-kicker', type: 'text', content: '毛孩子档案 · NO.0187', fontFamily: HEI, fontSize: 26, fontWeight: 700, letterSpacing: 3, color: { $t: 'colors.accent' }, x: 60, y: 74, width: 520, height: 40, zIndex: 3, editable: { content: true } },
      { id: 'ad-title', type: 'text', content: '领养代替购买', fontFamily: { $t: 'fonts.heading' }, fontSize: 86, fontWeight: 900, color: { $t: 'colors.ink' }, x: 60, y: 124, width: 880, height: 128, zIndex: 3, animation: { name: 'fadeInUp', duration: 520 }, editable: { content: true, fontSize: { type: 'range', min: 64, max: 104 } } },
      { id: 'ad-title-en', type: 'text', content: "ADOPT, DON'T SHOP · 本城 38 只待领养", fontFamily: MONO, fontSize: 26, color: { $t: 'colors.dim' }, x: 60, y: 256, width: 860, height: 40, zIndex: 3, editable: { content: true } },
      { id: 'ad-card', type: 'shape', shapeKind: 'rect', x: 60, y: 316, width: 960, height: 560, borderRadius: 28, fill: { $t: 'colors.paper' }, zIndex: 2, animation: { name: 'fadeIn', duration: 620 } },
      { id: 'ad-photo', type: 'shape', shapeKind: 'rect', x: 100, y: 356, width: 320, height: 400, borderRadius: 18, border: { width: 5, style: 'dashed', color: { $t: 'colors.ink' } }, zIndex: 3 },
      ...pawShapes('ad-photo-paw', 218, 620, 96, 'colors.accent', -10, 0.32, 3),
      { id: 'ad-photo-t', type: 'text', content: '这里放正脸照', imageSlot: 'ad-photo', fontFamily: HEI, fontSize: 30, color: { $t: 'colors.dim' }, textAlign: 'center', x: 100, y: 496, width: 320, height: 44, zIndex: 4, editable: { content: true } },
      { id: 'ad-l1', type: 'text', content: '名字', fontFamily: HEI, fontSize: 34, color: { $t: 'colors.dim' }, x: 470, y: 372, width: 110, height: 48, zIndex: 3, editable: { content: true } },
      { id: 'ad-v1', type: 'text', content: '布丁', fontFamily: { $t: 'fonts.heading' }, fontSize: 44, fontWeight: 700, color: { $t: 'colors.ink' }, x: 590, y: 366, width: 400, height: 66, zIndex: 3, editable: { content: true } },
      { id: 'ad-r1', group: 'ad-r', type: 'image', src: dotted(500, 10, 3, 16, 'rgba(30,42,34,0.30)'), x: 470, y: 444, width: 500, height: 10, objectFit: 'fill', zIndex: 2 },
      { id: 'ad-l2', type: 'text', content: '年龄', fontFamily: HEI, fontSize: 34, color: { $t: 'colors.dim' }, x: 470, y: 464, width: 110, height: 48, zIndex: 3, editable: { content: true } },
      { id: 'ad-v2', type: 'text', content: '2 岁 3 个月', fontFamily: { $t: 'fonts.heading' }, fontSize: 44, fontWeight: 700, color: { $t: 'colors.ink' }, x: 590, y: 458, width: 400, height: 66, zIndex: 3, editable: { content: true } },
      { id: 'ad-r2', group: 'ad-r', type: 'image', src: dotted(500, 10, 3, 16, 'rgba(30,42,34,0.30)'), x: 470, y: 536, width: 500, height: 10, objectFit: 'fill', zIndex: 2 },
      { id: 'ad-l3', type: 'text', content: '性格', fontFamily: HEI, fontSize: 34, color: { $t: 'colors.dim' }, x: 470, y: 556, width: 110, height: 48, zIndex: 3, editable: { content: true } },
      { id: 'ad-v3', type: 'text', content: '嘴硬心软，\n见人就打滚', fontFamily: { $t: 'fonts.heading' }, fontSize: 44, fontWeight: 700, color: { $t: 'colors.ink' }, lineHeight: 1.3, x: 590, y: 550, width: 400, height: 130, zIndex: 3, editable: { content: true } },
      { id: 'ad-r3', group: 'ad-r', type: 'image', src: dotted(500, 10, 3, 16, 'rgba(30,42,34,0.30)'), x: 470, y: 680, width: 500, height: 10, objectFit: 'fill', zIndex: 2 },
      { id: 'ad-l4', type: 'text', content: '健康', fontFamily: HEI, fontSize: 34, color: { $t: 'colors.dim' }, x: 470, y: 700, width: 110, height: 48, zIndex: 3, editable: { content: true } },
      { id: 'ad-v4', type: 'text', content: '已绝育 · 已疫苗', fontFamily: { $t: 'fonts.heading' }, fontSize: 44, fontWeight: 700, color: { $t: 'colors.ink' }, x: 590, y: 694, width: 400, height: 66, zIndex: 3, editable: { content: true } },
      { id: 'ad-badge1', type: 'shape', shapeKind: 'rect', x: 590, y: 780, width: 180, height: 58, borderRadius: 999, fill: { $t: 'colors.accent' }, zIndex: 3 },
      { id: 'ad-badge1-t', type: 'text', content: '已驱虫', fontFamily: HEI, fontSize: 26, fontWeight: 700, color: { $t: 'colors.bg' }, textAlign: 'center', x: 590, y: 792, width: 180, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'ad-badge2', type: 'shape', shapeKind: 'rect', x: 790, y: 780, width: 180, height: 58, borderRadius: 999, border: { width: 3, color: { $t: 'colors.accent' } }, zIndex: 3 },
      { id: 'ad-badge2-t', type: 'text', content: '亲人可撸', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.accent' }, textAlign: 'center', x: 790, y: 792, width: 180, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'ad-proc-h', type: 'text', content: '领养流程 · 四步接它回家', fontFamily: { $t: 'fonts.heading' }, fontSize: 34, fontWeight: 700, color: { $t: 'colors.accent' }, x: 60, y: 920, width: 700, height: 48, zIndex: 3, editable: { content: true } },
      { id: 'ad-line', type: 'shape', shapeKind: 'rect', x: 128, y: 1026, width: 790, height: 4, fill: { $t: 'colors.ink' }, opacity: 0.22, zIndex: 1 },
      { id: 'ad-s1', group: 'ad-s', type: 'shape', shapeKind: 'circle', x: 90, y: 990, width: 76, height: 76, fill: { $t: 'colors.accent' }, zIndex: 2, animation: { name: 'zoomIn', duration: 400 } },
      { id: 'ad-s1-t', type: 'text', content: '1', fontFamily: IMPACT, fontSize: 40, color: { $t: 'colors.bg' }, textAlign: 'center', x: 90, y: 1004, width: 76, height: 58, zIndex: 3, editable: { content: true } },
      { id: 'ad-s1-l', type: 'text', content: '提交申请', fontFamily: HEI, fontSize: 30, color: { $t: 'colors.dim' }, textAlign: 'center', x: 48, y: 1096, width: 160, height: 42, zIndex: 3, editable: { content: true } },
      { id: 'ad-s2', group: 'ad-s', type: 'shape', shapeKind: 'circle', x: 330, y: 990, width: 76, height: 76, fill: { $t: 'colors.accent' }, opacity: 0.8, zIndex: 2, animation: { name: 'zoomIn', duration: 400, delay: 120 } },
      { id: 'ad-s2-t', type: 'text', content: '2', fontFamily: IMPACT, fontSize: 40, color: { $t: 'colors.bg' }, textAlign: 'center', x: 330, y: 1004, width: 76, height: 58, zIndex: 3, editable: { content: true } },
      { id: 'ad-s2-l', type: 'text', content: '入户家访', fontFamily: HEI, fontSize: 30, color: { $t: 'colors.dim' }, textAlign: 'center', x: 288, y: 1096, width: 160, height: 42, zIndex: 3, editable: { content: true } },
      { id: 'ad-s3', group: 'ad-s', type: 'shape', shapeKind: 'circle', x: 570, y: 990, width: 76, height: 76, fill: { $t: 'colors.accent' }, opacity: 0.62, zIndex: 2, animation: { name: 'zoomIn', duration: 400, delay: 240 } },
      { id: 'ad-s3-t', type: 'text', content: '3', fontFamily: IMPACT, fontSize: 40, color: { $t: 'colors.bg' }, textAlign: 'center', x: 570, y: 1004, width: 76, height: 58, zIndex: 3, editable: { content: true } },
      { id: 'ad-s3-l', type: 'text', content: '试养两周', fontFamily: HEI, fontSize: 30, color: { $t: 'colors.dim' }, textAlign: 'center', x: 528, y: 1096, width: 160, height: 42, zIndex: 3, editable: { content: true } },
      { id: 'ad-s4', group: 'ad-s', type: 'shape', shapeKind: 'circle', x: 810, y: 990, width: 76, height: 76, fill: { $t: 'colors.accent' }, opacity: 0.46, zIndex: 2, animation: { name: 'zoomIn', duration: 400, delay: 360 } },
      { id: 'ad-s4-t', type: 'text', content: '4', fontFamily: IMPACT, fontSize: 40, color: { $t: 'colors.bg' }, textAlign: 'center', x: 810, y: 1004, width: 76, height: 58, zIndex: 3, editable: { content: true } },
      { id: 'ad-s4-l', type: 'text', content: '签字接家', fontFamily: HEI, fontSize: 30, color: { $t: 'colors.dim' }, textAlign: 'center', x: 768, y: 1096, width: 160, height: 42, zIndex: 3, editable: { content: true } },
      { id: 'ad-foot', type: 'text', content: '救助站：城南猫犬救助中心 · 每周六 10:00-17:00 开放', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.dim' }, x: 60, y: 1180, width: 920, height: 40, zIndex: 3, editable: { content: true } },
      { id: 'ad-note', type: 'shape', shapeKind: 'rect', x: 60, y: 1268, width: 520, height: 88, borderRadius: 999, fill: { $t: 'colors.accent' }, zIndex: 3, animation: { name: 'slideInLeft', duration: 520, delay: 260 } },
      { id: 'ad-note-t', type: 'text', content: '它不挑你，你也别挑它', fontFamily: HEI, fontSize: 34, fontWeight: 700, color: { $t: 'colors.bg' }, textAlign: 'center', x: 60, y: 1290, width: 520, height: 48, zIndex: 4, editable: { content: true } },
      ...pawShapes('ad-paw', 900, 1270, 100, 'colors.accent', 18, 0.35, 3, { name: 'float', duration: 4600, iterationCount: 'infinite', easing: 'ease-in-out' })
    ]
  },

  // 4. 宠物开销账单（1:1）—— 分类行 + 总额大字 + 「它不配知道」角标
  {
    id: 'pet-expense-bill', name: '宠物本月开销账单', version: '1.0.0', category: 'pet',
    tags: ['pet', 'expense', 'bill', 'ledger', '1:1'],
    thumbnail: svgUri('<rect width="100" height="100" fill="%232A2320"/><rect x="7" y="6" width="86" height="88" rx="3" fill="%23FFFDF6"/><rect x="12" y="13" width="30" height="4" rx="2" fill="%23E76F51"/><rect x="12" y="20" width="42" height="7" rx="2" fill="%232B231C"/><g fill="%232B231C" opacity="0.75"><rect x="12" y="34" width="26" height="4" rx="1.5"/><rect x="12" y="43" width="24" height="4" rx="1.5"/><rect x="12" y="52" width="28" height="4" rx="1.5"/><rect x="12" y="61" width="22" height="4" rx="1.5"/><rect x="12" y="70" width="25" height="4" rx="1.5"/></g><g fill="%232B231C" opacity="0.55"><rect x="64" y="34" width="22" height="4" rx="1.5"/><rect x="66" y="43" width="20" height="4" rx="1.5"/><rect x="68" y="52" width="18" height="4" rx="1.5"/><rect x="66" y="61" width="20" height="4" rx="1.5"/><rect x="67" y="70" width="19" height="4" rx="1.5"/></g><rect x="12" y="80" width="42" height="6" rx="2" fill="%23E76F51" opacity="0.85"/><rect x="56" y="78" width="30" height="10" rx="2" fill="%232B231C"/><rect x="12" y="60" width="74" height="1" fill="%232B231C" opacity="0.2"/>', 100, 100),
    tokens: {
      colors: {
        bg: { label: '台面', default: '#2A2320', options: ['#2A2320', '#1E2528', '#26202E', '#212821'] },
        paper: { label: '纸单', default: '#FFFDF6', options: ['#FFFDF6', '#F7FBFC', '#FBF6FF', '#F6FBF4'] },
        ink: { label: '墨字', default: '#2B231C', options: ['#2B231C', '#1D2B33', '#331E2C', '#1E3324'] },
        accent: { label: '强调', default: '#E76F51', options: ['#E76F51', '#2A9D8F', '#7C5CD6', '#3F8F55'] },
        dim: { label: '弱文字', default: '#9A8C7E', options: ['#9A8C7E', '#7E8C9A', '#9A8CA0', '#8C9A7E'] }
      },
      fonts: { heading: { label: '标题字体', default: HEI, options: [HEI, SONG] } }
    },
    presets: [
      { name: '复古红', colors: { bg: '#2A2320', paper: '#FFFDF6', ink: '#2B231C', accent: '#E76F51', dim: '#9A8C7E' } },
      { name: '青瓷蓝', colors: { bg: '#1E2528', paper: '#F7FBFC', ink: '#1D2B33', accent: '#2A9D8F', dim: '#7E8C9A' } },
      { name: '葡萄紫', colors: { bg: '#26202E', paper: '#FBF6FF', ink: '#331E2C', accent: '#7C5CD6', dim: '#9A8CA0' } },
      { name: '田野绿', colors: { bg: '#212821', paper: '#F6FBF4', ink: '#1E3324', accent: '#3F8F55', dim: '#8C9A7E' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1080, defaultWidth: 1080, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'bl-paper', type: 'shape', shapeKind: 'rect', x: 70, y: 56, width: 940, height: 968, borderRadius: 12, fill: { $t: 'colors.paper' }, shadow: { offsetX: 0, offsetY: 10, blur: 26, color: 'rgba(0,0,0,0.35)' }, zIndex: 1 },
      { id: 'bl-kicker', type: 'text', content: 'PET LEDGER · SEPTEMBER 2026', fontFamily: MONO, fontSize: 26, letterSpacing: 2, color: { $t: 'colors.accent' }, x: 110, y: 92, width: 620, height: 40, zIndex: 3, editable: { content: true } },
      { id: 'bl-title', type: 'text', content: '本月养宠账单', fontFamily: { $t: 'fonts.heading' }, fontSize: 66, fontWeight: 900, color: { $t: 'colors.ink' }, x: 110, y: 140, width: 700, height: 100, zIndex: 3, animation: { name: 'fadeInUp', duration: 500 }, editable: { content: true, fontSize: { type: 'range', min: 48, max: 84 } } },
      { id: 'bl-sub', type: 'text', content: '一只猫 · 两个人吃土', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.dim' }, x: 110, y: 252, width: 520, height: 40, zIndex: 3, editable: { content: true } },
      ...boneShapes('bl-bone', 800, 150, 160, 78, 'colors.accent', -8, 0.5, 3, { name: 'float', duration: 5200, iterationCount: 'infinite', easing: 'ease-in-out' }),
      { id: 'bl-rule1', type: 'shape', shapeKind: 'rect', x: 110, y: 300, width: 860, height: 3, fill: { $t: 'colors.ink' }, opacity: 0.25, zIndex: 2 },
      { id: 'bl-n1', type: 'text', content: '主粮 · 进口罐头', fontFamily: { $t: 'fonts.heading' }, fontSize: 32, fontWeight: 700, color: { $t: 'colors.ink' }, x: 110, y: 330, width: 440, height: 52, zIndex: 3, animation: { name: 'slideInLeft', duration: 420 }, editable: { content: true } },
      { id: 'bl-d1', type: 'text', content: '它只认这个牌子，换粮等于绝食', fontFamily: HEI, fontSize: 22, color: { $t: 'colors.dim' }, x: 110, y: 370, width: 440, height: 34, zIndex: 3, editable: { content: true } },
      { id: 'bl-a1', type: 'text', content: '¥1,280', fontFamily: MONO, fontSize: 36, fontWeight: 700, color: { $t: 'colors.ink' }, textAlign: 'right', x: 560, y: 326, width: 410, height: 60, zIndex: 3, editable: { content: true } },
      { id: 'bl-n2', type: 'text', content: '猫砂 · 消耗品', fontFamily: { $t: 'fonts.heading' }, fontSize: 32, fontWeight: 700, color: { $t: 'colors.ink' }, x: 110, y: 424, width: 440, height: 52, zIndex: 3, animation: { name: 'slideInLeft', duration: 420, delay: 90 }, editable: { content: true } },
      { id: 'bl-d2', type: 'text', content: '一天铲两次，砂盆已换第三个', fontFamily: HEI, fontSize: 22, color: { $t: 'colors.dim' }, x: 110, y: 464, width: 440, height: 34, zIndex: 3, editable: { content: true } },
      { id: 'bl-a2', type: 'text', content: '¥260', fontFamily: MONO, fontSize: 36, fontWeight: 700, color: { $t: 'colors.ink' }, textAlign: 'right', x: 560, y: 420, width: 410, height: 60, zIndex: 3, editable: { content: true } },
      { id: 'bl-n3', type: 'text', content: '医疗 · 疫苗驱虫', fontFamily: { $t: 'fonts.heading' }, fontSize: 32, fontWeight: 700, color: { $t: 'colors.ink' }, x: 110, y: 518, width: 440, height: 52, zIndex: 3, animation: { name: 'slideInLeft', duration: 420, delay: 180 }, editable: { content: true } },
      { id: 'bl-d3', type: 'text', content: '年度分摊到每月，其实不贵', fontFamily: HEI, fontSize: 22, color: { $t: 'colors.dim' }, x: 110, y: 558, width: 440, height: 34, zIndex: 3, editable: { content: true } },
      { id: 'bl-a3', type: 'text', content: '¥540', fontFamily: MONO, fontSize: 36, fontWeight: 700, color: { $t: 'colors.ink' }, textAlign: 'right', x: 560, y: 514, width: 410, height: 60, zIndex: 3, editable: { content: true } },
      { id: 'bl-n4', type: 'text', content: '玩具 · 拆家损耗', fontFamily: { $t: 'fonts.heading' }, fontSize: 32, fontWeight: 700, color: { $t: 'colors.ink' }, x: 110, y: 612, width: 440, height: 52, zIndex: 3, animation: { name: 'slideInLeft', duration: 420, delay: 270 }, editable: { content: true } },
      { id: 'bl-d4', type: 'text', content: '本月阵亡 7 件，含一只拖鞋', fontFamily: HEI, fontSize: 22, color: { $t: 'colors.dim' }, x: 110, y: 652, width: 440, height: 34, zIndex: 3, editable: { content: true } },
      { id: 'bl-a4', type: 'text', content: '¥190', fontFamily: MONO, fontSize: 36, fontWeight: 700, color: { $t: 'colors.ink' }, textAlign: 'right', x: 560, y: 608, width: 410, height: 60, zIndex: 3, editable: { content: true } },
      { id: 'bl-n5', type: 'text', content: '洗护 · 美容', fontFamily: { $t: 'fonts.heading' }, fontSize: 32, fontWeight: 700, color: { $t: 'colors.ink' }, x: 110, y: 706, width: 440, height: 52, zIndex: 3, animation: { name: 'slideInLeft', duration: 420, delay: 360 }, editable: { content: true } },
      { id: 'bl-d5', type: 'text', content: '它全程骂我，我全程道歉', fontFamily: HEI, fontSize: 22, color: { $t: 'colors.dim' }, x: 110, y: 746, width: 440, height: 34, zIndex: 3, editable: { content: true } },
      { id: 'bl-a5', type: 'text', content: '¥450', fontFamily: MONO, fontSize: 36, fontWeight: 700, color: { $t: 'colors.ink' }, textAlign: 'right', x: 560, y: 702, width: 410, height: 60, zIndex: 3, editable: { content: true } },
      { id: 'bl-rule2', type: 'shape', shapeKind: 'rect', x: 110, y: 800, width: 860, height: 3, fill: { $t: 'colors.ink' }, opacity: 0.25, zIndex: 2 },
      { id: 'bl-total-h', type: 'text', content: '本月合计 · 五个类目', fontFamily: HEI, fontSize: 32, fontWeight: 700, color: { $t: 'colors.accent' }, x: 110, y: 828, width: 400, height: 48, zIndex: 3, editable: { content: true } },
      { id: 'bl-total', type: 'text', content: '¥2,720', fontFamily: { $t: 'fonts.heading' }, fontSize: 120, fontWeight: 900, color: { $t: 'colors.ink' }, textAlign: 'right', x: 430, y: 836, width: 540, height: 172, zIndex: 3, animation: { name: 'zoomIn', duration: 480, delay: 220 }, editable: { content: true, fontSize: { type: 'range', min: 84, max: 140 } } },
      { id: 'bl-stamp', type: 'shape', shapeKind: 'rect', x: 110, y: 884, width: 300, height: 76, borderRadius: 12, fill: { $t: 'colors.accent' }, opacity: 0.95, rotation: -6, zIndex: 4, animation: { name: 'zoomIn', duration: 420, delay: 460 } },
      { id: 'bl-stamp-t', type: 'text', content: '它不配知道', fontFamily: HEI, fontSize: 32, fontWeight: 900, color: { $t: 'colors.paper' }, textAlign: 'center', rotation: -6, x: 110, y: 902, width: 300, height: 46, zIndex: 5, editable: { content: true } },
      { id: 'bl-foot', type: 'text', content: '备注：它只负责可爱，我负责刷卡', fontFamily: HEI, fontSize: 22, color: { $t: 'colors.dim' }, x: 110, y: 964, width: 620, height: 34, zIndex: 3, editable: { content: true } },
      { id: 'bl-perf', type: 'image', src: dotted(860, 14, 4, 34, 'rgba(43,35,28,0.26)'), x: 110, y: 1004, width: 860, height: 14, objectFit: 'fill', zIndex: 2 },
      ...pawShapes('bl-paw-decor', 830, 878, 122, 'colors.ink', 22, 0.1, 1)
    ]
  },

  // 5. 萌宠行为大赏榜单（9:16）—— 编号行为清单 + 荒谬程度星级
  {
    id: 'pet-behavior-ranking', name: '萌宠行为大赏榜单', version: '1.0.0', category: 'pet',
    tags: ['pet', 'ranking', 'behavior', 'list', '9:16'],
    thumbnail: svgUri('<rect width="100" height="178" fill="%232B2135"/><rect x="10" y="12" width="34" height="4" rx="2" fill="%23FF8A5B"/><rect x="10" y="21" width="56" height="9" rx="2" fill="%23F7F1E6"/><g opacity="0.9"><text x="10" y="46" font-family="Impact,sans-serif" font-size="11" fill="%23FF8A5B">01</text><rect x="26" y="38" width="44" height="5" rx="2" fill="%23F7F1E6"/><rect x="26" y="47" width="34" height="4" rx="2" fill="%23A6958F"/><text x="72" y="46" font-family="sans-serif" font-size="6" fill="%23FFD166">★★★★★</text></g><g opacity="0.8"><text x="10" y="70" font-family="Impact,sans-serif" font-size="11" fill="%23FF8A5B">02</text><rect x="26" y="62" width="40" height="5" rx="2" fill="%23F7F1E6"/><rect x="26" y="71" width="30" height="4" rx="2" fill="%23A6958F"/><text x="72" y="70" font-family="sans-serif" font-size="6" fill="%23FFD166">★★★★</text></g><g opacity="0.7"><text x="10" y="94" font-family="Impact,sans-serif" font-size="11" fill="%23FF8A5B">03</text><rect x="26" y="86" width="46" height="5" rx="2" fill="%23F7F1E6"/><rect x="26" y="95" width="32" height="4" rx="2" fill="%23A6958F"/><text x="72" y="94" font-family="sans-serif" font-size="6" fill="%23FFD166">★★★</text></g><g opacity="0.6"><text x="10" y="118" font-family="Impact,sans-serif" font-size="11" fill="%23FF8A5B">04</text><rect x="26" y="110" width="42" height="5" rx="2" fill="%23F7F1E6"/><rect x="26" y="119" width="28" height="4" rx="2" fill="%23A6958F"/><text x="72" y="118" font-family="sans-serif" font-size="6" fill="%23FFD166">★★</text></g><g opacity="0.5"><text x="10" y="142" font-family="Impact,sans-serif" font-size="11" fill="%23FF8A5B">05</text><rect x="26" y="134" width="38" height="5" rx="2" fill="%23F7F1E6"/><rect x="26" y="143" width="30" height="4" rx="2" fill="%23A6958F"/><text x="72" y="142" font-family="sans-serif" font-size="6" fill="%23FFD166">★★</text></g><rect x="10" y="160" width="52" height="4" rx="2" fill="%23FF8A5B" opacity="0.8"/>', 100, 178),
    tokens: {
      colors: {
        bg: { label: '夜色', default: '#2B2135', options: ['#2B2135', '#1C2A28', '#2E2220', '#1E2635'] },
        ink: { label: '主文字', default: '#F7F1E6', options: ['#F7F1E6', '#EAF7F1', '#F7EDE6', '#E9EFF7'] },
        accent: { label: '榜单色', default: '#FF8A5B', options: ['#FF8A5B', '#4ECDC4', '#FFC14D', '#A0C4FF'] },
        gold: { label: '星级金', default: '#FFD166', options: ['#FFD166', '#9BF6B4', '#FFB4C2', '#A0C4FF'] },
        dim: { label: '弱文字', default: '#A6958F', options: ['#A6958F', '#8FA6A0', '#B0958F', '#93A0B5'] }
      },
      fonts: { heading: { label: '标题字体', default: HEI, options: [HEI, IMPACT] } }
    },
    presets: [
      { name: '暗夜珊瑚', colors: { bg: '#2B2135', ink: '#F7F1E6', accent: '#FF8A5B', gold: '#FFD166', dim: '#A6958F' } },
      { name: '松林薄荷', colors: { bg: '#1C2A28', ink: '#EAF7F1', accent: '#4ECDC4', gold: '#9BF6B4', dim: '#8FA6A0' } },
      { name: '焦糖玫瑰', colors: { bg: '#2E2220', ink: '#F7EDE6', accent: '#FFC14D', gold: '#FFB4C2', dim: '#B0958F' } },
      { name: '深海蓝调', colors: { bg: '#1E2635', ink: '#E9EFF7', accent: '#A0C4FF', gold: '#FFD166', dim: '#93A0B5' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1920, defaultWidth: 1080, defaultHeight: 1920, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'rk-dots', type: 'image', src: halftone(1080, 1920, 2.6, 56, 'rgba(255,255,255,0.055)'), x: 0, y: 0, width: 1080, height: 1920, objectFit: 'fill', zIndex: 1 },
      { id: 'rk-kicker', type: 'text', content: 'PET CRIME RANKING · 本月 6 起', fontFamily: MONO, fontSize: 26, letterSpacing: 3, color: { $t: 'colors.accent' }, x: 80, y: 104, width: 780, height: 40, zIndex: 3, editable: { content: true } },
      { id: 'rk-title', type: 'text', content: '主子行为大赏', fontFamily: { $t: 'fonts.heading' }, fontSize: 104, fontWeight: 900, color: { $t: 'colors.ink' }, x: 80, y: 150, width: 920, height: 150, zIndex: 3, animation: { name: 'fadeInUp', duration: 560 }, editable: { content: true, fontSize: { type: 'range', min: 76, max: 120 } } },
      { id: 'rk-sub', type: 'text', content: '按荒谬程度排序 · 铲屎官含泪打分', fontFamily: HEI, fontSize: 30, color: { $t: 'colors.dim' }, x: 80, y: 316, width: 760, height: 46, zIndex: 3, editable: { content: true } },
      ...pawShapes('rk-paw-a', 900, 96, 110, 'colors.gold', 18, 0.45, 2),
      ...pawShapes('rk-paw-b', 940, 336, 76, 'colors.accent', -12, 0.4, 2, { name: 'float', duration: 5600, iterationCount: 'infinite', easing: 'ease-in-out' }),
      { id: 'rk-r1', type: 'text', content: '01', fontFamily: IMPACT, fontSize: 76, color: { $t: 'colors.accent' }, x: 80, y: 396, width: 120, height: 112, zIndex: 3, animation: { name: 'zoomIn', duration: 420 }, editable: { content: true } },
      { id: 'rk-t1', type: 'text', content: '凌晨四点全屋跑酷', fontFamily: { $t: 'fonts.heading' }, fontSize: 46, fontWeight: 700, color: { $t: 'colors.ink' }, x: 230, y: 404, width: 620, height: 70, zIndex: 3, animation: { name: 'slideInLeft', duration: 460 }, editable: { content: true } },
      { id: 'rk-c1', type: 'text', content: '床头跳到床尾，像在追隐形同事', fontFamily: HEI, fontSize: 28, color: { $t: 'colors.dim' }, x: 230, y: 468, width: 620, height: 44, zIndex: 3, editable: { content: true } },
      { id: 'rk-s1', type: 'text', content: '★★★★★', fontFamily: HEI, fontSize: 34, color: { $t: 'colors.gold' }, textAlign: 'right', x: 740, y: 406, width: 260, height: 48, zIndex: 3, editable: { content: true } },
      { id: 'rk-sl1', type: 'text', content: '荒谬程度', fontFamily: HEI, fontSize: 22, color: { $t: 'colors.dim' }, textAlign: 'right', x: 740, y: 458, width: 260, height: 34, zIndex: 3 },
      { id: 'rk-dv1', group: 'rk-dv', type: 'shape', shapeKind: 'rect', x: 80, y: 536, width: 920, height: 3, fill: { $t: 'colors.ink' }, opacity: 0.16, zIndex: 2 },
      { id: 'rk-r2', type: 'text', content: '02', fontFamily: IMPACT, fontSize: 76, color: { $t: 'colors.accent' }, x: 80, y: 632, width: 120, height: 112, zIndex: 3, animation: { name: 'zoomIn', duration: 420, delay: 100 }, editable: { content: true } },
      { id: 'rk-t2', type: 'text', content: '精准把水杯推下桌', fontFamily: { $t: 'fonts.heading' }, fontSize: 46, fontWeight: 700, color: { $t: 'colors.ink' }, x: 230, y: 640, width: 620, height: 70, zIndex: 3, animation: { name: 'slideInLeft', duration: 460, delay: 100 }, editable: { content: true } },
      { id: 'rk-c2', type: 'text', content: '推完看我一眼，等我叫它名字', fontFamily: HEI, fontSize: 28, color: { $t: 'colors.dim' }, x: 230, y: 704, width: 620, height: 44, zIndex: 3, editable: { content: true } },
      { id: 'rk-s2', type: 'text', content: '★★★★★', fontFamily: HEI, fontSize: 34, color: { $t: 'colors.gold' }, textAlign: 'right', x: 740, y: 642, width: 260, height: 48, zIndex: 3, editable: { content: true } },
      { id: 'rk-sl2', type: 'text', content: '荒谬程度', fontFamily: HEI, fontSize: 22, color: { $t: 'colors.dim' }, textAlign: 'right', x: 740, y: 694, width: 260, height: 34, zIndex: 3 },
      { id: 'rk-dv2', group: 'rk-dv', type: 'shape', shapeKind: 'rect', x: 80, y: 772, width: 920, height: 3, fill: { $t: 'colors.ink' }, opacity: 0.16, zIndex: 2 },
      { id: 'rk-r3', type: 'text', content: '03', fontFamily: IMPACT, fontSize: 76, color: { $t: 'colors.accent' }, x: 80, y: 868, width: 120, height: 112, zIndex: 3, animation: { name: 'zoomIn', duration: 420, delay: 200 }, editable: { content: true } },
      { id: 'rk-t3', type: 'text', content: '八百块的窝不如纸箱', fontFamily: { $t: 'fonts.heading' }, fontSize: 46, fontWeight: 700, color: { $t: 'colors.ink' }, x: 230, y: 876, width: 620, height: 70, zIndex: 3, animation: { name: 'slideInLeft', duration: 460, delay: 200 }, editable: { content: true } },
      { id: 'rk-c3', type: 'text', content: '它只钻快递箱，还顺便搬一次家', fontFamily: HEI, fontSize: 28, color: { $t: 'colors.dim' }, x: 230, y: 940, width: 620, height: 44, zIndex: 3, editable: { content: true } },
      { id: 'rk-s3', type: 'text', content: '★★★★☆', fontFamily: HEI, fontSize: 34, color: { $t: 'colors.gold' }, textAlign: 'right', x: 740, y: 878, width: 260, height: 48, zIndex: 3, editable: { content: true } },
      { id: 'rk-sl3', type: 'text', content: '荒谬程度', fontFamily: HEI, fontSize: 22, color: { $t: 'colors.dim' }, textAlign: 'right', x: 740, y: 930, width: 260, height: 34, zIndex: 3 },
      { id: 'rk-dv3', group: 'rk-dv', type: 'shape', shapeKind: 'rect', x: 80, y: 1008, width: 920, height: 3, fill: { $t: 'colors.ink' }, opacity: 0.16, zIndex: 2 },
      { id: 'rk-r4', type: 'text', content: '04', fontFamily: IMPACT, fontSize: 76, color: { $t: 'colors.accent' }, x: 80, y: 1104, width: 120, height: 112, zIndex: 3, animation: { name: 'zoomIn', duration: 420, delay: 300 }, editable: { content: true } },
      { id: 'rk-t4', type: 'text', content: '视频会议时尖叫', fontFamily: { $t: 'fonts.heading' }, fontSize: 46, fontWeight: 700, color: { $t: 'colors.ink' }, x: 230, y: 1112, width: 620, height: 70, zIndex: 3, animation: { name: 'slideInLeft', duration: 460, delay: 300 }, editable: { content: true } },
      { id: 'rk-c4', type: 'text', content: '我一发言它就叫，还看镜头', fontFamily: HEI, fontSize: 28, color: { $t: 'colors.dim' }, x: 230, y: 1176, width: 620, height: 44, zIndex: 3, editable: { content: true } },
      { id: 'rk-s4', type: 'text', content: '★★★★☆', fontFamily: HEI, fontSize: 34, color: { $t: 'colors.gold' }, textAlign: 'right', x: 740, y: 1114, width: 260, height: 48, zIndex: 3, editable: { content: true } },
      { id: 'rk-sl4', type: 'text', content: '荒谬程度', fontFamily: HEI, fontSize: 22, color: { $t: 'colors.dim' }, textAlign: 'right', x: 740, y: 1166, width: 260, height: 34, zIndex: 3 },
      { id: 'rk-dv4', group: 'rk-dv', type: 'shape', shapeKind: 'rect', x: 80, y: 1244, width: 920, height: 3, fill: { $t: 'colors.ink' }, opacity: 0.16, zIndex: 2 },
      { id: 'rk-r5', type: 'text', content: '05', fontFamily: IMPACT, fontSize: 76, color: { $t: 'colors.accent' }, x: 80, y: 1340, width: 120, height: 112, zIndex: 3, animation: { name: 'zoomIn', duration: 420, delay: 400 }, editable: { content: true } },
      { id: 'rk-t5', type: 'text', content: '凌晨坐在我脸上', fontFamily: { $t: 'fonts.heading' }, fontSize: 46, fontWeight: 700, color: { $t: 'colors.ink' }, x: 230, y: 1348, width: 620, height: 70, zIndex: 3, animation: { name: 'slideInLeft', duration: 460, delay: 400 }, editable: { content: true } },
      { id: 'rk-c5', type: 'text', content: '坐稳后提醒我：罐头时间到了', fontFamily: HEI, fontSize: 28, color: { $t: 'colors.dim' }, x: 230, y: 1412, width: 620, height: 44, zIndex: 3, editable: { content: true } },
      { id: 'rk-s5', type: 'text', content: '★★★☆☆', fontFamily: HEI, fontSize: 34, color: { $t: 'colors.gold' }, textAlign: 'right', x: 740, y: 1350, width: 260, height: 48, zIndex: 3, editable: { content: true } },
      { id: 'rk-sl5', type: 'text', content: '荒谬程度', fontFamily: HEI, fontSize: 22, color: { $t: 'colors.dim' }, textAlign: 'right', x: 740, y: 1402, width: 260, height: 34, zIndex: 3 },
      { id: 'rk-dv5', group: 'rk-dv', type: 'shape', shapeKind: 'rect', x: 80, y: 1480, width: 920, height: 3, fill: { $t: 'colors.ink' }, opacity: 0.16, zIndex: 2 },
      { id: 'rk-r6', type: 'text', content: '06', fontFamily: IMPACT, fontSize: 76, color: { $t: 'colors.accent' }, x: 80, y: 1576, width: 120, height: 112, zIndex: 3, animation: { name: 'zoomIn', duration: 420, delay: 500 }, editable: { content: true } },
      { id: 'rk-t6', type: 'text', content: '拆家后一脸无辜', fontFamily: { $t: 'fonts.heading' }, fontSize: 46, fontWeight: 700, color: { $t: 'colors.ink' }, x: 230, y: 1584, width: 620, height: 70, zIndex: 3, animation: { name: 'slideInLeft', duration: 460, delay: 500 }, editable: { content: true } },
      { id: 'rk-c6', type: 'text', content: '现场最慌张的人，其实是我', fontFamily: HEI, fontSize: 28, color: { $t: 'colors.dim' }, x: 230, y: 1648, width: 620, height: 44, zIndex: 3, editable: { content: true } },
      { id: 'rk-s6', type: 'text', content: '★★☆☆☆', fontFamily: HEI, fontSize: 34, color: { $t: 'colors.gold' }, textAlign: 'right', x: 740, y: 1586, width: 260, height: 48, zIndex: 3, editable: { content: true } },
      { id: 'rk-sl6', type: 'text', content: '荒谬程度', fontFamily: HEI, fontSize: 22, color: { $t: 'colors.dim' }, textAlign: 'right', x: 740, y: 1638, width: 260, height: 34, zIndex: 3 },
      ...boneShapes('rk-bone', 80, 1690, 170, 80, 'colors.gold', -8, 0.55, 3, { name: 'wobble', duration: 3600, iterationCount: 'infinite', easing: 'ease-in-out' }),
      { id: 'rk-foot1', type: 'text', content: '榜首那位，已经在沙发底下住了三天', fontFamily: HEI, fontSize: 28, fontWeight: 700, color: { $t: 'colors.accent' }, x: 80, y: 1770, width: 880, height: 42, zIndex: 3, animation: { name: 'fadeInUp', duration: 520, delay: 600 }, editable: { content: true } },
      { id: 'rk-foot2', type: 'text', content: '下期预告：它如何把牙膏挤在我头上', fontFamily: HEI, fontSize: 22, color: { $t: 'colors.dim' }, x: 80, y: 1822, width: 880, height: 36, zIndex: 3, editable: { content: true } }
    ]
  },

  // 6. 走失 / 寻宠启示（4:5）—— 高对比警示风 + 特征列表 + 联系电话栏
  {
    id: 'pet-lost-notice', name: '寻宠启示告示单', version: '1.0.0', category: 'pet',
    tags: ['pet', 'lost', 'notice', 'poster', '4:5'],
    thumbnail: svgUri('<rect width="100" height="125" fill="%23F7F2E4"/><rect x="6" y="7" width="88" height="16" rx="2" fill="%2314120F"/><rect x="18" y="12" width="40" height="6" rx="1.5" fill="%23F7F2E4"/><circle cx="84" cy="15" r="6" fill="%23D91E36"/><rect x="6" y="27" width="88" height="5" fill="%23F5D020"/><rect x="6" y="37" width="34" height="36" rx="2" fill="none" stroke="%2314120F" stroke-dasharray="3 2"/><g fill="%236E675A"><rect x="10" y="60" width="26" height="3" rx="1.5" opacity="0.6"/></g><g fill="%2314120F"><rect x="46" y="40" width="30" height="4" rx="1.5"/><rect x="46" y="49" width="26" height="4" rx="1.5"/><rect x="46" y="58" width="34" height="4" rx="1.5"/><rect x="46" y="67" width="22" height="4" rx="1.5"/></g><rect x="6" y="80" width="88" height="5" rx="1" fill="%2314120F" opacity="0.15"/><rect x="6" y="90" width="88" height="18" rx="2" fill="%23D91E36"/><rect x="12" y="95" width="42" height="7" rx="2" fill="%23F7F2E4"/><rect x="66" y="94" width="24" height="9" rx="2" fill="%23F5D020"/><rect x="6" y="113" width="60" height="4" rx="1" fill="%2314120F" opacity="0.7"/><rect x="6" y="119" width="46" height="3" rx="1" fill="%236E675A"/>', 100, 125),
    tokens: {
      colors: {
        bg: { label: '告示纸', default: '#F7F2E4', options: ['#F7F2E4', '#FFF6EC', '#F1F4F7', '#FBEFEF'] },
        ink: { label: '墨黑', default: '#14120F', options: ['#14120F', '#1A120C', '#0E1A26', '#1C1214'] },
        alert: { label: '警示红', default: '#D91E36', options: ['#D91E36', '#C2410C', '#DC2626', '#B91C1C'] },
        signal: { label: '醒目黄', default: '#F5D020', options: ['#F5D020', '#FFB703', '#4CC9F0', '#F4A259'] },
        dim: { label: '弱文字', default: '#6E675A', options: ['#6E675A', '#7A6A55', '#5A6570', '#74605E'] }
      },
      fonts: { heading: { label: '标题字体', default: HEI, options: [HEI, SONG] } }
    },
    presets: [
      { name: '告示黄', colors: { bg: '#F7F2E4', ink: '#14120F', alert: '#D91E36', signal: '#F5D020', dim: '#6E675A' } },
      { name: '紧急橙', colors: { bg: '#FFF6EC', ink: '#1A120C', alert: '#C2410C', signal: '#FFB703', dim: '#7A6A55' } },
      { name: '夜巡蓝', colors: { bg: '#F1F4F7', ink: '#0E1A26', alert: '#DC2626', signal: '#4CC9F0', dim: '#5A6570' } },
      { name: '醒目红', colors: { bg: '#FBEFEF', ink: '#1C1214', alert: '#B91C1C', signal: '#F4A259', dim: '#74605E' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'lp-dots', type: 'image', src: halftone(1080, 1350, 2.2, 52, 'rgba(20,18,15,0.10)'), x: 0, y: 0, width: 1080, height: 1350, objectFit: 'fill', zIndex: 1 },
      { id: 'lp-band', type: 'shape', shapeKind: 'rect', x: 60, y: 66, width: 960, height: 152, borderRadius: 8, fill: { $t: 'colors.ink' }, zIndex: 2 },
      { id: 'lp-band-t', type: 'text', content: '寻宠启示', fontFamily: { $t: 'fonts.heading' }, fontSize: 104, fontWeight: 900, color: { $t: 'colors.bg' }, textAlign: 'center', x: 60, y: 80, width: 960, height: 150, zIndex: 3, animation: { name: 'fadeInUp', duration: 500 }, editable: { content: true, fontSize: { type: 'range', min: 72, max: 124 } } },
      { id: 'lp-badge', type: 'shape', shapeKind: 'circle', x: 898, y: 88, width: 100, height: 100, fill: { $t: 'colors.alert' }, zIndex: 3, animation: { name: 'pulse', duration: 2000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'lp-badge-t', type: 'text', content: '急', fontFamily: HEI, fontSize: 62, fontWeight: 900, color: { $t: 'colors.bg' }, textAlign: 'center', x: 898, y: 100, width: 100, height: 88, zIndex: 4, editable: { content: true } },
      { id: 'lp-sub', type: 'text', content: 'LOST PET · 捡到请留它一晚', fontFamily: SANS, fontSize: 26, fontWeight: 700, letterSpacing: 2, color: { $t: 'colors.alert' }, textAlign: 'center', x: 60, y: 240, width: 960, height: 40, zIndex: 3, editable: { content: true } },
      { id: 'lp-tape', type: 'shape', shapeKind: 'rect', x: 60, y: 290, width: 960, height: 46, fill: { $t: 'colors.signal' }, zIndex: 2 },
      { id: 'lp-tape-x', type: 'image', src: hazard(960, 46), x: 60, y: 290, width: 960, height: 46, objectFit: 'fill', zIndex: 3 },
      { id: 'lp-photo', type: 'shape', shapeKind: 'rect', x: 60, y: 372, width: 400, height: 420, borderRadius: 10, border: { width: 6, style: 'dashed', color: { $t: 'colors.ink' } }, zIndex: 2 },
      ...pawShapes('lp-photo-paw', 200, 402, 130, 'colors.ink', -8, 0.14, 1, { name: 'float', duration: 6200, iterationCount: 'infinite', easing: 'ease-in-out' }),
      { id: 'lp-photo-t', type: 'text', content: '最后目击照\n（可拖图替换）', fontFamily: HEI, fontSize: 30, color: { $t: 'colors.dim' }, lineHeight: 1.3, textAlign: 'center', x: 60, y: 654, width: 400, height: 92, zIndex: 3, editable: { content: true } },
      { id: 'lp-l1', type: 'text', content: '品种', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.dim' }, x: 510, y: 386, width: 120, height: 40, zIndex: 3, editable: { content: true } },
      { id: 'lp-v1', type: 'text', content: '英短蓝猫', fontFamily: { $t: 'fonts.heading' }, fontSize: 34, fontWeight: 700, color: { $t: 'colors.ink' }, x: 670, y: 382, width: 350, height: 48, zIndex: 3, editable: { content: true } },
      { id: 'lp-r1', group: 'lp-r', type: 'image', src: dotted(510, 10, 3, 16, 'rgba(20,18,15,0.28)'), x: 510, y: 440, width: 510, height: 10, objectFit: 'fill', zIndex: 2 },
      { id: 'lp-l2', type: 'text', content: '年龄', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.dim' }, x: 510, y: 462, width: 120, height: 40, zIndex: 3, editable: { content: true } },
      { id: 'lp-v2', type: 'text', content: '3 岁 4 个月', fontFamily: { $t: 'fonts.heading' }, fontSize: 34, fontWeight: 700, color: { $t: 'colors.ink' }, x: 670, y: 458, width: 350, height: 48, zIndex: 3, editable: { content: true } },
      { id: 'lp-r2', group: 'lp-r', type: 'image', src: dotted(510, 10, 3, 16, 'rgba(20,18,15,0.28)'), x: 510, y: 516, width: 510, height: 10, objectFit: 'fill', zIndex: 2 },
      { id: 'lp-l3', type: 'text', content: '体重', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.dim' }, x: 510, y: 538, width: 120, height: 40, zIndex: 3, editable: { content: true } },
      { id: 'lp-v3', type: 'text', content: '4.6 kg', fontFamily: { $t: 'fonts.heading' }, fontSize: 34, fontWeight: 700, color: { $t: 'colors.ink' }, x: 670, y: 534, width: 350, height: 48, zIndex: 3, editable: { content: true } },
      { id: 'lp-r3', group: 'lp-r', type: 'image', src: dotted(510, 10, 3, 16, 'rgba(20,18,15,0.28)'), x: 510, y: 592, width: 510, height: 10, objectFit: 'fill', zIndex: 2 },
      { id: 'lp-l4', type: 'text', content: '毛色', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.dim' }, x: 510, y: 614, width: 120, height: 40, zIndex: 3, editable: { content: true } },
      { id: 'lp-v4', type: 'text', content: '蓝灰，腹部偏白', fontFamily: { $t: 'fonts.heading' }, fontSize: 34, fontWeight: 700, color: { $t: 'colors.ink' }, x: 670, y: 610, width: 350, height: 48, zIndex: 3, editable: { content: true } },
      { id: 'lp-r4', group: 'lp-r', type: 'image', src: dotted(510, 10, 3, 16, 'rgba(20,18,15,0.28)'), x: 510, y: 668, width: 510, height: 10, objectFit: 'fill', zIndex: 2 },
      { id: 'lp-l5', type: 'text', content: '芯片', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.dim' }, x: 510, y: 690, width: 120, height: 40, zIndex: 3, editable: { content: true } },
      { id: 'lp-v5', type: 'text', content: '已植入 尾号 0716', fontFamily: { $t: 'fonts.heading' }, fontSize: 34, fontWeight: 700, color: { $t: 'colors.ink' }, x: 670, y: 686, width: 350, height: 48, zIndex: 3, editable: { content: true } },
      { id: 'lp-feat-h', type: 'text', content: '显著特征', fontFamily: HEI, fontSize: 30, fontWeight: 700, color: { $t: 'colors.alert' }, x: 60, y: 832, width: 220, height: 42, zIndex: 3, editable: { content: true } },
      { id: 'lp-feat', type: 'text', content: '左后爪缺一小块毛，戴蓝色项圈；\n胆子小怕鞭炮，听见开罐声会立刻出现。', fontFamily: HEI, fontSize: 34, color: { $t: 'colors.ink' }, lineHeight: 1.4, x: 60, y: 878, width: 960, height: 112, zIndex: 3, animation: { name: 'fadeInUp', duration: 520, delay: 180 }, editable: { content: true } },
      { id: 'lp-call', type: 'shape', shapeKind: 'rect', x: 60, y: 1000, width: 960, height: 170, borderRadius: 10, fill: { $t: 'colors.alert' }, zIndex: 2, animation: { name: 'zoomIn', duration: 460, delay: 260 } },
      { id: 'lp-call-1', type: 'text', content: '24 小时都能打，白天也行', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.bg' }, x: 100, y: 1030, width: 520, height: 40, zIndex: 3, editable: { content: true } },
      { id: 'lp-call-2', type: 'text', content: '138 0000 2718', fontFamily: MONO, fontSize: 62, fontWeight: 700, color: { $t: 'colors.bg' }, x: 100, y: 1074, width: 560, height: 92, zIndex: 3, editable: { content: true } },
      { id: 'lp-call-3', type: 'text', content: '酬金\n3,000 元', fontFamily: HEI, fontSize: 40, fontWeight: 900, color: { $t: 'colors.signal' }, lineHeight: 1.3, textAlign: 'right', x: 700, y: 1024, width: 280, height: 124, zIndex: 3, editable: { content: true } },
      { id: 'lp-foot1', type: 'text', content: '走失于 9 月 21 日 20:30 · 城西蓝天花园北门', fontFamily: HEI, fontSize: 30, fontWeight: 700, color: { $t: 'colors.ink' }, x: 60, y: 1196, width: 960, height: 44, zIndex: 3, editable: { content: true } },
      { id: 'lp-foot2', type: 'text', content: '见到请先拍照、轻声唤它，别追——它认生，怕快脚步。', fontFamily: HEI, fontSize: 22, color: { $t: 'colors.dim' }, x: 60, y: 1250, width: 900, height: 34, zIndex: 3, editable: { content: true } }
    ]
  },

  // 7. 主子生日贺卡（1:1）—— 派对氛围 + 蛋糕蜡烛 + 年龄大字 + 爪印气球
  {
    id: 'pet-birthday', name: '主子生日贺卡', version: '1.0.0', category: 'pet',
    tags: ['pet', 'birthday', 'party', 'cover', '1:1'],
    thumbnail: svgUri('<rect width="100" height="100" fill="%23FFF4EF"/><rect x="40" y="46" width="20" height="18" rx="3" fill="%23FF7A9C"/><rect x="34" y="62" width="32" height="16" rx="3" fill="%23FFC24B"/><rect x="48" y="30" width="4" height="10" fill="%232B2233"/><circle cx="50" cy="26" r="5" fill="%23FFC24B"/><circle cx="22" cy="24" r="9" fill="%23FF7A9C" opacity="0.8"/><circle cx="80" cy="28" r="8" fill="%23FFC24B" opacity="0.85"/><circle cx="28" cy="82" r="4" fill="%232B2233" opacity="0.5"/><circle cx="72" cy="86" r="4" fill="%232B2233" opacity="0.5"/>', 100, 100),
    tokens: {
      colors: {
        bg: { label: '派对纸', default: '#FFF4EF', options: ['#FFF4EF', '#F3F7F6', '#F6F1FB', '#F1F5FB'] },
        ink: { label: '墨字', default: '#2B2233', options: ['#2B2233', '#1F2B2A', '#241E33', '#1B2B33'] },
        accent: { label: '派对色', default: '#FF7A9C', options: ['#FF7A9C', '#57C69B', '#A78BFA', '#5FA8D3'] },
        pop: { label: '气球色', default: '#FFC24B', options: ['#FFC24B', '#FFD27F', '#FFC2D1', '#FFB4C2'] },
        dim: { label: '弱文字', default: '#8A7F8E', options: ['#8A7F8E', '#74867E', '#8A7F9C', '#74868F'] }
      },
      fonts: { heading: { label: '标题字体', default: HEI, options: [HEI, SONG] } }
    },
    presets: [
      { name: '草莓奶霜', colors: { bg: '#FFF4EF', ink: '#2B2233', accent: '#FF7A9C', pop: '#FFC24B', dim: '#8A7F8E' } },
      { name: '抹茶派对', colors: { bg: '#F3F7F6', ink: '#1F2B2A', accent: '#57C69B', pop: '#FFD27F', dim: '#74867E' } },
      { name: '葡萄汽水', colors: { bg: '#F6F1FB', ink: '#241E33', accent: '#A78BFA', pop: '#FFC2D1', dim: '#8A7F9C' } },
      { name: '晴空气球', colors: { bg: '#F1F5FB', ink: '#1B2B33', accent: '#5FA8D3', pop: '#FFB4C2', dim: '#74868F' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1080, defaultWidth: 1080, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'bd-dots', type: 'image', src: halftone(1080, 1080, 2.4, 54, 'rgba(43,34,51,0.08)'), x: 0, y: 0, width: 1080, height: 1080, objectFit: 'fill', zIndex: 1 },
      ...aura('bd-glow', 540, 470, 320, 'colors.accent', 5),
      { id: 'bd-bal1', group: 'bd-bal', type: 'shape', shapeKind: 'circle', x: 110, y: 110, width: 96, height: 96, fill: { $t: 'colors.pop' }, opacity: 0.9, zIndex: 2, animation: { name: 'float', duration: 4600, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'bd-bal2', group: 'bd-bal', type: 'shape', shapeKind: 'circle', x: 170, y: 196, width: 70, height: 70, fill: { $t: 'colors.accent' }, opacity: 0.85, zIndex: 2, animation: { name: 'float', duration: 5200, delay: 200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'bd-bal3', group: 'bd-bal', type: 'shape', shapeKind: 'circle', x: 892, y: 120, width: 100, height: 100, fill: { $t: 'colors.accent' }, opacity: 0.82, zIndex: 2, animation: { name: 'float', duration: 5000, delay: 120, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'bd-bal4', group: 'bd-bal', type: 'shape', shapeKind: 'circle', x: 938, y: 210, width: 68, height: 68, fill: { $t: 'colors.pop' }, opacity: 0.85, zIndex: 2, animation: { name: 'float', duration: 4400, delay: 360, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'bd-kicker', type: 'text', content: 'PET BIRTHDAY · 第 3 个春夏', fontFamily: MONO, fontSize: 26, letterSpacing: 3, color: { $t: 'colors.accent' }, textAlign: 'center', x: 90, y: 96, width: 900, height: 40, zIndex: 3, editable: { content: true } },
      { id: 'bd-title', type: 'text', content: '生日快乐', fontFamily: { $t: 'fonts.heading' }, fontSize: 124, fontWeight: 900, color: { $t: 'colors.ink' }, lineHeight: 1.1, textAlign: 'center', x: 90, y: 150, width: 900, height: 170, zIndex: 3, animation: { name: 'fadeInUp', duration: 560 }, editable: { content: true, fontSize: { type: 'range', min: 92, max: 150 } } },
      { id: 'bd-sub', type: 'text', content: '今天它最大，谁也别惹它', fontFamily: HEI, fontSize: 36, color: { $t: 'colors.dim' }, textAlign: 'center', x: 90, y: 330, width: 900, height: 50, zIndex: 3, editable: { content: true } },
      { id: 'bd-cake1', type: 'shape', shapeKind: 'rect', x: 360, y: 560, width: 360, height: 140, borderRadius: 24, fill: { $t: 'colors.accent' }, zIndex: 2, animation: { name: 'zoomIn', duration: 460 } },
      { id: 'bd-cake2', type: 'shape', shapeKind: 'rect', x: 420, y: 470, width: 240, height: 120, borderRadius: 22, fill: { $t: 'colors.pop' }, zIndex: 2, animation: { name: 'zoomIn', duration: 460, delay: 120 } },
      { id: 'bd-cd1', group: 'bd-cd', type: 'shape', shapeKind: 'rect', x: 462, y: 400, width: 14, height: 80, fill: { $t: 'colors.ink' }, zIndex: 3 },
      { id: 'bd-cd2', group: 'bd-cd', type: 'shape', shapeKind: 'rect', x: 533, y: 400, width: 14, height: 80, fill: { $t: 'colors.ink' }, zIndex: 3 },
      { id: 'bd-cd3', group: 'bd-cd', type: 'shape', shapeKind: 'rect', x: 604, y: 400, width: 14, height: 80, fill: { $t: 'colors.ink' }, zIndex: 3 },
      { id: 'bd-fl1', group: 'bd-fl', type: 'shape', shapeKind: 'circle', x: 449, y: 368, width: 40, height: 40, fill: { $t: 'colors.pop' }, zIndex: 3, animation: { name: 'twinkle', duration: 2000, iterationCount: 'infinite' } },
      { id: 'bd-fl2', group: 'bd-fl', type: 'shape', shapeKind: 'circle', x: 520, y: 368, width: 40, height: 40, fill: { $t: 'colors.pop' }, zIndex: 3, animation: { name: 'twinkle', duration: 2000, delay: 200, iterationCount: 'infinite' } },
      { id: 'bd-fl3', group: 'bd-fl', type: 'shape', shapeKind: 'circle', x: 591, y: 368, width: 40, height: 40, fill: { $t: 'colors.pop' }, zIndex: 3, animation: { name: 'twinkle', duration: 2000, delay: 400, iterationCount: 'infinite' } },
      { id: 'bd-age', type: 'shape', shapeKind: 'circle', x: 430, y: 720, width: 200, height: 200, fill: { $t: 'colors.accent' }, zIndex: 2, animation: { name: 'zoomIn', duration: 480, delay: 220 } },
      { id: 'bd-age-t', type: 'text', content: '3', fontFamily: IMPACT, fontSize: 128, color: { $t: 'colors.bg' }, textAlign: 'center', x: 430, y: 752, width: 200, height: 150, zIndex: 3, editable: { content: true } },
      { id: 'bd-cta', type: 'shape', shapeKind: 'rect', x: 140, y: 950, width: 800, height: 92, borderRadius: 999, fill: { $t: 'colors.accent' }, zIndex: 2, animation: { name: 'heartbeat', duration: 2200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'bd-cta-t', type: 'text', content: '加餐 ×2 · 罐头自由日', fontFamily: HEI, fontSize: 40, fontWeight: 700, color: { $t: 'colors.bg' }, textAlign: 'center', x: 140, y: 974, width: 800, height: 52, zIndex: 3, editable: { content: true } },
      ...pawShapes('bd-paw-a', 120, 520, 92, 'colors.accent', -15, 0.4, 3, { name: 'float', duration: 5200, iterationCount: 'infinite', easing: 'ease-in-out' }),
      ...pawShapes('bd-paw-b', 902, 640, 72, 'colors.pop', 20, 0.4, 3, { name: 'twinkle', duration: 3000, iterationCount: 'infinite' })
    ]
  },

  // 8. 训练口令卡（4:5）—— 5 个基础口令 + 步骤 + 奖励
  {
    id: 'pet-command-card', name: '宠物训练口令卡', version: '1.0.0', category: 'pet',
    tags: ['pet', 'training', 'command', 'checklist', '4:5'],
    thumbnail: svgUri('<rect width="100" height="125" fill="%23F1F5FB"/><rect x="10" y="12" width="40" height="9" rx="2" fill="%232B2233"/><rect x="10" y="30" width="80" height="16" rx="4" fill="%23FF7A9C" opacity="0.9"/><circle cx="18" cy="38" r="5" fill="%23FFC24B"/><rect x="10" y="52" width="80" height="16" rx="4" fill="%232B2233" opacity="0.08"/><circle cx="18" cy="60" r="5" fill="%23FF7A9C"/><rect x="10" y="74" width="80" height="16" rx="4" fill="%232B2233" opacity="0.08"/><circle cx="18" cy="82" r="5" fill="%23FFC24B"/><rect x="10" y="96" width="80" height="16" rx="4" fill="%232B2233" opacity="0.08"/><circle cx="18" cy="104" r="5" fill="%23FF7A9C"/><rect x="10" y="118" width="30" height="5" rx="2" fill="%23FF7A9C"/>', 100, 125),
    tokens: {
      colors: {
        bg: { label: '纸色', default: '#FFF4EF', options: ['#FFF4EF', '#F3F7F6', '#F6F1FB', '#F1F5FB'] },
        ink: { label: '墨字', default: '#2B2233', options: ['#2B2233', '#1F2B2A', '#241E33', '#1B2B33'] },
        accent: { label: '强调', default: '#FF7A9C', options: ['#FF7A9C', '#57C69B', '#A78BFA', '#5FA8D3'] },
        card: { label: '卡底', default: 'rgba(43,34,51,0.07)', options: ['rgba(43,34,51,0.07)', 'rgba(31,43,42,0.07)', 'rgba(36,30,51,0.07)', 'rgba(27,43,51,0.07)'] },
        dim: { label: '弱文字', default: '#8A7F8E', options: ['#8A7F8E', '#74867E', '#8A7F9C', '#74868F'] }
      },
      fonts: { heading: { label: '标题字体', default: HEI, options: [HEI, SONG] } }
    },
    presets: [
      { name: '莓粉派', colors: { bg: '#FFF4EF', ink: '#2B2233', accent: '#FF7A9C', card: 'rgba(43,34,51,0.07)', dim: '#8A7F8E' } },
      { name: '薄荷绿', colors: { bg: '#F3F7F6', ink: '#1F2B2A', accent: '#57C69B', card: 'rgba(31,43,42,0.07)', dim: '#74867E' } },
      { name: '葡萄紫', colors: { bg: '#F6F1FB', ink: '#241E33', accent: '#A78BFA', card: 'rgba(36,30,51,0.07)', dim: '#8A7F9C' } },
      { name: '晴空蓝', colors: { bg: '#F1F5FB', ink: '#1B2B33', accent: '#5FA8D3', card: 'rgba(27,43,51,0.07)', dim: '#74868F' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'cm-dots', type: 'image', src: halftone(1080, 1350, 2.2, 58, 'rgba(43,34,51,0.08)'), x: 0, y: 0, width: 1080, height: 1350, objectFit: 'fill', zIndex: 1 },
      { id: 'cm-kicker', type: 'text', content: '训练口令卡 · 新手必存', fontFamily: HEI, fontSize: 26, fontWeight: 700, letterSpacing: 3, color: { $t: 'colors.accent' }, x: 60, y: 90, width: 560, height: 40, zIndex: 3, editable: { content: true } },
      { id: 'cm-title', type: 'text', content: '5 个基础口令', fontFamily: { $t: 'fonts.heading' }, fontSize: 96, fontWeight: 900, color: { $t: 'colors.ink' }, x: 60, y: 148, width: 760, height: 140, zIndex: 3, animation: { name: 'fadeInUp', duration: 540 }, editable: { content: true, fontSize: { type: 'range', min: 72, max: 116 } } },
      { id: 'cm-sub', type: 'text', content: '每天 5 分钟，它学你也轻松', fontFamily: HEI, fontSize: 30, color: { $t: 'colors.dim' }, x: 60, y: 300, width: 780, height: 46, zIndex: 3, editable: { content: true } },
      ...boneShapes('cm-bone', 868, 150, 150, 72, 'colors.accent', -12, 0.55, 4, { name: 'float', duration: 5000, iterationCount: 'infinite', easing: 'ease-in-out' }),
      ...pawShapes('cm-paw', 944, 96, 66, 'colors.accent', 16, 0.4, 2, { name: 'twinkle', duration: 3000, iterationCount: 'infinite' }),
      { id: 'cm-c1', group: 'cm-c', type: 'shape', shapeKind: 'rect', x: 60, y: 380, width: 960, height: 160, borderRadius: 24, fill: { $t: 'colors.card' }, zIndex: 2 },
      { id: 'cm-b1', group: 'cm-b', type: 'shape', shapeKind: 'circle', x: 100, y: 414, width: 92, height: 92, fill: { $t: 'colors.accent' }, zIndex: 3, animation: { name: 'zoomIn', duration: 440 } },
      { id: 'cm-b1-t', type: 'text', content: '01', fontFamily: IMPACT, fontSize: 42, color: { $t: 'colors.bg' }, textAlign: 'center', x: 100, y: 436, width: 92, height: 60, zIndex: 4, editable: { content: true } },
      { id: 'cm-h1', type: 'text', content: '坐下', fontFamily: { $t: 'fonts.heading' }, fontSize: 46, fontWeight: 700, color: { $t: 'colors.ink' }, x: 250, y: 404, width: 480, height: 68, zIndex: 3, animation: { name: 'fadeInUp', duration: 460 }, editable: { content: true } },
      { id: 'cm-d1', type: 'text', content: '手轻压屁股，它一蹲下立刻给零食', fontFamily: HEI, fontSize: 28, color: { $t: 'colors.dim' }, x: 250, y: 476, width: 560, height: 50, zIndex: 3, editable: { content: true } },
      { id: 'cm-r1', group: 'cm-r', type: 'shape', shapeKind: 'rect', x: 770, y: 434, width: 210, height: 60, borderRadius: 999, border: { width: 3, color: { $t: 'colors.accent' } }, zIndex: 3 },
      { id: 'cm-r1-t', type: 'text', content: '奖励 +1 肉干', fontFamily: HEI, fontSize: 28, fontWeight: 700, color: { $t: 'colors.accent' }, textAlign: 'center', x: 770, y: 448, width: 210, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'cm-c2', group: 'cm-c', type: 'shape', shapeKind: 'rect', x: 60, y: 562, width: 960, height: 160, borderRadius: 24, fill: { $t: 'colors.card' }, zIndex: 2 },
      { id: 'cm-b2', group: 'cm-b', type: 'shape', shapeKind: 'circle', x: 100, y: 596, width: 92, height: 92, fill: { $t: 'colors.accent' }, zIndex: 3, animation: { name: 'zoomIn', duration: 440, delay: 120 } },
      { id: 'cm-b2-t', type: 'text', content: '02', fontFamily: IMPACT, fontSize: 42, color: { $t: 'colors.bg' }, textAlign: 'center', x: 100, y: 618, width: 92, height: 60, zIndex: 4, editable: { content: true } },
      { id: 'cm-h2', type: 'text', content: '握手', fontFamily: { $t: 'fonts.heading' }, fontSize: 46, fontWeight: 700, color: { $t: 'colors.ink' }, x: 250, y: 586, width: 480, height: 68, zIndex: 3, animation: { name: 'fadeInUp', duration: 460, delay: 120 }, editable: { content: true } },
      { id: 'cm-d2', type: 'text', content: '抬爪就握住，握完马上夸一句', fontFamily: HEI, fontSize: 28, color: { $t: 'colors.dim' }, x: 250, y: 658, width: 560, height: 50, zIndex: 3, editable: { content: true } },
      { id: 'cm-r2', group: 'cm-r', type: 'shape', shapeKind: 'rect', x: 770, y: 616, width: 210, height: 60, borderRadius: 999, border: { width: 3, color: { $t: 'colors.accent' } }, zIndex: 3 },
      { id: 'cm-r2-t', type: 'text', content: '奖励 +1 肉干', fontFamily: HEI, fontSize: 28, fontWeight: 700, color: { $t: 'colors.accent' }, textAlign: 'center', x: 770, y: 630, width: 210, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'cm-c3', group: 'cm-c', type: 'shape', shapeKind: 'rect', x: 60, y: 744, width: 960, height: 160, borderRadius: 24, fill: { $t: 'colors.card' }, zIndex: 2 },
      { id: 'cm-b3', group: 'cm-b', type: 'shape', shapeKind: 'circle', x: 100, y: 778, width: 92, height: 92, fill: { $t: 'colors.accent' }, zIndex: 3, animation: { name: 'zoomIn', duration: 440, delay: 240 } },
      { id: 'cm-b3-t', type: 'text', content: '03', fontFamily: IMPACT, fontSize: 42, color: { $t: 'colors.bg' }, textAlign: 'center', x: 100, y: 800, width: 92, height: 60, zIndex: 4, editable: { content: true } },
      { id: 'cm-h3', type: 'text', content: '趴下', fontFamily: { $t: 'fonts.heading' }, fontSize: 46, fontWeight: 700, color: { $t: 'colors.ink' }, x: 250, y: 768, width: 480, height: 68, zIndex: 3, animation: { name: 'fadeInUp', duration: 460, delay: 240 }, editable: { content: true } },
      { id: 'cm-d3', type: 'text', content: '从坐姿压低，躺平即奖励', fontFamily: HEI, fontSize: 28, color: { $t: 'colors.dim' }, x: 250, y: 840, width: 560, height: 50, zIndex: 3, editable: { content: true } },
      { id: 'cm-r3', group: 'cm-r', type: 'shape', shapeKind: 'rect', x: 770, y: 798, width: 210, height: 60, borderRadius: 999, border: { width: 3, color: { $t: 'colors.accent' } }, zIndex: 3 },
      { id: 'cm-r3-t', type: 'text', content: '奖励 +1 肉干', fontFamily: HEI, fontSize: 28, fontWeight: 700, color: { $t: 'colors.accent' }, textAlign: 'center', x: 770, y: 812, width: 210, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'cm-c4', group: 'cm-c', type: 'shape', shapeKind: 'rect', x: 60, y: 926, width: 960, height: 160, borderRadius: 24, fill: { $t: 'colors.card' }, zIndex: 2 },
      { id: 'cm-b4', group: 'cm-b', type: 'shape', shapeKind: 'circle', x: 100, y: 960, width: 92, height: 92, fill: { $t: 'colors.accent' }, zIndex: 3, animation: { name: 'zoomIn', duration: 440, delay: 360 } },
      { id: 'cm-b4-t', type: 'text', content: '04', fontFamily: IMPACT, fontSize: 42, color: { $t: 'colors.bg' }, textAlign: 'center', x: 100, y: 982, width: 92, height: 60, zIndex: 4, editable: { content: true } },
      { id: 'cm-h4', type: 'text', content: '过来', fontFamily: { $t: 'fonts.heading' }, fontSize: 46, fontWeight: 700, color: { $t: 'colors.ink' }, x: 250, y: 950, width: 480, height: 68, zIndex: 3, animation: { name: 'fadeInUp', duration: 460, delay: 360 }, editable: { content: true } },
      { id: 'cm-d4', type: 'text', content: '叫名字张开手，奔向你就奖', fontFamily: HEI, fontSize: 28, color: { $t: 'colors.dim' }, x: 250, y: 1022, width: 560, height: 50, zIndex: 3, editable: { content: true } },
      { id: 'cm-r4', group: 'cm-r', type: 'shape', shapeKind: 'rect', x: 770, y: 980, width: 210, height: 60, borderRadius: 999, border: { width: 3, color: { $t: 'colors.accent' } }, zIndex: 3 },
      { id: 'cm-r4-t', type: 'text', content: '奖励 +1 肉干', fontFamily: HEI, fontSize: 28, fontWeight: 700, color: { $t: 'colors.accent' }, textAlign: 'center', x: 770, y: 994, width: 210, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'cm-c5', group: 'cm-c', type: 'shape', shapeKind: 'rect', x: 60, y: 1108, width: 960, height: 160, borderRadius: 24, fill: { $t: 'colors.card' }, zIndex: 2 },
      { id: 'cm-b5', group: 'cm-b', type: 'shape', shapeKind: 'circle', x: 100, y: 1142, width: 92, height: 92, fill: { $t: 'colors.accent' }, zIndex: 3, animation: { name: 'zoomIn', duration: 440, delay: 480 } },
      { id: 'cm-b5-t', type: 'text', content: '05', fontFamily: IMPACT, fontSize: 42, color: { $t: 'colors.bg' }, textAlign: 'center', x: 100, y: 1164, width: 92, height: 60, zIndex: 4, editable: { content: true } },
      { id: 'cm-h5', type: 'text', content: '不许', fontFamily: { $t: 'fonts.heading' }, fontSize: 46, fontWeight: 700, color: { $t: 'colors.ink' }, x: 250, y: 1132, width: 480, height: 68, zIndex: 3, animation: { name: 'fadeInUp', duration: 460, delay: 480 }, editable: { content: true } },
      { id: 'cm-d5', type: 'text', content: '要扑时喊停，冷静才给摸', fontFamily: HEI, fontSize: 28, color: { $t: 'colors.dim' }, x: 250, y: 1204, width: 560, height: 50, zIndex: 3, editable: { content: true } },
      { id: 'cm-r5', group: 'cm-r', type: 'shape', shapeKind: 'rect', x: 770, y: 1162, width: 210, height: 60, borderRadius: 999, border: { width: 3, color: { $t: 'colors.accent' } }, zIndex: 3 },
      { id: 'cm-r5-t', type: 'text', content: '奖励 摸头×1', fontFamily: HEI, fontSize: 28, fontWeight: 700, color: { $t: 'colors.accent' }, textAlign: 'center', x: 770, y: 1176, width: 210, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'cm-foot', type: 'text', content: '训练口诀：短时多次，错了不骂，对了猛夸', fontFamily: HEI, fontSize: 28, fontWeight: 700, color: { $t: 'colors.accent' }, x: 60, y: 1286, width: 960, height: 42, zIndex: 3, editable: { content: true } }
    ]
  }
]

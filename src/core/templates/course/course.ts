// src/core/templates/course/course.ts
// 教育·课程 6 个模板：直播课预告 / 课程大纲清单 / 讲师介绍名片 / 打卡日签 / 考试倒计时 / 专栏头图
// 覆盖比例：9:16、4:5、2.35:1（公众号头图）、1:1、2.35:1、16:9
// 装饰全部为原创内联 SVG；不依赖真实照片，讲师形象用几何抽象头像
import type { Template } from '@/types/types'
import { seededInt } from '../_fx/common'

const seeded = seededInt

const SANS = 'Helvetica, Arial, sans-serif'
const HEI = '"PingFang SC", "Microsoft YaHei", "Hiragino Sans GB", sans-serif'
const SONG = 'Songti SC, SimSun, serif'
const KAI = 'STKaiti, KaiTi, serif'
const SERIF = 'Didot, Bodoni MT, Georgia, serif'
const MONO = 'Consolas, Menlo, "Courier New", monospace'
const IMPACT = 'Impact, "Arial Black", sans-serif'

/** 点阵网格：作业本/坐标纸质感，颜色参数化 */
function dotGrid(w: number, h: number, step: number, r: number, fill: string) {
  let d = ''
  for (let y = step; y < h; y += step) for (let x = step; x < w; x += step) d += `<circle cx='${x}' cy='${y}' r='${r}' fill='${fill}'/>`
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${d}</svg>`
}

/** 斜纹条：警示带/进度条底纹，只画斜线不铺底 */
function stripes(w: number, h: number, gap = 28, stroke = '%23F97316', width = 12) {
  let s = ''
  for (let i = -h; i < w + h; i += gap) s += `<line x1='${i}' y1='${h}' x2='${i + h}' y2='0' stroke='${stroke}' stroke-width='${width}' stroke-opacity='0.28'/>`
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${s}</svg>`
}

// ===== 原创贴图 =====
// 直播屏 + 播放键 + 信号波
const LIVE_SCREEN = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="420" height="320" viewBox="0 0 420 320"><rect x="14" y="14" width="392" height="250" rx="16" fill="%230F172A"/><rect x="14" y="14" width="392" height="250" rx="16" fill="none" stroke="%2338BDF8" stroke-width="4"/><path d="M176 104l72 44-72 44z" fill="%2338BDF8"/><rect x="42" y="44" width="86" height="30" rx="15" fill="%23EF4444"/><rect x="300" y="230" width="80" height="10" rx="5" fill="%2338BDF8" opacity="0.7"/><rect x="42" y="230" width="150" height="10" rx="5" fill="%23F8FAFC" opacity="0.3"/><path d="M150 288h120M210 264v24" stroke="%2338BDF8" stroke-width="6" stroke-linecap="round"/><rect x="120" y="298" width="180" height="12" rx="6" fill="%230F172A"/></svg>'
// 书本堆叠
const BOOKS = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="220" viewBox="0 0 300 220"><g><rect x="20" y="150" width="250" height="34" rx="6" fill="%231D4ED8"/><rect x="34" y="112" width="222" height="34" rx="6" fill="%2338BDF8"/><rect x="46" y="74" width="196" height="34" rx="6" fill="%23FBBF24"/><path d="M20 150h250" stroke="%23F8FAFC" stroke-width="4" opacity="0.5"/><path d="M34 112h222" stroke="%23F8FAFC" stroke-width="4" opacity="0.5"/><path d="M46 74h196" stroke="%237C2D12" stroke-width="4" opacity="0.35"/><path d="M96 44h108l-12 26H108z" fill="%23EF4444"/></g></svg>'
// 灯泡（灵感）
const BULB = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="220" height="260" viewBox="0 0 220 260"><circle cx="110" cy="96" r="66" fill="%23FDE68A"/><circle cx="110" cy="96" r="66" fill="none" stroke="%23B45309" stroke-width="5"/><path d="M92 156h36l-4 22H96z" fill="%23B45309"/><rect x="86" y="178" width="48" height="12" rx="6" fill="%2357534E"/><rect x="90" y="196" width="40" height="12" rx="6" fill="%2357534E"/><g stroke="%23FBBF24" stroke-width="6" stroke-linecap="round"><path d="M110 8v22M28 40l16 14M192 40l-16 14M8 100h22M190 100h22"/></g><path d="M96 78c6-14 22-16 30-6" stroke="%23FFF7ED" stroke-width="6" fill="none" stroke-linecap="round"/></svg>'
// 抽象头像（圆形头 + 肩线 + 学位帽）
const AVATAR = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="280" height="280" viewBox="0 0 280 280"><circle cx="140" cy="140" r="132" fill="%23DBEAFE"/><circle cx="140" cy="122" r="48" fill="%231D4ED8"/><path d="M50 250c12-56 48-84 90-84s78 28 90 84z" fill="%231D4ED8" opacity="0.9"/><path d="M74 88l66-28 66 28-66 26z" fill="%23B45309"/><path d="M184 100v34" stroke="%23FBBF24" stroke-width="6" stroke-linecap="round"/><circle cx="184" cy="140" r="8" fill="%23FBBF24"/></svg>'
// 证书徽章 + 缎带
const BADGE = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="240" height="280" viewBox="0 0 240 280"><path d="M72 150l-24 110 72-34 72 34-24-110z" fill="%23EF4444" opacity="0.9"/><circle cx="120" cy="108" r="86" fill="%23FDE68A"/><circle cx="120" cy="108" r="86" fill="none" stroke="%23B45309" stroke-width="6"/><circle cx="120" cy="108" r="62" fill="none" stroke="%23B45309" stroke-width="2" stroke-dasharray="8 8"/><path d="M120 70l12 26 28 4-20 20 4 28-24-13-24 13 4-28-20-20 28-4z" fill="%23B45309"/></svg>'
// 沙漏（倒计时）
const HOURGLASS = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="220" height="280" viewBox="0 0 220 280"><rect x="26" y="10" width="168" height="16" rx="8" fill="%2357534E"/><rect x="26" y="254" width="168" height="16" rx="8" fill="%2357534E"/><path d="M52 26h116v28l-46 82a12 12 0 0 0 0 12l46 82h-116v-28l40-72-40-72z" fill="%23E0F2FE" opacity="0.8"/><path d="M52 26h116v28l-46 82a12 12 0 0 0 0 12l46 82h-116v-28l40-72-40-72z" fill="none" stroke="%230284C7" stroke-width="5"/><path d="M78 226h64l-14-26h-36z" fill="%23FBBF24"/><path d="M96 140h28l-8 22h-12z" fill="%23FBBF24" opacity="0.8"/><path d="M110 168v40" stroke="%23FBBF24" stroke-width="6"/></svg>'
// 钢笔 + 划线
const PEN = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="160" viewBox="0 0 300 160"><path d="M18 118l84-84 30 30-84 84-38 10z" fill="%231D4ED8"/><path d="M102 34l30-16 24 24-16 30z" fill="%23FBBF24"/><path d="M18 118l14-14 26 26-14 14z" fill="%2393C5FD"/><path d="M160 128c40-16 92-16 130 0" stroke="%2338BDF8" stroke-width="6" fill="none" stroke-linecap="round" stroke-dasharray="2 16"/></svg>'
// 靶心 + 飞镖（目标）
const TARGET = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="260" height="260" viewBox="0 0 260 260"><circle cx="120" cy="140" r="112" fill="%23F8FAFC"/><circle cx="120" cy="140" r="112" fill="none" stroke="%23EF4444" stroke-width="14"/><circle cx="120" cy="140" r="68" fill="%23F8FAFC" stroke="%23EF4444" stroke-width="12"/><circle cx="120" cy="140" r="26" fill="%23EF4444"/><path d="M120 140l96-104" stroke="%231D4ED8" stroke-width="10" stroke-linecap="round"/><path d="M216 36l-6 34 34-6z" fill="%23FBBF24"/></svg>'

export const courseTemplates: Template[] = [
  // 1. 直播课开讲预告（9:16）
  {
    id: 'course-live-class', name: '直播课开讲预告', version: '1.0.0', category: 'course',
    tags: ['course', '直播课', '预告', '招生', '9:16'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="90" height="160" viewBox="0 0 90 160"><rect width="90" height="160" fill="%23F8FAFC"/><rect x="12" y="18" width="66" height="42" rx="5" fill="%230F172A"/><path d="M38 32l16 9-16 9z" fill="%2338BDF8"/><rect x="12" y="72" width="60" height="8" fill="%231D4ED8"/><rect x="12" y="88" width="40" height="8" fill="%231D4ED8" opacity="0.5"/><rect x="12" y="116" width="66" height="20" rx="10" fill="%23EF4444"/></svg>',
    tokens: {
      colors: {
        bg: { label: '纸白底', default: '#F8FAFC', options: ['#F8FAFC', '#FFFFFF', '#EFF6FF', '#F5F5F4', '#FEFCE8'] },
        primary: { label: '主品牌', default: '#1D4ED8', options: ['#1D4ED8', '#0F766E', '#B91C1C', '#7C3AED', '#0369A1'] },
        accent: { label: '强调', default: '#38BDF8', options: ['#38BDF8', '#FBBF24', '#34D399', '#F472B6', '#FB923C'] },
        ink: { label: '深墨', default: '#0F172A', options: ['#0F172A', '#1C1917', '#111827', '#134E4A'] }
      },
      fonts: {
        heading: { label: '标题字体', default: HEI, options: [HEI, SONG, SANS] },
        sub: { label: '正文字体', default: SANS, options: [SANS, HEI, MONO, SERIF] }
      }
    },
    presets: [
      { name: '课堂蓝白', colors: { bg: '#F8FAFC', primary: '#1D4ED8', accent: '#38BDF8', ink: '#0F172A' } },
      { name: '松林青柠', colors: { bg: '#EFF6FF', primary: '#0F766E', accent: '#34D399', ink: '#134E4A' } },
      { name: '暖橙板书', colors: { bg: '#FEFCE8', primary: '#B91C1C', accent: '#FBBF24', ink: '#1C1917' } },
      { name: '紫电霓虹', colors: { bg: '#FFFFFF', primary: '#7C3AED', accent: '#F472B6', ink: '#111827' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1920, defaultWidth: 1080, defaultHeight: 1920, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'lc-band', type: 'shape', shapeKind: 'rect', x: 0, y: 0, width: 1080, height: 132, fill: { $t: 'colors.primary' }, zIndex: 1 },
      { id: 'lc-band-text', type: 'text', content: 'LIVE CLASS　·　本周三 20:00 开播', fontFamily: { $t: 'fonts.sub' }, fontSize: 30, fontWeight: '700', color: '#FFFFFF', letterSpacing: 4, textAlign: 'center', x: 100, y: 46, width: 880, height: 42, zIndex: 3, editable: { content: true } },
      { id: 'lc-dots', type: 'image', src: dotGrid(1080, 1500, 60, 3, 'rgba(29,78,216,0.13)'), x: 0, y: 200, width: 1080, height: 1500, objectFit: 'fill', zIndex: 2 },
      { id: 'lc-screen', type: 'image', src: LIVE_SCREEN, x: 330, y: 232, width: 420, height: 320, zIndex: 3, animation: { name: 'float', duration: 6000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'lc-tag', type: 'shape', shapeKind: 'rect', x: 380, y: 596, width: 320, height: 66, fill: { $t: 'colors.accent' }, borderRadius: 33, zIndex: 3 },
      { id: 'lc-tag-text', type: 'text', content: '免 费 公 益 课', fontFamily: { $t: 'fonts.heading' }, fontSize: 30, fontWeight: '700', color: { $t: 'colors.ink' }, letterSpacing: 3, textAlign: 'center', x: 380, y: 612, width: 320, height: 38, zIndex: 4, editable: { content: true } },
      { id: 'lc-title', type: 'text', content: '3 小时搞懂\n结构化表达', fontFamily: { $t: 'fonts.heading' }, fontSize: 92, fontWeight: '900', color: { $t: 'colors.ink' }, lineHeight: 1.32, textAlign: 'center', x: 90, y: 736, width: 900, height: 250, zIndex: 4, animation: { name: 'fadeInUp', duration: 900 }, editable: { content: true, fontSize: { type: 'range', min: 64, max: 116 } } },
      { id: 'lc-underline', type: 'shape', shapeKind: 'rect', x: 250, y: 1004, width: 580, height: 14, fill: { $t: 'colors.accent' }, opacity: 0.55, zIndex: 4 },
      { id: 'lc-pain', type: 'text', content: '汇报讲不清重点　·　写方案没有骨架　·　临场一紧张就乱', fontFamily: { $t: 'fonts.sub' }, fontSize: 30, color: { $t: 'colors.primary' }, textAlign: 'center', x: 100, y: 1062, width: 880, height: 42, zIndex: 4, editable: { content: true } },
      { id: 'lc-list-0', type: 'text', content: '01　一个万能骨架：结论先行三层结构', fontFamily: { $t: 'fonts.sub' }, fontSize: 34, color: { $t: 'colors.ink' }, x: 140, y: 1170, width: 840, height: 48, zIndex: 4, animation: { name: 'slideInLeft', duration: 700, delay: 300 }, editable: { content: true } },
      { id: 'lc-list-1', type: 'text', content: '02　四种场景适配：汇报 / 提案 / 答辩 / 闲聊', fontFamily: { $t: 'fonts.sub' }, fontSize: 34, color: { $t: 'colors.ink' }, x: 140, y: 1242, width: 840, height: 48, zIndex: 4, animation: { name: 'slideInLeft', duration: 700, delay: 460 }, editable: { content: true } },
      { id: 'lc-list-2', type: 'text', content: '03　一张检查清单：开口前 30 秒自查', fontFamily: { $t: 'fonts.sub' }, fontSize: 34, color: { $t: 'colors.ink' }, x: 140, y: 1314, width: 840, height: 48, zIndex: 4, animation: { name: 'slideInLeft', duration: 700, delay: 620 } },
      { id: 'lc-bulb', type: 'image', src: BULB, x: 856, y: 1424, width: 150, height: 178, opacity: 0.95, zIndex: 4 },
      { id: 'lc-teacher', type: 'text', content: '主讲　陈默　·　前 4A 策略总监 / 12 年提案教练', fontFamily: { $t: 'fonts.sub' }, fontSize: 28, color: { $t: 'colors.primary' }, opacity: 0.9, x: 140, y: 1452, width: 700, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'lc-cta', type: 'shape', shapeKind: 'rect', x: 140, y: 1560, width: 800, height: 128, fill: { $t: 'colors.primary' }, borderRadius: 64, zIndex: 5, shadow: { offsetX: 0, offsetY: 12, blur: 26, color: 'rgba(15,23,42,0.25)' }, animation: { name: 'heartbeat', duration: 2600, iterationCount: 'infinite' } },
      { id: 'lc-cta-text', type: 'text', content: '扫码占座　限 300 人', fontFamily: { $t: 'fonts.heading' }, fontSize: 46, fontWeight: '900', color: '#FFFFFF', letterSpacing: 6, textAlign: 'center', x: 140, y: 1596, width: 800, height: 60, zIndex: 6, editable: { content: true } },
      { id: 'lc-note', type: 'text', content: '直播回放保留 7 天　·　进群领取课件 PDF', fontFamily: { $t: 'fonts.sub' }, fontSize: 26, color: { $t: 'colors.ink' }, opacity: 0.6, letterSpacing: 1, textAlign: 'center', x: 140, y: 1736, width: 800, height: 36, zIndex: 6, editable: { content: true } }
    ]
  },

  // 2. 课程大纲清单卡（4:5）
  {
    id: 'course-syllabus', name: '课程大纲清单卡', version: '1.0.0', category: 'course',
    tags: ['course', '大纲', '训练营', '清单', '4:5'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="90" height="112" viewBox="0 0 90 112"><rect width="90" height="112" fill="%23134E4A"/><rect x="12" y="24" width="66" height="76" rx="4" fill="%23FDF6E3"/><rect x="20" y="32" width="40" height="6" fill="%230F172A"/><g stroke="%230F766E" stroke-width="3"><path d="M20 50h8M36 50h34M20 64h8M36 64h34M20 78h8M36 78h28"/></g></svg>',
    tokens: {
      colors: {
        bg: { label: '封面底', default: '#134E4A', options: ['#134E4A', '#1E3A8A', '#3F3F46', '#7C2D12', '#0F172A'] },
        paper: { label: '纸面', default: '#FDF6E3', options: ['#FDF6E3', '#FBF6E7', '#FFFFFF', '#F5F1E8'] },
        ink: { label: '正文墨', default: '#1C1917', options: ['#1C1917', '#0F172A', '#292524', '#134E4A'] },
        accent: { label: '勾选色', default: '#0F766E', options: ['#0F766E', '#B45309', '#1D4ED8', '#BE123C'] }
      },
      fonts: {
        heading: { label: '标题字体', default: SONG, options: [SONG, HEI, KAI] },
        sub: { label: '正文字体', default: HEI, options: [HEI, SANS, SERIF, MONO] }
      }
    },
    presets: [
      { name: '松墨米纸', colors: { bg: '#134E4A', paper: '#FDF6E3', ink: '#1C1917', accent: '#0F766E' } },
      { name: '藏青暖棕', colors: { bg: '#1E3A8A', paper: '#FBF6E7', ink: '#0F172A', accent: '#B45309' } },
      { name: '石墨湖蓝', colors: { bg: '#3F3F46', paper: '#FFFFFF', ink: '#292524', accent: '#1D4ED8' } },
      { name: '陶土深墨', colors: { bg: '#7C2D12', paper: '#F5F1E8', ink: '#1C1917', accent: '#BE123C' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'sy-card-shadow', type: 'shape', shapeKind: 'rect', x: 116, y: 116, width: 872, height: 1150, fill: 'rgba(0,0,0,0.22)', borderRadius: 10, zIndex: 1 },
      { id: 'sy-card', type: 'shape', shapeKind: 'rect', x: 104, y: 96, width: 872, height: 1150, fill: { $t: 'colors.paper' }, borderRadius: 10, zIndex: 2 },
      { id: 'sy-margin', type: 'shape', shapeKind: 'rect', x: 196, y: 96, width: 2, height: 1150, fill: { $t: 'colors.accent' }, opacity: 0.28, zIndex: 3 },
      { id: 'sy-books', type: 'image', src: BOOKS, x: 726, y: 138, width: 220, height: 162, zIndex: 4, editable: { position: true, size: { type: 'scale' } } },
      { id: 'sy-kicker', type: 'text', content: 'SPRING COHORT · 8 周训练营', fontFamily: { $t: 'fonts.sub' }, fontSize: 24, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 4, x: 232, y: 156, width: 480, height: 34, zIndex: 4, editable: { content: true } },
      { id: 'sy-title', type: 'text', content: '产品经理\n入门实战课', fontFamily: { $t: 'fonts.heading' }, fontSize: 84, fontWeight: '900', color: { $t: 'colors.ink' }, lineHeight: 1.26, x: 232, y: 202, width: 560, height: 226, zIndex: 4, animation: { name: 'inkReveal', duration: 1200 }, editable: { content: true, fontSize: { type: 'range', min: 56, max: 104 } } },
      { id: 'sy-rule', type: 'shape', shapeKind: 'rect', x: 232, y: 456, width: 616, height: 2, fill: { $t: 'colors.ink' }, opacity: 0.25, zIndex: 4 },
      ...[[1, '需求从哪来', '用户访谈 · 需求分级 · 竞品拆解', 'W1-2'], [2, '把想法写成文档', 'PRD 结构 · 流程图 · 边界条件', 'W3-4'], [3, '跟项目不掉链', '排期 · 评审 · 与工程和设计师协作', 'W5-6'], [4, '上线之后看什么', '埋点 · 数据复盘 · 迭代节奏', 'W7-8']].map((r, i) => ([
        { id: `sy-num-${i}`, type: 'text' as const, content: String(r[0]).padStart(2, '0'), fontFamily: MONO as any, fontSize: 40, fontWeight: '700', color: { $t: 'colors.accent' } as any, x: 148, y: 496 + i * 150, width: 64, height: 48, zIndex: 4 },
        { id: `sy-h-${i}`, type: 'text' as const, content: r[1] as string, fontFamily: { $t: 'fonts.heading' } as any, fontSize: 40, fontWeight: '700', color: { $t: 'colors.ink' } as any, x: 232, y: 492 + i * 150, width: 500, height: 52, zIndex: 4, editable: { content: true } as any },
        { id: `sy-d-${i}`, type: 'text' as const, content: r[2] as string, fontFamily: { $t: 'fonts.sub' } as any, fontSize: 25, color: { $t: 'colors.ink' } as any, opacity: 0.65, x: 234, y: 552 + i * 150, width: 560, height: 34, zIndex: 4, editable: { content: true } as any },
        { id: `sy-w-${i}`, type: 'text' as const, content: r[3] as string, fontFamily: { $t: 'fonts.sub' } as any, fontSize: 24, fontWeight: '700', color: { $t: 'colors.accent' } as any, textAlign: 'right' as any, x: 730, y: 498 + i * 150, width: 118, height: 34, zIndex: 4 }
      ])).flat(),
      { id: 'sy-benefit', type: 'text', content: '含 4 次作业点评 · 1 份 PRD 模板包 · 结课作品集辅导', fontFamily: { $t: 'fonts.sub' }, fontSize: 25, color: { $t: 'colors.ink' }, opacity: 0.72, x: 232, y: 1094, width: 660, height: 34, zIndex: 4, editable: { content: true } },
      { id: 'sy-foot', type: 'shape', shapeKind: 'rect', x: 104, y: 1156, width: 872, height: 90, fill: { $t: 'colors.accent' }, opacity: 0.12, zIndex: 3 },
      { id: 'sy-price', type: 'text', content: '早鸟价 ¥ 1,980　/　原价 ¥ 2,680', fontFamily: { $t: 'fonts.sub' }, fontSize: 30, fontWeight: '700', color: { $t: 'colors.accent' }, x: 232, y: 1184, width: 500, height: 42, zIndex: 4, editable: { content: true } },
      { id: 'sy-apply', type: 'text', content: '3 月 8 日开营 · 仅剩 12 席', fontFamily: { $t: 'fonts.sub' }, fontSize: 26, color: { $t: 'colors.ink' }, opacity: 0.8, textAlign: 'right', x: 728, y: 1188, width: 164, height: 64, zIndex: 4 }
    ]
  },

  // 3. 讲师介绍名片（2.35:1 公众号头图）
  {
    id: 'course-teacher-card', name: '讲师介绍名片横幅', version: '1.0.0', category: 'course',
    tags: ['course', '讲师', '名片', '师资', '2.35:1', '公众号'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="68" viewBox="0 0 160 68"><rect width="160" height="68" fill="%23EFF6FF"/><rect x="0" y="0" width="52" height="68" fill="%231D4ED8"/><circle cx="26" cy="26" r="12" fill="%23DBEAFE"/><path d="M10 58c3-12 9-18 16-18s13 6 16 18z" fill="%23DBEAFE"/><rect x="66" y="16" width="60" height="8" fill="%230F172A"/><rect x="66" y="32" width="80" height="5" fill="%230F766E" opacity="0.5"/><rect x="66" y="44" width="66" height="5" fill="%230F766E" opacity="0.35"/></svg>',
    tokens: {
      colors: {
        bg: { label: '浅底', default: '#EFF6FF', options: ['#EFF6FF', '#F8FAFC', '#ECFCCB', '#FEF3C7', '#F5F5F4'] },
        block: { label: '色块', default: '#1D4ED8', options: ['#1D4ED8', '#0F766E', '#B91C1C', '#7C3AED', '#0F172A'] },
        text: { label: '主文字', default: '#0F172A', options: ['#0F172A', '#1C1917', '#134E4A', '#111827'] },
        accent: { label: '点缀', default: '#FBBF24', options: ['#FBBF24', '#38BDF8', '#34D399', '#F472B6', '#FB923C'] }
      },
      fonts: {
        heading: { label: '姓名标题', default: SONG, options: [SONG, HEI, KAI] },
        sub: { label: '正文字体', default: HEI, options: [HEI, SANS, SERIF, MONO] }
      }
    },
    presets: [
      { name: '靛蓝课堂', colors: { bg: '#EFF6FF', block: '#1D4ED8', text: '#0F172A', accent: '#FBBF24' } },
      { name: '松青学院', colors: { bg: '#F8FAFC', block: '#0F766E', text: '#134E4A', accent: '#38BDF8' } },
      { name: '暖杏讲台', colors: { bg: '#FEF3C7', block: '#B91C1C', text: '#1C1917', accent: '#FB923C' } },
      { name: '夜墨讲师', colors: { bg: '#F5F5F4', block: '#0F172A', text: '#111827', accent: '#34D399' } }
    ],
    canvas: { virtualWidth: 1800, virtualHeight: 766, defaultWidth: 1800, defaultHeight: 766, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'tc-block', type: 'shape', shapeKind: 'rect', x: 0, y: 0, width: 560, height: 766, fill: { $t: 'colors.block' }, zIndex: 1 },
      { id: 'tc-stripes', type: 'image', src: stripes(560, 766, 46, '%23FFFFFF', 16), x: 0, y: 0, width: 560, height: 766, objectFit: 'fill', zIndex: 2 },
      { id: 'tc-avatar', type: 'image', src: AVATAR, x: 132, y: 150, width: 296, height: 296, zIndex: 3, animation: { name: 'zoomIn', duration: 800 }, editable: { position: true, size: { type: 'scale' } } },
      { id: 'tc-ring', type: 'shape', shapeKind: 'circle', x: 118, y: 136, width: 324, height: 324, fill: 'transparent', border: { color: { $t: 'colors.accent' }, width: 3, style: 'solid' }, opacity: 0.8, zIndex: 3 },
      { id: 'tc-badge', type: 'text', content: '主讲讲师', fontFamily: { $t: 'fonts.sub' }, fontSize: 26, fontWeight: '700', color: { $t: 'colors.bg' }, letterSpacing: 6, textAlign: 'center', x: 180, y: 486, width: 200, height: 36, zIndex: 4 },
      { id: 'tc-badge-rule', type: 'shape', shapeKind: 'rect', x: 240, y: 540, width: 80, height: 3, fill: { $t: 'colors.accent' }, zIndex: 4 },
      { id: 'tc-course', type: 'text', content: '结构化表达 · 8 周训练营', fontFamily: { $t: 'fonts.sub' }, fontSize: 22, color: { $t: 'colors.bg' }, opacity: 0.85, letterSpacing: 2, textAlign: 'center', x: 96, y: 578, width: 368, height: 34, zIndex: 4, editable: { content: true } },
      { id: 'tc-name', type: 'text', content: '陈 默', fontFamily: { $t: 'fonts.heading' }, fontSize: 104, fontWeight: '900', color: { $t: 'colors.text' }, letterSpacing: 6, x: 654, y: 132, width: 600, height: 128, zIndex: 4, animation: { name: 'slideInRight', duration: 800 }, editable: { content: true, fontSize: { type: 'range', min: 72, max: 140 } } },
      { id: 'tc-title', type: 'text', content: '前 4A 策略总监　/　12 年提案教练　/　3,000+ 学员', fontFamily: { $t: 'fonts.sub' }, fontSize: 30, color: { $t: 'colors.block' }, letterSpacing: 1, x: 654, y: 286, width: 1000, height: 42, zIndex: 4, editable: { content: true } },
      { id: 'tc-hair', type: 'shape', shapeKind: 'rect', x: 654, y: 356, width: 1000, height: 2, fill: { $t: 'colors.text' }, opacity: 0.18, zIndex: 4 },
      { id: 'tc-bio', type: 'text', content: '把「说不清」变成「说得清」。\n12 年间做过 400 场提案，也旁听过 400 次「你到底想说什么」。\n这套方法只解决一件事：让结论在三句话内站住。', fontFamily: { $t: 'fonts.sub' }, fontSize: 26, color: { $t: 'colors.text' }, opacity: 0.86, lineHeight: 1.78, x: 654, y: 392, width: 1010, height: 150, zIndex: 4, editable: { content: true } },
      { id: 'tc-pen', type: 'image', src: PEN, x: 1420, y: 116, width: 300, height: 160, opacity: 0.95, zIndex: 4 },
      ...[['代表作', '《提案的骨架》· 累计印刷 9 次'], ['授课风格', '拆真实案例，不留作业等于白来'], ['适合谁来', '汇报总被打断的产品、市场与咨询同学']].map((r, i) => ([
        { id: `tc-f-${i}`, type: 'text' as const, content: r[0], fontFamily: { $t: 'fonts.sub' } as any, fontSize: 22, fontWeight: '700', color: { $t: 'colors.block' } as any, letterSpacing: 3, x: 654, y: 588 + i * 52, width: 140, height: 34, zIndex: 4 },
        { id: `tc-fv-${i}`, type: 'text' as const, content: r[1] as string, fontFamily: { $t: 'fonts.sub' } as any, fontSize: 26, color: { $t: 'colors.text' } as any, opacity: 0.78, x: 812, y: 588 + i * 52, width: 880, height: 34, zIndex: 4, editable: { content: true } as any }
      ])).flat(),
      { id: 'tc-side', type: 'text', content: 'TEACHER PROFILE', fontFamily: { $t: 'fonts.sub' }, fontSize: 22, color: { $t: 'colors.text' }, opacity: 0.35, letterSpacing: 10, textAlign: 'right', x: 1360, y: 692, width: 380, height: 30, zIndex: 4 }
    ]
  },

  // 4. 打卡第 N 天日签（1:1）
  {
    id: 'course-checkin-day', name: '打卡日签进度卡', version: '1.0.0', category: 'course',
    tags: ['course', '打卡', '日签', '自律', '1:1'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23FEF3C7"/><rect x="14" y="14" width="72" height="72" fill="none" stroke="%23B45309" stroke-width="2"/><text x="50" y="58" font-size="34" text-anchor="middle" fill="%23B45309" font-family="Impact">21</text><g fill="%23B45309"><circle cx="30" cy="76" r="3"/><circle cx="40" cy="76" r="3"/><circle cx="50" cy="76" r="3"/></g></svg>',
    tokens: {
      colors: {
        bg: { label: '纸色', default: '#FEF3C7', options: ['#FEF3C7', '#FDF6E3', '#ECFCCB', '#EFF6FF', '#F5F5F4'] },
        ink: { label: '印墨', default: '#7C2D12', options: ['#7C2D12', '#1C1917', '#134E4A', '#0F172A'] },
        accent: { label: '强调', default: '#B45309', options: ['#B45309', '#C2410C', '#15803D', '#1D4ED8', '#BE123C'] },
        faint: { label: '浅痕', default: '#D6BC8A', options: ['#D6BC8A', '#E7D8B9', '#A8A29E', '#BFDBFE'] }
      },
      fonts: {
        number: { label: '数字字体', default: IMPACT, options: [IMPACT, SERIF, MONO, SANS] },
        heading: { label: '标题字体', default: HEI, options: [HEI, SONG, KAI] },
        sub: { label: '正文字体', default: SANS, options: [SANS, HEI, MONO] }
      }
    },
    presets: [
      { name: '暖杏日签', colors: { bg: '#FEF3C7', ink: '#7C2D12', accent: '#B45309', faint: '#D6BC8A' } },
      { name: '松间新绿', colors: { bg: '#ECFCCB', ink: '#134E4A', accent: '#15803D', faint: '#A8A29E' } },
      { name: '湖蓝自习', colors: { bg: '#EFF6FF', ink: '#0F172A', accent: '#1D4ED8', faint: '#BFDBFE' } },
      { name: '石墨硬抄', colors: { bg: '#F5F5F4', ink: '#1C1917', accent: '#BE123C', faint: '#E7D8B9' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1080, defaultWidth: 1080, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'ci-frame', type: 'shape', shapeKind: 'rect', x: 56, y: 56, width: 968, height: 968, fill: 'transparent', border: { color: { $t: 'colors.ink' }, width: 2, style: 'solid' }, opacity: 0.85, zIndex: 1 },
      { id: 'ci-frame-in', type: 'shape', shapeKind: 'rect', x: 72, y: 72, width: 936, height: 936, fill: 'transparent', border: { color: { $t: 'colors.faint' }, width: 1, style: 'dashed' }, zIndex: 1 },
      { id: 'ci-grid', type: 'image', src: dotGrid(936, 936, 48, 2, 'rgba(124,45,18,0.12)'), x: 72, y: 72, width: 936, height: 936, objectFit: 'fill', zIndex: 2 },
      { id: 'ci-head', type: 'text', content: 'SELF-STUDY LOG　·　英语晨读', fontFamily: { $t: 'fonts.sub' }, fontSize: 24, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 6, textAlign: 'center', x: 180, y: 128, width: 720, height: 34, zIndex: 3, editable: { content: true } },
      { id: 'ci-head-rule', type: 'shape', shapeKind: 'rect', x: 400, y: 178, width: 280, height: 2, fill: { $t: 'colors.ink' }, opacity: 0.3, zIndex: 3 },
      { id: 'ci-label', type: 'text', content: '第', fontFamily: { $t: 'fonts.heading' }, fontSize: 44, color: { $t: 'colors.ink' }, opacity: 0.75, x: 298, y: 292, width: 60, height: 60, zIndex: 3 },
      { id: 'ci-day', type: 'text', content: '21', fontFamily: { $t: 'fonts.number' }, fontSize: 330, fontWeight: '400', color: { $t: 'colors.accent' }, textAlign: 'center', x: 300, y: 216, width: 480, height: 340, zIndex: 3, animation: { name: 'zoomIn', duration: 900 }, editable: { content: true, fontSize: { type: 'range', min: 220, max: 420 } } },
      { id: 'ci-label2', type: 'text', content: '天', fontFamily: { $t: 'fonts.heading' }, fontSize: 44, fontWeight: '400', color: { $t: 'colors.ink' }, opacity: 0.75, x: 738, y: 292, width: 60, height: 60, zIndex: 3 },
      { id: 'ci-target', type: 'image', src: TARGET, x: 796, y: 176, width: 190, height: 190, opacity: 0.95, zIndex: 3, animation: { name: 'wobble', duration: 7000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'ci-quote', type: 'text', content: '所谓天赋，不过是把同一件事\n重复到别人不愿到达的天数。', fontFamily: { $t: 'fonts.heading' }, fontSize: 40, color: { $t: 'colors.ink' }, lineHeight: 1.72, textAlign: 'center', x: 180, y: 596, width: 720, height: 140, zIndex: 3, animation: { name: 'rise', duration: 900, delay: 400 }, editable: { content: true } },
      { id: 'ci-today', type: 'text', content: '今日完成　精读 1 篇　·　生词 24 个　·　跟读 15 分钟', fontFamily: { $t: 'fonts.sub' }, fontSize: 26, color: { $t: 'colors.ink' }, opacity: 0.72, textAlign: 'center', x: 140, y: 768, width: 800, height: 38, zIndex: 3, editable: { content: true } },
      ...Array.from({ length: 21 }, (_, i) => ({ id: `ci-dot-${i}`, type: 'shape' as const, shapeKind: 'circle' as const, x: 306 + (i % 21) * 22, y: 838, width: 12, height: 12, fill: { $t: 'colors.accent' }, opacity: 0.9, group: 'dots', zIndex: 3 })),
      { id: 'ci-progress', type: 'text', content: '21 / 100　·　连续未中断 21 天', fontFamily: { $t: 'fonts.sub' }, fontSize: 22, color: { $t: 'colors.accent' }, letterSpacing: 2, textAlign: 'center', x: 300, y: 872, width: 480, height: 32, zIndex: 3, editable: { content: true } },
      { id: 'ci-date', type: 'text', content: '2026 年 9 月 21 日　星期一　·　晴', fontFamily: { $t: 'fonts.sub' }, fontSize: 24, color: { $t: 'colors.ink' }, opacity: 0.6, textAlign: 'center', x: 240, y: 930, width: 600, height: 34, zIndex: 3, editable: { content: true } }
    ]
  },

  // 5. 考试倒计时横幅（2.35:1 公众号头图）
  {
    id: 'course-exam-countdown', name: '考试倒计时横幅', version: '1.0.0', category: 'course',
    tags: ['course', '倒计时', '考研', '考公', '冲刺', '2.35:1', '公众号'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="68" viewBox="0 0 160 68"><rect width="160" height="68" fill="%23FEF3C7"/><rect x="0" y="0" width="160" height="8" fill="%23DC2626"/><text x="60" y="52" font-size="42" fill="%237C2D12" font-family="Impact">88</text><rect x="120" y="24" width="6" height="30" fill="%23B45309"/><path d="M116 20h14l-7 12z" fill="%23DC2626"/></svg>',
    tokens: {
      colors: {
        bg: { label: '标语底', default: '#FEF3C7', options: ['#FEF3C7', '#FDF6E3', '#F8FAFC', '#FBCFE8', '#DBEAFE'] },
        ink: { label: '黑字', default: '#1C1917', options: ['#1C1917', '#0F172A', '#3F3F46', '#431407'] },
        alarm: { label: '警示红', default: '#DC2626', options: ['#DC2626', '#B91C1C', '#C2410C', '#BE123C'] },
        deep: { label: '副色', default: '#7C2D12', options: ['#7C2D12', '#134E4A', '#1E3A8A', '#57534E'] }
      },
      fonts: {
        number: { label: '数字字体', default: IMPACT, options: [IMPACT, SANS, SERIF, MONO] },
        heading: { label: '口号字体', default: HEI, options: [HEI, SONG, SANS] },
        sub: { label: '正文字体', default: SANS, options: [SANS, HEI, MONO] }
      }
    },
    presets: [
      { name: '冲刺暖杏', colors: { bg: '#FEF3C7', ink: '#1C1917', alarm: '#DC2626', deep: '#7C2D12' } },
      { name: '雪白朱红', colors: { bg: '#F8FAFC', ink: '#0F172A', alarm: '#B91C1C', deep: '#1E3A8A' } },
      { name: '粉板青墨', colors: { bg: '#FBCFE8', ink: '#3F3F46', alarm: '#BE123C', deep: '#134E4A' } },
      { name: '晨雾蓝调', colors: { bg: '#DBEAFE', ink: '#1C1917', alarm: '#C2410C', deep: '#57534E' } }
    ],
    canvas: { virtualWidth: 1800, virtualHeight: 766, defaultWidth: 1800, defaultHeight: 766, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'ec-tape-t', type: 'image', src: stripes(1800, 30, 40, '%23DC2626', 18), x: 0, y: 0, width: 1800, height: 30, objectFit: 'fill', zIndex: 1 },
      { id: 'ec-tape-b', type: 'image', src: stripes(1800, 30, 40, '%23DC2626', 18), x: 0, y: 736, width: 1800, height: 30, objectFit: 'fill', zIndex: 1 },
      { id: 'ec-hourglass', type: 'image', src: HOURGLASS, x: 1490, y: 150, width: 260, height: 332, zIndex: 2, animation: { name: 'wobble', duration: 6000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'ec-kicker', type: 'text', content: 'FINAL SPRINT　·　全国硕士研究生统一招生考试', fontFamily: { $t: 'fonts.sub' }, fontSize: 26, fontWeight: '700', color: { $t: 'colors.alarm' }, letterSpacing: 6, x: 120, y: 96, width: 1100, height: 36, zIndex: 3, editable: { content: true } },
      { id: 'ec-label', type: 'text', content: '距离开考还有', fontFamily: { $t: 'fonts.heading' }, fontSize: 52, fontWeight: '700', color: { $t: 'colors.deep' }, x: 118, y: 156, width: 520, height: 70, zIndex: 3, editable: { content: true } },
      { id: 'ec-days', type: 'text', content: '88', fontFamily: { $t: 'fonts.number' }, fontSize: 380, fontWeight: '400', color: { $t: 'colors.ink' }, letterSpacing: -6, x: 110, y: 216, width: 620, height: 400, zIndex: 3, animation: { name: 'zoomIn', duration: 1000 }, editable: { content: true, fontSize: { type: 'range', min: 260, max: 460 } } },
      { id: 'ec-days-unit', type: 'text', content: '天', fontFamily: { $t: 'fonts.heading' }, fontSize: 84, fontWeight: '900', color: { $t: 'colors.alarm' }, x: 690, y: 470, width: 110, height: 110, zIndex: 3, editable: { content: true } },
      { id: 'ec-rule', type: 'shape', shapeKind: 'rect', x: 830, y: 240, width: 3, height: 340, fill: { $t: 'colors.ink' }, opacity: 0.22, zIndex: 3 },
      { id: 'ec-slogan', type: 'text', content: '把 88 天\n拆成 88 张清单', fontFamily: { $t: 'fonts.heading' }, fontSize: 76, fontWeight: '900', color: { $t: 'colors.deep' }, lineHeight: 1.3, x: 890, y: 244, width: 580, height: 210, zIndex: 3, animation: { name: 'fadeInUp', duration: 900, delay: 400 }, editable: { content: true, fontSize: { type: 'range', min: 52, max: 96 } } },
      { id: 'ec-plan', type: 'text', content: '今日三件事　①  数学真题 1 套　②  英语外刊 2 篇　③  政治错题回炉 40 题', fontFamily: { $t: 'fonts.sub' }, fontSize: 26, color: { $t: 'colors.ink' }, opacity: 0.8, x: 890, y: 472, width: 470, height: 96, lineHeight: 1.6, zIndex: 3, editable: { content: true } },
      { id: 'ec-date', type: 'text', content: '开考日 12 月 21 日　·　考点 石家庄市第 14 中学', fontFamily: { $t: 'fonts.sub' }, fontSize: 26, color: { $t: 'colors.alarm' }, letterSpacing: 1, x: 120, y: 648, width: 900, height: 38, zIndex: 3, editable: { content: true } },
      { id: 'ec-sign', type: 'text', content: '自律委员会 · 每日打卡群', fontFamily: { $t: 'fonts.sub' }, fontSize: 22, color: { $t: 'colors.ink' }, opacity: 0.5, letterSpacing: 2, textAlign: 'right', x: 1160, y: 652, width: 520, height: 32, zIndex: 3 }
    ]
  },

  // 6. 知识专栏文章头图（16:9）
  {
    id: 'course-column', name: '知识专栏文章头图', version: '1.0.0', category: 'course',
    tags: ['course', '专栏', '长文', '头图', '16:9'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="90" viewBox="0 0 160 90"><rect width="160" height="90" fill="%23F5F5F4"/><rect x="0" y="0" width="46" height="90" fill="%23134E4A"/><rect x="58" y="24" width="70" height="9" fill="%231C1917"/><rect x="58" y="40" width="50" height="9" fill="%231C1917" opacity="0.6"/><rect x="58" y="62" width="34" height="4" fill="%23B45309"/></svg>',
    tokens: {
      colors: {
        bg: { label: '纸白', default: '#F5F5F4', options: ['#F5F5F4', '#FBF6E7', '#FFFFFF', '#EFF6FF', '#ECFCCB'] },
        block: { label: '书脊色', default: '#134E4A', options: ['#134E4A', '#1E3A8A', '#7C2D12', '#1C1917', '#3F3F46'] },
        text: { label: '标题墨', default: '#1C1917', options: ['#1C1917', '#0F172A', '#134E4A', '#292524'] },
        accent: { label: '栏目色', default: '#B45309', options: ['#B45309', '#1D4ED8', '#15803D', '#BE123C', '#0891B2'] }
      },
      fonts: {
        heading: { label: '标题字体', default: SONG, options: [SONG, HEI, KAI, SERIF] },
        sub: { label: '正文字体', default: HEI, options: [HEI, SANS, SERIF, MONO] }
      }
    },
    presets: [
      { name: '松墨纸白', colors: { bg: '#F5F5F4', block: '#134E4A', text: '#1C1917', accent: '#B45309' } },
      { name: '藏青学院', colors: { bg: '#FBF6E7', block: '#1E3A8A', text: '#0F172A', accent: '#1D4ED8' } },
      { name: '陶土暖白', colors: { bg: '#FFFFFF', block: '#7C2D12', text: '#292524', accent: '#15803D' } },
      { name: '石墨青栏', colors: { bg: '#EFF6FF', block: '#1C1917', text: '#134E4A', accent: '#0891B2' } }
    ],
    canvas: { virtualWidth: 1920, virtualHeight: 1080, defaultWidth: 1920, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'co-spine', type: 'shape', shapeKind: 'rect', x: 0, y: 0, width: 430, height: 1080, fill: { $t: 'colors.block' }, zIndex: 1 },
      { id: 'co-spine-grain', type: 'image', src: dotGrid(430, 1080, 46, 2, 'rgba(255,255,255,0.14)'), x: 0, y: 0, width: 430, height: 1080, objectFit: 'fill', zIndex: 2 },
      { id: 'co-spine-hair', type: 'shape', shapeKind: 'rect', x: 372, y: 120, width: 2, height: 840, fill: { $t: 'colors.bg' }, opacity: 0.35, zIndex: 2 },
      { id: 'co-col', type: 'text', content: '认知\n工具箱', fontFamily: { $t: 'fonts.heading' }, fontSize: 84, fontWeight: '900', color: { $t: 'colors.bg' }, lineHeight: 1.24, letterSpacing: 1, x: 84, y: 168, width: 288, height: 250, zIndex: 3, editable: { content: true, fontSize: { type: 'range', min: 64, max: 96 } } },
      { id: 'co-no', type: 'text', content: 'VOL. 24　·　第 24 篇', fontFamily: { $t: 'fonts.sub' }, fontSize: 28, color: { $t: 'colors.bg' }, opacity: 0.85, letterSpacing: 1, x: 84, y: 470, width: 304, height: 38, zIndex: 3, editable: { content: true } },
      { id: 'co-badge', type: 'image', src: BADGE, x: 128, y: 620, width: 190, height: 222, zIndex: 3, animation: { name: 'swing', duration: 8000, iterationCount: 'infinite', easing: 'ease-in-out' }, editable: { position: true, size: { type: 'scale' } } },
      { id: 'co-kicker', type: 'text', content: '为什么你总是「懂了但用不出来」', fontFamily: { $t: 'fonts.sub' }, fontSize: 28, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 2, x: 520, y: 226, width: 1200, height: 40, zIndex: 3, editable: { content: true } },
      { id: 'co-title', type: 'text', content: '知识的幻觉：\n从「看懂」到「会用」的 4 道关口', fontFamily: { $t: 'fonts.heading' }, fontSize: 76, fontWeight: '900', color: { $t: 'colors.text' }, lineHeight: 1.34, x: 520, y: 292, width: 1300, height: 240, zIndex: 3, animation: { name: 'inkReveal', duration: 1300 }, editable: { content: true, fontSize: { type: 'range', min: 56, max: 96 }, position: true } },
      { id: 'co-rule', type: 'shape', shapeKind: 'rect', x: 520, y: 578, width: 200, height: 4, fill: { $t: 'colors.accent' }, zIndex: 3 },
      { id: 'co-desc', type: 'text', content: '我们习惯把「识别」当成「掌握」：读的时候顺畅，用的时候空白。\n这一篇拆四道关口——提取、迁移、组合、反馈，并给出每关一个可当天执行的练法。', fontFamily: { $t: 'fonts.sub' }, fontSize: 30, color: { $t: 'colors.text' }, opacity: 0.78, lineHeight: 1.72, x: 520, y: 622, width: 1220, height: 120, zIndex: 3, animation: { name: 'fadeInUp', duration: 900, delay: 400 }, editable: { content: true } },
      { id: 'co-meta-1', type: 'text', content: '阅读 18 分钟', fontFamily: { $t: 'fonts.sub' }, fontSize: 25, color: { $t: 'colors.text' }, opacity: 0.62, x: 520, y: 796, width: 220, height: 34, zIndex: 3, editable: { content: true } },
      { id: 'co-meta-sep1', type: 'shape', shapeKind: 'rect', x: 756, y: 806, width: 2, height: 22, fill: { $t: 'colors.text' }, opacity: 0.35, zIndex: 3 },
      { id: 'co-meta-2', type: 'text', content: '附练习模板 1 份', fontFamily: { $t: 'fonts.sub' }, fontSize: 25, color: { $t: 'colors.text' }, opacity: 0.62, x: 786, y: 796, width: 260, height: 34, zIndex: 3, editable: { content: true } },
      { id: 'co-meta-sep2', type: 'shape', shapeKind: 'rect', x: 1062, y: 806, width: 2, height: 22, fill: { $t: 'colors.text' }, opacity: 0.35, zIndex: 3 },
      { id: 'co-meta-3', type: 'text', content: '每周三更新', fontFamily: { $t: 'fonts.sub' }, fontSize: 25, color: { $t: 'colors.text' }, opacity: 0.62, x: 1092, y: 796, width: 220, height: 34, zIndex: 3 },
      { id: 'co-author', type: 'text', content: '文 / 陈默　·　2026.09.21', fontFamily: { $t: 'fonts.sub' }, fontSize: 26, fontWeight: '700', color: { $t: 'colors.block' }, letterSpacing: 1, x: 520, y: 902, width: 700, height: 38, zIndex: 3, editable: { content: true } },
      { id: 'co-foot', type: 'text', content: 'COGNITION TOOLKIT', fontFamily: { $t: 'fonts.sub' }, fontSize: 22, color: { $t: 'colors.text' }, opacity: 0.3, letterSpacing: 12, textAlign: 'right', x: 1280, y: 906, width: 460, height: 30, zIndex: 3 }
    ]
  },

  // 7. 报名优惠卡（3:4）—— 早鸟倒计时 + 立省价 + 加赠 + CTA
  {
    id: 'course-enroll-offer', name: '报名优惠卡', version: '1.0.0', category: 'course',
    tags: ['course', '报名', '优惠', '早鸟', '3:4'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="108" height="144" viewBox="0 0 108 144"><rect width="108" height="144" fill="%231E3A8A"/><rect x="0" y="0" width="108" height="10" fill="%23F97316"/><rect x="12" y="22" width="60" height="10" rx="2" fill="%23FBF6E7"/><rect x="12" y="38" width="84" height="20" rx="3" fill="%23FBF6E7"/><g fill="%23F97316"><rect x="16" y="66" width="20" height="20" rx="4"/><rect x="16" y="92" width="76" height="5" rx="2"/></g><rect x="12" y="120" width="84" height="14" rx="7" fill="%23FBF6E7" opacity="0.85"/></svg>',
    tokens: {
      colors: {
        bg: { label: '封面底', default: '#1E3A8A', options: ['#1E3A8A', '#134E4A', '#7C2D12', '#3F3F46', '#0F172A'] },
        paper: { label: '纸面', default: '#FBF6E7', options: ['#FBF6E7', '#FDF6E3', '#FFFFFF', '#F5F1E8'] },
        ink: { label: '正文墨', default: '#1C1917', options: ['#1C1917', '#0F172A', '#134E4A', '#292524'] },
        accent: { label: '强调橙', default: '#F97316', options: ['#F97316', '#0F766E', '#B45309', '#BE123C'] }
      },
      fonts: {
        heading: { label: '标题字体', default: SONG, options: [SONG, HEI, KAI] },
        sub: { label: '正文字体', default: HEI, options: [HEI, SANS, SERIF, MONO] }
      }
    },
    presets: [
      { name: '学院靛蓝', colors: { bg: '#1E3A8A', paper: '#FBF6E7', ink: '#1C1917', accent: '#F97316' } },
      { name: '松墨米纸', colors: { bg: '#134E4A', paper: '#FDF6E3', ink: '#0F172A', accent: '#0F766E' } },
      { name: '陶土暖橙', colors: { bg: '#7C2D12', paper: '#F5F1E8', ink: '#292524', accent: '#B45309' } },
      { name: '石墨玫瑰', colors: { bg: '#3F3F46', paper: '#FFFFFF', ink: '#1C1917', accent: '#BE123C' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1440, defaultWidth: 1080, defaultHeight: 1440, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'ce-band', type: 'shape', shapeKind: 'rect', x: 0, y: 0, width: 1080, height: 120, fill: { $t: 'colors.accent' }, zIndex: 1 },
      { id: 'ce-band-t', type: 'text', content: '早鸟专享 · 3 月 8 日 24:00 截止', fontFamily: { $t: 'fonts.sub' }, fontSize: 32, fontWeight: '700', color: { $t: 'colors.paper' }, letterSpacing: 3, textAlign: 'center', x: 0, y: 44, width: 1080, height: 44, zIndex: 3, editable: { content: true } },
      { id: 'ce-card', type: 'shape', shapeKind: 'rect', x: 96, y: 160, width: 888, height: 1180, fill: { $t: 'colors.paper' }, borderRadius: 10, shadow: { offsetX: 0, offsetY: 14, blur: 30, color: 'rgba(0,0,0,0.22)' }, zIndex: 2 },
      { id: 'ce-margin', type: 'shape', shapeKind: 'rect', x: 188, y: 160, width: 2, height: 1180, fill: { $t: 'colors.accent' }, opacity: 0.3, zIndex: 3 },
      { id: 'ce-books', type: 'image', src: BOOKS, x: 712, y: 188, width: 200, height: 148, zIndex: 4, editable: { position: true, size: { type: 'scale' } } },
      { id: 'ce-kicker', type: 'text', content: 'SPRING COHORT · 春季训练营', fontFamily: { $t: 'fonts.sub' }, fontSize: 24, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 4, x: 224, y: 200, width: 480, height: 34, zIndex: 4, editable: { content: true } },
      { id: 'ce-title', type: 'text', content: '报名立省\n¥700', fontFamily: { $t: 'fonts.heading' }, fontSize: 104, fontWeight: '900', color: { $t: 'colors.ink' }, lineHeight: 1.18, x: 224, y: 248, width: 560, height: 300, zIndex: 4, animation: { name: 'inkReveal', duration: 1200 }, editable: { content: true, fontSize: { type: 'range', min: 64, max: 120 } } },
      { id: 'ce-rule', type: 'shape', shapeKind: 'rect', x: 224, y: 520, width: 616, height: 2, fill: { $t: 'colors.ink' }, opacity: 0.22, zIndex: 4 },
      { id: 'ce-pl', type: 'text', content: '原价', fontFamily: { $t: 'fonts.sub' }, fontSize: 30, color: { $t: 'colors.ink' }, opacity: 0.7, x: 224, y: 560, width: 160, height: 42, zIndex: 4, editable: { content: true } },
      { id: 'ce-pv', type: 'text', content: '¥2,680', fontFamily: MONO, fontSize: 44, fontWeight: '700', color: { $t: 'colors.ink' }, x: 360, y: 552, width: 300, height: 56, zIndex: 4, editable: { content: true } },
      { id: 'ce-pv-s', type: 'shape', shapeKind: 'rect', x: 362, y: 580, width: 176, height: 5, fill: { $t: 'colors.accent' }, zIndex: 5 },
      { id: 'ce-al', type: 'text', content: '早鸟价', fontFamily: { $t: 'fonts.sub' }, fontSize: 30, fontWeight: '700', color: { $t: 'colors.accent' }, x: 224, y: 636, width: 160, height: 42, zIndex: 4, editable: { content: true } },
      { id: 'ce-av', type: 'text', content: '¥1,980', fontFamily: MONO, fontSize: 64, fontWeight: '700', color: { $t: 'colors.accent' }, x: 360, y: 622, width: 420, height: 84, zIndex: 4, animation: { name: 'zoomIn', duration: 460, delay: 160 }, editable: { content: true } },
      { id: 'ce-gift', type: 'shape', shapeKind: 'rect', x: 224, y: 740, width: 648, height: 96, borderRadius: 16, fill: 'rgba(0,0,0,0.05)', zIndex: 3 },
      { id: 'ce-gift-t', type: 'text', content: '加赠：4 次作业 1 对 1 点评 + 结课作品集辅导', fontFamily: { $t: 'fonts.sub' }, fontSize: 28, color: { $t: 'colors.ink' }, x: 252, y: 764, width: 600, height: 48, zIndex: 4, editable: { content: true } },
      { id: 'ce-b1', group: 'ce-b', type: 'shape', shapeKind: 'circle', x: 224, y: 880, width: 40, height: 40, fill: { $t: 'colors.accent' }, zIndex: 4 },
      { id: 'ce-b1-t', type: 'text', content: '✓', fontFamily: SANS, fontSize: 28, fontWeight: '700', color: { $t: 'colors.paper' }, textAlign: 'center', x: 224, y: 884, width: 40, height: 34, zIndex: 5 },
      { id: 'ce-r1', type: 'text', content: '社群答疑持续到结营当天', fontFamily: HEI, fontSize: 32, color: { $t: 'colors.ink' }, x: 288, y: 874, width: 580, height: 52, zIndex: 4, editable: { content: true } },
      { id: 'ce-b2', group: 'ce-b', type: 'shape', shapeKind: 'circle', x: 224, y: 948, width: 40, height: 40, fill: { $t: 'colors.accent' }, zIndex: 4 },
      { id: 'ce-b2-t', type: 'text', content: '✓', fontFamily: SANS, fontSize: 28, fontWeight: '700', color: { $t: 'colors.paper' }, textAlign: 'center', x: 224, y: 952, width: 40, height: 34, zIndex: 5 },
      { id: 'ce-r2', type: 'text', content: '不满意 7 天内全额退', fontFamily: HEI, fontSize: 32, color: { $t: 'colors.ink' }, x: 288, y: 942, width: 580, height: 52, zIndex: 4, editable: { content: true } },
      { id: 'ce-b3', group: 'ce-b', type: 'shape', shapeKind: 'circle', x: 224, y: 1016, width: 40, height: 40, fill: { $t: 'colors.accent' }, zIndex: 4 },
      { id: 'ce-b3-t', type: 'text', content: '✓', fontFamily: SANS, fontSize: 28, fontWeight: '700', color: { $t: 'colors.paper' }, textAlign: 'center', x: 224, y: 1020, width: 40, height: 34, zIndex: 5 },
      { id: 'ce-r3', type: 'text', content: '开营后名额即锁定，不补位', fontFamily: HEI, fontSize: 32, color: { $t: 'colors.ink' }, x: 288, y: 1010, width: 580, height: 52, zIndex: 4, editable: { content: true } },
      { id: 'ce-cta', type: 'shape', shapeKind: 'rect', x: 224, y: 1112, width: 648, height: 120, fill: { $t: 'colors.accent' }, borderRadius: 60, zIndex: 4, shadow: { offsetX: 0, offsetY: 12, blur: 26, color: 'rgba(15,23,42,0.25)' }, animation: { name: 'heartbeat', duration: 2600, iterationCount: 'infinite' } },
      { id: 'ce-cta-t', type: 'text', content: '扫码锁定早鸟名额', fontFamily: { $t: 'fonts.heading' }, fontSize: 42, fontWeight: '900', color: { $t: 'colors.paper' }, letterSpacing: 4, textAlign: 'center', x: 224, y: 1144, width: 648, height: 60, zIndex: 5, editable: { content: true } },
      { id: 'ce-foot', type: 'text', content: '价格与权益以报名页为准 · 早鸟不可叠加其他优惠', fontFamily: { $t: 'fonts.sub' }, fontSize: 22, color: { $t: 'colors.ink' }, opacity: 0.55, textAlign: 'center', x: 224, y: 1252, width: 648, height: 34, zIndex: 4, editable: { content: true } }
    ]
  },

  // 8. 学员成果墙（16:9）—— 三张头像虚位 + 数据条
  {
    id: 'course-result-wall', name: '学员成果墙', version: '1.0.0', category: 'course',
    tags: ['course', '成果', '学员', '口碑', '16:9'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="90" viewBox="0 0 160 90"><rect width="160" height="90" fill="%23FEF3C7"/><rect x="12" y="14" width="70" height="9" rx="2" fill="%231C1917"/><g fill="none" stroke="%23B45309" stroke-width="2"><circle cx="34" cy="50" r="14"/><circle cx="80" cy="50" r="14"/><circle cx="126" cy="50" r="14"/></g><rect x="48" y="78" width="64" height="6" rx="3" fill="%23B45309"/></svg>',
    tokens: {
      colors: {
        bg: { label: '纸色', default: '#FEF3C7', options: ['#FEF3C7', '#FDF6E3', '#ECFCCB', '#EFF6FF', '#F5F5F4'] },
        ink: { label: '印墨', default: '#7C2D12', options: ['#7C2D12', '#1C1917', '#134E4A', '#0F172A'] },
        accent: { label: '强调', default: '#B45309', options: ['#B45309', '#C2410C', '#15803D', '#1D4ED8', '#BE123C'] },
        faint: { label: '浅痕', default: '#D6BC8A', options: ['#D6BC8A', '#E7D8B9', '#A8A29E', '#BFDBFE'] }
      },
      fonts: {
        heading: { label: '标题字体', default: HEI, options: [HEI, SONG, KAI] },
        sub: { label: '正文字体', default: SANS, options: [SANS, HEI, MONO] }
      }
    },
    presets: [
      { name: '暖杏日签', colors: { bg: '#FEF3C7', ink: '#7C2D12', accent: '#B45309', faint: '#D6BC8A' } },
      { name: '松间新绿', colors: { bg: '#ECFCCB', ink: '#134E4A', accent: '#15803D', faint: '#A8A29E' } },
      { name: '湖蓝自习', colors: { bg: '#EFF6FF', ink: '#0F172A', accent: '#1D4ED8', faint: '#BFDBFE' } },
      { name: '石墨硬抄', colors: { bg: '#F5F5F4', ink: '#1C1917', accent: '#BE123C', faint: '#E7D8B9' } }
    ],
    canvas: { virtualWidth: 1920, virtualHeight: 1080, defaultWidth: 1920, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'rw-frame', type: 'shape', shapeKind: 'rect', x: 60, y: 60, width: 1800, height: 960, fill: 'transparent', border: { color: { $t: 'colors.ink' }, width: 2, style: 'solid' }, opacity: 0.85, zIndex: 1 },
      { id: 'rw-inner', type: 'shape', shapeKind: 'rect', x: 76, y: 76, width: 1768, height: 928, fill: 'transparent', border: { color: { $t: 'colors.faint' }, width: 1, style: 'dashed' }, zIndex: 1 },
      { id: 'rw-dots', type: 'image', src: dotGrid(1768, 928, 52, 2, 'rgba(124,45,18,0.12)'), x: 76, y: 76, width: 1768, height: 928, objectFit: 'fill', zIndex: 2 },
      { id: 'rw-kicker', type: 'text', content: 'ALUMNI TRACK · 结营 3 个月跟踪', fontFamily: { $t: 'fonts.sub' }, fontSize: 26, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 6, x: 180, y: 130, width: 880, height: 38, zIndex: 4, editable: { content: true } },
      { id: 'rw-title', type: 'text', content: '结营之后，他们去哪了', fontFamily: { $t: 'fonts.heading' }, fontSize: 92, fontWeight: '900', color: { $t: 'colors.ink' }, x: 180, y: 178, width: 1240, height: 130, zIndex: 4, animation: { name: 'fadeInUp', duration: 600 }, editable: { content: true, fontSize: { type: 'range', min: 64, max: 112 } } },
      { id: 'rw-sub', type: 'text', content: '（以下为学员自愿分享，不等同于承诺收益）', fontFamily: { $t: 'fonts.sub' }, fontSize: 26, color: { $t: 'colors.ink' }, opacity: 0.6, x: 180, y: 300, width: 900, height: 38, zIndex: 4, editable: { content: true } },
      { id: 'rw-c1', group: 'rw-c', type: 'shape', shapeKind: 'rect', x: 180, y: 360, width: 440, height: 520, borderRadius: 16, fill: 'rgba(0,0,0,0.05)', zIndex: 3 },
      { id: 'rw-ph1', group: 'rw-ph', type: 'shape', shapeKind: 'circle', x: 340, y: 408, width: 120, height: 120, border: { width: 4, style: 'dashed', color: { $t: 'colors.accent' } }, zIndex: 4 },
      { id: 'rw-ph1-t', type: 'text', content: '拖图', fontFamily: { $t: 'fonts.sub' }, fontSize: 24, color: { $t: 'colors.ink' }, opacity: 0.6, textAlign: 'center', x: 340, y: 456, width: 120, height: 34, zIndex: 5, editable: { content: true } },
      { id: 'rw-n1', type: 'text', content: '小林', fontFamily: { $t: 'fonts.heading' }, fontSize: 40, fontWeight: '800', color: { $t: 'colors.ink' }, textAlign: 'center', x: 180, y: 548, width: 440, height: 56, zIndex: 4, editable: { content: true } },
      { id: 'rw-r1', type: 'text', content: '转岗产品经理\n薪资 +38%', fontFamily: { $t: 'fonts.sub' }, fontSize: 30, color: { $t: 'colors.accent' }, textAlign: 'center', lineHeight: 1.4, x: 180, y: 612, width: 440, height: 90, zIndex: 4, editable: { content: true } },
      { id: 'rw-o1', type: 'text', content: '“作业被点评那次，改了三版”', fontFamily: { $t: 'fonts.sub' }, fontSize: 24, color: { $t: 'colors.ink' }, opacity: 0.72, textAlign: 'center', lineHeight: 1.4, x: 210, y: 740, width: 380, height: 90, zIndex: 4, editable: { content: true } },
      { id: 'rw-c2', group: 'rw-c', type: 'shape', shapeKind: 'rect', x: 740, y: 360, width: 440, height: 520, borderRadius: 16, fill: 'rgba(0,0,0,0.05)', zIndex: 3 },
      { id: 'rw-ph2', group: 'rw-ph', type: 'shape', shapeKind: 'circle', x: 900, y: 408, width: 120, height: 120, border: { width: 4, style: 'dashed', color: { $t: 'colors.accent' } }, zIndex: 4 },
      { id: 'rw-ph2-t', type: 'text', content: '拖图', fontFamily: { $t: 'fonts.sub' }, fontSize: 24, color: { $t: 'colors.ink' }, opacity: 0.6, textAlign: 'center', x: 900, y: 456, width: 120, height: 34, zIndex: 5, editable: { content: true } },
      { id: 'rw-n2', type: 'text', content: '阿May', fontFamily: { $t: 'fonts.heading' }, fontSize: 40, fontWeight: '800', color: { $t: 'colors.ink' }, textAlign: 'center', x: 740, y: 548, width: 440, height: 56, zIndex: 4, editable: { content: true } },
      { id: 'rw-r2', type: 'text', content: '独立带项目\n半年后升职', fontFamily: { $t: 'fonts.sub' }, fontSize: 30, color: { $t: 'colors.accent' }, textAlign: 'center', lineHeight: 1.4, x: 740, y: 612, width: 440, height: 90, zIndex: 4, editable: { content: true } },
      { id: 'rw-o2', type: 'text', content: '“框架课听完，汇报不慌了”', fontFamily: { $t: 'fonts.sub' }, fontSize: 24, color: { $t: 'colors.ink' }, opacity: 0.72, textAlign: 'center', lineHeight: 1.4, x: 770, y: 740, width: 380, height: 90, zIndex: 4, editable: { content: true } },
      { id: 'rw-c3', group: 'rw-c', type: 'shape', shapeKind: 'rect', x: 1300, y: 360, width: 440, height: 520, borderRadius: 16, fill: 'rgba(0,0,0,0.05)', zIndex: 3 },
      { id: 'rw-ph3', group: 'rw-ph', type: 'shape', shapeKind: 'circle', x: 1460, y: 408, width: 120, height: 120, border: { width: 4, style: 'dashed', color: { $t: 'colors.accent' } }, zIndex: 4 },
      { id: 'rw-ph3-t', type: 'text', content: '拖图', fontFamily: { $t: 'fonts.sub' }, fontSize: 24, color: { $t: 'colors.ink' }, opacity: 0.6, textAlign: 'center', x: 1460, y: 456, width: 120, height: 34, zIndex: 5, editable: { content: true } },
      { id: 'rw-n3', type: 'text', content: '老王', fontFamily: { $t: 'fonts.heading' }, fontSize: 40, fontWeight: '800', color: { $t: 'colors.ink' }, textAlign: 'center', x: 1300, y: 548, width: 440, height: 56, zIndex: 4, editable: { content: true } },
      { id: 'rw-r3', type: 'text', content: '副业接单\n月入 +5000', fontFamily: { $t: 'fonts.sub' }, fontSize: 30, color: { $t: 'colors.accent' }, textAlign: 'center', lineHeight: 1.4, x: 1300, y: 612, width: 440, height: 90, zIndex: 4, editable: { content: true } },
      { id: 'rw-o3', type: 'text', content: '“模板包直接拿来改，省两天”', fontFamily: { $t: 'fonts.sub' }, fontSize: 24, color: { $t: 'colors.ink' }, opacity: 0.72, textAlign: 'center', lineHeight: 1.4, x: 1330, y: 740, width: 380, height: 90, zIndex: 4, editable: { content: true } },
      { id: 'rw-s1', type: 'text', content: '结营就业率', fontFamily: { $t: 'fonts.sub' }, fontSize: 26, color: { $t: 'colors.ink' }, opacity: 0.7, x: 180, y: 904, width: 300, height: 38, zIndex: 4, editable: { content: true } },
      { id: 'rw-s1-v', type: 'text', content: '92%', fontFamily: IMPACT, fontSize: 64, color: { $t: 'colors.accent' }, x: 180, y: 932, width: 300, height: 80, zIndex: 4, editable: { content: true } },
      { id: 'rw-s2', type: 'text', content: '平均涨薪', fontFamily: { $t: 'fonts.sub' }, fontSize: 26, color: { $t: 'colors.ink' }, opacity: 0.7, x: 760, y: 904, width: 300, height: 38, zIndex: 4, editable: { content: true } },
      { id: 'rw-s2-v', type: 'text', content: '+35%', fontFamily: IMPACT, fontSize: 64, color: { $t: 'colors.accent' }, x: 760, y: 932, width: 300, height: 80, zIndex: 4, editable: { content: true } },
      { id: 'rw-s3', type: 'text', content: '学员好评', fontFamily: { $t: 'fonts.sub' }, fontSize: 26, color: { $t: 'colors.ink' }, opacity: 0.7, x: 1340, y: 904, width: 300, height: 38, zIndex: 4, editable: { content: true } },
      { id: 'rw-s3-v', type: 'text', content: '4.9 / 5', fontFamily: IMPACT, fontSize: 64, color: { $t: 'colors.accent' }, x: 1340, y: 932, width: 340, height: 80, zIndex: 4, editable: { content: true } },
      { id: 'rw-foot', type: 'text', content: '样本为自愿参与调研的学员 · 个体结果可能有差异', fontFamily: { $t: 'fonts.sub' }, fontSize: 22, color: { $t: 'colors.ink' }, opacity: 0.5, textAlign: 'center', x: 360, y: 1028, width: 1200, height: 32, zIndex: 4, editable: { content: true } }
    ]
  }
]

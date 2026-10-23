// src/core/templates/business/business.ts
// 商务风主批：年报封面 / 峰会主视觉 / 产品海报 / 团队卡
// 口径：装饰一律 rect+circle 拼或 _fx / _decor 现成素材函数，颜色全部走 token（换色面板要能生效）；
//       仅中性线稿纹理（网格 / 点阵）允许 rgba 白墨；竖线横线用细长 rect（shapeKind:'line' 的厚度认自身 height，竖条用 width）。
import type { Template } from '@/types/types'
import { MONO, HEI } from '../_fx/trend'
import { dotsBg } from '../knowledge/_decor'

/** 细网格纹理：stroke 只走中性 rgba，铺在照片或深色底上做「工程图」质感层 */
function gridUri(w: number, h: number, gap: number, stroke: string) {
  const cols = Array.from({ length: Math.floor(w / gap) + 1 }, (_, i) => `<path d='M${i * gap} 0 V${h}'/>`).join('')
  const rows = Array.from({ length: Math.floor(h / gap) + 1 }, (_, i) => `<path d='M0 ${i * gap} H${w}'/>`).join('')
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><g stroke="${stroke}" stroke-width="1" fill="none">${cols}${rows}</g></svg>`
}

export const businessTemplates: Template[] = [
{
  id: 'business-annual-report', name: '年度商业趋势报告', version: '1.0.0', category: 'business', tags: ['business', 'report', 'corporate', 'finance'],
  thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%230B132B"/><rect x="10" y="10" width="80" height="2.4" fill="%23D4AF37"/><rect x="10" y="16" width="42" height="3" fill="%2394A3B8"/><circle cx="85" cy="22" r="6" fill="none" stroke="%23D4AF37" stroke-width="1.4"/><rect x="10" y="26" width="60" height="6" fill="%23FFFFFF"/><rect x="10" y="35" width="52" height="6" fill="%23FFFFFF"/><g fill="%231C2541" stroke="%233A506B" stroke-width="0.6"><rect x="10" y="47" width="39" height="15" rx="1.5"/><rect x="51" y="47" width="39" height="15" rx="1.5"/><rect x="10" y="64" width="39" height="15" rx="1.5"/><rect x="51" y="64" width="39" height="15" rx="1.5"/></g><g fill="%2338BDF8"><rect x="12" y="50" width="14" height="4"/><rect x="53" y="50" width="12" height="4"/><rect x="12" y="67" width="13" height="4"/></g><g fill="%23D4AF37"><rect x="70" y="50" width="8" height="4"/><rect x="70" y="67" width="9" height="4"/></g><rect x="10" y="81.5" width="80" height="1.6" fill="%23D4AF37"/><g fill="%2338BDF8"><rect x="12" y="76" width="6" height="5"/><rect x="24" y="72" width="6" height="9"/><rect x="36" y="74" width="6" height="7"/><rect x="48" y="69" width="6" height="12"/><rect x="60" y="66" width="6" height="15"/></g><rect x="10" y="88" width="56" height="2.4" fill="%2394A3B8"/></svg>',
  tokens: {
    colors: {
      bg: { label: '背景', default: '#0B132B', options: ['#0B132B', '#0F172A', '#1E293B', '#0B1F1A', '#1E1B4B'] },
      primary: { label: '主色', default: '#D4AF37', options: ['#D4AF37', '#F59E0B', '#3B82F6', '#10B981', '#A78BFA'] },
      accent: { label: '辅色', default: '#38BDF8', options: ['#38BDF8', '#60A5FA', '#818CF8', '#6EE7B7', '#C4B5FD'] },
      card: { label: '指标卡面', default: '#1C2541', options: ['#1C2541', '#1E293B', '#12332B', '#2B2765'] },
      edge: { label: '卡片描边', default: '#3A506B', options: ['#3A506B', '#334155', '#1F5C4A', '#4C4494'] },
      muted: { label: '次级文字', default: '#94A3B8', options: ['#94A3B8', '#94A3B8', '#8FB3A7', '#A5A0D0'] },
      up: { label: '涨角标', default: '#34D399', options: ['#34D399', '#6EE7B7', '#22D3EE', '#A78BFA'] },
      down: { label: '跌角标', default: '#F87171', options: ['#F87171', '#FB7185', '#FBBF24', '#F0ABFC'] }
    },
    fonts: { heading: { label: '标题字体', default: 'Helvetica, Arial, sans-serif', options: ['Helvetica, Arial, sans-serif', 'Inter, sans-serif', 'Georgia, serif'] } }
  },
  presets: [
    { name: '午夜金蓝', colors: { bg: '#0B132B', primary: '#D4AF37', accent: '#38BDF8', card: '#1C2541', edge: '#3A506B', muted: '#94A3B8', up: '#34D399', down: '#F87171' } },
    { name: '石墨青峰', colors: { bg: '#0F172A', primary: '#3B82F6', accent: '#60A5FA', card: '#1E293B', edge: '#334155', muted: '#94A3B8', up: '#6EE7B7', down: '#FB7185' } },
    { name: '翡翠商务', colors: { bg: '#0B1F1A', primary: '#10B981', accent: '#6EE7B7', card: '#12332B', edge: '#1F5C4A', muted: '#8FB3A7', up: '#A7F3D0', down: '#FCA5A5' } },
    { name: '深紫智库', colors: { bg: '#1E1B4B', primary: '#A78BFA', accent: '#C4B5FD', card: '#2B2765', edge: '#4C4494', muted: '#A5A0D0', up: '#C4B5FD', down: '#F9A8D4' } }
  ],
  canvas: { virtualWidth: 1000, virtualHeight: 1000, defaultWidth: 1000, defaultHeight: 1000, backgroundColor: { $t: 'colors.bg' } },
  elements: [
    // 报头：金线 + 期别 + 右上圆形年份徽章
    { id: 'gold-line-top', type: 'shape', shapeKind: 'rect', x: 100, y: 100, width: 800, height: 3, fill: { $t: 'colors.primary' }, borderRadius: 2, zIndex: 2, animation: { name: 'slideInLeft', duration: 760 } },
    { id: 'report-tag', type: 'text', content: 'GLOBAL INDUSTRY INSIGHTS · 第四季度', fontFamily: MONO, fontSize: 18, fontWeight: '700', color: { $t: 'colors.muted' }, letterSpacing: 4, x: 100, y: 128, width: 640, height: 30, zIndex: 4, editable: { content: true } },
    { id: 'ar-year-bg', type: 'shape', shapeKind: 'circle', x: 792, y: 116, width: 108, height: 108, border: { color: { $t: 'colors.primary' }, width: 2, style: 'solid' }, opacity: 0.9, zIndex: 3, animation: { name: 'zoomIn', duration: 560, delay: 260 } },
    { id: 'ar-year-t', type: 'text', content: '2026', fontFamily: MONO, fontSize: 32, fontWeight: '700', color: { $t: 'colors.primary' }, letterSpacing: 1, textAlign: 'center', x: 792, y: 150, width: 108, height: 40, zIndex: 4, editable: { content: true } },
    { id: 'main-heading', type: 'text', content: '2026 宏观战略\n与企业增长白皮书', fontFamily: { $t: 'fonts.heading' }, fontSize: 64, fontWeight: '800', color: '#FFFFFF', lineHeight: 1.3, x: 100, y: 286, width: 800, height: 200, zIndex: 5, animation: { name: 'fadeIn', duration: 900 }, editable: { content: true, fontSize: { type: 'range', min: 40, max: 90 }, position: true } },
    // 四张指标卡（2×2）：卡面 + 大数字 + 标签 + 涨跌角箭头
    ...[['68.4%', 'AI 预算占 IT 总盘比重', '▲ +12.4 pt', 'colors.up'], ['¥4 812 万', '样本企业季度营收中位数', '▲ +9.6%', 'colors.up'], ['38.6%', '毛利率 · 原料涨价拖累', '▼ −1.2 pt', 'colors.down'], ['1 486 家', '新增出海注册主体数量', '▲ +21.5%', 'colors.up']].map((c, i) => {
      const bx = i < 2 ? 100 : 512, by = i % 2 === 0 ? 470 : 636
      return [
        { id: i === 0 ? 'metric-card' : `m-card-${i}`, type: 'shape', shapeKind: 'rect', x: bx, y: by, width: 388, height: 150, fill: { $t: 'colors.card' }, borderRadius: 8, border: { color: { $t: 'colors.edge' }, width: 1, style: 'solid' }, zIndex: 2, animation: { name: 'fadeIn', duration: 620, delay: 140 + i * 110 } },
        { id: i === 0 ? 'metric-val' : `m-val-${i}`, type: 'text', content: c[0], fontFamily: MONO, fontSize: 44, fontWeight: '700', color: { $t: i % 2 ? 'colors.primary' : 'colors.accent' }, x: bx + 24, y: by + 22, width: 240, height: 60, zIndex: 4, animation: { name: 'fadeInUp', duration: 640, delay: 220 + i * 110 }, editable: { content: true, color: { type: 'palette', options: ['#38BDF8', '#D4AF37', '#34D399', '#F87171'] } } },
        { id: i === 0 ? 'metric-label' : `m-label-${i}`, type: 'text', content: c[1], fontFamily: HEI, fontSize: 18, color: { $t: 'colors.muted' }, x: bx + 24, y: by + 122, width: 300, height: 26, zIndex: 4, editable: { content: true } },
        { id: `m-delta-${i}`, type: 'text', content: c[2], fontFamily: MONO, fontSize: 20, fontWeight: '700', color: { $t: String(c[3]) }, textAlign: 'right', x: bx + 224, y: by + 26, width: 140, height: 26, zIndex: 4, animation: { name: 'zoomIn', duration: 480, delay: 420 + i * 110 }, editable: { content: true } }
      ]
    }).flat() as any,
    // 金色章节分隔线 + 迷你柱状组（四季度营收指数，高低错落）
    { id: 'ar-gold-divider', type: 'shape', shapeKind: 'rect', x: 100, y: 812, width: 800, height: 2.5, fill: { $t: 'colors.primary' }, borderRadius: 1.5, opacity: 0.95, zIndex: 3, animation: { name: 'slideInLeft', duration: 820, delay: 560 } },
    ...[[46, 0.42], [62, 0.56], [54, 0.68], [78, 0.8], [96, 1]].map((b, i) => (
      { id: `ar-bar-${i}`, type: 'shape', shapeKind: 'rect', x: 100 + i * 168, y: 926 - Number(b[0]), width: 96, height: Number(b[0]), fill: { $t: i === 4 ? 'colors.primary' : 'colors.accent' }, opacity: Number(b[1]), borderRadius: 4, zIndex: 3, animation: { name: 'slideUpFade', duration: 640, delay: 700 + i * 90 } }
    )) as any,
    { id: 'ar-source', type: 'text', content: '柱形 · 四季度营收指数（Q1 84 → Q4 128，同口径可比）\n数据来源：麦肯锡全球研究院《2026 产业数智化观察》· 样本 4 800 家企业', fontFamily: MONO, fontSize: 16, color: { $t: 'colors.muted' }, opacity: 0.92, lineHeight: 1.5, x: 100, y: 938, width: 800, height: 44, zIndex: 4, animation: { name: 'fadeIn', duration: 700, delay: 1100 }, editable: { content: true } }
  ]
},
{
  id: 'business-summit-keynote', name: '高峰论坛主视觉', version: '1.0.0', category: 'business', tags: ['business', 'conference', 'summit', 'keynote'],
  thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23FFFFFF"/><rect x="4" y="4" width="36" height="92" fill="%230F2B5C"/><rect x="40" y="4" width="1.6" height="92" fill="%232563EB"/><rect x="7" y="10" width="21" height="17" rx="1" fill="%232563EB"/><rect x="9" y="13" width="9" height="8" fill="%23FFFFFF"/><rect x="9" y="23" width="14" height="2" fill="%23FFFFFF" opacity="0.8"/><g fill="%23CBD5E1"><rect x="48" y="6" width="34" height="0.9"/><rect x="54" y="8" width="28" height="0.9" fill="%232563EB"/></g><rect x="48" y="15" width="38" height="5" fill="%230F172A"/><rect x="48" y="22" width="30" height="5" fill="%230F172A"/><g fill="%2364748B"><rect x="48" y="44" width="7" height="2.4"/><rect x="58" y="44" width="24" height="2.4"/><rect x="48" y="50" width="7" height="2.4"/><rect x="58" y="50" width="22" height="2.4"/><rect x="48" y="56" width="7" height="2.4"/><rect x="58" y="56" width="25" height="2.4"/><rect x="48" y="62" width="7" height="2.4"/><rect x="58" y="62" width="20" height="2.4"/></g><g fill="%23F1F5F9" stroke="%23CBD5E1" stroke-width="0.8"><circle cx="52" cy="78" r="5"/><circle cx="58" cy="80" r="5"/><circle cx="64" cy="78" r="5"/><circle cx="70" cy="80" r="5"/><circle cx="76" cy="78" r="5"/></g><circle cx="82" cy="80" r="5" fill="%232563EB"/></svg>',
  tokens: {
    colors: {
      bg: { label: '背景', default: '#FFFFFF', options: ['#FFFFFF', '#F8FAFC', '#F1F5F9'] },
      primary: { label: '主色', default: '#0F2B5C', options: ['#0F2B5C', '#1E3A8A', '#1E40AF', '#1E293B', '#4C1D95'] },
      accent: { label: '强调色', default: '#2563EB', options: ['#2563EB', '#3B82F6', '#60A5FA', '#0D9488', '#7C3AED'] },
      ink: { label: '主文字', default: '#0F172A', options: ['#0F172A', '#111827', '#1E293B', '#0B1F1A'] },
      paper: { label: '亮面文字', default: '#FFFFFF', options: ['#FFFFFF', '#F8FAFC', '#EFF6FF', '#ECFEFF'] },
      panel: { label: '头像底', default: '#F1F5F9', options: ['#F1F5F9', '#E2E8F0', '#EFF3F6', '#F8FAFC'] },
      line: { label: '细线', default: '#CBD5E1', options: ['#CBD5E1', '#D5D9DF', '#BFDBFE', '#94A3B8'] },
      muted: { label: '次级文字', default: '#64748B', options: ['#64748B', '#6B7280', '#5B7285', '#475569'] }
    },
    fonts: { heading: { label: '标题字体', default: 'Helvetica, Arial, sans-serif', options: ['Helvetica, Arial, sans-serif', 'Inter, sans-serif', 'system-ui'] } }
  },
  presets: [
    { name: '学院藏青', colors: { bg: '#FFFFFF', primary: '#0F2B5C', accent: '#2563EB', ink: '#0F172A', paper: '#FFFFFF', panel: '#F1F5F9', line: '#CBD5E1', muted: '#64748B' } },
    { name: '松墨雅集', colors: { bg: '#F8FAFC', primary: '#1E293B', accent: '#0D9488', ink: '#0F172A', paper: '#F8FAFC', panel: '#F1F5F9', line: '#CBD5E1', muted: '#475569' } },
    { name: '绛紫峰会', colors: { bg: '#FFFFFF', primary: '#4C1D95', accent: '#7C3AED', ink: '#1E1B4B', paper: '#FFFFFF', panel: '#F5F3FF', line: '#DDD6FE', muted: '#6D28D9' } },
    { name: '石墨蓝调', colors: { bg: '#F1F5F9', primary: '#1E3A8A', accent: '#3B82F6', ink: '#111827', paper: '#FFFFFF', panel: '#E2E8F0', line: '#BFDBFE', muted: '#5B7285' } }
  ],
  canvas: { virtualWidth: 1000, virtualHeight: 1000, defaultWidth: 1000, defaultHeight: 1000, backgroundColor: { $t: 'colors.bg' } },
  elements: [
    // 左侧深色主色块 + 日期徽章 + 竖排会名
    { id: 'navy-band', type: 'shape', shapeKind: 'rect', x: 40, y: 40, width: 360, height: 920, fill: { $t: 'colors.primary' }, borderRadius: 4, zIndex: 1, animation: { name: 'fadeIn', duration: 700 } },
    { id: 'accent-strip', type: 'shape', shapeKind: 'rect', x: 400, y: 40, width: 12, height: 920, fill: { $t: 'colors.accent' }, borderRadius: 2, zIndex: 1, animation: { name: 'slideInLeft', duration: 640, delay: 120 } },
    { id: 'date-badge', type: 'shape', shapeKind: 'rect', x: 72, y: 104, width: 232, height: 176, fill: { $t: 'colors.accent' }, borderRadius: 8, zIndex: 3, animation: { name: 'zoomIn', duration: 520, delay: 260 } },
    { id: 'date-day', type: 'text', content: '24', fontFamily: MONO, fontSize: 88, fontWeight: '800', color: { $t: 'colors.paper' }, x: 100, y: 116, width: 180, height: 100, zIndex: 4, editable: { content: true, fontSize: { type: 'range', min: 56, max: 110 } } },
    { id: 'date-mon', type: 'text', content: 'OCT 2026', fontFamily: MONO, fontSize: 26, fontWeight: '700', color: { $t: 'colors.paper' }, letterSpacing: 3, x: 100, y: 216, width: 196, height: 34, zIndex: 4, editable: { content: true } },
    { id: 'summit-label', type: 'text', content: 'LEADERSHIP SUMMIT', fontFamily: { $t: 'fonts.heading' }, fontSize: 26, fontWeight: '900', color: { $t: 'colors.paper' }, rotation: 270, x: 50, y: 430, width: 400, height: 40, zIndex: 3, editable: { content: true, position: true } },
    { id: 'sk-ring', type: 'shape', shapeKind: 'circle', x: 108, y: 700, width: 168, height: 168, border: { color: { $t: 'colors.accent' }, width: 2, style: 'solid' }, opacity: 0.55, zIndex: 2, animation: { name: 'ripple', duration: 4200, iterationCount: 'infinite', easing: 'ease-out' } },
    // 顶部光线装饰（两条递进细线）
    { id: 'sk-ray-0', type: 'shape', shapeKind: 'rect', x: 448, y: 56, width: 512, height: 2, fill: { $t: 'colors.line' }, zIndex: 2 },
    { id: 'sk-ray-1', type: 'shape', shapeKind: 'rect', x: 620, y: 74, width: 340, height: 2, fill: { $t: 'colors.accent' }, opacity: 0.6, borderRadius: 1, zIndex: 2, animation: { name: 'slideInRight', duration: 760, delay: 160 } },
    // 右栏主标题
    { id: 'sk-eyebrow', type: 'text', content: 'THE 12TH GLOBAL LEADERSHIP SUMMIT', fontFamily: MONO, fontSize: 20, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 2, x: 448, y: 100, width: 512, height: 28, zIndex: 4, animation: { name: 'fadeIn', duration: 640, delay: 200 }, editable: { content: true } },
    { id: 'topic-title', type: 'text', content: 'REINVENTING\nTHE FUTURE OF\nCAPITAL.', fontFamily: { $t: 'fonts.heading' }, fontSize: 60, fontWeight: '900', color: { $t: 'colors.ink' }, lineHeight: 1.14, letterSpacing: -1, x: 448, y: 150, width: 512, height: 300, zIndex: 4, animation: { name: 'slideInRight', duration: 700 }, editable: { content: true, fontSize: { type: 'range', min: 44, max: 80 }, position: true } },
    { id: 'date-location', type: 'text', content: '2026.10.24—26 · 新加坡滨海湾展览中心', fontFamily: HEI, fontSize: 22, fontWeight: '700', color: { $t: 'colors.muted' }, x: 448, y: 356, width: 512, height: 34, zIndex: 4, editable: { content: true, position: true } },
    // 右侧议程条 4 行（时间 + 主题交替配色）
    { id: 'sk-agenda-head', type: 'text', content: 'DAY 1 议程速览 · 主论坛', fontFamily: HEI, fontSize: 24, fontWeight: '800', color: { $t: 'colors.ink' }, letterSpacing: 1, x: 448, y: 430, width: 420, height: 30, zIndex: 4, editable: { content: true } },
    ...[['09:30', '开幕主旨：再造资本的配置逻辑'], ['10:45', '圆桌：AI 基础设施的回报周期'], ['14:00', '专场：出海合规与数据跨境实务'], ['16:30', '闭场对话：下一个十年的现金流']].map((r, i) => {
      const y = 486 + i * 60
      return [
        { id: `sk-ag-t-${i}`, type: 'text', content: r[0], fontFamily: MONO, fontSize: 20, fontWeight: '700', color: { $t: i % 2 ? 'colors.primary' : 'colors.accent' }, x: 448, y, width: 96, height: 26, zIndex: 4, animation: { name: 'fadeIn', duration: 520, delay: 480 + i * 110 }, editable: { content: true } },
        { id: `sk-ag-p-${i}`, type: 'text', content: r[1], fontFamily: HEI, fontSize: 22, color: { $t: 'colors.ink' }, opacity: 0.88, x: 556, y: y - 2, width: 404, height: 30, zIndex: 4, animation: { name: 'fadeInUp', duration: 560, delay: 520 + i * 110 }, editable: { content: true } }
      ]
    }).flat() as any,
    // 讲者头像组（5 个占位圆 + 1 个「更多」圆，错位排布）
    { id: 'sk-label', type: 'text', content: '主旨讲者 KEYNOTE SPEAKERS', fontFamily: MONO, fontSize: 18, fontWeight: '700', color: { $t: 'colors.muted' }, letterSpacing: 2, x: 448, y: 742, width: 420, height: 26, zIndex: 4, editable: { content: true } },
    ...Array.from({ length: 5 }, (_, i) => (
      { id: `sk-av-${i}`, type: 'shape', shapeKind: 'circle', x: 448 + i * 62, y: i % 2 ? 800 : 790, width: 92, height: 92, fill: { $t: 'colors.panel' }, border: { color: { $t: 'colors.line' }, width: 2, style: 'solid' }, zIndex: 3, animation: { name: 'zoomIn', duration: 460, delay: 900 + i * 90 } }
    )) as any,
    { id: 'sk-av-more', type: 'shape', shapeKind: 'circle', x: 758, y: 800, width: 92, height: 92, fill: { $t: 'colors.accent' }, opacity: 0.95, zIndex: 3, animation: { name: 'zoomIn', duration: 460, delay: 1340 } },
    { id: 'sk-av-more-t', type: 'text', content: '+9', fontFamily: MONO, fontSize: 24, fontWeight: '700', color: { $t: 'colors.paper' }, textAlign: 'center', x: 758, y: 830, width: 92, height: 30, zIndex: 4 },
    // 主办 / 协办署名两行
    { id: 'sk-host', type: 'text', content: '主办：全球产业研究院（GII）\n协办：亚洲金融联盟 · 数智产业研究院 · 出海服务局', fontFamily: HEI, fontSize: 18, color: { $t: 'colors.muted' }, lineHeight: 1.6, x: 448, y: 912, width: 512, height: 58, zIndex: 4, animation: { name: 'fadeIn', duration: 700, delay: 1400 }, editable: { content: true } }
  ]
},
  {
    id: 'business-product-poster', name: '产品形象海报 (9:16)', version: '1.0.0', category: 'business',
    tags: ['business', 'product', 'photo', 'poster'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="178" viewBox="0 0 100 178"><rect width="100" height="178" fill="%23020617"/><rect x="0" y="0" width="100" height="178" fill="%23334155" opacity="0.55"/><g stroke="%23FFFFFF" stroke-width="0.4" opacity="0.18"><path d="M0 20 H100 M0 40 H100 M0 60 H100 M0 80 H100"/><path d="M20 0 V100 M40 0 V100 M60 0 V100 M80 0 V100"/></g><circle cx="52" cy="82" r="30" fill="%23F59E0B" opacity="0.10"/><circle cx="52" cy="82" r="19" fill="%23F59E0B" opacity="0.14"/><circle cx="52" cy="82" r="10" fill="%23F59E0B" opacity="0.2"/><rect x="33" y="105" width="38" height="2.4" rx="1.2" fill="%23020617" opacity="0.6"/><g fill="%230B1220" stroke="%23334155" stroke-width="0.5"><rect x="7" y="36" width="28" height="12" rx="2.4"/><rect x="7" y="50" width="28" height="12" rx="2.4"/><rect x="7" y="64" width="28" height="12" rx="2.4"/></g><g fill="%23FFFFFF"><rect x="10" y="39" width="12" height="3.4"/><rect x="10" y="53" width="15" height="3.4"/><rect x="10" y="67" width="10" height="3.4"/></g><g fill="%2394A3B8"><rect x="10" y="44" width="20" height="1.6"/><rect x="10" y="58" width="21" height="1.6"/><rect x="10" y="72" width="22" height="1.6"/></g><rect x="64" y="9" width="28" height="5" rx="2.5" fill="%230B1220" opacity="0.8" stroke="%23334155" stroke-width="0.5"/><rect x="7" y="120" width="20" height="1.6" fill="%23F59E0B"/><rect x="7" y="124" width="56" height="6" fill="%23FFFFFF"/><rect x="7" y="133" width="46" height="6" fill="%23FFFFFF" opacity="0.85"/><rect x="7" y="145" width="40" height="3" fill="%23E2E8F0" opacity="0.7"/><rect x="7" y="166" width="86" height="0.6" fill="%23334155"/><rect x="7" y="169" width="38" height="2.2" fill="%2394A3B8"/><rect x="72" y="169" width="21" height="2.2" fill="%23FFFFFF" opacity="0.8"/></svg>',
    tokens: {
      colors: {
        accent: { label: '强调色', default: '#F59E0B', options: ['#F59E0B', '#3B82F6', '#10B981', '#EF4444'] },
        ink: { label: '主文字', default: '#FFFFFF', options: ['#FFFFFF', '#F8FAFC', '#FDF4E3', '#E2E8F0'] },
        muted: { label: '次级文字', default: '#94A3B8', options: ['#94A3B8', '#A8B2C1', '#8FB3A7', '#D6C7A1'] },
        scrim: { label: '遮罩底', default: '#020617', options: ['#020617', '#0B132B', '#0F172A', '#0B1F1A', '#1A1204'] },
        card: { label: '徽章卡面', default: '#0B1220', options: ['#0B1220', '#111827', '#0F172A', '#12332B', '#1B1408'] },
        line: { label: '细线', default: '#334155', options: ['#334155', '#475569', '#1F5C4A', '#4C4494', '#57534E'] }
      },
      fonts: { heading: { label: '标题字体', default: 'Helvetica, Arial, sans-serif', options: ['Helvetica, Arial, sans-serif', 'Georgia, serif', 'Impact, sans-serif'] } }
    },
    presets: [
      { name: '琥珀流光', colors: { accent: '#F59E0B', ink: '#FFFFFF', muted: '#D6C7A1', scrim: '#1A1204', card: '#221806', line: '#5B4A22' } },
      { name: '天际蓝调', colors: { accent: '#3B82F6', ink: '#F8FAFC', muted: '#A8B2C1', scrim: '#0B132B', card: '#0F1C33', line: '#334155' } },
      { name: '翡翠清新', colors: { accent: '#10B981', ink: '#FFFFFF', muted: '#8FB3A7', scrim: '#0B1F1A', card: '#12332B', line: '#1F5C4A' } },
      { name: '热情赤焰', colors: { accent: '#EF4444', ink: '#FFFFFF', muted: '#D0A5A5', scrim: '#1A0B0B', card: '#2A1212', line: '#5C2B2B' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1920, defaultWidth: 1080, defaultHeight: 1920, backgroundColor: { $t: 'colors.scrim' } },
    elements: [
      // 满版照片 + 上下遮罩 + 细网格纹理层
      {
        id: 'hero-photo', type: 'image', anchor: 'top-left',
        src: '/images/photo/photo-1506905925346-21bda4d32df4.jpg',
        x: 0, y: 0, width: 1080, height: 1920, objectFit: 'cover', objectPosition: 'center', zIndex: 1,
        editable: { src: { type: 'upload' }, position: true, size: { type: 'scale', min: 0.5, max: 2 } }
      },
      { id: 'hero-shade', type: 'overlay', anchor: 'top-left', background: 'linear-gradient(180deg, rgba(2,6,23,0) 30%, rgba(2,6,23,0.58) 62%, rgba(2,6,23,0.94) 100%)', x: 0, y: 0, width: 1080, height: 1920, zIndex: 2 },
      { id: 'pp-top-shade', type: 'overlay', anchor: 'top-left', background: 'linear-gradient(180deg, rgba(2,6,23,0.8) 0%, rgba(2,6,23,0.34) 15%, rgba(2,6,23,0) 34%)', x: 0, y: 0, width: 1080, height: 1920, zIndex: 2 },
      { id: 'pp-grid', type: 'image', anchor: 'top-left', src: gridUri(1080, 1920, 72, 'rgba(255,255,255,0.12)'), x: 0, y: 0, width: 1080, height: 1920, objectFit: 'fill', opacity: 0.5, zIndex: 3 },
      // 产品区光晕圆盘（三环递进）+ 底座投影
      { id: 'pp-glow-0', group: 'pp-glow-', type: 'shape', shapeKind: 'circle', anchor: 'top-left', x: 230, y: 550, width: 660, height: 660, fill: { $t: 'colors.accent' }, opacity: 0.07, zIndex: 4, animation: { name: 'fadeIn', duration: 1100, delay: 120 } },
      { id: 'pp-glow-1', group: 'pp-glow-', type: 'shape', shapeKind: 'circle', anchor: 'top-left', x: 340, y: 660, width: 440, height: 440, fill: { $t: 'colors.accent' }, opacity: 0.1, zIndex: 4, animation: { name: 'zoomIn', duration: 900, delay: 240 } },
      { id: 'pp-glow-2', group: 'pp-glow-', type: 'shape', shapeKind: 'circle', anchor: 'top-left', x: 430, y: 750, width: 260, height: 260, fill: { $t: 'colors.accent' }, opacity: 0.16, zIndex: 4, animation: { name: 'zoomIn', duration: 800, delay: 360 } },
      { id: 'pp-base', type: 'shape', shapeKind: 'rect', anchor: 'top-left', x: 352, y: 1132, width: 416, height: 28, fill: { $t: 'colors.scrim' }, opacity: 0.6, borderRadius: 14, zIndex: 4, animation: { name: 'fadeIn', duration: 760, delay: 420 } },
      // 左侧三枚参数徽章卡
      ...[['20 L', '主仓容量 · 含顶袋'], ['1 280 g', '整包自重 · 不含水袋'], ['IPX6', '面料防护 · 1 000 mm']].map((b, i) => {
        const y = 392 + i * 148
        return [
          { id: `pp-badge-${i}`, type: 'shape', shapeKind: 'rect', anchor: 'top-left', x: 80, y, width: 300, height: 132, fill: { $t: 'colors.card' }, opacity: 0.84, borderRadius: 14, border: { color: { $t: 'colors.line' }, width: 1, style: 'solid' }, zIndex: 5, animation: { name: 'slideInLeft', duration: 640, delay: 300 + i * 150 } },
          { id: `pp-badge-v-${i}`, type: 'text', anchor: 'top-left', content: b[0], fontFamily: MONO, fontSize: 46, fontWeight: '800', color: { $t: 'colors.ink' }, x: 112, y: y + 24, width: 240, height: 56, zIndex: 6, editable: { content: true, fontSize: { type: 'range', min: 30, max: 60 } } },
          { id: `pp-badge-l-${i}`, type: 'text', anchor: 'top-left', content: b[1], fontFamily: HEI, fontSize: 22, color: { $t: 'colors.muted' }, letterSpacing: 1, x: 112, y: y + 84, width: 240, height: 28, zIndex: 6, editable: { content: true } }
        ]
      }).flat() as any,
      // 右上刊期角标
      { id: 'pp-issue-bg', type: 'shape', shapeKind: 'rect', anchor: 'top-left', x: 700, y: 96, width: 300, height: 54, fill: { $t: 'colors.card' }, opacity: 0.82, borderRadius: 27, border: { color: { $t: 'colors.line' }, width: 1, style: 'solid' }, zIndex: 5, animation: { name: 'fadeInDown', duration: 620, delay: 160 } },
      { id: 'pp-issue-t', type: 'text', anchor: 'top-left', content: 'VOL.24 · 2026 春季装备特辑', fontFamily: MONO, fontSize: 20, fontWeight: '700', color: { $t: 'colors.muted' }, letterSpacing: 1.5, textAlign: 'center', lineHeight: 2.7, x: 700, y: 96, width: 300, height: 54, zIndex: 6, editable: { content: true } },
      // 主文案区（slogan 分隔细线 + 三行字）
      { id: 'pp-rule', type: 'shape', shapeKind: 'rect', anchor: 'top-left', x: 80, y: 1258, width: 220, height: 3, fill: { $t: 'colors.accent' }, borderRadius: 2, zIndex: 5, animation: { name: 'slideInLeft', duration: 700, delay: 520 } },
      { id: 'hero-kicker', type: 'text', anchor: 'top-left', content: 'NEW ARRIVAL · 山野系列 04', fontFamily: { $t: 'fonts.heading' }, fontSize: 34, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 8, x: 80, y: 1300, width: 920, height: 60, zIndex: 6, editable: { content: true } },
      { id: 'hero-title', type: 'text', anchor: 'top-left', content: '山河远阔\n人间烟火', fontFamily: { $t: 'fonts.heading' }, fontSize: 96, fontWeight: '900', color: { $t: 'colors.ink' }, lineHeight: 1.18, x: 80, y: 1390, width: 920, height: 260, zIndex: 7, animation: { name: 'fadeInUp', duration: 800 }, editable: { content: true, fontSize: { type: 'range', min: 60, max: 140 }, position: true } },
      { id: 'hero-sub', type: 'text', anchor: 'top-left', content: '把每一次出发，都活成风景。', fontFamily: HEI, fontSize: 30, color: { $t: 'colors.muted' }, x: 80, y: 1700, width: 920, height: 70, zIndex: 6, editable: { content: true } },
      // 底部署名栏 + 页码
      { id: 'pp-foot-rule', type: 'shape', shapeKind: 'rect', anchor: 'top-left', x: 80, y: 1800, width: 920, height: 1, fill: { $t: 'colors.line' }, zIndex: 5 },
      { id: 'pp-foot-name', type: 'text', anchor: 'top-left', content: '摄影 / 山野系列 · 四姑娘山 大峰 4 504 m', fontFamily: MONO, fontSize: 20, color: { $t: 'colors.muted' }, letterSpacing: 1, x: 80, y: 1822, width: 620, height: 30, zIndex: 6, editable: { content: true } },
      { id: 'pp-foot-page', type: 'text', anchor: 'top-left', content: '01 / 12', fontFamily: MONO, fontSize: 20, fontWeight: '700', color: { $t: 'colors.ink' }, letterSpacing: 3, textAlign: 'right', x: 700, y: 1822, width: 300, height: 30, zIndex: 6, editable: { content: true } }
    ]
  },
  {
    id: 'business-team-card', name: '团队介绍卡片 (1:1)', version: '1.0.0', category: 'business',
    tags: ['business', 'team', 'photo', 'card'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%230F172A"/><rect x="4" y="4" width="92" height="92" rx="2" fill="%230B1220" stroke="%23334155" stroke-width="0.6"/><rect x="4" y="4" width="92" height="47" rx="2" fill="%23475569"/><circle cx="84" cy="46" r="6" fill="%230B1220" stroke="%2338BDF8" stroke-width="0.8"/><rect x="8" y="56" width="12" height="1.4" fill="%2338BDF8"/><rect x="8" y="59" width="30" height="5" fill="%23FFFFFF"/><rect x="8" y="66" width="42" height="2" fill="%2394A3B8"/><rect x="8" y="72" width="84" height="0.5" fill="%23334155"/><g fill="%231E293B" stroke="%23334155" stroke-width="0.5"><rect x="8" y="75" width="27" height="14" rx="1.4"/><rect x="37" y="75" width="27" height="14" rx="1.4"/><rect x="66" y="75" width="27" height="14" rx="1.4"/></g><g fill="%23243449" stroke="%23334155" stroke-width="0.5"><circle cx="14" cy="82" r="3.6"/><circle cx="43" cy="82" r="3.6"/><circle cx="72" cy="82" r="3.6"/></g><g fill="%23FFFFFF"><rect x="20" y="79" width="9" height="2"/><rect x="49" y="79" width="9" height="2"/><rect x="78" y="79" width="9" height="2"/></g><g fill="%2394A3B8"><rect x="20" y="83" width="12" height="1.4"/><rect x="49" y="83" width="12" height="1.4"/><rect x="78" y="83" width="12" height="1.4"/></g><rect x="8" y="92" width="84" height="0.5" fill="%23334155"/><rect x="8" y="94" width="34" height="1.8" fill="%2394A3B8"/><rect x="72" y="94" width="20" height="1.8" fill="%2338BDF8"/></svg>',
    tokens: {
      colors: {
        accent: { label: '强调色', default: '#38BDF8', options: ['#38BDF8', '#F59E0B', '#10B981', '#A78BFA'] },
        ink: { label: '主文字', default: '#FFFFFF', options: ['#FFFFFF', '#F8FAFC', '#FEF3C7', '#E0F2FE'] },
        muted: { label: '次级文字', default: '#94A3B8', options: ['#94A3B8', '#A8B2C1', '#8FB3A7', '#C4B5FD'] },
        scrim: { label: '卡底', default: '#0F172A', options: ['#0F172A', '#0B132B', '#0B1F1A', '#1E1B4B', '#020617'] },
        card: { label: '成员卡面', default: '#1E293B', options: ['#1E293B', '#1C2541', '#12332B', '#2B2765'] },
        panel: { label: '头像底', default: '#243449', options: ['#243449', '#334155', '#1F5C4A', '#4C4494'] },
        line: { label: '细线', default: '#334155', options: ['#334155', '#475569', '#1F5C4A', '#4C4494'] }
      },
      fonts: { heading: { label: '标题字体', default: 'Helvetica, Arial, sans-serif', options: ['Helvetica, Arial, sans-serif', 'Georgia, serif', 'system-ui'] } }
    },
    presets: [
      { name: '晴空蓝', colors: { accent: '#38BDF8', ink: '#FFFFFF', muted: '#94A3B8', scrim: '#0F172A', card: '#1E293B', panel: '#243449', line: '#334155' } },
      { name: '琥珀金', colors: { accent: '#F59E0B', ink: '#FEF3C7', muted: '#D6C7A1', scrim: '#1A1204', card: '#2A1F0B', panel: '#3B2C10', line: '#5B4A22' } },
      { name: '翡翠绿', colors: { accent: '#10B981', ink: '#FFFFFF', muted: '#8FB3A7', scrim: '#0B1F1A', card: '#12332B', panel: '#1A4A3C', line: '#1F5C4A' } },
      { name: '魅影紫', colors: { accent: '#A78BFA', ink: '#F8FAFC', muted: '#A5A0D0', scrim: '#1E1B4B', card: '#2B2765', panel: '#3A3480', line: '#4C4494' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1080, defaultWidth: 1080, defaultHeight: 1080, backgroundColor: { $t: 'colors.scrim' } },
    elements: [
      // 卡面 + 满宽照片 + 点阵纹理
      { id: 'team-band', type: 'shape', shapeKind: 'rect', anchor: 'top-left', x: 40, y: 40, width: 1000, height: 1000, fill: { $t: 'colors.scrim' }, borderRadius: 20, border: { color: { $t: 'colors.line' }, width: 1, style: 'solid' }, zIndex: 1, animation: { name: 'fadeIn', duration: 700 } },
      {
        id: 'team-photo', type: 'image', anchor: 'top-left',
        src: '/images/photo/photo-1522071820081-009f0129c71c.jpg',
        x: 40, y: 40, width: 1000, height: 520, objectFit: 'cover', objectPosition: 'center 30%', borderRadius: 20, zIndex: 2,
        editable: { src: { type: 'upload' }, position: true, size: { type: 'scale', min: 0.5, max: 2 } }
      },
      { id: 'tc-photo-shade', type: 'overlay', anchor: 'top-left', background: 'linear-gradient(180deg, rgba(15,23,42,0) 52%, rgba(15,23,42,0.86) 100%)', x: 40, y: 40, width: 1000, height: 520, borderRadius: 20, zIndex: 3 },
      { id: 'tc-dots', type: 'image', anchor: 'top-left', src: dotsBg(1000, 480, 46, 'rgba(255,255,255,0.09)'), x: 40, y: 560, width: 1000, height: 480, objectFit: 'fill', borderRadius: 20, opacity: 0.7, zIndex: 2 },
      // 团队 logo 角（圆环 + 缩写）压在照片下沿
      { id: 'tc-logo-ring', type: 'shape', shapeKind: 'circle', anchor: 'top-left', x: 896, y: 452, width: 120, height: 120, fill: { $t: 'colors.scrim' }, opacity: 0.9, border: { color: { $t: 'colors.accent' }, width: 2, style: 'solid' }, zIndex: 4, animation: { name: 'zoomIn', duration: 560, delay: 420 } },
      { id: 'tc-logo-t', type: 'text', anchor: 'top-left', content: 'XY', fontFamily: MONO, fontSize: 30, fontWeight: '800', color: { $t: 'colors.accent' }, letterSpacing: 2, textAlign: 'center', lineHeight: 4, x: 896, y: 452, width: 120, height: 120, zIndex: 5, editable: { content: true } },
      // 标题区
      { id: 'team-accent', type: 'shape', shapeKind: 'rect', anchor: 'top-left', x: 88, y: 604, width: 120, height: 4, fill: { $t: 'colors.accent' }, borderRadius: 2, zIndex: 4, animation: { name: 'slideInLeft', duration: 650, delay: 240 }, editable: { position: true } },
      { id: 'team-title', type: 'text', anchor: 'top-left', content: 'OUR TEAM', fontFamily: { $t: 'fonts.heading' }, fontSize: 54, fontWeight: '900', color: { $t: 'colors.ink' }, letterSpacing: 4, x: 88, y: 620, width: 700, height: 66, zIndex: 4, animation: { name: 'fadeInUp', duration: 800, delay: 120 }, editable: { content: true, fontSize: { type: 'range', min: 40, max: 80 }, position: true } },
      { id: 'team-desc', type: 'text', anchor: 'top-left', content: '我们相信，最好的作品来自一群认真的人。', fontFamily: HEI, fontSize: 22, color: { $t: 'colors.muted' }, x: 88, y: 692, width: 860, height: 32, zIndex: 4, animation: { name: 'fadeIn', duration: 800, delay: 400 }, editable: { content: true, position: true } },
      // 职位分区线 + 三张成员卡（头像圆 / 姓名 / 职位）
      { id: 'tc-divider', type: 'shape', shapeKind: 'rect', anchor: 'top-left', x: 88, y: 742, width: 904, height: 1.5, fill: { $t: 'colors.line' }, zIndex: 4, animation: { name: 'slideInLeft', duration: 760, delay: 480 } },
      ...[['沈知远', '创意总监 · 品牌组'], ['陆一鸣', '技术负责人 · 前端'], ['何予安', '产品负责人 · 增长']].map((m, i) => {
        const x = 88 + i * 308
        return [
          { id: `tc-m-card-${i}`, type: 'shape', shapeKind: 'rect', anchor: 'top-left', x, y: 762, width: 288, height: 152, fill: { $t: 'colors.card' }, opacity: 0.92, borderRadius: 12, border: { color: { $t: 'colors.line' }, width: 1, style: 'solid' }, zIndex: 4, animation: { name: 'fadeInUp', duration: 620, delay: 560 + i * 130 } },
          { id: `tc-m-avatar-${i}`, type: 'shape', shapeKind: 'circle', anchor: 'top-left', x: x + 20, y: 798, width: 80, height: 80, fill: { $t: 'colors.panel' }, border: { color: { $t: i === 0 ? 'colors.accent' : 'colors.line' }, width: 2, style: 'solid' }, zIndex: 5, animation: { name: 'zoomIn', duration: 480, delay: 640 + i * 130 } },
          { id: `tc-m-name-${i}`, type: 'text', anchor: 'top-left', content: m[0], fontFamily: HEI, fontSize: 26, fontWeight: '700', color: { $t: 'colors.ink' }, x: x + 120, y: 806, width: 156, height: 30, zIndex: 5, editable: { content: true } },
          { id: `tc-m-role-${i}`, type: 'text', anchor: 'top-left', content: m[1], fontFamily: HEI, fontSize: 18, color: { $t: 'colors.muted' }, x: x + 120, y: 840, width: 156, height: 26, zIndex: 5, editable: { content: true } }
        ]
      }).flat() as any,
      // 署名栏
      { id: 'tc-foot-rule', type: 'shape', shapeKind: 'rect', anchor: 'top-left', x: 88, y: 948, width: 904, height: 1, fill: { $t: 'colors.line' }, zIndex: 4 },
      { id: 'tc-foot-l', type: 'text', anchor: 'top-left', content: '设计中心 / 星野创新 · 上海 静安', fontFamily: MONO, fontSize: 20, color: { $t: 'colors.muted' }, letterSpacing: 1, x: 88, y: 966, width: 600, height: 28, zIndex: 5, editable: { content: true } },
      { id: 'tc-foot-r', type: 'text', anchor: 'top-left', content: 'EST. 2016 · 全员 34 人', fontFamily: MONO, fontSize: 20, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 1, textAlign: 'right', x: 704, y: 966, width: 288, height: 28, zIndex: 5, editable: { content: true } }
    ]
  }
]

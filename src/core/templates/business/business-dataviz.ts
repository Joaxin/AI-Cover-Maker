// src/core/templates/business/business-dataviz.ts —— 数据·说明图批（商务风 3 个，高信息密度）
// 口径：表格/柱状/环形/路线全用 rect+circle 拼，颜色走 token；中性线稿才允许写死墨白；竖线用细长 rect；seeded 本地归一化。
import type { Template } from '@/types/types'
import {MONO, SANS, SERIF, HEI, grain} from '../_fx/trend'
import { seeded01, svgUri } from '../_fx/common'

const seeded = seeded01

const KAITI = 'STKaiti, KaiTi, "Kaiti SC", serif'

/** 归一化伪随机：返回 0..1（trend 里的 seeded 是原始整数，别混用） */

/** 等高线示意（952×600）：只用中性白墨，叠在任何底图上都读得出来 */
const CONTOUR_URI = svgUri(`
<g fill="none" stroke="%23FFFFFF" stroke-linecap="round">
  <path d="M-20 520 C 120 470 190 512 300 448 C 410 384 452 430 560 366 C 668 302 742 344 852 268 C 918 224 952 244 992 206" stroke-width="2.4" opacity="0.5"/>
  <path d="M-20 566 C 130 516 206 556 320 490 C 434 424 470 470 582 404 C 694 338 760 380 866 306 C 926 264 960 282 992 250" stroke-width="1.6" opacity="0.34"/>
  <path d="M-20 468 C 110 424 180 462 286 402 C 392 342 438 386 540 324 C 642 262 720 302 826 230 C 890 190 924 206 992 168" stroke-width="1.6" opacity="0.34"/>
  <path d="M-20 412 C 104 372 168 408 268 350 C 368 292 416 334 512 274 C 608 214 690 252 792 184 C 856 146 894 158 992 122" stroke-width="1.2" opacity="0.24"/>
  <path d="M-20 350 C 96 314 156 348 250 292 C 344 236 396 274 486 216 C 576 158 662 192 758 128 C 826 84 866 94 992 60" stroke-width="1.2" opacity="0.24"/>
  <path d="M420 620 C 520 540 600 560 700 470" stroke-width="1.2" stroke-dasharray="10 12" opacity="0.3"/>
  <path d="M120 610 C 240 560 300 574 420 520" stroke-width="1.2" stroke-dasharray="6 10" opacity="0.26"/>
</g>`, 952, 600)

export const businessDatavizTemplates: Template[] = [
  // 1. 规格对比表（1:1）—— 三列横评 + 高亮胜出行 + 斑马格 + 结论条
  {
    id: 'business-spec-compare', name: '规格对比表', version: '1.0.0', category: 'business',
    tags: ['business', 'compare', 'spec', 'table', 'review', '1:1'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23F4F5F7"/><rect x="8" y="10" width="84" height="3" fill="%231F3A5F"/><rect x="8" y="18" width="40" height="6" fill="%231F2937"/><rect x="36" y="30" width="28" height="56" fill="%231F3A5F" opacity="0.09"/><g fill="%231F2937" opacity="0.16"><rect x="8" y="34" width="84" height="1"/><rect x="8" y="46" width="84" height="1"/><rect x="8" y="58" width="84" height="1"/><rect x="8" y="70" width="84" height="1"/><rect x="8" y="82" width="84" height="1"/></g><g fill="%231F2937" opacity="0.55"><rect x="10" y="38" width="18" height="3" rx="1.5"/><rect x="10" y="50" width="16" height="3" rx="1.5"/><rect x="10" y="62" width="19" height="3" rx="1.5"/><rect x="70" y="38" width="16" height="3" rx="1.5"/><rect x="70" y="50" width="18" height="3" rx="1.5"/></g><g fill="%231F3A5F"><rect x="42" y="38" width="16" height="3" rx="1.5"/><rect x="42" y="50" width="14" height="3" rx="1.5"/><rect x="42" y="62" width="17" height="3" rx="1.5"/></g></svg>',
    tokens: {
      colors: {
        bg: { label: '表底', default: '#F4F5F7', options: ['#F4F5F7', '#FBFAF7', '#EFF3F6', '#F6F1EC'] },
        card: { label: '斑马格', default: '#FFFFFF', options: ['#FFFFFF', '#FBFBFC', '#F7F4EE', '#EDF1F4'] },
        ink: { label: '主字', default: '#1F2937', options: ['#1F2937', '#111827', '#2B2422', '#15202B'] },
        muted: { label: '次级字', default: '#6B7280', options: ['#6B7280', '#64748B', '#8A7B6C', '#5B7285'] },
        line: { label: '分栏线', default: '#D5D9DF', options: ['#D5D9DF', '#CBD5E1', '#DBD2C6', '#C7D3DC'] },
        accent: { label: '胜出列', default: '#1F3A5F', options: ['#1F3A5F', '#0F766E', '#7C2D12', '#4338CA'] },
        accent2: { label: '点缀色', default: '#B45309', options: ['#B45309', '#BE123C', '#1D4ED8', '#4D7C0F'] }
      },
      fonts: { heading: { label: '标题字体', default: HEI, options: [HEI, SANS, SERIF, MONO] } }
    },
    presets: [
      { name: '藏蓝测评', colors: { bg: '#F4F5F7', card: '#FFFFFF', ink: '#1F2937', muted: '#6B7280', line: '#D5D9DF', accent: '#1F3A5F', accent2: '#B45309' } },
      { name: '松青清单', colors: { bg: '#EFF3F6', card: '#FBFBFC', ink: '#111827', muted: '#64748B', line: '#CBD5E1', accent: '#0F766E', accent2: '#1D4ED8' } },
      { name: '米纸手帐', colors: { bg: '#F6F1EC', card: '#F7F4EE', ink: '#2B2422', muted: '#8A7B6C', line: '#DBD2C6', accent: '#7C2D12', accent2: '#4D7C0F' } },
      { name: '墨青榜单', colors: { bg: '#FBFAF7', card: '#EDF1F4', ink: '#15202B', muted: '#5B7285', line: '#C7D3DC', accent: '#4338CA', accent2: '#BE123C' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1080, defaultWidth: 1080, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      // 表头
      { id: 'sc-bar', type: 'shape', shapeKind: 'rect', x: 64, y: 56, width: 952, height: 4, fill: { $t: 'colors.accent' }, zIndex: 3, animation: { name: 'slideInLeft', duration: 700 } },
      { id: 'sc-kicker', type: 'text', content: 'SPEC COMPARISON · 三台入门机型横评', fontFamily: MONO, fontSize: 18, color: { $t: 'colors.accent' }, letterSpacing: 5, x: 64, y: 76, width: 700, height: 26, zIndex: 4, editable: { content: true } },
      { id: 'sc-title', type: 'text', content: '哪一台值得放进清单', fontFamily: { $t: 'fonts.heading' }, fontSize: 54, fontWeight: '900', color: { $t: 'colors.ink' }, letterSpacing: 1, x: 62, y: 106, width: 956, height: 68, zIndex: 4, animation: { name: 'inkReveal', duration: 1000 }, editable: { content: true, fontSize: { type: 'range', min: 34, max: 72 }, position: true } },
      { id: 'sc-sub', type: 'text', content: '同一间办公室、同一套测试脚本，连续两周记录。', fontFamily: HEI, fontSize: 22, color: { $t: 'colors.ink' }, opacity: 0.6, x: 64, y: 184, width: 620, height: 32, zIndex: 4, animation: { name: 'fadeIn', duration: 700, delay: 420 }, editable: { content: true, fontSize: { type: 'range', min: 16, max: 30 } } },
      { id: 'sc-legend', type: 'text', content: '✓ 具备　— 没有　▲ 明显占优', fontFamily: MONO, fontSize: 18, color: { $t: 'colors.muted' }, textAlign: 'right', x: 700, y: 188, width: 316, height: 26, zIndex: 4 },
      // 胜出列底纹（贯穿整张表）
      { id: 'sc-hl', type: 'shape', shapeKind: 'rect', x: 536, y: 232, width: 240, height: 668, fill: { $t: 'colors.accent' }, opacity: 0.07, borderRadius: 8, zIndex: 2, animation: { name: 'fadeIn', duration: 800, delay: 260 } },
      { id: 'sc-hl-bar', type: 'shape', shapeKind: 'rect', x: 536, y: 232, width: 240, height: 5, fill: { $t: 'colors.accent' }, borderRadius: 2, zIndex: 3, animation: { name: 'zoomIn', duration: 600, delay: 320 } },
      // 三列表头：实物图 + 名称 + 价格
      ...[['/images/photo/spec-laptop-a-400x240.jpg', '轻work 13', '￥4 299'], ['/images/photo/spec-laptop-b-400x240.jpg', '折光 14 Pro', '￥5 199'], ['/images/photo/spec-laptop-c-400x240.jpg', '小钢炮 S', '￥3 699']].map((c, i) => {
        const x = 296 + i * 240
        return [
          { id: `sc-photo-${i}`, type: 'image', src: c[0], objectFit: 'cover', x: x + 20, y: 248, width: 200, height: 120, borderRadius: 6, zIndex: 4, animation: { name: 'fadeInUp', duration: 700, delay: 120 + i * 130 }, editable: { src: { type: 'upload' }, position: true } },
          { id: `sc-name-${i}`, type: 'text', content: c[1], fontFamily: { $t: 'fonts.heading' } as any, fontSize: 28, fontWeight: '800', color: i === 1 ? { $t: 'colors.accent' } as any : ({ $t: 'colors.ink' } as any), textAlign: 'center', x: x + 8, y: 380, width: 224, height: 36, zIndex: 4, editable: { content: true } },
          { id: `sc-price-${i}`, type: 'text', content: c[2], fontFamily: MONO, fontSize: 22, color: { $t: 'colors.muted' } as any, textAlign: 'center', x: x + 8, y: 418, width: 224, height: 30, zIndex: 4, editable: { content: true } }
        ]
      }).flat() as any,
      { id: 'sc-div', type: 'shape', shapeKind: 'rect', x: 64, y: 460, width: 952, height: 2, fill: { $t: 'colors.ink' }, opacity: 0.24, zIndex: 4 },
      // 六行规格（斑马格 + 分栏线 + 类目名 + 三格取值）
      ...[['续航（实测）', '11 小时', '18 小时 ▲', '9 小时'], ['快充功率', '30 W', '65 W ▲', '20 W'], ['整机重量', '1.24 kg', '1.11 kg', '0.98 kg ▲'], ['接口数量', 'USB-C ×2', 'USB-C ×3 ▲', 'USB-C ×1'], ['屏幕色域', 'sRGB', 'P3 ▲', 'sRGB'], ['背光键盘', '—', '✓', '✓']].map((r, i) => {
        const y = 476 + i * 68
        return [
          i % 2 === 0 ? { id: `sc-zebra-${i}`, type: 'shape', shapeKind: 'rect', x: 64, y, width: 952, height: 68, fill: { $t: 'colors.card' }, opacity: 0.85, zIndex: 2 } : null,
          { id: `sc-rowline-${i}`, type: 'shape', shapeKind: 'rect', x: 64, y: y + 67, width: 952, height: 1.5, fill: { $t: 'colors.line' }, zIndex: 3 },
          { id: `sc-label-${i}`, type: 'text', content: r[0], fontFamily: HEI, fontSize: 22, color: { $t: 'colors.ink' } as any, opacity: 0.78, x: 64, y: y + 18, width: 232, height: 32, zIndex: 4, animation: { name: 'fadeIn', duration: 500, delay: 500 + i * 90 }, editable: { content: true } },
          ...[0, 1, 2].map(k => (
            { id: `sc-cell-${i}-${k}`, type: 'text', content: r[1 + k] as string, fontFamily: k === 1 ? MONO : HEI, fontSize: 22, fontWeight: k === 1 ? '700' : '400', color: k === 1 ? { $t: 'colors.accent' } as any : ({ $t: 'colors.muted' } as any), textAlign: 'center', x: 304 + k * 240, y: y + 18, width: 224, height: 32, zIndex: 4, animation: { name: 'fadeInUp', duration: 460, delay: 560 + i * 90 + k * 60 }, editable: { content: true } }
          ))
        ].filter(Boolean)
      }).flat() as any,
      // 结论条
      { id: 'sc-end', type: 'shape', shapeKind: 'rect', x: 64, y: 906, width: 952, height: 86, fill: { $t: 'colors.ink' }, opacity: 0.06, borderRadius: 8, zIndex: 2, animation: { name: 'slideUpFade', duration: 700, delay: 1200 } },
      { id: 'sc-end-tag', type: 'text', content: '结论', fontFamily: KAITI, fontSize: 22, fontWeight: '700', color: { $t: 'colors.accent2' }, letterSpacing: 3, x: 88, y: 936, width: 84, height: 28, zIndex: 4 },
      { id: 'sc-end-t', type: 'text', content: '多花 900 元买续航和色域，其余两项可用外设补齐。', fontFamily: { $t: 'fonts.heading' }, fontSize: 28, fontWeight: '700', color: { $t: 'colors.ink' }, x: 184, y: 920, width: 812, height: 36, zIndex: 4, animation: { name: 'fadeInUp', duration: 700, delay: 1320 }, editable: { content: true, fontSize: { type: 'range', min: 20, max: 38 } } },
      { id: 'sc-end-b', type: 'text', content: '测试环境 25 ℃ / 屏幕 50% 亮度 / Wi-Fi 常连；样本各 2 台。', fontFamily: MONO, fontSize: 18, color: { $t: 'colors.muted' }, x: 184, y: 958, width: 812, height: 26, zIndex: 4, editable: { content: true } },
      { id: 'sc-foot-l', type: 'text', content: '测评 / 采购清单 Vol.12　·　2026 年 3 月', fontFamily: MONO, fontSize: 18, color: { $t: 'colors.muted' }, opacity: 0.8, x: 64, y: 1016, width: 620, height: 26, zIndex: 4 },
      { id: 'sc-foot-r', type: 'text', content: '03 MODELS', fontFamily: MONO, fontSize: 18, color: { $t: 'colors.accent' }, letterSpacing: 3, textAlign: 'right', x: 700, y: 1016, width: 316, height: 26, zIndex: 4 },
      { id: 'sc-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1080, background: `url("${grain(300, 23, 0.85)}")`, opacity: 0.08, mixBlendMode: 'multiply', zIndex: 8 }
    ]
  },
  // 2. 年度数据大屏（16:9）—— 四面板看板：KPI 进度 / 分段环 / 月度柱 / 门店排行
  {
    id: 'business-annual-screen', name: '年度数据大屏', version: '1.0.0', category: 'business',
    tags: ['business', 'dashboard', 'data-screen', 'kpi', 'chart', '16:9'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="56" viewBox="0 0 100 56"><rect width="100" height="56" fill="%230C1622"/><rect x="4" y="5" width="92" height="2" fill="%2322D3EE"/><g fill="%2316283B" stroke="%2328425E" stroke-width="0.6"><rect x="4" y="9" width="28" height="20" rx="2"/><rect x="4" y="31" width="28" height="20" rx="2"/><rect x="35" y="9" width="30" height="42" rx="2"/><rect x="68" y="9" width="28" height="26" rx="2"/><rect x="68" y="37" width="28" height="14" rx="2"/></g><g fill="%2322D3EE"><rect x="7" y="13" width="16" height="2"/><rect x="7" y="19" width="20" height="2"/><rect x="38" y="38" width="3" height="9"/><rect x="44" y="32" width="3" height="15"/><rect x="50" y="35" width="3" height="12"/><rect x="56" y="26" width="3" height="21"/><rect x="62" y="30" width="3" height="17"/></g><g fill="%23F59E0B"><rect x="38" y="20" width="3" height="6" opacity="0"/><rect x="71" y="41" width="18" height="2"/></g></svg>',
    tokens: {
      colors: {
        bg: { label: '屏底', default: '#0C1622', options: ['#0C1622', '#0A0F1C', '#101913', '#1A1024'] },
        panel: { label: '面板', default: '#16283B', options: ['#16283B', '#131C2E', '#182720', '#241834'] },
        edge: { label: '面板描边', default: '#28425E', options: ['#28425E', '#243449', '#2C4A3A', '#3D2C55'] },
        ink: { label: '主字', default: '#E8F1F8', options: ['#E8F1F8', '#EAF0FF', '#E9F5EC', '#F1E8FA'] },
        muted: { label: '次级字', default: '#8AA3BC', options: ['#8AA3BC', '#8595B0', '#8FAF9C', '#A996C4'] },
        accent: { label: '主数据色', default: '#22D3EE', options: ['#22D3EE', '#60A5FA', '#34D399', '#A78BFA'] },
        accent2: { label: '对比色', default: '#F59E0B', options: ['#F59E0B', '#F472B6', '#FBBF24', '#FB7185'] },
        accent3: { label: '峰值色', default: '#34D399', options: ['#34D399', '#2DD4BF', '#C084FC', '#F97316'] }
      },
      fonts: { heading: { label: '标题字体', default: HEI, options: [HEI, SANS, MONO, SERIF] } }
    },
    presets: [
      { name: '青蓝指挥', colors: { bg: '#0C1622', panel: '#16283B', edge: '#28425E', ink: '#E8F1F8', muted: '#8AA3BC', accent: '#22D3EE', accent2: '#F59E0B', accent3: '#34D399' } },
      { name: '靛夜数据', colors: { bg: '#0A0F1C', panel: '#131C2E', edge: '#243449', ink: '#EAF0FF', muted: '#8595B0', accent: '#60A5FA', accent2: '#F472B6', accent3: '#2DD4BF' } },
      { name: '松绿机房', colors: { bg: '#101913', panel: '#182720', edge: '#2C4A3A', ink: '#E9F5EC', muted: '#8FAF9C', accent: '#34D399', accent2: '#FBBF24', accent3: '#C084FC' } },
      { name: '紫外弹幕', colors: { bg: '#1A1024', panel: '#241834', edge: '#3D2C55', ink: '#F1E8FA', muted: '#A996C4', accent: '#A78BFA', accent2: '#FB7185', accent3: '#F97316' } }
    ],
    canvas: { virtualWidth: 1920, virtualHeight: 1080, defaultWidth: 1920, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      // 顶栏
      { id: 'bd-topbar', type: 'shape', shapeKind: 'rect', x: 40, y: 40, width: 1840, height: 3, fill: { $t: 'colors.accent' }, zIndex: 3, animation: { name: 'slideInLeft', duration: 800 } },
      { id: 'bd-kicker', type: 'text', content: 'ANNUAL DATA SCREEN · 上半年经营看板', fontFamily: MONO, fontSize: 18, color: { $t: 'colors.muted' }, letterSpacing: 6, x: 40, y: 56, width: 900, height: 28, zIndex: 4 },
      { id: 'bd-title', type: 'text', content: '2026 上半年 · 十二家门店一屏读完', fontFamily: { $t: 'fonts.heading' }, fontSize: 64, fontWeight: '900', color: { $t: 'colors.ink' }, letterSpacing: 1, x: 40, y: 82, width: 1200, height: 80, zIndex: 4, animation: { name: 'fadeInUp', duration: 800, delay: 120 }, editable: { content: true, fontSize: { type: 'range', min: 40, max: 84 }, position: true } },
      { id: 'bd-live-bg', type: 'shape', shapeKind: 'rect', x: 1560, y: 62, width: 320, height: 56, fill: { $t: 'colors.panel' }, borderRadius: 8, border: { color: { $t: 'colors.edge' }, width: 1, style: 'solid' }, zIndex: 3 },
      { id: 'bd-live-t', type: 'text', content: '● LIVE 06-30 12:00', fontFamily: MONO, fontSize: 22, color: { $t: 'colors.accent2' }, textAlign: 'center', x: 1560, y: 76, width: 320, height: 30, zIndex: 4, animation: { name: 'pulse', duration: 1600, iterationCount: 'infinite' } },
      // A. 核心指标（左上）
      { id: 'bd-pa', type: 'shape', shapeKind: 'rect', x: 40, y: 176, width: 588, height: 392, fill: { $t: 'colors.panel' }, borderRadius: 10, border: { color: { $t: 'colors.edge' }, width: 1, style: 'solid' }, zIndex: 2, animation: { name: 'fadeIn', duration: 600, delay: 200 } },
      { id: 'bd-pa-t', type: 'text', content: '核心指标', fontFamily: { $t: 'fonts.heading' }, fontSize: 28, fontWeight: '800', color: { $t: 'colors.ink' }, x: 72, y: 202, width: 300, height: 36, zIndex: 4, editable: { content: true } },
      { id: 'bd-pa-rule', type: 'shape', shapeKind: 'rect', x: 72, y: 250, width: 524, height: 1.5, fill: { $t: 'colors.ink' }, opacity: 0.15, zIndex: 3 },
      ...[['营收', '￥ 4 812 万', '同比 +12.4% · 达成 96%', 0.96, 'colors.accent'], ['毛利', '38.6%', '同比 −1.2pt · 原料涨价', 0.386, 'colors.accent2'], ['客流', '26.4 万人次', '同比 +5.8% · 外卖占四成', 0.72, 'colors.accent3']].map((s, i) => {
        const y = 268 + i * 96
        return [
          { id: `bd-kpi-v-${i}`, type: 'text', content: s[1], fontFamily: MONO, fontSize: 44, fontWeight: '700', color: { $t: s[4] } as any, x: 72, y, width: 400, height: 56, zIndex: 4, animation: { name: 'fadeInUp', duration: 620, delay: 260 + i * 140 }, editable: { content: true, fontSize: { type: 'range', min: 26, max: 60 } } },
          { id: `bd-kpi-l-${i}`, type: 'text', content: `${s[0]} · ${s[2]}`, fontFamily: HEI, fontSize: 22, color: { $t: 'colors.muted' } as any, x: 72, y: y + 56, width: 500, height: 28, zIndex: 4, editable: { content: true } },
          { id: `bd-kpi-t${i}`, type: 'shape', shapeKind: 'rect', x: 72, y: y + 86, width: 524, height: 4, fill: { $t: 'colors.ink' }, opacity: 0.14, borderRadius: 2, zIndex: 3 },
          { id: `bd-kpi-b-${i}`, type: 'shape', shapeKind: 'rect', x: 72, y: y + 86, width: 524 * (s[3] as number), height: 4, fill: { $t: s[4] } as any, borderRadius: 2, zIndex: 4, animation: { name: 'slideInLeft', duration: 900, delay: 320 + i * 140 } }
        ]
      }).flat() as any,
      // B. 渠道构成（左下）：12 段拼环，前 5 段直营 / 中 3 段加盟 / 后 4 段线上
      { id: 'bd-pc', type: 'shape', shapeKind: 'rect', x: 40, y: 596, width: 588, height: 404, fill: { $t: 'colors.panel' }, borderRadius: 10, border: { color: { $t: 'colors.edge' }, width: 1, style: 'solid' }, zIndex: 2, animation: { name: 'fadeIn', duration: 600, delay: 420 } },
      { id: 'bd-pc-t', type: 'text', content: '渠道构成', fontFamily: { $t: 'fonts.heading' }, fontSize: 28, fontWeight: '800', color: { $t: 'colors.ink' }, x: 72, y: 622, width: 300, height: 36, zIndex: 4, editable: { content: true } },
      ...(() => { const cx = 258, cy = 820, R = 122
        return Array.from({ length: 12 }, (_, j) => { const a = j * 30 - 90, rad = a * Math.PI / 180
          const tok = j < 5 ? 'colors.accent' : (j < 8 ? 'colors.accent2' : 'colors.accent3')
          return { id: `bd-arc-${j}`, type: 'shape', shapeKind: 'rect', x: cx + R * Math.cos(rad) - 22, y: cy + R * Math.sin(rad) - 8, width: 44, height: 16, rotation: a + 90, fill: { $t: tok } as any, opacity: 0.92, borderRadius: 3, zIndex: 4, animation: { name: 'zoomIn', duration: 420, delay: 600 + j * 55 } }
        }) })() as any,
      { id: 'bd-hub', type: 'shape', shapeKind: 'circle', x: 258 - 84, y: 820 - 84, width: 168, height: 168, fill: { $t: 'colors.bg' }, opacity: 0.5, zIndex: 3 },
      { id: 'bd-hero', type: 'text', content: '41%', fontFamily: MONO, fontSize: 64, fontWeight: '900', color: { $t: 'colors.accent' }, textAlign: 'center', x: 168, y: 792, width: 180, height: 72, zIndex: 5, animation: { name: 'zoomIn', duration: 700, delay: 1250 }, editable: { content: true, fontSize: { type: 'range', min: 36, max: 84 } } },
      { id: 'bd-hero-l', type: 'text', content: '直营占比', fontFamily: HEI, fontSize: 22, color: { $t: 'colors.muted' }, textAlign: 'center', x: 168, y: 862, width: 180, height: 28, zIndex: 5 },
      ...[['直营', '5 / 12', 'colors.accent'], ['加盟', '3 / 12', 'colors.accent2'], ['线上', '4 / 12', 'colors.accent3']].map((s, i) => (
        [
          { id: `bd-lg-d-${i}`, type: 'shape', shapeKind: 'circle', x: 430, y: 772 + i * 50, width: 16, height: 16, fill: { $t: s[2] } as any, zIndex: 4 },
          { id: `bd-lg-t-${i}`, type: 'text', content: `${s[0]} ${s[1]}`, fontFamily: HEI, fontSize: 22, color: { $t: 'colors.ink' } as any, opacity: 0.85, x: 460, y: 766 + i * 50, width: 150, height: 28, zIndex: 4, editable: { content: true } }
        ]
      )).flat() as any,
      // C. 月度柱（中）
      { id: 'bd-pb', type: 'shape', shapeKind: 'rect', x: 660, y: 176, width: 632, height: 824, fill: { $t: 'colors.panel' }, borderRadius: 10, border: { color: { $t: 'colors.edge' }, width: 1, style: 'solid' }, zIndex: 2, animation: { name: 'fadeIn', duration: 600, delay: 300 } },
      { id: 'bd-pb-t', type: 'text', content: '月度营收', fontFamily: { $t: 'fonts.heading' }, fontSize: 28, fontWeight: '800', color: { $t: 'colors.ink' }, x: 692, y: 202, width: 300, height: 36, zIndex: 4, editable: { content: true } },
      { id: 'bd-pb-u', type: 'text', content: '单位 / 万元', fontFamily: MONO, fontSize: 18, color: { $t: 'colors.muted' }, textAlign: 'right', x: 1092, y: 208, width: 160, height: 26, zIndex: 4 },
      ...[[270, '300'], [480, '200'], [690, '100']].map((g, i) => (
        [
          { id: `bd-grid-${i}`, type: 'shape', shapeKind: 'rect', x: 692, y: g[0], width: 560, height: 1, fill: { $t: 'colors.ink' }, opacity: 0.12, zIndex: 3 },
          { id: `bd-grid-t-${i}`, type: 'text', content: g[1] as string, fontFamily: MONO, fontSize: 18, color: { $t: 'colors.muted' }, opacity: 0.9, textAlign: 'right', x: 1200, y: (g[0] as number) - 30, width: 52, height: 24, zIndex: 4 }
        ]
      )).flat() as any,
      { id: 'bd-base', type: 'shape', shapeKind: 'rect', x: 692, y: 900, width: 560, height: 2, fill: { $t: 'colors.ink' }, opacity: 0.3, zIndex: 3 },
      ...[148, 172, 131, 196, 224, 181, 262, 301].map((v, i) => {
        const h = v * 2.1
        return { id: `bd-bar-${i}`, type: 'shape', shapeKind: 'rect', x: 704 + i * 66, y: 900 - h, width: 40, height: h, fill: { $t: i === 7 ? 'colors.accent3' : (i % 2 ? 'colors.accent2' : 'colors.accent') } as any, opacity: 0.9, borderRadius: 4, zIndex: 4, animation: { name: 'slideUpFade', duration: 720, delay: 420 + i * 90 } }
      }) as any,
      ...[0, 2, 4, 7].map((k, i) => (
        { id: `bd-bar-l-${i}`, type: 'text', content: `${k + 1} 月`, fontFamily: MONO, fontSize: 18, color: { $t: 'colors.muted' }, textAlign: 'center', x: 684 + k * 66, y: 918, width: 80, height: 26, zIndex: 4 }
      )) as any,
      { id: 'bd-peak', type: 'text', content: '峰值 301 / 六月店庆', fontFamily: HEI, fontSize: 22, color: { $t: 'colors.accent3' }, x: 692, y: 952, width: 400, height: 30, zIndex: 4, animation: { name: 'fadeIn', duration: 700, delay: 1400 }, editable: { content: true } },
      // D. 门店排行（右上）
      { id: 'bd-pd', type: 'shape', shapeKind: 'rect', x: 1324, y: 176, width: 556, height: 600, fill: { $t: 'colors.panel' }, borderRadius: 10, border: { color: { $t: 'colors.edge' }, width: 1, style: 'solid' }, zIndex: 2, animation: { name: 'fadeIn', duration: 600, delay: 360 } },
      { id: 'bd-pd-t', type: 'text', content: '门店营收 TOP4', fontFamily: { $t: 'fonts.heading' }, fontSize: 28, fontWeight: '800', color: { $t: 'colors.ink' }, x: 1356, y: 202, width: 400, height: 36, zIndex: 4, editable: { content: true } },
      ...[['01', '南湖里店', 1, '￥ 812 万'], ['02', '高铁站店', 0.86, '￥ 698 万'], ['03', '老码头店', 0.61, '￥ 496 万'], ['04', '西苑书店', 0.44, '￥ 358 万']].map((r, i) => {
        const y = 262 + i * 122
        return [
          { id: `bd-rk-${i}`, type: 'text', content: r[0] as string, fontFamily: MONO, fontSize: 28, fontWeight: '700', color: { $t: 'colors.accent' } as any, x: 1356, y, width: 60, height: 36, zIndex: 4 },
          { id: `bd-rn-${i}`, type: 'text', content: r[1] as string, fontFamily: HEI, fontSize: 22, color: { $t: 'colors.ink' } as any, opacity: 0.9, x: 1420, y: y + 6, width: 230, height: 30, zIndex: 4, editable: { content: true } },
          { id: `bd-rv-${i}`, type: 'text', content: r[3] as string, fontFamily: MONO, fontSize: 22, color: { $t: 'colors.muted' } as any, textAlign: 'right', x: 1660, y: y + 6, width: 188, height: 30, zIndex: 4 },
          { id: `bd-rt-${i}`, type: 'shape', shapeKind: 'rect', x: 1356, y: y + 58, width: 492, height: 8, fill: { $t: 'colors.ink' }, opacity: 0.12, borderRadius: 4, zIndex: 3 },
          { id: `bd-rb-${i}`, type: 'shape', shapeKind: 'rect', x: 1356, y: y + 58, width: 492 * (r[2] as number), height: 8, fill: { $t: i === 0 ? 'colors.accent' : (i === 1 ? 'colors.accent2' : 'colors.accent3') } as any, borderRadius: 4, zIndex: 4, animation: { name: 'slideInLeft', duration: 820, delay: 460 + i * 130 } }
        ]
      }).flat() as any,
      // E. 口径说明（右下）
      { id: 'bd-pe', type: 'shape', shapeKind: 'rect', x: 1324, y: 804, width: 556, height: 196, fill: { $t: 'colors.panel' }, borderRadius: 10, border: { color: { $t: 'colors.edge' }, width: 1, style: 'solid' }, zIndex: 2 },
      { id: 'bd-pe-t', type: 'text', content: '口径说明', fontFamily: { $t: 'fonts.heading' }, fontSize: 28, fontWeight: '800', color: { $t: 'colors.ink' }, x: 1356, y: 830, width: 300, height: 36, zIndex: 4, editable: { content: true } },
      { id: 'bd-pe-1', type: 'text', content: '营收含外卖流水，不含平台补贴；门店数取期末值。', fontFamily: HEI, fontSize: 18, color: { $t: 'colors.muted' }, x: 1356, y: 878, width: 492, height: 26, zIndex: 4, editable: { content: true } },
      { id: 'bd-pe-2', type: 'text', content: '环比按自然月对齐，春节跨月已回补至所属门店。', fontFamily: HEI, fontSize: 18, color: { $t: 'colors.muted' }, x: 1356, y: 912, width: 492, height: 26, zIndex: 4, editable: { content: true } },
      { id: 'bd-pe-3', type: 'text', content: '数据源 / POS 导出 + 小程序订单，每日 02:00 回算。', fontFamily: MONO, fontSize: 18, color: { $t: 'colors.muted' }, x: 1356, y: 946, width: 492, height: 26, zIndex: 4, editable: { content: true } },
      { id: 'bd-foot-l', type: 'text', content: '经营分析 / 数据组 Vol.06　·　更新于 06-30 12:00', fontFamily: MONO, fontSize: 18, color: { $t: 'colors.muted' }, opacity: 0.85, x: 40, y: 1020, width: 900, height: 26, zIndex: 4 },
      { id: 'bd-foot-r', type: 'text', content: '06 PERIODS', fontFamily: MONO, fontSize: 18, color: { $t: 'colors.accent' }, letterSpacing: 3, textAlign: 'right', x: 1380, y: 1020, width: 500, height: 26, zIndex: 4 },
      { id: 'bd-vig', type: 'overlay', x: 0, y: 0, width: 1920, height: 1080, background: `url("${grain(320, 11, 0.5)}")`, opacity: 0.16, mixBlendMode: 'screen', zIndex: 8 }
    ]
  },
  // 3. 路线地图卡（4:5）—— 航拍底图 + 等高线示意 + 五营地连线 + 海拔剖面 + 四日行程
  {
    id: 'business-route-map-card', name: '路线地图卡', version: '1.0.0', category: 'business',
    tags: ['business', 'route', 'map', 'itinerary', 'outdoor', '4:5'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="125" viewBox="0 0 100 125"><rect width="100" height="125" fill="%23EEF1EC"/><rect x="8" y="12" width="60" height="5" rx="2" fill="%231D2B27"/><rect x="8" y="21" width="40" height="3" rx="1.5" fill="%231D2B27" opacity="0.4"/><rect x="8" y="30" width="84" height="52" rx="3" fill="%231B2B33"/><g fill="none" stroke="%23FFFFFF" stroke-width="0.8" opacity="0.3"><path d="M10 66 C 26 60 34 68 48 58 C 62 48 70 56 90 44"/><path d="M10 76 C 28 70 36 76 52 66 C 66 58 74 64 90 54"/></g><path d="M18 74 L 34 62 L 50 56 L 66 44 L 82 36" stroke="%23E4572E" stroke-width="2" fill="none" stroke-linecap="round"/><g fill="%23FFFDF8" stroke="%23E4572E" stroke-width="1.4"><circle cx="18" cy="74" r="3"/><circle cx="34" cy="62" r="3"/><circle cx="50" cy="56" r="3"/><circle cx="66" cy="44" r="3"/><circle cx="82" cy="36" r="3"/></g><rect x="8" y="86" width="84" height="14" rx="2" fill="%23FFFFFF"/><g fill="%232A7F62"><rect x="12" y="94" width="5" height="4"/><rect x="20" y="91" width="5" height="7"/><rect x="28" y="88" width="5" height="10"/><rect x="36" y="86" width="5" height="12"/><rect x="44" y="90" width="5" height="8"/><rect x="52" y="93" width="5" height="5"/></g><g fill="%231D2B27" opacity="0.5"><rect x="8" y="104" width="46" height="3" rx="1.5"/><rect x="8" y="110" width="38" height="3" rx="1.5"/></g></svg>',
    tokens: {
      colors: {
        bg: { label: '卡底', default: '#EEF1EC', options: ['#EEF1EC', '#F2F0E8', '#E9EFF2', '#F3EDE9'] },
        card: { label: '亮面', default: '#FFFDF8', options: ['#FFFDF8', '#FFFFFF', '#F7FBF8', '#FBF6EE'] },
        ink: { label: '主字', default: '#1D2B27', options: ['#1D2B27', '#1F2937', '#26303B', '#33261D'] },
        muted: { label: '次级字', default: '#5E7168', options: ['#5E7168', '#6B7280', '#5F6E7B', '#7A6A58'] },
        line: { label: '分隔线', default: '#C7D1C6', options: ['#C7D1C6', '#D5D9DF', '#C4CED6', '#D9CDBE'] },
        accent: { label: '路线色', default: '#E4572E', options: ['#E4572E', '#0F766E', '#1D4ED8', '#B45309'] },
        accent2: { label: '高程色', default: '#2A7F62', options: ['#2A7F62', '#15803D', '#0369A1', '#7C3AED'] }
      },
      fonts: { heading: { label: '标题字体', default: HEI, options: [HEI, SANS, SERIF, KAITI] } }
    },
    presets: [
      { name: '夕照山脊', colors: { bg: '#EEF1EC', card: '#FFFDF8', ink: '#1D2B27', muted: '#5E7168', line: '#C7D1C6', accent: '#E4572E', accent2: '#2A7F62' } },
      { name: '冷湖青碧', colors: { bg: '#E9EFF2', card: '#FFFFFF', ink: '#26303B', muted: '#5F6E7B', line: '#C4CED6', accent: '#0F766E', accent2: '#0369A1' } },
      { name: '靛蓝夜行', colors: { bg: '#F2F0E8', card: '#F7FBF8', ink: '#1F2937', muted: '#6B7280', line: '#D5D9DF', accent: '#1D4ED8', accent2: '#7C3AED' } },
      { name: '赭土秋径', colors: { bg: '#F3EDE9', card: '#FBF6EE', ink: '#33261D', muted: '#7A6A58', line: '#D9CDBE', accent: '#B45309', accent2: '#15803D' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      // 卡头
      { id: 'rm-kicker', type: 'text', content: 'ROUTE CARD · 羊蹄山西南环线', fontFamily: MONO, fontSize: 18, color: { $t: 'colors.accent' }, letterSpacing: 5, x: 64, y: 56, width: 700, height: 26, zIndex: 4, editable: { content: true } },
      { id: 'rm-title', type: 'text', content: '四日 · 从溪口到顶峰', fontFamily: { $t: 'fonts.heading' }, fontSize: 62, fontWeight: '900', color: { $t: 'colors.ink' }, letterSpacing: 1, x: 62, y: 84, width: 954, height: 78, zIndex: 4, animation: { name: 'inkReveal', duration: 1000 }, editable: { content: true, fontSize: { type: 'range', min: 38, max: 80 }, position: true } },
      ...[['18.6', 'km 总里程'], ['1 240', 'm 累计爬升'], ['2', '座 营地'], ['4', '日 建议时长']].map((s, i) => {
        const x = 64 + i * 240
        return [
          { id: `rm-st-${i}`, type: 'shape', shapeKind: 'rect', x, y: 176, width: 200, height: 3, fill: { $t: i % 2 ? 'colors.accent2' : 'colors.accent' } as any, borderRadius: 2, zIndex: 4, animation: { name: 'slideInLeft', duration: 600, delay: 200 + i * 110 } },
          { id: `rm-st-v-${i}`, type: 'text', content: s[0], fontFamily: MONO, fontSize: 40, fontWeight: '700', color: { $t: 'colors.ink' } as any, x, y: 188, width: 200, height: 48, zIndex: 4, editable: { content: true, fontSize: { type: 'range', min: 26, max: 56 } } },
          { id: `rm-st-l-${i}`, type: 'text', content: s[1], fontFamily: HEI, fontSize: 22, color: { $t: 'colors.muted' } as any, x, y: 240, width: 200, height: 28, zIndex: 4, editable: { content: true } }
        ]
      }).flat() as any,
      // 地图框
      { id: 'rm-map', type: 'shape', shapeKind: 'rect', x: 64, y: 280, width: 952, height: 560, fill: { $t: 'colors.ink' }, borderRadius: 14, zIndex: 2, animation: { name: 'fadeIn', duration: 700, delay: 260 } },
      { id: 'rm-photo', type: 'image', src: '/images/photo/ridge-aerial-alpine-1200x700.jpg', objectFit: 'cover', x: 64, y: 280, width: 952, height: 560, borderRadius: 14, zIndex: 3, editable: { src: { type: 'upload' }, position: true } },
      { id: 'rm-scrim', type: 'shape', shapeKind: 'rect', x: 64, y: 280, width: 952, height: 560, fill: 'rgba(8,18,24,0.46)', borderRadius: 14, zIndex: 4 },
      { id: 'rm-contour', type: 'image', src: CONTOUR_URI, objectFit: 'cover', x: 64, y: 280, width: 952, height: 560, opacity: 0.62, zIndex: 5 },
      // 植被散点（伪随机布点，只用亮面色，跟随预设）
      ...(() => { const rnd = seeded(71)
        return Array.from({ length: 16 }, (_, i) => { const x = 92 + rnd() * 900, y = 320 + rnd() * 480, r = 3 + rnd() * 4
          return { id: `rm-veg-${i}`, type: 'shape', shapeKind: 'circle', x, y, width: r * 2, height: r * 2, fill: { $t: 'colors.card' } as any, opacity: 0.14 + rnd() * 0.14, zIndex: 5 }
        }) })() as any,
      // 路线：五营地连线（旋转 rect 拼，颜色跟 token）
      ...(() => { const pts = [[140, 772], [302, 650], [470, 572], [650, 440], [872, 344]]
        const segs = pts.slice(1).map((p, i) => { const q = pts[i], dx = p[0] - q[0], dy = p[1] - q[1], L = Math.hypot(dx, dy)
          return { id: `rm-seg-${i}`, type: 'shape', shapeKind: 'rect', x: (q[0] + p[0]) / 2 - L / 2, y: (q[1] + p[1]) / 2 - 4, width: L, height: 8, rotation: Math.atan2(dy, dx) * 180 / Math.PI, fill: { $t: 'colors.accent' } as any, borderRadius: 4, zIndex: 6, animation: { name: 'fadeIn', duration: 520, delay: 620 + i * 150 } }
        })
        const nodes = pts.map((p, i) => [
          { id: `rm-dot-${i}`, type: 'shape', shapeKind: 'circle', x: p[0] - 19, y: p[1] - 19, width: 38, height: 38, fill: { $t: 'colors.card' } as any, border: { color: { $t: 'colors.accent' } as any, width: 4, style: 'solid' as any }, zIndex: 7, animation: { name: 'zoomIn', duration: 460, delay: 700 + i * 150 } },
          { id: `rm-num-${i}`, type: 'text', content: String(i + 1), fontFamily: MONO, fontSize: 22, fontWeight: '700', color: { $t: 'colors.ink' } as any, textAlign: 'center', x: p[0] - 40, y: p[1] - 15, width: 80, height: 30, zIndex: 8 }
        ])
        return [...segs, ...nodes.flat()] })() as any,
      // 指北针
      { id: 'rm-rose', type: 'shape', shapeKind: 'circle', x: 96, y: 312, width: 64, height: 64, fill: 'rgba(255,255,255,0.16)', border: { color: { $t: 'colors.card' }, width: 1.5, style: 'solid' }, zIndex: 6 },
      { id: 'rm-rose-n', type: 'shape', shapeKind: 'rect', x: 126, y: 322, width: 5, height: 30, fill: { $t: 'colors.accent' }, borderRadius: 2, zIndex: 7, animation: { name: 'swing', duration: 2600, iterationCount: 'infinite' } },
      { id: 'rm-rose-t', type: 'text', content: 'N', fontFamily: MONO, fontSize: 18, fontWeight: '700', color: { $t: 'colors.card' }, textAlign: 'center', x: 118, y: 288, width: 20, height: 22, zIndex: 7 },
      { id: 'rm-tag-start', type: 'text', content: '起点 · 溪口 1 240 m', fontFamily: MONO, fontSize: 18, color: { $t: 'colors.card' }, opacity: 0.92, x: 88, y: 800, width: 300, height: 26, zIndex: 7, editable: { content: true } },
      { id: 'rm-tag-end', type: 'text', content: '顶峰 2 040 m', fontFamily: MONO, fontSize: 18, color: { $t: 'colors.accent' }, textAlign: 'right', x: 692, y: 298, width: 300, height: 26, zIndex: 7, editable: { content: true } },
      { id: 'rm-cap', type: 'text', content: '等高距 40 m · 线稿仅为示意', fontFamily: MONO, fontSize: 18, color: { $t: 'colors.card' }, opacity: 0.7, textAlign: 'right', x: 640, y: 806, width: 352, height: 26, zIndex: 7 },
      // 海拔剖面
      { id: 'rm-el', type: 'shape', shapeKind: 'rect', x: 64, y: 858, width: 952, height: 128, fill: { $t: 'colors.card' }, borderRadius: 10, zIndex: 2 },
      { id: 'rm-el-t', type: 'text', content: '海拔剖面', fontFamily: { $t: 'fonts.heading' }, fontSize: 22, fontWeight: '700', color: { $t: 'colors.ink' }, x: 88, y: 874, width: 200, height: 28, zIndex: 4, editable: { content: true } },
      { id: 'rm-el-v', type: 'text', content: '最高点 2 040 m · 坡度中位 14%', fontFamily: MONO, fontSize: 18, color: { $t: 'colors.muted' }, textAlign: 'right', x: 640, y: 872, width: 352, height: 24, zIndex: 4, editable: { content: true } },
      { id: 'rm-el-base', type: 'shape', shapeKind: 'rect', x: 88, y: 962, width: 872, height: 1.5, fill: { $t: 'colors.line' }, zIndex: 3 },
      ...[14, 20, 28, 36, 44, 60, 46, 34, 24, 14].map((h, i) => (
        { id: `rm-el-b-${i}`, type: 'shape', shapeKind: 'rect', x: 96 + i * 88, y: 962 - h, width: 62, height: h, fill: { $t: i === 5 ? 'colors.accent' : 'colors.accent2' } as any, opacity: i === 5 ? 1 : 0.72, borderRadius: 4, zIndex: 4, animation: { name: 'slideUpFade', duration: 620, delay: 900 + i * 70 } }
      )) as any,
      // 四日行程
      ...[['D1', '溪口 → 云杉坪', '碎石缓坡，溪声伴行，午后易起雾。', '6.2 km · +420 m'], ['D2', '云杉坪 → 黑湖', '穿过冷杉带，碎石坡上升最陡的一段。', '4.4 km · +560 m'], ['D3', '黑湖 → 鞍部营地', '林线以上视野打开，风大，注意保温。', '2.8 km · +180 m'], ['D4', '鞍部 → 顶峰 → 撤', '凌晨三点出发，正午前必须下撤。', '5.2 km · ±80 m']].map((r, i) => {
        const y = 1010 + i * 62
        return [
          { id: `rm-day-${i}`, type: 'shape', shapeKind: 'circle', x: 64, y, width: 38, height: 38, fill: { $t: i === 3 ? 'colors.accent' : 'colors.accent2' } as any, zIndex: 4, animation: { name: 'zoomIn', duration: 420, delay: 1150 + i * 120 } },
          { id: `rm-day-t-${i}`, type: 'text', content: r[0], fontFamily: MONO, fontSize: 18, fontWeight: '700', color: '#FFFFFF', textAlign: 'center', x: 63, y: y + 7, width: 40, height: 24, zIndex: 5 },
          { id: `rm-pn-${i}`, type: 'text', content: r[1], fontFamily: { $t: 'fonts.heading' } as any, fontSize: 28, fontWeight: '700', color: { $t: 'colors.ink' } as any, x: 116, y, width: 420, height: 34, zIndex: 4, animation: { name: 'fadeInUp', duration: 520, delay: 1180 + i * 120 }, editable: { content: true } },
          { id: `rm-pd-${i}`, type: 'text', content: r[2], fontFamily: HEI, fontSize: 22, color: { $t: 'colors.muted' } as any, x: 116, y: y + 32, width: 560, height: 28, zIndex: 4, editable: { content: true } },
          { id: `rm-pm-${i}`, type: 'text', content: r[3], fontFamily: MONO, fontSize: 22, color: { $t: 'colors.ink' } as any, opacity: 0.8, textAlign: 'right', x: 700, y: y + 6, width: 316, height: 28, zIndex: 4 },
          i < 3 ? { id: `rm-psep-${i}`, type: 'shape', shapeKind: 'rect', x: 64, y: y + 54, width: 952, height: 1, fill: { $t: 'colors.line' }, zIndex: 3 } : null
        ].filter(Boolean)
      }).flat() as any,
      { id: 'rm-foot-l', type: 'text', content: '路线 / 山野部 · 羊蹄山西南　·　2026 年 6 月踏查', fontFamily: MONO, fontSize: 18, color: { $t: 'colors.muted' }, x: 64, y: 1276, width: 620, height: 26, zIndex: 4 },
      { id: 'rm-foot-r', type: 'text', content: '1:25 000', fontFamily: MONO, fontSize: 18, color: { $t: 'colors.accent' }, letterSpacing: 2, textAlign: 'right', x: 700, y: 1276, width: 316, height: 26, zIndex: 4 },
      { id: 'rm-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1350, background: `url("${grain(300, 47, 0.85)}")`, opacity: 0.09, mixBlendMode: 'multiply', zIndex: 9 }
    ]
  }
]


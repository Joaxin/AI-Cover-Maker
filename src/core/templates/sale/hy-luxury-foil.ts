// src/core/templates/sale/hy-luxury-foil.ts
// 轻奢金箔（quiet luxury foil）：深墨底 + 双层细金框 + 135° 多段金色渐变横条 + 衬线中文主标题
// + 大号价格数字 + 圆形折扣徽章（细金环）。金色只出现在 3 处：金框 / 金箔横条 / 徽章金环，其余留深底。
// 1080×1350（4:5）；全色走 tokens.colors，四套预设覆盖全部色 token。
import type { Template } from '@/types/types'
import {SANS, HEI, SONG, IMPACT, SERIF, grainSoft, grain} from '../_fx/trend'

/** 135° 多段金色：暗金 → 亮金 → 暗金，模拟箔面反光（rgba 金色调，不随预设换色，属质感层） */
const FOIL = 'linear-gradient(135deg, rgba(198,164,90,0.10) 0%, rgba(232,203,130,0.95) 24%, rgba(255,243,208,1) 42%, rgba(204,167,84,0.85) 58%, rgba(255,248,226,1) 76%, rgba(198,164,90,0.15) 100%)'

export const hyLuxuryFoilTemplates: Template[] = [
  {
    id: 'hy-luxury-foil', name: '轻奢金箔', version: '1.0.0', category: 'sale',
    tags: ['hy', 'quiet-luxury', 'gold-foil', 'serif', 'member-sale', 'dark', '4:5'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="125" viewBox="0 0 100 125"><rect width="100" height="125" fill="%230E1512"/><rect x="7" y="7" width="86" height="111" fill="none" stroke="%23C9A227" stroke-width="2.2"/><rect x="13" y="13" width="74" height="99" fill="none" stroke="%23C9A227" stroke-width="0.7" opacity="0.55"/><rect x="19" y="26" width="30" height="2" fill="%23C9A227"/><rect x="19" y="36" width="24" height="7" fill="%23F2EADB"/><rect x="19" y="46" width="17" height="7" fill="%23F2EADB"/><rect x="19" y="62" width="36" height="2" fill="%239A968A"/><rect x="19" y="70" width="27" height="2" fill="%239A968A"/><rect x="19" y="84" width="30" height="11" fill="%23F2EADB"/><circle cx="71" cy="88" r="15" fill="none" stroke="%23C9A227" stroke-width="1.4"/><rect x="65" y="84" width="12" height="5" fill="%23F2EADB"/><rect x="68" y="93" width="6" height="2" fill="%239A968A"/><rect x="19" y="110" width="62" height="3" fill="%23C9A227" opacity="0.85"/><rect x="19" y="117" width="42" height="2" fill="%239A968A"/></svg>',
    tokens: {
      colors: {
        bg: { label: '深底', default: '#0E1512', options: ['#0E1512', '#101010', '#0C1220', '#170C10'] },
        panel: { label: '内页底', default: '#16211B', options: ['#16211B', '#1A1A18', '#141E31', '#22121A'] },
        ink: { label: '主文字', default: '#F2EADB', options: ['#F2EADB', '#F5F1E6', '#EDF0F6', '#F6EBEA'] },
        muted: { label: '次要字', default: '#9A968A', options: ['#9A968A', '#8E8A80', '#8D96A8', '#9C8A8C'] },
        gold: { label: '金箔', default: '#C9A227', options: ['#C9A227', '#BFA06A', '#C9A96A', '#CBA45C'] }
      },
      fonts: {
        heading: { label: '中文标题', default: SONG, options: [SONG, SERIF, HEI] },
        latin: { label: '西文', default: SERIF, options: [SERIF, SANS] },
        num: { label: '价格数字', default: IMPACT, options: [IMPACT, SANS] },
        body: { label: '正文', default: HEI, options: [HEI, SONG, SANS] },
        meta: { label: '标签', default: SANS, options: [SANS, HEI] }
      }
    },
    presets: [
      { name: '墨绿鎏金', colors: { bg: '#0E1512', panel: '#16211B', ink: '#F2EADB', muted: '#9A968A', gold: '#C9A227' } },
      { name: '深墨雅金', colors: { bg: '#101010', panel: '#1A1A18', ink: '#F5F1E6', muted: '#8E8A80', gold: '#BFA06A' } },
      { name: '午夜宝蓝', colors: { bg: '#0C1220', panel: '#141E31', ink: '#EDF0F6', muted: '#8D96A8', gold: '#C9A96A' } },
      { name: '酒红丝绒', colors: { bg: '#170C10', panel: '#22121A', ink: '#F6EBEA', muted: '#9C8A8C', gold: '#CBA45C' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      // ── 双层细金框：外框填金 → 内框填深底让金色只留 6px 一圈 → 再一道 2px 发丝线 ──
      { id: 'frame-outer', type: 'shape', shapeKind: 'rect', x: 86, y: 86, width: 908, height: 1178, fill: { $t: 'colors.gold' }, zIndex: 2, animation: { name: 'fadeIn', duration: 700 } },
      { id: 'frame-inner', type: 'shape', shapeKind: 'rect', x: 92, y: 92, width: 896, height: 1166, fill: { $t: 'colors.panel' }, zIndex: 3, animation: { name: 'fadeIn', duration: 700, delay: 80 } },
      { id: 'frame-hair', type: 'shape', shapeKind: 'rect', x: 118, y: 118, width: 844, height: 1114, fill: 'transparent', border: { width: 2, style: 'solid', color: { $t: 'colors.gold' } }, opacity: 0.5, zIndex: 4, animation: { name: 'fadeIn', duration: 900, delay: 160 } },
      // ── 刊头：左西文场次 / 右活动档期 ─────────────────────────
      { id: 'kicker', type: 'text', content: 'AUTUMN MEMBER WEEK', fontFamily: { $t: 'fonts.latin' }, fontSize: 22, color: { $t: 'colors.ink' }, letterSpacing: 8, lineHeight: 1.2, x: 160, y: 170, width: 500, height: 34, zIndex: 6, animation: { name: 'fadeInDown', duration: 600, delay: 220 }, editable: { content: true } },
      { id: 'kicker-r', type: 'text', content: '2026.10.18 — 10.25', fontFamily: { $t: 'fonts.meta' }, fontSize: 22, color: { $t: 'colors.muted' }, letterSpacing: 4, lineHeight: 1.2, textAlign: 'right', x: 560, y: 170, width: 380, height: 34, zIndex: 6, animation: { name: 'fadeIn', duration: 600, delay: 280 }, editable: { content: true } },
      // ── 金箔短横条（135° 多段金色，shimmer 做流光）──────────────
      { id: 'foil-bar', type: 'overlay', background: FOIL, borderRadius: 3, x: 160, y: 224, width: 200, height: 5, zIndex: 6, animation: { name: 'shimmer', duration: 2600, delay: 900, iterationCount: 'infinite', easing: 'ease-in-out' } },
      // ── 场次标签 ────────────────────────────────────────────
      { id: 'eyebrow', type: 'text', content: '第七届 · 金桂会员周', fontFamily: { $t: 'fonts.body' }, fontSize: 28, color: { $t: 'colors.muted' }, letterSpacing: 6, lineHeight: 1.2, x: 160, y: 252, width: 760, height: 40, zIndex: 6, animation: { name: 'fadeIn', duration: 620, delay: 340 }, editable: { content: true } },
      // ── 衬线中文主标题 ──────────────────────────────────────
      { id: 'title', type: 'text', content: '金桂会员周\n私享礼遇', fontFamily: { $t: 'fonts.heading' }, fontSize: 104, fontWeight: '500', color: { $t: 'colors.ink' }, letterSpacing: 4, lineHeight: 1.25, x: 160, y: 320, width: 780, height: 300, zIndex: 7, shadow: { offsetX: 0, offsetY: 10, blur: 30, color: 'rgba(0,0,0,0.4)' }, animation: { name: 'fadeInUp', duration: 900, delay: 420 }, editable: { content: true, fontSize: { type: 'range', min: 92, max: 116 } } },
      // ── 权益说明两行 ────────────────────────────────────────
      { id: 'lead', type: 'text', content: '秋冬新品全场参与，会员再享折上九折\n预约到店可领金桂香氛礼盒一份', fontFamily: { $t: 'fonts.body' }, fontSize: 28, color: { $t: 'colors.muted' }, letterSpacing: 1, lineHeight: 1.75, x: 160, y: 640, width: 760, height: 130, zIndex: 6, animation: { name: 'fadeIn', duration: 800, delay: 520 }, editable: { content: true } },
      // ── 价格区：小标签 + 大号到手价 + 原价 ────────────────────
      { id: 'price-label', type: 'text', content: '会员到手价', fontFamily: { $t: 'fonts.meta' }, fontSize: 28, color: { $t: 'colors.ink' }, letterSpacing: 4, lineHeight: 1.2, x: 160, y: 790, width: 520, height: 40, zIndex: 6, animation: { name: 'fadeIn', duration: 600, delay: 600 }, editable: { content: true } },
      { id: 'price', type: 'text', content: '¥1,280', fontFamily: { $t: 'fonts.num' }, fontSize: 150, color: { $t: 'colors.ink' }, letterSpacing: 0, lineHeight: 1.1, x: 160, y: 830, width: 560, height: 190, zIndex: 7, shadow: { offsetX: 0, offsetY: 12, blur: 34, color: 'rgba(0,0,0,0.45)' }, animation: { name: 'zoomIn', duration: 900, delay: 680 }, editable: { content: true, fontSize: { type: 'range', min: 120, max: 168 } } },
      { id: 'price-old', type: 'text', content: '原价 ¥1,680', fontFamily: { $t: 'fonts.body' }, fontSize: 44, color: { $t: 'colors.muted' }, letterSpacing: 2, lineHeight: 1.2, x: 470, y: 970, width: 300, height: 60, opacity: 0.75, zIndex: 6, animation: { name: 'fadeIn', duration: 700, delay: 780 }, editable: { content: true } },
      // ── 圆形折扣徽章：细金环 + 折数 ──────────────────────────
      { id: 'badge-disc', type: 'shape', shapeKind: 'circle', x: 750, y: 840, width: 190, height: 190, fill: { $t: 'colors.bg' }, opacity: 0.85, zIndex: 5, shadow: { offsetX: 0, offsetY: 14, blur: 30, color: 'rgba(0,0,0,0.35)' }, animation: { name: 'zoomIn', duration: 800, delay: 840 } },
      { id: 'badge-ring', type: 'shape', shapeKind: 'circle', x: 750, y: 840, width: 190, height: 190, fill: 'transparent', border: { width: 3, style: 'solid', color: { $t: 'colors.gold' } }, zIndex: 8, animation: { name: 'pulse', duration: 3800, delay: 1500, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'badge-num', type: 'text', content: '7折', fontFamily: { $t: 'fonts.heading' }, fontSize: 84, fontWeight: '500', color: { $t: 'colors.ink' }, letterSpacing: 2, lineHeight: 1.2, textAlign: 'center', x: 750, y: 870, width: 190, height: 120, zIndex: 9, animation: { name: 'fadeInUp', duration: 800, delay: 920 }, editable: { content: true } },
      { id: 'badge-cap', type: 'text', content: '会员专享', fontFamily: { $t: 'fonts.body' }, fontSize: 22, color: { $t: 'colors.muted' }, letterSpacing: 4, lineHeight: 1.2, textAlign: 'center', x: 750, y: 990, width: 190, height: 34, zIndex: 9, animation: { name: 'fadeIn', duration: 600, delay: 1000 }, editable: { content: true } },
      // ── 金箔长横条：压在页脚条款上方（流光）───────────────────
      { id: 'foil-rule', type: 'overlay', background: FOIL, borderRadius: 2, opacity: 0.95, x: 160, y: 1060, width: 760, height: 4, zIndex: 6, animation: { name: 'shimmer', duration: 3200, delay: 1300, iterationCount: 'infinite', easing: 'ease-in-out' } },
      // ── 页脚：条款与日期 / 右对齐场次编号 ─────────────────────
      { id: 'terms', type: 'text', content: '条款：会员价不可与优惠券叠加，部分限定色不参与\n活动日期 2026.10.18 — 10.25 · 全国门店及线上同步', fontFamily: { $t: 'fonts.body' }, fontSize: 22, color: { $t: 'colors.muted' }, letterSpacing: 0.5, lineHeight: 1.7, x: 160, y: 1090, width: 760, height: 110, zIndex: 6, animation: { name: 'fadeIn', duration: 760, delay: 1080 }, editable: { content: true } },
      { id: 'foot-mark', type: 'text', content: 'JIN GUI · MEMBER WEEK', fontFamily: { $t: 'fonts.latin' }, fontSize: 22, color: { $t: 'colors.muted' }, letterSpacing: 4, lineHeight: 1.2, textAlign: 'right', x: 520, y: 1190, width: 420, height: 34, zIndex: 6, animation: { name: 'fadeIn', duration: 700, delay: 1160 }, editable: { content: true } },
      // ── 暗部颗粒：极淡，soft-light 叠在深底上 ─────────────────
      { id: 'grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1350, background: `url("${grainSoft(300, 17, 0.5)}")`, opacity: 0.1, mixBlendMode: 'soft-light', zIndex: 10 }
    ]
  }
]

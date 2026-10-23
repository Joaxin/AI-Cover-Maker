// src/core/templates/magazine/st-letterpress.ts
// ST 署名批 → 杂志风（magazine）｜ 压印字体 Letterpress Deboss（1080×1350 竖版）
// 审美：暖白纸面上被压凹的深墨字样，offsetY:2/blur:0 的极淡暗边模拟凹凸；哑光、无光泽、无渐变。
import type { Template } from '@/types/types'
import { SERIF, SONG, IMPACT, HEI, SANS, MONO, grainSoft } from '../_fx/trend'

export const stLetterpressTemplates: Template[] = [
  {
    id: 'st-letterpress', name: '压印字体 · 纸面凹印', version: '1.0.0', category: 'magazine',
    tags: ['st', 'letterpress', 'print', 'typography', 'paper', '4:5', 'deboss', 'magazine', 'minimal'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="125" viewBox="0 0 100 125"><rect width="100" height="125" fill="%23F7F2E7"/><rect x="6" y="6" width="88" height="113" fill="none" stroke="%2326211B" stroke-width="1.4" opacity="0.5"/><rect x="11" y="11" width="78" height="103" fill="none" stroke="%2326211B" stroke-width="0.6" opacity="0.35"/><circle cx="6" cy="6" r="1.6" fill="%238C3A2E"/><circle cx="94" cy="6" r="1.6" fill="%238C3A2E"/><circle cx="6" cy="119" r="1.6" fill="%238C3A2E"/><circle cx="94" cy="119" r="1.6" fill="%238C3A2E"/><rect x="17" y="22" width="30" height="2" fill="%2326211B" opacity="0.55"/><rect x="17" y="34" width="52" height="10" fill="%2326211B" opacity="0.9"/><rect x="17" y="54" width="16" height="2.5" fill="%2326211B" opacity="0.85"/><rect x="17" y="63" width="40" height="3" fill="%2326211B" opacity="0.6"/><rect x="17" y="72" width="48" height="2" fill="%2326211B" opacity="0.4"/><rect x="17" y="88" width="20" height="2.5" fill="%2326211B" opacity="0.75"/><rect x="17" y="95" width="15" height="2" fill="%2326211B" opacity="0.45"/><rect x="41" y="88" width="20" height="2.5" fill="%2326211B" opacity="0.75"/><rect x="41" y="95" width="15" height="2" fill="%2326211B" opacity="0.45"/><rect x="65" y="88" width="20" height="2.5" fill="%2326211B" opacity="0.75"/><rect x="65" y="95" width="15" height="2" fill="%2326211B" opacity="0.45"/><rect x="17" y="110" width="66" height="0.8" fill="%2326211B" opacity="0.5"/><rect x="17" y="114" width="22" height="1.6" fill="%2326211B" opacity="0.5"/><rect x="61" y="114" width="22" height="1.6" fill="%2326211B" opacity="0.4"/></svg>',
    tokens: {
      colors: {
        bg: { label: '纸底', default: '#F7F2E7', options: ['#F7F2E7', '#F3EDDF', '#EFEAE0', '#E9E4D6'] },
        ink: { label: '墨色', default: '#26211B', options: ['#26211B', '#1F1B16', '#2E2A22', '#191714'] },
        muted: { label: '弱墨', default: 'rgba(38,33,27,0.66)', options: ['rgba(38,33,27,0.66)', 'rgba(31,27,22,0.66)', 'rgba(46,42,34,0.66)', 'rgba(25,23,20,0.66)'] },
        rule: { label: '细线', default: 'rgba(38,33,27,0.38)', options: ['rgba(38,33,27,0.38)', 'rgba(31,27,22,0.38)', 'rgba(46,42,34,0.38)', 'rgba(25,23,20,0.38)'] },
        accent: { label: '印泥', default: '#8C3A2E', options: ['#8C3A2E', '#6E4A2F', '#3E5A50', '#4A4E8C'] },
        deboss: { label: '压凹影', default: 'rgba(38,33,27,0.24)', options: ['rgba(38,33,27,0.24)', 'rgba(31,27,22,0.24)', 'rgba(46,42,34,0.24)', 'rgba(25,23,20,0.24)'] }
      },
      fonts: {
        display: { label: '标题衬线', default: SERIF, options: [SERIF, SONG, IMPACT] },
        cjk: { label: '中文', default: HEI, options: [HEI, SONG, SANS] },
        label: { label: '小字等宽', default: MONO, options: [MONO, SANS, SERIF] }
      }
    },
    presets: [
      { name: '纸白墨黑', colors: { bg: '#F7F2E7', ink: '#26211B', muted: 'rgba(38,33,27,0.66)', rule: 'rgba(38,33,27,0.38)', accent: '#8C3A2E', deboss: 'rgba(38,33,27,0.24)' } },
      { name: '米杏深咖', colors: { bg: '#F3EDDF', ink: '#1F1B16', muted: 'rgba(31,27,22,0.66)', rule: 'rgba(31,27,22,0.38)', accent: '#6E4A2F', deboss: 'rgba(31,27,22,0.24)' } },
      { name: '灰白炭墨', colors: { bg: '#EFEAE0', ink: '#2E2A22', muted: 'rgba(46,42,34,0.66)', rule: 'rgba(46,42,34,0.38)', accent: '#3E5A50', deboss: 'rgba(46,42,34,0.24)' } },
      { name: '冷青藏蓝', colors: { bg: '#E9E4D6', ink: '#191714', muted: 'rgba(25,23,20,0.66)', rule: 'rgba(25,23,20,0.38)', accent: '#4A4E8C', deboss: 'rgba(25,23,20,0.24)' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      // 双线细框：外层 84 留白，内层稍小，细 border + 透明填充
      { id: 'st-lp-frame-outer', type: 'shape', shapeKind: 'rect', x: 84, y: 84, width: 912, height: 1182, fill: 'transparent', border: { width: 2, color: { $t: 'colors.rule' } }, opacity: 0.55, zIndex: 2, animation: { name: 'fadeIn', duration: 800 } },
      { id: 'st-lp-frame-inner', type: 'shape', shapeKind: 'rect', x: 100, y: 100, width: 880, height: 1150, fill: 'transparent', border: { width: 1, color: { $t: 'colors.rule' } }, opacity: 0.4, zIndex: 2, animation: { name: 'fadeIn', duration: 900, delay: 100 } },
      // 四角定位点（印刷感）
      { id: 'st-lp-dot-tl', type: 'shape', shapeKind: 'circle', x: 80, y: 80, width: 8, height: 8, fill: { $t: 'colors.accent' }, opacity: 0.9, zIndex: 3, animation: { name: 'fadeIn', duration: 400, delay: 250 } },
      { id: 'st-lp-dot-tr', type: 'shape', shapeKind: 'circle', x: 992, y: 80, width: 8, height: 8, fill: { $t: 'colors.accent' }, opacity: 0.9, zIndex: 3, animation: { name: 'fadeIn', duration: 400, delay: 300 } },
      { id: 'st-lp-dot-bl', type: 'shape', shapeKind: 'circle', x: 80, y: 1262, width: 8, height: 8, fill: { $t: 'colors.accent' }, opacity: 0.9, zIndex: 3, animation: { name: 'fadeIn', duration: 400, delay: 350 } },
      { id: 'st-lp-dot-br', type: 'shape', shapeKind: 'circle', x: 992, y: 1262, width: 8, height: 8, fill: { $t: 'colors.accent' }, opacity: 0.9, zIndex: 3, animation: { name: 'fadeIn', duration: 400, delay: 400 } },
      // 框内上部：小字号大 letterSpacing 英文 kicker（ST 标记其一）
      { id: 'st-lp-kicker', type: 'text', content: 'ST PRESS · VOL.02', fontFamily: { $t: 'fonts.label' }, fontSize: 24, fontWeight: '500', color: { $t: 'colors.muted' }, letterSpacing: 6, lineHeight: 1.2, x: 130, y: 140, width: 600, height: 40, zIndex: 5, animation: { name: 'fadeIn', duration: 600, delay: 150 }, editable: { content: true } },
      // 主标题重影：同字错开 11px，8% 透明度，模拟二重压印的深浅差
      { id: 'st-lp-title-ghost', type: 'text', content: 'IMPRINT', fontFamily: { $t: 'fonts.display' }, fontSize: 120, fontWeight: '400', color: { $t: 'colors.ink' }, opacity: 0.08, letterSpacing: 6, lineHeight: 1.2, x: 141, y: 214, width: 800, height: 170, zIndex: 4, animation: { name: 'fadeIn', duration: 1200, delay: 500 } },
      // 中部：大号压印主标题（深墨 + offsetY:2/blur:0 极淡暗边 = 纸面压下）
      { id: 'st-lp-title', type: 'text', content: 'IMPRINT', fontFamily: { $t: 'fonts.display' }, fontSize: 140, fontWeight: '700', color: { $t: 'colors.ink' }, letterSpacing: 6, lineHeight: 1.2, shadow: { offsetX: 0, offsetY: 2, blur: 0, color: { $t: 'colors.deboss' } }, x: 130, y: 210, width: 850, height: 190, zIndex: 6, animation: { name: 'inkReveal', duration: 900, delay: 300 }, editable: { content: true, fontSize: { type: 'range', min: 90, max: 150 } } },
      // 标题下方：短的中等粗细线
      { id: 'st-lp-title-rule', type: 'shape', shapeKind: 'rect', x: 130, y: 392, width: 120, height: 4, fill: { $t: 'colors.ink' }, opacity: 0.85, zIndex: 3, animation: { name: 'slideInLeft', duration: 700, delay: 650 } },
      // 议程式中文副题（摆在标题墨迹之外，留 ≥30px 间隙）
      { id: 'st-lp-subtitle', type: 'text', content: '每一次压印，都是慢的', fontFamily: { $t: 'fonts.cjk' }, fontSize: 36, fontWeight: '500', color: { $t: 'colors.ink' }, letterSpacing: 4, lineHeight: 1.2, shadow: { offsetX: 0, offsetY: 1, blur: 0, color: { $t: 'colors.deboss' } }, x: 130, y: 415, width: 700, height: 60, zIndex: 6, animation: { name: 'fadeInUp', duration: 700, delay: 750 }, editable: { content: true } },
      { id: 'st-lp-subtitle-en', type: 'text', content: 'SLOW PRESS · DEEP IMPRESSION', fontFamily: { $t: 'fonts.label' }, fontSize: 20, fontWeight: '400', color: { $t: 'colors.muted' }, letterSpacing: 4, lineHeight: 1.4, x: 130, y: 482, width: 700, height: 36, zIndex: 5, animation: { name: 'fadeIn', duration: 600, delay: 900 }, editable: { content: true } },
      // 下部：横向三栏小信息块（三栏文字统一 x 档位，极淡竖线分隔）
      { id: 'st-lp-col1-title', type: 'text', content: '纸上凹版', fontFamily: { $t: 'fonts.cjk' }, fontSize: 28, fontWeight: '600', color: { $t: 'colors.ink' }, letterSpacing: 2, lineHeight: 1.3, shadow: { offsetX: 0, offsetY: 1, blur: 0, color: { $t: 'colors.deboss' } }, x: 130, y: 575, width: 246, height: 44, zIndex: 6, animation: { name: 'fadeInUp', duration: 600, delay: 1000 }, editable: { content: true } },
      { id: 'st-lp-col1-desc', type: 'text', content: '纸纤维里\n藏着力道', fontFamily: { $t: 'fonts.cjk' }, fontSize: 24, fontWeight: '400', color: { $t: 'colors.muted' }, lineHeight: 1.5, x: 130, y: 625, width: 246, height: 90, zIndex: 6, animation: { name: 'fadeIn', duration: 600, delay: 1100 }, editable: { content: true } },
      { id: 'st-lp-col2-title', type: 'text', content: '慢工压印', fontFamily: { $t: 'fonts.cjk' }, fontSize: 28, fontWeight: '600', color: { $t: 'colors.ink' }, letterSpacing: 2, lineHeight: 1.3, shadow: { offsetX: 0, offsetY: 1, blur: 0, color: { $t: 'colors.deboss' } }, x: 416, y: 575, width: 246, height: 44, zIndex: 6, animation: { name: 'fadeInUp', duration: 600, delay: 1080 }, editable: { content: true } },
      { id: 'st-lp-col2-desc', type: 'text', content: '一次成色\n不疾不徐', fontFamily: { $t: 'fonts.cjk' }, fontSize: 24, fontWeight: '400', color: { $t: 'colors.muted' }, lineHeight: 1.5, x: 416, y: 625, width: 246, height: 90, zIndex: 6, animation: { name: 'fadeIn', duration: 600, delay: 1180 }, editable: { content: true } },
      { id: 'st-lp-col3-title', type: 'text', content: '编号限量', fontFamily: { $t: 'fonts.cjk' }, fontSize: 28, fontWeight: '600', color: { $t: 'colors.ink' }, letterSpacing: 2, lineHeight: 1.3, shadow: { offsetX: 0, offsetY: 1, blur: 0, color: { $t: 'colors.deboss' } }, x: 702, y: 575, width: 248, height: 44, zIndex: 6, animation: { name: 'fadeInUp', duration: 600, delay: 1160 }, editable: { content: true } },
      { id: 'st-lp-col3-desc', type: 'text', content: '手工装订\n各得其所', fontFamily: { $t: 'fonts.cjk' }, fontSize: 24, fontWeight: '400', color: { $t: 'colors.muted' }, lineHeight: 1.5, x: 702, y: 625, width: 248, height: 90, zIndex: 6, animation: { name: 'fadeIn', duration: 600, delay: 1260 }, editable: { content: true } },
      { id: 'st-lp-div1', type: 'shape', shapeKind: 'line', x: 396, y: 572, width: 1, height: 128, fill: { $t: 'colors.rule' }, opacity: 0.35, zIndex: 3, animation: { name: 'fadeIn', duration: 500, delay: 1000 } },
      { id: 'st-lp-div2', type: 'shape', shapeKind: 'line', x: 682, y: 572, width: 1, height: 128, fill: { $t: 'colors.rule' }, opacity: 0.35, zIndex: 3, animation: { name: 'fadeIn', duration: 500, delay: 1080 } },
      // 右下：藏书票印章（双圈 + ST 印泥字）
      { id: 'st-lp-seal-ring', type: 'shape', shapeKind: 'circle', x: 795, y: 865, width: 170, height: 170, fill: 'transparent', border: { width: 1.5, color: { $t: 'colors.rule' } }, opacity: 0.8, zIndex: 6, animation: { name: 'zoomIn', duration: 700, delay: 1300 } },
      { id: 'st-lp-seal-ring2', type: 'shape', shapeKind: 'circle', x: 807, y: 877, width: 146, height: 146, fill: 'transparent', border: { width: 1, color: { $t: 'colors.rule' } }, opacity: 0.5, zIndex: 6, animation: { name: 'zoomIn', duration: 700, delay: 1380 } },
      { id: 'st-lp-seal-st', type: 'text', content: 'ST', fontFamily: { $t: 'fonts.display' }, fontSize: 48, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 2, textAlign: 'center', lineHeight: 1.1, shadow: { offsetX: 0, offsetY: 1, blur: 0, color: { $t: 'colors.deboss' } }, x: 795, y: 908, width: 170, height: 58, zIndex: 6, animation: { name: 'fadeIn', duration: 500, delay: 1500 }, editable: { content: true } },
      { id: 'st-lp-seal-no', type: 'text', content: 'PRESS · No.02', fontFamily: { $t: 'fonts.label' }, fontSize: 15, fontWeight: '400', color: { $t: 'colors.muted' }, letterSpacing: 2, textAlign: 'center', lineHeight: 1.2, x: 795, y: 972, width: 170, height: 26, zIndex: 6, animation: { name: 'fadeIn', duration: 500, delay: 1600 }, editable: { content: true } },
      // 底部：细横线 + 机构名 + ST 小标记
      { id: 'st-lp-bottom-rule', type: 'shape', shapeKind: 'line', x: 130, y: 1120, width: 820, height: 1, fill: { $t: 'colors.rule' }, opacity: 0.5, zIndex: 3, animation: { name: 'slideInLeft', duration: 600, delay: 1400 } },
      { id: 'st-lp-mark', type: 'text', content: 'ST PRESS · VOL.02', fontFamily: { $t: 'fonts.label' }, fontSize: 18, fontWeight: '400', color: { $t: 'colors.muted' }, letterSpacing: 4, lineHeight: 1.2, x: 130, y: 1148, width: 420, height: 34, zIndex: 5, animation: { name: 'fadeIn', duration: 500, delay: 1500 }, editable: { content: true } },
      { id: 'st-lp-copy', type: 'text', content: '© MMXXVI · 纸上压印', fontFamily: { $t: 'fonts.cjk' }, fontSize: 18, fontWeight: '400', color: { $t: 'colors.muted' }, letterSpacing: 3, textAlign: 'right', lineHeight: 1.2, x: 620, y: 1148, width: 330, height: 34, zIndex: 5, animation: { name: 'fadeIn', duration: 500, delay: 1580 }, editable: { content: true } },
      // 纸纤维：极淡噪点，哑光关键（不做任何彩色渐变）
      { id: 'st-lp-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1350, background: `url("${grainSoft(320, 11, 0.5)}")`, opacity: 0.05, mixBlendMode: 'multiply', zIndex: 9 }
    ]
  }
]

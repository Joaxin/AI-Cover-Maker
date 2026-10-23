// src/core/templates/game/hy-game-extra.ts —— game 分类第二批（2 个 · 独立游戏安利 + 手游抽卡实录）
// 口径：安利向（深色彩色卡带盒 + 评分 + 标签 pill）/ 抽卡实录（4:5 鎏金 + 五连卡位 + 出货统计）。
// 与 game-covers.ts 四套刻意错开：那批是「整条 HUD 带」「纸面攻略清单」「横向结算面板」「舞台聚光记分条」，
// 本批走「盒装封面陈列」与「卡池金光」两条新骨架。
// 规范：颜色全走 token；每套 4 组预设；1920×1080 与 1080×1350 的 virtual 与 default 同值。
import type { Template } from '@/types/types'
import { HEI, SONG, MONO, IMPACT, SANS } from '../_fx/trend'
import { dotsBg } from '../knowledge/_decor'
import { svgUri } from '../_fx/common'

export const hyGameExtraTemplates: Template[] = [
  // 1. 独立游戏安利封面 —— 盒装封面陈列：左侧标题组 + 右侧斜置卡带盒 + NEW 角标
  {
    id: 'hy-game-indie', name: '独立游戏安利封面', version: '1.0.0', category: 'game',
    tags: ['hy', 'game', 'indie', '推荐', '16:9'],
    thumbnail: svgUri('<rect width="160" height="90" fill="%23171122"/><rect x="8" y="8" width="46" height="4" rx="2" fill="%23FF8A3D"/><rect x="8" y="17" width="62" height="12" rx="1" fill="%23F6EFE3"/><rect x="8" y="33" width="48" height="12" rx="1" fill="%23F6EFE3" opacity="0.75"/><rect x="8" y="52" width="34" height="5" rx="2" fill="%23FF8A3D"/><rect x="8" y="66" width="30" height="9" rx="4" fill="none" stroke="%238B6BFF" stroke-width="1.5"/><g transform="rotate(-4 108 48)"><rect x="82" y="14" width="56" height="64" rx="5" fill="none" stroke="%239C93B8" stroke-width="1.5"/><rect x="90" y="26" width="40" height="8" rx="1" fill="%23F6EFE3"/><rect x="96" y="40" width="28" height="3" rx="1" fill="%238B6BFF"/><rect x="90" y="52" width="40" height="14" rx="2" fill="%23FF8A3D"/></g><circle cx="140" cy="12" r="9" fill="%23FF8A3D"/>', 160, 90),
    tokens: {
      colors: {
        bg: { label: '底色', default: '#171122', options: ['#171122', '#101A18', '#1C1420', '#0F1626'] },
        ink: { label: '主文字', default: '#F6EFE3', options: ['#F6EFE3', '#EAF3EA', '#F6E9EC', '#E8EFFA'] },
        accent: { label: '强调橙', default: '#FF8A3D', options: ['#FF8A3D', '#3FBF8F', '#FF6B9A', '#5B9BFF'] },
        accent2: { label: '次强调', default: '#8B6BFF', options: ['#8B6BFF', '#2FA98C', '#C85C8A', '#4A7FD0'] },
        dim: { label: '弱文字', default: '#9C93B8', options: ['#9C93B8', '#7E9A8C', '#A98C96', '#8496B0'] }
      },
      fonts: { heading: { label: '标题字体', default: HEI, options: [HEI, SONG] } }
    },
    presets: [
      { name: '暮光紫橙', colors: { bg: '#171122', ink: '#F6EFE3', accent: '#FF8A3D', accent2: '#8B6BFF', dim: '#9C93B8' } },
      { name: '苔原薄荷', colors: { bg: '#101A18', ink: '#EAF3EA', accent: '#3FBF8F', accent2: '#2FA98C', dim: '#7E9A8C' } },
      { name: '樱夜粉黛', colors: { bg: '#1C1420', ink: '#F6E9EC', accent: '#FF6B9A', accent2: '#C85C8A', dim: '#A98C96' } },
      { name: '深空蓝调', colors: { bg: '#0F1626', ink: '#E8EFFA', accent: '#5B9BFF', accent2: '#4A7FD0', dim: '#8496B0' } }
    ],
    canvas: { virtualWidth: 1920, virtualHeight: 1080, defaultWidth: 1920, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'gi-glow', type: 'overlay', background: 'radial-gradient(62% 52% at 22% 18%, rgba(255,138,61,0.30) 0%, rgba(255,138,61,0) 70%)', mixBlendMode: 'screen', opacity: 0.9, x: 0, y: 0, width: 1920, height: 1080, zIndex: 1 },
      { id: 'gi-dots', type: 'image', src: dotsBg(1920, 1080, 56, 'rgba(255,255,255,0.05)'), x: 0, y: 0, width: 1920, height: 1080, objectFit: 'fill', zIndex: 1 },
      { id: 'gi-ring', type: 'shape', shapeKind: 'circle', x: 1150, y: 70, width: 740, height: 740, border: { width: 3, color: { $t: 'colors.accent2' } }, opacity: 0.28, zIndex: 2, animation: { name: 'spinSlow', duration: 26000, iterationCount: 'infinite', easing: 'linear' } },
      { id: 'gi-no', type: 'text', content: 'NO. HY-07', fontFamily: MONO, fontSize: 24, fontWeight: 700, letterSpacing: 6, color: { $t: 'colors.accent2' }, opacity: 0.75, x: 120, y: 56, width: 420, height: 34, zIndex: 4 },
      { id: 'gi-kicker', type: 'text', content: 'INDIE GEM · 本周私藏', fontFamily: MONO, fontSize: 30, fontWeight: 700, letterSpacing: 6, color: { $t: 'colors.accent' }, x: 120, y: 140, width: 820, height: 44, zIndex: 4, animation: { name: 'fadeIn', duration: 420 }, editable: { content: true } },
      { id: 'gi-title', type: 'text', content: '这款独立游戏\n把我留在了周末', fontFamily: { $t: 'fonts.heading' }, fontSize: 140, fontWeight: 900, lineHeight: 1.16, color: { $t: 'colors.ink' }, x: 120, y: 250, width: 1000, height: 380, zIndex: 5, animation: { name: 'fadeInUp', duration: 520, delay: 130 }, editable: { content: true, fontSize: { type: 'range', min: 100, max: 160 } } },
      { id: 'gi-rule', type: 'shape', shapeKind: 'rect', x: 120, y: 660, width: 460, height: 10, borderRadius: 5, fill: { $t: 'colors.accent' }, zIndex: 4, animation: { name: 'slideInLeft', duration: 520, delay: 260 } },
      { id: 'gi-sub', type: 'text', content: '手绘像素 · 叙事驱动 · 5 小时通关', fontFamily: HEI, fontSize: 40, color: { $t: 'colors.dim' }, x: 120, y: 700, width: 900, height: 60, zIndex: 4, animation: { name: 'fadeInUp', duration: 480, delay: 200 }, editable: { content: true } },
      { id: 'gi-p1', group: 'gi-p', type: 'shape', shapeKind: 'rect', x: 120, y: 840, width: 200, height: 60, borderRadius: 30, border: { width: 2, color: { $t: 'colors.accent' } }, zIndex: 4 },
      { id: 'gi-p1-t', type: 'text', content: '#手绘叙事', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.accent' }, textAlign: 'center', x: 120, y: 857, width: 200, height: 40, zIndex: 5, editable: { content: true } },
      { id: 'gi-p2', group: 'gi-p', type: 'shape', shapeKind: 'rect', x: 340, y: 840, width: 200, height: 60, borderRadius: 30, border: { width: 2, color: { $t: 'colors.accent2' } }, zIndex: 4 },
      { id: 'gi-p2-t', type: 'text', content: '#像素美术', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.accent2' }, textAlign: 'center', x: 340, y: 857, width: 200, height: 40, zIndex: 5, editable: { content: true } },
      { id: 'gi-p3', group: 'gi-p', type: 'shape', shapeKind: 'rect', x: 560, y: 840, width: 200, height: 60, borderRadius: 30, border: { width: 2, color: { $t: 'colors.dim' } }, zIndex: 4 },
      { id: 'gi-p3-t', type: 'text', content: '#治愈致郁', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.dim' }, textAlign: 'center', x: 560, y: 857, width: 200, height: 40, zIndex: 5, editable: { content: true } },
      { id: 'gi-cart', type: 'shape', shapeKind: 'rect', x: 1240, y: 180, width: 560, height: 760, borderRadius: 28, fill: 'rgba(255,255,255,0.05)', border: { width: 2, color: { $t: 'colors.dim' } }, rotation: -4, shadow: { offsetX: 0, offsetY: 18, blur: 48, color: 'rgba(0,0,0,0.45)' }, zIndex: 3 },
      { id: 'gi-cart-t', type: 'text', content: '星穗谷物语', fontFamily: { $t: 'fonts.heading' }, fontSize: 76, fontWeight: 900, color: { $t: 'colors.ink' }, textAlign: 'center', x: 1240, y: 280, width: 560, height: 100, zIndex: 4, editable: { content: true } },
      { id: 'gi-cart-en', type: 'text', content: 'STARSPIKE TALES', fontFamily: MONO, fontSize: 24, letterSpacing: 4, color: { $t: 'colors.accent2' }, textAlign: 'center', x: 1240, y: 470, width: 560, height: 36, zIndex: 4, editable: { content: true } },
      { id: 'gi-cart-line', type: 'shape', shapeKind: 'line', x: 1300, y: 560, width: 440, height: 2, fill: { $t: 'colors.accent' }, opacity: 0.5, zIndex: 4 },
      { id: 'gi-score', type: 'text', content: '9.2', fontFamily: IMPACT, fontSize: 110, color: { $t: 'colors.accent' }, textAlign: 'center', x: 1240, y: 590, width: 560, height: 130, zIndex: 4, editable: { content: true } },
      { id: 'gi-score-t', type: 'text', content: '编辑推荐 · 满分 10', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.dim' }, textAlign: 'center', x: 1240, y: 870, width: 560, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'gi-badge', type: 'shape', shapeKind: 'rect', x: 1700, y: 150, width: 180, height: 64, borderRadius: 32, fill: { $t: 'colors.accent' }, zIndex: 6 },
      { id: 'gi-badge-t', type: 'text', content: 'NEW', fontFamily: IMPACT, fontSize: 34, color: { $t: 'colors.bg' }, textAlign: 'center', x: 1700, y: 168, width: 180, height: 44, zIndex: 7 },
      { id: 'gi-cart-deco', type: 'shape', shapeKind: 'circle', x: 1180, y: 560, width: 80, height: 80, fill: { $t: 'colors.accent2' }, opacity: 0.5, zIndex: 4, animation: { name: 'float', duration: 4200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'gi-note', type: 'text', content: 'HY · GAME NOTE', fontFamily: MONO, fontSize: 22, letterSpacing: 4, color: { $t: 'colors.accent2' }, opacity: 0.6, x: 1560, y: 1000, width: 320, height: 32, zIndex: 4 },
      { id: 'gi-scan', type: 'overlay', background: 'repeating-linear-gradient(0deg, transparent 0 3px, rgba(0,0,0,0.12) 3px 4px)', opacity: 0.5, x: 0, y: 0, width: 1920, height: 1080, zIndex: 8 }
    ]
  },

  // 2. 手游抽卡实录封面 —— 卡池金光：4:5 竖版 + 五连卡位 + 出货统计胶囊
  {
    id: 'hy-game-gacha', name: '手游抽卡实录封面', version: '1.0.0', category: 'game',
    tags: ['hy', 'game', 'gacha', '抽卡', '手游', '4:5'],
    thumbnail: svgUri('<rect width="100" height="125" fill="%231B1030"/><rect x="10" y="12" width="34" height="4" rx="2" fill="%23F5C542"/><rect x="10" y="22" width="44" height="13" rx="1" fill="%23F6EFE3"/><rect x="10" y="40" width="36" height="13" rx="1" fill="%23F6EFE3" opacity="0.75"/><g><rect x="10" y="66" width="14" height="26" rx="2" fill="%23F5C542" opacity="0.35"/><rect x="26" y="66" width="14" height="26" rx="2" fill="none" stroke="%23A99BC8" stroke-width="1"/><rect x="42" y="66" width="14" height="26" rx="2" fill="%23F5C542" opacity="0.35"/><rect x="58" y="66" width="14" height="26" rx="2" fill="none" stroke="%23A99BC8" stroke-width="1"/><rect x="74" y="66" width="14" height="26" rx="2" fill="%23F5C542" opacity="0.35"/></g><rect x="10" y="102" width="26" height="8" rx="3" fill="none" stroke="%23A99BC8" stroke-width="1"/><text x="13" y="108" font-family="sans-serif" font-size="5" fill="%23A99BC8">1,247</text>', 100, 125),
    tokens: {
      colors: {
        bg: { label: '底色', default: '#1B1030', options: ['#1B1030', '#12202A', '#241026', '#0E1B2E'] },
        ink: { label: '主文字', default: '#F6EFE3', options: ['#F6EFE3', '#E9F4F6', '#F6E9F0', '#EAF0FA'] },
        accent: { label: '鎏金', default: '#F5C542', options: ['#F5C542', '#4EC3D9', '#FF7AA8', '#6FA8FF'] },
        accent2: { label: '次强调', default: '#8B6BFF', options: ['#8B6BFF', '#3FA8B5', '#D65C8E', '#5A86D6'] },
        dim: { label: '弱文字', default: '#A99BC8', options: ['#A99BC8', '#7FA3AE', '#B593A8', '#8A9AB8'] }
      },
      fonts: { heading: { label: '标题字体', default: HEI, options: [HEI, SONG] } }
    },
    presets: [
      { name: '鎏金夜紫', colors: { bg: '#1B1030', ink: '#F6EFE3', accent: '#F5C542', accent2: '#8B6BFF', dim: '#A99BC8' } },
      { name: '冰湖青蓝', colors: { bg: '#12202A', ink: '#E9F4F6', accent: '#4EC3D9', accent2: '#3FA8B5', dim: '#7FA3AE' } },
      { name: '樱色糖霜', colors: { bg: '#241026', ink: '#F6E9F0', accent: '#FF7AA8', accent2: '#D65C8E', dim: '#B593A8' } },
      { name: '星轨蓝', colors: { bg: '#0E1B2E', ink: '#EAF0FA', accent: '#6FA8FF', accent2: '#5A86D6', dim: '#8A9AB8' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'gc-glow', type: 'overlay', background: 'radial-gradient(52% 42% at 50% 28%, rgba(245,197,66,0.32) 0%, rgba(245,197,66,0) 70%)', mixBlendMode: 'screen', opacity: 0.9, x: 0, y: 0, width: 1080, height: 1350, zIndex: 1 },
      { id: 'gc-dots', type: 'image', src: dotsBg(1080, 1350, 40, 'rgba(255,255,255,0.05)'), x: 0, y: 0, width: 1080, height: 1350, objectFit: 'fill', zIndex: 1 },
      { id: 'gc-kicker', type: 'text', content: 'GACHA LOG · 第 37 期', fontFamily: MONO, fontSize: 26, fontWeight: 700, letterSpacing: 6, color: { $t: 'colors.accent' }, x: 88, y: 90, width: 760, height: 40, zIndex: 4, animation: { name: 'fadeIn', duration: 420 }, editable: { content: true } },
      { id: 'gc-title', type: 'text', content: '十连双金\n欧气时刻', fontFamily: { $t: 'fonts.heading' }, fontSize: 132, fontWeight: 900, lineHeight: 1.16, color: { $t: 'colors.ink' }, x: 88, y: 160, width: 900, height: 360, zIndex: 5, animation: { name: 'fadeInUp', duration: 520, delay: 130 }, editable: { content: true, fontSize: { type: 'range', min: 100, max: 150 } } },
      { id: 'gc-rule', type: 'shape', shapeKind: 'rect', x: 88, y: 500, width: 380, height: 8, borderRadius: 4, fill: { $t: 'colors.accent' }, zIndex: 4 },
      { id: 'gc-sub', type: 'text', content: '存了三个月的资源，一朝回本', fontFamily: HEI, fontSize: 36, color: { $t: 'colors.dim' }, x: 88, y: 540, width: 820, height: 54, zIndex: 4, animation: { name: 'fadeInUp', duration: 480, delay: 200 }, editable: { content: true } },
      { id: 'gc-card1', group: 'gc-card', type: 'shape', shapeKind: 'rect', x: 50, y: 680, width: 180, height: 300, borderRadius: 16, fill: 'rgba(245,197,66,0.14)', border: { width: 3, color: { $t: 'colors.accent' } }, zIndex: 3 },
      { id: 'gc-card1-t', type: 'text', content: 'SSR', fontFamily: MONO, fontSize: 22, fontWeight: 700, color: { $t: 'colors.accent' }, textAlign: 'center', x: 50, y: 920, width: 180, height: 32, zIndex: 4, editable: { content: true } },
      { id: 'gc-card2', group: 'gc-card', type: 'shape', shapeKind: 'rect', x: 250, y: 680, width: 180, height: 300, borderRadius: 16, fill: 'rgba(255,255,255,0.06)', border: { width: 2, color: { $t: 'colors.dim' } }, zIndex: 3 },
      { id: 'gc-card2-t', type: 'text', content: 'SR', fontFamily: MONO, fontSize: 22, fontWeight: 700, color: { $t: 'colors.dim' }, textAlign: 'center', x: 250, y: 920, width: 180, height: 32, zIndex: 4, editable: { content: true } },
      { id: 'gc-card3', group: 'gc-card', type: 'shape', shapeKind: 'rect', x: 450, y: 680, width: 180, height: 300, borderRadius: 16, fill: 'rgba(245,197,66,0.14)', border: { width: 3, color: { $t: 'colors.accent' } }, zIndex: 3 },
      { id: 'gc-card3-t', type: 'text', content: 'SSR', fontFamily: MONO, fontSize: 22, fontWeight: 700, color: { $t: 'colors.accent' }, textAlign: 'center', x: 450, y: 920, width: 180, height: 32, zIndex: 4, editable: { content: true } },
      { id: 'gc-card4', group: 'gc-card', type: 'shape', shapeKind: 'rect', x: 650, y: 680, width: 180, height: 300, borderRadius: 16, fill: 'rgba(255,255,255,0.06)', border: { width: 2, color: { $t: 'colors.dim' } }, zIndex: 3 },
      { id: 'gc-card4-t', type: 'text', content: 'SR', fontFamily: MONO, fontSize: 22, fontWeight: 700, color: { $t: 'colors.dim' }, textAlign: 'center', x: 650, y: 920, width: 180, height: 32, zIndex: 4, editable: { content: true } },
      { id: 'gc-card5', group: 'gc-card', type: 'shape', shapeKind: 'rect', x: 850, y: 680, width: 180, height: 300, borderRadius: 16, fill: 'rgba(245,197,66,0.14)', border: { width: 3, color: { $t: 'colors.accent' } }, zIndex: 3 },
      { id: 'gc-card5-t', type: 'text', content: 'SSR', fontFamily: MONO, fontSize: 22, fontWeight: 700, color: { $t: 'colors.accent' }, textAlign: 'center', x: 850, y: 920, width: 180, height: 32, zIndex: 4, editable: { content: true } },
      { id: 'gc-sp1', group: 'gc-sp', type: 'shape', shapeKind: 'circle', x: 140, y: 636, width: 24, height: 24, fill: { $t: 'colors.accent' }, opacity: 0.85, zIndex: 4, animation: { name: 'twinkle', duration: 1800, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'gc-sp2', group: 'gc-sp', type: 'shape', shapeKind: 'circle', x: 920, y: 700, width: 18, height: 18, fill: { $t: 'colors.accent2' }, opacity: 0.8, zIndex: 4, animation: { name: 'twinkle', duration: 2200, delay: 400, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'gc-sp3', group: 'gc-sp', type: 'shape', shapeKind: 'circle', x: 520, y: 620, width: 14, height: 14, fill: { $t: 'colors.accent' }, opacity: 0.7, zIndex: 4, animation: { name: 'twinkle', duration: 1600, delay: 800, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'gc-s1', group: 'gc-s', type: 'shape', shapeKind: 'rect', x: 88, y: 1080, width: 280, height: 100, borderRadius: 20, fill: 'rgba(255,255,255,0.06)', zIndex: 4 },
      { id: 'gc-s1-k', type: 'text', content: '累计抽取', fontFamily: HEI, fontSize: 22, color: { $t: 'colors.dim' }, x: 104, y: 1092, width: 240, height: 30, zIndex: 5, editable: { content: true } },
      { id: 'gc-s1-v', type: 'text', content: '1,247 抽', fontFamily: IMPACT, fontSize: 42, color: { $t: 'colors.ink' }, x: 104, y: 1144, width: 240, height: 54, zIndex: 5, editable: { content: true } },
      { id: 'gc-s2', group: 'gc-s', type: 'shape', shapeKind: 'rect', x: 400, y: 1080, width: 280, height: 100, borderRadius: 20, fill: 'rgba(255,255,255,0.06)', zIndex: 4 },
      { id: 'gc-s2-k', type: 'text', content: '本月出货', fontFamily: HEI, fontSize: 22, color: { $t: 'colors.dim' }, x: 416, y: 1092, width: 240, height: 30, zIndex: 5, editable: { content: true } },
      { id: 'gc-s2-v', type: 'text', content: '17 金', fontFamily: IMPACT, fontSize: 42, color: { $t: 'colors.accent' }, x: 416, y: 1144, width: 240, height: 54, zIndex: 5, editable: { content: true } },
      { id: 'gc-s3', group: 'gc-s', type: 'shape', shapeKind: 'rect', x: 712, y: 1080, width: 280, height: 100, borderRadius: 20, fill: 'rgba(255,255,255,0.06)', zIndex: 4 },
      { id: 'gc-s3-k', type: 'text', content: '距保底', fontFamily: HEI, fontSize: 22, color: { $t: 'colors.dim' }, x: 728, y: 1092, width: 240, height: 30, zIndex: 5, editable: { content: true } },
      { id: 'gc-s3-v', type: 'text', content: '23 抽', fontFamily: IMPACT, fontSize: 42, color: { $t: 'colors.ink' }, x: 728, y: 1144, width: 240, height: 54, zIndex: 5, editable: { content: true } },
      { id: 'gc-star', type: 'text', content: '★', fontFamily: SANS, fontSize: 40, color: { $t: 'colors.accent' }, x: 88, y: 1252, width: 60, height: 56, zIndex: 5, animation: { name: 'pulse', duration: 2000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'gc-note', type: 'text', content: 'HY · GACHA LAB', fontFamily: MONO, fontSize: 20, letterSpacing: 4, color: { $t: 'colors.accent2' }, opacity: 0.6, x: 700, y: 1290, width: 320, height: 30, zIndex: 4 }
    ]
  },

  // 3. 新赛季速报封面 —— 竖屏公告：霓虹扫描线 + 新英雄立绘虚位 + 更新时间表
  {
    id: 'hy-game-patch', name: '新赛季速报封面', version: '1.0.0', category: 'game',
    tags: ['hy', 'game', 'patch', '赛季', '公告', '9:16'],
    thumbnail: svgUri('<rect width="100" height="178" fill="%230F1B2D"/><rect x="10" y="14" width="30" height="4" rx="2" fill="%23FFB03A"/><rect x="10" y="24" width="40" height="13" rx="1" fill="%23EAF2FA"/><rect x="10" y="42" width="32" height="13" rx="1" fill="%23EAF2FA" opacity="0.75"/><rect x="10" y="66" width="34" height="5" rx="2" fill="%2335D0FF"/><rect x="10" y="82" width="80" height="52" rx="4" fill="none" stroke="%237E93AC" stroke-width="1.5" stroke-dasharray="5 4"/><rect x="10" y="146" width="24" height="4" rx="2" fill="%237E93AC"/><rect x="10" y="156" width="46" height="4" rx="2" fill="%2335D0FF"/><rect x="10" y="166" width="36" height="4" rx="2" fill="%237E93AC"/><rect x="12" y="86" width="8" height="8" fill="none" stroke="%2335D0FF" stroke-width="1.5"/><rect x="80" y="86" width="8" height="8" fill="none" stroke="%2335D0FF" stroke-width="1.5"/>', 100, 178),
    tokens: {
      colors: {
        bg: { label: '底色', default: '#0F1B2D', options: ['#0F1B2D', '#221207', '#170F2B', '#0E1F1B'] },
        ink: { label: '主文字', default: '#EAF2FA', options: ['#EAF2FA', '#FBF0E4', '#F0EAFA', '#E9F5F0'] },
        accent: { label: '霓虹青', default: '#35D0FF', options: ['#35D0FF', '#FF7A2F', '#9B6BFF', '#3FD9A4'] },
        accent2: { label: '警示橙', default: '#FFB03A', options: ['#FFB03A', '#FFC53D', '#4FE0C0', '#FFD24A'] },
        dim: { label: '弱文字', default: '#7E93AC', options: ['#7E93AC', '#A88F76', '#8E84AC', '#7FA094'] }
      },
      fonts: { heading: { label: '标题字体', default: HEI, options: [HEI, SONG] } }
    },
    presets: [
      { name: '霓虹青夜', colors: { bg: '#0F1B2D', ink: '#EAF2FA', accent: '#35D0FF', accent2: '#FFB03A', dim: '#7E93AC' } },
      { name: '熔岩橙', colors: { bg: '#221207', ink: '#FBF0E4', accent: '#FF7A2F', accent2: '#FFC53D', dim: '#A88F76' } },
      { name: '极光紫', colors: { bg: '#170F2B', ink: '#F0EAFA', accent: '#9B6BFF', accent2: '#4FE0C0', dim: '#8E84AC' } },
      { name: '薄荷电台', colors: { bg: '#0E1F1B', ink: '#E9F5F0', accent: '#3FD9A4', accent2: '#FFD24A', dim: '#7FA094' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1920, defaultWidth: 1080, defaultHeight: 1920, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'gp-glow', type: 'overlay', background: 'radial-gradient(70% 60% at 50% 20%, rgba(53,208,255,0.26) 0%, rgba(53,208,255,0) 70%)', mixBlendMode: 'screen', opacity: 0.9, x: 0, y: 0, width: 1080, height: 1920, zIndex: 1 },
      { id: 'gp-dots', type: 'image', src: dotsBg(1080, 1920, 40, 'rgba(255,255,255,0.05)'), x: 0, y: 0, width: 1080, height: 1920, objectFit: 'fill', zIndex: 1 },
      { id: 'gp-no', type: 'text', content: 'PATCH 12.4', fontFamily: MONO, fontSize: 26, fontWeight: 700, letterSpacing: 8, color: { $t: 'colors.accent2' }, x: 88, y: 100, width: 500, height: 40, zIndex: 4 },
      { id: 'gp-kicker', type: 'text', content: 'SEASON UPDATE · 速报', fontFamily: MONO, fontSize: 30, fontWeight: 700, letterSpacing: 5, color: { $t: 'colors.accent' }, x: 88, y: 190, width: 820, height: 44, zIndex: 4, animation: { name: 'fadeIn', duration: 420 }, editable: { content: true } },
      { id: 'gp-title', type: 'text', content: '新赛季\n今日上线', fontFamily: { $t: 'fonts.heading' }, fontSize: 150, fontWeight: 900, lineHeight: 1.16, color: { $t: 'colors.ink' }, x: 88, y: 240, width: 900, height: 400, zIndex: 5, animation: { name: 'fadeInUp', duration: 520, delay: 130 }, editable: { content: true, fontSize: { type: 'range', min: 110, max: 170 } } },
      { id: 'gp-rule', type: 'shape', shapeKind: 'rect', x: 88, y: 580, width: 400, height: 10, borderRadius: 5, fill: { $t: 'colors.accent' }, zIndex: 4, animation: { name: 'slideInLeft', duration: 520, delay: 260 } },
      { id: 'gp-sub', type: 'text', content: '新英雄 · 新地图 · 通行证重置', fontFamily: HEI, fontSize: 36, color: { $t: 'colors.dim' }, x: 88, y: 620, width: 880, height: 54, zIndex: 4, animation: { name: 'fadeInUp', duration: 480, delay: 200 }, editable: { content: true } },
      { id: 'gp-hero', type: 'shape', shapeKind: 'rect', x: 88, y: 700, width: 904, height: 640, borderRadius: 24, fill: 'rgba(255,255,255,0.04)', border: { width: 3, style: 'dashed', color: { $t: 'colors.dim' } }, zIndex: 3 },
      { id: 'gp-c1', type: 'shape', shapeKind: 'rect', x: 112, y: 724, width: 28, height: 28, border: { width: 2, color: { $t: 'colors.accent' } }, zIndex: 5 },
      { id: 'gp-c2', type: 'shape', shapeKind: 'rect', x: 940, y: 724, width: 28, height: 28, border: { width: 2, color: { $t: 'colors.accent' } }, zIndex: 5 },
      { id: 'gp-hero-t', type: 'text', content: 'HERO SLOT', fontFamily: MONO, fontSize: 24, letterSpacing: 8, color: { $t: 'colors.dim' }, textAlign: 'center', x: 88, y: 1000, width: 904, height: 36, zIndex: 4, editable: { content: true } },
      { id: 'gp-hero-k', type: 'text', content: '拖新英雄立绘进来', fontFamily: HEI, fontSize: 28, color: { $t: 'colors.dim' }, textAlign: 'center', x: 88, y: 1050, width: 904, height: 42, zIndex: 4, editable: { content: true } },
      { id: 'gp-t1-k', type: 'text', content: '更新时间', fontFamily: HEI, fontSize: 22, color: { $t: 'colors.dim' }, x: 88, y: 1420, width: 300, height: 32, zIndex: 4 },
      { id: 'gp-t1-v', type: 'text', content: '10 月 16 日 04:00', fontFamily: MONO, fontSize: 28, color: { $t: 'colors.ink' }, x: 400, y: 1416, width: 600, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'gp-t2-k', type: 'text', content: '赛季时长', fontFamily: HEI, fontSize: 22, color: { $t: 'colors.dim' }, x: 88, y: 1480, width: 300, height: 32, zIndex: 4 },
      { id: 'gp-t2-v', type: 'text', content: '42 天', fontFamily: MONO, fontSize: 28, color: { $t: 'colors.accent' }, x: 400, y: 1476, width: 600, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'gp-t3-k', type: 'text', content: '补偿奖励', fontFamily: HEI, fontSize: 22, color: { $t: 'colors.dim' }, x: 88, y: 1540, width: 300, height: 32, zIndex: 4 },
      { id: 'gp-t3-v', type: 'text', content: '宝石 ×600', fontFamily: MONO, fontSize: 28, color: { $t: 'colors.accent2' }, x: 400, y: 1536, width: 600, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'gp-p1', type: 'shape', shapeKind: 'rect', x: 88, y: 1650, width: 260, height: 64, borderRadius: 32, border: { width: 2, color: { $t: 'colors.accent' } }, zIndex: 4 },
      { id: 'gp-p1-t', type: 'text', content: '免下载更新', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.accent' }, textAlign: 'center', x: 88, y: 1669, width: 260, height: 40, zIndex: 5, editable: { content: true } },
      { id: 'gp-p2', type: 'shape', shapeKind: 'rect', x: 368, y: 1650, width: 260, height: 64, borderRadius: 32, border: { width: 2, color: { $t: 'colors.accent2' } }, zIndex: 4 },
      { id: 'gp-p2-t', type: 'text', content: '全服庆典', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.accent2' }, textAlign: 'center', x: 368, y: 1669, width: 260, height: 40, zIndex: 5, editable: { content: true } },
      { id: 'gp-star', type: 'text', content: '★', fontFamily: SANS, fontSize: 40, color: { $t: 'colors.accent2' }, x: 88, y: 1790, width: 60, height: 56, zIndex: 4, animation: { name: 'pulse', duration: 2000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'gp-arrow', type: 'text', content: '↗', fontFamily: SANS, fontSize: 64, color: { $t: 'colors.accent' }, x: 940, y: 1780, width: 90, height: 90, zIndex: 4, animation: { name: 'float', duration: 4200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'gp-note', type: 'text', content: 'HY · PATCH LAB', fontFamily: MONO, fontSize: 20, letterSpacing: 4, color: { $t: 'colors.dim' }, opacity: 0.6, x: 760, y: 1690, width: 300, height: 30, zIndex: 4 },
      { id: 'gp-scan', type: 'overlay', background: 'repeating-linear-gradient(0deg, transparent 0 3px, rgba(0,0,0,0.10) 3px 4px)', opacity: 0.4, x: 0, y: 0, width: 1080, height: 1920, zIndex: 8 }
    ]
  },
  // 4. 本周新游发售日历 —— 1:1 发售清单：标题组 + 4 款新作（游戏名 / 平台 / 发售日）
  {
    id: 'hy-game-release', name: '本周新游发售', version: '1.0.0', category: 'game',
    tags: ['hy', 'game', 'release', '新游', '发售', '1:1'],
    thumbnail: svgUri('<rect width="100" height="100" fill="%23141C2A"/><rect x="10" y="12" width="28" height="4" rx="2" fill="%235BD0A0"/><rect x="10" y="20" width="44" height="12" rx="1" fill="%23EAF1FB"/><rect x="10" y="36" width="34" height="12" rx="1" fill="%23EAF1FB" opacity="0.75"/><rect x="10" y="56" width="40" height="5" rx="2" fill="%235BD0A0"/><circle cx="20" cy="74" r="4" fill="%236FA8FF"/><rect x="30" y="71" width="34" height="3" fill="%238493AC"/><circle cx="20" cy="86" r="4" fill="%235BD0A0"/><rect x="30" y="83" width="34" height="3" fill="%238493AC"/><circle cx="20" cy="96" r="4" fill="%236FA8FF"/>', 100, 100),
    tokens: {
      colors: {
        bg: { label: '底色', default: '#141C2A', options: ['#141C2A', '#1A1420', '#10211C', '#201520'] },
        ink: { label: '主文字', default: '#EAF1FB', options: ['#EAF1FB', '#F6EFE3', '#E9F4F0', '#F6EAEE'] },
        accent: { label: '发售绿', default: '#5BD0A0', options: ['#5BD0A0', '#FF8A3D', '#5B9BFF', '#E8748C'] },
        accent2: { label: '平台蓝', default: '#6FA8FF', options: ['#6FA8FF', '#8B6BFF', '#3FD9A4', '#C85C8A'] },
        dim: { label: '弱文字', default: '#8493AC', options: ['#8493AC', '#A29394', '#7FA094', '#A88F94'] }
      },
      fonts: { heading: { label: '标题字体', default: HEI, options: [HEI, SONG] } }
    },
    presets: [
      { name: '薄荷发售', colors: { bg: '#141C2A', ink: '#EAF1FB', accent: '#5BD0A0', accent2: '#6FA8FF', dim: '#8493AC' } },
      { name: '落日橙', colors: { bg: '#1A1420', ink: '#F6EFE3', accent: '#FF8A3D', accent2: '#8B6BFF', dim: '#A29394' } },
      { name: '深海青', colors: { bg: '#10211C', ink: '#E9F4F0', accent: '#3FD9A4', accent2: '#5B9BFF', dim: '#7FA094' } },
      { name: '玫瑰夜', colors: { bg: '#201520', ink: '#F6EAEE', accent: '#E8748C', accent2: '#C85C8A', dim: '#A88F94' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1080, defaultWidth: 1080, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'grl-glow', type: 'overlay', background: 'radial-gradient(64% 54% at 24% 16%, rgba(91,208,160,0.26) 0%, rgba(91,208,160,0) 70%)', mixBlendMode: 'screen', opacity: 0.9, x: 0, y: 0, width: 1080, height: 1080, zIndex: 1 },
      { id: 'grl-dots', type: 'image', src: dotsBg(1080, 1080, 44, 'rgba(255,255,255,0.05)'), x: 0, y: 0, width: 1080, height: 1080, objectFit: 'fill', zIndex: 1 },
      { id: 'grl-no', type: 'text', content: 'REL 09', fontFamily: MONO, fontSize: 24, fontWeight: 700, letterSpacing: 8, color: { $t: 'colors.accent2' }, x: 88, y: 80, width: 400, height: 34, zIndex: 4 },
      { id: 'grl-note', type: 'text', content: 'HY · REL LAB', fontFamily: MONO, fontSize: 20, letterSpacing: 4, color: { $t: 'colors.dim' }, opacity: 0.6, x: 700, y: 84, width: 300, height: 30, zIndex: 4 },
      { id: 'grl-kicker', type: 'text', content: 'NEW RELEASES · 本周发售', fontFamily: MONO, fontSize: 30, fontWeight: 700, letterSpacing: 5, color: { $t: 'colors.accent' }, x: 88, y: 170, width: 820, height: 44, zIndex: 4, animation: { name: 'fadeIn', duration: 420 }, editable: { content: true } },
      { id: 'grl-title', type: 'text', content: '本周\n值得等的新作', fontFamily: { $t: 'fonts.heading' }, fontSize: 134, fontWeight: 900, lineHeight: 1.16, color: { $t: 'colors.ink' }, x: 88, y: 280, width: 880, height: 360, zIndex: 5, animation: { name: 'fadeInUp', duration: 520, delay: 130 }, editable: { content: true, fontSize: { type: 'range', min: 100, max: 150 } } },
      { id: 'grl-rule', type: 'shape', shapeKind: 'rect', x: 88, y: 620, width: 360, height: 10, borderRadius: 5, fill: { $t: 'colors.accent' }, zIndex: 4, animation: { name: 'slideInLeft', duration: 520, delay: 260 } },
      { id: 'grl-sub', type: 'text', content: '4 款 · 跨 PC / 主机 / 掌机', fontFamily: HEI, fontSize: 34, color: { $t: 'colors.dim' }, x: 88, y: 664, width: 880, height: 54, zIndex: 4, editable: { content: true } },
      { id: 'grl-r1-i', type: 'text', content: '01', fontFamily: MONO, fontSize: 30, color: { $t: 'colors.accent2' }, x: 88, y: 740, width: 64, height: 44, zIndex: 4 },
      { id: 'grl-r1-n', type: 'text', content: '星轨彼端', fontFamily: HEI, fontSize: 34, color: { $t: 'colors.ink' }, x: 170, y: 740, width: 520, height: 46, zIndex: 4, editable: { content: true } },
      { id: 'grl-r1-d', type: 'text', content: '10.18 · PC/主机', fontFamily: MONO, fontSize: 26, color: { $t: 'colors.dim' }, textAlign: 'right', x: 700, y: 742, width: 292, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'grl-r2-i', type: 'text', content: '02', fontFamily: MONO, fontSize: 30, color: { $t: 'colors.accent2' }, x: 88, y: 812, width: 64, height: 44, zIndex: 4 },
      { id: 'grl-r2-n', type: 'text', content: '锈与潮', fontFamily: HEI, fontSize: 34, color: { $t: 'colors.ink' }, x: 170, y: 812, width: 520, height: 46, zIndex: 4, editable: { content: true } },
      { id: 'grl-r2-d', type: 'text', content: '10.20 · 掌机独占', fontFamily: MONO, fontSize: 26, color: { $t: 'colors.dim' }, textAlign: 'right', x: 700, y: 814, width: 292, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'grl-r3-i', type: 'text', content: '03', fontFamily: MONO, fontSize: 30, color: { $t: 'colors.accent2' }, x: 88, y: 884, width: 64, height: 44, zIndex: 4 },
      { id: 'grl-r3-n', type: 'text', content: '长安夜行', fontFamily: HEI, fontSize: 34, color: { $t: 'colors.ink' }, x: 170, y: 884, width: 520, height: 46, zIndex: 4, editable: { content: true } },
      { id: 'grl-r3-d', type: 'text', content: '10.24 · 全平台', fontFamily: MONO, fontSize: 26, color: { $t: 'colors.dim' }, textAlign: 'right', x: 700, y: 886, width: 292, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'grl-r4-i', type: 'text', content: '04', fontFamily: MONO, fontSize: 30, color: { $t: 'colors.accent2' }, x: 88, y: 956, width: 64, height: 44, zIndex: 4 },
      { id: 'grl-r4-n', type: 'text', content: '雾港谜案', fontFamily: HEI, fontSize: 34, color: { $t: 'colors.ink' }, x: 170, y: 956, width: 520, height: 46, zIndex: 4, editable: { content: true } },
      { id: 'grl-r4-d', type: 'text', content: '10.31 · PC', fontFamily: MONO, fontSize: 26, color: { $t: 'colors.dim' }, textAlign: 'right', x: 700, y: 958, width: 292, height: 40, zIndex: 4, editable: { content: true } }
    ]
  },
  // 5. 速通世界纪录 —— 9:16 计时大字 + 分段成绩：WR 时间 + 3 行分段对比
  {
    id: 'hy-game-speedrun', name: '速通世界纪录', version: '1.0.0', category: 'game',
    tags: ['hy', 'game', 'speedrun', '速通', '世界纪录', '9:16'],
    thumbnail: svgUri('<rect width="100" height="160" fill="%230E1A24"/><rect x="10" y="14" width="26" height="4" rx="2" fill="%233FD9A4"/><rect x="10" y="22" width="40" height="12" rx="1" fill="%23E9F4F0"/><rect x="10" y="40" width="34" height="12" rx="1" fill="%23E9F4F0" opacity="0.75"/><text x="10" y="92" font-family="monospace" font-size="22" fill="%233FD9A4">12:47</text><rect x="10" y="104" width="80" height="3" fill="%237FA094"/><rect x="10" y="114" width="60" height="3" fill="%237FA094" opacity="0.7"/><rect x="10" y="124" width="70" height="3" fill="%237FA094" opacity="0.5"/>', 100, 160),
    tokens: {
      colors: {
        bg: { label: '底色', default: '#0E1A24', options: ['#0E1A24', '#1A1420', '#10211C', '#1C1226'] },
        ink: { label: '主文字', default: '#E9F4F0', options: ['#E9F4F0', '#F6EFE3', '#E9F4F0', '#F6EAEE'] },
        accent: { label: '速度绿', default: '#3FD9A4', options: ['#3FD9A4', '#FF8A3D', '#5B9BFF', '#E8748C'] },
        accent2: { label: '琥珀', default: '#FFB03A', options: ['#FFB03A', '#8B6BFF', '#3FD9A4', '#C85C8A'] },
        dim: { label: '弱文字', default: '#7FA094', options: ['#7FA094', '#A29394', '#7FA094', '#A88F94'] }
      },
      fonts: { heading: { label: '标题字体', default: HEI, options: [HEI, SONG] } }
    },
    presets: [
      { name: '极速青绿', colors: { bg: '#0E1A24', ink: '#E9F4F0', accent: '#3FD9A4', accent2: '#FFB03A', dim: '#7FA094' } },
      { name: '落日橙', colors: { bg: '#1A1420', ink: '#F6EFE3', accent: '#FF8A3D', accent2: '#8B6BFF', dim: '#A29394' } },
      { name: '深海青', colors: { bg: '#10211C', ink: '#E9F4F0', accent: '#3FD9A4', accent2: '#5B9BFF', dim: '#7FA094' } },
      { name: '霓虹紫', colors: { bg: '#1C1226', ink: '#F6EAEE', accent: '#E8748C', accent2: '#C85C8A', dim: '#A88F94' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1920, defaultWidth: 1080, defaultHeight: 1920, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'gsr-glow', type: 'overlay', background: 'radial-gradient(60% 46% at 50% 14%, rgba(63,217,164,0.24) 0%, rgba(63,217,164,0) 70%)', mixBlendMode: 'screen', opacity: 0.9, x: 0, y: 0, width: 1080, height: 1920, zIndex: 1 },
      { id: 'gsr-dots', type: 'image', src: dotsBg(1080, 1920, 40, 'rgba(255,255,255,0.05)'), x: 0, y: 0, width: 1080, height: 1920, objectFit: 'fill', zIndex: 1 },
      { id: 'gsr-no', type: 'text', content: 'WR · ANY%', fontFamily: MONO, fontSize: 26, fontWeight: 700, letterSpacing: 6, color: { $t: 'colors.accent2' }, x: 88, y: 100, width: 500, height: 36, zIndex: 4 },
      { id: 'gsr-note', type: 'text', content: 'HY · RUN LAB', fontFamily: MONO, fontSize: 20, letterSpacing: 4, color: { $t: 'colors.dim' }, opacity: 0.6, x: 720, y: 104, width: 300, height: 30, zIndex: 4 },
      { id: 'gsr-kicker', type: 'text', content: 'SPEEDRUN · 速通世界纪录', fontFamily: MONO, fontSize: 30, fontWeight: 700, letterSpacing: 5, color: { $t: 'colors.accent' }, x: 88, y: 190, width: 820, height: 44, zIndex: 4, animation: { name: 'fadeIn', duration: 420 }, editable: { content: true } },
      { id: 'gsr-title', type: 'text', content: '速通\n世界纪录', fontFamily: { $t: 'fonts.heading' }, fontSize: 150, fontWeight: 900, lineHeight: 1.16, color: { $t: 'colors.ink' }, x: 88, y: 300, width: 900, height: 400, zIndex: 5, animation: { name: 'fadeInUp', duration: 520, delay: 130 }, editable: { content: true, fontSize: { type: 'range', min: 110, max: 170 } } },
      { id: 'gsr-rule', type: 'shape', shapeKind: 'rect', x: 88, y: 660, width: 420, height: 10, borderRadius: 5, fill: { $t: 'colors.accent' }, zIndex: 4, animation: { name: 'slideInLeft', duration: 520, delay: 260 } },
      { id: 'gsr-sub', type: 'text', content: 'Any% · 单人 · 无存档', fontFamily: HEI, fontSize: 36, color: { $t: 'colors.dim' }, x: 88, y: 704, width: 880, height: 54, zIndex: 4, editable: { content: true } },
      { id: 'gsr-meta', type: 'text', content: '游戏  《镜界回廊》  ·  平台  PC', fontFamily: MONO, fontSize: 30, color: { $t: 'colors.dim' }, x: 88, y: 800, width: 900, height: 44, zIndex: 4, editable: { content: true } },
      { id: 'gsr-time', type: 'text', content: '12:47.93', fontFamily: IMPACT, fontSize: 200, color: { $t: 'colors.accent' }, textAlign: 'center', x: 88, y: 900, width: 904, height: 240, zIndex: 5, animation: { name: 'fadeInUp', duration: 560, delay: 200 }, editable: { content: true } },
      { id: 'gsr-s1-k', type: 'text', content: '世界纪录', fontFamily: MONO, fontSize: 28, color: { $t: 'colors.dim' }, x: 88, y: 1200, width: 360, height: 40, zIndex: 4 },
      { id: 'gsr-s1-v', type: 'text', content: '12:47.93', fontFamily: MONO, fontSize: 30, color: { $t: 'colors.accent' }, x: 480, y: 1198, width: 500, height: 44, zIndex: 4, editable: { content: true } },
      { id: 'gsr-s2-k', type: 'text', content: '前纪录', fontFamily: MONO, fontSize: 28, color: { $t: 'colors.dim' }, x: 88, y: 1270, width: 360, height: 40, zIndex: 4 },
      { id: 'gsr-s2-v', type: 'text', content: '12:55.40', fontFamily: MONO, fontSize: 30, color: { $t: 'colors.dim' }, x: 480, y: 1268, width: 500, height: 44, zIndex: 4, editable: { content: true } },
      { id: 'gsr-s3-k', type: 'text', content: '差距', fontFamily: MONO, fontSize: 28, color: { $t: 'colors.dim' }, x: 88, y: 1340, width: 360, height: 40, zIndex: 4 },
      { id: 'gsr-s3-v', type: 'text', content: '-7.47', fontFamily: MONO, fontSize: 30, color: { $t: 'colors.accent2' }, x: 480, y: 1338, width: 500, height: 44, zIndex: 4, editable: { content: true } },
      { id: 'gsr-star', type: 'text', content: '★', fontFamily: SANS, fontSize: 40, color: { $t: 'colors.accent2' }, x: 88, y: 1470, width: 60, height: 56, zIndex: 4, animation: { name: 'pulse', duration: 2000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'gsr-arrow', type: 'text', content: '↗', fontFamily: SANS, fontSize: 64, color: { $t: 'colors.accent' }, x: 940, y: 1460, width: 90, height: 90, zIndex: 4, animation: { name: 'float', duration: 4200, iterationCount: 'infinite', easing: 'ease-in-out' } }
    ]
  }
]

// src/core/templates/game/game-covers.ts —— game 大类首批（4 个 · 2026-10-14 从 video/game-podcast-batch.ts 拆出，播客 2 套留 video/podcast-covers.ts）
// 口径：游戏实况 HUD（血条/蓝条 + 手柄虚位）/ 保姆级攻略（三步清单 + Boss 虚位 + 印章）/ 冲榜战报（段位徽章 + 结算行）/ 电竞决赛名场面（聚光锥 + 对阵记分条）。
// 规范：颜色全走 token（中性氛围层用 rgba，与 tech-hud 口径一致）；每套 4 组预设；
//       16:9 = 1920×1080；virtual 与 default 同值。
// 与已有 video-bili-gaming（血条+发光大字+小手柄点阵）刻意错开：本批用四种不同骨架。
import type { Template } from '@/types/types'
import { HEI, SONG, IMPACT, MONO, SANS } from '../_fx/trend'
import { dotsBg, hatchBg } from '../knowledge/_decor'
import { svgUri } from '../_fx/common'

// 聚光灯锥：两道不同宽度的白色多边形叠出体积感（中性 rgba，不跟换色）
const CONE_URI = svgUri('<polygon points="806,0 1114,0 1560,1080 380,1080" fill="rgba(255,255,255,0.05)"/><polygon points="884,0 1036,0 1320,1080 600,1080" fill="rgba(255,255,255,0.07)"/><ellipse cx="960" cy="1000" rx="520" ry="62" fill="rgba(255,255,255,0.06)"/>', 1920, 1080)
// 攻略纸的斜纹（浅底上比 gridBg 更有"册子"味）
const PAPER_URI = hatchBg(1920, 1080, 26, 'rgba(35,26,16,0.045)')

export const gameCoversTemplates: Template[] = [
  // 1. 游戏实况封面 —— 整条 HUD（血条/蓝条 + 分段刻度）+ 大字关卡名 + 右侧手柄虚位
  {
    id: 'video-game-live', name: '游戏实况开荒封面', version: '1.0.0', category: 'game',
    tags: ['video', 'game', 'gameplay', 'hud', '16:9'],
    thumbnail: svgUri('<rect width="160" height="90" fill="%230B1020"/><rect x="12" y="10" width="74" height="9" rx="4.5" fill="rgba(255,255,255,0.16)"/><rect x="13" y="11" width="46" height="7" rx="3.5" fill="%23FF4D4D"/><g fill="%230B1020"><rect x="28" y="10" width="2" height="9"/><rect x="45" y="10" width="2" height="9"/><rect x="62" y="10" width="2" height="9"/></g><rect x="12" y="23" width="52" height="6" rx="3" fill="rgba(255,255,255,0.16)"/><rect x="13" y="24" width="34" height="4" rx="2" fill="%234CC9F0"/><rect x="10" y="38" width="46" height="7" rx="1" fill="%23F2F6FF"/><rect x="10" y="49" width="66" height="7" rx="1" fill="%234CC9F0"/><rect x="10" y="64" width="24" height="5" rx="1" fill="%237C8CA8"/><rect x="38" y="64" width="24" height="5" rx="1" fill="%237C8CA8"/><rect x="66" y="64" width="24" height="5" rx="1" fill="%237C8CA8"/><rect x="104" y="30" width="46" height="34" rx="12" fill="none" stroke="%237C8CA8" stroke-width="2" stroke-dasharray="5 4"/><circle cx="139" cy="41" r="4" fill="%234CC9F0"/><rect x="112" y="40" width="4" height="12" rx="2" fill="%237C8CA8"/><rect x="108" y="44" width="12" height="4" rx="2" fill="%237C8CA8"/><rect x="124" y="10" width="26" height="8" rx="4" fill="none" stroke="%234CC9F0"/><text x="128" y="52" font-family="Impact,sans-serif" font-size="9" fill="%23F2F6FF">31%</text>', 160, 90),
    tokens: {
      colors: {
        bg: { label: '夜色底', default: '#0B1020', options: ['#0B1020', '#101C14', '#1A0F1E', '#161208'] },
        ink: { label: '主文字', default: '#F2F6FF', options: ['#F2F6FF', '#EAFBF2', '#F6ECFF', '#FBF3E2'] },
        hp: { label: '血条色', default: '#FF4D4D', options: ['#FF4D4D', '#FF7A18', '#F43F5E', '#E9B949'] },
        mp: { label: '蓝条色', default: '#4CC9F0', options: ['#4CC9F0', '#52E0A5', '#A78BFA', '#FACC15'] },
        dim: { label: '弱文字', default: '#7C8CA8', options: ['#7C8CA8', '#7FA98F', '#9A86AE', '#A9927C'] }
      },
      fonts: { heading: { label: '标题字体', default: HEI, options: [HEI, IMPACT] } }
    },
    presets: [
      { name: '夜庙红蓝', colors: { bg: '#0B1020', ink: '#F2F6FF', hp: '#FF4D4D', mp: '#4CC9F0', dim: '#7C8CA8' } },
      { name: '毒沼青黄', colors: { bg: '#101C14', ink: '#EAFBF2', hp: '#FF7A18', mp: '#FACC15', dim: '#7FA98F' } },
      { name: '紫电街机', colors: { bg: '#1A0F1E', ink: '#F6ECFF', hp: '#F43F5E', mp: '#A78BFA', dim: '#9A86AE' } },
      { name: '黄沙废土', colors: { bg: '#161208', ink: '#FBF3E2', hp: '#E9B949', mp: '#52E0A5', dim: '#A9927C' } }
    ],
    canvas: { virtualWidth: 1920, virtualHeight: 1080, defaultWidth: 1920, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'gl-dots', type: 'image', src: dotsBg(1920, 1080, 56, 'rgba(255,255,255,0.055)'), x: 0, y: 0, width: 1920, height: 1080, objectFit: 'fill', zIndex: 1 },
      // ── HUD 带：血条（分段刻度）+ 蓝条
      { id: 'gl-hp-t', type: 'text', content: 'BOSS HP', fontFamily: MONO, fontSize: 28, fontWeight: 700, letterSpacing: 8, color: { $t: 'colors.dim' }, x: 120, y: 84, width: 380, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'gl-hp-track', type: 'shape', shapeKind: 'rect', x: 120, y: 136, width: 760, height: 48, borderRadius: 24, fill: 'rgba(255,255,255,0.10)', border: { width: 2, color: { $t: 'colors.dim' } }, zIndex: 4 },
      { id: 'gl-hp-fill', type: 'shape', shapeKind: 'rect', x: 130, y: 146, width: 470, height: 28, borderRadius: 14, fill: { $t: 'colors.hp' }, zIndex: 5, animation: { name: 'heartbeat', duration: 1500, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'gl-hp-tk1', group: 'gl-hp-tk', type: 'shape', shapeKind: 'rect', x: 272, y: 136, width: 10, height: 48, fill: { $t: 'colors.bg' }, opacity: 0.85, zIndex: 6 },
      { id: 'gl-hp-tk2', group: 'gl-hp-tk', type: 'shape', shapeKind: 'rect', x: 424, y: 136, width: 10, height: 48, fill: { $t: 'colors.bg' }, opacity: 0.85, zIndex: 6 },
      { id: 'gl-hp-tk3', group: 'gl-hp-tk', type: 'shape', shapeKind: 'rect', x: 576, y: 136, width: 10, height: 48, fill: { $t: 'colors.bg' }, opacity: 0.85, zIndex: 6 },
      { id: 'gl-hp-tk4', group: 'gl-hp-tk', type: 'shape', shapeKind: 'rect', x: 728, y: 136, width: 10, height: 48, fill: { $t: 'colors.bg' }, opacity: 0.85, zIndex: 6 },
      { id: 'gl-hp-pct', type: 'text', content: '31%', fontFamily: IMPACT, fontSize: 44, color: { $t: 'colors.ink' }, x: 904, y: 138, width: 160, height: 52, zIndex: 5, editable: { content: true } },
      { id: 'gl-mp-t', type: 'text', content: 'MP · 吟唱余量', fontFamily: HEI, fontSize: 28, color: { $t: 'colors.dim' }, x: 120, y: 206, width: 520, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'gl-mp-track', type: 'shape', shapeKind: 'rect', x: 120, y: 258, width: 520, height: 30, borderRadius: 15, fill: 'rgba(255,255,255,0.10)', zIndex: 4 },
      { id: 'gl-mp-fill', type: 'shape', shapeKind: 'rect', x: 128, y: 266, width: 360, height: 14, borderRadius: 7, fill: { $t: 'colors.mp' }, zIndex: 5, animation: { name: 'pulse', duration: 1700, iterationCount: 'infinite', easing: 'ease-in-out' } },
      // ── 右上角标签
      { id: 'gl-chip', type: 'shape', shapeKind: 'rect', x: 1360, y: 96, width: 420, height: 68, borderRadius: 34, fill: 'rgba(255,255,255,0.06)', border: { width: 3, color: { $t: 'colors.mp' } }, zIndex: 4 },
      { id: 'gl-chip-t', type: 'text', content: '手残党友好 · 无伤向', fontFamily: HEI, fontSize: 28, fontWeight: 700, color: { $t: 'colors.ink' }, textAlign: 'center', x: 1360, y: 112, width: 420, height: 40, zIndex: 5, animation: { name: 'fadeIn', duration: 420, delay: 260 }, editable: { content: true } },
      // ── 大字关卡名
      { id: 'gl-level', type: 'text', content: 'LEVEL 07', fontFamily: IMPACT, fontSize: 96, letterSpacing: 10, color: { $t: 'colors.mp' }, x: 120, y: 330, width: 720, height: 130, zIndex: 4, animation: { name: 'slideInLeft', duration: 460 }, editable: { content: true } },
      { id: 'gl-title', type: 'text', content: '沼泽回廊', fontFamily: { $t: 'fonts.heading' }, fontSize: 190, fontWeight: 900, letterSpacing: 8, color: { $t: 'colors.ink' }, x: 120, y: 470, width: 1000, height: 300, zIndex: 5, shadow: { offsetX: 0, offsetY: 0, blur: 44, color: { $t: 'colors.hp' } }, animation: { name: 'slideInLeft', duration: 520, delay: 0 }, editable: { content: true, fontSize: { type: 'range', min: 120, max: 240 } } },
      { id: 'gl-sub', type: 'text', content: '第 12 期 · 全流程无伤开荒', fontFamily: HEI, fontSize: 44, fontWeight: 700, color: { $t: 'colors.mp' }, x: 120, y: 800, width: 1000, height: 62, zIndex: 5, animation: { name: 'fadeInUp', duration: 480, delay: 130 }, editable: { content: true } },
      { id: 'gl-note', type: 'text', content: '死亡 0 次 · 键位表在简介第一行', fontFamily: HEI, fontSize: 34, color: { $t: 'colors.dim' }, x: 120, y: 880, width: 1000, height: 50, zIndex: 5, animation: { name: 'fadeInUp', duration: 480, delay: 260 }, editable: { content: true } },
      // ── 手柄虚位（右侧）
      { id: 'gl-pad', type: 'shape', shapeKind: 'rect', x: 1160, y: 400, width: 640, height: 440, borderRadius: 56, border: { width: 6, style: 'dashed', color: { $t: 'colors.dim' } }, zIndex: 3 },
      { id: 'gl-pad-cap', type: 'text', content: 'GAMEPAD SLOT', fontFamily: MONO, fontSize: 22, letterSpacing: 6, color: { $t: 'colors.dim' }, textAlign: 'center', x: 1160, y: 424, width: 640, height: 34, zIndex: 4, editable: { content: true } },
      // 手柄剪影：全部 shape 拼，颜色跟 dim / mp token 走
      { id: 'gl-pad-body', type: 'shape', shapeKind: 'rect', x: 1270, y: 552, width: 420, height: 200, borderRadius: 96, border: { width: 5, color: { $t: 'colors.dim' } }, zIndex: 4 },
      { id: 'gl-pad-dv', type: 'shape', shapeKind: 'rect', x: 1344, y: 612, width: 22, height: 80, borderRadius: 10, fill: { $t: 'colors.dim' }, zIndex: 5 },
      { id: 'gl-pad-dh', type: 'shape', shapeKind: 'rect', x: 1315, y: 641, width: 80, height: 22, borderRadius: 10, fill: { $t: 'colors.dim' }, zIndex: 5 },
      { id: 'gl-pad-ls', type: 'shape', shapeKind: 'circle', x: 1440, y: 664, width: 52, height: 52, border: { width: 4, color: { $t: 'colors.dim' } }, zIndex: 5 },
      { id: 'gl-pad-rs', type: 'shape', shapeKind: 'circle', x: 1548, y: 664, width: 52, height: 52, border: { width: 4, color: { $t: 'colors.dim' } }, zIndex: 5 },
      { id: 'gl-pad-a', type: 'shape', shapeKind: 'circle', x: 1600, y: 580, width: 38, height: 38, fill: { $t: 'colors.mp' }, zIndex: 5, animation: { name: 'heartbeat', duration: 1600, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'gl-pad-b', type: 'shape', shapeKind: 'circle', x: 1552, y: 608, width: 38, height: 38, border: { width: 4, color: { $t: 'colors.mp' } }, zIndex: 5 },
      { id: 'gl-pad-t', type: 'text', content: '手柄位 · 拖你的截图进来', fontFamily: HEI, fontSize: 28, color: { $t: 'colors.dim' }, textAlign: 'center', x: 1160, y: 770, width: 640, height: 44, zIndex: 4, editable: { content: true } },
      // ── 底部数据胶囊
      { id: 'gl-s1', group: 'gl-s', type: 'shape', shapeKind: 'rect', x: 120, y: 946, width: 300, height: 88, borderRadius: 20, fill: 'rgba(255,255,255,0.06)', zIndex: 4 },
      { id: 'gl-s1-k', type: 'text', content: '用时', fontFamily: HEI, fontSize: 22, color: { $t: 'colors.dim' }, x: 146, y: 962, width: 200, height: 32, zIndex: 5, editable: { content: true } },
      { id: 'gl-s1-v', type: 'text', content: '41:07', fontFamily: IMPACT, fontSize: 44, color: { $t: 'colors.ink' }, x: 146, y: 996, width: 240, height: 52, zIndex: 5, editable: { content: true } },
      { id: 'gl-s2', group: 'gl-s', type: 'shape', shapeKind: 'rect', x: 460, y: 946, width: 300, height: 88, borderRadius: 20, fill: 'rgba(255,255,255,0.06)', zIndex: 4 },
      { id: 'gl-s2-k', type: 'text', content: '掉血', fontFamily: HEI, fontSize: 22, color: { $t: 'colors.dim' }, x: 486, y: 962, width: 200, height: 32, zIndex: 5, editable: { content: true } },
      { id: 'gl-s2-v', type: 'text', content: '2 次', fontFamily: IMPACT, fontSize: 44, color: { $t: 'colors.hp' }, x: 486, y: 996, width: 240, height: 52, zIndex: 5, editable: { content: true } },
      { id: 'gl-s3', group: 'gl-s', type: 'shape', shapeKind: 'rect', x: 800, y: 946, width: 300, height: 88, borderRadius: 20, fill: 'rgba(255,255,255,0.06)', zIndex: 4 },
      { id: 'gl-s3-k', type: 'text', content: '收集', fontFamily: HEI, fontSize: 22, color: { $t: 'colors.dim' }, x: 826, y: 962, width: 200, height: 32, zIndex: 5, editable: { content: true } },
      { id: 'gl-s3-v', type: 'text', content: '12/15', fontFamily: IMPACT, fontSize: 44, color: { $t: 'colors.mp' }, x: 826, y: 996, width: 240, height: 52, zIndex: 5, editable: { content: true } },
      { id: 'gl-rec-d', type: 'shape', shapeKind: 'circle', x: 120, y: 40, width: 16, height: 16, fill: { $t: 'colors.hp' }, zIndex: 5, animation: { name: 'blink', duration: 1300, iterationCount: 'infinite', easing: 'steps(1)' } },
      { id: 'gl-arrow', type: 'text', content: '↗', fontFamily: SANS, fontSize: 96, fontWeight: 700, color: { $t: 'colors.hp' }, x: 1120, y: 300, width: 120, height: 110, zIndex: 6, animation: { name: 'float', duration: 3600, iterationCount: 'infinite', easing: 'ease-in-out' } }
    ]
  },

  // 2. 保姆级游戏攻略封面 —— 纸面攻略册：左三步清单 + 右侧 Boss 虚位 + 亲测通过印章
  {
    id: 'video-game-guide', name: '保姆级游戏攻略封面', version: '1.0.0', category: 'game',
    tags: ['video', 'game', 'walkthrough', 'guide', '16:9'],
    thumbnail: svgUri('<rect width="160" height="90" fill="%23F5EDDD"/><rect x="10" y="10" width="52" height="4" rx="2" fill="%23C8462B"/><rect x="10" y="19" width="70" height="9" rx="1" fill="%23231A10"/><rect x="10" y="32" width="52" height="9" rx="1" fill="%23231A10" opacity="0.7"/><circle cx="18" cy="52" r="6" fill="%23C8462B"/><rect x="28" y="49" width="44" height="4" rx="1" fill="%23231A10"/><rect x="28" y="57" width="34" height="3" rx="1" fill="%238C7B62"/><circle cx="18" cy="70" r="6" fill="%23C8462B"/><rect x="28" y="67" width="44" height="4" rx="1" fill="%23231A10"/><rect x="28" y="75" width="30" height="3" rx="1" fill="%238C7B62"/><circle cx="118" cy="42" r="28" fill="none" stroke="%238C7B62" stroke-width="2" stroke-dasharray="5 4"/><circle cx="118" cy="42" r="20" fill="none" stroke="%238C7B62" stroke-width="1" opacity="0.6"/><text x="118" y="45" font-family="serif" font-size="9" fill="%238C7B62" text-anchor="middle">Boss</text><g transform="rotate(-10 126 76)"><rect x="100" y="60" width="46" height="34" rx="4" fill="none" stroke="%23C8462B" stroke-width="3"/><text x="123" y="82" font-family="serif" font-size="13" fill="%23C8462B" text-anchor="middle">亲测</text></g>', 160, 90),
    tokens: {
      colors: {
        bg: { label: '纸色', default: '#F5EDDD', options: ['#F5EDDD', '#E9EFE6', '#EFE4E4', '#E4EAF2'] },
        ink: { label: '主文字', default: '#231A10', options: ['#231A10', '#16241B', '#2A1517', '#141D2B'] },
        accent: { label: '印章红', default: '#C8462B', options: ['#C8462B', '#2F7A55', '#A4303F', '#2A4E9B'] },
        dim: { label: '弱文字', default: '#8C7B62', options: ['#8C7B62', '#6F8A76', '#8A6F72', '#6B7A92'] }
      },
      fonts: { heading: { label: '标题字体', default: HEI, options: [HEI, SONG] } }
    },
    presets: [
      { name: '米纸红印', colors: { bg: '#F5EDDD', ink: '#231A10', accent: '#C8462B', dim: '#8C7B62' } },
      { name: '青格绿章', colors: { bg: '#E9EFE6', ink: '#16241B', accent: '#2F7A55', dim: '#6F8A76' } },
      { name: '藕粉深红', colors: { bg: '#EFE4E4', ink: '#2A1517', accent: '#A4303F', dim: '#8A6F72' } },
      { name: '格纹藏青', colors: { bg: '#E4EAF2', ink: '#141D2B', accent: '#2A4E9B', dim: '#6B7A92' } }
    ],
    canvas: { virtualWidth: 1920, virtualHeight: 1080, defaultWidth: 1920, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'gg-paper', type: 'image', src: PAPER_URI, x: 0, y: 0, width: 1920, height: 1080, objectFit: 'fill', zIndex: 1 },
      { id: 'gg-kicker', type: 'text', content: 'GAME GUIDE · 三号 Boss 拆解', fontFamily: MONO, fontSize: 28, fontWeight: 700, letterSpacing: 5, color: { $t: 'colors.accent' }, x: 120, y: 96, width: 820, height: 40, zIndex: 4, animation: { name: 'fadeIn', duration: 420 }, editable: { content: true } },
      { id: 'gg-title', type: 'text', content: '沼泽回廊\n无伤通关路线', fontFamily: { $t: 'fonts.heading' }, fontSize: 130, fontWeight: 900, lineHeight: 1.18, color: { $t: 'colors.ink' }, x: 120, y: 168, width: 900, height: 340, zIndex: 4, animation: { name: 'fadeInUp', duration: 520, delay: 130 }, editable: { content: true, fontSize: { type: 'range', min: 90, max: 150 } } },
      { id: 'gg-rule', type: 'shape', shapeKind: 'rect', x: 120, y: 550, width: 520, height: 10, borderRadius: 5, fill: { $t: 'colors.accent' }, zIndex: 4, animation: { name: 'slideInLeft', duration: 520, delay: 260 } },
      // ── 左侧三步清单
      { id: 'gg-st1-b', type: 'shape', shapeKind: 'circle', x: 120, y: 616, width: 76, height: 76, fill: { $t: 'colors.accent' }, zIndex: 4 },
      { id: 'gg-st1-n', type: 'text', content: '1', fontFamily: IMPACT, fontSize: 44, color: { $t: 'colors.bg' }, textAlign: 'center', x: 120, y: 630, width: 76, height: 54, zIndex: 5 },
      { id: 'gg-st1-t', type: 'text', content: '进门先踩两块松砖', fontFamily: HEI, fontSize: 44, fontWeight: 700, color: { $t: 'colors.ink' }, x: 230, y: 624, width: 780, height: 62, zIndex: 4, animation: { name: 'rise', duration: 480 }, editable: { content: true } },
      { id: 'gg-st1-s', type: 'text', content: '左躲右滚别贪刀，等它自己摔一跤', fontFamily: HEI, fontSize: 28, color: { $t: 'colors.dim' }, x: 230, y: 690, width: 780, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'gg-st2-b', type: 'shape', shapeKind: 'circle', x: 120, y: 758, width: 76, height: 76, fill: { $t: 'colors.accent' }, zIndex: 4 },
      { id: 'gg-st2-n', type: 'text', content: '2', fontFamily: IMPACT, fontSize: 44, color: { $t: 'colors.bg' }, textAlign: 'center', x: 120, y: 772, width: 76, height: 54, zIndex: 5 },
      { id: 'gg-st2-t', type: 'text', content: '第二阶段拆柱子', fontFamily: HEI, fontSize: 44, fontWeight: 700, color: { $t: 'colors.ink' }, x: 230, y: 766, width: 780, height: 62, zIndex: 4, animation: { name: 'rise', duration: 480, delay: 130 }, editable: { content: true } },
      { id: 'gg-st2-s', type: 'text', content: '把场景当队友，柱子比你的盾硬', fontFamily: HEI, fontSize: 28, color: { $t: 'colors.dim' }, x: 230, y: 832, width: 780, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'gg-st3-b', type: 'shape', shapeKind: 'circle', x: 120, y: 900, width: 76, height: 76, fill: { $t: 'colors.accent' }, zIndex: 4 },
      { id: 'gg-st3-n', type: 'text', content: '3', fontFamily: IMPACT, fontSize: 44, color: { $t: 'colors.bg' }, textAlign: 'center', x: 120, y: 914, width: 76, height: 54, zIndex: 5 },
      { id: 'gg-st3-t', type: 'text', content: '残血阶段只打头', fontFamily: HEI, fontSize: 44, fontWeight: 700, color: { $t: 'colors.ink' }, x: 230, y: 908, width: 780, height: 62, zIndex: 4, animation: { name: 'rise', duration: 480, delay: 260 }, editable: { content: true } },
      { id: 'gg-st3-s', type: 'text', content: '附键位表 / 掉落表 / 逃课清单', fontFamily: HEI, fontSize: 28, color: { $t: 'colors.dim' }, x: 230, y: 974, width: 780, height: 40, zIndex: 4, editable: { content: true } },
      // ── 右侧 Boss 虚位
      { id: 'gg-boss', type: 'shape', shapeKind: 'circle', x: 1120, y: 176, width: 680, height: 680, border: { width: 6, style: 'dashed', color: { $t: 'colors.dim' } }, zIndex: 3 },
      { id: 'gg-boss-in', type: 'shape', shapeKind: 'circle', x: 1164, y: 220, width: 592, height: 592, border: { width: 2, color: { $t: 'colors.dim' } }, opacity: 0.6, zIndex: 3, animation: { name: 'pulse', duration: 3400, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'gg-boss-t', type: 'text', content: 'Boss 立绘虚位', fontFamily: SONG, fontSize: 44, color: { $t: 'colors.dim' }, textAlign: 'center', x: 1120, y: 486, width: 680, height: 62, zIndex: 4, editable: { content: true } },
      { id: 'gg-boss-s', type: 'text', content: '拖张截图进来就能用 · 大小随意', fontFamily: HEI, fontSize: 28, color: { $t: 'colors.dim' }, textAlign: 'center', x: 1120, y: 562, width: 680, height: 40, zIndex: 4, editable: { content: true } },
      // ── 亲测通过印章（方形公章：外框 + 内框 + 字）
      { id: 'gg-stamp', type: 'shape', shapeKind: 'rect', x: 1420, y: 706, width: 360, height: 290, borderRadius: 22, border: { width: 12, color: { $t: 'colors.accent' } }, rotation: -10, zIndex: 6, animation: { name: 'zoomIn', duration: 420, delay: 320 } },
      { id: 'gg-stamp-in', type: 'shape', shapeKind: 'rect', x: 1444, y: 730, width: 312, height: 242, borderRadius: 12, border: { width: 3, color: { $t: 'colors.accent' } }, opacity: 0.7, rotation: -10, zIndex: 6 },
      { id: 'gg-stamp-t', type: 'text', content: '亲测通过', fontFamily: SONG, fontSize: 68, fontWeight: 700, color: { $t: 'colors.accent' }, textAlign: 'center', rotation: -10, x: 1420, y: 778, width: 360, height: 92, zIndex: 7, animation: { name: 'wobble', duration: 4200, iterationCount: 'infinite', easing: 'ease-in-out' }, editable: { content: true, fontSize: { type: 'range', min: 48, max: 82 } } },
      { id: 'gg-stamp-s', type: 'text', content: '3 周目实测', fontFamily: MONO, fontSize: 28, letterSpacing: 2, color: { $t: 'colors.accent' }, textAlign: 'center', rotation: -10, x: 1420, y: 884, width: 360, height: 40, zIndex: 7, editable: { content: true } },
      { id: 'gg-foot', type: 'text', content: '手残党照着抄就行 · 卡关评论区喊我', fontFamily: HEI, fontSize: 28, color: { $t: 'colors.dim' }, x: 1120, y: 1000, width: 680, height: 40, zIndex: 5, animation: { name: 'fadeInUp', duration: 480, delay: 390 }, editable: { content: true } }
    ]
  },

  // 3. 游戏冲榜战报 —— 段位徽章 + 大字段位 + 分段进度条 + 横向结算数据行
  {
    id: 'video-game-rank', name: '游戏冲榜战报封面', version: '1.0.0', category: 'game',
    tags: ['video', 'game', 'rank', 'scoreboard', '16:9'],
    thumbnail: svgUri('<rect width="160" height="90" fill="%230C1120"/><circle cx="34" cy="40" r="20" fill="none" stroke="%23E9B949" stroke-width="2"/><rect x="24" y="30" width="20" height="20" fill="none" stroke="%237C8CA8" stroke-width="1.2" transform="rotate(45 34 40)"/><rect x="62" y="24" width="54" height="12" rx="1" fill="%23F3F6FF"/><rect x="62" y="40" width="36" height="6" rx="1" fill="%23E9B949"/><rect x="12" y="58" width="136" height="6" rx="3" fill="rgba(255,255,255,0.14)"/><rect x="13" y="59" width="92" height="4" rx="2" fill="%23E9B949"/><g fill="%237C8CA8"><rect x="76" y="70" width="16" height="3" rx="1"/><rect x="112" y="70" width="16" height="3" rx="1"/></g><g fill="%23F3F6FF"><rect x="12" y="70" width="18" height="6" rx="1"/><rect x="46" y="70" width="14" height="6" rx="1"/><rect x="116" y="70" width="18" height="6" rx="1"/></g><rect x="124" y="12" width="24" height="9" rx="4.5" fill="none" stroke="%23E9B949"/><text x="146" y="10" font-family="Impact,sans-serif" font-size="8" fill="%23E9B949">71%</text>', 160, 90),
    tokens: {
      colors: {
        bg: { label: '底色', default: '#0C1120', options: ['#0C1120', '#171022', '#0A1A17', '#1C1208'] },
        ink: { label: '主文字', default: '#F3F6FF', options: ['#F3F6FF', '#F7EEFF', '#E9F7F1', '#FDF3DF'] },
        gold: { label: '段位金', default: '#E9B949', options: ['#E9B949', '#A78BFA', '#52E0A5', '#F0714A'] },
        dim: { label: '弱文字', default: '#7C8CA8', options: ['#7C8CA8', '#9A86AE', '#7FA98F', '#A9927C'] }
      },
      fonts: { heading: { label: '标题字体', default: IMPACT, options: [IMPACT, HEI] } }
    },
    presets: [
      { name: '曜金深夜', colors: { bg: '#0C1120', ink: '#F3F6FF', gold: '#E9B949', dim: '#7C8CA8' } },
      { name: '紫电王朝', colors: { bg: '#171022', ink: '#F7EEFF', gold: '#A78BFA', dim: '#9A86AE' } },
      { name: '翡翠青台', colors: { bg: '#0A1A17', ink: '#E9F7F1', gold: '#52E0A5', dim: '#7FA98F' } },
      { name: '落日橙殿', colors: { bg: '#1C1208', ink: '#FDF3DF', gold: '#F0714A', dim: '#A9927C' } }
    ],
    canvas: { virtualWidth: 1920, virtualHeight: 1080, defaultWidth: 1920, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'gr-dots', type: 'image', src: dotsBg(1920, 1080, 60, 'rgba(255,255,255,0.05)'), x: 0, y: 0, width: 1920, height: 1080, objectFit: 'fill', zIndex: 1 },
      { id: 'gr-glow', type: 'overlay', background: 'radial-gradient(52% 44% at 22% 42%, rgba(233,185,73,0.20), transparent 70%)', x: 0, y: 0, width: 1920, height: 1080, zIndex: 2 },
      { id: 'gr-kicker', type: 'text', content: 'S12 赛季结算 · 冲榜战报', fontFamily: MONO, fontSize: 28, fontWeight: 700, letterSpacing: 6, color: { $t: 'colors.gold' }, x: 120, y: 100, width: 900, height: 40, zIndex: 4, animation: { name: 'fadeIn', duration: 420 }, editable: { content: true } },
      { id: 'gr-up', type: 'shape', shapeKind: 'rect', x: 1380, y: 88, width: 400, height: 72, borderRadius: 36, fill: 'rgba(255,255,255,0.06)', border: { width: 3, color: { $t: 'colors.gold' } }, zIndex: 4 },
      { id: 'gr-up-t', type: 'text', content: '↑ 12 名 · 登上传奇', fontFamily: HEI, fontSize: 28, fontWeight: 700, color: { $t: 'colors.ink' }, textAlign: 'center', x: 1380, y: 106, width: 400, height: 40, zIndex: 5, animation: { name: 'fadeIn', duration: 420, delay: 260 }, editable: { content: true } },
      // ── 段位徽章
      { id: 'gr-crest-glow', type: 'shape', shapeKind: 'circle', x: 180, y: 310, width: 300, height: 300, fill: { $t: 'colors.gold' }, opacity: 0.10, zIndex: 3, shadow: { offsetX: 0, offsetY: 0, blur: 60, color: { $t: 'colors.gold' } }, animation: { name: 'pulse', duration: 3200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'gr-crest', type: 'shape', shapeKind: 'circle', x: 120, y: 250, width: 420, height: 420, border: { width: 6, color: { $t: 'colors.gold' } }, zIndex: 4 },
      { id: 'gr-crest-dia', type: 'shape', shapeKind: 'rect', x: 230, y: 360, width: 200, height: 200, border: { width: 3, color: { $t: 'colors.dim' } }, rotation: 45, zIndex: 4 },
      { id: 'gr-crest-t', type: 'text', content: '52 星', fontFamily: IMPACT, fontSize: 96, color: { $t: 'colors.gold' }, textAlign: 'center', x: 120, y: 396, width: 420, height: 116, zIndex: 5, editable: { content: true } },
      // ── 段位大字
      { id: 'gr-rank-ghost', type: 'text', content: '最强王者', fontFamily: { $t: 'fonts.heading' }, fontSize: 190, fontWeight: 900, letterSpacing: 8, color: { $t: 'colors.gold' }, opacity: 0.28, x: 640, y: 268, width: 1000, height: 300, zIndex: 4 },
      { id: 'gr-rank', type: 'text', content: '最强王者', fontFamily: { $t: 'fonts.heading' }, fontSize: 190, fontWeight: 900, letterSpacing: 8, color: { $t: 'colors.ink' }, x: 620, y: 250, width: 1000, height: 300, zIndex: 5, shadow: { offsetX: 0, offsetY: 0, blur: 56, color: { $t: 'colors.gold' } }, animation: { name: 'slideInLeft', duration: 520, delay: 130 }, editable: { content: true, fontSize: { type: 'range', min: 120, max: 240 } } },
      { id: 'gr-sub', type: 'text', content: '全服第 38 名 · 本段位唯一 ID', fontFamily: HEI, fontSize: 44, fontWeight: 700, color: { $t: 'colors.gold' }, x: 620, y: 580, width: 1160, height: 62, zIndex: 5, animation: { name: 'fadeInUp', duration: 480, delay: 260 }, editable: { content: true } },
      // ── 分段进度条
      { id: 'gr-pg-t', type: 'text', content: '距下一段位 · 还差 3 分', fontFamily: HEI, fontSize: 28, color: { $t: 'colors.dim' }, x: 120, y: 690, width: 700, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'gr-pg-pct', type: 'text', content: '71%', fontFamily: IMPACT, fontSize: 44, color: { $t: 'colors.ink' }, x: 1700, y: 660, width: 80, height: 52, zIndex: 4, editable: { content: true } },
      { id: 'gr-pg-track', type: 'shape', shapeKind: 'rect', x: 120, y: 744, width: 1660, height: 40, borderRadius: 20, fill: 'rgba(255,255,255,0.10)', zIndex: 4 },
      { id: 'gr-pg-fill', type: 'shape', shapeKind: 'rect', x: 130, y: 752, width: 1180, height: 24, borderRadius: 12, fill: { $t: 'colors.gold' }, zIndex: 5, animation: { name: 'shimmer', duration: 2600, iterationCount: 'infinite', easing: 'linear' } },
      { id: 'gr-pg-tk1', group: 'gr-pg-tk', type: 'shape', shapeKind: 'rect', x: 540, y: 744, width: 8, height: 40, fill: { $t: 'colors.bg' }, opacity: 0.9, zIndex: 6 },
      { id: 'gr-pg-tk2', group: 'gr-pg-tk', type: 'shape', shapeKind: 'rect', x: 960, y: 744, width: 8, height: 40, fill: { $t: 'colors.bg' }, opacity: 0.9, zIndex: 6 },
      { id: 'gr-pg-tk3', group: 'gr-pg-tk', type: 'shape', shapeKind: 'rect', x: 1380, y: 744, width: 8, height: 40, fill: { $t: 'colors.bg' }, opacity: 0.9, zIndex: 6 },
      { id: 'gr-pg-m1', type: 'text', content: '传奇 30 星', fontFamily: HEI, fontSize: 22, color: { $t: 'colors.dim' }, x: 520, y: 800, width: 240, height: 34, zIndex: 5, editable: { content: true } },
      { id: 'gr-pg-m2', type: 'text', content: '王者 10 星', fontFamily: HEI, fontSize: 22, color: { $t: 'colors.dim' }, x: 920, y: 800, width: 240, height: 34, zIndex: 5, editable: { content: true } },
      { id: 'gr-pg-m3', type: 'text', content: '最强王者 25 星', fontFamily: HEI, fontSize: 22, color: { $t: 'colors.gold' }, x: 1320, y: 800, width: 300, height: 34, zIndex: 5, editable: { content: true } },
      // ── 结算数据行（横向四列）
      { id: 'gr-div1', group: 'gr-div', type: 'shape', shapeKind: 'rect', x: 470, y: 880, width: 2, height: 120, fill: 'rgba(255,255,255,0.16)', zIndex: 4 },
      { id: 'gr-div2', group: 'gr-div', type: 'shape', shapeKind: 'rect', x: 870, y: 880, width: 2, height: 120, fill: 'rgba(255,255,255,0.16)', zIndex: 4 },
      { id: 'gr-div3', group: 'gr-div', type: 'shape', shapeKind: 'rect', x: 1270, y: 880, width: 2, height: 120, fill: 'rgba(255,255,255,0.16)', zIndex: 4 },
      { id: 'gr-d1-v', type: 'text', content: '9.4', fontFamily: IMPACT, fontSize: 60, color: { $t: 'colors.ink' }, x: 120, y: 886, width: 280, height: 76, zIndex: 5, editable: { content: true } },
      { id: 'gr-d1-k', type: 'text', content: '赛后评分', fontFamily: HEI, fontSize: 28, color: { $t: 'colors.dim' }, x: 120, y: 968, width: 280, height: 40, zIndex: 5, editable: { content: true } },
      { id: 'gr-d2-v', type: 'text', content: '68%', fontFamily: IMPACT, fontSize: 60, color: { $t: 'colors.ink' }, x: 520, y: 886, width: 280, height: 76, zIndex: 5, editable: { content: true } },
      { id: 'gr-d2-k', type: 'text', content: '上段胜率', fontFamily: HEI, fontSize: 28, color: { $t: 'colors.dim' }, x: 520, y: 968, width: 280, height: 40, zIndex: 5, editable: { content: true } },
      { id: 'gr-d3-v', type: 'text', content: '42', fontFamily: IMPACT, fontSize: 60, color: { $t: 'colors.ink' }, x: 920, y: 886, width: 280, height: 76, zIndex: 5, editable: { content: true } },
      { id: 'gr-d3-k', type: 'text', content: '冲场次数', fontFamily: HEI, fontSize: 28, color: { $t: 'colors.dim' }, x: 920, y: 968, width: 280, height: 40, zIndex: 5, editable: { content: true } },
      { id: 'gr-d4-v', type: 'text', content: '41.2%', fontFamily: IMPACT, fontSize: 60, color: { $t: 'colors.gold' }, x: 1320, y: 886, width: 300, height: 76, zIndex: 5, editable: { content: true } },
      { id: 'gr-d4-k', type: 'text', content: '伤害占比', fontFamily: HEI, fontSize: 28, color: { $t: 'colors.dim' }, x: 1320, y: 968, width: 280, height: 40, zIndex: 5, editable: { content: true } }
    ]
  },

  // 4. 电竞决赛名场面 —— 暗场聚光锥 + 顶部对阵记分条 + 高光大字 + MVP 贴纸
  {
    id: 'video-game-esports', name: '电竞决赛名场面封面', version: '1.0.0', category: 'game',
    tags: ['video', 'game', 'esports', 'finals', '16:9'],
    thumbnail: svgUri('<rect width="160" height="90" fill="%23080C14"/><polygon points="70,0 92,0 120,90 44,90" fill="rgba(255,255,255,0.07)"/><rect x="10" y="12" width="140" height="20" rx="3" fill="rgba(255,255,255,0.08)"/><rect x="10" y="12" width="3" height="20" fill="%2322D3EE"/><rect x="147" y="12" width="3" height="20" fill="%23F43F5E"/><text x="18" y="26" font-family="Impact,sans-serif" font-size="10" fill="%2322D3EE">BLUE</text><text x="60" y="27" font-family="Impact,sans-serif" font-size="13" fill="%23F5F8FF">3</text><text x="76" y="26" font-family="Impact,sans-serif" font-size="8" fill="%237E8AA0">VS</text><text x="120" y="27" font-family="Impact,sans-serif" font-size="13" fill="%23F5F8FF">1</text><text x="132" y="26" font-family="Impact,sans-serif" font-size="10" fill="%23F43F5E">RED</text><rect x="10" y="42" width="72" height="14" rx="1" fill="%23F5F8FF"/><rect x="10" y="60" width="40" height="6" rx="1" fill="%23F43F5E"/><rect x="112" y="44" width="38" height="16" rx="8" fill="none" stroke="%23F43F5E"/><text x="118" y="56" font-family="Impact,sans-serif" font-size="10" fill="%23F5F8FF">12:47</text><rect x="10" y="78" width="140" height="2" fill="rgba(255,255,255,0.18)"/>', 160, 90),
    tokens: {
      colors: {
        bg: { label: '暗场底', default: '#080C14', options: ['#080C14', '#120814', '#0A140F', '#140F08'] },
        ink: { label: '主文字', default: '#F5F8FF', options: ['#F5F8FF', '#FFF6EC', '#EEF6FF', '#F0FFF6'] },
        left: { label: '左队色', default: '#22D3EE', options: ['#22D3EE', '#818CF8', '#38BDF8', '#5EEAD4'] },
        right: { label: '右队色', default: '#F43F5E', options: ['#F43F5E', '#F6A93B', '#EC4899', '#A3E635'] },
        dim: { label: '弱文字', default: '#7E8AA0', options: ['#7E8AA0', '#A08A94', '#7E9AA0', '#9A917E'] }
      },
      fonts: { heading: { label: '标题字体', default: IMPACT, options: [IMPACT, HEI] } }
    },
    presets: [
      { name: '青蓝对猩红', colors: { bg: '#080C14', ink: '#F5F8FF', left: '#22D3EE', right: '#F43F5E', dim: '#7E8AA0' } },
      { name: '紫电对暮橙', colors: { bg: '#120814', ink: '#FFF6EC', left: '#818CF8', right: '#F6A93B', dim: '#A08A94' } },
      { name: '湖蓝对粉焰', colors: { bg: '#0A140F', ink: '#EEF6FF', left: '#38BDF8', right: '#EC4899', dim: '#7E9AA0' } },
      { name: '薄荷对酸绿', colors: { bg: '#140F08', ink: '#F0FFF6', left: '#5EEAD4', right: '#A3E635', dim: '#9A917E' } }
    ],
    canvas: { virtualWidth: 1920, virtualHeight: 1080, defaultWidth: 1920, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'es-cone', type: 'image', src: CONE_URI, x: 0, y: 0, width: 1920, height: 1080, objectFit: 'fill', zIndex: 1, animation: { name: 'pulse', duration: 5200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'es-vig', type: 'overlay', background: 'radial-gradient(76% 62% at 50% 40%, rgba(0,0,0,0) 44%, rgba(0,0,0,0.62) 100%)', x: 0, y: 0, width: 1920, height: 1080, zIndex: 2 },
      // ── 顶部：直播角标 + 赛事名
      { id: 'es-live-d', type: 'shape', shapeKind: 'circle', x: 120, y: 92, width: 22, height: 22, fill: { $t: 'colors.right' }, zIndex: 5, animation: { name: 'blink', duration: 1300, iterationCount: 'infinite', easing: 'steps(1)' } },
      { id: 'es-kicker', type: 'text', content: '电竞总决赛 · 第五局 · 名场面', fontFamily: HEI, fontSize: 28, fontWeight: 700, letterSpacing: 4, color: { $t: 'colors.right' }, x: 170, y: 84, width: 900, height: 40, zIndex: 5, animation: { name: 'fadeIn', duration: 420 }, editable: { content: true } },
      // ── 对阵双方记分条
      { id: 'es-bar', type: 'shape', shapeKind: 'rect', x: 120, y: 140, width: 1660, height: 116, borderRadius: 16, fill: 'rgba(255,255,255,0.07)', zIndex: 3, animation: { name: 'slideInLeft', duration: 460, delay: 130 } },
      { id: 'es-bar-l', type: 'shape', shapeKind: 'rect', x: 120, y: 140, width: 14, height: 116, borderRadius: 7, fill: { $t: 'colors.left' }, zIndex: 4 },
      { id: 'es-bar-r', type: 'shape', shapeKind: 'rect', x: 1766, y: 140, width: 14, height: 116, borderRadius: 7, fill: { $t: 'colors.right' }, zIndex: 4 },
      { id: 'es-tag-l', type: 'text', content: 'BLUE', fontFamily: IMPACT, fontSize: 44, letterSpacing: 3, color: { $t: 'colors.left' }, x: 170, y: 170, width: 200, height: 56, zIndex: 5, editable: { content: true } },
      { id: 'es-name-l', type: 'text', content: '北斗战队', fontFamily: HEI, fontSize: 44, fontWeight: 700, color: { $t: 'colors.ink' }, x: 392, y: 168, width: 280, height: 60, zIndex: 5, editable: { content: true } },
      { id: 'es-score-l', type: 'text', content: '3', fontFamily: IMPACT, fontSize: 96, color: { $t: 'colors.ink' }, x: 692, y: 152, width: 90, height: 110, zIndex: 5, editable: { content: true } },
      { id: 'es-vs', type: 'text', content: 'VS', fontFamily: IMPACT, fontSize: 44, letterSpacing: 2, color: { $t: 'colors.dim' }, x: 880, y: 176, width: 120, height: 56, zIndex: 5, editable: { content: true } },
      { id: 'es-score-r', type: 'text', content: '1', fontFamily: IMPACT, fontSize: 96, color: { $t: 'colors.ink' }, x: 1116, y: 152, width: 90, height: 110, zIndex: 5, editable: { content: true } },
      { id: 'es-name-r', type: 'text', content: '苍梧战队', fontFamily: HEI, fontSize: 44, fontWeight: 700, color: { $t: 'colors.ink' }, x: 1240, y: 168, width: 280, height: 60, zIndex: 5, editable: { content: true } },
      { id: 'es-tag-r', type: 'text', content: 'RED', fontFamily: IMPACT, fontSize: 44, letterSpacing: 3, color: { $t: 'colors.right' }, x: 1584, y: 170, width: 200, height: 56, zIndex: 5, editable: { content: true } },
      { id: 'es-bestof', type: 'text', content: 'BO5 · 3:2 · 全球直播', fontFamily: MONO, fontSize: 22, letterSpacing: 4, color: { $t: 'colors.dim' }, x: 120, y: 272, width: 700, height: 34, zIndex: 4, editable: { content: true } },
      // ── 高光大字
      { id: 'es-title-ghost', type: 'text', content: '抢龙翻盘', fontFamily: { $t: 'fonts.heading' }, fontSize: 190, fontWeight: 900, letterSpacing: 8, color: { $t: 'colors.left' }, opacity: 0.35, x: 140, y: 436, width: 1000, height: 300, zIndex: 4 },
      { id: 'es-title', type: 'text', content: '抢龙翻盘', fontFamily: { $t: 'fonts.heading' }, fontSize: 190, fontWeight: 900, letterSpacing: 8, color: { $t: 'colors.ink' }, x: 120, y: 420, width: 1000, height: 300, zIndex: 5, shadow: { offsetX: 0, offsetY: 0, blur: 62, color: { $t: 'colors.right' } }, animation: { name: 'zoomIn', duration: 480 }, editable: { content: true, fontSize: { type: 'range', min: 120, max: 240 } } },
      { id: 'es-sub', type: 'text', content: '32 分钟 · 一波团战定冠军', fontFamily: HEI, fontSize: 60, fontWeight: 900, color: { $t: 'colors.right' }, x: 120, y: 754, width: 900, height: 84, zIndex: 5, animation: { name: 'fadeInUp', duration: 480, delay: 130 }, editable: { content: true, fontSize: { type: 'range', min: 40, max: 80 } } },
      // ── 右侧时间戳胶囊 + MVP 贴纸
      { id: 'es-time', type: 'shape', shapeKind: 'rect', x: 1400, y: 430, width: 380, height: 96, borderRadius: 48, fill: 'rgba(255,255,255,0.06)', border: { width: 3, color: { $t: 'colors.right' } }, zIndex: 5 },
      { id: 'es-time-t', type: 'text', content: '12:47', fontFamily: IMPACT, fontSize: 60, color: { $t: 'colors.ink' }, textAlign: 'center', x: 1400, y: 448, width: 380, height: 66, zIndex: 6, editable: { content: true } },
      { id: 'es-time-cap', type: 'text', content: '高光起点', fontFamily: HEI, fontSize: 22, letterSpacing: 4, color: { $t: 'colors.dim' }, textAlign: 'center', x: 1400, y: 540, width: 380, height: 34, zIndex: 5, editable: { content: true } },
      { id: 'es-mvp', type: 'shape', shapeKind: 'rect', x: 1360, y: 700, width: 420, height: 150, borderRadius: 20, fill: { $t: 'colors.right' }, opacity: 0.92, rotation: -5, zIndex: 5, animation: { name: 'wobble', duration: 3600, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'es-mvp-t', type: 'text', content: 'MVP · 全场焦点', fontFamily: HEI, fontSize: 44, fontWeight: 900, color: { $t: 'colors.bg' }, textAlign: 'center', rotation: -5, x: 1360, y: 742, width: 420, height: 62, zIndex: 6, editable: { content: true } },
      // ── 地面线 + 脚注
      { id: 'es-floor', type: 'shape', shapeKind: 'rect', x: 120, y: 930, width: 1660, height: 3, fill: 'rgba(255,255,255,0.16)', zIndex: 3 },
      { id: 'es-foot', type: 'text', content: '解说已喊哑 · 完整 BO5 见正片', fontFamily: HEI, fontSize: 28, color: { $t: 'colors.dim' }, x: 120, y: 968, width: 900, height: 40, zIndex: 4, animation: { name: 'fadeInUp', duration: 480, delay: 260 }, editable: { content: true } },
      { id: 'es-crowd', type: 'text', content: '啊啊啊啊啊', fontFamily: HEI, fontSize: 44, fontWeight: 700, color: { $t: 'colors.ink' }, opacity: 0.14, rotation: -4, x: 1180, y: 300, width: 520, height: 62, zIndex: 3, editable: { content: true } },
      { id: 'es-crowd2', type: 'text', content: '这波能打十分', fontFamily: HEI, fontSize: 44, fontWeight: 700, color: { $t: 'colors.ink' }, opacity: 0.12, x: 1180, y: 880, width: 560, height: 62, zIndex: 3, editable: { content: true } }
    ]
  },
]

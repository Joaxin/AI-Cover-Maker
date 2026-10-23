// src/core/templates/music/hy-music-extra.ts —— music 分类首批补充（2 个 · 播客片头 + 翻唱对比）
// 口径：播客片头（1:1 麦克风虚位 + 声波条 + 期号）/ 翻唱对比（16:9 左右分屏 + 中间 VS 徽 + 双评分条）。
// 与 video 目录既有播客 2 套（环形排版/mic 拼形、时间戳章节卡）错开：本批走「竖版声波」与「AB 对照」两条新骨架。
// 规范：颜色全走 token；每套 4 组预设；1080×1080 与 1920×1080 的 virtual 与 default 同值。
import type { Template } from '@/types/types'
import { HEI, SONG, MONO, IMPACT, SANS } from '../_fx/trend'
import { dotsBg } from '../knowledge/_decor'
import { svgUri } from '../_fx/common'

export const hyMusicExtraTemplates: Template[] = [
  // 1. 播客片头封面 —— 竖版声波：麦克风虚位 + 5 根脉冲声波条 + 主播信息
  {
    id: 'hy-music-pod-intro', name: '播客片头封面', version: '1.0.0', category: 'music',
    tags: ['hy', 'music', 'podcast', '播客', '1:1'],
    thumbnail: svgUri('<rect width="100" height="100" fill="%231A1420"/><rect x="10" y="12" width="26" height="4" rx="2" fill="%23D96C4F"/><rect x="10" y="21" width="34" height="11" rx="1" fill="%23F6EFE3"/><rect x="10" y="37" width="28" height="11" rx="1" fill="%23F6EFE3" opacity="0.75"/><circle cx="42" cy="58" r="20" fill="none" stroke="%23A29394" stroke-width="1.5" stroke-dasharray="4 3"/><rect x="14" y="82" width="5" height="12" rx="2" fill="%23E8B04B"/><rect x="22" y="76" width="5" height="18" rx="2" fill="%23E8B04B" opacity="0.85"/><rect x="30" y="70" width="5" height="24" rx="2" fill="%23D96C4F"/><rect x="38" y="78" width="5" height="16" rx="2" fill="%23E8B04B" opacity="0.7"/><rect x="46" y="84" width="5" height="10" rx="2" fill="%23A29394" opacity="0.6"/>', 100, 100),
    tokens: {
      colors: {
        bg: { label: '底色', default: '#1A1420', options: ['#1A1420', '#141C1A', '#201419', '#131A26'] },
        ink: { label: '主文字', default: '#F6EFE3', options: ['#F6EFE3', '#EAF2EA', '#F6EAEE', '#E9F0FA'] },
        accent: { label: '暖金', default: '#E8B04B', options: ['#E8B04B', '#57B98A', '#E8748C', '#5B9BEB'] },
        accent2: { label: '陶土红', default: '#D96C4F', options: ['#D96C4F', '#3F9E7E', '#C65C7E', '#4A7BC9'] },
        dim: { label: '弱文字', default: '#A29394', options: ['#A29394', '#7E988C', '#A88F94', '#8493AC'] }
      },
      fonts: { heading: { label: '标题字体', default: HEI, options: [HEI, SONG] } }
    },
    presets: [
      { name: '暖金夜话', colors: { bg: '#1A1420', ink: '#F6EFE3', accent: '#E8B04B', accent2: '#D96C4F', dim: '#A29394' } },
      { name: '苔绿清晨', colors: { bg: '#141C1A', ink: '#EAF2EA', accent: '#57B98A', accent2: '#3F9E7E', dim: '#7E988C' } },
      { name: '玫瑰夜听', colors: { bg: '#201419', ink: '#F6EAEE', accent: '#E8748C', accent2: '#C65C7E', dim: '#A88F94' } },
      { name: '蓝调电台', colors: { bg: '#131A26', ink: '#E9F0FA', accent: '#5B9BEB', accent2: '#4A7BC9', dim: '#8493AC' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1080, defaultWidth: 1080, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'mp-glow', type: 'overlay', background: 'radial-gradient(60% 58% at 50% 38%, rgba(232,176,75,0.24) 0%, rgba(232,176,75,0) 70%)', mixBlendMode: 'screen', opacity: 0.9, x: 0, y: 0, width: 1080, height: 1080, zIndex: 1 },
      { id: 'mp-dots', type: 'image', src: dotsBg(1080, 1080, 44, 'rgba(255,255,255,0.05)'), x: 0, y: 0, width: 1080, height: 1080, objectFit: 'fill', zIndex: 1 },
      { id: 'mp-no', type: 'text', content: 'EP.042', fontFamily: MONO, fontSize: 24, fontWeight: 700, letterSpacing: 8, color: { $t: 'colors.accent2' }, x: 88, y: 80, width: 400, height: 34, zIndex: 4 },
      { id: 'mp-kicker', type: 'text', content: 'PODCAST INTRO · 深夜漫谈', fontFamily: MONO, fontSize: 30, fontWeight: 700, letterSpacing: 5, color: { $t: 'colors.accent' }, x: 88, y: 170, width: 820, height: 44, zIndex: 4, animation: { name: 'fadeIn', duration: 420 }, editable: { content: true } },
      { id: 'mp-title', type: 'text', content: '睡前听一耳\n最近听的歌', fontFamily: { $t: 'fonts.heading' }, fontSize: 128, fontWeight: 900, lineHeight: 1.16, color: { $t: 'colors.ink' }, x: 88, y: 280, width: 880, height: 350, zIndex: 5, animation: { name: 'fadeInUp', duration: 520, delay: 130 }, editable: { content: true, fontSize: { type: 'range', min: 96, max: 140 } } },
      { id: 'mp-ring', type: 'shape', shapeKind: 'circle', x: 340, y: 550, width: 400, height: 400, border: { width: 1, color: { $t: 'colors.dim' } }, opacity: 0.4, zIndex: 2 },
      { id: 'mp-mic', type: 'shape', shapeKind: 'circle', x: 390, y: 600, width: 300, height: 300, border: { width: 4, style: 'dashed', color: { $t: 'colors.dim' } }, zIndex: 3 },
      { id: 'mp-mic-t', type: 'text', content: 'MIC SLOT', fontFamily: MONO, fontSize: 24, letterSpacing: 6, color: { $t: 'colors.dim' }, textAlign: 'center', x: 390, y: 880, width: 300, height: 34, zIndex: 4, editable: { content: true } },
      { id: 'mp-w1', group: 'mp-w', type: 'shape', shapeKind: 'rect', x: 200, y: 960, width: 28, height: 60, borderRadius: 14, fill: { $t: 'colors.accent' }, zIndex: 4, animation: { name: 'pulse', duration: 900, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'mp-w2', group: 'mp-w', type: 'shape', shapeKind: 'rect', x: 250, y: 940, width: 28, height: 100, borderRadius: 14, fill: { $t: 'colors.accent' }, opacity: 0.85, zIndex: 4, animation: { name: 'pulse', duration: 900, delay: 150, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'mp-w3', group: 'mp-w', type: 'shape', shapeKind: 'rect', x: 300, y: 920, width: 28, height: 140, borderRadius: 14, fill: { $t: 'colors.accent2' }, zIndex: 4, animation: { name: 'pulse', duration: 900, delay: 300, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'mp-w4', group: 'mp-w', type: 'shape', shapeKind: 'rect', x: 350, y: 945, width: 28, height: 90, borderRadius: 14, fill: { $t: 'colors.accent' }, opacity: 0.7, zIndex: 4, animation: { name: 'pulse', duration: 900, delay: 450, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'mp-w5', group: 'mp-w', type: 'shape', shapeKind: 'rect', x: 400, y: 970, width: 28, height: 40, borderRadius: 14, fill: { $t: 'colors.dim' }, opacity: 0.6, zIndex: 4, animation: { name: 'pulse', duration: 900, delay: 600, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'mp-host', type: 'text', content: '主播 · 阿禾 & 小满', fontFamily: HEI, fontSize: 36, color: { $t: 'colors.dim' }, x: 560, y: 630, width: 440, height: 48, zIndex: 4, editable: { content: true } },
      { id: 'mp-len', type: 'text', content: '时长 47:20 · 每周三更新', fontFamily: HEI, fontSize: 24, color: { $t: 'colors.dim' }, x: 560, y: 726, width: 440, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'mp-p1', type: 'shape', shapeKind: 'rect', x: 760, y: 80, width: 232, height: 56, borderRadius: 28, border: { width: 2, color: { $t: 'colors.accent' } }, zIndex: 4 },
      { id: 'mp-p1-t', type: 'text', content: '音乐', fontFamily: HEI, fontSize: 24, color: { $t: 'colors.accent' }, textAlign: 'center', x: 760, y: 96, width: 232, height: 36, zIndex: 5, editable: { content: true } },
      { id: 'mp-p2', type: 'shape', shapeKind: 'rect', x: 760, y: 156, width: 232, height: 56, borderRadius: 28, border: { width: 2, color: { $t: 'colors.accent2' } }, zIndex: 4 },
      { id: 'mp-p2-t', type: 'text', content: '闲聊', fontFamily: HEI, fontSize: 24, color: { $t: 'colors.accent2' }, textAlign: 'center', x: 760, y: 172, width: 232, height: 36, zIndex: 5, editable: { content: true } },
      { id: 'mp-date', type: 'text', content: '2026 · 第 42 期', fontFamily: MONO, fontSize: 24, letterSpacing: 4, color: { $t: 'colors.dim' }, x: 88, y: 1020, width: 400, height: 32, zIndex: 4 },
      { id: 'mp-note-t', type: 'text', content: '♪', fontFamily: SANS, fontSize: 60, color: { $t: 'colors.accent' }, x: 960, y: 870, width: 80, height: 80, zIndex: 4, animation: { name: 'float', duration: 3800, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'mp-note', type: 'text', content: 'HY · POD NOTE', fontFamily: MONO, fontSize: 20, letterSpacing: 4, color: { $t: 'colors.accent2' }, opacity: 0.6, x: 760, y: 1020, width: 300, height: 30, zIndex: 4 }
    ]
  },

  // 2. 翻唱对比封面 —— AB 对照：左右分屏 + 中间 VS 徽 + 双评分条 + 底部标签
  {
    id: 'hy-music-cover-battle', name: '翻唱对比封面', version: '1.0.0', category: 'music',
    tags: ['hy', 'music', 'cover', '翻唱', '对比', '16:9'],
    thumbnail: svgUri('<rect width="160" height="90" fill="%2314141C"/><rect x="0" y="0" width="80" height="90" fill="%23E0526B" opacity="0.18"/><rect x="80" y="0" width="80" height="90" fill="%234FA3E8" opacity="0.18"/><rect x="10" y="14" width="30" height="4" rx="2" fill="%23E0526B"/><rect x="10" y="23" width="40" height="10" rx="1" fill="%23F2F0EA"/><rect x="10" y="38" width="28" height="4" rx="2" fill="%238E8E9C"/><circle cx="80" cy="40" r="13" fill="%23E0526B"/><text x="80" y="44" font-family="sans-serif" font-size="9" fill="%2314141C" text-anchor="middle">VS</text><rect x="112" y="14" width="30" height="4" rx="2" fill="%234FA3E8"/><rect x="112" y="23" width="40" height="10" rx="1" fill="%23F2F0EA"/><rect x="112" y="38" width="28" height="4" rx="2" fill="%238E8E9C"/><rect x="10" y="60" width="60" height="5" rx="2" fill="%238E8E9C" opacity="0.4"/><rect x="10" y="60" width="38" height="5" rx="2" fill="%23E0526B"/><rect x="112" y="60" width="38" height="5" rx="2" fill="%234FA3E8"/>', 160, 90),
    tokens: {
      colors: {
        bg: { label: '底色', default: '#14141C', options: ['#14141C', '#12181C', '#1A1420', '#101824'] },
        ink: { label: '主文字', default: '#F2F0EA', options: ['#F2F0EA', '#EAF3F2', '#F4EAEE', '#EAF0FA'] },
        accent: { label: '玫红', default: '#E0526B', options: ['#E0526B', '#3FA88C', '#E86A8C', '#5B8FE0'] },
        accent2: { label: '湖蓝', default: '#4FA3E8', options: ['#4FA3E8', '#3F9E7E', '#C65C9A', '#5A86D6'] },
        dim: { label: '弱文字', default: '#8E8E9C', options: ['#8E8E9C', '#7E988C', '#9A8E96', '#8493AC'] }
      },
      fonts: { heading: { label: '标题字体', default: HEI, options: [HEI, SONG] } }
    },
    presets: [
      { name: '玫红对湖蓝', colors: { bg: '#14141C', ink: '#F2F0EA', accent: '#E0526B', accent2: '#4FA3E8', dim: '#8E8E9C' } },
      { name: '松绿对青', colors: { bg: '#12181C', ink: '#EAF3F2', accent: '#3FA88C', accent2: '#3F9E7E', dim: '#7E988C' } },
      { name: '樱粉对紫', colors: { bg: '#1A1420', ink: '#F4EAEE', accent: '#E86A8C', accent2: '#C65C9A', dim: '#9A8E96' } },
      { name: '靛蓝对金', colors: { bg: '#101824', ink: '#EAF0FA', accent: '#5B8FE0', accent2: '#5A86D6', dim: '#8493AC' } }
    ],
    canvas: { virtualWidth: 1920, virtualHeight: 1080, defaultWidth: 1920, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'cb-glow-l', type: 'overlay', background: 'linear-gradient(90deg, rgba(224,82,107,0.26) 0%, rgba(224,82,107,0) 55%)', mixBlendMode: 'screen', opacity: 0.9, x: 0, y: 0, width: 1920, height: 1080, zIndex: 1 },
      { id: 'cb-glow-r', type: 'overlay', background: 'linear-gradient(270deg, rgba(79,163,232,0.26) 0%, rgba(79,163,232,0) 55%)', mixBlendMode: 'screen', opacity: 0.9, x: 0, y: 0, width: 1920, height: 1080, zIndex: 1 },
      { id: 'cb-dots', type: 'image', src: dotsBg(1920, 1080, 56, 'rgba(255,255,255,0.04)'), x: 0, y: 0, width: 1920, height: 1080, objectFit: 'fill', zIndex: 1 },
      { id: 'cb-kicker-l', type: 'text', content: 'ORIGINAL · 原唱', fontFamily: MONO, fontSize: 30, fontWeight: 700, letterSpacing: 6, color: { $t: 'colors.accent' }, x: 120, y: 90, width: 700, height: 44, zIndex: 4, animation: { name: 'fadeIn', duration: 420 }, editable: { content: true } },
      { id: 'cb-kicker-r', type: 'text', content: 'COVER · 翻唱', fontFamily: MONO, fontSize: 30, fontWeight: 700, letterSpacing: 6, color: { $t: 'colors.accent2' }, x: 1100, y: 90, width: 700, height: 44, zIndex: 4, animation: { name: 'fadeIn', duration: 420 }, editable: { content: true } },
      { id: 'cb-title-l', type: 'text', content: '原版编曲', fontFamily: { $t: 'fonts.heading' }, fontSize: 110, fontWeight: 900, color: { $t: 'colors.ink' }, x: 120, y: 160, width: 760, height: 150, zIndex: 5, animation: { name: 'fadeInUp', duration: 520, delay: 130 }, editable: { content: true } },
      { id: 'cb-title-r', type: 'text', content: '这版更戳我', fontFamily: { $t: 'fonts.heading' }, fontSize: 110, fontWeight: 900, color: { $t: 'colors.accent2' }, x: 1100, y: 160, width: 700, height: 150, zIndex: 5, animation: { name: 'fadeInUp', duration: 520, delay: 200 }, editable: { content: true } },
      { id: 'cb-sub-l', type: 'text', content: '钢琴主导 · 克制留白', fontFamily: HEI, fontSize: 36, color: { $t: 'colors.dim' }, x: 120, y: 440, width: 700, height: 50, zIndex: 4, editable: { content: true } },
      { id: 'cb-sub-r', type: 'text', content: '弦乐铺满 · 泪点加倍', fontFamily: HEI, fontSize: 36, color: { $t: 'colors.dim' }, x: 1100, y: 440, width: 700, height: 50, zIndex: 4, editable: { content: true } },
      { id: 'cb-vs', type: 'shape', shapeKind: 'circle', x: 880, y: 430, width: 160, height: 160, fill: { $t: 'colors.accent' }, zIndex: 6 },
      { id: 'cb-vs-t', type: 'text', content: 'VS', fontFamily: IMPACT, fontSize: 56, color: { $t: 'colors.bg' }, textAlign: 'center', x: 880, y: 478, width: 160, height: 70, zIndex: 7 },
      { id: 'cb-line-l', type: 'shape', shapeKind: 'line', x: 120, y: 560, width: 680, height: 2, fill: { $t: 'colors.accent' }, opacity: 0.5, zIndex: 4 },
      { id: 'cb-line-r', type: 'shape', shapeKind: 'line', x: 1120, y: 560, width: 680, height: 2, fill: { $t: 'colors.accent2' }, opacity: 0.5, zIndex: 4 },
      { id: 'cb-bar-l-bg', type: 'shape', shapeKind: 'rect', x: 120, y: 620, width: 680, height: 56, borderRadius: 28, fill: 'rgba(255,255,255,0.08)', zIndex: 4 },
      { id: 'cb-bar-l-fill', type: 'shape', shapeKind: 'rect', x: 130, y: 630, width: 430, height: 36, borderRadius: 18, fill: { $t: 'colors.accent' }, zIndex: 5, animation: { name: 'slideInLeft', duration: 600 } },
      { id: 'cb-bar-l-t', type: 'text', content: '8.4', fontFamily: IMPACT, fontSize: 40, color: { $t: 'colors.ink' }, x: 120, y: 700, width: 200, height: 54, zIndex: 5, editable: { content: true } },
      { id: 'cb-bar-l-k', type: 'text', content: '编曲完成度', fontFamily: HEI, fontSize: 24, color: { $t: 'colors.dim' }, x: 330, y: 712, width: 300, height: 36, zIndex: 5, editable: { content: true } },
      { id: 'cb-bar-r-bg', type: 'shape', shapeKind: 'rect', x: 1120, y: 620, width: 680, height: 56, borderRadius: 28, fill: 'rgba(255,255,255,0.08)', zIndex: 4 },
      { id: 'cb-bar-r-fill', type: 'shape', shapeKind: 'rect', x: 1130, y: 630, width: 560, height: 36, borderRadius: 18, fill: { $t: 'colors.accent2' }, zIndex: 5, animation: { name: 'slideInRight', duration: 600 } },
      { id: 'cb-bar-r-t', type: 'text', content: '9.1', fontFamily: IMPACT, fontSize: 40, color: { $t: 'colors.ink' }, x: 1120, y: 700, width: 200, height: 54, zIndex: 5, editable: { content: true } },
      { id: 'cb-bar-r-k', type: 'text', content: '情感张力', fontFamily: HEI, fontSize: 24, color: { $t: 'colors.dim' }, x: 1330, y: 712, width: 300, height: 36, zIndex: 5, editable: { content: true } },
      { id: 'cb-quote', type: 'text', content: '「副歌第二遍进鼓，整个人都化了」', fontFamily: HEI, fontSize: 36, color: { $t: 'colors.ink' }, x: 120, y: 830, width: 1680, height: 48, zIndex: 5, editable: { content: true } },
      { id: 'cb-t1', group: 'cb-t', type: 'shape', shapeKind: 'rect', x: 120, y: 960, width: 220, height: 60, borderRadius: 30, border: { width: 2, color: { $t: 'colors.accent' } }, zIndex: 4 },
      { id: 'cb-t1-t', type: 'text', content: '#深夜循环', fontFamily: HEI, fontSize: 24, color: { $t: 'colors.accent' }, textAlign: 'center', x: 120, y: 977, width: 220, height: 36, zIndex: 5, editable: { content: true } },
      { id: 'cb-t2', group: 'cb-t', type: 'shape', shapeKind: 'rect', x: 360, y: 960, width: 220, height: 60, borderRadius: 30, border: { width: 2, color: { $t: 'colors.accent2' } }, zIndex: 4 },
      { id: 'cb-t2-t', type: 'text', content: '#单曲收藏', fontFamily: HEI, fontSize: 24, color: { $t: 'colors.accent2' }, textAlign: 'center', x: 360, y: 977, width: 220, height: 36, zIndex: 5, editable: { content: true } },
      { id: 'cb-t3', group: 'cb-t', type: 'shape', shapeKind: 'rect', x: 600, y: 960, width: 220, height: 60, borderRadius: 30, border: { width: 2, color: { $t: 'colors.dim' } }, zIndex: 4 },
      { id: 'cb-t3-t', type: 'text', content: '#耳机食用', fontFamily: HEI, fontSize: 24, color: { $t: 'colors.dim' }, textAlign: 'center', x: 600, y: 977, width: 220, height: 36, zIndex: 5, editable: { content: true } },
      { id: 'cb-star', type: 'text', content: '★', fontFamily: SANS, fontSize: 44, color: { $t: 'colors.accent' }, x: 840, y: 960, width: 60, height: 60, zIndex: 4, animation: { name: 'pulse', duration: 2000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'cb-note', type: 'text', content: 'HY · MUSIC LAB', fontFamily: MONO, fontSize: 20, letterSpacing: 4, color: { $t: 'colors.dim' }, opacity: 0.6, x: 1500, y: 1010, width: 320, height: 30, zIndex: 4 }
    ]
  },

  // 3. 年度歌单盘点封面 —— 黑胶排行：旋转唱片 + TOP5 榜单 + 播放统计
  {
    id: 'hy-music-yearlist', name: '年度歌单盘点封面', version: '1.0.0', category: 'music',
    tags: ['hy', 'music', '年度盘点', '歌单', '排行', '4:5'],
    thumbnail: svgUri('<rect width="100" height="125" fill="%231F1420"/><rect x="10" y="12" width="30" height="4" rx="2" fill="%23E8B04B"/><rect x="10" y="21" width="40" height="12" rx="1" fill="%23F6ECEF"/><rect x="10" y="38" width="32" height="12" rx="1" fill="%23F6ECEF" opacity="0.7"/><circle cx="70" cy="38" r="18" fill="none" stroke="%23A89098" stroke-width="1.5"/><circle cx="70" cy="38" r="7" fill="none" stroke="%23E8B04B" stroke-width="1.5"/><circle cx="70" cy="38" r="2.5" fill="%23E8B04B"/><rect x="10" y="62" width="20" height="5" rx="1" fill="%23E0607E"/><rect x="34" y="63" width="30" height="3" rx="1" fill="%23F6ECEF"/><rect x="70" y="64" width="20" height="2" rx="1" fill="%23A89098"/><rect x="10" y="74" width="20" height="5" rx="1" fill="%23E0607E"/><rect x="34" y="75" width="30" height="3" rx="1" fill="%23F6ECEF"/><rect x="70" y="76" width="20" height="2" rx="1" fill="%23A89098"/><rect x="10" y="86" width="20" height="5" rx="1" fill="%23E0607E"/><rect x="34" y="87" width="30" height="3" rx="1" fill="%23F6ECEF"/><rect x="70" y="88" width="20" height="2" rx="1" fill="%23A89098"/><rect x="10" y="104" width="30" height="6" rx="3" fill="none" stroke="%23E8B04B" stroke-width="1.5"/>', 100, 125),
    tokens: {
      colors: {
        bg: { label: '底色', default: '#1F1420', options: ['#1F1420', '#141F18', '#121A26', '#241420'] },
        ink: { label: '主文字', default: '#F6ECEF', options: ['#F6ECEF', '#ECF5EE', '#ECF0FA', '#FAECF0'] },
        accent: { label: '烫金', default: '#E8B04B', options: ['#E8B04B', '#C9D96B', '#E8C14B', '#F2C4D1'] },
        accent2: { label: '莓红', default: '#E0607E', options: ['#E0607E', '#6FB58A', '#6B9BE0', '#E07A9B'] },
        dim: { label: '弱文字', default: '#A89098', options: ['#A89098', '#90A898', '#8E96AC', '#B08E98'] }
      },
      fonts: { heading: { label: '标题字体', default: HEI, options: [HEI, SONG] } }
    },
    presets: [
      { name: '金莓夜', colors: { bg: '#1F1420', ink: '#F6ECEF', accent: '#E8B04B', accent2: '#E0607E', dim: '#A89098' } },
      { name: '松绿晨', colors: { bg: '#141F18', ink: '#ECF5EE', accent: '#C9D96B', accent2: '#6FB58A', dim: '#90A898' } },
      { name: '蓝调电台', colors: { bg: '#121A26', ink: '#ECF0FA', accent: '#E8C14B', accent2: '#6B9BE0', dim: '#8E96AC' } },
      { name: '樱花粉', colors: { bg: '#241420', ink: '#FAECF0', accent: '#F2C4D1', accent2: '#E07A9B', dim: '#B08E98' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'yl-glow', type: 'overlay', background: 'radial-gradient(60% 50% at 70% 20%, rgba(224,96,126,0.24) 0%, rgba(224,96,126,0) 70%)', mixBlendMode: 'screen', opacity: 0.9, x: 0, y: 0, width: 1080, height: 1350, zIndex: 1 },
      { id: 'yl-dots', type: 'image', src: dotsBg(1080, 1350, 40, 'rgba(255,255,255,0.05)'), x: 0, y: 0, width: 1080, height: 1350, objectFit: 'fill', zIndex: 1 },
      { id: 'yl-disc1', group: 'yl-disc', type: 'shape', shapeKind: 'circle', x: 680, y: 90, width: 380, height: 380, border: { width: 2, color: { $t: 'colors.dim' } }, opacity: 0.5, zIndex: 2, animation: { name: 'spinSlow', duration: 30000, iterationCount: 'infinite', easing: 'linear' } },
      { id: 'yl-disc2', group: 'yl-disc', type: 'shape', shapeKind: 'circle', x: 790, y: 200, width: 160, height: 160, border: { width: 2, color: { $t: 'colors.accent' } }, opacity: 0.7, zIndex: 2, animation: { name: 'spinSlow', duration: 20000, iterationCount: 'infinite', easing: 'linear' } },
      { id: 'yl-disc3', group: 'yl-disc', type: 'shape', shapeKind: 'circle', x: 845, y: 255, width: 50, height: 50, fill: { $t: 'colors.accent' }, zIndex: 2 },
      { id: 'yl-no', type: 'text', content: 'YEAR 2025', fontFamily: MONO, fontSize: 26, fontWeight: 700, letterSpacing: 8, color: { $t: 'colors.accent' }, x: 88, y: 90, width: 500, height: 40, zIndex: 4 },
      { id: 'yl-kicker', type: 'text', content: 'ANNUAL LIST · 年度盘点', fontFamily: MONO, fontSize: 30, fontWeight: 700, letterSpacing: 4, color: { $t: 'colors.accent2' }, x: 88, y: 180, width: 820, height: 44, zIndex: 4, animation: { name: 'fadeIn', duration: 420 }, editable: { content: true } },
      { id: 'yl-title', type: 'text', content: '今年循环\n最多的 5 首', fontFamily: { $t: 'fonts.heading' }, fontSize: 130, fontWeight: 900, lineHeight: 1.16, color: { $t: 'colors.ink' }, x: 88, y: 280, width: 900, height: 360, zIndex: 5, animation: { name: 'fadeInUp', duration: 520, delay: 130 }, editable: { content: true, fontSize: { type: 'range', min: 100, max: 150 } } },
      { id: 'yl-rule', type: 'shape', shapeKind: 'rect', x: 88, y: 650, width: 400, height: 10, borderRadius: 5, fill: { $t: 'colors.accent' }, zIndex: 4, animation: { name: 'slideInLeft', duration: 520, delay: 260 } },
      { id: 'yl-r1-n', type: 'text', content: '01', fontFamily: IMPACT, fontSize: 40, color: { $t: 'colors.accent2' }, x: 88, y: 700, width: 100, height: 54, zIndex: 4 },
      { id: 'yl-r1-t', type: 'text', content: '夜色温柔点', fontFamily: HEI, fontSize: 34, color: { $t: 'colors.ink' }, x: 200, y: 706, width: 560, height: 46, zIndex: 4, editable: { content: true } },
      { id: 'yl-r1-p', type: 'text', content: '128 次', fontFamily: MONO, fontSize: 22, color: { $t: 'colors.dim' }, textAlign: 'right', x: 780, y: 712, width: 220, height: 32, zIndex: 4, editable: { content: true } },
      { id: 'yl-r2-n', type: 'text', content: '02', fontFamily: IMPACT, fontSize: 40, color: { $t: 'colors.accent2' }, x: 88, y: 790, width: 100, height: 54, zIndex: 4 },
      { id: 'yl-r2-t', type: 'text', content: '把烦恼折成纸船', fontFamily: HEI, fontSize: 34, color: { $t: 'colors.ink' }, x: 200, y: 796, width: 560, height: 46, zIndex: 4, editable: { content: true } },
      { id: 'yl-r2-p', type: 'text', content: '96 次', fontFamily: MONO, fontSize: 22, color: { $t: 'colors.dim' }, textAlign: 'right', x: 780, y: 802, width: 220, height: 32, zIndex: 4, editable: { content: true } },
      { id: 'yl-r3-n', type: 'text', content: '03', fontFamily: IMPACT, fontSize: 40, color: { $t: 'colors.accent2' }, x: 88, y: 880, width: 100, height: 54, zIndex: 4 },
      { id: 'yl-r3-t', type: 'text', content: '凌晨四点的海', fontFamily: HEI, fontSize: 34, color: { $t: 'colors.ink' }, x: 200, y: 886, width: 560, height: 46, zIndex: 4, editable: { content: true } },
      { id: 'yl-r3-p', type: 'text', content: '74 次', fontFamily: MONO, fontSize: 22, color: { $t: 'colors.dim' }, textAlign: 'right', x: 780, y: 892, width: 220, height: 32, zIndex: 4, editable: { content: true } },
      { id: 'yl-r4-n', type: 'text', content: '04', fontFamily: IMPACT, fontSize: 40, color: { $t: 'colors.dim' }, x: 88, y: 970, width: 100, height: 54, zIndex: 4 },
      { id: 'yl-r4-t', type: 'text', content: '旧磁带 B 面', fontFamily: HEI, fontSize: 34, color: { $t: 'colors.ink' }, x: 200, y: 976, width: 560, height: 46, zIndex: 4, editable: { content: true } },
      { id: 'yl-r4-p', type: 'text', content: '61 次', fontFamily: MONO, fontSize: 22, color: { $t: 'colors.dim' }, textAlign: 'right', x: 780, y: 982, width: 220, height: 32, zIndex: 4, editable: { content: true } },
      { id: 'yl-r5-n', type: 'text', content: '05', fontFamily: IMPACT, fontSize: 40, color: { $t: 'colors.dim' }, x: 88, y: 1060, width: 100, height: 54, zIndex: 4 },
      { id: 'yl-r5-t', type: 'text', content: '告别要慢一点', fontFamily: HEI, fontSize: 34, color: { $t: 'colors.ink' }, x: 200, y: 1066, width: 560, height: 46, zIndex: 4, editable: { content: true } },
      { id: 'yl-r5-p', type: 'text', content: '53 次', fontFamily: MONO, fontSize: 22, color: { $t: 'colors.dim' }, textAlign: 'right', x: 780, y: 1072, width: 220, height: 32, zIndex: 4, editable: { content: true } },
      { id: 'yl-foot', type: 'text', content: '全年共 1,286 次播放 · 你的耳朵很挑', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.dim' }, x: 88, y: 1180, width: 880, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'yl-pill', type: 'shape', shapeKind: 'rect', x: 88, y: 1270, width: 240, height: 60, borderRadius: 30, border: { width: 2, color: { $t: 'colors.accent' } }, zIndex: 4 },
      { id: 'yl-pill-t', type: 'text', content: '歌单链接在简介', fontFamily: HEI, fontSize: 24, color: { $t: 'colors.accent' }, textAlign: 'center', x: 88, y: 1287, width: 240, height: 36, zIndex: 5, editable: { content: true } },
      { id: 'yl-note', type: 'text', content: 'HY · YEAR LIST', fontFamily: MONO, fontSize: 20, letterSpacing: 4, color: { $t: 'colors.accent2' }, opacity: 0.6, x: 740, y: 1290, width: 300, height: 30, zIndex: 4 }
    ]
  },
  // 3. 歌词卡 —— 9:16 单曲安利：标题组 + 高亮 hook + 三行歌词 + 演唱 / 播放量
  {
    id: 'hy-music-lyric', name: '歌词卡', version: '1.0.0', category: 'music',
    tags: ['hy', 'music', 'lyric', '歌词', '单曲', '9:16'],
    thumbnail: svgUri('<rect width="100" height="160" fill="%231A1420"/><rect x="10" y="14" width="26" height="4" rx="2" fill="%23E8B04B"/><rect x="10" y="22" width="40" height="12" rx="1" fill="%23F6EFE3"/><rect x="10" y="40" width="34" height="12" rx="1" fill="%23F6EFE3" opacity="0.75"/><rect x="10" y="64" width="78" height="6" rx="3" fill="%23E8B04B"/><rect x="10" y="80" width="70" height="4" fill="%23A29394"/><rect x="10" y="92" width="76" height="4" fill="%23A29394" opacity="0.7"/><rect x="10" y="104" width="60" height="4" fill="%23A29394" opacity="0.5"/>', 100, 160),
    tokens: {
      colors: {
        bg: { label: '底色', default: '#1A1420', options: ['#1A1420', '#141C1A', '#201419', '#131A26'] },
        ink: { label: '主文字', default: '#F6EFE3', options: ['#F6EFE3', '#EAF2EA', '#F6EAEE', '#E9F0FA'] },
        accent: { label: '暖金', default: '#E8B04B', options: ['#E8B04B', '#57B98A', '#E8748C', '#5B9BEB'] },
        accent2: { label: '陶土红', default: '#D96C4F', options: ['#D96C4F', '#3F9E7E', '#C65C7E', '#4A7BC9'] },
        dim: { label: '弱文字', default: '#A29394', options: ['#A29394', '#7E988C', '#A88F94', '#8493AC'] }
      },
      fonts: { heading: { label: '标题字体', default: HEI, options: [HEI, SONG] } }
    },
    presets: [
      { name: '暖金夜话', colors: { bg: '#1A1420', ink: '#F6EFE3', accent: '#E8B04B', accent2: '#D96C4F', dim: '#A29394' } },
      { name: '苔绿清晨', colors: { bg: '#141C1A', ink: '#EAF2EA', accent: '#57B98A', accent2: '#3F9E7E', dim: '#7E988C' } },
      { name: '玫瑰夜听', colors: { bg: '#201419', ink: '#F6EAEE', accent: '#E8748C', accent2: '#C65C7E', dim: '#A88F94' } },
      { name: '蓝调电台', colors: { bg: '#131A26', ink: '#E9F0FA', accent: '#5B9BEB', accent2: '#4A7BC9', dim: '#8493AC' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1920, defaultWidth: 1080, defaultHeight: 1920, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'mly-glow', type: 'overlay', background: 'radial-gradient(62% 48% at 28% 16%, rgba(232,176,75,0.24) 0%, rgba(232,176,75,0) 70%)', mixBlendMode: 'screen', opacity: 0.9, x: 0, y: 0, width: 1080, height: 1920, zIndex: 1 },
      { id: 'mly-dots', type: 'image', src: dotsBg(1080, 1920, 40, 'rgba(255,255,255,0.05)'), x: 0, y: 0, width: 1080, height: 1920, objectFit: 'fill', zIndex: 1 },
      { id: 'mly-no', type: 'text', content: 'LYRIC 09', fontFamily: MONO, fontSize: 26, fontWeight: 700, letterSpacing: 6, color: { $t: 'colors.accent2' }, x: 88, y: 100, width: 500, height: 36, zIndex: 4 },
      { id: 'mly-note', type: 'text', content: 'HY · LYRIC', fontFamily: MONO, fontSize: 20, letterSpacing: 4, color: { $t: 'colors.dim' }, opacity: 0.6, x: 720, y: 104, width: 300, height: 30, zIndex: 4 },
      { id: 'mly-kicker', type: 'text', content: 'LYRIC CARD · 单曲循环', fontFamily: MONO, fontSize: 30, fontWeight: 700, letterSpacing: 5, color: { $t: 'colors.accent' }, x: 88, y: 190, width: 820, height: 44, zIndex: 4, animation: { name: 'fadeIn', duration: 420 }, editable: { content: true } },
      { id: 'mly-title', type: 'text', content: '把整座城市\n唱成副歌', fontFamily: { $t: 'fonts.heading' }, fontSize: 150, fontWeight: 900, lineHeight: 1.16, color: { $t: 'colors.ink' }, x: 88, y: 300, width: 900, height: 400, zIndex: 5, animation: { name: 'fadeInUp', duration: 520, delay: 130 }, editable: { content: true, fontSize: { type: 'range', min: 110, max: 170 } } },
      { id: 'mly-rule', type: 'shape', shapeKind: 'rect', x: 88, y: 660, width: 420, height: 10, borderRadius: 5, fill: { $t: 'colors.accent' }, zIndex: 4, animation: { name: 'slideInLeft', duration: 520, delay: 260 } },
      { id: 'mly-sub', type: 'text', content: '《晚风收集者》· 林晚', fontFamily: HEI, fontSize: 36, color: { $t: 'colors.dim' }, x: 88, y: 704, width: 900, height: 54, zIndex: 4, editable: { content: true } },
      { id: 'mly-hook', type: 'text', content: '「今晚的月亮，替我值班」', fontFamily: HEI, fontSize: 64, fontWeight: 700, lineHeight: 1.2, color: { $t: 'colors.accent' }, x: 88, y: 820, width: 900, height: 200, zIndex: 5, editable: { content: true } },
      { id: 'mly-l1', type: 'text', content: '把没说出口的，都交给旋律', fontFamily: HEI, fontSize: 32, color: { $t: 'colors.dim' }, x: 88, y: 1000, width: 880, height: 46, zIndex: 4, editable: { content: true } },
      { id: 'mly-l2', type: 'text', content: '副歌第二遍，灯一盏盏亮起来', fontFamily: HEI, fontSize: 32, color: { $t: 'colors.dim' }, x: 88, y: 1070, width: 880, height: 46, zIndex: 4, editable: { content: true } },
      { id: 'mly-l3', type: 'text', content: '这是属于我们那年的 BGM', fontFamily: HEI, fontSize: 32, color: { $t: 'colors.dim' }, x: 88, y: 1140, width: 880, height: 46, zIndex: 4, editable: { content: true } },
      { id: 'mly-art', type: 'text', content: '演唱  林晚  ·  本月循环 3,214 次', fontFamily: MONO, fontSize: 30, color: { $t: 'colors.dim' }, x: 88, y: 1260, width: 900, height: 44, zIndex: 4, editable: { content: true } },
      { id: 'mly-play', type: 'text', content: '▶', fontFamily: SANS, fontSize: 64, color: { $t: 'colors.accent' }, x: 88, y: 1420, width: 90, height: 90, zIndex: 4, animation: { name: 'pulse', duration: 2400, iterationCount: 'infinite', easing: 'ease-in-out' } }
    ]
  },
  // 4. 音乐节阵容海报 —— 4:5 双舞台 lineup：标题组 + 主舞台 headliner + 4 支持阵容
  {
    id: 'hy-music-festival', name: '音乐节阵容', version: '1.0.0', category: 'music',
    tags: ['hy', 'music', 'festival', '音乐节', '阵容', '4:5'],
    thumbnail: svgUri('<rect width="100" height="125" fill="%231C1226"/><rect x="10" y="12" width="26" height="4" rx="2" fill="%23B06CFF"/><rect x="10" y="20" width="42" height="12" rx="1" fill="%23F6EFF7"/><rect x="10" y="38" width="34" height="12" rx="1" fill="%23F6EFF7" opacity="0.75"/><circle cx="20" cy="70" r="5" fill="%23B06CFF"/><rect x="32" y="67" width="40" height="4" fill="%23A293B0"/><circle cx="20" cy="86" r="5" fill="%23FF6B9A"/><rect x="32" y="83" width="40" height="4" fill="%23A293B0"/><circle cx="20" cy="102" r="5" fill="%23B06CFF"/><rect x="32" y="99" width="40" height="4" fill="%23A293B0"/>', 100, 125),
    tokens: {
      colors: {
        bg: { label: '底色', default: '#1C1226', options: ['#1C1226', '#1A1420', '#10211C', '#141C2A'] },
        ink: { label: '主文字', default: '#F6EFF7', options: ['#F6EFF7', '#F6EFE3', '#E9F4F0', '#EAF1FB'] },
        accent: { label: '阵容紫', default: '#B06CFF', options: ['#B06CFF', '#5BD0A0', '#5B9BFF', '#E8748C'] },
        accent2: { label: '霓虹粉', default: '#FF6B9A', options: ['#FF6B9A', '#3F9E7E', '#8B6BFF', '#C85C8A'] },
        dim: { label: '弱文字', default: '#A293B0', options: ['#A293B0', '#A29394', '#7FA094', '#8493AC'] }
      },
      fonts: { heading: { label: '标题字体', default: HEI, options: [HEI, SONG] } }
    },
    presets: [
      { name: '霓虹紫粉', colors: { bg: '#1C1226', ink: '#F6EFF7', accent: '#B06CFF', accent2: '#FF6B9A', dim: '#A293B0' } },
      { name: '落日橙', colors: { bg: '#1A1420', ink: '#F6EFE3', accent: '#FF8A3D', accent2: '#8B6BFF', dim: '#A29394' } },
      { name: '深海青', colors: { bg: '#10211C', ink: '#E9F4F0', accent: '#3FD9A4', accent2: '#5B9BFF', dim: '#7FA094' } },
      { name: '晴空蓝', colors: { bg: '#141C2A', ink: '#EAF1FB', accent: '#5B9BFF', accent2: '#4A7BC9', dim: '#8493AC' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'mfe-glow', type: 'overlay', background: 'radial-gradient(64% 50% at 50% 16%, rgba(176,108,255,0.26) 0%, rgba(176,108,255,0) 70%)', mixBlendMode: 'screen', opacity: 0.9, x: 0, y: 0, width: 1080, height: 1350, zIndex: 1 },
      { id: 'mfe-dots', type: 'image', src: dotsBg(1080, 1350, 46, 'rgba(255,255,255,0.05)'), x: 0, y: 0, width: 1080, height: 1350, objectFit: 'fill', zIndex: 1 },
      { id: 'mfe-no', type: 'text', content: 'LIVE 09', fontFamily: MONO, fontSize: 26, fontWeight: 700, letterSpacing: 8, color: { $t: 'colors.accent2' }, x: 88, y: 80, width: 400, height: 40, zIndex: 4 },
      { id: 'mfe-note', type: 'text', content: 'HY · FEST', fontFamily: MONO, fontSize: 20, letterSpacing: 4, color: { $t: 'colors.dim' }, opacity: 0.6, x: 720, y: 84, width: 300, height: 30, zIndex: 4 },
      { id: 'mfe-kicker', type: 'text', content: 'MUSIC FESTIVAL · 阵容', fontFamily: MONO, fontSize: 30, fontWeight: 700, letterSpacing: 5, color: { $t: 'colors.accent' }, x: 88, y: 170, width: 820, height: 44, zIndex: 4, animation: { name: 'fadeIn', duration: 420 }, editable: { content: true } },
      { id: 'mfe-title', type: 'text', content: '盛夏\n音乐节', fontFamily: { $t: 'fonts.heading' }, fontSize: 130, fontWeight: 900, lineHeight: 1.16, color: { $t: 'colors.ink' }, x: 88, y: 280, width: 880, height: 360, zIndex: 5, animation: { name: 'fadeInUp', duration: 520, delay: 130 }, editable: { content: true, fontSize: { type: 'range', min: 100, max: 150 } } },
      { id: 'mfe-rule', type: 'shape', shapeKind: 'rect', x: 88, y: 608, width: 380, height: 10, borderRadius: 5, fill: { $t: 'colors.accent' }, zIndex: 4, animation: { name: 'slideInLeft', duration: 520, delay: 260 } },
      { id: 'mfe-sub', type: 'text', content: '8.16–8.17 · 滨海公园 · 双舞台', fontFamily: HEI, fontSize: 34, color: { $t: 'colors.dim' }, x: 88, y: 652, width: 900, height: 50, zIndex: 4, editable: { content: true } },
      { id: 'mfe-head', type: 'text', content: '主舞台 HEADLINER', fontFamily: MONO, fontSize: 24, letterSpacing: 4, color: { $t: 'colors.dim' }, x: 88, y: 730, width: 900, height: 34, zIndex: 4 },
      { id: 'mfe-h', type: 'text', content: '万能青年旅店', fontFamily: HEI, fontSize: 56, fontWeight: 900, color: { $t: 'colors.accent' }, x: 88, y: 768, width: 900, height: 70, zIndex: 5, editable: { content: true } },
      { id: 'mfe-s1', type: 'text', content: '草东没有派对', fontFamily: HEI, fontSize: 30, color: { $t: 'colors.ink' }, x: 120, y: 860, width: 840, height: 42, zIndex: 4, editable: { content: true } },
      { id: 'mfe-s2', type: 'text', content: '落日飞车', fontFamily: HEI, fontSize: 30, color: { $t: 'colors.ink' }, x: 120, y: 918, width: 840, height: 42, zIndex: 4, editable: { content: true } },
      { id: 'mfe-s3', type: 'text', content: '椅子乐团', fontFamily: HEI, fontSize: 30, color: { $t: 'colors.ink' }, x: 120, y: 976, width: 840, height: 42, zIndex: 4, editable: { content: true } },
      { id: 'mfe-s4', type: 'text', content: '海朋森', fontFamily: HEI, fontSize: 30, color: { $t: 'colors.ink' }, x: 120, y: 1034, width: 840, height: 42, zIndex: 4, editable: { content: true } }
    ]
  }
]

// src/core/templates/cute/hy-kawaii-blob.ts
// HY 系列 · 软萌块团（4:5 竖版）｜ 对标贴纸感角色 + 粉彩 + 星闪的可爱审美
import type { Template } from '@/types/types'
import {SANS, HEI, MONO, star, halftone, grainSoft} from '../_fx/trend'

export const hyKawaiiBlobTemplates: Template[] = [
  {
    id: 'hy-kawaii-blob', name: '软萌块团', version: '1.0.0', category: 'cute',
    tags: ['hy', 'kawaii', 'cute', 'pastel', 'sticker', '4:5', 'mascot'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="125" viewBox="0 0 100 125"><rect width="100" height="125" fill="%23FFF1F5"/><circle cx="50" cy="60" r="30" fill="%23FFB6C9"/><circle cx="40" cy="54" r="4" fill="%235B4353"/><circle cx="60" cy="54" r="4" fill="%235B4353"/><ellipse cx="50" cy="66" rx="6" ry="3.5" fill="%235B4353"/><circle cx="24" cy="30" r="7" fill="%23FFD84D"/><circle cx="80" cy="26" r="5" fill="%23A7DEE2"/><circle cx="78" cy="92" r="6" fill="%23C9A7F5"/><rect x="20" y="104" width="60" height="5" rx="2.5" fill="%235B4353"/></svg>',
    tokens: {
      colors: {
        bg: { label: '底色', default: '#FFF1F5', options: ['#FFF1F5', '#F3F0FF', '#FFF7E8', '#2E2A38'] },
        blob: { label: '主角色', default: '#FFB6C9', options: ['#FFB6C9', '#FFD6A5', '#A7DEE2', '#C9A7F5'] },
        cheek: { label: '腮红', default: '#FF8FA3', options: ['#FF8FA3', '#FFB067', '#7FC8DC', '#B58BEF'] },
        spark: { label: '星闪', default: '#FFD84D', options: ['#FFD84D', '#FFC0CB', '#9BE8A8', '#FFE066'] },
        ink: { label: '文字', default: '#5B4353', options: ['#5B4353', '#4A3F55', '#6B4A3A', '#FFF1F5'] }
      },
      fonts: {
        display: { label: '英文标题', default: SANS, options: [SANS, MONO, HEI] },
        cjk: { label: '中文', default: HEI, options: [HEI, SANS, MONO] },
        mono: { label: '等宽标注', default: MONO, options: [MONO, SANS, HEI] }
      }
    },
    presets: [
      { name: '草莓奶霜', colors: { bg: '#FFF1F5', blob: '#FFB6C9', cheek: '#FF8FA3', spark: '#FFD84D', ink: '#5B4353' } },
      { name: '焦糖布丁', colors: { bg: '#FFF7E8', blob: '#FFD6A5', cheek: '#FFB067', spark: '#FFC0CB', ink: '#6B4A3A' } },
      { name: '薄荷苏打', colors: { bg: '#F3F0FF', blob: '#A7DEE2', cheek: '#7FC8DC', spark: '#9BE8A8', ink: '#4A3F55' } },
      { name: '葡萄夜话', colors: { bg: '#2E2A38', blob: '#C9A7F5', cheek: '#B58BEF', spark: '#FFE066', ink: '#FFF1F5' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      // 柔和底部光斑
      { id: 'kb-glow1', type: 'shape', shapeKind: 'circle', x: -120, y: 120, width: 520, height: 520, fill: { $t: 'colors.blob' }, opacity: 0.18, zIndex: 1 },
      { id: 'kb-glow2', type: 'shape', shapeKind: 'circle', x: 700, y: 780, width: 560, height: 560, fill: { $t: 'colors.spark' }, opacity: 0.14, zIndex: 1 },
      // 网点（右下角一小片，增加贴纸印刷感）
      { id: 'kb-dots', type: 'overlay', x: 640, y: 940, width: 340, height: 340, rotation: 12, background: `url("${halftone(50, 50, 5, 17, '%235B4353')}")`, opacity: 0.12, zIndex: 2 },
      // 主角身躯（大圆角矩形当软块）
      { id: 'kb-body', type: 'shape', shapeKind: 'rect', x: 240, y: 330, width: 600, height: 600, borderRadius: 260, fill: { $t: 'colors.blob' }, shadow: { offsetX: 0, offsetY: 24, blur: 44, color: '#000000'}, zIndex: 3, animation: { name: 'heartbeat', duration: 5200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      // 耳朵 / 顶部两个小球
      { id: 'kb-ear-l', type: 'shape', shapeKind: 'circle', x: 300, y: 250, width: 150, height: 150, fill: { $t: 'colors.blob' }, zIndex: 2 },
      { id: 'kb-ear-r', type: 'shape', shapeKind: 'circle', x: 630, y: 250, width: 150, height: 150, fill: { $t: 'colors.blob' }, zIndex: 2 },
      // 眼睛
      { id: 'kb-eye-l', type: 'shape', shapeKind: 'circle', x: 400, y: 520, width: 56, height: 56, fill: { $t: 'colors.ink' }, zIndex: 4 },
      { id: 'kb-eye-r', type: 'shape', shapeKind: 'circle', x: 620, y: 520, width: 56, height: 56, fill: { $t: 'colors.ink' }, zIndex: 4 },
      // 眼睛高光
      { id: 'kb-eye-hl', type: 'shape', shapeKind: 'circle', x: 424, y: 538, width: 20, height: 20, fill: '#FFFFFF', opacity: 0.85, zIndex: 5 },
      { id: 'kb-eye-hr', type: 'shape', shapeKind: 'circle', x: 644, y: 538, width: 20, height: 20, fill: '#FFFFFF', opacity: 0.85, zIndex: 5 },
      // 腮红
      { id: 'kb-cheek-l', type: 'shape', shapeKind: 'circle', x: 340, y: 620, width: 96, height: 96, fill: { $t: 'colors.cheek' }, opacity: 0.55, zIndex: 4 },
      { id: 'kb-cheek-r', type: 'shape', shapeKind: 'circle', x: 640, y: 620, width: 96, height: 96, fill: { $t: 'colors.cheek' }, opacity: 0.55, zIndex: 4 },
      // 嘴巴（扁圆）
      { id: 'kb-mouth', type: 'shape', shapeKind: 'circle', x: 505, y: 640, width: 70, height: 42, fill: { $t: 'colors.ink' }, opacity: 0.9, zIndex: 4 },
      // 星闪点缀
      { id: 'kb-star1', group: 'kb-star', type: 'overlay', x: 150, y: 300, width: 120, height: 120, background: `url("${star(120, '%23FFD84D')}")`, opacity: 0.95, zIndex: 6, animation: { name: 'twinkle', duration: 4200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'kb-star2', group: 'kb-star', type: 'overlay', x: 830, y: 420, width: 90, height: 90, background: `url("${star(90, '%23FFD84D')}")`, opacity: 0.85, zIndex: 6, animation: { name: 'sparkle', duration: 5200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'kb-star3', group: 'kb-star', type: 'overlay', x: 200, y: 830, width: 70, height: 70, background: `url("${star(70, '%23FFD84D')}")`, opacity: 0.7, zIndex: 6, animation: { name: 'twinkle', duration: 6000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      // 漂浮小圆
      { id: 'kb-b1', type: 'shape', shapeKind: 'circle', x: 150, y: 620, width: 60, height: 60, fill: { $t: 'colors.spark' }, opacity: 0.8, zIndex: 6, animation: { name: 'float', duration: 6400, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'kb-b2', type: 'shape', shapeKind: 'circle', x: 900, y: 700, width: 44, height: 44, fill: { $t: 'colors.cheek' }, opacity: 0.75, zIndex: 6, animation: { name: 'float', duration: 7200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      // 顶部 HY 标记
      { id: 'kb-hy', type: 'text', content: 'HY', fontFamily: { $t: 'fonts.mono' }, fontSize: 24, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.5, letterSpacing: 4, x: 90, y: 96, width: 220, height: 34, zIndex: 10 },
      { id: 'kb-kicker', type: 'text', content: 'HELLO  /  SOFT DAYS', fontFamily: { $t: 'fonts.mono' }, fontSize: 20, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.55, letterSpacing: 4, textAlign: 'right', x: 690, y: 96, width: 300, height: 32, zIndex: 10, animation: { name: 'fadeIn', duration: 600 } },
      // 标题组
      { id: 'kb-title', type: 'text', content: 'Soft Buddy', fontFamily: { $t: 'fonts.display' }, fontSize: 104, fontWeight: '800', color: { $t: 'colors.ink' }, lineHeight: 1.1, letterSpacing: -1, textAlign: 'center', x: 140, y: 990, width: 800, height: 160, zIndex: 10, animation: { name: 'fadeInUp', duration: 900 }, editable: { content: true, fontSize: { type: 'range', min: 90, max: 132 } } },
      { id: 'kb-cjk', type: 'text', content: '今天也要软软的', fontFamily: { $t: 'fonts.cjk' }, fontSize: 38, fontWeight: '700', color: { $t: 'colors.ink' }, textAlign: 'center', letterSpacing: 4, x: 140, y: 1180, width: 800, height: 54, zIndex: 10, animation: { name: 'rise', duration: 900, delay: 180 }, editable: { content: true } },
      { id: 'kb-note', type: 'text', content: 'HY SOFT STUDIO · 01', fontFamily: { $t: 'fonts.mono' }, fontSize: 20, color: { $t: 'colors.ink' }, opacity: 0.5, letterSpacing: 3, textAlign: 'center', x: 140, y: 1250, width: 800, height: 30, zIndex: 10 },
      { id: 'kb-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1350, background: `url("${grainSoft(300, 27, 0.45)}")`, opacity: 0.035, mixBlendMode: 'multiply', zIndex: 12 }
    ]
  }
]

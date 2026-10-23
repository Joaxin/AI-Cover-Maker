// src/core/templates/film/hy-filmstrip-edit.ts —— 胶片编辑排版 Filmstrip Edit（4:5）
// 电影感封面：上下黑边 letterbox + 两侧胶片齿孔 + 中央暗场 + 衬线大标题 + 演职员小字 + 偏色光漏 + 强颗粒。
// HY 标记：id / 导出名 / tags 带 hy，底栏嵌入「HY FILMS / REEL 07」。
import type { Template } from '@/types/types'
import { HEI, MONO, SANS, SONG, SERIF, grain, perforations } from '../_fx/trend'

const stripL = perforations(60, 1158, 26, '%23EDEDED')
const stripR = perforations(60, 1158, 26, '%23EDEDED')

export const hyFilmstripEditTemplates: Template[] = [
  {
    id: 'hy-filmstrip-edit', name: '胶片编辑排版', version: '1.0.0', category: 'film',
    tags: ['hy', 'film', 'filmstrip', 'cinematic', 'serif', 'editorial', '4:5'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="108" height="135" viewBox="0 0 108 135"><rect width="108" height="135" fill="%230E0E12"/><rect x="0" y="0" width="108" height="14" fill="%23000000"/><rect x="0" y="121" width="108" height="14" fill="%23000000"/><rect x="10" y="20" width="6" height="95" fill="%23EDEDED" opacity="0.8"/><rect x="92" y="20" width="6" height="95" fill="%23EDEDED" opacity="0.8"/><text x="54" y="78" font-family="Georgia" font-size="16" fill="%23F2F0EA" text-anchor="middle">CUT</text><rect x="36" y="86" width="36" height="3" rx="1" fill="%23FF6B4A" opacity="0.8"/></svg>',
    tokens: {
      colors: {
        bg: { label: '底色', default: '#0E0E12', options: ['#0E0E12', '#101622', '#120E16', '#0B1410'] },
        ink: { label: '文字', default: '#F2F0EA', options: ['#F2F0EA', '#E6ECF5', '#F2EAF2', '#EAF2EC'] },
        leak: { label: '光漏', default: '#FF6B4A', options: ['#FF6B4A', '#38BDF8', '#C084FC', '#3DD6C0'] },
        frame: { label: '齿孔', default: '#EDEDED', options: ['#EDEDED', '#DCE6F5', '#F2EAF2', '#DCF2EA'] }
      },
      fonts: { heading: { label: '标题', default: SERIF, options: [SERIF, SONG, HEI] }, mono: { label: '小字', default: MONO, options: [MONO, SANS] } }
    },
    presets: [
      { name: '暖光漏', colors: { bg: '#0E0E12', ink: '#F2F0EA', leak: '#FF6B4A', frame: '#EDEDED' } },
      { name: '冷蓝漏', colors: { bg: '#101622', ink: '#E6ECF5', leak: '#38BDF8', frame: '#DCE6F5' } },
      { name: '紫调漏', colors: { bg: '#120E16', ink: '#F2EAF2', leak: '#C084FC', frame: '#F2EAF2' } },
      { name: '青绿漏', colors: { bg: '#0B1410', ink: '#EAF2EC', leak: '#3DD6C0', frame: '#DCF2EA' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'fs-bar-t', type: 'shape', shapeKind: 'rect', x: 0, y: 0, width: 1080, height: 110, fill: { $t: 'colors.bg' }, zIndex: 2 },
      { id: 'fs-bar-b', type: 'shape', shapeKind: 'rect', x: 0, y: 1240, width: 1080, height: 110, fill: { $t: 'colors.bg' }, zIndex: 2 },
      { id: 'fs-strip-l', type: 'image', src: stripL, x: 40, y: 110, width: 60, height: 1158, opacity: 0.85, zIndex: 3 },
      { id: 'fs-strip-r', type: 'image', src: stripR, x: 980, y: 110, width: 60, height: 1158, opacity: 0.85, zIndex: 3 },
      // —— 中央暗场 ——
      { id: 'fs-stage', type: 'overlay', x: 110, y: 110, width: 860, height: 1130, background: 'radial-gradient(circle at 50% 40%, rgba(255,255,255,0.06) 0%, rgba(0,0,0,0.55) 90%)', zIndex: 4 },
      // —— 偏色光漏 ——
      { id: 'fs-leak', type: 'overlay', x: 540, y: 110, width: 540, height: 1130, background: 'linear-gradient(200deg, rgba(255,107,74,0.0) 40%, rgba(255,107,74,0.28) 100%)', mixBlendMode: 'screen', zIndex: 5 },
      // —— 文字 ——
      { id: 'fs-kicker', type: 'text', content: 'A FILM BY STUDIO H — 第三幕', fontFamily: { $t: 'fonts.mono' }, fontSize: 23, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.8, letterSpacing: 6, textAlign: 'center', x: 140, y: 320, width: 800, height: 34, zIndex: 8, animation: { name: 'fadeIn', duration: 800 } },
      { id: 'fs-title', type: 'text', content: '幕间\n之息', fontFamily: { $t: 'fonts.heading' }, fontSize: 120, fontWeight: '700', color: { $t: 'colors.ink' }, lineHeight: 1.08, letterSpacing: 4, textAlign: 'center', x: 140, y: 520, width: 800, height: 280, zIndex: 8, animation: { name: 'fadeInUp', duration: 900, delay: 160 }, editable: { content: true, fontSize: { type: 'range', min: 96, max: 136 } } },
      { id: 'fs-sub', type: 'text', content: '雨夜的长镜头，停在一盏未灭的灯上。', fontFamily: { $t: 'fonts.heading' }, fontSize: 32, color: { $t: 'colors.ink' }, opacity: 0.84, letterSpacing: 3, lineHeight: 1.4, textAlign: 'center', x: 160, y: 840, width: 760, height: 48, zIndex: 8, animation: { name: 'rise', duration: 800, delay: 360 }, editable: { content: true } },
      { id: 'fs-cast', type: 'text', content: '导演 林屿  /  摄影 周野  /  剪辑 苏白', fontFamily: { $t: 'fonts.mono' }, fontSize: 22, color: { $t: 'colors.ink' }, opacity: 0.66, letterSpacing: 4, textAlign: 'center', x: 140, y: 940, width: 800, height: 32, zIndex: 8 },
      { id: 'fs-foot', type: 'text', content: 'HY FILMS / REEL 07', fontFamily: { $t: 'fonts.mono' }, fontSize: 22, color: { $t: 'colors.ink' }, opacity: 0.6, letterSpacing: 6, textAlign: 'center', x: 140, y: 1300, width: 800, height: 30, zIndex: 8 },
      { id: 'fs-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1350, background: `url("${grain(300, 23, 0.55)}")`, opacity: 0.08, mixBlendMode: 'multiply', zIndex: 20 }
    ]
  }
]

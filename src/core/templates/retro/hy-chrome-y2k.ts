// src/core/templates/retro/hy-chrome-liquid.ts —— 液态铬金属 Chrome Liquid（1:1）
// Y2K chrome type：同串文字叠 8 阶金属色层（id 含 ghost 豁免 CLASH）+ 横向掠光 + 漂浮铬球。
// HY 标记：id / 导出名 / tags 带 hy，脚注嵌入「HY CHROME SERIES / 2026」。
import type { Template } from '@/types/types'
import { HEI, MONO, SANS, SERIF, grain, star } from '../_fx/trend'

const TITLE = 'CHROME'
const BASE_Y = 540
// 8 阶金属明暗（亮→暗），每个预设给出同色相的 8 个值
const RAMP = ['chrome0', 'chrome1', 'chrome2', 'chrome3', 'chrome4', 'chrome5', 'chrome6', 'chrome7'] as const
const layers = RAMP.map((k, i) => ({
  id: `hy-cr-title-ghost-${i}`,
  type: 'text' as const,
  content: TITLE,
  fontFamily: SANS,
  fontSize: 160,
  fontWeight: '800' as const,
  color: { $t: `colors.${k}` } as any,
  letterSpacing: -2,
  x: 200,
  y: BASE_Y + i * 6,
  width: 760,
  height: 168,
  zIndex: 5,
  animation: { name: 'fadeInUp' as const, duration: 900, delay: i * 40 }
}))

export const hyChromeY2KTemplates: Template[] = [
  {
    id: 'hy-chrome-y2k', name: '液态铬金属 · Y2K', version: '1.0.0', category: 'retro',
    tags: ['hy', 'retro', 'chrome', 'liquid metal', 'y2k', 'typographic', '1:1'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23E9E2F5"/><circle cx="28" cy="30" r="24" fill="%23C9B8F0" opacity="0.6"/><circle cx="74" cy="60" r="22" fill="%23B8CDEF" opacity="0.55"/><text x="14" y="60" font-family="Arial" font-size="26" font-weight="800" fill="%23FFFFFF">CR</text><text x="14" y="60" font-family="Arial" font-size="26" font-weight="800" fill="%233A4A66" opacity="0.5">CR</text></svg>',
    tokens: {
      colors: {
        bg: { label: '底色', default: '#E9E2F5', options: ['#E9E2F5', '#F6E2EA', '#E2F1F8', '#15151B'] },
        ink: { label: '文字', default: '#3A2F55', options: ['#3A2F55', '#5A2740', '#123F58', '#EDEDF2'] },
        accentA: { label: '光斑一', default: '#C9B8F0', options: ['#C9B8F0', '#F0B6C6', '#A9DDF2', '#3C3C3C'] },
        accentB: { label: '光斑二', default: '#B8CDEF', options: ['#B8CDEF', '#E190A6', '#49A6CC', '#5A5A5A'] },
        chrome0: { label: '铬阶0', default: '#FFFFFF', options: ['#FFFFFF', '#FFF0F4', '#F0FBFF', '#EDEDED'] },
        chrome1: { label: '铬阶1', default: '#E6EDF7', options: ['#E6EDF7', '#FAD9E2', '#D6F0FB', '#CFCFCF'] },
        chrome2: { label: '铬阶2', default: '#C2CEE6', options: ['#C2CEE6', '#F0B6C6', '#A9DDF2', '#A6A6A6'] },
        chrome3: { label: '铬阶3', default: '#9DB0D2', options: ['#9DB0D2', '#E190A6', '#76C2E0', '#7E7E7E'] },
        chrome4: { label: '铬阶4', default: '#7388B4', options: ['#7388B4', '#C56E88', '#49A6CC', '#5A5A5A'] },
        chrome5: { label: '铬阶5', default: '#4E628C', options: ['#4E628C', '#A24E68', '#2E85AC', '#3C3C3C'] },
        chrome6: { label: '铬阶6', default: '#33405E', options: ['#33405E', '#7E3A50', '#1E6486', '#262626'] },
        chrome7: { label: '铬阶7', default: '#1E2738', options: ['#1E2738', '#5A2740', '#123F58', '#141414'] }
      },
      fonts: { heading: { label: '标题', default: SANS, options: [SANS, HEI, SERIF] }, mono: { label: '小字', default: MONO, options: [MONO, SANS] } }
    },
    presets: [
      { name: '银河铬', colors: { bg: '#E9E2F5', ink: '#3A2F55', accentA: '#C9B8F0', accentB: '#B8CDEF', chrome0: '#FFFFFF', chrome1: '#E6EDF7', chrome2: '#C2CEE6', chrome3: '#9DB0D2', chrome4: '#7388B4', chrome5: '#4E628C', chrome6: '#33405E', chrome7: '#1E2738' } },
      { name: '玫瑰铬', colors: { bg: '#F6E2EA', ink: '#5A2740', accentA: '#F0B6C6', accentB: '#E190A6', chrome0: '#FFF0F4', chrome1: '#FAD9E2', chrome2: '#F0B6C6', chrome3: '#E190A6', chrome4: '#C56E88', chrome5: '#A24E68', chrome6: '#7E3A50', chrome7: '#5A2740' } },
      { name: '冰蓝铬', colors: { bg: '#E2F1F8', ink: '#123F58', accentA: '#A9DDF2', accentB: '#49A6CC', chrome0: '#F0FBFF', chrome1: '#D6F0FB', chrome2: '#A9DDF2', chrome3: '#76C2E0', chrome4: '#49A6CC', chrome5: '#2E85AC', chrome6: '#1E6486', chrome7: '#123F58' } },
      { name: '黑铬', colors: { bg: '#15151B', ink: '#EDEDF2', accentA: '#3C3C3C', accentB: '#5A5A5A', chrome0: '#EDEDED', chrome1: '#CFCFCF', chrome2: '#A6A6A6', chrome3: '#7E7E7E', chrome4: '#5A5A5A', chrome5: '#3C3C3C', chrome6: '#262626', chrome7: '#141414' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1080, defaultWidth: 1080, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'cr-glow-1', type: 'shape', shapeKind: 'circle', x: 140, y: 120, width: 640, height: 640, fill: { $t: 'colors.accentA' }, opacity: 0.5, zIndex: 2, animation: { name: 'drift', duration: 13000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'cr-glow-2', type: 'shape', shapeKind: 'circle', x: 560, y: 460, width: 560, height: 560, fill: { $t: 'colors.accentB' }, opacity: 0.45, zIndex: 2, animation: { name: 'float', duration: 15000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'cr-center', type: 'overlay', x: 0, y: 0, width: 1080, height: 1080, background: 'radial-gradient(circle at 50% 38%, rgba(255,255,255,0.30) 0%, rgba(255,255,255,0) 58%)', zIndex: 3 },
      // —— 铬字厚度（最底层，echo 豁免）——
      { id: 'hy-cr-title-echo-shadow', type: 'text', content: TITLE, fontFamily: SANS, fontSize: 160, fontWeight: '800', color: { $t: 'colors.chrome7' }, letterSpacing: -2, x: 200, y: BASE_Y + 8 * 6 + 34, width: 760, height: 168, zIndex: 4, animation: { name: 'fadeInUp', duration: 900 } },
      ...layers,
      // —— 横向掠光 ——
      { id: 'hy-cr-sheen', type: 'overlay', x: 150, y: 540, width: 780, height: 200, background: 'linear-gradient(105deg, rgba(255,255,255,0) 30%, rgba(255,255,255,0.55) 50%, rgba(255,255,255,0) 70%)', mixBlendMode: 'screen', zIndex: 9, animation: { name: 'gradientPan', duration: 6000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      // —— 文字 ——
      { id: 'cr-kicker', type: 'text', content: 'LIQUID METAL · 液态金属', fontFamily: { $t: 'fonts.mono' }, fontSize: 24, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.8, letterSpacing: 8, x: 200, y: 360, width: 760, height: 36, zIndex: 8, animation: { name: 'slideInLeft', duration: 700 } },
      { id: 'cr-sub', type: 'text', content: '一束高光，掠过整片金属。', fontFamily: { $t: 'fonts.heading' }, fontSize: 30, color: { $t: 'colors.ink' }, opacity: 0.85, letterSpacing: 2, x: 200, y: 800, width: 760, height: 44, zIndex: 8, animation: { name: 'rise', duration: 800, delay: 360 }, editable: { content: true } },
      { id: 'cr-foot', type: 'text', content: 'HY CHROME SERIES / 2026', fontFamily: { $t: 'fonts.mono' }, fontSize: 20, color: { $t: 'colors.ink' }, opacity: 0.6, letterSpacing: 5, x: 200, y: 1000, width: 460, height: 30, zIndex: 8 },
      // —— 点缀 ——
      { id: 'cr-star-1', type: 'image', src: star(90, '%23FFFFFF'), x: 150, y: 250, width: 90, height: 90, zIndex: 7, opacity: 0.9, animation: { name: 'twinkle', duration: 3200, iterationCount: 'infinite' } },
      { id: 'cr-star-2', type: 'image', src: star(64, '%23FFFFFF'), x: 860, y: 760, width: 64, height: 64, zIndex: 7, opacity: 0.85, animation: { name: 'twinkle', duration: 4200, delay: 600, iterationCount: 'infinite' } },
      { id: 'cr-orb', type: 'shape', shapeKind: 'circle', x: 820, y: 240, width: 138, height: 138, fill: { $t: 'colors.chrome0' }, border: { width: 2, color: { $t: 'colors.chrome4' } }, zIndex: 7, animation: { name: 'float', duration: 9000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'cr-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1080, background: `url("${grain(300, 11, 0.55)}")`, opacity: 0.05, mixBlendMode: 'overlay', zIndex: 20 }
    ]
  }
]

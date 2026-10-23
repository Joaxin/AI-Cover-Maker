// src/core/templates/academic/hy-specimen-journal.ts —— 植物图鉴标本 Specimen Journal（1:1）
// 博物标本排版：米色纸底 + 细双线框 + 手绘植物线条（局部 plant() 生成茎叶描边）
// + 拉丁学名斜体衬线 + 编号印章 + 分栏小注。HY 标记：id / 导出名 / tags 带 hy，脚注嵌入「HY HERBARIUM / NO.12」。
import type { Template } from '@/types/types'
import { HEI, MONO, SANS, SONG, SERIF, grain } from '../_fx/trend'
import { svgUri } from '../_fx/common'

const INK = '%234A3A2E'

/** 手绘植物：主茎 + 三片叶 + 小叶脉，全部描边、无填充，做出博物图谱的线稿感 */
function plant() {
  const stem = 'M300 660 C290 520 320 420 300 300 C288 220 312 150 300 90'
  const leaf = (cx: number, cy: number, rot: number, s: number) =>
    `<path d='M${cx} ${cy} C${cx - 70 * s} ${cy - 30 * s} ${cx - 80 * s} ${cy - 110 * s} ${cx} ${cy - 140 * s} C${cx + 80 * s} ${cy - 110 * s} ${cx + 70 * s} ${cy - 30 * s} ${cx} ${cy} Z' fill='none' stroke='${INK}' stroke-width='3' stroke-opacity='0.8' transform='rotate(${rot} ${cx} ${cy})'/>` +
    `<path d='M${cx} ${cy} L${cx} ${cy - 120 * s}' fill='none' stroke='${INK}' stroke-width='1.6' stroke-opacity='0.6' transform='rotate(${rot} ${cx} ${cy})'/>`
  return svgUri(
    `<path d='${stem}' fill='none' stroke='${INK}' stroke-width='4' stroke-opacity='0.85' stroke-linecap='round'/>` +
    leaf(300, 520, -34, 1) + leaf(300, 380, 26, 0.86) + leaf(300, 240, -22, 0.72) +
    `<circle cx='300' cy='90' r='14' fill='none' stroke='${INK}' stroke-width='3' stroke-opacity='0.85'/>`,
    600, 680
  )
}

export const hySpecimenJournalTemplates: Template[] = [
  {
    id: 'hy-specimen-journal', name: '植物图鉴标本', version: '1.0.0', category: 'academic',
    tags: ['hy', 'academic', 'herbarium', 'botanical', 'specimen', 'line art', '1:1'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23F5EFE2"/><rect x="12" y="12" width="76" height="76" fill="none" stroke="%234A3A2E" stroke-width="1" stroke-opacity="0.6"/><path d="M50 78 C48 60 52 48 50 34" fill="none" stroke="%234A3A2E" stroke-width="2"/><path d="M50 56 C42 52 40 42 50 34 C60 42 58 52 50 56 Z" fill="none" stroke="%234A3A2E" stroke-width="1.4"/><circle cx="50" cy="30" r="3" fill="none" stroke="%234A3A2E" stroke-width="1.4"/><text x="50" y="94" font-family="Georgia" font-size="9" font-style="italic" fill="%234A3A2E" text-anchor="middle">N°12</text></svg>',
    tokens: {
      colors: {
        bg: { label: '纸底', default: '#F5EFE2', options: ['#F5EFE2', '#EFF3EE', '#F6EEE2', '#EDEFF4'] },
        ink: { label: '墨色', default: '#4A3A2E', options: ['#4A3A2E', '#33403A', '#5A4326', '#3E3A52'] },
        accent: { label: '印泥', default: '#B5482F', options: ['#B5482F', '#3A6E5A', '#9A6A2E', '#7A4A8A'] },
        line: { label: '细框', default: '#4A3A2E', options: ['#4A3A2E', '#33403A', '#5A4326', '#3E3A52'] }
      },
      fonts: { heading: { label: '标题', default: SONG, options: [SONG, SERIF, HEI] }, mono: { label: '小字', default: MONO, options: [MONO, SANS] } }
    },
    presets: [
      { name: '褐墨', colors: { bg: '#F5EFE2', ink: '#4A3A2E', accent: '#B5482F', line: '#4A3A2E' } },
      { name: '苔绿', colors: { bg: '#EFF3EE', ink: '#33403A', accent: '#3A6E5A', line: '#33403A' } },
      { name: '赭黄', colors: { bg: '#F6EEE2', ink: '#5A4326', accent: '#9A6A2E', line: '#5A4326' } },
      { name: '紫灰', colors: { bg: '#EDEFF4', ink: '#3E3A52', accent: '#7A4A8A', line: '#3E3A52' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1080, defaultWidth: 1080, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'sp-vignette', type: 'overlay', x: 0, y: 0, width: 1080, height: 1080, background: 'radial-gradient(circle at 50% 44%, rgba(255,255,255,0.4) 0%, rgba(120,100,70,0.10) 100%)', zIndex: 2 },
      // —— 细双线框 ——
      { id: 'sp-frame-out', type: 'shape', shapeKind: 'rect', x: 80, y: 80, width: 920, height: 920, fill: 'transparent', borderRadius: 4, border: { width: 2, color: { $t: 'colors.line' } }, opacity: 0.55, zIndex: 4 },
      { id: 'sp-frame-in', type: 'shape', shapeKind: 'rect', x: 96, y: 96, width: 888, height: 888, fill: 'transparent', borderRadius: 3, border: { width: 1, color: { $t: 'colors.line' } }, opacity: 0.45, zIndex: 4 },
      // —— 文字（左侧文案区）——
      { id: 'sp-kicker', type: 'text', content: 'HERBARIUM · 植物图鉴', fontFamily: { $t: 'fonts.mono' }, fontSize: 23, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.7, letterSpacing: 8, x: 140, y: 200, width: 760, height: 34, zIndex: 8, animation: { name: 'slideInLeft', duration: 700 } },
      { id: 'sp-title', type: 'text', content: '标本图鉴', fontFamily: { $t: 'fonts.heading' }, fontSize: 92, fontWeight: '700', color: { $t: 'colors.ink' }, letterSpacing: 6, lineHeight: 1.2, x: 140, y: 250, width: 420, height: 120, zIndex: 8, animation: { name: 'fadeInUp', duration: 900, delay: 120 }, editable: { content: true, fontSize: { type: 'range', min: 70, max: 104 } } },
      { id: 'sp-sub', type: 'text', content: '一花一木，皆是被时间\n收存下来的注脚。', fontFamily: { $t: 'fonts.heading' }, fontSize: 30, color: { $t: 'colors.ink' }, opacity: 0.82, letterSpacing: 2, lineHeight: 1.45, x: 140, y: 400, width: 380, height: 100, zIndex: 8, animation: { name: 'rise', duration: 800, delay: 340 }, editable: { content: true } },
      // —— 植物线稿 ——
      { id: 'sp-plant', type: 'image', src: plant(), x: 470, y: 250, width: 540, height: 612, zIndex: 5, animation: { name: 'fadeIn', duration: 1000, delay: 240 } },
      // —— 编号印章 ——
      { id: 'sp-stamp', type: 'shape', shapeKind: 'circle', x: 760, y: 800, width: 150, height: 150, fill: 'transparent', border: { width: 3, color: { $t: 'colors.accent' } }, opacity: 0.8, zIndex: 6, rotation: -8 },
      { id: 'sp-stamp-t', type: 'text', content: 'N°12', fontFamily: { $t: 'fonts.heading' }, fontSize: 40, fontWeight: '700', color: { $t: 'colors.accent' }, textAlign: 'center', lineHeight: 3.7, x: 760, y: 800, width: 150, height: 150, rotation: -8, zIndex: 7, editable: { content: true } },
      // —— 拉丁学名 + 分栏小注 ——
      { id: 'sp-latin', type: 'text', content: 'Botanica\nSilvestris', fontFamily: { $t: 'fonts.heading' }, fontSize: 30, fontStyle: 'italic', color: { $t: 'colors.ink' }, opacity: 0.78, letterSpacing: 2, lineHeight: 1.3, x: 140, y: 720, width: 360, height: 90, zIndex: 8 },
      { id: 'sp-note', type: 'text', content: '采集 春 · 林缘\n标本室 / 第 III 区', fontFamily: { $t: 'fonts.mono' }, fontSize: 22, color: { $t: 'colors.ink' }, opacity: 0.62, letterSpacing: 3, lineHeight: 1.5, x: 140, y: 880, width: 360, height: 80, zIndex: 8 },
      { id: 'sp-foot', type: 'text', content: 'HY HERBARIUM / NO.12', fontFamily: { $t: 'fonts.mono' }, fontSize: 21, color: { $t: 'colors.ink' }, opacity: 0.55, letterSpacing: 5, x: 140, y: 1000, width: 420, height: 30, zIndex: 8 },
      { id: 'sp-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1080, background: `url("${grain(300, 31, 0.55)}")`, opacity: 0.07, mixBlendMode: 'multiply', zIndex: 20 }
    ]
  }
]

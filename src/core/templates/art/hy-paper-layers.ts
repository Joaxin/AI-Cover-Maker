// src/core/templates/art/hy-paper-layers.ts
// HY 系列 · 纸雕层叠（4:5）｜ 对标 AI 生成图像的 3D paper relief 质感
import type { Template } from '@/types/types'
import {SANS, HEI, MONO, grainSoft, grain} from '../_fx/trend'

export const hyPaperLayersTemplates: Template[] = [
  {
    id: 'hy-paper-layers', name: '纸雕层叠', version: '1.0.0', category: 'art',
    tags: ['hy', 'paper', 'relief', 'layered', 'soft shadow', '4:5'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="125" viewBox="0 0 100 125"><rect width="100" height="125" fill="%23F3EEE6"/><rect x="14" y="30" width="72" height="74" rx="10" fill="%23E7D9C4" opacity="0.9"/><rect x="22" y="40" width="56" height="60" rx="8" fill="%23D9B98C" opacity="0.95"/><rect x="30" y="50" width="40" height="46" rx="6" fill="%23C79A6A"/><circle cx="74" cy="40" r="9" fill="%23E0764A"/><rect x="14" y="112" width="40" height="3" fill="%2316161D"/></svg>',
    tokens: {
      colors: {
        bg: { label: '底', default: '#F3EEE6', options: ['#F3EEE6', '#EFE7DC', '#EAF0EC', '#F1ECF3'] },
        paper1: { label: '纸1', default: '#E7D9C4', options: ['#E7D9C4', '#DCE7E2', '#E3DCEF', '#F0E2D2'] },
        paper2: { label: '纸2', default: '#D9B98C', options: ['#D9B98C', '#B9CFC6', '#C3B6DD', '#D9B98C'] },
        paper3: { label: '纸3', default: '#C79A6A', options: ['#C79A6A', '#8FB3A6', '#9A86C0', '#C79A6A'] },
        ink: { label: '字', default: '#2E241A', options: ['#2E241A', '#243A33', '#2A2440', '#33271C'] },
        accent: { label: '点缀', default: '#E0764A', options: ['#E0764A', '#3E9D7C', '#7A5BD0', '#C9622E'] }
      },
      fonts: {
        display: { label: '英文', default: SANS, options: [SANS, MONO] },
        cjk: { label: '中文', default: HEI, options: [HEI, SANS] },
        mono: { label: '信息', default: MONO, options: [MONO, SANS] }
      }
    },
    presets: [
      { name: '陶土暖棕', colors: { bg: '#F3EEE6', paper1: '#E7D9C4', paper2: '#D9B98C', paper3: '#C79A6A', ink: '#2E241A', accent: '#E0764A' } },
      { name: '雾绿苔青', colors: { bg: '#EAF0EC', paper1: '#DCE7E2', paper2: '#B9CFC6', paper3: '#8FB3A6', ink: '#243A33', accent: '#3E9D7C' } },
      { name: '薰衣雾紫', colors: { bg: '#F1ECF3', paper1: '#E3DCEF', paper2: '#C3B6DD', paper3: '#9A86C0', ink: '#2A2440', accent: '#7A5BD0' } },
      { name: '蜜杏拿铁', colors: { bg: '#F1ECF3', paper1: '#F0E2D2', paper2: '#D9B98C', paper3: '#C79A6A', ink: '#33271C', accent: '#C9622E' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      // 层叠纸
      { id: 'pl-sheet1', group: 'pl-sheet', type: 'shape', shapeKind: 'rect', x: 120, y: 300, width: 840, height: 900, fill: { $t: 'colors.paper1' }, borderRadius: 40, shadow: { offsetX: 0, offsetY: 20, blur: 44, color: 'rgba(40,30,20,0.14)' }, zIndex: 2, animation: { name: 'fadeInUp', duration: 800 } },
      { id: 'pl-sheet2', group: 'pl-sheet', type: 'shape', shapeKind: 'rect', x: 180, y: 380, width: 720, height: 820, fill: { $t: 'colors.paper2' }, borderRadius: 36, shadow: { offsetX: 0, offsetY: 16, blur: 36, color: 'rgba(40,30,20,0.14)' }, zIndex: 3, animation: { name: 'fadeInUp', duration: 800, delay: 80 } },
      { id: 'pl-sheet3', group: 'pl-sheet', type: 'shape', shapeKind: 'rect', x: 240, y: 460, width: 600, height: 740, fill: { $t: 'colors.paper3' }, borderRadius: 32, shadow: { offsetX: 0, offsetY: 12, blur: 28, color: 'rgba(40,30,20,0.16)' }, zIndex: 4, animation: { name: 'fadeInUp', duration: 800, delay: 160 } },
      { id: 'pl-accent', type: 'shape', shapeKind: 'circle', x: 770, y: 540, width: 200, height: 200, fill: { $t: 'colors.accent' }, opacity: 0.92, zIndex: 5, shadow: { offsetX: 0, offsetY: 10, blur: 20, color: 'rgba(40,30,20,0.18)' }, animation: { name: 'float', duration: 7200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'pl-tri', type: 'shape', shapeKind: 'rect', x: 300, y: 560, width: 90, height: 90, fill: { $t: 'colors.accent' }, opacity: 0.5, rotation: 45, zIndex: 5, animation: { name: 'spinSlow', duration: 18000, iterationCount: 'infinite', easing: 'linear' } },
      // 文字（统一 x=300）
      { id: 'pl-kicker', type: 'text', content: 'PAPER RELIEF', fontFamily: { $t: 'fonts.mono' }, fontSize: 24, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 6, x: 300, y: 520, width: 480, height: 36, zIndex: 6, animation: { name: 'fadeIn', duration: 600, delay: 220 }, editable: { content: true } },
      { id: 'pl-title', type: 'text', content: '纸上山河', fontFamily: { $t: 'fonts.cjk' }, fontSize: 96, fontWeight: '800', color: { $t: 'colors.ink' }, x: 300, y: 600, width: 480, height: 130, zIndex: 6, animation: { name: 'fadeInUp', duration: 860, delay: 300 }, editable: { content: true, fontSize: { type: 'range', min: 72, max: 110 } } },
      { id: 'pl-sub', type: 'text', content: '层叠的卡纸，托起一句安静的话。', fontFamily: { $t: 'fonts.cjk' }, fontSize: 30, color: { $t: 'colors.ink' }, opacity: 0.78, x: 300, y: 760, width: 480, height: 80, zIndex: 6, animation: { name: 'rise', duration: 800, delay: 380 }, editable: { content: true } },
      { id: 'pl-num', type: 'text', content: '03', fontFamily: { $t: 'fonts.display' }, fontSize: 220, fontWeight: '800', color: { $t: 'colors.ink' }, opacity: 0.06, x: 620, y: 940, width: 400, height: 260, zIndex: 4 },
      { id: 'pl-foot', type: 'text', content: 'STUDIO HY · PAPER SERIES', fontFamily: { $t: 'fonts.mono' }, fontSize: 22, color: { $t: 'colors.ink' }, opacity: 0.55, letterSpacing: 3, x: 90, y: 1250, width: 900, height: 30, zIndex: 5, animation: { name: 'fadeIn', duration: 700, delay: 460 }, editable: { content: true } },
      { id: 'pl-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1350, background: `url("${grainSoft(300, 11, 0.5)}")`, opacity: 0.05, mixBlendMode: 'multiply', zIndex: 9 }
    ]
  }
]

// src/core/templates/retro/hy-pop-dots.ts
// HY 系列 · 半调网点波普（1080×1440）｜ 对标 AI 生成图像的复古印刷 remix
import type { Template } from '@/types/types'
import {SANS, HEI, MONO, IMPACT, halftone, star, grainSoft, grain} from '../_fx/trend'

export const hyPopDotsTemplates: Template[] = [
  {
    id: 'hy-pop-dots', name: '半调网点波普', version: '1.0.0', category: 'retro',
    tags: ['hy', 'halftone', 'pop', 'cmyk', 'print', '1080x1440'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="133" viewBox="0 0 100 133"><rect width="100" height="133" fill="%23FDF6E3"/><rect x="14" y="20" width="72" height="60" fill="%23FF2D9B"/><circle cx="26" cy="34" r="3" fill="%23FDF6E3"/><circle cx="38" cy="34" r="3" fill="%23FDF6E3"/><circle cx="50" cy="34" r="3" fill="%23FDF6E3"/><circle cx="62" cy="34" r="3" fill="%23FDF6E3"/><text x="16" y="110" font-family="Impact, Arial Black, sans-serif" font-size="40" fill="%2316161D">POP</text><rect x="16" y="118" width="50" height="4" fill="%2316161D"/></svg>',
    tokens: {
      colors: {
        bg: { label: '底', default: '#FDF6E3', options: ['#FDF6E3', '#F4EFE6', '#EAF2F6', '#0E0E12'] },
        ink: { label: '墨', default: '#16161D', options: ['#16161D', '#1A1A1A', '#10202E', '#F4F6F8'] },
        pop1: { label: '波普1', default: '#FF2D9B', options: ['#FF2D9B', '#22D3EE', '#FFB800', '#7C3AED'] },
        pop2: { label: '波普2', default: '#22D3EE', options: ['#22D3EE', '#FF2D9B', '#22C55E', '#F97316'] },
        pop3: { label: '波普3', default: '#FFB800', options: ['#FFB800', '#F97316', '#A3E635', '#FACC15'] },
        dot: { label: '网点', default: '#16161D', options: ['#16161D', '#1A1A1A', '#10202E', '#F4F6F8'] }
      },
      fonts: {
        display: { label: '标题', default: IMPACT, options: [IMPACT, SANS] },
        cjk: { label: '中文', default: HEI, options: [HEI, SANS] },
        mono: { label: '等宽', default: MONO, options: [MONO, SANS] }
      }
    },
    presets: [
      { name: '桃红湖蓝', colors: { bg: '#FDF6E3', ink: '#16161D', pop1: '#FF2D9B', pop2: '#22D3EE', pop3: '#FFB800', dot: '#16161D' } },
      { name: '青绿橙红', colors: { bg: '#F4EFE6', ink: '#1A1A1A', pop1: '#22D3EE', pop2: '#FF2D9B', pop3: '#F97316', dot: '#1A1A1A' } },
      { name: '薄荷柠黄', colors: { bg: '#EAF2F6', ink: '#10202E', pop1: '#22C55E', pop2: '#A3E635', pop3: '#FACC15', dot: '#10202E' } },
      { name: '暗夜霓虹', colors: { bg: '#0E0E12', ink: '#F4F6F8', pop1: '#FF2D9B', pop2: '#22D3EE', pop3: '#FACC15', dot: '#F4F6F8' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1440, defaultWidth: 1080, defaultHeight: 1440, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      // 大色块
      { id: 'hp-block', type: 'shape', shapeKind: 'rect', x: 120, y: 560, width: 840, height: 560, fill: { $t: 'colors.pop1' }, zIndex: 1, animation: { name: 'zoomIn', duration: 800 } },
      // 半调网点（斜置）
      { id: 'hp-ht', type: 'overlay', x: 120, y: 300, width: 840, height: 840, background: `url("${halftone(60, 60, 9, 6, '#111111')}")`, opacity: 0.22, rotation: -8, zIndex: 2 },
      // 星点 / 对话泡点缀
      { id: 'hp-star', type: 'overlay', x: 770, y: 180, width: 160, height: 160, background: `url("${star(160, '#FFB800')}")`, opacity: 0.9, zIndex: 5 },
      // 重影（豁免）
      { id: 'hp-ghost', type: 'text', content: 'POP!', fontFamily: { $t: 'fonts.display' }, fontSize: 240, fontWeight: '900', color: { $t: 'colors.pop2' }, opacity: 0.5, x: 150, y: 300, width: 840, height: 280, zIndex: 5 },
      // 主标题
      { id: 'hp-title', type: 'text', content: 'POP!', fontFamily: { $t: 'fonts.display' }, fontSize: 240, fontWeight: '900', color: { $t: 'colors.ink' }, x: 130, y: 300, width: 840, height: 280, zIndex: 6, animation: { name: 'fadeInUp', duration: 820 }, editable: { content: true, fontSize: { type: 'range', min: 180, max: 260 } } },
      // 票根条
      { id: 'hp-ticket', type: 'shape', shapeKind: 'rect', x: 120, y: 980, width: 840, height: 120, fill: { $t: 'colors.ink' }, zIndex: 3, animation: { name: 'fadeInUp', duration: 760, delay: 200 } },
      { id: 'hp-ticket-t', type: 'text', content: 'NO.07 / 限量波普印刷', fontFamily: { $t: 'fonts.cjk' }, fontSize: 30, fontWeight: '700', color: { $t: 'colors.bg' }, x: 160, y: 1010, width: 760, height: 60, zIndex: 4, animation: { name: 'fadeIn', duration: 700, delay: 280 }, editable: { content: true } },
      // 底部信息
      { id: 'hp-foot', type: 'text', content: 'HY · POP SERIES', fontFamily: { $t: 'fonts.mono' }, fontSize: 22, color: { $t: 'colors.ink' }, opacity: 0.7, letterSpacing: 3, x: 120, y: 1340, width: 840, height: 32, zIndex: 5, animation: { name: 'fadeIn', duration: 700, delay: 340 }, editable: { content: true } },
      { id: 'hp-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1440, background: `url("${grainSoft(300, 11, 0.5)}")`, opacity: 0.05, mixBlendMode: 'multiply', zIndex: 9 }
    ]
  }
]

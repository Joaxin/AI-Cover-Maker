// src/core/templates/retro/hy4-stamp-receipt.ts —— 票据印章 Receipt（3:4）
// 票据语言：米黄收据纸 + 打孔边 + 等宽打字机行 + 朱红旋转印章。
// HY4 标记：id / 导出名 / tags 带 hy4，票尾嵌入「NO.HY4-0417」。
import type { Template } from '@/types/types'
import { HEI, MONO, SANS, grain } from '../_fx/trend'

export const hy4StampReceiptTemplates: Template[] = [
  {
    id: 'hy4-stamp-receipt', name: '票据印章', version: '1.0.0', category: 'retro',
    tags: ['hy4', 'retro', 'receipt', 'stamp', 'typewriter', 'mono', '3:4'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="108" height="144" viewBox="0 0 108 144"><rect width="108" height="144" fill="%23F4EEDF"/><g fill="%23DDD2BC"><circle cx="14" cy="8" r="3"/><circle cx="38" cy="8" r="3"/><circle cx="62" cy="8" r="3"/><circle cx="86" cy="8" r="3"/><circle cx="14" cy="136" r="3"/><circle cx="38" cy="136" r="3"/><circle cx="62" cy="136" r="3"/><circle cx="86" cy="136" r="3"/></g><rect x="16" y="30" width="56" height="4" rx="2" fill="%233B342B"/><rect x="16" y="42" width="44" height="4" rx="2" fill="%233B342B" opacity="0.6"/><rect x="16" y="62" width="76" height="2" fill="%233B342B" opacity="0.4"/><rect x="16" y="74" width="52" height="4" rx="2" fill="%233B342B" opacity="0.6"/><circle cx="76" cy="98" r="16" fill="none" stroke="%23B4462F" stroke-width="2.5"/></svg>',
    tokens: {
      colors: {
        bg: { label: '纸底', default: '#F4EEDF', options: ['#F4EEDF', '#F7F2E8', '#20201D', '#EFEAE0'] },
        ink: { label: '字色', default: '#3B342B', options: ['#3B342B', '#332D25', '#F0EADA', '#2B2A24'] },
        faint: { label: '分隔线', default: '#DDD2BC', options: ['#DDD2BC', '#D6CAB2', '#4A473D', '#D5CDBE'] },
        stamp: { label: '印色', default: '#B4462F', options: ['#B4462F', '#A63D28', '#2F6B8E', '#7A6A4F'] }
      },
      fonts: { heading: { label: '标题', default: HEI, options: [HEI, SANS] }, note: { label: '票据体', default: MONO, options: [MONO, SANS] } }
    },
    presets: [
      { name: '米黄票', colors: { bg: '#F4EEDF', ink: '#3B342B', faint: '#DDD2BC', stamp: '#B4462F' } },
      { name: '象牙票', colors: { bg: '#F7F2E8', ink: '#332D25', faint: '#D6CAB2', stamp: '#A63D28' } },
      { name: '夜班票', colors: { bg: '#20201D', ink: '#F0EADA', faint: '#4A473D', stamp: '#2F6B8E' } },
      { name: '牛皮票', colors: { bg: '#EFEAE0', ink: '#2B2A24', faint: '#D5CDBE', stamp: '#7A6A4F' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1440, defaultWidth: 1080, defaultHeight: 1440, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      // 打孔边（小圆模拟齿孔）
      { id: 'hy4-rc-p1', group: 'hy4-rc-p', type: 'shape', shapeKind: 'circle', x: 90, y: 60, width: 44, height: 44, fill: { $t: 'colors.faint' }, zIndex: 2 },
      { id: 'hy4-rc-p2', group: 'hy4-rc-p', type: 'shape', shapeKind: 'circle', x: 330, y: 60, width: 44, height: 44, fill: { $t: 'colors.faint' }, zIndex: 2 },
      { id: 'hy4-rc-p3', group: 'hy4-rc-p', type: 'shape', shapeKind: 'circle', x: 570, y: 60, width: 44, height: 44, fill: { $t: 'colors.faint' }, zIndex: 2 },
      { id: 'hy4-rc-p4', group: 'hy4-rc-p', type: 'shape', shapeKind: 'circle', x: 810, y: 60, width: 44, height: 44, fill: { $t: 'colors.faint' }, zIndex: 2 },
      { id: 'hy4-rc-p5', group: 'hy4-rc-p', type: 'shape', shapeKind: 'circle', x: 90, y: 1336, width: 44, height: 44, fill: { $t: 'colors.faint' }, zIndex: 2 },
      { id: 'hy4-rc-p6', group: 'hy4-rc-p', type: 'shape', shapeKind: 'circle', x: 330, y: 1336, width: 44, height: 44, fill: { $t: 'colors.faint' }, zIndex: 2 },
      { id: 'hy4-rc-p7', group: 'hy4-rc-p', type: 'shape', shapeKind: 'circle', x: 570, y: 1336, width: 44, height: 44, fill: { $t: 'colors.faint' }, zIndex: 2 },
      { id: 'hy4-rc-p8', group: 'hy4-rc-p', type: 'shape', shapeKind: 'circle', x: 810, y: 1336, width: 44, height: 44, fill: { $t: 'colors.faint' }, zIndex: 2 },
      // 票头
      { id: 'hy4-rc-head', type: 'text', content: 'HY4 SUPPLY CO.', fontFamily: { $t: 'fonts.note' }, fontSize: 40, fontWeight: '700', color: { $t: 'colors.ink' }, letterSpacing: 6, textAlign: 'center', x: 140, y: 180, width: 800, height: 52, zIndex: 6, animation: { name: 'fadeIn', duration: 700 } },
      { id: 'hy4-rc-headsub', type: 'text', content: '收据 / RECEIPT', fontFamily: { $t: 'fonts.note' }, fontSize: 26, color: { $t: 'colors.ink' }, opacity: 0.7, letterSpacing: 8, textAlign: 'center', x: 140, y: 244, width: 800, height: 36, zIndex: 6 },
      { id: 'hy4-rc-rule1', type: 'shape', shapeKind: 'rect', x: 140, y: 306, width: 800, height: 2, fill: { $t: 'colors.faint' }, zIndex: 5 },
      // 打字机明细行
      { id: 'hy4-rc-l1', type: 'text', content: 'ITEM　　DESIGN PAPER ×02', fontFamily: { $t: 'fonts.note' }, fontSize: 28, color: { $t: 'colors.ink' }, opacity: 0.86, letterSpacing: 2, x: 140, y: 340, width: 800, height: 40, zIndex: 6, animation: { name: 'fadeIn', duration: 600, delay: 200 }, editable: { content: true } },
      { id: 'hy4-rc-l2', type: 'text', content: 'ITEM　　INK CARTRIDGE ×01', fontFamily: { $t: 'fonts.note' }, fontSize: 28, color: { $t: 'colors.ink' }, opacity: 0.86, letterSpacing: 2, x: 140, y: 392, width: 800, height: 40, zIndex: 6, animation: { name: 'fadeIn', duration: 600, delay: 280 }, editable: { content: true } },
      { id: 'hy4-rc-l3', type: 'text', content: 'ITEM　　RUBBER STAMP ×01', fontFamily: { $t: 'fonts.note' }, fontSize: 28, color: { $t: 'colors.ink' }, opacity: 0.86, letterSpacing: 2, x: 140, y: 444, width: 800, height: 40, zIndex: 6, animation: { name: 'fadeIn', duration: 600, delay: 360 }, editable: { content: true } },
      { id: 'hy4-rc-rule2', type: 'shape', shapeKind: 'rect', x: 140, y: 512, width: 800, height: 2, fill: { $t: 'colors.faint' }, zIndex: 5 },
      // 金额
      { id: 'hy4-rc-total-l', type: 'text', content: 'TOTAL', fontFamily: { $t: 'fonts.note' }, fontSize: 30, fontWeight: '700', color: { $t: 'colors.ink' }, letterSpacing: 5, x: 140, y: 546, width: 300, height: 42, zIndex: 6 },
      { id: 'hy4-rc-total-r', type: 'text', content: '¥ 128.00', fontFamily: { $t: 'fonts.note' }, fontSize: 34, fontWeight: '700', color: { $t: 'colors.ink' }, letterSpacing: 2, textAlign: 'right', x: 540, y: 542, width: 400, height: 46, zIndex: 6, animation: { name: 'pulse', duration: 3600, iterationCount: 'infinite', easing: 'ease-in-out' } },
      // 旋转印章
      { id: 'hy4-rc-stamp-ring', type: 'shape', shapeKind: 'circle', x: 600, y: 780, width: 300, height: 300, fill: 'transparent', border: { width: 8, color: { $t: 'colors.stamp' } }, opacity: 0.85, rotation: -12, zIndex: 7, animation: { name: 'zoomIn', duration: 700, delay: 500 } },
      { id: 'hy4-rc-stamp-ring2', type: 'shape', shapeKind: 'circle', x: 646, y: 826, width: 208, height: 208, fill: 'transparent', border: { width: 3, color: { $t: 'colors.stamp' } }, opacity: 0.7, rotation: -12, zIndex: 7 },
      { id: 'hy4-rc-stamp-t', type: 'text', content: 'PAID', fontFamily: { $t: 'fonts.note' }, fontSize: 56, fontWeight: '700', color: { $t: 'colors.stamp' }, opacity: 0.9, letterSpacing: 6, textAlign: 'center', rotation: -12, x: 640, y: 878, width: 220, height: 70, zIndex: 8 },
      // 主标题
      { id: 'hy4-rc-title', type: 'text', content: '一纸\n为凭', fontFamily: { $t: 'fonts.heading' }, fontSize: 100, fontWeight: '800', color: { $t: 'colors.ink' }, lineHeight: 1.08, letterSpacing: 4, x: 140, y: 1140, width: 700, height: 230, zIndex: 8, animation: { name: 'fadeInUp', duration: 900, delay: 200 }, editable: { content: true, fontSize: { type: 'range', min: 84, max: 112 } } },
      { id: 'hy4-rc-no', type: 'text', content: 'NO.HY4-0417', fontFamily: { $t: 'fonts.note' }, fontSize: 22, color: { $t: 'colors.ink' }, opacity: 0.6, letterSpacing: 4, x: 140, y: 1382, width: 500, height: 30, zIndex: 8 },
      { id: 'hy4-rc-thanks', type: 'text', content: 'THANK YOU', fontFamily: { $t: 'fonts.note' }, fontSize: 22, color: { $t: 'colors.ink' }, opacity: 0.5, letterSpacing: 5, textAlign: 'right', x: 640, y: 1382, width: 300, height: 30, zIndex: 8 },
      { id: 'hy4-rc-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1440, background: `url("${grain(320, 29, 0.5)}")`, opacity: 0.07, mixBlendMode: 'multiply', zIndex: 20 }
    ]
  }
]

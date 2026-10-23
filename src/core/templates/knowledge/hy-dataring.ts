// src/core/templates/knowledge/hy-dataring.ts
// HY 系列 · 同心数据环（4:5）｜ 对标 AI 生成图像里的数据可视化封面
import type { Template } from '@/types/types'
import {SANS, HEI, MONO, grainSoft, grain} from '../_fx/trend'

export const hyDataRingTemplates: Template[] = [
  {
    id: 'hy-dataring', name: '同心数据环', version: '1.0.0', category: 'knowledge',
    tags: ['hy', 'data', 'ring', 'infographic', '4:5', 'chart'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="125" viewBox="0 0 100 125"><rect width="100" height="125" fill="%23F4F2EC"/><circle cx="40" cy="45" r="30" fill="none" stroke="%236366F1" stroke-width="4"/><circle cx="40" cy="45" r="20" fill="none" stroke="%2310B981" stroke-width="3"/><circle cx="40" cy="45" r="11" fill="none" stroke="%23EAB308" stroke-width="2.5"/><text x="28" y="52" font-family="Helvetica" font-size="20" font-weight="800" fill="%2316161D">78</text><rect x="12" y="86" width="76" height="4" fill="%2316161D"/><rect x="12" y="96" width="52" height="3" fill="%2316161D" opacity="0.5"/><rect x="12" y="104" width="64" height="3" fill="%2316161D" opacity="0.3"/></svg>',
    tokens: {
      colors: {
        bg: { label: '底色', default: '#F4F2EC', options: ['#F4F2EC', '#EEF1F6', '#0E1116', '#1A1410'] },
        ink: { label: '文字', default: '#16161D', options: ['#16161D', '#1B2A3A', '#F3ECDD', '#F4ECE0'] },
        muted: { label: '灰字', default: '#8A857A', options: ['#8A857A', '#8C97A0', '#9A958A', '#B9A98F'] },
        ring1: { label: '环1', default: '#6366F1', options: ['#6366F1', '#0EA5E9', '#10B981', '#E11D48'] },
        ring2: { label: '环2', default: '#10B981', options: ['#10B981', '#22C55E', '#0EA5E9', '#F59E0B'] },
        ring3: { label: '环3', default: '#EAB308', options: ['#EAB308', '#F59E0B', '#A855F7', '#EC4899'] },
        accent: { label: '中心', default: '#E11D48', options: ['#E11D48', '#EF4444', '#F43F5E', '#0EA5E9'] }
      },
      fonts: {
        display: { label: '数字英文', default: SANS, options: [SANS, MONO] },
        cjk: { label: '中文', default: HEI, options: [HEI, SANS] },
        mono: { label: '等宽', default: MONO, options: [MONO, SANS] }
      }
    },
    presets: [
      { name: '靛绿金红', colors: { bg: '#F4F2EC', ink: '#16161D', muted: '#8A857A', ring1: '#6366F1', ring2: '#10B981', ring3: '#EAB308', accent: '#E11D48' } },
      { name: '湖蓝青绿', colors: { bg: '#EEF1F6', ink: '#1B2A3A', muted: '#8C97A0', ring1: '#0EA5E9', ring2: '#22C55E', ring3: '#F59E0B', accent: '#EF4444' } },
      { name: '暗夜霓虹', colors: { bg: '#0E1116', ink: '#F3ECDD', muted: '#9A958A', ring1: '#6366F1', ring2: '#10B981', ring3: '#A855F7', accent: '#F43F5E' } },
      { name: '陶土暖调', colors: { bg: '#1A1410', ink: '#F4ECE0', muted: '#B9A98F', ring1: '#0EA5E9', ring2: '#10B981', ring3: '#F59E0B', accent: '#EC4899' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      // 同心数据环
      { id: 'dr-r1', group: 'dr-r', type: 'shape', shapeKind: 'circle', x: 290, y: 230, width: 500, height: 500, fill: 'transparent', border: { width: 24, color: { $t: 'colors.ring1' } }, zIndex: 2, animation: { name: 'zoomIn', duration: 800 } },
      { id: 'dr-r2', group: 'dr-r', type: 'shape', shapeKind: 'circle', x: 340, y: 280, width: 400, height: 400, fill: 'transparent', border: { width: 20, color: { $t: 'colors.ring2' } }, zIndex: 2, animation: { name: 'zoomIn', duration: 800, delay: 80 } },
      { id: 'dr-r3', group: 'dr-r', type: 'shape', shapeKind: 'circle', x: 390, y: 330, width: 300, height: 300, fill: 'transparent', border: { width: 16, color: { $t: 'colors.ring3' } }, zIndex: 2, animation: { name: 'zoomIn', duration: 800, delay: 160 } },
      { id: 'dr-r4', group: 'dr-r', type: 'shape', shapeKind: 'circle', x: 435, y: 375, width: 210, height: 210, fill: 'transparent', border: { width: 12, color: { $t: 'colors.accent' } }, zIndex: 2, animation: { name: 'spinSlow', duration: 24000, iterationCount: 'infinite', easing: 'linear' } },
      { id: 'dr-cn', type: 'text', content: '78%', fontFamily: { $t: 'fonts.display' }, fontSize: 132, fontWeight: '800', color: { $t: 'colors.ink' }, textAlign: 'center', x: 390, y: 420, width: 300, height: 130, zIndex: 5, animation: { name: 'fadeInUp', duration: 800, delay: 240 }, editable: { content: true } },
      { id: 'dr-unit', type: 'text', content: 'OVERALL SCORE', fontFamily: { $t: 'fonts.mono' }, fontSize: 22, fontWeight: '600', color: { $t: 'colors.muted' }, textAlign: 'center', letterSpacing: 3, x: 390, y: 560, width: 300, height: 30, zIndex: 5, animation: { name: 'fadeIn', duration: 700, delay: 320 }, editable: { content: true } },
      // 右侧指标（左对齐，统一 x=700）
      { id: 'dr-m1', type: 'text', content: '01 · 流量 +34%', fontFamily: { $t: 'fonts.display' }, fontSize: 30, fontWeight: '700', color: { $t: 'colors.ink' }, x: 700, y: 300, width: 360, height: 40, zIndex: 5, animation: { name: 'slideInLeft', duration: 700, delay: 360 }, editable: { content: true } },
      { id: 'dr-m2', type: 'text', content: '02 · 转化 12%', fontFamily: { $t: 'fonts.display' }, fontSize: 30, fontWeight: '700', color: { $t: 'colors.ink' }, x: 700, y: 360, width: 360, height: 40, zIndex: 5, animation: { name: 'slideInLeft', duration: 700, delay: 420 }, editable: { content: true } },
      { id: 'dr-m3', type: 'text', content: '03 · 留存 9%', fontFamily: { $t: 'fonts.display' }, fontSize: 30, fontWeight: '700', color: { $t: 'colors.ink' }, x: 700, y: 420, width: 360, height: 40, zIndex: 5, animation: { name: 'slideInLeft', duration: 700, delay: 480 }, editable: { content: true } },
      // 底部三胶囊
      { id: 'dr-p1', group: 'dr-p', type: 'shape', shapeKind: 'rect', x: 90, y: 760, width: 280, height: 70, fill: { $t: 'colors.ring1' }, opacity: 0.9, borderRadius: 16, zIndex: 4, animation: { name: 'fadeInUp', duration: 700, delay: 520 } },
      { id: 'dr-p1t', type: 'text', content: '流量 +34%', fontFamily: { $t: 'fonts.cjk' }, fontSize: 28, fontWeight: '700', color: { $t: 'colors.bg' }, textAlign: 'center', lineHeight: 2.5, x: 90, y: 760, width: 280, height: 70, zIndex: 5 },
      { id: 'dr-p2', group: 'dr-p', type: 'shape', shapeKind: 'rect', x: 400, y: 760, width: 280, height: 70, fill: { $t: 'colors.ring2' }, opacity: 0.9, borderRadius: 16, zIndex: 4, animation: { name: 'fadeInUp', duration: 700, delay: 580 } },
      { id: 'dr-p2t', type: 'text', content: '转化 12%', fontFamily: { $t: 'fonts.cjk' }, fontSize: 28, fontWeight: '700', color: { $t: 'colors.bg' }, textAlign: 'center', lineHeight: 2.5, x: 400, y: 760, width: 280, height: 70, zIndex: 5 },
      { id: 'dr-p3', group: 'dr-p', type: 'shape', shapeKind: 'rect', x: 710, y: 760, width: 280, height: 70, fill: { $t: 'colors.ring3' }, opacity: 0.9, borderRadius: 16, zIndex: 4, animation: { name: 'fadeInUp', duration: 700, delay: 640 } },
      { id: 'dr-p3t', type: 'text', content: '留存 9%', fontFamily: { $t: 'fonts.cjk' }, fontSize: 28, fontWeight: '700', color: { $t: 'colors.bg' }, textAlign: 'center', lineHeight: 2.5, x: 710, y: 760, width: 280, height: 70, zIndex: 5 },
      // 分隔 + 标题
      { id: 'dr-rule', type: 'shape', shapeKind: 'line', x: 90, y: 880, width: 900, height: 2, fill: { $t: 'colors.ink' }, opacity: 0.2, zIndex: 3 },
      { id: 'dr-title', type: 'text', content: '数据会说话', fontFamily: { $t: 'fonts.cjk' }, fontSize: 96, fontWeight: '800', color: { $t: 'colors.ink' }, x: 90, y: 920, width: 900, height: 120, zIndex: 6, animation: { name: 'fadeInUp', duration: 820, delay: 700 }, editable: { content: true, fontSize: { type: 'range', min: 72, max: 110 } } },
      { id: 'dr-sub', type: 'text', content: '用一圈光环，把关键指标讲成故事。', fontFamily: { $t: 'fonts.cjk' }, fontSize: 30, color: { $t: 'colors.muted' }, x: 90, y: 1050, width: 900, height: 80, zIndex: 6, animation: { name: 'rise', duration: 800, delay: 780 }, editable: { content: true } },
      { id: 'dr-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1350, background: `url("${grainSoft(300, 11, 0.5)}")`, opacity: 0.04, mixBlendMode: 'multiply', zIndex: 9 }
    ]
  }
]

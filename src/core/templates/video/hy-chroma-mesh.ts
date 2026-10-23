// src/core/templates/video/hy-chroma-mesh.ts
// HY 系列 · 虹彩流体网格（16:9 视频封面）｜ 对标当下 AI 生成图像的渐变审美
import type { Template } from '@/types/types'
import {SANS, HEI, SERIF, grainSoft, grain} from '../_fx/trend'

export const hyChromaMeshTemplates: Template[] = [
  {
    id: 'hy-chroma-mesh', name: '虹彩流体网格', version: '1.0.0', category: 'video',
    tags: ['hy', 'chroma', 'mesh', 'gradient', '16:9', 'video', 'cover'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="56" viewBox="0 0 100 56"><rect width="100" height="56" fill="%23F5F3FF"/><circle cx="22" cy="18" r="16" fill="%2386EFAC"/><circle cx="74" cy="32" r="20" fill="%23C4B5FD"/><circle cx="50" cy="50" r="13" fill="%23FDBA74"/><rect x="8" y="44" width="42" height="3" fill="%2316161D"/><rect x="8" y="50" width="26" height="3" fill="%2316161D" opacity="0.5"/></svg>',
    tokens: {
      colors: {
        bg: { label: '底色', default: '#F5F3FF', options: ['#F5F3FF', '#EFF6FF', '#FEF2F8', '#0B1020'] },
        ink: { label: '文字', default: '#16161D', options: ['#16161D', '#0F172A', '#3A2A1E', '#F8FAFC'] },
        mesh1: { label: '虹彩1', default: '#86EFAC', options: ['#86EFAC', '#93C5FD', '#FCD34D', '#F9A8D4'] },
        mesh2: { label: '虹彩2', default: '#C4B5FD', options: ['#C4B5FD', '#FDBA74', '#A7F3D0', '#A5B4FC'] },
        mesh3: { label: '虹彩3', default: '#FDBA74', options: ['#FDBA74', '#F9A8D4', '#FCA5A5', '#FBCFE8'] },
        accent: { label: '点缀', default: '#6366F1', options: ['#6366F1', '#EC4899', '#0EA5E9', '#F59E0B'] }
      },
      fonts: {
        display: { label: '英文标题', default: SANS, options: [SANS, SERIF] },
        cjk: { label: '中文', default: HEI, options: [HEI, SANS] }
      }
    },
    presets: [
      { name: '薄荷雾紫', colors: { bg: '#F5F3FF', ink: '#16161D', mesh1: '#86EFAC', mesh2: '#C4B5FD', mesh3: '#FDBA74', accent: '#6366F1' } },
      { name: '湖蓝奶油', colors: { bg: '#EFF6FF', ink: '#0F172A', mesh1: '#93C5FD', mesh2: '#A5B4FC', mesh3: '#FDBA74', accent: '#0EA5E9' } },
      { name: '莓粉蜜桃', colors: { bg: '#FEF2F8', ink: '#3A2A1E', mesh1: '#F9A8D4', mesh2: '#FBCFE8', mesh3: '#FCA5A5', accent: '#EC4899' } },
      { name: '夜色霓虹', colors: { bg: '#0B1020', ink: '#F8FAFC', mesh1: '#A7F3D0', mesh2: '#A5B4FC', mesh3: '#F9A8D4', accent: '#6366F1' } }
    ],
    canvas: { virtualWidth: 1920, virtualHeight: 1080, defaultWidth: 1920, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      // 虹彩流体团（大圆 + 低透明度，相互叠加成 mesh）
      { id: 'cm-m1', group: 'cm-m', type: 'shape', shapeKind: 'circle', x: -140, y: -120, width: 780, height: 780, fill: { $t: 'colors.mesh1' }, opacity: 0.5, zIndex: 1, animation: { name: 'float', duration: 8200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'cm-m2', group: 'cm-m', type: 'shape', shapeKind: 'circle', x: 1320, y: 280, width: 920, height: 920, fill: { $t: 'colors.mesh2' }, opacity: 0.48, zIndex: 1, animation: { name: 'drift', duration: 9800, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'cm-m3', group: 'cm-m', type: 'shape', shapeKind: 'circle', x: 680, y: 520, width: 760, height: 760, fill: { $t: 'colors.mesh3' }, opacity: 0.42, zIndex: 1, animation: { name: 'float', duration: 7600, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'cm-m4', group: 'cm-m', type: 'shape', shapeKind: 'circle', x: 240, y: 560, width: 520, height: 520, fill: { $t: 'colors.accent' }, opacity: 0.32, zIndex: 1, animation: { name: 'heartbeat', duration: 6400, iterationCount: 'infinite', easing: 'ease-in-out' } },
      // 细网格
      { id: 'cm-gv1', group: 'cm-gv', type: 'shape', shapeKind: 'line', x: 480, y: 0, width: 1, height: 1080, fill: { $t: 'colors.ink' }, opacity: 0.05, zIndex: 2 },
      { id: 'cm-gv2', group: 'cm-gv', type: 'shape', shapeKind: 'line', x: 960, y: 0, width: 1, height: 1080, fill: { $t: 'colors.ink' }, opacity: 0.05, zIndex: 2 },
      { id: 'cm-gv3', group: 'cm-gv', type: 'shape', shapeKind: 'line', x: 1440, y: 0, width: 1, height: 1080, fill: { $t: 'colors.ink' }, opacity: 0.05, zIndex: 2 },
      { id: 'cm-gh1', type: 'shape', shapeKind: 'line', x: 0, y: 540, width: 1920, height: 1, fill: { $t: 'colors.ink' }, opacity: 0.05, zIndex: 2 },
      // 装饰细线
      { id: 'cm-rule', type: 'shape', shapeKind: 'line', x: 120, y: 268, width: 1680, height: 2, fill: { $t: 'colors.ink' }, opacity: 0.15, zIndex: 3 },
      // 角标序号（极淡，不参与字冲）
      { id: 'cm-num', type: 'text', content: '012', fontFamily: { $t: 'fonts.display' }, fontSize: 180, fontWeight: '800', color: { $t: 'colors.ink' }, opacity: 0.06, textAlign: 'right', x: 1420, y: 720, width: 420, height: 320, zIndex: 4 },
      // 文字层
      { id: 'cm-kicker', type: 'text', content: 'CHROMA STUDIO · 虹彩创作力', fontFamily: { $t: 'fonts.display' }, fontSize: 28, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.65, letterSpacing: 6, x: 120, y: 180, width: 1400, height: 40, zIndex: 5, animation: { name: 'fadeIn', duration: 600 }, editable: { content: true } },
      { id: 'cm-title', type: 'text', content: 'Paint with\nlight.', fontFamily: { $t: 'fonts.display' }, fontSize: 196, fontWeight: '800', color: { $t: 'colors.ink' }, lineHeight: 1.02, letterSpacing: -6, x: 120, y: 300, width: 1400, height: 430, zIndex: 6, animation: { name: 'fadeInUp', duration: 900 }, editable: { content: true, fontSize: { type: 'range', min: 150, max: 210 } } },
      { id: 'cm-sub', type: 'text', content: '把渐变还给创意——一组随光流动的封面系统。', fontFamily: { $t: 'fonts.cjk' }, fontSize: 36, color: { $t: 'colors.ink' }, opacity: 0.82, x: 120, y: 790, width: 1500, height: 100, zIndex: 6, animation: { name: 'rise', duration: 900, delay: 200 }, editable: { content: true } },
      { id: 'cm-cta', type: 'shape', shapeKind: 'rect', x: 120, y: 880, width: 320, height: 88, fill: { $t: 'colors.ink' }, borderRadius: 44, zIndex: 6, animation: { name: 'fadeInUp', duration: 800, delay: 320 } },
      { id: 'cm-cta-t', type: 'text', content: '立即体验', fontFamily: { $t: 'fonts.cjk' }, fontSize: 32, fontWeight: '700', color: { $t: 'colors.bg' }, textAlign: 'center', lineHeight: 2.75, x: 120, y: 880, width: 320, height: 88, zIndex: 7, editable: { content: true } },
      { id: 'cm-badge', type: 'text', content: 'NEW · 2.5', fontFamily: { $t: 'fonts.display' }, fontSize: 26, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 4, textAlign: 'right', x: 1500, y: 180, width: 300, height: 36, zIndex: 5, animation: { name: 'fadeIn', duration: 600, delay: 120 } },
      { id: 'cm-grain', type: 'overlay', x: 0, y: 0, width: 1920, height: 1080, background: `url("${grainSoft(320, 9, 0.5)}")`, opacity: 0.04, mixBlendMode: 'multiply', zIndex: 9 }
    ]
  }
]

// src/core/templates/food/hy-food-flat.ts
// HY 系列 · 俯拍食记（4:5 竖版）｜ 对标 Top-down Flat Lay 插画：暖桌布 + 餐具圆环 + 食材几何
import type { Template } from '@/types/types'
import {SANS, HEI, SERIF, MONO, SONG, halftone, grainSoft} from '../_fx/trend'

export const hyFoodFlatTemplates: Template[] = [
  {
    id: 'hy-food-flat', name: '俯拍食记', version: '1.0.0', category: 'food',
    tags: ['hy', 'food', 'flat lay', 'illustration', 'warm', '4:5', 'recipe'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="125" viewBox="0 0 100 125"><rect width="100" height="125" fill="%23F3E7DA"/><circle cx="50" cy="52" r="32" fill="%23FFFDF8"/><circle cx="50" cy="52" r="23" fill="%23E07A5F"/><circle cx="42" cy="46" r="6" fill="%2381B29A"/><circle cx="58" cy="58" r="7" fill="%23F2CC8F"/><circle cx="50" cy="38" r="5" fill="%23E07A5F"/><rect x="18" y="96" width="64" height="4" fill="%233D3229"/><rect x="18" y="106" width="40" height="3" fill="%233D3229" opacity="0.55"/></svg>',
    tokens: {
      colors: {
        bg: { label: '桌布', default: '#F3E7DA', options: ['#F3E7DA', '#EFE3D2', '#E9EDE4', '#F7EFE6'] },
        plate: { label: '餐盘', default: '#FFFDF8', options: ['#FFFDF8', '#FFFFFF', '#FBF7EE', '#F9F5EC'] },
        filling: { label: '主菜', default: '#E07A5F', options: ['#E07A5F', '#C97B5A', '#D1663F', '#B5563B'] },
        veg: { label: '配菜', default: '#81B29A', options: ['#81B29A', '#6B9E7F', '#A3C4A8', '#5F8C6B'] },
        ink: { label: '文字', default: '#3D3229', options: ['#3D3229', '#2F2620', '#4A3F35', '#5A4A3B'] }
      },
      fonts: {
        display: { label: '英文标题', default: SERIF, options: [SERIF, SANS, SONG] },
        cjk: { label: '中文', default: HEI, options: [HEI, SANS, SERIF] },
        mono: { label: '等宽标注', default: MONO, options: [MONO, SANS, SERIF] }
      }
    },
    presets: [
      { name: '番茄炖锅', colors: { bg: '#F3E7DA', plate: '#FFFDF8', filling: '#E07A5F', veg: '#81B29A', ink: '#3D3229' } },
      { name: '南瓜浓汤', colors: { bg: '#F7EFE6', plate: '#FFFFFF', filling: '#C97B5A', veg: '#6B9E7F', ink: '#2F2620' } },
      { name: '香辣红烩', colors: { bg: '#EFE3D2', plate: '#FBF7EE', filling: '#D1663F', veg: '#A3C4A8', ink: '#4A3F35' } },
      { name: '田园沙拉', colors: { bg: '#E9EDE4', plate: '#F9F5EC', filling: '#B5563B', veg: '#5F8C6B', ink: '#5A4A3B' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      // 桌布条纹（暖色，斜铺，低对比）
      { id: 'ff-stripe1', group: 'ff-stripe', type: 'shape', shapeKind: 'rect', x: -120, y: 120, width: 1400, height: 44, rotation: -14, fill: { $t: 'colors.filling' }, opacity: 0.08, zIndex: 1 },
      { id: 'ff-stripe2', group: 'ff-stripe', type: 'shape', shapeKind: 'rect', x: -120, y: 320, width: 1400, height: 44, rotation: -14, fill: { $t: 'colors.filling' }, opacity: 0.08, zIndex: 1 },
      { id: 'ff-stripe3', group: 'ff-stripe', type: 'shape', shapeKind: 'rect', x: -120, y: 1090, width: 1400, height: 44, rotation: -14, fill: { $t: 'colors.filling' }, opacity: 0.08, zIndex: 1 },
      { id: 'ff-stripe4', group: 'ff-stripe', type: 'shape', shapeKind: 'rect', x: -120, y: 1290, width: 1400, height: 44, rotation: -14, fill: { $t: 'colors.filling' }, opacity: 0.08, zIndex: 1 },
      // 餐盘阴影
      { id: 'ff-platesm', type: 'shape', shapeKind: 'circle', x: 130, y: 250, width: 690, height: 690, fill: { $t: 'colors.ink' }, opacity: 0.08, zIndex: 2 },
      // 主餐盘
      { id: 'ff-plate', type: 'shape', shapeKind: 'circle', x: 150, y: 270, width: 650, height: 650, fill: { $t: 'colors.plate' }, shadow: { offsetX: 0, offsetY: 20, blur: 40, color: '#000000'}, zIndex: 3 },
      { id: 'ff-platerim', type: 'shape', shapeKind: 'circle', x: 200, y: 320, width: 550, height: 550, fill: 'transparent', border: { width: 3, color: { $t: 'colors.filling' } }, opacity: 0.3, zIndex: 4 },
      // 盘中主菜（大色块）
      { id: 'ff-main', type: 'shape', shapeKind: 'circle', x: 250, y: 370, width: 450, height: 450, fill: { $t: 'colors.filling' }, opacity: 0.92, zIndex: 5, animation: { name: 'heartbeat', duration: 6000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      // 配菜（错落小圆）
      { id: 'ff-v1', group: 'ff-v', type: 'shape', shapeKind: 'circle', x: 330, y: 430, width: 130, height: 130, fill: { $t: 'colors.veg' }, zIndex: 6 },
      { id: 'ff-v2', group: 'ff-v', type: 'shape', shapeKind: 'circle', x: 480, y: 520, width: 150, height: 150, fill: { $t: 'colors.veg' }, opacity: 0.85, zIndex: 6 },
      { id: 'ff-v3', group: 'ff-v', type: 'shape', shapeKind: 'circle', x: 400, y: 620, width: 100, height: 100, fill: { $t: 'colors.plate' }, opacity: 0.9, zIndex: 6 },
      { id: 'ff-v4', group: 'ff-v', type: 'shape', shapeKind: 'circle', x: 560, y: 400, width: 90, height: 90, fill: { $t: 'colors.plate' }, opacity: 0.85, zIndex: 6 },
      { id: 'ff-v5', group: 'ff-v', type: 'shape', shapeKind: 'circle', x: 300, y: 600, width: 70, height: 70, fill: { $t: 'colors.filling' }, opacity: 0.7, zIndex: 6, animation: { name: 'float', duration: 7000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      // 餐具（细長矩形做刀叉剪影）
      { id: 'ff-fork1', type: 'shape', shapeKind: 'rect', x: 830, y: 430, width: 22, height: 300, rotation: 12, borderRadius: 11, fill: { $t: 'colors.ink' }, opacity: 0.55, zIndex: 5 },
      { id: 'ff-fork2', type: 'shape', shapeKind: 'rect', x: 880, y: 430, width: 22, height: 300, rotation: 12, borderRadius: 11, fill: { $t: 'colors.ink' }, opacity: 0.55, zIndex: 5 },
      { id: 'ff-knife', type: 'shape', shapeKind: 'rect', x: 930, y: 470, width: 24, height: 300, rotation: 12, borderRadius: 12, fill: { $t: 'colors.ink' }, opacity: 0.45, zIndex: 5 },
      // 左上角网点（一点点印刷味）
      { id: 'ff-dots', type: 'overlay', x: 90, y: 180, width: 220, height: 220, rotation: -10, background: `url("${halftone(48, 48, 5, 16, '%233D3229')}")`, opacity: 0.1, zIndex: 2 },
      // 右上角小圆盘（配角，平衡构图）
      { id: 'ff-side', type: 'shape', shapeKind: 'circle', x: 830, y: 830, width: 170, height: 170, fill: { $t: 'colors.plate' }, border: { width: 3, color: { $t: 'colors.veg' } }, shadow: { offsetX: 0, offsetY: 14, blur: 26, color: '#000000'}, zIndex: 4 },
      { id: 'ff-side2', type: 'shape', shapeKind: 'circle', x: 870, y: 870, width: 90, height: 90, fill: { $t: 'colors.veg' }, opacity: 0.8, zIndex: 5 },
      // 顶部标注
      { id: 'ff-hy', type: 'text', content: 'HY', fontFamily: { $t: 'fonts.mono' }, fontSize: 24, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.55, letterSpacing: 4, x: 90, y: 96, width: 220, height: 34, zIndex: 10 },
      { id: 'ff-kicker', type: 'text', content: 'SUNDAY  /  TABLE', fontFamily: { $t: 'fonts.mono' }, fontSize: 20, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.55, letterSpacing: 4, textAlign: 'right', x: 690, y: 96, width: 300, height: 32, zIndex: 10, animation: { name: 'fadeIn', duration: 600 } },
      // 底部文字组
      { id: 'ff-title', type: 'text', content: 'Slow Cooking', fontFamily: { $t: 'fonts.display' }, fontSize: 100, fontWeight: '700', color: { $t: 'colors.ink' }, lineHeight: 1.08, letterSpacing: -1, x: 90, y: 1070, width: 800, height: 140, zIndex: 10, animation: { name: 'fadeInUp', duration: 900 }, editable: { content: true, fontSize: { type: 'range', min: 96, max: 136 } } },
      { id: 'ff-sub', type: 'text', content: '慢炖三个小时后的一锅温柔', fontFamily: { $t: 'fonts.cjk' }, fontSize: 30, color: { $t: 'colors.ink' }, opacity: 0.72, x: 90, y: 1200, width: 560, height: 46, zIndex: 10, animation: { name: 'rise', duration: 900, delay: 180 }, editable: { content: true } },
      { id: 'ff-meta', type: 'text', content: 'RECIPE NO.HY-09', fontFamily: { $t: 'fonts.mono' }, fontSize: 18, color: { $t: 'colors.ink' }, opacity: 0.5, letterSpacing: 3, textAlign: 'right', x: 690, y: 1206, width: 300, height: 30, zIndex: 10 },
      { id: 'ff-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1350, background: `url("${grainSoft(320, 41, 0.5)}")`, opacity: 0.04, mixBlendMode: 'multiply', zIndex: 12 }
    ]
  }
]

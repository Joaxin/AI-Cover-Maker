// src/core/templates/knowledge/science.ts
import type { Template } from '@/types/types'
import { gridBg, dotsBg, plusBg, hatchBg } from './_decor'

// 步骤连接箭头（白色线稿，置于卡片之间的空隙上）
const ARROW = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="40" viewBox="0 0 60 40"><path d="M4 20 H48 M34 6 L50 20 L34 34" fill="none" stroke="%23ffffff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>'

const H = 'Helvetica, Arial, sans-serif'
const MONO = 'SFMono-Regular, Consolas, "Courier New", monospace'
const LIGHT = 'rgba(226,232,240,0.82)'
const GLASS = 'rgba(255,255,255,0.06)'

export const knowledgeScienceTemplates: Template[] = [
  {
    id: 'knowledge-stat-cards', name: '关键数据·图解速览', version: '1.0.0', category: 'knowledge', tags: ['knowledge', 'data', 'infographic', 'statistics', '1:1'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%230b1220"/><circle cx="30" cy="34" r="16" fill="none" stroke="%2338bdf8" stroke-width="5"/><rect x="56" y="56" width="16" height="26" fill="%237dd3fc"/><rect x="76" y="46" width="16" height="36" fill="%2338bdf8"/></svg>',
    tokens: {
      colors: {
        bg: { label: '背景', default: '#0B1220', options: ['#0B1220', '#0F172A', '#1E293B', '#0B3B5C', '#3B0764'] },
        primary: { label: '主色', default: '#FFFFFF', options: ['#FFFFFF', '#F8FAFC', '#E2E8F0', '#F0FDF4', '#FAF5FF'] },
        accent: { label: '强调', default: '#38BDF8', options: ['#38BDF8', '#7DD3FC', '#34D399', '#FBBF24', '#A78BFA'] }
      },
      fonts: { heading: { label: '标题字体', default: H, options: [H, 'Inter, sans-serif', 'system-ui, sans-serif'] } }
    },
    presets: [
      { name: '深夜数据蓝', colors: { bg: '#0B1220', primary: '#FFFFFF', accent: '#38BDF8' } },
      { name: '翡翠增长绿', colors: { bg: '#0B3B5C', primary: '#F0FDF4', accent: '#34D399' } },
      { name: '琥珀财报金', colors: { bg: '#1E293B', primary: '#F8FAFC', accent: '#FBBF24' } },
      { name: '电紫洞察', colors: { bg: '#3B0764', primary: '#FAF5FF', accent: '#A78BFA' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1080, defaultWidth: 1080, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' }, backgroundImage: gridBg(1080, 1080, 60) },
    elements: [
      { id: 'eyebrow', type: 'text', content: 'DATA REPORT · 2026', fontFamily: { $t: 'fonts.heading' }, fontSize: 22, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 6, x: 80, y: 84, width: 520, height: 30, zIndex: 3, editable: { content: true } },
      { id: 'title', type: 'text', content: '全球 AI 采用率\n三个关键数字', fontFamily: { $t: 'fonts.heading' }, fontSize: 58, fontWeight: '900', color: { $t: 'colors.primary' }, lineHeight: 1.22, x: 80, y: 128, width: 560, height: 180, zIndex: 3, animation: { name: 'fadeInDown', duration: 600 }, editable: { content: true, fontSize: { type: 'range', min: 44, max: 76 }, position: true } },
      { id: 'ring-track', type: 'shape', shapeKind: 'circle', x: 720, y: 150, width: 300, height: 300, border: { color: GLASS, width: 28, style: 'solid' }, zIndex: 2 },
      { id: 'ring-accent', type: 'shape', shapeKind: 'circle', x: 720, y: 150, width: 300, height: 300, border: { color: { $t: 'colors.accent' }, width: 28, style: 'solid' }, rotation: -90, zIndex: 2, animation: { name: 'fadeIn', duration: 800 } },
      { id: 'ring-dot', type: 'shape', shapeKind: 'circle', x: 858, y: 138, width: 34, height: 34, fill: { $t: 'colors.accent' }, zIndex: 4, animation: { name: 'pulse', duration: 2200, iterationCount: 'infinite' } },
      { id: 'ring-val', type: 'text', content: '68%', fontFamily: { $t: 'fonts.heading' }, fontSize: 82, fontWeight: '900', color: { $t: 'colors.primary' }, textAlign: 'center', x: 720, y: 250, width: 300, height: 100, zIndex: 3 },
      { id: 'ring-label', type: 'text', content: '企业已采用至少一项 AI', fontFamily: { $t: 'fonts.heading' }, fontSize: 22, fontWeight: '500', color: LIGHT, textAlign: 'center', x: 690, y: 468, width: 360, height: 34, zIndex: 3, editable: { content: true } },
      { id: 'card1', group: 'card', type: 'shape', shapeKind: 'rect', x: 80, y: 620, width: 290, height: 250, fill: GLASS, borderRadius: 18, border: { color: 'rgba(255,255,255,0.14)', width: 1, style: 'solid' }, zIndex: 2, animation: { name: 'fadeInUp', duration: 600 } },
      { id: 'c1-val', type: 'text', content: '3.2×', fontFamily: { $t: 'fonts.heading' }, fontSize: 64, fontWeight: '900', color: { $t: 'colors.accent' }, x: 108, y: 652, width: 234, height: 80, zIndex: 3, editable: { content: true } },
      { id: 'c1-label', type: 'text', content: '平均效率提升', fontFamily: { $t: 'fonts.heading' }, fontSize: 24, fontWeight: '500', color: LIGHT, x: 108, y: 750, width: 234, height: 40, zIndex: 3, editable: { content: true } },
      { id: 'card2', group: 'card', type: 'shape', shapeKind: 'rect', x: 395, y: 620, width: 290, height: 250, fill: GLASS, borderRadius: 18, border: { color: 'rgba(255,255,255,0.14)', width: 1, style: 'solid' }, zIndex: 2, animation: { name: 'fadeInUp', duration: 600, delay: 150 } },
      { id: 'c2-val', type: 'text', content: '57%', fontFamily: { $t: 'fonts.heading' }, fontSize: 64, fontWeight: '900', color: { $t: 'colors.accent' }, x: 423, y: 652, width: 234, height: 80, zIndex: 3, editable: { content: true } },
      { id: 'c2-label', type: 'text', content: '研发预算向 AI 倾斜', fontFamily: { $t: 'fonts.heading' }, fontSize: 24, fontWeight: '500', color: LIGHT, x: 423, y: 750, width: 234, height: 40, zIndex: 3, editable: { content: true } },
      { id: 'card3', group: 'card', type: 'shape', shapeKind: 'rect', x: 710, y: 620, width: 290, height: 250, fill: GLASS, borderRadius: 18, border: { color: 'rgba(255,255,255,0.14)', width: 1, style: 'solid' }, zIndex: 2, animation: { name: 'fadeInUp', duration: 600, delay: 300 } },
      { id: 'c3-val', type: 'text', content: '128', fontFamily: { $t: 'fonts.heading' }, fontSize: 64, fontWeight: '900', color: { $t: 'colors.accent' }, x: 738, y: 652, width: 234, height: 80, zIndex: 3, editable: { content: true } },
      { id: 'c3-label', type: 'text', content: '国家出台 AI 相关政策', fontFamily: { $t: 'fonts.heading' }, fontSize: 24, fontWeight: '500', color: LIGHT, x: 738, y: 750, width: 234, height: 40, zIndex: 3, editable: { content: true } },
      { id: 'corner-br', type: 'shape', shapeKind: 'line', x: 954, y: 978, width: 46, height: 2, fill: { $t: 'colors.accent' }, opacity: 0.7, zIndex: 3 },
      { id: 'corner-br-2', type: 'shape', shapeKind: 'rect', x: 998, y: 932, width: 2, height: 46, fill: { $t: 'colors.accent' }, opacity: 0.7, zIndex: 3 },
      { id: 'footer', type: 'text', content: '数据来源 · Global AI Survey 2026（示意数据）', fontFamily: { $t: 'fonts.heading' }, fontSize: 18, fontWeight: '500', color: { $t: 'colors.primary' }, opacity: 0.55, x: 80, y: 980, width: 640, height: 28, zIndex: 3, editable: { content: true } }
    ]
  },
  {
    id: 'knowledge-flow-steps', name: '三步看懂原理·流程', version: '1.0.0', category: 'knowledge', tags: ['knowledge', 'flow', 'process', 'steps', '16:9'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="178" height="100" viewBox="0 0 178 100"><rect width="178" height="100" fill="%230f766e"/><rect x="14" y="40" width="34" height="34" rx="6" fill="%23ffffff" opacity="0.15"/><rect x="72" y="40" width="34" height="34" rx="6" fill="%23ffffff" opacity="0.15"/><rect x="130" y="40" width="34" height="34" rx="6" fill="%23ffffff" opacity="0.15"/><line x1="50" y1="57" x2="70" y2="57" stroke="%235eead4" stroke-width="3"/><line x1="108" y1="57" x2="128" y2="57" stroke="%235eead4" stroke-width="3"/></svg>',
    tokens: {
      colors: {
        bg: { label: '背景', default: '#0F766E', options: ['#0F766E', '#0369A1', '#4338CA', '#1E293B', '#155E4C'] },
        primary: { label: '主色', default: '#FFFFFF', options: ['#FFFFFF', '#F0FDFA', '#ECFEFF', '#EEF2FF', '#F8FAFC'] },
        accent: { label: '强调', default: '#5EEAD4', options: ['#5EEAD4', '#7DD3FC', '#A5B4FC', '#FBBF24', '#6EE7B7'] },
        ink: { label: '序号墨色', default: '#0F172A', options: ['#0F172A', '#082F49', '#1E1B4B', '#111827'] }
      },
      fonts: { heading: { label: '标题字体', default: H, options: [H, 'Inter, sans-serif', 'system-ui, sans-serif'] } }
    },
    presets: [
      { name: '青碧流程', colors: { bg: '#0F766E', primary: '#FFFFFF', accent: '#5EEAD4', ink: '#0F172A' } },
      { name: '深海蓝调', colors: { bg: '#0369A1', primary: '#FFFFFF', accent: '#7DD3FC', ink: '#082F49' } },
      { name: '靛紫思辨', colors: { bg: '#4338CA', primary: '#EEF2FF', accent: '#A5B4FC', ink: '#1E1B4B' } },
      { name: '石墨霓虹', colors: { bg: '#1E293B', primary: '#F8FAFC', accent: '#FBBF24', ink: '#111827' } }
    ],
    canvas: { virtualWidth: 1920, virtualHeight: 1080, defaultWidth: 1920, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' }, backgroundImage: plusBg(1920, 1080, 72) },
    elements: [
      { id: 'eyebrow', type: 'text', content: 'HOW IT WORKS · 原理拆解', fontFamily: { $t: 'fonts.heading' }, fontSize: 26, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 5, x: 120, y: 96, width: 900, height: 36, zIndex: 3, editable: { content: true } },
      { id: 'title', type: 'text', content: '三步看懂：大模型是如何\n把一句话“想”出来的？', fontFamily: { $t: 'fonts.heading' }, fontSize: 66, fontWeight: '900', color: { $t: 'colors.primary' }, lineHeight: 1.24, x: 120, y: 140, width: 1500, height: 200, zIndex: 3, animation: { name: 'fadeInUp', duration: 600 }, editable: { content: true, fontSize: { type: 'range', min: 48, max: 84 }, position: true } },
      { id: 'step1', group: 'step', type: 'shape', shapeKind: 'rect', x: 120, y: 430, width: 520, height: 420, fill: GLASS, borderRadius: 24, border: { color: 'rgba(255,255,255,0.16)', width: 1, style: 'solid' }, zIndex: 2, animation: { name: 'fadeInUp', duration: 600 } },
      { id: 's1-num', type: 'shape', shapeKind: 'circle', x: 160, y: 470, width: 72, height: 72, fill: { $t: 'colors.accent' }, zIndex: 3 },
      { id: 's1-num-t', type: 'text', content: '1', fontFamily: { $t: 'fonts.heading' }, fontSize: 40, fontWeight: '900', color: { $t: 'colors.ink' }, textAlign: 'center', x: 160, y: 482, width: 72, height: 48, zIndex: 4 },
      { id: 's1-title', type: 'text', content: '切词 · Tokenize', fontFamily: { $t: 'fonts.heading' }, fontSize: 40, fontWeight: '800', color: { $t: 'colors.primary' }, x: 252, y: 486, width: 360, height: 50, zIndex: 3, editable: { content: true } },
      { id: 's1-body', type: 'text', content: '把输入句子切成子词单元，\n并映射成高维向量表示。', fontFamily: { $t: 'fonts.heading' }, fontSize: 28, fontWeight: '400', color: LIGHT, lineHeight: 1.6, x: 160, y: 590, width: 440, height: 220, zIndex: 3, editable: { content: true } },
      { id: 'arrow1', type: 'image', src: ARROW, objectFit: 'contain', x: 650, y: 620, width: 58, height: 40, zIndex: 4, animation: { name: 'pulse', duration: 1800, iterationCount: 'infinite' } },
      { id: 'step2', group: 'step', type: 'shape', shapeKind: 'rect', x: 700, y: 430, width: 520, height: 420, fill: GLASS, borderRadius: 24, border: { color: 'rgba(255,255,255,0.16)', width: 1, style: 'solid' }, zIndex: 2, animation: { name: 'fadeInUp', duration: 600, delay: 150 } },
      { id: 's2-num', type: 'shape', shapeKind: 'circle', x: 740, y: 470, width: 72, height: 72, fill: { $t: 'colors.accent' }, zIndex: 3 },
      { id: 's2-num-t', type: 'text', content: '2', fontFamily: { $t: 'fonts.heading' }, fontSize: 40, fontWeight: '900', color: { $t: 'colors.ink' }, textAlign: 'center', x: 740, y: 482, width: 72, height: 48, zIndex: 4 },
      { id: 's2-title', type: 'text', content: '推理 · Attention', fontFamily: { $t: 'fonts.heading' }, fontSize: 40, fontWeight: '800', color: { $t: 'colors.primary' }, x: 832, y: 486, width: 360, height: 50, zIndex: 3, editable: { content: true } },
      { id: 's2-body', type: 'text', content: '逐层自注意力聚合上下文，\n理解词与词之间的关联。', fontFamily: { $t: 'fonts.heading' }, fontSize: 28, fontWeight: '400', color: LIGHT, lineHeight: 1.6, x: 740, y: 590, width: 440, height: 220, zIndex: 3, editable: { content: true } },
      { id: 'arrow2', type: 'image', src: ARROW, objectFit: 'contain', x: 1230, y: 620, width: 58, height: 40, zIndex: 4, animation: { name: 'pulse', duration: 1800, delay: 300, iterationCount: 'infinite' } },
      { id: 'step3', group: 'step', type: 'shape', shapeKind: 'rect', x: 1280, y: 430, width: 520, height: 420, fill: GLASS, borderRadius: 24, border: { color: 'rgba(255,255,255,0.16)', width: 1, style: 'solid' }, zIndex: 2, animation: { name: 'fadeInUp', duration: 600, delay: 300 } },
      { id: 's3-num', type: 'shape', shapeKind: 'circle', x: 1320, y: 470, width: 72, height: 72, fill: { $t: 'colors.accent' }, zIndex: 3 },
      { id: 's3-num-t', type: 'text', content: '3', fontFamily: { $t: 'fonts.heading' }, fontSize: 40, fontWeight: '900', color: { $t: 'colors.ink' }, textAlign: 'center', x: 1320, y: 482, width: 72, height: 48, zIndex: 4 },
      { id: 's3-title', type: 'text', content: '解码 · Generate', fontFamily: { $t: 'fonts.heading' }, fontSize: 40, fontWeight: '800', color: { $t: 'colors.primary' }, x: 1412, y: 486, width: 360, height: 50, zIndex: 3, editable: { content: true } },
      { id: 's3-body', type: 'text', content: '按概率逐字输出，直到\n生成完整回答或结束符。', fontFamily: { $t: 'fonts.heading' }, fontSize: 28, fontWeight: '400', color: LIGHT, lineHeight: 1.6, x: 1320, y: 590, width: 440, height: 220, zIndex: 3, editable: { content: true } },
      { id: 'footer', type: 'text', content: '认知引擎 · 大模型系列 · 第 07 讲', fontFamily: { $t: 'fonts.heading' }, fontSize: 22, fontWeight: '500', color: { $t: 'colors.primary' }, opacity: 0.6, x: 120, y: 940, width: 900, height: 32, zIndex: 3, editable: { content: true } }
    ]
  },
  {
    id: 'knowledge-comparison', name: '双栏对比分析', version: '1.0.0', category: 'knowledge', tags: ['knowledge', 'comparison', 'versus', 'analysis', '1:1'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%231e293b"/><line x1="50" y1="14" x2="50" y2="86" stroke="%23f8fafc" stroke-width="2" opacity="0.3"/><circle cx="50" cy="50" r="9" fill="%23f59e0b"/><rect x="14" y="30" width="26" height="6" fill="%2394a3b8"/><rect x="60" y="30" width="26" height="6" fill="%2338bdf8"/></svg>',
    tokens: {
      colors: {
        bg: { label: '背景', default: '#1E293B', options: ['#1E293B', '#0F172A', '#111827', '#312E81', '#0B3B5C'] },
        primary: { label: '主色', default: '#F8FAFC', options: ['#F8FAFC', '#FFFFFF', '#E2E8F0', '#E0E7FF', '#ECFEFF'] },
        accent: { label: '强调', default: '#38BDF8', options: ['#38BDF8', '#F59E0B', '#34D399', '#F472B6', '#A78BFA'] }
      },
      fonts: { heading: { label: '标题字体', default: H, options: [H, 'Inter, sans-serif', 'system-ui, sans-serif'] } }
    },
    presets: [
      { name: '石墨青蓝对撞', colors: { bg: '#1E293B', primary: '#F8FAFC', accent: '#38BDF8' } },
      { name: '午夜琥珀', colors: { bg: '#0F172A', primary: '#FFFFFF', accent: '#F59E0B' } },
      { name: '靛紫玫瑰', colors: { bg: '#312E81', primary: '#E0E7FF', accent: '#F472B6' } },
      { name: '深海翡翠', colors: { bg: '#0B3B5C', primary: '#ECFEFF', accent: '#34D399' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1080, defaultWidth: 1080, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' }, backgroundImage: hatchBg(1080, 1080, 20) },
    elements: [
      { id: 'title', type: 'text', content: 'AI 模型 vs 传统软件\n到底有什么不同？', fontFamily: { $t: 'fonts.heading' }, fontSize: 54, fontWeight: '900', color: { $t: 'colors.primary' }, textAlign: 'center', lineHeight: 1.24, x: 80, y: 78, width: 920, height: 150, zIndex: 3, animation: { name: 'fadeIn', duration: 600 }, editable: { content: true, fontSize: { type: 'range', min: 40, max: 68 }, position: true } },
      { id: 'divider', type: 'shape', shapeKind: 'rect', x: 539, y: 268, width: 2, height: 600, fill: 'rgba(255,255,255,0.16)', zIndex: 2 },
      { id: 'vs-badge', type: 'shape', shapeKind: 'circle', x: 504, y: 540, width: 72, height: 72, fill: { $t: 'colors.accent' }, zIndex: 4, animation: { name: 'zoomIn', duration: 500 } },
      { id: 'vs-text', type: 'text', content: 'VS', fontFamily: { $t: 'fonts.heading' }, fontSize: 30, fontWeight: '900', color: '#0F172A', textAlign: 'center', x: 504, y: 558, width: 72, height: 36, zIndex: 5 },
      { id: 'head-left', type: 'text', content: '传统软件', fontFamily: { $t: 'fonts.heading' }, fontSize: 38, fontWeight: '900', color: { $t: 'colors.primary' }, textAlign: 'center', x: 120, y: 268, width: 380, height: 50, zIndex: 3, editable: { content: true } },
      { id: 'head-right', type: 'text', content: 'AI 模型', fontFamily: { $t: 'fonts.heading' }, fontSize: 38, fontWeight: '900', color: { $t: 'colors.accent' }, textAlign: 'center', x: 580, y: 268, width: 380, height: 50, zIndex: 3, editable: { content: true } },
      { id: 'l1', type: 'text', content: '规则由人类逐条写死', fontFamily: { $t: 'fonts.heading' }, fontSize: 28, fontWeight: '500', color: LIGHT, textAlign: 'center', x: 120, y: 372, width: 380, height: 46, zIndex: 3, animation: { name: 'slideInLeft', duration: 500, delay: 150 }, editable: { content: true } },
      { id: 'r1', type: 'text', content: '从数据中自动学习规律', fontFamily: { $t: 'fonts.heading' }, fontSize: 28, fontWeight: '500', color: { $t: 'colors.accent' }, textAlign: 'center', x: 580, y: 372, width: 380, height: 46, zIndex: 3, animation: { name: 'slideInRight', duration: 500, delay: 150 }, editable: { content: true } },
      { id: 'sep1', type: 'shape', shapeKind: 'line', x: 160, y: 452, width: 760, height: 1, fill: 'rgba(255,255,255,0.08)', zIndex: 2 },
      { id: 'l2', type: 'text', content: '输出确定 · 可复现', fontFamily: { $t: 'fonts.heading' }, fontSize: 28, fontWeight: '500', color: LIGHT, textAlign: 'center', x: 120, y: 492, width: 380, height: 46, zIndex: 3, animation: { name: 'slideInLeft', duration: 500, delay: 300 }, editable: { content: true } },
      { id: 'r2', type: 'text', content: '概率性 · 会漂移', fontFamily: { $t: 'fonts.heading' }, fontSize: 28, fontWeight: '500', color: { $t: 'colors.accent' }, textAlign: 'center', x: 580, y: 492, width: 380, height: 46, zIndex: 3, animation: { name: 'slideInRight', duration: 500, delay: 300 }, editable: { content: true } },
      { id: 'sep2', type: 'shape', shapeKind: 'line', x: 160, y: 572, width: 760, height: 1, fill: 'rgba(255,255,255,0.08)', zIndex: 2 },
      { id: 'l3', type: 'text', content: '边界清晰 · 可审计', fontFamily: { $t: 'fonts.heading' }, fontSize: 28, fontWeight: '500', color: LIGHT, textAlign: 'center', x: 120, y: 636, width: 380, height: 46, zIndex: 3, animation: { name: 'slideInLeft', duration: 500, delay: 450 }, editable: { content: true } },
      { id: 'r3', type: 'text', content: '“黑箱” · 难以解释', fontFamily: { $t: 'fonts.heading' }, fontSize: 28, fontWeight: '500', color: { $t: 'colors.accent' }, textAlign: 'center', x: 580, y: 636, width: 380, height: 46, zIndex: 3, animation: { name: 'slideInRight', duration: 500, delay: 450 }, editable: { content: true } },
      { id: 'insight', type: 'text', content: '不是替代，而是新的抽象层：AI 把“写规则”变成“给示例”。', fontFamily: { $t: 'fonts.heading' }, fontSize: 26, fontWeight: '700', color: { $t: 'colors.primary' }, textAlign: 'center', x: 120, y: 828, width: 840, height: 44, zIndex: 3, animation: { name: 'fadeInUp', duration: 600, delay: 600 }, editable: { content: true, position: true } },
      { id: 'insight-line', type: 'shape', shapeKind: 'line', x: 440, y: 892, width: 200, height: 4, fill: { $t: 'colors.accent' }, zIndex: 3 },
      { id: 'footer', type: 'text', content: '认知引擎 · 概念对照卡', fontFamily: { $t: 'fonts.heading' }, fontSize: 18, fontWeight: '500', color: { $t: 'colors.primary' }, opacity: 0.5, textAlign: 'center', x: 80, y: 980, width: 920, height: 26, zIndex: 3, editable: { content: true } }
    ]
  },
  {
    id: 'knowledge-timeline', name: '科学发现时间线', version: '1.0.0', category: 'knowledge', tags: ['knowledge', 'timeline', 'history', 'science', '9:16'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="178" viewBox="0 0 100 178"><rect width="100" height="178" fill="%23075985"/><line x1="28" y1="40" x2="28" y2="160" stroke="%237dd3fc" stroke-width="3"/><circle cx="28" cy="60" r="6" fill="%23ffffff"/><circle cx="28" cy="100" r="6" fill="%23ffffff"/><circle cx="28" cy="140" r="6" fill="%23ffffff"/><rect x="42" y="54" width="44" height="6" fill="%23bae6fd"/><rect x="42" y="94" width="44" height="6" fill="%23bae6fd"/></svg>',
    tokens: {
      colors: {
        bg: { label: '背景', default: '#075985', options: ['#075985', '#0F172A', '#1E293B', '#164E63', '#3B0764'] },
        primary: { label: '主色', default: '#FFFFFF', options: ['#FFFFFF', '#F0F9FF', '#ECFEFF', '#F8FAFC', '#FAF5FF'] },
        accent: { label: '强调', default: '#7DD3FC', options: ['#7DD3FC', '#38BDF8', '#67E8F9', '#A5B4FC', '#FBBF24', '#C4B5FD'] }
      },
      fonts: { heading: { label: '标题字体', default: H, options: [H, 'Inter, sans-serif', 'system-ui, sans-serif'] } }
    },
    presets: [
      { name: '苍穹蓝史', colors: { bg: '#075985', primary: '#FFFFFF', accent: '#7DD3FC' } },
      { name: '石墨星轨', colors: { bg: '#0F172A', primary: '#F8FAFC', accent: '#38BDF8' } },
      { name: '青碧深渊', colors: { bg: '#164E63', primary: '#ECFEFF', accent: '#67E8F9' } },
      { name: '紫电时刻', colors: { bg: '#3B0764', primary: '#FAF5FF', accent: '#C4B5FD' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1920, defaultWidth: 1080, defaultHeight: 1920, backgroundColor: { $t: 'colors.bg' }, backgroundImage: gridBg(1080, 1920, 60) },
    elements: [
      { id: 'eyebrow', type: 'text', content: 'TIMELINE · 宇宙学简史', fontFamily: { $t: 'fonts.heading' }, fontSize: 26, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 5, x: 90, y: 150, width: 700, height: 34, zIndex: 3, editable: { content: true } },
      { id: 'title', type: 'text', content: '人类如何发现\n宇宙在加速膨胀', fontFamily: { $t: 'fonts.heading' }, fontSize: 74, fontWeight: '900', color: { $t: 'colors.primary' }, lineHeight: 1.24, x: 90, y: 200, width: 900, height: 240, zIndex: 3, animation: { name: 'fadeInDown', duration: 600 }, editable: { content: true, fontSize: { type: 'range', min: 52, max: 92 }, position: true } },
      { id: 'spine', type: 'shape', shapeKind: 'rect', x: 120, y: 540, width: 4, height: 1180, fill: 'rgba(255,255,255,0.18)', zIndex: 2 },
      { id: 'n1', group: 'n', type: 'shape', shapeKind: 'circle', x: 100, y: 560, width: 44, height: 44, fill: { $t: 'colors.accent' }, zIndex: 3, animation: { name: 'zoomIn', duration: 400 } },
      { id: 'n1-year', type: 'text', content: '1915', fontFamily: MONO, fontSize: 40, fontWeight: '700', color: { $t: 'colors.accent' }, x: 190, y: 556, width: 200, height: 46, zIndex: 3 },
      { id: 'n1-title', type: 'text', content: '爱因斯坦写下引力场方程', fontFamily: { $t: 'fonts.heading' }, fontSize: 34, fontWeight: '800', color: { $t: 'colors.primary' }, x: 190, y: 606, width: 800, height: 48, zIndex: 3, editable: { content: true } },
      { id: 'n1-desc', type: 'text', content: '广义相对论把引力重新理解为时空的弯曲。', fontFamily: { $t: 'fonts.heading' }, fontSize: 26, fontWeight: '400', color: LIGHT, x: 190, y: 660, width: 780, height: 60, zIndex: 3, editable: { content: true } },
      { id: 'n2', group: 'n', type: 'shape', shapeKind: 'circle', x: 100, y: 850, width: 44, height: 44, fill: { $t: 'colors.accent' }, zIndex: 3, animation: { name: 'zoomIn', duration: 400, delay: 200 } },
      { id: 'n2-year', type: 'text', content: '1929', fontFamily: MONO, fontSize: 40, fontWeight: '700', color: { $t: 'colors.accent' }, x: 190, y: 846, width: 200, height: 46, zIndex: 3 },
      { id: 'n2-title', type: 'text', content: '哈勃发现星系正在退行', fontFamily: { $t: 'fonts.heading' }, fontSize: 34, fontWeight: '800', color: { $t: 'colors.primary' }, x: 190, y: 896, width: 800, height: 48, zIndex: 3, editable: { content: true } },
      { id: 'n2-desc', type: 'text', content: '越远的星系红移越大——宇宙正在膨胀。', fontFamily: { $t: 'fonts.heading' }, fontSize: 26, fontWeight: '400', color: LIGHT, x: 190, y: 950, width: 780, height: 60, zIndex: 3, editable: { content: true } },
      { id: 'n3', group: 'n', type: 'shape', shapeKind: 'circle', x: 100, y: 1140, width: 44, height: 44, fill: { $t: 'colors.accent' }, zIndex: 3, animation: { name: 'zoomIn', duration: 400, delay: 400 } },
      { id: 'n3-year', type: 'text', content: '1998', fontFamily: MONO, fontSize: 40, fontWeight: '700', color: { $t: 'colors.accent' }, x: 190, y: 1136, width: 200, height: 46, zIndex: 3 },
      { id: 'n3-title', type: 'text', content: 'Ia 型超新星揭示加速膨胀', fontFamily: { $t: 'fonts.heading' }, fontSize: 34, fontWeight: '800', color: { $t: 'colors.primary' }, x: 190, y: 1186, width: 800, height: 48, zIndex: 3, editable: { content: true } },
      { id: 'n3-desc', type: 'text', content: '两个团队发现：膨胀不仅没减速，反而在加快。', fontFamily: { $t: 'fonts.heading' }, fontSize: 26, fontWeight: '400', color: LIGHT, x: 190, y: 1240, width: 780, height: 60, zIndex: 3, editable: { content: true } },
      { id: 'n4', group: 'n', type: 'shape', shapeKind: 'circle', x: 100, y: 1430, width: 44, height: 44, fill: { $t: 'colors.accent' }, zIndex: 3, animation: { name: 'zoomIn', duration: 400, delay: 600 } },
      { id: 'n4-year', type: 'text', content: '2011', fontFamily: MONO, fontSize: 40, fontWeight: '700', color: { $t: 'colors.accent' }, x: 190, y: 1426, width: 200, height: 46, zIndex: 3 },
      { id: 'n4-title', type: 'text', content: '宇宙加速膨胀获诺贝尔物理学奖', fontFamily: { $t: 'fonts.heading' }, fontSize: 34, fontWeight: '800', color: { $t: 'colors.primary' }, x: 190, y: 1476, width: 800, height: 48, zIndex: 3, editable: { content: true } },
      { id: 'n4-desc', type: 'text', content: '“暗能量”从此登上现代宇宙学的舞台中央。', fontFamily: { $t: 'fonts.heading' }, fontSize: 26, fontWeight: '400', color: LIGHT, x: 190, y: 1530, width: 780, height: 60, zIndex: 3, editable: { content: true } },
      { id: 'footer', type: 'text', content: '认知引擎 · 用 60 秒读懂宇宙', fontFamily: { $t: 'fonts.heading' }, fontSize: 24, fontWeight: '500', color: { $t: 'colors.primary' }, opacity: 0.6, x: 190, y: 1660, width: 700, height: 34, zIndex: 3, editable: { content: true } }
    ]
  },
  {
    id: 'knowledge-didyouknow', name: '冷知识闪光卡', version: '1.0.0', category: 'knowledge', tags: ['knowledge', 'trivia', 'fun-fact', 'curiosity', '9:16'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="178" viewBox="0 0 100 178"><rect width="100" height="178" fill="%237c2d12"/><circle cx="50" cy="44" r="16" fill="%23fcd34d"/><rect x="18" y="76" width="64" height="9" rx="3" fill="%23ffffff"/><rect x="18" y="94" width="44" height="9" rx="3" fill="%23fed7aa"/></svg>',
    tokens: {
      colors: {
        bg: { label: '背景', default: '#7C2D12', options: ['#7C2D12', '#9A3412', '#7F1D1D', '#312E81', '#14532D'] },
        primary: { label: '主色', default: '#FFFFFF', options: ['#FFFFFF', '#FFF7ED', '#FEF3C7', '#FEF2F2', '#ECFDF5'] },
        accent: { label: '强调', default: '#FCD34D', options: ['#FCD34D', '#FBBF24', '#FDBA74', '#FDE68A', '#86EFAC'] }
      },
      fonts: { heading: { label: '标题字体', default: H, options: [H, 'Inter, sans-serif', 'Georgia, serif'] } }
    },
    presets: [
      { name: '焦糖琥珀', colors: { bg: '#7C2D12', primary: '#FFFFFF', accent: '#FCD34D' } },
      { name: '赤陶暖阳', colors: { bg: '#9A3412', primary: '#FFF7ED', accent: '#FDBA74' } },
      { name: '酒红金闪', colors: { bg: '#7F1D1D', primary: '#FEF2F2', accent: '#FDE68A' } },
      { name: '森林萤绿', colors: { bg: '#14532D', primary: '#ECFDF5', accent: '#86EFAC' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1920, defaultWidth: 1080, defaultHeight: 1920, backgroundColor: { $t: 'colors.bg' }, backgroundImage: dotsBg(1080, 1920, 48) },
    elements: [
      { id: 'icon-ring', type: 'shape', shapeKind: 'circle', x: 430, y: 240, width: 220, height: 220, border: { color: { $t: 'colors.accent' }, width: 2, style: 'solid' }, zIndex: 2, animation: { name: 'ripple', duration: 2800, iterationCount: 'infinite' } },
      { id: 'icon-core', type: 'shape', shapeKind: 'circle', x: 480, y: 290, width: 120, height: 120, fill: { $t: 'colors.accent' }, zIndex: 3, animation: { name: 'zoomIn', duration: 500 } },
      { id: 'icon-mark', type: 'text', content: '!', fontFamily: { $t: 'fonts.heading' }, fontSize: 96, fontWeight: '900', color: { $t: 'colors.bg' }, textAlign: 'center', x: 480, y: 296, width: 120, height: 110, zIndex: 4 },
      { id: 'eyebrow', type: 'shape', shapeKind: 'rect', x: 340, y: 470, width: 400, height: 64, fill: 'rgba(0,0,0,0.18)', borderRadius: 32, zIndex: 3 },
      { id: 'eyebrow-text', type: 'text', content: '冷知识 · DID YOU KNOW?', fontFamily: { $t: 'fonts.heading' }, fontSize: 26, fontWeight: '800', color: { $t: 'colors.accent' }, letterSpacing: 3, textAlign: 'center', x: 340, y: 486, width: 400, height: 32, zIndex: 4, editable: { content: true } },
      { id: 'fact-title', type: 'text', content: '蜂蜜，\n永远不会变质。', fontFamily: { $t: 'fonts.heading' }, fontSize: 104, fontWeight: '900', color: { $t: 'colors.primary' }, lineHeight: 1.2, textAlign: 'center', x: 90, y: 640, width: 900, height: 260, zIndex: 3, animation: { name: 'rise', duration: 800 }, editable: { content: true, fontSize: { type: 'range', min: 72, max: 130 }, position: true } },
      { id: 'rule', type: 'shape', shapeKind: 'line', x: 440, y: 940, width: 200, height: 5, fill: { $t: 'colors.accent' }, zIndex: 3 },
      { id: 'fact-body', type: 'text', content: '在密封、避光的条件下，3000 年前的蜂蜜\n今天依然可以食用。', fontFamily: { $t: 'fonts.heading' }, fontSize: 40, fontWeight: '400', color: { $t: 'colors.primary' }, lineHeight: 1.7, textAlign: 'center', x: 90, y: 1000, width: 900, height: 160, zIndex: 3, animation: { name: 'fadeIn', duration: 800, delay: 300 }, editable: { content: true } },
      { id: 'chip1', type: 'shape', shapeKind: 'rect', x: 110, y: 1240, width: 860, height: 96, fill: 'rgba(0,0,0,0.20)', borderRadius: 16, zIndex: 3 },
      { id: 'chip1-text', type: 'text', content: '原因：极低水分 + 强酸性 + 自带过氧化氢，细菌无法存活。', fontFamily: { $t: 'fonts.heading' }, fontSize: 28, fontWeight: '500', color: { $t: 'colors.primary' }, textAlign: 'center', x: 140, y: 1268, width: 800, height: 44, zIndex: 4, editable: { content: true } },
      { id: 'footer', type: 'text', content: '关注 @认知引擎 · 每周一颗大脑糖果', fontFamily: { $t: 'fonts.heading' }, fontSize: 30, fontWeight: '700', color: { $t: 'colors.accent' }, textAlign: 'center', x: 90, y: 1440, width: 900, height: 44, zIndex: 3, animation: { name: 'blink', duration: 3000, iterationCount: 'infinite' }, editable: { content: true } }
    ]
  },
  {
    id: 'knowledge-formula', name: '一图看懂公式', version: '1.0.0', category: 'knowledge', tags: ['knowledge', 'formula', 'physics', 'education', '4:5'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="125" viewBox="0 0 100 125"><rect width="100" height="125" fill="%23064e3b"/><rect x="14" y="30" width="72" height="34" rx="6" fill="%23ffffff" opacity="0.12"/><text x="50" y="54" font-size="20" fill="%236ee7b7" text-anchor="middle" font-family="monospace">E=mc²</text><rect x="14" y="76" width="22" height="22" rx="4" fill="%2334d399"/><rect x="40" y="76" width="22" height="22" rx="4" fill="%2334d399"/><rect x="66" y="76" width="22" height="22" rx="4" fill="%2334d399"/></svg>',
    tokens: {
      colors: {
        bg: { label: '背景', default: '#064E3B', options: ['#064E3B', '#0F172A', '#0B3B5C', '#1E1B4B', '#3B0764'] },
        primary: { label: '主色', default: '#FFFFFF', options: ['#FFFFFF', '#ECFDF5', '#F0FDFA', '#ECFEFF', '#F8FAFC', '#FAF5FF'] },
        accent: { label: '强调', default: '#34D399', options: ['#34D399', '#6EE7B7', '#5EEAD4', '#7DD3FC', '#C4B5FD'] }
      },
      fonts: { heading: { label: '标题字体', default: H, options: [H, 'Inter, sans-serif', 'system-ui, sans-serif'] } }
    },
    presets: [
      { name: '翡翠公式', colors: { bg: '#064E3B', primary: '#FFFFFF', accent: '#34D399' } },
      { name: '深海蓝调', colors: { bg: '#0B3B5C', primary: '#ECFEFF', accent: '#7DD3FC' } },
      { name: '石墨霓虹', colors: { bg: '#0F172A', primary: '#F8FAFC', accent: '#5EEAD4' } },
      { name: '紫罗兰洞察', colors: { bg: '#3B0764', primary: '#FAF5FF', accent: '#C4B5FD' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' }, backgroundImage: gridBg(1080, 1350, 60) },
    elements: [
      { id: 'eyebrow', type: 'text', content: 'FORMULA BREAKDOWN · 公式拆解', fontFamily: { $t: 'fonts.heading' }, fontSize: 22, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 4, x: 80, y: 82, width: 700, height: 30, zIndex: 3, editable: { content: true } },
      { id: 'title', type: 'text', content: '宇宙最著名的一行公式', fontFamily: { $t: 'fonts.heading' }, fontSize: 52, fontWeight: '900', color: { $t: 'colors.primary' }, x: 80, y: 124, width: 920, height: 70, zIndex: 3, animation: { name: 'fadeIn', duration: 600 }, editable: { content: true, fontSize: { type: 'range', min: 38, max: 66 }, position: true } },
      { id: 'formula-board', type: 'shape', shapeKind: 'rect', x: 120, y: 240, width: 840, height: 300, fill: GLASS, borderRadius: 24, border: { color: { $t: 'colors.accent' }, width: 2, style: 'solid' }, zIndex: 2, animation: { name: 'zoomIn', duration: 500 } },
      { id: 'formula', type: 'text', content: 'E = mc²', fontFamily: MONO, fontSize: 150, fontWeight: '700', color: { $t: 'colors.primary' }, textAlign: 'center', x: 120, y: 322, width: 840, height: 150, zIndex: 3, animation: { name: 'fadeInUp', duration: 700, delay: 200 }, editable: { content: true } },
      { id: 'formula-caption', type: 'text', content: '质量与能量，是同一枚硬币的两面。', fontFamily: { $t: 'fonts.heading' }, fontSize: 26, fontWeight: '400', color: { $t: 'colors.accent' }, textAlign: 'center', x: 120, y: 486, width: 840, height: 40, zIndex: 3, editable: { content: true } },
      { id: 't1', group: 't', type: 'shape', shapeKind: 'rect', x: 80, y: 610, width: 290, height: 300, fill: GLASS, borderRadius: 18, border: { color: 'rgba(255,255,255,0.14)', width: 1, style: 'solid' }, zIndex: 2, animation: { name: 'fadeInUp', duration: 500 } },
      { id: 't1-sym', type: 'text', content: 'E', fontFamily: MONO, fontSize: 72, fontWeight: '700', color: { $t: 'colors.accent' }, x: 108, y: 646, width: 120, height: 90, zIndex: 3 },
      { id: 't1-name', type: 'text', content: '能量 Energy', fontFamily: { $t: 'fonts.heading' }, fontSize: 28, fontWeight: '800', color: { $t: 'colors.primary' }, x: 108, y: 756, width: 234, height: 40, zIndex: 3, editable: { content: true } },
      { id: 't1-desc', type: 'text', content: '系统所含的总能量，单位焦耳。', fontFamily: { $t: 'fonts.heading' }, fontSize: 22, fontWeight: '400', color: LIGHT, lineHeight: 1.5, x: 108, y: 800, width: 234, height: 90, zIndex: 3, editable: { content: true } },
      { id: 't2', group: 't', type: 'shape', shapeKind: 'rect', x: 395, y: 610, width: 290, height: 300, fill: GLASS, borderRadius: 18, border: { color: 'rgba(255,255,255,0.14)', width: 1, style: 'solid' }, zIndex: 2, animation: { name: 'fadeInUp', duration: 500, delay: 150 } },
      { id: 't2-sym', type: 'text', content: 'm', fontFamily: MONO, fontSize: 72, fontWeight: '700', color: { $t: 'colors.accent' }, x: 423, y: 646, width: 120, height: 90, zIndex: 3 },
      { id: 't2-name', type: 'text', content: '质量 Mass', fontFamily: { $t: 'fonts.heading' }, fontSize: 28, fontWeight: '800', color: { $t: 'colors.primary' }, x: 423, y: 756, width: 234, height: 40, zIndex: 3, editable: { content: true } },
      { id: 't2-desc', type: 'text', content: '物体所含物质的量，单位千克。', fontFamily: { $t: 'fonts.heading' }, fontSize: 22, fontWeight: '400', color: LIGHT, lineHeight: 1.5, x: 423, y: 800, width: 234, height: 90, zIndex: 3, editable: { content: true } },
      { id: 't3', group: 't', type: 'shape', shapeKind: 'rect', x: 710, y: 610, width: 290, height: 300, fill: GLASS, borderRadius: 18, border: { color: 'rgba(255,255,255,0.14)', width: 1, style: 'solid' }, zIndex: 2, animation: { name: 'fadeInUp', duration: 500, delay: 300 } },
      { id: 't3-sym', type: 'text', content: 'c²', fontFamily: MONO, fontSize: 72, fontWeight: '700', color: { $t: 'colors.accent' }, x: 738, y: 646, width: 160, height: 90, zIndex: 3 },
      { id: 't3-name', type: 'text', content: '光速平方', fontFamily: { $t: 'fonts.heading' }, fontSize: 28, fontWeight: '800', color: { $t: 'colors.primary' }, x: 738, y: 756, width: 234, height: 40, zIndex: 3, editable: { content: true } },
      { id: 't3-desc', type: 'text', content: '约 9×10¹⁶ m²/s²，放大质量巨能。', fontFamily: { $t: 'fonts.heading' }, fontSize: 22, fontWeight: '400', color: LIGHT, lineHeight: 1.5, x: 738, y: 800, width: 234, height: 90, zIndex: 3, editable: { content: true } },
      { id: 'note', type: 'text', content: '一点点质量，乘以极大的 c²，就能释放出惊人的能量——这正是恒星发光与核能的来源。', fontFamily: { $t: 'fonts.heading' }, fontSize: 26, fontWeight: '500', color: { $t: 'colors.primary' }, textAlign: 'center', lineHeight: 1.6, x: 120, y: 990, width: 840, height: 120, zIndex: 3, editable: { content: true, position: true } },
      { id: 'footer', type: 'text', content: '认知引擎 · 给好奇心的一堂物理课', fontFamily: { $t: 'fonts.heading' }, fontSize: 20, fontWeight: '500', color: { $t: 'colors.primary' }, opacity: 0.55, textAlign: 'center', x: 80, y: 1180, width: 920, height: 30, zIndex: 3, editable: { content: true } }
    ]
  }
]

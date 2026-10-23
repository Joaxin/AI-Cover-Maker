// src/core/templates/knowledge/knowledge.ts
import type { Template } from '@/types/types'
import { gridBg, dotsBg } from './_decor'
export const knowledgeTemplates: Template[] = [
{
  id: 'knowledge-infographic-header', name: '高维科普认知大标题', version: '1.2.0', category: 'knowledge',
  tags: ['knowledge', 'infographic', 'curiosity', 'science'],
  thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%230284c7"/><rect x="10" y="15" width="80" height="15" rx="3" fill="%23ffffff"/><rect x="10" y="38" width="50" height="6" fill="%23bae6fd"/><circle cx="82" cy="24" r="9" fill="none" stroke="%23bae6fd" stroke-width="2"/></svg>',
  tokens: {
    colors: {
      bg: { label: '背景', default: '#0284C7', options: ['#0284C7', '#0369A1', '#075985', '#047857', '#4338CA', '#1E293B'] },
      primary: { label: '主色', default: '#FFFFFF', options: ['#FFFFFF', '#F0F9FF', '#E0F2FE', '#ECFDF5'] },
      accent: { label: '强调', default: '#BAE6FD', options: ['#BAE6FD', '#7DD3FC', '#38BDF8', '#A7F3D0', '#C7D2FE'] },
      ink: { label: '板面墨色', default: '#0F172A', options: ['#0F172A', '#052E1F', '#1E1B4B', '#111827'] }
    },
    fonts: { heading: { label: '标题字体', default: 'Helvetica, Arial, sans-serif', options: ['Helvetica, Arial, sans-serif', 'Inter, sans-serif', 'system-ui, sans-serif'] } }
  },
  presets: [
    { name: '深海蓝科普', colors: { bg: '#0284C7', primary: '#FFFFFF', accent: '#BAE6FD', ink: '#0F172A' } },
    { name: '墨绿生命科学', colors: { bg: '#047857', primary: '#FFFFFF', accent: '#A7F3D0', ink: '#052E1F' } },
    { name: '靛紫理性思辨', colors: { bg: '#4338CA', primary: '#FFFFFF', accent: '#C7D2FE', ink: '#1E1B4B' } },
    { name: '石墨高对比', colors: { bg: '#1E293B', primary: '#FFFFFF', accent: '#7DD3FC', ink: '#111827' } }
  ],
  canvas: { virtualWidth: 1000, virtualHeight: 1000, defaultWidth: 1000, defaultHeight: 1000, backgroundColor: { $t: 'colors.bg' }, backgroundImage: gridBg(1000, 1000, 64) },
  elements: [
    { id: 'atom-orbit-a', type: 'shape', shapeKind: 'rect', x: 806, y: 104, width: 138, height: 46, borderRadius: 23, border: { color: { $t: 'colors.accent' }, width: 2, style: 'solid' }, rotation: -30, opacity: 0.9, zIndex: 2, animation: { name: 'twinkle', duration: 3200, iterationCount: 'infinite' } },
    { id: 'atom-orbit-b', type: 'shape', shapeKind: 'rect', x: 806, y: 104, width: 138, height: 46, borderRadius: 23, border: { color: { $t: 'colors.accent' }, width: 2, style: 'solid' }, rotation: 30, opacity: 0.9, zIndex: 2, animation: { name: 'twinkle', duration: 3200, delay: 700, iterationCount: 'infinite' } },
    { id: 'atom-core', type: 'shape', shapeKind: 'circle', x: 858, y: 112, width: 34, height: 34, fill: { $t: 'colors.accent' }, zIndex: 3, animation: { name: 'pulse', duration: 2400, iterationCount: 'infinite' } },
    { id: 'corner-tl', type: 'shape', shapeKind: 'line', x: 60, y: 60, width: 46, height: 2, fill: { $t: 'colors.accent' }, opacity: 0.7, zIndex: 2 },
    { id: 'corner-tl-2', type: 'shape', shapeKind: 'rect', x: 60, y: 60, width: 2, height: 46, fill: { $t: 'colors.accent' }, opacity: 0.7, zIndex: 2 },
    { id: 'category-badge', type: 'shape', shapeKind: 'rect', x: 80, y: 80, width: 236, height: 52, fill: { $t: 'colors.primary' }, borderRadius: 26, zIndex: 1 },
    { id: 'category-text', type: 'text', content: '💡 硬核科普 · 第 42 期', fontFamily: { $t: 'fonts.heading' }, fontSize: 20, fontWeight: '700', color: { $t: 'colors.bg' }, textAlign: 'center', x: 80, y: 92, width: 236, height: 30, zIndex: 2, editable: { content: true } },
    { id: 'hook-question', type: 'text', content: '为什么宇宙的\n尽头不是虚无？', fontFamily: { $t: 'fonts.heading' }, fontSize: 62, fontWeight: '900', color: { $t: 'colors.primary' }, lineHeight: 1.2, x: 80, y: 168, width: 700, height: 200, zIndex: 3, animation: { name: 'fadeInDown', duration: 600 }, editable: { content: true, fontSize: { type: 'range', min: 46, max: 80 }, position: true } },
    { id: 'accent-underline', type: 'shape', shapeKind: 'line', x: 84, y: 372, width: 220, height: 6, fill: { $t: 'colors.accent' }, zIndex: 3, animation: { name: 'slideInLeft', duration: 700, delay: 300 } },
    { id: 'white-board', type: 'shape', shapeKind: 'rect', x: 80, y: 400, width: 840, height: 470, fill: { $t: 'colors.primary' }, borderRadius: 20, shadow: { color: 'rgba(0,0,0,0.25)', blur: 26, offsetX: 0, offsetY: 10 }, zIndex: 1 },
    { id: 'bullet-1', group: 'bullet-', type: 'shape', shapeKind: 'circle', x: 112, y: 440, width: 44, height: 44, fill: { $t: 'colors.accent' }, zIndex: 2 },
    { id: 'bullet-1-num', type: 'text', content: '1', fontFamily: { $t: 'fonts.heading' }, fontSize: 24, fontWeight: '900', color: { $t: 'colors.ink' }, textAlign: 'center', x: 112, y: 449, width: 44, height: 26, zIndex: 3 },
    { id: 'point-1', type: 'text', content: '宇宙微波背景辐射的底层真相', fontFamily: { $t: 'fonts.heading' }, fontSize: 27, fontWeight: '700', color: { $t: 'colors.ink' }, x: 172, y: 448, width: 700, height: 40, zIndex: 2, editable: { content: true } },
    { id: 'bullet-2', group: 'bullet-', type: 'shape', shapeKind: 'circle', x: 112, y: 528, width: 44, height: 44, fill: { $t: 'colors.accent' }, zIndex: 2 },
    { id: 'bullet-2-num', type: 'text', content: '2', fontFamily: { $t: 'fonts.heading' }, fontSize: 24, fontWeight: '900', color: { $t: 'colors.ink' }, textAlign: 'center', x: 112, y: 537, width: 44, height: 26, zIndex: 3 },
    { id: 'point-2', type: 'text', content: '暗物质与暗能量的拉扯模型', fontFamily: { $t: 'fonts.heading' }, fontSize: 27, fontWeight: '700', color: { $t: 'colors.ink' }, x: 172, y: 536, width: 700, height: 40, zIndex: 2, editable: { content: true } },
    { id: 'bullet-3', group: 'bullet-', type: 'shape', shapeKind: 'circle', x: 112, y: 616, width: 44, height: 44, fill: { $t: 'colors.accent' }, zIndex: 2 },
    { id: 'bullet-3-num', type: 'text', content: '3', fontFamily: { $t: 'fonts.heading' }, fontSize: 24, fontWeight: '900', color: { $t: 'colors.ink' }, textAlign: 'center', x: 112, y: 625, width: 44, height: 26, zIndex: 3 },
    { id: 'point-3', type: 'text', content: '弦理论视界下的维度塌缩假设', fontFamily: { $t: 'fonts.heading' }, fontSize: 27, fontWeight: '700', color: { $t: 'colors.ink' }, x: 172, y: 624, width: 700, height: 40, zIndex: 2, editable: { content: true } },
    { id: 'highlight-strip', type: 'shape', shapeKind: 'rect', x: 112, y: 690, width: 776, height: 150, fill: { $t: 'colors.accent' }, borderRadius: 14, opacity: 0.28, zIndex: 2 },
    { id: 'highlight-text', type: 'text', content: '冷知识：可观测宇宙中约 95% 仍是未知的暗物质与暗能量。', fontFamily: { $t: 'fonts.heading' }, fontSize: 26, fontWeight: '700', color: { $t: 'colors.ink' }, lineHeight: 1.5, x: 140, y: 720, width: 720, height: 100, zIndex: 3, editable: { content: true, position: true } },
    { id: 'footer-source', type: 'text', content: '数据来源 · Observational Cosmology Review 2026', fontFamily: { $t: 'fonts.heading' }, fontSize: 18, fontWeight: '500', color: { $t: 'colors.primary' }, opacity: 0.75, x: 80, y: 902, width: 840, height: 30, zIndex: 2, editable: { content: true } }
  ]
},
{
  id: 'knowledge-qa-card', name: '高对比问答快卡', version: '1.2.0', category: 'knowledge',
  tags: ['knowledge', 'qa', 'learning'],
  thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%231e1b4b"/><rect x="15" y="15" width="25" height="15" rx="3" fill="%23f59e0b"/><rect x="15" y="40" width="70" height="12" fill="%23ffffff"/><rect x="15" y="62" width="70" height="26" rx="4" fill="%23312e81"/></svg>',
  tokens: {
    colors: {
      bg: { label: '背景', default: '#1E1B4B', options: ['#1E1B4B', '#312E81', '#111827', '#0F172A', '#1E293B'] },
      primary: { label: '主色', default: '#FFFFFF', options: ['#FFFFFF', '#E0E7FF', '#C7D2FE', '#F9FAFB', '#E2E8F0'] },
      accent: { label: '强调', default: '#F59E0B', options: ['#F59E0B', '#FBBF24', '#FCD34D', '#FB923C', '#22D3EE'] }
    },
    fonts: { heading: { label: '标题字体', default: 'Helvetica, Arial, sans-serif', options: ['Helvetica, Arial, sans-serif', 'Inter, sans-serif', 'system-ui, sans-serif'] } }
  },
  presets: [
    { name: '靛蓝问答', colors: { bg: '#1E1B4B', primary: '#FFFFFF', accent: '#F59E0B' } },
    { name: '石墨琥珀', colors: { bg: '#111827', primary: '#F9FAFB', accent: '#FB923C' } },
    { name: '松墨青碧', colors: { bg: '#0F172A', primary: '#E2E8F0', accent: '#22D3EE' } },
    { name: '电光紫罗兰', colors: { bg: '#312E81', primary: '#E0E7FF', accent: '#FBBF24' } }
  ],
  canvas: { virtualWidth: 1000, virtualHeight: 1000, defaultWidth: 1000, defaultHeight: 1000, backgroundColor: { $t: 'colors.bg' }, backgroundImage: dotsBg(1000, 1000, 46) },
  elements: [
    { id: 'watermark', type: 'text', content: '?', fontFamily: { $t: 'fonts.heading' }, fontSize: 640, fontWeight: '900', color: { $t: 'colors.primary' }, opacity: 0.05, textAlign: 'center', x: 480, y: 120, width: 520, height: 700, zIndex: 0, rotation: -8 },
    { id: 'corner-tr', type: 'shape', shapeKind: 'line', x: 894, y: 60, width: 46, height: 2, fill: { $t: 'colors.accent' }, opacity: 0.8, zIndex: 2 },
    { id: 'corner-tr-2', type: 'shape', shapeKind: 'rect', x: 938, y: 60, width: 2, height: 46, fill: { $t: 'colors.accent' }, opacity: 0.8, zIndex: 2 },
    { id: 'badge-ring', type: 'shape', shapeKind: 'circle', x: 74, y: 84, width: 82, height: 82, border: { color: { $t: 'colors.accent' }, width: 2, style: 'solid' }, zIndex: 1, animation: { name: 'ripple', duration: 2600, iterationCount: 'infinite' } },
    { id: 'badge-q', type: 'shape', shapeKind: 'rect', x: 90, y: 100, width: 90, height: 50, fill: { $t: 'colors.accent' }, borderRadius: 10, zIndex: 2, animation: { name: 'zoomIn', duration: 500 } },
    { id: 'badge-q-text', type: 'text', content: 'Q', fontFamily: { $t: 'fonts.heading' }, fontSize: 30, fontWeight: '900', color: '#1E1B4B', textAlign: 'center', x: 90, y: 108, width: 90, height: 35, zIndex: 3 },
    { id: 'core-question', type: 'text', content: '1 分钟搞懂：\n什么是生成式大模型的注意力机制？', fontFamily: { $t: 'fonts.heading' }, fontSize: 52, fontWeight: '800', color: { $t: 'colors.primary' }, lineHeight: 1.3, x: 90, y: 190, width: 820, height: 210, zIndex: 3, animation: { name: 'fadeIn', duration: 800 }, editable: { content: true, fontSize: { type: 'range', min: 40, max: 72 }, position: true } },
    { id: 'tag-1', group: 'tag-', type: 'shape', shapeKind: 'rect', x: 90, y: 408, width: 150, height: 42, borderRadius: 21, border: { color: { $t: 'colors.accent' }, width: 2, style: 'solid' }, zIndex: 3 },
    { id: 'tag-1-text', type: 'text', content: '# 人工智能', fontFamily: { $t: 'fonts.heading' }, fontSize: 19, fontWeight: '700', color: { $t: 'colors.accent' }, textAlign: 'center', x: 90, y: 418, width: 150, height: 24, zIndex: 4, editable: { content: true } },
    { id: 'tag-2', group: 'tag-', type: 'shape', shapeKind: 'rect', x: 252, y: 408, width: 138, height: 42, borderRadius: 21, border: { color: { $t: 'colors.accent' }, width: 2, style: 'solid' }, zIndex: 3 },
    { id: 'tag-2-text', type: 'text', content: '# 大模型', fontFamily: { $t: 'fonts.heading' }, fontSize: 19, fontWeight: '700', color: { $t: 'colors.accent' }, textAlign: 'center', x: 252, y: 418, width: 138, height: 24, zIndex: 4, editable: { content: true } },
    { id: 'tag-3', group: 'tag-', type: 'shape', shapeKind: 'rect', x: 402, y: 408, width: 150, height: 42, borderRadius: 21, border: { color: { $t: 'colors.accent' }, width: 2, style: 'solid' }, zIndex: 3 },
    { id: 'tag-3-text', type: 'text', content: '# 认知科学', fontFamily: { $t: 'fonts.heading' }, fontSize: 19, fontWeight: '700', color: { $t: 'colors.accent' }, textAlign: 'center', x: 402, y: 418, width: 150, height: 24, zIndex: 4, editable: { content: true } },
    { id: 'badge-a', type: 'shape', shapeKind: 'circle', x: 60, y: 470, width: 62, height: 62, fill: { $t: 'colors.accent' }, zIndex: 4 },
    { id: 'badge-a-text', type: 'text', content: 'A', fontFamily: { $t: 'fonts.heading' }, fontSize: 30, fontWeight: '900', color: '#1E1B4B', textAlign: 'center', x: 60, y: 483, width: 62, height: 36, zIndex: 5 },
    { id: 'answer-box', type: 'shape', shapeKind: 'rect', x: 90, y: 484, width: 820, height: 356, fill: { $t: 'colors.bg' }, borderRadius: 16, border: { color: { $t: 'colors.accent' }, width: 1, style: 'solid' }, opacity: 0.96, zIndex: 1 },
    { id: 'answer-inner', type: 'shape', shapeKind: 'rect', x: 90, y: 484, width: 820, height: 356, fill: 'rgba(255,255,255,0.06)', borderRadius: 16, zIndex: 2 },
    { id: 'answer-label', type: 'text', content: '核心要点', fontFamily: { $t: 'fonts.heading' }, fontSize: 22, fontWeight: '800', color: { $t: 'colors.accent' }, letterSpacing: 2, x: 130, y: 512, width: 300, height: 30, zIndex: 3 },
    { id: 'answer-rule', type: 'shape', shapeKind: 'line', x: 130, y: 548, width: 740, height: 1, fill: 'rgba(255,255,255,0.14)', zIndex: 3 },
    { id: 'answer-text', type: 'text', content: '· 自注意力（Self-Attention）计算全序列的权重关联\n· 多头设计（Multi-Head）并行捕捉多语义子空间\n· 位置编码为序列注入上下文的时序关系', fontFamily: { $t: 'fonts.heading' }, fontSize: 27, fontWeight: '500', color: { $t: 'colors.primary' }, lineHeight: 1.9, x: 130, y: 566, width: 740, height: 260, zIndex: 3, animation: { name: 'fadeInUp', duration: 800, delay: 300 }, editable: { content: true } },
    { id: 'footer-src', type: 'text', content: '· 硬核问答 · 第 12 期 · 关注 @认知引擎，每周一更', fontFamily: { $t: 'fonts.heading' }, fontSize: 18, fontWeight: '500', color: { $t: 'colors.primary' }, opacity: 0.7, x: 90, y: 872, width: 820, height: 28, zIndex: 3, editable: { content: true } }
  ]
}
]

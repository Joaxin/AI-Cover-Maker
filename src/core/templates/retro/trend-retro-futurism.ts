// src/core/templates/retro/trend-retro-futurism.ts
// 当红趋势批 → 归入「复古风」（retro） ｜ 6. 70s 复古未来（9:16）
// 迁移自 src/core/templates/trend/：模板内容、素材函数与外观保持不变，只改分类归属。
import type { Template } from '@/types/types'
import { HEI, SONG, MONO, IMPACT, grain, scribble, sunDisc, starfield } from '../_fx/trend'

export const trendRetroFuturismTemplates: Template[] = [
  {
    id: 'trend-retro-futurism', name: '70s 复古未来落日', version: '1.0.0', category: 'retro',
    tags: ['trend', 'retro-futurism', '70s', 'sunset', 'space', '9:16'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="178" viewBox="0 0 100 178"><rect width="100" height="178" fill="%231B1464"/><circle cx="50" cy="72" r="26" fill="%23F59E0B"/><rect x="24" y="66" width="52" height="3" fill="%231B1464"/><rect x="24" y="74" width="52" height="4" fill="%231B1464"/><rect x="24" y="84" width="52" height="5" fill="%231B1464"/><rect x="14" y="112" width="72" height="8" fill="%2322D3EE" opacity="0.8"/><rect x="22" y="126" width="56" height="6" fill="%23F5F0E1" opacity="0.6"/><rect x="30" y="146" width="40" height="6" fill="%23F5F0E1" opacity="0.35"/></svg>',
    tokens: {
      colors: {
        sky: { label: '夜空', default: '#1B1464', options: ['#1B1464', '#3B0764', '#0F172A', '#0B3B2E'] },
        sun: { label: '落日', default: '#F59E0B', options: ['#F59E0B', '#EF4444', '#22D3EE', '#A3E635', '#FBBF24'] },
        ring: { label: '光环', default: '#22D3EE', options: ['#22D3EE', '#F472B6', '#FBBF24', '#F8FAFC'] },
        cream: { label: '米白字', default: '#F5F0E1', options: ['#F5F0E1', '#1B1464', '#FEF3C7', '#ECFEFF'] }
      },
      fonts: { latin: { label: '复古标题', default: '"Copperplate", Georgia, serif', options: ['"Copperplate", Georgia, serif', IMPACT, MONO] }, cjk: { label: '中文体', default: SONG, options: [SONG, HEI, MONO] } }
    },
    presets: [
      { name: '靛紫落日', colors: { sky: '#1B1464', sun: '#F59E0B', ring: '#22D3EE', cream: '#F5F0E1' } },
      { name: '暗紫霓虹', colors: { sky: '#3B0764', sun: '#EF4444', ring: '#F472B6', cream: '#FEF3C7' } },
      { name: '深夜青柠', colors: { sky: '#0F172A', sun: '#A3E635', ring: '#22D3EE', cream: '#ECFEFF' } },
      { name: '墨绿轨道', colors: { sky: '#0B3B2E', sun: '#FBBF24', ring: '#F8FAFC', cream: '#F5F0E1' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1920, defaultWidth: 1080, defaultHeight: 1920, backgroundColor: { $t: 'colors.sky' } },
    elements: [
      { id: 'rf-stars', type: 'image', src: starfield(1080, 1200, 90, '%23F5F0E1', 27), x: 0, y: 0, width: 1080, height: 1200, objectFit: 'fill', opacity: 0.7, zIndex: 2 },
      { id: 'rf-top', type: 'text', content: 'RETRO • FUTURE • 1974 — 2026', fontFamily: { $t: 'fonts.latin' }, fontSize: 25, fontWeight: '700', color: { $t: 'colors.cream' }, letterSpacing: 12, textAlign: 'center', x: 90, y: 130, width: 900, height: 36, zIndex: 6 },
      { id: 'rf-ring-1', type: 'shape', shapeKind: 'circle', x: 240, y: 248, width: 600, height: 600, fill: 'transparent', border: { width: 3, color: { $t: 'colors.ring' } }, opacity: 0.55, zIndex: 4, animation: { name: 'spinSlow', duration: 26000, iterationCount: 'infinite', easing: 'linear' } },
      { id: 'rf-ring-2', type: 'shape', shapeKind: 'circle', x: 170, y: 178, width: 740, height: 740, fill: 'transparent', border: { width: 2, color: { $t: 'colors.cream' } }, opacity: 0.28, zIndex: 4, animation: { name: 'pulse', duration: 6000, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'rf-sun', type: 'image', src: sunDisc(460, '%23F59E0B', '%231B1464', 7), x: 310, y: 318, width: 460, height: 460, objectFit: 'fill', zIndex: 5, animation: { name: 'glow', duration: 5200, iterationCount: 'infinite', easing: 'ease-in-out' } },
      { id: 'rf-arc', type: 'shape', shapeKind: 'circle', x: 190, y: 800, width: 700, height: 700, fill: 'transparent', border: { width: 6, color: { $t: 'colors.sun' } }, opacity: 0.35, zIndex: 3 },
      { id: 'rf-title-cn', type: 'text', content: '未 来 已 到', fontFamily: { $t: 'fonts.cjk' }, fontSize: 118, fontWeight: '900', color: { $t: 'colors.cream' }, letterSpacing: 14, textAlign: 'center', x: 60, y: 902, width: 960, height: 140, zIndex: 7, animation: { name: 'fadeInUp', duration: 800 }, editable: { content: true } },
      { id: 'rf-title-en', type: 'text', content: 'LOOK BACK FORWARD', fontFamily: { $t: 'fonts.latin' }, fontSize: 46, fontWeight: '700', color: { $t: 'colors.sun' }, letterSpacing: 8, textAlign: 'center', x: 60, y: 1058, width: 960, height: 62, zIndex: 7, animation: { name: 'fadeInUp', duration: 800, delay: 160 }, editable: { content: true } },
      { id: 'rf-divider', type: 'image', src: scribble(520, 30, '%2322D3EE', 6), x: 280, y: 1136, width: 520, height: 30, objectFit: 'fill', opacity: 0.8, zIndex: 7 },
      { id: 'rf-body', type: 'text', content: '七十年代的乐观劲儿：圆、橙、\n和一条永远通向前方的地平线。', fontFamily: { $t: 'fonts.cjk' }, fontSize: 30, color: { $t: 'colors.cream' }, opacity: 0.78, lineHeight: 1.8, textAlign: 'center', x: 140, y: 1188, width: 800, height: 116, zIndex: 7, animation: { name: 'fadeIn', duration: 800, delay: 320 }, editable: { content: true } },
      { id: 'rf-horizon', type: 'shape', shapeKind: 'rect', x: 0, y: 1362, width: 1080, height: 4, fill: { $t: 'colors.ring' }, opacity: 0.85, zIndex: 7 },
      { id: 'rf-grid', type: 'image', src: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="558" viewBox="0 0 1080 558"><g stroke='%2322D3EE' stroke-width='2' opacity='0.5'>` + Array.from({ length: 15 }, (_, i) => `<line x1='540' y1='0' x2='${-900 + i * 170}' y2='558'/>`).join('') + Array.from({ length: 9 }, (_, i) => `<line x1='0' y1='${((i + 1) * (i + 1) * 6.6).toFixed(0)}' x2='1080' y2='${((i + 1) * (i + 1) * 6.6).toFixed(0)}' stroke-opacity='${(0.16 + i * 0.07).toFixed(2)}'/>`).join('') + `</g></svg>`, x: 0, y: 1364, width: 1080, height: 558, objectFit: 'fill', zIndex: 6 },
      { id: 'rf-pill', type: 'shape', shapeKind: 'rect', x: 330, y: 1560, width: 420, height: 96, fill: { $t: 'colors.sun' }, borderRadius: 48, zIndex: 8, animation: { name: 'zoomIn', duration: 560, delay: 480 } },
      { id: 'rf-pill-t', type: 'text', content: '倒计时 · 第一场', fontFamily: { $t: 'fonts.cjk' }, fontSize: 34, fontWeight: '900', color: { $t: 'colors.sky' }, textAlign: 'center', lineHeight: 2.8, x: 330, y: 1560, width: 420, height: 96, zIndex: 9, editable: { content: true } },
      { id: 'rf-foot', type: 'text', content: 'SIDE A / 01 · 1974.07 → 2026.09 · 复古未来主义', fontFamily: { $t: 'fonts.latin' }, fontSize: 22, color: { $t: 'colors.cream' }, opacity: 0.6, letterSpacing: 4, textAlign: 'center', x: 90, y: 1730, width: 900, height: 32, zIndex: 8 },
      { id: 'rf-grain', type: 'overlay', x: 0, y: 0, width: 1080, height: 1920, background: `url("${grain(300, 3, 0.6)}")`, opacity: 0.09, mixBlendMode: 'overlay', zIndex: 10 }
    ]
  }
]

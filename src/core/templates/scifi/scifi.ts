// src/core/templates/scifi/scifi.ts
import type { Template } from '@/types/types'
export const scifiTemplates: Template[] = [
{
  id: 'scifi-deep-space-odyssey', name: '深空恒星漫游', version: '1.1.0', category: 'scifi',
  tags: ['scifi', 'space', 'cosmos', 'galaxy', 'planet'],
  thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><defs><radialGradient id="dsneb" cx="70%" cy="30%" r="70%"><stop offset="0%" stop-color="%23818CF8" stop-opacity="0.32"/><stop offset="100%" stop-color="%23818CF8" stop-opacity="0"/></radialGradient></defs><rect width="100" height="100" fill="%2302040A"/><rect width="100" height="100" fill="url(%23dsneb)"/><g fill="%23FFFFFF"><circle cx="12" cy="18" r="1.1" opacity="0.9"/><circle cx="31" cy="9" r="0.7" opacity="0.5"/><circle cx="48" cy="21" r="0.6" opacity="0.4"/><circle cx="72" cy="11" r="0.8" opacity="0.6"/><circle cx="91" cy="30" r="0.7" opacity="0.45"/><circle cx="8" cy="52" r="0.6" opacity="0.4"/><circle cx="22" cy="72" r="1" opacity="0.7"/><circle cx="44" cy="86" r="0.6" opacity="0.45"/><circle cx="66" cy="70" r="0.8" opacity="0.55"/><circle cx="88" cy="84" r="0.7" opacity="0.4"/><circle cx="58" cy="46" r="0.5" opacity="0.35"/></g><g fill="%23818CF8"><circle cx="38" cy="33" r="1.3" opacity="0.8"/><circle cx="79" cy="52" r="0.9" opacity="0.6"/><circle cx="16" cy="90" r="0.8" opacity="0.5"/></g><circle cx="84" cy="16" r="19" fill="%23818CF8" opacity="0.9"/><circle cx="79" cy="11" r="19" fill="%2302040A" opacity="0.55"/><g fill="none" stroke="%23E2E8F0"><ellipse cx="84" cy="16" rx="27" ry="7.5" transform="rotate(-16 84 16)" stroke-width="1" opacity="0.55"/></g><ellipse cx="80" cy="20" rx="12" ry="1" fill="%23FFFFFF" opacity="0.25"/><ellipse cx="82" cy="27" rx="9" ry="0.8" fill="%23FFFFFF" opacity="0.2"/><circle cx="24" cy="14" r="2.4" fill="%23F8FAFC" opacity="0.9"/><g stroke="%23818CF8" stroke-width="1.6" opacity="0.7"><path d="M11 74 L29 70 M39 66 L57 62 M67 58 L85 54"/></g><circle cx="48" cy="64" r="3.4" fill="none" stroke="%23FFFFFF" stroke-width="1"/><rect x="12" y="30" width="6" height="0.9" fill="%23818CF8" opacity="0.6"/><rect x="12" y="42" width="6" height="0.9" fill="%23818CF8" opacity="0.6"/><rect x="12" y="54" width="6" height="0.9" fill="%23818CF8" opacity="0.6"/><rect x="16" y="26" width="58" height="4" fill="%23FFFFFF"/><rect x="16" y="33" width="44" height="4" fill="%23FFFFFF" opacity="0.85"/><rect x="16" y="80" width="38" height="2" fill="%23818CF8" opacity="0.8"/><rect x="16" y="88" width="52" height="2" fill="%23E2E8F0" opacity="0.5"/></svg>',
  tokens: {
    colors: {
      bg: { label: '深空', default: '#02040A', options: ['#02040A', '#09090B', '#0F172A', '#050E1A', '#1A0B2E'] },
      primary: { label: '主色', default: '#FFFFFF', options: ['#FFFFFF', '#F8FAFC', '#E2E8F0'] },
      accent: { label: '辅色', default: '#818CF8', options: ['#818CF8', '#6366F1', '#A78BFA', '#38BDF8', '#F472B6'] }
    },
    fonts: { heading: { label: '标题字体', default: 'Helvetica, Arial, sans-serif', options: ['Helvetica, Arial, sans-serif', 'Impact, sans-serif', 'Courier New, monospace'] } }
  },
  presets: [
    { name: '靛蓝星云', colors: { bg: '#02040A', primary: '#FFFFFF', accent: '#818CF8' } },
    { name: '紫电深空', colors: { bg: '#1A0B2E', primary: '#F8FAFC', accent: '#A78BFA' } },
    { name: '冰蓝远征', colors: { bg: '#050E1A', primary: '#E2E8F0', accent: '#38BDF8' } },
    { name: '暮粉星系', colors: { bg: '#09090B', primary: '#F8FAFC', accent: '#F472B6' } }
  ],
  canvas: { virtualWidth: 1000, virtualHeight: 1000, defaultWidth: 1000, defaultHeight: 1000, backgroundColor: { $t: 'colors.bg' }, backgroundImage: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000"><circle cx="850" cy="150" r="3" fill="%23ffffff" opacity="0.8"/><circle cx="150" cy="450" r="2" fill="%23ffffff" opacity="0.5"/><circle cx="650" cy="750" r="4" fill="%23818cf8" opacity="0.7"/><circle cx="420" cy="260" r="2" fill="%23ffffff" opacity="0.6"/><circle cx="900" cy="620" r="2.5" fill="%23ffffff" opacity="0.5"/></svg>' },
  elements: [
    // ── 星云层：两团低透明椭圆互叠，模拟 blur 出来的气体云
    { id: 'nebula-core', type: 'shape', shapeKind: 'circle', x: -80, y: -100, width: 880, height: 600, fill: { $t: 'colors.accent' }, opacity: 0.1, zIndex: 1, shadow: { color: { $t: 'colors.accent' }, blur: 120, offsetX: 0, offsetY: 0 }, animation: { name: 'glow', duration: 9000, iterationCount: 'infinite', easing: 'ease-in-out' } },
    { id: 'nebula-band', type: 'shape', shapeKind: 'circle', x: 300, y: 240, width: 820, height: 460, rotation: 18, fill: { $t: 'colors.primary' }, opacity: 0.05, zIndex: 1 },
    // ── 星海粒子：12 颗，尺寸/透明度/颜色按位推算，一半带 twinkle
    ...Array.from({ length: 12 }, (_, i) => {
      const s = 2 + (i * 7) % 6, x = (i * 383 + 61) % 960, y = (i * 613 + 137) % 940
      return { id: `star-${i}`, type: 'shape', shapeKind: 'circle', x, y, width: s, height: s, fill: { $t: i % 3 === 0 ? 'colors.accent' : 'colors.primary' }, opacity: 0.28 + ((i * 29) % 58) / 100, zIndex: 1, animation: i % 3 === 0 ? { name: 'twinkle', duration: 2200 + i * 260, delay: i * 180, iterationCount: 'infinite', easing: 'ease-in-out' } : undefined }
    }) as any,
    // ── 气态巨行星：本体 + 晨昏影 + 两条云带 + 光环 + 远端卫星
    { id: 'giant-planet', type: 'shape', shapeKind: 'circle', x: 560, y: -100, width: 600, height: 600, fill: { $t: 'colors.accent' }, opacity: 0.9, zIndex: 1, shadow: { color: { $t: 'colors.accent' }, blur: 70, offsetX: 0, offsetY: 0 }, animation: { name: 'glow', duration: 6000, iterationCount: 'infinite', easing: 'ease-in-out' } },
    { id: 'planet-terminator', type: 'shape', shapeKind: 'circle', x: 660, y: -220, width: 600, height: 600, fill: { $t: 'colors.bg' }, opacity: 0.5, zIndex: 2 },
    { id: 'planet-band-a', type: 'shape', shapeKind: 'circle', x: 596, y: 252, width: 330, height: 26, fill: { $t: 'colors.primary' }, opacity: 0.12, zIndex: 3 },
    { id: 'planet-band-b', type: 'shape', shapeKind: 'circle', x: 640, y: 318, width: 240, height: 18, fill: { $t: 'colors.primary' }, opacity: 0.09, zIndex: 3 },
    { id: 'planet-ring', type: 'shape', shapeKind: 'circle', x: 470, y: 75, width: 780, height: 250, rotation: -16, border: { color: { $t: 'colors.primary' }, width: 3, style: 'solid' }, opacity: 0.38, zIndex: 3 },
    { id: 'orbit-ring', type: 'shape', shapeKind: 'circle', x: 560, y: 40, width: 480, height: 480, border: { color: { $t: 'colors.accent' }, width: 2, style: 'solid' }, rotation: 24, opacity: 0.5, zIndex: 1, animation: { name: 'spinSlow', duration: 40000, iterationCount: 'infinite', easing: 'linear' }, editable: { position: true } },
    { id: 'distant-moon', type: 'shape', shapeKind: 'circle', x: 300, y: 84, width: 40, height: 40, fill: { $t: 'colors.primary' }, opacity: 0.85, zIndex: 2, shadow: { color: { $t: 'colors.accent' }, blur: 24, offsetX: 0, offsetY: 0 } },
    // ── 坐标系：左侧刻度尺 + 赤道坐标读数
    { id: 'coord-ruler', type: 'overlay', background: 'repeating-linear-gradient(0deg, rgba(226,232,240,0.55) 0px, rgba(226,232,240,0.55) 2px, rgba(0,0,0,0) 2px, rgba(0,0,0,0) 38px)', x: 46, y: 244, width: 16, height: 570, opacity: 0.4, zIndex: 2 },
    { id: 'coord-label', type: 'text', content: 'RA 19h54m36s · DEC +42°50′ · PARSEC 500', fontFamily: 'Courier New, monospace', fontSize: 16, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 2, x: 100, y: 138, width: 560, height: 24, opacity: 0.85, zIndex: 2, editable: { content: true } },
    { id: 'mission-code', type: 'text', content: 'MISSION // KEPLER-452B', fontFamily: 'Courier New, monospace', fontSize: 22, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 4, x: 100, y: 180, width: 600, height: 40, zIndex: 2, editable: { content: true, position: true } },
    { id: 'sci-title', type: 'text', content: 'INTERSTELLAR\nHORIZON', fontFamily: { $t: 'fonts.heading' }, fontSize: 80, fontWeight: '900', color: { $t: 'colors.primary' }, lineHeight: 1.1, letterSpacing: -1, x: 100, y: 250, width: 800, height: 220, zIndex: 3, animation: { name: 'fadeIn', duration: 1000 }, editable: { content: true, fontSize: { type: 'range', min: 56, max: 100 }, position: true } },
    // ── 飞船航线：四段虚线 + 航标圈 + 读数
    ...Array.from({ length: 4 }, (_, i) => (
      { id: `nav-dash-${i}`, type: 'shape', shapeKind: 'rect', x: 118 + i * 170, y: 728 - i * 38, width: 92, height: 2.5, rotation: -13, fill: { $t: 'colors.accent' }, opacity: 0.55, zIndex: 2, animation: { name: 'fadeIn', duration: 520, delay: 420 + i * 130 } }
    )) as any,
    { id: 'nav-waypoint', type: 'shape', shapeKind: 'circle', x: 484, y: 626, width: 34, height: 34, border: { color: { $t: 'colors.primary' }, width: 2, style: 'solid' }, opacity: 0.75, zIndex: 3, shadow: { color: { $t: 'colors.accent' }, blur: 18, offsetX: 0, offsetY: 0 }, animation: { name: 'pulse', duration: 2600, iterationCount: 'infinite', easing: 'ease-in-out' } },
    { id: 'nav-label', type: 'text', content: 'WAYPOINT KOI-452B · 0.28c', fontFamily: 'Courier New, monospace', fontSize: 16, fontWeight: '700', color: { $t: 'colors.primary' }, letterSpacing: 1, x: 530, y: 610, width: 330, height: 24, opacity: 0.8, zIndex: 3, editable: { content: true } },
    { id: 'warp-status', type: 'text', content: 'LIGHTSPEED PROPULSION ENGAGED · BEYOND KNOWN REALM', fontFamily: 'Courier New, monospace', fontSize: 18, fontWeight: '400', color: '#94A3B8', letterSpacing: 2, x: 100, y: 812, width: 800, height: 36, zIndex: 2, editable: { content: true, position: true } },
    { id: 'stardate-note', type: 'text', content: '星历 2387.04 // 越过这条航线的飞船，都没有回来写过日志', fontFamily: 'Helvetica, Arial, sans-serif', fontSize: 20, color: { $t: 'colors.accent' }, letterSpacing: 1, x: 100, y: 866, width: 800, height: 30, opacity: 0.9, zIndex: 3, animation: { name: 'fadeInUp', duration: 800, delay: 640 }, editable: { content: true } }
  ]
},
{
  id: 'scifi-monolith-portal', name: '时空奇点石碑', version: '1.1.0', category: 'scifi',
  tags: ['scifi', 'portal', 'monolith', 'abstract'],
  thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%2309090B"/><circle cx="50" cy="50" r="36" fill="%2338BDF8" opacity="0.08"/><circle cx="50" cy="50" r="22" fill="%2338BDF8" opacity="0.1"/><g fill="none" stroke="%2338BDF8"><circle cx="50" cy="50" r="46" stroke-width="0.6" opacity="0.2" stroke-dasharray="3 3"/><circle cx="50" cy="50" r="37" stroke-width="0.6" opacity="0.28"/><circle cx="50" cy="50" r="28" stroke-width="0.7" opacity="0.35" stroke-dasharray="2 3"/><circle cx="50" cy="50" r="19" stroke-width="0.8" opacity="0.5"/></g><rect x="37" y="13" width="26" height="72" fill="%2338BDF8" opacity="0.12"/><rect x="42" y="16" width="16" height="66" fill="%2338BDF8" opacity="0.9"/><rect x="48.4" y="18" width="3.2" height="62" fill="%23FFFFFF"/><ellipse cx="50" cy="49" rx="26" ry="4.6" fill="none" stroke="%2338BDF8" stroke-width="1.1" opacity="0.7"/><ellipse cx="50" cy="49" rx="16" ry="3" fill="none" stroke="%23E2E8F0" stroke-width="0.7" opacity="0.45"/><g fill="%23818CF8"><circle cx="24" cy="36" r="1.3" opacity="0.8"/><circle cx="76" cy="62" r="1.1" opacity="0.7"/><circle cx="33" cy="68" r="0.9" opacity="0.6"/></g><g fill="%23FFFFFF"><circle cx="67" cy="30" r="1.1" opacity="0.85"/><circle cx="30" cy="52" r="0.8" opacity="0.6"/><circle cx="70" cy="46" r="0.9" opacity="0.5"/></g><rect x="14" y="85" width="72" height="0.9" fill="%2338BDF8" opacity="0.4"/><rect x="43" y="87" width="14" height="6" fill="%2338BDF8" opacity="0.22"/><rect x="45" y="93.5" width="10" height="3" fill="%2338BDF8" opacity="0.13"/><g stroke="%23E2E8F0" stroke-width="0.7" opacity="0.4"><path d="M18 32V68M82 32V68"/><path d="M16 36H20M16 46H20M16 56H20M80 40H84M80 52H84M80 62H84"/></g><rect x="10" y="12" width="21" height="1.6" fill="%2338BDF8" opacity="0.75"/><rect x="70" y="12" width="20" height="1.6" fill="%23E2E8F0" opacity="0.6"/><rect x="24" y="41" width="2" height="18" fill="%23F8FAFC" opacity="0.8"/><rect x="74" y="41" width="2" height="18" fill="%23F8FAFC" opacity="0.8"/><rect x="28" y="95" width="44" height="1.6" fill="%23F8FAFC" opacity="0.5"/></svg>',
  tokens: {
    colors: {
      bg: { label: '背景', default: '#09090B', options: ['#09090B', '#030712', '#111827', '#050E1A'] },
      primary: { label: '主色', default: '#FFFFFF', options: ['#FFFFFF', '#F8FAFC', '#E2E8F0', '#FAFAFA'] },
      accent: { label: '光柱', default: '#38BDF8', options: ['#38BDF8', '#0EA5E9', '#06B6D4', '#A78BFA', '#F59E0B'] }
    },
    fonts: { heading: { label: '标题字体', default: 'Helvetica, Arial, sans-serif', options: ['Helvetica, Arial, sans-serif', 'Impact, sans-serif', 'Courier New, monospace'] } }
  },
  presets: [
    { name: '奇点蓝光', colors: { bg: '#09090B', primary: '#FFFFFF', accent: '#38BDF8' } },
    { name: '量子紫域', colors: { bg: '#050E1A', primary: '#E2E8F0', accent: '#A78BFA' } },
    { name: '熔金之门', colors: { bg: '#111827', primary: '#FAFAFA', accent: '#F59E0B' } },
    { name: '深渊青碧', colors: { bg: '#030712', primary: '#F8FAFC', accent: '#06B6D4' } }
  ],
  canvas: { virtualWidth: 1000, virtualHeight: 1000, defaultWidth: 1000, defaultHeight: 1000, backgroundColor: { $t: 'colors.bg' } },
  elements: [
    // ── 奇点外溢：大范围柔光 + 四层同心圆环（两环带慢转）
    { id: 'portal-aura', type: 'shape', shapeKind: 'circle', x: 110, y: 110, width: 780, height: 780, fill: { $t: 'colors.accent' }, opacity: 0.07, zIndex: 1, shadow: { color: { $t: 'colors.accent' }, blur: 140, offsetX: 0, offsetY: 0 }, animation: { name: 'pulse', duration: 7200, iterationCount: 'infinite', easing: 'ease-in-out' } },
    { id: 'portal-ring-1', group: 'portal-ring-', type: 'shape', shapeKind: 'circle', x: 300, y: 300, width: 400, height: 400, border: { color: { $t: 'colors.primary' }, width: 1.5, style: 'solid' }, opacity: 0.3, zIndex: 1 },
    { id: 'portal-ring-2', group: 'portal-ring-', type: 'shape', shapeKind: 'circle', x: 211, y: 211, width: 578, height: 578, border: { color: { $t: 'colors.accent' }, width: 2, style: 'dashed' }, opacity: 0.3, zIndex: 1, animation: { name: 'spinSlow', duration: 26000, iterationCount: 'infinite', easing: 'linear' } },
    { id: 'portal-ring-3', group: 'portal-ring-', type: 'shape', shapeKind: 'circle', x: 132, y: 132, width: 736, height: 736, border: { color: { $t: 'colors.primary' }, width: 1, style: 'solid' }, opacity: 0.16, zIndex: 1 },
    { id: 'portal-ring-4', group: 'portal-ring-', type: 'shape', shapeKind: 'circle', x: 62, y: 62, width: 876, height: 876, border: { color: { $t: 'colors.accent' }, width: 1.5, style: 'dashed' }, opacity: 0.14, zIndex: 1, animation: { name: 'spinSlow', duration: 48000, iterationCount: 'infinite', easing: 'linear' } },
    { id: 'halo-glow', type: 'shape', shapeKind: 'circle', x: 400, y: 90, width: 200, height: 200, fill: { $t: 'colors.accent' }, opacity: 0.2, zIndex: 2, animation: { name: 'ripple', duration: 3000, iterationCount: 'infinite' } },
    // ── 星尘：绕石碑椭圆轨道，前层亮、后层暗
    ...Array.from({ length: 8 }, (_, i) => {
      const a = (i * 45 + 22) * Math.PI / 180, rx = 250 + (i % 3) * 62, ry = 150 + (i % 2) * 52, s = 4 + (i % 4) * 2
      return { id: `stardust-${i}`, type: 'shape', shapeKind: 'circle', x: 500 + Math.cos(a) * rx - s / 2, y: 500 + Math.sin(a) * ry - s / 2, width: s, height: s, fill: { $t: i % 3 === 0 ? 'colors.primary' : 'colors.accent' }, opacity: i % 3 === 0 ? 0.9 : 0.55, zIndex: i % 3 === 0 ? 6 : 2, shadow: { color: { $t: i % 3 === 0 ? 'colors.primary' : 'colors.accent' }, blur: 14, offsetX: 0, offsetY: 0 }, animation: { name: 'twinkle', duration: 2200 + i * 340, delay: i * 220, iterationCount: 'infinite', easing: 'ease-in-out' } }
    }) as any,
    // ── 地平线环：后半圈压在石碑后、前半圈盖住石碑
    { id: 'horizon-arc-back', type: 'shape', shapeKind: 'circle', x: 330, y: 470, width: 340, height: 60, border: { color: { $t: 'colors.primary' }, width: 1.5, style: 'solid' }, opacity: 0.35, zIndex: 2 },
    { id: 'pillar-glow-outer', type: 'shape', shapeKind: 'rect', x: 366, y: 118, width: 268, height: 764, fill: { $t: 'colors.accent' }, opacity: 0.1, zIndex: 2, shadow: { color: { $t: 'colors.accent' }, blur: 72, offsetX: 0, offsetY: 0 } },
    { id: 'monolith-pillar', type: 'shape', shapeKind: 'rect', x: 430, y: 150, width: 140, height: 700, fill: { $t: 'colors.accent' }, zIndex: 3, shadow: { color: { $t: 'colors.accent' }, blur: 40, offsetX: 0, offsetY: 0 }, animation: { name: 'glow', duration: 2500, iterationCount: 'infinite' }, editable: { color: { type: 'palette', options: ['#38BDF8', '#0EA5E9', '#06B6D4', '#22D3EE', '#A78BFA'] } } },
    { id: 'horizon-arc-front', type: 'shape', shapeKind: 'circle', x: 220, y: 452, width: 560, height: 96, border: { color: { $t: 'colors.accent' }, width: 2.5, style: 'solid' }, opacity: 0.6, zIndex: 4, shadow: { color: { $t: 'colors.accent' }, blur: 26, offsetX: 0, offsetY: 0 } },
    { id: 'pillar-core-slit', type: 'shape', shapeKind: 'rect', x: 488, y: 150, width: 24, height: 700, fill: { $t: 'colors.primary' }, opacity: 0.92, zIndex: 5, shadow: { color: { $t: 'colors.primary' }, blur: 28, offsetX: 0, offsetY: 0 }, animation: { name: 'glow', duration: 3400, iterationCount: 'infinite', easing: 'ease-in-out' } },
    // ── 两侧竖刻度 + 石碑两翼读数
    { id: 'gauge-left', type: 'overlay', background: 'repeating-linear-gradient(0deg, rgba(226,232,240,0.55) 0px, rgba(226,232,240,0.55) 2px, rgba(0,0,0,0) 2px, rgba(0,0,0,0) 34px)', x: 118, y: 300, width: 18, height: 400, opacity: 0.35, zIndex: 2 },
    { id: 'gauge-right', type: 'overlay', background: 'repeating-linear-gradient(0deg, rgba(226,232,240,0.5) 0px, rgba(226,232,240,0.5) 2px, rgba(0,0,0,0) 2px, rgba(0,0,0,0) 46px)', x: 864, y: 300, width: 18, height: 400, opacity: 0.3, zIndex: 2 },
    { id: 'scifi-meta-left', type: 'text', content: 'EVENT HORIZON', fontFamily: { $t: 'fonts.heading' }, fontSize: 36, fontWeight: '900', color: { $t: 'colors.primary' }, rotation: 270, x: 180, y: 480, width: 400, height: 50, zIndex: 3, animation: { name: 'slideInLeft', duration: 900, delay: 300 }, editable: { content: true, position: true } },
    { id: 'scifi-meta-right', type: 'text', content: 'T-MINUS ZERO', fontFamily: { $t: 'fonts.heading' }, fontSize: 36, fontWeight: '900', color: { $t: 'colors.primary' }, rotation: 90, x: 440, y: 480, width: 400, height: 50, zIndex: 3, animation: { name: 'slideInRight', duration: 900, delay: 520 }, editable: { content: true } },
    { id: 'note-mass', type: 'text', content: 'SCHWARZSCHILD RADIUS = 11.8 KM', fontFamily: 'Courier New, monospace', fontSize: 16, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 1, x: 96, y: 116, width: 360, height: 24, opacity: 0.9, zIndex: 4, animation: { name: 'fadeIn', duration: 600, delay: 640 }, editable: { content: true } },
    { id: 'note-lensing', type: 'text', content: 'T-MINUS 00:00:03.2 · LENSING 12x', fontFamily: 'Courier New, monospace', fontSize: 16, textAlign: 'right', fontWeight: '700', color: { $t: 'colors.primary' }, letterSpacing: 1, x: 500, y: 116, width: 400, height: 24, opacity: 0.75, zIndex: 4, animation: { name: 'fadeIn', duration: 600, delay: 780 }, editable: { content: true } },
    // ── 地面：基准线 + 石碑倒影两段 + 中文脚注
    { id: 'floor-line', type: 'shape', shapeKind: 'rect', x: 120, y: 852, width: 760, height: 2, fill: { $t: 'colors.accent' }, opacity: 0.4, zIndex: 2, animation: { name: 'slideInLeft', duration: 700, delay: 200 } },
    { id: 'reflection-near', type: 'shape', shapeKind: 'rect', x: 432, y: 858, width: 136, height: 56, fill: { $t: 'colors.accent' }, opacity: 0.2, zIndex: 2, borderRadius: 2 },
    { id: 'reflection-far', type: 'shape', shapeKind: 'rect', x: 452, y: 920, width: 96, height: 28, fill: { $t: 'colors.accent' }, opacity: 0.11, zIndex: 2, borderRadius: 2 },
    { id: 'floor-caption', type: 'text', content: '奇点没有吞掉任何东西，它只是把远处的时间慢慢拉到这里', fontFamily: 'Helvetica, Arial, sans-serif', fontSize: 20, color: { $t: 'colors.primary' }, textAlign: 'center', letterSpacing: 1, x: 100, y: 958, width: 800, height: 30, opacity: 0.72, zIndex: 4, animation: { name: 'fadeInUp', duration: 800, delay: 900 }, editable: { content: true } }
  ]
}
]

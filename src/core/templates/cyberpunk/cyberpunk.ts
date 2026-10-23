// src/core/templates/cyberpunk/cyberpunk.ts
import type { Template } from '@/types/types'
export const cyberpunkTemplates: Template[] = [
{
  id: 'cyberpunk-neon-night', name: '霓虹夜煞高反差', version: '1.1.0', category: 'cyberpunk', tags: ['cyberpunk', 'neon', 'glitch', 'synthwave', 'night'],
  thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><defs><linearGradient id="nnbg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="%230B001A"/><stop offset="100%" stop-color="%23240046"/></linearGradient></defs><rect width="100" height="100" fill="url(%23nnbg)"/><ellipse cx="50" cy="72" rx="44" ry="14" fill="%2300FFCC" opacity="0.16"/><rect x="8" y="8" width="84" height="84" fill="none" stroke="%2300FFCC" stroke-width="1.3"/><rect x="11" y="11" width="78" height="78" fill="none" stroke="%23FF007F" stroke-width="0.6" opacity="0.6"/><rect x="12" y="14" width="27" height="5" fill="%2300FFCC"/><rect x="66" y="14" width="22" height="2" fill="%23EAF6FF" opacity="0.5"/><rect x="12" y="29" width="44" height="7" fill="%2300FFCC" opacity="0.55"/><rect x="11" y="28" width="44" height="7" fill="%23FF007F" opacity="0.55"/><rect x="13" y="27" width="44" height="8" fill="%23FF007F"/><rect x="13" y="37" width="52" height="8" fill="%23FF007F"/><rect x="13" y="49" width="70" height="1.6" fill="%23FF007F" opacity="0.7"/><rect x="13" y="53" width="52" height="1.6" fill="%2300FFCC" opacity="0.8"/><g fill="%2307001A" stroke="%23FF007F" stroke-width="0.7"><rect x="12" y="62" width="12" height="20"/><rect x="26" y="70" width="15" height="12"/><rect x="44" y="57" width="10" height="25"/><rect x="57" y="66" width="16" height="16"/><rect x="76" y="74" width="12" height="8"/></g><g fill="%2300FFCC"><rect x="14" y="65" width="8" height="1.8"/><rect x="29" y="73" width="9" height="1.8"/><rect x="46" y="60" width="6" height="1.8"/><rect x="59" y="69" width="11" height="1.8"/></g><rect x="83" y="70" width="8" height="12" fill="none" stroke="%2300FFCC" stroke-width="1"/><g fill="%23FF007F" opacity="0.5"><rect x="20" y="85" width="46" height="1.4"/><rect x="29" y="87.5" width="30" height="1.4" fill="%2300FFCC"/><rect x="38" y="90" width="14" height="1.4"/></g><g stroke="%23A5F3FC" stroke-width="0.5" opacity="0.3"><path d="M14 0 L2 100"/><path d="M38 0 L26 100"/><path d="M62 0 L50 100"/><path d="M86 0 L74 100"/><path d="M106 0 L94 100"/></g></svg>',
  tokens: {
    colors: {
      bg: { label: '背景', default: '#0B001A', options: ['#0B001A', '#0F0024', '#1A0033', '#030712', '#08001f'] },
      primary: { label: '霓虹粉', default: '#FF007F', options: ['#FF007F', '#FF0055', '#E11D48', '#38BDF8', '#F472B6'] },
      accent: { label: '霓虹青', default: '#00FFCC', options: ['#00FFCC', '#00F0FF', '#22D3EE', '#FFE600', '#A5F3FC'] }
    },
    fonts: { heading: { label: '标题字体', default: 'Impact, Helvetica, sans-serif', options: ['Impact, Helvetica, sans-serif', 'Courier New, monospace', 'system-ui'] } }
  },
  presets: [
    { name: '夜煞粉青', colors: { bg: '#0B001A', primary: '#FF007F', accent: '#00FFCC' } },
    { name: '血刃黄警', colors: { bg: '#0F0024', primary: '#FF0055', accent: '#FFE600' } },
    { name: '冰蓝电路', colors: { bg: '#030712', primary: '#38BDF8', accent: '#A5F3FC' } },
    { name: '紫电 synth', colors: { bg: '#08001f', primary: '#F472B6', accent: '#22D3EE' } }
  ],
  canvas: { virtualWidth: 1000, virtualHeight: 1000, defaultWidth: 1000, defaultHeight: 1000, backgroundColor: { $t: 'colors.bg' }, backgroundImage: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000"><defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="%230B001A"/><stop offset="100%" stop-color="%23240046"/></linearGradient></defs><rect width="1000" height="1000" fill="url(%23bg)"/></svg>' },
  elements: [
    // ── 氛围层：CRT 扫描线 · 酸雨斜丝 · 地平线霓虹雾
    { id: 'scanline-overlay', type: 'overlay', background: 'repeating-linear-gradient(0deg, rgba(205,255,250,0.06) 0px, rgba(205,255,250,0.06) 1px, rgba(0,0,0,0) 1px, rgba(0,0,0,0) 4px)', mixBlendMode: 'screen', x: 0, y: 0, width: 1000, height: 1000, zIndex: 1 },
    { id: 'rain-veil', type: 'overlay', background: 'repeating-linear-gradient(104deg, rgba(226,255,255,0.075) 0px, rgba(226,255,255,0.075) 1px, rgba(0,0,0,0) 1px, rgba(0,0,0,0) 24px), repeating-linear-gradient(104deg, rgba(255,130,190,0.06) 0px, rgba(255,130,190,0.06) 2px, rgba(0,0,0,0) 2px, rgba(0,0,0,0) 71px)', mixBlendMode: 'screen', x: -80, y: -80, width: 1160, height: 1160, opacity: 0.9, zIndex: 1 },
    { id: 'ground-haze', type: 'shape', shapeKind: 'circle', x: 40, y: 606, width: 920, height: 380, fill: { $t: 'colors.accent' }, opacity: 0.12, zIndex: 1, shadow: { color: { $t: 'colors.accent' }, blur: 96, offsetX: 0, offsetY: 0 }, animation: { name: 'glow', duration: 5200, iterationCount: 'infinite', easing: 'ease-in-out' } },
    // ── 霓虹灯管双描边：外管粗、内管细，加右上角刻度尺
    { id: 'neon-rect', type: 'shape', shapeKind: 'rect', x: 80, y: 80, width: 840, height: 840, border: { color: { $t: 'colors.accent' }, width: 3, style: 'solid' }, shadow: { color: { $t: 'colors.accent' }, blur: 22, offsetX: 0, offsetY: 0 }, zIndex: 2, animation: { name: 'glow', duration: 1500, iterationCount: 'infinite' } },
    { id: 'neon-rect-inner', type: 'shape', shapeKind: 'rect', x: 96, y: 96, width: 808, height: 808, border: { color: { $t: 'colors.primary' }, width: 1.5, style: 'solid' }, shadow: { color: { $t: 'colors.primary' }, blur: 16, offsetX: 0, offsetY: 0 }, opacity: 0.5, zIndex: 2 },
    { id: 'ruler-strip', type: 'overlay', background: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.5) 0px, rgba(255,255,255,0.5) 2px, rgba(0,0,0,0) 2px, rgba(0,0,0,0) 20px)', x: 430, y: 130, width: 490, height: 16, opacity: 0.42, zIndex: 2 },
    // ── 高压警示条：灯管底 + 斜纹 + 黑字
    { id: 'warning-banner', type: 'shape', shapeKind: 'rect', x: 80, y: 120, width: 320, height: 40, fill: { $t: 'colors.accent' }, shadow: { color: { $t: 'colors.accent' }, blur: 24, offsetX: 0, offsetY: 0 }, zIndex: 3, animation: { name: 'slideInLeft', duration: 520, delay: 180 }},
    { id: 'warning-hazard', type: 'overlay', background: 'repeating-linear-gradient(125deg, rgba(0,0,0,0.5) 0px, rgba(0,0,0,0.5) 8px, rgba(0,0,0,0) 8px, rgba(0,0,0,0) 20px)', x: 80, y: 120, width: 320, height: 40, opacity: 0.75, zIndex: 4 },
    { id: 'warning-text', type: 'text', content: '/// HIGH VOLTAGE 3.2kV ///', fontFamily: 'Courier New, monospace', fontSize: 16, fontWeight: '900', color: { $t: 'colors.bg' }, letterSpacing: 1, x: 92, y: 132, width: 300, height: 22, zIndex: 5, animation: { name: 'fadeIn', duration: 400, delay: 380 }, editable: { content: true } },
    // ── 标题霓虹灯管三层：光晕底 · 青/粉错位描边 · 顶层实字
    { id: 'title-halo', type: 'text', content: 'NEO CITY\nOVERLOAD', fontFamily: { $t: 'fonts.heading' }, fontSize: 88, fontWeight: '900', color: { $t: 'colors.accent' }, lineHeight: 1.05, letterSpacing: 2, textAlign: 'left', x: 120, y: 280, width: 760, height: 220, opacity: 0.45, zIndex: 3, shadow: { color: { $t: 'colors.accent' }, blur: 60, offsetX: 0, offsetY: 0 } },
    { id: 'title-echo-cyan', type: 'text', content: 'NEO CITY\nOVERLOAD', fontFamily: { $t: 'fonts.heading' }, fontSize: 88, fontWeight: '900', color: { $t: 'colors.accent' }, lineHeight: 1.05, letterSpacing: 2, x: 132, y: 284, width: 760, height: 220, opacity: 0.72, zIndex: 4 },
    { id: 'title-echo-pink', type: 'text', content: 'NEO CITY\nOVERLOAD', fontFamily: { $t: 'fonts.heading' }, fontSize: 88, fontWeight: '900', color: { $t: 'colors.primary' }, lineHeight: 1.05, letterSpacing: 2, x: 108, y: 276, width: 760, height: 220, opacity: 0.6, zIndex: 4 },
    { id: 'glitch-line', type: 'shape', shapeKind: 'line', x: 120, y: 520, width: 760, height: 3, fill: { $t: 'colors.primary' }, opacity: 0.6, zIndex: 4, animation: { name: 'drift', duration: 3000, iterationCount: 'infinite', easing: 'ease-in-out' } },
    { id: 'main-cyber-title', type: 'text', content: 'NEO CITY\nOVERLOAD', fontFamily: { $t: 'fonts.heading' }, fontSize: 88, fontWeight: '900', color: { $t: 'colors.primary' }, lineHeight: 1.05, letterSpacing: 2, x: 120, y: 280, width: 760, height: 220, zIndex: 5, shadow: { color: { $t: 'colors.primary' }, blur: 30, offsetX: 0, offsetY: 0 }, animation: { name: 'glow', duration: 1800, iterationCount: 'infinite', easing: 'ease-in-out' }, editable: { content: true, fontSize: { type: 'range', min: 64, max: 120 }, position: true } },
    { id: 'cyan-sub', type: 'text', content: 'CYBERNETIC PROTOCOLS · NEURAL LINK 12 TB · SECTOR 07', fontFamily: 'Courier New, monospace', fontSize: 21, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 1, x: 120, y: 540, width: 760, height: 34, zIndex: 5, animation: { name: 'fadeInUp', duration: 600, delay: 700 }, editable: { content: true } },
    { id: 'sys-line', type: 'text', content: '新九龙寨 · 第 7 区 // 今夜有酸雨，灯管电压不稳，请勿触碰外墙', fontFamily: 'system-ui', fontSize: 18, color: { $t: 'colors.primary' }, letterSpacing: 1, x: 120, y: 582, width: 760, height: 26, opacity: 0.78, zIndex: 5, animation: { name: 'fadeIn', duration: 700, delay: 900 }, editable: { content: true } },
    // ── 底部城市剪影：5 栋霓虹轮廓楼 + 4 条楼顶灯带
    ...Array.from({ length: 5 }, (_, i) => {
      const [bx, bw, bh] = [[120, 112, 150], [238, 140, 96], [386, 94, 192], [540, 152, 124], [700, 124, 68]][i]
      return { id: `city-block-${i}`, type: 'shape', shapeKind: 'rect', x: bx, y: 870 - bh, width: bw, height: bh, fill: { $t: 'colors.bg' }, border: { width: 2, style: 'solid', color: i % 2 ? { $t: 'colors.primary' } : { $t: 'colors.accent' } }, opacity: 0.96, zIndex: 3, animation: { name: 'rise', duration: 700, delay: 260 + i * 110 } }
    }) as any,
    ...Array.from({ length: 4 }, (_, i) => {
      const [bx, bw, bh] = [[120, 112, 150], [238, 140, 96], [386, 94, 192], [540, 152, 124]][i]
      return { id: `city-lights-${i}`, type: 'shape', shapeKind: 'rect', x: bx + 14, y: 882 - bh, width: bw - 28, height: 7, fill: { $t: i % 2 ? 'colors.primary' : 'colors.accent' }, borderRadius: 2, zIndex: 4, shadow: { color: { $t: i % 2 ? 'colors.primary' : 'colors.accent' }, blur: 14, offsetX: 0, offsetY: 0 }, animation: { name: 'twinkle', duration: 2600 + i * 420, delay: i * 260, iterationCount: 'infinite' } }
    }) as any,
    // ── 巷口竖式招牌 + 湿地反光三条
    { id: 'sign-board', type: 'shape', shapeKind: 'rect', x: 832, y: 692, width: 68, height: 178, fill: { $t: 'colors.bg' }, border: { width: 3, style: 'solid', color: { $t: 'colors.accent' } }, shadow: { color: { $t: 'colors.accent' }, blur: 26, offsetX: 0, offsetY: 0 }, opacity: 0.96, zIndex: 3, animation: { name: 'glow', duration: 2600, iterationCount: 'infinite', easing: 'ease-in-out' } },
    { id: 'sign-text', type: 'text', content: '合成\n拉面', fontFamily: 'system-ui', fontSize: 28, fontWeight: '900', color: { $t: 'colors.accent' }, textAlign: 'center', lineHeight: 1.7, x: 834, y: 728, width: 64, height: 96, zIndex: 5, shadow: { color: { $t: 'colors.accent' }, blur: 18, offsetX: 0, offsetY: 0 }, editable: { content: true } },
    ...Array.from({ length: 3 }, (_, i) => {
      const [rx, rw, ro] = [[200, 580, 0.34], [286, 420, 0.22], [370, 250, 0.13]][i]
      return { id: `street-reflection-${i}`, type: 'shape', shapeKind: 'rect', x: rx, y: 884 + i * 12, width: rw, height: 7 - i, fill: { $t: i === 1 ? 'colors.accent' : 'colors.primary' }, borderRadius: 4, opacity: ro, zIndex: 3, animation: { name: 'shimmer', duration: 3200 + i * 700, iterationCount: 'infinite', easing: 'ease-in-out' } }
    }) as any
  ]
},
{
  id: 'cyberpunk-matrix-hud', name: '机甲HUD终端', version: '1.1.0', category: 'cyberpunk', tags: ['cyberpunk', 'hud', 'terminal', 'mecha'],
  thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23030712"/><g stroke="%2322C55E" stroke-width="0.4" opacity="0.16" fill="none"><path d="M0 20H100M0 40H100M0 60H100M0 80H100M20 0V100M40 0V100M60 0V100M80 0V100"/></g><rect x="5" y="5" width="12" height="12" fill="none" stroke="%2322C55E" stroke-width="1"/><rect x="83" y="83" width="12" height="12" fill="none" stroke="%2386EFAC" stroke-width="1"/><circle cx="50" cy="50" r="25" fill="none" stroke="%2322C55E" stroke-width="1" stroke-dasharray="4 3"/><circle cx="50" cy="50" r="18" fill="none" stroke="%2386EFAC" stroke-width="0.5" stroke-dasharray="2 2" opacity="0.7"/><circle cx="50" cy="50" r="8.6" fill="none" stroke="%2322C55E" stroke-width="0.6" opacity="0.6"/><path d="M25 50H75M50 25V75" stroke="%2322C55E" stroke-width="0.4" opacity="0.45"/><g fill="%2322C55E"><rect x="49.3" y="20.6" width="1.4" height="5"/><rect x="49.3" y="74.4" width="1.4" height="5"/><rect x="70.6" y="36.4" width="1.4" height="4" transform="rotate(60 71.3 38.4)"/><rect x="70.6" y="59.6" width="1.4" height="4" transform="rotate(-60 71.3 61.6)"/><rect x="28" y="36.4" width="1.4" height="4" transform="rotate(60 28.7 38.4)"/><rect x="28" y="59.6" width="1.4" height="4" transform="rotate(-60 28.7 61.6)"/></g><circle cx="61" cy="37" r="1.8" fill="%2386EFAC"/><circle cx="40" cy="61" r="1.4" fill="%2322C55E"/><rect x="9" y="26" width="16" height="19" fill="%2386EFAC" opacity="0.28"/><rect x="75" y="26" width="16" height="19" fill="%2322C55E" opacity="0.28"/><rect x="30" y="45" width="40" height="5" fill="%2386EFAC" opacity="0.55"/><rect x="29" y="51" width="42" height="6" fill="%23FFFFFF"/><rect x="9" y="69" width="27" height="3" fill="%2322C55E" opacity="0.5"/><g stroke="%2386EFAC" stroke-width="0.6" opacity="0.45" fill="none"><path d="M9 93.6H78"/></g><g stroke="%2386EFAC" stroke-width="1.2" opacity="0.5"><path d="M10 92V96M22 92V96M34 92V96M46 92V96M58 92V96M70 92V96"/></g></svg>',
  tokens: {
    colors: {
      bg: { label: '背景', default: '#030712', options: ['#030712', '#0A0F1E', '#111827', '#050E1A', '#1A1204'] },
      primary: { label: 'HUD绿', default: '#22C55E', options: ['#22C55E', '#10B981', '#4ADE80', '#38BDF8', '#F59E0B'] },
      accent: { label: '辅色', default: '#86EFAC', options: ['#86EFAC', '#6EE7B7', '#A7F3D0', '#7DD3FC', '#FCD34D'] }
    },
    fonts: { heading: { label: '标题字体', default: 'Helvetica, Arial, sans-serif', options: ['Helvetica, Arial, sans-serif', 'Courier New, monospace', 'system-ui'] } }
  },
  presets: [
    { name: '机甲战术绿', colors: { bg: '#030712', primary: '#22C55E', accent: '#86EFAC' } },
    { name: '深海阿凡达', colors: { bg: '#050E1A', primary: '#38BDF8', accent: '#7DD3FC' } },
    { name: '琥珀警报', colors: { bg: '#1A1204', primary: '#F59E0B', accent: '#FCD34D' } },
    { name: '翡翠夜航', colors: { bg: '#0A0F1E', primary: '#10B981', accent: '#6EE7B7' } }
  ],
  canvas: { virtualWidth: 1000, virtualHeight: 1000, defaultWidth: 1000, defaultHeight: 1000, backgroundColor: { $t: 'colors.bg' } },
  elements: [
    // ── 氛围层：座舱栅格 + 静态扫描线（一条 overlay 叠两组 repeating-gradient）
    { id: 'hud-mesh', type: 'overlay', background: 'repeating-linear-gradient(0deg, rgba(190,255,215,0.05) 0px, rgba(190,255,215,0.05) 1px, rgba(0,0,0,0) 1px, rgba(0,0,0,0) 50px), repeating-linear-gradient(90deg, rgba(190,255,215,0.05) 0px, rgba(190,255,215,0.05) 1px, rgba(0,0,0,0) 1px, rgba(0,0,0,0) 50px), repeating-linear-gradient(0deg, rgba(190,255,215,0.045) 0px, rgba(190,255,215,0.045) 1px, rgba(0,0,0,0) 1px, rgba(0,0,0,0) 4px)', x: 0, y: 0, width: 1000, height: 1000, opacity: 0.9, zIndex: 1 },
    // ── 雷达刻度环：外环（模板原生）+ 中环 + 内环 + 十字准线 + 六枚刻度钉
    { id: 'radar-circle', type: 'shape', shapeKind: 'circle', x: 250, y: 250, width: 500, height: 500, border: { color: { $t: 'colors.primary' }, width: 2, style: 'dashed' }, zIndex: 1, animation: { name: 'pulse', duration: 2600, iterationCount: 'infinite', easing: 'ease-in-out' }, editable: { position: true } },
    { id: 'radar-sweep', type: 'shape', shapeKind: 'circle', x: 480, y: 250, width: 20, height: 500, fill: { $t: 'colors.primary' }, opacity: 0.35, zIndex: 1, animation: { name: 'spinSlow', duration: 4000, iterationCount: 'infinite', easing: 'linear' } },
    { id: 'hud-ring-mid', type: 'shape', shapeKind: 'circle', x: 320, y: 320, width: 360, height: 360, border: { color: { $t: 'colors.accent' }, width: 1.5, style: 'dashed' }, opacity: 0.45, zIndex: 1, animation: { name: 'spinSlow', duration: 19000, iterationCount: 'infinite', easing: 'linear' } },
    { id: 'hud-ring-inner', type: 'shape', shapeKind: 'circle', x: 412, y: 412, width: 176, height: 176, border: { color: { $t: 'colors.primary' }, width: 2, style: 'solid' }, opacity: 0.4, zIndex: 1, shadow: { color: { $t: 'colors.primary' }, blur: 16, offsetX: 0, offsetY: 0 } },
    { id: 'hud-cross-h', type: 'shape', shapeKind: 'rect', x: 250, y: 499, width: 500, height: 1.5, fill: { $t: 'colors.primary' }, opacity: 0.3, zIndex: 1 },
    { id: 'hud-cross-v', type: 'shape', shapeKind: 'rect', x: 499, y: 250, width: 1.5, height: 500, fill: { $t: 'colors.primary' }, opacity: 0.3, zIndex: 1 },
    ...Array.from({ length: 6 }, (_, i) => {
      const rad = (i * 60 - 90) * Math.PI / 180, major = i % 3 === 0
      const cx = 500 + Math.cos(rad) * 264, cy = 500 + Math.sin(rad) * 264, len = major ? 30 : 16
      return { id: `hud-tick-${i}`, type: 'shape', shapeKind: 'rect', x: cx - 2.5, y: cy - len / 2, width: 5, height: len, rotation: i * 60, fill: { $t: major ? 'colors.primary' : 'colors.accent' }, opacity: major ? 0.9 : 0.5, zIndex: 2, shadow: { color: { $t: 'colors.primary' }, blur: 10, offsetX: 0, offsetY: 0 } }
    }) as any,
    { id: 'hud-blip-0', type: 'shape', shapeKind: 'circle', x: 604, y: 366, width: 15, height: 15, fill: { $t: 'colors.accent' }, zIndex: 2, shadow: { color: { $t: 'colors.accent' }, blur: 18, offsetX: 0, offsetY: 0 }, animation: { name: 'twinkle', duration: 1900, iterationCount: 'infinite', easing: 'ease-in-out' } },
    { id: 'hud-blip-1', type: 'shape', shapeKind: 'circle', x: 392, y: 600, width: 11, height: 11, fill: { $t: 'colors.primary' }, zIndex: 2, shadow: { color: { $t: 'colors.primary' }, blur: 16, offsetX: 0, offsetY: 0 }, animation: { name: 'twinkle', duration: 2500, delay: 600, iterationCount: 'infinite', easing: 'ease-in-out' } },
    { id: 'hud-scan-bar', type: 'shape', shapeKind: 'rect', x: 60, y: 208, width: 880, height: 2, fill: { $t: 'colors.accent' }, opacity: 0.34, zIndex: 2, shadow: { color: { $t: 'colors.accent' }, blur: 12, offsetX: 0, offsetY: 0 }, animation: { name: 'float', duration: 4600, iterationCount: 'infinite', easing: 'ease-in-out' } },
    { id: 'hud-ruler', type: 'overlay', background: 'repeating-linear-gradient(90deg, rgba(190,255,215,0.55) 0px, rgba(190,255,215,0.55) 2px, rgba(0,0,0,0) 2px, rgba(0,0,0,0) 46px)', x: 60, y: 934, width: 720, height: 18, opacity: 0.4, zIndex: 2 },
    // ── 两侧数据流竖列（12 行十六进制遥测 / 12 行卫星定位参数）
    { id: 'hud-data-0', type: 'text', content: '0x7F3A ▓▓▓▒░░\n0x7F3B ▓▒░░░░\n0x8C10 ▓▓▓▓▒░\n0x8C11 ▓▓░░░░\n0x9D04 ▓▓▓▒░░\n0x9D05 ▓░░░░░\n0xAE22 ▓▓▓▓▓░\n0xAE23 ▓▓▒░░░\n0xBF08 ▓▓▓░░░\n0xBF09 ▓▓▓▓░░\n0xC0FE ▓▒░░░░\n0xDEAD ▓▓▓▓▓▓', fontFamily: 'Courier New, monospace', fontSize: 16, fontWeight: '700', color: { $t: 'colors.accent' }, lineHeight: 1.72, letterSpacing: 1, x: 62, y: 268, width: 186, height: 336, opacity: 0.8, zIndex: 2, animation: { name: 'fadeIn', duration: 700, delay: 420 }, editable: { content: true } },
    { id: 'hud-data-1', type: 'text', content: 'SYNC   0.0031s\nLAT  35.6895 N\nLON 139.6917 E\nPWR   CELL-04\nARM   VERIFIED\nSAS  DISENGAGED\nGYRO  +0.4 /s\nFUEL    62.8 %\nHULL    98.2 %\nCORE    41.6 C\nRAD   0.22 uSv\nPING      17ms', fontFamily: 'Courier New, monospace', fontSize: 16, textAlign: 'right', color: { $t: 'colors.primary' }, lineHeight: 1.72, letterSpacing: 1, x: 752, y: 268, width: 186, height: 336, opacity: 0.8, zIndex: 2, animation: { name: 'fadeIn', duration: 700, delay: 560 }, editable: { content: true } },
    // ── 角落括号框（左上 / 右下）
    { id: 'hud-corner-tl', type: 'shape', shapeKind: 'rect', x: 44, y: 44, width: 118, height: 118, border: { color: { $t: 'colors.primary' }, width: 3, style: 'solid' }, opacity: 0.5, zIndex: 2, shadow: { color: { $t: 'colors.primary' }, blur: 14, offsetX: 0, offsetY: 0 }, animation: { name: 'zoomIn', duration: 520 } },
    { id: 'hud-corner-br', type: 'shape', shapeKind: 'rect', x: 838, y: 838, width: 118, height: 118, border: { color: { $t: 'colors.accent' }, width: 3, style: 'solid' }, opacity: 0.45, zIndex: 2, shadow: { color: { $t: 'colors.accent' }, blur: 14, offsetX: 0, offsetY: 0 }, animation: { name: 'zoomIn', duration: 520, delay: 160 } },
    // ── 顶部任务条 + RGB 色散三层标题
    { id: 'hud-header', type: 'text', content: '[ TARGET ACQUIRED: SECTOR 7G ]', fontFamily: 'Courier New, monospace', fontSize: 24, fontWeight: '700', color: { $t: 'colors.primary' }, textAlign: 'center', x: 100, y: 120, width: 800, height: 40, zIndex: 3, editable: { content: true, position: true } },
    { id: 'hud-chroma-a', type: 'text', content: 'COMBAT OS\nONLINE', fontFamily: { $t: 'fonts.heading' }, fontSize: 76, fontWeight: '900', color: { $t: 'colors.accent' }, textAlign: 'center', lineHeight: 1.1, x: 92, y: 404, width: 800, height: 200, opacity: 0.62, zIndex: 2 },
    { id: 'hud-chroma-b', type: 'text', content: 'COMBAT OS\nONLINE', fontFamily: { $t: 'fonts.heading' }, fontSize: 76, fontWeight: '900', color: { $t: 'colors.primary' }, textAlign: 'center', lineHeight: 1.1, x: 108, y: 396, width: 800, height: 200, opacity: 0.55, zIndex: 2 },
    { id: 'hud-center-title', type: 'text', content: 'COMBAT OS\nONLINE', fontFamily: { $t: 'fonts.heading' }, fontSize: 76, fontWeight: '900', color: '#FFFFFF', textAlign: 'center', lineHeight: 1.1, x: 100, y: 400, width: 800, height: 200, zIndex: 3, shadow: { color: { $t: 'colors.primary' }, blur: 26, offsetX: 0, offsetY: 0 }, animation: { name: 'zoomIn', duration: 700 }, editable: { content: true, fontSize: { type: 'range', min: 56, max: 96 }, position: true } },
    // ── 警示斜纹条（灯底 + 黑斜纹 + 中文告警）
    { id: 'hud-warn-bar', type: 'shape', shapeKind: 'rect', x: 60, y: 700, width: 300, height: 28, fill: { $t: 'colors.primary' }, opacity: 0.2, border: { color: { $t: 'colors.primary' }, width: 1, style: 'solid' }, zIndex: 3, animation: { name: 'slideInLeft', duration: 520, delay: 700 } },
    { id: 'hud-warn-hazard', type: 'overlay', background: 'repeating-linear-gradient(125deg, rgba(0,0,0,0.5) 0px, rgba(0,0,0,0.5) 7px, rgba(0,0,0,0) 7px, rgba(0,0,0,0) 17px)', x: 60, y: 700, width: 300, height: 28, opacity: 0.7, zIndex: 4 },
    { id: 'hud-warn-txt', type: 'text', content: '▲ 神经负载 91% · 限制器解除', fontFamily: 'system-ui', fontSize: 17, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 0.5, x: 74, y: 705, width: 280, height: 22, zIndex: 5, animation: { name: 'fadeIn', duration: 400, delay: 980 }, editable: { content: true } },
    { id: 'terminal-status', type: 'text', content: 'CORE: 99.8% | SYNC: OPTIMAL | SHIELD: ENGAGED', fontFamily: 'Courier New, monospace', fontSize: 20, fontWeight: '700', color: { $t: 'colors.accent' }, textAlign: 'center', x: 100, y: 820, width: 800, height: 34, zIndex: 3, editable: { content: true, position: true } }
  ]
}
]

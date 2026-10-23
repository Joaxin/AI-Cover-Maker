// src/core/templates/tech/st-02-terminal-green.ts
// 署名系列 st-02 → 归入「科技风」（tech）｜ 终端绿字 Terminal Green（16:9 1920×1080）
// 隐性署名：右下角等宽小字「ST · BUILD 07」+ 右后方 5% 透明度的大水印 ST
import type { Template } from '@/types/types'
import { SANS, HEI, SONG, MONO, SERIF } from '../_fx/trend'

export const st02TerminalGreenTemplates: Template[] = [
  {
    schemaVersion: 1,
    id: 'st-02-terminal-green',
    name: '终端绿字',
    version: '1.0.0',
    category: 'tech',
    tags: ['st', 'tech', 'terminal', 'cli', 'mono', 'phosphor', '16:9'],
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="178" height="100" viewBox="0 0 178 100"><rect x="0" y="0" width="178" height="100" fill="%230A0F0B"/><rect x="12" y="12" width="92" height="76" rx="5" fill="%23111B13" stroke="%233D7A52" stroke-width="1.5"/><circle cx="21" cy="21" r="2" fill="%2386EFAC"/><rect x="28" y="19.5" width="30" height="3" rx="1.5" fill="%2386EFAC" opacity="0.6"/><rect x="18" y="31" width="54" height="3" rx="1.5" fill="%2386EFAC"/><rect x="18" y="39" width="40" height="3" rx="1.5" fill="%2386EFAC" opacity="0.55"/><rect x="18" y="47" width="62" height="3" rx="1.5" fill="%2386EFAC" opacity="0.55"/><rect x="18" y="58" width="68" height="22" rx="3" fill="%233D7A52" opacity="0.3"/><rect x="114" y="34" width="52" height="7" rx="3.5" fill="%23EAFFF0"/><rect x="114" y="50" width="34" height="4" rx="2" fill="%2386EFAC"/></svg>',
    tokens: {
      colors: {
        bg: { label: '终端底色', default: '#0A0F0B', options: ['#0A0F0B', '#120C05', '#070D14', '#12060E'] },
        ink: { label: '磷光字色', default: '#86EFAC', options: ['#86EFAC', '#FFB86B', '#7DD3FC', '#F0ABFC'] },
        accent: { label: '高亮色', default: '#EAFFF0', options: ['#EAFFF0', '#FFE9C4', '#E0F2FE', '#FBE4FF'] },
        accent2: { label: '暗装饰色', default: '#3D7A52', options: ['#3D7A52', '#8A5A22', '#2E5F86', '#8A3B7A'] },
        surface: { label: '窗口面板', default: '#111B13', options: ['#111B13', '#1C130A', '#0E1826', '#1D0F1A'] }
      },
      fonts: {
        latin: { label: '等宽英文', default: MONO, options: [MONO, SANS, SERIF] },
        cjk: { label: '中文', default: HEI, options: [HEI, SONG, MONO] }
      }
    },
    presets: [
      { name: '磷光绿', colors: { bg: '#0A0F0B', ink: '#86EFAC', accent: '#EAFFF0', accent2: '#3D7A52', surface: '#111B13' } },
      { name: '琥珀终端', colors: { bg: '#120C05', ink: '#FFB86B', accent: '#FFE9C4', accent2: '#8A5A22', surface: '#1C130A' } },
      { name: '冰蓝 CLI', colors: { bg: '#070D14', ink: '#7DD3FC', accent: '#E0F2FE', accent2: '#2E5F86', surface: '#0E1826' } },
      { name: '品红调试', colors: { bg: '#12060E', ink: '#F0ABFC', accent: '#FBE4FF', accent2: '#8A3B7A', surface: '#1D0F1A' } }
    ],
    canvas: { virtualWidth: 1920, virtualHeight: 1080, defaultWidth: 1920, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      // ── 底层：CRT 玻璃高光 + 大水印 + 暗角（overlay 才能上渐变） ──
      { id: 'ov-glow', type: 'overlay', x: 0, y: 0, width: 1920, height: 1080, background: 'radial-gradient(760px 520px at 20% 6%, rgba(255,255,255,0.07), transparent 70%)', mixBlendMode: 'screen', zIndex: 1 },
      { id: 'ghost-st-mark', type: 'text', content: 'ST', fontFamily: { $t: 'fonts.latin' }, fontSize: 380, fontWeight: '800', color: { $t: 'colors.accent' }, opacity: 0.05, letterSpacing: 20, x: 1180, y: 540, width: 620, height: 460, zIndex: 2 },
      { id: 'ov-vig', type: 'overlay', x: 0, y: 0, width: 1920, height: 1080, background: 'radial-gradient(1500px 1000px at 50% 46%, transparent 56%, rgba(0,0,0,0.62) 100%)', mixBlendMode: 'multiply', opacity: 0.9, zIndex: 19 },
      // ── 左侧：终端窗口 ──
      { id: 'win-frame', type: 'shape', shapeKind: 'rect', x: 104, y: 96, width: 856, height: 752, fill: { $t: 'colors.surface' }, borderRadius: 18, border: { width: 2, style: 'solid', color: { $t: 'colors.accent2' } }, shadow: { offsetX: 0, offsetY: 24, blur: 60, color: 'rgba(0,0,0,0.55)' }, zIndex: 4, animation: { name: 'fadeIn', duration: 800 } },
      { id: 'win-rule', type: 'shape', shapeKind: 'rect', x: 104, y: 156, width: 856, height: 2, fill: { $t: 'colors.accent2' }, opacity: 0.4, zIndex: 5 },
      { id: 'dot-1', group: 'dot-', type: 'shape', shapeKind: 'circle', x: 128, y: 118, width: 16, height: 16, fill: { $t: 'colors.accent2' }, opacity: 0.9, zIndex: 6 },
      { id: 'dot-2', group: 'dot-', type: 'shape', shapeKind: 'circle', x: 156, y: 118, width: 16, height: 16, fill: { $t: 'colors.accent2' }, opacity: 0.55, zIndex: 6 },
      { id: 'dot-3', group: 'dot-', type: 'shape', shapeKind: 'circle', x: 184, y: 118, width: 16, height: 16, fill: { $t: 'colors.accent2' }, opacity: 0.35, zIndex: 6 },
      { id: 'win-title', type: 'text', content: 'ai-cover — zsh — 96×24', fontFamily: { $t: 'fonts.latin' }, fontSize: 16, fontWeight: '400', color: { $t: 'colors.ink' }, opacity: 0.7, x: 224, y: 112, width: 420, height: 26, zIndex: 6 },
      { id: 'cmd-1', type: 'text', content: '$ npx ai-cover make --style terminal', fontFamily: { $t: 'fonts.latin' }, fontSize: 28, fontWeight: '700', color: { $t: 'colors.ink' }, x: 128, y: 196, width: 704, height: 44, zIndex: 6, shadow: { offsetX: 0, offsetY: 0, blur: 18, color: { $t: 'colors.accent' } }, animation: { name: 'slideInLeft', duration: 600 } },
      { id: 'cmd-c1', type: 'text', content: '# 近黑底 + 磷光绿 + 等宽字，三行配置出一个风格', fontFamily: { $t: 'fonts.cjk' }, fontSize: 28, fontWeight: '400', color: { $t: 'colors.ink' }, opacity: 0.55, x: 128, y: 252, width: 704, height: 44, zIndex: 6 },
      { id: 'cmd-2', type: 'text', content: '> render 1920×1080 … 磷光绿预设已加载', fontFamily: { $t: 'fonts.cjk' }, fontSize: 28, fontWeight: '400', color: { $t: 'colors.ink' }, opacity: 0.85, x: 128, y: 308, width: 704, height: 44, zIndex: 6 },
      { id: 'cmd-3', type: 'text', content: '[✓] 导出完成 cover.png · 用时 3.2s', fontFamily: { $t: 'fonts.cjk' }, fontSize: 28, fontWeight: '400', color: { $t: 'colors.ink' }, opacity: 0.85, x: 128, y: 364, width: 704, height: 44, zIndex: 6 },
      { id: 'cmd-4', type: 'text', content: '$ echo "一行命令，一张封面"', fontFamily: { $t: 'fonts.cjk' }, fontSize: 28, fontWeight: '700', color: { $t: 'colors.ink' }, x: 128, y: 420, width: 704, height: 44, zIndex: 6 },
      { id: 'cursor', type: 'text', content: '█', fontFamily: { $t: 'fonts.latin' }, fontSize: 28, fontWeight: '400', color: { $t: 'colors.accent' }, x: 514, y: 420, width: 24, height: 44, zIndex: 7, shadow: { offsetX: 0, offsetY: 0, blur: 16, color: { $t: 'colors.accent' } }, animation: { name: 'blink', duration: 900, iterationCount: 'infinite', easing: 'linear' } },
      // ── 左窗内：代码块 ──
      { id: 'code-pane', type: 'shape', shapeKind: 'rect', x: 128, y: 548, width: 704, height: 252, fill: { $t: 'colors.accent2' }, opacity: 0.14, borderRadius: 12, zIndex: 5 },
      { id: 'code-c1', type: 'text', content: '// 把一句提示词，跑成一张封面', fontFamily: { $t: 'fonts.cjk' }, fontSize: 28, fontWeight: '400', color: { $t: 'colors.ink' }, opacity: 0.5, x: 152, y: 576, width: 656, height: 42, zIndex: 6 },
      { id: 'code-1', type: 'text', content: 'const cover = await ai.render({', fontFamily: { $t: 'fonts.latin' }, fontSize: 28, fontWeight: '400', color: { $t: 'colors.ink' }, opacity: 0.9, x: 152, y: 620, width: 656, height: 42, zIndex: 6 },
      { id: 'code-2', type: 'text', content: "  style: 'terminal-green',", fontFamily: { $t: 'fonts.latin' }, fontSize: 28, fontWeight: '400', color: { $t: 'colors.ink' }, opacity: 0.9, x: 152, y: 664, width: 656, height: 42, zIndex: 6 },
      { id: 'code-3', type: 'text', content: "  size: '1920x1080'", fontFamily: { $t: 'fonts.latin' }, fontSize: 28, fontWeight: '400', color: { $t: 'colors.ink' }, opacity: 0.9, x: 152, y: 708, width: 656, height: 42, zIndex: 6 },
      { id: 'code-4', type: 'text', content: '})', fontFamily: { $t: 'fonts.latin' }, fontSize: 28, fontWeight: '400', color: { $t: 'colors.ink' }, opacity: 0.9, x: 152, y: 752, width: 656, height: 42, zIndex: 6 },
      // ── 右侧：标题区 ──
      { id: 'kicker', type: 'text', content: '// 终端绿 TERMINAL GREEN', fontFamily: { $t: 'fonts.cjk' }, fontSize: 22, fontWeight: '700', color: { $t: 'colors.accent' }, letterSpacing: 2, x: 1032, y: 180, width: 700, height: 32, zIndex: 6, animation: { name: 'slideInLeft', duration: 600 } },
      { id: 'title', type: 'text', content: '把提示词\n跑成封面', fontFamily: { $t: 'fonts.cjk' }, fontSize: 112, fontWeight: '800', color: { $t: 'colors.ink' }, lineHeight: 1.12, letterSpacing: 4, x: 1032, y: 240, width: 620, height: 290, zIndex: 6, shadow: { offsetX: 0, offsetY: 0, blur: 32, color: { $t: 'colors.accent' } }, animation: { name: 'fadeInUp', duration: 900 }, editable: { content: true, fontSize: { type: 'range', min: 88, max: 140 } } },
      { id: 'title-bar', type: 'shape', shapeKind: 'rect', x: 1032, y: 496, width: 120, height: 10, fill: { $t: 'colors.accent' }, borderRadius: 5, zIndex: 5 },
      { id: 'lead', type: 'text', content: '封面，从终端里长出来。', fontFamily: { $t: 'fonts.cjk' }, fontSize: 56, fontWeight: '700', color: { $t: 'colors.ink' }, x: 1032, y: 548, width: 700, height: 80, zIndex: 6, animation: { name: 'rise', duration: 900, delay: 120 }, editable: { content: true } },
      { id: 'body', type: 'text', content: 'AI 编程时代的封面审美：\n近黑底、磷光绿、等宽字体，\n像一张终端截图海报。', fontFamily: { $t: 'fonts.cjk' }, fontSize: 40, fontWeight: '400', color: { $t: 'colors.ink' }, opacity: 0.85, lineHeight: 1.5, x: 1032, y: 640, width: 660, height: 200, zIndex: 6, animation: { name: 'rise', duration: 900, delay: 240 }, editable: { content: true } },
      { id: 'tagline', type: 'text', content: '// one command → one cover', fontFamily: { $t: 'fonts.latin' }, fontSize: 22, fontWeight: '400', color: { $t: 'colors.accent2' }, opacity: 0.9, letterSpacing: 2, x: 1032, y: 848, width: 700, height: 32, zIndex: 6, animation: { name: 'fadeIn', duration: 900, delay: 360 } },
      // ── 右下：标签 pill ──
      { id: 'pill-1', group: 'pill-', type: 'shape', shapeKind: 'rect', x: 1032, y: 908, width: 140, height: 48, fill: 'transparent', border: { width: 2, style: 'solid', color: { $t: 'colors.accent2' } }, borderRadius: 24, zIndex: 5, animation: { name: 'fadeInUp', duration: 700, delay: 300 } },
      { id: 'pill-2', group: 'pill-', type: 'shape', shapeKind: 'rect', x: 1188, y: 908, width: 170, height: 48, fill: 'transparent', border: { width: 2, style: 'solid', color: { $t: 'colors.accent2' } }, borderRadius: 24, zIndex: 5, animation: { name: 'fadeInUp', duration: 700, delay: 380 } },
      { id: 'pill-3', group: 'pill-', type: 'shape', shapeKind: 'rect', x: 1374, y: 908, width: 210, height: 48, fill: 'transparent', border: { width: 2, style: 'solid', color: { $t: 'colors.accent2' } }, borderRadius: 24, zIndex: 5, animation: { name: 'fadeInUp', duration: 700, delay: 460 } },
      { id: 'pill-t1', type: 'text', content: '# CLI', fontFamily: { $t: 'fonts.latin' }, fontSize: 22, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.9, textAlign: 'center', lineHeight: 2.18, x: 1032, y: 908, width: 140, height: 48, zIndex: 6 },
      { id: 'pill-t2', type: 'text', content: '# 磷光绿', fontFamily: { $t: 'fonts.cjk' }, fontSize: 22, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.9, textAlign: 'center', lineHeight: 2.18, x: 1188, y: 908, width: 170, height: 48, zIndex: 6 },
      { id: 'pill-t3', type: 'text', content: '# 终端截图', fontFamily: { $t: 'fonts.cjk' }, fontSize: 22, fontWeight: '700', color: { $t: 'colors.ink' }, opacity: 0.9, textAlign: 'center', lineHeight: 2.18, x: 1374, y: 908, width: 210, height: 48, zIndex: 6 },
      // ── 底部：状态行 + 隐性署名 ──
      { id: 'tick-1', type: 'text', content: '+', fontFamily: { $t: 'fonts.latin' }, fontSize: 22, fontWeight: '400', color: { $t: 'colors.accent2' }, opacity: 0.9, x: 1004, y: 150, width: 28, height: 28, zIndex: 6 },
      { id: 'foot-status', type: 'text', content: '~/studio/ai-cover on  main [!] via  node v22', fontFamily: { $t: 'fonts.latin' }, fontSize: 22, fontWeight: '400', color: { $t: 'colors.ink' }, opacity: 0.7, letterSpacing: 1, x: 104, y: 996, width: 760, height: 32, zIndex: 6 },
      { id: 'page-num', type: 'text', content: '[ 07 / 24 ]', fontFamily: { $t: 'fonts.latin' }, fontSize: 22, fontWeight: '400', color: { $t: 'colors.ink' }, opacity: 0.5, textAlign: 'right', x: 1200, y: 996, width: 300, height: 32, zIndex: 6 },
      { id: 'foot-sig', type: 'text', content: 'ST · BUILD 07', fontFamily: { $t: 'fonts.latin' }, fontSize: 16, fontWeight: '700', color: { $t: 'colors.accent2' }, opacity: 0.85, letterSpacing: 2, textAlign: 'right', x: 1400, y: 996, width: 420, height: 28, zIndex: 6, animation: { name: 'fadeIn', duration: 1200, delay: 500 } },
      // ── 顶层：CRT 扫描线（repeating-linear-gradient 只能走 overlay） ──
      { id: 'ov-scan', type: 'overlay', x: 0, y: 0, width: 1920, height: 1080, background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.22) 0px, rgba(0,0,0,0.22) 1px, transparent 1px, transparent 3px)', mixBlendMode: 'multiply', opacity: 0.5, zIndex: 20 }
    ]
  }
]

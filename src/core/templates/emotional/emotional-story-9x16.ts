import type { Template } from '@/types/types'

// 9:16 手机竖版情感文案 Story（照片用 Lorem Picsum 稳定外链）
// 无衬线角标体：文件里既有的字面量字体栈（kicker 就在用），这里收进 fonts.meta 让字体面板也能驱动
const SANS = 'Helvetica, Arial, sans-serif'

// 胶片颗粒：SVG pattern 自带平铺，做成 image 元素 1:1 覆盖整张图（不用 CSS url()，避开引号转义坑）
const GRAIN_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1920"><defs><pattern id="grain" width="26" height="26" patternUnits="userSpaceOnUse"><circle cx="4" cy="7" r="1" fill="%23ffffff" opacity="0.55"/><circle cx="17" cy="3" r="0.8" fill="%23ffffff" opacity="0.4"/><circle cx="22" cy="20" r="0.9" fill="%23ffffff" opacity="0.35"/><circle cx="11" cy="15" r="1.1" fill="%23000000" opacity="0.5"/><circle cx="2" cy="23" r="0.8" fill="%23000000" opacity="0.45"/><circle cx="24" cy="11" r="0.7" fill="%23000000" opacity="0.4"/></pattern></defs><rect width="1080" height="1920" fill="url(%23grain)"/></svg>'

// 右侧竖排独白：一列一句，字与字之间断行（同库竖排模板的做法）
const MONO_LINES = [
  '雨\n把\n这\n条\n街\n洗\n得\n很\n轻',
  '我\n的\n耳\n机\n还\n在\n说\n昨\n天',
  '便\n利\n店\n的\n灯\n是\n最\n后\n的\n星'
]

export const emotionalStory9x16: Template = {
  id: 'emotional-story-9x16', name: '夜色街巷·竖版', version: '1.0.0', category: 'emotional', tags: ['emotional', 'story', 'reel', 'photo', '9:16'],
  thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="178" viewBox="0 0 100 178"><rect width="100" height="178" fill="%230f172a"/><rect x="8" y="7" width="11" height="5" fill="%23ffffff" opacity="0.85"/><rect x="66" y="8" width="26" height="3" fill="%23fbbf24"/><rect x="8" y="17" width="84" height="2" fill="%23ffffff" opacity="0.26"/><rect x="8" y="17" width="53" height="2" fill="%23fbbf24"/><circle cx="22" cy="18" r="2" fill="%23fbbf24"/><circle cx="43" cy="18" r="2" fill="%23fbbf24"/><circle cx="70" cy="18" r="1.8" fill="%23ffffff" opacity="0.35"/><circle cx="82" cy="18" r="1.8" fill="%23ffffff" opacity="0.22"/><circle cx="61" cy="18" r="3" fill="%23ffffff"/><g fill="%23ffffff" opacity="0.4"><rect x="82" y="34" width="5" height="5"/><rect x="82" y="42" width="5" height="5"/><rect x="82" y="50" width="5" height="5"/><rect x="82" y="58" width="5" height="5"/><rect x="74" y="34" width="5" height="5"/><rect x="74" y="42" width="5" height="5"/><rect x="74" y="50" width="5" height="5"/><rect x="66" y="34" width="5" height="5"/><rect x="66" y="42" width="5" height="5"/><rect x="66" y="50" width="5" height="5"/><rect x="66" y="58" width="5" height="5"/></g><text x="12" y="62" font-size="26" font-family="monospace" fill="%23fbbf24" opacity="0.09">03</text><rect x="12" y="90" width="48" height="11" rx="2" fill="%23000000" opacity="0.5"/><rect x="15" y="93" width="20" height="2.5" fill="%23fbbf24"/><rect x="15" y="97" width="28" height="3" fill="%23ffffff" opacity="0.75"/><rect y="120" width="100" height="58" fill="%23000000" opacity="0.5"/><rect x="14" y="128" width="60" height="6" fill="%23fbbf24"/><rect x="14" y="139" width="42" height="6" fill="%23ffffff" opacity="0.7"/><rect x="8" y="157" width="34" height="11" rx="2" fill="%23000000" opacity="0.55"/><rect x="11" y="160" width="20" height="2.5" fill="%23ffffff" opacity="0.7"/><rect x="11" y="164" width="14" height="2" fill="%23ffffff" opacity="0.4"/><rect x="74" y="159" width="18" height="4" fill="%23ffffff" opacity="0.75"/><rect x="74" y="166" width="18" height="1.5" fill="%23fbbf24"/><rect x="52" y="171" width="40" height="2" fill="%23ffffff" opacity="0.35"/></svg>',
  tokens: {
    colors: {
      primary: { label: '文字', default: '#FFFFFF', options: ['#FFFFFF', '#FEF3C7', '#F1F5F9'] },
      accent: { label: '强调', default: '#FBBF24', options: ['#FBBF24', '#F472B6', '#38BDF8', '#FDE68A'] },
      live: { label: '直播红', default: '#EF4444', options: ['#EF4444', '#F87171', '#DC2626', '#F472B6', '#FB923C'] }
    },
    fonts: {
      heading: { label: '字体', default: 'Songti SC, SimSun, serif', options: ['Songti SC, SimSun, serif', 'STKaiti, KaiTi, serif', 'system-ui, sans-serif'] },
      meta: { label: '角标字体', default: SANS, options: [SANS, 'system-ui, sans-serif', 'Songti SC, SimSun, serif'] }
    }
  },
  presets: [
    { name: '暗夜琥珀', colors: { primary: '#FFFFFF', accent: '#FBBF24', live: '#EF4444' } },
    { name: '霓虹玫粉', colors: { primary: '#FFFFFF', accent: '#F472B6', live: '#F472B6' } },
    { name: '清冷冰蓝', colors: { primary: '#F1F5F9', accent: '#38BDF8', live: '#60A5FA' } },
    { name: '奶油米白', colors: { primary: '#FEF3C7', accent: '#FDE68A', live: '#E07A5F' } }
  ],
  canvas: { virtualWidth: 1080, virtualHeight: 1920, defaultWidth: 1080, defaultHeight: 1920, backgroundColor: '#0F172A' },
  elements: [
    { id: 'photo', type: 'image', src: '/images/photo/night-alley-1080x1920.jpg', objectFit: 'cover', x: 0, y: 0, width: 1080, height: 1920, zIndex: 1, editable: { src: { type: 'upload' }, position: true } },
    { id: 'scrim-bottom', type: 'overlay', background: 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.35) 34%, rgba(0,0,0,0) 62%)', x: 0, y: 0, width: 1080, height: 1920, zIndex: 2 },
    { id: 'scrim-top', type: 'overlay', background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.36) 9%, rgba(0,0,0,0) 22%)', x: 0, y: 0, width: 1080, height: 520, zIndex: 2 },
    { id: 'grain', type: 'image', src: GRAIN_SVG, objectFit: 'fill', x: 0, y: 0, width: 1080, height: 1920, opacity: 0.35, zIndex: 3 },
    // ── 章节水印 + 顶部角标（时间 / 节目 / 章节 / 录制中）─────────
    { id: 'chapter-ghost', type: 'text', content: '03', fontFamily: { $t: 'fonts.meta' }, fontSize: 340, fontWeight: '900', color: { $t: 'colors.primary' }, opacity: 0.07, letterSpacing: -10, x: 78, y: 310, width: 460, height: 420, zIndex: 4 },
    { id: 'badge-time', type: 'text', content: '23:47', fontFamily: { $t: 'fonts.meta' }, fontSize: 44, fontWeight: '700', color: { $t: 'colors.primary' }, letterSpacing: 1, x: 90, y: 48, width: 180, height: 56, zIndex: 6, animation: { name: 'fadeIn', duration: 700 }, editable: { content: true } },
    { id: 'badge-show', type: 'text', content: '城市夜话 · FM 89.4', fontFamily: { $t: 'fonts.meta' }, fontSize: 22, fontWeight: '600', color: { $t: 'colors.primary' }, opacity: 0.6, letterSpacing: 4, x: 92, y: 106, width: 430, height: 30, zIndex: 6, editable: { content: true } },
    { id: 'badge-chapter', type: 'text', content: '第三章 · 长夜将尽', fontFamily: { $t: 'fonts.heading' }, fontSize: 26, fontWeight: '600', color: { $t: 'colors.accent' }, letterSpacing: 3, textAlign: 'right', x: 590, y: 54, width: 400, height: 42, zIndex: 6, animation: { name: 'slideInRight', duration: 700, delay: 200 }, editable: { content: true } },
    { id: 'rec-dot', type: 'shape', shapeKind: 'circle', x: 92, y: 148, width: 14, height: 14, fill: { $t: 'colors.live' }, zIndex: 6, animation: { name: 'blink', duration: 1600, iterationCount: 'infinite' } },
    { id: 'rec-text', type: 'text', content: 'REC · 这段还在录，没人剪辑', fontFamily: { $t: 'fonts.meta' }, fontSize: 22, fontWeight: '600', color: { $t: 'colors.primary' }, opacity: 0.5, letterSpacing: 2, x: 118, y: 141, width: 420, height: 30, zIndex: 6, editable: { content: true } },
    // ── 真·进度条：轨道 + 已走段 + 章节圆点 + 走到哪儿的白点 ───────
    { id: 'progress-track', type: 'shape', shapeKind: 'rect', x: 90, y: 190, width: 900, height: 6, fill: 'rgba(255,255,255,0.26)', borderRadius: 3, zIndex: 5 },
    { id: 'progress-bar', type: 'shape', shapeKind: 'rect', x: 90, y: 190, width: 560, height: 6, fill: { $t: 'colors.accent' }, borderRadius: 3, zIndex: 5, animation: { name: 'slideInLeft', duration: 1600 } },
    { id: 'progress-dot-0', group: 'progress-dot-', type: 'shape', shapeKind: 'circle', x: 222, y: 184, width: 18, height: 18, fill: { $t: 'colors.accent' }, border: { color: 'rgba(15,23,42,0.9)', width: 3, style: 'solid' }, zIndex: 7 },
    { id: 'progress-dot-1', group: 'progress-dot-', type: 'shape', shapeKind: 'circle', x: 462, y: 184, width: 18, height: 18, fill: { $t: 'colors.accent' }, border: { color: 'rgba(15,23,42,0.9)', width: 3, style: 'solid' }, zIndex: 7 },
    { id: 'progress-dot-2', group: 'progress-dot-', type: 'shape', shapeKind: 'circle', x: 780, y: 185, width: 16, height: 16, fill: 'rgba(255,255,255,0.3)', zIndex: 7 },
    { id: 'progress-head', type: 'shape', shapeKind: 'circle', x: 637, y: 180, width: 26, height: 26, fill: { $t: 'colors.primary' }, opacity: 0.95, zIndex: 8, animation: { name: 'pulse', duration: 2400, iterationCount: 'infinite' } },
    { id: 'progress-note', type: 'text', content: '本章 08′12″ / 全 26′03″', fontFamily: { $t: 'fonts.meta' }, fontSize: 22, color: { $t: 'colors.primary' }, opacity: 0.45, letterSpacing: 2, textAlign: 'right', x: 620, y: 214, width: 370, height: 28, zIndex: 6, editable: { content: true } },
    // ── 右侧竖排独白（三列，右起）───────────────────────────────
    ...MONO_LINES.map((col, i) => ({
      id: `monologue-${i}`, type: 'text' as const, content: col, fontFamily: { $t: 'fonts.heading' } as const, fontSize: 30, fontWeight: '500' as const,
      color: { $t: 'colors.primary' } as const, opacity: 0.82 - i * 0.08, textAlign: 'center' as const, lineHeight: 1.42,
      x: 950 - i * 62, y: 300, width: 46, height: 470, zIndex: 6,
      animation: { name: 'inkReveal' as const, duration: 1300, delay: 500 + i * 420 }, editable: { content: true, position: true }
    })),
    { id: 'monologue-from', type: 'text', content: '独白', fontFamily: { $t: 'fonts.heading' }, fontSize: 18, color: { $t: 'colors.primary' }, opacity: 0.42, letterSpacing: 4, textAlign: 'center', x: 944, y: 250, width: 52, height: 30, zIndex: 6 },
    // ── 中景字幕卡：今晚最后一首 ────────────────────────────────
    { id: 'now-bg', type: 'shape', shapeKind: 'rect', x: 90, y: 986, width: 548, height: 112, fill: 'rgba(0,0,0,0.5)', borderRadius: 8, border: { color: 'rgba(255,255,255,0.18)', width: 1, style: 'solid' }, zIndex: 5, animation: { name: 'fadeInUp', duration: 900, delay: 600 } },
    { id: 'now-label', type: 'text', content: '今晚最后一首', fontFamily: { $t: 'fonts.meta' }, fontSize: 18, fontWeight: '600', color: { $t: 'colors.accent' }, letterSpacing: 3, x: 118, y: 1002, width: 300, height: 26, zIndex: 6, editable: { content: true } },
    { id: 'now-track', type: 'text', content: '《城市雨声》', fontFamily: { $t: 'fonts.heading' }, fontSize: 34, fontWeight: '700', color: { $t: 'colors.primary' }, letterSpacing: 1, x: 118, y: 1034, width: 300, height: 44, zIndex: 6, editable: { content: true } },
    { id: 'now-request', type: 'text', content: '点歌 · 阿澈（广州）', fontFamily: { $t: 'fonts.meta' }, fontSize: 18, color: { $t: 'colors.primary' }, opacity: 0.55, letterSpacing: 1, textAlign: 'right', x: 396, y: 1046, width: 214, height: 28, zIndex: 6, editable: { content: true } },
    { id: 'kicker', type: 'text', content: '凌晨两点 · 城市独白', fontFamily: { $t: 'fonts.meta' }, fontSize: 26, fontWeight: '600', color: { $t: 'colors.accent' }, letterSpacing: 3, x: 90, y: 1220, width: 900, height: 40, zIndex: 4, animation: { name: 'fadeIn', duration: 800 }, editable: { content: true } },
    { id: 'quote', type: 'text', content: '这条街睡了两遍\n我还在念第三遍', fontFamily: { $t: 'fonts.heading' }, fontSize: 92, fontWeight: '800', color: { $t: 'colors.primary' }, lineHeight: 1.28, letterSpacing: 2, x: 90, y: 1300, width: 900, height: 320, zIndex: 4, shadow: { color: 'rgba(0,0,0,0.55)', blur: 18, offsetX: 0, offsetY: 6 }, animation: { name: 'rise', duration: 1000, delay: 200 }, editable: { content: true, fontSize: { type: 'range', min: 60, max: 120 }, position: true } },
    // ── 署名贴纸卡 + 集数页码 + 下期预告 ─────────────────────────
    { id: 'sticker', type: 'shape', shapeKind: 'rect', x: 84, y: 1698, width: 396, height: 96, fill: 'rgba(0,0,0,0.46)', borderRadius: 14, border: { color: 'rgba(255,255,255,0.22)', width: 1, style: 'solid' }, rotation: -1.5, zIndex: 4, animation: { name: 'zoomIn', duration: 700, delay: 800 } },
    { id: 'signature', type: 'text', content: '@ 深夜写字的人', fontFamily: { $t: 'fonts.heading' }, fontSize: 30, fontWeight: '400', color: { $t: 'colors.primary' }, opacity: 0.85, rotation: -1.5, x: 118, y: 1710, width: 340, height: 42, zIndex: 5, animation: { name: 'fadeIn', duration: 900, delay: 800 }, editable: { content: true } },
    { id: 'sticker-date', type: 'text', content: '2026.09.21 · 录于昌岗路', fontFamily: { $t: 'fonts.meta' }, fontSize: 18, color: { $t: 'colors.primary' }, opacity: 0.5, letterSpacing: 2, rotation: -1.5, x: 118, y: 1752, width: 340, height: 26, zIndex: 5, editable: { content: true } },
    { id: 'episode', type: 'text', content: 'EP.17 / 42', fontFamily: { $t: 'fonts.meta' }, fontSize: 30, fontWeight: '700', color: { $t: 'colors.primary' }, letterSpacing: 3, textAlign: 'right', x: 680, y: 1706, width: 310, height: 44, zIndex: 5, animation: { name: 'fadeIn', duration: 800, delay: 1000 }, editable: { content: true } },
    { id: 'episode-rule', type: 'shape', shapeKind: 'rect', x: 830, y: 1758, width: 160, height: 3, fill: { $t: 'colors.accent' }, opacity: 0.75, zIndex: 5 },
    { id: 'next-teaser', type: 'text', content: '下一期：末班地铁上的告白 · 周四 23:30 见', fontFamily: { $t: 'fonts.heading' }, fontSize: 22, color: { $t: 'colors.primary' }, opacity: 0.5, letterSpacing: 2, textAlign: 'right', x: 420, y: 1812, width: 570, height: 32, zIndex: 5, animation: { name: 'fadeInUp', duration: 900, delay: 1200 }, editable: { content: true } }
  ]
}

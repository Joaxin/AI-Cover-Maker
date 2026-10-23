// src/core/templates/event/event-posters.ts —— 活动·公告大类首批（6 个运营发布向模板）
// 口径：讲座直播预告 / 招聘启事 / 活动日程表 / 沙龙报名卡 / 店铺开业公告 / 周年庆海报。
// 与 business 的分工：business 是「论坛主视觉」那套端正排版（summit-keynote 已占位），这里走「运营发通知」的语感——
//   胶囊标签 + 大字号标语 + 行式信息栏 + 进度条/虚线占位，文案带人味但不轻佻。
// 约定：装饰一律 rect/circle 或 _decor 现成纹理；颜色全部走 token（换预设即换色）；
//   中性纹理允许 rgba(127,127,127,.x)；每个模板 5 色 4 预设；比例覆盖 16:9 / 3:4 / 4:5 / 9:16 / 1:1。
import type { Template } from '@/types/types'
import { HEI, SONG, IMPACT, MONO } from '../_fx/trend'
import { dotsBg, gridBg, plusBg } from '../knowledge/_decor'
import { svgUri } from '../_fx/common'

/** 缩略图/装饰小图：inner 只写 SVG 内部标签，外壳与 viewBox 由这里补齐（data URI 里 # 必须写成 %23） */

export const eventTemplates: Template[] = [
  // ────────────────────────────────────────────────────────────────
  // 1. 讲座直播预告（16:9）—— 讲者头像虚位 + 主题大字 + 底部时间议程条
  // ────────────────────────────────────────────────────────────────
  {
    id: 'event-talk-live', name: '讲座直播预告', version: '1.0.0', category: 'event',
    tags: ['event', 'talk', 'live', 'lecture', '16:9'],
    thumbnail: svgUri('<rect width="160" height="90" fill="%23FFF3E4"/><rect x="10" y="9" width="38" height="11" rx="5.5" fill="%23F2542D"/><rect x="10" y="27" width="76" height="11" rx="2" fill="%23241A12"/><rect x="10" y="42" width="58" height="7" rx="2" fill="%23241A12" opacity="0.45"/><rect x="10" y="54" width="34" height="5" rx="2" fill="%23F2542D"/><circle cx="126" cy="36" r="21" fill="none" stroke="%23241A12" stroke-width="1.8" stroke-dasharray="4 3"/><rect x="112" y="60" width="28" height="4" rx="2" fill="%23241A12" opacity="0.5"/><rect x="8" y="70" width="144" height="13" rx="4" fill="%23241A12" opacity="0.09"/><g fill="%23F2542D"><rect x="12" y="74" width="16" height="5" rx="2"/><rect x="48" y="74" width="16" height="5" rx="2"/><rect x="84" y="74" width="16" height="5" rx="2"/></g><rect x="126" y="72" width="22" height="9" rx="4.5" fill="%23F2542D"/>', 160, 90),
    tokens: {
      colors: {
        bg: { label: '底色', default: '#FFF3E4', options: ['#FFF3E4', '#EDF1FF', '#E8F7F1', '#1A1330'] },
        ink: { label: '主文字', default: '#241A12', options: ['#241A12', '#16182B', '#10241D', '#F3ECFF'] },
        accent: { label: '强调色', default: '#F2542D', options: ['#F2542D', '#3B5BFD', '#0FA678', '#FFC247'] },
        soft: { label: '信息条底', default: '#FFE0C4', options: ['#FFE0C4', '#D9E0FF', '#CFF0E3', '#2C2350'] },
        dim: { label: '弱文字', default: '#9A7E6B', options: ['#9A7E6B', '#7C86A8', '#6E9187', '#A99CC9'] }
      },
      fonts: { heading: { label: '标题字体', default: HEI, options: [HEI, SONG] } }
    },
    presets: [
      { name: '橙意官宣', colors: { bg: '#FFF3E4', ink: '#241A12', accent: '#F2542D', soft: '#FFE0C4', dim: '#9A7E6B' } },
      { name: '蓝莓首播', colors: { bg: '#EDF1FF', ink: '#16182B', accent: '#3B5BFD', soft: '#D9E0FF', dim: '#7C86A8' } },
      { name: '薄荷开麦', colors: { bg: '#E8F7F1', ink: '#10241D', accent: '#0FA678', soft: '#CFF0E3', dim: '#6E9187' } },
      { name: '夜场葡萄', colors: { bg: '#1A1330', ink: '#F3ECFF', accent: '#FFC247', soft: '#2C2350', dim: '#A99CC9' } }
    ],
    canvas: { virtualWidth: 1920, virtualHeight: 1080, defaultWidth: 1920, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'tk-dots', type: 'image', src: dotsBg(1920, 1080, 64, 'rgba(127,127,127,0.13)'), x: 0, y: 0, width: 1920, height: 1080, objectFit: 'fill', zIndex: 1 },
      // 左上 LIVE 胶囊（内含闪烁小点）+ 期数
      { id: 'tk-pill', type: 'shape', shapeKind: 'rect', x: 120, y: 96, width: 300, height: 64, borderRadius: 999, fill: { $t: 'colors.accent' }, zIndex: 3, animation: { name: 'fadeInDown', duration: 480 } },
      { id: 'tk-dot', type: 'shape', shapeKind: 'circle', x: 146, y: 118, width: 20, height: 20, fill: { $t: 'colors.bg' }, zIndex: 4, animation: { name: 'blink', duration: 1300, iterationCount: 'infinite' } },
      { id: 'tk-pill-t', type: 'text', content: 'LIVE 直播预告', fontFamily: HEI, fontSize: 30, fontWeight: 700, color: { $t: 'colors.bg' }, textAlign: 'center', x: 170, y: 112, width: 250, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'tk-series', type: 'text', content: '第 12 期 · 内容团队公开课', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.dim' }, x: 452, y: 106, width: 520, height: 42, zIndex: 3, editable: { content: true } },
      // 主题大字 + 副标题
      { id: 'tk-title', type: 'text', content: '选题不再\n靠灵感', fontFamily: { $t: 'fonts.heading' }, fontSize: 132, fontWeight: 900, lineHeight: 1.16, color: { $t: 'colors.ink' }, x: 120, y: 222, width: 1240, height: 330, zIndex: 4, animation: { name: 'fadeInUp', duration: 560 }, editable: { content: true, fontSize: { type: 'range', min: 90, max: 168 } } },
      { id: 'tk-rule', type: 'shape', shapeKind: 'rect', x: 120, y: 572, width: 200, height: 12, borderRadius: 6, fill: { $t: 'colors.accent' }, zIndex: 4, animation: { name: 'slideInLeft', duration: 520, delay: 160 } },
      { id: 'tk-sub', type: 'text', content: '内容团队的 3 个底层方法 · 全程免费看', fontFamily: HEI, fontSize: 34, color: { $t: 'colors.ink' }, x: 120, y: 612, width: 1180, height: 52, zIndex: 4, animation: { name: 'fadeIn', duration: 520, delay: 260 }, editable: { content: true } },
      // 讲者区：虚线头像位 + 姓名 + 头衔（外加一圈浮动环）
      { id: 'tk-avatar', type: 'shape', shapeKind: 'circle', x: 1380, y: 210, width: 420, height: 420, border: { width: 6, style: 'dashed', color: { $t: 'colors.ink' } }, zIndex: 3, animation: { name: 'zoomIn', duration: 480, delay: 120 } },
      { id: 'tk-avatar-t', type: 'text', content: '这里放讲者照片', imageSlot: 'tk-avatar', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.dim' }, textAlign: 'center', x: 1380, y: 402, width: 420, height: 40, zIndex: 4, editable: { content: true } },
      { id: 'tk-name', type: 'text', content: '陈言 · 内容负责人', fontFamily: HEI, fontSize: 44, fontWeight: 700, color: { $t: 'colors.ink' }, textAlign: 'center', x: 1380, y: 672, width: 420, height: 58, zIndex: 4, animation: { name: 'fadeInUp', duration: 520, delay: 280 }, editable: { content: true } },
      { id: 'tk-role', type: 'text', content: '主理人 · 前 4A 内容总监', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.dim' }, textAlign: 'center', x: 1380, y: 736, width: 420, height: 38, zIndex: 4, editable: { content: true } },
      { id: 'tk-ring', type: 'shape', shapeKind: 'circle', x: 1326, y: 178, width: 84, height: 84, border: { width: 5, color: { $t: 'colors.accent' } }, zIndex: 4, animation: { name: 'float', duration: 4200, iterationCount: 'infinite' } },
      // 底部时间议程条：三段 + 分隔竖线 + 预约胶囊
      { id: 'tk-band', type: 'shape', shapeKind: 'rect', x: 120, y: 848, width: 1680, height: 140, borderRadius: 24, fill: { $t: 'colors.soft' }, zIndex: 2, animation: { name: 'slideUpFade', duration: 560, delay: 200 } },
      { id: 'tk-t1', type: 'text', content: '19:30', fontFamily: MONO, fontSize: 40, fontWeight: 700, color: { $t: 'colors.accent' }, x: 176, y: 880, width: 180, height: 50, zIndex: 3, animation: { name: 'fadeIn', duration: 460, delay: 340 }, editable: { content: true } },
      { id: 'tk-t1l', type: 'text', content: '签到暖场', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.ink' }, x: 176, y: 936, width: 240, height: 38, zIndex: 3, editable: { content: true } },
      { id: 'tk-sep1', type: 'shape', shapeKind: 'rect', x: 580, y: 880, width: 2, height: 78, fill: { $t: 'colors.ink' }, opacity: 0.22, zIndex: 3 },
      { id: 'tk-t2', type: 'text', content: '20:00', fontFamily: MONO, fontSize: 40, fontWeight: 700, color: { $t: 'colors.accent' }, x: 636, y: 880, width: 180, height: 50, zIndex: 3, animation: { name: 'fadeIn', duration: 460, delay: 420 }, editable: { content: true } },
      { id: 'tk-t2l', type: 'text', content: '主题拆解', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.ink' }, x: 636, y: 936, width: 240, height: 38, zIndex: 3, editable: { content: true } },
      { id: 'tk-sep2', type: 'shape', shapeKind: 'rect', x: 1040, y: 880, width: 2, height: 78, fill: { $t: 'colors.ink' }, opacity: 0.22, zIndex: 3 },
      { id: 'tk-t3', type: 'text', content: '21:00', fontFamily: MONO, fontSize: 40, fontWeight: 700, color: { $t: 'colors.accent' }, x: 1096, y: 880, width: 180, height: 50, zIndex: 3, animation: { name: 'fadeIn', duration: 460, delay: 500 }, editable: { content: true } },
      { id: 'tk-t3l', type: 'text', content: '现场答疑', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.ink' }, x: 1096, y: 936, width: 240, height: 38, zIndex: 3, editable: { content: true } },
      { id: 'tk-cta', type: 'shape', shapeKind: 'rect', x: 1500, y: 884, width: 260, height: 76, borderRadius: 999, fill: { $t: 'colors.accent' }, zIndex: 3, animation: { name: 'zoomIn', duration: 460, delay: 560 } },
      { id: 'tk-cta-t', type: 'text', content: '免费预约', fontFamily: HEI, fontSize: 30, fontWeight: 700, color: { $t: 'colors.bg' }, textAlign: 'center', x: 1500, y: 902, width: 260, height: 42, zIndex: 4, editable: { content: true } },
      { id: 'tk-note', type: 'text', content: '回放挂 7 天 · 不用抢座', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.dim' }, x: 120, y: 744, width: 700, height: 38, zIndex: 3, editable: { content: true } }
    ]
  },

  // ────────────────────────────────────────────────────────────────
  // 2. 招聘启事（3:4）—— 标语大字 + 岗位列表行 + 福利标签云 + 投递条
  // ────────────────────────────────────────────────────────────────
  {
    id: 'event-recruit', name: '招聘启事', version: '1.0.0', category: 'event',
    tags: ['event', 'recruit', 'hiring', 'job', '3:4'],
    thumbnail: svgUri('<rect width="108" height="144" fill="%23EDF6FF"/><rect x="8" y="10" width="40" height="4" rx="2" fill="%231D7AE5"/><rect x="8" y="20" width="52" height="14" rx="2" fill="%2315223A"/><rect x="76" y="18" width="24" height="9" rx="4.5" fill="%231D7AE5"/><g fill="%2315223A"><rect x="8" y="44" width="26" height="5" rx="1" opacity="0.9"/><rect x="40" y="44" width="34" height="5" rx="1"/><rect x="8" y="58" width="26" height="5" rx="1" opacity="0.9"/><rect x="40" y="58" width="40" height="5" rx="1"/><rect x="8" y="72" width="26" height="5" rx="1" opacity="0.9"/><rect x="40" y="72" width="30" height="5" rx="1"/></g><g stroke="%2315223A" stroke-width="0.8" opacity="0.18"><path d="M8 54 H100"/><path d="M8 68 H100"/><path d="M8 82 H100"/></g><g fill="%2315223A" opacity="0.1"><rect x="8" y="90" width="24" height="8" rx="4"/><rect x="36" y="90" width="20" height="8" rx="4"/><rect x="60" y="90" width="26" height="8" rx="4"/><rect x="8" y="102" width="22" height="8" rx="4"/><rect x="34" y="102" width="28" height="8" rx="4"/></g><rect x="8" y="118" width="92" height="18" rx="4" fill="%231D7AE5"/><g fill="%23FFFFFF"><rect x="14" y="123" width="40" height="4" rx="1.6"/><rect x="14" y="130" width="60" height="3" rx="1.5" opacity="0.75"/></g>', 108, 144),
    tokens: {
      colors: {
        bg: { label: '底色', default: '#EDF6FF', options: ['#EDF6FF', '#FFF6EC', '#F0FBF3', '#F4EEFF'] },
        ink: { label: '主文字', default: '#15223A', options: ['#15223A', '#3A2410', '#123324', '#271440'] },
        accent: { label: '强调色', default: '#1D7AE5', options: ['#1D7AE5', '#F2751D', '#0FA65D', '#7A3BE5'] },
        soft: { label: '标签底', default: '#D5E8FB', options: ['#D5E8FB', '#FBE3CC', '#D2F0DE', '#E4D8FB'] },
        dim: { label: '弱文字', default: '#6E819C', options: ['#6E819C', '#A07E5C', '#5F8C74', '#8E7DB0'] }
      },
      fonts: { heading: { label: '标题字体', default: HEI, options: [HEI, IMPACT] } }
    },
    presets: [
      { name: '海蓝招人', colors: { bg: '#EDF6FF', ink: '#15223A', accent: '#1D7AE5', soft: '#D5E8FB', dim: '#6E819C' } },
      { name: '暖橙急聘', colors: { bg: '#FFF6EC', ink: '#3A2410', accent: '#F2751D', soft: '#FBE3CC', dim: '#A07E5C' } },
      { name: '松绿校招', colors: { bg: '#F0FBF3', ink: '#123324', accent: '#0FA65D', soft: '#D2F0DE', dim: '#5F8C74' } },
      { name: '紫电实习', colors: { bg: '#F4EEFF', ink: '#271440', accent: '#7A3BE5', soft: '#E4D8FB', dim: '#8E7DB0' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1440, defaultWidth: 1080, defaultHeight: 1440, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'rc-grid', type: 'image', src: gridBg(1080, 1440, 60, 'rgba(127,127,127,0.16)'), x: 0, y: 0, width: 1080, height: 1440, objectFit: 'fill', zIndex: 1 },
      { id: 'rc-eye', type: 'text', content: 'WE ARE HIRING 我们招人啦', fontFamily: MONO, fontSize: 30, fontWeight: 700, letterSpacing: 6, color: { $t: 'colors.accent' }, x: 80, y: 90, width: 760, height: 42, zIndex: 3, animation: { name: 'fadeIn', duration: 460 }, editable: { content: true } },
      { id: 'rc-slogan', type: 'text', content: '就等你来', fontFamily: { $t: 'fonts.heading' }, fontSize: 150, fontWeight: 900, lineHeight: 1.1, color: { $t: 'colors.ink' }, x: 80, y: 150, width: 920, height: 182, zIndex: 3, animation: { name: 'fadeInUp', duration: 560 }, editable: { content: true, fontSize: { type: 'range', min: 100, max: 190 } } },
      { id: 'rc-sub', type: 'text', content: '新媒体 / 视觉 / 增长 / 内容 · 四个方向都开着', fontFamily: HEI, fontSize: 30, color: { $t: 'colors.dim' }, x: 80, y: 330, width: 920, height: 44, zIndex: 3, editable: { content: true } },
      { id: 'rc-hot', type: 'shape', shapeKind: 'rect', x: 800, y: 152, width: 200, height: 68, borderRadius: 999, fill: { $t: 'colors.accent' }, zIndex: 4, animation: { name: 'pulse', duration: 1800, iterationCount: 'infinite' } },
      { id: 'rc-hot-t', type: 'text', content: '急招', fontFamily: HEI, fontSize: 30, fontWeight: 700, color: { $t: 'colors.bg' }, textAlign: 'center', x: 800, y: 168, width: 200, height: 40, zIndex: 5, editable: { content: true } },
      // 岗位列表 4 行：编号 + 岗位名 + 右侧标签 + 分隔线
      { id: 'rc-n0', type: 'text', content: '01', fontFamily: MONO, fontSize: 30, fontWeight: 700, color: { $t: 'colors.accent' }, x: 80, y: 434, width: 90, height: 40, zIndex: 3, editable: { content: true } },
      { id: 'rc-r0', type: 'text', content: '新媒体运营', fontFamily: HEI, fontSize: 44, fontWeight: 700, color: { $t: 'colors.ink' }, x: 200, y: 430, width: 560, height: 58, zIndex: 3, animation: { name: 'slideInLeft', duration: 460, delay: 140 }, editable: { content: true } },
      { id: 'rc-t0', type: 'text', content: '全职 · 可远程', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.dim' }, textAlign: 'right', x: 560, y: 444, width: 440, height: 36, zIndex: 3, editable: { content: true } },
      { id: 'rc-l0', group: 'rc-l', type: 'shape', shapeKind: 'rect', x: 80, y: 506, width: 920, height: 2, fill: { $t: 'colors.soft' }, zIndex: 2 },
      { id: 'rc-n1', type: 'text', content: '02', fontFamily: MONO, fontSize: 30, fontWeight: 700, color: { $t: 'colors.accent' }, x: 80, y: 546, width: 90, height: 40, zIndex: 3, editable: { content: true } },
      { id: 'rc-r1', type: 'text', content: '视觉设计师', fontFamily: HEI, fontSize: 44, fontWeight: 700, color: { $t: 'colors.ink' }, x: 200, y: 542, width: 560, height: 58, zIndex: 3, animation: { name: 'slideInLeft', duration: 460, delay: 220 }, editable: { content: true } },
      { id: 'rc-t1', type: 'text', content: '全职 · 坐班', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.dim' }, textAlign: 'right', x: 560, y: 556, width: 440, height: 36, zIndex: 3, editable: { content: true } },
      { id: 'rc-l1', group: 'rc-l', type: 'shape', shapeKind: 'rect', x: 80, y: 618, width: 920, height: 2, fill: { $t: 'colors.soft' }, zIndex: 2 },
      { id: 'rc-n2', type: 'text', content: '03', fontFamily: MONO, fontSize: 30, fontWeight: 700, color: { $t: 'colors.accent' }, x: 80, y: 658, width: 90, height: 40, zIndex: 3, editable: { content: true } },
      { id: 'rc-r2', type: 'text', content: '增长产品经理', fontFamily: HEI, fontSize: 44, fontWeight: 700, color: { $t: 'colors.ink' }, x: 200, y: 654, width: 560, height: 58, zIndex: 3, animation: { name: 'slideInLeft', duration: 460, delay: 300 }, editable: { content: true } },
      { id: 'rc-t2', type: 'text', content: '全职 · 面谈', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.dim' }, textAlign: 'right', x: 560, y: 668, width: 440, height: 36, zIndex: 3, editable: { content: true } },
      { id: 'rc-l2', group: 'rc-l', type: 'shape', shapeKind: 'rect', x: 80, y: 730, width: 920, height: 2, fill: { $t: 'colors.soft' }, zIndex: 2 },
      { id: 'rc-n3', type: 'text', content: '04', fontFamily: MONO, fontSize: 30, fontWeight: 700, color: { $t: 'colors.accent' }, x: 80, y: 770, width: 90, height: 40, zIndex: 3, editable: { content: true } },
      { id: 'rc-r3', type: 'text', content: '内容实习生', fontFamily: HEI, fontSize: 44, fontWeight: 700, color: { $t: 'colors.ink' }, x: 200, y: 766, width: 560, height: 58, zIndex: 3, animation: { name: 'slideInLeft', duration: 460, delay: 380 }, editable: { content: true } },
      { id: 'rc-t3', type: 'text', content: '实习 · 可转正', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.dim' }, textAlign: 'right', x: 560, y: 780, width: 440, height: 36, zIndex: 3, editable: { content: true } },
      { id: 'rc-l3', group: 'rc-l', type: 'shape', shapeKind: 'rect', x: 80, y: 842, width: 920, height: 2, fill: { $t: 'colors.soft' }, zIndex: 2 },
      // 福利标签云：两行胶囊
      { id: 'rc-ben', type: 'text', content: '福利这边 · 也不是摆设', fontFamily: HEI, fontSize: 34, fontWeight: 700, color: { $t: 'colors.ink' }, x: 80, y: 878, width: 700, height: 48, zIndex: 3, animation: { name: 'fadeIn', duration: 480, delay: 420 }, editable: { content: true } },
      { id: 'rc-p0', group: 'rc-p', type: 'shape', shapeKind: 'rect', x: 80, y: 950, width: 220, height: 76, borderRadius: 999, fill: { $t: 'colors.soft' }, zIndex: 2 },
      { id: 'rc-p0-t', type: 'text', content: '五险一金', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.ink' }, textAlign: 'center', x: 80, y: 970, width: 220, height: 38, zIndex: 3, animation: { name: 'zoomIn', duration: 420, delay: 460 }, editable: { content: true } },
      { id: 'rc-p1', group: 'rc-p', type: 'shape', shapeKind: 'rect', x: 324, y: 950, width: 200, height: 76, borderRadius: 999, fill: { $t: 'colors.soft' }, zIndex: 2 },
      { id: 'rc-p1-t', type: 'text', content: '双休不卷', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.ink' }, textAlign: 'center', x: 324, y: 970, width: 200, height: 38, zIndex: 3, animation: { name: 'zoomIn', duration: 420, delay: 520 }, editable: { content: true } },
      { id: 'rc-p2', group: 'rc-p', type: 'shape', shapeKind: 'rect', x: 548, y: 950, width: 240, height: 76, borderRadius: 999, fill: { $t: 'colors.soft' }, zIndex: 2 },
      { id: 'rc-p2-t', type: 'text', content: '年度体检', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.ink' }, textAlign: 'center', x: 548, y: 970, width: 240, height: 38, zIndex: 3, animation: { name: 'zoomIn', duration: 420, delay: 580 }, editable: { content: true } },
      { id: 'rc-p3', group: 'rc-p', type: 'shape', shapeKind: 'rect', x: 812, y: 950, width: 188, height: 76, borderRadius: 999, fill: { $t: 'colors.soft' }, zIndex: 2 },
      { id: 'rc-p3-t', type: 'text', content: '零食管够', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.ink' }, textAlign: 'center', x: 812, y: 970, width: 188, height: 38, zIndex: 3, animation: { name: 'zoomIn', duration: 420, delay: 640 }, editable: { content: true } },
      { id: 'rc-p4', group: 'rc-p', type: 'shape', shapeKind: 'rect', x: 80, y: 1050, width: 240, height: 76, borderRadius: 999, fill: { $t: 'colors.soft' }, zIndex: 2 },
      { id: 'rc-p4-t', type: 'text', content: '弹性不打卡', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.ink' }, textAlign: 'center', x: 80, y: 1070, width: 240, height: 38, zIndex: 3, editable: { content: true } },
      { id: 'rc-p5', group: 'rc-p', type: 'shape', shapeKind: 'rect', x: 344, y: 1050, width: 190, height: 76, borderRadius: 999, fill: { $t: 'colors.soft' }, zIndex: 2 },
      { id: 'rc-p5-t', type: 'text', content: '宠物友好', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.ink' }, textAlign: 'center', x: 344, y: 1070, width: 190, height: 38, zIndex: 3, editable: { content: true } },
      { id: 'rc-p6', group: 'rc-p', type: 'shape', shapeKind: 'rect', x: 558, y: 1050, width: 224, height: 76, borderRadius: 999, fill: { $t: 'colors.soft' }, zIndex: 2 },
      { id: 'rc-p6-t', type: 'text', content: '出差补贴', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.ink' }, textAlign: 'center', x: 558, y: 1070, width: 224, height: 38, zIndex: 3, editable: { content: true } },
      { id: 'rc-p7', group: 'rc-p', type: 'shape', shapeKind: 'rect', x: 806, y: 1050, width: 194, height: 76, borderRadius: 999, fill: { $t: 'colors.soft' }, zIndex: 2 },
      { id: 'rc-p7-t', type: 'text', content: '生日假', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.ink' }, textAlign: 'center', x: 806, y: 1070, width: 194, height: 38, zIndex: 3, editable: { content: true } },
      // 投递条
      { id: 'rc-cta', type: 'shape', shapeKind: 'rect', x: 80, y: 1160, width: 920, height: 160, borderRadius: 24, fill: { $t: 'colors.accent' }, zIndex: 2, animation: { name: 'fadeInUp', duration: 520, delay: 300 } },
      { id: 'rc-cta-1', type: 'text', content: '简历直达 hr@yunchu.ai', fontFamily: HEI, fontSize: 34, fontWeight: 700, color: { $t: 'colors.bg' }, textAlign: 'center', x: 80, y: 1190, width: 920, height: 46, zIndex: 3, editable: { content: true } },
      { id: 'rc-cta-2', type: 'text', content: '坐标 · 地铁 2 号线云谷大厦 B 座 · 面聊也行', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.bg' }, opacity: 0.9, textAlign: 'center', x: 80, y: 1244, width: 920, height: 38, zIndex: 3, editable: { content: true } },
      { id: 'rc-foot', type: 'text', content: '薪资以 Offer 为准 · 岗位招满即收起', fontFamily: HEI, fontSize: 22, color: { $t: 'colors.dim' }, textAlign: 'center', x: 80, y: 1340, width: 920, height: 34, zIndex: 3, editable: { content: true } }
    ]
  },

  // ────────────────────────────────────────────────────────────────
  // 3. 活动日程表（4:5）—— 竖时间轴 + 5 环节行 + 底部地点信息栏
  // ────────────────────────────────────────────────────────────────
  {
    id: 'event-schedule', name: '活动日程表', version: '1.0.0', category: 'event',
    tags: ['event', 'schedule', 'agenda', 'timeline', '4:5'],
    thumbnail: svgUri('<rect width="108" height="135" fill="%23F6F1E8"/><rect x="8" y="9" width="34" height="4" rx="2" fill="%23C2410C"/><rect x="8" y="17" width="56" height="11" rx="1.5" fill="%232A2118"/><rect x="8" y="32" width="44" height="4" rx="1.5" fill="%232A2118" opacity="0.4"/><rect x="24" y="44" width="2" height="66" fill="%232A2118" opacity="0.2"/><g fill="%23C2410C"><circle cx="25" cy="50" r="3"/><circle cx="25" cy="66" r="2.4" fill="%232A2118" opacity="0.3"/><circle cx="25" cy="82" r="2.4" fill="%232A2118" opacity="0.3"/><circle cx="25" cy="98" r="2.4" fill="%232A2118" opacity="0.3"/><circle cx="25" cy="112" r="2.4" fill="%232A2118" opacity="0.3"/></g><g fill="%232A2118"><rect x="32" y="47" width="30" height="5" rx="1"/><rect x="32" y="63" width="26" height="5" rx="1"/><rect x="32" y="79" width="32" height="5" rx="1"/><rect x="32" y="95" width="24" height="5" rx="1"/><rect x="32" y="109" width="28" height="5" rx="1"/></g><g fill="%232A2118" opacity="0.35"><rect x="10" y="47" width="10" height="5" rx="1"/><rect x="10" y="63" width="10" height="5" rx="1"/><rect x="10" y="79" width="10" height="5" rx="1"/><rect x="10" y="95" width="10" height="5" rx="1"/><rect x="10" y="109" width="10" height="5" rx="1"/></g><rect x="8" y="118" width="92" height="12" rx="3" fill="%23C2410C"/><rect x="13" y="122" width="46" height="4" rx="1.5" fill="%23FFFFFF" opacity="0.9"/>', 108, 135),
    tokens: {
      colors: {
        bg: { label: '底色', default: '#F6F1E8', options: ['#F6F1E8', '#EEF3F7', '#F7EDF1', '#E9F2EC'] },
        ink: { label: '主文字', default: '#2A2118', options: ['#2A2118', '#18242E', '#2E1822', '#172A1E'] },
        accent: { label: '强调色', default: '#C2410C', options: ['#C2410C', '#2563EB', '#B8336A', '#1F8A55'] },
        soft: { label: '轴线底', default: '#E4D8C6', options: ['#E4D8C6', '#D6DEE6', '#EAD6DF', '#D3E5D8'] },
        dim: { label: '弱文字', default: '#8C7C66', options: ['#8C7C66', '#6E7C88', '#886E79', '#6E8874'] }
      },
      fonts: { heading: { label: '标题字体', default: HEI, options: [HEI, SONG] } }
    },
    presets: [
      { name: '米纸暖棕', colors: { bg: '#F6F1E8', ink: '#2A2118', accent: '#C2410C', soft: '#E4D8C6', dim: '#8C7C66' } },
      { name: '雾蓝冷灰', colors: { bg: '#EEF3F7', ink: '#18242E', accent: '#2563EB', soft: '#D6DEE6', dim: '#6E7C88' } },
      { name: '藕粉夜话', colors: { bg: '#F7EDF1', ink: '#2E1822', accent: '#B8336A', soft: '#EAD6DF', dim: '#886E79' } },
      { name: '松绿园区', colors: { bg: '#E9F2EC', ink: '#172A1E', accent: '#1F8A55', soft: '#D3E5D8', dim: '#6E8874' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1350, defaultWidth: 1080, defaultHeight: 1350, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'sc-plus', type: 'image', src: plusBg(1080, 1350, 68, 'rgba(127,127,127,0.15)'), x: 0, y: 0, width: 1080, height: 1350, objectFit: 'fill', zIndex: 1 },
      { id: 'sc-eye', type: 'text', content: 'AGENDA · 当天怎么安排', fontFamily: MONO, fontSize: 26, fontWeight: 700, letterSpacing: 4, color: { $t: 'colors.accent' }, x: 80, y: 84, width: 700, height: 38, zIndex: 3, animation: { name: 'fadeIn', duration: 460 }, editable: { content: true } },
      { id: 'sc-title', type: 'text', content: '开放日 · 流程单', fontFamily: { $t: 'fonts.heading' }, fontSize: 88, fontWeight: 900, lineHeight: 1.15, color: { $t: 'colors.ink' }, x: 80, y: 132, width: 920, height: 128, zIndex: 3, animation: { name: 'fadeInUp', duration: 540 }, editable: { content: true, fontSize: { type: 'range', min: 60, max: 104 } } },
      { id: 'sc-date', type: 'text', content: '2026.10.18 周日 13:00—20:00', fontFamily: MONO, fontSize: 30, color: { $t: 'colors.dim' }, x: 80, y: 278, width: 700, height: 42, zIndex: 3, editable: { content: true } },
      // 时间轴主干 + 首环节脉冲环 + 右上角闪烁点
      { id: 'sc-axis', type: 'shape', shapeKind: 'rect', x: 228, y: 356, width: 4, height: 760, borderRadius: 2, fill: { $t: 'colors.soft' }, zIndex: 2, animation: { name: 'fadeIn', duration: 700, delay: 120 } },
      { id: 'sc-blink', type: 'shape', shapeKind: 'circle', x: 980, y: 90, width: 20, height: 20, fill: { $t: 'colors.accent' }, zIndex: 3, animation: { name: 'blink', duration: 1500, iterationCount: 'infinite' } },
      // 环节行 ×5
      { id: 'sc-dot0', group: 'sc-dot', type: 'shape', shapeKind: 'circle', x: 210, y: 374, width: 40, height: 40, fill: { $t: 'colors.accent' }, zIndex: 3 },
      { id: 'sc-pulse0', type: 'shape', shapeKind: 'circle', x: 194, y: 358, width: 72, height: 72, border: { width: 3, color: { $t: 'colors.accent' } }, opacity: 0.5, zIndex: 2, animation: { name: 'ripple', duration: 3600, iterationCount: 'infinite', easing: 'ease-out' } },
      { id: 'sc-time0', type: 'text', content: '13:30', fontFamily: MONO, fontSize: 30, fontWeight: 700, color: { $t: 'colors.ink' }, textAlign: 'right', x: 80, y: 378, width: 110, height: 38, zIndex: 3, editable: { content: true } },
      { id: 'sc-name0', type: 'text', content: '签到与破冰', fontFamily: HEI, fontSize: 44, fontWeight: 700, color: { $t: 'colors.ink' }, x: 290, y: 372, width: 620, height: 58, zIndex: 3, animation: { name: 'slideInLeft', duration: 460, delay: 160 }, editable: { content: true } },
      { id: 'sc-desc0', type: 'text', content: '前台领物料 · 顺手认识两个新朋友', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.dim' }, x: 290, y: 428, width: 620, height: 36, zIndex: 3, editable: { content: true } },
      { id: 'sc-dur0', type: 'text', content: '30 min', fontFamily: MONO, fontSize: 22, color: { $t: 'colors.accent' }, textAlign: 'right', x: 760, y: 380, width: 240, height: 32, zIndex: 3, editable: { content: true } },
      { id: 'sc-dot1', group: 'sc-dot', type: 'shape', shapeKind: 'circle', x: 210, y: 524, width: 40, height: 40, fill: { $t: 'colors.soft' }, border: { width: 3, color: { $t: 'colors.accent' } }, zIndex: 3 },
      { id: 'sc-time1', type: 'text', content: '14:00', fontFamily: MONO, fontSize: 30, fontWeight: 700, color: { $t: 'colors.ink' }, textAlign: 'right', x: 80, y: 528, width: 110, height: 38, zIndex: 3, editable: { content: true } },
      { id: 'sc-name1', type: 'text', content: '主论坛分享', fontFamily: HEI, fontSize: 44, fontWeight: 700, color: { $t: 'colors.ink' }, x: 290, y: 522, width: 620, height: 58, zIndex: 3, animation: { name: 'slideInLeft', duration: 460, delay: 240 }, editable: { content: true } },
      { id: 'sc-desc1', type: 'text', content: '三位一线同事聊聊踩过的坑', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.dim' }, x: 290, y: 578, width: 620, height: 36, zIndex: 3, editable: { content: true } },
      { id: 'sc-dur1', type: 'text', content: '60 min', fontFamily: MONO, fontSize: 22, color: { $t: 'colors.accent' }, textAlign: 'right', x: 760, y: 530, width: 240, height: 32, zIndex: 3, editable: { content: true } },
      { id: 'sc-dot2', group: 'sc-dot', type: 'shape', shapeKind: 'circle', x: 210, y: 674, width: 40, height: 40, fill: { $t: 'colors.soft' }, border: { width: 3, color: { $t: 'colors.accent' } }, zIndex: 3 },
      { id: 'sc-time2', type: 'text', content: '15:10', fontFamily: MONO, fontSize: 30, fontWeight: 700, color: { $t: 'colors.ink' }, textAlign: 'right', x: 80, y: 678, width: 110, height: 38, zIndex: 3, editable: { content: true } },
      { id: 'sc-name2', type: 'text', content: '分组工作坊', fontFamily: HEI, fontSize: 44, fontWeight: 700, color: { $t: 'colors.ink' }, x: 290, y: 672, width: 620, height: 58, zIndex: 3, animation: { name: 'slideInLeft', duration: 460, delay: 320 }, editable: { content: true } },
      { id: 'sc-desc2', type: 'text', content: '四张桌子四个题 · 选一个坐下', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.dim' }, x: 290, y: 728, width: 620, height: 36, zIndex: 3, editable: { content: true } },
      { id: 'sc-dur2', type: 'text', content: '75 min', fontFamily: MONO, fontSize: 22, color: { $t: 'colors.accent' }, textAlign: 'right', x: 760, y: 680, width: 240, height: 32, zIndex: 3, editable: { content: true } },
      { id: 'sc-dot3', group: 'sc-dot', type: 'shape', shapeKind: 'circle', x: 210, y: 824, width: 40, height: 40, fill: { $t: 'colors.soft' }, border: { width: 3, color: { $t: 'colors.accent' } }, zIndex: 3 },
      { id: 'sc-time3', type: 'text', content: '16:30', fontFamily: MONO, fontSize: 30, fontWeight: 700, color: { $t: 'colors.ink' }, textAlign: 'right', x: 80, y: 828, width: 110, height: 38, zIndex: 3, editable: { content: true } },
      { id: 'sc-name3', type: 'text', content: '茶歇与闲聊', fontFamily: HEI, fontSize: 44, fontWeight: 700, color: { $t: 'colors.ink' }, x: 290, y: 822, width: 620, height: 58, zIndex: 3, animation: { name: 'slideInLeft', duration: 460, delay: 400 }, editable: { content: true } },
      { id: 'sc-desc3', type: 'text', content: '有点心和咖啡 · 也有交换名片的借口', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.dim' }, x: 290, y: 878, width: 620, height: 36, zIndex: 3, editable: { content: true } },
      { id: 'sc-dur3', type: 'text', content: '40 min', fontFamily: MONO, fontSize: 22, color: { $t: 'colors.accent' }, textAlign: 'right', x: 760, y: 830, width: 240, height: 32, zIndex: 3, editable: { content: true } },
      { id: 'sc-dot4', group: 'sc-dot', type: 'shape', shapeKind: 'circle', x: 210, y: 974, width: 40, height: 40, fill: { $t: 'colors.soft' }, border: { width: 3, color: { $t: 'colors.accent' } }, zIndex: 3 },
      { id: 'sc-time4', type: 'text', content: '17:10', fontFamily: MONO, fontSize: 30, fontWeight: 700, color: { $t: 'colors.ink' }, textAlign: 'right', x: 80, y: 978, width: 110, height: 38, zIndex: 3, editable: { content: true } },
      { id: 'sc-name4', type: 'text', content: '闭门答疑', fontFamily: HEI, fontSize: 44, fontWeight: 700, color: { $t: 'colors.ink' }, x: 290, y: 972, width: 620, height: 58, zIndex: 3, animation: { name: 'slideInLeft', duration: 460, delay: 480 }, editable: { content: true } },
      { id: 'sc-desc4', type: 'text', content: '问题收集箱现场拆 · 答不上来就带走', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.dim' }, x: 290, y: 1028, width: 620, height: 36, zIndex: 3, editable: { content: true } },
      { id: 'sc-dur4', type: 'text', content: '50 min', fontFamily: MONO, fontSize: 22, color: { $t: 'colors.accent' }, textAlign: 'right', x: 760, y: 980, width: 240, height: 32, zIndex: 3, editable: { content: true } },
      { id: 'sc-note', type: 'text', content: '全程不直播 · 来了才有', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.dim' }, x: 80, y: 1096, width: 700, height: 36, zIndex: 3, editable: { content: true } },
      // 地点信息栏
      { id: 'sc-loc', type: 'shape', shapeKind: 'rect', x: 80, y: 1160, width: 920, height: 120, borderRadius: 20, fill: { $t: 'colors.accent' }, zIndex: 2, animation: { name: 'fadeInUp', duration: 520, delay: 520 } },
      { id: 'sc-loc1', type: 'text', content: '地址 · 拱墅区运河东路 88 号 3 号楼', fontFamily: HEI, fontSize: 30, fontWeight: 700, color: { $t: 'colors.bg' }, x: 112, y: 1184, width: 856, height: 42, zIndex: 3, editable: { content: true } },
      { id: 'sc-loc2', type: 'text', content: '地铁 5 号线运河广场站 C 口 · 步行 6 分钟', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.bg' }, opacity: 0.9, x: 112, y: 1230, width: 856, height: 36, zIndex: 3, editable: { content: true } }
    ]
  },

  // ────────────────────────────────────────────────────────────────
  // 4. 线下沙龙报名卡（9:16）—— 名额进度条 + 信息三行 + 扫码虚线位 + 截止日期
  // ────────────────────────────────────────────────────────────────
  {
    id: 'event-salon-signup', name: '线下沙龙报名卡', version: '1.0.0', category: 'event',
    tags: ['event', 'salon', 'signup', 'poster', '9:16'],
    thumbnail: svgUri('<rect width="108" height="192" fill="%230F1B2D"/><rect x="9" y="14" width="34" height="4" rx="2" fill="%234CC9F0"/><rect x="64" y="12" width="30" height="9" rx="4.5" fill="%234CC9F0"/><rect x="9" y="26" width="60" height="10" rx="1.5" fill="%23EAF2FB"/><rect x="9" y="40" width="40" height="10" rx="1.5" fill="%23EAF2FB" opacity="0.85"/><rect x="9" y="58" width="90" height="4" rx="1.5" fill="%23EAF2FB" opacity="0.18"/><rect x="9" y="58" width="58" height="4" rx="1.5" fill="%234CC9F0"/><rect x="9" y="70" width="90" height="3" rx="1" fill="%23EAF2FB" opacity="0.12"/><g fill="%23EAF2FB" opacity="0.55"><rect x="9" y="84" width="14" height="4" rx="1"/><rect x="30" y="84" width="40" height="4" rx="1"/><rect x="9" y="96" width="14" height="4" rx="1"/><rect x="30" y="96" width="52" height="4" rx="1"/><rect x="9" y="108" width="14" height="4" rx="1"/><rect x="30" y="108" width="46" height="4" rx="1"/></g><rect x="34" y="122" width="40" height="40" rx="3" fill="none" stroke="%23EAF2FB" stroke-width="1.4" stroke-dasharray="4 3"/><rect x="44" y="132" width="20" height="20" rx="2" fill="%23EAF2FB" opacity="0.12"/><rect x="9" y="168" width="90" height="16" rx="4" fill="%234CC9F0"/><rect x="18" y="174" width="52" height="5" rx="2" fill="%230F1B2D"/><rect x="9" y="186" width="90" height="3" rx="1.5" fill="%23EAF2FB" opacity="0.2"/>', 108, 192),
    tokens: {
      colors: {
        bg: { label: '底色', default: '#0F1B2D', options: ['#0F1B2D', '#1B1426', '#10231E', '#251A12'] },
        ink: { label: '主文字', default: '#EAF2FB', options: ['#EAF2FB', '#F4EAFB', '#E7F5EF', '#FBEEDF'] },
        accent: { label: '强调色', default: '#4CC9F0', options: ['#4CC9F0', '#C77DFF', '#38D9A9', '#FFB703'] },
        soft: { label: '进度条底', default: '#1E3350', options: ['#1E3350', '#312244', '#1D3A31', '#3B2A1A'] },
        dim: { label: '弱文字', default: '#8CA3C0', options: ['#8CA3C0', '#A98CC6', '#7FA896', '#C0A183'] }
      },
      fonts: { heading: { label: '标题字体', default: HEI, options: [HEI, SONG] } }
    },
    presets: [
      { name: '午夜青', colors: { bg: '#0F1B2D', ink: '#EAF2FB', accent: '#4CC9F0', soft: '#1E3350', dim: '#8CA3C0' } },
      { name: '暗紫酒馆', colors: { bg: '#1B1426', ink: '#F4EAFB', accent: '#C77DFF', soft: '#312244', dim: '#A98CC6' } },
      { name: '森林夜话', colors: { bg: '#10231E', ink: '#E7F5EF', accent: '#38D9A9', soft: '#1D3A31', dim: '#7FA896' } },
      { name: '焦糖书屋', colors: { bg: '#251A12', ink: '#FBEEDF', accent: '#FFB703', soft: '#3B2A1A', dim: '#C0A183' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1920, defaultWidth: 1080, defaultHeight: 1920, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'sl-dots', type: 'image', src: dotsBg(1080, 1920, 56, 'rgba(127,127,127,0.16)'), x: 0, y: 0, width: 1080, height: 1920, objectFit: 'fill', zIndex: 1 },
      { id: 'sl-eye', type: 'text', content: 'SALON #14 · 城市闭门场', fontFamily: MONO, fontSize: 30, fontWeight: 700, letterSpacing: 5, color: { $t: 'colors.accent' }, x: 80, y: 100, width: 700, height: 42, zIndex: 3, animation: { name: 'fadeIn', duration: 460 }, editable: { content: true } },
      { id: 'sl-hot', type: 'shape', shapeKind: 'rect', x: 840, y: 96, width: 160, height: 64, borderRadius: 999, fill: { $t: 'colors.accent' }, zIndex: 3, animation: { name: 'pulse', duration: 2000, iterationCount: 'infinite' } },
      { id: 'sl-hot-t', type: 'text', content: '名额有限', fontFamily: HEI, fontSize: 26, fontWeight: 700, color: { $t: 'colors.bg' }, textAlign: 'center', x: 840, y: 112, width: 160, height: 36, zIndex: 4, editable: { content: true } },
      { id: 'sl-title', type: 'text', content: '小局闭门\n聊点真的', fontFamily: { $t: 'fonts.heading' }, fontSize: 110, fontWeight: 900, lineHeight: 1.16, color: { $t: 'colors.ink' }, x: 80, y: 190, width: 920, height: 272, zIndex: 3, animation: { name: 'fadeInUp', duration: 560 }, editable: { content: true, fontSize: { type: 'range', min: 76, max: 128 } } },
      { id: 'sl-sub', type: 'text', content: '本期主题：把私域这件事聊明白', fontFamily: HEI, fontSize: 30, color: { $t: 'colors.dim' }, x: 80, y: 498, width: 920, height: 44, zIndex: 3, editable: { content: true } },
      // 名额进度条
      { id: 'sl-pg-l', type: 'text', content: '报名进度', fontFamily: HEI, fontSize: 30, fontWeight: 700, color: { $t: 'colors.ink' }, x: 80, y: 592, width: 300, height: 42, zIndex: 3, editable: { content: true } },
      { id: 'sl-pg-r', type: 'text', content: '已报 68 / 100 席', fontFamily: MONO, fontSize: 30, fontWeight: 700, color: { $t: 'colors.accent' }, textAlign: 'right', x: 520, y: 592, width: 480, height: 42, zIndex: 3, editable: { content: true } },
      { id: 'sl-track', type: 'shape', shapeKind: 'rect', x: 80, y: 660, width: 920, height: 30, borderRadius: 999, fill: { $t: 'colors.soft' }, zIndex: 2 },
      { id: 'sl-fill', type: 'shape', shapeKind: 'rect', x: 80, y: 660, width: 624, height: 30, borderRadius: 999, fill: { $t: 'colors.accent' }, zIndex: 3, animation: { name: 'slideInLeft', duration: 700, delay: 200 } },
      { id: 'sl-knob', type: 'shape', shapeKind: 'circle', x: 686, y: 654, width: 42, height: 42, fill: { $t: 'colors.bg' }, border: { width: 5, color: { $t: 'colors.accent' } }, zIndex: 4, animation: { name: 'pulse', duration: 2200, iterationCount: 'infinite' } },
      { id: 'sl-pg-note', type: 'text', content: '还剩 32 个位子 · 手慢无', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.dim' }, x: 80, y: 716, width: 700, height: 38, zIndex: 3, editable: { content: true } },
      // 信息三行：标签 + 内容
      { id: 'sl-k0', type: 'text', content: '时间', fontFamily: HEI, fontSize: 26, fontWeight: 700, color: { $t: 'colors.dim' }, x: 80, y: 806, width: 150, height: 36, zIndex: 3, editable: { content: true } },
      { id: 'sl-v0', type: 'text', content: '10 月 24 日（周六）14:00—17:00', fontFamily: HEI, fontSize: 30, color: { $t: 'colors.ink' }, x: 250, y: 802, width: 670, height: 44, zIndex: 3, animation: { name: 'fadeIn', duration: 460, delay: 260 }, editable: { content: true } },
      { id: 'sl-k1', type: 'text', content: '地点', fontFamily: HEI, fontSize: 26, fontWeight: 700, color: { $t: 'colors.dim' }, x: 80, y: 886, width: 150, height: 36, zIndex: 3, editable: { content: true } },
      { id: 'sl-v1', type: 'text', content: '山栖咖啡 2F · 西湖区文三路 88 号', fontFamily: HEI, fontSize: 30, color: { $t: 'colors.ink' }, x: 250, y: 882, width: 670, height: 44, zIndex: 3, animation: { name: 'fadeIn', duration: 460, delay: 340 }, editable: { content: true } },
      { id: 'sl-k2', type: 'text', content: '适合谁', fontFamily: HEI, fontSize: 26, fontWeight: 700, color: { $t: 'colors.dim' }, x: 80, y: 966, width: 150, height: 36, zIndex: 3, editable: { content: true } },
      { id: 'sl-v2', type: 'text', content: '做私域 / 社群 / 门店内容的人都算', fontFamily: HEI, fontSize: 30, color: { $t: 'colors.ink' }, x: 250, y: 962, width: 670, height: 44, zIndex: 3, animation: { name: 'fadeIn', duration: 460, delay: 420 }, editable: { content: true } },
      // 扫码位
      { id: 'sl-qr', type: 'shape', shapeKind: 'rect', x: 340, y: 1080, width: 400, height: 400, borderRadius: 24, border: { width: 6, style: 'dashed', color: { $t: 'colors.ink' } }, zIndex: 3, animation: { name: 'zoomIn', duration: 520, delay: 300 } },
      { id: 'sl-qr-t', type: 'text', content: '这里放报名二维码', imageSlot: 'sl-qr', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.dim' }, textAlign: 'center', x: 340, y: 1264, width: 400, height: 38, zIndex: 4, editable: { content: true } },
      { id: 'sl-qr-note', type: 'text', content: '扫码进群占位 · 或直接私信主页', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.dim' }, textAlign: 'center', x: 80, y: 1520, width: 920, height: 38, zIndex: 3, editable: { content: true } },
      // 截止日期条
      { id: 'sl-dl', type: 'shape', shapeKind: 'rect', x: 80, y: 1600, width: 920, height: 132, borderRadius: 24, fill: { $t: 'colors.accent' }, zIndex: 2, animation: { name: 'fadeInUp', duration: 520, delay: 380 } },
      { id: 'sl-dl-t', type: 'text', content: '报名截止 10 月 20 日 23:59', fontFamily: HEI, fontSize: 40, fontWeight: 700, color: { $t: 'colors.bg' }, textAlign: 'center', x: 80, y: 1626, width: 920, height: 52, zIndex: 3, editable: { content: true } },
      { id: 'sl-dl-s', type: 'text', content: '过期不候 · 现场见', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.bg' }, opacity: 0.9, textAlign: 'center', x: 80, y: 1686, width: 920, height: 36, zIndex: 3, editable: { content: true } },
      { id: 'sl-foot', type: 'text', content: '主理人：阿岩 · 上一场只来了 9 个人', fontFamily: HEI, fontSize: 22, color: { $t: 'colors.dim' }, textAlign: 'center', x: 80, y: 1790, width: 920, height: 34, zIndex: 3, editable: { content: true } }
    ]
  },

  // ────────────────────────────────────────────────────────────────
  // 5. 店铺开业公告（1:1）—— GRAND OPENING + 福利三段 + 地址电话栏
  // ────────────────────────────────────────────────────────────────
  {
    id: 'event-grand-opening', name: '店铺开业公告', version: '1.0.0', category: 'event',
    tags: ['event', 'opening', 'store', 'announce', '1:1'],
    thumbnail: svgUri('<rect width="108" height="108" fill="%23FFF4D9"/><rect x="8" y="10" width="38" height="4" rx="2" fill="%23D62828"/><rect x="8" y="19" width="50" height="7" rx="1" fill="%232B1A12"/><rect x="8" y="28" width="62" height="7" rx="1" fill="%232B1A12"/><rect x="8" y="42" width="42" height="6" rx="1" fill="%232B1A12" opacity="0.7"/><g fill="%23D62828"><rect x="8" y="56" width="6" height="6" rx="1"/><rect x="8" y="68" width="6" height="6" rx="1"/><rect x="8" y="80" width="6" height="6" rx="1"/></g><g fill="%232B1A12"><rect x="20" y="56" width="46" height="5" rx="1"/><rect x="20" y="68" width="52" height="5" rx="1"/><rect x="20" y="80" width="40" height="5" rx="1"/></g><rect x="8" y="90" width="92" height="14" rx="3" fill="%232B1A12"/><g fill="%23FFF4D9" opacity="0.85"><rect x="14" y="93" width="40" height="3.4" rx="1"/><rect x="14" y="98" width="56" height="3" rx="1" opacity="0.7"/></g><circle cx="94" cy="18" r="4" fill="%23D62828" opacity="0.7"/><circle cx="84" cy="30" r="2.4" fill="%23D62828" opacity="0.5"/>', 108, 108),
    tokens: {
      colors: {
        bg: { label: '底色', default: '#FFF4D9', options: ['#FFF4D9', '#E9F4FF', '#FDE7EC', '#EAF6EC'] },
        ink: { label: '主文字', default: '#2B1A12', options: ['#2B1A12', '#122031', '#31121C', '#14291A'] },
        accent: { label: '强调色', default: '#D62828', options: ['#D62828', '#1D7AE5', '#E85D9E', '#1F8A55'] },
        soft: { label: '分隔线', default: '#F4DFB4', options: ['#F4DFB4', '#CFE1F5', '#F6CFDA', '#CDE9D3'] },
        dim: { label: '弱文字', default: '#A67F55', options: ['#A67F55', '#6E86A0', '#A66E7C', '#6E9A78'] }
      },
      fonts: { heading: { label: '标题字体', default: IMPACT, options: [IMPACT, HEI, SONG] } }
    },
    presets: [
      { name: '奶油红旗', colors: { bg: '#FFF4D9', ink: '#2B1A12', accent: '#D62828', soft: '#F4DFB4', dim: '#A67F55' } },
      { name: '冰蓝招牌', colors: { bg: '#E9F4FF', ink: '#122031', accent: '#1D7AE5', soft: '#CFE1F5', dim: '#6E86A0' } },
      { name: '粉底甜点', colors: { bg: '#FDE7EC', ink: '#31121C', accent: '#E85D9E', soft: '#F6CFDA', dim: '#A66E7C' } },
      { name: '薄荷杂货', colors: { bg: '#EAF6EC', ink: '#14291A', accent: '#1F8A55', soft: '#CDE9D3', dim: '#6E9A78' } }
    ],
    canvas: { virtualWidth: 1080, virtualHeight: 1080, defaultWidth: 1080, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'go-dots', type: 'image', src: dotsBg(1080, 1080, 54, 'rgba(127,127,127,0.15)'), x: 0, y: 0, width: 1080, height: 1080, objectFit: 'fill', zIndex: 1 },
      { id: 'go-spark1', type: 'shape', shapeKind: 'circle', x: 940, y: 62, width: 28, height: 28, fill: { $t: 'colors.accent' }, zIndex: 3, animation: { name: 'twinkle', duration: 2600, iterationCount: 'infinite' } },
      { id: 'go-spark2', type: 'shape', shapeKind: 'circle', x: 884, y: 120, width: 16, height: 16, fill: { $t: 'colors.soft' }, zIndex: 3, animation: { name: 'twinkle', duration: 2600, delay: 700, iterationCount: 'infinite' } },
      { id: 'go-eye', type: 'text', content: 'NEW STORE · 城市首店 NO.018', fontFamily: MONO, fontSize: 26, fontWeight: 700, letterSpacing: 6, color: { $t: 'colors.accent' }, x: 80, y: 64, width: 760, height: 38, zIndex: 3, animation: { name: 'fadeIn', duration: 460 }, editable: { content: true } },
      { id: 'go-big', type: 'text', content: 'GRAND\nOPENING', fontFamily: { $t: 'fonts.heading' }, fontSize: 130, fontWeight: 400, lineHeight: 1, letterSpacing: 2, color: { $t: 'colors.ink' }, x: 80, y: 112, width: 920, height: 292, zIndex: 3, animation: { name: 'fadeInUp', duration: 560 }, editable: { content: true, fontSize: { type: 'range', min: 96, max: 150 } } },
      { id: 'go-cn', type: 'text', content: '今天，我们开业啦', fontFamily: HEI, fontSize: 44, fontWeight: 900, color: { $t: 'colors.ink' }, x: 80, y: 424, width: 920, height: 62, zIndex: 3, animation: { name: 'fadeIn', duration: 520, delay: 200 }, editable: { content: true, fontSize: { type: 'range', min: 32, max: 56 } } },
      // 开业福利三段
      { id: 'go-n0', type: 'text', content: '01', fontFamily: MONO, fontSize: 30, fontWeight: 700, color: { $t: 'colors.accent' }, x: 80, y: 515, width: 90, height: 40, zIndex: 3, editable: { content: true } },
      { id: 'go-b0', type: 'text', content: '全场 8 折 · 到店再送帆布袋', fontFamily: HEI, fontSize: 34, color: { $t: 'colors.ink' }, x: 190, y: 512, width: 730, height: 46, zIndex: 3, animation: { name: 'rise', duration: 520 }, editable: { content: true } },
      { id: 'go-l0', group: 'go-l', type: 'shape', shapeKind: 'rect', x: 80, y: 570, width: 920, height: 2, fill: { $t: 'colors.soft' }, zIndex: 2 },
      { id: 'go-n1', type: 'text', content: '02', fontFamily: MONO, fontSize: 30, fontWeight: 700, color: { $t: 'colors.accent' }, x: 80, y: 591, width: 90, height: 40, zIndex: 3, editable: { content: true } },
      { id: 'go-b1', type: 'text', content: '充值 500 送 200 · 全年不过期', fontFamily: HEI, fontSize: 34, color: { $t: 'colors.ink' }, x: 190, y: 588, width: 730, height: 46, zIndex: 3, animation: { name: 'rise', duration: 520, delay: 120 }, editable: { content: true } },
      { id: 'go-l1', group: 'go-l', type: 'shape', shapeKind: 'rect', x: 80, y: 646, width: 920, height: 2, fill: { $t: 'colors.soft' }, zIndex: 2 },
      { id: 'go-n2', type: 'text', content: '03', fontFamily: MONO, fontSize: 30, fontWeight: 700, color: { $t: 'colors.accent' }, x: 80, y: 667, width: 90, height: 40, zIndex: 3, editable: { content: true } },
      { id: 'go-b2', type: 'text', content: '转发本文到店 · 领手冲一杯', fontFamily: HEI, fontSize: 34, color: { $t: 'colors.ink' }, x: 190, y: 664, width: 730, height: 46, zIndex: 3, animation: { name: 'rise', duration: 520, delay: 240 }, editable: { content: true } },
      { id: 'go-l2', group: 'go-l', type: 'shape', shapeKind: 'rect', x: 80, y: 722, width: 920, height: 2, fill: { $t: 'colors.soft' }, zIndex: 2 },
      // 地址 / 电话 / 营业时间栏
      { id: 'go-info', type: 'shape', shapeKind: 'rect', x: 80, y: 758, width: 920, height: 258, borderRadius: 24, fill: { $t: 'colors.ink' }, zIndex: 2, animation: { name: 'fadeInUp', duration: 520, delay: 320 } },
      { id: 'go-i0', type: 'text', content: '地址：静安区南京西路 1618 号 1F', fontFamily: HEI, fontSize: 30, fontWeight: 700, color: { $t: 'colors.bg' }, x: 112, y: 790, width: 856, height: 42, zIndex: 3, editable: { content: true } },
      { id: 'go-i1', type: 'text', content: '电话：021-6288 1618 · 前台', fontFamily: HEI, fontSize: 30, color: { $t: 'colors.bg' }, opacity: 0.92, x: 112, y: 856, width: 856, height: 42, zIndex: 3, editable: { content: true } },
      { id: 'go-i2', type: 'text', content: '营业时间 09:00—21:00 · 周一不歇', fontFamily: HEI, fontSize: 30, color: { $t: 'colors.bg' }, opacity: 0.92, x: 112, y: 922, width: 856, height: 42, zIndex: 3, editable: { content: true } },
      { id: 'go-tag', type: 'text', content: '停车：西巷车库首两小时免费', fontFamily: HEI, fontSize: 22, color: { $t: 'colors.bg' }, opacity: 0.7, x: 112, y: 976, width: 856, height: 32, zIndex: 3, editable: { content: true } }
    ]
  },

  // ────────────────────────────────────────────────────────────────
  // 6. 周年庆海报（16:9）—— 巨大周年数字 + 感谢数据条 + 未来宣言
  // ────────────────────────────────────────────────────────────────
  {
    id: 'event-anniversary', name: '周年庆海报', version: '1.0.0', category: 'event',
    tags: ['event', 'anniversary', 'milestone', 'poster', '16:9'],
    thumbnail: svgUri('<rect width="160" height="90" fill="%23160F2B"/><circle cx="42" cy="46" r="30" fill="none" stroke="%23F6C445" stroke-width="1.4" opacity="0.45"/><text x="16" y="60" font-family="Impact,sans-serif" font-size="42" fill="%23F5F1E8">10</text><rect x="14" y="66" width="40" height="5" rx="2" fill="%23F6C445"/><rect x="92" y="12" width="54" height="4" rx="2" fill="%23F6C445"/><rect x="92" y="22" width="60" height="8" rx="1" fill="%23F5F1E8"/><rect x="92" y="34" width="44" height="8" rx="1" fill="%23F5F1E8" opacity="0.8"/><rect x="92" y="50" width="60" height="2" rx="1" fill="%23F5F1E8" opacity="0.25"/><g fill="%23F6C445"><rect x="92" y="58" width="16" height="9" rx="1"/><rect x="118" y="58" width="14" height="9" rx="1"/><rect x="140" y="58" width="12" height="9" rx="1"/></g><g fill="%23F5F1E8" opacity="0.4"><rect x="92" y="71" width="18" height="3.4" rx="1"/><rect x="118" y="71" width="16" height="3.4" rx="1"/><rect x="140" y="71" width="14" height="3.4" rx="1"/></g><rect x="92" y="80" width="52" height="4" rx="2" fill="%23F5F1E8" opacity="0.6"/>', 160, 90),
    tokens: {
      colors: {
        bg: { label: '底色', default: '#160F2B', options: ['#160F2B', '#0B1F1A', '#2A1113', '#F7F3EA'] },
        ink: { label: '主文字', default: '#F5F1E8', options: ['#F5F1E8', '#E6F2EC', '#FAEAEA', '#1F1A12'] },
        accent: { label: '庆典金', default: '#F6C445', options: ['#F6C445', '#38D9A9', '#FF6B6B', '#C2410C'] },
        soft: { label: '网格线', default: '#2C2150', options: ['#2C2150', '#153A31', '#462226', '#E2D9C4'] },
        dim: { label: '弱文字', default: '#A99BC9', options: ['#A99BC9', '#84AFA0', '#C69AA0', '#7A6C55'] }
      },
      fonts: { heading: { label: '标题字体', default: HEI, options: [HEI, SONG] } }
    },
    presets: [
      { name: '夜宴金', colors: { bg: '#160F2B', ink: '#F5F1E8', accent: '#F6C445', soft: '#2C2150', dim: '#A99BC9' } },
      { name: '松林翡翠', colors: { bg: '#0B1F1A', ink: '#E6F2EC', accent: '#38D9A9', soft: '#153A31', dim: '#84AFA0' } },
      { name: '绛红蜡烛', colors: { bg: '#2A1113', ink: '#FAEAEA', accent: '#FF6B6B', soft: '#462226', dim: '#C69AA0' } },
      { name: '素纸赭石', colors: { bg: '#F7F3EA', ink: '#1F1A12', accent: '#C2410C', soft: '#E2D9C4', dim: '#7A6C55' } }
    ],
    canvas: { virtualWidth: 1920, virtualHeight: 1080, defaultWidth: 1920, defaultHeight: 1080, backgroundColor: { $t: 'colors.bg' } },
    elements: [
      { id: 'an-grid', type: 'image', src: gridBg(1920, 1080, 80, 'rgba(127,127,127,0.12)'), x: 0, y: 0, width: 1920, height: 1080, objectFit: 'fill', zIndex: 1 },
      { id: 'an-ring', type: 'shape', shapeKind: 'circle', x: 90, y: 150, width: 640, height: 640, border: { width: 4, color: { $t: 'colors.accent' } }, opacity: 0.4, zIndex: 2, animation: { name: 'ripple', duration: 5200, iterationCount: 'infinite', easing: 'ease-out' } },
      { id: 'an-spark', type: 'shape', shapeKind: 'circle', x: 690, y: 140, width: 54, height: 54, fill: { $t: 'colors.accent' }, opacity: 0.85, zIndex: 4, animation: { name: 'float', duration: 4600, iterationCount: 'infinite' } },
      // 左侧：巨大周年数字 + 起止年 + 现场见胶囊
      { id: 'an-num', type: 'text', content: '10', fontFamily: IMPACT, fontSize: 560, fontWeight: 400, lineHeight: 1, color: { $t: 'colors.ink' }, x: 120, y: 200, width: 780, height: 470, zIndex: 3, animation: { name: 'zoomIn', duration: 620 }, editable: { content: true, fontSize: { type: 'range', min: 360, max: 640 } } },
      { id: 'an-cap', type: 'text', content: '周年 · 2016—2026', fontFamily: HEI, fontSize: 44, fontWeight: 700, color: { $t: 'colors.accent' }, x: 120, y: 700, width: 780, height: 58, zIndex: 3, animation: { name: 'fadeInUp', duration: 520, delay: 220 }, editable: { content: true } },
      { id: 'an-pill', type: 'shape', shapeKind: 'rect', x: 120, y: 850, width: 440, height: 100, borderRadius: 999, fill: { $t: 'colors.accent' }, zIndex: 3, animation: { name: 'fadeInUp', duration: 520, delay: 420 } },
      { id: 'an-pill-t', type: 'text', content: '10.18 现场见', fontFamily: HEI, fontSize: 34, fontWeight: 700, color: { $t: 'colors.bg' }, textAlign: 'center', x: 120, y: 878, width: 440, height: 46, zIndex: 4, editable: { content: true } },
      // 右侧：刊头 + 宣言标题
      { id: 'an-eye', type: 'text', content: '10TH ANNIVERSARY · 感谢在场', fontFamily: MONO, fontSize: 30, fontWeight: 700, letterSpacing: 5, color: { $t: 'colors.accent' }, x: 1000, y: 112, width: 800, height: 42, zIndex: 3, animation: { name: 'fadeIn', duration: 480 }, editable: { content: true } },
      { id: 'an-title', type: 'text', content: '下一个十年\n换个更慢的活法', fontFamily: { $t: 'fonts.heading' }, fontSize: 96, fontWeight: 900, lineHeight: 1.16, color: { $t: 'colors.ink' }, x: 1000, y: 176, width: 800, height: 252, zIndex: 3, animation: { name: 'fadeInUp', duration: 560, delay: 140 }, editable: { content: true, fontSize: { type: 'range', min: 64, max: 104 } } },
      { id: 'an-rule', type: 'shape', shapeKind: 'rect', x: 1000, y: 452, width: 120, height: 6, borderRadius: 3, fill: { $t: 'colors.accent' }, zIndex: 3, animation: { name: 'slideInLeft', duration: 520, delay: 260 } },
      // 感谢数据条 3 组
      { id: 'an-s0v', type: 'text', content: '120 万+', fontFamily: IMPACT, fontSize: 56, fontWeight: 400, color: { $t: 'colors.ink' }, x: 1000, y: 500, width: 260, height: 66, zIndex: 3, animation: { name: 'slideUpFade', duration: 520, delay: 320 }, editable: { content: true } },
      { id: 'an-s0l', type: 'text', content: '服务用户', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.dim' }, x: 1000, y: 570, width: 260, height: 36, zIndex: 3, editable: { content: true } },
      { id: 'an-s1v', type: 'text', content: '42 城', fontFamily: IMPACT, fontSize: 56, fontWeight: 400, color: { $t: 'colors.ink' }, x: 1280, y: 500, width: 260, height: 66, zIndex: 3, animation: { name: 'slideUpFade', duration: 520, delay: 400 }, editable: { content: true } },
      { id: 'an-s1l', type: 'text', content: '覆盖城市', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.dim' }, x: 1280, y: 570, width: 260, height: 36, zIndex: 3, editable: { content: true } },
      { id: 'an-s2v', type: 'text', content: '340 场', fontFamily: IMPACT, fontSize: 56, fontWeight: 400, color: { $t: 'colors.ink' }, x: 1560, y: 500, width: 260, height: 66, zIndex: 3, animation: { name: 'slideUpFade', duration: 520, delay: 480 }, editable: { content: true } },
      { id: 'an-s2l', type: 'text', content: '线下场次', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.dim' }, x: 1560, y: 570, width: 260, height: 36, zIndex: 3, editable: { content: true } },
      // 未来宣言 + 署名
      { id: 'an-future', type: 'text', content: '第 11 年，我们把「慢一点」写进 OKR', fontFamily: HEI, fontSize: 34, fontWeight: 700, color: { $t: 'colors.ink' }, x: 1000, y: 660, width: 800, height: 48, zIndex: 3, animation: { name: 'fadeIn', duration: 520, delay: 560 }, editable: { content: true } },
      { id: 'an-future2', type: 'text', content: '不追风口 · 只追把东西做扎实', fontFamily: HEI, fontSize: 26, color: { $t: 'colors.dim' }, x: 1000, y: 726, width: 800, height: 38, zIndex: 3, editable: { content: true } },
      { id: 'an-sign', type: 'text', content: '—— 全体 42 位同事 敬上', fontFamily: SONG, fontSize: 26, color: { $t: 'colors.dim' }, textAlign: 'right', x: 1000, y: 850, width: 800, height: 38, zIndex: 3, animation: { name: 'fadeIn', duration: 620, delay: 700 }, editable: { content: true } }
    ]
  }
]

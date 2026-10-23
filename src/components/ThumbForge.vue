<template>
  <!-- 离屏渲染炉：把模板按真实渲染器画一遍再截图，缩略图因此与成品 100% 同源。
       移到视口外而非 display:none——后者会让节点没有布局盒，截图库拿不到尺寸。
       注意：canvasRootRef 必须长期保持同一个 DOM 节点（故渲染器不用 v-if 卸载），
       否则复用截图上下文会克隆到已被卸载的旧节点。 -->
  <div class="thumb-forge" aria-hidden="true">
    <TemplateRenderer
      ref="forgeRenderer"
      :template="resolved"
      :scale="1"
      :offset-x="0"
      :offset-y="0"
      :view-width="size.w"
      :view-height="size.h"
      :selected-ids="[]"
      :freeze="true"
    />
  </div>
</template>

<script setup lang="ts">
// src/components/ThumbForge.vue —— 方案 A：用真实渲染器生成缩略图
//
// 手绘 SVG 缩略图与真实渲染天然会漂移（画的人按"设计意图"画，渲染器按"代码实际行为"画）。
// 这里直接复用编辑器同一个 TemplateRenderer + 同一个 modern-screenshot 管线截图，
// 缩略图与导出成品同源，从根上消除漂移。
//
// 性能/体验两条硬约束（都是实测踩过的坑）：
// ① 渲染尺寸必须压到卡片够用就行（RENDER_MAX）。按模板原生尺寸（1800×1350 之类）渲染再缩，
//    等于每次都要完整布局+绘制一张巨图，主线程被连续占住 → Windows 上表现为鼠标指针一直闪。
// ② 截图上下文要复用。modern-screenshot 每次 domToWebp(node) 都会新建一个 iframe 承载克隆节点，
//    iframe 反复创建/销毁会抢一下窗口焦点，这就是"载入后光标一阵阵闪"的直接来源。
//    createContext(..., { autoDestruct: false }) 建的上下文会在每次截图时重新克隆 context.node，
//    所以按尺寸缓存后复用是安全的（见下方 sameAsPrev 兜底）。
import { computed, nextTick, onBeforeUnmount, ref } from 'vue'
import { createContext, destroyContext, domToJpeg, domToWebp, type Context } from 'modern-screenshot'
import TemplateRenderer from '@/components/TemplateRenderer.vue'
import { resolveTemplate } from '@/core/engine/resolver'
import type { ResolvedTemplate, Template } from '@/types/types'

// 与 App.vue 的 DEFAULT_SEED 保持一致：缩略图展示的就是「未随机化」的默认那一版。
// （App.vue 里该常量是模块内局部量，这里复制一份；若将来改动请两处同步。）
const DEFAULT_SEED = 'cover-maker-2026'
/** 渲染 + 出图的长边像素：卡片实际显示约 100~200px，400 足够，再大纯属浪费 */
const RENDER_MAX = 400

const current = ref<Template | null>(null)
const forgeRenderer = ref<InstanceType<typeof TemplateRenderer> | null>(null)

// 空占位模板：渲染器必须常驻（见模板注释），首帧还没有目标模板时用它顶上。
const EMPTY_TPL = {
  id: '__forge_empty__', name: '', category: 'simple', thumbnail: '',
  canvas: { defaultWidth: 400, defaultHeight: 400, backgroundColor: '#ffffff' },
  tokens: {}, elements: [],
} as unknown as ResolvedTemplate

const resolved = computed(() => (current.value ? resolveTemplate(current.value, DEFAULT_SEED) : EMPTY_TPL))

const size = computed(() => {
  const c = resolved.value?.canvas as { defaultWidth?: number; virtualWidth?: number; defaultHeight?: number; virtualHeight?: number } | undefined
  const w = c?.defaultWidth || c?.virtualWidth || 1080
  const h = c?.defaultHeight || c?.virtualHeight || 1350
  const k = Math.min(1, RENDER_MAX / Math.max(w, h))
  return { w: Math.max(1, Math.round(w * k)), h: Math.max(1, Math.round(h * k)) }
})

function settle(): Promise<void> {
  // 两帧：第一帧让 Vue 的 DOM 更新落地，第二帧确保浏览器完成一次布局+绘制
  return new Promise((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
  })
}

// 图片（模板里的装饰大量是 data URI 的 SVG）是异步 decode 的，没等到就截图会留下空洞，
// 而这个洞会被当成"设计本来如此"固化进缩略图。故截图前显式等所有 img 落定。
function waitImages(node: HTMLElement): Promise<void> {
  const imgs = Array.from(node.querySelectorAll('img'))
  if (!imgs.length) return Promise.resolve()
  return Promise.all(
    imgs.map((img) =>
      img.complete
        ? Promise.resolve()
        : new Promise<void>((resolve) => {
            img.addEventListener('load', () => resolve(), { once: true })
            img.addEventListener('error', () => resolve(), { once: true })
          }),
    ),
  ).then(() => undefined)
}

// ===== 复用截图上下文 =====
// 按「渲染尺寸」缓存：不同画幅（16:9 / 4:5 / 1:1...）各自一个上下文，全库也就十来个，
// 相比 400 个模板各建一次 iframe，焦点抖动和样式拷贝开销都降到可忽略。
const contexts = new Map<string, Context<HTMLElement>>()
let lastUrl = ''
let lastId = ''

function ctxKey(w: number, h: number) { return `${w}x${h}` }

async function shoot(node: HTMLElement, config: Record<string, unknown>): Promise<string> {
  const key = ctxKey(config.width as number, config.height as number)
  let ctx = contexts.get(key)
  if (!ctx) {
    ctx = await createContext(node, { ...config, autoDestruct: false } as never)
    contexts.set(key, ctx)
  }
  return await domToWebp(ctx)
}

async function capture(tpl: Template): Promise<string> {
  current.value = tpl
  try {
    // 字体（含合成字重）没加载完就截图会得到 fallback 字形，与成品不一致
    try { if ((document as any).fonts?.ready) await (document as any).fonts.ready } catch { /* ignore */ }
    await nextTick()
    await settle()
    const node = forgeRenderer.value?.canvasRootRef as HTMLElement | null
    if (!node) return ''
    await waitImages(node)
    const { w, h } = size.value
    const bg = (resolved.value?.canvas as any)?.backgroundColor || '#ffffff'
    const config = { width: w, height: h, scale: 1, backgroundColor: bg, quality: 0.72, type: 'image/webp' }
    let url = ''
    try {
      url = await shoot(node, config)
      // 兜底：万一复用上下文拿到的还是上一张（说明它没重新克隆节点），销毁后重建再截一次
      if (url && url === lastUrl && lastId && lastId !== tpl.id) {
        const key = ctxKey(w, h)
        const stale = contexts.get(key)
        if (stale) { contexts.delete(key); destroyContext(stale) }
        url = await shoot(node, config)
      }
      if (!url) throw new Error('empty')
    } catch {
      // 个别环境（旧 Chromium / 隐私模式）可能没有 WebP 编码器，退回 JPEG
      url = await domToJpeg(node, { ...config, quality: 0.7 } as never)
    }
    lastUrl = url || ''
    lastId = tpl.id
    return url || ''
  } catch {
    return ''
  }
}

onBeforeUnmount(() => {
  contexts.forEach((c) => { try { destroyContext(c) } catch { /* ignore */ } })
  contexts.clear()
})

defineExpose({ capture })
</script>

<style scoped>
.thumb-forge {
  position: fixed;
  left: -20000px;
  top: 0;
  pointer-events: none;
  /* 别让它参与任何可访问性/命中测试 */
  contain: layout paint size;
}
</style>

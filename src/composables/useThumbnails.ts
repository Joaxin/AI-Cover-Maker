// src/composables/useThumbnails.ts —— 方案 A 的调度层
//
// 职责：① 卡片取图（有缓存用缓存，没有先显示手绘 SVG 占位）② 只对进入视口的卡片触发生成
// ③ 串行生成并把结果写进 IndexedDB。
//
// 为什么必须懒生成：全库 400+ 模板，每个都要真实渲染一遍再截图（约 100~300ms），
// 一次性做满会长时间占住主线程。IntersectionObserver 保证只有真正被看到的那几张才干活。
import { ref, type Ref } from 'vue'
import type { Template } from '@/types/types'
import { getThumb, peekThumb, putThumb } from '@/utils/thumbCache'

export interface ThumbForge {
  capture(tpl: Template): Promise<string>
}

export function useThumbnails(forgeRef: Ref<ThumbForge | null>) {
  /** id → 真实渲染缩略图 dataURL（响应式，命中后卡片自动换图） */
  const thumbs = ref<Record<string, string>>({})
  /** id → 模板对象：截图时需要完整 Template，不只是 id */
  const byId = new Map<string, Template>()

  const queue: string[] = []
  const done = new Set<string>()
  const failed = new Set<string>()
  const hydrating = new Set<string>()
  let running = false

  function register(tpl: Template) {
    if (!byId.has(tpl.id)) byId.set(tpl.id, tpl)
  }

  /** 卡片取图：命中缓存则返回真实截图，否则回落到模板自带的手绘 SVG（立即有画面，不空白） */
  function thumbFor(tpl: Template): string {
    register(tpl)
    const hit = thumbs.value[tpl.id] || peekThumb(tpl.id)
    if (hit) return hit
    if (!thumbs.value[tpl.id] && !hydrating.has(tpl.id)) void hydrate(tpl.id)
    return tpl.thumbnail
  }

  async function hydrate(id: string) {
    hydrating.add(id)
    try {
      const v = await getThumb(id)
      if (v) thumbs.value = { ...thumbs.value, [id]: v }
    } catch {
      // 读缓存失败就用占位图，不抛给渲染层
    } finally {
      hydrating.delete(id)
    }
  }

  function request(id: string) {
    if (done.has(id) || failed.has(id) || thumbs.value[id]) return
    if (queue.includes(id)) return
    queue.push(id)
    void pump()
  }

  /**
   * 截图是重活。连续跑会长时间占住主线程 —— Windows 上最直观的表现就是鼠标指针一阵阵闪，
   * 且用户滚动/拖拽会被卡住。所以这里要求两个条件同时满足才动工：
   *   ① 上一次交互已过 QUIET_MS（用户手没在动）
   *   ② 浏览器真的给了空闲时间片（requestIdleCallback）
   * 不满足就退回去等，绝不硬抢主线程。
   */
  const QUIET_MS = 400
  let lastInteract = 0
  const markInteract = () => { lastInteract = Date.now() }

  function waitIdle(): Promise<void> {
    return new Promise((resolve) => {
      const ric = (window as any).requestIdleCallback as
        | ((cb: () => void, opts?: { timeout: number }) => number)
        | undefined
      const tick = () => {
        if (Date.now() - lastInteract < QUIET_MS) { setTimeout(tick, 120); return }
        resolve()
      }
      if (typeof ric === 'function') ric(() => tick(), { timeout: 400 })
      else setTimeout(tick, 48)
    })
  }

  async function pump() {
    if (running) return
    const forge = forgeRef.value
    if (!forge) return
    running = true
    try {
      while (queue.length) {
        await waitIdle()
        const id = queue.shift()
        if (!id) break
        if (thumbs.value[id] || done.has(id)) continue
        const tpl = byId.get(id)
        if (!tpl) continue
        try {
          const url = await forge.capture(tpl)
          if (url) {
            await putThumb(id, url)
            thumbs.value = { ...thumbs.value, [id]: url }
            done.add(id)
          } else {
            failed.add(id)
          }
        } catch {
          failed.add(id)
        }
      }
    } finally {
      running = false
    }
  }

  // ===== 可见性观察：只对滚进视口的卡片生成 =====
  let io: IntersectionObserver | null = null
  let mo: MutationObserver | null = null
  const observed = new WeakSet<Element>()
  let scanTimer: number | undefined

  function scan(root: HTMLElement) {
    root.querySelectorAll<HTMLElement>('img[data-thumb-id]').forEach((el) => {
      if (observed.has(el)) return
      observed.add(el)
      io?.observe(el)
    })
  }

  function scheduleScan(root: HTMLElement) {
    if (scanTimer !== undefined) clearTimeout(scanTimer)
    scanTimer = setTimeout(() => scan(root), 120) as unknown as number
  }

  /** 挂到侧栏根节点上：之后展开分类 / 切视图 / 搜索都会自动被 MutationObserver 接管 */
  function observe(root: HTMLElement | null) {
    stop()
    if (!root || typeof IntersectionObserver === 'undefined') return
    ;['pointerdown', 'wheel', 'keydown', 'touchstart'].forEach((ev) =>
      window.addEventListener(ev, markInteract, { passive: true }),
    )
    io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          const id = (e.target as HTMLElement).dataset.thumbId
          if (id) request(id)
        }
      },
      // 提前 300px 预热：滚到之前就已经生成好，用户不会看到"占位图突然变真实图"的闪跳
      { rootMargin: '300px 0px' },
    )
    scan(root)
    if (typeof MutationObserver !== 'undefined') {
      mo = new MutationObserver(() => scheduleScan(root))
      mo.observe(root, { childList: true, subtree: true })
    }
  }

  function stop() {
    if (scanTimer !== undefined) { clearTimeout(scanTimer); scanTimer = undefined }
    io?.disconnect(); io = null
    mo?.disconnect(); mo = null
    ;['pointerdown', 'wheel', 'keydown', 'touchstart'].forEach((ev) =>
      window.removeEventListener(ev, markInteract),
    )
  }

  return { thumbs, thumbFor, request, observe, stop }
}

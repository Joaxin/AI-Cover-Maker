<template>
  <div class="canvas-viewport" :class="{ panning: isPanning || panMode, 'panning-active': isPanning }" ref="viewportRef"
       @pointerdown.self="emit('select-element', { id: null, additive: false })">
    <div class="canvas-scaler" :style="scalerStyle">
      <div ref="canvasRootRef" class="canvas-root" :style="canvasRootStyle"
           @pointerdown.self="emit('select-element', { id: null, additive: false })">
        <div v-if="template.canvas.backgroundImage" class="absolute inset-0 bg-cover bg-center"
             :style="{ backgroundImage: `url(${template.canvas.backgroundImage})`, pointerEvents: 'none' }"></div>
        <div class="content-wrapper" :style="contentWrapperStyle" @pointerdown.capture="onAltPick"
             @pointerdown.self="emit('select-element', { id: null, additive: false })">
          <div v-for="el in sortedElements" :key="el.id"
               class="element-pos absolute"
               :class="[isInert(el) ? 'pointer-events-none' : [{ 'cursor-move': !el.locked, 'locked-el': el.locked }], isThinHit(el) ? 'el-thin' : '']"
               :data-el-id="el.id" :style="[getPosStyle(el), isThinHit(el) ? { '--hitpad': hitPadNative() + 'px' } : {}]"
               @pointerdown.stop="handlePointerDown($event, el)">
            <div class="element-rot" :style="getRotStyle(el)">
              <!-- 内容层：选中与否结构完全一致，杜绝选中导致的重渲染差异 -->
              <div class="element-anim" :class="getAnimClass(el)" :style="getAnimStyle(el)">
                <div v-if="el.type === 'text'" class="element-text whitespace-pre-wrap select-none" :style="getTextStyle(el)">{{ el.content }}</div>
                <img v-else-if="el.type === 'image'" :src="el.src" class="element-image block select-none" :class="{ 'img-broken': brokenImageIds.has(el.id) }" :style="getImageStyle(el)" draggable="false"
                     @error="markImageBroken(el.id, true)" @load="markImageBroken(el.id, false)" />
                <div v-else-if="el.type === 'shape'" class="element-sh" :style="getShapeStyle(el)"></div>
                <div v-else-if="el.type === 'overlay'" class="element-overlay" :style="getOverlayStyle(el)"></div>
              </div>
              <!-- 选中覆盖层：纯装饰 + 控制柄，不影响内容布局 -->
              <template v-if="isSelected(el.id)">
                <div class="sel-outline" :class="{ locked: el.locked }"></div>
                <template v-if="!el.locked && singleSelId === el.id">
                  <div v-for="h in HANDLES" :key="h.key" class="resize-handle"
                       :style="handleStyle(h)" @pointerdown.stop.prevent="startResize($event, el, h)"></div>
                  <div class="rot-handle" :style="rotHandleStyle" @pointerdown.stop.prevent="startRotate($event, el)"></div>
                </template>
                <div v-if="el.locked" class="lock-badge" :style="lockBadgeStyle">🔒</div>
              </template>
            </div>
          </div>
        </div>
      </div>
      <!-- 越界幽灵层：canvas-root 之外的兄弟节点，永远不会被 exportCover 截到；clip 反向绕序挖掉画布可视区 -->
      <div v-if="ghostEls.length" class="ghost-layer" :style="ghostClipStyle">
        <div class="content-wrapper" :style="contentWrapperStyle">
          <div v-for="el in ghostEls" :key="'gh-' + el.id" class="element-pos absolute" :style="{ ...getPosStyle(el), opacity: .22, filter: 'saturate(.6)' }">
            <div class="element-rot" :style="getRotStyle(el)">
              <div class="element-anim" :class="getAnimClass(el)" :style="getAnimStyle(el)">
                <div v-if="el.type === 'text'" class="element-text whitespace-pre-wrap select-none" :style="getTextStyle(el)">{{ el.content }}</div>
                <img v-else-if="el.type === 'image'" :src="el.src" class="element-image block select-none" :style="getImageStyle(el)" draggable="false" />
                <div v-else-if="el.type === 'shape'" class="element-sh" :style="getShapeStyle(el)"></div>
                <div v-else-if="el.type === 'overlay'" class="element-overlay" :style="getOverlayStyle(el)"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="ghost-hint">画布外 · 将被裁掉</div>
      </div>
      <!-- 参考线覆盖层：刻意挂在 canvas-root 之外。导出只截 canvasRootRef，线因此不会被烧进成品 -->
      <div class="chrome-layer" :style="{ width: viewWidth + 'px', height: viewHeight + 'px', '--hairline': hairline, '--hit': hitline, '--gstep': gridPx + 'px', '--dotr': dotRadius }">
        <div v-if="grid" class="grid-layer" :class="gridStyle"></div>
        <div v-if="centerLine" class="guide-line center guide-v" :style="{ left: viewWidth / 2 + 'px' }"></div>
        <div v-if="centerLine" class="guide-line center guide-h" :style="{ top: viewHeight / 2 + 'px' }"></div>
        <div v-for="g in guides" :key="g.id" class="guide-hit" :class="g.axis"
             :style="g.axis === 'v' ? { left: g.pos + 'px' } : { top: g.pos + 'px' }"
             @pointerdown.stop.prevent="startGuideDrag($event, g)"></div>
        <div v-if="pending" class="guide-line pending" :class="pending.axis === 'v' ? 'guide-v' : 'guide-h'"
             :style="pending.axis === 'v' ? { left: pending.pos + 'px' } : { top: pending.pos + 'px' }"></div>
        <div v-if="snap.v !== null" class="guide-line snap guide-v" :style="{ left: snap.v + 'px' }"></div>
        <div v-if="snap.h !== null" class="guide-line snap guide-h" :style="{ top: snap.h + 'px' }"></div>
      </div>
    </div>
    <!-- 标尺：位于被缩放层之外，所以刻度和文字恒定清晰；刻度位置 = offsetX + 设计值 * scale -->
    <template v-if="rulers">
      <div class="ruler ruler-top" @pointerdown.stop.prevent="startRulerDrag($event, 'h')">
        <div class="r-band" :style="{ left: offsetX + 'px', width: viewWidth * scale + 'px' }"></div>
        <div v-for="t in ticksX" :key="'tx' + t.v" class="r-tick" :class="{ minor: t.minor }" :style="{ left: t.px + 'px' }"></div>
        <div v-for="t in labelsX" :key="'lx' + t.v" class="r-label" :style="{ left: t.px + 'px' }">{{ t.v }}</div>
      </div>
      <div class="ruler ruler-left" @pointerdown.stop.prevent="startRulerDrag($event, 'v')">
        <div class="r-band" :style="{ top: offsetY + 'px', height: viewHeight * scale + 'px' }"></div>
        <div v-for="t in ticksY" :key="'ty' + t.v" class="r-tick" :class="{ minor: t.minor }" :style="{ top: t.px + 'px' }"></div>
        <div v-for="t in labelsY" :key="'ly' + t.v" class="r-label" :style="{ top: t.px + 'px' }">{{ t.v }}</div>
      </div>
      <div class="ruler-corner">px</div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, onUnmounted } from 'vue'
import type { ResolvedTemplate, CanvasGuide } from '@/types/types'
import type { GridStep, GridStyle } from '@/utils/prefs'
import { ANCHOR_MAP, rotAABB } from '@/utils/geometry'
import { buildGroups } from '@/utils/grouping'

const props = withDefaults(defineProps<{
  template: ResolvedTemplate
  scale?: number
  offsetX?: number
  offsetY?: number
  selectedIds?: string[]
  freeze?: boolean
  isPanning?: boolean
  /** 平移待命态（空格按住 / 中键已按下）：此期间点画布只平移，不选中、不拖动元素 */
  panMode?: boolean
  viewWidth?: number
  viewHeight?: number
  ratioAlgorithm?: 'expand' | 'crop' | 'scale'
  /** 内容在视口中的贴边锚点：0=贴起始边，0.5=居中（默认），1=贴对边。crop 用它实现"保顶/保底" */
  contentAnchor?: { x: number; y: number }
  centerLine?: boolean
  rulers?: boolean
  guides?: CanvasGuide[]
  grid?: boolean
  gridStep?: GridStep
  gridStyle?: GridStyle
}>(), {
  scale: 1, offsetX: 0, offsetY: 0, selectedIds: () => [], freeze: false, isPanning: false, panMode: false,
  viewWidth: 1000, viewHeight: 1000, ratioAlgorithm: 'crop',
  contentAnchor: () => ({ x: 0.5, y: 0.5 }),
  centerLine: false, rulers: false, guides: () => [],
  grid: false, gridStep: 0, gridStyle: 'line'
})

const emit = defineEmits<{
  (e: 'select-element', payload: { id: string | null; additive: boolean }): void
  (e: 'update-elements', updates: Array<{ id: string; x: number; y: number }>): void
  (e: 'update-element-transform', payload: { id: string; x?: number; y?: number; width?: number; height?: number; rotation?: number }): void
  (e: 'update-guides', guides: CanvasGuide[]): void
  (e: 'broken-images', ids: string[]): void
}>()

const viewportRef = ref<HTMLElement | null>(null)
const canvasRootRef = ref<HTMLElement | null>(null)
/** id → 组名：决定哪些元素被当作同一个视觉单元一起选中/拖动 */
const groupIndex = computed(() => buildGroups(props.template.elements))
defineExpose({ canvasRootRef, viewportRef })

// ===== 原生设计尺寸（来自模板自身，支持任意比例） =====
const nativeW = computed(() => props.template.canvas.defaultWidth || props.template.canvas.virtualWidth || 1000)
const nativeH = computed(() => props.template.canvas.defaultHeight || props.template.canvas.virtualHeight || 1000)

// ===== 内容适配（expand / crop / scale） =====
const contentScale = computed(() => {
  if (props.ratioAlgorithm === 'scale') return Math.min(props.viewWidth / nativeW.value, props.viewHeight / nativeH.value)
  return 1
})
const contentOffset = computed(() => {
  const s = contentScale.value
  const a = props.contentAnchor || { x: 0.5, y: 0.5 }
  return { x: (props.viewWidth - nativeW.value * s) * a.x, y: (props.viewHeight - nativeH.value * s) * a.y }
})

const scalerStyle = computed(() => ({
  transform: `translate(${props.offsetX}px, ${props.offsetY}px) scale(${props.scale})`,
  width: `${props.viewWidth}px`, height: `${props.viewHeight}px`,
  transformOrigin: 'top left', position: 'absolute' as const, top: '0', left: '0'
}))
const canvasRootStyle = computed(() => ({
  width: `${props.viewWidth}px`, height: `${props.viewHeight}px`,
  position: 'relative' as const, overflow: 'hidden' as const,
  backgroundColor: props.template.canvas.backgroundColor || '#000'
}))
const contentWrapperStyle = computed(() => ({
  position: 'absolute' as const, top: '0', left: '0',
  width: `${nativeW.value}px`, height: `${nativeH.value}px`,
  transform: `translate(${contentOffset.value.x}px, ${contentOffset.value.y}px) scale(${contentScale.value})`,
  transformOrigin: 'top left'
}))

// ===== 屏幕坐标 → 原生设计坐标（统一换算，含 zoom 与内容适配） =====
// getBoundingClientRect 是边框盒，而 scaler 绝对定位于内边距盒 → 必须减去 .canvas-viewport 的 1px 边框
function screenToViewport(clientX: number, clientY: number) {
  const vp = viewportRef.value!
  const rect = vp.getBoundingClientRect()
  return { x: clientX - rect.left - vp.clientLeft, y: clientY - rect.top - vp.clientTop }
}
function screenToNative(clientX: number, clientY: number) {
  const v = screenToViewport(clientX, clientY)
  const cx = (v.x - props.offsetX) / props.scale
  const cy = (v.y - props.offsetY) / props.scale
  return {
    x: (cx - contentOffset.value.x) / contentScale.value,
    y: (cy - contentOffset.value.y) / contentScale.value
  }
}

// ===== 选择 =====
const singleSelId = computed(() => props.selectedIds.length === 1 ? props.selectedIds[0] : null)
function isSelected(id: string) { return props.selectedIds.includes(id) }

// 透明背景 CSS 仍会被点击命中，装饰层必须显式穿透
function isInert(el: any): boolean {
  if (el.locked || el.editable) return false
  if (typeof el.opacity === 'number' && el.opacity <= 0.2) return true
  if (el.type === 'overlay') return true
  if (el.type === 'shape') {
    const f = el.shapeKind === 'line' ? (el.fill || el.border?.color) : el.fill
    return !f || f === 'transparent' || f.replace(/\s/g, '') === 'rgba(0,0,0,0)'
  }
  return false
}

const sortedElements = computed(() => [...props.template.elements].sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0)))

const anchorMap: Record<string, [number, number]> = ANCHOR_MAP
// 数值防御：任何非法几何值都不允许把元素渲染成 0/NaN（Bug 1 的兜底防线）
function safeNum(v: any, fallback: number) {
  const n = Number(v)
  return Number.isFinite(n) ? n : fallback
}
function getTopLeft(el: any) {
  const m = anchorMap[el.anchor || 'top-left']
  const w = safeNum(el.width, 0), h = safeNum(el.height, 0)
  return { x: safeNum(el.x, 0) + w * m[0], y: safeNum(el.y, 0) + h * m[1] }
}

// ===== 越界幽灵预览：会被画布裁掉的元素部分，以 22% 透明度浮现在画框外（不截屏、不响应点击） =====
const visibleNativeRect = computed(() => {
  const s = contentScale.value
  const o = contentOffset.value
  return { x: -o.x / s, y: -o.y / s, w: props.viewWidth / s, h: props.viewHeight / s }
})
const ghostEls = computed(() => {
  const v = visibleNativeRect.value
  const out: any[] = []
  for (const el of sortedElements.value) {
    const b = rotAABB(el)
    if (b.right - b.left <= 0 && b.bottom - b.top <= 0) continue
    if (b.left >= v.x - 1 && b.top >= v.y - 1 && b.right <= v.x + v.w + 1 && b.bottom <= v.y + v.h + 1) continue
    out.push(el)
  }
  return out
})
// 反向绕序挖洞：洞=画布可视区，洞外的一切元素副本可见
const ghostClipStyle = computed(() => {
  const B = 60000
  const w = props.viewWidth, h = props.viewHeight
  return { clipPath: `polygon(${-B}px ${-B}px, ${-B}px ${B}px, ${B}px ${B}px, ${B}px ${-B}px, ${-B}px ${-B}px, 0 0, ${w}px 0, ${w}px ${h}px, 0 ${h}px, 0 0)` }
})

// ===== 控制柄定义（旋转态缩放数学见 startResize） =====
const HANDLES = [
  { key: 'nw', left: '0%', top: '0%', cursor: 'nwse-resize', sign: { x: -1, y: -1 }, fixed: { x: 1, y: 1 } },
  { key: 'n', left: '50%', top: '0%', cursor: 'ns-resize', sign: { x: 0, y: -1 }, fixed: { x: 0.5, y: 1 } },
  { key: 'ne', left: '100%', top: '0%', cursor: 'nesw-resize', sign: { x: 1, y: -1 }, fixed: { x: 0, y: 1 } },
  { key: 'e', left: '100%', top: '50%', cursor: 'ew-resize', sign: { x: 1, y: 0 }, fixed: { x: 0, y: 0.5 } },
  { key: 'se', left: '100%', top: '100%', cursor: 'nwse-resize', sign: { x: 1, y: 1 }, fixed: { x: 0, y: 0 } },
  { key: 's', left: '50%', top: '100%', cursor: 'ns-resize', sign: { x: 0, y: 1 }, fixed: { x: 0.5, y: 0 } },
  { key: 'sw', left: '0%', top: '100%', cursor: 'nesw-resize', sign: { x: -1, y: 1 }, fixed: { x: 1, y: 0 } },
  { key: 'w', left: '0%', top: '50%', cursor: 'ew-resize', sign: { x: -1, y: 0 }, fixed: { x: 1, y: 0.5 } }
]
// 控制柄保持恒定屏幕尺寸（抵消 zoom 与内容适配缩放）
const hs = computed(() => Math.min(40, 12 / (props.scale * contentScale.value)))
const rotGap = computed(() => 28 / (props.scale * contentScale.value))
function handleStyle(h: any) {
  return { left: h.left, top: h.top, width: hs.value + 'px', height: hs.value + 'px', transform: 'translate(-50%,-50%)', cursor: h.cursor }
}
const rotHandleStyle = computed(() => ({
  left: '50%', top: '0%', width: hs.value * 1.4 + 'px', height: hs.value * 1.4 + 'px',
  transform: `translate(-50%,-50%) translateY(${-rotGap.value}px)`, cursor: 'grab'
}))
const lockBadgeStyle = computed(() => ({
  left: '0%', top: '0%', transform: 'translate(-50%,-50%)', fontSize: hs.value * 1.3 + 'px'
}))

function rotatePoint(p: { x: number; y: number }, rot: number, origin: { x: number; y: number }) {
  const c = Math.cos(rot), s = Math.sin(rot)
  return { x: origin.x + p.x * c - p.y * s, y: origin.y + p.x * s + p.y * c }
}

// ===== Move（支持多选整体拖拽 + 参考线/元素/画布边缘吸附） =====
const snap = ref<{ v: number | null; h: number | null }>({ v: null, h: null })
let moveState: any = null
function handlePointerDown(e: PointerEvent, el: any) {
  // 平移待命态：这一下是拖画布，不是拖元素（pointerdown 早于 mousedown，必须在这里拦）
  if (props.panMode) return
  if (e.button !== 0) return
  e.preventDefault()
  const additive = e.shiftKey
  const wasSelected = props.selectedIds.includes(el.id)
  let moveIds: string[]
  let maybeRemove = false
  if (additive) {
    if (wasSelected) { moveIds = [...props.selectedIds]; maybeRemove = true }
    else { moveIds = [...props.selectedIds, el.id]; emit('select-element', { id: el.id, additive: true }) }
  } else {
    if (!wasSelected) emit('select-element', { id: el.id, additive: false })
    moveIds = wasSelected ? [...props.selectedIds] : [el.id]
  }
  // 同组联动：条码/装订孔这类「一个视觉单元拆成 N 个元素」的装饰，拖一根 = 拖整组。
  // 组来自 buildGroups：模板显式写的 group 优先，没写的按 id 前缀推断（≥3 个成员才成组）。
  // 单独改某一根仍可走 Alt+点击 循环拾取（那里按单元素命中，不走组）。
  const gid = groupIndex.value.get(el.id)
  if (gid) {
    const members = props.template.elements
      .filter(x => groupIndex.value.get(x.id) === gid && !x.locked)
      .map(x => x.id)
    moveIds = [...new Set([...moveIds, ...members])]
  }
  if (el.locked) {
    // 锁定元素不可拖动；但 Shift+点击取消选中原本靠 onMoveUp 的 deselect 路径，此处短路后要自己补发
    if (additive && wasSelected) emit('select-element', { id: el.id, additive: true })
    return
  }
  const start = screenToNative(e.clientX, e.clientY)
  const starts: Record<string, { x: number; y: number }> = {}
  moveIds.forEach(id => {
    const elem = props.template.elements.find(x => x.id === id)
    if (elem && !elem.locked) starts[id] = { x: safeNum(elem.x, 0), y: safeNum(elem.y, 0) }
  })
  moveState = { moveIds: Object.keys(starts), start, starts, didMove: false, additive, maybeRemove, elId: el.id }
  window.addEventListener('pointermove', onMoveMove)
  window.addEventListener('pointerup', onMoveUp)
}
function onMoveMove(e: PointerEvent) {
  if (!moveState) return
  const p = screenToNative(e.clientX, e.clientY)
  let dx = p.x - moveState.start.x, dy = p.y - moveState.start.y
  // 判定阈值=2 屏幕像素折算到设计像素：固定 2 设计像素在高 zoom 下会把 Shift+点击误判成拖动
  const mvTh = 2 / (props.scale * contentScale.value)
  if (Math.abs(dx) > mvTh || Math.abs(dy) > mvTh) moveState.didMove = true
  // 中心吸附（画布中心辅助线）——包围盒与下面的候选线一律用视觉盒（吃旋转），与对齐/幽灵同口径
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity
  moveState.moveIds.forEach((id: string) => {
    const elem = props.template.elements.find(x => x.id === id)
    const st = moveState.starts[id]
    if (!elem || !st) return
    const b = rotAABB({ ...elem, x: st.x, y: st.y })
    minX = Math.min(minX, b.left + dx); maxX = Math.max(maxX, b.right + dx)
    minY = Math.min(minY, b.top + dy); maxY = Math.max(maxY, b.bottom + dy)
  })
  const cs = contentScale.value, off = contentOffset.value
  const th = 5 / (props.scale * cs)
  // 吸附候选：画布四边/中心 + 用户参考线 + 其它元素的左中右/上中下，统一到元素所在的坐标系
  const n2x = (vx: number) => (vx - off.x) / cs
  const n2y = (vy: number) => (vy - off.y) / cs
  const candV = [0, props.viewWidth / 2, props.viewWidth].map(n2x)
  const candH = [0, props.viewHeight / 2, props.viewHeight].map(n2y)
  for (const g of props.guides) { if (g.axis === 'v') candV.push(n2x(g.pos)); else candH.push(n2y(g.pos)) }
  if (props.grid) {
    // 网格也参与吸附：只取包围盒 ± 一个阈值内的线，否则细网格会让拖动"到哪都吸"
    const gs = gridPx.value
    const vMinX = (minX - th) * cs + off.x, vMaxX = Math.min(props.viewWidth, (maxX + th) * cs + off.x)
    for (let v = Math.max(0, Math.ceil(vMinX / gs) * gs); v <= vMaxX; v += gs) candV.push(n2x(v))
    const vMinY = (minY - th) * cs + off.y, vMaxY = Math.min(props.viewHeight, (maxY + th) * cs + off.y)
    for (let v = Math.max(0, Math.ceil(vMinY / gs) * gs); v <= vMaxY; v += gs) candH.push(n2y(v))
  }
  for (const el of props.template.elements) {
    if (moveState.moveIds.includes(el.id)) continue
    const b = rotAABB(el)
    candV.push(b.left, b.cx, b.right)
    candH.push(b.top, b.cy, b.bottom)
  }
  const pickBest = (points: number[], cands: number[]) => {
    let best: { delta: number; at: number } | null = null
    for (const at of cands) for (const p of points) {
      const d = at - p
      if (Math.abs(d) <= th && (!best || Math.abs(d) < Math.abs(best.delta))) best = { delta: d, at }
    }
    return best
  }
  const bx = pickBest([minX, (minX + maxX) / 2, maxX], candV)
  const by = pickBest([minY, (minY + maxY) / 2, maxY], candH)
  if (bx) dx += bx.delta
  if (by) dy += by.delta
  snap.value = { v: bx ? bx.at * cs + off.x : null, h: by ? by.at * cs + off.y : null }
  const updates = moveState.moveIds.map((id: string) => ({
    id, x: Math.round(moveState.starts[id].x + dx), y: Math.round(moveState.starts[id].y + dy)
  }))
  emit('update-elements', updates)
}
function onMoveUp() {
  snap.value = { v: null, h: null }
  // shift+click 已选元素且未拖动 → 取消选择
  if (moveState && moveState.additive && moveState.maybeRemove && !moveState.didMove) {
    emit('select-element', { id: moveState.elId, additive: true })
  }
  moveState = null
  window.removeEventListener('pointermove', onMoveMove)
  window.removeEventListener('pointerup', onMoveUp)
}

// ===== 细元素热区：2px 高的线条/分隔线按盒子点，几乎点不中；热区垫到 ~10 屏幕px（只扩可点范围，不画任何东西、不进导出） =====
// 10 而非 14：分隔线通常紧贴其上的文字（间距 <14px），热区过大会把文字边缘的点击抢给线
const MIN_HIT_SCREEN_PX = 10
// content-wrapper 自带 scale，子层一律设计像素口径，故热区要按缩放反算
function hitPadNative() { return MIN_HIT_SCREEN_PX / (contentScale.value || 1) }
function isThinHit(el: any) {
  if (el.type === 'text' || isInert(el) || el.locked) return false
  const w = safeNum(el.width, 0), h = safeNum(el.height, 0)
  return !!w && !!h && Math.min(w, h) < hitPadNative()
}

// ===== Alt+点击：在重叠元素间循环拾取。capture 先于元素自身 handler，故 inert（pointer-events:none）层也能被选中 =====
const altPickCache = ref<{ x: number; y: number; ids: string[] } | null>(null)
function hitIdsAt(p: { x: number; y: number }, pad = hitPadNative() / 2): string[] {
  return [...props.template.elements]
    .sort((a, b) => (b.zIndex || 0) - (a.zIndex || 0))
    .filter(el => {
      const w = safeNum(el.width, 0), h = safeNum(el.height, 0)
      if (!w || !h) return false
      const tl = getTopLeft(el)
      const c = { x: tl.x + w / 2, y: tl.y + h / 2 }
      const lp = rotatePoint(p, -(safeNum(el.rotation, 0) * Math.PI) / 180, c)
      // 与 CSS 热区同口径：短边不足时按 pad 外扩，否则细线在 Alt 循环里永远点不到
      return Math.abs(lp.x - c.x) <= w / 2 + Math.max(0, pad - w / 2) && Math.abs(lp.y - c.y) <= h / 2 + Math.max(0, pad - h / 2)
    })
    .map(el => el.id)
}
function onAltPick(e: PointerEvent) {
  if (!e.altKey || e.button !== 0) return
  e.preventDefault(); e.stopPropagation()
  const p = screenToNative(e.clientX, e.clientY)
  const cache = altPickCache.value
  let ids: string[]
  if (cache && Math.hypot(p.x - cache.x, p.y - cache.y) < 12) ids = cache.ids
  else {
    // 先按真实盒子循环，免得热区把循环列表撑长；一处都没命中才放宽到热区口径
    ids = hitIdsAt(p, 0)
    if (!ids.length) ids = hitIdsAt(p)
    altPickCache.value = { x: p.x, y: p.y, ids }
  }
  if (!ids.length) { emit('select-element', { id: null, additive: false }); return }
  const cur = props.selectedIds.length === 1 ? props.selectedIds[0] : ''
  emit('select-element', { id: ids[(ids.indexOf(cur) + 1) % ids.length], additive: false })
}

// ===== 标尺与参考线（坐标一律用导出像素口径：0..viewWidth / 0..viewHeight） =====
const RULER_PX = 26 // 与 .ruler-top/.ruler-left 的 26px 条宽保持一致
const hairline = computed(() => 1 / props.scale + 'px')
const hitline = computed(() => 8 / props.scale + 'px')
const pending = ref<{ axis: 'v' | 'h'; pos: number } | null>(null)
let guideSeq = 0
let guideState: any = null

function screenToCanvas(clientX: number, clientY: number) {
  const v = screenToViewport(clientX, clientY)
  return {
    x: (v.x - props.offsetX) / props.scale,
    y: (v.y - props.offsetY) / props.scale,
    sx: v.x,
    sy: v.y
  }
}
// 标尺落点仍在条上/画布外 → 视为取消或删除
function guideValid(p: { x: number; y: number; sx: number; sy: number }, axis: 'v' | 'h') {
  if (axis === 'v') return p.sx >= RULER_PX && p.x >= 0 && p.x <= props.viewWidth
  return p.sy >= RULER_PX && p.y >= 0 && p.y <= props.viewHeight
}
function startRulerDrag(e: PointerEvent, axis: 'v' | 'h') {
  const p = screenToCanvas(e.clientX, e.clientY)
  guideState = { axis, id: `g${Date.now()}${++guideSeq}`, temp: true, pos: Math.round(axis === 'v' ? p.x : p.y) }
  pending.value = { axis, pos: guideState.pos }
  window.addEventListener('pointermove', onGuideMove)
  window.addEventListener('pointerup', onGuideUp)
}
function startGuideDrag(e: PointerEvent, g: CanvasGuide) {
  const p = screenToCanvas(e.clientX, e.clientY)
  guideState = { axis: g.axis, id: g.id, temp: false, grab: (g.axis === 'v' ? p.x : p.y) - g.pos }
  window.addEventListener('pointermove', onGuideMove)
  window.addEventListener('pointerup', onGuideUp)
}
function onGuideMove(e: PointerEvent) {
  if (!guideState) return
  const p = screenToCanvas(e.clientX, e.clientY)
  const pos = Math.round((guideState.axis === 'v' ? p.x : p.y) - (guideState.grab || 0))
  guideState.pos = pos
  if (guideState.temp) pending.value = { axis: guideState.axis, pos }
  else emit('update-guides', props.guides.map(g => g.id === guideState.id ? { ...g, pos } : g))
}
function onGuideUp(e: PointerEvent) {
  window.removeEventListener('pointermove', onGuideMove)
  window.removeEventListener('pointerup', onGuideUp)
  const st = guideState
  guideState = null
  pending.value = null
  if (!st) return
  const ok = guideValid(screenToCanvas(e.clientX, e.clientY), st.axis)
  if (st.temp) { if (ok) emit('update-guides', [...props.guides, { id: st.id, axis: st.axis, pos: st.pos }]) }
  else if (!ok) emit('update-guides', props.guides.filter(g => g.id !== st.id))
}

const RULER_STEPS = [10, 20, 25, 50, 100, 200, 250, 500, 1000, 2000, 5000]
// 主刻度间距（导出像素）：随 zoom 自适应到屏幕上至少 48px；网格「跟随刻度」也用它
function majorStep() {
  return RULER_STEPS.find(s => s * props.scale >= 48) || RULER_STEPS[RULER_STEPS.length - 1]
}
const gridPx = computed(() => (props.gridStep > 0 ? props.gridStep : majorStep()))
const dotRadius = computed(() => 1.2 / props.scale + 'px')
function buildTicks(size: number, originPx: number) {
  const step = majorStep()
  const minor = step / 5
  const ticks: { v: number; px: number; minor?: boolean }[] = []
  const labels: { v: number; px: number }[] = []
  for (let v = 0; v <= size + 0.01; v += minor) {
    const px = originPx + v * props.scale
    const isMajor = Math.abs(v % step) < minor / 2
    ticks.push({ v: Math.round(v), px, minor: !isMajor })
    if (isMajor) labels.push({ v: Math.round(v), px })
  }
  return { ticks, labels }
}
const rulerX = computed(() => buildTicks(props.viewWidth, props.offsetX))
const rulerY = computed(() => buildTicks(props.viewHeight, props.offsetY))
const ticksX = computed(() => rulerX.value.ticks)
const ticksY = computed(() => rulerY.value.ticks)
const labelsX = computed(() => rulerX.value.labels)
const labelsY = computed(() => rulerY.value.labels)

// ===== Resize（以"对角固定点"为原点，在旋转局部坐标系中计算，旋转态下依然正确） =====
const MIN_SIZE = 10
let resizeState: any = null
function startResize(e: PointerEvent, el: any, h: any) {
  if (el.locked || props.panMode) return
  const rot = (safeNum(el.rotation, 0) * Math.PI) / 180
  const tl = getTopLeft(el)
  const w = safeNum(el.width, MIN_SIZE), ht = safeNum(el.height, MIN_SIZE)
  const center = { x: tl.x + w / 2, y: tl.y + ht / 2 }
  const fixedRel = { x: (h.fixed.x - 0.5) * w, y: (h.fixed.y - 0.5) * ht }
  const fixed = rotatePoint(fixedRel, rot, center)
  resizeState = { id: el.id, handle: h, rot, fixed, anchor: anchorMap[el.anchor || 'top-left'], w, h: ht }
  window.addEventListener('pointermove', onResizeMove)
  window.addEventListener('pointerup', onResizeEnd)
}
function onResizeMove(e: PointerEvent) {
  if (!resizeState) return
  const p = screenToNative(e.clientX, e.clientY)
  const { handle, rot, fixed, anchor, w, h } = resizeState
  const dx = p.x - fixed.x, dy = p.y - fixed.y
  const c = Math.cos(-rot), s = Math.sin(-rot)
  const lx = dx * c - dy * s, ly = dx * s + dy * c
  let newW = w, newH = h
  if (handle.sign.x !== 0) newW = Math.max(MIN_SIZE, handle.sign.x * lx)
  if (handle.sign.y !== 0) newH = Math.max(MIN_SIZE, handle.sign.y * ly)
  const cOff = { x: (0.5 - handle.fixed.x) * newW, y: (0.5 - handle.fixed.y) * newH }
  const newCenter = rotatePoint(cOff, rot, fixed)
  // x/y/width/height 存的是未旋转的布局盒（rotation 只是绕中心的视觉 transform），
  // 故布局左上角 = 中心 − 半宽高，不能再乘旋转，否则对角固定点会瞬移
  const newTl = { x: newCenter.x - newW / 2, y: newCenter.y - newH / 2 }
  emit('update-element-transform', {
    id: resizeState.id,
    x: Math.round(newTl.x - newW * anchor[0]),
    y: Math.round(newTl.y - newH * anchor[1]),
    width: Math.round(newW), height: Math.round(newH)
  })
}
function onResizeEnd() {
  resizeState = null
  window.removeEventListener('pointermove', onResizeMove)
  window.removeEventListener('pointerup', onResizeEnd)
}

// ===== Rotate（Shift = 15° 吸附） =====
let rotateState: any = null
function startRotate(e: PointerEvent, el: any) {
  if (el.locked || props.panMode) return
  const tl = getTopLeft(el)
  rotateState = { id: el.id, center: { x: tl.x + safeNum(el.width, 0) / 2, y: tl.y + safeNum(el.height, 0) / 2 } }
  window.addEventListener('pointermove', onRotateMove)
  window.addEventListener('pointerup', onRotateEnd)
}
function onRotateMove(e: PointerEvent) {
  if (!rotateState) return
  const p = screenToNative(e.clientX, e.clientY)
  const dx = p.x - rotateState.center.x, dy = p.y - rotateState.center.y
  let deg = (Math.atan2(dy, dx) * 180) / Math.PI + 90
  if (e.shiftKey) deg = Math.round(deg / 15) * 15
  // 与属性面板滑杆同域 [-180,180)：否则手柄转出 180° 后滑杆一拖就跳变
  deg = (((deg + 180) % 360) + 360) % 360 - 180
  emit('update-element-transform', { id: rotateState.id, rotation: Math.round(deg) })
}
function onRotateEnd() {
  rotateState = null
  window.removeEventListener('pointermove', onRotateMove)
  window.removeEventListener('pointerup', onRotateEnd)
}

onUnmounted(() => {
  window.removeEventListener('pointermove', onMoveMove)
  window.removeEventListener('pointerup', onMoveUp)
  window.removeEventListener('pointermove', onResizeMove)
  window.removeEventListener('pointerup', onResizeEnd)
  window.removeEventListener('pointermove', onRotateMove)
  window.removeEventListener('pointerup', onRotateEnd)
  window.removeEventListener('pointermove', onGuideMove)
  window.removeEventListener('pointerup', onGuideUp)
})

// ===== 字体兜底（Bug 1 核心修复之一）：任何字体串都保证有 generic family 回退 =====
const GENERIC_FAMILIES = ['serif', 'sans-serif', 'monospace', 'cursive', 'fantasy', 'system-ui', 'ui-serif', 'ui-sans-serif', 'emoji', 'math', 'fangsong']
function ensureFontStack(fontFamily?: string): string {
  const SYS = "system-ui, -apple-system, 'PingFang SC', 'Microsoft YaHei', sans-serif"
  const clean = (fontFamily || '').trim()
  if (!clean) return SYS
  const parts = clean.split(',').map(s => s.trim()).filter(Boolean)
  const strip = (s: string) => s.replace(/^['"]|['"]$/g, '').toLowerCase()
  if (parts.some(p => GENERIC_FAMILIES.includes(strip(p)))) return parts.join(', ')
  if (/hei|gothic|yuan|黑|圆体|微软|苹方|pingfang|yahei/i.test(clean)) return [...parts, 'sans-serif'].join(', ')
  if (/song|ming|kai|didot|bodoni|georgia|times|garamond|宋|楷|明|仿宋|serif/i.test(clean)) return [...parts, 'serif'].join(', ')
  return [...parts, 'sans-serif'].join(', ')
}

// ===== 样式生成 =====
function getPosStyle(el: any) {
  const [mx, my] = anchorMap[el.anchor || 'top-left']
  const x = safeNum(el.x, 0), y = safeNum(el.y, 0)
  const w = Math.max(0, safeNum(el.width, 0)), h = Math.max(0, safeNum(el.height, 0))
  return {
    left: `${x}px`, top: `${y}px`, width: `${w}px`, height: `${h}px`,
    marginLeft: `${w * mx}px`, marginTop: `${h * my}px`,
    zIndex: el.zIndex || 1, opacity: el.opacity !== undefined ? el.opacity : 1
  }
}
function getRotStyle(el: any) {
  const r = safeNum(el.rotation, 0)
  return { transform: r ? `rotate(${r}deg)` : 'none', width: '100%', height: '100%' }
}
function getAnimClass(el: any) { return (props.freeze || !el.animation) ? '' : `anim-${el.animation.name}` }
function getAnimStyle(el: any) {
  if (props.freeze || !el.animation) return {}
  return {
    animationDuration: `${el.animation.duration}ms`, animationDelay: `${el.animation.delay || 0}ms`,
    animationIterationCount: el.animation.iterationCount || 1, animationTimingFunction: el.animation.easing || 'ease'
  }
}
function getTextStyle(el: any) {
  return {
    fontSize: `${Math.max(1, safeNum(el.fontSize, 16))}px`,
    fontWeight: el.fontWeight || 'normal',
    fontStyle: el.fontStyle || 'normal',
    color: el.color,
    textAlign: el.textAlign || 'left',
    lineHeight: el.lineHeight || 1.2,
    letterSpacing: el.letterSpacing ? `${el.letterSpacing}px` : 'normal',
    textTransform: el.textTransform || 'none',
    fontFamily: ensureFontStack(el.fontFamily),
    // 显式允许字重合成：缺少粗体字面时由浏览器合成，绝不降级为空白或普通字重
    fontSynthesis: 'weight style',
    textShadow: el.shadow ? `${el.shadow.offsetX}px ${el.shadow.offsetY}px ${el.shadow.blur}px ${el.shadow.color}` : 'none',
    width: '100%', height: '100%'
  }
}
function getImageStyle(el: any) {
  return { width: '100%', height: '100%', objectFit: el.objectFit || 'cover', objectPosition: el.objectPosition || 'center', borderRadius: el.borderRadius ? `${el.borderRadius}px` : '0', boxShadow: el.shadow ? `${el.shadow.offsetX}px ${el.shadow.offsetY}px ${el.shadow.blur}px ${el.shadow.color}` : 'none' }
}
// ===== 缺图可见化：broken img 默认只渲染空白框，导出成品会留下看不出原因的空洞 =====
const brokenImageIds = ref<Set<string>>(new Set())
function markImageBroken(id: string, broken: boolean) {
  const next = new Set(brokenImageIds.value)
  if (broken) next.add(id)
  else next.delete(id)
  brokenImageIds.value = next
  emit('broken-images', [...next])
}
watch(() => props.template.id, () => {
  if (brokenImageIds.value.size) emit('broken-images', [])
  brokenImageIds.value = new Set()
})
function getShapeStyle(el: any) {
  const style: Record<string, string> = { width: '100%', height: '100%', backgroundColor: el.fill || 'transparent', borderRadius: el.borderRadius ? `${el.borderRadius}px` : '0' }
  if (el.border) style.border = `${el.border.width}px ${el.border.style || 'solid'} ${el.border.color}`
  if (el.shadow) style.boxShadow = `${el.shadow.offsetX}px ${el.shadow.offsetY}px ${el.shadow.blur}px ${el.shadow.color}`
  if (el.shapeKind === 'circle') style.borderRadius = '50%'
  // 线条粗细与盒子同源：过去硬写 border.width||2px，库里 99/101 条只声明 height 的线被压成 2px，模板写的 3~8px 全被忽略
  if (el.shapeKind === 'line' && !el.fill) style.backgroundColor = el.border?.color || '#000'
  return style
}
function getOverlayStyle(el: any) {
  return { width: '100%', height: '100%', background: el.background, mixBlendMode: el.mixBlendMode || 'normal', borderRadius: el.borderRadius ? `${el.borderRadius}px` : '0' }
}
</script>

<style scoped>
.cursor-move { cursor: move; }
/* 撑满中间层：.element-anim 若留 auto 高度，子层(.element-sh/.element-overlay)的 height:100%
   因父高不确定而退化成 auto → 空 div 塌成 0px，导致所有 shape/overlay 在成品里完全不可见。
   补上 100% 后高度链闭合：pos(px) → rot(100%) → anim(100%) → 内容层(100%)。
   副作用也是修复：image 的 object-fit:cover 此前因高度 auto 而不生效，现在按声明盒裁切。 */
.element-anim { width: 100%; height: 100%; }
.element-pos.locked-el { cursor: not-allowed; }
/* 细元素热区：透明的居中垫高层，只放大可点范围，不 painting、不进导出 */
.el-thin::after {
  content: ''; position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);
  width: var(--hitpad, 10px); height: var(--hitpad, 10px); min-width: 100%; min-height: 100%;
}
.sel-outline {
  position: absolute; inset: 0; pointer-events: none; z-index: 25;
  border: 1.5px solid #3b82f6;
  box-shadow: 0 0 0 1px rgba(59, 130, 246, 0.25), 0 0 12px rgba(59, 130, 246, 0.38);
  transition: box-shadow .18s ease;
}
.sel-outline.locked { border-color: #f59e0b; box-shadow: 0 0 0 1px rgba(245, 158, 11, 0.25), 0 0 12px rgba(245, 158, 11, 0.3); }
/* 悬浮选中元素：光晕略盛，把手全亮——平时收敛，靠近才邀请抓取 */
.element-rot:hover .sel-outline { box-shadow: 0 0 0 1px rgba(59, 130, 246, 0.35), 0 0 16px rgba(59, 130, 246, 0.5); }
.resize-handle {
  position: absolute; z-index: 30; background: #fff; border: 1px solid #3b82f6;
  border-radius: 2px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4); pointer-events: auto;
  opacity: .4; transition: opacity .16s ease;
}
.rot-handle {
  position: absolute; z-index: 30; background: #fff; border: 1.5px solid #3b82f6;
  border-radius: 50%; box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4); pointer-events: auto;
  opacity: .4; transition: opacity .16s ease;
}
.element-rot:hover .resize-handle, .element-rot:hover .rot-handle { opacity: 1; }
.lock-badge { position: absolute; z-index: 31; pointer-events: none; }
/* 参考线覆盖层：在被缩放层内、导出根（canvas-root）外，所以线不进导出；线宽用 --hairline 反向抵消缩放 */
.chrome-layer { position: absolute; top: 0; left: 0; overflow: hidden; pointer-events: none; z-index: 39; }
/* 越界幽灵层：与 canvas-root 同坐标空间，clip 挖掉画布区后只剩画框外的元素副本可见 */
.ghost-layer { position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 4; }
.ghost-hint { position: absolute; top: -26px; right: 0; font-size: 12px; line-height: 1.4; color: #94a3b8; background: rgba(15, 23, 42, 0.88); border: 1px dashed #475569; border-radius: 4px; padding: 1px 7px; white-space: nowrap; }
/* 网格：与参考线同层（导出根之外），线宽用 --hairline 反缩放，故任意 zoom 下都是 1 物理像素 */
.grid-layer { position: absolute; inset: 0; z-index: 38; pointer-events: none; }
.grid-layer.line {
  background-image:
    linear-gradient(to right, rgba(148, 163, 184, 0.3) var(--hairline, 1px), transparent var(--hairline, 1px)),
    linear-gradient(to bottom, rgba(148, 163, 184, 0.3) var(--hairline, 1px), transparent var(--hairline, 1px));
  background-size: var(--gstep, 50px) 100%, 100% var(--gstep, 50px);
}
.grid-layer.dot {
  background-image: radial-gradient(circle at center, rgba(148, 163, 184, 0.55) var(--dotr, 1.2px), transparent var(--dotr, 1.2px));
  background-size: var(--gstep, 50px) var(--gstep, 50px);
  /* 点画在每个平铺单元的中心，平移半格才落到 k*step 上，与线格和吸附位置一致 */
  background-position: calc(var(--gstep, 50px) / -2) calc(var(--gstep, 50px) / -2);
}
.guide-line { position: absolute; z-index: 40; pointer-events: none; background: #f472b6; }
.guide-v { top: 0; bottom: 0; width: var(--hairline, 1px); }
.guide-h { left: 0; right: 0; height: var(--hairline, 1px); }
.guide-line.center { background: #a78bfa; }
.guide-line.snap { background: #fb7185; box-shadow: 0 0 4px rgba(251, 113, 133, 0.8); }
.guide-line.pending { background: #22d3ee; }
/* 用户参考线：整条可拖，命中带恒为 8 屏幕像素；拖回标尺即删除 */
.guide-hit { position: absolute; z-index: 41; pointer-events: auto; }
.guide-hit.v { top: 0; bottom: 0; width: var(--hit, 8px); transform: translateX(-50%); cursor: ew-resize; }
.guide-hit.h { left: 0; right: 0; height: var(--hit, 8px); transform: translateY(-50%); cursor: ns-resize; }
.guide-hit::before { content: ''; position: absolute; background: #22d3ee; }
.guide-hit.v::before { top: 0; bottom: 0; left: 50%; width: var(--hairline, 1px); transform: translateX(-50%); }
.guide-hit.h::before { left: 0; right: 0; top: 50%; height: var(--hairline, 1px); transform: translateY(-50%); }
.guide-hit:hover::before { box-shadow: 0 0 0 2px rgba(34, 211, 238, 0.45); }
/* 标尺：条从视口 0 点起算，刻度值直接是 offsetX + 设计值 * scale */
.ruler { position: absolute; z-index: 45; background: rgba(17, 24, 39, 0.94); overflow: hidden; user-select: none; }
.ruler-top { left: 0; right: 0; top: 0; height: 26px; border-bottom: 1px solid #374151; cursor: ns-resize; }
.ruler-left { top: 0; bottom: 0; left: 0; width: 26px; border-right: 1px solid #374151; cursor: ew-resize; }
.ruler-corner {
  position: absolute; z-index: 46; left: 0; top: 0; width: 26px; height: 26px;
  background: rgba(17, 24, 39, 0.94); border-right: 1px solid #374151; border-bottom: 1px solid #374151;
  color: #6b7280; font-size: 9px; display: flex; align-items: center; justify-content: center; pointer-events: none;
}
.r-band { position: absolute; background: rgba(71, 85, 105, 0.35); }
.ruler-top .r-band { top: 0; bottom: 0; }
.ruler-left .r-band { left: 0; right: 0; }
.r-tick { position: absolute; background: #4b5563; }
.ruler-top .r-tick { bottom: 0; width: 1px; height: 8px; }
.ruler-left .r-tick { right: 0; height: 1px; width: 8px; }
.r-tick.minor { height: 4px !important; width: 4px !important; background: #374151; }
.r-label { position: absolute; color: #9ca3af; font-size: 9px; line-height: 1; white-space: nowrap; pointer-events: none; }
.ruler-top .r-label { top: 3px; margin-left: 2px; }
.ruler-left .r-label { left: 3px; margin-top: 1px; }
/* 缺图占位：纯渐变实现，不含 url()，导出时不会被当作待取资源 */
.img-broken {
  background-color: #e2e8f0;
  background-image: repeating-linear-gradient(45deg,
    rgba(220, 38, 38, 0.22) 0 12px, rgba(220, 38, 38, 0) 12px 24px);
}
</style>
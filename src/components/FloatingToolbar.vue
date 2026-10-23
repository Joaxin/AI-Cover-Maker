<template>
  <div v-if="selectedId && showToolbar" class="floating-toolbar" :style="toolbarStyle" @mousedown.stop @click.stop>
    <!-- 位置微调（锁定元素几何不可动，整块隐藏）；步长与顶部操作条「微调:」共用同一个设置 -->
    <div v-if="!selectedLocked" class="grid grid-cols-3 gap-1 bg-gray-800 rounded p-1">
      <div></div>
      <button @click="nudge(0, -stepN)" class="text-xs text-gray-300 hover:text-white font-bold" :title="`上移 ${stepN}px`">↑</button>
      <div></div>
      <button @click="nudge(-stepN, 0)" class="text-xs text-gray-300 hover:text-white font-bold" :title="`左移 ${stepN}px`">←</button>
      <button @click="nudge(0, stepN)" class="text-xs text-gray-300 hover:text-white font-bold" :title="`下移 ${stepN}px`">↓</button>
      <button @click="nudge(stepN, 0)" class="text-xs text-gray-300 hover:text-white font-bold" :title="`右移 ${stepN}px`">→</button>
    </div>

    <div v-if="hasPolicy('fontSize')" class="flex items-center gap-1 bg-gray-800 rounded px-2 py-1">
      <button @click="adjustFontSize(-2)" class="text-xs text-gray-300 hover:text-white font-bold">A-</button>
      <span class="text-xs text-gray-400 w-6 text-center tabular-nums">{{ localFontSize }}</span>
      <button @click="adjustFontSize(2)" class="text-xs text-gray-300 hover:text-white font-bold">A+</button>
    </div>
    
    <div v-if="hasPolicy('textAlign')" class="flex gap-1">
      <button v-for="align in ['left', 'center', 'right']" :key="align" @click="setAlign(align)" 
        class="px-2 py-1 bg-gray-800 rounded text-xs text-gray-300 hover:text-white" 
        :class="{'bg-blue-600 text-white': localAlign === align}">
        {{ align === 'left' ? '⬅' : align === 'center' ? '↔' : '➡' }}
      </button>
    </div>

    <button @click="reset" class="text-xs text-red-400 hover:text-red-300 px-2 py-1" title="重置元素">↺</button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onUnmounted } from 'vue'
import type { ResolvedTemplate, UserOverrides } from '@/types/types'
import { getPolicy } from '../utils/editPolicy'

const props = defineProps<{
  selectedId: string | null
  template: ResolvedTemplate
  overrides: UserOverrides
  canvasScale: number
  nudgeStep?: number
}>()

// 微调步长与顶部操作条共用（未传时保持从前固定 5px）
const stepN = computed(() => Math.max(1, Math.round(props.nudgeStep ?? 5)))

const emit = defineEmits<{ (e: 'update:overrides', val: UserOverrides): void }>()

const toolbarStyle = ref<Record<string, string>>({})
const showToolbar = ref(false)
const localFontSize = ref(16)
const localAlign = ref('left')
const selectedLocked = ref(false)

function hasPolicy(key: string) {
  if (!props.selectedId) return false
  const el = props.template.elements.find(e => e.id === props.selectedId)
  if (!el) return false
  const policy = getPolicy(el.type, el.editable)
  return key in policy
}

function visualEl(): Element | null {
  // 外层 wrapper 是未旋转布局盒；旋转元素要取 .element-rot 的 rect 才贴视觉框
  return document.querySelector(`[data-el-id="${props.selectedId}"] .element-rot`)
    || document.querySelector(`[data-el-id="${props.selectedId}"]`)
}

function updatePosition() {
  if (!props.selectedId) return
  nextTick(() => {
    const el = visualEl()
    if (el) {
      const rect = el.getBoundingClientRect()
      toolbarStyle.value = {
        left: `${rect.left + rect.width / 2}px`,
        top: `${rect.top - 10}px`,
        transform: 'translate(-50%, -100%)'
      }
    }
  })
}

watch(() => [props.selectedId, props.canvasScale, props.overrides], () => {
  if (!props.selectedId) { showToolbar.value = false; return }
  const el = props.template.elements.find(e => e.id === props.selectedId)
  if (!el || el.type !== 'text') { showToolbar.value = false; return }

  selectedLocked.value = !!(el as any).locked
  showToolbar.value = true
  const currentOverrides = props.overrides.elements?.[props.selectedId] || {}
  localFontSize.value = currentOverrides.fontSize || (el as any).fontSize || 16
  localAlign.value = currentOverrides.textAlign || (el as any).textAlign || 'left'
  updatePosition()
}, { immediate: true, deep: true })

function commit() {
  const newOverrides = { ...props.overrides }
  if (!newOverrides.elements) newOverrides.elements = {}
  newOverrides.elements[props.selectedId!] = {
    ...newOverrides.elements[props.selectedId!],
    fontSize: localFontSize.value,
    textAlign: localAlign.value
  }
  emit('update:overrides', newOverrides)
}

function adjustFontSize(delta: number) {
  localFontSize.value = Math.max(8, Math.min(200, localFontSize.value + delta))
  commit()
}

function setAlign(align: string) { localAlign.value = align; commit() }

function nudge(dx: number, dy: number) {
  if (!props.selectedId) return
  const el = props.template.elements.find(e => e.id === props.selectedId)
  if (!el || (el as any).locked) return
  
  const currentOverrides = props.overrides.elements?.[props.selectedId] || {}
  const newX = (currentOverrides.x || el.x) + dx
  const newY = (currentOverrides.y || el.y) + dy
  
  const newOverrides = { ...props.overrides }
  if (!newOverrides.elements) newOverrides.elements = {}
  newOverrides.elements[props.selectedId] = {
    ...newOverrides.elements[props.selectedId],
    x: newX,
    y: newY
  }
  emit('update:overrides', newOverrides)
}

function reset() {
  const newOverrides = { ...props.overrides }
  if (newOverrides.elements) delete newOverrides.elements[props.selectedId!]
  emit('update:overrides', newOverrides)
}

let resizeObserver: ResizeObserver | null = null
watch(() => props.selectedId, (id) => {
  if (resizeObserver) resizeObserver.disconnect()
  if (id) {
    const el = visualEl()
    if (el) {
      resizeObserver = new ResizeObserver(updatePosition)
      resizeObserver.observe(el)
    }
  }
})
onUnmounted(() => resizeObserver?.disconnect())
</script>

<style scoped>
.floating-toolbar {
  position: fixed; z-index: 9999; background: #1f2937; border: 1px solid #374151;
  border-radius: 8px; padding: 6px; display: flex; gap: 8px; align-items: center;
  box-shadow: 0 10px 25px rgba(0,0,0,0.5); pointer-events: auto;
  animation: toolbarIn .3s cubic-bezier(.34, 1.56, .64, 1);
}
/* keyframes 必须带上定位用的 translate(-50%,-100%)，否则入场动画会把工具栏弹离元素 */
@keyframes toolbarIn {
  from { opacity: 0; transform: translate(-50%, -100%) scale(.9); }
  to   { opacity: 1; transform: translate(-50%, -100%) scale(1); }
}
@media (prefers-reduced-motion: reduce) {
  .floating-toolbar { animation: none; }
}
</style>
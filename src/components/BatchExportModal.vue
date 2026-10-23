<template>
  <div v-if="show" class="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 backdrop-blur-sm" @click.self="busy || emit('close')">
    <div class="bg-gray-900 border border-gray-700 rounded-xl shadow-2xl w-[520px] max-w-[94vw] flex flex-col max-h-[90vh]">
      <div class="flex justify-between items-center p-4 border-b border-gray-800 shrink-0">
        <h3 class="text-lg font-bold text-white">🧮 批量出图</h3>
        <button @click="$emit('close')" :disabled="busy" class="text-gray-400 hover:text-white text-2xl leading-none disabled:opacity-40">&times;</button>
      </div>
      <div class="p-4 space-y-4 overflow-y-auto">
        <div class="p-3 bg-gray-800/50 rounded-lg text-xs text-gray-400 leading-relaxed">
          <p>一行一条封面，直接粘 Excel/表格（Tab 分隔多段），或每行只写一条：</p>
          <p class="mt-1 text-gray-300">第 1 段 → 第 1 行文案槽，第 2 段 → 第 2 行……（按画面从上到下；<span class="text-purple-300">🖼 图片坑位行</span>不占位）</p>
          <p class="mt-1">当前模板可填 <span class="text-emerald-300 font-bold">{{ slotCount }}</span> 行文案，超出的段丢弃；空段（含从 Excel 粘来的空列）= 该槽保留模板原文。</p>
        </div>

        <textarea v-model="text" rows="8" :disabled="busy" data-batch-input
          placeholder="春天露营计划&#9;装备清单&#10;城市夜跑指南&#9;护膝怎么选&#10;一碗汤的秋冬序曲"
          class="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-sm text-gray-200 resize-y focus:outline-none focus:border-emerald-500 disabled:opacity-60 font-mono"></textarea>

        <div v-if="rows.length" class="text-xs text-gray-400">
          共 <span class="text-white font-bold">{{ rows.length }}</span> 条，将导出 <span class="text-emerald-300 font-bold">{{ rows.length }}</span> 张 PNG
          <span v-if="overflowN" class="text-amber-400">（{{ overflowN }} 条文案超出 {{ slotCount }} 个槽位被丢弃）</span>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">高清倍率</label>
          <div class="flex gap-2">
            <button v-for="s in SCALES" :key="s" @click="scale = s" :disabled="busy"
              class="flex-1 py-2 rounded text-sm font-medium transition disabled:opacity-50"
              :class="scale === s ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'">
              {{ s }}x
            </button>
          </div>
          <p class="text-xs text-gray-500 mt-1">输出 {{ exportWidth * scale }} × {{ exportHeight * scale }} px/张；行数多时先用 1x 试跑</p>
        </div>

        <button @click="start" :disabled="busy || !rows.length"
          class="w-full bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white py-3 rounded-lg font-bold shadow-lg transition">
          {{ busy ? `⏳ ${progress || '准备中…'}` : rows.length ? `🚀 批量导出 ${rows.length} 张` : '📋 先在上方粘贴文案（一行一条）' }}
        </button>
        <p class="text-[10px] text-gray-500">导出期间别切模板；浏览器首次会问「允许下载多个文件」，点允许。文件名 = 模板名-序号-首段前 10 字.png</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { ExportScale } from '../utils/prefs'

const props = defineProps<{
  show: boolean
  busy: boolean
  progress: string
  slotCount: number
  exportWidth: number
  exportHeight: number
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'run', rows: string[][], scale: ExportScale): void
}>()

const SCALES: ExportScale[] = [1, 2, 3]
const DRAFT_KEY = 'cover-maker.batchDraft'
const text = ref(localStorage.getItem(DRAFT_KEY) || '')
const scale = ref<ExportScale>(2)
watch(text, v => { try { localStorage.setItem(DRAFT_KEY, v) } catch { /* ignore */ } })

const rows = computed(() => text.value.split(/\r?\n/)
  // 必须先按 Tab 切开再逐格 trim：整行 trim 会连行首制表符一起吃掉，
  // 从 Excel 粘来的空列（如 "\t副标题"）就少了位置标记，整行向左挤错位
  .map(l => l.includes('\t') ? l.split('\t').map(c => c.trim()) : [l.trim()])
  // 行尾空段是粘贴的隐形残留（看不见的制表符），按「缺段」丢弃；行首/行中空段必须留着占位
  .map(cells => { while (cells.length && !cells[cells.length - 1]) cells.pop(); return cells })
  .filter(cells => cells.length))
const overflowN = computed(() => rows.value.filter(r => r.length > props.slotCount).length)

function start() {
  if (props.busy || !rows.value.length) return
  emit('run', rows.value, scale.value)
}
</script>

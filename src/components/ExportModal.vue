<template>
    <div v-if="show" class="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 backdrop-blur-sm" @click.self="$emit('close')">
      <div class="bg-gray-900 border border-gray-700 rounded-xl shadow-2xl w-[400px] flex flex-col">
        <div class="flex justify-between items-center p-4 border-b border-gray-800">
          <h3 class="text-lg font-bold text-white">📥 导出设置</h3>
          <button @click="$emit('close')" class="text-gray-400 hover:text-white text-2xl leading-none">&times;</button>
        </div>
        <div class="p-6 space-y-5">
          <div class="p-3 bg-gray-800/50 rounded-lg text-sm text-gray-300">
            <p>导出尺寸：<span class="text-white font-bold">{{ exportWidth * (format === 'html' ? 1 : scale) }} × {{ exportHeight * (format === 'html' ? 1 : scale) }}</span> px</p>
            <p class="text-xs text-gray-500 mt-1">（设计尺寸 {{ exportWidth }} × {{ exportHeight }}，由画布比例决定<span v-if="format === 'html'">；HTML 为矢量文档，不吃倍率</span>）</p>
          </div>
  
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">导出格式</label>
            <div class="flex gap-2">
              <button v-for="f in FORMATS" :key="f" @click="format = f"
                class="flex-1 py-2 rounded text-sm font-medium transition"
                :class="format === f ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'">
                {{ f.toUpperCase() }}
              </button>
            </div>
            <p v-if="format === 'html'" class="text-xs text-gray-500 mt-2">单文件、自包含，保留动态效果；用浏览器打开即可播放</p>
          </div>

          <div :class="format === 'html' ? 'opacity-40 pointer-events-none' : ''">
            <label class="block text-sm font-medium text-gray-300 mb-2">高清倍率</label>
            <div class="flex gap-2">
              <button v-for="s in SCALES" :key="s" @click="scale = s"
                class="flex-1 py-2 rounded text-sm font-medium transition"
                :class="scale === s ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'">
                {{ s }}x
              </button>
            </div>
            <p class="text-xs text-gray-500 mt-2">2x/3x 适合对清晰度要求高的平台；文件更大，导出更慢</p>
          </div>
  
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              图片质量 <span class="text-blue-400">({{ Math.round(quality * 100) }}%)</span>
            </label>
            <input type="range" min="0.1" max="1" step="0.05" v-model.number="quality"
              class="w-full accent-blue-500" :disabled="format !== 'jpeg'" />
            <p v-if="format !== 'jpeg'" class="text-xs text-gray-500 mt-1">{{ format === 'png' ? 'PNG 为无损格式，质量参数不适用' : 'HTML 为矢量文档，质量参数不适用' }}</p>
          </div>
  
          <div class="p-3 bg-gray-800/50 rounded text-xs text-gray-400">
            <p>💡 预估文件大小：<span class="text-white font-bold">{{ estimatedSize }}</span></p>
          </div>
  
          <button @click="startExport" :disabled="exporting"
            class="w-full bg-green-600 hover:bg-green-500 disabled:opacity-60 disabled:cursor-wait text-white py-3 rounded-lg font-bold shadow-lg transition">
            {{ exporting ? '⏳ 导出中…' : '🚀 确认导出' }}
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, watch } from 'vue'
  import { loadPrefs, savePrefs, type ExportScale } from '../utils/prefs'
  
  const props = defineProps<{
    show: boolean
    exportWidth: number
    exportHeight: number
  }>()
  
  const emit = defineEmits<{
    (e: 'close'): void
    (e: 'export', options: { format: ExportFormat; quality: number; scale: ExportScale }): void
  }>()
  
  type ExportFormat = 'png' | 'jpeg' | 'html'
  const FORMATS: ExportFormat[] = ['png', 'jpeg', 'html']
  const SCALES: ExportScale[] = [1, 2, 3]
  
  const stored = loadPrefs()
  const format = ref<ExportFormat>(stored.exportFormat)
  const quality = ref(stored.exportQuality)
  const scale = ref<ExportScale>(stored.exportScale)
  const exporting = ref(false)
  watch([format, quality, scale], ([f, q, s]) => savePrefs({ exportFormat: f, exportQuality: q, exportScale: s }))

  function startExport() {
    if (exporting.value) return
    exporting.value = true
    emit('export', { format: format.value, quality: quality.value, scale: scale.value })
  }
  
  const estimatedSize = computed(() => {
    if (format.value === 'html') return '内联样式表 + 图片，通常几百 KB'
    const pixels = props.exportWidth * props.exportHeight * scale.value * scale.value
    if (format.value === 'jpeg') {
      const bytes = (pixels * 3 * quality.value) / 10
      return `≈ ${(bytes / 1024).toFixed(0)} KB`
    } else {
      const bytes = pixels * 1.5
      return `≈ ${(bytes / 1024).toFixed(0)} KB`
    }
  })
  </script>
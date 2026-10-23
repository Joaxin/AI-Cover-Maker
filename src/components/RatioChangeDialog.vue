<template>
    <div v-if="show" class="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 backdrop-blur-sm" @click.self="$emit('close')">
      <div class="bg-gray-900 border border-gray-700 rounded-xl shadow-2xl w-[420px] flex flex-col">
        <div class="flex justify-between items-center p-4 border-b border-gray-800">
          <h3 class="text-lg font-bold text-white">📐 切换画布比例</h3>
          <button @click="$emit('close')" class="text-gray-400 hover:text-white text-2xl leading-none">&times;</button>
        </div>
        <div class="p-5 space-y-4">
          <p class="text-sm text-gray-400">
            从 <span class="text-white font-bold">{{ fromLabel }}</span> 切换到 <span class="text-blue-400 font-bold">{{ toLabel }}</span>，请选择内容适配方式：
          </p>
          <div class="space-y-3">
            <button @click="pick('expand')" class="w-full text-left p-4 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 hover:border-blue-500 transition group">
              <div class="flex items-center gap-3">
                <span class="text-2xl">🖼️</span>
                <div>
                  <p class="text-sm font-bold text-white group-hover:text-blue-400">同色扩展</p>
                  <p class="text-xs text-gray-400 mt-1">满幅背景/纹理层自动拉伸补满新画布，其余内容居中不缩放</p>
                </div>
              </div>
            </button>
            <div class="w-full p-4 bg-gray-800 rounded-lg border border-gray-700 transition group">
              <button @click="pick('crop')" class="flex items-center gap-3 w-full text-left cursor-pointer">
                <span class="text-2xl">✂️</span>
                <div>
                  <p class="text-sm font-bold text-white group-hover:text-blue-400">对等裁切 <span class="text-[10px] font-normal text-gray-500">居中</span></p>
                  <p class="text-xs text-gray-400 mt-1">从上下（或左右）等量裁掉多余部分，保留中心内容</p>
                </div>
              </button>
              <div class="flex flex-wrap items-center gap-1.5 mt-2.5 pl-11">
                <span class="text-[10px] text-gray-500 w-full">或指定裁掉哪边（点即应用）：</span>
                <button v-for="a in shownAnchors" :key="a.label" @click="pick('crop', a.value)"
                        class="px-2 py-0.5 rounded border border-gray-600 text-[11px] text-gray-300 hover:border-blue-500 hover:text-white cursor-pointer transition-colors">{{ a.label }}</button>
              </div>
            </div>
            <button @click="pick('scale')" class="w-full text-left p-4 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 hover:border-blue-500 transition group">
              <div class="flex items-center gap-3">
                <span class="text-2xl">🔍</span>
                <div>
                  <p class="text-sm font-bold text-white group-hover:text-blue-400">等距缩放</p>
                  <p class="text-xs text-gray-400 mt-1">整体等比缩放内容以完整适配新比例</p>
                </div>
              </div>
            </button>
          </div>
          <label class="flex items-center gap-2 text-xs text-gray-400 cursor-pointer select-none pt-1">
            <input type="checkbox" v-model="remember" class="accent-blue-500" />
            记住我选的算法，下次切比例直接套用（再选比例时按住 Alt 可回到本窗口改设置）
          </label>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed, ref } from 'vue'

  const props = defineProps<{
    show: boolean
    fromLabel: string
    toLabel: string
    /** 目标宽度与原生宽不一致时才显示保左/保右（预设比例下宽度恒不变，横向锚点是空操作） */
    allowSideAnchor?: boolean
    remembered?: boolean
  }>()

  const emit = defineEmits<{
    (e: 'close'): void
    (e: 'confirm', algorithm: 'expand' | 'crop' | 'scale', anchor?: { x: number; y: number }, remember?: boolean): void
  }>()
  const remember = ref(!!props.remembered)
  function pick(algo: 'expand' | 'crop' | 'scale', anchor?: { x: number; y: number }) {
    emit('confirm', algo, anchor, remember.value)
  }

  // 裁切保边锚点：value 是内容在视口中的贴边位置（0=贴起始边）
  const cropAnchors = [
    { label: '⬆ 保顶', value: { x: 0.5, y: 0 } },
    { label: '⬇ 保底', value: { x: 0.5, y: 1 } },
    { label: '⬅ 保左', value: { x: 0, y: 0.5 } },
    { label: '➡ 保右', value: { x: 1, y: 0.5 } }
  ]
  const shownAnchors = computed(() => props.allowSideAnchor ? cropAnchors : cropAnchors.filter(a => a.value.x === 0.5))
  </script>
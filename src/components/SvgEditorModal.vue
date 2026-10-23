<template>
  <div class="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 backdrop-blur-sm" @click.self="$emit('close')">
    <div class="bg-gray-900 border border-gray-700 rounded-xl shadow-2xl w-[980px] max-w-[94vw] max-h-[88vh] flex flex-col">
      <div class="flex justify-between items-center p-4 border-b border-gray-800">
        <h3 class="text-lg font-bold text-white">✏️ SVG 源码 <span class="text-xs font-normal text-gray-500 ml-2">{{ elId }}{{ sizeText ? ' · ' + sizeText : '' }} · {{ source.length.toLocaleString() }} 字符</span></h3>
        <button @click="$emit('close')" class="text-gray-400 hover:text-white text-2xl leading-none">&times;</button>
      </div>

      <div class="p-4 flex-1 overflow-y-auto grid grid-cols-2 gap-4 min-h-0">
        <!-- 左：实时预览 -->
        <div class="flex flex-col gap-2 min-h-0">
          <span class="text-xs text-gray-400">实时预览</span>
          <div class="flex-1 min-h-[220px] rounded-lg overflow-auto flex items-center justify-center p-2"
               :class="previewDark ? 'bg-gray-950' : 'bg-gray-100'">
            <img v-if="!previewBroken" :src="previewUri" class="max-h-[46vh] max-w-full" alt="SVG 预览" @error="previewBroken = true" />
            <div v-else class="text-red-400 text-sm p-6 text-center leading-relaxed">⚠ 当前源码渲染失败（不会应用）<br />多为标签不成对或属性引号断裂</div>
          </div>
          <div class="flex items-center gap-2 text-[10px] text-gray-500">
            <button @click="previewDark = !previewDark" class="px-2 py-1 bg-gray-800 hover:bg-gray-700 rounded text-xs">{{ previewDark ? '☀ 白底' : '🌙 黑底' }}</button>
            <span>线稿多为中性墨/白，两种底色各查一次</span>
          </div>
        </div>

        <!-- 右：源码 + AI 改图 -->
        <div class="flex flex-col gap-2 min-h-0">
          <span class="text-xs text-gray-400">源码（data URI 已解码；保存前会转义回 # → %23）</span>
          <textarea v-model="source" spellcheck="false" @keydown.tab.prevent="insertTab"
                    class="flex-1 min-h-[220px] bg-gray-950 border border-gray-700 rounded p-3 text-xs font-mono text-gray-200 focus:outline-none focus:border-blue-500 resize-none whitespace-pre"></textarea>
          <div v-if="errors.length" class="text-red-400 text-xs space-y-0.5">
            <div v-for="e in errors" :key="e">❌ {{ e }}</div>
          </div>
          <div class="border-t border-gray-800 pt-2 space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-xs text-gray-400">🤖 让 AI 改这张图</span>
              <button @click="copySvgPrompt" :disabled="!!errors.length" class="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 rounded text-xs text-white">📋 复制提示词</button>
            </div>
            <input v-model="svgIntent" placeholder="怎么改？如：线条加粗到 4、壶盖往上挪 20px、去掉虚线轴"
                   class="w-full bg-gray-800 border border-gray-700 rounded px-2 py-1.5 text-xs text-gray-300 focus:outline-none focus:border-blue-500" />
            <p class="text-[10px] text-gray-600 leading-relaxed">粘回：把 AI 输出的 SVG 整段贴进上方源码框 → 预览无误 → 保存应用{{ copied ? ' · ✅ 已复制' : '' }}</p>
          </div>
        </div>
      </div>

      <div class="flex justify-end gap-2 p-4 border-t border-gray-800">
        <button @click="$emit('close')" class="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded text-sm text-gray-200">取消</button>
        <button @click="$emit('apply', previewUri)" :disabled="!!errors.length"
                class="px-4 py-2 bg-green-600 hover:bg-green-500 disabled:opacity-40 disabled:cursor-not-allowed rounded text-sm font-bold text-white">💾 保存应用</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const props = defineProps<{ elId: string; src: string }>()
const emit = defineEmits<{ (e: 'close'): void; (e: 'apply', src: string): void }>()

/** data URI → 可编辑源码（utf8 与 base64 两种都认）
 *  utf8 payload 常含裸 %（如 stop offset="0%"），decodeURIComponent 会整串抛错，
 *  故只解有效的 %XX 序列（连续成组解，保住 CJK 多字节），其余原样 */
function svgFromUri(uri: string): string {
  const comma = uri.indexOf(',')
  const head = uri.slice(0, comma), payload = uri.slice(comma + 1)
  if (head.includes('base64')) {
    try { return decodeURIComponent(escape(atob(payload.trim()))) } catch { return atob(payload.trim()) }
  }
  return payload.replace(/(?:%[0-9A-Fa-f]{2})+/g, (g: string) => { try { return decodeURIComponent(g) } catch { return g } })
}
/** 源码 → data URI：% 与 # 必须转义（# 不转义会被当 fragment 截断，正是红斜纹来源之一）；
 *  非 ASCII 按 UTF-8 转义，与模板库现有 payload 写法字节级一致 */
function uriFromSvg(svg: string): string {
  const payload = svg.replace(/%/g, '%25').replace(/#/g, '%23').replace(/[^\x00-\x7F]/g, c => encodeURIComponent(c))
  return 'data:image/svg+xml;utf8,' + payload
}

const source = ref(svgFromUri(props.src))
const previewDark = ref(false)
const svgIntent = ref('')
const copied = ref(false)
const previewUri = computed(() => uriFromSvg(source.value))
const previewBroken = ref(false)
watch(previewUri, () => { previewBroken.value = false })

const errors = computed<string[]>(() => {
  const s = source.value.trim()
  const errs: string[] = []
  if (!s) return ['源码为空']
  if (/<script|javascript:|\son[a-z]+\s*=|href\s*=\s*["']?\s*https?:/i.test(s)) errs.push('含 <script>/内联事件/外链，不能应用')
  const open = (s.match(/<svg[\s>]/g) || []).length
  const close = (s.match(/<\/svg\s*>/g) || []).length
  const selfRoot = /<svg(?:[^>"']|"[^"]*"|'[^']*')*\/>/.test(s)
  if (selfRoot ? open !== 1 || close !== 0 : open !== 1 || close !== 1) errs.push(`<svg> 应恰好 1 开 1 闭，当前开 ${open}/闭 ${close}${selfRoot ? '（另有自闭合根）' : ''}`)
  if (!errs.length) {
    const stack: string[] = []
    let stray = ''
    for (const m of s.replace(/<!--[\s\S]*?-->/g, '').matchAll(/<(\/?)([A-Za-z][\w:.-]*)((?:"[^"]*"|'[^']*'|[^>])*?)(\/?)>/g)) {
      if (m[4]) continue
      if (m[1]) { if (stack.pop() !== m[2] && !stray) stray = `</${m[2]}> 无配对` }
      else stack.push(m[2])
    }
    if (stack.length && !stray) stray = `<${stack[stack.length - 1]}> 未闭合`
    if (stray) errs.push(`标签不成对：${stray}`)
  }
  return errs
})

const sizeText = computed(() => {
  const tag = source.value.slice(0, source.value.indexOf('>') + 1)
  const w = /width="([\d.]+)"/.exec(tag)?.[1], h = /height="([\d.]+)"/.exec(tag)?.[1]
  return w && h ? `${Math.round(+w)}×${Math.round(+h)}` : ''
})

function insertTab(e: Event) {
  const t = e.target as HTMLTextAreaElement
  const s = t.selectionStart
  source.value = source.value.slice(0, s) + '  ' + source.value.slice(t.selectionEnd)
  requestAnimationFrame(() => { t.selectionStart = t.selectionEnd = s + 2 })
}

async function copySvgPrompt() {
  const intent = svgIntent.value.trim() || '保持线稿风格与配色，只做微小优化（对齐、路径闭合、去冗余节点）'
  const text = [
    '下面是一张内联 SVG 图片的完整源码（它将以 <img> 的 data URI 使用，不执行脚本）。请按需求修改后返回新的整份 SVG 源码。',
    '',
    `修改要求：${intent}`,
    '',
    '硬性约束（违反任意一条都会导致渲染失败）：',
    '1. 只输出 SVG 源码本身：不要代码围栏、不要解释文字。',
    '2. 保持单个 <svg> 根标签，所有标签严格成对闭合；末尾不要多出 </svg>。',
    '3. 除非明确要求，width/height/viewBox 保持不变。',
    '4. 不要引入 <script>、on* 事件属性、外链 href、<style>、外部字体或图片引用。',
    '5. 保持现有线稿风格、描边颜色与坐标系，只改要求涉及的部分。',
    '',
    'SVG 源码：',
    source.value,
  ].join('\n')
  try {
    await navigator.clipboard.writeText(text)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  } catch (err) {
    console.error('复制失败', err)
  }
}
</script>

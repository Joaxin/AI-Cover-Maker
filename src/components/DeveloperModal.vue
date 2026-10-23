<template>
  <div v-if="show" class="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 backdrop-blur-sm" @click.self="$emit('close')">
    <div class="bg-gray-900 border border-gray-700 rounded-xl shadow-2xl w-[640px] max-h-[80vh] flex flex-col">
      <div class="flex justify-between items-center p-4 border-b border-gray-800">
        <h3 class="text-lg font-bold text-white">⚙ 高级功能</h3>
        <button @click="$emit('close')" class="text-gray-400 hover:text-white text-2xl leading-none">&times;</button>
      </div>

      <!-- Tabs -->
      <div class="flex gap-1 px-4 pt-3 border-b border-gray-800">
        <button v-for="t in tabs" :key="t.id" @click="activeTab = t.id"
                class="px-3 py-2 text-sm rounded-t border-b-2 transition-colors"
                :class="activeTab === t.id ? 'text-white border-blue-500 bg-gray-800/60' : 'text-gray-400 border-transparent hover:text-gray-200'">
          {{ t.label }}
          <span v-if="t.id === 'changes' && changeItems.length" class="ml-1 text-[10px] bg-amber-500/20 text-amber-300 rounded-full px-1.5 py-0.5">{{ changeItems.length }}</span>
          <span v-if="t.id === 'history' && history.length" class="ml-1 text-[10px] bg-gray-700 text-gray-300 rounded-full px-1.5 py-0.5">{{ history.length }}</span>
        </button>
      </div>

      <div class="p-6 flex-1 overflow-y-auto">
        <!-- Tab 1: 改动摘要 -->
        <div v-if="activeTab === 'changes'">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-medium text-gray-300">📝 当前模板改动</span>
            <button @click="copySummary" :disabled="!changeItems.length" class="px-3 py-1 bg-gray-700 hover:bg-gray-600 disabled:opacity-40 rounded text-xs text-gray-200">📋 复制改动摘要</button>
          </div>
          <p v-if="!currentTemplate" class="text-xs text-gray-500">未选中模板。</p>
          <p v-else-if="!changeItems.length" class="text-xs text-gray-500">暂无改动。移动/编辑元素后这里会列出对应 TS 源文件的修改指引。</p>
          <div v-else class="space-y-2">
            <p class="text-xs text-gray-400">源文件：<code class="text-amber-300">{{ sourceFile || '（导入的草稿模板，无内置源文件，请用「导出」页「复制 JSON」导出）' }}</code></p>
            <div v-for="(it, i) in changeItems" :key="i" class="bg-gray-800/70 border border-gray-700 rounded p-2.5">
              <div class="text-xs font-medium text-blue-300">{{ i + 1 }}. {{ it.label }}</div>
              <div class="text-xs text-gray-300 mt-1 leading-relaxed whitespace-pre-wrap">{{ it.detail }}</div>
              <div v-if="it.locate" class="text-[10px] text-gray-500 mt-1">▸ 定位：在源文件搜索 <code class="text-gray-400">{{ it.locate }}</code></div>
              <pre v-if="it.code" class="mt-2 text-[10px] leading-snug text-emerald-200/90 bg-gray-950/60 rounded p-2 max-h-40 overflow-auto whitespace-pre-wrap break-all">{{ it.code }}</pre>
            </div>
          </div>
          <p v-if="summaryCopied" class="text-green-400 text-xs mt-2 text-center">✅ 改动摘要已复制</p>
        </div>

        <!-- Tab 2: 修改历史 -->
        <div v-else-if="activeTab === 'history'">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-medium text-gray-300">🕘 修改历史</span>
            <span class="text-[11px] text-gray-500">当前模板会话内有效，切换模板后清空</span>
          </div>
          <p v-if="!history.length" class="text-xs text-gray-500">暂无历史记录。</p>
          <ul v-else class="space-y-1.5">
            <li v-for="(snap, i) in history" :key="i">
              <button @click="$emit('jump', i)"
                      class="w-full text-left flex items-center gap-3 px-3 py-2 rounded border transition-colors"
                      :class="i === historyIndex ? 'border-blue-500 bg-blue-500/10' : 'border-gray-800 bg-gray-800/40 hover:border-gray-600'">
                <span class="text-[10px] text-gray-500 w-6 shrink-0">#{{ i + 1 }}</span>
                <span class="text-xs flex-1" :class="i === historyIndex ? 'text-white' : 'text-gray-300'">
                  {{ snap.desc || (i === 0 ? '初始状态' : '状态更新') }}
                  <span v-if="i === historyIndex" class="ml-1.5 text-[10px] text-blue-400">← 当前</span>
                  <span v-if="i > historyIndex" class="ml-1.5 text-[10px] text-gray-500">（重做分支）</span>
                </span>
                <span class="text-[10px] text-gray-500 shrink-0">{{ fmtTime(snap.at) }}</span>
              </button>
            </li>
          </ul>
          <p class="text-[11px] text-gray-500 mt-3">点击任意一条即可回到该状态；在新状态下继续编辑会截断之后的重做分支。</p>
        </div>

        <!-- Tab 3: 导入模板 JSON -->
        <div v-else-if="activeTab === 'import'" class="space-y-2">
          <label class="block text-sm font-medium text-gray-300">📥 导入模板 JSON</label>
          <div class="flex items-center gap-2">
            <label class="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded text-xs text-gray-200 cursor-pointer shrink-0">
              📄 选择 .json 文件
              <input type="file" accept=".json,application/json" class="hidden" @change="onImportFile" />
            </label>
            <span class="text-[11px] text-gray-500">或把 .json 文件直接拖进下方文本框</span>
          </div>
          <textarea v-model="importText" rows="6" @dragover.prevent @drop.prevent="onImportDrop"
                    class="w-full bg-gray-800 border border-gray-700 border-dashed rounded p-3 text-xs font-mono text-gray-300 focus:outline-none focus:border-blue-500" placeholder="粘贴模板 JSON；「批量变体」的产出是整个 JSON 数组，也直接贴这里..."></textarea>
          <button @click="handleImport" class="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded text-sm font-medium">校验并预览</button>
          <div v-if="pendingImport && unsavedNote" class="border border-amber-500/40 bg-amber-500/10 rounded p-2.5 space-y-2">
            <p class="text-xs text-amber-300">⚠ {{ unsavedNote }}</p>
            <div class="flex gap-2">
              <button @click="confirmImport" class="flex-1 bg-amber-600 hover:bg-amber-500 text-white py-1.5 rounded text-xs font-medium">覆盖导入</button>
              <button @click="pendingImport = null" class="flex-1 bg-gray-700 hover:bg-gray-600 py-1.5 rounded text-xs text-gray-200">取消</button>
            </div>
          </div>
          <div v-if="pendingBatch.length" class="border border-emerald-500/40 bg-emerald-500/10 rounded p-2.5 space-y-2">
            <p class="text-xs text-emerald-300">✅ {{ pendingBatch.length }} 份模板全部通过校验（{{ pendingBatch.map(t => t.name).join('、') }}）——批量产出整批存入「⭐ 我的模板」，不进画布</p>
            <button @click="confirmBatch" class="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-1.5 rounded text-xs font-medium">💾 全部存入我的模板</button>
          </div>
          <p v-else-if="batchSaved" class="text-green-400 text-xs text-center">✅ 已存入，去侧栏「我的模板」查看</p>
          <div v-if="errors.length" class="text-red-400 text-xs space-y-1">
            <div v-for="(err, i) in errors" :key="i">❌ {{ err }}</div>
            <button @click="copyRepair" class="mt-1 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded text-xs text-gray-200">📋 复制修复提示词</button>
            <span v-if="repairCopied" class="text-green-400"> ✅ 已复制，粘回生成它的那个 AI 对话即可重修</span>
          </div>
        </div>

        <!-- Tab 4: 导出当前模板 -->
        <div v-else-if="activeTab === 'export'">
          <label class="block text-sm font-medium text-gray-300 mb-2">📤 导出源模板（不含你的改动）</label>
          <div class="flex gap-3">
            <button @click="downloadTs" :disabled="!currentTemplate" class="flex-1 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-white py-2 rounded text-sm font-medium">💾 下载 .ts</button>
            <button @click="copyJson" :disabled="!currentTemplate" class="flex-1 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-white py-2 rounded text-sm font-medium">📋 复制 JSON</button>
          </div>
          <p v-if="copySuccess" class="text-green-400 text-xs mt-2 text-center">✅ 已复制到剪贴板</p>

          <label class="block text-sm font-medium text-gray-300 mt-5 mb-1">🧪 导出我的编辑（烘焙版）</label>
          <p class="text-xs text-gray-500 leading-relaxed mb-2">上面导的是原始源模板；这里把 seed 随机值、配色/字体覆盖、移动/改字/增删图层全部固化成一份新模板——导出后可直接在「📥 导入」页喂回来，或存入侧栏「⭐ 我的模板」。</p>
          <div class="flex gap-3">
            <button @click="$emit('bake-download')" :disabled="!currentTemplate" class="flex-1 bg-emerald-700 hover:bg-emerald-600 disabled:opacity-50 text-white py-2 rounded text-sm font-medium">⬇ 下载烘焙 JSON</button>
            <button @click="$emit('bake-copy')" :disabled="!currentTemplate" class="flex-1 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 text-white py-2 rounded text-sm font-medium">📋 复制</button>
            <button @click="$emit('save-user')" :disabled="!currentTemplate" class="flex-1 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white py-2 rounded text-sm font-medium">💾 存为我的模板</button>
          </div>
        </div>

        <!-- Tab 5: 反推提示词（image → Design JSON 规范） -->
        <div v-else-if="activeTab === 'prompt'">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-medium text-gray-300">🔁 反推提示词</span>
            <button @click="copyPrompt" :disabled="!promptReady" class="px-3 py-1 bg-gray-700 hover:bg-gray-600 disabled:opacity-40 rounded text-xs text-gray-200">📋 复制全文</button>
          </div>
          <p class="text-xs text-gray-400 leading-relaxed mb-3">
            用途：把这份规范连同目标图片一起发给具备视觉能力的模型，让它产出本工具能直接吃的模板 JSON；再到「导入」页校验预览，最后粘回
            <code class="text-amber-300">src/core/templates/{{ currentTemplate?.category || '<分类>' }}/*.ts</code>。
          </p>
          <p v-if="promptLoading" class="text-xs text-gray-500">正在读取规范…</p>
          <div v-else-if="promptError" class="text-xs space-y-2">
            <p class="text-red-400">读取失败：{{ promptError }}</p>
            <button @click="loadPrompt" class="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs text-gray-200">重试</button>
          </div>
          <template v-else-if="promptText !== null">
            <pre class="text-[10px] leading-snug text-gray-400 bg-gray-950/60 border border-gray-800 rounded p-2.5 max-h-64 overflow-auto whitespace-pre-wrap break-all">{{ promptPreview }}</pre>
            <p class="text-[11px] text-gray-500 mt-2 leading-relaxed">
              全文 {{ promptChars.toLocaleString() }} 字符，复制得到完整规范。源文件：<code class="text-gray-400">image-to-json/skills/image-to-JSON-skills.md</code> —— 内容是构建期内联的，改了那份 .md 要重新构建才会反映到这里（只有一份真值，面板里不改它）。
            </p>
          </template>
          <p v-if="promptCopied" class="text-green-400 text-xs mt-2 text-center">✅ 已复制到剪贴板</p>
        </div>

        <!-- Tab 5b: 场景生成提示词（多图 + 关键词 + 场景 → 精确模板） -->
        <div v-else-if="activeTab === 'generate'" class="space-y-2.5">
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-gray-300">🎯 场景生成</span>
            <span class="text-[11px] text-gray-500">多张图片 + 关键词 → 一张精确模板</span>
          </div>
          <p class="text-xs text-gray-400 leading-relaxed">
            填好后点「复制生成提示词」，把提示词连同你要用的图片一起发给有视觉能力的 AI，产出 JSON 回「📥 导入」页校验。图片只作构图/配色/内容参考，不会嵌进 JSON——模板里的图片位是占位虚框，导入后在编辑器里换成你的真图。
          </p>
          <div>
            <label class="block text-xs text-gray-400 mb-1">目标场景（发给谁、发在哪个平台、想达到什么效果）</label>
            <input v-model="genScene" type="text" placeholder="例：小红书母婴号，晒遛娃好去处，要轻松种草感，3:4 竖版"
                   class="w-full bg-gray-800 border border-gray-700 rounded px-2 py-1.5 text-xs text-gray-200 focus:outline-none focus:border-blue-500" />
          </div>
          <div>
            <label class="block text-xs text-gray-400 mb-1">关键词（主题词、必须出现的字、想要的调性）</label>
            <input v-model="genKeywords" type="text" placeholder="例：营地、亲子、免费、夏日、手绘感、大字报"
                   class="w-full bg-gray-800 border border-gray-700 rounded px-2 py-1.5 text-xs text-gray-200 focus:outline-none focus:border-blue-500" />
          </div>
          <div>
            <label class="block text-xs text-gray-400 mb-1">图片清单（一行一张，写清这张图是干嘛的）</label>
            <textarea v-model="genImages" rows="3" placeholder="图1 = 主照片（孩子在营地跑）&#10;图2 = 我喜欢的配色截图&#10;图3 = 参考版式的一张海报"
                      class="w-full bg-gray-800 border border-gray-700 rounded px-2 py-1.5 text-xs text-gray-200 focus:outline-none focus:border-blue-500 resize-y"></textarea>
            <p v-if="genImagesCount" class="text-[10px] text-gray-500 mt-1">已列 {{ genImagesCount }} 张 —— 记得发消息时真的把这些图附上</p>
          </div>
          <div>
            <label class="block text-xs text-gray-400 mb-1">附加要求（可选：禁用的元素、必须留的位置、字号风格…）</label>
            <input v-model="genExtra" type="text" placeholder="例：不要渐变底；右下角留二维码位；标题必须两行以内"
                   class="w-full bg-gray-800 border border-gray-700 rounded px-2 py-1.5 text-xs text-gray-200 focus:outline-none focus:border-blue-500" />
          </div>
          <div>
            <label class="block text-xs text-gray-400 mb-1">素材文案（可选：整段贴文章/商品详情/稿子，AI 提炼要点做封面）</label>
            <textarea v-model="genSource" rows="4" placeholder="贴一篇推文、一段商品详情、一份讲稿……封面文案将从这里提炼，而不是凭空编"
                      class="w-full bg-gray-800 border border-gray-700 rounded px-2 py-1.5 text-xs text-gray-200 focus:outline-none focus:border-blue-500 resize-y font-mono"></textarea>
          </div>
          <p v-if="promptLoading" class="text-xs text-gray-500">正在读取规范…</p>
          <div v-else-if="promptError" class="text-xs space-y-2">
            <p class="text-red-400">规范读取失败：{{ promptError }}</p>
            <button @click="loadPrompt" class="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs text-gray-200">重试</button>
          </div>
          <button v-else @click="copyGenerate" :disabled="!genHasContent"
                  class="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-white py-2 rounded text-sm font-medium">
            📋 复制生成提示词<span class="text-[10px] opacity-70">（含完整规范，约 {{ genChars.toLocaleString() }} 字符）</span>
          </button>
          <p v-if="genCopied" class="text-green-400 text-xs text-center">✅ 已复制：粘给 AI 时记得连图片一起发；产出回到「📥 导入」校验</p>
          <p v-else-if="!genHasContent" class="text-[10px] text-gray-600 text-center">至少填「目标场景」或「关键词」一项</p>
        </div>

        <!-- Tab 5c: 批量变体（一个版式 × N 个主题 → 模板数组） -->
        <div v-else-if="activeTab === 'variant'" class="space-y-2.5">
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-gray-300">🍀 批量变体</span>
            <span class="text-[11px] text-gray-500">一个版式 × N 个主题 = 一套系列封面</span>
          </div>
          <p class="text-xs text-gray-400 leading-relaxed">
            以当前打开的模板为母版，让 AI 保持版式不动、只换文案与配色，一次产出 N 个变体。
            产出是<b class="text-gray-200">一个 JSON 数组</b>：整份贴回「📥 导入」，逐份校验通过后一键整批存入「⭐ 我的模板」。
          </p>
          <p v-if="!currentTemplate" class="text-xs text-amber-300">未选中模板——先在侧栏打开一个你想要的版式，再回来填主题。</p>
          <template v-else>
            <div class="text-xs text-gray-500">母版：<span class="text-gray-300">{{ currentTemplate.name }}</span> <code class="text-gray-600">{{ currentTemplate.id }}</code></div>
            <div>
              <label class="block text-xs text-gray-400 mb-1">主题清单（一行一个主题 = 产出一个变体）</label>
              <textarea v-model="varThemes" rows="4" placeholder="双十一预售&#10;双十二返场&#10;圣诞礼遇季&#10;年货节"
                        class="w-full bg-gray-800 border border-gray-700 rounded px-2 py-1.5 text-xs text-gray-200 focus:outline-none focus:border-blue-500 resize-y"></textarea>
              <p v-if="varThemesCount" class="text-[10px] text-gray-500 mt-1">共 {{ varThemesCount }} 个主题 → {{ varThemesCount }} 个变体<span v-if="varOverRoom" class="text-amber-400">（「我的模板」只剩 {{ userTplRoom }} 个空位，超出部分会被丢）</span></p>
            </div>
            <div>
              <label class="block text-xs text-gray-400 mb-1">附加要求（可选：统一加的活动标、禁改的元素…）</label>
              <input v-model="varExtra" type="text" placeholder="例：每个变体右上角主标题前加「限时」；金额位留空只写 ¥"
                     class="w-full bg-gray-800 border border-gray-700 rounded px-2 py-1.5 text-xs text-gray-200 focus:outline-none focus:border-blue-500" />
            </div>
            <button @click="copyVariant" :disabled="!varThemesCount"
                    class="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-white py-2 rounded text-sm font-medium">
              📋 复制批量提示词<span class="text-[10px] opacity-70">（含母版全文，约 {{ varChars.toLocaleString() }} 字符）</span>
            </button>
            <p v-if="varCopied" class="text-green-400 text-xs text-center">✅ 已复制：粘给 AI 后把整个数组贴回「📥 导入」</p>
            <p v-else-if="!varThemesCount" class="text-[10px] text-gray-600 text-center">先在主题清单里填至少一行</p>
          </template>
        </div>

        <!-- Tab 6: 模板管理（应用内隐藏/恢复内置模板） -->
        <div v-else-if="activeTab === 'manage'">
          <div class="flex items-center justify-between mb-2 gap-2 flex-wrap">
            <span class="text-sm font-medium text-gray-300">🗂 模板管理</span>
            <div class="flex items-center gap-2 flex-wrap">
              <label class="flex items-center gap-1.5 text-[11px] text-gray-400 select-none cursor-pointer" title="调整模板列表中每行之间的垂直距离">
                距离
                <input type="range" min="0" max="20" step="1" v-model.number="rowGap" class="w-20 accent-blue-500" />
                <span class="text-gray-500 w-9 text-right tabular-nums">{{ rowGap }}px</span>
              </label>
              <button @click="toggleAllGroups" class="px-2.5 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs text-gray-200">{{ allCollapsed ? '展开全部' : '收起全部' }}</button>
              <button @click="$emit('hide-all', (manageTemplates || []).map(t => t.id))" class="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs text-gray-200">全部隐藏</button>
              <button v-if="hiddenIds.length" @click="$emit('unhide-all')" class="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs text-gray-200">全部恢复（{{ hiddenIds.length }}）</button>
            </div>
          </div>
          <p class="text-xs text-gray-500 leading-relaxed mb-3">隐藏只从模板列表移除，不删代码文件、随时可恢复；当前打开中的模板隐藏后仍可继续编辑导出。</p>
          <p v-if="manageLoading" class="text-xs text-gray-500">加载模板列表…</p>
          <div v-else class="space-y-4">
            <div class="flex items-center gap-2">
              <input v-model="manageFilter" type="text" placeholder="搜索模板名 / id…"
                     class="flex-1 min-w-0 bg-gray-800 border border-gray-700 rounded px-2.5 py-1.5 text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:border-gray-500" />
              <button @click="showHiddenOnly = !showHiddenOnly"
                      class="px-2.5 py-1.5 rounded text-xs border transition-colors shrink-0"
                      :class="showHiddenOnly ? 'border-blue-600 bg-blue-900/30 text-blue-200' : 'border-gray-700 bg-gray-800 text-gray-400 hover:text-white hover:border-gray-500'">
                只看已隐藏
              </button>
              <select v-model="sortMode" class="bg-gray-800 border border-gray-700 rounded px-2 py-1.5 text-xs text-gray-300 focus:outline-none shrink-0" title="排序方式">
                <option value="default">默认排序</option>
                <option value="category">按分类</option>
                <option value="name">按名称</option>
              </select>
              <span v-if="manageFilter || showHiddenOnly" class="text-[11px] text-gray-500 shrink-0">命中 {{ filteredCount }} 个</span>
            </div>
            <div v-if="selectedCount" class="flex items-center gap-2 text-xs">
              <span class="text-gray-400">已选 <span class="text-gray-200">{{ selectedCount }}</span> 个</span>
              <button @click="exportSelectedPaths" class="px-2.5 py-1 rounded bg-blue-700 hover:bg-blue-600 text-white">导出选中路径</button>
              <button @click="clearSelection" class="px-2 py-1 rounded border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500">清空</button>
            </div>
            <div v-for="grp in filteredGroups" :key="grp.name">
              <button @click="toggleGroup(grp.name)" class="flex items-center gap-1 text-xs font-bold text-gray-400 mb-1.5 hover:text-gray-200 select-none">
                <span class="w-3 inline-block text-center text-gray-500">{{ collapsed[grp.name] ? '▸' : '▾' }}</span>
                {{ grp.name }} <span class="text-gray-600 font-normal">({{ grp.items.length }})</span>
              </button>
              <div v-if="!collapsed[grp.name] || manageFilter || showHiddenOnly" class="flex flex-col" :style="{ gap: rowGap + 'px' }">
                <div v-for="t in grp.items" :key="t.id"
                     class="flex items-center gap-2 px-2.5 py-1.5 rounded border text-xs"
                     :class="isHidden(t.id) ? 'border-gray-800 bg-gray-800/20 text-gray-600' : 'border-gray-700 bg-gray-800/50 text-gray-300'">
                  <input type="checkbox" :checked="selected.has(t.id)" @change="toggleSelect(t.id)" class="shrink-0 accent-blue-500 cursor-pointer" :title="`选择 ${t.name} 以便导出 .ts 源码路径`" />
                  <span class="flex-1 min-w-0 truncate">{{ isHidden(t.id) ? '· ' : '' }}{{ t.name }}<span v-if="currentTemplate?.id === t.id" class="ml-1.5 text-[10px] text-blue-400">← 打开中</span></span>
                  <code class="text-[10px] text-gray-600 shrink-0 max-w-[140px] truncate">{{ t.id }}</code>
                  <button @click="$emit('toggle-hidden', t.id)"
                          class="shrink-0 px-2 py-0.5 rounded border transition-colors cursor-pointer"
                          :class="isHidden(t.id) ? 'border-green-700 text-green-300 hover:bg-green-900/30' : 'border-gray-600 text-gray-400 hover:text-white hover:border-gray-400'">
                    {{ isHidden(t.id) ? '恢复' : '隐藏' }}
                  </button>
                </div>
              </div>
            </div>
            <!-- 我的模板（本地库）：重命名/删除入口 -->
            <div v-if="userTemplates.length">
              <h4 class="text-xs font-bold text-gray-400 mb-1.5">⭐ 我的模板 <span class="text-gray-600 font-normal">({{ userTemplates.length }})</span></h4>
              <div class="flex flex-col" :style="{ gap: rowGap + 'px' }">
                <div v-for="t in userTemplates" :key="t.id"
                     class="flex items-center gap-2 px-2.5 py-1.5 rounded border border-gray-700 bg-gray-800/50 text-xs text-gray-300">
                  <span class="flex-1 min-w-0 truncate">{{ t.name }}<span v-if="currentTemplate?.id === t.id" class="ml-1.5 text-[10px] text-blue-400">← 打开中</span></span>
                  <code class="text-[10px] text-gray-600 shrink-0 max-w-[140px] truncate">{{ t.id }}</code>
                  <button @click="$emit('rename-user', t)" class="shrink-0 px-2 py-0.5 rounded border border-gray-600 text-gray-400 hover:text-white hover:border-gray-400 cursor-pointer">重命名</button>
                  <button @click="$emit('delete-user', t)" class="shrink-0 px-2 py-0.5 rounded border border-red-800 text-red-300 hover:bg-red-900/30 cursor-pointer">删除</button>
                </div>
              </div>
              <p class="text-[11px] text-gray-500 mt-2 leading-relaxed">存在本浏览器 localStorage，清理浏览器数据会丢；长期保存请去「📤 导出」页下载烘焙 JSON。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, reactive } from 'vue'
import type { Template, UserOverrides } from '../types/types'
import { parseTemplateBatch, serializeTemplateToTs, downloadTextFile } from '../utils/templateIO'
import { buildRepairPrompt, CONTRACT_HEADER } from '../utils/importContract'
import { USER_TPL_LIMIT } from '../utils/userTemplates'
import { buildChangeSummary, summaryToText } from '../utils/changeSummary'
import { flashToast } from '../utils/flashToast'
import { getTemplateSourcePath, loadAllTemplates, CATEGORY_REGISTRY } from '../core'
import type { TemplateCategory } from '../types/types'

const props = defineProps<{
  show: boolean
  currentTemplate: Template | null
  overrides: UserOverrides
  history: any[]
  historyIndex: number
  hiddenIds: string[]
  unsavedNote: string | null
  userTemplates: Template[]
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'import', data: any): void
  (e: 'import-batch', data: Template[]): void
  (e: 'jump', index: number): void
  (e: 'toggle-hidden', id: string): void
  (e: 'unhide-all'): void
  (e: 'hide-all', ids: string[]): void
  (e: 'bake-download'): void
  (e: 'bake-copy'): void
  (e: 'save-user'): void
  (e: 'rename-user', t: Template): void
  (e: 'delete-user', t: Template): void
}>()

type TabId = 'changes' | 'history' | 'import' | 'export' | 'prompt' | 'generate' | 'variant' | 'manage'
const tabs: { id: TabId; label: string }[] = [
  { id: 'changes', label: '📝 改动摘要' },
  { id: 'history', label: '🕘 修改历史' },
  { id: 'import', label: '📥 导入' },
  { id: 'export', label: '📤 导出' },
  { id: 'prompt', label: '🔁 反推提示词' },
  { id: 'generate', label: '🎯 场景生成' },
  { id: 'variant', label: '🍀 批量变体' },
  { id: 'manage', label: '🗂 模板管理' }
]
const activeTab = ref<TabId>('changes')

const importText = ref('')
const errors = ref<string[]>([])
const copySuccess = ref(false)

const changeItems = computed(() => buildChangeSummary(props.currentTemplate, props.overrides || {}))
const sourceFile = computed(() => props.currentTemplate ? getTemplateSourcePath(props.currentTemplate.id) : null)
const summaryCopied = ref(false)

async function copySummary() {
  if (!props.currentTemplate || !changeItems.value.length) return
  try {
    await navigator.clipboard.writeText(summaryToText(props.currentTemplate, sourceFile.value, changeItems.value))
    summaryCopied.value = true
    setTimeout(() => summaryCopied.value = false, 2000)
  } catch (err) {
    console.error('复制失败', err)
    flashToast('⚠️ 复制失败：请手动选中内容再复制')
  }
}

function fmtTime(at?: number) {
  if (!at) return ''
  const d = new Date(at)
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`
}

function handleImport() {
  errors.value = []
  pendingBatch.value = []
  if (importText.value.length > (loadedFromFile.value ? 8_000_000 : 2_000_000)) {
    errors.value.push(`文本过长（${importText.value.length.toLocaleString()} 字符），请精简 data URI 后再导入`)
    return
  }
  const res = parseTemplateBatch(importText.value)
  if (!res.success) {
    errors.value = res.errors
    return
  }
  if (res.data.length > 1) { pendingBatch.value = res.data; return }
  if (props.unsavedNote) { pendingImport.value = res.data[0]; return }
  emit('import', res.data[0])
}

// 批量产出（如「🍀 批量变体」的 JSON 数组）：逐份校验通过后整批存入「⭐ 我的模板」，不进画布
const pendingBatch = ref<Template[]>([])
const batchSaved = ref(false)
function confirmBatch() {
  if (!pendingBatch.value.length) return
  emit('import-batch', pendingBatch.value)
  batchSaved.value = true
  pendingBatch.value = []
  setTimeout(() => batchSaved.value = false, 2500)
}

// 有未保存修改/草稿时先在校验结果下方确认，再真正导入
const pendingImport = ref<any | null>(null)
const loadedFromFile = ref(false)

// 校验失败 → 把「失败原因 + 上次产出原文」打包成修复提示词，粘回同一个 AI 重修
const repairCopied = ref(false)
async function copyRepair() {
  try {
    await navigator.clipboard.writeText(buildRepairPrompt(errors.value, importText.value))
    repairCopied.value = true
    setTimeout(() => repairCopied.value = false, 2000)
  } catch (err) {
    console.error('复制失败', err)
    flashToast('⚠️ 复制失败：请手动选中内容再复制')
  }
}

function confirmImport() {
  if (!pendingImport.value) return
  emit('import', pendingImport.value)
  pendingImport.value = null
}

function loadImportFile(f: File | null | undefined) {
  if (!f) return
  const r = new FileReader()
  r.onload = () => {
    loadedFromFile.value = true
    importText.value = String(r.result || '')
    handleImport()
  }
  r.onerror = () => { errors.value = ['文件读取失败'] }
  r.readAsText(f)
}
function onImportFile(e: Event) {
  const inp = e.target as HTMLInputElement
  loadImportFile(inp.files?.[0])
  inp.value = ''
}
function onImportDrop(e: DragEvent) {
  loadImportFile(e.dataTransfer?.files?.[0])
}

function downloadTs() {
  if (!props.currentTemplate) return
  downloadTextFile(`${props.currentTemplate.id}.ts`, serializeTemplateToTs(props.currentTemplate))
}

async function copyJson() {
  if (!props.currentTemplate) return
  try {
    await navigator.clipboard.writeText(JSON.stringify(props.currentTemplate, null, 2))
    copySuccess.value = true
    setTimeout(() => copySuccess.value = false, 2000)
  } catch (err) {
    console.error('复制失败', err)
    flashToast('⚠️ 复制失败：请手动选中内容再复制')
  }
}

// ===== 反推提示词：整份 image-to-JSON 规范（?raw 动态导入 → 独立 chunk，不常驻主包） =====
const promptText = ref<string | null>(null)
const promptLoading = ref(false)
const promptError = ref('')
const promptCopied = ref(false)
const promptReady = computed(() => !!promptText.value)
const promptChars = computed(() => promptText.value?.length || 0)
const promptPreview = computed(() => {
  const t = promptText.value || ''
  return t.length > 1500 ? t.slice(0, 1500) + '\n\n…（此处省略，「复制全文」得到完整规范）' : t
})

async function loadPrompt() {
  if (promptText.value !== null || promptLoading.value) return
  promptLoading.value = true
  promptError.value = ''
  try {
    const mod = await import('../../image-to-json/skills/image-to-JSON-skills.md?raw')
    promptText.value = mod.default
  } catch (err: any) {
    promptError.value = err?.message || String(err)
  } finally {
    promptLoading.value = false
  }
}

async function copyPrompt() {
  if (!promptText.value) return
  try {
    await navigator.clipboard.writeText(promptText.value)
    promptCopied.value = true
    setTimeout(() => promptCopied.value = false, 2000)
  } catch (err) {
    console.error('复制失败', err)
    flashToast('⚠️ 复制失败：请手动选中内容再复制')
  }
}

// ===== 场景生成：多图 + 关键词 + 场景 → 精确模板提示词（规范复用「反推」那份真值） =====
const genScene = ref('')
const genKeywords = ref('')
const genImages = ref('')
const genExtra = ref('')
const genSource = ref('')
const genCopied = ref(false)
const genImageList = computed(() => genImages.value.split('\n').map(l => l.trim()).filter(Boolean))
const genImagesCount = computed(() => genImageList.value.length)
const genHasContent = computed(() => !!(genScene.value.trim() || genKeywords.value.trim() || genSource.value.trim()) && promptReady.value)
const genPrompt = computed(() => {
  const imgLines = genImageList.value.length
    ? genImageList.value.map((l, i) => `图${i + 1}：${l}`).join('\n')
    : '（用户没有逐张说明，请按其在对话中附上的图片内容自行归类使用）'
  const src = genSource.value.trim()
  const srcBlock = src ? [
    '素材文案（封面文案的唯一事实来源，截断于此的上文以我贴的完整内容为准）：',
    src.length > 20_000 ? src.slice(0, 20_000) + '\n…（过长截断于此）' : src,
    '文案提炼规则：标题/副标题/要点条目必须从上面素材中提炼（可改写得更短更抓人，但不得编造素材里没有的事实、数字、承诺）。',
    ''
  ] : []
  return [
    '请结合我在对话里附上的图片（如有）与下面的素材，为封面设计工具「cover-maker」生成一个可直接导入的模板 JSON。',
    '',
    '我的需求：',
    `- 目标场景：${genScene.value.trim() || '（未填写，按图片内容推断最合适的发布场景）'}`,
    `- 关键词：${genKeywords.value.trim() || '（未填写）'}`,
    genExtra.value.trim() ? `- 附加要求：${genExtra.value.trim()}` : '',
    '',
    `我附上的图片共 ${genImageList.value.length || '?'} 张，各自用途：`,
    imgLines,
    '',
    ...srcBlock,
    '图片使用规则：图片本身不会进入 JSON。请按上面清单理解每张图的用途，为每一个图片位生成一个真正的 type:"image" 元素，src 放一张同比例的「虚线边框 + 中灰底 + 用途标注文字」占位 SVG（data URI，按规范里的 svgUri 约定，# 一律写 %23），并给元素起自解释的 id；我导入后选中该图片元素，用「替换图片（上传）」或素材库把真图灌进去。请根据图片内容提取配色（主色/辅色写进 tokens）、主题词（写进文案）与版式气质，而不是照抄图片像素。',
    '',
    '输出要求：',
    `1. 第一行原样输出 ${CONTRACT_HEADER}，第二行起只输出一个 JSON 对象，不要用 markdown 代码围栏，不要任何解释文字。`,
    '2. 严格遵循下面的完整规范：字段结构、token 引用、presets 恰好 4 套、动画名白名单、排版红线（行宽/盒高计算）都以规范为准。',
    '3. 模板 id 用英文短横线小写、不与常见模板撞名；文案用简体中文、贴合目标场景，禁止生成夸大疗效/收益/绝对化用语；若场景涉及数据展示，数字旁加「示例数据」小字免责标注。',
    '',
    '完整规范：',
    promptText.value || ''
  ].filter(l => l !== null).join('\n')
})
const genChars = computed(() => genPrompt.value.length)

async function copyGenerate() {
  if (!genHasContent.value) return
  try {
    await navigator.clipboard.writeText(genPrompt.value)
    genCopied.value = true
    setTimeout(() => genCopied.value = false, 2000)
  } catch (err) {
    console.error('复制失败', err)
    flashToast('⚠️ 复制失败：请手动选中内容再复制')
  }
}

// ===== 批量变体：当前模板为母版，只换文案/配色，产出 N 份 JSON 数组 =====
const varThemes = ref('')
const varExtra = ref('')
const varCopied = ref(false)
const varThemeList = computed(() => varThemes.value.split('\n').map(l => l.trim()).filter(Boolean))
const varThemesCount = computed(() => varThemeList.value.length)
const userTplRoom = computed(() => Math.max(0, USER_TPL_LIMIT - props.userTemplates.length))
const varOverRoom = computed(() => varThemesCount.value > userTplRoom.value)
const varPrompt = computed(() => {
  const t = props.currentTemplate
  if (!t) return ''
  return [
    `基于下面的「母版模板」，为封面设计工具「cover-maker」生成 ${varThemesCount.value} 个批量变体，同一版式、不同主题，用作系列封面。`,
    '',
    '主题清单（按顺序，一行对应一个变体）：',
    ...varThemeList.value.map((s, i) => `${i + 1}. ${s}`),
    varExtra.value.trim() ? `附加要求：${varExtra.value.trim()}` : '',
    '',
    '不可变条款（每个变体都必须逐字照抄母版）：',
    `- elements 的数量、每个元素的 id、type、全部坐标/宽高/字号/字体/行高/透明度/zIndex/圆角、动画配置、canvas 尺寸——一个数字都不许改，也不许增删元素。`,
    '- 所有 { $t: \'colors.x\' } / { $t: \'fonts.x\' } token 引用结构保持不变，不得替换成硬编码值。',
    '',
    '每个变体只允许改这几处：',
    '1. id = 母版 id 追加 -v1 …-v' + varThemesCount.value + '（保持全库唯一）；name 按各自主题重写（10 字内）。',
    '2. 各 text 元素的 content：按各自主题改写文案，简体中文；每行新文案的字数不得超过原文案×1.1（超出会把文字挤出盒子和画布）；数字/金额保持与原文案相同的位数规模；禁用「最、第一、国家级、绝对」等广告法绝对化用语；涉及数据时在旁边保留或加上「示例数据」小字。',
    '3. tokens.colors 各键的 default 与 options、presets 每套 colors 的色值：按主题调性整体换配色，但键名、套数（恰好 4）与结构一律不动。',
    '',
    '输出要求：',
    `1. 第一行原样输出 ${CONTRACT_HEADER}，第二行起只输出一个 JSON 数组：[ 变体1, 变体2, … ]，共 ${varThemesCount.value} 个完整模板对象，不要用代码围栏，不要任何解释文字。`,
    `2. 数组里每个对象都是完整模板，禁止用省略号、注释或「其余同上」偷懒；不确定就逐字照抄母版再改允许改的三处。`,
    '',
    '母版模板 JSON：',
    JSON.stringify(t)
  ].filter(l => l !== '').join('\n')
})
const varChars = computed(() => varPrompt.value.length)

async function copyVariant() {
  if (!varThemesCount.value || !props.currentTemplate) return
  try {
    await navigator.clipboard.writeText(varPrompt.value)
    varCopied.value = true
    setTimeout(() => varCopied.value = false, 2000)
  } catch (err) {
    console.error('复制失败', err)
    flashToast('⚠️ 复制失败：请手动选中内容再复制')
  }
}

// ===== 模板管理：全量内置模板 + 隐藏开关 =====
const manageTemplates = ref<Template[] | null>(null)
const manageLoading = ref(false)
const isHidden = (id: string) => props.hiddenIds.includes(id)
const manageGroups = computed(() => {
  const byCat = new Map<string, Template[]>()
  for (const t of manageTemplates.value || []) {
    if (!byCat.has(t.category)) byCat.set(t.category, [])
    byCat.get(t.category)!.push(t)
  }
  return [...byCat.entries()].map(([cat, items]) => ({ name: CATEGORY_REGISTRY[cat as TemplateCategory]?.name || cat, items }))
})
// 模板列表展示控制：行距（距离）+ 分组展开/收起
const rowGap = ref(4)
const collapsed = reactive<Record<string, boolean>>({})
const toggleGroup = (name: string) => { collapsed[name] = !collapsed[name] }
const allCollapsed = computed(() => manageGroups.value.length > 0 && manageGroups.value.every(g => collapsed[g.name]))
const toggleAllGroups = () => {
  const next = !allCollapsed.value
  for (const g of manageGroups.value) collapsed[g.name] = next
}
// 搜索 + 只看已隐藏 筛选
const manageFilter = ref('')
const showHiddenOnly = ref(false)
const sortMode = ref<'default' | 'category' | 'name'>('default')
const filteredGroups = computed(() => {
  const q = manageFilter.value.trim().toLowerCase()
  const hiddenOnly = showHiddenOnly.value
  const mode = sortMode.value
  let groups = manageGroups.value
    .map(g => {
      let items = g.items
      if (hiddenOnly) items = items.filter(t => isHidden(t.id))
      if (q) items = items.filter(t => t.name.toLowerCase().includes(q) || t.id.toLowerCase().includes(q))
      if (mode === 'category' || mode === 'name') items = [...items].sort((a, b) => a.name.localeCompare(b.name, 'zh'))
      return { ...g, items }
    })
    .filter(g => g.items.length > 0)
  if (mode === 'category') groups = [...groups].sort((a, b) => a.name.localeCompare(b.name, 'zh'))
  return groups
})
const filteredCount = computed(() => filteredGroups.value.reduce((n, g) => n + g.items.length, 0))
// 多选：导出选中模板的 .ts 源码路径
const selected = reactive(new Set<string>())
const selectedCount = computed(() => selected.size)
const toggleSelect = (id: string) => { if (selected.has(id)) selected.delete(id); else selected.add(id) }
const clearSelection = () => { selected.clear() }
function exportSelectedPaths() {
  const lines = [...selected].map(id => getTemplateSourcePath(id)).filter((p): p is string => !!p)
  if (!lines.length) { flashToast('⚠️ 选中模板没有可用的源文件路径'); return }
  const content = lines.join('\n')
  downloadTextFile('selected-template-paths.txt', content)
  navigator.clipboard?.writeText(content).catch(() => {})
  flashToast(`已导出 ${lines.length} 个模板的 .ts 源码路径（已下载并复制到剪贴板）`)
  clearSelection()
}
async function loadManage() {
  if (manageTemplates.value !== null || manageLoading.value) return
  manageLoading.value = true
  try { manageTemplates.value = await loadAllTemplates() } finally { manageLoading.value = false }
}

watch(activeTab, id => { if (id === 'prompt' || id === 'generate') loadPrompt(); if (id === 'manage') loadManage() })
</script>

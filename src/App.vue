<template>
  <div class="flex h-screen w-screen bg-gray-950 text-gray-100">
    <!-- 左侧：模板库 -->
    <aside ref="libraryRef" v-show="!focusMode" :class="sidebarClass" class="shrink-0 bg-gray-900 border-r border-gray-800 flex flex-col overflow-hidden">
      <div class="relative p-4 pb-2 flex items-center gap-2">
        <h2 class="font-bold text-lg flex-1 min-w-0">📚 模板库</h2>
        <button @click="showDisplayMenu = !showDisplayMenu"
                class="shrink-0 w-7 h-7 grid place-items-center rounded border text-sm transition-colors"
                :class="showDisplayMenu ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700'"
                title="显示设置">▦</button>
        <div v-if="showDisplayMenu" class="absolute right-4 top-full z-30 w-64 bg-gray-800 border border-gray-700 rounded-lg p-3 shadow-2xl space-y-3">
          <div>
            <div class="text-[10px] text-gray-500 font-semibold mb-1.5">模板库</div>
            <div class="space-y-2">
              <div>
                <div class="text-xs text-gray-300 mb-1">缩略图大小</div>
                <div class="flex gap-1 bg-gray-900 rounded p-1">
                  <button v-for="s in tileSizes" :key="s.id" @click="setTileSize(s.id)"
                          class="flex-1 py-1 rounded text-xs transition-colors"
                          :class="prefs.tile === s.id ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-gray-200'">{{ s.label }}</button>
                </div>
              </div>
              <div>
                <div class="text-xs text-gray-300 mb-1">侧栏宽度</div>
                <div class="flex gap-1 bg-gray-900 rounded p-1">
                  <button v-for="s in sidebarSizes" :key="s.id" @click="setSidebarSize(s.id)"
                          class="flex-1 py-1 rounded text-xs transition-colors"
                          :class="prefs.sidebar === s.id ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-gray-200'">{{ s.label }}</button>
                </div>
              </div>
              <button @click="togglePref('expandAll')"
                      class="flex items-center gap-2 text-xs text-gray-300 hover:text-white transition-colors cursor-pointer">
                <span class="w-3.5 h-3.5 shrink-0 grid place-items-center rounded border text-[10px]"
                      :class="prefs.expandAll ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-600 text-transparent'">✓</span>
                进入时展开全部分类
              </button>
              <button @click="togglePref('groupAccordion')"
                      class="flex items-center gap-2 text-xs text-gray-300 hover:text-white transition-colors cursor-pointer"
                      title="一次只展开一个大类；选中别的模板时会自动跳到它所在的大类">
                <span class="w-3.5 h-3.5 shrink-0 grid place-items-center rounded border text-[10px]"
                      :class="prefs.groupAccordion ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-600 text-transparent'">✓</span>
                打开大类时折叠其他大类
              </button>
            </div>
          </div>
          <div class="border-t border-gray-700 pt-2">
            <div class="text-[10px] text-gray-500 font-semibold mb-1.5">画布</div>
            <div class="space-y-2">
              <button @click="togglePref('rulers')"
                      class="flex items-center gap-2 text-xs text-gray-300 hover:text-white transition-colors cursor-pointer"
                      title="顶/左标尺 (R)：从标尺往画布里拖即可拉出参考线">
                <span class="w-3.5 h-3.5 shrink-0 grid place-items-center rounded border text-[10px]"
                      :class="prefs.rulers ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-600 text-transparent'">✓</span>
                标尺 (R)
              </button>
              <button @click="togglePref('grid')"
                      class="flex items-center gap-2 text-xs text-gray-300 hover:text-white transition-colors cursor-pointer"
                      title="画布辅助网格：仅显示与吸附用，不会进导出成品">
                <span class="w-3.5 h-3.5 shrink-0 grid place-items-center rounded border text-[10px]"
                      :class="prefs.grid ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-600 text-transparent'">✓</span>
                显示网格
              </button>
              <template v-if="prefs.grid">
                <div>
                  <div class="text-xs text-gray-300 mb-1">网格间距 <span class="text-gray-500">（导出像素）</span></div>
                  <div class="flex gap-1 bg-gray-900 rounded p-1">
                    <button v-for="s in GRID_STEPS" :key="s.id" @click="setGridStep(s.id)"
                            class="flex-1 py-1 rounded text-xs transition-colors"
                            :class="prefs.gridStep === s.id ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-gray-200'"
                            :title="s.id === 0 ? '跟随标尺主刻度：缩放时疏密自动' : s.id + ' 导出像素'">{{ s.label }}</button>
                  </div>
                </div>
                <div>
                  <div class="text-xs text-gray-300 mb-1">网格样式</div>
                  <div class="flex gap-1 bg-gray-900 rounded p-1">
                    <button v-for="s in GRID_STYLES" :key="s.id" @click="setGridStyle(s.id)"
                            class="flex-1 py-1 rounded text-xs transition-colors"
                            :class="prefs.gridStyle === s.id ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-gray-200'">{{ s.label }}</button>
                  </div>
                </div>
              </template>
              <button @click="togglePref('guides')"
                      class="flex items-center gap-2 text-xs text-gray-300 hover:text-white transition-colors cursor-pointer"
                      title="常驻显示画布横竖中心线（拖动吸附线只在拖到时出现）">
                <span class="w-3.5 h-3.5 shrink-0 grid place-items-center rounded border text-[10px]"
                      :class="prefs.guides ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-600 text-transparent'">✓</span>
                画布中线常显
              </button>
              <button @click="togglePref('animPaused')"
                      class="flex items-center gap-2 text-xs text-gray-300 hover:text-white transition-colors cursor-pointer">
                <span class="w-3.5 h-3.5 shrink-0 grid place-items-center rounded border text-[10px]"
                      :class="prefs.animPaused ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-600 text-transparent'">✓</span>
                打开时暂停动效
              </button>
              <div v-if="currentGuides.length" class="flex items-center gap-2 text-xs text-gray-400">
                <span class="flex-1">参考线 {{ currentGuides.length }} 条</span>
                <button @click="clearGuides" class="px-2 py-0.5 rounded border border-gray-600 text-gray-300 hover:bg-gray-700 transition-colors cursor-pointer">清除</button>
              </div>
            </div>
          </div>
          <div class="text-[10px] text-gray-500 leading-relaxed">侧栏 {{ sidebarPx }}px · 缩略图 {{ tileCols }} 列；设置会记住。网格与参考线只是编辑器外壳，不进导出；参考线从标尺拖出，拖回标尺即删除，刷新即清。</div>
        </div>
      </div>
      <div v-if="showDisplayMenu" class="fixed inset-0 z-20" @click="showDisplayMenu = false"></div>
      <div class="px-4 pb-3 flex items-center gap-2 border-b border-gray-800">
        <div class="flex bg-gray-800 rounded-lg p-0.5 text-xs shrink-0">
          <button @click="libraryView = 'grouped'"
                  class="px-2 py-1 rounded-md transition-colors cursor-pointer"
                  :class="libraryView === 'grouped' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-gray-200'">分类视图</button>
          <button @click="libraryView = 'filter'"
                  class="px-2 py-1 rounded-md transition-colors cursor-pointer"
                  :class="libraryView === 'filter' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-gray-200'">过滤视图</button>
        </div>
        <select v-if="libraryView === 'filter'" v-model="filterCategory"
                class="flex-1 min-w-0 bg-gray-800 border border-gray-700 rounded px-2 py-1 text-xs text-gray-300 focus:outline-none cursor-pointer">
          <option value="all">全部分类</option>
          <optgroup v-for="group in categoryGroups" :key="group.id" :label="group.name">
            <option v-for="cat in group.categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
          </optgroup>
        </select>
      </div>
      <!-- 搜索：命中 name / 标签 / 分类 / 元素 id / 封面文案（317 张模板靠翻找不到，从文案搜最直接） -->
      <div class="px-4 pb-3">
        <div class="relative">
          <span class="absolute left-2.5 top-1/2 -translate-y-1/2 text-[11px] text-gray-500 pointer-events-none">🔍</span>
          <input v-model="searchQuery" type="search" ref="searchInputRef"
                 placeholder="搜模板：名称 / 标签 / 封面文案…（按 / 直达，Esc 退出）"
                 @keydown.escape="searchQuery = ''; ($event.target as HTMLInputElement).blur()"
                 class="w-full bg-gray-800 border border-gray-700 rounded-lg pl-7 pr-7 py-1.5 text-xs text-gray-200 placeholder:text-gray-600 focus:outline-none focus:border-blue-500" />
          <button v-if="searchQuery" @click="searchQuery = ''" title="清空搜索"
                  class="absolute right-1.5 top-1/2 -translate-y-1/2 w-5 h-5 grid place-items-center rounded text-[11px] text-gray-500 hover:text-white hover:bg-gray-700 cursor-pointer">✕</button>
        </div>
      </div>
      <!-- 搜索结果：与两个浏览视图互斥，输入非空即接管列表区 -->
      <div v-if="searchActive" class="nice-scroll flex-1 overflow-y-auto p-4 space-y-3">
        <div class="text-[11px] text-gray-500">
          命中 {{ searchResults.length }} 个模板<span v-if="searchResults.length >= SEARCH_LIMIT">（仅显示前 {{ SEARCH_LIMIT }} 个，再细化关键词）</span>
        </div>
        <div v-if="!searchResults.length" class="text-center text-xs text-gray-500 py-8">
          没搜到「{{ searchQuery.trim() }}」。试试文案里的词，如「罐头」「掀底价」「只此青绿」。
        </div>
        <div class="grid gap-2" :class="tileColsClass">
          <div v-for="hit in searchResults" :key="hit.tpl.id" class="relative group">
            <button @click="pickTemplate(hit.tpl)" class="w-full text-left cursor-pointer">
              <div class="aspect-[4/5] rounded overflow-hidden border-2 transition-colors"
                   :class="currentTemplate?.id === hit.tpl.id && !draftTemplate ? 'border-blue-500 ring-2 ring-blue-500/40' : 'border-gray-800 group-hover:border-blue-500'">
                <img :src="thumbFor(hit.tpl)" :data-thumb-id="hit.tpl.id" :alt="hit.tpl.name" class="w-full h-full object-cover" />
              </div>
              <div class="text-[10px] text-gray-300 truncate group-hover:text-white">{{ hit.tpl.name }}</div>
              <div class="text-[10px] text-gray-600 truncate" :title="hit.snippet">{{ hit.snippet }}</div>
            </button>
            <button @click.stop="toggleStar(hit.tpl.id)" :title="isStarred(hit.tpl.id) ? '取消收藏' : '收藏（置顶到「📌 收藏」）'"
                    class="absolute top-1 left-1 w-5 h-5 grid place-items-center rounded bg-gray-900/85 border text-[10px] transition-colors cursor-pointer"
                    :class="isStarred(hit.tpl.id) ? 'border-amber-500 text-amber-400' : 'border-gray-700 text-gray-600 hover:text-amber-300 opacity-25 group-hover:opacity-100'">★</button>
          </div>
        </div>
      </div>
      <div ref="libraryScrollRef" class="nice-scroll flex-1 overflow-y-auto p-4 space-y-4" v-else-if="libraryView === 'grouped'">
        <!-- 收藏：常用风格置顶，一次点中，不用每次重走分类树 -->
        <div v-if="starTemplates.length">
          <div class="sticky top-0 z-10 -mx-4 px-4 py-2 bg-gray-900 flex items-center gap-2 cursor-pointer select-none" @click="starSectionOpen = !starSectionOpen">
            <span class="text-[10px] text-gray-500 w-3 shrink-0">{{ starSectionOpen ? '▾' : '▸' }}</span>
            <h2 class="text-[13px] font-bold text-gray-200 flex-1 min-w-0 truncate">📌 收藏</h2>
            <span class="text-[11px] text-gray-600 shrink-0">{{ starTemplates.length }} 个</span>
          </div>
          <div v-if="starSectionOpen" class="mt-1 grid gap-1.5 pt-1" :class="tileColsClass">
            <div v-for="t in starTemplates" :key="t.id" class="relative group">
              <button @click="pickTemplate(t)" class="w-full text-left cursor-pointer">
                <img :src="thumbFor(t)" :data-thumb-id="t.id" :alt="t.name"
                     class="w-full aspect-[4/5] object-cover rounded border transition-colors"
                     :class="currentTemplate?.id === t.id && !draftTemplate ? 'border-blue-500 ring-2 ring-blue-500/40' : 'border-gray-800 group-hover:border-blue-500'" />
                <div class="text-[10px] text-gray-500 truncate group-hover:text-gray-300">{{ t.name }}</div>
              </button>
              <button @click.stop="toggleStar(t.id)" title="取消收藏"
                      class="absolute top-1 left-1 w-5 h-5 grid place-items-center rounded bg-gray-900/85 border border-amber-500 text-[10px] text-amber-400 cursor-pointer">★</button>
            </div>
          </div>
        </div>
        <!-- 我的模板：本地库（另存为的成品住这里，内置分类之上置顶） -->
        <div v-if="userTemplates.length">
          <div class="sticky top-0 z-10 -mx-4 px-4 py-2 bg-gray-900 flex items-center gap-2 select-none">
            <span class="text-[10px] text-gray-500 w-3 shrink-0 cursor-pointer" @click="userSectionOpen = !userSectionOpen">{{ userSectionOpen ? '▾' : '▸' }}</span>
            <h2 class="text-[13px] font-bold text-gray-200 flex-1 min-w-0 truncate cursor-pointer" @click="userSectionOpen = !userSectionOpen">⭐ 我的模板</h2>
            <button @click.stop="importUserTplFileInput?.click()" title="从 JSON 文件恢复/导入（单份或数组）"
                    class="text-[10px] text-gray-500 hover:text-gray-200 shrink-0 cursor-pointer">导入</button>
            <button @click.stop="exportAllUserTemplates()" title="把整个「我的模板」导出为一个 JSON 备份"
                    class="text-[10px] text-gray-500 hover:text-gray-200 shrink-0 cursor-pointer">全部导出</button>
            <input ref="importUserTplFileInput" type="file" accept=".json,application/json" class="hidden" @change="onImportUserTplFile" />
            <span class="text-[11px] text-gray-600 shrink-0">{{ userTemplates.length }} 个</span>
          </div>
          <div v-if="userSectionOpen" class="mt-1 grid gap-1.5 pt-1" :class="tileColsClass">
            <div v-for="t in userTemplates" :key="t.id" class="relative group ut-tile">
              <button @click="pickTemplate(t)" class="w-full text-left cursor-pointer">
                <img :src="thumbFor(t)" :data-thumb-id="t.id" :alt="t.name"
                     class="w-full aspect-[4/5] object-cover rounded border transition-colors"
                     :class="currentTemplate?.id === t.id && !draftTemplate ? 'border-blue-500 ring-2 ring-blue-500/40' : 'border-gray-800 group-hover:border-blue-500'" />
                <div class="text-[10px] text-gray-500 truncate group-hover:text-gray-300">{{ t.name }}</div>
              </button>
              <button @click.stop="removeUserTemplate(t)" title="删除"
                      class="absolute top-1 right-1 hidden group-hover:flex w-5 h-5 items-center justify-center rounded bg-gray-900/85 border border-gray-700 text-[10px] text-gray-300 hover:text-white hover:border-red-500 cursor-pointer">✕</button>
              <button @click.stop="exportUserTemplateJson(t)" title="导出 JSON 备份"
                      class="absolute top-1 right-7 hidden group-hover:flex w-5 h-5 items-center justify-center rounded bg-gray-900/85 border border-gray-700 text-[10px] text-gray-300 hover:text-white hover:border-blue-500 cursor-pointer">⬇</button>
            </div>
          </div>
          <!-- 备份指引：localStorage 说没就没，出口就是「全部导出」+ 仓库 backups/ -->
          <div class="mt-1.5 text-[10px] text-gray-600 leading-relaxed px-1">
            💡 定期「全部导出」并存进仓库 <span class="text-gray-500">backups/user-templates/</span>（<span class="text-gray-500">npm run 收模板备份 -- 文件.json</span> 校验后入库），清浏览器数据也不丢
          </div>
        </div>
        <!-- 空态引导：第一次不知道「存进去的模板会出现在哪」，这块就常驻提示（存过即消失） -->
        <div v-else class="text-[10px] text-gray-600 leading-relaxed px-1">💾 把画面调好后点右侧「💾 另存为我的模板」，你自己的模板会出现在这里。</div>
        <div v-for="group in categoryGroups" :key="group.id">
          <div class="sticky top-0 z-10 -mx-4 px-4 py-2 bg-gray-900 flex items-center gap-2 cursor-pointer select-none" @click="toggleGroup(group.id)">
            <span class="text-[10px] text-gray-500 w-3 shrink-0">{{ expandedGroups.has(group.id) ? '▾' : '▸' }}</span>
            <h2 class="text-[13px] font-bold text-gray-200 flex-1 min-w-0 truncate">{{ group.name }}</h2>
            <span class="text-[11px] text-gray-600 shrink-0">{{ group.categories.length }} 个分类</span>
          </div>
          <div v-if="expandedGroups.has(group.id)" class="mt-1 space-y-1">
            <div v-for="cat in group.categories" :key="cat.id" :data-cat="cat.id" class="relative rounded-lg">
              <span v-if="cat.id === activeCategory" class="absolute left-0 top-2 bottom-2 w-0.5 rounded bg-blue-500"></span>
              <div @click="toggleCategory(cat.id)"
                   class="flex items-center gap-2 pl-3 pr-2 h-9 rounded-lg cursor-pointer select-none transition-colors"
                   :class="expandedCategories.has(cat.id) ? 'bg-gray-800/40' : 'hover:bg-gray-800/60'">
                <span class="text-[10px] text-gray-500 w-3 shrink-0">{{ expandedCategories.has(cat.id) ? '▾' : '▸' }}</span>
                <h3 class="text-[13px] text-gray-200 flex-1 min-w-0 truncate">{{ cat.name }}</h3>
                <!-- 折叠态也露前 4 张线框图，缩进行内：thumbnail 是模板自带 data URI，不额外请求网络 -->
                <div v-if="!expandedCategories.has(cat.id)" class="flex gap-0.5 shrink-0">
                  <img v-for="t in getTemplatesByCategory(cat.id).slice(0, 4)" :key="t.id" :src="thumbFor(t)" :data-thumb-id="t.id" :title="t.name" :alt="t.name"
                       @click.stop="pickTemplate(t)"
                       class="w-6 h-[30px] object-cover rounded-sm bg-gray-800 border cursor-pointer transition-colors"
                       :class="currentTemplate?.id === t.id && !draftTemplate ? 'border-blue-500' : 'border-gray-800 hover:border-gray-600'" />
                </div>
                <span class="text-[11px] text-gray-600 w-9 text-right shrink-0">{{ getTemplatesByCategory(cat.id).length }} 个</span>
              </div>
              <div v-if="expandedCategories.has(cat.id)" class="grid gap-1.5 pl-6 pb-2" :class="tileColsClass">
                <div v-for="t in getTemplatesByCategory(cat.id)" :key="t.id" class="relative group">
                  <button @click="pickTemplate(t)" class="w-full text-left cursor-pointer">
                    <img :src="thumbFor(t)" :data-thumb-id="t.id" :alt="t.name"
                         class="w-full aspect-[4/5] object-cover rounded border transition-colors"
                         :class="currentTemplate?.id === t.id && !draftTemplate ? 'border-blue-500 ring-2 ring-blue-500/40' : 'border-gray-800 group-hover:border-blue-500'" />
                    <div class="text-[10px] text-gray-500 truncate group-hover:text-gray-300">{{ t.name }}</div>
                  </button>
                  <button @click.stop="toggleStar(t.id)" :title="isStarred(t.id) ? '取消收藏' : '收藏（置顶到「📌 收藏」）'"
                          class="absolute top-1 left-1 w-5 h-5 grid place-items-center rounded bg-gray-900/85 border text-[10px] transition-colors cursor-pointer"
                          :class="isStarred(t.id) ? 'border-amber-500 text-amber-400' : 'border-gray-700 text-gray-600 hover:text-amber-300 opacity-25 group-hover:opacity-100'">★</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div ref="filterScrollRef" class="nice-scroll flex-1 overflow-y-auto p-4" v-else @scroll="onFilterScroll">
        <div class="grid gap-2" :class="tileColsClass">
          <div v-for="tpl in pagedTemplates" :key="tpl.id" class="relative group">
            <button @click="pickTemplate(tpl)"
                    class="w-full text-left bg-gray-800 rounded-lg overflow-hidden border-2 transition-all hover:border-blue-500 cursor-pointer"
                    :class="{ 'border-blue-500 ring-2 ring-blue-500/40': currentTemplate?.id === tpl.id && !draftTemplate }">
              <div class="aspect-[4/5]">
                <img :src="thumbFor(tpl)" :data-thumb-id="tpl.id" class="w-full h-full object-cover" :alt="tpl.name" />
              </div>
              <div class="px-2 py-1 text-xs text-gray-300 truncate">{{ tpl.name }}</div>
            </button>
            <button @click.stop="toggleStar(tpl.id)" :title="isStarred(tpl.id) ? '取消收藏' : '收藏（置顶到「📌 收藏」）'"
                    class="absolute top-1 left-1 w-5 h-5 grid place-items-center rounded bg-gray-900/85 border text-[10px] transition-colors cursor-pointer"
                    :class="isStarred(tpl.id) ? 'border-amber-500 text-amber-400' : 'border-gray-700 text-gray-600 hover:text-amber-300 opacity-25 group-hover:opacity-100'">★</button>
          </div>
        </div>
        <div v-if="visibleCount < filteredTemplates.length" ref="filterSentinelRef"
             class="py-4 text-center text-xs text-gray-500">已显示 {{ visibleCount }} / {{ filteredTemplates.length }}，继续滚动加载…</div>
        <div v-if="filteredTemplates.length === 0" class="text-center text-xs text-gray-500 py-8">该分类下暂无模板</div>
      </div>
    </aside>

    <!-- 中间：画布 -->
    <main class="flex-1 flex flex-col bg-gray-950 relative overflow-hidden">
      <!-- Canvas Toolbar（保留原有能力） -->
      <div v-show="!focusMode" class="h-10 bg-gray-900 border-b border-gray-800 flex items-center px-4 gap-2 text-xs z-10">
        <span class="text-gray-400 w-10 text-center tabular-nums">{{ Math.round(canvasScale * 100) }}%</span>
        <button @click="zoom(-0.1)" class="px-2 py-1 bg-gray-800 rounded hover:bg-gray-700" title="缩小">－</button>
        <button @click="zoom(0.1)" class="px-2 py-1 bg-gray-800 rounded hover:bg-gray-700" title="放大">＋</button>
        <button @click="fitScreen" class="px-2 py-1 bg-gray-800 rounded hover:bg-gray-700" title="适应窗口并居中">适应</button>
        <div class="w-px h-4 bg-gray-700 mx-2"></div>
        <select v-model="pendingRatio" @change="handleRatioChange" class="bg-gray-800 border border-gray-700 rounded px-2 py-1 text-gray-300 focus:outline-none text-xs">
          <option value="1:1">1:1 正方</option>
          <option value="4:3">4:3 横版</option>
          <option value="3:4">3:4 竖版</option>
          <option value="4:5">4:5 社媒竖版</option>
          <option value="16:9">16:9 宽屏</option>
          <option value="9:16">9:16 手机</option>
          <option value="custom">自定义</option>
        </select>
        <div v-if="pendingRatio === 'custom'" class="flex items-center gap-1">
          <input type="number" v-model.number="customW" class="w-16 bg-gray-800 border border-gray-700 rounded px-1 py-1 text-xs text-center" placeholder="宽" />
          <span class="text-gray-500">×</span>
          <input type="number" v-model.number="customH" class="w-16 bg-gray-800 border border-gray-700 rounded px-1 py-1 text-xs text-center" placeholder="高" />
          <button @click="applyCustomSize" class="px-2 py-1 bg-blue-600 rounded text-xs hover:bg-blue-500">应用</button>
        </div>
        <select value="" @change="applyPlatformPreset" class="bg-gray-800 border border-gray-700 rounded px-1.5 py-1 text-gray-300 focus:outline-none text-xs" title="平台标准像素一键套用">
          <option value="" disabled>🍿 平台尺寸</option>
          <option v-for="p in PLATFORM_SIZES" :key="p.name" :value="`${p.w}x${p.h}`">{{ p.name }}</option>
        </select>
        <div class="flex-1"></div>
        <button @click="undo" :disabled="historyIndex <= 0" class="px-2 py-1 bg-gray-800 rounded hover:bg-gray-700 disabled:opacity-30" title="撤销 (Ctrl+Z)">↩</button>
        <button @click="redo" :disabled="historyIndex >= history.length - 1" class="px-2 py-1 bg-gray-800 rounded hover:bg-gray-700 disabled:opacity-30" title="重做 (Ctrl+Y)">↪</button>
        <div class="w-px h-4 bg-gray-700 mx-2"></div>
        <button @click="toggleAnimations" class="px-2 py-1 bg-gray-800 rounded hover:bg-gray-700" title="暂停 / 播放动效（选择会记住，下次打开沿用）">
          {{ animationsStopped ? '▶ 播放' : '⏸ 暂停' }}
        </button>
        <div class="w-px h-4 bg-gray-700 mx-2"></div>
        <button @click="setFocusMode(true)" class="px-2 py-1 bg-gray-800 hover:bg-gray-700 rounded" title="全屏专注编辑：隐藏两侧栏与工具条，画布占满整屏（. 键随时切换）">⛶ 全屏</button>
      </div>

      <!-- 导入草稿横幅：草稿只活在当前会话，给一条明显的回程/导出提示 -->
      <div v-if="draftTemplate" class="px-4 py-1.5 bg-amber-500/10 border-b border-amber-500/30 flex items-center gap-3 text-xs shrink-0">
        <span class="text-amber-300">📥 草稿模板「{{ draftTemplate.name }}」· 未写入源文件，可在 ⚙ 高级功能 → 📤 导出 拿回 JSON / .ts</span>
        <span class="flex-1"></span>
        <button @click="exitDraft" class="px-2 py-1 bg-gray-800 hover:bg-gray-700 rounded text-gray-300 shrink-0">✕ 退出草稿</button>
      </div>

      <!-- 自动暂存恢复横幅：草稿箱按模板各存一份，多份时下拉选一个恢复 -->
      <div v-if="autosavePrompt.length" class="px-4 py-1.5 bg-blue-500/10 border-b border-blue-500/30 flex items-center gap-3 text-xs shrink-0">
        <span class="text-blue-300 shrink-0">🕘 未导出的编辑{{ autosavePrompt.length > 1 ? `（草稿箱 ${autosavePrompt.length} 份）` : '' }}：</span>
        <select v-if="autosavePrompt.length > 1" v-model.number="autosavePick" class="bg-gray-800 border border-gray-700 rounded px-1.5 py-0.5 text-blue-200 max-w-[240px] shrink-0">
          <option v-for="(d, i) in autosavePrompt" :key="d.tpl.id" :value="i">「{{ d.tpl.name }}」· {{ fmtAgo(d.at) }}</option>
        </select>
        <span v-else class="text-blue-200 truncate">「{{ autosavePrompt[0].tpl.name }}」· {{ fmtAgo(autosavePrompt[0].at) }}</span>
        <span class="flex-1"></span>
        <button @click="restoreAutosave" class="px-2 py-1 bg-blue-600 hover:bg-blue-500 rounded text-white shrink-0">恢复编辑</button>
        <button @click="dismissAutosave" class="px-2 py-1 bg-gray-800 hover:bg-gray-700 rounded text-gray-300 shrink-0" title="只丢这一份草稿，其余照常保留">忽略</button>
      </div>

      <!-- 元素操作条（悬浮层，出现/消失不推动画布：复制/删除/锁定/图层/对齐） -->
      <div v-if="selectedIds.length > 0" :class="['absolute left-0 right-0 bg-gray-900/90 backdrop-blur border-b border-gray-800 flex items-center px-4 py-1.5 gap-1 text-xs z-20 flex-wrap', focusMode ? (draftTemplate && autosavePrompt.length ? 'top-[58px]' : (draftTemplate || autosavePrompt.length) ? 'top-[29px]' : 'top-0') : (draftTemplate && autosavePrompt.length ? 'top-[98px]' : (draftTemplate || autosavePrompt.length) ? 'top-[69px]' : 'top-10')]">
        <span class="text-gray-500 mr-1">{{ selectedIds.length > 1 ? `已选 ${selectedIds.length} 项` : '已选 1 项' }}</span>
        <button @click="duplicateSelected()" class="px-2 py-1 bg-gray-800 rounded hover:bg-gray-700" title="复制一份 (Ctrl+D)">⧉ 复制</button>
        <button @click="copySelected()" class="px-2 py-1 bg-gray-800 rounded hover:bg-gray-700" title="拷贝 (Ctrl+C)">📋</button>
        <button @click="pasteClipboard()" :disabled="!clipboard.length" class="px-2 py-1 bg-gray-800 rounded hover:bg-gray-700 disabled:opacity-30" title="粘贴 (Ctrl+V)">📥</button>
        <button @click="deleteSelected()" class="px-2 py-1 bg-gray-800 rounded hover:bg-red-700/60" title="删除 (Delete)">🗑</button>
        <button @click="toggleLockSelected()" class="px-2 py-1 bg-gray-800 rounded hover:bg-gray-700" title="锁定 / 解锁">{{ anySelectedLocked ? '🔓 解锁' : '🔒 锁定' }}</button>
        <div class="w-px h-4 bg-gray-700 mx-1"></div>
        <button @click="reorderSelected('front')" class="px-2 py-1 bg-gray-800 rounded hover:bg-gray-700" title="移到最前">⤒</button>
        <button @click="reorderSelected('forward')" class="px-2 py-1 bg-gray-800 rounded hover:bg-gray-700" title="上移一层">↑</button>
        <button @click="reorderSelected('backward')" class="px-2 py-1 bg-gray-800 rounded hover:bg-gray-700" title="下移一层">↓</button>
        <button @click="reorderSelected('back')" class="px-2 py-1 bg-gray-800 rounded hover:bg-gray-700" title="移到最后">⤓</button>
        <div class="w-px h-4 bg-gray-700 mx-1"></div>
        <span class="text-gray-600">微调:</span>
        <select v-model.number="nudgeStep" class="bg-gray-800 border border-gray-700 rounded px-1 py-0.5 text-xs text-gray-200 focus:outline-none focus:border-blue-500"
                title="每次点按移动多少设计像素（方向键默认 2px，Shift+方向键 10px）">
          <option :value="1">1px</option>
          <option :value="2">2px</option>
          <option :value="5">5px</option>
          <option :value="10">10px</option>
        </select>
        <button @click="nudgeSelected(-nudgeStep, 0)" class="px-2 py-1 bg-gray-800 rounded hover:bg-gray-700" :title="`左移 ${nudgeStep}px`">◀</button>
        <button @click="nudgeSelected(nudgeStep, 0)" class="px-2 py-1 bg-gray-800 rounded hover:bg-gray-700" :title="`右移 ${nudgeStep}px`">▶</button>
        <button @click="nudgeSelected(0, -nudgeStep)" class="px-2 py-1 bg-gray-800 rounded hover:bg-gray-700" :title="`上移 ${nudgeStep}px`">▲</button>
        <button @click="nudgeSelected(0, nudgeStep)" class="px-2 py-1 bg-gray-800 rounded hover:bg-gray-700" :title="`下移 ${nudgeStep}px`">▼</button>
        <div class="w-px h-4 bg-gray-700 mx-1"></div>
        <span class="text-gray-600">对齐画布:</span>
        <button @click="alignSelected('left')" class="px-2 py-1 bg-gray-800 rounded hover:bg-gray-700" title="左对齐">⬅</button>
        <button @click="alignSelected('hcenter')" class="px-2 py-1 bg-gray-800 rounded hover:bg-gray-700" title="水平居中">↔</button>
        <button @click="alignSelected('right')" class="px-2 py-1 bg-gray-800 rounded hover:bg-gray-700" title="右对齐">➡</button>
        <button @click="alignSelected('top')" class="px-2 py-1 bg-gray-800 rounded hover:bg-gray-700" title="顶对齐">⬆</button>
        <button @click="alignSelected('vcenter')" class="px-2 py-1 bg-gray-800 rounded hover:bg-gray-700" title="垂直居中">↕</button>
        <button @click="alignSelected('bottom')" class="px-2 py-1 bg-gray-800 rounded hover:bg-gray-700" title="底对齐">⬇</button>
        <template v-if="selectedIds.length > 1">
          <div class="w-px h-4 bg-gray-700 mx-1"></div>
          <span class="text-gray-600">对齐所选:</span>
          <button @click="alignToSelection('left')" class="px-2 py-1 bg-gray-800 rounded hover:bg-gray-700" title="全部贴齐最左">⬅</button>
          <button @click="alignToSelection('hcenter')" class="px-2 py-1 bg-gray-800 rounded hover:bg-gray-700" title="全部水平居中对齐">↔</button>
          <button @click="alignToSelection('right')" class="px-2 py-1 bg-gray-800 rounded hover:bg-gray-700" title="全部贴齐最右">➡</button>
          <button @click="alignToSelection('top')" class="px-2 py-1 bg-gray-800 rounded hover:bg-gray-700" title="全部贴齐最上">⬆</button>
          <button @click="alignToSelection('vcenter')" class="px-2 py-1 bg-gray-800 rounded hover:bg-gray-700" title="全部垂直居中对齐">↕</button>
          <button @click="alignToSelection('bottom')" class="px-2 py-1 bg-gray-800 rounded hover:bg-gray-700" title="全部贴齐最下">⬇</button>
        </template>
        <template v-if="selectedIds.length > 2">
          <div class="w-px h-4 bg-gray-700 mx-1"></div>
          <button @click="distributeSelected('h')" class="px-2 py-1 bg-gray-800 rounded hover:bg-gray-700" title="水平等间距分布（两端不动，按视觉中心）">⇋ 水平分布</button>
          <button @click="distributeSelected('v')" class="px-2 py-1 bg-gray-800 rounded hover:bg-gray-700" title="垂直等间距分布（两端不动，按视觉中心）">⇵ 垂直分布</button>
        </template>
      </div>

      <!-- 画布容器 -->
      <div ref="viewportContainerRef" class="flex-1 p-8 flex items-center justify-center overflow-hidden" :style="{ cursor: isPanning ? 'grabbing' : spaceHeld ? 'grab' : 'default' }" @wheel.prevent="handleWheel" @mousedown="handleMouseDown">
        <div class="stage-frame w-full h-full relative overflow-hidden" style="max-width: 100%; max-height: 100%;">
          <template v-if="displayTemplate">
            <TemplateRenderer
              ref="rendererRef"
              :template="displayTemplate"
              :scale="canvasScale"
              :offset-x="canvasOffset.x"
              :offset-y="canvasOffset.y"
              :selected-ids="selectedIds"
              :freeze="animationsStopped"
              :is-panning="isPanning"
              :pan-mode="spaceHeld"
              :view-width="designSize.w"
              :view-height="designSize.h"
              :ratio-algorithm="ratioAlgorithm"
              :content-anchor="ratioAnchor"
              :center-line="prefs.guides"
              :rulers="prefs.rulers"
              :guides="currentGuides"
              :grid="prefs.grid"
              :grid-step="prefs.gridStep"
              :grid-style="prefs.gridStyle"
              @update-guides="onGuidesUpdate"
              @broken-images="onBrokenImages"
              @select-element="handleSelectElement"
              @update-elements="handleElementsMove"
              @update-element-transform="handleTransformUpdate"
            />
            <div v-if="brokenImages.length" class="absolute top-2 right-2 z-50">
              <button @click="brokenListOpen = !brokenListOpen"
                      class="bg-red-600/90 hover:bg-red-500 text-white text-xs px-2.5 py-1.5 rounded-md shadow-lg flex items-center gap-1">
                ⚠ {{ brokenImages.length }} 张图加载失败
              </button>
              <div v-if="brokenListOpen" class="absolute right-0 top-full mt-1 w-64 max-h-56 overflow-auto bg-gray-900/95 border border-red-900 rounded-md shadow-xl p-2 space-y-1">
                <p class="text-[10px] text-gray-500 leading-relaxed">「{{ draftTemplate?.name || currentTemplate?.name || '-' }}」内加载失败的图片元素，点击可选中并在属性面板换图：</p>
                <button v-for="id in brokenImages" :key="id" @click="jumpToBrokenImage(id)"
                        class="w-full text-left text-xs font-mono text-red-300 hover:bg-red-900/40 rounded px-2 py-1 truncate">🖼 {{ id }}</button>
              </div>
            </div>
          </template>
          <div v-else class="flex flex-col items-center justify-center h-full gap-5 select-none">
            <div class="stage-ghost flex items-center justify-center rounded-lg border-2 border-dashed border-gray-600/50"
                 :style="{ width: '180px', maxHeight: '46vh', aspectRatio: designSize.w + ' / ' + designSize.h }">
              <span class="text-base font-medium tracking-[0.2em] text-gray-500">{{ canvasRatio === 'custom' ? designSize.w + '×' + designSize.h : canvasRatio }}</span>
            </div>
            <p class="text-sm text-gray-500">从左侧选一个模板，开始这一张</p>
          </div>
        </div>
      </div>

      <!-- 画布底部状态条：当前模板 / 设计尺寸 / 缩放（全屏专注模式换成底部浮条） -->
      <div v-if="displayTemplate && !focusMode" class="px-4 py-1.5 border-t border-gray-800 bg-gray-900/50 flex items-center gap-4 text-[11px] whitespace-nowrap overflow-x-auto nice-scroll">
        <span class="text-gray-400 shrink-0" :title="currentCatName ? '分类：' + currentCatName : '未分类'">当前：{{ draftTemplate?.name || currentTemplate?.name || '-' }}</span>
        <span class="text-gray-500 shrink-0 tabular-nums">设计尺寸 {{ designSize.w }} × {{ designSize.h }}（{{ canvasRatio }}）· 缩放 {{ Math.round(canvasScale * 100) }}% 仅影响预览</span>
        <button @click="resetToOriginal" :disabled="!editCount" class="ml-auto shrink-0 border rounded px-2 py-0.5 transition-colors" :class="editCount ? 'text-gray-400 hover:text-white border-gray-700 hover:border-red-500' : 'text-gray-700 border-gray-800 cursor-not-allowed'" :title="editCount ? `丢弃全部 ${editCount} 处改动，回到模板原始状态（重置后 Ctrl+Z 可撤销）` : '当前没有任何改动，无需重置'">↺ 重置{{ editCount ? `（${editCount} 处改动）` : '' }}</button>
        <button @click="hotkeysOpen = true" class="shrink-0 text-gray-400 hover:text-white border border-gray-700 hover:border-gray-500 rounded px-2 py-0.5 transition-colors" title="查看全部鼠标与键盘操作">⌨ 快捷键</button>
      </div>

      <!-- ⛶ 全屏专注模式底部浮条：缩放/比例/撤销/动效/另存/导出常驻，退出入口显眼 -->
      <div v-if="focusMode" class="absolute left-1/2 -translate-x-1/2 bottom-3 z-40 flex items-center gap-1.5 bg-gray-900/90 backdrop-blur border border-gray-700 rounded-full px-3 py-1.5 text-xs shadow-2xl whitespace-nowrap">
        <span class="text-gray-500 max-w-[240px] truncate tabular-nums">{{ draftTemplate?.name || currentTemplate?.name || '-' }} · {{ designSize.w }}×{{ designSize.h }}（{{ canvasRatio }}）</span>
        <div class="w-px h-4 bg-gray-700 mx-1"></div>
        <button @click="zoom(-0.1)" class="px-2 py-1 bg-gray-800 rounded hover:bg-gray-700" title="缩小">－</button>
        <span class="text-gray-400 w-10 text-center tabular-nums">{{ Math.round(canvasScale * 100) }}%</span>
        <button @click="zoom(0.1)" class="px-2 py-1 bg-gray-800 rounded hover:bg-gray-700" title="放大">＋</button>
        <button @click="fitScreen" class="px-2 py-1 bg-gray-800 rounded hover:bg-gray-700" title="适应窗口并居中">适应</button>
        <div class="w-px h-4 bg-gray-700 mx-1"></div>
        <select v-model="pendingRatio" @change="handleRatioChange" class="bg-gray-800 border border-gray-700 rounded px-1.5 py-1 text-gray-300 focus:outline-none text-xs" title="切换画布比例">
          <option value="1:1">1:1</option><option value="4:3">4:3</option><option value="3:4">3:4</option>
          <option value="4:5">4:5</option><option value="16:9">16:9</option><option value="9:16">9:16</option><option value="custom">自定义</option>
        </select>
        <template v-if="pendingRatio === 'custom'">
          <input type="number" v-model.number="customW" class="w-14 bg-gray-800 border border-gray-700 rounded px-1 py-1 text-xs text-center" placeholder="宽" />
          <span class="text-gray-500">×</span>
          <input type="number" v-model.number="customH" class="w-14 bg-gray-800 border border-gray-700 rounded px-1 py-1 text-xs text-center" placeholder="高" />
          <button @click="applyCustomSize" class="px-2 py-1 bg-blue-600 rounded hover:bg-blue-500">应用</button>
        </template>
        <select value="" @change="applyPlatformPreset" class="bg-gray-800 border border-gray-700 rounded px-1.5 py-1 text-gray-300 focus:outline-none text-xs" title="平台标准像素一键套用">
          <option value="" disabled>🍿</option>
          <option v-for="p in PLATFORM_SIZES" :key="p.name" :value="`${p.w}x${p.h}`">{{ p.name }}</option>
        </select>
        <div class="w-px h-4 bg-gray-700 mx-1"></div>
        <button @click="undo" :disabled="historyIndex <= 0" class="px-2 py-1 bg-gray-800 rounded hover:bg-gray-700 disabled:opacity-30" title="撤销 (Ctrl+Z)">↩</button>
        <button @click="redo" :disabled="historyIndex >= history.length - 1" class="px-2 py-1 bg-gray-800 rounded hover:bg-gray-700 disabled:opacity-30" title="重做 (Ctrl+Y)">↪</button>
        <button @click="toggleAnimations" class="px-2 py-1 bg-gray-800 rounded hover:bg-gray-700" title="暂停 / 播放动效">{{ animationsStopped ? '▶' : '⏸' }}</button>
        <button @click="toggleFocusPanel" class="px-2 py-1 rounded" :class="focusPanel ? 'bg-blue-600 text-white hover:bg-blue-500' : 'bg-gray-800 hover:bg-gray-700'" title="唤出 / 收起右侧属性面板（改字号/配色/换图/字体等元素编辑）">🎛️ 属性</button>
        <div class="w-px h-4 bg-gray-700 mx-1"></div>
        <button @click="saveAsMyTemplate" class="px-2 py-1 bg-gray-800 rounded hover:bg-gray-700" title="把当前画面（含全部改动）固化存入「我的模板」">💾</button>
        <button @click="showBatchModal = true" :disabled="!displayTemplate" class="px-2 py-1 bg-gray-800 hover:bg-gray-700 disabled:opacity-40 rounded-full text-gray-200" title="批量出图：贴表格一行一条，一次导出 N 张">🧮 批量</button>
        <button @click="showExportModal = true" :disabled="!displayTemplate" class="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 rounded-full text-white" title="导出图片">📤 导出</button>
        <button @click="setFocusMode(false)" class="px-2.5 py-1 bg-gray-800 hover:bg-gray-700 rounded-full text-gray-200" title="退出全屏专注编辑（. 或 Esc）">✕ 退出</button>
      </div>

      <!-- 我的模板操作反馈 toast：贴在画布底部居中堆叠（最多 3 条），自动消失、可点 ✕ 立刻关掉 -->
      <div v-if="mineToasts.length" class="absolute left-1/2 bottom-14 -translate-x-1/2 z-50 flex flex-col-reverse items-center gap-1.5 max-w-[92%]">
        <div v-for="t in mineToasts" :key="t.id" class="flex items-center gap-2 bg-gray-900/95 border border-gray-700 rounded-lg px-4 py-2 text-xs text-gray-200 shadow-xl">
          <img v-if="t.thumb" :src="t.thumb" alt="" class="w-10 h-10 rounded object-cover border border-gray-700 shrink-0" />
          <span class="whitespace-pre-wrap">{{ t.msg }}</span>
          <button @click="dismissMineToast(t.id)" title="关闭" class="shrink-0 text-gray-500 hover:text-white leading-none cursor-pointer">×</button>
        </div>
      </div>

      <FloatingToolbar
        v-if="displayTemplate && selectedId"
        :selected-id="selectedId"
        :template="displayTemplate"
        :overrides="overrides"
        :canvas-scale="canvasScale"
        :nudge-step="nudgeStep"
        @update:overrides="handleOverrideUpdate"
      />
    </main>

    <!-- 右侧：属性面板 -->
    <aside v-show="!focusMode || focusPanel" :class="[sidebarClass, focusMode ? 'fixed inset-y-0 right-0 z-30 shadow-2xl' : 'shrink-0']" class="bg-gray-900 border-l border-gray-800 flex flex-col overflow-hidden">
      <div class="p-4 border-b border-gray-800 flex justify-between items-center">
        <h2 class="text-lg font-bold">🎛️ 属性控制</h2>
        <button @click="showDevModal = true" class="text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-1.5 rounded border border-gray-700" title="备份导入导出、AI 复刻与链路、模板管理、历史检视都住这里">⚙ 高级功能</button>
      </div>
      <!-- 分区：元素（选中即直达）/ 风格（配色·字体·种子） -->
      <div class="flex gap-1 px-4 pt-2 border-b border-gray-800">
        <button v-for="t in propTabs" :key="t.id" @click="switchPropTab(t.id)"
                class="flex-1 px-2 py-2 text-xs rounded-t border-b-2 transition-colors cursor-pointer"
                :class="propTab === t.id ? 'text-white border-blue-500 bg-gray-800/60' : 'text-gray-400 border-transparent hover:text-gray-200'">
          {{ t.label }}
        </button>
      </div>
      <div ref="propScrollRef" class="nice-scroll flex-1 overflow-y-auto p-4 space-y-4">

        <template v-if="propTab === 'copy'">
          <div class="border border-emerald-500/30 bg-emerald-900/10 rounded-lg p-3 space-y-1.5">
            <div class="flex items-center gap-2">
              <h3 class="text-sm font-bold text-emerald-300">📝 文案槽</h3>
              <span class="ml-auto text-[10px] text-gray-500 shrink-0">已改 {{ copyEditedCount }} / {{ copySlots.length }}</span>
            </div>
            <p class="text-[10px] text-gray-500 leading-relaxed">
              从上到下依次填词即可出图：光标进入某行会自动在画布上选中对应元素，键盘 <kbd class="bg-gray-800 border border-gray-600 rounded px-1 text-[9px] text-gray-300">Tab</kbd> 跳下一条，不用回画布点。改动只作用于当前画面，不写模板源文件。
            </p>
            <p class="text-[10px] text-gray-500 leading-relaxed">
              带 <span class="text-purple-300">🖼位</span> 的行是模板留的图片坑位（「这里放主子的脸」这类提示语）：点行尾 <span class="text-purple-300">🖼</span> 就地换成图片框，接着上传图 / 选素材库即可；普通文字行同样可用，按自身位置生成框。Ctrl+Z 退回文字。
            </p>
          </div>
          <div v-if="!copySlots.length" class="border border-dashed border-gray-700 rounded-lg p-4 text-xs text-gray-500">
            当前画面没有文本元素（纯图形/图片模板）。
          </div>
          <div v-for="(row, i) in copySlots" :key="row.id"
               class="border rounded-lg p-2.5 transition-colors"
               :class="selectedId === row.id ? 'border-emerald-500/60 bg-emerald-900/10' : 'border-gray-700 bg-gray-800/30'">
            <div class="flex items-center gap-1.5 mb-1 cursor-pointer select-none" @click="pickFromCopy(row.id)">
              <span class="text-[10px] text-gray-600 w-4 shrink-0 text-right">{{ i + 1 }}</span>
              <span class="text-[10px] text-gray-400 flex-1 min-w-0 truncate" :title="row.id">{{ row.role }} · {{ row.id }}</span>
              <span v-if="row.edited" class="text-[9px] text-emerald-400 shrink-0">已改</span>
              <span v-if="row.imageSlot" class="text-[9px] text-purple-300 shrink-0" title="模板留的图片坑位（这行字本来就是「把图放这里」的提示）">🖼位</span>
              <button v-if="row.edited" tabindex="-1" @click.stop="revertSlot(row.id)" title="仅撤销这一条文案，回到模板原文"
                      class="shrink-0 px-1.5 py-0.5 rounded border border-gray-600 text-[9px] text-gray-400 hover:text-white hover:border-gray-400 cursor-pointer">↺</button>
              <button tabindex="-1" @click.stop="textToImage(row.id)" :title="row.imageSlot ? '换成图片：原地生成同尺寸图片框，随即可上传 / 选素材库（Ctrl+Z 退回文字）' : '按这行字的位置和大小生成图片框，随即可上传 / 选素材库（Ctrl+Z 退回文字）'"
                      class="shrink-0 px-1.5 py-0.5 rounded border border-purple-600/50 text-[9px] text-purple-300 hover:text-white hover:border-purple-400 cursor-pointer">🖼</button>
              <span class="text-[9px] text-gray-600 shrink-0">{{ row.content.length }} 字</span>
            </div>
            <textarea :value="row.content" rows="2" :data-copy-slot="row.id"
                      @focus="pickFromCopy(row.id)"
                      @input="setSlotContent(row.id, ($event.target as HTMLTextAreaElement).value); growSlot($event.target as HTMLTextAreaElement)"
                      @keydown.tab.prevent="moveSlotFocus($event, 1)"
                      @keydown.shift.tab.prevent="moveSlotFocus($event, -1)"
                      class="w-full bg-gray-800 border border-gray-700 rounded p-2 text-sm text-gray-200 resize-y overflow-hidden focus:outline-none focus:border-emerald-500"></textarea>
          </div>
        </template>

        <template v-if="propTab === 'element'">
        <!-- 选元素下拉：透明/被覆盖而点不中的层，从这里直接选 -->
        <div class="border border-gray-700 rounded-lg p-3 bg-gray-800/30 flex items-center gap-2">
          <span class="text-xs text-gray-400 shrink-0">🎯 选元素</span>
          <select :value="selectedId || ''" @change="pickElement(($event.target as HTMLSelectElement).value)"
                  class="flex-1 min-w-0 bg-gray-800 border border-gray-700 rounded p-1.5 text-xs text-gray-200 focus:outline-none focus:border-blue-500">
            <option value="">— 未选中 · Tab 可遍历 —</option>
            <option v-for="p in pickableElements" :key="p.id" :value="p.id">{{ p.label }}</option>
          </select>
          <button @click="selectHelp = true" title="怎么选中想改的元素？"
                  class="w-6 h-6 shrink-0 rounded-full border border-gray-600 text-gray-400 hover:text-white hover:border-gray-400 text-xs leading-none">?</button>
        </div>
        <!-- Transform（单选，与 Canvas 双向同步） -->
        <div v-if="selectedEl" class="border border-gray-700 rounded-lg p-4 space-y-3 bg-gray-800/30">
          <div class="flex justify-between items-center">
            <h3 class="text-sm font-bold text-gray-200 cursor-pointer select-none" @click="transformOpen = !transformOpen" :title="transformOpen ? '收起数值编辑' : '展开 X/Y/尺寸/旋转'">
              <span class="text-gray-500">{{ transformOpen ? '▾' : '▸' }}</span> 📐 Transform
            </h3>
            <button @click="selectedIds = []" class="text-xs text-gray-500 hover:text-gray-300">取消选中</button>
          </div>
          <template v-if="transformOpen">
          <div v-if="selectedEl.locked" class="text-xs text-amber-400">🔒 已锁定，不可编辑几何属性</div>
          <div class="grid grid-cols-2 gap-2" v-else>
            <label class="text-xs text-gray-400 flex flex-col gap-1">X
              <input type="number" :value="Math.round(selectedEl.x)" @input="setNumProp('x', $event)" class="bg-gray-800 border border-gray-700 rounded p-1.5 text-sm text-gray-200 focus:outline-none focus:border-blue-500" />
            </label>
            <label class="text-xs text-gray-400 flex flex-col gap-1">Y
              <input type="number" :value="Math.round(selectedEl.y)" @input="setNumProp('y', $event)" class="bg-gray-800 border border-gray-700 rounded p-1.5 text-sm text-gray-200 focus:outline-none focus:border-blue-500" />
            </label>
            <label class="text-xs text-gray-400 flex flex-col gap-1">Width
              <input type="number" min="1" :value="Math.round(selectedEl.width)" @input="setNumProp('width', $event)" class="bg-gray-800 border border-gray-700 rounded p-1.5 text-sm text-gray-200 focus:outline-none focus:border-blue-500" />
            </label>
            <label class="text-xs text-gray-400 flex flex-col gap-1">Height
              <input type="number" min="1" :value="Math.round(selectedEl.height)" @input="setNumProp('height', $event)" class="bg-gray-800 border border-gray-700 rounded p-1.5 text-sm text-gray-200 focus:outline-none focus:border-blue-500" />
            </label>
          </div>
          <label v-if="!selectedEl.locked" class="text-xs text-gray-400 flex flex-col gap-1">Rotation（{{ selectedEl.rotation || 0 }}°）
            <div class="flex items-center gap-2">
              <input type="range" min="-180" max="180" step="1" :value="selectedEl.rotation || 0"
                     @input="setNumProp('rotation', $event)" class="flex-1 accent-blue-500" />
              <input type="number" :value="selectedEl.rotation || 0" @input="setNumProp('rotation', $event)"
                     class="w-16 bg-gray-800 border border-gray-700 rounded p-1.5 text-sm text-gray-200 focus:outline-none focus:border-blue-500" />
            </div>
          </label>
          </template>
        </div>

        <!-- 图片属性（Image Element 一等公民：替换 / Fit / objectFit） -->
        <div v-if="selectedText === null && selectedEl && selectedEl.type === 'image'" class="border border-purple-500/30 bg-purple-900/10 rounded-lg p-4 space-y-3">
          <div class="flex items-center gap-2">
            <h3 class="text-sm font-bold text-purple-300">🖼️ 图片</h3>
            <button v-if="isSvgSrc(selectedEl.src)" @click="svgSizeHelp = true" class="w-5 h-5 shrink-0 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-400 text-[10px] leading-none"
                    title="SVG 怎么改大小？">?</button>
          </div>
          <button v-if="isSvgSrc(selectedEl.src)" @click="svgEditor = { id: selectedEl.id, src: selectedEl.src }"
                  class="w-full px-3 py-2 bg-purple-700/60 hover:bg-purple-600/60 rounded text-xs text-white">
            ✏️ 预览 / 编辑 SVG 源码（含让 AI 改图）
          </button>
          <div class="flex gap-2">
            <label class="flex-1 text-center bg-blue-600 hover:bg-blue-500 text-white py-2 rounded text-xs font-medium cursor-pointer">
              📁 替换图片（上传）
              <input type="file" accept="image/*" class="hidden" @change="onImageUpload" />
            </label>
            <button @click="fitImageToCanvas()" class="px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded text-xs">铺满画布</button>
          </div>
          <div class="flex gap-2">
            <input v-model="imageUrlInput" placeholder="或输入图片 URL…" class="flex-1 min-w-0 bg-gray-800 border border-gray-700 rounded px-2 py-1.5 text-xs focus:outline-none focus:border-blue-500" />
            <button @click="applyImageUrl()" class="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded text-xs shrink-0">应用</button>
            <button v-if="assetsOn" @click="saveUrlToAssets()" :disabled="!imageUrlInput.trim() || assetBusy"
                    class="px-3 py-1.5 bg-purple-700/60 hover:bg-purple-600/60 disabled:opacity-40 rounded text-xs text-white shrink-0"
                    title="让 dev 服务器下载这张图存入素材库，不再依赖外链">存入</button>
          </div>

          <!-- 本地图库：dev 期上传落盘到 public/images/<分类>/，点缩略图即指向该路径 -->
          <div v-if="assetsOn" class="space-y-2 border-t border-purple-500/20 pt-3">
            <div class="flex items-center gap-2">
              <h4 @click="assetsOpen = !assetsOpen" class="text-xs text-gray-400 cursor-pointer select-none">
                <span class="text-gray-500">{{ assetsOpen ? '▾' : '▸' }}</span> 🖼️ 素材库<span v-if="assetTotal" class="text-gray-500"> · {{ assetTotal }}</span>
              </h4>
              <span class="flex-1"></span>
              <button @click="assetHelp = !assetHelp" class="w-5 h-5 shrink-0 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-400 text-[10px] leading-none" title="素材库是干什么的？">?</button>
            </div>
            <template v-if="assetsOpen">
              <div class="flex items-center gap-2">
                <span class="text-xs text-gray-400 shrink-0">存入</span>
                <select v-model="assetCategory" class="flex-1 min-w-0 bg-gray-800 border border-gray-700 rounded px-2 py-1 text-xs text-gray-200 focus:outline-none focus:border-purple-500">
                  <option v-for="c in assetCategories" :key="c.id" :value="c.id">{{ c.name }}</option>
                </select>
                <button @click="loadAssets()" class="shrink-0 px-2 py-1 bg-gray-800 hover:bg-gray-700 rounded text-xs" title="重新读取 public/images">↻</button>
              </div>
              <div v-if="assetTotal" class="nice-scroll max-h-48 overflow-y-auto space-y-2 pr-1">
                <div v-for="g in assetGroups" :key="g.category">
                  <div class="text-[10px] text-gray-500 mb-1">📁 {{ assetCatName(g.category) }} · {{ g.files.length }}</div>
                  <div class="grid grid-cols-3 gap-1.5">
                    <img v-for="a in g.files" :key="a.url" :src="a.url" :alt="a.name" :title="`/images/${g.category ? g.category + '/' : ''}${a.name}`"
                         @click="pickAsset(a.url)"
                         class="w-full h-14 object-cover rounded border cursor-pointer bg-gray-800 transition-colors"
                         :class="selectedEl.src === a.url ? 'border-purple-400' : 'border-gray-700 hover:border-gray-500'" />
                  </div>
                </div>
              </div>
              <div v-else class="text-xs text-gray-600">public/images 还是空的：上传第一张会自动建对应分类文件夹。</div>
            </template>
            <p v-if="assetBusy" class="text-xs text-purple-300">写入 public/images/{{ assetCategory }} 中…</p>
            <p v-else-if="assetNote" class="text-xs text-gray-500 break-all">{{ assetNote }}</p>
          </div>
          <p v-else class="text-xs text-gray-600">当前是打包版：上传只生成本会话临时地址。想要落盘素材夹请用 npm run dev 打开。</p>
          <div class="grid grid-cols-2 gap-2">
            <label class="text-xs text-gray-400 flex flex-col gap-1">填充方式
              <select :value="selectedEl.objectFit || 'cover'" @change="setElProp('objectFit', ($event.target as HTMLSelectElement).value)" class="bg-gray-800 border border-gray-700 rounded p-1.5 text-sm text-gray-200 focus:outline-none focus:border-blue-500">
                <option value="cover">cover 裁切填满</option>
                <option value="contain">contain 完整显示</option>
                <option value="fill">fill 拉伸</option>
              </select>
            </label>
            <label class="text-xs text-gray-400 flex flex-col gap-1">焦点位置
              <select :value="selectedEl.objectPosition || 'center'" @change="setElProp('objectPosition', ($event.target as HTMLSelectElement).value)" class="bg-gray-800 border border-gray-700 rounded p-1.5 text-sm text-gray-200 focus:outline-none focus:border-blue-500">
                <option value="center">center</option>
                <option value="top">top</option>
                <option value="bottom">bottom</option>
                <option value="left">left</option>
                <option value="right">right</option>
                <option value="50% 25%">50% 25%</option>
                <option value="50% 75%">50% 75%</option>
              </select>
            </label>
          </div>
          <label class="text-xs text-gray-400 flex flex-col gap-1">圆角（{{ selectedEl.borderRadius || 0 }}px）
            <div class="flex items-center gap-2">
              <input type="range" min="0" :max="Math.max(1, Math.round(Math.min(selectedEl.width, selectedEl.height) / 2))" step="1"
                     :value="selectedEl.borderRadius || 0" @input="setNumProp('borderRadius', $event)" class="flex-1 accent-blue-500" />
              <input type="number" min="0" :value="selectedEl.borderRadius || 0" @input="setNumProp('borderRadius', $event)"
                     class="w-16 bg-gray-800 border border-gray-700 rounded p-1.5 text-sm text-gray-200 focus:outline-none focus:border-blue-500" />
            </div>
          </label>
          <p class="text-xs text-gray-600">替换图片会保留位置 / 尺寸 / 旋转 / 层级。</p>
        </div>

        <!-- 文本属性（读取 resolved 值，双向同步） -->
        <div v-if="selectedText" class="border border-blue-500/30 bg-blue-900/10 rounded-lg p-4 space-y-4">
          <div class="flex justify-between items-center">
            <h3 class="text-sm font-bold text-blue-400">✏️ 文本属性</h3>
            <button @click="selectedIds = []" class="text-xs text-gray-500 hover:text-gray-300">取消选中</button>
          </div>
          <div class="flex items-center gap-2 flex-wrap">
            <button @click="textToImage(selectedText.id)" :title="selectedText.imageSlot ? '这条是模板留的图片坑位：原地生成同尺寸图片框，随即可上传 / 选素材库' : '按这段文字的位置和大小生成图片框，随即可上传 / 选素材库'"
                    class="px-2.5 py-1.5 rounded border border-purple-500/50 bg-purple-900/30 text-xs text-purple-200 hover:bg-purple-900/50 hover:border-purple-400">
              🖼 换成图片
            </button>
            <span v-if="selectedText.imageSlot" class="text-[10px] text-purple-300/80">🖼位 · 模板留的图片坑位</span>
            <span v-else class="text-[10px] text-gray-500">Ctrl+Z 可退回文字</span>
          </div>
          <div>
            <label class="block text-xs text-gray-400 mb-1">文本内容</label>
            <textarea :value="selectedText.content" @input="setElProp('content', ($event.target as HTMLTextAreaElement).value)" rows="3"
                      class="w-full bg-gray-800 border border-gray-700 rounded p-2 text-sm text-gray-200 resize-y focus:outline-none focus:border-blue-500"></textarea>
          </div>
          <div>
            <label class="block text-xs text-gray-400 mb-1">字体</label>
            <select :value="selectedText.fontFamily || BASE_FONTS_STACK" @change="setElProp('fontFamily', ($event.target as HTMLSelectElement).value)"
                    class="w-full bg-gray-800 border border-gray-700 rounded p-2 text-sm text-gray-200 focus:outline-none focus:border-blue-500">
              <optgroup v-for="g in elementFontGroups" :key="g.id" :label="g.label">
                <option v-for="f in g.fonts" :key="f.stack" :value="f.stack" :style="{ fontFamily: f.stack }">{{ f.label }}</option>
              </optgroup>
            </select>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs text-gray-400 mb-1">字重</label>
              <select :value="String(selectedText.fontWeight || '400')" @change="setElProp('fontWeight', ($event.target as HTMLSelectElement).value)"
                      class="w-full bg-gray-800 border border-gray-700 rounded p-2 text-sm text-gray-200 focus:outline-none focus:border-blue-500">
                <option value="300">Light</option>
                <option value="400">Regular</option>
                <option value="500">Medium</option>
                <option value="700">Bold</option>
                <option value="900">Black</option>
              </select>
            </div>
            <div>
              <label class="block text-xs text-gray-400 mb-1">字号 ({{ selectedText.fontSize }})</label>
              <input type="number" min="1" :value="selectedText.fontSize" @input="setNumProp('fontSize', $event)"
                     class="w-full bg-gray-800 border border-gray-700 rounded p-2 text-sm text-gray-200 focus:outline-none focus:border-blue-500" />
            </div>
          </div>
          <div>
            <label class="block text-xs text-gray-400 mb-1">对齐</label>
            <div class="flex gap-1 bg-gray-800 rounded p-1">
              <button v-for="align in ['left', 'center', 'right']" :key="align" @click="setElProp('textAlign', align)"
                      class="flex-1 py-1 rounded text-xs"
                      :class="selectedText.textAlign === align ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'">
                {{ align === 'left' ? '⬅' : align === 'center' ? '↔' : '➡' }}
              </button>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs text-gray-400 mb-1">字间距 ({{ selectedText.letterSpacing || 0 }}px)</label>
              <input type="range" min="-5" max="20" step="0.5" :value="selectedText.letterSpacing || 0"
                     @input="setFloatProp('letterSpacing', $event)" class="w-full accent-blue-500" />
            </div>
            <div>
              <label class="block text-xs text-gray-400 mb-1">行高 ({{ selectedText.lineHeight || 1.2 }})</label>
              <input type="range" min="0.8" max="3" step="0.1" :value="selectedText.lineHeight || 1.2"
                     @input="setFloatProp('lineHeight', $event)" class="w-full accent-blue-500" />
            </div>
          </div>
          <div>
            <label class="block text-xs text-gray-400 mb-1">文字颜色</label>
            <div class="flex flex-wrap gap-2 items-center">
              <button v-for="c in textColors" :key="c" @click="setElProp('color', c)"
                      class="w-6 h-6 rounded border-2 transition"
                      :class="selectedText.color === c ? 'border-white scale-110' : 'border-gray-600'"
                      :style="{ background: c }"></button>
              <div class="relative w-6 h-6 rounded border border-gray-600 overflow-hidden cursor-pointer" :style="{ background: selectedText.color || '#000000' }">
                <input type="color" :value="selectedText.color || '#000000'" @input="setElProp('color', ($event.target as HTMLInputElement).value)"
                       class="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                <div class="absolute inset-0 flex items-center justify-center text-[10px] text-white mix-blend-difference pointer-events-none">+</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 形状属性（线条 / 色块 / 圆形此前完全没有可调卡，只剩折叠的 Transform） -->
        <div v-else-if="selectedShape" class="border border-amber-500/30 bg-amber-900/10 rounded-lg p-4 space-y-4">
          <div class="flex justify-between items-center">
            <h3 class="text-sm font-bold text-amber-300">{{ elIcon(selectedShape) }} {{ elSummary(selectedShape) }}属性</h3>
            <button @click="selectedIds = []" class="text-xs text-gray-500 hover:text-gray-300">取消选中</button>
          </div>
          <div>
            <label class="block text-xs text-gray-400 mb-1">填充颜色</label>
            <div class="flex flex-wrap gap-2 items-center">
              <button v-for="c in textColors" :key="c" @click="setElProp('fill', c)"
                      class="w-6 h-6 rounded border-2 transition"
                      :class="selectedShape.fill === c ? 'border-white scale-110' : 'border-gray-600'"
                      :style="{ background: c }"></button>
              <div class="relative w-6 h-6 rounded border border-gray-600 overflow-hidden cursor-pointer" :style="{ background: shapeColorCss(selectedShape) }">
                <input type="color" :value="shapeColorCss(selectedShape)" @input="setElProp('fill', ($event.target as HTMLInputElement).value)"
                       class="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                <div class="absolute inset-0 flex items-center justify-center text-[10px] text-white mix-blend-difference pointer-events-none">+</div>
              </div>
            </div>
            <p v-if="!selectedShape.fill || selectedShape.fill === 'transparent'" class="text-[10px] text-gray-500 mt-1">
              这条元素当前没填充色（靠描边显示）：点色块会给它铺上实色，Ctrl+Z 可退回。
            </p>
          </div>
          <div v-if="selectedShape.shapeKind === 'line'">
            <label class="block text-xs text-gray-400 mb-1">线条粗细 ({{ Math.round(selectedShape.height) || 2 }}px)</label>
            <input type="range" min="1" max="24" step="1" :value="Math.round(selectedShape.height) || 2"
                   @input="setLineWidth($event)" class="w-full accent-amber-500" />
          </div>
          <div v-if="selectedShape.shapeKind !== 'circle'">
            <label class="block text-xs text-gray-400 mb-1">圆角 ({{ Math.round(selectedShape.borderRadius) || 0 }}px)</label>
            <input type="range" min="0" max="999" step="1" :value="Math.round(selectedShape.borderRadius) || 0"
                   @input="setNumProp('borderRadius', $event)" class="w-full accent-amber-500" />
          </div>
          <div>
            <label class="block text-xs text-gray-400 mb-1">不透明度 ({{ Math.round((selectedShape.opacity ?? 1) * 100) }}%)</label>
            <input type="range" min="0" max="1" step="0.05" :value="selectedShape.opacity ?? 1"
                   @input="setFloatProp('opacity', $event)" class="w-full accent-amber-500" />
          </div>
        </div>

        <!-- 多选面板 -->
        <div v-else-if="selectedIds.length > 1" class="border border-gray-700 rounded-lg p-4 bg-gray-800/30 space-y-2">
          <h3 class="text-sm font-bold text-gray-200">🧩 已选中 {{ selectedIds.length }} 个元素</h3>
          <p class="text-xs text-gray-500">可整体拖动、对齐、复制、删除。Shift+点击 可增减选择。</p>
          <p v-if="selectedGroup" class="text-[11px] text-blue-300">🔗 编组「{{ selectedGroup }}」：这是一个整体装饰单元，已按整组选中。</p>
          <div v-if="selectedGroup" class="pt-1 space-y-1.5">
            <input v-model="groupIntent" class="w-full bg-gray-900 border border-gray-700 rounded px-2 py-1.5 text-xs text-gray-300 focus:outline-none focus:border-blue-500" placeholder="想怎么改这组装饰？一句话写给 AI" />
            <button @click="copyGroupPrompt()" class="w-full bg-blue-900/40 hover:bg-blue-900/60 border border-blue-700/50 rounded py-1.5 text-xs text-blue-200">{{ groupCopied ? '✅ 已复制，去 AI 粘贴' : '🤖 复制 AI 提示词（改这组样式）' }}</button>
            <button @click="groupPasteOpen = !groupPasteOpen" class="w-full text-[11px] text-gray-400 hover:text-gray-200">{{ groupPasteOpen ? '▾ 收起导入' : '📥 AI 改完了？粘贴回来直接应用' }}</button>
            <div v-if="groupPasteOpen" class="space-y-1.5">
              <textarea v-model="groupPasteText" rows="6" class="w-full bg-gray-900 border border-gray-700 rounded px-2 py-1.5 text-[11px] font-mono text-gray-300 focus:outline-none focus:border-blue-500" placeholder="把 AI 输出的整份内容（含第一行 #import-contract 头）原样粘进来"></textarea>
              <button @click="validateGroupPaste()" class="w-full bg-gray-800 hover:bg-gray-700 rounded py-1.5 text-xs">🔍 校验并预览改动</button>
              <div v-if="groupPaste && !groupPaste.ok" class="space-y-1">
                <div class="text-[11px] text-red-300 bg-red-950/40 border border-red-900 rounded p-2 space-y-0.5">
                  <div v-for="(er, i) in groupPaste.errors" :key="i">{{ er }}</div>
                </div>
                <button @click="copyGroupRepair()" class="w-full bg-gray-800 hover:bg-gray-700 rounded py-1.5 text-xs">🔧 复制修复提示词（粘回同一个 AI 改一次）</button>
              </div>
              <div v-if="groupPaste && groupPaste.ok" class="space-y-1.5">
                <div class="text-[11px] text-emerald-300 bg-emerald-950/30 border border-emerald-900/60 rounded p-2 space-y-0.5 max-h-40 overflow-y-auto nice-scroll">
                  <div class="text-emerald-400">将改动 {{ groupPaste.lines?.length || 0 }} 个元素{{ groupPaste.tokenLines?.length ? ` + ${groupPaste.tokenLines.length} 个颜色` : '' }}：</div>
                  <div v-for="(l, i) in groupPaste.lines" :key="i" class="text-gray-300 font-mono">{{ l }}</div>
                  <div v-if="groupPaste.more" class="text-gray-500">…还有 {{ groupPaste.more }} 个元素有改动</div>
                  <div v-for="(l, i) in groupPaste.tokenLines" :key="'t' + i" class="text-gray-400 font-mono">🎨 {{ l }}</div>
                </div>
                <button @click="applyGroupPaste()" class="w-full bg-emerald-800/60 hover:bg-emerald-700/70 rounded py-1.5 text-xs text-emerald-100">✅ 应用到画布（Ctrl+Z 可整体退回）</button>
              </div>
            </div>
            <p class="text-[10px] text-gray-500">复制 → 粘给任意 AI → 回来粘贴 → 预览 → 应用。不再绕「高级功能」。</p>
          </div>
          <div class="flex gap-2 pt-1">
            <button v-if="selectedGroup" @click="shrinkToPicked()" class="flex-1 bg-gray-800 hover:bg-gray-700 rounded py-1.5 text-xs">✂️ 只选这一根</button>
            <button @click="duplicateSelected()" class="flex-1 bg-gray-800 hover:bg-gray-700 rounded py-1.5 text-xs">⧉ 复制</button>
            <button @click="deleteSelected()" class="flex-1 bg-red-900/50 hover:bg-red-800/60 rounded py-1.5 text-xs">🗑 删除</button>
          </div>
        </div>

        <!-- 未选中时的引导 -->
        <div v-if="!selectedIds.length" class="border border-dashed border-gray-700 rounded-lg p-4 text-xs text-gray-500 space-y-1">
          <p>在画布上点击任意元素，即可在此编辑位置、尺寸、文字与图片。</p>
          <p>只想逐条换文案？切到「📝 文案」页签，从上到下填完即可出图。</p>
          <p>装饰层点不中？用上方「选元素」下拉、Alt+点击循环拾取，或 Tab / Shift+Tab 按层级遍历。</p>
          <p>配色 / 字体 / 种子请切到「🎨 风格」。</p>
        </div>
        </template>

        <template v-if="propTab === 'style'">
        <!-- 风格变体 -->
        <div class="border border-gray-800 rounded-lg p-4 bg-gray-900/50">
          <h3 class="text-sm font-semibold text-gray-200 mb-3">🎨 风格变体</h3>
          <div v-if="colorTokenKeys.length" class="mb-4">
            <div class="flex items-baseline justify-between mb-1.5">
              <label class="text-xs text-gray-400">配色方案</label>
              <button @click="savePaletteAs" class="text-[10px] text-gray-400 hover:text-blue-300 transition-colors cursor-pointer"
                      title="把当前各颜色取值存成一套变体：存在本机，刷新不丢（仅对本机这一个模板生效，不写回模板源文件）">+ 存为变体</button>
            </div>
            <div class="flex gap-1.5 flex-wrap">
              <button v-for="(p, i) in allPalettes" :key="p.name + '-' + i" @click="applyPreset(p)"
                      class="group flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs transition-colors cursor-pointer"
                      :class="[
                        isActivePreset(p) ? 'border-blue-400 bg-blue-500/20 text-blue-100' : 'border-gray-700 bg-gray-800 text-gray-300 hover:border-gray-500',
                        i >= authorPresetCount ? 'border-dashed' : ''
                      ]"
                      :title="paletteTitle(p)">
                <span class="flex -space-x-1">
                  <span v-for="[k, c] in Object.entries(p.colors)" :key="k" class="w-3 h-3 rounded-full border border-black/30" :style="{ background: c }"></span>
                </span>
                {{ p.name }}
                <span v-if="i >= authorPresetCount" @click.stop.prevent="deletePalette(i - authorPresetCount)"
                      class="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-300 transition-opacity">×</span>
              </button>
            </div>
            <div v-if="showPaletteDiff" class="text-[10px] text-gray-500 mt-1.5">
              当前为自定义配色：与「{{ nearestPalette?.name }}」差 {{ nearestPalette?.diff }}/{{ nearestPalette?.total }} 处<span v-if="nearestPalette?.outsideTouched">，另有 {{ nearestPalette?.outsideTouched }} 色不在该方案内</span>
            </div>
            <div v-if="savedPaletteView" class="mt-2 border border-gray-700 rounded p-2 bg-gray-800/40 space-y-1">
              <div class="flex items-baseline gap-2">
                <span class="text-xs text-gray-300">已存「{{ savedPaletteView.name }}」</span>
                <button @click="copySavedPalette"
                        class="ml-auto shrink-0 px-2 py-0.5 rounded border border-gray-600 text-[10px] text-gray-300 hover:bg-gray-700 transition-colors cursor-pointer"
                        :class="paletteCopied ? 'text-green-300 border-green-700' : ''">{{ paletteCopied ? '已复制' : '复制' }}</button>
              </div>
              <div v-for="r in savedPaletteView.rows" :key="r.label" class="flex items-center gap-2 text-[10px]">
                <span class="w-3 h-3 rounded-full border border-black/30 shrink-0" :style="{ background: r.hex }"></span>
                <span class="text-gray-400 flex-1">{{ r.label }}</span>
                <span class="font-mono text-gray-300">{{ r.hex }}</span>
              </div>
              <div class="text-[10px] text-gray-500 leading-relaxed">这套已存在本机（刷新不丢）。想让变体跟着模板走、换机也在：复制下面这行 presets 粘进模板源文件。</div>
            </div>
          </div>
          <div v-if="activeTemplate?.tokens">
            <div v-for="(group, gKey) in activeTemplate.tokens" :key="gKey" class="mb-3">
              <div v-for="(def, kKey) in group" :key="kKey" class="mb-2">
                <div class="flex items-baseline gap-2 mb-1">
                  <label class="text-xs text-gray-400">{{ def.label || kKey }}</label>
                  <template v-if="isTokenEdited(`${gKey}.${kKey}`)">
                    <span class="text-[9px] text-emerald-400 shrink-0">已改</span>
                    <button @click="revertToken(`${gKey}.${kKey}`)" :title="`仅还原这一${gKey === 'fonts' ? '个字体' : '个颜色'}回模板原值`"
                            class="shrink-0 px-1.5 py-0.5 rounded border border-gray-600 text-[9px] text-gray-400 hover:text-white hover:border-gray-400 cursor-pointer leading-none">↺</button>
                  </template>
                  <span v-if="gKey === 'colors'" class="ml-auto text-[10px] font-mono text-gray-500">{{ getTokenVal(`${gKey}.${kKey}`) }}</span>
                </div>
                <div v-if="gKey === 'colors'" class="flex gap-1 flex-wrap items-center">
                  <button v-for="opt in def.options" :key="opt" @click="setToken(`${gKey}.${kKey}`, opt)"
                          class="w-6 h-6 rounded border-2 transition"
                          :class="getTokenVal(`${gKey}.${kKey}`) === opt ? 'border-white scale-110' : 'border-gray-600'"
                          :style="{ background: opt }" :title="opt"></button>
                  <div class="relative w-6 h-6 rounded border-2 overflow-hidden shrink-0"
                       :class="isCustomColor(kKey, def) ? 'border-blue-400' : 'border-gray-600'"
                       :style="{ background: getTokenVal(`${gKey}.${kKey}`) || '#000000' }"
                       :title="'自定义取色（当前 ' + (getTokenVal(`${gKey}.${kKey}`) || '无') + '）'">
                    <input type="color" :value="getTokenVal(`${gKey}.${kKey}`) || '#000000'"
                           @input="setToken(`${gKey}.${kKey}`, ($event.target as HTMLInputElement).value)"
                           class="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                    <div class="absolute inset-0 flex items-center justify-center text-[10px] text-white mix-blend-difference pointer-events-none">+</div>
                  </div>
                  <button v-if="eyeDropperOk" @click="pickFromScreen(`${gKey}.${kKey}`)"
                          class="w-6 h-6 shrink-0 rounded border border-gray-600 text-gray-400 hover:text-white hover:border-gray-400 transition-colors text-xs cursor-pointer"
                          title="从屏幕取色">⌖</button>
                </div>
                <select v-else-if="gKey === 'fonts'" :value="getTokenVal(`${gKey}.${kKey}`)" @change="setToken(`${gKey}.${kKey}`, ($event.target as HTMLSelectElement).value)" class="w-full bg-gray-800 border border-gray-700 rounded p-2 text-sm text-gray-200 focus:outline-none focus:border-blue-500">
                  <optgroup v-for="g in buildFontGroups(getTokenVal(`${gKey}.${kKey}`), def.options)" :key="g.id" :label="g.label">
                    <option v-for="f in g.fonts" :key="f.stack" :value="f.stack" :style="{ fontFamily: f.stack }">{{ f.label }}</option>
                  </optgroup>
                </select>
              </div>
            </div>
          </div>
          <div v-else class="text-xs text-gray-500 italic">当前模板无全局风格变体</div>
          <div v-if="colorTokenKeys.length" class="text-[10px] text-gray-500 leading-relaxed pt-1 border-t border-gray-800 mt-1">
            临时改色只作用于当前画面；<span v-if="currentUserPalettes.length">已存的 {{ currentUserPalettes.length }} 套「我的 · 变体」在本机，刷新不丢</span><span v-else>尚无自存变体</span>，两者都不写回模板源文件。
          </div>
        </div>

        <!-- Seed -->
        <div v-if="hasRandom" class="pt-2 border-t border-gray-800">
          <div class="flex items-center gap-2">
            <label class="text-xs text-gray-400 shrink-0">种子</label>
            <input type="text" v-model="seed" class="flex-1 bg-gray-800 border border-gray-700 rounded px-2 py-1.5 text-xs focus:outline-none focus:border-blue-500" />
            <button @click="randomizeSeed" class="shrink-0 bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded text-xs font-medium">🎲</button>
          </div>
        </div>

        <!-- AI 复刻同款 -->
        <div class="border border-gray-800 rounded-lg p-4 bg-gray-900/50 space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-xs font-medium text-gray-300">🤖 AI 复刻同款</span>
            <span v-if="cloneSrcFolded" class="text-[10px] text-gray-500">已折 {{ cloneSrcFolded }} 张图为占位符</span>
          </div>
          <div class="flex flex-wrap gap-1.5">
            <button v-for="p in CLONE_PRESETS" :key="p.chip" @click="cloneIntent = p.text"
                    class="px-2 py-1 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded text-[10px] text-gray-400 hover:text-gray-200 transition-colors"
                    :title="p.text">{{ p.chip }}</button>
          </div>
          <textarea v-model="cloneIntent" rows="2" placeholder="要改什么？"
                    class="w-full bg-gray-900 border border-gray-700 rounded px-2 py-1.5 text-xs text-gray-300 focus:outline-none focus:border-blue-500 resize-y"></textarea>
          <button @click="copyClonePrompt" :disabled="!displayTemplate"
                  class="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-white py-2 rounded text-xs font-medium">
            {{ cloneCopied ? '✅ 已复制，粘给 AI 生成' : '📋 复制提示词' }}
          </button>
          <p v-if="cloneWarn" class="text-red-400 text-[10px] leading-relaxed">{{ cloneWarn }}</p>
          <p class="text-[10px] text-gray-600 leading-relaxed">粘回路径：⚙ 高级功能 → 📥 导入 → 粘贴 JSON → 校验并预览；校验失败时点「复制修复提示词」粘回同一个 AI 改一次；&#123;&#123;IMG:元素id&#125;&#125; 占位符自动回灌原图</p>
        </div>
        </template>
      </div>

      <div class="p-4 border-t border-gray-800 bg-gray-900/50">
        <button @click="saveAsMyTemplate" :disabled="!displayTemplate"
                class="mb-2 w-full py-2 bg-gray-800 hover:bg-gray-700 disabled:opacity-40 rounded-lg text-gray-200 text-sm" title="把当前画面（含你的全部改动）固化成模板，存入侧栏「⭐ 我的模板」">💾 另存为我的模板</button>
        <button @click="showBatchModal = true" :disabled="!displayTemplate"
                class="mb-2 w-full py-2 bg-gray-800 hover:bg-gray-700 disabled:opacity-40 rounded-lg text-gray-200 text-sm" title="批量出图：贴表格一行一条，一次导出 N 张">🧮 批量出图（一行一条 → N 张）</button>
        <button @click="showExportModal = true" :disabled="!displayTemplate"
                class="w-full bg-green-600 hover:bg-green-500 disabled:bg-gray-700 text-white py-2 rounded-lg font-medium transition flex items-center justify-center gap-2">
          📥 导出高清封面
        </button>
      </div>
    </aside>

    <!-- Modals -->
    <DeveloperModal v-if="showDevModal" :show="showDevModal" :current-template="activeTemplate" :overrides="overrides" :history="history" :history-index="historyIndex" :hidden-ids="prefs.hiddenTemplates" :unsaved-note="unsavedNote" :user-templates="userTemplates" @close="showDevModal = false" @import="handleImport" @import-batch="handleImportBatch" @jump="jumpToHistory" @toggle-hidden="toggleTemplateHidden" @unhide-all="unhideAllTemplates" @hide-all="hideAllTemplates" @bake-download="handleBakeDownload" @bake-copy="handleBakeCopy" @save-user="showDevModal = false; saveAsMyTemplate()" @rename-user="renameUserTemplate" @delete-user="removeUserTemplate" />
    <SvgEditorModal v-if="svgEditor" :el-id="svgEditor.id" :src="svgEditor.src" @close="svgEditor = null" @apply="onSvgApply" />

    <!-- 通用确认/命名对话框：替代 window.confirm/prompt；点遮罩不关闭，Esc 取消，Enter 确定 -->
    <div v-if="dialog" class="fixed inset-0 z-[80] bg-black/60 flex items-center justify-center">
      <div ref="dialogCard" tabindex="-1" @keydown="onDialogKey"
        class="w-[380px] max-w-[92vw] bg-gray-900 border border-gray-700 rounded-lg shadow-2xl p-4 outline-none">
        <div class="flex items-start gap-2">
          <div class="text-sm font-bold text-white flex-1">{{ dialog.title }}</div>
          <button @click="closeDialog(false)" class="text-gray-500 hover:text-gray-300 shrink-0" title="关闭 (Esc)">✕</button>
        </div>
        <p v-if="dialog.detail" class="mt-2 text-xs text-gray-400 leading-5 whitespace-pre-line">{{ dialog.detail }}</p>
        <input v-if="dialog.kind === 'prompt'" v-model="dialog.value" autofocus
          class="mt-3 w-full bg-gray-800 border border-gray-600 rounded px-2 py-1.5 text-sm text-white focus:outline-none focus:border-blue-500" />
        <div class="mt-4 flex justify-end gap-2 text-xs">
          <button @click="closeDialog(false)" class="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded text-gray-300">取消</button>
          <button @click="closeDialog(true)" :class="['px-3 py-1.5 rounded text-white', dialog.danger ? 'bg-red-600 hover:bg-red-500' : 'bg-blue-600 hover:bg-blue-500']">{{ dialog.okText }}</button>
        </div>
      </div>
    </div>

    <!-- 素材库用途说明弹窗 -->
    <div v-if="assetHelp" class="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 backdrop-blur-sm" @click.self="assetHelp = false">
      <div class="bg-gray-900 border border-gray-700 rounded-xl shadow-2xl w-[440px] max-w-[90vw] p-5">
        <div class="flex justify-between items-center mb-3">
          <h4 class="text-base font-bold text-white">🖼️ 素材库是干什么的？</h4>
          <button @click="assetHelp = false" class="text-gray-400 hover:text-white text-2xl leading-none">&times;</button>
        </div>
        <div class="text-sm text-gray-300 space-y-2.5 leading-relaxed">
          <p>dev 期的落盘素材夹：上传的图片会写入 <code class="text-amber-300">public/images/分类/</code> 文件夹，换机、重装都不丢。</p>
          <p>点缩略图即把当前选中的图片指向该路径；这个路径可以直接粘进模板 TS 源文件的 <code class="text-amber-300">src</code>。</p>
          <p>展开素材库后，先用「存入」下拉选好分类，再点上传；粘贴的外链图也可点 URL 行的「存入」，由 dev 服务器下载落盘，不怕原链接失效。</p>
          <p class="text-xs text-gray-500">仅用 npm run dev 打开时可用；打包版上传只生成本会话临时地址。</p>
        </div>
        <div class="mt-4 text-right">
          <button @click="assetHelp = false" class="px-4 py-1.5 bg-gray-800 hover:bg-gray-700 rounded text-sm text-gray-200">知道了</button>
        </div>
      </div>
    </div>
    <!-- SVG 改大小说明弹窗 -->
    <div v-if="svgSizeHelp" class="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 backdrop-blur-sm" @click.self="svgSizeHelp = false">
      <div class="bg-gray-900 border border-gray-700 rounded-xl shadow-2xl w-[380px] max-w-[90vw] p-5">
        <div class="flex justify-between items-center mb-3">
          <h4 class="text-base font-bold text-white">📐 SVG 怎么改大小？</h4>
          <button @click="svgSizeHelp = false" class="text-gray-400 hover:text-white text-2xl leading-none">&times;</button>
        </div>
        <p class="text-sm text-gray-300 leading-relaxed">去上方「Transform」：画布 8 向拖柄随便拽，Width / Height 填数精确到像素——矢量图放大不失真，放心拉。</p>
        <div class="mt-4 text-right">
          <button @click="svgSizeHelp = false" class="px-4 py-1.5 bg-gray-800 hover:bg-gray-700 rounded text-sm text-gray-200">知道了</button>
        </div>
      </div>
    </div>
    <!-- 🎯 怎么选中元素：四条路径一次说清 -->
    <div v-if="selectHelp" class="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 backdrop-blur-sm" @click.self="selectHelp = false">
      <div class="bg-gray-900 border border-gray-700 rounded-xl shadow-2xl w-[460px] max-w-[90vw] p-5">
        <div class="flex justify-between items-center mb-3">
          <h4 class="text-base font-bold text-white">🎯 怎么选中想改的元素？</h4>
          <button @click="selectHelp = false" class="text-gray-400 hover:text-white text-2xl leading-none">&times;</button>
        </div>
        <div class="text-sm text-gray-300 space-y-2.5 leading-relaxed">
          <p><b class="text-white">① 直接点击</b>——看到什么点什么。选中后拖画布上的 8 向手柄改大小，或到「📐 Transform」填 X / Y / Width / Height 数值。</p>
          <p><b class="text-white">② Alt+点击</b>——同一处叠了好几层、或被透明装饰挡住？按住 Alt 连点，从最上层往下逐层循环拾取。</p>
          <p><b class="text-white">③ 选元素下拉</b>——本行上方那个下拉，按层级从上到下列出全部元素；点不中的低透明装饰、渐变层从这里直接点名。</p>
          <p><b class="text-white">④ Tab / Shift+Tab</b>——按层级正序/倒序逐个遍历选中，配方向键微调，全程不用鼠标。</p>
          <p class="text-xs text-gray-500">一句话记住：点不中就 Alt，还不行就下拉。</p>
        </div>
        <div class="mt-4 text-right">
          <button @click="selectHelp = false" class="px-4 py-1.5 bg-gray-800 hover:bg-gray-700 rounded text-sm text-gray-200">知道了</button>
        </div>
      </div>
    </div>
    <!-- ⌨ 快捷键总览 -->
    <div v-if="hotkeysOpen" class="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 backdrop-blur-sm" @click.self="hotkeysOpen = false">
      <div class="bg-gray-900 border border-gray-700 rounded-xl shadow-2xl w-[520px] max-w-[92vw] max-h-[85vh] overflow-y-auto nice-scroll p-5">
        <div class="flex justify-between items-center mb-3">
          <h4 class="text-base font-bold text-white">⌨ 快捷键与鼠标手势</h4>
          <button @click="hotkeysOpen = false" class="text-gray-400 hover:text-white text-2xl leading-none">&times;</button>
        </div>
        <div class="text-sm space-y-1">
          <template v-for="grp in [
            { name: '选择', rows: [['点击元素', '选中并拖动'], ['Shift+点击', '多选加减项'], ['Alt+点击', '重叠层循环拾取（含点不中的装饰层）'], ['Tab / Shift+Tab', '按层级正/反序遍历选中'], ['点击空白', '取消选中'], ['/', '光标直达左侧搜索框（Esc 清空退出）']] },
            { name: '修改', rows: [['方向键', '微移 2px（Shift = 10px）'], ['Ctrl + C / V', '复制 / 粘贴元素'], ['Ctrl + D', '就地复制一份'], ['Delete / Backspace', '删除选中'], ['📝 文案框内 Tab / Shift+Tab', '跳下一条 / 上一条文案（首尾环绕），逐条填完即可出图']] },
            { name: '历史', rows: [['Ctrl + Z', '撤销'], ['Ctrl + Y / Ctrl+Shift+Z', '重做']] },
            { name: '视图', rows: [['滚轮', '缩放画布（只影响预览，不改导出尺寸）'], ['Shift + 滚轮', '横向平移画布'], ['+ / -', '放大 / 缩小画布'], ['0', '缩放回到 100%'], ['1', '适应窗口'], ['鼠标中键拖动', '平移画布'], ['空格 + 左键拖动', '平移画布（同中键，照顾只有左键的场景）'], ['R', '开关标尺'], ['.', '全屏专注编辑（隐藏侧栏顶栏；Esc/再按 . 退出）']] }
          ]" :key="grp.name">
          <p class="text-xs font-bold text-amber-300/90 pt-2 pb-0.5">{{ grp.name }}</p>
          <div v-for="r in grp.rows" :key="r[0]" class="flex justify-between items-baseline gap-4 border-b border-gray-800 py-1.5">
            <kbd class="shrink-0 bg-gray-800 border border-gray-600 rounded px-1.5 py-0.5 text-xs text-gray-200 font-mono">{{ r[0] }}</kbd>
            <span class="text-xs text-gray-400 text-right">{{ r[1] }}</span>
          </div>
          </template>
        </div>
        <p class="text-xs text-gray-500 mt-3">输入框内打字、按钮/下拉聚焦时按空格，都会让位给原生行为，不会误触画布快捷键。</p>
        <div class="mt-3 text-right">
          <button @click="hotkeysOpen = false" class="px-4 py-1.5 bg-gray-800 hover:bg-gray-700 rounded text-sm text-gray-200">知道了</button>
        </div>
      </div>
    </div>
    <ExportModal v-if="showExportModal" :show="showExportModal" :export-width="designSize.w" :export-height="designSize.h" @close="showExportModal = false" @export="handleExport" />
    <BatchExportModal v-if="showBatchModal" :show="showBatchModal" :busy="batchBusy" :progress="batchProgress"
      :slot-count="copySlots.filter(r => !r.imageSlot).length" :export-width="designSize.w" :export-height="designSize.h"
      @close="showBatchModal = false" @run="runBatch" />
    <RatioChangeDialog v-if="showRatioDialog" :show="showRatioDialog" :from-label="ratioLabel(canvasRatio)" :to-label="ratioLabel(pendingRatio)"
                       :allow-side-anchor="sizeForRatio(pendingRatio, nativeSize.w).w !== nativeSize.w"
                       :remembered="!!prefs.ratioAlgo"
                       @close="showRatioDialog = false; pendingRatio = canvasRatio" @confirm="applyRatioChange" />
    <!-- 离屏渲染炉：位置在视口外，只负责被调来截图，用户看不到 -->
    <ThumbForge ref="forgeRef" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, nextTick, watch, onUnmounted } from 'vue'
import TemplateRenderer from './components/TemplateRenderer.vue'
import FloatingToolbar from './components/FloatingToolbar.vue'
import DeveloperModal from './components/DeveloperModal.vue'
import SvgEditorModal from './components/SvgEditorModal.vue'
import ExportModal from './components/ExportModal.vue'
import BatchExportModal from './components/BatchExportModal.vue'
import RatioChangeDialog from './components/RatioChangeDialog.vue'
import ThumbForge from './components/ThumbForge.vue'
import { useThumbnails } from './composables/useThumbnails'
import { getCategories, loadTemplatesByCategory, CATEGORY_REGISTRY, getCategoryGroups } from './core'
import { resolveTemplate } from './core/engine/resolver'
import { exportCover } from './utils/exporter'
import { makeThumb } from './utils/makeThumb'
import { domToJpeg } from 'modern-screenshot'
import { exportHtml } from './utils/htmlExporter'
import { buildFontGroups } from './utils/fontRegistry'
import { loadPrefs, savePrefs, setPrefsFailHook } from './utils/prefs'
import type { Prefs, TileSize, SidebarSize, PrefFlag, GridStep, GridStyle } from './utils/prefs'
import { bakeTemplate, loadUserTemplates, saveUserTemplates, uniqueUserId, hasEdits, loadAutosaves, writeAutosave, clearAutosave, takeUserTemplatesLoadError, peekCorruptBackup, USER_TPL_LIMIT } from './utils/userTemplates'
import type { Autosave } from './utils/userTemplates'
import { downloadTextFile } from './utils/templateIO'
import { imgPlaceholder } from './utils/imgPlaceholder'
import { clampDesignSize, clampExportScale, MAX_SIDE, MAX_AREA } from './utils/exportBounds'
import { useClonePrompt, CLONE_PRESETS } from './composables/useClonePrompt'
import { useUserTplBackup } from './composables/useUserTplBackup'
import { rotAABB } from './utils/geometry'
import { buildGroups } from './utils/grouping'
import { CONTRACT_HEADER, buildRepairPrompt } from './utils/importContract'
import { parseTemplateJson } from './utils/templateIO'
import type { Template, ResolvedTemplate, TemplateCategory, UserOverrides, PalettePreset, CanvasGuide } from '@/types/types'

const prefs = reactive(loadPrefs())

const categories = getCategories()
const categoryGroups = getCategoryGroups()
const expandedGroups = ref(new Set<string>(categoryGroups.map(g => g.id)))
const templateCache = ref<Record<string, Template[]>>({})
const currentTemplate = ref<Template | null>(null)
const draftTemplate = ref<Template | null>(null)
// ===== 我的模板（本地库）+ 编辑自动暂存（草稿箱）=====
const userTemplates = ref<Template[]>(loadUserTemplates())
const userSectionOpen = ref(true)
const autosavePrompt = ref<Autosave[]>([])
const autosavePick = ref(0)
// 反馈 toast 队列：后来者不再顶掉前一条（最多同屏 3 条），每条可点 ✕ 提前关掉
const mineToasts = ref<{ id: number; msg: string; thumb?: string }[]>([])
let mineToastSeq = 0
function toastMine(msg: string, thumb?: string) {
  const item = { id: ++mineToastSeq, msg, thumb }
  mineToasts.value = [...mineToasts.value.slice(-2), item]
  setTimeout(() => { mineToasts.value = mineToasts.value.filter(t => t.id !== item.id) }, 4200)
}
function dismissMineToast(id: number) { mineToasts.value = mineToasts.value.filter(t => t.id !== id) }
// prefs 写盘失败时统一出声（7 个调用点不用各自记得检查返回值）
setPrefsFailHook(toastMine)
function fmtAgo(at: number) {
  const m = Math.max(0, Math.round((Date.now() - at) / 60000))
  if (m < 1) return '刚刚'
  if (m < 60) return `${m} 分钟前`
  const h = Math.round(m / 60)
  if (h < 24) return `${h} 小时前`
  return `${Math.round(h / 24)} 天前`
}
const DEFAULT_SEED = 'cover-maker-2026'
const seed = ref<string | number>(DEFAULT_SEED)
const rendererRef = ref<InstanceType<typeof TemplateRenderer> | null>(null)
const viewportContainerRef = ref<HTMLElement | null>(null)
const canvasScale = ref(0.5)
const canvasOffset = ref({ x: 0, y: 0 })
const isPanning = ref(false)
const spaceHeld = ref(false)
let panStart = { x: 0, y: 0, ox: 0, oy: 0 }

const selectedIds = ref<string[]>([])
const selectedId = computed<string | null>(() => selectedIds.value.length === 1 ? selectedIds.value[0] : null)
// 最近一次点中的元素：编组整选后可用它收缩回单个元素
const lastPickedId = ref<string | null>(null)
// 当前选中项是否同属一个编组（用于在多选面板显示编组名与「只选这一个」）
const selectedGroup = computed<string | null>(() => {
  if (selectedIds.value.length < 2) return null
  const first = groupIndex.value.get(selectedIds.value[0])
  if (!first) return null
  return selectedIds.value.every(id => groupIndex.value.get(id) === first) ? first : null
})
const overrides = ref<UserOverrides>({})
const tokenOverrides = ref<Record<string, any>>({})
const animationsStopped = ref(prefs.animPaused)
const expandedCategories = ref(new Set<string>())

// ===== 缩略图方案 A：真实渲染截图 =====
// 手绘 SVG 缩略图与成品天然漂移。改为：卡片滚进视口时，用离屏渲染炉（ThumbForge）把模板
// 按编辑器同一个渲染器画一遍再截图，结果存 IndexedDB；未生成前先显示模板自带的手绘 SVG 占位。
const forgeRef = ref<{ capture(tpl: Template): Promise<string> } | null>(null)
const libraryRef = ref<HTMLElement | null>(null)
const { thumbFor, observe: observeThumbs, stop: stopThumbs } = useThumbnails(forgeRef)
onMounted(() => {
  observeThumbs(libraryRef.value)
  window.addEventListener('keydown', onSpaceKeyDown)
  window.addEventListener('keyup', onSpaceKeyUp)
  window.addEventListener('blur', onWindowBlur)
})
onUnmounted(() => {
  stopThumbs()
  window.removeEventListener('keydown', onSpaceKeyDown)
  window.removeEventListener('keyup', onSpaceKeyUp)
  window.removeEventListener('blur', onWindowBlur)
})
const libraryView = ref<'grouped' | 'filter'>('grouped')
const filterCategory = ref<string>('all')

// ===== 显示设置：全部落在 prefs 单一存储键上 =====
const tileSizes: { id: TileSize; label: string }[] = [
  { id: 'sm', label: '小' }, { id: 'md', label: '中' }, { id: 'lg', label: '大' }
]
const sidebarSizes: { id: SidebarSize; label: string }[] = [
  { id: 'sm', label: '窄' }, { id: 'md', label: '中' }, { id: 'lg', label: '宽' }
]
const TILE_COLS: Record<TileSize, number> = { sm: 4, md: 3, lg: 2 }
const TILE_CLASS: Record<TileSize, string> = { sm: 'grid-cols-4', md: 'grid-cols-3', lg: 'grid-cols-2' }
// 三档宽度对应的 Tailwind 类必须原样出现在源码里，JIT 才会生成
const SIDEBAR_CLASS: Record<SidebarSize, string> = { sm: 'w-64', md: 'w-80', lg: 'w-96' }
const SIDEBAR_PX: Record<SidebarSize, number> = { sm: 256, md: 320, lg: 384 }
const GRID_STEPS: { id: GridStep; label: string }[] = [
  { id: 0, label: '跟随' }, { id: 10, label: '10' }, { id: 20, label: '20' },
  { id: 50, label: '50' }, { id: 100, label: '100' }
]
const GRID_STYLES: { id: GridStyle; label: string }[] = [
  { id: 'line', label: '细线' }, { id: 'dot', label: '点阵' }
]

const showDisplayMenu = ref(false)
const tileCols = computed(() => TILE_COLS[prefs.tile])
const tileColsClass = computed(() => TILE_CLASS[prefs.tile])
const sidebarClass = computed(() => SIDEBAR_CLASS[prefs.sidebar])
const sidebarPx = computed(() => SIDEBAR_PX[prefs.sidebar])

function setTileSize(s: TileSize) { prefs.tile = s; savePrefs({ tile: s }) }
function setSidebarSize(s: SidebarSize) { prefs.sidebar = s; savePrefs({ sidebar: s }) }
function setGridStep(s: GridStep) { prefs.gridStep = s; savePrefs({ gridStep: s }) }
function setGridStyle(s: GridStyle) { prefs.gridStyle = s; savePrefs({ gridStyle: s }) }
function toggleTemplateHidden(id: string) {
  const cur = prefs.hiddenTemplates
  prefs.hiddenTemplates = cur.includes(id) ? cur.filter(x => x !== id) : [...cur, id]
  savePrefs({ hiddenTemplates: prefs.hiddenTemplates })
}
function unhideAllTemplates() {
  prefs.hiddenTemplates = []
  savePrefs({ hiddenTemplates: [] })
}
function hideAllTemplates(ids: string[]) {
  prefs.hiddenTemplates = [...new Set(ids)]
  savePrefs({ hiddenTemplates: prefs.hiddenTemplates })
}
function togglePref(k: PrefFlag) {
  prefs[k] = !prefs[k]
  savePrefs({ [k]: prefs[k] } as Partial<Prefs>)
  if (k === 'animPaused') animationsStopped.value = prefs.animPaused
  if (k === 'expandAll') applyExpandAll()
  if (k === 'groupAccordion') applyGroupAccordion()
}
function applyExpandAll() {
  if (prefs.expandAll) categories.forEach(cat => expandedCategories.value.add(cat.id))
  else expandedCategories.value.clear()
}
onMounted(() => { applyExpandAll(); applyGroupAccordion() })

function toggleAnimations() {
  animationsStopped.value = !animationsStopped.value
  prefs.animPaused = animationsStopped.value
  savePrefs({ animPaused: animationsStopped.value })
}

// ===== 参考线：按模板存在内存里（编辑器叠加层，刷新即清，不落盘也不进导出） =====
const guidesByTemplate = ref<Record<string, CanvasGuide[]>>({})
const currentGuides = computed<CanvasGuide[]>(() => guidesByTemplate.value[activeTemplate.value?.id || ''] || [])
function onGuidesUpdate(list: CanvasGuide[]) {
  const id = activeTemplate.value?.id
  if (id) guidesByTemplate.value[id] = list
}
function clearGuides() {
  const id = activeTemplate.value?.id
  if (id) guidesByTemplate.value[id] = []
}
// 参考线存的是设计像素（0..designSize），画布尺寸一变位置就漂——按比例同步缩放
function rescaleGuides(oldW: number, oldH: number, newW: number, newH: number) {
  const id = activeTemplate.value?.id
  const list = id ? guidesByTemplate.value[id] : null
  if (!id || !list || !list.length || oldW <= 0 || oldH <= 0 || newW <= 0 || newH <= 0) return
  guidesByTemplate.value[id] = list.map(g => ({ ...g, pos: Math.round(g.pos * (g.axis === 'v' ? newW / oldW : newH / oldH)) }))
}
const libraryScrollRef = ref<HTMLElement | null>(null)
const activeCategory = computed(() => (draftTemplate.value || currentTemplate.value)?.category || '')
const groupOfCategory = (cat: string) => categoryGroups.find(g => g.categories.some(c => c.id === cat))?.id || ''
/** 大类展开的唯一入口：手风琴开启时只留目标大类，否则叠加 */
function openGroup(id: string) {
  if (prefs.groupAccordion) expandedGroups.value = new Set(id ? [id] : [])
  else if (id) expandedGroups.value.add(id)
}
function applyGroupAccordion() {
  if (prefs.groupAccordion) {
    const id = groupOfCategory(activeCategory.value) || categoryGroups[0]?.id || ''
    expandedGroups.value = new Set(id ? [id] : [])
  } else expandedGroups.value = new Set(categoryGroups.map(g => g.id))
}
function revealCategory(cat: string) {
  if (!cat) return
  const gid = groupOfCategory(cat)
  if (gid) openGroup(gid)
  expandedCategories.value.add(cat)
  nextTick(() => libraryScrollRef.value?.querySelector(`[data-cat="${cat}"]`)?.scrollIntoView({ block: 'nearest' }))
}
watch(() => currentTemplate.value?.id, () => revealCategory(activeCategory.value))

// ===== 属性面板分区：元素 / 文案 / 风格 =====
type PropTabId = 'element' | 'copy' | 'style'
// 默认落在「📝 文案」：量产主流程就是选模板→填词→导出；点画布元素仍会自动跳到元素页
const propTab = ref<PropTabId>('copy')
const propTabs: { id: PropTabId; label: string }[] = [
  { id: 'element', label: '🧩 元素' },
  { id: 'copy', label: '📝 文案' },
  { id: 'style', label: '🎨 风格' }
]
const propScrollRef = ref<HTMLElement | null>(null)
// Transform 数值区：未选中时折叠省空间，选中元素即自动展开
const transformOpen = ref(false)
function switchPropTab(id: PropTabId) {
  propTab.value = id
  nextTick(() => propScrollRef.value?.scrollTo(0, 0))
}
watch(selectedIds, ids => {
  if (!ids.length) return
  // 从「📝 文案」页签里选中元素不该把人弹出该页签（逐条填词时每聚焦一行都会选中）
  if (propTab.value === 'style') propTab.value = 'element'
  // 选中即展开 Transform：形状类元素只有这一张卡，默认折叠等于没有任何可调面板
  // 例外：「📝 文案」页签逐条填词时每聚焦一行都算一次选中，在那里反复展开会把当前行顶出视口
  if (propTab.value !== 'copy') transformOpen.value = true
  // 全屏专注模式没有常驻侧栏：选中元素即自动滑出属性面板（浮层，不动画布；取消选中不自动关，🎛️ 可手动收）
  openFocusPanelNow()
})

// ===== 文案槽批量编辑：把全部文本元素按阅读顺序摊平，逐条填完即出图 =====
function slotRole(el: any): string {
  const size = Number(el.fontSize) || 0
  if (size >= 96) return '主标题'
  if (size >= 48) return '副标题'
  if (size >= 28) return '正文'
  return '小字/标注'
}
const copySlots = computed(() => {
  const els = displayTemplate.value?.elements || []
  return els
    .filter((e: any) => e.type === 'text')
    .slice()
    .sort((a: any, b: any) => (a.y - b.y) || (a.x - b.x))
    .map((e: any) => ({
      id: e.id,
      role: slotRole(e),
      content: String(e.content ?? ''),
      imageSlot: typeof e.imageSlot === 'string' ? e.imageSlot : '',
      edited: overrides.value.elements?.[e.id]?.content !== undefined
    }))
})
const copyEditedCount = computed(() => copySlots.value.filter(r => r.edited).length)
// 选中但不跳页签：给画布实时高亮，同时让用户留在文案槽
function pickFromCopy(id: string) {
  if (selectedId.value === id) return
  selectedIds.value = [id]
}
function setSlotContent(id: string, val: string) { setElProps(id, { content: val }) }
// 撤销单条：必须删掉 content 键（写 undefined 会让文本渲染成空）
function revertSlot(id: string) {
  const patch = { ...(overrides.value.elements?.[id] || {}) }
  delete (patch as any).content
  const els = { ...(overrides.value.elements || {}) }
  if (Object.keys(patch).length) els[id] = patch
  else delete els[id]
  overrides.value = { ...overrides.value, elements: els }
}
// Tab 在文案框之间环绕跳转（此前承诺了但没实现，末行会窜进右栏按钮）
function moveSlotFocus(e: Event | KeyboardEvent, dir: number) {
  const cur = e.currentTarget as HTMLTextAreaElement
  const els = Array.from(document.querySelectorAll<HTMLTextAreaElement>('[data-copy-slot]'))
  if (!els.length) return
  const i = els.indexOf(cur)
  els[(i + dir + els.length) % els.length]?.focus()
}
// 文案框随内容自动增高（封顶 ~10 行，再多就滚动）
function growSlot(el: HTMLTextAreaElement) {
  el.style.height = 'auto'
  el.style.height = Math.min(Math.max(el.scrollHeight, 48), 260) + 'px'
}
function growAllSlots() {
  document.querySelectorAll<HTMLTextAreaElement>('[data-copy-slot]').forEach(growSlot)
}
// 注意：watch 注册时即同步求值一次源（依赖收集），copySlots 的 watch 必须排在 displayTemplate 声明之后，见派生状态区

// ===== 文字槽 → 图片槽：模板里「这里放主子的脸」只是压在虚线形状上的提示语，一键换成能灌图的图片元素 =====
function slotGeomFor(el: any) {
  const els = displayTemplate.value?.elements || []
  // 只认同源未删的坑位形状：用户把虚线框删了，就退回文字自身的框，不再往不存在的矩形里塞图
  const slot = typeof el?.imageSlot === 'string'
    ? els.find((e: any) => e.id === el.imageSlot && e.type !== 'text')
    : null
  const src = slot || el
  const w = Math.max(24, Math.round(Number(src.width) || 24))
  const h = Math.max(24, Math.round(Number(src.height) || 24))
  return {
    x: Math.round(Number(src.x) || 0), y: Math.round(Number(src.y) || 0), w, h,
    // anchor 必须跟几何同源：x/y 是相对锚点的坐标，漏掉锚点会让带锚点的坑位整块跑位
    anchor: src.anchor,
    radius: slot?.shapeKind === 'circle' ? Math.round(Math.min(w, h) / 2) : Math.round(Number(slot?.borderRadius ?? el?.borderRadius) || 0),
    zIndex: Math.round(Number(el.zIndex) || 1),
    animation: slot?.animation ? JSON.parse(JSON.stringify(slot.animation)) : undefined,
    hit: !!slot,
  }
}
/** 占位图：中灰底 + 虚线框 + 用途文字，与「AI 复刻同款」给图片坑位定的约定同一口径（实现见 utils/imgPlaceholder） */
function slotPlaceholder(w: number, h: number, r: number, label: string) {
  return imgPlaceholder(w, h, r, label)
}
function textToImage(id: string) {
  const el = (displayTemplate.value?.elements || []).find((e: any) => e.id === id) as any
  if (!el || el.type !== 'text') return
  if (el.locked) { toastMine('🔒 这条文字已锁定，先解锁再换成图片'); return }
  const g = slotGeomFor(el)
  const label = String(el.content ?? '').replace(/\s+/g, ' ').trim() || '图片位'
  const img: any = {
    id: `${id}-img-${Math.random().toString(36).slice(2, 7)}`,
    type: 'image', src: slotPlaceholder(g.w, g.h, g.radius, label),
    x: g.x, y: g.y, width: g.w, height: g.h,
    objectFit: 'cover', borderRadius: g.radius, zIndex: g.zIndex,
  }
  if (g.anchor) img.anchor = g.anchor
  if (g.animation) img.animation = g.animation
  const next: UserOverrides = { ...overrides.value }
  if (overrides.value.order) next.order = overrides.value.order.filter(o => o !== id)
  const ownAdded = (overrides.value.added || []).find((e: any) => e.id === id)
  if (ownAdded) {
    // 用户自己加的字：直接从 added 里换掉，不写 deleted（模板本来就没有这条）
    next.added = (overrides.value.added || []).filter((e: any) => e.id !== id).concat(img)
  } else {
    next.deleted = [...new Set([...(overrides.value.deleted || []), id])]
    next.added = [...(overrides.value.added || []), img]
    if (next.order) next.order = [...next.order, img.id]
  }
  if (next.elements?.[id]) {
    const restEls: Record<string, any> = {}
    for (const [k, v] of Object.entries(next.elements)) if (k !== id) restEls[k] = v
    if (Object.keys(restEls).length) next.elements = restEls
    else delete (next as any).elements
  }
  overrides.value = next
  selectedIds.value = [img.id]
  propTab.value = 'element'
  toastMine(g.hit ? '🖼 已换成图片：下方「替换图片」上传或选素材库，Ctrl+Z 退回文字' : '🖼 已按文字位置生成图片框：下方上传或选素材库，Ctrl+Z 退回')
}

const filteredTemplates = computed<Template[]>(() =>
  filterCategory.value === 'all'
    ? categories.flatMap(cat => getTemplatesByCategory(cat.id))
    : getTemplatesByCategory(filterCategory.value as TemplateCategory))

// ===== 模板库搜索：317 张靠左翻找不到，而文案本身写得最有辨识度，所以连正文一起搜 =====
const searchQuery = ref('')
const searchInputRef = ref<HTMLInputElement | null>(null)
const searchActive = computed(() => !!searchQuery.value.trim())
const SEARCH_LIMIT = 60
type SearchEntry = { tpl: Template; head: string; copy: string[]; all: string }
// 模板源码是静态的，索引一次建好常驻；隐藏状态在查询时过滤，避免索引跟着 prefs 失效
let searchIndex: SearchEntry[] | null = null
function buildSearchIndex(): SearchEntry[] {
  if (searchIndex) return searchIndex
  searchIndex = categories.flatMap(cat =>
    (templateCache.value[cat.id] || []).map(tpl => {
      const copy = (tpl.elements as any[])
        .filter(e => e.type === 'text')
        .map(e => String(e.content ?? '').replace(/\s+/g, ' ').trim())
        .filter(Boolean)
      const head = `${tpl.name} ${tpl.id} ${(tpl.tags || []).join(' ')} ${cat.name}`.toLowerCase()
      return { tpl, head, copy, all: `${head} ${copy.join(' ').toLowerCase()}` }
    }))
  return searchIndex
}
function snippetOf(line: string, needle: string): string {
  const at = line.toLowerCase().indexOf(needle)
  if (at < 0) return line.slice(0, 28)
  const from = Math.max(0, at - 10)
  return `${from ? '…' : ''}${line.slice(from, from + 30)}${from + 30 < line.length ? '…' : ''}`
}
const searchResults = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return []
  const tokens = q.split(/\s+/).filter(Boolean)
  const hidden = new Set(prefs.hiddenTemplates)
  const hits: { tpl: Template; snippet: string; score: number }[] = []
  for (const entry of buildSearchIndex()) {
    if (hidden.has(entry.tpl.id)) continue
    if (!tokens.every(t => entry.all.includes(t))) continue
    // 名称/标签/分类命中排前面；只靠正文命中的给出命中片段，让用户知道为什么搜到了它
    if (tokens.every(t => entry.head.includes(t))) {
      hits.push({ tpl: entry.tpl, snippet: CATEGORY_REGISTRY[entry.tpl.category]?.name || entry.tpl.category, score: 0 })
    } else {
      const line = entry.copy.find(c => c.toLowerCase().includes(tokens[tokens.length - 1])) || entry.copy[0] || ''
      hits.push({ tpl: entry.tpl, snippet: `「${snippetOf(line, tokens[tokens.length - 1])}」`, score: 1 })
    }
  }
  hits.sort((a, b) => a.score - b.score)
  return hits.slice(0, SEARCH_LIMIT).map(h => ({ tpl: h.tpl, snippet: h.snippet }))
})

// ===== 收藏：常用风格置顶（存 prefs，跨刷新） =====
const starSectionOpen = ref(true)
function isStarred(id: string) { return prefs.stars.includes(id) }
function toggleStar(id: string) {
  const on = isStarred(id)
  prefs.stars = on ? prefs.stars.filter(x => x !== id) : [...prefs.stars, id]
  savePrefs({ stars: prefs.stars })
  toastMine(on ? '☆ 已取消收藏' : '📌 已收藏，置顶在侧栏「📌 收藏」')
}
// 按收藏先后排序，且尊重「隐藏模板」设置
const starTemplates = computed<Template[]>(() => {
  if (!prefs.stars.length) return []
  const all = categories.flatMap(cat => getTemplatesByCategory(cat.id))
  const byId = new Map(all.map(t => [t.id, t]))
  return prefs.stars.map(id => byId.get(id)).filter((t): t is Template => !!t)
})

// ===== 过滤视图懒渲染：滚动增量加载 =====
const FILTER_PAGE = 40
const visibleCount = ref(FILTER_PAGE)
const pagedTemplates = computed(() => filteredTemplates.value.slice(0, visibleCount.value))
const filterScrollRef = ref<HTMLElement | null>(null)
const filterSentinelRef = ref<HTMLElement | null>(null)
function fillFilterViewport() {
  const sc = filterScrollRef.value, sn = filterSentinelRef.value
  if (!sc || !sn || visibleCount.value >= filteredTemplates.value.length) return
  if (sn.getBoundingClientRect().top < sc.getBoundingClientRect().bottom + 200) {
    visibleCount.value += FILTER_PAGE
    nextTick(fillFilterViewport)
  }
}
function setupFilterLazy() { visibleCount.value = FILTER_PAGE; nextTick(fillFilterViewport) }
function onFilterScroll(e: Event) {
  const el = e.target as HTMLElement
  if (el.scrollHeight - el.scrollTop - el.clientHeight < 300 && visibleCount.value < filteredTemplates.value.length) {
    visibleCount.value += FILTER_PAGE
    nextTick(fillFilterViewport)
  }
}
watch(libraryView, v => { if (v === 'filter') setupFilterLazy() })
watch(filterCategory, () => { if (libraryView.value === 'filter') setupFilterLazy() })
const showDevModal = ref(false)
const showExportModal = ref(false)
const showBatchModal = ref(false)
const batchBusy = ref(false)
const exportBusy = ref(false)
const batchProgress = ref('')
const clipboard = ref<any[]>([])
const imageUrlInput = ref('')

// ===== 设计尺寸（属于设计本身） ≠ 画布缩放 =====
const designSize = ref({ w: 1000, h: 1000 })
const canvasRatio = ref<string>('1:1')
const pendingRatio = ref<string>('1:1')
const nativeRatio = ref<string>('1:1')
const ratioAlgorithm = ref<'expand' | 'crop' | 'scale'>('crop')
/** crop 的保边锚点（0/0.5/1）：{x:.5,y:0} = 保顶。其他算法恒居中 */
const ratioAnchor = ref({ x: 0.5, y: 0.5 })
const showRatioDialog = ref(false)
const customW = ref(1080)
const customH = ref(1080)
/** ⛶ 全屏专注编辑：隐藏两侧栏/顶部工具条，进浏览器全屏，底部浮条常驻常用操作 */
const focusMode = ref(false)
/** 全屏模式下滑出的属性面板（元素编辑）：默认关，点底部「🎛️ 属性」开。
 * 全屏内是悬浮层（fixed 右侧），开/关都不改变画布布局——改布局会让渲染器把
 * "画布自己挪了"误算进元素坐标（单击变拖拽，元素瞬移） */
const focusPanel = ref(false)
function openFocusPanelNow() { if (focusMode.value) focusPanel.value = true }

const nativeSize = computed(() => {
  const t = activeTemplate.value
  return {
    w: t?.canvas.defaultWidth || t?.canvas.virtualWidth || 1000,
    h: t?.canvas.defaultHeight || t?.canvas.virtualHeight || 1000
  }
})

// ===== History（现有 Undo/Redo，扩展快照包含设计尺寸 + 变化描述） =====
const history = ref<any[]>([])
const HISTORY_LIMIT = 120
const historyIndex = ref(-1)
let isRestoring = false
function describeSnapshotDiff(prev: any, next: any): string {
  if (!prev) return '初始状态'
  const parts: string[] = []
  const po = prev.overrides || {}, no = next.overrides || {}
  const poKeys = Object.keys(po.tokens || {}).filter(k => po.tokens[k] !== no.tokens?.[k]).length
  if (poKeys) parts.push(`${poKeys} 项 Token 调整`)
  const allIds = new Set([...Object.keys(po.elements || {}), ...Object.keys(no.elements || {})])
  let moved = 0, patched = 0
  for (const id of allIds) {
    const a = po.elements?.[id], b = no.elements?.[id]
    if (JSON.stringify(a) === JSON.stringify(b)) continue
    if (!a || !b) continue
    const keys = Object.keys(a).filter(k => !['x', 'y'].includes(k) && JSON.stringify(a[k]) !== JSON.stringify(b?.[k]))
    if (keys.length) patched++
    else if (a.x !== b?.x || a.y !== b?.y) moved++
  }
  if (moved) parts.push(`移动 ${moved} 个元素`)
  if (patched) parts.push(`修改 ${patched} 个元素属性`)
  const wasDeleted = (po.deleted || []).filter((id: string) => !(no.deleted || []).includes(id))
  const nowDeleted = (no.deleted || []).filter((id: string) => !(po.deleted || []).includes(id))
  if (wasDeleted.length) parts.push(`恢复元素「${wasDeleted.join('、')}」`)
  if (nowDeleted.length) parts.push(`删除元素「${nowDeleted.join('、')}」`)
  const wasAdded = (po.added || []).map((a: any) => a.id).filter((id: string) => !(no.added || []).some((b: any) => b.id === id))
  const nowAdded = (no.added || []).map((a: any) => a.id).filter((id: string) => !(po.added || []).some((b: any) => b.id === id))
  if (wasAdded.length) parts.push(`移除新增「${wasAdded.join('、')}」`)
  if (nowAdded.length) parts.push(`新增元素「${nowAdded.join('、')}」`)
  if (JSON.stringify(po.order) !== JSON.stringify(no.order)) parts.push('图层换序')
  if (prev.seed !== next.seed) parts.push('重新随机')
  if (prev.ratio !== next.ratio || prev.algorithm !== next.algorithm || JSON.stringify(prev.size) !== JSON.stringify(next.size)) parts.push('画布尺寸/比例调整')
  return parts.join(' · ') || '状态更新'
}
function pushHistory() {
  if (isRestoring) return
  const snapshot = JSON.parse(JSON.stringify({
    overrides: overrides.value, seed: seed.value,
    ratio: canvasRatio.value, algorithm: ratioAlgorithm.value, size: designSize.value,
    anchor: ratioAnchor.value
  }))
  const prev = historyIndex.value >= 0 ? history.value[historyIndex.value] : null
  if (prev && JSON.stringify({ ...prev, at: 0, desc: '' }) === JSON.stringify({ ...snapshot, at: 0, desc: '' })) return
  snapshot.at = Date.now()
  snapshot.desc = describeSnapshotDiff(prev, snapshot)
  history.value = history.value.slice(0, historyIndex.value + 1)
  history.value.push(snapshot)
  // 深度上限：只丢最老的，内存与 JSON 序列化开销不随会话时长无限涨
  if (history.value.length > HISTORY_LIMIT) history.value = history.value.slice(history.value.length - HISTORY_LIMIT)
  historyIndex.value = history.value.length - 1
}
// 撤销/重做/跳步前先落地防抖中的待推快照：否则改完 <300ms 就 Ctrl+Z，该编辑被去重静默丢失
function flushHistory() {
  if (historyTimer) { clearTimeout(historyTimer); historyTimer = null; pushHistory() }
}
function undo() { flushHistory(); if (historyIndex.value > 0) { historyIndex.value--; restoreSnapshot(history.value[historyIndex.value]) } }
function redo() { flushHistory(); if (historyIndex.value < history.value.length - 1) { historyIndex.value++; restoreSnapshot(history.value[historyIndex.value]) } }
function jumpToHistory(i: number) {
  flushHistory()
  if (i < 0 || i >= history.value.length || i === historyIndex.value) return
  historyIndex.value = i
  restoreSnapshot(history.value[i])
}
function restoreSnapshot(snapshot: any) {
  isRestoring = true
  const oldW = designSize.value.w, oldH = designSize.value.h
  const viewChanged = snapshot.ratio !== canvasRatio.value ||
    JSON.stringify(snapshot.size || null) !== JSON.stringify(designSize.value)
  overrides.value = JSON.parse(JSON.stringify(snapshot.overrides))
  seed.value = snapshot.seed
  canvasRatio.value = snapshot.ratio
  pendingRatio.value = snapshot.ratio
  ratioAlgorithm.value = snapshot.algorithm
  if (snapshot.size) {
    designSize.value = { ...snapshot.size }
    rescaleGuides(oldW, oldH, snapshot.size.w, snapshot.size.h)
  }
  if (snapshot.anchor) ratioAnchor.value = { ...snapshot.anchor }
  // 普通元素编辑的撤销不再重置缩放/平移；仅画布尺寸/比例真的变了才重新适配视口
  nextTick(() => { isRestoring = false; if (viewChanged) fitScreen() })
}
let historyTimer: any = null
watch([overrides, seed, canvasRatio, designSize], () => {
  clearTimeout(historyTimer)
  historyTimer = setTimeout(pushHistory, 300)
}, { deep: true })

// ===== 派生状态 =====
const activeTemplate = computed(() => draftTemplate.value || currentTemplate.value)
/** id → 组名：点选时按它整组选中（模板显式 group 优先，否则按 id 前缀推断） */
const groupIndex = computed(() => buildGroups(activeTemplate.value?.elements))
const displayTemplate = computed<ResolvedTemplate | null>(() => {
  if (!activeTemplate.value) return null
  return resolveTemplate(activeTemplate.value, seed.value, overrides.value)
})
// 文案框增高：watch 注册即求值源，必须挂在 displayTemplate 之后（否则 setup 期 TDZ 白屏）
watch(copySlots, () => nextTick(growAllSlots))
onMounted(() => nextTick(growAllSlots))
// 换模板即清剪贴板：否则 Ctrl+V 会把上个模板复制的元素注入当前画布
watch(() => activeTemplate.value?.id, () => { clipboard.value = [] })
// 属性面板只读 resolved 值（已应用全部覆盖），保证 Canvas ↔ Properties 单一数据源
const selectedEl = computed<any>(() => {
  if (!selectedId.value || !displayTemplate.value) return null
  return displayTemplate.value.elements.find(e => e.id === selectedId.value) || null
})
const selectedText = computed<any>(() => selectedEl.value?.type === 'text' ? selectedEl.value : null)
const selectedShape = computed<any>(() => selectedEl.value?.type === 'shape' ? selectedEl.value : null)
/** <input type="color"> 只认小写 #rrggbb：当前颜色取「有效填充色」（线条无填充时回落到描边色），非 hex 一律解析 */
/** rgba(...,0) 与 #rrggbb00 是「完全透底」，与 'transparent' 同权：不算当前色，让取色框回落描边色（否则透底+彩边的圆会被读成黑色） */
function isOpaqueColor(c: any): boolean {
  if (typeof c !== 'string' || !c || c === 'transparent') return false
  if (/^#[0-9a-f]{6}00$/i.test(c)) return false
  if (/rgba/i.test(c)) {
    const nums = c.match(/[\d.]+/g)
    if (nums && nums.length >= 4 && parseFloat(nums[3]) === 0) return false
  }
  return true
}
function shapeColorCss(sh: any): string {
  const raw = [sh?.fill, sh?.border?.color].find(isOpaqueColor) || ''
  const hex = raw.match(/^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i)
  // 模板里 fill 大量写成 '#FFFFFF'，大写值会让取色控件判非法并回显成黑色
  if (hex) return (hex[1].length === 3 ? '#' + [...hex[1]].map(c => c + c).join('') : raw.slice(0, 7)).toLowerCase()
  const nums: number[] = raw.match(/(\d+(?:\.\d+)?)/g)?.slice(0, 3).map(Number) ?? []
  if (nums.length === 3) return '#' + nums.map((n: number) => Math.round(n).toString(16).padStart(2, '0')).join('')
  return '#cccccc'
}
// ===== 元素选择器（下拉 + Tab 遍历）：让点不中的 inert/被覆盖层也能被选中 =====
const orderedElements = computed<any[]>(() => [...(displayTemplate.value?.elements || [])].sort((a, b) => (b.zIndex || 0) - (a.zIndex || 0)))
const tabOrder = computed(() => orderedElements.value.map(e => e.id))
function elIcon(e: any) {
  if (e.type === 'text') return '📝'
  if (e.type === 'image') return '🖼️'
  if (e.type === 'overlay') return '🌈'
  return e.shapeKind === 'circle' ? '⚪' : e.shapeKind === 'line' ? '〰' : '⬛'
}
function elSummary(e: any) {
  if (e.type === 'text') return String(e.content || '').replace(/\s+/g, ' ').slice(0, 12) || '空文本'
  if (e.type === 'image') return typeof e.src === 'string' && e.src.startsWith('data:image/svg') ? 'SVG图案' : '图片'
  if (e.type === 'overlay') return '渐变层'
  return e.shapeKind === 'circle' ? '圆形' : e.shapeKind === 'line' ? '线条' : '色块'
}
const pickableElements = computed(() => orderedElements.value.map(e => ({ id: e.id, label: `${elIcon(e)} ${elSummary(e)}（${e.id}）` })))
function pickElement(id: string) { handleSelectElement({ id: id || null, additive: false }) }
const anySelectedLocked = computed(() => {
  const els = displayTemplate.value?.elements || []
  return selectedIds.value.length > 0 && selectedIds.value.every(id => els.find(e => e.id === id)?.locked)
})
const textColors = computed(() => {
  const colors = ['#000000', '#FFFFFF', '#334155', '#EF4444', '#3B82F6', '#10B981', '#F59E0B']
  if (activeTemplate.value?.tokens?.colors) {
    Object.values(activeTemplate.value.tokens.colors).forEach((def: any) => { if (def.options) colors.push(...def.options) })
  }
  return Array.from(new Set(colors))
})
const hasRandom = computed(() => activeTemplate.value ? JSON.stringify(activeTemplate.value).includes('"$random"') : false)

// 元素被删除 / 撤销后，及时清理失效选择
watch(displayTemplate, (t) => {
  if (!t) { selectedIds.value = []; return }
  const ids = new Set(t.elements.map(e => e.id))
  if (selectedIds.value.some(id => !ids.has(id))) selectedIds.value = selectedIds.value.filter(id => ids.has(id))
})

// ===== Viewport（Bug 2 修复核心：统一坐标原点） =====
// fitScreen / 滚轮缩放全部以渲染器内部 .canvas-viewport 为原点 —— 这正是 canvasOffset 作用的坐标系
function viewportMetrics() {
  const vp = rendererRef.value?.viewportRef
  if (!vp) return null
  const rect = vp.getBoundingClientRect()
  const cs = getComputedStyle(vp)
  const bl = parseFloat(cs.borderLeftWidth) || 0
  const bt = parseFloat(cs.borderTopWidth) || 0
  const br = parseFloat(cs.borderRightWidth) || 0
  const bb = parseFloat(cs.borderBottomWidth) || 0
  return { left: rect.left + bl, top: rect.top + bt, w: rect.width - bl - br, h: rect.height - bt - bb }
}
function fitScreen() {
  const m = viewportMetrics()
  if (!m) return
  const { w, h } = designSize.value
  if (w <= 0 || h <= 0) return
  // 只改 zoom 与 offset，不改设计尺寸，不改元素几何
  const scale = Math.min(m.w / w, m.h / h) * 0.92
  canvasScale.value = Math.min(4, Math.max(0.02, scale))
  canvasOffset.value = {
    x: (m.w - w * canvasScale.value) / 2,
    y: (m.h - h * canvasScale.value) / 2
  }
}
function zoom(delta: number) { canvasScale.value = Math.min(4, Math.max(0.02, canvasScale.value + delta)) }
function handleWheel(e: WheelEvent) {
  // Shift+滚轮 = 横向平移（放大后左右挪画布）；触控板双指横滑也走这条
  if (e.shiftKey && !e.ctrlKey && !e.metaKey) {
    canvasOffset.value.x -= (e.deltaX || e.deltaY)
    return
  }
  const m = viewportMetrics()
  if (!m) return
  const factor = Math.exp(-e.deltaY * 0.0015)
  const newScale = Math.min(4, Math.max(0.02, canvasScale.value * factor))
  const mouseX = e.clientX - m.left
  const mouseY = e.clientY - m.top
  const ratio = newScale / canvasScale.value
  canvasOffset.value = {
    x: mouseX - (mouseX - canvasOffset.value.x) * ratio,
    y: mouseY - (mouseY - canvasOffset.value.y) * ratio
  }
  canvasScale.value = newScale
}
function handleMouseDown(e: MouseEvent) {
  // 中键拖拽 = 平移；空格 + 左键拖拽 = 平移（Figma/PS 习惯，照顾只有左键的场景）
  if (e.button === 1 || (e.button === 0 && spaceHeld.value)) {
    e.preventDefault()
    isPanning.value = true
    panStart = { x: e.clientX, y: e.clientY, ox: canvasOffset.value.x, oy: canvasOffset.value.y }
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
  }
}
// 空格按下期间：容器变抓手光标，并屏蔽画布内元素的指针事件（否则会先触发元素拖动而不是平移）
function onSpaceKeyDown(e: KeyboardEvent) {
  if (e.code !== 'Space') return
  const t = e.target as HTMLElement | null
  if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return
  // 交互控件聚焦时空格归原生（激活按钮/展开下拉），不进画布平移——否则键盘用户被空格困住，
  // 只能改用 Enter 激活按钮。用鼠标点一下画布空白处（焦点落回 body）即恢复空格平移。
  if (t?.closest('button, a[href], select, summary, [role="button"], [role="link"], [role="checkbox"], [role="switch"], [role="tab"], [role="menuitem"]')) return
  e.preventDefault()
  spaceHeld.value = true
}
function onSpaceKeyUp(e: KeyboardEvent) {
  if (e.code === 'Space') spaceHeld.value = false
}
function onWindowBlur() { spaceHeld.value = false }
function handleMouseMove(e: MouseEvent) {
  if (!isPanning.value) return
  canvasOffset.value.x = panStart.ox + (e.clientX - panStart.x)
  canvasOffset.value.y = panStart.oy + (e.clientY - panStart.y)
}
function handleMouseUp() {
  isPanning.value = false
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('mouseup', handleMouseUp)
}
// 窗口尺寸变化时自动重新居中，避免画布"丢失"
let resizeRaf = 0
function onWindowResize() {
  cancelAnimationFrame(resizeRaf)
  resizeRaf = requestAnimationFrame(() => fitScreen())
}

// ===== ⛶ 全屏专注编辑 =====
function setFocusMode(on: boolean) {
  if (focusMode.value === on) return
  focusMode.value = on
  if (!on) focusPanel.value = false
  // 浏览器拒绝全屏（iframe/策略）不拦界面聚焦，至少侧栏顶栏还能藏
  try {
    if (on && !document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => { /* ignore */ })
    else if (!on && document.fullscreenElement) document.exitFullscreen().catch(() => { /* ignore */ })
  } catch { /* ignore */ }
  if (on) toastMine('⛶ 专注模式：点选元素即自动滑出属性面板；底部「🎛️ 属性」可随时开/收，选中后上方还有操作条；按 . 退出')
  nextTick(() => fitScreen())
}
function onFullscreenChange() {
  // 浏览器原生 Esc 退出全屏时同步收起专注模式，防止"全屏没了但界面还收着"
  if (!document.fullscreenElement && focusMode.value) {
    focusMode.value = false
    focusPanel.value = false
    nextTick(() => fitScreen())
  }
}
function toggleFocusPanel() {
  focusPanel.value = !focusPanel.value
}

// ===== 比例 =====
const RATIO_KNOWN: Record<string, [number, number]> = { '1:1': [1, 1], '4:3': [4, 3], '3:4': [3, 4], '4:5': [4, 5], '5:4': [5, 4], '16:9': [16, 9], '9:16': [9, 16] }
// 平台标准像素（2026-09 口径）：选中即按精确像素走「自定义」管线套用
const PLATFORM_SIZES = [
  { name: '小红书 竖版 3:4', w: 1242, h: 1656 },
  { name: '小红书 方图 1:1', w: 1080, h: 1080 },
  { name: 'B站封面 16:9', w: 2560, h: 1440 },
  { name: '抖音 竖版 3:4', w: 1080, h: 1440 },
  { name: '公众号头图 2.35:1', w: 900, h: 383 }
]
function applyPlatformPreset(e: Event) {
  const sel = e.target as HTMLSelectElement
  const p = PLATFORM_SIZES.find(x => `${x.w}x${x.h}` === sel.value)
  sel.value = ''
  if (!p) return
  customW.value = p.w
  customH.value = p.h
  applyCustomSize()
  toastMine(`📐 ${p.name} ${p.w}×${p.h} 已套用`)
}
function ratioFromSize(w: number, h: number): string {
  for (const [label, [rw, rh]] of Object.entries(RATIO_KNOWN)) {
    if (Math.abs(w / h - rw / rh) < 0.01) return label
  }
  return 'custom'
}
function sizeForRatio(ratio: string, refW: number): { w: number; h: number } {
  switch (ratio) {
    case '1:1': return { w: refW, h: refW }
    case '4:3': return { w: refW, h: Math.round(refW * 3 / 4) }
    case '3:4': return { w: refW, h: Math.round(refW * 4 / 3) }
    case '4:5': return { w: refW, h: Math.round(refW * 5 / 4) }
    case '16:9': return { w: refW, h: Math.round(refW * 9 / 16) }
    case '9:16': return { w: refW, h: Math.round(refW * 16 / 9) }
    case 'custom': return { w: customW.value || 1000, h: customH.value || 1000 }
    default: return { w: refW, h: refW }
  }
}
function ratioLabel(ratio: string) {
  const map: Record<string, string> = {
    '1:1': '1:1 正方', '4:3': '4:3 横版', '3:4': '3:4 竖版', '4:5': '4:5 社媒竖版',
    '16:9': '16:9 宽屏', '9:16': '9:16 手机', 'custom': '自定义'
  }
  return map[ratio] || ratio
}
function handleRatioChange(e?: Event) {
  if (pendingRatio.value === canvasRatio.value) return
  if (pendingRatio.value === 'custom') {
    customW.value = designSize.value.w
    customH.value = designSize.value.h
    return
  }
  // 记住了算法就直接套用；选比例时按住 Alt 仍可弹框改设置
  const altHeld = (e as { altKey?: boolean } | undefined)?.altKey
  if (prefs.ratioAlgo && !altHeld) {
    applyRatioChange(prefs.ratioAlgo)
    toastMine(`📐 已按记住的「${ALGO_CN[prefs.ratioAlgo]}」切到 ${pendingRatio.value}（想换算法：按住 Alt 再选比例）`)
    return
  }
  showRatioDialog.value = true
}
const ALGO_CN: Record<'expand' | 'crop' | 'scale', string> = { expand: '同色扩展', crop: '对等裁切', scale: '等距缩放' }
function applyRatioChange(algorithm: 'expand' | 'crop' | 'scale', anchor?: { x: number; y: number }, remember?: boolean) {
  if (remember !== undefined) savePrefs({ ratioAlgo: remember ? algorithm : '' })
  const oldV = ratioVisRect()  // 切换前的可视矩形，贴边条靠它判断原本贴哪条边
  const oldW = designSize.value.w, oldH = designSize.value.h
  canvasRatio.value = pendingRatio.value
  ratioAlgorithm.value = algorithm
  ratioAnchor.value = algorithm === 'crop' && anchor ? anchor : { x: 0.5, y: 0.5 }
  designSize.value = pendingRatio.value === nativeRatio.value
    ? { ...nativeSize.value }
    : sizeForRatio(pendingRatio.value, nativeSize.value.w)
  rescaleGuides(oldW, oldH, designSize.value.w, designSize.value.h)
  showRatioDialog.value = false
  autoExtendBackgrounds(oldV)
  // Bug 2：比例变化 → 设计尺寸变化 → 自动重算视口并居中
  nextTick(() => fitScreen())
}
function applyCustomSize() {
  if (!(customW.value > 0) || !(customH.value > 0)) { toastMine('⚠️ 先在宽 / 高框里填大于 0 的像素数'); return }
  const sz = clampDesignSize(customW.value, customH.value)
  if (sz.clamped) toastMine(`⚠️ 自定义尺寸超出安全上限，已压到 ${sz.w}×${sz.h}（单边 ≤${MAX_SIDE}px、总面积 ≤${MAX_AREA / 1e6}MP，否则导出易爆内存）`)
  const oldV = ratioVisRect()
  const oldW = designSize.value.w, oldH = designSize.value.h
  canvasRatio.value = 'custom'
  // 顶部比例下拉同步显示「自定义」，不再与画布实际尺寸各说各话
  pendingRatio.value = 'custom'
  designSize.value = { w: sz.w, h: sz.h }
  rescaleGuides(oldW, oldH, designSize.value.w, designSize.value.h)
  autoExtendBackgrounds(oldV)
  toastMine(`📐 已套用 ${designSize.value.w} × ${designSize.value.h}`)
  nextTick(() => fitScreen())
}

// 当前视口映射回原生坐标系的可视矩形（与 TemplateRenderer contentOffset 同一套公式）
function ratioVisRect() {
  const nw = nativeSize.value.w, nh = nativeSize.value.h
  const vw = designSize.value.w, vh = designSize.value.h
  const s = ratioAlgorithm.value === 'scale' ? Math.min(vw / nw, vh / nh) : 1
  const ox = (vw - nw * s) * ratioAnchor.value.x, oy = (vh - nh * s) * ratioAnchor.value.y
  return { x: -ox / s, y: -oy / s, w: vw / s, h: vh / s }
}
// 切比例自动拓展：①满幅背景/纹理/渐变层拉伸补满新可视区 ②贴边横条（胶片条/危险条纹/地脚线）吸附原贴的边 ③贴边竖条（电影齿孔/侧栏条）纵向拉伸补满、水平位不动。普通内容不动。
// 走 overrides 通道 → 属性面板/撤销/导出天然一致。oldV=切换可视矩形，缺省用当前（贴边判定需要切换前的位置关系）
function autoExtendBackgrounds(oldV?: { x: number; y: number; w: number; h: number }) {
  const t = displayTemplate.value
  if (!t) return
  const v = ratioVisRect()
  const ref = oldV || v
  const nw = nativeSize.value.w, nh = nativeSize.value.h
  const patches: Record<string, { x: number; y: number; width: number; height: number }> = {}
  let bgN = 0, barN = 0, sideN = 0
  for (const el of t.elements as any[]) {
    if (el.type !== 'image' && el.type !== 'shape' && el.type !== 'overlay') continue
    // 渲染层把 'top-left' 与缺省视为同义（el.anchor || 'top-left'），这里同口径：显式写 top-left 不算锚定
    if (el.locked || (el.anchor && el.anchor !== 'top-left') || (el.rotation && Math.abs(el.rotation) > 0.01)) continue
    const x = Number(el.x) || 0, y = Number(el.y) || 0, w = Number(el.width) || 0, h = Number(el.height) || 0
    if (w <= 0 || h <= 0) continue
    const fullW = w >= 0.85 * nw && x <= 0.15 * nw && x + w >= 0.85 * nw
    const fullH = h >= 0.85 * nh && y <= 0.15 * nh && y + h >= 0.85 * nh
    if (fullW && fullH) {
      // 满幅背景层：包围盒拉伸补满新可视区
      const nx = Math.min(x, v.x), ny = Math.min(y, v.y)
      const nx2 = Math.max(x + w, v.x + v.w), ny2 = Math.max(y + h, v.y + v.h)
      if (nx > x - 1.5 && ny > y - 1.5 && nx2 < x + w + 1.5 && ny2 < y + h + 1.5) continue
      patches[el.id] = { x: Math.round(nx), y: Math.round(ny), width: Math.round(nx2 - nx), height: Math.round(ny2 - ny) }
      bgN++
      continue
    }
    if (fullW && h <= 0.2 * nh) {
      // 贴边横条：判断切换前贴哪条横边（≤2px 算贴），保持到该边的原距离映射到新可视区
      const distTop = y - ref.y, distBot = ref.y + ref.h - (y + h)
      if (distTop > 2 && distBot > 2) continue
      const ny = distTop <= distBot ? v.y + distTop : v.y + v.h - distBot - h
      if (Math.abs(ny - y) < 1.5) continue
      patches[el.id] = { x: Math.round(x), y: Math.round(ny), width: Math.round(w), height: Math.round(h) }
      barN++
      continue
    }
    if (fullH && w <= 0.2 * nw) {
      // 贴边竖条：横向位置与宽度原样保留（天然跟左右边），只把高度拉满新可视区
      const ny = Math.min(y, v.y), ny2 = Math.max(y + h, v.y + v.h)
      if (ny > y - 1.5 && ny2 < y + h + 1.5) continue
      patches[el.id] = { x: Math.round(x), y: Math.round(ny), width: Math.round(w), height: Math.round(ny2 - ny) }
      sideN++
    }
  }
  const ids = Object.keys(patches)
  if (!ids.length) return
  const next: UserOverrides = { ...overrides.value, elements: { ...(overrides.value.elements || {}) } }
  for (const id of ids) next.elements![id] = { ...(next.elements![id] || {}), ...patches[id] }
  overrides.value = next
  const acts: string[] = []
  if (bgN) acts.push(`拉伸 ${bgN} 个满幅背景层`)
  if (barN) acts.push(`吸附 ${barN} 个贴边条`)
  if (sideN) acts.push(`拉长 ${sideN} 条竖贴边条`)
  toastMine(`🧩 已自动${acts.join('、')}贴合新画布（Ctrl+Z 可撤销）`)
}

// ===== 模板选择 / 导入 =====
function getTemplatesByCategory(catId: TemplateCategory) {
  const list = templateCache.value[catId] || []
  return prefs.hiddenTemplates.length ? list.filter(t => !prefs.hiddenTemplates.includes(t.id)) : list
}
function toggleCategory(id: string) {
  if (expandedCategories.value.has(id)) expandedCategories.value.delete(id)
  else expandedCategories.value.add(id)
}
function toggleGroup(id: string) {
  if (expandedGroups.value.has(id)) expandedGroups.value.delete(id)
  else openGroup(id)
}
function selectTemplate(tpl: Template) {
  currentTemplate.value = tpl
  draftTemplate.value = null
  selectedIds.value = []
  overrides.value = {}
  tokenOverrides.value = {}
  const nw = tpl.canvas.defaultWidth || tpl.canvas.virtualWidth || 1000
  const nh = tpl.canvas.defaultHeight || tpl.canvas.virtualHeight || 1000
  designSize.value = { w: nw, h: nh }
  nativeRatio.value = ratioFromSize(nw, nh)
  canvasRatio.value = nativeRatio.value
  pendingRatio.value = nativeRatio.value
  if (nativeRatio.value === 'custom') { customW.value = nw; customH.value = nh }
  ratioAlgorithm.value = 'crop'
  ratioAnchor.value = { x: 0.5, y: 0.5 }
  // 所见即所得：选中固定用默认种子，画布随机装饰与缩略图一致；想换一批用「🎨 风格」里的 🎲
  seed.value = DEFAULT_SEED
  history.value = []
  historyIndex.value = -1
  pushHistory()
  nextTick(() => fitScreen())
}
function randomizeSeed() { seed.value = Math.random().toString(36).substring(2, 10) }

// ===== 重置为原模板：丢弃全部改动（换色/元素编辑/比例），先压历史，Ctrl+Z 可反悔 =====
const editCount = computed(() => {
  const o = overrides.value
  let n = Object.keys(o.tokens || {}).length
    + (o.added?.length || 0) + (o.deleted?.length || 0) + (o.locked?.length || 0)
  const els = o.elements || {}
  for (const id of Object.keys(els)) n += Object.keys(els[id] || {}).length
  if (o.order?.length) n++
  if (canvasRatio.value !== nativeRatio.value || designSize.value.w !== nativeSize.value.w || designSize.value.h !== nativeSize.value.h) n++
  return n
})
async function resetToOriginal() {
  const n = editCount.value
  if (!n) return
  if (!(await askConfirm('确定重置为原模板？', `将丢弃 ${n} 处改动（换色、元素编辑、画布比例/尺寸）。\n重置后可按 Ctrl+Z 撤销本次重置。`, '重置'))) return
  pushHistory()
  overrides.value = {}
  tokenOverrides.value = {}
  canvasRatio.value = nativeRatio.value
  pendingRatio.value = nativeRatio.value
  designSize.value = { ...nativeSize.value }
  ratioAlgorithm.value = 'crop'
  ratioAnchor.value = { x: 0.5, y: 0.5 }
  if (nativeRatio.value === 'custom') { customW.value = nativeSize.value.w; customH.value = nativeSize.value.h }
  selectedIds.value = []
  nextTick(() => fitScreen())
  toastMine('↺ 已重置为原模板，Ctrl+Z 可撤销重置')
}

// ===== AI 复刻同款：提示词导出（displayTemplate 版 + 长 src 折占位符）与导入回灌 =====
const { cloneIntent, cloneCopied, cloneSrcFolded, cloneWarn, copyClonePrompt, restoreFoldedSrc } = useClonePrompt({ displayTemplate })

// 导入前保护：草稿存在或有未保存修改时，弹窗内先确认再覆盖
const unsavedNote = computed<string | null>(() => {
  const o = overrides.value as any
  const edited = !!(Object.keys(o?.elements || {}).length || o?.added?.length || o?.deleted?.length || o?.order?.length || Object.keys(tokenOverrides.value || {}).length)
  if (draftTemplate.value) return `当前是草稿「${draftTemplate.value.name}」，导入会替换为新草稿${edited ? '，且草稿上的修改会丢失' : ''}。`
  return edited ? '当前模板有未保存的修改，导入会清空它们。' : null
})
function exitDraft() {
  draftTemplate.value = null
  selectedIds.value = []
  overrides.value = {}
  tokenOverrides.value = {}
  cloneWarn.value = ''
  history.value = []
  historyIndex.value = -1
  pushHistory() // 与 handleImport 同口径：退出草稿后的基线入栈，首步 Ctrl+Z 有迹可循
}

function handleImport(data: any) {
  const missing = restoreFoldedSrc(data)
  cloneWarn.value = missing.length ? `占位符图片回灌失败（当前模板没有这些元素 id）：${missing.slice(0, 5).join('、')}，相应位置已换成灰框占位，导出前记得补图` : ''
  draftTemplate.value = data
  currentTemplate.value = null
  selectedIds.value = []
  overrides.value = {}
  tokenOverrides.value = {}
  const rawW = data?.canvas?.defaultWidth || data?.canvas?.virtualWidth || 1000
  const rawH = data?.canvas?.defaultHeight || data?.canvas?.virtualHeight || 1000
  // 导入的模板自带 canvas 尺寸不经「自定义尺寸」守卫，这里同样压回安全上限，否则大剂量/超大模板直接把导出内存打爆
  const sz = clampDesignSize(rawW, rawH)
  if (sz.clamped) toastMine(`⚠️ 导入模板画布 ${Math.round(rawW)}×${Math.round(rawH)} 超出安全上限，已压到 ${sz.w}×${sz.h}`)
  const nw = sz.w, nh = sz.h
  designSize.value = { w: nw, h: nh }
  nativeRatio.value = ratioFromSize(nw, nh)
  canvasRatio.value = nativeRatio.value
  pendingRatio.value = nativeRatio.value
  if (nativeRatio.value === 'custom') { customW.value = nw; customH.value = nh }
  ratioAlgorithm.value = 'crop'
  ratioAnchor.value = { x: 0.5, y: 0.5 }
  showDevModal.value = false
  history.value = []
  historyIndex.value = -1
  pushHistory()
  nextTick(() => fitScreen())
}

// ===== 另存为我的模板：烘焙当前编辑（seed/overrides 固化）→ localStorage 本地库 =====
function userTplIds() { return new Set(userTemplates.value.map(t => t.id)) }

async function captureThumbDataUrl(): Promise<string> {
  const node = rendererRef.value?.canvasRootRef
  if (!node) return ''
  const prevSel = selectedIds.value
  selectedIds.value = []
  const wasStopped = animationsStopped.value
  animationsStopped.value = true
  await nextTick()
  try {
    const w = designSize.value.w, h = designSize.value.h
    return await domToJpeg(node, {
      width: w, height: h, scale: Math.min(1, 320 / Math.max(w, 1)), quality: 0.7,
      backgroundColor: displayTemplate.value?.canvas.backgroundColor || '#ffffff'
    })
  } catch { return '' } finally {
    selectedIds.value = prevSel
    animationsStopped.value = wasStopped
  }
}

async function saveAsMyTemplate() {
  const t = activeTemplate.value
  if (!t) return
  if (userTemplates.value.length >= USER_TPL_LIMIT) { toastMine(`⚠️ 「我的模板」已满 ${USER_TPL_LIMIT} 个，先删几个再存`); return }
  const def = `${t.name} · 我的`
  const name = await askPrompt('给你的模板起个名字（会出现在侧栏「⭐ 我的模板」）', def)
  if (name === null) return
  const baked = bakeTemplate(t, seed.value, overrides.value)
  baked.name = name.trim() || def
  baked.id = uniqueUserId(`${t.id}-my`, userTplIds())
  baked.thumbnail = (await captureThumbDataUrl()) || baked.thumbnail
  const res = saveUserTemplates([...userTemplates.value, baked])
  if (!res.ok) { toastMine(`⚠️ ${res.msg}`); return }
  userTemplates.value.push(baked)
  userSectionOpen.value = true
  if (res.msg) { toastMine(res.msg); return }
  toastMine(`✅ 已存入「我的模板」：${baked.name}`)
}

// 批量变体导入：DeveloperModal 已逐份过 schema，这里只负责去重入库「我的模板」
// id 尊重提示词契约（母版 id-v1…-vN，DeveloperModal 批量提示词第 1 条），只在撞名时加 -2/-3 后缀
function handleImportBatch(tpls: Template[]) {
  const taken = userTplIds()
  const room = USER_TPL_LIMIT - userTemplates.value.length
  if (room <= 0) { toastMine(`⚠️ 「我的模板」已满 ${USER_TPL_LIMIT} 个，先删几个再存`); return }
  const accepted = tpls.slice(0, room)
  const baked = accepted.map(t => ({
    ...t,
    id: uniqueUserId(t.id, taken),
    tags: [...(t.tags || []), '我的模板']
  }))
  baked.forEach(t => taken.add(t.id))
  const saved = saveUserTemplates([...userTemplates.value, ...baked])
  if (!saved.ok) { toastMine(`⚠️ ${saved.msg}`); return }
  userTemplates.value.push(...baked)
  userSectionOpen.value = true
  if (saved.msg) { toastMine(saved.msg); showDevModal.value = false; return }
  showDevModal.value = false
  toastMine(`✅ 已批量存入 ${baked.length} 个变体${tpls.length > accepted.length ? `（超出上限丢掉了后 ${tpls.length - accepted.length} 个）` : ''}`)
}

async function removeUserTemplate(t: Template) {
  if (!(await askConfirm(`删除「${t.name}」？`, '此操作不可恢复（当前打开中的编辑不受影响）。', '删除', true))) return
  const next = userTemplates.value.filter(x => x.id !== t.id)
  const res = saveUserTemplates(next)
  if (!res.ok) { toastMine(`⚠️ ${res.msg}`); return }
  if (res.msg) { toastMine(res.msg); return }
  userTemplates.value = next
  toastMine('🗑 已删除')
}

async function renameUserTemplate(t: Template) {
  const name = await askPrompt('重命名模板', t.name)
  if (name === null || !name.trim()) return
  const next = userTemplates.value.map(x => x.id === t.id ? { ...x, name: name.trim() } : x)
  const res = saveUserTemplates(next)
  if (!res.ok) { toastMine(`⚠️ ${res.msg}`); return }
  if (res.msg) { toastMine(res.msg); return }
  userTemplates.value = next
  if (currentTemplate.value?.id === t.id) currentTemplate.value = next.find(x => x.id === t.id) || currentTemplate.value
  toastMine('✏️ 已重命名')
}

// ===== 「我的模板」备份：清浏览器数据不等于全丢，JSON 出得去也回得来 =====
const { importUserTplFileInput, exportUserTemplateJson, exportAllUserTemplates, onImportUserTplFile } =
  useUserTplBackup({ userTemplates, userSectionOpen, userTplIds, notify: toastMine })

// 烘焙 JSON 导出（开发者面板「📤 导出」触发）
function currentBaked(): Template | null {
  const t = activeTemplate.value
  return t ? bakeTemplate(t, seed.value, overrides.value) : null
}
function handleBakeDownload() {
  const b = currentBaked()
  if (b) downloadTextFile(`${b.id}.json`, JSON.stringify(b, null, 2))
}
async function handleBakeCopy() {
  const b = currentBaked()
  if (!b) return
  try {
    await navigator.clipboard.writeText(JSON.stringify(b, null, 2))
    toastMine('✅ 烘焙 JSON 已复制（含你的全部改动）')
  } catch { toastMine('⚠️ 复制失败') }
}

// ===== 编辑自动暂存：改动静默写入 localStorage，刷新后横幅一键恢复 =====
let autosaveTimer: any = null
let autosaveQuotaWarned = false
watch([overrides, seed], () => {
  clearTimeout(autosaveTimer)
  autosaveTimer = setTimeout(() => {
    const t = activeTemplate.value
    if (!t) return
    if (!hasEdits(overrides.value)) {
      // 待恢复横幅里还挂着这份草稿时不清，避免刷新丢回程
      const curId = t.id
      if (!autosavePrompt.value.some(d => d.tpl.id === curId)) clearAutosave(curId)
      return
    }
    const err = writeAutosave({ tpl: JSON.parse(JSON.stringify(t)), seed: seed.value, overrides: JSON.parse(JSON.stringify(overrides.value)), at: Date.now() })
    // 只出声一次，避免每次防抖都弹；写通过一次就复位，下次真失败还会响（否则长期静默失效）
    if (err) { if (!autosaveQuotaWarned) { autosaveQuotaWarned = true; toastMine(err) } }
    else autosaveQuotaWarned = false
  }, 800)
}, { deep: true })

// 关标签页/刷新前把改动抢进草稿箱。草稿箱是 800ms 防抖写的，改完直接关页面会蒸发最后一段。
// 这里只写不出声：横幅在页面卸载时已经看不见了，弹 toast 也没人看得到。
function flushDraftOnUnload() {
  const t = activeTemplate.value
  if (!t || !hasEdits(overrides.value)) return
  clearTimeout(autosaveTimer)
  writeAutosave({ tpl: JSON.parse(JSON.stringify(t)), seed: seed.value, overrides: JSON.parse(JSON.stringify(overrides.value)), at: Date.now() })
}

// 把当前改动立即写进草稿箱（不等 800ms 防抖），并挂到顶部横幅列表里——不刷新也能点名恢复
function flushDraftNow() {
  const t = activeTemplate.value
  if (!t || !hasEdits(overrides.value)) return
  clearTimeout(autosaveTimer)
  const a: Autosave = { tpl: JSON.parse(JSON.stringify(t)), seed: seed.value, overrides: JSON.parse(JSON.stringify(overrides.value)), at: Date.now() }
  const err = writeAutosave(a)
  if (err) { toastMine(err); return }
  if (!autosavePrompt.value.some(d => d.tpl.id === a.tpl.id)) autosavePrompt.value = [...autosavePrompt.value, a]
}

// 侧栏点缩略图的统一入口：有改动时先问一句，确认后改动落草稿箱再切换（重选同一张也一样保护）
async function pickTemplate(tpl: Template) {
  if (editCount.value > 0) {
    const cur = draftTemplate.value || currentTemplate.value
    if (cur) {
      const same = !draftTemplate.value && cur.id === tpl.id
      const ok = await askConfirm(
        same ? `重新选「${tpl.name}」？` : `换到「${tpl.name}」？`,
        `当前画面有 ${editCount.value} 处改动。继续的话改动会存入草稿箱，画布顶部「🕘」横幅随时可点名找回（刷新也不丢）；取消则留在原地。`,
        same ? '重新选（改动进草稿箱）' : '继续（改动进草稿箱）'
      )
      if (!ok) return
    }
  }
  flushDraftNow()
  selectTemplate(tpl)
}

function restoreAutosave() {
  const a = autosavePrompt.value[autosavePick.value] || autosavePrompt.value[0]
  if (!a) return
  flushDraftNow() // 恢复别的草稿前，当前画面的改动照样进草稿箱，不白丢
  const fresh = (templateCache.value as Record<string, Template[]>)[a.tpl.category]?.find(x => x.id === a.tpl.id)
  selectTemplate(fresh || a.tpl)
  overrides.value = a.overrides || {}
  tokenOverrides.value = { ...(a.overrides?.tokens || {}) }
  seed.value = a.seed
  autosavePrompt.value = autosavePrompt.value.filter(d => d !== a)
  autosavePick.value = 0
  toastMine('🕘 已恢复上次编辑')
}
function dismissAutosave() {
  const a = autosavePrompt.value[autosavePick.value] || autosavePrompt.value[0]
  if (!a) return
  clearAutosave(a.tpl.id)
  autosavePrompt.value = autosavePrompt.value.filter(d => d !== a)
  autosavePick.value = 0
}

// ===== 应用内确认/命名对话框：替代 window.confirm/prompt（深色一致、不阻塞主线程、可拦全局快捷键） =====
type DialogState = { kind: 'confirm' | 'prompt'; title: string; detail?: string; def?: string; okText: string; danger?: boolean }
const dialog = ref<(DialogState & { value: string }) | null>(null)
const dialogCard = ref<HTMLElement | null>(null)
let dialogResolve: ((v: string | null) => void) | null = null
function openDialog(s: DialogState): Promise<string | null> {
  dialog.value = { ...s, value: s.def ?? '' }
  nextTick(() => dialogCard.value?.focus())
  return new Promise(res => { dialogResolve = res })
}
function closeDialog(ok: boolean) {
  const d = dialog.value
  if (!d) return
  dialog.value = null
  dialogResolve?.(ok ? (d.kind === 'confirm' ? '' : d.value) : null)
  dialogResolve = null
}
function onDialogKey(e: KeyboardEvent) {
  const d = dialog.value
  if (!d) return
  e.stopPropagation()
  if (e.isComposing) return // 拼音候选中的 Enter/Esc 归输入法，不算提交/关闭
  if (e.key === 'Escape') closeDialog(false)
  else if (e.key === 'Enter' && (d.kind === 'confirm' || e.target !== dialogCard.value)) closeDialog(true)
}
async function askConfirm(title: string, detail?: string, okText = '确定', danger = false): Promise<boolean> {
  return (await openDialog({ kind: 'confirm', title, detail, okText, danger })) !== null
}
async function askPrompt(title: string, def: string, okText = '确定'): Promise<string | null> {
  return openDialog({ kind: 'prompt', title, def, okText })
}

// ===== 坏图可见化：画布右上角常驻角标（打包版不静默），点开列出元素 id、一键选中跳图片面板 =====
const brokenImages = ref<string[]>([])
const brokenListOpen = ref(false)
function onBrokenImages(ids: string[]) {
  brokenImages.value = ids
  if (!ids.length) brokenListOpen.value = false
}
function jumpToBrokenImage(id: string) {
  selectedIds.value = [id]
  propTab.value = 'element'
  nextTick(() => propScrollRef.value?.scrollTo(0, 0))
}

// ===== SVG 源码编辑弹窗（仅内联 SVG data URI 可入） =====
const svgEditor = ref<{ id: string; src: string } | null>(null)
function isSvgSrc(s: any): boolean {
  return typeof s === 'string' && (s.startsWith('data:image/svg') || (s.startsWith('data:') && s.includes('svg+xml')))
}
function onSvgApply(uri: string) {
  if (svgEditor.value) setElProps(svgEditor.value.id, { src: uri })
  svgEditor.value = null
}

// ===== 选择与元素操作（全部走 Overrides → 自动纳入 Undo/Redo） =====
function handleSelectElement(payload: { id: string | null; additive: boolean }) {
  if (payload.id === null) { selectedIds.value = []; return }
  if (payload.additive) {
    const set = new Set(selectedIds.value)
    if (set.has(payload.id)) set.delete(payload.id); else set.add(payload.id)
    selectedIds.value = [...set]
  } else {
    // 同组联动：点组内任一元素 = 选中整组（条码/装订孔等「一个视觉单元拆成 N 个元素」的装饰）。
      // Shift+点击（additive 分支）保持逐个加减，作为单独改某一根的逃生口。
      lastPickedId.value = payload.id
      const gid = groupIndex.value.get(payload.id)
      if (gid) {
        selectedIds.value = (activeTemplate.value?.elements || [])
          .filter(e => groupIndex.value.get(e.id) === gid)
          .map(e => e.id)
      } else {
        selectedIds.value = [payload.id]
      }
  }
}
// 编组选中后想单独改某一根：把选择收缩回刚点中的那一个元素
function shrinkToPicked() {
  if (lastPickedId.value) selectedIds.value = [lastPickedId.value]
}

// ===== 编组 → AI 提示词：让外部 AI 只改这一组装饰的样式 =====
const groupIntent = ref('只改这组装饰的视觉样式：配色、大小、疏密、旋转、圆角、透明度都可以调，整组节奏要统一和谐；版式结构与其他元素一律不动')
const groupCopied = ref(false)
async function copyGroupPrompt() {
  const gid = selectedGroup.value
  const t = displayTemplate.value
  if (!gid || !t) return
  const members = (t.elements || []).filter((e: any) => groupIndex.value.get(e.id) === gid)
  if (!members.length) return
  // 长 src 折成占位符（与 AI 复刻同一口径），导入时由 restoreFoldedSrc 回灌
  const tpl = JSON.parse(JSON.stringify(t))
  let folded = 0
  for (const e of tpl.elements ?? []) {
    if (typeof e?.src === 'string' && e.src.length > 300) { e.src = `{{IMG:${e.id}}}`; folded++ }
  }
  const text = [
    '下面是我画布工具的一个 Design JSON 模板。请只修改其中编组 group = ' + JSON.stringify(gid) + ' 的 ' + members.length + ' 个元素的视觉样式。',
    '编组成员 id：' + members.map((e: any) => e.id).join('、'),
    '',
    `修改要求：${groupIntent.value.trim() || '美化这组装饰的样式'}`,
    '',
    '硬性约束（违反任意一条都会导致导入失败）：',
    `1. 第一行原样输出 ${CONTRACT_HEADER}，第二行起只输出一个 JSON 对象，不要 markdown 代码围栏、不要任何解释文字。`,
    '2. 只允许改编组内元素的样式字段：fill / background / color / opacity / width / height / rotation / borderRadius / border / animation，以及 tokens 颜色值与 presets 配色（为配合新样式可整体调整）。',
    '3. 元素数量、每个元素的 id 与 type、以及所有 x / y 坐标一律不得改动；编组外的元素原样保留。',
    '4. 每个元素的 group 字段必须原样保留，不得改值、不得删除。',
    folded ? '5. 形如 "{{IMG:元素id}}" 的 src 是占位符，请原样回抄，不要改写、展开或编造 data URI。' : '5. 图片 src 不得改写或截断。',
    '6. 同一组内的新样式要互相协调（色系统一、大小有节奏），并与画面其余部分和谐。',
    '',
    '模板 JSON：',
    JSON.stringify(tpl, null, 2),
  ].join('\n')
  try {
    await navigator.clipboard.writeText(text)
    groupCopied.value = true
    setTimeout(() => groupCopied.value = false, 2000)
  } catch {
    toastMine('⚠️ 复制失败：浏览器拒绝了剪贴板，请手动选中内容复制')
  }
}

// ===== 编组 ← AI 结果：就地校验 + 预览差异 + 一键应用（不再绕高级功能） =====
const GROUP_STYLE_FIELDS = ['fill', 'background', 'color', 'opacity', 'width', 'height', 'rotation', 'borderRadius', 'border', 'shadow', 'animation'] as const
const groupPasteOpen = ref(false)
const groupPasteText = ref('')
const groupPaste = ref<null | { ok: boolean; errors?: string[]; lines?: string[]; more?: number; tokenLines?: string[]; data?: any }>(null)

function validateGroupPaste() {
  const gid = selectedGroup.value
  const cur = displayTemplate.value
  if (!gid || !cur) return
  const res = parseTemplateJson(groupPasteText.value)
  if (!res.success) { groupPaste.value = { ok: false, errors: res.errors }; return }
  const data: any = res.data
  // {{IMG:id}} 占位符回灌原图（与 AI 复刻同一口径）
  const missingImgs = restoreFoldedSrc(data)
  const curEls = new Map((cur.elements as any[]).map(e => [e.id, e] as const))
  const memberIds = [...curEls.keys()].filter(id => groupIndex.value.get(id) === gid)
  const incoming = new Map<string, any>((data.elements || []).map((e: any) => [e.id, e]))
  const missing = memberIds.filter(id => !incoming.has(id))
  if (missing.length) {
    groupPaste.value = { ok: false, errors: [`AI 结果里缺了编组成员：${missing.slice(0, 8).join('、')}${missing.length > 8 ? ' 等' : ''}。提示词要求整份输出，请把缺失元素补回来（可点下方「复制修复提示词」）。`] }
    return
  }
  // 差异预览：只列编组成员的样式字段变化
  const lines: string[] = []
  let more = 0
  for (const id of memberIds) {
    const a: any = curEls.get(id), b: any = incoming.get(id)
    const diffs: string[] = []
    for (const f of GROUP_STYLE_FIELDS) {
      const ov = JSON.stringify(a?.[f] ?? null), nv = JSON.stringify(b?.[f] ?? null)
      if (ov !== nv) diffs.push(f)
    }
    if (!diffs.length) continue
    const brief = diffs.length <= 4 ? diffs.join('/') : `${diffs.slice(0, 4).join('/')} 等 ${diffs.length} 项`
    const msg = `${id}：${brief}`
    if (lines.length < 12) lines.push(msg)
    else more++
  }
  // tokens 变化（AI 可能整体调了配色来配合）
  const tokenLines: string[] = []
  const curTokens = (cur as any).tokens?.colors || {}
  const newTokens = data.tokens?.colors || {}
  for (const [k, d] of Object.entries(newTokens as any)) {
    const nd = (d as any)?.default
    if (nd && curTokens[k]?.default !== nd) tokenLines.push(`colors.${k}: ${curTokens[k]?.default ?? '—'} → ${nd}`)
  }
  if (missingImgs.length) lines.unshift(`⚠️ ${missingImgs.length} 个 {{IMG:}} 占位符没找到原图：${missingImgs.slice(0, 3).join('、')}，已换成灰框占位`)
  groupPaste.value = { ok: true, lines, more, tokenLines, data }
}

function applyGroupPaste() {
  const gid = selectedGroup.value
  const res = groupPaste.value
  if (!gid || !res?.ok || !res.data) return
  const cur = displayTemplate.value
  if (!cur) return
  const incoming = new Map<string, any>((res.data.elements || []).map((e: any) => [e.id, e]))
  const newOverrides: any = { ...overrides.value }
  const els: Record<string, any> = { ...(newOverrides.elements || {}) }
  let applied = 0
  for (const e of cur.elements as any[]) {
    if (groupIndex.value.get(e.id) !== gid) continue
    const inc = incoming.get(e.id)
    if (!inc) continue
    const p: Record<string, any> = {}
    for (const f of GROUP_STYLE_FIELDS) if (inc[f] !== undefined) p[f] = inc[f]
    if (Object.keys(p).length) { els[e.id] = { ...(els[e.id] || {}), ...p }; applied++ }
  }
  newOverrides.elements = els
  // AI 若整体调了 tokens 配色，一并落进去（走同一套 token 覆写，风格页可见/可还原）
  const newTokens = res.data.tokens?.colors || {}
  const curTokens = (cur as any).tokens?.colors || {}
  const tok: Record<string, any> = { ...tokenOverrides.value }
  let tokN = 0
  for (const [k, d] of Object.entries(newTokens)) {
    const nd = (d as any)?.default
    if (nd && curTokens[k]?.default !== nd) { tok[`colors.${k}`] = nd; tokN++ }
  }
  if (tokN) tokenOverrides.value = tok
  overrides.value = newOverrides
  groupPaste.value = null
  groupPasteText.value = ''
  groupPasteOpen.value = false
  toastMine(`✅ 已应用「${gid}」：${applied} 个元素${tokN ? ` + ${tokN} 个颜色 token` : ''}（Ctrl+Z 可整体退回）`)
}

// 校验失败时的修复回路：机器可读失败原因 + 原文，粘回同一个 AI 对话修一次
async function copyGroupRepair() {
  if (!groupPaste.value?.errors?.length) return
  try {
    await navigator.clipboard.writeText(buildRepairPrompt(groupPaste.value.errors, groupPasteText.value))
    toastMine('🔧 修复提示词已复制，粘回同一个 AI 对话让它改一次')
  } catch {
    toastMine('⚠️ 复制失败：浏览器拒绝了剪贴板')
  }
}
function handleElementsMove(updates: Array<{ id: string; x: number; y: number }>) {
  if (!updates.length) return
  const newOverrides = { ...overrides.value }
  const els = (newOverrides.elements ??= {})
  updates.forEach(u => { els[u.id] = { ...(els[u.id] || {}), x: u.x, y: u.y } })
  overrides.value = newOverrides
}
function handleTransformUpdate(payload: { id: string; x?: number; y?: number; width?: number; height?: number; rotation?: number }) {
  const { id, ...rest } = payload
  const newOverrides = { ...overrides.value }
  if (!newOverrides.elements) newOverrides.elements = {}
  newOverrides.elements[id] = { ...(newOverrides.elements[id] || {}), ...rest }
  overrides.value = newOverrides
}
function setElProp(key: string, val: any) {
  if (!selectedId.value) return
  const newOverrides = { ...overrides.value }
  if (!newOverrides.elements) newOverrides.elements = {}
  newOverrides.elements[selectedId.value] = { ...(newOverrides.elements[selectedId.value] || {}), [key]: val }
  overrides.value = newOverrides
}
function setElProps(id: string, patch: Record<string, any>) {
  const newOverrides = { ...overrides.value }
  if (!newOverrides.elements) newOverrides.elements = {}
  newOverrides.elements[id] = { ...(newOverrides.elements[id] || {}), ...patch }
  overrides.value = newOverrides
}
// Bug 1 防御：NaN 一律不写入（数字输入框清空时不会产生坏状态）
function setNumProp(key: string, e: Event) {
  const v = parseFloat((e.target as HTMLInputElement).value)
  if (!Number.isFinite(v)) return
  let val = Math.round(v)
  if (key === 'width' || key === 'height' || key === 'fontSize') val = Math.max(1, val)
  setElProp(key, val)
}
function setFloatProp(key: string, e: Event) {
  const v = parseFloat((e.target as HTMLInputElement).value)
  if (!Number.isFinite(v)) return
  setElProp(key, v)
}
function deleteSelected() {
  const ids = editableSelected('删除')
  if (!ids.length) return
  const addedIds = new Set((overrides.value.added || []).map((e: any) => e.id))
  const deleted = new Set(overrides.value.deleted || [])
  const added = (overrides.value.added || []).filter((e: any) => !ids.includes(e.id))
  ids.forEach(id => { if (!addedIds.has(id)) deleted.add(id) })
  const newOverrides: UserOverrides = { ...overrides.value, deleted: [...deleted], added }
  if (newOverrides.order) newOverrides.order = newOverrides.order.filter(id => !ids.includes(id))
  if (newOverrides.locked) newOverrides.locked = newOverrides.locked.filter(id => !ids.includes(id))
  overrides.value = newOverrides
  selectedIds.value = selectedIds.value.filter(id => !ids.includes(id))
}
function maxZ() { return (displayTemplate.value?.elements || []).reduce((m, e) => Math.max(m, e.zIndex || 0), 0) }
function makeCopy(src: any, suffix: string, z: number) {
  const copy = JSON.parse(JSON.stringify(src))
  copy.id = `${src.id}-${suffix}-${Math.random().toString(36).slice(2, 7)}`
  copy.x = Math.round((copy.x || 0) + 24)
  copy.y = Math.round((copy.y || 0) + 24)
  copy.zIndex = z
  return copy
}
function duplicateSelected() {
  const els = displayTemplate.value?.elements || []
  const ids = editableSelected('复制')
  if (!ids.length) return
  const added = [...(overrides.value.added || [])]
  const newSel: string[] = []
  let z = maxZ()
  ids.forEach(id => {
    const src = els.find(e => e.id === id)
    if (!src) return
    const copy = makeCopy(src, 'copy', ++z)
    added.push(copy)
    newSel.push(copy.id)
  })
  overrides.value = { ...overrides.value, added }
  selectedIds.value = newSel
}
function copySelected() {
  const els = displayTemplate.value?.elements || []
  const copies = editableSelected('拷贝')
    .map(id => els.find(e => e.id === id))
    .filter(Boolean)
    .map(e => JSON.parse(JSON.stringify(e)))
  // 空拷不清旧剪贴板：复制失败不该让用户丢掉上一次 Ctrl+C 的内容
  if (copies.length) clipboard.value = copies
}
function pasteClipboard() {
  if (!clipboard.value.length) return
  const added = [...(overrides.value.added || [])]
  const newSel: string[] = []
  let z = maxZ()
  clipboard.value.forEach(src => {
    const copy = makeCopy(src, 'p', ++z)
    added.push(copy)
    newSel.push(copy.id)
  })
  overrides.value = { ...overrides.value, added }
  selectedIds.value = newSel
}
function toggleLockSelected() {
  const locked = new Set(overrides.value.locked || [])
  if (anySelectedLocked.value) selectedIds.value.forEach(id => locked.delete(id))
  else selectedIds.value.forEach(id => locked.add(id))
  overrides.value = { ...overrides.value, locked: [...locked] }
}
function currentOrder(): string[] {
  return [...(displayTemplate.value?.elements || [])].sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0)).map(e => e.id)
}
function reorderSelected(mode: 'front' | 'forward' | 'backward' | 'back') {
  const ids = editableSelected('图层')
  if (!ids.length) return
  const order = currentOrder()
  const sel = new Set(ids)
  let newOrder: string[]
  if (mode === 'front') {
    newOrder = [...order.filter(id => !sel.has(id)), ...order.filter(id => sel.has(id))]
  } else if (mode === 'back') {
    newOrder = [...order.filter(id => sel.has(id)), ...order.filter(id => !sel.has(id))]
  } else {
    newOrder = [...order]
    const idxs = order.map((id, i) => sel.has(id) ? i : -1).filter(i => i >= 0)
    if (mode === 'forward') {
      idxs.sort((a, b) => b - a).forEach(i => { if (i < newOrder.length - 1) [newOrder[i], newOrder[i + 1]] = [newOrder[i + 1], newOrder[i]] })
    } else {
      idxs.sort((a, b) => a - b).forEach(i => { if (i > 0) [newOrder[i], newOrder[i - 1]] = [newOrder[i - 1], newOrder[i]] })
    }
  }
  overrides.value = { ...overrides.value, order: newOrder }
}
// 编辑动作统一取「可编辑（未锁定）的选中项」；若因锁定全部落空则出声（静默跳过＝用户以为按钮坏了）
function editableSelected(action: string): string[] {
  const els = displayTemplate.value?.elements || []
  const isLocked = (id: string) => !!els.find(e => e.id === id)?.locked
  const editable = selectedIds.value.filter(id => !isLocked(id))
  const skipped = selectedIds.value.length - editable.length
  if (skipped > 0) toastMine(editable.length ? `🔒 ${action}：已跳过 ${skipped} 个锁定元素` : `🔒 ${action}：选中元素均已锁定，请先解锁`)
  return editable
}
type AlignMode = 'left' | 'hcenter' | 'right' | 'top' | 'vcenter' | 'bottom'
// 把一批元素按包围盒平移到目标框（含画布/所选外框两种目标）；未旋转元素结果与旧版逐像素一致
function shiftToBox(id: string, el: any, box: ReturnType<typeof rotAABB>, mode: AlignMode, ref: { left: number; right: number; top: number; bottom: number }) {
  let dx = 0, dy = 0
  if (mode === 'left') dx = ref.left - box.left
  else if (mode === 'right') dx = ref.right - box.right
  else if (mode === 'hcenter') dx = (ref.left + ref.right) / 2 - box.cx
  else if (mode === 'top') dy = ref.top - box.top
  else if (mode === 'bottom') dy = ref.bottom - box.bottom
  else if (mode === 'vcenter') dy = (ref.top + ref.bottom) / 2 - box.cy
  setElProps(id, { x: Math.round((Number(el.x) || 0) + dx), y: Math.round((Number(el.y) || 0) + dy) })
}
function alignSelected(mode: AlignMode) {
  const ids = editableSelected('对齐')
  const els = displayTemplate.value?.elements || []
  const { w: cw, h: ch } = designSize.value
  ids.forEach(id => {
    const el = els.find(e => e.id === id); if (!el) return
    shiftToBox(id, el, rotAABB(el), mode, { left: 0, right: cw, top: 0, bottom: ch })
  })
}
// 对齐所选：以最外圈选中元素的包围盒为参考框，把每个元素贴到框的对应边/中线
function alignToSelection(mode: AlignMode) {
  const els = displayTemplate.value?.elements || []
  const items = editableSelected('对齐所选')
    .map(id => ({ id, el: els.find(e => e.id === id) }))
    .filter((x): x is { id: string; el: any } => !!x.el)
  if (items.length < 2) return // 全锁定/单一可编辑的情况：editableSelected 或按钮出现条件已兜底
  const boxes = items.map(it => rotAABB(it.el))
  const ref = {
    left: Math.min(...boxes.map(b => b.left)), right: Math.max(...boxes.map(b => b.right)),
    top: Math.min(...boxes.map(b => b.top)), bottom: Math.max(...boxes.map(b => b.bottom))
  }
  items.forEach((it, i) => shiftToBox(it.id, it.el, boxes[i], mode, ref))
}
// 分布：两端元素不动，中间元素按「视觉盒心」等间距重排（≥3 个可编辑）。横/纵各轴独立。
function distributeSelected(axis: 'h' | 'v') {
  const els = displayTemplate.value?.elements || []
  const items = editableSelected('分布')
    .map(id => ({ id, el: els.find(e => e.id === id), box: null as any }))
    .filter((x): x is { id: string; el: any; box: any } => !!x.el)
  if (items.length < 3) { toastMine('分布需选中 ≥3 个可编辑元素'); return }
  items.forEach(it => { it.box = rotAABB(it.el) })
  const key = (b: any) => (axis === 'h' ? b.cx : b.cy)
  items.sort((a, b) => key(a.box) - key(b.box))
  const first = key(items[0].box), last = key(items[items.length - 1].box)
  const step = (last - first) / (items.length - 1)
  items.forEach((it, i) => {
    if (i === 0 || i === items.length - 1) return
    const d = (first + step * i) - key(it.box)
    if (Math.abs(d) < 0.5) return
    if (axis === 'h') setElProps(it.id, { x: Math.round((Number(it.el.x) || 0) + d) })
    else setElProps(it.id, { y: Math.round((Number(it.el.y) || 0) + d) })
  })
}
function nudgeSelected(dx: number, dy: number) {
  const els = displayTemplate.value?.elements || []
  let moved = 0
  selectedIds.value.forEach(id => {
    const el = els.find(e => e.id === id)
    if (!el || el.locked) return
    moved++
    // 外部导入的 JSON 里 x/y 可能是字符串，直接 + 会变成 "120" + 2 = "1202"
    setElProps(id, { x: Math.round((Number(el.x) || 0) + dx), y: Math.round((Number(el.y) || 0) + dy) })
  })
  // 全被锁定时空按没任何反馈，用户会以为按钮坏了
  if (!moved && selectedIds.value.length) toastMine('🔒 选中元素已锁定，先解锁才能移动')
}
// 微调步长：与方向键（2px / Shift 10px）同一套动作，给不想记快捷键的人按按钮
const nudgeStep = ref(2)
// 线条粗细的唯一来源是 height；老数据里并存的 border.width 同步改掉，免得两个口径再次分叉
function setLineWidth(e: Event) {
  const n = Math.round(Number((e.target as HTMLInputElement).value))
  if (!Number.isFinite(n) || n <= 0 || !selectedId.value) return
  const b: any = (selectedShape.value as any)?.border
  const patch: Record<string, any> = { height: n }
  if (b && typeof b === 'object' && b.width !== undefined) patch.border = { ...b, width: n }
  setElProps(selectedId.value, patch)
}

// ===== 图片替换（换 Asset 不换 Design） =====
const ASSET_API = '/__cover-assets'
const assetsOn = import.meta.env.DEV
type AssetGroup = { category: string; files: { name: string; url: string; size: number }[] }
const assetGroups = ref<AssetGroup[]>([])
const assetCategory = ref('')
const assetBusy = ref(false)
const assetNote = ref('')
const assetsOpen = ref(false)
const assetHelp = ref(false)
const svgSizeHelp = ref(false)
// 「怎么选中元素」与「快捷键总览」两个说明弹窗
const selectHelp = ref(false)
const hotkeysOpen = ref(false)
const assetCategories = computed(() => {
  const list: { id: string; name: string }[] = categories.map(c => ({ id: c.id, name: c.name }))
  for (const g of assetGroups.value)
    if (g.category && !(g.category in CATEGORY_REGISTRY)) list.push({ id: g.category, name: g.category })
  return list
})
const assetTotal = computed(() => assetGroups.value.reduce((n, g) => n + g.files.length, 0))
const assetCatName = (id: string) => id === '' ? '未分类' : (CATEGORY_REGISTRY[id as TemplateCategory]?.name || id)
// 当前选中模板所属分类的中文名（状态条分类徽标 + 悬浮 tooltip 复用）
const currentCatName = computed(() => assetCatName(currentTemplate.value?.category || ''))

async function loadAssets() {
  if (!assetsOn) return
  try {
    const r = await fetch(ASSET_API)
    const j = await r.json()
    if (j.ok) { assetGroups.value = j.groups; assetNote.value = '' }
    else assetNote.value = `图库读取失败：${j.error || '未知原因'}`
  } catch { assetNote.value = '落盘服务不可用（需 npm run dev 且 vite.config 已加载素材插件）' }
}

async function uploadAsset(file: File, category: string) {
  try {
    const q = new URLSearchParams({ category, name: file.name })
    const r = await fetch(`${ASSET_API}?${q}`, {
      method: 'POST', headers: { 'Content-Type': file.type || 'application/octet-stream' }, body: file
    })
    return await r.json() as { ok: boolean; url?: string; name?: string; error?: string }
  } catch { return { ok: false, error: '请求没发出（dev server 未运行？）' } }
}

function pickAsset(url: string) {
  if (!selectedId.value) return
  setElProp('src', url)
  assetNote.value = `已指向 ${url}`
}

watch(() => currentTemplate.value?.category, c => { if (c) assetCategory.value = c }, { immediate: true })
onMounted(loadAssets)

async function onImageUpload(e: Event) {
  const input = e.target as HTMLInputElement
  const f = input.files?.[0]
  input.value = ''
  if (!f || !selectedId.value || !f.type.startsWith('image/')) return
  if (!assetsOn) { setElProp('src', URL.createObjectURL(f)); return }
  assetBusy.value = true
  const res = await uploadAsset(f, assetCategory.value || 'misc')
  assetBusy.value = false
  if (res.ok && res.url) {
    setElProp('src', res.url)
    assetNote.value = `已存入 ${res.url}`
    await loadAssets()
  } else {
    setElProp('src', URL.createObjectURL(f))
    assetNote.value = `${res.error || '落盘失败'} —— 已改用临时地址，刷新即失效`
  }
}
function applyImageUrl() {
  const url = imageUrlInput.value.trim()
  if (url && selectedId.value) { setElProp('src', url); imageUrlInput.value = '' }
}
async function saveUrlToAssets() {
  const url = imageUrlInput.value.trim()
  if (!url || assetBusy.value) return
  if (!/^https?:\/\//i.test(url)) { assetNote.value = '只支持 http/https 图片地址'; return }
  assetBusy.value = true
  try {
    const q = new URLSearchParams({ category: assetCategory.value || 'misc', url })
    const r = await fetch(`${ASSET_API}?${q}`, { method: 'POST' })
    const res = await r.json() as { ok: boolean; url?: string; error?: string }
    if (res.ok && res.url) {
      if (selectedId.value) setElProp('src', res.url)
      assetNote.value = `已存入 ${res.url}`
      imageUrlInput.value = ''
      await loadAssets()
    } else assetNote.value = `存入失败：${res.error || '未知原因'}`
  } catch { assetNote.value = '存入失败：请求没发出（dev server 未运行？）' }
  finally { assetBusy.value = false }
}
function fitImageToCanvas() {
  if (!selectedEl.value) return
  if (selectedEl.value.locked) { toastMine('🔒 铺满画布：该元素已锁定，请先解锁'); return }
  setElProps(selectedId.value!, { x: 0, y: 0, width: designSize.value.w, height: designSize.value.h })
}

// ===== Tokens =====
function setToken(path: string, val: any) { tokenOverrides.value[path] = val; commitTokenOverrides() }
// 单条还原：删掉这个 token 的覆盖即回落模板默认（与文案页签逐条 ↺ 同一交互口径）
function revertToken(path: string) {
  const t = { ...tokenOverrides.value }
  delete t[path]
  tokenOverrides.value = t
  commitTokenOverrides()
}
function isTokenEdited(path: string) { return tokenOverrides.value[path] !== undefined }
function commitTokenOverrides() { overrides.value = { ...overrides.value, tokens: { ...tokenOverrides.value } } }
function applyPreset(p: PalettePreset) {
  for (const [k, v] of Object.entries(p.colors)) tokenOverrides.value[`colors.${k}`] = v
  commitTokenOverrides()
}
function isActivePreset(p: PalettePreset) {
  const d = presetDiff(p)
  return d.diff === 0 && d.outsideTouched === 0
}
function getTokenVal(path: string) {
  if (tokenOverrides.value[path] !== undefined) return tokenOverrides.value[path]
  const parts = path.split('.')
  if (parts.length === 2 && activeTemplate.value?.tokens) {
    const group = (activeTemplate.value.tokens as any)[parts[0]]
    if (group && group[parts[1]]) return group[parts[1]].default
  }
  return undefined
}
// ===== 配色编辑：自定义取色 + 用户变体（存本机 prefs 键，不进 overrides 也不进模板 schema） =====
const colorTokenKeys = computed(() => Object.keys(activeTemplate.value?.tokens?.colors || {}))
function isCustomColor(kKey: string, def: { options?: string[] }) {
  const v = getTokenVal(`colors.${kKey}`)
  return v !== undefined && !(def.options || []).includes(v)
}
function tokenDefault(kKey: string) {
  return activeTemplate.value?.tokens?.colors?.[kKey]?.default
}
function tokenLabel(kKey: string) {
  return activeTemplate.value?.tokens?.colors?.[kKey]?.label || kKey
}
/** 预设与当前配色的吻合度：用于把"全等才算选中"降级成差异提示 */
function presetDiff(p: PalettePreset) {
  const entries = Object.entries(p.colors)
  const diff = entries.filter(([k, v]) => getTokenVal(`colors.${k}`) !== v).length
  const covered = new Set(entries.map(([k]) => k))
  // 预设只列部分 token 时（模板库实测 328/720 条如此），未列出的那些若被改过，就不能算"完全吻合"
  const outside = colorTokenKeys.value.filter(k => !covered.has(k))
  const outsideTouched = outside.filter(k => getTokenVal(`colors.${k}`) !== tokenDefault(k)).length
  return { diff, total: entries.length, outside: outside.length, outsideTouched }
}
function paletteTitle(p: PalettePreset) {
  const d = presetDiff(p)
  const parts = Object.entries(p.colors).map(([k, v]) => `${tokenLabel(k)} ${v}`)
  let t = `${p.name}：${parts.join(' · ')}（共 ${d.total} 色 · 当前差 ${d.diff} 处`
  t += d.outside ? ` · 本方案未覆盖 ${d.outside} 色）` : '）'
  return t
}
const authorPresetCount = computed(() => activeTemplate.value?.presets?.length || 0)
const allPalettes = computed<PalettePreset[]>(() => [...(activeTemplate.value?.presets || []), ...currentUserPalettes.value])
// 没有任何预设完全吻合时，指出最接近的那套，避免"我选的预设去哪了"
const nearestPalette = computed(() => {
  const list = allPalettes.value
  if (!list.length) return null
  let best = list[0]; let bestDiff = Infinity
  for (const p of list) {
    const d = presetDiff(p).diff
    if (d < bestDiff) { bestDiff = d; best = p }
  }
  const d = presetDiff(best)
  return { name: best.name, diff: bestDiff, total: d.total, outside: d.outside, outsideTouched: d.outsideTouched }
})
// 只在"用户确实动过配色"且"没有任何一套完全吻合"时才提示，避免模板初始态误报
const colorsTouched = computed(() => Object.keys(tokenOverrides.value).some(k => k.startsWith('colors.')))
const paletteMatched = computed(() => allPalettes.value.some(p => { const d = presetDiff(p); return d.diff === 0 && d.outsideTouched === 0 }))
const showPaletteDiff = computed(() => colorsTouched.value && !!nearestPalette.value && !paletteMatched.value)

const userPalettes = ref<Record<string, PalettePreset[]>>({ ...prefs.palettes })
const currentUserPalettes = computed<PalettePreset[]>(() => userPalettes.value[activeTemplate.value?.id || ''] || [])
// 变体落本机 prefs 键：失败只可能是存储被禁用/超配额，出声而不是静默丢
function commitPalettes() {
  prefs.palettes = userPalettes.value
  if (!savePrefs({ palettes: userPalettes.value })) toastMine('⚠️ 变体未能存到本机（浏览器存储不可用或已满），本次关闭页面后会丢')
}

// 刚存下的那一套：带 templateId，切模板即自行消失（无需额外清零）
const savedPalette = ref<{ templateId: string; name: string; colors: Record<string, string> } | null>(null)
const savedPaletteView = computed(() => {
  const s = savedPalette.value
  if (!s || s.templateId !== activeTemplate.value?.id) return null
  return {
    name: s.name,
    rows: Object.entries(s.colors).map(([k, v]) => ({ label: tokenLabel(k), hex: v }))
  }
})
function paletteTsLine(name: string, colors: Record<string, string>) {
  const inner = Object.entries(colors).map(([k, v]) => `${k}: '${v}'`).join(', ')
  return `{ name: '${name}', colors: { ${inner} } }`
}
const paletteCopied = ref(false)
async function copySavedPalette() {
  const s = savedPalette.value
  if (!s || s.templateId !== activeTemplate.value?.id) return
  try {
    await navigator.clipboard.writeText(paletteTsLine(s.name, s.colors))
    paletteCopied.value = true
    setTimeout(() => paletteCopied.value = false, 2000)
  } catch (err) {
    console.error('复制失败', err)
    toastMine('⚠️ 复制失败：请手动选中上面的内容再复制')
  }
}

const USER_PALETTE_LIMIT = 20
function savePaletteAs() {
  const id = activeTemplate.value?.id
  if (!id || !colorTokenKeys.value.length) return
  const existing = userPalettes.value[id] || []
  if (existing.length >= USER_PALETTE_LIMIT) { toastMine(`⚠️ 每个模板最多存 ${USER_PALETTE_LIMIT} 套变体，先删几套再存`); return }
  const colors: Record<string, string> = {}
  for (const k of colorTokenKeys.value) {
    const v = getTokenVal(`colors.${k}`)
    if (typeof v === 'string') colors[k] = v
  }
  const name = `我的 ${existing.length + 1}`
  userPalettes.value = { ...userPalettes.value, [id]: [...existing, { name, colors }] }
  commitPalettes()
  savedPalette.value = { templateId: id, name, colors: { ...colors } }
}
async function deletePalette(i: number) {
  const id = activeTemplate.value?.id
  if (!id || !userPalettes.value[id]) return
  const name = userPalettes.value[id][i]?.name
  if (!(await askConfirm(`删除配色变体「${name}」？`, '删除后不可恢复；想重存当前配色，点「+ 存为变体」即可', '删除', true))) return
  userPalettes.value = { ...userPalettes.value, [id]: userPalettes.value[id].filter((_, idx) => idx !== i) }
  commitPalettes()
  toastMine(`🗑 变体「${name}」已删除`)
}

const eyeDropperOk = typeof (window as any).EyeDropper === 'function'
async function pickFromScreen(path: string) {
  const ED = (window as any).EyeDropper
  if (!ED) return
  try {
    const r = await new ED().open()
    if (r?.sRGBHex) setToken(path, r.sRGBHex)
  } catch { /* 用户按 Esc 取消 */ }
}
const BASE_FONTS_STACK = 'Helvetica, Arial, sans-serif'
const elementFontGroups = computed(() => buildFontGroups(selectedText.value?.fontFamily))
function handleOverrideUpdate(val: UserOverrides) { overrides.value = val }

// ===== 导出（不受 zoom 影响：捕获的是 canvasRoot，尺寸 = designSize） =====
// ===== 批量出图：一行一条封面 → 按文案槽顺序填词 → 逐张 PNG（复用单张导出管线） =====
async function runBatch(rows: string[][], scale: number) {
  const node = rendererRef.value?.canvasRootRef as HTMLElement | null
  const template = activeTemplate.value
  if (!node || !template || batchBusy.value) return
  const slots = copySlots.value.filter(r => !r.imageSlot)
  if (!slots.length) { toastMine('⚠️ 当前画面没有可填的文案槽'); return }
  batchBusy.value = true
  const baseOverrides = JSON.parse(JSON.stringify(overrides.value))
  const prevSel = selectedIds.value
  selectedIds.value = []
  animationsStopped.value = true
  // 批量刷词不进撤销历史：借用 isRestoring 挡推快照，收尾清掉防抖定时器
  isRestoring = true
  clearTimeout(historyTimer)
  let done = 0
  let lastThumb: string | null = null
  const failed: number[] = []
  const overflowRows: number[] = []
  // 坑位未换图与每行文案无关，循环前查一次即可
  const unreplaced = preexportScan().unreplaced
  const fname = String(template.name || template.id).replace(/[\\/:*?"<>|]/g, '_').trim() || 'cover'
  try {
    for (let i = 0; i < rows.length; i++) {
      batchProgress.value = `第 ${i + 1} / ${rows.length} 张`
      const els = { ...(baseOverrides.elements || {}) }
      rows[i].forEach((cell, k) => {
        // 空段 = 该槽保留模板原文（含用户在文案槽里的手改）：既防 Excel 空列抹掉文案，也防错位
        if (k >= slots.length || !cell) return
        els[slots[k].id] = { ...(els[slots[k].id] || {}), content: cell }
      })
      overrides.value = { ...baseOverrides, elements: els }
      await nextTick()
      if (preexportScan().overflow) overflowRows.push(i + 1)
      const tag = String(rows[i].find(c => c) || '').slice(0, 10).replace(/[\\/:*?"<>|]/g, '_').trim()
      // 导出缓冲 = 宽×高×scale²：大画布 ×3x 会直接把浏览器内存打爆，越界不报错，压到安全倍率并提示
      const es = clampExportScale(designSize.value.w, designSize.value.h, scale)
      if (es.clamped && i === 0) toastMine(`⚠️ 画布较大，${scale}x 会超内存上限，已按 ${es.scale}x 导出这批`)
      try {
        const dataUrl = await exportCover(node, `${fname}-${String(i + 1).padStart(2, '0')}${tag ? '-' + tag : ''}`, {
          format: 'png', scale: es.scale, quality: 1,
          width: designSize.value.w, height: designSize.value.h,
          backgroundColor: displayTemplate.value?.canvas.backgroundColor || '#ffffff'
        })
        if (i === rows.length - 1) lastThumb = await makeThumb(dataUrl)
        done++
      } catch { failed.push(i + 1) }
    }
  } finally {
    overrides.value = baseOverrides
    selectedIds.value = prevSel
    animationsStopped.value = prefs.animPaused
    isRestoring = false
    clearTimeout(historyTimer)
    batchBusy.value = false
    batchProgress.value = ''
    const notes: string[] = []
    if (failed.length) notes.push(`第 ${failed.join('、')} 行失败（可单独重跑那几行）`)
    if (overflowRows.length) notes.push(`第 ${overflowRows.join('、')} 行文字超出自己的盒子`)
    if (unreplaced) notes.push(`${unreplaced} 处图片坑位还是占位图`)
    toastMine(`🧮 已导出 ${done}/${rows.length} 张${notes.length ? '，' + notes.join('；') : ''}`, lastThumb || undefined)
  }
}

// 导出前体检（只提醒不拦截，导出结果不变）：占位图坑位 + 文字超出自己的盒子
function preexportScan() {
  let unreplaced = 0
  let overflow = 0
  for (const el of (displayTemplate.value?.elements || []) as any[]) {
    // 占位 SVG 的指纹 = slotPlaceholder/AI 复刻共用的虚线框；用户换成真图后 src 就不是它了
    if (el.type === 'image' && typeof el.src === 'string' && el.src.includes('stroke-dasharray="12 9"')) unreplaced++
    if (el.type === 'text') {
      const box = document.querySelector<HTMLElement>(`[data-el-id="${CSS.escape(el.id)}"]`)
      const inner = box?.querySelector<HTMLElement>('.element-text')
      if (box && inner && (inner.scrollHeight > box.clientHeight + 2 || inner.scrollWidth > box.clientWidth + 2)) overflow++
    }
  }
  return { unreplaced, overflow }
}
function warnExportScan() {
  const s = preexportScan()
  if (s.unreplaced) toastMine(`⚠️ 体检：${s.unreplaced} 个图片坑位还是灰虚线占位图，成品里会带着「把图放这里」框`)
  if (s.overflow) toastMine(`⚠️ 体检：${s.overflow} 处文字超出了自己的盒子，成品里可能压住别的元素或被裁边`)
}

async function handleExport(options: { format: 'png' | 'jpeg' | 'html'; quality: number; scale: number }) {
  if (!rendererRef.value?.canvasRootRef || !activeTemplate.value) return
  const template = activeTemplate.value
  const isHtml = options.format === 'html'
  const wasStopped = animationsStopped.value
  // 选框/手柄/锁角标渲染在 canvas-root 内部，截图前必须取消选中，否则会被烧进成品
  const prevSel = selectedIds.value
  selectedIds.value = []
  animationsStopped.value = !isHtml
  await nextTick()
  // 文件名跟着文案走：改过文案时取最靠上的那条改过的文字前 10 字（与批量同口径），没改过仍是模板名
  const editedTop = copySlots.value.find(r => r.edited && !r.imageSlot)
  const titleTag = editedTop ? String(editedTop.content).replace(/\s+/g, ' ').slice(0, 10).replace(/[\\/:*?"<>|]/g, '_').trim() : ''
  const fname = titleTag || String(template.name || template.id).replace(/[\\/:*?"<>|]/g, '_').trim() || 'cover'
  exportBusy.value = true
  try {
    if (isHtml) {
      const stats = await exportHtml(rendererRef.value.canvasRootRef, fname, {
        width: designSize.value.w,
        height: designSize.value.h,
        title: template.name
      })
      warnExportScan()
      if (stats && (stats.skippedStylesheets > 0 || stats.failedImages > 0)) {
        const bits = []
        if (stats.skippedStylesheets > 0) bits.push(`${stats.skippedStylesheets} 个样式源未能内嵌`)
        if (stats.failedImages > 0) bits.push(`${stats.failedImages} 张本地图未能内联`)
        toastMine(`⚠️ HTML 已导出，但${bits.join('、')}，离线打开可能缺样式/缺图`)
      } else {
        toastMine(`✅ 已导出 ${fname}.html`)
      }
    } else {
      // 导出缓冲 = 宽×高×scale²：大画布 ×3x 会超浏览器内存上限，越界不报错，压到安全倍率
      const es = clampExportScale(designSize.value.w, designSize.value.h, options.scale)
      if (es.clamped) toastMine(`⚠️ 画布较大，${options.scale}x 会超内存上限，已按 ${es.scale}x 导出`)
      const dataUrl = await exportCover(rendererRef.value.canvasRootRef, fname, {
        format: options.format === 'jpeg' ? 'jpeg' as const : 'png' as const,
        quality: options.quality,
        scale: es.scale,
        width: designSize.value.w,
        height: designSize.value.h,
        backgroundColor: displayTemplate.value?.canvas.backgroundColor || '#ffffff'
      })
      warnExportScan()
      const ext = options.format === 'jpeg' ? 'jpg' : 'png'
      toastMine(`✅ 已导出 ${fname}-${designSize.value.w * es.scale}×${designSize.value.h * es.scale}.${ext}`, (await makeThumb(dataUrl)) || undefined)
    }
  } catch {
    toastMine('❌ 导出失败：可能浏览器拦截了下载或某张图取不到；再点一次「确认导出」试试')
  } finally {
    selectedIds.value = prevSel
    animationsStopped.value = isHtml ? wasStopped : prefs.animPaused
    showExportModal.value = false
    exportBusy.value = false
  }
}

// ===== 键盘 =====
function isTypingTarget(e: KeyboardEvent) {
  const t = e.target as HTMLElement
  return !!t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT' || t.isContentEditable)
}
// 真正在编辑文字的场合（文本框/textarea/富文本）：数字键以外 Ctrl+Z/C/V 等交还原生行为
function isTextEditing(e: KeyboardEvent) {
  const t = e.target as HTMLElement
  if (!t) return false
  if (t.isContentEditable || t.tagName === 'TEXTAREA') return true
  if (t.tagName === 'INPUT') return !['range', 'checkbox', 'radio', 'button', 'color', 'file'].includes((t as HTMLInputElement).type)
  return false
}
function handleKeydown(e: KeyboardEvent) {
  // Esc 先关弹窗，别让「退出专注模式」或无响应把用户困在里面；带输入缓冲的开发者/SVG 窗口不劫持（防丢草稿）
  // 放在打字判断之前：批量弹窗里光标常停在 textarea，Esc 也要能关（E2 对话框自己拦了冒泡，不受影响）
  if (e.key === 'Escape') {
    if (assetHelp.value || svgSizeHelp.value || selectHelp.value || hotkeysOpen.value) { assetHelp.value = false; svgSizeHelp.value = false; selectHelp.value = false; hotkeysOpen.value = false; return }
    if (showRatioDialog.value) { showRatioDialog.value = false; pendingRatio.value = canvasRatio.value; return }
    if (showBatchModal.value) { if (!batchBusy.value) showBatchModal.value = false; return }
    if (showExportModal.value) { if (!exportBusy.value) showExportModal.value = false; return }
  }
  // 输入框内撤销的是文字，画布不抢（range 滑杆除外，拖完仍可 Ctrl+Z 撤销画布）
  if (isTextEditing(e)) return
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z' && !e.shiftKey) { e.preventDefault(); undo(); return }
  if ((e.ctrlKey || e.metaKey) && (e.key.toLowerCase() === 'y' || (e.key.toLowerCase() === 'z' && e.shiftKey))) { e.preventDefault(); redo(); return }
  if (isTypingTarget(e)) return
  if (e.key === 'Tab') {
    // 层级遍历选人（含 inert 层）；弹窗打开时不劫持 Tab，保留原生焦点导航
    if (showDevModal.value || showExportModal.value || showBatchModal.value || showRatioDialog.value || svgEditor.value || assetHelp.value || svgSizeHelp.value || selectHelp.value || hotkeysOpen.value) return
    const ids = tabOrder.value
    if (!ids.length) return
    e.preventDefault()
    const cur = selectedId.value ? ids.indexOf(selectedId.value) : -1
    const next = cur === -1 ? (e.shiftKey ? ids.length - 1 : 0) : (cur + (e.shiftKey ? -1 : 1) + ids.length) % ids.length
    handleSelectElement({ id: ids[next], additive: false })
    return
  }
  // 键盘通道的视图/定位键：都在 isTypingTarget 之后，输入框里打字不会误触
  if (e.key === '/' && !e.ctrlKey && !e.metaKey && !e.altKey) {
    const s = searchInputRef.value
    if (s) { e.preventDefault(); s.focus(); s.select() }
    return
  }
  if ((e.key === '+' || e.key === '=') && !e.ctrlKey && !e.metaKey) { zoom(0.1); return }
  if ((e.key === '-' || e.key === '_') && !e.ctrlKey && !e.metaKey) { zoom(-0.1); return }
  if (e.key === '0' && !e.ctrlKey && !e.metaKey) { canvasScale.value = 1; return }
  if (e.key === '1' && !e.ctrlKey && !e.metaKey) { fitScreen(); return }
  if (e.key.toLowerCase() === 'r' && !e.ctrlKey && !e.metaKey && !e.altKey && !e.shiftKey) { togglePref('rulers'); return }
  if (e.key === '.' && !e.ctrlKey && !e.metaKey && !e.altKey) { setFocusMode(!focusMode.value); return }
  if (e.key === 'Escape' && focusMode.value) { setFocusMode(false); return }
  if ((e.key === 'Delete' || e.key === 'Backspace') && selectedIds.value.length) { e.preventDefault(); deleteSelected(); return }
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'c') { copySelected(); return }
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'v') { pasteClipboard(); return }
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'd') { e.preventDefault(); duplicateSelected(); return }
  if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key) && selectedIds.value.length) {
    e.preventDefault()
    const d = e.shiftKey ? 10 : 2
    const dx = e.key === 'ArrowLeft' ? -d : e.key === 'ArrowRight' ? d : 0
    const dy = e.key === 'ArrowUp' ? -d : e.key === 'ArrowDown' ? d : 0
    nudgeSelected(dx, dy)
  }
}

onMounted(async () => {
  window.addEventListener('keydown', handleKeydown)
  window.addEventListener('resize', onWindowResize)
  window.addEventListener('beforeunload', flushDraftOnUnload)
  document.addEventListener('fullscreenchange', onFullscreenChange)
  const keys = Object.keys(CATEGORY_REGISTRY) as TemplateCategory[]
  for (const key of keys) { templateCache.value[key] = await loadTemplatesByCategory(key) }
  const firstCat = keys[0]
  if (templateCache.value[firstCat]?.length > 0) selectTemplate(templateCache.value[firstCat][0])
  const pending = loadAutosaves()
  if (pending.length) { autosavePrompt.value = pending; autosavePick.value = 0 }
  // 「我的模板」整串读坏时出声：原始串已挪进备份键，别让人在不知情时用一次「另存」把它覆盖掉
  const loadErr = takeUserTemplatesLoadError()
  if (loadErr) {
    const n = peekCorruptBackup()
    toastMine(`⚠️ ${loadErr}。原始内容已备份到本机键 cover-maker.userTemplates.corrupt${n ? `（约 ${Math.round(n / 1024)}KB）` : ''}，先在浏览器控制台用 localStorage.getItem('cover-maker.userTemplates.corrupt') 取出，别急着另存新模板`)
  }
  nextTick(() => fitScreen())
})
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  window.removeEventListener('resize', onWindowResize)
  window.removeEventListener('beforeunload', flushDraftOnUnload)
  document.removeEventListener('fullscreenchange', onFullscreenChange)
  cancelAnimationFrame(resizeRaf)
})
</script>
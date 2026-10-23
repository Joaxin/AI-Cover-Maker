// src/composables/useUserTplBackup.ts
// 「我的模板」文件级备份：单张/整库导出 JSON、从文件导入恢复（清浏览器数据不等于全丢）。
// 列表 ref 由 App 持有并注入——这里只管文件进出，不碰画布状态。
import { ref, type Ref } from 'vue'
import type { Template } from '@/types/types'
import { downloadTextFile, parseTemplateBatch } from '../utils/templateIO'
import { saveUserTemplates, uniqueUserId, USER_TPL_LIMIT } from '../utils/userTemplates'

export interface UserTplBackupApi {
  importUserTplFileInput: Ref<HTMLInputElement | null>
  exportUserTemplateJson: (t: Template) => void
  exportAllUserTemplates: () => void
  onImportUserTplFile: (e: Event) => void
}

export function useUserTplBackup(deps: {
  userTemplates: Ref<Template[]>
  userSectionOpen: Ref<boolean>
  userTplIds: () => Set<string>
  notify: (msg: string) => void
}): UserTplBackupApi {
  const importUserTplFileInput = ref<HTMLInputElement | null>(null)
  function tplFilename(t: Template) { return String(t.id || t.name).replace(/[\\/:*?"<>|]/g, '_').trim() || 'template' }

  function exportUserTemplateJson(t: Template) {
    downloadTextFile(`${tplFilename(t)}.json`, JSON.stringify(t, null, 2))
    deps.notify('⬇ 已导出 JSON，收好这份文件就是备份')
  }

  function exportAllUserTemplates() {
    if (!deps.userTemplates.value.length) return
    downloadTextFile(`我的模板-备份-${deps.userTemplates.value.length}个.json`, JSON.stringify(deps.userTemplates.value, null, 2))
    deps.notify(`⬇ 已导出全部 ${deps.userTemplates.value.length} 个模板的 JSON 备份`)
  }

  function onImportUserTplFile(e: Event) {
    const input = e.target as HTMLInputElement
    const f = input.files?.[0]
    if (!f) return
    const reader = new FileReader()
    reader.onload = () => {
      input.value = ''
      const res = parseTemplateBatch(String(reader.result ?? ''))
      if (!res.success) { deps.notify(`⚠️ 导入失败：${res.errors[0]}`); return }
      const taken = deps.userTplIds()
      const room = USER_TPL_LIMIT - deps.userTemplates.value.length
      if (room <= 0) { deps.notify(`⚠️ 「我的模板」已满 ${USER_TPL_LIMIT} 个，先删几个再导入`); return }
      const accepted: Template[] = []
      for (const t of res.data.slice(0, room)) {
        const id = uniqueUserId(t.id, taken)
        taken.add(id)
        accepted.push({ ...t, id, tags: [...new Set([...(t.tags || []), '我的模板'])] })
      }
      const saved = saveUserTemplates([...deps.userTemplates.value, ...accepted])
      if (!saved.ok) { deps.notify(`⚠️ ${saved.msg}`); return }
      deps.userTemplates.value.push(...accepted)
      deps.userSectionOpen.value = true
      if (saved.msg) { deps.notify(saved.msg); return }
      const dropped = res.data.length - accepted.length
      deps.notify(`✅ 已导入 ${accepted.length} 个${dropped > 0 ? `（${dropped} 个因超出上限没进，先删几个再导入）` : ''}`)
    }
    reader.onerror = () => { input.value = ''; deps.notify('⚠️ 文件读取失败') }
    reader.readAsText(f)
  }

  return { importUserTplFileInput, exportUserTemplateJson, exportAllUserTemplates, onImportUserTplFile }
}

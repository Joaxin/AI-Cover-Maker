#!/usr/bin/env node
/**
 * scripts/save-user-tpl-backup.mjs — 「我的模板」备份收进入库（git 背着这份数据）
 *
 * 为什么需要它：
 *   用户自建模板只存在浏览器 localStorage（cover-maker.userTemplates），
 *   清浏览器数据/换机器即全丢。App 内「全部导出」能下 JSON，但文件躺在
 *   下载文件夹里，跟仓库无关。本脚本把导出的 JSON 校验后收进
 *   backups/user-templates/（进 git），让这最后一处「数据只有一份」消失。
 *
 * 做什么：
 *   1. 读入指定 JSON（单对象或数组均可，与 App 导入契约一致）
 *   2. 轻量校验：是数组、每项有 id/elements、元素有 id/type、id 不重复
 *      —— 拦下「存成 .json 的网页错误页 / 截断的半截文件」再进仓库
 *   3. 内容去重：与已有备份逐字节相同就不重复落盘（避免每次导出都刷 commit）
 *   4. 落盘 backups/user-templates/user-templates-<时间戳>-<N>个.json
 *
 * 用法：
 *   npm run 收模板备份 -- <导出.json>      # 校验后收进仓库 backups/
 *   node scripts/save-user-tpl-backup.mjs <导出.json>
 *
 * 恢复：App 左侧「⭐ 我的模板 → 导入」选仓库里任意一份备份 JSON 即可。
 */
import { createHash } from 'node:crypto'
import { readFileSync, writeFileSync, existsSync, readdirSync, mkdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const BAK_DIR = path.join(ROOT, 'backups', 'user-templates')

const log = (...a) => console.log('[收备份]', ...a)
const fail = (...a) => { console.error('[收备份][失败]', ...a); process.exitCode = 1 }

const arg = process.argv.slice(2).find(a => !a.startsWith('--'))
if (!arg) {
  log('用法：npm run 收模板备份 -- <App 里「全部导出」得到的 .json>')
  process.exit(1)
}
const src = path.resolve(arg)
if (!existsSync(src)) { fail(`文件不存在：${src}`); process.exit(1) }

let text
try {
  text = readFileSync(src, 'utf8')
} catch (e) {
  fail(`读不了：${e.message}`)
}

let data
try {
  data = JSON.parse(text)
} catch (e) {
  fail(`不是合法 JSON（可能是存错的网页/截断的半截文件）：${e.message}`)
  process.exit(1)
}

const list = Array.isArray(data) ? data : [data]
const problems = []
const seen = new Set()
list.forEach((t, i) => {
  const at = `第 ${i + 1} 个模板`
  if (!t || typeof t !== 'object') { problems.push(`${at}：不是对象`); return }
  if (typeof t.id !== 'string' || !t.id) { problems.push(`${at}：缺 id`); return }
  if (seen.has(t.id)) problems.push(`${at}：id「${t.id}」在文件里重复`)
  seen.add(t.id)
  if (!Array.isArray(t.elements)) { problems.push(`${at}（${t.id}）：缺 elements 数组`); return }
  t.elements.forEach((el, j) => {
    if (!el || typeof el !== 'object' || typeof el.id !== 'string' || typeof el.type !== 'string') {
      problems.push(`${at}（${t.id}）第 ${j + 1} 个元素：缺 id/type`)
    }
  })
})

if (problems.length) {
  fail('校验未过，没有入库：')
  for (const p of problems.slice(0, 10)) console.error('   -', p)
  if (problems.length > 10) console.error(`   ...共 ${problems.length} 处`)
  process.exit(1)
}

// 内容去重：逐字节相同视为同一份备份
const hash = createHash('sha1').update(text).digest('hex')
if (existsSync(BAK_DIR)) {
  for (const f of readdirSync(BAK_DIR)) {
    if (!f.endsWith('.json')) continue
    try {
      if (createHash('sha1').update(readFileSync(path.join(BAK_DIR, f), 'utf8')).digest('hex') === hash) {
        log(`内容与已有备份 ${f} 完全一致，未新增（要强制入库就先删掉它）`)
        process.exit(0)
      }
    } catch { /* 读不了的文件跳过，不影响主流程 */ }
  }
}

const d = new Date()
const p = (n) => String(n).padStart(2, '0')
const stamp = `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}-${p(d.getHours())}${p(d.getMinutes())}${p(d.getSeconds())}`
const name = `user-templates-${stamp}-${list.length}个.json`
mkdirSync(BAK_DIR, { recursive: true })
writeFileSync(path.join(BAK_DIR, name), text)
log(`✅ 已入库 ${list.length} 个模板 → backups/user-templates/${name}`)
log('下一步：git add backups/ && git commit -m "备份：我的模板 N 个"')
log('恢复：App 左侧「⭐ 我的模板 → 导入」选这份 JSON')

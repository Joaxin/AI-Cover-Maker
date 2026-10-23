// vite.config.ts
import fs from 'node:fs'
import path from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import type { IncomingMessage, ServerResponse } from 'node:http'

// ===== dev-only 素材落盘：把上传的本地图按分类写进 public/images/<分类>/ =====
// 浏览器沙箱不能写盘，所以写盘交给跑在 Node 里的 dev server；vite build 产物不含这段。
const IMAGES_ROOT = path.resolve(process.cwd(), 'public/images')
const ASSET_PREFIX = '/__cover-assets'
const MAX_BYTES = 25 * 1024 * 1024
const CAT_RE = /^[A-Za-z0-9][A-Za-z0-9_-]{0,31}$/
const MIME_EXT: Record<string, string> = {
  'image/png': 'png', 'image/jpeg': 'jpg', 'image/jpg': 'jpg', 'image/webp': 'webp',
  'image/gif': 'gif', 'image/svg+xml': 'svg', 'image/avif': 'avif', 'image/bmp': 'bmp'
}
const IMG_EXTS = new Set(Object.values(MIME_EXT))
const MAX_GROUPS = 40
const MAX_FILES_PER_GROUP = 80

// 扩展名只认请求头里的真实 mime，不信文件名；其余字符一律下划线，杜绝 ../ 与路径分隔符
function cleanName(raw: string, ext: string) {
  let s = path.basename(String(raw || ''))
  s = s.replace(/\.[A-Za-z0-9]{1,5}$/, '')
  s = s.replace(/[^\w\u4e00-\u9fff. -]/g, '_').replace(/^[ .]+/, '').trim().slice(0, 60)
  return `${s || 'image'}.${ext}`
}

function uniqueFile(dir: string, wanted: string, ext: string) {
  if (!fs.existsSync(path.join(dir, wanted))) return wanted
  const base = wanted.replace(/\.[A-Za-z0-9]{1,5}$/, '')
  for (let i = 2; i <= 200; i++) {
    const candidate = `${base}-${i}.${ext}`
    if (!fs.existsSync(path.join(dir, candidate))) return candidate
  }
  throw new Error('同名素材过多')
}

function readBody(req: IncomingMessage): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = []
    let size = 0
    req.on('data', (c: Buffer) => {
      size += c.length
      if (size > MAX_BYTES) { reject(new Error('too-large')); req.destroy() ; return }
      chunks.push(c)
    })
    req.on('end', () => resolve(Buffer.concat(chunks)))
    req.on('error', reject)
  })
}

function sendJson(res: ServerResponse, code: number, obj: unknown) {
  res.statusCode = code
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.end(JSON.stringify(obj))
}

// 远程 URL 落盘：由 Node 侧抓取（无浏览器 CORS 限制），只认 http(s)，限 25MB / 30s
async function fetchRemoteImage(raw: string): Promise<{ body: Buffer; ext: string }> {
  const target = new URL(raw)
  if (target.protocol !== 'http:' && target.protocol !== 'https:') throw new Error('只支持 http/https 地址')
  const r = await fetch(target, { signal: AbortSignal.timeout(30_000), redirect: 'follow' })
  if (!r.ok) throw new Error(`远程返回 ${r.status}`)
  const mime = String(r.headers.get('content-type') || '').split(';')[0].trim().toLowerCase()
  let ext = MIME_EXT[mime]
  if (!ext) {
    const urlExt = path.extname(target.pathname).slice(1).toLowerCase()
    if (urlExt === 'jpeg') ext = 'jpg'
    else if (IMG_EXTS.has(urlExt)) ext = urlExt
    if (!ext) throw new Error('对方没给出可识别的图片类型（png/jpeg/webp/gif/svg/avif/bmp）')
  }
  const reader = r.body?.getReader()
  if (!reader) throw new Error('响应没有内容')
  const chunks: Buffer[] = []
  let size = 0
  for (;;) {
    const { done, value } = await reader.read()
    if (done) break
    size += value.byteLength
    if (size > MAX_BYTES) { reader.cancel(); throw new Error('too-large') }
    chunks.push(Buffer.from(value))
  }
  const body = Buffer.concat(chunks)
  if (!body.length) throw new Error('远程文件为空')
  return { body, ext }
}

type AssetFile = { name: string; url: string; size: number }
type StattedFile = AssetFile & { at: number }

function listDir(category: string, absDir: string): AssetFile[] {
  const urlBase = `/images/${category ? `${category}/` : ''}`
  return fs.readdirSync(absDir, { withFileTypes: true })
    .filter(d => d.isFile() && IMG_EXTS.has(path.extname(d.name).slice(1).toLowerCase()))
    .map((d): StattedFile => {
      const abs = path.join(absDir, d.name)
      const st = fs.statSync(abs)
      return { name: d.name, url: encodeURI(`${urlBase}${d.name}`), size: st.size, at: st.mtimeMs }
    })
    .sort((a, b) => b.at - a.at)
    .slice(0, MAX_FILES_PER_GROUP)
    .map(({ name, url, size }) => ({ name, url, size }))
}

function listGroups() {
  if (!fs.existsSync(IMAGES_ROOT)) return []
  const out: { category: string; files: AssetFile[] }[] = []
  const loose = listDir('', IMAGES_ROOT)
  if (loose.length) out.push({ category: '', files: loose })
  for (const d of fs.readdirSync(IMAGES_ROOT, { withFileTypes: true })) {
    if (out.length >= MAX_GROUPS) break
    if (!d.isDirectory() || !CAT_RE.test(d.name)) continue
    const files = listDir(d.name, path.join(IMAGES_ROOT, d.name))
    if (files.length) out.push({ category: d.name, files })
  }
  return out
}

function devAssets(): Plugin {
  return {
    name: 'cover-dev-assets',
    configureServer(server) {
      server.middlewares.use(ASSET_PREFIX, async (req, res, next) => {
        if (req.method === 'OPTIONS') {
          res.setHeader('Access-Control-Allow-Origin', '*')
          res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
          res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
          res.statusCode = 204
          res.end()
          return
        }
        try {
          if (req.method === 'GET') { sendJson(res, 200, { ok: true, groups: listGroups() }); return }
          if (req.method !== 'POST') { next(); return }
          const query = new URL(req.url || '/', 'http://cover.local').searchParams
          const remote = String(query.get('url') || '').trim()
          let body: Buffer
          let ext: string
          if (remote) {
            readBody(req).catch(() => {}) // 丢弃请求体，避免连接挂起
            const got = await fetchRemoteImage(remote)
            body = got.body
            ext = got.ext
          } else {
            ext = MIME_EXT[String(req.headers['content-type'] || '').split(';')[0].trim().toLowerCase()]
            if (!ext) { sendJson(res, 415, { ok: false, error: '只接受 png/jpeg/webp/gif/svg/avif/bmp' }); return }
            body = await readBody(req)
          }
          if (!body.length) { sendJson(res, 400, { ok: false, error: '空文件' }); return }
          const category = String(query.get('category') || 'misc').trim()
          if (!CAT_RE.test(category)) { sendJson(res, 400, { ok: false, error: `分类名不合法：只能用字母、数字、-、_` }); return }
          const dir = path.join(IMAGES_ROOT, category)
          if (!path.resolve(dir).startsWith(IMAGES_ROOT + path.sep)) { sendJson(res, 400, { ok: false, error: '越界路径' }); return }
          fs.mkdirSync(dir, { recursive: true })
          const wanted = remote
            ? cleanName(path.basename(new URL(remote).pathname) || 'image', ext)
            : cleanName(String(query.get('name') || ''), ext)
          const name = uniqueFile(dir, wanted, ext)
          const abs = path.join(dir, name)
          fs.writeFileSync(abs, body)
          sendJson(res, 200, { ok: true, category, name, url: encodeURI(`/images/${category}/${name}`), size: body.length })
        } catch (err) {
          const msg = (err as Error).message
          sendJson(res, msg === 'too-large' ? 413 : 500, { ok: false, error: msg === 'too-large' ? '超过 25MB 上限' : msg })
        }
      })
    }
  }
}

export default defineConfig(({ command }) => ({
  // tsconfig 里有 paths "@/*"，但 dev server 不读 tsconfig：不配别名时运行时 `@/` import 只在 build 能过，dev 直接 500
  resolve: { alias: { '@': path.resolve(process.cwd(), 'src') } },
  plugins: [
    vue(),
    tailwindcss(),
    ...(command === 'serve' ? [devAssets()] : []),
  ],
  server: { port: 3000 },
}))

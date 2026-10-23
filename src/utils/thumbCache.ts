// src/utils/thumbCache.ts —— 真实渲染缩略图的持久化缓存（IndexedDB）
//
// 为什么单独用 IndexedDB：项目已有 5 个 localStorage key 共享同一 5MB 池（prefs / 我的模板 /
// 草稿箱等），400+ 张缩略图塞进去必然挤爆「我的模板」的存储空间。IndexedDB 是独立配额，
// 且存的是 data URL 字符串，读写都很轻。
// 任何一步失败（无痕模式 / 配额 / 隐私设置）都必须静默降级——缩略图只是加速层，
// 拿不到就回落到模板自带的手绘 SVG，绝不能影响主流程。

const DB_NAME = 'cover-maker-thumbs'
const STORE = 'thumbs'
const DB_VERSION = 1

let dbPromise: Promise<IDBDatabase | null> | null = null

function openDb(): Promise<IDBDatabase | null> {
  if (dbPromise) return dbPromise
  dbPromise = new Promise<IDBDatabase | null>((resolve) => {
    if (typeof indexedDB === 'undefined') { resolve(null); return }
    let req: IDBOpenDBRequest
    try { req = indexedDB.open(DB_NAME, DB_VERSION) } catch { resolve(null); return }
    req.onupgradeneeded = () => {
      const db = req.result
      if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE)
    }
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => resolve(null)
    req.onblocked = () => resolve(null)
  })
  return dbPromise
}

// 内存层：同一张卡片会被反复求值（滚动、筛选、重渲染），每次都回 IDB 太浪费
const memory = new Map<string, string>()
const inflightReads = new Map<string, Promise<string | null>>()

/** 同步探一下内存层（非响应式，仅供首次渲染兜底） */
export function peekThumb(id: string): string | undefined {
  return memory.get(id)
}

export async function getThumb(id: string): Promise<string | null> {
  const hit = memory.get(id)
  if (hit) return hit
  const pending = inflightReads.get(id)
  if (pending) return pending
  const p = (async () => {
    const db = await openDb()
    if (!db) return null
    try {
      const value = await new Promise<string | null>((resolve) => {
        const tx = db.transaction(STORE, 'readonly')
        const rq = tx.objectStore(STORE).get(id)
        rq.onsuccess = () => resolve(typeof rq.result === 'string' ? rq.result : null)
        rq.onerror = () => resolve(null)
      })
      if (value) memory.set(id, value)
      return value
    } catch {
      return null
    } finally {
      inflightReads.delete(id)
    }
  })()
  inflightReads.set(id, p)
  return p
}

export async function putThumb(id: string, dataUrl: string): Promise<void> {
  memory.set(id, dataUrl)
  const db = await openDb()
  if (!db) return
  try {
    await new Promise<void>((resolve) => {
      const tx = db.transaction(STORE, 'readwrite')
      tx.objectStore(STORE).put(dataUrl, id)
      tx.oncomplete = () => resolve()
      tx.onerror = () => resolve()
      tx.onabort = () => resolve()
    })
  } catch {
    // 写失败不影响本次显示（内存层已有），下次进入会重新生成
  }
}

export async function clearThumbs(): Promise<void> {
  memory.clear()
  const db = await openDb()
  if (!db) return
  try {
    await new Promise<void>((resolve) => {
      const tx = db.transaction(STORE, 'readwrite')
      tx.objectStore(STORE).clear()
      tx.oncomplete = () => resolve()
      tx.onerror = () => resolve()
      tx.onabort = () => resolve()
    })
  } catch {
    // ignore
  }
}

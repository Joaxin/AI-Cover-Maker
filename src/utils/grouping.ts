// src/utils/grouping.ts —— 「一个视觉单元拆成 N 个元素」的编组解析
//
// 背景：条码、齿孔、刻度、网格线这类装饰，在 Design JSON 里是 N 个独立元素，
// 但在用户眼里是「一个东西」。逐个点选/拖动非常难受，必须整组走。
//
// 两级策略：
//   ① 显式 group（模板里写了 group: 'barcode'）—— 权威，永远生效，哪怕只有 2 个成员。
//   ② 隐式按 id 前缀推断 —— 兜底，覆盖没写 group 的历史模板。
//      只在「同前缀 + 纯装饰（shape/image、不可编辑、未锁定）+ 成员 ≥ 3」时成立。
//      卡 ≥3 是为了不把「左右各一个凹口」这类成对但各自独立的装饰误并成一组。
//
// 想让某个元素从自动编组里脱离：给它显式一个独立 group，或改个不与同类同前缀的 id。
const NUM_SUFFIX = /[-_]?\d+$/

/** 取 id 前缀：'barcode-2' → 'barcode'，'et-perf-11' → 'et-perf'，'dot' → 'dot' */
export function idPrefix(id: string): string {
  const s = String(id ?? '')
  const cut = s.replace(NUM_SUFFIX, '')
  return cut || s
}

/** 只有纯装饰才参与隐式编组：带文字/可编辑的东西是内容，用户就是要单独改。
 *  overlay 也算：散石/三角片这类碎屑常用 overlay 承载（渐变/纹理能力），
 *  全屏大底 overlay 的 id 通常唯一（vignette/grain），前缀计数到不了 ≥3，不会被误并。 */
export function groupable(el: any): boolean {
  return (el?.type === 'shape' || el?.type === 'image' || el?.type === 'overlay') && !el?.editable && !el?.locked
}

/**
 * 建立 id → 组名 的索引。同一组 = 同一选择/拖动/删除单位。
 * 显式 group 优先；隐式前缀只在成员数 ≥ 3 时成组。
 */
export function buildGroups(elements: any[] | undefined): Map<string, string> {
  const out = new Map<string, string>()
  if (!Array.isArray(elements)) return out
  const counts = new Map<string, number>()
  for (const el of elements) {
    if (!el) continue
    if (el.group) { counts.set(el.group, (counts.get(el.group) || 0) + 1); continue }
    if (!groupable(el)) continue
    const k = idPrefix(el.id)
    if (k) counts.set(k, (counts.get(k) || 0) + 1)
  }
  for (const el of elements) {
    if (!el) continue
    if (el.group) { out.set(el.id, el.group); continue }
    if (!groupable(el)) continue
    const k = idPrefix(el.id)
    if (k && (counts.get(k) || 0) >= 3) out.set(el.id, k)
  }
  return out
}

/** 取某元素所属组名（无组返回 null） */
export function groupOf(index: Map<string, string>, id: string): string | null {
  return index.get(id) ?? null
}

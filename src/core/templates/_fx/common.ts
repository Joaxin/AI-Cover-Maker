// src/core/templates/_fx/common.ts
// 模板批量生产期的通用小件：新模板请直接从这里 import，不要在模板文件里再复制一份。
// 两种 seeded 序列不同、返回域不同（整数 / 0..1），不可互换——按同文件历史用法选别名。

/** LCG，返回 0..0x7fffffff 的整数 */
export function seededInt(seed: number) { let x = seed; return () => { x = (x * 1103515245 + 12345) & 0x7fffffff; return x } }

/** 经典 Numeric Recipes LCG，返回 [0,1) 小数 */
export function seeded01(seed: number) { let s = (seed % 233280 + 233280) % 233280; return () => { s = (s * 9301 + 49297) % 233280; return s / 233280 } }

/** 包成 data:image/svg+xml（带 viewBox，绝大多数模板用这个） */
export function svgUri(inner: string, w: number, h: number) {
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${inner}</svg>`
}

/** 同上，不带 viewBox（仅 acg-extra 的历史形态，新模板勿用） */
export function svgUriNoVb(inner: string, w: number, h: number) {
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">${inner}</svg>`
}

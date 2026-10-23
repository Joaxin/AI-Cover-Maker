// 把导出产出的大图 dataURL 缩成小拇指图（jpeg dataURL），供「导出成功」toast 眼见为实。
// 失败一律返回 null——toast 退化为纯文字，绝不让缩略图把导出流程带崩。
export async function makeThumb(src: string, maxSide = 96): Promise<string | null> {
  try {
    const img = new Image()
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve()
      img.onerror = () => reject(new Error('thumb load failed'))
      img.src = src
    })
    const w = img.naturalWidth
    const h = img.naturalHeight
    if (!w || !h) return null
    const s = Math.min(maxSide / w, maxSide / h, 1)
    const c = document.createElement('canvas')
    c.width = Math.max(1, Math.round(w * s))
    c.height = Math.max(1, Math.round(h * s))
    const ctx = c.getContext('2d')
    if (!ctx) return null
    ctx.fillStyle = '#ffffff' // 防透明区在 jpeg 里变黑
    ctx.fillRect(0, 0, c.width, c.height)
    ctx.drawImage(img, 0, 0, c.width, c.height)
    return c.toDataURL('image/jpeg', 0.72)
  } catch {
    return null
  }
}

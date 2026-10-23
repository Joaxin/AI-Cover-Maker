// src/core/templates/knowledge/_decor.ts
// 科技/科普底纹（透明叠加，铺在 backgroundColor token 之上，切换预设时随底色自然变化）
// 约定：数据 URI 内仅把 # 编码为 %23；描边统一使用 rgba(...)，在深色/中饱和底上都能低对比呈现。

export const gridBg = (w: number, h: number, gap = 50, stroke = 'rgba(255,255,255,0.055)') =>
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '">'
  + Array.from({ length: Math.floor(w / gap) + 1 }, (_, i) => `<line x1="${i * gap}" y1="0" x2="${i * gap}" y2="${h}"/>`).join('')
  + Array.from({ length: Math.floor(h / gap) + 1 }, (_, i) => `<line x1="0" y1="${i * gap}" x2="${w}" y2="${i * gap}"/>`).join('')
  + '</svg>'

export const dotsBg = (w: number, h: number, gap = 46, fill = 'rgba(255,255,255,0.10)') => {
  let cells = ''
  for (let y = gap; y < h; y += gap)
    for (let x = gap; x < w; x += gap)
      cells += `<circle cx="${x}" cy="${y}" r="2.2" fill="${fill}"/>`
  return 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '">' + cells + '</svg>'
}

export const plusBg = (w: number, h: number, gap = 72, stroke = 'rgba(255,255,255,0.09)') => {
  let plus = ''
  for (let y = gap; y < h; y += gap)
    for (let x = gap; x < w; x += gap)
      plus += `<path d="M${x - 6} ${y} H${x + 6} M${x} ${y - 6} V${y + 6}" stroke="${stroke}" stroke-width="1.4" fill="none"/>`
  return 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '">' + plus + '</svg>'
}

// 斜向细线（工程图纸感）
export const hatchBg = (w: number, h: number, gap = 18, stroke = 'rgba(255,255,255,0.05)') => {
  let lines = ''
  for (let x = -h; x < w; x += gap)
    lines += `<line x1="${x}" y1="${h}" x2="${x + h}" y2="0"/>`
  return 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '"><g stroke="' + stroke + '" stroke-width="1">' + lines + '</g></svg>'
}

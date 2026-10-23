// src/core/templates/acg/_decor.ts —— 二次元装饰素材（原创 SVG 母题，仅导出字符串，不注册为模板）

// 樱花花瓣
export const SAKURA_PETAL = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"><path d="M30 4 C 44 12, 50 30, 33 50 C 30 53, 30 46, 27 50 C 10 30, 16 12, 30 4 Z" fill="%23fbcfe8" stroke="%23f9a8d4" stroke-width="1.5"/></svg>'
// 二次元网点（半调圆点）
export const HALFTONE = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><pattern id="ht" width="14" height="14" patternUnits="userSpaceOnUse"><circle cx="7" cy="7" r="3" fill="%23000000"/></pattern><rect width="40" height="40" fill="url(%23ht)" opacity="0.5"/></svg>'
// 放射状速度线（漫画集中线）
export const SPEED_LINES = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000" viewBox="0 0 1000 1000"><g stroke="%23111111" stroke-width="3" opacity="0.55">'
  + Array.from({ length: 60 }, (_, i) => { const a = (i / 60) * Math.PI * 2; const r1 = 190 + (i % 3) * 22; const r2 = 720; return `<line x1="${(500 + r1 * Math.cos(a)).toFixed(1)}" y1="${(500 + r1 * Math.sin(a)).toFixed(1)}" x2="${(500 + r2 * Math.cos(a)).toFixed(1)}" y2="${(500 + r2 * Math.sin(a)).toFixed(1)}"/>`; }).join('')
  + '</g></svg>'
// 可爱四角星闪光
export const SPARKLE4 = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"><path d="M30 2 L36 24 L58 30 L36 36 L30 58 L24 36 L2 30 L24 24 Z" fill="%23fef08a" stroke="%23facc15" stroke-width="1.5"/></svg>'
// 卡通爱心
export const HEART = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"><path d="M30 52 C 6 34, 10 12, 24 16 C 29 18, 30 24, 30 24 C 30 24, 31 18, 36 16 C 50 12, 54 34, 30 52 Z" fill="%23fb7185" stroke="%23e11d48" stroke-width="2"/></svg>'
// 呆萌云朵
export const CLOUD = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="110" viewBox="0 0 200 110"><path d="M40 90 C 12 90, 12 56, 40 56 C 42 30, 82 24, 92 46 C 110 30, 150 38, 150 62 C 182 60, 188 90, 160 92 Z" fill="%23ffffff" opacity="0.92"/></svg>'
// 对话气泡（漫画）
export const SPEECH_BUBBLE = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="260" height="180" viewBox="0 0 260 180"><path d="M20 12 H240 A16 16 0 0 1 256 28 V110 A16 16 0 0 1 240 126 H120 L70 168 L82 126 H20 A16 16 0 0 1 4 110 V28 A16 16 0 0 1 20 12 Z" fill="%23ffffff" stroke="%23111111" stroke-width="5"/></svg>'
// 漫画分格边框
export const PANEL_BORDER = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000"><rect x="24" y="24" width="952" height="952" fill="none" stroke="%23111111" stroke-width="12"/></svg>'

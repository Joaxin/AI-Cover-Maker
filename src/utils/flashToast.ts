// 一行式全局提示：贴在屏幕底部居中，z 高于所有弹窗，2.6 秒自动消失。
// 用于弹窗内部够不到 App 的 mineToast 的场合（如 DeveloperModal 的复制失败）。
export function flashToast(msg: string, ms = 2600) {
  const div = document.createElement('div')
  div.textContent = msg
  div.style.cssText = [
    'position:fixed;left:50%;bottom:48px;transform:translateX(-50%)',
    'z-index:99999',
    'background:rgba(31,41,55,.97);border:1px solid #4b5563;border-radius:8px',
    'color:#e5e7eb;font-size:12px;padding:8px 16px;white-space:nowrap',
    'box-shadow:0 10px 25px rgba(0,0,0,.5);pointer-events:none'
  ].join(';')
  document.body.appendChild(div)
  setTimeout(() => div.remove(), ms)
}

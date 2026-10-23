// src/utils/importContract.ts —— AI 导入契约：版本行 + 修复提示词。
// 提示词导出（App 复刻 / 修复回路）与导入校验（templateIO.parseTemplateJson）共用这一份定义，两侧永不漂移。
export const CONTRACT_TOOL = 'cover-maker'
export const CONTRACT_VERSION = 1
export const CONTRACT_HEADER = `#import-contract: ${CONTRACT_TOOL}/${CONTRACT_VERSION}`

const HEADER_RE = /^#import-contract:\s*([\w.-]+)\/(\d+)\s*$/

/** 去掉契约头行并核对归属/版本。无契约行 = 旧输入或手贴 JSON，原样放行（向后兼容）。 */
export function stripContractHeader(text: string): { body: string; error?: string } {
  const lines = text.split('\n')
  const first = lines.findIndex(l => l.trim())
  if (first === -1) return { body: text }
  const m = lines[first].trim().replace(/^\uFEFF/, '').match(HEADER_RE)
  if (!m) return { body: text }
  const [, tool, ver] = m
  if (tool !== CONTRACT_TOOL) return { body: text, error: `契约工具不匹配：「${tool}」，本工具是「${CONTRACT_TOOL}」，请重新复制本工具的提示词` }
  if (Number(ver) !== CONTRACT_VERSION) return { body: text, error: `契约版本不匹配：贴回内容是 v${ver}，本工具是 v${CONTRACT_VERSION}，请重新复制提示词让 AI 按新契约重生成` }
  return { body: [...lines.slice(0, first), ...lines.slice(first + 1)].join('\n') }
}

/** 修复提示词：机器可读失败原因 + 上次产出原文，粘回同一个 AI 对话修一次（从原始输入修，不做 AI→AI 链式修复） */
export function buildRepairPrompt(errors: string[], pasted: string): string {
  const src = pasted.length > 500_000
    ? pasted.slice(0, 500_000) + '\n…（过长截断于此，以你上次发送的完整内容为准）'
    : pasted.trim()
  return [
    '你刚才生成的内容在封面设计工具「cover-maker」导入时校验失败，请修正后重新输出。',
    '',
    '失败原因（逐条）：',
    ...errors.map((e, i) => `${i + 1}. ${e}`),
    '',
    '输出要求：',
    `1. 第一行原样输出 ${CONTRACT_HEADER}`,
    '2. 之后只输出修正后的完整模板 JSON 对象，不要用 markdown 代码围栏，不要任何解释文字。',
    '3. 只针对上述失败原因做最小修正；其余结构、id、坐标、文案一律原样保留，禁止用省略号截断。',
    '',
    '你上次的完整产出（修复依据）：',
    src,
  ].join('\n')
}

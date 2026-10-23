// src/core/index.ts
import type { Template, TemplateCategory } from '@/types/types'

export const CATEGORY_REGISTRY: Record<TemplateCategory, { name: string }> = {
  minimal:   { name: '极简黑白' }, simple:    { name: '简约风' },
  emotional: { name: '情感文案风' }, knowledge: { name: '知识科普' },
  business:  { name: '商务风' }, tech:      { name: '科技风' },
  magazine:  { name: '杂志风' }, chinese:   { name: '中国风' },
  cute:      { name: '可爱风' }, handdrawn: { name: '手绘风' },
  cyberpunk: { name: '赛博朋克' }, scifi:     { name: '科幻风' },
  pixel:     { name: '像素风' }, quotes:    { name: '金句语录' },
  acg:       { name: '二次元' }, academic:  { name: '学术' },
  retro:     { name: '复古风' }, art:       { name: '艺术风' },
  nature:    { name: '自然风' },
  food:      { name: '美食·餐饮' }, sport:   { name: '运动·健身' },
  festival:  { name: '节日·节气' }, course:  { name: '教育·课程' },
  video:     { name: '视频封面' },
  sale:      { name: '促销·电商' }, film:  { name: '影视·剧集' }, event: { name: '活动·公告' },
  health:    { name: '健康·养生' }, parenting: { name: '母婴·亲子' }, pet: { name: '宠物·萌宠' },
  finance:   { name: '财经·理财' },
  game:      { name: '游戏·电竞' }, music: { name: '音乐·MV' }, travel: { name: '旅行·旅拍' },
}

export function getCategories() {
  return (Object.keys(CATEGORY_REGISTRY) as TemplateCategory[]).map((id) => ({
    id, name: CATEGORY_REGISTRY[id].name,
  }))
}

// 展示层的大分类分组（模板数据不变，只在侧栏两级折叠）
export const CATEGORY_GROUPS: Array<{ id: string; name: string; categories: TemplateCategory[] }> = [
  { id: 'letters',   name: '文字与情感', categories: ['minimal', 'simple', 'emotional', 'quotes', 'handdrawn', 'cute', 'music'] },
  { id: 'knowledge', name: '知识与商务', categories: ['knowledge', 'course', 'academic', 'business', 'magazine', 'video', 'sale', 'event', 'finance'] },
  { id: 'lifestyle', name: '生活方式', categories: ['food', 'sport', 'festival', 'film', 'health', 'parenting', 'pet', 'travel'] },
  { id: 'tech',      name: '科技与幻想', categories: ['tech', 'cyberpunk', 'scifi', 'pixel', 'acg', 'game'] },
  { id: 'humanities', name: '人文与自然', categories: ['chinese', 'retro', 'art', 'nature'] },
]

export function getCategoryGroups() {
  const used = new Set<TemplateCategory>(CATEGORY_GROUPS.flatMap(g => g.categories))
  const groups = CATEGORY_GROUPS
    .map(g => ({
      id: g.id, name: g.name,
      categories: g.categories.filter(c => c in CATEGORY_REGISTRY).map(c => ({ id: c, name: CATEGORY_REGISTRY[c].name })),
    }))
    .filter(g => g.categories.length)
  const rest = getCategories().filter(c => !used.has(c.id))
  if (rest.length) groups.push({ id: 'other', name: '其他', categories: rest })
  return groups
}

const modules = import.meta.glob<Record<string, unknown>>('./templates/*/*.ts', { eager: true })

// 模板 id → 源文件路径（供开发者面板提示去改哪个文件）
const templateSourceMap = new Map<string, string>()

function isTemplate(x: unknown): x is Template {
  return !!x && typeof x === 'object' && 'id' in (x as any) && 'elements' in (x as any)
}

function extractTemplates(mod: Record<string, unknown>): Template[] {
  const out: Template[] = []
  const push = (v: unknown) => {
    if (Array.isArray(v)) v.forEach(push)
    else if (isTemplate(v)) out.push(v)
  }
  push((mod as any).default)
  Object.values(mod).forEach(push)
  const seen = new Set<string>()
  return out.filter((t) => (seen.has(t.id) ? false : (seen.add(t.id), true)))
}

const templateMap = {} as Record<TemplateCategory, Template[]>
const registeredIds = new Set<string>()
// 静默丢弃是批量喂模板时最容易漏的事故（category 拼错 / id 撞车），dev 期出声报应
const dropWarnings: string[] = []
for (const [file, mod] of Object.entries(modules) as Array<[string, Record<string, unknown>]>) {
  const src = file.replace(/^\.\//, 'src/core/')
  const found = extractTemplates(mod)
  let accepted = 0
  for (const t of found) {
    if (!(t.category in CATEGORY_REGISTRY)) {
      dropWarnings.push(`[模板] ${src} 中「${t.name || t.id}」的 category「${t.category}」不在注册表，未入库`)
      continue
    }
    if (registeredIds.has(t.id)) {
      dropWarnings.push(`[模板] ${src} 中 id「${t.id}」与已入库模板撞车，整份丢弃`)
      continue
    }
    registeredIds.add(t.id)
    templateSourceMap.set(t.id, src)
    ;(templateMap[t.category] ||= []).push(t)
    accepted++
  }
  if (!accepted && found.length) dropWarnings.push(`[模板] ${src} 没有一份模板成功入库`)
}
if (dropWarnings.length) console.warn(dropWarnings.join('\n'))

export function getTemplateSourcePath(id: string): string | null {
  return templateSourceMap.get(id) ?? null
}

export async function loadTemplatesByCategory(cat: TemplateCategory): Promise<Template[]> {
  return templateMap[cat] ?? []
}

export async function loadAllTemplates(): Promise<Template[]> {
  const keys = Object.keys(CATEGORY_REGISTRY) as TemplateCategory[]
  return keys.flatMap(k => templateMap[k] ?? [])
}
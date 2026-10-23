// src/types/types.ts
export type TemplateCategory =
  | 'minimal' | 'simple' | 'emotional' | 'knowledge' | 'business'
  | 'tech' | 'magazine' | 'chinese' | 'cute' | 'handdrawn'
  | 'cyberpunk' | 'scifi' | 'pixel' | 'quotes' | 'acg' | 'academic' | 'retro' | 'art' | 'nature'
  | 'food' | 'sport' | 'festival' | 'course' | 'video'
  | 'sale' | 'film' | 'event' | 'health' | 'parenting' | 'pet' | 'finance'
  | 'game' | 'music' | 'travel'

// ================= 1. Token & Style 系统 =================
export interface TokenRef { $t: string }
export interface RandomRef { $random: RandomDescriptor }
export type StyleValue<T> = T | RandomRef | RandomDescriptor | TokenRef

// ================= 2. 控件与 Editable 策略 =================
export interface RangeControl { type: 'range'; min: number; max: number; step?: number }
export interface SelectControl { type: 'select'; options: string[] }
export interface PaletteControl { type: 'palette'; options: string[] }
export interface DragControl { type: 'drag'; bounds: 'canvas' | [number, number, number, number] }
export interface UploadControl { type: 'upload' }
export interface SliderControl { type: 'slider'; min: number; max: number; step?: number }
// 模板里大量写作 { type: 'scale' } 由默认区间兜底，故 min/max 可选
export interface ScaleControl { type: 'scale'; min?: number; max?: number; step?: number }
export type ControlDescriptor = RangeControl | SelectControl | PaletteControl | DragControl | UploadControl | SliderControl | ScaleControl
export type EditableValue = boolean | Record<string, ControlDescriptor | boolean>

// ================= 3. Token 定义 =================
export interface TokenDefinition<T = any> { label?: string; default: T; options: T[] }
export interface Tokens {
  colors?: Record<string, TokenDefinition<string>>
  fonts?: Record<string, TokenDefinition<string>>
}

// ================= 4. 用户 Overrides =================
// 扩展结构性操作字段，全部纳入现有 Overrides + Undo/Redo 管线
export interface UserOverrides {
  tokens?: Record<string, any>
  /** 每个元素的属性覆盖（x/y/width/height/rotation/content/src/objectFit/...） */
  elements?: Record<string, any>
  /** 被删除的模板元素 id */
  deleted?: string[]
  /** 通过复制/粘贴新增的元素（完整元素对象，已是字面量） */
  added?: any[]
  /** 图层顺序（元素 id 数组，索引即 zIndex） */
  order?: string[]
  /** 被锁定的元素 id */
  locked?: string[]
}

// ================= 5. 随机描述符 =================
export interface RandomRange { type: 'range'; min: number; max: number; step?: number }
export interface RandomChoice<T = any> { type: 'choice'; options: T[] }
export interface RandomColor { type: 'color'; palette: string[] }
export type RandomDescriptor = RandomRange | RandomChoice | RandomColor

// ================= 6. 动画系统 =================
export interface TemplateAnimation {
  name: 'fadeIn' | 'fadeInUp' | 'fadeInDown' | 'slideInLeft' | 'slideInRight' | 'pulse' | 'bounce' | 'glow' | 'float' | 'drift' | 'inkReveal' | 'shimmer' | 'spinSlow' | 'zoomIn' | 'zoomOut' | 'twinkle' | 'sparkle' | 'swing' | 'heartbeat' | 'rise' | 'wobble' | 'gradientPan' | 'ripple' | 'blink' | 'slideUpFade'
  duration: number; delay?: number; easing?: string; iterationCount?: number | 'infinite'
}

// ================= 7. 元素类型 =================
export type ElementType = 'text' | 'image' | 'shape' | 'overlay'
export type AnchorPosition = 'top-left' | 'top-center' | 'top-right' | 'center-left' | 'center-center' | 'center-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'

export interface BaseElement {
  id: string; type: ElementType; anchor?: AnchorPosition
  x: StyleValue<number>; y: StyleValue<number>
  width: StyleValue<number>; height: StyleValue<number>
  rotation?: StyleValue<number>; zIndex?: number; opacity?: StyleValue<number>
  animation?: TemplateAnimation; editable?: EditableValue
  /** 同组标记：条码、装订孔这类「一个视觉单元拆成 N 个元素」的装饰，点选/拖动/删除按整组走 */
  group?: string
}

export interface TextElement extends BaseElement {
  type: 'text'
  content: StyleValue<string>; fontSize?: StyleValue<number>; fontWeight?: StyleValue<string | number>
  /** 该文字是图片坑位的提示语，值为坑位形状元素 id（编辑器据此提供「换成图片」） */
  imageSlot?: string
  color?: StyleValue<string>; textAlign?: 'left' | 'center' | 'right'
  lineHeight?: number; letterSpacing?: number; fontFamily?: StyleValue<string>
  fontStyle?: 'normal' | 'italic' | 'oblique'
  textTransform?: string
  shadow?: { offsetX: number; offsetY: number; blur: number; color: StyleValue<string> }
}

export interface ImageElement extends BaseElement {
  type: 'image'
  src: StyleValue<string>; objectFit?: 'cover' | 'contain' | 'fill'; objectPosition?: string
  borderRadius?: number
  shadow?: { offsetX: number; offsetY: number; blur: number; color: StyleValue<string> }
}

export interface ShapeElement extends BaseElement {
  type: 'shape'
  shapeKind?: 'rect' | 'circle' | 'line'
  fill?: StyleValue<string>; borderRadius?: number
  border?: { width: number; style?: string; color: StyleValue<string> }
  shadow?: { offsetX: number; offsetY: number; blur: number; color: StyleValue<string> }
}

export interface OverlayElement extends BaseElement {
  type: 'overlay'
  background?: StyleValue<string>; mixBlendMode?: string; borderRadius?: number
}

export type CanvasElement = TextElement | ImageElement | ShapeElement | OverlayElement

// 编辑器叠加层：从标尺拉出的参考线。pos 用导出像素（viewWidth/viewHeight 口径），仅存内存、不进模板 schema、不参与导出
export interface CanvasGuide { id: string; axis: 'v' | 'h'; pos: number }

// ================= 8. 模板与画布 =================
export interface PalettePreset { name: string; colors: Record<string, string> }

export interface TemplateCanvas {
  virtualWidth: number; virtualHeight: number; defaultWidth: number; defaultHeight: number
  backgroundColor?: StyleValue<string>; backgroundImage?: string
  supportedAdaptations?: string[]
}

export interface Template {
  schemaVersion?: number; id: string; name: string; category: TemplateCategory
  version?: string; tags?: string[]
  thumbnail: string; canvas: TemplateCanvas; tokens?: Tokens
  presets?: PalettePreset[]
  elements: CanvasElement[]
}

// ================= 9. ResolvedTemplate (纯字面量) =================
export interface ResolvedTemplate extends Omit<Template, 'elements' | 'canvas' | 'tokens'> {
  canvas: Omit<TemplateCanvas, 'backgroundColor'> & { backgroundColor: string }
  elements: (Omit<CanvasElement, 'x' | 'y' | 'width' | 'height' | 'rotation' | 'opacity' | 'content' | 'fontSize' | 'color' | 'src' | 'fill' | 'background' | 'fontFamily' | 'editable'> & {
    x: number; y: number; width: number; height: number
    rotation?: number; opacity?: number
    content?: string; fontSize?: number; color?: string
    src?: string; fill?: string; background?: string; fontFamily?: string
    locked?: boolean
    [key: string]: any
  })[]
}

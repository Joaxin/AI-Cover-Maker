# Image-to-JSON Design Skill

## Purpose

将一张二维视觉设计图（海报、文章封面、社交媒体图片、宣传图、信息卡片、Banner 等）反向解析为**结构化、可编辑、可验证的 Design JSON**。

本 Skill 的目标不是生成图片描述，也不是生成 HTML/CSS，而是：

> **从最终视觉结果反推出一个能够被 Cover Maker Renderer 重新渲染、人工微调、再次生成和导出的结构化设计。**

核心流程：

```text
Image
  ↓
Visual Analysis
  ↓
Layout Reconstruction
  ↓
Element Decomposition
  ↓
Design JSON
  ↓
Schema Validation
  ↓
Renderer Preview
  ↓
Manual Correction
```

---

## 1. Core Principle

把输入图片视为一个已经 flatten 的设计文件。图片中没有真正的图层，因此模型必须进行**逆向推断**。

不要问：

> “这张图片是什么？”

而要问：

> “如果我要用有限的 text / image / shape / overlay 元素重新构建这张图片，需要哪些图层、它们在哪里、尺寸多大、颜色是什么、层级是什么？”

输出应优先保证以下属性：

1. 结构正确
2. 坐标合理
3. 元素层级正确
4. 视觉比例接近原图
5. 文本内容准确
6. 颜色和背景关系合理
7. JSON 严格符合目标 Schema

不要为了“看起来更专业”而擅自增加原图不存在的元素。

---

## 2. Supported Element Types

目标 Design JSON 只使用以下基础元素：

```text
text
image
shape
overlay
```

### 2.1 text

用于标题、副标题、正文、标签、数字、日期、按钮文字等文字区域。

关键属性：

```json
{
  "id": "title",
  "type": "text",
  "content": "TITLE",
  "x": 100,
  "y": 120,
  "width": 800,
  "height": 140,
  "fontSize": 72,
  "fontWeight": "700",
  "color": "#FFFFFF",
  "fontFamily": "Arial",
  "textAlign": "left",
  "lineHeight": 1.2,
  "letterSpacing": 0,
  "zIndex": 10
}
```

#### 文字渲染契约（估宽时必须遵守）

渲染器把文字放进 `white-space: pre-wrap` 的盒子，因此：

- `\n` 会断行，**同时**写到盒宽还会自动折行 —— `width` 是硬约束。
- 元素盒子不裁剪溢出（只有画布根节点裁剪）。估窄的 `width` 不会"省略号"，而是压到下一个元素或冲出画布。
- 中文按字断行，拉丁按词断行：一个比盒宽还长的单词（`COMPOSITION`）不折行，直接横向探出。
- 同一个字体 token 可能有多个候选（衬线/黑体/IMPACT…），字宽会变。按最宽的一套留余量：**`width ≥ 估算字宽 × 1.15`**。
- 字宽粗估（×fontSize，再叠加 `letterSpacing × 字符数`）：CJK ≈ 1.0，数字 ≈ 0.56，大写 ≈ 0.70（M/W ≈ 0.95），小写 ≈ 0.53，空格 ≈ 0.30，`i l . , ; : ' " ! | / ·` ≈ 0.33。
- `height` 不裁剪文字，但它是行盒声明：写成真实高度（行数 × fontSize × lineHeight），否则下游工具无法判断有没有溢出。
- 需要几行就自己写几个 `\n`，不要指望自动折行帮你断在语义合适的位置。

### 2.2 image

用于照片、人物、插图、Logo、产品图等视觉内容。

优先记录其**显示区域**，而不是猜测图片文件本身。

```json
{
  "id": "hero-image",
  "type": "image",
  "src": "",
  "x": 120,
  "y": 420,
  "width": 760,
  "height": 420,
  "objectFit": "cover",
  "objectPosition": "center",
  "zIndex": 5
}
```

如果原图中的视觉主体无法提供真实资源，不要伪造 URL。使用空字符串、占位引用或项目约定的 asset reference，并保留准确布局。

#### 图片坑位（image slot）

如果原图中某个 image 是「用户应当能替换的主体图」（人物照、商品图、头像、配图等），不要只写死 `src` —— 给它加上可编辑标记，编辑器才会把它识别为「🖼 换成图片」的坑位：

```json
{
  "id": "photo",
  "type": "image",
  "src": "/images/photo/scholar-a-200x200.jpg",
  "objectFit": "cover",
  "editable": { "src": { "type": "upload" }, "position": true }
}
```

- `editable.src = { "type": "upload" }` 是图片坑位的标记：导出 / 导入时该图可被用户一键上传或选素材库替换；省略它则只是一张写死的装饰图，「换成图片」在这张图上不可用。
- 库内既有模板（`academic` / `business` / `acg` 等系列的 `photo` 元素）都用此写法。AI 复刻同款时应照此产出，否则生成的模板在编辑器里点不了「换成图片」。
- 文案行也可充当图片坑位提示：在一条文案槽上标记 `imageSlot`（值为关联图片元素 id，或仅作占位语义），编辑器里点 🖼 会原地生成同尺寸图片框；但 JSON 直出模板通常优先用上面 image 的 `editable.src` 写法。

### 2.3 shape

用于矩形、圆形、线条、色块、边框、几何装饰等。

```json
{
  "id": "accent-line",
  "type": "shape",
  "shapeKind": "line",
  "x": 100,
  "y": 390,
  "width": 500,
  "height": 3,
  "fill": "#D4AF37",
  "zIndex": 3
}
```

注意：`shapeKind` 只有 `rect | circle | line`。`line` 就是一块 `width × height` 的实心条，**横条的粗细写在 `height` 上（竖条写在 `width` 上）**，渲染层不再另设默认粗细；颜色取 `fill`，`fill` 为空时回落 `border.color`，两者都没有则为黑色。历史数据里的 `border.width` 只是遗留字段，新生成的模板不要依赖它定粗细（要保留就直接写成与 `height` 相同的值）。

```json
{
  "id": "vertical-rule",
  "type": "shape",
  "shapeKind": "rect",
  "x": 120,
  "y": 430,
  "width": 3,
  "height": 330,
  "fill": "#D4AF37",
  "zIndex": 3
}
```

### 2.4 overlay

用于半透明遮罩、渐变、颜色叠加、图片压暗层、视觉滤镜层等。

```json
{
  "id": "dark-overlay",
  "type": "overlay",
  "x": 0,
  "y": 0,
  "width": 1000,
  "height": 1000,
  "background": "rgba(0,0,0,0.35)",
  "zIndex": 20
}
```

---

## 3. Coordinate System

**元素坐标空间 ＝ 画布设计尺寸 ＝ 导出像素，三者同源；不存在额外的"虚拟基准"。**

渲染器把 `canvas.defaultWidth` / `defaultHeight`（旧字段 `virtualWidth` / `virtualHeight` 仅作回落）当作内容盒的**真实像素**宽高，元素的 `x / y / width / height` 就落在这个盒子里；导出截的是同一套像素，缩放系数固定为 1。所以 `x: 120` 就是成品图上的第 120 个像素，`fontSize: 64` 就是成品上的 64px 字。

```text
(0,0) ───────────────────→ x
  │   单位 = 画布自身像素（不是归一化到 1000 的相对坐标）
  │
  ↓
  y
```

### Mapping

设原图尺寸 `W × H`，你决定输出的画布尺寸 `CW × CH`（默认就取 `CW = W`、`CH = H`），元素在原图上的像素坐标 `(px, py)`、像素尺寸 `(pw, ph)`，则：

```text
x = px × CW / W
y = py × CH / H
width  = pw × CW / W
height = ph × CH / H
```

原图与画布同尺寸时四个系数全是 1 —— **照原图量出来多少就写多少**。

> ⚠️ 不要把 1920×1080 / 1080×1350 先压成 1000 基准再输出。坐标空间是 1000×1000 而画布写着 1080×1920 时，内容只会占成品画面的一小块（切比例时更是直接被裁），比例也可能整个错掉。

最终输出必须使用整数或合理的小数，避免无意义的高精度数字。

---

## 4. Canvas Reconstruction

先判断画布。`canvas` 的宽高**取原图的实际像素**（或用户明确指定的目标输出尺寸），元素坐标沿用同一尺寸：

```json
{
  "canvas": {
    "defaultWidth": 1080,
    "defaultHeight": 1350,
    "backgroundColor": "#0B132B"
  }
}
```

`virtualWidth` / `virtualHeight` 是旧字段，只在 `defaultWidth` / `defaultHeight` 缺失时被当回落值。新产出只写 `default*`；两套同时存在时以 `default*` 为准，写出不一致的四个值会造成行为难以预期。

### 4.1 Aspect Ratio

必须首先识别：

- 1:1
- 4:3
- 3:4
- 16:9
- 9:16
- 其他自定义比例

并让 `defaultWidth : defaultHeight` 等于它。**比例要在生成阶段就写对，没有"上层适配逻辑"会救回来**：编辑器顶部确实能切输出比例，但那只是改视口尺寸，不会重排你的内容——只有 `scale` 档会整体等比缩放适配；`expand` / `crop` 两档内容始终按原尺寸 1:1 居中，超出视口的部分被画布的 `overflow: hidden` 裁掉，不足的部分露出画布底色。

### 4.2 Background

判断背景属于：

- 纯色
- 渐变
- 图片
- 图片 + 遮罩
- 多个大面积 Shape

落点规则（字段支持的写法各不相同，写错会静默不生效，详见 §12）：

- 纯色 → `canvas.backgroundColor`。
- **渐变 → 一个铺满整画的 `overlay` 元素，把渐变串写在 `overlay.background`**；不要写进 `canvas.backgroundColor` 或 `shape.fill`。
- 图片 / 纹理底 → `canvas.backgroundImage`（该值会被拼进 `url(...)`，所以只能放图片 URL 或 data URI，**放 `linear-gradient(...)` 无效**），或用一张宽高等于画布的 `image` 元素。
- 更复杂的背景再用 `image` / `shape` / `overlay` 叠加。

---

## 5. Element Decomposition

按照视觉结构而不是阅读顺序拆分元素。

推荐分析顺序：

```text
1. Canvas
2. Background
3. Full-size Image
4. Large geometric blocks
5. Overlay / gradient
6. Main title
7. Secondary text
8. Small labels / metadata
9. Decorative elements
10. Fine details
```

### 不要过度拆分

例如一个纯色矩形带简单圆角，不要拆成：

```text
background
border
corner
fill
```

通常一个 `shape` 就足够。

同样，不要把一段连续标题拆成十几个单字元素，除非原图确实存在明显独立定位。

目标是：

> **最少元素实现最大视觉还原度。**

### 反向情况：必须拆，但要打组

有些东西视觉上是**一个整体**，但因为几何上分散，只能拆成 N 个元素表达：

```text
条码 / 齿孔·装订孔 / 票根虚线 / 刻度尺 / 网格线 / 步骤点·进度点 / 缝线 / 点阵矩阵 / 一排色卡 / 一排柱子 / 一对券口凹口
```

这类元素**必须带上相同的 `group` 字段**，让它们被当作一个整体选中与拖动：

```json
{ "id": "perf-0", "type": "shape", "shapeKind": "circle", "group": "perf", "zIndex": 4 },
{ "id": "perf-1", "type": "shape", "shapeKind": "circle", "group": "perf", "zIndex": 4 }
```

规则：

| 约束 | 说明 |
|---|---|
| 同一个视觉单元 | `group` 相同，且 id 前缀相同（`perf-0`…`perf-10`） |
| `group` 只给装饰 | 只用于 `shape` / `image` 且不可编辑；标题正文禁止打组 |
| 不同单元别撞前缀 | 两个不相干的装饰族不要共用前缀，否则会被自动合并成一组 |
| 忘记写 `group` | 运行时按 id 前缀兜底：同类纯装饰同前缀 ≥3 个自动成组，故前缀务必一致 |

---

## 6. Text Recognition

文字识别属于高优先级，因为文本错误会直接破坏设计结构。

### 必须尽量准确提取

- 原文
- 换行
- 大小写
- 数字
- 标点
- 特殊符号
- 文本顺序

例如原图：

```text
THE FUTURE
OF AI
```

不要输出：

```text
THE FUTURE OF AI
```

因为换行本身属于视觉布局信息。

### OCR 不确定时

不要凭空补全文字。

优先顺序：

```text
看得清 → 原样输出
部分看清 → 保留可确认内容
完全看不清 → 使用占位文本并降低置信度
```

---

## 7. Typography Estimation

从视觉比例反推字体属性，而不是试图百分之百猜出具体字体文件。

### Font Family

优先判断字体类别：

```text
sans-serif
serif
monospace
handwritten
condensed/display
```

然后映射到项目允许的字体栈，例如：

```text
Arial
Georgia
system-ui
Helvetica, Arial, sans-serif
'PingFang SC'
'Microsoft YaHei'
```

如果具体字体无法可靠判断，使用最接近的安全字体，而不是虚构字体名称。

### Font Size

以**画布自身像素**为基准估算（画布写的是 1080 高就是 1080，不存在 1000 归一化）。

例如主标题高度约占画布高度 8%，1350 高的画布可优先尝试 86–108px、1000 高的画布用 64–80px，而不是机械地从像素高度直接复制。

### Font Weight

常见映射：

```text
Thin      → 300
Regular   → 400
Medium    → 500
Bold      → 700
Black     → 900
```

### Alignment

必须观察文本区域，而不是只观察字符本身：

```text
left
center
right
```

---

## 8. Color Extraction

颜色应该服务于视觉还原。

优先提取：

1. 背景主色
2. 标题色
3. 强调色
4. 辅助文字色
5. 主要形状色
6. 遮罩色

使用标准 HEX 或 CSS rgba。

例如：

```text
#0B132B
#FFFFFF
#D4AF37
rgba(0,0,0,0.35)
```

不要生成大量几乎相同的颜色值。

如果多个元素明显共享颜色，应优先考虑后续 Token 化。

---

## 9. Position / Size Estimation

每一个元素都必须回答四个问题：

```text
在哪里？
多大？
以什么方式对齐？
位于哪一层？
```

### Bounding Box

使用视觉 bounding box：

```text
x = left
 y = top
width = right - left
height = bottom - top
```

### Anchor

当元素明显依附于某个基准点时使用：

```text
top-left
top-center
top-right
center-left
center-center
center-right
bottom-left
bottom-center
bottom-right
```

不要为了形式完整给所有元素添加复杂 anchor；只有确实有帮助时才使用。

---

## 10. Layer / Z-Index Reconstruction

视觉遮挡关系决定层级。

通常：

```text
0   background
1   large shapes
2   images
3   text
4   overlays / foreground effects
5+  special foreground elements
```

实际值不是固定规则，必须以原图遮挡关系为准。

判断标准：

> 如果 A 覆盖 B，那么 A 的 zIndex 必须高于 B。

---

## 11. Images and Assets

当输入只有一张 flatten 图片，而没有原始素材时，不应该假装拥有源图片文件。

应区分：

```text
视觉上存在 image
```

和：

```text
系统拥有 image asset
```

如果只有视觉信息：

```json
{
  "type": "image",
  "src": "",
  "objectFit": "cover"
}
```

或者使用项目允许的 placeholder / asset reference。

重点是**保留其位置、尺寸、裁切方式和层级**。

---

## 12. Gradients, Shadows and Effects

复杂 CSS 效果应尽量压缩为目标 Schema 可以表达的形式。

### Gradient

**渐变只有一个合法落点：铺满整画的 `overlay` 元素的 `background` 字段。**

```json
{
  "id": "bg-gradient", "type": "overlay",
  "x": 0, "y": 0, "width": 1080, "height": 1350,
  "background": "linear-gradient(180deg, #0B132B 0%, #1E293B 100%)",
  "mixBlendMode": "normal", "zIndex": 1
}
```

原因（三个常见写法都会静默失败）：

- `canvas.backgroundColor` 与 `shape.fill` 都被原样写进 CSS **`background-color`**，而渐变串对 `background-color` 是非法值 → 整条声明被浏览器丢弃。**不会报错**，只是那一层没有背景：编辑器里透出视口深色，导出的 PNG 对应像素是透明；`shape` 则整块隐形。
- `canvas.backgroundImage` 会被拼成 `url(<值>)`，只接受图片 URL / data URI，放 `linear-gradient(...)` 不生效。
- 只有 `overlay.background` 走 CSS **`background` 简写**，渐变、多重背景、`radial-gradient` 都能表达。

因此：**需要渐变就上 overlay**（`width` / `height` 铺满画布，或只盖住局部区域），需要"图 + 渐变"就用一张 `image` 叠一层 `overlay`。同理，库内所有既有模板的渐变也都放在 overlay 里。

### Shadow

如果目标 Schema 支持：

```json
"shadow": {
  "offsetX": 0,
  "offsetY": 4,
  "blur": 18,
  "color": "rgba(0,0,0,0.25)"
}
```

不要为了重现微小阴影而制造额外元素。

---

## 13. Tokenization

如果多个元素使用同一颜色或字体，可以转换为 Token 引用：

```json
{
  "tokens": {
    "colors": {
      "bg": {
        "label": "背景",
        "default": "#0B132B",
        "options": ["#0B132B", "#0F172A"]
      },
      "primary": {
        "label": "主色",
        "default": "#D4AF37",
        "options": ["#D4AF37", "#F59E0B", "#3B82F6"]
      }
    },
    "fonts": {
      "heading": {
        "label": "标题字体",
        "default": "Helvetica, Arial, sans-serif",
        "options": ["Helvetica, Arial, sans-serif", "Arial"]
      }
    }
  }
}
```

然后：

```json
"backgroundColor": { "$t": "colors.bg" }
```

只有在重复使用明显存在时才 Token 化。不要为了“结构漂亮”而把所有常量都 Token 化。

---

#### Token 引用的硬规则

- 可取值的属性支持三种写法：字面量、`{ "$t": "colors.accent" }`、`{ "$random": { "type": "range", "min": -1.5, "max": 1.5, "step": 0.1 } }`。**渲染器层面**的适用范围包含 `content / src / color / fill / background / fontFamily / fontSize / opacity`，也包含几何字段 `x / y / width / height / rotation`。
- ⚠️ 但**能不能这么写取决于交付路径**，两者规则不同：
  - 交付为 **`.ts` 模板文件**（放进 `src/core/templates/<大类>/`，由 glob 自动注册）→ 上面全部字段都可以写引用。
  - 交付为 **JSON 走编辑器「导入」页**→ 导入闸门硬性要求 `text.content` 与 `image.src` 是字符串、`x / y / width / height / rotation / fontSize / letterSpacing / lineHeight / opacity / zIndex / borderRadius` 是数字，这些位置写 `{ "$t": … }` 会**整份 JSON 被拒**（错误会一次性列全）。JSON 路径上引用只能出现在闸门不检查的字段：`color` / `fill` / `background` / `fontFamily`。
  - 结论：**需要 token 化或随机化就出 `.ts`**（面板「导出」页产出的正是 TS）；JSON 只用于快速预览与不含引用的产出。
- `$random` 必须包一层键：裸写 `{"type":"range",...}` 不会被解析。`choice` 的选项还可以再嵌 token 引用。
- token 路径写错时解析器只 `console.warn` 后回退 `undefined` —— 该属性直接不生效（文字会掉进继承色），产出前必须逐个核对路径拼写。
- 元素上写死的 hex 永远不随配色预设变化。凡是"应该跟主题走"的颜色都必须写成 `$t`；确实固定的物理颜色（木纹、灯管颜色）才留字面量。
- 应用预设时只有预设里列出的键会被覆盖，其余保持当前值 —— **每个 preset 必须写全 `tokens.colors` 的所有键**，否则切过去会漏色。
- 塞进 data URI 的颜色要用 `%23RRGGBB`（`#` 在 URL 里会被截断）。

## 14. Editable Fields

导入后的设计通常需要人工微调，因此应该标记合理的可编辑字段。

推荐：

### Text

```json
"editable": {
  "content": true,
  "fontSize": {
    "type": "range",
    "min": 16,
    "max": 160
  },
  "position": true
}
```

### Image

```json
"editable": {
  "src": {
    "type": "upload"
  },
  "position": {
    "type": "drag",
    "bounds": "canvas"
  },
  "size": {
    "type": "scale",
    "min": 0.5,
    "max": 1.5
  }
}
```

不要随意开放用户修改复杂视觉参数。编辑能力应服务于最终用途，而不是追求“所有东西都能改”。

---

#### 编辑器只认这些 key（越权字段会被静默丢弃）

`editable` 会经过一层词汇表过滤，不在表里的键直接删掉并在控制台 warn：

| 元素类型 | 允许的 key |
|---|---|
| text | `content` `fontFamily` `fontSize` `color` `textAlign` `opacity` `position` |
| image | `src` `position` `size` `opacity` |
| shape | `color` `position` `opacity` |
| overlay | `opacity` |

- 控件类型只有：`{ type: 'range', min, max, step? }`、`{ type: 'slider', min, max }`、`{ type: 'scale', min?, max? }`、`{ type: 'select', options }`、`{ type: 'palette', options }`、`{ type: 'drag', bounds: 'canvas' }`、`{ type: 'upload' }`，或简写 `true`（退化成 0–100 滑杆）。
- `color: true` 是错误写法，会被降级成"不可编辑"；要开放配色就写 `{ "type": "palette", "options": [...] }`。
- 想让字号可调就同时给区间，并且区间上限不能把文字撑破盒子（见 §2.1 渲染契约）。
- 不需要人工微调的装饰元素，省略 `editable` 或写 `false`。

## 15. Randomization

**默认不要添加 `$random`。**

Image-to-JSON 的首要目标是复原当前图片，而不是生成变体。

只有当用户明确要求：

- 随机化
- 自动生成多个版本
- 保持风格但改变布局

才使用 `$random`。

例如：

```json
"rotation": {
  "$random": {
    "type": "range",
    "min": -4,
    "max": 4,
    "step": 1
  }
}
```

---

## 16. Confidence and Uncertainty

视觉逆向工程不是精确测量。遇到不确定的地方，不要编造确定答案。

推荐内部采用：

```text
high confidence
medium confidence
low confidence
```

高置信度：

- 清晰文字
- 明显矩形
- 明显背景颜色
- 明显尺寸关系

中置信度：

- 字体类型
- 精确字号
- 精确阴影参数

低置信度：

- 看不清的文字
- 隐藏在图片中的小元素
- 复杂渐变
- 极细边框

当 Schema 不允许表达不确定性时，选择最合理的近似值，并保证 JSON 可用。

---

## 17. Validation Rules

输出 JSON 后必须执行逻辑校验。

### Required

```text
id
name
category
thumbnail
canvas
elements
```

`thumbnail` 在类型定义上是必填，但导入闸门**不检查它**：漏了不会导入失败，只会在模板库列表里显示成破图（它同时也是折叠行的预览图来源）。产出时不要省。

### Canvas

```text
defaultWidth  > 0
defaultHeight > 0
defaultWidth : defaultHeight == 原图（或指定输出）的宽高比
```

数值取原图实际像素，例如 `1080 × 1350`、`1920 × 1080`。**不要统一填成 1000 × 1000**（见 §3）：闸门只查正数，所以填错照样导入成功，但元素坐标空间与输出尺寸不一致，成品会缺一块或被裁掉。

### Elements

每个元素至少具有：

```text
id
type
x
y
width
height
```

### Type

只允许：

```text
text
image
shape
overlay
```

### No unresolved references

最终 ResolvedTemplate 不得残留：

```text
$random
$t
```

### Coordinate sanity

通常要求：

```text
x / y 不应出现明显无意义的大数
width / height > 0
```

元素可以超出画布边界，但应该是视觉上有意义的裁切或出界设计，而不是解析错误。

### Text sanity

`fontSize` 应为正数；`content` 应为字符串。

---

#### 导入闸门实际拦截的内容

编辑器开发者面板「导入」页会一次性列出全部问题（不是遇到第一个就停），下列情形都会被拒绝：

- 根节点不是对象；`id` 非字符串或含 `字母数字 . _ -` 之外的字符；缺 `name`；缺 `category`
- 缺 `canvas`，或 `defaultWidth/virtualWidth`、`defaultHeight/virtualHeight` 不是正数
- `elements` 不是数组、为空；元素缺 `id` 或 id 重复；`type` 不在 `text/image/shape/overlay`
- `text` 没有字符串 `content`；`image` 没有 `src`；`shape.shapeKind` 不在 `rect/circle/line`
- `x/y/width/height/rotation/fontSize/letterSpacing/lineHeight/opacity/zIndex/borderRadius` 出现非数字
- `tokens.<组>.<键>` 缺 `default`；`presets[i]` 缺 `name` 或 `colors`

其它事实：粘贴文本上限 2,000,000 字符（真实模板 JSON 约 2.5k–88k）；「导出 TS」产出的是与当前状态字节等价的 `.ts`（对象字面量 + 正确的字符串转义），可直接放进 `src/core/templates/<大类>/` 由 glob 自动注册。

#### 动效与阴影字段速查

```json
"animation": { "name": "fadeInUp", "duration": 800, "delay": 200, "easing": "ease-out", "iterationCount": "infinite" }
```

- `name` 只能取：`fadeIn fadeInUp fadeInDown slideInLeft slideInRight pulse bounce glow float drift inkReveal shimmer spinSlow zoomIn zoomOut twinkle sparkle swing heartbeat rise wobble gradientPan ripple blink slideUpFade`
- 循环动画必须 `iterationCount: "infinite"`；写 `repeat` 无效（会被忽略成只播一次）。
- 入场动画不要写 `iterationCount`；一组元素用 `delay` 做 100–300ms 的错峰，别全部同帧出现。
- `shadow` 结构固定为 `{ offsetX, offsetY, blur, color }`：文字渲染成 `text-shadow`，形状与图片渲染成 `box-shadow`。

## 18. Self-Correction Loop

不要输出第一次猜出来的 JSON 后立即结束。

应进行一次内部重建检查：

```text
Image
 ↓
Draft JSON
 ↓
Mental / Renderer Reconstruction
 ↓
Compare with Image
 ↓
Fix major differences
 ↓
Final JSON
```

重点检查：

```text
[ ] 背景比例是否正确
[ ] 主标题是否在正确位置
[ ] 图片区域是否正确
[ ] 主体之间的相对间距是否正确
[ ] 颜色关系是否正确
[ ] zIndex 是否导致错误遮挡
[ ] 文本换行是否一致
[ ] 是否遗漏大型视觉元素
[ ] 是否加入了原图不存在的元素
[ ] 拆成多个元素的「一个视觉单元」（条码/齿孔/刻度/点阵等）是否都带上了同一个 group
[ ] 有没有把标题正文等可编辑文字误打进 group
```

优先修正“大误差”，不要在模型无法可靠判断时浪费计算量优化 1–2px 的细节。

---

## 19. Output Contract

当用户要求“image-to-JSON”时，默认只输出符合目标 Schema 的 JSON，不输出解释文字、不输出 Markdown fence，除非上层调用方明确要求解释。

输出结构示例（下面这份假设源图是 1:1、1000 × 1000，所以坐标空间就是 1000；源图为别的尺寸或比例时按 §3 / §4 用实际像素，元素坐标同步换算）：

```json
{
  "id": "imported-design-001",
  "name": "Imported Design",
  "category": "simple",
  "thumbnail": "",
  "canvas": {
    "defaultWidth": 1000,
    "defaultHeight": 1000,
    "backgroundColor": "#FFFFFF"
  },
  "elements": [
    {
      "id": "title",
      "type": "text",
      "x": 100,
      "y": 120,
      "width": 800,
      "height": 160,
      "content": "TITLE",
      "fontFamily": "Arial",
      "fontSize": 72,
      "fontWeight": "700",
      "color": "#111111",
      "textAlign": "left",
      "zIndex": 10,
      "editable": {
        "content": true,
        "position": true,
        "fontSize": {
          "type": "range",
          "min": 32,
          "max": 120
        }
      }
    }
  ]
}
```

---

#### category 必须取自注册表

`category` 不在注册表里时，模板在注册阶段就被静默丢弃（库里根本看不到）。当前可用值：

```text
minimal simple emotional knowledge business tech magazine chinese cute
handdrawn cyberpunk scifi pixel quotes acg academic retro art nature
food sport festival course video sale film event health parenting
pet finance game music travel
```

同理，`id` 与已有模板重复时只会保留先注册的那个。落到磁盘上时把文件放进 `src/core/templates/<category>/<命名>.ts`，导出一个 `Template[]` 数组即可被 glob 自动收集。

## 20. Important Anti-Patterns

### Do not output image descriptions

错误：

```json
{
  "description": "一张蓝色科技海报，有一个男人站在中间"
}
```

正确方向：

```json
{
  "elements": [
    {
      "type": "image",
      "x": 300,
      "y": 200,
      "width": 400,
      "height": 600
    }
  ]
}
```

### Do not output HTML

不要把任务转成：

```html
<div style="position:absolute...">
```

### Do not output CSS implementation

不要把 JSON 变成 CSS 属性集合。

### Do not hallucinate assets

不知道图片 URL 就不要编造 URL。

### Do not over-model

一张简单封面不应该产生几十个元素。

### Do not optimize for semantic elegance over visual fidelity

视觉位置正确，比 JSON 看起来“漂亮”更重要。

---

## 21. Recommended AI Prompt Pattern

上层 Agent 可以使用以下任务结构：

```text
You are a visual design reverse-engineering agent.

Given an input image, reconstruct the design as structured JSON compatible with the provided Design Schema.

Your task is NOT to describe the image.
Your task is NOT to generate HTML or CSS.
Your task is to infer the editable visual layers that could reproduce the image.

Requirements:
1. Use the source image's own pixel size as both the canvas size and the element coordinate space (1 canvas px = 1 exported px). Do NOT normalize to a 1000x1000 grid.
2. Decompose the image into text, image, shape, and overlay elements.
3. Preserve text content and line breaks as accurately as possible.
4. Estimate bounding boxes, typography, colors, and z-index from visual evidence.
5. Do not invent assets or URLs.
6. Prefer fewer, meaningful elements over excessive fragmentation.
7. Do not add $random unless explicitly requested.
8. Use $t only when repeated values clearly justify tokenization.
9. Return JSON that passes the target schema.
10. Perform a self-check for major visual mismatches before returning the final result.

Return only the final JSON.
```

---

## 22. Product-Level Interpretation

This Skill should be treated as an **inverse design compiler**.

```text
Visual Image
    ↓
AI Vision Model
    ↓
Intermediate Design Representation
    ↓
Schema Validator
    ↓
Design JSON
    ↓
Cover Maker Renderer
```

The renderer is not the primary intelligence of the system. Its job is to make structured design data visible and editable.

The most important assets are therefore:

```text
1. Design Schema
2. Image-to-JSON prompting
3. Vision model selection
4. Validation rules
5. Template corpus
6. Rendering fidelity
```

The desired user experience is:

```text
Upload any design image
        ↓
AI reconstructs it
        ↓
JSON imported automatically
        ↓
Editable visual result
        ↓
Change title / image / color / ratio
        ↓
Export a new design
```

This turns the tool from a conventional template editor into a **bridge between visual designs and machine-editable structured representations**.

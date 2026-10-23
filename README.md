# AI Cover Maker

> The design should be portable, inspectable, editable, and understandable by both humans and AI.

一个轻量、开源、可本地运行的 AI Cover Maker。

**主要使用场景：自媒体封面的模板化量产。** 面向长期使用同一风格封面的创作者（B 站视频封面、YouTube 头图、公众号/小红书封面图）：版式、配色体系、装饰元素固化成模板，每期只改文案、换配图、点一下预设换色，再按平台一键切比例导出——不必每次打开重型设计软件重新排版。模板库、配色 token、比例适配、"另存为我的模板"这些功能都是被这个场景推着长出来的。

而支撑这个场景的底层媒介，是 AI 可生成、可理解、可再编辑的 Design JSON：好的封面可以让 AI 转成模板 JSON 进库，自己的模板也能烘焙导出 JSON 继续用 AI 迭代。场景为表，结构化 JSON 为里。

项目的核心思路很简单：

Image / Idea → AI → Design JSON → Renderer → Canvas → Human Adjustment → Export

用户可以提供一张自己喜欢的设计，或者描述一个设计想法，让 AI 将其转换成结构化的 Design JSON，然后导入项目，由 Renderer 将 JSON 重新渲染成可继续编辑的设计。项目在于尝试探索一种更简单的 AI-native Design 工作流：AI 负责生成和理解设计结构，编辑器负责渲染和提供必要的人机调整能力。

## 为什么做这个项目
现在已经有不少工具可以将图片转换成 PSD、Figma、PowerPoint、Illustrator 等可编辑工程文件，从而把原本扁平的图片拆分成多个图层或对象。但这类方式往往过于笨重：工程文件本身可能很大，打开时还需要加载字体、图片等大量资源；同一张设计如果需要维护多种配色、图片、文案和风格，通常还要保存多个不同版本，管理起来并不直观。尤其当一个设计需要同时适配多种风格或不同使用场景时，传统工程文件很容易迅速膨胀成一堆难以维护的文件。

对于 AI 时代的设计工作流，我更希望设计能够保持轻量和结构化，而不是把一张图片重新变成一个庞大的传统设计工程文件。理想的流程应该是：

参考设计 → AI 理解 → Design JSON → 导入 → 修改 → 导出

例如，一张海报可以被理解为：

    Canvas
    ├── Background
    ├── Logo
    ├── Main Title
    ├── Product Image
    ├── Description
    └── Decorative Elements

AI 将这些视觉元素、位置、尺寸、层级和样式关系转换成 Design JSON，再由 Renderer 重新生成设计。这样，设计本身不再依赖一个庞大的工程文件，而是由轻量的结构化数据描述。

这种方式也更适合管理同一设计的多个版本。例如同一个设计可以只通过修改颜色、图片、字体、文案或少量布局参数，就快速生成不同风格和不同场景的版本，而不需要复制和维护多个完整工程文件。用户也可以直接在一个界面中选择不同风格、配色或素材，而不是在大量 PSD、Figma 或 Illustrator 文件之间来回切换。

更重要的是，传统工程文件主要描述“静态设计”，而结构化 Design JSON 则更容易进一步扩展到动态效果。例如元素的动画、状态变化、时间轴以及交互行为，都可以在设计结构中继续表达。这样同一个设计未来不仅可以生成静态图片，还可以进一步生成动态海报、社交媒体内容或其他可交互形式。

这个项目主要是尝试一种更轻量的方式来处理这类设计转换：将参考图片通过 AI 转换成 Design JSON，再导入项目进行调整和导出。

相比直接转换成 PSD、Figma、PowerPoint 或 Illustrator 等工程文件，Design JSON 可以只保存设计本身需要的结构和属性，图片、字体等资源单独管理。同一个设计也可以通过修改 JSON 中的颜色、图片、文字和布局参数生成不同版本，而不需要维护大量完整的工程文件。

未来也可以在这个结构上进一步支持动态效果和不同风格、配色之间的切换。

## Design JSON

Design JSON 是这个项目最核心的部分。

它不是为了复制 Photoshop PSD 的复杂能力，而是作为 AI 与 Renderer 之间的中间表示（Design IR）。

一个设计可以由 Canvas 和多个 Element 组成，例如：

    Canvas
    ├── Text
    ├── Image
    ├── Shape
    └── ...

Element 可以包含自己的位置、尺寸、旋转、层级以及对应类型的属性。

**编组（`group`）**：当一个视觉单元在结构上被拆成多个元素时（条码条纹、齿孔、刻度、点阵、网格线等），
给这些元素打上同一个 `group`，它们就会被当作一个整体来选中、拖动和删除。
`group` 只用于纯装饰（`shape` / `image` 且不可编辑）。若未显式指定，运行时会按 id 前缀兜底：
同一前缀的不可编辑装饰元素达到 3 个以上时自动成组。

图片资源通过 `src` 引用，而不是直接将大型图片 Base64 嵌入 JSON。这样设计结构和实际资源可以保持相对独立，也可以在不改变整体布局的情况下替换图片。

例如（下面这份可直接粘进工具「导入」框，能通过结构校验）：

```json
{
  "id": "summer-sale-demo",
  "name": "夏日促销示例",
  "category": "sale",
  "canvas": {
    "defaultWidth": 1080,
    "defaultHeight": 1350
  },
  "elements": [
    {
      "id": "photo",
      "type": "image",
      "src": "assets/product.jpg",
      "x": 100,
      "y": 200,
      "width": 880,
      "height": 600
    },
    {
      "id": "title",
      "type": "text",
      "content": "SUMMER SALE",
      "x": 120,
      "y": 100,
      "width": 840,
      "height": 120,
      "fontSize": 80,
      "fontWeight": 700
    }
  ]
}
```

顶层 `id` / `name` / `category` 必填（`category` 取「核心功能」里那 34 个分类 id 之一，如 `sale` / `game` / `music`），画布尺寸写在 `canvas.defaultWidth` / `defaultHeight`，每个元素同样要有唯一 `id`——这几条正是导入闸门会逐个检查的字段，缺一即被挡回。

模板类 Schema 在此基础上还有 `tokens`（配色/字体变量，元素属性用 `{ "$t": "colors.primary" }` 引用）、`presets`（一键换色方案）、`animation`（元素动画）和 `$random` 随机描述符等字段。元素可选 `anchor`（九宫格定位基准，`x`/`y` 变为相对锚点）：缺省与显式 `'top-left'` 完全同义，内置模板不写即可，主要在图片坑位转换和切比例时用到。

实际 Schema 会随着项目继续开发而完善。

## 核心功能

模板与量产复用（上面那个场景的直接支撑）：

- 内置 300+ 模板、34 种风格分类（视频封面 / 游戏 / 音乐 / ACG / 科技 / 运动 / 旅行 / 国风……），分类视图 + 过滤视图 + 全文搜索（名称/标签/封面文案），常用模板可 ★ 收藏置顶，不想要的内置模板也能隐藏
- 模板配图已全部本地化（`public/images/photo`），断网也能编辑与导出
- 配色 Token + 预设配色方案：不动版式，一键整套换色；自存的「我的变体」记在本机，刷新不丢
- 字体 Token；$random 随机描述符（实验性，目前少数模板启用：同一模板每期自动微调版式）
- 元素动画系统（20+ 种关键帧），预览/暂停可控
- 比例切换（1:1 / 4:3 / 3:4 / 4:5 / 16:9 / 9:16 / 自定义）+ 三种适配算法（同色扩展 / 对等裁切含保边锚点 / 等距缩放），满幅背景与贴边装饰自动跟铺，越界内容幽灵预览；另有「🍿 平台尺寸」一键套用小红书 / B站 / 抖音 / 公众号的标准像素
- 「另存为我的模板」：把当前画面（含你的全部改动）烘焙成可复用的本地模板，仍支持换色换字体；编辑自动暂存记入按模板分格的草稿箱，刷新后可从草稿箱点名恢复
- 批量出图：贴一张表（一行一条封面，Tab 分列），按文案槽顺序自动填词，一次导出 N 张 PNG；表格内容本机留存，下次打开接着改；跑完逐行报账——哪行文字撑破了盒子、哪行导出失败、还有几处坑位没换图
- JSON 导入 / 导出（源模板 & 烘焙版）、零后端、全本地
- 「我的模板」备份：单张或整库导出 JSON、从文件导入恢复，清浏览器数据也能找回
- 开发模式下上传的本地图可由 dev 服务器直接落盘进 `public/images/<分类>/` 素材库，外链图也能「存入」转本地，模板资源随之进仓库

编辑器能力：

- Text / Image / Shape / Overlay 四类元素
- 「📝 文案」页签：把当前画面全部文本按阅读顺序摊平成一张填词表，Tab / Shift+Tab 在文案框间首尾环绕，逐条改完即可出图，单条可 ↺ 还原，输入框随内容自动增高；右侧面板默认就打开这个页签（点画布元素仍自动跳「🧩 元素」）
- 「🖼 换成图片」：模板里「这里放主子的脸」这类图片坑位提示语，一键换成同形状同尺寸的图片框，接着上传 / 选素材库灌图（Ctrl+Z 退回文字）
- 移动、缩放、旋转、多选、对齐、图层顺序、锁定
- 选中即展开 📐 Transform；顶部「微调:」步长（1/2/5/10px）+ 四向按钮，不必记方向键
- 「形状属性」卡：线条 / 色块 / 圆形可直接改填充色、粗细、圆角、不透明度；1~4px 细线自动扩大点选热区
- Duplicate / Copy / Paste、Undo / Redo、快捷键总览（+/-/0/1 缩放、/ 直达搜索、Esc 逐级退出）
- 导出聪明化：改过文案后导出文件名自动取改过的标题前 10 字（与批量同口径）；导出前体检会点名「还没换图的坑位 / 溢出盒子的文字」，只提醒不拦截
- 图片替换（本地上传 + 内置 SVG 编辑器）、标尺与参考线、网格（均不进导出）
- Canvas Zoom 与导出倍率（1x/2x/3x）分离
- 全屏专注编辑模式（. 键切换）

Canvas Zoom 与实际 Design Size 分离。改变 Zoom 只影响查看方式，不改变实际设计尺寸和导出尺寸。

历次改动的浏览器验收项集中在 [docs/验收/待点验清单.md](docs/验收/待点验清单.md)。

## AI 工作流

项目不内置任何 AI 接口，也不要 API key。所有 AI 活都走剪贴板：工具把该说的话说清楚 → 你粘给任意一个 AI（Claude / ChatGPT / Gemini / 本地模型，谁顺手用谁）→ 把返回的 JSON 粘回导入框。模型随你换，工具不绑服务。

这条链路目前跑通的几段：

- **复刻同款**：右栏「🤖 AI 复刻同款」把画布当前模板打包成一段带硬性约束的提示词（改什么、不许动什么，写死在提示词里），一键复制；AI 返回的新 JSON 直接进导入闸门。模板里的大图（内联 SVG / data URI）会先折成 `{{IMG:元素id}}` 占位符再发出去，回来时按占位符回灌原图——不然几十 KB 的 base64 扔给模型，大概率抄坏。
- **场景生成 / 批量变体**：描述一个主题，让 AI 按契约产出整套模板，或者一次产一批 JSON 数组、整批存进「我的模板」。
- **导入闸门**：所有进来的 JSON 先过结构校验，问题一次性列全再放行，不会画一半崩掉。契约头几行字就是上面提示词和校验共用的同一份定义，两侧永不漂移。

还没完全解好的是 `Image → Design JSON`：把一张喜欢的封面截图丢给视觉模型、让它吐符合 Schema 的 JSON，今天就能试，但还原度取决于模型，字段规范文档可以整份复制进对话。这个方向的打磨还在继续。

## 为什么保持轻量

这个项目刻意保持简单。不需要数据库、账号系统、云端存储或独立后端服务。

核心结构就是：

```
AI
 ↓
Design JSON
 ↓
Renderer
 ↓
Canvas
```

设计数据可以直接以 JSON 形式保存和交换，图片等资源独立管理。

这种结构也意味着项目可以很容易地在本地运行，不依赖特定的在线平台。

## 开发环境

- Vue 3
- TypeScript
- Vite

## 安装

```
npm install
```

## 启动开发服务器

```
npm run dev
```

默认访问：

http://localhost:3000

具体端口以 Vite 实际输出为准。

## 生产构建

```
npm run build
```

生产构建包括类型检查和 Vite 构建。

## 项目状态

面向主场景的"模板复用闭环"（模板库 → 换色换字 → 切比例 → 导出 / 批量 / 另存为我的模板）跑通很久了，连当初写在 Roadmap 里的模板资产化和批量量产也都落了地。现在项目进入边用边磨的阶段：修交互毛刺、给模板库提质、把 AI 复刻链路的约束写得更准。

有一条原则从第一天到现在没变：重点不是堆专业设计功能，而是让"固定风格出图"这条主干一直顺。

希望最终做到的事情也没变：给 AI 一张好的设计或一个设计想法，AI 生成结构化 Design JSON，项目直接导入渲染，人只做最后的调整。

```
Design JSON
     ↓
  Renderer
     ↓
   Canvas
     ↓
Human Adjustment
     ↓
   Export
```

## Roadmap

还在探索的方向：

```
Image → Design JSON（还原度打磨）
Design JSON → Image
AI Editing
Design JSON Schema 版本化与兼容
AI Design Skills
```

- 动态封面：动画系统（20+ 关键帧）已经长在 Schema 里，但出口只有静态 PNG，动图 / 短视频封面的导出还没做
- 模板库继续按平台场景扩充，宁缺毋滥

## 一些没打算做的

账号、云端同步、协作、内置 AI 接口——都和"零后端、全本地、JSON 即设计"这个前提冲突，短期内不会出现在这个仓库里。数据想要带走？「我的模板」支持整库导出成一个 JSON 文件，放在你自己的网盘里就是备份。

## 类似产品

Recombyn:  https://github.com/recombyn/zuoge,  https://recombyn.com/,  AI 操作一个设计编辑器

HyCanvas: https://github.com/hyscaler/HyCanvas  Free, self-hostable, AI-native design software for creating graphics, social posts, and more, with no paywalls or watermarks.  https://hycanvas.com/

Tela: https://github.com/heyimjames/tela  Tela — a fast, local-first, open-source design canvas for social & ad creatives. A brandable, self-hostable Figma/Canva alternative. No account, no backend. React + Zustand + Tailwind.

## License

项目当前处于开发阶段，License MIT。


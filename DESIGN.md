---
version: "0.4.0"
name: kai-brand-design
description: "A quiet, content-first interface system with a cool-white content canvas, a soft gray side rail, and a coral reference primary. Product accents stay stable across skins."
colors:
  mainBackground: "#F7F9FC"
  sideBackground: "#F3F5F8"
  primary: "#FF5A4D"
  # 默认皮肤（light）角色值；深夜（dark）/纯净皮肤的同角色值见 tokens/skins.json
  canvas: "#F7F9FC"
  surface: "#FAFAFB"
  elevated: "#FFFFFF"
  overlay: "#F1F2F4"
  glassSurface: "#FFFFFF@0.72"
  glassStrong: "#FFFFFF@0.87"
  glassBorder: "black@0.07"
  hairline: "black@0.055"
  textPrimary: "#1C1C22"
  textSecondary: "#5A5A62"
  textMuted: "#77747D"
  warning: "#B07514"
  accentKaiting: "#FF5A4D"
  accentKaijuan: "#EA580C"
typography:
  fontFamily: "system default (no ThemeData.fontFamily pin)"
  fallback: []
  pageTitle: { size: "26-28", weight: 700, tracking: -0.15 }
  heroDesktop: { size: 38, weight: 800, tracking: -0.8 }
  heroImmersive: { size: "28-34", weight: 800, tracking: -0.55 }
  titleLarge: { weight: 700, tracking: -0.1 }
  rowTitle: { size: 13.5, weight: 600 }
  rowSubtitle: { size: 11.5, weight: 400, color: "{colors.textSecondary}" }
  sectionLabel: { size: 12.5, weight: 600, color: "{colors.textSecondary}" }
  navLabel: { size: 10.5, weight: "600-700" }
  chipLabel: { size: 12, weight: "600-700" }
rounded:
  control: 10
  menu: 12
  card: 14
  sheet: 18
  dialog: 20
  pill: 999
  tooltip: 8
spacing:
  x1: 4
  x2: 8
  x3: 12
  x4: 16
  x6: 24
  x8: 32
  pageGutter: { compact: 16, medium: 24, wide: 32 }
components:
  buttonFilled: { shape: pill, minSize: 36, bg: "foreground@0.045", fg: accent, iconSize: 17 }
  toolbarButton: { height: 32, shape: pill, label: "12 w600 secondary", icon: 16 }
  iconButton: { size: 40, shape: circle, icon: 20 }
  dialog: { maxWidth: 520, confirmMaxWidth: 400, radius: "{rounded.dialog}", padding: "20h/24v" }
  sheet: { maxWidth: 760, radiusTop: "{rounded.sheet}", handle: "38x4", handleColor: "secondary@0.38-0.45" }
  optionSheet: { maxWidth: 560 }
  menu: { width: "hug, min 160 / max 280", radius: "{rounded.menu}", paddingV: 4, adaptiveBelow: 680 }
  menuRow: { height: "36 anchored / 52 sheet", icon: "17/22 anchored · 19/24 sheet", label: "13.5 anchored · 14 sheet", selected: "foreground@0.055 + accent + check 16/18" }
  listRow: { minHeight: 54, leading: 32, title: "{typography.rowTitle}", subtitle: "{typography.rowSubtitle}" }
  checkRow: { leading: "checkbox icon 20, accent filled / muted hollow" }
  settingsGroup: { radius: "{rounded.card}", fill: "surfaceContainerLow@0.72", border: "{colors.hairline}", dividerIndent: 14 }
  textField: { radius: "{rounded.control}", fill: subtle, focusBorder: "2px accent", padding: "14h/14v isDense" }
  slider: { track: 3, thumbRadius: 6, overlay: "accent@0.12 r14" }
  switch: { track: "40x24", thumb: 18, motion: "160ms easeOutCubic" }
  checkbox: { radius: 5, border: "1.4px", checked: "accent + onAccent check" }
  chip: { height: 32, radius: "{rounded.pill}", selected: "accent@0.09" }
  sidebarRow: { height: 38, padding: "10h/2v", icon: 18, iconSlot: 32, label: 13.5, selected: "accent@0.10 capsule", radius: "{rounded.control}", hover: "foreground@0.045" }
  sideRail: { width: "216 medium / 236 wide", surface: "GlassSurface strong + chromeSurface; default base #F3F5F8", padding: "10/12/10/12", brand: "17 w800 -0.35", brandMark: "optional 28 + gap 8", sectionLabel: "10.5 w800 muted +0.8, pad 10/13/10/3" }
  navBar: { height: "56 / embedded 46", surface: "GlassSurface strong + chromeSurface", icon: 21, label: "{typography.navLabel}" }
  appShell: { defaultCanvasBase: "#F7F9FC", defaultSideBase: "#F3F5F8", allSkins: "gradient canvas → canvasHighlight → overlay, stops 0/0.46/1; strong glass chrome", extendBody: true, contentBottomPad: "140 mobile / 96 desktop" }
  snackbar: { behavior: floating, surface: "overlay no border", radius: "{rounded.pill}", width: "hug content max viewport-40", padding: "18h/11v", text: "14 w600", duration: "1.6s", bottom: "36 >=420w / 18 narrow" }
  tooltip: { surface: "overlay + border", radius: "{rounded.tooltip}", padding: "10h/7v", delay: "450ms", show: "3s" }
  emptyState: { maxWidth: 420, icon: 30, title: "16 w600", note: "12 secondary" }
  spinner: { size: 24, stroke: 2 }
  scrollbar: { width: 5, thumb: "secondary@0.30 / hover 0.55" }
  linearProgress: { color: accent, track: transparent }
---

# Kai Brand Design System

## Overview

安静、内容优先的玻璃界面。界面退后，内容（专辑封面、书页、歌词）是主角；深度只来自 hairline 细线与玻璃浮面，**Material elevation 全局禁用，没有商量**。

品牌分两层：本文件与仓库根目录是**品牌层**（通用 token 与规则）；`products/<product>/` 是**产品层**（开听、开卷各自的 L0 与沉浸页模式）。

**Key Characteristics:**

- **基础色板 × 产品强调色正交**——浅色基准使用右侧冷白、左侧浅灰和珊瑚参考主色；产品强调色在 L0 选择，切换皮肤时保持不变。
- **字重驱动层级**——壳层 w600→w700、内容展示可 w800 + primary→secondary→muted 颜色档表达主次，不靠字号堆叠；w900 全局禁用；**禁止钉死 `.SF Pro Text`**。
- **组件只读语义层**——任何组件不得硬编码颜色/透明度/圆角字面量，否则换皮肤（纯净皮肤 blur=0）即破。
- **0.5 字号网格**——壳层字号只取 10.5/11.5/12.5/13.5 等半档值。

## Colors

### Base Palette（浅色基准）

- **mainBackground** `#F7F9FC` — 右侧主内容与阅读区域。
- **sideBackground** `#F3F5F8` — 左侧导航与辅助栏。
- **primary** `#FF5A4D` — 规范参考主色；选中、进度、焦点与主操作，不用于大面积页面背景。

### Surface Ramp（每皮肤四档）

- **canvas** — 页面底色，坡道起点。
- **surface** — 卡片与常驻面。
- **elevated** — 抬升面（选中卡、封面卡）。
- **overlay** — 浮层底（菜单、Snackbar）。
- 三皮肤值见 `tokens/skins.json`；纯净皮肤 shadow=transparent、blur=0，组件读 token 则免模糊免投影免费获得。

### Glass（浮面 token）

- **glassSurface** / **glassStrong** — 浮面填充；浮面一律 strong + border + token 阴影 ×shadowScale。
- **glassBorder** — 浮面描边；**hairline** — 分隔线，直接使用，禁止再乘衰减系数。

### Text（三档，不再衰减）

- **textPrimary** `#1C1C22`（默认皮肤）— 标题、行标题、正文。
- **textSecondary** `#5A5A62` — 副题、元信息、未选导航；`bodySmall` 默认染此色是特性。
- **textMuted** `#77747D` — 占位、序号、弱提示；禁用态 = secondary@0.38（规范档，不得自造）。

### Accent（产品轴，见 `tokens/accents.json`）

- 通用参考主色为 **primary** `#FF5A4D`；产品强调色由 L0 选择，并在默认、纯净、深夜皮肤间保持一致。
- **accentKaiting** `#FF5A4D` 珊瑚（6 预设 + 自定义派生）；**accentKaijuan** `#EA580C` 暖橙（5 预设，单值模型）。
- 强调色只用于**选中 / 进度 / 主操作**，同一区域最多一个主强调；低透明度派生只取 `derivedAlphas.selection`（chip 9%、指示器 10–14%、列表选中 3.5%）。
- onAccent 规则：亮度估算，深底白字、浅底 `#1C1C22`。

### Semantic

- **error** — `colorScheme.error`（seed 生成，不设常量）；**warning** `#B07514`（light）/ `#E3AC45`（dark）。
- 禁止 `Colors.orangeAccent`/`redAccent` 之类硬编码状态色。

## Typography

### Font Family

**平台默认系统字体**——`ThemeData` 不设置 `fontFamily`，不钉 `.SF Pro Text`，不打包字体文件。中英文混排不额外加空格。

### Hierarchy

| Token | Size | Weight | Tracking | Use |
|---|---|---|---|---|
| heroDesktop | 38 | 800 | −0.8 | 沉浸页桌面 hero（内容层扩展） |
| pageTitle | 26–28 | 700 | −0.15 | 页标题、设置页头（壳层） |
| heroImmersive | 28–34 | 800 | −0.55 | 沉浸头 / 移动 hero / 正在播放曲名 27 |
| titleLarge | 阶梯 | 700 | −0.1 | 对话框标题（壳层） |
| rowTitle | 13.5 | 600–700 | 0 | 行标题、导航项 |
| sectionLabel | 12.5 | 600 | 0 | 分区/子块标签（secondary 色） |
| rowSubtitle | 11.5 | 400–500 | 0 | 副题、元信息（secondary/muted，行高 1.45） |
| chipLabel | 12 | 600–700 | 0 | chip、小按钮 |
| navLabel | 10.5 | 选中700/未选600 | 0 | 底栏标签 |

### Principles

- 壳层负字距缓和（title ≈ −0.1～−0.25）；内容层沉浸标题才用 −0.55 / −0.8。正文与行文字不加字距。
- 层级靠字重与颜色档，不靠字号堆叠——壳层正文/UI 集中在 11.5–14 区间；壳层标题封顶 w700。
- 展示层级（hero、曲名、歌词行 20–22）是内容层扩展，字重仍封顶 w800；**展示文字不得用 accent**；同页艺人名/元信息走壳层三档（hero 艺人名定档 15 w600 secondary）。
- 截断：行标题单行省略；说明文字最多两行；对话框标题单行省略。

## Layout

### Spacing System

- 页面级间距只取 `{spacing.x1–x8}`（4 的倍数刻度）；组件内部微调可用半档 2/6/10。
- 页边距 16/24/32（compact/medium/wide）；设置类内容限宽 920 居中；分区间距 28（移动可收 22）。
- 内容底部留白：移动壳 140 / 桌面 96（末行不被底栏/dock 遮挡）。

### Grid & Container

- **壳层画布（强制）**：默认浅色主题以右侧 `#F7F9FC`、左侧 `#F3F5F8` 为底层基色；三主题均使用 `canvas → canvasHighlight → overlay` 对角渐变，常驻 chrome 均走 strong 玻璃。纯净主题通过 token 自动得到零模糊、零投影。
- 桌面壳：侧栏（216 medium / 236 wide）+ 内容区；移动壳：底栏 + **`extendBody: true`** 内容延伸到玻璃下。
- **桌面主窗尺寸（强制）**：默认打开 **1280×800**，最小 **1024×700**（逻辑/content 像素）；小屏按 visibleFrame−80 钳制且不得低于 min。三产品一致；辅窗属产品层。
- 常驻 chrome（侧栏 / 底栏）统一使用 `GlassSurface` strong + `chromeSurface`；材质参数只由当前皮肤 token 决定。
- 标题栏透明叠加在最上方不占布局；macOS 避让交通灯 38pt（自定义 chrome 78），Windows 自绘 44px。
- 完整壳规范见 `patterns/app-shell.md`。

### Whitespace Philosophy

留白即分隔——优先用间距与 hairline 分区，不用色块与卡片套卡片。分组卡片只在设置类页面出现，内容页保持画布平坦（透出壳层画布）。

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| 0 画布 | 三主题对角渐变；默认主题使用浅色基底 | 壳层页面底 |
| 1 分隔 | hairline 1px | 行间、区间分隔 |
| 2 卡片 | hairline 描边（设置卡）或 token 阴影 ×shadowScale（封面 ≥96px） | 设置分组卡、封面 |
| 3 浮面 / chrome | strongSurface + border + token 阴影 ×shadowScale + 模糊 | 对话框、菜单、弹层、**侧栏、底栏**、迷你播放器 |

### Decorative Depth

- 浮面与常驻 chrome 模糊；**重复的行/卡片不模糊**（`blur: false`）；blur=0 的皮肤自动跳过 BackdropFilter。
- 阴影只来自 glass token 并乘 `effects.shadowScale`；纯净皮肤 shadowScale=0 自动无影。
- 禁止手写「侧栏免模糊」——仅皮肤 token 驱动。

## Shapes

### Border Radius Scale

| Token | Value | Use |
|---|---|---|
| control | 10 | 按钮、输入框、侧栏选中胶囊、小卡 |
| menu | 12 | 锚定菜单、音量弹层、错误横幅 |
| card | 14 | 设置分组卡、封面、网格卡 |
| sheet | 18 | 底部弹层顶角、桌面浮动 dock |
| dialog | 20 | 对话框 |
| pill | 999 | chips、开关轨道、进度滑杆 thumb |

- 封面圆角跟随 card 14——不允许另设封面档；拟物内容造型（开听黑胶）是内容层例外，登记在产品规范。

## Components

> 每个组件的完整解剖/状态表/交互规则见 `components/*.md`（8 篇规范文件）；本节是代理速查，列出每一个组件及其关键锚点值。命名中性（`GlassSurface`、`MenuButton`…），产品实现加前缀（开听 `Sound*`、开卷 `App*`）。

### Surfaces — 表面原语

- **`glass-surface`** — 一切浮面的原语：`base` / `strong` 两档填充（取自 `glass.surface` / `glass.strongSurface`）+ `glass.border` 描边 + token 阴影 × `effects.shadowScale` +（可选）`glass.blur` 模糊。blur=0 的皮肤（纯净）自动跳过 BackdropFilter，shadowScale=0 自动免投影。浮面按场景用模糊，**重复的行/卡片不模糊**。
- **`settings-group`** — r14 + `surfaceContainerLow@72%` + hairline 描边；行间 hairline 分隔，左右缩进 14，自动插入（不手动写 Divider）；子块标签 12.5 w600 secondary，padding 14/12/14/2，左对齐。
- **皮肤预览卡** — 124×80、r12、hairline 描边；内部 0.74×0.64 elevated 小卡（r7）+ accent 短条 13×4 + 两条假文字（0.78/0.52 宽、3.5 高、primaryText@0.22 / secondaryText@0.32）；选中 accent 2px 描边 + 下方标签 accent w700，未选 hairline + secondary w500（12px）。不放 check 角标。
- **主题色板** — 28px 圆点横排，间距 12；选中 1.5px primary 描边 + 中心 8px onAccent 圆点；未选无描边（自定义彩虹渐变点外带 hairline）。不放 check 图标、不加投影。

### Buttons — 安静胶囊，不是实心大色块

- **`button-filled`** — pill 胶囊、最小 36、padding 14h/7v、labelMedium w700、图标 17。状态：default 前景 4.5% 底 + accent 前景 / hover 7.5% / pressed 11% / disabled 前景 2.2% + secondary 38%。主操作一屏一个。
- **`button-outlined`** — 同形制；default 前景 2.5% / hover 5.5% / pressed 8.5%；前景 accent，用于次操作。
- **`button-text`** — 同形制；default 透明 / hover 5.5% / pressed 8.5%；前景 accent，最低姿态。
- **`button-destructive`** — error@8% 底 + error 文字；hover 12% / pressed 16% / disabled 2.5%。
- **`icon-button`** — 40×40 正圆、图标 20、前景 primary（选中 accent）；hover 前景 6.5% / pressed 10%；focus 2px accent 描边。
- **`toolbar-button`** — 高 32 胶囊、padding 8–10h；文字 12 w600 secondary、图标 16 secondary；工具条触发器专用。
- **`fab`** — 正圆、前景 4.5% 底 + accent 图标；无 elevation。
- **横规则**：状态过渡 160ms easeOutCubic、NoSplash；对话框按钮区 OverflowBar 右对齐，间距 10、主按钮在右；同一区域最多一个主强调；**禁止实心 accent 大色块、禁止自定义圆角（一律 pill）、禁止阴影**。

### Inputs — 文本 / 滑杆 / 开关 / 勾选 / 下拉

- **`text-field`** — r10（control 档）、subtle 填充（前景 4.5% light / 5.5% dark）、内边距 14h/14v isDense；常态 border 描边，聚焦 2px accent，错误 error（聚焦 2px）；标签 secondary w600，浮动标签 accent w700；提示文字 secondary 70%。搜索框可有独立更矮的紧凑变体，但填充/圆角/聚焦规则不变。**禁止 M1 风格无填充下划线输入框**。
- **`slider`** — 轨道高 3：激活 accent / 未激活 border；拇指半径 6 圆、accent；按压 overlay accent 12% 半径 14；不显示数值标签。只读进度条：轨道 3、无拇指或拇指 5、复用同语言。**禁止拇指带阴影/elevation**。
- **`switch`** — 轨道 40×24 pill 999，无描边；拇指 18 正圆，轨道内边距 3。选中：轨道 accent、拇指 onAccent；未选：轨道 border、拇指 secondary。颜色 + 位置过渡 160ms easeOutCubic；触控目标 ≥40（透明 padding 外扩）。**禁止 `Switch.adaptive`**——macOS/iOS 得到系统绿 Cupertino 开关，且不吃主题。
- **`checkbox`** — 圆角 5、1.4px border 描边；选中 accent 底 + onAccent 勾；未选 muted 空心；compact 密度。
- **`radio`** — 选中 accent 填充；compact 密度。
- **`dropdown`** — 输入部分同 text-field；下拉菜单 elevated 面 + r12 + border，同菜单规范。

### Choice & Selection — 选择条 / CheckRow

- **`choice-strip`** — 高度 32 pill 胶囊条、padding 11h、间距 8、可选图标 15（前导 6）。状态：default 前景 2.5% 底 + secondary 字 w600 / selected accent 9% 底 + accent 字 w700 / disabled 前景 2.5% + muted 45%。横排滚动（默认）或 Wrap；选中过渡 160ms；单选语义。阅读器覆盖在内容上的场景：前景可取内容色板（已登记分叉），形状/高度/间距不变。**优先用 ChoiceStrip**；仅在语义必须是 Chip 控件时用 Material Chip（Theme 层已配成同语言：pill、无 checkmark、选中 accent 9%）。
- **`check-row`** — list-row 变体：leading 为 20px 勾选图标（选中 accent 实心 / 未选 muted 空心）；`selected` 与勾选态一致；点击整行切换。

### Lists — 列表行 / 菜单行

- **`list-row`** — 解剖 `[leading 槽32] 10 [标题/副题] 10 [trailing]`；minHeight 54（设置页行 64 / 紧凑 58）、padding 14h/6v；标题 13.5 w600 单行省略、副题 11.5 secondary 单行省略。trailing：value 12.5 secondary w500 + chevron 19 secondary，或 Switch（右内边距 6）。状态：default 透明 / hover 前景 3.5% / focus 5% / selected 5%（可叠加 accent 内容）/ disabled muted 50%。destructive 行：图标与文字 error 色。整行 InkWell 透明叠加可点，无 onTap 不注册 button 语义；**行内不出现 elevation / 阴影**。
- **`check-row`** — 见 §Choice & Selection。
- **`menu-row`** — 高 36（锚定）/ ≥52（底部弹层）；锚定图标 17 槽宽 22、标签 13.5 w600、padding 12h；弹层图标 19 槽宽 24、标签 14 w600、padding 20h；副题 11.5 secondary；选中 foreground 5.5% 底 + accent 前景 + 右侧 check（锚定 16 / 弹层 18）；destructive error 前景；`dividerBefore` → hairline（indent 对齐行 padding：锚定 12 / 弹层 16）。菜单标题：12–12.5 w600 secondary + hairline 下分隔。

### Overlays — 对话框 / 底部弹层 / 菜单

- **`dialog`** — 强玻璃面 r20、maxWidth 520（确认/提示类收至 400）、barrier 38%（浅）/ 62%（深）、视口内边距 20h/24v。标题区 padding 24/22/20/16、titleLarge w800 单行省略；内容区 padding 24/0/24/20、bodyMedium secondary；**内容超高时内容区独立滚动，对话框整体不滚**（shrink-wrap：maxHeight = 视口 − 48，内容区 Flexible + SingleChildScrollView）。按钮区 20/14/20/20 OverflowBar 右对齐间距 10；destructive 确认用 destructive 样式；文本输入流 autofocus + Enter 提交。**禁止 AlertDialog 默认灰面与 elevation、禁止对话框内第二个 accent 主按钮**。
- **`sheet`** — 顶角 r18、把手 38×4 胶囊（secondary 38–45%，距顶 7）、maxWidth 760 居中（简单选项列表 560）、阴影 blur 28 × scale offset (0,−8)、barrier 同对话框。表面 strongSurface + border，内容区顶 padding 14 避把手。
- **`menu`** — 同一 `MenuAction<T>` 数据模型（value / label / icon / subtitle? / selected / enabled / destructive / dividerBefore）两种自适应呈现：<680px → 底部弹层（行高 ≥52、padding 20h、最高 72% 视口、SafeArea）；≥680px → 锚定玻璃弹层（宽度随内容 min 160 / max 280、禁止定宽、壳上下 padding 4、r12、阴影 blur 24 offset (0,8)、自动上下翻避免越界）。触发器 `MenuButton`：默认 more_horiz 21px 图标钮（支持自定义 child、hover 前景 4%），无可用项时禁用。**禁止裸用 Material PopupMenuButton 默认样式；禁止菜单内嵌套滚动视图不收缩；禁止锚定菜单定宽**。

### Navigation — 底栏 / 侧栏

- **`nav-bar`（底栏）** — 高 **56**（上方有产品条时嵌入态 **46**）+ SafeArea；三主题统一走 `GlassSurface` strong + `chromeSurface`；顶 hairline。纯净主题通过 token 自动零模糊、零投影。图标 21、标签 10.5；底栏常驻，内容底留白按壳规范。
- **`side-rail`（侧栏）** — 宽 **216（medium）/ 236（wide）**，禁止其它定宽。三主题统一走 `GlassSurface` strong + `chromeSurface`；右 hairline。默认主题底层基色为 `#F3F5F8`。外框 padding `10/12/10/12`；品牌字 17 w800 −0.35；行高 38、圆角 10、图标 18、标签 13.5、选中 accent 10% 胶囊。
- 壳层画布与双端布局总规见 `patterns/app-shell.md`。

### Feedback — 轻提示 / 空态 / 加载 / 滚动条 / 进度条

- **`snackbar`** — floating 居中**胶囊**（`StadiumBorder` / pill 档）、**无描边**、仅轻阴影（elevation 3 / black@0.22）；面用 snackBarTheme / inverseSurface@0.94；文字 **14 w600** 居中（最多 2 行）；内边距 18h/11v；**宽度随文案 hug**（max = 视口 − 40，宿主左右 margin 20）；≥420px 距底 36、窄窗距底 18；时长 **1.6s**，**新提示顶掉旧提示**（clearSnackBars），下滑关闭；默认纯文本。**禁止**固定 220 定宽与 hairline border 方条；**不带 margin 的 fixed Snackbar 会导致断言失败**。
- **`tooltip`** — overlay 面 + border、r8、10h/7v 内边距、bodySmall 染 primary；延迟 450ms、展示 3s；message 为空时不挂 tooltip；中文文案，仅桌面指向设备依赖它。
- **`empty-state`** — 30px muted 描线图标（weight 300）/ 14 / 16 w600 标题（primary 88%）/ 6 / 12 说明（muted 76%，行高 1.45）；maxWidth 420，居中；可选 tonal 行动钮。
- **`spinner`** — 24px、stroke 2；accent 由 progressIndicatorTheme 供给，**禁止硬编码颜色**。按钮内 busy 态用 onPrimary 色。
- **`scrollbar`** — 5px 胶囊、thumb secondary 30%（hover 55%）、轨道透明；桌面常驻可显，触屏淡入淡出。
- **`linear-progress`** — accent 色、轨道透明；只表达确定/不确定进度，**不用作分隔线**。

## Do's and Don'ts

### Do

- 改设计先改本仓库规范（连同 changelog），运行 `make validate test build check`，再通过 `kai_design.py sync` 同步产品。
- 用文字三档与 derivedAlphas 规范档表达弱化和禁用。
- 新组件先判层级归属：通用进品牌层，单产品进 `products/<product>/`，第二个产品需要时提升。
- 用壳层缓和负字距、字重阶梯（壳层 ≤w700 / 内容展示 ≤w800）、0.5 字号网格；字体走平台默认。

### Don't

- 不硬编码颜色、透明度、圆角字面量——包括"临时"的 `Colors.grey`、`withValues(alpha: 0.72)` 式衰减。
- 不用 w900；不给展示文字（hero、曲名、歌词）染 accent；不给 hairline 再乘衰减。
- 不用平台自适应开关（`Switch.adaptive` / Cupertino 开关）；不用 Material elevation。
- 不在品牌层写产品特数值（accents 登记表、L0 接口、参考实现指针除外）。
- 不自造断点——壳切换只由窗口分级驱动。
- 不把内容页整面实色底盖住壳层画布；不绕过主题语义入口自行决定侧栏/底栏材质。

## Responsive Behavior

### Breakpoints

| Class | 判定 | 壳 |
|---|---|---|
| compact | 移动：宽 ≤600 或 高 <600 | 底栏 |
| medium | 桌面 宽 <1100；移动 宽 <1000 | 侧栏（桌面）/ 底栏（移动） |
| wide | 桌面 宽 ≥1100；移动 宽 ≥1000 | 侧栏 |
| mobileShell | 非桌面且（宽 <820 或 高 <600） | 移动信息架构 |

### Touch Targets

- 按钮 ≥36、图标钮 ≥40、列表行 ≥46、chip 高 32；桌面密度可降但 hover/focus 态必须存在。

### Collapsing Strategy

- 菜单/选择器窄屏（<680）落底部弹层，宽屏锚定弹层或行内展开；移动端长列表选择用 CompactSettingsSheet（选项行高 ≥48、选中行尾 check）。
- 桌面平台任何尺寸保持桌面信息架构——窗口临时变矮不得退化成手机导航。
- 桌面主窗默认 **1280×800**（wide）、最小 **1024×700**（medium）；见 `layoutMetrics.desktopWindow`。

## Iteration Guide

1. **改设计 = 先改规范**：连同 changelog 记录，再逐产品移植；禁止先在 App 里改样式再口头同步。
2. **token 稳定承诺**：已发布皮肤的标准 token 不修改；新外观只能新增皮肤。
3. **层级归属**：通用 → 品牌层；单产品 → 产品层；复用出现即提升并记 changelog。
4. **品牌层中立**：不出现产品特数值与行为（accents 登记表、L0 接口、参考实现指针除外）。
5. **分叉必登记**：产品偏离写进 `products/<product>/divergences.md` 带理由；偏离不是错误，不登记才是。
6. **构建交付**：token 变更 → `make validate test build check` → 审查 `dist/manifest.json` → 同步产品快照。
7. **命名中性**：规范用 `GlassSurface`/`MenuButton`，产品实现加前缀（开听 `Sound*`、开卷 `App*`）。

## Known Gaps

- 图标规范未成文（尺寸档 16–24、rounded 风格一致性仍在代码惯例层）。
- 状态色缺 success token（开听以来源色兼任，已登记 divergence D2）。
- 动效阶梯只有 uiFast 140 / uiStandard 160 / paletteTransition / ambient 四档，覆盖不全（弹层 260ms 等散见实现）。
- 产品层完整度不均：开听已有 `patterns/now-playing.md`；开卷 reader/bookshelf 模式待"回开卷"阶段从代码提炼。
- 深色对比度（WCAG）未设验收锚点。

## Agent Prompt Guide

- 写样式前：先读本文件 frontmatter 与 `tokens/primitives.json`，再查 `implementation/acceptance-checklist.md` 的可断言锚点。
- 实现新产品：`tokens/accents.json` 登记产品轴 → 建 `products/<product>/README.md` → 按 `implementation/flutter.md` 生成主题层与 kit → 按验收清单自检。
- 产品特有页面（开听正在播放、开卷阅读器）先查 `products/<product>/patterns/`，不要凭品牌层自由发挥。
- 快速取色：中性色看当前皮肤坡道；强调色看产品轴；状态色 error/warning 见 Colors §Semantic；其余一律 `derivedAlphas`。

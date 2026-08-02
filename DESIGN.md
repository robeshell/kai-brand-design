---
version: "0.6.2"
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
  success: "#237A57 light / #5BC89A dark"
  warning: "#9A640D light / #E3AC45 dark"
  error: "#B42318 light / #FF7B72 dark"
  info: "#2563A6 light / #73A7E8 dark"
  accentKaiting: "#FF5A4D"
  accentKaijuan: "#EA580C"
typography:
  fontFamily: "system default (no ThemeData.fontFamily pin)"
  roles: [displayLarge, pageTitle, sectionTitle, title, body, bodySecondary, label, caption, captionSmall]
  profiles:
    appleMobile: { body: "17/22pt", target: "44pt" }
    androidMobile: { body: "16/24sp", target: "48dp" }
    macDesktop: { body: "13/16pt", target: "28pt" }
    windowsDesktop: { body: "14/20px", target: "32px" }
    linuxDesktop: { body: "14/20px", target: "32px" }
  weights: { body: 400, emphasis: 500, strong: 600 }
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
  buttonFilled: { shape: pill, height: "{platformProfile.metrics.controlHeight}", label: "{platformProfile.typeScale.label}" }
  toolbarButton: { height: "{platformProfile.metrics.compactControlHeight}", label: "{platformProfile.typeScale.label}" }
  iconButton: { hitTarget: "{platformProfile.metrics.minimumInteractiveTarget}", shape: circle }
  dialog: { maxWidth: 520, confirmMaxWidth: 400, radius: "{rounded.dialog}", padding: "20h/24v" }
  sheet: { maxWidth: 760, radiusTop: "{rounded.sheet}", handle: "38x4", handleColor: "secondary@0.38-0.45" }
  optionSheet: { maxWidth: 560 }
  menu: { width: "hug, min 160 / max 280", radius: "{rounded.menu}", paddingV: 4, adaptiveBelow: 680 }
  menuRow: { height: "{platformProfile.metrics.controlHeight}", label: "{platformProfile.typeScale.label}", selected: "foreground@0.055 + accent + check" }
  listRow: { height: "{platformProfile.metrics.listRowSingle/listRowDouble}", title: "{platformProfile.typeScale.listTitle}", subtitle: "{platformProfile.typeScale.bodySecondary}" }
  checkRow: { leading: "checkbox icon 20, accent filled / muted hollow" }
  settingsGroup: { radius: "{rounded.card}", fill: "surfaceContainerLow@0.72", border: "{colors.hairline}", dividerIndent: 14 }
  textField: { radius: "{rounded.control}", fill: subtle, height: "{platformProfile.metrics.controlHeight}", text: "{platformProfile.typeScale.inputText}", focusBorder: "2px accent, no outer outline" }
  slider: { track: 3, thumbRadius: 6, overlay: "accent@0.12 r14" }
  switch: { track: "40x24", thumb: 18, motion: "160ms easeOutCubic" }
  checkbox: { radius: 5, border: "1.4px", checked: "accent + onAccent check" }
  chip: { hitTarget: "{platformProfile.metrics.minimumInteractiveTarget}", radius: "{rounded.pill}", selected: "accent@0.09" }
  sidebarRow: { height: "{desktopProfile.metrics.controlHeight}", label: "{desktopProfile.typeScale.body}", selected: "accent@0.10 capsule", radius: "{rounded.control}", hover: "foreground@0.045" }
  sideRail: { width: "216 medium / 236 wide", surface: "GlassSurface strong + chromeSurface; default base #F3F5F8", row: "{desktopProfile.metrics.controlHeight}", label: "{desktopProfile.typeScale.body}" }
  navBar: { target: "{mobileProfile.metrics.minimumInteractiveTarget}", surface: "GlassSurface strong + chromeSurface", label: "{mobileProfile.typeScale.captionSmall}" }
  appShell: { defaultCanvasBase: "#F7F9FC", defaultSideBase: "#F3F5F8", allSkins: "gradient canvas → canvasHighlight → overlay, stops 0/0.46/1; strong glass chrome", extendBody: true, contentBottomPad: "140 mobile / 96 desktop" }
  snackbar: { behavior: floating, surface: "overlay no border", radius: "{rounded.pill}", width: "hug content max viewport-40", padding: "18h/11v", text: "14 w600", duration: "1.6s", bottom: "36 >=420w / 18 narrow" }
  tooltip: { surface: "overlay + border", radius: "{rounded.tooltip}", padding: "10h/7v", delay: "450ms", show: "3s" }
  emptyState: { maxWidth: 420, icon: "{iconography.sizes.display}", title: "{platformProfile.typeScale.sectionTitle}", note: "{platformProfile.typeScale.bodySecondary}" }
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
- **精致字重**——标题 / 选中封顶 **w600**；行与按钮 **w500**；**禁止 w700+**；**禁止钉死 `.SF Pro Text`**。
- **组件只读语义层**——任何组件不得硬编码颜色/透明度/圆角字面量，否则换皮肤（纯净皮肤 blur=0）即破。
- **平台排版**——组件只使用语义角色，字号、行高和交互尺寸由当前平台 Profile 提供。壳层字号只取平台 token 表整档值，禁止 .5 半档硬编码。

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
- **textSecondary** `#5A5A62` — 副题、元信息、未选导航；`bodySecondary` 默认使用此色。
- **textMuted** `#77747D` — 占位、序号、弱提示；禁用态 = secondary@0.38（规范档，不得自造）。

### Accent（产品轴，见 `tokens/accents.json`）

- 通用参考主色为 **primary** `#FF5A4D`；产品强调色由 L0 选择，并在默认、纯净、深夜皮肤间保持一致。
- **accentKaiting** `#FF5A4D` 珊瑚（6 预设 + 自定义派生）；**accentKaijuan** `#EA580C` 暖橙（5 预设，单值模型）。
- 强调色只用于**选中 / 进度 / 主操作**，同一区域最多一个主强调；低透明度派生只取 `derivedAlphas.selection`（chip 9%、指示器 10–14%、列表选中 3.5%）。
- onAccent 规则：亮度估算，深底白字、浅底 `#1C1C22`。

### Semantic

- **success / warning / error / info** 使用 `derivedAlphas.status` 的浅色/深色语义值。
- 状态同时使用文字或图形，不只靠颜色；禁止硬编码框架自带 accent 状态色。

## Typography

### Font Family

**平台默认系统字体**——`ThemeData` 不设置 `fontFamily`，不钉 `.SF Pro Text`，不打包字体文件。中英文混排不额外加空格。

### Semantic roles

组件只请求语义角色（`display / pageTitle / sectionTitle / title / body / secondary / label / caption / small`），字号、行高和交互尺寸由当前平台 Profile 提供。

| Profile | 正文 | 页标题 | 交互目标 |
|---|---:|---:|---:|
| iOS / iPadOS | 17/22pt | 28/34pt | 44pt |
| Android | 16/24sp | 28/36sp | 48dp |
| macOS | 13/16pt | 22/26pt | 28pt |
| Windows | 14/20px | 28/36px | 32px |
| Linux | 14/20px | 24/32px | 32px |

### Principles

- 字重只用 400 / 500 / 600；**禁止 w700+**；标题与选中 **w600**，行/按钮 **w500**。
- 移动端支持系统字体缩放；文本变大时控件允许增高，禁止裁切。
- 层级靠颜色与字号，不靠粗体。
- 组件中不写平台字号——完整数值、来源和组件映射见 `foundations/typography.md`。

## Layout

### Spacing System

- 页面级间距只取 `{spacing.x1–x8}`（4 的倍数刻度）；组件内部微调可用半档 2/6/10。
- 页边距、分区间距读取当前平台 Profile；内容宽度只使用 `reading` 680、`form` 720、`standard` 920、`wide` 1200。
- 内容底部留白：移动壳 140 / 桌面 96（末行不被底栏/dock 遮挡）。

### Grid & Container

- **壳层画布（强制）**：默认浅色主题以右侧 `#F7F9FC`、左侧 `#F3F5F8` 为底层基色；三主题均使用 `canvas → canvasHighlight → overlay` 对角渐变，常驻 chrome 均走 strong 玻璃。纯净主题通过 token 自动得到零模糊、零投影。
- 桌面壳：侧栏（216 medium / 236 wide）+ 内容区；移动壳：底栏 + **`extendBody: true`** 内容延伸到玻璃下。
- 主从布局详情栏宽 360–520，默认 420；低于分栏阈值时进入独立详情页。
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

> 组件定义以 `components/*.md` 和 `contracts/components.json` 为准，实际形态与交互在 Viewer 中验收。命名中性（`GlassSurface`、`MenuButton`…），产品实现加前缀。

### Surfaces — 表面原语

- **`glass-surface`** — 一切浮面的原语：`base` / `strong` 两档填充（取自 `glass.surface` / `glass.strongSurface`）+ `glass.border` 描边 + token 阴影 × `effects.shadowScale` +（可选）`glass.blur` 模糊。blur=0 的皮肤（纯净）自动跳过 BackdropFilter，shadowScale=0 自动免投影。浮面按场景用模糊，**重复的行/卡片不模糊**。
- **`settings-group`** — r14 + `surfaceContainerLow@72%` + hairline 描边；行间 hairline 分隔，左右缩进 14，自动插入（不手动写 Divider）；子块标签使用当前 Profile 的 `caption` w600，padding 14/12/14/2，左对齐。
- **皮肤预览卡** — 124×80、r12、hairline 描边；内部 0.74×0.64 elevated 小卡（r7）+ accent 短条 13×4 + 两条假文字（0.78/0.52 宽、3.5 高、primaryText@0.22 / secondaryText@0.32）；选中 accent 2px 描边 + 下方标签 accent w600，未选 hairline + secondary w500（12px）。不放 check 角标。
- **主题色板** — 28px 圆点横排，间距 12；选中 1.5px primary 描边 + 中心 8px onAccent 圆点；未选无描边（自定义彩虹渐变点外带 hairline）。不放 check 图标、不加投影。

### Icons — 图标

- 尺寸只用 `compact` 16、`regular` 20、`large` 24、`display` 32；描边粗细读取 `iconography.opticalStroke`。
- 图标本身与命中区分离：命中区始终读取当前平台 Profile，不能通过放大图形伪造可点击范围。

### App Bars & Tabs — 页面入口

- 页面标题读取当前 Profile 的 `pageTitle`；工具栏按钮读取 `compactControlHeight`。
- 标签栏只表达同级视图切换；选中态使用文字强调和短指示线，不使用大面积实心色块。

### Platform Component Rule

- 每个组件先确定语义，再映射 `appleMobile`、`androidMobile`、`macDesktop`、`windowsDesktop`、`linuxDesktop` 的平台能力；完整表见 `components/platform-component-map.md`。
- 品牌统一 accent、状态色、图标语言、表面层级、文字角色和动效气质。
- 平台保留控件结构、具体尺寸、焦点、按压、键盘、返回、按钮顺序、安全区域和窗口行为。
- 系统已有组件时不自研替代；系统没有等价能力且多个产品真实复用时，才进入通用组件层。

### Core Components

- **Buttons**：使用当前平台 Button / IconButton / Toolbar Item；高度和命中目标读取 Profile；同一区域最多一个主要操作。
- **Inputs & Selection**：保留文本编辑、输入法、自动填充和平台选择控件；品牌只覆盖信息层级与语义色。
- **Navigation**：iPhone Tab Bar、Android Navigation Bar/Rail、macOS Sidebar、Windows NavigationView、Linux Sidebar/View Switcher 共享目的地，不共享解剖。
- **Dialogs, Menus & Sheets**：按平台和任务选择 Sheet、Dialog、ContentDialog、Menu、Popover 或 Flyout，不能只按宽度统一成 Bottom Sheet。
- **Status & Feedback**：统一状态模型，使用平台对应的进度、通知和短反馈；完整规则见 `patterns/status-system.md`。

### APP Structures

- 通用流程只保留 `patterns/structures/content-browser.md` 和 `task-workspace.md`。
- 搜索、筛选、详情、加载、空状态和错误是结构内的状态，不单独抽象成万能页面。
- 阅读器、正在播放、媒体匹配等只在产品规范中定义。

## Do's and Don'ts

### Do

- 改设计先改本仓库规范（连同 changelog），运行 `make validate test build check`，再通过 `kai_design.py sync` 同步产品。
- 用文字三档与 derivedAlphas 规范档表达弱化和禁用。
- 新组件先判层级归属：通用进品牌层，单产品进 `products/<product>/`，第二个产品需要时提升。
- 用缓和负字距、精致字重（封顶 w600；行/按钮 w500）、整数字号网格；字体走平台默认。

### Don't

- 不硬编码颜色、透明度、圆角字面量——包括"临时"的 `Colors.grey`、`withValues(alpha: 0.72)` 式衰减。
- 不用 w900；不给展示文字（hero、曲名、歌词）染 accent；不给 hairline 再乘衰减。
- 不把一个平台的控件结构强制覆盖其他平台；不移除必要的系统焦点、触控反馈和辅助输入能力。
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

### Interaction Targets

- iOS / iPadOS 44pt；Android 48dp；macOS 28pt；Windows / Linux 32px。
- 视觉尺寸可小于命中区；组件高度和列表行读取当前 Profile，见 `foundations/layout-and-density.md`。

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
8. **结构从简**：普通流程只使用内容浏览或任务工作台；搜索、详情和状态是结构中的模式，不新增万能页面。

## Known Gaps

- 当前目录覆盖基础、平台组件映射、两个 APP 主结构、通用状态系统和三产品页面映射。
- 书页排版、漫画像素、媒体元数据和封面/海报素材属于产品内容，不由通用 UI 规范控制。
- 新增组件或页面类型必须先进入结构化契约和 Viewer 示例，再允许产品实现使用。

## Agent Prompt Guide

- 写样式前：先读本文件 frontmatter 与 `tokens/primitives.json`，再查 `implementation/acceptance-checklist.md` 的可断言锚点。
- 实现新产品：`tokens/accents.json` 登记产品轴 → 建 `products/<product>/README.md` → 按 `implementation/flutter.md` 生成主题层与 kit → 按验收清单自检。
- 实现普通流程：先选 `patterns/structures/content-browser.md` 或 `task-workspace.md`，状态统一查 `patterns/status-system.md`。
- 产品特有页面（开听正在播放、开卷阅读器）先查 `products/<product>/patterns/`，不要凭品牌层自由发挥。
- 快速取色：中性色看当前皮肤坡道；强调色看产品轴；状态色看 `derivedAlphas.status`；其余一律使用已登记 token。

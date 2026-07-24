---
version: "0.2.2"
name: kai-brand-design
description: "A quiet, content-first glass interface system for the kai product family (kaiting music player, kaijuan reader). Neutral ramps and rules are unified; product accents are deliberately not."
colors:
  # 默认皮肤（light）角色值；深夜（dark）/纯净皮肤的同角色值见 tokens/skins.json
  canvas: "#F7F7F8"
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
  fontFamily: ".SF Pro Text"
  fallback: ["PingFang SC", "Microsoft YaHei", "Noto Sans CJK SC", "Roboto", "sans-serif"]
  pageTitle: { size: "26-28", weight: 800, tracking: -0.55 }
  heroDesktop: { size: 38, weight: 800, tracking: -0.8 }
  heroImmersive: { size: "28-34", weight: 800, tracking: -0.55 }
  titleLarge: { weight: 800, tracking: -0.25 }
  rowTitle: { size: 13.5, weight: 600 }
  rowSubtitle: { size: 11.5, weight: 400, color: "{colors.textSecondary}" }
  sectionLabel: { size: 12.5, weight: 600, color: "{colors.textSecondary}" }
  navLabel: { size: 10.5, weight: "600-800" }
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
  dialog: { maxWidth: 520, radius: "{rounded.dialog}", padding: "20h/24v" }
  sheet: { maxWidth: 760, radiusTop: "{rounded.sheet}", handle: "38x4" }
  optionSheet: { maxWidth: 560 }
  menu: { width: 252, radius: "{rounded.menu}" }
  listRow: { minHeight: 54, leading: 32, title: "{typography.rowTitle}", subtitle: "{typography.rowSubtitle}" }
  settingsGroup: { radius: "{rounded.card}", fill: "surfaceContainerLow@0.72", border: "{colors.hairline}", dividerIndent: 14 }
  switch: { track: "40x24", thumb: 18, motion: "160ms easeOutCubic" }
  chip: { height: 32, radius: "{rounded.pill}", selected: "accent@0.09" }
  sidebarRow: { minHeight: 40, selected: "accent@0.10 capsule", radius: "{rounded.control}" }
  navBar: { height: 56, icon: 21, label: "{typography.navLabel}" }
  snackbar: { behavior: floating, width: "220 centered >=420w", duration: "1.4s" }
  emptyState: { maxWidth: 420, icon: 30 }
  spinner: { size: 24, stroke: 2 }
---

# Kai Brand Design System

## Overview

安静、内容优先的玻璃界面。界面退后，内容（专辑封面、书页、歌词）是主角；深度只来自 hairline 细线与玻璃浮面，**Material elevation 全局禁用，没有商量**。

品牌分两层：本文件与仓库根目录是**品牌层**（通用 token 与规则）；`products/<product>/` 是**产品层**（开听、开卷各自的 L0 与沉浸页模式）。

**Key Characteristics:**

- **皮肤 × 强调色正交**——皮肤（默认/纯净/深夜 + 跟随系统伪皮肤）拥有明暗与全部中性色板；强调色是独立产品轴。品牌统一中性系统与规则，**故意不统一主色**（开听珊瑚、开卷暖橙各自保留）。
- **字重驱动层级**——w600→w700→w800 + primary→secondary→muted 颜色档表达主次，不靠字号堆叠；w900 全局禁用。
- **组件只读语义层**——任何组件不得硬编码颜色/透明度/圆角字面量，否则换皮肤（纯净皮肤 blur=0）即破。
- **0.5 字号网格**——壳层字号只取 10.5/11.5/12.5/13.5 等半档值。

## Colors

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

- **accentKaiting** `#FF5A4D` 珊瑚（6 预设 + 自定义派生）；**accentKaijuan** `#EA580C` 暖橙（5 预设，单值模型）。
- 强调色只用于**选中 / 进度 / 主操作**，同一区域最多一个主强调；低透明度派生只取 `derivedAlphas.selection`（chip 9%、指示器 10–14%、列表选中 3.5%）。
- onAccent 规则：亮度估算，深底白字、浅底 `#1C1C22`。

### Semantic

- **error** — `colorScheme.error`（seed 生成，不设常量）；**warning** `#B07514`（light）/ `#E3AC45`（dark）。
- 禁止 `Colors.orangeAccent`/`redAccent` 之类硬编码状态色。

## Typography

### Font Family

`.SF Pro Text`，回退 `PingFang SC → Microsoft YaHei → Noto Sans CJK SC → Roboto → sans-serif`。不打包字体文件，全平台系统字体。中英文混排不额外加空格。

### Hierarchy

| Token | Size | Weight | Tracking | Use |
|---|---|---|---|---|
| heroDesktop | 38 | 800 | −0.8 | 沉浸页桌面 hero（内容层扩展） |
| pageTitle | 26–28 | 800 | −0.55 | 页标题、设置页头 |
| heroImmersive | 28–34 | 800 | −0.55 | 沉浸头 / 移动 hero / 正在播放曲名 27 |
| titleLarge | 阶梯 | 800 | −0.25 | 对话框标题 |
| rowTitle | 13.5 | 600–700 | 0 | 行标题、导航项 |
| sectionLabel | 12.5 | 600 | 0 | 分区/子块标签（secondary 色） |
| rowSubtitle | 11.5 | 400–500 | 0 | 副题、元信息（secondary/muted，行高 1.45） |
| chipLabel | 12 | 600–700 | 0 | chip、小按钮 |
| navLabel | 10.5 | 选中800/未选600 | 0 | 底栏标签 |

### Principles

- 负字距只取三档：≥30px −0.8；24–29 −0.55；titleLarge −0.25。正文与行文字不加字距，**负字距档位不可发明**。
- 层级靠字重与颜色档，不靠字号堆叠——壳层正文/UI 集中在 11.5–14 区间。
- 展示层级（hero、曲名、歌词行 20–22）是内容层扩展，字重仍封顶 w800；**展示文字不得用 accent**；同页艺人名/元信息走壳层三档（hero 艺人名定档 15 w600 secondary）。
- 截断：行标题单行省略；说明文字最多两行；对话框标题单行省略。

## Layout

### Spacing System

- 页面级间距只取 `{spacing.x1–x8}`（4 的倍数刻度）；组件内部微调可用半档 2/6/10。
- 页边距 16/24/32（compact/medium/wide）；设置类内容限宽 920 居中；分区间距 28（移动可收 22）。
- 内容底部留白：移动壳 140 / 桌面 96（末行不被底栏/dock 遮挡）。

### Grid & Container

- 桌面壳：侧栏（216 medium / 236 wide）+ 内容区；移动壳：底栏 + `extendBody` 内容延伸到玻璃下。
- 标题栏透明叠加在最上方不占布局；macOS 避让交通灯 38pt（自定义 chrome 78），Windows 自绘 44px。

### Whitespace Philosophy

留白即分隔——优先用间距与 hairline 分区，不用色块与卡片套卡片。分组卡片只在设置类页面出现，内容页保持画布平坦。

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| 0 画布 | 无阴影无边框 | 页面背景、内容 |
| 1 分隔 | hairline 1px | 行间、区间分隔 |
| 2 卡片 | hairline 描边（设置卡）或 token 阴影 ×shadowScale（封面 ≥96px） | 设置分组卡、封面 |
| 3 浮面 | strongSurface + border + token 阴影 ×shadowScale + 模糊 | 对话框、菜单、弹层、底栏、迷你播放器 |

### Decorative Depth

- 模糊按面选用：浮面模糊；**重复的行/卡片不模糊**（`blur: false`）；blur=0 的皮肤自动跳过 BackdropFilter。
- 阴影只来自 glass token 并乘 `effects.shadowScale`；纯净皮肤 shadowScale=0 自动无影。

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

### Buttons

- **`button-primary`** — accent 填充圆角 control，onAccent 文字 w700；主操作一屏一个。
- **`button-tonal`** — subtle 填充 + primary 文字，用于次操作与空态行动钮。
- **`button-destructive`** — error@0.08 填充 + error 文字（hover 0.12 / pressed 0.16 / disabled 0.025，取自 derivedAlphas.destructive）。
- **icon-button** — 触控目标 ≥40，图标 19–20，secondary 色。

### Dialogs & Sheets & Menus

- **`dialog`** — maxWidth 520、r20、barrier light 38%/dark 62%；标题 titleLarge w800 单行省略。
- **`sheet`** — r18 顶角、把手 38×4、maxWidth 760 居中；简单选项列表 560；barrier 同对话框。
- **`menu`** — 窄屏（<680）落底部弹层，宽屏锚定 252px r12 玻璃弹层；菜单项图标 20，destructive 项 error 色。

### List Rows

- **`list-row`** — 标题 13.5 w600 + 副题 11.5 secondary 堆叠；leading 32px 槽位（图标 18–20）；trailing value 12.5 secondary + chevron 19；minHeight 54，设置行桌面 ≥64。
- 选中态：行内 check / accent 文字，**禁止整行填充块**（侧栏除外，见下）。

### Navigation

- **`sidebar-row`** — 选中 = accent@0.10 胶囊（r10）+ accent 图标 + w700 标题；未选 secondary。
- **`nav-bar`** — 56px 玻璃底栏，图标 21，标签 10.5（选中 w800 primary / 未选 w600 secondary）。

### Inputs & Forms

- **`text-field`** — r10，filled subtle；聚焦描边 2px accent；错误描边 error（聚焦 2px）。
- **`switch`** — 轨道 40×24 pill、拇指 18；on = accent 轨 + onAccent 拇指，off = border 轨 + secondary 拇指；160ms easeOutCubic；**禁用平台自适应开关**。

### Chips & Tags

- **`choice-strip`** — pill 32 高，选中 accent@9% 填充 + accent 文字 w700；未选 secondary w600；可横向滚动或 Wrap。

### Settings

- **`settings-group`** — r14 + surfaceContainerLow@72% + hairline 描边；行间 hairline 缩进 14 自动插入；子块标签 12.5 w600 secondary 左对齐（14/12/14/2 内边距）。
- **皮肤预览卡** 124×80 r12：画布色 + 0.74×0.64 elevated 小卡 + accent 短条 + 假文字行；选中 accent 2px 描边 + 标签 accent w700，不放 check 角标。
- **主题色板** 28px 圆点：选中 1.5px primary 描边 + 8px onAccent 圆心；不用 check 图标。

### Feedback

- **`snackbar`** — floating；≥420px 窗口居中 220 窄条距底 36，窄窗左右 16 距底 18；1.4s，新提示顶掉旧提示，下滑关闭。
- **`empty-state`** — 图标 30 muted + 16 w600 标题 + 12 说明（secondary），maxWidth 420，可选 tonal 行动钮。
- **`spinner`** — 24px、stroke 2；按钮内 busy 用 onPrimary 色。

## Do's and Don'ts

### Do

- 改设计先改本仓库规范（连同 changelog），再移植到各 App；token 改值后重跑 `viewer/build.py`。
- 用文字三档与 derivedAlphas 规范档表达弱化和禁用。
- 新组件先判层级归属：通用进品牌层，单产品进 `products/<product>/`，第二个产品需要时提升。
- 用负字距三档、字重阶梯、0.5 字号网格。

### Don't

- 不硬编码颜色、透明度、圆角字面量——包括"临时"的 `Colors.grey`、`withValues(alpha: 0.72)` 式衰减。
- 不用 w900；不给展示文字（hero、曲名、歌词）染 accent；不给 hairline 再乘衰减。
- 不用平台自适应开关（`Switch.adaptive` / Cupertino 开关）；不用 Material elevation。
- 不在品牌层写产品特数值（accents 登记表、L0 接口、参考实现指针除外）。
- 不自造断点——壳切换只由窗口分级驱动。

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

## Iteration Guide

1. **改设计 = 先改规范**：连同 changelog 记录，再逐产品移植；禁止先在 App 里改样式再口头同步。
2. **token 稳定承诺**：已发布皮肤的标准 token 不修改；新外观只能新增皮肤。
3. **层级归属**：通用 → 品牌层；单产品 → 产品层；复用出现即提升并记 changelog。
4. **品牌层中立**：不出现产品特数值与行为（accents 登记表、L0 接口、参考实现指针除外）。
5. **分叉必登记**：产品偏离写进 `products/<product>/divergences.md` 带理由；偏离不是错误，不登记才是。
6. **同步三处**：token 变更 → 重跑 `viewer/build.py` → 核对本 DESIGN.md frontmatter 与正文。
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

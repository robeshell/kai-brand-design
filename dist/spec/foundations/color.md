# 配色规范（主视觉）

> token 值见 `tokens/skins.json`、`tokens/accents.json`、`tokens/primitives.json → derivedAlphas`。本篇定义**角色与规则**。

## 配色哲学

**冷白主内容 + 浅灰侧栏 + 珊瑚参考主色**：左右区域用轻微色温与明度差分开，强调色只负责选中、进度和主操作；内容（封面 / 书页 / 专辑图）仍是色彩的主角。

## 浅色基础色板

| 角色 | Token | 值 | 用途 |
|---|---|---|---|
| 主内容背景 | `basePalette.mainBackground` | `#F7F9FC` | 右侧页面与主要阅读区域 |
| 侧栏背景 | `basePalette.sideBackground` | `#F3F5F8` | 左侧导航与辅助栏 |
| 参考主色 | `basePalette.primary` | `#FF5A4D` | 规范站默认与未指定产品时的交互强调 |

背景与强调色属于不同轴：冷白与浅灰负责左右区域分工，产品强调色负责交互状态。切换默认、纯净、深夜皮肤不得改变当前强调色。

推论规则：

1. **不用高饱和色块堆叠元素**。层次通过冷白/浅灰的轻微差异、留白和 hairline 表达；强调色不用于大面积页面背景。
2. **elevation 全局禁用**（`surfaceTint: transparent`、`applyElevationOverlayColor: false`）——Material 的色调叠加会把中性面弄脏。
3. **避免中灰画布**（#F0–#F5 段）——在白卡片旁显"脏"。画布用坡道端点值。

## 语义角色

### 表面坡道（皮肤提供，四档）

| 角色 | 用途 |
|---|---|
| `canvas` | 页面底布（Scaffold 背景） |
| `surface` | 常驻面：列表区、导航底栏、卡片 |
| `elevated` | 抬升坡道：选中卡、封面卡等内容层；强浮层材质由 `GlassSurface` 选择 |
| `overlay` | 反馈坡道：Snackbar、Toast、Tooltip 的语义角色；实现仍通过 `GlassSurface` base 表达 |

### 玻璃 token（浮面的半透明语言）

`surface`（默认/深夜约 85%）用于一般玻璃面；`strongSurface`（约 90–92%）用于对话框等强浮层；`chromeSurface`（默认约 88%、深夜 90%、纯净 100%）用于侧栏/底栏等常驻 chrome。`border` / `innerHighlight` / `shadow` / `blur` / `strongBlur` 配套使用。

半透明面上的 `primaryText` / `secondaryText` 必须在叠黑与叠白最坏背景下仍 ≥ 4.5:1（由 `validate` 强制）。禁止再把 chrome 不透明度写死在实现里。

### 浮层组件规则

浮层不是统一的中灰色实心块，而是按任务使用玻璃语义：

- `Dialog` / `Sheet` / `Menu` / `Popover` 使用 `strongSurface` + `strongBlur`，并配合 `border`、`innerHighlight` 与 `shadow`；这是需要与页面分离的强浮层。
- `SnackBar` / `Toast` / `Tooltip` 作为短反馈使用 `surface` + `blur`，并配合 `border` 与 `shadow`；不得直接把 `overlay` 中灰色作为常规浮层背景。
- 纯净皮肤在 `blur=0` 时自动退化为不透明实色面；这是玻璃组件的降级行为，不另造一套视觉。
- `elevated` / `overlay` 是表面坡道中的语义角色；实现不得把它们当作绕过玻璃组件的任意灰色填充。

### 文字三档

`primaryText` / `secondaryText` / `mutedText`。**层级 = 字重 × 颜色**，且在 canvas 上对比度必须 **primary ≥ secondary > muted**，三档对常用表面均 ≥ 4.5:1。muted 用于占位、序号、弱元信息，不得用于正文。

禁用前景使用 `derivedAlphas.disabledForeground`（`secondary@0.55`），禁止再乘更低 alpha。inactive 控件在 WCAG 上可有例外，但仍需可辨认。

### 派生 alpha（全品牌唯一来源）

边框、hairline、subtle 填充、状态层、选中、barrier、destructive 的透明度**只能**取自 `tokens/primitives.json → derivedAlphas`。每个 key 为**单值**（或 light/dark 各一），禁止 `0.05~0.06` 区间。实现中发现缺档 → 提规范变更，不私造数值。

### 状态色

状态固体色在 `tokens/primitives.json → statusColors`（不再挂在 derivedAlphas 下）：

| 状态 | 浅色 | 深色 | 用途 |
|---|---|---|---|
| success | `#237A57` | `#5BC89A` | 已完成、有效、同步成功 |
| warning | `#9A640D` | `#E3AC45` | 有风险但仍可继续 |
| error | `#B42318` | `#FF7B72` | 失败、无效、危险操作 |
| info | `#2563A6` | `#73A7E8` | 中性系统信息 |

状态必须同时有文字或图形，不能只靠颜色。产品来源色与内容取色不能代替状态色。

## 强调色规则

- 通用参考主色为珊瑚红 `#FF5A4D`；强调色轴与皮肤正交。
- 产品强调色登记于 `tokens/accents.json`。选定产品与强调色后，切换任何皮肤都必须保持该色。
- 只用于：**选中态、进度、主操作**。同区最多一个主强调。
- **`onAccent` 必须写入每个 preset**，与 accent 对比 ≥ 4.5:1；禁止运行时仅凭亮度估算绕过。
- 低透明度派生固定：指示器 12%、chip 选中 9%、列表选中 4%、focus 环填充 16%；焦点环几何见 `focusRing`（宽 2、偏移 2）。

## 高对比外观

系统 `prefers-contrast: more` 时叠 `appearance.increasedContrast`：玻璃面不透明、hairline/border 加强，次要文案优先升为 primary。不单独成皮肤。

## 皮肤规则

- 皮肤拥有明暗；**跟随系统**是伪皮肤（解析规则见 `tokens/skins.json → systemPseudoSkin`）。
- 实色皮肤（纯净）：`blur=0` 跳过 BackdropFilter、`shadowScale=0` 无投影——组件读 token 即免费获得，**禁止**在组件里写 `if (skin == 'pure')`。
- 皮肤切换过渡：`paletteTransitionMs`（420/240/520），只对颜色与透明度做插值，不动布局。

## 内容层配色（扩展点）

产品可在内容区持有独立色板（开卷：阅读主题纸白/羊皮纸/深色/纯黑与批注高亮色；开听：封面氛围渐变）。规则：

1. 内容色板不影响 chrome 配色（两者独立切换）；
2. 覆盖在内容上的 chrome 可从内容色板取色以保证可读性（开卷阅读器工具条），此为**已登记分叉**；
3. 内容色板仍须遵守"不用色块切分层级"与对比度直觉（正文/背景对比 ≥ 7:1 的目标）。

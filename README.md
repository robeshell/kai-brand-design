# 品牌设计体系（Design DSL）

**specVersion: 0.6.2（draft）** — APP 规范输出 Mobile / Desktop 两套组件，并用五个平台基准约束系统行为。

**AI 代理入口**：[`DESIGN.md`](DESIGN.md)（Stitch 格式单文件蒸馏）；本 README 是完整索引。

本仓库是品牌跨产品的**唯一设计事实源**（single source of truth），分两层：

- **品牌层**（仓库根目录）：跨产品通用的 token、基础规范、组件规范、模式规范——不出现任何产品特有的数值与行为；
- **产品层**（`products/<product>/`）：各产品自己的规范——L0 登记、可生成的 `tokens.json`、产品特有模式和分叉登记。

各 App（开听 kaiting、开卷 kaijuan…）的主题代码是本规范的下游产物：改设计先改这里，再移植到各 App。

## 工程入口

本仓库可以独立完成验证、构建和产物检查，不依赖三个产品仓库：

```sh
make validate   # token 结构、颜色、唯一性与引用关系
make test       # 生成器与 manifest 单元测试
make build      # 生成 dist/ + Viewer
make check      # 验证提交的生成产物没有过期
make sync       # 显式同步 dist 快照到同级产品仓库
```

正式交付物位于 `dist/`：

| 产物 | 消费方 |
|---|---|
| `dist/manifest.json` | 版本、token digest、文件 SHA-256 与尺寸 |
| `dist/tokens/kai.tokens.json` | 平台无关的完整 token bundle |
| `dist/spec/` | 品牌、组件、模式、产品覆盖层与实现规范的可发布快照 |
| `dist/flutter/<product>/brand_tokens.g.dart` | 开听、开卷 Flutter 原始常量 |
| `dist/css/kaigua/brand.generated.css` | 开刮 CSS variables |
| `dist/viewer/` | 可发布的设计验收工作台 |

## 这套规范是什么形态

给 AI 与工程师共同消费的设计 DSL，两部分组合：

- **JSON 承载 token 值**（`tokens/`）：颜色、圆角、间距、动效、alpha 派生——精确数值，可直接引用与脚本校验。
- **Markdown 承载规则**（`foundations/` `components/` `patterns/` `products/`）：组件解剖、状态行为、自适应逻辑、禁止事项——"值"表达不了的意图。
- **参考实现指针**：规范可标注各产品仓库中的落地位置（ground truth），但品牌层的规则本身不得依赖某个产品才成立。

## 分层模型

```
L0 产品轴（per-product 变量）  → products/<product>/tokens.json + README.md
L1 基础 token                  → tokens/primitives.json（组件 Profile / 平台基准 / 间距 / 圆角 / 动效）
L2 语义 token                  → tokens/skins.json（皮肤预设：表面坡道 + 玻璃 + 动效）
L3 组件视觉                    → Mobile / Desktop
L4 平台适配                    → iOS / Android / macOS / Windows / Linux 行为与系统服务
L5 APP 结构                    → patterns/structures/（内容浏览 / 任务工作台）
                                 patterns/status-system.md（加载 / 进度 / 空 / 错误 / 结果）
                                 products/<product>/patterns/*.md（产品特有）
```

核心决策：

1. **基础色板 × 产品强调色正交**。浅色基准统一为右侧冷白、左侧浅灰和珊瑚参考主色；产品强调色在产品层选择，并在三种皮肤间保持一致。
2. **跟随系统是伪皮肤**：按平台亮度解析到具体皮肤，是规范的一等公民而非特例。
3. **内容层主题是 L0 扩展点**：开卷的阅读主题、开听的播放页风格，规范定义接口不定义值。
4. **elevation 全局禁用**：深度只来自 hairline 与玻璃阴影 token。
5. **组件只读语义层**：任何组件不得硬编码颜色 / 透明度 / 圆角数值——否则换皮肤（如纯净皮肤的 blur=0）会破。

## 目录（品牌层）

| 路径 | 内容 |
|---|---|
| `tokens/primitives.json` | Mobile / Desktop 组件 Profile、五个平台基准、基础色板、间距、圆角、动效和状态色 |
| `tokens/skins.json` | 皮肤预设（默认 / 纯净 / 深夜）+ 跟随系统解析规则 |
| `tokens/accents.json` | 各产品强调色轴登记表（品牌层唯一允许出现产品名的地方） |
| `schema/*.schema.json` | token JSON Schema；编辑器提示与外部消费者契约 |
| `dist/` | 可发布、带 manifest 与哈希的构建产物 |
| `foundations/color.md` | 主视觉配色规范（配色哲学、语义角色、强调色规则） |
| `foundations/platform-profiles.md` | 平台 Profile 的选择、接口与迁移规则 |
| `foundations/typography.md` | 语义字号角色及 Mobile / Desktop 映射 |
| `foundations/iconography.md` | 图标来源、尺寸、双态、方向与无障碍 |
| `foundations/layout-and-density.md` | 平台控件高度、点击目标、列表行与间距基准 |
| `foundations/shape-and-motion.md` | 形状 / 阴影 / 分隔 / 动效 / 交互状态层 |
| `components/_template.md` | 组件规范模板（新组件按此编写） |
| `components/*.md` | 按钮、对话框、弹层与菜单、列表行、chips、导航、输入、反馈 |
| `components/platform-component-map.md` | Mobile / Desktop 组件与五个平台行为适配边界 |
| `patterns/app-shell.md` | 桌面侧栏 ↔ 移动底栏、标题栏、窗口分级 |
| `patterns/overlays.md` | 浮层层级、barrier、sheet↔popover 自适应 |
| `patterns/settings-page.md` | 设置页布局（分组卡片 + 皮肤预览卡） |
| `patterns/forms-and-validation.md` | 表单结构、错误、提交和未保存修改 |
| `patterns/structures/` | 两个通用 APP 主结构：内容浏览、任务工作台 |
| `patterns/status-system.md` | 加载、进度、空数据、无结果、错误与后台任务 |
| `implementation/flutter.md` | DSL → Flutter 实现指南（runbook） |
| `implementation/token-pipeline.md` | JSON token → Flutter / CSS 生成产物与漂移校验 |
| `implementation/acceptance-checklist.md` | 验收清单（可断言的锚点值） |
| `implementation/adoption-matrix.md` | 品牌版本 → 各产品规范与实现的采用状态；品牌升级时必须同步 |
| `viewer/` | 规范可视化页（见下） |

## 目录（产品层）

| 路径 | 内容 |
|---|---|
| `products/kaiting/` | 开听：L0 登记、产品 Token、正在播放/资料库模式、分叉登记 |
| `products/kaijuan/` | 开卷：L0 登记、封面 Token、阅读器与书架模式 |
| `products/kaigua/` | 开刮：L0 登记、产品 Token 文件、设置页分叉登记 |
| `spec/viewer-content.json` | 规范站页面标题与说明的结构化内容源 |

新产品接入：`tokens/accents.json` 登记强调色轴 → 建 `products/<product>/README.md`（L0 + 前缀 + 内容层扩展点）→ 按需补产品 patterns。

## 可视化（viewer）

`viewer/` 是 Vite + TypeScript 实现的规范文档站。页面标题与说明读取 `spec/viewer-content.json`，Token 与产品变量读取构建后的 bundle；页面结构和交互演示保留在 Viewer 代码中。构建结果同时写入 `dist/viewer/` 和 `docs/`：

- 左侧按「开始 / 基础规范 / 组件 / APP 结构 / 状态与反馈 / 产品与工程」分组；
- 颜色、字体、间距、按钮、输入框等主题各自独立成页；
- 组件先映射平台原生能力，再说明品牌允许覆盖的部分；
- 页面只保留内容浏览和任务工作台两个主结构；
- 通用状态独立覆盖加载、进度、空数据、无结果、部分完成和错误；
- 通用规范不带产品上下文，具体产品差异集中在独立页面；
- 点击颜色或变量表格，可查看具体数值与源文件。

首次运行先安装 Viewer 依赖。页面直接消费 `dist/tokens/kai.tokens.json`，统一构建命令会先生成 Token bundle，再编译 Viewer：

```bash
npm install --prefix viewer
make build
make check
```

本地调试使用 `npm run dev --prefix viewer`。改 Token 值不重跑统一构建 = Viewer 与规范脱节，`make check` 会阻止提交过期产物。

产品运行时 Token 同样由 JSON 生成，见 `implementation/token-pipeline.md`。

## 用本规范实现一个新产品（给 AI 的入口）

1. 读本文件，确定产品 L0：从 `tokens/accents.json` 取（或新增）强调色轴，确定内容层扩展点，建 `products/<product>/README.md`。
2. 按 `implementation/flutter.md` 的步骤生成主题层与组件 kit。
3. 按 `implementation/acceptance-checklist.md` 自检：先过可断言数值，再过人工巡检清单。
4. 产品特有的页面模式写进 `products/<product>/patterns/`，不要塞进品牌层。

## 治理规则

- **改设计 = 先改规范**：连同 changelog 记录，再逐产品移植。禁止先在某个 App 里改样式再口头同步。
- **采用状态必须显式**：品牌版本升级时，同一提交更新 `implementation/adoption-matrix.md`；未落地的产品必须标为「进行中」或「待处理」并写清缺口，禁止用模糊的「基本对齐」代替。
- **生成产物禁止手改**：`dist/`、Flutter `brand_tokens.g.dart` 与 CSS `brand.generated.css` 只能由 `tool/kai_design.py` 产生；产品兼容 API 必须引用生成值。
- **层级归属**：两个以上产品会用的 → 品牌层；单产品的 → 产品层。第二个产品需要某产品层组件/模式时，把它**提升**到品牌层并记 changelog。产品层只能引用/扩展品牌层，**不得覆盖品牌 token**；产品特有数值登记在 `products/<product>/tokens.md` 并说明为何不是通用 token。
- **品牌层中立**：品牌层不出现产品特有的数值与行为（`tokens/accents.json` 登记表、L0 接口定义、参考实现指针除外）。
- **token 稳定承诺**：已发布皮肤的标准 token 不修改（老用户的视觉基线不变）；新外观只能新增皮肤。
- **分叉登记**：产品可以偏离规范（例：开卷阅读器 chrome 取色自阅读主题而非皮肤），但必须在 `products/<product>/divergences.md` 登记 divergence 与理由，防止无声漂移。
- 规范使用中性命名（`GlassSurface`、`MenuButton`…）；各产品实现可加前缀（开听 `Sound*`、开卷 `App*`）。
- 版本：品牌层 specVersion 与各产品层各自记 changelog；产品层变更不影响品牌层版本号。

## Changelog（品牌层）

- **0.6.2**（2026-07-30）：列表标题独立为 Mobile / Desktop 共用的 14/20、w500，不再借用正文或按钮标签字号。
- **0.6.1**（2026-07-30）：列表标题从正文角色改为更紧凑的 `label` 角色；Mobile 为 16/22、Desktop 为 14/20，保持 w500。
- **0.6.0**（2026-07-29）：新增 Mobile / Desktop 两套实际组件 Profile；五个平台 Profile 改为官方约束与行为适配层；删除五套万能页面，收缩为内容浏览、任务工作台和通用状态系统。
- **0.5.0**（2026-07-29）：建立五套平台 Profile 与生成管线，补齐基础字号、尺寸、组件与产品页面映射。
- **0.1.0**（2026-07-24）：初版落地。由开听 / 开卷收敛实现反向提炼；设置页规范采用开卷的分组卡片 + 皮肤预览卡方案。
- **0.1.1**（2026-07-24）：开听设置页按 `patterns/settings-page.md` 完成改造并反向回填：明确「单页滚动无 tabs」「外观区选择器直接展示」「行规格双端统一（13.5/11.5 堆叠）」「主题色板 28px 圆点无 check 图标」「桌面行内展开的选择器直接放进分组卡」。
- **0.1.2**（2026-07-24）：开关（Switch）组件样式落地：轨道 40×24、拇指 18、accent/border 双态，禁用 `Switch.adaptive`；分组卡片 Column 修正为 stretch（子块标签与选择器左对齐）。
- **0.1.3**（2026-07-24）：设计审计收尾——搜索框 r10 + 聚焦 2px accent；分区标题统一 12.5 w600 secondary；新增 `derivedAlphas.status.warning` token；SnackBar 显式 floating；对话框宽度收敛 520、简单选项列表弹层登记 560；底栏导航标签定档 10.5；正文字号归位 0.5 网格；展示文字禁 accent；文字三档之外禁止再乘 alpha。
- **0.2.0**（2026-07-24）：结构拆分——规范迁入独立仓库，分为品牌层（仓库根）与产品层（`products/`）；新增层级归属与品牌层中立治理规则；侧栏选中锚点明确为 accent 10% 胶囊（r10）。开听产品规范首批落地（见 `products/kaiting/`），开卷产品目录建立。
- **0.2.1**（2026-07-24）：新增 `DESIGN.md`——Google Stitch 格式（9 段）的品牌层单文件蒸馏，作为 AI 代理入口；数值仍以此仓库 tokens/ 与 components/ 为准。
- **0.2.2**（2026-07-24）：`DESIGN.md` 重写对齐 awesome-design-md 实际格式——YAML frontmatter 内嵌 token 块（`{token.path}` 引用语法）+ Overview/Colors/Typography/Layout/Elevation & Depth/Shapes/Components/Do's and Don'ts/Responsive Behavior/Iteration Guide/Known Gaps 段落结构；三仓库（品牌/开听/开卷）格式统一。
- **0.2.3**（2026-07-24）：`DESIGN.md` Components 段全量重写——按功能分 8 组（表面原语/按钮 7 变体/输入 6 控件/选择 2 件/列表 3 种/浮层 3 件/导航 2 件/反馈 6 件），每个组件带完整锚点值与状态映射，与 `components/*.md` 一一对应不再缺漏。
- **0.2.4**（2026-07-24）：开刮（kaigua）接入——`tokens/accents.json` 登记产品轴（默认靛蓝 `#6673C7`）；建立 `products/kaigua/` L0 与分叉登记。
- **0.2.5**（2026-07-26）：锚定菜单改内容撑开（min 160 / max 280，禁止定宽）；行高 46→36、标签 14→13.5、图标 19/24→17/22、行 padding 12h、壳上下 4；窄屏底部弹层规格不变。
- **0.2.6**（2026-07-26）：侧栏 metrics 钉死——宽仅 216/236（废除列表轨 220）；行高 38、padding 10h/2v、图标 18/槽 32、标签 13.5；品牌/外框 padding 与可选分区标题写死；禁止复用 list-row 默认规格。
- **0.2.7**（2026-07-26）：主体框架钉死——壳层画布强制对角渐变（canvas→canvasHighlight→overlay）；侧栏/底栏强制 GlassSurface strong + chromeSurface（废除「模糊可省」软口）；移动 extendBody true；dock 上方产品条仅定接口、属产品层。
- **0.2.8**（2026-07-26）：桌面主窗尺寸钉死——默认打开 **1280×800**、最小 **1024×700**（逻辑像素）；写入 `layoutMetrics.desktopWindow`；三产品 runner 必须一致。
- **0.3.0**（2026-07-26）：设计规范工程化——新增 JSON Schema、统一 `kai_design.py validate/build/check/sync` CLI、正式 `dist/` 交付物与 manifest/SHA-256、生成器单元测试、仓库 CI；产品同步从隐式跨目录写入改为显式消费 `dist` 快照。
- **0.4.0**（2026-07-26）：驱动链路收敛——规范站文案与组件契约改读结构化数据；三个产品建立可校验的产品 Token 与版本锁，进入统一 digest、生成、同步和 CI；建立三主题截图回归与 tag 发布流程；默认主题恢复与其它主题一致的玻璃和渐变规则。
- **0.4.1**（2026-07-28）：SnackBar 轻提示改为居中胶囊——无描边、宽度随文案 hug、内边距 18h/11v、14 w600、时长 1.6s；圆角从 menu(r12) 改为 pill；废止固定 220 定宽与 hairline 方条。参考实现：开听 `showSoundSnackBar`。
- **0.4.2**（2026-07-28）：排版改为平台默认字体——废止钉死 `.SF Pro Text` 与强制 fallback；壳层标题 w700 + 缓和负字距。参考实现：开听 `SoundTheme`。
- **0.4.3**（2026-07-28）：字重通用规则收紧——**标题（含专辑/艺人/正在播放 hero）一律 w700**；**w800 仅**选中态、当前歌词、monogram、队列正在播放行；桌面 hero 28、移动/曲名 24。参考实现：开听标题字重收敛。
- **0.4.4**（2026-07-28）：规范一致性——扫清残留「页头/对话框 w800」「SF Pro 验收项」「曲名 27 w800」表述；**ChoiceStrip 选中 = accent + w700**（颜色强调）；页标题负字距统一 ≈ −0.15～−0.25。
- **0.4.5**（2026-07-28）：**精致字重**——封顶 **w600**；禁止 w700+。标题 / 选中 / monogram = w600；行标题 / 按钮 = w500；歌词当前 w600 / 其余 w400。层级靠颜色与字号。参考实现：开听全局字重收敛。
- **0.4.6**（2026-07-30）：**设置页基准改为「浅灰画布 + 纯白分组卡」**（`patterns/settings-page.md`）——画布浅色 `#F4F5F7`；分组卡 `surfaceContainer` 不透明、**无边框无阴影**；行间分隔线淡化（black@4% / white@5%）；行高 = `listRowSingle`(52)、删除行内副标题（文案迁入弹层）；皮肤预览卡 124×80 Wrap → 104×68 横向轮播；关于区删除品牌头；新增「行首禁止图标徽章」禁令（0.6.2 尝试后回滚）。三端同日落地：开听 `settings_components.dart`、开卷 `settings_components.dart`、开刮 `tokens.css` + `index.css`。
- **0.4.7**（2026-07-30）：**弹层头部收敛 + 说明文案禁令**——底部弹层只留标题（title 档 17/24 w600），副标题删除；设置与弹层内**一律禁止解释性副标题/说明段**（标题自解释，风险操作解释放二次确认对话框）。写入 `components/sheets-and-menus.md` 与 `patterns/settings-page.md` 规则 4。参考实现：开听 `_CompactSettingsSheet`。
- **0.4.8**（2026-07-30）：**描述性副标题全面清除**——禁令细化为「描述性文案禁止；数据/状态值与操作性输入提示（模板语法等）例外」。三端清理：开听（歌词菜单 2 项、WebDAV 证书说明）、开卷（合集排他说明）、开刮（页头副标题 ×3、配置行副标题 ×5、locale 三语同步）。页头副标题（`page-header-sub`）一并废止。
- **0.4.9**（2026-07-30）：**底栏标签 10.5→10**（行高 1.2，`components/navigation.md`）；**设置内页页头定档**——返回钮 + title 档标题同一行、页顶 padding 8（`patterns/settings-page.md`，`SettingsBackButton`），废止裸返回箭头 + 大留白。参考实现：开听 `SoundNavigationBar` / `SoundSettingsBackButton`。
- **0.5.0**（2026-07-30）：**字号网格改为整数档**——废止 0.5 半档，壳层字号只取 token 表整档（10/11/12/13/14/17…）；行标题 13.5→14、行副题/元信息 11.5→11、行尾值与分区标签 12.5→13、底栏标签 10（0.4.9 已先行）。三端代码 .5 硬编码清零（开听 15 处、开卷 11 处、开刮 72 处）；`DESIGN.md` 与 `components/`、`patterns/` 全部对齐。

# 品牌设计体系（Design DSL）

**specVersion: 0.2.0（draft）** — 样式优化进行中，优化结论会回填本规范；回填完成并应用到各产品后升 1.0。

本仓库是品牌跨产品的**唯一设计事实源**（single source of truth），分两层：

- **品牌层**（仓库根目录）：跨产品通用的 token、基础规范、组件规范、模式规范——不出现任何产品特有的数值与行为；
- **产品层**（`products/<product>/`）：各产品自己的规范——L0 登记（强调色轴、内容层扩展点）、产品级 token、产品特有模式（如开听的正在播放、开卷的阅读器）、分叉登记。

各 App（开听 kaiting、开卷 kaijuan…）的主题代码是本规范的下游产物：改设计先改这里，再移植到各 App。

## 这套规范是什么形态

给 AI 与工程师共同消费的设计 DSL，两部分组合：

- **JSON 承载 token 值**（`tokens/`）：颜色、圆角、间距、动效、alpha 派生——精确数值，可直接引用与脚本校验。
- **Markdown 承载规则**（`foundations/` `components/` `patterns/` `products/`）：组件解剖、状态行为、自适应逻辑、禁止事项——"值"表达不了的意图。
- **参考实现指针**：规范可标注各产品仓库中的落地位置（ground truth），但品牌层的规则本身不得依赖某个产品才成立。

## 分层模型

```
L0 品牌轴（per-product 变量）  → products/<product>/README.md：产品名、强调色轴、内容层主题扩展点
L1 基础 token                  → tokens/primitives.json（间距/圆角/动效/字族/alpha）
L2 语义 token                  → tokens/skins.json（皮肤预设：表面坡道 + 玻璃 + 动效）
L3 组件规范                    → components/*.md（解剖 + metrics + 状态 + token 映射）
L4 模式规范                    → patterns/*.md（通用：外壳 / 浮层 / 设置页 / 窗口分级）
                                 products/<product>/patterns/*.md（产品特有）
```

核心决策：

1. **皮肤 × 强调色正交**。皮肤拥有明暗与全部中性色板；强调色是独立品牌轴。品牌统一的是中性系统与规则，**不是主色**（开听珊瑚、开卷暖橙各自保留）。
2. **跟随系统是伪皮肤**：按平台亮度解析到具体皮肤，是规范的一等公民而非特例。
3. **内容层主题是 L0 扩展点**：开卷的阅读主题、开听的播放页风格，规范定义接口不定义值。
4. **elevation 全局禁用**：深度只来自 hairline 与玻璃阴影 token。
5. **组件只读语义层**：任何组件不得硬编码颜色 / 透明度 / 圆角数值——否则换皮肤（如纯净皮肤的 blur=0）会破。

## 目录（品牌层）

| 路径 | 内容 |
|---|---|
| `tokens/primitives.json` | 间距、圆角、动效、字族、触控目标、断点、派生 alpha 常量、状态色 |
| `tokens/skins.json` | 皮肤预设（默认 / 纯净 / 深夜）+ 跟随系统解析规则 |
| `tokens/accents.json` | 各产品强调色轴登记表（品牌层唯一允许出现产品名的地方） |
| `foundations/color.md` | 主视觉配色规范（配色哲学、语义角色、强调色规则） |
| `foundations/typography.md` | 排版规范（字重驱动层级、负字距、字族栈、展示层级） |
| `foundations/shape-and-motion.md` | 形状 / 阴影 / 分隔 / 动效 / 交互状态层 |
| `components/_template.md` | 组件规范模板（新组件按此编写） |
| `components/*.md` | 按钮、对话框、弹层与菜单、列表行、chips、导航、输入、反馈 |
| `patterns/app-shell.md` | 桌面侧栏 ↔ 移动底栏、标题栏、窗口分级 |
| `patterns/overlays.md` | 浮层层级、barrier、sheet↔popover 自适应 |
| `patterns/settings-page.md` | 设置页布局（分组卡片 + 皮肤预览卡） |
| `implementation/flutter.md` | DSL → Flutter 实现指南（runbook） |
| `implementation/acceptance-checklist.md` | 验收清单（可断言的锚点值） |
| `viewer/` | 规范可视化页（见下） |

## 目录（产品层）

| 路径 | 内容 |
|---|---|
| `products/kaiting/` | 开听：L0 登记、产品 token、正在播放/资料库模式、分叉登记 |
| `products/kaijuan/` | 开卷：L0 登记（模式规范随落地补全） |

新产品接入：`tokens/accents.json` 登记强调色轴 → 建 `products/<product>/README.md`（L0 + 前缀 + 内容层扩展点）→ 按需补产品 patterns。

## 可视化（viewer）

`viewer/index.html` 是自包含的规范预览页：直接双击打开即可，可以切换 **皮肤（跟随系统/默认/纯净/深夜）× 产品强调色轴（开听/开卷）** 实时预览配色、排版、圆角阴影、状态层与全部组件/模式样例。

页面不是手写的第二份规范——它由 `viewer/build.py` 读取 `tokens/*.json` 生成：

```bash
python3 viewer/build.py   # tokens 改值后重跑即同步
```

改 token 值不重跑脚本 = viewer 与规范脱节，提交时一并重新生成。

## 用本规范实现一个新产品（给 AI 的入口）

1. 读本文件，确定产品 L0：从 `tokens/accents.json` 取（或新增）强调色轴，确定内容层扩展点，建 `products/<product>/README.md`。
2. 按 `implementation/flutter.md` 的步骤生成主题层与组件 kit。
3. 按 `implementation/acceptance-checklist.md` 自检：先过可断言数值，再过人工巡检清单。
4. 产品特有的页面模式写进 `products/<product>/patterns/`，不要塞进品牌层。

## 治理规则

- **改设计 = 先改规范**：连同 changelog 记录，再逐产品移植。禁止先在某个 App 里改样式再口头同步。
- **层级归属**：两个以上产品会用的 → 品牌层；单产品的 → 产品层。第二个产品需要某产品层组件/模式时，把它**提升**到品牌层并记 changelog。产品层只能引用/扩展品牌层，**不得覆盖品牌 token**；产品特有数值登记在 `products/<product>/tokens.md` 并说明为何不是通用 token。
- **品牌层中立**：品牌层不出现产品特有的数值与行为（`tokens/accents.json` 登记表、L0 接口定义、参考实现指针除外）。
- **token 稳定承诺**：已发布皮肤的标准 token 不修改（老用户的视觉基线不变）；新外观只能新增皮肤。
- **分叉登记**：产品可以偏离规范（例：开卷阅读器 chrome 取色自阅读主题而非皮肤），但必须在 `products/<product>/divergences.md` 登记 divergence 与理由，防止无声漂移。
- 规范使用中性命名（`GlassSurface`、`MenuButton`…）；各产品实现可加前缀（开听 `Sound*`、开卷 `App*`）。
- 版本：品牌层 specVersion 与各产品层各自记 changelog；产品层变更不影响品牌层版本号。

## Changelog（品牌层）

- **0.1.0**（2026-07-24）：初版落地。由开听 / 开卷收敛实现反向提炼；设置页规范采用开卷的分组卡片 + 皮肤预览卡方案。
- **0.1.1**（2026-07-24）：开听设置页按 `patterns/settings-page.md` 完成改造并反向回填：明确「单页滚动无 tabs」「外观区选择器直接展示」「行规格双端统一（13.5/11.5 堆叠）」「主题色板 28px 圆点无 check 图标」「桌面行内展开的选择器直接放进分组卡」。
- **0.1.2**（2026-07-24）：开关（Switch）组件样式落地：轨道 40×24、拇指 18、accent/border 双态，禁用 `Switch.adaptive`；分组卡片 Column 修正为 stretch（子块标签与选择器左对齐）。
- **0.1.3**（2026-07-24）：设计审计收尾——搜索框 r10 + 聚焦 2px accent；分区标题统一 12.5 w600 secondary；新增 `derivedAlphas.status.warning` token；SnackBar 显式 floating；对话框宽度收敛 520、简单选项列表弹层登记 560；底栏导航标签定档 10.5；正文字号归位 0.5 网格；展示文字禁 accent；文字三档之外禁止再乘 alpha。
- **0.2.0**（2026-07-24）：结构拆分——规范迁入独立仓库，分为品牌层（仓库根）与产品层（`products/`）；新增层级归属与品牌层中立治理规则；侧栏选中锚点明确为 accent 10% 胶囊（r10）。开听产品规范首批落地（见 `products/kaiting/`），开卷产品目录建立。

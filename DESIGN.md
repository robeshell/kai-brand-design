# DESIGN.md — 品牌设计系统（品牌层）

> 单文件蒸馏，供 AI 编码/设计代理快速对齐。**细节事实源**：本仓库 `tokens/*.json`（数值）与 `foundations/` `components/` `patterns/`（规则）；产品特有规范在 `products/<product>/`。冲突时以那些文件为准。
> 可视化：`viewer/index.html`（双击打开，可切换 皮肤 × 产品强调色轴）。

## 1. 视觉主题与氛围

安静、内容优先的桌面级质感。界面退后，内容（封面、书页、歌词）是主角。深度来自 hairline 细线与玻璃浮面，**不用 Material elevation**。层级靠字重与颜色档驱动，不靠字号堆叠。皮肤 × 强调色正交：皮肤管明暗与中性色，强调色是独立产品轴——**品牌统一中性系统与规则，不统一主色**。

## 2. 色彩调色板与角色

- **皮肤**（`tokens/skins.json`）：默认 / 纯净（blur=0）/ 深夜 + 跟随系统（伪皮肤，按平台亮度解析）。每皮肤提供表面坡道：canvas → surface → elevated → overlay，加 glass（surface/strongSurface/border/shadow/blur）与文字三档（primary/secondary/muted）。
- **强调色**（`tokens/accents.json`）：各产品独立轴——开听 coral `#FF5A4D`（6 预设）、开卷 ember `#EA580C`（5 预设，单值模型）。onAccent：对 accent 亮度估算，深底白字、浅底 `#1C1C22`。
- **状态色**：错误 `colorScheme.error`；警告 `derivedAlphas.status.warning`（light `#B07514` / dark `#E3AC45`）。
- **派生透明度只能取自** `tokens/primitives.json → derivedAlphas`（hairline、subtle、stateLayer、selection、barrier、destructive）——禁止私造 alpha；文字三档之外禁止再乘透明度。

## 3. 排版规则

- 字族 `.SF Pro Text`，回退 `PingFang SC → Microsoft YaHei → Noto Sans CJK SC → Roboto`；不打包字体。
- 字重阶梯：展示/页标题 w800；强强调 w700；强调 w600；正文 w400。**w900 全局禁用**。
- 关键字号（壳层）：页标题 26/28 w800（−0.55）；行标题 13.5–14 w600–700；副题/元信息 11.5–12.5 secondary/muted；导航标签 10.5；chip 12。字号取 0.5 网格（10.5/11.5/12.5/13.5）。
- 负字距只取规范档：≥30px −0.8；24–29 −0.55；titleLarge −0.25；正文/行文字不加。
- 展示层级（沉浸内容页扩展，字重仍封顶 w800）：桌面 hero 38（−0.8）、沉浸头 28–34、正在播放曲名 27、歌词行 20–22（当前行 w800/其余 w700）。**展示文字不得用 accent**；同页艺人名/元信息走壳层三档（hero 艺人名定档 15 w600 secondary）。

## 4. 组件样式

- **圆角阶梯**：control 10 / menu 12 / card 14（封面同）/ sheet 18 / dialog 20 / pill 999。
- **对话框** maxWidth 520；**底部弹层** r18 顶角、把手 38×4、maxWidth 760（简单选项列表 560）；**锚定菜单** r12、宽 252。
- **列表行**：标题 13.5 w600 + 副题 11.5 secondary 堆叠，leading 32px 槽位，minHeight 54，行高 ≥64（桌面设置行）。
- **chips（ChoiceStrip）**：pill，选中 accent@9% 填充。
- **开关**：轨道 40×24 pill、拇指 18、accent/onAccent vs border/secondary 双态，160ms easeOutCubic；**禁用 `Switch.adaptive`**。
- **设置分组卡**：r14 + surfaceContainerLow@72% + hairline，行间 hairline 缩进 14，子块标签 12.5 w600 secondary 左对齐。
- **导航**：侧栏选中 = accent 10% 胶囊（r10）；底栏 56px 玻璃、图标 21、标签 10.5 选中 w800。
- **反馈**：SnackBar floating 居中窄条（≥420px 宽时 220 居中，否则左右 16），1.4s 顶掉旧提示；空态 maxWidth 420、图标 30 muted；加载 spinner 24px/2px；禁用态文字 secondary@0.38。
- 命名中性（`GlassSurface`、`MenuButton`…）；产品实现加前缀（开听 `Sound*`、开卷 `App*`）。

## 5. 布局原则

- 间距取 4 的倍数档；页边距 16/32（窄/宽）；设置类内容限宽 920 居中；分区间距 28（移动可收 22）。
- 窗口分级：compact ≤600 / medium <1100 / wide ≥1100（桌面）；移动壳判定：非桌面且（宽 <820 或 高 <600）。**壳切换只由窗口分级驱动，产品不得自造断点。**

## 6. 深度与层级

- elevation 全局禁用。浮面 = strongSurface + hairline + token 阴影 ×shadowScale +（可选）模糊。
- 模糊按面选用：浮面（对话框/菜单/弹层/底栏）模糊；重复的行/卡片不模糊；blur=0 的皮肤自动跳过 BackdropFilter。
- barrier：对话框 light 38% / dark 62%；锚定菜单透明。

## 7. Do's and Don'ts

- ✅ 改设计先改本规范（连同 changelog），再移植到各 App；token 改值后重跑 `viewer/build.py`。
- ✅ 组件只读语义层 token；文字用 primary/secondary/muted 三档；层级靠字重+颜色档。
- ✅ 层级归属：通用进品牌层，单产品进 `products/<product>/`，需要时提升。
- ❌ 禁止硬编码颜色/透明度/圆角字面量；禁止私造 alpha 衰减；禁止 w900；禁止展示文字用 accent；禁止 `Switch.adaptive`；禁止 `Colors.orangeAccent` 之类硬编码状态色。
- ❌ 品牌层不出现产品特数值与行为（accents 登记表、L0 接口、参考实现指针除外）。

## 8. 响应式行为

- 桌面壳：侧栏（216/236）+ 内容；移动壳：底栏 + 内容延伸到底栏玻璃下。标题栏透明叠加；macOS 避让交通灯 38pt（自定义 chrome 78），Windows 自绘 44px。
- 窄屏（<680）菜单/选择器落底部弹层，宽屏用锚定弹层或行内展开。

## 9. 代理提示指南

- 先读 `tokens/primitives.json`（数值锚点）与 `implementation/acceptance-checklist.md`（验收锚点），再动手写样式。
- 实现新产品：读本文件 → `tokens/accents.json` 登记/取产品轴 → 建 `products/<product>/README.md` → 按 `implementation/flutter.md` 生成主题层与组件 kit → 按验收清单自检。
- 快速取色：中性色看当前皮肤坡道；强调色看产品轴 accent；状态色 error/warning 见 §2；其余一律 `derivedAlphas`。
- 产品特有页面（开听正在播放、开卷阅读器）先查 `products/<product>/patterns/`，不要凭品牌层自由发挥。

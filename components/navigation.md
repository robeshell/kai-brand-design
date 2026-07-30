# 导航（NavigationBar / SideRail）

- **用途**：顶层目的地切换（书架/书库/设置、曲库/搜索/设置…）。
- **参考实现**：kaiting `sound_components.dart → SoundNavigationBar`、`app_shell.dart → _Sidebar`；kaijuan `app_components.dart → AppNavigationBar`、`app_shell.dart → _SideRail`。
- **壳层画布 / extendBody / 留白**：见 `patterns/app-shell.md`——本文件只定导航 chrome 解剖。

## 底栏（移动壳 / 紧凑窗口）

### Metrics

| 部位 | 值 |
|---|---|
| 栏高 | **56** + SafeArea；上方叠产品条时嵌入态 **46** + SafeArea |
| 图标 | **21** |
| 标签 | **10**（行高 1.2）；选中 w600 / 未选 w500 |
| 项内边距 | 3h |
| 表面 | `GlassSurface` strong + `chromeSurface`（strongSurface @80%） |
| 顶部分隔 | 顶 hairline |
| 阴影 | blur **18** × shadowScale，offset **(0, −6)** |

### Token 映射

- 选中：accent 图标与标签；未选：onSurfaceVariant / secondary。
- 标签颜色过渡 160ms easeOutCubic。
- 纯净皮肤 blur=0 / shadowScale=0 时自动免模糊免投影。

### 规则

- 目的地 3–5 个，图标+短标签（2–4 字）；
- 选中/未选图标可同形（开卷）或双态（开听），但尺寸一致；
- 底栏常驻；`extendBody: true`；内容底部留白见 `patterns/app-shell.md`；
- 嵌入态仅在「底栏上方存在产品条」时启用，无产品条保持 56。

### 禁止事项

- 禁止实色 Container 顶替玻璃底栏；
- 禁止改栏高 / 图标 / 标签规格来迁就产品条——产品条适配底栏，不是反过来。

## 侧栏（桌面壳）

数值全部钉死。产品可在**分组与否、有无品牌标**上不同，不得改下列 metrics。

### Metrics

| 部位 | 值 |
|---|---|
| 宽度 | 216（medium）/ 236（wide）；禁止其它定宽 |
| 表面 | `GlassSurface` **strong** + `chromeSurface`；右 hairline；阴影 blur **6** offset **(1, 0)** |
| 全高 | 延伸至标题栏下方（避让交通灯 / 自绘标题栏） |
| 外框 padding | `10, 12, 10, 12` |
| 顶避让 | SafeArea / MediaQuery 顶 = `titlebarInset`（macOS 38 / Windows 44） |
| 品牌区 padding | `10, 2, 10, 12` |
| 品牌字 | 17 w600，负字距 −0.35，primary |
| 品牌标（可选） | 28×28 + 与字间距 8；无标时只保留文字 |
| 行高 | **38**（定值，不是下限） |
| 行 padding | **10h / 2v** |
| 行圆角 | 10（control 档） |
| 图标 | **18**，槽宽 **32**（居中），与标签间距 10 |
| 标签 | **14**；选中 primary w600 / 未选 secondary w500 |
| 选中底 | accent **10%** 胶囊 |
| 选中图标 | accent |
| hover | 前景 **4.5%** |
| 分区间距 | 行与行之间不加额外 gap（行自身 padding 已含） |

### 分区标题（可选，有分组时必须用此规格）

| 部位 | 值 |
|---|---|
| 字号 / 字重 | 10 w600 |
| 颜色 | muted |
| 字距 | +0.8 |
| padding | `10, 13, 10, 3` |

### 规则

- 信息架构（目的地列表、是否分组）是产品层决策；**行解剖、宽度、玻璃材质不是**。
- 禁止自造侧栏宽（含曾用的「列表轨 220」）；禁止行高区间、图标尺寸区间、标签字号自由发挥。
- 默认皮肤侧栏必须模糊；禁止手写「免模糊」——仅皮肤 `blur=0` 时自动跳过。

### 禁止事项

- 禁止侧栏行复用列表行默认 metrics（list-row minHeight 54 / 标题 w600）——侧栏行是独立规格；
- 禁止用增大 vertical padding 代替行高；
- 禁止图标无槽直接贴边（必须 32 槽居中）；
- 禁止实色 Container 顶替 `GlassSurface`。

## 验收锚点

- 底栏：56（嵌入 46）+SafeArea、图标 21、标签 10 选中 w600 accent；`GlassSurface` strong + chromeSurface；顶 hairline；阴影 blur 18 offset (0,−6)；
- 侧栏：宽 216/236；`GlassSurface` strong + chromeSurface；右 hairline；阴影 blur 6 offset (1,0)；行高 38、padding 10h/2v、图标 18/槽 32、标签 14；选中 accent 10% 胶囊 r10；品牌字 17 w600 −0.35；外框 padding 10/12/10/12。

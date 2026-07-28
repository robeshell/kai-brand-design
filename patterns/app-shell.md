# 应用外壳模式（App Shell）

> 数值见 `tokens/primitives.json → breakpoints / layoutMetrics`。
> 导航行解剖见 `components/navigation.md`。
> 本文件钉死**壳层怎么画**——画布、chrome 材质、双端布局；信息架构与产品条属产品层。

## 窗口分级

| 级别 | 条件 | 壳形态 |
|---|---|---|
| compact | 移动：宽 ≤600 或 高 <600 | 底栏 |
| medium | 桌面：宽 <1100；移动：宽 <1000 | 侧栏（桌面）/ 底栏（移动） |
| wide | 桌面：宽 ≥1100；移动：宽 ≥1000 | 侧栏 |

**移动壳判定**：非桌面平台且（宽 <820 或 高 <600）。桌面平台任何尺寸都保持桌面信息架构——窗口临时变矮不得退化成手机导航。

## 桌面主窗口尺寸（强制）

数值见 `tokens/primitives.json → layoutMetrics.desktopWindow`。三产品主窗必须一致：

| 项 | 值 | 说明 |
|---|---|---|
| 默认打开 | **1280 × 800** | 逻辑/content 像素；首次启动居中；落在 **wide**（≥1100） |
| 最小尺寸 | **1024 × 700** | 仍保持桌面侧栏（medium）；禁止更小以致挤掉侧栏 |
| 小屏钳制 | `min(default, max(min, visibleFrame − 80))` | macOS / 等价平台可见区不足时缩小，不得低于 min |

- 指**主窗口**；辅窗（如开刮重命名工具窗）属产品层，可另定，但不得小于品牌 min 的 80% 除非登记分叉。
- Windows / macOS / Linux / Tauri 各自 runner 配置须读同一组数值，禁止产品私自定 1120×780、960×820 等。

## 壳骨架（双端共用）

### 壳层画布（强制）

- 所有主题的右侧内容读取 `canvas → canvasHighlight → overlay` 对角渐变，stops 0/0.46/1。
- 默认主题以 `basePalette.mainBackground`（`#F7F9FC`）为渐变基色；颜色变化必须克制。
- 侧栏与底栏使用 `GlassSurface` strong；默认主题的底层侧栏基色为 `basePalette.sideBackground`（`#F3F5F8`）。
- 内容页不得再铺另一层整面实底（局部卡片、封面除外）。

### Chrome 材质（强制）

常驻 chrome（侧栏、底栏）统一使用玻璃材质：

- `GlassSurface` **strong** + `chromeSurface`，blur/shadow 读取当前皮肤 token；
- 纯净主题通过 `blur=0`、`shadowScale=0` 自然退化为实色，而不是组件分支；
- 禁止在组件内部自选材质或硬编码颜色。

### 留白与 elevation

| 项 | 值 |
|---|---|
| 内容底留白 | 移动壳 140 / 桌面 96 |
| 页边距 | 16 / 24 / 32（compact / medium / wide） |
| Material elevation | 壳层全局禁用 |

有 dock 上方产品条时，产品层可加高底留白，但**不得改底栏自身 metrics**。

## 桌面壳

```
┌──────────┬───────────────────────────────┐
│ 侧栏      │ 内容（SafeArea 顶=titlebarInset）│
│ 左侧浅灰  │ 右侧冷白画布                     │
│ 全高      │                               │
└──────────┴───────────────────────────────┘
  标题栏透明叠加在最上方（不占布局）
```

| 项 | 值 |
|---|---|
| 侧栏 | 默认主题使用 `basePalette.sideBackground`；其它皮肤使用 `GlassSurface` strong + `chromeSurface`；右 hairline；阴影 blur **6** offset **(1, 0)** |
| 侧栏宽 / 行 | 见 `components/navigation.md`（216/236、行高 38…）——壳层不得改 |
| 顶避让 | macOS 38 / Windows 44（`titlebarInset`）；阅读器等自定义 chrome 避让 78 |
| 标题栏 | 透明叠加；下方侧栏/画布透上来 |
| Windows 控件 | 自绘 44px；按钮 40×32；关闭 hover `#E81123@90%` |

## 移动壳

```
┌─────────────────────────────┐
│ 内容（延伸到玻璃下）          │
│ 主题画布                     │
├─────────────────────────────┤
│ [可选产品条]                 │  ← 产品层（迷你播放器等）
│ 底栏 NavigationBar           │  ← 品牌层
└─────────────────────────────┘
```

| 项 | 值 |
|---|---|
| `extendBody` | **true**（内容延伸到底栏玻璃下） |
| 底栏 | 常驻；材质与 metrics 见 `components/navigation.md` |
| 底留白 | 140（保证末行不被遮挡） |

### Dock 上方产品条（产品层接口）

迷你播放器、继续阅读条等**不属于**品牌导航，但若存在须满足：

1. 表面 = 玻璃 / `chromeSurface`（与底栏同族，可无独立阴影）；
2. 不改底栏高 56 / 嵌入态 46、图标、标签规格；
3. 计入内容底留白（产品可把 140 加高，须在产品规范登记）。

## 页面级布局

- 页标题 26/28 **w700** 负字距 ≈ −0.15～−0.25，左对齐（AppBar 不居中）；
- AppBar：透明（让画布透出）、无 elevation、无 scrolledUnder 色。

## 品牌层 vs 产品层

| 品牌层（必须统一） | 产品层（允许不同） |
|---|---|
| 断点、默认左右画布、其它皮肤渐变与 chrome 材质 | 目的地列表与侧栏分组 |
| 侧栏 / 底栏解剖与选中态 | 品牌标有无 |
| titlebarInset、页边距、底留白基线 | dock 上方产品条（迷你播放器等） |
| `extendBody`、禁用 elevation | 沉浸页（正在播放 / 阅读器） |
| | 强调色轴 |

## 规则

1. 壳切换只由窗口分级驱动，产品不得自造断点；
2. 顶层目的地 3–5 个；二级页面进栈（返回钮）不占导航；
3. 品牌名只出现在侧栏顶部 / 标题栏，不重复出现在内容页头。

## 禁止事项

- 禁止内容页整面实色底盖住壳层画布；
- 禁止侧栏 / 底栏绕过主题语义入口自行选择实色或玻璃材质；
- 禁止手写「侧栏免模糊」——只允许皮肤 `blur=0` 自动跳过；
- 禁止桌面窗口变矮时退化成手机底栏导航；
- 禁止壳层使用 Material elevation / surfaceTint。

## 验收锚点

- 默认浅色：以右侧 `#F7F9FC`、左侧 `#F3F5F8` 为底层基色，画布使用轻渐变，侧栏 / 底栏使用 strong 玻璃；
- 三主题画布均使用 canvas → canvasHighlight → overlay，stops 0/0.46/1；
- 三主题侧栏 / 底栏均走 `GlassSurface` strong + chromeSurface；纯净主题由 token 自动得到零模糊、零投影；
- 移动：`extendBody: true`；底留白 140 / 桌面 96；
- 侧栏与底栏数值锚点见 `components/navigation.md`。

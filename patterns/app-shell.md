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

## 壳骨架（双端共用）

### 壳层画布（强制）

整窗对角渐变，铺在内容之下，作为唯一页面底：

| 项 | 值 |
|---|---|
| 方向 | topLeft → bottomRight |
| 色停 | `canvas` → `canvasHighlight` → `overlay` |
| stops | `0 / 0.46 / 1` |

- 内容页**不得**另铺纯白 / elevated 实底盖住画布（局部卡片、封面除外）。
- 纯净 / 深夜皮肤读各自 token，梯度结构不变；blur/shadow 由皮肤 effects 决定。

### Chrome 材质（强制）

常驻 chrome（侧栏、底栏）一律：

- `GlassSurface` **strong** + 填充 `chromeSurface`（`strongSurface` @80%）
- 禁止用实色 `Container` / 纯色 `DecoratedBox` 顶替玻璃面
- 默认皮肤必须走模糊；纯净皮肤 `blur=0` 时组件读 token 自动跳过 BackdropFilter（不是手写「免模糊」分支）

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
│ Glass    │ 画布渐变透出                    │
│ 全高      │                               │
└──────────┴───────────────────────────────┘
  标题栏透明叠加在最上方（不占布局）
```

| 项 | 值 |
|---|---|
| 侧栏 | 全高；`GlassSurface` strong + `chromeSurface`；右 hairline；阴影 blur **6** offset **(1, 0)** |
| 侧栏宽 / 行 | 见 `components/navigation.md`（216/236、行高 38…）——壳层不得改 |
| 顶避让 | macOS 38 / Windows 44（`titlebarInset`）；阅读器等自定义 chrome 避让 78 |
| 标题栏 | 透明叠加；下方侧栏/画布透上来 |
| Windows 控件 | 自绘 44px；按钮 40×32；关闭 hover `#E81123@90%` |

## 移动壳

```
┌─────────────────────────────┐
│ 内容（延伸到玻璃下）          │
│ 画布渐变                     │
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

- 页标题 26/28 w800 负字距 −0.55，左对齐（AppBar 不居中）；
- AppBar：透明（让画布透出）、无 elevation、无 scrolledUnder 色。

## 品牌层 vs 产品层

| 品牌层（必须统一） | 产品层（允许不同） |
|---|---|
| 断点、画布渐变、chrome 玻璃材质 | 目的地列表与侧栏分组 |
| 侧栏 / 底栏解剖与选中态 | 品牌标有无 |
| titlebarInset、页边距、底留白基线 | dock 上方产品条（迷你播放器等） |
| `extendBody`、禁用 elevation | 沉浸页（正在播放 / 阅读器） |
| | 强调色轴 |

## 规则

1. 壳切换只由窗口分级驱动，产品不得自造断点；
2. 顶层目的地 3–5 个；二级页面进栈（返回钮）不占导航；
3. 品牌名只出现在侧栏顶部 / 标题栏，不重复出现在内容页头。

## 禁止事项

- 禁止内容页整面实色底盖住壳层画布渐变；
- 禁止侧栏 / 底栏用实色 Container 顶替 `GlassSurface`；
- 禁止手写「侧栏免模糊」——只允许皮肤 `blur=0` 自动跳过；
- 禁止桌面窗口变矮时退化成手机底栏导航；
- 禁止壳层使用 Material elevation / surfaceTint。

## 验收锚点

- 壳层画布：对角渐变 canvas → canvasHighlight → overlay，stops 0/0.46/1；
- 侧栏 / 底栏：`GlassSurface` strong + chromeSurface；
- 移动：`extendBody: true`；底留白 140 / 桌面 96；
- 侧栏与底栏数值锚点见 `components/navigation.md`。

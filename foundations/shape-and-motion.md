# 形状 · 阴影 · 分隔 · 动效 · 交互状态层

> 数值见 `tokens/primitives.json`（radii / motion / derivedAlphas / componentProfiles）。

## 圆角

| 刻度 | 值 | 用途 |
|---|---|---|
| control | 10 | 品牌容器、小控件和允许覆盖形状的平台控件 |
| card | 14 | 卡片、封面框、设置分组卡 |
| menu | 12 | 品牌自有菜单或辅助浮层 |
| sheet | 18 | 品牌移动 Sheet（仅顶角） |
| dialog | 20 | 品牌自有 Dialog 容器 |
| pill | 999 | Chip、进度轨道、滚动条和拖拽把手 |
| checkbox / tooltip | 5 / 8 | 特例 |

规则：嵌套圆角外大内小。平台组件优先使用系统形状；以上刻度只在平台允许品牌覆盖或自有容器中使用。

## 阴影与深度

- **不用 Material elevation**。深度 = 玻璃阴影 token × `effects.shadowScale`：
  - 浮面默认：blur 24（strong 34），offset (0,10)；
  - 底部弹层：blur 28，offset (0,−8)；
  - 导航底栏：blur 18，offset (0,−6)；
  - 锚定菜单：blur 24，offset (0,8)；
  - 封面微浮起：blur 10 × scale，offset (0,3)。
- 实色皮肤（shadowScale=0）自动无影。
- 封面 / 缩略图小于 96px 时可省略投影（重复元素省渲染）。

## 分隔

- 一级分隔：hairline（1px，`derivedAlphas.hairline`）。
- 分组卡片内部行间分隔：hairline，indent 14。
- 禁止用 ≥4px 的色带做分隔。

## 交互状态层（State Layer）

状态语义统一，反馈方式按平台：

| 状态 | 叠加 |
|---|---|
| hovered | 仅桌面指向设备；使用平台 Hover 或轻状态层 |
| pressed | 保留 Apple 按压、Android Material 状态层和桌面按下反馈 |
| focused | 使用平台焦点视觉；品牌提供 accent |
| disabled | 前景/文字 38–48% 透明度，不叠加 |
| selected | 面：前景 5–5.5%；指示：accent 系（见配色规范） |

品牌状态 alpha 只作为允许覆盖时的颜色来源，不能替代平台的触控、焦点和高对比度能力。

## 交互目标

交互目标不再使用一套全平台数值。组件读取当前 `platformProfile.metrics.minimumInteractiveTarget`：

- iOS / iPadOS：44pt；
- Android：48dp；
- macOS：28pt；
- Windows / Linux：32px。

视觉尺寸可以小于交互目标，但命中区域必须满足当前 Mobile / Desktop Profile。完整尺寸表见 `foundations/layout-and-density.md`。

## 动效

| 场景 | 时长 | 曲线 |
|---|---|---|
| 状态反馈（hover/press/选中） | 140–160ms | easeOut / easeOutCubic |
| 浮层进出 | 140ms 淡入（锚定菜单）；系统默认（sheet/对话框） | easeOut |
| 皮肤 / 配色切换 | 按皮肤 240–520ms | 只对颜色插值 |
| 环境动效（氛围背景等） | ≥14s | 线性/缓动循环 |

- reduced-motion：环境动效按 `effects.motionStrength` 衰减至近 0；状态反馈动效保留。
- 动画只动 transform / opacity / color；禁止动画触发布局（reflow）。

## 平台交互差异

| 场景 | 桌面 | 触屏 |
|---|---|---|
| 列表激活 | 单击选中、双击/Enter 激活 | 单击激活 |
| 次级操作 | 右键 = 长按菜单 | 长按菜单 |
| tooltip | 使用平台推荐延迟 | 不依赖 |
| 焦点视觉 | 键盘导航必须可见并跟随系统 | 由平台辅助功能决定 |

Menu、Popover、Flyout 和 Sheet 按平台与任务选择，不能仅用窗口宽度决定，见 `components/sheets-and-menus.md`。

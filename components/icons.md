# 图标组件（Icon / IconButton）

## 用法

`Icon` 只负责绘制；可点击操作必须使用 `IconButton`。图标来源、尺寸和方向规则见
`foundations/iconography.md`。

## 映射

| 场景 | 图标 | 承载 |
|---|---|---|
| 紧凑工具栏、表格 | `compact` 16 | `compactControlHeight`，命中区外扩 |
| 普通按钮、输入、列表 | `regular` 20 | `controlHeight` 或列表行 |
| 移动主要操作 | `large` 24 | `minimumInteractiveTarget` |
| 空态 | `display` 32 | 不可点击；有操作时另放文字按钮 |

## 状态

- 默认、悬停、按下和焦点由承载控件表达，图标不缩放跳动；
- 选中可以从 outline 切换为 fill，同时配合标签或指示器；
- 禁用随承载控件降低对比度；
- busy 状态用同尺寸进度指示替换，保持按钮尺寸。

## 无障碍

- 纯图标按钮必须提供可访问名称；
- 桌面端不熟悉的纯图标操作提供 Tooltip；
- 装饰图标隐藏语义；
- 传达状态的图标必须有对应文字或可访问说明。

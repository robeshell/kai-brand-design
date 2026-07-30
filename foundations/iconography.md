# 图标规范

> 数值源：`tokens/primitives.json → iconography`。图标表达含义，按钮负责命中区域。

## 尺寸

| 角色 | 尺寸 | 用途 |
|---|---:|---|
| `compact` | 16 | 表格、紧凑工具栏、行尾状态 |
| `regular` | 20 | 普通按钮、输入框、列表行 |
| `large` | 24 | 移动端主要操作、空态辅助图标 |
| `display` | 32 | 空态和少量展示场景 |

图标视觉尺寸不等于点击尺寸。可点击图标必须放进当前平台
`minimumInteractiveTarget` 的按钮中。

## 图标来源

- Apple 平台优先 SF Symbols；
- Android 优先 Material Symbols Rounded；
- Windows 优先 Fluent System Icons；
- Linux 优先桌面环境图标；缺失时使用项目内统一的 rounded SVG；
- 跨平台自定义图标使用 24×24 viewBox、圆角端点，并提供 16/20/24 的光学修正。

同一功能在选中与未选中状态可以使用 fill/outline 双态，但不得更换隐喻。一个产品内
不得混用 sharp、rounded 和手绘风格。

## 方向与文字

- 返回、前进、展开等方向图标在 RTL 环境镜像；
- 播放、媒体时间线、品牌标识不镜像；
- 纯装饰图标不进入可访问树；
- 单独出现的操作图标必须有可访问名称；不熟悉的桌面操作同时提供 Tooltip。

## 禁止

- 不用 emoji 代替界面图标；
- 不靠图标颜色单独表达错误、选中或完成；
- 不把 16px 图标直接做成 16px 点击目标；
- 不在业务页面临时手画已有系统图标。

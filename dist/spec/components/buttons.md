# 按钮

按钮触发一个明确操作。iOS 与 Android 使用同一套 Mobile Button，macOS、Windows 与 Linux 使用同一套 Desktop Button。

## 语义

| 角色 | 用途 |
|---|---|
| Primary | 当前范围内唯一的主要推进操作 |
| Secondary | 保留但不争夺主要注意力的操作 |
| Quiet | 工具栏、行内和低频操作 |
| Destructive | 删除、清空和不可逆操作 |
| Icon action | 有清楚系统隐喻的紧凑操作 |

同一区域最多一个 Primary。按钮标签使用具体动词，不使用“确定”代替可以说清的操作。

## 组件 Profile

| Profile | 结构与行为 |
|---|---|
| `mobile` | 48 高度和命中区；支持触摸按下、Busy、动态字体和无障碍名称 |
| `desktop` | 36 常规高度、32 紧凑高度；增加 Hover、键盘焦点、默认按钮和快捷键 |

## 品牌覆盖

- 强调色、状态色和文字角色；
- 图标隐喻与尺寸档；
- 表面、边框和圆角倾向；
- 状态变化的克制程度。

圆角统一使用 `radii.control`。平台适配层不能改变普通按钮外观，但必须保留系统字体缩放、键盘、无障碍与必要触控反馈。

## 尺寸

- 视觉高度读取当前 Mobile / Desktop Profile 的 `controlHeight`；
- 工具栏按钮读取 `compactControlHeight`；
- 命中区域不小于 `minimumInteractiveTarget`；
- 标签读取 `typeScale.label`，图标读取 `iconography`；
- 文本变大时允许按钮增高，不裁切标签。

## 状态

必须覆盖 Default、Pressed、Focused、Disabled；桌面端增加 Hover，选择型按钮增加 Selected，异步操作增加 Busy。

- Focused 使用平台焦点能力；品牌只提供 accent；
- Disabled 不可聚焦，不仅降低透明度，还要避免误触；
- Busy 保持原尺寸，阻止重复提交并保留操作名称；
- Destructive 同时使用错误色与明确文字。

## 禁止

- 不移除 Android 的必要触控反馈；
- 不把手机 FAB 搬到桌面工具栏；
- 不用 Hover 代替触控反馈；
- 不固定所有平台按钮高度、圆角和按钮顺序；
- 不用阴影或大面积强调色制造多个“主要操作”。

## 验收

- Mobile 与 Desktop 均有完整按钮实现；
- 品牌色和图标统一，但焦点、按压和键盘行为符合当前平台；
- 命中目标、动态字体和高对比度模式可用。

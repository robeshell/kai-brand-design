# 选择与筛选

选择控件表达少量并列选项、筛选条件或选中对象。先使用平台等价组件，不默认创造统一的胶囊条。

## 选择组件

| 任务 | Apple | Android | 桌面 |
|---|---|---|---|
| 少量平级视图 | Segmented Control / Tabs | Primary / Secondary Tabs | Tabs / Segmented / View Switcher |
| 少量筛选条件 | Menu、Picker 或可选标签 | Filter Chip | Toggle、Chip 或筛选菜单 |
| 单选设置 | Picker / 列表选择 | Radio / Exposed Dropdown | Radio / ComboBox |
| 多选对象 | 列表选择 / Toggle | Checkbox / Filter Chip | Checkbox / 选择行 |

## 品牌覆盖

- 当前项使用产品强调色；
- 标签使用当前 Profile 的 `label` 或 `body`；
- 图标使用统一语义；
- 自有筛选标签可使用 `radii.pill` 和轻选中背景。

平台负责组件高度、焦点、触控反馈、滚动和键盘选择。

## 共同规则

- 选中状态不能只靠颜色；
- 单选组始终只有一个当前项；
- 多选需要明确完成方式或即时生效规则；
- 筛选项过多时进入菜单或筛选面板，不能无限横向堆叠；
- 内容主题中的选择控件可以改变前景色，但不能改变语义和命中目标。

## 禁止

- 不把所有 Segmented Control、Tabs、Filter Chip 和 Checkbox 统一成同一胶囊条；
- 不用 Chip 代替主导航；
- 不隐藏当前选择；
- 不为追求品牌统一移除平台焦点和触控反馈。

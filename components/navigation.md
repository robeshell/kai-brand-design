# 顶级导航

顶级导航切换产品的主要目的地。移动端共用底部导航视觉，桌面端共用侧栏视觉；返回和键鼠行为按平台适配。

## 组件 Profile

| Profile | 默认形态 | 自适应 |
|---|---|---|
| `mobile` | Kai Bottom Navigation，3–5 个目的地 | 手机保持底栏；平板可切换 Kai Sidebar |
| `desktop` | Kai Sidebar + Toolbar | 可折叠 Sidebar，但不变成手机底栏 |

页内平级内容使用 Tabs、Segmented Control 或平台等价组件，不能与顶级导航混为一类。

## 共同语义

- 每个目的地有稳定 ID、短名称和匹配图标；
- 当前目的地明确，且同组中只有一个；
- 每个顶级目的地保留自己的导航栈和滚动位置；
- 导航只放目的地，不放播放、添加或刷新等普通操作；
- 返回、深链和恢复由路由层处理，不依赖选中颜色。

## 品牌覆盖

- 当前项使用产品强调色；
- 图标使用统一隐喻和粗细倾向；
- 常驻 chrome 读取当前皮肤的表面、边框和玻璃 token；
- 标签使用当前 Mobile / Desktop Profile 的语义字体角色。

Mobile 底栏与 Desktop 侧栏分别保持统一解剖，不根据操作系统改变选中指示器和布局。

## 平台行为

- Apple：保留 Tab 的独立导航状态、Safe Area 和系统搜索入口；
- Android：保留系统 Back、Edge-to-edge Insets 和窗口 Size Class 切换；
- macOS：支持菜单栏、Toolbar、右键、键盘导航和窗口恢复；
- Windows：支持 NavigationView 的 BackRequested、Pane 模式和焦点视觉；
- Linux：支持系统主题、键盘、窗口管理和目标桌面快捷键。

## 禁止

- 不在桌面窄窗中自动换成手机底栏；
- 不给超过五个目的地硬塞底栏；
- 不把普通操作放入顶级导航；
- 不让同一 Component Profile 因操作系统改变栏高、图标位置和选中样式；
- 不用产品条反向改变系统导航的命中区域。

## 验收

- 相同目的地在五个平台名称和路由一致；
- Mobile / Desktop 形态与窗口级别正确；
- 当前项有文字或图形辅助，不只靠颜色；
- 键盘、返回、安全区域和可访问名称完整。

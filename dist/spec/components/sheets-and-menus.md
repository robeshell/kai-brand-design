# 菜单、Popover 与 Sheet

这组组件承载与触发位置相关的短操作、选择或辅助内容。具体容器按平台和任务决定，不使用统一断点把所有菜单强制变成 Bottom Sheet。

## 选择顺序

1. 与触发位置直接相关的短操作：Menu / Context Menu；
2. 少量选择：平台 Picker、Pop-up、ComboBox 或 Dropdown；
3. 与当前内容相关的辅助信息：Popover / Flyout；
4. 移动端需要较大操作空间的短任务：Sheet；
5. 复杂或长任务：独立页面、Dialog 或窗口。

## 平台映射

| Profile | 推荐 |
|---|---|
| `appleMobile` | Menu、Context Menu、Popover、Sheet |
| `androidMobile` | Dropdown Menu、Context Menu、Modal Bottom Sheet |
| `macDesktop` | Menu、Context Menu、Popover；保留菜单栏命令 |
| `windowsDesktop` | MenuFlyout、ContextFlyout、TeachingTip |
| `linuxDesktop` | Menu、Popover、Context Menu |

## 品牌覆盖

- 菜单项图标和文字层级；
- accent、error 和当前项语义；
- 表面、边框和材质 token；
- 允许范围内的圆角。

平台保留菜单尺寸、键盘移动、子菜单、关闭方式、锚点、窗口边缘避让和系统命令习惯。

## 共同规则

- 高频或重要操作靠前，逻辑相关项分组；
- 选中项使用勾选或明确文字，不只靠颜色；
- 危险操作与普通操作分组并写清对象；
- 打开后焦点进入，关闭后回到触发位置；
- 支持平台对应的方向键、Enter、Escape、返回和右键；
- 菜单过长时重新组织，不把所有命令堆进一个容器。

## 禁止

- 不在 macOS、Windows 和 Linux 窄窗中自动使用手机 Bottom Sheet；
- 不用固定 680px 断点代替平台和输入模式判断；
- 不覆盖系统菜单栏、右键和键盘习惯；
- 不为统一圆角自绘一套失去系统行为的菜单；
- 不把复杂表单塞进短操作菜单。

## 验收

- 容器符合当前平台和任务类型；
- 锚点、边缘避让、键盘和焦点恢复正确；
- 品牌样式只影响允许覆盖部分；
- 危险、选中和禁用状态有非颜色提示。

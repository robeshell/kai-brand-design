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
- Menu、Popover、Flyout 和 Sheet 的容器使用 `GlassSurface` strong：`strongSurface + strongBlur + border + innerHighlight + shadow`；
- 不把 `elevated` 或 `overlay` 直接作为容器背景；平台原生容器无法覆盖材质时，保留平台行为并使用最接近的系统表面；
- 允许范围内的圆角。

平台保留菜单尺寸、键盘移动、子菜单、关闭方式、锚点、窗口边缘避让和系统命令习惯。

## 头部与说明文案

- Sheet / 弹层头部**只有标题，没有副标题**——标题使用当前 Profile 的 `title` 档 w600；标题与内容区间距 10；
- **描述性副标题一律禁止**——用户看一眼标题就知道功能是什么，描述功能用途的文字全是噪音。此禁令覆盖：设置行副标题、弹层副标题、页头副标题、分区说明段、菜单行描述性副题。

允许的例外只有两类（都不是"描述"，而是没有它就无法使用/理解的信息）：
1. **数据/状态值**：主机地址、扫描与下载进度、当前偏移量、失败原因、文件数量；
2. **操作性提示**：模板语法（`{title} ({year})`）、格式约束这类不看就不会填的输入提示。

风险操作的后果解释放**二次确认对话框**，不放常驻说明文字。

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

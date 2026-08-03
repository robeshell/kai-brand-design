# 对话框与模态任务

对话框只用于必须暂时中断当前流程的确认、输入或短任务。Mobile 与 Desktop 各使用一套模态视觉，关闭、返回、焦点和系统窗口行为按平台适配。

## 组件 Profile

| Profile | 推荐容器 |
|---|---|
| `mobile` | Kai Dialog、Bottom Sheet 或独立页面，按任务强度选择 |
| `desktop` | Kai Dialog、Popover 或独立窗口 |

不能只按屏幕宽度把所有桌面对话框变成 Bottom Sheet。

## 共同结构

1. 具体标题；
2. 必要说明或字段；
3. 影响与风险；
4. 主要操作和取消操作。

同一 Component Profile 的按钮顺序保持一致；Escape、系统返回和窗口关闭交给平台适配层。

## 品牌覆盖

- 标题、正文和帮助文字角色；
- accent、error 和表面层级；
- 图标语义；
- Dialog 容器使用 `GlassSurface` strong：`strongSurface + strongBlur + border + innerHighlight + shadow`；
- 不直接使用 `elevated`、`overlay` 或任意灰色 Container；
- 允许范围内的圆角。

## 状态与行为

- 打开后焦点进入合理控件，关闭后回到触发位置；
- 背景不可操作，标题与容器建立可访问关联；
- 提交中保持尺寸并阻止重复提交；
- 错误靠近字段显示，保留用户输入；
- 内容过高时只滚动内容区；
- 破坏性操作明确说明对象和后果。

## 禁止

- 不用 Dialog 展示普通说明或长篇文档；
- 不把 Mobile 与 Desktop 强行做成同一种容器；
- 不把简单选择包装成确认对话框；
- 不在手机上显示窄小桌面对话框，也不在桌面照搬手机 Sheet；
- 不覆盖平台焦点管理和系统返回。

## 验收

- 当前平台使用正确模态容器；
- 键盘、返回、焦点恢复和屏幕阅读器可用；
- 风险、主要操作和取消路径清楚；
- 品牌样式未改变平台模态语义。

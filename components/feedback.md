# 状态与反馈组件

状态与反馈组件用于告诉用户发生了什么、影响了什么，以及现在能做什么。完整状态选择见 `patterns/status-system.md`。

## 组件集合

| 语义 | 用途 |
|---|---|
| Loading | 等待内容或服务 |
| Progress | 已知或未知进度的持续任务 |
| Empty State | 当前范围确实没有可展示内容 |
| Inline Status | 已有内容中的局部加载、警告或错误 |
| Persistent Task Status | 后台任务的持续入口 |
| Result Summary | 成功、部分完成、跳过和失败摘要 |
| Transient Feedback | 刚完成且无需持续处理的短结果 |

## 平台映射

- Apple：使用 ProgressView、系统通知、行内状态或应用内短反馈；不照搬 Android Snackbar；
- Android：使用 Linear/Circular ProgressIndicator、Snackbar、Banner 或系统通知；
- macOS：使用 ProgressIndicator、Toolbar/Sidebar 状态、通知或行内 Banner；
- Windows：使用 ProgressBar、ProgressRing、InfoBar、TeachingTip 或通知；
- Linux：使用 ProgressBar、Spinner、Banner、Toast 或桌面通知。

## 品牌统一

- success、warning、error、info 语义色；
- 状态图标隐喻；
- 标题、说明、数量和操作的信息顺序；
- 进度强调色和内容层级。

进度图形、短反馈容器、系统通知和可访问播报方式由平台决定。

## 短反馈表面

- SnackBar、Toast、Tooltip 等短反馈若由应用自有容器承载，使用 `GlassSurface` base：`surface + blur + border + shadow`；
- 不把 `overlay` 中灰色直接作为常规短反馈背景，也不把短反馈统一升级为 strong glass；
- Inline Status、Empty State 和页面内的 Result Summary 继承所在内容表面，不单独套玻璃；
- 需要用户持续处理的任务或错误进入稳定的任务/错误容器，不用短反馈玻璃承载。

## 状态规则

- 已知总量才显示百分比或 `已完成 / 总量`；
- 未知总量显示当前阶段，不伪造进度；
- 已有内容刷新失败时保留内容并使用 Inline Status；
- 部分完成保留成功结果，只重试失败项；
- 连续失败落成稳定错误，不循环弹出短提示；
- 后台任务保持可返回入口，完成后只发送一次重要通知；
- 所有动态状态同时提供文字和可访问播报。

## 空状态

区分首次使用、数据为空、搜索无结果、筛选无结果和无权限。标题说明具体原因；有明确下一步时只提供一个主要操作。

空状态不放版本、统计、设计说明或与当前任务无关的营销文案。

## 禁止

- 不把所有反馈画成同一个 Snackbar；
- 不为每个业务动作新建一套进度组件；
- 不用旋转图形替代阶段文字；
- 不用整页错误覆盖仍可使用的内容；
- 不只用颜色表达成功、警告或失败。

## 验收

- 状态范围、进度类型和恢复方式选择正确；
- 平台组件和通知方式正确；
- 文案具体，操作可执行；
- 动态状态支持减少动态效果和屏幕阅读器。

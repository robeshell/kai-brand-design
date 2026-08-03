# 浮层与临时任务

浮层选择先看平台和任务，再看空间。不能只通过一个宽度断点，把菜单、详情和选择全部变成 Bottom Sheet。

## 选择

| 任务 | 推荐 |
|---|---|
| 与触发位置相关的短操作 | 平台 Menu / Context Menu / MenuFlyout |
| 少量枚举选择 | Picker / Pop-up / ComboBox / Dropdown |
| 补充说明或辅助内容 | Popover / Flyout / TeachingTip |
| 移动端需要较大空间的短任务 | Sheet |
| 必须立即确认 | 平台 Dialog / Confirmation Dialog / ContentDialog |
| 复杂任务或大量内容 | 独立页面或窗口 |

具体平台映射见 `components/sheets-and-menus.md` 与 `components/dialogs.md`。

## 层级

同一时刻只保留一个需要完整注意力的模态层。菜单、Tooltip 和短反馈不能遮挡更重要的确认或错误。

- 页面和常驻导航属于基础层；
- Menu、Popover、Flyout 属于与触发位置关联的临时层；
- Sheet、Dialog 和独立模态窗口属于任务层；
- 系统通知由操作系统管理，不放入应用内部 z-index 竞争。

## 品牌覆盖

- 所有应用自有浮层通过 `GlassSurface` 读取当前皮肤，不直接使用 `elevated`、`overlay` 或任意灰色填充；
- Dialog、Sheet、Menu、Popover 使用 `strongSurface + strongBlur`，并配合 `border`、`innerHighlight`、`shadow`；
- SnackBar、Toast、Tooltip 使用 `surface + blur`，并配合 `border`、`shadow`；
- 行、卡片和设置分组不是浮层，不因处于浮层内部就增加 BackdropFilter；
- accent、error、图标和文字角色保持品牌一致；
- 自有浮层可以使用品牌圆角，但材质必须遵循上述变体。

平台锁定锚点定位、窗口边缘避让、按钮顺序、焦点循环、返回、Escape、安全区域、系统动效和辅助功能。

## 行为

- 打开后焦点进入合理控件，关闭后回到触发位置；
- 点击外部是否关闭由平台组件和任务风险决定；
- 破坏性流程始终有明确取消路径；
- 复杂内容只滚动内容区，标题和主要操作保持可见；
- 不堆叠多个 Sheet 或 Dialog；
- 减少动态效果时保留状态变化，移除非必要移动。

## 禁止

- 不使用固定宽度断点代替平台选择；
- 不在桌面窄窗中显示手机 Bottom Sheet；
- 不在手机上显示缩小版桌面对话框；
- 不自绘失去键盘、焦点和边缘避让能力的菜单；
- 不用短反馈承载必须持续处理的问题。

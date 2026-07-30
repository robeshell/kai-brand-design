# 组件与平台适配

跨平台产品不维护五套控件外观。Kai Design 只输出两套视觉组件：

| Component Profile | 使用范围 | 主要输入 |
|---|---|---|
| `mobile` | iOS、iPadOS、Android | 触摸 |
| `desktop` | macOS、Windows、Linux | 指针、键盘，可触摸 |

按钮、输入、选择、列表、导航、菜单和对话框都先读取
`componentProfiles.mobile` 或 `componentProfiles.desktop`。颜色、字号、控件高度、
圆角、图标和状态视觉在同一 Profile 内保持一致。

## 平台适配层

五个 `platformProfiles` 不再决定组件长相，只约束下面这些系统能力：

| 平台 | 必须适配 |
|---|---|
| iOS / iPadOS | 安全区、滑动返回、Dynamic Type、系统权限和分享 |
| Android | 系统返回、Edge-to-edge、字体缩放、权限和触控反馈 |
| macOS | 窗口、菜单栏、快捷键、右键、拖放和系统文件面板 |
| Windows | 窗口缩放、焦点、高对比度、快捷键和系统文件面板 |
| Linux | 桌面主题、键盘、右键、Freedesktop 图标与文件面板 |

## 实现顺序

1. 按设备形态选择 `mobile` 或 `desktop`；
2. 使用 Kai 组件的统一视觉和状态；
3. 按运行平台接入返回、安全区、窗口、输入与系统服务；
4. 系统弹层无法稳定自定义时，直接使用系统能力。

## Flutter

- 组件样式读取 `KaiBrandMobileType / Metrics` 或
  `KaiBrandDesktopType / Metrics`；
- `ThemeData`、自有 Widget 和布局组件不再根据操作系统换一套皮肤；
- `Platform.isIOS` 等判断只用于行为适配，不用于普通按钮和输入框外观；
- 文件选择、权限、分享、通知和窗口能力通过平台插件或原生桥接完成。

## 验收

- iOS 与 Android 的同类组件视觉一致；
- macOS、Windows 与 Linux 的同类组件视觉一致；
- 移动组件满足 48 的触摸目标和 17/24 的正文基准；
- 桌面组件完整支持 Hover、Focus、右键和键盘；
- 平台行为差异没有被错误做成五套视觉主题。

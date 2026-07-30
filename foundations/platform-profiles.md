# 组件 Profile 与平台基准

设计系统分成两层：

1. `componentProfiles` 决定组件实际使用的字号、行高、控件高度和列表高度；
2. `platformProfiles` 保存官方基准，用于行为适配、系统字体和验收。

## 实际组件 Profile

| Profile | 平台 | Body | 控件 | 单/双行列表 |
|---|---|---:|---:|---:|
| `mobile` | iOS、iPadOS、Android | 17 / 24 | 48 | 52 / 68 |
| `desktop` | macOS、Windows、Linux | 14 / 20 | 36 | 40 / 52 |

产品组件只能读取这两套数值。窗口宽度改变布局，但不会把 Mobile 组件自动
换成 Desktop 组件。

## 官方平台基准

| Profile | 依据 | 用途 |
|---|---|---|
| `appleMobile` | Apple HIG | Dynamic Type、安全区、返回和 44pt 最小目标 |
| `androidMobile` | Material 3 | 系统返回、Insets、字体缩放和 48dp 最小目标 |
| `macDesktop` | macOS HIG | 窗口、菜单栏、键鼠和系统服务 |
| `windowsDesktop` | Fluent / WinUI | 焦点、高对比度、窗口与键盘 |
| `linuxDesktop` | GNOME / KDE HIG | 桌面主题、键鼠和 Freedesktop 约定 |

这些 Profile 不能被组件直接当作五套皮肤使用。

## 选择逻辑

1. 根据产品形态选择 Mobile 或 Desktop 组件；
2. 根据运行系统选择平台行为适配器；
3. 根据窗口尺寸选择页面布局；
4. 应用系统字体缩放、减少动态效果、高对比度等用户设置。

## 工程输出

- Flutter 输出 `KaiBrandMobileType / Metrics` 和
  `KaiBrandDesktopType / Metrics`；
- CSS 通过 `[data-component-profile="mobile|desktop"]` 输出实际组件变量；
- 五个平台官方数据继续生成，供适配器和验收使用；
- 普通组件代码不能通过操作系统判断切换外观。

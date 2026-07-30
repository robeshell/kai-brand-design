# 页面栏、工具栏与页内切换

这组组件组织页面标题、返回、页面级操作和同级内容切换。具体控件按平台选择。

## 平台映射

| Profile | 页面栏与工具 | 页内切换 |
|---|---|---|
| `appleMobile` | Navigation Bar / Toolbar | Segmented Control、Tabs 或系统推荐位置 |
| `androidMobile` | Top App Bar / Bottom App Bar | Primary / Secondary Tabs |
| `macDesktop` | Window Toolbar / Titlebar | Segmented Control、Tabs |
| `windowsDesktop` | TitleBar / CommandBar | TabView 或 NavigationView 内切换 |
| `linuxDesktop` | Header Bar / Toolbar | View Switcher / Tabs |

## 共同结构

- 页面只有一个主标题；
- 返回、标题和页面操作按平台位置排列；
- 当前范围最多一个主要操作；
- 低频操作进入平台菜单；
- Tabs 只切换同一层级内容，不承担顶级导航或普通操作。

## 品牌覆盖

- 标题和标签的语义文字角色；
- accent、状态色和图标语言；
- 工具栏表面和边框层级；
- 页内当前项的品牌强调。

平台保留标题栏占位、返回位置、滚动折叠、菜单溢出、窗口拖拽区、Safe Area、键盘和焦点。

## 禁止

- 不把桌面 Window Toolbar 画成手机 Top App Bar；
- 不固定所有平台相同高度和按钮顺序；
- 不在标题旁放统计、版本或无关说明；
- 不用 Tabs 包装少量本可直接展示的内容；
- 不把主要操作复制到多个栏位。

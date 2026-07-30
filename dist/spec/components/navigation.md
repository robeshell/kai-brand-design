# 顶级导航

顶级导航切换产品的主要目的地。移动端共用底部导航视觉，桌面端共用侧栏视觉；返回和键鼠行为按平台适配。

## 组件 Profile

| Profile | 默认形态 | 自适应 |
|---|---|---|
| `mobile` | Kai Bottom Navigation，3–5 个目的地 | 手机保持底栏；平板可切换 Kai Sidebar |
| `desktop` | Kai Sidebar + Toolbar | 可折叠 Sidebar，但不变成手机底栏 |

页内平级内容使用 Tabs、Segmented Control 或平台等价组件，不能与顶级导航混为一类。

### 底栏（Mobile Profile）

| 部位 | 值 |
|---|---|
| 栏高 | **56** + SafeArea；上方叠产品条时嵌入态 **46** + SafeArea |
| 图标 | **21** |
| 标签 | 当前 Mobile Profile 的 `captionSmall`；选中 w600 / 未选 w500 |
| 项内边距 | 3h |
| 表面 | `GlassSurface` strong + `chromeSurface`（strongSurface @80%） |
| 顶部分隔 | 顶 hairline |
| 阴影 | blur **18** × shadowScale，offset **(0, −6)** |

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

### 侧栏（Desktop Profile）

| 部位 | 值 |
|---|---|
| 宽度 | 216（medium）/ 236（wide）；禁止其它定宽 |
| 表面 | `GlassSurface` **strong** + `chromeSurface`；右 hairline；阴影 blur **6** offset **(1, 0)** |
| 全高 | 延伸至标题栏下方（避让交通灯 / 自绘标题栏） |
| 外框 padding | `10, 12, 10, 12` |
| 顶避让 | SafeArea / MediaQuery 顶 = `titlebarInset`（macOS 38 / Windows 44） |
| 品牌区 padding | `10, 2, 10, 12` |
| 品牌字 | 17 w600，负字距 −0.35，primary |
| 品牌标（可选） | 28×28 + 与字间距 8；无标时只保留文字 |
| 行高 | **38**（定值，不是下限） |
| 行 padding | **10h / 2v** |
| 行圆角 | 10（control 档） |
| 图标 | **18**，槽宽 **32**（居中），与标签间距 10 |
| 标签 | 当前 Desktop Profile 的 `body`；选中 primary w600 / 未选 secondary w500 |
| 选中底 | accent **10%** 胶囊 |
| 选中图标 | accent |
| hover | 前景 **4.5%** |
| 分区间距 | 行与行之间不加额外 gap（行自身 padding 已含） |

#### 分区标题（可选，有分组时必须用此规格）

| 部位 | 值 |
|---|---|
| 字号 / 字重 | 10 w600 |
| 颜色 | muted |
| 字距 | +0.8 |
| padding | `10, 13, 10, 3` |

#### 规则

- 信息架构（目的地列表、是否分组）是产品层决策；**行解剖、宽度、玻璃材质不是**。
- 禁止自造侧栏宽（含曾用的「列表轨 220」）；禁止行高区间、图标尺寸区间、标签字号自由发挥。
- 默认皮肤侧栏必须模糊；禁止手写「免模糊」——仅皮肤 `blur=0` 时自动跳过。
- 禁止侧栏行复用列表行默认 metrics（list-row minHeight 54 / 标题 w600）——侧栏行是独立规格；
- 禁止用增大 vertical padding 代替行高；
- 禁止图标无槽直接贴边（必须 32 槽居中）；
- 禁止实色 Container 顶替 `GlassSurface`。

## 验收

- 相同目的地在五个平台名称和路由一致；
- Mobile / Desktop 形态与窗口级别正确；
- 当前项有文字或图形辅助，不只靠颜色；
- 键盘、返回、安全区域和可访问名称完整；
- 底栏：56（嵌入 46）+SafeArea、图标 21；`GlassSurface` strong + chromeSurface；顶 hairline；阴影 blur 18 offset (0,−6)；
- 侧栏：宽 216/236；行高 38、padding 10h/2v、图标 18/槽 32；选中 accent 10% 胶囊 r10；品牌字 17 w600 −0.35；外框 padding 10/12/10/12。

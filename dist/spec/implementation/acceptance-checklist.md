# 验收清单

> 实现完成后逐项自检。A 类为可断言数值（代码审查/测试可判），B 类为人工巡检。

## A. 静态与数值锚点

- [ ] 浅色应用框架：右侧主内容 `#F7F9FC`、左侧导航 `#F3F5F8`；参考主色 `#FF5A4D`；切换皮肤不得改变当前产品强调色
- [ ] 静态分析零告警（`flutter analyze`）
- [ ] Android 保留必要的 Material 状态层；Apple 和桌面保留各自按压、焦点、键盘与右键行为
- [ ] 圆角：对话框 20 / 弹层 18 / 菜单 12 / 卡片 14 / 控件 10 / 按钮与 chip 胶囊
- [ ] 图标只取 16 / 20 / 24 / 32 语义档；可点击图标命中区满足当前平台目标
- [ ] success / warning / error / info 使用状态 Token，并同时有文字或图形含义
- [ ] 平台解析唯一且正确：iOS→appleMobile、Android→androidMobile、macOS→macDesktop、Windows→windowsDesktop、Linux→linuxDesktop
- [ ] 正文与交互目标：iOS 17/22 + 44pt；Android 16/24 + 48dp；macOS 13/16 + 28pt；Windows 14/20 + 32px；Linux 14/20 + 32px
- [ ] 按钮、IconButton、chip 与列表行的命中区不小于当前 Profile 的 `minimumInteractiveTarget`
- [ ] 列表标题使用 `body`，副题使用 `secondary`；单/双行高度读取当前 Profile
- [ ] 输入框：r10、subtle 填充、聚焦 2px accent 且无外侧 outline
- [ ] 滑杆：轨道 3、拇指 r6；进度圈 24px/2px 且无硬编码色
- [ ] Switch / Checkbox / Radio 使用当前平台等价控件，品牌色不破坏系统结构和可访问状态
- [ ] 顶级导航按平台映射：Apple Tab Bar/Sidebar、Android Navigation Bar/Rail、macOS Sidebar、Windows NavigationView、Linux Sidebar/View Switcher
- [ ] 壳层画布：默认主题以右侧 `#F7F9FC`、左侧 `#F3F5F8` 为底层基色；三主题均使用 canvas → canvasHighlight → overlay；移动 extendBody true；底留白 140 / 桌面 96；壳层无 Material elevation
- [ ] 桌面主窗：默认 1280×800、最小 1024×700（逻辑/content）；小屏钳制不得低于 min
- [ ] 对话框、菜单、Popover、Flyout 和 Sheet 按平台与任务选择；按钮顺序、焦点和返回行为符合系统
- [ ] 字族平台默认；组件只引用语义字体角色，不出现平台字号字面量；**禁止 w700+**
- [ ] 代码中无字面色值泄漏（grep `Color(0x` 应只出现在 theme 层与内容层扩展）
- [ ] 旧外观存储迁移有单元测试
- [ ] 每个通用组件已映射到目标平台原生能力，并明确品牌覆盖项与平台锁定项
- [ ] 内容浏览与任务工作台覆盖产品主流程；搜索和详情作为结构状态处理
- [ ] 状态系统覆盖首次加载、局部加载、确定/未知进度、空数据、无结果、部分完成、错误与恢复

## B. 人工巡检

- [ ] 三皮肤 × 至少两个强调色：书架/库面/设置/主要浮层全过一遍
- [ ] 纯净皮肤：所有浮面实色无模糊无投影（组件未硬编码模糊）
- [ ] 深夜皮肤：浮层 barrier 明显、玻璃面层次可读
- [ ] 跟随系统：切换系统外观，App 即时跟随
- [ ] 窄窗（<680）菜单变底部弹层；宽窗锚定弹层不错位（靠右边缘自动内收、底部自动上翻）
- [ ] 移动：末行不被底栏遮挡（底部留白 140）；三主题渐变可见；内容页未整面盖住壳层
- [ ] 桌面：三主题侧栏均通过统一玻璃组件渲染，纯净主题视觉为零模糊实色；hover 反馈可见；按钮保留键盘焦点环，输入框使用自身 2px accent 边框；tooltip 450ms
- [ ] 对话框：矮内容收缩包裹、高内容仅内容区滚动
- [ ] 空态、加载、进度、部分完成和错误使用正确范围，不用整页状态覆盖仍可用内容
- [ ] 内容层（若有）：切换内容主题不影响 chrome；chrome 覆盖内容时可读

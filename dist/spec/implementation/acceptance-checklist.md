# 验收清单

> 实现完成后逐项自检。A 类为可断言数值（代码审查/测试可判），B 类为人工巡检。

## A. 静态与数值锚点

- [ ] 浅色应用框架：右侧主内容 `#F7F9FC`、左侧导航 `#F3F5F8`；参考主色 `#FF5A4D`；切换皮肤不得改变当前产品强调色
- [ ] 静态分析零告警（`flutter analyze`）
- [ ] 全局 `splashFactory: NoSplash.splashFactory`、`applyElevationOverlayColor: false`、`surfaceTint: transparent`
- [ ] 圆角：对话框 20 / 弹层 18 / 菜单 12 / 卡片 14 / 控件 10 / 按钮与 chip 胶囊
- [ ] 按钮：最小 36、胶囊、iconSize 17；IconButton 40 正圆、图标 20
- [ ] chip：高 32、选中 accent@0.09 底 + accent 字 w700、无边框无 checkmark
- [ ] 列表行：minHeight 54、标题 13.5 w600、副题 11.5
- [ ] 输入框：r10、subtle 填充、聚焦 2px accent 且无外侧 outline
- [ ] 滑杆：轨道 3、拇指 r6；进度圈 24px/2px 且无硬编码色
- [ ] 开关：轨道 40×24、拇指 18、选中 accent/onAccent、未选 border/secondary、无描边、无 `Switch.adaptive`
- [ ] 底栏：56（嵌入 46）+SafeArea、图标 21、标签 10.5 选中 w800 accent；三主题均走 GlassSurface strong + chromeSurface；纯净主题由 token 自动零模糊、零投影；顶 hairline
- [ ] 侧栏：宽 216/236（禁止其它定宽）；三主题均走 GlassSurface strong + chromeSurface；右 hairline；行高 38、padding 10h/2v、图标 18/槽 32、标签 13.5；选中 accent@0.10 胶囊 r10；品牌字 17 w800 −0.35；外框 padding 10/12/10/12；hover 前景 4.5%
- [ ] 壳层画布：默认主题以右侧 `#F7F9FC`、左侧 `#F3F5F8` 为底层基色；三主题均使用 canvas → canvasHighlight → overlay；移动 extendBody true；底留白 140 / 桌面 96；壳层无 Material elevation
- [ ] 桌面主窗：默认 1280×800、最小 1024×700（逻辑/content）；小屏钳制不得低于 min
- [ ] 对话框：maxWidth 520、barrier 黑 38%/62%；sheet：maxWidth 760、把手 38×4
- [ ] 锚定菜单：内容撑开、minWidth 160 / maxWidth 280、行高 36、标签 13.5；禁止定宽；<680px 自动退化为底部弹层
- [ ] 字族 `.SF Pro Text` + 五个回退；页标题 26/28 w800 负字距 −0.55
- [ ] 代码中无字面色值泄漏（grep `Color(0x` 应只出现在 theme 层与内容层扩展）
- [ ] 旧外观存储迁移有单元测试

## B. 人工巡检

- [ ] 三皮肤 × 至少两个强调色：书架/库面/设置/主要浮层全过一遍
- [ ] 纯净皮肤：所有浮面实色无模糊无投影（组件未硬编码模糊）
- [ ] 深夜皮肤：浮层 barrier 明显、玻璃面层次可读
- [ ] 跟随系统：切换系统外观，App 即时跟随
- [ ] 窄窗（<680）菜单变底部弹层；宽窗锚定弹层不错位（靠右边缘自动内收、底部自动上翻）
- [ ] 移动：末行不被底栏遮挡（底部留白 140）；三主题渐变可见；内容页未整面盖住壳层
- [ ] 桌面：三主题侧栏均通过统一玻璃组件渲染，纯净主题视觉为零模糊实色；hover 反馈可见；按钮保留键盘焦点环，输入框使用自身 2px accent 边框；tooltip 450ms
- [ ] 对话框：矮内容收缩包裹、高内容仅内容区滚动
- [ ] 空态/加载/错误三态符合反馈规范
- [ ] 内容层（若有）：切换内容主题不影响 chrome；chrome 覆盖内容时可读

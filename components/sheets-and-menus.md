# 底部弹层与菜单（BottomSheet / Menu）

- **用途**：移动优先的操作集合、详情面板、上下文菜单。
- **参考实现**：kaiting `sound_components.dart → showSoundBottomSheet / SoundMenuButton / showSoundMenu`；kaijuan `app_components.dart → showAppBottomSheet / AppMenuButton / showAppMenu`。

## 底部弹层（BottomSheet）

### Metrics

| 部位 | 值 |
|---|---|
| 圆角 | 顶角 18（sheet 档） |
| 拖拽把手 | 38×4 胶囊，secondary 38–45%，距顶 7 |
| maxWidth | 760（宽屏居中） |
| 阴影 | blur 28 × scale，offset (0,−8) |
| barrier | black 38%（浅）/ 62%（深） |

### Token 映射

表面 = glass.strongSurface + glass.border；内容区顶 padding 14（避开把手）。

### 头部

- **只有标题，没有副标题**——标题 = title 档（17/24 w600）；说明性副标题与说明段落禁止出现（见下「说明文案」）；
- 标题与选项区间距 10；选项列表直接跟 hairline 分隔的行。

### 说明文案

**描述性副标题一律禁止**——用户看一眼标题就知道功能是什么，描述功能用途的文字全是噪音。此禁令覆盖：设置行副标题、弹层副标题、页头副标题、分区说明段、菜单行描述性副题。

允许的例外只有两类（都不是"描述"，而是没有它就无法使用/理解的信息）：
1. **数据/状态值**：主机地址、扫描与下载进度、当前偏移量、失败原因、文件数量；
2. **操作性提示**：模板语法（`{title} ({year})`）、格式约束这类不看就不会填的输入提示。

风险操作的后果解释放**二次确认对话框**，不放常驻说明文字。

## 菜单（Menu）——自适应，同一数据模型两种呈现

**数据模型**：`MenuAction<T>{ value, label, icon, subtitle?, selected, enabled, destructive, dividerBefore }`。

| 窗口宽度 | 呈现 |
|---|---|
| < 680 | 底部弹层（行高 ≥52，padding 20h，最高 72% 视口，SafeArea） |
| ≥ 680 | 锚定玻璃弹层：宽度随内容（min 160 / max 280），禁止定宽；壳上下 padding 4；r12（menu 档）；shadow blur 24 offset (0,8)；自动上下翻 |

### 菜单行

| 部位 | 值 |
|---|---|
| 行高 | 宽屏锚定 36 / 窄屏底部弹层 ≥52 |
| 行左右 padding | 锚定 12h；底部弹层 20h |
| 图标 | 锚定 17px 槽宽 22；底部弹层 19px 槽宽 24 |
| 标签 | 锚定 14 w600；底部弹层 14 w600；副题 11 secondary |
| 选中 | 前景 5.5% 底 + accent 前景 + 右侧 check（锚定 16 / 弹层 18） |
| destructive | error 前景 |
| 分隔 | dividerBefore → hairline（indent 与行左右 padding 对齐：锚定 12 / 弹层 16） |
| 菜单标题 | 12 w600 secondary + hairline 分隔 |

### 触发器（MenuButton）

- 默认 more_horiz 21px 图标钮；支持自定义 child（hover 前景 4%）。
- 无可用项时禁用。

## 禁止事项

- 禁止裸用 Material PopupMenuButton 默认样式（主题已配，但自适应菜单优先）；
- 禁止菜单内嵌套滚动视图不收缩（ListView 必须 shrinkWrap）；
- 禁止锚定菜单定宽（必须内容撑开 + min/max 约束）。

## 验收锚点

- sheet 顶角 r18、把手 38×4、maxWidth 760；
- 锚定菜单：内容撑开、minWidth 160 / maxWidth 280、行高 36、标签 14；<680px 自动退化为底部弹层。

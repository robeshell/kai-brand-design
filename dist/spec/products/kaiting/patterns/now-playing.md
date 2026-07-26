# 正在播放模式（开听）

> 参考实现：`kaiting/lib/presentation/screens/now_playing_screen.dart`、`widgets/vinyl_record_art.dart`、`widgets/mini_player.dart`、`widgets/playback_queue_sheet.dart`、`widgets/progress_scrubber.dart`。
> 排版层级（曲名 27 w800 −0.55、歌词行 20–22 当前行 w800）已在品牌层 `foundations/typography.md → 内容层展示层级` 登记，本篇不重复。

正在播放是开听的沉浸页：封面/黑胶是**内容层**（可取色、可有产品特有造型），其余 chrome（文本三档、按钮、进度、浮层）全部走品牌 token。

## 桌面宽窗：平衡双栏

```
┌────────────────────────────────────────────┐
│  播放列（flex 1）          │  内容列（flex 1）│
│  封面/黑胶（居中）         │  歌词 / 队列    │
│  曲名/艺人/进度/传输       │                │
└────────────────────────────────────────────┘
```

| 部位 | 值 |
|---|---|
| 栏比例 | 1:1（`playerFlex : contentFlex`） |
| 栏间距 | 48；折叠态（<780）24；屏幕铰链避让取更大者 |
| 水平页边距 | 44；折叠态 24 |
| 垂直留白 | 顶 50 / 底 24 |
| 封面尺寸上限 | classic 340；vinyl 440（折叠态 360） |
| 播放列限宽 | classic 390；vinyl 480（折叠态 400） |
| 封面实际尺寸 | min(上限, 栏宽, 播放列高 − chrome 高)，下限 160 |
| chrome 预留高 | vinyl 250 / classic 230（标题 + 进度 + 传输） |

- 封面/黑胶在播放列内**水平居中**（列内其余元素 start 对齐）；
- 折叠态（<780）双栏改为顶部对齐，歌词列让位。

## 移动/窄窗：单栏滚动

| 部位 | 值 |
|---|---|
| 列限宽 | vinyl 440 / classic 430，居中 |
| 滚动内边距 | vinyl 16h / classic 28h；顶 8；底 vinyl 28 / classic 40 |
| 黑胶尺寸 | min(屏宽−32, 屏高×0.52)，clamp 260–420 |
| 封面↔标题间距 | vinyl 40 / classic 26 |

## 黑胶（vinyl 内容层造型）

黑胶方块内部比例（相对方块边长）：

| 参数 | 值 |
|---|---|
| 盘心 | (0.5, 0.58)——盘面偏下，给唱臂留上部空间 |
| 唱臂支点 | (0.5, 0.02) |
| 标签（封面）半径 | 盘半径 ×0.66，圆形裁切无圆角 |
| 盘外沿 | 盘半径 ×0.94 |

- 播放时盘面旋转（reduced motion 时静止）；唱臂从静置位旋入中纹槽；
- 黑胶是内容层造型，不参与品牌圆角阶梯；其阴影/背景氛围仍走 glass token。

## 迷你播放器（常驻 dock）

| 部位 | 值 |
|---|---|
| 表面 | GlassSurface strong + hairline + token 阴影 ×shadowScale |
| 圆角 | 移动 14 / 桌面 18（card/sheet 档） |
| 封面 | 遵循 card r14，shadow 同 AlbumArt 规则（<96px 不投影） |
| 进度 | 可交互（点击/拖动 seek），accent |
| 错误重试 | 边框/图标用 `colorScheme.error`，不用 accent |
| 音量弹层 | strongSurface + menu r12 + token 阴影 |
| 状态表达 | 传输按钮图标 + busy spinner（见 `tokens.md` 相位表），**不渲染状态徽章** |

## 播放队列

- 底部弹层承载（品牌 sheet 规范：r18 顶角、默认把手、maxWidth 760）；
- 行 = 紧凑媒体行：封面缩略 + 标题/副题双行；当前曲目 = accent 频谱图标 + accent 标题，序号用 muted；
- 拖拽排序：行尾 drag handle（muted 图标），拖起时行走 glass 浮面。

## 错误横幅

播放错误在页面底部浮出横幅：GlassSurface strong + menu r12，错误图标 + 失败曲目名 + 重试钮；不用透明边框/纯色块。

## 规则

1. 曲名、歌词等**展示文字不用 accent**；accent 只给当前队列项、进度、主传输按钮；
2. 歌词行的当前行强调靠字重（w800 vs w700），不靠颜色或字号跳变；
3. 封面取色 palette 只影响氛围背景与 hero 控件，不改变 chrome token；
4. 黑胶参数（盘心/支点/标签比）是产品 token，改型先改本篇。

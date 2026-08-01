# 开听（kaiting）产品规范

**productSpecVersion: 0.2.0**

音乐播放器。品牌层的第一个参考实现产品，品牌层初版即由开听与开卷的收敛实现反向提炼。

## L0 登记

| 项 | 值 |
|---|---|
| 产品名 | 开听 / kaiting |
| 强调色轴 | `tokens/accents.json → products.kaiting`，默认珊瑚 `#FF5A4D`，6 预设 + 自定义（hover/pressed 派生规则见登记表） |
| 组件命名前缀 | `Sound*`（`SoundGlassSurface`、`SoundListRow`…） |
| 内容层扩展点 | **正在播放样式**：classic（方形封面）/ vinyl（黑胶唱机）——封面与背景是内容层，chrome 仍走皮肤 token；**封面取色 palette**：专辑/艺人详情页从封面提取渐变色板（页面背景与 hero 控件色），属内容层，不受皮肤坡道约束 |
| 参考实现 | `kaiting/lib/core/sound_theme.dart`（主题层）、`lib/presentation/widgets/sound_components.dart`（组件 kit）、`lib/presentation/widgets/settings_components.dart`（设置 kit） |

## 产品特有规范

| 文件 | 内容 |
|---|---|
| `tokens.md` | 产品级 token：来源色（WebDAV / 本地）、播放相位视觉映射 |
| `patterns/now-playing.md` | 正在播放：桌面双栏 / 移动单栏、黑胶参数、迷你播放器、播放队列、歌词面板 |
| `patterns/library-and-search.md` | 资料库、分类、来源筛选和跨类型搜索 |
| `patterns/album-detail.md` | 专辑与艺人详情、封面氛围和曲目列表 |
| `divergences.md` | 已登记的品牌层分叉与理由 |

## 规则

1. 开听特有数值（黑胶参数、双栏比例、来源色）只进本目录，不进品牌 token；
2. 与品牌层冲突时品牌层优先；确需偏离 → 登记 `divergences.md`；
3. 若开卷（或第三产品）需要本目录的某个组件/模式（如媒体行、队列），先提升到品牌层再复用。

## Changelog

- **0.2.1**（2026-08-01）：播放队列弹层标题降档至设置弹层同档（20px），紧凑选择按钮回归 caption 档。
- **0.2.0**（2026-07-29）：补齐资料库、搜索、专辑/艺人详情与平台 Profile 映射；普通业务页面不再从正在播放页反推。
- **0.1.1**（2026-07-26）：正在播放补充超宽屏内容舞台上限（1600×1080），避免全屏时双栏与附属控件被视口过度拉散。
- **0.1.0**（2026-07-24）：产品层建立。L0 登记落地；`patterns/now-playing.md` 从代码反向提炼（此前正在播放全页无规范）；来源色与播放相位映射登记入 `tokens.md`；首批分叉登记。

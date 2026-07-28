# 反馈（SnackBar / Tooltip / 空态 / 加载 / 滚动条 / 进度指示）

- **参考实现**：kaiting `sound_components.dart → showSoundSnackBar / SoundEmptyState`、`sound_theme.dart`；kaijuan `app_components.dart → AppEmptyState`、`app_overlays.dart → showAppSnackBar / AppTooltip`。

## SnackBar（轻提示）

居中、**宽度随文案收缩**的胶囊提示；**无描边**，仅轻阴影。

| 部位 | 值 |
|---|---|
| 形态 | floating；内层 **StadiumBorder 胶囊**（pill 档）；**无 hairline border** |
| 宿主 | 透明底、elevation 0、无描边 shape；只负责 margin 与居中 |
| 面 | `snackBarTheme.backgroundColor`，缺省 `inverseSurface@0.94` |
| 阴影 | 轻投影（Material elevation 3，`shadowColor` black@0.22）；非全局 elevation 体系 |
| 文字 | 14 w600、height 1.3、letterSpacing −0.1；水平居中；最多 2 行省略 |
| 字色 | `snackBarTheme.contentTextStyle` / `onInverseSurface` |
| 内边距 | 18h / 11v |
| 宽度 | **随文案 hug**；`maxWidth = 视口宽 − 40`；宿主左右 margin 20 |
| 时长 | **1.6s** |
| 桌面呈现 | 水平居中，距底 **36**（窗口宽 ≥420） |
| 移动呈现 | 水平居中，距底 **18**（窗口宽 <420） |

规则：

- 新提示顶掉旧提示（`clearSnackBars`）；可下滑关闭（`DismissDirection.down`）。
- 默认纯文本；不用 action 时不要硬塞操作按钮。
- **禁止**固定 220 定宽窄条、禁止带描边的 r12 方条、禁止不带 margin 的 fixed SnackBar（会断言失败）。

参考实现：kaiting `showSoundSnackBar`。

## Tooltip

- overlay 面 + border，r8，10h/7v 内边距，bodySmall 染 primary；
- 延迟 450ms、展示 3s；message 为空时不挂 tooltip；
- 中文文案，仅桌面指向设备依赖它。

## 空态 / 加载 / 错误（EmptyState）

```
[30px muted 图标（68% 透明） 或 24px 2px 加载圈]
14
[16px w600 标题（primary 88%）]
6
[12px 说明（muted 76%，行高 1.45）]
```

- 最大内容宽 420，居中，页面底部留白按壳规范；
- 加载指示统一：24px、strokeWidth 2（accent 由 progressIndicatorTheme 供给），禁止自定义颜色；
- 空态图标用描线款（weight 300）。

## 滚动条

5px 胶囊；thumb secondary 30%（hover 55%）；轨道透明；桌面常驻可显，触屏淡入淡出。

## 行内进度（LinearProgressIndicator）

accent 色、轨道透明；仅用于确定/不确定进度，不用作分隔线。

## 验收锚点

- snackbar 居中胶囊、无描边、宽度随文案、时长 1.6s；
- 加载圈 24px/2px 无硬编码色；
- 空态 maxWidth 420、图标 30px muted。

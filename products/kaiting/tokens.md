# 开听产品级 token

> 只登记**开听特有**的数值；通用 token 一律引用品牌层（`tokens/*.json`）。
> 参考实现：`kaiting/lib/core/sound_theme.dart → SoundColors`、`lib/playback/playback_engine.dart` + `lib/presentation/widgets/playback_visual_state.dart`。

## 来源色（source colors）

音乐来源的品牌标识色，用于来源图标、来源筛选 chip、来源设置页的状态就绪色：

| token | 值 | 用途 |
|---|---|---|
| `source.webDav` | `#5E8BFF` | WebDAV 远程来源 |
| `source.local` | `#55B889` | 本机文件夹来源 |

- 这两色是**来源身份标识**，不是状态色——`authenticationFailed` 用品牌层 `derivedAlphas.status.warning`，`error/unavailable` 用 `colorScheme.error`；
- 来源就绪/正常状态借用来源色本身表达（已登记，见 `divergences.md` D2）；
- 为何不是通用 token：来源类型是开听的领域概念（开卷没有"音乐来源"），若未来多产品出现"外部数据源标识色"需求再提升。

## 播放相位 → 传输按钮视觉（PlaybackVisualState）

引擎相位不直接渲染状态徽章（2026-07 审计决策：徽章无必要已删除），由传输按钮图标 + 忙碌态表达：

| 相位 | 主按钮图标 | busy | 可用性 |
|---|---|---|---|
| idle | play（无曲目时 none，禁用） | ✗ | 有曲目才可用 |
| loading | none（spinner） | ✓ | ✗ |
| ready | play | ✗ | ✓ |
| playing | pause | ✗ | ✓ |
| paused | play | ✗ | ✓ |
| buffering | pause/play（跟随 isPlaying） | ✓ | ✓ |
| completed | replay | ✗ | ✓ |
| error | retry | ✗ | ✓ |

- busy spinner：24px、strokeWidth 2、`onPrimary` 色（主按钮是 accent 填充圆形）；
- 错误同时由浮层横幅表达（见 `patterns/now-playing.md` 错误横幅节）。

# 表面与容器（Surface / GlassSurface）

## 用法

- 普通页面分区使用基础表面。
- `GlassSurface` 是通用浮面原语；组件按任务选择 `base` 或 `strong`，不得自行拼接灰色背景。
- 对话框、Sheet、Menu、Popover 使用 strong glass；SnackBar、Toast、Tooltip 使用 base glass。
- 侧栏、底栏等常驻 chrome 使用 strong glass + 皮肤 token `glass.chromeSurface`（不得手写不透明度）。
- 重复列表行、普通卡片、设置分组和封面网格不是浮面，不使用 BackdropFilter。
- 不要为了分组给每块内容都增加卡片或阴影。

## 玻璃变体

| 变体 | 填充 | 模糊 | 通用组件用途 | 配套 |
|---|---|---|---|---|
| `base` | `glass.surface` | `glass.blur` | SnackBar、Toast、Tooltip 等短反馈 | `border` + `shadow` |
| `strong` | `glass.strongSurface` | `glass.strongBlur` | Dialog、Sheet、Menu、Popover | `border` + `innerHighlight` + `shadow` |
| `chrome` | `chromeSurface` | 当前皮肤玻璃 blur | 侧栏、底栏和其它常驻 chrome | hairline/border + `shadow` |

`elevated` 与 `overlay` 是表面坡道中的语义角色，不是绕过 `GlassSurface` 的任意实色填充。

## 数值

| 项目 | 变量 |
|---|---|
| 卡片圆角 | `radii.card` = 14 |
| 菜单圆角 | `radii.menu` = 12 |
| 对话框圆角 | `radii.dialog` = 20 |
| 边框 | `derivedAlphas.border` |
| 玻璃边框 | `skins.*.glass.border` |
| 内高光 | `skins.*.glass.innerHighlight` |
| 普通模糊 | `skins.*.glass.blur` |
| 强模糊 | `skins.*.glass.strongBlur` |
| 阴影 | `skins.*.glass.shadow` × `effects.shadowScale` |

## 实现

- Flutter 使用 `AppGlassSurface` / `SoundGlassSurface`。
- Web 使用生成的玻璃背景、边框、模糊和阴影变量。
- `base` 必须读取 `surface + blur`；`strong` 必须读取 `strongSurface + strongBlur`。
- 强玻璃才叠加 `innerHighlight`；普通短反馈不直接读取 `overlay` 中灰色。
- 当前外观关闭模糊或阴影时，组件自动退化，业务代码不做分支。

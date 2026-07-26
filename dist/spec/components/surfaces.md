# 表面与容器（Surface / GlassSurface）

## 用法

- 普通页面分区使用基础表面。
- 侧栏、底栏和浮层使用强玻璃表面。
- 不要为了分组给每块内容都增加卡片或阴影。

## 数值

| 项目 | 变量 |
|---|---|
| 卡片圆角 | `radii.card` = 14 |
| 菜单圆角 | `radii.menu` = 12 |
| 对话框圆角 | `radii.dialog` = 20 |
| 边框 | `derivedAlphas.border` |

## 实现

- Flutter 使用 `AppGlassSurface` / `SoundGlassSurface`。
- Web 使用生成的玻璃背景、边框、模糊和阴影变量。
- 当前外观关闭模糊或阴影时，组件自动退化，业务代码不做分支。

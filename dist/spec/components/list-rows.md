# 列表行（ListRow / CheckRow）

- **用途**：设置项、弹层操作项、结构化列表。
- **参考实现**：kaiting `sound_components.dart → SoundListRow / SoundCheckRow`；kaijuan `app_components.dart → AppListRow / AppCheckRow`。

## 解剖

```
[leading 槽32] 10 [标题 listTitle / 副题 bodySecondary] 10 [trailing]
```

## Metrics

| 部位 | 值 |
|---|---|
| 高度 | 当前 Mobile / Desktop Profile 的 `listRowSingle` / `listRowDouble`（设置页导航行用 `listRowSingle`，见 `patterns/settings-page.md`） |
| padding | 水平 `spacing.x4`；垂直方向由行高与内容决定 |
| leading 槽 | 32 宽居中 |
| 标题 | 当前 Mobile / Desktop Profile 的 `typeScale.listTitle`：14/20、w500，单行省略 |
| 副题 | 当前 Mobile / Desktop Profile 的 `typeScale.bodySecondary`，单行省略 |

## Token 映射与状态

| 状态 | 背景 | 前景 |
|---|---|---|
| default | 透明 | primary |
| hovered | 前景 3.5% | — |
| focused | 前景 5% | — |
| selected | 前景 5% | 内容可叠加 accent |
| disabled | — | muted 50% |

## CheckRow 变体

leading 为 checkbox 图标（20px）：选中 accent 实心 / 未选 muted 空心；点击整行切换；`selected` 与勾选态一致。

## 设置分组中的行

- 分组卡片内行间用极淡分隔线（indent 14，浅色 black@4% / 深色 white@5%）分隔，见 `patterns/settings-page.md`；
- **选中态不得用整行填充块**——用行内 check / accent 文字表达。

## 交互

- 整行可点（InkWell 透明叠加）；无 onTap 时不注册 button 语义。
- destructive 行：图标与文字 error 色。

## 验收锚点

- 单/双行高度和文字均来自当前 Mobile / Desktop Profile；标题 listTitle (14/20 w500)、副题 bodySecondary；
- 行内不出现 elevation / 阴影。

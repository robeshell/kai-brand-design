# 设置页模式

> 参考实现：开听 `lib/presentation/screens/settings_screen.dart` + `widgets/settings_components.dart`；开卷 `lib/presentation/screens/settings_screen.dart` + `widgets/settings_components.dart`；开刮 `desktop/src/components/SettingsModal.tsx` + `styles/tokens.css` + `index.css`。三端均已按 0.6.3 基准落地（2026-07-30）。

## 布局

- 内容居中限宽 920；页边距 16/32（窄/宽）；
- 桌面页头：`SettingsPageHeader`（26/28 **w600**、负字距 ≈ −0.15～−0.25 + 可选副题 + 可选返回钮）；移动端页头由外壳提供，不重复；
- **内页页头（SettingsBackButton）**：返回钮 + 页面标题（title 档 17/24 w600）同一行，页顶 padding 8——压低页头让内容尽快开始，不再用"裸返回箭头 + 大留白"（0.6.3 之前的做法）；
- 分区：小节标签（13 w600 secondary、字距 0.3、左内缩 4、下间距 10）+ 分组卡片，区间距 28（移动端可收窄到 22）；
- **单页滚动，不用分区 tabs / 滚动联动**——分组卡片本身已提供足够的扫读结构，tabs 是噪音。

## 画布（SettingsCanvas）

设置页画布比主画布再浅灰一档，纯白分组卡靠**色差**自然分层，不需要边框和阴影：

| 皮肤 | 值 |
|---|---|
| 浅色（默认/纯净） | `#F4F5F7` |
| 深色（深夜） | `surfaceContainerLowest`（画布色） |

- 该色只用于设置页及同构的表单页；不进入全局 canvas token；
- 深色皮肤下画布与卡片的关系反转（卡片 elevated 天然更亮），所以深色直接用画布色即可。

## 分组卡片（SettingsGroup）

| 部位 | 值 |
|---|---|
| 圆角 | 14（card 档） |
| 填充 | `surfaceContainer`（elevated 层，不透明） |
| 边框 | **无** |
| 阴影 | **无** |
| 行间分隔 | 行间分隔线（见下），indent / endIndent 14，自动插入 |

**禁止给分组卡加边框、投影、玻璃模糊**——画布与卡面的色差已经是分层的全部手段。

### 行间分隔线（SettingsRowDivider）

| 皮肤 | 值 |
|---|---|
| 浅色 | black @ 4% |
| 深色 | white @ 5% |

比 hairline 再淡一档，只暗示行的边界。整块内容的分组（外观区）可整体关闭分隔线。

**选中态用行内 check / accent 文字，禁止整行填充块。**

## 行（三类呈现）

1. **导航行**：标题 14 w500 primary（listTitle 档），行尾 value 13 secondary w500 + chevron 19 secondary；padding 14h/8v；行高 = `listRowSingle`（52）；**默认不带副标题**——解释性文案放进点开后的弹层/子页标题下方，行内保持单行扫读；
2. **开关行**：同上行结构，Switch trailing；
3. **选择行**：行内 check，或下述预览卡 / 色板直接展示；
4. 危险操作（清库等）放分区末尾，destructive 样式。

## 外观区：选择器直接展示

皮肤、主题色、播放器样式这类「看一眼就想点」的选择器**在分组卡内直接展示**，不藏在折叠行后面。外观分组为**整块卡**（无行间分隔线），卡内用子块标签（`SettingsBlockLabel`，13 w600 secondary、字距 0.2，14/12/14/2 内边距）分隔各选择器。

### 皮肤预览卡（SkinCard）

```
┌──────────┐   104×68，r12，hairline 描边
│ 画布色    │   内部：0.74×0.64 的 elevated 小卡（r7 + glass.border），
│  ┌────┐  │   卡内：accent 短条(13×4) + 两条假文字行(0.78/0.52 宽, 3.5 高,
│  │ ▬  │  │   primaryText@0.22 / secondaryText@0.32)
│  │ ── │  │
│  └────┘  │   选中：accent 2px 描边 + 下方标签 accent w600
└──────────┘   未选：hairline 描边 + 标签 secondary w500（12px）
   皮肤名
```

- 「跟随系统」卡 = 默认/深夜双拼（左右各半）；
- **横向滑动轮播**：固定高度 108 的横向 ListView，卡片间距 12，两端内边距 2（防选中描边裁剪），BouncingScrollPhysics；卡片超过一屏时自然滑动，不换行；
- 预览卡里只用 DecoratedBox/Container，不嵌 Icon 与图片，保证它是纯 token 的函数。

### 主题色板（AccentSwatch）

- 28px 圆点横排（含「自定义」彩虹渐变点），间距 12；
- 选中：1.5px primary 描边 + 中心 8px onAccent 圆点；未选：无描边（自定义点带 hairline）；
- 不用 check 图标、不加投影。

## 信息区（关于）

- **不再放品牌名与一句话定位**——应用市场、启动屏和外壳已经承担了品牌表达，设置页只列事实信息；
- 行高 ≥46，padding 14h/6v；标签列 52 宽 secondary 13px，值列 primary 13 w500（可选中复制）；
- 行尾动作（复制等）：15–16px muted 图标钮，右对齐。

## 规则

1. 移动端长列表选择（播放模式、睡眠定时）用底部弹层承载（`CompactSettingsSheet`：20/14/20/16 内边距、标题 title 档无副标题、选项行高 ≥48、行间 hairline、选中行尾 check，**选项列表不套分组卡、选中行不加填充块**）；桌面端行内展开即可；
2. 桌面端行内展开的选择器（chips 条等）直接放进分组卡，内边距 14，不加额外面板边框——分隔交给分组卡；
3. 行首**不放图标徽章**——纯文字 + 行尾值/箭头即可，彩色或中性图标块都会让列表变脏（0.6.2 曾尝试，已回滚并写入本禁令）；
4. **不写描述性副标题**——行副标题、页头副标题、分区说明全部禁止（用户看标题即知功能）；仅数据/状态值与操作性输入提示例外（见 `components/sheets-and-menus.md` 说明文案节）；
5. 不出现「另一产品」的入口。

## 附：0.6.2 → 0.6.3 迁移记录（已完成）

三端已于 2026-07-30 全部对齐：① 分组卡 `surfaceContainerLow@72% + hairline 边框` → `surfaceContainer` 不透明、无边框；② 页面背景 → 设置画布（浅色 `#F4F5F7`）；③ 行间分隔 → 4%/5% 极淡线；④ 行高 → `listRowSingle`(52)，行内副标题删除（开刮的信息型行除外）；⑤ 皮肤卡 124×80 Wrap → 104×68 横向轮播；⑥ 关于区删除品牌头。

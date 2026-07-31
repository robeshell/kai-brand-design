# 阅读器模式（开卷）

> 参考实现：`kaijuan/lib/presentation/screens/book_reader_screen.dart`、`comic_reader_screen.dart` 与 `lib/presentation/widgets/reader/`。
> 本篇规范阅读器 chrome；书页排版、漫画像素、阅读字体和阅读色板属于内容层。

## 共用骨架

```
┌────────────────────────────────────┐
│ 顶部 chrome（可隐藏，桌面避让交通灯） │
│                                    │
│          阅读内容层                 │
│                                    │
│ 底部工具条 / 进度（可隐藏）           │
└────────────────────────────────────┘
```

| 部位 | 规则 |
|---|---|
| 顶部 chrome | 高 56；macOS 自定义阅读器 chrome 左侧避让 78 |
| 底部 chrome | 高 56 基线；安全区另计；工具面板在其上方展开 |
| 表面 | 漫画读取品牌 GlassSurface；图书按 D1 从阅读主题生成可读 chrome |
| 显隐 | 内容点击切换；打开抽屉、菜单或设置面板时保持可操作，不与阅读手势竞争 |
| 动效 | 使用品牌 `uiFast` / `uiStandard`；reduced motion 时取消非必要位移 |

## 工具与进度

- 分段选项沿用品牌 ChoiceStrip 语言，不直接使用 Material `SegmentedButton` 默认外观；
- 进度轨高 3、拇指半径 6；accent 只表示当前位置、选中和主操作；
- 步进按钮使用 token 色胶囊；禁用态读 secondary@0.38；
- 漫画与图书可以有不同工具项，但相同语义必须共用尺寸、状态层和文字层级。

## 阅读器字号映射

阅读器文字属于内容层和 chrome，使用开卷产品 token：

| 部位 | 语义角色 | 产品 token |
|---|---|---|
| 章节标题 | `sectionTitle` | `typography.reader.chapterTitle` = 18px |
| 书名 | `title` | `typography.reader.bookTitle` = 16px |
| 分区标签 | `caption` | `typography.reader.sectionLabel` = 13px |
| 工具标签 | `captionSmall` | `typography.reader.toolLabel` = 11px |
| 工具值 | `caption` | `typography.reader.toolValue` = 13px |
| 批注/书签标题 | `sectionTitle` | `typography.reader.annotationTitle` / `bookmarkTitle` = 20px |
| 摘录标题 | `title` | `typography.reader.excerptTitle` = 16px |
| 摘录正文 | `bodySecondary` | `typography.reader.excerptBody` = 15px |
| 摘录大引用 | 内容层装饰 | `typography.reader.excerptQuote` = 48px |
| 等待封面 | `pageTitle` | `typography.reader.waitingCover` = 28px |
| 搜索结果 | `bodySecondary` | `typography.reader.searchResult` = 15px |
| 漫画缩略图标签 | `title` | `typography.reader.thumbnailLabel` = 16px |
| 选区菜单 | `captionSmall` | `typography.reader.selectionMenu` = 10px |
| chrome 标题 | `bodySecondary` | `typography.reader.overlayTitle` = 15px |
| chrome 副标题 | `captionSmall` | `typography.reader.overlaySubtitle` = 11px |

这些是开卷产品层 override。实现必须从对应品牌角色出发，再应用产品映射。

## 图书阅读器

- 目录抽屉包含「目录 / 书签 / 笔记」，属于同一导航面，不拆成三个根级入口；
- 搜索面板、选区菜单、批注编辑、书摘卡和看大图属于阅读器产品模式；
- 选区菜单可展示内容层高亮色板；菜单容器、文字、选中结构仍遵循品牌浮层规则；
- 图书 chrome 取色分叉见 `../divergences.md → D1`，不得扩散到书库或设置页。

## 漫画阅读器

- 阅读模式、方向、主题、双页与亮度放在阅读器工具面板内；
- 缩略图跳页与书签列表使用品牌 sheet：顶角 r18、maxWidth 760、默认把手；
- 漫画图像、双页贴合与缩放手势属于内容层；chrome 不改变图像裁切和页序。

## 浮层层级

1. 阅读内容；
2. 可隐藏 chrome；
3. 工具面板 / 抽屉；
4. 选择菜单、对话框与全屏看图。

同一时刻只保留一个主工具面板。打开更高层浮层时暂停底层阅读手势，关闭后恢复。

## 禁止事项

- 禁止让 App 皮肤强行覆盖书页主题；
- 禁止把阅读色板带出阅读器；
- 禁止在壳层组件中复制书籍或漫画专用颜色；
- 禁止直接套 Material Slider、PopupMenu、elevation；
- 禁止修改阅读引擎、页序或排版来满足 chrome 布局。

## 验收锚点

- chrome 高 56；macOS 阅读器避让 78；
- 滑杆轨 3、拇指 r6；
- 漫画 sheet r18 / maxWidth 760；
- 切换 App 皮肤不改变图书内容主题；
- 关闭阅读器后，所有壳层 chrome 恢复品牌皮肤 token。

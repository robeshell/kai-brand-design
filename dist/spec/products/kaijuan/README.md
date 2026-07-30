# 开卷（kaijuan）产品规范

**productSpecVersion: 0.2.0**

本地阅读 App（一个 App、图书 / 漫画双引擎）。品牌层设置页模式（分组卡片 + 皮肤预览卡）的原始来源产品。

## L0 登记

| 项 | 值 |
|---|---|
| 产品名 | 开卷 / kaijuan（`com.kaijuan.reader`） |
| 强调色轴 | `tokens/accents.json → products.kaijuan`，默认暖橙 `#EA580C`，5 预设；单值模型（hover/pressed 由通用 stateLayer 叠加表达） |
| 组件命名前缀 | `App*`（`AppGlassSurface`、`AppListRow`…） |
| 内容层扩展点 | **阅读主题**（paper/sepia/dark/pureBlack 色板、阅读字体栈）：阅读内容渲染完全独立，chrome（工具条/抽屉/菜单）在皮肤 token 与阅读色板之间按页登记取色来源 |
| 参考实现 | `kaijuan/lib/core/theme/`（主题层：tokens/glass/skins/app_theme/context）、`lib/presentation/widgets/app_components.dart`（组件 kit）、`widgets/settings_components.dart`（设置 kit） |
| 壳层对齐 | 品牌 **0.2.5–0.2.8**：侧栏 216/236、锚定菜单、渐变画布、玻璃 chrome、主窗 1280×800 |

## 产品特有规范

| 文件 | 内容 |
|---|---|
| `tokens.md` | 产品级 token：窄幅书籍 / 漫画封面的圆角 |
| `patterns/reader.md` | 双引擎阅读器 chrome：显隐、工具条、进度、目录/书签/笔记、搜索与内容层边界 |
| `patterns/bookshelf.md` | 书架/书库：继续阅读、封面网格、合集封面、列表态与空态 |
| `patterns/collections-and-import.md` | 书单、合集、导入任务、搜索与筛选 |
| `divergences.md` | 阅读主题取色、内容层字面色与阅读器平台视图等已知分叉 |

## 规则

1. 阅读内容渲染（书页排版、漫画图像、阅读色板）不是设计规范的约束对象——规范管 chrome，不管内容；
2. 与品牌层冲突时品牌层优先；确需偏离 → 登记 `divergences.md`；
3. 开卷需要开听产品层已有的组件（如媒体行）时，先提升到品牌层再复用。

## Changelog

- **0.2.0**（2026-07-29）：补齐书单、合集、导入和搜索流程；普通 chrome 全部映射平台 Profile。
- **0.1.1**（2026-07-26）：封面圆角从品牌通用 card r14 调整为产品 token r12；窄幅封面减少圆润感，普通卡片仍保持 r14。
- **0.1.0**（2026-07-26）：从 skeleton 升为可执行产品规范；补齐阅读器、书架/书库模式与分叉登记；壳层口径同步品牌 0.2.8。
- **0.0.1**（2026-07-24）：产品目录建立，L0 登记落地；模式规范待"回开卷"阶段从代码反向提炼。

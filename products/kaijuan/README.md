# 开卷（kaijuan）产品规范

**productSpecVersion: 0.0.1（skeleton）**

阅读器（书籍 / 漫画双 flavor）。品牌层设置页模式（分组卡片 + 皮肤预览卡）的原始来源产品。

## L0 登记

| 项 | 值 |
|---|---|
| 产品名 | 开卷 / kaijuan（`com.kaijuan.reader`） |
| 强调色轴 | `tokens/accents.json → products.kaijuan`，默认暖橙 `#EA580C`，5 预设；单值模型（hover/pressed 由通用 stateLayer 叠加表达） |
| 组件命名前缀 | `App*`（`AppGlassSurface`、`AppListRow`…） |
| 内容层扩展点 | **阅读主题**（paper/sepia/dark/pureBlack 色板、阅读字体栈）：阅读内容渲染完全独立，chrome（工具条/抽屉/菜单）在皮肤 token 与阅读色板之间按页登记取色来源 |
| 参考实现 | `kaijuan/lib/core/theme/`（主题层：tokens/glass/skins/app_theme/context）、`lib/presentation/widgets/app_components.dart`（组件 kit）、`widgets/settings_components.dart`（设置 kit） |

## 已落地、待提炼的规范

开卷代码侧已完成设计系统对齐（皮肤预设 + 玻璃 token + 组件 kit），但以下产品模式尚未反向提炼成文档——随"回开卷"阶段补全：

| 规划文件 | 内容 |
|---|---|
| `patterns/reader.md` | 阅读器 chrome：顶栏/底栏高度、红绿灯避让 78、工具条分段控件、进度滑杆、目录抽屉、搜索面板、长按选择菜单、摘抄卡片、书签弹层、漫画缩略图 |
| `patterns/bookshelf.md` | 书架/书库：封面网格、合集封面、空态 |
| `divergences.md` | 已知分叉：阅读器 chrome 取色自阅读主题而非皮肤（书籍）；双 flavor 共享主题路径 |

## 规则

1. 阅读内容渲染（书页排版、漫画图像、阅读色板）不是设计规范的约束对象——规范管 chrome，不管内容；
2. 与品牌层冲突时品牌层优先；确需偏离 → 登记 `divergences.md`；
3. 开卷需要开听产品层已有的组件（如媒体行）时，先提升到品牌层再复用。

## Changelog

- **0.0.1**（2026-07-24）：产品目录建立，L0 登记落地；模式规范待"回开卷"阶段从代码反向提炼。

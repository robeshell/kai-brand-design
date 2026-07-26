# 开刮（kaigua）产品规范

**productSpecVersion: 0.1.1**

跨平台媒体刮削与整理桌面应用（Tauri 2 + React）。品牌层 chrome 规范的第三个产品接入点。

## L0 登记

| 项 | 值 |
|---|---|
| 产品名 | 开刮 / kaigua |
| 强调色轴 | `tokens/accents.json → products.kaigua`，默认靛蓝 `#6673C7`，4 预设；单值模型（hover/pressed 由通用 stateLayer 叠加表达） |
| 组件命名前缀 | `Kg*`（`KgGlassSurface`、`KgListRow`…） |
| 内容层扩展点 | **媒体海报 / 剧照**：列表与详情中的封面图是内容主角；chrome 仍走皮肤 token，海报取色不反向污染壳层 |
| 参考实现 | `kaigua/desktop/src/styles/tokens.css`（主题层 CSS 变量）、`desktop/src/App.tsx` + `components/`（壳与反馈） |
| 壳层对齐 | 品牌 **0.2.5–0.2.8**：窗口分级、侧栏、锚定菜单、页边距/标题、主窗 1280×800 |

## 规则

1. 刮削结果、NFO、海报文件不是设计规范的约束对象——规范管 chrome，不管元数据内容；
2. 与品牌层冲突时品牌层优先；确需偏离 → 登记 `divergences.md`；
3. 需要开听/开卷产品层已有的组件时，先提升到品牌层再复用。

## Changelog

- **0.1.1**（2026-07-26）：锚定菜单补齐——内容撑开定位、分组 hairline、触发器自动上下翻；`KgMenu` / `KgMenuItem` 组件化。
- **0.1.0**（2026-07-26）：壳层 chrome 对齐品牌 0.2.5–0.2.7（侧栏 metrics、锚定菜单、窗口分级 gutter/标题、chrome 右向影）；主库仍无独立页标题（toolbar-first IA）。
- **0.0.1**（2026-07-24）：产品目录建立，L0 登记落地（默认靛蓝）；设置页信息架构分叉见 `divergences.md`。

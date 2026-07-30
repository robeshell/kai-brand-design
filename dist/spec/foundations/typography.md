# 排版规范

> 唯一组件数值源：`tokens/primitives.json → componentProfiles.*.typeScale`。

组件只选择语义角色，再由 Mobile 或 Desktop Profile 输出具体数值。五个平台的
官方字号继续保存在 `platformProfiles`，用于检查系统字体缩放和可用性，不用于
生成五套组件外观。

## 语义角色

| 角色 | 使用位置 |
|---|---|
| `displayLarge` | 沉浸页的单个展示标题 |
| `pageTitle` | 页面主标题 |
| `sectionTitle` | 页面分区、对话框和 Sheet 标题 |
| `title` | 组件标题、强调行标题 |
| `body` | 正文、输入文字、普通列表主标题 |
| `bodySecondary` | 列表副题、说明文字 |
| `label` | 按钮、选择控件、表单标签 |
| `caption` | 时间、状态、元信息 |
| `captionSmall` | 底部导航等空间受限的短标签 |

## 实际输出

| 角色 | Mobile | Desktop |
|---|---:|---:|
| `displayLarge` | 34 / 42 · w600 | 32 / 40 · w600 |
| `pageTitle` | 28 / 36 · w600 | 24 / 32 · w600 |
| `sectionTitle` | 22 / 28 · w600 | 18 / 24 · w600 |
| `title` | 17 / 24 · w600 | 14 / 20 · w600 |
| `body` | **17 / 24 · w400** | **14 / 20 · w400** |
| `bodySecondary` | 15 / 20 · w400 | 12 / 18 · w400 |
| `label` | 16 / 22 · w600 | 14 / 20 · w600 |
| `caption` | 13 / 18 · w400 | 12 / 16 · w400 |
| `captionSmall` | 11 / 16 · w500 | 11 / 16 · w500 |

## 使用规则

- Flutter 的 `TextTheme` 根据 Mobile / Desktop 建立，不根据操作系统换字号；
- 字体族使用目标系统 UI 字体，保持本地语言字形和系统渲染；
- Mobile 必须响应 iOS Dynamic Type 与 Android 字体缩放；
- Desktop 必须响应系统显示缩放和字体设置；
- 界面字重只使用 400、500、600；
- 放大后优先换行和增高，不裁切文字或隐藏操作。

## 必须验证

1. iOS Dynamic Type 与 Android 系统字体缩放；
2. 100%、125%、150%、200% 文本尺度；
3. 中文、英文、数字和混排；
4. 单行、双行、长标题和无障碍大字；
5. 放大后信息与操作不减少。

## 官方依据

- <https://developer.apple.com/design/human-interface-guidelines/typography>
- <https://developer.android.com/develop/ui/compose/designsystems/material3>
- <https://learn.microsoft.com/windows/apps/design/signature-experiences/typography>
- <https://developer.gnome.org/hig/guidelines/typography.html>
- <https://develop.kde.org/hig/text_and_labels/>

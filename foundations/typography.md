# 排版规范

> 字号采用三层模型：`typography.semanticRoles` 定义语义层级，`typography.componentMappings` 定义组件 slot 的使用关系，`componentProfiles.*.typeScale` 输出 Mobile / Desktop 的最终数值。组件实现只消费 Profile 输出或生成的兼容 API。

## 三层模型

```text
typography.semanticRoles
        ↓
typography.componentMappings.<component>.<slot>
        ↓
componentProfiles.mobile/desktop.typeScale
```

- **语义角色**表达文字的层级和意图，不绑定某一个组件。
- **组件映射**表达组件的具体 slot 使用哪个语义角色，例如 `list-rows.title → listTitle`。
- **组件 Profile**提供 Mobile / Desktop 的字号、行高、字重和字距；这是生成器的数值来源。
- `platformProfiles` 只保存 iOS、Android、macOS、Windows、Linux 的官方基准，用于系统缩放和可用性校验，不生成组件外观。

组件需要偏离语义角色的默认输出时，必须在 component mapping 中登记 Profile override 和 rationale。禁止在产品代码中无来源地散落新的字号。

## 语义角色

| 角色 | 使用意图 |
|---|---|
| `displayLarge` | 沉浸页中的单个展示标题 |
| `pageTitle` | 页面主标题 |
| `sectionTitle` | 页面分区、对话框和 Sheet 标题 |
| `title` | 组件标题或强调行标题 |
| `body` | 正文和普通内容标题 |
| `inputText` | 输入框、搜索框和文本编辑控件中的文字；基于 `body`，因控件密度需要而单独输出 |
| `bodySecondary` | 列表副题和说明文字 |
| `label` | 按钮、选择控件和表单标签 |
| `caption` | 时间、状态和普通元信息 |
| `captionSmall` | 空间受限的短标签 |
| `listTitle` | 列表行标题的组件角色；基于 `body`，因列表密度需要而单独输出 |
| `gridTitle` | 封面网格和紧凑卡片中的标题；基于 `listTitle`，因卡片高度约束而单独输出 |

`listTitle` 是组件角色，不是新的通用语义层级。所有组件角色都必须声明基础角色或明确 rationale。

## 组件映射示例

| 组件 slot | 角色 |
|---|---|
| `buttons.label` | `label` |
| `inputs.text` | `inputText` |
| `inputs.helperText` | `bodySecondary` |
| `navigation.desktopLabel` | `body` |
| `navigation.mobileLabel` | `captionSmall` |
| `list-rows.title` | `listTitle` |
| `list-rows.subtitle` | `bodySecondary` |
| `dialogs.title` | `sectionTitle` |
| `dialogs.body` | `body` |
| `app-bars.title` | `pageTitle` |
| `data-display.title` | `title` |

组件文档和契约应引用 `component → slot → role → Profile`，而不是把某个字号解释成组件全局字号。

## 实际输出

| 角色 | Mobile | Desktop |
|---|---:|---:|
| `displayLarge` | 34 / 42 · w600 · −0.2 | 32 / 40 · w600 · −0.2 |
| `pageTitle` | 28 / 36 · w600 · −0.2 | 24 / 32 · w600 · −0.2 |
| `sectionTitle` | 22 / 28 · w600 · −0.15 | 18 / 24 · w600 · −0.1 |
| `title` | 17 / 24 · w600 | 14 / 20 · w600 |
| `body` | **17 / 24 · w400** | **14 / 20 · w400** |
| `inputText` | 16 / 22 · w400 | 14 / 20 · w400 |
| `bodySecondary` | 15 / 22 · w400 | 12 / 18 · w400 |
| `listTitle` | 15 / 22 · w500 | 14 / 20 · w500 |
| `gridTitle` | 15 / 22 · w500 | 14 / 20 · w500 |
| `label` | 16 / 22 · w600 | 14 / 20 · w600 |
| `caption` | 13 / 18 · w400 | 12 / 16 · w400 |
| `captionSmall` | 12 / 16 · w500 | 12 / 16 · w500 |

`captionSmall` 仅用于底栏/紧凑导航等短标签，不得作正文或列表标题。

## 使用规则

- Flutter 的 `TextTheme` 根据 Mobile / Desktop 建立，不根据操作系统换字号；
- 字体族使用目标系统 UI 字体，保持本地语言字形和系统渲染；
- Mobile 必须响应 iOS Dynamic Type 与 Android 字体缩放；
- Desktop 必须响应系统显示缩放和字体设置；
- 界面字重只使用 400、500、600；
- 组件可因空间、交互密度或平台约束使用组件级 override，但必须登记 mapping 和理由；
- 放大后优先换行和增高，不裁切文字或隐藏操作；
- 组件级例外仍须追溯到语义角色，不得形成产品私有的无名字号体系。

## 必须验证

1. iOS Dynamic Type 与 Android 系统字体缩放；
2. 100%、125%、150%、200% 文本尺度；
3. 中文、英文、数字和混排；
4. 单行、双行、长标题和无障碍大字；
5. 放大后信息与操作不减少；
6. 每个 typography contract 都能解析到 semantic role 和 component mapping。

## 官方依据

- <https://developer.apple.com/design/human-interface-guidelines/typography>
- <https://developer.android.com/develop/ui/compose/designsystems/material3>
- <https://learn.microsoft.com/windows/apps/design/signature-experiences/typography>
- <https://developer.gnome.org/hig/guidelines/typography.html>
- <https://develop.kde.org/hig/text_and_labels/>

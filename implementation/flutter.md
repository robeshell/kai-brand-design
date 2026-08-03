# DSL → Flutter 实现指南（Runbook）

> 目标读者：负责把本规范落到某个 Flutter 产品的工程师或 AI。按顺序执行。
> 参考实现：kaiting `lib/core/sound_theme.dart` + `lib/presentation/widgets/sound_components.dart`；kaijuan `lib/core/theme/` + `lib/presentation/widgets/app_components.dart`（**结构更接近本规范，优先参考**）。

## 第 0 步：确定产品 L0

- 从 `tokens/primitives.json → basePalette` 取主内容背景、侧栏背景和参考主色；
- 从 `tokens/accents.json` 取产品的强调色轴（新产品则新增）；
- 根据产品形态选择 `componentProfiles.mobile` 或 `componentProfiles.desktop`；再根据 `TargetPlatform` 选择行为适配器；
- 确定内容层扩展点（阅读主题 / 播放器皮肤 / 无）。

## 第 1 步：主题层文件（建议结构）

```
lib/core/theme/
  brand_tokens.g.dart # 自动生成：品牌原始常量，禁止手改
  tokens.dart    # L1 兼容 API：spacing、radii、AccentPreset；值引用生成层
  glass.dart     # L2：GlassTheme、SkinEffects（ThemeExtension，译自 skins.json 的 glass/effects）
  skins.dart     # L2：SkinPreset、Skins（预设常量 + byId + system 解析）
  context.dart   # BuildContext 扩展：glass、effects、三档文字、divider、tint、chromeSurface、destructiveButtonStyle
  app_theme.dart # L3：Theme.forSkin(skin, accent) → ThemeData
```

要点：

0. **先构建再同步**：在设计仓库运行 `make build check`，再执行 `python3 tool/kai_design.py sync --only <product>`；流程见 `implementation/token-pipeline.md`。禁止手工翻译 JSON；
1. **ThemeExtension 承载语义层**：`GlassTheme`（11 字段）、`SkinEffects`（8 字段），含 `copyWith` 与 `lerp`；
2. **强调色注入 ColorScheme**（推荐 kaijuan 模型）：`ColorScheme.fromSeed(seedColor: accent).copyWith(primary: accent, onPrimary: 亮度估算, surfaceTint: transparent, surfaceContainer* ← 坡道, outline/outlineVariant ← border/hairline)`。**不要**用开听的静态变量突变模型（`SoundColors.accent = …`）——那是历史包袱；
3. Mobile 使用一套 `ThemeData`，Desktop 使用一套 `ThemeData`；普通按钮、输入、列表和导航不根据操作系统换皮肤；
4. TextTheme 按当前 Component Profile 的 `typeScale` 建立。组件只请求 `pageTitle`、`body`、`label` 等语义角色，不在组件中判断平台或写字号；**禁止 w700+**，选中态靠颜色和 w600 区分。

建议增加唯一解析入口：

```dart
KaiComponentProfile resolveKaiComponentProfile(AppFormFactor formFactor)
```

响应式布局只能改变信息架构和可用宽度，不能把桌面 Profile 换成移动 Profile。

## 第 2 步：平台行为适配

先查 `components/platform-component-map.md`。视觉组件只分 Mobile 和 Desktop；TargetPlatform 只处理系统行为与服务。

- Android：系统返回、Insets、权限和必要触控反馈；
- iOS/iPadOS：安全区、滑动返回、权限、分享和系统编辑行为；
- macOS：窗口、菜单栏、右键、拖放和快捷键；
- Windows/Linux：窗口、焦点、高对比度、键鼠和系统文件面板。

## 第 3 步：组件 kit（按依赖序）

1. **GlassSurface 第一**——所有浮面的原语。`base` 读取 `surface + blur`，`strong` 读取 `strongSurface + strongBlur`；两者都读取 border 与 shadow，strong 额外读取 innerHighlight；blur≤0 跳过 BackdropFilter；
2. 跨产品确实复用的内容组件，如 ListRow、TaskStatus、ResultSummary；
3. 平台适配器：PrimaryNavigation、PlatformDialog、PlatformMenu、PlatformProgress；
4. 产品专属组件继续放产品层；
6. （设置页）SettingsGroup / PageHeader / SkinCard。

规则：kit 组件只读 `context` 扩展与 `colorScheme`，不出现字面色值；业务组件不得直接选择 `elevated`、`overlay` 或任意灰色填充来替代 GlassSurface。

## 第 4 步：持久化与外壳

- 外观偏好：持久化 `skinPreset`（'system' 或预设 id）+ `accentPreset`；跟随系统用 `theme/darkTheme + ThemeMode.system` 映射到两个皮肤实现；
- 外壳按 `patterns/app-shell.md` 实现窗口分级与双壳；
- 旧存储迁移要写单元测试（参照 kaijuan `test/theme_preferences_test.dart`）。

## 第 5 步：自检

跑 `implementation/acceptance-checklist.md`：先静态分析与数值锚点，再人工巡检。

## 命名

规范用中性名；产品实现加前缀（`Sound*` / `App*` / 新产品自定）。文件结构与 getter 命名保持与 kaijuan `theme/` 一致，便于跨产品移植 diff。

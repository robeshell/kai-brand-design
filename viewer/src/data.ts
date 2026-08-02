import bundle from "../../dist/tokens/kai.tokens.json";
import metaBundle from "../../dist/tokens/kai.meta.json";
import type {
  InspectorTarget,
  PageId,
  PlatformId,
  ProductId,
  SkinId,
  TokenBundle,
} from "./types";

export const tokens = bundle as unknown as TokenBundle;
export const viewerContent = tokens.viewerContent;
export const componentContracts = tokens.componentContracts;
export const deliveryMeta = metaBundle as {
  specVersion: string;
  tokenDigest: string;
};

export const productMeta: Record<
  ProductId,
  {
    character: string;
    content: string;
    prefix: string;
    differences: Array<{ title: string; description: string; reference: string }>;
    patterns: Array<{ title: string; description: string; reference: string }>;
  }
> = {
  kaiting: {
    character: "沉浸、节奏、封面主角",
    content: "专辑封面、黑胶与歌词属于内容层。",
    prefix: "Sound*",
    differences: [
      {
        title: "封面氛围",
        description: "详情页可以从封面提取背景和控件色，不改变通用界面的颜色规则。",
        reference: "divergences D1",
      },
      {
        title: "黑胶造型",
        description: "盘面、唱臂和旋转属于内容表现，不使用通用组件的圆角与形状规则。",
        reference: "divergences D3",
      },
      {
        title: "歌词层级",
        description: "正在播放页允许使用更大的歌词字号，但普通界面文字仍遵守通用层级。",
        reference: "divergences D4",
      },
    ],
    patterns: [
      { title: "资料库与搜索", description: "分类、来源筛选、分组结果和状态恢复。", reference: "patterns/library-and-search.md" },
      { title: "专辑与艺人详情", description: "封面 Hero、曲目列表、主要操作和氛围边界。", reference: "patterns/album-detail.md" },
      { title: "正在播放", description: "双栏/单栏、黑胶、歌词、队列和迷你播放器。", reference: "patterns/now-playing.md" },
    ],
  },
  kaijuan: {
    character: "安静、克制、书房感",
    content: "书页、漫画与窄幅封面属于内容层。",
    prefix: "App*",
    differences: [
      {
        title: "封面圆角",
        description: "书籍和漫画封面使用 12px 圆角；普通界面卡片继续使用通用圆角。",
        reference: "cover.radius · 12px",
      },
      {
        title: "阅读主题",
        description: "阅读器工具栏跟随当前书页主题取色，退出阅读器后恢复通用界面主题。",
        reference: "divergences D1",
      },
      {
        title: "内容渲染",
        description: "书内样式、高亮色和漫画像素属于内容，不反向影响书库、设置和弹窗。",
        reference: "divergences D2",
      },
    ],
    patterns: [
      { title: "书架与书库", description: "继续阅读、封面网格、筛选与管理态。", reference: "patterns/bookshelf.md" },
      { title: "书单、合集与导入", description: "整理容器、导入预览、重复项和搜索。", reference: "patterns/collections-and-import.md" },
      { title: "阅读器", description: "双引擎 chrome、目录、进度、搜索和内容边界。", reference: "patterns/reader.md" },
    ],
  },
  kaigua: {
    character: "清晰、可靠、媒体工作台",
    content: "海报、剧照与刮削结果属于内容层。",
    prefix: "Kg*",
    differences: [
      {
        title: "媒体图片",
        description: "海报和剧照是内容素材，其比例、裁切和颜色不成为通用组件规则。",
        reference: "content boundary",
      },
      {
        title: "元数据内容",
        description: "刮削结果和说明文件由产品定义；规范只约束承载它们的界面组件。",
        reference: "product scope",
      },
      {
        title: "设置结构",
        description: "设置页继续使用通用的单页分组结构，不保留旧版多标签布局。",
        reference: "divergences D1",
      },
    ],
    patterns: [
      { title: "媒体资料库", description: "目录、类型筛选、海报/列表和主从详情。", reference: "patterns/media-library.md" },
      { title: "详情与手动匹配", description: "元数据、候选搜索、确认和危险操作。", reference: "patterns/media-detail-and-match.md" },
      { title: "批量任务与重命名", description: "预览、冲突、部分失败、清理和日志。", reference: "patterns/batch-tasks-and-renamer.md" },
    ],
  },
};

export const viewportWidths = {
  fluid: "100%",
  mobile: "390px",
  tablet: "820px",
  medium: "1024px",
  wide: "1280px",
} as const;

export const platformComponentGuidance: Record<
  PlatformId,
  {
    navigation: string;
    bars: string;
    controls: string;
    presentation: string;
    interaction: string;
    source: string;
  }
> = {
  appleMobile: {
    navigation: "iPhone 使用 Tab Bar；iPad 根据空间使用 Tab Bar 或 Sidebar。",
    bars: "Navigation Bar 与 Toolbar 承载标题、返回和页面操作。",
    controls: "使用 Apple 控件结构，保留 44pt 命中目标、动态字体和系统编辑行为。",
    presentation: "短任务使用 Sheet；沉浸任务可使用 Full-screen Cover。",
    interaction: "保留滑动返回、安全区域、系统滚动和 VoiceOver 语义。",
    source: "Apple HIG · SwiftUI / UIKit",
  },
  androidMobile: {
    navigation: "紧凑窗口使用 Navigation Bar；大屏转换为 Navigation Rail 或 Drawer。",
    bars: "Top App Bar 承载标题、返回和页面级操作。",
    controls: "使用 Material 3 组件结构，保留 48dp 命中目标和状态层反馈。",
    presentation: "按任务使用 Dialog、Bottom Sheet 或独立页面。",
    interaction: "保留系统返回、Edge-to-edge Insets、触控反馈和 TalkBack 语义。",
    source: "Android Design · Material 3",
  },
  macDesktop: {
    navigation: "使用 Sidebar + Toolbar；页内少量并列内容使用 Segmented Control 或 Tabs。",
    bars: "窗口 Toolbar 与 Titlebar 共同承载全局和页面操作。",
    controls: "使用桌面紧凑控件，不放大成手机尺寸。",
    presentation: "与当前文档相关的短任务使用 Sheet，独立任务使用窗口或 Dialog。",
    interaction: "完整支持菜单栏、右键、Hover、键盘焦点和快捷键。",
    source: "macOS HIG · SwiftUI / AppKit",
  },
  windowsDesktop: {
    navigation: "使用 NavigationView，在展开、紧凑和顶部模式之间自适应。",
    bars: "TitleBar 与 CommandBar 承载导航和命令。",
    controls: "使用 WinUI 控件结构、焦点视觉和高对比度能力。",
    presentation: "使用 ContentDialog、Flyout 或独立窗口。",
    interaction: "完整支持键盘、右键、Hover、系统缩放和窗口贴靠。",
    source: "Fluent · WinUI 3",
  },
  linuxDesktop: {
    navigation: "以 Sidebar / View Switcher 为默认，跟随目标桌面环境调整。",
    bars: "Header Bar 或 Toolbar 承载窗口和页面操作。",
    controls: "以 GNOME/GTK 桌面密度为基准，同时兼容 KDE 主题与快捷键。",
    presentation: "使用 Dialog、Popover 或独立窗口，避免照搬手机 Bottom Sheet。",
    interaction: "支持键盘、右键、Hover、系统主题和 Freedesktop 图标语义。",
    source: "GNOME HIG · GTK/libadwaita；KDE HIG 兼容",
  },
};

export const navigationGroups: Array<{
  label: string;
  items: Array<{ id: PageId; label: string }>;
}> = [
  {
    label: "开始",
    items: [
      { id: "overview", label: "总览" },
    ],
  },
  {
    label: "基础规范",
    items: [
      { id: "color", label: "颜色" },
      { id: "platforms", label: "平台基准" },
      { id: "typography", label: "字体" },
      { id: "spacing", label: "间距与圆角" },
      { id: "motion", label: "动效" },
    ],
  },
  {
    label: "组件",
    items: [
      { id: "components", label: "组件基础" },
      { id: "buttons", label: "按钮" },
      { id: "inputs", label: "输入框" },
      { id: "selection", label: "选择控件" },
      { id: "navigation", label: "导航" },
      { id: "list-rows", label: "列表行" },
      { id: "feedback", label: "反馈" },
      { id: "dialogs", label: "对话框" },
      { id: "menus", label: "菜单与底部弹层" },
      { id: "icons", label: "图标" },
      { id: "app-bars", label: "顶栏与标签" },
      { id: "data-display", label: "数据展示" },
    ],
  },
  {
    label: "APP 结构",
    items: [
      { id: "app-shell", label: "应用框架" },
      { id: "content-browser", label: "内容浏览" },
      { id: "task-workspace", label: "任务工作台" },
    ],
  },
  {
    label: "状态与反馈",
    items: [
      { id: "status-system", label: "通用状态系统" },
    ],
  },
  {
    label: "产品与工程",
    items: [
      { id: "products", label: "产品差异" },
      { id: "delivery", label: "生成文件" },
      { id: "qa", label: "检查清单" },
    ],
  },
];

export const navigation = navigationGroups.flatMap((group) => group.items);

export const componentStories = [
  {
    id: "buttons",
    name: "Buttons",
    description: "主操作、次操作和工具操作共享状态层与胶囊形状。",
    tokens: ["radii.pill", "componentProfiles.*.metrics.controlHeight", "motion.uiStandard"],
  },
  {
    id: "inputs",
    name: "Inputs",
    description: "输入面使用 subtle fill；焦点由 2px accent 描边表达。",
    tokens: ["radii.control", "derivedAlphas.subtleFill", "componentProfiles.*.typeScale.inputText"],
  },
  {
    id: "selection",
    name: "Selection",
    description: "Chip、Switch 与 Checkbox 只在选中状态使用强调色。",
    tokens: ["radii.pill", "derivedAlphas.selection", "motion.uiStandard"],
  },
  {
    id: "navigation",
    name: "Navigation",
    description: "桌面侧栏与移动底栏共享目的地语义，不共享行规格。",
    tokens: ["layoutMetrics.sidebarWidth", "componentProfiles.*.typeScale.captionSmall"],
  },
  {
    id: "list-rows",
    name: "List rows",
    description: "设置项、操作项和多选行共享固定的解剖与状态。",
    tokens: ["componentProfiles.*.typeScale.listTitle", "radii.control"],
  },
  {
    id: "feedback",
    name: "Feedback",
    description: "轻提示、空态、加载和进度使用统一的反馈语言。",
    tokens: ["radii.menu", "motion.uiStandard"],
  },
  {
    id: "dialogs",
    name: "Dialogs",
    description: "确认、输入和复杂任务使用收缩包裹的对话框。",
    tokens: ["radii.dialog", "layoutMetrics.dialog"],
  },
  {
    id: "menus",
    name: "Menus",
    description: "同一份操作数据在宽屏显示菜单，在窄屏显示底部弹层。",
    tokens: ["radii.menu", "radii.sheet"],
  },
] as const;

export function resolveSkin(id: SkinId): Exclude<SkinId, "system"> {
  if (id !== "system") return id;
  return matchMedia("(prefers-color-scheme: dark)").matches
    ? "deep-night"
    : "default";
}

export function getPath(path: string): unknown {
  return path.split(".").reduce<unknown>((current, key) => {
    if (typeof current !== "object" || current === null) return undefined;
    return (current as Record<string, unknown>)[key];
  }, tokens.primitives);
}

export function inspect(
  role: string,
  token: string,
  value: unknown,
  source = "tokens/primitives.json",
  note = "这是三个产品共用的设计变量。",
): InspectorTarget {
  return {
    role,
    token,
    value:
      typeof value === "string" ? value : JSON.stringify(value, null, 2),
    source,
    note,
  };
}

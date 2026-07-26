import bundle from "../../dist/tokens/kai.tokens.json";
import metaBundle from "../../dist/tokens/kai.meta.json";
import type {
  InspectorTarget,
  PageId,
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
  },
};

export const viewportWidths = {
  fluid: "100%",
  mobile: "390px",
  tablet: "820px",
  medium: "1024px",
  wide: "1280px",
} as const;

export const navigationGroups: Array<{
  label: string;
  items: Array<{ id: PageId; label: string }>;
}> = [
  {
    label: "开始",
    items: [
      { id: "overview", label: "总览" },
      { id: "getting-started", label: "怎么使用" },
    ],
  },
  {
    label: "基础规范",
    items: [
      { id: "color", label: "颜色" },
      { id: "typography", label: "字体" },
      { id: "spacing", label: "间距与圆角" },
      { id: "motion", label: "动效" },
    ],
  },
  {
    label: "组件",
    items: [
      { id: "components", label: "组件总览" },
      { id: "surfaces", label: "表面与容器" },
      { id: "buttons", label: "按钮" },
      { id: "inputs", label: "输入框" },
      { id: "selection", label: "选择控件" },
      { id: "navigation", label: "导航" },
      { id: "list-rows", label: "列表行" },
      { id: "feedback", label: "反馈" },
      { id: "dialogs", label: "对话框" },
      { id: "menus", label: "菜单与底部弹层" },
      { id: "data-display", label: "数据展示" },
    ],
  },
  {
    label: "页面结构",
    items: [
      { id: "app-shell", label: "应用框架" },
      { id: "overlays", label: "弹窗与浮层" },
      { id: "settings", label: "设置页" },
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
    tokens: ["radii.pill", "tapTargets.buttonMin", "motion.uiStandard"],
  },
  {
    id: "inputs",
    name: "Inputs",
    description: "输入面使用 subtle fill；焦点由 2px accent 描边表达。",
    tokens: ["radii.control", "derivedAlphas.subtleFill", "typography.sizes.rowTitle"],
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
    tokens: ["layoutMetrics.sidebarWidth", "typography.sizes.navLabel"],
  },
  {
    id: "list-rows",
    name: "List rows",
    description: "设置项、操作项和多选行共享固定的解剖与状态。",
    tokens: ["typography.sizes.rowTitle", "radii.control"],
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

import "./styles.css";
import {
  componentContracts,
  deliveryMeta,
  inspect,
  navigation,
  navigationGroups,
  platformComponentGuidance,
  productMeta,
  resolveSkin,
  tokens,
  viewerContent,
  viewportWidths,
} from "./data";
import { loadState, saveState, type AppState } from "./state";
import { applyPlatformProfile, applyTheme, installPrimitiveVariables } from "./theme";
import type {
  InspectorTarget,
  PageId,
  ProductId,
  PlatformId,
  SkinId,
} from "./types";

const rootElement = document.querySelector<HTMLDivElement>("#app");
if (!rootElement) throw new Error("Missing #app");
const root = rootElement;
let state = loadState();
let mobileNavOpen = false;

const escapeHtml = (value: unknown): string =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const displayColor = (value: string): string => {
  const [base, alpha] = value.split("@");
  if (!alpha) return value.startsWith("#") || value === "transparent" ? value : "transparent";
  const rgb =
    base === "white"
      ? "255 255 255"
      : base === "black"
        ? "0 0 0"
        : `${Number.parseInt(base.slice(1, 3), 16)} ${Number.parseInt(base.slice(3, 5), 16)} ${Number.parseInt(base.slice(5, 7), 16)}`;
  return `rgb(${rgb} / ${alpha})`;
};

const option = (value: string, label: string, current: string): string =>
  `<option value="${escapeHtml(value)}" ${value === current ? "selected" : ""}>${escapeHtml(label)}</option>`;

const targetAttrs = (target: InspectorTarget): string =>
  `data-token="${escapeHtml(target.token)}" data-role="${escapeHtml(target.role)}" data-value="${escapeHtml(target.value)}" data-source="${escapeHtml(target.source)}" data-note="${escapeHtml(target.note)}"`;

const pageInfo = () =>
  navigation.find((item) => item.id === state.page) ?? navigation[0];

const pageHeader = (group: string, title: string, description: string): string => `
  <header class="page-header">
    <span>${escapeHtml(group)}</span>
    <h1>${escapeHtml(title)}</h1>
    <p>${escapeHtml(description)}</p>
  </header>`;

const pageHeaderFor = (pageId: PageId): string => {
  const [group, title, description] = viewerContent.pages[pageId];
  return pageHeader(group, title, description);
};

const sectionIds: Record<string, string> = {
  "基础色板": "base-palette",
  "规范内容": "contents",
  "使用方式": "workflow",
  "修改设计": "edit",
  "怎么判断放在哪里": "placement",
  "当前外观": "appearance",
  "使用规则": "rules",
  "平台 Profile": "platform-profile",
  "语义字体表": "semantic-type",
  "组件映射": "component-map",
  "平台尺寸": "platform-metrics",
  "规则": "rules",
  "间距": "spacing",
  "圆角": "radius",
  "常用时长": "duration",
  "用法": "usage",
  "示例": "examples",
  "组件清单": "catalog",
  "覆盖情况": "coverage",
  "设计变量": "design-tokens",
  "结构示例": "examples",
  "边界": "boundaries",
  "文件": "files",
  "常用命令": "commands",
  "必须通过": "requirements",
  "检查范围": "coverage",
};

const sectionHeader = (title: string, description = "", explicitId = ""): string => `
  <div class="section-header" ${(explicitId || sectionIds[title]) ? `id="${explicitId || sectionIds[title]}"` : ""}>
    <h2>${escapeHtml(title)}</h2>
    ${description ? `<p>${escapeHtml(description)}</p>` : ""}
  </div>`;

const note = (title: string, body: string): string => `
  <aside class="note"><strong>${escapeHtml(title)}</strong><p>${escapeHtml(body)}</p></aside>`;

const tokenTable = (
  rows: Array<{ name: string; token: string; value: string; note?: string }>,
  source = "tokens/primitives.json",
  defaultNote?: string,
): string => `
  <div class="token-table">
    <div class="token-row token-head"><span>用途</span><span>变量</span><span>当前值</span></div>
    ${rows
      .map((row) => {
        const target = inspect(
          row.name,
          row.token,
          row.value,
          source,
          row.note ?? defaultNote ?? "这是三个产品共用的设计变量。",
        );
        return `<button class="token-row inspectable" type="button" ${targetAttrs(target)}>
          <strong>${escapeHtml(row.name)}</strong>
          <code>${escapeHtml(row.token)}</code>
          <code>${escapeHtml(row.value)}</code>
        </button>`;
      })
      .join("")}
  </div>`;

function sidebar(): string {
  return `
    <aside class="sidebar ${mobileNavOpen ? "mobile-open" : ""}" id="site-navigation">
      <a class="brand" href="#overview"><b>K</b><span><strong>Kai Design</strong><small>设计规范</small></span></a>
      <nav aria-label="规范目录">
        ${navigationGroups
          .map(
            (group) => `
              <section>
                <h2>${escapeHtml(group.label)}</h2>
                ${group.items
                  .map(
                    (item) => `
                      <button type="button" data-page="${item.id}" data-nav-label="${item.label}"
                        class="${state.page === item.id ? "active" : ""}"
                        aria-current="${state.page === item.id ? "page" : "false"}">
                        ${escapeHtml(item.label)}
                      </button>`,
                  )
                  .join("")}
              </section>`,
          )
          .join("")}
      </nav>
      <footer><span>v${escapeHtml(tokens.primitives.specVersion)}</span><i></i><small>规范文件已生成</small></footer>
    </aside>`;
}

function topbar(): string {
  return `
    <header class="topbar">
      <div class="top-title">
        <button id="mobile-nav-toggle" class="mobile-nav-button" type="button"
          aria-label="${mobileNavOpen ? "关闭目录" : "打开目录"}"
          aria-expanded="${mobileNavOpen}" aria-controls="site-navigation">${mobileNavOpen ? "×" : "☰"}</button>
        <span><small>${escapeHtml(pageInfo().label)}</small><strong>${escapeHtml(pageInfo().label)}</strong></span>
      </div>
      <div class="top-actions">
        <label class="search"><span>⌕</span><input id="nav-search" type="search" placeholder="搜索目录"></label>
        <label class="select-control skin-control"><span>外观</span><select id="skin">
          ${option("system", "跟随系统", state.skin)}
          ${tokens.skins.presets.map((skin) => option(skin.id, skin.name, state.skin)).join("")}
        </select></label>
        <label class="select-control platform-control"><span>平台</span><select id="platform">
          ${Object.entries(tokens.primitives.platformProfiles).map(([id, profile]) => option(id, profile.label, state.platform)).join("")}
        </select></label>
        <button id="motion" class="icon-button ${state.reducedMotion ? "active" : ""}" type="button" title="减少动态效果">≈</button>
        <span class="top-version">v${escapeHtml(tokens.primitives.specVersion)}</span>
      </div>
    </header>`;
}

function overview(): string {
  return `
    <article class="document">
      ${pageHeaderFor("overview")}
      <section class="content-section">
        ${sectionHeader("从这里开始", "先选 Mobile 或 Desktop 组件，再处理平台行为、APP 结构和状态。产品特有内容最后处理。", "contents")}
        <div class="docs-index">
          <button data-page="color"><span><strong>基础规范</strong><small>颜色、字体、间距、圆角和动效</small></span><i>→</i></button>
          <button data-page="components"><span><strong>组件基础</strong><small>移动、桌面组件和完整组件入口</small></span><i>→</i></button>
          <button data-page="content-browser"><span><strong>APP 结构</strong><small>内容浏览与任务工作台两个主结构</small></span><i>→</i></button>
          <button data-page="status-system"><span><strong>状态与反馈</strong><small>加载、进度、空数据、结果和错误</small></span><i>→</i></button>
          <button data-page="products"><span><strong>产品差异</strong><small>主题色、内容表达和产品特有规则</small></span><i>→</i></button>
        </div>
      </section>
      <section class="content-section">
        ${sectionHeader("修改与输出", "", "workflow")}
        <ol class="prose-steps">
          <li><b>找到源文件。</b><span>数值改 <code>tokens/</code>，组件改 <code>components/</code>，结构和状态改 <code>patterns/</code>。</span></li>
          <li><b>完成检查。</b><pre><code>make validate test build check</code></pre></li>
          <li><b>同步到产品。</b><pre><code>python3 tool/kai_design.py sync</code></pre></li>
        </ol>
      </section>
      <section class="content-section">
        ${sectionHeader("规则放哪里", "", "placement")}
        <div class="decision-table">
          <div><strong>跨产品共用</strong><span>放入基础、组件、结构或状态规范</span></div>
          <div><strong>单个产品特有</strong><span>放入产品差异，不污染通用规范</span></div>
          <div><strong>开始复用</strong><span>第二个产品需要时再提升为通用规则</span></div>
        </div>
      </section>
    </article>`;
}

function colorPage(): string {
  const skin =
    tokens.skins.presets.find((item) => item.id === resolveSkin(state.skin)) ??
    tokens.skins.presets[0];
  const colors = [
    ["页面背景", "skin.canvas", skin.canvas],
    ["内容背景", "skin.surface", skin.surface],
    ["浮层背景", "skin.elevated", skin.elevated],
    ["主要文字", "skin.glass.primaryText", String(skin.glass.primaryText)],
    ["次要文字", "skin.glass.secondaryText", String(skin.glass.secondaryText)],
    ["边框", "skin.glass.border", String(skin.glass.border)],
  ];
  const baseColors = [
    ["主内容背景", "basePalette.mainBackground", tokens.primitives.basePalette.mainBackground],
    ["侧栏背景", "basePalette.sideBackground", tokens.primitives.basePalette.sideBackground],
    ["参考主色", "basePalette.primary", tokens.primitives.basePalette.primary],
  ];
  return `
    <article class="document">
      ${pageHeaderFor("color")}
      <section class="content-section">
        ${sectionHeader("基础色板", "三个颜色各有固定职责，不互相替代。")}
        <div class="color-grid base-color-grid">
          ${baseColors
            .map(([label, token, value]) => {
              const target = inspect(label, token, value, "tokens/primitives.json");
              return `<button class="color-item inspectable" type="button" ${targetAttrs(target)}>
                <i style="background:${displayColor(value)}"></i>
                <span><strong>${label}</strong><code>${escapeHtml(value)}</code></span>
              </button>`;
            })
            .join("")}
        </div>
      </section>
      <section class="content-section">
        ${sectionHeader("当前外观", `正在查看“${skin.name}”外观。可在右上角切换。`)}
        <div class="color-grid">
          ${colors
            .map(([label, token, value]) => {
              const target = inspect(label, token, value, `tokens/skins.json#${skin.id}`);
              return `<button class="color-item inspectable" type="button" ${targetAttrs(target)}>
                <i style="background:${displayColor(value)}"></i>
                <span><strong>${label}</strong><code>${escapeHtml(value)}</code></span>
              </button>`;
            })
            .join("")}
        </div>
      </section>
      <section class="content-section">
        ${sectionHeader("使用规则")}
        <div class="do-dont">
          <article><h3>应该</h3><ul><li>组件按用途读取颜色变量</li><li>文字只使用主要、次要和弱化三档</li><li>边界优先使用细边框</li></ul></article>
          <article><h3>不要</h3><ul><li>在组件里直接写十六进制颜色</li><li>用主题色显示普通正文</li><li>额外叠加透明度制造第四档文字</li></ul></article>
        </div>
      </section>
    </article>`;
}

const typeRoleLabels: Record<string, string> = {
  displayLarge: "展示大标题",
  pageTitle: "页面标题",
  sectionTitle: "分区标题",
  title: "组件标题",
  body: "正文 / 列表标题",
  bodySecondary: "次级正文 / 列表副题",
  label: "按钮与控件标签",
  caption: "辅助信息",
  captionSmall: "极小标签",
};

const metricLabels: Record<string, string> = {
  minimumInteractiveTarget: "最小交互目标",
  controlHeight: "常规控件高度",
  compactControlHeight: "紧凑控件高度",
  listRowSingle: "单行列表",
  listRowDouble: "双行列表",
  pageGutter: "页面边距",
  sectionGap: "分区间距",
  controlGap: "控件间距",
  iconTextGap: "图标文字间距",
};

function platformsPage(): string {
  const profiles = Object.entries(tokens.primitives.platformProfiles);
  const componentProfiles = Object.entries(tokens.primitives.componentProfiles);
  const activePlatform = tokens.primitives.platformProfiles[state.platform];
  const guidance = platformComponentGuidance[state.platform];
  return `
    <article class="document">
      ${pageHeaderFor("platforms")}
      <section class="content-section">
        ${sectionHeader("组件 Profile", "产品组件只读取这两套数值。", "component-profile")}
        <div class="platform-profile-grid component-profile-grid">
          ${componentProfiles.map(([id, profile]) => `<article class="platform-profile-card">
            <div><span>${escapeHtml(profile.inputMode)}</span><code>${escapeHtml(id)}</code></div>
            <h3>${escapeHtml(profile.label)}</h3>
            <p>${escapeHtml(profile.platforms.join(" · "))}</p>
            <dl>
              <div><dt>正文</dt><dd>${profile.typeScale.body.fontSize} / ${profile.typeScale.body.lineHeight}</dd></div>
              <div><dt>控件</dt><dd>${profile.metrics.controlHeight} ${escapeHtml(profile.unit)}</dd></div>
              <div><dt>列表</dt><dd>${profile.metrics.listRowSingle} / ${profile.metrics.listRowDouble}</dd></div>
            </dl>
          </article>`).join("")}
        </div>
      </section>
      <section class="content-section">
        ${sectionHeader("官方基准", "用于确认两套组件没有低于目标平台的可用性要求。", "platform-profile")}
        <div class="platform-profile-grid">
          ${profiles.map(([id, profile]) => `<article class="platform-profile-card">
            <div><span>${escapeHtml(profile.inputMode)}</span><code>${escapeHtml(id)}</code></div>
            <h3>${escapeHtml(profile.label)}</h3>
            <p>${escapeHtml(profile.fontFamily)}</p>
            <dl>
              <div><dt>正文</dt><dd>${profile.typeScale.body.fontSize} / ${profile.typeScale.body.lineHeight}</dd></div>
              <div><dt>交互目标</dt><dd>${profile.metrics.minimumInteractiveTarget} ${escapeHtml(profile.unit)}</dd></div>
              <div><dt>缩放</dt><dd>${escapeHtml(profile.scaling)}</dd></div>
            </dl>
            <a href="${escapeHtml(profile.reference.url)}" target="_blank" rel="noreferrer">${escapeHtml(profile.reference.name)}</a>
          </article>`).join("")}
        </div>
      </section>
      <section class="content-section">
        ${sectionHeader(`${activePlatform.label} 行为适配`, "切换顶部平台查看。组件视觉不会随这里换皮。", "behavior")}
        <div class="platform-behavior-grid">
          <article><strong>导航</strong><p>${escapeHtml(guidance.navigation)}</p></article>
          <article><strong>系统栏</strong><p>${escapeHtml(guidance.bars)}</p></article>
          <article><strong>弹层</strong><p>${escapeHtml(guidance.presentation)}</p></article>
          <article><strong>输入</strong><p>${escapeHtml(guidance.interaction)}</p></article>
        </div>
      </section>
      <section class="content-section">
        ${sectionHeader("使用规则")}
        <ul class="prose-list">
          <li>组件读取 Mobile 或 Desktop Profile，不读取五个平台的视觉数值。</li>
          <li>平台 Profile 只负责系统字体、缩放、命中目标和行为验收。</li>
          <li>窗口宽度只改变布局；不能因为窗口变宽就把移动字号换成桌面字号。</li>
          <li>返回、安全区、键鼠、窗口和系统弹层仍按运行平台适配。</li>
        </ul>
      </section>
    </article>`;
}

function typographyPage(): string {
  const profiles = Object.entries(tokens.primitives.componentProfiles);
  const roles = Object.keys(typeRoleLabels);
  return `
    <article class="document">
      ${pageHeaderFor("typography")}
      <section class="content-section">
        ${sectionHeader("语义字体表", "同一语义只输出 Mobile 与 Desktop 两套数值。")}
        <div class="platform-table-wrap">
          <table class="platform-table type-scale-table">
            <thead><tr><th>角色</th>${profiles.map(([, profile]) => `<th>${escapeHtml(profile.label)}</th>`).join("")}</tr></thead>
            <tbody>
              ${roles.map((role) => `<tr>
                <th>${typeRoleLabels[role]}<code>${role}</code></th>
                ${profiles.map(([, profile]) => {
                  const style = profile.typeScale[role];
                  return `<td><strong>${style.fontSize} / ${style.lineHeight}</strong><span>w${style.fontWeight}${style.letterSpacing ? ` · ${style.letterSpacing}` : ""}</span></td>`;
                }).join("")}
              </tr>`).join("")}
            </tbody>
          </table>
        </div>
      </section>
      <section class="content-section">
        ${sectionHeader("组件映射")}
        <div class="role-map-grid">
          ${Object.entries(tokens.primitives.typography.componentRoles).map(([component, role]) => `<div><code>${component}</code><span>→</span><strong>${typeRoleLabels[role] ?? role}</strong></div>`).join("")}
        </div>
      </section>
      <section class="content-section">
        ${sectionHeader("规则")}
        <ul class="prose-list"><li>界面使用平台系统字体与系统缩放；内容字体只能在产品层登记。</li><li>字号与行高必须成对使用，不能只复制字号。</li><li>iOS/iPadOS 正文不得低于默认 17pt；Android 主正文使用 16/24sp。</li><li>辅助信息可以更小，但不得代替正文或列表标题。</li><li>200% 字体缩放时保留同样的信息与操作。</li></ul>
      </section>
    </article>`;
}

function spacingPage(): string {
  const spacingRows = Object.entries(tokens.primitives.spacing)
    .filter(([, value]) => typeof value === "number")
    .map(([name, value]) => ({
      name: `间距 ${name}`,
      token: `spacing.${name}`,
      value: `${value}px`,
    }));
  const radiusRows = Object.entries(tokens.primitives.radii).map(([name, value]) => ({
    name: `圆角 ${name}`,
    token: `radii.${name}`,
    value: `${value}px`,
  }));
  return `
    <article class="document">
      ${pageHeaderFor("spacing")}
      <section class="content-section">
        ${sectionHeader("间距")}
        <div class="spacing-visual">${spacingRows.map((row) => `<div><code>${row.token}</code><i style="width:${row.value}"></i><span>${row.value}</span></div>`).join("")}</div>
        ${tokenTable(spacingRows)}
      </section>
      <section class="content-section">
        ${sectionHeader("平台尺寸", "基础网格共享，组件高度和交互目标按平台输出。")}
        <div class="platform-table-wrap">
          <table class="platform-table">
            <thead><tr><th>尺寸</th>${Object.values(tokens.primitives.platformProfiles).map((profile) => `<th>${escapeHtml(profile.label)}</th>`).join("")}</tr></thead>
            <tbody>
              ${Object.keys(metricLabels).map((metric) => `<tr><th>${metricLabels[metric]}<code>${metric}</code></th>${Object.values(tokens.primitives.platformProfiles).map((profile) => `<td><strong>${profile.metrics[metric]}</strong><span>${escapeHtml(profile.unit)}</span></td>`).join("")}</tr>`).join("")}
            </tbody>
          </table>
        </div>
      </section>
      <section class="content-section">
        ${sectionHeader("圆角")}
        <div class="radius-visual">${radiusRows.map((row) => `<div><i style="border-radius:${row.value}"></i><strong>${row.name.replace("圆角 ", "")}</strong><code>${row.value}</code></div>`).join("")}</div>
        ${tokenTable(radiusRows)}
      </section>
    </article>`;
}

function motionPage(): string {
  return `
    <article class="document">
      ${pageHeaderFor("motion")}
      <section class="content-section">
        ${sectionHeader("常用时长")}
        <div class="motion-demo">
          ${["进入", "常规", "退出"].map((name, index) => `<button type="button"><i style="animation-delay:${index * 180}ms"></i><strong>${name}</strong><span>${160 + index * 80} 毫秒</span></button>`).join("")}
        </div>
      </section>
      <section class="content-section">
        ${sectionHeader("规则")}
        <ul class="prose-list"><li>点击反馈必须立即出现。</li><li>同一操作中的动画使用一致的缓动。</li><li>页面切换不使用长时间大幅移动。</li><li>用户选择减少动态效果后，保留状态变化，移除位移动画。</li></ul>
      </section>
    </article>`;
}

const componentPage = (
  pageId: PageId,
  preview: string,
): string => `
  <article class="document">
    ${pageHeaderFor(pageId)}
    <section class="content-section">
      ${sectionHeader("预览", "", "preview")}
      <div class="component-preview">
        <div class="component-stage">${preview}</div>
      </div>
    </section>
  </article>`;

function componentsOverview(): string {
  const componentOrder: Array<keyof typeof componentContracts.components> = [
    "buttons",
    "inputs",
    "selection",
    "navigation",
    "list-rows",
    "feedback",
    "dialogs",
    "menus",
    "icons",
    "app-bars",
    "data-display",
  ];
  const entries = componentOrder.map(
    (id) => [id, componentContracts.components[id]] as const,
  );
  const family = state.platform.endsWith("Mobile") ? "mobile" : "desktop";
  return `
    <article class="document">
      ${pageHeaderFor("components")}
      <section class="content-section">
        ${sectionHeader("两套组件", "切换顶部平台会选择对应组件，但同一端内不会换皮。", "families")}
        <div class="component-family-grid component-foundation-families">
          <article class="${family === "mobile" ? "active" : ""}"><header><strong>Mobile</strong><span>iOS · Android</span></header>${componentSpecimen("mobile", true)}</article>
          <article class="${family === "desktop" ? "active" : ""}"><header><strong>Desktop</strong><span>macOS · Windows · Linux</span></header>${componentSpecimen("desktop", true)}</article>
        </div>
      </section>
      <section class="content-section">
        ${sectionHeader("基础表面", "页面、固定栏和浮层只使用这三层。", "surfaces")}
        <div class="surface-demo">
          <article class="demo-surface base"><span>页面与容器</span><strong>Surface</strong><small>普通内容和分组。</small></article>
          <article class="demo-surface glass"><span>侧栏与底栏</span><strong>Glass</strong><small>固定界面层。</small></article>
          <article class="demo-surface elevated"><span>菜单与对话框</span><strong>Elevated</strong><small>临时浮层。</small></article>
        </div>
      </section>
      <section class="content-section">
        ${sectionHeader("全部组件", "", "catalog")}
        <div class="component-catalog">
          ${entries.map(([id, contract]) => {
            return `<button type="button" data-page="${id}">
              <span><strong>${escapeHtml(contract.name)}</strong><small>${escapeHtml(contract.summary)}</small></span>
              <i>→</i>
            </button>`;
          }).join("")}
        </div>
      </section>
    </article>`;
}

function componentSpecimen(family: "mobile" | "desktop", compact = false): string {
  const compactClass = compact ? " compact" : "";
  if (family === "mobile") {
    return `<div class="platform-specimen kai-mobile-specimen${compactClass}">
      <div class="device-phone">
        <div class="phone-status"><b>9:41</b><span>● ◒ ▰</span></div>
        <header class="mobile-app-bar"><button aria-label="菜单">☰</button><strong>资料库</strong><button aria-label="更多">•••</button></header>
        <main>
          <label class="specimen-field"><span>⌕</span><input placeholder="搜索内容"></label>
          <div class="material-chips"><b>全部</b><span>最近</span><span>收藏</span></div>
          <div class="specimen-list">
            <article><i>文</i><span><strong>设计记录</strong><small>今天更新</small></span><button aria-label="更多">⋮</button></article>
            <article><i>集</i><span><strong>我的收藏</strong><small>12 个项目</small></span><button aria-label="更多">⋮</button></article>
          </div>
          <button class="specimen-primary">新建项目</button>
        </main>
        <nav class="ios-tab-bar"><b><i>⌂</i>首页</b><span><i>▦</i>资料库</span><span><i>⌕</i>搜索</span><span><i>○</i>我的</span></nav>
      </div>
    </div>`;
  }
  return `<div class="platform-specimen desktop-specimen kai-desktop-specimen${compactClass}">
    <div class="device-window">
      <header class="kai-windowbar"><strong>◈　资料库</strong><div><button>—</button><button>□</button><button>×</button></div></header>
      <div class="desktop-body">
        <aside><b>⌂　主页</b><span>▦　全部项目</span><span>◷　最近使用</span><span>♡　收藏</span><small>位置</small><span>☁　云端</span><span>⚙　设置</span></aside>
        <main>
          <div class="windows-command"><button class="specimen-primary">＋ 新建</button><button>⌄ 排序</button><button>⋯</button><label>⌕ <input placeholder="搜索资料库"></label></div>
          <h3>全部项目</h3>
          <div class="desktop-table"><header><span>名称</span><span>修改时间</span><span>状态</span></header><article><i>文</i><strong>设计记录</strong><span>今天 14:32</span><b>已同步</b></article><article><i>集</i><strong>我的收藏</strong><span>昨天 18:05</span><b>本机</b></article></div>
          <div class="windows-info"><span>ⓘ　内容已同步</span><button>关闭</button></div>
        </main>
      </div>
    </div>
  </div>`;
}

function buttonsPage(): string {
  const desktop = state.platform.endsWith("Desktop");
  return componentPage(
    "buttons",
    `<div class="demo-stack">
      <div class="demo-group"><span>层级</span><div class="button-line"><button class="primary">主要操作</button><button class="secondary">次要操作</button><button class="ghost">文字操作</button><button class="danger">删除</button></div></div>
      <div class="demo-group"><span>尺寸</span><div class="button-line button-sizes"><button class="primary compact">紧凑</button><button class="primary">常规</button><button class="primary large">强调操作</button></div></div>
      <div class="demo-group"><span>状态</span><div class="button-line"><button class="primary">默认</button>${desktop ? `<button class="primary demo-hover">悬停</button>` : ""}<button class="primary demo-pressed">按下</button><button class="primary" disabled>不可用</button></div></div>
      <div class="demo-group"><span>图标与工具按钮</span><div class="button-line"><button class="demo-icon-button" aria-label="收藏">☆</button><button class="demo-icon-button selected" aria-label="已收藏">★</button><button class="toolbar-button">↻ 重新载入</button><button class="demo-fab" aria-label="添加">＋</button></div></div>
    </div>`,
  );
}

function inputsPage(): string {
  return componentPage(
    "inputs",
    `<div class="field-demo">
      <label><span>默认</span><input placeholder="输入内容"></label>
      <label class="focused"><span>聚焦</span><input value="设计规范"></label>
      <label class="error"><span>输入有误</span><input value="错误内容"><small>请检查输入内容</small></label>
      <label><span>选项</span><select><option>跟随系统</option><option>浅色</option><option>深色</option></select></label>
      <label class="range-field"><span>播放进度</span><input type="range" value="42"></label>
      <label><span>不可编辑</span><input value="固定内容" disabled></label>
    </div>`,
  );
}

function selectionPage(): string {
  return componentPage(
    "selection",
    `<div class="demo-stack">
      <div class="demo-group"><span>选择条</span><div class="chip-strip"><button class="active">全部</button><button>最近使用</button><button>已收藏</button><button disabled>不可用</button></div></div>
      <div class="choice-demo">
        <button class="choice toggle" aria-pressed="true"><i class="switch on"><b></b></i><span><strong>自动同步</strong><small>修改后立即生效</small></span></button>
        <button class="choice toggle" aria-pressed="false"><i class="switch"><b></b></i><span><strong>减少动态</strong><small>降低界面移动</small></span></button>
        <button class="choice"><i class="check">✓</i><span><strong>包含说明文件</strong><small>可以选择多个项目</small></span></button>
        <button class="choice"><i class="radio-dot"></i><span><strong>稳定版本</strong><small>单选组中的当前项目</small></span></button>
      </div>
    </div>`,
  );
}

function navigationPage(): string {
  const mobile = state.platform === "appleMobile" || state.platform === "androidMobile";
  return componentPage(
    "navigation",
    `<div class="nav-preview">
      ${mobile
        ? `<div class="demo-group"><span>Mobile 底部导航</span><div class="bottom-nav-demo"><button class="active"><b>⌂</b><span>首页</span></button><button><b>◇</b><span>内容</span></button><button><b>⚙</b><span>设置</span></button></div></div>`
        : `<div class="demo-group"><span>Desktop 侧栏</span><div class="side-nav-demo"><button class="active">内容</button><button>任务</button><button>收藏</button><button>设置</button></div></div>`}
      <div class="demo-group"><span>页内平级切换</span><div class="tabs"><button class="active">全部</button><button>最近</button><button>收藏</button></div></div>
    </div>`,
  );
}

function listRowsPage(): string {
  return componentPage(
    "list-rows",
    `<div class="list-row-demo">
      <button><i>文</i><span><strong>只有标题</strong></span><b>›</b></button>
      <button><i>自</i><span><strong>自动检查更新</strong><small>每天检查一次</small></span><em class="switch on"><b></b></em></button>
      <button class="selected"><i class="check">✓</i><span><strong>包含说明文件</strong><small>选中状态使用行内标记</small></span><b>已选择</b></button>
      <button disabled><i>锁</i><span><strong>不可使用的项目</strong><small>说明为什么暂时不可用</small></span></button>
      <button class="destructive"><i>删</i><span><strong>移除全部记录</strong></span></button>
    </div>`,
  );
}

function feedbackPage(): string {
  const platformFeedback = state.platform.endsWith("Mobile") ? "Mobile 轻提示" : "Desktop 状态通知";
  return componentPage(
    "feedback",
    `<div class="feedback-demo">
      <div class="feedback-item"><span>${platformFeedback}</span><div class="snackbar">已保存更改</div></div>
      <div class="feedback-item"><span>工具提示</span><div class="tooltip-sample"><button class="demo-icon-button">?</button><b>查看使用说明</b></div></div>
      <div class="feedback-item wide"><span>空态与加载</span><div class="empty-state"><i>◇</i><strong>还没有内容</strong><p>添加第一项后会显示在这里。</p><button class="secondary">添加内容</button></div><div class="loading-state"><i></i><span>正在载入</span></div></div>
      <div class="feedback-item wide"><span>进度</span><div class="linear-progress"><i style="width:62%"></i></div><small>已完成 62%</small></div>
      <div class="feedback-item wide"><span>滚动条</span><div class="scrollbar-sample"><i></i></div></div>
    </div>`,
  );
}

function dialogsPage(): string {
  const family = state.platform.endsWith("Mobile") ? "Mobile" : "Desktop";
  return componentPage(
    "dialogs",
    `<div class="demo-stack">
      <div class="demo-group"><span>${family} 确认对话框</span><div class="dialog-demo">
        <div class="dialog-backdrop"></div>
        <article>
          <header><h3>删除这条记录？</h3><button class="demo-icon-button" aria-label="关闭">×</button></header>
          <p>删除后将无法恢复。其他记录不会受到影响。</p>
          <footer><button class="secondary">取消</button><button class="danger">删除</button></footer>
        </article>
      </div></div>
      <div class="demo-group"><span>输入对话框</span><div class="prompt-dialog">
        <h3>重命名</h3>
        <label class="error"><span>名称</span><input value=""><small>名称不能为空</small></label>
        <footer><button class="secondary">取消</button><button class="primary">保存</button></footer>
      </div></div>
    </div>`,
  );
}

function menusPage(): string {
  const mobile = state.platform === "appleMobile" || state.platform === "androidMobile";
  return componentPage(
    "menus",
    `<div class="menu-demo">
      <div class="demo-group"><span>${mobile ? "Mobile" : "Desktop"} 菜单</span><div class="anchored-menu">
        <header>排序方式</header>
        <button class="selected"><i>↕</i><span>最近修改</span><b>✓</b></button>
        <button><i>字</i><span>按名称</span></button>
        <hr>
        <button class="destructive"><i>删</i><span>清除记录</span></button>
      </div></div>
      ${mobile ? `<div class="demo-group"><span>Mobile 底部弹层</span><div class="sheet-frame"><div class="sheet"><i class="sheet-handle"></i><strong>选择操作</strong><button><span>添加到收藏</span><b>›</b></button><button><span>分享</span><b>›</b></button><button class="destructive"><span>删除</span></button></div></div></div>` : `<div class="demo-group"><span>Desktop 右键菜单</span><div class="anchored-menu shortcut-menu"><button class="focused"><i>↗</i><span>打开</span><kbd>Enter</kbd></button><button><i>✎</i><span>重命名</span><kbd>F2</kbd></button><button><i>⧉</i><span>复制</span><kbd>⌘C</kbd></button><hr><button class="destructive"><i>删</i><span>移到废纸篓</span><kbd>⌫</kbd></button></div></div>`}
    </div>`,
  );
}

function iconsPage(): string {
  const sizes = tokens.primitives.iconography.sizes;
  return componentPage(
    "icons",
    `<div class="demo-stack">
      <div class="demo-group"><span>语义尺寸</span><div class="icon-scale-demo">
        ${Object.entries(sizes).map(([name, size]) => `<article><i style="width:${size}px;height:${size}px;font-size:${Math.max(12, size - 2)}px">◇</i><strong>${escapeHtml(name)}</strong></article>`).join("")}
      </div></div>
      <div class="demo-group"><span>按钮状态</span><div class="button-line"><button class="demo-icon-button" aria-label="搜索">⌕</button><button class="demo-icon-button selected" aria-label="已筛选">▽</button><button class="demo-icon-button demo-pressed" aria-label="更多">•••</button><button class="demo-icon-button" disabled aria-label="不可用">＋</button></div></div>
    </div>`,
  );
}

function appBarsPage(): string {
  return componentPage(
    "app-bars",
    `<div class="demo-stack">
      <div class="demo-group"><span>页面头与主要操作</span><div class="page-header-demo"><div><h3>资料库</h3><p>浏览、筛选和管理全部内容。</p></div><button class="primary">添加内容</button></div></div>
      <div class="demo-group"><span>工具栏</span><div class="toolbar-demo"><label>⌕ <input value="设计规范" aria-label="搜索"></label><button class="secondary">筛选</button><button class="secondary">最近修改</button><span></span><button class="demo-icon-button" aria-label="网格视图">▦</button><button class="demo-icon-button" aria-label="列表视图">☷</button></div></div>
      <div class="demo-group"><span>页内标签</span><div class="tabs"><button class="active">全部</button><button>进行中</button><button>已完成</button></div></div>
    </div>`,
  );
}

function dataDisplayPage(): string {
  return componentPage(
    "data-display",
    `<div class="data-display-demo">
      <div class="demo-group"><span>卡片与状态</span><div class="data-cards">
        <article><div class="demo-thumbnail">A</div><span><strong>项目名称</strong><small>刚刚更新 · 12 项内容</small></span><b class="demo-tag success">已同步</b></article>
        <article><div class="demo-avatar">林</div><span><strong>协作记录</strong><small>3 位成员参与</small></span><b class="demo-tag warning">待确认</b></article>
      </div></div>
      <div class="demo-group"><span>表格</span><div class="demo-table">
        <div class="demo-table-row demo-table-head"><span>名称</span><span>状态</span><span>更新时间</span></div>
        <div class="demo-table-row"><strong>基础变量</strong><span><i class="status-dot success"></i>已生成</span><time>今天 10:24</time></div>
        <div class="demo-table-row"><strong>组件契约</strong><span><i class="status-dot warning"></i>检查中</span><time>今天 09:18</time></div>
        <div class="demo-table-row"><strong>页面规范</strong><span><i class="status-dot"></i>未修改</span><time>昨天 18:40</time></div>
      </div></div>
    </div>`,
  );
}

function patternPage(
  pageId: PageId,
  preview: string,
  rules: string[],
): string {
  return `
    <article class="document">
      ${pageHeaderFor(pageId)}
      <section class="content-section">${sectionHeader("结构示例")}<div class="pattern-preview">${preview}</div></section>
      <section class="content-section">${sectionHeader("规则")}<ul class="prose-list">${rules.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></section>
    </article>`;
}

function appShellPage(): string {
  const guidance = platformComponentGuidance[state.platform];
  return patternPage(
    "app-shell",
    `<div class="shell platform-shell"><aside><b>K</b><button class="active">内容</button><button>任务</button><button>收藏</button><button>设置</button></aside><main><header><span><small>当前平台</small><strong>${escapeHtml(tokens.primitives.platformProfiles[state.platform].label)}</strong></span><button class="primary">添加</button></header><section><article></article><article></article><article></article></section><footer>${escapeHtml(guidance.navigation)}</footer></main></div>`,
    ["顶级目的地保持一致，导航控件按当前平台映射。", "内容区负责滚动，固定导航不跟随内容移动。", "窗口、键盘、返回和安全区域遵循平台，不由品牌层重写。"],
  );
}

function contentBrowserPage(): string {
  return patternPage(
    "content-browser",
    `<div class="content-browser-demo">
      <header><div><small>内容浏览</small><h3>全部内容</h3></div><button class="primary">添加</button></header>
      <div class="browser-tools"><label>⌕ <input value="" placeholder="搜索内容"></label><button class="secondary">筛选</button><button class="secondary">最近修改</button></div>
      <div class="browser-body">
        <main>${["A","B","C","D","E","F"].map((name, index) => `<button class="${index === 1 ? "selected" : ""}"><i>${name}</i><span><strong>项目名称</strong><small>${index + 2} 项内容 · 刚刚更新</small></span></button>`).join("")}</main>
        <aside><div class="demo-thumbnail">B</div><h4>项目名称</h4><p>详情是浏览结构的一部分。宽屏显示在侧栏，窄屏进入导航栈。</p><button class="primary">打开</button></aside>
      </div>
    </div>`,
    ["集合、搜索、筛选和详情属于同一结构，不再拆成多套通用页面。", "返回时恢复查询、筛选、视图和滚动位置。", "内容素材比例、字段和具体操作由产品规范决定。"],
  );
}

function taskWorkspacePage(): string {
  return patternPage(
    "task-workspace",
    `<div class="task-workspace-demo">
      <header><div><small>扫描 · 第 2 阶段，共 3 阶段</small><h3>正在检查 128 个项目</h3><p>当前：项目 080</p></div><button class="secondary">暂停</button><button class="ghost">取消</button></header>
      <section class="task-progress-block"><div><span>80 / 128</span><b>62%</b></div><div class="linear-progress"><i style="width:62%"></i></div><small>已完成的结果会保留，取消可能需要几秒钟。</small></section>
      <div class="task-results">
        <article><small>完成</small><strong>76</strong></article>
        <article><small>跳过</small><strong>4</strong></article>
        <article class="error"><small>需要处理</small><strong>2</strong></article>
      </div>
      <footer><button class="secondary">查看当前项目</button><button class="secondary">查看失败项</button></footer>
    </div>`,
    ["任务结构固定为准备、运行和结果三个阶段，业务名称可以不同。", "总量未知时显示当前阶段，不伪造百分比。", "部分失败保留成功结果，只重试失败项。"],
  );
}

function statusSystemPage(): string {
  const stateExamples = [
    ["首次使用为空", "这里还没有内容", "添加第一项后会显示在这里。", "添加内容", "empty"],
    ["搜索无结果", "没有找到“设计”", "修改关键词或清除当前筛选。", "清除筛选", "search"],
    ["已有内容刷新失败", "暂时无法更新", "现有内容仍然可用，可以稍后重试。", "重试", "inline"],
    ["部分完成", "126 项已处理，2 项失败", "成功结果已经保留，只需处理失败项。", "重试失败项", "partial"],
  ];
  return `
    <article class="document">
      ${pageHeaderFor("status-system")}
      <section class="content-section">
        ${sectionHeader("状态选择", "先判断影响范围和恢复方式，再选择展示组件。", "decision")}
        <div class="status-decision-grid">
          <article><strong>整页没有内容</strong><span>Empty / Blocking State</span></article>
          <article><strong>已有内容局部变化</strong><span>Inline Status / Progress Row</span></article>
          <article><strong>后台持续任务</strong><span>Persistent Task Status</span></article>
          <article><strong>短暂操作结果</strong><span>平台对应的短反馈</span></article>
        </div>
      </section>
      <section class="content-section">
        ${sectionHeader("实际状态", "同一套信息结构覆盖空数据、无结果、错误和部分完成。", "examples")}
        <div class="status-example-grid">${stateExamples.map(([eyebrow, title, body, action, kind]) => `<article class="${kind}"><small>${eyebrow}</small><i>${kind === "partial" ? "!" : kind === "inline" ? "↻" : "◇"}</i><strong>${title}</strong><p>${body}</p><button class="${kind === "empty" ? "primary" : "secondary"}">${action}</button></article>`).join("")}</div>
      </section>
      <section class="content-section">
        ${sectionHeader("进度与任务结果", "已知总量才显示百分比；未知总量只显示当前阶段。", "progress")}
        <div class="progress-example-grid">
          <article><header><strong>正在扫描</strong><span>80 / 128</span></header><div class="linear-progress"><i style="width:62%"></i></div><small>当前：项目 080</small></article>
          <article><header><strong>正在连接服务</strong><span>第 1 阶段</span></header><div class="loading-state"><i></i><span>等待服务响应</span></div><small>总量未知，不显示虚假百分比</small></article>
          <article><header><strong>后台同步</strong><span>可继续使用应用</span></header><div class="linear-progress"><i style="width:38%"></i></div><button class="secondary">查看任务</button></article>
        </div>
      </section>
    </article>`;
}

function productsPage(): string {
  const product = tokens.accents.products[state.product];
  const productTokenSource = tokens.productTokens[state.product];
  const productTokenRows = Object.entries(productTokenSource.tokens).map(([token, item]) => ({
    name: item.description,
    token,
    value: typeof item.value === "number"
      ? `${item.value}${item.type === "dimension" ? "px" : item.type === "duration" ? "ms" : ""}`
      : item.value,
  }));
  return `
    <article class="document">
      ${pageHeaderFor("products")}
      <div class="page-toolbar">
        <label><span>产品</span><select id="product-inline">${(Object.keys(tokens.accents.products) as ProductId[]).map((id) => option(id, tokens.accents.products[id].displayName, state.product)).join("")}</select></label>
        <label><span>主题色</span><select id="accent-inline">${product.presets.map((preset) => option(preset.id, preset.name, state.accent)).join("")}</select></label>
      </div>
      <section class="content-section">
        ${sectionHeader(product.displayName, `${productMeta[state.product].character}。${productMeta[state.product].content}`, "appearance")}
        <div class="accent-list">${product.presets.map((accent) => `<button data-accent-pick="${accent.id}" class="${accent.id === state.accent ? "active" : ""}"><i style="background:${accent.accent}"></i><span><strong>${accent.name}</strong><code>${accent.accent}</code></span></button>`).join("")}</div>
      </section>
      <section class="content-section">
        ${sectionHeader("专属规则", "这些内容只影响当前产品，不进入基础、组件和页面结构。", "differences")}
        <div class="rule-grid">${productMeta[state.product].differences.map((difference) => `<article><strong>${escapeHtml(difference.title)}</strong><p>${escapeHtml(difference.description)}</p><code>${escapeHtml(difference.reference)}</code></article>`).join("")}</div>
      </section>
      <section class="content-section">
        ${sectionHeader("页面规范", "每个产品的普通页面和沉浸页面都有明确映射。", "product-patterns")}
        <div class="rule-grid">${productMeta[state.product].patterns.map((pattern) => `<article><strong>${escapeHtml(pattern.title)}</strong><p>${escapeHtml(pattern.description)}</p><code>${escapeHtml(pattern.reference)}</code></article>`).join("")}</div>
      </section>
      <section class="content-section">
        ${sectionHeader("产品变量", "只有当前产品使用的数值也参与生成、校验和同步。", "product-tokens")}
        ${productTokenRows.length
          ? tokenTable(productTokenRows, `products/${state.product}/tokens.json`, "这是当前产品专属的生成变量。")
          : note("没有额外变量", "当前产品只有内容边界和行为差异，没有需要单独生成的数值。")}
      </section>
      <section class="content-section">
        ${sectionHeader("边界")}
        <div class="decision-table">
          <div><strong>可以不同</strong><span>主题色、内容表现、产品专属页面</span></div>
          <div><strong>必须共用</strong><span>字体、间距、组件状态、无障碍要求</span></div>
          <div><strong>需要登记</strong><span>任何偏离通用规范的实现</span></div>
        </div>
      </section>
    </article>`;
}

function deliveryPage(): string {
  return `
    <article class="document">
      ${pageHeaderFor("delivery")}
      <section class="content-section">
        ${sectionHeader("文件")}
        <div class="file-list">
          <div><code>dist/tokens/kai.tokens.json</code><span>全部通用变量</span><b>JSON</b></div>
          <div><code>dist/flutter/&lt;product&gt;/brand_tokens.g.dart</code><span>Flutter 变量</span><b>DART</b></div>
          <div><code>dist/css/&lt;product&gt;/brand.generated.css</code><span>Web 样式变量</span><b>CSS</b></div>
          <div><code>dist/spec/</code><span>规范文档快照</span><b>MD</b></div>
          <div><code>dist/viewer/</code><span>当前规范网站</span><b>WEB</b></div>
        </div>
      </section>
      <section class="content-section">
        ${sectionHeader("常用命令")}
        <div class="command-list"><div><span>检查源文件</span><code>make validate</code></div><div><span>运行测试</span><code>make test</code></div><div><span>生成文件</span><code>make build</code></div><div><span>确认没有过期</span><code>make check</code></div></div>
      </section>
      <p class="digest">内容校验码：<code>${deliveryMeta.tokenDigest}</code></p>
    </article>`;
}

function qaPage(): string {
  const products = Object.keys(tokens.accents.products) as ProductId[];
  const profiles = Object.entries(tokens.primitives.platformProfiles);
  return `
    <article class="document">
      ${pageHeaderFor("qa")}
      <section class="content-section">
        ${sectionHeader("必须通过")}
        <div class="check-list">${["生成文件与源文件一致", "组件已映射到当前平台的原生结构与行为", "品牌覆盖没有改变返回、键盘、焦点和安全区域", "两个主结构覆盖产品的浏览与任务流程", "加载、进度、空状态、部分完成和错误均有实际示例", "窗口缩小时没有内容溢出", "减少动态效果后仍可正常操作"].map((item) => `<label><input type="checkbox" checked><span>${item}</span></label>`).join("")}</div>
      </section>
      <section class="content-section">
        ${sectionHeader("平台范围")}
        <div class="decision-table">${profiles.map(([id, profile]) => `<button type="button" data-qa-platform="${id}" class="${state.platform === id ? "active" : ""}"><strong>${escapeHtml(profile.label)}</strong><span>${profile.typeScale.body.fontSize}/${profile.typeScale.body.lineHeight} ${escapeHtml(profile.unit)} · target ${profile.metrics.minimumInteractiveTarget}</span></button>`).join("")}</div>
      </section>
      <section class="content-section">
        ${sectionHeader("检查范围")}
        <div class="qa-table">
          <div class="qa-row qa-head"><span>产品</span>${Object.entries(viewportWidths).map(([id]) => `<span>${id}</span>`).join("")}</div>
          ${products.map((product) => `<div class="qa-row"><strong>${tokens.accents.products[product].displayName}</strong>${Object.entries(viewportWidths).map(([id, width]) => `<button data-qa-product="${product}" data-qa-viewport="${id}"><i></i><span>${width}</span></button>`).join("")}</div>`).join("")}
        </div>
      </section>
    </article>`;
}

function renderPage(): string {
  switch (state.page) {
    case "color": return colorPage();
    case "platforms": return platformsPage();
    case "typography": return typographyPage();
    case "spacing": return spacingPage();
    case "motion": return motionPage();
    case "components": return componentsOverview();
    case "buttons": return buttonsPage();
    case "inputs": return inputsPage();
    case "selection": return selectionPage();
    case "navigation": return navigationPage();
    case "list-rows": return listRowsPage();
    case "feedback": return feedbackPage();
    case "dialogs": return dialogsPage();
    case "menus": return menusPage();
    case "icons": return iconsPage();
    case "app-bars": return appBarsPage();
    case "data-display": return dataDisplayPage();
    case "app-shell": return appShellPage();
    case "content-browser": return contentBrowserPage();
    case "task-workspace": return taskWorkspacePage();
    case "status-system": return statusSystemPage();
    case "products": return productsPage();
    case "delivery": return deliveryPage();
    case "qa": return qaPage();
    default: return overview();
  }
}

const tocByPage: Partial<Record<PageId, Array<[string, string]>>> = {
  overview: [["从这里开始", "contents"], ["修改与输出", "workflow"], ["规则放哪里", "placement"]],
  color: [["基础色板", "base-palette"], ["当前外观", "appearance"], ["使用规则", "rules"]],
  platforms: [["组件 Profile", "component-profile"], ["官方基准", "platform-profile"], ["平台行为", "behavior"], ["使用规则", "rules"]],
  typography: [["语义字体表", "semantic-type"], ["组件映射", "component-map"], ["规则", "rules"]],
  spacing: [["间距", "spacing"], ["平台尺寸", "platform-metrics"], ["圆角", "radius"]],
  motion: [["常用时长", "duration"], ["规则", "rules"]],
  components: [["两套组件", "families"], ["基础表面", "surfaces"], ["全部组件", "catalog"]],
  buttons: [["预览", "preview"]],
  inputs: [["预览", "preview"]],
  selection: [["预览", "preview"]],
  navigation: [["预览", "preview"]],
  "list-rows": [["预览", "preview"]],
  feedback: [["预览", "preview"]],
  dialogs: [["预览", "preview"]],
  menus: [["预览", "preview"]],
  icons: [["预览", "preview"]],
  "app-bars": [["预览", "preview"]],
  "data-display": [["预览", "preview"]],
  "app-shell": [["结构示例", "examples"], ["规则", "rules"]],
  "content-browser": [["结构示例", "examples"], ["规则", "rules"]],
  "task-workspace": [["结构示例", "examples"], ["规则", "rules"]],
  "status-system": [["状态选择", "decision"], ["实际状态", "examples"], ["进度与任务结果", "progress"]],
  products: [["当前产品", "appearance"], ["专属规则", "differences"], ["页面规范", "product-patterns"], ["产品变量", "product-tokens"], ["边界", "boundaries"]],
  delivery: [["文件", "files"], ["常用命令", "commands"]],
  qa: [["必须通过", "requirements"], ["检查范围", "coverage"]],
};

function pageToc(): string {
  const items = tocByPage[state.page] ?? tocByPage.overview ?? [];
  return `<aside class="page-toc" aria-label="本页内容">
    <strong>本页内容</strong>
    ${items.map(([label, id]) => `<a href="#${id}" data-section-link="${id}">${escapeHtml(label)}</a>`).join("")}
  </aside>`;
}

function inspector(): string {
  const target = state.inspectorTarget;
  return `
    <aside class="inspector ${state.inspectorOpen ? "open" : ""}">
      <header><span><small>变量详情</small><strong>查看具体数值</strong></span><button id="inspector-close" type="button">×</button></header>
      ${target
        ? `<main>
            <div class="token-preview" style="--token-value:${displayColor(target.value)}"><i></i></div>
            <dl>
              <div><dt>用途</dt><dd>${escapeHtml(target.role)}</dd></div>
              <div><dt>变量名</dt><dd><code>${escapeHtml(target.token)}</code></dd></div>
              <div><dt>当前值</dt><dd><code>${escapeHtml(target.value)}</code></dd></div>
              <div><dt>来自</dt><dd>${escapeHtml(target.source)}</dd></div>
              <div><dt>说明</dt><dd>${escapeHtml(target.note)}</dd></div>
            </dl>
          </main>`
        : `<div class="inspector-empty"><strong>先选一个变量</strong><p>点击颜色、间距、圆角或变量表格中的一行。</p></div>`}
    </aside>`;
}

function update(patch: Partial<AppState>): void {
  state = { ...state, ...patch };
  saveState(state);
  render();
}

function bind(): void {
  root.querySelectorAll<HTMLElement>("[data-page]").forEach((element) => {
    element.addEventListener("click", () => {
      const page = element.dataset.page as PageId;
      mobileNavOpen = false;
      history.replaceState(null, "", `#${page}`);
      update({ page });
      window.scrollTo({ top: 0 });
    });
  });
  root.querySelector("#mobile-nav-toggle")?.addEventListener("click", () => {
    mobileNavOpen = !mobileNavOpen;
    render();
    if (mobileNavOpen) {
      requestAnimationFrame(() => root.querySelector<HTMLButtonElement>(".sidebar nav button.active")?.focus());
    }
  });
  root.querySelector("#mobile-nav-backdrop")?.addEventListener("click", () => {
    mobileNavOpen = false;
    render();
  });
  root.onkeydown = (event) => {
    if (event.key === "Escape" && mobileNavOpen) {
      mobileNavOpen = false;
      render();
      requestAnimationFrame(() => root.querySelector<HTMLButtonElement>("#mobile-nav-toggle")?.focus());
    }
  };
  root.querySelector<HTMLSelectElement>("#skin")?.addEventListener("change", (event) => {
    update({ skin: (event.target as HTMLSelectElement).value as SkinId });
  });
  root.querySelector<HTMLSelectElement>("#platform")?.addEventListener("change", (event) => {
    update({ platform: (event.target as HTMLSelectElement).value as PlatformId });
  });
  root.querySelector("#motion")?.addEventListener("click", () => update({ reducedMotion: !state.reducedMotion }));
  root.querySelector("#inspector-close")?.addEventListener("click", () => update({ inspectorOpen: false }));
  root.querySelectorAll<HTMLElement>("[data-token]").forEach((element) => {
    element.addEventListener("click", () => update({
      inspectorOpen: true,
      inspectorTarget: {
        token: element.dataset.token ?? "",
        role: element.dataset.role ?? "",
        value: element.dataset.value ?? "",
        source: element.dataset.source ?? "",
        note: element.dataset.note ?? "",
      },
    }));
  });
  root.querySelector<HTMLSelectElement>("#product-inline")?.addEventListener("change", (event) => {
    const product = (event.target as HTMLSelectElement).value as ProductId;
    update({ product, accent: tokens.accents.products[product].default });
  });
  root.querySelector<HTMLSelectElement>("#accent-inline")?.addEventListener("change", (event) => update({ accent: (event.target as HTMLSelectElement).value }));
  root.querySelectorAll<HTMLElement>("[data-accent-pick]").forEach((element) => element.addEventListener("click", () => update({ accent: element.dataset.accentPick ?? state.accent })));
  root.querySelectorAll<HTMLElement>("[data-qa-product]").forEach((element) => element.addEventListener("click", () => {
    const product = element.dataset.qaProduct as ProductId;
    update({ product, viewport: element.dataset.qaViewport as AppState["viewport"], accent: tokens.accents.products[product].default });
  }));
  root.querySelectorAll<HTMLElement>("[data-qa-platform]").forEach((element) => {
    element.addEventListener("click", () => update({ platform: element.dataset.qaPlatform as PlatformId }));
  });
  root.querySelectorAll<HTMLAnchorElement>("[data-section-link]").forEach((element) => {
    element.addEventListener("click", (event) => {
      event.preventDefault();
      root.querySelector(`#${element.dataset.sectionLink}`)?.scrollIntoView({ behavior: state.reducedMotion ? "auto" : "smooth" });
    });
  });
  root.querySelectorAll<HTMLButtonElement>(".toggle").forEach((element) => element.addEventListener("click", () => {
    const next = element.getAttribute("aria-pressed") !== "true";
    element.setAttribute("aria-pressed", String(next));
    element.querySelector(".switch")?.classList.toggle("on", next);
  }));
  root.querySelector<HTMLInputElement>("#nav-search")?.addEventListener("input", (event) => {
    const query = (event.target as HTMLInputElement).value.trim().toLowerCase();
    root.querySelectorAll<HTMLElement>("[data-nav-label]").forEach((item) => {
      item.hidden = Boolean(query) && !(item.dataset.navLabel ?? "").toLowerCase().includes(query);
    });
  });
}

function render(): void {
  const product = tokens.accents.products[state.product];
  if (!product.presets.some((preset) => preset.id === state.accent)) state.accent = product.default;
  applyTheme(state.skin, state.product, state.accent, state.reducedMotion);
  applyPlatformProfile(state.platform);
  root.innerHTML = `<div class="workbench ${state.inspectorOpen ? "with-inspector" : ""} ${mobileNavOpen ? "mobile-nav-open" : ""}">${sidebar()}${mobileNavOpen ? '<button id="mobile-nav-backdrop" class="mobile-nav-backdrop" type="button" aria-label="关闭目录"></button>' : ""}<div class="workspace">${topbar()}<main class="content"><div class="doc-layout">${renderPage()}${pageToc()}</div></main></div>${inspector()}</div>`;
  bind();
}

const hashPage = location.hash.slice(1) as PageId;
if (navigation.some((item) => item.id === hashPage)) state.page = hashPage;
if (!navigation.some((item) => item.id === state.page)) state.page = "overview";
installPrimitiveVariables();
matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => state.skin === "system" && render());
render();

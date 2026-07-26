import "./styles.css";
import {
  componentContracts,
  deliveryMeta,
  inspect,
  navigation,
  navigationGroups,
  productMeta,
  resolveSkin,
  tokens,
  viewerContent,
  viewportWidths,
} from "./data";
import { loadState, saveState, type AppState } from "./state";
import { applyTheme, installPrimitiveVariables } from "./theme";
import type {
  InspectorTarget,
  PageId,
  ProductId,
  SkinId,
} from "./types";

const rootElement = document.querySelector<HTMLDivElement>("#app");
if (!rootElement) throw new Error("Missing #app");
const root = rootElement;
let state = loadState();

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
  "设计原则": "principles",
  "规范内容": "contents",
  "使用方式": "workflow",
  "修改设计": "edit",
  "怎么判断放在哪里": "placement",
  "当前外观": "appearance",
  "使用规则": "rules",
  "字体层级": "type-scale",
  "规则": "rules",
  "间距": "spacing",
  "圆角": "radius",
  "常用时长": "duration",
  "什么时候使用": "when-to-use",
  "代码演示": "examples",
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
    <aside class="sidebar">
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
      <div class="top-title"><b>K</b><span><small>${escapeHtml(pageInfo().label)}</small><strong>${escapeHtml(pageInfo().label)}</strong></span></div>
      <div class="top-actions">
        <label class="search"><span>⌕</span><input id="nav-search" type="search" placeholder="搜索目录"></label>
        <label class="select-control"><span>外观</span><select id="skin">
          ${option("system", "跟随系统", state.skin)}
          ${tokens.skins.presets.map((skin) => option(skin.id, skin.name, state.skin)).join("")}
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
      <div class="overview-meta">
        <span>当前版本 <b>v${escapeHtml(tokens.primitives.specVersion)}</b></span>
        <span>内容校验 <code>${escapeHtml(deliveryMeta.tokenDigest.slice(0, 12))}</code></span>
      </div>
      <section class="content-section">
        ${sectionHeader("设计原则")}
        <div class="principle-list">
          <article><b>01</b><div><strong>先解决通用问题</strong><p>多个产品都会遇到的问题，统一放在基础、组件和页面规范中。</p></div></article>
          <article><b>02</b><div><strong>规则必须能落到代码</strong><p>颜色、尺寸和状态使用变量表达，并由构建工具生成各端文件。</p></div></article>
          <article><b>03</b><div><strong>产品差异单独说明</strong><p>产品名称只出现在差异页，不混入通用组件和基础规则。</p></div></article>
        </div>
      </section>
      <section class="content-section">
        ${sectionHeader("规范内容", "先看通用规则；只有需要处理品牌或业务差异时，才进入产品差异。")}
        <div class="docs-index">
          <button data-page="color"><span><strong>基础规范</strong><small>颜色、字体、间距、圆角和动效</small></span><i>→</i></button>
          <button data-page="buttons"><span><strong>组件</strong><small>组件的用途、状态、示例和设计变量</small></span><i>→</i></button>
          <button data-page="app-shell"><span><strong>页面结构</strong><small>组件如何组成应用框架、弹层和设置页</small></span><i>→</i></button>
          <button data-page="products"><span><strong>产品差异</strong><small>主题色、内容表达和产品特有规则</small></span><i>→</i></button>
        </div>
      </section>
      <section class="content-section">
        ${sectionHeader("使用方式")}
        <ol class="prose-steps compact-steps">
          <li><b>查规则</b><span>先确认基础规范和现有组件能否解决问题。</span></li>
          <li><b>改源文件</b><span>修改 <code>tokens/</code>、<code>components/</code> 或 <code>patterns/</code>，不要改生成文件。</span></li>
          <li><b>生成并检查</b><span>运行构建和检查，再把结果同步到产品工程。</span></li>
        </ol>
        <button class="text-link" data-page="getting-started">查看完整使用说明 →</button>
      </section>
    </article>`;
}

function gettingStarted(): string {
  return `
    <article class="document">
      ${pageHeaderFor("getting-started")}
      <section class="content-section">
        ${sectionHeader("修改设计")}
        <ol class="prose-steps">
          <li><b>找到对应位置。</b><span>颜色和尺寸在 <code>tokens/</code>，组件规则在 <code>components/</code>，页面规则在 <code>patterns/</code>。</span></li>
          <li><b>修改源文件。</b><span>不要直接修改 <code>dist/</code> 或产品工程中的生成文件。</span></li>
          <li><b>运行检查。</b><pre><code>make validate test build check</code></pre></li>
          <li><b>同步产品。</b><pre><code>python3 tool/kai_design.py sync</code></pre></li>
        </ol>
      </section>
      <section class="content-section">
        ${sectionHeader("怎么判断放在哪里")}
        <div class="decision-table">
          <div><strong>多个产品都会用</strong><span>放到基础、组件或页面规范</span></div>
          <div><strong>只有一个产品需要</strong><span>放到产品差异中</span></div>
          <div><strong>第二个产品也需要了</strong><span>把规则提升为通用规范</span></div>
          <div><strong>产品暂时无法跟进</strong><span>登记原因和待处理事项</span></div>
        </div>
      </section>
      ${note("记住", "产品代码是规范的使用方，不是另一份规范。")}
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

function typographyPage(): string {
  const rows = [
    ["页面大标题", "48 / 56", "700", "每页最多一个"],
    ["区块标题", "28 / 36", "650", "用于分隔主要内容"],
    ["正文", "16 / 26", "400", "说明文字和长内容"],
    ["辅助文字", "13 / 18", "500", "状态、版本和补充信息"],
  ];
  return `
    <article class="document">
      ${pageHeaderFor("typography")}
      <section class="content-section">
        ${sectionHeader("字体层级")}
        <div class="type-table">
          ${rows.map(([name, size, weight, usage], index) => `<div class="type-sample type-${index}">
            <span><strong>${name}</strong><code>${size} · ${weight}</code></span>
            <p>${usage}</p>
          </div>`).join("")}
        </div>
      </section>
      <section class="content-section">
        ${sectionHeader("规则")}
        <ul class="prose-list"><li>优先使用系统字体，避免额外下载字体影响启动。</li><li>正文最小 16px，辅助文字最小 13px。</li><li>展示文字不能使用主题色。</li><li>一段内容中最多出现三个文字层级。</li></ul>
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
): string => {
  const contract = componentContracts.components[
    pageId as keyof typeof componentContracts.components
  ];
  return `
  <article class="document">
    ${pageHeaderFor(pageId)}
    <section class="content-section">
      ${sectionHeader("什么时候使用")}
      <ul class="prose-list">${contract.usage.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    </section>
    <section class="content-section">
      ${sectionHeader("代码演示")}
      <div class="component-preview">
        <div class="component-stage">${preview}</div>
        <div class="component-caption"><strong>基本用法</strong><p>展示常用状态。点击变量表中的一行可查看来源和当前值。</p></div>
      </div>
    </section>
    <section class="content-section">
      ${sectionHeader("设计变量")}
      ${tokenTable(contract.tokens, "contracts/components.json", "这是结构化组件契约中的验收锚点。")}
    </section>
  </article>`;
};

function buttonsPage(): string {
  return componentPage(
    "buttons",
    `<div class="demo-stack">
      <div class="demo-group"><span>文字按钮</span><div class="button-line"><button class="primary">主要操作</button><button class="secondary">次要操作</button><button class="ghost">文字操作</button><button class="danger">删除</button><button class="primary" disabled>不可用</button></div></div>
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
  return componentPage(
    "navigation",
    `<div class="nav-preview">
      <div class="demo-group"><span>页内标签</span><div class="tabs"><button class="active">总览</button><button>组件</button><button>记录</button></div></div>
      <div class="navigation-pair">
        <div class="demo-group"><span>桌面侧栏</span><div class="side-nav-demo"><button class="active">设置</button><button>外观</button><button>关于</button></div></div>
        <div class="demo-group"><span>移动底栏</span><div class="bottom-nav-demo"><button class="active"><b>⌂</b><span>首页</span></button><button><b>◇</b><span>内容</span></button><button><b>⚙</b><span>设置</span></button></div></div>
      </div>
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
  return componentPage(
    "feedback",
    `<div class="feedback-demo">
      <div class="feedback-item"><span>轻提示</span><div class="snackbar">设置已保存 <button>撤销</button></div></div>
      <div class="feedback-item"><span>工具提示</span><div class="tooltip-sample"><button class="demo-icon-button">?</button><b>查看使用说明</b></div></div>
      <div class="feedback-item wide"><span>空态与加载</span><div class="empty-state"><i>◇</i><strong>还没有内容</strong><p>添加第一项后会显示在这里。</p><button class="secondary">添加内容</button></div><div class="loading-state"><i></i><span>正在载入</span></div></div>
      <div class="feedback-item wide"><span>进度</span><div class="linear-progress"><i style="width:62%"></i></div><small>已完成 62%</small></div>
      <div class="feedback-item wide"><span>滚动条</span><div class="scrollbar-sample"><i></i></div></div>
    </div>`,
  );
}

function dialogsPage(): string {
  return componentPage(
    "dialogs",
    `<div class="demo-stack">
      <div class="demo-group"><span>确认对话框</span><div class="dialog-demo">
        <div class="dialog-backdrop"></div>
        <article>
          <header><h3>删除这条记录？</h3><button class="demo-icon-button" aria-label="关闭">×</button></header>
          <p>删除后将无法恢复。其他记录不会受到影响。</p>
          <footer><button class="secondary">取消</button><button class="danger">删除</button></footer>
        </article>
      </div></div>
      <div class="demo-group"><span>输入对话框</span><div class="prompt-dialog">
        <h3>重命名</h3>
        <label><span>名称</span><input value="设计规范"></label>
        <footer><button class="secondary">取消</button><button class="primary">保存</button></footer>
      </div></div>
    </div>`,
  );
}

function menusPage(): string {
  return componentPage(
    "menus",
    `<div class="menu-demo">
      <div class="demo-group"><span>锚定菜单</span><div class="anchored-menu">
        <header>排序方式</header>
        <button class="selected"><i>↕</i><span>最近修改</span><b>✓</b></button>
        <button><i>字</i><span>按名称</span></button>
        <hr>
        <button class="destructive"><i>删</i><span>清除记录</span></button>
      </div></div>
      <div class="demo-group"><span>移动端底部弹层</span><div class="sheet-frame"><div class="sheet"><i class="sheet-handle"></i><strong>选择操作</strong><button><span>添加到收藏</span><b>›</b></button><button><span>分享</span><b>›</b></button><button class="destructive"><span>删除</span></button></div></div></div>
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
  return patternPage(
    "app-shell",
    `<div class="shell"><aside><b>K</b><button class="active">总览</button><button>内容</button><button>收藏</button><button>设置</button></aside><main><header><strong>页面标题</strong><button class="primary">新建</button></header><section><article></article><article></article><article></article></section><div></div></main></div>`,
    ["桌面主窗口默认 1280×800，最小 1024×700。", "侧栏只放主要目的地，不复用普通列表行尺寸。", "内容区负责滚动，固定导航不跟随内容移动。"],
  );
}

function overlaysPage(): string {
  return patternPage(
    "overlays",
    `<div class="overlay-demo"><div class="backdrop"></div><article><h3>确认操作</h3><p>说明这项操作会发生什么。</p><footer><button class="secondary">取消</button><button class="primary">确认</button></footer></article></div>`,
    ["菜单宽度由内容决定，最小 160px，最大 280px。", "需要用户完整注意力的任务才使用对话框。", "关闭方式包括关闭按钮、取消操作和键盘 Escape。"],
  );
}

function settingsPage(): string {
  return patternPage(
    "settings",
    `<div class="settings-demo"><section><h3>外观</h3><label><span><strong>界面外观</strong><small>跟随系统</small></span><button class="secondary">更改</button></label><label><span><strong>减少动态效果</strong><small>关闭</small></span><i class="switch"><b></b></i></label></section><section><h3>通用</h3><label><span><strong>自动检查更新</strong><small>开启</small></span><i class="switch on"><b></b></i></label></section></div>`,
    ["一页内容可以完成时，不增加标签页。", "设置名称说明功能，副标题显示当前值或影响。", "同一分组中的行保持相同高度和对齐方式。"],
  );
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
  return `
    <article class="document">
      ${pageHeaderFor("qa")}
      <section class="content-section">
        ${sectionHeader("必须通过")}
        <div class="check-list">${["生成文件与源文件一致", "组件的正常、悬停、聚焦和禁用状态可用", "浅色和深色外观都清楚易读", "窗口缩小时没有内容溢出", "减少动态效果后仍可正常操作"].map((item) => `<label><input type="checkbox" checked><span>${item}</span></label>`).join("")}</div>
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
    case "getting-started": return gettingStarted();
    case "color": return colorPage();
    case "typography": return typographyPage();
    case "spacing": return spacingPage();
    case "motion": return motionPage();
    case "buttons": return buttonsPage();
    case "inputs": return inputsPage();
    case "selection": return selectionPage();
    case "navigation": return navigationPage();
    case "list-rows": return listRowsPage();
    case "feedback": return feedbackPage();
    case "dialogs": return dialogsPage();
    case "menus": return menusPage();
    case "app-shell": return appShellPage();
    case "overlays": return overlaysPage();
    case "settings": return settingsPage();
    case "products": return productsPage();
    case "delivery": return deliveryPage();
    case "qa": return qaPage();
    default: return overview();
  }
}

const tocByPage: Partial<Record<PageId, Array<[string, string]>>> = {
  overview: [["设计原则", "principles"], ["规范内容", "contents"], ["使用方式", "workflow"]],
  "getting-started": [["修改设计", "edit"], ["怎么判断放在哪里", "placement"]],
  color: [["基础色板", "base-palette"], ["当前外观", "appearance"], ["使用规则", "rules"]],
  typography: [["字体层级", "type-scale"], ["规则", "rules"]],
  spacing: [["间距", "spacing"], ["圆角", "radius"]],
  motion: [["常用时长", "duration"], ["规则", "rules"]],
  buttons: [["什么时候使用", "when-to-use"], ["代码演示", "examples"], ["设计变量", "design-tokens"]],
  inputs: [["什么时候使用", "when-to-use"], ["代码演示", "examples"], ["设计变量", "design-tokens"]],
  selection: [["什么时候使用", "when-to-use"], ["代码演示", "examples"], ["设计变量", "design-tokens"]],
  navigation: [["什么时候使用", "when-to-use"], ["代码演示", "examples"], ["设计变量", "design-tokens"]],
  "list-rows": [["什么时候使用", "when-to-use"], ["代码演示", "examples"], ["设计变量", "design-tokens"]],
  feedback: [["什么时候使用", "when-to-use"], ["代码演示", "examples"], ["设计变量", "design-tokens"]],
  dialogs: [["什么时候使用", "when-to-use"], ["代码演示", "examples"], ["设计变量", "design-tokens"]],
  menus: [["什么时候使用", "when-to-use"], ["代码演示", "examples"], ["设计变量", "design-tokens"]],
  "app-shell": [["结构示例", "examples"], ["规则", "rules"]],
  overlays: [["结构示例", "examples"], ["规则", "rules"]],
  settings: [["结构示例", "examples"], ["规则", "rules"]],
  products: [["当前产品", "appearance"], ["专属规则", "differences"], ["产品变量", "product-tokens"], ["边界", "boundaries"]],
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
      history.replaceState(null, "", `#${page}`);
      update({ page });
      window.scrollTo({ top: 0 });
    });
  });
  root.querySelector<HTMLSelectElement>("#skin")?.addEventListener("change", (event) => {
    update({ skin: (event.target as HTMLSelectElement).value as SkinId });
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
  root.innerHTML = `<div class="workbench ${state.inspectorOpen ? "with-inspector" : ""}">${sidebar()}<div class="workspace">${topbar()}<main class="content"><div class="doc-layout">${renderPage()}${pageToc()}</div></main></div>${inspector()}</div>`;
  bind();
}

const hashPage = location.hash.slice(1) as PageId;
if (navigation.some((item) => item.id === hashPage)) state.page = hashPage;
if (!navigation.some((item) => item.id === state.page)) state.page = "overview";
installPrimitiveVariables();
matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => state.skin === "system" && render());
render();

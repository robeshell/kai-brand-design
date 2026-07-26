(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))n(c);new MutationObserver(c=>{for(const a of c)if(a.type==="childList")for(const p of a.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&n(p)}).observe(document,{childList:!0,subtree:!0});function s(c){const a={};return c.integrity&&(a.integrity=c.integrity),c.referrerPolicy&&(a.referrerPolicy=c.referrerPolicy),c.crossOrigin==="use-credentials"?a.credentials="include":c.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(c){if(c.ep)return;c.ep=!0;const a=s(c);fetch(c.href,a)}})();const I={products:{kaigua:{default:"indigo",displayName:"开刮",note:"单值模型：hover/pressed 由通用 stateLayer 前景叠加表达，不设独立 accent hover 色",presets:[{accent:"#6673C7",id:"indigo",name:"靛蓝"},{accent:"#3F9E98",id:"teal",name:"青绿"},{accent:"#0284C7",id:"sky",name:"晴空"},{accent:"#475569",id:"slate",name:"岩灰"}]},kaijuan:{default:"ember",displayName:"开卷",note:"单值模型：hover/pressed 由通用 stateLayer 前景叠加表达，不设独立 accent hover 色",presets:[{accent:"#EA580C",id:"ember",name:"暖橙"},{accent:"#0284C7",id:"sky",name:"晴空"},{accent:"#047857",id:"forest",name:"松绿"},{accent:"#BE123C",id:"rose",name:"绯红"},{accent:"#475569",id:"slate",name:"岩灰"}]},kaiting:{customDerive:"自定义色：hover = lerp(accent, white, 0.14)，pressed = lerp(accent, black, 0.13)",default:"coral",displayName:"开听",presets:[{accent:"#FF5A4D",hover:"#FF7567",id:"coral",name:"珊瑚",pressed:"#E3483E"},{accent:"#D95770",hover:"#E66C82",id:"rose",name:"玫瑰",pressed:"#BF465D"},{accent:"#6673C7",hover:"#7884D2",id:"indigo",name:"靛蓝",pressed:"#5360AE"},{accent:"#3F9E98",hover:"#51ADA7",id:"teal",name:"青绿",pressed:"#338781"},{accent:"#C7842F",hover:"#D4953F",id:"amber",name:"暖金",pressed:"#AB6E24"},{accent:"#8067BC",hover:"#9279C8",id:"violet",name:"紫罗兰",pressed:"#6D54A5"}]}}},R={components:{buttons:{tokens:[{name:"控件圆角",token:"radii.control",value:"10px"},{name:"最小触控范围",token:"tapTargets.buttonMin",value:"44px"},{name:"状态动效",token:"motion.uiStandard",value:"180ms"}],usage:["主要按钮用于当前区域最重要的操作。","危险操作必须使用明确动词，并提供确认或撤销。","不要用按钮代替导航链接。"]},dialogs:{tokens:[{name:"对话框圆角",token:"radii.dialog",value:"20px"},{name:"最大宽度",token:"component.dialog.maxWidth",value:"520px"},{name:"遮罩",token:"component.dialog.barrier",value:"black 38% / 62%"},{name:"按钮间距",token:"component.dialog.actionGap",value:"10px"}],usage:["需要用户确认不可逆操作，或完成一段短任务时使用。","简单选择优先使用菜单，不要把对话框当作普通信息卡片。","内容过高时只滚动内容区，标题和按钮区保持可见。"]},feedback:{tokens:[{name:"轻提示圆角",token:"radii.menu",value:"12px"},{name:"轻提示时长",token:"component.feedback.snackbarDuration",value:"1.4s"},{name:"提示延迟",token:"component.feedback.tooltipDelay",value:"450ms"},{name:"加载圈",token:"component.feedback.spinner",value:"24px / 2px"}],usage:["短暂完成结果使用轻提示；需要用户处理的问题不要自动消失。","空态说明为什么没有内容，并在有明确下一步时提供操作。","加载和进度使用统一尺寸与强调色，不单独硬编码。"]},inputs:{tokens:[{name:"输入框圆角",token:"radii.control",value:"10px"},{name:"输入文字",token:"typography.sizes.rowTitle",value:"13.5px"},{name:"焦点边框",token:"component.input.focusBorder",value:"2px · 无外侧 outline"}],usage:["标签写清楚需要填写什么，不要只依赖占位文字。","错误提示放在输入框附近，并说明如何修正。","不可编辑和只读状态需要清楚区分。"]},"list-rows":{tokens:[{name:"普通行高度",token:"component.listRow.minHeight",value:"54px"},{name:"设置行高度",token:"component.listRow.settingsHeight",value:"64px"},{name:"控件圆角",token:"radii.control",value:"10px"},{name:"标题字号",token:"typography.sizes.rowTitle",value:"13.5px"}],usage:["设置项、弹层操作项和带副标题的结构化列表使用列表行。","整行点击时必须提供完整的键盘焦点和按钮语义。","选中态使用勾选或文字表达，不使用大面积强调色填充。"]},menus:{tokens:[{name:"菜单圆角",token:"radii.menu",value:"12px"},{name:"菜单宽度",token:"component.menu.width",value:"160–280px"},{name:"菜单行高",token:"component.menu.rowHeight",value:"36px"},{name:"弹层顶角",token:"radii.sheet",value:"18px"},{name:"拖拽把手",token:"component.sheet.handle",value:"38×4px"}],usage:["与触发位置相关的短操作列表使用锚定菜单。","窄屏自动切换为底部弹层，并保留安全区域。","菜单宽度由内容决定，长列表需要限制高度并允许滚动。"]},navigation:{tokens:[{name:"侧栏宽度",token:"layoutMetrics.sidebarWidth",value:"216 / 236px"},{name:"导航文字",token:"typography.sizes.navLabel",value:"13.5px"},{name:"选中背景",token:"component.navigation.selection",value:"accent 10%"},{name:"侧栏材质",token:"component.navigation.chrome",value:"GlassSurface strong"}],usage:["当前项必须清楚可见，同一组中只有一个当前项。","桌面侧栏和移动底栏共享目的地，但尺寸不同。","不要把普通操作混进主导航。"]},selection:{tokens:[{name:"选中背景",token:"derivedAlphas.selection",value:"accent 10%"},{name:"勾选框圆角",token:"radii.checkbox",value:"5px"},{name:"状态动效",token:"motion.uiStandard",value:"180ms"}],usage:["开关变化后立即生效，不需要再放保存按钮。","不能只靠颜色表达是否选中。","一组单选项只能有一个选中状态。"]}}},K={basePalette:{mainBackground:"#F7F9FC",primary:"#FF5A4D",sideBackground:"#F3F5F8"},radii:{card:14,checkbox:5,control:10,dialog:20,menu:12,pill:999,sheet:18,tooltip:8},spacing:{comment:"4 的倍数刻度；组件内部微调可用半档（2/6/10），页面级只用下列值",x1:4,x2:8,x3:12,x4:16,x6:24,x8:32},specVersion:"0.4.0"},W={kaigua:{product:"kaigua",productSpecVersion:"0.1.1",tokens:{}},kaijuan:{product:"kaijuan",productSpecVersion:"0.1.1",tokens:{"cover.radius":{description:"书籍与漫画窄幅封面的默认圆角",type:"dimension",value:12}}},kaiting:{product:"kaiting",productSpecVersion:"0.1.0",tokens:{"playback.busySpinnerSize":{description:"传输按钮忙碌指示器尺寸",type:"dimension",value:24},"playback.busySpinnerStroke":{description:"传输按钮忙碌指示器线宽",type:"dimension",value:2},"source.local":{description:"本机文件夹来源标识色",type:"color",value:"#55B889"},"source.webDav":{description:"WebDAV 远程来源标识色",type:"color",value:"#5E8BFF"}}}},z={presets:[{brightness:"light",canvas:"#F7F9FC",description:"品牌的中性浅色玻璃界面",effects:{darkVeilOpacity:.12,lightVeilOpacity:.04,motionDurationS:14,motionStrength:1,paletteTransitionMs:420,primaryGlowOpacity:.9,secondaryGlowOpacity:.72,shadowScale:1},elevated:"#FFFFFF",glass:{blur:20,border:"black@0.07",canvasHighlight:"#FBFBFC",innerHighlight:"white@0.55",mutedText:"#77747D",primaryText:"#1C1C22",secondaryText:"#5A5A62",shadow:"black@0.09",strongBlur:28,strongSurface:"#FFFFFF@0.87",surface:"#FFFFFF@0.72"},id:"default",name:"默认",overlay:"#F1F2F4",surface:"#FAFAFB"},{brightness:"light",canvas:"#F1F4F8",description:"冷静通透的实色表面与清晰层次",effects:{darkVeilOpacity:.08,lightVeilOpacity:.015,motionDurationS:26,motionStrength:.22,paletteTransitionMs:240,primaryGlowOpacity:.38,secondaryGlowOpacity:.24,shadowScale:0},elevated:"#FFFFFF",glass:{blur:0,border:"#526174@0.12",canvasHighlight:"#F8FBFF",innerHighlight:"#FFFFFF@1.0",mutedText:"#718092",primaryText:"#18202A",secondaryText:"#536171",shadow:"transparent",strongBlur:0,strongSurface:"#FFFFFF@1.0",surface:"#FFFFFF@1.0"},id:"pure",name:"纯净",note:"实色皮肤：blur=0 时组件必须跳过 BackdropFilter，shadowScale=0 时无投影。组件读 token 则此行为免费获得。",overlay:"#E5EBF2",surface:"#FAFCFF"},{brightness:"dark",canvas:"#0D0D0F",description:"专注于内容的低亮深色界面",effects:{darkVeilOpacity:.22,lightVeilOpacity:.04,motionDurationS:18,motionStrength:.68,paletteTransitionMs:520,primaryGlowOpacity:.76,secondaryGlowOpacity:.54,shadowScale:1.12},elevated:"#202024",glass:{blur:20,border:"white@0.11",canvasHighlight:"#17171A",innerHighlight:"white@0.12",mutedText:"white@0.70",primaryText:"#F7F3F4",secondaryText:"white@0.60",shadow:"black@0.42",strongBlur:28,strongSurface:"#202024@0.90",surface:"#17171A@0.72"},id:"deep-night",name:"深夜",overlay:"#29292E",surface:"#17171A"}]},J={pages:{"app-shell":["页面结构","应用框架","桌面使用侧栏，窄屏使用底部导航。内容区保持同一套层级。"],buttons:["组件","按钮","覆盖文字按钮、图标按钮、工具按钮和悬浮按钮。一个区域通常只有一个主要操作。"],color:["基础规范","颜色","浅色界面以冷白为主内容背景、浅灰为侧栏背景、暖橙为参考主色。产品强调色只在产品差异中覆盖。"],delivery:["产品与工程","生成文件","设计源文件经过检查后，生成各端可以直接使用的代码和规范快照。"],dialogs:["组件","对话框","对话框用于确认、输入、表单和需要用户完整注意力的任务。"],feedback:["组件","反馈","覆盖轻提示、工具提示、空态、加载和进度。反馈应该说明当前发生了什么。"],"getting-started":["开始","怎么使用","设计师和工程师都从同一份规范出发。"],inputs:["组件","输入框","覆盖文本输入、下拉选择和滑杆。控件需要清楚显示焦点、错误和不可编辑状态。"],"list-rows":["组件","列表行","列表行用于设置项、操作项和结构化列表。整行可点击时，状态覆盖整行。"],menus:["组件","菜单与底部弹层","同一组操作在宽屏使用锚定菜单，在窄屏改为底部弹层。"],motion:["基础规范","动效","动效只用于说明界面发生了什么，不用于装饰。"],navigation:["组件","导航","导航用于切换主要目的地。桌面使用侧栏，移动端使用底栏或标签。"],overlays:["页面结构","弹窗与浮层","简单选择使用菜单，复杂任务使用对话框；窄屏时可改为底部弹层。"],overview:["开始","Kai Design","一套供多个产品共同使用的设计规范。这里说明规则、展示组件，并输出工程可以直接使用的变量。"],products:["产品与工程","产品差异","这里只记录不能放进通用规范的主题色、内容样式和特殊页面。"],qa:["产品与工程","检查清单","发布前按外观、产品和窗口大小逐项检查。"],selection:["组件","选择控件","覆盖开关、勾选框、单选项和选择条。选中状态不能只靠颜色表达。"],settings:["页面结构","设置页","设置按主题分组，直接展示当前值；不要为了少量内容再加标签页。"],spacing:["基础规范","间距与圆角","页面间距使用 4px 倍数。圆角按组件用途选择，不按个人感觉调整。"],typography:["基础规范","字体","字号负责可读性，字重和留白负责层级。不要靠大量不同字号制造区别。"]}},_={accents:I,componentContracts:R,primitives:K,productTokens:W,skins:z,viewerContent:J},U="982aa169e6042c0256389e2bb730d99dc0f091b6ac1017bfbd9dc73377282ab5",Q={tokenDigest:U},r=_,X=r.viewerContent,Y=r.componentContracts,C=Q,w={kaiting:{character:"沉浸、节奏、封面主角",content:"专辑封面、黑胶与歌词属于内容层。",prefix:"Sound*",differences:[{title:"封面氛围",description:"详情页可以从封面提取背景和控件色，不改变通用界面的颜色规则。",reference:"divergences D1"},{title:"黑胶造型",description:"盘面、唱臂和旋转属于内容表现，不使用通用组件的圆角与形状规则。",reference:"divergences D3"},{title:"歌词层级",description:"正在播放页允许使用更大的歌词字号，但普通界面文字仍遵守通用层级。",reference:"divergences D4"}]},kaijuan:{character:"安静、克制、书房感",content:"书页、漫画与窄幅封面属于内容层。",prefix:"App*",differences:[{title:"封面圆角",description:"书籍和漫画封面使用 12px 圆角；普通界面卡片继续使用通用圆角。",reference:"cover.radius · 12px"},{title:"阅读主题",description:"阅读器工具栏跟随当前书页主题取色，退出阅读器后恢复通用界面主题。",reference:"divergences D1"},{title:"内容渲染",description:"书内样式、高亮色和漫画像素属于内容，不反向影响书库、设置和弹窗。",reference:"divergences D2"}]},kaigua:{character:"清晰、可靠、媒体工作台",content:"海报、剧照与刮削结果属于内容层。",prefix:"Kg*",differences:[{title:"媒体图片",description:"海报和剧照是内容素材，其比例、裁切和颜色不成为通用组件规则。",reference:"content boundary"},{title:"元数据内容",description:"刮削结果和说明文件由产品定义；规范只约束承载它们的界面组件。",reference:"product scope"},{title:"设置结构",description:"设置页继续使用通用的单页分组结构，不保留旧版多标签布局。",reference:"divergences D1"}]}},q={fluid:"100%",mobile:"390px",tablet:"820px",medium:"1024px",wide:"1280px"},L=[{label:"开始",items:[{id:"overview",label:"总览"},{id:"getting-started",label:"怎么使用"}]},{label:"基础规范",items:[{id:"color",label:"颜色"},{id:"typography",label:"字体"},{id:"spacing",label:"间距与圆角"},{id:"motion",label:"动效"}]},{label:"组件",items:[{id:"buttons",label:"按钮"},{id:"inputs",label:"输入框"},{id:"selection",label:"选择控件"},{id:"navigation",label:"导航"},{id:"list-rows",label:"列表行"},{id:"feedback",label:"反馈"},{id:"dialogs",label:"对话框"},{id:"menus",label:"菜单与底部弹层"}]},{label:"页面结构",items:[{id:"app-shell",label:"应用框架"},{id:"overlays",label:"弹窗与浮层"},{id:"settings",label:"设置页"}]},{label:"产品与工程",items:[{id:"products",label:"产品差异"},{id:"delivery",label:"生成文件"},{id:"qa",label:"检查清单"}]}],k=L.flatMap(e=>e.items);function M(e){return e!=="system"?e:matchMedia("(prefers-color-scheme: dark)").matches?"deep-night":"default"}function x(e,t,s,n="tokens/primitives.json",c="这是三个产品共用的设计变量。"){return{role:e,token:t,value:typeof s=="string"?s:JSON.stringify(s,null,2),source:n,note:c}}const A={page:"overview",skin:"system",product:"kaiting",accent:"coral",viewport:"fluid",reducedMotion:!1,inspectorOpen:!1};function Z(){try{const e=new URLSearchParams(location.search),t=e.get("skin"),s=e.get("product");return{...A,...JSON.parse(localStorage.getItem("kai-viewer-state")??"{}"),...t?{skin:t}:{},...s?{product:s}:{},...e.get("reducedMotion")==="true"?{reducedMotion:!0}:{},inspectorTarget:void 0}}catch{return A}}function ee(e){const{inspectorTarget:t,...s}=e;localStorage.setItem("kai-viewer-state",JSON.stringify(s))}function te(e){if(e==="transparent")return e;const[t,s]=e.split("@");return s?`rgb(${t==="white"?"255 255 255":t==="black"?"0 0 0":`${Number.parseInt(t.slice(1,3),16)} ${Number.parseInt(t.slice(3,5),16)} ${Number.parseInt(t.slice(5,7),16)}`} / ${s})`:t}function se(e,t,s,n){const c=M(e),a=r.skins.presets.find(g=>g.id===c),p=r.accents.products[t],$=p.presets.find(g=>g.id===s)??p.presets.find(g=>g.id===p.default)??p.presets[0];if(!a||!$)return;const m=c==="default"?{page:"#FFFFFF",sidebar:"#FFFFFF",topbar:"#FFFFFF",demo:"#FFFFFF",subtle:r.primitives.basePalette.mainBackground}:{page:a.canvas,sidebar:a.surface,topbar:a.surface,demo:a.surface,subtle:a.overlay},H=$.accent,h=document.documentElement;h.dataset.skin=c,h.dataset.product=t,h.dataset.motion=n?"reduced":"normal",h.style.colorScheme=a.brightness;const G={"--canvas":a.canvas,"--surface":a.surface,"--elevated":a.elevated,"--overlay":a.overlay,"--canvas-highlight":a.glass.canvasHighlight,"--glass":a.glass.surface,"--glass-strong":a.glass.strongSurface,"--glass-border":a.glass.border,"--shadow-color":a.glass.shadow,"--page-background":m.page,"--sidebar-background":m.sidebar,"--topbar-background":m.topbar,"--demo-background":m.demo,"--subtle-background":m.subtle,"--product-main-background":r.primitives.basePalette.mainBackground,"--product-side-background":r.primitives.basePalette.sideBackground,"--text-primary":a.glass.primaryText,"--text-secondary":a.glass.secondaryText,"--text-muted":a.glass.mutedText,"--accent":H,"--product-accent":$.accent,"--blur":`${a.glass.blur}px`,"--strong-blur":`${a.glass.strongBlur}px`,"--shadow-scale":a.effects.shadowScale};Object.entries(G).forEach(([g,F])=>{h.style.setProperty(g,typeof F=="string"?te(F):String(F))})}function ne(){const e=document.documentElement;Object.entries(r.primitives.spacing).forEach(([t,s])=>{typeof s=="number"&&e.style.setProperty(`--space-${t}`,`${s}px`)}),Object.entries(r.primitives.radii).forEach(([t,s])=>{e.style.setProperty(`--radius-${t}`,`${s}px`)})}const N=document.querySelector("#app");if(!N)throw new Error("Missing #app");const d=N;let o=Z();const i=e=>String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),S=e=>{const[t,s]=e.split("@");return s?`rgb(${t==="white"?"255 255 255":t==="black"?"0 0 0":`${Number.parseInt(t.slice(1,3),16)} ${Number.parseInt(t.slice(3,5),16)} ${Number.parseInt(t.slice(5,7),16)}`} / ${s})`:e.startsWith("#")||e==="transparent"?e:"transparent"},f=(e,t,s)=>`<option value="${i(e)}" ${e===s?"selected":""}>${i(t)}</option>`,P=e=>`data-token="${i(e.token)}" data-role="${i(e.role)}" data-value="${i(e.value)}" data-source="${i(e.source)}" data-note="${i(e.note)}"`,O=()=>k.find(e=>e.id===o.page)??k[0],ae=(e,t,s)=>`
  <header class="page-header">
    <span>${i(e)}</span>
    <h1>${i(t)}</h1>
    <p>${i(s)}</p>
  </header>`,u=e=>{const[t,s,n]=X.pages[e];return ae(t,s,n)},T={基础色板:"base-palette",设计原则:"principles",规范内容:"contents",使用方式:"workflow",修改设计:"edit",怎么判断放在哪里:"placement",当前外观:"appearance",使用规则:"rules",字体层级:"type-scale",规则:"rules",间距:"spacing",圆角:"radius",常用时长:"duration",什么时候使用:"when-to-use",代码演示:"examples",设计变量:"design-tokens",结构示例:"examples",边界:"boundaries",文件:"files",常用命令:"commands",必须通过:"requirements",检查范围:"coverage"},l=(e,t="",s="")=>`
  <div class="section-header" ${s||T[e]?`id="${s||T[e]}"`:""}>
    <h2>${i(e)}</h2>
    ${t?`<p>${i(t)}</p>`:""}
  </div>`,V=(e,t)=>`
  <aside class="note"><strong>${i(e)}</strong><p>${i(t)}</p></aside>`,y=(e,t="tokens/primitives.json",s)=>`
  <div class="token-table">
    <div class="token-row token-head"><span>用途</span><span>变量</span><span>当前值</span></div>
    ${e.map(n=>{const c=x(n.name,n.token,n.value,t,n.note??s??"这是三个产品共用的设计变量。");return`<button class="token-row inspectable" type="button" ${P(c)}>
          <strong>${i(n.name)}</strong>
          <code>${i(n.token)}</code>
          <code>${i(n.value)}</code>
        </button>`}).join("")}
  </div>`;function oe(){return`
    <aside class="sidebar">
      <a class="brand" href="#overview"><b>K</b><span><strong>Kai Design</strong><small>设计规范</small></span></a>
      <nav aria-label="规范目录">
        ${L.map(e=>`
              <section>
                <h2>${i(e.label)}</h2>
                ${e.items.map(t=>`
                      <button type="button" data-page="${t.id}" data-nav-label="${t.label}"
                        class="${o.page===t.id?"active":""}"
                        aria-current="${o.page===t.id?"page":"false"}">
                        ${i(t.label)}
                      </button>`).join("")}
              </section>`).join("")}
      </nav>
      <footer><span>v${i(r.primitives.specVersion)}</span><i></i><small>规范文件已生成</small></footer>
    </aside>`}function ie(){return`
    <header class="topbar">
      <div class="top-title"><b>K</b><span><small>${i(O().label)}</small><strong>${i(O().label)}</strong></span></div>
      <div class="top-actions">
        <label class="search"><span>⌕</span><input id="nav-search" type="search" placeholder="搜索目录"></label>
        <label class="select-control"><span>外观</span><select id="skin">
          ${f("system","跟随系统",o.skin)}
          ${r.skins.presets.map(e=>f(e.id,e.name,o.skin)).join("")}
        </select></label>
        <button id="motion" class="icon-button ${o.reducedMotion?"active":""}" type="button" title="减少动态效果">≈</button>
        <span class="top-version">v${i(r.primitives.specVersion)}</span>
      </div>
    </header>`}function ce(){return`
    <article class="document">
      ${u("overview")}
      <div class="overview-meta">
        <span>当前版本 <b>v${i(r.primitives.specVersion)}</b></span>
        <span>内容校验 <code>${i(C.tokenDigest.slice(0,12))}</code></span>
      </div>
      <section class="content-section">
        ${l("设计原则")}
        <div class="principle-list">
          <article><b>01</b><div><strong>先解决通用问题</strong><p>多个产品都会遇到的问题，统一放在基础、组件和页面规范中。</p></div></article>
          <article><b>02</b><div><strong>规则必须能落到代码</strong><p>颜色、尺寸和状态使用变量表达，并由构建工具生成各端文件。</p></div></article>
          <article><b>03</b><div><strong>产品差异单独说明</strong><p>产品名称只出现在差异页，不混入通用组件和基础规则。</p></div></article>
        </div>
      </section>
      <section class="content-section">
        ${l("规范内容","先看通用规则；只有需要处理品牌或业务差异时，才进入产品差异。")}
        <div class="docs-index">
          <button data-page="color"><span><strong>基础规范</strong><small>颜色、字体、间距、圆角和动效</small></span><i>→</i></button>
          <button data-page="buttons"><span><strong>组件</strong><small>组件的用途、状态、示例和设计变量</small></span><i>→</i></button>
          <button data-page="app-shell"><span><strong>页面结构</strong><small>组件如何组成应用框架、弹层和设置页</small></span><i>→</i></button>
          <button data-page="products"><span><strong>产品差异</strong><small>主题色、内容表达和产品特有规则</small></span><i>→</i></button>
        </div>
      </section>
      <section class="content-section">
        ${l("使用方式")}
        <ol class="prose-steps compact-steps">
          <li><b>查规则</b><span>先确认基础规范和现有组件能否解决问题。</span></li>
          <li><b>改源文件</b><span>修改 <code>tokens/</code>、<code>components/</code> 或 <code>patterns/</code>，不要改生成文件。</span></li>
          <li><b>生成并检查</b><span>运行构建和检查，再把结果同步到产品工程。</span></li>
        </ol>
        <button class="text-link" data-page="getting-started">查看完整使用说明 →</button>
      </section>
    </article>`}function re(){return`
    <article class="document">
      ${u("getting-started")}
      <section class="content-section">
        ${l("修改设计")}
        <ol class="prose-steps">
          <li><b>找到对应位置。</b><span>颜色和尺寸在 <code>tokens/</code>，组件规则在 <code>components/</code>，页面规则在 <code>patterns/</code>。</span></li>
          <li><b>修改源文件。</b><span>不要直接修改 <code>dist/</code> 或产品工程中的生成文件。</span></li>
          <li><b>运行检查。</b><pre><code>make validate test build check</code></pre></li>
          <li><b>同步产品。</b><pre><code>python3 tool/kai_design.py sync</code></pre></li>
        </ol>
      </section>
      <section class="content-section">
        ${l("怎么判断放在哪里")}
        <div class="decision-table">
          <div><strong>多个产品都会用</strong><span>放到基础、组件或页面规范</span></div>
          <div><strong>只有一个产品需要</strong><span>放到产品差异中</span></div>
          <div><strong>第二个产品也需要了</strong><span>把规则提升为通用规范</span></div>
          <div><strong>产品暂时无法跟进</strong><span>登记原因和待处理事项</span></div>
        </div>
      </section>
      ${V("记住","产品代码是规范的使用方，不是另一份规范。")}
    </article>`}function le(){const e=r.skins.presets.find(n=>n.id===M(o.skin))??r.skins.presets[0],t=[["页面背景","skin.canvas",e.canvas],["内容背景","skin.surface",e.surface],["浮层背景","skin.elevated",e.elevated],["主要文字","skin.glass.primaryText",String(e.glass.primaryText)],["次要文字","skin.glass.secondaryText",String(e.glass.secondaryText)],["边框","skin.glass.border",String(e.glass.border)]],s=[["主内容背景","basePalette.mainBackground",r.primitives.basePalette.mainBackground],["侧栏背景","basePalette.sideBackground",r.primitives.basePalette.sideBackground],["参考主色","basePalette.primary",r.primitives.basePalette.primary]];return`
    <article class="document">
      ${u("color")}
      <section class="content-section">
        ${l("基础色板","三个颜色各有固定职责，不互相替代。")}
        <div class="color-grid base-color-grid">
          ${s.map(([n,c,a])=>{const p=x(n,c,a,"tokens/primitives.json");return`<button class="color-item inspectable" type="button" ${P(p)}>
                <i style="background:${S(a)}"></i>
                <span><strong>${n}</strong><code>${i(a)}</code></span>
              </button>`}).join("")}
        </div>
      </section>
      <section class="content-section">
        ${l("当前外观",`正在查看“${e.name}”外观。可在右上角切换。`)}
        <div class="color-grid">
          ${t.map(([n,c,a])=>{const p=x(n,c,a,`tokens/skins.json#${e.id}`);return`<button class="color-item inspectable" type="button" ${P(p)}>
                <i style="background:${S(a)}"></i>
                <span><strong>${n}</strong><code>${i(a)}</code></span>
              </button>`}).join("")}
        </div>
      </section>
      <section class="content-section">
        ${l("使用规则")}
        <div class="do-dont">
          <article><h3>应该</h3><ul><li>组件按用途读取颜色变量</li><li>文字只使用主要、次要和弱化三档</li><li>边界优先使用细边框</li></ul></article>
          <article><h3>不要</h3><ul><li>在组件里直接写十六进制颜色</li><li>用主题色显示普通正文</li><li>额外叠加透明度制造第四档文字</li></ul></article>
        </div>
      </section>
    </article>`}function de(){const e=[["页面大标题","48 / 56","700","每页最多一个"],["区块标题","28 / 36","650","用于分隔主要内容"],["正文","16 / 26","400","说明文字和长内容"],["辅助文字","13 / 18","500","状态、版本和补充信息"]];return`
    <article class="document">
      ${u("typography")}
      <section class="content-section">
        ${l("字体层级")}
        <div class="type-table">
          ${e.map(([t,s,n,c],a)=>`<div class="type-sample type-${a}">
            <span><strong>${t}</strong><code>${s} · ${n}</code></span>
            <p>${c}</p>
          </div>`).join("")}
        </div>
      </section>
      <section class="content-section">
        ${l("规则")}
        <ul class="prose-list"><li>优先使用系统字体，避免额外下载字体影响启动。</li><li>正文最小 16px，辅助文字最小 13px。</li><li>展示文字不能使用主题色。</li><li>一段内容中最多出现三个文字层级。</li></ul>
      </section>
    </article>`}function pe(){const e=Object.entries(r.primitives.spacing).filter(([,s])=>typeof s=="number").map(([s,n])=>({name:`间距 ${s}`,token:`spacing.${s}`,value:`${n}px`})),t=Object.entries(r.primitives.radii).map(([s,n])=>({name:`圆角 ${s}`,token:`radii.${s}`,value:`${n}px`}));return`
    <article class="document">
      ${u("spacing")}
      <section class="content-section">
        ${l("间距")}
        <div class="spacing-visual">${e.map(s=>`<div><code>${s.token}</code><i style="width:${s.value}"></i><span>${s.value}</span></div>`).join("")}</div>
        ${y(e)}
      </section>
      <section class="content-section">
        ${l("圆角")}
        <div class="radius-visual">${t.map(s=>`<div><i style="border-radius:${s.value}"></i><strong>${s.name.replace("圆角 ","")}</strong><code>${s.value}</code></div>`).join("")}</div>
        ${y(t)}
      </section>
    </article>`}function ue(){return`
    <article class="document">
      ${u("motion")}
      <section class="content-section">
        ${l("常用时长")}
        <div class="motion-demo">
          ${["进入","常规","退出"].map((e,t)=>`<button type="button"><i style="animation-delay:${t*180}ms"></i><strong>${e}</strong><span>${160+t*80} 毫秒</span></button>`).join("")}
        </div>
      </section>
      <section class="content-section">
        ${l("规则")}
        <ul class="prose-list"><li>点击反馈必须立即出现。</li><li>同一操作中的动画使用一致的缓动。</li><li>页面切换不使用长时间大幅移动。</li><li>用户选择减少动态效果后，保留状态变化，移除位移动画。</li></ul>
      </section>
    </article>`}const v=(e,t)=>{const s=Y.components[e];return`
  <article class="document">
    ${u(e)}
    <section class="content-section">
      ${l("什么时候使用")}
      <ul class="prose-list">${s.usage.map(n=>`<li>${i(n)}</li>`).join("")}</ul>
    </section>
    <section class="content-section">
      ${l("代码演示")}
      <div class="component-preview">
        <div class="component-stage">${t}</div>
        <div class="component-caption"><strong>基本用法</strong><p>展示常用状态。点击变量表中的一行可查看来源和当前值。</p></div>
      </div>
    </section>
    <section class="content-section">
      ${l("设计变量")}
      ${y(s.tokens,"contracts/components.json","这是结构化组件契约中的验收锚点。")}
    </section>
  </article>`};function be(){return v("buttons",`<div class="demo-stack">
      <div class="demo-group"><span>文字按钮</span><div class="button-line"><button class="primary">主要操作</button><button class="secondary">次要操作</button><button class="ghost">文字操作</button><button class="danger">删除</button><button class="primary" disabled>不可用</button></div></div>
      <div class="demo-group"><span>图标与工具按钮</span><div class="button-line"><button class="demo-icon-button" aria-label="收藏">☆</button><button class="demo-icon-button selected" aria-label="已收藏">★</button><button class="toolbar-button">↻ 重新载入</button><button class="demo-fab" aria-label="添加">＋</button></div></div>
    </div>`)}function ve(){return v("inputs",`<div class="field-demo">
      <label><span>默认</span><input placeholder="输入内容"></label>
      <label class="focused"><span>聚焦</span><input value="设计规范"></label>
      <label class="error"><span>输入有误</span><input value="错误内容"><small>请检查输入内容</small></label>
      <label><span>选项</span><select><option>跟随系统</option><option>浅色</option><option>深色</option></select></label>
      <label class="range-field"><span>播放进度</span><input type="range" value="42"></label>
      <label><span>不可编辑</span><input value="固定内容" disabled></label>
    </div>`)}function ge(){return v("selection",`<div class="demo-stack">
      <div class="demo-group"><span>选择条</span><div class="chip-strip"><button class="active">全部</button><button>最近使用</button><button>已收藏</button><button disabled>不可用</button></div></div>
      <div class="choice-demo">
        <button class="choice toggle" aria-pressed="true"><i class="switch on"><b></b></i><span><strong>自动同步</strong><small>修改后立即生效</small></span></button>
        <button class="choice toggle" aria-pressed="false"><i class="switch"><b></b></i><span><strong>减少动态</strong><small>降低界面移动</small></span></button>
        <button class="choice"><i class="check">✓</i><span><strong>包含说明文件</strong><small>可以选择多个项目</small></span></button>
        <button class="choice"><i class="radio-dot"></i><span><strong>稳定版本</strong><small>单选组中的当前项目</small></span></button>
      </div>
    </div>`)}function me(){return v("navigation",`<div class="nav-preview">
      <div class="demo-group"><span>页内标签</span><div class="tabs"><button class="active">总览</button><button>组件</button><button>记录</button></div></div>
      <div class="navigation-pair">
        <div class="demo-group"><span>桌面侧栏</span><div class="side-nav-demo"><button class="active">设置</button><button>外观</button><button>关于</button></div></div>
        <div class="demo-group"><span>移动底栏</span><div class="bottom-nav-demo"><button class="active"><b>⌂</b><span>首页</span></button><button><b>◇</b><span>内容</span></button><button><b>⚙</b><span>设置</span></button></div></div>
      </div>
    </div>`)}function he(){return v("list-rows",`<div class="list-row-demo">
      <button><i>文</i><span><strong>只有标题</strong></span><b>›</b></button>
      <button><i>自</i><span><strong>自动检查更新</strong><small>每天检查一次</small></span><em class="switch on"><b></b></em></button>
      <button class="selected"><i class="check">✓</i><span><strong>包含说明文件</strong><small>选中状态使用行内标记</small></span><b>已选择</b></button>
      <button disabled><i>锁</i><span><strong>不可使用的项目</strong><small>说明为什么暂时不可用</small></span></button>
      <button class="destructive"><i>删</i><span><strong>移除全部记录</strong></span></button>
    </div>`)}function ke(){return v("feedback",`<div class="feedback-demo">
      <div class="feedback-item"><span>轻提示</span><div class="snackbar">设置已保存 <button>撤销</button></div></div>
      <div class="feedback-item"><span>工具提示</span><div class="tooltip-sample"><button class="demo-icon-button">?</button><b>查看使用说明</b></div></div>
      <div class="feedback-item wide"><span>空态与加载</span><div class="empty-state"><i>◇</i><strong>还没有内容</strong><p>添加第一项后会显示在这里。</p><button class="secondary">添加内容</button></div><div class="loading-state"><i></i><span>正在载入</span></div></div>
      <div class="feedback-item wide"><span>进度</span><div class="linear-progress"><i style="width:62%"></i></div><small>已完成 62%</small></div>
      <div class="feedback-item wide"><span>滚动条</span><div class="scrollbar-sample"><i></i></div></div>
    </div>`)}function fe(){return v("dialogs",`<div class="demo-stack">
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
    </div>`)}function ye(){return v("menus",`<div class="menu-demo">
      <div class="demo-group"><span>锚定菜单</span><div class="anchored-menu">
        <header>排序方式</header>
        <button class="selected"><i>↕</i><span>最近修改</span><b>✓</b></button>
        <button><i>字</i><span>按名称</span></button>
        <hr>
        <button class="destructive"><i>删</i><span>清除记录</span></button>
      </div></div>
      <div class="demo-group"><span>移动端底部弹层</span><div class="sheet-frame"><div class="sheet"><i class="sheet-handle"></i><strong>选择操作</strong><button><span>添加到收藏</span><b>›</b></button><button><span>分享</span><b>›</b></button><button class="destructive"><span>删除</span></button></div></div></div>
    </div>`)}function E(e,t,s){return`
    <article class="document">
      ${u(e)}
      <section class="content-section">${l("结构示例")}<div class="pattern-preview">${t}</div></section>
      <section class="content-section">${l("规则")}<ul class="prose-list">${s.map(n=>`<li>${i(n)}</li>`).join("")}</ul></section>
    </article>`}function $e(){return E("app-shell",'<div class="shell"><aside><b>K</b><button class="active">总览</button><button>内容</button><button>收藏</button><button>设置</button></aside><main><header><strong>页面标题</strong><button class="primary">新建</button></header><section><article></article><article></article><article></article></section><div></div></main></div>',["桌面主窗口默认 1280×800，最小 1024×700。","侧栏只放主要目的地，不复用普通列表行尺寸。","内容区负责滚动，固定导航不跟随内容移动。"])}function Fe(){return E("overlays",'<div class="overlay-demo"><div class="backdrop"></div><article><h3>确认操作</h3><p>说明这项操作会发生什么。</p><footer><button class="secondary">取消</button><button class="primary">确认</button></footer></article></div>',["菜单宽度由内容决定，最小 160px，最大 280px。","需要用户完整注意力的任务才使用对话框。","关闭方式包括关闭按钮、取消操作和键盘 Escape。"])}function we(){return E("settings",'<div class="settings-demo"><section><h3>外观</h3><label><span><strong>界面外观</strong><small>跟随系统</small></span><button class="secondary">更改</button></label><label><span><strong>减少动态效果</strong><small>关闭</small></span><i class="switch"><b></b></i></label></section><section><h3>通用</h3><label><span><strong>自动检查更新</strong><small>开启</small></span><i class="switch on"><b></b></i></label></section></div>',["一页内容可以完成时，不增加标签页。","设置名称说明功能，副标题显示当前值或影响。","同一分组中的行保持相同高度和对齐方式。"])}function xe(){const e=r.accents.products[o.product],t=r.productTokens[o.product],s=Object.entries(t.tokens).map(([n,c])=>({name:c.description,token:n,value:typeof c.value=="number"?`${c.value}${c.type==="dimension"?"px":c.type==="duration"?"ms":""}`:c.value}));return`
    <article class="document">
      ${u("products")}
      <div class="page-toolbar">
        <label><span>产品</span><select id="product-inline">${Object.keys(r.accents.products).map(n=>f(n,r.accents.products[n].displayName,o.product)).join("")}</select></label>
        <label><span>主题色</span><select id="accent-inline">${e.presets.map(n=>f(n.id,n.name,o.accent)).join("")}</select></label>
      </div>
      <section class="content-section">
        ${l(e.displayName,`${w[o.product].character}。${w[o.product].content}`,"appearance")}
        <div class="accent-list">${e.presets.map(n=>`<button data-accent-pick="${n.id}" class="${n.id===o.accent?"active":""}"><i style="background:${n.accent}"></i><span><strong>${n.name}</strong><code>${n.accent}</code></span></button>`).join("")}</div>
      </section>
      <section class="content-section">
        ${l("专属规则","这些内容只影响当前产品，不进入基础、组件和页面结构。","differences")}
        <div class="rule-grid">${w[o.product].differences.map(n=>`<article><strong>${i(n.title)}</strong><p>${i(n.description)}</p><code>${i(n.reference)}</code></article>`).join("")}</div>
      </section>
      <section class="content-section">
        ${l("产品变量","只有当前产品使用的数值也参与生成、校验和同步。","product-tokens")}
        ${s.length?y(s,`products/${o.product}/tokens.json`,"这是当前产品专属的生成变量。"):V("没有额外变量","当前产品只有内容边界和行为差异，没有需要单独生成的数值。")}
      </section>
      <section class="content-section">
        ${l("边界")}
        <div class="decision-table">
          <div><strong>可以不同</strong><span>主题色、内容表现、产品专属页面</span></div>
          <div><strong>必须共用</strong><span>字体、间距、组件状态、无障碍要求</span></div>
          <div><strong>需要登记</strong><span>任何偏离通用规范的实现</span></div>
        </div>
      </section>
    </article>`}function Se(){return`
    <article class="document">
      ${u("delivery")}
      <section class="content-section">
        ${l("文件")}
        <div class="file-list">
          <div><code>dist/tokens/kai.tokens.json</code><span>全部通用变量</span><b>JSON</b></div>
          <div><code>dist/flutter/&lt;product&gt;/brand_tokens.g.dart</code><span>Flutter 变量</span><b>DART</b></div>
          <div><code>dist/css/&lt;product&gt;/brand.generated.css</code><span>Web 样式变量</span><b>CSS</b></div>
          <div><code>dist/spec/</code><span>规范文档快照</span><b>MD</b></div>
          <div><code>dist/viewer/</code><span>当前规范网站</span><b>WEB</b></div>
        </div>
      </section>
      <section class="content-section">
        ${l("常用命令")}
        <div class="command-list"><div><span>检查源文件</span><code>make validate</code></div><div><span>运行测试</span><code>make test</code></div><div><span>生成文件</span><code>make build</code></div><div><span>确认没有过期</span><code>make check</code></div></div>
      </section>
      <p class="digest">内容校验码：<code>${C.tokenDigest}</code></p>
    </article>`}function Pe(){const e=Object.keys(r.accents.products);return`
    <article class="document">
      ${u("qa")}
      <section class="content-section">
        ${l("必须通过")}
        <div class="check-list">${["生成文件与源文件一致","组件的正常、悬停、聚焦和禁用状态可用","浅色和深色外观都清楚易读","窗口缩小时没有内容溢出","减少动态效果后仍可正常操作"].map(t=>`<label><input type="checkbox" checked><span>${t}</span></label>`).join("")}</div>
      </section>
      <section class="content-section">
        ${l("检查范围")}
        <div class="qa-table">
          <div class="qa-row qa-head"><span>产品</span>${Object.entries(q).map(([t])=>`<span>${t}</span>`).join("")}</div>
          ${e.map(t=>`<div class="qa-row"><strong>${r.accents.products[t].displayName}</strong>${Object.entries(q).map(([s,n])=>`<button data-qa-product="${t}" data-qa-viewport="${s}"><i></i><span>${n}</span></button>`).join("")}</div>`).join("")}
        </div>
      </section>
    </article>`}function Ee(){switch(o.page){case"getting-started":return re();case"color":return le();case"typography":return de();case"spacing":return pe();case"motion":return ue();case"buttons":return be();case"inputs":return ve();case"selection":return ge();case"navigation":return me();case"list-rows":return he();case"feedback":return ke();case"dialogs":return fe();case"menus":return ye();case"app-shell":return $e();case"overlays":return Fe();case"settings":return we();case"products":return xe();case"delivery":return Se();case"qa":return Pe();default:return ce()}}const D={overview:[["设计原则","principles"],["规范内容","contents"],["使用方式","workflow"]],"getting-started":[["修改设计","edit"],["怎么判断放在哪里","placement"]],color:[["基础色板","base-palette"],["当前外观","appearance"],["使用规则","rules"]],typography:[["字体层级","type-scale"],["规则","rules"]],spacing:[["间距","spacing"],["圆角","radius"]],motion:[["常用时长","duration"],["规则","rules"]],buttons:[["什么时候使用","when-to-use"],["代码演示","examples"],["设计变量","design-tokens"]],inputs:[["什么时候使用","when-to-use"],["代码演示","examples"],["设计变量","design-tokens"]],selection:[["什么时候使用","when-to-use"],["代码演示","examples"],["设计变量","design-tokens"]],navigation:[["什么时候使用","when-to-use"],["代码演示","examples"],["设计变量","design-tokens"]],"list-rows":[["什么时候使用","when-to-use"],["代码演示","examples"],["设计变量","design-tokens"]],feedback:[["什么时候使用","when-to-use"],["代码演示","examples"],["设计变量","design-tokens"]],dialogs:[["什么时候使用","when-to-use"],["代码演示","examples"],["设计变量","design-tokens"]],menus:[["什么时候使用","when-to-use"],["代码演示","examples"],["设计变量","design-tokens"]],"app-shell":[["结构示例","examples"],["规则","rules"]],overlays:[["结构示例","examples"],["规则","rules"]],settings:[["结构示例","examples"],["规则","rules"]],products:[["当前产品","appearance"],["专属规则","differences"],["产品变量","product-tokens"],["边界","boundaries"]],delivery:[["文件","files"],["常用命令","commands"]],qa:[["必须通过","requirements"],["检查范围","coverage"]]};function je(){return`<aside class="page-toc" aria-label="本页内容">
    <strong>本页内容</strong>
    ${(D[o.page]??D.overview??[]).map(([t,s])=>`<a href="#${s}" data-section-link="${s}">${i(t)}</a>`).join("")}
  </aside>`}function qe(){const e=o.inspectorTarget;return`
    <aside class="inspector ${o.inspectorOpen?"open":""}">
      <header><span><small>变量详情</small><strong>查看具体数值</strong></span><button id="inspector-close" type="button">×</button></header>
      ${e?`<main>
            <div class="token-preview" style="--token-value:${S(e.value)}"><i></i></div>
            <dl>
              <div><dt>用途</dt><dd>${i(e.role)}</dd></div>
              <div><dt>变量名</dt><dd><code>${i(e.token)}</code></dd></div>
              <div><dt>当前值</dt><dd><code>${i(e.value)}</code></dd></div>
              <div><dt>来自</dt><dd>${i(e.source)}</dd></div>
              <div><dt>说明</dt><dd>${i(e.note)}</dd></div>
            </dl>
          </main>`:'<div class="inspector-empty"><strong>先选一个变量</strong><p>点击颜色、间距、圆角或变量表格中的一行。</p></div>'}
    </aside>`}function b(e){o={...o,...e},ee(o),j()}function Ae(){d.querySelectorAll("[data-page]").forEach(e=>{e.addEventListener("click",()=>{const t=e.dataset.page;history.replaceState(null,"",`#${t}`),b({page:t}),window.scrollTo({top:0})})}),d.querySelector("#skin")?.addEventListener("change",e=>{b({skin:e.target.value})}),d.querySelector("#motion")?.addEventListener("click",()=>b({reducedMotion:!o.reducedMotion})),d.querySelector("#inspector-close")?.addEventListener("click",()=>b({inspectorOpen:!1})),d.querySelectorAll("[data-token]").forEach(e=>{e.addEventListener("click",()=>b({inspectorOpen:!0,inspectorTarget:{token:e.dataset.token??"",role:e.dataset.role??"",value:e.dataset.value??"",source:e.dataset.source??"",note:e.dataset.note??""}}))}),d.querySelector("#product-inline")?.addEventListener("change",e=>{const t=e.target.value;b({product:t,accent:r.accents.products[t].default})}),d.querySelector("#accent-inline")?.addEventListener("change",e=>b({accent:e.target.value})),d.querySelectorAll("[data-accent-pick]").forEach(e=>e.addEventListener("click",()=>b({accent:e.dataset.accentPick??o.accent}))),d.querySelectorAll("[data-qa-product]").forEach(e=>e.addEventListener("click",()=>{const t=e.dataset.qaProduct;b({product:t,viewport:e.dataset.qaViewport,accent:r.accents.products[t].default})})),d.querySelectorAll("[data-section-link]").forEach(e=>{e.addEventListener("click",t=>{t.preventDefault(),d.querySelector(`#${e.dataset.sectionLink}`)?.scrollIntoView({behavior:o.reducedMotion?"auto":"smooth"})})}),d.querySelectorAll(".toggle").forEach(e=>e.addEventListener("click",()=>{const t=e.getAttribute("aria-pressed")!=="true";e.setAttribute("aria-pressed",String(t)),e.querySelector(".switch")?.classList.toggle("on",t)})),d.querySelector("#nav-search")?.addEventListener("input",e=>{const t=e.target.value.trim().toLowerCase();d.querySelectorAll("[data-nav-label]").forEach(s=>{s.hidden=!!t&&!(s.dataset.navLabel??"").toLowerCase().includes(t)})})}function j(){const e=r.accents.products[o.product];e.presets.some(t=>t.id===o.accent)||(o.accent=e.default),se(o.skin,o.product,o.accent,o.reducedMotion),d.innerHTML=`<div class="workbench ${o.inspectorOpen?"with-inspector":""}">${oe()}<div class="workspace">${ie()}<main class="content"><div class="doc-layout">${Ee()}${je()}</div></main></div>${qe()}</div>`,Ae()}const B=location.hash.slice(1);k.some(e=>e.id===B)&&(o.page=B);k.some(e=>e.id===o.page)||(o.page="overview");ne();matchMedia("(prefers-color-scheme: dark)").addEventListener("change",()=>o.skin==="system"&&j());j();

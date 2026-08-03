(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const d of a.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&n(d)}).observe(document,{childList:!0,subtree:!0});function i(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(o){if(o.ep)return;o.ep=!0;const a=i(o);fetch(o.href,a)}})();const ne={products:{kaigua:{default:"indigo",displayName:"开刮",note:"单值模型：hover/pressed 由通用 stateLayer 前景叠加表达，不设独立 accent hover 色",presets:[{accent:"#5A66B8",id:"indigo",name:"靛蓝",onAccent:"#FFFFFF"},{accent:"#3F9E98",id:"teal",name:"青绿",onAccent:"#1C1C22"},{accent:"#0177B5",id:"sky",name:"晴空",onAccent:"#FFFFFF"},{accent:"#475569",id:"slate",name:"岩灰",onAccent:"#FFFFFF"}]},kaijuan:{default:"ember",displayName:"开卷",note:"单值模型：hover/pressed 由通用 stateLayer 前景叠加表达，不设独立 accent hover 色",presets:[{accent:"#EA580C",id:"ember",name:"暖橙",onAccent:"#1C1C22"},{accent:"#0177B5",id:"sky",name:"晴空",onAccent:"#FFFFFF"},{accent:"#047857",id:"forest",name:"松绿",onAccent:"#FFFFFF"},{accent:"#BE123C",id:"rose",name:"绯红",onAccent:"#FFFFFF"},{accent:"#475569",id:"slate",name:"岩灰",onAccent:"#FFFFFF"}]},kaiting:{customDerive:"自定义色：hover = lerp(accent, white, 0.14)，pressed = lerp(accent, black, 0.13)；onAccent 取 white 与 #1C1C22/#141418 中对比度 ≥ 4.5 的一侧，两侧均不达标则调 accent 明度",default:"coral",displayName:"开听",presets:[{accent:"#FF5A4D",hover:"#FF7567",id:"coral",name:"珊瑚",onAccent:"#1C1C22",pressed:"#E3483E"},{accent:"#D95770",hover:"#E66C82",id:"rose",name:"玫瑰",onAccent:"#141418",pressed:"#BF465D"},{accent:"#5A66B8",hover:"#717BC2",id:"indigo",name:"靛蓝",onAccent:"#FFFFFF",pressed:"#4E59A0"},{accent:"#3F9E98",hover:"#51ADA7",id:"teal",name:"青绿",onAccent:"#1C1C22",pressed:"#338781"},{accent:"#C7842F",hover:"#D4953F",id:"amber",name:"暖金",onAccent:"#1C1C22",pressed:"#AB6E24"},{accent:"#8067BC",hover:"#9279C8",id:"violet",name:"紫罗兰",onAccent:"#FFFFFF",pressed:"#6D54A5"}]}}},ae=JSON.parse('{"components":{"app-bars":{"accessibility":["页面只保留一个一级标题。","标签使用 tablist/tab/tabpanel 语义或平台等价能力。","工具栏键盘顺序与视觉顺序一致。"],"name":"顶栏与标签","states":[{"description":"标题和操作按优先级排列。","name":"默认","required":true},{"description":"工具按钮出现轻状态层。","name":"悬停","required":true},{"description":"每个工具和标签都有独立焦点。","name":"键盘聚焦","required":true},{"description":"标签使用文字与指示器共同表达。","name":"当前","required":true},{"description":"页面头切换为批量操作栏。","name":"多选","required":false},{"description":"不可用操作保留位置并说明原因。","name":"禁用","required":true}],"summary":"组织页面标题、页面级操作、筛选工具和页内平级导航。","tokens":[{"layer":"semantic","mapping":"app-bars.title","name":"页面标题","role":"pageTitle","token":"componentProfiles.*.typeScale.pageTitle","value":"按 Mobile / Desktop 映射"},{"name":"工具高度","token":"componentProfiles.*.metrics.controlHeight","value":"按 Mobile / Desktop 映射"},{"name":"常规图标","token":"iconography.sizes.regular","value":"20"}],"usage":["标题只说明当前页面，不放无用统计和成熟度信息。","主要操作最多一个，低频操作进入更多菜单。","空间不足时先收起低频操作，再允许工具栏换行。"],"variants":[{"description":"页面标题、说明和主要操作。","name":"页面头"},{"description":"搜索、筛选、排序和视图切换。","name":"工具栏"},{"description":"切换同一页面内平级内容。","name":"标签"},{"description":"桌面端显示文件夹或层级路径。","name":"面包屑"}]},"buttons":{"accessibility":["纯图标按钮必须提供可访问名称和工具提示。","按钮文字使用动作动词，不使用含糊的“确定”。","键盘操作和指针操作必须触发同一结果。"],"name":"按钮","states":[{"description":"显示完整标签和当前层级。","name":"默认","required":true},{"description":"背景加深，不能改变尺寸。","name":"悬停","required":true},{"description":"背景进一步加深，反馈立即出现。","name":"按下","required":true},{"description":"使用当前平台的焦点视觉，品牌提供强调色。","name":"键盘聚焦","required":true},{"description":"保留按钮宽度并阻止重复提交。","name":"加载","required":true},{"description":"降低对比度且不可触发。","name":"禁用","required":true}],"summary":"触发明确操作；Mobile 与 Desktop 各有一套按钮视觉，平台层只适配输入和系统行为。","tokens":[{"name":"品牌圆角倾向","token":"radii.control","value":"10px"},{"name":"按钮高度","token":"componentProfiles.*.metrics.controlHeight","value":"Mobile 48 · Desktop 36"},{"name":"状态动效","token":"motion.uiStandard","value":"160ms"}],"usage":["按产品形态使用 Kai Mobile 或 Kai Desktop Button。","危险操作必须使用明确动词，并提供确认或撤销。","不要用按钮代替导航链接。"],"variants":[{"description":"当前区域最重要且最希望用户完成的操作。","name":"主要按钮"},{"description":"与主要操作并列，但优先级更低。","name":"次要按钮"},{"description":"轻量操作或不会中断当前任务的入口。","name":"文字按钮"},{"description":"删除或不可逆操作，必须使用明确动词。","name":"危险按钮"},{"description":"空间有限且图标含义足够明确的工具操作。","name":"图标按钮"}]},"data-display":{"accessibility":["状态标签必须有文字，不能只靠颜色表达。","信息图片提供替代文字，装饰图片使用空替代文字。","表格提供表头和可读取的排序状态。"],"name":"数据展示","states":[{"description":"标题、说明和辅助信息层级清楚。","name":"默认","required":true},{"description":"保留结构，避免内容出现时整体跳动。","name":"加载","required":true},{"description":"说明当前没有数据。","name":"空","required":true},{"description":"说明失败原因，并提供恢复方式。","name":"错误","required":true}],"summary":"使用卡片、标签、头像、缩略图和表格展示结构化信息。","tokens":[{"name":"卡片圆角","token":"radii.card","value":"14px"},{"layer":"semantic","mapping":"data-display.value","name":"标题字号","role":"body","token":"componentProfiles.*.typeScale.body","value":"按 Mobile / Desktop 映射"},{"name":"轻背景","token":"derivedAlphas.subtleFill","value":"foreground 4.5%"}],"usage":["只有信息可以独立理解或需要整体操作时才使用卡片。","一列简单内容优先使用列表行，多列比较才使用表格。","缩略图是辅助信息，不能替代文字标题。"],"variants":[{"description":"展示可以独立理解的一组信息。","name":"信息卡片"},{"description":"表达简短分类、属性或当前状态。","name":"标签与状态"},{"description":"帮助识别人或对象。","name":"头像与缩略图"},{"description":"比较多条记录的相同字段。","name":"表格"}]},"dialogs":{"accessibility":["打开后焦点移入，关闭后焦点回到触发位置。","标题与对话框建立程序关联，背景内容不可操作。","支持 Escape 关闭；破坏性流程仍需明确取消入口。"],"name":"对话框","states":[{"description":"标题、内容和操作区完整显示。","name":"默认","required":true},{"description":"打开后焦点进入首个合理控件。","name":"键盘聚焦","required":true},{"description":"保留尺寸并阻止重复提交。","name":"提交中","required":true},{"description":"错误靠近对应字段显示。","name":"输入有误","required":true},{"description":"提交条件未满足时禁用主要操作。","name":"禁用","required":true}],"summary":"承载必须暂时中断当前流程的确认、输入或短任务；模态容器和按钮行为按平台选择。","tokens":[{"name":"品牌圆角倾向","token":"radii.dialog","value":"20px"},{"name":"桌面内容上限","token":"component.dialog.desktopMaxWidth","value":"520px · 移动端使用平台容器"},{"name":"遮罩","token":"component.dialog.barrier","value":"black 38% / 62%"},{"name":"按钮间距","token":"component.dialog.actionGap","value":"10px"},{"name":"容器材质","token":"skins.*.glass.strongSurface / strongBlur / border / innerHighlight / shadow","value":"strong glass"}],"usage":["先按平台选择 Sheet、Dialog、ContentDialog、Popover 或独立窗口。","简单选择优先使用菜单，不要把对话框当作普通信息卡片。","内容过高时只滚动内容区，标题和按钮区保持可见。","Dialog 容器使用 strongSurface + strongBlur + border + innerHighlight + shadow。"],"variants":[{"description":"确认有明显影响或不可逆的操作。","name":"确认对话框"},{"description":"完成一个字段或少量字段的短任务。","name":"输入对话框"},{"description":"完成仍可在一个视口内理解的小型表单。","name":"表单对话框"}]},"feedback":{"accessibility":["动态结果使用合适的状态播报，不抢走当前焦点。","加载状态提供文字说明，不能只有旋转图形。","错误信息不能只靠颜色表达。"],"name":"反馈","states":[{"description":"中性说明，不要求立即处理。","name":"提示","required":true},{"description":"任务正在进行，避免重复触发。","name":"加载","required":true},{"description":"确认操作已完成。","name":"成功","required":true},{"description":"提醒潜在影响，操作仍可继续。","name":"警告","required":true},{"description":"任务失败，提供恢复办法。","name":"错误","required":true}],"summary":"覆盖加载、进度、空内容、部分完成、错误和后台任务；展示范围与容器按平台选择。","tokens":[{"layer":"semantic","mapping":"feedback.message","name":"标题字号","role":"bodySecondary","token":"componentProfiles.*.typeScale.body","value":"按 Mobile / Desktop 映射"},{"name":"状态颜色","token":"statusColors","value":"success / warning / error / info"},{"name":"进度强调","token":"component.feedback.progressAccent","value":"当前产品 accent"},{"name":"短反馈材质","token":"skins.*.glass.surface / blur / border / shadow","value":"base glass；不直接使用 overlay"}],"usage":["短结果反馈使用当前平台对应组件，不把所有平台统一成 Snackbar。","空态说明为什么没有内容，并在有明确下一步时提供操作。","加载和进度使用统一尺寸与强调色，不单独硬编码。","SnackBar、Toast、Tooltip 等应用自有短反馈使用 surface + blur + border + shadow；Inline Status 继承所在内容表面。"],"variants":[{"description":"使用当前平台对应的短反馈，可在适用时提供撤销。","name":"短结果反馈"},{"description":"解释图标或不熟悉的短标签。","name":"工具提示"},{"description":"解释为什么没有内容，并给出下一步。","name":"空状态"},{"description":"表示等待或可计算的完成程度。","name":"加载与进度"},{"description":"说明失败原因和恢复方式。","name":"错误状态"}]},"icons":{"accessibility":["纯装饰图标不进入可访问树。","纯图标操作必须由按钮提供可访问名称。","状态不能只靠图标颜色表达。"],"name":"图标","states":[{"description":"使用当前语义前景色。","name":"默认","required":true},{"description":"反馈由承载按钮提供，不单独缩放图标。","name":"悬停","required":true},{"description":"焦点显示在承载按钮上。","name":"键盘聚焦","required":true},{"description":"可使用实心图形并配合文字或指示器。","name":"选中","required":true},{"description":"随承载控件降低对比度。","name":"禁用","required":true}],"summary":"使用平台系统图标和统一尺寸表达对象、状态与操作；命中区域由按钮提供。","tokens":[{"name":"紧凑尺寸","token":"iconography.sizes.compact","value":"16"},{"name":"常规尺寸","token":"iconography.sizes.regular","value":"20"},{"name":"大尺寸","token":"iconography.sizes.large","value":"24"},{"name":"展示尺寸","token":"iconography.sizes.display","value":"32"}],"usage":["优先使用当前平台系统图标，不为已有隐喻重复造图。","同一产品保持 rounded/outlined 风格一致。","图标视觉尺寸与点击目标分离。"],"variants":[{"description":"表格、工具栏和行尾状态。","name":"紧凑图标"},{"description":"按钮、输入框和列表行。","name":"常规图标"},{"description":"移动主要操作和少量展示。","name":"大图标"},{"description":"使用 fill/outline 表达当前项，但保持同一隐喻。","name":"双态图标"}]},"inputs":{"accessibility":["每个输入框都有持续可见的标签，不能只依赖占位文字。","错误信息与输入框建立程序关联，并说明如何修正。","输入目的明确时提供正确的自动填充语义。"],"name":"输入框","states":[{"description":"显示标签、输入面和当前值。","name":"默认","required":true},{"description":"边框对比度轻微提高。","name":"悬停","required":true},{"description":"保留平台焦点能力，输入容器可同步使用强调色。","name":"键盘聚焦","required":true},{"description":"错误边框和修正说明同时出现。","name":"输入有误","required":true},{"description":"内容可选择复制，但不可修改。","name":"只读","required":true},{"description":"不可聚焦，并说明不可用原因。","name":"禁用","required":true}],"summary":"收集或修改文本、选项和连续数值；保留平台编辑、选择、输入法和焦点能力。","tokens":[{"name":"输入框圆角","token":"radii.control","value":"10px"},{"layer":"semantic","mapping":"inputs.text","name":"输入文字","role":"inputText","token":"componentProfiles.*.typeScale.inputText","value":"Mobile 16/22 · Desktop 14/20"},{"name":"品牌焦点色","token":"component.input.brandFocus","value":"accent · 保留平台焦点行为"}],"usage":["优先使用当前平台的 TextField、SearchField、TextBox 或 Entry。","错误提示放在输入框附近，并说明如何修正。","不可编辑和只读状态需要清楚区分。"],"variants":[{"description":"输入短文本或单个值。","name":"文本输入"},{"description":"筛选当前内容，支持清除。","name":"搜索输入"},{"description":"输入较长内容，允许垂直扩展。","name":"多行输入"},{"description":"从有限选项中选择一项。","name":"下拉选择"},{"description":"调整允许近似选择的连续数值。","name":"滑杆"}]},"list-rows":{"accessibility":["整行可点击时使用按钮或链接语义，不能只绑定容器点击。","尾部控件有独立操作时，避免与整行操作冲突。","标题截断后仍能通过可访问名称读取完整内容。"],"name":"列表行","states":[{"description":"标题和辅助信息层级清楚。","name":"默认","required":true},{"description":"整行出现轻背景。","name":"悬停","required":true},{"description":"焦点覆盖整行可点击区域。","name":"键盘聚焦","required":true},{"description":"使用勾选或明确文字表达。","name":"选中","required":true},{"description":"不可触发且说明原因。","name":"禁用","required":true}],"summary":"承载设置项、操作项和带辅助信息的结构化列表。","tokens":[{"name":"单行高度","token":"componentProfiles.*.metrics.listRowSingle","value":"Mobile 52 · Desktop 40"},{"name":"双行高度","token":"componentProfiles.*.metrics.listRowDouble","value":"Mobile 68 · Desktop 52"},{"name":"控件圆角","token":"radii.control","value":"10px"},{"layer":"semantic","mapping":"list-rows.title","name":"标题字号","role":"listTitle","token":"componentProfiles.*.typeScale.listTitle","value":"Mobile/Desktop 14/20 · w500"}],"usage":["设置项、弹层操作项和带副标题的结构化列表使用列表行。","整行点击时必须提供完整的键盘焦点和按钮语义。","选中态使用勾选或文字表达，不使用大面积强调色填充。"],"variants":[{"description":"标题、可选图标和尾部信息。","name":"基础行"},{"description":"标题下增加一行简短说明。","name":"说明行"},{"description":"整行切换选择，并显示当前结果。","name":"选择行"},{"description":"执行删除等高风险操作。","name":"危险行"}]},"menus":{"accessibility":["打开后焦点进入菜单，关闭后回到触发位置。","支持方向键、Enter 和 Escape。","危险项目不能只使用红色区分。"],"name":"菜单与底部弹层","states":[{"description":"菜单项显示图标、标签和可选说明。","name":"默认","required":true},{"description":"当前指向项出现轻背景。","name":"悬停","required":true},{"description":"方向键移动焦点并保持在菜单内。","name":"键盘聚焦","required":true},{"description":"使用勾选和文字共同表达。","name":"选中","required":true},{"description":"保留项目位置但不可触发。","name":"禁用","required":true}],"summary":"承载与触发位置相关的短操作、选择或辅助内容；Menu、Popover、Flyout 和 Sheet 按平台与任务选择。","tokens":[{"name":"菜单圆角","token":"radii.menu","value":"12px"},{"name":"菜单最小宽度","token":"componentMetrics.menu.minWidth","value":"160"},{"name":"菜单最大宽度","token":"componentMetrics.menu.maxWidth","value":"280"},{"name":"菜单行高","token":"componentProfiles.*.metrics.controlHeight","value":"按 Mobile / Desktop 映射"},{"name":"移动 Sheet 顶角","token":"radii.sheet","value":"18px"},{"name":"平台行为","token":"component.menu.platformBehavior","value":"keyboard / focus / anchor / safe area"},{"name":"容器材质","token":"skins.*.glass.strongSurface / strongBlur / border / innerHighlight / shadow","value":"strong glass"}],"usage":["与触发位置相关的短操作列表使用锚定菜单。","根据平台、输入模式和任务选择容器，不只根据窗口宽度判断。","菜单宽度由内容决定，长列表需要限制高度并允许滚动。","Menu、Popover、Flyout 和 Sheet 容器使用 strongSurface + strongBlur + border + innerHighlight + shadow。"],"variants":[{"description":"Menu、Context Menu 或 MenuFlyout，保留平台键盘和命令习惯。","name":"平台菜单"},{"description":"Popover、Flyout 或 TeachingTip。","name":"辅助浮层"},{"description":"只在移动端需要较大操作空间的短任务中使用。","name":"移动 Sheet"},{"description":"显示当前选择，并允许切换。","name":"选择菜单"}]},"navigation":{"accessibility":["当前页面使用 current page 语义。","图标导航必须同时提供短标签。","键盘顺序与视觉顺序一致。"],"name":"导航","states":[{"description":"未选项目保持足够可读。","name":"默认","required":true},{"description":"出现轻背景，不移动内容。","name":"悬停","required":true},{"description":"完整导航项显示焦点。","name":"键盘聚焦","required":true},{"description":"文字和图形共同指示当前位置。","name":"当前","required":true},{"description":"仅在目的地确实不可进入时使用。","name":"禁用","required":true}],"summary":"切换主要目的地；目的地语义统一，Tab Bar、Navigation Bar、Rail、Sidebar 和 NavigationView 按平台映射。","tokens":[{"name":"侧栏宽度","token":"layoutMetrics.sidebarWidth","value":"216 / 236px"},{"layer":"semantic","mapping":"navigation.desktopLabel","name":"桌面导航文字","role":"body","token":"componentProfiles.desktop.typeScale.body","value":"14/20"},{"layer":"semantic","mapping":"navigation.mobileLabel","name":"移动导航文字","role":"captionSmall","token":"componentProfiles.mobile.typeScale.captionSmall","value":"11/16"},{"name":"当前项强调","token":"component.navigation.selection","value":"accent · 指示器形态按平台"},{"name":"侧栏材质","token":"component.navigation.chrome","value":"GlassSurface strong"}],"usage":["当前项必须清楚可见，同一组中只有一个当前项。","目的地和路由一致，具体控件形态由当前平台决定。","不要把普通操作混进主导航。"],"variants":[{"description":"iPhone Tab Bar；iPad 根据空间选择 Tab Bar 或 Sidebar。","name":"Apple 导航"},{"description":"紧凑窗口 Navigation Bar；大屏转换为 Rail 或 Drawer。","name":"Android 导航"},{"description":"macOS Sidebar、Windows NavigationView 或 Linux Sidebar/View Switcher。","name":"桌面导航"},{"description":"同一页面内平级内容的切换。","name":"页内标签"}]},"selection":{"accessibility":["控件与标签组成同一个可点击区域。","选中状态不能只靠颜色表达。","一组单选项使用共同的组名称。"],"name":"选择控件","states":[{"description":"未选择，标签仍保持清楚。","name":"默认","required":true},{"description":"触控区域出现轻微反馈。","name":"悬停","required":true},{"description":"整个可操作区域显示焦点。","name":"键盘聚焦","required":true},{"description":"图形、文字或勾选同时表达结果。","name":"选中","required":true},{"description":"仅用于勾选框的部分选择状态。","name":"混合","required":false},{"description":"保留当前值但不可修改。","name":"禁用","required":true}],"summary":"在有限选项间切换，覆盖开关、勾选框、单选项和选择条。","tokens":[{"name":"选中背景","token":"derivedAlphas.selection","value":"accent 10%"},{"name":"勾选框圆角","token":"radii.checkbox","value":"5px"},{"name":"状态动效","token":"motion.uiStandard","value":"160ms"}],"usage":["开关变化后立即生效，不需要再放保存按钮。","不能只靠颜色表达是否选中。","一组单选项只能有一个选中状态。"],"variants":[{"description":"控制立即生效的开与关。","name":"开关"},{"description":"从一组项目中选择零个或多个。","name":"勾选框"},{"description":"从一组互斥选项中选择一个。","name":"单选项"},{"description":"在少量并列选项中快速切换。","name":"选择条"}]},"surfaces":{"accessibility":["纯布局容器不添加按钮或分组语义。","可点击容器必须使用按钮或链接语义，不能只监听容器点击。"],"name":"表面与容器","states":[{"description":"使用当前外观的表面、边框和阴影。","name":"默认","required":true},{"description":"容器可点击时才增加轻状态层。","name":"悬停","required":true},{"description":"可操作容器显示明确焦点。","name":"键盘聚焦","required":true},{"description":"容器本身不禁用，禁用由内部控件表达。","name":"禁用","required":false}],"summary":"承载页面分区、卡片、菜单和对话框，并根据外观切换玻璃、边框和阴影。","tokens":[{"name":"卡片圆角","token":"radii.card","value":"14px"},{"name":"菜单圆角","token":"radii.menu","value":"12px"},{"name":"对话框圆角","token":"radii.dialog","value":"20px"},{"name":"普通玻璃","token":"skins.*.glass.surface + skins.*.glass.blur","value":"base：surface + blur"},{"name":"强玻璃","token":"skins.*.glass.strongSurface + skins.*.glass.strongBlur","value":"strong：strongSurface + strongBlur"},{"name":"玻璃配套","token":"skins.*.glass.border / innerHighlight / shadow","value":"strong 额外使用 innerHighlight；阴影乘 shadowScale"}],"usage":["普通页面分区使用基础表面；短反馈使用 base glass；固定导航和强浮层使用 strong glass。","不要为了分组给每一块内容都增加卡片、阴影或模糊。","玻璃效果关闭时仍保留边框和层级，不能依赖模糊表达结构。","不直接使用 elevated、overlay 或任意灰色填充替代 GlassSurface。"],"variants":[{"description":"页面内的普通内容分区。","name":"基础表面"},{"description":"SnackBar、Toast、Tooltip 等短反馈使用 base glass。","name":"轻玻璃表面"},{"description":"侧栏、底栏以及 Dialog、Sheet、Menu、Popover 等固定或强浮层。","name":"强玻璃表面"},{"description":"重复列表行、普通卡片和设置分组不使用 BackdropFilter。","name":"非浮面容器"}]}},"contractVersion":"0.4.0"}'),oe=JSON.parse('{"$schema":"../schema/primitives.schema.json","appearance":{"increasedContrast":{"borderDark":"white@0.20","borderLight":"black@0.16","comment":"系统 prefers-contrast: more 时叠在当前皮肤上；不单独成皮肤。","glassSurfaceMinOpacity":1,"hairlineDark":"white@0.16","hairlineLight":"black@0.12","preferPrimaryForSecondaryText":true}},"basePalette":{"comment":"通用浅色基准：右侧主内容冷白、左侧导航浅灰、参考主色为珊瑚红。产品强调色由 accents 产品轴覆盖，皮肤切换不得改变强调色。","mainBackground":"#F7F9FC","primary":"#FF5A4D","sideBackground":"#F3F5F8"},"breakpoints":{"menuAdaptive":680,"mobileShell":"非桌面平台且（width < 820 或 height < 600）","settingsMaxContentWidth":920,"windowClass":{"compact":"width <= 600 或 height < 600（移动）","medium":"桌面 width < 1100；移动 width < 1000","wide":"桌面 width >= 1100；移动 width >= 1000"}},"componentMetrics":{"dialog":{"confirmMaxWidth":400,"maxWidth":520,"viewportInset":24},"menu":{"maxWidth":280,"minWidth":160},"sheet":{"handleHeight":4,"handleWidth":38,"maxWidth":760,"optionMaxWidth":560},"table":{"headerMinHeight":40,"minColumnWidth":120}},"componentProfiles":{"desktop":{"fontFamily":"系统 UI 字体","inputMode":"pointer / keyboard","label":"Desktop","metrics":{"compactControlHeight":32,"controlGap":8,"controlHeight":36,"iconTextGap":8,"listRowDouble":52,"listRowSingle":40,"minimumInteractiveTarget":32,"pageGutter":24,"sectionGap":24},"platforms":["macOS","Windows","Linux"],"reference":{"name":"Kai Desktop UI · constrained by macOS, Fluent and GNOME HIG","url":"https://github.com/robeshell/kai-brand-design"},"scaling":"跟随系统显示与字体缩放","typeScale":{"body":{"fontSize":14,"fontWeight":400,"letterSpacing":0,"lineHeight":20},"bodySecondary":{"fontSize":12,"fontWeight":400,"letterSpacing":0,"lineHeight":18},"caption":{"fontSize":12,"fontWeight":400,"letterSpacing":0,"lineHeight":16},"captionSmall":{"fontSize":12,"fontWeight":500,"letterSpacing":0,"lineHeight":16},"displayLarge":{"fontSize":32,"fontWeight":600,"letterSpacing":-0.2,"lineHeight":40},"gridTitle":{"fontSize":14,"fontWeight":500,"letterSpacing":0,"lineHeight":20},"inputText":{"fontSize":14,"fontWeight":400,"letterSpacing":0,"lineHeight":20},"label":{"fontSize":14,"fontWeight":600,"letterSpacing":0,"lineHeight":20},"listTitle":{"fontSize":14,"fontWeight":500,"letterSpacing":0,"lineHeight":20},"pageTitle":{"fontSize":24,"fontWeight":600,"letterSpacing":-0.2,"lineHeight":32},"sectionTitle":{"fontSize":18,"fontWeight":600,"letterSpacing":-0.1,"lineHeight":24},"title":{"fontSize":14,"fontWeight":600,"letterSpacing":0,"lineHeight":20}},"unit":"logical px"},"mobile":{"fontFamily":"系统 UI 字体","inputMode":"touch","label":"Mobile","metrics":{"compactControlHeight":40,"controlGap":12,"controlHeight":48,"iconTextGap":8,"listRowDouble":68,"listRowSingle":52,"minimumInteractiveTarget":48,"pageGutter":16,"sectionGap":24},"platforms":["iOS","iPadOS","Android"],"reference":{"name":"Kai Mobile UI · constrained by Apple HIG and Material 3","url":"https://github.com/robeshell/kai-brand-design"},"scaling":"跟随系统字体缩放","typeScale":{"body":{"fontSize":17,"fontWeight":400,"letterSpacing":0,"lineHeight":24},"bodySecondary":{"fontSize":15,"fontWeight":400,"letterSpacing":0,"lineHeight":22},"caption":{"fontSize":13,"fontWeight":400,"letterSpacing":0,"lineHeight":18},"captionSmall":{"fontSize":12,"fontWeight":500,"letterSpacing":0,"lineHeight":16},"displayLarge":{"fontSize":34,"fontWeight":600,"letterSpacing":-0.2,"lineHeight":42},"gridTitle":{"fontSize":15,"fontWeight":500,"letterSpacing":0,"lineHeight":22},"inputText":{"fontSize":16,"fontWeight":400,"letterSpacing":0,"lineHeight":22},"label":{"fontSize":16,"fontWeight":600,"letterSpacing":0,"lineHeight":22},"listTitle":{"fontSize":15,"fontWeight":500,"letterSpacing":0,"lineHeight":22},"pageTitle":{"fontSize":28,"fontWeight":600,"letterSpacing":-0.2,"lineHeight":36},"sectionTitle":{"fontSize":22,"fontWeight":600,"letterSpacing":-0.15,"lineHeight":28},"title":{"fontSize":17,"fontWeight":600,"letterSpacing":0,"lineHeight":24}},"unit":"logical px"}},"derivedAlphas":{"barrier":{"dialogDark":"black@0.62","dialogLight":"black@0.38"},"border":{"dark":"white@0.10","light":"black@0.08"},"comment":"全品牌通用的派生透明度；实现方不得另行发明数值。每个 key 为单值（或 light/dark 各一值），禁止区间。","destructive":{"disabled":"error@0.025","hoverOrFocus":"error@0.12","pressed":"error@0.16","rest":"error@0.08"},"disabledBorder":{"dark":"white@0.05","light":"black@0.04"},"disabledForeground":{"comment":"禁用前景：secondary 色 × alpha。WCAG 对 inactive 控件有对比度例外；仍保持可辨认，禁止再低于 0.55。","dark":"secondary@0.55","light":"secondary@0.55"},"disabledSubtle":{"dark":"white@0.028","light":"black@0.024"},"hairline":{"dark":"white@0.065","light":"black@0.055"},"selection":{"accentIndicator":"accent@0.12","chipSelected":"accent@0.09","listTileSelected":"accent@0.04","rowOrSurface":"foreground@0.055"},"stateLayer":{"focused":"accent@0.16","hover":"foreground@0.06","pressed":"foreground@0.10"},"subtleFill":{"dark":"white@0.055","light":"black@0.045"}},"focusRing":{"colorRole":"accent","comment":"键盘焦点环：宽度与偏移为逻辑 px；颜色优先 accent，不足对比时回退 primaryText。输入框可用自身 2px accent 边框代替外侧 outline，但不得 outline:none 且无替代。","fallbackColorRole":"primaryText","offset":2,"width":2},"iconography":{"opticalStroke":{"compact":1.75,"large":1.5,"regular":1.75},"policy":"优先使用各平台系统图标；同一产品内保持 rounded/outlined 视觉一致，不混用实心与描边表达同一状态。","sizes":{"compact":16,"display":32,"large":24,"regular":20}},"layoutMetrics":{"contentBottomPadding":{"desktop":96,"mobileShell":140},"contentWidth":{"form":720,"reading":680,"standard":920,"wide":1200},"desktopWindow":{"comment":"主窗口逻辑像素（content size）；首次打开居中；可视区不足时钳到 min 与 visibleFrame−80 之间。辅窗（工具窗）属产品层。","defaultHeight":800,"defaultWidth":1280,"minHeight":700,"minWidth":1024},"pageGutter":{"compact":16,"medium":24,"wide":32},"sidebarWidth":{"medium":216,"wide":236},"splitView":{"detailMax":520,"detailMin":360,"detailPreferred":420},"titlebarInset":{"macOS":38,"windows":44}},"motion":{"ambient":{"comment":"环境动效（氛围背景等），reduced-motion 时按 motionStrength 衰减","durationS":14},"paletteTransition":{"comment":"皮肤/配色切换；深夜皮肤 520","durationMs":420},"uiFast":{"curve":"easeOut","durationMs":140},"uiStandard":{"curve":"easeOutCubic","durationMs":160}},"platformProfiles":{"androidMobile":{"fontFamily":"Roboto / Noto Sans（系统解析）","inputMode":"touch","label":"Android","metrics":{"compactControlHeight":40,"controlGap":8,"controlHeight":48,"iconTextGap":12,"listRowDouble":72,"listRowSingle":56,"minimumInteractiveTarget":48,"pageGutter":16,"sectionGap":24},"platforms":["Android"],"reference":{"name":"Material Design 3","url":"https://developer.android.com/develop/ui/compose/designsystems/material3"},"scaling":"系统字体缩放","typeScale":{"body":{"fontSize":16,"fontWeight":400,"letterSpacing":0.5,"lineHeight":24},"bodySecondary":{"fontSize":14,"fontWeight":400,"letterSpacing":0.25,"lineHeight":20},"caption":{"fontSize":12,"fontWeight":400,"letterSpacing":0.4,"lineHeight":16},"captionSmall":{"fontSize":11,"fontWeight":500,"letterSpacing":0.5,"lineHeight":16},"displayLarge":{"fontSize":32,"fontWeight":400,"letterSpacing":0,"lineHeight":40},"label":{"fontSize":14,"fontWeight":500,"letterSpacing":0.1,"lineHeight":20},"pageTitle":{"fontSize":28,"fontWeight":600,"letterSpacing":0,"lineHeight":36},"sectionTitle":{"fontSize":22,"fontWeight":600,"letterSpacing":0,"lineHeight":28},"title":{"fontSize":16,"fontWeight":500,"letterSpacing":0.15,"lineHeight":24}},"unit":"sp / dp"},"appleMobile":{"fontFamily":"SF Pro / PingFang SC（系统解析）","inputMode":"touch","label":"iOS / iPadOS","metrics":{"compactControlHeight":36,"controlGap":12,"controlHeight":44,"iconTextGap":8,"listRowDouble":60,"listRowSingle":44,"minimumInteractiveTarget":44,"pageGutter":16,"sectionGap":24},"platforms":["iOS","iPadOS"],"reference":{"name":"Apple Human Interface Guidelines","url":"https://developer.apple.com/design/human-interface-guidelines/typography"},"scaling":"Dynamic Type","typeScale":{"body":{"fontSize":17,"fontWeight":400,"letterSpacing":0,"lineHeight":22},"bodySecondary":{"fontSize":15,"fontWeight":400,"letterSpacing":0,"lineHeight":20},"caption":{"fontSize":13,"fontWeight":400,"letterSpacing":0,"lineHeight":18},"captionSmall":{"fontSize":11,"fontWeight":500,"letterSpacing":0,"lineHeight":13},"displayLarge":{"fontSize":34,"fontWeight":400,"letterSpacing":0,"lineHeight":41},"label":{"fontSize":17,"fontWeight":500,"letterSpacing":0,"lineHeight":22},"pageTitle":{"fontSize":28,"fontWeight":600,"letterSpacing":0,"lineHeight":34},"sectionTitle":{"fontSize":22,"fontWeight":600,"letterSpacing":0,"lineHeight":28},"title":{"fontSize":17,"fontWeight":600,"letterSpacing":0,"lineHeight":22}},"unit":"pt"},"linuxDesktop":{"fontFamily":"系统 UI 字体（GNOME / KDE 环境解析）","inputMode":"pointer / touch","label":"Linux Desktop","metrics":{"compactControlHeight":28,"controlGap":8,"controlHeight":36,"iconTextGap":8,"listRowDouble":52,"listRowSingle":40,"minimumInteractiveTarget":32,"pageGutter":24,"sectionGap":24},"platforms":["Linux"],"reference":{"name":"GNOME HIG + KDE HIG","url":"https://developer.gnome.org/hig/guidelines/typography.html"},"scaling":"桌面环境字体与显示缩放","typeScale":{"body":{"fontSize":14,"fontWeight":400,"letterSpacing":0,"lineHeight":20},"bodySecondary":{"fontSize":12,"fontWeight":400,"letterSpacing":0,"lineHeight":18},"caption":{"fontSize":12,"fontWeight":400,"letterSpacing":0,"lineHeight":16},"captionSmall":{"fontSize":11,"fontWeight":500,"letterSpacing":0,"lineHeight":16},"displayLarge":{"fontSize":32,"fontWeight":600,"letterSpacing":0,"lineHeight":40},"label":{"fontSize":14,"fontWeight":500,"letterSpacing":0,"lineHeight":20},"pageTitle":{"fontSize":24,"fontWeight":600,"letterSpacing":0,"lineHeight":32},"sectionTitle":{"fontSize":18,"fontWeight":600,"letterSpacing":0,"lineHeight":24},"title":{"fontSize":14,"fontWeight":600,"letterSpacing":0,"lineHeight":20}},"unit":"logical px"},"macDesktop":{"fontFamily":"SF Pro / PingFang SC（系统解析）","inputMode":"pointer","label":"macOS","metrics":{"compactControlHeight":24,"controlGap":8,"controlHeight":32,"iconTextGap":6,"listRowDouble":44,"listRowSingle":32,"minimumInteractiveTarget":28,"pageGutter":24,"sectionGap":24},"platforms":["macOS"],"reference":{"name":"Apple Human Interface Guidelines · macOS","url":"https://developer.apple.com/design/human-interface-guidelines/typography"},"scaling":"系统显示缩放","typeScale":{"body":{"fontSize":13,"fontWeight":400,"letterSpacing":0,"lineHeight":16},"bodySecondary":{"fontSize":11,"fontWeight":400,"letterSpacing":0,"lineHeight":14},"caption":{"fontSize":10,"fontWeight":400,"letterSpacing":0,"lineHeight":13},"captionSmall":{"fontSize":10,"fontWeight":500,"letterSpacing":0,"lineHeight":13},"displayLarge":{"fontSize":26,"fontWeight":400,"letterSpacing":0,"lineHeight":32},"label":{"fontSize":13,"fontWeight":500,"letterSpacing":0,"lineHeight":16},"pageTitle":{"fontSize":22,"fontWeight":600,"letterSpacing":0,"lineHeight":26},"sectionTitle":{"fontSize":17,"fontWeight":600,"letterSpacing":0,"lineHeight":22},"title":{"fontSize":13,"fontWeight":600,"letterSpacing":0,"lineHeight":16}},"unit":"pt"},"windowsDesktop":{"fontFamily":"Segoe UI Variable / Microsoft YaHei UI（系统解析）","inputMode":"pointer / touch","label":"Windows","metrics":{"compactControlHeight":28,"controlGap":8,"controlHeight":32,"iconTextGap":8,"listRowDouble":52,"listRowSingle":40,"minimumInteractiveTarget":32,"pageGutter":24,"sectionGap":24},"platforms":["Windows"],"reference":{"name":"Windows 11 Typography","url":"https://learn.microsoft.com/windows/apps/design/signature-experiences/typography"},"scaling":"有效像素与系统显示缩放","typeScale":{"body":{"fontSize":14,"fontWeight":400,"letterSpacing":0,"lineHeight":20},"bodySecondary":{"fontSize":12,"fontWeight":400,"letterSpacing":0,"lineHeight":16},"caption":{"fontSize":12,"fontWeight":400,"letterSpacing":0,"lineHeight":16},"captionSmall":{"fontSize":12,"fontWeight":400,"letterSpacing":0,"lineHeight":16},"displayLarge":{"fontSize":40,"fontWeight":600,"letterSpacing":0,"lineHeight":52},"label":{"fontSize":14,"fontWeight":600,"letterSpacing":0,"lineHeight":20},"pageTitle":{"fontSize":28,"fontWeight":600,"letterSpacing":0,"lineHeight":36},"sectionTitle":{"fontSize":20,"fontWeight":600,"letterSpacing":0,"lineHeight":28},"title":{"fontSize":14,"fontWeight":600,"letterSpacing":0,"lineHeight":20}},"unit":"epx"}},"radii":{"card":14,"checkbox":5,"control":10,"dialog":20,"menu":12,"pill":999,"sheet":18,"tooltip":8},"spacing":{"comment":"4 的倍数刻度；组件内部微调可用半档（2/6/10），页面级只用下列值","x1":4,"x2":8,"x3":12,"x4":16,"x6":24,"x8":32},"specVersion":"0.8.0","statusColors":{"comment":"语义状态色（固体色，不是 alpha）。浅色/深色各一档；用作文字时须对常见表面 ≥ 4.5:1。","error":{"dark":"#FF7B72","light":"#B42318"},"info":{"dark":"#73A7E8","light":"#2563A6"},"success":{"dark":"#5BC89A","light":"#237A57"},"warning":{"dark":"#E3AC45","light":"#9A640D"}},"typography":{"componentMappings":{"app-bars":{"navigationLabel":{"role":"captionSmall"},"title":{"role":"pageTitle"}},"buttons":{"label":{"role":"label"}},"data-display":{"metadata":{"role":"caption"},"title":{"role":"title"},"value":{"role":"body"}},"dialogs":{"action":{"role":"label"},"body":{"role":"body"},"title":{"role":"sectionTitle"}},"feedback":{"message":{"role":"bodySecondary"},"status":{"role":"caption"}},"icons":{"label":{"role":"captionSmall"}},"inputs":{"helperText":{"role":"bodySecondary"},"label":{"role":"label"},"text":{"role":"inputText"}},"list-rows":{"metadata":{"role":"caption"},"subtitle":{"role":"bodySecondary"},"title":{"role":"listTitle"}},"menus":{"itemLabel":{"role":"label"},"itemMetadata":{"role":"caption"}},"navigation":{"desktopLabel":{"role":"body"},"mobileLabel":{"role":"captionSmall"}},"selection":{"label":{"role":"label"},"value":{"role":"body"}},"surfaces":{"sectionTitle":{"role":"sectionTitle"}}},"componentRoles":{"buttonLabel":"label","desktopNavigation":"body","dialogTitle":"sectionTitle","gridTitle":"gridTitle","inputText":"inputText","listSubtitle":"bodySecondary","listTitle":"listTitle","metadata":"caption","mobileNavigation":"captionSmall","pageTitle":"pageTitle","sectionTitle":"sectionTitle"},"fontPolicy":{"allowProductContentFonts":true,"fallback":[],"family":"system-ui","usePlatformTextStyles":true},"semanticRoles":{"body":{"allowedWeights":[400],"description":"正文和普通内容标题","intent":"body"},"bodySecondary":{"allowedWeights":[400],"description":"列表副题和说明文字","intent":"supporting"},"caption":{"allowedWeights":[400],"description":"时间、状态和普通元信息","intent":"metadata"},"captionSmall":{"allowedWeights":[500],"description":"空间受限的短标签","intent":"compact-label"},"displayLarge":{"allowedWeights":[600],"description":"沉浸页面中的单个展示标题","intent":"display"},"gridTitle":{"allowedWeights":[500,600],"baseRole":"listTitle","description":"封面网格和紧凑卡片中的标题","intent":"component-title","rationale":"封面网格标题受卡片高度约束，使用组件标题角色而不是页面正文角色"},"inputText":{"allowedWeights":[400,500],"baseRole":"body","description":"输入框、搜索框和文本编辑控件中的文字","intent":"component-control-content","rationale":"输入控件需要独立于正文的紧凑尺寸，避免页面正文角色直接决定控件布局"},"label":{"allowedWeights":[500,600],"description":"按钮、选择控件和表单标签","intent":"control"},"listTitle":{"allowedWeights":[500],"baseRole":"body","description":"列表行标题的紧凑组件角色","intent":"component-title","rationale":"列表行需要比正文更紧凑，同时保持统一的行标题层级"},"pageTitle":{"allowedWeights":[600],"description":"页面主标题","intent":"heading"},"sectionTitle":{"allowedWeights":[600],"description":"页面分区、对话框和 Sheet 标题","intent":"heading"},"title":{"allowedWeights":[600],"description":"组件标题或强调行标题","intent":"heading"}},"weights":{"body":400,"comment":"界面层使用 regular / medium / semibold；内容层字体由产品登记。","emphasis":500,"strong":600}}}'),se={kaigua:{product:"kaigua",productSpecVersion:"0.2.0",tokens:{}},kaijuan:{product:"kaijuan",productSpecVersion:"0.2.0",tokens:{"cover.radius":{description:"书籍与漫画窄幅封面的默认圆角",type:"dimension",value:12},"typography.emptyState.message":{description:"空态消息；基于 caption",type:"dimension",value:12},"typography.emptyState.title":{description:"空态标题；基于 title",type:"dimension",value:16},"typography.launch.lockupSubtitle":{description:"启动页品牌锁定副标题；品牌展示内容",type:"dimension",value:14},"typography.launch.lockupTitle":{description:"启动页品牌锁定标题；品牌展示内容",type:"dimension",value:24},"typography.menu.itemLabelCompact":{description:"菜单紧凑项标签",type:"dimension",value:14},"typography.menu.itemLabelWide":{description:"菜单宽布局项标签；原 13.5 整数化",type:"dimension",value:14},"typography.menu.titleCompact":{description:"菜单紧凑标题；原 12.5 整数化",type:"dimension",value:12},"typography.menu.titleWide":{description:"菜单宽布局标题",type:"dimension",value:12},"typography.navigation.mobileLabel":{description:"移动底部导航标签；基于 captionSmall",type:"dimension",value:10},"typography.reader.annotationTitle":{description:"批注标题；基于 sectionTitle",type:"dimension",value:20},"typography.reader.bookTitle":{description:"阅读器书名；内容层展示层级",type:"dimension",value:16},"typography.reader.bookmarkTitle":{description:"书签标题；基于 sectionTitle",type:"dimension",value:20},"typography.reader.chapterTitle":{description:"阅读器章节标题；内容层展示层级",type:"dimension",value:18},"typography.reader.excerptBody":{description:"摘录正文；基于 bodySecondary",type:"dimension",value:15},"typography.reader.excerptQuote":{description:"摘录大引用；内容层装饰展示",type:"dimension",value:48},"typography.reader.excerptTitle":{description:"摘录标题；基于 title",type:"dimension",value:16},"typography.reader.overlaySubtitle":{description:"阅读器 chrome 副标题；基于 captionSmall",type:"dimension",value:11},"typography.reader.overlayTitle":{description:"阅读器 chrome 标题；基于 bodySecondary",type:"dimension",value:15},"typography.reader.searchResult":{description:"阅读器搜索结果；基于 bodySecondary",type:"dimension",value:15},"typography.reader.sectionLabel":{description:"阅读器分区标签；基于 caption",type:"dimension",value:13},"typography.reader.selectionMenu":{description:"阅读器选区菜单文字；基于 captionSmall",type:"dimension",value:10},"typography.reader.thumbnailLabel":{description:"漫画缩略图标签；基于 title",type:"dimension",value:16},"typography.reader.toolLabel":{description:"阅读器工具标签；基于 captionSmall",type:"dimension",value:11},"typography.reader.toolValue":{description:"阅读器工具值；基于 caption",type:"dimension",value:13},"typography.reader.waitingCover":{description:"阅读器等待封面标题；基于 pageTitle",type:"dimension",value:28},"typography.settings.sheetTitle":{description:"设置弹层标题；基于 sectionTitle",type:"dimension",value:20},"typography.shelf.sectionTitle":{description:"书架分区标题；基于 sectionTitle",type:"dimension",value:18},"typography.shell.brandTitle":{description:"开卷桌面壳品牌标题；基于 title",type:"dimension",value:17}}},kaiting:{product:"kaiting",productSpecVersion:"0.2.1",tokens:{"playback.busySpinnerSize":{description:"传输按钮忙碌指示器尺寸",type:"dimension",value:24},"playback.busySpinnerStroke":{description:"传输按钮忙碌指示器线宽",type:"dimension",value:2},"source.local":{description:"本机文件夹来源标识色",type:"color",value:"#55B889"},"source.webDav":{description:"WebDAV 远程来源标识色",type:"color",value:"#5E8BFF"},"typography.albumArtwork.artistOverlay":{description:"封面内容层艺人叠加文字；基于 captionSmall，受封面构图和对比度约束",type:"dimension",value:9},"typography.albumArtwork.titleOverlay":{description:"封面内容层标题叠加文字；基于 title，受封面构图约束",type:"dimension",value:18},"typography.launch.failureMessage":{description:"启动失败说明；产品错误页恢复提示",type:"dimension",value:12},"typography.launch.failureTitle":{description:"启动失败标题；产品错误页展示标题",type:"dimension",value:20},"typography.launch.lockupSubtitle":{description:"启动页品牌锁定副标题；品牌展示内容",type:"dimension",value:14},"typography.launch.lockupTitle":{description:"启动页品牌锁定标题；品牌展示内容",type:"dimension",value:24},"typography.library.albumCardMetadata":{description:"资料库专辑卡艺人元信息；基于 caption",type:"dimension",value:12},"typography.library.albumSection":{description:"资料库专辑分区标题；基于 listTitle 的紧凑分区标签",type:"dimension",value:14},"typography.library.albumSectionWide":{description:"资料库宽布局专辑分区标题；基于 listTitle 的宽布局分区层级",type:"dimension",value:15},"typography.library.collectionEyebrow":{description:"资料库合集 hero eyebrow；内容展示层辅助标签",type:"dimension",value:11},"typography.library.collectionStats":{description:"资料库合集 hero 统计；基于 caption 的展示信息",type:"dimension",value:14},"typography.library.fastIndexOverlay":{description:"资料库快速索引拖动反馈气泡；基于 caption，提供短暂的可读放大反馈",type:"dimension",value:15},"typography.library.modeLabel":{description:"资料库模式切换标签；基于 label",type:"dimension",value:14},"typography.library.playAllLabel":{description:"资料库紧凑播放全部标签；受按钮宽度约束",type:"dimension",value:11},"typography.library.songHeader":{description:"资料库歌曲结果标题；基于 sectionTitle 的紧凑产品展示",type:"dimension",value:20},"typography.library.toolbarResult":{description:"资料库工具栏结果数；基于 caption",type:"dimension",value:12},"typography.library.trackMetadata":{description:"资料库合集曲目元信息；基于 captionSmall",type:"dimension",value:12},"typography.lyrics.controlLabel":{description:"歌词垂直控制列标签；基于 captionSmall，受 52px 控制列宽度约束",type:"dimension",value:10},"typography.lyrics.line.active":{description:"歌词当前行；展示层级，窄布局（<340px）下降一档",type:"dimension",value:22},"typography.lyrics.line.activeNarrow":{description:"歌词当前行窄布局；减少换行甩字",type:"dimension",value:20},"typography.lyrics.line.inactive":{description:"歌词非当前行；展示层级，窄布局（<340px）下降一档",type:"dimension",value:20},"typography.lyrics.line.inactiveNarrow":{description:"歌词非当前行窄布局；减少换行甩字",type:"dimension",value:18},"typography.lyrics.offsetValue":{description:"歌词偏移数值；基于 captionSmall，保持 −.5 / 0 / +.5 在窄列内可读",type:"dimension",value:10},"typography.miniPlayer.metadata.condensed":{description:"迷你播放器 condensed 元信息；基于 captionSmall，受紧凑行高约束",type:"dimension",value:11},"typography.miniPlayer.metadata.docked":{description:"迷你播放器 docked 元信息；基于 captionSmall，保持艺人和专辑单行可读",type:"dimension",value:12},"typography.miniPlayer.title.condensed":{description:"迷你播放器 condensed 标题；基于 listTitle，受紧凑行宽约束",type:"dimension",value:13},"typography.miniPlayer.title.docked":{description:"迷你播放器 docked 标题；基于 listTitle，单行显示并适配常驻 dock 高度",type:"dimension",value:15},"typography.navigation.mobileLabel":{description:"移动底部导航标签；基于 captionSmall，受底栏高度和多目的地并列宽度约束",type:"dimension",value:10},"typography.nowPlaying.artist":{description:"正在播放艺人信息；基于 bodySecondary",type:"dimension",value:13},"typography.nowPlaying.controlLabel":{description:"正在播放歌词控制按钮；基于 captionSmall",type:"dimension",value:11},"typography.nowPlaying.panelLabel":{description:"正在播放面板标题；基于 caption",type:"dimension",value:12},"typography.nowPlaying.time":{description:"正在播放时间；基于 captionSmall，使用等宽数字",type:"dimension",value:11},"typography.nowPlaying.title.compact":{description:"正在播放紧凑标题；内容层展示层级",type:"dimension",value:22},"typography.nowPlaying.title.wide":{description:"正在播放宽布局标题；内容层展示层级",type:"dimension",value:24},"typography.playbackQueue.metadata":{description:"播放队列元信息；基于 caption",type:"dimension",value:12},"typography.playbackQueue.title.compact":{description:"播放队列紧凑标题；基于 listTitle",type:"dimension",value:16},"typography.playbackQueue.title.wide":{description:"播放队列宽布局标题；与设置弹层标题同档的紧凑弹层标题",type:"dimension",value:20},"typography.settings.accentPreview":{description:"设置自定义强调色预览加号；颜色样本内部文字",type:"dimension",value:15},"typography.settings.sheetTitle":{description:"设置选择弹层标题；基于 sectionTitle 的紧凑弹层标题",type:"dimension",value:20},"typography.settings.storageTotal":{description:"设置离线存储总量展示数字；产品信息展示层",type:"dimension",value:24},"typography.shell.brandTitle":{description:"开听桌面壳品牌标题；基于 title 的品牌锁定文字",type:"dimension",value:17}}}},re={presets:[{brightness:"light",canvas:"#F7F9FC",description:"品牌的中性浅色玻璃界面",effects:{darkVeilOpacity:.12,lightVeilOpacity:.04,motionDurationS:14,motionStrength:1,paletteTransitionMs:420,primaryGlowOpacity:.9,secondaryGlowOpacity:.72,shadowScale:1},elevated:"#FFFFFF",glass:{blur:20,border:"black@0.07",canvasHighlight:"#FBFBFC",chromeSurface:"#FFFFFF@0.88",innerHighlight:"white@0.55",mutedText:"#64616A",primaryText:"#1C1C22",secondaryText:"#5A5A62",shadow:"black@0.09",strongBlur:28,strongSurface:"#FFFFFF@0.90",surface:"#FFFFFF@0.85"},id:"default",name:"默认",overlay:"#F1F2F4",surface:"#FAFAFB"},{brightness:"light",canvas:"#F1F4F8",description:"冷静通透的实色表面与清晰层次",effects:{darkVeilOpacity:.08,lightVeilOpacity:.015,motionDurationS:26,motionStrength:.22,paletteTransitionMs:240,primaryGlowOpacity:.38,secondaryGlowOpacity:.24,shadowScale:0},elevated:"#FFFFFF",glass:{blur:0,border:"#526174@0.12",canvasHighlight:"#F8FBFF",chromeSurface:"#FFFFFF@1.0",innerHighlight:"#FFFFFF@1.0",mutedText:"#5A6473",primaryText:"#18202A",secondaryText:"#536171",shadow:"transparent",strongBlur:0,strongSurface:"#FFFFFF@1.0",surface:"#FFFFFF@1.0"},id:"pure",name:"纯净",note:"实色皮肤：blur=0 时组件必须跳过 BackdropFilter，shadowScale=0 时无投影。组件读 token 则此行为免费获得。",overlay:"#E5EBF2",surface:"#FAFCFF"},{brightness:"dark",canvas:"#0D0D0F",description:"专注于内容的低亮深色界面",effects:{darkVeilOpacity:.22,lightVeilOpacity:.04,motionDurationS:18,motionStrength:.68,paletteTransitionMs:520,primaryGlowOpacity:.76,secondaryGlowOpacity:.54,shadowScale:1.12},elevated:"#202024",glass:{blur:20,border:"white@0.11",canvasHighlight:"#17171A",chromeSurface:"#202024@0.90",innerHighlight:"white@0.12",mutedText:"white@0.55",primaryText:"#F7F3F4",secondaryText:"white@0.72",shadow:"black@0.42",strongBlur:28,strongSurface:"#202024@0.92",surface:"#17171A@0.85"},id:"deep-night",name:"深夜",overlay:"#29292E",surface:"#17171A"}]},le={pages:{"app-bars":["组件","顶栏与标签","组织页面标题、工具操作、筛选和页内平级导航。"],"app-shell":["APP 结构","应用框架","顶级导航按平台映射，内容和产品能力保持一致。"],buttons:["组件","按钮","覆盖文字按钮、图标按钮、工具按钮和悬浮按钮。一个区域通常只有一个主要操作。"],color:["基础规范","颜色","浅色界面以冷白为主内容背景、浅灰为侧栏背景。珊瑚红是通用强调色，产品需要不同颜色时在产品差异中说明。"],components:["组件","组件基础","查看 Mobile、Desktop 两套组件、基础表面和完整组件入口。平台系统差异只处理行为。"],"content-browser":["APP 结构","内容浏览","集合、搜索、筛选和详情属于一个连续结构，不再拆成多套万能页面。"],"data-display":["组件","数据展示","覆盖卡片、标签、头像、缩略图和表格。展示信息时先保证层级和可读性。"],delivery:["产品与工程","生成文件","设计源文件经过检查后，生成各端可以直接使用的代码和规范快照。"],dialogs:["组件","对话框","对话框用于确认、输入、表单和需要用户完整注意力的任务。"],feedback:["组件","反馈","覆盖轻提示、工具提示、空态、加载和进度。反馈应该说明当前发生了什么。"],icons:["组件","图标","图标负责表达含义，按钮负责命中区域；优先使用各平台系统图标。"],inputs:["组件","输入框","覆盖文本输入、下拉选择和滑杆。控件需要清楚显示焦点、错误和不可编辑状态。"],"list-rows":["组件","列表行","列表行用于设置项、操作项和结构化列表。整行可点击时，状态覆盖整行。"],menus:["组件","菜单与底部弹层","同一组操作在宽屏使用锚定菜单，在窄屏改为底部弹层。"],motion:["基础规范","动效","动效只用于说明界面发生了什么，不用于装饰。"],navigation:["组件","导航","导航用于切换主要目的地。桌面使用侧栏，移动端使用底栏或标签。"],overview:["开始","Kai Design","从这里查看规范内容、修改源文件、运行检查并同步到产品工程。"],platforms:["基础规范","平台基准","五个平台官方数据用于约束和验收；实际组件由 Mobile 与 Desktop 两套 Profile 驱动。"],products:["产品与工程","产品差异","这里只记录不能放进通用规范的主题色、内容样式和特殊页面。"],qa:["产品与工程","检查清单","发布前按外观、产品和窗口大小逐项检查。"],selection:["组件","选择控件","覆盖开关、勾选框、单选项和选择条。选中状态不能只靠颜色表达。"],spacing:["基础规范","间距与圆角","页面间距使用 4px 倍数。圆角按组件用途选择，不按个人感觉调整。"],"status-system":["状态与反馈","通用状态系统","统一加载、进度、空数据、无结果、部分完成、失败和后台任务的表达。"],"task-workspace":["APP 结构","任务工作台","承载扫描、导入、同步和批量处理的准备、执行与结果。"],typography:["基础规范","字体","组件只选择语义文字角色，字号、行高和字重由 Mobile 或 Desktop Profile 提供。"]}},ce={accents:ne,componentContracts:ae,primitives:oe,productTokens:se,skins:re,viewerContent:le},de="b2fd457b866c415b5f723cdd422f16ef8e82d91a42117b5768c67f34caae24de",pe={tokenDigest:de},l=ce,ue=l.viewerContent,Q=l.componentContracts,me=pe,A={kaiting:{character:"沉浸、节奏、封面主角",content:"专辑封面、黑胶与歌词属于内容层。",prefix:"Sound*",differences:[{title:"封面氛围",description:"详情页可以从封面提取背景和控件色，不改变通用界面的颜色规则。",reference:"divergences D1"},{title:"黑胶造型",description:"盘面、唱臂和旋转属于内容表现，不使用通用组件的圆角与形状规则。",reference:"divergences D3"},{title:"歌词层级",description:"正在播放页允许使用更大的歌词字号，但普通界面文字仍遵守通用层级。",reference:"divergences D4"}],patterns:[{title:"资料库与搜索",description:"分类、来源筛选、分组结果和状态恢复。",reference:"patterns/library-and-search.md"},{title:"专辑与艺人详情",description:"封面 Hero、曲目列表、主要操作和氛围边界。",reference:"patterns/album-detail.md"},{title:"正在播放",description:"双栏/单栏、黑胶、歌词、队列和迷你播放器。",reference:"patterns/now-playing.md"}]},kaijuan:{character:"安静、克制、书房感",content:"书页、漫画与窄幅封面属于内容层。",prefix:"App*",differences:[{title:"封面圆角",description:"书籍和漫画封面使用 12px 圆角；普通界面卡片继续使用通用圆角。",reference:"cover.radius · 12px"},{title:"阅读主题",description:"阅读器工具栏跟随当前书页主题取色，退出阅读器后恢复通用界面主题。",reference:"divergences D1"},{title:"内容渲染",description:"书内样式、高亮色和漫画像素属于内容，不反向影响书库、设置和弹窗。",reference:"divergences D2"}],patterns:[{title:"书架与书库",description:"继续阅读、封面网格、筛选与管理态。",reference:"patterns/bookshelf.md"},{title:"书单、合集与导入",description:"整理容器、导入预览、重复项和搜索。",reference:"patterns/collections-and-import.md"},{title:"阅读器",description:"双引擎 chrome、目录、进度、搜索和内容边界。",reference:"patterns/reader.md"}]},kaigua:{character:"清晰、可靠、媒体工作台",content:"海报、剧照与刮削结果属于内容层。",prefix:"Kg*",differences:[{title:"媒体图片",description:"海报和剧照是内容素材，其比例、裁切和颜色不成为通用组件规则。",reference:"content boundary"},{title:"元数据内容",description:"刮削结果和说明文件由产品定义；规范只约束承载它们的界面组件。",reference:"product scope"},{title:"设置结构",description:"设置页继续使用通用的单页分组结构，不保留旧版多标签布局。",reference:"divergences D1"}],patterns:[{title:"媒体资料库",description:"目录、类型筛选、海报/列表和主从详情。",reference:"patterns/media-library.md"},{title:"详情与手动匹配",description:"元数据、候选搜索、确认和危险操作。",reference:"patterns/media-detail-and-match.md"},{title:"批量任务与重命名",description:"预览、冲突、部分失败、清理和日志。",reference:"patterns/batch-tasks-and-renamer.md"}]}},I={fluid:"100%",mobile:"390px",tablet:"820px",medium:"1024px",wide:"1280px"},Z={appleMobile:{navigation:"iPhone 使用 Tab Bar；iPad 根据空间使用 Tab Bar 或 Sidebar。",bars:"Navigation Bar 与 Toolbar 承载标题、返回和页面操作。",controls:"使用 Apple 控件结构，保留 44pt 命中目标、动态字体和系统编辑行为。",presentation:"短任务使用 Sheet；沉浸任务可使用 Full-screen Cover。",interaction:"保留滑动返回、安全区域、系统滚动和 VoiceOver 语义。",source:"Apple HIG · SwiftUI / UIKit"},androidMobile:{navigation:"紧凑窗口使用 Navigation Bar；大屏转换为 Navigation Rail 或 Drawer。",bars:"Top App Bar 承载标题、返回和页面级操作。",controls:"使用 Material 3 组件结构，保留 48dp 命中目标和状态层反馈。",presentation:"按任务使用 Dialog、Bottom Sheet 或独立页面。",interaction:"保留系统返回、Edge-to-edge Insets、触控反馈和 TalkBack 语义。",source:"Android Design · Material 3"},macDesktop:{navigation:"使用 Sidebar + Toolbar；页内少量并列内容使用 Segmented Control 或 Tabs。",bars:"窗口 Toolbar 与 Titlebar 共同承载全局和页面操作。",controls:"使用桌面紧凑控件，不放大成手机尺寸。",presentation:"与当前文档相关的短任务使用 Sheet，独立任务使用窗口或 Dialog。",interaction:"完整支持菜单栏、右键、Hover、键盘焦点和快捷键。",source:"macOS HIG · SwiftUI / AppKit"},windowsDesktop:{navigation:"使用 NavigationView，在展开、紧凑和顶部模式之间自适应。",bars:"TitleBar 与 CommandBar 承载导航和命令。",controls:"使用 WinUI 控件结构、焦点视觉和高对比度能力。",presentation:"使用 ContentDialog、Flyout 或独立窗口。",interaction:"完整支持键盘、右键、Hover、系统缩放和窗口贴靠。",source:"Fluent · WinUI 3"},linuxDesktop:{navigation:"以 Sidebar / View Switcher 为默认，跟随目标桌面环境调整。",bars:"Header Bar 或 Toolbar 承载窗口和页面操作。",controls:"以 GNOME/GTK 桌面密度为基准，同时兼容 KDE 主题与快捷键。",presentation:"使用 Dialog、Popover 或独立窗口，避免照搬手机 Bottom Sheet。",interaction:"支持键盘、右键、Hover、系统主题和 Freedesktop 图标语义。",source:"GNOME HIG · GTK/libadwaita；KDE HIG 兼容"}},Y=[{label:"开始",items:[{id:"overview",label:"总览"}]},{label:"基础规范",items:[{id:"color",label:"颜色"},{id:"platforms",label:"平台基准"},{id:"typography",label:"字体"},{id:"spacing",label:"间距与圆角"},{id:"motion",label:"动效"}]},{label:"组件",items:[{id:"components",label:"组件基础"},{id:"buttons",label:"按钮"},{id:"inputs",label:"输入框"},{id:"selection",label:"选择控件"},{id:"navigation",label:"导航"},{id:"list-rows",label:"列表行"},{id:"feedback",label:"反馈"},{id:"dialogs",label:"对话框"},{id:"menus",label:"菜单与底部弹层"},{id:"icons",label:"图标"},{id:"app-bars",label:"顶栏与标签"},{id:"data-display",label:"数据展示"}]},{label:"APP 结构",items:[{id:"app-shell",label:"应用框架"},{id:"content-browser",label:"内容浏览"},{id:"task-workspace",label:"任务工作台"}]},{label:"状态与反馈",items:[{id:"status-system",label:"通用状态系统"}]},{label:"产品与工程",items:[{id:"products",label:"产品差异"},{id:"delivery",label:"生成文件"},{id:"qa",label:"检查清单"}]}],W=Y.flatMap(e=>e.items);function X(e){return e!=="system"?e:matchMedia("(prefers-color-scheme: dark)").matches?"deep-night":"default"}function C(e,t,i,n="tokens/primitives.json",o="这是三个产品共用的设计变量。"){return{role:e,token:t,value:typeof i=="string"?i:JSON.stringify(i,null,2),source:n,note:o}}const R={page:"overview",skin:"system",product:"kaiting",accent:"coral",viewport:"fluid",platform:"macDesktop",reducedMotion:!1,inspectorOpen:!1};function ge(){try{const e=new URLSearchParams(location.search),t=JSON.parse(localStorage.getItem("kai-viewer-state")??"{}"),i=e.get("skin"),n=e.get("product");return{...R,...t,...i?{skin:i}:{},...n?{product:n}:{},...e.get("reducedMotion")==="true"?{reducedMotion:!0}:{},inspectorOpen:!1,inspectorTarget:void 0}}catch{return R}}function be(e){const{inspectorOpen:t,inspectorTarget:i,...n}=e;localStorage.setItem("kai-viewer-state",JSON.stringify(n))}function ve(e){if(e==="transparent")return e;const[t,i]=e.split("@");return i?`rgb(${t==="white"?"255 255 255":t==="black"?"0 0 0":`${Number.parseInt(t.slice(1,3),16)} ${Number.parseInt(t.slice(3,5),16)} ${Number.parseInt(t.slice(5,7),16)}`} / ${i})`:t}function he(e){if(!e.startsWith("#")||e.length<7)return"#1C1C22";const t=d=>Number.parseInt(e.slice(d,d+2),16)/255,i=d=>d<=.03928?d/12.92:((d+.055)/1.055)**2.4,n=.2126*i(t(1))+.7152*i(t(3))+.0722*i(t(5)),o=(n+.05)/.05,a=1.05/(n+.05);return o>=a?"#1C1C22":"#FFFFFF"}function ye(e,t,i,n){const o=X(e),a=l.skins.presets.find(k=>k.id===o),d=l.accents.products[t],F=d.presets.find(k=>k.id===i)??d.presets.find(k=>k.id===d.default)??d.presets[0];if(!a||!F)return;const h=o==="default"?{page:"#FFFFFF",sidebar:"#FFFFFF",topbar:"#FFFFFF",demo:"#FFFFFF",subtle:l.primitives.basePalette.mainBackground}:{page:a.canvas,sidebar:a.surface,topbar:a.surface,demo:a.surface,subtle:a.overlay},$=F.accent,y=l.primitives.derivedAlphas,f=a.brightness,T=document.documentElement;T.dataset.skin=o,T.dataset.product=t,T.dataset.motion=n?"reduced":"normal",T.style.colorScheme=a.brightness;const ie={"--canvas":a.canvas,"--surface":a.surface,"--elevated":a.elevated,"--overlay":a.overlay,"--canvas-highlight":a.glass.canvasHighlight,"--glass":a.glass.surface,"--glass-strong":a.glass.strongSurface,"--glass-border":a.glass.border,"--shadow-color":a.glass.shadow,"--page-background":h.page,"--sidebar-background":h.sidebar,"--topbar-background":h.topbar,"--demo-background":h.demo,"--subtle-background":h.subtle,"--product-main-background":l.primitives.basePalette.mainBackground,"--product-side-background":l.primitives.basePalette.sideBackground,"--text-primary":a.glass.primaryText,"--text-secondary":a.glass.secondaryText,"--text-muted":a.glass.mutedText,"--accent":$,"--product-accent":F.accent,"--on-accent":he($),"--hairline":y.hairline[f],"--border":y.border[f],"--subtle-fill":y.subtleFill[f],"--success":y.status.success[f],"--warning":y.status.warning[f],"--danger":y.status.error[f],"--info":y.status.info[f],"--blur":`${a.glass.blur}px`,"--strong-blur":`${a.glass.strongBlur}px`,"--shadow-scale":a.effects.shadowScale};Object.entries(ie).forEach(([k,M])=>{T.style.setProperty(k,typeof M=="string"?ve(M):String(M))})}function fe(){const e=document.documentElement;Object.entries(l.primitives.spacing).forEach(([t,i])=>{typeof i=="number"&&e.style.setProperty(`--space-${t}`,`${i}px`)}),Object.entries(l.primitives.radii).forEach(([t,i])=>{e.style.setProperty(`--radius-${t}`,`${i}px`)})}function ke(e){const t=document.documentElement,i=e.endsWith("Mobile")?"mobile":"desktop",n=l.primitives.componentProfiles[i];t.dataset.platformProfile=e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),t.dataset.componentProfile=i,Object.entries(n.typeScale).forEach(([o,a])=>{const d=o.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();t.style.setProperty(`--viewer-type-${d}-size`,`${a.fontSize}px`),t.style.setProperty(`--viewer-type-${d}-line-height`,`${a.lineHeight}px`),t.style.setProperty(`--viewer-type-${d}-weight`,String(a.fontWeight)),t.style.setProperty(`--viewer-type-${d}-tracking`,`${a.letterSpacing}px`)}),Object.entries(n.metrics).forEach(([o,a])=>{const d=o.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();t.style.setProperty(`--viewer-metric-${d}`,`${a}px`)})}const u=e=>String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;");function q({label:e,variant:t="secondary",className:i="",disabled:n=!1,ariaLabel:o}){return`<button class="${t}${i?` ${u(i)}`:""}" type="button"${n?" disabled":""}${o?` aria-label="${u(o)}"`:""}>${u(e)}</button>`}function P({id:e,label:t,value:i="",placeholder:n="",error:o="",help:a="",disabled:d=!1,type:F="text"}){const h=o||a,$=h?`${e}-description`:"";return`<label class="${o?"error":""}">
    <span>${u(t)}</span>
    <input id="${u(e)}" name="${u(e)}" type="${F}" value="${u(i)}"${n?` placeholder="${u(n)}"`:""}${$?` aria-describedby="${$}"`:""}${o?' aria-invalid="true"':""}${d?" disabled":""}>
    ${h?`<small id="${u($)}">${u(h)}</small>`:""}
  </label>`}function Se(e,t=""){return`<div class="snackbar${t?` ${u(t)}`:""}" role="status" aria-live="polite" aria-atomic="true">${u(e)}</div>`}function O(e,t,i,n="base"){return`<article class="demo-surface ${n}"><span>${u(e)}</span><strong>${u(t)}</strong><small>${u(i)}</small></article>`}function $e({id:e,title:t,description:i,destructive:n=!1}){return`<div class="dialog-demo">
    <div class="dialog-backdrop" aria-hidden="true"></div>
    <div class="dialog-card" role="dialog" aria-modal="true" aria-labelledby="${u(e)}-title" aria-describedby="${u(e)}-description">
      <header><h3 id="${u(e)}-title">${u(t)}</h3><button class="demo-icon-button" type="button" aria-label="关闭">×</button></header>
      <p id="${u(e)}-description">${u(i)}</p>
      <footer>${q({label:"取消",variant:"secondary"})}${q({label:n?"删除记录":"保存更改",variant:n?"danger":"primary"})}</footer>
    </div>
  </div>`}function N(e,t="菜单",i=""){return`<div class="anchored-menu">
    ${i?`<header>${u(i)}</header>`:""}
    <div role="menu" aria-label="${u(t)}">
      ${e.map((n,o)=>`<button class="${n.selected?"selected ":""}${n.destructive?"destructive":""}" type="button" role="menuitem" tabindex="${o===0?"0":"-1"}">
            ${n.icon?`<i aria-hidden="true">${u(n.icon)}</i>`:'<i aria-hidden="true"></i>'}
            <span>${u(n.label)}</span>${n.shortcut?`<kbd>${u(n.shortcut)}</kbd>`:""}${n.selected?'<b aria-hidden="true">✓</b>':""}
          </button>`).join("")}
    </div>
  </div>`}const ee=document.querySelector("#app");if(!ee)throw new Error("Missing #app");const p=ee;let r=ge(),m=!1;const s=e=>String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),z=e=>{const[t,i]=e.split("@");return i?`rgb(${t==="white"?"255 255 255":t==="black"?"0 0 0":`${Number.parseInt(t.slice(1,3),16)} ${Number.parseInt(t.slice(3,5),16)} ${Number.parseInt(t.slice(5,7),16)}`} / ${i})`:e.startsWith("#")||e==="transparent"?e:"transparent"},x=(e,t,i)=>`<option value="${s(e)}" ${e===i?"selected":""}>${s(t)}</option>`,E=e=>`data-token="${s(e.token)}" data-role="${s(e.role)}" data-value="${s(e.value)}" data-source="${s(e.source)}" data-note="${s(e.note)}"`,L=()=>W.find(e=>e.id===r.page)??W[0],we=(e,t,i)=>`
  <header class="page-header">
    <span>${s(e)}</span>
    <h1>${s(t)}</h1>
    <p>${s(i)}</p>
  </header>`,b=e=>{const[t,i,n]=ue.pages[e];return we(t,i,n)},V={基础色板:"base-palette",规范内容:"contents",使用方式:"workflow",修改设计:"edit",怎么判断放在哪里:"placement",当前外观:"appearance",使用规则:"rules","平台 Profile":"platform-profile",语义字体表:"semantic-type",组件映射:"component-map",平台尺寸:"platform-metrics",规则:"rules",间距:"spacing",圆角:"radius",常用时长:"duration",用法:"usage",示例:"examples",组件清单:"catalog",覆盖情况:"coverage",设计变量:"design-tokens",结构示例:"examples",边界:"boundaries",文件:"files",常用命令:"commands",必须通过:"requirements",检查范围:"coverage"},c=(e,t="",i="")=>`
  <div class="section-header" ${i||V[e]?`id="${i||V[e]}"`:""}>
    <h2>${s(e)}</h2>
    ${t?`<p>${s(t)}</p>`:""}
  </div>`,Fe=(e,t)=>`
  <aside class="note"><strong>${s(e)}</strong><p>${s(t)}</p></aside>`,B=(e,t="tokens/primitives.json",i)=>`
  <div class="token-table">
    <div class="token-row token-head"><span>用途</span><span>变量</span><span>当前值</span></div>
    ${e.map(n=>{const o=C(n.name,n.token,n.value,t,n.note??i??"这是三个产品共用的设计变量。");return`<button class="token-row inspectable" type="button" ${E(o)}>
          <strong>${s(n.name)}</strong>
          <code>${s(n.token)}</code>
          <code>${s(n.value)}</code>
        </button>`}).join("")}
  </div>`;function Te(){return`
    <aside class="sidebar ${m?"mobile-open":""}" id="site-navigation" role="${m?"dialog":"complementary"}"${m?' aria-modal="true" aria-label="规范目录"':""}${r.inspectorOpen?" inert":""}>
      <a class="brand" href="#overview"><b>K</b><span><strong>Kai Design</strong><small>设计规范</small></span></a>
      <nav aria-label="规范目录">
        ${Y.map(e=>`
              <section>
                <h2>${s(e.label)}</h2>
                ${e.items.map(t=>`
                      <button type="button" data-page="${t.id}" data-nav-label="${t.label}"
                        class="${r.page===t.id?"active":""}"
                        aria-current="${r.page===t.id?"page":"false"}">
                        ${s(t.label)}
                      </button>`).join("")}
              </section>`).join("")}
      </nav>
      <footer><span>v${s(l.primitives.specVersion)}</span><i></i><small>规范文件已生成</small></footer>
    </aside>`}function Pe(){return`
    <header class="topbar">
      <div class="top-title">
        <button id="mobile-nav-toggle" class="mobile-nav-button" type="button"
          aria-label="${m?"关闭目录":"打开目录"}"
          aria-expanded="${m}" aria-controls="site-navigation">${m?"×":"☰"}</button>
        <span><small>${s(L().label)}</small><strong>${s(L().label)}</strong></span>
      </div>
      <div class="top-actions">
        <label class="search"><span aria-hidden="true">⌕</span><span class="sr-only">搜索规范目录</span><input id="nav-search" type="search" aria-label="搜索规范目录" placeholder="搜索目录"><span id="nav-search-status" class="sr-only" role="status" aria-live="polite"></span></label>
        <label class="select-control skin-control"><span>外观</span><select id="skin">
          ${x("system","跟随系统",r.skin)}
          ${l.skins.presets.map(e=>x(e.id,e.name,r.skin)).join("")}
        </select></label>
        <label class="select-control platform-control"><span>平台</span><select id="platform">
          ${Object.entries(l.primitives.platformProfiles).map(([e,t])=>x(e,t.label,r.platform)).join("")}
        </select></label>
        <button id="motion" class="icon-button ${r.reducedMotion?"active":""}" type="button" aria-label="减少动态效果" aria-pressed="${r.reducedMotion}">≈</button>
        <span class="top-version">v${s(l.primitives.specVersion)}</span>
      </div>
    </header>`}function xe(){return`
    <article class="document">
      ${b("overview")}
      <section class="content-section">
        ${c("从这里开始","先选 Mobile 或 Desktop 组件，再处理平台行为、APP 结构和状态。产品特有内容最后处理。","contents")}
        <div class="docs-index">
          <button data-page="color"><span><strong>基础规范</strong><small>颜色、字体、间距、圆角和动效</small></span><i>→</i></button>
          <button data-page="components"><span><strong>组件基础</strong><small>移动、桌面组件和完整组件入口</small></span><i>→</i></button>
          <button data-page="content-browser"><span><strong>APP 结构</strong><small>内容浏览与任务工作台两个主结构</small></span><i>→</i></button>
          <button data-page="status-system"><span><strong>状态与反馈</strong><small>加载、进度、空数据、结果和错误</small></span><i>→</i></button>
          <button data-page="products"><span><strong>产品差异</strong><small>主题色、内容表达和产品特有规则</small></span><i>→</i></button>
        </div>
      </section>
      <section class="content-section">
        ${c("修改与输出","","workflow")}
        <ol class="prose-steps">
          <li><b>找到源文件。</b><span>数值改 <code>tokens/</code>，组件改 <code>components/</code>，结构和状态改 <code>patterns/</code>。</span></li>
          <li><b>完成检查。</b><pre><code>make validate test build check</code></pre></li>
          <li><b>同步到产品。</b><pre><code>python3 tool/kai_design.py sync</code></pre></li>
        </ol>
      </section>
      <section class="content-section">
        ${c("规则放哪里","","placement")}
        <div class="decision-table">
          <div><strong>跨产品共用</strong><span>放入基础、组件、结构或状态规范</span></div>
          <div><strong>单个产品特有</strong><span>放入产品差异，不污染通用规范</span></div>
          <div><strong>开始复用</strong><span>第二个产品需要时再提升为通用规则</span></div>
        </div>
      </section>
    </article>`}function He(){const e=l.skins.presets.find(n=>n.id===X(r.skin))??l.skins.presets[0],t=[["页面背景","skin.canvas",e.canvas],["内容背景","skin.surface",e.surface],["浮层背景","skin.elevated",e.elevated],["主要文字","skin.glass.primaryText",String(e.glass.primaryText)],["次要文字","skin.glass.secondaryText",String(e.glass.secondaryText)],["边框","skin.glass.border",String(e.glass.border)]],i=[["主内容背景","basePalette.mainBackground",l.primitives.basePalette.mainBackground],["侧栏背景","basePalette.sideBackground",l.primitives.basePalette.sideBackground],["参考主色","basePalette.primary",l.primitives.basePalette.primary]];return`
    <article class="document">
      ${b("color")}
      <section class="content-section">
        ${c("基础色板","三个颜色各有固定职责，不互相替代。")}
        <div class="color-grid base-color-grid">
          ${i.map(([n,o,a])=>{const d=C(n,o,a,"tokens/primitives.json");return`<button class="color-item inspectable" type="button" ${E(d)}>
                <i style="background:${z(a)}"></i>
                <span><strong>${n}</strong><code>${s(a)}</code></span>
              </button>`}).join("")}
        </div>
      </section>
      <section class="content-section">
        ${c("当前外观",`正在查看“${e.name}”外观。可在右上角切换。`)}
        <div class="color-grid">
          ${t.map(([n,o,a])=>{const d=C(n,o,a,`tokens/skins.json#${e.id}`);return`<button class="color-item inspectable" type="button" ${E(d)}>
                <i style="background:${z(a)}"></i>
                <span><strong>${n}</strong><code>${s(a)}</code></span>
              </button>`}).join("")}
        </div>
      </section>
      <section class="content-section">
        ${c("使用规则")}
        <div class="do-dont">
          <article><h3>应该</h3><ul><li>组件按用途读取颜色变量</li><li>文字只使用主要、次要和弱化三档</li><li>边界优先使用细边框</li></ul></article>
          <article><h3>不要</h3><ul><li>在组件里直接写十六进制颜色</li><li>用主题色显示普通正文</li><li>额外叠加透明度制造第四档文字</li></ul></article>
        </div>
      </section>
    </article>`}const D={displayLarge:"展示大标题",pageTitle:"页面标题",sectionTitle:"分区标题",title:"组件标题",body:"正文",inputText:"输入文字",bodySecondary:"次级正文 / 列表副题",listTitle:"列表行标题",gridTitle:"网格标题",label:"按钮与控件标签",caption:"辅助信息",captionSmall:"极小标签"},K={minimumInteractiveTarget:"最小交互目标",controlHeight:"常规控件高度",compactControlHeight:"紧凑控件高度",listRowSingle:"单行列表",listRowDouble:"双行列表",pageGutter:"页面边距",sectionGap:"分区间距",controlGap:"控件间距",iconTextGap:"图标文字间距"};function We(){const e=Object.entries(l.primitives.platformProfiles),t=Object.entries(l.primitives.componentProfiles),i=l.primitives.platformProfiles[r.platform],n=Z[r.platform];return`
    <article class="document">
      ${b("platforms")}
      <section class="content-section">
        ${c("组件 Profile","产品组件只读取这两套数值。","component-profile")}
        <div class="platform-profile-grid component-profile-grid">
          ${t.map(([o,a])=>`<article class="platform-profile-card">
            <div><span>${s(a.inputMode)}</span><code>${s(o)}</code></div>
            <h3>${s(a.label)}</h3>
            <p>${s(a.platforms.join(" · "))}</p>
            <dl>
              <div><dt>正文</dt><dd>${a.typeScale.body.fontSize} / ${a.typeScale.body.lineHeight}</dd></div>
              <div><dt>控件</dt><dd>${a.metrics.controlHeight} ${s(a.unit)}</dd></div>
              <div><dt>列表</dt><dd>${a.metrics.listRowSingle} / ${a.metrics.listRowDouble}</dd></div>
            </dl>
          </article>`).join("")}
        </div>
      </section>
      <section class="content-section">
        ${c("官方基准","用于确认两套组件没有低于目标平台的可用性要求。","platform-profile")}
        <div class="platform-profile-grid">
          ${e.map(([o,a])=>`<article class="platform-profile-card">
            <div><span>${s(a.inputMode)}</span><code>${s(o)}</code></div>
            <h3>${s(a.label)}</h3>
            <p>${s(a.fontFamily)}</p>
            <dl>
              <div><dt>正文</dt><dd>${a.typeScale.body.fontSize} / ${a.typeScale.body.lineHeight}</dd></div>
              <div><dt>交互目标</dt><dd>${a.metrics.minimumInteractiveTarget} ${s(a.unit)}</dd></div>
              <div><dt>缩放</dt><dd>${s(a.scaling)}</dd></div>
            </dl>
            <a href="${s(a.reference.url)}" target="_blank" rel="noreferrer">${s(a.reference.name)}</a>
          </article>`).join("")}
        </div>
      </section>
      <section class="content-section">
        ${c(`${i.label} 行为适配`,"切换顶部平台查看。组件视觉不会随这里换皮。","behavior")}
        <div class="platform-behavior-grid">
          <article><strong>导航</strong><p>${s(n.navigation)}</p></article>
          <article><strong>系统栏</strong><p>${s(n.bars)}</p></article>
          <article><strong>弹层</strong><p>${s(n.presentation)}</p></article>
          <article><strong>输入</strong><p>${s(n.interaction)}</p></article>
        </div>
      </section>
      <section class="content-section">
        ${c("使用规则")}
        <ul class="prose-list">
          <li>组件读取 Mobile 或 Desktop Profile，不读取五个平台的视觉数值。</li>
          <li>平台 Profile 只负责系统字体、缩放、命中目标和行为验收。</li>
          <li>窗口宽度只改变布局；不能因为窗口变宽就把移动字号换成桌面字号。</li>
          <li>返回、安全区、键鼠、窗口和系统弹层仍按运行平台适配。</li>
        </ul>
      </section>
    </article>`}function qe(){const e=Object.entries(l.primitives.componentProfiles),t=Object.keys(D);return`
    <article class="document">
      ${b("typography")}
      <section class="content-section">
        ${c("语义字体表","同一语义只输出 Mobile 与 Desktop 两套数值。")}
        <div class="platform-table-wrap">
          <table class="platform-table type-scale-table">
            <thead><tr><th>角色</th>${e.map(([,i])=>`<th>${s(i.label)}</th>`).join("")}</tr></thead>
            <tbody>
              ${t.map(i=>`<tr>
                <th>${D[i]}<code>${i}</code></th>
                ${e.map(([,n])=>{const o=n.typeScale[i];return`<td><strong>${o.fontSize} / ${o.lineHeight}</strong><span>w${o.fontWeight}${o.letterSpacing?` · ${o.letterSpacing}`:""}</span></td>`}).join("")}
              </tr>`).join("")}
            </tbody>
          </table>
        </div>
      </section>
      <section class="content-section">
        ${c("组件映射")}
        <div class="role-map-grid">
          ${Object.entries(l.primitives.typography.componentRoles).map(([i,n])=>`<div><code>${i}</code><span>→</span><strong>${D[n]??n}</strong></div>`).join("")}
        </div>
      </section>
      <section class="content-section">
        ${c("规则")}
        <ul class="prose-list"><li>界面使用平台系统字体与系统缩放；内容字体只能在产品层登记。</li><li>字号与行高必须成对使用，不能只复制字号。</li><li>iOS/iPadOS 正文不得低于默认 17pt；Android 主正文使用 16/24sp。</li><li>辅助信息可以更小，但不得代替正文或列表标题。</li><li>200% 字体缩放时保留同样的信息与操作。</li></ul>
      </section>
    </article>`}function Ae(){const e=Object.entries(l.primitives.spacing).filter(([,i])=>typeof i=="number").map(([i,n])=>({name:`间距 ${i}`,token:`spacing.${i}`,value:`${n}px`})),t=Object.entries(l.primitives.radii).map(([i,n])=>({name:`圆角 ${i}`,token:`radii.${i}`,value:`${n}px`}));return`
    <article class="document">
      ${b("spacing")}
      <section class="content-section">
        ${c("间距")}
        <div class="spacing-visual">${e.map(i=>`<div><code>${i.token}</code><i style="width:${i.value}"></i><span>${i.value}</span></div>`).join("")}</div>
        ${B(e)}
      </section>
      <section class="content-section">
        ${c("平台尺寸","基础网格共享，组件高度和交互目标按平台输出。")}
        <div class="platform-table-wrap">
          <table class="platform-table">
            <thead><tr><th>尺寸</th>${Object.values(l.primitives.platformProfiles).map(i=>`<th>${s(i.label)}</th>`).join("")}</tr></thead>
            <tbody>
              ${Object.keys(K).map(i=>`<tr><th>${K[i]}<code>${i}</code></th>${Object.values(l.primitives.platformProfiles).map(n=>`<td><strong>${n.metrics[i]}</strong><span>${s(n.unit)}</span></td>`).join("")}</tr>`).join("")}
            </tbody>
          </table>
        </div>
      </section>
      <section class="content-section">
        ${c("圆角")}
        <div class="radius-visual">${t.map(i=>`<div><i style="border-radius:${i.value}"></i><strong>${i.name.replace("圆角 ","")}</strong><code>${i.value}</code></div>`).join("")}</div>
        ${B(t)}
      </section>
    </article>`}function Me(){return`
    <article class="document">
      ${b("motion")}
      <section class="content-section">
        ${c("常用时长")}
        <div class="motion-demo">
          ${["进入","常规","退出"].map((e,t)=>`<button type="button"><i style="animation-delay:${t*180}ms"></i><strong>${e}</strong><span>${160+t*80} 毫秒</span></button>`).join("")}
        </div>
      </section>
      <section class="content-section">
        ${c("规则")}
        <ul class="prose-list"><li>点击反馈必须立即出现。</li><li>同一操作中的动画使用一致的缓动。</li><li>页面切换不使用长时间大幅移动。</li><li>用户选择减少动态效果后，保留状态变化，移除位移动画。</li></ul>
      </section>
    </article>`}function Oe(e){const t=Q.components[e];return t?`<aside class="component-contract" aria-label="${s(t.name)}契约">
    <div><small>Token 驱动契约</small><strong>${s(t.name)}</strong></div>
    <p>${s(t.summary)}</p>
    <dl>
      <div><dt>变体</dt><dd>${t.variants.map(i=>s(i.name)).join(" · ")}</dd></div>
      <div><dt>状态</dt><dd>${t.states.map(i=>s(i.name)).join(" · ")}</dd></div>
      <div><dt>无障碍</dt><dd>${s(t.accessibility[0]??"按组件契约验收")}</dd></div>
    </dl>
    <code>tokens → componentContracts</code>
  </aside>`:""}const v=(e,t)=>`
  <article class="document">
    ${b(e)}
    <section class="content-section">
      ${c("预览","","preview")}
      <div class="component-preview">
        <div class="component-stage">${t}</div>
      </div>
      ${Oe(e)}
    </section>
  </article>`;function De(){const t=["buttons","inputs","selection","navigation","list-rows","feedback","dialogs","menus","icons","app-bars","data-display"].map(n=>[n,Q.components[n]]),i=r.platform.endsWith("Mobile")?"mobile":"desktop";return`
    <article class="document">
      ${b("components")}
      <section class="content-section">
        ${c("两套组件","切换顶部平台会选择对应组件，但同一端内不会换皮。","families")}
        <div class="component-family-grid component-foundation-families">
          <article class="${i==="mobile"?"active":""}"><header><strong>Mobile</strong><span>iOS · Android</span></header>${U("mobile",!0)}</article>
          <article class="${i==="desktop"?"active":""}"><header><strong>Desktop</strong><span>macOS · Windows · Linux</span></header>${U("desktop",!0)}</article>
        </div>
      </section>
      <section class="content-section">
        ${c("基础表面","页面、固定栏和浮层只使用这三层。","surfaces")}
        <div class="surface-demo">
          ${O("页面与容器","Surface","普通内容和分组。","base")}
          ${O("侧栏与底栏","Glass","固定界面层。","glass")}
          ${O("菜单与对话框","Glass Strong","临时浮层。","glass-strong")}
        </div>
      </section>
      <section class="content-section">
        ${c("全部组件","","catalog")}
        <div class="component-catalog">
          ${t.map(([n,o])=>`<button type="button" data-page="${n}">
              <span><strong>${s(o.name)}</strong><small>${s(o.summary)}</small></span>
              <i>→</i>
            </button>`).join("")}
        </div>
      </section>
    </article>`}function U(e,t=!1){const i=t?" compact":"";return e==="mobile"?`<div class="platform-specimen kai-mobile-specimen${i}">
      <div class="device-phone">
        <div class="phone-status"><b>9:41</b><span>● ◒ ▰</span></div>
        <header class="mobile-app-bar"><button aria-label="菜单">☰</button><strong>资料库</strong><button aria-label="更多">•••</button></header>
        <main>
          <label class="specimen-field"><span aria-hidden="true">⌕</span><span class="sr-only">搜索内容</span><input aria-label="搜索内容" placeholder="搜索内容"></label>
          <div class="material-chips"><b>全部</b><span>最近</span><span>收藏</span></div>
          <div class="specimen-list">
            <article><i>文</i><span><strong>设计记录</strong><small>今天更新</small></span><button aria-label="更多">⋮</button></article>
            <article><i>集</i><span><strong>我的收藏</strong><small>12 个项目</small></span><button aria-label="更多">⋮</button></article>
          </div>
          <button class="specimen-primary">新建项目</button>
        </main>
        <nav class="ios-tab-bar"><b><i>⌂</i>首页</b><span><i>▦</i>资料库</span><span><i>⌕</i>搜索</span><span><i>○</i>我的</span></nav>
      </div>
    </div>`:`<div class="platform-specimen desktop-specimen kai-desktop-specimen${i}">
    <div class="device-window">
      <header class="kai-windowbar"><strong>◈　资料库</strong><div><button aria-label="最小化">—</button><button aria-label="还原窗口">□</button><button aria-label="关闭窗口">×</button></div></header>
      <div class="desktop-body">
        <aside><b>⌂　主页</b><span>▦　全部项目</span><span>◷　最近使用</span><span>♡　收藏</span><small>位置</small><span>☁　云端</span><span>⚙　设置</span></aside>
        <main>
          <div class="windows-command"><button class="specimen-primary">＋ 新建</button><button>⌄ 排序</button><button aria-label="更多操作">⋯</button><label><span aria-hidden="true">⌕</span><span class="sr-only">搜索资料库</span><input aria-label="搜索资料库" placeholder="搜索资料库"></label></div>
          <h3>全部项目</h3>
          <div class="desktop-table"><header><span>名称</span><span>修改时间</span><span>状态</span></header><article><i>文</i><strong>设计记录</strong><span>今天 14:32</span><b>已同步</b></article><article><i>集</i><strong>我的收藏</strong><span>昨天 18:05</span><b>本机</b></article></div>
          <div class="windows-info"><span>ⓘ　内容已同步</span><button>关闭</button></div>
        </main>
      </div>
    </div>
  </div>`}function Ce(){const e=r.platform.endsWith("Desktop");return v("buttons",`<div class="demo-stack">
      <div class="demo-group"><span>层级</span><div class="button-line"><button class="primary">主要操作</button><button class="secondary">次要操作</button><button class="ghost">文字操作</button><button class="danger">删除</button></div></div>
      <div class="demo-group"><span>尺寸</span><div class="button-line button-sizes"><button class="primary compact">紧凑</button><button class="primary">常规</button><button class="primary large">强调操作</button></div></div>
      <div class="demo-group"><span>状态</span><div class="button-line"><button class="primary">默认</button>${e?'<button class="primary demo-hover">悬停</button>':""}<button class="primary demo-pressed">按下</button><button class="primary" disabled>不可用</button></div></div>
      <div class="demo-group"><span>图标与工具按钮</span><div class="button-line"><button class="demo-icon-button" aria-label="收藏">☆</button><button class="demo-icon-button selected" aria-label="已收藏">★</button><button class="toolbar-button">↻ 重新载入</button><button class="demo-fab" aria-label="添加">＋</button></div></div>
    </div>`)}function ze(){return v("inputs",`<div class="field-demo">
      ${P({id:"default-input",label:"默认",placeholder:"输入内容"})}
      <div class="focused">${P({id:"focused-input",label:"聚焦",value:"设计规范"})}</div>
      ${P({id:"error-input",label:"项目名称",value:"",error:"请输入项目名称"})}
      <label><span>选项</span><select id="theme-select" name="theme"><option>跟随系统</option><option>浅色</option><option>深色</option></select></label>
      <label class="range-field" for="progress-input"><span>播放进度</span><input id="progress-input" name="progress" type="range" value="42"></label>
      ${P({id:"disabled-input",label:"不可编辑",value:"固定内容",disabled:!0})}
    </div>`)}function Ee(){return v("selection",`<div class="demo-stack">
      <div class="demo-group"><span>选择条</span><div class="chip-strip"><button class="active">全部</button><button>最近使用</button><button>已收藏</button><button disabled>不可用</button></div></div>
      <div class="choice-demo">
        <button class="choice toggle" aria-pressed="true"><i class="switch on"><b></b></i><span><strong>自动同步</strong><small>修改后立即生效</small></span></button>
        <button class="choice toggle" aria-pressed="false"><i class="switch"><b></b></i><span><strong>减少动态</strong><small>降低界面移动</small></span></button>
        <button class="choice"><i class="check">✓</i><span><strong>包含说明文件</strong><small>可以选择多个项目</small></span></button>
        <button class="choice"><i class="radio-dot"></i><span><strong>稳定版本</strong><small>单选组中的当前项目</small></span></button>
      </div>
    </div>`)}function Le(){const e=r.platform==="appleMobile"||r.platform==="androidMobile";return v("navigation",`<div class="nav-preview">
      ${e?'<div class="demo-group"><span>Mobile 底部导航</span><div class="bottom-nav-demo"><button class="active"><b>⌂</b><span>首页</span></button><button><b>◇</b><span>内容</span></button><button><b>⚙</b><span>设置</span></button></div></div>':'<div class="demo-group"><span>Desktop 侧栏</span><div class="side-nav-demo"><button class="active">内容</button><button>任务</button><button>收藏</button><button>设置</button></div></div>'}
      <div class="demo-group"><span>页内平级切换</span><div class="tabs"><button class="active">全部</button><button>最近</button><button>收藏</button></div></div>
    </div>`)}function Be(){return v("list-rows",`<div class="list-row-demo">
      <button><i>文</i><span><strong>只有标题</strong></span><b>›</b></button>
      <button><i>自</i><span><strong>自动检查更新</strong><small>每天检查一次</small></span><em class="switch on"><b></b></em></button>
      <button class="selected"><i class="check">✓</i><span><strong>包含说明文件</strong><small>选中状态使用行内标记</small></span><b>已选择</b></button>
      <button disabled><i>锁</i><span><strong>不可使用的项目</strong><small>说明为什么暂时不可用</small></span></button>
      <button class="destructive"><i>删</i><span><strong>移除全部记录</strong></span></button>
    </div>`)}function je(){const e=r.platform.endsWith("Mobile")?"Mobile 轻提示":"Desktop 状态通知";return v("feedback",`<div class="feedback-demo">
      <div class="feedback-item"><span>${e}</span>${Se("已保存更改")}</div>
      <div class="feedback-item"><span>工具提示</span><div class="tooltip-sample"><button class="demo-icon-button" type="button" aria-label="查看使用说明">?</button><b role="tooltip">查看使用说明</b></div></div>
      <div class="feedback-item wide"><span>空态与加载</span><div class="empty-state"><i aria-hidden="true">◇</i><strong>还没有内容</strong><p>添加第一项后会显示在这里。</p>${q({label:"添加内容",variant:"secondary"})}</div><div class="loading-state" role="status" aria-live="polite"><i aria-hidden="true"></i><span>正在载入</span></div></div>
      <div class="feedback-item wide"><span>进度</span><div class="linear-progress" role="progressbar" aria-label="任务进度" aria-valuemin="0" aria-valuemax="100" aria-valuenow="62"><i style="width:62%"></i></div><small>已完成 62%</small></div>
      <div class="feedback-item wide"><span>滚动条</span><div class="scrollbar-sample"><i></i></div></div>
    </div>`)}function Ge(){const e=r.platform.endsWith("Mobile")?"Mobile":"Desktop";return v("dialogs",`<div class="demo-stack">
      <div class="demo-group"><span>${e} 确认对话框</span>${$e({id:"delete-dialog",title:"删除这条记录？",description:"删除后将无法恢复。其他记录不会受到影响。",destructive:!0})}</div>
      <div class="demo-group"><span>输入对话框</span><div class="prompt-dialog" role="dialog" aria-labelledby="rename-dialog-title">
        <h3 id="rename-dialog-title">重命名</h3>
        ${P({id:"rename-input",label:"名称",value:"",error:"请输入名称"})}
        <footer>${q({label:"取消",variant:"secondary"})}${q({label:"保存更改",variant:"primary"})}</footer>
      </div></div>
    </div>`)}function Ie(){const e=r.platform==="appleMobile"||r.platform==="androidMobile";return v("menus",`<div class="menu-demo">
      <div class="demo-group"><span>${e?"Mobile":"Desktop"} 菜单</span>${N([{label:"最近修改",icon:"↕",selected:!0},{label:"按名称",icon:"字"},{label:"清除记录",icon:"删",destructive:!0}],"排序方式","排序方式")}</div>
      ${e?'<div class="demo-group"><span>Mobile 底部弹层</span><div class="sheet-frame"><div class="sheet" role="dialog" aria-labelledby="sheet-title"><i class="sheet-handle" aria-hidden="true"></i><strong id="sheet-title">选择操作</strong><button type="button"><span>添加到收藏</span><b aria-hidden="true">›</b></button><button type="button"><span>分享</span><b aria-hidden="true">›</b></button><button type="button" class="destructive"><span>删除</span></button></div></div></div>':`<div class="demo-group"><span>Desktop 右键菜单</span>${N([{label:"打开",icon:"↗",shortcut:"Enter",selected:!0},{label:"重命名",icon:"✎",shortcut:"F2"},{label:"复制",icon:"⧉",shortcut:"⌘C"},{label:"移到废纸篓",icon:"删",shortcut:"⌫",destructive:!0}],"快捷菜单")}</div>`}
    </div>`)}function Re(){const e=l.primitives.iconography.sizes;return v("icons",`<div class="demo-stack">
      <div class="demo-group"><span>语义尺寸</span><div class="icon-scale-demo">
        ${Object.entries(e).map(([t,i])=>`<article><i style="width:${i}px;height:${i}px;font-size:${Math.max(12,i-2)}px">◇</i><strong>${s(t)}</strong></article>`).join("")}
      </div></div>
      <div class="demo-group"><span>按钮状态</span><div class="button-line"><button class="demo-icon-button" aria-label="搜索">⌕</button><button class="demo-icon-button selected" aria-label="已筛选">▽</button><button class="demo-icon-button demo-pressed" aria-label="更多">•••</button><button class="demo-icon-button" disabled aria-label="不可用">＋</button></div></div>
    </div>`)}function Ne(){return v("app-bars",`<div class="demo-stack">
      <div class="demo-group"><span>页面头与主要操作</span><div class="page-header-demo"><div><h3>资料库</h3><p>浏览、筛选和管理全部内容。</p></div><button class="primary">添加内容</button></div></div>
      <div class="demo-group"><span>工具栏</span><div class="toolbar-demo"><label>⌕ <input value="设计规范" aria-label="搜索"></label><button class="secondary">筛选</button><button class="secondary">最近修改</button><span></span><button class="demo-icon-button" aria-label="网格视图">▦</button><button class="demo-icon-button" aria-label="列表视图">☷</button></div></div>
      <div class="demo-group"><span>页内标签</span><div class="tabs"><button class="active">全部</button><button>进行中</button><button>已完成</button></div></div>
    </div>`)}function Ve(){return v("data-display",`<div class="data-display-demo">
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
    </div>`)}function G(e,t,i){return`
    <article class="document">
      ${b(e)}
      <section class="content-section">${c("结构示例")}<div class="pattern-preview">${t}</div></section>
      <section class="content-section">${c("规则")}<ul class="prose-list">${i.map(n=>`<li>${s(n)}</li>`).join("")}</ul></section>
    </article>`}function Ke(){const e=Z[r.platform];return G("app-shell",`<div class="shell platform-shell"><aside><b>K</b><button class="active">内容</button><button>任务</button><button>收藏</button><button>设置</button></aside><main><header><span><small>当前平台</small><strong>${s(l.primitives.platformProfiles[r.platform].label)}</strong></span><button class="primary">添加</button></header><section><article></article><article></article><article></article></section><footer>${s(e.navigation)}</footer></main></div>`,["顶级目的地保持一致，导航控件按当前平台映射。","内容区负责滚动，固定导航不跟随内容移动。","窗口、键盘、返回和安全区域遵循平台，不由品牌层重写。"])}function Ue(){return G("content-browser",`<div class="content-browser-demo">
      <header><div><small>内容浏览</small><h3>全部内容</h3></div><button class="primary">添加</button></header>
      <div class="browser-tools"><label>⌕ <input value="" placeholder="搜索内容"></label><button class="secondary">筛选</button><button class="secondary">最近修改</button></div>
      <div class="browser-body">
        <main>${["A","B","C","D","E","F"].map((e,t)=>`<button class="${t===1?"selected":""}"><i>${e}</i><span><strong>项目名称</strong><small>${t+2} 项内容 · 刚刚更新</small></span></button>`).join("")}</main>
        <aside><div class="demo-thumbnail">B</div><h4>项目名称</h4><p>详情是浏览结构的一部分。宽屏显示在侧栏，窄屏进入导航栈。</p><button class="primary">打开</button></aside>
      </div>
    </div>`,["集合、搜索、筛选和详情属于同一结构，不再拆成多套通用页面。","返回时恢复查询、筛选、视图和滚动位置。","内容素材比例、字段和具体操作由产品规范决定。"])}function Je(){return G("task-workspace",`<div class="task-workspace-demo">
      <header><div><small>扫描 · 第 2 阶段，共 3 阶段</small><h3>正在检查 128 个项目</h3><p>当前：项目 080</p></div><button class="secondary">暂停</button><button class="ghost">取消</button></header>
      <section class="task-progress-block"><div><span>80 / 128</span><b>62%</b></div><div class="linear-progress"><i style="width:62%"></i></div><small>已完成的结果会保留，取消可能需要几秒钟。</small></section>
      <div class="task-results">
        <article><small>完成</small><strong>76</strong></article>
        <article><small>跳过</small><strong>4</strong></article>
        <article class="error"><small>需要处理</small><strong>2</strong></article>
      </div>
      <footer><button class="secondary">查看当前项目</button><button class="secondary">查看失败项</button></footer>
    </div>`,["任务结构固定为准备、运行和结果三个阶段，业务名称可以不同。","总量未知时显示当前阶段，不伪造百分比。","部分失败保留成功结果，只重试失败项。"])}function _e(){const e=[["首次使用为空","这里还没有内容","添加第一项后会显示在这里。","添加内容","empty"],["搜索无结果","没有找到“设计”","修改关键词或清除当前筛选。","清除筛选","search"],["已有内容刷新失败","暂时无法更新","现有内容仍然可用，可以稍后重试。","重试","inline"],["部分完成","126 项已处理，2 项失败","成功结果已经保留，只需处理失败项。","重试失败项","partial"]];return`
    <article class="document">
      ${b("status-system")}
      <section class="content-section">
        ${c("状态选择","先判断影响范围和恢复方式，再选择展示组件。","decision")}
        <div class="status-decision-grid">
          <article><strong>整页没有内容</strong><span>Empty / Blocking State</span></article>
          <article><strong>已有内容局部变化</strong><span>Inline Status / Progress Row</span></article>
          <article><strong>后台持续任务</strong><span>Persistent Task Status</span></article>
          <article><strong>短暂操作结果</strong><span>平台对应的短反馈</span></article>
        </div>
      </section>
      <section class="content-section">
        ${c("实际状态","同一套信息结构覆盖空数据、无结果、错误和部分完成。","examples")}
        <div class="status-example-grid">${e.map(([t,i,n,o,a])=>`<article class="${a}"><small>${t}</small><i>${a==="partial"?"!":a==="inline"?"↻":"◇"}</i><strong>${i}</strong><p>${n}</p><button class="${a==="empty"?"primary":"secondary"}">${o}</button></article>`).join("")}</div>
      </section>
      <section class="content-section">
        ${c("进度与任务结果","已知总量才显示百分比；未知总量只显示当前阶段。","progress")}
        <div class="progress-example-grid">
          <article><header><strong>正在扫描</strong><span>80 / 128</span></header><div class="linear-progress"><i style="width:62%"></i></div><small>当前：项目 080</small></article>
          <article><header><strong>正在连接服务</strong><span>第 1 阶段</span></header><div class="loading-state"><i></i><span>等待服务响应</span></div><small>总量未知，不显示虚假百分比</small></article>
          <article><header><strong>后台同步</strong><span>可继续使用应用</span></header><div class="linear-progress"><i style="width:38%"></i></div><button class="secondary">查看任务</button></article>
        </div>
      </section>
    </article>`}function Qe(){const e=l.accents.products[r.product],t=l.productTokens[r.product],i=Object.entries(t.tokens).map(([n,o])=>({name:o.description,token:n,value:typeof o.value=="number"?`${o.value}${o.type==="dimension"?"px":o.type==="duration"?"ms":""}`:o.value}));return`
    <article class="document">
      ${b("products")}
      <div class="page-toolbar">
        <label><span>产品</span><select id="product-inline">${Object.keys(l.accents.products).map(n=>x(n,l.accents.products[n].displayName,r.product)).join("")}</select></label>
        <label><span>主题色</span><select id="accent-inline">${e.presets.map(n=>x(n.id,n.name,r.accent)).join("")}</select></label>
      </div>
      <section class="content-section">
        ${c(e.displayName,`${A[r.product].character}。${A[r.product].content}`,"appearance")}
        <div class="accent-list">${e.presets.map(n=>`<button data-accent-pick="${n.id}" class="${n.id===r.accent?"active":""}"><i style="background:${n.accent}"></i><span><strong>${n.name}</strong><code>${n.accent}</code></span></button>`).join("")}</div>
      </section>
      <section class="content-section">
        ${c("专属规则","这些内容只影响当前产品，不进入基础、组件和页面结构。","differences")}
        <div class="rule-grid">${A[r.product].differences.map(n=>`<article><strong>${s(n.title)}</strong><p>${s(n.description)}</p><code>${s(n.reference)}</code></article>`).join("")}</div>
      </section>
      <section class="content-section">
        ${c("页面规范","每个产品的普通页面和沉浸页面都有明确映射。","product-patterns")}
        <div class="rule-grid">${A[r.product].patterns.map(n=>`<article><strong>${s(n.title)}</strong><p>${s(n.description)}</p><code>${s(n.reference)}</code></article>`).join("")}</div>
      </section>
      <section class="content-section">
        ${c("产品变量","只有当前产品使用的数值也参与生成、校验和同步。","product-tokens")}
        ${i.length?B(i,`products/${r.product}/tokens.json`,"这是当前产品专属的生成变量。"):Fe("没有额外变量","当前产品只有内容边界和行为差异，没有需要单独生成的数值。")}
      </section>
      <section class="content-section">
        ${c("边界")}
        <div class="decision-table">
          <div><strong>可以不同</strong><span>主题色、内容表现、产品专属页面</span></div>
          <div><strong>必须共用</strong><span>字体、间距、组件状态、无障碍要求</span></div>
          <div><strong>需要登记</strong><span>任何偏离通用规范的实现</span></div>
        </div>
      </section>
    </article>`}function Ze(){return`
    <article class="document">
      ${b("delivery")}
      <section class="content-section">
        ${c("文件")}
        <div class="file-list">
          <div><code>dist/tokens/kai.tokens.json</code><span>全部通用变量</span><b>JSON</b></div>
          <div><code>dist/flutter/&lt;product&gt;/brand_tokens.g.dart</code><span>Flutter 变量</span><b>DART</b></div>
          <div><code>dist/css/&lt;product&gt;/brand.generated.css</code><span>Web 样式变量</span><b>CSS</b></div>
          <div><code>dist/spec/</code><span>规范文档快照</span><b>MD</b></div>
          <div><code>dist/viewer/</code><span>当前规范网站</span><b>WEB</b></div>
        </div>
      </section>
      <section class="content-section">
        ${c("常用命令")}
        <div class="command-list"><div><span>检查源文件</span><code>make validate</code></div><div><span>运行测试</span><code>make test</code></div><div><span>生成文件</span><code>make build</code></div><div><span>确认没有过期</span><code>make check</code></div></div>
      </section>
      <p class="digest">内容校验码：<code>${me.tokenDigest}</code></p>
    </article>`}function Ye(){const e=Object.keys(l.accents.products),t=Object.entries(l.primitives.platformProfiles);return`
    <article class="document">
      ${b("qa")}
      <section class="content-section">
        ${c("必须通过")}
        <div class="check-list">${["生成文件与源文件一致","组件已映射到当前平台的原生结构与行为","品牌覆盖没有改变返回、键盘、焦点和安全区域","两个主结构覆盖产品的浏览与任务流程","加载、进度、空状态、部分完成和错误均有实际示例","窗口缩小时没有内容溢出","减少动态效果后仍可正常操作"].map(i=>`<label><input type="checkbox" checked><span>${i}</span></label>`).join("")}</div>
      </section>
      <section class="content-section">
        ${c("平台范围")}
        <div class="decision-table">${t.map(([i,n])=>`<button type="button" data-qa-platform="${i}" class="${r.platform===i?"active":""}"><strong>${s(n.label)}</strong><span>${n.typeScale.body.fontSize}/${n.typeScale.body.lineHeight} ${s(n.unit)} · target ${n.metrics.minimumInteractiveTarget}</span></button>`).join("")}</div>
      </section>
      <section class="content-section">
        ${c("检查范围")}
        <div class="qa-table">
          <div class="qa-row qa-head"><span>产品</span>${Object.entries(I).map(([i])=>`<span>${i}</span>`).join("")}</div>
          ${e.map(i=>`<div class="qa-row"><strong>${l.accents.products[i].displayName}</strong>${Object.entries(I).map(([n,o])=>`<button data-qa-product="${i}" data-qa-viewport="${n}"><i></i><span>${o}</span></button>`).join("")}</div>`).join("")}
        </div>
      </section>
    </article>`}function Xe(){switch(r.page){case"color":return He();case"platforms":return We();case"typography":return qe();case"spacing":return Ae();case"motion":return Me();case"components":return De();case"buttons":return Ce();case"inputs":return ze();case"selection":return Ee();case"navigation":return Le();case"list-rows":return Be();case"feedback":return je();case"dialogs":return Ge();case"menus":return Ie();case"icons":return Re();case"app-bars":return Ne();case"data-display":return Ve();case"app-shell":return Ke();case"content-browser":return Ue();case"task-workspace":return Je();case"status-system":return _e();case"products":return Qe();case"delivery":return Ze();case"qa":return Ye();default:return xe()}}const J={overview:[["从这里开始","contents"],["修改与输出","workflow"],["规则放哪里","placement"]],color:[["基础色板","base-palette"],["当前外观","appearance"],["使用规则","rules"]],platforms:[["组件 Profile","component-profile"],["官方基准","platform-profile"],["平台行为","behavior"],["使用规则","rules"]],typography:[["语义字体表","semantic-type"],["组件映射","component-map"],["规则","rules"]],spacing:[["间距","spacing"],["平台尺寸","platform-metrics"],["圆角","radius"]],motion:[["常用时长","duration"],["规则","rules"]],components:[["两套组件","families"],["基础表面","surfaces"],["全部组件","catalog"]],buttons:[["预览","preview"]],inputs:[["预览","preview"]],selection:[["预览","preview"]],navigation:[["预览","preview"]],"list-rows":[["预览","preview"]],feedback:[["预览","preview"]],dialogs:[["预览","preview"]],menus:[["预览","preview"]],icons:[["预览","preview"]],"app-bars":[["预览","preview"]],"data-display":[["预览","preview"]],"app-shell":[["结构示例","examples"],["规则","rules"]],"content-browser":[["结构示例","examples"],["规则","rules"]],"task-workspace":[["结构示例","examples"],["规则","rules"]],"status-system":[["状态选择","decision"],["实际状态","examples"],["进度与任务结果","progress"]],products:[["当前产品","appearance"],["专属规则","differences"],["页面规范","product-patterns"],["产品变量","product-tokens"],["边界","boundaries"]],delivery:[["文件","files"],["常用命令","commands"]],qa:[["必须通过","requirements"],["检查范围","coverage"]]};function et(){return`<aside class="page-toc" aria-label="本页内容">
    <strong>本页内容</strong>
    ${(J[r.page]??J.overview??[]).map(([t,i])=>`<a href="#${i}" data-section-link="${i}">${s(t)}</a>`).join("")}
  </aside>`}function tt(){const e=r.inspectorTarget;return`
    <aside class="inspector ${r.inspectorOpen?"open":""}" id="token-inspector" role="${r.inspectorOpen?"dialog":"complementary"}"${r.inspectorOpen?' aria-modal="true"':""} aria-labelledby="inspector-title" aria-hidden="${!r.inspectorOpen}"${r.inspectorOpen?"":" inert"}>
      <header><span><small>变量详情</small><strong id="inspector-title">查看具体数值</strong></span><button id="inspector-close" type="button" aria-label="关闭变量详情">×</button></header>
      ${e?`<main>
            <div class="token-preview" style="--token-value:${z(e.value)}"><i></i></div>
            <dl>
              <div><dt>用途</dt><dd>${s(e.role)}</dd></div>
              <div><dt>变量名</dt><dd><code>${s(e.token)}</code></dd></div>
              <div><dt>当前值</dt><dd><code>${s(e.value)}</code></dd></div>
              <div><dt>来自</dt><dd>${s(e.source)}</dd></div>
              <div><dt>说明</dt><dd>${s(e.note)}</dd></div>
            </dl>
          </main>`:'<div class="inspector-empty"><strong>先选一个变量</strong><p>点击颜色、间距、圆角或变量表格中的一行。</p></div>'}
    </aside>`}let S=null,j=null;function te(){const e=document.activeElement;return!(e instanceof HTMLElement)||!p.contains(e)?null:{id:e.id||void 0,page:e.dataset.page,token:e.dataset.token}}function H(e){if(!e)return;let t=null;e.id&&(t=p.querySelector(`#${CSS.escape(e.id)}`)),!t&&e.token&&(t=[...p.querySelectorAll("[data-token]")].find(i=>i.dataset.token===e.token)??null),!t&&e.page&&(t=[...p.querySelectorAll("[data-page]")].find(i=>i.dataset.page===e.page)??null),t?.focus({preventScroll:!0})}function g(e){const t=te(),i=e.inspectorOpen===!0&&!r.inspectorOpen,n=e.inspectorOpen===!1&&r.inspectorOpen,o=e.page!==void 0&&e.page!==r.page;if(r={...r,...e},be(r),w(),o){const a=p.querySelector("#viewer-live");a&&(a.textContent=`${L().label}页面已打开`)}requestAnimationFrame(()=>{i?p.querySelector("#inspector-close")?.focus():n?(H(j),j=null):H(t)})}function it(){p.querySelectorAll("[data-page]").forEach(e=>{e.addEventListener("click",()=>{const t=e.dataset.page;m=!1,history.replaceState(null,"",`#${t}`),g({page:t}),window.scrollTo({top:0})})}),p.querySelector("#mobile-nav-toggle")?.addEventListener("click",()=>{S=te(),m=!m,w(),m?requestAnimationFrame(()=>p.querySelector(".sidebar nav button.active")?.focus()):(requestAnimationFrame(()=>H(S)),S=null)}),p.querySelector("#mobile-nav-backdrop")?.addEventListener("click",()=>{m=!1,w(),requestAnimationFrame(()=>H(S)),S=null}),p.onkeydown=e=>{if(e.key==="Escape"&&r.inspectorOpen){g({inspectorOpen:!1,inspectorTarget:void 0});return}e.key==="Escape"&&m&&(m=!1,w(),requestAnimationFrame(()=>H(S)),S=null)},p.querySelector("#skin")?.addEventListener("change",e=>{g({skin:e.target.value})}),p.querySelector("#platform")?.addEventListener("change",e=>{g({platform:e.target.value})}),p.querySelector("#motion")?.addEventListener("click",()=>g({reducedMotion:!r.reducedMotion})),p.querySelector("#inspector-close")?.addEventListener("click",()=>g({inspectorOpen:!1,inspectorTarget:void 0})),p.querySelector("#inspector-backdrop")?.addEventListener("click",()=>g({inspectorOpen:!1,inspectorTarget:void 0})),p.querySelectorAll("[data-token]").forEach(e=>{e.addEventListener("click",()=>{j={token:e.dataset.token??""},g({inspectorOpen:!0,inspectorTarget:{token:e.dataset.token??"",role:e.dataset.role??"",value:e.dataset.value??"",source:e.dataset.source??"",note:e.dataset.note??""}})})}),p.querySelector("#product-inline")?.addEventListener("change",e=>{const t=e.target.value;g({product:t,accent:l.accents.products[t].default})}),p.querySelector("#accent-inline")?.addEventListener("change",e=>g({accent:e.target.value})),p.querySelectorAll("[data-accent-pick]").forEach(e=>e.addEventListener("click",()=>g({accent:e.dataset.accentPick??r.accent}))),p.querySelectorAll("[data-qa-product]").forEach(e=>e.addEventListener("click",()=>{const t=e.dataset.qaProduct;g({product:t,viewport:e.dataset.qaViewport,accent:l.accents.products[t].default})})),p.querySelectorAll("[data-qa-platform]").forEach(e=>{e.addEventListener("click",()=>g({platform:e.dataset.qaPlatform}))}),p.querySelectorAll("[data-section-link]").forEach(e=>{e.addEventListener("click",t=>{t.preventDefault(),p.querySelector(`#${e.dataset.sectionLink}`)?.scrollIntoView({behavior:r.reducedMotion?"auto":"smooth"})})}),p.querySelectorAll(".toggle").forEach(e=>e.addEventListener("click",()=>{const t=e.getAttribute("aria-pressed")!=="true";e.setAttribute("aria-pressed",String(t)),e.querySelector(".switch")?.classList.toggle("on",t)})),p.querySelector("#nav-search")?.addEventListener("input",e=>{const t=e.target.value.trim().toLowerCase(),i=[...p.querySelectorAll("[data-nav-label]")];i.forEach(a=>{a.hidden=!!t&&!(a.dataset.navLabel??"").toLowerCase().includes(t)});const n=i.filter(a=>!a.hidden).length,o=p.querySelector("#nav-search-status");o&&(o.textContent=t?`找到 ${n} 个目录项`:"")}),p.querySelectorAll("[role=menu]").forEach(e=>{const t=[...e.querySelectorAll("[role=menuitem]")];e.addEventListener("keydown",i=>{if(!t.length)return;const n=t.indexOf(document.activeElement);let o=n;i.key==="ArrowDown"&&(o=(n+1+t.length)%t.length),i.key==="ArrowUp"&&(o=(n-1+t.length)%t.length),i.key==="Home"&&(o=0),i.key==="End"&&(o=t.length-1),o!==n&&(i.preventDefault(),t.forEach((a,d)=>a.tabIndex=d===o?0:-1),t[o]?.focus())})})}function w(){const e=l.accents.products[r.product];e.presets.some(t=>t.id===r.accent)||(r.accent=e.default),ye(r.skin,r.product,r.accent,r.reducedMotion),ke(r.platform),p.innerHTML=`<div class="workbench ${r.inspectorOpen?"with-inspector":""} ${m?"mobile-nav-open":""}">${Te()}${m?'<button id="mobile-nav-backdrop" class="mobile-nav-backdrop" type="button" aria-label="关闭目录"></button>':""}<div class="workspace"${r.inspectorOpen?" inert":""}>${Pe()}<main class="content"><div class="doc-layout">${Xe()}${et()}</div></main></div>${r.inspectorOpen?'<button id="inspector-backdrop" class="inspector-backdrop" type="button" aria-label="关闭变量详情"></button>':""}${tt()}<div id="viewer-live" class="sr-only" role="status" aria-live="polite" aria-atomic="true"></div></div>`,it()}const _=location.hash.slice(1);W.some(e=>e.id===_)&&(r.page=_);W.some(e=>e.id===r.page)||(r.page="overview");fe();matchMedia("(prefers-color-scheme: dark)").addEventListener("change",()=>r.skin==="system"&&w());window.addEventListener("hashchange",()=>{const e=location.hash.slice(1);W.some(t=>t.id===e)&&e!==r.page&&(g({page:e}),window.scrollTo({top:0,behavior:"auto"}))});w();window.scrollTo({top:0,behavior:"auto"});

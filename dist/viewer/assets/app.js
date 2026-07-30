(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const p of a.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&i(p)}).observe(document,{childList:!0,subtree:!0});function n(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(o){if(o.ep)return;o.ep=!0;const a=n(o);fetch(o.href,a)}})();const U={products:{kaigua:{default:"indigo",displayName:"开刮",note:"单值模型：hover/pressed 由通用 stateLayer 前景叠加表达，不设独立 accent hover 色",presets:[{accent:"#6673C7",id:"indigo",name:"靛蓝"},{accent:"#3F9E98",id:"teal",name:"青绿"},{accent:"#0284C7",id:"sky",name:"晴空"},{accent:"#475569",id:"slate",name:"岩灰"}]},kaijuan:{default:"ember",displayName:"开卷",note:"单值模型：hover/pressed 由通用 stateLayer 前景叠加表达，不设独立 accent hover 色",presets:[{accent:"#EA580C",id:"ember",name:"暖橙"},{accent:"#0284C7",id:"sky",name:"晴空"},{accent:"#047857",id:"forest",name:"松绿"},{accent:"#BE123C",id:"rose",name:"绯红"},{accent:"#475569",id:"slate",name:"岩灰"}]},kaiting:{customDerive:"自定义色：hover = lerp(accent, white, 0.14)，pressed = lerp(accent, black, 0.13)",default:"coral",displayName:"开听",presets:[{accent:"#FF5A4D",hover:"#FF7567",id:"coral",name:"珊瑚",pressed:"#E3483E"},{accent:"#D95770",hover:"#E66C82",id:"rose",name:"玫瑰",pressed:"#BF465D"},{accent:"#6673C7",hover:"#7884D2",id:"indigo",name:"靛蓝",pressed:"#5360AE"},{accent:"#3F9E98",hover:"#51ADA7",id:"teal",name:"青绿",pressed:"#338781"},{accent:"#C7842F",hover:"#D4953F",id:"amber",name:"暖金",pressed:"#AB6E24"},{accent:"#8067BC",hover:"#9279C8",id:"violet",name:"紫罗兰",pressed:"#6D54A5"}]}}},J=JSON.parse('{"components":{"app-bars":{"accessibility":["页面只保留一个一级标题。","标签使用 tablist/tab/tabpanel 语义或平台等价能力。","工具栏键盘顺序与视觉顺序一致。"],"name":"顶栏与标签","states":[{"description":"标题和操作按优先级排列。","name":"默认","required":true},{"description":"工具按钮出现轻状态层。","name":"悬停","required":true},{"description":"每个工具和标签都有独立焦点。","name":"键盘聚焦","required":true},{"description":"标签使用文字与指示器共同表达。","name":"当前","required":true},{"description":"页面头切换为批量操作栏。","name":"多选","required":false},{"description":"不可用操作保留位置并说明原因。","name":"禁用","required":true}],"summary":"组织页面标题、页面级操作、筛选工具和页内平级导航。","tokens":[{"name":"页面标题","token":"componentProfiles.*.typeScale.pageTitle","value":"按 Mobile / Desktop 映射"},{"name":"工具高度","token":"componentProfiles.*.metrics.controlHeight","value":"按 Mobile / Desktop 映射"},{"name":"常规图标","token":"iconography.sizes.regular","value":"20"}],"usage":["标题只说明当前页面，不放无用统计和成熟度信息。","主要操作最多一个，低频操作进入更多菜单。","空间不足时先收起低频操作，再允许工具栏换行。"],"variants":[{"description":"页面标题、说明和主要操作。","name":"页面头"},{"description":"搜索、筛选、排序和视图切换。","name":"工具栏"},{"description":"切换同一页面内平级内容。","name":"标签"},{"description":"桌面端显示文件夹或层级路径。","name":"面包屑"}]},"buttons":{"accessibility":["纯图标按钮必须提供可访问名称和工具提示。","按钮文字使用动作动词，不使用含糊的“确定”。","键盘操作和指针操作必须触发同一结果。"],"name":"按钮","states":[{"description":"显示完整标签和当前层级。","name":"默认","required":true},{"description":"背景加深，不能改变尺寸。","name":"悬停","required":true},{"description":"背景进一步加深，反馈立即出现。","name":"按下","required":true},{"description":"使用当前平台的焦点视觉，品牌提供强调色。","name":"键盘聚焦","required":true},{"description":"保留按钮宽度并阻止重复提交。","name":"加载","required":true},{"description":"降低对比度且不可触发。","name":"禁用","required":true}],"summary":"触发明确操作；Mobile 与 Desktop 各有一套按钮视觉，平台层只适配输入和系统行为。","tokens":[{"name":"品牌圆角倾向","token":"radii.control","value":"10px"},{"name":"按钮高度","token":"componentProfiles.*.metrics.controlHeight","value":"Mobile 48 · Desktop 36"},{"name":"状态动效","token":"motion.uiStandard","value":"160ms"}],"usage":["按产品形态使用 Kai Mobile 或 Kai Desktop Button。","危险操作必须使用明确动词，并提供确认或撤销。","不要用按钮代替导航链接。"],"variants":[{"description":"当前区域最重要且最希望用户完成的操作。","name":"主要按钮"},{"description":"与主要操作并列，但优先级更低。","name":"次要按钮"},{"description":"轻量操作或不会中断当前任务的入口。","name":"文字按钮"},{"description":"删除或不可逆操作，必须使用明确动词。","name":"危险按钮"},{"description":"空间有限且图标含义足够明确的工具操作。","name":"图标按钮"}]},"data-display":{"accessibility":["状态标签必须有文字，不能只靠颜色表达。","信息图片提供替代文字，装饰图片使用空替代文字。","表格提供表头和可读取的排序状态。"],"name":"数据展示","states":[{"description":"标题、说明和辅助信息层级清楚。","name":"默认","required":true},{"description":"保留结构，避免内容出现时整体跳动。","name":"加载","required":true},{"description":"说明当前没有数据。","name":"空","required":true},{"description":"说明失败原因，并提供恢复方式。","name":"错误","required":true}],"summary":"使用卡片、标签、头像、缩略图和表格展示结构化信息。","tokens":[{"name":"卡片圆角","token":"radii.card","value":"14px"},{"name":"标题字号","token":"componentProfiles.*.typeScale.body","value":"按 Mobile / Desktop 映射"},{"name":"轻背景","token":"derivedAlphas.subtleFill","value":"foreground 4.5%"}],"usage":["只有信息可以独立理解或需要整体操作时才使用卡片。","一列简单内容优先使用列表行，多列比较才使用表格。","缩略图是辅助信息，不能替代文字标题。"],"variants":[{"description":"展示可以独立理解的一组信息。","name":"信息卡片"},{"description":"表达简短分类、属性或当前状态。","name":"标签与状态"},{"description":"帮助识别人或对象。","name":"头像与缩略图"},{"description":"比较多条记录的相同字段。","name":"表格"}]},"dialogs":{"accessibility":["打开后焦点移入，关闭后焦点回到触发位置。","标题与对话框建立程序关联，背景内容不可操作。","支持 Escape 关闭；破坏性流程仍需明确取消入口。"],"name":"对话框","states":[{"description":"标题、内容和操作区完整显示。","name":"默认","required":true},{"description":"打开后焦点进入首个合理控件。","name":"键盘聚焦","required":true},{"description":"保留尺寸并阻止重复提交。","name":"提交中","required":true},{"description":"错误靠近对应字段显示。","name":"输入有误","required":true},{"description":"提交条件未满足时禁用主要操作。","name":"禁用","required":true}],"summary":"承载必须暂时中断当前流程的确认、输入或短任务；模态容器和按钮行为按平台选择。","tokens":[{"name":"品牌圆角倾向","token":"radii.dialog","value":"20px"},{"name":"桌面内容上限","token":"component.dialog.desktopMaxWidth","value":"520px · 移动端使用平台容器"},{"name":"遮罩","token":"component.dialog.barrier","value":"black 38% / 62%"},{"name":"按钮间距","token":"component.dialog.actionGap","value":"10px"}],"usage":["先按平台选择 Sheet、Dialog、ContentDialog、Popover 或独立窗口。","简单选择优先使用菜单，不要把对话框当作普通信息卡片。","内容过高时只滚动内容区，标题和按钮区保持可见。"],"variants":[{"description":"确认有明显影响或不可逆的操作。","name":"确认对话框"},{"description":"完成一个字段或少量字段的短任务。","name":"输入对话框"},{"description":"完成仍可在一个视口内理解的小型表单。","name":"表单对话框"}]},"feedback":{"accessibility":["动态结果使用合适的状态播报，不抢走当前焦点。","加载状态提供文字说明，不能只有旋转图形。","错误信息不能只靠颜色表达。"],"name":"反馈","states":[{"description":"中性说明，不要求立即处理。","name":"提示","required":true},{"description":"任务正在进行，避免重复触发。","name":"加载","required":true},{"description":"确认操作已完成。","name":"成功","required":true},{"description":"提醒潜在影响，操作仍可继续。","name":"警告","required":true},{"description":"任务失败，提供恢复办法。","name":"错误","required":true}],"summary":"覆盖加载、进度、空内容、部分完成、错误和后台任务；展示范围与容器按平台选择。","tokens":[{"name":"反馈文字","token":"componentProfiles.*.typeScale.body","value":"按 Mobile / Desktop 映射"},{"name":"状态颜色","token":"derivedAlphas.status","value":"success / warning / error / info"},{"name":"进度强调","token":"component.feedback.progressAccent","value":"当前产品 accent"}],"usage":["短结果反馈使用当前平台对应组件，不把所有平台统一成 Snackbar。","空态说明为什么没有内容，并在有明确下一步时提供操作。","加载和进度使用统一尺寸与强调色，不单独硬编码。"],"variants":[{"description":"使用当前平台对应的短反馈，可在适用时提供撤销。","name":"短结果反馈"},{"description":"解释图标或不熟悉的短标签。","name":"工具提示"},{"description":"解释为什么没有内容，并给出下一步。","name":"空状态"},{"description":"表示等待或可计算的完成程度。","name":"加载与进度"},{"description":"说明失败原因和恢复方式。","name":"错误状态"}]},"icons":{"accessibility":["纯装饰图标不进入可访问树。","纯图标操作必须由按钮提供可访问名称。","状态不能只靠图标颜色表达。"],"name":"图标","states":[{"description":"使用当前语义前景色。","name":"默认","required":true},{"description":"反馈由承载按钮提供，不单独缩放图标。","name":"悬停","required":true},{"description":"焦点显示在承载按钮上。","name":"键盘聚焦","required":true},{"description":"可使用实心图形并配合文字或指示器。","name":"选中","required":true},{"description":"随承载控件降低对比度。","name":"禁用","required":true}],"summary":"使用平台系统图标和统一尺寸表达对象、状态与操作；命中区域由按钮提供。","tokens":[{"name":"紧凑尺寸","token":"iconography.sizes.compact","value":"16"},{"name":"常规尺寸","token":"iconography.sizes.regular","value":"20"},{"name":"大尺寸","token":"iconography.sizes.large","value":"24"},{"name":"展示尺寸","token":"iconography.sizes.display","value":"32"}],"usage":["优先使用当前平台系统图标，不为已有隐喻重复造图。","同一产品保持 rounded/outlined 风格一致。","图标视觉尺寸与点击目标分离。"],"variants":[{"description":"表格、工具栏和行尾状态。","name":"紧凑图标"},{"description":"按钮、输入框和列表行。","name":"常规图标"},{"description":"移动主要操作和少量展示。","name":"大图标"},{"description":"使用 fill/outline 表达当前项，但保持同一隐喻。","name":"双态图标"}]},"inputs":{"accessibility":["每个输入框都有持续可见的标签，不能只依赖占位文字。","错误信息与输入框建立程序关联，并说明如何修正。","输入目的明确时提供正确的自动填充语义。"],"name":"输入框","states":[{"description":"显示标签、输入面和当前值。","name":"默认","required":true},{"description":"边框对比度轻微提高。","name":"悬停","required":true},{"description":"保留平台焦点能力，输入容器可同步使用强调色。","name":"键盘聚焦","required":true},{"description":"错误边框和修正说明同时出现。","name":"输入有误","required":true},{"description":"内容可选择复制，但不可修改。","name":"只读","required":true},{"description":"不可聚焦，并说明不可用原因。","name":"禁用","required":true}],"summary":"收集或修改文本、选项和连续数值；保留平台编辑、选择、输入法和焦点能力。","tokens":[{"name":"输入框圆角","token":"radii.control","value":"10px"},{"name":"输入文字","token":"componentProfiles.*.typeScale.body","value":"Mobile 17/24 · Desktop 14/20"},{"name":"品牌焦点色","token":"component.input.brandFocus","value":"accent · 保留平台焦点行为"}],"usage":["优先使用当前平台的 TextField、SearchField、TextBox 或 Entry。","错误提示放在输入框附近，并说明如何修正。","不可编辑和只读状态需要清楚区分。"],"variants":[{"description":"输入短文本或单个值。","name":"文本输入"},{"description":"筛选当前内容，支持清除。","name":"搜索输入"},{"description":"输入较长内容，允许垂直扩展。","name":"多行输入"},{"description":"从有限选项中选择一项。","name":"下拉选择"},{"description":"调整允许近似选择的连续数值。","name":"滑杆"}]},"list-rows":{"accessibility":["整行可点击时使用按钮或链接语义，不能只绑定容器点击。","尾部控件有独立操作时，避免与整行操作冲突。","标题截断后仍能通过可访问名称读取完整内容。"],"name":"列表行","states":[{"description":"标题和辅助信息层级清楚。","name":"默认","required":true},{"description":"整行出现轻背景。","name":"悬停","required":true},{"description":"焦点覆盖整行可点击区域。","name":"键盘聚焦","required":true},{"description":"使用勾选或明确文字表达。","name":"选中","required":true},{"description":"不可触发且说明原因。","name":"禁用","required":true}],"summary":"承载设置项、操作项和带辅助信息的结构化列表。","tokens":[{"name":"单行高度","token":"componentProfiles.*.metrics.listRowSingle","value":"Mobile 52 · Desktop 40"},{"name":"双行高度","token":"componentProfiles.*.metrics.listRowDouble","value":"Mobile 68 · Desktop 52"},{"name":"控件圆角","token":"radii.control","value":"10px"},{"name":"标题字号","token":"componentProfiles.*.typeScale.body","value":"按 Mobile / Desktop 映射"}],"usage":["设置项、弹层操作项和带副标题的结构化列表使用列表行。","整行点击时必须提供完整的键盘焦点和按钮语义。","选中态使用勾选或文字表达，不使用大面积强调色填充。"],"variants":[{"description":"标题、可选图标和尾部信息。","name":"基础行"},{"description":"标题下增加一行简短说明。","name":"说明行"},{"description":"整行切换选择，并显示当前结果。","name":"选择行"},{"description":"执行删除等高风险操作。","name":"危险行"}]},"menus":{"accessibility":["打开后焦点进入菜单，关闭后回到触发位置。","支持方向键、Enter 和 Escape。","危险项目不能只使用红色区分。"],"name":"菜单与底部弹层","states":[{"description":"菜单项显示图标、标签和可选说明。","name":"默认","required":true},{"description":"当前指向项出现轻背景。","name":"悬停","required":true},{"description":"方向键移动焦点并保持在菜单内。","name":"键盘聚焦","required":true},{"description":"使用勾选和文字共同表达。","name":"选中","required":true},{"description":"保留项目位置但不可触发。","name":"禁用","required":true}],"summary":"承载与触发位置相关的短操作、选择或辅助内容；Menu、Popover、Flyout 和 Sheet 按平台与任务选择。","tokens":[{"name":"菜单圆角","token":"radii.menu","value":"12px"},{"name":"菜单最小宽度","token":"componentMetrics.menu.minWidth","value":"160"},{"name":"菜单最大宽度","token":"componentMetrics.menu.maxWidth","value":"280"},{"name":"菜单行高","token":"componentProfiles.*.metrics.controlHeight","value":"按 Mobile / Desktop 映射"},{"name":"移动 Sheet 顶角","token":"radii.sheet","value":"18px"},{"name":"平台行为","token":"component.menu.platformBehavior","value":"keyboard / focus / anchor / safe area"}],"usage":["与触发位置相关的短操作列表使用锚定菜单。","根据平台、输入模式和任务选择容器，不只根据窗口宽度判断。","菜单宽度由内容决定，长列表需要限制高度并允许滚动。"],"variants":[{"description":"Menu、Context Menu 或 MenuFlyout，保留平台键盘和命令习惯。","name":"平台菜单"},{"description":"Popover、Flyout 或 TeachingTip。","name":"辅助浮层"},{"description":"只在移动端需要较大操作空间的短任务中使用。","name":"移动 Sheet"},{"description":"显示当前选择，并允许切换。","name":"选择菜单"}]},"navigation":{"accessibility":["当前页面使用 current page 语义。","图标导航必须同时提供短标签。","键盘顺序与视觉顺序一致。"],"name":"导航","states":[{"description":"未选项目保持足够可读。","name":"默认","required":true},{"description":"出现轻背景，不移动内容。","name":"悬停","required":true},{"description":"完整导航项显示焦点。","name":"键盘聚焦","required":true},{"description":"文字和图形共同指示当前位置。","name":"当前","required":true},{"description":"仅在目的地确实不可进入时使用。","name":"禁用","required":true}],"summary":"切换主要目的地；目的地语义统一，Tab Bar、Navigation Bar、Rail、Sidebar 和 NavigationView 按平台映射。","tokens":[{"name":"侧栏宽度","token":"layoutMetrics.sidebarWidth","value":"216 / 236px"},{"name":"桌面导航文字","token":"componentProfiles.desktop.typeScale.body","value":"14/20"},{"name":"移动导航文字","token":"componentProfiles.mobile.typeScale.captionSmall","value":"11/16"},{"name":"当前项强调","token":"component.navigation.selection","value":"accent · 指示器形态按平台"},{"name":"侧栏材质","token":"component.navigation.chrome","value":"GlassSurface strong"}],"usage":["当前项必须清楚可见，同一组中只有一个当前项。","目的地和路由一致，具体控件形态由当前平台决定。","不要把普通操作混进主导航。"],"variants":[{"description":"iPhone Tab Bar；iPad 根据空间选择 Tab Bar 或 Sidebar。","name":"Apple 导航"},{"description":"紧凑窗口 Navigation Bar；大屏转换为 Rail 或 Drawer。","name":"Android 导航"},{"description":"macOS Sidebar、Windows NavigationView 或 Linux Sidebar/View Switcher。","name":"桌面导航"},{"description":"同一页面内平级内容的切换。","name":"页内标签"}]},"selection":{"accessibility":["控件与标签组成同一个可点击区域。","选中状态不能只靠颜色表达。","一组单选项使用共同的组名称。"],"name":"选择控件","states":[{"description":"未选择，标签仍保持清楚。","name":"默认","required":true},{"description":"触控区域出现轻微反馈。","name":"悬停","required":true},{"description":"整个可操作区域显示焦点。","name":"键盘聚焦","required":true},{"description":"图形、文字或勾选同时表达结果。","name":"选中","required":true},{"description":"仅用于勾选框的部分选择状态。","name":"混合","required":false},{"description":"保留当前值但不可修改。","name":"禁用","required":true}],"summary":"在有限选项间切换，覆盖开关、勾选框、单选项和选择条。","tokens":[{"name":"选中背景","token":"derivedAlphas.selection","value":"accent 10%"},{"name":"勾选框圆角","token":"radii.checkbox","value":"5px"},{"name":"状态动效","token":"motion.uiStandard","value":"160ms"}],"usage":["开关变化后立即生效，不需要再放保存按钮。","不能只靠颜色表达是否选中。","一组单选项只能有一个选中状态。"],"variants":[{"description":"控制立即生效的开与关。","name":"开关"},{"description":"从一组项目中选择零个或多个。","name":"勾选框"},{"description":"从一组互斥选项中选择一个。","name":"单选项"},{"description":"在少量并列选项中快速切换。","name":"选择条"}]},"surfaces":{"accessibility":["纯布局容器不添加按钮或分组语义。","可点击容器必须使用按钮或链接语义，不能只监听容器点击。"],"name":"表面与容器","states":[{"description":"使用当前外观的表面、边框和阴影。","name":"默认","required":true},{"description":"容器可点击时才增加轻状态层。","name":"悬停","required":true},{"description":"可操作容器显示明确焦点。","name":"键盘聚焦","required":true},{"description":"容器本身不禁用，禁用由内部控件表达。","name":"禁用","required":false}],"summary":"承载页面分区、卡片、菜单和对话框，并根据外观切换玻璃、边框和阴影。","tokens":[{"name":"卡片圆角","token":"radii.card","value":"14px"},{"name":"菜单圆角","token":"radii.menu","value":"12px"},{"name":"对话框圆角","token":"radii.dialog","value":"20px"}],"usage":["普通页面分区使用基础表面；固定导航和浮层使用强玻璃表面。","不要为了分组给每一块内容都增加卡片、阴影或模糊。","玻璃效果关闭时仍保留边框和层级，不能依赖模糊表达结构。"],"variants":[{"description":"页面内的普通内容分区。","name":"基础表面"},{"description":"侧栏、底栏和浮层等固定界面层。","name":"强玻璃表面"},{"description":"菜单、对话框和需要与页面分离的内容。","name":"浮层表面"}]}},"contractVersion":"0.4.0"}'),_=JSON.parse('{"$schema":"../schema/primitives.schema.json","basePalette":{"comment":"通用浅色基准：右侧主内容冷白、左侧导航浅灰、参考主色为珊瑚红。产品强调色由 accents 产品轴覆盖，皮肤切换不得改变强调色。","mainBackground":"#F7F9FC","primary":"#FF5A4D","sideBackground":"#F3F5F8"},"breakpoints":{"menuAdaptive":680,"mobileShell":"非桌面平台且（width < 820 或 height < 600）","settingsMaxContentWidth":920,"windowClass":{"compact":"width <= 600 或 height < 600（移动）","medium":"桌面 width < 1100；移动 width < 1000","wide":"桌面 width >= 1100；移动 width >= 1000"}},"componentMetrics":{"dialog":{"confirmMaxWidth":400,"maxWidth":520,"viewportInset":24},"menu":{"maxWidth":280,"minWidth":160},"sheet":{"handleHeight":4,"handleWidth":38,"maxWidth":760,"optionMaxWidth":560},"table":{"headerMinHeight":40,"minColumnWidth":120}},"componentProfiles":{"desktop":{"fontFamily":"系统 UI 字体","inputMode":"pointer / keyboard","label":"Desktop","metrics":{"compactControlHeight":32,"controlGap":8,"controlHeight":36,"iconTextGap":8,"listRowDouble":52,"listRowSingle":40,"minimumInteractiveTarget":32,"pageGutter":24,"sectionGap":24},"platforms":["macOS","Windows","Linux"],"reference":{"name":"Kai Desktop UI · constrained by macOS, Fluent and GNOME HIG","url":"https://github.com/robeshell/kai-brand-design"},"scaling":"跟随系统显示与字体缩放","typeScale":{"body":{"fontSize":14,"fontWeight":400,"letterSpacing":0,"lineHeight":20},"bodySecondary":{"fontSize":12,"fontWeight":400,"letterSpacing":0,"lineHeight":18},"caption":{"fontSize":12,"fontWeight":400,"letterSpacing":0,"lineHeight":16},"captionSmall":{"fontSize":11,"fontWeight":500,"letterSpacing":0,"lineHeight":16},"displayLarge":{"fontSize":32,"fontWeight":600,"letterSpacing":0,"lineHeight":40},"label":{"fontSize":14,"fontWeight":600,"letterSpacing":0,"lineHeight":20},"pageTitle":{"fontSize":24,"fontWeight":600,"letterSpacing":0,"lineHeight":32},"sectionTitle":{"fontSize":18,"fontWeight":600,"letterSpacing":0,"lineHeight":24},"title":{"fontSize":14,"fontWeight":600,"letterSpacing":0,"lineHeight":20}},"unit":"logical px"},"mobile":{"fontFamily":"系统 UI 字体","inputMode":"touch","label":"Mobile","metrics":{"compactControlHeight":40,"controlGap":12,"controlHeight":48,"iconTextGap":8,"listRowDouble":68,"listRowSingle":52,"minimumInteractiveTarget":48,"pageGutter":16,"sectionGap":24},"platforms":["iOS","iPadOS","Android"],"reference":{"name":"Kai Mobile UI · constrained by Apple HIG and Material 3","url":"https://github.com/robeshell/kai-brand-design"},"scaling":"跟随系统字体缩放","typeScale":{"body":{"fontSize":17,"fontWeight":400,"letterSpacing":0,"lineHeight":24},"bodySecondary":{"fontSize":15,"fontWeight":400,"letterSpacing":0,"lineHeight":20},"caption":{"fontSize":13,"fontWeight":400,"letterSpacing":0,"lineHeight":18},"captionSmall":{"fontSize":11,"fontWeight":500,"letterSpacing":0,"lineHeight":16},"displayLarge":{"fontSize":34,"fontWeight":600,"letterSpacing":0,"lineHeight":42},"label":{"fontSize":16,"fontWeight":600,"letterSpacing":0,"lineHeight":22},"pageTitle":{"fontSize":28,"fontWeight":600,"letterSpacing":0,"lineHeight":36},"sectionTitle":{"fontSize":22,"fontWeight":600,"letterSpacing":0,"lineHeight":28},"title":{"fontSize":17,"fontWeight":600,"letterSpacing":0,"lineHeight":24}},"unit":"logical px"}},"derivedAlphas":{"barrier":{"dialogDark":"black@0.62","dialogLight":"black@0.38"},"border":{"dark":"white@0.10","light":"black@0.08"},"comment":"全品牌通用的派生透明度；实现方不得另行发明数值","destructive":{"disabled":"error@0.025","hoverOrFocus":"error@0.12","pressed":"error@0.16","rest":"error@0.08"},"disabledBorder":{"dark":"white@0.05","light":"black@0.04"},"disabledSubtle":{"dark":"white@0.028","light":"black@0.024"},"hairline":{"dark":"white@0.065","light":"black@0.055"},"selection":{"accentIndicator":"accent@0.10~0.14","chipSelected":"accent@0.09","listTileSelected":"accent@0.035","rowOrSurface":"foreground@0.05~0.055"},"stateLayer":{"focused":"accent@0.16","hover":"foreground@0.055~0.065","pressed":"foreground@0.10"},"status":{"error":{"dark":"#FF7B72","light":"#B42318"},"info":{"dark":"#73A7E8","light":"#2563A6"},"success":{"dark":"#5BC89A","light":"#237A57"},"warning":{"dark":"#E3AC45","light":"#9A640D"}},"subtleFill":{"dark":"white@0.055","light":"black@0.045"}},"iconography":{"opticalStroke":{"compact":1.75,"large":1.5,"regular":1.75},"policy":"优先使用各平台系统图标；同一产品内保持 rounded/outlined 视觉一致，不混用实心与描边表达同一状态。","sizes":{"compact":16,"display":32,"large":24,"regular":20}},"layoutMetrics":{"contentBottomPadding":{"desktop":96,"mobileShell":140},"contentWidth":{"form":720,"reading":680,"standard":920,"wide":1200},"desktopWindow":{"comment":"主窗口逻辑像素（content size）；首次打开居中；可视区不足时钳到 min 与 visibleFrame−80 之间。辅窗（工具窗）属产品层。","defaultHeight":800,"defaultWidth":1280,"minHeight":700,"minWidth":1024},"pageGutter":{"compact":16,"medium":24,"wide":32},"sidebarWidth":{"medium":216,"wide":236},"splitView":{"detailMax":520,"detailMin":360,"detailPreferred":420},"titlebarInset":{"macOS":38,"windows":44}},"motion":{"ambient":{"comment":"环境动效（氛围背景等），reduced-motion 时按 motionStrength 衰减","durationS":14},"paletteTransition":{"comment":"皮肤/配色切换；深夜皮肤 520","durationMs":420},"uiFast":{"curve":"easeOut","durationMs":140},"uiStandard":{"curve":"easeOutCubic","durationMs":160}},"platformProfiles":{"androidMobile":{"fontFamily":"Roboto / Noto Sans（系统解析）","inputMode":"touch","label":"Android","metrics":{"compactControlHeight":40,"controlGap":8,"controlHeight":48,"iconTextGap":12,"listRowDouble":72,"listRowSingle":56,"minimumInteractiveTarget":48,"pageGutter":16,"sectionGap":24},"platforms":["Android"],"reference":{"name":"Material Design 3","url":"https://developer.android.com/develop/ui/compose/designsystems/material3"},"scaling":"系统字体缩放","typeScale":{"body":{"fontSize":16,"fontWeight":400,"letterSpacing":0.5,"lineHeight":24},"bodySecondary":{"fontSize":14,"fontWeight":400,"letterSpacing":0.25,"lineHeight":20},"caption":{"fontSize":12,"fontWeight":400,"letterSpacing":0.4,"lineHeight":16},"captionSmall":{"fontSize":11,"fontWeight":500,"letterSpacing":0.5,"lineHeight":16},"displayLarge":{"fontSize":32,"fontWeight":400,"letterSpacing":0,"lineHeight":40},"label":{"fontSize":14,"fontWeight":500,"letterSpacing":0.1,"lineHeight":20},"pageTitle":{"fontSize":28,"fontWeight":600,"letterSpacing":0,"lineHeight":36},"sectionTitle":{"fontSize":22,"fontWeight":600,"letterSpacing":0,"lineHeight":28},"title":{"fontSize":16,"fontWeight":500,"letterSpacing":0.15,"lineHeight":24}},"unit":"sp / dp"},"appleMobile":{"fontFamily":"SF Pro / PingFang SC（系统解析）","inputMode":"touch","label":"iOS / iPadOS","metrics":{"compactControlHeight":36,"controlGap":12,"controlHeight":44,"iconTextGap":8,"listRowDouble":60,"listRowSingle":44,"minimumInteractiveTarget":44,"pageGutter":16,"sectionGap":24},"platforms":["iOS","iPadOS"],"reference":{"name":"Apple Human Interface Guidelines","url":"https://developer.apple.com/design/human-interface-guidelines/typography"},"scaling":"Dynamic Type","typeScale":{"body":{"fontSize":17,"fontWeight":400,"letterSpacing":0,"lineHeight":22},"bodySecondary":{"fontSize":15,"fontWeight":400,"letterSpacing":0,"lineHeight":20},"caption":{"fontSize":13,"fontWeight":400,"letterSpacing":0,"lineHeight":18},"captionSmall":{"fontSize":11,"fontWeight":500,"letterSpacing":0,"lineHeight":13},"displayLarge":{"fontSize":34,"fontWeight":400,"letterSpacing":0,"lineHeight":41},"label":{"fontSize":17,"fontWeight":500,"letterSpacing":0,"lineHeight":22},"pageTitle":{"fontSize":28,"fontWeight":600,"letterSpacing":0,"lineHeight":34},"sectionTitle":{"fontSize":22,"fontWeight":600,"letterSpacing":0,"lineHeight":28},"title":{"fontSize":17,"fontWeight":600,"letterSpacing":0,"lineHeight":22}},"unit":"pt"},"linuxDesktop":{"fontFamily":"系统 UI 字体（GNOME / KDE 环境解析）","inputMode":"pointer / touch","label":"Linux Desktop","metrics":{"compactControlHeight":28,"controlGap":8,"controlHeight":36,"iconTextGap":8,"listRowDouble":52,"listRowSingle":40,"minimumInteractiveTarget":32,"pageGutter":24,"sectionGap":24},"platforms":["Linux"],"reference":{"name":"GNOME HIG + KDE HIG","url":"https://developer.gnome.org/hig/guidelines/typography.html"},"scaling":"桌面环境字体与显示缩放","typeScale":{"body":{"fontSize":14,"fontWeight":400,"letterSpacing":0,"lineHeight":20},"bodySecondary":{"fontSize":12,"fontWeight":400,"letterSpacing":0,"lineHeight":18},"caption":{"fontSize":12,"fontWeight":400,"letterSpacing":0,"lineHeight":16},"captionSmall":{"fontSize":11,"fontWeight":500,"letterSpacing":0,"lineHeight":16},"displayLarge":{"fontSize":32,"fontWeight":600,"letterSpacing":0,"lineHeight":40},"label":{"fontSize":14,"fontWeight":500,"letterSpacing":0,"lineHeight":20},"pageTitle":{"fontSize":24,"fontWeight":600,"letterSpacing":0,"lineHeight":32},"sectionTitle":{"fontSize":18,"fontWeight":600,"letterSpacing":0,"lineHeight":24},"title":{"fontSize":14,"fontWeight":600,"letterSpacing":0,"lineHeight":20}},"unit":"logical px"},"macDesktop":{"fontFamily":"SF Pro / PingFang SC（系统解析）","inputMode":"pointer","label":"macOS","metrics":{"compactControlHeight":24,"controlGap":8,"controlHeight":32,"iconTextGap":6,"listRowDouble":44,"listRowSingle":32,"minimumInteractiveTarget":28,"pageGutter":24,"sectionGap":24},"platforms":["macOS"],"reference":{"name":"Apple Human Interface Guidelines · macOS","url":"https://developer.apple.com/design/human-interface-guidelines/typography"},"scaling":"系统显示缩放","typeScale":{"body":{"fontSize":13,"fontWeight":400,"letterSpacing":0,"lineHeight":16},"bodySecondary":{"fontSize":11,"fontWeight":400,"letterSpacing":0,"lineHeight":14},"caption":{"fontSize":10,"fontWeight":400,"letterSpacing":0,"lineHeight":13},"captionSmall":{"fontSize":10,"fontWeight":500,"letterSpacing":0,"lineHeight":13},"displayLarge":{"fontSize":26,"fontWeight":400,"letterSpacing":0,"lineHeight":32},"label":{"fontSize":13,"fontWeight":500,"letterSpacing":0,"lineHeight":16},"pageTitle":{"fontSize":22,"fontWeight":600,"letterSpacing":0,"lineHeight":26},"sectionTitle":{"fontSize":17,"fontWeight":600,"letterSpacing":0,"lineHeight":22},"title":{"fontSize":13,"fontWeight":600,"letterSpacing":0,"lineHeight":16}},"unit":"pt"},"windowsDesktop":{"fontFamily":"Segoe UI Variable / Microsoft YaHei UI（系统解析）","inputMode":"pointer / touch","label":"Windows","metrics":{"compactControlHeight":28,"controlGap":8,"controlHeight":32,"iconTextGap":8,"listRowDouble":52,"listRowSingle":40,"minimumInteractiveTarget":32,"pageGutter":24,"sectionGap":24},"platforms":["Windows"],"reference":{"name":"Windows 11 Typography","url":"https://learn.microsoft.com/windows/apps/design/signature-experiences/typography"},"scaling":"有效像素与系统显示缩放","typeScale":{"body":{"fontSize":14,"fontWeight":400,"letterSpacing":0,"lineHeight":20},"bodySecondary":{"fontSize":12,"fontWeight":400,"letterSpacing":0,"lineHeight":16},"caption":{"fontSize":12,"fontWeight":400,"letterSpacing":0,"lineHeight":16},"captionSmall":{"fontSize":12,"fontWeight":400,"letterSpacing":0,"lineHeight":16},"displayLarge":{"fontSize":40,"fontWeight":600,"letterSpacing":0,"lineHeight":52},"label":{"fontSize":14,"fontWeight":600,"letterSpacing":0,"lineHeight":20},"pageTitle":{"fontSize":28,"fontWeight":600,"letterSpacing":0,"lineHeight":36},"sectionTitle":{"fontSize":20,"fontWeight":600,"letterSpacing":0,"lineHeight":28},"title":{"fontSize":14,"fontWeight":600,"letterSpacing":0,"lineHeight":20}},"unit":"epx"}},"radii":{"card":14,"checkbox":5,"control":10,"dialog":20,"menu":12,"pill":999,"sheet":18,"tooltip":8},"spacing":{"comment":"4 的倍数刻度；组件内部微调可用半档（2/6/10），页面级只用下列值","x1":4,"x2":8,"x3":12,"x4":16,"x6":24,"x8":32},"specVersion":"0.6.1","typography":{"componentRoles":{"buttonLabel":"label","desktopNavigation":"body","dialogTitle":"sectionTitle","inputText":"body","listSubtitle":"bodySecondary","listTitle":"label","metadata":"caption","mobileNavigation":"captionSmall","pageTitle":"pageTitle","sectionTitle":"sectionTitle"},"fontPolicy":{"allowProductContentFonts":true,"fallback":[],"family":"system-ui","usePlatformTextStyles":true},"weights":{"body":400,"comment":"界面层使用 regular / medium / semibold；内容层字体由产品登记。","emphasis":500,"strong":600}}}'),Z={kaigua:{product:"kaigua",productSpecVersion:"0.2.0",tokens:{}},kaijuan:{product:"kaijuan",productSpecVersion:"0.2.0",tokens:{"cover.radius":{description:"书籍与漫画窄幅封面的默认圆角",type:"dimension",value:12}}},kaiting:{product:"kaiting",productSpecVersion:"0.2.0",tokens:{"playback.busySpinnerSize":{description:"传输按钮忙碌指示器尺寸",type:"dimension",value:24},"playback.busySpinnerStroke":{description:"传输按钮忙碌指示器线宽",type:"dimension",value:2},"source.local":{description:"本机文件夹来源标识色",type:"color",value:"#55B889"},"source.webDav":{description:"WebDAV 远程来源标识色",type:"color",value:"#5E8BFF"}}}},Y={presets:[{brightness:"light",canvas:"#F7F9FC",description:"品牌的中性浅色玻璃界面",effects:{darkVeilOpacity:.12,lightVeilOpacity:.04,motionDurationS:14,motionStrength:1,paletteTransitionMs:420,primaryGlowOpacity:.9,secondaryGlowOpacity:.72,shadowScale:1},elevated:"#FFFFFF",glass:{blur:20,border:"black@0.07",canvasHighlight:"#FBFBFC",innerHighlight:"white@0.55",mutedText:"#77747D",primaryText:"#1C1C22",secondaryText:"#5A5A62",shadow:"black@0.09",strongBlur:28,strongSurface:"#FFFFFF@0.87",surface:"#FFFFFF@0.72"},id:"default",name:"默认",overlay:"#F1F2F4",surface:"#FAFAFB"},{brightness:"light",canvas:"#F1F4F8",description:"冷静通透的实色表面与清晰层次",effects:{darkVeilOpacity:.08,lightVeilOpacity:.015,motionDurationS:26,motionStrength:.22,paletteTransitionMs:240,primaryGlowOpacity:.38,secondaryGlowOpacity:.24,shadowScale:0},elevated:"#FFFFFF",glass:{blur:0,border:"#526174@0.12",canvasHighlight:"#F8FBFF",innerHighlight:"#FFFFFF@1.0",mutedText:"#718092",primaryText:"#18202A",secondaryText:"#536171",shadow:"transparent",strongBlur:0,strongSurface:"#FFFFFF@1.0",surface:"#FFFFFF@1.0"},id:"pure",name:"纯净",note:"实色皮肤：blur=0 时组件必须跳过 BackdropFilter，shadowScale=0 时无投影。组件读 token 则此行为免费获得。",overlay:"#E5EBF2",surface:"#FAFCFF"},{brightness:"dark",canvas:"#0D0D0F",description:"专注于内容的低亮深色界面",effects:{darkVeilOpacity:.22,lightVeilOpacity:.04,motionDurationS:18,motionStrength:.68,paletteTransitionMs:520,primaryGlowOpacity:.76,secondaryGlowOpacity:.54,shadowScale:1.12},elevated:"#202024",glass:{blur:20,border:"white@0.11",canvasHighlight:"#17171A",innerHighlight:"white@0.12",mutedText:"white@0.70",primaryText:"#F7F3F4",secondaryText:"white@0.60",shadow:"black@0.42",strongBlur:28,strongSurface:"#202024@0.90",surface:"#17171A@0.72"},id:"deep-night",name:"深夜",overlay:"#29292E",surface:"#17171A"}]},Q={pages:{"app-bars":["组件","顶栏与标签","组织页面标题、工具操作、筛选和页内平级导航。"],"app-shell":["APP 结构","应用框架","顶级导航按平台映射，内容和产品能力保持一致。"],buttons:["组件","按钮","覆盖文字按钮、图标按钮、工具按钮和悬浮按钮。一个区域通常只有一个主要操作。"],color:["基础规范","颜色","浅色界面以冷白为主内容背景、浅灰为侧栏背景。珊瑚红是通用强调色，产品需要不同颜色时在产品差异中说明。"],components:["组件","组件基础","查看 Mobile、Desktop 两套组件、基础表面和完整组件入口。平台系统差异只处理行为。"],"content-browser":["APP 结构","内容浏览","集合、搜索、筛选和详情属于一个连续结构，不再拆成多套万能页面。"],"data-display":["组件","数据展示","覆盖卡片、标签、头像、缩略图和表格。展示信息时先保证层级和可读性。"],delivery:["产品与工程","生成文件","设计源文件经过检查后，生成各端可以直接使用的代码和规范快照。"],dialogs:["组件","对话框","对话框用于确认、输入、表单和需要用户完整注意力的任务。"],feedback:["组件","反馈","覆盖轻提示、工具提示、空态、加载和进度。反馈应该说明当前发生了什么。"],icons:["组件","图标","图标负责表达含义，按钮负责命中区域；优先使用各平台系统图标。"],inputs:["组件","输入框","覆盖文本输入、下拉选择和滑杆。控件需要清楚显示焦点、错误和不可编辑状态。"],"list-rows":["组件","列表行","列表行用于设置项、操作项和结构化列表。整行可点击时，状态覆盖整行。"],menus:["组件","菜单与底部弹层","同一组操作在宽屏使用锚定菜单，在窄屏改为底部弹层。"],motion:["基础规范","动效","动效只用于说明界面发生了什么，不用于装饰。"],navigation:["组件","导航","导航用于切换主要目的地。桌面使用侧栏，移动端使用底栏或标签。"],overview:["开始","Kai Design","从这里查看规范内容、修改源文件、运行检查并同步到产品工程。"],platforms:["基础规范","平台基准","五个平台官方数据用于约束和验收；实际组件由 Mobile 与 Desktop 两套 Profile 驱动。"],products:["产品与工程","产品差异","这里只记录不能放进通用规范的主题色、内容样式和特殊页面。"],qa:["产品与工程","检查清单","发布前按外观、产品和窗口大小逐项检查。"],selection:["组件","选择控件","覆盖开关、勾选框、单选项和选择条。选中状态不能只靠颜色表达。"],spacing:["基础规范","间距与圆角","页面间距使用 4px 倍数。圆角按组件用途选择，不按个人感觉调整。"],"status-system":["状态与反馈","通用状态系统","统一加载、进度、空数据、无结果、部分完成、失败和后台任务的表达。"],"task-workspace":["APP 结构","任务工作台","承载扫描、导入、同步和批量处理的准备、执行与结果。"],typography:["基础规范","字体","组件只选择语义文字角色，字号、行高和字重由 Mobile 或 Desktop Profile 提供。"]}},X={accents:U,componentContracts:J,primitives:_,productTokens:Z,skins:Y,viewerContent:Q},ee="0527b7fa6df4c8704ec531fbfe51175f0514a94a4207a76c38d2a6c184166282",te={tokenDigest:ee},c=X,ne=c.viewerContent,ie=c.componentContracts,ae=te,w={kaiting:{character:"沉浸、节奏、封面主角",content:"专辑封面、黑胶与歌词属于内容层。",prefix:"Sound*",differences:[{title:"封面氛围",description:"详情页可以从封面提取背景和控件色，不改变通用界面的颜色规则。",reference:"divergences D1"},{title:"黑胶造型",description:"盘面、唱臂和旋转属于内容表现，不使用通用组件的圆角与形状规则。",reference:"divergences D3"},{title:"歌词层级",description:"正在播放页允许使用更大的歌词字号，但普通界面文字仍遵守通用层级。",reference:"divergences D4"}],patterns:[{title:"资料库与搜索",description:"分类、来源筛选、分组结果和状态恢复。",reference:"patterns/library-and-search.md"},{title:"专辑与艺人详情",description:"封面 Hero、曲目列表、主要操作和氛围边界。",reference:"patterns/album-detail.md"},{title:"正在播放",description:"双栏/单栏、黑胶、歌词、队列和迷你播放器。",reference:"patterns/now-playing.md"}]},kaijuan:{character:"安静、克制、书房感",content:"书页、漫画与窄幅封面属于内容层。",prefix:"App*",differences:[{title:"封面圆角",description:"书籍和漫画封面使用 12px 圆角；普通界面卡片继续使用通用圆角。",reference:"cover.radius · 12px"},{title:"阅读主题",description:"阅读器工具栏跟随当前书页主题取色，退出阅读器后恢复通用界面主题。",reference:"divergences D1"},{title:"内容渲染",description:"书内样式、高亮色和漫画像素属于内容，不反向影响书库、设置和弹窗。",reference:"divergences D2"}],patterns:[{title:"书架与书库",description:"继续阅读、封面网格、筛选与管理态。",reference:"patterns/bookshelf.md"},{title:"书单、合集与导入",description:"整理容器、导入预览、重复项和搜索。",reference:"patterns/collections-and-import.md"},{title:"阅读器",description:"双引擎 chrome、目录、进度、搜索和内容边界。",reference:"patterns/reader.md"}]},kaigua:{character:"清晰、可靠、媒体工作台",content:"海报、剧照与刮削结果属于内容层。",prefix:"Kg*",differences:[{title:"媒体图片",description:"海报和剧照是内容素材，其比例、裁切和颜色不成为通用组件规则。",reference:"content boundary"},{title:"元数据内容",description:"刮削结果和说明文件由产品定义；规范只约束承载它们的界面组件。",reference:"product scope"},{title:"设置结构",description:"设置页继续使用通用的单页分组结构，不保留旧版多标签布局。",reference:"divergences D1"}],patterns:[{title:"媒体资料库",description:"目录、类型筛选、海报/列表和主从详情。",reference:"patterns/media-library.md"},{title:"详情与手动匹配",description:"元数据、候选搜索、确认和危险操作。",reference:"patterns/media-detail-and-match.md"},{title:"批量任务与重命名",description:"预览、冲突、部分失败、清理和日志。",reference:"patterns/batch-tasks-and-renamer.md"}]}},O={fluid:"100%",mobile:"390px",tablet:"820px",medium:"1024px",wide:"1280px"},L={appleMobile:{navigation:"iPhone 使用 Tab Bar；iPad 根据空间使用 Tab Bar 或 Sidebar。",bars:"Navigation Bar 与 Toolbar 承载标题、返回和页面操作。",controls:"使用 Apple 控件结构，保留 44pt 命中目标、动态字体和系统编辑行为。",presentation:"短任务使用 Sheet；沉浸任务可使用 Full-screen Cover。",interaction:"保留滑动返回、安全区域、系统滚动和 VoiceOver 语义。",source:"Apple HIG · SwiftUI / UIKit"},androidMobile:{navigation:"紧凑窗口使用 Navigation Bar；大屏转换为 Navigation Rail 或 Drawer。",bars:"Top App Bar 承载标题、返回和页面级操作。",controls:"使用 Material 3 组件结构，保留 48dp 命中目标和状态层反馈。",presentation:"按任务使用 Dialog、Bottom Sheet 或独立页面。",interaction:"保留系统返回、Edge-to-edge Insets、触控反馈和 TalkBack 语义。",source:"Android Design · Material 3"},macDesktop:{navigation:"使用 Sidebar + Toolbar；页内少量并列内容使用 Segmented Control 或 Tabs。",bars:"窗口 Toolbar 与 Titlebar 共同承载全局和页面操作。",controls:"使用桌面紧凑控件，不放大成手机尺寸。",presentation:"与当前文档相关的短任务使用 Sheet，独立任务使用窗口或 Dialog。",interaction:"完整支持菜单栏、右键、Hover、键盘焦点和快捷键。",source:"macOS HIG · SwiftUI / AppKit"},windowsDesktop:{navigation:"使用 NavigationView，在展开、紧凑和顶部模式之间自适应。",bars:"TitleBar 与 CommandBar 承载导航和命令。",controls:"使用 WinUI 控件结构、焦点视觉和高对比度能力。",presentation:"使用 ContentDialog、Flyout 或独立窗口。",interaction:"完整支持键盘、右键、Hover、系统缩放和窗口贴靠。",source:"Fluent · WinUI 3"},linuxDesktop:{navigation:"以 Sidebar / View Switcher 为默认，跟随目标桌面环境调整。",bars:"Header Bar 或 Toolbar 承载窗口和页面操作。",controls:"以 GNOME/GTK 桌面密度为基准，同时兼容 KDE 主题与快捷键。",presentation:"使用 Dialog、Popover 或独立窗口，避免照搬手机 Bottom Sheet。",interaction:"支持键盘、右键、Hover、系统主题和 Freedesktop 图标语义。",source:"GNOME HIG · GTK/libadwaita；KDE HIG 兼容"}},I=[{label:"开始",items:[{id:"overview",label:"总览"}]},{label:"基础规范",items:[{id:"color",label:"颜色"},{id:"platforms",label:"平台基准"},{id:"typography",label:"字体"},{id:"spacing",label:"间距与圆角"},{id:"motion",label:"动效"}]},{label:"组件",items:[{id:"components",label:"组件基础"},{id:"buttons",label:"按钮"},{id:"inputs",label:"输入框"},{id:"selection",label:"选择控件"},{id:"navigation",label:"导航"},{id:"list-rows",label:"列表行"},{id:"feedback",label:"反馈"},{id:"dialogs",label:"对话框"},{id:"menus",label:"菜单与底部弹层"},{id:"icons",label:"图标"},{id:"app-bars",label:"顶栏与标签"},{id:"data-display",label:"数据展示"}]},{label:"APP 结构",items:[{id:"app-shell",label:"应用框架"},{id:"content-browser",label:"内容浏览"},{id:"task-workspace",label:"任务工作台"}]},{label:"状态与反馈",items:[{id:"status-system",label:"通用状态系统"}]},{label:"产品与工程",items:[{id:"products",label:"产品差异"},{id:"delivery",label:"生成文件"},{id:"qa",label:"检查清单"}]}],F=I.flatMap(e=>e.items);function N(e){return e!=="system"?e:matchMedia("(prefers-color-scheme: dark)").matches?"deep-night":"default"}function x(e,t,n,i="tokens/primitives.json",o="这是三个产品共用的设计变量。"){return{role:e,token:t,value:typeof n=="string"?n:JSON.stringify(n,null,2),source:i,note:o}}const z={page:"overview",skin:"system",product:"kaiting",accent:"coral",viewport:"fluid",platform:"macDesktop",reducedMotion:!1,inspectorOpen:!1};function se(){try{const e=new URLSearchParams(location.search),t=e.get("skin"),n=e.get("product");return{...z,...JSON.parse(localStorage.getItem("kai-viewer-state")??"{}"),...t?{skin:t}:{},...n?{product:n}:{},...e.get("reducedMotion")==="true"?{reducedMotion:!0}:{},inspectorTarget:void 0}}catch{return z}}function oe(e){const{inspectorTarget:t,...n}=e;localStorage.setItem("kai-viewer-state",JSON.stringify(n))}function re(e){if(e==="transparent")return e;const[t,n]=e.split("@");return n?`rgb(${t==="white"?"255 255 255":t==="black"?"0 0 0":`${Number.parseInt(t.slice(1,3),16)} ${Number.parseInt(t.slice(3,5),16)} ${Number.parseInt(t.slice(5,7),16)}`} / ${n})`:t}function ce(e,t,n,i){const o=N(e),a=c.skins.presets.find(f=>f.id===o),p=c.accents.products[t],P=p.presets.find(f=>f.id===n)??p.presets.find(f=>f.id===p.default)??p.presets[0];if(!a||!P)return;const k=o==="default"?{page:"#FFFFFF",sidebar:"#FFFFFF",topbar:"#FFFFFF",demo:"#FFFFFF",subtle:c.primitives.basePalette.mainBackground}:{page:a.canvas,sidebar:a.surface,topbar:a.surface,demo:a.surface,subtle:a.overlay},V=P.accent,v=c.primitives.derivedAlphas,h=a.brightness,S=document.documentElement;S.dataset.skin=o,S.dataset.product=t,S.dataset.motion=i?"reduced":"normal",S.style.colorScheme=a.brightness;const K={"--canvas":a.canvas,"--surface":a.surface,"--elevated":a.elevated,"--overlay":a.overlay,"--canvas-highlight":a.glass.canvasHighlight,"--glass":a.glass.surface,"--glass-strong":a.glass.strongSurface,"--glass-border":a.glass.border,"--shadow-color":a.glass.shadow,"--page-background":k.page,"--sidebar-background":k.sidebar,"--topbar-background":k.topbar,"--demo-background":k.demo,"--subtle-background":k.subtle,"--product-main-background":c.primitives.basePalette.mainBackground,"--product-side-background":c.primitives.basePalette.sideBackground,"--text-primary":a.glass.primaryText,"--text-secondary":a.glass.secondaryText,"--text-muted":a.glass.mutedText,"--accent":V,"--product-accent":P.accent,"--hairline":v.hairline[h],"--border":v.border[h],"--subtle-fill":v.subtleFill[h],"--success":v.status.success[h],"--warning":v.status.warning[h],"--danger":v.status.error[h],"--info":v.status.info[h],"--blur":`${a.glass.blur}px`,"--strong-blur":`${a.glass.strongBlur}px`,"--shadow-scale":a.effects.shadowScale};Object.entries(K).forEach(([f,H])=>{S.style.setProperty(f,typeof H=="string"?re(H):String(H))})}function le(){const e=document.documentElement;Object.entries(c.primitives.spacing).forEach(([t,n])=>{typeof n=="number"&&e.style.setProperty(`--space-${t}`,`${n}px`)}),Object.entries(c.primitives.radii).forEach(([t,n])=>{e.style.setProperty(`--radius-${t}`,`${n}px`)})}function de(e){const t=document.documentElement,n=e.endsWith("Mobile")?"mobile":"desktop",i=c.primitives.componentProfiles[n];t.dataset.platformProfile=e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),t.dataset.componentProfile=n,Object.entries(i.typeScale).forEach(([o,a])=>{const p=o.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();t.style.setProperty(`--viewer-type-${p}-size`,`${a.fontSize}px`),t.style.setProperty(`--viewer-type-${p}-line-height`,`${a.lineHeight}px`)}),Object.entries(i.metrics).forEach(([o,a])=>{const p=o.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();t.style.setProperty(`--viewer-metric-${p}`,`${a}px`)})}const R=document.querySelector("#app");if(!R)throw new Error("Missing #app");const d=R;let r=se(),u=!1;const s=e=>String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),T=e=>{const[t,n]=e.split("@");return n?`rgb(${t==="white"?"255 255 255":t==="black"?"0 0 0":`${Number.parseInt(t.slice(1,3),16)} ${Number.parseInt(t.slice(3,5),16)} ${Number.parseInt(t.slice(5,7),16)}`} / ${n})`:e.startsWith("#")||e==="transparent"?e:"transparent"},$=(e,t,n)=>`<option value="${s(e)}" ${e===n?"selected":""}>${s(t)}</option>`,W=e=>`data-token="${s(e.token)}" data-role="${s(e.role)}" data-value="${s(e.value)}" data-source="${s(e.source)}" data-note="${s(e.note)}"`,A=()=>F.find(e=>e.id===r.page)??F[0],pe=(e,t,n)=>`
  <header class="page-header">
    <span>${s(e)}</span>
    <h1>${s(t)}</h1>
    <p>${s(n)}</p>
  </header>`,m=e=>{const[t,n,i]=ne.pages[e];return pe(t,n,i)},E={基础色板:"base-palette",规范内容:"contents",使用方式:"workflow",修改设计:"edit",怎么判断放在哪里:"placement",当前外观:"appearance",使用规则:"rules","平台 Profile":"platform-profile",语义字体表:"semantic-type",组件映射:"component-map",平台尺寸:"platform-metrics",规则:"rules",间距:"spacing",圆角:"radius",常用时长:"duration",用法:"usage",示例:"examples",组件清单:"catalog",覆盖情况:"coverage",设计变量:"design-tokens",结构示例:"examples",边界:"boundaries",文件:"files",常用命令:"commands",必须通过:"requirements",检查范围:"coverage"},l=(e,t="",n="")=>`
  <div class="section-header" ${n||E[e]?`id="${n||E[e]}"`:""}>
    <h2>${s(e)}</h2>
    ${t?`<p>${s(t)}</p>`:""}
  </div>`,ue=(e,t)=>`
  <aside class="note"><strong>${s(e)}</strong><p>${s(t)}</p></aside>`,M=(e,t="tokens/primitives.json",n)=>`
  <div class="token-table">
    <div class="token-row token-head"><span>用途</span><span>变量</span><span>当前值</span></div>
    ${e.map(i=>{const o=x(i.name,i.token,i.value,t,i.note??n??"这是三个产品共用的设计变量。");return`<button class="token-row inspectable" type="button" ${W(o)}>
          <strong>${s(i.name)}</strong>
          <code>${s(i.token)}</code>
          <code>${s(i.value)}</code>
        </button>`}).join("")}
  </div>`;function me(){return`
    <aside class="sidebar ${u?"mobile-open":""}" id="site-navigation">
      <a class="brand" href="#overview"><b>K</b><span><strong>Kai Design</strong><small>设计规范</small></span></a>
      <nav aria-label="规范目录">
        ${I.map(e=>`
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
      <footer><span>v${s(c.primitives.specVersion)}</span><i></i><small>规范文件已生成</small></footer>
    </aside>`}function ge(){return`
    <header class="topbar">
      <div class="top-title">
        <button id="mobile-nav-toggle" class="mobile-nav-button" type="button"
          aria-label="${u?"关闭目录":"打开目录"}"
          aria-expanded="${u}" aria-controls="site-navigation">${u?"×":"☰"}</button>
        <span><small>${s(A().label)}</small><strong>${s(A().label)}</strong></span>
      </div>
      <div class="top-actions">
        <label class="search"><span>⌕</span><input id="nav-search" type="search" placeholder="搜索目录"></label>
        <label class="select-control skin-control"><span>外观</span><select id="skin">
          ${$("system","跟随系统",r.skin)}
          ${c.skins.presets.map(e=>$(e.id,e.name,r.skin)).join("")}
        </select></label>
        <label class="select-control platform-control"><span>平台</span><select id="platform">
          ${Object.entries(c.primitives.platformProfiles).map(([e,t])=>$(e,t.label,r.platform)).join("")}
        </select></label>
        <button id="motion" class="icon-button ${r.reducedMotion?"active":""}" type="button" title="减少动态效果">≈</button>
        <span class="top-version">v${s(c.primitives.specVersion)}</span>
      </div>
    </header>`}function be(){return`
    <article class="document">
      ${m("overview")}
      <section class="content-section">
        ${l("从这里开始","先选 Mobile 或 Desktop 组件，再处理平台行为、APP 结构和状态。产品特有内容最后处理。","contents")}
        <div class="docs-index">
          <button data-page="color"><span><strong>基础规范</strong><small>颜色、字体、间距、圆角和动效</small></span><i>→</i></button>
          <button data-page="components"><span><strong>组件基础</strong><small>移动、桌面组件和完整组件入口</small></span><i>→</i></button>
          <button data-page="content-browser"><span><strong>APP 结构</strong><small>内容浏览与任务工作台两个主结构</small></span><i>→</i></button>
          <button data-page="status-system"><span><strong>状态与反馈</strong><small>加载、进度、空数据、结果和错误</small></span><i>→</i></button>
          <button data-page="products"><span><strong>产品差异</strong><small>主题色、内容表达和产品特有规则</small></span><i>→</i></button>
        </div>
      </section>
      <section class="content-section">
        ${l("修改与输出","","workflow")}
        <ol class="prose-steps">
          <li><b>找到源文件。</b><span>数值改 <code>tokens/</code>，组件改 <code>components/</code>，结构和状态改 <code>patterns/</code>。</span></li>
          <li><b>完成检查。</b><pre><code>make validate test build check</code></pre></li>
          <li><b>同步到产品。</b><pre><code>python3 tool/kai_design.py sync</code></pre></li>
        </ol>
      </section>
      <section class="content-section">
        ${l("规则放哪里","","placement")}
        <div class="decision-table">
          <div><strong>跨产品共用</strong><span>放入基础、组件、结构或状态规范</span></div>
          <div><strong>单个产品特有</strong><span>放入产品差异，不污染通用规范</span></div>
          <div><strong>开始复用</strong><span>第二个产品需要时再提升为通用规则</span></div>
        </div>
      </section>
    </article>`}function ve(){const e=c.skins.presets.find(i=>i.id===N(r.skin))??c.skins.presets[0],t=[["页面背景","skin.canvas",e.canvas],["内容背景","skin.surface",e.surface],["浮层背景","skin.elevated",e.elevated],["主要文字","skin.glass.primaryText",String(e.glass.primaryText)],["次要文字","skin.glass.secondaryText",String(e.glass.secondaryText)],["边框","skin.glass.border",String(e.glass.border)]],n=[["主内容背景","basePalette.mainBackground",c.primitives.basePalette.mainBackground],["侧栏背景","basePalette.sideBackground",c.primitives.basePalette.sideBackground],["参考主色","basePalette.primary",c.primitives.basePalette.primary]];return`
    <article class="document">
      ${m("color")}
      <section class="content-section">
        ${l("基础色板","三个颜色各有固定职责，不互相替代。")}
        <div class="color-grid base-color-grid">
          ${n.map(([i,o,a])=>{const p=x(i,o,a,"tokens/primitives.json");return`<button class="color-item inspectable" type="button" ${W(p)}>
                <i style="background:${T(a)}"></i>
                <span><strong>${i}</strong><code>${s(a)}</code></span>
              </button>`}).join("")}
        </div>
      </section>
      <section class="content-section">
        ${l("当前外观",`正在查看“${e.name}”外观。可在右上角切换。`)}
        <div class="color-grid">
          ${t.map(([i,o,a])=>{const p=x(i,o,a,`tokens/skins.json#${e.id}`);return`<button class="color-item inspectable" type="button" ${W(p)}>
                <i style="background:${T(a)}"></i>
                <span><strong>${i}</strong><code>${s(a)}</code></span>
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
    </article>`}const q={displayLarge:"展示大标题",pageTitle:"页面标题",sectionTitle:"分区标题",title:"组件标题",body:"正文 / 列表标题",bodySecondary:"次级正文 / 列表副题",label:"按钮与控件标签",caption:"辅助信息",captionSmall:"极小标签"},j={minimumInteractiveTarget:"最小交互目标",controlHeight:"常规控件高度",compactControlHeight:"紧凑控件高度",listRowSingle:"单行列表",listRowDouble:"双行列表",pageGutter:"页面边距",sectionGap:"分区间距",controlGap:"控件间距",iconTextGap:"图标文字间距"};function he(){const e=Object.entries(c.primitives.platformProfiles),t=Object.entries(c.primitives.componentProfiles),n=c.primitives.platformProfiles[r.platform],i=L[r.platform];return`
    <article class="document">
      ${m("platforms")}
      <section class="content-section">
        ${l("组件 Profile","产品组件只读取这两套数值。","component-profile")}
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
        ${l("官方基准","用于确认两套组件没有低于目标平台的可用性要求。","platform-profile")}
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
        ${l(`${n.label} 行为适配`,"切换顶部平台查看。组件视觉不会随这里换皮。","behavior")}
        <div class="platform-behavior-grid">
          <article><strong>导航</strong><p>${s(i.navigation)}</p></article>
          <article><strong>系统栏</strong><p>${s(i.bars)}</p></article>
          <article><strong>弹层</strong><p>${s(i.presentation)}</p></article>
          <article><strong>输入</strong><p>${s(i.interaction)}</p></article>
        </div>
      </section>
      <section class="content-section">
        ${l("使用规则")}
        <ul class="prose-list">
          <li>组件读取 Mobile 或 Desktop Profile，不读取五个平台的视觉数值。</li>
          <li>平台 Profile 只负责系统字体、缩放、命中目标和行为验收。</li>
          <li>窗口宽度只改变布局；不能因为窗口变宽就把移动字号换成桌面字号。</li>
          <li>返回、安全区、键鼠、窗口和系统弹层仍按运行平台适配。</li>
        </ul>
      </section>
    </article>`}function fe(){const e=Object.entries(c.primitives.componentProfiles),t=Object.keys(q);return`
    <article class="document">
      ${m("typography")}
      <section class="content-section">
        ${l("语义字体表","同一语义只输出 Mobile 与 Desktop 两套数值。")}
        <div class="platform-table-wrap">
          <table class="platform-table type-scale-table">
            <thead><tr><th>角色</th>${e.map(([,n])=>`<th>${s(n.label)}</th>`).join("")}</tr></thead>
            <tbody>
              ${t.map(n=>`<tr>
                <th>${q[n]}<code>${n}</code></th>
                ${e.map(([,i])=>{const o=i.typeScale[n];return`<td><strong>${o.fontSize} / ${o.lineHeight}</strong><span>w${o.fontWeight}${o.letterSpacing?` · ${o.letterSpacing}`:""}</span></td>`}).join("")}
              </tr>`).join("")}
            </tbody>
          </table>
        </div>
      </section>
      <section class="content-section">
        ${l("组件映射")}
        <div class="role-map-grid">
          ${Object.entries(c.primitives.typography.componentRoles).map(([n,i])=>`<div><code>${n}</code><span>→</span><strong>${q[i]??i}</strong></div>`).join("")}
        </div>
      </section>
      <section class="content-section">
        ${l("规则")}
        <ul class="prose-list"><li>界面使用平台系统字体与系统缩放；内容字体只能在产品层登记。</li><li>字号与行高必须成对使用，不能只复制字号。</li><li>iOS/iPadOS 正文不得低于默认 17pt；Android 主正文使用 16/24sp。</li><li>辅助信息可以更小，但不得代替正文或列表标题。</li><li>200% 字体缩放时保留同样的信息与操作。</li></ul>
      </section>
    </article>`}function ye(){const e=Object.entries(c.primitives.spacing).filter(([,n])=>typeof n=="number").map(([n,i])=>({name:`间距 ${n}`,token:`spacing.${n}`,value:`${i}px`})),t=Object.entries(c.primitives.radii).map(([n,i])=>({name:`圆角 ${n}`,token:`radii.${n}`,value:`${i}px`}));return`
    <article class="document">
      ${m("spacing")}
      <section class="content-section">
        ${l("间距")}
        <div class="spacing-visual">${e.map(n=>`<div><code>${n.token}</code><i style="width:${n.value}"></i><span>${n.value}</span></div>`).join("")}</div>
        ${M(e)}
      </section>
      <section class="content-section">
        ${l("平台尺寸","基础网格共享，组件高度和交互目标按平台输出。")}
        <div class="platform-table-wrap">
          <table class="platform-table">
            <thead><tr><th>尺寸</th>${Object.values(c.primitives.platformProfiles).map(n=>`<th>${s(n.label)}</th>`).join("")}</tr></thead>
            <tbody>
              ${Object.keys(j).map(n=>`<tr><th>${j[n]}<code>${n}</code></th>${Object.values(c.primitives.platformProfiles).map(i=>`<td><strong>${i.metrics[n]}</strong><span>${s(i.unit)}</span></td>`).join("")}</tr>`).join("")}
            </tbody>
          </table>
        </div>
      </section>
      <section class="content-section">
        ${l("圆角")}
        <div class="radius-visual">${t.map(n=>`<div><i style="border-radius:${n.value}"></i><strong>${n.name.replace("圆角 ","")}</strong><code>${n.value}</code></div>`).join("")}</div>
        ${M(t)}
      </section>
    </article>`}function ke(){return`
    <article class="document">
      ${m("motion")}
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
    </article>`}const b=(e,t)=>`
  <article class="document">
    ${m(e)}
    <section class="content-section">
      ${l("预览","","preview")}
      <div class="component-preview">
        <div class="component-stage">${t}</div>
      </div>
    </section>
  </article>`;function Se(){const t=["buttons","inputs","selection","navigation","list-rows","feedback","dialogs","menus","icons","app-bars","data-display"].map(i=>[i,ie.components[i]]),n=r.platform.endsWith("Mobile")?"mobile":"desktop";return`
    <article class="document">
      ${m("components")}
      <section class="content-section">
        ${l("两套组件","切换顶部平台会选择对应组件，但同一端内不会换皮。","families")}
        <div class="component-family-grid component-foundation-families">
          <article class="${n==="mobile"?"active":""}"><header><strong>Mobile</strong><span>iOS · Android</span></header>${G("mobile",!0)}</article>
          <article class="${n==="desktop"?"active":""}"><header><strong>Desktop</strong><span>macOS · Windows · Linux</span></header>${G("desktop",!0)}</article>
        </div>
      </section>
      <section class="content-section">
        ${l("基础表面","页面、固定栏和浮层只使用这三层。","surfaces")}
        <div class="surface-demo">
          <article class="demo-surface base"><span>页面与容器</span><strong>Surface</strong><small>普通内容和分组。</small></article>
          <article class="demo-surface glass"><span>侧栏与底栏</span><strong>Glass</strong><small>固定界面层。</small></article>
          <article class="demo-surface elevated"><span>菜单与对话框</span><strong>Elevated</strong><small>临时浮层。</small></article>
        </div>
      </section>
      <section class="content-section">
        ${l("全部组件","","catalog")}
        <div class="component-catalog">
          ${t.map(([i,o])=>`<button type="button" data-page="${i}">
              <span><strong>${s(o.name)}</strong><small>${s(o.summary)}</small></span>
              <i>→</i>
            </button>`).join("")}
        </div>
      </section>
    </article>`}function G(e,t=!1){const n=t?" compact":"";return e==="mobile"?`<div class="platform-specimen kai-mobile-specimen${n}">
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
    </div>`:`<div class="platform-specimen desktop-specimen kai-desktop-specimen${n}">
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
  </div>`}function $e(){const e=r.platform.endsWith("Desktop");return b("buttons",`<div class="demo-stack">
      <div class="demo-group"><span>层级</span><div class="button-line"><button class="primary">主要操作</button><button class="secondary">次要操作</button><button class="ghost">文字操作</button><button class="danger">删除</button></div></div>
      <div class="demo-group"><span>尺寸</span><div class="button-line button-sizes"><button class="primary compact">紧凑</button><button class="primary">常规</button><button class="primary large">强调操作</button></div></div>
      <div class="demo-group"><span>状态</span><div class="button-line"><button class="primary">默认</button>${e?'<button class="primary demo-hover">悬停</button>':""}<button class="primary demo-pressed">按下</button><button class="primary" disabled>不可用</button></div></div>
      <div class="demo-group"><span>图标与工具按钮</span><div class="button-line"><button class="demo-icon-button" aria-label="收藏">☆</button><button class="demo-icon-button selected" aria-label="已收藏">★</button><button class="toolbar-button">↻ 重新载入</button><button class="demo-fab" aria-label="添加">＋</button></div></div>
    </div>`)}function we(){return b("inputs",`<div class="field-demo">
      <label><span>默认</span><input placeholder="输入内容"></label>
      <label class="focused"><span>聚焦</span><input value="设计规范"></label>
      <label class="error"><span>输入有误</span><input value="错误内容"><small>请检查输入内容</small></label>
      <label><span>选项</span><select><option>跟随系统</option><option>浅色</option><option>深色</option></select></label>
      <label class="range-field"><span>播放进度</span><input type="range" value="42"></label>
      <label><span>不可编辑</span><input value="固定内容" disabled></label>
    </div>`)}function Fe(){return b("selection",`<div class="demo-stack">
      <div class="demo-group"><span>选择条</span><div class="chip-strip"><button class="active">全部</button><button>最近使用</button><button>已收藏</button><button disabled>不可用</button></div></div>
      <div class="choice-demo">
        <button class="choice toggle" aria-pressed="true"><i class="switch on"><b></b></i><span><strong>自动同步</strong><small>修改后立即生效</small></span></button>
        <button class="choice toggle" aria-pressed="false"><i class="switch"><b></b></i><span><strong>减少动态</strong><small>降低界面移动</small></span></button>
        <button class="choice"><i class="check">✓</i><span><strong>包含说明文件</strong><small>可以选择多个项目</small></span></button>
        <button class="choice"><i class="radio-dot"></i><span><strong>稳定版本</strong><small>单选组中的当前项目</small></span></button>
      </div>
    </div>`)}function Pe(){const e=r.platform==="appleMobile"||r.platform==="androidMobile";return b("navigation",`<div class="nav-preview">
      ${e?'<div class="demo-group"><span>Mobile 底部导航</span><div class="bottom-nav-demo"><button class="active"><b>⌂</b><span>首页</span></button><button><b>◇</b><span>内容</span></button><button><b>⚙</b><span>设置</span></button></div></div>':'<div class="demo-group"><span>Desktop 侧栏</span><div class="side-nav-demo"><button class="active">内容</button><button>任务</button><button>收藏</button><button>设置</button></div></div>'}
      <div class="demo-group"><span>页内平级切换</span><div class="tabs"><button class="active">全部</button><button>最近</button><button>收藏</button></div></div>
    </div>`)}function He(){return b("list-rows",`<div class="list-row-demo">
      <button><i>文</i><span><strong>只有标题</strong></span><b>›</b></button>
      <button><i>自</i><span><strong>自动检查更新</strong><small>每天检查一次</small></span><em class="switch on"><b></b></em></button>
      <button class="selected"><i class="check">✓</i><span><strong>包含说明文件</strong><small>选中状态使用行内标记</small></span><b>已选择</b></button>
      <button disabled><i>锁</i><span><strong>不可使用的项目</strong><small>说明为什么暂时不可用</small></span></button>
      <button class="destructive"><i>删</i><span><strong>移除全部记录</strong></span></button>
    </div>`)}function qe(){const e=r.platform.endsWith("Mobile")?"Mobile 轻提示":"Desktop 状态通知";return b("feedback",`<div class="feedback-demo">
      <div class="feedback-item"><span>${e}</span><div class="snackbar">已保存更改</div></div>
      <div class="feedback-item"><span>工具提示</span><div class="tooltip-sample"><button class="demo-icon-button">?</button><b>查看使用说明</b></div></div>
      <div class="feedback-item wide"><span>空态与加载</span><div class="empty-state"><i>◇</i><strong>还没有内容</strong><p>添加第一项后会显示在这里。</p><button class="secondary">添加内容</button></div><div class="loading-state"><i></i><span>正在载入</span></div></div>
      <div class="feedback-item wide"><span>进度</span><div class="linear-progress"><i style="width:62%"></i></div><small>已完成 62%</small></div>
      <div class="feedback-item wide"><span>滚动条</span><div class="scrollbar-sample"><i></i></div></div>
    </div>`)}function xe(){const e=r.platform.endsWith("Mobile")?"Mobile":"Desktop";return b("dialogs",`<div class="demo-stack">
      <div class="demo-group"><span>${e} 确认对话框</span><div class="dialog-demo">
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
    </div>`)}function Te(){const e=r.platform==="appleMobile"||r.platform==="androidMobile";return b("menus",`<div class="menu-demo">
      <div class="demo-group"><span>${e?"Mobile":"Desktop"} 菜单</span><div class="anchored-menu">
        <header>排序方式</header>
        <button class="selected"><i>↕</i><span>最近修改</span><b>✓</b></button>
        <button><i>字</i><span>按名称</span></button>
        <hr>
        <button class="destructive"><i>删</i><span>清除记录</span></button>
      </div></div>
      ${e?'<div class="demo-group"><span>Mobile 底部弹层</span><div class="sheet-frame"><div class="sheet"><i class="sheet-handle"></i><strong>选择操作</strong><button><span>添加到收藏</span><b>›</b></button><button><span>分享</span><b>›</b></button><button class="destructive"><span>删除</span></button></div></div></div>':'<div class="demo-group"><span>Desktop 右键菜单</span><div class="anchored-menu shortcut-menu"><button class="focused"><i>↗</i><span>打开</span><kbd>Enter</kbd></button><button><i>✎</i><span>重命名</span><kbd>F2</kbd></button><button><i>⧉</i><span>复制</span><kbd>⌘C</kbd></button><hr><button class="destructive"><i>删</i><span>移到废纸篓</span><kbd>⌫</kbd></button></div></div>'}
    </div>`)}function We(){const e=c.primitives.iconography.sizes;return b("icons",`<div class="demo-stack">
      <div class="demo-group"><span>语义尺寸</span><div class="icon-scale-demo">
        ${Object.entries(e).map(([t,n])=>`<article><i style="width:${n}px;height:${n}px;font-size:${Math.max(12,n-2)}px">◇</i><strong>${s(t)}</strong></article>`).join("")}
      </div></div>
      <div class="demo-group"><span>按钮状态</span><div class="button-line"><button class="demo-icon-button" aria-label="搜索">⌕</button><button class="demo-icon-button selected" aria-label="已筛选">▽</button><button class="demo-icon-button demo-pressed" aria-label="更多">•••</button><button class="demo-icon-button" disabled aria-label="不可用">＋</button></div></div>
    </div>`)}function Me(){return b("app-bars",`<div class="demo-stack">
      <div class="demo-group"><span>页面头与主要操作</span><div class="page-header-demo"><div><h3>资料库</h3><p>浏览、筛选和管理全部内容。</p></div><button class="primary">添加内容</button></div></div>
      <div class="demo-group"><span>工具栏</span><div class="toolbar-demo"><label>⌕ <input value="设计规范" aria-label="搜索"></label><button class="secondary">筛选</button><button class="secondary">最近修改</button><span></span><button class="demo-icon-button" aria-label="网格视图">▦</button><button class="demo-icon-button" aria-label="列表视图">☷</button></div></div>
      <div class="demo-group"><span>页内标签</span><div class="tabs"><button class="active">全部</button><button>进行中</button><button>已完成</button></div></div>
    </div>`)}function De(){return b("data-display",`<div class="data-display-demo">
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
    </div>`)}function D(e,t,n){return`
    <article class="document">
      ${m(e)}
      <section class="content-section">${l("结构示例")}<div class="pattern-preview">${t}</div></section>
      <section class="content-section">${l("规则")}<ul class="prose-list">${n.map(i=>`<li>${s(i)}</li>`).join("")}</ul></section>
    </article>`}function Oe(){const e=L[r.platform];return D("app-shell",`<div class="shell platform-shell"><aside><b>K</b><button class="active">内容</button><button>任务</button><button>收藏</button><button>设置</button></aside><main><header><span><small>当前平台</small><strong>${s(c.primitives.platformProfiles[r.platform].label)}</strong></span><button class="primary">添加</button></header><section><article></article><article></article><article></article></section><footer>${s(e.navigation)}</footer></main></div>`,["顶级目的地保持一致，导航控件按当前平台映射。","内容区负责滚动，固定导航不跟随内容移动。","窗口、键盘、返回和安全区域遵循平台，不由品牌层重写。"])}function ze(){return D("content-browser",`<div class="content-browser-demo">
      <header><div><small>内容浏览</small><h3>全部内容</h3></div><button class="primary">添加</button></header>
      <div class="browser-tools"><label>⌕ <input value="" placeholder="搜索内容"></label><button class="secondary">筛选</button><button class="secondary">最近修改</button></div>
      <div class="browser-body">
        <main>${["A","B","C","D","E","F"].map((e,t)=>`<button class="${t===1?"selected":""}"><i>${e}</i><span><strong>项目名称</strong><small>${t+2} 项内容 · 刚刚更新</small></span></button>`).join("")}</main>
        <aside><div class="demo-thumbnail">B</div><h4>项目名称</h4><p>详情是浏览结构的一部分。宽屏显示在侧栏，窄屏进入导航栈。</p><button class="primary">打开</button></aside>
      </div>
    </div>`,["集合、搜索、筛选和详情属于同一结构，不再拆成多套通用页面。","返回时恢复查询、筛选、视图和滚动位置。","内容素材比例、字段和具体操作由产品规范决定。"])}function Ae(){return D("task-workspace",`<div class="task-workspace-demo">
      <header><div><small>扫描 · 第 2 阶段，共 3 阶段</small><h3>正在检查 128 个项目</h3><p>当前：项目 080</p></div><button class="secondary">暂停</button><button class="ghost">取消</button></header>
      <section class="task-progress-block"><div><span>80 / 128</span><b>62%</b></div><div class="linear-progress"><i style="width:62%"></i></div><small>已完成的结果会保留，取消可能需要几秒钟。</small></section>
      <div class="task-results">
        <article><small>完成</small><strong>76</strong></article>
        <article><small>跳过</small><strong>4</strong></article>
        <article class="error"><small>需要处理</small><strong>2</strong></article>
      </div>
      <footer><button class="secondary">查看当前项目</button><button class="secondary">查看失败项</button></footer>
    </div>`,["任务结构固定为准备、运行和结果三个阶段，业务名称可以不同。","总量未知时显示当前阶段，不伪造百分比。","部分失败保留成功结果，只重试失败项。"])}function Ee(){const e=[["首次使用为空","这里还没有内容","添加第一项后会显示在这里。","添加内容","empty"],["搜索无结果","没有找到“设计”","修改关键词或清除当前筛选。","清除筛选","search"],["已有内容刷新失败","暂时无法更新","现有内容仍然可用，可以稍后重试。","重试","inline"],["部分完成","126 项已处理，2 项失败","成功结果已经保留，只需处理失败项。","重试失败项","partial"]];return`
    <article class="document">
      ${m("status-system")}
      <section class="content-section">
        ${l("状态选择","先判断影响范围和恢复方式，再选择展示组件。","decision")}
        <div class="status-decision-grid">
          <article><strong>整页没有内容</strong><span>Empty / Blocking State</span></article>
          <article><strong>已有内容局部变化</strong><span>Inline Status / Progress Row</span></article>
          <article><strong>后台持续任务</strong><span>Persistent Task Status</span></article>
          <article><strong>短暂操作结果</strong><span>平台对应的短反馈</span></article>
        </div>
      </section>
      <section class="content-section">
        ${l("实际状态","同一套信息结构覆盖空数据、无结果、错误和部分完成。","examples")}
        <div class="status-example-grid">${e.map(([t,n,i,o,a])=>`<article class="${a}"><small>${t}</small><i>${a==="partial"?"!":a==="inline"?"↻":"◇"}</i><strong>${n}</strong><p>${i}</p><button class="${a==="empty"?"primary":"secondary"}">${o}</button></article>`).join("")}</div>
      </section>
      <section class="content-section">
        ${l("进度与任务结果","已知总量才显示百分比；未知总量只显示当前阶段。","progress")}
        <div class="progress-example-grid">
          <article><header><strong>正在扫描</strong><span>80 / 128</span></header><div class="linear-progress"><i style="width:62%"></i></div><small>当前：项目 080</small></article>
          <article><header><strong>正在连接服务</strong><span>第 1 阶段</span></header><div class="loading-state"><i></i><span>等待服务响应</span></div><small>总量未知，不显示虚假百分比</small></article>
          <article><header><strong>后台同步</strong><span>可继续使用应用</span></header><div class="linear-progress"><i style="width:38%"></i></div><button class="secondary">查看任务</button></article>
        </div>
      </section>
    </article>`}function je(){const e=c.accents.products[r.product],t=c.productTokens[r.product],n=Object.entries(t.tokens).map(([i,o])=>({name:o.description,token:i,value:typeof o.value=="number"?`${o.value}${o.type==="dimension"?"px":o.type==="duration"?"ms":""}`:o.value}));return`
    <article class="document">
      ${m("products")}
      <div class="page-toolbar">
        <label><span>产品</span><select id="product-inline">${Object.keys(c.accents.products).map(i=>$(i,c.accents.products[i].displayName,r.product)).join("")}</select></label>
        <label><span>主题色</span><select id="accent-inline">${e.presets.map(i=>$(i.id,i.name,r.accent)).join("")}</select></label>
      </div>
      <section class="content-section">
        ${l(e.displayName,`${w[r.product].character}。${w[r.product].content}`,"appearance")}
        <div class="accent-list">${e.presets.map(i=>`<button data-accent-pick="${i.id}" class="${i.id===r.accent?"active":""}"><i style="background:${i.accent}"></i><span><strong>${i.name}</strong><code>${i.accent}</code></span></button>`).join("")}</div>
      </section>
      <section class="content-section">
        ${l("专属规则","这些内容只影响当前产品，不进入基础、组件和页面结构。","differences")}
        <div class="rule-grid">${w[r.product].differences.map(i=>`<article><strong>${s(i.title)}</strong><p>${s(i.description)}</p><code>${s(i.reference)}</code></article>`).join("")}</div>
      </section>
      <section class="content-section">
        ${l("页面规范","每个产品的普通页面和沉浸页面都有明确映射。","product-patterns")}
        <div class="rule-grid">${w[r.product].patterns.map(i=>`<article><strong>${s(i.title)}</strong><p>${s(i.description)}</p><code>${s(i.reference)}</code></article>`).join("")}</div>
      </section>
      <section class="content-section">
        ${l("产品变量","只有当前产品使用的数值也参与生成、校验和同步。","product-tokens")}
        ${n.length?M(n,`products/${r.product}/tokens.json`,"这是当前产品专属的生成变量。"):ue("没有额外变量","当前产品只有内容边界和行为差异，没有需要单独生成的数值。")}
      </section>
      <section class="content-section">
        ${l("边界")}
        <div class="decision-table">
          <div><strong>可以不同</strong><span>主题色、内容表现、产品专属页面</span></div>
          <div><strong>必须共用</strong><span>字体、间距、组件状态、无障碍要求</span></div>
          <div><strong>需要登记</strong><span>任何偏离通用规范的实现</span></div>
        </div>
      </section>
    </article>`}function Ge(){return`
    <article class="document">
      ${m("delivery")}
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
      <p class="digest">内容校验码：<code>${ae.tokenDigest}</code></p>
    </article>`}function Ce(){const e=Object.keys(c.accents.products),t=Object.entries(c.primitives.platformProfiles);return`
    <article class="document">
      ${m("qa")}
      <section class="content-section">
        ${l("必须通过")}
        <div class="check-list">${["生成文件与源文件一致","组件已映射到当前平台的原生结构与行为","品牌覆盖没有改变返回、键盘、焦点和安全区域","两个主结构覆盖产品的浏览与任务流程","加载、进度、空状态、部分完成和错误均有实际示例","窗口缩小时没有内容溢出","减少动态效果后仍可正常操作"].map(n=>`<label><input type="checkbox" checked><span>${n}</span></label>`).join("")}</div>
      </section>
      <section class="content-section">
        ${l("平台范围")}
        <div class="decision-table">${t.map(([n,i])=>`<button type="button" data-qa-platform="${n}" class="${r.platform===n?"active":""}"><strong>${s(i.label)}</strong><span>${i.typeScale.body.fontSize}/${i.typeScale.body.lineHeight} ${s(i.unit)} · target ${i.metrics.minimumInteractiveTarget}</span></button>`).join("")}</div>
      </section>
      <section class="content-section">
        ${l("检查范围")}
        <div class="qa-table">
          <div class="qa-row qa-head"><span>产品</span>${Object.entries(O).map(([n])=>`<span>${n}</span>`).join("")}</div>
          ${e.map(n=>`<div class="qa-row"><strong>${c.accents.products[n].displayName}</strong>${Object.entries(O).map(([i,o])=>`<button data-qa-product="${n}" data-qa-viewport="${i}"><i></i><span>${o}</span></button>`).join("")}</div>`).join("")}
        </div>
      </section>
    </article>`}function Be(){switch(r.page){case"color":return ve();case"platforms":return he();case"typography":return fe();case"spacing":return ye();case"motion":return ke();case"components":return Se();case"buttons":return $e();case"inputs":return we();case"selection":return Fe();case"navigation":return Pe();case"list-rows":return He();case"feedback":return qe();case"dialogs":return xe();case"menus":return Te();case"icons":return We();case"app-bars":return Me();case"data-display":return De();case"app-shell":return Oe();case"content-browser":return ze();case"task-workspace":return Ae();case"status-system":return Ee();case"products":return je();case"delivery":return Ge();case"qa":return Ce();default:return be()}}const C={overview:[["从这里开始","contents"],["修改与输出","workflow"],["规则放哪里","placement"]],color:[["基础色板","base-palette"],["当前外观","appearance"],["使用规则","rules"]],platforms:[["组件 Profile","component-profile"],["官方基准","platform-profile"],["平台行为","behavior"],["使用规则","rules"]],typography:[["语义字体表","semantic-type"],["组件映射","component-map"],["规则","rules"]],spacing:[["间距","spacing"],["平台尺寸","platform-metrics"],["圆角","radius"]],motion:[["常用时长","duration"],["规则","rules"]],components:[["两套组件","families"],["基础表面","surfaces"],["全部组件","catalog"]],buttons:[["预览","preview"]],inputs:[["预览","preview"]],selection:[["预览","preview"]],navigation:[["预览","preview"]],"list-rows":[["预览","preview"]],feedback:[["预览","preview"]],dialogs:[["预览","preview"]],menus:[["预览","preview"]],icons:[["预览","preview"]],"app-bars":[["预览","preview"]],"data-display":[["预览","preview"]],"app-shell":[["结构示例","examples"],["规则","rules"]],"content-browser":[["结构示例","examples"],["规则","rules"]],"task-workspace":[["结构示例","examples"],["规则","rules"]],"status-system":[["状态选择","decision"],["实际状态","examples"],["进度与任务结果","progress"]],products:[["当前产品","appearance"],["专属规则","differences"],["页面规范","product-patterns"],["产品变量","product-tokens"],["边界","boundaries"]],delivery:[["文件","files"],["常用命令","commands"]],qa:[["必须通过","requirements"],["检查范围","coverage"]]};function Le(){return`<aside class="page-toc" aria-label="本页内容">
    <strong>本页内容</strong>
    ${(C[r.page]??C.overview??[]).map(([t,n])=>`<a href="#${n}" data-section-link="${n}">${s(t)}</a>`).join("")}
  </aside>`}function Ie(){const e=r.inspectorTarget;return`
    <aside class="inspector ${r.inspectorOpen?"open":""}">
      <header><span><small>变量详情</small><strong>查看具体数值</strong></span><button id="inspector-close" type="button">×</button></header>
      ${e?`<main>
            <div class="token-preview" style="--token-value:${T(e.value)}"><i></i></div>
            <dl>
              <div><dt>用途</dt><dd>${s(e.role)}</dd></div>
              <div><dt>变量名</dt><dd><code>${s(e.token)}</code></dd></div>
              <div><dt>当前值</dt><dd><code>${s(e.value)}</code></dd></div>
              <div><dt>来自</dt><dd>${s(e.source)}</dd></div>
              <div><dt>说明</dt><dd>${s(e.note)}</dd></div>
            </dl>
          </main>`:'<div class="inspector-empty"><strong>先选一个变量</strong><p>点击颜色、间距、圆角或变量表格中的一行。</p></div>'}
    </aside>`}function g(e){r={...r,...e},oe(r),y()}function Ne(){d.querySelectorAll("[data-page]").forEach(e=>{e.addEventListener("click",()=>{const t=e.dataset.page;u=!1,history.replaceState(null,"",`#${t}`),g({page:t}),window.scrollTo({top:0})})}),d.querySelector("#mobile-nav-toggle")?.addEventListener("click",()=>{u=!u,y(),u&&requestAnimationFrame(()=>d.querySelector(".sidebar nav button.active")?.focus())}),d.querySelector("#mobile-nav-backdrop")?.addEventListener("click",()=>{u=!1,y()}),d.onkeydown=e=>{e.key==="Escape"&&u&&(u=!1,y(),requestAnimationFrame(()=>d.querySelector("#mobile-nav-toggle")?.focus()))},d.querySelector("#skin")?.addEventListener("change",e=>{g({skin:e.target.value})}),d.querySelector("#platform")?.addEventListener("change",e=>{g({platform:e.target.value})}),d.querySelector("#motion")?.addEventListener("click",()=>g({reducedMotion:!r.reducedMotion})),d.querySelector("#inspector-close")?.addEventListener("click",()=>g({inspectorOpen:!1})),d.querySelectorAll("[data-token]").forEach(e=>{e.addEventListener("click",()=>g({inspectorOpen:!0,inspectorTarget:{token:e.dataset.token??"",role:e.dataset.role??"",value:e.dataset.value??"",source:e.dataset.source??"",note:e.dataset.note??""}}))}),d.querySelector("#product-inline")?.addEventListener("change",e=>{const t=e.target.value;g({product:t,accent:c.accents.products[t].default})}),d.querySelector("#accent-inline")?.addEventListener("change",e=>g({accent:e.target.value})),d.querySelectorAll("[data-accent-pick]").forEach(e=>e.addEventListener("click",()=>g({accent:e.dataset.accentPick??r.accent}))),d.querySelectorAll("[data-qa-product]").forEach(e=>e.addEventListener("click",()=>{const t=e.dataset.qaProduct;g({product:t,viewport:e.dataset.qaViewport,accent:c.accents.products[t].default})})),d.querySelectorAll("[data-qa-platform]").forEach(e=>{e.addEventListener("click",()=>g({platform:e.dataset.qaPlatform}))}),d.querySelectorAll("[data-section-link]").forEach(e=>{e.addEventListener("click",t=>{t.preventDefault(),d.querySelector(`#${e.dataset.sectionLink}`)?.scrollIntoView({behavior:r.reducedMotion?"auto":"smooth"})})}),d.querySelectorAll(".toggle").forEach(e=>e.addEventListener("click",()=>{const t=e.getAttribute("aria-pressed")!=="true";e.setAttribute("aria-pressed",String(t)),e.querySelector(".switch")?.classList.toggle("on",t)})),d.querySelector("#nav-search")?.addEventListener("input",e=>{const t=e.target.value.trim().toLowerCase();d.querySelectorAll("[data-nav-label]").forEach(n=>{n.hidden=!!t&&!(n.dataset.navLabel??"").toLowerCase().includes(t)})})}function y(){const e=c.accents.products[r.product];e.presets.some(t=>t.id===r.accent)||(r.accent=e.default),ce(r.skin,r.product,r.accent,r.reducedMotion),de(r.platform),d.innerHTML=`<div class="workbench ${r.inspectorOpen?"with-inspector":""} ${u?"mobile-nav-open":""}">${me()}${u?'<button id="mobile-nav-backdrop" class="mobile-nav-backdrop" type="button" aria-label="关闭目录"></button>':""}<div class="workspace">${ge()}<main class="content"><div class="doc-layout">${Be()}${Le()}</div></main></div>${Ie()}</div>`,Ne()}const B=location.hash.slice(1);F.some(e=>e.id===B)&&(r.page=B);F.some(e=>e.id===r.page)||(r.page="overview");le();matchMedia("(prefers-color-scheme: dark)").addEventListener("change",()=>r.skin==="system"&&y());y();

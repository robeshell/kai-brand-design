(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const p of n.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&a(p)}).observe(document,{childList:!0,subtree:!0});function s(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(r){if(r.ep)return;r.ep=!0;const n=s(r);fetch(r.href,n)}})();const R={products:{kaigua:{default:"indigo",displayName:"开刮",note:"单值模型：hover/pressed 由通用 stateLayer 前景叠加表达，不设独立 accent hover 色",presets:[{accent:"#6673C7",id:"indigo",name:"靛蓝"},{accent:"#3F9E98",id:"teal",name:"青绿"},{accent:"#0284C7",id:"sky",name:"晴空"},{accent:"#475569",id:"slate",name:"岩灰"}]},kaijuan:{default:"ember",displayName:"开卷",note:"单值模型：hover/pressed 由通用 stateLayer 前景叠加表达，不设独立 accent hover 色",presets:[{accent:"#EA580C",id:"ember",name:"暖橙"},{accent:"#0284C7",id:"sky",name:"晴空"},{accent:"#047857",id:"forest",name:"松绿"},{accent:"#BE123C",id:"rose",name:"绯红"},{accent:"#475569",id:"slate",name:"岩灰"}]},kaiting:{customDerive:"自定义色：hover = lerp(accent, white, 0.14)，pressed = lerp(accent, black, 0.13)",default:"coral",displayName:"开听",presets:[{accent:"#FF5A4D",hover:"#FF7567",id:"coral",name:"珊瑚",pressed:"#E3483E"},{accent:"#D95770",hover:"#E66C82",id:"rose",name:"玫瑰",pressed:"#BF465D"},{accent:"#6673C7",hover:"#7884D2",id:"indigo",name:"靛蓝",pressed:"#5360AE"},{accent:"#3F9E98",hover:"#51ADA7",id:"teal",name:"青绿",pressed:"#338781"},{accent:"#C7842F",hover:"#D4953F",id:"amber",name:"暖金",pressed:"#AB6E24"},{accent:"#8067BC",hover:"#9279C8",id:"violet",name:"紫罗兰",pressed:"#6D54A5"}]}}},K=JSON.parse('{"components":{"buttons":{"accessibility":["纯图标按钮必须提供可访问名称和工具提示。","按钮文字使用动作动词，不使用含糊的“确定”。","键盘操作和指针操作必须触发同一结果。"],"name":"按钮","states":[{"description":"显示完整标签和当前层级。","name":"默认","required":true},{"description":"背景加深，不能改变尺寸。","name":"悬停","required":true},{"description":"背景进一步加深，反馈立即出现。","name":"按下","required":true},{"description":"显示清楚的外侧焦点环。","name":"键盘聚焦","required":true},{"description":"保留按钮宽度并阻止重复提交。","name":"加载","required":true},{"description":"降低对比度且不可触发。","name":"禁用","required":true}],"summary":"触发操作，按重要程度区分主要、次要、文字、危险和图标按钮。","tokens":[{"name":"控件圆角","token":"radii.control","value":"10px"},{"name":"按钮最小高度","token":"tapTargets.buttonMin","value":"36px"},{"name":"状态动效","token":"motion.uiStandard","value":"160ms"}],"usage":["主要按钮用于当前区域最重要的操作。","危险操作必须使用明确动词，并提供确认或撤销。","不要用按钮代替导航链接。"],"variants":[{"description":"当前区域最重要且最希望用户完成的操作。","name":"主要按钮"},{"description":"与主要操作并列，但优先级更低。","name":"次要按钮"},{"description":"轻量操作或不会中断当前任务的入口。","name":"文字按钮"},{"description":"删除或不可逆操作，必须使用明确动词。","name":"危险按钮"},{"description":"空间有限且图标含义足够明确的工具操作。","name":"图标按钮"}]},"data-display":{"accessibility":["状态标签必须有文字，不能只靠颜色表达。","信息图片提供替代文字，装饰图片使用空替代文字。","表格提供表头和可读取的排序状态。"],"name":"数据展示","states":[{"description":"标题、说明和辅助信息层级清楚。","name":"默认","required":true},{"description":"保留结构，避免内容出现时整体跳动。","name":"加载","required":true},{"description":"说明当前没有数据。","name":"空","required":true},{"description":"说明失败原因，并提供恢复方式。","name":"错误","required":true}],"summary":"使用卡片、标签、头像、缩略图和表格展示结构化信息。","tokens":[{"name":"卡片圆角","token":"radii.card","value":"14px"},{"name":"标题字号","token":"typography.sizes.rowTitle","value":"13.5px"},{"name":"轻背景","token":"derivedAlphas.subtleFill","value":"foreground 4.5%"}],"usage":["只有信息可以独立理解或需要整体操作时才使用卡片。","一列简单内容优先使用列表行，多列比较才使用表格。","缩略图是辅助信息，不能替代文字标题。"],"variants":[{"description":"展示可以独立理解的一组信息。","name":"信息卡片"},{"description":"表达简短分类、属性或当前状态。","name":"标签与状态"},{"description":"帮助识别人或对象。","name":"头像与缩略图"},{"description":"比较多条记录的相同字段。","name":"表格"}]},"dialogs":{"accessibility":["打开后焦点移入，关闭后焦点回到触发位置。","标题与对话框建立程序关联，背景内容不可操作。","支持 Escape 关闭；破坏性流程仍需明确取消入口。"],"name":"对话框","states":[{"description":"标题、内容和操作区完整显示。","name":"默认","required":true},{"description":"打开后焦点进入首个合理控件。","name":"键盘聚焦","required":true},{"description":"保留尺寸并阻止重复提交。","name":"提交中","required":true},{"description":"错误靠近对应字段显示。","name":"输入有误","required":true},{"description":"提交条件未满足时禁用主要操作。","name":"禁用","required":true}],"summary":"要求用户确认、输入或完成短任务，并把注意力暂时集中到一个明确范围。","tokens":[{"name":"对话框圆角","token":"radii.dialog","value":"20px"},{"name":"最大宽度","token":"component.dialog.maxWidth","value":"520px"},{"name":"遮罩","token":"component.dialog.barrier","value":"black 38% / 62%"},{"name":"按钮间距","token":"component.dialog.actionGap","value":"10px"}],"usage":["需要用户确认不可逆操作，或完成一段短任务时使用。","简单选择优先使用菜单，不要把对话框当作普通信息卡片。","内容过高时只滚动内容区，标题和按钮区保持可见。"],"variants":[{"description":"确认有明显影响或不可逆的操作。","name":"确认对话框"},{"description":"完成一个字段或少量字段的短任务。","name":"输入对话框"},{"description":"完成仍可在一个视口内理解的小型表单。","name":"表单对话框"}]},"feedback":{"accessibility":["动态结果使用合适的状态播报，不抢走当前焦点。","加载状态提供文字说明，不能只有旋转图形。","错误信息不能只靠颜色表达。"],"name":"反馈","states":[{"description":"中性说明，不要求立即处理。","name":"提示","required":true},{"description":"任务正在进行，避免重复触发。","name":"加载","required":true},{"description":"确认操作已完成。","name":"成功","required":true},{"description":"提醒潜在影响，操作仍可继续。","name":"警告","required":true},{"description":"任务失败，提供恢复办法。","name":"错误","required":true}],"summary":"说明操作结果、加载进度、空内容和错误，让用户知道当前发生了什么。","tokens":[{"name":"轻提示圆角","token":"radii.menu","value":"12px"},{"name":"轻提示时长","token":"component.feedback.snackbarDuration","value":"2.2s"},{"name":"提示延迟","token":"component.feedback.tooltipDelay","value":"450ms"},{"name":"加载圈","token":"component.feedback.spinner","value":"24px / 2px"}],"usage":["短暂完成结果使用轻提示；需要用户处理的问题不要自动消失。","空态说明为什么没有内容，并在有明确下一步时提供操作。","加载和进度使用统一尺寸与强调色，不单独硬编码。"],"variants":[{"description":"短暂显示已完成的结果，可提供撤销。","name":"轻提示"},{"description":"解释图标或不熟悉的短标签。","name":"工具提示"},{"description":"解释为什么没有内容，并给出下一步。","name":"空状态"},{"description":"表示等待或可计算的完成程度。","name":"加载与进度"},{"description":"说明失败原因和恢复方式。","name":"错误状态"}]},"inputs":{"accessibility":["每个输入框都有持续可见的标签，不能只依赖占位文字。","错误信息与输入框建立程序关联，并说明如何修正。","输入目的明确时提供正确的自动填充语义。"],"name":"输入框","states":[{"description":"显示标签、输入面和当前值。","name":"默认","required":true},{"description":"边框对比度轻微提高。","name":"悬停","required":true},{"description":"控件自身显示 2px 强调色边框，不增加外侧 outline。","name":"键盘聚焦","required":true},{"description":"错误边框和修正说明同时出现。","name":"输入有误","required":true},{"description":"内容可选择复制，但不可修改。","name":"只读","required":true},{"description":"不可聚焦，并说明不可用原因。","name":"禁用","required":true}],"summary":"收集或修改文本、选项和连续数值，标签、帮助和错误信息属于同一个控件。","tokens":[{"name":"输入框圆角","token":"radii.control","value":"10px"},{"name":"输入文字","token":"typography.sizes.rowTitle","value":"13.5px"},{"name":"焦点边框","token":"component.input.focusBorder","value":"2px · 无外侧 outline"}],"usage":["标签写清楚需要填写什么，不要只依赖占位文字。","错误提示放在输入框附近，并说明如何修正。","不可编辑和只读状态需要清楚区分。"],"variants":[{"description":"输入短文本或单个值。","name":"文本输入"},{"description":"筛选当前内容，支持清除。","name":"搜索输入"},{"description":"输入较长内容，允许垂直扩展。","name":"多行输入"},{"description":"从有限选项中选择一项。","name":"下拉选择"},{"description":"调整允许近似选择的连续数值。","name":"滑杆"}]},"list-rows":{"accessibility":["整行可点击时使用按钮或链接语义，不能只绑定容器点击。","尾部控件有独立操作时，避免与整行操作冲突。","标题截断后仍能通过可访问名称读取完整内容。"],"name":"列表行","states":[{"description":"标题和辅助信息层级清楚。","name":"默认","required":true},{"description":"整行出现轻背景。","name":"悬停","required":true},{"description":"焦点覆盖整行可点击区域。","name":"键盘聚焦","required":true},{"description":"使用勾选或明确文字表达。","name":"选中","required":true},{"description":"不可触发且说明原因。","name":"禁用","required":true}],"summary":"承载设置项、操作项和带辅助信息的结构化列表。","tokens":[{"name":"普通行高度","token":"component.listRow.minHeight","value":"54px"},{"name":"设置行高度","token":"component.listRow.settingsHeight","value":"64px"},{"name":"控件圆角","token":"radii.control","value":"10px"},{"name":"标题字号","token":"typography.sizes.rowTitle","value":"13.5px"}],"usage":["设置项、弹层操作项和带副标题的结构化列表使用列表行。","整行点击时必须提供完整的键盘焦点和按钮语义。","选中态使用勾选或文字表达，不使用大面积强调色填充。"],"variants":[{"description":"标题、可选图标和尾部信息。","name":"基础行"},{"description":"标题下增加一行简短说明。","name":"说明行"},{"description":"整行切换选择，并显示当前结果。","name":"选择行"},{"description":"执行删除等高风险操作。","name":"危险行"}]},"menus":{"accessibility":["打开后焦点进入菜单，关闭后回到触发位置。","支持方向键、Enter 和 Escape。","危险项目不能只使用红色区分。"],"name":"菜单与底部弹层","states":[{"description":"菜单项显示图标、标签和可选说明。","name":"默认","required":true},{"description":"当前指向项出现轻背景。","name":"悬停","required":true},{"description":"方向键移动焦点并保持在菜单内。","name":"键盘聚焦","required":true},{"description":"使用勾选和文字共同表达。","name":"选中","required":true},{"description":"保留项目位置但不可触发。","name":"禁用","required":true}],"summary":"承载与触发位置相关的短操作列表，并在窄屏切换为底部弹层。","tokens":[{"name":"菜单圆角","token":"radii.menu","value":"12px"},{"name":"菜单宽度","token":"component.menu.width","value":"160–280px"},{"name":"菜单行高","token":"component.menu.rowHeight","value":"36px"},{"name":"弹层顶角","token":"radii.sheet","value":"18px"},{"name":"拖拽把手","token":"component.sheet.handle","value":"38×4px"}],"usage":["与触发位置相关的短操作列表使用锚定菜单。","窄屏自动切换为底部弹层，并保留安全区域。","菜单宽度由内容决定，长列表需要限制高度并允许滚动。"],"variants":[{"description":"宽屏中靠近触发位置显示的短操作列表。","name":"锚定菜单"},{"description":"窄屏中使用更大行高和安全区域的操作列表。","name":"底部弹层"},{"description":"显示当前选择，并允许切换。","name":"选择菜单"}]},"navigation":{"accessibility":["当前页面使用 current page 语义。","图标导航必须同时提供短标签。","键盘顺序与视觉顺序一致。"],"name":"导航","states":[{"description":"未选项目保持足够可读。","name":"默认","required":true},{"description":"出现轻背景，不移动内容。","name":"悬停","required":true},{"description":"完整导航项显示焦点。","name":"键盘聚焦","required":true},{"description":"文字和图形共同指示当前位置。","name":"当前","required":true},{"description":"仅在目的地确实不可进入时使用。","name":"禁用","required":true}],"summary":"切换主要目的地，桌面侧栏、移动底栏和页内标签共享当前项语义。","tokens":[{"name":"侧栏宽度","token":"layoutMetrics.sidebarWidth","value":"216 / 236px"},{"name":"桌面导航文字","token":"typography.sizes.rowTitle","value":"13.5px"},{"name":"移动导航文字","token":"typography.sizes.navLabel","value":"10.5px"},{"name":"选中背景","token":"component.navigation.selection","value":"accent 10%"},{"name":"侧栏材质","token":"component.navigation.chrome","value":"GlassSurface strong"}],"usage":["当前项必须清楚可见，同一组中只有一个当前项。","桌面侧栏和移动底栏共享目的地，但尺寸不同。","不要把普通操作混进主导航。"],"variants":[{"description":"宽屏中的一级目的地和分组。","name":"桌面侧栏"},{"description":"窄屏中 3–5 个一级目的地。","name":"移动底栏"},{"description":"同一页面内平级内容的切换。","name":"页内标签"}]},"selection":{"accessibility":["控件与标签组成同一个可点击区域。","选中状态不能只靠颜色表达。","一组单选项使用共同的组名称。"],"name":"选择控件","states":[{"description":"未选择，标签仍保持清楚。","name":"默认","required":true},{"description":"触控区域出现轻微反馈。","name":"悬停","required":true},{"description":"整个可操作区域显示焦点。","name":"键盘聚焦","required":true},{"description":"图形、文字或勾选同时表达结果。","name":"选中","required":true},{"description":"仅用于勾选框的部分选择状态。","name":"混合","required":false},{"description":"保留当前值但不可修改。","name":"禁用","required":true}],"summary":"在有限选项间切换，覆盖开关、勾选框、单选项和选择条。","tokens":[{"name":"选中背景","token":"derivedAlphas.selection","value":"accent 10%"},{"name":"勾选框圆角","token":"radii.checkbox","value":"5px"},{"name":"状态动效","token":"motion.uiStandard","value":"160ms"}],"usage":["开关变化后立即生效，不需要再放保存按钮。","不能只靠颜色表达是否选中。","一组单选项只能有一个选中状态。"],"variants":[{"description":"控制立即生效的开与关。","name":"开关"},{"description":"从一组项目中选择零个或多个。","name":"勾选框"},{"description":"从一组互斥选项中选择一个。","name":"单选项"},{"description":"在少量并列选项中快速切换。","name":"选择条"}]},"surfaces":{"accessibility":["纯布局容器不添加按钮或分组语义。","可点击容器必须使用按钮或链接语义，不能只监听容器点击。"],"name":"表面与容器","states":[{"description":"使用当前外观的表面、边框和阴影。","name":"默认","required":true},{"description":"容器可点击时才增加轻状态层。","name":"悬停","required":true},{"description":"可操作容器显示明确焦点。","name":"键盘聚焦","required":true},{"description":"容器本身不禁用，禁用由内部控件表达。","name":"禁用","required":false}],"summary":"承载页面分区、卡片、菜单和对话框，并根据外观切换玻璃、边框和阴影。","tokens":[{"name":"卡片圆角","token":"radii.card","value":"14px"},{"name":"菜单圆角","token":"radii.menu","value":"12px"},{"name":"对话框圆角","token":"radii.dialog","value":"20px"}],"usage":["普通页面分区使用基础表面；固定导航和浮层使用强玻璃表面。","不要为了分组给每一块内容都增加卡片、阴影或模糊。","玻璃效果关闭时仍保留边框和层级，不能依赖模糊表达结构。"],"variants":[{"description":"页面内的普通内容分区。","name":"基础表面"},{"description":"侧栏、底栏和浮层等固定界面层。","name":"强玻璃表面"},{"description":"菜单、对话框和需要与页面分离的内容。","name":"浮层表面"}]}},"contractVersion":"0.2.0"}'),W={basePalette:{mainBackground:"#F7F9FC",primary:"#FF5A4D",sideBackground:"#F3F5F8"},radii:{card:14,checkbox:5,control:10,dialog:20,menu:12,pill:999,sheet:18,tooltip:8},spacing:{comment:"4 的倍数刻度；组件内部微调可用半档（2/6/10），页面级只用下列值",x1:4,x2:8,x3:12,x4:16,x6:24,x8:32},specVersion:"0.4.0"},z={kaigua:{product:"kaigua",productSpecVersion:"0.1.1",tokens:{}},kaijuan:{product:"kaijuan",productSpecVersion:"0.1.1",tokens:{"cover.radius":{description:"书籍与漫画窄幅封面的默认圆角",type:"dimension",value:12}}},kaiting:{product:"kaiting",productSpecVersion:"0.1.0",tokens:{"playback.busySpinnerSize":{description:"传输按钮忙碌指示器尺寸",type:"dimension",value:24},"playback.busySpinnerStroke":{description:"传输按钮忙碌指示器线宽",type:"dimension",value:2},"source.local":{description:"本机文件夹来源标识色",type:"color",value:"#55B889"},"source.webDav":{description:"WebDAV 远程来源标识色",type:"color",value:"#5E8BFF"}}}},J={presets:[{brightness:"light",canvas:"#F7F9FC",description:"品牌的中性浅色玻璃界面",effects:{darkVeilOpacity:.12,lightVeilOpacity:.04,motionDurationS:14,motionStrength:1,paletteTransitionMs:420,primaryGlowOpacity:.9,secondaryGlowOpacity:.72,shadowScale:1},elevated:"#FFFFFF",glass:{blur:20,border:"black@0.07",canvasHighlight:"#FBFBFC",innerHighlight:"white@0.55",mutedText:"#77747D",primaryText:"#1C1C22",secondaryText:"#5A5A62",shadow:"black@0.09",strongBlur:28,strongSurface:"#FFFFFF@0.87",surface:"#FFFFFF@0.72"},id:"default",name:"默认",overlay:"#F1F2F4",surface:"#FAFAFB"},{brightness:"light",canvas:"#F1F4F8",description:"冷静通透的实色表面与清晰层次",effects:{darkVeilOpacity:.08,lightVeilOpacity:.015,motionDurationS:26,motionStrength:.22,paletteTransitionMs:240,primaryGlowOpacity:.38,secondaryGlowOpacity:.24,shadowScale:0},elevated:"#FFFFFF",glass:{blur:0,border:"#526174@0.12",canvasHighlight:"#F8FBFF",innerHighlight:"#FFFFFF@1.0",mutedText:"#718092",primaryText:"#18202A",secondaryText:"#536171",shadow:"transparent",strongBlur:0,strongSurface:"#FFFFFF@1.0",surface:"#FFFFFF@1.0"},id:"pure",name:"纯净",note:"实色皮肤：blur=0 时组件必须跳过 BackdropFilter，shadowScale=0 时无投影。组件读 token 则此行为免费获得。",overlay:"#E5EBF2",surface:"#FAFCFF"},{brightness:"dark",canvas:"#0D0D0F",description:"专注于内容的低亮深色界面",effects:{darkVeilOpacity:.22,lightVeilOpacity:.04,motionDurationS:18,motionStrength:.68,paletteTransitionMs:520,primaryGlowOpacity:.76,secondaryGlowOpacity:.54,shadowScale:1.12},elevated:"#202024",glass:{blur:20,border:"white@0.11",canvasHighlight:"#17171A",innerHighlight:"white@0.12",mutedText:"white@0.70",primaryText:"#F7F3F4",secondaryText:"white@0.60",shadow:"black@0.42",strongBlur:28,strongSurface:"#202024@0.90",surface:"#17171A@0.72"},id:"deep-night",name:"深夜",overlay:"#29292E",surface:"#17171A"}]},_={pages:{"app-shell":["页面结构","应用框架","桌面使用侧栏，窄屏使用底部导航。内容区保持同一套层级。"],buttons:["组件","按钮","覆盖文字按钮、图标按钮、工具按钮和悬浮按钮。一个区域通常只有一个主要操作。"],color:["基础规范","颜色","浅色界面以冷白为主内容背景、浅灰为侧栏背景。珊瑚红是通用强调色，产品需要不同颜色时在产品差异中说明。"],components:["组件","组件总览","查找现有组件，确认是否可以直接复用。"],"data-display":["组件","数据展示","覆盖卡片、标签、头像、缩略图和表格。展示信息时先保证层级和可读性。"],delivery:["产品与工程","生成文件","设计源文件经过检查后，生成各端可以直接使用的代码和规范快照。"],dialogs:["组件","对话框","对话框用于确认、输入、表单和需要用户完整注意力的任务。"],feedback:["组件","反馈","覆盖轻提示、工具提示、空态、加载和进度。反馈应该说明当前发生了什么。"],"getting-started":["开始","怎么使用","设计师和工程师都从同一份规范出发。"],inputs:["组件","输入框","覆盖文本输入、下拉选择和滑杆。控件需要清楚显示焦点、错误和不可编辑状态。"],"list-rows":["组件","列表行","列表行用于设置项、操作项和结构化列表。整行可点击时，状态覆盖整行。"],menus:["组件","菜单与底部弹层","同一组操作在宽屏使用锚定菜单，在窄屏改为底部弹层。"],motion:["基础规范","动效","动效只用于说明界面发生了什么，不用于装饰。"],navigation:["组件","导航","导航用于切换主要目的地。桌面使用侧栏，移动端使用底栏或标签。"],overlays:["页面结构","弹窗与浮层","简单选择使用菜单，复杂任务使用对话框；窄屏时可改为底部弹层。"],overview:["开始","Kai Design","一套供多个产品共同使用的设计规范。这里说明规则、展示组件，并输出工程可以直接使用的变量。"],products:["产品与工程","产品差异","这里只记录不能放进通用规范的主题色、内容样式和特殊页面。"],qa:["产品与工程","检查清单","发布前按外观、产品和窗口大小逐项检查。"],selection:["组件","选择控件","覆盖开关、勾选框、单选项和选择条。选中状态不能只靠颜色表达。"],settings:["页面结构","设置页","设置按主题分组，直接展示当前值；不要为了少量内容再加标签页。"],spacing:["基础规范","间距与圆角","页面间距使用 4px 倍数。圆角按组件用途选择，不按个人感觉调整。"],surfaces:["组件","表面与容器","承载页面分区、卡片和浮层。材质与层级由当前外观决定。"],typography:["基础规范","字体","字号负责可读性，字重和留白负责层级。不要靠大量不同字号制造区别。"]}},U={accents:R,componentContracts:K,primitives:W,productTokens:z,skins:J,viewerContent:_},Q="982aa169e6042c0256389e2bb730d99dc0f091b6ac1017bfbd9dc73377282ab5",X={tokenDigest:Q},c=U,Y=c.viewerContent,L=c.componentContracts,Z=X,q={kaiting:{character:"沉浸、节奏、封面主角",content:"专辑封面、黑胶与歌词属于内容层。",prefix:"Sound*",differences:[{title:"封面氛围",description:"详情页可以从封面提取背景和控件色，不改变通用界面的颜色规则。",reference:"divergences D1"},{title:"黑胶造型",description:"盘面、唱臂和旋转属于内容表现，不使用通用组件的圆角与形状规则。",reference:"divergences D3"},{title:"歌词层级",description:"正在播放页允许使用更大的歌词字号，但普通界面文字仍遵守通用层级。",reference:"divergences D4"}]},kaijuan:{character:"安静、克制、书房感",content:"书页、漫画与窄幅封面属于内容层。",prefix:"App*",differences:[{title:"封面圆角",description:"书籍和漫画封面使用 12px 圆角；普通界面卡片继续使用通用圆角。",reference:"cover.radius · 12px"},{title:"阅读主题",description:"阅读器工具栏跟随当前书页主题取色，退出阅读器后恢复通用界面主题。",reference:"divergences D1"},{title:"内容渲染",description:"书内样式、高亮色和漫画像素属于内容，不反向影响书库、设置和弹窗。",reference:"divergences D2"}]},kaigua:{character:"清晰、可靠、媒体工作台",content:"海报、剧照与刮削结果属于内容层。",prefix:"Kg*",differences:[{title:"媒体图片",description:"海报和剧照是内容素材，其比例、裁切和颜色不成为通用组件规则。",reference:"content boundary"},{title:"元数据内容",description:"刮削结果和说明文件由产品定义；规范只约束承载它们的界面组件。",reference:"product scope"},{title:"设置结构",description:"设置页继续使用通用的单页分组结构，不保留旧版多标签布局。",reference:"divergences D1"}]}},O={fluid:"100%",mobile:"390px",tablet:"820px",medium:"1024px",wide:"1280px"},M=[{label:"开始",items:[{id:"overview",label:"总览"},{id:"getting-started",label:"怎么使用"}]},{label:"基础规范",items:[{id:"color",label:"颜色"},{id:"typography",label:"字体"},{id:"spacing",label:"间距与圆角"},{id:"motion",label:"动效"}]},{label:"组件",items:[{id:"components",label:"组件总览"},{id:"surfaces",label:"表面与容器"},{id:"buttons",label:"按钮"},{id:"inputs",label:"输入框"},{id:"selection",label:"选择控件"},{id:"navigation",label:"导航"},{id:"list-rows",label:"列表行"},{id:"feedback",label:"反馈"},{id:"dialogs",label:"对话框"},{id:"menus",label:"菜单与底部弹层"},{id:"data-display",label:"数据展示"}]},{label:"页面结构",items:[{id:"app-shell",label:"应用框架"},{id:"overlays",label:"弹窗与浮层"},{id:"settings",label:"设置页"}]},{label:"产品与工程",items:[{id:"products",label:"产品差异"},{id:"delivery",label:"生成文件"},{id:"qa",label:"检查清单"}]}],h=M.flatMap(e=>e.items);function N(e){return e!=="system"?e:matchMedia("(prefers-color-scheme: dark)").matches?"deep-night":"default"}function S(e,t,s,a="tokens/primitives.json",r="这是三个产品共用的设计变量。"){return{role:e,token:t,value:typeof s=="string"?s:JSON.stringify(s,null,2),source:a,note:r}}const A={page:"overview",skin:"system",product:"kaiting",accent:"coral",viewport:"fluid",reducedMotion:!1,inspectorOpen:!1};function ee(){try{const e=new URLSearchParams(location.search),t=e.get("skin"),s=e.get("product");return{...A,...JSON.parse(localStorage.getItem("kai-viewer-state")??"{}"),...t?{skin:t}:{},...s?{product:s}:{},...e.get("reducedMotion")==="true"?{reducedMotion:!0}:{},inspectorTarget:void 0}}catch{return A}}function te(e){const{inspectorTarget:t,...s}=e;localStorage.setItem("kai-viewer-state",JSON.stringify(s))}function se(e){if(e==="transparent")return e;const[t,s]=e.split("@");return s?`rgb(${t==="white"?"255 255 255":t==="black"?"0 0 0":`${Number.parseInt(t.slice(1,3),16)} ${Number.parseInt(t.slice(3,5),16)} ${Number.parseInt(t.slice(5,7),16)}`} / ${s})`:t}function ae(e,t,s,a){const r=N(e),n=c.skins.presets.find(g=>g.id===r),p=c.accents.products[t],w=p.presets.find(g=>g.id===s)??p.presets.find(g=>g.id===p.default)??p.presets[0];if(!n||!w)return;const y=r==="default"?{page:"#FFFFFF",sidebar:"#FFFFFF",topbar:"#FFFFFF",demo:"#FFFFFF",subtle:c.primitives.basePalette.mainBackground}:{page:n.canvas,sidebar:n.surface,topbar:n.surface,demo:n.surface,subtle:n.overlay},G=w.accent,f=document.documentElement;f.dataset.skin=r,f.dataset.product=t,f.dataset.motion=a?"reduced":"normal",f.style.colorScheme=n.brightness;const I={"--canvas":n.canvas,"--surface":n.surface,"--elevated":n.elevated,"--overlay":n.overlay,"--canvas-highlight":n.glass.canvasHighlight,"--glass":n.glass.surface,"--glass-strong":n.glass.strongSurface,"--glass-border":n.glass.border,"--shadow-color":n.glass.shadow,"--page-background":y.page,"--sidebar-background":y.sidebar,"--topbar-background":y.topbar,"--demo-background":y.demo,"--subtle-background":y.subtle,"--product-main-background":c.primitives.basePalette.mainBackground,"--product-side-background":c.primitives.basePalette.sideBackground,"--text-primary":n.glass.primaryText,"--text-secondary":n.glass.secondaryText,"--text-muted":n.glass.mutedText,"--accent":G,"--product-accent":w.accent,"--blur":`${n.glass.blur}px`,"--strong-blur":`${n.glass.strongBlur}px`,"--shadow-scale":n.effects.shadowScale};Object.entries(I).forEach(([g,x])=>{f.style.setProperty(g,typeof x=="string"?se(x):String(x))})}function ne(){const e=document.documentElement;Object.entries(c.primitives.spacing).forEach(([t,s])=>{typeof s=="number"&&e.style.setProperty(`--space-${t}`,`${s}px`)}),Object.entries(c.primitives.radii).forEach(([t,s])=>{e.style.setProperty(`--radius-${t}`,`${s}px`)})}const V=document.querySelector("#app");if(!V)throw new Error("Missing #app");const d=V;let i=ee(),u=!1;const o=e=>String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),E=e=>{const[t,s]=e.split("@");return s?`rgb(${t==="white"?"255 255 255":t==="black"?"0 0 0":`${Number.parseInt(t.slice(1,3),16)} ${Number.parseInt(t.slice(3,5),16)} ${Number.parseInt(t.slice(5,7),16)}`} / ${s})`:e.startsWith("#")||e==="transparent"?e:"transparent"},$=(e,t,s)=>`<option value="${o(e)}" ${e===s?"selected":""}>${o(t)}</option>`,P=e=>`data-token="${o(e.token)}" data-role="${o(e.role)}" data-value="${o(e.value)}" data-source="${o(e.source)}" data-note="${o(e.note)}"`,T=()=>h.find(e=>e.id===i.page)??h[0],ie=(e,t,s)=>`
  <header class="page-header">
    <span>${o(e)}</span>
    <h1>${o(t)}</h1>
    <p>${o(s)}</p>
  </header>`,m=e=>{const[t,s,a]=Y.pages[e];return ie(t,s,a)},D={基础色板:"base-palette",规范内容:"contents",使用方式:"workflow",修改设计:"edit",怎么判断放在哪里:"placement",当前外观:"appearance",使用规则:"rules",字体层级:"type-scale",规则:"rules",间距:"spacing",圆角:"radius",常用时长:"duration",用法:"usage",示例:"examples",组件清单:"catalog",覆盖情况:"coverage",设计变量:"design-tokens",结构示例:"examples",边界:"boundaries",文件:"files",常用命令:"commands",必须通过:"requirements",检查范围:"coverage"},l=(e,t="",s="")=>`
  <div class="section-header" ${s||D[e]?`id="${s||D[e]}"`:""}>
    <h2>${o(e)}</h2>
    ${t?`<p>${o(t)}</p>`:""}
  </div>`,H=(e,t)=>`
  <aside class="note"><strong>${o(e)}</strong><p>${o(t)}</p></aside>`,F=(e,t="tokens/primitives.json",s)=>`
  <div class="token-table">
    <div class="token-row token-head"><span>用途</span><span>变量</span><span>当前值</span></div>
    ${e.map(a=>{const r=S(a.name,a.token,a.value,t,a.note??s??"这是三个产品共用的设计变量。");return`<button class="token-row inspectable" type="button" ${P(r)}>
          <strong>${o(a.name)}</strong>
          <code>${o(a.token)}</code>
          <code>${o(a.value)}</code>
        </button>`}).join("")}
  </div>`;function oe(){return`
    <aside class="sidebar ${u?"mobile-open":""}" id="site-navigation">
      <a class="brand" href="#overview"><b>K</b><span><strong>Kai Design</strong><small>设计规范</small></span></a>
      <nav aria-label="规范目录">
        ${M.map(e=>`
              <section>
                <h2>${o(e.label)}</h2>
                ${e.items.map(t=>`
                      <button type="button" data-page="${t.id}" data-nav-label="${t.label}"
                        class="${i.page===t.id?"active":""}"
                        aria-current="${i.page===t.id?"page":"false"}">
                        ${o(t.label)}
                      </button>`).join("")}
              </section>`).join("")}
      </nav>
      <footer><span>v${o(c.primitives.specVersion)}</span><i></i><small>规范文件已生成</small></footer>
    </aside>`}function re(){return`
    <header class="topbar">
      <div class="top-title">
        <button id="mobile-nav-toggle" class="mobile-nav-button" type="button"
          aria-label="${u?"关闭目录":"打开目录"}"
          aria-expanded="${u}" aria-controls="site-navigation">K</button>
        <span><small>${o(T().label)}</small><strong>${o(T().label)}</strong></span>
      </div>
      <div class="top-actions">
        <label class="search"><span>⌕</span><input id="nav-search" type="search" placeholder="搜索目录"></label>
        <label class="select-control"><span>外观</span><select id="skin">
          ${$("system","跟随系统",i.skin)}
          ${c.skins.presets.map(e=>$(e.id,e.name,i.skin)).join("")}
        </select></label>
        <button id="motion" class="icon-button ${i.reducedMotion?"active":""}" type="button" title="减少动态效果">≈</button>
        <span class="top-version">v${o(c.primitives.specVersion)}</span>
      </div>
    </header>`}function ce(){return`
    <article class="document">
      ${m("overview")}
      <section class="content-section">
        ${l("从这里开始","先查通用规则；只有品牌或业务确实不同，才进入产品差异。","contents")}
        <div class="docs-index">
          <button data-page="color"><span><strong>基础规范</strong><small>颜色、字体、间距、圆角和动效</small></span><i>→</i></button>
          <button data-page="components"><span><strong>组件</strong><small>看现有组件、用法、数值和交互示例</small></span><i>→</i></button>
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
    </article>`}function le(){return`
    <article class="document">
      ${m("getting-started")}
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
      ${H("记住","产品代码是规范的使用方，不是另一份规范。")}
    </article>`}function de(){const e=c.skins.presets.find(a=>a.id===N(i.skin))??c.skins.presets[0],t=[["页面背景","skin.canvas",e.canvas],["内容背景","skin.surface",e.surface],["浮层背景","skin.elevated",e.elevated],["主要文字","skin.glass.primaryText",String(e.glass.primaryText)],["次要文字","skin.glass.secondaryText",String(e.glass.secondaryText)],["边框","skin.glass.border",String(e.glass.border)]],s=[["主内容背景","basePalette.mainBackground",c.primitives.basePalette.mainBackground],["侧栏背景","basePalette.sideBackground",c.primitives.basePalette.sideBackground],["参考主色","basePalette.primary",c.primitives.basePalette.primary]];return`
    <article class="document">
      ${m("color")}
      <section class="content-section">
        ${l("基础色板","三个颜色各有固定职责，不互相替代。")}
        <div class="color-grid base-color-grid">
          ${s.map(([a,r,n])=>{const p=S(a,r,n,"tokens/primitives.json");return`<button class="color-item inspectable" type="button" ${P(p)}>
                <i style="background:${E(n)}"></i>
                <span><strong>${a}</strong><code>${o(n)}</code></span>
              </button>`}).join("")}
        </div>
      </section>
      <section class="content-section">
        ${l("当前外观",`正在查看“${e.name}”外观。可在右上角切换。`)}
        <div class="color-grid">
          ${t.map(([a,r,n])=>{const p=S(a,r,n,`tokens/skins.json#${e.id}`);return`<button class="color-item inspectable" type="button" ${P(p)}>
                <i style="background:${E(n)}"></i>
                <span><strong>${a}</strong><code>${o(n)}</code></span>
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
    </article>`}function pe(){const e=[["页面大标题","48 / 56","700","每页最多一个"],["区块标题","28 / 36","650","用于分隔主要内容"],["正文","16 / 26","400","说明文字和长内容"],["辅助文字","13 / 18","500","状态、版本和补充信息"]];return`
    <article class="document">
      ${m("typography")}
      <section class="content-section">
        ${l("字体层级")}
        <div class="type-table">
          ${e.map(([t,s,a,r],n)=>`<div class="type-sample type-${n}">
            <span><strong>${t}</strong><code>${s} · ${a}</code></span>
            <p>${r}</p>
          </div>`).join("")}
        </div>
      </section>
      <section class="content-section">
        ${l("规则")}
        <ul class="prose-list"><li>优先使用系统字体，避免额外下载字体影响启动。</li><li>正文最小 16px，辅助文字最小 13px。</li><li>展示文字不能使用主题色。</li><li>一段内容中最多出现三个文字层级。</li></ul>
      </section>
    </article>`}function ue(){const e=Object.entries(c.primitives.spacing).filter(([,s])=>typeof s=="number").map(([s,a])=>({name:`间距 ${s}`,token:`spacing.${s}`,value:`${a}px`})),t=Object.entries(c.primitives.radii).map(([s,a])=>({name:`圆角 ${s}`,token:`radii.${s}`,value:`${a}px`}));return`
    <article class="document">
      ${m("spacing")}
      <section class="content-section">
        ${l("间距")}
        <div class="spacing-visual">${e.map(s=>`<div><code>${s.token}</code><i style="width:${s.value}"></i><span>${s.value}</span></div>`).join("")}</div>
        ${F(e)}
      </section>
      <section class="content-section">
        ${l("圆角")}
        <div class="radius-visual">${t.map(s=>`<div><i style="border-radius:${s.value}"></i><strong>${s.name.replace("圆角 ","")}</strong><code>${s.value}</code></div>`).join("")}</div>
        ${F(t)}
      </section>
    </article>`}function me(){return`
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
    </article>`}const b=(e,t)=>{const s=L.components[e];return`
  <article class="document">
    ${m(e)}
    <section class="content-section">
      ${l("用法")}
      <ul class="prose-list">${s.usage.map(a=>`<li>${o(a)}</li>`).join("")}</ul>
    </section>
    <section class="content-section">
      ${l("示例","下面展示实现时需要覆盖的常用形态。")}
      <div class="component-preview">
        <div class="component-stage">${t}</div>
      </div>
    </section>
    <section class="content-section">
      ${l("设计变量")}
      ${F(s.tokens,"contracts/components.json","这是结构化组件契约中的验收锚点。")}
    </section>
  </article>`};function be(){const t=["surfaces","buttons","inputs","selection","navigation","list-rows","feedback","dialogs","menus","data-display"].map(s=>[s,L.components[s]]);return`
    <article class="document">
      ${m("components")}
      <section class="content-section">
        ${l("组件清单")}
        <div class="component-catalog">
          ${t.map(([s,a])=>`<button type="button" data-page="${s}">
              <span><strong>${o(a.name)}</strong><small>${o(a.summary)}</small></span>
              <i>→</i>
            </button>`).join("")}
        </div>
      </section>
    </article>`}function ve(){return b("surfaces",`<div class="surface-demo">
      <article class="demo-surface base"><span>基础表面</span><strong>页面内容分区</strong><small>使用当前外观的内容背景和边框。</small></article>
      <article class="demo-surface glass"><span>强玻璃表面</span><strong>固定界面层</strong><small>用于侧栏、底栏和需要透出背景的区域。</small></article>
      <article class="demo-surface elevated"><span>浮层表面</span><strong>菜单与对话框</strong><small>使用更清楚的边框和层级。</small></article>
    </div>`)}function ge(){return b("buttons",`<div class="demo-stack">
      <div class="demo-group"><span>按钮类型</span><div class="button-line"><button class="primary">主要操作</button><button class="secondary">次要操作</button><button class="ghost">文字操作</button><button class="danger">删除</button></div></div>
      <div class="demo-group"><span>交互状态</span><div class="button-line"><button class="primary">默认</button><button class="primary demo-hover">悬停</button><button class="primary demo-pressed">按下</button><button class="primary" disabled>不可用</button></div></div>
      <div class="demo-group"><span>图标与工具按钮</span><div class="button-line"><button class="demo-icon-button" aria-label="收藏">☆</button><button class="demo-icon-button selected" aria-label="已收藏">★</button><button class="toolbar-button">↻ 重新载入</button><button class="demo-fab" aria-label="添加">＋</button></div></div>
    </div>`)}function ke(){return b("inputs",`<div class="field-demo">
      <label><span>默认</span><input placeholder="输入内容"></label>
      <label class="focused"><span>聚焦</span><input value="设计规范"></label>
      <label class="error"><span>输入有误</span><input value="错误内容"><small>请检查输入内容</small></label>
      <label><span>选项</span><select><option>跟随系统</option><option>浅色</option><option>深色</option></select></label>
      <label class="range-field"><span>播放进度</span><input type="range" value="42"></label>
      <label><span>不可编辑</span><input value="固定内容" disabled></label>
    </div>`)}function ye(){return b("selection",`<div class="demo-stack">
      <div class="demo-group"><span>选择条</span><div class="chip-strip"><button class="active">全部</button><button>最近使用</button><button>已收藏</button><button disabled>不可用</button></div></div>
      <div class="choice-demo">
        <button class="choice toggle" aria-pressed="true"><i class="switch on"><b></b></i><span><strong>自动同步</strong><small>修改后立即生效</small></span></button>
        <button class="choice toggle" aria-pressed="false"><i class="switch"><b></b></i><span><strong>减少动态</strong><small>降低界面移动</small></span></button>
        <button class="choice"><i class="check">✓</i><span><strong>包含说明文件</strong><small>可以选择多个项目</small></span></button>
        <button class="choice"><i class="radio-dot"></i><span><strong>稳定版本</strong><small>单选组中的当前项目</small></span></button>
      </div>
    </div>`)}function fe(){return b("navigation",`<div class="nav-preview">
      <div class="demo-group"><span>页内标签</span><div class="tabs"><button class="active">总览</button><button>组件</button><button>记录</button></div></div>
      <div class="navigation-pair">
        <div class="demo-group"><span>桌面侧栏</span><div class="side-nav-demo"><button class="active">设置</button><button>外观</button><button>关于</button></div></div>
        <div class="demo-group"><span>移动底栏</span><div class="bottom-nav-demo"><button class="active"><b>⌂</b><span>首页</span></button><button><b>◇</b><span>内容</span></button><button><b>⚙</b><span>设置</span></button></div></div>
      </div>
    </div>`)}function he(){return b("list-rows",`<div class="list-row-demo">
      <button><i>文</i><span><strong>只有标题</strong></span><b>›</b></button>
      <button><i>自</i><span><strong>自动检查更新</strong><small>每天检查一次</small></span><em class="switch on"><b></b></em></button>
      <button class="selected"><i class="check">✓</i><span><strong>包含说明文件</strong><small>选中状态使用行内标记</small></span><b>已选择</b></button>
      <button disabled><i>锁</i><span><strong>不可使用的项目</strong><small>说明为什么暂时不可用</small></span></button>
      <button class="destructive"><i>删</i><span><strong>移除全部记录</strong></span></button>
    </div>`)}function $e(){return b("feedback",`<div class="feedback-demo">
      <div class="feedback-item"><span>轻提示</span><div class="snackbar">设置已保存 <button>撤销</button></div></div>
      <div class="feedback-item"><span>工具提示</span><div class="tooltip-sample"><button class="demo-icon-button">?</button><b>查看使用说明</b></div></div>
      <div class="feedback-item wide"><span>空态与加载</span><div class="empty-state"><i>◇</i><strong>还没有内容</strong><p>添加第一项后会显示在这里。</p><button class="secondary">添加内容</button></div><div class="loading-state"><i></i><span>正在载入</span></div></div>
      <div class="feedback-item wide"><span>进度</span><div class="linear-progress"><i style="width:62%"></i></div><small>已完成 62%</small></div>
      <div class="feedback-item wide"><span>滚动条</span><div class="scrollbar-sample"><i></i></div></div>
    </div>`)}function Fe(){return b("dialogs",`<div class="demo-stack">
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
    </div>`)}function we(){return b("menus",`<div class="menu-demo">
      <div class="demo-group"><span>锚定菜单</span><div class="anchored-menu">
        <header>排序方式</header>
        <button class="selected"><i>↕</i><span>最近修改</span><b>✓</b></button>
        <button><i>字</i><span>按名称</span></button>
        <hr>
        <button class="destructive"><i>删</i><span>清除记录</span></button>
      </div></div>
      <div class="demo-group"><span>移动端底部弹层</span><div class="sheet-frame"><div class="sheet"><i class="sheet-handle"></i><strong>选择操作</strong><button><span>添加到收藏</span><b>›</b></button><button><span>分享</span><b>›</b></button><button class="destructive"><span>删除</span></button></div></div></div>
    </div>`)}function xe(){return b("data-display",`<div class="data-display-demo">
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
    </div>`)}function j(e,t,s){return`
    <article class="document">
      ${m(e)}
      <section class="content-section">${l("结构示例")}<div class="pattern-preview">${t}</div></section>
      <section class="content-section">${l("规则")}<ul class="prose-list">${s.map(a=>`<li>${o(a)}</li>`).join("")}</ul></section>
    </article>`}function qe(){return j("app-shell",'<div class="shell"><aside><b>K</b><button class="active">总览</button><button>内容</button><button>收藏</button><button>设置</button></aside><main><header><strong>页面标题</strong><button class="primary">新建</button></header><section><article></article><article></article><article></article></section><div></div></main></div>',["桌面主窗口默认 1280×800，最小 1024×700。","侧栏只放主要目的地，不复用普通列表行尺寸。","内容区负责滚动，固定导航不跟随内容移动。"])}function Se(){return j("overlays",'<div class="overlay-demo"><div class="backdrop"></div><article><h3>确认操作</h3><p>说明这项操作会发生什么。</p><footer><button class="secondary">取消</button><button class="primary">确认</button></footer></article></div>',["菜单宽度由内容决定，最小 160px，最大 280px。","需要用户完整注意力的任务才使用对话框。","关闭方式包括关闭按钮、取消操作和键盘 Escape。"])}function Ee(){return j("settings",'<div class="settings-demo"><section><h3>外观</h3><label><span><strong>界面外观</strong><small>跟随系统</small></span><button class="secondary">更改</button></label><label><span><strong>减少动态效果</strong><small>关闭</small></span><i class="switch"><b></b></i></label></section><section><h3>通用</h3><label><span><strong>自动检查更新</strong><small>开启</small></span><i class="switch on"><b></b></i></label></section></div>',["一页内容可以完成时，不增加标签页。","设置名称说明功能，副标题显示当前值或影响。","同一分组中的行保持相同高度和对齐方式。"])}function Pe(){const e=c.accents.products[i.product],t=c.productTokens[i.product],s=Object.entries(t.tokens).map(([a,r])=>({name:r.description,token:a,value:typeof r.value=="number"?`${r.value}${r.type==="dimension"?"px":r.type==="duration"?"ms":""}`:r.value}));return`
    <article class="document">
      ${m("products")}
      <div class="page-toolbar">
        <label><span>产品</span><select id="product-inline">${Object.keys(c.accents.products).map(a=>$(a,c.accents.products[a].displayName,i.product)).join("")}</select></label>
        <label><span>主题色</span><select id="accent-inline">${e.presets.map(a=>$(a.id,a.name,i.accent)).join("")}</select></label>
      </div>
      <section class="content-section">
        ${l(e.displayName,`${q[i.product].character}。${q[i.product].content}`,"appearance")}
        <div class="accent-list">${e.presets.map(a=>`<button data-accent-pick="${a.id}" class="${a.id===i.accent?"active":""}"><i style="background:${a.accent}"></i><span><strong>${a.name}</strong><code>${a.accent}</code></span></button>`).join("")}</div>
      </section>
      <section class="content-section">
        ${l("专属规则","这些内容只影响当前产品，不进入基础、组件和页面结构。","differences")}
        <div class="rule-grid">${q[i.product].differences.map(a=>`<article><strong>${o(a.title)}</strong><p>${o(a.description)}</p><code>${o(a.reference)}</code></article>`).join("")}</div>
      </section>
      <section class="content-section">
        ${l("产品变量","只有当前产品使用的数值也参与生成、校验和同步。","product-tokens")}
        ${s.length?F(s,`products/${i.product}/tokens.json`,"这是当前产品专属的生成变量。"):H("没有额外变量","当前产品只有内容边界和行为差异，没有需要单独生成的数值。")}
      </section>
      <section class="content-section">
        ${l("边界")}
        <div class="decision-table">
          <div><strong>可以不同</strong><span>主题色、内容表现、产品专属页面</span></div>
          <div><strong>必须共用</strong><span>字体、间距、组件状态、无障碍要求</span></div>
          <div><strong>需要登记</strong><span>任何偏离通用规范的实现</span></div>
        </div>
      </section>
    </article>`}function je(){return`
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
      <p class="digest">内容校验码：<code>${Z.tokenDigest}</code></p>
    </article>`}function Oe(){const e=Object.keys(c.accents.products);return`
    <article class="document">
      ${m("qa")}
      <section class="content-section">
        ${l("必须通过")}
        <div class="check-list">${["生成文件与源文件一致","组件的正常、悬停、聚焦和禁用状态可用","浅色和深色外观都清楚易读","窗口缩小时没有内容溢出","减少动态效果后仍可正常操作"].map(t=>`<label><input type="checkbox" checked><span>${t}</span></label>`).join("")}</div>
      </section>
      <section class="content-section">
        ${l("检查范围")}
        <div class="qa-table">
          <div class="qa-row qa-head"><span>产品</span>${Object.entries(O).map(([t])=>`<span>${t}</span>`).join("")}</div>
          ${e.map(t=>`<div class="qa-row"><strong>${c.accents.products[t].displayName}</strong>${Object.entries(O).map(([s,a])=>`<button data-qa-product="${t}" data-qa-viewport="${s}"><i></i><span>${a}</span></button>`).join("")}</div>`).join("")}
        </div>
      </section>
    </article>`}function Ae(){switch(i.page){case"getting-started":return le();case"color":return de();case"typography":return pe();case"spacing":return ue();case"motion":return me();case"components":return be();case"surfaces":return ve();case"buttons":return ge();case"inputs":return ke();case"selection":return ye();case"navigation":return fe();case"list-rows":return he();case"feedback":return $e();case"dialogs":return Fe();case"menus":return we();case"data-display":return xe();case"app-shell":return qe();case"overlays":return Se();case"settings":return Ee();case"products":return Pe();case"delivery":return je();case"qa":return Oe();default:return ce()}}const B={overview:[["从这里开始","contents"],["使用方式","workflow"]],"getting-started":[["修改设计","edit"],["怎么判断放在哪里","placement"]],color:[["基础色板","base-palette"],["当前外观","appearance"],["使用规则","rules"]],typography:[["字体层级","type-scale"],["规则","rules"]],spacing:[["间距","spacing"],["圆角","radius"]],motion:[["常用时长","duration"],["规则","rules"]],components:[["组件清单","catalog"]],surfaces:[["用法","usage"],["示例","examples"],["设计变量","design-tokens"]],buttons:[["用法","usage"],["示例","examples"],["设计变量","design-tokens"]],inputs:[["用法","usage"],["示例","examples"],["设计变量","design-tokens"]],selection:[["用法","usage"],["示例","examples"],["设计变量","design-tokens"]],navigation:[["用法","usage"],["示例","examples"],["设计变量","design-tokens"]],"list-rows":[["用法","usage"],["示例","examples"],["设计变量","design-tokens"]],feedback:[["用法","usage"],["示例","examples"],["设计变量","design-tokens"]],dialogs:[["用法","usage"],["示例","examples"],["设计变量","design-tokens"]],menus:[["用法","usage"],["示例","examples"],["设计变量","design-tokens"]],"data-display":[["用法","usage"],["示例","examples"],["设计变量","design-tokens"]],"app-shell":[["结构示例","examples"],["规则","rules"]],overlays:[["结构示例","examples"],["规则","rules"]],settings:[["结构示例","examples"],["规则","rules"]],products:[["当前产品","appearance"],["专属规则","differences"],["产品变量","product-tokens"],["边界","boundaries"]],delivery:[["文件","files"],["常用命令","commands"]],qa:[["必须通过","requirements"],["检查范围","coverage"]]};function Te(){return`<aside class="page-toc" aria-label="本页内容">
    <strong>本页内容</strong>
    ${(B[i.page]??B.overview??[]).map(([t,s])=>`<a href="#${s}" data-section-link="${s}">${o(t)}</a>`).join("")}
  </aside>`}function De(){const e=i.inspectorTarget;return`
    <aside class="inspector ${i.inspectorOpen?"open":""}">
      <header><span><small>变量详情</small><strong>查看具体数值</strong></span><button id="inspector-close" type="button">×</button></header>
      ${e?`<main>
            <div class="token-preview" style="--token-value:${E(e.value)}"><i></i></div>
            <dl>
              <div><dt>用途</dt><dd>${o(e.role)}</dd></div>
              <div><dt>变量名</dt><dd><code>${o(e.token)}</code></dd></div>
              <div><dt>当前值</dt><dd><code>${o(e.value)}</code></dd></div>
              <div><dt>来自</dt><dd>${o(e.source)}</dd></div>
              <div><dt>说明</dt><dd>${o(e.note)}</dd></div>
            </dl>
          </main>`:'<div class="inspector-empty"><strong>先选一个变量</strong><p>点击颜色、间距、圆角或变量表格中的一行。</p></div>'}
    </aside>`}function v(e){i={...i,...e},te(i),k()}function Be(){d.querySelectorAll("[data-page]").forEach(e=>{e.addEventListener("click",()=>{const t=e.dataset.page;u=!1,history.replaceState(null,"",`#${t}`),v({page:t}),window.scrollTo({top:0})})}),d.querySelector("#mobile-nav-toggle")?.addEventListener("click",()=>{u=!u,k(),u&&requestAnimationFrame(()=>d.querySelector(".sidebar nav button.active")?.focus())}),d.querySelector("#mobile-nav-backdrop")?.addEventListener("click",()=>{u=!1,k()}),d.onkeydown=e=>{e.key==="Escape"&&u&&(u=!1,k(),requestAnimationFrame(()=>d.querySelector("#mobile-nav-toggle")?.focus()))},d.querySelector("#skin")?.addEventListener("change",e=>{v({skin:e.target.value})}),d.querySelector("#motion")?.addEventListener("click",()=>v({reducedMotion:!i.reducedMotion})),d.querySelector("#inspector-close")?.addEventListener("click",()=>v({inspectorOpen:!1})),d.querySelectorAll("[data-token]").forEach(e=>{e.addEventListener("click",()=>v({inspectorOpen:!0,inspectorTarget:{token:e.dataset.token??"",role:e.dataset.role??"",value:e.dataset.value??"",source:e.dataset.source??"",note:e.dataset.note??""}}))}),d.querySelector("#product-inline")?.addEventListener("change",e=>{const t=e.target.value;v({product:t,accent:c.accents.products[t].default})}),d.querySelector("#accent-inline")?.addEventListener("change",e=>v({accent:e.target.value})),d.querySelectorAll("[data-accent-pick]").forEach(e=>e.addEventListener("click",()=>v({accent:e.dataset.accentPick??i.accent}))),d.querySelectorAll("[data-qa-product]").forEach(e=>e.addEventListener("click",()=>{const t=e.dataset.qaProduct;v({product:t,viewport:e.dataset.qaViewport,accent:c.accents.products[t].default})})),d.querySelectorAll("[data-section-link]").forEach(e=>{e.addEventListener("click",t=>{t.preventDefault(),d.querySelector(`#${e.dataset.sectionLink}`)?.scrollIntoView({behavior:i.reducedMotion?"auto":"smooth"})})}),d.querySelectorAll(".toggle").forEach(e=>e.addEventListener("click",()=>{const t=e.getAttribute("aria-pressed")!=="true";e.setAttribute("aria-pressed",String(t)),e.querySelector(".switch")?.classList.toggle("on",t)})),d.querySelector("#nav-search")?.addEventListener("input",e=>{const t=e.target.value.trim().toLowerCase();d.querySelectorAll("[data-nav-label]").forEach(s=>{s.hidden=!!t&&!(s.dataset.navLabel??"").toLowerCase().includes(t)})})}function k(){const e=c.accents.products[i.product];e.presets.some(t=>t.id===i.accent)||(i.accent=e.default),ae(i.skin,i.product,i.accent,i.reducedMotion),d.innerHTML=`<div class="workbench ${i.inspectorOpen?"with-inspector":""} ${u?"mobile-nav-open":""}">${oe()}${u?'<button id="mobile-nav-backdrop" class="mobile-nav-backdrop" type="button" aria-label="关闭目录"></button>':""}<div class="workspace">${re()}<main class="content"><div class="doc-layout">${Ae()}${Te()}</div></main></div>${De()}</div>`,Be()}const C=location.hash.slice(1);h.some(e=>e.id===C)&&(i.page=C);h.some(e=>e.id===i.page)||(i.page="overview");ne();matchMedia("(prefers-color-scheme: dark)").addEventListener("change",()=>i.skin==="system"&&k());k();

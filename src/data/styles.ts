export interface DesignStyle<Id extends string = string> {
  id: Id;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  tags: string[];
  tagsEn: string[];
  features: string[];
  featuresEn: string[];
  useCases: string[];
  useCasesEn: string[];
  pros: string[];
  prosEn: string[];
  cons: string[];
  consEn: string[];
  examples: string[];
  examplesEn: string[];
  /** 避坑指南：做这种风格最常见的翻车点 */
  pitfalls: string[];
  pitfallsEn: string[];
  colors: string[];
}

export const designStyles = [
  {
    "id": "apple",
    "name": "Apple 风",
    "nameEn": "Apple Minimalism",
    "description": "以产品为中心：短标题、大幅产品画面、清楚的卖点与克制的分区。系统无衬线字体，紧凑标题字距，统一间距；蓝色用于链接和主操作，材质与留白共同建立层级。",
    "descriptionEn": "Center the product: short headlines, large product imagery, clear benefits and restrained sections. System sans-serif, tight display tracking and consistent spacing; reserve blue for links and primary actions. Let material and whitespace establish hierarchy.",
    "tags": [
      "极简",
      "现代"
    ],
    "tagsEn": [
      "Minimal",
      "Modern"
    ],
    "features": [
      "构图 - 以产品为中心：短标题、大幅产品画面、清楚的卖点与克制的分区。",
      "关键手法 - 系统无衬线字体，紧凑标题字距，统一间距；蓝色用于链接和主操作，材质与留白共同建立层级。"
    ],
    "featuresEn": [
      "Composition - Center the product: short headlines, large product imagery, clear benefits and restrained sections.",
      "Signature - System sans-serif, tight display tracking and consistent spacing; reserve blue for links and primary actions. Let material and whitespace establish hierarchy."
    ],
    "useCases": [
      "高端消费电子官网",
      "SaaS 产品 Landing Page",
      "科技初创公司品牌站",
      "设计师个人作品集",
      "极简电商精选店铺"
    ],
    "useCasesEn": [
      "Premium consumer electronics sites",
      "SaaS product landing pages",
      "Tech startup brand sites",
      "Designer portfolios",
      "Curated minimal e-commerce"
    ],
    "pros": [
      "产品画面与短标题形成明确焦点",
      "统一字阶与间距便于跨页面复用",
      "克制的强调色为主操作保留位置",
      "分区留白可区分产品信息与细节"
    ],
    "prosEn": [
      "Product imagery and short headlines establish a clear focus",
      "A consistent type and spacing scale can be reused across pages",
      "Restrained accents leave room for the primary action",
      "Section spacing separates the product story from supporting detail"
    ],
    "cons": [
      "大留白需要足够的内容与图像支撑",
      "低密度布局需为复杂数据另设结构",
      "细字重、图像尺寸与响应式裁切需要逐项调整"
    ],
    "consEn": [
      "Generous whitespace needs purposeful copy and imagery",
      "Complex data needs a structure beyond a sparse layout",
      "Type weight, image sizing and responsive crops need individual tuning"
    ],
    "examples": [
      "Apple.com",
      "Linear.app",
      "Notion.so",
      "Stripe.com",
      "Vercel.com"
    ],
    "examplesEn": [
      "Apple.com",
      "Linear.app",
      "Notion.so",
      "Stripe.com",
      "Vercel.com"
    ],
    "pitfalls": [
      "不要把大留白变成内容缺失，也不要把大圆角、无强调色或某个阴影尺寸当作通用规则。"
    ],
    "pitfallsEn": [
      "Whitespace must support content. Oversized corners, no accent color or a single shadow size are not universal rules."
    ],
    "colors": [
      "#ffffff",
      "#f5f5f7",
      "#1d1d1f",
      "#6e6e73",
      "#0071e3"
    ]
  },
  {
    "id": "braun",
    "name": "迪特·拉姆斯风",
    "nameEn": "Braun / Dieter Rams",
    "description": "用模数网格组织信息，按真实功能分组；标签、刻度和控件相互对齐。中性灰、清楚的标识与克制的功能色；触感来自材质细节，装饰服从使用。",
    "descriptionEn": "Use a modular grid and functional grouping. Align labels, scales and controls. Neutral grays, clear labeling and restrained functional color; tactile material details serve use.",
    "tags": [
      "极简",
      "经典"
    ],
    "tagsEn": [
      "Minimal",
      "Classic"
    ],
    "features": [
      "构图 - 用模数网格组织信息，按真实功能分组；标签、刻度和控件相互对齐。",
      "关键手法 - 中性灰、清楚的标识与克制的功能色；触感来自材质细节，装饰服从使用。"
    ],
    "featuresEn": [
      "Composition - Use a modular grid and functional grouping. Align labels, scales and controls.",
      "Signature - Neutral grays, clear labeling and restrained functional color; tactile material details serve use."
    ],
    "useCases": [
      "工业设计公司官网",
      "建筑事务所作品展示",
      "高端家具品牌",
      "专业摄影器材商城",
      "极简主义生活方式品牌"
    ],
    "useCasesEn": [
      "Industrial design company sites",
      "Architecture firm portfolios",
      "Premium furniture brands",
      "Professional photography gear stores",
      "Minimalist lifestyle brands"
    ],
    "pros": [
      "模数网格把相关功能组织在一起",
      "标签、刻度与控件共享对齐轴",
      "功能色与中性底色有清楚分工",
      "重复的控件规格便于形成组件约定"
    ],
    "prosEn": [
      "A modular grid groups related functions",
      "Labels, scales and controls share alignment axes",
      "Functional colors have distinct roles against neutral surfaces",
      "Repeated control dimensions support component conventions"
    ],
    "cons": [
      "需要仔细处理标签、数字与控件的比例",
      "品牌故事需要另用内容和图像表达",
      "过度删减边界可能让操作不易辨认"
    ],
    "consEn": [
      "Labels, numbers and controls need careful proportional work",
      "Brand storytelling needs support from copy and imagery",
      "Removing too many boundaries can obscure interactive controls"
    ],
    "examples": [
      "Braun.com",
      "Vitsoe.com",
      "Teenage Engineering",
      "Leica",
      "Bang & Olufsen"
    ],
    "examplesEn": [
      "Braun.com",
      "Vitsoe.com",
      "Teenage Engineering",
      "Leica",
      "Bang & Olufsen"
    ],
    "pitfalls": [
      "不要给所有元素加橙色或无功能的仪表盘装饰。"
    ],
    "pitfallsEn": [
      "Avoid orange everywhere or decorative controls without a purpose."
    ],
    "colors": [
      "#f2f2f2",
      "#ffffff",
      "#1a1a1a",
      "#808080",
      "#c9c9c9"
    ]
  },
  {
    "id": "flat",
    "name": "扁平化",
    "nameEn": "Flat Design",
    "description": "用纯色分区、明确字号和简单图标组织任务。平面色块、清晰边界与一致的图标笔画，靠对比和位置形成层级。",
    "descriptionEn": "Organize tasks with solid color regions, clear typography and simple icons. Solid fills, clear boundaries and consistent icon strokes; hierarchy comes from contrast and position.",
    "tags": [
      "极简",
      "现代",
      "经典"
    ],
    "tagsEn": [
      "Minimal",
      "Modern",
      "Classic"
    ],
    "features": [
      "构图 - 用纯色分区、明确字号和简单图标组织任务。",
      "关键手法 - 平面色块、清晰边界与一致的图标笔画，靠对比和位置形成层级。"
    ],
    "featuresEn": [
      "Composition - Organize tasks with solid color regions, clear typography and simple icons.",
      "Signature - Solid fills, clear boundaries and consistent icon strokes; hierarchy comes from contrast and position."
    ],
    "useCases": [
      "移动应用 UI 设计",
      "图标库与 icon 系统",
      "信息图表与数据可视化",
      "企业内部工具界面",
      "简约风格品牌官网"
    ],
    "useCasesEn": [
      "Mobile app UI design",
      "Icon libraries and systems",
      "Infographics and data visualization",
      "Enterprise internal tool interfaces",
      "Minimal brand websites"
    ],
    "pros": [
      "纯色分区与简单图标保持表面清楚",
      "不依赖材质反光也能建立层级",
      "颜色与字号规则可映射到不同平台",
      "按钮与表单能使用一致的状态语言"
    ],
    "prosEn": [
      "Solid regions and simple icons keep surfaces clear",
      "Hierarchy can be established without material reflections",
      "Color and type rules can be mapped across platforms",
      "Buttons and forms can share a consistent state language"
    ],
    "cons": [
      "需要用边界、标签和位置补足操作提示",
      "只用色块可能让不同内容层级相似",
      "品牌辨识需要依靠字体、图像或专属图形"
    ],
    "consEn": [
      "Boundaries, labels and position must signal interactions",
      "Color blocks alone can flatten content hierarchy",
      "Brand identity needs type, imagery or distinctive graphics"
    ],
    "examples": [
      "Windows 8/10 UI",
      "早期 iOS 7-12",
      "Google Material Design",
      "Spotify"
    ],
    "examplesEn": [
      "Windows 8/10 UI",
      "Early iOS 7-12",
      "Google Material Design",
      "Spotify"
    ],
    "pitfalls": [
      "避免立体斜面、材质反光和装饰性渐变；保留操作状态。"
    ],
    "pitfallsEn": [
      "Avoid bevels, material reflections and decorative gradients; preserve interaction states."
    ],
    "colors": [
      "#FFFFFF",
      "#2196F3",
      "#1976D2",
      "#E3F2FD",
      "#4CAF50"
    ]
  },
  {
    "id": "material",
    "name": "Material Design",
    "nameEn": "Material Design",
    "description": "按 Material 3 的色彩角色、字号层级、形状与状态组织界面。本例采用紫色主色、调性表面与 Roboto；56px FAB 使用 16px 圆角，悬浮与按下状态有明确反馈。",
    "descriptionEn": "Organize UI around Material 3 color roles, type scale, shape and state. This study uses a purple primary, tonal surfaces and Roboto; its 56px FAB has 16px corners with clear hover and pressed feedback.",
    "tags": [
      "现代",
      "经典"
    ],
    "tagsEn": [
      "Modern",
      "Classic"
    ],
    "features": [
      "构图 - 按 Material 3 的色彩角色、字号层级、形状与状态组织界面。",
      "关键手法 - 本例采用紫色主色、调性表面与 Roboto；56px FAB 使用 16px 圆角，悬浮与按下状态有明确反馈。"
    ],
    "featuresEn": [
      "Composition - Organize UI around Material 3 color roles, type scale, shape and state.",
      "Signature - This study uses a purple primary, tonal surfaces and Roboto; its 56px FAB has 16px corners with clear hover and pressed feedback."
    ],
    "useCases": [
      "Android 原生应用开发",
      "企业级 B2B 产品",
      "跨平台 Web 应用",
      "Google 生态系统产品",
      "教育与学习平台"
    ],
    "useCasesEn": [
      "Android native app development",
      "Enterprise B2B products",
      "Cross-platform web applications",
      "Google ecosystem products",
      "Education and learning platforms"
    ],
    "pros": [
      "色彩角色、字阶与形状有成套命名",
      "选中、悬浮与按下状态可按同一体系组织",
      "组件模式覆盖常见导航与表单任务",
      "调性色表面能区分信息层次"
    ],
    "prosEn": [
      "Color roles, type scales and shapes have coordinated naming",
      "Selected, hover and pressed states can share one system",
      "Component patterns address common navigation and form tasks",
      "Tonal surfaces can distinguish information layers"
    ],
    "cons": [
      "需要明确采用的版本和组件实现",
      "默认组件需要调整以承接品牌表达",
      "动效和层级不能直接替代任务反馈"
    ],
    "consEn": [
      "The chosen version and component implementation must be explicit",
      "Default components need adaptation to carry the brand",
      "Motion and elevation cannot replace task feedback"
    ],
    "examples": [
      "Google 全系产品",
      "Android 系统 UI",
      "Flutter 应用",
      "YouTube"
    ],
    "examplesEn": [
      "All Google products",
      "Android system UI",
      "Flutter apps",
      "YouTube"
    ],
    "pitfalls": [
      "不要把 Google 品牌四色当成 Material 的必选配色，或把圆形 FAB 当作所有版本的规范。"
    ],
    "pitfallsEn": [
      "Google brand colors are not a required Material palette, and circular FABs are not a rule for every version."
    ],
    "colors": [
      "#FEF7FF",
      "#6750A4",
      "#FFFFFF",
      "#EADDFF",
      "#21005D"
    ]
  },
  {
    "id": "swiss",
    "name": "瑞士风格",
    "nameEn": "Swiss Style / International Typographic",
    "description": "建立非对称网格，标题、栏线、编号和正文共享对齐轴。用新怪诞体的字重、字距和比例建立秩序；红色在本例中承担信息强调。",
    "descriptionEn": "Build an asymmetric grid with shared axes for headlines, rules, numbers and body copy. Use neo-grotesque type weight, spacing and scale to establish order; red carries emphasis in this study.",
    "tags": [
      "极简",
      "经典"
    ],
    "tagsEn": [
      "Minimal",
      "Classic"
    ],
    "features": [
      "构图 - 建立非对称网格，标题、栏线、编号和正文共享对齐轴。",
      "关键手法 - 用新怪诞体的字重、字距和比例建立秩序；红色在本例中承担信息强调。"
    ],
    "featuresEn": [
      "Composition - Build an asymmetric grid with shared axes for headlines, rules, numbers and body copy.",
      "Signature - Use neo-grotesque type weight, spacing and scale to establish order; red carries emphasis in this study."
    ],
    "useCases": [
      "国际艺术双年展官网",
      "先锋出版社品牌",
      "博物馆与文化机构",
      "设计教育平台",
      "高端杂志数字版"
    ],
    "useCasesEn": [
      "International art biennial sites",
      "Avant-garde publisher brands",
      "Museums and cultural institutions",
      "Design education platforms",
      "Premium magazine digital editions"
    ],
    "pros": [
      "网格、栏线与编号共同建立阅读顺序",
      "字重与比例承担主要的视觉表达",
      "非对称结构可以容纳多层信息",
      "强调色可集中用于关键信息"
    ],
    "prosEn": [
      "Grids, rules and numbering establish reading order together",
      "Type weight and scale carry the main visual expression",
      "Asymmetric structure can accommodate several information levels",
      "Accent color can be concentrated on key information"
    ],
    "cons": [
      "中文字体、字距与英文比例需要分别调整",
      "长标题与内容变化会影响网格平衡",
      "商业字体需要核实授权，也可采用合适的开放字体"
    ],
    "consEn": [
      "Chinese type, spacing and Latin proportions need separate tuning",
      "Long headlines and changing copy affect grid balance",
      "Commercial fonts require license checks; suitable open fonts are an alternative"
    ],
    "examples": [
      "Josef Müller-Brockmann 作品",
      "Emil Ruder 作品",
      "Neue Haas Grotesk 官网",
      "Type Directors Club"
    ],
    "examplesEn": [
      "Josef Müller-Brockmann works",
      "Emil Ruder works",
      "Neue Haas Grotesk site",
      "Type Directors Club"
    ],
    "pitfalls": [
      "不要只放一个超大标题；正文栏宽、基线和留白同样重要，红黄蓝并非强制色盘。"
    ],
    "pitfallsEn": [
      "A large headline alone is insufficient. Column measure, baselines and whitespace matter; primary colors are optional."
    ],
    "colors": [
      "#FFFFFF",
      "#000000",
      "#FF0000",
      "#FFD700",
      "#0000FF"
    ]
  },
  {
    "id": "bento",
    "name": "Bento 网格",
    "nameEn": "Bento Grid",
    "description": "把不同体量的信息放入有主次的模块网格，跨列卡片承担重点内容。本例桌面卡片采用 24px 圆角、白灰表面和少量蓝紫强调，手机按内容顺序重排。",
    "descriptionEn": "Arrange different amounts of information in a hierarchical modular grid; spanning cells carry the main story. This study uses 24px desktop card corners, white-gray surfaces and selective blue-violet accents, reordered for mobile.",
    "tags": [
      "极简",
      "现代"
    ],
    "tagsEn": [
      "Minimal",
      "Modern"
    ],
    "features": [
      "构图 - 把不同体量的信息放入有主次的模块网格，跨列卡片承担重点内容。",
      "关键手法 - 本例桌面卡片采用 24px 圆角、白灰表面和少量蓝紫强调，手机按内容顺序重排。"
    ],
    "featuresEn": [
      "Composition - Arrange different amounts of information in a hierarchical modular grid; spanning cells carry the main story.",
      "Signature - This study uses 24px desktop card corners, white-gray surfaces and selective blue-violet accents, reordered for mobile."
    ],
    "useCases": [
      "产品功能特性展示",
      "个人主页与 About 页面",
      "仪表盘数据概览",
      "作品集项目展示",
      "App 下载页功能介绍"
    ],
    "useCasesEn": [
      "Product feature showcases",
      "Personal homepage and About pages",
      "Dashboard data overviews",
      "Portfolio project displays",
      "App download feature introductions"
    ],
    "pros": [
      "跨列模块可以突出重点内容",
      "不同大小的卡片对应不同信息量",
      "图片、数据与简短说明可共享模块网格",
      "可与品牌字体、色彩和材质规则组合"
    ],
    "prosEn": [
      "Spanning modules can emphasize priority content",
      "Different tile sizes can reflect different amounts of information",
      "Images, data and short copy can share a modular grid",
      "The layout can combine with brand type, color and material rules"
    ],
    "cons": [
      "需要先确定每个模块的信息优先级",
      "手机端必须重新检查内容顺序和跨列规则",
      "固定卡片高度可能截断长中文和动态内容"
    ],
    "consEn": [
      "Each module needs an information priority before layout",
      "Mobile needs its own content-order and spanning checks",
      "Fixed tile heights can clip long Chinese copy and dynamic content"
    ],
    "examples": [
      "Apple 产品页",
      "Linear Features",
      "Notion 官网",
      "Raycast",
      "Arc 浏览器"
    ],
    "examplesEn": [
      "Apple Product Pages",
      "Linear Features",
      "Notion.so",
      "Raycast",
      "Arc Browser"
    ],
    "pitfalls": [
      "不要把它理解成固定配色的独立风格；它可以与设计语言组合，避免每张卡片同等抢眼。"
    ],
    "pitfallsEn": [
      "Bento is a composable layout, not a fixed palette. Avoid giving every tile equal visual weight."
    ],
    "colors": [
      "#F0F0F0",
      "#FFFFFF",
      "#1E1E1E",
      "#000000",
      "#515154"
    ]
  },
  {
    "id": "aurora",
    "name": "极光渐变",
    "nameEn": "Aurora Gradients",
    "description": "用大范围柔和渐变组织背景，保留稳定的文字和产品展示区域。让冷暖色带平滑交汇，控制模糊半径与亮度，强调色延续到少量操作。",
    "descriptionEn": "Use broad soft gradients as atmosphere while keeping copy and product areas stable. Blend warm and cool bands smoothly; control blur and luminance and carry accent color into select actions.",
    "tags": [
      "现代"
    ],
    "tagsEn": [
      "Modern"
    ],
    "features": [
      "构图 - 用大范围柔和渐变组织背景，保留稳定的文字和产品展示区域。",
      "关键手法 - 让冷暖色带平滑交汇，控制模糊半径与亮度，强调色延续到少量操作。"
    ],
    "featuresEn": [
      "Composition - Use broad soft gradients as atmosphere while keeping copy and product areas stable.",
      "Signature - Blend warm and cool bands smoothly; control blur and luminance and carry accent color into select actions."
    ],
    "useCases": [
      "SaaS 产品官网",
      "AI 产品发布页",
      "开发者工具营销页",
      "金融科技品牌",
      "科技大会活动页"
    ],
    "useCasesEn": [
      "SaaS product sites",
      "AI product launch pages",
      "Developer tool marketing",
      "Fintech brands",
      "Tech conference pages"
    ],
    "pros": [
      "大范围渐变可为内容提供氛围层",
      "色带可以从既有品牌色延伸",
      "渐变与模糊可用 CSS 表达",
      "稳定的前景表面可承接产品和主操作"
    ],
    "prosEn": [
      "Broad gradients can provide an atmospheric content layer",
      "Color bands can be derived from existing brand colors",
      "Gradients and blur can be expressed in CSS",
      "Stable foreground surfaces can hold the product and primary action"
    ],
    "cons": [
      "相近的渐变需要配合排版才能区分品牌",
      "文字背景变化时需要逐处检查对比",
      "大面积模糊或动画需在目标设备上检查渲染"
    ],
    "consEn": [
      "Similar gradients need typography to distinguish the brand",
      "Text contrast needs checking as the background changes",
      "Large blurred or animated regions need rendering checks on target devices"
    ],
    "examples": [
      "Stripe.com",
      "Linear.app",
      "Raycast.com",
      "Resend.com",
      "Clerk.com"
    ],
    "examplesEn": [
      "Stripe.com",
      "Linear.app",
      "Raycast.com",
      "Resend.com",
      "Clerk.com"
    ],
    "pitfalls": [
      "不要把所有卡片都变成渐变；文字背景需要稳定对比。"
    ],
    "pitfallsEn": [
      "Do not turn every card into a gradient; keep a stable contrast behind text."
    ],
    "colors": [
      "#FAFAFC",
      "#FFFFFF",
      "#0A0A14",
      "#55556B",
      "#8B8BA3"
    ]
  },
  {
    "id": "bauhaus",
    "name": "包豪斯",
    "nameEn": "Bauhaus",
    "description": "让几何形状、字体和空间共同构成非对称结构。本例用米白、红黄蓝和几何构成传达实验感；色彩和形状之间有明确关系。",
    "descriptionEn": "Let geometry, typography and space form an asymmetric structure together. Cream, red-yellow-blue and geometric construction express experimentation in this study; color and form have clear relationships.",
    "tags": [
      "艺术",
      "复古",
      "经典"
    ],
    "tagsEn": [
      "Art",
      "Vintage",
      "Classic"
    ],
    "features": [
      "构图 - 让几何形状、字体和空间共同构成非对称结构。",
      "关键手法 - 本例用米白、红黄蓝和几何构成传达实验感；色彩和形状之间有明确关系。"
    ],
    "featuresEn": [
      "Composition - Let geometry, typography and space form an asymmetric structure together.",
      "Signature - Cream, red-yellow-blue and geometric construction express experimentation in this study; color and form have clear relationships."
    ],
    "useCases": [
      "当代艺术画廊官网",
      "设计学院与教育机构",
      "家具品牌旗舰店",
      "建筑设计事务所",
      "创意文化活动专题页"
    ],
    "useCasesEn": [
      "Contemporary art gallery sites",
      "Design schools and institutions",
      "Furniture brand flagships",
      "Architecture design firms",
      "Creative cultural event pages"
    ],
    "pros": [
      "几何形状直接参与版面结构",
      "字体与形状的比例可以形成节奏",
      "有限色盘便于建立色彩角色",
      "重复和变化可形成跨页面的图形语言"
    ],
    "prosEn": [
      "Geometric forms participate directly in composition",
      "Proportions between type and form can establish rhythm",
      "A limited palette supports distinct color roles",
      "Repetition and variation can form a graphic language across pages"
    ],
    "cons": [
      "形状装饰需要与实际内容保持关系",
      "鲜明原色需要控制比例与文字对比",
      "复杂表单和数据页需要收敛装饰密度"
    ],
    "consEn": [
      "Geometric ornament needs a relationship with real content",
      "Vivid primaries need controlled proportions and text contrast",
      "Complex forms and data views need restrained ornament density"
    ],
    "examples": [
      "Bauhaus-Archiv Berlin",
      "Vitra Design Museum",
      "MoMA Design Store",
      "Alessi"
    ],
    "examplesEn": [
      "Bauhaus-Archiv Berlin",
      "Vitra Design Museum",
      "MoMA Design Store",
      "Alessi"
    ],
    "pitfalls": [
      "不要把粗黑描边或三个原色当成全部历史作品的统一规范。"
    ],
    "pitfallsEn": [
      "Thick black outlines and primary colors are not mandatory across all historical Bauhaus work."
    ],
    "colors": [
      "#F4F1EA",
      "#E2261C",
      "#F2BE0F",
      "#1F3BB3",
      "#131313"
    ]
  },
  {
    "id": "scandinavian",
    "name": "斯堪的纳维亚",
    "nameEn": "Scandinavian",
    "description": "以生活场景和自然材质为中心，清晰的商品信息搭配舒展留白。暖白、木色与鼠尾草绿，轻柔光照和织物细节；字体现代而温暖。",
    "descriptionEn": "Center everyday settings and natural materials, with clear product information and generous space. Warm white, wood and sage, soft lighting and textile detail, with modern warm typography.",
    "tags": [
      "极简",
      "温暖"
    ],
    "tagsEn": [
      "Minimal",
      "Warm"
    ],
    "features": [
      "构图 - 以生活场景和自然材质为中心，清晰的商品信息搭配舒展留白。",
      "关键手法 - 暖白、木色与鼠尾草绿，轻柔光照和织物细节；字体现代而温暖。"
    ],
    "featuresEn": [
      "Composition - Center everyday settings and natural materials, with clear product information and generous space.",
      "Signature - Warm white, wood and sage, soft lighting and textile detail, with modern warm typography."
    ],
    "useCases": [
      "家居家具品牌官网",
      "可持续生活方式品牌",
      "有机食品与咖啡品牌",
      "北欧旅游与体验",
      "亲子与家庭类应用"
    ],
    "useCasesEn": [
      "Home furniture brand sites",
      "Sustainable lifestyle brands",
      "Organic food and coffee brands",
      "Nordic travel and experiences",
      "Family and parenting apps"
    ],
    "pros": [
      "暖白与自然材质可以共享柔和底色",
      "生活场景图能解释商品的实际使用方式",
      "留白为商品细节和说明保留空间",
      "木色、织物与绿植可形成材质层次"
    ],
    "prosEn": [
      "Warm whites and natural materials can share a gentle foundation",
      "Everyday imagery can explain how a product is used",
      "Whitespace leaves room for product details and explanations",
      "Wood, textiles and plants can create material layers"
    ],
    "cons": [
      "只用米色卡片可能缺少内容区分",
      "低饱和配色需要保留明确的操作对比",
      "自然素材需要一致的光线、比例与来源授权"
    ],
    "consEn": [
      "Beige cards alone may not distinguish content",
      "Muted colors still need distinct action contrast",
      "Natural imagery needs consistent lighting, proportions and licensed sources"
    ],
    "examples": [
      "IKEA 宜家",
      "HAY",
      "Muuto",
      "Arket",
      "COS"
    ],
    "examplesEn": [
      "IKEA",
      "HAY",
      "Muuto",
      "Arket",
      "COS"
    ],
    "pitfalls": [
      "不要只剩米色卡片；木纹、织物、物体比例和生活感比固定圆角重要。"
    ],
    "pitfallsEn": [
      "Go beyond beige cards; wood, textiles, proportions and lived-in context matter more than a fixed radius."
    ],
    "colors": [
      "#f6f3ed",
      "#ffffff",
      "#e8dcc4",
      "#d4c4b7",
      "#b3987d"
    ]
  },
  {
    "id": "neo-brutalism",
    "name": "新粗野主义",
    "nameEn": "Neo-Brutalism",
    "description": "用清晰的信息分区、粗边框和强烈层级组织内容。本例用黑色硬边阴影、鲜明色块和粗体标题，按下时阴影收缩。",
    "descriptionEn": "Organize content with clear regions, heavy borders and emphatic hierarchy. This study uses black hard-edged shadows, bold color blocks and heavy headings; shadows contract on press.",
    "tags": [
      "前卫"
    ],
    "tagsEn": [
      "Avant-garde"
    ],
    "features": [
      "构图 - 用清晰的信息分区、粗边框和强烈层级组织内容。",
      "关键手法 - 本例用黑色硬边阴影、鲜明色块和粗体标题，按下时阴影收缩。"
    ],
    "featuresEn": [
      "Composition - Organize content with clear regions, heavy borders and emphatic hierarchy.",
      "Signature - This study uses black hard-edged shadows, bold color blocks and heavy headings; shadows contract on press."
    ],
    "useCases": [
      "开发者工具与 CLI 产品",
      "独立开发者个人项目",
      "创意工具与设计平台",
      "科技博客与文档站",
      "黑客马拉松项目"
    ],
    "useCasesEn": [
      "Developer tools and CLI products",
      "Indie developer projects",
      "Creative tools and design platforms",
      "Tech blogs and documentation sites",
      "Hackathon projects"
    ],
    "pros": [
      "粗边框能明确划分内容与控件",
      "硬阴影与按下位移形成可见的状态变化",
      "色块与粗体标题提供鲜明层级",
      "边框、偏移与阴影可用 CSS 变量统一"
    ],
    "prosEn": [
      "Heavy borders clearly separate content and controls",
      "Hard shadows and pressed offsets create visible state changes",
      "Color blocks and heavy headings provide emphatic hierarchy",
      "Borders, offsets and shadows can share CSS variables"
    ],
    "cons": [
      "边框与阴影过密会挤压内容空间",
      "强烈配色需要逐一检查文字与状态对比",
      "迁移到表格和复杂表单时需降低装饰密度"
    ],
    "consEn": [
      "Dense borders and shadows can crowd the content",
      "Strong colors require individual text and state contrast checks",
      "Tables and complex forms need reduced ornament density"
    ],
    "examples": [
      "Figma Community",
      "Gumroad",
      "Poolside.fm",
      "Pitch.com",
      "Notion 模板"
    ],
    "examplesEn": [
      "Figma Community",
      "Gumroad",
      "Poolside.fm",
      "Pitch.com",
      "Notion templates"
    ],
    "pitfalls": [
      "避免给硬阴影加模糊，也不要让强装饰压过文字与点击目标。"
    ],
    "pitfallsEn": [
      "Avoid blurring hard shadows or letting ornament obscure text and targets."
    ],
    "colors": [
      "#FFF6EA",
      "#000000",
      "#FFFFFF",
      "#FF6B35",
      "#004E89"
    ]
  },
  {
    "id": "duotone",
    "name": "双色调",
    "nameEn": "Duotone",
    "description": "让两组色调贯穿文字、分区与图像，控制明暗的对应关系。本例的暗部是深藏青、亮部是橙色；图像要呈现相同的色调映射。",
    "descriptionEn": "Carry two tonal families through type, regions and images, controlling the mapping between shadows and highlights. This study maps shadows to deep navy and highlights to orange, including image treatment.",
    "tags": [
      "艺术",
      "复古"
    ],
    "tagsEn": [
      "Art",
      "Vintage"
    ],
    "features": [
      "构图 - 让两组色调贯穿文字、分区与图像，控制明暗的对应关系。",
      "关键手法 - 本例的暗部是深藏青、亮部是橙色；图像要呈现相同的色调映射。"
    ],
    "featuresEn": [
      "Composition - Carry two tonal families through type, regions and images, controlling the mapping between shadows and highlights.",
      "Signature - This study maps shadows to deep navy and highlights to orange, including image treatment."
    ],
    "useCases": [
      "音乐流媒体平台",
      "运动与健身品牌",
      "创意机构 portfolio",
      "活动海报与营销物料",
      "社交媒体视觉内容"
    ],
    "useCasesEn": [
      "Music streaming platforms",
      "Sports and fitness brands",
      "Creative agency portfolios",
      "Event posters and marketing materials",
      "Social media visual content"
    ],
    "pros": [
      "统一色调映射可串联不同图像",
      "明暗两组色调形成明确的图文关系",
      "可用 CSS 或预处理图像实现",
      "色调规则可延伸到海报与页面分区"
    ],
    "prosEn": [
      "A shared tonal mapping can connect different images",
      "Two tonal families establish clear image and type relationships",
      "The treatment can use CSS or preprocessed imagery",
      "Tonal rules can extend to posters and page regions"
    ],
    "cons": [
      "不同原图需要分别检查明暗层次",
      "品牌色组合可能无法保留图像细节",
      "正文与状态不应被迫压缩到两种色值"
    ],
    "consEn": [
      "Each source image needs a tonal-range check",
      "A brand color pair may lose image detail",
      "Body copy and states should not be forced into two discrete colors"
    ],
    "examples": [
      "Spotify Wrapped",
      "Adidas Originals",
      "NPR",
      "Twitch 品牌",
      "Nike ACG"
    ],
    "examplesEn": [
      "Spotify Wrapped",
      "Adidas Originals",
      "NPR",
      "Twitch branding",
      "Nike ACG"
    ],
    "pitfalls": [
      "不要把两块背景色当成完整示范，也不要要求整个页面只能有两个离散色值。"
    ],
    "pitfallsEn": [
      "Two background blocks alone do not demonstrate the treatment; tonal ranges need not be only two discrete values."
    ],
    "colors": [
      "#1A1A2E",
      "#10101F",
      "#2A2A4A",
      "#FF6B35",
      "#FF8F66"
    ]
  },
  {
    "id": "japanese",
    "name": "日式极简",
    "nameEn": "Japanese Minimalism",
    "description": "用留白、自然节奏和细致的内容比例组织页面。本例采用和纸色、细线、衬线标题与小面积朱红；文字长度决定排版节奏。",
    "descriptionEn": "Use negative space, natural rhythm and careful content proportions. This study pairs paper tones, fine rules, serif headings and small vermilion accents; copy length sets the rhythm.",
    "tags": [
      "极简",
      "经典",
      "温暖"
    ],
    "tagsEn": [
      "Minimal",
      "Classic",
      "Warm"
    ],
    "features": [
      "构图 - 用留白、自然节奏和细致的内容比例组织页面。",
      "关键手法 - 本例采用和纸色、细线、衬线标题与小面积朱红；文字长度决定排版节奏。"
    ],
    "featuresEn": [
      "Composition - Use negative space, natural rhythm and careful content proportions.",
      "Signature - This study pairs paper tones, fine rules, serif headings and small vermilion accents; copy length sets the rhythm."
    ],
    "useCases": [
      "日式料理餐厅官网",
      "茶道/花道文化机构",
      "和风生活方式品牌",
      "日本传统工艺品商店",
      "冥想与身心灵应用"
    ],
    "useCasesEn": [
      "Japanese restaurant websites",
      "Tea/flower ceremony cultural institutions",
      "Japanese lifestyle brands",
      "Traditional Japanese craft stores",
      "Meditation and wellness apps"
    ],
    "pros": [
      "留白与细栏线可以形成缓慢阅读节奏",
      "自然材质与纸色支持克制的表面表达",
      "文字长度可参与构图比例",
      "小面积强调色能保留清楚的重点"
    ],
    "prosEn": [
      "Whitespace and fine rules can establish a measured reading rhythm",
      "Natural materials and paper tones support restrained surfaces",
      "Copy length can inform compositional proportions",
      "Small accent areas can preserve a clear focus"
    ],
    "cons": [
      "文化意象需要结合内容理解而非简单拼贴",
      "过量留白可能让必要信息离开首个阅读区",
      "竖排、衬线和字体回退需要检查中文长文"
    ],
    "consEn": [
      "Cultural imagery needs contextual understanding rather than collage",
      "Excessive whitespace can push essential information out of the initial reading area",
      "Vertical text, serifs and font fallbacks need long Chinese-copy checks"
    ],
    "examples": [
      "Muji 无印良品",
      "Kinfolk 杂志",
      "中川政七商店",
      "白井屋"
    ],
    "examplesEn": [
      "Muji",
      "Kinfolk Magazine",
      "Nakagawa Masashichi Shoten",
      "Shiroiya"
    ],
    "pitfalls": [
      "避免把文化风格简化为印章、竖排与空白的堆砌。"
    ],
    "pitfallsEn": [
      "Avoid reducing the aesthetic to an accumulation of seals, vertical text and empty space."
    ],
    "colors": [
      "#f6f2e6",
      "#efe9d8",
      "#2f3b38",
      "#6f6a5b",
      "#8b7355"
    ]
  },
  {
    "id": "organic",
    "name": "有机形态",
    "nameEn": "Organic Design",
    "description": "以不对称的曲线和自然图像形成流动构图，文字保持清晰。形状之间有连续的曲率关系，色彩温和，图形帮助引导阅读。",
    "descriptionEn": "Create a flowing composition with asymmetric curves and natural imagery while keeping text clear. Shapes share a coherent curvature; gentle colors and forms guide reading.",
    "tags": [
      "现代",
      "活泼"
    ],
    "tagsEn": [
      "Modern",
      "Playful"
    ],
    "features": [
      "构图 - 以不对称的曲线和自然图像形成流动构图，文字保持清晰。",
      "关键手法 - 形状之间有连续的曲率关系，色彩温和，图形帮助引导阅读。"
    ],
    "featuresEn": [
      "Composition - Create a flowing composition with asymmetric curves and natural imagery while keeping text clear.",
      "Signature - Shapes share a coherent curvature; gentle colors and forms guide reading."
    ],
    "useCases": [
      "科技公司品牌重塑",
      "创意机构官网",
      "健康与 wellness 产品",
      "教育与学习平台",
      "金融科技品牌人性化"
    ],
    "useCasesEn": [
      "Tech company rebranding",
      "Creative agency sites",
      "Health and wellness products",
      "Education and learning platforms",
      "Fintech brand humanization"
    ],
    "pros": [
      "不对称曲线可连接不同内容区域",
      "自然图像与温和色彩形成连续表面",
      "形状可作为内容之外的辅助视觉层",
      "曲率和留白规则可与现有品牌系统组合"
    ],
    "prosEn": [
      "Asymmetric curves can connect content regions",
      "Natural images and gentle colors create continuous surfaces",
      "Shapes can act as a supporting layer around the content",
      "Curvature and spacing rules can combine with an existing brand system"
    ],
    "cons": [
      "曲线裁切和叠放需要单独处理窄屏",
      "装饰形状不能挤压正文或点击目标",
      "复杂路径和形变动画需检查目标设备渲染"
    ],
    "consEn": [
      "Curved crops and overlaps need separate narrow-screen handling",
      "Decorative shapes must not crowd copy or targets",
      "Complex paths and morphing motion need target-device rendering checks"
    ],
    "examples": [
      "Stripe.com",
      "Dropbox",
      "Spotify",
      "Mailchimp",
      "Slack"
    ],
    "examplesEn": [
      "Stripe.com",
      "Dropbox",
      "Spotify",
      "Mailchimp",
      "Slack"
    ],
    "pitfalls": [
      "不要把所有文字容器都挤进水滴；自然感不等于失去网格。"
    ],
    "pitfallsEn": [
      "Do not squeeze every text container into a blob; organic form still needs layout discipline."
    ],
    "colors": [
      "#FFF9F0",
      "#A8E6CF",
      "#DCEDC1",
      "#FFD3B6",
      "#FFAAA5"
    ]
  },
  {
    "id": "liquid-glass",
    "name": "液态玻璃",
    "nameEn": "Liquid Glass",
    "description": "将浮动导航与控件放在清晰的内容层之上，避免整页内容都变成玻璃。关注透镜感、边缘高光、动态阴影和背景变化后的可读性；浅色与深色环境均可使用。",
    "descriptionEn": "Place floating navigation and controls above a clear content layer; avoid turning all content into glass. Focus on lensing, edge highlights, adaptive shadows and legibility over changing content; both light and dark contexts are valid.",
    "tags": [
      "现代",
      "前卫"
    ],
    "tagsEn": [
      "Modern",
      "Avant-garde"
    ],
    "features": [
      "构图 - 将浮动导航与控件放在清晰的内容层之上，避免整页内容都变成玻璃。",
      "关键手法 - 关注透镜感、边缘高光、动态阴影和背景变化后的可读性；浅色与深色环境均可使用。"
    ],
    "featuresEn": [
      "Composition - Place floating navigation and controls above a clear content layer; avoid turning all content into glass.",
      "Signature - Focus on lensing, edge highlights, adaptive shadows and legibility over changing content; both light and dark contexts are valid."
    ],
    "useCases": [
      "操作系统与系统级应用",
      "高端科技产品发布页",
      "音乐/视频播放器界面",
      "智能家居控制面板",
      "AR/VR 空间界面"
    ],
    "useCasesEn": [
      "Operating systems and system-level apps",
      "Premium tech product launch pages",
      "Music/video player interfaces",
      "Smart home control panels",
      "AR/VR spatial interfaces"
    ],
    "pros": [
      "浮动控件与内容层可以明确分离",
      "边缘高光可标示材质轮廓",
      "透过背景的变化可表现空间层次",
      "可以保留实色内容区承载长文与数据"
    ],
    "prosEn": [
      "Floating controls can be separated clearly from content",
      "Edge highlights can describe the material boundary",
      "Visible background variation can express spatial layers",
      "Solid content areas can carry long copy and data"
    ],
    "cons": [
      "CSS 网页效果只能近似原生材质",
      "明暗背景变化时需要检查文字与图标对比",
      "需提供不支持模糊时的实色回退并实测渲染"
    ],
    "consEn": [
      "A CSS web treatment only approximates native material",
      "Text and icon contrast need checking over changing light and dark backgrounds",
      "Provide a solid fallback without blur support and measure rendering on target devices"
    ],
    "examples": [
      "iOS 26",
      "macOS Tahoe",
      "visionOS",
      "Apple.com"
    ],
    "examplesEn": [
      "iOS 26",
      "macOS Tahoe",
      "visionOS",
      "Apple.com"
    ],
    "pitfalls": [
      "不要等同于增加 blur，也不要把深色光晕和禁用阴影当作官方规则。"
    ],
    "pitfallsEn": [
      "Do not equate it with more blur or treat dark glowing orbs and shadow removal as official requirements."
    ],
    "colors": [
      "#f7f8fa",
      "#19202b",
      "#647084",
      "#dce1e8",
      "#126be4"
    ]
  },
  {
    "id": "editorial",
    "name": "报刊编辑风",
    "nameEn": "Editorial",
    "description": "报头、文章层级、正文栏宽、图片说明和细栏线共同建立阅读顺序。本例用衬线标题、紧凑正文、首字下沉和一幅主图；重点是长文阅读的节奏。",
    "descriptionEn": "Masthead, article hierarchy, column measure, captions and fine rules establish reading order. Serif headlines, compact body copy, a drop cap and a lead image set the reading rhythm in this study.",
    "tags": [
      "经典",
      "个性",
      "艺术"
    ],
    "tagsEn": [
      "Classic",
      "Distinctive",
      "Art"
    ],
    "features": [
      "构图 - 报头、文章层级、正文栏宽、图片说明和细栏线共同建立阅读顺序。",
      "关键手法 - 本例用衬线标题、紧凑正文、首字下沉和一幅主图；重点是长文阅读的节奏。"
    ],
    "featuresEn": [
      "Composition - Masthead, article hierarchy, column measure, captions and fine rules establish reading order.",
      "Signature - Serif headlines, compact body copy, a drop cap and a lead image set the reading rhythm in this study."
    ],
    "useCases": [
      "数字杂志与 Newsletter",
      "深度报道专题页",
      "内容型个人博客",
      "出版社与书评站点",
      "品牌内容中心"
    ],
    "useCasesEn": [
      "Digital magazines and newsletters",
      "Long-form feature stories",
      "Content-first personal blogs",
      "Publishers and book review sites",
      "Brand content hubs"
    ],
    "pros": [
      "报头、栏线与图片说明建立文章层级",
      "正文栏宽与行距可围绕阅读内容调整",
      "字体对比可以承担主要视觉表达",
      "出处和图注有明确的版面位置"
    ],
    "prosEn": [
      "Mastheads, rules and captions establish article hierarchy",
      "Body measure and line spacing can be tuned to the reading content",
      "Typographic contrast can carry the main visual expression",
      "Attribution and captions have defined positions in the composition"
    ],
    "cons": [
      "长文需要实际内容验证而非占位短句",
      "多栏内容必须定义手机端的阅读顺序",
      "中文衬线回退和混排需要逐断点检查"
    ],
    "consEn": [
      "Long-form layouts need real copy rather than short placeholders",
      "Multi-column content needs an explicit mobile reading order",
      "Chinese serif fallbacks and mixed scripts need checks at each breakpoint"
    ],
    "examples": [
      "NYTimes.com",
      "The New Yorker",
      "Monocle",
      "The Economist"
    ],
    "examplesEn": [
      "NYTimes.com",
      "The New Yorker",
      "Monocle",
      "The Economist"
    ],
    "pitfalls": [
      "避免所有文案都变成超大标题，保留完整段落、出处和图片说明。"
    ],
    "pitfallsEn": [
      "Avoid making every sentence a display headline; retain paragraphs, attribution and captions."
    ],
    "colors": [
      "#FAF7F0",
      "#141414",
      "#3E3A33",
      "#C8102E",
      "#8A857C"
    ]
  },
  {
    "id": "brutalism",
    "name": "粗野主义",
    "nameEn": "Brutalism",
    "description": "用直接的文档结构、强文字层级与显露的链接建立原始网页感。本例使用浏览器式衬线体、直角、细线与链接蓝，保留内容密度。",
    "descriptionEn": "Use direct document structure, emphatic type and visible links for a raw web character. This study uses browser-like serif type, square corners, fine rules and link blue with dense content.",
    "tags": [
      "前卫",
      "个性"
    ],
    "tagsEn": [
      "Avant-garde",
      "Distinctive"
    ],
    "features": [
      "构图 - 用直接的文档结构、强文字层级与显露的链接建立原始网页感。",
      "关键手法 - 本例使用浏览器式衬线体、直角、细线与链接蓝，保留内容密度。"
    ],
    "featuresEn": [
      "Composition - Use direct document structure, emphatic type and visible links for a raw web character.",
      "Signature - This study uses browser-like serif type, square corners, fine rules and link blue with dense content."
    ],
    "useCases": [
      "先锋艺术家个人网站",
      "地下音乐厂牌",
      "实验性数字艺术项目",
      "反主流文化品牌",
      "学术研究型网站"
    ],
    "useCasesEn": [
      "Avant-garde artist personal sites",
      "Underground music labels",
      "Experimental digital art projects",
      "Counter-culture brands",
      "Academic research websites"
    ],
    "pros": [
      "显露链接与直接文档结构让导航可见",
      "文字、细线与直角可以构成完整表面",
      "可采用浏览器原生控件与系统字体",
      "内容密度可通过段落和分隔线组织"
    ],
    "prosEn": [
      "Visible links and direct document structure expose navigation",
      "Type, fine rules and square corners can form a complete surface language",
      "Native browser controls and system fonts are usable choices",
      "Paragraphs and dividers can organize dense content"
    ],
    "cons": [
      "刻意粗粝仍需明确的层级与阅读顺序",
      "原生控件的外观在不同浏览器中有差异",
      "实验排版不能遮挡焦点、链接或触控目标",
      "品牌表达需要与功能页面的日常使用协调"
    ],
    "consEn": [
      "Deliberate roughness still needs hierarchy and reading order",
      "Native control appearance varies across browsers",
      "Experimental layout must not obscure focus, links or touch targets",
      "Brand expression needs to work with everyday functional use"
    ],
    "examples": [
      "brutalistwebsites.com",
      "Craigslist",
      "Bloomberg.com (部分)",
      "hacker news"
    ],
    "examplesEn": [
      "brutalistwebsites.com",
      "Craigslist",
      "Bloomberg.com (partially)",
      "Hacker News"
    ],
    "pitfalls": [
      "刻意粗粝也需要清楚的导航和可读性，不要把损坏布局当成风格。"
    ],
    "pitfallsEn": [
      "Deliberate roughness still needs navigation and readability; broken layout is not a design principle."
    ],
    "colors": [
      "#FFFFFF",
      "#000000",
      "#0000EE",
      "#551A8B",
      "#FFFF00"
    ]
  },
  {
    "id": "terminal",
    "name": "终端黑客风",
    "nameEn": "Terminal",
    "description": "按命令、输出、日志与状态组织内容，保留终端的阅读顺序。等宽字、有限色盘、光标与清楚的成功/失败状态。",
    "descriptionEn": "Organize content as commands, output, logs and status in a terminal reading sequence. Monospace type, a limited palette, cursor and explicit success/error states.",
    "tags": [
      "复古",
      "个性"
    ],
    "tagsEn": [
      "Vintage",
      "Distinctive"
    ],
    "features": [
      "构图 - 按命令、输出、日志与状态组织内容，保留终端的阅读顺序。",
      "关键手法 - 等宽字、有限色盘、光标与清楚的成功/失败状态。"
    ],
    "featuresEn": [
      "Composition - Organize content as commands, output, logs and status in a terminal reading sequence.",
      "Signature - Monospace type, a limited palette, cursor and explicit success/error states."
    ],
    "useCases": [
      "CLI 工具与开发者产品",
      "程序员个人主页",
      "技术博客",
      "网络安全公司",
      "编程教育平台"
    ],
    "useCasesEn": [
      "CLI tools and dev products",
      "Developer portfolios",
      "Tech blogs",
      "Cybersecurity companies",
      "Coding education platforms"
    ],
    "pros": [
      "命令、输出与日志可形成明确的内容结构",
      "等宽字体便于对齐短命令与数字",
      "有限色盘可为成功、失败和提示分配角色",
      "可主要依靠文字而非图片建立氛围"
    ],
    "prosEn": [
      "Commands, output and logs can provide a clear content structure",
      "Monospace type helps align short commands and numbers",
      "A limited palette can assign roles to success, error and hints",
      "Type can establish the atmosphere without relying on images"
    ],
    "cons": [
      "命令隐喻需要为不了解终端的用户补充说明",
      "长文应调整行宽与字体以避免拥挤",
      "闪烁光标和扫描线需要关闭或减弱选项"
    ],
    "consEn": [
      "Command metaphors need explanations for people unfamiliar with terminals",
      "Long copy needs suitable measure and type to avoid crowding",
      "Blinking cursors and scanlines need a disable or reduced-motion option"
    ],
    "examples": [
      "Warp.dev",
      "Charm.sh",
      "asciinema.org",
      "cool-retro-term"
    ],
    "examplesEn": [
      "Warp.dev",
      "Charm.sh",
      "asciinema.org",
      "cool-retro-term"
    ],
    "pitfalls": [
      "避免满屏无意义代码和持续闪烁；命令示例要可读且说明用途。"
    ],
    "pitfallsEn": [
      "Avoid meaningless code and persistent blinking; commands should be readable and purposeful."
    ],
    "colors": [
      "#060907",
      "#0A0F0B",
      "#33FF66",
      "#E8FFE8",
      "#1E9E4A"
    ]
  },
  {
    "id": "memphis",
    "name": "孟菲斯",
    "nameEn": "Memphis",
    "description": "用有节奏的几何图形、图案与色块构成活泼版面。本例采用波浪、圆点、斜线和撞色，装饰围绕主标题与商品排列。",
    "descriptionEn": "Build a playful layout through rhythmic geometry, patterns and color blocks. Squiggles, dots, diagonals and clashing colors are arranged around the headline and objects in this study.",
    "tags": [
      "艺术",
      "活泼",
      "复古"
    ],
    "tagsEn": [
      "Art",
      "Playful",
      "Vintage"
    ],
    "features": [
      "构图 - 用有节奏的几何图形、图案与色块构成活泼版面。",
      "关键手法 - 本例采用波浪、圆点、斜线和撞色，装饰围绕主标题与商品排列。"
    ],
    "featuresEn": [
      "Composition - Build a playful layout through rhythmic geometry, patterns and color blocks.",
      "Signature - Squiggles, dots, diagonals and clashing colors are arranged around the headline and objects in this study."
    ],
    "useCases": [
      "儿童品牌与教育产品",
      "Y2K 复古时尚品牌",
      "音乐节与创意活动",
      "潮流玩具与收藏品",
      "社交媒体营销素材"
    ],
    "useCasesEn": [
      "Kids brands and educational products",
      "Y2K retro fashion brands",
      "Music festivals and creative events",
      "Designer toys and collectibles",
      "Social media marketing assets"
    ],
    "pros": [
      "点、线与波浪可组成重复的图形语言",
      "撞色能划分不同内容区域",
      "图案密度可以围绕主标题分配",
      "几何元素可延伸为活动和商品图形"
    ],
    "prosEn": [
      "Dots, lines and squiggles can form a repeating graphic language",
      "Clashing colors can separate content regions",
      "Pattern density can be arranged around the main heading",
      "Geometry can extend into event and product graphics"
    ],
    "cons": [
      "正文周围需要安静区域维持可读性",
      "过多图案会与主要操作争夺注意",
      "装饰叠放需要检查窄屏裁切与遮挡"
    ],
    "consEn": [
      "Body copy needs quiet surrounding areas for readability",
      "Too many patterns can compete with the primary action",
      "Decorative overlaps need narrow-screen crop and occlusion checks"
    ],
    "examples": [
      "Ettore Sottsass 作品",
      "Memphis Milano",
      "Camper 鞋履",
      "Moschino 部分系列"
    ],
    "examplesEn": [
      "Ettore Sottsass works",
      "Memphis Milano",
      "Camper shoes",
      "Moschino collections"
    ],
    "pitfalls": [
      "不要让所有图案等量出现；保留安静区域支撑阅读。"
    ],
    "pitfallsEn": [
      "Avoid distributing every pattern equally; retain quiet areas for reading."
    ],
    "colors": [
      "#FFF8EC",
      "#FF69B4",
      "#00CED1",
      "#FFD700",
      "#FF6347"
    ]
  },
  {
    "id": "art-deco",
    "name": "装饰艺术",
    "nameEn": "Art Deco",
    "description": "用对称轴、阶梯形构图和装饰边框建立仪式感。本例用深绿黑、金色细线、放射形与宽字距标题。",
    "descriptionEn": "Create ceremony with symmetry, stepped composition and ornamental framing. This study uses green-black, fine gold lines, radiating forms and widely spaced headlines.",
    "tags": [
      "经典",
      "复古"
    ],
    "tagsEn": [
      "Classic",
      "Vintage"
    ],
    "features": [
      "构图 - 用对称轴、阶梯形构图和装饰边框建立仪式感。",
      "关键手法 - 本例用深绿黑、金色细线、放射形与宽字距标题。"
    ],
    "featuresEn": [
      "Composition - Create ceremony with symmetry, stepped composition and ornamental framing.",
      "Signature - This study uses green-black, fine gold lines, radiating forms and widely spaced headlines."
    ],
    "useCases": [
      "奢侈品珠宝品牌",
      "高端酒店与度假村",
      "精品婚礼策划",
      "复古主题鸡尾酒吧",
      "古典音乐与剧院"
    ],
    "useCasesEn": [
      "Luxury jewelry brands",
      "High-end hotels and resorts",
      "Boutique wedding planning",
      "Vintage cocktail bars",
      "Classical music and theaters"
    ],
    "pros": [
      "对称轴和阶梯轮廓形成仪式化构图",
      "细线边框可为内容设置明确框架",
      "宽字距标题与几何装饰形成呼应",
      "金属色与深色表面可表现材质对比"
    ],
    "prosEn": [
      "Symmetry and stepped outlines create a ceremonial composition",
      "Fine-line frames can give content a defined structure",
      "Tracked headlines can echo geometric ornament",
      "Metallic colors and dark surfaces can express material contrast"
    ],
    "cons": [
      "装饰比例需要随标题长度调整",
      "细线和金色小字需要检查对比与清晰度",
      "窄屏需要简化边框与对称布局",
      "图形、字体和图片应采用一致的时代语汇"
    ],
    "consEn": [
      "Ornament proportions need adjustment for headline length",
      "Fine rules and small gold type need contrast and legibility checks",
      "Narrow screens need simplified frames and symmetrical layouts",
      "Graphics, type and imagery need a coherent period vocabulary"
    ],
    "examples": [
      "了不起的盖茨比",
      "克莱斯勒大厦",
      "The Savoy London",
      "Tiffany & Co."
    ],
    "examplesEn": [
      "The Great Gatsby",
      "Chrysler Building",
      "The Savoy London",
      "Tiffany & Co."
    ],
    "pitfalls": [
      "不要只靠黑金配色；几何比例和装饰节奏才构成辨识度。"
    ],
    "pitfallsEn": [
      "Black and gold alone are insufficient; geometric proportion and ornamental rhythm carry identity."
    ],
    "colors": [
      "#0B0E0C",
      "#101713",
      "#D4AF37",
      "#8C7325",
      "rgba(212,175,55,.45)"
    ]
  },
  {
    "id": "glassmorphism",
    "name": "玻璃拟态",
    "nameEn": "Glassmorphism",
    "description": "把少量半透明面板放在具有颜色与轮廓的背景之前。背景模糊、透明填充、细亮边与适量阴影共同表达磨砂玻璃；背景必须能被感知。",
    "descriptionEn": "Place a small number of translucent panels over a background with visible color and form. Backdrop blur, transparent fills, fine light borders and moderate shadows express frosted glass; the background must remain perceptible.",
    "tags": [
      "现代"
    ],
    "tagsEn": [
      "Modern"
    ],
    "features": [
      "构图 - 把少量半透明面板放在具有颜色与轮廓的背景之前。",
      "关键手法 - 背景模糊、透明填充、细亮边与适量阴影共同表达磨砂玻璃；背景必须能被感知。"
    ],
    "featuresEn": [
      "Composition - Place a small number of translucent panels over a background with visible color and form.",
      "Signature - Backdrop blur, transparent fills, fine light borders and moderate shadows express frosted glass; the background must remain perceptible."
    ],
    "useCases": [
      "SaaS 控制台与仪表盘",
      "金融科技应用界面",
      "操作系统 UI 设计",
      "科技感官网首页",
      "音乐播放器界面"
    ],
    "useCasesEn": [
      "SaaS dashboards and consoles",
      "Fintech application interfaces",
      "Operating system UI design",
      "Tech-forward homepage designs",
      "Music player interfaces"
    ],
    "pros": [
      "透明面板可保留背景的色彩与轮廓",
      "细边框与阴影可区分叠放关系",
      "局部玻璃可以与稳定的实色内容区组合",
      "明暗配色均可采用同一材质思路"
    ],
    "prosEn": [
      "Translucent panels can retain background color and form",
      "Fine borders and shadows can distinguish overlapping layers",
      "Local glass surfaces can combine with stable solid content areas",
      "The material approach can work with light or dark palettes"
    ],
    "cons": [
      "背景变化时需要重新检查文本与图标对比",
      "嵌套模糊层需在目标设备上测量渲染耗时",
      "不支持 backdrop-filter 时需要实色回退",
      "透明度过低或过高都会弱化材质与层级"
    ],
    "consEn": [
      "Text and icon contrast need rechecking as the background changes",
      "Nested blur layers need rendering measurements on target devices",
      "A solid fallback is needed without backdrop-filter support",
      "Too little or too much transparency can weaken material and hierarchy"
    ],
    "examples": [
      "macOS Big Sur",
      "iOS 控制中心",
      "Windows 11",
      "Linear.app",
      "Figma"
    ],
    "examplesEn": [
      "macOS Big Sur",
      "iOS Control Center",
      "Windows 11",
      "Linear.app",
      "Figma"
    ],
    "pitfalls": [
      "避免不透明卡片或多层无差别模糊；先保证文字对比。"
    ],
    "pitfallsEn": [
      "Avoid opaque cards and indiscriminate blur stacks; prioritize text contrast."
    ],
    "colors": [
      "#0d0f26",
      "#171a3d",
      "#f4f5ff",
      "rgba(230,233,255,.68)",
      "rgba(230,233,255,.42)"
    ]
  },
  {
    "id": "dark-academia",
    "name": "暗黑学院",
    "nameEn": "Dark Academia",
    "description": "以书籍、知识与阅读场景组织内容，采用适合长文的文字层级。深木色、墨绿、酒红和纸色，搭配克制的衬线体与材质细节。",
    "descriptionEn": "Organize content around books, scholarship and reading, with a long-form typographic hierarchy. Dark wood, forest green, wine and parchment with restrained serif type and material detail.",
    "tags": [
      "经典",
      "复古"
    ],
    "tagsEn": [
      "Classic",
      "Vintage"
    ],
    "features": [
      "构图 - 以书籍、知识与阅读场景组织内容，采用适合长文的文字层级。",
      "关键手法 - 深木色、墨绿、酒红和纸色，搭配克制的衬线体与材质细节。"
    ],
    "featuresEn": [
      "Composition - Organize content around books, scholarship and reading, with a long-form typographic hierarchy.",
      "Signature - Dark wood, forest green, wine and parchment with restrained serif type and material detail."
    ],
    "useCases": [
      "独立出版社与书店",
      "古典文学数字版",
      "学术研究机构",
      "复古文具品牌",
      "古着店与收藏馆"
    ],
    "useCasesEn": [
      "Independent publishers and bookstores",
      "Classical literature digital editions",
      "Academic research institutions",
      "Vintage stationery brands",
      "Vintage shops and collection galleries"
    ],
    "pros": [
      "书籍、纸张与木色可建立阅读场景",
      "衬线标题与细致的正文层级能够协调",
      "深木色、墨绿与纸色能划分表面层次",
      "图注、引文与来源可以融入版面"
    ],
    "prosEn": [
      "Books, paper and wood tones can establish a reading setting",
      "Serif headings can coordinate with a detailed body hierarchy",
      "Dark wood, forest green and parchment can separate surfaces",
      "Captions, quotations and sources can be integrated into the layout"
    ],
    "cons": [
      "深色底不能牺牲正文和次要信息对比",
      "材质纹理需要避免干扰长文",
      "旧书与艺术图像需要核实素材授权",
      "现代操作控件需要保持明确的可点击状态"
    ],
    "consEn": [
      "Dark surfaces must preserve body and secondary-text contrast",
      "Material textures must avoid interfering with long copy",
      "Old-book and art imagery needs source-license checks",
      "Modern controls still need explicit interactive states"
    ],
    "examples": [
      "Oxford University Press",
      "Penguin Classics",
      "The School of Life",
      "Hogwarts Legacy"
    ],
    "examplesEn": [
      "Oxford University Press",
      "Penguin Classics",
      "The School of Life",
      "Hogwarts Legacy"
    ],
    "pitfalls": [
      "不要把背景压黑到看不清正文，也不要只堆叠复古装饰。"
    ],
    "pitfallsEn": [
      "Do not sacrifice body contrast to darkness or merely pile on vintage ornament."
    ],
    "colors": [
      "#1A130C",
      "#241A11",
      "#26382F",
      "#1C2A23",
      "#EADCBE"
    ]
  },
  {
    "id": "pixel",
    "name": "像素风",
    "nameEn": "Pixel Art",
    "description": "将界面建立在统一像素单位上，按游戏 HUD 的信息层级布局。有限色盘、阶梯边缘、硬阴影和 steps 跳帧动效；标题与图形共享像素节奏。",
    "descriptionEn": "Build on a consistent pixel unit and arrange information like a game HUD. Limited palette, stepped edges, hard shadows and stepped motion; type and sprites share a pixel rhythm.",
    "tags": [
      "复古",
      "活泼",
      "个性"
    ],
    "tagsEn": [
      "Vintage",
      "Playful",
      "Distinctive"
    ],
    "features": [
      "构图 - 将界面建立在统一像素单位上，按游戏 HUD 的信息层级布局。",
      "关键手法 - 有限色盘、阶梯边缘、硬阴影和 steps 跳帧动效；标题与图形共享像素节奏。"
    ],
    "featuresEn": [
      "Composition - Build on a consistent pixel unit and arrange information like a game HUD.",
      "Signature - Limited palette, stepped edges, hard shadows and stepped motion; type and sprites share a pixel rhythm."
    ],
    "useCases": [
      "独立游戏工作室",
      "游戏发布会活动页",
      "复古主题电商",
      "数字藏品平台",
      "程序员趣味个人站"
    ],
    "useCasesEn": [
      "Indie game studios",
      "Game launch event pages",
      "Retro-themed e-commerce",
      "Digital collectible platforms",
      "Playful developer sites"
    ],
    "pros": [
      "统一像素单位可以连接字体与图形",
      "阶梯边缘与硬阴影形成一致轮廓",
      "HUD 模式可组织状态与游戏化信息",
      "有限色盘支持明确的状态角色"
    ],
    "prosEn": [
      "A shared pixel unit can connect type and graphics",
      "Stepped edges and hard shadows create consistent outlines",
      "HUD patterns can organize status and game-like information",
      "A limited palette supports distinct state roles"
    ],
    "cons": [
      "像素资产需要人工检查比例与整数缩放",
      "正文应采用可读字体并检查中文回退",
      "跳帧动画不能影响关键文字与操作"
    ],
    "consEn": [
      "Pixel assets need manual checks for proportions and integer scaling",
      "Body copy needs readable type and checked Chinese fallbacks",
      "Stepped motion must not interfere with essential copy or controls"
    ],
    "examples": [
      "Celeste",
      "Stardew Valley",
      "itch.io",
      "Poolsuite.net"
    ],
    "examplesEn": [
      "Celeste",
      "Stardew Valley",
      "itch.io",
      "Poolsuite.net"
    ],
    "pitfalls": [
      "避免柔焦、任意小数缩放和圆角；普通等宽字体不自动成为像素字体。"
    ],
    "pitfallsEn": [
      "Avoid soft focus, arbitrary fractional scaling and rounded corners; monospace is not automatically pixel type."
    ],
    "colors": [
      "#1A1C2C",
      "#29366F",
      "#333C57",
      "#94B0C2",
      "#F4F4F4"
    ]
  },
  {
    "id": "cyberpunk",
    "name": "赛博朋克",
    "nameEn": "Cyberpunk",
    "description": "用强烈的明暗对比、技术标识和非对称信息区营造未来城市感。深色基底上有限使用青、品红与警示色，切角和短暂故障动效服务层级。",
    "descriptionEn": "Use strong light-dark contrast, technical labeling and asymmetric information regions for a futuristic urban character. Use cyan, magenta and warning colors selectively over dark surfaces; clipped corners and brief glitches support hierarchy.",
    "tags": [
      "前卫",
      "个性"
    ],
    "tagsEn": [
      "Avant-garde",
      "Distinctive"
    ],
    "features": [
      "构图 - 用强烈的明暗对比、技术标识和非对称信息区营造未来城市感。",
      "关键手法 - 深色基底上有限使用青、品红与警示色，切角和短暂故障动效服务层级。"
    ],
    "featuresEn": [
      "Composition - Use strong light-dark contrast, technical labeling and asymmetric information regions for a futuristic urban character.",
      "Signature - Use cyan, magenta and warning colors selectively over dark surfaces; clipped corners and brief glitches support hierarchy."
    ],
    "useCases": [
      "游戏官网与电竞品牌",
      "科幻电影宣传站",
      "电子音乐与 DJ",
      "夜店与娱乐场所",
      "VR/AR 技术展示"
    ],
    "useCasesEn": [
      "Game websites and esports brands",
      "Sci-fi movie promotional sites",
      "Electronic music and DJs",
      "Nightclubs and entertainment venues",
      "VR/AR technology showcases"
    ],
    "pros": [
      "深色区域与少量霓虹强调形成明暗层级",
      "切角与技术标签可形成统一图形语汇",
      "非对称区域可安排任务、状态与叙事内容",
      "短暂故障效果可用于非关键装饰"
    ],
    "prosEn": [
      "Dark regions and selective neon accents establish light-dark hierarchy",
      "Clipped corners and technical labels can form a shared visual vocabulary",
      "Asymmetric regions can arrange tasks, status and narrative content",
      "Brief glitch effects can be used for nonessential decoration"
    ],
    "cons": [
      "发光边缘不能替代正文对比与焦点标识",
      "技术装饰需要与真实内容建立关系",
      "持续动画需有暂停和减弱动态效果的处理",
      "多重滤镜与大图需在目标设备上测量"
    ],
    "consEn": [
      "Glowing edges cannot replace text contrast and focus indicators",
      "Technical decoration needs a relationship with real content",
      "Continuous motion needs pause and reduced-motion handling",
      "Multiple filters and large images need measurements on target devices"
    ],
    "examples": [
      "Cyberpunk 2077",
      "银翼杀手 2049",
      "赛博朋克边缘行者",
      "AKIRA"
    ],
    "examplesEn": [
      "Cyberpunk 2077",
      "Blade Runner 2049",
      "Cyberpunk: Edgerunners",
      "AKIRA"
    ],
    "pitfalls": [
      "不要给所有文字加霓虹光，避免持续故障影响阅读与操作。"
    ],
    "pitfallsEn": [
      "Avoid neon on all text and persistent glitches that interrupt reading or interaction."
    ],
    "colors": [
      "#050508",
      "#0a0a12",
      "#0c0c16",
      "#00ffff",
      "#ff00ff"
    ]
  },
  {
    "id": "frutiger-aero",
    "name": "Frutiger Aero",
    "nameEn": "Frutiger Aero",
    "description": "让自然意象与乐观的技术界面共享一幅明亮场景。天空、水、草绿、透亮高光与柔和圆角；光照方向与反射保持一致。",
    "descriptionEn": "Combine natural imagery and optimistic technology in one bright scene. Sky, water, grass green, translucent highlights and soft corners, with consistent lighting and reflection.",
    "tags": [
      "复古",
      "活泼"
    ],
    "tagsEn": [
      "Vintage",
      "Playful"
    ],
    "features": [
      "构图 - 让自然意象与乐观的技术界面共享一幅明亮场景。",
      "关键手法 - 天空、水、草绿、透亮高光与柔和圆角；光照方向与反射保持一致。"
    ],
    "featuresEn": [
      "Composition - Combine natural imagery and optimistic technology in one bright scene.",
      "Signature - Sky, water, grass green, translucent highlights and soft corners, with consistent lighting and reflection."
    ],
    "useCases": [
      "天气/环保类应用",
      "怀旧向个人主页",
      "饮品与个护品牌",
      "儿童科技产品",
      "Y2K 复古营销活动页"
    ],
    "useCasesEn": [
      "Weather and eco apps",
      "Nostalgia-driven personal sites",
      "Beverage and personal care brands",
      "Kids' tech products",
      "Y2K revival campaign pages"
    ],
    "pros": [
      "自然图像与光泽表面可共享明亮场景",
      "天空、水与绿植可以连接不同页面区域",
      "高光与反射可表达控件体积",
      "蓝绿基底与白色内容层可以相互区分"
    ],
    "prosEn": [
      "Natural imagery and glossy surfaces can share a bright scene",
      "Sky, water and plants can connect page regions",
      "Highlights and reflections can express control volume",
      "Blue-green foundations can be separated from white content layers"
    ],
    "cons": [
      "光照、反射与图像需要保持方向一致",
      "光泽不能弱化文字、边界和操作状态",
      "自然素材的裁切与授权需要逐项确认"
    ],
    "consEn": [
      "Lighting, reflections and imagery need consistent direction",
      "Gloss must preserve copy, boundaries and control states",
      "Natural image crops and licenses need individual checks"
    ],
    "examples": [
      "Windows Vista",
      "Wii 主界面",
      "iTunes 7",
      "Frutiger Aero Archive"
    ],
    "examplesEn": [
      "Windows Vista",
      "Wii Menu",
      "iTunes 7",
      "Frutiger Aero Archive"
    ],
    "pitfalls": [
      "不要只剩蓝绿渐变；自然内容与光泽材质需要同时存在。"
    ],
    "pitfallsEn": [
      "Blue-green gradients alone are insufficient; natural content and glossy material must coexist."
    ],
    "colors": [
      "#BDE8FF",
      "#E8F7FF",
      "#FFFFFF",
      "#1B4A6B",
      "#48759B"
    ]
  },
  {
    "id": "claymorphism",
    "name": "粘土拟态",
    "nameEn": "Claymorphism",
    "description": "以少量体积饱满的角色或控件为视觉重点，留出呼吸空间。柔软圆角、内高光与带色外阴影形成膨胀感，光照保持统一。",
    "descriptionEn": "Focus on a few voluminous characters or controls with space around them. Soft corners, inset highlights and tinted cast shadows create an inflated volume under consistent lighting.",
    "tags": [
      "现代",
      "活泼"
    ],
    "tagsEn": [
      "Modern",
      "Playful"
    ],
    "features": [
      "构图 - 以少量体积饱满的角色或控件为视觉重点，留出呼吸空间。",
      "关键手法 - 柔软圆角、内高光与带色外阴影形成膨胀感，光照保持统一。"
    ],
    "featuresEn": [
      "Composition - Focus on a few voluminous characters or controls with space around them.",
      "Signature - Soft corners, inset highlights and tinted cast shadows create an inflated volume under consistent lighting."
    ],
    "useCases": [
      "儿童教育应用",
      "社交娱乐平台",
      "游戏化界面设计",
      "NFT 与数字艺术展示",
      "品牌吉祥物周边"
    ],
    "useCasesEn": [
      "Kids education apps",
      "Social entertainment platforms",
      "Gamification interface design",
      "NFT and digital art showcase",
      "Brand mascot merchandise"
    ],
    "pros": [
      "内高光与外阴影可以表现柔软体积",
      "圆润角色可成为局部视觉重点",
      "统一光照可以连接不同图形与控件",
      "材质重点可与清楚的文字表面组合"
    ],
    "prosEn": [
      "Inset highlights and cast shadows can express soft volume",
      "Rounded characters can provide a local visual focus",
      "Consistent lighting can connect graphics and controls",
      "Material focal points can combine with clear text surfaces"
    ],
    "cons": [
      "复杂角色可能需要专门的插画或 3D 资产",
      "叠加阴影与大资产需在目标设备上测量",
      "膨胀轮廓不能压缩表单和点击区域"
    ],
    "consEn": [
      "Complex characters may need dedicated illustration or 3D assets",
      "Layered shadows and large assets need target-device measurements",
      "Inflated contours must not crowd forms and target areas"
    ],
    "examples": [
      "Android 12 Logo",
      "Reddit Snoo",
      "Windows 11 Emoji",
      "Notion AI"
    ],
    "examplesEn": [
      "Android 12 Logo",
      "Reddit Snoo",
      "Windows 11 Emoji",
      "Notion AI"
    ],
    "pitfalls": [
      "避免用普通卡片加投影冒充粘土；避免装饰角色遮挡操作。"
    ],
    "pitfallsEn": [
      "A drop shadow on a flat card is not clay; keep characters away from controls."
    ],
    "colors": [
      "#FFF9F4",
      "#FFB6C1",
      "#F79CAC",
      "#87CEEB",
      "#6FBBDD"
    ]
  },
  {
    "id": "vaporwave",
    "name": "蒸汽波",
    "nameEn": "Vaporwave",
    "description": "用复古窗口、空间网格与超现实图像形成怀旧场景。本例采用粉、青、紫的色调关系，保留明确的前景文字层。",
    "descriptionEn": "Combine retro windows, perspective grids and surreal imagery into a nostalgic scene. This study uses pink, cyan and violet while retaining a distinct foreground text layer.",
    "tags": [
      "艺术",
      "复古"
    ],
    "tagsEn": [
      "Art",
      "Vintage"
    ],
    "features": [
      "构图 - 用复古窗口、空间网格与超现实图像形成怀旧场景。",
      "关键手法 - 本例采用粉、青、紫的色调关系，保留明确的前景文字层。"
    ],
    "featuresEn": [
      "Composition - Combine retro windows, perspective grids and surreal imagery into a nostalgic scene.",
      "Signature - This study uses pink, cyan and violet while retaining a distinct foreground text layer."
    ],
    "useCases": [
      "复古电子音乐项目",
      "潮流服饰限量系列",
      "互联网艺术项目",
      "怀旧主题活动",
      "NFT 与数字收藏品"
    ],
    "useCasesEn": [
      "Retro electronic music projects",
      "Streetwear limited editions",
      "Internet art projects",
      "Nostalgia-themed events",
      "NFTs and digital collectibles"
    ],
    "pros": [
      "复古窗口与透视网格可构成场景结构",
      "粉、青、紫可形成统一色调关系",
      "超现实图像可以承接明确的叙事主题",
      "前景文字层可以与装饰场景分离"
    ],
    "prosEn": [
      "Retro windows and perspective grids can structure a scene",
      "Pink, cyan and violet can form a shared tonal relationship",
      "Surreal imagery can support a defined narrative theme",
      "Foreground text can be separated from the decorative scene"
    ],
    "cons": [
      "需要说明文化语境，避免只堆积复古符号",
      "荧光色与网格可能干扰正文阅读",
      "窗口叠放需要检查窄屏阅读顺序",
      "雕塑、音乐和旧界面素材需要核实授权"
    ],
    "consEn": [
      "The cultural context needs explanation beyond accumulated retro symbols",
      "Fluorescent colors and grids can interfere with body copy",
      "Overlapping windows need narrow-screen reading-order checks",
      "Sculpture, music and old-interface assets need license checks"
    ],
    "examples": [
      "Macintosh Plus - Floral Shoppe",
      "Saint Pepsi",
      "Arizona Iced Tea x Adidas"
    ],
    "examplesEn": [
      "Macintosh Plus - Floral Shoppe",
      "Saint Pepsi",
      "Arizona Iced Tea x Adidas"
    ],
    "pitfalls": [
      "避免荧光背景吞掉文字，不要把所有复古元素都塞进同一屏。"
    ],
    "pitfallsEn": [
      "Avoid losing text in fluorescent backgrounds or packing every retro motif into one screen."
    ],
    "colors": [
      "#FF69B4",
      "#00CED1",
      "#9400D3",
      "#FFD700",
      "#1E90FF"
    ]
  },
  {
    "id": "maximalism",
    "name": "极繁主义",
    "nameEn": "Maximalism",
    "description": "建立一个强主视觉，再用次级文字、图案与层叠内容丰富节奏。高密度、多尺度与鲜明色彩同时存在，仍有主次、重复和呼应。",
    "descriptionEn": "Establish a dominant visual, then enrich it with secondary type, patterns and layered content. High density, multiple scales and vivid colors coexist with hierarchy, repetition and echoes.",
    "tags": [
      "艺术",
      "个性"
    ],
    "tagsEn": [
      "Art",
      "Distinctive"
    ],
    "features": [
      "构图 - 建立一个强主视觉，再用次级文字、图案与层叠内容丰富节奏。",
      "关键手法 - 高密度、多尺度与鲜明色彩同时存在，仍有主次、重复和呼应。"
    ],
    "featuresEn": [
      "Composition - Establish a dominant visual, then enrich it with secondary type, patterns and layered content.",
      "Signature - High density, multiple scales and vivid colors coexist with hierarchy, repetition and echoes."
    ],
    "useCases": [
      "奢侈品牌旗舰站",
      "高端时尚杂志数字版",
      "艺术展览与博物馆",
      "节庆活动专题页",
      "名人与明星官网"
    ],
    "useCasesEn": [
      "Luxury brand flagships",
      "High-end fashion magazine digital editions",
      "Art exhibitions and museums",
      "Festival event pages",
      "Celebrity official sites"
    ],
    "pros": [
      "多尺度文字与图像可形成丰富层级",
      "重复图案可以串联高密度内容",
      "叠放关系可支持多个叙事线索",
      "鲜明色彩与静区可共同安排视觉节奏"
    ],
    "prosEn": [
      "Multiple type and image scales can form a rich hierarchy",
      "Repeating patterns can connect dense content",
      "Layering can support several narrative threads",
      "Vivid colors and quiet regions can arrange visual rhythm together"
    ],
    "cons": [
      "需要明确主视觉与主操作的位置",
      "图片数量和尺寸需要独立预算与测量",
      "新增内容时需要重新检查遮挡与层级",
      "手机端需要重排而非缩小整幅桌面构图"
    ],
    "consEn": [
      "The dominant visual and primary action need explicit positions",
      "Image count and size need a separate budget and measurements",
      "New content requires renewed occlusion and hierarchy checks",
      "Mobile needs recomposition rather than a scaled desktop layout"
    ],
    "examples": [
      "Gucci.com",
      "Valentino",
      "Dolce & Gabbana",
      "Versace",
      "Vogue Italia"
    ],
    "examplesEn": [
      "Gucci.com",
      "Valentino",
      "Dolce & Gabbana",
      "Versace",
      "Vogue Italia"
    ],
    "pitfalls": [
      "不要把无序堆叠当作极繁；需要给主操作和正文留下明确位置。"
    ],
    "pitfallsEn": [
      "Disorder alone is not maximalism; reserve clear space for primary actions and body copy."
    ],
    "colors": [
      "#FFF3D6",
      "#FF1493",
      "#00FF00",
      "#FFD700",
      "#FF4500"
    ]
  },
  {
    "id": "kinetic",
    "name": "动态字体",
    "nameEn": "Kinetic Typography",
    "description": "让文字运动承担节奏与叙事，静止时仍保留完整阅读结构。速度、位移、字距与字重有明确编排，提供暂停并尊重减弱动态效果。",
    "descriptionEn": "Use moving type for rhythm and storytelling while preserving a complete static reading structure. Choreograph speed, displacement, spacing and weight; provide pause and respect reduced motion.",
    "tags": [
      "艺术",
      "前卫"
    ],
    "tagsEn": [
      "Art",
      "Avant-garde"
    ],
    "features": [
      "构图 - 让文字运动承担节奏与叙事，静止时仍保留完整阅读结构。",
      "关键手法 - 速度、位移、字距与字重有明确编排，提供暂停并尊重减弱动态效果。"
    ],
    "featuresEn": [
      "Composition - Use moving type for rhythm and storytelling while preserving a complete static reading structure.",
      "Signature - Choreograph speed, displacement, spacing and weight; provide pause and respect reduced motion."
    ],
    "useCases": [
      "创意机构官网",
      "电影/MV 宣传站",
      "设计师个人作品集",
      "品牌活动专题页",
      "艺术装置互动网站"
    ],
    "useCasesEn": [
      "Creative agency websites",
      "Film/MV promotional sites",
      "Designer personal portfolios",
      "Brand campaign microsites",
      "Art installation interactive sites"
    ],
    "pros": [
      "文字运动可以承担内容节奏",
      "位移、字重和字距可对应叙事阶段",
      "静态构图可保留相同的信息层级",
      "局部动效能与既有品牌字体配合"
    ],
    "prosEn": [
      "Type motion can carry the rhythm of the content",
      "Displacement, weight and spacing can follow narrative stages",
      "A static composition can retain the same information hierarchy",
      "Local motion can work with existing brand type"
    ],
    "cons": [
      "动画需要检查目标设备上的渲染和输入响应",
      "必须提供可读静态内容并尊重减弱动态效果",
      "持续运动需要暂停控制，不能淹没主操作",
      "关键文字应存在于语义化文档中并可被检索"
    ],
    "consEn": [
      "Motion needs rendering and input-response checks on target devices",
      "Readable static content and reduced-motion preferences must be supported",
      "Continuous motion needs pause controls and must not obscure the primary action",
      "Essential copy should remain in the semantic document and be searchable"
    ],
    "examples": [
      "Apple 产品发布会",
      "Active Theory 作品",
      "Awwwards 获奖站",
      "KIKK Festival"
    ],
    "examplesEn": [
      "Apple keynotes",
      "Active Theory works",
      "Awwwards winners",
      "KIKK Festival"
    ],
    "pitfalls": [
      "避免持续跑马灯代替内容；不要把关键文案放在无法停下的动画里。"
    ],
    "pitfallsEn": [
      "Do not replace content with endless marquees or trap important copy inside unpausable motion."
    ],
    "colors": [
      "#000000",
      "#FFFFFF",
      "#FF0000",
      "#8a8a8a",
      "#2b2b2b"
    ]
  },
  {
    "id": "anti-design",
    "name": "反设计",
    "nameEn": "Anti-Design",
    "description": "有意打破局部对齐和字体惯例，同时让导航与内容顺序可理解。本例用冲突原色、错位标签和字体混搭，形成有控制的反差。",
    "descriptionEn": "Break selected alignment and typographic conventions while keeping navigation and content order understandable. Clashing primaries, displaced labels and mixed type create controlled tension in this study.",
    "tags": [
      "前卫",
      "个性"
    ],
    "tagsEn": [
      "Avant-garde",
      "Distinctive"
    ],
    "features": [
      "构图 - 有意打破局部对齐和字体惯例，同时让导航与内容顺序可理解。",
      "关键手法 - 本例用冲突原色、错位标签和字体混搭，形成有控制的反差。"
    ],
    "featuresEn": [
      "Composition - Break selected alignment and typographic conventions while keeping navigation and content order understandable.",
      "Signature - Clashing primaries, displaced labels and mixed type create controlled tension in this study."
    ],
    "useCases": [
      "Z世代潮流品牌",
      "独立音乐人与乐队",
      "街头服饰品牌",
      "创意活动与快闪店",
      "社交媒体病毒营销"
    ],
    "useCasesEn": [
      "Gen Z streetwear brands",
      "Independent musicians and bands",
      "Streetwear fashion brands",
      "Creative events and pop-ups",
      "Social media viral marketing"
    ],
    "pros": [
      "局部错位可以与稳定的阅读结构形成反差",
      "字体混搭可承接明确的表达主题",
      "冲突色与标签可建立独立图形语汇",
      "实验区域可以限制在局部内容中"
    ],
    "prosEn": [
      "Local displacement can create tension against a stable reading structure",
      "Mixed type can support a defined expressive theme",
      "Clashing colors and labels can establish a distinct graphic vocabulary",
      "Experimental treatment can be limited to local content regions"
    ],
    "cons": [
      "导航、焦点和点击目标仍需清楚可用",
      "打破的规则应有表达目的并写入规范",
      "中文长标题与字体回退可能改变错位关系",
      "多页面扩展需要界定哪些规则可以变化"
    ],
    "consEn": [
      "Navigation, focus and targets still need to be clear and usable",
      "Broken conventions need an expressive purpose recorded in the specification",
      "Long Chinese headlines and font fallbacks can change displacement relationships",
      "Multi-page expansion needs boundaries for which rules may vary"
    ],
    "examples": [
      "Charli XCX - Brat",
      "Balenciaga 部分campaign",
      "MSCHF",
      "Yaeji"
    ],
    "examplesEn": [
      "Charli XCX - Brat",
      "Balenciaga campaigns",
      "MSCHF",
      "Yaeji"
    ],
    "pitfalls": [
      "不要把遮挡、不可点击或不可读当成设计目标。"
    ],
    "pitfallsEn": [
      "Occlusion, unusable controls and illegibility are not design goals."
    ],
    "colors": [
      "#FFFFFF",
      "#89FC00",
      "#FF00FF",
      "#FF0000",
      "#0000FF"
    ]
  },
  {
    "id": "neumorphism",
    "name": "新拟态",
    "nameEn": "Neumorphism / Soft UI",
    "description": "用同一基底上的凸起与凹陷组织少量控件。成对明暗阴影共享光照方向；选中状态与标签需要额外清楚。",
    "descriptionEn": "Organize a small number of controls through raised and inset forms on one base material. Paired light and dark shadows share a lighting direction; labels and selection need explicit clarity.",
    "tags": [
      "现代",
      "极简"
    ],
    "tagsEn": [
      "Modern",
      "Minimal"
    ],
    "features": [
      "构图 - 用同一基底上的凸起与凹陷组织少量控件。",
      "关键手法 - 成对明暗阴影共享光照方向；选中状态与标签需要额外清楚。"
    ],
    "featuresEn": [
      "Composition - Organize a small number of controls through raised and inset forms on one base material.",
      "Signature - Paired light and dark shadows share a lighting direction; labels and selection need explicit clarity."
    ],
    "useCases": [
      "概念设计与 Dribbble 展示",
      "冥想与放松类应用",
      "智能家居控制面板",
      "简约音乐播放器",
      "个人项目与实验"
    ],
    "useCasesEn": [
      "Concept design and Dribbble showcases",
      "Meditation and relaxation apps",
      "Smart home control panels",
      "Minimal music players",
      "Personal projects and experiments"
    ],
    "pros": [
      "成对阴影可以表达同一基底上的凸起与凹陷",
      "共享光照方向可连接不同控件",
      "材质表达可以集中在少量重点控件",
      "实线边界和文字标签可补充状态表达"
    ],
    "prosEn": [
      "Paired shadows can express raised and inset forms on one base",
      "A shared lighting direction can connect controls",
      "Material treatment can be concentrated on a few focal controls",
      "Solid boundaries and text labels can supplement state expression"
    ],
    "cons": [
      "低对比阴影不能单独承担边界和状态",
      "按钮与输入框需要额外的焦点、标签和选中标识",
      "浅色与深色主题需要分别调整阴影和对比",
      "高对比偏好与无阴影回退需要保留可辨识边界"
    ],
    "consEn": [
      "Low-contrast shadows cannot carry boundaries and states alone",
      "Buttons and inputs need additional focus, labels and selection indicators",
      "Light and dark themes need separate shadow and contrast tuning",
      "High-contrast preferences and shadow-free fallbacks need identifiable boundaries"
    ],
    "examples": [
      "Dribbble 概念作品",
      "智能家居 UI",
      "Tesla 车机界面参考"
    ],
    "examplesEn": [
      "Dribbble concepts",
      "Smart home UI",
      "Tesla car UI references"
    ],
    "pitfalls": [
      "不要仅靠低对比阴影区分状态，保持键盘焦点和触控可用。"
    ],
    "pitfallsEn": [
      "Do not rely solely on low-contrast shadows for state; retain keyboard focus and usable touch targets."
    ],
    "colors": [
      "#E0E5EC",
      "#EAEFF6",
      "#D6DCE5",
      "#FFFFFF",
      "#A3B1C6"
    ]
  }
] satisfies DesignStyle[];

export type StyleId = (typeof designStyles)[number]['id'];

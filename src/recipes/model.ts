export type Language = 'zh' | 'en';
export type Scene = 'landing' | 'dashboard' | 'portfolio' | 'editorial' | 'commerce' | 'chat';
export type Copy = { zh: string; en: string };
const c = (zh: string, en: string): Copy => ({ zh, en });
export const catalogVersion = '2026.09.2';
export const maxRecipeBytes = 1_600_000;
export const scenes = [
  { id: 'landing', ...c('产品展示页', 'Product page'), description: c('让一个想法，有自己的样子。', 'Give your idea a presence.') },
  { id: 'dashboard', ...c('工具后台', 'Workspace'), description: c('让复杂的信息，变得清楚。', 'Make complex information clear.') },
  { id: 'portfolio', ...c('作品集', 'Portfolio'), description: c('让作品先开口。', 'Let the work speak first.') },
  { id: 'editorial', ...c('博客杂志', 'Journal'), description: c('为故事找到合适的节奏。', 'Find a rhythm for your stories.') },
  { id: 'commerce', ...c('电商精选', 'Commerce'), description: c('从发现，到认真挑选。', 'From discovery to a considered choice.') },
  { id: 'chat', ...c('聊天应用', 'Conversation'), description: c('让对话和上下文自然相遇。', 'Bring conversations and context together.') },
] as const;
export const layouts = [
  { id: 'split', scene: 'landing', ...c('左右分栏', 'Split story'), rule: c('桌面文字与产品画面左右分栏；760px 以下先文字后画面。', 'Split copy and product on desktop; below 760px, place copy before the visual.') },
  { id: 'center', scene: 'landing', ...c('主视觉居中', 'Center stage'), rule: c('标题、说明和操作居中，产品画面在下；760px 以下缩小标题和边距。', 'Center the headline, copy and action above the product; reduce type and gutters below 760px.') },
  { id: 'sidebar', scene: 'dashboard', ...c('侧栏导航', 'Sidebar'), rule: c('桌面侧栏与工作区分列；760px 以下导航变为顶部可换行的操作组。', 'Use a sidebar beside the workspace; below 760px, wrap navigation across the top.') },
  { id: 'topbar', scene: 'dashboard', ...c('顶部导航', 'Top navigation'), rule: c('导航横排，工作区居中；760px 以下导航换行，指标与表单单列。', 'Use horizontal navigation above a centered workspace; below 760px, wrap navigation and stack metrics and forms.') },
  { id: 'gallery', scene: 'portfolio', ...c('非对称画廊', 'Asymmetric gallery'), rule: c('大幅项目与窄栏索引相互对齐，重点项目跨列；760px 以下按项目顺序单列。', 'Pair large projects with a narrow index and spanning lead work; stack projects below 760px.') },
  { id: 'masonry', scene: 'portfolio', ...c('瀑布流作品墙', 'Masonry wall'), rule: c('按不同画幅错落组织作品，以列为阅读顺序；760px 以下保持来源顺序单列。', 'Arrange varied aspect ratios in columns, read top to bottom; preserve source order in a single column below 760px.') },
  { id: 'magazine', scene: 'editorial', ...c('杂志封面', 'Magazine front'), rule: c('主报道、次要文章和栏目索引构成多栏版面；760px 以下主报道优先。', 'Build a front page from a lead story, supporting articles and an index; prioritize the lead below 760px.') },
  { id: 'reader', scene: 'editorial', ...c('长文阅读', 'Longform reader'), rule: c('正文采用受控栏宽，边栏显示目录与旁注；760px 以下目录在正文前折叠。', 'Constrain the reading measure with a contents rail and marginal notes; collapse contents above the article below 760px.') },
  { id: 'catalog', scene: 'commerce', ...c('商品目录', 'Product catalog'), rule: c('分类筛选、主推商品和商品网格组成浏览页；760px 以下筛选换行，商品双列或单列。', 'Use category filters, a featured product and a grid; wrap filters and reduce columns below 760px.') },
  { id: 'product', scene: 'commerce', ...c('商品详情', 'Product detail'), rule: c('桌面图片与购买说明分栏，包含规格、数量和购买操作；760px 以下图片先行。', 'Place imagery beside specifications, quantity and purchase controls; put imagery first below 760px.') },
  { id: 'conversation', scene: 'chat', ...c('专注对话', 'Focused conversation'), rule: c('对话居中，输入框位于对话末尾，参考内容按需展开；窄屏保留输入操作。', 'Center the conversation with the composer at its end and references on demand; retain the composer on narrow screens.') },
  { id: 'inbox', scene: 'chat', ...c('收件箱与详情', 'Inbox & detail'), rule: c('桌面会话列表与消息详情分栏；760px 以下以列表与详情两级切换并提供返回。', 'Split threads and messages on desktop; below 760px switch between list and detail with a back action.') },
] as const;
export const palettes = [
  { id: 'paper', ...c('暖纸朱红', 'Paper & vermilion'), bg: '#f5f1e8', surface: '#fffdf7', text: '#292820', muted: '#706b60', accent: '#a63b25', onAccent: '#ffffff', line: '#d8d0bf', success: '#28613e', danger: '#a12e24' },
  { id: 'forest', ...c('苔绿奶油', 'Forest & cream'), bg: '#f0f1e9', surface: '#fafbf5', text: '#22362c', muted: '#5d6e61', accent: '#2e6047', onAccent: '#ffffff', line: '#ccd5c9', success: '#28613e', danger: '#a12e24' },
  { id: 'blue', ...c('冷灰蓝', 'Cool blue'), bg: '#f0f3f8', surface: '#ffffff', text: '#19263d', muted: '#5c6b80', accent: '#2854c5', onAccent: '#ffffff', line: '#d4ddea', success: '#28613e', danger: '#a12e24' },
  { id: 'ink', ...c('深夜柑橘', 'Ink & citrus'), bg: '#171c1a', surface: '#222b26', text: '#f1f4e8', muted: '#b4bfb3', accent: '#d8ec95', onAccent: '#20301e', line: '#49554a', success: '#a7dba6', danger: '#ffaaa0' },
  { id: 'mono', ...c('黑白原稿', 'Monochrome'), bg: '#f4f4f2', surface: '#ffffff', text: '#222222', muted: '#646464', accent: '#222222', onAccent: '#ffffff', line: '#d3d3cf', success: '#28613e', danger: '#a12e24' },
  { id: 'lilac', ...c('紫墨薄雾', 'Lilac & plum'), bg: '#f1edf6', surface: '#fcfaff', text: '#31263f', muted: '#756480', accent: '#71429a', onAccent: '#ffffff', line: '#d8cce3', success: '#28613e', danger: '#a12e24' },
] as const;
export const fonts = [
  { id: 'sans', ...c('现代无衬线', 'Modern sans'), sample: 'Aa / 清晰', heading: '"Recipe Inter", "PingFang SC", "Microsoft YaHei", sans-serif', body: '"Recipe Inter", "PingFang SC", "Microsoft YaHei", sans-serif', weight: '600', tracking: '-0.045em', scale: '1' },
  { id: 'serif', ...c('衬线标题', 'Editorial serif'), sample: 'Aa / 叙事', heading: '"Recipe Serif", "Songti SC", "Noto Serif CJK SC", serif', body: '"Recipe Inter", "PingFang SC", "Microsoft YaHei", sans-serif', weight: '500', tracking: '-0.045em', scale: '1.07' },
  { id: 'technical', ...c('技术感标题', 'Technical mono'), sample: 'Aa / 秩序', heading: '"SFMono-Regular", Consolas, "Liberation Mono", "PingFang SC", monospace', body: '"Recipe Inter", "PingFang SC", "Microsoft YaHei", sans-serif', weight: '600', tracking: '-0.055em', scale: '.9' },
] as const;
export const densities = [
  { id: 'airy', ...c('舒展', 'Airy'), space: '28px', gutter: '56px', row: '20px' },
  { id: 'standard', ...c('标准', 'Standard'), space: '20px', gutter: '40px', row: '14px' },
  { id: 'compact', ...c('紧凑', 'Compact'), space: '12px', gutter: '28px', row: '10px' },
] as const;
export const surfaces = [
  { id: 'flat', ...c('平面细线', 'Fine lines'), radius: '2px', shadow: 'none', border: '1px' },
  { id: 'soft', ...c('柔和圆角', 'Soft edges'), radius: '18px', shadow: '0 12px 32px #0000000d', border: '1px' },
  { id: 'hard', ...c('硬边块面', 'Hard edges'), radius: '0px', shadow: '5px 5px 0 var(--text)', border: '2px' },
] as const;
export const motions = [ { id: 'off', ...c('关闭', 'Off') }, { id: 'light', ...c('轻量', 'Light') } ] as const;
export const visuals = [
  { id: 'original', ...c('产品界面', 'Product UI'), note: c('以真实渲染的界面组织主视觉。', 'Use a rendered product interface.') },
  { id: 'photo', ...c('摄影与影像', 'Photography'), note: c('使用示例影像，或替换为自己的照片。', 'Use the sample image or replace it with your photo.') },
  { id: 'geometry', ...c('几何构成', 'Geometry'), note: c('用形状、尺度与网格形成重心。', 'Build a focal point from shapes, scale and a grid.') },
  { id: 'illustration', ...c('线条插画', 'Illustration'), note: c('用原创线条场景表达主题。', 'An original line drawing introduces the subject.') },
  { id: 'type', ...c('纯字体', 'Typography'), note: c('以文字比例和重复建立视觉主体。', 'Make type scale and repetition the main visual.') },
  { id: 'texture', ...c('纹理与材质', 'Texture'), note: c('纸张、网点与层叠色块组成肌理。', 'Paper, halftones and layered fields create texture.') },
  { id: 'chart', ...c('数据图表', 'Data story'), note: c('用趋势和数据注释组织画面。', 'Use trends and annotations as the focal point.') },
] as const;
export interface Selection {
  visual: typeof visuals[number]['id'];
  layout: typeof layouts[number]['id'];
  palette: typeof palettes[number]['id'];
  font: typeof fonts[number]['id'];
  density: typeof densities[number]['id'];
  surface: typeof surfaces[number]['id'];
  motion: typeof motions[number]['id'];
}
export interface Recipe {
  id: string; scene: Scene; name: Copy; note: Copy; styles: string[]; selection: Selection;
}
export const recipes: Recipe[] = [
  { id: 'paper-story', scene: 'landing', name: c('纸感阅读', 'Paper story'), note: c('衬线标题与细栏线，留出阅读的节奏。', 'Serif headlines, fine rules, room to read.'), styles: ['editorial', 'japanese'], selection: { visual: 'original', layout: 'center', palette: 'paper', font: 'serif', density: 'airy', surface: 'flat', motion: 'off' } },
  { id: 'quiet-product', scene: 'landing', name: c('清晰产品', 'Quiet product'), note: c('稳定的网格，让产品画面成为重点。', 'A steady grid puts the product first.'), styles: ['apple', 'flat'], selection: { visual: 'photo', layout: 'split', palette: 'blue', font: 'sans', density: 'airy', surface: 'soft', motion: 'light' } },
  { id: 'bold-studio', scene: 'landing', name: c('鲜明工作室', 'Bold studio'), note: c('黑白、硬边和直接的视觉层级。', 'Monochrome, hard edges, a direct hierarchy.'), styles: ['neo-brutalism', 'swiss'], selection: { visual: 'geometry', layout: 'split', palette: 'mono', font: 'sans', density: 'standard', surface: 'hard', motion: 'light' } },
  { id: 'after-hours', scene: 'landing', name: c('夜间灵感', 'After hours'), note: c('深色底与明亮操作，带一点技术气质。', 'Dark surfaces, bright actions, technical type.'), styles: ['terminal'], selection: { visual: 'type', layout: 'center', palette: 'ink', font: 'technical', density: 'standard', surface: 'soft', motion: 'light' } },
  { id: 'clear-desk', scene: 'dashboard', name: c('清晰工作台', 'Clear desk'), note: c('冷静的蓝灰层次，适合日常任务。', 'Calm blue-gray layers for everyday work.'), styles: ['material', 'flat'], selection: { visual: 'original', layout: 'sidebar', palette: 'blue', font: 'sans', density: 'standard', surface: 'soft', motion: 'light' } },
  { id: 'field-notes', scene: 'dashboard', name: c('林间手记', 'Field notes'), note: c('绿色与细线，让信息轻松归位。', 'Forest greens and fine rules organize information.'), styles: ['braun', 'scandinavian'], selection: { visual: 'photo', layout: 'topbar', palette: 'forest', font: 'serif', density: 'airy', surface: 'flat', motion: 'off' } },
  { id: 'night-shift', scene: 'dashboard', name: c('夜班控制室', 'Night shift'), note: c('紧凑布局，清楚呈现任务与状态。', 'Compact spacing, explicit tasks and states.'), styles: ['terminal'], selection: { visual: 'original', layout: 'sidebar', palette: 'ink', font: 'technical', density: 'compact', surface: 'flat', motion: 'off' } },
  { id: 'lilac-room', scene: 'dashboard', name: c('紫墨空间', 'Lilac room'), note: c('柔和表面搭配清楚的操作层级。', 'Soft surfaces with a clear action hierarchy.'), styles: ['material'], selection: { visual: 'illustration', layout: 'topbar', palette: 'lilac', font: 'sans', density: 'standard', surface: 'soft', motion: 'light' } },

  { id: 'atelier-index', scene: 'portfolio', name: c('编辑式设计档案', 'Atelier index'), note: c('非对称主作品与编号索引。', 'An asymmetric lead project and numbered index.'), styles: ['swiss','editorial'], selection: { layout:'gallery',palette:'paper',font:'serif',density:'airy',surface:'flat',motion:'off',visual:'photo' } },
  { id: 'form-studio', scene: 'portfolio', name: c('几何工作室', 'Form studio'), note: c('大尺度几何构成与清楚的作品分组。', 'Large geometric forms and a clear project hierarchy.'), styles: ['bauhaus','bento'], selection: { layout:'gallery',palette:'mono',font:'sans',density:'standard',surface:'hard',motion:'light',visual:'geometry' } },
  { id: 'image-wall', scene: 'portfolio', name: c('影像作品墙', 'Image wall'), note: c('长短画幅组成自由的作品节奏。', 'Varied image ratios create an open visual rhythm.'), styles: ['scandinavian','organic'], selection: { layout:'masonry',palette:'forest',font:'sans',density:'compact',surface:'flat',motion:'light',visual:'photo' } },
  { id: 'type-archive', scene: 'portfolio', name: c('字体实验档案', 'Type archive'), note: c('黑底、醒目字体与错落的作品墙。', 'Dark backgrounds, expressive type and a staggered archive.'), styles: ['kinetic','brutalism'], selection: { layout:'masonry',palette:'ink',font:'technical',density:'standard',surface:'flat',motion:'light',visual:'type' } },
  { id: 'slow-journal', scene: 'editorial', name: c('慢读周刊', 'The slow journal'), note: c('以影像主报道建立封面层级。', 'A photographic lead story anchors the front page.'), styles: ['editorial','japanese'], selection: { layout:'magazine',palette:'paper',font:'serif',density:'standard',surface:'flat',motion:'off',visual:'photo' } },
  { id: 'signal-review', scene: 'editorial', name: c('信号评论', 'Signal review'), note: c('图表、栏目与紧凑的报道索引。', 'Data stories, sections and a compact article index.'), styles: ['swiss','braun'], selection: { layout:'magazine',palette:'blue',font:'sans',density:'compact',surface:'flat',motion:'light',visual:'chart' } },
  { id: 'quiet-essay', scene: 'editorial', name: c('安静的长文', 'A quiet essay'), note: c('受控的正文栏宽与线条插画。', 'A measured reading column with line illustration.'), styles: ['japanese','organic'], selection: { layout:'reader',palette:'forest',font:'serif',density:'airy',surface:'flat',motion:'off',visual:'illustration' } },
  { id: 'printed-letter', scene: 'editorial', name: c('纸上来信', 'Printed letter'), note: c('网点肌理、衬线标题与段落节奏。', 'Halftone texture, serif headings and measured paragraphs.'), styles: ['editorial','dark-academia'], selection: { layout:'reader',palette:'paper',font:'serif',density:'standard',surface:'flat',motion:'off',visual:'texture' } },
  { id: 'objects-store', scene: 'commerce', name: c('日常器物店', 'Everyday objects'), note: c('主推影像与紧凑的商品目录。', 'Featured imagery above a browsable catalog.'), styles: ['scandinavian','apple'], selection: { layout:'catalog',palette:'paper',font:'serif',density:'standard',surface:'flat',motion:'light',visual:'photo' } },
  { id: 'color-supply', scene: 'commerce', name: c('色彩补给站', 'Color supply'), note: c('鲜明的图形与硬边商品网格。', 'Bold graphics and a hard-edged product grid.'), styles: ['neo-brutalism','bauhaus'], selection: { layout:'catalog',palette:'lilac',font:'sans',density:'compact',surface:'hard',motion:'light',visual:'geometry' } },
  { id: 'one-good-object', scene: 'commerce', name: c('一件好东西', 'One good object'), note: c('让产品影像、规格与选择相邻。', 'Bring the product, its details and choices together.'), styles: ['apple','braun'], selection: { layout:'product',palette:'mono',font:'sans',density:'airy',surface:'soft',motion:'light',visual:'photo' } },
  { id: 'tactile-edition', scene: 'commerce', name: c('触感限定版', 'Tactile edition'), note: c('材质肌理与安静的商品详情。', 'Tactile textures and a quiet product detail.'), styles: ['japanese','duotone'], selection: { layout:'product',palette:'forest',font:'serif',density:'standard',surface:'flat',motion:'off',visual:'texture' } },
  { id: 'open-dialogue', scene: 'chat', name: c('开放对话', 'Open dialogue'), note: c('居中的消息流与随手可用的输入框。', 'Centered messages and an accessible composer.'), styles: ['flat','material'], selection: { layout:'conversation',palette:'blue',font:'sans',density:'airy',surface:'soft',motion:'light',visual:'illustration' } },
  { id: 'terminal-talk', scene: 'chat', name: c('终端对谈', 'Terminal talk'), note: c('暗色、等宽字与专注的消息流。', 'Dark surfaces, mono type and a focused message stream.'), styles: ['terminal','cyberpunk'], selection: { layout:'conversation',palette:'ink',font:'technical',density:'compact',surface:'flat',motion:'off',visual:'type' } },
  { id: 'team-inbox', scene: 'chat', name: c('团队收件箱', 'Team inbox'), note: c('会话列表与详情相邻，方便切换上下文。', 'Threads beside messages keep context close.'), styles: ['material','bento'], selection: { layout:'inbox',palette:'mono',font:'sans',density:'standard',surface:'soft',motion:'light',visual:'original' } },
  { id: 'studio-messages', scene: 'chat', name: c('创作室消息', 'Studio messages'), note: c('温暖的会话列表与影像参考。', 'Warm conversation lists and visual references.'), styles: ['scandinavian','editorial'], selection: { layout:'inbox',palette:'paper',font:'serif',density:'standard',surface:'flat',motion:'off',visual:'photo' } },
];
export interface Draft {
  name: string; baseId: string; overrides: Partial<Selection>;
  image?: { data: string; name: string; alt: string; fit: 'cover' | 'contain'; position: 'center' | 'top' | 'bottom' };
  content: { title: string; description: string; action: string };
}
export const createDraft = (id = recipes[0].id): Draft => ({ name: '', baseId: id, overrides: {}, content: { title: '', description: '', action: '' } });
export function resolve(draft: Draft) {
  const base = recipes.find(r => r.id === draft.baseId);
  if (!base) throw new Error('Unknown recipe / 未知配方');
  const selection = { ...base.selection, ...draft.overrides };
  const visual = visuals.find(v => v.id === selection.visual);
  const layout = layouts.find(l => l.id === selection.layout && l.scene === base.scene);
  const palette = palettes.find(p => p.id === selection.palette);
  const font = fonts.find(f => f.id === selection.font);
  const density = densities.find(d => d.id === selection.density);
  const surface = surfaces.find(s => s.id === selection.surface);
  if (!visual || !layout || !palette || !font || !density || !surface || !motions.some(m => m.id === selection.motion)) throw new Error('Unsupported combination / 不支持的组合');
  const tokens: Record<string, string> = {
    bg: palette.bg, surface: palette.surface, text: palette.text, muted: palette.muted, accent: palette.accent,
    'on-accent': palette.onAccent, line: palette.line, success: palette.success, danger: palette.danger,
    'font-heading': font.heading, 'font-body': font.body, 'heading-weight': font.weight, 'heading-tracking': font.tracking,
    'heading-scale': font.scale, space: density.space, gutter: density.gutter, 'row-space': density.row,
    radius: surface.radius, shadow: surface.shadow, 'border-width': surface.border,
    duration: selection.motion === 'off' ? '0ms' : '180ms', 'body-size': '15px', 'body-leading': '1.65', 'target-size': '44px',
  };
  const notices: Copy[] = [];
  if (base.selection.font === 'serif' && selection.font !== 'serif') notices.push(c('标题字体已改变，原配方的阅读感会减弱。', 'The new headline font softens the original editorial character.'));
  if (selection.surface === 'hard') notices.push(c('硬边阴影会突出控件，适合明确的视觉重心。', 'Hard shadows emphasize controls; keep a clear visual focal point.'));
  if (selection.density === 'compact') notices.push(c('间距已收紧，按钮与输入仍保留 44px 操作高度。', 'Spacing is compact; buttons and inputs retain 44px targets.'));
  if (selection.font === 'technical') notices.push(c('技术感标题使用系统等宽字体；中文跟随本机字体。', 'Technical headlines use system monospace; CJK uses local fonts.'));
  return { base, selection, visual, layout, palette, font, density, surface, tokens, notices };
}
export function changeScene(draft: Draft, scene: Scene): Draft {
  const next = createDraft(recipes.find(r => r.scene === scene)!.id);
  const compatible = { ...draft.overrides };
  delete compatible.layout;
  return { ...next, name: draft.name, content: draft.content, image: draft.image, overrides: compatible };
}
export const tokenCss = (draft: Draft) => `:root {\n${Object.entries(resolve(draft).tokens).map(([key, value]) => `  --${key}: ${value};`).join('\n')}\n}`;
const record = (v: unknown): v is Record<string, unknown> => !!v && typeof v === 'object' && !Array.isArray(v);
function exactKeys(v: Record<string, unknown>, keys: string[]) { if (Object.keys(v).some(k => !keys.includes(k))) throw new Error('Unknown fields / 存在未知字段'); }
export function validateDraft(value: unknown): Draft {
  if (!record(value)) throw new Error('Invalid recipe / 配方格式错误');
  exactKeys(value, ['name', 'baseId', 'overrides', 'content', 'image']);
  if (typeof value.name !== 'string' || value.name.length > 80 || typeof value.baseId !== 'string' || !record(value.overrides) || !record(value.content)) throw new Error('Invalid fields / 字段格式错误');
  exactKeys(value.overrides, ['layout', 'palette', 'font', 'density', 'surface', 'motion', 'visual']);
  exactKeys(value.content, ['title', 'description', 'action']);
  for (const key of ['title', 'description', 'action']) {
    const text = value.content[key];
    if (typeof text !== 'string' || text.length > (key === 'description' ? 600 : key === 'title' ? 160 : 60)) throw new Error('Text too long or invalid / 文本过长或格式错误');
  }
  if (value.image !== undefined) {
    const img = value.image;
    if (!record(img)) throw new Error('Invalid image / 图片格式错误');
    exactKeys(img, ['data','name','alt','fit','position']);
    if (typeof img.data !== 'string' || img.data.length > 1_400_000 || !/^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/]+={0,2}$/.test(img.data) || typeof img.name !== 'string' || img.name.length > 160 || typeof img.alt !== 'string' || img.alt.length > 200 || !['cover','contain'].includes(String(img.fit)) || !['center','top','bottom'].includes(String(img.position))) throw new Error('Invalid image / 图片格式错误');
    const header = atob(img.data.split(',')[1].slice(0,16));
    const validHeader = img.data.startsWith('data:image/png;') ? header.startsWith('\x89PNG\r\n\x1a\n') : img.data.startsWith('data:image/jpeg;') ? header.startsWith('\xff\xd8\xff') : header.startsWith('RIFF') && header.slice(8,12) === 'WEBP';
    if (!validHeader) throw new Error('Image format does not match its contents / 图片内容与格式不匹配');
  }
  const draft = value as unknown as Draft;
  resolve(draft);
  return structuredClone(draft);
}
export function exportRecipe(draft: Draft) {
  return JSON.stringify({ schemaVersion: 2, catalogVersion, draft, resolved: { selection: resolve(draft).selection, tokens: resolve(draft).tokens } }, null, 2);
}
export function importRecipe(text: string): Draft {
  if (text.length > maxRecipeBytes) throw new Error('File too large / 配方文件过大');
  const data: unknown = JSON.parse(text);
  if (!record(data)) throw new Error('Invalid file / 文件格式错误');
  exactKeys(data, ['schemaVersion', 'catalogVersion', 'draft', 'resolved']);
  const legacy = data.schemaVersion === 1 && data.catalogVersion === '2026.09.1';
  if (!legacy && (data.schemaVersion !== 2 || data.catalogVersion !== catalogVersion)) throw new Error('Unsupported version; keep the original file / 版本不支持，请保留原文件');
  const draft = validateDraft(data.draft);
  const canonical = JSON.parse(exportRecipe(draft));
  if (legacy) {
    if (!['paper-story','quiet-product','bold-studio','after-hours','clear-desk','field-notes','night-shift','lilac-room'].includes(draft.baseId) || draft.image || draft.overrides.visual) throw new Error('Invalid legacy file / 旧版文件不匹配');
    delete canonical.resolved.selection.visual;
  }
  if (!record(data.resolved) || !record(data.resolved.tokens) || !record(data.resolved.selection)) throw new Error('Missing snapshot / 缺少参数快照');
  for (const key of ['selection', 'tokens'] as const) {
    const saved = data.resolved[key] as Record<string, unknown>;
    const current = canonical.resolved[key];
    if (Object.keys(saved).length !== Object.keys(current).length || Object.keys(current).some(k => current[k] !== saved[k])) throw new Error('Snapshot mismatch / 参数快照不匹配');
  }
  exactKeys(data.resolved, ['selection', 'tokens']);
  return legacy ? { ...draft, overrides: { ...draft.overrides, visual: 'original' } } : draft;
}
export function contrast(a: string, b: string) {
  const luminance = (hex: string) => {
    const rgb = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255).map(n => n <= .04045 ? n / 12.92 : ((n + .055) / 1.055) ** 2.4);
    return rgb[0] * .2126 + rgb[1] * .7152 + rgb[2] * .0722;
  };
  const x = luminance(a), y = luminance(b);
  return (Math.max(x, y) + .05) / (Math.min(x, y) + .05);
}

# Vibe Design

一个展示 30 种经典网页设计风格的交互式指南，帮助设计师和开发者快速了解不同设计风格的特点、适用场景及优缺点，并为 Vibe Coding 提供开箱即用的 AI 提示词、Design Tokens 与单文件参考源码。

> [预览地址](https://v2ai.org/vibe-design/)

## 从项目目标到可检查的改造

打开 `/project`，选择页面用途、目标、表达强度和改造范围，填写目标页面及保留项。规则推荐三个方向，说明适用理由、取舍与不适用情况。候选最多保留三个，能进入 `/compare/:a/:b?mode=content&scene=dashboard` 比较同一份内容；原创演示仍可切换查看。

- **项目改造包**：包含 `change-brief.md`、`DESIGN.md`、`SKILL.md`、`checklist.md`、完整 `tokens.css`、原始 `reference.html`、可恢复的 `project-brief.json` 和 SHA-256 清单。品牌色以独立覆盖文件表达，原始参考保持原值。颜色优先级、范围边界和未验证项写入说明。
- **同内容对比**：Apple、瑞士、报刊编辑、Material、新粗野主义和终端六个方向，覆盖产品官网与任务后台、中英双语。文案、业务数据与交互相同，字体、构图和组件表达遵循各自参考。其余风格明确提示当前没有标准场景，可继续查看原创演示。
- **长期维护**：详情默认改造现有页面；可下载长期 `DESIGN.md`。配方工作台也导出长期规范、Skill 与同源文件校验清单。所有业务功能、路由、API 与技术栈优先保留。
- **本地结果记录**：保存项目简报快照、采用情况、返工次数和自查项，并生成针对性修正说明。记录为用户自报，仅保存在浏览器，不自动发送，也不视为自动验收。简报可下载和恢复。
- **验证证据**：`/cases` 展示当前构建的标准样本、浏览器截图与检查记录。记录只在构建指纹一致时展示；它们是仓库内演示的自动检查，不能替代真实项目、审美和 AI 生成结果的复核。
- **Agent 直接读取**：`/llms.txt`、`/llms-full.txt`、`/markdown/index.md`、`/markdown/styles/<id>.md`、`/markdown/styles/<id>/DESIGN.md`；来自同一数据与实际演示源码，包含来源、版本和源码校验值。

```bash
pnpm test
pnpm lint
pnpm build
pnpm validate:workflow   # 项目交付 + 48 个同内容浏览器样本，成功后更新 public/validation 与 dist/validation
pnpm validate:studio
pnpm validate:recipes
```

验收记录依赖当前生产构建；后续源码改变并重建后需重新执行 `validate:workflow`。`/compose`、`/project` 与 `/cases` 均生成真实静态入口，随本次 `dist/` 一起部署。本地构建完成不代表线上已经更新。首次真实任务研究见 [改造验收与试用记录](docs/optimization-acceptance.md)。

## 设计配方工作台

打开 `/compose`，从产品展示页、工具后台、作品集、博客杂志、电商精选或聊天应用开始，选择一份配方并调整布局、配色、字体、密度、表面和动效。提供 24 份起点、12 种布局和 7 类主视觉，支持中英文、亮暗主题、设备预览、撤销重做、本地收藏和 JSON 导入恢复。

- **带走配方**：复制适用于新建或修改项目的设计说明，或下载包含 Markdown、JSON、CSS、独立 HTML 与素材许可的 ZIP。预览与导出使用同一份最终配置。
- **离线使用**：从导出面板下载整个工作台，或构建后打开 `dist/vibe-design-offline.html`。下载后的单文件包含全部首版配方、脚本和字体，不依赖服务器或模型。
- **本地图片**：摄影与影像模式可选择 JPG、PNG、WebP（原图最大 8 MB），本机压缩至最长边 1600px，支持填满/完整显示和裁切位置。图片随 JSON 与 HTML 导出，不上传。
- **本地数据**：保存在当前浏览器，清理浏览器数据会移除收藏。请下载 `recipe.json` 备份。已知 v1 文件会在快照校验后迁移；未知格式与目录版本会明确拒绝，避免错误恢复。
- **示例边界**：各场景的品牌、商品、人物、文章、消息和数据均为虚构示例；筛选、购物袋、消息和表单只在参考页内生效，不创建订单、发送消息或调用模型。示例影像复用项目已有 AI 创作素材，界面注明来源。内嵌 Inter 与 Source Serif 4 的拉丁子集，中文及等宽标题使用本机字体。

```bash
pnpm recipe:offline    # 单独重新生成离线工作台（开发与生产构建也会执行）
pnpm test              # 包括组合解析、导入校验、导出与 ZIP 往返
pnpm build
pnpm validate:recipes  # Chrome 渲染、交互、导出和断网验收；截图在 output/recipes/
```

配方数据与界面位于 `src/recipes/`。新增选项时要同时覆盖解析、预览、设计说明与离线构建，不能只添加文案。初版产品方案见 [docs/design-recipe-plan.md](docs/design-recipe-plan.md)，扩展说明见 [docs/design-recipe-expansion.md](docs/design-recipe-expansion.md)。

## 安装 Skill

网站上的提示词、Design Tokens 和避坑指南，也打包成了一个 Skill，让 AI 直接照着写页面，不用来回复制粘贴。

产物就是 [`skills/vibe-design/`](./skills/vibe-design) 这一个目录：一份 `SKILL.md` 加若干 Markdown 参考文件和 HTML 附件，全部用相对路径互相引用，不含任何工具专有的清单文件。

### 方式一：让 AI 自己装

把这句话发给 Claude Code、Codex 或任何能联网的 agent：

```
请阅读 https://v2ai.org/vibe-design/skill.md 并按其中的说明安装这个 skill。
```

[`/skill.md`](https://v2ai.org/vibe-design/skill.md) 是一份明文安装说明：让 agent 判断自己运行在哪个工具里、选对目标目录、下载解压、验证文件数量。装之前可以自己先点开看它写了什么。

### 方式二：一行命令

```bash
DIR=~/.claude/skills/vibe-design
mkdir -p "$DIR" && curl -fsSL https://v2ai.org/vibe-design/vibe-design-skill.tar.gz | tar -xz -C "$DIR"
```

| 工具 | `DIR` |
| :-- | :-- |
| Claude Code | `~/.claude/skills/vibe-design` |
| Codex | `~/.codex/skills/vibe-design` |

两者均已实测通过：agent 会自己加载 `SKILL.md`、按工作流读到 `references/styles/<id>.md`，并取出正确的 tokens。项目级安装把 `~/.claude` 换成项目里的 `.claude` 即可（Codex 同理）。

站点源拉不动时走 GitHub 备用源：

```bash
DIR=~/.claude/skills/vibe-design
mkdir -p "$DIR" && curl -fsSL https://github.com/ai-graveyard/vibe-design/archive/refs/heads/main.tar.gz | tar -xz --strip-components=3 -C "$DIR" vibe-design-main/skills/vibe-design
```

也可以直接 clone 后 `cp -r skills/vibe-design <你的 skills 目录>/`。

装好后不需要记命令：说「做一个赛博朋克风格的落地页」或「这个首页用什么风格好」，agent 会根据 `description` 自己加载。多数工具要新开一个 session 才会加载刚装上的 skill。

Skill 里有什么：

- **30 份风格参考**（`references/styles/<id>.md`）：完整提示词中英双语、从 demo 直接提取的 `:root` tokens、特征 / 适用场景 / 优缺点、避坑清单
- **选型指南**（`references/picker.md`）：按项目类型和实现难度圈定候选
- **交付自检清单**（`references/checklist.md`）：375px 无横向滚动、`padding` 简写在复合类上互相清零、`view()` 动画的 fill 陷阱等实测踩过的坑
- **30 个零依赖单文件 demo**（`assets/demos/<id>.html`）：按需读取，可直接当起点

采用渐进披露：常驻上下文只有约 180 token，选定风格后才读对应的参考文件。

## 功能特性

- **30 种设计风格详解**：Apple 极简、包豪斯、玻璃拟态、液态玻璃、极光渐变、终端黑客风、像素风等
- **实况预览**：每种风格配有一个纯手写的迷你落地页 demo，首页卡片即真实页面的等比缩略图
- **离线单文件 demo**：HTML 内嵌 CSS、图片和字体，重点演示包含本地交互脚本；无 CDN、无服务请求，下载后可以独立打开
- **源码即教程**：详情页可直接查看 demo 源码（语法高亮），一键复制/下载整个 HTML
- **AI 提示词**：每种风格附带可一键复制的完整提示词（中英），用于 AI 编程工具快速复现该风格
- **Design Tokens**：自动提取 demo 的 `:root` CSS 变量，与实况预览严格一致，可直接复制
- **避坑指南**：每种风格 3-4 条「AI 生成时最常见的翻车点」
- **选型指南**：按项目场景 / 技术难度快速圈定候选风格
- **对比模式**：任意两种风格并排实况对比（`/compare/<a>/<b>`），数据逐项对照
- **SEO 友好**：构建时为每个风格页生成独立 meta 的静态壳 + sitemap + og:image
- **克制的动效**：滚动 reveal 采用 blur 对焦入场、首页整屏方向性吸附、主题切换从点击处圆形扩散（View Transitions API）、主 CTA 一次性扫光，全部尊重 `prefers-reduced-motion`
- **中英文双语**、**亮色/暗色主题**、**响应式布局**（桌面 / 移动端）

## 技术栈

- React 19 + TypeScript
- Vite
- Tailwind CSS
- React Router
- Zustand

## 快速开始

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 校验数据一致性（styles/prompts/demos 三处对齐 + demo 零依赖约定）
pnpm validate

# 从 src/data 重新生成 Skill 产物 skills/vibe-design/（需 Node ≥ 22.6）
pnpm skill

# 构建生产版本（含校验、skill 生成、SEO 后处理与 skill 安装包打包）
pnpm build

# 重新生成社交分享图（demo 有增改时运行，需 Chrome / Chromium）
pnpm og

# 重新生成首页卡片静态缩略图（demo 有增改时运行，需 Chrome / Chromium）
pnpm thumbs

# 预览生产版本
pnpm preview
```

## 项目结构

```
├── skills/vibe-design/   # Skill 产物（由 pnpm skill 生成，勿手改）
│   ├── SKILL.md           # skill 本体：工作流 + 30 风格索引表
│   ├── references/        # 按需读取的风格参考、选型指南、交付自检清单
│   └── assets/demos/      # 30 个 demo 副本
├── public/
│   ├── demos/             # 30 个风格 demo（零依赖单文件 HTML，与风格数据一一对应）
│   ├── skill.md           # 给 AI agent 在线读取的安装说明（由 pnpm skill 生成）
│   ├── og/                # 社交分享图（由 pnpm og 生成）
│   └── thumbs/            # 首页卡片静态缩略图（由 pnpm thumbs 生成，hover 时才挂载实况 iframe）
├── scripts/
│   ├── validate-demos.mjs # 数据一致性与 demo 约定校验（build 前自动执行）
│   ├── build-skill.mjs    # 从 src/data 生成 skills/vibe-design/ 与 public/skill.md
│   ├── pack-skill.mjs     # 打包 dist/vibe-design-skill.tar.gz（自建安装源，不进 git）
│   ├── skill-templates/   # SKILL.md 模板、安装说明模板与手写的交付自检清单
│   ├── postbuild-seo.mjs  # 为每个风格页生成独立 meta 的静态壳 + sitemap + robots
│   ├── generate-og.mjs    # 用系统 Chrome headless 截 og:image
│   ├── generate-thumbs.mjs# 用系统 Chrome headless 截首页卡片缩略图
│   └── og-home.html       # 首页分享图模板
├── src/
│   ├── data/
│   │   ├── styles.ts      # 风格数据（名称、特征、场景、优缺点、避坑指南、配色、案例）
│   │   ├── prompts.ts     # 各风格的 AI 提示词
│   │   ├── scenes.ts      # 选型指南（按场景 / 按难度）
│   │   └── translations.ts# 界面文案（中/英）
│   ├── hooks/             # useDemoSource（源码获取缓存）、useInView（滚动 reveal）、useScrollSnap（整屏吸附）、useCountUp、useIsMobile、usePageMeta
│   ├── lib/               # highlightHtml（零依赖语法高亮）、themeReveal（主题切换圆形扩散）
│   ├── store/             # Zustand 全局状态（语言 / 主题 / 预览设备等）
│   ├── router/            # 路由定义（首页 / style/:id 详情页 / compare/:a/:b 对比页）
│   ├── components/        # StyleCard、DemoPreview、DemoCodeView、DesignTokens 等
│   ├── sections/          # 首页区块（Hero / StylesGrid / SceneGuide / InstallSkill / Footer）
│   └── pages/             # 首页、风格详情页与对比页
└── 网站设计风格大全.md      # 风格资料源文档
```

## 新增一种风格

1. 在 `src/data/styles.ts` 中追加风格条目（`id` 为唯一标识，含 `pitfalls` 避坑指南）
2. 在 `src/data/prompts.ts` 中追加同 `id` 的提示词
3. 在 `public/demos/` 中新增 `<id>.html` demo（单文件、零外部请求、必须有 `:root` CSS 变量；可包含内嵌素材和本地交互）
4. （可选）在 `src/data/scenes.ts` 的场景/难度中收录该风格
5. 运行 `pnpm validate` 校验三处对齐，`pnpm og` 与 `pnpm thumbs` 重新生成分享图和卡片缩略图
6. 运行 `pnpm skill` 重建 Skill 产物，并把 `skills/` 的变更一起提交（CI 会用 `git diff --exit-code` 卡住漏提交）

新增风格还需在 `src/data/styleSpecs.ts` 中补齐类型、构图、关键手法、误用说明与可用的参考来源。首页卡片、侧边栏、详情页、Design Tokens、SEO 静态壳与 Skill 文档根据数据生成。

## 部署

站点部署在子路径 `https://v2ai.org/vibe-design/`，部署路径统一由 [`src/data/site.ts`](./src/data/site.ts) 的 `BASE_PATH` 控制（`vite.config.ts`、路由 basename、静态资源与构建脚本都读它）。本地开发同样在 `http://localhost:5173/vibe-design/` 访问。

`pnpm build` 产物在 `dist/`。每个 `/style/<id>` 都有真实的 `index.html` 静态壳，直接访问 `/vibe-design/style/<id>` 不需要回退；其余未知路径（如 `/compare/...`）需要 nginx 回退到子路径首页：

```nginx
location /vibe-design/ {
    root /var/www;
    try_files $uri $uri/ /vibe-design/index.html;
}
```

站点内生成的 `robots.txt` 与 `sitemap.xml` 位于 `/vibe-design/` 下；搜索引擎只会读取域名根目录的 `robots.txt`，需要时在根站点中补一行 `Sitemap: https://v2ai.org/vibe-design/sitemap.xml`。

[`deploy.sh`](./deploy.sh) 用 rsync 同步到服务器：逐文件先写临时文件再原子 rename，部署中途的访问不会拿到半截文件；不带 `--delete`，只增不删。

## 许可证

[MIT](./LICENSE)


## 设计准确度与演示工作流

- 详情和对比采用固定的桌面 1280×800、平板 768×1024、手机 390×844 视口，显示缩放与响应式断点分离；另有自适应和全屏浏览。
- 首页直接展示精选作品；风格卡片显示设计类型，替代没有公开分项依据的总评分。
- `src/data/styleSpecs.ts` 记录 30 种风格的构图、关键手法、误用说明、示例版本及参考依据。颜色和圆角属于具体示例，不作为所有同类设计的硬规则。
- “应用这种风格”保留业务内容并使用风格原则；“复现当前演示”额外提供实际 Token、参考地址和四种尺寸的视觉验收要求，可复制或下载 Markdown。
- Apple、瑞士、报刊、Material、玻璃拟态、液态玻璃为本轮重点演示。图片来源与生成提示词见 `assets/demo-media/README.md`，字体和许可见 `assets/fonts/README.md`。液态玻璃标明 CSS 近似范围。
- Material 任务操作、玻璃材质滑条、液态玻璃播放器只改变页面内状态，刷新即可复位。

更新演示后运行：

```bash
pnpm assets           # 将原始素材与字体重新嵌入独立 HTML
pnpm test             # Token 解析、参考包完整性、风格原则一致性
pnpm visual           # 30 个演示 × 4 个尺寸 + 交互门禁，保存截图与报告
pnpm thumbs           # 重建卡片截图与源文件指纹
pnpm og               # 重建分享图
pnpm build            # 校验指纹、生成 Skill 与生产构建
pnpm validate:studio  # 验证生产版的视口、全屏、嵌入表单与同步滚动
```

`output/visual/index.html` 提供 120 张截图供人工并排复核，`report.json` 包含可见标题、字体/图像加载、溢出与交互结果。截图采用加载完成后的 reduced-motion 状态，动效本身仍须单独实测。CI 执行同一检查并上传截图供审阅；自动门禁不能替代设计判断。`public/thumbs/manifest.json` 把截图与演示源码绑定，源码改动却没有刷新预览时构建会失败。

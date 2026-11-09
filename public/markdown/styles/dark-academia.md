---
document_type: style-reference
style_id: dark-academia
study_version: "2026.09"
delivery_schema_version: "1"
source_url: https://v2ai.org/vibe-design/style/dark-academia
demo_url: https://v2ai.org/vibe-design/demos/dark-academia.html
demo_sha256: 760a43b60c54ad8116bdcf9cb57efc0526569cb32b42fa8c44acaeac236c837c
---

# Dark Academia / 暗黑学院

- Type / 类型：Visual aesthetic / 视觉美学
- Tags / 标签：Classic · Vintage / 经典 · 复古
- Implementation estimate / 实现难度：2 Medium; an example complexity estimate, not a delivery-time promise.
- Candidate project types / 候选场景：Art / Culture / 艺术 / 文化
- [Original style page / 原始风格页](https://v2ai.org/vibe-design/style/dark-academia)
- [Reference HTML / 演示源码](https://v2ai.org/vibe-design/demos/dark-academia.html)
- [Ongoing DESIGN.md / 长期项目规范](https://v2ai.org/vibe-design/markdown/styles/dark-academia/DESIGN.md)

## Principles / 风格原则

Organize content around books, scholarship and reading, with a long-form typographic hierarchy.

以书籍、知识与阅读场景组织内容，采用适合长文的文字层级。

Dark wood, forest green, wine and parchment with restrained serif type and material detail.

深木色、墨绿、酒红和纸色，搭配克制的衬线体与材质细节。

## Study boundaries / 演示边界

An original authored web study. Its palette, assets and dimensions are example choices, not a universal definition or an official brand template.

原创网页演绎。配色、素材和尺寸是当前示例的具体选择，不代表统一风格定义或品牌官方模板。

The study version identifies the existing reference family. The SHA-256 identifies the exact HTML bytes used for the tokens below; the delivery schema versions the document format. They do not certify a future AI-generated result.

风格版本标识参考系列，SHA-256 标识下列 Tokens 对应的 HTML 源码，交付结构版本标识文档格式；均不代表对后续 AI 生成结果的认证。

No claim of certified historical reproduction. / 不声称历史作品的认证复刻。

## Example values / 示例取值

Parsed from the first :root block of the reference HTML, ignoring CSS comments. These are the same values exposed by the website. Match them when reproducing this particular demo; for a project adaptation, preserve the existing brand and record deliberate mappings in DESIGN.md.

从演示源码首个 :root 变量块提取并忽略 CSS 注释，与网页的 Tokens 共用解析器。复现此演示时使用原值；项目改造时优先保留品牌，并在 DESIGN.md 记录映射。

```css
:root {
  --bg: #1A130C;
  --panel: #241A11;
  --green: #26382F;
  --green-deep: #1C2A23;
  --parchment: #EADCBE;
  --ink: #CDBD9C;
  --wine: #722F37;
  --wine-deep: #59242B;
  --brass: #B08D57;
  --candle: #EFA94A;
  --serif: Georgia,"Palatino Linotype","Songti SC",serif;
}
```

## Bilingual style brief / 双语风格说明

Read the project brief and existing DESIGN.md first. Default to adapting the current project; this style description does not replace project constraints, routes, components or business content.

先读取项目简报和已有 DESIGN.md，默认改造当前项目；以下风格说明不能覆盖项目约束、路由、组件与业务内容。

**English**

Dark Academia. Organize content around books, scholarship and reading, with a long-form typographic hierarchy. Dark wood, forest green, wine and parchment with restrained serif type and material detail. Do not sacrifice body contrast to darkness or merely pile on vintage ornament. Adapt palette and dimensions to the content; use the current demo reference brief for an exact reproduction.

**中文**

暗黑学院。以书籍、知识与阅读场景组织内容，采用适合长文的文字层级。深木色、墨绿、酒红和纸色，搭配克制的衬线体与材质细节。不要把背景压黑到看不清正文，也不要只堆叠复古装饰。配色与尺寸可根据内容调整；精确复现请使用当前演示的参考包。

## Observable strengths / 设计取舍的优势

- Books, paper and wood tones can establish a reading setting
  - 中文：书籍、纸张与木色可建立阅读场景
- Serif headings can coordinate with a detailed body hierarchy
  - 中文：衬线标题与细致的正文层级能够协调
- Dark wood, forest green and parchment can separate surfaces
  - 中文：深木色、墨绿与纸色能划分表面层次
- Captions, quotations and sources can be integrated into the layout
  - 中文：图注、引文与来源可以融入版面

## Adaptation costs / 适配成本

- Dark surfaces must preserve body and secondary-text contrast
  - 中文：深色底不能牺牲正文和次要信息对比
- Material textures must avoid interfering with long copy
  - 中文：材质纹理需要避免干扰长文
- Old-book and art imagery needs source-license checks
  - 中文：旧书与艺术图像需要核实素材授权
- Modern controls still need explicit interactive states
  - 中文：现代操作控件需要保持明确的可点击状态

## Pitfalls / 避坑

- Do not sacrifice body contrast to darkness or merely pile on vintage ornament.
  - 中文：不要把背景压黑到看不清正文，也不要只堆叠复古装饰。

## Project acceptance / 项目验收

These are requirements for the adapted project, not certified coverage of every demo. / 以下是改造项目的验收要求，不代表每个演示已覆盖全部状态。

- Preserve business logic, routes, API contracts, data fields, authentication, forms, copy, analytics and existing component behavior. Retain brand rules and assets unless the project brief explicitly changes them. / 保留业务逻辑、路由、接口、字段、鉴权、表单、文案、统计及组件行为；品牌规则和素材按项目简报保留。
- Inspect default, hover, focus-visible, active, selected and disabled states where applicable. Verify keyboard navigation and visible focus, including dialogs and menus. / 检查适用的默认、悬浮、键盘焦点、按下、选中和禁用状态，以及弹窗与菜单的键盘操作。
- Check validation, loading, empty, error and long-content states in forms and data views. Keep labels and existing recovery actions available. / 检查校验、加载、空数据、错误与长内容状态，保留标签和已有恢复操作。
- Test long Chinese headings, mixed Chinese/English labels, font fallback, enlarged text and unbroken URLs. Reorder content intentionally on narrow screens; avoid document-level horizontal scroll, clipping and occlusion. / 测试长中文标题、中英混排、字体回退、放大文字和连续 URL，检查窄屏重排、整页横向溢出、裁切与遮挡。
- Inspect the actual routes in a browser after assets load at project breakpoints; if unspecified, compare 390×844, 768×1024, 1280×800 and 1440×900, plus a 375px narrow-screen check. Record what was actually inspected. / 在实际浏览器中检查项目断点；未指定时用上述视口并记录真实检查范围。
- Honor prefers-reduced-motion with readable static content; provide pause for persistent movement. Supply a solid-surface fallback for unsupported material effects and check text/control contrast against changing backgrounds. / 减弱动态效果时保留静态内容，持续运动提供暂停，不支持材质效果时采用实色回退并检查对比。
- Verify existing task behavior and project checks after visual changes. Record intentional token adaptations, remaining limits and unperformed checks; do not claim output fidelity, loading speed or conversion from style alone. / 改造后验证原任务与项目检查，记录参数调整、限制和未验收项，不以风格本身承诺还原度、加载速度或转化结果。

## Inspiration names / 灵感检索名称

Oxford University Press · Penguin Classics · The School of Life · Hogwarts Legacy

These names are research leads rather than evidence that every page from those organizations matches this example. Verify the actual page and date before making a comparison. / 这些名称用于继续检索，不代表相关组织的每个页面都采用本例风格；对比前应核实具体页面与时间。

Reference file: dark-academia.html (376 source lines). Source and outputs can change together; retain the version and hash when recording an implementation decision.

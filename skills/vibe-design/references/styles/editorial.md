---
document_type: style-reference
style_id: editorial
study_version: "2026.09"
delivery_schema_version: "1"
source_url: https://v2ai.org/vibe-design/style/editorial
demo_url: https://v2ai.org/vibe-design/demos/editorial.html
demo_sha256: d43eedb33e58fcb0001098b540383b403f3abe2f54587ced618f2de0d192a948
---

# Editorial / 报刊编辑风

- Type / 类型：Layout pattern / 布局模式
- Tags / 标签：Classic · Distinctive · Art / 经典 · 个性 · 艺术
- Implementation estimate / 实现难度：2 Medium; an example complexity estimate, not a delivery-time promise.
- Candidate project types / 候选场景：Creative / Design / 创意 / 设计, Art / Culture / 艺术 / 文化, Personal / Blog / 个人 / 博客
- [Original style page / 原始风格页](https://v2ai.org/vibe-design/style/editorial)
- [Reference HTML / 演示源码](../../assets/demos/editorial.html)
- [Ongoing DESIGN.md / 长期项目规范](../designs/editorial.md)

## Principles / 风格原则

Masthead, article hierarchy, column measure, captions and fine rules establish reading order.

报头、文章层级、正文栏宽、图片说明和细栏线共同建立阅读顺序。

Serif headlines, compact body copy, a drop cap and a lead image set the reading rhythm in this study.

本例用衬线标题、紧凑正文、首字下沉和一幅主图；重点是长文阅读的节奏。

## Study boundaries / 演示边界

An original authored web study. Its palette, assets and dimensions are example choices, not a universal definition or an official brand template.

原创网页演绎。配色、素材和尺寸是当前示例的具体选择，不代表统一风格定义或品牌官方模板。

The study version identifies the existing reference family. The SHA-256 identifies the exact HTML bytes used for the tokens below; the delivery schema versions the document format. They do not certify a future AI-generated result.

风格版本标识参考系列，SHA-256 标识下列 Tokens 对应的 HTML 源码，交付结构版本标识文档格式；均不代表对后续 AI 生成结果的认证。

- [The Guardian · Digital design guide](https://design.theguardian.com/)

## Example values / 示例取值

Parsed from the first :root block of the reference HTML, ignoring CSS comments. These are the same values exposed by the website. Match them when reproducing this particular demo; for a project adaptation, preserve the existing brand and record deliberate mappings in DESIGN.md.

从演示源码首个 :root 变量块提取并忽略 CSS 注释，与网页的 Tokens 共用解析器。复现此演示时使用原值；项目改造时优先保留品牌，并在 DESIGN.md 记录映射。

```css
:root {
  --paper: #FAF7F0;
  --ink: #141414;
  --ink-soft: #3E3A33;
  --accent: #C8102E;
  --grey: #8A857C;
  --hairline: #DCD5C6;
  --serif: "Source Serif 4",Georgia,"Iowan Old Style","Times New Roman",Times,serif;
  --display: Didot,"Bodoni 72","Didot LT STD",Georgia,serif;
  --sans: "Inter",-apple-system,BlinkMacSystemFont,"Helvetica Neue",Arial,sans-serif;
}
```

## Bilingual style brief / 双语风格说明

Read the project brief and existing DESIGN.md first. Default to adapting the current project; this style description does not replace project constraints, routes, components or business content.

先读取项目简报和已有 DESIGN.md，默认改造当前项目；以下风格说明不能覆盖项目约束、路由、组件与业务内容。

**English**

Editorial. Masthead, article hierarchy, column measure, captions and fine rules establish reading order. Serif headlines, compact body copy, a drop cap and a lead image set the reading rhythm in this study. Avoid making every sentence a display headline; retain paragraphs, attribution and captions. Adapt palette and dimensions to the content; use the current demo reference brief for an exact reproduction.

**中文**

报刊编辑风。报头、文章层级、正文栏宽、图片说明和细栏线共同建立阅读顺序。本例用衬线标题、紧凑正文、首字下沉和一幅主图；重点是长文阅读的节奏。避免所有文案都变成超大标题，保留完整段落、出处和图片说明。配色与尺寸可根据内容调整；精确复现请使用当前演示的参考包。

## Observable strengths / 设计取舍的优势

- Mastheads, rules and captions establish article hierarchy
  - 中文：报头、栏线与图片说明建立文章层级
- Body measure and line spacing can be tuned to the reading content
  - 中文：正文栏宽与行距可围绕阅读内容调整
- Typographic contrast can carry the main visual expression
  - 中文：字体对比可以承担主要视觉表达
- Attribution and captions have defined positions in the composition
  - 中文：出处和图注有明确的版面位置

## Adaptation costs / 适配成本

- Long-form layouts need real copy rather than short placeholders
  - 中文：长文需要实际内容验证而非占位短句
- Multi-column content needs an explicit mobile reading order
  - 中文：多栏内容必须定义手机端的阅读顺序
- Chinese serif fallbacks and mixed scripts need checks at each breakpoint
  - 中文：中文衬线回退和混排需要逐断点检查

## Pitfalls / 避坑

- Avoid making every sentence a display headline; retain paragraphs, attribution and captions.
  - 中文：避免所有文案都变成超大标题，保留完整段落、出处和图片说明。

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

NYTimes.com · The New Yorker · Monocle · The Economist

These names are research leads rather than evidence that every page from those organizations matches this example. Verify the actual page and date before making a comparison. / 这些名称用于继续检索，不代表相关组织的每个页面都采用本例风格；对比前应核实具体页面与时间。

Reference file: editorial.html (595 source lines). Source and outputs can change together; retain the version and hash when recording an implementation decision.

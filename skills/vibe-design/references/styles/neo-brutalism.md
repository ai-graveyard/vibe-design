---
document_type: style-reference
style_id: neo-brutalism
study_version: "2026.09"
delivery_schema_version: "1"
source_url: https://v2ai.org/vibe-design/style/neo-brutalism
demo_url: https://v2ai.org/vibe-design/demos/neo-brutalism.html
demo_sha256: 5dc663ae47d2253cb0e1464a121f6ba847c53e4445db21b9473f4010768db573
---

# Neo-Brutalism / 新粗野主义

- Type / 类型：Visual aesthetic / 视觉美学
- Tags / 标签：Avant-garde / 前卫
- Implementation estimate / 实现难度：1 Easy; an example complexity estimate, not a delivery-time promise.
- Candidate project types / 候选场景：Creative / Design / 创意 / 设计, Personal / Blog / 个人 / 博客
- [Original style page / 原始风格页](https://v2ai.org/vibe-design/style/neo-brutalism)
- [Reference HTML / 演示源码](../../assets/demos/neo-brutalism.html)
- [Ongoing DESIGN.md / 长期项目规范](../designs/neo-brutalism.md)

## Principles / 风格原则

Organize content with clear regions, heavy borders and emphatic hierarchy.

用清晰的信息分区、粗边框和强烈层级组织内容。

This study uses black hard-edged shadows, bold color blocks and heavy headings; shadows contract on press.

本例用黑色硬边阴影、鲜明色块和粗体标题，按下时阴影收缩。

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
  --paper: #FFF6EA;
  --ink: #000000;
  --white: #FFFFFF;
  --orange: #FF6B35;
  --blue: #004E89;
  --yellow: #F7C548;
  --pink: #FF8FD4;
  --green: #3ECF8E;
  --bw: 4px;
  --sans: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"PingFang SC","Microsoft YaHei",sans-serif;
  --mono: ui-monospace,"SF Mono",Menlo,Consolas,monospace;
}
```

## Bilingual style brief / 双语风格说明

Read the project brief and existing DESIGN.md first. Default to adapting the current project; this style description does not replace project constraints, routes, components or business content.

先读取项目简报和已有 DESIGN.md，默认改造当前项目；以下风格说明不能覆盖项目约束、路由、组件与业务内容。

**English**

Neo-Brutalism. Organize content with clear regions, heavy borders and emphatic hierarchy. This study uses black hard-edged shadows, bold color blocks and heavy headings; shadows contract on press. Avoid blurring hard shadows or letting ornament obscure text and targets. Adapt palette and dimensions to the content; use the current demo reference brief for an exact reproduction.

**中文**

新粗野主义。用清晰的信息分区、粗边框和强烈层级组织内容。本例用黑色硬边阴影、鲜明色块和粗体标题，按下时阴影收缩。避免给硬阴影加模糊，也不要让强装饰压过文字与点击目标。配色与尺寸可根据内容调整；精确复现请使用当前演示的参考包。

## Observable strengths / 设计取舍的优势

- Heavy borders clearly separate content and controls
  - 中文：粗边框能明确划分内容与控件
- Hard shadows and pressed offsets create visible state changes
  - 中文：硬阴影与按下位移形成可见的状态变化
- Color blocks and heavy headings provide emphatic hierarchy
  - 中文：色块与粗体标题提供鲜明层级
- Borders, offsets and shadows can share CSS variables
  - 中文：边框、偏移与阴影可用 CSS 变量统一

## Adaptation costs / 适配成本

- Dense borders and shadows can crowd the content
  - 中文：边框与阴影过密会挤压内容空间
- Strong colors require individual text and state contrast checks
  - 中文：强烈配色需要逐一检查文字与状态对比
- Tables and complex forms need reduced ornament density
  - 中文：迁移到表格和复杂表单时需降低装饰密度

## Pitfalls / 避坑

- Avoid blurring hard shadows or letting ornament obscure text and targets.
  - 中文：避免给硬阴影加模糊，也不要让强装饰压过文字与点击目标。

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

Figma Community · Gumroad · Poolside.fm · Pitch.com · Notion templates

These names are research leads rather than evidence that every page from those organizations matches this example. Verify the actual page and date before making a comparison. / 这些名称用于继续检索，不代表相关组织的每个页面都采用本例风格；对比前应核实具体页面与时间。

Reference file: neo-brutalism.html (414 source lines). Source and outputs can change together; retain the version and hash when recording an implementation decision.

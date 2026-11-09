---
document_type: style-reference
style_id: kinetic
study_version: "2026.09"
delivery_schema_version: "1"
source_url: https://v2ai.org/vibe-design/style/kinetic
demo_url: https://v2ai.org/vibe-design/demos/kinetic.html
demo_sha256: e79679ef6339270a7c41709d8f8bcfdedf4856a11b600bcf11acdef2e5471da9
---

# Kinetic Typography / 动态字体

- Type / 类型：Motion approach / 动态表现
- Tags / 标签：Art · Avant-garde / 艺术 · 前卫
- Implementation estimate / 实现难度：3 Hard; an example complexity estimate, not a delivery-time promise.
- Candidate project types / 候选场景：Creative / Design / 创意 / 设计
- [Original style page / 原始风格页](https://v2ai.org/vibe-design/style/kinetic)
- [Reference HTML / 演示源码](https://v2ai.org/vibe-design/demos/kinetic.html)
- [Ongoing DESIGN.md / 长期项目规范](https://v2ai.org/vibe-design/markdown/styles/kinetic/DESIGN.md)

## Principles / 风格原则

Use moving type for rhythm and storytelling while preserving a complete static reading structure.

让文字运动承担节奏与叙事，静止时仍保留完整阅读结构。

Choreograph speed, displacement, spacing and weight; provide pause and respect reduced motion.

速度、位移、字距与字重有明确编排，提供暂停并尊重减弱动态效果。

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
  --bg: #000000;
  --fg: #FFFFFF;
  --accent: #FF0000;
  --gray: #8a8a8a;
  --line: #2b2b2b;
  --sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "PingFang SC", "Microsoft YaHei", sans-serif;
  --mono: ui-monospace, "SF Mono", Menlo, Consolas, monospace;
}
```

## Bilingual style brief / 双语风格说明

Read the project brief and existing DESIGN.md first. Default to adapting the current project; this style description does not replace project constraints, routes, components or business content.

先读取项目简报和已有 DESIGN.md，默认改造当前项目；以下风格说明不能覆盖项目约束、路由、组件与业务内容。

**English**

Kinetic Typography. Use moving type for rhythm and storytelling while preserving a complete static reading structure. Choreograph speed, displacement, spacing and weight; provide pause and respect reduced motion. Do not replace content with endless marquees or trap important copy inside unpausable motion. Adapt palette and dimensions to the content; use the current demo reference brief for an exact reproduction.

**中文**

动态字体。让文字运动承担节奏与叙事，静止时仍保留完整阅读结构。速度、位移、字距与字重有明确编排，提供暂停并尊重减弱动态效果。避免持续跑马灯代替内容；不要把关键文案放在无法停下的动画里。配色与尺寸可根据内容调整；精确复现请使用当前演示的参考包。

## Observable strengths / 设计取舍的优势

- Type motion can carry the rhythm of the content
  - 中文：文字运动可以承担内容节奏
- Displacement, weight and spacing can follow narrative stages
  - 中文：位移、字重和字距可对应叙事阶段
- A static composition can retain the same information hierarchy
  - 中文：静态构图可保留相同的信息层级
- Local motion can work with existing brand type
  - 中文：局部动效能与既有品牌字体配合

## Adaptation costs / 适配成本

- Motion needs rendering and input-response checks on target devices
  - 中文：动画需要检查目标设备上的渲染和输入响应
- Readable static content and reduced-motion preferences must be supported
  - 中文：必须提供可读静态内容并尊重减弱动态效果
- Continuous motion needs pause controls and must not obscure the primary action
  - 中文：持续运动需要暂停控制，不能淹没主操作
- Essential copy should remain in the semantic document and be searchable
  - 中文：关键文字应存在于语义化文档中并可被检索

## Pitfalls / 避坑

- Do not replace content with endless marquees or trap important copy inside unpausable motion.
  - 中文：避免持续跑马灯代替内容；不要把关键文案放在无法停下的动画里。

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

Apple keynotes · Active Theory works · Awwwards winners · KIKK Festival

These names are research leads rather than evidence that every page from those organizations matches this example. Verify the actual page and date before making a comparison. / 这些名称用于继续检索，不代表相关组织的每个页面都采用本例风格；对比前应核实具体页面与时间。

Reference file: kinetic.html (260 source lines). Source and outputs can change together; retain the version and hash when recording an implementation decision.

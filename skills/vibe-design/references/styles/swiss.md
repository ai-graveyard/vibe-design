---
document_type: style-reference
style_id: swiss
study_version: "2026.09"
delivery_schema_version: "1"
source_url: https://v2ai.org/vibe-design/style/swiss
demo_url: https://v2ai.org/vibe-design/demos/swiss.html
demo_sha256: a24cc6c68a325a1104a16ce8cd13cf486dbc6b52b2bebe37243c6fd643d03b67
---

# Swiss Style / International Typographic / 瑞士风格

- Type / 类型：Design movement / 设计流派
- Tags / 标签：Minimal · Classic / 极简 · 经典
- Implementation estimate / 实现难度：2 Medium; an example complexity estimate, not a delivery-time promise.
- Candidate project types / 候选场景：E-commerce / Retail / 电商 / 零售, Creative / Design / 创意 / 设计, Enterprise / B2B / 企业 / B2B
- [Original style page / 原始风格页](https://v2ai.org/vibe-design/style/swiss)
- [Reference HTML / 演示源码](../../assets/demos/swiss.html)
- [Ongoing DESIGN.md / 长期项目规范](../designs/swiss.md)

## Principles / 风格原则

Build an asymmetric grid with shared axes for headlines, rules, numbers and body copy.

建立非对称网格，标题、栏线、编号和正文共享对齐轴。

Use neo-grotesque type weight, spacing and scale to establish order; red carries emphasis in this study.

用新怪诞体的字重、字距和比例建立秩序；红色在本例中承担信息强调。

## Study boundaries / 演示边界

An original authored web study. Its palette, assets and dimensions are example choices, not a universal definition or an official brand template.

原创网页演绎。配色、素材和尺寸是当前示例的具体选择，不代表统一风格定义或品牌官方模板。

The study version identifies the existing reference family. The SHA-256 identifies the exact HTML bytes used for the tokens below; the delivery schema versions the document format. They do not certify a future AI-generated result.

风格版本标识参考系列，SHA-256 标识下列 Tokens 对应的 HTML 源码，交付结构版本标识文档格式；均不代表对后续 AI 生成结果的认证。

- [MoMA · Josef Müller-Brockmann](https://www.moma.org/artists/4154-josef-muller-brockmann)

## Example values / 示例取值

Parsed from the first :root block of the reference HTML, ignoring CSS comments. These are the same values exposed by the website. Match them when reproducing this particular demo; for a project adaptation, preserve the existing brand and record deliberate mappings in DESIGN.md.

从演示源码首个 :root 变量块提取并忽略 CSS 注释，与网页的 Tokens 共用解析器。复现此演示时使用原值；项目改造时优先保留品牌，并在 DESIGN.md 记录映射。

```css
:root {
  --bg: #FFFFFF;
  --fg: #000000;
  --accent: #FF0000;
  --gold: #FFD700;
  --blue: #0000FF;
  --hair: #000000;
  --sans: "Inter",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"PingFang SC","Microsoft YaHei",sans-serif;
  --mono: ui-monospace,"SF Mono",Menlo,Consolas,monospace;
}
```

## Bilingual style brief / 双语风格说明

Read the project brief and existing DESIGN.md first. Default to adapting the current project; this style description does not replace project constraints, routes, components or business content.

先读取项目简报和已有 DESIGN.md，默认改造当前项目；以下风格说明不能覆盖项目约束、路由、组件与业务内容。

**English**

Swiss Style / International Typographic. Build an asymmetric grid with shared axes for headlines, rules, numbers and body copy. Use neo-grotesque type weight, spacing and scale to establish order; red carries emphasis in this study. A large headline alone is insufficient. Column measure, baselines and whitespace matter; primary colors are optional. Adapt palette and dimensions to the content; use the current demo reference brief for an exact reproduction.

**中文**

瑞士风格。建立非对称网格，标题、栏线、编号和正文共享对齐轴。用新怪诞体的字重、字距和比例建立秩序；红色在本例中承担信息强调。不要只放一个超大标题；正文栏宽、基线和留白同样重要，红黄蓝并非强制色盘。配色与尺寸可根据内容调整；精确复现请使用当前演示的参考包。

## Observable strengths / 设计取舍的优势

- Grids, rules and numbering establish reading order together
  - 中文：网格、栏线与编号共同建立阅读顺序
- Type weight and scale carry the main visual expression
  - 中文：字重与比例承担主要的视觉表达
- Asymmetric structure can accommodate several information levels
  - 中文：非对称结构可以容纳多层信息
- Accent color can be concentrated on key information
  - 中文：强调色可集中用于关键信息

## Adaptation costs / 适配成本

- Chinese type, spacing and Latin proportions need separate tuning
  - 中文：中文字体、字距与英文比例需要分别调整
- Long headlines and changing copy affect grid balance
  - 中文：长标题与内容变化会影响网格平衡
- Commercial fonts require license checks; suitable open fonts are an alternative
  - 中文：商业字体需要核实授权，也可采用合适的开放字体

## Pitfalls / 避坑

- A large headline alone is insufficient. Column measure, baselines and whitespace matter; primary colors are optional.
  - 中文：不要只放一个超大标题；正文栏宽、基线和留白同样重要，红黄蓝并非强制色盘。

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

Josef Müller-Brockmann works · Emil Ruder works · Neue Haas Grotesk site · Type Directors Club

These names are research leads rather than evidence that every page from those organizations matches this example. Verify the actual page and date before making a comparison. / 这些名称用于继续检索，不代表相关组织的每个页面都采用本例风格；对比前应核实具体页面与时间。

Reference file: swiss.html (428 source lines). Source and outputs can change together; retain the version and hash when recording an implementation decision.

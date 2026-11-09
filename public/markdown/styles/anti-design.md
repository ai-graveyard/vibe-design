---
document_type: style-reference
style_id: anti-design
study_version: "2026.09"
delivery_schema_version: "1"
source_url: https://v2ai.org/vibe-design/style/anti-design
demo_url: https://v2ai.org/vibe-design/demos/anti-design.html
demo_sha256: 04ca61eaf0bd93d4c04451ae27a3bb69e70121021c5d9ea6c951b6c76930a38e
---

# Anti-Design / 反设计

- Type / 类型：Visual aesthetic / 视觉美学
- Tags / 标签：Avant-garde · Distinctive / 前卫 · 个性
- Implementation estimate / 实现难度：2 Medium; an example complexity estimate, not a delivery-time promise.
- Candidate project types / 候选场景：E-commerce / Retail / 电商 / 零售
- [Original style page / 原始风格页](https://v2ai.org/vibe-design/style/anti-design)
- [Reference HTML / 演示源码](https://v2ai.org/vibe-design/demos/anti-design.html)
- [Ongoing DESIGN.md / 长期项目规范](https://v2ai.org/vibe-design/markdown/styles/anti-design/DESIGN.md)

## Principles / 风格原则

Break selected alignment and typographic conventions while keeping navigation and content order understandable.

有意打破局部对齐和字体惯例，同时让导航与内容顺序可理解。

Clashing primaries, displaced labels and mixed type create controlled tension in this study.

本例用冲突原色、错位标签和字体混搭，形成有控制的反差。

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
  --green: #89FC00;
  --magenta: #FF00FF;
  --red: #FF0000;
  --blue: #0000FF;
  --yellow: #FFFF00;
  --ink: #000000;
  --paper: #FFFFFF;
  --sans: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"PingFang SC","Microsoft YaHei",sans-serif;
  --serif: Georgia,"Times New Roman",serif;
  --mono: ui-monospace,"SF Mono",Menlo,Consolas,monospace;
}
```

## Bilingual style brief / 双语风格说明

Read the project brief and existing DESIGN.md first. Default to adapting the current project; this style description does not replace project constraints, routes, components or business content.

先读取项目简报和已有 DESIGN.md，默认改造当前项目；以下风格说明不能覆盖项目约束、路由、组件与业务内容。

**English**

Anti-Design. Break selected alignment and typographic conventions while keeping navigation and content order understandable. Clashing primaries, displaced labels and mixed type create controlled tension in this study. Occlusion, unusable controls and illegibility are not design goals. Adapt palette and dimensions to the content; use the current demo reference brief for an exact reproduction.

**中文**

反设计。有意打破局部对齐和字体惯例，同时让导航与内容顺序可理解。本例用冲突原色、错位标签和字体混搭，形成有控制的反差。不要把遮挡、不可点击或不可读当成设计目标。配色与尺寸可根据内容调整；精确复现请使用当前演示的参考包。

## Observable strengths / 设计取舍的优势

- Local displacement can create tension against a stable reading structure
  - 中文：局部错位可以与稳定的阅读结构形成反差
- Mixed type can support a defined expressive theme
  - 中文：字体混搭可承接明确的表达主题
- Clashing colors and labels can establish a distinct graphic vocabulary
  - 中文：冲突色与标签可建立独立图形语汇
- Experimental treatment can be limited to local content regions
  - 中文：实验区域可以限制在局部内容中

## Adaptation costs / 适配成本

- Navigation, focus and targets still need to be clear and usable
  - 中文：导航、焦点和点击目标仍需清楚可用
- Broken conventions need an expressive purpose recorded in the specification
  - 中文：打破的规则应有表达目的并写入规范
- Long Chinese headlines and font fallbacks can change displacement relationships
  - 中文：中文长标题与字体回退可能改变错位关系
- Multi-page expansion needs boundaries for which rules may vary
  - 中文：多页面扩展需要界定哪些规则可以变化

## Pitfalls / 避坑

- Occlusion, unusable controls and illegibility are not design goals.
  - 中文：不要把遮挡、不可点击或不可读当成设计目标。

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

Charli XCX - Brat · Balenciaga campaigns · MSCHF · Yaeji

These names are research leads rather than evidence that every page from those organizations matches this example. Verify the actual page and date before making a comparison. / 这些名称用于继续检索，不代表相关组织的每个页面都采用本例风格；对比前应核实具体页面与时间。

Reference file: anti-design.html (341 source lines). Source and outputs can change together; retain the version and hash when recording an implementation decision.

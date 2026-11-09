---
document_type: style-reference
style_id: material
study_version: "2026.09"
delivery_schema_version: "1"
source_url: https://v2ai.org/vibe-design/style/material
demo_url: https://v2ai.org/vibe-design/demos/material.html
demo_sha256: d4ed253b3cddb8c34198a89ea111d8f7787edfe8095d58a2570246ba86ce8690
---

# Material Design / Material Design

- Type / 类型：Design language / 设计语言
- Tags / 标签：Modern · Classic / 现代 · 经典
- Implementation estimate / 实现难度：2 Medium; an example complexity estimate, not a delivery-time promise.
- Candidate project types / 候选场景：Enterprise / B2B / 企业 / B2B
- [Original style page / 原始风格页](https://v2ai.org/vibe-design/style/material)
- [Reference HTML / 演示源码](../../assets/demos/material.html)
- [Ongoing DESIGN.md / 长期项目规范](../designs/material.md)

## Principles / 风格原则

Organize UI around Material 3 color roles, type scale, shape and state.

按 Material 3 的色彩角色、字号层级、形状与状态组织界面。

This study uses a purple primary, tonal surfaces and Roboto; its 56px FAB has 16px corners with clear hover and pressed feedback.

本例采用紫色主色、调性表面与 Roboto；56px FAB 使用 16px 圆角，悬浮与按下状态有明确反馈。

## Study boundaries / 演示边界

A Material 3 web study. Task interactions are local to this page, without services or saved data.

Material 3 网页演绎；任务交互只在当前页面生效，不连接服务或保存数据。

The study version identifies the existing reference family. The SHA-256 identifies the exact HTML bytes used for the tokens below; the delivery schema versions the document format. They do not certify a future AI-generated result.

风格版本标识参考系列，SHA-256 标识下列 Tokens 对应的 HTML 源码，交付结构版本标识文档格式；均不代表对后续 AI 生成结果的认证。

- [Material 3 · Theme, type & shape](https://developer.android.com/codelabs/m3-design-theming?hl=en)
- [Material 3 · Floating action button](https://developer.android.com/develop/ui/compose/components/fab)

## Example values / 示例取值

Parsed from the first :root block of the reference HTML, ignoring CSS comments. These are the same values exposed by the website. Match them when reproducing this particular demo; for a project adaptation, preserve the existing brand and record deliberate mappings in DESIGN.md.

从演示源码首个 :root 变量块提取并忽略 CSS 注释，与网页的 Tokens 共用解析器。复现此演示时使用原值；项目改造时优先保留品牌，并在 DESIGN.md 记录映射。

```css
:root {
  --primary: #6750A4;
  --on-primary: #FFFFFF;
  --primary-container: #EADDFF;
  --on-primary-container: #21005D;
  --secondary-container: #E8DEF8;
  --on-secondary-container: #1D192B;
  --tertiary-container: #FFD8E4;
  --on-tertiary-container: #31111D;
  --surface: #FEF7FF;
  --surface-dim: #F8F1FA;
  --surface-c-low: #F7F2FA;
  --surface-c: #F3EDF7;
  --surface-c-high: #ECE6F0;
  --on-surface: #1C1B1F;
  --on-surface-var: #49454F;
  --outline: #79747E;
  --outline-var: #CAC4D0;
  --blue: #4285F4;
  --green: #34A853;
  --yellow: #FBBC05;
  --red: #EA4335;
  --grey: #5F6368;
  --e1: 0 1px 2px rgba(0,0,0,.3), 0 1px 3px 1px rgba(0,0,0,.15);
  --e2: 0 1px 2px rgba(0,0,0,.3), 0 2px 6px 2px rgba(0,0,0,.15);
  --e3: 0 1px 3px rgba(0,0,0,.3), 0 4px 8px 3px rgba(0,0,0,.15);
  --e4: 0 2px 3px rgba(0,0,0,.3), 0 6px 10px 4px rgba(0,0,0,.15);
  --sans: "Roboto",-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "PingFang SC", "Microsoft YaHei", sans-serif;
}
```

## Bilingual style brief / 双语风格说明

Read the project brief and existing DESIGN.md first. Default to adapting the current project; this style description does not replace project constraints, routes, components or business content.

先读取项目简报和已有 DESIGN.md，默认改造当前项目；以下风格说明不能覆盖项目约束、路由、组件与业务内容。

**English**

Material Design. Organize UI around Material 3 color roles, type scale, shape and state. This study uses a purple primary, tonal surfaces and Roboto; its 56px FAB has 16px corners with clear hover and pressed feedback. Google brand colors are not a required Material palette, and circular FABs are not a rule for every version. Adapt palette and dimensions to the content; use the current demo reference brief for an exact reproduction.

**中文**

Material Design。按 Material 3 的色彩角色、字号层级、形状与状态组织界面。本例采用紫色主色、调性表面与 Roboto；56px FAB 使用 16px 圆角，悬浮与按下状态有明确反馈。不要把 Google 品牌四色当成 Material 的必选配色，或把圆形 FAB 当作所有版本的规范。配色与尺寸可根据内容调整；精确复现请使用当前演示的参考包。

## Observable strengths / 设计取舍的优势

- Color roles, type scales and shapes have coordinated naming
  - 中文：色彩角色、字阶与形状有成套命名
- Selected, hover and pressed states can share one system
  - 中文：选中、悬浮与按下状态可按同一体系组织
- Component patterns address common navigation and form tasks
  - 中文：组件模式覆盖常见导航与表单任务
- Tonal surfaces can distinguish information layers
  - 中文：调性色表面能区分信息层次

## Adaptation costs / 适配成本

- The chosen version and component implementation must be explicit
  - 中文：需要明确采用的版本和组件实现
- Default components need adaptation to carry the brand
  - 中文：默认组件需要调整以承接品牌表达
- Motion and elevation cannot replace task feedback
  - 中文：动效和层级不能直接替代任务反馈

## Pitfalls / 避坑

- Google brand colors are not a required Material palette, and circular FABs are not a rule for every version.
  - 中文：不要把 Google 品牌四色当成 Material 的必选配色，或把圆形 FAB 当作所有版本的规范。

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

All Google products · Android system UI · Flutter apps · YouTube

These names are research leads rather than evidence that every page from those organizations matches this example. Verify the actual page and date before making a comparison. / 这些名称用于继续检索，不代表相关组织的每个页面都采用本例风格；对比前应核实具体页面与时间。

Reference file: material.html (626 source lines). Source and outputs can change together; retain the version and hash when recording an implementation decision.

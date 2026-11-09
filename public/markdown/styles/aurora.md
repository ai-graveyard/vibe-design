---
document_type: style-reference
style_id: aurora
study_version: "2026.09"
delivery_schema_version: "1"
source_url: https://v2ai.org/vibe-design/style/aurora
demo_url: https://v2ai.org/vibe-design/demos/aurora.html
demo_sha256: bf5c00882f8ed7128ccf0cbf43df2410ea9d853f2b3cc6fb764e8af6a10f4ca5
---

# Aurora Gradients / 极光渐变

- Type / 类型：Visual aesthetic / 视觉美学
- Tags / 标签：Modern / 现代
- Implementation estimate / 实现难度：3 Hard; an example complexity estimate, not a delivery-time promise.
- Candidate project types / 候选场景：SaaS / Tech / SaaS / 科技产品
- [Original style page / 原始风格页](https://v2ai.org/vibe-design/style/aurora)
- [Reference HTML / 演示源码](https://v2ai.org/vibe-design/demos/aurora.html)
- [Ongoing DESIGN.md / 长期项目规范](https://v2ai.org/vibe-design/markdown/styles/aurora/DESIGN.md)

## Principles / 风格原则

Use broad soft gradients as atmosphere while keeping copy and product areas stable.

用大范围柔和渐变组织背景，保留稳定的文字和产品展示区域。

Blend warm and cool bands smoothly; control blur and luminance and carry accent color into select actions.

让冷暖色带平滑交汇，控制模糊半径与亮度，强调色延续到少量操作。

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
  --bg: #FAFAFC;
  --surface: #FFFFFF;
  --ink: #0A0A14;
  --ink-soft: #55556B;
  --ink-faint: #8B8BA3;
  --edge: #E6E6EE;
  --edge-soft: #F0F0F6;
  --aurora-iris: #635BFF;
  --aurora-indigo: #7A73FF;
  --aurora-cyan: #00D4FF;
  --aurora-pink: #FF80BF;
  --gradient-aurora: linear-gradient(95deg,var(--aurora-iris) 0%,var(--aurora-cyan) 52%,var(--aurora-pink) 104%);
  --dark: #0A0A14;
  --dark-raised: #111126;
  --on-dark: #F1F1FA;
  --on-dark-soft: #9C9CBC;
  --ok: #16B87A;
  --syntax-comment: #5E5E84;
  --syntax-keyword: #FF88C6;
  --syntax-string: #74E4FF;
  --syntax-ident: #BDB9FF;
  --syntax-plain: #E9E9F6;
  --radius-lg: 20px;
  --radius-md: 12px;
  --sans: -apple-system,BlinkMacSystemFont,"Segoe UI","Helvetica Neue",Roboto,Arial,"PingFang SC","Microsoft YaHei",sans-serif;
  --mono: ui-monospace,"SF Mono",SFMono-Regular,Menlo,Consolas,"Courier New",monospace;
}
```

## Bilingual style brief / 双语风格说明

Read the project brief and existing DESIGN.md first. Default to adapting the current project; this style description does not replace project constraints, routes, components or business content.

先读取项目简报和已有 DESIGN.md，默认改造当前项目；以下风格说明不能覆盖项目约束、路由、组件与业务内容。

**English**

Aurora Gradients. Use broad soft gradients as atmosphere while keeping copy and product areas stable. Blend warm and cool bands smoothly; control blur and luminance and carry accent color into select actions. Do not turn every card into a gradient; keep a stable contrast behind text. Adapt palette and dimensions to the content; use the current demo reference brief for an exact reproduction.

**中文**

极光渐变。用大范围柔和渐变组织背景，保留稳定的文字和产品展示区域。让冷暖色带平滑交汇，控制模糊半径与亮度，强调色延续到少量操作。不要把所有卡片都变成渐变；文字背景需要稳定对比。配色与尺寸可根据内容调整；精确复现请使用当前演示的参考包。

## Observable strengths / 设计取舍的优势

- Broad gradients can provide an atmospheric content layer
  - 中文：大范围渐变可为内容提供氛围层
- Color bands can be derived from existing brand colors
  - 中文：色带可以从既有品牌色延伸
- Gradients and blur can be expressed in CSS
  - 中文：渐变与模糊可用 CSS 表达
- Stable foreground surfaces can hold the product and primary action
  - 中文：稳定的前景表面可承接产品和主操作

## Adaptation costs / 适配成本

- Similar gradients need typography to distinguish the brand
  - 中文：相近的渐变需要配合排版才能区分品牌
- Text contrast needs checking as the background changes
  - 中文：文字背景变化时需要逐处检查对比
- Large blurred or animated regions need rendering checks on target devices
  - 中文：大面积模糊或动画需在目标设备上检查渲染

## Pitfalls / 避坑

- Do not turn every card into a gradient; keep a stable contrast behind text.
  - 中文：不要把所有卡片都变成渐变；文字背景需要稳定对比。

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

Stripe.com · Linear.app · Raycast.com · Resend.com · Clerk.com

These names are research leads rather than evidence that every page from those organizations matches this example. Verify the actual page and date before making a comparison. / 这些名称用于继续检索，不代表相关组织的每个页面都采用本例风格；对比前应核实具体页面与时间。

Reference file: aurora.html (417 source lines). Source and outputs can change together; retain the version and hash when recording an implementation decision.

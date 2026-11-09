---
document_type: style-reference
style_id: apple
study_version: "2026.09"
delivery_schema_version: "1"
source_url: https://v2ai.org/vibe-design/style/apple
demo_url: https://v2ai.org/vibe-design/demos/apple.html
demo_sha256: c41cc55eb119d5f5ea9f0a8fb264a14570666abc1949bf4eeda2098077e7258f
---

# Apple Minimalism / Apple 风

- Type / 类型：Design language / 设计语言
- Tags / 标签：Minimal · Modern / 极简 · 现代
- Implementation estimate / 实现难度：3 Hard; an example complexity estimate, not a delivery-time promise.
- Candidate project types / 候选场景：SaaS / Tech / SaaS / 科技产品, Enterprise / B2B / 企业 / B2B
- [Original style page / 原始风格页](https://v2ai.org/vibe-design/style/apple)
- [Reference HTML / 演示源码](../../assets/demos/apple.html)
- [Ongoing DESIGN.md / 长期项目规范](../designs/apple.md)

## Principles / 风格原则

Center the product: short headlines, large product imagery, clear benefits and restrained sections.

以产品为中心：短标题、大幅产品画面、清楚的卖点与克制的分区。

System sans-serif, tight display tracking and consistent spacing; reserve blue for links and primary actions. Let material and whitespace establish hierarchy.

系统无衬线字体，紧凑标题字距，统一间距；蓝色用于链接和主操作，材质与留白共同建立层级。

## Study boundaries / 演示边界

An original product-page study, not an official Apple template. The demo brand and specifications are fictional.

原创产品网页演绎，不是 Apple 官方模板；演示中的品牌与规格为虚构内容。

The study version identifies the existing reference family. The SHA-256 identifies the exact HTML bytes used for the tokens below; the delivery schema versions the document format. They do not certify a future AI-generated result.

风格版本标识参考系列，SHA-256 标识下列 Tokens 对应的 HTML 源码，交付结构版本标识文档格式；均不代表对后续 AI 生成结果的认证。

- [Apple · Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)

## Example values / 示例取值

Parsed from the first :root block of the reference HTML, ignoring CSS comments. These are the same values exposed by the website. Match them when reproducing this particular demo; for a project adaptation, preserve the existing brand and record deliberate mappings in DESIGN.md.

从演示源码首个 :root 变量块提取并忽略 CSS 注释，与网页的 Tokens 共用解析器。复现此演示时使用原值；项目改造时优先保留品牌，并在 DESIGN.md 记录映射。

```css
:root {
  --bg: #ffffff;
  --bg-alt: #f5f5f7;
  --fg: #1d1d1f;
  --fg-soft: #6e6e73;
  --accent: #0071e3;
  --accent-hover: #0077ed;
  --dark: #000000;
  --hairline: rgba(0,0,0,.08);
  --sans: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"PingFang SC","Microsoft YaHei",sans-serif;
}
```

## Bilingual style brief / 双语风格说明

Read the project brief and existing DESIGN.md first. Default to adapting the current project; this style description does not replace project constraints, routes, components or business content.

先读取项目简报和已有 DESIGN.md，默认改造当前项目；以下风格说明不能覆盖项目约束、路由、组件与业务内容。

**English**

Apple Minimalism. Center the product: short headlines, large product imagery, clear benefits and restrained sections. System sans-serif, tight display tracking and consistent spacing; reserve blue for links and primary actions. Let material and whitespace establish hierarchy. Whitespace must support content. Oversized corners, no accent color or a single shadow size are not universal rules. Adapt palette and dimensions to the content; use the current demo reference brief for an exact reproduction.

**中文**

Apple 风。以产品为中心：短标题、大幅产品画面、清楚的卖点与克制的分区。系统无衬线字体，紧凑标题字距，统一间距；蓝色用于链接和主操作，材质与留白共同建立层级。不要把大留白变成内容缺失，也不要把大圆角、无强调色或某个阴影尺寸当作通用规则。配色与尺寸可根据内容调整；精确复现请使用当前演示的参考包。

## Observable strengths / 设计取舍的优势

- Product imagery and short headlines establish a clear focus
  - 中文：产品画面与短标题形成明确焦点
- A consistent type and spacing scale can be reused across pages
  - 中文：统一字阶与间距便于跨页面复用
- Restrained accents leave room for the primary action
  - 中文：克制的强调色为主操作保留位置
- Section spacing separates the product story from supporting detail
  - 中文：分区留白可区分产品信息与细节

## Adaptation costs / 适配成本

- Generous whitespace needs purposeful copy and imagery
  - 中文：大留白需要足够的内容与图像支撑
- Complex data needs a structure beyond a sparse layout
  - 中文：低密度布局需为复杂数据另设结构
- Type weight, image sizing and responsive crops need individual tuning
  - 中文：细字重、图像尺寸与响应式裁切需要逐项调整

## Pitfalls / 避坑

- Whitespace must support content. Oversized corners, no accent color or a single shadow size are not universal rules.
  - 中文：不要把大留白变成内容缺失，也不要把大圆角、无强调色或某个阴影尺寸当作通用规则。

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

Apple.com · Linear.app · Notion.so · Stripe.com · Vercel.com

These names are research leads rather than evidence that every page from those organizations matches this example. Verify the actual page and date before making a comparison. / 这些名称用于继续检索，不代表相关组织的每个页面都采用本例风格；对比前应核实具体页面与时间。

Reference file: apple.html (349 source lines). Source and outputs can change together; retain the version and hash when recording an implementation decision.

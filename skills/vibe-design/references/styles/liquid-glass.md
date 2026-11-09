---
document_type: style-reference
style_id: liquid-glass
study_version: "2026.09"
delivery_schema_version: "1"
source_url: https://v2ai.org/vibe-design/style/liquid-glass
demo_url: https://v2ai.org/vibe-design/demos/liquid-glass.html
demo_sha256: dcaf416fc8a72398ca0607d2d4e04f95a2104f67f3321f1f4e76a7250407925c
---

# Liquid Glass / 液态玻璃

- Type / 类型：Material treatment / 材质表现
- Tags / 标签：Modern · Avant-garde / 现代 · 前卫
- Implementation estimate / 实现难度：3 Hard; an example complexity estimate, not a delivery-time promise.
- Candidate project types / 候选场景：SaaS / Tech / SaaS / 科技产品
- [Original style page / 原始风格页](https://v2ai.org/vibe-design/style/liquid-glass)
- [Reference HTML / 演示源码](../../assets/demos/liquid-glass.html)
- [Ongoing DESIGN.md / 长期项目规范](../designs/liquid-glass.md)

## Principles / 风格原则

Place floating navigation and controls above a clear content layer; avoid turning all content into glass.

将浮动导航与控件放在清晰的内容层之上，避免整页内容都变成玻璃。

Focus on lensing, edge highlights, adaptive shadows and legibility over changing content; both light and dark contexts are valid.

关注透镜感、边缘高光、动态阴影和背景变化后的可读性；浅色与深色环境均可使用。

## Study boundaries / 演示边界

A web material study of content/control separation, edge highlights and light/dark switching. CSS is an approximation of native real-time refraction, material merging and automatic legibility.

网页材质研究：示范内容与控件分层、边缘高光和亮暗切换。CSS 效果不等同于 Apple 原生的实时折射、材质融合与自动可读性处理。

The study version identifies the existing reference family. The SHA-256 identifies the exact HTML bytes used for the tokens below; the delivery schema versions the document format. They do not certify a future AI-generated result.

风格版本标识参考系列，SHA-256 标识下列 Tokens 对应的 HTML 源码，交付结构版本标识文档格式；均不代表对后续 AI 生成结果的认证。

- [Apple · Meet Liquid Glass](https://developer.apple.com/videos/play/wwdc2025/219/)

## Example values / 示例取值

Parsed from the first :root block of the reference HTML, ignoring CSS comments. These are the same values exposed by the website. Match them when reproducing this particular demo; for a project adaptation, preserve the existing brand and record deliberate mappings in DESIGN.md.

从演示源码首个 :root 变量块提取并忽略 CSS 注释，与网页的 Tokens 共用解析器。复现此演示时使用原值；项目改造时优先保留品牌，并在 DESIGN.md 记录映射。

```css
:root {
  --bg: #f7f8fa;
  --ink: #19202b;
  --muted: #647084;
  --line: #dce1e8;
  --accent: #126be4;
  --glass: rgba(255,255,255,.52);
  --edge: rgba(255,255,255,.8);
  --shadow: 0 8px 28px rgba(10,22,41,.16);
  --sans: "Inter",-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif;
  --radius: 28px;
  --blur: 12px;
}
```

## Bilingual style brief / 双语风格说明

Read the project brief and existing DESIGN.md first. Default to adapting the current project; this style description does not replace project constraints, routes, components or business content.

先读取项目简报和已有 DESIGN.md，默认改造当前项目；以下风格说明不能覆盖项目约束、路由、组件与业务内容。

**English**

Liquid Glass. Place floating navigation and controls above a clear content layer; avoid turning all content into glass. Focus on lensing, edge highlights, adaptive shadows and legibility over changing content; both light and dark contexts are valid. Do not equate it with more blur or treat dark glowing orbs and shadow removal as official requirements. Adapt palette and dimensions to the content; use the current demo reference brief for an exact reproduction.

**中文**

液态玻璃。将浮动导航与控件放在清晰的内容层之上，避免整页内容都变成玻璃。关注透镜感、边缘高光、动态阴影和背景变化后的可读性；浅色与深色环境均可使用。不要等同于增加 blur，也不要把深色光晕和禁用阴影当作官方规则。配色与尺寸可根据内容调整；精确复现请使用当前演示的参考包。

## Observable strengths / 设计取舍的优势

- Floating controls can be separated clearly from content
  - 中文：浮动控件与内容层可以明确分离
- Edge highlights can describe the material boundary
  - 中文：边缘高光可标示材质轮廓
- Visible background variation can express spatial layers
  - 中文：透过背景的变化可表现空间层次
- Solid content areas can carry long copy and data
  - 中文：可以保留实色内容区承载长文与数据

## Adaptation costs / 适配成本

- A CSS web treatment only approximates native material
  - 中文：CSS 网页效果只能近似原生材质
- Text and icon contrast need checking over changing light and dark backgrounds
  - 中文：明暗背景变化时需要检查文字与图标对比
- Provide a solid fallback without blur support and measure rendering on target devices
  - 中文：需提供不支持模糊时的实色回退并实测渲染

## Pitfalls / 避坑

- Do not equate it with more blur or treat dark glowing orbs and shadow removal as official requirements.
  - 中文：不要等同于增加 blur，也不要把深色光晕和禁用阴影当作官方规则。

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

iOS 26 · macOS Tahoe · visionOS · Apple.com

These names are research leads rather than evidence that every page from those organizations matches this example. Verify the actual page and date before making a comparison. / 这些名称用于继续检索，不代表相关组织的每个页面都采用本例风格；对比前应核实具体页面与时间。

Reference file: liquid-glass.html (158 source lines). Source and outputs can change together; retain the version and hash when recording an implementation decision.

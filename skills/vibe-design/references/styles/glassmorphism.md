---
document_type: style-reference
style_id: glassmorphism
study_version: "2026.09"
delivery_schema_version: "1"
source_url: https://v2ai.org/vibe-design/style/glassmorphism
demo_url: https://v2ai.org/vibe-design/demos/glassmorphism.html
demo_sha256: 8e728440c6e003751a40460dfbcb48ae1c230f79ec4af6e68a7fec4bdfc17086
---

# Glassmorphism / 玻璃拟态

- Type / 类型：Material treatment / 材质表现
- Tags / 标签：Modern / 现代
- Implementation estimate / 实现难度：3 Hard; an example complexity estimate, not a delivery-time promise.
- Candidate project types / 候选场景：SaaS / Tech / SaaS / 科技产品
- [Original style page / 原始风格页](https://v2ai.org/vibe-design/style/glassmorphism)
- [Reference HTML / 演示源码](../../assets/demos/glassmorphism.html)
- [Ongoing DESIGN.md / 长期项目规范](../designs/glassmorphism.md)

## Principles / 风格原则

Place a small number of translucent panels over a background with visible color and form.

把少量半透明面板放在具有颜色与轮廓的背景之前。

Backdrop blur, transparent fills, fine light borders and moderate shadows express frosted glass; the background must remain perceptible.

背景模糊、透明填充、细亮边与适量阴影共同表达磨砂玻璃；背景必须能被感知。

## Study boundaries / 演示边界

An original authored web study. Its palette, assets and dimensions are example choices, not a universal definition or an official brand template.

原创网页演绎。配色、素材和尺寸是当前示例的具体选择，不代表统一风格定义或品牌官方模板。

The study version identifies the existing reference family. The SHA-256 identifies the exact HTML bytes used for the tokens below; the delivery schema versions the document format. They do not certify a future AI-generated result.

风格版本标识参考系列，SHA-256 标识下列 Tokens 对应的 HTML 源码，交付结构版本标识文档格式；均不代表对后续 AI 生成结果的认证。

- [Microsoft Fluent · Acrylic material](https://learn.microsoft.com/en-us/windows/apps/design/style/acrylic)

## Example values / 示例取值

Parsed from the first :root block of the reference HTML, ignoring CSS comments. These are the same values exposed by the website. Match them when reproducing this particular demo; for a project adaptation, preserve the existing brand and record deliberate mappings in DESIGN.md.

从演示源码首个 :root 变量块提取并忽略 CSS 注释，与网页的 Tokens 共用解析器。复现此演示时使用原值；项目改造时优先保留品牌，并在 DESIGN.md 记录映射。

```css
:root {
  --bg0: #0d0f26;
  --bg1: #171a3d;
  --fg: #f4f5ff;
  --muted: rgba(230,233,255,.68);
  --faint: rgba(230,233,255,.42);
  --pink: #FF6B9D;
  --teal: #4ECDC4;
  --indigo: #667EEA;
  --violet: #9b6bff;
  --glass: rgba(255,255,255,.10);
  --glass-strong: rgba(255,255,255,.16);
  --stroke: rgba(255,255,255,.22);
  --stroke-soft: rgba(255,255,255,.12);
  --shadow: 0 24px 60px rgba(4,7,28,.5);
  --sans: "Inter",-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "PingFang SC", "Microsoft YaHei", sans-serif;
}
```

## Bilingual style brief / 双语风格说明

Read the project brief and existing DESIGN.md first. Default to adapting the current project; this style description does not replace project constraints, routes, components or business content.

先读取项目简报和已有 DESIGN.md，默认改造当前项目；以下风格说明不能覆盖项目约束、路由、组件与业务内容。

**English**

Glassmorphism. Place a small number of translucent panels over a background with visible color and form. Backdrop blur, transparent fills, fine light borders and moderate shadows express frosted glass; the background must remain perceptible. Avoid opaque cards and indiscriminate blur stacks; prioritize text contrast. Adapt palette and dimensions to the content; use the current demo reference brief for an exact reproduction.

**中文**

玻璃拟态。把少量半透明面板放在具有颜色与轮廓的背景之前。背景模糊、透明填充、细亮边与适量阴影共同表达磨砂玻璃；背景必须能被感知。避免不透明卡片或多层无差别模糊；先保证文字对比。配色与尺寸可根据内容调整；精确复现请使用当前演示的参考包。

## Observable strengths / 设计取舍的优势

- Translucent panels can retain background color and form
  - 中文：透明面板可保留背景的色彩与轮廓
- Fine borders and shadows can distinguish overlapping layers
  - 中文：细边框与阴影可区分叠放关系
- Local glass surfaces can combine with stable solid content areas
  - 中文：局部玻璃可以与稳定的实色内容区组合
- The material approach can work with light or dark palettes
  - 中文：明暗配色均可采用同一材质思路

## Adaptation costs / 适配成本

- Text and icon contrast need rechecking as the background changes
  - 中文：背景变化时需要重新检查文本与图标对比
- Nested blur layers need rendering measurements on target devices
  - 中文：嵌套模糊层需在目标设备上测量渲染耗时
- A solid fallback is needed without backdrop-filter support
  - 中文：不支持 backdrop-filter 时需要实色回退
- Too little or too much transparency can weaken material and hierarchy
  - 中文：透明度过低或过高都会弱化材质与层级

## Pitfalls / 避坑

- Avoid opaque cards and indiscriminate blur stacks; prioritize text contrast.
  - 中文：避免不透明卡片或多层无差别模糊；先保证文字对比。

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

macOS Big Sur · iOS Control Center · Windows 11 · Linear.app · Figma

These names are research leads rather than evidence that every page from those organizations matches this example. Verify the actual page and date before making a comparison. / 这些名称用于继续检索，不代表相关组织的每个页面都采用本例风格；对比前应核实具体页面与时间。

Reference file: glassmorphism.html (536 source lines). Source and outputs can change together; retain the version and hash when recording an implementation decision.

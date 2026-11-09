---
document_type: style-reference
style_id: organic
study_version: "2026.09"
delivery_schema_version: "1"
source_url: https://v2ai.org/vibe-design/style/organic
demo_url: https://v2ai.org/vibe-design/demos/organic.html
demo_sha256: 1c7ba4dfa6ddf4efdcfd7108b346c018d22a16d8ccaf8e7e2fb64e5e93747c6d
---

# Organic Design / 有机形态

- Type / 类型：Visual aesthetic / 视觉美学
- Tags / 标签：Modern · Playful / 现代 · 活泼
- Implementation estimate / 实现难度：4 Expert; an example complexity estimate, not a delivery-time promise.
- Candidate project types / 候选场景：Kids / Education / 儿童 / 教育
- [Original style page / 原始风格页](https://v2ai.org/vibe-design/style/organic)
- [Reference HTML / 演示源码](../../assets/demos/organic.html)
- [Ongoing DESIGN.md / 长期项目规范](../designs/organic.md)

## Principles / 风格原则

Create a flowing composition with asymmetric curves and natural imagery while keeping text clear.

以不对称的曲线和自然图像形成流动构图，文字保持清晰。

Shapes share a coherent curvature; gentle colors and forms guide reading.

形状之间有连续的曲率关系，色彩温和，图形帮助引导阅读。

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
  --mint: #A8E6CF;
  --leaf: #DCEDC1;
  --peach: #FFD3B6;
  --coral: #FFAAA5;
  --coral-deep: #F08A84;
  --sea: #98D8C8;
  --ink: #33544A;
  --ink-soft: #5F7A70;
  --bg: #FFF9F0;
  --deep: #2E5347;
  --serif: Georgia, serif;
  --sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "PingFang SC", "Microsoft YaHei", sans-serif;
}
```

## Bilingual style brief / 双语风格说明

Read the project brief and existing DESIGN.md first. Default to adapting the current project; this style description does not replace project constraints, routes, components or business content.

先读取项目简报和已有 DESIGN.md，默认改造当前项目；以下风格说明不能覆盖项目约束、路由、组件与业务内容。

**English**

Organic Design. Create a flowing composition with asymmetric curves and natural imagery while keeping text clear. Shapes share a coherent curvature; gentle colors and forms guide reading. Do not squeeze every text container into a blob; organic form still needs layout discipline. Adapt palette and dimensions to the content; use the current demo reference brief for an exact reproduction.

**中文**

有机形态。以不对称的曲线和自然图像形成流动构图，文字保持清晰。形状之间有连续的曲率关系，色彩温和，图形帮助引导阅读。不要把所有文字容器都挤进水滴；自然感不等于失去网格。配色与尺寸可根据内容调整；精确复现请使用当前演示的参考包。

## Observable strengths / 设计取舍的优势

- Asymmetric curves can connect content regions
  - 中文：不对称曲线可连接不同内容区域
- Natural images and gentle colors create continuous surfaces
  - 中文：自然图像与温和色彩形成连续表面
- Shapes can act as a supporting layer around the content
  - 中文：形状可作为内容之外的辅助视觉层
- Curvature and spacing rules can combine with an existing brand system
  - 中文：曲率和留白规则可与现有品牌系统组合

## Adaptation costs / 适配成本

- Curved crops and overlaps need separate narrow-screen handling
  - 中文：曲线裁切和叠放需要单独处理窄屏
- Decorative shapes must not crowd copy or targets
  - 中文：装饰形状不能挤压正文或点击目标
- Complex paths and morphing motion need target-device rendering checks
  - 中文：复杂路径和形变动画需检查目标设备渲染

## Pitfalls / 避坑

- Do not squeeze every text container into a blob; organic form still needs layout discipline.
  - 中文：不要把所有文字容器都挤进水滴；自然感不等于失去网格。

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

Stripe.com · Dropbox · Spotify · Mailchimp · Slack

These names are research leads rather than evidence that every page from those organizations matches this example. Verify the actual page and date before making a comparison. / 这些名称用于继续检索，不代表相关组织的每个页面都采用本例风格；对比前应核实具体页面与时间。

Reference file: organic.html (310 source lines). Source and outputs can change together; retain the version and hash when recording an implementation decision.

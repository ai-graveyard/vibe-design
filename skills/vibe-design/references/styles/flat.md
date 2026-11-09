---
document_type: style-reference
style_id: flat
study_version: "2026.09"
delivery_schema_version: "1"
source_url: https://v2ai.org/vibe-design/style/flat
demo_url: https://v2ai.org/vibe-design/demos/flat.html
demo_sha256: 1b36fde588e8e111f4840e996695dd807fd405df32200d54f80f8095892822c2
---

# Flat Design / 扁平化

- Type / 类型：Design language / 设计语言
- Tags / 标签：Minimal · Modern · Classic / 极简 · 现代 · 经典
- Implementation estimate / 实现难度：1 Easy; an example complexity estimate, not a delivery-time promise.
- Candidate project types / 候选场景：Enterprise / B2B / 企业 / B2B
- [Original style page / 原始风格页](https://v2ai.org/vibe-design/style/flat)
- [Reference HTML / 演示源码](../../assets/demos/flat.html)
- [Ongoing DESIGN.md / 长期项目规范](../designs/flat.md)

## Principles / 风格原则

Organize tasks with solid color regions, clear typography and simple icons.

用纯色分区、明确字号和简单图标组织任务。

Solid fills, clear boundaries and consistent icon strokes; hierarchy comes from contrast and position.

平面色块、清晰边界与一致的图标笔画，靠对比和位置形成层级。

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
  --blue: #2196F3;
  --blue-dark: #1976D2;
  --blue-tint: #E3F2FD;
  --green: #4CAF50;
  --green-dark: #388E3C;
  --orange: #FF9800;
  --orange-dark: #EF6C00;
  --orange-tint: #FFF3E0;
  --purple: #9C27B0;
  --purple-dark: #7B1FA2;
  --purple-tint: #F3E5F5;
  --cyan: #00BCD4;
  --cyan-tint: #E0F7FA;
  --ink: #263238;
  --muted: #607D8B;
  --bg: #FFFFFF;
  --bg-soft: #ECEFF1;
  --line: #CFD8DC;
  --sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "PingFang SC", "Microsoft YaHei", sans-serif;
}
```

## Bilingual style brief / 双语风格说明

Read the project brief and existing DESIGN.md first. Default to adapting the current project; this style description does not replace project constraints, routes, components or business content.

先读取项目简报和已有 DESIGN.md，默认改造当前项目；以下风格说明不能覆盖项目约束、路由、组件与业务内容。

**English**

Flat Design. Organize tasks with solid color regions, clear typography and simple icons. Solid fills, clear boundaries and consistent icon strokes; hierarchy comes from contrast and position. Avoid bevels, material reflections and decorative gradients; preserve interaction states. Adapt palette and dimensions to the content; use the current demo reference brief for an exact reproduction.

**中文**

扁平化。用纯色分区、明确字号和简单图标组织任务。平面色块、清晰边界与一致的图标笔画，靠对比和位置形成层级。避免立体斜面、材质反光和装饰性渐变；保留操作状态。配色与尺寸可根据内容调整；精确复现请使用当前演示的参考包。

## Observable strengths / 设计取舍的优势

- Solid regions and simple icons keep surfaces clear
  - 中文：纯色分区与简单图标保持表面清楚
- Hierarchy can be established without material reflections
  - 中文：不依赖材质反光也能建立层级
- Color and type rules can be mapped across platforms
  - 中文：颜色与字号规则可映射到不同平台
- Buttons and forms can share a consistent state language
  - 中文：按钮与表单能使用一致的状态语言

## Adaptation costs / 适配成本

- Boundaries, labels and position must signal interactions
  - 中文：需要用边界、标签和位置补足操作提示
- Color blocks alone can flatten content hierarchy
  - 中文：只用色块可能让不同内容层级相似
- Brand identity needs type, imagery or distinctive graphics
  - 中文：品牌辨识需要依靠字体、图像或专属图形

## Pitfalls / 避坑

- Avoid bevels, material reflections and decorative gradients; preserve interaction states.
  - 中文：避免立体斜面、材质反光和装饰性渐变；保留操作状态。

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

Windows 8/10 UI · Early iOS 7-12 · Google Material Design · Spotify

These names are research leads rather than evidence that every page from those organizations matches this example. Verify the actual page and date before making a comparison. / 这些名称用于继续检索，不代表相关组织的每个页面都采用本例风格；对比前应核实具体页面与时间。

Reference file: flat.html (372 source lines). Source and outputs can change together; retain the version and hash when recording an implementation decision.

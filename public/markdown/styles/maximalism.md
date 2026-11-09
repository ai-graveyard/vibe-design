---
document_type: style-reference
style_id: maximalism
study_version: "2026.09"
delivery_schema_version: "1"
source_url: https://v2ai.org/vibe-design/style/maximalism
demo_url: https://v2ai.org/vibe-design/demos/maximalism.html
demo_sha256: 2f304733a0bef27485126bb7db96c2e082a3f170aecbea2e4807bed0f13250ff
---

# Maximalism / 极繁主义

- Type / 类型：Visual aesthetic / 视觉美学
- Tags / 标签：Art · Distinctive / 艺术 · 个性
- Implementation estimate / 实现难度：4 Expert; an example complexity estimate, not a delivery-time promise.
- Candidate project types / 候选场景：E-commerce / Retail / 电商 / 零售, Gaming / Entertainment / 游戏 / 娱乐
- [Original style page / 原始风格页](https://v2ai.org/vibe-design/style/maximalism)
- [Reference HTML / 演示源码](https://v2ai.org/vibe-design/demos/maximalism.html)
- [Ongoing DESIGN.md / 长期项目规范](https://v2ai.org/vibe-design/markdown/styles/maximalism/DESIGN.md)

## Principles / 风格原则

Establish a dominant visual, then enrich it with secondary type, patterns and layered content.

建立一个强主视觉，再用次级文字、图案与层叠内容丰富节奏。

High density, multiple scales and vivid colors coexist with hierarchy, repetition and echoes.

高密度、多尺度与鲜明色彩同时存在，仍有主次、重复和呼应。

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
  --pink: #FF1493;
  --lime: #00FF00;
  --gold: #FFD700;
  --orange: #FF4500;
  --violet: #8B00FF;
  --violet-deep: #4B0082;
  --ink: #120019;
  --paper: #FFF3D6;
  --sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "PingFang SC", "Microsoft YaHei", sans-serif;
  --serif: Georgia, serif;
  --mono: ui-monospace, "SF Mono", Menlo, Consolas, monospace;
}
```

## Bilingual style brief / 双语风格说明

Read the project brief and existing DESIGN.md first. Default to adapting the current project; this style description does not replace project constraints, routes, components or business content.

先读取项目简报和已有 DESIGN.md，默认改造当前项目；以下风格说明不能覆盖项目约束、路由、组件与业务内容。

**English**

Maximalism. Establish a dominant visual, then enrich it with secondary type, patterns and layered content. High density, multiple scales and vivid colors coexist with hierarchy, repetition and echoes. Disorder alone is not maximalism; reserve clear space for primary actions and body copy. Adapt palette and dimensions to the content; use the current demo reference brief for an exact reproduction.

**中文**

极繁主义。建立一个强主视觉，再用次级文字、图案与层叠内容丰富节奏。高密度、多尺度与鲜明色彩同时存在，仍有主次、重复和呼应。不要把无序堆叠当作极繁；需要给主操作和正文留下明确位置。配色与尺寸可根据内容调整；精确复现请使用当前演示的参考包。

## Observable strengths / 设计取舍的优势

- Multiple type and image scales can form a rich hierarchy
  - 中文：多尺度文字与图像可形成丰富层级
- Repeating patterns can connect dense content
  - 中文：重复图案可以串联高密度内容
- Layering can support several narrative threads
  - 中文：叠放关系可支持多个叙事线索
- Vivid colors and quiet regions can arrange visual rhythm together
  - 中文：鲜明色彩与静区可共同安排视觉节奏

## Adaptation costs / 适配成本

- The dominant visual and primary action need explicit positions
  - 中文：需要明确主视觉与主操作的位置
- Image count and size need a separate budget and measurements
  - 中文：图片数量和尺寸需要独立预算与测量
- New content requires renewed occlusion and hierarchy checks
  - 中文：新增内容时需要重新检查遮挡与层级
- Mobile needs recomposition rather than a scaled desktop layout
  - 中文：手机端需要重排而非缩小整幅桌面构图

## Pitfalls / 避坑

- Disorder alone is not maximalism; reserve clear space for primary actions and body copy.
  - 中文：不要把无序堆叠当作极繁；需要给主操作和正文留下明确位置。

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

Gucci.com · Valentino · Dolce & Gabbana · Versace · Vogue Italia

These names are research leads rather than evidence that every page from those organizations matches this example. Verify the actual page and date before making a comparison. / 这些名称用于继续检索，不代表相关组织的每个页面都采用本例风格；对比前应核实具体页面与时间。

Reference file: maximalism.html (320 source lines). Source and outputs can change together; retain the version and hash when recording an implementation decision.

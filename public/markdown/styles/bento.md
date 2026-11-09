---
document_type: style-reference
style_id: bento
study_version: "2026.09"
delivery_schema_version: "1"
source_url: https://v2ai.org/vibe-design/style/bento
demo_url: https://v2ai.org/vibe-design/demos/bento.html
demo_sha256: 06b7edd8234e0eaf516fcf3c801d59d78f1929aecae1766bffc30da7284c42d8
---

# Bento Grid / Bento 网格

- Type / 类型：Layout pattern / 布局模式
- Tags / 标签：Minimal · Modern / 极简 · 现代
- Implementation estimate / 实现难度：2 Medium; an example complexity estimate, not a delivery-time promise.
- Candidate project types / 候选场景：SaaS / Tech / SaaS / 科技产品, E-commerce / Retail / 电商 / 零售
- [Original style page / 原始风格页](https://v2ai.org/vibe-design/style/bento)
- [Reference HTML / 演示源码](https://v2ai.org/vibe-design/demos/bento.html)
- [Ongoing DESIGN.md / 长期项目规范](https://v2ai.org/vibe-design/markdown/styles/bento/DESIGN.md)

## Principles / 风格原则

Arrange different amounts of information in a hierarchical modular grid; spanning cells carry the main story.

把不同体量的信息放入有主次的模块网格，跨列卡片承担重点内容。

This study uses 24px desktop card corners, white-gray surfaces and selective blue-violet accents, reordered for mobile.

本例桌面卡片采用 24px 圆角、白灰表面和少量蓝紫强调，手机按内容顺序重排。

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
  --bg: #F0F0F0;
  --card: #FFFFFF;
  --dark: #1E1E1E;
  --ink: #000000;
  --ink-soft: #515154;
  --on-dark: #F5F5F7;
  --on-dark-soft: #A1A1A6;
  --accent: #007AFF;
  --violet: #7D4CFF;
  --edge: rgba(0,0,0,.07);
  --edge-dark: rgba(255,255,255,.10);
  --radius: 24px;
  --sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "PingFang SC", "Microsoft YaHei", sans-serif;
}
```

## Bilingual style brief / 双语风格说明

Read the project brief and existing DESIGN.md first. Default to adapting the current project; this style description does not replace project constraints, routes, components or business content.

先读取项目简报和已有 DESIGN.md，默认改造当前项目；以下风格说明不能覆盖项目约束、路由、组件与业务内容。

**English**

Bento Grid. Arrange different amounts of information in a hierarchical modular grid; spanning cells carry the main story. This study uses 24px desktop card corners, white-gray surfaces and selective blue-violet accents, reordered for mobile. Bento is a composable layout, not a fixed palette. Avoid giving every tile equal visual weight. Adapt palette and dimensions to the content; use the current demo reference brief for an exact reproduction.

**中文**

Bento 网格。把不同体量的信息放入有主次的模块网格，跨列卡片承担重点内容。本例桌面卡片采用 24px 圆角、白灰表面和少量蓝紫强调，手机按内容顺序重排。不要把它理解成固定配色的独立风格；它可以与设计语言组合，避免每张卡片同等抢眼。配色与尺寸可根据内容调整；精确复现请使用当前演示的参考包。

## Observable strengths / 设计取舍的优势

- Spanning modules can emphasize priority content
  - 中文：跨列模块可以突出重点内容
- Different tile sizes can reflect different amounts of information
  - 中文：不同大小的卡片对应不同信息量
- Images, data and short copy can share a modular grid
  - 中文：图片、数据与简短说明可共享模块网格
- The layout can combine with brand type, color and material rules
  - 中文：可与品牌字体、色彩和材质规则组合

## Adaptation costs / 适配成本

- Each module needs an information priority before layout
  - 中文：需要先确定每个模块的信息优先级
- Mobile needs its own content-order and spanning checks
  - 中文：手机端必须重新检查内容顺序和跨列规则
- Fixed tile heights can clip long Chinese copy and dynamic content
  - 中文：固定卡片高度可能截断长中文和动态内容

## Pitfalls / 避坑

- Bento is a composable layout, not a fixed palette. Avoid giving every tile equal visual weight.
  - 中文：不要把它理解成固定配色的独立风格；它可以与设计语言组合，避免每张卡片同等抢眼。

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

Apple Product Pages · Linear Features · Notion.so · Raycast · Arc Browser

These names are research leads rather than evidence that every page from those organizations matches this example. Verify the actual page and date before making a comparison. / 这些名称用于继续检索，不代表相关组织的每个页面都采用本例风格；对比前应核实具体页面与时间。

Reference file: bento.html (342 source lines). Source and outputs can change together; retain the version and hash when recording an implementation decision.

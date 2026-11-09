---
document_type: style-reference
style_id: brutalism
study_version: "2026.09"
delivery_schema_version: "1"
source_url: https://v2ai.org/vibe-design/style/brutalism
demo_url: https://v2ai.org/vibe-design/demos/brutalism.html
demo_sha256: b835da4d112ef2ffd4c528d39e7b9fa5bcd64b7aeb5ba3b3adba170996a77efe
---

# Brutalism / 粗野主义

- Type / 类型：Visual aesthetic / 视觉美学
- Tags / 标签：Avant-garde · Distinctive / 前卫 · 个性
- Implementation estimate / 实现难度：1 Easy; an example complexity estimate, not a delivery-time promise.
- Candidate project types / 候选场景：Art / Culture / 艺术 / 文化
- [Original style page / 原始风格页](https://v2ai.org/vibe-design/style/brutalism)
- [Reference HTML / 演示源码](https://v2ai.org/vibe-design/demos/brutalism.html)
- [Ongoing DESIGN.md / 长期项目规范](https://v2ai.org/vibe-design/markdown/styles/brutalism/DESIGN.md)

## Principles / 风格原则

Use direct document structure, emphatic type and visible links for a raw web character.

用直接的文档结构、强文字层级与显露的链接建立原始网页感。

This study uses browser-like serif type, square corners, fine rules and link blue with dense content.

本例使用浏览器式衬线体、直角、细线与链接蓝，保留内容密度。

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
  --bg: #FFFFFF;
  --fg: #000000;
  --link: #0000EE;
  --visited: #551A8B;
  --hl: #FFFF00;
  --red: #FF0000;
  --green: #00FF00;
  --serif: Georgia,"Times New Roman",serif;
  --mono: ui-monospace,"SF Mono",Menlo,Consolas,monospace;
}
```

## Bilingual style brief / 双语风格说明

Read the project brief and existing DESIGN.md first. Default to adapting the current project; this style description does not replace project constraints, routes, components or business content.

先读取项目简报和已有 DESIGN.md，默认改造当前项目；以下风格说明不能覆盖项目约束、路由、组件与业务内容。

**English**

Brutalism. Use direct document structure, emphatic type and visible links for a raw web character. This study uses browser-like serif type, square corners, fine rules and link blue with dense content. Deliberate roughness still needs navigation and readability; broken layout is not a design principle. Adapt palette and dimensions to the content; use the current demo reference brief for an exact reproduction.

**中文**

粗野主义。用直接的文档结构、强文字层级与显露的链接建立原始网页感。本例使用浏览器式衬线体、直角、细线与链接蓝，保留内容密度。刻意粗粝也需要清楚的导航和可读性，不要把损坏布局当成风格。配色与尺寸可根据内容调整；精确复现请使用当前演示的参考包。

## Observable strengths / 设计取舍的优势

- Visible links and direct document structure expose navigation
  - 中文：显露链接与直接文档结构让导航可见
- Type, fine rules and square corners can form a complete surface language
  - 中文：文字、细线与直角可以构成完整表面
- Native browser controls and system fonts are usable choices
  - 中文：可采用浏览器原生控件与系统字体
- Paragraphs and dividers can organize dense content
  - 中文：内容密度可通过段落和分隔线组织

## Adaptation costs / 适配成本

- Deliberate roughness still needs hierarchy and reading order
  - 中文：刻意粗粝仍需明确的层级与阅读顺序
- Native control appearance varies across browsers
  - 中文：原生控件的外观在不同浏览器中有差异
- Experimental layout must not obscure focus, links or touch targets
  - 中文：实验排版不能遮挡焦点、链接或触控目标
- Brand expression needs to work with everyday functional use
  - 中文：品牌表达需要与功能页面的日常使用协调

## Pitfalls / 避坑

- Deliberate roughness still needs navigation and readability; broken layout is not a design principle.
  - 中文：刻意粗粝也需要清楚的导航和可读性，不要把损坏布局当成风格。

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

brutalistwebsites.com · Craigslist · Bloomberg.com (partially) · Hacker News

These names are research leads rather than evidence that every page from those organizations matches this example. Verify the actual page and date before making a comparison. / 这些名称用于继续检索，不代表相关组织的每个页面都采用本例风格；对比前应核实具体页面与时间。

Reference file: brutalism.html (313 source lines). Source and outputs can change together; retain the version and hash when recording an implementation decision.

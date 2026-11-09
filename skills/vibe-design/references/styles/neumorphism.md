---
document_type: style-reference
style_id: neumorphism
study_version: "2026.09"
delivery_schema_version: "1"
source_url: https://v2ai.org/vibe-design/style/neumorphism
demo_url: https://v2ai.org/vibe-design/demos/neumorphism.html
demo_sha256: 39c2fd79a287d6ecaaeafee3055fbd0293583b447a79b3af50fa766a45a596c5
---

# Neumorphism / Soft UI / 新拟态

- Type / 类型：Material treatment / 材质表现
- Tags / 标签：Modern · Minimal / 现代 · 极简
- Implementation estimate / 实现难度：2 Medium; an example complexity estimate, not a delivery-time promise.
- Candidate project types / 候选场景：Creative / Design / 创意 / 设计
- [Original style page / 原始风格页](https://v2ai.org/vibe-design/style/neumorphism)
- [Reference HTML / 演示源码](../../assets/demos/neumorphism.html)
- [Ongoing DESIGN.md / 长期项目规范](../designs/neumorphism.md)

## Principles / 风格原则

Organize a small number of controls through raised and inset forms on one base material.

用同一基底上的凸起与凹陷组织少量控件。

Paired light and dark shadows share a lighting direction; labels and selection need explicit clarity.

成对明暗阴影共享光照方向；选中状态与标签需要额外清楚。

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
  --bg: #E0E5EC;
  --bg-hi: #EAEFF6;
  --bg-lo: #D6DCE5;
  --light: #FFFFFF;
  --dark: #A3B1C6;
  --dark-deep: #93A1B8;
  --ink: #3E4A5F;
  --muted: #7A8CA5;
  --soft: #C8D0D8;
  --accent: #8296C4;
  --accent-deep: #6F84B5;
  --r-lg: 28px;
  --r-md: 18px;
  --raise: 9px 9px 18px var(--dark), -9px -9px 18px var(--light);
  --raise-sm: 6px 6px 12px var(--dark), -6px -6px 12px var(--light);
  --raise-lg: 14px 14px 30px var(--dark), -14px -14px 30px var(--light);
  --sink: inset 5px 5px 10px var(--dark), inset -5px -5px 10px var(--light);
  --sink-sm: inset 3px 3px 7px var(--dark), inset -3px -3px 7px var(--light);
  --sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "PingFang SC", "Microsoft YaHei", sans-serif;
}
```

## Bilingual style brief / 双语风格说明

Read the project brief and existing DESIGN.md first. Default to adapting the current project; this style description does not replace project constraints, routes, components or business content.

先读取项目简报和已有 DESIGN.md，默认改造当前项目；以下风格说明不能覆盖项目约束、路由、组件与业务内容。

**English**

Neumorphism / Soft UI. Organize a small number of controls through raised and inset forms on one base material. Paired light and dark shadows share a lighting direction; labels and selection need explicit clarity. Do not rely solely on low-contrast shadows for state; retain keyboard focus and usable touch targets. Adapt palette and dimensions to the content; use the current demo reference brief for an exact reproduction.

**中文**

新拟态。用同一基底上的凸起与凹陷组织少量控件。成对明暗阴影共享光照方向；选中状态与标签需要额外清楚。不要仅靠低对比阴影区分状态，保持键盘焦点和触控可用。配色与尺寸可根据内容调整；精确复现请使用当前演示的参考包。

## Observable strengths / 设计取舍的优势

- Paired shadows can express raised and inset forms on one base
  - 中文：成对阴影可以表达同一基底上的凸起与凹陷
- A shared lighting direction can connect controls
  - 中文：共享光照方向可连接不同控件
- Material treatment can be concentrated on a few focal controls
  - 中文：材质表达可以集中在少量重点控件
- Solid boundaries and text labels can supplement state expression
  - 中文：实线边界和文字标签可补充状态表达

## Adaptation costs / 适配成本

- Low-contrast shadows cannot carry boundaries and states alone
  - 中文：低对比阴影不能单独承担边界和状态
- Buttons and inputs need additional focus, labels and selection indicators
  - 中文：按钮与输入框需要额外的焦点、标签和选中标识
- Light and dark themes need separate shadow and contrast tuning
  - 中文：浅色与深色主题需要分别调整阴影和对比
- High-contrast preferences and shadow-free fallbacks need identifiable boundaries
  - 中文：高对比偏好与无阴影回退需要保留可辨识边界

## Pitfalls / 避坑

- Do not rely solely on low-contrast shadows for state; retain keyboard focus and usable touch targets.
  - 中文：不要仅靠低对比阴影区分状态，保持键盘焦点和触控可用。

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

Dribbble concepts · Smart home UI · Tesla car UI references

These names are research leads rather than evidence that every page from those organizations matches this example. Verify the actual page and date before making a comparison. / 这些名称用于继续检索，不代表相关组织的每个页面都采用本例风格；对比前应核实具体页面与时间。

Reference file: neumorphism.html (448 source lines). Source and outputs can change together; retain the version and hash when recording an implementation decision.

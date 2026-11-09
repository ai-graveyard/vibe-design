---
document_type: style-reference
style_id: art-deco
study_version: "2026.09"
delivery_schema_version: "1"
source_url: https://v2ai.org/vibe-design/style/art-deco
demo_url: https://v2ai.org/vibe-design/demos/art-deco.html
demo_sha256: f3f4a79e086350419fe70002fb6e6a792146a25559ecb730b4edea430e0ec95c
---

# Art Deco / 装饰艺术

- Type / 类型：Design movement / 设计流派
- Tags / 标签：Classic · Vintage / 经典 · 复古
- Implementation estimate / 实现难度：3 Hard; an example complexity estimate, not a delivery-time promise.
- Candidate project types / 候选场景：Art / Culture / 艺术 / 文化
- [Original style page / 原始风格页](https://v2ai.org/vibe-design/style/art-deco)
- [Reference HTML / 演示源码](https://v2ai.org/vibe-design/demos/art-deco.html)
- [Ongoing DESIGN.md / 长期项目规范](https://v2ai.org/vibe-design/markdown/styles/art-deco/DESIGN.md)

## Principles / 风格原则

Create ceremony with symmetry, stepped composition and ornamental framing.

用对称轴、阶梯形构图和装饰边框建立仪式感。

This study uses green-black, fine gold lines, radiating forms and widely spaced headlines.

本例用深绿黑、金色细线、放射形与宽字距标题。

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
  --bg: #0B0E0C;
  --panel: #101713;
  --gold: #D4AF37;
  --gold-dim: #8C7325;
  --gold-soft: rgba(212,175,55,.45);
  --silver: #C0C0C0;
  --cream: #EFE6CF;
  --serif: Georgia,"Palatino Linotype","Songti SC",serif;
}
```

## Bilingual style brief / 双语风格说明

Read the project brief and existing DESIGN.md first. Default to adapting the current project; this style description does not replace project constraints, routes, components or business content.

先读取项目简报和已有 DESIGN.md，默认改造当前项目；以下风格说明不能覆盖项目约束、路由、组件与业务内容。

**English**

Art Deco. Create ceremony with symmetry, stepped composition and ornamental framing. This study uses green-black, fine gold lines, radiating forms and widely spaced headlines. Black and gold alone are insufficient; geometric proportion and ornamental rhythm carry identity. Adapt palette and dimensions to the content; use the current demo reference brief for an exact reproduction.

**中文**

装饰艺术。用对称轴、阶梯形构图和装饰边框建立仪式感。本例用深绿黑、金色细线、放射形与宽字距标题。不要只靠黑金配色；几何比例和装饰节奏才构成辨识度。配色与尺寸可根据内容调整；精确复现请使用当前演示的参考包。

## Observable strengths / 设计取舍的优势

- Symmetry and stepped outlines create a ceremonial composition
  - 中文：对称轴和阶梯轮廓形成仪式化构图
- Fine-line frames can give content a defined structure
  - 中文：细线边框可为内容设置明确框架
- Tracked headlines can echo geometric ornament
  - 中文：宽字距标题与几何装饰形成呼应
- Metallic colors and dark surfaces can express material contrast
  - 中文：金属色与深色表面可表现材质对比

## Adaptation costs / 适配成本

- Ornament proportions need adjustment for headline length
  - 中文：装饰比例需要随标题长度调整
- Fine rules and small gold type need contrast and legibility checks
  - 中文：细线和金色小字需要检查对比与清晰度
- Narrow screens need simplified frames and symmetrical layouts
  - 中文：窄屏需要简化边框与对称布局
- Graphics, type and imagery need a coherent period vocabulary
  - 中文：图形、字体和图片应采用一致的时代语汇

## Pitfalls / 避坑

- Black and gold alone are insufficient; geometric proportion and ornamental rhythm carry identity.
  - 中文：不要只靠黑金配色；几何比例和装饰节奏才构成辨识度。

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

The Great Gatsby · Chrysler Building · The Savoy London · Tiffany & Co.

These names are research leads rather than evidence that every page from those organizations matches this example. Verify the actual page and date before making a comparison. / 这些名称用于继续检索，不代表相关组织的每个页面都采用本例风格；对比前应核实具体页面与时间。

Reference file: art-deco.html (345 source lines). Source and outputs can change together; retain the version and hash when recording an implementation decision.

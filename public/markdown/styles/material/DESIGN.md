---
document_type: project-design-baseline
style_id: material
study_version: "2026.09"
delivery_schema_version: "1"
source_url: https://v2ai.org/vibe-design/style/material
demo_url: https://v2ai.org/vibe-design/demos/material.html
demo_sha256: d4ed253b3cddb8c34198a89ea111d8f7787edfe8095d58a2570246ba86ce8690
---

# DESIGN.md — Material Design / Material Design

This is a project design baseline derived from one style study. Merge it into an existing DESIGN.md; do not overwrite established project rules. Before implementation, record the actual project brief, authorized routes, protected behavior, brand/token mappings and exceptions in the project's copy. This downloaded baseline does not claim those project-specific decisions have already been made.

这是一份长期项目规范起点。已有 DESIGN.md 时合并相关规则，保留项目既定约定。实施前在项目副本记录实际简报、授权页面、业务保留项、品牌/Tokens 映射和例外；本下载文件不声称这些项目决定已完成。

## Decision order / 决策顺序

1. Apply the user's confirmed brief and authorized scope. Preserve the existing business behavior, brand and useful components unless explicitly changed. / 先遵循已确认的项目简报与授权范围，保留业务、品牌及可复用组件。
2. Keep these style principles while adapting the example choices to the project. / 保留风格原则，按项目调整示例取值。
3. Record a reason for exceptions and use the same resolved rules on later pages. / 为例外记录原因，后续页面沿用已经确定的规则。

## Style principles / 风格原则

Organize UI around Material 3 color roles, type scale, shape and state.

按 Material 3 的色彩角色、字号层级、形状与状态组织界面。

This study uses a purple primary, tonal surfaces and Roboto; its 56px FAB has 16px corners with clear hover and pressed feedback.

本例采用紫色主色、调性表面与 Roboto；56px FAB 使用 16px 圆角，悬浮与按下状态有明确反馈。

Avoid / 避免：Google brand colors are not a required Material palette, and circular FABs are not a rule for every version. 不要把 Google 品牌四色当成 Material 的必选配色，或把圆形 FAB 当作所有版本的规范。

## Example token baseline / 示例 Tokens 基线

These values come from the exact reference source identified above. They are examples, not mandatory brand values. Before reuse, map them to existing project variables and document retained colors, fonts and spacing. Keep original example values when the user explicitly requests that demo's reproduction.

以下值来自上方 SHA-256 对应的演示源码，是示例而非强制品牌值。复用前映射到项目已有变量并记录保留的颜色、字体与间距。明确复现演示时保留示例原值。

```css
:root {
  --primary: #6750A4;
  --on-primary: #FFFFFF;
  --primary-container: #EADDFF;
  --on-primary-container: #21005D;
  --secondary-container: #E8DEF8;
  --on-secondary-container: #1D192B;
  --tertiary-container: #FFD8E4;
  --on-tertiary-container: #31111D;
  --surface: #FEF7FF;
  --surface-dim: #F8F1FA;
  --surface-c-low: #F7F2FA;
  --surface-c: #F3EDF7;
  --surface-c-high: #ECE6F0;
  --on-surface: #1C1B1F;
  --on-surface-var: #49454F;
  --outline: #79747E;
  --outline-var: #CAC4D0;
  --blue: #4285F4;
  --green: #34A853;
  --yellow: #FBBC05;
  --red: #EA4335;
  --grey: #5F6368;
  --e1: 0 1px 2px rgba(0,0,0,.3), 0 1px 3px 1px rgba(0,0,0,.15);
  --e2: 0 1px 2px rgba(0,0,0,.3), 0 2px 6px 2px rgba(0,0,0,.15);
  --e3: 0 1px 3px rgba(0,0,0,.3), 0 4px 8px 3px rgba(0,0,0,.15);
  --e4: 0 2px 3px rgba(0,0,0,.3), 0 6px 10px 4px rgba(0,0,0,.15);
  --sans: "Roboto",-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "PingFang SC", "Microsoft YaHei", sans-serif;
}
```

## Reusable components / 组件规则

- Reuse the current framework, component contracts and semantic elements. Style the existing navigation, buttons, inputs, tables, dialogs and feedback components that occur in the authorized scope. / 复用既有框架、组件契约与语义元素，覆盖授权范围中实际存在的导航、按钮、输入、表格、弹窗与反馈。
- Derive state styles from the same resolved project tokens. Keep selected, focus, disabled, validation, loading, empty and error states explicit; decoration never replaces labels or messages. / 组件状态使用同一套项目 Tokens，选中、焦点、禁用、校验、加载、空与错误需要明确表达。
- Keep working API calls, forms, route behavior, data fields, copy and analytics. Demo brands, numbers, images and claims do not become project content. / 保留接口、表单、路由、字段、文案与统计，演示品牌、数字、图片和主张不带入业务内容。

## Responsive and fallback rules / 响应式与回退

These are requirements for the adapted project, not certified coverage of every demo. / 以下是改造项目的验收要求，不代表每个演示已覆盖全部状态。

- Preserve business logic, routes, API contracts, data fields, authentication, forms, copy, analytics and existing component behavior. Retain brand rules and assets unless the project brief explicitly changes them. / 保留业务逻辑、路由、接口、字段、鉴权、表单、文案、统计及组件行为；品牌规则和素材按项目简报保留。
- Inspect default, hover, focus-visible, active, selected and disabled states where applicable. Verify keyboard navigation and visible focus, including dialogs and menus. / 检查适用的默认、悬浮、键盘焦点、按下、选中和禁用状态，以及弹窗与菜单的键盘操作。
- Check validation, loading, empty, error and long-content states in forms and data views. Keep labels and existing recovery actions available. / 检查校验、加载、空数据、错误与长内容状态，保留标签和已有恢复操作。
- Test long Chinese headings, mixed Chinese/English labels, font fallback, enlarged text and unbroken URLs. Reorder content intentionally on narrow screens; avoid document-level horizontal scroll, clipping and occlusion. / 测试长中文标题、中英混排、字体回退、放大文字和连续 URL，检查窄屏重排、整页横向溢出、裁切与遮挡。
- Inspect the actual routes in a browser after assets load at project breakpoints; if unspecified, compare 390×844, 768×1024, 1280×800 and 1440×900, plus a 375px narrow-screen check. Record what was actually inspected. / 在实际浏览器中检查项目断点；未指定时用上述视口并记录真实检查范围。
- Honor prefers-reduced-motion with readable static content; provide pause for persistent movement. Supply a solid-surface fallback for unsupported material effects and check text/control contrast against changing backgrounds. / 减弱动态效果时保留静态内容，持续运动提供暂停，不支持材质效果时采用实色回退并检查对比。
- Verify existing task behavior and project checks after visual changes. Record intentional token adaptations, remaining limits and unperformed checks; do not claim output fidelity, loading speed or conversion from style alone. / 改造后验证原任务与项目检查，记录参数调整、限制和未验收项，不以风格本身承诺还原度、加载速度或转化结果。

## Page rollout and maintenance / 页面迁移与维护

Implement and inspect one representative page before extending the same resolved rules to other authorized pages. Save before/after browser evidence, the final token mapping and component exceptions in the project's records. Update this document when a new page introduces a justified rule; do not silently create a second visual system.

先改造并验收一个代表页面，再扩展到其他已授权页面。记录浏览器前后对照、最终 Tokens 映射及组件例外；新页面确需新规则时同步更新本文件。

Source style page: https://v2ai.org/vibe-design/style/material
Machine-readable style brief: https://v2ai.org/vibe-design/markdown/styles/material.md
Reference HTML: https://v2ai.org/vibe-design/demos/material.html

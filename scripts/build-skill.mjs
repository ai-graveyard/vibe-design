#!/usr/bin/env node
// Rebuild the portable Skill and public agent documents from the same catalog/demo sources.
// Generated files are deterministic; edit src/data or scripts/skill-templates instead.
import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync } from 'node:fs';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputFlag = process.argv.indexOf('--output-root');
if (outputFlag !== -1 && !process.argv[outputFlag + 1]) throw new Error('--output-root requires a directory');
const outputRoot = outputFlag === -1 ? root : path.resolve(root, process.argv[outputFlag + 1]);
const out = path.join(outputRoot, 'skills/vibe-design');
const publicRoot = path.join(root, 'public');
const publicOut = path.join(outputRoot, 'public');
const tpl = (name) => readFileSync(path.join(root, 'scripts/skill-templates', name), 'utf8');
const { designStyles } = await import(path.join(root, 'src/data/styles.ts'));
const { parseDemoTokens } = await import(path.join(root, 'src/lib/demoSource.ts'));
const { styleSpecs, specVersion, kindNames } = await import(path.join(root, 'src/data/styleSpecs.ts'));
const { stylePrompts } = await import(path.join(root, 'src/data/prompts.ts'));
const { scenes, difficultyTiers } = await import(path.join(root, 'src/data/scenes.ts'));
const { SITE_URL } = await import(path.join(root, 'src/data/site.ts'));

const HOMEPAGE = SITE_URL;
const REPO = 'https://github.com/ai-graveyard/vibe-design';
const TARBALL = 'vibe-design-skill.tar.gz';
const DELIVERY_SCHEMA_VERSION = '1';
const promptById = new Map(stylePrompts.map((p) => [p.id, p]));
const DIFFICULTY_LABEL = { 1: 'Easy', 2: 'Medium', 3: 'Hard', 4: 'Expert' };
const difficultyById = new Map(difficultyTiers.flatMap((t) => t.styleIds.map((id) => [id, t.level])));
const scenesByStyle = new Map();
for (const scene of scenes) {
  for (const id of scene.styleIds) {
    if (!scenesByStyle.has(id)) scenesByStyle.set(id, []);
    scenesByStyle.get(id).push(`${scene.nameEn} / ${scene.name}`);
  }
}

const demoById = new Map();
function readDemo(id) {
  if (!demoById.has(id)) {
    const source = readFileSync(path.join(publicRoot, 'demos', `${id}.html`), 'utf8');
    const tokens = parseDemoTokens(source);
    if (!tokens.length) throw new Error(`No :root tokens in demo ${id}`);
    demoById.set(id, {
      tokens,
      lines: source.split('\n').length,
      sha256: createHash('sha256').update(source).digest('hex'),
    });
  }
  return demoById.get(id);
}
const list = (items) => items.map((item) => `- ${item}`).join('\n');
const pairs = (zh, en) => en.map((item, i) => `- ${item}\n  - 中文：${zh[i]}`).join('\n');
const tokenCss = (id) => `:root {\n${readDemo(id).tokens.map((token) => `  ${token.name}: ${token.value};`).join('\n')}\n}`;
const sourceUrl = (id) => `${HOMEPAGE}/style/${id}`;
const docUrl = (id) => `${HOMEPAGE}/markdown/styles/${id}.md`;
const designUrl = (id) => `${HOMEPAGE}/markdown/styles/${id}/DESIGN.md`;
const difficultyCell = (id) => {
  const level = difficultyById.get(id);
  return level ? `${level} ${DIFFICULTY_LABEL[level]}` : '—';
};
function metadata(style, documentType) {
  return `---\ndocument_type: ${documentType}\nstyle_id: ${style.id}\nstudy_version: ${JSON.stringify(specVersion)}\ndelivery_schema_version: ${JSON.stringify(DELIVERY_SCHEMA_VERSION)}\nsource_url: ${sourceUrl(style.id)}\ndemo_url: ${HOMEPAGE}/demos/${style.id}.html\ndemo_sha256: ${readDemo(style.id).sha256}\n---`;
}

const acceptance = `These are requirements for the adapted project, not certified coverage of every demo. / 以下是改造项目的验收要求，不代表每个演示已覆盖全部状态。

- Preserve business logic, routes, API contracts, data fields, authentication, forms, copy, analytics and existing component behavior. Retain brand rules and assets unless the project brief explicitly changes them. / 保留业务逻辑、路由、接口、字段、鉴权、表单、文案、统计及组件行为；品牌规则和素材按项目简报保留。
- Inspect default, hover, focus-visible, active, selected and disabled states where applicable. Verify keyboard navigation and visible focus, including dialogs and menus. / 检查适用的默认、悬浮、键盘焦点、按下、选中和禁用状态，以及弹窗与菜单的键盘操作。
- Check validation, loading, empty, error and long-content states in forms and data views. Keep labels and existing recovery actions available. / 检查校验、加载、空数据、错误与长内容状态，保留标签和已有恢复操作。
- Test long Chinese headings, mixed Chinese/English labels, font fallback, enlarged text and unbroken URLs. Reorder content intentionally on narrow screens; avoid document-level horizontal scroll, clipping and occlusion. / 测试长中文标题、中英混排、字体回退、放大文字和连续 URL，检查窄屏重排、整页横向溢出、裁切与遮挡。
- Inspect the actual routes in a browser after assets load at project breakpoints; if unspecified, compare 390×844, 768×1024, 1280×800 and 1440×900, plus a 375px narrow-screen check. Record what was actually inspected. / 在实际浏览器中检查项目断点；未指定时用上述视口并记录真实检查范围。
- Honor prefers-reduced-motion with readable static content; provide pause for persistent movement. Supply a solid-surface fallback for unsupported material effects and check text/control contrast against changing backgrounds. / 减弱动态效果时保留静态内容，持续运动提供暂停，不支持材质效果时采用实色回退并检查对比。
- Verify existing task behavior and project checks after visual changes. Record intentional token adaptations, remaining limits and unperformed checks; do not claim output fidelity, loading speed or conversion from style alone. / 改造后验证原任务与项目检查，记录参数调整、限制和未验收项，不以风格本身承诺还原度、加载速度或转化结果。`;

function styleDoc(style, target = 'public') {
  const p = promptById.get(style.id);
  const spec = styleSpecs[style.id];
  const demo = readDemo(style.id);
  const demoPath = target === 'skill' ? `../../assets/demos/${style.id}.html` : `${HOMEPAGE}/demos/${style.id}.html`;
  const designPath = target === 'skill' ? `../designs/${style.id}.md` : `${HOMEPAGE}/markdown/styles/${style.id}/DESIGN.md`;
  return `${metadata(style, 'style-reference')}

# ${style.nameEn} / ${style.name}

- Type / 类型：${kindNames[spec.kind].en} / ${kindNames[spec.kind].zh}
- Tags / 标签：${style.tagsEn.join(' · ')} / ${style.tags.join(' · ')}
- Implementation estimate / 实现难度：${difficultyCell(style.id)}; an example complexity estimate, not a delivery-time promise.
- Candidate project types / 候选场景：${(scenesByStyle.get(style.id) ?? []).join(', ')}
- [Original style page / 原始风格页](${sourceUrl(style.id)})
- [Reference HTML / 演示源码](${demoPath})
- [Ongoing DESIGN.md / 长期项目规范](${designPath})

## Principles / 风格原则

${spec.composition.en}

${spec.composition.zh}

${spec.signature.en}

${spec.signature.zh}

## Study boundaries / 演示边界

${spec.approximation?.en ?? 'An original authored web study. Its palette, assets and dimensions are example choices, not a universal definition or an official brand template.'}

${spec.approximation?.zh ?? '原创网页演绎。配色、素材和尺寸是当前示例的具体选择，不代表统一风格定义或品牌官方模板。'}

The study version identifies the existing reference family. The SHA-256 identifies the exact HTML bytes used for the tokens below; the delivery schema versions the document format. They do not certify a future AI-generated result.

风格版本标识参考系列，SHA-256 标识下列 Tokens 对应的 HTML 源码，交付结构版本标识文档格式；均不代表对后续 AI 生成结果的认证。

${(spec.references ?? []).map((ref) => `- [${ref.title}](${ref.url})`).join('\n') || 'No claim of certified historical reproduction. / 不声称历史作品的认证复刻。'}

## Example values / 示例取值

Parsed from the first :root block of the reference HTML, ignoring CSS comments. These are the same values exposed by the website. Match them when reproducing this particular demo; for a project adaptation, preserve the existing brand and record deliberate mappings in DESIGN.md.

从演示源码首个 :root 变量块提取并忽略 CSS 注释，与网页的 Tokens 共用解析器。复现此演示时使用原值；项目改造时优先保留品牌，并在 DESIGN.md 记录映射。

\`\`\`css
${tokenCss(style.id)}
\`\`\`

## Bilingual style brief / 双语风格说明

Read the project brief and existing DESIGN.md first. Default to adapting the current project; this style description does not replace project constraints, routes, components or business content.

先读取项目简报和已有 DESIGN.md，默认改造当前项目；以下风格说明不能覆盖项目约束、路由、组件与业务内容。

**English**

${p.promptEn}

**中文**

${p.prompt}

## Observable strengths / 设计取舍的优势

${pairs(style.pros, style.prosEn)}

## Adaptation costs / 适配成本

${pairs(style.cons, style.consEn)}

## Pitfalls / 避坑

${pairs(style.pitfalls, style.pitfallsEn)}

## Project acceptance / 项目验收

${acceptance}

## Inspiration names / 灵感检索名称

${style.examplesEn.join(' · ')}

These names are research leads rather than evidence that every page from those organizations matches this example. Verify the actual page and date before making a comparison. / 这些名称用于继续检索，不代表相关组织的每个页面都采用本例风格；对比前应核实具体页面与时间。

Reference file: ${style.id}.html (${demo.lines} source lines). Source and outputs can change together; retain the version and hash when recording an implementation decision.
`;
}

function designDoc(style) {
  const spec = styleSpecs[style.id];
  return `${metadata(style, 'project-design-baseline')}

# DESIGN.md — ${style.nameEn} / ${style.name}

This is a project design baseline derived from one style study. Merge it into an existing DESIGN.md; do not overwrite established project rules. Before implementation, record the actual project brief, authorized routes, protected behavior, brand/token mappings and exceptions in the project's copy. This downloaded baseline does not claim those project-specific decisions have already been made.

这是一份长期项目规范起点。已有 DESIGN.md 时合并相关规则，保留项目既定约定。实施前在项目副本记录实际简报、授权页面、业务保留项、品牌/Tokens 映射和例外；本下载文件不声称这些项目决定已完成。

## Decision order / 决策顺序

1. Apply the user's confirmed brief and authorized scope. Preserve the existing business behavior, brand and useful components unless explicitly changed. / 先遵循已确认的项目简报与授权范围，保留业务、品牌及可复用组件。
2. Keep these style principles while adapting the example choices to the project. / 保留风格原则，按项目调整示例取值。
3. Record a reason for exceptions and use the same resolved rules on later pages. / 为例外记录原因，后续页面沿用已经确定的规则。

## Style principles / 风格原则

${spec.composition.en}

${spec.composition.zh}

${spec.signature.en}

${spec.signature.zh}

Avoid / 避免：${spec.avoid.en} ${spec.avoid.zh}

## Example token baseline / 示例 Tokens 基线

These values come from the exact reference source identified above. They are examples, not mandatory brand values. Before reuse, map them to existing project variables and document retained colors, fonts and spacing. Keep original example values when the user explicitly requests that demo's reproduction.

以下值来自上方 SHA-256 对应的演示源码，是示例而非强制品牌值。复用前映射到项目已有变量并记录保留的颜色、字体与间距。明确复现演示时保留示例原值。

\`\`\`css
${tokenCss(style.id)}
\`\`\`

## Reusable components / 组件规则

- Reuse the current framework, component contracts and semantic elements. Style the existing navigation, buttons, inputs, tables, dialogs and feedback components that occur in the authorized scope. / 复用既有框架、组件契约与语义元素，覆盖授权范围中实际存在的导航、按钮、输入、表格、弹窗与反馈。
- Derive state styles from the same resolved project tokens. Keep selected, focus, disabled, validation, loading, empty and error states explicit; decoration never replaces labels or messages. / 组件状态使用同一套项目 Tokens，选中、焦点、禁用、校验、加载、空与错误需要明确表达。
- Keep working API calls, forms, route behavior, data fields, copy and analytics. Demo brands, numbers, images and claims do not become project content. / 保留接口、表单、路由、字段、文案与统计，演示品牌、数字、图片和主张不带入业务内容。

## Responsive and fallback rules / 响应式与回退

${acceptance}

## Page rollout and maintenance / 页面迁移与维护

Implement and inspect one representative page before extending the same resolved rules to other authorized pages. Save before/after browser evidence, the final token mapping and component exceptions in the project's records. Update this document when a new page introduces a justified rule; do not silently create a second visual system.

先改造并验收一个代表页面，再扩展到其他已授权页面。记录浏览器前后对照、最终 Tokens 映射及组件例外；新页面确需新规则时同步更新本文件。

Source style page: ${sourceUrl(style.id)}
Machine-readable style brief: ${docUrl(style.id)}
Reference HTML: ${HOMEPAGE}/demos/${style.id}.html
`;
}

function pickerDoc() {
  const byId = new Map(designStyles.map((style) => [style.id, style]));
  const line = (id) => {
    const style = byId.get(id);
    return `- [${style.nameEn} / ${style.name}](styles/${id}.md) — ${style.tagsEn.join(', ')}`;
  };
  return `# Choosing for a project\n\nRead the project brief and existing DESIGN.md first. Identify the page type, user goal, density, brand constraints and behavior to preserve. These groups are starting points rather than exclusive style rules.\n\n## By project type\n\n${scenes.map((scene) => `### ${scene.nameEn} / ${scene.name}\n\n${scene.styleIds.map(line).join('\n')}`).join('\n\n')}\n\n## By implementation difficulty\n\nThe estimate describes example implementation complexity, not project time or cost.\n\n${difficultyTiers.map((tier) => `### ${tier.level} · ${tier.nameEn} / ${tier.name}\n\n${tier.styleIds.map(line).join('\n')}`).join('\n\n')}\n\n## Recommendation\n\nOffer up to three candidates with a reason tied to the user's actual task and a concrete tradeoff. For example, a dense data view needs explicit field hierarchy and stable states; a material effect may be limited to navigation while the table uses solid surfaces. Explain the combination and preserve the existing brand.\n`;
}

function skillDoc() {
  const rows = designStyles.map((style) => `| \`${style.id}\` | ${style.nameEn} · ${style.name} | ${style.tagsEn.join(', ')} | ${style.useCasesEn[0] ?? ''} | ${difficultyCell(style.id)} |`);
  const index = ['| id | Style | Traits | Candidate use | Difficulty |', '| :-- | :-- | :-- | :-- | :-- |', ...rows].join('\n');
  const description = `Choose and apply a web visual style to an existing project while preserving business behavior, brand and components. ${designStyles.length} bilingual studies include source-derived example tokens, HTML references and reusable DESIGN.md baselines. Use for website restyling, style selection, or a new page with a requested visual direction; supports 网页改造、风格选型、品牌适配. Does not replace project behavior design or an unrelated accessibility audit.`;
  return tpl('SKILL.md.tpl').replaceAll('{{DESCRIPTION}}', description).replaceAll('{{STYLE_INDEX}}', index).replaceAll('{{COUNT}}', String(designStyles.length)).replaceAll('{{HOMEPAGE}}', HOMEPAGE);
}

function agentIndex() {
  return `# Vibe Design — agent reference index\n\nStudy version: ${specVersion} · Delivery schema: ${DELIVERY_SCHEMA_VERSION}\n\nRead the user's project brief and existing DESIGN.md before using a style. Default to preserving the current project's business logic, brand, assets and component contracts. Principles and authored example tokens are distinct; exact demo hashes are included in each file. Browser and behavior acceptance remains necessary after implementation.\n\n先读项目简报与已有 DESIGN.md，默认保留业务、品牌、素材和组件契约。风格原则与示例 Tokens 分开记录，实施后仍需浏览器及功能验收。\n\n${designStyles.map((style) => `- [${style.nameEn} / ${style.name}](${docUrl(style.id)}) — [DESIGN.md](${designUrl(style.id)}); ${style.tagsEn.join(', ')}`).join('\n')}\n\n- [Portable Skill installation](${HOMEPAGE}/skill.md)\n- [Full agent reference](${HOMEPAGE}/llms-full.txt)\n- [Source repository](${REPO})\n`;
}

// Validate bilingual data before replacing any generated output.
for (const style of designStyles) {
  if (!promptById.has(style.id) || !styleSpecs[style.id]) throw new Error(`Missing reference data for ${style.id}`);
  for (const key of ['tags', 'features', 'useCases', 'pros', 'cons', 'examples', 'pitfalls']) {
    if (style[key].length !== style[`${key}En`].length) throw new Error(`${style.id}: ${key} bilingual length mismatch`);
  }
  readDemo(style.id);
}
rmSync(out, { recursive: true, force: true });
mkdirSync(path.join(out, 'references/styles'), { recursive: true });
mkdirSync(path.join(out, 'references/designs'), { recursive: true });
mkdirSync(path.join(publicOut, 'markdown/styles'), { recursive: true });
const write = (relative, content) => writeFileSync(path.join(out, relative), content);
write('SKILL.md', skillDoc());
write('references/picker.md', pickerDoc());
write('references/checklist.md', tpl('checklist.md').replaceAll('{{COUNT}}', String(designStyles.length)));
for (const style of designStyles) {
  write(`references/styles/${style.id}.md`, styleDoc(style, 'skill'));
  write(`references/designs/${style.id}.md`, designDoc(style));
  writeFileSync(path.join(publicOut, 'markdown/styles', `${style.id}.md`), styleDoc(style));
  mkdirSync(path.join(publicOut, 'markdown/styles', style.id), { recursive: true });
  writeFileSync(path.join(publicOut, 'markdown/styles', style.id, 'DESIGN.md'), designDoc(style));
}
cpSync(path.join(publicRoot, 'demos'), path.join(out, 'assets/demos'), { recursive: true });
writeFileSync(path.join(publicOut, 'skill.md'), tpl('install.md.tpl').replaceAll('{{COUNT}}', String(designStyles.length)).replaceAll('{{HOMEPAGE}}', HOMEPAGE).replaceAll('{{REPO}}', REPO).replaceAll('{{TARBALL}}', TARBALL));
const index = agentIndex();
writeFileSync(path.join(publicOut, 'markdown/index.md'), index);
writeFileSync(path.join(publicOut, 'llms.txt'), `# Vibe Design\n\n> ${designStyles.length} bilingual web style studies for adapting existing projects, with source-derived tokens and reusable project rules.\n\n## Start here\n\n- [Agent index](${HOMEPAGE}/markdown/index.md): styles, versions and DESIGN.md downloads\n- [Full reference](${HOMEPAGE}/llms-full.txt): all style documents and project baselines\n- [Install the portable Skill](${HOMEPAGE}/skill.md): installation instructions\n\n## Style references\n\n${designStyles.map((style) => `- [${style.nameEn}](${docUrl(style.id)}): ${style.descriptionEn}`).join('\n')}\n`);
writeFileSync(path.join(publicOut, 'llms-full.txt'), `${index}\n\n---\n\n${designStyles.map((style) => `${styleDoc(style)}\n\n${designDoc(style)}`).join('\n\n---\n\n')}`);
console.log(`Generated ${designStyles.length} style references, ${designStyles.length} DESIGN.md baselines, the portable Skill and public agent indexes.`);

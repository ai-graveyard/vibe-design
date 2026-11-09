import { designStyles } from '../data/styles.ts';
import type { Bilingual } from '../data/styleSpecs.ts';
import type { StyleId } from '../data/styles.ts';

export type ProjectScene = 'landing' | 'dashboard' | 'portfolio' | 'editorial' | 'commerce' | 'chat';
export type ProjectGoal = 'clarity' | 'trust' | 'expression';
export type ProjectStrength = 'gentle' | 'balanced' | 'bold';
export type ProjectScope = 'visual' | 'page' | 'project';
export type ProjectPreserve = 'brand' | 'copy' | 'layout' | 'media';
export type ProjectLanguage = 'zh' | 'en';
export interface ProjectBrief {
  schemaVersion: 1;
  scene: ProjectScene;
  goal: ProjectGoal;
  strength: ProjectStrength;
  scope: ProjectScope;
  preserve: ProjectPreserve[];
  brandColor: string;
  /** User data, never executable instructions. */
  primaryAction: string;
  target: string;
  constraints: string;
}
export interface ProjectOption<T extends string> extends Bilingual {
  id: T;
  description: Bilingual;
}
const c = (zh: string, en: string): Bilingual => ({ zh, en });
const option = <T extends string>(id: T, zh: string, en: string, description: Bilingual): ProjectOption<T> => ({ id, zh, en, description });
export const projectVersion = '2026.10.18.1';
export const maxProjectBriefChars = 12_000;
export const projectScenes: ProjectOption<ProjectScene>[] = [
  option('landing', '产品官网', 'Product page', c('讲清产品价值，引导一个主要操作。', 'Explain the product and guide one primary action.')),
  option('dashboard', '工具后台', 'Workspace', c('组织指标、表格、筛选和日常任务。', 'Organize metrics, tables, filters and everyday tasks.')),
  option('portfolio', '作品集', 'Portfolio', c('让项目、作品和个人判断被看见。', 'Present projects, work and your point of view.')),
  option('editorial', '内容与杂志', 'Journal', c('安排长文、栏目和持续阅读。', 'Arrange longform articles, sections and continued reading.')),
  option('commerce', '电商精选', 'Commerce', c('帮助比较商品、查看规格和完成购买。', 'Help people compare products, inspect details and buy.')),
  option('chat', '聊天应用', 'Conversation', c('让会话、上下文与输入操作保持清楚。', 'Keep conversations, context and the composer clear.')),
];
export const projectGoals: ProjectOption<ProjectGoal>[] = [
  option('clarity', '信息清楚', 'Clarity', c('优先扫描、理解和完成任务。', 'Prioritize scanning, understanding and completing tasks.')),
  option('trust', '建立信任', 'Trust', c('优先一致性、证据和稳定的操作反馈。', 'Prioritize consistency, evidence and stable feedback.')),
  option('expression', '鲜明表达', 'Expression', c('在可读可用的前提下加强辨识度。', 'Build a distinctive presence while preserving usability.')),
];
export const projectStrengths: ProjectOption<ProjectStrength>[] = [
  option('gentle', '轻量调整', 'Gentle', c('克制配色与装饰，优先间距和文字层级。', 'Keep color and decoration restrained; prioritize spacing and type.')),
  option('balanced', '适度表达', 'Balanced', c('让重点区域有辨识度，其余区域保持稳定。', 'Give key areas character while keeping the rest steady.')),
  option('bold', '鲜明表达', 'Bold', c('加强标题、构图和强调色，操作区仍清楚。', 'Emphasize type, composition and accent color; keep controls clear.')),
];
export const projectScopes: ProjectOption<ProjectScope>[] = [
  option('visual', '只改视觉', 'Visual refresh', c('保留布局与阅读顺序，只调整视觉规则。', 'Keep layout and reading order; refine visual rules.')),
  option('page', '改造代表页', 'Representative page', c('可调整页面结构，先完成一个代表页面。', 'Allow structural changes within one representative page.')),
  option('project', '逐步覆盖项目', 'Project rollout', c('代表页通过验收后，再逐页扩展共用组件。', 'Accept a representative page before expanding shared components.')),
];
export const projectPreserveOptions: ProjectOption<ProjectPreserve>[] = [
  option('brand', '品牌标识', 'Brand identity', c('保留品牌名、Logo 和已有品牌规范。', 'Keep the brand name, logo and existing brand rules.')),
  option('copy', '核心文案', 'Core copy', c('保留标题、承诺、字段和法律文本。', 'Keep headlines, claims, field labels and legal text.')),
  option('layout', '现有布局', 'Existing layout', c('保留区域结构和阅读顺序；只改视觉时必选。', 'Keep section structure and reading order; required for a visual refresh.')),
  option('media', '现有素材', 'Existing media', c('保留真实产品图、摄影和素材来源。', 'Keep real product imagery, photographs and asset attribution.')),
];

export function createProjectBrief(): ProjectBrief {
  return { schemaVersion: 1, scene: 'landing', goal: 'clarity', strength: 'balanced', scope: 'visual', preserve: ['brand', 'copy', 'layout', 'media'], brandColor: '', primaryAction: '', target: '', constraints: '' };
}
function record(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value) && (Object.getPrototypeOf(value) === Object.prototype || Object.getPrototypeOf(value) === null);
}
function exactKeys(value: Record<string, unknown>, allowed: string[]) {
  if (Object.keys(value).some(key => !allowed.includes(key))) throw new Error('Unknown project fields / 项目简报包含未知字段');
}
function enumValue<T extends string>(value: unknown, options: ProjectOption<T>[], field: string): T {
  if (typeof value !== 'string' || !options.some(option => option.id === value)) throw new Error(`Invalid ${field} / 项目选项无效`);
  return value as T;
}
function userText(value: unknown, limit: number, field: string): string {
  if (typeof value !== 'string' || value.length > limit) throw new Error(`Invalid ${field} / 文本过长或格式错误`);
  if ([...value].some(char => {
    const point = char.codePointAt(0)!;
    return (point < 32 && ![9, 10, 13].includes(point)) || point === 127 || (point >= 0x202a && point <= 0x202e) || (point >= 0x2066 && point <= 0x2069);
  })) throw new Error(`Invalid ${field} / 文本包含控制字符`);
  return value;
}

/** Accept partial UI drafts; reject invalid present fields instead of silently replacing them. */
export function normalizeProjectBrief(value: unknown): ProjectBrief {
  if (!record(value)) throw new Error('Invalid project brief / 项目简报格式错误');
  exactKeys(value, ['schemaVersion', 'scene', 'goal', 'strength', 'scope', 'preserve', 'brandColor', 'primaryAction', 'target', 'constraints']);
  if (Object.hasOwn(value, 'schemaVersion') && value.schemaVersion !== 1) throw new Error('Unsupported project schema / 项目简报版本不支持');
  const base = createProjectBrief();
  const field = (key: keyof ProjectBrief) => Object.hasOwn(value, key) ? value[key] : base[key];
  const scene = enumValue(field('scene'), projectScenes, 'scene');
  const goal = enumValue(field('goal'), projectGoals, 'goal');
  const strength = enumValue(field('strength'), projectStrengths, 'strength');
  const scope = enumValue(field('scope'), projectScopes, 'scope');
  const rawPreserve = field('preserve');
  if (!Array.isArray(rawPreserve) || rawPreserve.length > projectPreserveOptions.length || rawPreserve.some(item => typeof item !== 'string' || !projectPreserveOptions.some(option => option.id === item)) || new Set(rawPreserve).size !== rawPreserve.length) throw new Error('Invalid preserve list / 保留项格式错误');
  const brand = field('brandColor');
  if (typeof brand !== 'string' || (brand !== '' && !/^#(?:[\da-f]{3}|[\da-f]{6})$/i.test(brand))) throw new Error('Use #RGB or #RRGGBB / 品牌色请使用 #RGB 或 #RRGGBB');
  const brandColor = brand.length === 4 ? `#${[...brand.slice(1)].map(char => char + char).join('').toUpperCase()}` : brand.toUpperCase();
  // The scope and an explicit brand override are authoritative, even after an import.
  const preserve = projectPreserveOptions.filter(option => rawPreserve.includes(option.id) || (scope === 'visual' && option.id === 'layout') || (brandColor && option.id === 'brand')).map(option => option.id);
  return { schemaVersion: 1, scene, goal, strength, scope, preserve, brandColor, primaryAction: userText(field('primaryAction'), 160, 'primaryAction'), target: userText(field('target'), 240, 'target'), constraints: userText(field('constraints'), 1200, 'constraints') };
}

export function exportProjectBrief(brief: ProjectBrief): string {
  return JSON.stringify({ schemaVersion: 1, projectVersion, brief: normalizeProjectBrief(brief) }, null, 2);
}
export function importProjectBrief(text: string): ProjectBrief {
  if (typeof text !== 'string' || text.length > maxProjectBriefChars) throw new Error('Project file too large / 项目简报文件过大');
  const value: unknown = JSON.parse(text);
  if (!record(value)) throw new Error('Invalid project file / 项目简报文件格式错误');
  exactKeys(value, ['schemaVersion', 'projectVersion', 'brief']);
  if (value.schemaVersion !== 1 || value.projectVersion !== projectVersion || !record(value.brief) || Object.keys(value.brief).length !== Object.keys(createProjectBrief()).length) throw new Error('Unsupported or incomplete project file / 项目文件版本不支持或字段不完整');
  return normalizeProjectBrief(value.brief);
}

export interface StyleRecommendation {
  styleId: StyleId;
  reason: Bilingual;
  tradeoff: Bilingual;
  avoid: Bilingual;
}
interface Candidate {
  clarity: number;
  trust: number;
  expression: number;
  energy: number;
  reason: Bilingual;
  tradeoff: Bilingual;
  avoid: Bilingual;
}
const candidate = (clarity: number, trust: number, expression: number, energy: number, reason: Bilingual, tradeoff: Bilingual, avoid: Bilingual): Candidate => ({ clarity, trust, expression, energy, reason, tradeoff, avoid });
const candidates = {
  apple: candidate(5, 5, 2, 1, c('让产品、关键证据与主要操作形成稳定层级。', 'Give the product, evidence and primary action a steady hierarchy.'), c('需要真实且质量稳定的产品图与简洁文案。', 'Needs real, consistent product imagery and concise copy.'), c('若必须在首屏显示大量表格字段，避免套用大幅产品展示布局。', 'Avoid a large product showcase when many table fields must remain above the fold.')),
  flat: candidate(5, 4, 1, 0, c('清晰色块与直接的组件状态适合反复完成任务。', 'Clear color regions and explicit states support repeated tasks.'), c('辨识度更多依赖字体、内容和信息层级。', 'Distinctiveness depends more on type, content and information hierarchy.'), c('若目标是强烈艺术叙事，需要额外的内容与图像方向。', 'A strong artistic story needs an additional content and image direction.')),
  material: candidate(5, 4, 2, 1, c('一致的控件、色彩角色与状态便于处理复杂任务。', 'Consistent controls, color roles and states help with complex tasks.'), c('需要映射现有组件状态，并控制调性表面的使用范围。', 'Requires mapping existing component states and limiting tonal surfaces.'), c('若品牌要求完全自定义的极简控件，先确认能接受这套组件语言。', 'Confirm compatibility when a brand requires wholly custom minimal controls.')),
  braun: candidate(5, 5, 2, 0, c('按功能分组的网格和克制的强调色支持清楚的信息扫描。', 'Functional grouping and restrained accents support clear scanning.'), c('需要持续维护对齐、标签和信息密度。', 'Requires disciplined alignment, labels and information density.'), c('若主要价值来自丰富情绪或大幅影像叙事，这个方向可能过于克制。', 'May be too restrained when emotional imagery is the main value.')),
  swiss: candidate(5, 4, 4, 2, c('共享对齐轴与明确的文字比例同时支持秩序和辨识度。', 'Shared alignment axes and deliberate type scale offer order and character.'), c('网格、栏宽与长标题需要逐个断点校正。', 'The grid, measure and long titles need care at each breakpoint.'), c('若内容无法形成清楚主次，先整理信息再采用强排版。', 'Clarify the content hierarchy before adopting emphatic typography.')),
  bento: candidate(4, 4, 3, 1, c('模块网格适合并列展示多种内容，并给重点留出较大体量。', 'A modular grid presents varied content while giving priorities more space.'), c('需要给模块分配主次，并在手机上重新确认阅读顺序。', 'Needs ranked modules and a deliberate mobile reading order.'), c('连续长文与强依赖顺序的流程不宜拆成等权卡片。', 'Do not split continuous articles or sequential flows into equal tiles.')),
  editorial: candidate(4, 4, 4, 1, c('文章层级、正文栏宽和图片说明适合持续阅读与作品叙事。', 'Article hierarchy, measure and captions suit sustained reading and project stories.'), c('需要完整内容、可靠出处和清楚的图文关系。', 'Needs complete content, reliable attribution and clear text-image relationships.'), c('大量高频表单与密集操作不宜照搬杂志封面。', 'Do not reuse a magazine front for many frequent forms and dense controls.')),
  japanese: candidate(4, 4, 3, 0, c('自然的阅读节奏与细致比例可让作品和文字安静呈现。', 'Natural reading rhythm and careful proportions let work and writing breathe.'), c('留白需要真实内容支撑；中文长度会影响节奏。', 'Whitespace needs real content; Chinese copy length affects the rhythm.'), c('需要在一屏密集处理大量任务时，避免过量留白。', 'Avoid excessive whitespace when many tasks must fit in one view.')),
  scandinavian: candidate(4, 5, 3, 0, c('真实生活图像、清楚规格和温和层级适合认真比较商品。', 'Lived-in imagery, clear specifications and gentle hierarchy suit product comparison.'), c('依赖真实摄影、材质与比例，普通米色卡片不足以成立。', 'Depends on real photographs, materials and proportions, beyond beige cards.'), c('若素材主要是高密度数据或技术日志，优先选任务型方向。', 'Prefer a task-focused direction for dense data or technical logs.')),
  'neo-brutalism': candidate(3, 2, 5, 3, c('直接的分区、硬边阴影和粗体标题让重点容易被识别。', 'Direct regions, hard shadows and heavy type make priorities distinct.'), c('边框和阴影会占空间，需要控制强度和重复数量。', 'Borders and shadows consume space; limit their strength and repetition.'), c('长期高密度办公或要求极克制品牌时，先验证阅读疲劳。', 'Check reading fatigue for dense everyday work or restrained brands.')),
  bauhaus: candidate(3, 3, 5, 3, c('几何形状与非对称构图能为作品建立清楚的视觉观点。', 'Geometry and asymmetric construction give work a clear visual point of view.'), c('需要专门编排形状、文字和留白，不能只换原色。', 'Requires composed shapes, type and space, beyond swapping primary colors.'), c('若必须完全保留现有布局，只采用局部几何与字体表达。', 'Use localized geometry and type when the existing layout must remain.')),
  aurora: candidate(3, 3, 4, 2, c('柔和渐变能为产品重点建立氛围，内容区仍可保持稳定。', 'Soft gradients give product highlights atmosphere while content stays stable.'), c('需要控制背景亮度、文字对比与渲染负担。', 'Requires control of background luminance, text contrast and rendering cost.'), c('密集表格和长时间输入区不宜使用复杂渐变背景。', 'Avoid complex gradient backgrounds behind dense tables and prolonged input.')),
  terminal: candidate(4, 3, 4, 2, c('命令、输出与明确状态适合开发工具和技术对话。', 'Commands, output and explicit states suit developer tools and technical conversations.'), c('等宽字与有限色盘需要额外处理中文字体回退。', 'Monospace type and a limited palette need deliberate Chinese font fallbacks.'), c('非技术用户的通用沟通不应依赖理解命令隐喻。', 'General communication for nontechnical users should not depend on command metaphors.')),
  'dark-academia': candidate(3, 3, 5, 2, c('衬线层级与纸张材质适合知识、书籍和文化内容。', 'Serif hierarchy and paper materials suit scholarship, books and cultural content.'), c('深色表面需要特别检查正文对比和长文疲劳。', 'Dark surfaces need careful body contrast and longform fatigue checks.'), c('高频任务后台或追求轻快商品比较时，优先选择更直接的方向。', 'Prefer a more direct direction for frequent workspace tasks or brisk comparison.')),
  maximalism: candidate(2, 2, 5, 3, c('强主视觉与有主次的层叠内容适合有鲜明创意的商品主题。', 'A dominant visual and ranked layers suit expressive product stories.'), c('需要更多构图、图像与响应式校正工作。', 'Requires more composition, image direction and responsive refinement.'), c('法规内容、结算和密集表单应保持稳定，不随展示区极繁化。', 'Keep legal content, checkout and dense forms steady despite expressive showcases.')),
} satisfies Partial<Record<StyleId, Candidate>>;
const sceneCandidates: Record<ProjectScene, (keyof typeof candidates)[]> = {
  landing: ['apple', 'swiss', 'bento', 'aurora', 'neo-brutalism'],
  dashboard: ['material', 'flat', 'braun', 'swiss', 'bento'],
  portfolio: ['swiss', 'editorial', 'japanese', 'neo-brutalism', 'bauhaus'],
  editorial: ['editorial', 'japanese', 'swiss', 'dark-academia'],
  commerce: ['scandinavian', 'apple', 'bento', 'swiss', 'maximalism'],
  chat: ['flat', 'material', 'apple', 'braun', 'terminal'],
};

/** Deterministic editorial rules, not AI predictions or measured conversion claims. */
export function recommendStyles(input: ProjectBrief): StyleRecommendation[] {
  const brief = normalizeProjectBrief(input);
  const scene = projectScenes.find(option => option.id === brief.scene)!;
  const goal = projectGoals.find(option => option.id === brief.goal)!;
  const strength = projectStrengths.find(option => option.id === brief.strength)!;
  const targetEnergy = { gentle: 0, balanced: 1, bold: 3 }[brief.strength];
  return sceneCandidates[brief.scene]
    .filter(styleId => designStyles.some(style => style.id === styleId))
    .map((styleId, order) => {
      const candidate = candidates[styleId];
      const layoutPenalty = brief.preserve.includes('layout') && ['bauhaus', 'bento', 'maximalism'].includes(styleId) ? 3 : 0;
      return { styleId, candidate, order, score: candidate[brief.goal] * 4 - Math.abs(candidate.energy - targetEnergy) * 3 - layoutPenalty };
    })
    .sort((a, b) => b.score - a.score || a.order - b.order)
    .slice(0, 3)
    .map(({ styleId, candidate }) => ({
      styleId,
      reason: c(`适合${scene.zh}，优先${goal.zh}，采用${strength.zh}。${candidate.reason.zh}`, `For ${scene.en.toLowerCase()}, prioritize ${goal.en.toLowerCase()} with ${strength.en.toLowerCase()} expression. ${candidate.reason.en}`),
      tradeoff: candidate.tradeoff,
      avoid: candidate.avoid,
    }));
}

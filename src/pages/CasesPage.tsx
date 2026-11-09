import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Download, ExternalLink } from 'lucide-react';
import { useAppStore } from '../store/appStore';
import { designStyles } from '../data/styles';
import { usePageMeta } from '../hooks/usePageMeta';
import { LanguageToggle } from '../components/LanguageToggle';
import { ThemeToggle } from '../components/ThemeToggle';
import { publicUrl } from '../data/site';
import '../project/project.css';
import '../project/evidence.css';

interface Sample { styleId: string; scene: 'landing' | 'dashboard'; language: 'zh' | 'en'; viewport: { width: number; height: number }; checks: string[]; screenshot: string; sourceHash: string }
interface Evidence { schemaVersion: 1; status: 'passed'; buildId: string; generatedAt: string; browser: string; samples: Sample[] }
function sampleLabels(sample: Sample, language: 'zh' | 'en') {
  return language === 'zh'
    ? ['字体与素材加载完成', '手机与桌面无页面溢出', '参考参数与来源一致', sample.scene === 'dashboard' ? '搜索、新建与状态恢复可用' : '表单校验与本地反馈可用']
    : ['Fonts and assets loaded', 'No page-level overflow', 'Reference values and source match', sample.scene === 'dashboard' ? 'Search, creation and state recovery work' : 'Form validation and local feedback work'];
}
function validEvidence(value: unknown): value is Evidence {
  if (!value || typeof value !== 'object') return false;
  const data = value as Evidence;
  return data.schemaVersion === 1 && data.status === 'passed' && typeof data.buildId === 'string' && typeof data.generatedAt === 'string' && Number.isFinite(Date.parse(data.generatedAt)) && typeof data.browser === 'string' && Array.isArray(data.samples) && data.samples.length > 0 && data.samples.every(s => designStyles.some(d => d.id === s.styleId) && ['landing', 'dashboard'].includes(s.scene) && ['zh', 'en'].includes(s.language) && s.viewport && Number.isInteger(s.viewport.width) && Number.isInteger(s.viewport.height) && Array.isArray(s.checks) && s.checks.length >= 4 && s.checks.every(c => typeof c === 'string') && typeof s.sourceHash === 'string' && /^\/validation\/images\/[a-z0-9-]+\.png$/.test(s.screenshot));
}
export function CasesPage() {
  const { language } = useAppStore();
  const zh = language === 'zh', t = (a: string, b: string) => zh ? a : b;
  const [report, setReport] = useState<Evidence | null>(null);
  const [state, setState] = useState<'loading' | 'ready' | 'missing' | 'stale'>('loading');
  const [scene, setScene] = useState<'landing' | 'dashboard'>('dashboard');
  usePageMeta(t('验证样本与边界 · Vibe Design', 'Evidence and limits · Vibe Design'), t('查看当前构建的浏览器检查记录、同内容样本和检查边界。', 'Inspect browser checks, shared-content samples and their limits for this build.'));
  useEffect(() => {
    const controller = new AbortController();
    Promise.all([publicUrl('/validation/evidence.json'), publicUrl('/build-id.json')].map(async url => { const response = await fetch(url, { signal: controller.signal, cache: 'no-store' }); if (!response.ok) throw new Error('Missing evidence'); return response.json(); })).then(([data, build]) => { if (!validEvidence(data)) throw new Error('Invalid evidence'); if (data.buildId !== build.id) { setState('stale'); return; } setReport(data); setState('ready'); }).catch(() => { if (!controller.signal.aborted) setState('missing'); });
    return () => controller.abort();
  }, []);
  const rows = report?.samples.filter(sample => sample.scene === scene && sample.language === language && sample.viewport.width === 390) ?? [];
  return <div className="project-page"><header className="project-nav"><Link to="/" className="project-wordmark"><ArrowLeft size={16} /><span>VIBE DESIGN</span></Link><nav aria-label={t('验证导航', 'Evidence navigation')}><Link to="/project">{t('为我的网页选', 'For my site')}</Link><LanguageToggle /><ThemeToggle /></nav></header><main className="project-main evidence-main"><div className="project-heading"><div><p className="project-kicker">SHOW THE WORK</p><h1>{t('看到样本，也看清验证边界。', 'See the sample. Know what was checked.')}</h1><p>{t('这里展示仓库内标准场景的浏览器检查记录。真实项目的效果，需要在项目里继续验证。', 'These are browser checks of standard repository scenarios. Verify the result again in your real project.')}</p></div></div>
    <div className="evidence-boundary"><strong>{t('标准样本 ≠ 用户成功案例', 'Standard samples are not user success stories')}</strong><p>{t('样本的业务文案和数据为虚构内容。自动检查覆盖加载、布局溢出、指定交互与产物一致性；审美判断、任意 AI 的复现质量和生产业务仍需人工复核。', 'Sample copy and data are fictional. Automated checks cover loading, overflow, selected interactions and artifact consistency. Aesthetic judgment, AI reproduction quality and production behavior still need human review.')}</p></div>
    {state === 'loading' && <p role="status" className="evidence-state">{t('正在读取当前构建的检查记录…', 'Loading the checks for this build…')}</p>}
    {state === 'missing' && <div className="evidence-state"><h2>{t('当前构建还没有发布检查记录。', 'No published check record for this build yet.')}</h2><p>{t('仍可查看和比较标准样本。完成浏览器验收后，这里会显示对应版本、截图与检查项。', 'You can still compare the standard samples. After browser validation, the matching build, screenshots and checks appear here.')}</p><Link to="/compare/apple/swiss?mode=content&scene=dashboard" className="project-secondary">{t('打开同内容对比', 'Open shared-content comparison')}<ArrowRight size={14} /></Link></div>}
    {state === 'stale' && <p role="status" className="project-alert">{t('现有记录对应其他构建，已停止展示为当前验证结果。请为当前版本重新验收。', 'The record belongs to another build and is not shown as current evidence. Validate this version again.')}</p>}
    {state === 'ready' && report && <><div className="evidence-run"><div><span>{t('记录时间', 'Recorded')}</span><strong>{new Date(report.generatedAt).toLocaleString(zh ? 'zh-CN' : 'en-GB', { timeZone: 'Asia/Shanghai' })} UTC+8</strong></div><div><span>{t('构建指纹', 'Build fingerprint')}</span><code>{report.buildId.slice(0, 16)}</code></div><div><span>{t('浏览器记录', 'Browser samples')}</span><strong>{report.samples.length}</strong></div><a href={publicUrl('/validation/evidence.json')} download className="project-text-link"><Download size={14} />JSON</a></div><div className="project-options evidence-scenes"><button aria-pressed={scene === 'landing'} onClick={() => setScene('landing')}>{t('产品官网', 'Product page')}</button><button aria-pressed={scene === 'dashboard'} onClick={() => setScene('dashboard')}>{t('工具后台', 'Workspace')}</button></div><div className="evidence-grid">{rows.map(row => { const style = designStyles.find(s => s.id === row.styleId)!; return <article className="evidence-card" key={`${row.styleId}-${row.scene}`}><a href={publicUrl(row.screenshot)} target="_blank" rel="noopener noreferrer"><img src={publicUrl(row.screenshot)} alt={t(`${style.name}手机样本实测截图`, `${style.nameEn} mobile browser capture`)} loading="lazy" /></a><div><p className="project-kicker">390 × 844 / {row.scene.toUpperCase()}</p><h2>{zh ? style.name : style.nameEn}</h2><ul>{sampleLabels(row, language).map(check => <li key={check}><Check size={12} />{check}</li>)}</ul><p className="evidence-source">SHA-256 {row.sourceHash.slice(0, 12)}</p><Link to={`/compare/${row.styleId}/${row.styleId === 'swiss' ? 'apple' : 'swiss'}?mode=content&scene=${row.scene}`}>{t('查看可操作样本', 'Open interactive sample')}<ExternalLink size={12} /></Link></div></article>; })}</div><p className="project-help">{report.browser}</p></>}
    <section className="evidence-next"><h2>{t('记录你自己项目的结果', 'Record your own project outcome')}</h2><p>{t('保留页面目标、改造次数、采用情况和未解决问题。记录只在本机保存，你可以下载后自行分享。', 'Keep the project goal, revision count, adoption decision and unresolved issues. Records stay on this device and can be downloaded for sharing.')}</p><Link to="/project" className="project-primary">{t('打开我的改造方案', 'Open my change plan')}<ArrowRight size={14} /></Link></section>
  </main></div>;
}

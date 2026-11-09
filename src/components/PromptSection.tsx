import { useId, useMemo, useState } from 'react';
import { Check, ChevronDown, Copy, Download, Sparkles } from 'lucide-react';
import { getPromptById, getReproductionPrompt } from '../data/prompts';
import { useDemoSource } from '../hooks/useDemoSource';
import { useAppStore } from '../store/appStore';
import { Link } from 'react-router-dom';
import { recipes } from '../recipes/model';
import { buildProjectFiles } from '../project/brief';
import { useProjectStore } from '../project/store';
import { publicUrl } from '../data/site';

export function PromptSection({ styleId }: { styleId: string }) {
  const { language } = useAppStore();
  const zh = language === 'zh';
  const [mode, setMode] = useState<'style' | 'reference'>('style');
  const [status, setStatus] = useState<'idle' | 'copied' | 'error'>('idle');
  const [expanded, setExpanded] = useState(false);
  const previewId = useId();
  const { source, error } = useDemoSource(styleId);
  const prompt = getPromptById(styleId);
  const recipe = recipes.find(item => item.styles.includes(styleId));
  const brief = useProjectStore(state => state.brief);
  const files = useMemo(() => source ? buildProjectFiles(brief, styleId, language, source) : null, [brief, styleId, language, source]);
  if (!prompt) return null;
  const text = mode === 'reference'
    ? source ? getReproductionPrompt(prompt, language, source) : ''
    : files?.['change-brief.md'] ?? '';
  const copy = async () => {
    try { await navigator.clipboard.writeText(text); setStatus('copied'); }
    catch { setStatus('error'); }
    setTimeout(() => setStatus('idle'), 2200);
  };
  const download = () => {
    const url = URL.createObjectURL(new Blob([text], { type: 'text/markdown;charset=utf-8' }));
    const link = document.createElement('a'); link.href = url; link.download = `${styleId}-${mode}-${language}.md`; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  return (
    <section className="prompt-panel">
      <h3><Sparkles size={15} />{zh ? '用于我的网页' : 'Use for my website'}</h3>
      <Link className="detail-project-cta" to={`/project?style=${styleId}`}>{zh ? '设置改造范围与保留项' : 'Set scope and what stays'}<Sparkles size={13} /></Link>
      {recipe && <Link className="reference-download" to={`/compose?recipe=${recipe.id}`}><Sparkles size={13} />{zh ? '以此为起点，拼一份设计配方' : 'Use this as a starting recipe'}</Link>}
      <div className="prompt-tabs" aria-label={zh ? '提示词类型' : 'Prompt type'}>
        <button aria-pressed={mode === 'style'} onClick={() => { setMode('style'); setStatus('idle'); }}>{zh ? '改造现有页面' : 'Restyle existing page'}</button>
        <button aria-pressed={mode === 'reference'} onClick={() => { setMode('reference'); setStatus('idle'); }}>{zh ? '参考演示制作' : 'Build from this demo'}</button>
      </div>
      <p>{mode === 'reference'
        ? zh ? '包含参考页面、完整变量、构图说明和视觉验收要求。' : 'Includes the reference, full tokens, composition and visual checks.'
        : zh ? '保留你的业务内容，按照风格原则调整布局与视觉。' : 'Keep your content and adapt the layout and visual principles.'}</p>
      <div className="prompt-preview">
        <p>{zh ? '阅读提示词' : 'Read the brief'}</p>
        <pre id={previewId} className={expanded ? 'is-expanded' : 'is-collapsed'}><span>{text || (error ? (zh ? '参考加载失败，请刷新重试。' : 'Reference could not load. Please refresh.') : (zh ? '正在读取参考…' : 'Loading reference…'))}</span></pre>
        {text && <button className="prompt-expand" aria-expanded={expanded} aria-controls={previewId} onClick={() => setExpanded(!expanded)}>
          {expanded ? (zh ? '收起' : 'Show less') : (zh ? '展开全文' : 'Read more')}
          <ChevronDown size={14} />
        </button>}
      </div>
      <div className="prompt-buttons">
        <button className="studio-primary" disabled={!text} onClick={copy}>{status === 'copied' ? <Check size={15} /> : <Copy size={15} />}{status === 'copied' ? (zh ? '已复制' : 'Copied') : (zh ? '复制提示词' : 'Copy brief')}</button>
        <button disabled={!text} onClick={download} aria-label={zh ? '下载参考资料' : 'Download brief'}><Download size={16} /></button>
      </div>
      <a className="reference-download" href={publicUrl(`/demos/${styleId}.html`)} download={`${styleId}.html`}><Download size={13} />{zh ? '下载完整 HTML · 含字体与素材' : 'Download complete HTML · fonts & assets included'}</a>
      <a className="reference-download" href={publicUrl(`/markdown/styles/${styleId}/DESIGN.md`)} download={`${styleId}-DESIGN.md`}><Download size={13} />{zh ? '下载长期设计规范 DESIGN.md' : 'Download lasting DESIGN.md'}</a>
      {status === 'error' && <p role="status">{zh ? '复制失败，可下载参考资料。' : 'Could not copy. Download the brief instead.'}</p>}
    </section>
  );
}

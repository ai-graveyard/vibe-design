import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ArrowLeftRight, Download } from 'lucide-react';
import { designStyles } from '../data/styles';
import { useAppStore, type PreviewDevice } from '../store/appStore';
import { useIsMobile } from '../hooks/useIsMobile';
import { ThemeToggle } from '../components/ThemeToggle';
import { LanguageToggle } from '../components/LanguageToggle';
import { DemoViewport } from '../components/DemoViewport';
import { PreviewToolbar } from '../components/PreviewToolbar';
import { StyleSelect } from '../components/StyleSelect';
import { StyleNotes } from '../components/StyleNotes';
import { usePageMeta } from '../hooks/usePageMeta';
import { useDemoSource } from '../hooks/useDemoSource';
import { demoDevices } from '../lib/demoDevices';
import { isComparisonStyle, renderComparison, supportedComparisonStyles, type ComparisonScene } from '../comparison/render';
import '../comparison/comparison.css';

function ComparisonViewport({ html, title, device, onReady }: { html: string; title: string; device: PreviewDevice; onReady: (frame: HTMLIFrameElement) => void }) {
  const container = useRef<HTMLDivElement>(null);
  const [availableWidth, setAvailableWidth] = useState(0);
  useEffect(() => {
    const element = container.current;
    if (!element) return;
    const observer = new ResizeObserver(() => setAvailableWidth(element.clientWidth));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  const { width, height } = device === 'responsive' ? { width: Math.max(1, Math.round(availableWidth)), height: 800 } : demoDevices[device];
  const scale = availableWidth ? Math.min(1, availableWidth / width) : 0;
  return <div className="demo-viewport comparison-viewport" data-device={device} ref={container}>{scale > 0 && <div className="demo-viewport-page" style={{ width: width * scale, height: height * scale }}><iframe title={title} srcDoc={html} className="demo-viewport-frame" sandbox="allow-scripts allow-same-origin allow-forms" style={{ width, height, transform: `scale(${scale})` }} onLoad={event => onReady(event.currentTarget)} /></div>}</div>;
}

function downloadReference(html: string, name: string) {
  const url = URL.createObjectURL(new Blob([html], { type: 'text/html;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = name;
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function ComparePage() {
  const { idA, idB } = useParams();
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const mode = params.get('mode') === 'original' ? 'original' : 'content';
  const scene: ComparisonScene = params.get('scene') === 'dashboard' ? 'dashboard' : 'landing';
  const { language } = useAppStore();
  const zh = language === 'zh';
  const mobile = useIsMobile();
  const [desktopDevice, setDesktopDevice] = useState<PreviewDevice>('desktop');
  const [mobileDevice, setMobileDevice] = useState<PreviewDevice>('mobile');
  const device = mobile ? mobileDevice : desktopDevice;
  const setDevice = mobile ? setMobileDevice : setDesktopDevice;
  const [sync, setSync] = useState(true);
  const [ready, setReady] = useState(0);
  const frameA = useRef<HTMLIFrameElement | null>(null);
  const frameB = useRef<HTMLIFrameElement | null>(null);
  const onReadyA = useCallback((frame: HTMLIFrameElement) => { frameA.current = frame; setReady(n => n + 1); }, []);
  const onReadyB = useCallback((frame: HTMLIFrameElement) => { frameB.current = frame; setReady(n => n + 1); }, []);
  const a = designStyles.find(style => style.id === idA);
  const b = designStyles.find(style => style.id === idB);
  const sourceA = useDemoSource(idA ?? '');
  const sourceB = useDemoSource(idB ?? '');
  const htmlA = useMemo(() => sourceA.source ? renderComparison({ styleId: idA ?? '', scene, language, source: sourceA.source }) : null, [idA, sourceA.source, scene, language]);
  const htmlB = useMemo(() => sourceB.source ? renderComparison({ styleId: idB ?? '', scene, language, source: sourceB.source }) : null, [idB, sourceB.source, scene, language]);
  usePageMeta(a && b ? `${a.nameEn} / ${b.nameEn} · Vibe Design` : 'Vibe Design');
  useEffect(() => {
    if (!sync) return;
    const first = frameA.current?.contentWindow;
    const second = frameB.current?.contentWindow;
    if (!first || !second) return;
    let active: Window | null = null;
    let release = 0;
    const move = (source: Window, target: Window) => {
      if (active && active !== source) return;
      active = source;
      const max = source.document.documentElement.scrollHeight - source.innerHeight;
      const targetMax = target.document.documentElement.scrollHeight - target.innerHeight;
      target.scrollTo({ top: max > 0 ? (source.scrollY / max) * Math.max(0, targetMax) : 0, behavior: 'instant' });
      clearTimeout(release);
      release = window.setTimeout(() => { active = null; }, 100);
    };
    const fromA = () => move(first, second);
    const fromB = () => move(second, first);
    first.addEventListener('scroll', fromA, { passive: true });
    second.addEventListener('scroll', fromB, { passive: true });
    return () => { clearTimeout(release); first.removeEventListener('scroll', fromA); second.removeEventListener('scroll', fromB); };
  }, [sync, ready, idA, idB, mode, scene, language]);
  if (!a || !b) return <Navigate to="/" replace />;
  const search = params.toString();
  const pick = (side: 'a' | 'b', value: string) => navigate(`/compare/${side === 'a' ? value : a.id}/${side === 'b' ? value : b.id}${search ? `?${search}` : ''}`, { replace: true });
  const updateParam = (key: string, value: string) => setParams(previous => { const next = new URLSearchParams(previous); next.set(key, value); return next; }, { replace: true });
  return (
    <div className="compare-page">
      <header className="compare-header"><Link to="/"><ArrowLeft size={17} /><span>{zh ? '风格库' : 'Library'}</span></Link><h1>{zh ? '同一份内容，看看风格怎么改变表达。' : 'Same content. Different ways to express it.'}</h1><div><LanguageToggle /><ThemeToggle /></div></header>
      <main className="compare-main">
        <div className="comparison-modes" role="group" aria-label={zh ? '对比方式' : 'Comparison mode'}><button aria-pressed={mode === 'content'} onClick={() => updateParam('mode', 'content')}>{zh ? '同内容对比' : 'Same content'}</button><button aria-pressed={mode === 'original'} onClick={() => updateParam('mode', 'original')}>{zh ? '原创演示' : 'Original demos'}</button><p>{mode === 'content' ? (zh ? '固定内容、数据和操作，比较排版、构图及组件状态。' : 'Fixed copy, data and actions. Compare layout, composition and component states.') : (zh ? '保留每个风格的原创主题、内容与交互。' : 'Explore each style’s original subject, content and interactions.')}</p></div>
        {mode === 'content' && <div className="comparison-scenes" role="group" aria-label={zh ? '标准场景' : 'Standard scenario'}><span>{zh ? '标准场景' : 'Scenario'}</span><button aria-pressed={scene === 'landing'} onClick={() => updateParam('scene', 'landing')}>{zh ? '产品官网' : 'Product landing'}</button><button aria-pressed={scene === 'dashboard'} onClick={() => updateParam('scene', 'dashboard')}>{zh ? '工具后台' : 'Dashboard'}</button><small>{zh ? '6 种风格有标准样本，其他风格可看原创演示。' : 'Standard samples cover 6 styles; all other styles have original demos.'}</small></div>}
        <div className="compare-controls"><PreviewToolbar device={device} onDevice={setDevice} language={language} /><label className="sync-control"><input type="checkbox" checked={sync} onChange={event => setSync(event.target.checked)} />{zh ? '同步滚动' : 'Sync scrolling'}</label><button className="swap-button" onClick={() => navigate(`/compare/${b.id}/${a.id}${search ? `?${search}` : ''}`, { replace: true })}><ArrowLeftRight size={16} />{zh ? '交换' : 'Swap'}</button></div>
        <p className="compare-hint">{mode === 'content' ? (zh ? '两侧使用相同视口和同一份样本。可操作表单；工具后台另有搜索、筛选、加载、空状态和错误重试。颜色、字体与核心组件值来自各自演示源码；标准场景的构图是对应风格的新演绎。' : 'Both sides use the same viewport and sample. Try forms; the dashboard also offers search, filters, loading, empty and error states. Colors, fonts and core component values come from each demo’s source; composition is a new interpretation for this scenario.') : (zh ? '两侧使用相同的演示视口。滚动任一画布，按页面进度比较完整作品。不同主题和内容也会影响观感。' : 'Both studies use the same layout viewport. Scroll either canvas to compare each page at the same progress. Subjects and content also influence the result.')}</p>
        <div className="compare-grid">
          {[a, b].map((style, index) => { const source = index === 0 ? sourceA : sourceB; const html = index === 0 ? htmlA : htmlB; return <section key={index} className="compare-study">
            <div className="compare-picker"><span>{index === 0 ? 'A' : 'B'}</span><StyleSelect label={zh ? `风格 ${index === 0 ? 'A' : 'B'}` : `Style ${index === 0 ? 'A' : 'B'}`} value={style.id} onChange={value => pick(index === 0 ? 'a' : 'b', value)} options={designStyles.map(option => ({ value: option.id, label: zh ? option.name : option.nameEn }))} /><Link to={`/style/${style.id}`}>{zh ? '打开' : 'Open'} ↗</Link></div>
            {mode === 'original' ? <DemoViewport key={`original-${style.id}`} styleId={style.id} device={device} onReady={index === 0 ? onReadyA : onReadyB} /> : !isComparisonStyle(style.id) ? <div className="comparison-unavailable"><span>{zh ? '该风格尚无标准场景样本' : 'No standard scenario for this style yet'}</span><p>{zh ? '同内容对比目前支持以下六种风格。你可以切换风格，或查看它的完整原创演示。' : 'Same-content comparisons currently cover the six styles below. Choose one, or explore this style’s full original demo.'}</p><div>{supportedComparisonStyles.map(id => { const supported = designStyles.find(item => item.id === id)!; return <button key={id} onClick={() => pick(index === 0 ? 'a' : 'b', id)}>{zh ? supported.name : supported.nameEn}</button>; })}</div><button className="comparison-original-button" onClick={() => updateParam('mode', 'original')}>{zh ? '切换到原创演示' : 'Switch to original demos'} ↗</button></div> : source.error || (source.source && !html) ? <div className="comparison-unavailable" role="status"><span>{zh ? '参考源码暂时无法载入' : 'Reference source could not be loaded'}</span><p>{zh ? '为避免显示与源码不一致的样本，此处没有生成替代画面。请刷新页面，或查看原创演示。' : 'A matching sample could not be generated from the reference. Reload the page or view the original demo.'}</p><button className="comparison-original-button" onClick={() => updateParam('mode', 'original')}>{zh ? '查看原创演示' : 'View original demo'} ↗</button></div> : html ? <ComparisonViewport key={`content-${style.id}-${scene}-${language}`} html={html} title={`${zh ? style.name : style.nameEn} · ${zh ? (scene === 'landing' ? '同内容产品官网' : '同内容工具后台') : `same-content ${scene}`}`} device={device} onReady={index === 0 ? onReadyA : onReadyB} /> : <div className="comparison-unavailable" role="status">{zh ? '正在载入参考源码…' : 'Loading reference source…'}</div>}
            <div className="comparison-study-actions"><Link className="comparison-use" to={`/project?style=${style.id}`}>{zh ? `用${style.name}改我的网页` : `Use ${style.nameEn} for my page`} ↗</Link>{mode === 'content' && html && <button onClick={() => downloadReference(html, `vibe-design-${style.id}-${scene}-${language}.html`)}><Download size={14} />{zh ? '下载当前参考 HTML' : 'Download reference HTML'}</button>}</div>
            <StyleNotes styleId={style.id} language={language} />
          </section>; })}
        </div>
      </main>
    </div>
  );
}

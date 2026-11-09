import { useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { ArrowLeft, ArrowUpRight, Check, ChevronDown, Copy, Download, FileJson, FolderOpen, Maximize2, Minimize2, Monitor, Moon, Redo2, RotateCcw, Save, SlidersHorizontal, Smartphone, Sun, Tablet, Undo2, Upload, X } from 'lucide-react';
import { createDraft, changeScene, densities, exportRecipe, fonts, importRecipe, layouts, motions, palettes, recipes, resolve, scenes, surfaces, visuals, maxRecipeBytes } from './model.ts';
import type { Draft, Language, Selection } from './model.ts';
import { buildBrief, renderReference } from './render.ts';
import { designFiles, download, zipFiles } from './export.ts';
import { fontCss, licenses, visualAssets } from './assets.ts';
import { prepareImage } from './image.ts';
import { readStorage, writeStorage } from './storage.ts';
import { publicUrl } from '../data/site.ts';
import type { SavedRecipe } from './storage.ts';
import './workbench.css';

const devices = { desktop: { width: 1280, height: 800, icon: Monitor }, tablet: { width: 768, height: 1024, icon: Tablet }, mobile: { width: 390, height: 844, icon: Smartphone } };
function useBox() {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  useEffect(() => { const el = ref.current; if (!el) return; const observer = new ResizeObserver(([entry]) => setSize({ width: entry.contentRect.width, height: entry.contentRect.height })); observer.observe(el); return () => observer.disconnect(); }, []);
  return { ref, ...size };
}
function MiniPreview({ id, lang }: { id: string; lang: Language }) {
  const { ref, width } = useBox();
  const source = useMemo(() => renderReference(createDraft(id), lang, fontCss, '', visualAssets).replace(/<script>[\s\S]*?<\/script>/g, ''), [id, lang]);
  return <div ref={ref} className="r-mini" aria-hidden="true">{width > 0 && <iframe tabIndex={-1} title={id} sandbox="" srcDoc={source} style={{ width: 1280, height: 800, transform: `scale(${width / 1280})` }} />}</div>;
}
function ChoiceGroup({ label, children }: { label: string; children: ReactNode }) {
  return <fieldset className="r-field"><legend>{label}</legend>{children}</fieldset>;
}
interface Props { initialLanguage?: Language; initialTheme?: 'light' | 'dark'; onLanguage?: (language: Language) => void; onTheme?: (theme: 'light' | 'dark') => void; offline?: boolean }
export function Workbench({ initialLanguage = 'zh', initialTheme = 'light', onLanguage, onTheme, offline = false }: Props) {
  const [initial] = useState(readStorage);
  const [history, setHistory] = useState(() => {
    const preset = !offline ? new URLSearchParams(location.search).get('recipe') : null;
    return { past: [] as Draft[], current: preset && recipes.some(r => r.id === preset) ? createDraft(preset) : initial.draft, future: [] as Draft[] };
  });
  const draft = history.current;
  const [saved, setSaved] = useState<SavedRecipe[]>(initial.saved);
  const [language, setLanguage] = useState(initialLanguage);
  const [theme, setTheme] = useState(initialTheme);
  const [storageError, setStorageError] = useState(initial.error);
  const [message, setMessage] = useState('');
  const [imageBusy, setImageBusy] = useState(false);
  const imageInput = useRef<HTMLInputElement>(null), imageJob = useRef(0);
  const [panel, setPanel] = useState<'preview' | 'adjust'>('preview');
  const [device, setDevice] = useState<keyof typeof devices | 'responsive'>(() => innerWidth < 760 ? 'mobile' : 'desktop');
  const [fullscreen, setFullscreen] = useState(false);
  const [dialogType, setDialogType] = useState<'export' | 'saved' | null>(null);
  const [mode, setMode] = useState<'new' | 'modify'>('modify');
  const dialogRef = useRef<HTMLDialogElement>(null), fileInput = useRef<HTMLInputElement>(null), briefRef = useRef<HTMLTextAreaElement>(null), liveFrame = useRef<HTMLIFrameElement>(null);
  const lastEdit = useRef<{ key: string; at: number } | null>(null);
  const [previewInput, setPreviewInput] = useState({ draft, language });
  const preview = useBox();
  const t = (zh: string, en: string) => language === 'zh' ? zh : en;
  const result = useMemo(() => resolve(draft), [draft]);
  const source = useMemo(() => renderReference(previewInput.draft, previewInput.language, fontCss, licenses, visualAssets), [previewInput]);
  const brief = useMemo(() => dialogType === 'export' ? buildBrief(draft, language, mode) : '', [dialogType, draft, language, mode]);
  const dimensions = device === 'responsive' ? { width: Math.max(320, Math.round(preview.width)), height: Math.max(520, Math.round(preview.height)) } : devices[device];
  const scale = preview.width ? Math.min(1, preview.width / dimensions.width, preview.height / dimensions.height) : 0;
  const custom = Object.keys(draft.overrides).length > 0 || !!draft.image;
  const title = draft.name || result.base.name[language];
  const commit = (next: Draft, coalesceKey?: string) => {
    const now = Date.now();
    const coalesce = coalesceKey !== undefined && lastEdit.current?.key === coalesceKey && now - lastEdit.current.at < 800;
    lastEdit.current = coalesceKey ? { key: coalesceKey, at: now } : null;
    setHistory(h => JSON.stringify(h.current) === JSON.stringify(next) ? h : ({
      past: coalesce ? h.past : [...h.past, h.current].slice(-80),
      current: next,
      future: [],
    }));
  };
  const update = <K extends keyof Selection>(key: K, value: Selection[K]) => {
    const overrides = { ...draft.overrides, [key]: value };
    if (result.base.selection[key] === value) delete overrides[key];
    commit({ ...draft, overrides });
  };
  const undo = () => { lastEdit.current = null; setHistory(h => !h.past.length ? h : ({ past: h.past.slice(0, -1), current: h.past[h.past.length - 1], future: [h.current, ...h.future] })); };
  const redo = () => { lastEdit.current = null; setHistory(h => !h.future.length ? h : ({ past: [...h.past, h.current], current: h.future[0], future: h.future.slice(1) })); };
  useEffect(() => {
    const timer = window.setTimeout(() => setPreviewInput({ draft, language }), 200);
    return () => window.clearTimeout(timer);
  }, [draft, language]);
  useEffect(() => {
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
  }, [language]);
  useEffect(() => {
    // Preserve unreadable existing storage until the user explicitly saves or edits.
    if (initial.error && draft === initial.draft && saved === initial.saved) return;
    setStorageError(!writeStorage(draft, saved));
  }, [draft, saved, initial]);
  useEffect(() => {
    if (offline) return;
    const url = new URL(location.href);
    if (recipes.some(recipe => recipe.id === url.searchParams.get('recipe'))) {
      // Treat a detail-page link as a starting action, so reload restores subsequent edits.
      url.searchParams.delete('recipe');
      window.history.replaceState(window.history.state, '', `${url.pathname}${url.search}${url.hash}`);
    }
  }, [offline]);
  useEffect(() => { if (!message) return; const timer = setTimeout(() => setMessage(''), 6500); return () => clearTimeout(timer); }, [message]);
  useEffect(() => { if (dialogType) dialogRef.current?.showModal(); else dialogRef.current?.close(); }, [dialogType]);
  useEffect(() => {
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape' && !dialogRef.current?.open) setFullscreen(false); };
    window.addEventListener('keydown', escape); return () => window.removeEventListener('keydown', escape);
  }, []);
  useEffect(() => {
    const escape = (event: MessageEvent) => {
      if (event.source === liveFrame.current?.contentWindow && event.data?.type === 'vibe-design-recipe-escape') setFullscreen(false);
    };
    window.addEventListener('message', escape); return () => window.removeEventListener('message', escape);
  }, []);
  async function copyBrief() {
    try { await navigator.clipboard.writeText(brief); setMessage(t('设计说明已复制。', 'Design brief copied.')); }
    catch { setMessage(t('自动复制不可用，已选中文本；也可下载 Markdown。', 'Copy unavailable. Select the brief or download Markdown.')); briefRef.current?.focus(); briefRef.current?.select(); }
  }
  function saveCopy() {
    if (saved.length >= 100) { setMessage(t('已保存 100 份，请先导出或删除部分配方。', '100 recipes saved. Export or remove some first.')); return; }
    const named = { ...draft, name: draft.name.trim() || result.base.name[language] };
    const next = [{ id: crypto.randomUUID?.() || `${Date.now()}-${Math.random()}`, file: exportRecipe(named), savedAt: new Date().toISOString() }, ...saved];
    setSaved(next);
    const persisted = writeStorage(draft, next);
    setStorageError(!persisted);
    setMessage(persisted ? t('已另存一份配方。', 'Saved a recipe copy.') : t('本地保存或原始数据备份失败，配方仅保留在本次会话。请下载 JSON 和原始恢复备份后再离开。', 'Saving or preserving the original data failed. This copy remains in this session; download its JSON and any original recovery backup before leaving.'));
  }
  async function addImage(file?: File) {
    if (!file) return;
    const job = ++imageJob.current;
    setImageBusy(true);
    try {
      const image = await prepareImage(file);
      if (job !== imageJob.current) return;
      lastEdit.current = null;
      setHistory(h => ({ past:[...h.past,h.current].slice(-80), current:{...h.current,image,overrides:{...h.current.overrides,visual:'photo'}}, future:[] }));
      setMessage(t('图片已在本机处理，保存与下载会包含这张图。', 'Image processed locally. Saved recipes and downloads include it.'));
    } catch (error) { if (job === imageJob.current) setMessage(error instanceof Error ? error.message : t('图片读取失败。','Could not read image.')); }
    finally { if (job === imageJob.current) setImageBusy(false); if (imageInput.current) imageInput.current.value=''; }
  }
  async function importFile(file?: File) {
    if (!file) return;
    try { if (file.size > maxRecipeBytes) throw new Error(t('配方文件过大。', 'Recipe file is too large.')); const next = importRecipe(await file.text()); commit(next); setMessage(t('配方已导入，可撤销返回。', 'Recipe imported. Undo to go back.')); setDialogType(null); }
    catch (error) { setMessage(`${t('无法导入：', 'Could not import: ')}${error instanceof Error ? error.message : ''}`); }
    finally { if (fileInput.current) fileInput.current.value = ''; }
  }
  function exportPackage() {
    const files = designFiles(draft, language, mode, fontCss, licenses, visualAssets);
    download(zipFiles(files), `${result.base.id}-design-kit.zip`, 'application/zip');
    setMessage(t('设计包已准备好下载。', 'Your design kit is ready to download.'));
  }
  const button = (id: keyof typeof devices, label: string) => {
    const Icon = devices[id].icon;
    return <button key={id} aria-label={label} title={label} aria-pressed={device === id} onClick={() => setDevice(id)}><Icon size={16} /></button>;
  };
  return <div className={`recipe-workbench ${fullscreen ? 'r-is-fullscreen' : ''}`} data-theme={theme} data-panel={panel}>
    <style>{fontCss}</style>
    <header className="r-header">
      <div className="r-identity">{!offline && <a className="r-icon" href={publicUrl('/')} aria-label={t('返回风格库', 'Back to style library')}><ArrowLeft size={17} /></a>}<span className="r-brand-dot" /><span className="r-wordmark">VIBE DESIGN</span><span className="r-divider" /><h1>{t('设计配方', 'Recipe studio')}</h1><span className="r-local"><span />{offline ? t('离线版', 'Offline') : t('本地运行', 'Runs locally')}</span></div>
      <div className="r-header-actions"><button className="r-icon" onClick={() => { const next = language === 'zh' ? 'en' : 'zh'; setLanguage(next); setMessage(''); onLanguage?.(next); }} aria-label={t('Switch to English', '切换为中文')}>{language === 'zh' ? 'EN' : '中'}</button><button className="r-icon" onClick={() => { const next = theme === 'light' ? 'dark' : 'light'; setTheme(next); onTheme?.(next); }} aria-label={t('切换主题', 'Toggle theme')}>{theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}</button><button className="r-icon" onClick={() => setDialogType('saved')} aria-label={t('我的配方', 'My recipes')} title={t('我的配方', 'My recipes')}><FolderOpen size={17} /></button><button className="r-primary" onClick={() => setDialogType('export')}>{t('带走配方', 'Use recipe')}<ArrowUpRight size={16} /></button></div>
    </header>
    <div className="r-mobile-tabs"><button aria-pressed={panel === 'preview'} onClick={() => setPanel('preview')}>{t('预览', 'Preview')}</button><button aria-pressed={panel === 'adjust'} onClick={() => setPanel('adjust')}><SlidersHorizontal size={14} />{t('调整配方', 'Adjust')}</button></div>
    <div className="r-studio">
      <aside className="r-controls" aria-label={t('配方调整', 'Recipe controls')}>
        <div className="r-intro"><span className="r-kicker">MAKE IT YOURS / 01</span><h2>{t('从喜欢的样子开始。', 'Start with a feeling.')}</h2><p>{t('挑一个起点，再调成你的设计。', 'Choose a starting point. Make it yours.')}</p></div>
        <ChoiceGroup label={t('你要做什么', 'What are you making?')}><div className="r-scene-grid">{scenes.map(scene => <button key={scene.id} aria-pressed={result.base.scene === scene.id} onClick={() => { if (result.base.scene === scene.id) return; commit(changeScene(draft, scene.id)); setMessage(t('已切换场景与布局，保留其他调整和本地图片。', 'Scene and layout changed. Your other explicit adjustments were retained.')); }}>{scene[language]}</button>)}</div></ChoiceGroup>
        <ChoiceGroup label={t('选一个起点', 'Choose a starting point')}><div className="r-presets">{recipes.filter(r => r.scene === result.base.scene).map(r => <button key={r.id} className="r-preset" aria-pressed={draft.baseId === r.id} onClick={() => { commit({ ...createDraft(r.id), content: draft.content, image: draft.image }); setMessage(t('已应用配方参数，文案与本地图片保留；可撤销返回。', 'Starting recipe applied. Copy and local image retained; undo to go back.')); }}><MiniPreview id={r.id} lang={language} /><span className="r-preset-name">{r.name[language]}{draft.baseId === r.id && <Check size={13} />}</span></button>)}</div><p className="r-help">{custom ? t('自定义组合 · ', 'Custom composition · ') : ''}{result.base.note[language]}</p></ChoiceGroup>
        <div className="r-section-rule"><span>02 / {t('调整配方', 'THE INGREDIENTS')}</span><button aria-label={t('恢复起点参数', 'Reset ingredients')} onClick={() => { commit({ ...draft, overrides: {} }); setMessage(t('已恢复起点参数，文案保留。', 'Starting ingredients restored; copy retained.')); }} disabled={!custom}><RotateCcw size={13} />{t('重置', 'Reset')}</button></div>
        <ChoiceGroup label={t('布局', 'Layout')}><div className="r-layouts">{layouts.filter(l => l.scene === result.base.scene).map(l => <button key={l.id} aria-pressed={result.selection.layout === l.id} onClick={() => update('layout', l.id)}><span className={`r-layout-art ${l.id}`} aria-hidden="true"><i /><i /><i /></span>{l[language]}</button>)}</div></ChoiceGroup>
        <ChoiceGroup label={t('主视觉', 'Main visual')}><div className="r-visual-options">{visuals.map(v => <button key={v.id} aria-pressed={result.selection.visual === v.id} onClick={() => update('visual',v.id)}><span className={`r-visual-icon ${v.id}`} aria-hidden="true">{{original:'▤',photo:'▧',geometry:'◐',illustration:'✳',type:'Aa',texture:'▒',chart:'↗'}[v.id]}</span>{v[language]}{result.selection.visual === v.id && <Check size={12} />}</button>)}</div><p className="r-help">{result.visual.note[language]}{result.base.scene === 'chat' && t(' 窄屏可点击预览中的“查看参考”。',' On narrow screens, open Show context in the preview.')}</p>
          {result.selection.visual === 'photo' && <div className="r-local-image">
            {draft.image && <img src={draft.image.data} alt={draft.image.alt || t('本地图片预览','Local image preview')} />}
            <button className="r-secondary" disabled={imageBusy} onClick={() => imageInput.current?.click()}><Upload size={14}/>{imageBusy?t('正在处理…','Processing…'):draft.image?t('替换本地图片','Replace local image'):t('使用自己的图片','Use your own image')}</button>
            <p className="r-help">{t('JPG / PNG / WebP，最大 8 MB。仅在本机处理，不上传。','JPG / PNG / WebP, up to 8 MB. Processed locally, never uploaded.')}</p>
            {draft.image && <><label className="r-input-label">{t('图片说明','Image description')}<input value={draft.image.alt} maxLength={200} onChange={e=>commit({...draft,image:{...draft.image!,alt:e.target.value}}, 'image.alt')}/></label><div className="r-segment">{(['cover','contain'] as const).map(fit=><button key={fit} aria-pressed={draft.image?.fit===fit} onClick={()=>commit({...draft,image:{...draft.image!,fit}})}>{fit==='cover'?t('填满画面','Fill frame'):t('完整显示','Show full image')}</button>)}</div><div className="r-segment r-image-position">{(['top','center','bottom'] as const).map((position,i)=><button key={position} aria-pressed={draft.image?.position===position} onClick={()=>commit({...draft,image:{...draft.image!,position}})}>{[t('靠上','Top'),t('居中','Center'),t('靠下','Bottom')][i]}</button>)}</div><button className="r-remove-image" onClick={()=>{imageJob.current++;setImageBusy(false);commit({...draft,image:undefined});}}>{t('移除图片，恢复示例','Remove image, use sample')}</button></>}
          </div>}
          {draft.image && result.selection.visual !== 'photo' && <p className="r-help">{t('本地图片已保留，切回“摄影与影像”即可使用。','Your local image is retained. Switch to Photography to use it.')}</p>}
        </ChoiceGroup>
        <ChoiceGroup label={t('配色', 'Palette')}><div className="r-palettes">{palettes.map(p => <button key={p.id} aria-label={p[language]} aria-pressed={result.selection.palette === p.id} onClick={() => update('palette', p.id)}><span className="r-swatches">{[p.bg, p.surface, p.text, p.accent].map((color, i) => <i key={i} style={{ background: color }} />)}</span><span>{p[language]}</span>{result.selection.palette === p.id && <Check size={12} />}</button>)}</div></ChoiceGroup>
        <ChoiceGroup label={t('字体搭配', 'Typography')}><div className="r-fonts">{fonts.map(f => <button key={f.id} aria-pressed={result.selection.font === f.id} onClick={() => update('font', f.id)}><span style={{ fontFamily: f.heading }}>{language === 'zh' ? f.sample : 'Aa / 012'}</span><span>{f[language]}</span>{result.selection.font === f.id && <Check size={13} />}</button>)}</div><p className="r-help">{t('中文使用本机字体；英文字体已内嵌。', 'Latin fonts embedded. CJK uses local fonts.')}</p></ChoiceGroup>
        <details className="r-more"><summary>{t('更多调整', 'More ingredients')}<ChevronDown size={15} /></summary>
          <ChoiceGroup label={t('密度', 'Density')}><div className="r-segment">{densities.map(d => <button key={d.id} aria-pressed={result.selection.density === d.id} onClick={() => update('density', d.id)}>{d[language]}</button>)}</div></ChoiceGroup>
          <ChoiceGroup label={t('边角与表面', 'Edges & surfaces')}><div className="r-surface-options">{surfaces.map(s => <button key={s.id} aria-pressed={result.selection.surface === s.id} onClick={() => update('surface', s.id)}><i style={{ borderRadius: s.radius, borderWidth: s.border, boxShadow: s.id === 'hard' ? '3px 3px 0 currentColor' : s.shadow }} />{s[language]}</button>)}</div></ChoiceGroup>
          <ChoiceGroup label={t('动效', 'Motion')}><div className="r-segment">{motions.map(m => <button key={m.id} aria-pressed={result.selection.motion === m.id} onClick={() => update('motion', m.id)}>{m[language]}</button>)}</div></ChoiceGroup>
          {result.notices.map((note, i) => <p className="r-notice" key={i}>{note[language]}</p>)}
        </details>
        <details className="r-more"><summary>{t('试试自己的文案', 'Try your own copy')}<ChevronDown size={15} /></summary><p className="r-help">{t('留空使用示例。仅在本机保存，不会上传。', 'Leave blank for sample copy. Stored locally, never uploaded.')}</p>{(['title', 'description', 'action'] as const).map((key, i) => <label className="r-input-label" key={key}>{[t('标题', 'Headline'), t('说明', 'Description'), t('按钮文字', 'Button label')][i]}<textarea rows={key === 'description' ? 3 : 2} maxLength={key === 'description' ? 600 : key === 'title' ? 160 : 60} value={draft.content[key]} onChange={e => commit({ ...draft, content: { ...draft.content, [key]: e.target.value } }, `content.${key}`)} /></label>)}</details>
        <div className="r-controls-footer"><span className="r-brand-dot" />{t('每个选择都在这里发生。零模型调用。', 'Every choice happens here. No model calls.')}</div>
      </aside>
      <section className="r-preview" aria-label={t('设计预览', 'Design preview')}>
        <div className="r-preview-toolbar"><div className="r-device-group" role="group" aria-label={t('预览尺寸', 'Preview size')}>{button('desktop', t('桌面', 'Desktop'))}{button('tablet', t('平板', 'Tablet'))}{button('mobile', t('手机', 'Mobile'))}<button aria-pressed={device === 'responsive'} aria-label={t('自适应', 'Responsive')} title={t('自适应', 'Responsive')} onClick={() => setDevice('responsive')}><Maximize2 size={14} /></button></div><span className="r-dimensions">{dimensions.width} × {dimensions.height} <span>· {Math.round(scale * 100)}%</span></span><div className="r-history"><button aria-label={t('撤销', 'Undo')} title={t('撤销', 'Undo')} disabled={!history.past.length} onClick={undo}><Undo2 size={16} /></button><button aria-label={t('重做', 'Redo')} title={t('重做', 'Redo')} disabled={!history.future.length} onClick={redo}><Redo2 size={16} /></button><button aria-label={fullscreen ? t('退出全屏', 'Exit fullscreen') : t('全屏预览', 'Fullscreen preview')} onClick={() => setFullscreen(!fullscreen)}>{fullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}</button></div></div>
        <div className="r-canvas" ref={preview.ref}>{scale > 0 && <div className="r-frame-holder" style={{ width: dimensions.width * scale, height: dimensions.height * scale }}><iframe ref={liveFrame} className="r-live-frame" title={t('当前配方实时预览', 'Live recipe preview')} sandbox="allow-scripts allow-forms" srcDoc={source} style={{ width: dimensions.width, height: dimensions.height, transform: `scale(${scale})` }} /></div>}</div>
        <div className="r-preview-footer"><div><span className="r-kicker">YOUR RECIPE</span><strong>{title}{custom && <span className="r-custom-tag">{t('已调整', 'Customized')}</span>}</strong><p>{result.layout[language]} · {result.palette[language]} · {result.font[language]}</p></div><button className="r-save" onClick={() => setDialogType('saved')}><Save size={16} />{t('保存配方', 'Save recipe')}</button></div>
      </section>
    </div>
    {(storageError || initial.recoveryBackups.length > 0) && <div className="r-storage-error" role="status"><p>{storageError ? initial.recoveryBackups.length > 0 ? t('部分旧数据无法读取，或本地保存失败。可读配方仍可编辑；请下载当前 JSON，并保留下面的原始恢复备份。备份成功前不会覆盖不可读的原数据。', 'Some saved data could not be read, or local saving failed. Readable recipes remain editable. Download the current JSON and the original recovery backups below. Unreadable originals cannot be overwritten until their backup is preserved.') : t('本地保存不可用。当前编辑仍在本次会话中，请下载 recipe.json 后再离开。', 'Local saving is unavailable. Current edits remain in this session; download recipe.json before leaving.') : t('已保留旧数据的原始恢复备份。可读配方可以继续使用；请下载原始内容以便之后检查。', 'Original recovery backups have been retained. Readable recipes remain available; download the originals for later inspection.')}</p>{initial.recoveryBackups.map((copy, index) => <button className="r-secondary" key={copy.key} onClick={() => { try { download(copy.raw, `${copy.key}.json`, 'application/json'); setMessage(t('原始恢复备份已交给浏览器下载，内容按原样保留。', 'Original recovery backup handed to your browser with its bytes unchanged.')); } catch { setMessage(t('恢复备份未能下载，请保留当前页面并重试。', 'Recovery download could not start. Keep this page open and retry.')); } }}><Download size={13} />{t('下载原始恢复备份', 'Download original recovery backup')}{initial.recoveryBackups.length > 1 ? ` ${index + 1}` : ''}</button>)}</div>}
    <div className={`r-toast ${message ? 'visible' : ''}`} role="status" aria-live="polite">{message}</div>
    <input hidden ref={imageInput} type="file" accept="image/jpeg,image/png,image/webp" aria-label={t('选择本地图片','Choose local image')} onChange={e=>void addImage(e.target.files?.[0])}/>
    <input hidden ref={fileInput} type="file" accept=".json,application/json" aria-label={t('导入配方文件', 'Import recipe file')} onChange={e => void importFile(e.target.files?.[0])} />
    <dialog ref={dialogRef} className="r-dialog" data-theme={theme} onCancel={() => setDialogType(null)} onClose={() => setDialogType(null)} aria-labelledby="recipe-dialog-title">
      <div className="r-dialog-heading"><div><span className="r-kicker">VIBE DESIGN / {dialogType === 'export' ? 'TAKE AWAY' : 'COLLECTION'}</span><h2 id="recipe-dialog-title">{dialogType === 'export' ? t('把这个设计带走。', 'Take this design with you.') : t('留住你的配方。', 'Keep your recipes.')}</h2></div><button className="r-icon" aria-label={t('关闭', 'Close')} onClick={() => setDialogType(null)}><X size={20} /></button></div>
      {dialogType === 'export' ? <>
        <p className="r-dialog-description">{t('把说明和参考交给自己的编程工具，继续完成你的项目。', 'Give the brief and reference to your coding tool to continue your project.')}</p>
        <div className="r-segment r-export-mode">{(['modify', 'new'] as const).map(m => <button key={m} aria-pressed={mode === m} onClick={() => setMode(m)}>{m === 'modify' ? t('修改现有界面', 'Modify existing') : t('新建界面', 'Create new')}</button>)}</div>
        <textarea className="r-brief" ref={briefRef} readOnly value={brief} aria-label={t('设计说明', 'Design brief')} />
        <div className="r-export-actions"><button className="r-primary" onClick={() => void copyBrief()}><Copy size={16} />{t('复制设计说明', 'Copy brief')}</button><button className="r-secondary" onClick={exportPackage}><Download size={16} />{t('下载设计包', 'Download kit')}</button></div>
        <p className="r-help">{t('设计包含执行说明、DESIGN.md、SKILL.md、JSON 配方、CSS 参数、独立 HTML、校验清单和素材许可。', 'Kit includes the brief, DESIGN.md, SKILL.md, JSON recipe, CSS tokens, standalone HTML, checksums and licenses.')}</p>
        <div className="r-file-links"><button onClick={() => download(brief, 'design-brief.md', 'text/markdown;charset=utf-8')}>Markdown ↓</button><button onClick={() => download(exportRecipe(draft), 'recipe.json', 'application/json')}>recipe.json ↓</button><button onClick={() => download(renderReference(draft, language, fontCss, licenses, visualAssets), 'reference.html', 'text/html;charset=utf-8')}>reference.html ↓</button></div>
        {!offline && <a className="r-offline-link" href={publicUrl('/vibe-design-offline.html')} download><Download size={15} /><span>{t('下载整个离线工作台', 'Download the offline workbench')}<small>{t('以后断网，也能继续选配方。', 'Keep composing, even without a connection.')}</small></span><ArrowUpRight size={16} /></a>}
      </> : <>
        <p className="r-dialog-description">{t('只保存在这台设备。下载 JSON 可以备份或换设备继续。', 'Saved on this device only. Download JSON to back up or move devices.')}</p>
        <label className="r-input-label">{t('配方名称', 'Recipe name')}<input maxLength={80} value={draft.name} placeholder={result.base.name[language]} onChange={e => commit({ ...draft, name: e.target.value }, 'name')} /></label>
        <div className="r-export-actions"><button className="r-primary" onClick={saveCopy}><Save size={16} />{t('另存一份', 'Save a copy')}</button><button className="r-secondary" onClick={() => fileInput.current?.click()}><Upload size={16} />{t('导入 JSON', 'Import JSON')}</button><button className="r-icon" aria-label={t('下载配方 JSON', 'Download recipe JSON')} title={t('下载配方 JSON', 'Download recipe JSON')} onClick={() => download(exportRecipe(draft), 'recipe.json', 'application/json')}><FileJson size={18} /></button></div>
        <div className="r-saved-list">{saved.length === 0 ? <p className="r-empty-saved">{t('还没有收藏。给现在的设计留个位置。', 'No saved recipes yet. Keep this one for later.')}</p> : saved.map(item => { const recipe = importRecipe(item.file), base = resolve(recipe); return <div className="r-saved-row" key={item.id}><span className="r-saved-swatch" style={{ '--swatch': base.palette.accent, background: base.palette.bg } as CSSProperties} /><button onClick={() => { commit(recipe); setDialogType(null); setMessage(t('已打开收藏，可撤销返回。', 'Saved recipe opened. Undo to go back.')); }}><strong>{recipe.name || base.base.name[language]}</strong><small>{scenes.find(scene => scene.id === base.base.scene)![language]} · {item.savedAt ? new Date(item.savedAt).toLocaleDateString(language === 'zh' ? 'zh-CN' : 'en-US') : t('原日期未知', 'Original date unknown')}</small></button><button className="r-icon" aria-label={`${t('下载', 'Download')} ${recipe.name}`} onClick={() => download(item.file, `${base.base.id}.json`, 'application/json')}><Download size={16} /></button><button className="r-icon" aria-label={`${t('删除', 'Remove')} ${recipe.name}`} onClick={() => { setSaved(s => s.filter(entry => entry.id !== item.id)); setMessage(t('已移除这份本地收藏，当前设计仍保留。', 'Removed the saved copy. Your current design is retained.')); }}><X size={16} /></button></div>; })}</div>
      </>}
      {message && <p className="r-dialog-status" role="status">{message}</p>}
    </dialog>
  </div>;
}

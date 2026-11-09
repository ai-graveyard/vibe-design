import { kindNames, styleSpecs } from '../data/styleSpecs';
import { Copy, Check, ArrowUpRight, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { DesignStyle, StyleId } from '../data/styles';
import { DemoPreview } from './DemoPreview';
import { useState } from 'react';
import { useAppStore } from '../store/appStore';
import { translations } from '../data/translations';
import { useProjectStore } from '../project/store';

interface StyleCardProps {
  style: DesignStyle<StyleId>;
}

export function StyleCard({ style }: StyleCardProps) {
  const { language } = useAppStore();
  const t = translations[language];
  const [copyError, setCopyError] = useState(false);
  const [copied, setCopied] = useState<'simple' | 'full' | null>(null);
  const { shortlist, toggleCandidate } = useProjectStore();

  const handleCopyPrompt = async (e: React.MouseEvent, type: 'simple' | 'full') => {
    // 阻止外层 Link 的默认跳转
    e.preventDefault();
    e.stopPropagation();
    // prompts 数据（~40KB 源码）点击时才动态加载，不进首页主包；
    // styles/prompts/demos 三处 id 对齐由构建期 validate-demos.mjs 保证
    setCopyError(false);
    try {
    const { getPromptById, getFullPromptText } = await import('../data/prompts');
    const promptData = getPromptById(style.id);
    if (!promptData) return;
    const textToCopy = type === 'full'
      ? (await import('../project/brief')).buildProjectFiles(useProjectStore.getState().brief, style.id, language, await (await import('../lib/demoSource')).loadDemoSource(style.id))['change-brief.md']
      : getFullPromptText(promptData, language);
    await navigator.clipboard.writeText(textToCopy);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
    } catch { setCopyError(true); }
  };

  return (
    <article
      className="style-card group block rounded-xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:border-[#FF9F1C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9F1C] focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50 bg-white border-gray-200 hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.15)] dark:bg-[#1a1a1a] dark:border-gray-800 dark:hover:border-[#FF9F1C] dark:hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.6)] dark:focus-visible:ring-offset-[#0f0f0f]"
    >
        {/* 真实 demo 的缩放预览 */}
        <Link to={`/style/${style.id}`} aria-label={language === 'zh' ? `查看${style.name}演示` : `View ${style.nameEn} study`} className="block relative aspect-[16/10] overflow-hidden border-b bg-gray-50 border-gray-100 dark:bg-[#0a0a0a] dark:border-gray-800">
          <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.02]">
            <DemoPreview styleId={style.id} placeholderColor={style.colors[0]} thumbnail />
          </div>

          {/* Rating Badge */}
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-white/95 backdrop-blur-sm rounded-md shadow-sm">
            <span className="text-xs font-bold text-black tabular-nums">{kindNames[styleSpecs[style.id].kind][language]}</span>
          </div>

          {/* Hover Hint */}
          <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1.5 bg-black/80 backdrop-blur-sm rounded-md opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
            <span className="text-[10px] uppercase tracking-wider text-white">{t.card.viewDetail}</span>
            <ArrowUpRight className="w-3 h-3 text-[#FF9F1C]" />
          </div>
        </Link>

        {/* Info */}
        <div className="p-4 sm:p-5">
          {/* Title */}
          <div className="mb-3">
            <h3 className="font-bold text-base sm:text-lg mb-0.5 transition-colors group-hover:text-[#FF9F1C] text-black dark:text-white">
              <Link to={`/style/${style.id}`}>{language === 'zh' ? style.name : style.nameEn}</Link>
            </h3>
            <p className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500">
              {style.nameEn}
            </p>
          </div>

          {/* Description */}
          <p className="text-xs leading-relaxed mb-3 line-clamp-2 text-gray-600 dark:text-gray-400">
            {styleSpecs[style.id].composition[language]}
          </p>

          <p className="text-[11px] leading-relaxed mb-4 line-clamp-2 text-gray-500 dark:text-gray-400">{styleSpecs[style.id].signature[language]}</p>
          <button type="button" className="candidate-button" disabled={!shortlist.includes(style.id) && shortlist.length >= 3} aria-pressed={shortlist.includes(style.id)} onClick={() => toggleCandidate(style.id)}>{shortlist.includes(style.id) ? <Check size={13} /> : <Plus size={13} />}{shortlist.includes(style.id) ? (language === 'zh' ? '已留作候选' : 'Shortlisted') : (language === 'zh' ? '留作候选' : 'Shortlist')}</button>
          {copyError && <p role="status" className="text-xs text-amber-700 mb-3">{language === 'zh' ? '复制暂不可用，请进入详情下载参考资料。' : 'Could not copy. Open the study to download the brief.'}</p>}

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {(language === 'zh' ? style.tags : style.tagsEn).slice(0, 3).map((tag, i) => (
              <span
                key={i}
                className={`px-2 py-0.5 text-[10px] uppercase tracking-wider rounded ${
                  i === 0
                    ? 'bg-action text-action-foreground'
                    : 'bg-black text-white'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-800">
            <Link className="card-project-link" to={`/project?style=${style.id}`}>{language === 'zh' ? '用于我的网页' : 'Use for my site'}<ArrowUpRight size={13} /></Link>
            <div className="flex items-center gap-1.5">
              <button
                onClick={(e) => handleCopyPrompt(e, 'full')}
                type="button"
                aria-label={language === 'zh' ? '复制改造说明' : 'Copy restyle brief'}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 text-[10px] uppercase tracking-wider rounded transition-all active:scale-95 ${
                  copied === 'full'
                    ? 'bg-green-500 text-white'
                    : 'bg-action text-action-foreground hover:bg-action-hover active:bg-action-active'
                }`}
              >
                {copied === 'full' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copied === 'full' ? t.card.copied : (language === 'zh' ? '复制改造说明' : 'Copy restyle brief')}
              </button>
            </div>
          </div>
        </div>
    </article>
  );
}

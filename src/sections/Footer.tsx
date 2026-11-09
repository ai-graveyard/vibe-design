import { useAppStore } from '../store/appStore';
import { translations } from '../data/translations';
import { designStyles } from '../data/styles';
import { useInView } from '../hooks/useInView';
import { Link } from 'react-router-dom';
import { publicUrl } from '../data/site';

export function Footer() {
  const { language } = useAppStore();
  const t = translations[language];
  const [watermarkRef, watermarkInView] = useInView<HTMLDivElement>();

  return (
    <footer className="site-footer w-full border-t px-4 sm:px-6 lg:px-8 py-6 transition-colors duration-300 bg-white border-gray-200 dark:bg-[#0f0f0f] dark:border-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-[#FF9F1C]" />
            <span className="text-sm font-bold tracking-wider text-black dark:text-white">
              DV
            </span>
            <span className="hidden sm:inline text-[10px] uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
              VIBE DESIGN
            </span>
          </div>

          {/* Quote */}
          <div className="text-center text-[10px] sm:text-[11px] uppercase tracking-[0.15em] text-gray-400 dark:text-gray-500">
            {t.footer.quote}
            <span className="text-[#FF9F1C] ml-2">{t.footer.quoteAuthor}</span>
          </div>

          {/* Stats & Links */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-[#FF9F1C] tabular-nums">{designStyles.length}</span>
              <span className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500">
                {t.footer.stats}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Links */}
        <div className="mt-4 pt-4 border-t flex flex-wrap items-center justify-center gap-3 text-[10px] uppercase tracking-wider border-gray-200 text-gray-400 dark:border-gray-800 dark:text-gray-500">
          <Link to="/project" className="hover:text-[#FF9F1C] transition-colors">{language === 'zh' ? '我的改造方案' : 'My change plan'}</Link>
          <span className="text-[#FF9F1C]">/</span>
          <Link to="/cases" className="hover:text-[#FF9F1C] transition-colors">{language === 'zh' ? '验证样本' : 'Evidence'}</Link>
          <span className="text-[#FF9F1C]">/</span>
          <a href={publicUrl('/llms.txt')} className="hover:text-[#FF9F1C] transition-colors">{language === 'zh' ? '给 AI 的索引' : 'For AI agents'}</a>
        </div>
      </div>

      {/* 巨型水印字：整站唯一一处「放大」的排版签名，3% 不透明度的中性色，
          下缘被 footer 底边裁掉（.footer-watermark 基础态 translateY(30%)）。
          负 margin 抵掉 footer 自身的 px/pb，让裁切线正好落在页面底边；
          overflow-clip（不是 hidden）的原因见 index.css .footer-watermark 注释 */}
      <div
        ref={watermarkRef}
        aria-hidden="true"
        className="footer-watermark-clip -mx-4 sm:-mx-6 lg:-mx-8 -mb-6 mt-5"
      >
        <div
          className={`footer-watermark text-center font-black leading-[0.75] tracking-[0.02em] whitespace-nowrap select-none text-black/[0.03] dark:text-white/[0.045] ${
            watermarkInView ? 'animate-watermark-rise' : 'opacity-0'
          }`}
        >
          VIBE DESIGN
        </div>
      </div>
    </footer>
  );
}

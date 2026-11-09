import { Workbench } from '../recipes/Workbench';
import { useAppStore } from '../store/appStore';
import { usePageMeta } from '../hooks/usePageMeta';
export function RecipePage() {
  const { language, theme, setLanguage, setTheme } = useAppStore();
  usePageMeta(language === 'zh' ? '设计配方 · Vibe Design' : 'Recipe studio · Vibe Design', language === 'zh' ? '挑选布局、配色和字体，组合你的设计。全部在本地运行，可离线使用。' : 'Compose layouts, colors and typography. Runs locally and works offline.');
  return <Workbench initialLanguage={language} initialTheme={theme} onLanguage={setLanguage} onTheme={setTheme} />;
}

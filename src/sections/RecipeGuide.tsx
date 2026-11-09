import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { recipes, scenes } from '../recipes/model';
import { useAppStore } from '../store/appStore';
import { publicUrl } from '../data/site';

/** A single, fully clickable introduction in the hero, before its scroll-snap boundary. */
export function RecipeGuide() {
  const { language } = useAppStore();
  const zh = language === 'zh';
  return (
    <Link to="/compose" className="recipe-guide" aria-label={zh ? '开始拼配方：选择场景，组合自己的设计' : 'Start a recipe: choose a scene and compose your design'}>
      <div className="recipe-guide-kicker"><span>DESIGN RECIPE STUDIO</span><span>{zh ? `${scenes.length} 类场景 · ${recipes.length} 份配方` : `${scenes.length} scenes · ${recipes.length} recipes`}</span></div>
      <h3>{zh ? '拼配方，' : 'Mix a recipe.'}<br /><span>{zh ? '设计自己定。' : 'Make it yours.'}</span></h3>
      <p>{zh ? '选布局、配色和字体，边搭配边看效果。把喜欢的设计，带进自己的项目。' : 'Choose a layout, palette and typography. See them come together, then take the design into your project.'}</p>
      <div className="recipe-guide-previews" aria-hidden="true">
        {[['atelier-index', zh ? '作品集' : 'Portfolio'], ['slow-journal', zh ? '博客杂志' : 'Journal'], ['open-dialogue', zh ? '聊天应用' : 'Conversation']].map(([id, label]) => (
          <div key={id}><img src={publicUrl(`/recipe-previews/${id}.webp`)} alt="" width="480" height="300" decoding="async" /><span>{label}</span></div>
        ))}
      </div>
      <div className="recipe-guide-steps" aria-hidden="true">
        <span><b>01</b>{zh ? '选场景' : 'Choose'}</span><ArrowRight size={11} /><span><b>02</b>{zh ? '搭配设计' : 'Compose'}</span><ArrowRight size={11} /><span><b>03</b>{zh ? '带走配方' : 'Take away'}</span>
      </div>
      <div className="recipe-guide-action"><span>{zh ? '开始拼配方' : 'Start your recipe'}<ArrowUpRight size={18} /></span><small>{zh ? '无需登录 · 可离线使用' : 'No sign-in · Works offline'}</small></div>
    </Link>
  );
}

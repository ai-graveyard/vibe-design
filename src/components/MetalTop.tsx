import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { useAppStore } from '../store/appStore';
import type { TopScene } from '../lib/metalTopScene';
import './metal-top.css';

function shouldDeferTop() {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches || connection?.saveData === true;
}

export function MetalTop() {
  const zh = useAppStore(state => state.language) === 'zh';
  const host = useRef<HTMLDivElement>(null);
  const scene = useRef<TopScene | null>(null);
  const [ready, setReady] = useState(false);
  const [deferred] = useState(shouldDeferTop);
  const [paused, setPaused] = useState(deferred);
  const [activated, setActivated] = useState(!deferred);
  const pausedRef = useRef(paused);

  useEffect(() => {
    if (!activated) return;
    let disposed = false;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const reduce = () => { if (media.matches) setPaused(true); };
    media.addEventListener('change', reduce);
    const timer = window.setTimeout(() => {
      import('../lib/metalTopScene').then(({ createTopScene }) => {
        if (disposed || !host.current) return;
        scene.current = createTopScene(host.current, () => setReady(false));
        if (scene.current) {
          scene.current.setPaused(pausedRef.current);
          setReady(true);
        }
      }).catch(() => { /* Keep the inline illustration if WebGL is unavailable. */ });
    }, 200);
    return () => {
      disposed = true;
      window.clearTimeout(timer);
      media.removeEventListener('change', reduce);
      scene.current?.dispose();
      scene.current = null;
    };
  }, [activated]);

  useEffect(() => {
    pausedRef.current = paused;
    scene.current?.setPaused(paused);
  }, [paused]);

  return (
    <figure className="metal-top" aria-label={zh ? '金属陀螺设计演示' : 'Metal spinning top design study'}>
      <div className="metal-top-kicker"><span />DESIGN IN MOTION <span className="metal-top-edition">N° 001</span></div>
      <div className="metal-top-stage" ref={host} tabIndex={ready ? 0 : undefined} role="group"
        aria-label={zh ? '3D 金属陀螺，左右拖动或使用方向键转动' : '3D metal top. Drag horizontally or use arrow keys to rotate.'}
        onKeyDown={event => {
          if (ready && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
            event.preventDefault();
            scene.current?.turn(event.key === 'ArrowLeft' ? -0.25 : 0.25);
          }
        }}>
        {!ready && <svg className="metal-top-poster" viewBox="0 0 480 330" aria-hidden="true">
          <defs>
            <linearGradient id="top-metal"><stop stopColor="#363d43" /><stop offset=".24" stopColor="#fafafa" /><stop offset=".46" stopColor="#777f84" /><stop offset=".65" stopColor="#e9eef1" /><stop offset="1" stopColor="#343a3d" /></linearGradient>
            <radialGradient id="top-shadow"><stop stopColor="#383025" stopOpacity=".22" /><stop offset="1" stopColor="#383025" stopOpacity="0" /></radialGradient>
          </defs>
          <ellipse cx="245" cy="286" rx="105" ry="22" fill="url(#top-shadow)" />
          <g transform="rotate(-14 240 265)">
            <path d="M122 165 Q240 115 358 165 Q340 197 260 239 L243 276 Q239 283 235 274 L219 238 Q140 197 122 165Z" fill="url(#top-metal)" />
            <ellipse cx="240" cy="160" rx="118" ry="39" fill="url(#top-metal)" stroke="#bfc4c6" />
            <ellipse cx="240" cy="164" rx="117" ry="38" fill="none" stroke="#ff9f1c" strokeWidth="3" />
            <path d="M229 79 Q240 72 251 79 L251 151 Q241 158 229 151Z" fill="url(#top-metal)" />
            <ellipse cx="240" cy="79" rx="11" ry="4" fill="#e9ecee" />
          </g>
        </svg>}
      </div>
      <figcaption className="metal-top-caption">
        <span>{zh ? '一点灵感，自成一面。' : 'A little spin. A different perspective.'}</span>
        {(ready || paused) && <div className="metal-top-controls">
          <span>{ready ? (zh ? '拖动探索' : 'Drag to explore') : (zh ? '按需加载 3D' : 'Load 3D on demand')}</span>
          <button type="button" onClick={() => {
            if (paused) {
              setActivated(true);
              setPaused(false);
            } else {
              setPaused(true);
            }
          }}
            aria-label={paused ? (zh ? '播放陀螺动画' : 'Play top animation') : (zh ? '暂停陀螺动画' : 'Pause top animation')}
            title={paused ? (zh ? '播放' : 'Play') : (zh ? '暂停' : 'Pause')}>
            {paused ? <Play size={12} /> : <Pause size={12} />}
          </button>
        </div>}
      </figcaption>
    </figure>
  );
}

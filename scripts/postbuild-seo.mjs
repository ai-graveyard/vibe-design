#!/usr/bin/env node
// 构建后 SEO 处理：为每个 /style/:id 生成带独立 title/description/og/canonical 的静态 HTML 壳
// （同时让 nginx 直接访问详情页 URL 时有真实文件可回，不再依赖 SPA fallback），
// 并生成 sitemap.xml 与 robots.txt。通过 Node 的 TS 支持读取风格数据，无需开发服务器。
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { readdirSync } from 'node:fs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const { SITE_URL } = await import('../src/data/site.ts');
const SITE = SITE_URL;

const distIndex = path.join(root, 'dist/index.html');
if (!existsSync(distIndex)) {
  console.error('✗ dist/index.html 不存在，请先执行 vite build');
  process.exit(1);
}

const { designStyles } = await import('../src/data/styles.ts');

const template = readFileSync(distIndex, 'utf8');
const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function pageHtml({ title, description, url, image }) {
  let html = template;
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`);
  html = html.replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(description)}$2`);
  html = html.replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(title)}$2`);
  html = html.replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${esc(description)}$2`);
  const extra = [
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:url" content="${url}" />`,
    image ? `<meta property="og:image" content="${image}" />` : '',
    `<meta name="twitter:card" content="${image ? 'summary_large_image' : 'summary'}" />`,
  ]
    .filter(Boolean)
    .join('\n    ');
  return html.replace('</head>', `  ${extra}\n  </head>`);
}

const ogPath = (id) =>
  existsSync(path.join(root, `dist/og/${id}.jpg`)) ? `${SITE}/og/${id}.jpg` : undefined;

// 首页（覆写 dist/index.html，标题与描述保持原值，补 canonical/og:url/og:image）
const homeTitle = /<title>([^<]*)<\/title>/.exec(template)[1];
const homeDesc = /<meta name="description" content="([^"]*)"/.exec(template)[1];
writeFileSync(
  distIndex,
  pageHtml({ title: homeTitle, description: homeDesc, url: `${SITE}/`, image: ogPath('home') })
);

// 各风格详情页静态壳
for (const s of designStyles) {
  const dir = path.join(root, 'dist/style', s.id);
  mkdirSync(dir, { recursive: true });
  const title =
    s.name === s.nameEn ? `${s.nameEn} · Vibe Design` : `${s.name} ${s.nameEn} · Vibe Design`;
  writeFileSync(
    path.join(dir, 'index.html'),
    pageHtml({
      title,
      description: s.description.slice(0, 155),
      url: `${SITE}/style/${s.id}`,
      image: ogPath(s.id),
    })
  );
}

// sitemap.xml + robots.txt
mkdirSync(path.join(root, 'dist/compose'), { recursive: true });
writeFileSync(path.join(root, 'dist/compose/index.html'), pageHtml({ title: '设计配方 · Vibe Design', description: '挑选布局、配色和字体，组合你的设计。全部在本地运行，可离线使用。', url: `${SITE}/compose` }));
for (const [route,title,description] of [['project','为我的网页选风格 · Vibe Design','明确目标和保留项，获取推荐、项目设计规范与可检查的改造方案。'],['cases','验证样本与边界 · Vibe Design','查看当前构建的标准场景、浏览器检查记录与验证边界。']]) {
  mkdirSync(path.join(root, 'dist', route), { recursive: true });
  writeFileSync(path.join(root, 'dist', route, 'index.html'), pageHtml({ title, description, url: `${SITE}/${route}` }));
}
const urls = [`${SITE}/`, `${SITE}/compose`, `${SITE}/project`, `${SITE}/cases`, ...designStyles.map((s) => `${SITE}/style/${s.id}`)];
writeFileSync(
  path.join(root, 'dist/sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((u) => `  <url><loc>${u}</loc></url>`)
    .join('\n')}\n</urlset>\n`
);
writeFileSync(path.join(root, 'dist/robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);

// Include standalone demos and machine-readable documents as well as JS/CSS.
// A source-only demo change must invalidate previous browser evidence too.
const buildHash = createHash('sha256');
function fingerprintFiles(relative = '') {
  return readdirSync(path.join(root,'dist',relative),{withFileTypes:true}).flatMap(entry => {
    const name = relative ? `${relative}/${entry.name}` : entry.name;
    if (name === 'validation' || name === 'build-id.json' || name === 'vibe-design-skill.tar.gz') return [];
    return entry.isDirectory() ? fingerprintFiles(name) : [name];
  });
}
for (const name of fingerprintFiles().sort()) { buildHash.update(name); buildHash.update(readFileSync(path.join(root,'dist',name))); }
writeFileSync(path.join(root,'dist/build-id.json'), JSON.stringify({schemaVersion:1,id:buildHash.digest('hex')})+'\n');

console.log(`✓ SEO 产物已生成：${designStyles.length} 个风格页静态壳 + sitemap.xml + robots.txt`);

import { preview } from 'vite';
import { mkdirSync, writeFileSync, readFileSync, existsSync, readdirSync, rmSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';
import assert from 'node:assert/strict';
import { openChrome } from './lib/chrome.mjs';
import { recipes, createDraft, resolve, exportRecipe, importRecipe, scenes, layouts, visuals } from '../src/recipes/model.ts';
import { renderReference } from '../src/recipes/render.ts';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(root, 'output/recipes'); mkdirSync(output, { recursive: true });
const downloads = path.join(output, 'downloads'); rmSync(downloads,{recursive:true,force:true}); mkdirSync(downloads, { recursive: true });
const fonts = JSON.parse(readFileSync(path.join(root, 'assets/fonts/manifest.json'))).filter(f => f.file !== 'roboto.woff2');
const fontCss = fonts.map(f => f.css.replace(`'${f.family}'`, `'Recipe ${f.family === 'Inter' ? 'Inter' : 'Serif'}'`).replace(/url\([^)]+\)/, `url(data:font/woff2;base64,${readFileSync(path.join(root, 'assets/fonts', f.file)).toString('base64')})`)).join('\n');
const visualAssets = {photo:'data:image/webp;base64,'+readFileSync(path.join(root,'assets/demo-media/night-train.webp')).toString('base64'),product:'data:image/webp;base64,'+readFileSync(path.join(root,'assets/demo-media/headphones.webp')).toString('base64')};
const readBuildId = () => {
  const build = JSON.parse(readFileSync(path.join(root, 'dist/build-id.json'), 'utf8'));
  assert.ok(build.schemaVersion === 1 && /^[a-f0-9]{64}$/.test(build.id), 'Current production build has a valid fingerprint');
  return build.id;
};
const buildId = readBuildId();
const report = { schemaVersion: 1, buildId, status: 'testing', generatedAt: new Date().toISOString(), references: [], interactions: {}, workbench: {}, network: {} };
// Vite may emit a server error before preview() yields a server handle.
// Persist its failure without intercepting Node's normal non-zero termination.
const recordUnexpectedFailure = error => {
  report.status = 'failed';
  report.generatedAt = new Date().toISOString();
  report.failure ??= { message: String(error) };
  writeFileSync(path.join(output, 'report.json'), JSON.stringify(report, null, 2));
};
process.on('uncaughtExceptionMonitor', recordUnexpectedFailure);
writeFileSync(path.join(output, 'report.json'), JSON.stringify(report, null, 2));
let browser, server;
try {
  server = await preview({ root, preview: { host: '127.0.0.1', port: 0 }, logLevel: 'error' });
  browser = await openChrome();
  const base = server.resolvedUrls.local[0].replace(/\/$/, '');
  const wait = async (expression, timeout = 15000) => {
    const until = Date.now() + timeout;
    while (Date.now() < until) { if (await browser.evaluate(`Boolean(${expression})`).catch(() => false)) return; await new Promise(r => setTimeout(r, 60)); }
    throw new Error(`Timed out: ${expression}`);
  };
  const click = async selector => { await browser.evaluate(`document.querySelector(${JSON.stringify(selector)}).click()`); await browser.evaluate('new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))'); };
  const fill = async (selector, value) => {
    await browser.evaluate(`(()=>{const el=document.querySelector(${JSON.stringify(selector)});Object.getOwnPropertyDescriptor(el.tagName==='TEXTAREA'?HTMLTextAreaElement.prototype:HTMLInputElement.prototype,'value').set.call(el,${JSON.stringify(value)});el.dispatchEvent(new Event('input',{bubbles:true}));})()`);
    await browser.evaluate('new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))');
  };
  // Render each curated recipe in both languages at all documented acceptance widths.
  for (const recipe of recipes) for (const lang of ['zh', 'en']) {
    const draft = createDraft(recipe.id), file = path.join(output, `${recipe.id}-${lang}.html`);
    writeFileSync(file, renderReference(draft, lang, fontCss, '', visualAssets));
    for (const [width, height] of [[390,844],[768,1024],[1280,800],[1440,900]]) {
      await browser.viewport(width, height); await browser.navigate(pathToFileURL(file).href);
      const facts = await browser.evaluate(`({overflow:document.documentElement.scrollWidth>innerWidth,heading:document.querySelector('h1').textContent,fonts:document.fonts.status,accent:getComputedStyle(document.documentElement).getPropertyValue('--accent').trim(),targets:[...document.querySelectorAll('button,input')].filter(x=>x.getClientRects().length).every(x=>x.getBoundingClientRect().height>=43.9)})`);
      assert.equal(facts.overflow, false, `${recipe.id} ${lang} ${width}: overflow`); assert.equal(facts.fonts, 'loaded'); assert.equal(facts.accent, resolve(draft).palette.accent); assert.ok(facts.targets); assert.equal(browser.errors.length, 0, browser.errors.join('\n'));
      if (lang === 'zh' && (width === 1280 || width === 390)) await browser.screenshot(path.join(output, `${recipe.id}-${width}.png`));
      report.references.push({ recipe: recipe.id, lang, width, ...facts });
    }
  }
  // Each visual ingredient must also render in every layout at the narrow breakpoint.
  report.visualVariants = [];
  for (const layout of layouts) for (const ingredient of visuals) {
    const draft=createDraft(recipes.find(r=>r.scene===layout.scene).id);
    draft.overrides={layout:layout.id,visual:ingredient.id};
    const file=path.join(output,`ingredient-${layout.id}-${ingredient.id}.html`);
    writeFileSync(file,renderReference(draft,'en',fontCss,'',visualAssets));
    await browser.viewport(390,844);await browser.navigate(pathToFileURL(file).href);
    assert.equal(await browser.evaluate('document.documentElement.scrollWidth>innerWidth'),false,`${layout.id}/${ingredient.id}`);
    assert.equal(browser.errors.length,0,browser.errors.join('\n'));
    assert.ok(await browser.evaluate("[...document.images].every(i=>i.complete&&i.naturalWidth>0)"));
    report.visualVariants.push({layout:layout.id,visual:ingredient.id,width:390});
  }
  // Pressure cases cross font, surface, density and layout boundaries with long literal copy.
  for (const {id:scene} of scenes) for (const {id:layout} of layouts.filter(l=>l.scene===scene)) {
    const draft = createDraft(recipes.find(r => r.scene === scene).id);
    draft.overrides = { layout, font: 'technical', density: 'compact', surface: 'hard', palette: 'ink', motion: 'light' };
    draft.content.title = 'LongUnbrokenProductName'.repeat(4) + '中文标题反复检查'; draft.content.description = '很长的说明 with long English content. '.repeat(12); draft.content.action = '长按钮文字与很长的操作说明';
    const file = path.join(output, `pressure-${layout}.html`); writeFileSync(file, renderReference(draft, 'zh', fontCss, '', visualAssets));
    await browser.viewport(320, 740, false); await browser.navigate(pathToFileURL(file).href);
    assert.equal(await browser.evaluate('document.documentElement.scrollWidth>innerWidth'), false, `pressure ${layout}`);
    assert.equal(await browser.evaluate("getComputedStyle(document.querySelector('button,a')).transitionDuration"), '0.18s, 0.18s, 0.18s');
    await browser.viewport(320, 740, true);
    assert.equal(await browser.evaluate("getComputedStyle(document.querySelector('button,a')).transitionDuration"), '0s');
  }
  // Exercise the standalone reference's real local interactions.
  await browser.viewport(1280, 900); await browser.navigate(pathToFileURL(path.join(output, 'clear-desk-zh.html')).href);
  await fill('#search', '移动'); assert.equal(await browser.evaluate("document.querySelectorAll('[data-task]:not([hidden])').length"), 1);
  await fill('#search', ''); await click('#filter'); assert.equal(await browser.evaluate("document.querySelectorAll('[data-task]:not([hidden])').length"), 3);
  await click('[data-nav="2"]'); assert.equal(await browser.evaluate("document.querySelectorAll('[data-task]:not([hidden])').length"), 0);
  await click('#filter'); assert.equal(await browser.evaluate("document.querySelectorAll('[data-task]:not([hidden])').length"), 1);
  for (const state of ['empty','loading','error']) { await click(`[data-state="${state}"]`); assert.equal(await browser.evaluate(`document.querySelector('#${state}-state').hidden`), false); }
  await click('#retry'); assert.equal(await browser.evaluate("document.querySelector('#normal-state').hidden"), false);
  await click('#add-task'); await fill('#task-name', '<img src=x onerror=alert(1)> 本地任务'); await browser.evaluate("document.querySelector('#task-form').requestSubmit()");
  assert.equal(await browser.evaluate("document.querySelectorAll('[data-task]').length"), 5); assert.equal(await browser.evaluate("document.querySelector('.tasks tbody img')"), null);
  await click('.task-toggle'); assert.equal(await browser.evaluate("document.querySelector('.task-toggle').getAttribute('aria-pressed')"), 'true');
  report.interactions.dashboard = 'search, filter, navigation, all states, retry, safe task form and toggle passed';
  await browser.navigate(pathToFileURL(path.join(output, 'paper-story-zh.html')).href);
  await click('.hero-actions a'); assert.ok(await browser.evaluate('scrollY>0')); await fill('input[name=reader]', '测试'); await browser.evaluate("document.querySelector('#join-form').requestSubmit()");
  assert.ok(await browser.evaluate("document.querySelector('#join-result').textContent.includes('已为你')")); report.interactions.landing = 'anchor navigation and local form passed';
  // New scene interactions have their own content and navigation models.
  await browser.navigate(pathToFileURL(path.join(output,'atelier-index-zh.html')).href);
  await click('[data-project-filter="product"]');assert.equal(await browser.evaluate("document.querySelectorAll('[data-category]:not([hidden])').length"),3);
  await click('[data-project]');assert.equal(await browser.evaluate("document.querySelector('#project-dialog').open"),true);await click('#project-dialog [data-close]');
  report.interactions.portfolio='category filtering and project detail';
  await browser.navigate(pathToFileURL(path.join(output,'slow-journal-zh.html')).href);
  await click('[data-story="1"]');assert.ok(await browser.evaluate("document.querySelector('#story-title').textContent.includes('移动')"));await click('#story-dialog [data-close]');
  await fill('#newsletter-form input','test@example.com');await browser.evaluate("document.querySelector('#newsletter-form').requestSubmit()");assert.ok(await browser.evaluate("document.querySelector('#newsletter-feedback').textContent.includes('未发送')"));
  await browser.navigate(pathToFileURL(path.join(output,'quiet-essay-zh.html')).href);await click('.essay-toc a[href="#chapter-2"]');assert.ok(await browser.evaluate('scrollY>0'));
  report.interactions.editorial='article detail, local subscription form and article contents';
  await browser.navigate(pathToFileURL(path.join(output,'one-good-object-zh.html')).href);
  await click('#quantity-up');await click('[data-finish="1"]');await click('.purchase-row [data-cart]');await click('#open-cart');assert.equal(await browser.evaluate("document.querySelector('#cart-count').textContent"),'2');assert.ok(await browser.evaluate("document.querySelector('#cart-total').textContent.includes('256')"));
  await click('#cart-items button');assert.equal(await browser.evaluate("document.querySelector('#cart-count').textContent"),'0');await click('#cart-dialog [data-close]');
  await click('[data-shop-filter="desk"]');assert.equal(await browser.evaluate("document.querySelectorAll('[data-shop-category]:not([hidden])').length"),2);
  report.interactions.commerce='finish, quantity, bag add/remove/total and category filtering';
  await browser.viewport(390,844);await browser.navigate(pathToFileURL(path.join(output,'team-inbox-zh.html')).href);
  assert.equal(await browser.evaluate("getComputedStyle(document.querySelector('.chat-main')).display"),'none');await click('[data-thread="1"]');assert.equal(await browser.evaluate("getComputedStyle(document.querySelector('.chat-main')).display"),'flex');
  await fill('#message-text','<img src=x onerror=alert(1)> test message');await browser.evaluate("document.querySelector('#message-form').requestSubmit()");assert.equal(await browser.evaluate("document.querySelectorAll('#messages img').length"),0);assert.ok(await browser.evaluate("document.querySelector('#messages').textContent.includes('固定的本地演示回复')"));
  await click('#back-threads');await click('[data-thread="2"]');await click('#back-threads');await click('[data-thread="1"]');assert.ok(await browser.evaluate("document.querySelector('#messages').textContent.includes('test message')"));
  await click('#chat-info');assert.equal(await browser.evaluate("getComputedStyle(document.querySelector('.chat-context')).display"),'block');await click('#close-context');await click('#back-threads');await fill('#thread-search','不存在的会话');assert.equal(await browser.evaluate("document.querySelector('#thread-empty').hidden"),false);
  report.interactions.chat='mobile inbox/detail/back, safe local messages, retained threads, context and search';
  await browser.viewport(1280,900);
  // Fresh isolated profile: workbench adjustments, history, persistence, import, export.
  await browser.navigate(base + '/compose?recipe=paper-story'); await wait("document.querySelectorAll('.r-preset').length===4 && document.querySelector('.r-live-frame')");
  assert.equal(await browser.evaluate('location.search'), '');
  await click('[aria-label="苔绿奶油"]'); await click('.r-layouts button');
  await wait("document.querySelector('.r-live-frame').srcdoc.includes('--accent: #2e6047') && document.querySelector('.r-live-frame').srcdoc.includes('class=\"split\"')");
  await click('[aria-label="撤销"]'); await wait("document.querySelector('.r-live-frame').srcdoc.includes('class=\"center\"')");
  await click('[aria-label="重做"]'); await wait("document.querySelector('.r-live-frame').srcdoc.includes('class=\"split\"')");
  await browser.evaluate("document.querySelectorAll('details.r-more')[1].open=true");
  const copyInput = 'details.r-more textarea';
  const timing = await browser.evaluate(`(async()=>{const el=document.querySelector(${JSON.stringify(copyInput)});const set=Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,'value').set;const title=()=>new DOMParser().parseFromString(document.querySelector('.r-live-frame').srcdoc,'text/html').querySelector('h1').textContent;const before=title();for(const value of ['A','AB','ABC']){set.call(el,value);el.dispatchEvent(new Event('input',{bubbles:true}));}await new Promise(r=>requestAnimationFrame(r));const afterInput={value:el.value,updated:title().includes('ABC')};await new Promise(r=>setTimeout(r,100));const after100={updated:title().includes('ABC'),unchanged:before===title()};await new Promise(r=>setTimeout(r,200));return {afterInput,after100,after300:title().includes('ABC')};})()`);
  assert.equal(timing.afterInput.value, 'ABC');
  assert.equal(timing.afterInput.updated, false, 'Preview is not synchronously rerendered by input');
  assert.equal(timing.after100.updated, false, 'Preview waits for the debounce interval');
  assert.equal(timing.after300, true, 'Preview renders after the debounce interval');
  await wait("document.querySelector('.r-live-frame').srcdoc.includes('ABC')");
  await click('[aria-label="撤销"]'); await wait(`document.querySelector(${JSON.stringify(copyInput)}).value===''`);
  await click('[aria-label="重做"]'); await wait(`document.querySelector(${JSON.stringify(copyInput)}).value==='ABC'`);
  await click('[aria-label="撤销"]'); await wait(`document.querySelector(${JSON.stringify(copyInput)}).value===''`);
  await click('[aria-label="全屏预览"]'); assert.equal(await browser.evaluate("!!document.querySelector('.r-is-fullscreen')"), true);
  await browser.evaluate("document.querySelector('.r-live-frame').focus()");
  await browser.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 });
  await wait("!document.querySelector('.r-is-fullscreen')");
  await browser.navigate(base + '/compose'); await wait("document.querySelector('.r-live-frame')"); assert.ok(await browser.evaluate("document.querySelector('.r-live-frame').srcdoc.includes('--accent: #2e6047')"));
  await click('[aria-label="我的配方"]'); await fill('.r-input-label input', '回归测试配方'); await click('.r-dialog .r-primary'); assert.equal(await browser.evaluate("document.querySelectorAll('.r-saved-row').length"), 1);
  await click('.r-dialog [aria-label="关闭"]');
  // Import changes state only after complete validation.
  const imported = createDraft('night-shift'); imported.name = 'Imported night'; imported.overrides = { palette: 'forest' };
  const importPath = path.join(output, 'import.json'); writeFileSync(importPath, exportRecipe(imported));
  async function inputFile(file) { const { root: doc } = await browser.send('DOM.getDocument'); const { nodeId } = await browser.send('DOM.querySelector', { nodeId: doc.nodeId, selector: 'input[accept=".json,application/json"]' }); await browser.send('DOM.setFileInputFiles', { nodeId, files: [file] }); }
  await inputFile(importPath); await wait("document.querySelector('.r-preview-footer strong').textContent.includes('Imported night')");
  const before = await browser.evaluate("document.querySelector('.r-live-frame').srcdoc");
  const badPath = path.join(output, 'invalid.json'); writeFileSync(badPath, '{"schemaVersion":200}'); await inputFile(badPath); await wait("document.querySelector('.r-toast').textContent.includes('无法导入')"); assert.equal(await browser.evaluate("document.querySelector('.r-live-frame').srcdoc"), before);
  await click('[aria-label="我的配方"]'); await click('.r-saved-row>button'); await wait("document.querySelector('.r-preview-footer strong').textContent.includes('回归测试配方')");
  await browser.navigate(base+'/compose?recipe=atelier-index');await wait("document.querySelector('.r-live-frame')");
  const {root: imageDoc}=await browser.send('DOM.getDocument');const {nodeId: imageNode}=await browser.send('DOM.querySelector',{nodeId:imageDoc.nodeId,selector:'input[accept="image/jpeg,image/png,image/webp"]'});
  await browser.send('DOM.setFileInputFiles',{nodeId:imageNode,files:[path.join(root,'assets/demo-media/headphones.webp')]});
  await wait("document.querySelector('.r-local-image>img')");
  const uploaded=await browser.evaluate("document.querySelector('.r-local-image>img').src");assert.ok(uploaded.startsWith('data:image/jpeg;base64,'));
  await click('.r-local-image .r-segment button:last-child');await wait("document.querySelector('.r-live-frame').srcdoc.includes('object-fit:contain')");
  await browser.navigate(base+'/compose');await wait("document.querySelector('.r-local-image>img')");assert.equal(await browser.evaluate("document.querySelector('.r-local-image>img').src"),uploaded);
  const {root: invalidImageDoc}=await browser.send('DOM.getDocument');const {nodeId: invalidImageNode}=await browser.send('DOM.querySelector',{nodeId:invalidImageDoc.nodeId,selector:'input[accept="image/jpeg,image/png,image/webp"]'});
  await browser.send('DOM.setFileInputFiles',{nodeId:invalidImageNode,files:[path.join(output,'invalid.json')]});await wait("document.querySelector('.r-toast').textContent.includes('JPG')");assert.equal(await browser.evaluate("document.querySelector('.r-local-image>img').src"),uploaded);
  await click('.r-header .r-primary'); await wait("document.querySelector('dialog').open");
  assert.equal(await browser.evaluate("document.activeElement.closest('dialog')!==null"), true);
  await browser.send('Browser.setDownloadBehavior', { behavior: 'allow', downloadPath: downloads });
  await click('.r-export-actions .r-secondary');
  const until = Date.now() + 10000; while (Date.now() < until && !readdirSync(downloads).some(f => f.endsWith('.zip'))) await new Promise(r => setTimeout(r, 100));
  assert.ok(readdirSync(downloads).some(f => f.endsWith('.zip')), 'Browser ZIP download');
  await click('.r-file-links button:nth-child(2)');
  const jsonUntil = Date.now()+10000; while(Date.now()<jsonUntil&&!existsSync(path.join(downloads,'recipe.json'))) await new Promise(r=>setTimeout(r,100));
  const downloadedImageRecipe=importRecipe(readFileSync(path.join(downloads,'recipe.json'),'utf8'));assert.equal(downloadedImageRecipe.image.data,uploaded);assert.equal(downloadedImageRecipe.image.fit,'contain');
  await browser.screenshot(path.join(output, 'export-dialog.png'));
  await browser.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 }); await wait("!document.querySelector('dialog').open");
  await browser.screenshot(path.join(output, 'workbench-desktop.png'));
  for (const [width, height] of [[390,844],[768,1024],[1280,800],[1440,900]]) {
    await browser.viewport(width, height); await browser.evaluate('new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))');
    assert.equal(await browser.evaluate('document.documentElement.scrollWidth>innerWidth'), false, `workbench ${width}`);
    if (width === 390) { await click('[aria-label="手机"]'); await browser.screenshot(path.join(output, 'workbench-mobile.png')); await click('.r-mobile-tabs button:last-child'); assert.equal(await browser.evaluate("getComputedStyle(document.querySelector('.r-controls')).display==='none'"), false); await browser.screenshot(path.join(output, 'workbench-mobile-adjust.png')); await click('.r-mobile-tabs button:first-child'); }
  }
  await click('[aria-label="Switch to English"]'); assert.ok(await browser.evaluate("document.querySelector('h1').textContent.includes('Recipe studio')")); assert.equal(await browser.evaluate('document.documentElement.lang'), 'en');
  await click('[aria-label="Toggle theme"]'); await browser.screenshot(path.join(output, 'workbench-dark-en.png'));
  await browser.navigate(base + '/'); await wait("document.querySelector('.home-nav a[href$=\"/compose\"]')");
  for (const width of [375,390,1280]) { await browser.viewport(width, 844); await browser.evaluate('new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))'); assert.equal(await browser.evaluate('document.documentElement.scrollWidth>innerWidth'), false, `Home nav ${width}`); }
  await browser.navigate(base + '/style/editorial'); await wait("document.querySelector('a[href*=\"recipe=paper-story\"]')");
  report.workbench = { history: true, debouncedPreview: true, coalescedTextHistory: true, persisted: true, savedCopy: true, restoredCopy: true, validImport: true, invalidImportAtomic: true, localImageUpload: true, localImagePersistence: true, imageExport: true, invalidImageAtomic: true, downloadZip: true, downloadJson: true, bilingual: true, documentLanguage: true, theme: true, responsive: true, errors: browser.errors };
  assert.equal(browser.errors.length, 0, browser.errors.join('\n'));
  report.network.online = browser.requests.filter(url => /^https?:/.test(url));
  assert.ok(report.network.online.every(url => url.startsWith(base)), 'No third-party runtime requests');
  const legacyFile=readFileSync(path.join(root,'scripts/tests/fixtures/recipe-v1.json'),'utf8');
  const legacyStorage={current:legacyFile,saved:[{id:'legacy-1',file:legacyFile,savedAt:'2026-09-11T00:00:00.000Z'}]};
  await browser.evaluate(`localStorage.setItem('vibedesign-recipes-v1',${JSON.stringify(JSON.stringify(legacyStorage))})`);
  await browser.navigate(base+'/compose');await wait("document.querySelector('.r-preview-footer strong')?.textContent.includes('Legacy saved recipe')");
  await click('[aria-label="My recipes"]');assert.equal(await browser.evaluate("document.querySelectorAll('.r-saved-row').length"),1);
  report.workbench.legacyStorageMigration=true;
  // Completely offline, direct file:// workbench from production build.
  await browser.send('Network.emulateNetworkConditions', { offline: true, latency: 0, downloadThroughput: 0, uploadThroughput: 0 });
  const requestIndex = browser.requests.length;
  const offlineDownloads = path.join(output, 'offline-downloads'); rmSync(offlineDownloads,{recursive:true,force:true}); mkdirSync(offlineDownloads, { recursive: true });
  await browser.send('Browser.setDownloadBehavior', { behavior: 'allow', downloadPath: offlineDownloads });
  await browser.navigate(pathToFileURL(path.join(root, 'dist/vibe-design-offline.html')).href); await wait("document.querySelectorAll('.r-preset').length===4 && document.querySelector('.r-live-frame')");
  await click('[aria-label="苔绿奶油"]'); await wait("document.querySelector('.r-live-frame').srcdoc.includes('--accent: #2e6047')");
  const {root: offlineDoc}=await browser.send('DOM.getDocument');const {nodeId:offlineImageNode}=await browser.send('DOM.querySelector',{nodeId:offlineDoc.nodeId,selector:'input[accept="image/jpeg,image/png,image/webp"]'});
  await browser.send('DOM.setFileInputFiles',{nodeId:offlineImageNode,files:[path.join(root,'assets/demo-media/headphones.webp')]});await wait("document.querySelector('.r-local-image>img')");
  report.workbench.offlineImageUpload=true;

  await click('.r-header .r-primary'); await click('.r-export-actions .r-secondary');
  const offlineUntil = Date.now()+10000; while(Date.now()<offlineUntil&&!readdirSync(offlineDownloads).some(f=>f.endsWith('.zip'))) await new Promise(r=>setTimeout(r,100));
  assert.ok(readdirSync(offlineDownloads).some(f=>f.endsWith('.zip')), 'Actual offline ZIP download');
  assert.ok(await browser.evaluate("document.querySelector('.r-dialog-status').textContent.includes('准备好')"));
  await browser.screenshot(path.join(output, 'offline-export.png'));
  report.network.offline = browser.requests.slice(requestIndex).filter(url => /^https?:/.test(url)); assert.deepEqual(report.network.offline, []);
  assert.equal(browser.errors.length, 0, browser.errors.join('\n')); report.workbench.offline = true;
  // Force unavailable browser APIs to exercise the promised fallbacks in a fresh document.
  await browser.send('Page.addScriptToEvaluateOnNewDocument', { source: "Object.defineProperty(navigator,'clipboard',{get(){return undefined}});Object.defineProperty(window,'localStorage',{get(){throw new DOMException('Denied','SecurityError')}});" });
  await browser.navigate(pathToFileURL(path.join(root, 'dist/vibe-design-offline.html')).href); await wait("document.querySelector('.r-storage-error')");
  await click('.r-header .r-primary'); await click('.r-export-actions .r-primary'); await wait("document.querySelector('.r-dialog-status')?.textContent.includes('自动复制不可用')");
  assert.equal(await browser.evaluate("document.activeElement===document.querySelector('.r-brief') && document.activeElement.selectionEnd===document.activeElement.value.length"), true);
  report.workbench.storageAndClipboardFallbacks = true;
  assert.equal(readBuildId(), buildId, 'Production build remains unchanged throughout recipe validation');
  report.status = 'passed';
} catch (error) {
  report.status = 'failed';
  report.failure = { message: String(error), browserErrors: browser?.errors, page: await browser?.evaluate('({url:location.href,text:document.body.innerText.slice(0,1600)})').catch(() => null) };
  if (browser) await browser.screenshot(path.join(output, 'failure.png')).catch(() => {});
  throw error;
} finally {
  try {
    if (browser) await browser.close();
    if (server) {
      server.httpServer.closeAllConnections();
      await new Promise(r => server.httpServer.close(r));
    }
    assert.equal(readBuildId(), buildId, 'Production build remains unchanged when the validation process finishes');
  } catch (error) {
    report.status = 'failed';
    report.failure ??= { message: String(error) };
    throw error;
  } finally {
    report.generatedAt = new Date().toISOString();
    writeFileSync(path.join(output, 'report.json'), JSON.stringify(report, null, 2));
    process.removeListener('uncaughtExceptionMonitor', recordUnexpectedFailure);
  }
}
console.log(`Recipe gates passed: ${report.references.length} rendered references, pressure cases, local interactions, workbench history/import/export, offline file and no external requests. Build ${buildId.slice(0, 12)}.`);

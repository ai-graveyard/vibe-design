import assert from 'node:assert/strict';
import { preview } from 'vite';
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, renameSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { openChrome } from './lib/chrome.mjs';
import { validateComparison } from './lib/validate-comparison.mjs';
import { createProjectBrief, exportProjectBrief } from '../src/project/model.ts';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(root, 'output/workflow');
const downloads = path.join(output, 'downloads');
mkdirSync(downloads, { recursive: true });
const build = JSON.parse(readFileSync(path.join(root, 'dist/build-id.json'), 'utf8'));
const server = await preview({ root, preview: { host: '127.0.0.1', port: 0 }, logLevel: 'error' });
let browser;
const report = { schemaVersion: 1, status: 'testing', buildId: build.id, generatedAt: '', browser: '', samples: [], workflow: {}, checks: [] };
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
try {
  const base = server.resolvedUrls.local[0].replace(/\/$/, '');
  browser = await openChrome();
  await browser.send('Browser.setDownloadBehavior', { behavior: 'allow', downloadPath: downloads });
  const wait = async (expression, label = expression) => { const deadline = Date.now() + 18000; while (Date.now() < deadline) { if (await browser.evaluate(`Boolean((${expression}))`).catch(() => false)) return; await pause(40); } throw new Error('Workflow gate timed out: ' + label); };
  const field = async (selector, value) => browser.evaluate(`(()=>{const input=document.querySelector(${JSON.stringify(selector)});input.focus();Object.getOwnPropertyDescriptor(input.tagName==='TEXTAREA'?HTMLTextAreaElement.prototype:HTMLInputElement.prototype,'value').set.call(input,${JSON.stringify(value)});input.dispatchEvent(new Event('input',{bubbles:true}));input.blur();})()`);
  const clickText = async (selector, text) => { const clicked = await browser.evaluate(`(()=>{const button=[...document.querySelectorAll(${JSON.stringify(selector)})].find(el=>el.textContent.trim()===${JSON.stringify(text)});if(!button)return false;button.click();return true;})()`); assert.ok(clicked, `Visible action exists: ${text}`); };

  for (const route of ['compose','project','cases']) assert.ok(existsSync(path.join(root,'dist',route,'index.html')), `${route}: static route shell exists`);
  for (const route of ['/llms.txt','/markdown/index.md','/markdown/styles/swiss.md','/markdown/styles/swiss/DESIGN.md']) { const response = await fetch(base + route); assert.ok(response.ok,route); const body=await response.text(); assert.ok(!body.includes('<div id="root">'), `${route}: real document, not SPA fallback`); }
  report.checks.push('Built routes and machine-readable documents are served as real files.');

  await browser.viewport(1280,900);
  await browser.navigate(base+'/project?style=swiss');
  await wait(`document.querySelectorAll('.project-direction').length===3 && !document.querySelector('.project-export-actions button').disabled`);
  report.browser = await browser.evaluate('navigator.userAgent');
  await browser.evaluate(`document.querySelector('.project-advanced summary').click()`);
  await clickText('.scene-options button','工具后台');
  await field('input[maxlength="160"]','查找并完成当前任务');
  await field('input[maxlength="240"]','后台首页的导航与任务表格 Keep ');
  await field('textarea[maxlength="1200"]','保留任务筛选与 API；长中文标题不截断。');
  await field('input[aria-label="品牌色十六进制"]','#28');
  await wait(`document.querySelector('.project-export-actions button').disabled && document.querySelector('input[aria-label="品牌色十六进制"]').getAttribute('aria-invalid')==='true'`);
  await field('input[aria-label="品牌色十六进制"]','#2867D6');
  await wait(`document.querySelector('input[maxlength="240"]').value.endsWith('Keep ') && document.querySelector('input[aria-label="品牌色十六进制"]').value==='#2867D6'`);
  await browser.evaluate(`document.querySelector('.project-file-preview summary').click()`);
  await wait(`document.querySelector('.project-file-preview pre').textContent.includes('#2867D6') && document.querySelector('.project-file-preview pre').textContent.includes('后台首页')`);
  const selectedIds = await browser.evaluate(`[...document.querySelectorAll('.project-direction')].map(card=>card.querySelector('a').getAttribute('href').split('/').at(-1))`);
  assert.equal(new Set(selectedIds).size,3);
  const downloadName='vibe-design-swiss-project.zip';
  // A fresh isolated download directory per run avoids mistaking an old file for success.
  const downloadDir=path.join(downloads,`run-${Date.now()}`);mkdirSync(downloadDir,{recursive:true});
  await browser.send('Browser.setDownloadBehavior',{behavior:'allow',downloadPath:downloadDir});
  await clickText('.project-export-actions button','下载完整改造包');
  const deadline=Date.now()+12000;while(Date.now()<deadline&&!existsSync(path.join(downloadDir,downloadName)))await pause(50);
  assert.ok(existsSync(path.join(downloadDir,downloadName)),'Browser actually downloaded the project ZIP');
  const archive=JSON.parse(execFileSync('python3',['-c','import zipfile,json,sys; z=zipfile.ZipFile(sys.argv[1]); assert z.testzip() is None; print(json.dumps({n:z.read(n).decode("utf-8") for n in z.namelist()}))',path.join(downloadDir,downloadName)],{encoding:'utf8',maxBuffer:16*1024*1024}));
  for(const name of ['change-brief.md','DESIGN.md','SKILL.md','checklist.md','tokens.css','reference.html','manifest.json','project-brief.json','brand-overrides.css'])assert.ok(archive[name],`Project package includes ${name}`);
  const manifest=JSON.parse(archive['manifest.json']);
  const reference=readFileSync(path.join(root,'public/demos/swiss.html'),'utf8');
  assert.equal(archive['reference.html'],reference,'ZIP retains actual reference bytes');
  assert.equal(manifest.source.checksum,createHash('sha256').update(reference).digest('hex'));
  assert.ok(archive['change-brief.md'].includes('#2867D6')&&archive['change-brief.md'].includes('后台首页')&&archive['change-brief.md'].includes('查找并完成当前任务'));
  report.workflow.package={files:Object.keys(archive),style:'swiss',sourceHash:manifest.source.checksum};
  await browser.screenshot(path.join(output,'project-delivery-desktop.png'));
  await browser.evaluate('window.scrollTo({top:0,behavior:"instant"});document.querySelector(".project-brief-panel").scrollTop=0');
  await browser.screenshot(path.join(output,'project-desktop.png'));

  await browser.navigate(base+'/project?style=swiss');
  await wait(`document.querySelector('input[maxlength="240"]')?.value.includes('后台首页')`);
  await browser.evaluate(`document.querySelector('.project-advanced summary').click()`);
  for (let i=0;i<3;i++) await browser.evaluate(`document.querySelectorAll('.project-direction-links button')[${i}].click()`);
  await wait(`document.querySelectorAll('.project-shortlist-items>span').length===3`);
  const jsonFile=path.join(output,'restore-project.json');writeFileSync(jsonFile,exportProjectBrief({...createProjectBrief(),scene:'portfolio',target:'作品集恢复验证'}));
  const dom=await browser.send('DOM.getDocument');const node=await browser.send('DOM.querySelector',{nodeId:dom.root.nodeId,selector:'input[type=file]'});
  await browser.send('DOM.setFileInputFiles',{nodeId:node.nodeId,files:[jsonFile]});
  await wait(`document.querySelector('input[maxlength="240"]').value==='作品集恢复验证'`);
  const invalidFile=path.join(output,'invalid-project.json');writeFileSync(invalidFile,'{"schemaVersion":999}');
  await browser.send('DOM.setFileInputFiles',{nodeId:node.nodeId,files:[invalidFile]});
  await wait(`document.querySelector('[role=alert]') && document.querySelector('input[maxlength="240"]').value==='作品集恢复验证'`);
  report.checks.push('Project inputs, brand override, local restore, strict atomic import, shortlist and real ZIP download work.');

  await clickText('.project-outcome .project-options button','还需修正');
  await field('.project-outcome textarea','手机端表格的操作列被遮住。');
  await clickText('.project-outcome button','保存自报结果');
  await field('input[maxlength="240"]','另一个项目目标');
  await wait(`document.querySelector('.project-outcome textarea').value===''`);
  await field('input[maxlength="240"]','作品集恢复验证');
  await wait(`document.querySelector('.project-outcome textarea').value==='手机端表格的操作列被遮住。'`);
  await browser.navigate(base+'/project?style=swiss');
  await wait(`document.querySelector('.project-outcome textarea')?.value==='手机端表格的操作列被遮住。'`);
  await browser.viewport(390,844);
  for (const [route,selector] of [['/project?style=swiss','.project-delivery'],['/compose','.recipe-workbench'],['/','#styles-grid'],['/cases','.evidence-boundary'],['/style/swiss','.detail-fit']]) {
    await browser.navigate(base+route);await wait(`document.querySelector(${JSON.stringify(selector)})`);
    assert.ok(await browser.evaluate('document.documentElement.scrollWidth<=innerWidth+1'), `${route}: mobile shell fits`);
    assert.deepEqual(browser.errors,[],`${route}: no runtime errors`);
    await browser.screenshot(path.join(output,`mobile-${route.split('?')[0].replace(/\//g,'-')||'home'}.png`));
  }
  await browser.navigate(base+'/style/swiss');await wait(`document.querySelector('.prompt-tabs button[aria-pressed=true]')`);
  assert.equal(await browser.evaluate(`document.querySelector('.prompt-tabs button[aria-pressed=true]').textContent`),'改造现有页面');
  report.checks.push('Outcome records restore; key routes fit a 390px viewport; detail defaults to existing-page restyling.');

  const compared=await validateComparison(browser,base,output);
  report.samples=compared.samples;report.checks.push(...compared.checks);
  report.generatedAt=new Date().toISOString();
  // Publish only a fully passing record. The UI refuses records from another build.
  for(const target of ['dist/validation']){
    const destination=path.join(root,target);mkdirSync(path.join(destination,'images'),{recursive:true});
    for(const name of readdirSync(path.join(output,'images')))copyFileSync(path.join(output,'images',name),path.join(destination,'images',name));
    writeFileSync(path.join(destination,'evidence.json'),JSON.stringify({...report,status:'passed'},null,2)+'\n');
  }
  await browser.viewport(1280,900);await browser.navigate(base+'/cases');await wait(`document.querySelectorAll('.evidence-card').length===6`);
  await browser.evaluate(`document.querySelector('button[aria-label="Switch to Chinese"]')?.click()`);
  await wait(`document.querySelector('.evidence-boundary strong').textContent.includes('标准样本')`);
  const published=path.join(root,'dist/validation/evidence.json');
  try {
    writeFileSync(published,JSON.stringify({...report,status:'passed',buildId:'0'.repeat(64)}));
    await browser.navigate(base+'/cases');await wait(`document.querySelector('.project-alert')?.textContent.includes('其他构建')`);
    assert.equal(await browser.evaluate(`document.querySelectorAll('.evidence-card').length`),0,'A stale record is never shown as current evidence');
    renameSync(published,published+'.probe');
    try { await browser.navigate(base+'/cases');await wait(`document.querySelector('.evidence-state h2')?.textContent.includes('没有发布检查记录')`); }
    finally { renameSync(published+'.probe',published); }
  } finally { writeFileSync(published,JSON.stringify({...report,status:'passed'},null,2)+'\n'); }
  report.checks.push('Evidence renders only for its matching build; missing and stale records expose no verified cards.');
  report.status='passed';
  for(const target of ['public/validation','dist/validation']){
    const destination=path.join(root,target);mkdirSync(path.join(destination,'images'),{recursive:true});
    for(const name of readdirSync(path.join(output,'images')))copyFileSync(path.join(output,'images',name),path.join(destination,'images',name));
    writeFileSync(path.join(destination,'evidence.json'),JSON.stringify(report,null,2)+'\n');
  }
  await browser.navigate(base+'/cases');await wait(`document.querySelectorAll('.evidence-card').length===6`);
  await browser.screenshot(path.join(output,'evidence-desktop.png'));
  console.log(`Workflow gates passed: project → recommendations → shortlist → package → outcomes; ${report.samples.length} rendered comparison samples; evidence matches build ${build.id.slice(0,12)}.`);
}catch(error){
  report.status='failed';
  report.failure={message:error.message,errors:browser?.errors??[],page:browser?await browser.evaluate('({url:location.href,text:document.body.innerText.slice(0,6000)})').catch(()=>null):null};
  if(existsSync(path.join(root,'dist/validation/evidence.json')))writeFileSync(path.join(root,'dist/validation/evidence.json'),JSON.stringify(report,null,2)+'\n');
  if(browser)await browser.screenshot(path.join(output,'failure.png')).catch(()=>{});
  throw error;
}finally{
  writeFileSync(path.join(output,'report.json'),JSON.stringify(report,null,2)+'\n');
  if(browser)await browser.close();server.httpServer.closeAllConnections();await new Promise(resolve=>server.httpServer.close(resolve));
}

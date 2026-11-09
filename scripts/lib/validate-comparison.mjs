import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { supportedComparisonStyles } from '../../src/comparison/render.ts';
import { demoTokenCss } from '../../src/lib/demoSource.ts';
import { designStyles } from '../../src/data/styles.ts';
import { publicUrl } from '../../src/data/site.ts';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const sha256 = value => createHash('sha256').update(value).digest('hex');
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

/** Actual app/iframe interaction gates. These are usability evidence, not aesthetic scores. */
export async function validateComparison(browser, base, output) {
  const images = path.join(output, 'images');
  mkdirSync(images, { recursive: true });
  const samples = [];
  const checks = [];
  const sources = new Map();
  const waitFor = async (expression, label = expression) => {
    const deadline = Date.now() + 18000;
    while (Date.now() < deadline) {
      if (await browser.evaluate(`Boolean((${expression}))`).catch(() => false)) return;
      await delay(40);
    }
    throw new Error(`Comparison gate timed out: ${label}`);
  };
  const frameExpression = `document.querySelector('.compare-study:first-child iframe.demo-viewport-frame')`;
  const inFrame = expression => browser.evaluate(`(async()=>{const frame=${frameExpression};if(!frame?.contentDocument)throw new Error('Sample iframe unavailable');const doc=frame.contentDocument,win=frame.contentWindow;${expression}})()`);

  for (const styleId of supportedComparisonStyles) {
    const response = await fetch(`${base}/demos/${styleId}.html`);
    assert.ok(response.ok, `${styleId}: source request succeeded`);
    const source = await response.text();
    assert.equal(source, readFileSync(path.join(root, 'public/demos', `${styleId}.html`), 'utf8'), `${styleId}: served and current source match`);
    sources.set(styleId, { source, sourceHash: sha256(source) });
  }
  checks.push('All six served reference sources match current public/demos files.');

  for (const styleId of supportedComparisonStyles) for (const scene of ['landing', 'dashboard']) for (const language of ['zh', 'en']) for (const width of [390, 1280]) {
    const key = `${styleId}/${scene}/${language}/${width}`;
    const height = width === 390 ? 844 : 800;
    const sampleChecks = [];
    const { source, sourceHash } = sources.get(styleId);
    await browser.viewport(width, height, true);
    await browser.navigate(`${base}/compare/apple/swiss?mode=content&scene=${scene}`);
    await waitFor(`document.querySelector('.comparison-modes [aria-pressed="true"]') && ${frameExpression}?.contentDocument?.querySelector('h1')`, `${key}: initial comparison ready`);

    // Exercise the actual custom selector, rather than only navigating directly to each route.
    const style = designStyles.find(item => item.id === styleId);
    await browser.evaluate(`document.querySelector('.compare-study:first-child .style-select-trigger').click()`);
    await waitFor(`document.querySelector('.compare-study:first-child [role="listbox"]')`, `${key}: style picker opened`);
    const selected = await browser.evaluate(`(()=>{const option=[...document.querySelectorAll('.compare-study:first-child [role="option"]')].find(option=>[${JSON.stringify(style.name)},${JSON.stringify(style.nameEn)}].includes(option.textContent.trim()));if(!option)return false;option.click();return true;})()`);
    assert.ok(selected, `${key}: style can be selected in A picker`);
    await waitFor(`location.pathname.endsWith('/compare/${styleId}/swiss') && ${frameExpression}?.contentDocument?.documentElement.classList.contains('style-${styleId}')`, `${key}: selected style rendered`);

    const toggle = language === 'en' ? '切换为英文' : 'Switch to Chinese';
    await browser.evaluate(`document.querySelector('button[aria-label=${JSON.stringify(toggle)}]')?.click()`);
    await browser.evaluate(`document.querySelector('.compare-controls [data-device="${width === 390 ? 'mobile' : 'desktop'}"]').click()`);
    await waitFor(`${frameExpression}?.clientWidth===${width} && ${frameExpression}?.contentDocument?.documentElement.lang==='${language === 'zh' ? 'zh-CN' : 'en'}' && ${frameExpression}?.contentDocument?.readyState==='complete'`, `${key}: viewport and language applied`);
    await inFrame(`await doc.fonts.ready;await new Promise(resolve=>win.requestAnimationFrame(()=>win.requestAnimationFrame(resolve)));return true;`);
    sampleChecks.push('Style selected through ComparePage; URL scene, language and fixed device viewport applied.');

    const layout = await inFrame(`return {width:win.innerWidth,height:win.innerHeight,innerScroll:doc.documentElement.scrollWidth,innerClient:doc.documentElement.clientWidth,outerScroll:document.documentElement.scrollWidth,outerClient:document.documentElement.clientWidth,fontsStatus:doc.fonts.status,fontFaces:[...doc.fonts].map(font=>({family:font.family,status:font.status})),fontFamily:win.getComputedStyle(doc.body).fontFamily,headingVisible:!!doc.querySelector('h1')?.getBoundingClientRect().width,sourceMatches:frame.srcdoc.includes(${JSON.stringify(demoTokenCss(source))}),sourcePath:doc.querySelector('meta[name="vibe-design-source"]')?.content,scenario:doc.querySelector('meta[name="vibe-design-comparison"]')?.content,reducedMotion:win.matchMedia('(prefers-reduced-motion: reduce)').matches,scrollBehavior:win.getComputedStyle(doc.documentElement).scrollBehavior};`);
    assert.equal(layout.width, width, `${key}: inner viewport width`);
    assert.equal(layout.height, height, `${key}: inner viewport height`);
    assert.ok(layout.innerScroll <= layout.innerClient + 1, `${key}: inner document overflow ${layout.innerScroll}/${layout.innerClient}`);
    assert.ok(layout.outerScroll <= layout.outerClient + 1, `${key}: comparison shell overflow ${layout.outerScroll}/${layout.outerClient}`);
    assert.equal(layout.fontsStatus, 'loaded', `${key}: font set settled`);
    assert.ok(layout.fontFaces.every(font => font.status !== 'error'), `${key}: embedded font faces do not fail`);
    assert.ok(layout.fontFamily.length && layout.headingVisible, `${key}: visible content and font family`);
    assert.ok(layout.sourceMatches, `${key}: full source token block in rendered sample`);
    assert.equal(layout.sourcePath, publicUrl(`/demos/${styleId}.html`), `${key}: source attribution`);
    assert.equal(layout.scenario, `same-content-v1/${scene}/${language}`, `${key}: fixed-content scenario contract`);
    assert.ok(layout.reducedMotion && layout.scrollBehavior === 'auto', `${key}: reduced-motion behavior`);
    sampleChecks.push('Inner and outer documents fit the viewport; embedded fonts settle without errors.');
    sampleChecks.push('Rendered HTML retains actual source tokens and source attribution; reduced motion disables smooth scrolling.');

    // :focus-visible intentionally follows keyboard modality, not the preceding mouse selection.
    await browser.send('Input.dispatchKeyEvent', { type:'keyDown',key:'Tab',code:'Tab',windowsVirtualKeyCode:9 });
    await browser.send('Input.dispatchKeyEvent', { type:'keyUp',key:'Tab',code:'Tab',windowsVirtualKeyCode:9 });
    const focus = await inFrame(`const target=doc.querySelector('input:not([type=checkbox]),button,a');target.focus();const outline=win.getComputedStyle(target);return {focused:doc.activeElement===target,outlineStyle:outline.outlineStyle,outlineWidth:parseFloat(outline.outlineWidth)};`);
    assert.ok(focus.focused && focus.outlineStyle !== 'none' && focus.outlineWidth >= 2, `${key}: keyboard focus is visible ${JSON.stringify(focus)}`);
    sampleChecks.push('Focusable control exposes a visible focus outline.');

    if (scene === 'landing') {
      const landingResult = await inFrame(`const form=doc.getElementById('join-form');const field=form.querySelector('input');field.value='';const required=!form.checkValidity();field.value=${JSON.stringify(language === 'zh' ? '长中文阅读者 <测试>' : 'Reader <test>')};form.requestSubmit();return {required,message:doc.getElementById('join-result').textContent,executedMarkup:!!doc.querySelector('#join-result test')};`);
      assert.ok(landingResult.required, `${key}: form requires name`);
      assert.ok(landingResult.message.includes('<'), `${key}: submitted name shown as text`);
      assert.ok(!landingResult.executedMarkup, `${key}: name does not become HTML`);
      sampleChecks.push('Landing form validates required input and returns local feedback with safe text.');
      // Restore the unchanged canonical state for the screenshot.
      await inFrame(`doc.getElementById('join-form').reset();doc.getElementById('join-result').textContent='';return true;`);
    } else {
      const initial = await inFrame(`return {rows:doc.querySelectorAll('#task-rows tr').length,longText:doc.getElementById('task-rows').textContent.includes(${JSON.stringify(language === 'zh' ? '完成阅读室首页与手机端长中文标题排版检查' : 'Review the reading-room home page and long mobile headlines')})};`);
      assert.equal(initial.rows, 5, `${key}: five shared records`);
      assert.ok(initial.longText, `${key}: long task name retained`);
      const search = await inFrame(`const field=doc.getElementById('task-search');field.value='zz-no-such-task-zz';field.dispatchEvent(new win.Event('input',{bubbles:true}));const result={rows:doc.querySelectorAll('#task-rows tr').length,empty:!doc.getElementById('search-empty').hidden};field.value='';field.dispatchEvent(new win.Event('input',{bubbles:true}));return result;`);
      assert.deepEqual(search, { rows: 0, empty: true }, `${key}: search empty state`);
      const filter = await inFrame(`const select=doc.getElementById('task-filter');select.value='done';select.dispatchEvent(new win.Event('change',{bubbles:true}));const result={rows:doc.querySelectorAll('#task-rows tr').length,checked:doc.querySelectorAll('#task-rows input:checked').length};select.value='all';select.dispatchEvent(new win.Event('change',{bubbles:true}));return result;`);
      assert.deepEqual(filter, { rows: 1, checked: 1 }, `${key}: status filter matches data`);
      const created = await inFrame(`doc.getElementById('add-task-toggle').click();const opened=!doc.getElementById('task-form').hidden;doc.querySelector('#task-form input').value='UI verification <safe>';doc.getElementById('task-form').requestSubmit();const first=doc.querySelector('#task-rows tr');first.querySelector('input').click();return {opened,closed:doc.getElementById('task-form').hidden,rows:doc.querySelectorAll('#task-rows tr').length,contains:first.textContent.includes('UI verification <safe>'),checked:doc.querySelector('#task-rows input').checked,markup:!!doc.querySelector('#task-rows safe')};`);
      assert.ok(created.opened && created.closed && created.contains && created.checked && !created.markup, `${key}: create and complete task with safe input`);
      assert.equal(created.rows, 6, `${key}: new task appears`);
      for (const state of ['loading', 'empty', 'error']) {
        const result = await inFrame(`doc.querySelector('[data-state="${state}"]').click();const message=doc.getElementById('state-message');return {dataHidden:doc.getElementById('data-region').hidden,messageVisible:!message.hidden,text:message.textContent,pressed:doc.querySelector('[data-state="${state}"]').getAttribute('aria-pressed'),animation:doc.querySelector('.loader i')?win.getComputedStyle(doc.querySelector('.loader i')).animationName:null,retry:!!message.querySelector('[data-retry]'),firstTask:!!message.querySelector('[data-new-task]')};`);
        assert.ok(result.dataHidden && result.messageVisible && result.text.trim(), `${key}: ${state} message replaces records`);
        assert.equal(result.pressed, 'true', `${key}: ${state} selected state`);
        if (state === 'loading') assert.equal(result.animation, 'none', `${key}: loading respects reduced motion`);
        if (state === 'empty') assert.ok(result.firstTask, `${key}: empty-state action`);
        if (state === 'error') assert.ok(result.retry, `${key}: error-state retry action`);
      }
      const retry = await inFrame(`doc.querySelector('[data-retry]').click();return {restored:!doc.getElementById('data-region').hidden,rows:doc.querySelectorAll('#task-rows tr').length,pressed:doc.querySelector('[data-state="default"]').getAttribute('aria-pressed'),disabled:doc.querySelector('.disabled-example button').disabled};`);
      assert.ok(retry.restored && retry.disabled, `${key}: retry restores data and disabled example stays disabled`);
      assert.equal(retry.rows, 6, `${key}: local task persists through state preview`);
      assert.equal(retry.pressed, 'true', `${key}: retry selects default state`);
      sampleChecks.push('Five fixed long-title records; search empty state and status filter match the data.');
      sampleChecks.push('New task can be added and completed; text is escaped; default/loading/empty/error/retry and disabled states work.');
      // Reload only the actual iframe to restore its unchanged five-record sample for capture.
      await browser.evaluate(`(()=>{const frame=${frameExpression};frame.srcdoc=frame.srcdoc;})()`);
      await waitFor(`${frameExpression}?.contentDocument?.readyState==='complete' && ${frameExpression}?.contentDocument?.querySelectorAll('#task-rows tr').length===5`, `${key}: canonical state restored`);
      await inFrame(`await doc.fonts.ready;return true;`);
    }

    assert.deepEqual(browser.errors, [], `${key}: no uncaught browser/iframe JavaScript errors`);
    sampleChecks.push('No uncaught browser or iframe JavaScript exceptions.');

    // Keep the reference iframe intact; remove only the surrounding comparison shell and
    // its presentation scale during capture, so pixels match the declared natural viewport.
    await browser.evaluate(`(()=>{const frame=${frameExpression};window.scrollTo({top:0,behavior:'instant'});frame.contentWindow.scrollTo({top:0,behavior:'instant'});const style=document.createElement('style');style.id='comparison-validation-capture';style.textContent='html,body,#root{margin:0!important;padding:0!important;width:${width}px!important;height:${height}px!important;overflow:hidden!important}.compare-header,.compare-main> :not(.compare-grid),.compare-grid>.compare-study:not(:first-child),.compare-study> :not(.comparison-viewport){display:none!important}.compare-page,.compare-main,.compare-grid,.compare-study,.comparison-viewport,.demo-viewport-page{position:static!important;display:block!important;margin:0!important;padding:0!important;border:0!important;width:${width}px!important;height:${height}px!important;max-width:none!important;min-height:0!important;overflow:hidden!important}.comparison-viewport iframe{position:fixed!important;inset:0 auto auto 0!important;border:0!important;border-radius:0!important;transform:none!important;width:${width}px!important;height:${height}px!important}';document.head.appendChild(style);return true;})()`);
    await browser.evaluate(`new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)))`);
    const filename = `${styleId}-${scene}-${language}-${width}.png`;
    await browser.screenshot(path.join(images, filename));
    samples.push({ styleId, scene, language, viewport: { width, height }, checks: sampleChecks, screenshot: `/validation/images/${filename}`, sourceHash });
    await browser.evaluate(`document.getElementById('comparison-validation-capture').remove()`);
  }
  assert.equal(samples.length, 48, 'Comparison matrix covers six styles × two scenes × two languages × two widths.');
  checks.push('48 standard samples pass viewport, source, font, focus, reduced-motion and interaction gates.');

  // Both samples must remain usable in the normal comparison shell, with mode/scene persistence.
  await browser.viewport(1280, 900, true);
  await browser.navigate(`${base}/compare/apple/swiss?mode=content&scene=dashboard`);
  await waitFor(`document.querySelectorAll('iframe.demo-viewport-frame').length===2 && [...document.querySelectorAll('iframe.demo-viewport-frame')].every(frame=>frame.contentDocument?.querySelectorAll('#task-rows tr').length===5)`, 'Two same-content samples ready');
  const bodyText = await browser.evaluate(`[...document.querySelectorAll('iframe.demo-viewport-frame')].map(frame=>frame.contentDocument.body.textContent)`);
  assert.equal(bodyText[0], bodyText[1], 'A and B contain identical dashboard content and script');
  await browser.evaluate(`document.querySelector('iframe.demo-viewport-frame').contentWindow.scrollTo({top:350,behavior:'instant'})`);
  await waitFor(`document.querySelectorAll('iframe.demo-viewport-frame')[1].contentWindow.scrollY>0`, 'Standard scenario scroll synchronization');
  const progress = await browser.evaluate(`[...document.querySelectorAll('iframe.demo-viewport-frame')].map(frame=>{const win=frame.contentWindow;return win.scrollY/(win.document.documentElement.scrollHeight-win.innerHeight)})`);
  assert.ok(Math.abs(progress[0] - progress[1]) < .015, 'Same-content frames synchronize by scroll progress');
  await browser.evaluate(`document.querySelector('.swap-button').click()`);
  await waitFor(`location.pathname.endsWith('/compare/swiss/apple') && new URLSearchParams(location.search).get('scene')==='dashboard' && new URLSearchParams(location.search).get('mode')==='content'`, 'Swap retains standard scene and mode');
  checks.push('A/B share identical dashboard content; same-content scrolling synchronizes and swap preserves mode/scene.');
  await browser.screenshot(path.join(output, 'comparison-shell.png'));

  await browser.navigate(`${base}/compare/glassmorphism/swiss?mode=content&scene=dashboard`);
  await waitFor(`document.querySelector('.comparison-unavailable') && document.querySelectorAll('iframe.demo-viewport-frame').length===1`, 'Unsupported style is explicit');
  const unsupported = await browser.evaluate(`({buttons:document.querySelectorAll('.comparison-unavailable>div>button').length,project:document.querySelector('.comparison-use')?.getAttribute('href')})`);
  assert.equal(unsupported.buttons, 6, 'Unsupported sample offers the six actual supported styles');
  assert.ok(unsupported.project?.endsWith('/project?style=glassmorphism'), 'Chosen unsupported style can still be used for a project');
  await browser.evaluate(`document.querySelector('.comparison-original-button').click()`);
  await waitFor(`new URLSearchParams(location.search).get('mode')==='original' && [...document.querySelectorAll('iframe.demo-viewport-frame')].length===2 && [...document.querySelectorAll('iframe.demo-viewport-frame')].every(frame=>frame.contentDocument?.readyState==='complete' && frame.contentDocument?.querySelector('h1'))`, 'Original demos available after explicit switch');
  checks.push('Unsupported standard styles are labelled explicitly and can switch to their full original demos.');
  assert.deepEqual(browser.errors, [], 'Comparison final mode switching causes no browser exceptions');
  return { samples, checks };
}

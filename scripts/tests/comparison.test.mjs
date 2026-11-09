import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { Script } from 'node:vm';
import { renderComparison, supportedComparisonStyles } from '../../src/comparison/render.ts';
import { parseDemoTokens } from '../../src/lib/demoSource.ts';

const sourceFor = id => readFileSync(new URL(`../../public/demos/${id}.html`, import.meta.url), 'utf8');
const render = (id, scene = 'landing', language = 'zh', source = sourceFor(id)) => renderComparison({ styleId: id, scene, language, source });
const body = html => html.match(/<body>([\s\S]*)<script>/)[1];
const behavior = html => html.match(/<script>([\s\S]*)<\/script>/)[1];

test('all six styles and both scenes share exactly the same content and behavior', () => {
  assert.equal(supportedComparisonStyles.length, 6);
  for (const scene of ['landing', 'dashboard']) for (const language of ['zh', 'en']) {
    const expected = render('apple', scene, language);
    for (const id of supportedComparisonStyles) {
      const html = render(id, scene, language);
      assert.ok(html, `${id}/${scene}/${language}: reference generated`);
      assert.equal(body(html), body(expected), `${id}: identical scenario content`);
      assert.equal(behavior(html), behavior(expected), `${id}: identical scenario behavior`);
      assert.doesNotThrow(() => new Script(behavior(html)), `${id}: valid standalone JavaScript`);
      assert.ok(html.includes(`<html lang="${language === 'zh' ? 'zh-CN' : 'en'}" class="style-${id}"`));
      assert.ok(html.includes('prefers-reduced-motion:reduce'));
      assert.ok(html.includes(':focus-visible'));
      assert.ok(html.includes(`/demos/${id}.html`));
      assert.ok(!/<(?:script|link)\b[^>]*(?:src|href)=/i.test(html), 'independent HTML has no external runtime or stylesheet');
    }
  }
});

test('every reference retains the exact source tokens and embedded licensed font declarations', () => {
  for (const id of supportedComparisonStyles) {
    const source = sourceFor(id);
    const html = render(id);
    for (const { name, value } of parseDemoTokens(source)) assert.ok(html.includes(`${name}: ${value};`), `${id}/${name}: source token retained`);
    const fonts = source.match(/\/\* embedded-fonts:start \*\/[\s\S]*?\/\* embedded-fonts:end \*\//)?.[0];
    if (fonts) assert.ok(html.includes(fonts), `${id}: embedded font and license retained`);
  }
});

test('source changes propagate to same-content HTML instead of using copied palette or component numbers', () => {
  const apple = sourceFor('apple').replace('--accent:#0071e3;', '--accent:#112233;').replace('background:#fff;border-radius:28px;', 'background:#fff;border-radius:37px;');
  const appleHtml = render('apple', 'landing', 'zh', apple);
  assert.ok(appleHtml.includes('--accent: #112233;'));
  assert.ok(appleHtml.includes('--c-accent:var(--accent)'));
  assert.ok(appleHtml.includes('--c-radius:37px;'));
  const material = sourceFor('material').replace('border-radius:16px;padding:28px 26px;', 'border-radius:19px;padding:28px 26px;');
  assert.ok(render('material', 'dashboard', 'en', material).includes('--c-radius:19px;'));
  const neo = sourceFor('neo-brutalism').replace('--bw:4px;', '--bw:7px;').replace('box-shadow:5px 5px 0 var(--ink)', 'box-shadow:9px 9px 0 var(--ink)');
  const neoHtml = render('neo-brutalism', 'dashboard', 'zh', neo);
  assert.ok(neoHtml.includes('--bw: 7px;'));
  assert.ok(neoHtml.includes('--c-border:var(--bw)'));
  assert.ok(neoHtml.includes('--c-shadow:9px 9px 0 var(--ink)'));
});

test('unsupported styles and malformed references are rejected explicitly', () => {
  assert.equal(render('glassmorphism'), null);
  assert.equal(render('apple', 'landing', 'zh', ':root{--bg:#fff;}'), null);
  assert.equal(render('apple', 'landing', 'zh', sourceFor('apple').replace('border-radius:28px;', '')), null);
});

test('dashboard includes full sample state contracts and local user input is escaped', () => {
  const html = render('terminal', 'dashboard');
  for (const state of ['default', 'loading', 'empty', 'error']) assert.ok(html.includes(`data-state="${state}"`));
  for (const id of ['task-search', 'task-filter', 'task-form', 'search-empty', 'task-rows', 'state-message', 'task-feedback']) assert.ok(html.includes(`id="${id}"`));
  assert.ok(html.includes('完成阅读室首页与手机端长中文标题排版检查'));
  assert.ok(html.includes('Margin / 2026 阅读手记与书单'));
  assert.ok(html.includes('encode(record.title)'));
  assert.ok(html.includes('encode(record.owner)'));
  assert.ok(html.includes('data-retry'));
  assert.ok(html.includes('disabled'));
  assert.ok(html.includes('aria-live="polite"'));
});

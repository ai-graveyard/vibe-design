import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, rmSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { createDraft, recipes, layouts, palettes, fonts, surfaces, densities, motions, resolve, exportRecipe, importRecipe, changeScene, tokenCss, contrast, scenes, visuals, maxRecipeBytes } from '../../src/recipes/model.ts';
import { renderReference, buildBrief } from '../../src/recipes/render.ts';
import { designFiles, zipFiles } from '../../src/recipes/export.ts';

test('every supported combination resolves with readable semantic color pairs and round-trips', () => {
  let combinations = 0;
  for (const {id:scene} of scenes) for (const layout of layouts.filter(l => l.scene === scene)) for (const palette of palettes) for (const font of fonts) for (const surface of surfaces) for (const density of densities) for (const motion of motions) for (const visual of visuals) {
    const d = createDraft(recipes.find(r => r.scene === scene).id);
    d.overrides = { layout: layout.id, palette: palette.id, font: font.id, surface: surface.id, density: density.id, motion: motion.id, visual: visual.id };
    const r = resolve(d);
    for (const [fg, bg] of [[palette.text, palette.bg], [palette.muted, palette.bg], [palette.muted, palette.surface], [palette.onAccent, palette.accent], [palette.danger, palette.surface], [palette.success, palette.surface]]) assert.ok(contrast(fg, bg) >= 4.5, `${palette.id}: ${fg} on ${bg}`);
    assert.equal(r.tokens['target-size'], '44px');
    assert.deepEqual(importRecipe(exportRecipe(d)), d);
    combinations++;
  }
  assert.equal(combinations, 27216);
});
test('explicit overrides replace initial instructions and scene switches retain compatible choices', () => {
  const d = createDraft('paper-story');
  d.overrides = { palette: 'ink', font: 'sans', surface: 'hard', layout: 'split' };
  const r = resolve(d), brief = buildBrief(d, 'zh', 'modify');
  assert.equal(r.tokens.shadow, '5px 5px 0 var(--text)');
  assert.ok(brief.includes('深夜柑橘'));
  assert.ok(!brief.includes('暖纸朱红'));
  assert.ok(!brief.includes('衬线标题与细栏线'));
  const switched = changeScene(d, 'dashboard');
  assert.equal(resolve(switched).selection.layout, 'sidebar');
  assert.equal(resolve(switched).selection.palette, 'ink');
  assert.equal(resolve(switched).selection.surface, 'hard');
  assert.throws(() => resolve({ ...d, overrides: { layout: 'sidebar' } }));
});
test('import rejects future schemas, bad fields, excessive text and altered snapshots without partial restore', () => {
  const valid = JSON.parse(exportRecipe(createDraft()));
  for (const change of [
    d => d.schemaVersion = 3, d => d.catalogVersion = 'future', d => d.surprise = true,
    d => d.draft.baseId = 'missing', d => d.draft.overrides.motion = 'animated',
    d => d.draft.content.title = 'a'.repeat(161), d => d.draft.content.action = {},
    d => d.resolved.tokens.accent = '#000000', d => d.resolved.tokens.extra = 'evil',
    d => d.draft.overrides.palette = null, d => d.draft.overrides.shadow = 'unknown',
  ]) { const altered = structuredClone(valid); change(altered); assert.throws(() => importRecipe(JSON.stringify(altered))); }
  assert.throws(() => importRecipe('x'.repeat(maxRecipeBytes+1)));
  assert.throws(() => importRecipe('{broken'));
  assert.deepEqual(importRecipe(JSON.stringify(valid)), createDraft());
});
test('user text stays text in standalone HTML and does not create scripts, markup or remote dependencies', () => {
  const d = createDraft();
  d.name = '</title><script>alert(1)</script>';
  d.content.title = '<img src=https://example.invalid/secret onerror=alert(1)>';
  d.content.description = '</style><script>alert(2)</script>';
  d.content.action = '" onclick="alert(3)';
  const html = renderReference(d, 'zh');
  assert.equal((html.match(/<script>/g) || []).length, 1);
  assert.equal((html.match(/<\/script>/g) || []).length, 1);
  assert.ok(html.includes('&lt;img src='));
  assert.ok(!html.includes('<img src='));
  assert.ok(html.includes('form-action &#') === false);
  assert.ok(html.includes("form-action 'none'"));
});
test('every reference and brief uses the same final tokens, and export task modes remain distinct', () => {
  for (const recipe of recipes) for (const lang of ['zh', 'en']) {
    const d = createDraft(recipe.id); d.overrides = { density: 'compact' };
    const files = designFiles(d, lang, 'modify', '', 'Test licenses');
    assert.ok(files['reference.html'].includes(files['tokens.css']));
    assert.ok(files['design-brief.md'].includes(files['tokens.css']));
    assert.equal(files['tokens.css'], tokenCss(d));
    assert.deepEqual(importRecipe(files['recipe.json']), d);
    assert.notEqual(buildBrief(d, lang, 'modify'), buildBrief(d, lang, 'new'));
    assert.ok(!/https?:\/\//.test(files['design-brief.md']));
    assert.ok(files['DESIGN.md'].includes(files['tokens.css']));
    assert.ok(files['SKILL.md'].includes('DESIGN.md'));
    const manifest=JSON.parse(files['manifest.json']);
    assert.equal(manifest.acceptance,'unverified');
    for(const [name,checksum] of Object.entries(manifest.files)) assert.equal(createHash('sha256').update(files[name]).digest('hex'),checksum,`${recipe.id}/${lang}/${name}: independently checked recipe artifact`);
  }
});
test('downloaded ZIP is readable by an independent archive implementation with Unicode intact', () => {
  const dir = mkdtempSync(path.join(tmpdir(), 'recipe-zip-test-'));
  try {
    const d = createDraft(); d.content.title = '给好想法留空间 🌿';
    const files = designFiles(d, 'zh', 'new', '', 'Test license');
    const file = path.join(dir, 'kit.zip'); writeFileSync(file, zipFiles(files));
    const parsed = JSON.parse(execFileSync('python3', ['-c', 'import zipfile,json,sys; z=zipfile.ZipFile(sys.argv[1]); assert z.testzip() is None; print(json.dumps({n:z.read(n).decode("utf-8") for n in z.namelist()}))', file], { encoding: 'utf8' }));
    assert.deepEqual(parsed, files);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('six scenes each have two distinct structures and four deliberate starting recipes', () => {
  assert.equal(scenes.length,6); assert.equal(layouts.length,12); assert.equal(recipes.length,24);
  for(const scene of scenes) {
    assert.equal(layouts.filter(l=>l.scene===scene.id).length,2);
    assert.equal(recipes.filter(r=>r.scene===scene.id).length,4);
  }
  for(const visual of visuals) {
    const d=createDraft('atelier-index');d.overrides.visual=visual.id;
    const html=renderReference(d,'en');
    assert.ok(html.includes(`data-visual="${visual.id}"`));
    assert.ok(buildBrief(d,'en','new').includes(visual.en));
  }
});
test('version one files migrate after snapshot verification and preserve old parameters',()=>{
  const text=readFileSync(new URL('./fixtures/recipe-v1.json',import.meta.url),'utf8');
  const old=JSON.parse(text),d=importRecipe(text);
  assert.equal(d.name,'Legacy saved recipe');assert.equal(d.overrides.visual,'original');
  assert.deepEqual(resolve(d).tokens,old.resolved.tokens);
  assert.equal(JSON.parse(exportRecipe(d)).schemaVersion,2);
  old.resolved.tokens.accent='#000000';assert.throws(()=>importRecipe(JSON.stringify(old)));
});
test('local images survive JSON, scene changes and HTML export without becoming remote URLs or markup',()=>{
  const d=createDraft('atelier-index');
  d.image={data:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jC1sAAAAASUVORK5CYII=',name:'local.png',alt:'" onload="alert(1)',fit:'contain',position:'top'};
  const restored=importRecipe(exportRecipe(d));
  assert.deepEqual(restored.image,d.image);
  assert.deepEqual(changeScene(d,'commerce').image,d.image);
  const html=renderReference(d,'en');assert.ok(html.includes(d.image.data));assert.ok(html.includes('object-fit:contain'));assert.ok(html.includes('object-position:top'));assert.ok(!html.includes('alt="" onload='));
  for(const source of ['https://example.invalid/image.png','data:image/svg+xml;base64,PHN2Zz4=', 'javascript:alert(1)', 'data:image/png;base64,SGVsbG8=']) {
    const invalid={...d,image:{...d.image,data:source}};
    assert.throws(()=>importRecipe(exportRecipe(invalid)));
  }
});

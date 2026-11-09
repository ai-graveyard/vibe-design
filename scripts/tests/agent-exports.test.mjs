import test, { after } from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { cpSync, mkdtempSync, readFileSync, readdirSync, rmSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { designStyles } from '../../src/data/styles.ts';
import { styleSpecs, specVersion } from '../../src/data/styleSpecs.ts';
import { parseDemoTokens } from '../../src/lib/demoSource.ts';
import { BASE_PATH, SITE_URL } from '../../src/data/site.ts';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const outputRoot = mkdtempSync(path.join(tmpdir(), 'vibe-design-exports-'));
const publicRoot = path.join(outputRoot, 'public');
const skillRoot = path.join(outputRoot, 'skills/vibe-design');
const origin = SITE_URL;
const read = (file) => readFileSync(file, 'utf8');
const build = () => execFileSync(process.execPath, ['scripts/build-skill.mjs', '--output-root', outputRoot], { cwd: root, stdio: 'pipe' });
after(() => rmSync(outputRoot, { recursive: true, force: true }));
build();
cpSync(path.join(root, 'public/demos'), path.join(publicRoot, 'demos'), { recursive: true });

function exportedFiles(dir) {
  return readdirSync(dir).sort().flatMap((name) => {
    const file = path.join(dir, name);
    return statSync(file).isDirectory() ? exportedFiles(file) : [file];
  });
}
function metadata(doc) {
  const block = /^---\n([\s\S]*?)\n---/.exec(doc)?.[1];
  assert.ok(block, 'machine document has frontmatter');
  return Object.fromEntries(block.split('\n').map((line) => {
    const colon = line.indexOf(':');
    const key = line.slice(0, colon);
    const value = line.slice(colon + 1).trim();
    return [key, value.startsWith('"') ? JSON.parse(value) : value];
  }));
}

test('all 30 styles have public and portable documents with exact source tokens and identity', () => {
  assert.equal(designStyles.length, 30);
  assert.equal(readdirSync(path.join(publicRoot, 'markdown/styles')).filter((name) => name.endsWith('.md')).length, 30);
  assert.equal(readdirSync(path.join(skillRoot, 'references/styles')).length, 30);
  assert.equal(readdirSync(path.join(skillRoot, 'references/designs')).length, 30);
  for (const style of designStyles) {
    const demo = read(path.join(publicRoot, 'demos', `${style.id}.html`));
    const expectedTokens = parseDemoTokens(demo);
    const expectedHash = createHash('sha256').update(demo).digest('hex');
    const paths = [
      path.join(publicRoot, 'markdown/styles', `${style.id}.md`),
      path.join(publicRoot, 'markdown/styles', style.id, 'DESIGN.md'),
      path.join(skillRoot, 'references/styles', `${style.id}.md`),
      path.join(skillRoot, 'references/designs', `${style.id}.md`),
    ];
    for (const file of paths) {
      const doc = read(file);
      const meta = metadata(doc);
      assert.equal(meta.style_id, style.id, file);
      assert.equal(meta.study_version, specVersion, file);
      assert.equal(meta.delivery_schema_version, '1', file);
      assert.equal(meta.demo_sha256, expectedHash, file);
      assert.equal(meta.source_url, `${origin}/style/${style.id}`, file);
      assert.equal(meta.demo_url, `${origin}/demos/${style.id}.html`, file);
      assert.deepEqual(parseDemoTokens(doc), expectedTokens, `${file}: actual complete :root values`);
      assert.ok(doc.includes(styleSpecs[style.id].composition.zh));
      assert.ok(doc.includes(styleSpecs[style.id].composition.en));
    }
  }
});

test('agent indexes discover every style and lasting design baseline, and their local links resolve', () => {
  const index = read(path.join(publicRoot, 'markdown/index.md'));
  const llms = read(path.join(publicRoot, 'llms.txt'));
  const full = read(path.join(publicRoot, 'llms-full.txt'));
  for (const style of designStyles) {
    assert.ok(index.includes(`${origin}/markdown/styles/${style.id}.md`));
    assert.ok(index.includes(`${origin}/markdown/styles/${style.id}/DESIGN.md`));
    assert.ok(llms.includes(`${origin}/markdown/styles/${style.id}.md`));
    assert.ok(full.includes(read(path.join(publicRoot, 'markdown/styles', `${style.id}.md`))));
    assert.ok(full.includes(read(path.join(publicRoot, 'markdown/styles', style.id, 'DESIGN.md'))));
  }
  const docs = [...exportedFiles(path.join(publicRoot, 'markdown')), path.join(publicRoot, 'llms.txt'), path.join(publicRoot, 'llms-full.txt')];
  for (const file of docs) {
    for (const [, href] of read(file).matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) {
      const url = new URL(href, `${origin}/${path.relative(publicRoot, file)}`);
      const pathname = url.pathname.startsWith(BASE_PATH) ? url.pathname.slice(BASE_PATH.length - 1) : url.pathname;
      if (url.origin !== origin || !/^\/(?:markdown\/|demos\/|llms[^/]*\.txt$|skill\.md$)/.test(pathname)) continue;
      assert.ok(statSync(path.join(publicRoot, decodeURIComponent(pathname))).isFile(), `${file}: ${href}`);
    }
  }
  for (const file of exportedFiles(path.join(skillRoot, 'references'))) {
    for (const [, href] of read(file).matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) {
      if (/^(?:https?:|\/)/.test(href)) continue;
      assert.ok(statSync(path.resolve(path.dirname(file), href)).isFile(), `${file}: ${href}`);
    }
  }
});

test('catalog tradeoffs are bilingual and contain no unsupported outcome or popularity claims', () => {
  const unsupported = /FCP\s*<|首屏加载\s*<|转化率|market-proven conversion|high conversion|永不过时|\d+年(?:后依然|不过时)|timeless|built-in social virality|社交分享率高|社交媒体分享率高|获奖作品常客|regular award winner|当前非常流行|latest design direction|near-zero usability|可用性几乎为零|WCAG 不达标|WCAG non-compliant/i;
  for (const style of designStyles) {
    for (const key of ['tags', 'features', 'useCases', 'pros', 'cons', 'examples', 'pitfalls']) {
      assert.equal(style[key].length, style[`${key}En`].length, `${style.id}: ${key}`);
    }
    assert.ok(!style.tags.some((tag) => ['热门', '流行'].includes(tag)), style.id);
    assert.ok(!style.tagsEn.some((tag) => ['Hot', 'Trendy'].includes(tag)), style.id);
    assert.doesNotMatch(JSON.stringify(style), unsupported, style.id);
    assert.doesNotMatch(read(path.join(publicRoot, 'markdown/styles', `${style.id}.md`)), unsupported, style.id);
  }
});

test('regeneration is deterministic without time-based version drift', () => {
  const files = [
    ...exportedFiles(path.join(publicRoot, 'markdown')),
    ...exportedFiles(path.join(skillRoot, 'references')),
    path.join(skillRoot, 'SKILL.md'),
    ...['skill.md', 'llms.txt', 'llms-full.txt'].map((name) => path.join(publicRoot, name)),
  ];
  const before = files.map((file) => createHash('sha256').update(readFileSync(file)).digest('hex'));
  build();
  assert.deepEqual(files.map((file) => createHash('sha256').update(readFileSync(file)).digest('hex')), before);
});

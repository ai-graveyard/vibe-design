import test from 'node:test';
import assert from 'node:assert/strict';
import site from '../../cloudflare/site-worker.js';
import redirect from '../../cloudflare/redirect-worker.js';

test('legacy redirect preserves path and query on a fixed destination', () => {
  for (const path of ['/', '/style/apple?lang=en', '//outside.example/test?x=1', '/demos/apple.html']) {
    const response = redirect.fetch(new Request(`https://design-vibes.v2ai.org${path}`));
    const target = new URL(response.headers.get('Location'));
    const source = new URL(`https://design-vibes.v2ai.org${path}`);
    assert.equal(response.status, 301);
    assert.equal(target.origin, 'https://v2ai.org');
    assert.equal(target.pathname, `/vibe-design${source.pathname}`);
    assert.equal(target.search, source.search);
  }
});

test('base path redirects once and keeps query parameters', async () => {
  const response = await site.fetch(new Request('https://v2ai.org/vibe-design?lang=en'), {});
  assert.equal(response.status, 308);
  assert.equal(response.headers.get('Location'), 'https://v2ai.org/vibe-design/?lang=en');
});

test('SPA deep links use the mounted asset index', async () => {
  let fetched;
  const response = await site.fetch(new Request('https://v2ai.org/vibe-design/compare/apple/swiss?mode=content'), {
    ASSETS: { fetch: async request => { fetched = request; return new Response('shell'); } },
  });
  assert.equal(await response.text(), 'shell');
  assert.equal(new URL(fetched.url).pathname, '/vibe-design/');
});

test('missing assets, secret paths and unsupported methods do not receive the SPA shell', async () => {
  for (const path of ['/assets/missing.js', '/.env', '/.git/config', '/markdown/missing.md']) {
    const response = await site.fetch(new Request(`https://v2ai.org/vibe-design${path}`), {});
    assert.equal(response.status, 404);
  }
  const response = await site.fetch(new Request('https://v2ai.org/vibe-design/project', { method: 'POST' }), {});
  assert.equal(response.status, 405);
});

test('similarly named main-site paths pass through with their original request', async t => {
  const request = new Request('https://v2ai.org/vibe-designer?keep=1');
  let forwarded;
  t.mock.method(globalThis, 'fetch', async value => { forwarded = value; return new Response('main site'); });
  const response = await site.fetch(request, {});
  assert.equal(await response.text(), 'main site');
  assert.equal(forwarded, request);
});

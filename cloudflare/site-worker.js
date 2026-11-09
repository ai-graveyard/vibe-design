const BASE = '/vibe-design';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // The route wildcard also matches sibling names. Pass those to the main site.
    if (url.pathname !== BASE && !url.pathname.startsWith(`${BASE}/`)) {
      return fetch(request);
    }

    if (url.pathname === BASE) {
      url.pathname = `${BASE}/`;
      return Response.redirect(url.toString(), 308);
    }

    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return new Response('Method not allowed', { status: 405, headers: { Allow: 'GET, HEAD' } });
    }

    // Existing assets and per-page SEO shells are served before this handler.
    // Missing files stay 404; extensionless app routes receive the React shell.
    const relative = url.pathname.slice(BASE.length);
    if (relative.split('/').some(part => part.startsWith('.')) || /\.[^/]+\/?$/.test(relative)) {
      return new Response('Not found', { status: 404 });
    }

    url.pathname = `${BASE}/`;
    return env.ASSETS.fetch(new Request(url, request));
  },
};

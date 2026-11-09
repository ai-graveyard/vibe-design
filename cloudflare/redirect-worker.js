export default {
  fetch(request) {
    const source = new URL(request.url);
    // Assign the pathname, rather than resolving it as a URL, to prevent open redirects.
    const target = new URL('https://v2ai.org/vibe-design/');
    target.pathname = `/vibe-design${source.pathname}`;
    target.search = source.search;
    return Response.redirect(target.toString(), 301);
  },
};

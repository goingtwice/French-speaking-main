/**
 * Optional Cloudflare Worker — Forvo CORS proxy
 * ---------------------------------------------------------------------------
 * Forvo's API does not send CORS headers, so a browser-only app cannot call it
 * directly. This Worker forwards the request and adds the headers. It also
 * keeps your Forvo key OFF the device: set it as a Worker secret and leave the
 * key box in the app's settings blank-but-non-empty (any placeholder), or
 * better, set FORVO_KEY here and the Worker ignores whatever the app sends.
 *
 * Deploy:
 *   npm i -g wrangler
 *   wrangler login
 *   wrangler deploy worker/forvo-proxy.js --name forvo-proxy --compatibility-date 2026-01-01
 *   wrangler secret put FORVO_KEY        # optional but recommended
 *   wrangler secret put ALLOW_ORIGIN     # e.g. https://<you>.github.io
 *
 * Then in the app: Settings → paste the Worker URL into the proxy field.
 * (The app builds  <proxy>/key/<k>/format/json/action/... )
 */

const CACHE_SECONDS = 60 * 60 * 24 * 30; // pronunciations never change

export default {
  async fetch(request, env) {
    const allow = env.ALLOW_ORIGIN || '*';

    const cors = {
      'Access-Control-Allow-Origin': allow,
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Vary': 'Origin'
    };

    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    if (request.method !== 'GET') return new Response('GET only', { status: 405, headers: cors });

    const url = new URL(request.url);
    let path = url.pathname.replace(/^\/+/, '');

    // Only ever forward Forvo's own path shape.
    if (!/^key\/[^/]+\/format\/json\/action\/[A-Za-z-]+\//.test(path)) {
      return new Response(JSON.stringify({ error: 'unexpected path' }), {
        status: 400, headers: { ...cors, 'Content-Type': 'application/json' }
      });
    }

    // Server-side key wins, so the device never has to hold it.
    if (env.FORVO_KEY) path = path.replace(/^key\/[^/]+\//, 'key/' + env.FORVO_KEY + '/');

    const target = 'https://apifree.forvo.com/' + path;
    const cacheKey = new Request(target, { method: 'GET' });
    const cache = caches.default;

    let res = await cache.match(cacheKey);
    if (!res) {
      const upstream = await fetch(target, {
        headers: { 'User-Agent': 'prononce-qc/1.0 (personal study app)' }
      });
      const body = await upstream.text();
      res = new Response(body, {
        status: upstream.status,
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=' + CACHE_SECONDS }
      });
      if (upstream.ok) await cache.put(cacheKey, res.clone());
    }

    const out = new Response(res.body, res);
    for (const [k, v] of Object.entries(cors)) out.headers.set(k, v);
    return out;
  }
};

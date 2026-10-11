/**
 * Cloudflare Worker – Replicate API proxy
 * Deploy this free worker so GitHub Pages can call Real-ESRGAN without CORS errors.
 *
 * Setup:
 * 1. Go to https://dash.cloudflare.com → Workers & Pages → Create Worker
 * 2. Paste this code, deploy
 * 3. Copy your worker URL (e.g. https://ai-image-proxy.YOUR_SUBDOMAIN.workers.dev)
 * 4. Put that URL in the AI page Worker URL field and click Save Token
 */

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export default {
  async fetch(request, env, ctx) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    const url = new URL(request.url);
    const path = url.pathname;

    try {
      if (request.method === 'POST' && (path === '/enhance' || path === '/')) {
        const body = await request.json();
        const { token, image, scale, face_enhance } = body;

        if (!token) return json({ error: 'Missing Replicate API token' }, 400);
        if (!image) return json({ error: 'Missing image' }, 400);

        const version = 'b3ef194191d13140337468c916c2c5b96dd0cb06dffc032a022a31807f6a5ea8';

        const res = await fetch('https://api.replicate.com/v1/predictions', {
          method: 'POST',
          headers: {
            'Authorization': 'Token ' + token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            version,
            input: {
              image,
              scale: scale || 4,
              face_enhance: face_enhance !== false,
            },
          }),
        });

        const data = await res.json();
        if (!res.ok) {
          const msg = data.detail || data.error || data.title || ('Replicate error ' + res.status);
          return json({ error: typeof msg === 'string' ? msg : JSON.stringify(msg) }, res.status);
        }
        return json(data);
      }

      if (request.method === 'POST' && path === '/status') {
        const body = await request.json();
        const { token, predictionId } = body;

        if (!token || !predictionId) {
          return json({ error: 'Missing token or predictionId' }, 400);
        }

        const res = await fetch('https://api.replicate.com/v1/predictions/' + predictionId, {
          headers: { 'Authorization': 'Token ' + token },
        });

        const data = await res.json();
        if (!res.ok) {
          const msg = data.detail || data.error || ('Poll error ' + res.status);
          return json({ error: typeof msg === 'string' ? msg : JSON.stringify(msg) }, res.status);
        }
        return json(data);
      }

      return json({
        ok: true,
        message: 'AI Image Clearer proxy. POST /enhance or POST /status',
      });
    } catch (err) {
      return json({ error: err.message || 'Worker error' }, 500);
    }
  },
};

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...CORS_HEADERS,
    },
  });
}

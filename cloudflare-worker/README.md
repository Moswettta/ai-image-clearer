# Cloudflare Worker Proxy (for GitHub Pages AI)

This free worker lets the AI Image Clearer work on **GitHub Pages** by proxying Replicate API calls (avoids CORS).

## Deploy in 3 minutes

1. Open https://dash.cloudflare.com and sign in (free account is enough)
2. Go to **Workers & Pages** → **Create** → **Create Worker**
3. Delete the default code and paste the contents of `worker.js`
4. Click **Deploy**
5. Copy your worker URL, for example:
   `https://ai-image-proxy.YOUR_NAME.workers.dev`

## Connect it to the app

1. Open the AI page on GitHub Pages
2. Paste your worker URL in the **Cloudflare Worker URL** field
3. Paste your Replicate token
4. Click **Save Token**
5. Upload an image and enhance

## Endpoints

| Method | Path      | Body                                      |
|--------|-----------|-------------------------------------------|
| POST   | /enhance  | `{ token, image, scale, face_enhance }`   |
| POST   | /status   | `{ token, predictionId }`                 |

Both return JSON and include CORS headers so the browser can call them from GitHub Pages.

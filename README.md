# AI Image Clearer

Turn blurry photos into clearer, higher-resolution images.

**Live site:** https://imagecleanerr.netlify.app

## Files

| File | Description |
|------|-------------|
| `index.html` | Landing page |
| `local-image-enhancer.html` | **Free offline** upscaler (recommended for most users) |
| `ai-image-clearer.html` | Paid Real-ESRGAN AI version (best quality) |
| `netlify/functions/` | Proxy functions for the AI version |
| `netlify.toml` | Netlify config |

## Free Offline Version (recommended)

Open `local-image-enhancer.html` or choose **Free Offline Enhancer** on the home page.

Features:
- Real upscaling: 1x / 2x / 3x / 4x (720p → 1440p / 2160p / higher)
- Three modes: **Natural**, **X-Ray Detail**, **Soft**
- Better color handling and cleaner edges
- 100% free, offline, no API key, no credits, no limits

How to use:
1. Upload image
2. Choose scale (try 2x or 3x)
3. Choose mode (Natural or X-Ray Detail)
4. Choose strength (Medium)
5. Click **Enhance & Upscale** → Download

## AI Version (Real-ESRGAN)

Best possible quality, but requires Replicate credits.

1. Open `ai-image-clearer.html`
2. Get token: https://replicate.com/account/api-tokens
3. Paste token and save
4. Upload image, choose scale + face enhancement
5. Click **Enhance with AI**

Uses Netlify Functions as a proxy (avoids CORS issues).

## Deployment

- **Netlify**: Already connected. Just push to `main`.
- **GitHub Pages**: Settings → Pages → Deploy from `main` / root

## Repository

https://github.com/Moswettta/ai-image-clearer

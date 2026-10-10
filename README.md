# AI Image Clearer

Turn blurry photos into clear, sharp images.

**Live demo / deployment ready** via `index.html`

## Files

| File | Description |
|------|-------------|
| `index.html` | Landing page (entry point for deployment) |
| `ai-image-clearer.html` | Real AI version (Real-ESRGAN + GFPGAN via Replicate) |
| `local-image-enhancer.html` | Fully offline canvas-based enhancer |
| `README.md` | This file |

## Deployment

This project is ready for static hosting:

- **GitHub Pages**: Enable Pages on the `main` branch (root).  
  Your site will be available at `https://Moswettta.github.io/ai-image-clearer/`
- **Netlify / Vercel / Cloudflare Pages**: Just connect the repository. The `index.html` is the entry point.

## How to use the AI version (recommended)

1. Open the site or `ai-image-clearer.html`
2. Get a free API token: https://replicate.com/account/api-tokens
3. Paste the token and click **Save Token**
4. Upload a blurry image
5. Choose scale (2x or 4x) and face enhancement
6. Click **Enhance with AI**
7. Wait 10–40 seconds, then download the result

Notes:
- Free Replicate credits are enough for personal use
- Token is stored only in your browser (localStorage)
- Keep images under ~8 MB for best results

## How to use the local version

1. Open `local-image-enhancer.html`
2. Upload an image
3. Choose strength and click Enhance
4. Download the result

Works completely offline. No API key required.

## Repository

https://github.com/Moswettta/ai-image-clearer

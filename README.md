# AI Image Clearer

Two ready-to-use HTML tools to turn blurry images into clearer versions.

## Files

1. **ai-image-clearer.html**  
   Real AI enhancement using Real-ESRGAN + GFPGAN via the Replicate API.  
   Much stronger results (true deblurring / super-resolution).  
   Requires a free Replicate API token.

2. **local-image-enhancer.html**  
   Fully offline version. Uses canvas-based unsharp mask, contrast, and mild denoising.  
   No internet or API key needed. Weaker than the AI version but instant and private.

## How to use the AI version (recommended)

1. Open `ai-image-clearer.html` in Chrome, Edge, or Firefox.
2. Get a free API token: https://replicate.com/account/api-tokens
3. Paste the token and click "Save Token".
4. Upload a blurry image.
5. Choose scale (2x or 4x) and whether to enable face enhancement.
6. Click "Enhance with AI".
7. Wait 10–40 seconds, then download the result.

Notes:
- Free Replicate credits are enough for personal use.
- Token is stored only in your browser localStorage.
- Large images may take longer or cost more credits.
- For best results keep input under ~8 MB.

## How to use the local version

1. Open `local-image-enhancer.html` in any modern browser.
2. Upload an image.
3. Choose strength and click Enhance.
4. Download the result.

Works completely offline.

## GitHub

Repository: https://github.com/Moswettta/ai-image-clearer

# Lumora for iPhone — PWA 1.0

Arabic, touch-first photo/video editor that runs on the device. This is an installable Safari web app, not an IPA. The Windows C# application remains separate.

## Run

Serve `dist/` on HTTPS (localhost is allowed for development). No build step, npm install, API key, server upload, or external runtime CDN is required. All runtime dependencies are bundled. Use a static server that serves `.mjs` as JavaScript and `.wasm` as `application/wasm`.

On iPhone, open the deployed URL in Safari, sign in to the same ChatGPT account if prompted, then Share → Add to Home Screen → Open as Web App → Add. Use a recent Safari/iOS version (iOS 17 or later recommended).

## Included

- IndexedDB originals, thumbnails, recipes, library deletion, undo/redo.
- WebGL photo/video color rendering; worker-generated 16³ color LUT; exposure, tone, WB, HSL, curves, grading, grain, vignette, detail.
- 2000 original Lumora filters in 20 categories, with previews before application, strength, local user looks, `.lumoralook` files.
- Local U2NetP segmentation (320² model input), subject move/scale/pinch, 26 backgrounds or user image, transparent PNG, portrait background blur.
- Interactive crop, rotation/flips, one movable local brush/radial adjustment mask.
- Original video import without recompression; color/filter/crop preview, trim, volume, real-time canvas/audio recording.
- Standalone manifest, icons, safe-area layout, reduced-motion splash, service-worker offline shell and optional on-demand model cache.

## Limits and privacy

Images and video stay on the device. There is no media upload endpoint or analytics. Access to the private hosted interface uses Sites login separately. Browser storage is not backup and may be evicted.

Image previews use at most a 1800-pixel source side. Export decodes originals within a 4MP or 12MP total source budget; cropping may produce fewer pixels. Large imports depend on Safari's decoder/memory. Video preview needs a supported codec and GPU texture size; export is real time, up to a 1080-pixel long side / requested 30fps / 120 seconds, with audio, in MP4 or the browser-supported alternative. Keep the application foregrounded. Actual recording frame cadence depends on the device. There is no RAW, HDR, XMP, native iOS integration or cloud sync. `.lumoralook` is independent of desktop `.lumorapreset`.

The lightweight model is a generic foreground segmenter, not a guarantee of hair-perfect person isolation. Check the result and adjust edges. Video segmentation and video local masks are not included.

## Implementation

`app.mjs`: UI and media lifecycle; `engine.mjs`: pure color/crop/preset math; `gpu.mjs`: WebGL renderer; `color-worker.mjs`: LUT work; `ai-worker.mjs`: ONNX inference; `storage.mjs`: IndexedDB; `sw.js`: offline assets. ONNX Runtime Web 1.31.1 (WASM, one thread) and U2NetP are self hosted in `vendor/`.

## Validation

See the delivered validation report. Automated Chromium mobile-size and desktop checks passed; PNG alpha and a decoded recording with audio were inspected. Twenty C# reference color cases matched byte-for-byte in the pure JS color engine. No physical iPhone/Safari hardware verification was available in this Windows session. This distinction matters especially for HEIC decoding, sharing, storage eviction, video codecs, and recording performance.

## Licenses

See `dist/licenses/`. The model checksum (SHA-256) is `309c8469258dda742793dce0ebea8e6dd393174f89934733ecc8b14c76f4ddd8`.

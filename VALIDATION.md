# Validation — Lumora iPhone PWA 1.0

Validated on Windows on 3 November 2026 using installed Chrome/Chromium with a 390×844 touch/mobile viewport, plus 1280×900 desktop. No physical iPhone or native Safari run was available.

Passed:

- 2000 presets, 20 families, 100 per family; 2000 distinct serialized recipes; all recipes pass the preset input validator.
- 20 C# color-reference cases (RGB pixels): maximum absolute channel error 0 in the pure JS color implementation. GPU LUT interpolation is approximate, rather than byte-identical.
- 1000 crop bounds cases, maximum export pixel budget, preset application preserves spatial edits; malformed preset structures/nonfinite numbers rejected.
- Sample import and GPU rendering; actual exposure edit, undo/redo; thumbnail previews; filter preview/cancel/apply; square crop.
- JPEG export/download and automatic dialog close. PNG export from actual U2NetP inference: 620×930, 430727 fully transparent pixels, 127142 fully opaque pixels. Foreground was visually inspected.
- IndexedDB persistence after reload, offline app shell and stored media after network disable, library deletion, responsive layout without horizontal document overflow.
- Local ONNX/WASM inference ran successfully without a media upload.
- Movable radial mask: pointer drag updates and persists the mask position.
- Subject movement/scale and product backdrop selection; user-supplied background persists as a 66746-byte Blob; portrait activation; preview remains fixed while the tool panel scrolls. Deterministic synthetic matte used for these composition checks; actual model inference checked separately.
- Real-time edited video recording with a filter applied: decoded 320×240 MP4, video duration 2.985438s, audio duration 2.986333s, measured audio RMS 0.257. Original input approximately 3 seconds. Both audio and video tracks present and decoding works.
- Main integration run: 13 UI groups passed, no page/console errors recorded. Additional touch/composition checks passed. Syntax checks passed for application, renderer and service worker.

Limitations: real iPhone codec/share/persistence behavior, HEIC on-device decoding, memory pressure, physical two-finger gestures, long exports, and performance on slow phones remain unverified. The lightweight segmentation model can leave halos or lose fine detail. This report does not imply complete Lightroom parity or zero possible errors.

Run the portable color/preset/crop checks with `node validate.mjs`. The C# pixel fixture is included under `tests/`.

# Fix favicon corners (transparent background)

## Problem

The current `public/favicon.png` has white pixels outside the rounded purple square, so the corners show as white blocks in the browser tab instead of blending with the tab background.

## Approach

Re-cut the existing favicon so everything outside the rounded purple square is fully transparent, keeping the baht mark and purple square exactly as-is.

## Steps

1. Take the existing favicon asset (stylised Thai baht on the Midnight Card purple square).
2. Produce a version with a transparent background outside the rounded square — via background removal on the source image, or by compositing the square against a rounded-rectangle alpha mask if removal leaves white fringing.
3. Downscale to a 64x64 square PNG with the alpha channel preserved and overwrite `public/favicon.png`.
4. Verify the corner pixels are fully transparent (alpha = 0) and that `/favicon.png` still serves 200.

## Notes

- No change needed in `src/routes/__root.tsx`; it already points at `/favicon.png` with `type: "image/png"`.
- No other site changes in scope.

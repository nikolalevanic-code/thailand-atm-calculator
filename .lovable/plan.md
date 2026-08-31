# Design a new favicon

## Context

The site currently serves the default Lovable favicon at `public/favicon.ico`, referenced from `src/routes/__root.tsx` as `/favicon.ico`. The user wants a custom favicon on a solid Midnight Card background, with either a stylised Thai baht symbol or a purple abstract mark.

## Approach

Generate three favicon concepts, present them for choice, then produce the final asset and wire it into the root route.

## Steps

1. Generate three 1024x1024 favicon source images:
   - Option A: Stylised Thai baht (฿) mark on a solid Midnight Card purple/navy background.
   - Option B: Abstract purple geometric/card-shaped mark on a solid Midnight Card background.
   - Option C: Minimalist ATM/card + baht fusion icon on a solid Midnight Card background.
2. Present all three options inline for the user to pick.
3. Downscale the chosen source to a 64x64 square PNG with transparent padding where needed, save as `public/favicon.png`.
4. Delete `public/favicon.ico` so the old default does not keep being served.
5. Update `src/routes/__root.tsx` to link to `/favicon.png` with `type: "image/png"`.
6. Verify the new favicon loads and renders in the browser tab.

## Notes

- Keep the design simple and high-contrast so it reads at 16x16px in a browser tab.
- The Midnight Card palette is bg #12102A / surface #241C4A / primary #9D7BEA / light #E8E0FF.
- No other site changes are in scope.

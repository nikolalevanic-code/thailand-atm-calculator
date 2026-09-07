# Match the headline text style on the result panel

The top line still looks different because it is set in ALL CAPS with wide letter spacing, so even at the same size it reads as a different typeface than the line below it.

## Change

In the result panel, the line "Always choose "decline currency conversion"!":

- Remove the all-caps treatment and the wide letter spacing
- Set it to normal sentence case, matching the "By choosing no, you'll save on this withdrawal..." line
- Keep it bold and purple so it still stands out
- Size it one step larger (16px) than the line below (14px), as requested

## Technical detail

`src/components/calculator/ResultPanel.tsx`, line 44: replace `text-sm font-bold uppercase tracking-[0.18em] text-primary` with `text-base font-bold text-primary`.

# Emotionally-driven SERP title rewrite to boost CTR

## Current state
- All 8 public routes now have per-route `head()` titles and descriptions.
- Current titles are accurate but informational; they read like reference articles rather than urgent, click-worthy results.
- Search Console data shows the site ranks around position 6.7 with a 0.34% average CTR — a classic signal that metadata can outperform rankings.

## Goal
Rewrite every SERP title to trigger curiosity, loss aversion, or the fear of overpaying, while still matching search intent and staying truthful. The calculator and detailed guides provide the trust factor, so the title can be more sensationalist to win the click.

## Proposed title rewrites

| Route | Current title | Proposed emotionally-driven title |
|---|---|---|
| `/` | Thailand ATM Fee Calculator — See What a Withdrawal Really Costs | Stop Paying Insane Hidden Fees at Thai ATMs — See the Real Cost |
| `/blog/` | Thailand ATM & Money Guides (2026) \| Thailand ATM Calculator | Don't Let Thai ATMs Rob You: 2026 Fee Guides & Money Hacks |
| `/blog/thailand-atm-fees` | Thailand ATM Fees (2026): 250–350 THB Fee + Conversion Costs | The 3 Hidden Fees Thai ATMs Charge Foreigners (And How to Beat Them) |
| `/blog/thailand-atm-withdrawal-limit` | Thailand ATM Withdrawal Limits (2026): 20,000 THB Per Transaction Explained | Why Small Withdrawals in Thailand Are Costing You a Fortune |
| `/blog/thailand-atm-no-fee` | How to Withdraw Money in Thailand Without Fees (2026): Best Cards & Strategy | How to Withdraw Cash in Thailand Without Getting Ripped Off |
| `/blog/best-atm-thailand-foreigners` | Best ATMs in Thailand for Foreigners (2026): Fees, Limits & DCC | The Best ATMs in Thailand for Foreign Cards (Avoid the Tourist Traps) |
| `/blog/wise-revolut-thailand` | Wise vs Revolut for Thailand (2026): Fees, ATM Limits & Which to Choose | Wise vs Revolut in Thailand: Which One Actually Saves You Money? |
| `/blog/how-much-cash-thailand` | How Much Cash to Bring to Thailand in 2026: Daily Budget by Travel Style | How Much Cash You Actually Need in Thailand (Don't Over-Withdraw) |

## Why these work
- **Loss aversion**: "Stop Paying", "Rob You", "Ripped Off", "Costing You" frame the click as avoiding a loss rather than gaining information.
- **Curiosity gap**: "3 Hidden Fees", "The Real Cost", "Which One Actually Saves You" create an open loop the user wants closed.
- **Specificity**: numbers ("3 Hidden Fees", "2026") and concrete outcomes ("Real Cost") increase perceived relevance.
- **Truthful sensationalism**: every claim is backed by the article content; no clickbait that the page cannot deliver.

## Implementation
1. Update the `TITLE` constant in `src/routes/index.tsx` and `src/routes/blog.index.tsx`.
2. Update the `title` prop passed to `<BlogLayout>` and the matching `title` in each article route's `head()` export.
3. Optionally tighten descriptions to match the new emotional framing (descriptions stay informational but can echo the loss-aversion hook).
4. Run a TypeScript check and trigger an SEO scan.
5. After the changes are live, monitor Search Console CTR for each URL to validate the lift.

## Out of scope
- No changes to page content, URLs, or visual design.
- No new pages or redirects.

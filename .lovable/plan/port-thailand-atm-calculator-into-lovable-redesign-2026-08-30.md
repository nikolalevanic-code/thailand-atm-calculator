# Port Thailand ATM Calculator into Lovable + redesign

## What I found in your source

Your Manus project is a React 19 + Vite SPA using `wouter` for routing and a small Express server that rewrites SEO meta tags per route. The substance lives in a handful of files:

- `lib/calculator.ts` (187 lines) — the pure calculation engine. Card-network multiplier `0.978`, DCC multiplier `0.930`, both calibrated from a real CommBank transaction. Handles multi-transaction splitting when the withdrawal exceeds the ATM limit, and cross-currency fixed fees.
- `lib/cardData.ts` + `data/cards_database.json` (92 KB) — 102 cards across 16 currencies, plus per-currency default fee profiles ("Big 4 bank average", etc.).
- `lib/fxRate.ts` — live THB rates from `open.er-api.com` with a 12-hour localStorage cache, a secondary API fallback, and hardcoded last-resort rates.
- 7 content pages: home + blog index + 6 SEO articles (ATM fees, withdrawal limits, no-fee withdrawals, best ATM, Wise vs Revolut, how much cash).
- Components: `Calculator`, `BankCardSelector`, `ResultsTable`, `RecommendationBox`, `TipsSection`, `FAQ`, `BankRequestModal`, `BlogLayout`, `ArticleCalculatorCta`.
- Existing design tokens: SCB purple `#4A1E8C`, teal-green "better", amber "worse", DM Serif Display / DM Sans / DM Mono.

## Approach

Port the logic verbatim, rebuild the presentation. The calculation engine, card database, and FX fetcher are good and business-critical — they move across unchanged. Everything visual gets rebuilt against a new design direction.

### Technical migration

| From (Manus) | To (Lovable) |
| --- | --- |
| `wouter` + `App.tsx` switch | TanStack Router file routes under `src/routes/` |
| Express meta-tag rewriting | Route `head()` — real SSR metadata, better for SEO |
| `client/src/lib/*` | `src/lib/*` unchanged |
| `cards_database.json` | `src/data/` unchanged |
| Client-side FX fetch | Server function with server-side caching, so rates aren't refetched per visitor and the rate is in the SSR'd HTML |

Route map: `/`, `/blog`, and the six `/blog/<slug>` article paths — all preserved exactly so existing Google rankings and your sitemap stay valid.

### SEO and revenue

Since traffic and monetization are the point:

- Every route gets its own `head()` with title, description, og, and twitter tags — carried over from your Express `ROUTE_META` map.
- Add JSON-LD: `FAQPage` on the home FAQ, `Article` on each blog post, `WebApplication` on the calculator.
- Server-rendered content means crawlers see the full page, not an empty SPA shell — a real improvement over the current setup.
- Reserve explicit ad/affiliate slots in the layout rather than retrofitting later: below the results card (highest intent — the user has just seen what a bad card costs them), in the desktop sidebar, and between blog article sections. These render as empty containers for now.
- The results panel gets a "better card" affiliate hook: when the user's selected card is expensive, surface a comparison slot. This is the natural conversion point.

### Design

Your inspirations point at precision-instrument fintech: Cryonex's dense data cards, the credit-card app's tactile motion, Run Payments' clean confident typography. Purple stays as the brand anchor.

Flow improvements I'd suggest:
- Result first. The number people came for should be visible without scrolling — inputs sit alongside or above a persistently visible result, not below a form.
- Make the savings figure the hero of the result, with the breakdown table collapsed by default and expandable. Right now the table competes with the headline number.
- The card selector is the highest-value input (it changes the answer most) but is currently marked optional and buried. Promote it.
- Keep the Pad Kra Pao comparison — it's memorable and shareable, which matters for traffic.

Before building I'll capture your current site, ask you to pick a palette, type pairing, and layout, then generate three rendered directions for you to choose from.

## Steps

1. Port `calculator.ts`, `cardData.ts`, `cards_database.json`, and `fxRate.ts` into the Lovable project; convert the FX fetcher to a server function.
2. Capture the live site, ask the three visual preference questions, generate three design directions, and get your pick.
3. Build the home route with the redesigned calculator, results, tips, FAQ, and guides sections.
4. Build the blog index and six article routes with the redesigned layout.
5. Add per-route `head()` metadata, JSON-LD, sitemap, and robots.
6. Place the reserved ad/affiliate containers.
7. Verify: build passes, calculations match the live site for sample inputs, all eight routes render, responsive layout works.

## Notes

- `Map.tsx` and `ManusDialog.tsx` are Manus-platform artifacts and won't be ported.
- `BankRequestModal` currently has no backend. I'll carry the UI across; wiring it to store submissions would need Lovable Cloud — a separate decision.
- The FX API is keyless and free-tier, so no secrets are needed.

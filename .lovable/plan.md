# Show that home-bank withdrawal fees are already included

## Short answer to the Reddit comment

Yes — the calculator already includes home-bank withdrawal fees. Each card in the database carries:

- a fixed foreign-ATM fee (e.g. Wise AUD 1.50, Wise GBP 0.50)
- a percentage foreign-ATM fee (e.g. Wise AUD 1.75%, Wise GBP 2.69%, Revolut 2%)
- a foreign transaction / FX markup percentage

All three are applied on top of the Thai machine fee and the FX-rate margin, and they already appear in the "Show the full breakdown" table as "Card fixed fee", "Card percentage fee" and "Foreign transaction fee".

The real problem is that this is invisible until someone expands the breakdown, and we never show where the numbers came from. We do have sources: every one of the 102 cards has a `source_url`, `source_label`, `last_verified_date`, `confidence_level` and free-text `notes` — none of which is currently rendered anywhere in the app.

## What to build

1. **Fee-inclusion line in the result panel (always visible)**
   Under the savings headline, a short line such as: "Includes your bank's withdrawal fees — 1.5 AUD + 1.75% for this card." Falls back to "Includes typical home-bank withdrawal fees for <currency>" when no specific card is selected.

2. **Source and freshness attribution**
   Under the breakdown table, show the card's `source_label` linked to `source_url`, plus "Last verified <date>". When the card carries `notes` (e.g. free-withdrawal allowances, regional exceptions), show them as a small caveat line.

3. **Known-limitations disclaimer**
   A compact note near the breakdown covering what the model does not capture: monthly fee-free withdrawal allowances (Wise/Revolut give a couple of free withdrawals per month), plan tiers, promotional waivers, and that the card-network / DCC margins are calibrated averages rather than a live quote.

4. **FAQ entry on the homepage**
   Add "Does this include my own bank's fees?" to the FAQ list so it also lands in the FAQ schema and can be picked up in search.

## Technical notes

- `src/components/calculator/ResultPanel.tsx` — presentation changes; needs the selected `CardProfile` passed in from `src/routes/index.tsx` (result currently carries only computed numbers).
- Optionally surface the applied fee components through `CalculationResult` instead of passing the card, if that keeps the panel simpler.
- No change to `src/lib/calculator.ts` maths — the fees are already in the formula.
- Data already present in `src/data/cards_database.json`; no new data needed.

## Open item

Modelling monthly free-withdrawal allowances (e.g. Wise's first N withdrawals free) would need a new field per card and is not part of this change — it is called out in the disclaimer instead.

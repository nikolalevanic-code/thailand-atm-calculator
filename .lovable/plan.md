# Auto-select Visa/Mastercard from the chosen card

The card database still has a `network` field for every card, so no data needs to come from Manus.

## Behaviour

When you pick a bank card, the "Card network" toggle (and therefore the Thai ATM fee, 250 THB Visa / 350 THB Mastercard) switches automatically:

- Network is `Visa` (or Visa-first combos like `Visa/Mastercard`, `Girocard/Visa`, `Plus/Cirrus (Visa/Mastercard)`) → select Visa
- Network is `Mastercard` (or Mastercard-first combos like `Mastercard/Visa`, `Mastercard/Maestro/Cirrus`) → select Mastercard
- Network is neither (UnionPay, Mir, JCB) → leave the current selection untouched

You can still tap the toggle afterwards to override; the override sticks until you change cards again. Clearing the card back to "Typical card" leaves the toggle as-is.

## Technical detail

- Add a small `networkToAtmFee(network: string)` helper (in `src/lib/calculator.ts`) that normalises the network string and returns `THAI_ATM_FEE_VISA`, `THAI_ATM_FEE_MASTERCARD`, or `null`.
- In `src/routes/index.tsx`, in the card-change handler, look up the selected card in `allCards` and call `setAtmFee` when the helper returns a fee. No change to the calculation engine or to `AtmSettings`.

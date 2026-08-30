# Migrate thailand-atm-calculator.com from Manus to Lovable

## Goal
Recreate the Thailand ATM cost calculator in Lovable with the same core functionality, then redesign it for a cleaner, more polished UI while keeping the UX improvements I suggest.

## What the current site does
- Calculates the total cost of withdrawing Thai Baht from an ATM based on amount, home currency, card/bank, and card network.
- Compares two FX paths: "without conversion" (card network converts) vs. "with conversion" (ATM DCC).
- Shows a full fee breakdown and a "savings" callout.
- Includes tips for travelers and a share-this-result action.
- Supports 102 cards across 17 countries with live mid-market rates.

## Migration path
Lovable cannot directly import an existing GitHub repository. The cleanest path is to check out the GitHub repo you connect, inspect the code, then rebuild it inside this Lovable project while preserving the logic and data.

## Steps

1. **Acquire source code**
   - Option A (preferred): Download the project as a ZIP from Manus and attach it here.
   - Option B: Share the GitHub repository URL after connecting GitHub, and I will clone it into a temporary directory for inspection.

2. **Inspect the codebase**
   - Identify the framework, routing, styling approach, and build setup.
   - Extract the ATM fee logic, FX rate formulas, card/bank data, and any API calls.
   - Note any database schema, environment variables, or third-party integrations.

3. **Plan the rebuild**
   - Map current routes and components to TanStack Start routes and components.
   - Decide which data should be hardcoded (fee schedules, card lists) vs. fetched (live FX rates).
   - Preserve provider integrations where possible; flag any credentials or API keys that need to be added to Lovable Secrets.

4. **Rebuild in Lovable**
   - Replace the placeholder `src/routes/index.tsx` with the calculator.
   - Reimplement the calculation engine in a client-safe module or server function as needed.
   - Recreate the currency selector, card/bank selector, network toggle, settings, breakdown table, savings callout, tips, and share action.
   - Generate fresh design directions and apply a polished, travel-friendly visual direction.

5. **Verify**
   - Confirm the build succeeds and the calculator produces the same results as the live site for a few sample inputs.
   - Test responsive layout and key interactions.

## What I need from you now
Please either:
- Attach the ZIP exported from Manus, or
- Connect GitHub and paste the repository URL here.

Once I have the source, I can inspect it and start the rebuild in the next step.

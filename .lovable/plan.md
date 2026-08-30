# Migrate thailand-atm-calculator.com from Manus to Lovable

## Goal
Recreate the Thailand ATM cost calculator in Lovable with the same core functionality, then redesign it for a cleaner, more polished, conversion-focused UI that can later support affiliates and ads.

## What the current site does
- Calculates the total cost of withdrawing Thai Baht from an ATM based on amount, home currency, card/bank, and card network.
- Compares two FX paths: "without conversion" (card network converts) vs. "with conversion" (ATM DCC).
- Shows a full fee breakdown and a "savings" callout.
- Includes tips for travelers and a share-this-result action.
- Supports 102 cards across 17 countries with live mid-market rates.

## Business goal
Drive organic traffic and convert visitors. The redesign must feel trustworthy, load fast, and reserve clear zones for future affiliate links and display ads without hurting the calculator experience.

## Design direction
Inspirations: Cryonex card-heavy precision, credit-card app motion, and Run Payments' clean fintech aesthetic. Keep a purple accent as a Thailand cue. The final direction will be chosen from three rendered prototypes after I inspect the source code.

## Migration path
Lovable cannot directly import an existing GitHub repository. The repo at https://github.com/nikolalevanic-code/thailand-atm-design is private, so a direct `git clone` from the sandbox fails. The cleanest path is to get the source into the sandbox as a ZIP or public checkout, inspect it, then rebuild it inside this Lovable project.

## Steps

1. **Acquire source code**
   - Option A (preferred): Download the repository as a ZIP from GitHub and attach it here.
   - Option B: Make the repository public temporarily so I can clone it.
   - Option C: Export the project as a ZIP from Manus and attach it here.

2. **Inspect the codebase**
   - Identify the framework, routing, styling approach, and build setup.
   - Extract the ATM fee logic, FX rate formulas, card/bank data, and any API calls.
   - Note any database schema, environment variables, or third-party integrations.

3. **Design selection**
   - Capture a screenshot of the current live site.
   - Ask three visual preference questions (palette, typography, layout) using presets that fit a travel-fintech calculator.
   - Generate three rendered design directions that keep the chosen palette, type, and layout as hard constraints while varying composition, density, and emphasis.
   - Let you pick one direction to build.

4. **Rebuild in Lovable**
   - Replace the placeholder `src/routes/index.tsx` with the calculator.
   - Reimplement the calculation engine in a client-safe module or server function as needed.
   - Recreate the currency selector, card/bank selector, network toggle, settings, breakdown table, savings callout, tips, and share action.
   - Reserve ad/affiliate zones (e.g., sidebar, below results, between tips) without inserting real ads yet.
   - Apply the chosen design direction's tokens and composition exactly.

5. **Verify**
   - Confirm the build succeeds and the calculator produces the same results as the live site for a few sample inputs.
   - Test responsive layout and key interactions.

## What I need from you now
Please attach the project as a ZIP, or make the GitHub repo public temporarily, so I can inspect the source and continue to the design-selection step.


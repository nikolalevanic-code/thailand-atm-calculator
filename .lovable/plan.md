# Post-rename GitHub repo checklist

## Status
The active repo has already been renamed to `thailand-atm-calculator`. The old Manus repo should now be renamed to `thailand-atm-calc-archive`.

## Steps to finish cleanly

1. **Archive the old Manus repo** (if not done yet):
   - Open `https://github.com/<your-username>/thailand-atm-calc-archive` → Settings → General → Danger Zone.
   - Click **Archive this repository**. This makes it read-only and shows an "archived" banner.
   - Do not delete it — it preserves the project history.

2. **Update the old repo's description** (before or after archiving):
   - Set the description to something like: "Original prototype — superseded by thailand-atm-calculator".
   - Add that same line at the top of the old repo's README.

3. **Update the active repo's README archive link**:
   - In `README.md`, replace the placeholder "(or whatever the old repo is renamed to)" with the real archived repo URL: `https://github.com/<your-username>/thailand-atm-calc-archive`.

4. **Verify Lovable GitHub sync still points at `thailand-atm-calculator`**:
   - In the Lovable editor → Plus (+) menu → GitHub.
   - Confirm the connected repo is the one now named `thailand-atm-calculator`.
   - If it still shows the old name or is disconnected, reconnect it.

5. **Verify Vercel is deploying from the renamed repo**:
   - Go to the Vercel project → Git → Repository.
   - Confirm it points to `thailand-atm-calculator`.
   - Trigger a manual redeploy to confirm builds still work.

6. **Update active repo metadata on GitHub**:
   - Description: one-line summary of the calculator.
   - Website: `https://www.thailand-atm-calculator.com`.
   - Topics: e.g. `thailand`, `travel`, `fintech`, `atm-fees`, `calculator`.

7. **Smoke-test the live site**:
   - Visit `https://www.thailand-atm-calculator.com` after the next Vercel deploy.
   - Confirm the calculator loads and the latest copy changes are live.

## Risks to watch

- **Vercel not following the rename**: rare, but check the Git settings and redeploy.
- **Lovable sync disconnect**: reconnecting in the editor fixes it; do it before making new edits in Lovable.
- **README still pointing at the old repo name**: fix the archive link so reviewers don't land on a redirect.
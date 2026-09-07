# Rename GitHub repos cleanly

## Goal
Make the active Lovable-synced repo carry the `thailand-atm-calculator` name, and rename the old Manus repo so it is clearly archived, without breaking Vercel, Lovable sync, or the live site.

## Decision to make first

Option A — swap names (recommended if you want the live project at the clean URL/name):
1. Rename old Manus repo from `thailand-atm-calculator` to `thailand-atm-calc-archive`.
2. Rename active Lovable-synced repo to `thailand-atm-calculator`.
3. Reconnect Lovable's GitHub sync to the newly-named active repo.
4. Check Vercel is still deploying from the right repo/branch.

Option B — leave names as-is:
- Keep old repo named `thailand-atm-calculator` but archive it, and accept the active repo uses its current name.
- Less disruption, but the live project does not get the preferred name.

## Step-by-step (Option A)

1. **Open the old Manus repo on GitHub** → Settings → General → Repository name.
   - Change name to `thailand-atm-calc-archive`.
   - Click Rename. GitHub automatically redirects the old URL.

2. **Open the active Lovable-synced repo on GitHub** → Settings → General → Repository name.
   - Change name to `thailand-atm-calculator`.
   - Click Rename.

3. **In Lovable, reconnect GitHub sync**:
   - Editor → Plus (+) menu → GitHub → Disconnect (or manage connection).
   - Reconnect and select the repo now named `thailand-atm-calculator`.
   - Confirm the default branch is still `main` (or whatever you use).

4. **In Vercel, check the project settings**:
   - Go to the project → Git → Repository.
   - If Vercel did not follow the rename automatically, reconnect or reselect `thailand-atm-calculator`.
   - Trigger a redeploy to confirm builds still work.

5. **Update any external references**:
   - Repo description/website URL on the active repo.
   - Any badges, documentation, or social links that pointed to the old repo path.
   - The old URL will redirect, but update them for cleanliness.

6. **Archive the old repo**:
   - Old repo → Settings → General → Danger Zone → Archive this repository.
   - This makes it read-only and shows an "archived" banner.
   - Do not delete it — it preserves the project history.

## Risks and how to avoid mess

- **Vercel build breaks after rename**: usually it follows the rename, but verify in Vercel settings and trigger a manual deploy.
- **Lovable sync breaks**: reconnecting in Lovable fixes this; do it before making new edits in Lovable.
- **Old links die**: GitHub redirects repo renames, but only if you do not create a new repo with the old name. Do not create a new `thailand-atm-calc-archive` repo before the rename is complete.
- **Two repos with confusing names**: archive the old one immediately after renaming so only the active repo looks alive.

## After the rename

- Update the active repo's description, website, and topics in GitHub.
- Verify the live site `https://www.thailand-atm-calculator.com` still loads after Vercel's next deploy.
- Optionally add a short note in the active README mentioning the rebuild from the archived Manus repo.
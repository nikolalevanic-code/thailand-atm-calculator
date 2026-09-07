# Clean up GitHub into one presentable repo

## Advice on the two-repo worry

Two repos is not messy — but two *active-looking* repos is. Reviewers skim: they open your profile, see two similarly named projects, and can't tell which is real. The fix isn't merging them, it's making one obviously the product and the other obviously history.

Recommended: keep one active repo (this Lovable-synced one, since it's what's live on Vercel), archive the Manus one. Archiving marks it read-only with a banner on GitHub, keeps your earlier commit history visible as evidence of the work, and removes any ambiguity about which is current. Deleting is worse — you lose the origin story, and a single-repo profile with no history looks thinner, not cleaner.

If you'd rather show only one repo entirely, the alternative is to make the old repo private and archived. It then disappears from your public profile while still existing for you.

## Repo rename option: should the active repo become `thailand-atm-calculator`?

Your old Manus repo currently owns the name `thailand-atm-calculator`. GitHub lets you rename any repo, and it auto-redirects the old URL, so the risk is low. Two ways to do it:

### Option A: swap the names

1. Rename the old Manus repo to `thailand-atm-calc-archive` first.
2. Rename the active Lovable repo to `thailand-atm-calculator`.
3. Update the Lovable GitHub connection so it points at the renamed repo (Lovable usually follows renames automatically, but verify in the editor).
4. Update any Vercel / domain / monitoring links that pointed at the old repo name.

**Pros:** the active repo gets the clean, memorable name; the archive name is self-explanatory; your GitHub profile shows the right project first.

**Cons:** you have to coordinate the rename order so the name is free; any external links to the old repo still work via redirect, but the commit/PR URLs will show the new name; if Lovable's sync gets confused you may need to reconnect GitHub in the editor.

### Option B: keep the active repo name as-is, archive the old one

If the active repo is already something like `thailand-atm-design`, leave it. A unique repo name is fine — the live URL and the README are what reviewers remember. The old repo becomes `thailand-atm-calculator-archive` or stays as-is but archived.

**Pros:** no sync risk; no rename coordination.

**Cons:** the active repo doesn't get the most obvious name; the old repo still appears in search under the obvious name unless you also rename it.

**Recommendation:** do Option A if you're comfortable reconnecting Lovable to GitHub if needed. It gives the cleanest public profile. Do Option B if you want zero risk of breaking the sync.

## What makes the repo read well to a reviewer

Right now the active repo's README is the default Lovable template plus your original one-line prompt ("i've been building thailand-atm-calculator.com in Manus. am i able to bring this project into Lovable…"). That's the single most visible thing on the page and it currently reads like a chat message. It should read like a product.

Rewrite it to cover:

- What the tool does, in two lines, plus the live link to thailand-atm-calculator.com
- The problem: Thai ATMs stack a machine fee, the card network's FX margin, and your own bank's withdrawal fees — and the ATM's "convert for me" screen costs roughly 7%
- How it works: 102 cards across 16 currencies, each with fixed and percentage withdrawal fees and FX markup, sourced and dated; live THB rates; multi-withdrawal splitting when the amount exceeds the machine limit
- Where the numbers come from: every card row carries a source URL and a last-verified date; margins calibrated against a real bank transaction
- Tech: React, TanStack Start, server-rendered for SEO, deployed on Vercel
- A note that this repo supersedes the earlier prototype, linking to the archived one

Also worth adding, since a reviewer will look for them:

- A short `LICENSE` file
- Repo description and topics on GitHub (one-line summary, homepage URL set to the live site)
- A screenshot of the calculator in the README — visual proof beats prose

## Steps you take on GitHub (I can't do these from here)

1. Decide whether to rename (Option A) or leave names as-is (Option B).
2. If renaming: rename the old repo first, then the active one, then check the Lovable GitHub connection still shows the renamed repo under the Plus menu → GitHub.
3. On the old Manus repo: Settings → scroll to the bottom → Archive this repository. Optionally set it private first.
4. Before archiving, edit the old repo's description to something like "Original prototype — superseded by <new repo>", and add that line at the top of its README.
5. On the active repo: set the description and the Website field to https://www.thailand-atm-calculator.com, add topics such as `thailand`, `travel`, `fintech`, `atm-fees`, `calculator`.
6. Confirm Vercel is deploying from the active repo only, and that no old Manus deployment is still live.

## Steps I take in the project

1. Rewrite `README.md` as described above.
2. Add a "How this was built" / "Community feedback" section to the README that mentions you posted the tool on Reddit, summarized the feedback, and iterated — e.g. adding fee-source transparency after someone asked whether home-bank fees were included. Keep it short and honest; it shows user-centered iteration without needing to paste actual comments.
3. Add a `LICENSE` file (MIT unless you prefer otherwise).
4. Add a README screenshot of the calculator.
5. Add a short "Data sources" section to the README explaining the sourcing and verification dates for card fees — this doubles as the evidence for the Reddit comment about home-bank fees.

Once these land in Lovable they sync to the connected GitHub repo automatically.

## Still open from earlier

The page-side fee transparency work — showing on screen that home-bank withdrawal fees are included, with the card's source link, verification date, and a short "what we don't include" note about monthly free-withdrawal allowances. Not part of this plan; I'll plan it next when you're ready.

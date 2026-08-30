# Post-migration Search Console monitoring after moving hosting to Vercel

## Your setup

- Hosting is now on Vercel instead of Lovable's managed hosting.
- The custom domain `thailand-atm-calculator.com` (or `www.thailand-atm-calculator.com`) will point at Vercel once CNAME/A records propagate.
- The Lovable project remains the source of truth for the rebuilt design, metadata, and structured data.

## What I can do automatically

I can run scheduled or on-demand checks using the connected Google Search Console connector:

1. **DNS / domain verification** — confirm the domain resolves to Vercel and the site is reachable.
2. **Search Console property resolution** — list verified properties and confirm the exact `siteUrl` that covers your live domain.
3. **Sitemap status** — read whether Google processed the sitemap and if it reports errors or warnings.
4. **URL Inspection (read-only)** — check the indexed version of key URLs for coverage, mobile usability, and rich-results state.
5. **Search analytics snapshot** — pull clicks, impressions, CTR, and average position after the migration to watch for drops.

## What I cannot do automatically

Google's Search Console API does **not** support live testing, requesting indexing, or requesting a re-crawl. "Inspect URL" in the Search Console UI is a manual action. After DNS propagates, the fastest way to get Google to re-evaluate the new site is for you to:

- Log into Search Console,
- Use the URL Inspection tool on the homepage and a few top blog pages,
- Click **Request indexing** for each.

I cannot trigger that step for you.

## Suggested monitoring plan

### Step 1: Confirm DNS propagation

- Check that the domain resolves to Vercel's IPs/CNAME and that `https://www.thailand-atm-calculator.com` returns the new build.
- Verify the canonical tags, OG tags, and JSON-LD in the server-rendered HTML match the live domain.

### Step 2: Re-submit the sitemap

- Once the live domain is stable on Vercel, submit `https://www.thailand-atm-calculator.com/sitemap.xml` to the correct Search Console property.
- If you switch from `www` to the bare domain, update canonical links, OG URLs, and the sitemap/robots files first, then submit the matching sitemap.

### Step 3: URL Inspection read (automated)

- Inspect the homepage and the top 6 blog URLs to capture their indexed state after the migration.
- Report back coverage status, any mobile-usability issues, and whether canonicals are accepted.

### Step 4: Watch traffic for 7–14 days

- Pull a post-migration search-analytics snapshot and compare it to the August baseline stored in project memory.
- Flag any sharp drops in clicks, impressions, or average position.

## Open decision

What is the exact live URL you want Google to index?

- **A)** `https://www.thailand-atm-calculator.com` (matches current canonicals and sitemap)
- **B)** `https://thailand-atm-calculator.com` (bare domain — requires updating canonicals, OG URLs, sitemap, and robots)

Once you confirm, I can run the automated checks and tell you exactly what to request manually in Search Console.

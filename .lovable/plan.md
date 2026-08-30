# Manual Google Search Console checklist after going live on Vercel

## URLs to inspect in Search Console

Inspect each URL below, then click **Request indexing** if the indexed version does not match the new site or if the last crawl predates the migration.

1. `https://www.thailand-atm-calculator.com/` (homepage)
2. `https://www.thailand-atm-calculator.com/blog`
3. `https://www.thailand-atm-calculator.com/blog/thailand-atm-fees`
4. `https://www.thailand-atm-calculator.com/blog/best-atm-thailand-foreigners`
5. `https://www.thailand-atm-calculator.com/blog/thailand-atm-withdrawal-limit`
6. `https://www.thailand-atm-calculator.com/blog/thailand-atm-no-fee`
7. `https://www.thailand-atm-calculator.com/blog/wise-revolut-thailand`
8. `https://www.thailand-atm-calculator.com/blog/how-much-cash-thailand`

## What to look for in each inspection

- **Page fetch**: Google successfully fetched the new Vercel version.
- **Indexing**: URL is indexed.
- **Canonical**: Google-selected canonical matches the URL you submitted (not the old Manus URL).
- **Mobile usability**: No errors.
- **Rich results / structured data**: Article and FAQPage schemas detected where expected.

## Other steps to take

### 1. Submit (or re-submit) the sitemap

In Search Console, go to **Sitemaps** and submit:

```
https://www.thailand-atm-calculator.com/sitemap.xml
```

### 2. Force social previews to refresh

Facebook, X, and LinkedIn cache OG images. Paste each URL into their debuggers:

- Facebook Sharing Debugger
- X Card Validator
- LinkedIn Post Inspector

### 3. Verify the old Manus site is not still being served

- Run `curl -I https://www.thailand-atm-calculator.com` and confirm server headers point to Vercel.
- If the Manus deployment has its own subdomain or URL, set a 301 redirect to the canonical domain or shut it down to avoid duplicate content.

### 4. Monitor for 7–14 days

- Watch Search Console **Performance** for clicks, impressions, average position, and any coverage drops.
- Watch **Pages** for new indexing errors or canonical mismatches.
- Compare post-migration numbers to the August 2026 baseline stored in project memory.

### 5. Optional: tell me to pull a post-migration snapshot

I can read Search Console analytics, URL inspection status, and sitemap status automatically once the property is verified. Reply "pull the snapshot" and I will run the checks and report what changed.

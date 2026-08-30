# Fix SERP metadata for blog articles and homepage

## Current state
- Homepage and `/blog` index have correct per-route `head()` titles and descriptions.
- All six blog article routes render title/description only inside `BlogLayout`; they do not export a TanStack `head()` object, so they inherit the root defaults in the document `<head>`.
- Homepage and blog index are missing `canonical` and `og:url`.
- `BlogLayout` injects JSON-LD via inline `<script>` elements instead of the TanStack `head()` `scripts` array.
- `public/sitemap.xml` is complete (7 URLs) and referenced in `robots.txt`.

## Goal
Every public page should have a unique, accurate title, description, canonical, `og:url`, and proper JSON-LD so Google shows the right snippet and rich results can appear.

## Plan

1. **Add missing canonical + og:url to homepage and blog index**
   - `src/routes/index.tsx`: add `og:url` meta and `<link rel="canonical">` pointing to `https://www.thailand-atm-calculator.com/`.
   - `src/routes/blog.index.tsx`: add `og:url` and canonical pointing to `https://www.thailand-atm-calculator.com/blog/`.

2. **Move blog article metadata into route-level `head()`**
   - For each of the six article routes, add a `head()` export that uses the same title/description already passed to `BlogLayout`.
   - Include `og:title`, `og:description`, `og:type: "article"`, `og:url`, `twitter:card`, and a canonical link to `https://www.thailand-atm-calculator.com/blog/{slug}`.
   - Keep the existing `BlogLayout` props unchanged so the on-page rendering stays the same.

3. **Move JSON-LD into `head()` scripts**
   - Refactor `BlogLayout` to stop injecting `<script>` tags via `dangerouslySetInnerHTML`.
   - Instead, have each article route build the Article (and FAQPage, if applicable) JSON-LD in its `head()` `scripts` array.
   - Preserve the FAQPage schema on articles that currently include `faqItems`.

4. **Verify with an SEO scan**
   - Run `seo_chat--trigger_scan` after the edits.
   - Review findings for title/description uniqueness, canonical coverage, and structured data.

## Out of scope
- No visual or content changes to the articles themselves.
- No changes to the sitemap or robots.txt (already complete).
- No publishing step; Search Console live diagnostics require publishing and are noted separately.

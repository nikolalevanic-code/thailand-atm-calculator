# Go live: Replace the Manus-hosted site with the Lovable build

## Current state

- The Lovable project is **not published** yet — only a preview URL exists.
- The preview URL is `https://id-preview--fd926bc9-aa21-40ae-bdf5-2249691e8be1.lovable.app`.
- Your real domain, `thailand-atm-calculator.com`, is still pointing at the Manus deployment.
- The site is configured to be **public** once published.

## Steps to go live

### 1. Publish the Lovable app

- Click **Publish** in the top-right of the Lovable editor (desktop) or bottom-right in Preview mode (mobile).
- This creates a permanent public URL on `project--{project-id}.lovable.app`.
- Backend (server functions, any future database) deploys automatically; frontend needs the Publish dialog's **Update** click to go live after each change.

### 2. Connect your custom domain

- In Lovable: **Project Settings → Project section → Domains**, or use the **Publish dialog → Add custom domain**.
- Enter `thailand-atm-calculator.com` (and `www.thailand-atm-calculator.com` if you want the www redirect).
- Lovable will give you DNS records (usually CNAME or A/AAAA records) to add at your domain registrar/DNS provider.

### 3. Update DNS at your domain provider

- Add the records Lovable provides.
- Wait for DNS propagation (typically a few minutes to a few hours; TTL matters).
- Lovable will validate the domain and issue an SSL certificate automatically.

### 4. Set the canonical domain in the app

- The app already references `https://www.thailand-atm-calculator.com` in canonical links, OG URLs, and sitemap/robots.
- If you prefer the bare domain (`thailand-atm-calculator.com`) over `www`, we need to update those references across routes and `public/sitemap.xml` + `public/robots.txt`.

### 5. Redirect or shut down the Manus deployment

- Once the Lovable site is live on your domain and verified, stop the Manus deployment to avoid duplicate content and split traffic.
- If Manus gives you a separate subdomain/URL, set a 301 redirect from it to your primary domain.

### 6. Verify the switch

- Confirm `https://www.thailand-atm-calculator.com` serves the new Lovable build.
- Check that the canonical tag, OG tags, and sitemap all match the live domain.
- Re-scrape the homepage in Facebook, X, and LinkedIn debuggers so social previews refresh.

## Open decision

Do you want the live URL to be:

- **A)** `https://www.thailand-atm-calculator.com` (current canonical in the code), or
- **B)** `https://thailand-atm-calculator.com` (bare domain)?

If you choose B, I will update all canonical links, OG URLs, and the sitemap/robots files before you publish.

## Notes

- Custom domains require a paid Lovable plan.
- Do not change DNS before publishing — publish first, get the live target, then point DNS.
- Keep the Manus site running until DNS propagation is confirmed to avoid downtime.

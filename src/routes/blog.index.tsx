import { Link, createFileRoute } from "@tanstack/react-router";

import { AdSlot } from "@/components/AdSlot";
import { SiteFooter, SiteNav } from "@/components/blog/BlogLayout";

const TITLE = "Don't Let Thai ATMs Rob You: 2026 Fee Guides & Money Hacks";
const DESCRIPTION =
  "Practical Thailand ATM guides that stop you overpaying: foreign-card fees, withdrawal limits, DCC tricks, travel cards, and cash planning.";

const OG_TITLE = "Everything Thai ATMs don't want you to know";
const OG_DESCRIPTION =
  "Fees, limits, DCC traps and the cards that actually save money in Thailand — all in one place.";
const OG_IMAGE = "https://www.thailand-atm-calculator.com/og-blog.jpg";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: OG_TITLE },
      { property: "og:description", content: OG_DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.thailand-atm-calculator.com/blog/" },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Thailand money guides — ATM fees, limits and travel cards" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: OG_TITLE },
      { name: "twitter:description", content: OG_DESCRIPTION },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: "https://www.thailand-atm-calculator.com/blog/" }],
  }),
  component: BlogIndex,
});

const articles = [
  {
    to: "/blog/thailand-atm-fees" as const,
    title: "Thailand ATM Fees Explained (2026)",
    description:
      "A clear breakdown of every fee you'll encounter at a Thai ATM — and how to avoid the ones that aren't worth paying.",
    tags: ["ATM fees", "DCC"],
  },
  {
    to: "/blog/thailand-atm-withdrawal-limit" as const,
    title: "Thailand ATM Withdrawal Limits (2026)",
    description:
      "How much can you withdraw from a Thai ATM in one transaction? Per day? Limits by bank and how to work around them efficiently.",
    tags: ["Withdrawal limits"],
  },
  {
    to: "/blog/thailand-atm-no-fee" as const,
    title: "How to Withdraw Money in Thailand Without Fees",
    description:
      "Can you avoid ATM fees in Thailand entirely? Here's what's actually possible — and the best strategies to get as close to zero as you can.",
    tags: ["Fee-free", "Travel cards"],
  },
  {
    to: "/blog/best-atm-thailand-foreigners" as const,
    title: "Best ATM to Use in Thailand for Foreigners (2026)",
    description:
      "How to compare Thai ATM fees, withdrawal limits, and DCC offers before you take out cash.",
    tags: ["ATM comparison", "DCC"],
  },
  {
    to: "/blog/wise-revolut-thailand" as const,
    title: "Wise vs Revolut for Thailand: Which is Better in 2026?",
    description:
      "A direct comparison of fees, exchange rates, ATM limits, and practical usability in Thailand.",
    tags: ["Wise", "Revolut"],
  },
  {
    to: "/blog/how-much-cash-thailand" as const,
    title: "How Much Cash to Bring to Thailand (2026 Guide)",
    description:
      "How much Thai Baht do you actually need? A practical breakdown by trip length, travel style, and where cards are and aren't accepted.",
    tags: ["Cash planning"],
  },
];

function BlogIndex() {
  return (
    <div className="min-h-screen">
      <SiteNav />

      <main className="mx-auto w-full max-w-2xl px-4 pb-20 pt-8 sm:px-6 sm:pt-12">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
          ฿ Thailand travel money
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold leading-[1.1] text-foreground sm:text-4xl">
          Thailand ATM &amp; Money Guides
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          Practical, up-to-date guides on ATM fees, withdrawal limits, travel cards, and how to get
          the most out of your money in Thailand.
        </p>

        {/* Monetisation: top-of-list unit */}
        <AdSlot id="blog-index-top" className="mt-8" />

        <div className="mt-9 space-y-4">
          {articles.map((article) => (
            <Link
              key={article.to}
              to={article.to}
              className="group block rounded-2xl border border-border bg-card/70 p-5 no-underline transition-colors hover:border-primary/45 hover:bg-card sm:p-6"
            >
              <h2 className="font-display text-base font-semibold leading-snug text-foreground transition-colors group-hover:text-primary sm:text-lg">
                {article.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {article.description}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-primary/12 px-2.5 py-0.5 text-xs font-medium text-primary"
                  >
                    {tag}
                  </span>
                ))}
                <span className="ml-auto text-xs text-muted-foreground">Read guide →</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Monetisation: affiliate card comparison below the list */}
        <AdSlot id="blog-index-affiliate" className="mt-8" />

        <div className="mt-10 border-t border-border pt-8">
          <p className="mb-3 text-sm text-muted-foreground">
            Ready to calculate your exact ATM cost?
          </p>
          <Link
            to="/"
            className="inline-flex items-center rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground no-underline transition-opacity hover:opacity-90"
          >
            Use the free calculator →
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

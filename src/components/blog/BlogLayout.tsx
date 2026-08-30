import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { AdSlot } from "@/components/AdSlot";

export interface FaqItem {
  question: string;
  answer: string;
}

interface BlogLayoutProps {
  title: string;
  description: string;
  lastUpdated: string;
  children: ReactNode;
  ctaHeading?: string;
  ctaBody?: string;
  ctaLabel?: string;
  slug: string;
  faqItems?: FaqItem[];
}

export default function BlogLayout({
  title,
  description,
  lastUpdated,
  children,
  ctaHeading = "Calculate your exact ATM cost",
  ctaBody =
    "Enter your withdrawal amount and home currency to see the true cost — including your bank's fees and the exchange rate spread.",
  ctaLabel = "Use the free calculator →",
  slug,
  faqItems,
}: BlogLayoutProps) {
  const dateModified = lastUpdated === "August 2026" ? "2026-08-30" : "2026-05-30";

  const schemas: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: title,
      description,
      url: `https://www.thailand-atm-calculator.com/blog/${slug}`,
      dateModified,
      publisher: {
        "@type": "Organization",
        name: "Thailand ATM Calculator",
        url: "https://www.thailand-atm-calculator.com",
      },
      inLanguage: "en",
    },
  ];

  if (faqItems && faqItems.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    });
  }

  return (
    <div className="min-h-screen">
      <SiteNav />

      <article className="mx-auto w-full max-w-2xl px-4 pb-20 pt-8 sm:px-6 sm:pt-12">
        <Link
          to="/blog"
          className="text-sm text-muted-foreground no-underline transition-colors hover:text-foreground"
        >
          ← All guides
        </Link>

        <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
          ฿ Thailand ATM guide
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold leading-[1.1] text-foreground sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">{description}</p>
        <p className="mt-4 text-xs text-muted-foreground/70">Updated {lastUpdated}</p>

        {/* Monetisation: leaderboard above the fold on articles */}
        <AdSlot id="article-top" className="mt-8" />

        <div className="prose-article mt-10">{children}</div>

        {/* Monetisation: in-content unit after the body, before the tool CTA */}
        <AdSlot id="article-mid" className="mt-10" />

        <div className="mt-12 rounded-3xl border border-primary/25 bg-primary/10 p-6 sm:p-8">
          <h2 className="font-display text-lg font-semibold text-foreground">{ctaHeading}</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{ctaBody}</p>
          <Link
            to="/"
            className="mt-4 inline-flex items-center rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground no-underline transition-opacity hover:opacity-90"
          >
            {ctaLabel}
          </Link>
        </div>

        {/* Monetisation: card / travel-money affiliate comparison block */}
        <AdSlot id="article-affiliate" className="mt-6" />

        <div className="mt-10 border-t border-border pt-8">
          <Link
            to="/blog"
            className="text-sm text-muted-foreground no-underline transition-colors hover:text-foreground"
          >
            ← Back to all guides
          </Link>
        </div>
      </article>

      <SiteFooter />

      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </div>
  );
}

export function SiteNav() {
  return (
    <nav className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-2xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="font-display text-sm font-semibold tracking-tight text-foreground no-underline">
          Thailand ATM Calculator
        </Link>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link to="/blog" className="no-underline transition-colors hover:text-foreground">
            Guides
          </Link>
          <Link to="/" className="font-medium text-primary no-underline transition-opacity hover:opacity-80">
            Calculator
          </Link>
        </div>
      </div>
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto w-full max-w-2xl px-4 sm:px-6">
        <p className="text-xs leading-relaxed text-muted-foreground">
          Thailand ATM Calculator is a free tool for informational purposes. Fee data is researched
          and updated regularly but may not reflect the most recent changes by banks or card
          networks. Always verify fees with your bank before travelling.
        </p>
      </div>
    </footer>
  );
}

import { Link, createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

import { AdSlot } from "@/components/AdSlot";
import { SiteFooter, SiteNav } from "@/components/blog/BlogLayout";
import { AmountDial } from "@/components/calculator/AmountDial";
import { AtmSettings } from "@/components/calculator/AtmSettings";
import { CardSelector } from "@/components/calculator/CardSelector";
import { ResultPanel } from "@/components/calculator/ResultPanel";
import {
  DEFAULT_ATM_LIMIT_THB,
  THAI_ATM_FEE_VISA,
  networkToAtmFee,
  calculate,
} from "@/lib/calculator";
import { allCards } from "@/lib/cardData";
import { fxRatesQuery } from "@/lib/fxQuery";

const TITLE = "Stop Paying Insane Hidden Fees at Thai ATMs — See the Real Cost";
const DESCRIPTION =
  "Thai ATMs quietly stack 3 charges on every withdrawal. Use the free calculator to see exactly what your card will cost you — and how much you can save.";

// Social framing is punchier than the SERP snippet: a shared link has no
// ranking context, so the hook has to do all the work in the feed.
const OG_TITLE = "Thai ATMs are quietly taking 7% of your cash";
const OG_DESCRIPTION =
  "Three fees, one screen you should always decline. Check what your card really costs before your next withdrawal in Thailand.";
const OG_IMAGE = "https://www.thailand-atm-calculator.com/og-home.jpg";

export const Route = createFileRoute("/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(fxRatesQuery),
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: OG_TITLE },
      { property: "og:description", content: OG_DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.thailand-atm-calculator.com/" },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content: "Thailand ATM Fee Calculator — stop paying hidden ATM fees",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: OG_TITLE },
      { name: "twitter:description", content: OG_DESCRIPTION },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: "https://www.thailand-atm-calculator.com/" }],
  }),
  component: Home,
});

const FAQ = [
  {
    q: "How much does a Thai ATM charge foreigners?",
    a: "Nearly every Thai bank charges a flat 250 THB per withdrawal on Visa cards and up to 350 THB on some Mastercard withdrawals. It is charged per transaction, so one large withdrawal always beats several small ones.",
  },
  {
    q: "Should I accept the ATM's conversion to my home currency?",
    a: "No. Dynamic currency conversion (DCC) typically costs around 7% versus the interbank rate, while your card network's own rate is roughly 2.2% off. Always pick 'continue without conversion' or 'charge me in THB'.",
  },
  {
    q: "Does this include my own bank's fees?",
    a: "Yes. The totals include your home bank's foreign ATM withdrawal fee, its percentage fee and any foreign transaction fee, on top of the Thai machine fee — every card in the database has a published source and a verification date. What is not modelled yet is monthly free-withdrawal allowances (for example Wise and Revolut give a limited number of free withdrawals per month), premium plan tiers and temporary promotional waivers.",
  },
  {
    q: "What is the maximum I can withdraw at once?",
    a: "Most Thai ATMs cap a single withdrawal at 20,000–30,000 THB. Since the fee is per transaction, withdrawing at the highest limit your machine and card allow is the cheapest approach.",
  },
];

function Home() {
  const { data: fx } = useSuspenseQuery(fxRatesQuery);

  const [amount, setAmount] = useState(20000);
  const [currency, setCurrency] = useState("AUD");
  const [cardId, setCardId] = useState("");
  const [atmFee, setAtmFee] = useState(THAI_ATM_FEE_VISA);
  const [atmLimit, setAtmLimit] = useState(DEFAULT_ATM_LIMIT_THB);

  const card = useMemo(() => allCards.find((c) => c.id === cardId) ?? null, [cardId]);

  const handleCardChange = (nextCardId: string) => {
    setCardId(nextCardId);
    const nextCard = allCards.find((c) => c.id === nextCardId);
    const fee = networkToAtmFee(nextCard?.network);
    if (fee !== null) setAtmFee(fee);
  };

  const result = useMemo(
    () =>
      calculate({
        withdrawalAmountTHB: amount,
        thaiAtmFeeTHB: atmFee,
        atmLimitTHB: atmLimit,
        currency,
        spotRateTHBperUnit: fx.rates[currency] ?? 0,
        card,
        allRates: fx.rates,
      }),
    [amount, atmFee, atmLimit, currency, fx.rates, card],
  );

  return (
    <div className="min-h-screen">
      <SiteNav />
      <main className="mx-auto w-full max-w-2xl px-4 pb-20 pt-10 sm:px-6 sm:pt-14">
      <header className="text-center">
        <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          Updated {fx.stale ? "rates unavailable" : "with today's rates"}
        </span>
        <h1 className="mt-5 font-display text-4xl font-bold leading-[1.08] text-foreground sm:text-5xl">
          What a Thai ATM withdrawal
          <span className="block text-primary">actually costs you</span>
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
          The 250 THB machine fee is the part everyone sees. The conversion the ATM offers you is
          where the real money goes. Enter your card and find out.
        </p>
      </header>

      <div className="mt-10 space-y-5">
        <section className="rounded-3xl border border-border bg-card/80 p-6 backdrop-blur sm:p-7">
          <div className="space-y-7">
            <AmountDial value={amount} onChange={setAmount} />
            <CardSelector
              currency={currency}
              onCurrencyChange={setCurrency}
              cardId={cardId}
              onCardChange={handleCardChange}
            />
            <AtmSettings
              atmFee={atmFee}
              onAtmFeeChange={setAtmFee}
              atmLimit={atmLimit}
              onAtmLimitChange={setAtmLimit}
            />
          </div>
        </section>

        {result ? (
          <ResultPanel result={result} card={card} />
        ) : (
          <p className="rounded-3xl border border-border bg-card/60 p-6 text-sm text-muted-foreground">
            Enter an amount above to see the comparison.
          </p>
        )}

        {/* Monetisation: highest-intent placement — the user just saw what their card costs */}
        <AdSlot id="below-results" label="Recommended cards" />

        <section className="rounded-3xl border border-border bg-card/60 p-6 sm:p-7">
          <h2 className="font-display text-2xl font-semibold text-foreground">
            Three rules that save the most
          </h2>
          <ul className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground">
            <li>
              <span className="font-semibold text-foreground">Withdraw the maximum.</span> The 220
              THB fee is per transaction, not per baht. Two 10,000 THB withdrawals cost double.
            </li>
            <li>
              <span className="font-semibold text-foreground">Always decline conversion.</span> When
              the ATM offers your home currency, say no. That screen costs about 7%.
            </li>
            <li>
              <span className="font-semibold text-foreground">Bring the right card.</span> A card
              with no foreign transaction fee saves more over a trip than any other single choice.
            </li>
          </ul>
        </section>

        <section className="rounded-3xl border border-border bg-card/60 p-6 sm:p-7">
          <h2 className="font-display text-2xl font-semibold text-foreground">
            Frequently asked questions
          </h2>
          <div className="mt-5 divide-y divide-border">
            {FAQ.map((item) => (
              <details key={item.q} className="group py-4">
                <summary className="cursor-pointer list-none font-semibold text-foreground marker:hidden">
                  {item.q}
                </summary>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>

      <section className="mt-5 rounded-3xl border border-border bg-card/60 p-6 sm:p-7">
          <h2 className="font-display text-2xl font-semibold text-foreground">Thailand money guides</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Deeper reading on fees, limits, and the best cards to bring.
          </p>
          <Link
            to="/blog"
            className="mt-4 inline-flex items-center rounded-xl border border-primary/40 bg-primary/10 px-4 py-2.5 text-sm font-semibold text-primary no-underline transition-colors hover:bg-primary/20"
          >
            Read the guides →
          </Link>
        </section>

        <AdSlot id="home-footer" className="mt-5" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQ.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a },
            })),
          }),
        }}
      />
      </main>
      <SiteFooter />
    </div>
  );
}

import { useState } from "react";

import type { CalculationResult } from "@/lib/calculator";
import type { CardProfile } from "@/lib/cardData";
import { formatCurrency } from "@/lib/cardData";

interface ResultPanelProps {
  result: CalculationResult;
  card?: CardProfile | null;
}

function describeBankFees(card: CardProfile): string {
  const parts: string[] = [];
  if (card.fixed_foreign_atm_fee) {
    parts.push(`${card.fixed_foreign_atm_fee} ${card.fixed_foreign_atm_fee_currency}`);
  }
  const pct = (card.percentage_foreign_atm_fee ?? 0) + (card.foreign_transaction_fee_pct ?? 0);
  if (pct > 0) parts.push(`${(pct * 100).toFixed(2).replace(/\.?0+$/, "")}%`);
  return parts.length ? parts.join(" + ") : "no withdrawal fee";
}

function displayCardName(card: CardProfile): string {
  const product = card.product_name.trim();
  const bank = card.bank_name.trim();
  if (product.toLowerCase().startsWith(bank.toLowerCase())) return product;
  return `${bank} ${product}`;
}

function formatVerified(date: string): string {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return date;
  return d.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
}

export function ResultPanel({ result, card }: ResultPanelProps) {
  const [open, setOpen] = useState(false);
  const { currency, withoutConversion, withConversion, savingsHome, padKraPao } = result;

  return (
    <section
      aria-label="Withdrawal result"
      className="card-sheen relative overflow-hidden rounded-3xl border border-primary/30 bg-surface p-6 shadow-[0_24px_60px_-30px_rgba(157,123,234,0.9)] sm:p-8"
    >
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
        Always choose &quot;decline currency conversion&quot;!
      </p>
      <p className="mt-4 text-sm text-muted-foreground">
        By choosing no, you&apos;ll save on this withdrawal...
      </p>
      <p className="font-display text-5xl font-bold tabular-nums text-foreground sm:text-6xl">
        {formatCurrency(Math.abs(savingsHome), currency)}
      </p>
      <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-destructive/40 bg-destructive/10 px-3 py-1.5 text-sm font-semibold text-destructive">
        That&apos;s {padKraPao} plates of pad kra pao!{" "}
        {Array.from({ length: Math.max(1, Math.floor(padKraPao / 5)) }, () => "🔥").join("")}
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-success/40 bg-success/10 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-success">
            Pay in Thai baht
          </p>
          <p className="mt-1 font-display text-2xl tabular-nums text-foreground">
            {formatCurrency(withoutConversion.totalHome, currency)}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">{withoutConversion.fxRateLabel}</p>
        </div>
        <div className="rounded-2xl border border-destructive/40 bg-destructive/10 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-destructive">
            Let the ATM convert (DCC)
          </p>
          <p className="mt-1 font-display text-2xl tabular-nums text-foreground">
            {formatCurrency(withConversion.totalHome, currency)}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">{withConversion.fxRateLabel}</p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
        <span className="tabular-nums">
          {result.numTransactions} withdrawal{result.numTransactions > 1 ? "s" : ""} · ฿
          {result.totalAtmFeeTHB.toLocaleString()} in Thai ATM fees
        </span>
        {result.usingDefaultProfile && result.defaultProfileBasis ? (
          <span>Using {result.defaultProfileBasis}</span>
        ) : null}
      </div>

      <div className="mt-4 rounded-2xl border border-border bg-secondary/30 p-4">
        <p className="text-sm text-foreground">
          {card ? (
            <>
              {displayCardName(card)} charges {describeBankFees(card)} on foreign ATM withdrawals.
            </>
          ) : (
            <>
              These totals use typical home-bank withdrawal and foreign transaction fees for{" "}
              {currency}. Pick your card above for exact figures.
            </>
          )}
        </p>
        {card ? (
          <p className="mt-2 text-xs text-muted-foreground">
            Source:{" "}
            <a
              href={card.source_url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-primary underline-offset-4 hover:underline"
            >
              {card.source_label || card.bank_name}
            </a>{" "}
            · Last verified {formatVerified(card.last_verified_date)}
          </p>
        ) : null}
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          What we do not model yet: monthly free-withdrawal allowances (Wise, Revolut and some
          digital banks give you a few free ATM withdrawals each month), premium plan tiers, and
          short-term promotional fee waivers. If your card has one of those, your real cost may be
          lower.
        </p>
      </div>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="mt-5 text-sm font-semibold text-primary underline-offset-4 hover:underline"
      >
        {open ? "Hide the full breakdown" : "Show the full breakdown"}
      </button>

      {open ? (
        <div className="mt-4 overflow-x-auto rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-secondary/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-semibold">Line item</th>
                <th className="px-4 py-3 text-right font-semibold">Thai baht</th>
                <th className="px-4 py-3 text-right font-semibold">ATM converts</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["Cash + ATM fee, converted", "baseAmountHome"],
                ["Card fixed fee", "fixedFeeHome"],
                ["Card percentage fee", "percentageFeeHome"],
                ["Foreign transaction fee", "fxFeeHome"],
                ["Total charged", "totalHome"],
              ].map(([label, key]) => (
                <tr key={key} className={key === "totalHome" ? "font-semibold" : undefined}>
                  <td className="px-4 py-3 text-muted-foreground">{label}</td>
                  <td className="px-4 py-3 text-right tabular-nums text-foreground">
                    {formatCurrency(
                      withoutConversion[key as keyof typeof withoutConversion] as number,
                      currency,
                    )}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums text-foreground">
                    {formatCurrency(
                      withConversion[key as keyof typeof withConversion] as number,
                      currency,
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </section>
  );
}

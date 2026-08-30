import { useState } from "react";

import type { CalculationResult } from "@/lib/calculator";
import { formatCurrency } from "@/lib/cardData";

interface ResultPanelProps {
  result: CalculationResult;
}

export function ResultPanel({ result }: ResultPanelProps) {
  const [open, setOpen] = useState(false);
  const { currency, withoutConversion, withConversion, savingsHome, padKraPao } = result;

  return (
    <section
      aria-label="Withdrawal result"
      className="card-sheen relative overflow-hidden rounded-3xl border border-primary/30 bg-surface p-6 shadow-[0_24px_60px_-30px_rgba(157,123,234,0.9)] sm:p-8"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
        Always choose "charge me in Thai baht"
      </p>
      <p className="mt-4 text-sm text-muted-foreground">You save on this withdrawal</p>
      <p className="font-display text-5xl font-bold tabular-nums text-foreground sm:text-6xl">
        {formatCurrency(Math.abs(savingsHome), currency)}
      </p>
      <p className="mt-2 text-sm text-muted-foreground">
        That is about{" "}
        <span className="font-semibold text-success">{padKraPao} plates of pad kra pao</span> — just
        for tapping the right button on the ATM screen.
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

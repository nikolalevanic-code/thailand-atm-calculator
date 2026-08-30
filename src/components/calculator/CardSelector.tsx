import { useMemo } from "react";

import {
  CARD_TYPE_LABELS,
  CURRENCIES,
  DEFAULT_PROFILES,
  getCardsByBank,
  type CardProfile,
} from "@/lib/cardData";

interface CardSelectorProps {
  currency: string;
  onCurrencyChange: (currency: string) => void;
  cardId: string;
  onCardChange: (cardId: string) => void;
}

const selectClass =
  "w-full appearance-none rounded-xl border border-border bg-secondary/60 px-4 py-3.5 text-sm font-semibold text-foreground outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/20";

export function CardSelector({
  currency,
  onCurrencyChange,
  cardId,
  onCardChange,
}: CardSelectorProps) {
  const banks = useMemo(() => getCardsByBank(currency), [currency]);
  const bankNames = useMemo(() => Object.keys(banks).sort(), [banks]);
  const profile = DEFAULT_PROFILES[currency];

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="space-y-2">
        <label
          htmlFor="home-currency"
          className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground"
        >
          Home currency
        </label>
        <select
          id="home-currency"
          className={selectClass}
          value={currency}
          onChange={(e) => {
            onCurrencyChange(e.target.value);
            onCardChange("");
          }}
        >
          {Object.entries(CURRENCIES).map(([code, info]) => (
            <option key={code} value={code}>
              {code} — {info.label}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="bank-card"
          className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground"
        >
          Your bank card
        </label>
        <select
          id="bank-card"
          className={selectClass}
          value={cardId}
          onChange={(e) => onCardChange(e.target.value)}
        >
          <option value="">
            {profile ? `Typical card (${profile.basis})` : "Typical card"}
          </option>
          {bankNames.map((bank) => (
            <optgroup key={bank} label={bank}>
              {banks[bank].map((card: CardProfile) => (
                <option key={card.id} value={card.id}>
                  {card.product_name} · {CARD_TYPE_LABELS[card.card_type] ?? card.card_type}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>
    </div>
  );
}

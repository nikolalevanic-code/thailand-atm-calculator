import { THAI_ATM_FEE_MASTERCARD, THAI_ATM_FEE_VISA } from "@/lib/calculator";

interface AtmSettingsProps {
  atmFee: number;
  onAtmFeeChange: (value: number) => void;
  atmLimit: number;
  onAtmLimitChange: (value: number) => void;
}

const LIMITS = [20000, 25000, 30000];

export function AtmSettings({
  atmFee,
  onAtmFeeChange,
  atmLimit,
  onAtmLimitChange,
}: AtmSettingsProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <div className="space-y-2">
        <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Card network
        </span>
        <div className="flex gap-2">
          {[
            { label: "Visa", fee: THAI_ATM_FEE_VISA },
            { label: "Mastercard", fee: THAI_ATM_FEE_MASTERCARD },
          ].map((option) => (
            <button
              key={option.label}
              type="button"
              onClick={() => onAtmFeeChange(option.fee)}
              className={`flex-1 rounded-xl border px-3 py-3 text-sm font-semibold transition ${
                atmFee === option.fee
                  ? "border-primary bg-primary/15 text-foreground"
                  : "border-border bg-secondary/50 text-muted-foreground hover:text-foreground"
              }`}
            >
              {option.label}
              <span className="mt-0.5 block text-xs font-medium tabular-nums text-muted-foreground">
                ฿{option.fee} fee
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          ATM limit per withdrawal
        </span>
        <div className="flex gap-2">
          {LIMITS.map((limit) => (
            <button
              key={limit}
              type="button"
              onClick={() => onAtmLimitChange(limit)}
              className={`flex-1 rounded-xl border px-2 py-3 text-sm font-semibold tabular-nums transition ${
                atmLimit === limit
                  ? "border-primary bg-primary/15 text-foreground"
                  : "border-border bg-secondary/50 text-muted-foreground hover:text-foreground"
              }`}
            >
              ฿{(limit / 1000).toFixed(0)}k
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

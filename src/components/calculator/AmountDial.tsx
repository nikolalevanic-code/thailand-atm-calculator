interface AmountDialProps {
  value: number;
  onChange: (value: number) => void;
}

const PRESETS = [5000, 10000, 20000, 30000];

export function AmountDial({ value, onChange }: AmountDialProps) {
  return (
    <div className="space-y-3">
      <label
        htmlFor="withdrawal-amount"
        className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground"
      >
        How much cash do you need?
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 font-display text-2xl text-muted-foreground">
          ฿
        </span>
        <input
          id="withdrawal-amount"
          type="number"
          inputMode="numeric"
          min={0}
          step={100}
          value={value || ""}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full rounded-2xl border border-border bg-secondary/60 py-5 pl-12 pr-5 font-display text-3xl tabular-nums text-foreground outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/20"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => onChange(preset)}
            className={`rounded-full border px-4 py-2 text-sm font-semibold tabular-nums transition ${
              value === preset
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-secondary/50 text-muted-foreground hover:border-primary/60 hover:text-foreground"
            }`}
          >
            ฿{preset.toLocaleString()}
          </button>
        ))}
      </div>
    </div>
  );
}

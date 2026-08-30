import { createServerFn } from "@tanstack/react-start";

import { FALLBACK_RATES } from "./fxRate";

export interface FxSnapshot {
  rates: Record<string, number>;
  fetchedAt: number;
  stale: boolean;
}

let cache: FxSnapshot | undefined;
const TTL_MS = 12 * 60 * 60 * 1000;

async function loadRates(): Promise<FxSnapshot> {
  if (cache && Date.now() - cache.fetchedAt < TTL_MS) return cache;

  try {
    const res = await fetch("https://open.er-api.com/v6/latest/THB");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = (await res.json()) as { result: string; rates: Record<string, number> };
    if (data.result !== "success") throw new Error("non-success");

    const rates: Record<string, number> = {};
    for (const [currency, fromThb] of Object.entries(data.rates)) {
      if (fromThb > 0) rates[currency] = 1 / fromThb;
    }
    cache = { rates, fetchedAt: Date.now(), stale: false };
    return cache;
  } catch (error) {
    console.error(error);
    return { rates: FALLBACK_RATES, fetchedAt: Date.now(), stale: true };
  }
}

export const getThbRates = createServerFn({ method: "GET" }).handler(async () => loadRates());

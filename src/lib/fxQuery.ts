import { queryOptions } from "@tanstack/react-query";

import { getThbRates } from "./fx.functions";

export const fxRatesQuery = queryOptions({
  queryKey: ["thb-rates"],
  queryFn: () => getThbRates(),
  staleTime: 6 * 60 * 60 * 1000,
});

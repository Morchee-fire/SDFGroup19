// Per-token metrics (holders, 30d payment volume) sourced manually from
// trackers like RWA.xyz. Empty until we wire up a live source.

export type TokenMetrics = {
  holders?: number;
  volume30dUsd?: number;
};

export const tokenMetrics: Record<string, TokenMetrics> = {
  // Populate per token, e.g. BRZ: { holders: 4_599, volume30dUsd: 29_614_712 }.
};

export function getMetrics(symbol: string): TokenMetrics {
  return tokenMetrics[symbol] ?? {};
}

export function formatHolders(n: number | undefined): string {
  if (n === undefined) return "-";
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toLocaleString();
}

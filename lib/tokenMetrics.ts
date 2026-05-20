// Per-token metrics (30d payment volume) sourced manually from trackers like
// RWA.xyz. Empty until we wire up a live source.

export type TokenMetrics = {
  volume30dUsd?: number;
};

export const tokenMetrics: Record<string, TokenMetrics> = {
  // Populate per token, e.g. BRZ: { volume30dUsd: 29_614_712 }.
};

export function getMetrics(symbol: string): TokenMetrics {
  return tokenMetrics[symbol] ?? {};
}

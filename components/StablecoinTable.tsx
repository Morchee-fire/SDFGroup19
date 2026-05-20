import type { Stablecoin } from "@/lib/stablecoins";

function formatUsd(usd: number): string {
  if (usd >= 1_000_000_000) return `$${(usd / 1_000_000_000).toFixed(2)}B`;
  if (usd >= 1_000_000) return `$${(usd / 1_000_000).toFixed(1)}M`;
  if (usd >= 1_000) return `$${(usd / 1_000).toFixed(0)}K`;
  if (usd === 0) return "—";
  return `$${usd.toLocaleString()}`;
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--card)] px-2.5 py-0.5 text-xs text-[var(--foreground)]">
      {children}
    </span>
  );
}

export default function StablecoinTable({ rows }: { rows: Stablecoin[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-[var(--border)] bg-[var(--card)]">
      <table className="min-w-full divide-y divide-[var(--border)] text-sm">
        <thead className="bg-black/20">
          <tr className="text-left text-xs uppercase tracking-wider text-[var(--muted)]">
            <th className="px-4 py-3 font-medium">Token</th>
            <th className="px-4 py-3 font-medium">Currency</th>
            <th className="px-4 py-3 font-medium">Chains</th>
            <th className="px-4 py-3 text-right font-medium">TVL</th>
            <th className="px-4 py-3 text-right font-medium">Payments</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--border)]">
          {rows.map((coin) => (
            <tr key={coin.symbol} className="hover:bg-white/[0.02]">
              <td className="px-4 py-4 align-top">
                <div className="font-semibold">{coin.symbol}</div>
                <div className="text-xs text-[var(--muted)]">{coin.name}</div>
              </td>
              <td className="px-4 py-4 align-top">
                <Pill>{coin.currency}</Pill>
              </td>
              <td className="px-4 py-4 align-top">
                <div className="flex flex-wrap gap-1.5">
                  {coin.chains.map((chain) => (
                    <Pill key={chain}>{chain}</Pill>
                  ))}
                </div>
              </td>
              <td className="px-4 py-4 text-right align-top font-mono">
                {formatUsd(coin.marketCapUsd)}
              </td>
              <td className="px-4 py-4 text-right align-top font-mono text-[var(--muted)]">
                —
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

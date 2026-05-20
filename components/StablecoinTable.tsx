import { ChainIcon } from "@/components/ChainIcon";
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

const currencyToCountry: Record<string, string> = {
  MXN: "mx", BRL: "br", SGD: "sg", IDR: "id", TRY: "tr", CAD: "ca",
  JPY: "jp", NZD: "nz", ZAR: "za", HKD: "hk", GBP: "gb", AUD: "au",
  CHF: "ch", CNY: "cn", INR: "in", KRW: "kr", THB: "th", PHP: "ph",
  MYR: "my", VND: "vn", AED: "ae", SAR: "sa", ILS: "il", NGN: "ng",
  KES: "ke", GHS: "gh", EGP: "eg", ARS: "ar", COP: "co", CLP: "cl",
  PEN: "pe", UYU: "uy", PLN: "pl", SEK: "se", NOK: "no", DKK: "dk",
  CZK: "cz", HUF: "hu", RUB: "ru", UAH: "ua", RON: "ro", TWD: "tw",
  BGN: "bg", ISK: "is", PKR: "pk", BDT: "bd", LKR: "lk", VES: "ve",
  MAD: "ma", DZD: "dz", TND: "tn", ETB: "et", QAR: "qa", KWD: "kw",
  BHD: "bh", OMR: "om", JOD: "jo", LBP: "lb",
};

function resolveCountry(currency: string, symbol: string): string | null {
  const direct = currencyToCountry[currency?.toUpperCase()];
  if (direct) return direct;
  const s = symbol.toUpperCase();
  for (const [code, cc] of Object.entries(currencyToCountry)) {
    if (s.includes(code)) return cc;
  }
  return null;
}

function CurrencyPill({ currency, symbol }: { currency: string; symbol: string }) {
  const cc = resolveCountry(currency, symbol);
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-2.5 py-0.5 text-xs text-[var(--foreground)]">
      {cc && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`https://flagcdn.com/w40/${cc}.png`}
          srcSet={`https://flagcdn.com/w80/${cc}.png 2x`}
          width={20}
          height={15}
          alt={`${currency} flag`}
          className="h-[15px] w-[20px] rounded-[2px] object-cover"
        />
      )}
      {currency}
    </span>
  );
}

function ChainBadge({ name }: { name: string }) {
  const icon = ChainIcon({ name, size: 22 });
  if (icon) {
    return (
      <span
        className="inline-flex h-[22px] items-center"
        title={name}
        aria-label={name}
      >
        {icon}
      </span>
    );
  }
  return <Pill>{name}</Pill>;
}

export default function StablecoinTable({ rows }: { rows: Stablecoin[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-[var(--border)] bg-[var(--card)]">
      <table className="min-w-full divide-y divide-[var(--border)] text-sm">
        <thead className="bg-black/20">
          <tr className="text-left text-xs uppercase tracking-wider text-[var(--muted)]">
            <th className="px-4 py-3 font-medium">Token</th>
            <th className="px-4 py-3 font-medium">Issuer</th>
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
              </td>
              <td className="px-4 py-4 align-top text-[var(--muted)]">
                {coin.name}
              </td>
              <td className="px-4 py-4 align-top">
                <CurrencyPill currency={coin.currency} symbol={coin.symbol} />
              </td>
              <td className="px-4 py-4 align-top">
                <div className="flex flex-wrap items-center gap-2">
                  {coin.chains.map((chain) => (
                    <ChainBadge key={chain} name={chain} />
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

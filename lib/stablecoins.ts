const SHEET_ID = "1W6-vyIHYn7_mWmfjcemLRT7nSKZmaBRsd6tDaf09aws";
const SHEET_CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`;

export type Stablecoin = {
  category: string;
  symbol: string;
  name: string;
  currency: string;
  yieldBearing: boolean;
  yieldSource: string;
  marketCapUsd: number;
  chains: string[];
  contractAddresses: Record<string, string>;
  source: string;
};

export async function fetchStablecoins(): Promise<Stablecoin[]> {
  const res = await fetch(SHEET_CSV_URL, {
    next: { revalidate: 4 * 60 * 60 },
  });
  if (!res.ok) throw new Error(`Sheet fetch failed: ${res.status}`);
  return parseCsv(await res.text());
}

// — CSV parsing —

// Known base column header fragments (lowercase). Anything else is a chain address column.
const BASE_HEADERS = new Set([
  "#", "category", "ticker", "name", "currency",
  "yield-bearing", "yield source", "cut off", "market cap", "chains", "source",
]);

function parseCsv(csv: string): Stablecoin[] {
  const lines = csv.split(/\r?\n/).filter((l) => l.trim());
  if (lines.length < 2) return [];

  const headers = splitCsvLine(lines[0]).map((h) => h.trim());

  // Find a column index by partial header match
  const col = (fragment: string) =>
    headers.findIndex((h) => h.toLowerCase().includes(fragment.toLowerCase()));

  const iCategory  = col("category");
  const iTicker    = col("ticker");
  const iName      = col("name");
  const iCurrency  = col("currency");
  const iYield     = col("yield-bearing");
  const iYieldSrc  = col("yield source");
  const iMarketCap = col("market cap");
  const iChains    = col("chains");
  const iSource    = col("source");

  // Any column whose header doesn't match a known base header is a chain address column
  const baseIdxs = new Set([iCategory, iTicker, iName, iCurrency, iYield, iYieldSrc, iMarketCap, iChains, iSource]);
  const chainCols: { chain: string; idx: number }[] = [];
  for (let i = 0; i < headers.length; i++) {
    if (baseIdxs.has(i)) continue;
    const h = headers[i].toLowerCase();
    if (!h || BASE_HEADERS.has(h) || [...BASE_HEADERS].some((b) => h.includes(b))) continue;
    chainCols.push({ chain: headers[i], idx: i });
  }

  return lines
    .slice(1)
    .map((line) => {
      const cols = splitCsvLine(line);
      const symbol = get(cols, iTicker);
      if (!symbol) return null;

      const contractAddresses: Record<string, string> = {};
      for (const { chain, idx } of chainCols) {
        const addr = get(cols, idx);
        if (addr) contractAddresses[chain] = addr;
      }

      return {
        category:     get(cols, iCategory),
        symbol,
        name:         get(cols, iName),
        currency:     parseCurrency(get(cols, iCurrency)),
        yieldBearing: get(cols, iYield).toLowerCase() === "yes",
        yieldSource:  get(cols, iYieldSrc),
        marketCapUsd: parseMarketCap(get(cols, iMarketCap)),
        chains:       parseChains(get(cols, iChains)),
        contractAddresses,
        source:       get(cols, iSource),
      } satisfies Stablecoin;
    })
    .filter((s): s is Stablecoin => s !== null)
    .filter((s) => {
      const sym = s.symbol.toUpperCase();
      return sym !== "AUSD" && sym !== "EUROB";
    })
    .sort((a, b) => b.marketCapUsd - a.marketCapUsd);
}

function get(cols: string[], idx: number): string {
  return idx >= 0 ? (cols[idx]?.trim() ?? "") : "";
}

function splitCsvLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') { current += '"'; i++; }
      else inQuotes = !inQuotes;
    } else if (ch === "," && !inQuotes) {
      result.push(current); current = "";
    } else {
      current += ch;
    }
  }
  result.push(current);
  return result;
}

function parseCurrency(s: string): string {
  // "BRL (Brazilian Real)" → "BRL", "USD" → "USD"
  return s.split(/[\s(]/)[0].trim();
}

function parseChains(s: string): string[] {
  // Strip parenthetical notes e.g. "Polygon (issuer also lists ...)" → "Polygon"
  return s
    .split(",")
    .map((c) => c.replace(/\s*\(.*?\)/g, "").trim())
    .filter(Boolean);
}

function parseMarketCap(s: string): number {
  if (!s || s.toLowerCase() === "limited") return 0;
  // Handle ranges like "~$18-26,000,000" — take the lower bound
  const clean = s.replace(/[~$,\s]/g, "").toUpperCase().split("-")[0];
  if (clean.endsWith("B")) return parseFloat(clean) * 1_000_000_000;
  if (clean.endsWith("M")) return parseFloat(clean) * 1_000_000;
  if (clean.endsWith("K")) return parseFloat(clean) * 1_000;
  return parseFloat(clean) || 0;
}

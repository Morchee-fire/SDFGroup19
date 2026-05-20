const SHEET_ID = "1W6-vyIHYn7_mWmfjcemLRT7nSKZmaBRsd6tDaf09aws";
const SHEET_CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`;

// Fixed column indices matching the sheet layout (A–I)
const COL_CATEGORY = 0;
const COL_TICKER = 1;
const COL_NAME = 2;
const COL_CURRENCY = 3;
const COL_YIELD = 4;
const COL_YIELD_SRC = 5;
const COL_MARKET_CAP = 6;
const COL_CHAINS = 7;
const COL_SOURCE = 8;
// Columns J onwards are per-chain contract addresses; headers = chain names.

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
    next: { revalidate: 4 * 60 * 60 }, // revalidate every 4 hours
  });
  if (!res.ok) throw new Error(`Sheet fetch failed: ${res.status}`);
  return parseCsv(await res.text());
}

// — CSV parsing —

function parseCsv(csv: string): Stablecoin[] {
  const lines = csv.split(/\r?\n/).filter((l) => l.trim());
  if (lines.length < 2) return [];

  const headers = splitCsvLine(lines[0]);

  // Columns J+ hold chain contract addresses; header = chain name
  const chainCols: { chain: string; idx: number }[] = [];
  for (let i = 9; i < headers.length; i++) {
    const h = headers[i].trim();
    if (h) chainCols.push({ chain: h, idx: i });
  }

  return lines
    .slice(1)
    .map((line) => {
      const cols = splitCsvLine(line);
      const symbol = cols[COL_TICKER]?.trim() ?? "";
      if (!symbol) return null;

      const contractAddresses: Record<string, string> = {};
      for (const { chain, idx } of chainCols) {
        const addr = cols[idx]?.trim();
        if (addr) contractAddresses[chain] = addr;
      }

      return {
        category: cols[COL_CATEGORY]?.trim() ?? "",
        symbol,
        name: cols[COL_NAME]?.trim() ?? "",
        currency: cols[COL_CURRENCY]?.trim() ?? "",
        yieldBearing: cols[COL_YIELD]?.trim().toLowerCase() === "yes",
        yieldSource: cols[COL_YIELD_SRC]?.trim() ?? "",
        marketCapUsd: parseMarketCap(cols[COL_MARKET_CAP]?.trim() ?? ""),
        chains: (cols[COL_CHAINS]?.trim() ?? "")
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        contractAddresses,
        source: cols[COL_SOURCE]?.trim() ?? "",
      } satisfies Stablecoin;
    })
    .filter((s): s is Stablecoin => s !== null);
}

function splitCsvLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === "," && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += ch;
    }
  }
  result.push(current);
  return result;
}

function parseMarketCap(s: string): number {
  const clean = s.replace(/[~$,\s]/g, "").toUpperCase();
  if (!clean) return 0;
  if (clean.endsWith("B")) return parseFloat(clean) * 1_000_000_000;
  if (clean.endsWith("M")) return parseFloat(clean) * 1_000_000;
  if (clean.endsWith("K")) return parseFloat(clean) * 1_000;
  return parseFloat(clean) || 0;
}

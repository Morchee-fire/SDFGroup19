// Sample data for non-USD, non-EUR stablecoins.
//
// Replace the TVL figures and verify chain coverage / corridor focus with your
// own research before going live. The values below are placeholders so the UI
// has something to render on first load.

export type Stablecoin = {
  symbol: string;
  name: string;
  currency: string; // ISO-style code, e.g. "MXN", "BRL"
  issuer: string;
  chains: string[];
  tvlUsd: number; // approximate USD-equivalent total value locked / supply
  corridors: string[]; // primary corridors / use cases
  website?: string;
};

export const stablecoins: Stablecoin[] = [
  {
    symbol: "CETES",
    name: "Etherfuse CETES (tokenized Mexican Treasury bills)",
    currency: "MXN",
    issuer: "Etherfuse",
    chains: ["Solana"],
    tvlUsd: 12_000_000,
    corridors: ["Mexico onchain savings", "LatAm yield"],
    website: "https://etherfuse.com",
  },
  {
    symbol: "MXNB",
    name: "MXNB",
    currency: "MXN",
    issuer: "Bitso / Juno",
    chains: ["Arbitrum", "Etherlink"],
    tvlUsd: 80_000_000,
    corridors: ["US <> Mexico remittances", "LatAm B2B payments"],
    website: "https://mxnb.mx",
  },
  {
    symbol: "BRZ",
    name: "Brazilian Digital Token",
    currency: "BRL",
    issuer: "Transfero",
    chains: ["Ethereum", "BNB Chain", "Polygon", "Solana", "Tron", "Avalanche", "Stellar"],
    tvlUsd: 45_000_000,
    corridors: ["Brazil cross-border payments", "LatAm corridors"],
    website: "https://brz.com",
  },
  {
    symbol: "XSGD",
    name: "StraitsX SGD",
    currency: "SGD",
    issuer: "StraitsX",
    chains: ["Ethereum", "Polygon", "Avalanche", "Hedera", "Zilliqa"],
    tvlUsd: 7_500_000,
    corridors: ["Singapore B2B", "Southeast Asia payments"],
    website: "https://www.straitsx.com",
  },
  {
    symbol: "XIDR",
    name: "StraitsX IDR",
    currency: "IDR",
    issuer: "StraitsX",
    chains: ["Ethereum", "Polygon", "Zilliqa"],
    tvlUsd: 1_200_000,
    corridors: ["Indonesia onramp/offramp", "SEA payments"],
    website: "https://www.straitsx.com",
  },
  {
    symbol: "TRYB",
    name: "BiLira",
    currency: "TRY",
    issuer: "BiLira",
    chains: ["Ethereum", "BNB Chain", "Avalanche", "Polygon", "Solana"],
    tvlUsd: 8_000_000,
    corridors: ["Turkey retail crypto", "EUR <> TRY"],
    website: "https://www.bilira.co",
  },
  {
    symbol: "IDRT",
    name: "Rupiah Token",
    currency: "IDR",
    issuer: "Rupiah Token",
    chains: ["Ethereum", "BNB Chain"],
    tvlUsd: 900_000,
    corridors: ["Indonesia retail", "SEA payments"],
    website: "https://rupiahtoken.com",
  },
  {
    symbol: "CADC",
    name: "Canadian Dollar Coin",
    currency: "CAD",
    issuer: "Stablecorp / Paytrie",
    chains: ["Ethereum"],
    tvlUsd: 1_500_000,
    corridors: ["US <> Canada B2B", "Canadian DeFi"],
    website: "https://stablecorp.ca",
  },
  {
    symbol: "GYEN",
    name: "GMO Japanese Yen",
    currency: "JPY",
    issuer: "GMO Trust",
    chains: ["Ethereum"],
    tvlUsd: 5_500_000,
    corridors: ["Japan trading", "JPY crypto pairs"],
    website: "https://stablecoin.z.com",
  },
  {
    symbol: "NZDS",
    name: "Techemynt NZD",
    currency: "NZD",
    issuer: "Techemynt",
    chains: ["Ethereum"],
    tvlUsd: 500_000,
    corridors: ["NZ <> AU payments", "Pacific corridors"],
    website: "https://techemynt.com",
  },
  {
    symbol: "ZARP",
    name: "ZARP Stablecoin",
    currency: "ZAR",
    issuer: "inv.finance",
    chains: ["Stellar"],
    tvlUsd: 700_000,
    corridors: ["South Africa cross-border", "Africa remittances"],
    website: "https://zarpstablecoin.com",
  },
  {
    symbol: "HKDR",
    name: "First Digital HKD",
    currency: "HKD",
    issuer: "First Digital",
    chains: ["Ethereum"],
    tvlUsd: 2_000_000,
    corridors: ["Hong Kong B2B", "Asia trade settlement"],
  },
];

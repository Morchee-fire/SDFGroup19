/**
 * Inline brand-mark SVGs for blockchain networks.
 *
 * Each icon renders in a 24x24 box with a circular brand-color background and
 * a simplified glyph in white. The shapes approximate the canonical chain
 * brand marks well enough to be recognizable in a dense table view.
 *
 * To add a new chain:
 *   1. Add an entry to CHAIN_ICONS keyed by a lowercase canonical name.
 *   2. If the sheet writes the chain in a non-obvious way (e.g. "Avalanche
 *      C-Chain" vs "Avalanche"), add an alias to NAME_ALIASES.
 */

type IconProps = { size?: number };

function Wrap({
  bg,
  children,
  size = 24,
  title,
}: {
  bg: string;
  children: React.ReactNode;
  size?: number;
  title: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
    >
      <title>{title}</title>
      <circle cx="16" cy="16" r="16" fill={bg} />
      {children}
    </svg>
  );
}

// --- Individual chain marks ---

const Ethereum = ({ size }: IconProps) => (
  <Wrap bg="#627EEA" size={size} title="Ethereum">
    <g fill="#FFF" fillRule="nonzero">
      <path fillOpacity="0.6" d="M16.5 4v8.87l7.5 3.35z" />
      <path d="M16.5 4L9 16.22l7.5-3.35z" />
      <path fillOpacity="0.6" d="M16.5 21.97v6.03L24 17.62z" />
      <path d="M16.5 28v-6.03L9 17.62z" />
      <path fillOpacity="0.2" d="M16.5 20.57L24 16.22l-7.5-3.35z" />
      <path fillOpacity="0.6" d="M9 16.22l7.5 4.35v-7.7z" />
    </g>
  </Wrap>
);

const Solana = ({ size }: IconProps) => (
  <Wrap bg="#000" size={size} title="Solana">
    <defs>
      <linearGradient id="sol-g" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#9945FF" />
        <stop offset="100%" stopColor="#14F195" />
      </linearGradient>
    </defs>
    <path
      d="M9 21.2l2-2.2h13.5l-2 2.2H9zm0-5l2-2.2h13.5l-2 2.2H9zm15.5-7.2l-2 2.2H9l2-2.2h13.5z"
      fill="url(#sol-g)"
    />
  </Wrap>
);

const Polygon = ({ size }: IconProps) => (
  <Wrap bg="#8247E5" size={size} title="Polygon">
    <path
      fill="#FFF"
      d="M21 12.5l-3-1.7-3 1.7v3.4l-3 1.7-3-1.7v-3.4l3-1.7v-2L8 10.8v4.4l4 2.3v3.4l4 2.3 4-2.3v-3.4l-3-1.7v-2l3-1.7v-2z"
    />
  </Wrap>
);

const Base = ({ size }: IconProps) => (
  <Wrap bg="#0052FF" size={size} title="Base">
    <path
      fill="#FFF"
      d="M16 26c5.52 0 10-4.48 10-10S21.52 6 16 6 6 10.48 6 16h13.7c.16 0 .3.13.3.3v0c0 .16-.14.3-.3.3H6c0 5.52 4.48 10 10 10z"
    />
  </Wrap>
);

const BNBChain = ({ size }: IconProps) => (
  <Wrap bg="#F0B90B" size={size} title="BNB Chain">
    <g fill="#FFF">
      <path d="M11.07 14.93L16 10l4.93 4.93-2.87 2.87L16 15.74l-2.06 2.06z" />
      <path d="M9 16l2.07-2.07L13.14 16l-2.07 2.07z" />
      <path d="M18.86 16l2.07-2.07L23 16l-2.07 2.07z" />
      <path d="M11.07 17.07L16 22l4.93-4.93-2.87-2.87L16 16.26l-2.06-2.06z" />
      <path d="M14.07 16L16 14.07 17.93 16 16 17.93z" />
    </g>
  </Wrap>
);

const Avalanche = ({ size }: IconProps) => (
  <Wrap bg="#E84142" size={size} title="Avalanche">
    <path
      fill="#FFF"
      d="M20.36 21H23a.5.5 0 00.43-.75l-2.65-4.55a.5.5 0 00-.86 0L18.5 18.4a1 1 0 000 1l1 1.72a1 1 0 00.86.48zM12.6 11.27a.5.5 0 00-.86 0L7.07 19.5a1 1 0 00.86 1.5h4.84a1 1 0 00.86-.5l3.7-6.42a1 1 0 000-1l-2.4-4.15a.5.5 0 00-.86 0L12.6 11.27z"
    />
  </Wrap>
);

const Tron = ({ size }: IconProps) => (
  <Wrap bg="#FF060A" size={size} title="Tron">
    <path
      fill="#FFF"
      d="M22 11l-12-3 6 16 8-13zm-3.5 1.5l-7-1.5 5.5 9 1.5-7.5zm-3 9.5l-3-9 5 .8L15.5 22z"
    />
  </Wrap>
);

const Sui = ({ size }: IconProps) => (
  <Wrap bg="#4DA2FF" size={size} title="Sui">
    <path
      fill="#FFF"
      d="M16 6c-3.5 4.5-6 7.5-6 11a6 6 0 0012 0c0-3.5-2.5-6.5-6-11zm0 14.5a3.5 3.5 0 01-3.5-3.5c0-1.7 1-3.4 2.5-5.5 0 2.5 3 3.5 3 6.5a2 2 0 01-2 2.5z"
    />
  </Wrap>
);

const Stellar = ({ size }: IconProps) => (
  <Wrap bg="#000" size={size} title="Stellar">
    <path
      fill="#FFF"
      d="M23.13 9.292l-2.4 1.224-11.598 5.907A6.909 6.909 0 0119.35 9.498l1.374-.7.205-.105a8.439 8.439 0 00-13.371 7.472 1.535 1.535 0 01-.834 1.484l-.725.37v1.724l2.134-1.088.691-.353.681-.347 12.226-6.23 1.374-.699 2.84-1.447V7.856L23.13 9.292zm2.816 2.012L10.201 19.32l-1.374.7L6 21.463v1.723l2.808-1.43 2.401-1.224 11.61-5.916a6.909 6.909 0 01-10.229 6.93l-.085.045-1.49.76a8.439 8.439 0 0013.372-7.475 1.536 1.536 0 01.833-1.483l.726-.37v-1.718z"
    />
  </Wrap>
);

const Arbitrum = ({ size }: IconProps) => (
  <Wrap bg="#28A0F0" size={size} title="Arbitrum">
    <path
      fill="#FFF"
      d="M16 6L8 22h3l1.4-3h7.2l1.4 3h3L16 6zm-2.6 11l2.6-5.4 2.6 5.4h-5.2z"
    />
  </Wrap>
);

const Etherlink = ({ size }: IconProps) => (
  <Wrap bg="#38FF9C" size={size} title="Etherlink">
    <path
      fill="#000"
      d="M16 6l8 4.6v9.2L16 24l-8-4.6v-9.2L16 6zm0 2.3L10 11.7v6.6l6 3.4 6-3.4v-6.6l-6-3.4zM12 13h8v2h-8v-2zm0 4h6v2h-6v-2z"
    />
  </Wrap>
);

const Hedera = ({ size }: IconProps) => (
  <Wrap bg="#000" size={size} title="Hedera">
    <path
      fill="#FFF"
      d="M11 8h2v4h6V8h2v16h-2v-4h-6v4h-2V8zm2 6v4h6v-4h-6z"
    />
  </Wrap>
);

const Zilliqa = ({ size }: IconProps) => (
  <Wrap bg="#49C1BF" size={size} title="Zilliqa">
    <path fill="#FFF" d="M9 11h14l-9 6h9l-14-2 9-6H9v2zm0 8h14v2H9v-2z" />
  </Wrap>
);

const LayerZero = ({ size }: IconProps) => (
  <Wrap bg="#000" size={size} title="LayerZero">
    <g fill="#FFF">
      <rect x="9" y="9" width="14" height="2" />
      <path d="M9 13h14l-12 6h12v2H9l12-6H9v-2z" />
      <rect x="9" y="21" width="14" height="2" />
    </g>
  </Wrap>
);

const Celo = ({ size }: IconProps) => (
  <Wrap bg="#FBCC5C" size={size} title="Celo">
    <g fill="none" stroke="#000" strokeWidth="2.2">
      <circle cx="13" cy="16" r="6" />
      <circle cx="19" cy="16" r="6" />
    </g>
  </Wrap>
);

const Gnosis = ({ size }: IconProps) => (
  <Wrap bg="#04795B" size={size} title="Gnosis">
    <g fill="#FFF">
      <circle cx="12" cy="12" r="3" />
      <circle cx="20" cy="12" r="3" />
      <circle cx="12" cy="20" r="3" />
      <circle cx="20" cy="20" r="3" />
    </g>
  </Wrap>
);

const Injective = ({ size }: IconProps) => (
  <Wrap bg="#00F2FE" size={size} title="Injective">
    <path
      fill="#000"
      d="M16 6c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10c0-3-1.4-5.5-3.5-7.3L19 12c1.2 1.1 2 2.6 2 4.3 0 2.8-2.2 5-5 5s-5-2.2-5-5 2.2-5 5-5l3.5-3.5C18.2 6.7 17.2 6 16 6z"
    />
  </Wrap>
);

const Kaia = ({ size }: IconProps) => (
  <Wrap bg="#BFF009" size={size} title="Kaia">
    <path
      fill="#000"
      d="M10 8h3v6l5-6h4l-5.5 6.5L22 24h-4l-4-6.5-1 1.2V24h-3V8z"
    />
  </Wrap>
);

const Monad = ({ size }: IconProps) => (
  <Wrap bg="#836EF9" size={size} title="Monad">
    <g fill="#FFF">
      <ellipse cx="16" cy="9" rx="3" ry="5" />
      <ellipse cx="23" cy="16" rx="5" ry="3" />
      <ellipse cx="16" cy="23" rx="3" ry="5" />
      <ellipse cx="9" cy="16" rx="5" ry="3" />
    </g>
  </Wrap>
);

const Moonbeam = ({ size }: IconProps) => (
  <Wrap bg="#E1147B" size={size} title="Moonbeam">
    <g fill="#FFF">
      <path d="M21 16a5 5 0 11-5-5 4 4 0 105 5z" />
      <circle cx="11" cy="11" r="1" />
      <circle cx="22" cy="12" r="1" />
      <circle cx="23" cy="20" r="1" />
      <circle cx="10" cy="22" r="1" />
    </g>
  </Wrap>
);

const Redbelly = ({ size }: IconProps) => (
  <Wrap bg="#C8102E" size={size} title="Redbelly">
    <path
      fill="#FFF"
      d="M8 11c2-2 4-2 6 0s4 2 6 0 4-2 6 0v3c-2-2-4-2-6 0s-4 2-6 0-4-2-6 0v-3zm0 5c2-2 4-2 6 0s4 2 6 0 4-2 6 0v3c-2-2-4-2-6 0s-4 2-6 0-4-2-6 0v-3zm0 5c2-2 4-2 6 0s4 2 6 0 4-2 6 0v2H8v-2z"
    />
  </Wrap>
);

const Ronin = ({ size }: IconProps) => (
  <Wrap bg="#1273EA" size={size} title="Ronin">
    <path
      fill="#FFF"
      d="M10 8h7a4 4 0 014 4c0 1.7-1 3.2-2.5 3.7L22 24h-3.5l-3-7H13v7h-3V8zm3 3v3h4a1.5 1.5 0 100-3h-4z"
    />
  </Wrap>
);

const WorldChain = ({ size }: IconProps) => (
  <Wrap bg="#000" size={size} title="World Chain">
    <g fill="none" stroke="#FFF" strokeWidth="1.8">
      <circle cx="16" cy="16" r="7" />
      <ellipse cx="16" cy="16" rx="7" ry="3" />
      <line x1="9" y1="16" x2="23" y2="16" />
      <line x1="16" y1="9" x2="16" y2="23" />
    </g>
  </Wrap>
);

const XDC = ({ size }: IconProps) => (
  <Wrap bg="#F7B500" size={size} title="XDC">
    <path
      fill="#000"
      d="M9 9h3.5l3.5 5 3.5-5H23l-5 7 5 7h-3.5l-3.5-5-3.5 5H9l5-7-5-7z"
    />
  </Wrap>
);

const XRPLedger = ({ size }: IconProps) => (
  <Wrap bg="#000" size={size} title="XRP Ledger">
    <path
      fill="#FFF"
      d="M9 9l5 5a3 3 0 004 0l5-5h-3l-3.5 3.5a1.5 1.5 0 01-2 0L11 9H9zm0 14l5-5a3 3 0 014 0l5 5h-3l-3.5-3.5a1.5 1.5 0 00-2 0L11 23H9z"
    />
  </Wrap>
);

const AssetChain = ({ size }: IconProps) => (
  <Wrap bg="#FF6B35" size={size} title="AssetChain">
    <g fill="none" stroke="#FFF" strokeWidth="2" strokeLinecap="round">
      <rect x="9" y="12" width="6" height="8" rx="3" />
      <rect x="17" y="12" width="6" height="8" rx="3" />
      <line x1="13" y1="16" x2="19" y2="16" />
    </g>
  </Wrap>
);

const Bantu = ({ size }: IconProps) => (
  <Wrap bg="#1A8A5C" size={size} title="Bantu">
    <path
      fill="#FFF"
      d="M10 8h6a3.5 3.5 0 012.5 6 4 4 0 01-2 7.5H10V8zm3 3v3.5h3a1.5 1.5 0 100-3.5h-3zm0 6v4.5h3.5a2 2 0 100-4.5H13z"
    />
  </Wrap>
);

// --- Registry ---

const CHAIN_ICONS: Record<string, (p: IconProps) => React.ReactElement> = {
  ethereum: Ethereum,
  solana: Solana,
  polygon: Polygon,
  base: Base,
  "bnb chain": BNBChain,
  bnb: BNBChain,
  bsc: BNBChain,
  avalanche: Avalanche,
  tron: Tron,
  sui: Sui,
  stellar: Stellar,
  arbitrum: Arbitrum,
  etherlink: Etherlink,
  hedera: Hedera,
  zilliqa: Zilliqa,
  layerzero: LayerZero,
  celo: Celo,
  gnosis: Gnosis,
  injective: Injective,
  kaia: Kaia,
  monad: Monad,
  moonbeam: Moonbeam,
  redbelly: Redbelly,
  ronin: Ronin,
  "world chain": WorldChain,
  xdc: XDC,
  "xrp ledger": XRPLedger,
  assetchain: AssetChain,
  bantu: Bantu,
};

// Common aliases - map sheet-side variants to canonical keys.
const NAME_ALIASES: Record<string, string> = {
  "avalanche c-chain": "avalanche",
  avax: "avalanche",
  "binance smart chain": "bnb chain",
  binance: "bnb chain",
  matic: "polygon",
  "polygon pos": "polygon",
  eth: "ethereum",
  "arbitrum one": "arbitrum",
  trx: "tron",
  worldchain: "world chain",
  xrp: "xrp ledger",
  "asset chain": "assetchain",
  klaytn: "kaia",
};

/**
 * Lowercase, trim, and strip stray surrounding punctuation. The sheet parser
 * occasionally leaves trailing ")" or "(" on chain names (e.g. "Ethereum)"
 * from a malformed parenthetical), which we want to forgive here.
 */
function normalize(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/^[^a-z0-9]+/, "")
    .replace(/[^a-z0-9]+$/, "");
}

/**
 * Looks up the icon for a chain name (case-insensitive, alias-aware).
 * Returns null if no icon is registered for this chain.
 */
export function ChainIcon({
  name,
  size = 24,
}: {
  name: string;
  size?: number;
}): React.ReactElement | null {
  const key = normalize(name);
  const resolved = NAME_ALIASES[key] ?? key;
  const Icon = CHAIN_ICONS[resolved];
  if (!Icon) return null;
  return <Icon size={size} />;
}

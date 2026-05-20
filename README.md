# Stable Reef

A directory of fiat- and treasury-backed stablecoins outside of USD and EUR —
the chains they live on, approximate TVL, and the payment corridors they focus
on.

Built with Next.js + Tailwind, deployed on Vercel.

Live: https://sdf-group19.vercel.app

The current data is **sample / placeholder** to prove out the layout. Edit
`lib/stablecoins.ts` to update the list — the page picks it up automatically.

## Local development

Requires Node.js 18.17+ (Node 20 LTS recommended).

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Project structure

```
SDFGroup19/
├── app/
│   ├── globals.css        # Tailwind + theme variables
│   ├── icon.svg           # Favicon (Stable Reef mark)
│   ├── layout.tsx         # Root HTML layout + metadata
│   └── page.tsx           # Home page
├── components/
│   ├── Logo.tsx           # Stable Reef logo + wordmark
│   └── StablecoinTable.tsx
├── lib/
│   └── stablecoins.ts     # ← edit this to add / change rows
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.mjs
```

## Adding or editing stablecoins

Open `lib/stablecoins.ts` and add an entry to the `stablecoins` array:

```ts
{
  symbol: "XYZ",
  name: "Example Coin",
  currency: "XYZ",
  issuer: "Example Issuer",
  chains: ["Ethereum", "Solana"],
  tvlUsd: 1_000_000,
  corridors: ["Use case A", "Use case B"],
  website: "https://example.com",
}
```

Commit and push — Vercel auto-redeploys.

## Deploying

Vercel is connected to this repo. As soon as a commit lands on `main`,
Vercel builds and deploys it. No environment variables are needed for the
current build.

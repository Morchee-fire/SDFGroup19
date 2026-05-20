import StablecoinTable from "@/components/StablecoinTable";
import { fetchStablecoins } from "@/lib/stablecoins";

export default async function Home() {
  const stablecoins = await fetchStablecoins();

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <header className="mb-10">
        <p className="text-sm uppercase tracking-widest text-[var(--muted)]">
          SDF Group 19
        </p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">
          Non-USD / Non-EUR Stablecoins
        </h1>
        <p className="mt-3 max-w-2xl text-[var(--muted)]">
          A working directory of fiat- and treasury-backed stablecoins outside
          of USD and EUR — the chains they live on and approximate market cap.
          Data refreshes every 4 hours from the source sheet.
        </p>
      </header>

      <StablecoinTable rows={stablecoins} />

      <footer className="mt-12 text-xs text-[var(--muted)]">
        {stablecoins.length} stablecoins listed. Market cap figures are approximate.
      </footer>
    </main>
  );
}

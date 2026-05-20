import StablecoinTable from "@/components/StablecoinTable";
import { stablecoins } from "@/lib/stablecoins";

export default function Home() {
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
          of USD and EUR — the chains they live on, approximate TVL, and the
          payment corridors they focus on. Data below is sample / placeholder;
          edit{" "}
          <code className="rounded bg-[var(--card)] px-1.5 py-0.5 text-xs text-[var(--accent)]">
            lib/stablecoins.ts
          </code>{" "}
          to update.
        </p>
      </header>

      <StablecoinTable rows={stablecoins} />

      <footer className="mt-12 text-xs text-[var(--muted)]">
        {stablecoins.length} stablecoins listed. TVL figures are approximate.
      </footer>
    </main>
  );
}

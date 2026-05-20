import Logo from "@/components/Logo";
import StablecoinTable from "@/components/StablecoinTable";
import { fetchStablecoins } from "@/lib/stablecoins";

export default async function Home() {
  const stablecoins = await fetchStablecoins();

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <nav className="mb-12 flex items-center justify-between border-b border-[var(--border)] pb-6">
        <Logo />
        <div className="hidden text-xs uppercase tracking-widest text-[var(--muted)] sm:block">
          A directory by SDF Group 19
        </div>
      </nav>

      <header className="mb-10">
        <p className="text-sm uppercase tracking-widest text-[var(--accent)]">
          Non-USD · Non-EUR
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          Stablecoins beyond the dollar.
        </h1>
        <p className="mt-4 max-w-2xl text-[var(--muted)]">
          Stable Reef is a working directory of fiat- and treasury-backed
          stablecoins outside of USD and EUR — the chains they live on and
          approximate market cap. Data refreshes every 4 hours from the source
          sheet.
        </p>
      </header>

      <StablecoinTable rows={stablecoins} />

      <footer className="mt-12 flex flex-wrap items-center justify-between gap-3 text-xs text-[var(--muted)]">
        <span>
          {stablecoins.length} stablecoins listed · Market cap figures are
          approximate.
        </span>
        <span>© {new Date().getFullYear()} Stable Reef</span>
      </footer>
    </main>
  );
}

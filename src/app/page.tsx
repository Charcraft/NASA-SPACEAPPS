export default function HomePage() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-16">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
          AEGIS · Space Apps 2026
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">
          Monitoreo de salud en vuelo
        </h1>
        <p className="text-sm text-neutral-400">
          Esqueleto del backend listo. Back 1: contratos y motor de tiempo real.
          Back 2: datos, triage y persistencia.
        </p>
      </header>

      <section className="rounded-lg border border-neutral-800 p-5 text-sm text-neutral-300">
        <p className="font-medium text-neutral-100">Estado</p>
        <ul className="mt-2 list-inside list-disc space-y-1 text-neutral-400">
          <li>Scaffold de Next 15 con TypeScript estricto y Tailwind v4.</li>
          <li>Contratos compartidos congelados en <code>src/types/index.ts</code>.</li>
          <li>Sin datos de salud reales en esta pantalla.</li>
        </ul>
      </section>

      <footer className="border-t border-neutral-800 pt-4 text-xs text-neutral-500">
        Prototipo de hackathon. No es un dispositivo médico y no sustituye el
        criterio de un profesional de salud.
      </footer>
    </main>
  );
}

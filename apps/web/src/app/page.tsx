export default function HomePage() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 sm:px-8">
      <header className="flex items-center justify-between border-b border-border py-5 sm:py-6">
        <p
          className="m-0 text-xl font-semibold tracking-[-0.06em] sm:text-2xl"
          aria-label="Vaartiva"
        >
          vaarti<span className="text-primary">va</span>
        </p>
        <p className="m-0 text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase sm:text-sm">
          Web foundation
        </p>
      </header>

      <main className="flex flex-1 items-center py-16 sm:py-24">
        <section className="w-full max-w-4xl" aria-labelledby="welcome-heading">
          <p className="mb-6 flex items-center gap-3 text-sm font-medium text-muted-foreground sm:text-base">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-primary" />
            Meet together. Think together. Get things done.
          </p>
          <h1
            id="welcome-heading"
            className="max-w-4xl text-[clamp(2.5rem,9vw,6.5rem)] leading-[0.98] font-medium tracking-[-0.065em] text-foreground"
          >
            Conversations, amplified by intelligence.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground sm:mt-10 sm:text-xl sm:leading-9">
            An AI-native meeting and collaboration platform designed to bring people, knowledge, and
            intelligent assistance together.
          </p>
          <div className="mt-12 inline-flex max-w-full items-center gap-3 rounded-full border border-border bg-surface px-4 py-3 text-sm text-foreground sm:mt-16 sm:px-5">
            <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-status-success" />
            <span>Web application foundation initialized</span>
          </div>
        </section>
      </main>
    </div>
  );
}

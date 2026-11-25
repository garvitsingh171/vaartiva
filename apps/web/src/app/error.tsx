'use client';

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-5 py-20 sm:px-8">
      <p className="mb-4 text-sm font-semibold tracking-[0.14em] text-primary uppercase">
        Something went wrong
      </p>
      <h1 className="max-w-2xl text-4xl leading-tight font-semibold tracking-[-0.04em] sm:text-5xl">
        This page couldn’t load.
      </h1>
      <p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">
        Please try again. If the problem continues, return to the home page.
      </p>
      <button
        className="mt-8 min-h-12 w-fit rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:brightness-95"
        onClick={reset}
        type="button"
      >
        Try again
      </button>
    </main>
  );
}

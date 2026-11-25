import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-5 py-20 sm:px-8">
      <p className="mb-4 text-sm font-semibold tracking-[0.14em] text-primary uppercase">404</p>
      <h1 className="max-w-2xl text-4xl leading-tight font-semibold tracking-[-0.04em] sm:text-5xl">
        We couldn’t find that page.
      </h1>
      <p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">
        The address may be incorrect, or the page may have moved.
      </p>
      <Link
        className="mt-8 inline-flex min-h-12 w-fit items-center rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:brightness-95"
        href="/"
      >
        Return to Vaartiva
      </Link>
    </main>
  );
}

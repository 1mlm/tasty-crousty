import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "404 — Tasty Crousty",
}

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-4 text-center">
      <Image
        src="/icon.png"
        alt="Tasty Crousty"
        width={96}
        height={96}
        className="rounded-3xl shadow-xl shadow-primary/20"
      />

      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">404</p>
        <h1 className="text-4xl font-extrabold text-foreground md:text-6xl">
          Page not found
        </h1>
        <p className="mx-auto max-w-sm text-muted-foreground">
          Looks like this page took a wrong turn. Maybe it went out for a burger.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/30 transition-opacity hover:opacity-90"
        >
          ← Back to Home
        </Link>
        <Link
          href="/menu"
          className="rounded-xl bg-primary/10 px-6 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/20"
        >
          View Menu
        </Link>
      </div>
    </div>
  )
}

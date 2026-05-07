import Link from "next/link"
import { config } from "@/app/data/config"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/20 via-background to-accent/30 px-4 py-20 md:py-32">
      {/* Decorative blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 -right-20 size-72 rounded-full bg-primary/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-10 -left-10 size-56 rounded-full bg-accent/40 blur-3xl"
      />

      <div className="relative mx-auto max-w-3xl text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/15 px-4 py-1.5 text-sm font-medium text-primary">
          <span>🔥</span>
          <span>Now serving Ifrane's favourite burgers</span>
        </div>

        <h1 className="mb-5 text-4xl font-extrabold tracking-tight text-foreground md:text-6xl">
          {config.tagline.split(" ").slice(0, -2).join(" ")}{" "}
          <span className="text-primary">
            {config.tagline.split(" ").slice(-2).join(" ")}
          </span>
        </h1>

        <p className="mx-auto mb-8 max-w-xl text-base text-muted-foreground md:text-lg">
          {config.description}
        </p>

        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/menu"
            className="rounded-xl bg-primary px-7 py-3 text-base font-semibold text-primary-foreground shadow-md shadow-primary/30 transition-all hover:opacity-90 hover:shadow-lg hover:shadow-primary/40 active:scale-95"
          >
            See the Menu
          </Link>
          <Link
            href="/contact"
            className="rounded-xl border border-border bg-card px-7 py-3 text-base font-medium text-foreground transition-colors hover:bg-primary/10 hover:text-primary"
          >
            Find Us
          </Link>
        </div>

        <div className="mt-10 flex justify-center gap-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <span className="text-base">⭐</span>
            <span>4.9 / 5 rating</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-base">🚀</span>
            <span>Made to order</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-base">🌿</span>
            <span>Fresh ingredients</span>
          </div>
        </div>
      </div>
    </section>
  )
}

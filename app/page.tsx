import Link from "next/link"
import { Hero } from "@/app/components/Hero"
import { MenuSection } from "@/app/components/MenuSection"
import { config } from "@/app/data/config"
import { icons } from "@/app/data/ui"
import { Icon } from "@/shadcn/cpns/Icon"

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Featured menu */}
      <div className="bg-background">
        <div className="pt-10 text-center">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            Fan Favourites
          </h2>
          <p className="mt-2 text-muted-foreground">
            The dishes our regulars can&apos;t stop ordering
          </p>
        </div>
        <MenuSection limit={4} />
        <div className="pb-12 text-center">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 rounded-xl border border-primary px-6 py-2.5 text-sm font-semibold text-primary hover:bg-primary/10 transition-colors"
          >
            <Icon icon={icons.nav["/menu"]} className="size-4" />
            View Full Menu
            <Icon icon={icons.arrowRight} className="size-4" />
          </Link>
        </div>
      </div>

      {/* Why us */}
      <section className="bg-card px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-10 text-center text-3xl font-bold text-foreground md:text-4xl">
            Why Tasty Crousty?
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                icon: "🥩",
                title: "Fresh Every Day",
                desc: "We prep our patties fresh daily; never frozen, never rushed.",
              },
              {
                icon: "⚡",
                title: "Fast & Hot",
                desc: "Made to order and in your hands within minutes.",
              },
              {
                icon: "❤️",
                title: "Made with Love",
                desc: "Every recipe crafted by people who genuinely love good food.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl bg-background p-6 text-center ring-1 ring-foreground/8"
              >
                <div className="mb-3 text-4xl">{item.icon}</div>
                <h3 className="mb-2 font-semibold text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="bg-primary px-4 py-14 text-center">
        <h2 className="mb-3 text-2xl font-bold text-primary-foreground md:text-3xl">
          Hungry? We&apos;re open now.
        </h2>
        <p className="mb-6 text-primary-foreground/80">
          {config.hours.weekdays} weekdays · {config.hours.weekends} weekends
        </p>
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 rounded-xl bg-primary-foreground px-7 py-3 font-semibold text-primary hover:opacity-90 transition-opacity"
          >
            <Icon icon={icons.orderNow} className="size-5" />
            Browse Menu
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl border border-primary-foreground/40 px-7 py-3 font-semibold text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
          >
            <Icon icon={icons.location} className="size-5" />
            Get Directions
          </Link>
        </div>
      </section>
    </>
  )
}

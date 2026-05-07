import type { Metadata } from "next"
import Link from "next/link"
import { config } from "@/app/data/config"

export const metadata: Metadata = {
  title: "About — Tasty Crousty",
  description: "Learn about the story and people behind Tasty Crousty.",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-b from-primary/15 to-background px-4 py-14 text-center">
        <h1 className="text-4xl font-extrabold text-foreground md:text-5xl">
          About Us
        </h1>
        <p className="mt-3 text-muted-foreground">
          The people and passion behind every bite
        </p>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-12 space-y-16">
        {/* Story */}
        <section className="grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="mb-4 text-2xl font-bold text-foreground">Our Story</h2>
            <p className="mb-3 text-muted-foreground leading-relaxed">
              Tasty Crousty was born out of a simple craving: a burger that actually
              hits. We started small, cooking for friends and family, and the word
              spread faster than we could flip patties.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Today we're proud to be Ifrane's go-to spot for comfort food that's
              fast without cutting corners. Every ingredient is sourced fresh,
              every recipe is made with care.
            </p>
          </div>
          <div className="flex h-64 items-center justify-center rounded-2xl bg-accent/40 text-7xl">
            🍔
          </div>
        </section>

        {/* Values */}
        <section>
          <h2 className="mb-8 text-center text-2xl font-bold text-foreground">
            What We Stand For
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {[
              {
                icon: "🌿",
                title: "Fresh Ingredients",
                desc: "No shortcuts. We prep daily with real, quality ingredients.",
              },
              {
                icon: "🤝",
                title: "Community First",
                desc: "We're a local business that invests back into Ifrane.",
              },
              {
                icon: "♻️",
                title: "Responsible Packaging",
                desc: "Our packaging is recyclable and we're always improving.",
              },
              {
                icon: "😄",
                title: "Happy Staff, Happy Food",
                desc: "We believe good energy goes into every dish we make.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex gap-4 rounded-2xl bg-card p-5 ring-1 ring-foreground/8"
              >
                <span className="text-3xl">{item.icon}</span>
                <div>
                  <h3 className="mb-1 font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Hours */}
        <section className="rounded-2xl bg-primary/10 px-8 py-10 text-center">
          <h2 className="mb-6 text-2xl font-bold text-foreground">Opening Hours</h2>
          <div className="inline-grid grid-cols-2 gap-x-12 gap-y-3 text-sm">
            <span className="text-right font-medium text-foreground">
              Monday - Friday
            </span>
            <span className="text-left text-muted-foreground">
              {config.hours.weekdays}
            </span>
            <span className="text-right font-medium text-foreground">
              Saturday - Sunday
            </span>
            <span className="text-left text-muted-foreground">
              {config.hours.weekends}
            </span>
          </div>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/menu"
              className="rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
            >
              See the Menu
            </Link>
            <Link
              href="/contact"
              className="rounded-xl border border-primary px-6 py-2.5 text-sm font-semibold text-primary hover:bg-primary/10 transition-colors"
            >
              Find Us
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}

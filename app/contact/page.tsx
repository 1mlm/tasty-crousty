import type { Metadata } from "next"
import { config } from "@/app/data/config"

export const metadata: Metadata = {
  title: "Contact — Tasty Crousty",
  description: "Find Tasty Crousty — address, phone, email, and opening hours.",
}

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-b from-primary/15 to-background px-4 py-14 text-center">
        <h1 className="text-4xl font-extrabold text-foreground md:text-5xl">
          Contact Us
        </h1>
        <p className="mt-3 text-muted-foreground">
          Questions? Just want to say hi? We'd love to hear from you.
        </p>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Info cards */}
          <div className="space-y-4">
            {[
              {
                icon: "📍",
                label: "Address",
                value: config.address,
                link: `https://maps.google.com/?q=${encodeURIComponent(config.address)}`,
                linkText: "Open in Google Maps →",
              },
              {
                icon: "📞",
                label: "Phone",
                value: config.phone,
                link: `tel:${config.phone.replace(/\s/g, "")}`,
                linkText: "Call us",
              },
              {
                icon: "✉️",
                label: "Email",
                value: config.email,
                link: `mailto:${config.email}`,
                linkText: "Send an email",
              },
              {
                icon: "⏰",
                label: "Hours",
                value: (
                  <>
                    <span className="block">
                      Mon-Fri: {config.hours.weekdays}
                    </span>
                    <span className="block">
                      Sat-Sun: {config.hours.weekends}
                    </span>
                  </>
                ),
                link: null,
                linkText: null,
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex gap-4 rounded-2xl bg-card p-5 ring-1 ring-foreground/8"
              >
                <span className="mt-0.5 text-2xl">{item.icon}</span>
                <div>
                  <p className="mb-0.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {item.label}
                  </p>
                  <p className="text-sm text-foreground leading-relaxed">
                    {item.value}
                  </p>
                  {item.link && (
                    <a
                      href={item.link}
                      target={item.link.startsWith("http") ? "_blank" : undefined}
                      rel={
                        item.link.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="mt-1 inline-block text-xs font-medium text-primary hover:underline"
                    >
                      {item.linkText}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Social + map placeholder */}
          <div className="space-y-4">
            <div className="flex h-52 items-center justify-center rounded-2xl bg-accent/30 text-6xl ring-1 ring-foreground/8">
              🗺️
            </div>
            <div className="rounded-2xl bg-card p-5 ring-1 ring-foreground/8">
              <h3 className="mb-3 font-semibold text-foreground">Follow Us</h3>
              <div className="flex gap-3">
                <a
                  href={config.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 rounded-xl bg-primary/10 py-2.5 text-center text-sm font-medium text-primary hover:bg-primary/20 transition-colors"
                >
                  📸 Instagram
                </a>
                <a
                  href={config.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 rounded-xl bg-primary/10 py-2.5 text-center text-sm font-medium text-primary hover:bg-primary/20 transition-colors"
                >
                  👍 Facebook
                </a>
              </div>
            </div>

            {/* Quick note about chat */}
            <div className="rounded-2xl border border-dashed border-primary/40 bg-primary/5 p-5 text-center">
              <p className="text-sm text-foreground">
                💬 Use the{" "}
                <span className="font-semibold text-primary">chat button</span>{" "}
                at the bottom-right to ask us anything instantly!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

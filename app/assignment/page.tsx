import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Assignment Compliance — Tasty Crousty",
  description: "ENG 2303 Final Project — requirement checklist for Tasty Crousty.",
}

const requirements = [
  {
    id: 1,
    requirement: "Design a professional website for your business or organization.",
    result:
      "Tasty Crousty — a fast food burger restaurant. Consistent branding (warm orange/yellow palette, Outfit typeface), professional layout across all pages.",
    links: [{ label: "Home", href: "/" }],
  },
  {
    id: 2,
    requirement: "Plan your ideas by sketching the structure and main sections of your site.",
    result:
      "Site structured into 4 pages: Home (hero + featured menu + value props + CTA), Menu (full catalogue with category filters), About (story + values + hours), Contact (address, phone, email, map, socials).",
    links: [
      { label: "Home", href: "/" },
      { label: "Menu", href: "/menu" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    id: 3,
    requirement: "Ensure your content is clear, concise, and adapted to your audience.",
    result:
      "All copy is short, direct, and written for a casual fast-food customer. Prices visible on every menu card. Hours and address on multiple pages. No jargon.",
    links: [
      { label: "Menu", href: "/menu" },
      { label: "About", href: "/about" },
    ],
  },
  {
    id: 4,
    requirement: "Include important sections such as services, client information, and contact details.",
    result:
      "Services → full menu with 12 items across 4 categories. Client info → About page (story, values, opening hours). Contact → dedicated Contact page with address, phone, email, Google Maps link, social media.",
    links: [
      { label: "Menu (services)", href: "/menu" },
      { label: "About (client info)", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    id: 5,
    requirement:
      "Include Hyperlinks: Your website must contain functional hyperlinks to navigate between pages or access external resources.",
    result:
      "Inter-page: navbar links (Home, Menu, About, Contact), CTA buttons throughout. External: Google Maps directions link, tel: phone link, mailto: email link, Instagram & Facebook links (open in new tab).",
    links: [
      { label: "Contact page (external links)", href: "/contact" },
    ],
    highlight: true,
  },
  {
    id: 6,
    requirement:
      "Add a Chat/Dialog Box: Include a chat or feedback section where clients can ask questions, write messages, or evaluate your product/service.",
    result:
      "Floating chat widget (bottom-right on every page). Keyword-based bot answers questions about hours, location, phone, menu, allergens, orders. Customers can also leave a 1–5 star rating by typing 'rate', 'review', or 'feedback'.",
    links: [],
    highlight: true,
    note: "Trigger the chat bubble → bottom-right of this page.",
  },
  {
    id: 7,
    requirement: "Prioritize mobile users since more traffic is from mobile than desktop.",
    result:
      "Mobile-first layout throughout: responsive grid (1 → 2 → 3 → 4 columns), hamburger nav on small screens, touch-friendly button sizes, fluid typography.",
    links: [{ label: "Home", href: "/" }],
  },
]

export default function AssignmentPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-b from-primary/15 to-background px-4 py-14 text-center">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">
          ENG 2303 — Final Project
        </p>
        <h1 className="text-4xl font-extrabold text-foreground md:text-5xl">
          Assignment Requirements
        </h1>
        <p className="mt-3 text-muted-foreground">
          Every requirement mapped to its implementation in the site.
        </p>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-12 space-y-5">
        {requirements.map((req) => (
          <div
            key={req.id}
            className={`rounded-2xl p-6 ring-1 ${
              req.highlight
                ? "bg-primary/5 ring-primary/30"
                : "bg-card ring-foreground/8"
            }`}
          >
            <div className="mb-3 flex items-start gap-3">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                {req.id}
              </span>
              <p className="text-sm font-semibold text-foreground leading-snug">
                {req.requirement}
              </p>
            </div>

            <div className="ml-10">
              <div className="mb-3 flex items-start gap-2">
                <span className="mt-0.5 text-base">✅</span>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {req.result}
                </p>
              </div>

              {req.note && (
                <p className="mb-3 text-xs font-medium text-primary">
                  👉 {req.note}
                </p>
              )}

              {req.links.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {req.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="rounded-lg bg-primary/10 px-3 py-1 text-xs font-medium text-primary hover:bg-primary/20 transition-colors"
                    >
                      {link.label} →
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

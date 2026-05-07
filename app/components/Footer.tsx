import Link from "next/link"
import { config } from "@/app/data/config"
import { navLinks } from "@/app/data/nav"
import { icons } from "@/app/data/ui"
import { Icon } from "@/shadcn/cpns/Icon"

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-card">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="text-2xl">🍔</span>
              <span className="font-bold text-foreground">{config.name}</span>
            </div>
            <p className="text-sm text-muted-foreground">{config.description}</p>
            <div className="mt-4 flex gap-3">
              <a
                href={config.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/20 transition-colors"
              >
                <Icon icon={icons.instagram} className="size-3.5" />
                Instagram
              </a>
              <a
                href={config.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/20 transition-colors"
              >
                <Icon icon={icons.facebook} className="size-3.5" />
                Facebook
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">Pages</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => {
                const NavIcon = icons.nav[link.href as keyof typeof icons.nav]
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {NavIcon && <Icon icon={NavIcon} className="size-3.5" />}
                      {link.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">Visit Us</h3>
            <ul className="space-y-2.5">
              {[
                { icon: icons.location, text: config.address },
                { icon: icons.phone, text: config.phone },
                { icon: icons.email, text: config.email },
              ].map((item) => (
                <li key={item.text} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Icon icon={item.icon} className="mt-0.5 size-3.5 shrink-0" />
                  {item.text}
                </li>
              ))}
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Icon icon={icons.clock} className="mt-0.5 size-3.5 shrink-0" />
                <span>
                  <span className="font-medium text-foreground">Mon-Fri:</span>{" "}
                  {config.hours.weekdays}
                  <br />
                  <span className="font-medium text-foreground">Sat-Sun:</span>{" "}
                  {config.hours.weekends}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border/60 pt-6 flex flex-col items-center gap-2 text-center text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} {config.name}. All rights reserved.</span>
          <Link
            href="/assignment"
            className="text-muted-foreground/50 hover:text-primary transition-colors"
          >
            ENG 2303 — Assignment Requirements
          </Link>
        </div>
      </div>
    </footer>
  )
}

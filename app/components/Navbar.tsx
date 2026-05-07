"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { config } from "@/app/data/config"
import { navLinks } from "@/app/data/nav"
import { icons } from "@/app/data/ui"
import { Icon } from "@/shadcn/cpns/Icon"
import { cn } from "@/shadcn/lib/utils"

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/90 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-primary">🍔</span>
          <span className="font-bold text-foreground">{config.name}</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const NavIcon = icons.nav[link.href as keyof typeof icons.nav]
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary",
                  pathname === link.href
                    ? "bg-primary/15 text-primary"
                    : "text-muted-foreground"
                )}
              >
                {NavIcon && <Icon icon={NavIcon} className="size-3.5" />}
                {link.label}
              </Link>
            )
          })}
          <Link
            href="/menu"
            className="ml-2 flex items-center gap-1.5 rounded-lg bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Icon icon={icons.orderNow} className="size-3.5" />
            Order Now
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
          className="flex flex-col gap-1.5 rounded-md p-2 md:hidden"
        >
          <span
            className={cn(
              "block h-0.5 w-5 rounded-full bg-foreground transition-transform duration-200",
              open && "translate-y-2 rotate-45"
            )}
          />
          <span
            className={cn(
              "block h-0.5 w-5 rounded-full bg-foreground transition-opacity duration-200",
              open && "opacity-0"
            )}
          />
          <span
            className={cn(
              "block h-0.5 w-5 rounded-full bg-foreground transition-transform duration-200",
              open && "-translate-y-2 -rotate-45"
            )}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="border-t border-border/60 bg-background px-4 pb-4 md:hidden">
          {navLinks.map((link) => {
            const NavIcon = icons.nav[link.href as keyof typeof icons.nav]
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary",
                  pathname === link.href
                    ? "bg-primary/15 text-primary"
                    : "text-muted-foreground"
                )}
              >
                {NavIcon && <Icon icon={NavIcon} className="size-4" />}
                {link.label}
              </Link>
            )
          })}
          <Link
            href="/menu"
            onClick={() => setOpen(false)}
            className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            <Icon icon={icons.orderNow} className="size-4" />
            Order Now
          </Link>
        </nav>
      )}
    </header>
  )
}

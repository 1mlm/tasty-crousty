import type { Metadata } from "next"
import { MenuSection } from "@/app/components/MenuSection"

export const metadata: Metadata = {
  title: "Menu — Tasty Crousty",
  description: "Browse our full menu of burgers, sides, drinks, and desserts.",
}

export default function MenuPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-b from-primary/15 to-background px-4 py-12 text-center">
        <h1 className="text-4xl font-extrabold text-foreground md:text-5xl">
          Our Menu
        </h1>
        <p className="mt-3 text-muted-foreground">
          Everything made fresh — pick your favourite
        </p>
      </div>
      <MenuSection showFilters />
    </div>
  )
}

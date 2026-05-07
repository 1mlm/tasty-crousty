"use client"

import Image from "next/image"
import { useState } from "react"
import { categories, menuItems, tagStyles, type Category } from "@/app/data/menu"
import { icons } from "@/app/data/ui"
import { Icon } from "@/shadcn/cpns/Icon"
import { cn } from "@/shadcn/lib/utils"

function MenuCard({ item }: { item: (typeof menuItems)[number] }) {
  const [imgError, setImgError] = useState(false)
  const CategoryIcon = icons.categories[item.category]

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl bg-card ring-1 ring-foreground/8 transition-shadow hover:shadow-md hover:shadow-primary/10">
      {/* Image area */}
      <div className="relative aspect-[4/3] overflow-hidden bg-accent/30">
        {!imgError ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => setImgError(true)}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-primary/40">
            <Icon icon={CategoryIcon} className="size-16" strokeWidth={1} />
          </div>
        )}
        {item.popular && (
          <span className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground shadow">
            <Icon icon={icons.popular} className="size-3" />
            Popular
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-1 flex items-start justify-between gap-2">
          <h3 className="font-semibold text-foreground leading-snug">{item.name}</h3>
          <span className="shrink-0 font-bold text-primary">
            ${item.price.toFixed(2)}
          </span>
        </div>
        <p className="mb-3 text-sm text-muted-foreground leading-relaxed">
          {item.description}
        </p>
        {item.tags && item.tags.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-1.5">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className={cn(
                  "rounded-full px-2 py-0.5 text-xs font-medium",
                  tagStyles[tag].className
                )}
              >
                {tagStyles[tag].label}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export function MenuSection({
  title,
  showFilters = false,
  limit,
}: {
  title?: string
  showFilters?: boolean
  limit?: number
}) {
  const [activeCategory, setActiveCategory] = useState<Category | "all">("all")

  const filtered =
    activeCategory === "all"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory)

  const displayed = limit ? filtered.slice(0, limit) : filtered

  return (
    <section className="px-4 py-12">
      <div className="mx-auto max-w-6xl">
        {title && (
          <h2 className="mb-2 text-center text-3xl font-bold text-foreground md:text-4xl">
            {title}
          </h2>
        )}

        {showFilters && (
          <div className="mt-6 mb-8 flex flex-wrap justify-center gap-2">
            <button
              type="button"
              onClick={() => setActiveCategory("all")}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                activeCategory === "all"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground ring-1 ring-border hover:bg-primary/10 hover:text-primary"
              )}
            >
              All
            </button>
            {categories.map((cat) => {
              const CatIcon = icons.categories[cat.value]
              return (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setActiveCategory(cat.value)}
                  className={cn(
                    "flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                    activeCategory === cat.value
                      ? "bg-primary text-primary-foreground"
                      : "bg-card text-muted-foreground ring-1 ring-border hover:bg-primary/10 hover:text-primary"
                  )}
                >
                  <Icon icon={CatIcon} className="size-3.5" />
                  {cat.label}
                </button>
              )
            })}
          </div>
        )}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {displayed.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}

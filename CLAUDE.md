# Tasty Crousty — Project Context

## What this is
Restaurant website for ENG 2303 Final Project assessment. Built on `1mlm/nextjs-template`.

## Brief
- **Name:** Tasty Crousty
- **Cuisine:** Fast food / Burgers
- **Vibe:** Cute and friendly
- **Palette:** Warm orange & yellow
  - Background: `#FFFBF0` / `oklch(~0.99 0.02 85)`
  - Accent: `#FF8C42` / `oklch(~0.72 0.18 50)`
  - Text: `#3D2B1F`
  - Card: `#FFF5E0`

## Assessment requirements
1. Professional website for a business/org
2. Clear, concise content adapted to audience
3. Sections: services, client info, contact
4. Functional **hyperlinks** (inter-page + external)
5. **Chat / dialog box** — clients ask questions, write messages, or evaluate service
6. Mobile-first

## Tech stack (from template)
- Next.js 16 + React 19 + TypeScript 5
- Tailwind CSS 4 (oklch color space, `light-dark()` theming)
- shadcn/ui (Radix primitives, Nova style)
- HugeIcons (`@hugeicons/core-free-icons` + `@hugeicons/react`)
- Biome (linter/formatter, ignores `shadcn/`)
- Path alias: `@/*` → `./`

## Template file layout
```
app/
  layout.tsx       — fonts: Outfit (--font-sans), Geist, Geist Mono
  page.tsx         — currently renders <ComponentExample />, REPLACE THIS
  favicon.ico
shadcn/
  ui/              — Button, Card, Input, Textarea, Badge, etc.
  cpns/Icon.tsx    — <Icon icon={XxxIcon} strokeWidth={2} />
  lib/utils.ts     — cn() helper
  examples/        — demo only, ignore
styles/
  globals.css      — Tailwind + shadcn imports, oklch CSS vars (currently violet theme)
```

## What still needs to be built (nothing done yet)
User wants a **config-driven** site — arrays/objects the user can edit to change:
- Menu items (name, price, description, category, which HugeIcon)
- Nav links
- Restaurant info (hours, address, social links)

### Planned file structure to create
```
app/
  data/
    config.ts      — restaurant info, hours, social links
    menu.ts        — menu items array (name, price, desc, category, icon)
    nav.ts         — nav links array
  components/
    Navbar.tsx
    Hero.tsx
    MenuSection.tsx   — renders from menu.ts array
    ChatDialog.tsx    — shadcn dialog, feedback/chat form
    Footer.tsx
  page.tsx            — Home (Hero + featured menu + CTA)
  menu/page.tsx       — Full menu page
  about/page.tsx      — About page
  contact/page.tsx    — Contact + embedded chat
styles/
  globals.css         — update --primary to orange/yellow oklch values
```

## globals.css current state
Uses violet theme (`oklch(0.541 0.281 293.009)` as primary). Need to swap to orange:
- `--primary`: `oklch(0.72 0.18 55)` (warm orange)
- `--accent`: `oklch(0.88 0.12 85)` (soft yellow)

## Icon usage pattern
```tsx
import { BurgerIcon, FireIcon } from "@hugeicons/core-free-icons"
import { Icon } from "@/shadcn/cpns/Icon"

<Icon icon={BurgerIcon} className="size-5" />
```

## Start here when opening in tasty-crousty/
1. Run `npm install` if node_modules missing
2. Run `npm run dev` to verify baseline works
3. Build in order: `globals.css` → `app/data/*` → `app/components/*` → pages
4. Replace `app/page.tsx` (currently shows component demo)

export type Category = "burgers" | "sides" | "drinks" | "desserts"

export type Tag = "spicy" | "vegan" | "new" | "gluten-free" | "fan-fave"

export type MenuItem = {
  id: string
  name: string
  price: number
  description: string
  category: Category
  image: string
  popular?: boolean
  tags?: Tag[]
}

export const menuItems: MenuItem[] = [
  // Burgers
  {
    id: "classic-burger",
    name: "Classic Burger",
    price: 8.99,
    description: "Juicy beef patty, lettuce, tomato, pickles & secret sauce",
    category: "burgers",
    image: "/menu/classic-burger.jpg",
    popular: true,
    tags: ["fan-fave"],
  },
  {
    id: "double-smash",
    name: "Double Smash",
    price: 11.99,
    description: "Two smashed patties, American cheese, caramelised onions",
    category: "burgers",
    image: "/menu/double-smash.jpg",
    popular: true,
    tags: ["fan-fave", "spicy"],
  },
  {
    id: "crispy-chicken",
    name: "Crispy Chicken",
    price: 9.99,
    description: "Buttermilk fried chicken, coleslaw, pickles, honey mustard",
    category: "burgers",
    image: "/menu/crispy-chicken.jpg",
    tags: ["spicy", "new"],
  },
  {
    id: "veggie-burger",
    name: "Veggie Burger",
    price: 8.49,
    description: "Plant-based patty, avocado, sprouts, chipotle mayo",
    category: "burgers",
    image: "/menu/veggie-burger.jpg",
    tags: ["vegan", "gluten-free"],
  },
  // Sides
  {
    id: "crispy-fries",
    name: "Crispy Fries",
    price: 3.99,
    description: "Golden fries, perfectly salted",
    category: "sides",
    image: "/menu/crispy-fries.jpg",
    popular: true,
    tags: ["fan-fave", "vegan"],
  },
  {
    id: "onion-rings",
    name: "Onion Rings",
    price: 4.49,
    description: "Beer-battered onion rings, ranch dip",
    category: "sides",
    image: "/menu/onion-rings.jpg",
    tags: ["vegan"],
  },
  {
    id: "cheese-bites",
    name: "Cheese Bites",
    price: 4.99,
    description: "Fried mozzarella bites, marinara sauce",
    category: "sides",
    image: "/menu/cheese-bites.jpg",
    tags: ["new"],
  },
  // Drinks
  {
    id: "fresh-lemonade",
    name: "Fresh Lemonade",
    price: 2.99,
    description: "Hand-squeezed lemonade with mint & ice",
    category: "drinks",
    image: "/menu/fresh-lemonade.jpg",
    popular: true,
    tags: ["vegan", "new"],
  },
  {
    id: "milkshake",
    name: "Classic Milkshake",
    price: 4.99,
    description: "Thick & creamy — vanilla, chocolate, or strawberry",
    category: "drinks",
    image: "/menu/milkshake.jpg",
    tags: ["fan-fave"],
  },
  {
    id: "soft-drink",
    name: "Soft Drink",
    price: 1.99,
    description: "Coke, Sprite, or Fanta — ice cold",
    category: "drinks",
    image: "/menu/soft-drink.jpg",
    tags: ["vegan"],
  },
  // Desserts
  {
    id: "churros",
    name: "Churros",
    price: 3.99,
    description: "Cinnamon sugar churros, chocolate dipping sauce",
    category: "desserts",
    image: "/menu/churros.jpg",
    tags: ["new", "vegan"],
  },
  {
    id: "brownie",
    name: "Fudge Brownie",
    price: 3.49,
    description: "Warm gooey brownie, vanilla ice cream",
    category: "desserts",
    image: "/menu/brownie.jpg",
    popular: true,
    tags: ["fan-fave"],
  },
]

export const categories: { value: Category; label: string }[] = [
  { value: "burgers", label: "Burgers" },
  { value: "sides", label: "Sides" },
  { value: "drinks", label: "Drinks" },
  { value: "desserts", label: "Desserts" },
]

export const tagStyles: Record<Tag, { label: string; className: string }> = {
  "fan-fave": { label: "Fan Fave", className: "bg-primary/15 text-primary" },
  spicy: { label: "🌶 Spicy", className: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400" },
  vegan: { label: "🌿 Vegan", className: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" },
  new: { label: "New", className: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" },
  "gluten-free": { label: "GF", className: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-500" },
}

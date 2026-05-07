export type Category = "burgers" | "sides" | "drinks" | "desserts";

export type Tag = "spicy" | "vegan" | "new" | "gluten-free" | "fan-fave";

export type MenuItem = {
  id: string;
  name: string;
  price: number;
  description: string;
  category: Category;
  image: string;
  popular?: boolean;
  tags?: Tag[];
};

export const menuItems: MenuItem[] = [
  // Burgers
  {
    id: "normal-cheeseburger",
    name: "Normal Cheeseburger",
    price: 8.99,
    description:
      "For the purists: classic beef patty, American cheese, lettuce, tomato, onion, pickles",
    category: "burgers",
    image: "/menu/normal-cheeseburger.png",
    popular: true,
    tags: ["fan-fave"],
  },
  {
    id: "double-bacon-burger",
    name: "Double Bacon Burger",
    price: 11.99,
    description:
      "Two times the beef, double bacon, cheddar, BBQ sauce, crispy onions",
    category: "burgers",
    image: "/menu/double-bacon-burger.png",
    popular: true,
    tags: ["fan-fave", "spicy"],
  },
  {
    id: "bacon-burger",
    name: "Bacon Burger",
    price: 10.99,
    description:
      "Classic beef patty, crispy bacon, cheddar, lettuce, tomato, onion, pickles",
    category: "burgers",
    image: "/menu/bacon-burger.png",
    tags: ["spicy", "new"],
  },
  {
    id: "spicy-chicken-burger",
    name: "Spicy Chicken Burger",
    price: 9.99,
    description:
      "Crispy spicy chicken, jalapeños, mayo, lettuce, tomato, onion, pickles",
    category: "burgers",
    image: "/menu/spicy-chicken-burger.png",
    tags: ["vegan", "gluten-free"],
  },
  // Sides
  {
    id: "fish-n-chips",
    name: "Fish and Chips",
    price: 8.99,
    description: "Crispy battered fish with golden fries and tartar sauce",
    category: "sides",
    image: "/menu/fish-n-chips.png",
    popular: true,
    tags: ["fan-fave", "vegan"],
  },
];

export const categories: { value: Category; label: string }[] = [
  { value: "burgers", label: "Burgers" },
  { value: "sides", label: "Sides" },
];

export const tagStyles: Record<Tag, { label: string; className: string }> = {
  "fan-fave": { label: "Fan Fave", className: "bg-primary/15 text-primary" },
  spicy: {
    label: "🌶 Spicy",
    className: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
  },
  vegan: {
    label: "🌿 Vegan",
    className:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  },
  new: {
    label: "New",
    className:
      "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  },
  "gluten-free": {
    label: "GF",
    className:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-500",
  },
};

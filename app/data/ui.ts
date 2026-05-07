import {
  ArrowRight01Icon,
  CallIcon,
  Clock01Icon,
  Coffee01Icon,
  CustomerServiceIcon,
  Facebook01Icon,
  FireIcon,
  Hamburger01Icon,
  Home01Icon,
  InformationCircleIcon,
  InstagramIcon,
  Location01Icon,
  Mail01Icon,
  Menu01Icon,
  SentIcon,
  ShoppingCart01Icon,
  StarIcon,
} from "@hugeicons/core-free-icons"

export const icons = {
  // Nav links (keyed by href)
  nav: {
    "/": Home01Icon,
    "/menu": Menu01Icon,
    "/about": InformationCircleIcon,
    "/contact": CustomerServiceIcon,
  },

  // Social
  instagram: InstagramIcon,
  facebook: Facebook01Icon,

  // Actions
  orderNow: ShoppingCart01Icon,
  arrowRight: ArrowRight01Icon,
  send: SentIcon,

  // Contact details
  location: Location01Icon,
  phone: CallIcon,
  email: Mail01Icon,
  clock: Clock01Icon,

  // Menu categories
  categories: {
    burgers: Hamburger01Icon,
    sides: FireIcon,
    drinks: Coffee01Icon,
    desserts: StarIcon,
  },

  // Misc
  popular: FireIcon,
}

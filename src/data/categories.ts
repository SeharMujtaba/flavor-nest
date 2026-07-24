export type Category = {
  id: number;
  name: string;
  slug: string;
  image: string;
  items: number;
  description: string;
};

export const categories: Category[] = [
  {
    id: 1,
    name: "Burgers",
    slug: "burgers",
    image: "/images/categories/burger.jpg",
    items: 18,
    description: "Juicy grilled burgers with premium ingredients.",
  },

  {
    id: 2,
    name: "Pizza",
    slug: "pizza",
    image: "/images/categories/pizza.jpg",
    items: 14,
    description: "Cheesy pizzas baked fresh every day.",
  },

  {
    id: 3,
    name: "Pakistani",
    slug: "pakistani",
    image: "/images/categories/pakistani.jpg",
    items: 22,
    description: "Authentic desi flavors and traditional recipes.",
  },

  {
    id: 4,
    name: "Chinese",
    slug: "chinese",
    image: "/images/categories/chinese.jpg",
    items: 15,
    description: "Noodles, fried rice, Manchurian and much more.",
  },

  {
    id: 5,
    name: "Italian",
    slug: "italian",
    image: "/images/categories/italian.jpg",
    items: 11,
    description: "Fresh pasta, lasagna and authentic Italian cuisine.",
  },

  {
    id: 6,
    name: "BBQ",
    slug: "bbq",
    image: "/images/categories/bbq.jpg",
    items: 13,
    description: "Tender grilled BBQ cooked to perfection.",
  },

  {
    id: 7,
    name: "Desserts",
    slug: "desserts",
    image: "/images/categories/dessert.jpg",
    items: 16,
    description: "Cakes, brownies, ice cream and delicious sweets.",
  },

  {
    id: 8,
    name: "Drinks",
    slug: "drinks",
    image: "/images/categories/drinks.jpg",
    items: 20,
    description: "Fresh juices, shakes, coffee and soft drinks.",
  },
];
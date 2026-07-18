export type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  size: string;
  price: number;
  image: string;
};

export const products: Product[] = [
  {
    id: "cedar-planter",
    name: "Cedar Porch Planter",
    category: "Planters",
    description: "A handcrafted cedar planter built for porches, patios, and entryways. Finished smooth and ready for outdoor use.",
    size: "24 in. tall × 14 in. wide",
    price: 95,
    image: "/products/planters/cedar-planter-1.jpeg",
  },
  {
    id: "tall-planter-two",
    name: "Tall Entry Planter",
    category: "Planters",
    description: "A taller tapered planter designed to frame a doorway or storefront entrance.",
    size: "30 in. tall × 16 in. wide",
    price: 125,
    image: "/products/planters/cedar-planter-2.jpeg",
  },
  {
    id: "cedar-planter-three",
    name: "Cedar Porch Planter",
    category: "Planters",
    description: "A simple rustic window box with drainage space and sturdy cedar construction.",
    size: "36 in. long × 8 in. deep",
    price: 80,
    image: "/products/planters/cedar-planter-3.jpeg",
  },
  {
    id: "US-flag",
    name: "U.S. Flag",
    category: "Flags",
    description: "A durable U.S. flag designed for outdoor use.",
    size: "3 ft. tall × 5 ft. wide",
    price: 110,
    image: "/products/flags/us-flag-2.jpeg",
  },
  {
    id: "U.S. Flag-two",
    name: "U.S. Flag",
    category: "Flags",
    description: "A compact side table sized for a porch chair, rocking chair, or outdoor seating area.",
    size: "22 in. tall × 18 in. wide",
    price: 150,
    image: "/products/flags/us-flag-1.jpeg",
  },
  {
    id: "U.S. Flag-three",
    name: "U.S. Flag",
    category: "Flags",
    description: "A rustic tiered display stand for pumpkins, flowers, holiday décor, or farm-stand products.",
    size: "42 in. tall × 36 in. wide",
    price: 175,
    image: "/products/flags/us-flag-2.jpeg",
  }
];

export const categories = Array.from(new Set(products.map((product) => product.category)));

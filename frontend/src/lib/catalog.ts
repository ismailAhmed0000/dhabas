import bagOne from "../assets/bag-1.jpg";
import bagThree from "../assets/bag-3.jpg";
import bagTwo from "../assets/bag-2.jpg";
import heroBag from "../assets/hero-bag.jpg";
import type { Product } from "./api";

export type CatalogProduct = Product & {
  image: string;
  style: BagStyle;
};

export type BagStyle = "Tote" | "Crossbody" | "Shoulder" | "Other";

export type PriceRange = "all" | "under-200" | "200-250" | "over-250";

export type SortOption = "featured" | "price-asc" | "price-desc" | "name-asc";

const imageBySlug: Record<string, string> = {
  "the-arcadia-tote": bagOne,
  "the-celeste-crossbody": bagTwo,
  "the-aurelie-hobo": bagThree,
};

export const fallbackCatalogProducts: CatalogProduct[] = [
  {
    id: "fallback-1",
    name: "The Arcadia Tote",
    slug: "the-arcadia-tote",
    description: "Tan leather tote bag with structured silhouette.",
    priceCents: 21000,
    imageUrl: null,
    tag: "Bestseller",
    stock: 3,
    isPreOrderEnabled: false,
    preOrderExpectedAt: null,
    isActive: true,
    image: bagOne,
    style: "Tote",
  },
  {
    id: "fallback-2",
    name: "The Céleste Crossbody",
    slug: "the-celeste-crossbody",
    description: "Beige crossbody bag in soft neutral leather.",
    priceCents: 18500,
    imageUrl: null,
    tag: "New",
    stock: 5,
    isPreOrderEnabled: false,
    preOrderExpectedAt: null,
    isActive: true,
    image: bagTwo,
    style: "Crossbody",
  },
  {
    id: "fallback-3",
    name: "The Aurelie Hobo",
    slug: "the-aurelie-hobo",
    description: "Cognac brown leather shoulder bag.",
    priceCents: 23000,
    imageUrl: null,
    tag: "Limited",
    stock: 2,
    isPreOrderEnabled: false,
    preOrderExpectedAt: null,
    isActive: true,
    image: bagThree,
    style: "Shoulder",
  },
  {
    id: "fallback-4",
    name: "The Sable Tote",
    slug: "the-sable-tote",
    description: "Signature hero tote in warm sand leather.",
    priceCents: 24500,
    imageUrl: null,
    tag: "New",
    stock: 1,
    isPreOrderEnabled: false,
    preOrderExpectedAt: null,
    isActive: true,
    image: heroBag,
    style: "Tote",
  },
];

export function inferBagStyle(name: string): BagStyle {
  const lower = name.toLowerCase();
  if (lower.includes("tote")) return "Tote";
  if (lower.includes("crossbody")) return "Crossbody";
  if (lower.includes("hobo") || lower.includes("shoulder")) return "Shoulder";
  return "Other";
}

export function toCatalogProduct(product: Product): CatalogProduct {
  return {
    ...product,
    image: product.imageUrl ?? imageBySlug[product.slug] ?? bagOne,
    style: inferBagStyle(product.name),
  };
}

export function isInStock(product: Product) {
  return product.stock > 0;
}

export function matchesPriceRange(priceCents: number, range: PriceRange) {
  switch (range) {
    case "under-200":
      return priceCents < 20000;
    case "200-250":
      return priceCents >= 20000 && priceCents <= 25000;
    case "over-250":
      return priceCents > 25000;
    default:
      return true;
  }
}

export function sortProducts(products: CatalogProduct[], sort: SortOption) {
  const sorted = [...products];

  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.priceCents - b.priceCents);
    case "price-desc":
      return sorted.sort((a, b) => b.priceCents - a.priceCents);
    case "name-asc":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return sorted;
  }
}

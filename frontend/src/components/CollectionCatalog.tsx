import { useEffect, useMemo, useState } from "react";
import { Instagram, Search, SlidersHorizontal, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchProducts, formatPrice } from "@/lib/api";
import {
  fallbackCatalogProducts,
  isInStock,
  matchesPriceRange,
  sortProducts,
  toCatalogProduct,
  type BagStyle,
  type CatalogProduct,
  type PriceRange,
  type SortOption,
} from "@/lib/catalog";

const ALL_STYLES: BagStyle[] = ["Tote", "Crossbody", "Shoulder"];

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </p>
      {children}
    </div>
  );
}

function ProductCard({ product }: { product: CatalogProduct }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl bg-card shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={product.image}
          alt={product.description ?? product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          width={800}
          height={1008}
          loading="lazy"
        />
        {product.tag ? (
          <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-foreground">
            {product.tag}
          </span>
        ) : null}
        <span className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
          {product.stock} in stock
        </span>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-lg font-semibold text-card-foreground">
              {product.name}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">{product.style}</p>
          </div>
          <p className="text-sm font-medium text-primary">{formatPrice(product.priceCents)}</p>
        </div>
        {product.description ? (
          <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{product.description}</p>
        ) : null}
        <a
          href="https://instagram.com/islandvoguemv"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-secondary py-2.5 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          <Instagram className="h-4 w-4" />
          DM to Order
        </a>
      </div>
    </article>
  );
}

export function CollectionCatalog() {
  const [products, setProducts] = useState<CatalogProduct[]>(fallbackCatalogProducts);
  const [loadedFromApi, setLoadedFromApi] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");
  const [selectedStyle, setSelectedStyle] = useState<BagStyle | "all">("all");
  const [priceRange, setPriceRange] = useState<PriceRange>("all");
  const [sort, setSort] = useState<SortOption>("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        const inStock = data.filter(isInStock).map(toCatalogProduct);
        if (inStock.length > 0) {
          setProducts(inStock);
          setLoadedFromApi(true);
        }
      })
      .catch(() => {
        setProducts(fallbackCatalogProducts.filter(isInStock));
        setLoadedFromApi(false);
      });
  }, []);

  const availableTags = useMemo(() => {
    const tags = new Set<string>();
    for (const product of products) {
      if (product.tag) tags.add(product.tag);
    }
    return Array.from(tags).sort();
  }, [products]);

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    const filtered = products.filter((product) => {
      if (selectedTag !== "all" && product.tag !== selectedTag) return false;
      if (selectedStyle !== "all" && product.style !== selectedStyle) return false;
      if (!matchesPriceRange(product.priceCents, priceRange)) return false;
      if (!query) return true;

      return (
        product.name.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query) ||
        product.style.toLowerCase().includes(query) ||
        product.tag?.toLowerCase().includes(query)
      );
    });

    return sortProducts(filtered, sort);
  }, [products, search, selectedTag, selectedStyle, priceRange, sort]);

  const activeFilterCount = [
    selectedTag !== "all",
    selectedStyle !== "all",
    priceRange !== "all",
    search.trim().length > 0,
  ].filter(Boolean).length;

  function clearFilters() {
    setSearch("");
    setSelectedTag("all");
    setSelectedStyle("all");
    setPriceRange("all");
    setSort("featured");
  }

  const filtersPanel = (
    <div className="space-y-6">
      <FilterSection title="Search">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search bags..."
            className="pl-9"
          />
        </div>
      </FilterSection>

      <FilterSection title="Style">
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            size="sm"
            variant={selectedStyle === "all" ? "default" : "outline"}
            onClick={() => setSelectedStyle("all")}
          >
            All styles
          </Button>
          {ALL_STYLES.map((style) => (
            <Button
              key={style}
              type="button"
              size="sm"
              variant={selectedStyle === style ? "default" : "outline"}
              onClick={() => setSelectedStyle(style)}
            >
              {style}
            </Button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Tag">
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            size="sm"
            variant={selectedTag === "all" ? "default" : "outline"}
            onClick={() => setSelectedTag("all")}
          >
            All tags
          </Button>
          {availableTags.map((tag) => (
            <Button
              key={tag}
              type="button"
              size="sm"
              variant={selectedTag === tag ? "default" : "outline"}
              onClick={() => setSelectedTag(tag)}
            >
              {tag}
            </Button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Price">
        <div className="space-y-2">
          <Label htmlFor="price-range" className="sr-only">
            Price range
          </Label>
          <Select value={priceRange} onValueChange={(value) => setPriceRange(value as PriceRange)}>
            <SelectTrigger id="price-range">
              <SelectValue placeholder="All prices" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All prices</SelectItem>
              <SelectItem value="under-200">Under $200</SelectItem>
              <SelectItem value="200-250">$200 – $250</SelectItem>
              <SelectItem value="over-250">Over $250</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </FilterSection>

      <FilterSection title="Sort">
        <Select value={sort} onValueChange={(value) => setSort(value as SortOption)}>
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="featured">Featured</SelectItem>
            <SelectItem value="price-asc">Price: low to high</SelectItem>
            <SelectItem value="price-desc">Price: high to low</SelectItem>
            <SelectItem value="name-asc">Name: A to Z</SelectItem>
          </SelectContent>
        </Select>
      </FilterSection>

      {activeFilterCount > 0 ? (
        <Button type="button" variant="outline" className="w-full" onClick={clearFilters}>
          Clear filters
        </Button>
      ) : null}
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
      <div className="mb-10 max-w-2xl">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">
          In Stock
        </span>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          The collection
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          Browse every bag currently available to ship. Filter by style, tag, or price to find
          your next carry.
          {!loadedFromApi ? " Showing sample inventory until the backend is connected." : null}
        </p>
      </div>

      <div className="mb-6 flex items-center justify-between gap-4 lg:hidden">
        <p className="text-sm text-muted-foreground">
          {filteredProducts.length} bag{filteredProducts.length === 1 ? "" : "s"}
        </p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setMobileFiltersOpen((open) => !open)}
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}
        </Button>
      </div>

      {mobileFiltersOpen ? (
        <div className="mb-8 rounded-2xl border border-border bg-card p-5 lg:hidden">
          <div className="mb-4 flex items-center justify-between">
            <p className="font-medium text-foreground">Filters</p>
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(false)}
              className="text-muted-foreground"
              aria-label="Close filters"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          {filtersPanel}
        </div>
      ) : null}

      <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-2xl border border-border bg-card p-5">
            <p className="mb-6 font-display text-lg font-semibold text-card-foreground">Filters</p>
            {filtersPanel}
          </div>
        </aside>

        <section>
          <div className="mb-6 hidden items-center justify-between lg:flex">
            <p className="text-sm text-muted-foreground">
              Showing {filteredProducts.length} of {products.length} in-stock bag
              {products.length === 1 ? "" : "s"}
            </p>
            <Select value={sort} onValueChange={(value) => setSort(value as SortOption)}>
              <SelectTrigger className="w-[220px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-asc">Price: low to high</SelectItem>
                <SelectItem value="price-desc">Price: high to low</SelectItem>
                <SelectItem value="name-asc">Name: A to Z</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border bg-muted/20 px-6 py-16 text-center">
              <p className="font-display text-xl font-semibold text-foreground">No bags found</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Try adjusting your filters or search to see more in-stock pieces.
              </p>
              {activeFilterCount > 0 ? (
                <Button type="button" variant="outline" className="mt-6" onClick={clearFilters}>
                  Clear filters
                </Button>
              ) : null}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

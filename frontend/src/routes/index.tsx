import { createFileRoute } from "@tanstack/react-router";
import { Instagram, ShoppingBag, ArrowRight, Heart, Truck, ShieldCheck } from "lucide-react";

import heroBag from "../assets/hero-bag.jpg";
import bagOne from "../assets/bag-1.jpg";
import bagTwo from "../assets/bag-2.jpg";
import bagThree from "../assets/bag-3.jpg";
import { CinematicIntro } from "../components/CinematicIntro";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Maison Sable | Branded Women's Handbags" },
      { name: "description", content: "Discover curated branded women's handbags. Timeless leather totes, crossbody bags, and shoulder bags sold through our Instagram boutique." },
      { property: "og:title", content: "Maison Sable | Branded Women's Handbags" },
      { property: "og:description", content: "Discover curated branded women's handbags. Timeless leather totes, crossbody bags, and shoulder bags sold through our Instagram boutique." },
      { property: "og:image", content: "https://id-preview--a9d81a67-9706-43a1-b90c-1baa294970f2.lovable.app/hero-bag.jpg" },
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main>
        <CinematicIntro />
        <HeroSection />
        <FeaturedCollection />
        <BrandStory />
        <InstagramShop />
        <TrustSection />
      </main>
      <Footer />
    </div>
  );
}

function Navigation() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-10">
        <a href="/" className="font-display text-xl font-semibold tracking-tight text-foreground">
          Maison Sable
        </a>
        <div className="hidden items-center gap-8 text-sm font-medium text-foreground/80 md:flex">
          <a href="#collection" className="transition-colors hover:text-foreground">Collection</a>
          <a href="#story" className="transition-colors hover:text-foreground">Our Story</a>
          <a href="#shop" className="transition-colors hover:text-foreground">Shop Instagram</a>
        </div>
        <a
          href="https://instagram.com/maisonsable"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <Instagram className="h-4 w-4" />
          <span className="hidden sm:inline">Follow @maisonsable</span>
        </a>
      </nav>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
      <div className="grid items-center gap-10 lg:grid-cols-[55%_45%] lg:gap-16">
        <div className="order-2 flex flex-col items-start lg:order-1">
          <span className="mb-4 inline-block rounded-full bg-accent/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent-foreground">
            Curated Branded Handbags
          </span>
          <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Carry your <br />
            <span className="text-primary">signature</span> moment.
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
            A handpicked selection of branded women's handbags — from everyday totes to
            statement shoulder bags. Sold exclusively through our Instagram boutique.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#collection"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90"
            >
              <ShoppingBag className="h-4 w-4" />
              Shop the Collection
            </a>
            <a
              href="#story"
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-7 py-3.5 text-sm font-semibold text-card-foreground transition-all hover:border-primary/30 hover:bg-accent"
            >
              Discover the brand
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
          <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span>100% Authentic</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-primary" />
              <span>Worldwide Shipping</span>
            </div>
          </div>
        </div>
        <div className="order-1 relative lg:order-2">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted">
            <img
              src={heroBag}
              alt="Maison Sable hero handbag"
              className="h-full w-full object-cover"
              width={1024}
              height={1280}
              loading="eager"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 hidden rounded-xl bg-card p-5 shadow-lg lg:block">
            <p className="font-display text-lg font-semibold text-card-foreground">New Arrival</p>
            <p className="text-sm text-muted-foreground">The Sable Tote — $245</p>
          </div>
        </div>
      </div>
    </section>
  );
}

const products = [
  {
    id: 1,
    name: "The Arcadia Tote",
    price: "$210",
    tag: "Bestseller",
    image: bagOne,
    alt: "Tan leather tote bag",
  },
  {
    id: 2,
    name: "The Céleste Crossbody",
    price: "$185",
    tag: "New",
    image: bagTwo,
    alt: "Beige crossbody bag",
  },
  {
    id: 3,
    name: "The Aurelie Hobo",
    price: "$230",
    tag: "Limited",
    image: bagThree,
    alt: "Cognac brown leather shoulder bag",
  },
];

function FeaturedCollection() {
  return (
    <section id="collection" className="bg-secondary py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">Featured Collection</span>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              This season's most wanted
            </h2>
          </div>
          <a
            href="https://instagram.com/maisonsable"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-primary"
          >
            View all on Instagram
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.id}
              className="group relative overflow-hidden rounded-2xl bg-card shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.alt}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  width={800}
                  height={1008}
                  loading="lazy"
                />
                <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-foreground">
                  {product.tag}
                </span>
                <button
                  type="button"
                  aria-label="Add to wishlist"
                  className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-background/90 text-foreground opacity-0 transition-all hover:bg-primary hover:text-primary-foreground group-hover:opacity-100"
                >
                  <Heart className="h-4 w-4" />
                </button>
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-semibold text-card-foreground">{product.name}</h3>
                <p className="mt-1 text-sm font-medium text-primary">{product.price}</p>
                <a
                  href="https://instagram.com/maisonsable"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-secondary py-2.5 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <Instagram className="h-4 w-4" />
                  DM to Order
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function BrandStory() {
  return (
    <section id="story" className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div className="relative">
          <div className="absolute -left-4 -top-4 h-full w-full rounded-2xl bg-accent/40" />
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <img
              src={bagTwo}
              alt="Beige crossbody bag detail"
              className="h-full w-full object-cover"
              width={800}
              height={1008}
              loading="lazy"
            />
          </div>
        </div>
        <div className="flex flex-col items-start">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">Our Story</span>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Bags that feel like home.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            Maison Sable started on Instagram as a small curation of branded handbags we
            genuinely loved — pieces that fit real life and still feel special.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Every bag is carefully sourced, authenticated, and photographed in natural light.
            No dropshipping. No fast fashion. Just timeless designs you will carry for years.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-6 border-t border-border pt-8">
            <div>
              <p className="font-display text-3xl font-semibold text-primary">500+</p>
              <p className="mt-1 text-sm text-muted-foreground">Bags Sold</p>
            </div>
            <div>
              <p className="font-display text-3xl font-semibold text-primary">12</p>
              <p className="mt-1 text-sm text-muted-foreground">Brands</p>
            </div>
            <div>
              <p className="font-display text-3xl font-semibold text-primary">4.9</p>
              <p className="mt-1 text-sm text-muted-foreground">Rating</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const instagramPosts = [
  { id: 1, image: bagOne, alt: "Instagram post with tan tote" },
  { id: 2, image: bagTwo, alt: "Instagram post with beige crossbody" },
  { id: 3, image: bagThree, alt: "Instagram post with brown hobo" },
  { id: 4, image: heroBag, alt: "Instagram post with hero handbag" },
];

function InstagramShop() {
  return (
    <section id="shop" className="bg-secondary py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-12 text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">Shop Instagram</span>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Follow us for daily drops
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            New arrivals, styling tips, and restocks are announced first on Instagram. DM us to reserve your bag.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:gap-4">
          {instagramPosts.map((post) => (
            <a
              key={post.id}
              href="https://instagram.com/maisonsable"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-xl bg-muted"
            >
              <img
                src={post.image}
                alt={post.alt}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                width={400}
                height={400}
                loading="lazy"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-primary/0 transition-colors group-hover:bg-primary/20">
                <Instagram className="h-8 w-8 text-primary-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            </a>
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <a
            href="https://instagram.com/maisonsable"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Instagram className="h-4 w-4" />
            Shop on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}

function TrustSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
      <div className="grid gap-8 sm:grid-cols-3">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/40">
            <ShieldCheck className="h-6 w-6 text-primary" />
          </div>
          <h3 className="mt-4 font-display text-lg font-semibold text-foreground">Authentic Guaranteed</h3>
          <p className="mt-2 text-sm text-muted-foreground">Every bag is verified for quality and authenticity before it reaches you.</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/40">
            <Truck className="h-6 w-6 text-primary" />
          </div>
          <h3 className="mt-4 font-display text-lg font-semibold text-foreground">Insured Shipping</h3>
          <p className="mt-2 text-sm text-muted-foreground">Carefully packed and shipped with tracking, worldwide.</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/40">
            <Heart className="h-6 w-6 text-primary" />
          </div>
          <h3 className="mt-4 font-display text-lg font-semibold text-foreground">Personal Service</h3>
          <p className="mt-2 text-sm text-muted-foreground">DM us for sizing, styling advice, or to reserve a bag before it sells out.</p>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-card py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="text-center sm:text-left">
            <p className="font-display text-xl font-semibold text-card-foreground">Maison Sable</p>
            <p className="mt-1 text-sm text-muted-foreground">Curated branded handbags, sold with care.</p>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="https://instagram.com/maisonsable"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              <Instagram className="h-4 w-4" />
              @maisonsable
            </a>
          </div>
        </div>
        <p className="mt-8 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Maison Sable. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { Instagram, ShoppingBag, ArrowRight, Truck, ShieldCheck } from "lucide-react";

import heroBag from "../assets/hero-bag.jpg";
import bagOne from "../assets/bag-1.jpg";
import bagTwo from "../assets/bag-2.jpg";
import bagThree from "../assets/bag-3.jpg";
import { CinematicIntro } from "../components/CinematicIntro";
import { PreOrderSection } from "../components/PreOrderSection";
import { SiteLayout } from "../components/SiteLayout";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Islandvoguemv | Branded Women's Handbags" },
      {
        name: "description",
        content:
          "Discover curated branded women's handbags. Timeless leather totes, crossbody bags, and shoulder bags sold through our Instagram boutique.",
      },
      { property: "og:title", content: "Islandvoguemv | Branded Women's Handbags" },
      {
        property: "og:description",
        content:
          "Discover curated branded women's handbags. Timeless leather totes, crossbody bags, and shoulder bags sold through our Instagram boutique.",
      },
      {
        property: "og:image",
        content:
          "https://id-preview--a9d81a67-9706-43a1-b90c-1baa294970f2.lovable.app/hero-bag.jpg",
      },
    ],
  }),
});

function Index() {
  return (
    <SiteLayout>
      <CinematicIntro />
      <HeroSection />
      <FeaturedCollection />
      <PreOrderSection />
      <InstagramShop />
    </SiteLayout>
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
            A handpicked selection of branded women's handbags — from everyday totes to statement
            shoulder bags. Sold exclusively through our Instagram boutique.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to="/collection"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90"
            >
              <ShoppingBag className="h-4 w-4" />
              Shop the Collection
            </Link>
            <a
              href="#pre-order"
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-7 py-3.5 text-sm font-semibold text-card-foreground transition-all hover:border-primary/30 hover:bg-accent"
            >
              Pre-order now
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
              alt="Islandvoguemv hero handbag"
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

function FeaturedCollection() {
  return (
    <section className="bg-secondary py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Featured Collection
            </span>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Shop every bag in stock
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
              Browse the full collection with filters for style, tag, and price.
            </p>
          </div>
          <Link
            to="/collection"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            View collection
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
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
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            Shop Instagram
          </span>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Follow us for daily drops
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            New arrivals, styling tips, and restocks are announced first on Instagram. DM us to
            reserve your bag.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:gap-4">
          {instagramPosts.map((post) => (
            <a
              key={post.id}
              href="https://instagram.com/islandvoguemv"
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
            href="https://instagram.com/islandvoguemv"
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

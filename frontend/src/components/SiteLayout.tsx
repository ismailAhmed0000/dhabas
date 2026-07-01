import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Instagram, ShoppingBag } from "lucide-react";
import type { ReactNode } from "react";

const footerLinks = {
  shop: [
    { label: "Collection", to: "/collection" as const },
    { label: "Pre Order", href: "/#pre-order" },
    { label: "Shop Instagram", href: "/#shop" },
  ],
  service: [
    { label: "Catalog pre-order", href: "/#pre-order" },
    { label: "Custom order", href: "/#pre-order" },
    { label: "Instagram boutique", href: "https://instagram.com/islandvoguemv", external: true },
  ],
};

function FooterLink({
  label,
  to,
  href,
  external,
}: {
  label: string;
  to?: "/" | "/collection";
  href?: string;
  external?: boolean;
}) {
  const className =
    "inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground";

  if (to) {
    return (
      <Link to={to} className={className}>
        {label}
      </Link>
    );
  }

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {label}
        <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
      </a>
    );
  }

  return (
    <a href={href} className={className}>
      {label}
    </a>
  );
}

export function SiteNavigation() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link
          to="/"
          className="font-display text-xl font-semibold tracking-tight text-foreground"
        >
          Islandvoguemv
        </Link>
        <div className="hidden items-center gap-8 text-sm font-medium text-foreground/80 md:flex">
          <Link
            to="/collection"
            className="transition-colors hover:text-foreground [&.active]:text-foreground"
          >
            Collection
          </Link>
          <a href="/#pre-order" className="transition-colors hover:text-foreground">
            Pre Order
          </a>
          <a href="/#shop" className="transition-colors hover:text-foreground">
            Shop Instagram
          </a>
        </div>
        <a
          href="https://instagram.com/islandvoguemv"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <Instagram className="h-4 w-4" />
          <span className="hidden sm:inline">Follow @islandvoguemv</span>
        </a>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          <div className="sm:col-span-2 lg:col-span-5">
            <Link
              to="/"
              className="font-display text-2xl font-semibold tracking-tight text-foreground"
            >
              Islandvoguemv
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Curated branded women&apos;s handbags — from everyday totes to statement shoulder
              bags. Sold with care through our Instagram boutique.
            </p>
            <a
              href="https://instagram.com/islandvoguemv"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <Instagram className="h-4 w-4" />
              Follow @islandvoguemv
            </a>
          </div>

          <div className="lg:col-span-3 lg:col-start-7">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">Shop</p>
            <ul className="mt-5 space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  {"to" in link && link.to ? (
                    <FooterLink label={link.label} to={link.to} />
                  ) : (
                    <FooterLink label={link.label} href={link.href} />
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">Service</p>
            <ul className="mt-5 space-y-3">
              {footerLinks.service.map((link) => (
                <li key={link.label}>
                  <FooterLink
                    label={link.label}
                    href={link.href}
                    external={"external" in link ? link.external : false}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-border/60 py-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Islandvoguemv. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-xs text-muted-foreground">
            <Link
              to="/collection"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              Browse collection
            </Link>
            <a
              href="https://instagram.com/islandvoguemv"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
            >
              <Instagram className="h-3.5 w-3.5" />
              @islandvoguemv
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNavigation />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}

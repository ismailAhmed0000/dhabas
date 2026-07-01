import type { ReactElement } from "react";

import { brandLogos } from "@/lib/brands";

type BrandsMarqueeProps = {
  variant?: "horizontal" | "vertical";
};

function BrandLogoItem({ name, render }: { name: string; render: () => ReactElement }) {
  return (
    <div
      className="group/logo flex h-14 shrink-0 items-center justify-center px-4 text-primary/80 transition-all duration-500 hover:scale-105 hover:text-primary"
      title={name}
    >
      <div className="opacity-90 transition-opacity duration-500 group-hover/logo:opacity-100">
        {render()}
      </div>
    </div>
  );
}

function HorizontalMarquee() {
  return (
    <section
      aria-label="Featured brands"
      className="relative overflow-hidden border-y border-border/70 bg-card py-8 shadow-sm"
    >
      <style>{`
        @keyframes brands-marquee-x {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .brands-marquee-x {
          animation: brands-marquee-x 28s linear infinite;
        }
        .brands-marquee-x:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-card to-transparent sm:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-card to-transparent sm:w-28" />

      <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.32em] text-muted-foreground">
        Authentic brands we carry
      </p>

      <div className="brands-marquee-x flex w-max">
        {[false, true].map((clone) => (
          <div
            key={clone ? "clone" : "original"}
            className="flex shrink-0 items-center gap-12 px-6 sm:gap-16 sm:px-8"
            aria-hidden={clone || undefined}
          >
            {brandLogos.map((brand) => (
              <BrandLogoItem key={`${clone ? "c-" : ""}${brand.name}`} {...brand} />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

function VerticalStream({
  reverse = false,
  duration = 22,
}: {
  reverse?: boolean;
  duration?: number;
}) {
  return (
    <div className="h-full overflow-hidden">
      <div
        className="flex flex-col items-center gap-10 py-2"
        style={{
          animation: `brands-marquee-y ${duration}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {[false, true].map((clone) =>
          brandLogos.map((brand) => (
            <BrandLogoItem
              key={`${clone ? "c-" : ""}${brand.name}-${reverse ? "r" : "n"}`}
              {...brand}
            />
          )),
        )}
      </div>
    </div>
  );
}

function VerticalMarquee() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
      <style>{`
        @keyframes brands-marquee-y {
          from { transform: translateY(0); }
          to { transform: translateY(-50%); }
        }
      `}</style>

      <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.32em] text-muted-foreground">
        Authentic brands we carry
      </p>

      <div className="relative h-[min(62vh,560px)] overflow-hidden rounded-2xl border border-border/30 bg-background">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-background to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-background to-transparent" />

        <div className="grid h-full grid-cols-2 gap-6 px-6 md:grid-cols-3 md:gap-10 md:px-12">
          <VerticalStream duration={24} />
          <VerticalStream reverse duration={28} />
          <div className="hidden md:block">
            <VerticalStream duration={26} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function BrandsMarquee({ variant = "horizontal" }: BrandsMarqueeProps) {
  if (variant === "vertical") {
    return (
      <section aria-label="Featured brands" className="w-full">
        <VerticalMarquee />
      </section>
    );
  }

  return <HorizontalMarquee />;
}

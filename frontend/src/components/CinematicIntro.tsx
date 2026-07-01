import { useEffect, useRef, useState } from "react";
import { Instagram } from "lucide-react";
import bagVideo from "../assets/bag-cinematic.mp4.asset.json";
import heroCutout from "../assets/hero-bag-cutout.png";
import bagOne from "../assets/bag-1.jpg";
import bagTwo from "../assets/bag-2.jpg";
import bagThree from "../assets/bag-3.jpg";

const previewBags = [
  { image: bagOne, name: "The Arcadia Tote", price: "$210" },
  { image: bagTwo, name: "The Céleste Crossbody", price: "$185" },
  { image: bagThree, name: "The Aurelie Hobo", price: "$230" },
  { image: heroCutout, name: "The Sable Tote", price: "$245" },
  { image: bagOne, name: "Arcadia — Noir", price: "$225" },
  { image: bagTwo, name: "Céleste — Sand", price: "$185" },
];

const seg = (p: number, a: number, b: number) => {
  const t = Math.min(1, Math.max(0, (p - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

const WHITE_KEY_THRESHOLD = 225;
const WHITE_KEY_SOFTNESS = 25;
const BAG_DISPLAY_SCALE = 0.91;

function keyOutWhiteBackground(ctx: CanvasRenderingContext2D, width: number, height: number) {
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;
  const floor = WHITE_KEY_THRESHOLD - WHITE_KEY_SOFTNESS;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const min = Math.min(r, g, b);

    if (min >= WHITE_KEY_THRESHOLD) {
      data[i + 3] = 0;
    } else if (min >= floor) {
      const fade = (min - floor) / WHITE_KEY_SOFTNESS;
      data[i + 3] = Math.round(data[i + 3] * (1 - fade));
    }
  }

  ctx.putImageData(imageData, 0, 0);
}

export function CinematicIntro() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const renderFrame = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const container = canvas?.parentElement;
    if (!video || !canvas || !container || video.videoWidth === 0) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(video, 0, 0);
    keyOutWhiteBackground(ctx, canvas.width, canvas.height);

    const maxW = container.clientWidth;
    const maxH = container.clientHeight;
    const scale =
      Math.min(maxW / video.videoWidth, maxH / video.videoHeight) * BAG_DISPLAY_SCALE;
    canvas.style.width = `${video.videoWidth * scale}px`;
    canvas.style.height = `${video.videoHeight * scale}px`;
  };

  // Scroll → progress 0..1
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const total = rect.height - vh;
        const scrolled = Math.min(Math.max(-rect.top, 0), total);
        setProgress(total > 0 ? scrolled / total : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Sync video currentTime to scroll progress
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !duration) return;
    // Video maps to progress 0.05 – 0.85; before/after we hold the end frames.
    const t = seg(progress, 0.05, 0.85);
    const target = t * duration;
    // Only seek when meaningfully different to avoid decoder churn
    if (Math.abs(v.currentTime - target) > 0.03) {
      try {
        v.currentTime = target;
      } catch {
        /* seeking before metadata ready */
      }
    } else {
      renderFrame();
    }
  }, [progress, duration]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onFrameReady = () => renderFrame();
    video.addEventListener("seeked", onFrameReady);
    video.addEventListener("loadeddata", onFrameReady);
    window.addEventListener("resize", onFrameReady);
    return () => {
      video.removeEventListener("seeked", onFrameReady);
      video.removeEventListener("loadeddata", onFrameReady);
      window.removeEventListener("resize", onFrameReady);
    };
  }, [duration]);

  const reveal = seg(progress, 0.82, 0.98);
  const taglineOpacity = 1 - seg(progress, 0.02, 0.15);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: "480vh" }}
      aria-label="Cinematic bag intro"
    >
      <div className="sticky top-16 h-[calc(100svh-4rem)] w-full overflow-hidden bg-background">
        <video
          ref={videoRef}
          src={bagVideo.url}
          className="pointer-events-none absolute h-0 w-0 opacity-0"
          muted
          playsInline
          preload="auto"
          onLoadedMetadata={(e) => {
            const v = e.currentTarget;
            setDuration(v.duration || 0);
            v.pause();
            v.currentTime = 0;
          }}
        />

        <div className="absolute inset-0 z-20 flex items-center justify-center px-6 pb-12 pt-28 sm:px-10 sm:pt-32">
          <canvas
            ref={canvasRef}
            className="block max-h-full max-w-full"
            style={{
              opacity: 1 - reveal,
              transition: "none",
            }}
            aria-label="Maison Sable hero handbag animation"
          />
        </div>

        {/* Tagline */}
        <div
          className="pointer-events-none absolute inset-x-0 top-[10%] z-30 flex flex-col items-center px-6 text-center"
          style={{ opacity: taglineOpacity }}
        >
          <span className="mb-3 inline-block rounded-full bg-accent/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent-foreground">
            Maison Sable
          </span>
          <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Unzip the <span className="text-primary italic">collection</span>
          </h1>
        </div>

        {/* Catalogue revealed after the camera enters the bag */}
        <div
          className="absolute inset-0 z-10 flex items-center justify-center px-6 py-16"
          style={{
            opacity: reveal,
            transform: `scale(${0.9 + reveal * 0.1})`,
          }}
        >
          <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6">
            {previewBags.map((b, i) => (
              <article
                key={i}
                className="group relative overflow-hidden rounded-2xl bg-card shadow-lg"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                  <img
                    src={b.image}
                    alt={b.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex items-center justify-between p-3 sm:p-4">
                  <div>
                    <h3 className="font-display text-sm font-semibold text-card-foreground sm:text-base">
                      {b.name}
                    </h3>
                    <p className="text-xs font-medium text-primary sm:text-sm">
                      {b.price}
                    </p>
                  </div>
                  <Instagram className="h-4 w-4 text-muted-foreground" />
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Progress rail */}
        <div className="absolute bottom-6 left-1/2 z-40 -translate-x-1/2">
          <div className="h-[3px] w-40 overflow-hidden rounded-full bg-border/60">
            <div
              className="h-full bg-primary"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

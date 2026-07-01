import { useEffect, useRef, useState } from "react";
import {
  CalendarClock,
  CheckCircle2,
  ImagePlus,
  Loader2,
  Package,
  Sparkles,
  Upload,
  X,
} from "lucide-react";

import bagTwo from "../assets/bag-2.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  createCustomOrder,
  createPreOrder,
  fetchProducts,
  formatPrice,
  type Product,
} from "@/lib/api";

const fallbackProducts: Product[] = [
  {
    id: "fallback-1",
    name: "The Arcadia Tote",
    slug: "arcadia-tote",
    description: "Everyday leather tote with structured silhouette.",
    priceCents: 21000,
    imageUrl: null,
    tag: "Bestseller",
    stock: 0,
    isPreOrderEnabled: true,
    preOrderExpectedAt: null,
    isActive: true,
  },
  {
    id: "fallback-2",
    name: "The Céleste Crossbody",
    slug: "celeste-crossbody",
    description: "Compact crossbody in soft neutral leather.",
    priceCents: 18500,
    imageUrl: null,
    tag: "New",
    stock: 0,
    isPreOrderEnabled: true,
    preOrderExpectedAt: null,
    isActive: true,
  },
  {
    id: "fallback-3",
    name: "The Aurelie Hobo",
    slug: "aurelie-hobo",
    description: "Relaxed hobo shape with rich cognac finish.",
    priceCents: 23000,
    imageUrl: null,
    tag: "Limited",
    stock: 0,
    isPreOrderEnabled: true,
    preOrderExpectedAt: null,
    isActive: true,
  },
];

type FormStatus = { type: "idle" | "loading" | "success" | "error"; message?: string };

const initialCustomerFields = {
  customerName: "",
  customerEmail: "",
  customerPhone: "",
  instagramHandle: "",
};

function StatusBanner({ status }: { status: FormStatus }) {
  if (status.type === "idle" || status.type === "loading") return null;

  const isSuccess = status.type === "success";

  return (
    <div
      className={`mt-4 rounded-lg border px-4 py-3 text-sm ${
        isSuccess
          ? "border-primary/20 bg-primary/5 text-foreground"
          : "border-destructive/20 bg-destructive/5 text-destructive"
      }`}
    >
      <div className="flex items-start gap-2">
        {isSuccess ? (
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        ) : null}
        <p>{status.message}</p>
      </div>
    </div>
  );
}

function PreOrderCatalogForm({ products }: { products: Product[] }) {
  const [selectedProductId, setSelectedProductId] = useState(products[0]?.id ?? "");
  const [fields, setFields] = useState({ ...initialCustomerFields, quantity: "1", notes: "" });
  const [status, setStatus] = useState<FormStatus>({ type: "idle" });

  const selectedProduct = products.find((product) => product.id === selectedProductId);
  const usingFallback = selectedProductId.startsWith("fallback-");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!selectedProduct || usingFallback) {
      setStatus({
        type: "error",
        message: "Connect the backend to submit catalog pre-orders, or use the Custom Order tab.",
      });
      return;
    }

    setStatus({ type: "loading" });

    try {
      await createPreOrder({
        productId: selectedProduct.id,
        customerName: fields.customerName.trim(),
        customerEmail: fields.customerEmail.trim(),
        customerPhone: fields.customerPhone.trim() || undefined,
        instagramHandle: fields.instagramHandle.trim() || undefined,
        quantity: Number.parseInt(fields.quantity, 10) || 1,
        notes: fields.notes.trim() || undefined,
      });

      setStatus({
        type: "success",
        message: `Your pre-order for ${selectedProduct.name} has been saved. We'll confirm by email soon.`,
      });
      setFields({ ...initialCustomerFields, quantity: "1", notes: "" });
    } catch (error) {
      setStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Could not save your pre-order.",
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/40">
          <Package className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-display text-lg font-semibold text-card-foreground">Catalog pre-order</h3>
          <p className="text-sm text-muted-foreground">Reserve a bag from our upcoming collection.</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="preorder-product">Select bag</Label>
          <select
            id="preorder-product"
            value={selectedProductId}
            onChange={(event) => setSelectedProductId(event.target.value)}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name} — {formatPrice(product.priceCents)}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="preorder-name">Full name</Label>
            <Input
              id="preorder-name"
              required
              value={fields.customerName}
              onChange={(event) => setFields((current) => ({ ...current, customerName: event.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="preorder-email">Email</Label>
            <Input
              id="preorder-email"
              type="email"
              required
              value={fields.customerEmail}
              onChange={(event) => setFields((current) => ({ ...current, customerEmail: event.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="preorder-phone">Phone (optional)</Label>
            <Input
              id="preorder-phone"
              value={fields.customerPhone}
              onChange={(event) => setFields((current) => ({ ...current, customerPhone: event.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="preorder-instagram">Instagram (optional)</Label>
            <Input
              id="preorder-instagram"
              placeholder="@username"
              value={fields.instagramHandle}
              onChange={(event) => setFields((current) => ({ ...current, instagramHandle: event.target.value }))}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-[120px_1fr]">
          <div className="space-y-2">
            <Label htmlFor="preorder-quantity">Quantity</Label>
            <Input
              id="preorder-quantity"
              type="number"
              min={1}
              value={fields.quantity}
              onChange={(event) => setFields((current) => ({ ...current, quantity: event.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="preorder-notes">Notes (optional)</Label>
            <Input
              id="preorder-notes"
              placeholder="Color preference, gift wrap, etc."
              value={fields.notes}
              onChange={(event) => setFields((current) => ({ ...current, notes: event.target.value }))}
            />
          </div>
        </div>
      </div>

      <StatusBanner status={status} />

      <Button type="submit" className="mt-6 w-full sm:w-auto" disabled={status.type === "loading"}>
        {status.type === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Saving pre-order...
          </>
        ) : (
          "Save pre-order"
        )}
      </Button>
    </form>
  );
}

function CustomOrderForm() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fields, setFields] = useState({ ...initialCustomerFields, description: "" });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);
  const [status, setStatus] = useState<FormStatus>({ type: "idle" });

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setStatus({ type: "error", message: "Please upload an image file (JPG, PNG, or WebP)." });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setStatus({ type: "error", message: "Image must be 5 MB or smaller." });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setImagePreview(result);
      setImageDataUrl(result);
      setImageName(file.name);
      setStatus({ type: "idle" });
    };
    reader.readAsDataURL(file);
  }

  function clearImage() {
    setImagePreview(null);
    setImageDataUrl(null);
    setImageName(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setStatus({ type: "loading" });

    try {
      await createCustomOrder({
        customerName: fields.customerName.trim(),
        customerEmail: fields.customerEmail.trim(),
        customerPhone: fields.customerPhone.trim() || undefined,
        instagramHandle: fields.instagramHandle.trim() || undefined,
        description: fields.description.trim(),
        referenceImageUrl: imageDataUrl ?? undefined,
      });

      setStatus({
        type: "success",
        message: "Your custom order has been saved. We'll review your reference and follow up shortly.",
      });
      setFields({ ...initialCustomerFields, description: "" });
      clearImage();
    } catch (error) {
      setStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Could not save your custom order.",
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/40">
          <Sparkles className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-display text-lg font-semibold text-card-foreground">Custom order</h3>
          <p className="text-sm text-muted-foreground">
            Upload a reference photo and tell us exactly what you're looking for.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Reference image</Label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
          {imagePreview ? (
            <div className="relative overflow-hidden rounded-xl border border-border">
              <img src={imagePreview} alt="Custom order reference" className="max-h-56 w-full object-cover" />
              <button
                type="button"
                onClick={clearImage}
                className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm transition-colors hover:bg-background"
                aria-label="Remove image"
              >
                <X className="h-4 w-4" />
              </button>
              {imageName ? (
                <p className="border-t border-border bg-muted/40 px-4 py-2 text-xs text-muted-foreground">
                  {imageName}
                </p>
              ) : null}
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex w-full flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-muted/20 px-6 py-10 text-center transition-colors hover:border-primary/40 hover:bg-muted/40"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/40">
                <ImagePlus className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Upload a reference photo</p>
                <p className="mt-1 text-xs text-muted-foreground">JPG, PNG, or WebP up to 5 MB</p>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-xs font-medium text-foreground">
                <Upload className="h-3.5 w-3.5" />
                Choose file
              </span>
            </button>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="custom-description">What would you like us to source?</Label>
          <Textarea
            id="custom-description"
            required
            rows={4}
            placeholder="Brand, style, color, budget, timeline — the more detail, the better."
            value={fields.description}
            onChange={(event) => setFields((current) => ({ ...current, description: event.target.value }))}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="custom-name">Full name</Label>
            <Input
              id="custom-name"
              required
              value={fields.customerName}
              onChange={(event) => setFields((current) => ({ ...current, customerName: event.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="custom-email">Email</Label>
            <Input
              id="custom-email"
              type="email"
              required
              value={fields.customerEmail}
              onChange={(event) => setFields((current) => ({ ...current, customerEmail: event.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="custom-phone">Phone (optional)</Label>
            <Input
              id="custom-phone"
              value={fields.customerPhone}
              onChange={(event) => setFields((current) => ({ ...current, customerPhone: event.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="custom-instagram">Instagram (optional)</Label>
            <Input
              id="custom-instagram"
              placeholder="@username"
              value={fields.instagramHandle}
              onChange={(event) => setFields((current) => ({ ...current, instagramHandle: event.target.value }))}
            />
          </div>
        </div>
      </div>

      <StatusBanner status={status} />

      <Button type="submit" className="mt-6 w-full sm:w-auto" disabled={status.type === "loading"}>
        {status.type === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Saving custom order...
          </>
        ) : (
          "Save custom order"
        )}
      </Button>
    </form>
  );
}

export function PreOrderSection() {
  const [products, setProducts] = useState<Product[]>(fallbackProducts);
  const [loadedFromApi, setLoadedFromApi] = useState(false);

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        const preOrderProducts = data.filter((product) => product.isPreOrderEnabled);
        if (preOrderProducts.length > 0) {
          setProducts(preOrderProducts);
          setLoadedFromApi(true);
        }
      })
      .catch(() => {
        setProducts(fallbackProducts);
        setLoadedFromApi(false);
      });
  }, []);

  return (
    <section id="pre-order" className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
      <div className="grid items-start gap-12 lg:grid-cols-2">
        <div className="relative lg:sticky lg:top-24">
          <div className="absolute -left-4 -top-4 h-full w-full rounded-2xl bg-accent/40" />
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <img
              src={bagTwo}
              alt="Pre-order handbag detail"
              className="h-full w-full object-cover"
              width={800}
              height={1008}
              loading="lazy"
            />
          </div>
          <div className="relative mt-6 rounded-xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-start gap-3">
              <CalendarClock className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="font-display text-base font-semibold text-card-foreground">How pre-orders work</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Reserve your bag before it arrives. We confirm availability, send payment details,
                  and keep you updated until your order ships.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">Pre Order</span>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Reserve your next bag.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            Choose from our catalog or submit a custom request with a reference photo.
            {!loadedFromApi ? " Showing sample bags until the backend is connected." : null}
          </p>

          <Tabs defaultValue="catalog" className="mt-8">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="catalog">Catalog pre-order</TabsTrigger>
              <TabsTrigger value="custom">Custom order</TabsTrigger>
            </TabsList>
            <TabsContent value="catalog" className="mt-6">
              <PreOrderCatalogForm products={products} />
            </TabsContent>
            <TabsContent value="custom" className="mt-6">
              <CustomOrderForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}

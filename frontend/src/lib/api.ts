const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3001/api";

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  priceCents: number;
  imageUrl: string | null;
  tag: string | null;
  stock: number;
  isPreOrderEnabled: boolean;
  preOrderExpectedAt: string | null;
  isActive: boolean;
};

export type CreatePreOrderPayload = {
  productId: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  instagramHandle?: string;
  quantity?: number;
  notes?: string;
};

export type CreateCustomOrderPayload = {
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  instagramHandle?: string;
  description: string;
  referenceImageUrl?: string;
};

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
    ...init,
  });

  if (!response.ok) {
    const message = await response.text().catch(() => response.statusText);
    throw new Error(message || `Request failed (${response.status})`);
  }

  return response.json() as Promise<T>;
}

export function fetchProducts() {
  return request<Product[]>("/products");
}

export function createPreOrder(payload: CreatePreOrderPayload) {
  return request("/pre-orders", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function createCustomOrder(payload: CreateCustomOrderPayload) {
  return request("/custom-orders", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function formatPrice(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(cents / 100);
}

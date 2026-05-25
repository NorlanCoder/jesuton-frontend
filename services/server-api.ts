import type { Category, Paginated, Product, ProductFilters } from '@/types';

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

const REVALIDATE_SECONDS = 60;
const IS_DEV = process.env.NODE_ENV === 'development';

async function safeFetch<T>(
  path: string,
  init?: RequestInit & { next?: { revalidate?: number; tags?: string[] } },
): Promise<T | null> {
  try {
    const res = await fetch(`${baseURL}${path}`, {
      headers: { Accept: 'application/json' },
      ...(IS_DEV
        ? { cache: 'no-store' }
        : { next: { revalidate: REVALIDATE_SECONDS, ...(init?.next ?? {}) } }),
      ...init,
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function fetchProducts(
  filters: ProductFilters = {},
): Promise<Paginated<Product> | null> {
  const params = new URLSearchParams();
  if (filters.category) params.set('category', filters.category);
  if (filters.search) params.set('search', filters.search);
  if (filters.status) params.set('status', filters.status);
  if (filters.page) params.set('page', String(filters.page));
  if (filters.per_page) params.set('per_page', String(filters.per_page));
  const query = params.toString();
  return safeFetch<Paginated<Product>>(`/products${query ? `?${query}` : ''}`, {
    next: { tags: ['products'] },
  });
}

export async function fetchProduct(slug: string): Promise<Product | null> {
  const data = await safeFetch<{ data: Product }>(`/products/${slug}`, {
    next: { tags: [`product:${slug}`] },
  });
  return data?.data ?? null;
}

export async function fetchCategories(): Promise<Category[]> {
  const data = await safeFetch<{ data: Category[] }>(`/categories`, {
    next: { tags: ['categories'] },
  });
  return data?.data ?? [];
}

import type { MetadataRoute } from 'next';
import { fetchProducts } from '@/services/server-api';
import { SITE } from '@/lib/constants';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE.url.replace(/\/$/, '');
  const staticPaths = ['', '/a-propos', '/produits', '/services', '/contact'];

  const productsResponse = await fetchProducts({ per_page: 100 });
  const products = productsResponse?.data ?? [];

  return [
    ...staticPaths.map((path) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: path === '' ? 1 : 0.7,
    })),
    ...products.map((p) => ({
      url: `${base}/produits/${p.slug}`,
      lastModified: new Date(p.created_at),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    })),
  ];
}

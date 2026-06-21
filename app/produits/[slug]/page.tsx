import ProductDetail from './ProductDetail';

export async function generateStaticParams() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
    const res = await fetch(`${apiUrl}/products?per_page=500`);
    if (!res.ok) return [{ slug: '_' }];
    const data = await res.json();
    const slugs = (data.data ?? []).map((p: { slug: string }) => ({ slug: p.slug }));
    return slugs.length > 0 ? slugs : [{ slug: '_' }];
  } catch {
    return [{ slug: '_' }];
  }
}

export default function ProductDetailPage() {
  return <ProductDetail />;
}

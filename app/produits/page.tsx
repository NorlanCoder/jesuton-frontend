import type { Metadata } from 'next';
import { Suspense } from 'react';
import { PackageOpen } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import ProductCard from '@/components/products/ProductCard';
import ProductFilters from '@/components/products/ProductFilters';
import Pagination from '@/components/products/Pagination';
import { fetchProducts, fetchCategories } from '@/services/server-api';
import type { ProductStatus } from '@/types';

export const metadata: Metadata = {
  title: 'Catalogue',
  description:
    'Découvrez nos kits solaires, lampadaires, pompes, microcentrales et accessoires solaires. Filtrez par catégorie, recherchez et obtenez un devis.',
};

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: {
    category?: string;
    search?: string;
    status?: string;
    page?: string;
  };
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const page = Number(searchParams.page) || 1;
  const status = (searchParams.status as ProductStatus) || '';
  const filters = {
    category: searchParams.category,
    search: searchParams.search,
    status: status || undefined,
    page,
  };

  const [productsResponse, categories] = await Promise.all([
    fetchProducts(filters),
    fetchCategories(),
  ]);

  const products = productsResponse?.data ?? [];
  const meta = productsResponse?.meta;

  return (
    <>
      <PageHeader
        index="02"
        eyebrow="Catalogue"
        meta="Édition 2026"
        title={
          <>
            Le matériel{' '}
            <span className="italic text-ember">qui fait la différence</span>.
          </>
        }
        description="Une sélection rigoureuse de matériel certifié pour des installations fiables et durables — du kit résidentiel à la microcentrale communale."
      />

      <section className="bg-bone pb-24">
        <div className="container-page">
          <div className="rounded-[28px] border border-char/10 bg-bone-50 p-6 md:p-10">
            <Suspense fallback={null}>
              <ProductFilters categories={categories} />
            </Suspense>
          </div>

          <div className="mt-10 flex items-baseline justify-between border-b border-char/10 pb-6">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.28em] text-black">
              {meta
                ? `${String(meta.total).padStart(3, '0')} produit${meta.total > 1 ? 's' : ''}`
                : 'Chargement…'}
            </p>
            {meta && meta.total > 0 && (
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-black">
                Page {String(meta.current_page).padStart(2, '0')} /{' '}
                {String(meta.last_page).padStart(2, '0')}
              </p>
            )}
          </div>

          {!productsResponse ? (
            <ApiError />
          ) : products.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>

              <Suspense fallback={null}>
                <Pagination
                  currentPage={meta?.current_page ?? 1}
                  lastPage={meta?.last_page ?? 1}
                />
              </Suspense>
            </>
          )}
        </div>
      </section>
    </>
  );
}

function EmptyState() {
  return (
    <div className="mt-12 rounded-[28px] border border-dashed border-char/20 bg-bone-50 p-16 text-center">
      <PackageOpen className="mx-auto h-12 w-12 text-char/40" />
      <h3 className="mt-6 font-display text-2xl italic text-char">
        Aucun produit ne correspond à votre recherche
      </h3>
      <p className="mt-2 text-sm text-char/70">
        Modifiez vos filtres ou contactez-nous pour une demande sur-mesure.
      </p>
    </div>
  );
}

function ApiError() {
  return (
    <div className="mt-12 rounded-[28px] border border-ember/30 bg-ember/10 p-12 text-center">
      <h3 className="font-display text-2xl italic text-ember">
        Catalogue temporairement indisponible
      </h3>
      <p className="mt-3 text-sm text-char/70">
        Le service est momentanément inaccessible. Merci de réessayer plus tard
        ou de nous contacter directement.
      </p>
    </div>
  );
}

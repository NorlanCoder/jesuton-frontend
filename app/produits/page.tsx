'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { PackageOpen } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import ProductCard from '@/components/products/ProductCard';
import ProductFilters from '@/components/products/ProductFilters';
import Pagination from '@/components/products/Pagination';
import { productsApi, categoriesApi } from '@/services/api';
import type { Category, Paginated, Product, ProductStatus } from '@/types';

export default function ProductsPage() {
  return (
    <>
      <PageHeader
        index="02"
        eyebrow="Catalogue"
        meta="Édition 2026"
        title={
          <>
            Le matériel{' '}
            <span className="italic text-ember">qui fait la différence</span>
          </>
        }
        description="Une sélection rigoureuse de matériel certifié pour des installations fiables et durables — du kit résidentiel à la microcentrale communale."
      />
      <section className="bg-bone pb-24">
        <div className="container-page">
          <Suspense fallback={<div className="h-48" />}>
            <ProductsContent />
          </Suspense>
        </div>
      </section>
    </>
  );
}

function ProductsContent() {
  const params = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [meta, setMeta] = useState<Paginated<Product>['meta'] | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const page = Number(params.get('page')) || 1;
  const category = params.get('category') ?? undefined;
  const search = params.get('search') ?? undefined;
  const status = (params.get('status') as ProductStatus) || undefined;

  useEffect(() => {
    categoriesApi.list().then(setCategories).catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(false);
    productsApi
      .list({ category, search, status, page })
      .then((res) => {
        setProducts(res.data);
        setMeta(res.meta);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [page, category, search, status]);

  return (
    <>
      <div className="rounded-[28px] border border-char/10 bg-bone-50 p-6 md:p-10">
        <ProductFilters categories={categories} />
      </div>

      <div className="mt-10 flex items-baseline justify-between border-b border-char/10 pb-6">
        <p className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.28em] text-black">
          {loading
            ? 'Chargement…'
            : meta
              ? `${String(meta.total).padStart(3, '0')} produit${meta.total > 1 ? 's' : ''}`
              : ''}
        </p>
        {meta && meta.total > 0 && (
          <p className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.22em] text-black">
            Page {String(meta.current_page).padStart(2, '0')} /{' '}
            {String(meta.last_page).padStart(2, '0')}
          </p>
        )}
      </div>

      {error ? (
        <ApiError />
      ) : loading ? (
        <LoadingState />
      ) : products.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
          <Pagination
            currentPage={meta?.current_page ?? 1}
            lastPage={meta?.last_page ?? 1}
          />
        </>
      )}
    </>
  );
}

function LoadingState() {
  return (
    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-72 animate-pulse rounded-[20px] bg-char/5" />
      ))}
    </div>
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

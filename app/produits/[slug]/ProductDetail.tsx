'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, Sun, Tag } from 'lucide-react';
import StatusBadge from '@/components/products/StatusBadge';
import { productsApi } from '@/services/api';
import type { Product } from '@/types';

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    productsApi.show(slug)
      .then(setProduct)
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="bg-bone">
        <div className="container-page pt-32 pb-12 md:pt-40 md:pb-20">
          <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <div className="aspect-[4/3] animate-pulse rounded-[28px] bg-char/10" />
            </div>
            <div className="space-y-4 lg:col-span-5">
              <div className="h-4 w-24 animate-pulse rounded bg-char/10" />
              <div className="h-10 w-3/4 animate-pulse rounded bg-char/10" />
              <div className="h-20 animate-pulse rounded bg-char/10" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (notFound || !product) {
    return (
      <div className="bg-bone">
        <div className="container-page pt-32 pb-20 text-center">
          <h1 className="font-display text-4xl italic text-char">Produit introuvable</h1>
          <Link href="/produits" className="mt-6 inline-flex items-center gap-2 text-sm text-ember underline-hover">
            <ArrowLeft className="h-4 w-4" />
            Retour au catalogue
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="bg-bone">
      <div className="container-page pt-32 pb-12 md:pt-40 md:pb-20">
        <Link
          href="/produits"
          className="inline-flex items-center gap-2 font-mono text-[0.7rem] font-bold uppercase tracking-[0.22em] text-black underline-hover hover:text-char"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Retour au catalogue
        </Link>

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] bg-char">
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  priority
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className="object-cover"
                />
              ) : (
                <div
                  className="flex h-full w-full items-center justify-center"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle at 70% 30%, rgba(192,57,43,0.5), transparent 60%), radial-gradient(circle at 30% 80%, rgba(47,74,58,0.5), transparent 60%)',
                  }}
                >
                  <Sun className="h-24 w-24 text-bone/40" />
                </div>
              )}
              <div className="absolute left-5 top-5">
                <StatusBadge status={product.status} />
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            {product.category && (
              <Link
                href={`/produits?category=${product.category.slug}`}
                className="inline-flex items-center gap-2 font-mono text-[0.7rem] font-bold uppercase tracking-[0.22em] text-ember underline-hover"
              >
                <Tag className="h-3 w-3" />
                {product.category.name}
              </Link>
            )}

            <h1 className="display-2 mt-4">{product.name}</h1>

            {product.short_description && (
              <p className="mt-6 text-lg leading-relaxed text-char/80">
                {product.short_description}
              </p>
            )}

            <div className="my-10 rule" />

            <div className="prose prose-neutral max-w-none whitespace-pre-line text-base leading-relaxed text-char/75">
              {product.description}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href={`/contact?produit=${encodeURIComponent(product.name)}`}
                className="group inline-flex items-center gap-3 rounded-full bg-char px-6 py-4 text-sm font-medium text-bone transition-all duration-500 ease-editorial hover:bg-ember"
              >
                Demander un devis
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-bone text-char transition-transform duration-500 group-hover:rotate-45">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </Link>
              <Link
                href="/produits"
                className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.22em] text-black underline-hover hover:text-char"
              >
                Voir d&apos;autres produits
              </Link>
            </div>

            <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-char/15 bg-char/15">
              <DescItem label="Référence" value={product.slug} />
              <DescItem label="Statut" value={<StatusBadge status={product.status} />} />
            </dl>
          </div>
        </div>
      </div>
    </article>
  );
}

function DescItem({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="bg-bone-50 p-5">
      <dt className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.22em] text-black">
        {label}
      </dt>
      <dd className="mt-2 text-sm text-char">{value}</dd>
    </div>
  );
}

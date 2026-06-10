import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, Sun, Tag } from 'lucide-react';
import StatusBadge from '@/components/products/StatusBadge';
import { fetchProduct } from '@/services/server-api';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await fetchProduct(params.slug);
  if (!product) return { title: 'Produit introuvable' };
  return {
    title: product.name,
    description: product.short_description || product.description.slice(0, 160),
    openGraph: {
      title: product.name,
      description: product.short_description || product.description.slice(0, 160),
      images: product.image ? [product.image] : [],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const product = await fetchProduct(params.slug);
  if (!product) notFound();

  return (
    <article className="bg-bone">
      <div className="container-page pt-32 pb-12 md:pt-40 md:pb-20">
        <Link
          href="/produits"
          className="inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-black underline-hover hover:text-char"
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
                className="inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-ember underline-hover"
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
                className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-black underline-hover hover:text-char"
              >
                Voir d&apos;autres produits
              </Link>
            </div>

            <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-char/15 bg-char/15">
              <DescItem label="Référence" value={product.slug} />
              <DescItem
                label="Statut"
                value={<StatusBadge status={product.status} />}
              />
            </dl>
          </div>
        </div>
      </div>
    </article>
  );
}

function DescItem({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="bg-bone-50 p-5">
      <dt className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-black">
        {label}
      </dt>
      <dd className="mt-2 text-sm text-char">{value}</dd>
    </div>
  );
}

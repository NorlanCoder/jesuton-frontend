'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sun } from 'lucide-react';
import type { Product } from '@/types';
import StatusBadge from './StatusBadge';
import { truncate } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const description =
    product.short_description || truncate(product.description, 110);
  console.log(product)
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.7,
        delay: Math.min(index * 0.04, 0.3),
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-char/10 bg-bone-50 transition-all duration-500 ease-editorial hover:-translate-y-1 hover:border-char/40"
    >
      <Link
        href={`/produits/${product.slug}`}
        className="relative block aspect-[5/4] overflow-hidden bg-char"
      >
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-105"
          />
        ) : (
          <div
            aria-hidden
            className="flex h-full w-full items-center justify-center"
            style={{
              backgroundImage:
                'radial-gradient(circle at 70% 30%, rgba(192,57,43,0.6), transparent 60%), radial-gradient(circle at 30% 80%, rgba(47,74,58,0.5), transparent 60%)',
            }}
          >
            <Sun className="h-16 w-16 text-bone/40" />
          </div>
        )}

        <div className="absolute left-4 top-4">
          <StatusBadge status={product.status} />
        </div>

        <span
          aria-hidden
          className="absolute bottom-4 right-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-bone text-char transition-transform duration-500 ease-editorial group-hover:rotate-45"
        >
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-6">
        {product.category && (
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-ember">
            {product.category.name}
          </span>
        )}
        <h3 className="mt-2 font-display text-2xl font-medium leading-tight tracking-tightest text-char">
          <Link href={`/produits/${product.slug}`} className="underline-hover">
            {product.name}
          </Link>
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-char/70 line-clamp-3">
          {description}
        </p>

        <div className="mt-auto flex items-center justify-between gap-2 pt-6">
          <Link
            href={`/produits/${product.slug}`}
            className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-black underline-hover hover:text-char"
          >
            Voir les détails
          </Link>
          <Link
            href={`/contact?produit=${encodeURIComponent(product.name)}`}
            className="inline-flex items-center gap-2 rounded-full border border-char px-4 py-2 text-xs font-medium text-char transition hover:bg-char hover:text-bone"
          >
            Demander un devis
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

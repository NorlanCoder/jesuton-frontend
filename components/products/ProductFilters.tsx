'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Search, X } from 'lucide-react';
import { useEffect, useState, useTransition } from 'react';
import type { Category, ProductStatus } from '@/types';
import { cn } from '@/lib/utils';

interface ProductFiltersProps {
  categories: Category[];
}

const STATUS_OPTIONS: { value: ProductStatus | ''; label: string }[] = [
  { value: '', label: 'Tous statuts' },
  { value: 'available', label: 'Disponible' },
  { value: 'coming_soon', label: 'Bientôt' },
  { value: 'out_of_stock', label: 'Rupture' },
];

export default function ProductFilters({ categories }: ProductFiltersProps) {
  const router = useRouter();
  const params = useSearchParams();
  const [, startTransition] = useTransition();

  const currentCategory = params.get('category') || '';
  const currentStatus = (params.get('status') as ProductStatus | '') || '';
  const currentSearch = params.get('search') || '';

  const [search, setSearch] = useState(currentSearch);

  useEffect(() => setSearch(currentSearch), [currentSearch]);

  const update = (key: string, value: string) => {
    const sp = new URLSearchParams(Array.from(params.entries()));
    if (value) sp.set(key, value);
    else sp.delete(key);
    sp.delete('page');
    startTransition(() => {
      router.push(`/produits${sp.toString() ? `?${sp.toString()}` : ''}`);
    });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    update('search', search.trim());
  };

  const reset = () => {
    setSearch('');
    startTransition(() => router.push('/produits'));
  };

  const hasFilters = !!(currentCategory || currentStatus || currentSearch);

  return (
    <div className="space-y-8">
      {/* Recherche */}
      <form onSubmit={onSubmit} className="relative">
        <Search className="pointer-events-none absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-char/40" />
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Que cherchez-vous… (kit, pompe, lampadaire)"
          className="input pl-12"
          aria-label="Rechercher un produit"
        />
        {search && (
          <button
            type="button"
            onClick={() => {
              setSearch('');
              update('search', '');
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-char/40 hover:text-char"
            aria-label="Effacer la recherche"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </form>

      {/* Filtres ligne 1 : catégories */}
      <div>
        <p className="label">Catégorie</p>
        <div className="flex flex-wrap items-center gap-2">
          <FilterChip
            active={!currentCategory}
            onClick={() => update('category', '')}
          >
            Toutes
          </FilterChip>
          {categories.map((cat) => (
            <FilterChip
              key={cat.id}
              active={currentCategory === cat.slug}
              onClick={() => update('category', cat.slug)}
            >
              {cat.name}
              {typeof cat.products_count === 'number' && (
                <span className="ml-1 font-mono text-[0.65rem] opacity-50">
                  {cat.products_count}
                </span>
              )}
            </FilterChip>
          ))}
        </div>
      </div>

      {/* Filtres ligne 2 : statut + reset */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-char/10 pt-6">
        <div>
          <p className="label">Statut</p>
          <div className="flex flex-wrap items-center gap-2">
            {STATUS_OPTIONS.map((s) => (
              <FilterChip
                key={s.value}
                active={currentStatus === s.value}
                onClick={() => update('status', s.value)}
              >
                {s.label}
              </FilterChip>
            ))}
          </div>
        </div>

        {hasFilters && (
          <button
            type="button"
            onClick={reset}
            className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-ember underline-hover"
          >
            Réinitialiser
          </button>
        )}
      </div>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-full border px-4 py-2 text-xs font-medium tracking-tight transition-all duration-300 ease-editorial',
        active
          ? 'border-char bg-char text-bone'
          : 'border-char/20 text-char hover:border-char',
      )}
    >
      {children}
    </button>
  );
}

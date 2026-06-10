'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  lastPage: number;
}

export default function Pagination({
  currentPage,
  lastPage,
}: PaginationProps) {
  const pathname = usePathname();
  const params = useSearchParams();

  if (lastPage <= 1) return null;

  const buildUrl = (page: number) => {
    const sp = new URLSearchParams(Array.from(params.entries()));
    if (page > 1) sp.set('page', String(page));
    else sp.delete('page');
    return `${pathname}${sp.toString() ? `?${sp.toString()}` : ''}`;
  };

  const pages = getPageRange(currentPage, lastPage);

  return (
    <nav
      className="mt-16 flex items-center justify-between border-t border-char/15 pt-8 text-sm"
      aria-label="Pagination"
    >
      <PageLink
        href={buildUrl(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        ariaLabel="Page précédente"
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.22em]">
          Précédent
        </span>
      </PageLink>

      <div className="flex items-center gap-1">
        {pages.map((p, i) =>
          p === '…' ? (
            <span
              key={`ellipsis-${i}`}
              className="px-2 font-mono text-xs text-black"
              aria-hidden
            >
              …
            </span>
          ) : (
            <NumberLink
              key={p}
              href={buildUrl(p)}
              active={p === currentPage}
              ariaLabel={`Page ${p}`}
            >
              {String(p).padStart(2, '0')}
            </NumberLink>
          ),
        )}
      </div>

      <PageLink
        href={buildUrl(Math.min(lastPage, currentPage + 1))}
        disabled={currentPage === lastPage}
        ariaLabel="Page suivante"
      >
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.22em]">
          Suivant
        </span>
        <ChevronRight className="h-4 w-4" />
      </PageLink>
    </nav>
  );
}

function PageLink({
  href,
  children,
  disabled,
  ariaLabel,
}: {
  href: string;
  children: React.ReactNode;
  disabled?: boolean;
  ariaLabel?: string;
}) {
  const className = cn(
    'inline-flex items-center gap-2 text-char hover:text-ember transition',
    disabled && 'pointer-events-none opacity-30',
  );
  if (disabled) {
    return (
      <span className={className} aria-disabled="true">
        {children}
      </span>
    );
  }
  return (
    <Link href={href} aria-label={ariaLabel} className={className}>
      {children}
    </Link>
  );
}

function NumberLink({
  href,
  active,
  ariaLabel,
  children,
}: {
  href: string;
  active: boolean;
  ariaLabel: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'inline-flex h-10 min-w-10 items-center justify-center rounded-full font-mono text-xs tracking-[0.18em] transition',
        active
          ? 'bg-char text-bone'
          : 'text-black hover:bg-char/5 hover:text-char',
      )}
    >
      {children}
    </Link>
  );
}

function getPageRange(current: number, last: number): (number | '…')[] {
  const delta = 1;
  const range: (number | '…')[] = [];
  const start = Math.max(2, current - delta);
  const end = Math.min(last - 1, current + delta);

  range.push(1);
  if (start > 2) range.push('…');
  for (let i = start; i <= end; i++) range.push(i);
  if (end < last - 1) range.push('…');
  if (last > 1) range.push(last);

  return range;
}

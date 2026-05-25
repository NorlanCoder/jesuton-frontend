'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import Logo from '@/components/ui/Logo';
import ScrollProgress from '@/components/ui/ScrollProgress';
import { NAV_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // La fusion overlay / hero ne s'active que sur la page d'accueil
  const isHome = pathname === '/';
  const overlay = isHome && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 w-full transition-all duration-500 ease-editorial',
        overlay
          ? 'border-b border-transparent bg-transparent'
          : 'border-b border-char/10 bg-bone/85 backdrop-blur-xl',
      )}
    >
      <div className="container-page relative flex h-20 items-center justify-between md:h-24">
        <Logo variant={overlay ? 'light' : 'dark'} />

        <nav
          className="hidden items-center gap-9 lg:flex"
          aria-label="Principale"
        >
          {NAV_LINKS.map((link, i) => {
            const active =
              link.href === '/'
                ? pathname === '/'
                : pathname?.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'group relative inline-flex items-center gap-2 text-sm font-medium tracking-tight transition-colors',
                  overlay
                    ? active
                      ? 'text-bone'
                      : 'text-bone/70 hover:text-bone'
                    : active
                      ? 'text-char'
                      : 'text-char/60 hover:text-char',
                )}
              >
                <span
                  className={cn(
                    'font-mono text-[0.7rem] tabular-nums',
                    overlay ? 'text-bone/50' : 'text-char/40',
                  )}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="underline-hover">{link.label}</span>
                {active && (
                  <span
                    aria-hidden
                    className="ml-1 inline-block h-1 w-1 rounded-full bg-ember"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <Link
            href="/contact"
            className={cn(
              'group inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-medium transition-all duration-500 ease-editorial',
              overlay
                ? 'border-bone/30 bg-bone/10 text-bone backdrop-blur-md hover:border-bone hover:bg-bone hover:text-char'
                : 'border-char bg-char text-bone hover:bg-ember hover:border-ember',
            )}
          >
            Demander un devis
            <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-editorial group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={cn(
            'inline-flex h-11 w-11 items-center justify-center rounded-full border transition lg:hidden',
            overlay
              ? 'border-bone/30 text-bone hover:bg-bone hover:text-char'
              : 'border-char/20 text-char hover:bg-char hover:text-bone',
          )}
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <ScrollProgress />
      </div>

      {open && (
        <div className="border-t border-char/10 bg-bone lg:hidden">
          <div className="container-page flex flex-col gap-1 py-6">
            {NAV_LINKS.map((link, i) => {
              const active =
                link.href === '/'
                  ? pathname === '/'
                  : pathname?.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'flex items-center justify-between rounded-2xl px-4 py-4 transition',
                    active
                      ? 'bg-char text-bone'
                      : 'text-char hover:bg-char/5',
                  )}
                >
                  <span className="flex items-center gap-3">
                    <span className="font-mono text-[0.7rem] opacity-60">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-display text-2xl tracking-tightest">
                      {link.label}
                    </span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 opacity-60" />
                </Link>
              );
            })}
            <Link
              href="/contact"
              className="mt-3 inline-flex items-center justify-between rounded-2xl bg-ember px-4 py-4 text-bone"
            >
              <span className="font-display text-2xl">Demander un devis</span>
              <ArrowUpRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

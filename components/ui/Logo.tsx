import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  showWordmark?: boolean;
}

const sizes = {
  sm: { mark: 'h-8 w-8', wordmark: 'text-xl', tag: 'text-[0.6rem]' },
  md: { mark: 'h-10 w-10', wordmark: 'text-2xl', tag: 'text-[0.65rem]' },
  lg: { mark: 'h-14 w-14', wordmark: 'text-3xl', tag: 'text-[0.7rem]' },
};

export default function Logo({
  className,
  variant = 'dark',
  size = 'md',
  showWordmark = true,
}: LogoProps) {
  const isLight = variant === 'light';
  const s = sizes[size];

  return (
    <Link
      href="/"
      aria-label="Jesuton SARL — Accueil"
      className={cn(
        'group inline-flex items-center gap-3 leading-none',
        className,
      )}
    >
      <span
        className={cn(
          'relative flex flex-shrink-0 items-center justify-center rounded-xl transition-colors duration-300',
          s.mark,
          isLight && 'bg-bone/15 p-1.5 ring-1 ring-bone/20',
        )}
      >
        <Image
          src="/logo-jesuton.png"
          alt=""
          fill
          sizes="56px"
          className={cn(
            'object-contain transition-transform duration-700 ease-editorial group-hover:scale-[1.04]',
            isLight && 'drop-shadow-[0_0_6px_rgba(244,239,230,0.4)]',
          )}
          priority
        />
      </span>

      {showWordmark && (
        <span className="flex items-baseline gap-1">
          <span
            className={cn(
              'font-display font-medium italic tracking-tightest',
              s.wordmark,
              isLight ? 'text-bone' : 'text-char',
            )}
          >
            Jesuton
          </span>
          <span
            className={cn(
              'font-mono uppercase tracking-[0.25em]',
              s.tag,
              isLight ? 'text-bone/60' : 'text-black',
            )}
          >
            /sarl
          </span>
        </span>
      )}
    </Link>
  );
}

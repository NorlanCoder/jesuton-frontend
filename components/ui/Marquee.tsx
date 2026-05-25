import { cn } from '@/lib/utils';

interface MarqueeProps {
  items: React.ReactNode[];
  separator?: React.ReactNode;
  className?: string;
  itemClassName?: string;
}

export default function Marquee({
  items,
  separator,
  className,
  itemClassName,
}: MarqueeProps) {
  const sep = separator ?? (
    <span aria-hidden className="mx-8 text-char/30">
      ✦
    </span>
  );

  const Track = (
    <div className="marquee-track flex items-center whitespace-nowrap">
      {[...items, ...items].map((item, i) => (
        <span
          key={i}
          className={cn('inline-flex items-center', itemClassName)}
        >
          {item}
          {sep}
        </span>
      ))}
    </div>
  );

  return (
    <div className={cn('marquee', className)} aria-hidden>
      {Track}
    </div>
  );
}

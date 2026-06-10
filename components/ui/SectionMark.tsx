import { cn } from '@/lib/utils';

interface SectionMarkProps {
  index: string;
  label: string;
  className?: string;
  invert?: boolean;
}

export default function SectionMark({
  index,
  label,
  className,
  invert = false,
}: SectionMarkProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.32em]',
        invert ? 'text-bone/60' : 'text-black',
        className,
      )}
    >
      <span className={cn(invert ? 'text-bone' : 'text-char')}>{index}</span>
      <span
        aria-hidden
        className={cn(
          'h-px w-10',
          invert ? 'bg-bone/40' : 'bg-char/40',
        )}
      />
      <span>{label}</span>
    </div>
  );
}

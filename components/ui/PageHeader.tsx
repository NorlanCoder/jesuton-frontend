import SectionMark from '@/components/ui/SectionMark';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  index?: string;
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  meta?: string;
  className?: string;
}

export default function PageHeader({
  index = '00',
  eyebrow,
  title,
  description,
  meta,
  className,
}: PageHeaderProps) {
  return (
    <header className={cn('relative isolate overflow-hidden bg-bone', className)}>
      <div className="grid-overlay opacity-30" />
      <div className="container-page relative pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="flex items-center justify-between pb-10 text-[0.7rem]">
          <SectionMark index={index} label={eyebrow} />
          {meta && (
            <span className="hidden font-mono font-bold uppercase tracking-[0.32em] text-black md:inline">
              {meta}
            </span>
          )}
        </div>
        <div className="rule mb-12" />
        <h1 className="display-1 max-w-[18ch] text-balance">{title}</h1>
        {description && (
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-char/75 md:text-lg">
            {description}
          </p>
        )}
      </div>
    </header>
  );
}

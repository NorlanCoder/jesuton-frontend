import Marquee from '@/components/ui/Marquee';
import { STATS } from '@/lib/constants';
import { formatNumber } from '@/lib/utils';

export default function StatsMarquee() {
  const items = STATS.map((s, i) => (
    <span
      key={i}
      className="inline-flex items-baseline gap-3 px-2 font-display text-4xl italic text-bone sm:text-5xl md:text-6xl"
    >
      <span className="font-mono text-[0.7rem] not-italic tracking-[0.32em] text-bone/40">
        {String(i + 1).padStart(2, '0')}
      </span>
      <span className="text-ember">{formatNumber(s.value)}{s.suffix}</span>
      <span className="text-bone/90">{s.label}</span>
    </span>
  ));

  return (
    <div className="border-y border-bone/10 bg-char py-8">
      <Marquee
        items={items}
        separator={
          <span aria-hidden className="mx-10 text-ember/50">
            ／
          </span>
        }
      />
    </div>
  );
}

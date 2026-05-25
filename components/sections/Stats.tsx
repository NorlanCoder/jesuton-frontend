'use client';

import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Lightbulb, Droplets, Activity, Sun, Gauge } from 'lucide-react';
import SectionMark from '@/components/ui/SectionMark';
import { formatNumber } from '@/lib/utils';

interface Stat {
  value: number;
  suffix?: string;
  label: string;
  caption: string;
  Icon: React.ElementType;
}

const stats: Stat[] = [
  {
    value: 2000,
    suffix: '+',
    label: 'Lampadaires installés',
    caption: 'Éclairage public urbain & rural.',
    Icon: Lightbulb,
  },
  {
    value: 200,
    suffix: '+',
    label: 'Pompes solaires',
    caption: 'Adduction & irrigation.',
    Icon: Droplets,
  },
  {
    value: 30,
    suffix: '+',
    label: 'Microcentrales',
    caption: 'Sites isolés & villages.',
    Icon: Activity,
  },
  {
    value: 2000,
    suffix: '+',
    label: 'Kits solaires vendus',
    caption: 'Foyers, commerces, bureaux.',
    Icon: Sun,
  },
  {
    value: 1000,
    suffix: '+',
    label: 'Audits énergétiques',
    caption: 'Diagnostics & études techniques.',
    Icon: Gauge,
  },
];

export default function Stats() {
  return (
    <section className="section bg-bone">
      <div className="container-page">
        {/* Header magazine */}
        <div className="grid items-end gap-6 border-b border-char/15 pb-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionMark index="02" label="Chiffres clés" />
            <h2 className="display-2 mt-6 max-w-[18ch]">
              Une décennie de
              <br />
              réalisations <span className="text-ember">concrètes</span>.
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-char/75 lg:col-span-5 lg:col-start-8">
            Plus de cinq mille installations à travers le Bénin — chaque chiffre
            représente une école éclairée, un village alimenté, une exploitation
            irriguée.
          </p>
        </div>

        {/* Grille éditoriale 5 colonnes divisées */}
        <div className="grid grid-cols-1 divide-y divide-char/15 sm:grid-cols-2 sm:divide-x lg:grid-cols-5">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              className="group relative flex min-h-[260px] flex-col justify-between overflow-hidden p-6 sm:p-7 lg:p-8"
            >
              {/* Icône en watermark */}
              <stat.Icon
                aria-hidden
                strokeWidth={1.2}
                className="pointer-events-none absolute -right-2 -top-2 h-24 w-24 text-char/[0.06] transition-all duration-700 ease-editorial group-hover:rotate-6 group-hover:text-ember/30"
              />

              {/* Numéro éditorial */}
              <span className="relative font-mono text-[0.7rem] uppercase tracking-[0.28em] text-char/50">
                № {String(i + 1).padStart(2, '0')}
              </span>

              {/* Bloc principal */}
              <div className="relative">
                <p className="font-display text-5xl font-extrabold leading-none tracking-ultra text-char sm:text-6xl">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-3 max-w-[20ch] text-sm font-medium text-char/85">
                  {stat.label}
                </p>
                <p className="mt-1 max-w-[24ch] text-xs leading-snug text-char/55">
                  {stat.caption}
                </p>
              </div>

              {/* Trait qui s'étire au hover */}
              <span
                aria-hidden
                className="relative h-px w-12 origin-left bg-char transition-transform duration-700 ease-editorial group-hover:scale-x-[4] group-hover:bg-ember"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Counter({ value, suffix }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-30px' });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 2000, bounce: 0 });

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, motionValue, value]);

  useEffect(() => {
    return spring.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = formatNumber(Math.round(latest));
      }
    });
  }, [spring]);

  return (
    <span className="tabular-nums">
      <span ref={ref}>0</span>
      {suffix && <span>{suffix}</span>}
    </span>
  );
}

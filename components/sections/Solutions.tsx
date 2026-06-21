'use client';

import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from 'lucide-react';
import SectionMark from '@/components/ui/SectionMark';
import Reveal from '@/components/ui/Reveal';
import { cn } from '@/lib/utils';

interface Solution {
  index: string;
  title: string;
  italic?: string;
  description: string;
  href: string;
  feature: string;
  image: string;
  alt: string;
  meta: { label: string; value: string };
}

const solutions: Solution[] = [
  {
    index: '01',
    title: 'Kits',
    italic: 'solaires',
    description:
      'Production fiable pour foyers, commerces et bureaux. De 1 à 10 kVA, conçus pour le climat ouest-africain.',
    href: '/produits?category=kits-solaires',
    feature: 'À partir de 1 kVA',
    image:
      '/Kit solaire.png',
    alt: 'Toiture résidentielle équipée de panneaux solaires',
    meta: { label: 'Kits installés', value: '2 000+' },
  },
  {
    index: '02',
    title: 'Pompes',
    italic: 'solaires',
    description:
      'Adduction d’eau, irrigation, élevage. Plus de 200 pompes installées sur tout le territoire.',
    href: '/produits?category=pompes-solaires',
    feature: 'Surface & immergées',
    image:
      '/pompe solaire.png',
    alt: 'Pompe solaire',
    meta: { label: 'Pompes solaires', value: '200+' },
  },
  {
    index: '03',
    title: 'Lampadaires',
    italic: 'autonomes',
    description:
      'Éclairage public solaire pour rues, places et zones rurales. Plus de 2 000 mâts déployés.',
    href: '/produits?category=lampadaires',
    feature: 'Autonomie 12h+',
    image:
      '/lampadaire solaire 1.jpeg',
    alt: 'Lampadaire moderne sous un ciel dégagé',
    meta: { label: 'Lampadaires', value: '5 000+' },
  },
  {
    index: '04',
    title: 'Microcentrales',
    italic: 'hybrides',
    description:
      'Centrales solaires hybrides pour villages, écoles et infrastructures isolées. Étude technique sur-mesure.',
    href: '/produits?category=microcentrales',
    feature: 'Sur-mesure',
    image:
      'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1400&q=80',
    alt: 'Champ de panneaux solaires en plein soleil',
    meta: { label: 'Microcentrales', value: '30+' },
  },
  {
    index: '05',
    title: 'Climatisation',
    italic: 'solaire',
    description:
      'Refroidissement hybride photovoltaïque pour le tertiaire et le résidentiel. Jusqu’à -70% de consommation d’énergie.',
    href: '/produits?category=climatisation',
    feature: 'Jusqu’à -70%',
    image:
      '/climatisation.jpeg',
    alt: 'Intérieur lumineux climatisé avec apport solaire',
    meta: { label: 'Économie d’énergie', value: '-70%' },
  },
  {
    index: '06',
    title: 'Audits',
    italic: '& études',
    description:
      'Diagnostic, dimensionnement, faisabilité. Études techniques et conseil indépendant pour vos projets.',
    href: '/services',
    feature: 'Expertise terrain',
    image:
      '/photovoltaics-factory-investors-evaluate-solar-panels-addressing-issues.jpg',
    alt: 'Ingénieur étudiant des plans techniques',
    meta: { label: 'Audits réalisés', value: '100+' },
  },
];

const AUTOPLAY_MS = 6500;

export default function Solutions() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback(
    (next: number) => {
      setDirection(next > index ? 1 : -1);
      setIndex((next + solutions.length) % solutions.length);
    },
    [index],
  );

  const next = useCallback(() => {
    setDirection(1);
    setIndex((i) => (i + 1) % solutions.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setIndex((i) => (i - 1 + solutions.length) % solutions.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % solutions.length);
    }, AUTOPLAY_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, index]);

  const active = solutions[index];

  return (
    <section className="section bg-bone">
      <div className="container-page">
        {/* Header magazine */}
        <div className="grid items-end gap-6 border-b border-char/15 pb-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionMark index="03" label="Catalogue" />
            <h2 className="display-2 mt-6">
              Six gammes. Une qualité{' '}
              <span className="italic text-ember">sans concession</span>
            </h2>
          </div>
          <Reveal
            delay={120}
            className="max-w-md text-base leading-relaxed text-char/75 lg:col-span-4 lg:col-start-9"
          >
            Du kit résidentiel à la microcentrale communale : du matériel
            certifié, un dimensionnement rigoureux, une installation
            irréprochable et un service après-vente assuré.
          </Reveal>
        </div>

        {/* Bloc carousel compact */}
        <div className="mt-12 grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Contenu textuel */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={`text-${index}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.32em] text-black">
                  Solution № {active.index} · {active.feature}
                </span>
                <h3 className="mt-4 font-display text-5xl font-extrabold leading-[0.95] tracking-ultra text-char sm:text-[4.25rem]">
                  {active.title}
                  {active.italic && (
                    <>
                      {' '}
                      <span className="italic font-medium text-ember">
                        {active.italic}
                      </span>
                    </>
                  )}
                </h3>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-char/75">
                  {active.description}
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <Link
                    href={active.href}
                    className="group inline-flex items-center gap-3 rounded-full bg-char px-6 py-3.5 text-sm font-semibold text-bone transition-transform duration-500 ease-editorial hover:scale-[1.02]"
                  >
                    Découvrir la solution
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-ember text-char transition-transform duration-500 group-hover:rotate-45">
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-full border border-char/25 px-6 py-3.5 text-sm font-medium text-char transition hover:border-char hover:bg-char hover:text-bone"
                  >
                    Demander un devis
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Image compacte */}
          <div className="relative aspect-[5/4] w-full overflow-hidden rounded-[24px] bg-char lg:col-span-5">
            <AnimatePresence initial={false} mode="sync" custom={direction}>
              <motion.div
                key={active.image}
                custom={direction}
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={active.image}
                  alt={active.alt}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                  priority={index === 0}
                />
              </motion.div>
            </AnimatePresence>

            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(180deg, rgba(10,10,10,0.05) 0%, rgba(10,10,10,0.4) 100%)',
              }}
            />

            {/* Numéro top-left */}
            <span className="absolute left-5 top-5 font-mono text-[0.7rem] font-bold uppercase tracking-[0.32em] text-bone/85">
              № {active.index} / {String(solutions.length).padStart(2, '0')}
            </span>

            {/* Badge stat compact bottom-left */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`meta-${index}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3"
              >
                <div className="rounded-xl border border-bone/20 bg-char/45 px-4 py-3 backdrop-blur-xl">
                  <p className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.28em] text-bone/65">
                    {active.meta.label}
                  </p>
                  <p className="font-display text-2xl font-extrabold tracking-ultra text-ember sm:text-3xl">
                    {active.meta.value}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Barre de navigation horizontale style Hero */}
        <div className="mt-14 border-t border-char/15 pt-6">
          <div className="mb-5 flex items-center justify-between gap-4">
            <p className="hidden font-mono text-[0.7rem] font-bold uppercase tracking-[0.32em] text-black md:block">
              Glissez ou utilisez les flèches pour explorer
            </p>
            <div className="flex items-center gap-2 md:ml-auto">
              <button
                type="button"
                onClick={() => setPaused((p) => !p)}
                aria-label={paused ? 'Reprendre' : 'Pause'}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-char/25 text-char transition hover:border-char hover:bg-char hover:text-bone"
              >
                {paused ? (
                  <Play className="h-3.5 w-3.5" />
                ) : (
                  <Pause className="h-3.5 w-3.5" />
                )}
              </button>
              <button
                type="button"
                onClick={prev}
                aria-label="Précédent"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-char/25 text-char transition hover:border-char hover:bg-char hover:text-bone"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Suivant"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-char/25 text-char transition hover:border-char hover:bg-char hover:text-bone"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Progress bars cliquables, 6 segments */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {solutions.map((s, i) => {
              const activeRow = i === index;
              return (
                <button
                  key={s.index}
                  type="button"
                  onClick={() => goTo(i)}
                  className="group flex flex-col gap-2 text-left"
                  aria-label={`Aller à ${s.title}`}
                >
                  <span className="relative h-[2px] w-full overflow-hidden bg-char/15">
                    {activeRow && !paused && (
                      <motion.span
                        key={`bar-${index}`}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{
                          duration: AUTOPLAY_MS / 1000,
                          ease: 'linear',
                        }}
                        className="absolute inset-y-0 left-0 w-full origin-left bg-ember"
                      />
                    )}
                    {activeRow && paused && (
                      <span className="absolute inset-y-0 left-0 w-full bg-ember" />
                    )}
                  </span>
                  <span className="flex items-center justify-between text-[0.65rem] uppercase tracking-[0.22em]">
                    <span
                      className={cn(
                        'font-mono transition-colors',
                        activeRow
                          ? 'text-char'
                          : 'text-char/45 group-hover:text-char',
                      )}
                    >
                      {s.index}
                    </span>
                    <span
                      className={cn(
                        'font-display text-xs font-medium tracking-tight transition-colors',
                        activeRow
                          ? 'text-char'
                          : 'text-char/55 group-hover:text-char',
                      )}
                    >
                      {s.title}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

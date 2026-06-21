'use client';

import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Slide {
  image: string;
  alt: string;
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  metric: { label: string; value: string };
  cta: { label: string; href: string };
}

const SLIDES: Slide[] = [
  {
    image:
      'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=2400&q=80',
    alt: 'Champ de panneaux solaires sous un ciel dégagé',
    eyebrow: 'Énergie photovoltaïque',
    title: (
      <>
        L&apos;énergie du <span className="text-ember">soleil</span>,
        <br />
        au service du Bénin
      </>
    ),
    description:
      'Kits, microcentrales, lampadaires, pompes : nous concevons et installons des solutions solaires qui durent.',
    metric: { label: 'Réalisations', value: '5,2k+' },
    cta: { label: 'Demander un devis', href: '/contact' },
  },
  {
    image:
      '/pompage et irrigation.png',
    alt: 'Champs cultivés irrigués grâce à des pompes solaires',
    eyebrow: 'Pompage solaire & irrigation',
    title: (
      <>
        L&apos;eau arrive
        <br />
        là où le <span className="text-ember">soleil brille</span>
      </>
    ),
    description:
      'Pompes immergées et de surface pour irrigation, adduction et élevage — autonomes, robustes, fiables.',
    metric: { label: 'Pompes solaires', value: '200+' },
    cta: { label: 'Découvrir nos pompes', href: '/produits?category=pompes-solaires' },
  },
  {
    image:
      '/electrification 3.png',
    alt: 'Champs cultivés irrigués grâce à des pompes solaires',
    eyebrow: 'Électrification & Réseaux',
    title: (
      <>
      L&apos;avenir de l&apos;<span className="text-ember">énergie</span>,
        <br />
        aujourd&apos;hui
      </>
    ),
    description:
      'L\'énergie solaire au service du développement. Nos solutions fournissent de l\'électricité aux communautés et aux entreprises, créant de nouvelles opportunités et améliorant la qualité de vie.',
    metric: { label: 'Projets d\électricité', value: '200+' },
    cta: { label: 'Découvrir nos services', href: '/sercices' },
  },
  {
    image:
      '/yellow-safety-helmet-solar-cell-panel (1).jpg',
    alt: 'Champ de panneaux solaires au coucher du soleil',
    eyebrow: 'BTP & Assainissement',
    title: (
      <>
       
        BTP & Solutions solaires
        
        <span className="text-ember"> durables</span>
      </>
    ),
    description:
      'Solutions BTP intégrées pour centrales solaires, réseaux intelligents et infrastructures communautaires durables. Étude, conception et installation sur-mesure sur tout le territoire béninois.',
    metric: { label: 'Projets BTP', value: '300+' },
    cta: { label: 'Étudier mon projet', href: '/contact' },
  },
];

const AUTOPLAY_MS = 6500;

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((next: number) => {
    setDirection(next > index ? 1 : -1);
    setIndex((next + SLIDES.length) % SLIDES.length);
  }, [index]);

  const next = useCallback(() => {
    setDirection(1);
    setIndex((i) => (i + 1) % SLIDES.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % SLIDES.length);
    }, AUTOPLAY_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, index]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev]);

  const slide = SLIDES[index];

  return (
    <section
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-char text-bone"
      aria-roledescription="carousel"
      aria-label="Réalisations Jesuton"
    >
      {/* Couches images crossfade */}
      <div className="absolute inset-0">
        <AnimatePresence initial={false} mode="sync" custom={direction}>
          <motion.div
            key={slide.image}
            custom={direction}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Filtre / overlay */}
        <div
          aria-hidden
          className="absolute inset-0 bg-char/5"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(10,10,10,0.4) 0%, rgba(10,10,10,0.1) 35%, rgba(10,10,10,0.45) 100%)',
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.25) 45%, rgba(10,10,10,0.05) 100%)',
          }}
        />

        {/* Bruit subtil */}
        <div className="absolute inset-0 opacity-[0.18] mix-blend-overlay bg-noise" />
      </div>

      {/* Contenu */}
      <div className="relative z-10 flex flex-1 flex-col">
        {/* Top meta bar (sous le header overlay) */}
        <div className="container-page flex flex-shrink-0 items-center justify-between pt-28 text-[0.7rem] md:pt-32">
          <span className="font-mono font-bold uppercase tracking-[0.32em] text-bone/70">
            ★ Cotonou · Bénin
          </span>
          <span className="hidden font-mono font-bold uppercase tracking-[0.32em] text-bone/50 md:inline">
            № {String(index + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
          </span>
        </div>

        {/* Slot principal */}
        <div className="container-page flex flex-1 items-center py-12 md:py-16">
          <div className="grid w-full gap-10 lg:grid-cols-12 lg:gap-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={`text-${index}`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="lg:col-span-8"
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-bone/20 bg-bone/10 px-4 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.28em] text-bone backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-ember" />
                  {slide.eyebrow}
                </span>

                <h1 className="display-1 mt-6 max-w-[18ch] text-balance text-bone">
                  {slide.title}
                </h1>

                <p className="mt-7 max-w-xl text-base leading-relaxed text-bone/80 md:text-lg">
                  {slide.description}
                </p>

                <div className="mt-10 flex flex-wrap items-center gap-3">
                  <Link
                    href={slide.cta.href}
                    className="group inline-flex items-center gap-3 rounded-full bg-ember px-7 py-4 text-sm font-semibold text-char transition-transform duration-500 ease-editorial hover:scale-[1.02]"
                  >
                    {slide.cta.label}
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-char text-bone transition-transform duration-500 group-hover:rotate-45">
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </Link>
                  <Link
                    href="/produits"
                    className="inline-flex items-center gap-2 rounded-full border border-bone/30 px-6 py-4 text-sm font-medium text-bone backdrop-blur-md transition hover:border-bone hover:bg-bone hover:text-char"
                  >
                    Voir le catalogue
                  </Link>
                </div>
              </motion.div>

              {/* Carte stat flottante */}
              <motion.aside
                key={`metric-${index}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="hidden lg:col-span-4 lg:flex lg:items-end lg:justify-end"
              >
                <div className="w-full max-w-xs rounded-2xl border border-bone/15 bg-char/40 p-6 backdrop-blur-xl">
                  <p className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.32em] text-bone/60">
                    {slide.metric.label}
                  </p>
                  <p className="mt-2 font-display text-6xl font-extrabold tracking-ultra text-ember">
                    {slide.metric.value}
                  </p>
                  <div className="mt-4 h-px w-full bg-bone/15" />
                  <p className="mt-4 text-xs leading-relaxed text-bone/70">
                    Plus d&apos;une décennie d&apos;installations à travers tout
                    le territoire béninois.
                  </p>
                </div>
              </motion.aside>
            </AnimatePresence>
          </div>
        </div>

        {/* Contrôles & indicateurs */}
        <div className="container-page flex-shrink-0 pb-8 md:pb-10">
          <div className="flex flex-col gap-6">
            {/* Progress bars cliquables */}
            <div className="flex items-center gap-3">
              {SLIDES.map((s, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  className="group flex flex-1 flex-col gap-2 text-left"
                  aria-label={`Aller à la slide ${i + 1} : ${s.eyebrow}`}
                >
                  <span className="relative h-[2px] w-full overflow-hidden bg-bone/20">
                    {i === index && !paused && (
                      <motion.span
                        key={`progress-${index}`}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: AUTOPLAY_MS / 1000, ease: 'linear' }}
                        className="absolute inset-y-0 left-0 w-full origin-left bg-ember"
                        style={{ transformOrigin: 'left' }}
                      />
                    )}
                    {i === index && paused && (
                      <span className="absolute inset-y-0 left-0 w-full bg-ember" />
                    )}
                    {i < index && (
                      <span className="absolute inset-y-0 left-0 w-full bg-bone/60" />
                    )}
                  </span>
                  <span className="hidden items-center justify-between text-[0.65rem] uppercase tracking-[0.22em] text-bone/50 md:flex">
                    <span
                      className={cn(
                        'font-mono transition-colors',
                        i === index ? 'text-bone' : 'group-hover:text-bone',
                      )}
                    >
                      {String(i + 1).padStart(2, '0')} — {s.eyebrow}
                    </span>
                  </span>
                </button>
              ))}
            </div>

            {/* Boutons prev / next / pause */}
            <div className="flex items-center justify-between">
              <p className="hidden font-mono text-[0.7rem] font-bold uppercase tracking-[0.32em] text-bone/60 md:block">
                Glissez ou utilisez ← → pour naviguer
              </p>
              <div className="flex items-center gap-2 md:ml-auto">
                <button
                  type="button"
                  onClick={() => setPaused((p) => !p)}
                  aria-label={paused ? 'Reprendre la lecture' : 'Mettre en pause'}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-bone/25 text-bone transition hover:border-bone hover:bg-bone hover:text-char"
                >
                  {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                </button>
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Slide précédente"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-bone/25 text-bone transition hover:border-bone hover:bg-bone hover:text-char"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Slide suivante"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-bone/25 text-bone transition hover:border-bone hover:bg-bone hover:text-char"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

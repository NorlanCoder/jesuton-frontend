'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Phone } from 'lucide-react';

const promises = [
  { label: 'Réponse', value: 'Sous 24 h' },
  { label: 'Garantie', value: '5 ans' },
  { label: 'Suivi', value: 'À vie' },
];

export default function CTASection() {
  return (
    <section className="relative isolate overflow-hidden bg-bone text-char md:bg-ember-50">
      {/* Filet ember en haut, signature douce */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[2px] bg-ember/70 md:h-[3px]"
      />

      {/* Soleil filaire en fond, desktop uniquement */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 hidden lg:block"
      >
        <svg width="520" height="520" viewBox="0 0 520 520" className="opacity-30">
          <g
            stroke="rgba(192,57,43,0.5)"
            strokeWidth="1"
            fill="none"
            strokeLinecap="round"
          >
            <circle cx="260" cy="260" r="120" />
            {Array.from({ length: 36 }).map((_, i) => {
              const angle = (i * Math.PI * 2) / 36;
              const x1 = 260 + Math.cos(angle) * 140;
              const y1 = 260 + Math.sin(angle) * 140;
              const x2 = 260 + Math.cos(angle) * 220;
              const y2 = 260 + Math.sin(angle) * 220;
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
            })}
          </g>
        </svg>
      </div>

      <div className="container-page relative py-14 md:py-28">
        {/* Top eyebrow */}
        <div className="flex items-center justify-between font-mono text-[0.65rem] uppercase tracking-[0.32em] text-char/60 md:text-[0.7rem]">
          <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-ember" />
            Démarrer un projet
          </span>
          <span className="hidden md:inline">№ 06 / Contact</span>
        </div>

        <div className="mt-8 grid items-end gap-8 md:mt-10 md:gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Titre + paragraphe */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <h2 className="font-display text-4xl font-extrabold leading-[0.98] tracking-tightest text-char sm:text-5xl md:max-w-[14ch] md:text-7xl md:leading-[0.95] md:tracking-ultra xl:text-8xl">
              Parlons de
              <br />
              <span className="italic font-medium text-ember">
                votre projet
              </span>{' '}
              solaire.
            </h2>
            <p className="mt-5 max-w-xl text-[0.95rem] leading-relaxed text-char/70 md:mt-7 md:text-base md:text-char/75">
              Décrivez-nous votre besoin — résidentiel, commercial,
              communautaire. Nos ingénieurs vous rappellent sous 24 heures
              avec une étude personnalisée.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-start gap-3 md:gap-4 lg:col-span-5 lg:items-end"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 rounded-full bg-char px-6 py-3.5 text-[0.85rem] font-semibold text-bone transition-transform duration-500 ease-editorial hover:scale-[1.02] md:px-7 md:py-4 md:text-sm"
            >
              Demander un devis gratuit
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-ember text-char transition-transform duration-500 group-hover:rotate-45">
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </Link>
            <Link
              href="tel:+22900000000"
              className="inline-flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.28em] text-char/65 transition-colors hover:text-char md:text-[0.7rem]"
            >
              <Phone className="h-3.5 w-3.5" />
              ou +229 00 00 00 00
            </Link>
          </motion.div>
        </div>

        {/* Promesses : grille divisée sur desktop, liste douce sur mobile */}
        <div className="mt-10 md:mt-20">
          {/* Mobile : liste sobre sans gros bordereaux */}
          <ul className="flex flex-col gap-3 md:hidden">
            {promises.map((p) => (
              <li
                key={p.label}
                className="flex items-baseline justify-between border-b border-char/10 pb-3 last:border-b-0"
              >
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-char/55">
                  {p.label}
                </span>
                <span className="font-display text-lg font-bold tracking-tight text-char">
                  {p.value}
                </span>
              </li>
            ))}
          </ul>

          {/* Desktop : grille divisée éditoriale */}
          <div className="hidden grid-cols-4 divide-x divide-char/15 border-y border-char/15 md:grid">
            {promises.map((p, i) => (
              <motion.div
                key={p.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="flex flex-col gap-1 px-7 py-8 first:pl-0 last:pr-0"
              >
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.28em] text-char/55">
                  {p.label}
                </span>
                <span className="font-display text-3xl font-extrabold tracking-tight text-char">
                  {p.value}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Pied éditorial */}
        <div className="mt-8 flex flex-col items-start justify-between gap-2 font-mono text-[0.6rem] uppercase tracking-[0.32em] text-char/50 sm:flex-row sm:items-center md:text-[0.65rem] md:text-char/55">
          <span>Jesuton SARL · Cotonou · Bénin</span>
          <span className="font-display text-xs font-normal italic tracking-tight text-char/70 md:text-sm md:text-char/80">
            ☼ Au plus près du soleil.
          </span>
        </div>
      </div>
    </section>
  );
}

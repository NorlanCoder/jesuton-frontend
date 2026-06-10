'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import SectionMark from '@/components/ui/SectionMark';

const beats = [
  {
    year: '2014',
    label: 'Création',
    text: 'Lancement de l’activité au Bénin.',
  },
  {
    year: '2015',
    label: 'SARL',
    text: 'Constitution officielle en société.',
  },
  {
    year: '2018',
    label: 'Expansion',
    text: 'Déploiement régional à grande échelle.',
  },
  {
    year: '2026',
    label: 'Aujourd’hui',
    text: 'Référence locale, équipes formées.',
  },
];

const highlights = [
  { value: '10+', label: 'Années d’expertise' },
  { value: '5,2k', label: 'Réalisations' },
  { value: '100%', label: 'Solaire & local' },
];

export default function AboutPreview() {
  return (
    <section className="section bg-bone">
      <div className="container-page">
        {/* En-tête : ligne meta + titre fort */}
        <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <SectionMark index="01" label="À propos" />

            <h2 className="display-2 mt-6 max-w-[20ch] text-balance">
              Une expertise <span className="text-ember">béninoise</span>,
              tenace, qui n&apos;a jamais cessé d&apos;apprendre
            </h2>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <p className="text-base leading-relaxed text-char/75 md:text-lg">
              Depuis dix ans, nous bâtissons des installations qui durent — au
              climat, au temps, aux usages réels d&apos;un territoire en
              mouvement.
            </p>
            <Link
              href="/a-propos"
              className="group mt-8 inline-flex items-center gap-2 border-b border-char pb-1 text-sm font-medium tracking-tight text-char hover:border-ember hover:text-ember transition-colors"
            >
              Lire le manifeste
              <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        {/* Highlights : 3 chiffres clés sur ligne sobre */}
        <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-char/15 bg-char/15 sm:grid-cols-3">
          {highlights.map((h, i) => (
            <motion.div
              key={h.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="bg-bone p-8 sm:p-10"
            >
              <p className="font-display text-5xl font-extrabold tracking-ultra text-char sm:text-6xl">
                {h.value}
              </p>
              <p className="mt-3 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-black">
                {h.label}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

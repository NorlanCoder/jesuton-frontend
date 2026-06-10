'use client';

import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';
import SectionMark from '@/components/ui/SectionMark';

const pillars = [
  {
    n: '01',
    title: 'Engagement écologique',
    text: 'Réduire l’empreinte carbone du Bénin par l’energie durable.',
  },
  {
    n: '02',
    title: 'Énergie durable',
    text: 'Rendre accessible une électricité fiable, autonome et respectueuse.',
  },
  {
    n: '03',
    title: 'Impact local',
    text: 'Stimuler la création d’emplois, dynamiser les activités génératrices de revenus et renforcer l’économie locale.',
  },
];

export default function Mission() {
  return (
    <section className="relative isolate overflow-hidden bg-moss text-bone">
      <div className="grid-overlay opacity-[0.07]" />

      <div className="container-page relative section">
        <div className="grid items-end gap-6 border-b border-bone/15 pb-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionMark index="05" label="Manifeste" invert />
            <h2 className="display-2 mt-6 text-bone">
              Bâtir un Bénin{' '}
              <span className="italic text-ember">alimenté</span> par le
              photovoltaïque
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="text-base leading-relaxed text-bone/75">
              Chaque installation est une étape. Chaque partenariat, un pas vers
              un futur plus propre, plus autonome — et plus juste.
            </p>
            <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-bone/20 px-4 py-2 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-bone/85">
              <Leaf className="h-3.5 w-3.5 text-ember" />
              Entreprise engagée
            </span>
          </div>
        </div>

        <div className="mt-12 grid gap-px bg-bone/15 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p, i) => (
            <motion.article
              key={p.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              className="group relative bg-moss p-8 transition-colors duration-500 ease-editorial hover:bg-char"
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-[0.7rem] uppercase tracking-[0.28em] text-bone/50">
                  № {p.n}
                </span>
                <span
                  aria-hidden
                  className="h-2 w-2 rounded-full bg-ember transition-transform duration-500 group-hover:scale-150"
                />
              </div>
              <h3 className="mt-12 font-display text-3xl font-medium tracking-tightest text-bone">
                {p.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-bone/75">
                {p.text}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

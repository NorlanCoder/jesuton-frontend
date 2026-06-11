import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import SectionMark from '@/components/ui/SectionMark';
import CTASection from '@/components/sections/CTASection';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Vente d’équipements solaires, dimensionnement et installation, microcentrales, lampadaires, pompes solaires, audits énergétiques et études techniques.',
};

const services = [
  {
    n: '01',
    title: 'Vente',
    italic: 'd’équipements',
    text: 'Panneaux, batteries, onduleurs, régulateurs et accessoires de grandes marques avec garantie.',
  },
  {
    n: '02',
    title: 'Dimensionnement',
    italic: '& installation',
    text: 'Étude des besoins, dimensionnement précis, installation par des techniciens certifiés.',
  },
  // {
  //   n: '03',
  //   title: 'Microcentrales',
  //   italic: 'solaires',
  //   text: 'Centrales pour villages, sites isolés et entreprises ayant besoin d’énergie en quantité.',
  // },
  {
    n: '03',
    title: 'BTP',
    italic: '& Construction de batiment',
    text: 'Électricité bâtiment (installation et mise aux normes), Réseaux électriques et extension de réseau, Assainissement et drainage',
  },
  // {
  //   n: '04',
  //   title: 'Lampadaires',
  //   italic: 'solaires',
  //   text: 'Éclairage public autonome : sélection, installation et maintenance préventive.',
  // },
  // {
  //   n: '05',
  //   title: 'Pompes',
  //   italic: 'solaires',
  //   text: 'Adduction d’eau, irrigation agricole, élevage : nos pompes fonctionnent en autonomie.',
  // },
  {
    n: '04',
    title: 'Infrastructures routières & ',
    italic: 'assainissement',
    text: 'Pavage de rue, bitumage, caniveaux',
  },
  {
    n: '05',
    title: 'Audits',
    italic: '& études',
    text: 'Audit énergétique, faisabilité, optimisation des installations existantes.',
  },

  {
    n: '',
    title: '',
    italic: '',
    text: '',
  },
  

];

const process = [
  {
    n: '01',
    title: 'Diagnostic',
    text: 'Échange initial pour comprendre vos besoins, contraintes et objectifs.',
  },
  {
    n: '02',
    title: 'Étude',
    text: 'Analyse technique, dimensionnement précis et proposition chiffrée.',
  },
  {
    n: '03',
    title: 'Installation',
    text: 'Mise en œuvre par nos équipes, dans le respect des normes et délais.',
  },
  {
    n: '04',
    title: 'Suivi',
    text: 'Maintenance préventive et assistance réactive sur le long terme.',
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        index="03"
        eyebrow="Services"
        meta="Cinq métiers · Un engagement"
        title={
          <>
            Du conseil à la{' '}
            <span className="italic text-ember">maintenance</span>, sans rupture
          </>
        }
        description="Nous prenons en charge l'intégralité de votre projet : étude, dimensionnement, équipement, installation, mise en service, suivi long terme."
      />

      {/* Liste services en mode éditorial */}
      <section className="bg-bone pb-24">
        <div className="container-page">
          <ol className="grid grid-cols-1 divide-y divide-char/15 border-y border-char/15 sm:grid-cols-2 sm:divide-x lg:grid-cols-3">
            {services.map((s) => (
              <li key={s.n} className="group relative px-2 py-12 sm:px-8">
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[0.7rem] uppercase tracking-[0.28em] text-black">
                    № {s.n}
                  </span>
                  <span
                    aria-hidden
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-char/20 text-char transition-all duration-500 ease-editorial group-hover:rotate-45 group-hover:border-ember group-hover:text-ember"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
                <h3 className="mt-12 font-display text-3xl font-medium leading-none tracking-tightest sm:text-4xl">
                  {s.title}{' '}
                  <span className="italic text-ember">{s.italic}</span>
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-char/70">
                  {s.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Méthode */}
      <section className="section bg-char text-bone">
        <div className="container-page">
          <div className="grid items-end gap-6 border-b border-bone/15 pb-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <SectionMark index="04" label="Méthode" invert />
              <h2 className="display-2 mt-6 max-w-[18ch] text-bone">
                Un processus{' '}
                <span className="italic text-ember">éprouvé</span>, en quatre
                temps.
              </h2>
            </div>
            <p className="max-w-md text-base leading-relaxed text-bone/75 lg:col-span-4 lg:col-start-9">
              De la première discussion au suivi long terme, chaque étape est
              cadrée pour vous offrir clarté et sérénité.
            </p>
          </div>

          <div className="mt-12 grid gap-px bg-bone/15 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((p) => (
              <div
                key={p.n}
                className="bg-char p-7 transition-colors duration-500 hover:bg-moss"
              >
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.28em] text-bone/50">
                  № {p.n}
                </p>
                <p className="mt-12 font-display text-5xl font-medium leading-none tracking-tightest text-ember">
                  {p.n}
                </p>
                <h3 className="mt-2 font-display text-2xl text-bone">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-bone/70">
                  {p.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 rounded-full bg-ember px-7 py-4 text-sm font-medium text-char transition-transform duration-500 ease-editorial hover:scale-[1.02]"
            >
              Discuter de votre projet
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-char text-bone transition-transform duration-500 group-hover:rotate-45">
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}

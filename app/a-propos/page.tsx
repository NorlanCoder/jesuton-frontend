import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import SectionMark from '@/components/ui/SectionMark';
import Stats from '@/components/sections/Stats';
import StatsMarquee from '@/components/sections/StatsMarquee';
import CTASection from '@/components/sections/CTASection';
import Mission from '@/components/sections/Mission';

export const metadata: Metadata = {
  title: 'À propos',
  description:
    'Découvrez Jesuton SARL : notre histoire depuis 2014, notre vision pour un Bénin énergétiquement autonome, et notre engagement écologique.',
};

const timeline = [
  {
    year: '2014',
    label: 'Création',
    text: "Lancement de l'activité au Bénin avec une volonté claire : démocratiser l'accès à l'énergie solaire.",
  },
  {
    year: '2015',
    label: 'Constitution',
    text: 'Structuration officielle en SARL pour servir particuliers, entreprises et collectivités.',
  },
  {
    year: '2018',
    label: 'Expansion',
    text: 'Installation de milliers de lampadaires solaires dans plusieurs communes du Bénin.',
  },
  {
    year: '2026',
    label: 'Référence',
    text: "+5 000 réalisations, des équipes formées et une expertise reconnue sur l'ensemble du territoire.",
  },
];

const values = [
  {
    n: '01',
    title: 'Efficacité technique',
    text: 'Installations dimensionnées avec rigueur, conformes aux normes internationales.',
  },
  {
    n: '02',
    title: 'Proximité',
    text: 'Accompagnement personnalisé du diagnostic à la maintenance, partout au Bénin.',
  },
  {
    n: '03',
    title: 'Durabilité',
    text: 'Choix d’équipements et de pratiques qui préservent l’environnement.',
  },
  {
    n: '04',
    title: 'Transparence',
    text: 'Devis clairs, délais respectés, garanties précises.',
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        index="01"
        eyebrow="À propos"
        meta="Manifeste · 2026"
        title={
          <>
            Dix ans
            <br />
            d&apos;<span className="italic text-ember">obsession</span> pour
            l&apos;énergie qui dure
          </>
        }
        description="Jesuton SARL est née d'une conviction : l'énergie solaire est la voie la plus juste pour un Bénin résilient, autonome et prospère."
      />

      <StatsMarquee />

      {/* Timeline éditoriale */}
      <section className="section bg-bone">
        <div className="container-page">
          <div className="grid items-end gap-6 border-b border-char/15 pb-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <SectionMark index="01" label="Histoire" />
              <h2 className="display-2 mt-6 max-w-[16ch]">
                D&apos;une intuition à une{' '}
                <span className="italic text-ember">expertise reconnue</span>
              </h2>
            </div>
            <p className="max-w-md text-base leading-relaxed text-char/75 lg:col-span-4 lg:col-start-9">
              Notre force : une connaissance fine du terrain et un engagement
              sans compromis sur la qualité.
            </p>
          </div>

          <ol className="mt-16 grid gap-px overflow-hidden rounded-[28px] border border-char/15 bg-char/15 sm:grid-cols-2 lg:grid-cols-4">
            {timeline.map((t) => (
              <li key={t.year} className="bg-bone p-7">
                <p className="font-display text-5xl font-medium leading-none tracking-tightest text-char">
                  {t.year}
                </p>
                <p className="mt-2 font-mono text-[0.65rem] font-bold uppercase tracking-[0.22em] text-ember">
                  {t.label}
                </p>
                <p className="mt-5 text-sm leading-relaxed text-char/70">
                  {t.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Stats />

      {/* Valeurs */}
      <section className="section bg-bone">
        <div className="container-page">
          <div className="grid items-end gap-6 border-b border-char/15 pb-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <SectionMark index="03" label="Valeurs" />
              <h2 className="display-2 mt-6 max-w-[18ch]">
                Les principes qui{' '}
                <span className="italic text-ember">guident</span> chaque
                installation
              </h2>
            </div>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden rounded-[28px] border border-char/15 bg-char/15 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <article key={v.n} className="group bg-bone p-7 transition-colors duration-500 ease-editorial hover:bg-char hover:text-bone">
                <p className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.28em] text-black group-hover:text-bone/60">
                  № {v.n}
                </p>
                <h3 className="mt-12 font-display text-2xl font-medium tracking-tightest">
                  {v.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-char/70 group-hover:text-bone/75">
                  {v.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Mission />
      <CTASection />
    </>
  );
}

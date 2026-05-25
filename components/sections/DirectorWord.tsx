import Image from 'next/image';
import { Quote } from 'lucide-react';
import SectionMark from '@/components/ui/SectionMark';
import Reveal from '@/components/ui/Reveal';

const DIRECTOR = {
  name: 'Justin Sotonougbo',
  role: 'Directeur Général · Jesuton SARL',
  portrait:
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80',
  alt: 'Portrait du directeur général de Jesuton SARL',
};

export default function DirectorWord() {
  return (
    <section className="section bg-bone">
      <div className="container-page">
        {/* Header magazine */}
        <div className="grid items-end gap-6 border-b border-char/15 pb-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionMark index="04" label="Mot du directeur" />
            <h2 className="display-2 mt-6 max-w-[20ch]">
              Une vision <span className="italic text-ember">enracinée</span>,
              <br />
              une exécution rigoureuse.
            </h2>
          </div>
          <Reveal
            delay={120}
            className="max-w-md text-base leading-relaxed text-char/75 lg:col-span-4 lg:col-start-9"
          >
            Plus d&apos;une décennie au service de l&apos;énergie au Bénin, et
            la conviction qu&apos;une solution durable se construit avec ses
            communautés.
          </Reveal>
        </div>

        {/* Bloc principal */}
        <div className="mt-12 grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Portrait */}
          <Reveal className="lg:col-span-5">
            <figure className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] bg-char">
                <Image
                  src={DIRECTOR.portrait}
                  alt={DIRECTOR.alt}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(10,10,10,0) 50%, rgba(10,10,10,0.55) 100%)',
                  }}
                />
                <span className="absolute left-5 top-5 font-mono text-[0.7rem] uppercase tracking-[0.32em] text-bone/80">
                  № 04 · Cotonou
                </span>
                <figcaption className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3">
                  <div>
                    <p className="font-display text-xl font-semibold leading-tight tracking-tight text-bone">
                      {DIRECTOR.name}
                    </p>
                    <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.28em] text-bone/75">
                      {DIRECTOR.role}
                    </p>
                  </div>
                </figcaption>
              </div>
              {/* Petit cadre éditorial */}
              <span
                aria-hidden
                className="pointer-events-none absolute -bottom-3 -right-3 hidden h-24 w-24 border-b border-r border-char/30 sm:block"
              />
            </figure>
          </Reveal>

          {/* Texte / lettre */}
          <Reveal delay={150} className="lg:col-span-7">
            <Quote
              aria-hidden
              strokeWidth={1.2}
              className="h-12 w-12 -translate-x-1 text-ember"
            />
            <blockquote className="mt-4 font-display text-2xl font-medium leading-[1.25] tracking-tight text-char sm:text-3xl">
              «&nbsp;Apporter l&apos;énergie solaire à chaque foyer béninois
              n&apos;est pas une promesse marketing. C&apos;est{' '}
              <span className="italic text-ember">
                notre engagement quotidien
              </span>{' '}
              depuis plus de dix ans.&nbsp;»
            </blockquote>

            <div className="mt-8 space-y-5 text-base leading-relaxed text-char/75">
              <p>
                Quand nous avons fondé Jesuton SARL en 2014, le Bénin
                comptait encore d&apos;immenses zones plongées dans
                l&apos;obscurité dès la tombée du jour. Nous avons fait le
                choix d&apos;une promesse simple : un kit, une pompe, un
                lampadaire — et l&apos;ingénierie qui les fait tenir dans le
                temps.
              </p>
              <p>
                Aujourd&apos;hui, plus de cinq mille installations plus tard,
                nous restons fidèles à cette exigence. Du dimensionnement à
                la maintenance, chaque projet est traité comme s&apos;il
                s&apos;agissait du nôtre. C&apos;est ainsi que nous bâtissons
                une <span className="text-char">souveraineté énergétique</span>{' '}
                durable, à l&apos;échelle du foyer comme du territoire.
              </p>
            </div>

            {/* Signature */}
            <div className="mt-10 flex items-end justify-between gap-6 border-t border-char/15 pt-6">
              <div>
                <p
                  className="font-display text-3xl italic text-char"
                  style={{ fontStyle: 'italic', fontWeight: 500 }}
                >
                  {DIRECTOR.name.split(' ').map((part, i) => (
                    <span key={i}>{i === 0 ? part : ` ${part}`}</span>
                  ))}
                </p>
                <p className="mt-1 font-mono text-[0.7rem] uppercase tracking-[0.28em] text-char/55">
                  {DIRECTOR.role}
                </p>
              </div>
              <span className="hidden font-mono text-[0.65rem] uppercase tracking-[0.32em] text-char/45 sm:inline">
                Cotonou · 2026
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

import Image from 'next/image';
import { Quote } from 'lucide-react';
import SectionMark from '@/components/ui/SectionMark';
import Reveal from '@/components/ui/Reveal';

const DIRECTOR = {
  name: 'Mahugon Emmanuel AGBO',
  role: 'Directeur Général · Jesuton SARL',
  portrait:
    '/Emmanuel AGBO Blanc Noir.png',
  alt: 'Emmanuel AGBO, D.G. Jesuton SARL',
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
              une exécution rigoureuse
            </h2>
          </div>
          <Reveal
            delay={120}
            className="max-w-md text-base leading-relaxed text-char/75 lg:col-span-6 lg:col-start-9"
          >
            JESUTON SARL ambitionne de devenir un acteur de référence au Bénin et en Afrique de
            l’Ouest dans la fourniture de solutions techniques durables, notamment dans les domaines d
            l’énergie solaire, du BTP, des travaux d’électricité généralet des infrastructures de base.
          </Reveal>
        </div>

        {/* Bloc principal */}
        <div className="mt-12 grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Portrait */}
          {/* <Reveal className="lg:col-span-5">
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
                  № 04 · Ab. Calavi
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
              <span
                aria-hidden
                className="pointer-events-none absolute -bottom-3 -right-3 hidden h-24 w-24 border-b border-r border-char/30 sm:block"
              />
            </figure>
          </Reveal>
*/}

          {/* Texte / lettre */}
          <Reveal delay={150} className="lg:col-span-12 mx-8">
            <Quote
              aria-hidden
              strokeWidth={1.2}
              className="h-12 w-12 -translate-x-1 text-ember"
            />
            <blockquote className="mt-4 font-display text-2xl font-medium leading-[1.25] tracking-tight text-char sm:text-3xl">
              «&nbsp;L’énergie solaire n’est plus un luxe ;
              elle est devenue un levier essentiel de <span className="italic text-ember">liberté</span>{' '} et de
<span className="italic text-ember"> développement.</span>»

               
            </blockquote>

            <div className="mt-8 space-y-5 text-base leading-relaxed text-char/75">
              <p>
                Bienvenue dans l&apos;univers de JESUTON Sarl, où chaque projet est une opportunité de bâtir un
                avenir plus lumineux.
                À la création de cette entreprise, notre ambition était claire : contribuer à lever les contraintes
                liées à l’accès à l’énergie en proposant des solutions solaires fiables, performantes et accessibles
                au plus grand nombre.
              </p>
              <p>
                Aujourd&apos;hui, JESUTON SARL accompagne les ménages, les professionnels et les
                entrepreneurs dans leur quête d&apos;autonomie énergétique. Qu&apos;il s&apos;agisse d&apos;éclairer un foyer,
                d&apos;améliorer le confort quotidien ou de soutenir des activités génératrices de revenus grâce à nos
                solutions de conservation et d&apos;équipements, chaque installation que nous réalisons participe à
                la construction d&apos;un environnement plus résilient et durable.
              </p>
              <p>
                Chez JESUTON SARL, nous ne nous contentons pas de fournir des solutions énergétiques ;
                nous contribuons à transformer des vies et à créer de nouvelles opportunités.
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
                <p className="mt-1 font-mono text-[0.7rem] font-bold uppercase tracking-[0.28em] text-black">
                  {DIRECTOR.role}
                </p>
              </div>
              <span className="hidden font-mono text-[0.65rem] font-bold uppercase tracking-[0.32em] text-black sm:inline">
                Cotonou · 2026
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

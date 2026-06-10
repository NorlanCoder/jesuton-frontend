import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="bg-bone">
      <div className="container-page flex min-h-[70vh] flex-col items-start justify-center pt-32 pb-24 md:pt-40">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.32em] text-black">
          ★ Erreur 404
        </p>
        <h1 className="display-1 mt-6 max-w-[16ch]">
          La page <span className="italic text-ember">a disparu</span> dans
          l&apos;ombre.
        </h1>
        <p className="mt-6 max-w-md text-base leading-relaxed text-char/70">
          Le contenu que vous cherchez n&apos;existe pas ou a été déplacé.
          Retournons vers la lumière.
        </p>
        <Link
          href="/"
          className="group mt-10 inline-flex items-center gap-3 rounded-full bg-char px-6 py-4 text-sm font-medium text-bone transition-all duration-500 hover:bg-ember"
        >
          Retour à l&apos;accueil
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-bone text-char transition-transform duration-500 group-hover:rotate-45">
            <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </Link>
      </div>
    </section>
  );
}

import Link from 'next/link';
import { ArrowUpRight, Leaf } from 'lucide-react';
import Logo from '@/components/ui/Logo';
import { NAV_LINKS, SITE } from '@/lib/constants';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative isolate overflow-hidden bg-char text-bone">
      <div className="grid-overlay opacity-[0.06]" />

      <div className="container-page relative pb-12">

        {/* Colonnes */}
        <div className="grid gap-12 pt-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo variant="light" size="lg" />
            <p className="mt-6 max-w-md text-base leading-relaxed text-bone/70">
              {SITE.description}
            </p>

            <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-bone/15 px-4 py-2 text-xs">
              <Leaf className="h-3.5 w-3.5 text-ember" />
              <span className="font-mono uppercase tracking-[0.18em] text-bone/80">
                Engagés pour l&apos;énergie durable
              </span>
            </div>
          </div>

          <div className="lg:col-span-3">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.32em] text-bone/40">
              Index
            </p>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((l, i) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="group inline-flex items-baseline gap-3 font-display text-2xl tracking-tightest text-bone hover:text-ember transition-colors"
                  >
                    <span className="font-mono text-[0.65rem] tracking-[0.2em] text-bone/40">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="underline-hover italic">{l.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.32em] text-bone/40">
              Contact
            </p>
            <div className="mt-5 space-y-5">
              <ContactLine label="Adresse" value={SITE.address} />
              <ContactLine
                label="Téléphone"
                value={SITE.phone}
                href={`tel:${SITE.phone.replace(/\s+/g, '')}`}
              />
              <ContactLine
                label="Email"
                value={SITE.email}
                href={`mailto:${SITE.email}`}
              />
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3 text-xs">
              {[
                ['Facebook', SITE.social.facebook],
                ['LinkedIn', SITE.social.linkedin],
                ['WhatsApp', SITE.social.whatsapp],
                ['TikTok', SITE.social.tiktok]
              ].map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 rounded-full border border-bone/15 px-4 py-2 text-bone/80 transition hover:border-ember hover:text-ember"
                >
                  {label}
                  <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-3 border-t border-bone/10 pt-6 text-xs text-bone/50 md:flex-row md:items-center md:justify-between">
          <p>© {year} Jesuton SARL · Tous droits réservés.</p>
          <p className="font-mono uppercase tracking-[0.2em]">
            Conçu au Bénin · Pour le Bénin
          </p>
        </div>
      </div>
    </footer>
  );
}

function ContactLine({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <span className="block text-base leading-relaxed text-bone hover:text-ember transition-colors">
      {value}
    </span>
  );
  return (
    <div>
      <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-bone/40">
        {label}
      </p>
      <div className="mt-1">
        {href ? <a href={href}>{content}</a> : content}
      </div>
    </div>
  );
}

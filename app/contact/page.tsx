import { Suspense } from 'react';
import type { Metadata } from 'next';
import { Mail, MapPin, Phone, Clock, ArrowUpRight } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import ContactForm from '@/components/contact/ContactForm';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    "Contactez Jesuton SARL pour un devis ou une étude solaire personnalisée. Réponse sous 24h.",
};

const items = [
  {
    label: 'Adresse',
    value: SITE.address,
    Icon: MapPin,
  },
  {
    label: 'Téléphone',
    value: SITE.phone,
    href: `tel:${SITE.phone.replace(/\s+/g, '')}`,
    Icon: Phone,
  },
  {
    label: 'Email',
    value: SITE.email,
    href: `mailto:${SITE.email}`,
    Icon: Mail,
  },
  {
    label: 'Horaires',
    value: 'Lun. – Ven. · 8h – 18h',
    Icon: Clock,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        index="04"
        eyebrow="Contact"
        meta="Réponse sous 24h"
        title={
          <>
            Parlons de votre{' '}
            <span className="italic text-ember">projet solaire</span>
          </>
        }
        description="Particulier, entreprise ou collectivité : notre équipe étudie votre projet et vous propose la meilleure solution sans engagement."
      />

      <section className="bg-bone pb-24">
        <div className="container-page">
          <div className="grid gap-px overflow-hidden rounded-[28px] border border-char/15 bg-char/15 lg:grid-cols-12">
            {/* Sidebar */}
            <aside className="bg-char text-bone p-10 lg:col-span-5 lg:p-12">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.32em] text-bone/60">
                ★ Coordonnées
              </p>
              <h2 className="mt-6 font-display text-4xl italic leading-[0.98] tracking-tightest text-bone">
                Écrivez,
                <br />
                appelez,
                <br />
                ou venez.
              </h2>

              <div className="mt-12 space-y-6 border-t border-bone/15 pt-8">
                {items.map((it) => {
                  const content = (
                    <div className="group flex items-start gap-4">
                      <span className="mt-0.5 inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-bone/20 text-bone/80">
                        <it.Icon className="h-3.5 w-3.5" />
                      </span>
                      <div>
                        <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-bone/50">
                          {it.label}
                        </p>
                        <p className="mt-1 text-base text-bone group-hover:text-ember transition-colors">
                          {it.value}
                        </p>
                      </div>
                    </div>
                  );
                  return it.href ? (
                    <a key={it.label} href={it.href}>
                      {content}
                    </a>
                  ) : (
                    <div key={it.label}>{content}</div>
                  );
                })}
              </div>

              <div className="mt-12 border-t border-bone/15 pt-8">
                <a
                  href={SITE.social.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-between gap-4 rounded-full bg-ember px-5 py-3 text-sm font-medium text-char transition-transform duration-500 hover:scale-[1.02]"
                >
                  Discuter sur WhatsApp
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </aside>

            {/* Form */}
            <div className="bg-bone-50 p-10 lg:col-span-7 lg:p-12">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.32em] text-black">
                ★ Formulaire
              </p>
              <h2 className="mt-4 font-display text-3xl tracking-tightest text-char">
                Décrivez-nous votre projet.
              </h2>
              <p className="mt-2 text-sm text-char/70">
                Champs marqués <span className="text-ember">*</span> requis.
              </p>

              <div className="mt-8">
                <Suspense
                  fallback={
                    <div className="text-sm text-char/60">
                      Chargement du formulaire…
                    </div>
                  }
                >
                  <ContactForm />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

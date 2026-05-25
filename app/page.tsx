import type { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import AboutPreview from '@/components/sections/AboutPreview';
import Stats from '@/components/sections/Stats';
import Solutions from '@/components/sections/Solutions';
import DirectorWord from '@/components/sections/DirectorWord';
import Mission from '@/components/sections/Mission';
import CTASection from '@/components/sections/CTASection';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: `${SITE.name} — Énergie solaire au Bénin`,
  description: SITE.description,
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <Stats />
      <Solutions />
      <DirectorWord />
      <Mission />
      <CTASection />
    </>
  );
}

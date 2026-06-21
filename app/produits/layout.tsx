import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Catalogue',
  description:
    'Découvrez nos kits solaires, lampadaires, pompes, microcentrales et accessoires solaires. Filtrez par catégorie, recherchez et obtenez un devis.',
};

export default function ProduitsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

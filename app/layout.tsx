import type { Metadata, Viewport } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import SiteChrome from '@/components/layout/SiteChrome';
import RevealObserver from '@/components/ui/RevealObserver';
import { SITE } from '@/lib/constants';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    'énergie solaire Bénin',
    'panneaux solaires Cotonou',
    'lampadaires solaires',
    'pompes solaires',
    'microcentrales solaires',
    'audit énergétique',
    'kits solaires',
    'Jesuton SARL',
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: SITE.url,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    siteName: SITE.name,
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: SITE.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.name,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/',
  },
};

export const viewport: Viewport = {
  themeColor: '#f4efe6',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="flex min-h-screen flex-col">
        <RevealObserver />
        <SiteChrome>{children}</SiteChrome>
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 4500,
            style: {
              borderRadius: '14px',
              background: '#0a0a0a',
              color: '#f4efe6',
              padding: '14px 18px',
              fontSize: '14px',
              fontFamily: 'var(--font-inter)',
              border: '1px solid rgba(244,239,230,0.08)',
            },
            success: {
              iconTheme: { primary: '#c0392b', secondary: '#0a0a0a' },
            },
            error: {
              iconTheme: { primary: '#ef4444', secondary: '#0a0a0a' },
            },
          }}
        />
      </body>
    </html>
  );
}

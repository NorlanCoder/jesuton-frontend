export const SITE = {
  name: 'Jesuton SARL',
  tagline: 'Énergie solaire de confiance au Bénin',
  description:
    "Jesuton SARL conçoit, fournit et installe des solutions solaires fiables au Bénin : kits solaires, microcentrales, lampadaires, pompes solaires, audits et études techniques.",
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  phone: process.env.NEXT_PUBLIC_COMPANY_PHONE || '+229 01 95 67 56 30 / +229 01 96 75 56 61',
  email: process.env.NEXT_PUBLIC_COMPANY_EMAIL || 'Jesutonofficiel@gmail.com',
  address: process.env.NEXT_PUBLIC_COMPANY_ADDRESS || 'Abomey-Calavi, Benin',
  social: {
    facebook: 'http://facebook.com/profile.php?id=100063686014677',
    linkedin: 'https://www.linkedin.com/in/jesuton-sarl-officiel-vente-des-équipements-solaires-296b46366?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    whatsapp: 'https://wa.me/22952940044',
  },
} as const;

export const NAV_LINKS = [
  { href: '/', label: 'Accueil' },
  { href: '/a-propos', label: 'À propos' },
  { href: '/produits', label: 'Produits' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
] as const;

export const STATS = [
  { label: 'Lampadaires installés', value: 2000, suffix: '+' },
  { label: 'Pompes solaires', value: 200, suffix: '+' },
  { label: 'Microcentrales', value: 30, suffix: '+' },
  { label: 'Kits vendus', value: 2000, suffix: '+' },
  { label: 'Audits énergétiques', value: 1000, suffix: '+' },
] as const;

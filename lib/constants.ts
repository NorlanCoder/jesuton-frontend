export const SITE = {
  name: 'Jesuton SARL',
  tagline: 'Énergie solaire de confiance au Bénin',
  description:
    "Jesuton SARL dimentionne, fournit et installe des solutions solaires fiables au Bénin  et dans l'Afrique de l'Ouest : kits solaires, microcentrales, lampadaires, pompes solaires, audits et études techniques.",
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://jesuton-sarl.com',
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'https://api.jesuton-sarl.com/api',
  phones: ['+229 0196755661', '+229 0162241544'],
  email: process.env.NEXT_PUBLIC_COMPANY_EMAIL || 'contact@jesuton-sarl.com',
  address: process.env.NEXT_PUBLIC_COMPANY_ADDRESS || 'Abomey-Calavi, Benin',
  social: {
    facebook: 'http://facebook.com/profile.php?id=100063686014677',
    linkedin: 'https://www.linkedin.com/in/jesuton-sarl-officiel-vente-des-équipements-solaires-296b46366?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    whatsapp: 'https://wa.me/2290155451900',
    tiktok: 'https://www.tiktok.com/@jesuton.officiel?_t=ZM-8wgQEoBzINa&_r=1'
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
  { label: 'Kits vendus', value: 5000, suffix: '+' },
  { label: 'Audits énergétiques', value: 100, suffix: '+' },
] as const;

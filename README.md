# Jesuton — Frontend (Next.js 14)

Site vitrine public de Jesuton SARL.

## Démarrage

```bash
npm install
cp .env.example .env.local
# Adapter NEXT_PUBLIC_API_URL si besoin (par défaut http://localhost:8000/api)
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Structure

```
app/                 # App Router : pages, layouts, sitemap, robots
  page.tsx           # Accueil
  a-propos/          # Page À propos
  produits/          # Catalogue + détail [slug]
  services/          # Services
  contact/           # Contact (formulaire)
components/
  layout/            # Header, Footer
  sections/          # Hero, Stats, Solutions, Mission, CTA, AboutPreview
  products/          # ProductCard, StatusBadge, Pagination, ProductFilters
  contact/           # ContactForm
  ui/                # Logo, PageHeader
services/
  api.ts             # Client Axios (utilisé côté client)
  server-api.ts      # Fetch côté serveur (avec revalidate)
types/               # Types TypeScript partagés
lib/                 # cn(), formatNumber(), constantes
```

## Scripts

| Commande | Action |
|---|---|
| `npm run dev` | Mode développement |
| `npm run build` | Build production |
| `npm run start` | Lancer le build |
| `npm run lint` | ESLint |
| `npm run type-check` | Vérification TypeScript |

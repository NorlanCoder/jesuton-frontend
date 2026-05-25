import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        sm: '1.75rem',
        lg: '2.5rem',
        xl: '3rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px',
      },
    },
    extend: {
      colors: {
        // Identité éditoriale Jesuton
        bone: {
          DEFAULT: '#f4efe6', // ivoire chaud (fond principal)
          50: '#faf7f1',
          100: '#f4efe6',
          200: '#ebe3d2',
          300: '#dcceb1',
        },
        char: {
          DEFAULT: '#0a0a0a', // charbon profond
          900: '#111111',
          800: '#1a1a1a',
          700: '#262626',
          600: '#333333',
        },
        ember: {
          // Rouge brique du logo (accent principal)
          DEFAULT: '#c0392b',
          50: '#fdf3f1',
          100: '#fbe2dd',
          200: '#f5b8ad',
          300: '#ee8e7c',
          400: '#dd5f48',
          500: '#c0392b',
          600: '#a02d20',
          700: '#7e2419',
          800: '#621b13',
          900: '#48140e',
        },
        // Variante bleu marine du logo — décommenter pour basculer
        // ember: {
        //   DEFAULT: '#1e3a8a',
        //   50: '#eef1f9',
        //   100: '#d4dcef',
        //   200: '#a8b8df',
        //   300: '#7c94cf',
        //   400: '#4f70bf',
        //   500: '#1e3a8a',
        //   600: '#172d6c',
        //   700: '#11214f',
        //   800: '#0c1838',
        //   900: '#070e22',
        // },
        moss: {
          // Vert mousse profond (durabilité)
          DEFAULT: '#2f4a3a',
          50: '#f1f5f2',
          100: '#dee8e1',
          200: '#bcd1c2',
          300: '#8eaf99',
          400: '#5d8b6d',
          500: '#3f6c4f',
          600: '#2f4a3a',
          700: '#264035',
          800: '#1f3329',
          900: '#15241d',
        },
        clay: {
          // Terre cuite secondaire
          DEFAULT: '#a8523f',
          100: '#f4ddd5',
          500: '#a8523f',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        ultra: '-0.06em',
      },
      fontSize: {
        // Échelles éditoriales
        '7xl': ['4.75rem', { lineHeight: '0.95', letterSpacing: '-0.04em' }],
        '8xl': ['6.5rem', { lineHeight: '0.92', letterSpacing: '-0.05em' }],
        '9xl': ['9rem', { lineHeight: '0.88', letterSpacing: '-0.06em' }],
      },
      boxShadow: {
        plate: '0 30px 60px -25px rgba(10,10,10,0.35)',
        edge: '0 1px 0 0 rgba(10,10,10,0.06), 0 24px 40px -28px rgba(10,10,10,0.18)',
      },
      backgroundImage: {
        'grid-bone':
          "linear-gradient(to right, rgba(10,10,10,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(10,10,10,0.06) 1px, transparent 1px)",
        'noise': "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.07 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'reveal-up': {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'sun-spin': {
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        'reveal-up': 'reveal-up 0.9s cubic-bezier(0.22, 1, 0.36, 1) both',
        'sun-spin': 'sun-spin 60s linear infinite',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};

export default config;

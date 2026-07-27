import type { Config } from 'tailwindcss';

/**
 * Brand palette extracted from the Paradeep Parivahan logo:
 *   deep navy  #003078 / #183078   (primary)
 *   gold       #f0c030 / #f0d878   (accent)
 * Token names `ink` (→ navy) and `accent` (→ gold) are kept so components
 * built earlier recolor automatically.
 */
const config: Config = {
  darkMode: ['class', '[data-contrast="high"]'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Deep navy surfaces (brand primary)
        ink: {
          950: '#020814',
          900: '#04102a',
          800: '#071a44',
          700: '#0b2560',
          600: '#0f2f6b',
          500: '#17418f',
        },
        navy: {
          DEFAULT: '#003078',
          light: '#183078',
          deep: '#04102a',
        },
        // Gold accent (brand secondary)
        accent: {
          50: '#fef9e9',
          100: '#fdefc2',
          200: '#fbdf88',
          300: '#f7cd4d',
          400: '#f0c030', // brand gold
          500: '#e0aa14',
          600: '#bd8a0c',
          700: '#96690f',
          800: '#7c5613',
          900: '#6a4a16',
        },
        // Sky/steel — from the maritime slider imagery, used sparingly
        steel: {
          300: '#a8c0d8',
          400: '#7fb0e6',
          500: '#4f8fd6',
        },
        brand: {
          50: '#eef3fb',
          100: '#d6e2f5',
          300: '#8fb0e4',
          500: '#2f6ac4',
          600: '#17418f',
          700: '#0b2560',
          900: '#04102a',
          950: '#020814',
        },
        hc: { bg: '#000000', fg: '#ffff00', link: '#00ffff' },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Space Grotesk', 'sans-serif'],
      },
      fontSize: {
        'fluid-hero': 'clamp(2.75rem, 7.5vw, 6.5rem)',
        'fluid-h2': 'clamp(2rem, 4.5vw, 3.75rem)',
      },
      letterSpacing: { tightest: '-0.045em' },
      backgroundImage: {
        grain:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.35'/%3E%3C/svg%3E\")",
        'radial-fade': 'radial-gradient(ellipse at 30% 20%, rgba(240,192,48,0.14), transparent 55%)',
      },
      keyframes: {
        'gradient-pan': {
          '0%,100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-16px)' } },
        kenburns: { from: { transform: 'scale(1)' }, to: { transform: 'scale(1.12)' } },
      },
      animation: {
        'gradient-pan': 'gradient-pan 9s ease infinite',
        marquee: 'marquee 36s linear infinite',
        float: 'float 8s ease-in-out infinite',
        kenburns: 'kenburns 18s ease-out forwards',
      },
      boxShadow: {
        glow: '0 0 50px -14px rgba(240,192,48,0.55)',
        card: '0 24px 70px -30px rgba(2,8,20,0.9)',
      },
    },
  },
  plugins: [],
};

export default config;

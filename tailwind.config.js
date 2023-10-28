const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['src/app/**/*.{ts,tsx}', 'src/components/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    fontSize: {
      sm: '0.8rem',
      base: '1rem',
      xl: '1.25rem',
      '2xl': '1.563rem',
      '3xl': '2.74rem',
      '4xl': '2.488rem',
      '5xl': '2.986rem', //h1
    },

    extend: {
      colors: {
        'altotechdark-02': 'var(--altotechdark-02)',
        'altotechlight-02': 'var(--altotechlight-02)',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary-500))',
          foreground: 'hsl(var(--primary-500-foreground))',
          200: 'hsl(var(--primary-200))',
          '200-foreground': 'hsl(var(--primary-200-foreground))',
          400: 'hsl(var(--primary-400))',
          '400-foreground': 'hsl(var(--primary-400-foreground))',
          500: 'hsl(var(--primary-500))',
          '500-foreground': 'hsl(var(--primary-500-foreground))',
          600: 'hsl(var(--primary-600))',
          '600-foreground': 'hsl(var(--primary-600-foreground))',
          700: 'hsl(var(--primary-700))',
          '700-foreground': 'hsl(var(--primary-700-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary-500))',
          500: 'hsl(var(--secondary-500))',
          '500-foreground': 'hsl(var(--secondary-500-foreground))',
          600: 'hsl(var(--secondary-600))',
          '600-foreground': 'hsl(var(--secondary-600-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

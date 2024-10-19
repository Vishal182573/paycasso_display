import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        caveat:['Caveat','serif']
      },
      colors: {
        // Original shadcn/ui colors
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        },
        // Custom dark theme colors
        dark: {
          900: '#080810',
          800: '#0c0c1a',
          700: '#111224',
          600: '#15162e',
          500: '#191a38',
          400: '#1d1e42',
          300: '#1f203e',
        }
      },
      backgroundImage: {
        'gradient-dark': 'linear-gradient(to bottom right, #080810, #1f203e)',
        'gradient-dark-tr': 'linear-gradient(to top right, #080810, #1f203e)',
        'gradient-dark-radial': 'radial-gradient(circle at center, #1f203e, #080810)',
        'gradient-1': 'linear-gradient(180deg, #000571 0%, #003C44 100%)',
        'gradient-2': 'linear-gradient(180deg, #241919 0%, #340054 53.85%)',
        'gradient-3': 'linear-gradient(180deg, #070A4E 0%, #2082B9 100%)',
        'gradient-4': 'linear-gradient(180deg, #241919 0%, #340054 100%)',
        'gradient-5': 'linear-gradient(180deg, #000571 0%, #003C44 100%)',
        'gradient-6':'linear-gradient(215.31deg, #06154B 37.37%, #05050A 100%)',
        'gradient-7':'linear-gradient(90deg, #242F53 0%, #051240 100%)',
        'gradient-8':'linear-gradient(90deg, #34024B 0%, #150652 100%)'
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
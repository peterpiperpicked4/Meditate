import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: {
        '2xl': '1200px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
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
        // Custom semantic colors
        glow: 'hsl(var(--glow))',
        ember: 'hsl(var(--ember))',
        sage: 'hsl(var(--sage))',
        parchment: 'hsl(var(--parchment))',
        ink: 'hsl(var(--ink))',
        // Semantic state colors
        success: {
          DEFAULT: 'hsl(var(--success))',
          foreground: 'hsl(var(--success-foreground))',
        },
        warning: {
          DEFAULT: 'hsl(var(--warning))',
          foreground: 'hsl(var(--warning-foreground))',
        },
        info: {
          DEFAULT: 'hsl(var(--info))',
          foreground: 'hsl(var(--info-foreground))',
        },
        danger: {
          DEFAULT: 'hsl(var(--danger))',
          foreground: 'hsl(var(--danger-foreground))',
        },
        // Callout colors
        'callout-warning': {
          bg: 'hsl(var(--callout-warning-bg))',
          border: 'hsl(var(--callout-warning-border))',
          text: 'hsl(var(--callout-warning-text))',
          title: 'hsl(var(--callout-warning-title))',
        },
        'callout-success': {
          bg: 'hsl(var(--callout-success-bg))',
          border: 'hsl(var(--callout-success-border))',
          text: 'hsl(var(--callout-success-text))',
          title: 'hsl(var(--callout-success-title))',
        },
        'callout-danger': {
          bg: 'hsl(var(--callout-danger-bg))',
          border: 'hsl(var(--callout-danger-border))',
          text: 'hsl(var(--callout-danger-text))',
          title: 'hsl(var(--callout-danger-title))',
        },
        'callout-info': {
          bg: 'hsl(var(--callout-info-bg))',
          border: 'hsl(var(--callout-info-border))',
          text: 'hsl(var(--callout-info-text))',
          title: 'hsl(var(--callout-info-title))',
        },
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        body: ['Source Serif 4', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'monospace'],
      },
      fontSize: {
        'display-xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.03em' }],
        'display-lg': ['3.5rem', { lineHeight: '1.15', letterSpacing: '-0.025em' }],
        'display': ['2.75rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'display-sm': ['2rem', { lineHeight: '1.25', letterSpacing: '-0.015em' }],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'reveal-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.96)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.95', transform: 'scale(1.02)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'reveal-up': 'reveal-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-in': 'scale-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'pulse-subtle': 'pulse-subtle 2s ease-in-out infinite',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      boxShadow: {
        'glow': '0 0 30px hsla(var(--primary), 0.2)',
        'glow-lg': '0 0 60px hsla(var(--primary), 0.25)',
        'inner-glow': 'inset 0 0 30px hsla(var(--primary), 0.1)',
        'warm': '0 4px 20px -4px hsla(0, 0%, 0%, 0.4)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-warm': 'linear-gradient(135deg, var(--tw-gradient-stops))',
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': 'hsl(var(--foreground))',
            '--tw-prose-headings': 'hsl(var(--foreground))',
            '--tw-prose-lead': 'hsl(var(--muted-foreground))',
            '--tw-prose-links': 'hsl(var(--primary))',
            '--tw-prose-bold': 'hsl(var(--foreground))',
            '--tw-prose-counters': 'hsl(var(--muted-foreground))',
            '--tw-prose-bullets': 'hsl(var(--primary) / 0.6)',
            '--tw-prose-hr': 'hsl(var(--border))',
            '--tw-prose-quotes': 'hsl(var(--foreground))',
            '--tw-prose-quote-borders': 'hsl(var(--primary) / 0.5)',
            '--tw-prose-code': 'hsl(var(--foreground))',
            maxWidth: '65ch',
            fontFamily: 'Source Serif 4, Georgia, serif',
            h1: {
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontWeight: '600',
            },
            h2: {
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontWeight: '500',
            },
            h3: {
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontWeight: '500',
            },
            h4: {
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontWeight: '500',
            },
            a: {
              textDecoration: 'none',
              borderBottom: '1px solid hsl(var(--primary) / 0.3)',
              transition: 'border-color 0.2s',
              '&:hover': {
                borderColor: 'hsl(var(--primary))',
              },
            },
            blockquote: {
              fontStyle: 'italic',
              borderLeftWidth: '2px',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config

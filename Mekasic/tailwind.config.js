/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#06000f',
          900: '#0a0018',
          800: '#0f002a',
          700: '#180040',
        },
        purple: {
          950: '#1a0040',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'neon-purple': '0 0 8px rgba(147,51,234,0.5), 0 0 20px rgba(147,51,234,0.25)',
        'neon-cyan':   '0 0 8px rgba(6,182,212,0.5),  0 0 20px rgba(6,182,212,0.25)',
        'neon-green':  '0 0 8px rgba(34,197,94,0.5),  0 0 20px rgba(34,197,94,0.25)',
        'neon-pink':   '0 0 8px rgba(236,72,153,0.5), 0 0 20px rgba(236,72,153,0.25)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'neon-pulse': 'neon-pulse 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        'neon-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
      },
    },
  },
  plugins: [],
};

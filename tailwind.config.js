/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        moyee: {
          // Remapped from hot-pink to realistic architectural Roasted Copper & Warm Amber
          pink: '#C86D2D',
          'pink-hover': '#A8571E',
          'pink-dark': '#783B12',
          'pink-light': '#FEF3C7',
          'pink-subtle': '#FDE68A',
          yellow: '#EAB308',
          'yellow-hover': '#CA8A04',
          cream: '#EEECE1',
          charcoal: '#16181D',
          dark: '#0D0F13',
          black: '#090A0D',
          green: '#15803D',
          'green-light': '#DCFCE7'
        }
      },
      fontFamily: {
        oswald: ['Oswald', 'sans-serif'],
        condensed: ['"Roboto Condensed"', 'sans-serif'],
        sans: ['"Roboto Condensed"', 'system-ui', 'sans-serif']
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.85', filter: 'drop-shadow(0 0 15px rgba(217,119,6,0.6))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 28px rgba(234,179,8,0.9))' }
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' }
        }
      },
      animation: {
        'pulse-glow': 'pulseGlow 2.5s infinite ease-in-out',
        'float-slow': 'floatSlow 3s infinite ease-in-out'
      }
    },
  },
  plugins: [],
}

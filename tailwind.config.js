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
          pink: '#E5007D',
          'pink-hover': '#C7006D',
          'pink-dark': '#840048',
          'pink-light': '#FCE4F3',
          'pink-subtle': '#F9C6E8',
          yellow: '#FFD900',
          'yellow-hover': '#E6C400',
          cream: '#EEECE1',
          charcoal: '#272727',
          dark: '#111827',
          black: '#1A1A1A',
          green: '#2E7D32',
          'green-light': '#E8F5E9'
        }
      },
      fontFamily: {
        oswald: ['Oswald', 'sans-serif'],
        condensed: ['"Roboto Condensed"', 'sans-serif'],
        sans: ['"Roboto Condensed"', 'system-ui', 'sans-serif']
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.8', filter: 'drop-shadow(0 0 15px rgba(229,0,125,0.7))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 30px rgba(229,0,125,1))' }
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

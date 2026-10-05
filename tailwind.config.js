/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        payote: {
          black: '#080605',
          obsidian: '#0E0B09',
          espresso: '#1A120E',
          brown: '#2A1A13',
          card: '#16110D',
          surface: '#1F1813',
          border: 'rgba(200, 209, 218, 0.12)',
          borderGold: 'rgba(201, 168, 76, 0.3)',
          gold: {
            DEFAULT: '#C9A84C',
            light: '#E2C775',
            dark: '#9E7E2C',
            glow: 'rgba(201, 168, 76, 0.25)',
          },
          cream: '#F7F4EF',
          sand: '#EEE8DE',
          sandMuted: '#D8CEBF',
          slate: '#8394A6',
          lightSlate: '#C8D1DA',
          emerald: '#10B981',
          amber: '#F59E0B',
          rose: '#EF4444'
        }
      },
      fontFamily: {
        serif: ['"Cinzel"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Space Mono"', 'monospace'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #E2C775 0%, #C9A84C 50%, #9E7E2C 100%)',
        'gold-shimmer': 'linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)',
        'dark-gradient': 'radial-gradient(ellipse at top, #1F1712 0%, #0A0705 70%)',
        'card-gradient': 'linear-gradient(180deg, rgba(31, 24, 19, 0.8) 0%, rgba(14, 11, 9, 0.95) 100%)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-pulse': 'glowPulse 4s ease-in-out infinite',
        'ticker': 'ticker 35s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        glowPulse: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        ticker: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}

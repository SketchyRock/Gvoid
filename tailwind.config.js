/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep, muted grays for the dark mode background
        zen: {
          900: '#121212', // Main background - slightly off-black
          800: '#1A1A1A', // Secondary background (cards, panels)
          700: '#2A2A2A', // Borders, subtle hover states
          300: '#A3A3A3', // Muted text for secondary info
          100: '#F5F5F5', // Primary reading text
        },
        // Soft ambers for accents, focus actions, and active timers
        amber: {
          soft: '#F59E0B', // Primary accent
          glow: '#D97706', // Hover accent
          muted: '#78350F' // Background for active states
        }
      },
      fontFamily: {
        // Clean, readable sans-serif
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark grays for the dark mode background
        gray: {
          900: '#0f172a', // Main background - slate 900
          800: '#1e293b', // Secondary background - slate 800
          700: '#334155', // Borders, subtle hover states - slate 700
          300: '#cbd5e1', // Muted text for secondary info - slate 300
          100: '#f1f5f9', // Primary reading text - slate 100
        },
        // Blues for accents, focus actions, and active timers
        blue: {
          soft: '#3b82f6', // Primary accent - blue 500
          glow: '#2563eb', // Hover accent - blue 600
          muted: '#1e3a8a' // Background for active states - blue 900
        },
        // Purples for the new Gvoid theme
        purple: {
          soft: '#a855f7', // purple 500
          glow: '#9333ea', // purple 600
          muted: '#581c87' // purple 900
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

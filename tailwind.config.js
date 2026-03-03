/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Mapped to CSS variables for dynamic theming
        gray: {
          900: 'var(--color-gray-900)',
          800: 'var(--color-gray-800)',
          700: 'var(--color-gray-700)',
          400: 'var(--color-gray-400)',
          300: 'var(--color-gray-300)',
          100: 'var(--color-gray-100)',
        },
        // Mapped to CSS variables for dynamic theming
        blue: {
          soft: 'var(--color-blue-soft)',
          glow: 'var(--color-blue-glow)',
          muted: 'var(--color-blue-muted)'
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

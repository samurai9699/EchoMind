/** @type {import('tailwindcss').Config} */
import { theme } from './src/styles/theme';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: theme.colors,
      fontFamily: {
        sans: theme.fonts.sans,
        rounded: theme.fonts.rounded,
      },
      boxShadow: theme.shadows,
      borderRadius: theme.borderRadius,
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      keyframes: {
        breatheIn: {
          '0%': { transform: 'scale(1)', opacity: 0.7 },
          '100%': { transform: 'scale(1.5)', opacity: 1 },
        },
        breatheOut: {
          '0%': { transform: 'scale(1.5)', opacity: 1 },
          '100%': { transform: 'scale(1)', opacity: 0.7 },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        pulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
      },
      animation: {
        'breathe-in': 'breatheIn 4s ease-in-out forwards',
        'breathe-out': 'breatheOut 6s ease-in-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.7s ease-out forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
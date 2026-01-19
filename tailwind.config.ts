import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FFF8F0',
        'light-green': '#E8F3E8',
        'sage-green': '#A8B8A8',
        'natural-gold': '#D4AF8C',
      },
      fontFamily: {
        'serif': ['Georgia', 'serif'],
        'sans': ['Segoe UI', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-in',
        'slide-up': 'slideUp 0.6s ease-out',
        'bounce-slow': 'bounce 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      boxShadow: {
        'soft': '0 4px 15px rgba(0, 0, 0, 0.08)',
        'medium': '0 8px 25px rgba(0, 0, 0, 0.1)',
        'lg-soft': '0 12px 35px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [],
} satisfies Config

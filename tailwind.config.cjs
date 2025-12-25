/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0891B2', // Ocean Blue
          dark: '#0E7490',
        },
        secondary: {
          DEFAULT: '#F97316', // Sunset Orange
          dark: '#EA580C',
        },
        success: '#10B981',
        warning: '#F97316', // Mapped to Secondary/Orange for consistency
        error: '#EF4444',
        // gray: keep Tailwind defaults
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        card:
          '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        'card-hover':
          '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025)',
      },
    },
  },
  plugins: [],
};

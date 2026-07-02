/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#09090B',
          surface: '#111113',
          panel: '#18181B',
          soft: '#27272A'
        },
        primary: '#7C3AED',
        secondary: '#06B6D4',
        accent: '#A855F7',
        accent2: '#22D3EE'
      },
      boxShadow: {
        glow: '0 25px 50px -20px rgba(124, 58, 237, 0.45)',
        soft: '0 20px 45px -20px rgba(15, 23, 42, 0.35)'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      }
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        graphite: '#1A1A1A',
        warmGray: '#5E6B6B',
        milk: '#FFFFFF',
        terracotta: '#CFAE63',
        deepNavy: '#0F2A2A',
        deepNavyHover: '#1F3D3D',
        fog: '#F5F7F7',
      },
      fontFamily: {
        heading: ['Manrope', 'Montserrat', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        card: '0 18px 45px rgba(15, 42, 42, 0.08)',
        soft: '0 8px 25px rgba(15, 42, 42, 0.12)',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, rgba(15, 42, 42, 0.93), rgba(31, 61, 61, 0.72))',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(22px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 700ms ease-out both',
        'float-slow': 'float-slow 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

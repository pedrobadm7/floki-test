/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#F7F8FA',
        secondary: '#F0F0F0',
        text: '#333333',
        text_body: '#8C91A2',
        background: '#FFFFFF',
        border: '#E0E0E0',
        accent: '#888888',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      spacing: {
        'card-padding': '1.5rem',
      },
      borderRadius: {
        card: '0.75rem',
      },
    },
  },
  plugins: [],
};

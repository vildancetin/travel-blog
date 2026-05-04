import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{ts,tsx,js,jsx}',
    './pages/**/*.{ts,tsx,js,jsx}',
    './components/**/*.{ts,tsx,js,jsx}',
    './src/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        custom: {
          lightBlue: '#C5DDFF',
          cream: '#F9F1E2',
          olive: '#5F6D3B',
          paleGreen: '#E9F9B2',
          darkBrown: '#322115',
          blue: '#2766DA',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', ...defaultTheme.fontFamily.sans],
        mono: ['var(--font-geist-mono)', ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
import { nextui } from '@nextui-org/react';
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'],
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
}


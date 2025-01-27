/** @type {import('tailwindcss').Config} */
import { nextui } from '@nextui-org/react';
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'],
      },
      screens: {
        'xs': '480px',  // Breakpoint específico
        'sm': '640px',  // Valor predeterminado de Tailwind
        'md': '768px',  // Valor predeterminado de Tailwind
        'lg': '1024px', // Valor predeterminado de Tailwind
        'xl': '1280px', // Valor predeterminado de Tailwind
        '2xl': '1536px', // Valor predeterminado de Tailwind
        'custom': '900px', // Tu breakpoint específico
        'tablet': '768px', // Alias para un valor existente
        'desktop': '1200px', // Otro breakpoint
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
}


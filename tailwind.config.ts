import type { Config } from 'tailwindcss'

export default {
  content: [],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        textPrimary: "#495057"
      }
    },
  },
  plugins: [],
} satisfies Config


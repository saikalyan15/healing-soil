import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        green: {
          primary: '#1E5631',
          dark: '#1A2E1A',
        },
        gold: {
          DEFAULT: '#C9A84C',
          dark: '#A07830',
        },
        cream: {
          DEFAULT: '#F7F5F0',
          card: '#FFFFFF',
        },
        soil: {
          DEFAULT: '#8B6347',
        },
        text: {
          dark: '#1A1A14',
          muted: '#666666',
        },
        border: {
          DEFAULT: '#D6CFC4',
        },
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-dm-sans)', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config

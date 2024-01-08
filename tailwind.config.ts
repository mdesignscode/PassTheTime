import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'dark': '#161415',
        'light': "#fefefe",
        'primary': '#f8e6cb',
        'secondary': '#dccaa8',
        'accent-primary': '#e984a2',
        'accent-secondary': '#b9cc95',
      }
    }
  }
}
export default config

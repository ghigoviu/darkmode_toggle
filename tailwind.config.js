/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', 
  content: [ "./index.html", "./src/**/*.{js,ts,jsx,tsx}", ],
  safelist: [
    'bg-gray-100', 'dark:bg-gray-900', 'bg-gray-200', 'dark:bg-gray-800',
    'bg-blue-500', 'dark:bg-blue-700',
    'text-gray-900', 'dark:text-gray-100', 'text-gray-700', 'dark:text-gray-300',
    'text-blue-600', 'dark:text-blue-300'
  ],
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

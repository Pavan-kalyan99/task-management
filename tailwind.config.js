/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  // // darkMode: ['selector', '[data-mode="dark"]'],
  // // darkMode: ['variant', '&:not(.light *)'],
  // darkMode: ['variant', [
  //   '@media (prefers-color-scheme: dark) { &:not(.light *) }',
  //   '&:is(.dark *)',
  // ]],
  darkMode: 'class', // or 'media'



};

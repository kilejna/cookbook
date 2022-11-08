/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        'lblue': '#d7eefa',
        'bblue': '#276b8c',
        'dbgrey': '#657075',
        'lbgrey': '#a0b1ba',
        'onyx': '#32383b',
        'kilojoules': '#8051fc',
        'calories': '#8051fc',
        'protein': '#fc5176',
        'tfat': '#fc8151',
        'sfat': '#fcd651',
        'carbs': '#cdfc51',
        'sugar': '#51fcd7',
        'fibre': '#51ccfc',
        'sodium': '#5177fc',
      },
      fontFamily: {
        'yellowtail': 'Yellowtail, cursive',
        'freestyle': 'Freestyle Script, cursive',
        'redhat': 'Red Hat Display, sans-serif',
        'noto': 'Noto Sans, sans-serif',
      },
    },
  },
  variants: {
    extend: {
      visibility: ["group-hover"],
    },
  },
  plugins: [],
}

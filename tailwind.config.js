/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily : {
        baskervville : ['Baskervville', 'serif'],
        raleway : ['Raleway', 'sans-serif'],
        montserrat : ['Montserrat', 'sans-serif'],
      }
    },
  },
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["[data-theme=light]"],
          "primary": "white",
          "primary-focus": "#C14C00",
          "accent" : "#001A72"
        },
      },
    ],
  },

  
  plugins: [require("daisyui")],
}


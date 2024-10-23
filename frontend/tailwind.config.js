/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  mode: "jit",
  theme: {
    extend: {
      backgroundImage: {
        'custom-testimonial-gradient': 'linear-gradient(60deg, rgb(101, 84, 192), rgb(249, 156, 219))',
        'custom-overall-gradient': 'linear-gradient(0deg, rgb(255, 255, 255), rgb(230, 252, 255), rgb(255, 255, 255))'
      },
      colors: {
        primary: "#050816",
        secondary: "#aaa6c3",
        tertiary: "#151030",
        darkBlue: "#172b4d",
        lightBlue: "#2059f8",
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
      screens: {
        xs: "450px",
        sm: "765px",
        md: "1023px",
      },
    },
  },
  plugins: [],
};
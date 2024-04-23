import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      classic: ['"Beausite Classic"', "sans-serif"],
      slick: ['"Beausite Slick"', "serif"],
    },
    extend: {
      backgroundImage: {
        hero: "url('../public/imagery/6.png')",
      },
      colors: {
        navy: "#011936",
        teal: "#50BACC",
        rock: {
          100: "#F9F5F2",
          200: "#ECECE8",
          300: "#ADAFAD",
          400: "#949694",
          500: "#656558",
        },
      },
    },
  },
  plugins: [],
};
export default config;

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
      gothic: ['"Century Gothic"', "sans-serif"],
    },
    extend: {
      backgroundImage: {
        hero: "url('../public/images/index/hero.webp')",
        events: "url('../public/images/events.webp')",
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
      animation: {
        "text-slide-4":
          "text-slide-4 10s cubic-bezier(0.83, 0, 0.17, 1) infinite",
      },
      keyframes: {
        "text-slide-4": {
          "0%, 20%": {
            transform: "translateY(0%)",
          },
          "25%, 45%": {
            transform: "translateY(-20%)",
          },
          "50%, 70%": {
            transform: "translateY(-40%)",
          },
          "75%, 95%": {
            transform: "translateY(-60%)",
          },
          "100%": {
            transform: "translateY(-80%)",
          },
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [],
  },
};
export default config;

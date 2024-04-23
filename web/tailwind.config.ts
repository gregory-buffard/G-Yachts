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
    animation: {
      'text-slide': 'text-slide 12.5s cubic-bezier(0.83, 0, 0.17, 1) infinite',
    },
    keyframes: {
      'text-slide': {
        '0%, 16%': {
          transform: 'translateY(0%)',
        },
        '20%, 36%': {
          transform: 'translateY(-16.66%)',
        },
        '40%, 56%': {
          transform: 'translateY(-33.33%)',
        },
        '60%, 76%': {
          transform: 'translateY(-50%)',
        },
        '80%, 96%': {
          transform: 'translateY(-66.66%)',
        },
        '100%': {
          transform: 'translateY(-83.33%)',
        },
      },
    },
    backgroundImage: {
      "hero-bg-image": "url('../public/imagery/6.png')",
    },
    extend: {
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

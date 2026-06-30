import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#1B3A6B",
          gold: "#D4AF37",
          ink: "#12213A",
          sky: "#EAF2FF"
        }
      },
      boxShadow: {
        soft: "0 18px 60px rgba(18, 33, 58, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;

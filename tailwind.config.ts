import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef9ff",
          100: "#d9f0ff",
          200: "#bce5ff",
          300: "#8ed5ff",
          400: "#59bbff",
          500: "#329bff",
          600: "#1b7cf5",
          700: "#1463e1",
          800: "#1751b6",
          900: "#19478f",
        },
        fresh: {
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;

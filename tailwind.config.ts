// tailwind.config.js
import { heroui } from "@heroui/react";
import { Config } from "tailwindcss/types/config";

/** @type {import('tailwindcss').Config} */
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        dark: {
          colors: {
            primary: {
              DEFAULT: "#23B39D",
            },
          },
        },
        light: {
          colors: {
            primary: {
              DEFAULT: "#23B39D",
            },
          },
        },
      },
    }),
  ],
};

export default config;

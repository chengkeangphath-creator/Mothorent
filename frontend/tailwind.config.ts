import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Farnegar palette specified by User
        navy: {
          DEFAULT: "#142A44",       // Deep Midnight Navy
          dark: "#081426",          // Obsidian Night Navy
          light: "#1E3B60",         // Mid Slate Blue
          surface: "#244670",       // Navy Surface
        },
        ice: {
          DEFAULT: "#DCEAF7",       // Soft Ice Blue
          light: "#F0F6FC",         // Ice Tint
          dark: "#B9D5EE",          // Border Ice
        },
        accent: {
          DEFAULT: "#4A74A7",       // Royal / Slate Blue Accent
          hover: "#3A608F",
          light: "#6A95CA",
          dark: "#2F4E75",
        },
        brand: {
          blue: "#4A74A7",
          "blue-hover": "#3A608F",
          "blue-light": "#DCEAF7",
          navy: "#142A44",
          dark: "#081426",
          ice: "#DCEAF7",
        },
        // Transform the entire orange palette site-wide into the Farnegar palette
        orange: {
          50: "#F0F6FC",
          100: "#DCEAF7",           // Ice Blue badges & pills
          200: "#B9D5EE",
          300: "#8EB7DF",
          400: "#6A95CA",
          500: "#4A74A7",           // Primary interactive buttons
          600: "#3A608F",           // Hover state
          700: "#2C4B72",
          800: "#1E3756",
          900: "#142A44",           // Deep Midnight Navy
          950: "#081426",           // Obsidian Night Navy
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;

import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        /* Argon Colors */
        primary: {
          DEFAULT: "#5e72e4",
          50: "#eaecfb",
          100: "#c8cdf4",
          200: "#a5aded",
          300: "#838ce6",
          400: "#616cdf",
          500: "#5e72e4",
          600: "#2a41dc",
          700: "#1e32b3",
          800: "#162484",
          900: "#0e1655",
          950: "#080c2b",
        },
        secondary: {
          DEFAULT: "#8392ab",
          foreground: "#525f7f",
        },
        info: {
          DEFAULT: "#11cdef",
          light: "#1171ef",
        },
        success: {
          DEFAULT: "#2dce89",
          light: "#2dce89",
        },
        warning: {
          DEFAULT: "#fb6340",
          light: "#fbb140",
        },
        danger: {
          DEFAULT: "#f5365c",
          light: "#f56036",
        },
        gray: {
          100: "#f6f9fc",
          200: "#e9ecef",
          300: "#dee2e6",
          400: "#ced4da",
          500: "#adb5bd",
          600: "#8898aa",
          700: "#525f7f",
          800: "#32325d",
          900: "#212529",
        },
        /* Other Theme Colors */
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        card: "0 0 2rem 0 rgba(136, 152, 170, 0.15)",
        dropdown: "0 0 2rem 0 rgba(136, 152, 170, 0.15)",
        table: "0 0 2rem 0 rgba(136, 152, 170, 0.15)",
      },
      fontFamily: {
        sans: ["Open Sans", "sans-serif"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        fadeIn: "fadeIn 0.5s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

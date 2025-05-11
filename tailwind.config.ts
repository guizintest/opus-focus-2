import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
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
        "aoe-dark-blue": "#0a1929",
        "aoe-panel": "#162c45",
        "aoe-panel-header": "#1e3851",
        "aoe-border": "#3a4b5c",
        "aoe-gold": "#d4b374",
        "aoe-light": "#e5e7eb",
        "aoe-muted": "#9ca3af",
        "aoe-button": "#234059",
        "aoe-button-hover": "#2c4e6c",
        "aoe-secondary": "#1e293b",
        "aoe-secondary-hover": "#2c3a50",
        "aoe-map-bg": "#0c1826",
      },
      backgroundImage: {
        "aoe-pattern": "url('/images/bg-pattern.png')",
      },
      fontFamily: {
        cinzel: ["Cinzel", "serif"],
      },
      animation: {
        "pulse-slow": "pulse 3s infinite",
        "pulse-very-slow": "pulse 5s infinite",
        float: "float 3s infinite ease-in-out",
        flow: "flow 15s linear infinite",
        fog: "fog 20s linear infinite",
        "attack-pulse": "attackPulse 0.8s linear infinite",
        ripple: "ripple 0.6s linear forwards",
      },
      keyframes: {
        flow: {
          "0%": { strokeDashoffset: "200" },
          "100%": { strokeDashoffset: "0" },
        },
        fog: {
          "0%": { filter: "url(#fogFilter) blur(3px)" },
          "50%": { filter: "url(#fogFilter) blur(5px)" },
          "100%": { filter: "url(#fogFilter) blur(3px)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        attackPulse: {
          "0%": { strokeOpacity: "0.8", strokeWidth: "2" },
          "50%": { strokeOpacity: "0.4", strokeWidth: "3" },
          "100%": { strokeOpacity: "0.8", strokeWidth: "2" },
        },
        ripple: {
          "0%": { transform: "scale(0)", opacity: "1" },
          "100%": { transform: "scale(4)", opacity: "0" },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config

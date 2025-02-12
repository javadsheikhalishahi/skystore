import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundClip: {
        text: "text",
      },
      backgroundImage: { "custom-image": "url('/background-image.png')" },
      colors: {
        brand: {
          "100": "#EA6365",
          DEFAULT: "#FA7275",
        },
        red: "#FF7474",
        red2: "#ff2828",
        error: "#b80000",
        green: "#3DD9B3",
        blue: "#56B8FF",
        pink: "#EEA8FD",
        orange: "#F9AB72",
        light: {
          "100": "#333F4E",
          "200": "#A3B2C7",
          "300": "#F2F5F9",
          "400": "#F2F4F8",
        },
        dark: {
          "100": "#04050C",
          "200": "#131524",
          "300": "#0f1228",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      fontFamily: {
        poppins: ["var(--font-poppins)"],
      },
      boxShadow: {
        "drop-1": "0px 10px 30px 0px rgba(66, 71, 97, 0.1)",
        "drop-2": "0 8px 30px 0 rgba(65, 89, 214, 0.4)",
        "drop-3": "0 8px 30px 0 rgba(65, 89, 214, 0.1)",
        "drop-4": "0 8px 30px 0 rgba(214, 65, 65, 0.4)",
        "drop-5": "0 8px 30px 0 rgba(65, 89, 214, 0.35)",
        "drop-6": "0 5px 30px 0 rgba(65, 89, 214, 0.6)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "caret-blink": {
          "0%,70%,100%": {
            opacity: "1",
          },
          "20%,50%": {
            opacity: "0",
          },
        },
        "ring-glow": {
          "0%": { boxShadow: "1 1 5px 1px #ff0000" },
          "25%": { boxShadow: "1 1 5px 1px #00ff00" },
          "50%": { boxShadow: "1 1 5px 1px #0000ff" },
          "75%": { boxShadow: "1 1 5px 1px #00ff00" },
          "100%": { boxShadow: "1 1 5px 1px #ff0000" },
        },
        "slide-in": {
          '0%': { opacity: '0', transform: 'translateY(-10px) scale(0.95)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
      },
      animation: {
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "ring-glow": "ring-glow 5s infinite linear",
        "slide-in": "slide-in 1s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;

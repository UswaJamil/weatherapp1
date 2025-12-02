/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0b0b13",
        "text-primary": "#ffffff",
        "text-secondary": "#b0b3c0",
        accent: "#7ba4ff",
        "input-bg": "#1e1e29",
        "card-bg": "#3b3b54",
        "card-border": "#1e1e29",
      },
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
      },
      keyframes: {
        spin: { to: { transform: "rotate(360deg)" } },
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(-6px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        spin: "spin 0.8s linear infinite",
        fadeIn: "fadeIn 160ms ease-out forwards",
      },
    },
  },
  plugins: [],
};

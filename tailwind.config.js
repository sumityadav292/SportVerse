/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        studio: "#05060A",
        live: "#00FF87",
        crimson: "#FF2D55",
        cyan: "#22D3EE",
        violet: "#8B5CF6",
      },
      fontFamily: {
        display: ["Sora", "Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px rgba(0, 255, 135, 0.18)",
        crimson: "0 0 28px rgba(255, 45, 85, 0.22)",
      },
      backgroundImage: {
        "studio-grid":
          "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};

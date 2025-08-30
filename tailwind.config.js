// tailwind.config.js
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // ensures dark mode works properly
  theme: {
    extend: {
      fontFamily: {
        khmer: ["Nokora", "sans-serif"],
      },
    },
  },
  safelist: [
    "bg-black",
    "bg-white",
    "dark:bg-black",
    "dark:bg-white",
    "from-black/60",
    "from-black/40",
  ],
  plugins: [],
};

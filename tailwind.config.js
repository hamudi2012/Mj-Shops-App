/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Kita hubungkan class Tailwind dengan variabel CSS
        primary: "var(--color-primary)",
        header: {
          bg: "var(--bg-header)",
          text: "var(--header-fg)",
        },
        surface: "var(--bg-main)",
      },
    },
  },
  plugins: [],
};

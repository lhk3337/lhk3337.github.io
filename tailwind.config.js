/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/pages/**/*.{js,jsx,ts,tsx}", "./src/components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        navShadow: "rgb(0 0 0 / 8%) 0px 0px 8px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("tailwind-scrollbar-hide")],
};

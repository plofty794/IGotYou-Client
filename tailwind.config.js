/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      backgroundImage: {
        "hero-image":
          "url(https://img.freepik.com/free-photo/top-view-cinema-elements-yellow-background-with-copy-space_23-2148457818.jpg?w=900&t=st=1698988846~exp=1698989446~hmac=85784c3ed07f6acc175b1f57bb454ffa49dfa314d382e1b9254952ac3f2fb5e5)",
      },
      fontFamily: {
        pacifico: "'Pacifico', cursive",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar")({ nocompatible: true }),
    require("tailwindcss-animate"),
    {
      plugins: ["prettier-plugin-tailwindcss"],
    },
  ],
};

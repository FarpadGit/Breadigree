/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontSize: {
        heading: "54px",
        "heading-sm": "44px",
      },
      fontFamily: {
        bakerhouse: "var(--font-bakerhouse)",
        "bakerhouse-full": "var(--font-bakerhouse-full)",
        grenda: "var(--font-grenda)",
      },
      colors: {
        background: "var(--color-background)",
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        "foreground-light": "var(--color-foreground-light)",
        "foreground-accent": "var(--color-foreground-accent)",
      },
      animation: {
        "zoom-in": "var(--animate-zoom-in)",
      },
    },
  },
};

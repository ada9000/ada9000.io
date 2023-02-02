/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{svelte,js,ts}"],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#38d4ff",
          secondary: "#ff94f8",
          accent: "#EEAF3A",
          neutral: "#fedf6c",
          "base-100": "#1a202c",
          "base-content": "#ffffee",
          info: "#38d4ff",
          success: "#36D399",
          warning: "#fedf6c",
          error: "#F87272",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};


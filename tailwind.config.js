/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        "primary-1": "#ead9fc",
        "secondary-1": "#d6afff",
        "primary-2": "#f6effd",
        "secondary-2": "#982f8c",
        "primary-3": "#0fa3f2",
        error: "#dc2626",
      },
    },
  },
  plugins: [],
};

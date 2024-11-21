export default {
  plugins: {
    tailwindcss: {
      content: [
        "./index.html",
        "./src/**/**/*.{js,jsx,ts,tsx}",
      ],
    },
    autoprefixer: {},
  },
}

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        gridMain: '2fr 1fr'
      },
      height: {
        my: '3px'
      },
      width: {
        xxl: '320px'
      },
      screens: {
        'xxl': '1720px'
      }
    },
  },
  plugins: [],
}
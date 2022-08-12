module.exports = {
  mode: 'jit',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        'feed-lg': '777px',
      }
    },
    screens: {

      'mobile': '320px',

      'tablet': '640px',

      'desktop': '1280px',

    },
  },
  plugins: [],
}

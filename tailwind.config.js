module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#FFF9F2',
          dark: '#1F2937',
          amber: '#F59E0B',
          slate: '#94A3B8'
        }
      }
    }
  },
  plugins: []
}

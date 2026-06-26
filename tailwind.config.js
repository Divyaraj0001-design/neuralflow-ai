export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['JetBrains Mono', 'monospace'],
        body: ['Inter', 'sans-serif'],
      },
      colors: {
        bg:      '#172B36',
        surface: '#114C5A',
        mint:    '#D9E8E2',
        powder:  '#F1F6F4',
        accent:  '#FFC801',
        saffron: '#FF9932',
      },
    },
  },
  plugins: [],
}

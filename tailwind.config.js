module.exports = {
  purge: { content: ['./public/**/*.html', './src/**/*.vue'] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    container: {
      center: true,
      padding: '1.7rem',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

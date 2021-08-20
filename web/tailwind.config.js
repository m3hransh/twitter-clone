module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    boxShadow: {
      '2': '0 0 15px 0 rgba(101, 119, 134, 0.2), 0 0 3px 1px rgba(101, 119, 134, 0.15)'
    },
    extend: {
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        main: 'var(--main)',
        background: 'var(--background)',
        header: 'var(--header)',
        accent: 'var(--accent)',
      },
      gridTemplateColumns: {
        layout: 'minmax(12rem,0.5fr) 1.5fr 0.8fr',
        layoutmd: '1fr minmax(16rem, .5fr)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

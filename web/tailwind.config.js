module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
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

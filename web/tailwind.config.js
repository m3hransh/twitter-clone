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
        layout: '0.7fr 1.3fr 0.9fr',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

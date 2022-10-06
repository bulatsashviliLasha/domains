module.exports = {
  content: ['./*.html', './js/**/*.{html,js}'],
  theme: {
    fontFamily: {
      'TKT-Regular': ['TKT-Regular','ui-sans-serif', 'system-ui',],
      'TKT-Medium': ['TKT-Medium','ui-sans-serif', 'system-ui',],
      'TKT-Bold': ['TKT-Bold','ui-sans-serif', 'system-ui',],
    },
    screens: {
      '2xl': {'max': '1999px'},
      // => @media (max-width: 1535px) { ... }

      'xl': {'max': '1329px'},

      'lg': {'max': '1023px'},
      // => @media (max-width: 1023px) { ... }

      'md': {'max': '767px'},
      // => @media (max-width: 767px) { ... }

      'sm': {'max': '639px'},
      // => @media (max-width: 639px) { ... }
      '2sm': {'max': '400px'},
      // => @media (max-width: 639px) { ... }
    },
    extend: {
    },
  },
  plugins: [],
}

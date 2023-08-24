const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './public/*.html',
    './app/helpers/**/*.rb',
    './app/javascript/**/*.js',
    './app/views/**/*.{erb,haml,html,slim}'
  ],
  theme: {
    extend: {
      fontFamily: {
        title: ['Poppins', 'sans-serif'],
        body: ['sans-serif'],
      },
    },
    colors: {
      backgroundcolor: "#FAF9F7",
      black: "#212529",
    },
    screens: {
      '2xsm': '410px',
      xsm: '530px',
      sm: '640px',
      md: '768px',
      lg: '1025px',
      lgxl: '1210px',
      xl: '1280px',
      '2xl': '1436px',
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/container-queries'),
  ]
}

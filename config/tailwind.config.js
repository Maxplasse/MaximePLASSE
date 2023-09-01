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
        Poppins: ['Poppins', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        title2: ['Space', 'Grotesk'],
        title: ['Inter'],
        body: ['sans-serif'],
      },
      zIndex: {
        '100': '100',
      }
    },
    colors: {
      backgroundcolor: "#FAF9F7",
      test: "#008000",
      black: "#212529",
      green: "#808F85",
      rosy: "#CC978E",
      magenta: "#912F56",
      purple: "#521945",
      indogo: "#0C4767",
    },
    screens: {
      '4xsm': '375px',
      '3xsm': '390px',
      '2xsm': '414px',
      xsm: '530px',
      sm: '640px',
      md: '768px',
      xmd: '920px',
      lg: '1025px',
      lgxl: '1210px',
      xl: '1280px',
      '2xl': '1436px',
      '3xl': '1920px',
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/container-queries'),
  ]
}

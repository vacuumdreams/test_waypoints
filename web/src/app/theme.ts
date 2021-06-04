import { mergeDeepRight } from 'ramda'

const light = {
  fonts:  {
    primary: {
      family: 'Baloo Tammudu 2, cursive',
      size: {
        regular: 400,
      },
    },
    title: {
      family: 'Limelight, cursive',
      size: {
        regular: 400,
      },
    },
  },
  colors: {
    text: {
      main: '#252525',
    },
    primary: {
      main: '#027F99',
    },
  },
}

export const theme = {
  light,
  dark: mergeDeepRight(light, {
    colors: {
      text: {
        main: '#F8F8F8',
      },
    },
  }),
}

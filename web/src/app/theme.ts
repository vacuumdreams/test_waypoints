import { mergeDeepRight } from 'ramda'

const base = {
  radius: 4,
  fonts:  {
    size: 14,
    primary: {
      family: 'Baloo Tammudu 2, cursive',
      weight: {
        regular: 400,
      },
    },
    title: {
      family: 'Limelight, cursive',
      weight: {
        regular: 400,
      },
    },
  },
  colors: {
    text: {
      main: '#252525',
    },
    background: {
      main: '#FFFFFF',
    },
    primary: {
      main: '#027F99',
      weak: '#B9D9DF',
      strong: '#1C4F59',
    },
  },
}

export const theme = {
  light: base,
  dark: mergeDeepRight(base, {
    colors: {
      text: {
        main: '#F8F8F8',
      },
      background: {
        main: '#121212',
      },
    },
  }) as typeof base,
}

type ThemCollection = typeof theme;
export type Theme = typeof base;
export type ThemeMode = keyof ThemCollection;

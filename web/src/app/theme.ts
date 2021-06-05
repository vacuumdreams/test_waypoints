import { mergeDeepRight } from 'ramda'

const base = {
  mode: 'light',
  radius: 0,
  transition: 0.2,
  fonts:  {
    size: 14,
    primary: {
      family: "'Nanum Gothic', sans-serif",
      weight: {
        regular: 400,
        bold: 700,
        extrabold: 800,
      },
    },
    script: {
      family: "'Dancing Script', cursive",
      weight: {
        regular: 400,
      },
    },
    title: {
      family: "'Limelight', cursive",
      weight: {
        regular: 400,
      },
    },
  },
  colors: {
    text: {
      main: '#252525',
      weak: '#686868',
    },
    background: {
      main: '#FFFFFF',
      contrast: '#121212',
    },
    neutral: {
      main: '#686868',
      weak: '#e2e2e2',
      strong: '#424242',
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
    mode: 'dark',
    colors: {
      text: {
        main: '#F8F8F8',
      },
      background: {
        main: '#121212',
        contrast: '#FFFFFF',
      },
      neutral: {
        weak: '#424242',
        strong: '#e2e2e2',
      },
      primary: {
        weak: '#1C4F59',
        strong: '#B9D9DF',
      },
    },
  }) as typeof base,
}

type ThemCollection = typeof theme;
export type Theme = typeof base;
export type ThemeMode = keyof ThemCollection;

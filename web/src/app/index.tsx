import React from 'react'
import { path } from 'ramda'
import { createGlobalStyle } from 'styled-components'

import { ThemeProvider } from '../services/theme/Provider'
import { theme, Theme, ThemeMode } from './theme'
import { config } from './config'
import { Waypoints } from './modules/waypoints'

// dirty fetch override. i know. please, close your eyes, take a deep breath and continue reading
// needed for allowing cors for fetch, the client lib does not
const realfetch = window.fetch
window.fetch = (url: string = '', opts = {}) => {
  if (typeof url === 'string' && url.indexOf('8001') > -1 && ['POST', 'PUT', 'DELETE'].includes(opts.method)) {
    return realfetch(url, {...opts, mode: 'no-cors' })
  }
  return realfetch(url, opts)
}

const Global = createGlobalStyle`
    body {
        font-family: ${path(['theme', 'fonts', 'primary', 'family'])};
        font-size: ${path(['theme', 'fonts', 'size'])}px;
        color: ${path(['theme', 'colors', 'text', 'main'])};
    }

    * {
      	vertical-align: baseline;
      	font-weight: inherit;
      	font-family: inherit;
      	font-style: inherit;
      	font-size: 100%;
      	border: 0 none;
      	outline: 0;
      	padding: 0;
      	margin: 0;
        box-sizing: border-box;
	   }
`

export const App = () => (
  <ThemeProvider<ThemeMode, Theme> mode="auto" theme={theme}>
    <Global />
    <Waypoints config={config} />
  </ThemeProvider>
)

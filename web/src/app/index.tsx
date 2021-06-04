import React from 'react'
import { path } from 'ramda'
import { createGlobalStyle } from 'styled-components'

import { ThemeProvider } from '../services/theme/Provider'
import { theme, Theme, ThemeMode } from './theme'
import { config } from './config'
import { Waypoints } from './modules/waypoints'

const Global = createGlobalStyle`
    body {
        font-family: ${path(['theme', 'fonts', 'primary', 'family'])};
        font-size: ${path(['theme', 'fonts', 'size'])}px;
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
	   }
`

export const App = () => (
  <ThemeProvider<ThemeMode, Theme> mode="auto" theme={theme}>
    <Global />
    <Waypoints config={config} />
  </ThemeProvider>
)

import React from 'react'
import { pathOr } from 'ramda'
import { Normalize } from 'styled-normalize'
import { ThemeProvider as SCProvider } from 'styled-components'

import { useColorScheme } from './useColorScheme'

export type ThemeOverride<M extends string, T extends object> = {
    [key in M]?: T
}

type WrapperProps<M extends string, T extends object> = {
    mode: M | 'auto',
    theme: ThemeOverride<M, T>,
    children?: React.ReactNode,
}

export function ThemeProvider<M extends string, T extends object> ({ mode, theme = {}, children }: WrapperProps<M, T>) {
    const scheme = useColorScheme()
    const selectedTheme = mode === 'auto' ? pathOr({}, [scheme], theme) : pathOr({}, [mode], theme)
    return (
        <SCProvider theme={selectedTheme}>
            <Normalize />
            {children}
        </SCProvider>
    )
}

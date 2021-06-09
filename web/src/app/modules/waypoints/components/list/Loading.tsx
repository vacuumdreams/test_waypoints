import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

const Row = styled(Skeleton)`
    margin: 1rem;
    width: calc(100% - 2rem)!important;
`

export const LoadingList = () => {
    const theme = useContext(ThemeContext)
    return (
        <SkeletonTheme color={theme.colors.background.dim} highlightColor={theme.colors.neutral.weak}>
            <Row count={3} height={40} duration={2} />
        </SkeletonTheme>
    )
}

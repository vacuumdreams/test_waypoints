import React from 'react'
import { path } from 'ramda'
import styled from 'styled-components'

export const Container = styled.div`
    text-align: center;
    margin: 1rem;
    padding: 2rem;
    border: 3px dashed ${path(['theme', 'colors', 'danger', 'main'])};
    background-color: ${path(['theme', 'colors', 'background', 'dim'])};
`
const Indicator = styled.div`
    font-size: 2rem;
    margin-bottom: 1.5rem;
`

export const ErrorContainer: React.FC = ({ children }) => {
    return (
        <Container>
            <Indicator>⚠️</Indicator>
            {children}
        </Container>
    )
}

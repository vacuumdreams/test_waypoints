import React from 'react'
import { path } from 'ramda'
import styled from 'styled-components'

type MessageType = 'info' | 'error' | 'warning';

type Props = {
    type?: MessageType;
}

export const Container = styled.div`
    text-align: center;
    margin: 1rem;
    padding: 2rem;
    background-color: ${path(['theme', 'colors', 'background', 'dim'])};
    border: 3px dashed ${path(['theme', 'colors', 'neutral', 'main'])};

    &[data-type="warning"] {
        border: 3px dashed ${path(['theme', 'colors', 'warning', 'main'])};
    }

    &[data-type="error"] {
        border: 3px dashed ${path(['theme', 'colors', 'danger', 'main'])};
    }
`
const Indicator = styled.div`
    font-size: 2rem;
    margin-bottom: 1.5rem;
`

export const Message: React.FC<Props> = ({ type = "info", children }) => {
    return (
        <Container data-type={type}>
            {type === 'info' && <Indicator>💡</Indicator>}
            {type === 'warning' && <Indicator>⚠️</Indicator>}
            {type === 'error' && <Indicator>🛑</Indicator>}
            {children}
        </Container>
    )
}

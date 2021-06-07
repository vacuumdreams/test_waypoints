import { path } from 'ramda'
import styled from 'styled-components'

export const Input = styled.input`
    font-weight: ${path(['theme', 'fonts', 'primary', 'weight', 'extrabold'])};
    border: ${path(['theme', 'colors', 'primary', 'main'])};
    padding: 1rem;
    width: 100%;
    font-size: 1rem;
`

import { path } from 'ramda'
import styled from 'styled-components'

export const Input = styled.input`
    border: ${path(['theme', 'colors', 'primary', 'main'])};
    padding: 1rem;
    width: 100%;
    font-size: 1rem;
`

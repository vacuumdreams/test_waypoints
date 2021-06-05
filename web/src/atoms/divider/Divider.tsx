import { path } from 'ramda'
import styled from 'styled-components'

export const Divider = styled.hr`
    width: 100%;
    height: 3px;
    margin: 1rem 0;
    background-color: ${path(['theme', 'colors', 'neutral', 'main'])};
    border: none;
`

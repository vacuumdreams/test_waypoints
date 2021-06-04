import { path } from 'ramda'
import styled from 'styled-components'

export const Button = styled.button`
    font-size: 1rem;
    padding: 1em 3em;
    background-color: ${path(['theme', 'colors', 'primary', 'main'])};
    color: white;
    line-height: 2.5;
    cursor: pointer;
    transition: background-color ${path(['theme', 'transition'])}s;
    border-radius: ${path(['theme', 'radius'])}px;
    width: 100%;
    font-weight: ${path(['theme', 'fonts', 'primary', 'weight', 'extrabold'])};

    &:disabled {
        cursor: auto;
        background-color: ${path(['theme', 'colors', 'neutral', 'main'])};
    }

    &:hover {
        background-color: ${path(['theme', 'colors', 'primary', 'weak'])};
    }
`

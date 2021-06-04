import { path } from 'ramda'
import styled from 'styled-components'

export const Title = styled.h1`
    font-size: 3rem;
    font-family: ${path(['theme', 'fonts', 'title', 'family'])};
    margin: 0;
    padding: 1em 1rem;

    & span {
      font-family: ${path(['theme', 'fonts', 'script', 'family'])};
    }
`
